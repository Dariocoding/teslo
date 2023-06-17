import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { translate } from "@/i18n";
import { PaymentMethod, PaymentMethodDto } from "@teslo/interfaces";
import { paymentMethodService } from "@teslo/services";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import { Form, Formik, FormikHelpers } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IFormPaymentMethodProps {
  state: "create" | "update";
  paymentMethod?: PaymentMethod;
  onSuccess(payment: PaymentMethod): void;
}

const validationSchema = yup.object({ title: yup.string().required("Name is required") });

const FormPaymentMethod: React.FunctionComponent<IFormPaymentMethodProps> = (props) => {
  const { state, paymentMethod, onSuccess } = props;
  const { formatMessage } = useIntl();
  const initialValues: PaymentMethodDto = {
    title: paymentMethod?.title || "",
    owner: paymentMethod?.owner || "",
    phone: paymentMethod?.phone || "",
    email: paymentMethod?.email || "",
    dni: paymentMethod?.dni || "",
  };

  async function onSubmit(data: PaymentMethodDto, actions: FormikHelpers<PaymentMethodDto>) {
    try {
      let req: AxiosResponse<PaymentMethod>;

      if (state === "create") {
        req = await paymentMethodService.createOne(data);
        const messageSuccess = formatMessage({ id: "paymentMethods.add.success" });
        toast.success(messageSuccess);
        actions.resetForm();
      } else if (state === "update") {
        req = await paymentMethodService.updateOne(paymentMethod.idpaymentmethod, data);
        const messageSuccess = formatMessage({ id: "paymentMethods.edit.success" });
        toast.success(messageSuccess);
      }

      onSuccess?.(req.data);
    } catch (error) {
      console.log(error);
      toast.error("There was an error setting the payment method");
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={validationSchema}
    >
      <Form>
        <InputFormik
          label={translate("paymentMethods.label.name")}
          name={"title"}
          placeholder={translate("paymentMethods.placeholder.name")}
        />

        <InputFormik
          label={translate("paymentMethods.label.owner")}
          name={"owner"}
          placeholder={translate("paymentMethods.placeholder.owner")}
        />

        <InputFormik
          label={translate("paymentMethods.label.phone")}
          name={"phone"}
          placeholder={translate("paymentMethods.placeholder.phone")}
        />

        <InputFormik
          label={translate("paymentMethods.label.email")}
          name={"email"}
          placeholder={translate("paymentMethods.placeholder.email")}
        />

        <InputFormik
          label={translate("paymentMethods.label.DNI")}
          name={"dni"}
          placeholder={translate("paymentMethods.placeholder.DNI")}
        />

        <ButtonFormik
          className={classNames(
            "btn-sm",
            state === "create" && "btn-primary",
            state === "update" && "btn-danger"
          )}
          full
        >
          {formatMessage({
            id: state === "create" ? "paymentMethods.add.title" : "paymentMethods.edit.title",
          })}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormPaymentMethod;
