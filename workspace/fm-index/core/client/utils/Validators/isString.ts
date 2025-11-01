export function isString(dado: any): boolean {
    return /^[a-zA-Z\s]+$/.test(dado);
}