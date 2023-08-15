import { Modal } from "@/components/ui";
import { OptionsCart, useConfigApp } from "@/store";
import { formatter } from "@/utils";
import { Product } from "@teslo/interfaces";
import * as React from "react";
import ImagesModalProduct from "./ImagesModalProduct";
import DetailInfoProduct from "./DetailInfoProduct";
import FormStateProduct from "./FormStateProduct";
import { useInsertProduct } from "./useInsertProduct";

interface IModalInsertProductProps {
  onClose(): void;
  show: boolean;
  product: Product;
  preventModalEnter?: boolean;
}

const ModalInsertProduct: React.FunctionComponent<IModalInsertProductProps> = (props) => {
  const { onClose, show, product = {} } = props;
  const [fixStateModalEnter, setFixStateModalEnter] = React.useState(false);
  const { colors } = useConfigApp();
  const { setState, state, addProductToStorage } = useInsertProduct(product);
  const handleAcceptProduct = () => addProductToStorage(onClose);

  React.useEffect(() => {
    if (product) {
      setState({
        size: product.sizes.length && colors.enableClothesShopping ? product.sizes[0] : null,
        qty: 1,
      });
    } else {
      setState({ size: null, qty: 1 });
    }
  }, [product, colors.enableClothesShopping]);

  React.useEffect(() => {
    const onEnter = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !fixStateModalEnter) return;
      handleAcceptProduct();
    };
    document.addEventListener("keypress", onEnter);

    return () => {
      document.removeEventListener("keypress", onEnter);
    };
  }, [handleAcceptProduct]);

  React.useEffect(() => {
    setFixStateModalEnter(show);
  }, [show]);

  return (
    <Modal
      title={
        <h6 className="sm:text-xl text-lg">
          {product?.title + " " + `(${formatter.format(product?.price || 0)})`}
        </h6>
      }
      onClose={onClose}
      showModal={show}
      size="xl"
    >
      <div className="lg:grid lg:grid-cols-3 gap-4 lg:gap-8 flex flex-col items-start">
        <ImagesModalProduct product={product} className="lg:order-1 order-2" />
        <div className="lg:col-span-2 lg:order-2 order-1">
          <div className="flex flex-wrap gap-1.5 sm:gap-3 items-start">
            <DetailInfoProduct product={product} className="max-w-[275px]" />
            <FormStateProduct
              {...{
                setState,
                state,
                product,
                handleAcceptProduct,
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInsertProduct;
