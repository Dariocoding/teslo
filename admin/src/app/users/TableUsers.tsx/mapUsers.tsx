import { getMaximiumRol } from '@/utils/getMaximiumRol';
import { User } from '@teslo/interfaces';
import dayjs from 'dayjs';
import { UserTable } from '../config';
import ActionsUser from './ActionsUser';
import BadgeIsActive from './BadgeIsActive';

interface IMapUsersProps {
	users: User[];
	onDeleteUser: (user: User) => void;
	onUpdateUser: (user: User) => void;
}

const mapUsers = (props: IMapUsersProps): UserTable[] => {
	const { users, onDeleteUser, onUpdateUser } = props;

	return users.map(user => ({
		...user,
		isActiveFormatted: <BadgeIsActive isActive={user.isActive} />,
		actions: <ActionsUser user={user} {...props} />,
		userRol: getMaximiumRol(user.roles),
		dateCreatedFormatted: dayjs(user.dateCreated).format('DD/MM/YYYY HH:mm:ss'),
		dateCreatedFormattedWithouHour: dayjs(user.dateCreated).format('DD/MM/YYYY'),
		fullName: user.firstName + ' ' + user.lastName,
	}));
};

export default mapUsers;
