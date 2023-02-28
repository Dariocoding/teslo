import React from 'react';
import classNames from 'classnames';
import { APP_NAME } from '@/utils';

const LOGO_SRC_PATH = '/img/logo/';

interface ILogoProps {
	mode?: 'light' | 'dark';
	type?: 'full' | 'streamline';
	gutter?: string;
	imgClass?: string;
	logoWidth?: string | number;
	style?: React.CSSProperties;
	className?: string;
}
const Logo: React.FunctionComponent<ILogoProps> = props => {
	const {
		type = 'full',
		mode = 'light',
		gutter,
		className,
		imgClass,
		style,
		logoWidth = 'auto',
	} = props;

	return (
		<div
			className={classNames('logo', className, gutter)}
			style={{
				...style,
				...{ width: logoWidth },
			}}
		>
			<img
				className={imgClass}
				src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
				alt={`${APP_NAME} logo`}
			/>
		</div>
	);
};

export default Logo;
