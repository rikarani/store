"use client";

import { FC } from "react";

import { Tab, Tabs } from "@heroui/tabs";

import { General } from "./edit-game/general";
import { Field } from "./edit-game/field";

import type { EnhancedGame } from "@/types";
import { Server } from "./edit-game/server";

type Props = {
  game: EnhancedGame | null;
};

export const EditGame: FC<Props> = ({ game }) => {
  return (
    <Tabs aria-label="Edit Game" fullWidth>
      <Tab key="general" title="General" className="w-full">
        <General game={game} />
      </Tab>
      <Tab key="field" title="Field" className="w-full">
        <Field game={game} />
      </Tab>
      <Tab key="server" title="Server" className="w-full" isDisabled={!game?.has_server}>
        <Server />
      </Tab>
    </Tabs>
  );
};
