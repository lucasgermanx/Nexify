import couponsCreateController from '@/app/coupons/controllers/coupons-create.controller';
import couponsDeleteController from '@/app/coupons/controllers/coupons-delete.controller';
import couponsUpdateController from '@/app/coupons/controllers/coupons-update.controller';
import couponsController from '@/app/coupons/controllers/coupons.controller';
import { Application } from 'express';

const CouponsRouter = (app: Application): void => {
  
  app.get('/store/coupons/:store', couponsController.Index);
  app.get('/store/coupon/:store_reference/:coupon', couponsController.GetCouponByName);
  app.get('/store/coupons/filter/:store/:coupon', couponsController.Filter);

  app.post('/store/coupons/create', couponsCreateController.Create);
  app.post('/store/coupons/delete', couponsDeleteController.Delete);
  app.post('/store/coupons/update', couponsUpdateController.Update);
  app.post('/store/store/coupons/update/uses', couponsUpdateController.UsageCoupon);

}

export default CouponsRouter