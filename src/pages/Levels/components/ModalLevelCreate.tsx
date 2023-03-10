import React, { useState } from "react";

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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { insertLevel } from "../../../services/levels";
import {
  LevelsRequestProps,
  LevelsResponseProps,
} from "../../../interfaces/levels";

export const ModalLevelCreate = () => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [levels, setLevels] = useState<LevelsResponseProps>(
    {} as LevelsResponseProps
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LevelsRequestProps>();

  async function onSubmit(data: LevelsRequestProps) {
    insertLevel(data)
      .then(() => {
        alert(`Cadastrado com sucesso!`);
      })
      .catch(() => {
        alert(`Erro ao cadastrar um nível, tente novamente!`);
      })
      .finally(() => {
        window.location.reload();
      });
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Novo Nível
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Níveis Proficionais</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="newLevel" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nível</FormLabel>
                <Input
                  id="name"
                  placeholder="Nível"
                  value={levels.name}
                  {...register("name")}
                />
                {errors.name && <span>Nível é obrigatório</span>}
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="newLevel" colorScheme="blue" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
