import * as React from "react";
import classNames from "classnames";
import { BiUser } from "react-icons/bi";
import { getMaximiumRol } from "@/utils/getMaximiumRol";
import dayjs from "dayjs";
import { User } from "@teslo/interfaces";
import { translate } from "@/i18n";
import { useIntl } from "react-intl";

interface IModalViewUserProps {
	user: User;
}

const ModalViewUser: React.FunctionComponent<IModalViewUserProps> = props => {
	const { user } = props;
	const { formatMessage: t } = useIntl();
	return (
		<div className="flex flex-col">
			<div className="mb-3 text-center flex items-center justify-center">
				<span>
					<BiUser className="shadow p-2.5 rounded-full h-16 align-middle border-none w-16" />
				</span>
			</div>
			<h6 className="text-center">
				{user.firstName} {user.lastName}
			</h6>
			<p className="text-center text-sm mb-8">
				{dayjs(user.dateCreated).format("DD/MM/YYYY")}
			</p>

			<div className="text-sm space-y-2">
				<p>
					<strong>{translate("users.label.phone")}: </strong>
					{user.phone}
				</p>

				<p>
					<strong>{translate("users.label.email")}: </strong>
					{user.email}
				</p>

				<p className="flex items-center">
					<strong>{translate("users.label.status")}: </strong>
					<span
						className={classNames(
							"font-semibold flex items-center ml-1",
							user.isActive ? "text-teal-500" : "text-red-500"
						)}
					>
						{user.isActive
							? t({ id: "users.label.status.active" })
							: t({ id: "users.label.status.active" })}{" "}
					</span>
				</p>

				<p>
					<strong>{translate("users.label.role")}: </strong>
					{getMaximiumRol(user.roles)}
				</p>
			</div>
		</div>
	);
};

export default ModalViewUser;
