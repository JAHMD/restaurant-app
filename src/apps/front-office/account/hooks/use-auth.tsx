import { FormSubmitOptions } from "@mongez/react-form";
import { register } from "apps/front-office/account/service/auth";
import { useState } from "react";
import { showToastMessage } from "./useToastMessage";

export type State = "initial" | "loading" | "done" | "error";

export function useRegister() {
  const [state, setState] = useState<State>("initial");

  const createAccount = ({ values, form }: FormSubmitOptions) => {
    setState("loading");
    register(values)
      .then(() => {
        setState("done");
        showToastMessage({ message: "you account is created" });
      })
      .catch(error => {
        setState("error");
        const errors = error.response?.data?.messages;

        showToastMessage({
          message: errors,
          type: "error",
          position: "TOP_LEFT",
        });
        if (errors) {
          for (const error of errors) {
            form.control(error.key)?.setError(error.error);
          }
        }
      });
  };

  return {
    state,
    submit: createAccount,
  };
}
