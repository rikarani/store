"use client";

import { FC } from "react";

import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import { Icon } from "@iconify-icon/react";
import type { EnhancedGame } from "@/types";

type Props = {
  game: EnhancedGame | null;
};

export const Field: FC<Props> = ({ game }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Table
        aria-label="Field Game"
        topContent={
          <Button color="primary" onPress={onOpen} startContent={<Icon icon="lucide:plus" className="text-base" />}>
            Field Baru
          </Button>
        }
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="label">Label</TableColumn>
          <TableColumn key="type">Tipe</TableColumn>
          <TableColumn key="action">Aksi</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Tidak ada field">
          {game!.fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell key="name">{field.name}</TableCell>
              <TableCell key="label">{field.label}</TableCell>
              <TableCell key="type">{field.type}</TableCell>
              <TableCell key="action" className="space-y-3 lg:space-x-3 lg:space-y-0">
                <Button isIconOnly color="warning">
                  <Icon icon="lucide:edit" className="text-base" />
                </Button>
                <Button isIconOnly color="danger">
                  <Icon icon="lucide:trash" className="text-base" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal placement="center" hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent as={"form"}>
          <ModalHeader>Field Baru</ModalHeader>
          <ModalBody>
            <Input isRequired label="Nama" description="yang bakal jadi nilai buat name" />
            <Input isRequired label="Label" description="yang bakal jadi tulisannya nanti" />
            <Select isRequired label="Tipe" description="tipe fieldnya nanti">
              <SelectItem key="text">Text</SelectItem>
              <SelectItem key="dropdown">Dropdown</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
