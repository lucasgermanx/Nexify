import { InvoiceWebhookController } from '@/app/invoices/controllers/invoice-webhook.controller';
import { Application } from 'express';

const InvoiceRouter = (app: Application): void => {
  app.post('/store/fivemarket/webhook/', InvoiceWebhookController);
}

export default InvoiceRouter
