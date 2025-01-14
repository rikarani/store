import { FC } from "react";

import { Navbar } from "@/components/ui/navbar";
import { Banner } from "@/components/ui/banner";

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
      {/* <div className="mx-auto max-w-screen-lg space-y-4 px-6 py-4 lg:flex lg:gap-6 lg:space-y-0 lg:divide-x-1 lg:divide-red-500">
        <div>
          <h2 className="text-xl font-bold">Game Populer</h2>
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {result.data.map((game) => {
              return (
                <Link
                  key={game.name}
                  href="/game/1"
                  className="group relative max-w-max overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-gray-950/60 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
                >
                  <Image src={game.icon_url} alt={game.name} width={300} height={300} />
                  <div className="absolute top-0 z-10 grid size-full place-items-center px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white">{game.name}</h3>
                      <p className="text-white">{game.name}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <div className="lg:ml-6">
            <h2 className="text-xl font-bold">Game Lainnya</h2>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2">
              {result.data.map((game) => {
                return (
                  <Link
                    key={game.name}
                    href="/game/1"
                    className="group relative max-w-max overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-gray-950/60 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
                  >
                    <Image src={game.icon_url} alt={game.name} width={300} height={300} />
                    <div className="absolute top-0 z-10 grid size-full place-items-center px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white">{game.name}</h3>
                        <p className="text-white">{game.name}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Index;
