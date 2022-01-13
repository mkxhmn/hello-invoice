import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { motion } from "framer-motion";
import { CARD, CONTAINER } from "../../animation";

const Summary = dynamic<IGroup>(() =>
  import("./Summary").then(component => component.Summary)
);

export const GroupCard = () => {
  const groups = useStoreState(state => state.group.groups);

  return (
    <motion.div
      variants={CONTAINER}
      animate="visible"
      initial="hidden"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {groups.map(group => (
        <motion.div key={group.id} variants={CARD}>
          <Summary {...group} key={group.id} />
        </motion.div>
      ))}
    </motion.div>
  );
};
