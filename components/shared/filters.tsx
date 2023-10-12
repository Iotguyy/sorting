"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Binary,
  Droplets,
  GitMerge,
  ListPlus,
  LucideIcon,
  MousePointer,
  PictureInPicture2,
  Pin,
} from "lucide-react";

import { useFilters } from "@/hooks/useFilters";

type Filter = {
  id: AlgoId | string;
  route: string;
  name: string;
  icon: LucideIcon;
};

const Filters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const filters = useFilters();

  const allFilters: Filter[] = [
    {
      id: "bubble-sort",
      route: "/algorithms/sorting/bubble-sort",
      name: "Bubble Sort",
      icon: Droplets,
    },
    {
      id: "selection-sort",
      route: "/algorithms/sorting/selection-sort",
      name: "Selection Sort",
      icon: MousePointer,
    },
    {
      id: "insertion-sort",
      route: "/algorithms/sorting/insertion-sort",
      name: "Insertion Sort",
      icon: PictureInPicture2,
    },
    {
      id: "merge-sort",
      route: "/algorithms/sorting/merge-sort",
      name: "Merge Sort",
      icon: GitMerge,
    },
    {
      id: "soon",
      route: "",
      name: "More Soon!",
      icon: ListPlus,
    },
    // {
    //   id: "quick-sort",
    //   route: "/algorithms/sorting/quick-sort",
    //   name: "Quick Sort",
    //   icon: Pin,
    // },
    // {
    //   id: "binary-search",
    //   route: "/algorithms/searching/binary-search",
    //   name: "Binary Search",
    //   icon: Binary,
    // },
  ];

  // -----------
  // USE EFFECTS
  // -----------

  useEffect(() => {
    const checkFiltersClose = () => {
      if (window.innerWidth < 1024 && filters.isOpen && !filters.isAware) {
        filters.onClose();
        filters.onAware();
      } else if (
        window.innerWidth >= 1024 &&
        (!filters.isOpen || filters.isAware)
      ) {
        filters.onOpen();
        filters.onNotAware();
      }
    };

    checkFiltersClose();

    window.addEventListener("resize", checkFiltersClose);
    return () => window.removeEventListener("resize", checkFiltersClose);
  }, [filters]);

  useEffect(() => {
    const active = allFilters.find((filter) => filter.route === pathname);
    filters.setActiveFilter(active!.name);
  }, [pathname]);

  return (
    filters.isOpen && (
      <div className="fixed left-0 flex justify-center items-center bg-white border-y border-neutral-200 shadow-sm px-8 sm:px-14 w-screen h-filters z-50">
        <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-8 2xl:gap-x-10 overflow-x-scroll no-scrollbar">
          {allFilters.map((filter) => {
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                className={`flex flex-col items-center gap-y-3 border-neutral-800 py-[10px] w-28 min-w-[112px] h-full focus:outline-none 
                ${
                  filter.route === pathname
                    ? "text-neutral-800 border-b-2"
                    : `text-neutral-500 ${
                        filter.id !== "soon" && "hover:text-neutral-800"
                      }`
                }
                ${filter.id === "soon" && "cursor-default"}`}
                onClick={() => router.push(`${filter.route}`)}
              >
                <Icon size={26} strokeWidth={1.5} />
                <p className="text-sm font-medium">{filter.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Filters;
