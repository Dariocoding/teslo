import * as React from "react";
import axios, { CancelTokenSource } from "axios";
import { usersService } from "@teslo/services";
import { User } from "@teslo/interfaces";
import { toast } from "react-hot-toast";
import { translate } from "@/i18n";
import { FaSave, FaTimes } from "react-icons/fa";
import { useOrdersFormContext } from "../FormContainer";

interface IAdvanceFormUserProps {
	toggleAdvanceConfig: () => void;
}

const AdvanceFormUser: React.FunctionComponent<IAdvanceFormUserProps> = props => {
	const { toggleAdvanceConfig } = props;
	const { setValues, values } = useOrdersFormContext();
	const refToken = React.useRef<CancelTokenSource>();
	const [userTemp, setUserTemp] = React.useState<User>(null);
	const [term, setTerm] = React.useState("");

	const onChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
		const term = e.target.value;
		setTerm(term);
		if (!term) {
			setTerm("");
			refToken.current = null;
			setUserTemp(null);
		}
		if (refToken.current) refToken.current.cancel();
		const token = axios.CancelToken.source();
		refToken.current = token;
		const toastId = toast.loading("Loading...");
		try {
			const req = await usersService.getUser(term, null, { cancelToken: token.token });
			setUserTemp(req.data);
		} catch (error) {
			console.log(error);
		} finally {
			toast.dismiss(toastId);
		}
	};

	const onConfirm = () => {
		if (userTemp) {
			setValues({ ...values, user: userTemp });
			toggleAdvanceConfig();
		}
	};

	const onCancel = () => {
		toggleAdvanceConfig();
	};

	console.log({ length: Object.keys(userTemp || {}) });

	return (
		<div className="lg:px-8">
			<div className="flex items-center justify-start flex-wrap gap-x-6 gap-y-4">
				<div className="max-w-[350px] w-full">
					<label className="text-xs">Term</label>
					<input
						type="text"
						className="form-control form-control-sm"
						value={term}
						onChange={onChange}
					/>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">ID </label>
					<span className="mt-1">{userTemp?.iduser}</span>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">{translate("users.label.dni")} </label>
					<span className="mt-1">
						{userTemp?.dni || (Object.keys(userTemp || {}).length ? "no-dni" : null)}
					</span>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">{translate("users.label.firstName")} </label>
					<span className="mt-1">{userTemp?.firstName}</span>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">{translate("users.label.lastName")} </label>
					<span className="mt-1">{userTemp?.lastName}</span>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">{translate("users.label.email")} </label>
					<span className="mt-1">{userTemp?.email}</span>
				</div>

				<div className="flex items-start flex-col text-xs">
					<label className="font-bold">{translate("users.label.phone")} </label>
					<span className="mt-1">{userTemp?.phone}</span>
				</div>
			</div>
			<div className="mt-4 flex items-center justify-center">
				<button
					type="button"
					className="btn btn-xs btn-alternative mb-0 gap-1"
					onClick={onCancel}
				>
					{translate("app.cancel")} <FaTimes />
				</button>
				<button
					type="button"
					className="btn btn-xs btn-primary mb-0 gap-1"
					onClick={onConfirm}
				>
					{translate("app.save")} <FaSave />
				</button>
			</div>
		</div>
	);
};

export default AdvanceFormUser;
