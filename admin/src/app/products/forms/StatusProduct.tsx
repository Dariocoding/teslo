import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { useFormikContext } from 'formik';
import { ARRSTATUSPRODUCT } from '@teslo/interfaces';
import * as React from 'react';

interface IFormStatusProductProps {
	defaultOpen?: boolean;
}

const options: OptionReactSelect[] = ARRSTATUSPRODUCT.map(option => ({
	value: option,
	label: option,
}));

const FormStatusProduct: React.FunctionComponent<IFormStatusProductProps> = props => {
	const {} = props;
	const {} = useFormikContext();

	return <SelectFormik name="status" options={options} label={'Status'} />;
};

export default FormStatusProduct;
