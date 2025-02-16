import { FC } from "react";

import { PrismaClient } from "@prisma/client";

import Link from "next/link";
import Image from "next/image";

const prisma = new PrismaClient();

export const OtherGame: FC = async () => {
  const games = await prisma.game.findMany({
    where: {
      category: {
        equals: "other",
      },
    },
  });

  return games.map((game) => {
    return (
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
    );
  });
};
