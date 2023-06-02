import * as React from 'react';
import classNames from 'classnames';
import useResponsive from '@/utils/hooks/useResponsive';
import RenderIf from '@teslo/react-ui/RenderIf';
import './styles/_side-nav.css';
import Logo from '../Logo';
import {
	LOGO_X_GUTTER,
	SIDE_NAV_COLLAPSED_WIDTH,
	SIDE_NAV_CONTENT_GUTTER,
	SIDE_NAV_WIDTH,
	colors,
	validPaths,
} from '@/utils';
import { useDashboardStore } from './store/dashboardStore';
import { Link } from 'react-router-dom';
import { useConfigApp } from '@/store';

const Drawer = React.lazy(() => import('@teslo/react-ui/Drawer'));
const VerticalMenuContent = React.lazy(() => import('./VerticalMenuContent'));

interface ISidebarDashboardProps {}

const sideNavCollapseStyle = {
	width: SIDE_NAV_WIDTH,
	minWidth: SIDE_NAV_WIDTH,
};

const sideNavStyle = {
	width: SIDE_NAV_COLLAPSED_WIDTH,
	minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SidebarDashboard: React.FC<ISidebarDashboardProps> = props => {
	const {} = props;
	const { closeCollapse, isCollapsed } = useDashboardStore();
	const { colors } = useConfigApp();
	const { mobile, desktop } = useResponsive();

	return (
		<React.Fragment>
			<RenderIf isTrue={mobile}>
				<Drawer
					title={<Logo type="full" />}
					isOpen={isCollapsed}
					onClose={closeCollapse}
					bodyClass={classNames('side-nav-light', 'p-0')}
					width={280}
					placement={'left'}
				>
					<React.Suspense fallback={<></>}>
						<RenderIf isTrue={isCollapsed}>
							<VerticalMenuContent />
						</RenderIf>
					</React.Suspense>
				</Drawer>
			</RenderIf>

			<RenderIf isTrue={desktop}>
				<div
					style={isCollapsed ? sideNavCollapseStyle : sideNavStyle}
					className={classNames(
						'side-nav side-nav-light print:hidden',
						colors.isThemed && colors.textColor,
						colors.isThemed && colors.sidebarContainer,
						!isCollapsed && 'side-nav-expand'
					)}
				>
					<div
						className={classNames(
							'side-nav-header fixed py-[0.95rem]',
							colors.isThemed && colors.topLogoContainer
						)}
						style={
							isCollapsed
								? sideNavCollapseStyle
								: sideNavStyle
						}
					>
						<Link to={validPaths.dashboard.path}>
							<Logo
								type={
									isCollapsed
										? 'full'
										: 'streamline'
								}
								mode={
									colors.isThemed
										? 'dark'
										: 'light'
								}
								gutter={
									!isCollapsed
										? SIDE_NAV_CONTENT_GUTTER
										: LOGO_X_GUTTER
								}
							/>
						</Link>
					</div>
					<VerticalMenuContent />
				</div>
			</RenderIf>
		</React.Fragment>
	);
};

export default SidebarDashboard;
