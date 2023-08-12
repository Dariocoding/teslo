import { Modal } from "@/components/ui";
import * as React from "react";
import { useOrderFormContext } from "..";
import Label from "@/components/@forms/label";
import { translate } from "@/i18n";
import { NumericFormat } from "react-number-format";
import { FaSave } from "react-icons/fa";
import { detailTempOrdersService } from "@teslo/services";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import { DetailOrder, DetailOrderTemp } from "@teslo/interfaces";

interface IModalServiceActionProps {
  showModal: boolean;
  onClose(): void;
  isProductAction?: boolean;
  isDetailOrderAction?: boolean;
  detail?: Partial<DetailOrder & DetailOrderTemp>;
}

const ModalServiceAction: React.FunctionComponent<IModalServiceActionProps> = (props) => {
  const { showModal, onClose, detail, isDetailOrderAction, isProductAction } = props;
  const inititalState = {
    price: detail?.total ?? detail?.price ?? 0,
    qty: detail?.quantity ?? detail?.qty ?? 1,
    title: detail?.title ?? "",
  };

  type State = typeof inititalState;

  const { formatMessage: t } = useIntl();
  const { addCart, setCart, cart } = useCartStore();
  const { values, setValues } = useOrderFormContext();
  const [state, setState] = React.useState<State>(inititalState);

  React.useEffect(() => {
    if (showModal) setState(inititalState);
  }, [showModal]);

  const onSave = async () => {
    const isEditing = Boolean(detail);

    if (!state.title) {
      return toast.error(t({ id: "products.error.name.required" }));
    }

    if (!state.price) {
      return toast.error(t({ id: "products.error.price.required" }));
    }

    if (!state.qty) {
      return toast.error(t({ id: "products.error.quantity.required" }));
    }

    if (!isEditing) {
      const req = await detailTempOrdersService.create({
        title: state.title,
        qty: state.qty,
        price: state.price,
        product: undefined,
      });
      setValues({ ...values, products: [req.data, ...values.products] });
      if (!values.order) addCart(req.data, { qty: req.data.qty, size: req.data.size });
      onClose();
    }

    if (isEditing) {
      const products = values.products.map((p) =>
        isProductAction && p.id === detail.id
          ? { ...p, price: state.price, qty: state.qty, title: state.title }
          : p
      );

      const detailOrderProducts = values.detailOrderProducts.map((d) =>
        isDetailOrderAction && d.id === detail.id
          ? { ...d, total: state.price, quantity: state.qty, title: state.title }
          : d
      );

      setValues({ ...values, products, detailOrderProducts });
      if (!values.order) {
        setCart(
          cart.map((c) =>
            detail.id === c.id
              ? { ...c, price: state.price, title: state.title, qty: state.qty }
              : c
          )
        );
      }
      onClose();
    }

    toast.success(t({ id: "app.save.success" }));
  };

  React.useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (!showModal) return;
      if (e.key === "Enter") {
        onSave();
      }
    };

    document.addEventListener("keydown", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyPress);
    };
  }, [showModal, onSave]);

  return (
    <Modal
      {...{ showModal, onClose }}
      title={t({ id: detail ? "orders.title.edit.service" : "orders.title.add.service" })}
      size="lg"
    >
      <div className="form-group">
        <Label className="font-semibold">{translate("app.title")}</Label>
        <input
          type="text"
          className="form-control"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mb-2">
        <div className="form-group">
          <Label className="font-semibold">{translate("orders.label.price")}</Label>
          <NumericFormat
            className="form-control"
            decimalScale={2}
            prefix="$ "
            allowNegative={false}
            value={state.price}
            onValueChange={(e) => setState({ ...state, price: e.floatValue })}
          />
        </div>
        <div className="form-group">
          <Label className="font-semibold">{translate("orders.label.qty")}</Label>
          <NumericFormat
            allowNegative={false}
            decimalScale={0}
            value={state.qty}
            className="form-control"
            onValueChange={(e) => setState({ ...state, qty: e.floatValue })}
          />
        </div>
      </div>
      <div>
        <button
          onClick={onSave}
          className="btn btn-primary mb-0 w-full btn-sm gap-1.5"
          type="button"
        >
          <FaSave /> {translate("app.save")}
        </button>
      </div>
    </Modal>
  );
};

export default ModalServiceAction;
