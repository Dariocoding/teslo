import { useAuthStore, useModalStore } from "@/store";
import * as React from "react";
import { FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";
import classNames from "classnames";
import { useOrdersFormContext } from "../FormContainer";
import RenderIf from "@teslo/react-ui/RenderIf";
import { translate } from "@/i18n";
import { User, ValidRoles } from "@teslo/interfaces";
import { useIntl } from "react-intl";
import ToolTip from "@teslo/react-ui/Tooltip";

const FormUser = React.lazy(() => import("@/app/users/forms/FormUser"));

interface IHeadingFormUserProps {
	stateNew: boolean;
	onClickNewClient: () => void;
	toggleAdvanceConfig: () => void;
}

const HeadingFormUser: React.FunctionComponent<IHeadingFormUserProps> = props => {
	const { stateNew, onClickNewClient, toggleAdvanceConfig } = props;
	const { formatMessage: t } = useIntl();
	const { setModal, closeModal } = useModalStore();
	const { user } = useAuthStore();
	const { values, setValues } = useOrdersFormContext();
	const showButtonNew = Boolean(!values.user.iduser && !stateNew);

	const handleEditUser = () => {
		function onSuccess(user: User) {
			setValues({ ...values, user });
			closeModal();
		}
		if (!values.user?.iduser) return;

		const user = values.user;
		setModal({
			title: t({ id: "users.edit" }),
			children: (
				<React.Suspense fallback={<></>}>
					<FormUser user={user} onSuccess={onSuccess} />
				</React.Suspense>
			),
			size: "md",
		});
	};

	return (
		<h6 className="flex items-center gap-x-2 justify-between text-lg font-normal flex-wrap mb-2">
			<div className="flex items-center gap-2">
				<span className="mb-2 font-semibold">Datos de cliente</span>

				<div className="overflow-hidden relative w-[118px] h-[38px]">
					<span
						className={classNames(
							"transition-all absolute duration-500",
							showButtonNew ? "left-0" : "left-72"
						)}
					>
						<button
							type="button"
							className="btn btn-primary btn-xs shadow-none whitespace-nowrap gap-1"
							onClick={onClickNewClient}
						>
							{translate("users.customer.add")} <FaUserPlus />
						</button>
					</span>

					<RenderIf
						isTrue={values.user?.iduser && !user.roles?.includes?.(ValidRoles.USER)}
					>
						<button
							type="button"
							className="btn btn-success btn-xs gap-1 whitespace-nowrap"
							onClick={handleEditUser}
						>
							{translate("users.edit")} <FaEdit />
						</button>
					</RenderIf>
				</div>
				<RenderIf isTrue={!user.roles?.includes?.(ValidRoles.USER) && !values.user?.iduser}>
					<ToolTip message="Busqueda avanzada" placement="right" sm>
						<button
							onClick={toggleAdvanceConfig}
							type="button"
							className="btn btn-danger btn-xs whitespace-nowrap"
						>
							<FaSearch />{" "}
						</button>
					</ToolTip>
				</RenderIf>
			</div>
			<div className="-mt-2">
				<span className="text-sm">
					<span className="text-sm font-bold">Vendedor:</span>{" "}
					<span>
						{user.firstName} {user.lastName}
					</span>
				</span>
			</div>
		</h6>
	);
};

export default HeadingFormUser;
