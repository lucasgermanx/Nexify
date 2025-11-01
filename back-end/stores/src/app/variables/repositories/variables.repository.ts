import { Prisma } from "@/config/prisma.config";
import { IVariablesCreate } from "@/interfaces/variables/variables-create.interface";
import { generateReferenceUtils } from "@/utils/generate-reference.utils";

class VariablesRepository {
  public async findVariableByVariable(store_reference: string, variable: string) {
    return await Prisma.variables.findMany({
      where: {
        store_reference: store_reference,
        variable: variable,
        deletedAt: null
      },
    });
  }

  public async findVariableByReference(store_reference: string, variable_reference: string) {
    return await Prisma.variables.findMany({
      where: {
        store_reference: store_reference,
        variable_reference: variable_reference,
        deletedAt: null
      },
    });
  }

  public async createVariable(createVariablePayload: IVariablesCreate) {
    return await Prisma.variables.create({
      data: {
        variable_reference: generateReferenceUtils('variable'),
        ...createVariablePayload,
        commands: JSON.stringify(createVariablePayload.commands)
      },
    });
  }

  public async totalCount(store_reference: string) {
    return await Prisma.variables.count({
      where: {
        store_reference: store_reference,
        deletedAt: null
      },
    });
  }

  public async findVariablesPagination(store_reference: string, skip: number, take: string, filter: string | undefined) {
    return await Prisma.variables.findMany({
      where: {
        store_reference: store_reference,
        deletedAt: null,
        ...(filter && {
          OR: [{
            variable: {
              contains: filter
            }
          }, {
            variable_reference: {
              contains: filter
            }
          }]
        }),
      },
      skip,
      take: parseInt(take),
    });
  }

  public async totalCountFilter(store_reference: string, filter: string) {
    return await Prisma.variables.count({
      where: {
        store_reference: store_reference,
        deletedAt: null,
        OR: [{
          variable: {
            contains: filter
          }
        }, {
          variable_reference: {
            contains: filter
          }
        }]
      },
    });
  }

  async filterVariables(filter: string, store_reference: string, skip: number, pageSize: number) {
    return await Prisma.variables.findMany({
      where: {
        store_reference: store_reference,
        deletedAt: null,
        OR: [{
          variable: {
            contains: filter
          }
        }, {
          variable_reference: {
            contains: filter
          }
        }]
      },
      skip,
      take: pageSize,
    })
  }
}

export default new VariablesRepository();
