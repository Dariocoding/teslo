import ButtonFormik from '@/components/@forms/ButtonFormik';
import InputFormik from '@/components/@forms/InputFormik';
import TextareaFormik from '@/components/@forms/TextareaFormik';
import { useConfigEnterpriseStore } from '@/store';
import { ConfigEnterpriseDto } from '@teslo/interfaces';
import { configEnterpriseService } from '@teslo/services';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { toast } from 'react-hot-toast';

interface IEnterpriseFormProps {}

const EnterpriseForm: React.FunctionComponent<IEnterpriseFormProps> = props => {
	const {} = props;
	const { configEnterprise, setConfigEnterprise } = useConfigEnterpriseStore();
	const onSubmit = async (
		values: ConfigEnterpriseDto,
		actions: FormikHelpers<ConfigEnterpriseDto>
	) => {
		try {
			const req = await configEnterpriseService.update(values);
			toast.success('Enterprise data updated');
			setConfigEnterprise(req.data);
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const INITIAL_VALUES: ConfigEnterpriseDto = { ...configEnterprise };

	return (
		<Formik initialValues={INITIAL_VALUES} enableReinitialize onSubmit={onSubmit}>
			<Form>
				<InputFormik
					name="name"
					label={'Name'}
					placeholder="Name enterprise"
				/>

				<InputFormik
					name="email"
					label={'E-mail'}
					placeholder="E-mail enterprise"
				/>

				<InputFormik
					name="phone"
					label={'Phone'}
					placeholder="Phone enterprise"
				/>

				<InputFormik
					type="number"
					name="iva"
					label={'I.V.A'}
					placeholder="IVA enterprise"
					decimalValues={false}
				/>

				<TextareaFormik
					label={'Address'}
					name="address"
					placeholder="Address enterprise"
				/>

				<ButtonFormik className="btn-primary btn-sm mb-0" full>
					Update enterprise Data
				</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default EnterpriseForm;
