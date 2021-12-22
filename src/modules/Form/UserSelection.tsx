import { useStoreActions, useStoreState } from "../../store/hooks";
import { useFormik } from "formik";
import { schema } from "./schema";
import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { matchSorter } from "match-sorter";
import { useDebounce } from "use-debounce";
import { IUser } from "../../store/model/user";

interface IUserSelection {
  users: string[];
  handleUser: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UserSelection: FunctionComponent<IUserSelection> = props => {
  const users = useStoreState(state => state.user.users);
  const setUsers = useStoreActions(actions => actions.user.setUsers);

  const formik = useFormik<{ name: string }>({
    initialValues: { name: "" },
    onSubmit: (values, { resetForm }) => {
      setUsers(values.name);
      resetForm();
    },
    validationSchema: schema
  });

  const handleAddUser = () => {
    formik.handleSubmit();
  };

  const [userInput] = useDebounce(formik.values.name, 250);

  const recommendation = useMemo(() => {
    if (!userInput) {
      return users;
    }

    return matchSorter(users, userInput, { keys: ["name"] });
  }, [users, userInput]);

  const selectedUsers = useMemo<IUser[]>(
    //@ts-ignore
    () => props.users.map(userId => users.find(user => user.id === userId)),
    [users, props.users]
  );

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor="name"
      >
        Participant
      </label>
      <div className="w-full flex py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
        {selectedUsers.map(user => (
          <label
            className="flex align-middle text-gray-700 text-sm mr-1"
            key={user.id}
          >
            {user.name}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              type="checkbox"
              id={user.id}
              value={user.id}
              className="w-0 h-0"
              checked={props.users.includes(user.id)}
              //@ts-ignore
              onChange={props.handleUser}
            />
          </label>
        ))}
        <input
          className="w-full text-left cursor-default focus:outline-none"
          id="name"
          type="text"
          placeholder="Participant"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      {formik.errors.name && (
        <span className="text-sm text-red-400">{formik.errors.name}</span>
      )}
      <div className="border-gray-800 border-2">
        {recommendation.map(user => (
          <div key={user.id} className="mt-2 align-center flex">
            <input
              type="checkbox"
              id={user.id}
              value={user.id}
              className="w-4 h-4"
              checked={props.users.includes(user.id)}
              //@ts-ignore
              onChange={props.handleUser}
            />
            <label
              htmlFor={user.id}
              className="text-gray-700 text-sm font-bold mb-1"
            >
              {user.name}
            </label>
          </div>
        ))}
        {!recommendation.length && (
          <button
            className="text-blue-400"
            type="button"
            onClick={handleAddUser}
          >
            add user
          </button>
        )}
      </div>
    </div>
  );
};
