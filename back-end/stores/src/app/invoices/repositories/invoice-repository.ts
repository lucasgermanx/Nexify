import { Prisma } from "@/config/prisma.config"
import { generateReferenceUtils } from "@/utils/generate-reference.utils"

class InvoicesRepository{
    public async findInvoiceBySubscriptionID(subscription_id:string){
        return await Prisma.invoices.findFirst({
            where:{
                subscription_id
            }
        })
    }

    public async create(data:any){
        await Prisma.invoices.create({
            data:{
                invoice_reference:generateReferenceUtils("invoice"),
                subscription_id: data.subscription,
                payment_id: data.id,
                status: data.status,
                invoiceUrl: data.invoiceUrl || 'Sem dados',
                invoiceNumber: data.invoiceNumber || 'Sem dados',
                paymentDate: data.paymentDate || 'Sem dados',
                creditDate: data.creditDate || 'Sem dados',
                transactionReceiptUrl: data.transactionReceiptUrl || 'Sem dados',
            }
        })
    }

    public async updateInvoice(payment_id:string, data:object){
        await Prisma.invoices.update({
            where:{
                payment_id
            },
            data:{
                ...data,
            }
        })
    }
}

export default new InvoicesRepository()