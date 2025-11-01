import { env } from "@/environments/env";
import { ProxyConfig } from "@/types/proxy.type";

export const proxyRoutes: ProxyConfig[] = [
    {
        prefix: '/auth',
        target: env.AUTH_SERVICE,
        http2: false,
        preValidation: undefined,
        httpMethods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']
    },
    {
        prefix: '/store',
        target: env.STORE_SERVICE,
        http2: false,
        preValidation: undefined,
        httpMethods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']
    },
    {
        prefix: '/posts',
        target: env.BLOG_SERVICE,
        http2: false,
        preValidation: undefined,
        httpMethods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']
    },
    {
        prefix: '/user',
        target: env.USER_SERVICE,
        http2: false,
        preValidation: undefined,
        httpMethods: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS']
    }
];
