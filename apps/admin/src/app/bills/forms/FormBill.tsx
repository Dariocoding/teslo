import { Bill, BillDto, DetailBillDto, Provider, ValidStatusOrder } from "@teslo/interfaces";
import * as React from "react";
import EnterpriseInfo from "../shared/EnterpriseInfo";
import { Form, Formik } from "formik";
import SelectProviders from "./SelectProviders";
import ProductsBillForm from "./Products";
import { FaPlus } from "react-icons/fa";
import UploadImages from "./UploadImages";
import SelectStatusBillForm from "./SelectStatus";
import TotalsBillForm from "./Totals";
import * as yup from "yup";
import InputFormik from "@/components/@forms/InputFormik";
import TextareaFormik from "@/components/@forms/TextareaFormik";
import { useFormBill } from "./useFormBill";
import { translate } from "@/i18n";

export interface IFormBillProps {
	providers: Provider[];
	bill?: Bill;
}

const FormBill: React.FC<IFormBillProps> = props => {
	const { providers } = props;
	const { INITIAL_VALUES, refFormik, onClickAddProduct, onSubmit } = useFormBill(props);

	const validationSchema = yup.object({
		provider: yup.object().required("Provider is required"),
		status: yup.string().required("Status is required"),
	});

	return (
		<div className="tile p-0 mb-0">
			<div className="p-4 border-b border-gray-200">
				<EnterpriseInfo />
			</div>

			<div className="p-4">
				<Formik
					initialValues={INITIAL_VALUES}
					onSubmit={onSubmit}
					innerRef={refFormik}
					validationSchema={validationSchema}
					enableReinitialize
				>
					<Form>
						<div className="grid lg:grid-cols-12 gap-6">
							<div className="lg:col-span-3 lg:order-1 order-2">
								<div className="">
									<h6 className="text-lg font-semibold mb-1.5 inline-block">
										{translate("providers.single")}
									</h6>
									<div className="flex items-start justify-start">
										<div className="w-full">
											<SelectProviders providers={providers} />
										</div>
									</div>

									<div className="flex items-start justify-start flex-col">
										<div className="w-full">
											<SelectStatusBillForm />
										</div>

										<InputFormik
											name="reference"
											label={translate("bills.label.reference")}
											classNameInput={"form-control-sm"}
											placeholder={translate("bills.placeholder.reference")}
											className="w-full"
										/>

										<TextareaFormik
											name="description"
											placeholder={translate("bills.placeholder.description")}
											label={translate("bills.label.description")}
											rows={2}
											className="w-full"
										/>

										<InputFormik
											type="number"
											name="delivery"
											label={translate("bills.label.deliveryPrice")}
											classNameInput={"form-control-sm"}
											placeholder={translate(
												"bills.placeholder.deliveryPrice"
											)}
											className="w-full"
										/>
									</div>

									<div className="w-full">
										<UploadImages />
									</div>

									<div className="w-full">
										<TotalsBillForm />
									</div>
								</div>
							</div>
							<div className="lg:col-span-9 lg:order-2 order-1">
								<div className="flex items-center gap-2">
									<h6 className="text-lg font-semibold mb-1.5 inline-block">
										{translate("products.title")}
									</h6>
									<button
										type="button"
										className="btn btn-warning btn-xs py-1.5 px-2 shadow-none"
										onClick={onClickAddProduct}
									>
										<FaPlus className="text-xs" />
									</button>
								</div>
								<ProductsBillForm />
							</div>
						</div>

						<div className="flex flex-wrap justify-start items-center gap-6"></div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default FormBill;
