import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { usersService } from "@teslo/services";
import useFirstLoad from "@/utils/hooks/useFirstLoad";
import { useOrdersFormContext } from "../forms/FormContainer";

interface Actions {
	onSuccess?(): void;
	addingUser: React.MutableRefObject<boolean>;
}

export const useSearchUserByDni = (props?: Actions) => {
	const { onSuccess, addingUser } = props || {};
	const firstLoad = useFirstLoad();
	const { values, setValues } = useOrdersFormContext();

	React.useEffect(() => {
		const ourRequest = axios.CancelToken.source();

		async function fetchUser() {
			const toastId = toast.loading("Loading...");
			try {
				if (!values.user.prefix?.trim?.() || !values.user.dni?.trim?.()) {
					toast.dismiss(toastId);
					return;
				}
				const res = await usersService.getUser(
					values.user.dni,
					{ prefix: values.user.prefix },
					{ cancelToken: ourRequest.token }
				);
				setValues({
					...values,
					user: res.data,
				});
				onSuccess?.();
			} catch (error) {
				console.log(error);
			} finally {
				toast.dismiss(toastId);
			}
		}

		if (!firstLoad && !addingUser.current) fetchUser();

		if (addingUser.current) addingUser.current = false;

		return () => {
			ourRequest.cancel();
		};
	}, [values.user.dni, values.user.prefix]);
};
