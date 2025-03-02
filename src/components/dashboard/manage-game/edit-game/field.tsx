"use client";

import { FC } from "react";

import { Button } from "@heroui/button";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { Icon } from "@iconify-icon/react";
import type { EnhancedGame } from "@/types";
import { AddField } from "../../modal/field/add";

type Props = {
  game: EnhancedGame | null;
};

export const Field: FC<Props> = ({ game }) => {
  return (
    <Table aria-label="Field Game" topContent={<AddField gameId={game?.id as string} />}>
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
  );
};
