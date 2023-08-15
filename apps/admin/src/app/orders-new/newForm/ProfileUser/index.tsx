import ActionsTableOrder from "@/app/orders/TableOrders/ActionsTableOrder";
import BadgeStatusOrder from "@/app/orders/TableOrders/BadgeStatusOrder";
import { formatter } from "@/utils";
import * as React from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useOrderFormContext } from "..";
import axios from "axios";
import { ordersService } from "@teslo/services";
import { RenderIf } from "@/components/ui";
import { TablePlaceholder } from "@/components/placeholders";
import { useConfigApp, useModalStore } from "@/store";
import { FaPen } from "react-icons/fa";
import { ShowIf } from "react-rainbow-components";
import FormUser from "@/app/users/forms/FormUser";
import { useIntl } from "react-intl";
import { User, ValidRoles } from "@teslo/interfaces";
import { translate } from "@/i18n";

interface IProfileUserProps {}

const ProfileUser: React.FunctionComponent<IProfileUserProps> = (props) => {
  const {} = props;
  const { formatMessage: t } = useIntl();
  const { setModal, closeModal } = useModalStore();
  const { colors } = useConfigApp();
  const [ordersUser, setOrdersUser] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { values, setValues } = useOrderFormContext();

  React.useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    async function fetchOrdersCustomer() {
      const iduser = values.user.iduser;
      try {
        setLoading(true);
        const req = await ordersService.getOrdersByIdUser(
          iduser,
          { take: 3 },
          { cancelToken: cancelToken.token }
        );

        setOrdersUser(req.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (values?.user?.iduser) {
      fetchOrdersCustomer();
    } else {
      setOrdersUser([]);
      setLoading(false);
    }

    return () => {
      cancelToken.cancel();
    };
  }, [values.user]);

  const onClickEditUser = () => {
    function onSuccess(user: User) {
      setValues({ ...values, user });
      closeModal();
    }

    setModal({
      title: t({ id: "users.edit" }),
      children: (
        <FormUser
          user={values.user}
          defaultValidRole={[ValidRoles.USER]}
          dniValidate
          onSuccess={onSuccess}
        />
      ),
      size: "md",
    });
  };

  return (
    <div className="flex items-start gap-4 md:flex-row flex-col">
      <div className="flex items-start gap-3 xl:min-w-[350px] flex-wrap">
        <div>
          <PiUserCircleDuotone className="text-7xl" />
          <ShowIf isTrue={values.user}>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={onClickEditUser}
                className="btn btn-xs btn-success mb-0"
              >
                <FaPen />
              </button>
            </div>
          </ShowIf>
        </div>
        <div className="max-w-[325px]">
          <h5>{values.user ? values.user?.firstName + " " + values.user?.lastName : "-"}</h5>
          <p className="text-sm font-bold mb-2">{translate("orders.label.clientData")}:</p>
          <div className="text-sm space-y-1">
            <p>
              <strong>{translate("users.label.dni")}: </strong>
              {values.user
                ? values.user.dni
                  ? (values.user.prefix && colors.enablePrefixesUser
                      ? values.user.prefix + " "
                      : "") + values.user.dni
                  : "-"
                : "-"}
            </p>
            <p>
              <strong>{translate("users.label.email")}: </strong>
              {values.user ? values.user?.email : "-"}
            </p>

            <p>
              <strong>{translate("users.label.phone")}: </strong>
              {values.user ? values.user.phone : "-"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-grow border md:w-auto w-full border-gray-200 rounded-md overflow-auto">
        <RenderIf isTrue={!loading}>
          <RenderIf isTrue={ordersUser.length}>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">{translate("orders.label.seller")}</th>
                  <th className="text-center">{translate("orders.label.total")}</th>
                  <th className="text-center md:table-cell hidden">
                    {translate("orders.label.status")}
                  </th>
                  <th className="text-center md:table-cell hidden">
                    {translate("orders.label.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordersUser?.map?.((order) => (
                  <tr key={order.idorder}>
                    <td className="text-center whitespace-normal">
                      {order.userSell?.firstName + " " + order.userSell?.lastName}
                    </td>

                    <td className="text-center">{formatter.format(order.total || 0)}</td>

                    <td className="text-center md:table-cell hidden">
                      <BadgeStatusOrder status={order.status} className="mb-0 shadow-none" />
                    </td>

                    <td className="text-center md:table-cell hidden">
                      <ActionsTableOrder order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RenderIf>
          <RenderIf isTrue={!ordersUser.length}>
            <div className="py-3">
              <h6 className="font-light text-center mb-2">Orders empty</h6>

              <div>
                <img src="/img/others/pending-approval.png" className="mx-auto w-36" alt="" />
              </div>
            </div>
          </RenderIf>
        </RenderIf>

        <RenderIf isTrue={loading}>
          <TablePlaceholder className="pt-4" classNameEachRow="h-2 bg-teal-300" />
        </RenderIf>
      </div>
    </div>
  );
};

export default ProfileUser;
