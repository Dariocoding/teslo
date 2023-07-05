import { DetailOrderTemp, DetailOrderTempDto } from "@teslo/interfaces";
import { axiosClient } from "../../config";
import { AxiosRequestConfig } from "axios";

export const detailTempOrdersService = {
	getAll: (config?: AxiosRequestConfig) =>
		axiosClient.get<DetailOrderTemp[]>("/detail-temp-orders", config),
	create: (dto: DetailOrderTempDto, config?: AxiosRequestConfig<DetailOrderTemp>) =>
		axiosClient.post<DetailOrderTemp>("/detail-temp-orders", dto, config),
	updateOne: (
		id: number | string,
		dto: Partial<DetailOrderTempDto>,
		config?: AxiosRequestConfig
	) => axiosClient.put<DetailOrderTemp>("/detail-temp-orders/" + id, dto, config),
	deleteAll: (config?: AxiosRequestConfig) => axiosClient.delete("/detail-temp-orders", config),
	deleteOne: (id: number | string, config?: AxiosRequestConfig) =>
		axiosClient.delete("/detail-temp-orders/" + id, config),
};
