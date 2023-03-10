import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DevelopersResponseProps } from "../../../interfaces/developers";
import { showDeveloper } from "../../../services/developers";
import { FormContainer, Header, Wrapper } from "../styles";

export const ViewDeveloper = () => {
  const params = useParams();
  const id = Number(params.id);
  const [developer, setDeveloper] = useState<DevelopersResponseProps>(
    {} as DevelopersResponseProps
  );
  useEffect(() => {
    showDeveloper(id).then(({ data }) => {
      setDeveloper(data);
    });
  }, [id]);

  return (
    <>
      <Wrapper>
        <Header>
          <h1>Dados do Desenvolvedor</h1>
        </Header>
        <FormContainer>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input value={developer?.name} disabled />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Gênero</FormLabel>
            <Input value={developer?.gender} disabled />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Idade</FormLabel>
            <Input value={developer?.age} disabled />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Equipe</FormLabel>
            <Input value={developer?.team} disabled />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nivel Proficional</FormLabel>
            <Input value={developer?.levelName} disabled />
          </FormControl>
        </FormContainer>
      </Wrapper>
    </>
  );
};
