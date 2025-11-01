export interface ProxyConfig {
    prefix: string | undefined;
    target: string;
    http2?: boolean;
    preValidation?: (request: any, reply: any) => Promise<void>;
    httpMethods: string[]
}