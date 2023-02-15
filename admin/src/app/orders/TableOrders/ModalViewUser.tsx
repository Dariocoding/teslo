import * as React from 'react';
import classNames from 'classnames';
import { BiUser } from 'react-icons/bi';
import { getMaximiumRol } from '@/utils/getMaximiumRol';
import dayjs from 'dayjs';
import { User } from '@teslo/interfaces';

interface IModalViewUserProps {
	user: User;
}

const ModalViewUser: React.FunctionComponent<IModalViewUserProps> = props => {
	const { user } = props;
	return (
		<div className="flex flex-col">
			<div className="mb-3 text-center flex items-center justify-center">
				<span>
					<BiUser className="shadow p-2.5 rounded-full h-16 align-middle border-none w-16" />
				</span>
			</div>
			<h6 className="text-center">
				{user.firstName} {user.lastName}
			</h6>
			<p className="text-center text-sm mb-8">
				{dayjs(user.dateCreated).format('DD/MM/YYYY')}
			</p>

			<div className="text-sm space-y-2">
				<p>
					<strong>Tel: </strong>
					{user.phone}
				</p>

				<p>
					<strong>Email: </strong>
					{user.email}
				</p>

				<p className="flex items-center">
					<strong>Active: </strong>
					<span
						className={classNames(
							'font-semibold flex items-center ml-1',
							user.isActive
								? 'text-teal-500'
								: 'text-red-500'
						)}
					>
						{user.isActive ? 'Active' : 'Inactive'}{' '}
					</span>
				</p>

				<p>
					<strong>Rol: </strong>
					{getMaximiumRol(user.roles)}
				</p>
			</div>
		</div>
	);
};

export default ModalViewUser;
