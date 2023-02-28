import * as React from 'react';
import { icons } from '@/utils';

interface IXClearProps {}

const XClear: React.FunctionComponent<IXClearProps> = props => {
	const {} = props;
	return (
		<span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
			<icons.Xclear className="h-3 w-3" />
		</span>
	);
};

export default XClear;
