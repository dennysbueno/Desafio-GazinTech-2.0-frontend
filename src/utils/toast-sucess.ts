import { UseToastOptions } from "@chakra-ui/react";

export function toastSuccess(message: string): UseToastOptions {
  return {
    title: "Success",
    description: message,
    position: "top-right",
    status: "success",
    duration: 15000,
    isClosable: true,
  };
}