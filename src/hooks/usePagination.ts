import { Routes } from "@/constants/routes";
import { useState } from "react";

export const usePagination = (paths: Routes[]) => {
  const [currentIndexRoute, setCurrentIndexRoute] = useState(0);
  const totalPages = paths.length;
  const currentPage = paths[currentIndexRoute];
  const nextPage = currentIndexRoute < totalPages - 1;
  const previousPage = currentIndexRoute > 0;

  const toNextPage = () => {
    if (!nextPage) return;
    setCurrentIndexRoute((prev) => prev + 1);
  };

  const toPreviousPage = () => {
    if (previousPage) return;
    setCurrentIndexRoute((prev) => prev + 1);
  };

  const toFirstPage = () => setCurrentIndexRoute(0);
  const toLastPage = () => setCurrentIndexRoute(totalPages - 1);

  return {
    totalPages,
    currentPage,
    nextPage: currentIndexRoute < totalPages - 1,
    previousPage: currentIndexRoute > 0,
    toNextPage,
    toPreviousPage,
    toFirstPage,
    toLastPage
  };
};

