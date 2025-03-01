import type { Game, Field, Server } from "@prisma/client";

type Response = {
  success: boolean;
  message: string;
};

type GameFromAPI = Pick<Game, "name" | "code"> & {
  active: boolean;
  icon_url: string;
};

type EnhancedGame = Game & {
  fields: Field[];
  servers: Server[];
};

export type { Response, GameFromAPI, EnhancedGame };
