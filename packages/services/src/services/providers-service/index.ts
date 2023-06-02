import { Provider, ProviderDto } from '@teslo/interfaces';
import { axiosClient } from '../../config';

export const providersService = {
	getAll: () => axiosClient.get<Provider[]>('/providers'),
	get: (term: string) => axiosClient.get<Provider>(`/providers/${term}`),
	create: (data: ProviderDto) => axiosClient.post<Provider>('/providers', data),
	update: (idprovider: string, data: ProviderDto) =>
		axiosClient.put<Provider>(`/providers/${idprovider}`, data),
	delete: (idprovider: string) => axiosClient.delete(`/providers/${idprovider}`),
};
