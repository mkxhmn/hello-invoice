import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent } from "react";
import { UserSelection } from "./UserSelection";
import { IGroup } from "../../store/model/group";

export const GroupForm: FunctionComponent = () => {
  const formik = useFormik<Omit<IGroup, "id">>({
    initialValues: {
      name: "",
      users: []
    },
    onSubmit: values => {
      console.log(values);
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
    <form>
      <div className="mb-4">
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
        />
      </div>
      <UserSelection users={formik.values.users} handleUser={handleUser} />
    </form>
  );
};
