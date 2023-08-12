import { Drawer } from "@/components/ui";
import * as React from "react";
import { IDrawersProps } from "../Drawers";
import { translate } from "@/i18n";
import { useMedia } from "@/components/ui/hooks";
import ListProducts from "./ListProducts";

export interface IDrawerProductsProps
  extends Pick<
    IDrawersProps,
    "setShowDrawerProducts" | "showDrawerProducts" | "onClickProductDrawer"
  > {
  showPriceTooltip?: boolean;
}

const DrawerProducts: React.FunctionComponent<IDrawerProductsProps> = (props) => {
  const { showDrawerProducts, setShowDrawerProducts, onClickProductDrawer, showPriceTooltip } =
    props;
  const sm = useMedia("(max-width: 600px)");
  const width = sm ? 290 : 600;

  React.useEffect(() => {
    const openDrawerShortcut = (e: KeyboardEvent) => {
      const target = (e.target || {}) as HTMLElement;
      if (target?.nodeName !== "INPUT" && e.key === "p") {
        setShowDrawerProducts(!showDrawerProducts);
      }
    };

    document.addEventListener("keydown", openDrawerShortcut);

    return () => {
      document.removeEventListener("keydown", openDrawerShortcut);
    };
  }, [showDrawerProducts]);

  return (
    <Drawer
      overlayClassName="bg-black bg-opacity-25"
      width={width}
      shouldCloseOnOverlayClick={false}
      isOpen={showDrawerProducts}
      onClose={() => setShowDrawerProducts(false)}
      placement="left"
      title={<span className="text-xl font-semibold">{translate("products.title")} </span>}
      bodyClass="p-3"
    >
      <ListProducts {...{ sm, onClickProductDrawer, showPriceTooltip }} />
    </Drawer>
  );
};

export default DrawerProducts;
