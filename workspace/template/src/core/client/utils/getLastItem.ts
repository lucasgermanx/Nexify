export function getLastItem(arr:any){
    if (arr?.length == 0 || arr == undefined) {
        return undefined; // Retorna undefined se o array estiver vazio
    }
    return arr[arr?.length - 1]; // Retorna o último item do array
}
