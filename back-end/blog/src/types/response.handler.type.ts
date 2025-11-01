export type ResponseHandler = {
    status: number;
    failed: boolean;
    message: string;
    posts?: [];
    paginationCount?: number,
    hasMoreResults?: boolean,
  };
  