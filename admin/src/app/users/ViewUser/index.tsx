import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import Loader from "@/components/ui/Loader";
import RenderIf from "@teslo/react-ui/RenderIf";
import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import ProfileLayout from "@/layouts/ProfileLayout";
import { useAuthStore } from "@/store";
import classNames from "classnames";
import * as React from "react";
import { Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { protectedRoutes, validPaths } from "@/utils";
import { useFetcUser } from "../hooks/useFetchUser";
import TableOrdersByUser from "./TableOrdersByUser";
import { UserDto, ValidRol, ValidRoles } from "@teslo/interfaces";
import { usersService } from "@teslo/services";
import { FaUser } from "react-icons/fa";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";

interface IViewUserPageProps {}
const validRolesActions = [ValidRoles.ADMIN, ValidRoles.SUPER_USER] as ValidRol[];

const ViewUserPage: React.FunctionComponent<IViewUserPageProps> = (props) => {
  const {} = props;
  const { formatMessage } = useIntl();
  const params = useParams();
  const { data: user, isFetching, setData, error } = useFetcUser(params.id);
  const { user: authUser } = useAuthStore();

  if (isFetching) return <Loader loading={true} />;

  if (!Object.keys(user).length && error) return <Navigate to={protectedRoutes.users.path} />;

  async function updateUser(values: UserDto) {
    try {
      if (!values.password?.trim()) delete values.password;
      const req = await usersService.updateUser(user.iduser, values);
      setData(req.data);
      const messageSuccess = formatMessage({ id: "users.edit.success" });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      const errorMessage = formatMessage({ id: "users.edit.error" });
      toast.error(error.response.data.message || errorMessage);
    }
  }

  if (!Object.keys(user).length) return <Loader loading={true} />;

  const canUseActions =
    (user.iduser !== authUser.iduser &&
      !user.roles?.includes(ValidRoles.SUPER_USER) &&
      user.roles?.includes(ValidRoles.ADMIN) &&
      authUser.roles?.includes(ValidRoles.SUPER_USER)) ||
    user.roles?.includes(ValidRoles.USER);

  const isValidRol = authUser.roles?.some((role) => validRolesActions.includes(role));

  return (
    <HeaderDashboard
      to={validPaths.users.path}
      title={translate("users.single")}
      icon={<FaUser />}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.home.path },
        { label: translate("users.title"), to: validPaths.users.path },
        {
          label: user.firstName ? user.firstName + " " + user.lastName : translate("users.single"),
        },
      ]}
    >
      <ProfileLayout
        user={user}
        onSubmitUpdateUser={updateUser}
        validRolesActions={validRolesActions}
        canUseActions={canUseActions}
        extraInitialValuesFormUpdate={{
          isActive: user.isActive,
          roles: user.roles,
        }}
        extraInputsFormFormUpdate={
          <>
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
                {
                  value: ValidRoles.ADMIN,
                  label: translate("users.admin"),
                },
                {
                  value: ValidRoles.USER,
                  label: translate("users.customer"),
                },
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
          </>
        }
      />
      <RenderIf
        isTrue={
          true
          /* !user?.roles?.includes(ValidRoles.SUPER_USER) &&
					!user?.roles?.includes(ValidRoles.ADMIN) */
        }
      >
        <div className={classNames("tile", canUseActions && isValidRol ? "mt-10" : "mt-64")}>
          <TableOrdersByUser id={params.id} />
        </div>
      </RenderIf>
    </HeaderDashboard>
  );
};

export default React.memo(ViewUserPage);
