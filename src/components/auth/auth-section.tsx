import { FC, PropsWithChildren } from "react";

import { Divider } from "@heroui/divider";

type Props = {
  title: string;
  subtitle: string;
};

export const AuthSection: FC<PropsWithChildren<Props>> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-screen-md px-6 py-4">
      <div className="w-full">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm font-medium text-default-500">{subtitle}</p>
      </div>
      <div className="py-4">
        <Divider />
      </div>
      {children}
    </div>
  );
};
