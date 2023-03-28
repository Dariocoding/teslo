import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { useFormikContext } from 'formik';
import { ARRSIZES } from '@teslo/interfaces';
import * as React from 'react';

interface ISizesProductProps {
	defaultOpen?: boolean;
}

const options: OptionReactSelect[] = ARRSIZES.map(option => ({ value: option, label: option }));

const SizesProduct: React.FunctionComponent<ISizesProductProps> = props => {
	const {} = props;
	const {} = useFormikContext();

	return (
		<SelectFormik
			multiple={true}
			name="sizes"
			options={options}
			onChange={(items: OptionReactSelect[]) => {
				if (!items) return [];
				const copyItems = [...items];
				return copyItems.map(item => item.value);
			}}
			label={'Sizes'}
		/>
	);
};

export default SizesProduct;
