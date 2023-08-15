import Loader from "@/components/ui/Loader";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { protectedRoutes, validPaths } from "@/utils";
import * as React from "react";
import { FaTag } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { providersService } from "@teslo/services";
import { Provider } from "@teslo/interfaces";
import { useModalStore } from "@/store";
import { useFetchProvider } from "../hooks/useFetchProvider";
import HeaderViewProvider from "./HeaderViewProvider";
import ModalDeleteProvider from "../TableProviders/ModalDeleteProvider";
import RenderIf from "@/components/ui/RenderIf";
import TableProductsProviderId from "./TableProductsByProvider";
import { translate } from "@/i18n";
import { useIntl } from "react-intl";

interface IViewProviderPageProps {}

const FormProvider = React.lazy(() => import("../forms/FormProvider"));

const ViewProviderPage: React.FunctionComponent<IViewProviderPageProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const params = useParams();
  const { data: provider, setData, isFetching } = useFetchProvider(params.id);
  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const [showModalDeleteProvider, setShowModalDeleteProvider] = React.useState(false);
  const [isLoadingDeleteBrand, setIsLoadingDeleteBrand] = React.useState(null);

  const onUpdate = () => {
    const onSuccess = (data: Provider) => {
      setData({ ...provider, ...data });
      closeModal();
    };

    setModal({
      title: formatMessage({ id: "providers.edit.title" }),
      children: (
        <React.Suspense fallback={<></>}>
          <FormProvider provider={provider} onSuccess={onSuccess} />
        </React.Suspense>
      ),
      size: "md",
    });
  };

  const onCloseModalDelete = () => setShowModalDeleteProvider(false);
  const onDelete = () => setShowModalDeleteProvider(true);

  const onAcceptDeleteProvider = async () => {
    try {
      setIsLoadingDeleteBrand(true);
      await providersService.delete(provider.idprovider);
      onCloseModalDelete();
      const messageSuccess = formatMessage({ id: "providers.deleted.success" });
      toast.success(messageSuccess);
      navigate(protectedRoutes.brands.path);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || formatMessage({ id: "providers.deleted.error" }));
    } finally {
      setIsLoadingDeleteBrand(false);
    }
  };

  if (isFetching) return <Loader loading={true} />;

  if (!provider) return <Navigate replace to={protectedRoutes.providers.path} />;

  return (
    <HeaderDashboard
      to={validPaths.providers.path}
      title={translate("providers.single")}
      icon={<FaTag />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("providers.title"), to: validPaths.brands.path },
        { label: provider?.name || translate("providers.single") },
      ]}
    >
      <HeaderViewProvider provider={provider} onDelete={onDelete} onUpdate={onUpdate} />
      <TableProductsProviderId provider={provider} />
      <RenderIf isTrue={showModalDeleteProvider}>
        <React.Suspense fallback={<></>}>
          <ModalDeleteProvider
            onAcceptDelete={onAcceptDeleteProvider}
            onClose={onCloseModalDelete}
            show={showModalDeleteProvider}
            provider={provider}
            isLoading={isLoadingDeleteBrand}
          />
        </React.Suspense>
      </RenderIf>
    </HeaderDashboard>
  );
};

export default ViewProviderPage;
