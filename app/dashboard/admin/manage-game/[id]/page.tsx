import { FC } from "react";

import { PrismaClient } from "@prisma/client";

type Props = {
  params: Promise<{ id: string }>;
};

const prisma = new PrismaClient();

const Page: FC<Props> = async ({ params }) => {
  const { id } = await params;

  const game = await prisma.game.findUnique({
    where: {
      id,
    },
  });

  return <h1>ini game yang namanya {game?.name}</h1>;
};

export default Page;
