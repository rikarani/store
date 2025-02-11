import { FC, Suspense } from "react";

import { Navbar } from "@/components/store/navbar";
import { Banner } from "@/components/store/banner";
import { AllGame } from "@/components/store/all-game";
import { OtherGame } from "@/components/store/other-game";

import { Spinner } from "@heroui/spinner";
import { Divider } from "@heroui/divider";

import suisei from "~/images/suisei.webp";

const Index: FC = () => {
  return (
    <>
      <Navbar />
      <Banner
        image={suisei}
        name="Erika Store"
        description="Platform terbaik untuk topup game dengan harga murah, proses cepat, dan keamanan terjamin."
      />
      <div className="mx-auto max-w-screen-lg space-y-4 py-4 lg:flex lg:space-y-0">
        <div className="px-6">
          <h2 className="text-xl font-bold">Game Populer</h2>
          <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
            <Suspense fallback={<Spinner />}>
              <AllGame />
            </Suspense>
          </div>
        </div>
        <Divider orientation="vertical" className="h-auto" />
        <div className="px-6">
          <h2 className="text-xl font-bold">Lainnya</h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Suspense fallback={<Spinner />}>
              <OtherGame />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
