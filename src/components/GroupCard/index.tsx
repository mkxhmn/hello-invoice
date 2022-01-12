import { useStoreState } from "../../store/hooks";
import { Summary } from "./Summary";

export const GroupCard = () => {
  const groups = useStoreState(state => state.group.groups);

  console.log(
    "👾 %c groups ",
    "background-color: #d73d32; color: white;",
    groups
  );

  return (
    <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4">
      {groups.map(group => (
        <Summary {...group} key={group.id} />
      ))}
    </div>
  );
};
