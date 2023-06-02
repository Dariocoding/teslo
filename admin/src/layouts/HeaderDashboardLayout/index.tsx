import * as React from 'react';
import ButtonBack from './ButtonBack';
import BreadCrumbHeaderDashboard, {
	IBreadCrumbHeaderDashboardProps,
} from './BreadCrumbHeaderDashboard';

interface IHeaderDashboardProps {
	children?: React.ReactNode;
	to?: string;
	icon: React.ReactNode;
	title: React.ReactNode;
	breadcrumbs?: IBreadCrumbHeaderDashboardProps['breadcrumbs'];
}

const HeaderDashboard: React.FunctionComponent<IHeaderDashboardProps> = props => {
	const { to, icon, title, breadcrumbs = [] } = props;
	return (
		<div className="mb-2 print:hidden">
			<div className="lg:px-6 px-4 lg:py-6 py-4 bg-white">
				<div className="flex justify-between items-center flex-wrap gap-y-2">
					<div className="flex items-center justify-start gap-2">
						<ButtonBack to={to} />

						<span className="lg:text-2xl text-xl">{icon}</span>
						<span className="font-semibold lg:text-xl text-lg">
							{title}
						</span>
					</div>
					<div className="lg:mt-0 mt-1">
						<BreadCrumbHeaderDashboard
							breadcrumbs={breadcrumbs}
						/>
					</div>
				</div>
			</div>
			<div className="p-4">{props.children}</div>
		</div>
	);
};

export default HeaderDashboard;
