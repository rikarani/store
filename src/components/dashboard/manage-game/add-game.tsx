"use client";

import { FC, useState, useMemo, useActionState, useEffect } from "react";

import { Icon } from "@iconify-icon/react";
import { addGame } from "@/actions/game/add";
import type { Game as TGame } from "@prisma/client";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { Search } from "./search";
import { Pagination } from "./pagination";

type GameFromAPI = {
  id: number;
  active: boolean;
  icon_url: string;
} & Pick<TGame, "name" | "code">;

type Props = {
  label: string;
  gamesFromDB: TGame[];
  gamesFromAPI: GameFromAPI[];
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

  const onPress = (game: GameFromAPI) => {
    setToAdd({ name: game.name, code: game.code, icon_url: game.icon_url });
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
              <input type="hidden" readOnly name="thumbnail" value={toAdd?.icon_url || ""} />
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
