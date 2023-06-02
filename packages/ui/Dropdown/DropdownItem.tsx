import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import * as React from 'react';

interface IDropdownItemProps {
	children?: React.ReactNode;
	className?: string;
	onClick?(): void;
	sm?: boolean;
}

const DropdownItem: React.FunctionComponent<IDropdownItemProps> = props => {
	const { className, onClick, sm } = props;

	const spanClassName = classNames(
		'block px-3 py-2 pr-4 cursor-pointer hover:bg-gray-100 hover:text-gray-900 text-gray-700',
		sm ? 'text-xs' : 'text-sm',
		className
	);

	return (
		<Menu.Item>
			<span className={spanClassName} onClick={onClick}>
				{props.children}
			</span>
		</Menu.Item>
	);
};

export default DropdownItem;
