import { Container } from "../src/components/Container";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();

  const handleCreateGroup = async () => {
    await router.push("/group/create");
  };

  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Hello Invoice
      </h1>
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
    </Container>
  );
};

export default LandingPage;
