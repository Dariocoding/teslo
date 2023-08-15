import * as React from "react";
import Drawers from "./Drawers";
import { Product } from "@teslo/interfaces";
import ModalInsertProduct from "./ModalSelectProduct";
import SuperInputsOrders from "./SuperInputsOrders";

interface IGridInsertClientProductProps {}

const GridInsertClientProduct: React.FunctionComponent<IGridInsertClientProductProps> = (props) => {
  const {} = props;
  const [tempProduct, setTempProduct] = React.useState<Product>(null);
  const [showDrawerProducts, setShowDrawerProducts] = React.useState(false);
  const [showDrawerClient, setShowDrawerClient] = React.useState(false);

  const toggleDrawerProducts = () => setShowDrawerProducts(!showDrawerProducts);
  const toggleDrawerCustomer = () => setShowDrawerClient(!showDrawerClient);

  const onClickProductDrawer = (product: Product) => {
    setShowDrawerProducts(false);
    setTempProduct(product);
  };

  return (
    <div className="grid md:grid-cols-2 gap-2.5">
      <SuperInputsOrders {...{ toggleDrawerCustomer, toggleDrawerProducts, setTempProduct }} />
      <Drawers
        {...{
          showDrawerClient,
          showDrawerProducts,
          setShowDrawerClient,
          setShowDrawerProducts,
          onClickProductDrawer,
        }}
      />

      <ModalInsertProduct
        show={Boolean(tempProduct)}
        product={tempProduct}
        onClose={() => setTempProduct(null)}
      />
    </div>
  );
};

export default GridInsertClientProduct;
