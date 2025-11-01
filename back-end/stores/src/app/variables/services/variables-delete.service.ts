import { Prisma } from "@/config/prisma.config";
import { IVariablesDelete } from "@/interfaces/variables/variables-create.interface";
import variablesRepository from "../repositories/variables.repository";

export const VariablesDeleteService = async (deletePayload: IVariablesDelete) => {
    const findVariable = await variablesRepository.findVariableByReference(deletePayload.store_reference, deletePayload.variable_reference)

    if (findVariable?.length == 0) {
        return {
            failed: true,
            status: 401,
            message: "Não foi possível deletar sua variável! Tente novamente mais tarde!",
        };
    }

    await Prisma.variables.update({
        where: {
            store_reference: deletePayload.store_reference,
            variable_reference: deletePayload.variable_reference
        },
        data:{
            deletedAt: new Date()
        }
    });

    return {
        failed: false,
        status: 200,
        message: "Variável deletada com sucesso!"
    };
}