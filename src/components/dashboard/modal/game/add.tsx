"use client";

import { FC, useState } from "react";

import { Icon } from "@iconify-icon/react";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { GameFromAPI } from "@/types";
import { addGame } from "@/actions/game/add";
import { addToast } from "@heroui/toast";

type Props = {
  game: GameFromAPI;
};

export const AddGame: FC<Props> = ({ game }) => {
  const [pending, setPending] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  async function tambah(game: GameFromAPI) {
    setPending(true);

    const response = await addGame(game);

    if (response.success) {
      setPending(false);
      addToast({ title: "Berhasil", description: response.message, color: "success" });
      onClose();
    } else {
      setPending(false);
      addToast({ title: "Gagal", description: response.message, color: "danger" });
      onClose();
    }
  }

  return (
    <>
      <Button isDisabled={!game?.active} isIconOnly color="success" onPress={onOpen}>
        <Icon icon="lucide:plus" />
      </Button>
      <Modal
        placement="center"
        hideCloseButton
        isOpen={isOpen}
        isDismissable={!pending}
        isKeyboardDismissDisabled={pending}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Konfirmasi Tambah</ModalHeader>
          <ModalBody>Yakin mau nambah game {game?.name}?</ModalBody>
          <ModalFooter>
            <Button type="button" onPress={onClose} isDisabled={pending} color="danger" variant="ghost">
              Tidak
            </Button>
            <Button type="button" onPress={() => tambah(game)} isLoading={pending} color="success">
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
