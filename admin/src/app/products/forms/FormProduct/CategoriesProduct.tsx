import SelectFormik, { OptionReactSelect } from '@/components/@forms/SelectFormik';
import { Category } from '@teslo/interfaces';
import * as React from 'react';

interface ICategoriesProductProps {
	categories: Category[];
}

const CategoriesProduct: React.FunctionComponent<ICategoriesProductProps> = props => {
	const { categories } = props;

	const options: OptionReactSelect[] = React.useMemo(
		() =>
			categories.map(
				category =>
					({
						value: category.idcategory,
						label: category.title,
					} as OptionReactSelect)
			),
		[categories]
	);

	return (
		<SelectFormik
			multiple
			onChange={(items: OptionReactSelect[]) => {
				if (!items) return [];
				const copyItems = [...items];
				return copyItems.map(item => item.value);
			}}
			options={options}
			name={'categories'}
			label={'Categories available'}
		/>
	);
};

export default CategoriesProduct;
