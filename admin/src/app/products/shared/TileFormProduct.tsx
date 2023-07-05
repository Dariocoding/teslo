import { TablePlaceholder } from "@/components/placeholders";
import { translate } from "@/i18n";
import { validPaths } from "@/utils";
import { Brand, Category } from "@teslo/interfaces";
import RenderIf from "@teslo/react-ui/RenderIf";
import * as React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface ITileFormProductProps {
	isLoading: boolean;
	categories: Category[];
	brands: Brand[];
	children?: React.ReactNode;
	errorProviders: any;
	errorCategories: any;
	errorBrands: any;
	refetch: () => void;
}

const TileFormProduct: React.FunctionComponent<ITileFormProductProps> = props => {
	const { isLoading, categories, brands, errorBrands, errorCategories, errorProviders, refetch } =
		props;

	const { formatMessage: t } = useIntl();

	if ((errorBrands || errorCategories || errorProviders) && !isLoading) {
		return (
			<div className="tile">
				<img src="/img/others/error.png" alt="Error" className="w-40 mx-auto mb-4" />
				<h6 className="text-center font-normal">
					There was an error fetching your product
				</h6>
				<div className="mt-4 flex items-center flex-col justify-center">
					<Link
						to={validPaths.products.path}
						className="btn btn-primary btn-sm w-auto mx-auto"
					>
						{t({ id: "products.title" })}
					</Link>
					<button type="button" onClick={refetch} className="btn btn-success btn-sm px-6">
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="tile">
			<RenderIf isTrue={isLoading}>
				<TablePlaceholder />
			</RenderIf>
			<RenderIf isTrue={!isLoading}>
				<RenderIf isTrue={!categories.length}>
					<h6 className="text-center font-normal">
						Categories Empty, try adding categories
					</h6>
					<div className="mt-4 flex items-center justify-center">
						<Link
							to={validPaths.categories.path}
							className="btn btn-primary btn-sm w-auto mx-auto"
						>
							{t({ id: "categories.title" })}
						</Link>
					</div>
				</RenderIf>
				<RenderIf isTrue={categories.length}>
					<RenderIf isTrue={!brands.length}>
						<h6 className="text-center font-normal">
							Brands Empty, try adding categories
						</h6>
						<div className="mt-4 flex items-center justify-center">
							<Link
								to={validPaths.brands.path}
								className="btn btn-primary btn-sm w-auto mx-auto"
							>
								{t({ id: "brands.title" })}
							</Link>
						</div>
					</RenderIf>
					<RenderIf isTrue={brands.length}>{props.children}</RenderIf>
				</RenderIf>
			</RenderIf>
		</div>
	);
};

export default TileFormProduct;
