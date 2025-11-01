import { MercadoPagoAddTokenController } from '@/app/payments/mercadopago/controllers/mercadopago-addtoken.controller';
import { MercadoPagoCallbackController } from '@/app/payments/mercadopago/controllers/mercadopago-callback.controller';
import { MercadoPagoGenerateLinkController } from '@/app/payments/mercadopago/controllers/mercadopago-generate-link.controller';
import { Application } from 'express';

const MercadoPagouRouter = (app: Application): void => {
    app.post('/store/payment/mercadopago/update', MercadoPagoAddTokenController);
    app.post('/store/mercadopago/generate-link', MercadoPagoGenerateLinkController);
    app.post('/store/mercadopago/payment/callback/:store_reference', MercadoPagoCallbackController)
}

export default MercadoPagouRouter