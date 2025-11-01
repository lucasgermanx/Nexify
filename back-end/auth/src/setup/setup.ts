import { AuthEvents } from "@/app/auth/events/auth.events"
import { ExpressConfiguration } from "@/config/express.config"

const ExpressSystem = new ExpressConfiguration()

export class System{
    async Initialize(){
        AuthEvents()
        ExpressSystem.App()
        ExpressSystem.startApp()
    }
}