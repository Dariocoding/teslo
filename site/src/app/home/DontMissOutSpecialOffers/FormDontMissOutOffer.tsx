"use client";
import * as React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { icons } from "@/utils";
import InputFormik from "@/shared/@forms/InputFormik";
import ButtonFormik from "@/shared/@forms/ButtonFormik";

interface IFormDontMissOutOfferProps {}

const INITIAL_VALUES = {
  email: "",
};

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Email must be a valid email"),
});

const FormDontMissOutOffer: React.FunctionComponent<IFormDontMissOutOfferProps> = (props) => {
  async function onSubmit() {}

  return (
    <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
      <Form>
        <div className="mt-10 relative max-w-sm lg:flex items-center space-x-2">
          <InputFormik name="email" placeholder="Enter your email" className="lg:w-[75%]" />
          <ButtonFormik className="btn-sm rounded-full btn-primary lg:mb-5">
            <icons.Next className="w-5 h-5" />
          </ButtonFormik>
        </div>
      </Form>
    </Formik>
  );
};

export default FormDontMissOutOffer;
