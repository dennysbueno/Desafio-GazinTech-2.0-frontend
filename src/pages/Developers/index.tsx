import {
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { DevelopersResponseProps } from "../../interfaces/developers";

import { deleteDeveloper, findAllDevelopers } from "../../services/developers";
import { toastError } from "../../utils/toast-error";
import { toastSuccess } from "../../utils/toast-sucess";
import { ModalDeveloperCreate } from "./components/ModalDeveloperCreate";
import { ModalDeveloperUpdate } from "./components/ModalDeveloperUpdate";
import { Header, Wrapper } from "./styles";

export const IndexDevelopers = () => {
  const toast = useToast();
  const [developers, setDevelopers] = useState<DevelopersResponseProps[]>([]);
  useEffect(() => {
    findAllDevelopers()
      .then(({ data }: { data: DevelopersResponseProps[] }) => {
        setDevelopers(data);
      })
      .catch((error: any) => {
        toast(toastError(error.data.message));
      });
  }, []);

  const handleDelete = (id: number) => {
    deleteDeveloper(id)
      .then(() => {
        toast(toastSuccess("Deletado com Sucesso!"));
        setDevelopers(developers.filter((developer) => developer.id !== id));
      })
      .catch(() => {
        toast(toastError("Erro ao deletar"));
      });
  };

  const isTableScrollable = true;

  return (
    <Wrapper>
      <Header>
        <h1>Desenvolvedores</h1>
        <ModalDeveloperCreate />
      </Header>
      <TableContainer
        overflowY={isTableScrollable ? "scroll" : undefined}
        height={350}
        margin={4}
      >
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Equipe</Th>
              <Th>Nivel</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {developers.map((developer) => (
              <Tr key={developer.id}>
                <Td>{developer.name}</Td>
                <Td>{developer.team}</Td>
                <Td>{developer.levelName}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <Link to={`/viewDeveloper/${developer.id}`}>
                      <Button colorScheme="teal" size="xs">
                        Ver
                      </Button>
                    </Link>
                    <ModalDeveloperUpdate developer={developer} />
                    <Button
                      onClick={() => handleDelete(developer.id)}
                      colorScheme="red"
                      size="xs"
                    >
                      Deletar
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};
