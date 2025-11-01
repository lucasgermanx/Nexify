export function getAddressStore(): string {
    const regex = /^(?:https?:\/\/)?((?:[\w\d-]+)\.(?:[\w\d-]+\.[\w\d-]+(?:\.[a-z]{2,})?(?:\.br)?))(.*)?$/;
    const match = window.location.hostname.match(regex);
    if (match && match.length >= 2) {
        return match[1];
    } else {
        return "Domínio inválido";
    }
}