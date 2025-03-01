import { FC, Suspense } from "react";

import { Games } from "@/components/store/games";
import { Navbar } from "@/components/store/navbar";
import { Banner } from "@/components/store/banner";

import { Spinner } from "@heroui/spinner";

import suisei from "~/images/suisei.webp";

const Index: FC = async () => {
  return (
    <>
      <Navbar />
      <Banner
        image={suisei}
        name="Erika Store"
        description="Platform terbaik untuk topup game dengan harga murah, proses cepat, dan keamanan terjamin."
      />
      <div className="mx-auto max-w-screen-lg space-y-4 py-4 lg:flex lg:space-y-0">
        <Suspense fallback={<Spinner className="mx-auto" />}>
          <Games />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
