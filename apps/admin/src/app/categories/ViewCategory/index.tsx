import Loader from "@/components/ui/Loader";
import { useModalStore } from "@/store";
import * as React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetchCategory } from "../hooks/useFetchCategory";
import toast from "react-hot-toast";
import { protectedRoutes, validPaths } from "@/utils";
import HeaderViewCategory from "./HeaderViewCategory";
import TableProductsByCategoryId from "./TableProductsByCategoryId";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { Category } from "@teslo/interfaces";
import { FaClipboardList } from "react-icons/fa";
import { categoriesService } from "@teslo/services";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";

const FormCategory = React.lazy(() => import("../forms/FormCategory"));
const ModalDeleteCategory = React.lazy(() => import("../TableCategories/ModalDeleteCategory"));

interface IViewCategoryPageProps {}

const ViewCategoryPage: React.FunctionComponent<IViewCategoryPageProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const params = useParams();
  const { data: category, setData, isFetching } = useFetchCategory(params.id);
  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const [showModalDeleteCategory, setShowModalDeleteCategory] = React.useState(false);
  const [isLoadingDeleteCategory, setIsLoadingDeleteCategory] = React.useState(null);

  const onUpdateCategory = () => {
    const onSuccess = (data: Category) => {
      setData({ ...category, ...data });
      closeModal();
    };

    setModal({
      title: formatMessage({ id: "categories.edit.title" }),
      children: (
        <React.Suspense fallback={<></>}>
          <FormCategory category={category} onSuccess={onSuccess} />
        </React.Suspense>
      ),
      size: "md",
    });
  };

  const onCloseModalDelete = () => {
    setShowModalDeleteCategory(false);
  };

  const onDeleteCategory = () => {
    setShowModalDeleteCategory(true);
  };

  const onAcceptDeleteCategory = async () => {
    try {
      setIsLoadingDeleteCategory(true);
      await categoriesService.deleteCategory(category.idcategory);
      onCloseModalDelete();
      toast.success(formatMessage({ id: "categories.deleted.success" }));
      navigate(protectedRoutes.categories.path);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || formatMessage({ id: "categories.deleted.error" }));
    } finally {
      setIsLoadingDeleteCategory(false);
    }
  };

  if (isFetching) return <Loader loading={true} />;

  if (!category) return <Navigate replace to={protectedRoutes.categories.path} />;

  return (
    <HeaderDashboard
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("categories.title"), to: validPaths.categories.path },
        { label: category.title || formatMessage({ id: "categories.single" }) },
      ]}
      icon={<FaClipboardList />}
      title={category.title || formatMessage({ id: "categories.single" })}
      to={validPaths.categories.path}
    >
      <HeaderViewCategory
        category={category}
        onDeleteCategory={onDeleteCategory}
        onUpdateCategory={onUpdateCategory}
      />
      <TableProductsByCategoryId category={category} />
      <ModalDeleteCategory
        onAcceptDeleteCategory={onAcceptDeleteCategory}
        onCloseModalDelete={onCloseModalDelete}
        showModalDeleteCategory={showModalDeleteCategory}
        category={category}
        isLoading={isLoadingDeleteCategory}
      />
    </HeaderDashboard>
  );
};

export default ViewCategoryPage;
