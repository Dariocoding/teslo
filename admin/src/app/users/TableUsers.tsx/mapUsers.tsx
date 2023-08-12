import { getMaximiumRol } from "@/utils/getMaximiumRol";
import { ColorsAdmin, User, ValidRoles } from "@teslo/interfaces";
import dayjs from "dayjs";
import { UserTable } from "../config";
import ActionsUser from "./ActionsUser";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface IMapUsersProps {
  users: User[];
  onDeleteUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  config: Partial<ColorsAdmin>;
}

const mapUsers = (props: IMapUsersProps): UserTable[] => {
  const { users, config } = props;
  const { enablePrefixesUser } = config || {};

  return users.map((user) => ({
    ...user,
    isActiveFormatted: null,
    actions: <ActionsUser user={user} {...props} />,
    userRol: getMaximiumRol(user.roles),
    dateCreatedFormatted: dayjs(user.dateCreated).format("DD/MM/YYYY"),
    fullName: (
      <Link to={validPaths.viewUser.fnPath(user.iduser)} className="link-table">
        {user.firstName + " " + user.lastName}
      </Link>
    ),
    dniFormatted: user.roles.includes(ValidRoles.USER)
      ? (user.prefix && enablePrefixesUser ? user.prefix + " " : "") + user.dni
      : "",
  }));
};

export default mapUsers;
