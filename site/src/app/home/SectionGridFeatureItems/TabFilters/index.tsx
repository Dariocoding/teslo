import React from 'react';
import TabsSize from './TabsSize';
import { Category, Size, StatusProduct } from '@teslo/interfaces';
import TabsCategories from './TabsCategories';
import TabMobileFilter from './TabMobileFilter';
import { FilterProductsState } from '../hooks/useFiltersProduct';
import TabStatus from './TabStatus';

interface ITabFiltersProps extends FilterProductsState {
	categories: Category[];
}

const TabFilters: React.FunctionComponent<ITabFiltersProps> = props => {
	const {
		categories = [],
		categoriesState,
		setCategoriesState,
		setSizesState,
		sizesState,
		setStatusState,
		statusState,
	} = props;
	const [isOpenMoreFilter, setisOpenMoreFilter] = React.useState(false);
	const closeModalMoreFilter = () => setisOpenMoreFilter(false);
	const openModalMoreFilter = () => setisOpenMoreFilter(true);

	const handleChangeSizes = (size: Size) => {
		const isChecked = sizesState.some(s => s === size);
		if (!isChecked) setSizesState([...sizesState, size]);
		else setSizesState(sizesState.filter(s => s !== size));
	};

	const handleChangeCategories = (category: Category) => {
		const isChecked = categoriesState.some(c => c.idcategory === category.idcategory);
		if (!isChecked) setCategoriesState([...categoriesState, category]);
		else
			setCategoriesState(
				categoriesState.filter(c => c.idcategory !== category.idcategory)
			);
	};

	const handleChangeStatus = (status: StatusProduct) => setStatusState(status);

	return (
		<div className="flex lg:space-x-4">
			{/* FOR DESKTOP */}
			<div className="hidden lg:flex flex-1 space-x-4">
				<TabsCategories
					handleChangeCategories={handleChangeCategories}
					setCategoriesState={setCategoriesState}
					categories={categories}
					categoriesState={categoriesState}
				/>
				<TabsSize
					handleChangeSizes={handleChangeSizes}
					sizesState={sizesState}
					setSizesState={setSizesState}
				/>
				<TabStatus
					setStatusState={setStatusState}
					statusState={statusState}
					handleChangeStatus={handleChangeStatus}
				/>
				{/* 	<div className="!ml-auto">{renderTabsSortOrder()} </div> */}
			</div>

			{/* FOR RESPONSIVE MOBILE */}
			<div className="flex overflow-x-auto lg:hidden space-x-4">
				<TabMobileFilter
					setCategoriesState={setCategoriesState}
					setSizesState={setSizesState}
					categories={categories}
					openModalMoreFilter={openModalMoreFilter}
					closeModalMoreFilter={closeModalMoreFilter}
					isOpenMoreFilter={isOpenMoreFilter}
					handleChangeCategories={handleChangeCategories}
					handleChangeSizes={handleChangeSizes}
					categoriesState={categoriesState}
					sizesState={sizesState}
				/>
			</div>
		</div>
	);
};

export default TabFilters;
