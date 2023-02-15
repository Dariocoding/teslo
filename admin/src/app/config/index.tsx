import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import Card from './Card';
import dataOptions from './data/data-options';

interface IConfigPageProps {}

const ConfigPage: React.FunctionComponent<IConfigPageProps> = props => {
	const {} = props;
	return (
		<React.Fragment>
			<HeaderDashboard to="/dashboard">Dashboard</HeaderDashboard>
			<div className="grid lg:grid-cols-3 gap-4">
				{dataOptions.map(option => (
					<Card {...option} key={option.to} />
				))}
			</div>
		</React.Fragment>
	);
};

export default React.memo(ConfigPage);
