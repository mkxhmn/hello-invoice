import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent } from "react";
import { useStoreActions } from "../../store/hooks";
import { schema } from "./expense-schema";
import { useRouter } from "next/router";
import { IExpenseValue } from "../../store/model/expense";
import dynamic from "next/dynamic";
import { IUserSelection } from "./UserSelection";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";

const UserSelection = dynamic<IUserSelection>(
  () => import("./UserSelection").then(mod => mod.UserSelection),
  { ssr: false }
);

export const ExpenseForm: FunctionComponent = () => {
  const setExpenses = useStoreActions(actions => actions.expense.setExpenses);
  const router = useRouter();

  const formik = useFormik<Omit<IExpenseValue, "id">>({
    initialValues: {
      name: "",
      users: [],
      groupId: router.query.id as string,
      total: 0
    },
    validationSchema: schema,
    onSubmit: async values => {
      setExpenses(values);

      await router.replace(`/group/${router.query.id}`, undefined, {
        shallow: true
      });
    }
  });

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(
      "users",
      event.target.checked
        ? [...formik.values.users, event.target.value]
        : formik.values.users.filter(userId => userId !== event.target.value)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        errors={formik.errors.name}
        id="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <TextField
        inputAdornment="MYR"
        label="Total"
        errors={formik.errors.total}
        id="total"
        type="number"
        placeholder="$ total"
        value={formik.values.total}
        onChange={formik.handleChange}
      />
      <section aria-details="user selection section">
        <UserSelection users={formik.values.users} handleUser={handleUser} />
        {formik.errors.users && (
          <span className="text-sm text-red-400">{formik.errors.users}</span>
        )}
      </section>
      <Button buttonColor="blue" type="submit">
        Create Expense
      </Button>
    </form>
  );
};
