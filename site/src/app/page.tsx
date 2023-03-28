import { INITIAL_VALUES_PRODUCT_HOME } from '@/utils';
import { categoriesService, productsService } from '@teslo/services';
import React from 'react';
import DiscoverMoreSlider from './home/DiscoverMoreSlider';
import DontMissOutSpecialOffers from './home/DontMissOutSpecialOffers';
import SectionHero2 from './home/HomeHero2';
import SectionGridFeatureItems from './home/SectionGridFeatureItems';
import SectionHowItWork from './home/SectionHowItWorks';
import SectionSliderLargeProduct from './home/SectionSliderLargerProduct';
import SectionSliderProductCard from './home/SectionSliderProduct';

async function fetchProducts() {
	try {
		const products = await productsService.getProducts({
			limit: INITIAL_VALUES_PRODUCT_HOME,
			offset: 0,
		});
		return products.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function fetchCategories() {
	try {
		const categories = await categoriesService.getCategories();
		return categories.data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export default async function Home() {
	const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
	const productsSection = products.filter((_, idx) => idx <= 2);

	return (
		<React.Fragment>
			{/* <SectionHero1 className="mt-12 container" /> */}
			{/* <SectionHero3 className="min-h-[500px] container my-12" /> */}
			<SectionHero2 />

			<div className="mt-12 container">
				<DiscoverMoreSlider />
			</div>

			<div className="container relative space-y-8 my-12">
				<SectionSliderProductCard data={products} />

				<div className="py-16 border-t border-b border-slate-200 dark:border-slate-700">
					<SectionHowItWork />
				</div>

				<SectionSliderLargeProduct products={productsSection} />

				<DontMissOutSpecialOffers />

				<SectionGridFeatureItems data={products} categories={categories} />
			</div>
		</React.Fragment>
	);
}
