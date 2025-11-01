export function generateRandomToken(): string {
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        token += caracteresPermitidos.charAt(indiceAleatorio);
    }

    return token;
}
