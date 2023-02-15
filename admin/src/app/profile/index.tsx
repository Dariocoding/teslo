import ProfileLayout from '@/layouts/ProfileLayout';
import { useAuthStore } from '@/store';
import { UserDto } from '@teslo/interfaces';
import { usersService } from '@teslo/services';
import * as React from 'react';
import { toast } from 'react-toastify';

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = props => {
	const {} = props;
	const { user, initAuthenticate, accessToken } = useAuthStore();

	async function onSubmitUpdateUser(user: UserDto) {
		try {
			if (!user.password?.trim()) delete user.password;
			const req = await usersService.updateProfileUser(user);
			initAuthenticate({ token: accessToken, user: req.data });
			toast.success('User updated successfully.');
		} catch (error) {
			console.log(error);
			toast.error(
				error?.response?.data?.message || 'Error updating user profile'
			);
		}
	}

	return <ProfileLayout user={user} onSubmitUpdateUser={onSubmitUpdateUser} />;
};

export default React.memo(ProfilePage);
