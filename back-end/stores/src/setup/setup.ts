import { ExpireStore, ExpireTrialStore } from "@/app/tasks/expire-stores.task";
import { ExpressConfiguration } from "@/config/express.config";
import * as cron from 'node-cron';

const ExpressSystem = new ExpressConfiguration()

export class Task{

    async ExpireAllStores(){
        cron.schedule('* * * * *', ExpireTrialStore);
        cron.schedule('* * * * *', ExpireStore);
    }

}

export class System{
    async Initialize(){
        ExpressSystem.App()
        ExpressSystem.startApp()
        new Task().ExpireAllStores()
    }
}