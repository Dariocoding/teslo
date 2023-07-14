import { toast } from "react-hot-toast";
import React from "react";
import { PaymentMethod } from "@teslo/interfaces";
import { paymentMethodService } from "@teslo/services";
import { IFormContainerOrderProps, NewOrderValues } from ".";
import { useConfigEnterpriseStore } from "@/store";
import { validPaths } from "@/utils";

export const useInitFormContainer = (props: IFormContainerOrderProps) => {
  const { tempProducts, order } = props;
  let error: string;
  let errorLink: string;
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { configEnterprise } = useConfigEnterpriseStore();

  if (!configEnterprise.prefixes?.length) {
    error = "You have no prefixes configured!, please configure them manually";
  }

  if (!loading && !paymentMethods.length) {
    error = "You have no payment methods configured!, please configure them manually";
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const req = await paymentMethodService.getAll();
        setPaymentMethods(req.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const initialValues: NewOrderValues = {
    status: order ? order.status : "completed",
    user: order
      ? order.user
      : {
          prefix: configEnterprise.prefixes[0],
          dni: "",
        },
    tempReference: order?.reference || "",
    tempQty: 0,
    searchProduct: "",
    tempProduct: {},
    products: tempProducts || [],
    detailOrderProducts: order ? order.detail : [],
    tempSize: null,
    paymentMethod: order ? order.paymentMethod : paymentMethods[0],
    order,
  };

  return {
    loading,
    initialValues,
    paymentMethods,
    error,
  };
};
