import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { HiFolder } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useFetchBill } from '../hooks/useFetchBill';
import BillInfo from './BillInfo';
import ContainerBill from './ContainerBill';

interface IViewBillPageProps {}

const ViewBillPage: React.FunctionComponent<IViewBillPageProps> = props => {
	const {} = props;
	const { id } = useParams();
	const { data: bill, isFetching, error, setData } = useFetchBill(id);

	return (
		<HeaderDashboard
			to={validPaths.bills.path}
			breadcrumbs={[
				{
					to: validPaths.dashboard.path,
					label: 'Dashboard',
				},
				{
					to: validPaths.bills.path,
					label: 'Bills',
				},
				{ label: 'View Bill' },
			]}
			title={'View Bill'}
			icon={<HiFolder />}
		>
			<ContainerBill isLoading={isFetching} error={error}>
				<BillInfo bill={bill} setBill={setData} />
			</ContainerBill>
		</HeaderDashboard>
	);
};

export default ViewBillPage;
