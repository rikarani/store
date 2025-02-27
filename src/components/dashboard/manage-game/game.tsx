"use client";

import { FC, useState, useMemo } from "react";

import { Icon } from "@iconify-icon/react";
import { deleteGame } from "@/actions/game/delete";
import { type Game as TGame } from "@prisma/client";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { Search } from "./search";
import { Pagination } from "./pagination";

import Link from "next/link";

type Props = {
  games: TGame[];
};

export const Game: FC<Props> = ({ games }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [pending, setPending] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filteredGames = useMemo(() => {
    if (!search) {
      return games;
    }

    return games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  }, [games, search]);

  const perPage = 7;
  const totalPage = Math.ceil(filteredGames.length / perPage);

  const paginatedGames = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return filteredGames.slice(start, end);
  }, [filteredGames, page]);

  function onSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function onPress(game: TGame) {
    setGame(game);
    onOpen();
  }

  async function hapus(id: string) {
    setPending(true);

    const response = await deleteGame(id);

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
      <Table
        aria-label="Tabel Game"
        topContentPlacement="outside"
        topContent={<Search value={search} onValueChange={(value) => onSearch(value)} onClear={() => setPage(1)} />}
        bottomContent={
          paginatedGames.length > 0 && (
            <Pagination total={totalPage} totalGame={filteredGames.length} onChange={(page) => setPage(page)} />
          )
        }
      >
        <TableHeader>
          <TableColumn key="name">Nama Game</TableColumn>
          <TableColumn key="code">Kode Game</TableColumn>
          <TableColumn key="type">Tipe</TableColumn>
          <TableColumn key="action">Aksi</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Tidak ada game">
          {paginatedGames.map((game) => (
            <TableRow key={game.id}>
              <TableCell key="name">{game.name}</TableCell>
              <TableCell key="code">{game.code}</TableCell>
              <TableCell key="type">
                <Chip className="capitalize" color={game.category === "game" ? "success" : "secondary"}>
                  {game.category === "game" ? "Game" : "Lainnya"}
                </Chip>
              </TableCell>
              <TableCell key="action" className="space-y-3 lg:space-x-3 lg:space-y-0">
                <Button as={Link} href={`/dashboard/admin/manage-game/${game.id}`} isIconOnly color="warning">
                  <Icon icon="lucide:edit" className="text-base" />
                </Button>
                <Button onPress={() => onPress(game)} isIconOnly color="danger">
                  <Icon icon="lucide:trash" className="text-base" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        placement="center"
        hideCloseButton
        isOpen={isOpen}
        isDismissable={!pending}
        isKeyboardDismissDisabled={pending}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>Konfirmasi Hapus</ModalHeader>
              <ModalBody>Yakin mau hapus game {game?.name}?</ModalBody>
              <ModalFooter>
                <Button type="button" isDisabled={pending} onPress={close} color="success">
                  Tidak
                </Button>
                <Button
                  type="submit"
                  isLoading={pending}
                  onPress={() => hapus(game?.id as string)}
                  color="danger"
                  variant="ghost"
                >
                  Ya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
