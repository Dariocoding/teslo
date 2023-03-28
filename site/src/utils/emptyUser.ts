import { User } from '@teslo/interfaces';

export const emptyUser = (user: User) => {
	return !Boolean(Object.keys(user).length);
};
