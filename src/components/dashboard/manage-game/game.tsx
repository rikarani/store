"use client";

import { FC, useState, useMemo } from "react";

import { Icon } from "@iconify-icon/react";

import type { Game as TGame } from "@prisma/client";

import { Button } from "@heroui/button";
import { Input, InputProps } from "@heroui/input";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Pagination as BasePagination, PaginationProps as BasePaginationProps } from "@heroui/pagination";

import Link from "next/link";

type Props = {
  games: TGame[];
};

type PaginationProps = BasePaginationProps & {
  totalGame: number;
};

const Search: FC<InputProps> = ({ value, onValueChange, onClear }) => {
  return (
    <div className="w-full items-center justify-between gap-3 space-y-4 lg:flex lg:space-y-0">
      <Input
        isClearable
        startContent={<Icon icon="lucide:search" className="text-base" />}
        placeholder="cari game..."
        value={value}
        onValueChange={onValueChange}
        onClear={onClear}
      />
      <Button
        as={Link}
        className="w-full lg:w-auto"
        href="/dashboard/admin/manage-game/tambah-game"
        startContent={<Icon icon="lucide:plus" className="text-base" />}
        color="primary"
      >
        Tambah Game
      </Button>
    </div>
  );
};

const Pagination: FC<PaginationProps> = ({ totalGame, page, total, onChange }) => {
  return (
    <div className="flex w-full items-center justify-between px-3">
      <p className="text-sm font-medium text-gray-200">Total {totalGame} game</p>
      <BasePagination
        isCompact
        showControls
        page={page}
        total={total}
        onChange={onChange}
        classNames={{ cursor: "rounded-full" }}
      />
    </div>
  );
};

export type State = {
  success: boolean;
  message: string;
};

export const Game: FC<Props> = ({ games }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [toDelete, setToDelete] = useState<Partial<TGame> | undefined>(undefined);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filteredGames = useMemo(() => {
    if (!search) {
      return games;
    }

    return games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  }, [games, search]);

  const perPage = 5;
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
    setToDelete({ name: game.name, code: game.code });
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setToDelete(undefined);
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
          <TableColumn align="center" key="action">
            Aksi
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent="Tidak ada game">
          {paginatedGames.map((game) => (
            <TableRow key={game.id}>
              <TableCell key="name">{game.name}</TableCell>
              <TableCell key="code">{game.code}</TableCell>
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
      <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleModalClose}>
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader>Konfirmasi Hapus</ModalHeader>
              <form>
                <ModalBody>Apakah anda yakin ingin menghapus game {toDelete?.name}?</ModalBody>
                <ModalFooter>
                  <Button onPress={close} color="success">
                    Tidak
                  </Button>
                  <Button onPress={close} color="danger">
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
