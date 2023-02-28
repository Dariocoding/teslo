import React from 'react';
import TabsSize from './TabsSize';
import { Category, Size } from '@teslo/interfaces';
import TabsCategories from './TabsCategories';
import TabMobileFilter from './TabMobileFilter';

interface ITabFiltersProps {
	categories: Category[];
}

const TabFilters: React.FunctionComponent<ITabFiltersProps> = props => {
	const { categories = [] } = props;
	const [isOpenMoreFilter, setisOpenMoreFilter] = React.useState(false);
	const [categoriesState, setCategoriesState] = React.useState<Category[]>([]);
	const [sizesState, setSizesState] = React.useState<Size[]>([]);
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
