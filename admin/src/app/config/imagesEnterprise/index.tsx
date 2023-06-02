import HeaderDashboard from '@/layouts/HeaderDashboardLayout';
import { validPaths } from '@/utils';
import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import { IoMdImages } from 'react-icons/io';
import ImagesUpload from './ImagesUpload';
import ButtonFormik from '@/components/@forms/ButtonFormik';
import { filesService } from '@teslo/services';
import { AxiosResponse } from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface IImagesEnterprisePageProps {}

export type ValueLogo = {
	type: 'full' | 'streamline';
	mode: 'light' | 'dark';
	file: File | null;
};

export interface UploadImagesValues {
	logoLightStreamline: ValueLogo;
	logoLightFull: ValueLogo;
	logoDarkStreamline: ValueLogo;
	logoDarkFull: ValueLogo;
}

const INITIAL_VALUES: UploadImagesValues = {
	logoLightStreamline: { type: 'streamline', mode: 'light', file: null },
	logoLightFull: { type: 'full', mode: 'light', file: null },
	logoDarkStreamline: { type: 'streamline', mode: 'dark', file: null },
	logoDarkFull: { type: 'full', mode: 'dark', file: null },
};

const ImagesEnterprisePage: React.FunctionComponent<IImagesEnterprisePageProps> = props => {
	const {} = props;

	const onSubmit = async (
		values: UploadImagesValues,
		actions: FormikHelpers<UploadImagesValues>
	) => {
		let arrValues = Object.values(values) as ValueLogo[];
		arrValues = arrValues.filter(value => value.file);
		if (!arrValues.length) return actions.setSubmitting(false);
		confirmAlert({
			title: 'Confirm to submit',
			message: 'Are you sure to do this.',
			buttons: [
				{
					label: 'Yes',
					onClick: async () => {
						const promises: Promise<AxiosResponse>[] =
							await new Promise((resolve, reject) => {
								const arrPromises = arrValues.map(
									async value => {
										const formData =
											new FormData();
										formData.append(
											'file',
											value.file as Blob
										);
										const res =
											await filesService.uploadImageEnterprise(
												{
													type: value.type,
													mode: value.mode,
												},
												formData
											);
										return res;
									}
								);
								resolve(arrPromises);
							});
						const responses = await Promise.all(promises);
						console.log(responses);
						actions.setSubmitting(false);
						window.location.reload();
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		});
	};

	return (
		<HeaderDashboard
			title={'Images'}
			breadcrumbs={[
				{ label: 'Dashboard', to: validPaths.home.path },
				{ label: 'Options', to: validPaths.settings.path },
				{ label: 'Images' },
			]}
			to={validPaths.settings.path}
			icon={<IoMdImages />}
		>
			<Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
				<Form>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4">
						<ImagesUpload />
					</div>
					<div className="w-full">
						<ButtonFormik full className="btn-primary btn-sm">
							Update
						</ButtonFormik>
					</div>
				</Form>
			</Formik>
		</HeaderDashboard>
	);
};

export default ImagesEnterprisePage;
