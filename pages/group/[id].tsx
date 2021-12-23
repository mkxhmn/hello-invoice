import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { useStoreActions } from "../../src/store/hooks";

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

  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        {group.name}
      </h1>
    </Container>
  );
};

export default GroupId;
