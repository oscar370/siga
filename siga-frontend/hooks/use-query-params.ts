import { initialPagination } from "@/lib/constants";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export function useQueryParams() {
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [search, setSearch] = useState("");

  function handleSearchChange(value: string) {
    setSearch(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }

  return {
    pagination,
    search,
    setPagination,
    handleSearchChange,
  };
}
