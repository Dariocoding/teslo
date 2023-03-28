import { OptionsQueryUser, RecoverPasswordDto, SendRequestPasswordRecoverDto } from './interfaces';
import { User, UserDto } from '@teslo/interfaces';
import { axiosClient } from '../../config';
import { MessageResponse } from '../../services/interfaces.api';

export const usersService = {
	getUsers: () => axiosClient.get<User[]>('/users'),
	getUserByEmailAndToken: (email: string, token: string) =>
		axiosClient.get<User>(`/users/${email}/${token}`),
	getUser: (id: string) => axiosClient.get<User>(`/users/${id}`),
	deleteUser: (id: string) => axiosClient.delete<User>(`/users/${id}`),
	createUser: (userDto: UserDto) => axiosClient.post<User>('/users', userDto),
	updateUser: (id: string, userDto: UserDto) =>
		axiosClient.put<User>(`/users/${id}`, userDto),
	updateProfileUser: (user: UserDto, params?: OptionsQueryUser) =>
		axiosClient.patch<User>('/users/profile/user', user, { params }),

	// RECOVER USER
	sendRequestPassword: (data: SendRequestPasswordRecoverDto) =>
		axiosClient.patch<MessageResponse>('/users/sendRequestPassword', data),

	recoverPassword: (data: RecoverPasswordDto) =>
		axiosClient.patch<MessageResponse>('/users/recoverPassword', data),
};

export * from './interfaces';
