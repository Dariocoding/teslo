import { Provider } from '@teslo/interfaces';
import dayjs from 'dayjs';
import * as React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

interface IHeaderViewProviderProps {
	provider: Provider;
	onUpdate(): void;
	onDelete(): void;
}

const HeaderViewProvider: React.FunctionComponent<IHeaderViewProviderProps> = props => {
	const { provider, onDelete, onUpdate } = props;

	return (
		<div className="grid lg:grid-cols-12 lg:gap-8 gap-4">
			<div className="tile lg:col-span-4">
				<div className="flex items-center justify-center mb-4">
					<h6>{provider.name}</h6>
				</div>
				<div className="flex flex-col justify-end w-full h-full items-end">
					<button
						onClick={onUpdate}
						className="mx-auto w-full btn btn-primary btn-sm"
					>
						Update Provider <FaPen className="ml-2" />
					</button>

					<button
						className="mx-auto w-full btn btn-danger btn-sm"
						onClick={onDelete}
					>
						Delete Provider <FaTrash className="ml-2" />
					</button>
				</div>
			</div>
			<div className="tile lg:col-span-8">
				<h4 className="mb-6">{provider.name}</h4>
				<div className="text-sm space-y-3">
					<p>
						<span className="font-bold">ID:</span>{' '}
						{provider.idprovider}
					</p>

					<p>
						<span className="font-bold">Date Created:</span>{' '}
						{dayjs(provider.dateCreated).format(
							'DD/MM/YYYY HH:mm:ss'
						)}
					</p>

					<p>
						<span className="font-bold">Slug:</span>{' '}
						{provider.slug}
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeaderViewProvider;
