"use client";

import { FC, useState, useEffect, useMemo, useActionState } from "react";

import { Icon } from "@iconify-icon/react";
import type { Game as TGame } from "@prisma/client";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { Search } from "./search";
import { Pagination } from "./pagination";

import type { MutateGameState } from "@/types";
import { deleteGame } from "@/actions/game/delete";

type Props = {
  games: TGame[];
};

export const Game: FC<Props> = ({ games }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [state, action, pending] = useActionState<MutateGameState | undefined, FormData>(deleteGame, undefined);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if (state?.success) {
      setPage(1);
      onClose();
    }
  }, [state, onClose]);

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

  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const onPress = (game: TGame) => {
    setGame(game);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setGame(undefined);
  };

  return (
    <>
      <Table
        aria-label="Tabel Game dari DB"
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
                <Chip className="capitalize" color={game.type === "game" ? "success" : "secondary"}>
                  {game.type}
                </Chip>
              </TableCell>
              <TableCell key="action" className="space-y-3 lg:space-x-3 lg:space-y-0">
                <Button isIconOnly color="warning">
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
        onClose={handleModalClose}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>Konfirmasi Hapus</ModalHeader>
              <form action={action}>
                <input type="hidden" readOnly name="id" value={game?.id || ""} />
                <ModalBody>Yakin mau hapus game {game?.name}?</ModalBody>
                <ModalFooter>
                  <Button type="button" isDisabled={pending} onPress={close} color="success">
                    Tidak
                  </Button>
                  <Button type="submit" isLoading={pending} color="danger" variant="ghost">
                    Ya
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
