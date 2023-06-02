import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import * as React from 'react';
import DataTableBrands from './TableBrands';
import { validPaths } from '@/utils';
import { FaTags } from 'react-icons/fa';

interface IBrandsPageProps {}

const BrandsPage: React.FunctionComponent<IBrandsPageProps> = props => {
	const {} = props;
	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			title={'Brands'}
			icon={<FaTags />}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Brands' },
			]}
		>
			<div className="tile">
				<DataTableBrands />
			</div>
		</HeaderDashboard>
	);
};

export default BrandsPage;
