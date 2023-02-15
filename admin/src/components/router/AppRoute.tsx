import * as React from 'react';

interface IAppRouteProps {
	component: React.LazyExoticComponent<React.FunctionComponent<any>>;
}

const AppRoute: React.FunctionComponent<IAppRouteProps> = props => {
	const { component: Component } = props;
	return <Component />;
};

export default AppRoute;
