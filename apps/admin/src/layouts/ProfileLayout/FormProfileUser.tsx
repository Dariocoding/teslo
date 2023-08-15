import { includesRolUser } from "@/app/users/forms/FormUser";
import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import SelectFormik from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { useAuthStore, useConfigEnterpriseStore } from "@/store";
import { capitalize } from "@/utils";
import { User, UserDto } from "@teslo/interfaces";
import RenderIf from "@/components/ui/RenderIf";
import { Form, Formik, FormikHelpers } from "formik";
import * as React from "react";
import toast from "react-hot-toast";
import { useIntl } from "react-intl";
import * as yup from "yup";

interface IFormProfileUserProps {
  user: User;
  onSubmitUpdateUser(user: UserDto): Promise<void>;
  extraInitialValues?: UserDto;
  extraInputsForm?: React.ReactNode;
}

const FormProfileUser: React.FunctionComponent<IFormProfileUserProps> = (props) => {
  const { user, onSubmitUpdateUser, extraInitialValues = {}, extraInputsForm } = props;
  const { formatMessage: t } = useIntl();
  const { user: useAuth } = useAuthStore();
  const { configEnterprise } = useConfigEnterpriseStore();
  const initialValues: UserDto = {
    lastName: user?.lastName,
    firstName: user?.firstName,
    email: user?.email,
    phone: user.phone,
    ...extraInitialValues,
  };

  async function onSubmit(values: UserDto, actions: FormikHelpers<UserDto>) {
    if (!includesRolUser(values)) {
      values.prefix = null;
      values.dni = null;
    } else {
      if (!values.prefix.trim() || !values.dni.trim()) {
        toast.error(t({ id: "users.error.dni.empty" }));
        return;
      }
    }
    actions.setSubmitting(true);
    await onSubmitUpdateUser(values);
    actions.setSubmitting(false);
  }

  const validationSchema = yup.object({
    firstName: yup.string().required(translate("users.error.firstName.required")),
    lastName: yup.string().required(translate("users.error.lastName.required")),
    email: yup
      .string()
      .required(translate("users.error.email.required"))
      .email(translate("users.error.email.invalid")),
    password: yup.string().min(6, translate("users.error.password.invalidLength")),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ values }) => (
        <Form className="text-start">
          <RenderIf isTrue={includesRolUser(values)}>
            <div className="grid lg:grid-cols-4 lg:gap-4">
              <div className="lg:col-span-3">
                <div className="flex items-center">
                  <SelectFormik
                    options={configEnterprise.prefixes.map((value) => ({
                      label: capitalize(value),
                      value,
                    }))}
                    name="prefix"
                    label={translate("users.label.prefix")}
                    className="mr-1.5"
                  />
                  <InputFormik
                    label={translate("users.label.dni")}
                    name={"dni"}
                    placeholder={translate("users.placeholder.dni")}
                    required
                    className="w-full"
                    showError={false}
                    showSuccess={false}
                  />
                </div>
              </div>
            </div>
          </RenderIf>
          <InputFormik
            label={translate("users.label.firstName")}
            placeholder={translate("users.placeholder.firstName")}
            name={"firstName"}
          />

          <InputFormik
            label={translate("users.label.lastName")}
            placeholder={translate("users.placeholder.lastName")}
            name={"lastName"}
          />

          <InputFormik
            label={translate("users.label.email")}
            placeholder={translate("users.placeholder.email")}
            name={"email"}
          />

          <InputFormik
            label={translate("users.label.phone")}
            placeholder={translate("users.placeholder.phone")}
            name={"phone"}
          />

          {extraInputsForm}

          <InputFormik
            type={"password"}
            label={translate("users.label.password")}
            placeholder={translate("users.placeholder.password")}
            name={"password"}
          />

          <ButtonFormik className="btn-primary mb-0" full>
            Update Profile
          </ButtonFormik>
        </Form>
      )}
    </Formik>
  );
};

export default FormProfileUser;
