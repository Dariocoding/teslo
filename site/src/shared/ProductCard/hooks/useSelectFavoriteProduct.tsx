import { useAuthStore } from '@/store';
import { emptyUser } from '@/utils/emptyUser';
import { Product } from '@teslo/interfaces';
import { usersService } from '@teslo/services';
import { toast } from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';

export const useSelectFavoriteProduct = (product: Product) => {
	const { user, setUser } = useAuthStore();
	const isLiked = user?.wishlist?.includes?.(product.id);

	async function onClick() {
		if (emptyUser(user)) {
			toast(t => (
				<span className="w-full items-center flex justify-center">
					<FaInfoCircle className="text-blue-500 mr-1.5" />
					You have to Log In First
				</span>
			));
			return;
		}
		const wishlist = isLiked
			? user.wishlist.filter(id => id !== product.id)
			: [...user.wishlist, product.id];

		setUser({ wishlist });
		usersService.updateProfileUser({ wishlist }, { returnUser: false });
	}
	return { onClick, isLiked };
};
