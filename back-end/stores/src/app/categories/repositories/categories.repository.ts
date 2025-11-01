import { Prisma } from "@/config/prisma.config";
import { ICategoryCreate } from "@/interfaces/categories/categories-create.interface";
import { ICategoryDelete } from "@/interfaces/categories/categories-delete.interface";
import { ICategoryUpdate } from "@/interfaces/categories/categories-update.interface";
import { generateReferenceUtils } from "@/utils/generate-reference.utils";

class CategoriesRepository {
    public async findCategory(store_reference: string, category: string) {
        return await Prisma.categories.findMany({
            where: {
                store_reference: store_reference,
                category: category,
                deletedAt: null
            },
        });
    }

    public async create(createPayload: ICategoryCreate){
        return await Prisma.categories.create({
            data: {
              category_reference: generateReferenceUtils('category'),
              category_slug: createPayload.category,
              ...createPayload,
            },
        });
    }

    public async findCategoryByReference(category_reference:string){
        return  await Prisma.categories.findMany({
            where: {
                category_reference: category_reference,
                deletedAt: null
            },
        });
    }

    public async updateCategory(updatePayload:ICategoryUpdate){
        return await Prisma.categories.update({
            where: {
                category_reference: updatePayload.category_reference,
            },
            data: {
                category: updatePayload.category,
                category_icon: updatePayload.category_icon,
                category_slug: updatePayload.category_slug
            },
        });
    }

    public async deleteCategory(updatePayload:ICategoryDelete){
        return await Prisma.categories.update({
            where: {
                category_reference: updatePayload.category_reference,
            },
            data: {
                deletedAt: new Date()
            },
        });
    }

    public async totalCount(store_reference:string){
        return await Prisma.categories.count({
            where: {
                store_reference: store_reference,
                deletedAt: null
            },
        });
    }
    
    public async findCategoriesPagination(store_reference: string, filter: string | undefined, skip: number, take: string) {
        return await Prisma.categories.findMany({
            where: { 
                store_reference: store_reference,
                deletedAt: null,
                ...(filter && { 
                    OR: [
                        {
                            category: {
                                contains: filter,
                            },
                        },
                        {
                            category_reference: {
                                contains: filter,
                            },
                        },
                        {
                            category_slug: {
                                contains: filter,
                            },
                        },
                    ],
                }),
            },
            skip,
            take: parseInt(take),
            include: {
                products: {
                    where:{
                        deletedAt:null
                    }
                },
            },
        });
    }
    
}

export default new CategoriesRepository()