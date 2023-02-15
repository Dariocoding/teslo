import { PF } from '@/utils';
import { Category } from '@teslo/interfaces';
import dayjs from 'dayjs';
import * as React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

interface IHeaderViewCategoryProps {
	category: Category;
	onUpdateCategory(): void;
	onDeleteCategory(): void;
}

const HeaderViewCategory: React.FunctionComponent<IHeaderViewCategoryProps> = props => {
	const { category, onDeleteCategory, onUpdateCategory } = props;

	return (
		<div className="grid lg:grid-cols-12 lg:gap-8 gap-4">
			<div className="tile lg:col-span-4">
				<div className="flex items-center justify-center mb-4">
					<img
						src={
							category.image
								? PF + '/category/' + category.image
								: '/img/others/box.png'
						}
						className={'w-32'}
						alt=""
					/>
				</div>
				<div className="flex flex-col justify-center items-center">
					<button
						onClick={onUpdateCategory}
						className="mx-auto w-full btn btn-primary btn-sm"
					>
						Update Category <FaPen className="ml-2" />
					</button>

					<button
						className="mx-auto w-full btn btn-danger btn-sm"
						onClick={onDeleteCategory}
					>
						Delete Category <FaTrash className="ml-2" />
					</button>
				</div>
			</div>
			<div className="tile lg:col-span-8">
				<h4 className="mb-6">{category.title}</h4>
				<div className="text-sm space-y-3">
					<p>
						<span className="font-bold">ID:</span>{' '}
						{category.idcategory}
					</p>

					<p>
						<span className="font-bold">Date Created:</span>{' '}
						{dayjs(category.dateCreated).format(
							'DD/MM/YYYY HH:mm:ss'
						)}
					</p>

					<p>
						<span className="font-bold">Slug:</span>{' '}
						{category.slug}
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeaderViewCategory;
