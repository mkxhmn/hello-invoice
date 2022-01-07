import { Container } from "../../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { useStoreActions } from "../../../src/store/hooks";
import { ExpenseCard } from "../../../src/components/ExpenseCard";

const GroupId = () => {
  const router = useRouter();
  const getGroup = useStoreActions(actions => actions.group.getGroup);

  const group = useMemo(() => getGroup(router.query.id as string), [
    getGroup,
    router.query.id
  ]);

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
      <section className="mt-20 mb-8 items-center justify-between flex">
        <h1 className="text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
          {group.name}
        </h1>
        <div>
          <button
            onClick={handleAddExpense}
            className="text-gray-400 bg-opacity-50 shadow-md rounded-full p-2 backdrop-filter backdrop-blur firefox:bg-opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </section>
      <section className="grid gap-4">
        {group.expenses.map(expense => (
          <ExpenseCard {...expense} key={expense.id} />
        ))}
      </section>
    </Container>
  );
};

export default GroupId;
