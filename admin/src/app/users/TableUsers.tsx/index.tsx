import DataTable, { HeaderDataTable } from "@teslo/react-ui/DataTable";
import RenderIf from "@teslo/react-ui/RenderIf";
import { useModalStore } from "@/store";
import { User, ValidRol } from "@teslo/interfaces";
import { usersService } from "@teslo/services";
import * as React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import mapUsers from "./mapUsers";
import { TablePlaceholder } from "@/components/placeholders";
import { translate } from "@/i18n";
import { useIntl } from "react-intl";
import { useHeadingUsers } from "./useHeadingUsers";
import Swal from "sweetalert2";

const FormUser = React.lazy(() => import("../forms/FormUser"));
const ModalDeleteUser = React.lazy(() => import("./ModalDeleteUser"));

interface ITableUsersProps {
	users: User[];
	setUsers: React.Dispatch<User[]>;
	isFetching: boolean;
	heading?: HeaderDataTable[];
	refetch?(): void;
	validRol?: ValidRol;
	showCreate?: boolean;
	showPagination?: boolean;
	showSearch?: boolean;
	showResponsive?: boolean;
}

const TableUsers: React.FunctionComponent<ITableUsersProps> = props => {
	const {
		isFetching,
		setUsers,
		users,
		refetch,
		validRol,
		showCreate = true,
		showPagination,
		showSearch,
		showResponsive = true,
	} = props;
	const { formatMessage } = useIntl();
	const setModal = useModalStore(state => state.setModal);
	const closeModal = useModalStore(state => state.closeModal);
	const [showModalDeleteUser, setShowModalDeleteUser] = React.useState(false);
	const [stateUserDelete, setStateUserDelete] = React.useState<User>(null);
	const [isLoadingDeleteUser, setIsLoadingDeleteUser] = React.useState(false);

	async function onCreateUser() {
		function onSuccess(user: User) {
			setUsers([user, ...users]);
			closeModal();
		}

		setModal({
			title: formatMessage({ id: "users.add" }),
			children: (
				<React.Suspense fallback={<></>}>
					<FormUser onSuccess={onSuccess} defaultValidRole={[validRol]} />
				</React.Suspense>
			),
			size: "md",
		});
	}

	async function onDeleteUser(user: User) {
		setShowModalDeleteUser(true);
		setStateUserDelete(user);
	}

	async function onUpdateUser(user: User) {
		function onSuccess(user: User) {
			setUsers(users.map(u => (u.iduser === user.iduser ? { ...u, ...user } : u)));
			closeModal();
		}

		setModal({
			title: formatMessage({ id: "users.edit" }),
			children: (
				<React.Suspense fallback={<></>}>
					<FormUser user={user} onSuccess={onSuccess} />
				</React.Suspense>
			),
			size: "md",
		});
	}

	const onCloseModalDelete = () => {
		setShowModalDeleteUser(false);
		setStateUserDelete(null);
	};

	const onAcceptDeleteUser = async () => {
		try {
			setIsLoadingDeleteUser(true);
			await usersService.deleteUser(stateUserDelete.iduser);
			setUsers(users.filter(u => u.iduser !== stateUserDelete.iduser));
			onCloseModalDelete();
			Swal.fire(formatMessage({ id: "users.deleted.success" }), "", "success");
		} catch (error) {
			console.log(error);
			toast.error(
				error.response.data.message || formatMessage({ id: "users.deleted.error" })
			);
		} finally {
			setIsLoadingDeleteUser(false);
		}
	};

	return (
		<>
			<DataTable
				showResponsive={showResponsive}
				placeholder={<TablePlaceholder />}
				buttons={
					<RenderIf isTrue={showCreate || refetch}>
						<div className="flex items-center justify-start">
							<RenderIf isTrue={showCreate}>
								<button
									title={translate("users.add")}
									className="btn btn-primary btn-xs"
									onClick={onCreateUser}
								>
									<FaPlus />
								</button>
							</RenderIf>

							<RenderIf isTrue={refetch}>
								<button
									className="btn btn-outline-alternative btn-xs"
									onClick={refetch}
								>
									<AiOutlineReload />
								</button>
							</RenderIf>
						</div>
					</RenderIf>
				}
				data={mapUsers({ users, onDeleteUser, onUpdateUser })}
				heading={props.heading || useHeadingUsers(validRol === "user")}
				loading={isFetching}
				showPagination={showPagination}
				showSearch={showSearch}
			/>

			<RenderIf isTrue={showModalDeleteUser}>
				<React.Suspense fallback={<></>}>
					<ModalDeleteUser
						isLoading={isLoadingDeleteUser}
						user={stateUserDelete}
						showModalDeleteUser={showModalDeleteUser}
						onAcceptDeleteUser={onAcceptDeleteUser}
						onCloseModalDelete={onCloseModalDelete}
					/>
				</React.Suspense>
			</RenderIf>
		</>
	);
};

export default TableUsers;
