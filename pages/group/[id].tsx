import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const GroupId = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({
        spread: 420
      });
    }
  }, [router.query.created]);

  return <Container>hello {router.query.id}</Container>;
};

export default GroupId;
