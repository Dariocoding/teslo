import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { RiBillFill } from 'react-icons/ri';
import DataTableBills from './TableBills';
import { useFetchBills } from './hooks/useFetchBills';

interface IBillsPageProps {}

const BillsPage: React.FunctionComponent<IBillsPageProps> = props => {
	const {} = props;
	const {
		data: bills,
		setData: setBills,
		isLoading,
	} = useFetchBills({ from: new Date(), to: new Date() });

	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.dashboard.path },
				{ label: 'Bills' },
			]}
			icon={<RiBillFill />}
			title="Bills"
		>
			<div className="tile">
				<DataTableBills
					bills={bills}
					setBills={setBills}
					isLoading={isLoading}
				/>
			</div>
		</HeaderDashboard>
	);
};

export default BillsPage;
