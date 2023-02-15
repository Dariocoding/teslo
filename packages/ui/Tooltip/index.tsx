import React, { useId } from 'react';
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';
import classNames from 'classnames';
import 'react-tooltip/dist/react-tooltip.css';

interface Props {
	children?: React.ReactNode;
	message?: string;
	placement?: PlacesType;
	className?: string;
}

const ToolTip: React.FunctionComponent<Props> = props => {
	const { children, message, placement, className } = props;
	const id = useId();

	return (
		<React.Fragment>
			<span id={id} className={classNames('inline-block', className)}>
				{children}
			</span>

			<ReactTooltip anchorId={id} place={placement} content={message} />
		</React.Fragment>
	);
};

ToolTip.defaultProps = {
	placement: 'top',
};

export default ToolTip;
