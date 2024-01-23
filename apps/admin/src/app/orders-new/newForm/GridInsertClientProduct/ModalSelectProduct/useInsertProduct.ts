import { OptionsCart, useCartStore, useConfigApp } from "@/store";
import { DetailOrder, DetailOrderTemp, Product } from "@teslo/interfaces";
import { useIntl } from "react-intl";
import { useOrderFormContext } from "../..";
import React from "react";
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { detailTempOrdersService } from "@teslo/services";

export const useInsertProduct = (tempProduct: Product) => {
  const [state, setState] = React.useState<OptionsCart>({ size: null, qty: 0 });
  const { colors } = useConfigApp();
  const { formatMessage: t } = useIntl();
  const { addCart } = useCartStore();
  const { values, setValues } = useOrderFormContext();

  const addProductToStorage = async (onSuccess?: () => void) => {
    const validate = validateAddProduct();
    if (validate && !values.order) await addProductToBackend();
    if (validate && values.order) addProductToOrder();
    if (!validate) return;
    onSuccess?.();
  };

  const validateAddProduct = () => {
    if (!tempProduct?.id && !tempProduct?.stock) return false;
    if (tempProduct?.stock < state.qty) {
      throwErrorGreaterThanStock(state.qty);
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
      const sum = state.qty + toSum;
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
        (v) => v.product?.id === tempProduct?.id && v.size === state.size
      );
      detailTempProduct = values.products.find(
        (p) => p.product?.id === tempProduct?.id && p.size === state.size
      );
    } else {
      detailProductOrder = values.detailOrderProducts.find(
        (v) => v.product?.id === tempProduct?.id
      );
      detailTempProduct = values.products.find((p) => p.product?.id === tempProduct?.id);
    }

    return { detailProductOrder, detailTempProduct };
  };

  const addProductToOrder = () => {
    let { detailProductOrder, detailTempProduct } = getProductTempTables();
    if (detailTempProduct && detailProductOrder) {
      setValues({
        ...values,
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
        products: [
          { qty: state.qty, size: state.size, id: null, product: tempProduct },
          ...values.products,
        ],
      });
      return;
    }

    if (detailProductOrder) {
      setValues({
        ...values,
        detailOrderProducts: values.detailOrderProducts.map((d) => {
          if (d.product.id === detailProductOrder.product.id) {
            d.quantity = d.quantity + state.qty;
          }
          return d;
        }),
      });
    }

    if (detailTempProduct) {
      setValues({
        ...values,
        products: values.products.map((p) => {
          if (p.product.id === detailTempProduct.product.id) {
            p.qty = p.qty + state.qty;
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
        product: tempProduct,
        qty: state.qty,
        size: state.size,
      });

      if (
        values.products.some((p) =>
          colors.enableClothesShopping
            ? p.product.id === tempProduct?.id && p.size === state.size
            : p.product.id === tempProduct?.id
        )
      ) {
        const productOld = values.products.find((p) =>
          colors.enableClothesShopping
            ? p.product.id === tempProduct?.id && p.size === state.size
            : p.product.id === tempProduct?.id
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
        products: values.products.some((p) =>
          colors.enableClothesShopping
            ? p.product.id === tempProduct.id && p.size === state.size
            : p.product.id === tempProduct.id
        )
          ? values.products.map((p) =>
              (
                colors.enableClothesShopping
                  ? p.product.id === tempProduct.id && p.size === state.size
                  : p.product.id === tempProduct.id
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

  return { state, setState, addProductToStorage };
};
