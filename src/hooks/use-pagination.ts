// hooks/usePagination.ts
import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialResultsPerPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  currentData: T[];
  setCurrentPage: (page: number) => void;
  setResultsPerPage: (results: number) => void;
}

export function usePagination<T>({
  data,
  initialResultsPerPage = 10
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPageState] = useState(initialResultsPerPage);

  const totalPages = useMemo(
    () => Math.ceil(data.length / resultsPerPage),
    [data.length, resultsPerPage]
  );

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return data.slice(startIndex, startIndex + resultsPerPage);
  }, [data, currentPage, resultsPerPage]);

  const setResultsPerPage = (results: number) => {
    setResultsPerPageState(results);
    setCurrentPage(1); // Reset to first page when changing results per page
  };

  return {
    currentPage,
    resultsPerPage,
    totalPages,
    currentData,
    setCurrentPage,
    setResultsPerPage
  };
}