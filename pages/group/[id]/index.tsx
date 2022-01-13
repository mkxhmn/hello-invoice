import { Container } from "../../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useStoreState } from "../../../src/store/hooks";
import { ExpenseCard } from "../../../src/components/ExpenseCard";
import { UserAvatarGroup } from "../../../src/components/UserAvatarGroup";
import { Title } from "../../../src/components/Title";
import { Add } from "../../../src/components/IconButton/Add";

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
      <section className="grid gap-4">
        {expenseByGroupId.map(expense => (
          <ExpenseCard
            {...expense}
            groupId={router.query.id as string}
            key={expense.id}
          />
        ))}
      </section>
    </Container>
  );
};

export default GroupId;
