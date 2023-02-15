import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import TableCategories from './TableCategories';

interface ICategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<ICategoriesPageProps> = props => {
	const {} = props;
	return (
		<React.Fragment>
			<HeaderDashboard to="/dashboard">Dashboard</HeaderDashboard>
			<div className="tile">
				<TableCategories />
			</div>
		</React.Fragment>
	);
};

export default React.memo(CategoriesPage);
