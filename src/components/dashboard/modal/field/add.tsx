"use client";

import { FC } from "react";

import { Icon } from "@iconify-icon/react";

import { addField } from "@/actions/field/add";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFieldSchema, type AddFieldSchema } from "@/schemas/field/add";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

type Props = {
  gameId: string;
};

export const AddField: FC<Props> = ({ gameId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, formState, control, reset } = useForm<AddFieldSchema>({
    resolver: zodResolver(addFieldSchema),
    defaultValues: {
      game_id: gameId,
      name: "",
      label: "",
      type: "text",
    },
  });

  async function tambah(data: AddFieldSchema) {
    const response = await addField(data);

    if (response.success) {
      addToast({ title: "Berhasil", description: response.message, color: "success" });
      reset();
      onClose();
    } else {
      addToast({ title: "Gagal", description: response.message, color: "danger" });
      reset();
      onClose();
    }
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Button color="primary" onPress={onOpen} startContent={<Icon icon="lucide:plus" className="text-base" />}>
          Field Baru
        </Button>
      </div>
      <Modal
        placement="center"
        hideCloseButton
        isDismissable={!formState.isSubmitting}
        isKeyboardDismissDisabled={formState.isSubmitting}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent as={"form"} onSubmit={handleSubmit(tambah)}>
          <ModalHeader>Field Baru</ModalHeader>
          <ModalBody>
            <Input
              {...register("name")}
              isRequired
              isDisabled={formState.isSubmitting}
              label="Nama"
              description="yang bakal jadi nilai buat name"
            />
            <Input
              {...register("label")}
              isRequired
              isDisabled={formState.isSubmitting}
              label="Label"
              description="yang bakal jadi tulisannya nanti"
            />
            <Controller
              control={control}
              name="type"
              render={({ field: { value, ...f } }) => (
                <Select
                  {...f}
                  selectedKeys={[value]}
                  isRequired
                  isDisabled={formState.isSubmitting}
                  label="Tipe"
                  description="tipe fieldnya nanti"
                >
                  <SelectItem key="text">Text</SelectItem>
                  <SelectItem key="dropdown">Dropdown</SelectItem>
                </Select>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button isLoading={formState.isSubmitting} color="primary" type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
