import { Form, Formik, FormikConfig, FormikHelpers, FormikProps, useFormikContext } from "formik";
import * as React from "react";
import GridInsertClientProduct from "./GridInsertClientProduct";
import Discounts from "./Discounts";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { translate } from "@/i18n";
import {
  DetailOrder,
  DetailOrderTemp,
  Order,
  OrderDto,
  PaymentMethod,
  StatusOrder,
  User,
} from "@teslo/interfaces";
import ActionsOrder from "./ActionsOrder";
import InputFormik from "@/components/@forms/InputFormik";
import PaymentMethodsOrder from "./PaymentMethods";
import { useFetchPaymentMethods } from "@/app/config/PaymenMethods/hooks/useFetchPaymentMethods";
import Loader, { hideLoader, showLoader } from "@/components/ui/Loader";
import ProfileUser from "./ProfileUser";
import ListProducts from "./ListProducts";
import { Cart, useCartStore, useConfigEnterpriseStore } from "@/store";
import { useIntl } from "react-intl";
import toast from "react-hot-toast";
import { ordersService } from "@teslo/services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validPaths } from "@/utils";
import ExtraActions from "./ExtraActions";

interface INewFormOrderProps {
  cart?: Cart[];
  order?: Order;
}

export interface NewOrderValues {
  order?: Order;
  user: User;
  reference: string;
  products: DetailOrderTemp[];
  paymentMethod: PaymentMethod;
  status: StatusOrder;
  detailOrderProducts: DetailOrder[];
  discount: number;
}

const NewFormOrder: React.FunctionComponent<INewFormOrderProps> = (props) => {
  const { cart, order } = props;
  const navigate = useNavigate();
  const { setCart } = useCartStore();
  const { formatMessage: t } = useIntl();
  const { configEnterprise } = useConfigEnterpriseStore();
  const validateForm = useValidateForm();
  const refFormik = React.useRef<FormikProps<NewOrderValues>>();
  const { data: dataPaymentMethods, isLoading: isLoadingPaymentMethods } = useFetchPaymentMethods();
  const paymentMethods = dataPaymentMethods.filter((p) => p.visible);

  const initialValues: NewOrderValues = {
    status: order?.status || "completed",
    user: order?.user || null,
    reference: order?.reference || "",
    products: cart || [],
    detailOrderProducts: order?.detail || [],
    paymentMethod: order?.paymentMethod || null,
    order,
    discount: order?.discount || 0,
  };

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
      const totalDiscount = values.discount ? values.discount / 100 : 0;
      const subtotal = subtotalOrderProducts + subtotalTempProducts;
      const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
      let total = subtotal + parseFloat(IVA);
      total = totalDiscount ? total - totalDiscount * total : total;

      const order: OrderDto = {
        status: values.status,
        paymentMethod: values.paymentMethod,
        reference: values.reference,
        customer: values.user,
        detail: [
          ...values.detailOrderProducts.map((d) => ({
            id: d.id,
            quantity: d.quantity,
            product: d.product,
            total: d.total,
            size: d.size,
            title: d.title || d?.product?.title,
          })),
          ...values.products.map((p) => ({
            quantity: p.qty,
            product: p.product,
            total: p?.product?.price ?? p.price,
            size: p.size,
            title: p?.product?.title ?? p.title,
          })),
        ],
        discount: values.discount,
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
      const totalDiscount = values.discount ? values.discount / 100 : 0;
      const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
      let total = subtotal + parseFloat(IVA);
      total = totalDiscount ? total - totalDiscount * total : total;

      const order: OrderDto = {
        iva: configEnterprise.iva,
        customer: values.user,
        status: values.status,
        paymentMethod: values.paymentMethod,
        reference: values.reference,
        detail: values.products.map((p) => ({
          quantity: p.qty,
          product: p.product,
          total: p?.product?.price ?? p.price,
          size: p.size,
          title: p.product?.title ?? p.title,
        })),
        discount: values.discount,
        total,
        subtotal,
      };

      const req = await ordersService.createOrderBySeller(order);
      Swal.fire(t({ id: "orders.add.success" }), "", "success");
      actions.resetForm();
      actions.setFieldValue("products", []);
      setCart([]);
      navigate(validPaths.invoiceOrder.fnPath(req.data.idorder));
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  const isLoading = isLoadingPaymentMethods;

  React.useEffect(() => {
    if (!isLoading) {
      if (paymentMethods.length && !order) {
        refFormik.current.setValues({
          ...refFormik.current.values,
          paymentMethod: paymentMethods[0],
        });
      }
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="p-3 h-full w-full">
        <Loader loading className="w-full bg-white z-50 rounded-md h-full" />
      </div>
    );
  }

  /*  if (!paymentMethods.length) {
    throw new Error("Paymenth methods are empty, please try adding new payment methods");
  } */

  return (
    <Formik innerRef={refFormik} onSubmit={onSubmit} initialValues={initialValues}>
      <Form>
        <div className="flex items-start justify-start lg:flex-row flex-col gap-x-4">
          <div className="lg:max-w-[60%] w-full">
            <div className="flex items-center flex-wrap gap-x-4">
              <div className="tile mb-2 flex-grow w-auto rounded-md p-3">
                <GridInsertClientProduct />
              </div>
              <div className="tile mb-2 flex-grow w-auto rounded-md p-3">
                <div className="flex items-center relative">
                  <span className="text-xs py-2 pl-2.5 pr-2 rounded-l-lg shadow border border-gray-300 bg-gray-200 flex-grow h-[38px] sm:h-[34px] flex items-center justify-center">
                    <BsFillFileEarmarkTextFill />
                  </span>
                  <InputFormik
                    classNameInput="form-control form-control-sm pr-9 rounded-l-none"
                    placeholder={translate("orders.label.reference")}
                    name="reference"
                    className="mb-0 w-full"
                    showError={false}
                    showSuccess={false}
                  />
                </div>
              </div>
            </div>
            <div className="tile p-3 mb-2">
              <ProfileUser />
            </div>
            <ListProducts />
          </div>
          <div className="flex flex-col gap-3 items-start justify-start flex-wrap flex-grow">
            <ExtraActions className="w-full flex flex-wrap gap-2" />
            <PaymentMethodsOrder
              className="w-full flex flex-wrap md:gap-3 gap-2"
              paymentMethods={paymentMethods}
            />
            <Discounts className="w-full flex flex-wrap md:gap-3 gap-2" />
            <ActionsOrder className="flex gap-2 w-full" />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default NewFormOrder;

export const useOrderFormContext = () => useFormikContext<NewOrderValues>();

const useValidateForm = () => {
  const { formatMessage: t } = useIntl();
  return (values: NewOrderValues) => {
    /* if (!values.user.iduser) {
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
