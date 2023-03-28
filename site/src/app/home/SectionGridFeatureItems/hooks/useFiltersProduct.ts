import { filtersGenders } from '@/utils';
import { Category, Size, StatusProduct } from '@teslo/interfaces';
import React from 'react';

export const useFilterProducts = (): FilterProductsState => {
	const [tabActive, setTabActive] = React.useState(filtersGenders[0]);
	const [categoriesState, setCategoriesState] = React.useState<Category[]>([]);
	const [sizesState, setSizesState] = React.useState<Size[]>([]);
	const [statusState, setStatusState] = React.useState<StatusProduct>(null);

	return {
		tabActive,
		setTabActive,
		categoriesState,
		setCategoriesState,
		setSizesState,
		sizesState,
		statusState,
		setStatusState,
	};
};

export interface FilterProductsState {
	tabActive?: string;
	setTabActive?: React.Dispatch<React.SetStateAction<string>>;
	categoriesState: Category[];
	setCategoriesState: React.Dispatch<React.SetStateAction<Category[]>>;
	setSizesState: React.Dispatch<React.SetStateAction<Size[]>>;
	sizesState: Size[];
	statusState: StatusProduct;
	setStatusState: React.Dispatch<React.SetStateAction<StatusProduct>>;
}
