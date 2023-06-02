import { Brand, BrandDto } from '@teslo/interfaces';
import { axiosClient } from '../../config';

export const brandsService = {
	getAll: () => axiosClient.get<Brand[]>('/brands'),
	getBrand: (term: string) => axiosClient.get<Brand>(`/brands/${term}`),
	create: (data: BrandDto) => axiosClient.post<Brand>('/brands', data),
	update: (idbrand: string, data: BrandDto) =>
		axiosClient.put<Brand>(`/brands/${idbrand}`, data),
	delete: (idbrand: string) => axiosClient.delete(`/brands/${idbrand}`),
};
