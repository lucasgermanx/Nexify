export function CalculateTimeResendToken(data: string): number {
    const dataInicial = new Date(data);
    const dataAtual = new Date();

    const diferencaEmMilissegundos = dataAtual.getTime() - dataInicial.getTime();
    const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

    return diferencaEmMinutos;
}