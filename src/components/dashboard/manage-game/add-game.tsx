"use client";

import { FC, useState, useMemo, useActionState, useEffect } from "react";

import { Icon } from "@iconify-icon/react";
import { addGame } from "@/actions/game/add";
import type { Game as TGame } from "@prisma/client";

import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Input, InputProps } from "@nextui-org/input";
import { Pagination as BasePagination, PaginationProps as TProps } from "@nextui-org/pagination";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@nextui-org/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

import Link from "next/link";

type GameFromAPI = {
  id: number;
  active: boolean;
} & Pick<TGame, "name" | "code">;

type Props = {
  label: string;
  gamesFromDB: TGame[];
  gamesFromAPI: GameFromAPI[];
};

type PaginationProps = TProps & {
  totalGame: number;
};

const Search: FC<InputProps> = ({ value, onValueChange, onClear }) => {
  return (
    <div className="w-full items-center justify-between gap-4 space-y-4 lg:flex lg:space-y-0">
      <Button
        as={Link}
        href="/dashboard/admin/manage-game"
        className="w-full lg:w-auto"
        color="primary"
        startContent={<Icon icon="lucide:arrow-left" className="text-base" />}
      >
        Kembali
      </Button>
      <Input
        isClearable
        startContent={<Icon icon="lucide:search" className="text-base" />}
        placeholder="cari game..."
        value={value}
        onValueChange={onValueChange}
        onClear={onClear}
      />
    </div>
  );
};

const Pagination: FC<PaginationProps> = ({ totalGame, page, total, onChange }) => {
  return (
    <div className="w-full items-center justify-between space-y-0.5 px-3 lg:flex lg:space-y-0">
      <p className="text-sm font-medium text-gray-200">Total {totalGame} game</p>
      <BasePagination
        isCompact
        size="sm"
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

export const AddGame: FC<Props> = ({ gamesFromDB, gamesFromAPI, label }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [toAdd, setToAdd] = useState<Partial<GameFromAPI> | undefined>(undefined);
  const [state, action, pending] = useActionState<State | undefined, FormData>(addGame, undefined);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if (state?.success) {
      setSearch("");
      setPage(1);
      onClose();
    }
  }, [state, onClose]);

  const availableGames = gamesFromAPI.filter((game) => !gamesFromDB.find((g) => g.code === game.code));

  const filteredGames = useMemo(() => {
    if (!search) {
      return availableGames;
    }

    return availableGames.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  }, [availableGames, search]);

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

  const onPress = (game: GameFromAPI) => {
    setToAdd({ name: game.name, code: game.code });
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    setToAdd(undefined);
  };

  return (
    <>
      <Table
        aria-label={label}
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
        onClose={handleModalClose}
      >
        <ModalContent>
          {(close) => (
            <form action={action}>
              <input type="hidden" readOnly name="name" value={toAdd?.name || ""} />
              <input type="hidden" readOnly name="code" value={toAdd?.code || ""} />
              <ModalHeader>Konfirmasi Tambah</ModalHeader>
              <ModalBody>Yakin mau nambah game {toAdd?.name}?</ModalBody>
              <ModalFooter>
                <Button onPress={close} isDisabled={pending} color="danger" variant="ghost">
                  Tidak
                </Button>
                <Button isLoading={pending} type="submit" color="success">
                  Ya
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
