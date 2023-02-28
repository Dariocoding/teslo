import NavLink from '@/shared/NavLink';
import * as React from 'react';
import { NavItemType } from '../data';
import { HiChevronDown } from 'react-icons/hi';
import { Disclosure } from '@headlessui/react';
import RenderMenuChild from './RenderMenuChild';

interface IRenderItemProps {
	item: NavItemType;
	onClickClose(): void;
}

const RenderItem: React.FunctionComponent<IRenderItemProps> = props => {
	const { item, onClickClose } = props;
	return (
		<Disclosure as="li" className="text-slate-900 dark:text-white">
			<NavLink
				className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
				href={item.href}
				activeClassName="text-secondary"
			>
				<span
					className={!item.children ? 'block w-full' : ''}
					onClick={onClickClose}
				>
					{item.name}
				</span>
				{item.children && (
					<span
						className="block flex-grow"
						onClick={e => e.preventDefault()}
					>
						<Disclosure.Button
							as="span"
							className="flex justify-end flex-grow"
						>
							<HiChevronDown
								className="ml-2 h-4 w-4 text-neutral-500"
								aria-hidden="true"
							/>
						</Disclosure.Button>
					</span>
				)}
			</NavLink>
			{item.children && (
				<Disclosure.Panel>
					<RenderMenuChild item={item} onClickClose={onClickClose} />
				</Disclosure.Panel>
			)}
		</Disclosure>
	);
};

export default RenderItem;
