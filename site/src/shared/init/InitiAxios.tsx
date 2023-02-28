'use client';
import { envs } from '@/utils';
import setAxiosBaseURL from '@teslo/services';
import * as React from 'react';

interface IInitAxiosProps {}

const InitAxios: React.FunctionComponent<IInitAxiosProps> = props => {
	setAxiosBaseURL(envs.API_URL);

	return null;
};

export default InitAxios;
