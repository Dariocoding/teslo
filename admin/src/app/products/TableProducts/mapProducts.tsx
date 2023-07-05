import { capitalize, formatter, PF } from "@/utils";
import { Gender, Product } from "@teslo/interfaces";
import dayjs from "dayjs";
import { ProductTable } from "../config";
import ActionsProducts, { IActionsProductsProps } from "./ActionsProducts";
import RenderIf from "@teslo/react-ui/RenderIf";
import Checkbox from "@teslo/react-ui/Checkbox";

interface IMapProductsProps extends Omit<IActionsProductsProps, "product"> {
	products: Product[];
	onDeleteProduct: (product: Product) => void;
	onUpdateProduct: (product: Product) => void;
	currentItemsSelected: string[];
	setCurrentItemsSelected: (items: string[]) => void;
}

const mapProducts = (props: IMapProductsProps): ProductTable[] => {
	const { products, currentItemsSelected, setCurrentItemsSelected } = props;
	const imageProduct = (product: Product) =>
		product.images.length
			? PF + "/product/" + product.images[product.images.length - 1]
			: "/img/others/box.png";

	return products.map(product => ({
		...product,
		checkSelected: (
			<div className="flex items-center justify-center">
				<Checkbox
					isChecked={currentItemsSelected.includes(product.id)}
					onChange={() =>
						currentItemsSelected.includes(product.id)
							? setCurrentItemsSelected(
									currentItemsSelected.filter(item => item !== product.id)
							  )
							: setCurrentItemsSelected([...currentItemsSelected, product.id])
					}
					enableMarginRight={false}
				/>
			</div>
		),
		priceFormatted: formatter.format(product.price),
		sizesFormatted: product.sizes.join(", "),
		image: (
			<img
				src={imageProduct(product)}
				className={"w-14 rounded-md mx-auto"}
				loading={"lazy"}
			/>
		),
		dateFormatted: dayjs(product.dateCreated).format("DD/MM/YYYY"),
		gender: capitalize(product.gender) as Gender,
		actions: <ActionsProducts {...props} product={product} />,
		categoriesFormatted: product.categories?.length ? (
			<ul className="text-xs">
				{product.categories.map(c => (
					<li key={c.idcategory}>{c.title}</li>
				))}
			</ul>
		) : null,
		providersFormatted: product.providers?.length ? (
			<ul className="text-xs">
				{product.providers.map(p => (
					<li key={p.idprovider}>{p.name}</li>
				))}
			</ul>
		) : null,
		titleFormatted: (
			<div className="flex flex-col max-w-[110px] whitespace-pre-wrap">
				<div className="text-sm mb-1">{product.title}</div>
				<RenderIf isTrue={product.customCode}>
					<div className="text-xs font-bold mb-1">{product.customCode}</div>
				</RenderIf>
				<div className="text-xs">{product.code}</div>
			</div>
		),
	}));
};

export default mapProducts;
