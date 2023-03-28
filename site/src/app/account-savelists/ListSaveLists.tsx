'use client';
import ProductCard from '@/shared/ProductCard';
import { useAuthStore } from '@/store';
import { Product } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import Spinner from '@teslo/react-ui/Spinner';
import { productsService } from '@teslo/services';
import Link from 'next/link';
import * as React from 'react';

interface IListSaveListProps {
	savelist: Product[];
	setSaveList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ListSaveList: React.FunctionComponent<IListSaveListProps> = props => {
	const { savelist, setSaveList } = props;
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const { user } = useAuthStore();

	const fetchProducts = React.useCallback(async () => {
		if (!user.wishlist?.length) {
			setLoading(false);
			return;
		}

		try {
			setError(false);
			setLoading(true);
			const req = await productsService.selectProducts(user.wishlist);
			setSaveList(req.data);
		} catch (error) {
			console.log(error);
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [user.wishlist]);

	React.useEffect(() => {
		fetchProducts();
	}, [user.wishlist]);

	return (
		<div>
			<RenderIf isTrue={loading}>
				<div className="text-center flex flex-col justify-center items-center">
					<h6 className="mb-2">Fetching Products</h6>
					<Spinner className="text-lg" />
				</div>
			</RenderIf>
			<RenderIf isTrue={error}>
				<div>
					<span className="mr-2">
						There was an error fetching your save list
					</span>
					<button
						className="btn btn-sm btn-dark mt-2"
						onClick={fetchProducts}
					>
						Try Again
					</button>
				</div>
			</RenderIf>
			<RenderIf isTrue={!error && !loading && savelist.length}>
				<div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3`}>
					{savelist.map((item, index) => (
						<ProductCard
							data={item}
							key={index}
							showDescription={false}
						/>
					))}
				</div>
			</RenderIf>
			<RenderIf isTrue={!error && !loading && !savelist.length}>
				<div className="flex flex-col justify-center items-center">
					<span className="mb-8 mt-3">
						<img
							src={'/images/BecomeAnAuthorImg.png'}
							alt={'Person using the platform'}
							className={'w-56 mx-auto'}
						/>
					</span>

					<span className="font-bold">
						Start adding new products in your savelist
					</span>
					<span>
						<Link
							href={'/'}
							className="btn btn-sm btn-primary mt-2 w-auto"
							onClick={fetchProducts}
						>
							Search Products
						</Link>
					</span>
				</div>
			</RenderIf>
		</div>
	);
};

export default ListSaveList;
