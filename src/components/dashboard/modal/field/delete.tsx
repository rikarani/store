"use client";

import { FC, useState } from "react";

import { Icon } from "@iconify-icon/react";
import { deleteField } from "@/actions/field/delete";

import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

type Props = {
  fieldId: string;
};

export const DeleteField: FC<Props> = ({ fieldId }) => {
  const [pending, setPending] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  async function hapus(id: string) {
    setPending(true);
    const response = await deleteField(id);

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
      <Button isIconOnly color="danger" onPress={onOpen}>
        <Icon icon="lucide:trash" className="text-base" />
      </Button>
      <Modal
        hideCloseButton
        isDismissable={!pending}
        isKeyboardDismissDisabled={pending}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>yakin mau hapus field ini?</ModalBody>
          <ModalFooter>
            <Button color="success" onPress={onClose} isDisabled={pending}>
              Tidak
            </Button>
            <Button color="danger" variant="ghost" onPress={() => hapus(fieldId)} isLoading={pending}>
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
