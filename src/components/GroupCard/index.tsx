import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { motion } from "framer-motion";

const Summary = dynamic<IGroup>(() =>
  import("./Summary").then(component => component.Summary)
);

const container = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  hidden: {
    transition: {
      when: "afterChildren"
    }
  }
};

const card = {
  visible: {
    x: 0,
    opacity: 1
  },
  hidden: {
    x: -32,
    opacity: 0.4
  }
};

export const GroupCard = () => {
  const groups = useStoreState(state => state.group.groups);

  return (
    <motion.div
      variants={container}
      animate="visible"
      initial="hidden"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {groups.map(group => (
        <motion.div key={group.id} variants={card}>
          <Summary {...group} key={group.id} />
        </motion.div>
      ))}
    </motion.div>
  );
};
