import { useModalStore } from "@/store";
import { protectedRoutes } from "@/utils";
import { Product } from "@teslo/interfaces";
import Dropdown from "@teslo/react-ui/Dropdown";
import DropdownItem from "@teslo/react-ui/Dropdown/DropdownItem";
import * as React from "react";
import { FaCog, FaEye, FaPen, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useNotificationAddToCart } from "@/components/ui/NotificationAddToCart/useNotificationAddToCart";

interface IActionsProductsProps {
  product: Product;
  onDeleteProduct(product: Product): void;
  onUpdateProduct(product: Product): void;
}

const FormAddProductCart = React.lazy(() => import("@/app/products/forms/FormAddProductCart"));

const ActionsProducts: React.FunctionComponent<IActionsProductsProps> = (props) => {
  const { product, onDeleteProduct, onUpdateProduct } = props;
  const { setModal, closeModal } = useModalStore();
  const notifyCart = useNotificationAddToCart();
  const navigate = useNavigate();
  const handleClickViewProduct = () => navigate(protectedRoutes.viewProduct.fnPath(product.id));
  const handleClickUpdateProduct = () => onUpdateProduct(product);
  const handleClickDeleteProduct = () => onDeleteProduct(product);

  const handleClickAddProductCart = () => {
    setModal({
      title: "Add Product to Cart",
      children: (
        <React.Suspense fallback={<></>}>
          <FormAddProductCart product={product} onSuccess={() => closeModal()} />
        </React.Suspense>
      ),
    });
  };

  return (
    <React.Fragment>
      <button type="button" className="btn btn-warning btn-xs" onClick={handleClickAddProductCart}>
        <FaShoppingCart className="t" />
      </button>
      <Dropdown
        displayButton={
          <button type="button" className="btn btn-dark btn-xs">
            <FaCog />
          </button>
        }
      >
        <DropdownItem
          className="flex items-center justify-start gap-1 text-sm"
          onClick={handleClickViewProduct}
        >
          <span>
            <FaEye className="text-green-700" />
          </span>{" "}
          View Product
        </DropdownItem>
        <DropdownItem
          className="flex items-center justify-start gap-1 text-sm"
          onClick={handleClickUpdateProduct}
        >
          <span>
            <FaPen className="text-blue-500" />
          </span>{" "}
          Edit Product
        </DropdownItem>
        <DropdownItem
          className="flex items-center justify-start gap-1 text-sm"
          onClick={handleClickDeleteProduct}
        >
          <span>
            <FaTrash className="text-red-700" />
          </span>{" "}
          Delete Product
        </DropdownItem>
      </Dropdown>
    </React.Fragment>
  );
};

export default ActionsProducts;
