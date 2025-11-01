import { FastifyReply, FastifyRequest } from 'fastify';

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({
            error: 'Unauthorized',
            message: 'Você não tem autorização para realizar esta requisição.',
        });
    }
};