import { protectedRoutes } from "@/utils";
import { Product, Size, ValidRoles } from "@teslo/interfaces";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import * as React from "react";
import { FaCog, FaPen, FaShoppingCart, FaTrash } from "react-icons/fa";
import { IoMdFlash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useNotificationAddToCart } from "@/components/ui/NotificationAddToCart/useNotificationAddToCart";
import RenderIf from "@/components/ui/RenderIf";
import { translate } from "@/i18n";
import { HiViewGrid } from "react-icons/hi";
import { AiOutlineBarcode } from "react-icons/ai";
import AuthorityCheck from "@/components/AuthorityCheck";

export interface IActionsProductsProps {
  product: Product;
  onDeleteProduct?(product: Product): void;
  onUpdateProduct(product: Product): void;
  onQuickEditProduct?(product: Product): void;
  onViewBarCode?(product: Product): void;
  showButtonCartProduct?: boolean;
}

const ActionsProducts: React.FunctionComponent<IActionsProductsProps> = (props) => {
  const {
    product,
    onDeleteProduct,
    onUpdateProduct,
    onQuickEditProduct,
    onViewBarCode,
    showButtonCartProduct = true,
  } = props;
  const notifyCart = useNotificationAddToCart();
  const navigate = useNavigate();
  const handleClickViewProduct = () => navigate(protectedRoutes.viewProduct.fnPath(product.slug));
  const handleClickUpdateProduct = () => onUpdateProduct(product);
  const handleClickDeleteProduct = () => onDeleteProduct(product);
  const handleClickQuickEditProduct = () => onQuickEditProduct(product);
  const handleClickViewBarCode = () => onViewBarCode(product);

  const handleClickAddProductCart = (size?: Size) => {
    if (!product.stock) return;
    if (!product.sizes?.length || product.sizes?.length === 1) {
      notifyCart(product, {
        qty: 1,
        size: null,
      });
    } else if (product.sizes?.length && product.sizes?.length > 1) {
      notifyCart(product, {
        qty: 1,
        size,
      });
    }
  };

  return (
    <React.Fragment>
      <RenderIf
        isTrue={product.sizes?.length && product.sizes?.length > 1 && showButtonCartProduct}
      >
        <span className="mr-1">
          <Dropdown
            inTable
            displayButton={<FaShoppingCart />}
            classNameButton="btn btn-warning btn-xs mb-0"
            disabledDisplayButton={!product.stock}
          >
            <DropdownItem enableHoverClasses={false} enablePaddings={false} className="">
              <div className="flex items-center text-sm">
                {product.sizes?.map?.((size, i) => (
                  <span
                    key={i}
                    className="transition hover:bg-gray-200 p-2 font-semibold"
                    onClick={() => handleClickAddProductCart(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </DropdownItem>
          </Dropdown>
        </span>
      </RenderIf>
      <RenderIf
        isTrue={(!product.sizes?.length || product.sizes?.length === 1) && showButtonCartProduct}
      >
        <button
          type="button"
          className="btn btn-warning btn-xs mb-0"
          onClick={() => handleClickAddProductCart()}
          disabled={!product.stock}
        >
          <FaShoppingCart />
        </button>
      </RenderIf>

      <Dropdown
        inTable
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
            <HiViewGrid className="text-slate-800 text-lg" />
          </span>{" "}
          {translate("products.actions.view")}
        </DropdownItem>
        <RenderIf isTrue={onViewBarCode}>
          <DropdownItem
            className="flex items-center justify-start gap-1 text-sm"
            onClick={handleClickViewBarCode}
          >
            <span>
              <AiOutlineBarcode className="text-slate-800 text-lg" />
            </span>{" "}
            {translate("products.actions.viewBarCode")}
          </DropdownItem>
        </RenderIf>
        <AuthorityCheck
          validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}
        >
          <DropdownItem
            className="flex items-center justify-start gap-1 text-sm"
            onClick={handleClickUpdateProduct}
          >
            <span>
              <FaPen className="text-blue-500" />
            </span>{" "}
            {translate("products.actions.edit")}
          </DropdownItem>
          <RenderIf isTrue={onQuickEditProduct}>
            <DropdownItem
              className="flex items-center justify-start gap-1 text-sm"
              onClick={handleClickQuickEditProduct}
            >
              <span>
                <IoMdFlash className="text-orange-600 text-lg" />
              </span>{" "}
              {translate("products.actions.quickEdit")}
            </DropdownItem>
          </RenderIf>
          <RenderIf isTrue={onDeleteProduct}>
            <DropdownItem
              className="flex items-center justify-start gap-1 text-sm"
              onClick={handleClickDeleteProduct}
            >
              <span>
                <FaTrash className="text-red-700" />
              </span>{" "}
              {translate("products.actions.delete")}
            </DropdownItem>
          </RenderIf>
        </AuthorityCheck>
      </Dropdown>
    </React.Fragment>
  );
};

export default ActionsProducts;
