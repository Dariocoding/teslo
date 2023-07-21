import React from "react";
import useFirstLoad from "@/utils/hooks/useFirstLoad";
import axios from "axios";
import { Product } from "@teslo/interfaces";
import { productsService } from "@teslo/services";
import { ISearchResult } from "@/components/@forms/SearchList";
import { toast } from "react-hot-toast";
import { useOrdersFormContext } from "../forms/FormContainer";

export const useSearchProduct = () => {
  const { values, setValues } = useOrdersFormContext();
  const addingProduct = React.useRef(false);
  const [selected, setSelected] = React.useState<ISearchResult>(null);
  const [listProducts, setListProducts] = React.useState<Product[]>([]);
  const firstLoad = useFirstLoad();
  const [focused, setFocused] = React.useState(false);

  const onFocus = () => setFocused(true);

  const onBlur: React.FocusEventHandler<HTMLDivElement> = (eventBlur) => {
    const clickEvent = (eventClick: MouseEvent) => {
      const target = eventClick.target as EventTarget & HTMLElement;
      if (!document.querySelector(".container-input-code")?.contains?.(target)) {
        document.removeEventListener("click", clickEvent);
        setFocused(false);
        setListProducts([]);
      }
    };
    document.addEventListener("click", clickEvent);
  };

  function disableFocusInputName() {
    const element = document.getElementById("searchProduct");
    if (element) {
      element.blur();
      element.tabIndex = -1;
      setFocused(false);
      setListProducts([]);
      addingProduct.current = true;
    }
  }

  React.useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetcData() {
      let toastId: string;
      try {
        setListProducts([]);
        setValues({ ...values, tempQty: 0, tempProduct: null });
        if (!values.searchProduct?.trim()) {
          return;
        }
        toastId = toast.loading("Loading...");
        const req = await productsService.search(
          values.searchProduct,
          {
            cancelToken: ourRequest.token,
          },
          { optimize: true }
        );
        const products = req.data;
        const hayProductos = products.length > 0;
        if (hayProductos) setSelected(null);

        if (hayProductos && +values.searchProduct > 0) {
          const product = products.find((p) => +p.code === +values.searchProduct);
          if (product) setSelected({ value: product.id, label: product.title });
          else {
            setSelected({ value: products[0].id, label: products[0].title });
          }
        } else if (hayProductos && !+values.searchProduct) {
          setSelected({ value: products[0].id, label: products[0].title });
        }
        setListProducts(req.data);
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }

    if (!firstLoad && !addingProduct.current) fetcData();

    if (addingProduct.current) addingProduct.current = false;

    return () => {
      ourRequest.cancel();
    };
  }, [values.searchProduct]);

  const onClickResult = (id: string) => {
    const product = listProducts.find((product) => product.id === id);

    if (product) {
      setValues({
        ...values,
        searchProduct: product.code.toString(),
        tempProduct: product,
        tempQty: 1,
      });
      disableFocusInputName();
      addingProduct.current = true;
    }
  };

  return {
    listProducts,
    onBlur,
    onFocus,
    focused,
    onClickResult,
    selected,
    setSelected,
  };
};
