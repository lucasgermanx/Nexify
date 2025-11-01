import { Prisma } from "@/config/prisma.config";

class ContentRepository {
  async storeUpdate(store_reference: string, upload: any): Promise<any> {
    return await Prisma.contents.update({
      where: {
        store_reference: store_reference,
      },
      data: {
        ...upload
      },
    });
  }

  async contentUpdate(store_reference: string, data: any): Promise<any> {
    console.log(store_reference, data)
    return await Prisma.contents.update({
      where: {
        store_reference: store_reference,
      },
      data: {
        ...data
      },
    });
  }
}

export default new ContentRepository();
