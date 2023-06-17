import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { translate } from "@/i18n";
import { Provider, ProviderDto } from "@teslo/interfaces";
import { providersService } from "@teslo/services";
import { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";

interface IFormProviderProps {
  provider?: Provider;
  onSuccess?(data: Provider): void;
}

const FormProvider: React.FunctionComponent<IFormProviderProps> = (props) => {
  const { provider: providerToUpdate, onSuccess } = props;
  const { formatMessage } = useIntl();
  const status = providerToUpdate ? "update" : "create";

  const onSubmit = async (values: ProviderDto) => {
    try {
      let req: AxiosResponse<Provider>;
      if (status === "create") {
        req = await providersService.create(values);
        const messageSuccess = formatMessage({ id: "providers.add.success" });
        toast.success(messageSuccess);
      } else if (status === "update") {
        req = await providersService.update(providerToUpdate?.idprovider, values);
        const messageSuccess = formatMessage({ id: "providers.edit.success" });
        toast.success(messageSuccess);
      }
      onSuccess?.(req.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const INITIAL_VALUES: Required<ProviderDto> = {
    name: providerToUpdate?.name || "",
    phone1: providerToUpdate?.phone1 || "",
    phone2: providerToUpdate?.phone2 || "",
    email: providerToUpdate?.email || "",
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
      <Form>
        <InputFormik
          placeholder={translate("providers.placeholder.name")}
          name="name"
          label={translate("providers.label.name")}
        />

        <InputFormik
          placeholder={translate("providers.placeholder.phone1")}
          name="phone1"
          label={translate("providers.label.phone1")}
        />

        <InputFormik
          placeholder={translate("providers.placeholder.phone2")}
          name="phone2"
          label={translate("providers.label.phone2")}
        />

        <InputFormik
          placeholder={translate("providers.placeholder.email")}
          name="email"
          label={translate("providers.label.email")}
        />

        <ButtonFormik full className="mb-0 btn-primary btn-sm">
          {formatMessage({
            id: status === "create" ? "providers.add.title" : "providers.edit.title",
          })}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormProvider;
