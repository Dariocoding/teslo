import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

interface IDropdownProps {
	showOnHover?: boolean;
	placement?: 'bottom' | 'right';
	children?: React.ReactNode;
	displayButton: React.ReactNode;
	inTable?: boolean;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = props => {
	const { displayButton, placement = 'bottom', showOnHover, inTable = false } = props;
	const [isShowing, setIsShowing] = React.useState(false);
	const placementClassName = classNames(
		placement === 'bottom' && 'right-0 origin-top-right w-56',
		placement === 'right' && 'left-14 origin-bottom-left top-0 w-44'
	);

	return (
		<Menu
			as="div"
			onMouseEnter={() => (showOnHover ? setIsShowing(true) : null)}
			onMouseLeave={() => (showOnHover ? setIsShowing(false) : null)}
			className={classNames('inline-block text-left', !inTable && 'relative')}
		>
			{({ open }) => (
				<React.Fragment>
					<Menu.Button>{displayButton}</Menu.Button>

					<Transition
						show={(isShowing && showOnHover) || open}
						as={React.Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items
							className={classNames(
								'absolute z-10 mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-auto overflow-hidden',
								placementClassName,
								inTable && 'right-[80px]'
							)}
						>
							{props.children}
						</Menu.Items>
					</Transition>
				</React.Fragment>
			)}
		</Menu>
	);
};

export default Dropdown;
