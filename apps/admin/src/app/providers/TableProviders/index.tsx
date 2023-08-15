import DataTable from "@/components/ui/DataTable";
import * as React from "react";
import { TablePlaceholder } from "@/components/placeholders";
import { Provider, ValidRoles } from "@teslo/interfaces";
import ActionsTableProviders from "./ActionsTable";
import { FaPlus } from "react-icons/fa";
import { useModalStore } from "@/store";
import FormProvider from "../forms/FormProvider";
import { toast } from "react-hot-toast";
import { providersService } from "@teslo/services";
import RenderIf from "@/components/ui/RenderIf";
import { useDefaultHeadingTableProviders } from "./useDefaultHeadingTableProviders";
import { useIntl } from "react-intl";
import AuthorityCheck from "@/components/AuthorityCheck";

const ModalDeleteProvider = React.lazy(() => import("./ModalDeleteProvider"));

interface ITableProvidersProps {
  providers: Provider[];
  setProviders: React.Dispatch<React.SetStateAction<Provider[]>>;
  isLoading: boolean;
}

const TableProviders: React.FunctionComponent<ITableProvidersProps> = (props) => {
  const { providers, setProviders, isLoading } = props;
  const { formatMessage } = useIntl();
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [stateProviderDelete, setStateProviderDelete] = React.useState<Provider>(null);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(null);
  const { setModal, closeModal } = useModalStore();

  const actions = {
    create: () => {
      function onSuccessCreate(newProvider: Provider) {
        setProviders([newProvider, ...providers]);
        closeModal();
      }
      setModal({
        title: formatMessage({ id: "providers.add.title" }),
        children: (
          <React.Suspense fallback={<></>}>
            <FormProvider onSuccess={onSuccessCreate} />
          </React.Suspense>
        ),
        size: "md",
      });
    },
    update: (provider: Provider) => {
      function onSucces(updatedProvider: Provider) {
        setProviders(
          providers.map((c) =>
            c.idprovider === updatedProvider.idprovider ? { ...c, ...updatedProvider } : c
          )
        );
        closeModal();
      }

      setModal({
        title: formatMessage({ id: "providers.edit.title" }),
        children: (
          <React.Suspense fallback={<></>}>
            <FormProvider onSuccess={onSucces} provider={provider} />
          </React.Suspense>
        ),
        size: "md",
      });
    },
    delete: (provider: Provider) => {
      setShowModalDelete(true);
      setStateProviderDelete(provider);
    },
  };

  const onCloseModalDelete = () => {
    setShowModalDelete(false);
    setStateProviderDelete(null);
  };

  const onAcceptDelete = async () => {
    try {
      setIsLoadingDelete(true);
      await providersService.delete(stateProviderDelete.idprovider);
      setProviders(providers.filter((c) => c.idprovider !== stateProviderDelete.idprovider));
      onCloseModalDelete();
      const messageSuccess = formatMessage({ id: "providers.deleted.success" });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      const messageError = formatMessage({ id: "providers.deleted.error" });
      toast.error(messageError);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <React.Fragment>
      <DataTable
        loading={isLoading}
        buttons={
          <AuthorityCheck
            validRoles={[ValidRoles.ADMIN, ValidRoles.SUPERVISOR, ValidRoles.SUPER_USER]}
          >
            <div className="justify-start items-center flex">
              <button onClick={actions.create} type="button" className="btn btn-primary btn-xs">
                <FaPlus />
              </button>
            </div>
          </AuthorityCheck>
        }
        heading={useDefaultHeadingTableProviders()}
        data={providers.map(
          (item) =>
            ({
              ...item,
              actions: (
                <ActionsTableProviders
                  provider={item}
                  onClickDeleteProvider={actions.delete}
                  onClickUpdateProvider={actions.update}
                />
              ),
            } as ProviderTable)
        )}
        placeholder={<TablePlaceholder />}
      />
      <RenderIf isTrue={showModalDelete}>
        <React.Suspense fallback={<></>}>
          <ModalDeleteProvider
            onAcceptDelete={onAcceptDelete}
            show={showModalDelete}
            isLoading={isLoadingDelete}
            onClose={onCloseModalDelete}
            provider={stateProviderDelete}
          />
        </React.Suspense>
      </RenderIf>
    </React.Fragment>
  );
};

export default TableProviders;

interface ProviderTable extends Provider {
  actions: React.ReactNode;
}
