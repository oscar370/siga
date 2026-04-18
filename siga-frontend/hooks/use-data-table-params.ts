import { useState } from "react";

type UseDataTableParamsProps = {
  initialPage?: number;
  initialPageSize?: number;
  initialSearch?: string;
};

export function useDataTableParams({
  initialPage = 1,
  initialPageSize = 10,
  initialSearch = "",
}: UseDataTableParamsProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState(initialSearch);

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    queryParams: {
      PageNumber: page,
      PageSize: pageSize,
      SearchTerm: search.trim(),
    },
  };
}
