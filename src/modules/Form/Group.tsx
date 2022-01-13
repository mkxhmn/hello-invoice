import { useFormik } from "formik";
import { ChangeEvent, FunctionComponent } from "react";
import { IGroup } from "../../store/model/group";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { schema } from "./group-schema";
import { useRouter } from "next/router";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { AutoComplete } from "../../components/AutoComplete";
import { IUser } from "../../store/model/user";

export const GroupForm: FunctionComponent = () => {
  const setGroups = useStoreActions(actions => actions.group.setGroups);
  const router = useRouter();

  const users = useStoreState(state => state.user.users);

  const formik = useFormik<Omit<IGroup, "id">>({
    initialValues: {
      name: "",
      users: []
    },
    validationSchema: schema,
    onSubmit: async values => {
      const result = setGroups(values);

      //@ts-ignore
      const groupId = result.payload.id;

      await router.replace(
        `/group/${groupId}?created=today`,
        `/group/${groupId}`,
        { shallow: true }
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
        id="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        errors={formik.errors.name}
      />
      <section aria-details="user selection section">
        <AutoComplete
          options={users as IUser[]}
          onChange={handleUser}
          label={"Participant"}
          id="users"
          placeholder="Participants"
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          errors={formik.errors.users as string}
        />
      </section>
      <Button type="submit">Create Group</Button>
    </form>
  );
};
