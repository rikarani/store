import { FC } from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  image: string | StaticImageData;
  name: string;
  description: string;
};

export const Banner: FC<Props> = ({ image, name, description }) => {
  return (
    <div className="relative h-48 lg:h-60">
      <div className="absolute inset-0 -z-10 after:absolute after:inset-0 after:bg-white/50 dark:after:bg-gray-950/70 sm:after:bg-transparent sm:after:bg-gradient-to-r sm:after:from-white/95 sm:after:to-white/25 sm:dark:after:bg-transparent sm:dark:after:from-gray-950/95 sm:dark:after:to-gray-950/25">
        <Image priority src={image} alt="Banner" className="size-full object-cover object-center" />
      </div>
      <div className="mx-auto flex h-full max-w-screen-lg flex-col justify-center px-6">
        <h1 className="text-3xl font-bold text-gray-950 dark:text-cyan-500 lg:text-5xl">{name}</h1>
        <h2 className="mt-3 max-w-lg text-lg/relaxed font-semibold lg:text-xl/relaxed">{description}</h2>
      </div>
    </div>
  );
};
