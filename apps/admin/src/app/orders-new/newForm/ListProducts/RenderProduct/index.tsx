import * as React from "react";
import { NewOrderValues, useOrderFormContext } from "../..";
import { formatter, imageProduct } from "@/utils";
import { FaCheck, FaPencilRuler, FaTimesCircle } from "react-icons/fa";
import ActionsRenderProduct from "./Actions";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { detailTempOrdersService } from "@teslo/services";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { useCartStore } from "@/store";
import ModalServiceAction from "../../ExtraActions/ModalServiceAction";
import { BsCheckCircleFill } from "react-icons/bs";
import { Dropdown, DropdownItem, RenderIf } from "@/components/ui";
import { PiDotsThreeOutlineDuotone, PiPencilSimpleLineDuotone } from "react-icons/pi";
import { translate } from "@/i18n";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

export interface IRenderProductProps {
  product?: NewOrderValues["products"][0];
  productOrder?: NewOrderValues["detailOrderProducts"][0];
}

const RenderProduct: React.FunctionComponent<IRenderProductProps> = (props) => {
  const { product, productOrder } = props;
  const [showModal, setShowModal] = React.useState(false);
  const { formatMessage: t } = useIntl();
  const { removeCartItem } = useCartStore();
  const { values, setValues } = useOrderFormContext();
  const total =
    (product?.product?.price || productOrder?.total || product?.price || 0) *
    (product?.qty || productOrder?.quantity || 0);

  const handleClickDelete = async () => {
    async function deleteData() {
      try {
        showLoader();
        await detailTempOrdersService.deleteOne(product?.id);
        setValues({ ...values, products: values.products.filter((p) => p.id !== product?.id) });
        removeCartItem({ ...product });
        toast.success(t({ id: "products.deleted.success" }));
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    }

    function deleteDetailProduct() {
      setValues({
        ...values,
        detailOrderProducts: values.detailOrderProducts.filter(
          (value) => value.id !== productOrder.id && value.size !== productOrder.size
        ),
      });
      toast.success(t({ id: "products.deleted.success" }));
    }

    const resSwal = await Swal.fire({
      title: t({
        id: productOrder ? "orders.form.delete.product" : "orders.form.delete.temporalProduct",
      }),
      text: t({ id: "app.areYouSureToDoThis" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });
    if (resSwal.isConfirmed) {
      if (!productOrder) deleteData();
      if (productOrder) deleteDetailProduct();
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full border p-3 border-gray-200 relative">
      <div className="sm:block hidden">
        <img
          src={product ? imageProduct(product?.product) : imageProduct(productOrder?.product)}
          className="sm:w-12 w-8 rounded-lg"
          alt=""
        />
      </div>
      <div>
        <h6 className="text-sm">
          {product?.product?.title || productOrder?.product?.title || product?.title} (
          {formatter.format(
            (product?.product?.price ?? productOrder?.total ?? product?.price) || 0
          )}
          )
        </h6>
        <ActionsRenderProduct {...props} />
      </div>
      <div className="text-right flex-grow">
        <p className="text-base font-semibold">{formatter.format(total)}</p>
      </div>

      <RenderIf isTrue={!productOrder?.product && !product?.product}>
        <div className="absolute top-1 right-1">
          <Dropdown
            placement="bottom"
            displayButton={<PiDotsThreeOutlineDuotone className="text-black" />}
          >
            <DropdownItem
              onClick={() => setShowModal(true)}
              className="font-semibold flex items-center gap-1"
            >
              <PiPencilSimpleLineDuotone /> {translate("orders.title.edit.service")}
            </DropdownItem>
            <DropdownItem
              onClick={handleClickDelete}
              className="font-semibold flex items-center gap-1"
            >
              <AiOutlineDelete /> {translate("orders.title.delete.service")}
            </DropdownItem>
          </Dropdown>
        </div>
      </RenderIf>

      <RenderIf isTrue={productOrder?.product || product?.product}>
        <div className="absolute top-1 right-1">
          <FaTimesCircle onClick={handleClickDelete} className="text-red-500 cursor-pointer" />
        </div>
      </RenderIf>

      <RenderIf isTrue={showModal}>
        <ModalServiceAction
          isDetailOrderAction={Boolean(productOrder)}
          isProductAction={Boolean(product)}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          detail={productOrder || product}
        />
      </RenderIf>
    </div>
  );
};

export default RenderProduct;
