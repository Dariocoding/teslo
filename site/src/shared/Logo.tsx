import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export interface LogoProps {
	className?: string;
}

const Logo: React.FC<LogoProps> = props => {
	const { className } = props;
	return (
		<Link href="/" className={classNames('inline-block text-slate-600', className)}>
			<img
				className={`block max-h-8 sm:max-h-10 dark:hidden`}
				src={'/images/logo.svg'}
				alt="Logo"
			/>
			<img
				className="hidden max-h-8 sm:max-h-10 dark:block"
				src={'/images/logo-light.svg'}
				alt="Logo-Light"
			/>
		</Link>
	);
};

export default Logo;
