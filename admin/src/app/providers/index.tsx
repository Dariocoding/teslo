import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { FaPeopleCarry } from 'react-icons/fa';
import TableProviders from './TableProviders';
import { useFetchProviders } from './hooks/useFetchProviders';

interface IProvidersPageProps {}

const ProvidersPage: React.FunctionComponent<IProvidersPageProps> = props => {
	const {} = props;
	const { data, setData, isLoading } = useFetchProviders();
	return (
		<HeaderDashboard
			to={validPaths.dashboard.path}
			title={'Providers'}
			icon={<FaPeopleCarry />}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Providers' },
			]}
		>
			<div className="tile">
				<TableProviders
					providers={data}
					setProviders={setData}
					isLoading={isLoading}
				/>
			</div>
		</HeaderDashboard>
	);
};

export default ProvidersPage;
