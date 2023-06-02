import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { ARRSTATUSPRODUCT } from '@teslo/interfaces';
import * as React from 'react';

interface IFormStatusProductProps {
	defaultOpen?: boolean;
}

const options: OptionReactSelect[] = [
	{ label: 'None', value: '' },
	...ARRSTATUSPRODUCT.map(option => ({
		value: option,
		label: option,
	})),
];

const FormStatusProduct: React.FunctionComponent<IFormStatusProductProps> = props => {
	const {} = props;

	return <SelectFormik name="status" options={options} label={'Status'} />;
};

export default FormStatusProduct;
