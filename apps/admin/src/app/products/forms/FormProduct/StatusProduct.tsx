import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { ARRSTATUSPRODUCT } from "@teslo/interfaces";
import * as React from "react";

interface IFormStatusProductProps {
	defaultOpen?: boolean;
}

const FormStatusProduct: React.FunctionComponent<IFormStatusProductProps> = props => {
	const {} = props;

	const options: OptionReactSelect[] = [
		{ label: translate("products.placeholder.status"), value: "" },
		...ARRSTATUSPRODUCT.map(option => ({
			value: option,
			label: option,
		})),
	];

	return (
		<SelectFormik name="status" options={options} label={translate("products.label.status")} />
	);
};

export default FormStatusProduct;
