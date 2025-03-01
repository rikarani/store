"use client";

import { FC, useState } from "react";

import { Game } from "@prisma/client";
import { deleteGame } from "@/actions/game/delete";
import { Icon } from "@iconify-icon/react";

import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

type Props = {
  game: Game;
};

export const DeleteGame: FC<Props> = ({ game }) => {
  const [pending, setPending] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  async function hapus(id: string) {
    setPending(true);

    const response = await deleteGame(id);

    if (response.success) {
      setPending(false);
      addToast({ title: "Berhasil", description: response.message, color: "success" });
      onClose();
    } else {
      setPending(false);
      addToast({ title: "Gagal", description: response.message, color: "success" });
      onClose();
    }
  }

  return (
    <>
      <Button onPress={onOpen} isIconOnly color="danger">
        <Icon icon="lucide:trash" className="text-base" />
      </Button>
      <Modal
        hideCloseButton
        placement="center"
        isOpen={isOpen}
        isDismissable={!pending}
        isKeyboardDismissDisabled={pending}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>Yakin mau hapus game {game?.name}?</ModalBody>
          <ModalFooter>
            <Button type="button" isDisabled={pending} onPress={onClose} color="success">
              Tidak
            </Button>
            <Button
              type="button"
              isLoading={pending}
              onPress={() => hapus(game?.id as string)}
              color="danger"
              variant="ghost"
            >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
