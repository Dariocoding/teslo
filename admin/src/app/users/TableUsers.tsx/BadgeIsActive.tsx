import classNames from 'classnames';
import * as React from 'react';

interface IBadgeIsActiveProps {
	isActive: boolean;
}

const BadgeIsActive: React.FunctionComponent<IBadgeIsActiveProps> = props => {
	const { isActive } = props;
	return (
		<span
			className={classNames(
				'btn btn-xs cursor-default btn-pill px-5 w-full',
				isActive ? 'btn-success' : 'btn-danger'
			)}
		>
			{isActive ? 'Active' : 'Inactive'}
		</span>
	);
};

export default BadgeIsActive;
