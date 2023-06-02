import { Bill, BillDto, UpdateBillDto } from '@teslo/interfaces';
import { axiosClient } from '../../config';
import { FindBillsByDateDto } from './interfaces';

export const billsService = {
	findBills: (findBillsByDateDto: FindBillsByDateDto) =>
		axiosClient.get<Bill[]>('bills', { params: findBillsByDateDto }),
	findBill: (id: string) => axiosClient.get<Bill>(`bills/${id}`),
	createBill: (bill: BillDto) => axiosClient.post<Bill>('bills', bill),
	updateBill: (id: string | number, bill: UpdateBillDto) =>
		axiosClient.put<Bill>(`bills/${id}`, bill),
	deleteBill: (id: string | number) => axiosClient.delete<Bill>(`bills/${id}`),
};

export * from './interfaces';
