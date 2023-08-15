import ButtonFormik from "@/components/@forms/ButtonFormik";
import InputFormik from "@/components/@forms/InputFormik";
import { ConfigApp } from "@teslo/interfaces";
import { configAppService } from "@teslo/services";
import { Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-hot-toast";

interface IFormChatGptProps {
  data: UpdateChatgptDto;
}

export interface UpdateChatgptDto extends Pick<ConfigApp, "chatGptKey"> {}

const FormChatGpt: React.FunctionComponent<IFormChatGptProps> = (props) => {
  const { data } = props;

  const onSubmit = async (values: UpdateChatgptDto) => {
    try {
      await configAppService.update({ chatGptKey: values.chatGptKey });
      toast.success("Chatgpt key updated");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const INITIAL_VALUES: UpdateChatgptDto = {
    chatGptKey: data.chatGptKey || "",
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        <InputFormik name="chatGptKey" placeholder="Key chatgpt" label={"Chatgpt Key"} />
        <ButtonFormik full className="btn-primary btn-sm mb-0">
          Save changes
        </ButtonFormik>
      </Form>
    </Formik>
  );
};

export default FormChatGpt;
