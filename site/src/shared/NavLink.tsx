import Link from 'next/link';
import classNames from 'classnames';
import * as React from 'react';
import { usePathname } from 'next/navigation';

interface INavLinkProps {
	href?: string;
	className?: string;
	activeClassName?: string;
	children?: React.ReactNode;
}

const NavLink: React.FunctionComponent<INavLinkProps> = props => {
	const { href, className, activeClassName } = props;
	const pathname = usePathname();
	const classStyles = classNames(className, activeClassName);
	const isValidHref = typeof href === 'string';

	if (!isValidHref) {
		return (
			<span className={classNames(classStyles, 'cursor-pointer')}>
				{props.children}
			</span>
		);
	}

	return (
		<Link href={href} className={classStyles}>
			{props.children}
		</Link>
	);
};

export default NavLink;
