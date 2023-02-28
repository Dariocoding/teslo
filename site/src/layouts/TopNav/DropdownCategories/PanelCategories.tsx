import * as React from 'react';
import { RiMenLine, RiWomenLine } from 'react-icons/ri';
import Link from 'next/link';
import { icons } from '@/utils';
import { Popover } from '@headlessui/react';

interface IPanelCategoriesProps {
	close(): void;
}

interface SolutionItem {
	name: string;
	description: string;
	href?: string;
	icon: React.ReactNode;
}

const CATEGORIES: SolutionItem[] = [
	{
		name: 'Women',
		icon: <RiWomenLine />,
		description: 'New items in 2023 ',
	},
	{
		name: 'Man',
		icon: <RiMenLine />,
		description: 'Perfect for gentlemen',
	},

	{
		name: 'Sports',
		icon: <icons.Sports className="h-6 w-6" />,
		description: 'The needs of sports ',
	},
];

type Ref = React.ForwardedRef<any>;

const PanelCategories: React.FC<IPanelCategoriesProps> = React.forwardRef((props, ref: Ref) => {
	const { close } = props;
	return (
		<Popover.Panel
			className="absolute z-40 w-80 mt-3.5 transform -translate-x-1/2 left-1/2 sm:px-0"
			ref={ref}
		>
			<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
				<div className="relative grid grid-cols-1 gap-2 bg-white dark:bg-neutral-800 px-6 py-4">
					{CATEGORIES.map((item, index) => (
						<Link
							key={index}
							href={'/page-collection'}
							onClick={close}
							className={`flex items-center focus:outline-none focus-visible:ring-0 transition hover:bg-neutral-100 rounded py-2`}
						>
							<div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-primary-50 rounded-md text-primary-500">
								{item.icon}
							</div>
							<div className="ml-4 space-y-0.5">
								<p className="text-sm font-medium">
									{item.name}
								</p>
								<p className="text-xs text-neutral-500 dark:text-neutral-300">
									{item.description}
								</p>
							</div>
						</Link>
					))}
				</div>
				<div className="p-4 bg-neutral-50 dark:bg-neutral-700">
					<Link
						href="/page-collection-2"
						className="flow-root px-2 py-2 space-y-0.5 transition duration-150 ease-in-out rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
					>
						<div className="flex items-center">
							<span className="text-sm font-medium ">
								Go to our shop
							</span>
						</div>
						<span className="block text-sm text-slate-500 dark:text-neutral-400">
							Look for what you need and love.
						</span>
					</Link>
				</div>
			</div>
		</Popover.Panel>
	);
});

export default PanelCategories;
