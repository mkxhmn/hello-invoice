import { Container } from "../src/components/Container";
import { useRouter } from "next/router";
import { GroupCard } from "../src/components/GroupCard";
import { Title } from "../src/components/Title";

const LandingPage = () => {
  const router = useRouter();

  const handleCreateGroup = async () => {
    await router.push("/group/create");
  };

  return (
    <Container>
      <Title>Hello Invoice</Title>
      <button
        onClick={handleCreateGroup}
        className="text-gray-400 bg-opacity-50 shadow-md rounded-xl p-2 backdrop-filter backdrop-blur firefox:bg-opacity-90"
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
      <GroupCard />
    </Container>
  );
};

export default LandingPage;
