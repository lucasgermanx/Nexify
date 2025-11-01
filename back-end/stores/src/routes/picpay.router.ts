import { PicPayAddTokenController } from '@/app/payments/picpay/controllers/picpay-addtoken.controller';
import { PicPayGenerateLinkController } from '@/app/payments/picpay/controllers/picpay-generate-link.controller';
import { PicPayCallbackController } from '@/app/payments/picpay/controllers/pícpay-callback.controller';
import { Application } from 'express';

const MercadoPagouRouter = (app: Application): void => {
    app.post('/store/payment/picpay/update', PicPayAddTokenController);
    app.post('/store/picpay/generate-link', PicPayGenerateLinkController);
    app.post('/store/picpay/payment/callback/:store_reference', PicPayCallbackController)
}

export default MercadoPagouRouter