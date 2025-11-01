import { HermesConfiguration } from "@/Config/Hermes";

const ExpressSystem = new HermesConfiguration()

export class System{
    async Initialize(){
        ExpressSystem.startConsumers()
    }
}