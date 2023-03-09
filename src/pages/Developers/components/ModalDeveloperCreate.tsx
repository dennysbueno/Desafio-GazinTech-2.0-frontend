import React, { useEffect, useState } from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure
} from "@chakra-ui/react";

import { insertDeveloper } from "../../../services/developers";
import { findAllLevels } from "../../../services/levels";
import { LevelsProps } from "../../../interfaces/levels";
import { DevelopersProps } from "../../../interfaces/developers";

export const ModalDeveloperCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);


  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>();
  const [age, setAge] = useState<number>();
  const [team, setTeam] = useState<string>();

  const [levels, setLevels] = useState<LevelsProps[]>([]);
  useEffect(() => {
    findAllLevels()
      .then(({ data }: { data: LevelsProps[] }) => {
        setLevels(data);
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);

  async function NewDeveloper(e) {
    e.preventDefault()
    const data: DevelopersProps = {
      name,
      age,
      gender,
      team,
      levelId: { id: "", name: "" }
    }

    insertDeveloper(data)
      .then(() => {
        alert(`Cadastrado com sucesso!`);
      })
      .catch(() => {
        alert("Erro no cadastro, tente novamente.");
      }).finally(() =>{
        window.location.reload()
      });
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Novo Dev
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Desenvolvedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="newDeveloper" onSubmit={NewDeveloper}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Genero</FormLabel>
                <Input
                  placeholder="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Idade</FormLabel>
                <Input
                  type="number"
                  placeholder="Idade"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Equipe</FormLabel>
                <Input
                  placeholder="Equipe"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nivel Proficional</FormLabel>
                <Select
                  placeholder="Selecione..."
                  value={levels.name}
                  onChange={(e) => setLevels(e.target.value)}
                  required
                >
                  {levels.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="newDeveloper" colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
