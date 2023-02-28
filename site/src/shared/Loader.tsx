'use client';
import classNames from 'classnames';
import * as React from 'react';
import Spinner from '@teslo/react-ui/Spinner';

interface ILoaderProps {
	loading?: boolean;
}

const Loader: React.FunctionComponent<ILoaderProps> = props => {
	const { loading } = props;
	if (!loading) return null;

	return (
		<div className={classNames('fixed h-screen w-full bg-white z-50')}>
			<div className="flex items-center justify-center w-full h-full">
				<Spinner size={40} className={classNames('text-blue-600')} />
			</div>
		</div>
	);
};

export default Loader;

export const showLoader = () => {
	document.getElementById('portal-loader')?.classList.remove('hidden');
};

export const hideLoader = () => {
	document.getElementById('portal-loader')?.classList.toggle('hidden');
};
