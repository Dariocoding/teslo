import { useCartStore } from "@/store";
import React from "react";
import { useIntl } from "react-intl";
import { useOrdersFormContext } from "../../FormContainer";
import { ITrTempProductProps } from "./TrTempProduct";
import { toast } from "react-hot-toast";
import { detailTempOrdersService } from "@teslo/services";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import Swal from "sweetalert2";

export const useTrTempProduct = (props: ITrTempProductProps) => {
  const { tempP, detailProduct, idx } = props;

  const { addCart } = useCartStore();
  const { formatMessage: t } = useIntl();
  const { values, setValues } = useOrdersFormContext();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleClickEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const tempProduct = values.products.find((p) => p.product?.id === tempP?.product?.id);
    const tempDetailProduct = values.detailOrderProducts.find(
      (p) => p.product?.id === detailProduct?.product.id
    );

    let errorQty = 0;
    if (values.order) {
      let validate = true;
      /* 
			if (tempDetailProduct) {
				validate = !(tempDetailProduct?.product?.stock < tempDetailProduct?.quantity);
				errorQty = tempDetailProduct?.quantity;
			}

			if (tempProduct) {
				validate = !(tempProduct?.product?.stock < tempProduct?.qty);
				errorQty = tempProduct?.qty;
			} */

      if (validate) {
        setIsEditing(false);
        toast.success(t({ id: "products.edit.success" }));
      } else {
        toast.error(t({ id: "orders.stockMustBeGreaterThan" }, { qty: errorQty }));
      }
      return;
    }

    if (!tempProduct.qty) {
      toast.error("Please add quantity");
      return;
    }

    try {
      const req = await detailTempOrdersService.updateOne(tempProduct.id, {
        qty: tempP?.qty,
        size: tempP?.size,
      });

      addCart(req.data, { size: req.data.size, qty: tempP?.qty, sameQty: true });

      toast.success(t({ id: "products.edit.success" }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("There was an error");
    } finally {
    }
  };

  const inputPriceQtyName = detailProduct
    ? `detailOrderProducts[${idx}].quantity`
    : `products[${idx}].qty`;

  const handleClickDelete = async () => {
    async function deleteData() {
      try {
        showLoader();
        await detailTempOrdersService.deleteOne(tempP?.id);
        setValues({ ...values, products: values.products.filter((p) => p.id !== tempP?.id) });
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
          (value) => value.id !== detailProduct.id
        ),
      });
      toast.success(t({ id: "products.deleted.success" }));
    }

    const resSwal = await Swal.fire({
      title: t({ id: "orders.form.delete.temporalProduct" }),
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
      if (!detailProduct) deleteData();
      if (detailProduct) deleteDetailProduct();
    }
  };

  return { handleClickDelete, inputPriceQtyName, handleClickEdit, isEditing };
};
