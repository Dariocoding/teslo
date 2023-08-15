import * as React from "react";
import InfoDataTile from "./InfoDataTile";
import { translate } from "@/i18n";
import { actionsProducts } from "./utils";
import { useConfigApp } from "@/store";
import { Product } from "@teslo/interfaces";
import { AiOutlineBarcode } from "react-icons/ai";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { productsService } from "@teslo/services";

interface IExportsProductsProps {}

const ModalBarCodes = React.lazy(() => import("@/app/products/shared/ModalBarCodes"));

const ExportsProducts: React.FunctionComponent<IExportsProductsProps> = props => {
	const {} = props;
	const [showModalBarCodes, setShowModalBarCodes] = React.useState(false);
	const [products, setProducts] = React.useState<Product[]>([]);
	const { colors } = useConfigApp();
	const { enableClothesShopping } = colors;

	const handleExportBarCodes = async () => {
		try {
			showLoader();
			const req = await productsService.getAllProducts();
			setProducts(req.data);
			setShowModalBarCodes(true);
		} catch (error) {
			console.log(error);
			setProducts([]);
			setShowModalBarCodes(false);
		} finally {
			hideLoader();
		}
	};

	return (
		<div>
			<InfoDataTile
				title={translate("products.title")}
				{...{
					...actionsProducts,
					onClickExcel: () => actionsProducts.onClickExcel(enableClothesShopping),
					onClickCsv: () => actionsProducts.onClickCsv(enableClothesShopping),
				}}
			/>

			<div>
				<button
					type="button"
					className="btn bg-orange-500 hover:bg-orange-600 text-white w-full btn-sm gap-2"
					onClick={handleExportBarCodes}
				>
					Export Bar Codes <AiOutlineBarcode />
				</button>
			</div>

			<React.Suspense fallback={<></>}>
				<ModalBarCodes
					showModal={showModalBarCodes}
					onClose={() => setShowModalBarCodes(false)}
					products={products}
				/>
			</React.Suspense>
		</div>
	);
};

export default ExportsProducts;
