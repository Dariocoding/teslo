import React from "react";
import { NewOrderValues, useOrdersFormContext } from "../../FormContainer";
import { useCartStore, useConfigApp } from "@/store";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { detailTempOrdersService } from "@teslo/services";
import { DetailOrder, DetailOrderTemp } from "@teslo/interfaces";

const initialData: Partial<NewOrderValues> = {
  tempProduct: {},
  searchProduct: "",
  tempSize: null,
};

export const useTdAddTempProduct = () => {
  const { colors } = useConfigApp();
  const { formatMessage: t } = useIntl();
  const { addCart } = useCartStore();
  const { values, setValues } = useOrdersFormContext();
  const { tempProduct, tempQty, tempSize } = values;

  const addProductToStorage = async () => {
    const validate = validateAddProduct();
    if (validate && !values.order) addProductToBackend();
    if (validate && values.order) addProductToOrder();
  };

  const validateAddProduct = () => {
    if (!tempProduct?.id && !tempProduct?.stock) return false;
    if (tempProduct?.stock < tempQty) {
      throwErrorGreaterThanStock(tempQty);
      return false;
    }
    const { detailProductOrder, detailTempProduct } = getProductTempTables();

    /* 		if (detailProductOrder) {
			const error = compareStock(detailProductOrder.quantity);
			if (error) return false;
		} */

    if (detailTempProduct) {
      const error = compareStock(detailTempProduct.qty);
      if (error) return false;
    }

    function compareStock(toSum: number) {
      const sum = tempQty + toSum;
      const isGreatherThanStock = tempProduct.stock < sum;
      if (isGreatherThanStock) {
        throwErrorGreaterThanStock(sum);
        return true;
      }
    }

    function throwErrorGreaterThanStock(qty: number) {
      toast.error(t({ id: "orders.stockMustBeGreaterThan" }, { qty }));
    }

    return true;
  };

  const getProductTempTables = () => {
    let detailTempProduct: DetailOrderTemp;
    let detailProductOrder: DetailOrder;

    if (colors.enableClothesShopping) {
      detailProductOrder = values.detailOrderProducts.find(
        (v) => v.product.id === tempProduct.id && v.size === tempSize
      );
      detailTempProduct = values.products.find(
        (p) => p.product.id === tempProduct?.id && p.size === tempSize
      );
    } else {
      detailProductOrder = values.detailOrderProducts.find((v) => v.product.id === tempProduct.id);
      detailTempProduct = values.products.find((p) => p.product.id === tempProduct?.id);
    }

    return { detailProductOrder, detailTempProduct };
  };

  const addProductToOrder = () => {
    let { detailProductOrder, detailTempProduct } = getProductTempTables();
    if (detailTempProduct && detailProductOrder) {
      setValues({
        ...values,
        ...initialData,
        products: values.products.filter((v) =>
          colors.enableClothesShopping
            ? v.product.id !== detailTempProduct.product.id && v.size !== detailTempProduct.size
            : v.product.id !== detailTempProduct.product.id
        ),
      });
      detailTempProduct = null;
    }

    if (!detailTempProduct && !detailProductOrder) {
      setValues({
        ...values,
        ...initialData,
        products: [
          { qty: tempQty, size: tempSize, id: null, product: tempProduct },
          ...values.products,
        ],
      });
      return;
    }

    if (detailProductOrder) {
      setValues({
        ...values,
        ...initialData,
        detailOrderProducts: values.detailOrderProducts.map((d) => {
          if (d.product.id === detailProductOrder.product.id) {
            d.quantity = d.quantity + tempQty;
          }
          return d;
        }),
      });
    }

    if (detailTempProduct) {
      setValues({
        ...values,
        ...initialData,
        products: values.products.map((p) => {
          if (p.product.id === detailTempProduct.product.id) {
            p.qty = p.qty + tempQty;
          }
          return p;
        }),
      });
    }

    toast.success("Product added sucessfully!");
    const inputCode = document.getElementById("searchProduct");
    if (inputCode) inputCode.focus();
  };

  const addProductToBackend = async () => {
    try {
      showLoader();

      const req = await detailTempOrdersService.create({
        product: values.tempProduct,
        qty: values.tempQty,
        size: values.tempSize,
      });

      if (
        values.products.some((p) =>
          colors.enableClothesShopping
            ? p.product.id === values.tempProduct?.id && p.size === values.tempSize
            : p.product.id === values.tempProduct?.id
        )
      ) {
        const productOld = values.products.find((p) =>
          colors.enableClothesShopping
            ? p.product.id === values.tempProduct?.id && p.size === values.tempSize
            : p.product.id === values.tempProduct?.id
        );
        if (productOld) {
          addCart(req.data, {
            size: req.data.size,
            qty: req.data.qty - productOld.qty,
          });
        }
      } else {
        addCart(req.data, { size: req.data.size, qty: req.data.qty });
      }

      setValues({
        ...values,
        ...initialData,
        products: values.products.some((p) =>
          colors.enableClothesShopping
            ? p.product.id === values.tempProduct.id && p.size === tempSize
            : p.product.id === values.tempProduct.id
        )
          ? values.products.map((p) =>
              (
                colors.enableClothesShopping
                  ? p.product.id === values.tempProduct.id && p.size === values.tempSize
                  : p.product.id === values.tempProduct.id
              )
                ? req.data
                : p
            )
          : [req.data, ...values.products],
      });

      toast.success("Product added sucessfully!");
      const inputCode = document.getElementById("searchProduct");
      if (inputCode) inputCode.focus();
    } catch (error) {
      console.log(error);
      toast.error("There was an error...");
    } finally {
      hideLoader();
    }
  };

  React.useEffect(() => {
    function onKeyDownPres(event: KeyboardEvent) {
      if (event.key === "Enter") addProductToStorage();
    }

    window.addEventListener("keydown", onKeyDownPres);

    return () => {
      window.removeEventListener("keydown", onKeyDownPres);
    };
  }, [addProductToStorage]);

  return { addProductToStorage };
};
