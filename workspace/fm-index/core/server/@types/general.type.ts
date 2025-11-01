export type IResponseProvider = {
  failed: boolean;
  error?: string;
};

export interface ErrorInfo {
  key?: any;
  type: string;
  isInvalid: boolean;
  message: string;
}
