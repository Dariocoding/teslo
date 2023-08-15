import DataTable from "@/components/ui/DataTable";
import { useModalStore } from "@/store";
import * as React from "react";
import { useFetchCategories } from "../hooks/useFetchCategories";
import mapCategories from "./mapCategories";
import toast from "react-hot-toast";
import RenderIf from "@/components/ui/RenderIf";
import { FaPlus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import AuthorityCheck from "@/components/AuthorityCheck";
import { Category, ValidRoles } from "@teslo/interfaces";
import { categoriesService } from "@teslo/services";
import { TablePlaceholder } from "@/components/placeholders";
import { useDefaultHeadingTableCategories } from "./useDefaultHeadingTableCategories";
import { useIntl } from "react-intl";

const FormCategory = React.lazy(() => import("../forms/FormCategory"));
const ModalDeleteCategory = React.lazy(() => import("./ModalDeleteCategory"));

interface ITableCategoriesProps {}

const TableCategories: React.FunctionComponent<ITableCategoriesProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const [showModalDeleteCategory, setShowModalDeleteCategory] = React.useState(false);
  const [stateCategoryDelete, setStateCategoryDelete] = React.useState<Category>(null);
  const [isLoadingDeleteCategory, setIsLoadingDeleteCategory] = React.useState(null);
  const { data: categories, setData, isFetching, refetch } = useFetchCategories();

  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const onUpdateCategory = (category: Category) => {
    const onSuccess = (data: Category) => {
      setData(categories.map((c) => (c.idcategory === data.idcategory ? { ...c, ...data } : c)));
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

  const onCreateCategory = () => {
    const onSuccess = (data: Category) => {
      setData([data, ...categories]);
      closeModal();
    };

    setModal({
      title: formatMessage({ id: "categories.add.title" }),
      children: (
        <React.Suspense fallback={<></>}>
          <FormCategory onSuccess={onSuccess} />
        </React.Suspense>
      ),
    });
  };

  const onCloseModalDelete = () => {
    setShowModalDeleteCategory(false);
    setStateCategoryDelete(null);
  };

  const onDeleteCategory = (category: Category) => {
    setShowModalDeleteCategory(true);
    setStateCategoryDelete(category);
  };

  const onAcceptDeleteCategory = async () => {
    try {
      setIsLoadingDeleteCategory(true);
      await categoriesService.deleteCategory(stateCategoryDelete.idcategory);
      setData(categories.filter((c) => c.idcategory !== stateCategoryDelete.idcategory));
      onCloseModalDelete();
      toast.success(formatMessage({ id: "categories.deleted.success" }));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || formatMessage({ id: "categories.deleted.error" }));
    } finally {
      setIsLoadingDeleteCategory(false);
    }
  };

  return (
    <React.Fragment>
      <DataTable
        placeholder={<TablePlaceholder />}
        buttons={
          <div className="flex items-center justify-start">
            <AuthorityCheck
              validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}
            >
              <button className="btn btn-primary btn-xs" onClick={onCreateCategory}>
                <FaPlus />
              </button>
            </AuthorityCheck>

            <button className="btn btn-outline-alternative btn-xs" onClick={() => refetch()}>
              <AiOutlineReload />
            </button>
          </div>
        }
        data={mapCategories({
          categories,
          onDeleteCategory,
          onUpdateCategory,
        })}
        heading={useDefaultHeadingTableCategories()}
        loading={isFetching}
      />
      <RenderIf isTrue={showModalDeleteCategory}>
        <React.Suspense fallback={<></>}>
          <ModalDeleteCategory
            onAcceptDeleteCategory={onAcceptDeleteCategory}
            onCloseModalDelete={onCloseModalDelete}
            showModalDeleteCategory={showModalDeleteCategory}
            category={stateCategoryDelete}
            isLoading={isLoadingDeleteCategory}
          />
        </React.Suspense>
      </RenderIf>
    </React.Fragment>
  );
};

export default TableCategories;
