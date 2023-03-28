import { PF } from '@/utils';
import { Category } from '@teslo/interfaces';
import dayjs from 'dayjs';
import { CategoryDataTable } from '../config';
import ActionsCategory from './ActionCategorys';

interface IMapCategoriesProps {
	categories: Category[];
	onUpdateCategory(category: Category): void;
	onDeleteCategory(category: Category): void;
}

const mapCategories = (props: IMapCategoriesProps): CategoryDataTable[] => {
	const { categories, onDeleteCategory, onUpdateCategory } = props;
	return categories.map(category => ({
		...category,
		dateFormatted: dayjs(category.dateCreated).format('DD/MM/YYYY HH:mm:ss'),

		actions: (
			<ActionsCategory
				category={category}
				onDeleteCategory={onDeleteCategory}
				onUpdateCategory={onUpdateCategory}
			/>
		),
	}));
};

export default mapCategories;
