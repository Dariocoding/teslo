import { useConfigEnterpriseStore } from "@/store";
import * as React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import RenderIf from "@/components/ui/RenderIf";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import InputFormik from "@/components/@forms/InputFormik";
import ButtonFormik from "@/components/@forms/ButtonFormik";
import TablePrefixes from "./TablePrefixes";
import classNames from "classnames";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useModalStore } from "@/store";
import { toast } from "react-hot-toast";
import { configEnterpriseService } from "@teslo/services";
import Swal from "sweetalert2";

interface IUserPrefixesFormProps {}

const validationSchema = yup.object({
  prefix: yup.string().required("Prefix is required"),
});

const UserPrefixesForm: React.FC<IUserPrefixesFormProps> = (props) => {
  const {} = props;
  const { configEnterprise, setConfigEnterprise } = useConfigEnterpriseStore();
  const { prefixes = [] } = configEnterprise;
  const { closeModal } = useModalStore();
  const [prefix, setPrefix] = React.useState<string>();
  const [statusForm, setStatusForm] = React.useState<"create" | "update">();

  function onClickAddPrefix() {
    setStatusForm("create");
  }

  function resetForm() {
    setStatusForm(null);
    setPrefix(null);
  }

  function onClickActionsPrefix(prefixIdx: number, action: "update" | "delete") {
    if (action === "update") {
      setPrefix(prefixes[prefixIdx]);
      setStatusForm("update");
    } else {
      closeModal();
      Swal.fire({
        title: "Are you want to delete this prefix?",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const newPrefixes = prefixes.filter((_, idx) => idx !== prefixIdx);
            await configEnterpriseService.update({
              ...configEnterprise,
              prefixes: newPrefixes,
            });
            setConfigEnterprise({
              ...configEnterprise,
              prefixes: newPrefixes,
            });
            toast.success("Prefix deleted.");
          } catch (error) {
            console.log(error);
            toast.error("Error deleting prefix.");
          }
        }
      });
    }
  }

  const onSubmit = async (
    values: { prefix: string },
    actions: FormikHelpers<{ prefix: string }>
  ) => {
    try {
      let prefixes: string[];
      if (statusForm === "create") {
        if (configEnterprise.prefixes.includes(values.prefix)) {
          throw new Error("Prefix already exists.");
        }
        prefixes = [values.prefix, ...configEnterprise.prefixes];
      } else if (statusForm === "update") {
        if (configEnterprise.prefixes.filter((_) => _ !== prefix).includes(values.prefix)) {
          throw new Error("Prefix already exists.");
        }
        prefixes = configEnterprise.prefixes.map((_, idx) =>
          idx === configEnterprise.prefixes.indexOf(prefix) ? values.prefix : _
        );
      }
      const req = await configEnterpriseService.update({
        ...configEnterprise,
        prefixes,
      });

      setConfigEnterprise(req.data);
      resetForm();
      if (statusForm === "create") {
        Swal.fire("Prefix created successfully.", "", "success");
      } else {
        Swal.fire("Prefix updated successfully.", "", "success");
      }
    } catch (error) {
      toast.error(error.message || "Error updating prefix.");
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg">
          <RenderIf isTrue={!statusForm}>New Prefix</RenderIf>
          <RenderIf isTrue={statusForm}>
            {statusForm === "create" ? (
              <span className="flex text-sm items-center gap-2">
                <span>Creating Prefix</span> <FaPlus />
              </span>
            ) : (
              <span className="flex text-sm items-center gap-2">
                <span>Updating Prefix</span> <FaEdit />{" "}
              </span>
            )}
          </RenderIf>
        </h2>
        <RenderIf isTrue={!statusForm}>
          <button className="btn btn-primary btn-sm" type="button" onClick={onClickAddPrefix}>
            Add Prefix
          </button>
        </RenderIf>
        <RenderIf isTrue={statusForm}>
          <button className="btn btn-warning btn-sm gap-2" type="button" onClick={resetForm}>
            <BsArrowReturnLeft /> Go Back
          </button>
        </RenderIf>
      </div>
      <RenderIf isTrue={!statusForm}>
        <TablePrefixes
          onClickActionsPrefix={onClickActionsPrefix}
          prefixes={configEnterprise.prefixes}
        />
      </RenderIf>
      <RenderIf isTrue={statusForm}>
        <Formik initialValues={{ prefix }} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <InputFormik name="prefix" label={"Prefix name"} />

            <ButtonFormik
              className={classNames(
                "btn-sm mb-0",
                statusForm === "create" ? "btn-primary" : "btn-success"
              )}
              full
            >
              {statusForm === "create" ? "Create Prefix" : "Update Prefix"}
            </ButtonFormik>
          </Form>
        </Formik>
      </RenderIf>
    </div>
  );
};

export default UserPrefixesForm;
