import { IResponseProvider } from "@/@types/general.type";
import contentService from "@/core/server/services/content/content.service";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class ContentController {
  public async updateFiles(store_reference:string, type:string, file:File): Promise<IResponseProvider | undefined> { // Adicionado tipo de retorno opcional
    const token = cookies.get("fm_token");
    if (!token) return undefined;

    return await contentService.updateFileData(store_reference, type, token, file);
  }

  public async updateData(data:any): Promise<IResponseProvider | undefined> {
    const token = cookies.get("fm_token");
    if (!token) return undefined;

    return await contentService.updateData(token, data);
  }
}

export default new ContentController();
