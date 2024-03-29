import AuthorityCheck from "@/components/AuthorityCheck";
import { TablePlaceholder } from "@/components/placeholders";
import { Brand, ValidRoles } from "@teslo/interfaces";
import DataTable from "@/components/ui/DataTable";
import * as React from "react";
import { FaPlus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { useFetchBrands } from "../hooks/useFetchBrands";
import { useModalStore } from "@/store";
import { brandsService } from "@teslo/services";
import toast from "react-hot-toast";
import { BrandTable } from "../config";
import RenderIf from "@/components/ui/RenderIf";
import dayjs from "dayjs";
import ActionsBrand from "./ActionsBrand";
import { useIntl } from "react-intl";
import { useDefaultHeadingTableBrands } from "./useDefaultHeadingTable";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface IDataTableBrandsProps {}

const FormBrand = React.lazy(() => import("../forms/FormBrand"));
const ModalDeleteBrand = React.lazy(() => import("./ModalDeleteBrand"));

const DataTableBrands: React.FunctionComponent<IDataTableBrandsProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const [showModalDeleteBrand, setShowModalDeleteBrand] = React.useState(false);
  const [stateBrandDelete, setStateBrandDelete] = React.useState<Brand>(null);
  const [isLoadingDeleteBrand, setIsLoadingDeleteBrand] = React.useState(null);
  const { data: brands, setData, isFetching, refetch } = useFetchBrands();

  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const onUpdateBrand = (brand: Brand) => {
    const onSuccess = (data: Brand) => {
      setData(brands.map((c) => (c.idbrand === data.idbrand ? { ...c, ...data } : c)));
      closeModal();
    };

    setModal({
      title: formatMessage({ id: "brands.edit.title" }),
      children: (
        <React.Suspense fallback={<></>}>
          <FormBrand brand={brand} onSuccess={onSuccess} />
        </React.Suspense>
      ),
      size: "md",
    });
  };

  const onCreateBrand = () => {
    const onSuccess = (data: Brand) => {
      setData([data, ...brands]);
      closeModal();
    };

    setModal({
      title: formatMessage({ id: "brands.add.title" }),
      children: (
        <React.Suspense fallback={<></>}>
          <FormBrand onSuccess={onSuccess} />
        </React.Suspense>
      ),
    });
  };

  const onCloseModalDelete = () => {
    setShowModalDeleteBrand(false);
    setStateBrandDelete(null);
  };

  const onDeleteBrand = (brand: Brand) => {
    setShowModalDeleteBrand(true);
    setStateBrandDelete(brand);
  };

  const onAcceptDelete = async () => {
    try {
      setIsLoadingDeleteBrand(true);
      await brandsService.delete(stateBrandDelete.idbrand);
      setData(brands.filter((c) => c.idbrand !== stateBrandDelete.idbrand));
      onCloseModalDelete();
      const messageSuccess = formatMessage({ id: "brands.deleted.success" });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      const defaultMessage = formatMessage({ id: "brands.deleted.error" });
      toast.error(error.response.data.message || defaultMessage);
    } finally {
      setIsLoadingDeleteBrand(false);
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
              <button className="btn btn-primary btn-xs" onClick={onCreateBrand}>
                <FaPlus />
              </button>
            </AuthorityCheck>

            <button className="btn btn-outline-alternative btn-xs" onClick={() => refetch()}>
              <AiOutlineReload />
            </button>
          </div>
        }
        data={brands.map(
          (brand) =>
            ({
              ...brand,
              dateFormatted: dayjs(brand.dateCreated).format("DD/MM/YYYY HH:mm:ss"),

              actions: (
                <ActionsBrand
                  brand={brand}
                  onDeleteBrand={onDeleteBrand}
                  onUpdateBrand={onUpdateBrand}
                />
              ),
              nameFormatted: (
                <Link className="link-table" to={validPaths.viewBrand.fnPath(brand.idbrand)}>
                  {brand.title}
                </Link>
              ),
            } as BrandTable)
        )}
        heading={useDefaultHeadingTableBrands()}
        loading={isFetching}
      />
      <RenderIf isTrue={showModalDeleteBrand}>
        <React.Suspense fallback={<></>}>
          <ModalDeleteBrand
            onAcceptDelete={onAcceptDelete}
            onClose={onCloseModalDelete}
            show={showModalDeleteBrand}
            brand={stateBrandDelete}
            isLoading={isLoadingDeleteBrand}
          />
        </React.Suspense>
      </RenderIf>
    </React.Fragment>
  );
};

export default DataTableBrands;
