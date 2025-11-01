import { Request, Response } from 'express';
import { InvoiceWebhookService } from '../services/invoice-service.service';

export const InvoiceWebhookController = async (request: Request, response: Response) => {
  try {
    await InvoiceWebhookService(await request.body)
    return response.status(200).json({
      ok:true
    })
  } catch (error) {
    console.log(error)
    return response.send(error)
  }
}