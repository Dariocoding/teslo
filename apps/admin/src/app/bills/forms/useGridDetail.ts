import { ISearchResult } from "@/components/@forms/SearchList";
import { BillDto, DetailBillDto, Product } from "@teslo/interfaces";
import { productsService } from "@teslo/services";
import { useFormikContext } from "formik";
import React from "react";

export const useGridDetail = (detail: DetailBillDto, idx: number) => {
  const [stateProducts, setStateProducts] = React.useState<Product[]>([]);
  const [selected, setSelected] = React.useState<ISearchResult>(null);
  const { values, setValues } = useFormikContext<BillDto>();
  const [focused, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);

  const onBlur: React.FocusEventHandler<HTMLDivElement> = (eventBlur) => {
    const clickEvent = (eventClick: MouseEvent) => {
      const target = eventClick.target as EventTarget & HTMLElement;
      if (!document.querySelector(".container-input-code")?.contains?.(target)) {
        document.removeEventListener("click", clickEvent);
        setFocused(false);
        setStateProducts([]);
      }
    };
    document.addEventListener("click", clickEvent);
  };

  const codeProductInput = `details[${idx}].product.code`;
  const nameInput = `details[${idx}].product.title`;
  const nameInputQty = `details[${idx}].qty`;
  const nameInputPrice = `details[${idx}].price`;
  const ammount = detail.qty * detail.price;

  const onTrashProduct = () => {
    if (values.details.length === 1) return;
    const newArr = values.details.filter((_, i) => i !== idx);
    setValues({ ...values, details: newArr });
  };

  const onCleanProduct = () => {
    setValues({
      ...values,
      details: values.details.map((_, i) =>
        i === idx
          ? {
              ...detail,
              qty: 0,
              price: 0,
              product: { code: 0, title: "" },
            }
          : _
      ),
    });
  };

  function disableFocusInputName() {
    const element = document.getElementById(codeProductInput);
    if (element) {
      element.blur();
      element.tabIndex = -1;
      setFocused(false);
      setStateProducts([]);
    }
  }

  const onClickResult = (id: string) => {
    const product = stateProducts.find((product) => product.id === id);

    if (product) {
      setValues({
        ...values,
        details: values.details.map((_, i) => (i === idx ? { ...detail, product, qty: 1 } : _)),
      });
      disableFocusInputName();
    }
  };

  React.useEffect(() => {
    if (!focused) return;

    const term = detail.product.code;
    // fetch to endpoint products

    async function searchProducts() {
      setSelected({ value: null, label: null });
      setValues({
        ...values,
        details: values.details.map((_, i) =>
          i === idx
            ? {
                ...detail,
                qty: 0,
                price: 0,
                product: {
                  title: "",
                  code: detail.product.code,
                },
              }
            : _
        ),
      });

      if (term) {
        const { data } = await productsService.search(term.toString());
        if (data.length) {
          setSelected({ value: data[0].id, label: data[0].title });
        }
        setStateProducts(data);
      }
    }

    searchProducts();
  }, [detail.product?.code]);

  return {
    stateProducts,
    focused,
    onFocus,
    onBlur,
    onTrashProduct,
    onCleanProduct,
    codeProductInput,
    nameInput,
    nameInputQty,
    nameInputPrice,
    ammount,
    onClickResult,
    selected,
    setSelected,
  };
};
