import Logo from '@/shared/Logo';
import SocialsList from '@/shared/SocialList';
import * as React from 'react';
import { WidgetFooterMenu, widgetMenus } from './data';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = props => {
	const {} = props;
	return (
		<footer className="relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
			<div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
				<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
					<div className="col-span-2 md:col-span-1">
						<Logo />
					</div>
					<div className="col-span-2 flex items-center md:col-span-3">
						<SocialsList className="flex items-center space-x-2.5 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
					</div>
				</div>
				{widgetMenus.map(renderWidgetMenuItem)}
			</div>
		</footer>
	);
};

export default Footer;

const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
	return (
		<div key={index} className="text-sm">
			<h6 className="font-semibold text-neutral-700 dark:text-neutral-200">
				{menu.title}
			</h6>
			<ul className="mt-5 space-y-4">
				{menu.menus.map((item, index) => (
					<li key={index}>
						<a
							key={index}
							className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
