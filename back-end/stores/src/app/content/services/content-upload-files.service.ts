import storeRepository from "@/app/store/repositories/store.repository";
import contentRepository from "../repositories/content.repository";

class ContentUploadFilesService {
  public async UploadFile(dataPayload: any): Promise<any> {
    const verifyExistingStore = await storeRepository.storeFindByReference(dataPayload.store_reference);

    if (!verifyExistingStore) {
      return {
        failed: true,
        status: 200,
        message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
      };
    }

    const store_reference = dataPayload.store_reference;
    //@ts-ignore
    delete dataPayload.store_reference;

    const updateContent = await contentRepository.contentUpdate(store_reference, {
      [dataPayload.type]: dataPayload.images
    });

    if (!updateContent) {
      return {
        failed: true,
        status: 200,
        message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
      };
    }

    return {
      failed: false,
      status: 200,
      message: "Arquivo atualizado com sucesso!"
    };
  }
}

export default new ContentUploadFilesService();
