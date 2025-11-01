import { StoreCancelController } from '@/app/store/controllers/store-cancel.controller';
import { StoreCreateController } from '@/app/store/controllers/store-create.controller';
import { StoreSubscriptionUser } from '@/app/store/controllers/store-subscription.controller';
import { StoreUpdatePlanController } from '@/app/store/controllers/store-update-plan.controller';
import { StoreUpdateController } from '@/app/store/controllers/store-update.controller';
import { StoreController } from '@/app/store/controllers/store.controller';
import { Application } from 'express';

const StoreRouter = (app: Application): void => {

    app.post('/store/create', StoreCreateController);
    app.post('/store/cancel', StoreCancelController);
    app.put('/store/update', StoreUpdateController)
    app.post('/store/update/plan', StoreUpdatePlanController)
    app.get('/store/:value', StoreController)
    app.get('/store/subscription/user/:store_reference', StoreSubscriptionUser)
}

export default StoreRouter