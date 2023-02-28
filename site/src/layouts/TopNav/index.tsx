'use client';
import Logo from '@/shared/Logo';
import { useAuthStore } from '@/store';
import classNames from 'classnames';
import * as React from 'react';
import AvatarDropdown from './AvatarDropdown';
import CartDropdown from './CartDropdown';
import DropdownCategories from './DropdownCategories';
import MenuBar from './MenuBar';
import SearchForm from './SearchForm';

interface ITopNavProps {}

const TopNav: React.FunctionComponent<ITopNavProps> = props => {
	const {} = props;
	const [top, setTop] = React.useState(true);

	// detect whether user has scrolled the page down by 10px
	React.useEffect(() => {
		const scrollHandler = () => {
			window.pageYOffset > 10 ? setTop(false) : setTop(true);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [top]);

	return (
		<div
			suppressHydrationWarning
			className={classNames(
				'w-full z-10 transition duration-300 ease-in-out fixed',
				!top && 'backdrop-blur-sm shadow-lg'
			)}
		>
			<div className="relative z-10 bg-white dark:bg-slate-900 ">
				<div className="container">
					<div className="h-20 flex justify-between">
						<div className="flex lg:flex-1 items-center w-full justify-end md:justify-between space-x-3 sm:space-x-8">
							<Logo />
							<div className="hidden md:block h-10 border-l border-slate-200 dark:border-slate-700"></div>

							<div className="hidden md:block">
								<DropdownCategories />
							</div>

							<div className="flex-1 flex items-center justify-end">
								<div className="flex-[2] px-4 md:flex hidden max-w-xs ml-auto">
									<SearchForm />
								</div>
								<AvatarDropdown />
								<CartDropdown />
							</div>
						</div>
						<div className="flex items-center md:hidden flex-1 justify-end">
							<MenuBar />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
