import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";

const GroupId = () => {
  const router = useRouter();
  console.log(
    "👾 %c router ",
    "background-color: #d73d32; color: white;",
    router
  );

  return <Container>hello group</Container>;
};

export default GroupId;
