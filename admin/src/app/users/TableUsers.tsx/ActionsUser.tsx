import { protectedRoutes } from "@/utils";
import * as React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import RenderIf from "@teslo/react-ui/RenderIf";
import { useAuthStore } from "@/store";
import { ValidRoles, User } from "@teslo/interfaces";

interface IActionsUserProps {
  user: User;
  onDeleteUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

const ActionsUser: React.FunctionComponent<IActionsUserProps> = (props) => {
  const { user, onUpdateUser, onDeleteUser } = props;
  const { user: authUser } = useAuthStore();
  const handleClickUpdateCategory = () => onUpdateUser(user);
  const handleClickDeleteCategory = () => onDeleteUser(user);

  const canActions =
    (user.iduser !== authUser.iduser &&
      !user.roles.includes(ValidRoles.SUPER_USER) &&
      user.roles.includes(ValidRoles.ADMIN) &&
      authUser.roles?.includes(ValidRoles.SUPER_USER)) ||
    user.roles.includes(ValidRoles.USER);
  return (
    <React.Fragment>
      <Link to={protectedRoutes.viewUser.fnPath(user.iduser)} className="btn btn-success btn-xs">
        <FaEye />
      </Link>
      <RenderIf isTrue={canActions}>
        <button className="btn btn-primary btn-xs" onClick={handleClickUpdateCategory}>
          <FaPen />
        </button>
        <button className="btn btn-danger btn-xs" onClick={handleClickDeleteCategory}>
          <FaTrash />
        </button>
      </RenderIf>
    </React.Fragment>
  );
};

export default ActionsUser;
