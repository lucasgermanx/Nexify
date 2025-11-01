import { Request, Response } from 'express';

import contentUploadFilesService from '../services/content-upload-files.service';

class ContentUpdateFilesController {

  public async UpdateFiles(request: Request, response: Response) {
    try {
      const contentBody = await request.body;

      if (!request.files || !(request.files as Express.Multer.File[]).length) {
        return response.status(400).json({
          failed: true,
          message: "A imagem precisa ser enviada."
        });
      }

      const files = request.files as Express.Multer.File[];
      const base64Images: string[] = files.map(file => file.buffer.toString("base64"));

      const updateFilesResult = await contentUploadFilesService.UploadFile({
        ...contentBody,
        images: base64Images[0],
      })
      return response.status(updateFilesResult.status).json(updateFilesResult);
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        messsage: "Não foi possível prosseguir com a atualização desse arquivo! Tente novamente mais tarde.",
        status: 500,
        failed: true
      })
    }
  }
}

export default new ContentUpdateFilesController()