import proxy from "@fastify/http-proxy";
import { FastifyInstance } from "fastify";
import { proxyRoutes } from "./routing/routing";
export const ProxyConfiguration = (app: FastifyInstance) => {
    proxyRoutes.forEach((route) => {
        app.register(proxy, {
            upstream: route.target,
            http2: route.http2,
            prefix: route.prefix,
            preValidation: route.preValidation,
            rewritePrefix:"",
            httpMethods: route.httpMethods
        })
    });
}