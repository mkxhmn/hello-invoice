import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";

const Summary = dynamic<IGroup>(() =>
  import("./Summary").then(component => component.Summary)
);

export const GroupCard = () => {
  const groups = useStoreState(state => state.group.groups);

  return (
    <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4">
      {groups.map(group => (
        <Summary {...group} key={group.id} />
      ))}
    </div>
  );
};
