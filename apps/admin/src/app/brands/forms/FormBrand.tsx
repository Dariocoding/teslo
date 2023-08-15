import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { translate } from "@/i18n";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { Brand, BrandDto } from "@teslo/interfaces";
import { brandsService } from "@teslo/services";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IFormBrandProps {
  onSuccess?: (data: Brand) => void;
  brand?: Brand;
}

const FormBrand: React.FunctionComponent<IFormBrandProps> = (props) => {
  const { onSuccess, brand: brandToUpdate } = props;
  const { formatMessage } = useIntl();
  const status = brandToUpdate ? "update" : "create";
  const [errorMessage, setErrorMessage] = useTimeOutMessage();

  const initialValues: BrandDto = {
    title: brandToUpdate?.title || "",
  };

  const onSubmit = async (data: BrandDto) => {
    try {
      let req: AxiosResponse<Brand>;
      if (status === "create") {
        req = await brandsService.create(data);
        const messageSuccess = formatMessage({ id: "brands.add.success" });
        toast.success(messageSuccess);
      } else if (status === "update") {
        req = await brandsService.update(brandToUpdate.idbrand, data);
        const messageSuccess = formatMessage({ id: "brands.edit.success" });
        toast.success(messageSuccess);
      }
      if (onSuccess) onSuccess(req.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message || "Error setting brand");
    }
  };

  const validationSchema = yup.object({
    title: yup.string().required(formatMessage({ id: "brands.error.name.required" })),
  });

  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      <Form>
        <InputFormik
          name="title"
          placeholder={translate("brands.placeholder.name")}
          label={translate("brands.label.name")}
          forceErrorMessage={errorMessage}
        />

        <ButtonFormik className="btn-primary btn-sm" full>
          {formatMessage({
            id: status === "create" ? "brands.add.title" : "brands.edit.title",
          })}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormBrand;
