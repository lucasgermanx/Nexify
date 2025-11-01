export type IResponseProvider = {
  failed: boolean;
  message: string;
  status: string;
};

export interface IPagination {
  paginationCount: number,
  hasMoreResults: boolean
}