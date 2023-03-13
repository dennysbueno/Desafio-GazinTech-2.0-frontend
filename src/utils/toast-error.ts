import { UseToastOptions } from "@chakra-ui/react";

export function toastError(message: string): UseToastOptions {
  return {
    title: "Error",
    description: message,
    position: "top-right",
    status: "error",
    duration: 15000,
    isClosable: true,
  };
}