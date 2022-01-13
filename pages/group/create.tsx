import { Container } from "../../src/components/Container";
import { Title } from "../../src/components/Title";
import { GroupForm } from "../../src/modules/Form/Group";

const CreateGroup = () => {
  return (
    <Container>
      <div className="mt-20 mb-8">
        <Title>Create Group</Title>
      </div>
      <GroupForm />
    </Container>
  );
};

export default CreateGroup;
