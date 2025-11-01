import storeRepository from "../repositories/store.repository";

function removeKeysFromArray(array, keysToRemove) {
    return array.map(obj => {
        const newObj = { ...obj };
        keysToRemove.forEach(key => {
            delete newObj[key];
        });
        return newObj;
    });
}

function atualizarPagamentos(array) {
    return array.map(obj => {
        const novoObj = { ...obj };
        if (novoObj.mercadopago !== null) {
            novoObj.mercadopago = true;
        }
        if (novoObj.picpay !== null) {
            novoObj.picpay = true;
        }
        return novoObj;
    });
}

export const StoreService = async (dataPayload: { value: string }) => {
    const findStore = await storeRepository.filterStore(dataPayload.value)

    if (!findStore) {
        return {
            store: [],
            failed: false,
            status: 200,
            message: "Nenhuma loja encontrada com os dados informados!",
        };
    }

    const removeKeys = ["id", 'due_date', 'createdAt', 'updatedAt']

    return {
        store: atualizarPagamentos(removeKeysFromArray(findStore, removeKeys)),
        failed: false,
        status: 200,
        message: "Lojas carregadas com sucesso!",
    }
}