import { toast } from "react-hot-toast";
import React from "react";
import { PaymentMethod } from "@teslo/interfaces";
import { paymentMethodService } from "@teslo/services";
import { IFormContainerOrderProps, NewOrderValues } from ".";
import { useConfigEnterpriseStore } from "@/store";

export const useInitFormContainer = (props: IFormContainerOrderProps) => {
	const { tempProducts } = props;
	const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);
	const [loading, setLoading] = React.useState(true);
	const { configEnterprise } = useConfigEnterpriseStore();

	if (!configEnterprise.prefixes?.length) {
		toast.error("You have no prefixes configured!, please configure them manually");
		throw new Error("You have no prefixes configured!, please configure them manually");
	}

	if (!loading && !paymentMethods.length) {
		toast.error("You have no payment methods configured!, please configure them manually");
		throw new Error("You have no payment methods configured!, please configure them manually");
	}

	React.useEffect(() => {
		async function fetchData() {
			try {
				const req = await paymentMethodService.getAll();
				setPaymentMethods(req.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	const initialValues: NewOrderValues = {
		status: "completed",
		user: {
			prefix: configEnterprise.prefixes[0],
			dni: "",
		},
		tempReference: "",
		tempQty: 0,
		searchProduct: "",
		tempProduct: {},
		products: tempProducts || [],
		tempSize: null,
		paymentMethod: paymentMethods[0],
	};

	return {
		loading,
		initialValues,
		paymentMethods,
	};
};
