type PaginationData<T> = {
  page: number;
  limit: number;
  results: T[];
}

export default PaginationData;