import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import * as React from 'react';
import { MdEditSquare } from 'react-icons/md';
import LoadedSetBill from '../shared/LoadedSetBill';
import { useFetchProviders } from '@/app/providers/hooks/useFetchProviders';
import { Link, useParams } from 'react-router-dom';
import { useFetchBill } from '../hooks/useFetchBill';
import FormBill from '../forms/FormBill';
import RenderIf from '@teslo/react-ui/RenderIf';

interface IEditBillPageProps {}

const EditBillPage: React.FunctionComponent<IEditBillPageProps> = props => {
	const {} = props;
	const { id } = useParams();
	const {
		data: providers,
		isFetching: isLoadingProviders,
		refetch: refetchProviders,
		error: errorProviders,
	} = useFetchProviders();
	const {
		data: bill,
		isFetching: isLoadingBill,
		refetch: refetchBill,
		error: errorBill,
	} = useFetchBill(id);

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
				{ label: 'Edit Bill' },
			]}
			title={'Edit Bill'}
			icon={<MdEditSquare />}
		>
			<LoadedSetBill
				providers={providers}
				isLoadingProviders={isLoadingProviders || isLoadingBill}
				refetch={() => {
					refetchProviders();
					refetchBill();
				}}
				error={errorProviders || errorBill}
			>
				<RenderIf isTrue={!bill || !Object.keys(bill).length}>
					<div className="tile max-w-[900px] mx-auto">
						<div className="text-center">
							<div>
								<img
									src="/img/others/error.png"
									alt="Error message"
									className="w-28 mx-auto"
								/>
							</div>
							<div className="mt-4">
								<h1 className="text-2xl font-semibold">
									Bill not found
								</h1>
								<p>
									Maybe this bill was deleted
									or doesn't exist or you
									don't have permissions to
									see it
								</p>
							</div>
						</div>
						<div className="flex items-center justify-center">
							<Link
								to={validPaths.bills.path}
								className="btn btn-sm btn-primary mt-4"
							>
								Go back
							</Link>
						</div>
					</div>
				</RenderIf>
				<RenderIf isTrue={bill && Object.keys(bill).length}>
					<FormBill bill={bill} providers={providers} />
				</RenderIf>
			</LoadedSetBill>
		</HeaderDashboard>
	);
};

export default EditBillPage;
