export function getStoreLocalStorage() {
    // Verifica se o localStorage está disponível no navegador
    if (typeof localStorage !== 'undefined') {
        // Obtém o valor armazenado na chave 'defaultStore'
        const defaultStore = localStorage.getItem('defaultStore');

        // Verifica se o valor foi encontrado e se é uma string válida em JSON
        if (defaultStore) {
            try {
                const companyObject = JSON.parse(defaultStore);
                // Verifica se o objeto tem a propriedade 'state' e 'store_reference'
                if (companyObject && companyObject.state && companyObject.state.store_reference) {
                    // Retorna o valor de 'store_reference'
                    return companyObject.state.store_reference;
                }
            } catch (error) {
                console.error('Erro ao analisar JSON:', error);
            }
        }
    }

    // Retorna uma string vazia se algo der errado ou se 'store_reference' não for encontrado
    return '';
}
