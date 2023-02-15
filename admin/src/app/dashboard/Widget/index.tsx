import RenderIf from '@teslo/react-ui/RenderIf';
import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IWidgetDashboardProps {
	path: string;
	Icon: IconType;
	colouredIcon: string;
	title: string;
	value: number | string;
}

const WidgetDashboard: React.FunctionComponent<IWidgetDashboardProps> = props => {
	const { path, Icon, colouredIcon, title, value } = props;
	return (
		<Link to={path}>
			<StatusCard backgroundHoverColor={colouredIcon}>
				<StatusIcon>
					<Icon />
				</StatusIcon>
				<StatusInfo colorText={props.colouredIcon}>
					<RenderIf isTrue={title}>
						<span>{props.title}</span>
					</RenderIf>

					<RenderIf isTrue={value || value === 0}>
						<h6 className="mt-2">{value}</h6>
					</RenderIf>
				</StatusInfo>
			</StatusCard>
		</Link>
	);
};
export default WidgetDashboard;

const StatusCard = styled.div<{ backgroundHoverColor: string }>`
	padding: 30px;
	display: flex;
	align-items: center;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	border-radius: 20px;
	position: relative;
	overflow: hidden;
	z-index: 1;
	transition: color 0.5s ease 0s;
	margin-bottom: 10px;

	&::before {
		content: '';
		width: 100%;
		padding-top: 100%;
		border-radius: 50%;
		background-image: linear-gradient(
			to top right,
			#363636,
			${props => props.backgroundHoverColor}
		);
		position: absolute;
		left: -50%;
		top: 0;
		transform: scale(0);
		transition: transform 0.8s ease 0s;
	}

	&:hover::before {
		transform: scale(3);
	}

	svg {
		color: ${props => props.backgroundHoverColor};
	}

	&:hover {
		h4,
		h6,
		span,
		svg {
			color: #fff;
		}
	}
`;

const StatusIcon = styled.div`
	font-size: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
`;

const StatusInfo = styled.div<{ colorText: string }>`
	flex-grow: 1;
	text-align: center;
	z-index: 1;
	text-transform: capitalize;

	h4,
	span {
		color: #111;
		font-weight: 600;
	}
	h4 {
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
`;
