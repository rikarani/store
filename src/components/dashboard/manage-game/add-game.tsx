"use client";

import { FC, useState, useMemo } from "react";

import { Icon } from "@iconify-icon/react";

import type { GameFromAPI } from "@/types/game";

import { Chip } from "@heroui/chip";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";

import { Search } from "./search";
import { Pagination } from "./pagination";
import { AddGame } from "@/components/dashboard/modal/game/add";

type Props = {
  games: GameFromAPI[];
};

export const AddGameTable: FC<Props> = ({ games }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

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
                <AddGame game={game} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
