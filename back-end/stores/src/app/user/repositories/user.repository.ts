import { Prisma } from "@/config/prisma.config";

class UserRepository {
    async findUser(user_reference: string, email: string) {
        return await Prisma.Users.findFirst({
            where: {
                user_reference,
                email
            },
        });
    }

    async findDiscordId(user_discord: string) {
        return await Prisma.Users.findFirst({
            where: {
                user_discord
            }
        })
    }

    async findUserByReference(user_reference: string) {
        return await Prisma.Users.findFirst({
            where: {
                user_reference,
            },
        });
    }
}

export default new UserRepository();
