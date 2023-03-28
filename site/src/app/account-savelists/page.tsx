'use client';
import * as React from 'react';
import AccountLayout from '@/layouts/Account';
import { HiOutlineHeart } from 'react-icons/hi';
import ListSaveList from './ListSaveLists';
import { Product } from '@teslo/interfaces';
import { toast } from 'react-hot-toast';
import ConfirmModalDeleteSaveList from './ConfirmModalDeleteSaveList';
import { usersService } from '@teslo/services';
import RenderIf from '@teslo/react-ui/RenderIf';

const AccountSaveListPage: React.FunctionComponent = props => {
	const {} = props;
	const [saveList, setSaveList] = React.useState<Product[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);

	const onAcceptDeleteSaveList = async () => {
		try {
			setIsLoading(true);
			await usersService.updateProfileUser(
				{ wishlist: [] },
				{ returnUser: false }
			);
			setSaveList([]);
			setShowModal(false);
			toast.success('Deleted save list');
		} catch (error) {
			console.log(error);
			toast.error('There was an error deleting the save list');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AccountLayout>
			<div className="space-y-10 sm:space-y-12">
				<h2 className="text-2xl sm:text-3xl font-semibold flex items-center justify-between flex-wrap">
					<span className="flex items-center">
						Save List <HiOutlineHeart className="ml-2" />
					</span>
					<RenderIf isTrue={saveList.length}>
						<button
							className="btn btn-outline-danger btn-xs"
							onClick={() => setShowModal(true)}
						>
							Clean Save List
						</button>
					</RenderIf>
				</h2>
				<div className="flex flex-col md:flex-row">
					<div className="flex-grow mt-10 md:mt-0 max-w-5xl space-y-6">
						<ListSaveList
							savelist={saveList}
							setSaveList={setSaveList}
						/>
					</div>
				</div>
			</div>
			<ConfirmModalDeleteSaveList
				onAccept={onAcceptDeleteSaveList}
				isLoading={isLoading}
				showModal={showModal}
				onClose={() => setShowModal(false)}
			/>
		</AccountLayout>
	);
};

export default AccountSaveListPage;
