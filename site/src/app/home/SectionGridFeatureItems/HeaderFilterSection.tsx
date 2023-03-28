'use client';
import React from 'react';
import { filtersGenders, icons } from '@/utils';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import Heading from '@/shared/Heading';
import Nav from '@/shared/Nav';
import NavItem from '@/shared/Nav/NavItem';
import TabFilters from './TabFilters';
import { Category, Size } from '@teslo/interfaces';
import { FilterProductsState } from './hooks/useFiltersProduct';

export interface HeaderFilterSectionProps {
	className?: string;
	categories: Category[];
	filters: FilterProductsState;
}

const HeaderFilterSection: React.FunctionComponent<HeaderFilterSectionProps> = props => {
	const { className, categories, filters } = props;
	const toggleFilter = () => setIsOpen(!isOpen);
	const [isOpen, setIsOpen] = React.useState(true);
	const {
		tabActive,
		setCategoriesState,
		setSizesState,
		sizesState,
		setTabActive,
		categoriesState,
	} = filters;

	React.useEffect(() => {}, []);

	return (
		<div className={classNames('flex flex-col relative mb-6', className)}>
			<Heading>What's trending now</Heading>
			<div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0 lg:space-x-2 ">
				<Nav
					className="sm:space-x-2"
					containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
				>
					{filtersGenders.map((item, index) => (
						<NavItem
							key={index}
							isActive={tabActive === item}
							onClick={() => setTabActive(item)}
						>
							{item}
						</NavItem>
					))}
				</Nav>
				<span className="block flex-shrink-0 relative">
					<button
						onClick={toggleFilter}
						className="btn btn-primary btn-sm w-full !pr-16"
					>
						<icons.FilterSearch className="w-6 h-6" />
						<span className="block truncate ml-2.5">
							Filter
						</span>
						<span className="absolute top-[40%] -translate-y-1/2 right-5">
							<HiOutlineChevronDown
								className={classNames(
									'w-5 h-5 transition',
									!isOpen && 'rotate-180'
								)}
							/>
						</span>
					</button>
				</span>
			</div>

			<Transition
				show={isOpen}
				enter="transition-opacity duration-150"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="w-full border-b border-neutral-200 dark:border-neutral-700 my-4"></div>
				<TabFilters categories={categories} {...filters} />
			</Transition>
		</div>
	);
};

export default HeaderFilterSection;
