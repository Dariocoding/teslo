import * as React from "react";
import { IDrawersProps } from "../Drawers";
import { translate } from "@/i18n";
import { Drawer } from "@/components/ui";
import { useMedia } from "@/components/ui/hooks";
import ListClients from "./ListClients";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames";
import FormUser from "@/app/users/forms/FormUser";
import { User, ValidRoles } from "@teslo/interfaces";
import { useOrderFormContext } from "../..";
import { UseQueryResult } from "@tanstack/react-query";

interface IDrawerClientsProps extends IDrawersProps {}

const DrawerClients: React.FunctionComponent<IDrawerClientsProps> = (props) => {
  const { showDrawerClient, setShowDrawerClient } = props;
  const refFetchUsers = React.useRef<
    UseQueryResult<User[], unknown> & {
      setData: React.Dispatch<React.SetStateAction<User[]>>;
      isLoading: boolean;
    }
  >(null);
  const { values, setValues } = useOrderFormContext();
  const [formNewClient, setFormNewClient] = React.useState(false);
  const sm = useMedia("(max-width: 750px)");
  const width = sm ? 290 : 750;

  React.useEffect(() => {
    const openDrawerShortcut = (e: KeyboardEvent) => {
      const target = (e.target || {}) as HTMLElement;
      if (target?.nodeName !== "INPUT" && e.key === "c") {
        setShowDrawerClient(!showDrawerClient);
      }
    };

    document.addEventListener("keydown", openDrawerShortcut);

    return () => {
      document.removeEventListener("keydown", openDrawerShortcut);
    };
  }, [showDrawerClient]);

  React.useEffect(() => {
    if (showDrawerClient) {
      setFormNewClient(false);
    }
  }, [showDrawerClient]);

  const onSuccessCreateCustomer = (user: User) => {
    setValues({ ...values, user });
    setShowDrawerClient(false);
    refFetchUsers.current.setData([user, ...refFetchUsers.current.data]);
  };

  return (
    <Drawer
      width={width}
      overlayClassName="bg-black bg-opacity-25"
      shouldCloseOnOverlayClick={false}
      isOpen={showDrawerClient}
      placement="right"
      bodyClass="p-3"
      onClose={() => setShowDrawerClient(false)}
      title={
        <span className="text-xl font-semibold">
          {translate("users.customers")}{" "}
          <button
            onClick={() => setFormNewClient(!formNewClient)}
            className={classNames(
              "btn btn-xs mb-0 gap-1 shadow-none ml-1",
              !formNewClient ? "btn-primary" : "btn-danger"
            )}
          >
            {formNewClient ? null : <FaPlus />}{" "}
            {translate(formNewClient ? "app.cancel" : "users.action.create.customer")}
          </button>
        </span>
      }
    >
      {formNewClient ? (
        <FormUser
          defaultValidRole={[ValidRoles.USER]}
          renderRoles={false}
          onSuccess={onSuccessCreateCustomer}
          dniValidate
        />
      ) : (
        <ListClients {...{ sm, setShowDrawerClient, refFetchUsers }} />
      )}
    </Drawer>
  );
};

export default DrawerClients;
