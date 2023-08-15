import * as React from "react";
import { Popover } from "@headlessui/react";
import RenderCart from "./RenderCart";
import { useCartStore } from "@/store";
import { formatter, validPaths } from "@/utils";
import { Link } from "react-router-dom";
import { translate } from "@/i18n";

interface ICartPanelProps {
  close(): void;
}

type Ref = React.ForwardedRef<any>;

const CartPanel: React.FunctionComponent<ICartPanelProps> = React.forwardRef((props, ref: Ref) => {
  const { close } = props;
  const { cart, clean } = useCartStore();

  const subtotal = cart.reduce(
    (acc, cart) => acc + cart.qty * (cart.product?.price ?? cart?.price),
    0
  );

  return (
    <Popover.Panel
      ref={ref}
      className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0"
    >
      <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
        <div className="relative bg-white">
          <div className="max-h-[45vh] p-5 overflow-y-auto hiddenScrollbar">
            <h3 className="text-xl font-semibold text-black">
              {translate("orders.shoppingCart.title")}
            </h3>
            <div className="divide-y divide-slate-100">
              {cart.map((cart) => (
                <RenderCart key={cart.id + " - " + cart.size} close={close} cart={cart} />
              ))}
            </div>
          </div>
          <div className="bg-neutral-50 p-5">
            <p className="flex justify-between font-semibold text-slate-900">
              <span>
                <span>Subtotal</span>
                <span className="block text-sm text-slate-500 font-normal">
                  {translate("orders.shoppingCart.calculated")}
                </span>
              </span>
              <span className="">{formatter.format(subtotal)}</span>
            </p>
            <div className="flex space-x-2 mt-5">
              <button
                onClick={clean}
                className="btn btn-alternative btn-sm flex-1 hover:bg-gray-200"
              >
                {translate("app.clean")}
              </button>
              <Link to={validPaths.newOrder.path} className="btn btn-primary btn-sm flex-1">
                {translate("orders.shoppingCart.viewCart")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Popover.Panel>
  );
});

export default CartPanel;
