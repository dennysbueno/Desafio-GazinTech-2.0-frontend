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

import { LevelsResponseProps } from "../../interfaces/levels";

import { deleteLevel, findAllLevels } from "../../services/levels";
import { toastError } from "../../utils/toast-error";
import { toastSuccess } from "../../utils/toast-sucess";
import { ModalLevelCreate } from "./components/ModalLevelCreate";
import { ModalLevelUpdate } from "./components/ModalLevelUpdate";
import { Header, Wrapper } from "./styles";

export const IndexLevels = () => {
  const toast = useToast();
  const [levels, setLevels] = useState<LevelsResponseProps[]>([]);
  useEffect(() => {
    findAllLevels()
      .then(({ data }: { data: LevelsResponseProps[] }) => {
        setLevels(data);
      })
      .catch((error: any) => {
        toast(toastError(error.data.message));
      });
  }, []);

  const handleDelete = (id: number) => {
    deleteLevel(id)
      .then(() => {
        toast(toastSuccess("Deletado com Sucesso!"));
        setLevels(levels.filter((level) => level.id !== id));
      })
      .catch(() => {
        toast(toastError(
          "Não é possível Deletar esse nível, pois há desenvolvedores vinculados."
        ));
      });
  };

  const isTableScrollable = true;

  return (
    <Wrapper>
      <Header>
        <h1>Níveis Proficionais</h1>
        <ModalLevelCreate />
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
              <Th>Quantidade de Desenvolvedores</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {levels.map((level) => (
              <Tr key={level.id}>
                <Td>{level.name}</Td>
                <Td>{level.quantity}</Td>
                <Td>
                  <Stack spacing={3} direction="row" align="center">
                    <ModalLevelUpdate level={level} />
                    <Button
                      onClick={() => handleDelete(level.id)}
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
