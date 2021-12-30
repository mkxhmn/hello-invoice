import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useStoreActions } from "../../store/hooks";
import { schema } from "./expense-schema";
import { useRouter } from "next/router";
import { ISetExpenses } from "../../store/model/expense";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { AutoComplete } from "../../components/AutoComplete";
import { IUser } from "../../store/model/user";

export const ExpenseForm: FunctionComponent = () => {
  const setExpenses = useStoreActions(actions => actions.expense.setExpenses);
  const router = useRouter();

  const getGroup = useStoreActions(actions => actions.group.getGroup);

  const users = useMemo(() => getGroup(router.query.id as string).users, [
    getGroup,
    router.query.id
  ]);

  const formik = useFormik<ISetExpenses>({
    initialValues: {
      name: "",
      users: [],
      groupId: router.query.id as string,

      //@ts-ignore
      total: ""
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      setExpenses(values);

      await router.replace(`/group/${router.query.id}`, undefined, {
        shallow: true
      });
    }
  });

  const handleUser = (_user: IUser, event: ChangeEvent<HTMLInputElement>) => {
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
        placeholder="total"
        value={formik.values.total}
        onChange={formik.handleChange}
      />
      <section aria-details="user selection section">
        <AutoComplete
          placeholder="Participant"
          filterBy="name"
          label="Participant"
          options={users as IUser[]}
          handleChange={handleUser}
          getOptionValue={(user: IUser) => user.id}
          getOptionLabel={(user: IUser) => user.name}
        />
      </section>
      <Button buttonColor="blue" type="submit">
        Create Expense
      </Button>
    </form>
  );
};
