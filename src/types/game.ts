import type { Game } from "@prisma/client";

type Response = {
  success: boolean;
  message: string;
};

type GameFromAPI = Pick<Game, "name" | "code"> & {
  active: boolean;
  icon_url: string;
};

export type { Response, GameFromAPI };
