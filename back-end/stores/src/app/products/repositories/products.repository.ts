import { generateReferenceUtils } from "@/utils/generate-reference.utils";

import { Prisma } from "@/config/prisma.config";
import { IProductCreate } from "@/interfaces/products/products-create.interface";
import { IProductUpdate } from "@/interfaces/products/products-update.interface";

class ProductsRepositories {
    public async findProductByName(product_name: string, store_reference: string) {
        return await Prisma.products.findMany({
            where: {
                product_name: product_name,
                store_reference: store_reference,
                deletedAt: null
            },
        });
    }

    public async createProduct(data: IProductCreate) {
        return await Prisma.products.create({
            data: {
                product_reference: generateReferenceUtils('product'),
                store_reference: data.store_reference,
                category_reference: data.category_reference,
                product_name: data.product_name,
                product_description: data.product_description,
                product_price: data.product_price,
                product_price_discount: data.product_price_discount,
                product_visibility: data.product_visibility,
                variables: data.variables,
                product_stock: data.product_stock,
                expire_day: data.expire_day,
                product_image: data.product_image
            }
        });
    }

    public async findProductByReference(store_reference: string, product_reference: string) {
        console.log(store_reference, product_reference)
        return await Prisma.products.findMany({
            where: {
                store_reference,
                product_reference,
                deletedAt: null
            }
        })
    }

    public async deleteProduct(product_reference: string) {
        return await Prisma.products.update({
            where: {
                product_reference: product_reference
            },
            data:{
                deletedAt: new Date
            }
        });
    }

    public async totalCount(store_reference: string) {
        return await Prisma.products.count({
            where: {
                store_reference: store_reference,
                deletedAt: null
            },
        });
    }

    public async findProductsPagination(store_reference: string, skip: number, take: number) {
        return await Prisma.products.findMany({
            where: { store_reference: store_reference, deletedAt: null},
            skip,
            take: take,
        });
    }

    public async totalCountFilter(store_reference: string, filter: string) {
        return await Prisma.products.count({
            where: {
                store_reference: store_reference,
                OR: [
                    { category_reference: filter },
                    { product_reference: filter },
                    { product_name: { contains: filter } }
                ],
                deletedAt: null
            }
        });
    }

    async filterProducts(filter: string, store_reference: string, skip: number, pageSize: number) {
        return await Prisma.products.findMany({
            where: {
                store_reference: store_reference,
                OR: [
                    { category_reference: filter },
                    { product_reference: filter },
                    { product_name: { contains: filter } }
                ],
                deletedAt: null
            },
            skip,
            take: pageSize,
        })
    }

    public async updateProduct(data: IProductUpdate) {
        return await Prisma.products.update({
            where: {
                product_reference: data.product_reference
            },
            data: {
                category_reference: data.category_reference,
                product_name: data.product_name,
                product_description: data.product_description,
                product_price: data.product_price,
                product_price_discount: data.product_price_discount,
                product_visibility: data.product_visibility,
                variables: data.variables,
                product_stock: data.product_stock,
                expire_day: data.expire_day,
                product_image: data.product_image
            }
        });
    }

    public async totalCountTemplate(store_reference: string) {
        return await Prisma.products.count({
            where: {
                store_reference: store_reference,
                product_visibility: "public",
                deletedAt: null
            },
        });
    }

    public async findProductsPaginationTemplate(store_reference: string, skip: number, take: number) {
        return await Prisma.products.findMany({
            where: { store_reference: store_reference, product_visibility: "public", deletedAt: null},
            skip,
            take: take,
        });
    }

    public async updateStock(product_reference: string, product_stock: number) {
        return await Prisma.products.update({
            where: {
                product_reference: product_reference
            },
            data: {
                product_stock: product_stock,
            }
        });
    }
}

export default new ProductsRepositories()