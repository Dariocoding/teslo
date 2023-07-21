import { getMaximiumRol } from "@/utils/getMaximiumRol";
import { User, ValidRoles } from "@teslo/interfaces";
import dayjs from "dayjs";
import { UserTable } from "../config";
import ActionsUser from "./ActionsUser";
import BadgeIsActive from "./BadgeIsActive";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";

interface IMapUsersProps {
  users: User[];
  onDeleteUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

const mapUsers = (props: IMapUsersProps): UserTable[] => {
  const { users } = props;

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
    dniFormatted: user.roles.includes(ValidRoles.USER) ? user.prefix + " " + user.dni : "",
  }));
};

export default mapUsers;
{
  /* <BadgeIsActive isActive={user.isActive} /> */
}
