import * as React from 'react';
import { Disclosure } from '@headlessui/react';
import { NavItemType } from '../data';
import NavLink from '@/shared/NavLink';
import { HiChevronDown } from 'react-icons/hi';

interface IRenderMenuChildProps {
	item: NavItemType;
	onClickClose(): void;
}

const RenderMenuChild: React.FunctionComponent<IRenderMenuChildProps> = props => {
	const { item, onClickClose } = props;
	return (
		<ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
			{item.children?.map((i, index) => (
				<Disclosure key={i.href + index} as="li">
					<NavLink
						href={i.href}
						className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 pl-3 text-neutral-900 dark:text-neutral-200 font-medium`}
						activeClassName="text-secondary"
					>
						<span
							className={`py-2.5 ${
								!i.children ? 'block w-full' : ''
							}`}
							onClick={onClickClose}
						>
							{i.name}
						</span>
						{i.children && (
							<span
								className="flex items-center flex-grow"
								onClick={e => e.preventDefault()}
							>
								<Disclosure.Button
									as="span"
									className="flex justify-end flex-grow"
								>
									<HiChevronDown
										className="ml-2 h-4 w-4 text-slate-500"
										aria-hidden="true"
									/>
								</Disclosure.Button>
							</span>
						)}
					</NavLink>
					{i.children && (
						<Disclosure.Panel>
							<RenderMenuChild
								item={i}
								onClickClose={onClickClose}
							/>
						</Disclosure.Panel>
					)}
				</Disclosure>
			))}
		</ul>
	);
};

export default RenderMenuChild;
