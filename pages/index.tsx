import { Container } from "../src/components/Container";
import { useRouter } from "next/router";
import { GroupCard } from "../src/components/GroupCard";
import { Title } from "../src/components/Title";
import { Add } from "../src/components/IconButton/Add";

const LandingPage = () => {
  const router = useRouter();

  const handleCreateGroup = async () => {
    await router.push("/group/create");
  };

  return (
    <Container>
      <Title>Hello Invoice</Title>
      <Add onClick={handleCreateGroup} />
      <GroupCard />
    </Container>
  );
};

export default LandingPage;
