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

import { updateLevel } from "../../../services/levels";
import {
  LevelsRequestProps,
  LevelsResponseProps,
} from "../../../interfaces/levels";

type ModalLevelUpdateResponse = {
  level: LevelsResponseProps;
};

export const ModalLevelUpdate = ({ level }: ModalLevelUpdateResponse) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [levelUpdate, setLevelUpdate] = useState<LevelsResponseProps>(level);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LevelsRequestProps>();

  async function onSubmit(data: LevelsRequestProps) {
    updateLevel(level.id, data)
      .then(() => {
        alert(`Editado com sucesso!`);
      })
      .catch(() => {
        alert(`Erro ao editar esse nível, tente novamente!`);
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
          <ModalHeader>Editar Níveis Proficionais</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="newLevel" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nível</FormLabel>
                <Input
                  id="name"
                  placeholder="Nível"
                  value={levelUpdate.name}
                  {...register("name", {
                    onChange: (e) => setLevelUpdate(e.target.value),
                  })}
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
