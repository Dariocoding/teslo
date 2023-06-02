import { PF, formatter } from '@/utils';
import { Bill, DetailBill } from '@teslo/interfaces';
import * as React from 'react';

interface ITableBillProductsProps {
	bill: Bill;
}

const TableBillProducts: React.FunctionComponent<ITableBillProductsProps> = props => {
	const { bill } = props;

	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th>Product</th>
						<th className="text-center">Quantity</th>
						<th className="text-center">Price</th>
						<th className="text-center">Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{bill.details?.map?.((item, index) => (
						<tr key={index}>
							<td>
								<div className="flex items-center">
									<div className="flex-shrink-0 items-center">
										<img
											className="h-10 w-10 rounded-full"
											src={
												PF +
												'/product/' +
												item
													.product
													?.images[0]
											}
											alt=""
										/>
									</div>
									<div className="ml-1">
										<div className="text-sm font-medium text-gray-900">
											{
												item
													.product
													?.title
											}
										</div>
									</div>
								</div>
							</td>
							<td className="text-center">{item.qty}</td>
							<td className="text-center">
								{formatter.format(item.price)}
							</td>
							<td className="text-center">
								{formatter.format(
									item.price * item.qty
								)}
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={3} className="text-right font-bold">
							Subtotal:
						</td>
						<td className="text-center">
							{formatter.format(bill.subtotal)}
						</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							I.V.A:
						</td>
						<td className="text-center">{bill.tax} %</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							Dlv. Price
						</td>
						<td className="text-center">
							{formatter.format(bill.delivery)}
						</td>
					</tr>

					<tr>
						<td colSpan={3} className="text-right font-bold">
							Total:
						</td>
						<td className="text-center">
							{formatter.format(bill.total)}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default TableBillProducts;
