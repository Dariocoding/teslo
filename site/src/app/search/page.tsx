'use client';
import ProductCard from '@/shared/ProductCard';
import { Product } from '@teslo/interfaces';
import { Spinner } from '@teslo/react-ui';
import RenderIf from '@teslo/react-ui/RenderIf';
import { productsService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useSearch } from './hooks/useSearch';

const SearchPage: React.FunctionComponent = () => {
	const params = useSearchParams();
	const query = params.get('q') || '';
	const [data, setData] = React.useState<Product[]>([]);
	const [error, setError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const onSearch = React.useCallback(
		async (value: string) => {
			try {
				setError(false);
				setIsLoading(true);
				let req: AxiosResponse<Product[]>;
				if (!value) {
					req = await productsService.getAllProducts();
				} else {
					req = await productsService.search(value);
				}
				setData([...req.data]);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		},
		[query]
	);

	useSearch(query, onSearch);

	return (
		<div className="container relative space-y-8 my-12 py-6">
			<RenderIf isTrue={isLoading}>
				<img
					src={'/images/BecomeAnAuthorImg-2.png'}
					alt={'Loading image'}
					className={'w-48 mx-auto'}
				/>
				<div className="flex items-center justify-center space-y-4 flex-col">
					<h6>Loading Products</h6>
					<Spinner />
				</div>
			</RenderIf>
			<RenderIf isTrue={error}>
				<img
					src={'/images/error-persona.png'}
					alt={'Error Image'}
					className={'w-72 mx-auto'}
				/>
				<div className="flex items-center justify-center space-y-4 flex-col">
					<h6>
						There was an error fetching your products, please
						try again.
					</h6>
					<button
						className="btn btn-dark btn-sm"
						onClick={() => onSearch(query)}
					>
						Try Again
					</button>
				</div>
			</RenderIf>
			<RenderIf isTrue={!error && !isLoading && data.length}>
				<div
					className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
				>
					{data.map((item, index) => (
						<ProductCard data={item} key={index} />
					))}
				</div>
			</RenderIf>
			<RenderIf isTrue={!error && !isLoading && !data.length}>
				<img
					src={'/images/BecomeAnAuthorImg.png'}
					alt={'products not found'}
					className={'w-72 mx-auto'}
				/>
				<div className="flex items-center justify-center space-y-4 flex-col">
					<h6>
						We have not found any product in the search, please
						try again.
					</h6>
				</div>
			</RenderIf>
		</div>
	);
};

export default SearchPage;
