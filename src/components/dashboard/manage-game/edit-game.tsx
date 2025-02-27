"use client";

import { FC } from "react";
import { Game } from "@prisma/client";

import { Tab, Tabs } from "@heroui/tabs";

type Props = {
  game: Game | null;
};

export const EditGame: FC<Props> = ({ game }) => {
  return (
    <Tabs aria-label="Edit Game" size="sm">
      <Tab key="general" title="General" className="w-full">
        <h1>general</h1>
      </Tab>
      <Tab key="field" title="Field" className="w-full">
        <h1>field</h1>
      </Tab>
      <Tab key="server" title="Server" className="w-full" isDisabled={!game?.has_server}>
        <h1>muncul kalo game ada pilihan server</h1>
      </Tab>
    </Tabs>
  );
};
