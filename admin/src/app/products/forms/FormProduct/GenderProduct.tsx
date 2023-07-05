import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { capitalize } from "@/utils";
import { ARRGENDERS } from "@teslo/interfaces";
import * as React from "react";

interface IGenderProductProps {}

const GenderProduct: React.FunctionComponent<IGenderProductProps> = props => {
	const {} = props;

	const options: OptionReactSelect[] = [
		{ label: translate("products.placeholder.gender"), value: "" },
		...ARRGENDERS.map(option => ({
			value: option,
			label: capitalize(option),
		})),
	];

	return (
		<SelectFormik name="gender" options={options} label={translate("products.label.gender")} />
	);
};

export default GenderProduct;
