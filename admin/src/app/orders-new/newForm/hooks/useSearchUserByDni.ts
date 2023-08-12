import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { usersService } from "@teslo/services";
import { useOrdersFormContext } from "../../forms/FormContainer";
import useFirstLoad from "@/utils/hooks/useFirstLoad";

interface Actions {
  onSuccess?(): void;
}

export const useSearchUserByDni = (props?: Actions) => {
  const { onSuccess } = props || {};
  const firstLoad = useFirstLoad();
  const { setValues, values } = useOrdersFormContext();
  const [termCustomer, setTermCustomer] = React.useState("");

  React.useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    async function fetchUser() {
      const toastId = toast.loading("Loading...");
      try {
        if (firstLoad) return;
        setValues({ ...values, user: null });

        if (termCustomer.trim() === "") {
          return;
        }

        const res = await usersService.getUser(termCustomer, null, {
          cancelToken: ourRequest.token,
        });
        setValues({
          ...values,
          user: res.data,
        });
        onSuccess?.();
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss(toastId);
      }
    }

    fetchUser();

    return () => {
      ourRequest.cancel();
    };
  }, [termCustomer]);

  return { termCustomer, setTermCustomer };
};
