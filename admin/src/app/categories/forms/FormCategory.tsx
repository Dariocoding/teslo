import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { Category, CategoryDto } from "@teslo/interfaces";
import { CategoryRequestResponse, categoriesService } from "@teslo/services";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IFormCategoryProps {
  onSuccess?: (data: Category) => void;
  category?: Category;
}

const FormCategory: React.FunctionComponent<IFormCategoryProps> = (props) => {
  const { onSuccess, category: categoryToUpdate } = props;
  const { formatMessage } = useIntl();
  const status = categoryToUpdate ? "update" : "create";
  const [errorMessage, setErrorMessage] = useTimeOutMessage();

  const initialValues: CategoryDto = {
    title: categoryToUpdate?.title || "",
  };

  const onSubmit = async (data: CategoryDto) => {
    try {
      let req: AxiosResponse<CategoryRequestResponse>;
      if (status === "create") {
        req = await categoriesService.createCategory(data);
        const message = formatMessage({ id: "categories.add.success" });
        toast.success(message);
      } else if (status === "update") {
        req = await categoriesService.updateCategory(categoryToUpdate.idcategory, data);
        const message = formatMessage({ id: "categories.edit.success" });
        toast.success(message);
      }
      if (onSuccess) onSuccess(req.data.category);
    } catch (error) {
      console.log(error);
      const errorMessage: string = error.response.data.message;

      if (typeof errorMessage === "string" && errorMessage.includes("Ya existe la llave")) {
        setErrorMessage(formatMessage({ id: "categories.error.name.alreadyExist" }));
      } else if (typeof errorMessage === "string" && errorMessage.length > 0) {
        setErrorMessage(error.response.data.message);
      } else {
        const message =
          status === "create"
            ? formatMessage({ id: "categories.add.error" })
            : formatMessage({ id: "categories.edit.error" });

        setErrorMessage(message);
      }
    }
  };

  const validationSchema = yup.object({
    title: yup.string().required(formatMessage({ id: "categories.error.name.required" })),
  });

  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      <Form>
        <InputFormik
          name="title"
          placeholder={formatMessage({ id: "categories.placeholder.name" })}
          label={formatMessage({ id: "categories.label.name" })}
          forceErrorMessage={errorMessage}
        />

        <ButtonFormik className="btn-primary btn-sm" full>
          {status === "create"
            ? formatMessage({ id: "categories.edit.title" })
            : formatMessage({ id: "categories.add.title" })}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormCategory;
