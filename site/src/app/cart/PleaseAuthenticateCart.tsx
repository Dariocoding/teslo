import { viewPaths } from '@/utils';
import Link from 'next/link';
import * as React from 'react';

interface IPleaseAuthenticateCartProps {}

const PleaseAuthenticateCart: React.FunctionComponent<IPleaseAuthenticateCartProps> = props => {
	const {} = props;
	return (
		<div className="container relative space-y-8 my-12 py-6">
			<img
				src={'/images/requiere-auth.png'}
				alt={'Error Image'}
				className={'w-72 mx-auto'}
			/>
			<div className="flex items-center justify-center space-y-4 flex-col">
				<h6>You have to log in first to proceed with the purchase</h6>
				<Link href={viewPaths.login} className="btn btn-primary btn-sm">
					Log In
				</Link>
			</div>
		</div>
	);
};

export default PleaseAuthenticateCart;
