import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "expense name must be more than 4 characters")
    .max(40, "expense name must be less than 40 characters")
    .required("expense name is required"),
  users: yup.array().min(1, "participant is required"),
  groupId: yup.string(),
  total: yup
    .number()
    .min(1, "total must be more than RM 1")
    .required("total is required")
});
