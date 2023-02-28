import LikeButton from '@/shared/ProductCard/LikeButton';
import ProductStatus from '@/shared/ProductCard/ProductStatus';
import { RouteProps } from '@/shared/types';
import { PF } from '@/utils';
import { Product } from '@teslo/interfaces';
import RenderIf from '@teslo/react-ui/RenderIf';
import { productsService } from '@teslo/services';
import { notFound } from 'next/navigation';
import * as React from 'react';
import SectionContent from './components/SectionContent';

interface IProductPageProps extends RouteProps {}

async function fetchProduct(slug: string): Promise<Product> {
	try {
		const { data } = await productsService.getProduct(slug);
		return data;
	} catch (error) {
		return null;
	}
}

const ProductPage = async (props: IProductPageProps) => {
	const { params } = props;
	const product = await fetchProduct(params.slug);
	if (!product) {
		notFound();
	}

	const { images } = product;
	return (
		<div className="mt-5 lg:mt-11 container" suppressHydrationWarning>
			<div className="lg:flex">
				<div className="w-full lg:w-[55%] ">
					<div className="relative">
						<div className="aspect-w-16 aspect-h-16">
							<img
								src={PF.product(images[0])}
								className="w-full rounded-2xl object-cover"
								alt="product detail 1"
							/>
						</div>
						<ProductStatus status="New in" />
						<LikeButton className="absolute right-3 top-3 " />
					</div>
					<RenderIf isTrue={images[1]}>
						<div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
							{[images[1], images[2]].map(
								(item, index) => {
									if (!item) return null;
									return (
										<div
											key={index}
											className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16"
										>
											<img
												src={PF.product(
													item
												)}
												className="w-full rounded-2xl object-cover"
												alt="product detail 1"
											/>
										</div>
									);
								}
							)}
						</div>
					</RenderIf>
				</div>
				<div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
					<SectionContent product={product} />
				</div>{' '}
				*
			</div>
		</div>
	);
};

export default ProductPage;
