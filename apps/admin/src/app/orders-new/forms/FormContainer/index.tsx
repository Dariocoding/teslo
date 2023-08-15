import { useCartStore, useConfigEnterpriseStore } from "@/store";
import * as React from "react";
import { toast } from "react-hot-toast";
import { Form, Formik, FormikConfig, FormikHelpers, useFormikContext } from "formik";
import FormUserNewOrder from "../FormUser";
import FormProducts from "../FormProducts";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  DetailOrder,
  DetailOrderTemp,
  Order,
  OrderDto,
  PaymentMethod,
  Product,
  Size,
  StatusOrder,
  User,
} from "@teslo/interfaces";
import Loader, { hideLoader, showLoader } from "@/components/ui/Loader";
import StatusOrderOverForm from "./StatusOrderOverForm";
import { useInitFormContainer } from "./useInitFormContainer";
import { ordersService } from "@teslo/services";
import ReferenceOverForm from "./ReferenceOverForm";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import RenderIf from "@/components/ui/RenderIf";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";

export interface IFormContainerOrderProps {
  tempProducts?: DetailOrderTemp[];
  order?: Order;
}

interface TempProduct extends Partial<Product> {}

export interface NewOrderValues {
  order?: Order;
  user: User;
  tempProduct: TempProduct;
  searchProduct: string;
  tempQty: number;
  tempSize: Size;
  products: DetailOrderTemp[];
  paymentMethod: PaymentMethod;
  status: StatusOrder;
  tempReference: string;
  detailOrderProducts: DetailOrder[];
}

const onKeyDown: React.KeyboardEventHandler<HTMLFormElement> = (keyEvent) => {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
};

const FormContainerOrder: React.FunctionComponent<IFormContainerOrderProps> = (props) => {
  const {} = props;
  const { setCart } = useCartStore();
  const { formatMessage: t } = useIntl();
  const validateForm = useValidateForm();
  const { configEnterprise } = useConfigEnterpriseStore();
  const { initialValues, loading, paymentMethods, error } = useInitFormContainer(props);

  if (loading) return <Loader loading />;

  const onSubmit: FormikConfig<NewOrderValues>["onSubmit"] = async (values, actions) => {
    const isValid = validateForm(values);
    if (!isValid) return;
    if (values.order) editOrder(values, actions);
    if (!values.order) createNewOrder(values, actions);
  };

  async function editOrder(values: NewOrderValues, actions: FormikHelpers<NewOrderValues>) {
    try {
      showLoader();
      const subtotalTempProducts = values.products.reduce((prev: number, curr: DetailOrderTemp) => {
        return prev + (curr?.product?.price ?? curr.price) * curr.qty;
      }, 0);
      const subtotalOrderProducts = values.detailOrderProducts.reduce(
        (prev: number, curr: DetailOrder) => {
          return prev + curr.total * curr.quantity;
        },
        0
      );

      const subtotal = subtotalOrderProducts + subtotalTempProducts;
      const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
      const total = subtotal + parseFloat(IVA);
      const order: OrderDto = {
        status: values.status,
        paymentMethod: values.paymentMethod,
        reference: values.tempReference,
        detail: [
          ...values.detailOrderProducts.map((d) => ({
            id: d.id,
            quantity: d.quantity,
            product: d.product,
            total: d.total,
            size: d.size,
          })),
          ...values.products.map((p) => ({
            quantity: p.qty,
            product: p.product,
            total: p?.product?.price ?? p.price,
            size: p.size,
          })),
        ],
        total,
        subtotal,
      };

      await ordersService.updateOrder(values.order.idorder, order);
      Swal.fire(t({ id: "orders.edit.success" }), "", "success");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  async function createNewOrder(values: NewOrderValues, actions: FormikHelpers<NewOrderValues>) {
    try {
      showLoader();
      const subtotal = values.products.reduce((prev: number, curr: DetailOrderTemp) => {
        return prev + (curr?.product?.price ?? curr.price) * curr.qty;
      }, 0);
      const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
      const total = subtotal + parseFloat(IVA);
      const order: OrderDto = {
        iva: configEnterprise.iva,
        //@ts-ignore
        customer: values.user,
        status: values.status,
        paymentMethod: values.paymentMethod,
        reference: values.tempReference,
        detail: values.products.map((p) => ({
          quantity: p.qty,
          product: p.product,
          total: p?.product?.price ?? p.price,
          size: p.size,
        })),
        total,
        subtotal,
      };

      await ordersService.createOrderBySeller(order);
      Swal.fire(t({ id: "orders.add.success" }), "", "success");
      actions.resetForm();
      actions.setFieldValue("products", []);
      setCart([]);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  return (
    <React.Fragment>
      <RenderIf isTrue={error}>
        <HeaderDashboard
          title={t({ id: initialValues.order ? "orders.edit.title" : "orders.add.title" })}
          icon={<RiMoneyDollarCircleFill />}
          to={validPaths.orders.path}
          breadcrumbs={[
            { label: t({ id: "dashboard.title" }), to: validPaths.dashboard.path },
            { label: t({ id: "orders.title" }), to: validPaths.orders.path },
            { label: t({ id: initialValues.order ? "orders.edit.title" : "orders.add.title" }) },
          ]}
        >
          <div className="tile max-w-[500px] mx-auto">
            <div className="mb-3">
              <img src="/img/others/error.png" alt="Error" className="mx-auto w-28" />
            </div>
            <div className="text-center text-sm text-red-500 font-semibold">{error}</div>
          </div>
        </HeaderDashboard>
      </RenderIf>
      <RenderIf isTrue={!error}>
        <Formik<NewOrderValues> onSubmit={onSubmit} initialValues={initialValues}>
          <Form className="p-4 relative h-full" onKeyDown={onKeyDown}>
            <div className="flex items-start justify-center gap-4">
              <div className="w-full">
                <div>
                  <FormUserNewOrder classNameContainer="max-w-[1100px] w-full mx-auto" />
                </div>

                <div>
                  <FormProducts
                    classNameContainer="max-w-[1200px] w-full mx-auto"
                    paymentMethods={paymentMethods}
                  />
                </div>
              </div>
            </div>
            <StatusOrderOverForm />
            <ReferenceOverForm />
          </Form>
        </Formik>
      </RenderIf>
    </React.Fragment>
  );
};

export default FormContainerOrder;

export const useOrdersFormContext = () => useFormikContext<NewOrderValues>();

const useValidateForm = () => {
  const { formatMessage: t } = useIntl();
  return (values: NewOrderValues) => {
    /*     if (!values.user.iduser) {
      toast.error(t({ id: "orders.error.customer.required" }));
      return false;
    } */

    if (!values.products?.length && !values.detailOrderProducts?.length) {
      toast.error(t({ id: "orders.error.products.required" }));
      return false;
    }

    return true;
  };
};
