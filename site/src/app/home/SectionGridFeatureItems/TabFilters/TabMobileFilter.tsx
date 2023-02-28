import * as React from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { CgOptions } from 'react-icons/cg';
import XClear from './XClear';
import ButtonClose from '@/shared/ButtonClose';
import Checkbox from '@teslo/react-ui/Checkbox';
import { ARRSIZES, Category, Size } from '@teslo/interfaces';

interface ITabMobileFilterProps {
	openModalMoreFilter(): void;
	isOpenMoreFilter: boolean;
	closeModalMoreFilter(): void;
	setCategoriesState: React.Dispatch<Category[]>;
	setSizesState: React.Dispatch<Size[]>;
	categories: Category[];
	handleChangeCategories(category: Category): void;
	handleChangeSizes(size: Size): void;
	categoriesState: Category[];
	sizesState: Size[];
}

const TabMobileFilter: React.FunctionComponent<ITabMobileFilterProps> = props => {
	const {
		openModalMoreFilter,
		isOpenMoreFilter,
		closeModalMoreFilter,
		setCategoriesState,
		setSizesState,
		categories,
		handleChangeCategories,
		handleChangeSizes,
		categoriesState,
		sizesState,
	} = props;

	return (
		<div className="flex-shrink-0">
			<div
				className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer select-none`}
				onClick={openModalMoreFilter}
			>
				<CgOptions className={'w-4 h-4'} />

				<span className="ml-2">Products filters</span>
				<XClear />
			</div>

			<Transition appear show={isOpenMoreFilter} as={React.Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModalMoreFilter}
				>
					<div className="min-h-screen text-center">
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
						</Transition.Child>

						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							className="inline-block h-screen w-full max-w-4xl"
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-flex flex-col w-full text-left align-middle transition-all transform bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 h-full">
								<div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Products filters
									</Dialog.Title>
									<span className="absolute left-3 top-3">
										<ButtonClose
											onClose={
												closeModalMoreFilter
											}
										/>
									</span>
								</div>

								<div className="flex-grow overflow-y-auto">
									<div className="px-6 sm:px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
										<div className="py-7">
											<h3 className="text-xl font-medium">
												Categories
											</h3>
											<div className="mt-6 relative ">
												<RenderMoreFilters
													handleChangeCategories={
														handleChangeCategories
													}
													handleChangeSizes={
														handleChangeSizes
													}
													categories={
														categories
													}
													categoriesState={
														categoriesState
													}
													sizesState={
														sizesState
													}
												/>
											</div>
										</div>

										<div className="py-7">
											<h3 className="text-xl font-medium">
												Size
											</h3>
											<div className="mt-6 relative ">
												<RenderMoreFilters
													handleChangeCategories={
														handleChangeCategories
													}
													handleChangeSizes={
														handleChangeSizes
													}
													sizes={
														ARRSIZES
													}
													categoriesState={
														categoriesState
													}
													sizesState={
														sizesState
													}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
									<button
										className="btn btn-alternative btn-sm"
										onClick={() => {
											closeModalMoreFilter();
											setCategoriesState(
												[]
											);
											setSizesState(
												[]
											);
										}}
									>
										Clear
									</button>

									<button
										className="btn btn-primary btn-sm"
										onClick={
											closeModalMoreFilter
										}
									>
										Apply
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default TabMobileFilter;

interface IRenderTabMobileFilterProps {
	categories?: Category[];
	sizes?: Size[];
	handleChangeCategories(category: Category): void;
	handleChangeSizes(size: Size): void;
	categoriesState: Category[];
	sizesState: Size[];
}

const RenderMoreFilters: React.FunctionComponent<IRenderTabMobileFilterProps> = props => {
	const {
		categories,
		sizes,
		handleChangeCategories,
		handleChangeSizes,
		categoriesState,
		sizesState,
	} = props;
	const data = categories || sizes;
	//@ts-ignore
	const list1 = data.filter((_: any, i: number) => i < data.length / 2);
	//@ts-ignore
	const list2 = data.filter((_: any, i: number) => i >= data.length / 2);

	return (
		<div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-8">
			<div className="flex flex-col space-y-5">
				{list1.map((item: any, idx: number) => (
					<SaveCheckboxProps
						item={item}
						key={idx}
						handleChangeCategories={handleChangeCategories}
						handleChangeSizes={handleChangeSizes}
						categoriesState={categoriesState}
						sizesState={sizesState}
					/>
				))}
			</div>
			<div className="flex flex-col space-y-5">
				{list2.map((item: any, idx: number) => (
					<SaveCheckboxProps
						item={item}
						key={idx}
						handleChangeCategories={handleChangeCategories}
						handleChangeSizes={handleChangeSizes}
						categoriesState={categoriesState}
						sizesState={sizesState}
					/>
				))}
			</div>
		</div>
	);
};

interface ISaveCheckboxProps {
	item: Category[] | Size[];
	handleChangeCategories(category: Category): void;
	handleChangeSizes(size: Size): void;
	categoriesState: Category[];
	sizesState: Size[];
}

const SaveCheckboxProps: React.FunctionComponent<ISaveCheckboxProps> = props => {
	const { item, handleChangeCategories, handleChangeSizes, categoriesState, sizesState } =
		props;
	if (typeof item === 'string') {
		const itemSize = item as Size;
		return (
			<Checkbox
				isChecked={sizesState.includes(itemSize)}
				onChange={() => handleChangeSizes(itemSize)}
			>
				{itemSize}
			</Checkbox>
		);
	} else {
		const itemCategory = item as Category;
		return (
			<Checkbox
				isChecked={categoriesState.some(
					c => c.idcategory === itemCategory.idcategory
				)}
				onChange={() => handleChangeCategories(itemCategory)}
			>
				{itemCategory.title}
			</Checkbox>
		);
	}
};
