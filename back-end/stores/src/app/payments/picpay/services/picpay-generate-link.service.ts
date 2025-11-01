import couponsRepository from "@/app/coupons/repositories/coupons.repository";
import productsRepository from "@/app/products/repositories/products.repository";
import { generateReferenceUtils } from "@/utils/generate-reference.utils";
import transactionsRepository from "../../transactions/repositories/transactions.repository";
import picpayRepository from "../repositories/picpay.repository";
import { decryptData } from "@/utils/crypto-utils";

export interface IPicPayGenerateLink {
    store_reference: string;
    buyer: string;
    coupon: string;
    cart: {
        product_reference: string;
        quantity: number;
        variable: string;
    }[];
}

interface ICart {
    product_reference: string;
    quantity: number;
};

function generateExpiresAt() {
    const now = new Date();
    const expiresAt = new Date(now.getFullYear(), now.getMonth() + (now.getDate() > 24 ? 1 : 0), 24, 23, 59, 59);
    return expiresAt.toISOString();
}

const handleCouponDiscount = (totalValue: any, coupon: any) => {
    if (!coupon || coupon == 0) {
        return 0;
    }

    if (coupon.type === "percentage") {
        return (totalValue * coupon.coupon_discount) / 100;
    } else if (coupon.type === "direct") {
        return coupon.coupon_discount;
    }
}

export const PicPayGenerateLinkService = async (dataPayload: IPicPayGenerateLink) => {
    const getTokens = await picpayRepository.getTokens(dataPayload.store_reference)

    if (!getTokens) {
        return {
            failed: true,
            status: 401,
            message:
                "Lamentamos informar que não foi possível gerar o link de pagamento. Tente novamente mais tarde.",
        };
    }

    const productsList: any = []

    for (let x in dataPayload.cart) {
        const products = await productsRepository.findProductByReference(dataPayload.store_reference, dataPayload.cart[x].product_reference)


        if (products?.length != 0) {
            productsList.push(products[0])
        }
    }

    const calculePrices = dataPayload.cart.map((cartItem: ICart) => {
        const product = productsList.find((product: any) => product.product_reference === cartItem.product_reference);
        const price = parseFloat(product.product_price_discount) !== 0 ? parseFloat(product.product_price_discount) : parseFloat(product.product_price);
        return price * cartItem.quantity;
    });

    const totalPrice = calculePrices.reduce((acc: any, curr: any) => acc + curr, 0);
    const coupon = !dataPayload.coupon ? 0 : await couponsRepository.getCoupon(dataPayload.store_reference, dataPayload.coupon)

    if (coupon != 0) {
        if (coupon.activated == false) {
            return {
                failed: true,
                status: 401,
                message: "Infelizmente o cupom informado é invalido! Tente novamente.",
            };
        }
    }

    const transaction_reference = generateReferenceUtils("transaction")

    for (let x in dataPayload.cart) {
        const product = productsList.find((product: any) => product.product_reference === dataPayload.cart[x].product_reference);

        const createTransaction = await transactionsRepository.createTransactions({
            transaction_reference: transaction_reference,
            buyer: dataPayload.buyer,
            store_reference: dataPayload.store_reference,
            product_reference: dataPayload.cart[x].product_reference,
            price_paid: parseFloat(product.product_price_discount) !== 0 ? parseFloat(product.product_price_discount) : parseFloat(product.product_price),
            coupon: coupon == 0 ? "Nenhum" : coupon.coupon,
            coupon_discount: coupon == 0 ? 0 : coupon.coupon_discount,
            coupon_type: coupon == 0 ? "Nenhum" : coupon.type,
            form_of_payments: "picpay",
            variable: dataPayload.cart[x].variable,
            quantity: dataPayload.cart[x].quantity
        });


        if (!createTransaction) {
            return {
                failed: true,
                status: 401,
                message:
                    "Lamentamos informar que não foi possível gerar o link de pagamento. Tente novamente mais tarde.",
            };
        }
    }

    const preferences = {
        referenceId: transaction_reference,
        callbackUrl: `https://api.fivemarket.com.br/store/picpay/payment/callback/${dataPayload.store_reference}`,
        returnUrl: "http://fivemarket.com.br",
        value: totalPrice - handleCouponDiscount(totalPrice, coupon == 0 ? 0 : coupon),
        expiresAt: generateExpiresAt(),
        channel: "fivemarket-clientes",
        purchaseMode: "in-store",
    };

    const generateLink = await picpayRepository.generateLink(preferences, decryptData(getTokens.picpayToken))

    return {
        failed: false,
        status: 200,
        message: "Link de pagamento gerado com sucesso",
        url: generateLink.data.paymentUrl
    };
}