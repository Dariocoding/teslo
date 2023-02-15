import React from 'react';
import classNames from 'classnames';
import { CgSpinner } from 'react-icons/cg';
import { IconType } from 'react-icons/lib';

interface ISpinnerProps {
	indicator?: IconType;
	isSpining?: boolean;
	size?: number;
	style?: React.CSSProperties;
	className?: string;
}

const Spinner: React.FunctionComponent<ISpinnerProps> = props => {
	const { className, indicator: Component, isSpining, size, style, ...rest } = props;

	const spinnerStyle = {
		height: size,
		width: size,
		...style,
	};

	const spinnerClass = classNames(isSpining && 'animate-spin', className);

	return <Component style={spinnerStyle} className={spinnerClass} {...rest} />;
};

Spinner.defaultProps = {
	indicator: CgSpinner,
	isSpining: true,
	size: 20,
};

export default Spinner;
