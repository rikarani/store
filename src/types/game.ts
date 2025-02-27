import type { Game } from "@prisma/client";

type MutateGameState = {
  success: boolean;
  message: string;
};

type GameFromAPI = Pick<Game, "name" | "code"> & {
  active: boolean;
  icon_url: string;
};

export type { MutateGameState, GameFromAPI };
