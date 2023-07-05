import RenderIf from "@teslo/react-ui/RenderIf";
import { PF, formatter, validPaths } from "@/utils";
import { Product } from "@teslo/interfaces";
import dayjs from "dayjs";
import * as React from "react";
import { FaCopy, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { translate } from "@/i18n";
import { Lightbox } from "react-modal-image";
import { IoMdFlash } from "react-icons/io";
import { useBarCodeProduct } from "../hooks/useBarCodeProduct";
import ToolTip from "@teslo/react-ui/Tooltip";
import { useIntl } from "react-intl";

interface IHeaderViewProductProps {
	product: Product;
	onOpenQuickModal: () => void;
	onDeleteProduct: () => void;
}

const HeaderViewProduct: React.FunctionComponent<IHeaderViewProductProps> = props => {
	const { product, onDeleteProduct, onOpenQuickModal } = props;
	const { formatMessage: t } = useIntl();
	const [imageLightBoxUrl, setImageLightBoxUrl] = React.useState<string>(null);
	const urlImageProduct = product.images?.length
		? PF + "/product/" + product.images[0]
		: "/img/others/box.png";

	const onClickContainerImages: React.MouseEventHandler<HTMLDivElement> = e => {
		const target = e.target as Element;

		if (target.tagName === "IMG") {
			const imgElement = target as HTMLImageElement;
			setImageLightBoxUrl(imgElement.src);
		}
	};

	const { srcJsBarCode, copyImageJsBarCode, copied } = useBarCodeProduct(product);

	return (
		<div className="grid lg:grid-cols-12 lg:gap-8 gap-4">
			<div className="lg:col-span-4">
				<div className="tile">
					<div className="flex items-center justify-center mb-4">
						<img src={urlImageProduct} className={"w-36"} alt="" />
					</div>
					<h6 className="text-center mb-1.5">{product.title}</h6>
					<div className="flex flex-col justify-end items-end h-full">
						<Link
							to={validPaths.editProduct.fnPath(product.id)}
							type="button"
							className="mx-auto w-full btn btn-primary btn-sm gap-2"
						>
							<FaPen className="ml-2" /> {translate("products.actions.edit")}
						</Link>
						<button
							type="button"
							className="mx-auto w-full btn bg-orange-500 hover:bg-orange-600 text-white btn-sm gap-2"
							onClick={onOpenQuickModal}
						>
							<IoMdFlash className="ml-2 text-lg" />{" "}
							{translate("products.actions.quickEdit")}
						</button>

						<button
							type="button"
							className="mx-auto w-full btn btn-danger btn-sm gap-2"
							onClick={onDeleteProduct}
						>
							<FaTrash className="ml-2 text-lg" />{" "}
							{translate("products.actions.delete")}
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
						<span className="font-bold">
							{translate("products.label.dateCreated")}:
						</span>{" "}
						{dayjs(product.dateCreated).format("DD/MM/YYYY HH:mm:ss")}
					</p>

					<p>
						<span className="font-bold">Slug:</span> {product.slug}
					</p>

					<p>
						<span className="font-bold">Price:</span> {formatter.format(product.price)}
					</p>

					<p>
						<span className="font-bold">Stock:</span> {product.stock}
					</p>

					<p>
						<span className="font-bold">{translate("products.label.sizes")}:</span>{" "}
						{product.sizes?.join(", ")}
					</p>

					<RenderIf isTrue={product.status}>
						<p>
							<span className="font-bold">{translate("products.label.status")}:</span>{" "}
							{product.status}
						</p>
					</RenderIf>

					<RenderIf isTrue={product.description}>
						<p>
							<span className="font-bold block w-full text-center mb-2">
								{translate("products.label.description")}:
							</span>{" "}
							{product.description}
						</p>
					</RenderIf>

					<RenderIf isTrue={product.images?.length}>
						<h5 className="text-center mb-2">{translate("products.label.images")}</h5>
						<div className="flex flex-wrap" onClick={onClickContainerImages}>
							{product.images?.map(Images)}
						</div>
					</RenderIf>
				</div>

				<div className="flex items-center flex-col justify-start">
					<h6 className="text-lg font-semibold">{translate("products.label.barCode")}</h6>
					<img src={srcJsBarCode} alt={`Product: ${product.title} Code bar`} />
					<div>
						<ToolTip
							className="btn btn-info btn-sm cursor-pointer"
							onClick={copyImageJsBarCode}
							message={
								copied
									? `${t({ id: "app.copied" })} 🙌`
									: t({ id: "app.clickToCopy" })
							}
						>
							<span className="flex items-center gap-2">
								{t({ id: "app.copy" })} <FaCopy />
							</span>
						</ToolTip>
					</div>
				</div>
			</div>

			<RenderIf isTrue={imageLightBoxUrl}>
				<Lightbox
					medium={imageLightBoxUrl}
					large={imageLightBoxUrl}
					small={imageLightBoxUrl}
					//@ts-ignore
					onClose={() => setImageLightBoxUrl(null)}
					alt={product.title}
				/>
			</RenderIf>
		</div>
	);
};

const Images = (image: string, idx: number) => (
	<span key={idx} className={"m-2 cursor-pointer"}>
		<img src={PF + `/product/${image}`} alt={""} className={"w-56 mx-auto"} />
	</span>
);

export default HeaderViewProduct;
