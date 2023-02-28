'use client';
import setAxiosBaseURL, { tokenAuth } from '@teslo/services';
import { useAuthStore } from '@/store';
import * as React from 'react';
import { envs } from '@/utils';
import { Toaster } from 'react-hot-toast';

interface IInitProps {}

const Init: React.FunctionComponent<IInitProps> = props => {
	const { initAuthenticate } = useAuthStore();

	React.useEffect(() => {
		setAxiosBaseURL(envs.API_URL);
		const at = localStorage.getItem('at');
		if (at) tokenAuth(at);

		initAuthenticate();
	}, []);

	return (
		<React.Fragment>
			<Toaster />
		</React.Fragment>
	);
};

export default Init;
