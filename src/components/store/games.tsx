import { FC } from "react";

import { Prisma, PrismaClient } from "@prisma/client";

import { Divider } from "@heroui/divider";

import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();
const gameSelect: Prisma.GameSelect = {
  id: true,
  name: true,
  thumbnail: true,
  category: true,
};

export const Games: FC = async () => {
  const games = await prisma.game.findMany({
    where: {
      category: {
        equals: "game",
      },
    },
    select: gameSelect,
  });

  const other = await prisma.game.findMany({
    where: {
      category: {
        equals: "other",
      },
    },
    select: gameSelect,
  });

  return (
    <>
      <div className="batas w-4/5 px-6">
        <h2 className="text-xl font-bold">Game Populer</h2>
        <div className="batas mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {games.map((game) => (
            <Link
              key={game.name}
              href="/game/1"
              className="group relative max-w-max overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-gray-950/60 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
            >
              <Image src={game.thumbnail as string} alt={game.name} width={300} height={300} />
              <div className="absolute top-0 z-10 grid size-full place-items-center px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Divider orientation="vertical" className="h-auto" />
      <div className="batas w-1/5 px-6">
        <h2 className="text-xl font-bold">Lainnya</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {other.map((game) => (
            <Link
              key={game.name}
              href="/game/1"
              className="group relative max-w-max overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-gray-950/60 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
            >
              <Image src={game.thumbnail as string} alt={game.name} width={300} height={300} />
              <div className="absolute top-0 z-10 grid size-full place-items-center px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
