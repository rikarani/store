import { FC } from "react";

import { Redirector } from "@/components/auth/redirector";

const Page: FC = () => {
  return (
    <div className="grid size-full place-items-center">
      <Redirector />
    </div>
  );
};

export default Page;
