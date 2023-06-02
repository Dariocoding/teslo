import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import TableCategories from './TableCategories';
import { FaClipboardList } from 'react-icons/fa';
import { validPaths } from '@/utils';

interface ICategoriesPageProps {}

const CategoriesPage: React.FunctionComponent<ICategoriesPageProps> = props => {
	const {} = props;

	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			title={'Categories'}
			icon={<FaClipboardList />}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Categories' },
			]}
		>
			<div className="tile">
				<TableCategories />
			</div>
		</HeaderDashboard>
	);
};

export default React.memo(CategoriesPage);
