import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "name must be more than 3 characters")
    .max(20, "name must not exceed 20 characters")
});
