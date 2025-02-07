"use client";

import { FC } from "react";

import { Pagination as BasePagination, PaginationProps } from "@heroui/pagination";

type Props = Pick<PaginationProps, "page" | "total" | "onChange"> & {
  totalGame: number;
};

export const Pagination: FC<Props> = ({ totalGame, page, total, onChange }) => {
  return (
    <div className="flex w-full items-center justify-between px-3">
      <p className="text-sm font-medium text-gray-200">Total {totalGame} game</p>
      <BasePagination
        isCompact
        showControls
        page={page}
        total={total}
        onChange={onChange}
        classNames={{ cursor: "rounded-full" }}
      />
    </div>
  );
};
