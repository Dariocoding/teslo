import SelectFormik, { OptionReactSelect } from "@/components/@forms/SelectFormik";
import { translate } from "@/i18n";
import { Provider } from "@teslo/interfaces";
import * as React from "react";

interface IProvidersSelectProps {
	providers: Provider[];
}

const ProvidersSelect: React.FunctionComponent<IProvidersSelectProps> = props => {
	const { providers } = props;
	const options: OptionReactSelect[] = React.useMemo(
		() =>
			providers.map(
				provider =>
					({
						value: provider.idprovider,
						label: provider.name,
					} as OptionReactSelect)
			),
		[providers]
	);

	return (
		<SelectFormik
			multiple
			options={options}
			name={"providers"}
			label={translate("products.label.providers")}
			placeholder={translate("products.placeholder.providers")}
			onChange={(items: OptionReactSelect[]) => {
				if (!items) return [];
				const copyItems = [...items];
				return copyItems.map(item => item.value);
			}}
		/>
	);
};

export default ProvidersSelect;
