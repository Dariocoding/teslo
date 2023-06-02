import { axiosClient } from '../../config/axios';
import { UploadImageParams, UploadImageResponse } from './interfaces';

export const filesService = {
	uploadFileProduct: (file: FormData) =>
		axiosClient.post<UploadImageResponse>('/files/product', file, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		}),

	uploadImageEnterprise: (params: UploadImageParams, file: FormData) =>
		axiosClient.post(`/files/logo_enterprise/${params.mode}/${params.type}`, file),
};

export default filesService;
