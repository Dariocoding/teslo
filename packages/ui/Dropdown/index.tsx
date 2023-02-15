import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

interface IDropdownProps {
	showOnHover?: boolean;
	placement?: 'bottom' | 'right';
	children?: React.ReactNode;
	displayButton: React.ReactNode;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = props => {
	const { displayButton, placement, showOnHover } = props;
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
			className="relative inline-block text-left"
		>
			{({ open }) => (
				<React.Fragment>
					<div>
						<Menu.Button>{displayButton}</Menu.Button>
					</div>

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
								'absolute z-10 mt-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-auto',
								placementClassName
							)}
						>
							<div className="py-1">{props.children}</div>
						</Menu.Items>
					</Transition>
				</React.Fragment>
			)}
		</Menu>
	);
};

Dropdown.defaultProps = {
	placement: 'bottom',
};

export default Dropdown;
