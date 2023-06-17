import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { User, UserDto, ValidRol, ValidRoles } from "@teslo/interfaces";
import Alert from "@teslo/react-ui/Alert";
import RenderIf from "@teslo/react-ui/RenderIf";
import { usersService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { AxiosResponse } from "axios";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";

interface IFormUserProps {
  onSuccess?(user: User): void;
  user?: User;
  defaultValidRole?: ValidRol[];
}

const FormUser: React.FunctionComponent<IFormUserProps> = (props) => {
  const { onSuccess, defaultValidRole = [ValidRoles.USER], user: userToUpdate } = props;
  const status = userToUpdate ? "update" : "create";
  const { formatMessage } = useIntl();
  const [errorMessage, setErrorMessage] = useTimeOutMessage(5000);

  const INITIAL_VALUES: UserDto = {
    firstName: userToUpdate?.firstName || "",
    lastName: userToUpdate?.lastName || "",
    email: userToUpdate?.email || "",
    phone: userToUpdate?.phone || "",
    ...(userToUpdate?.password && { password: userToUpdate?.password }),

    isActive: userToUpdate?.isActive ?? true,
    roles: userToUpdate?.roles || defaultValidRole,
  };

  const onSubmit = async (values: UserDto) => {
    try {
      let req: AxiosResponse<User>;
      if (status === "create") {
        req = await usersService.createUser(values);
        toast.success(formatMessage({ id: "users.add.success" }));
      } else if (status === "update") {
        req = await usersService.updateUser(userToUpdate.iduser, values);
        toast.success(formatMessage({ id: "users.edit.success" }));
      }
      if (onSuccess) onSuccess(req.data);
    } catch (error) {
      console.log(error);
      const message: string = error.response?.data?.message;
      if (message.includes("Ya existe la llave")) {
        setErrorMessage(formatMessage({ id: "users.error.email.alreadyExist" }));
      } else {
        setErrorMessage(
          error.response.data.message ||
            (status === "create"
              ? formatMessage({ id: "users.add.error" })
              : formatMessage({ id: "users.edit.error" }))
        );
      }
    } finally {
    }
  };

  const validationSchema = yup.object({
    firstName: yup.string().required(translate("users.error.firstName.required")),
    lastName: yup.string().required(translate("users.error.lastName.required")),
    email: yup
      .string()
      .required(translate("users.error.email.required"))
      .email(translate("users.error.email.invalid")),
    ...(status === "create" && {
      password: yup
        .string()
        .required(translate("users.error.password.required"))
        .min(6, translate("users.error.password.invalidLength")),
    }),
    ...(status === "update" && {
      password: yup.string().min(6, translate("users.error.password.invalidLength")),
    }),
  });

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
        <RenderIf isTrue={errorMessage}>
          <Alert type="danger" className="mb-6">
            {errorMessage}
          </Alert>
        </RenderIf>

        {/*  <InputFormik label={""} name={"firstName"} placeholder={"Type a first name"} required />
         */}
        <div className="grid lg:grid-cols-2 lg:gap-4">
          <InputFormik
            label={translate("users.label.firstName")}
            name={"firstName"}
            placeholder={translate("users.placeholder.firstName")}
            required
          />

          <InputFormik
            label={translate("users.label.lastName")}
            name={"lastName"}
            placeholder={translate("users.placeholder.lastName")}
            required
          />
        </div>

        <InputFormik
          label={translate("users.label.email")}
          name={"email"}
          placeholder={translate("users.placeholder.email")}
          required
        />

        <InputFormik
          label={translate("users.label.phone")}
          name={"phone"}
          placeholder={translate("users.placeholder.phone")}
        />

        <InputFormik
          type={"password"}
          label={translate("users.label.password")}
          name={"password"}
          required
          placeholder={translate("users.placeholder.password")}
        />

        <SelectFormik
          name="isActive"
          options={[
            { value: true, label: translate("users.label.status.active") },
            { value: false, label: translate("users.label.status.inactive") },
          ]}
        />

        <SelectFormik
          multiple={true}
          name="roles"
          options={[
            { value: ValidRoles.ADMIN, label: translate("users.admin") },
            { value: ValidRoles.USER, label: translate("users.customer") },
          ]}
          onChange={(items: OptionReactSelect[], lastState) => {
            if (!items) return lastState;
            const copyItems = [...items];
            if (copyItems.length === 2) {
              copyItems.shift();
            }
            return copyItems.map((item) => item.value);
          }}
        />

        <ButtonFormik full className="btn-primary btn-sm">
          {status === "create" ? translate("users.add") : translate("users.edit")}
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormUser;
