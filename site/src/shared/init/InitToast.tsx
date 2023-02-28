'use client';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

interface IInitToastProps {}

const InitToast: React.FunctionComponent<IInitToastProps> = props => {
	const {} = props;
	return <Toaster />;
};

export default InitToast;
