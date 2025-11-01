export type ResponseHandler = {
  status: number;
  failed: boolean;
  message: string;
  token?: string;
  activated?:false,
};
