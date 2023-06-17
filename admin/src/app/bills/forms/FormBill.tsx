import { Bill, BillDto, DetailBillDto, Provider, ValidStatusOrder } from "@teslo/interfaces";
import * as React from "react";
import EnterpriseInfo from "../shared/EnterpriseInfo";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import SelectProviders from "./SelectProviders";
import ProductsBillForm from "./Products";
import { FaPlus } from "react-icons/fa";
import UploadImages from "./UploadImages";
import SelectStatusBillForm from "./SelectStatus";
import TotalsBillForm from "./Totals";
import * as yup from "yup";
import InputFormik from "@/components/@forms/InputFormik";
import TextareaFormik from "@/components/@forms/TextareaFormik";
import { getValidationsBillForm } from "./getValidationsBillForm";
import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";
import { billsService } from "@teslo/services";
import { useNavigate } from "react-router-dom";
import { validPaths } from "@/utils";
import Swal from "sweetalert2";

interface IFormBillProps {
  providers: Provider[];
  bill?: Bill;
}

const newProduct: DetailBillDto = {
  qty: 0,
  price: 0,
  product: {
    code: 0,
    title: "",
  },
};

const validationSchema = yup.object({
  provider: yup.object().required("Provider is required"),
  status: yup.string().required("Status is required"),
  //reference: yup.string().required('Reference is required'),
  //description: yup.string().required('Description is required'),
});

const FormBill: React.FC<IFormBillProps> = (props) => {
  const { providers, bill: billToUpdate } = props;
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
                  <h6 className="text-lg font-semibold mb-1.5 inline-block">Provider</h6>
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
                      label={"Reference"}
                      classNameInput={"form-control-sm"}
                      placeholder="Reference of the transaction"
                      className="w-full"
                    />

                    <TextareaFormik
                      name="description"
                      placeholder="Any description of the bill"
                      label={"Description"}
                      rows={2}
                      className="w-full"
                    />

                    <InputFormik
                      type="number"
                      name="delivery"
                      label={"Delivery"}
                      classNameInput={"form-control-sm"}
                      placeholder="Price delivery ammount"
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
                  <h6 className="text-lg font-semibold mb-1.5 inline-block">Products</h6>
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
