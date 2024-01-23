import React from "react";
import useFirstLoad from "@/utils/hooks/useFirstLoad";
import axios from "axios";
import { Product } from "@teslo/interfaces";
import { productsService } from "@teslo/services";
import { ISearchResult } from "@/components/@forms/SearchList";
import { toast } from "react-hot-toast";
import { useOrdersFormContext } from "../../forms/FormContainer";

interface IUsearchProductProps {
  onSuccess?(product: Product): void;
}

export const useSearchProduct = (props: IUsearchProductProps) => {
  const { onSuccess } = props;
  const { values, setValues } = useOrdersFormContext();
  const firstLoad = useFirstLoad();
  const [selected, setSelected] = React.useState<ISearchResult>(null);
  const [listProducts, setListProducts] = React.useState<Product[]>([]);
  const [termProduct, setTermProduct] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);

  function disableFocusInputName() {
    const element = document.getElementById("searchProduct");
    setFocused(false);
    element?.blur?.();
    setListProducts([]);
    if (element) {
      element.tabIndex = -1;
    }
  }

  React.useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetcData() {
      let toastId: string;
      try {
        setListProducts([]);
        setFocused(true);
        if (!termProduct?.trim?.()) {
          return;
        }
        toastId = toast.loading("Loading...");
        const req = await productsService.search(
          termProduct,
          { cancelToken: ourRequest.token },
          { optimize: true }
        );
        const products = req.data;
        const hayProductos = products.length > 0;
        if (hayProductos) setSelected(null);

        if (hayProductos) {
          if (+termProduct > 0) {
            const newProducts = req.data.sort((a, b) => {
              if (a.code === +termProduct) return -1;
              return 1;
            });

            setSelected({ value: newProducts[0].id, label: newProducts[0].title });
            setListProducts(newProducts);
            /*   const product = products.find((p) => +p.code === +termProduct);
            if (product) setSelected({ value: product.id, label: product.title });
            else {
              setSelected({ value: products[0].id, label: products[0].title });
            } */
          }
          if (+termProduct === 0) {
            setSelected({ value: products[0].id, label: products[0].title });
          }
        }

        /*        if (hayProductos && +values.searchProduct > 0) {
          const product = products.find((p) => +p.code === +values.searchProduct);
          if (product) setSelected({ value: product.id, label: product.title });
          else {
            setSelected({ value: products[0].id, label: products[0].title });
          }
        } else if (hayProductos && !+values.searchProduct) {
          setSelected({ value: products[0].id, label: products[0].title });
        } */
        setListProducts(req.data);
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }

    if (!firstLoad) fetcData();

    return () => {
      ourRequest.cancel();
    };
  }, [termProduct]);

  const onClickResult = (id: string) => {
    const product = listProducts.find((product) => product.id === id);

    if (product) {
      onSuccess?.(product);
      setTermProduct("");
      disableFocusInputName();
    }
  };

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

  return {
    termProduct,
    setTermProduct,
    listProducts,
    selected,
    setSelected,
    onClickResult,
    onFocus,
    onBlur,
    focused,
  };
};
