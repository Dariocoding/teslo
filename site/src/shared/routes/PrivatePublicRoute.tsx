'use client';
import { useAuthStore } from '@/store';
import { viewPaths } from '@/utils';
import RenderIf from '@teslo/react-ui/RenderIf';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Loader from '../Loader';

interface IPrivatePublicRouteProps {
	children: React.ReactNode;
}

const PrivatePublicRoute: React.FunctionComponent<IPrivatePublicRouteProps> = props => {
	const { authenticated, loading } = useAuthStore();
	const [rendered, setIsRendered] = React.useState(false);
	const router = useRouter();
	const variantPush = !loading && authenticated;
	const variantRender = !loading && !authenticated;

	React.useEffect(() => {
		if (variantPush) {
			router.push(viewPaths.home);
		} else setIsRendered(true);
	}, [authenticated, loading]);

	return (
		<React.Fragment>
			<RenderIf isTrue={loading || !rendered}>
				<Loader loading={true} />
			</RenderIf>
			<RenderIf isTrue={variantRender && rendered}>{props.children}</RenderIf>
		</React.Fragment>
	);
};

export default PrivatePublicRoute;
