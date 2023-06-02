import { useAuthStore } from '@/store';
import classNames from 'classnames';
import * as React from 'react';
import { HiOutlineBan, HiPencilAlt } from 'react-icons/hi';
import { ShowIf } from 'react-rainbow-components';

interface IProfileUserOrderProps {}

const ProfileUserOrder: React.FunctionComponent<IProfileUserOrderProps> = props => {
	const {} = props;
	const { user } = useAuthStore();
	const onClickCancel = () => {};

	return (
		<div className="tile w-[350px]">
			<div className="flex items-center justify-between">
				<div className="w-full">
					<h6 className="text-lg font-semibold mb-1.5">
						Datos de Venta
					</h6>
					<span>
						<span className="text-sm">Vendedor:</span>{' '}
						{user.firstName} {user.lastName}
					</span>
					<div className="flex mt-2.5">
						<button
							type="button"
							className={classNames(
								'btn btn-danger btn-xs mb-0',
								true && 'w-full'
							)}
						>
							<HiOutlineBan className="mr-1" /> Cancel
						</button>
						<ShowIf
							inAnimation="slideVertical"
							outAnimation="slideVertical"
						>
							<button
								type="button"
								className="btn btn-success btn-xs mb-0 mr-0"
							>
								Procesar{' '}
								<HiPencilAlt className="ml-1" />
							</button>
						</ShowIf>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileUserOrder;
