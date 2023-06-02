import * as React from 'react';
import Select from 'react-tailwindcss-select';
import { Option } from 'react-tailwindcss-select/dist/components/type';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import { Brand, Category, Product, Provider } from '@teslo/interfaces';
import { FiltersAllProductDto, productsService } from '@teslo/services';
import RenderIf from '@teslo/react-ui/RenderIf';
import useFirstLoad from '@/utils/hooks/useFirstLoad';
import classNames from 'classnames';

interface IButtonsTableProductProps {
	onCreateProduct: () => void;
	refetch: () => void;
	categories: Category[];
	providers: Provider[];
	loadingProviders: boolean;
	loadingCategories: boolean;
	setProducts: (products: Product[]) => void;
	setIsLoadingTable: (value: boolean) => void;
	brands: Brand[];
	loadingBrands: boolean;
	showSelects?: boolean;
}

const ButtonsTableProduct: React.FunctionComponent<IButtonsTableProductProps> = props => {
	const {
		categories,
		providers,
		loadingCategories,
		loadingProviders,
		onCreateProduct,
		refetch,
		setProducts,
		setIsLoadingTable,
		brands,
		loadingBrands,
		showSelects = true,
	} = props;
	const firstLoad = useFirstLoad();
	const [categorySelected, setCategorySelected] = React.useState<string>();
	const [providerSelected, setProviderSelected] = React.useState<string>();
	const [brandSelected, setBrandSelected] = React.useState<string>();

	const category = categories?.find(c => c.idcategory === categorySelected);
	const provider = providers?.find(p => p.idprovider === providerSelected);
	const brand = brands?.find(p => p.idbrand === brandSelected);
	const onChangeCategorySelect = (option: Option) => setCategorySelected(option?.value);
	const onChangeProviderSelect = (option: Option) => setProviderSelected(option?.value);
	const onChangeBrandSelect = (option: Option) => setBrandSelected(option?.value);

	const fetchProductsByCategory = React.useCallback(
		async function fetchData() {
			try {
				setIsLoadingTable(true);
				let newProducts: Product[];
				if (!categorySelected && !providerSelected && !brandSelected) {
					const products = await productsService.getAllProducts();
					newProducts = products.data;
				} else {
					const filters: FiltersAllProductDto = {
						...(providerSelected
							? { providerID: providerSelected }
							: {}),
						...(categorySelected
							? { categoryID: categorySelected }
							: {}),
						...(brandSelected
							? { brandID: brandSelected }
							: {}),
					};
					const products = await productsService.getAllByFilters(
						filters
					);
					newProducts = products.data;
				}
				setProducts(newProducts);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoadingTable(false);
			}
		},
		[categorySelected, providerSelected, brandSelected]
	);

	React.useEffect(() => {
		if (firstLoad) return;
		fetchProductsByCategory();
	}, [categorySelected, providerSelected, brandSelected]);

	const refetchData = () =>
		categorySelected || providerSelected || brandSelected
			? fetchProductsByCategory()
			: refetch?.();

	return (
		<div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col sm:mb-0 mb-2">
			<div
				className={classNames(
					'flex items-end justify-start h-max sm:mb-0 mb-2',
					showSelects && 'sm:h-[50px]'
				)}
			>
				<button
					className="btn btn-primary mb-0 btn-xs"
					onClick={onCreateProduct}
				>
					<FaPlus />
				</button>
				<button
					className="btn btn-outline-alternative mb-0 btn-xs"
					onClick={refetchData}
				>
					<AiOutlineReload />
				</button>
			</div>
			<RenderIf isTrue={showSelects}>
				<div className="flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4">
					<div className="w-full sm:max-w-[225px]">
						<label
							htmlFor="category-select-products"
							className="text-xs w-full text-start mb-1 font-semibold block"
						>
							Category
						</label>
						<div>
							<Select
								isClearable={Boolean(
									categorySelected
								)}
								onChange={onChangeCategorySelect}
								options={categories?.map(c => ({
									label: c.title,
									value: c.idcategory,
								}))}
								primaryColor={''}
								value={
									category && {
										value: category?.idcategory,
										label: category?.title,
									}
								}
								onSearchInputChange={() => null}
								loading={loadingCategories}
								placeholder="Select any category"
								noOptionsMessage="Select any category"
							/>
						</div>
					</div>

					<div className="w-full sm:max-w-[225px]">
						<label
							htmlFor="category-select-products"
							className="text-xs w-full text-start mb-1 font-semibold block"
						>
							Provider
						</label>
						<div>
							<Select
								isClearable={Boolean(
									providerSelected
								)}
								onChange={onChangeProviderSelect}
								options={providers?.map(c => ({
									label: c.name,
									value: c.idprovider,
								}))}
								primaryColor={''}
								value={
									provider && {
										value: provider?.idprovider,
										label: provider?.name,
									}
								}
								onSearchInputChange={() => null}
								loading={loadingProviders}
								placeholder="Select any provider"
								noOptionsMessage="Select any provider"
							/>
						</div>
					</div>
					<div className="w-full sm:max-w-[225px]">
						<label
							htmlFor="category-select-products"
							className="text-xs w-full text-start mb-1 font-semibold block"
						>
							Brand
						</label>
						<div>
							<Select
								isClearable={Boolean(brandSelected)}
								onChange={onChangeBrandSelect}
								options={brands?.map(b => ({
									label: b.title,
									value: b.idbrand,
								}))}
								primaryColor={''}
								value={
									brand && {
										value: brand?.idbrand,
										label: brand?.title,
									}
								}
								onSearchInputChange={() => null}
								loading={loadingBrands}
								placeholder="Select any brand"
								noOptionsMessage="Select any brand"
							/>
						</div>
					</div>
				</div>
			</RenderIf>
		</div>
	);
};

export default ButtonsTableProduct;
