import useFirstLoad from "@/utils/hooks/useFirstLoad";
import { Product, Size } from "@teslo/interfaces";
import React from "react";
import { Option } from "react-tailwindcss-select/dist/components/type";
import { IButtonsTableProductProps } from ".";
import { FiltersAllProductDto, productsService } from "@teslo/services";

interface UseButtonTableProps extends IButtonsTableProductProps {}

function shuffleArray(array: any[]) {
	const arrayCopy = [...array];
	for (var i = arrayCopy.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = arrayCopy[i];
		arrayCopy[i] = arrayCopy[j];
		arrayCopy[j] = temp;
	}

	return arrayCopy;
}

export const useButtonTable = (props: UseButtonTableProps) => {
	const { categories, providers, brands, setIsLoadingTable, setProducts, refetch } = props;
	const firstLoad = useFirstLoad();
	const [categorySelected, setCategorySelected] = React.useState<string>();
	const [providerSelected, setProviderSelected] = React.useState<string>();
	const [brandSelected, setBrandSelected] = React.useState<string>();
	const [currentSize, setCurrentSize] = React.useState<Size>(null);

	const category = categories?.find(c => c.idcategory === categorySelected);
	const provider = providers?.find(p => p.idprovider === providerSelected);
	const brand = brands?.find(p => p.idbrand === brandSelected);
	const onChangeCategorySelect = (option: Option) => setCategorySelected(option?.value);
	const onChangeProviderSelect = (option: Option) => setProviderSelected(option?.value);
	const onChangeBrandSelect = (option: Option) => setBrandSelected(option?.value);
	const orderProductsByCurrentSize = React.useCallback(
		(products: Product[], size?: Size) => {
			const orderProducts = products
				.sort(
					(a: Product, b: Product) =>
						Number(Boolean(a.sizes?.find(s => s === size || currentSize))) -
						Number(Boolean(b.sizes?.find(s => s === size || currentSize)))
				)
				.reverse();
			return [...orderProducts];
		},
		[currentSize]
	);

	const onChangeCurrentSize = (option: Option) => {
		const size = option?.value as Size;
		setCurrentSize(size);
		if (size) {
			setProducts(products => orderProductsByCurrentSize(products, size));
		} else {
			setProducts(products => shuffleArray(products));
		}
	};

	const fetchProductsByCategory = React.useCallback(
		async function fetchData() {
			try {
				setIsLoadingTable(true);
				let newProducts: Product[];
				if (!categorySelected && !providerSelected && !brandSelected) {
					const products = await productsService.getAllProducts();
					if (currentSize) {
						newProducts = orderProductsByCurrentSize(products.data);
					} else {
						newProducts = products.data;
					}
				} else {
					const filters: FiltersAllProductDto = {
						...(providerSelected ? { providerID: providerSelected } : {}),
						...(categorySelected ? { categoryID: categorySelected } : {}),
						...(brandSelected ? { brandID: brandSelected } : {}),
					};
					const products = await productsService.getAllByFilters(filters);
					if (currentSize) {
						newProducts = orderProductsByCurrentSize(products.data);
					} else {
						newProducts = products.data;
					}
				}
				setProducts(newProducts);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoadingTable(false);
			}
		},
		[categorySelected, providerSelected, brandSelected, currentSize]
	);

	React.useEffect(() => {
		if (firstLoad) return;
		fetchProductsByCategory();
	}, [categorySelected, providerSelected, brandSelected]);

	const refetchData = () =>
		categorySelected || providerSelected || brandSelected
			? fetchProductsByCategory()
			: refetch?.();

	return {
		refetchData,
		category,
		provider,
		brand,
		onChangeCategorySelect,
		onChangeBrandSelect,
		onChangeProviderSelect,
		currentSize,
		setCurrentSize,
		onChangeCurrentSize,
	};
};
