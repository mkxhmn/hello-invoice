import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useStoreActions } from "../../store/hooks";
import { schema } from "./expense-schema";
import { useRouter } from "next/router";
import { ISetExpenses } from "../../store/model/expense";
import { AutoComplete } from "../../components/AutoComplete";
import { IUser } from "../../store/model/user";
import { TextField } from "../../components/TextField";

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

      await router.replace(
        `/group/${router.query.id}?created=today`,
        `/group/${router.query.id}`,
        {
          shallow: true
        }
      );
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
        label="Total"
        errors={formik.errors.total}
        id="total"
        type="number"
        placeholder="Total"
        value={formik.values.total}
        onChange={formik.handleChange}
      />
      <section aria-details="user selection section" className="mb-4">
        <AutoComplete
          onChange={handleUser}
          label="Participant"
          id="users"
          placeholder="participants"
          options={users as IUser[]}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.name}
        />
      </section>
      <button
        type="submit"
        className="bg-indigo-400 text-indigo-900 py-2 px-4 rounded-lg shadow-md"
      >
        Create Expense
      </button>
    </form>
  );
};
