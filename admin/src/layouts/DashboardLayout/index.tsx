import * as React from 'react';
import HeaderDashboard from './HeaderDashboard';
import SidebarDashboard from './SidebarDashboard';

interface IDashboardLayoutProps {
	children?: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = props => {
	const {} = props;

	return (
		<div className="app-layout-classic flex flex-auto flex-col">
			<div className="flex flex-auto min-w-0">
				<SidebarDashboard />
				<div className=" flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
					<HeaderDashboard />

					<div className="h-full flex flex-auto flex-col bg-gray-100 p-4">
						{props.children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
