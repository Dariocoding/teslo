import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import { Provider, ProviderDto } from '@teslo/interfaces';
import { providersService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { toast } from 'react-hot-toast';

interface IFormProviderProps {
	provider?: Provider;
	onSuccess?(data: Provider): void;
}

const FormProvider: React.FunctionComponent<IFormProviderProps> = props => {
	const { provider: providerToUpdate, onSuccess } = props;
	const status = providerToUpdate ? 'update' : 'create';

	const onSubmit = async (values: ProviderDto) => {
		try {
			let req: AxiosResponse<Provider>;
			if (status === 'create') {
				req = await providersService.create(values);
				toast.success('Provider created successfully');
			} else if (status === 'update') {
				req = await providersService.update(
					providerToUpdate?.idprovider,
					values
				);
				toast.success('Provider updated successfully');
			}
			onSuccess?.(req.data);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const INITIAL_VALUES: Required<ProviderDto> = {
		name: providerToUpdate?.name || '',
		phone1: providerToUpdate?.phone1 || '',
		phone2: providerToUpdate?.phone2 || '',
		email: providerToUpdate?.email || '',
	};

	return (
		<Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
			<Form>
				<InputFormik
					placeholder="Type the name of the provider"
					name="name"
					label={'Name'}
				/>

				<InputFormik
					placeholder="Type the phone 1 of the provider"
					name="phone1"
					label={'Phone'}
				/>

				<InputFormik
					placeholder="Type the phone 2 of the provider"
					name="phone2"
					label={'Phone'}
				/>

				<InputFormik
					placeholder="Type the e-mail of the provider"
					name="email"
					label={'Email'}
				/>

				<ButtonFormik full className="mb-0 btn-primary btn-sm">
					Save changes
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormProvider;
