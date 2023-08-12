import { useConfigApp } from "@/store";
import { User } from "@teslo/interfaces";
import * as React from "react";

interface IRenderUserProps {
  user: User;
  onClickUser(user: User): void;
}

const RenderUser: React.FunctionComponent<IRenderUserProps> = (props) => {
  const { user, onClickUser } = props;
  const { colors } = useConfigApp();
  return (
    <div
      className="border border-gray-300 rounded-lg p-2 transition hover:bg-gray-200 cursor-pointer gap-x-3"
      onClick={() => onClickUser(user)}
    >
      <div className="leading-[0.85rem] text-sm space-y-3">
        <p>
          <strong>Full Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>DNI:</strong>{" "}
          {user.dni
            ? (user.prefix && colors.enablePrefixesUser ? user.prefix + " " : "") + user.dni
            : "-"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
};

export default RenderUser;
