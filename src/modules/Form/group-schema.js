import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("group name is required")
    .max(40, "group name exceed 40 characters"),
  users: yup
    .array()
    .min(1, "participant is required")
    .required("participant is required")
});
