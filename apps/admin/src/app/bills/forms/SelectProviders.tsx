import ReactSelectFormik from "@/components/@forms/ReactSelectFormik";
import { translate } from "@/i18n";
import { BillDto, Provider } from "@teslo/interfaces";
import { useFormikContext } from "formik";
import * as React from "react";

interface ISelectProvidersProps {
	providers: Provider[];
}

const SelectProviders: React.FunctionComponent<ISelectProvidersProps> = props => {
	const { providers } = props;
	const { values } = useFormikContext<BillDto>();
	return (
		<ReactSelectFormik
			label={translate("providers.single")}
			classNameLabel="text-xs"
			name="provider"
			options={providers.map(p => ({ label: p.name, value: p.idprovider }))}
			value={values.provider.idprovider}
			sm
			isSearchable
		/>
	);
};

export default SelectProviders;
