import { axiosClient } from '../../config/axios';
import { UploadImageResponse } from './interfaces';

export const filesService = {
	uploadFileProduct: (file: FormData) =>
		axiosClient.post<UploadImageResponse>('/files/product', file, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		}),
};

export default filesService;
