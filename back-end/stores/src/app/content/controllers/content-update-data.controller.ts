import { Request, Response } from 'express';

import contentUpdateDataService from '../services/content-update-data.service';

class ContentUpdateController {

  public async Update(request: Request, response: Response) {
    try {
      const updatePayload = await request.body
      const updateContentResult = await contentUpdateDataService.UpdateService(updatePayload)
      return response.status(updateContentResult.status).json(updateContentResult);
    } catch (error) {
      return response.status(500).json({
        messsage:"Não foi possível prosseguir com a atualização da sua loja",
        status:500,
        failed:true
      })
    }
  }
}

export default new ContentUpdateController()