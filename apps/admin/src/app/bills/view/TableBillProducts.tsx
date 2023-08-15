import { translate } from "@/i18n";
import { PF, formatter } from "@/utils";
import { Bill } from "@teslo/interfaces";
import * as React from "react";

interface ITableBillProductsProps {
	bill: Bill;
}

const TableBillProducts: React.FC<ITableBillProductsProps> = props => {
	const { bill } = props;
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>{translate("products.single")}</th>
						<th className="text-center">{translate("bills.label.qty")}</th>
						<th className="text-center">{translate("products.label.price")}</th>
						<th className="text-center">{translate("bills.label.subtotal")}</th>
					</tr>
				</thead>
				<tbody>
					{bill.details?.map?.((item, index) => (
						<tr key={index}>
							<td className="">
								<div className="flex items-center print:block print:max-w-[200px]">
									<div className="flex-shrink-0 items-center print:hidden">
										<img
											className="h-12 w-12 rounded-md"
											src={PF + "/product/" + item.product?.images[0]}
											alt=""
										/>
									</div>
									<div className="ml-1 print:ml-0">
										<div className="text-sm font-medium text-gray-900 print:whitespace-normal">
											{item.product?.title}
										</div>
									</div>
								</div>
							</td>
							<td className="text-center">{item.qty}</td>
							<td className="text-center">{formatter.format(item.price)}</td>
							<td className="text-center">
								{formatter.format(item.price * item.qty)}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3} className="text-right font-bold">
							{translate("bills.label.subtotal")}:
						</td>
						<td className="text-center">{formatter.format(bill.subtotal)}</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							I.V.A:
						</td>
						<td className="text-center">{bill.tax} %</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							{translate("bills.label.deliveryPrice")}
						</td>
						<td className="text-center">{formatter.format(bill.delivery)}</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							{translate("bills.label.total")}:
						</td>
						<td className="text-center">{formatter.format(bill.total)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default TableBillProducts;
