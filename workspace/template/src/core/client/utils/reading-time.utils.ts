function ReadingTime(text: string): string {
    const wordsPerMinute = 200; // Média de palavras lidas por minuto
    const wordCount = text.split(/\s+/).length; // Contagem de palavras no texto
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute); // Cálculo do tempo de leitura em minutos

    if (readingTimeMinutes === 1) {
        return `Menos de um minuto`;
    } else {
        return `${readingTimeMinutes} minutos de leitura`;
    }
}

export default ReadingTime