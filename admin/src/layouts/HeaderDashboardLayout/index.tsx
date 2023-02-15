import * as React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface IHeaderDashboardProps {
	children?: React.ReactNode;
	to: string;
}

const HeaderDashboard: React.FunctionComponent<IHeaderDashboardProps> = props => {
	const { to } = props;
	return (
		<div className="mb-2 print:hidden">
			<Link to={to} className="btn btn-xs btn-dark hover:animate-bounce-left">
				<FaChevronLeft className="mr-1" /> {props.children}
			</Link>
		</div>
	);
};

export default HeaderDashboard;
