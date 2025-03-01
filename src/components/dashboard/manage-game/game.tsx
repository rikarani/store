"use client";

import { FC, useState, useMemo } from "react";

import { Icon } from "@iconify-icon/react";
import { type Game } from "@prisma/client";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@heroui/table";

import { Search } from "./search";
import { Pagination } from "./pagination";

import Link from "next/link";
import { DeleteGame } from "../modal/game/delete";

type Props = {
  data: Game[];
};

export const GameTable: FC<Props> = ({ data }) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const filteredGames = useMemo(() => {
    if (!search) {
      return data;
    }

    return data.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

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
        <TableColumn key="category">Kategori</TableColumn>
        <TableColumn key="action">Aksi</TableColumn>
      </TableHeader>
      <TableBody items={paginatedGames} emptyContent="Tidak ada game">
        {(game) => (
          <TableRow key={game.id}>
            <TableCell key="name">{game.name}</TableCell>
            <TableCell key="code">{game.code}</TableCell>
            <TableCell key="category">
              <Chip className="capitalize" color={game.category === "game" ? "success" : "secondary"}>
                {game.category === "game" ? "Game" : "Lainnya"}
              </Chip>
            </TableCell>
            <TableCell key="action" className="space-y-3 lg:space-x-3 lg:space-y-0">
              <Button as={Link} href={`/dashboard/admin/manage-game/${game.id}`} isIconOnly color="warning">
                <Icon icon="lucide:edit" className="text-base" />
              </Button>
              <DeleteGame game={game} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
