import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useStoreActions } from "../../store/hooks";
import { schema } from "./group-schema";
import { useRouter } from "next/router";
import { IExpenseValue } from "../../store/model/expense";
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

  console.log(
    "👾 %c users ",
    "background-color: #d73d32; color: white;",
    users
  );

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

      //@ts-ignore
      await router.replace(`/group/${router.query.id}`, { shallow: true });
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
      <section className="mb-4" aria-details="group name section">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          id="name"
          type="text"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <span className="text-sm text-red-400">{formik.errors.name}</span>
        )}
      </section>
      <section aria-details="user selection section" className="mb-4">
        <AutoComplete
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
        Create Group
      </button>
    </form>
  );
};
