import * as React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import BackgroundAuth from './backgroundAuth';
import classNames from 'classnames';
import './_card.css';
import { IS_THEMED, THEMED_SIDEBAR_CLASSNAMES } from '@/utils';

interface IAuthLayoutProps {
	children?: React.ReactNode;
}

const AuthLayout: React.FunctionComponent<IAuthLayoutProps> = props => {
	return (
		<div className="min-h-screen">
			<Material
				className={classNames(
					IS_THEMED && THEMED_SIDEBAR_CLASSNAMES.headerTop
				)}
			>
				<BackgroundAuth />
			</Material>
			<div className="flex flex-col flex-auto items-center justify-center min-w-0 min-h-screen">
				<div
					className="min-w-[320px] bg-white rounded-lg md:min-w-[450px] shadow-xl p-8" /* bodyClass="md:p-10" */
				>
					<div className="text-center">
						<Logo type="streamline" imgClass="mx-auto mb-1" />
					</div>
					<div>{props.children}</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;

const Material = styled.div`
	height: 100vh;
	width: 100vw;
	position: fixed;
	z-index: -1;
`;

/* SOME COLORS 
#dff9fb
#00d2d3
#48dbfb
#222f3e
*/
