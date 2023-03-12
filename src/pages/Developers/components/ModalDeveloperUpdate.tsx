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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { updateDeveloper } from "../../../services/developers";
import { findAllLevels } from "../../../services/levels";
import { LevelsResponseProps } from "../../../interfaces/levels";
import {
  DevelopersRequestProps,
  DevelopersResponseProps,
} from "../../../interfaces/developers";
import { useParams } from "react-router-dom";

type ModalDevelopersUpdateProps = {
  developer: DevelopersResponseProps;
};
export const ModalDeveloperUpdate = ({
  developer,
}: ModalDevelopersUpdateProps) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [developerUpdate, setDeveloperUpdate] =
    useState<DevelopersResponseProps>(developer);

  const [levels, setLevels] = useState<LevelsResponseProps[]>([]);
  useEffect(() => {
    findAllLevels()
      .then(({ data }: { data: LevelsResponseProps[] }) => {
        setLevels(data);
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DevelopersRequestProps>();

  async function onSubmit(data: DevelopersRequestProps) {
    updateDeveloper(developer.id, data)
      .then(() => {
        alert("Editado com Sucesso");
      })
      .catch(() => {
        alert("Erro ao editar");
      })
      .finally(() => {
        window.location.reload();
      });
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="yellow" size="xs">
        Editar
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Desenvolvedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="editDeveloper" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  id="name"
                  placeholder="Nome"
                  value={developerUpdate.name}
                  {...register("name", {
                    onChange: (e) => setDeveloperUpdate(e.target.value),
                    required: true,
                  })}
                />
                {errors.name && <span>Nome é obrigatório</span>}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.gender}>
                <FormLabel>Gênero</FormLabel>
                <Select
                  value={developerUpdate.gender}
                  placeholder="Selecione..."
                  {...register("gender", {
                    onChange: (e) => setDeveloperUpdate(e.target.value),
                    required: true,
                  })}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </Select>
                {errors.gender && <span>Gênero é obrigatório</span>}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.birthdate}>
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  id="age"
                  value={developerUpdate.birthdate}
                  placeholder="Idade"
                  {...register("birthdate", {
                    onChange: (e) => setDeveloperUpdate(e.target.value),
                    required: true,
                  })}
                  type="date"
                />
                {errors.birthdate && (
                  <span>Idade é obrigatória e deve ser um número positivo</span>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.team}>
                <FormLabel>Equipe</FormLabel>
                <Input
                  id="team"
                  value={developerUpdate.team}
                  placeholder="Equipe"
                  {...register("team", {
                    onChange: (e) => setDeveloperUpdate(e.target.value),
                    required: true,
                  })}
                />
                {errors.team && <span>Equipe é obrigatória</span>}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.levelId}>
                <FormLabel>Nivel Proficional</FormLabel>
                <Select
                  placeholder="Selecione..."
                  value={developerUpdate.levelId}
                  {...register("levelId", {
                    onChange: (e) =>
                      setDeveloperUpdate({
                        ...developerUpdate,
                        levelId: e.target.value,
                      }),
                    required: true,
                  })}
                >
                  {levels
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="editDeveloper"
              colorScheme="blue"
              mr={3}
            >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
