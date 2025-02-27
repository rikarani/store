"use client";

import { FC, useState, useMemo } from "react";

import { Icon } from "@iconify-icon/react";
import { addGame } from "@/actions/game/add";
import type { GameFromAPI } from "@/types/game";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { Search } from "./search";
import { Pagination } from "./pagination";

type Props = {
  games: GameFromAPI[];
};

export const AddGame: FC<Props> = ({ games }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [game, setGame] = useState<Partial<GameFromAPI> | undefined>(undefined);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filteredGames = useMemo(() => {
    if (!search) {
      return games;
    }

    return games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, games]);

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

  function onPress(game: GameFromAPI) {
    setGame(game);
    onOpen();
  }

  async function tambah(game: Partial<GameFromAPI>) {
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
      <Table
        aria-label="Tabel Tambah Game"
        topContentPlacement="outside"
        topContent={<Search value={search} onValueChange={(value) => onSearch(value)} onClear={() => setPage(1)} />}
        bottomContent={
          <Pagination
            page={page}
            total={totalPage}
            totalGame={filteredGames.length}
            onChange={(page) => setPage(page)}
          />
        }
      >
        <TableHeader>
          <TableColumn key="name">Nama Game</TableColumn>
          <TableColumn key="code">Kode Game</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn align="center" key="action">
            Aksi
          </TableColumn>
        </TableHeader>
        <TableBody items={paginatedGames} emptyContent="Tidak ada game">
          {(game) => (
            <TableRow>
              <TableCell>{game.name}</TableCell>
              <TableCell>{game.code}</TableCell>
              <TableCell>
                <Chip
                  startContent={
                    <Icon icon={game.active ? "lucide:circle-check" : "lucide:circle-x"} className="text-base" />
                  }
                  color={game.active ? "success" : "danger"}
                >
                  {game.active ? "Aktif" : "Tidak Aktif"}
                </Chip>
              </TableCell>
              <TableCell>
                <Button isDisabled={!game.active} isIconOnly color="success" onPress={() => onPress(game)}>
                  <Icon icon="lucide:plus" />
                </Button>
              </TableCell>
            </TableRow>
          )}
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
              <ModalHeader>Konfirmasi Tambah</ModalHeader>
              <ModalBody>Yakin mau nambah game {game?.name}?</ModalBody>
              <ModalFooter>
                <Button onPress={close} isDisabled={pending} color="danger" variant="ghost">
                  Tidak
                </Button>
                <Button isLoading={pending} type="submit" color="success" onPress={() => tambah(game as GameFromAPI)}>
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
