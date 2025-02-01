import { FC } from "react";

import { Spinner } from "@heroui/spinner";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const Page: FC = () => {
  return (
    <div className="grid size-full place-items-center">
      <Spinner size="lg" />
      <AuthenticateWithRedirectCallback />
    </div>
  );
};

export default Page;
