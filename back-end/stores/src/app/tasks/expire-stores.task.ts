import { Prisma } from "@/config/prisma.config";

export const ExpireTrialStore = async () => {
    try {
        console.log('[Task] - ExpireTrialStore')
        const findStore = await Prisma.stores.findMany();
        
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7); // Subtrai 3 dias da data atual

        for (const store of findStore) {
            if (store.due_date <= currentDate && store.store_status == 'activated' && store.store_trial) {
                await Prisma.stores.update({
                    where: { id: store.id },
                    data: { store_status: 'expired', store_trial:false  },
                });
                console.log(`Loja com ID ${store.id} expirada. (TrialPlan)`);
        }
    }
    } catch (error) {
        console.log("[Error - Task]:", error)
    }
};


export const ExpireStore = async () => {
   try {
        console.log('[Task] - ExpireStore')
        const findStore = await Prisma.stores.findMany();

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 35);

        for (const store of findStore) {
            if (store.due_date <= currentDate && store.store_status == 'activated' && !store.store_trial) {
                await Prisma.stores.update({
                    where: { id: store.id },
                    data: { store_status: 'expired' },
                });
                console.log(`Loja com ID ${store.id} expirada.`);
            }
    }
   } catch (error) {
        console.log("[Error - Task]:", error)
   }
};
