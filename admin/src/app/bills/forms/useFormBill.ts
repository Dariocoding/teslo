import { useNavigate } from "react-router-dom";
import React from "react";
import { IFormBillProps } from "./FormBill";
import { FormikHelpers, FormikProps } from "formik";
import { Bill, BillDto, DetailBillDto, ValidStatusOrder } from "@teslo/interfaces";
import { getValidationsBillForm } from "./getValidationsBillForm";
import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { billsService } from "@teslo/services";
import { validPaths } from "@/utils";

const newProduct: DetailBillDto = {
	qty: 0,
	price: 0,
	product: {
		code: 0,
		title: "",
	},
};

export const useFormBill = (props: IFormBillProps) => {
	const { bill: billToUpdate, providers } = props;
	const navigate = useNavigate();
	const statusForm = billToUpdate ? "update" : "create";
	const refFormik = React.useRef<FormikProps<BillDto>>();

	const INITIAL_VALUES: BillDto = {
		details: billToUpdate?.details || [newProduct],
		status: billToUpdate?.status || ValidStatusOrder.PENDING,
		total: billToUpdate?.total || 0,
		delivery: billToUpdate?.delivery || 0,
		tax: billToUpdate?.tax || 0,
		description: billToUpdate?.description || "",
		reference: billToUpdate?.reference || "",
		provider: billToUpdate?.provider || providers[0],
		subtotal: billToUpdate?.subtotal || 0,
	};

	const onSubmit = async (values: BillDto, actions: FormikHelpers<BillDto>) => {
		try {
			const { disabledSubmit, subtotal, total } = getValidationsBillForm(values);
			if (disabledSubmit) {
				actions.setSubmitting(false);
				toast.error("The bill is not valid");
				return;
			}

			let req: AxiosResponse<Bill>;
			if (statusForm === "create") {
				const resSwal = await Swal.fire({
					title: "Are you sure?",
					text: "You will create this bill and you can't delete it!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Yes, create it!",
				});
				if (!resSwal.isConfirmed) {
					actions.setSubmitting(false);
					return;
				}

				req = await billsService.createBill({ ...values, subtotal, total });
				toast.success("Bill created successfully");
				navigate(validPaths.viewBill.fnPath(req.data.idbill));
				actions.resetForm();
			} else if (statusForm === "update") {
				req = await billsService.updateBill(billToUpdate.idbill, {
					...values,
					subtotal,
					total,
				});
				toast.success("Bill updated successfully");
			}
		} catch (error) {
			console.log(error);
		} finally {
			actions.setSubmitting(false);
		}
	};

	const onClickAddProduct = () => {
		refFormik.current.setValues({
			...refFormik.current.values,
			details: [...refFormik.current.values.details, newProduct],
		});
	};

	return {
		refFormik,
		INITIAL_VALUES,
		statusForm,
		onSubmit,
		onClickAddProduct,
	};
};
