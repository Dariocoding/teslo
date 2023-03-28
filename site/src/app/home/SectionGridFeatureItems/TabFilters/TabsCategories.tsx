import * as React from 'react';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';
import { Category } from '@teslo/interfaces';
import classNames from 'classnames';
import { HiOutlineChevronDown } from 'react-icons/hi';
import XClear from './XClear';
import { Checkbox } from '@teslo/react-ui';

interface ITabsCategoriesProps {
	categories: Category[];
	categoriesState: Category[];
	setCategoriesState: React.Dispatch<Category[]>;
	handleChangeCategories(category: Category): void;
}

const TabsCategories: React.FunctionComponent<ITabsCategoriesProps> = props => {
	const { categoriesState, setCategoriesState, categories, handleChangeCategories } = props;
	return (
		<Popover className="relative">
			{({ open, close }) => (
				<>
					<Popover.Button
						className={classNames(
							'flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none',
							open && '!border-primary-500',
							categoriesState.length
								? '!border-primary-500 bg-primary-50 text-primary-900'
								: 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
						)}
					>
						<BsArrowsAngleExpand className="w-4 h-4" />

						<span className="ml-2">Categories</span>
						<HiOutlineChevronDown className="w-4 h-4 ml-3" />
					</Popover.Button>
					<Transition
						as={React.Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
							<div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
								<div className="relative flex flex-col px-5 py-6 space-y-5">
									<Checkbox
										isChecked={
											!categoriesState.length
										}
										onChange={() =>
											setCategoriesState(
												[]
											)
										}
									>
										All Categories
									</Checkbox>
									<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
									{categories.map(item => (
										<div
											key={
												item.idcategory
											}
										>
											<Checkbox
												isChecked={categoriesState.some(
													s =>
														s.idcategory ===
														item.idcategory
												)}
												onChange={() =>
													handleChangeCategories(
														item
													)
												}
											>
												{
													item.title
												}
											</Checkbox>
										</div>
									))}
								</div>
								<div className="p-5 bg-slate-50 dark:bg-slate-900 dark:border-t dark:border-slate-800 flex items-center justify-between">
									<button
										className="btn btn-alternative btn-sm"
										onClick={() => {
											close();
											setCategoriesState(
												[]
											);
										}}
									>
										Clear
									</button>

									<button
										className="btn btn-primary btn-sm"
										onClick={close}
									>
										Apply
									</button>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default TabsCategories;
