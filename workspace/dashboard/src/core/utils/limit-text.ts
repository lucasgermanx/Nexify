export function limitText(texto:string) {
    if (texto.length <= 200) {
        return texto
    } else {
        return texto?.slice(0, 200) + '...';
    }
}