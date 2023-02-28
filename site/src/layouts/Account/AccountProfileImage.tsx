import * as React from 'react';
import { icons } from '@/utils';

interface IAccountProfileImageProps {}

const AccountProfileImage: React.FunctionComponent<IAccountProfileImageProps> = props => {
	const {} = props;
	return (
		<div className="flex-shrink-0 flex items-start">
			<div className="relative rounded-full overflow-hidden flex">
				<icons.UserAvatar className="w-32 h-32 rounded-full object-cover z-0" />
			</div>
		</div>
	);
};

export default AccountProfileImage;
