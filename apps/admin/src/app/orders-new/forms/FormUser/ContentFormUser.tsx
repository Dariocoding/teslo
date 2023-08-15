import * as React from "react";
import HeadingFormUser from "./HeadingFormUser";
import SelectFormik from "@/components/@forms/SelectFormik";
import InputFormik from "@/components/@forms/InputFormik";
import AcceptFormUser from "./AcceptFormUser";
import { useIntl } from "react-intl";
import { useConfigEnterpriseStore } from "@/store";
import { useOrdersFormContext } from "../FormContainer";
import { toast } from "react-hot-toast";
import { useSearchUserByDni } from "../../hooks/useSearchUserByDni";
import { usersService } from "@teslo/services";
import { ValidRoles } from "@teslo/interfaces";
import { capitalize } from "@/utils";
import { translate } from "@/i18n";

interface IContentFormUserProps {
  toggleAdvanceConfig: () => void;
}

const formikShowMessages = {
  showError: false,
  showSuccess: false,
};

const ContentFormUser: React.FunctionComponent<IContentFormUserProps> = (props) => {
  const { toggleAdvanceConfig } = props;
  const [loadingFormUser, setLoadingFormUser] = React.useState(false);
  const { formatMessage: t } = useIntl();
  const { configEnterprise } = useConfigEnterpriseStore();
  const [stateNew, setStateNew] = React.useState(false);
  const { values, setValues } = useOrdersFormContext();
  const onClickNewClient = () => {
    setStateNew(!stateNew);
  };

  const handleCreateClient = async () => {
    if (values.user.iduser) {
      toast.error("Has ocurred and error, user already exists in the database");
      return;
    }

    if (!values.user?.firstName?.trim?.()) {
      toast.error(t({ id: "users.error.firstName.required" }));
      return;
    }

    if (!values.user?.lastName?.trim?.()) {
      toast.error(t({ id: "users.error.lastName.required" }));
      return;
    }

    if (!values.user?.email?.trim?.()) {
      toast.error(t({ id: "users.error.email.required" }));
      return;
    }

    try {
      setLoadingFormUser(true);
      const req = await usersService.createUser({
        dni: values.user.dni,
        firstName: values.user?.firstName,
        lastName: values.user?.lastName,
        email: values.user?.email,
        phone: values.user.phone,
        roles: [ValidRoles.USER],
        prefix: values.user.prefix,
      });

      setStateNew(false);
      setValues({ ...values, user: req.data });
    } catch (error) {
      console.log(error);
      const message: string = error.response?.data?.message;
      if (message.includes("Ya existe la llave (email)")) {
        toast.error(t({ id: "users.error.email.alreadyExist" }));
      } else if (message.includes("Ya existe la llave (dni)")) {
        toast.error(t({ id: "users.error.dni.alreadyExist" }));
      } else {
        toast.error(error.response?.data?.message || t({ id: "users.add.error" }));
      }
    } finally {
      setLoadingFormUser(false);
    }
  };

  useSearchUserByDni({ onSuccess: () => setStateNew(false) });

  return (
    <React.Fragment>
      <HeadingFormUser
        onClickNewClient={onClickNewClient}
        stateNew={stateNew}
        toggleAdvanceConfig={toggleAdvanceConfig}
      />

      <div className="flex items-center flex-wrap gap-x-2 gap-y-4">
        <div className="flex items-center">
          <SelectFormik
            options={configEnterprise.prefixes.map((value) => ({
              label: capitalize(value),
              value,
            }))}
            name={"user.prefix"}
            label={translate("users.label.prefix")}
            className="mb-0"
            sm
            classNameContainerSelect="rounded-l"
          />
          <InputFormik
            name="user.dni"
            placeholder="DNI"
            classNameLabel="text-xs"
            label={"DNI"}
            className="w-full lg:max-w-[125px] mt-1 mb-0"
            {...formikShowMessages}
            classNameInput="shadow-none rounded-l-none form-control-sm"
            onChange={() => {
              setValues({
                ...values,
                user: { dni: values.user.dni, prefix: values.user.prefix },
              });
            }}
          />
        </div>
        <InputFormik
          label={"First Name"}
          name="user?.firstName"
          placeholder="First Name"
          classNameLabel="text-xs"
          disabled={!stateNew}
          className="w-full lg:max-w-[150px] mb-0"
          classNameInput="form-control-sm"
          {...formikShowMessages}
        />
        <InputFormik
          name="user?.lastName"
          placeholder="Last Name"
          classNameLabel="text-xs"
          label={"Last Name"}
          disabled={!stateNew}
          className="w-full lg:max-w-[150px] mb-0"
          classNameInput="form-control-sm"
          {...formikShowMessages}
        />

        <InputFormik
          name="user?.email"
          placeholder="user@email.com"
          classNameLabel="text-xs"
          label={"Email"}
          disabled={!stateNew}
          className="w-full lg:max-w-[250px] mb-0"
          classNameInput="form-control-sm"
          {...formikShowMessages}
        />

        <InputFormik
          name="user.phone"
          placeholder="00000000"
          classNameLabel="text-xs"
          label={"Phone"}
          disabled={!stateNew}
          className="w-full lg:max-w-[150px] mb-0"
          classNameInput="form-control-sm"
          {...formikShowMessages}
        />
      </div>

      <AcceptFormUser
        stateNew={stateNew}
        handleCreateClient={handleCreateClient}
        loading={loadingFormUser}
      />
    </React.Fragment>
  );
};

export default ContentFormUser;
