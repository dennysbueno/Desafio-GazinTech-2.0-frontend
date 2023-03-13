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

import { insertDeveloper } from "../../../services/developers";
import { findAllLevels } from "../../../services/levels";
import { LevelsResponseProps } from "../../../interfaces/levels";
import {
  DevelopersRequestProps,
  DevelopersResponseProps,
} from "../../../interfaces/developers";
import { toastError } from "../../../utils/toast-error";
import { toastSuccess } from "../../../utils/toast-sucess";

export const ModalDeveloperCreate = () => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [developers, setDevelopers] = useState<DevelopersResponseProps>(
    {} as DevelopersResponseProps
  );

  const [levels, setLevels] = useState<LevelsResponseProps[]>([]);
  useEffect(() => {
    findAllLevels()
      .then(({ data }: { data: LevelsResponseProps[] }) => {
        setLevels(data);
      })
      .catch(({ response }) => {
        toast(toastError(response.data.message));
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DevelopersRequestProps>();

  async function onSubmit(data: DevelopersRequestProps) {
    insertDeveloper(data)
      .then(() => {
        toast(toastSuccess(`Cadastrado com sucesso!`));
      })
      .catch(() => {
        toast(toastError(`Erro ao cadastrar desenvolvedor, tente novamente!`));
      })
      .finally(() => {
        window.location.reload();
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
            <form id="newDeveloper" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  id="name"
                  placeholder="Nome"
                  value={developers.name}
                  {...register("name", { required: true })}
                />
                {errors.name && <span>Nome é obrigatório</span>}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.gender}>
                <FormLabel>Gênero</FormLabel>
                <Select
                  value={developers.gender}
                  placeholder="Selecione..."
                  {...register("gender", { required: true })}
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
                  defaultValue={developers.birthdate}
                  placeholder="Data de Nascimento"
                  {...register("birthdate", { required: true, min: 0 })}
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
                  value={developers.team}
                  placeholder="Equipe"
                  {...register("team", { required: true })}
                />
                {errors.team && <span>Equipe é obrigatória</span>}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors?.levelId}>
                <FormLabel>Nivel Proficional</FormLabel>
                <Select
                  placeholder="Selecione..."
                  value={developers.levelId}
                  {...register("levelId", {
                    onChange: (e) =>
                      setDevelopers({
                        ...developers,
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
