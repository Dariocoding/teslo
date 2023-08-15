import ReactSelectFormik from "@/components/@forms/ReactSelectFormik";
import { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { capitalize } from "@/utils";
import { ARRSTATUSORDER, BillDto, ValidStatusOrder } from "@teslo/interfaces";
import { useFormikContext } from "formik";
import * as React from "react";

interface ISelectStatusBillFormProps {}

const options: OptionReactSelect[] = ARRSTATUSORDER.filter(
	item => item != ValidStatusOrder.CANCELED
).map(item => ({
	label: capitalize(item),
	value: item,
}));

const SelectStatusBillForm: React.FunctionComponent<ISelectStatusBillFormProps> = props => {
	const {} = props;
	const { values } = useFormikContext<BillDto>();
	return (
		<ReactSelectFormik
			name="status"
			label={translate("bills.label.status")}
			optionSelected={
				values.status === ValidStatusOrder.CANCELED
					? { label: "Canceled", value: ValidStatusOrder.CANCELED }
					: undefined
			}
			classNameLabel="text-xs"
			options={options}
			sm
		/>
	);
};

export default SelectStatusBillForm;
