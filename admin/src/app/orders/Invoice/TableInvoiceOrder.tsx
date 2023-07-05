import { translate } from "@/i18n";
import { useConfigEnterpriseStore } from "@/store";
import { PF, formatter } from "@/utils";
import { DetailOrder, Order, Product } from "@teslo/interfaces";
import * as React from "react";

interface ITableInvoiceOrderProps {
	order: Order;
}

const TableInvoiceOrder: React.FunctionComponent<ITableInvoiceOrderProps> = props => {
	const { order } = props;
	const IVA = (((order.subtotal || 0) * (order.iva || 0)) / 100).toFixed(2);

	return (
		<div className="table-responsive my-6 shadow">
			<table className="table">
				<thead>
					<tr>
						<th className="text-dark">{translate("products.single")}</th>
						<th className="text-center text-dark">
							{translate("products.label.price")}
						</th>
						<th className="text-center text-dark">{translate("orders.label.qty")}</th>
						<th className="text-center text-dark">{translate("orders.label.total")}</th>
					</tr>
				</thead>
				<tbody>
					{order.detail.map((item, idx) => (
						<TrOrder item={item} key={idx} />
					))}
				</tbody>
				<tfoot className="text-sm">
					<tr>
						<td colSpan={3} className="text-right font-bold pl-2 pr-4 py-3">
							{translate("orders.label.subtotal")}:
						</td>
						<td className="px-2 py-3 text-center">
							{formatter.format(order.subtotal || 0)}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="text-right font-bold pl-2 pr-4 py-3">
							I.V.A ({order.iva}%):
						</td>
						<td className="px-2 py-3 text-center">
							{formatter.format(parseFloat(IVA))}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="text-right font-bold pl-2 pr-4 py-3">
							{translate("orders.label.total")}:
						</td>
						<td className="px-2 py-3 text-center">{formatter.format(order.total)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default TableInvoiceOrder;

interface ITrOrderProps {
	item: DetailOrder;
}

const TrOrder = (props: ITrOrderProps) => {
	const { item } = props;
	return (
		<tr>
			<td>
				<div className="flex items-center">
					<span>
						<img
							src={getImageProduct(item.product)}
							alt={""}
							width={40}
							className={"mr-2"}
						/>
					</span>
					{item.title}{" "}
					{item.size ? <span className="text-xs ml-2">({item.size})</span> : null}
				</div>
			</td>
			<td className="text-center">{formatter.format(item.total)}</td>
			<td className="text-center">{item.quantity}</td>
			<td className="text-center">{formatter.format(item.total * item.quantity)}</td>
		</tr>
	);
};

const getImageProduct = (product: Product) => {
	const image = product?.images?.length ? product.images[0] : null;
	if (!image) return null;
	return image ? PF + `/product/${image}` : "/img/others/box.png";
};
