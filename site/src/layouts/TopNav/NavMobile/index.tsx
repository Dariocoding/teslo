import React from 'react';
import { NAVIGATION, NavItemType } from '../data';
import Logo from '@/shared/Logo';
import SocialsList from '@/shared/SocialList';
import ButtonClose from '@/shared/ButtonClose';
import SearchForm from '../SearchForm';
import RenderItem from './RenderItem';

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = props => {
	const { data = NAVIGATION, onClickClose } = props;

	return (
		<div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
			<div className="py-6 px-5">
				<Logo />
				<div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
					<span>
						Discover the most outstanding articles on all topics
						of life. Write your stories and share them
					</span>

					<div className="flex justify-between items-center mt-4">
						<SocialsList
							itemClassName="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl"
							className="flex items-center justify-center"
						/>
					</div>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClose={onClickClose} />
				</span>

				<div className="mt-5">
					<SearchForm />
				</div>
			</div>
			<ul className="flex flex-col py-6 px-2 space-y-1">
				{data.map(item => (
					<RenderItem
						item={item}
						key={item.id}
						onClickClose={onClickClose}
					/>
				))}
			</ul>
		</div>
	);
};

export default NavMobile;
