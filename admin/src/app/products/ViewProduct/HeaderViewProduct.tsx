import RenderIf from '@teslo/react-ui/RenderIf';
import { PF } from '@/utils';
import { Product } from '@teslo/interfaces';
import dayjs from 'dayjs';
import * as React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

interface IHeaderViewProductProps {
	product: Product;
	onUpdateProduct: () => void;
	onDeleteProduct: () => void;
}

const HeaderViewProduct: React.FunctionComponent<IHeaderViewProductProps> = props => {
	const { product, onDeleteProduct, onUpdateProduct } = props;

	return (
		<div className="grid lg:grid-cols-12 lg:gap-8 gap-4">
			<div className="lg:col-span-4">
				<div className="tile">
					<div className="flex items-center justify-center mb-4">
						<img
							src={
								product.images?.length
									? PF +
									  '/product/' +
									  product.images[0]
									: '/img/others/box.png'
							}
							className={'w-36'}
							alt=""
						/>
					</div>
					<h6 className="text-center mb-1.5">{product.title}</h6>
					<div className="flex flex-col justify-end items-end h-full">
						<button
							onClick={onUpdateProduct}
							className="mx-auto w-full btn btn-primary btn-sm"
						>
							Update Product <FaPen className="ml-2" />
						</button>

						<button
							className="mx-auto w-full btn btn-danger btn-sm"
							onClick={onDeleteProduct}
						>
							Delete Product <FaTrash className="ml-2" />
						</button>
					</div>
				</div>
			</div>
			<div className="tile lg:col-span-8">
				<h4 className="mb-6">{product.title}</h4>
				<div className="text-sm space-y-3">
					<p>
						<span className="font-bold">ID:</span> {product.id}
					</p>

					<p>
						<span className="font-bold">Date Created:</span>{' '}
						{dayjs(product.dateCreated).format(
							'DD/MM/YYYY HH:mm:ss'
						)}
					</p>

					<p>
						<span className="font-bold">Slug:</span>{' '}
						{product.slug}
					</p>

					<p>
						<span className="font-bold">Sizes:</span>{' '}
						{product.sizes?.join(', ')}
					</p>

					<RenderIf isTrue={product.description}>
						<p>
							<h6 className="font-bold block w-full text-center mb-2">
								Description:
							</h6>{' '}
							{product.description}
						</p>
					</RenderIf>

					<RenderIf isTrue={product.images?.length}>
						<h5 className="text-center mb-2">Images</h5>
						<div className="flex flex-wrap">
							{product.images?.map(image => (
								<span key={image} className={'m-2'}>
									<img
										src={
											PF +
											`/product/${image}`
										}
										alt={product.title}
										className={
											'w-56 mx-auto'
										}
									/>
								</span>
							))}
						</div>
					</RenderIf>
				</div>
			</div>
		</div>
	);
};

export default HeaderViewProduct;
