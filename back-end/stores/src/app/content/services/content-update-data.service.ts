import storeRepository from "@/app/store/repositories/store.repository";
import contentRepository from "../repositories/content.repository";

class ContentUpdateService {
  public async UpdateService(updatePayload: any): Promise<any> {
    
    const verifyExistingStore = await storeRepository.storeFindByReference(
      updatePayload.store_reference
    );

    if (!verifyExistingStore) {
      return {
        failed: true,
        status: 200,
        message:
          "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
      };
    }

    const store_reference = updatePayload.store_reference
    
    //@ts-ignore
    delete updatePayload.store_reference
    const updateContent = await contentRepository.contentUpdate(store_reference, updatePayload)

    if(!updateContent){
        return {
            failed: true,
            status: 200,
            message:
              "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
          };
    }

    return {
        failed: false,
        status: 200,
        message:"A loja foi atualizada com sucesso. Todas as alterações foram aplicadas com êxito."
    };
  }
}

export default new ContentUpdateService();
