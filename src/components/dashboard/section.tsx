import { FC, PropsWithChildren } from "react";

type Walah = {
  name: string;
};

export const Section: FC<PropsWithChildren<Walah>> = ({ name, children }) => {
  return (
    <div className="mx-auto max-w-screen-lg px-6">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="mt-3">{children}</div>
    </div>
  );
};
