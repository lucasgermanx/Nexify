import { ExpressConfiguration } from "@/config/express.config"

const ExpressSystem = new ExpressConfiguration()

export class System{
    async Initialize(){
        ExpressSystem.App()
        ExpressSystem.startApp()
    }
}