import { Container } from "../../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useStoreState } from "../../../src/store/hooks";
import { IUserAvatarGroup } from "../../../src/components/UserAvatarGroup";
import { Title } from "../../../src/components/Title";
import { Add } from "../../../src/components/IconButton/Add";
import dynamic from "next/dynamic";
import { IExpenseValue } from "../../../src/store/model/expense";
import { CARD, CONTAINER } from "../../../src/animation";
import { motion } from "framer-motion";

const UserAvatarGroup = dynamic<IUserAvatarGroup>(
  () =>
    import("../../../src/components/UserAvatarGroup").then(
      mod => mod.UserAvatarGroup
    ),
  {
    ssr: false
  }
);

const ExpenseCard = dynamic<IExpenseValue>(
  () =>
    import("../../../src/components/ExpenseCard").then(mod => mod.ExpenseCard),
  {
    ssr: false
  }
);

const GroupId = () => {
  const router = useRouter();

  const groupById = useStoreState(state =>
    state.group.groupById(router.query.id as string)
  );
  const expenseByGroupId = useStoreState(state =>
    state.expense.expenseByGroupId(router.query.id as string)
  );

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({
        spread: 420
      });
    }
  }, [router.query.created]);

  const handleAddExpense = () => {
    router?.push(`/group/${router.query.id}/expense`);
  };

  return (
    <Container>
      <section className="items-stretch mt-20 mb-8 flex-col flex">
        <div className="flex justify-between">
          <Title>{groupById.name}</Title>
          <Add onClick={handleAddExpense} />
        </div>
        <UserAvatarGroup users={groupById.users} />
      </section>
      <motion.section
        variants={CONTAINER}
        initial="hidden"
        animate="visible"
        className="grid gap-4"
      >
        {expenseByGroupId.map(expense => (
          <motion.div key={expense.id} variants={CARD}>
            <ExpenseCard {...expense} groupId={router.query.id as string} />
          </motion.div>
        ))}
      </motion.section>
    </Container>
  );
};

export default GroupId;
