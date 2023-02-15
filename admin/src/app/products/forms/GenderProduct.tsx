import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { capitalize } from '@/utils';
import { ARRGENDERS } from '@teslo/interfaces';
import * as React from 'react';

interface IGenderProductProps {}

const options: OptionReactSelect[] = ARRGENDERS.map(option => ({
	value: option,
	label: capitalize(option),
}));

const GenderProduct: React.FunctionComponent<IGenderProductProps> = props => {
	const {} = props;

	return <SelectFormik name="gender" options={options} label={'Gender'} />;
};

export default GenderProduct;
