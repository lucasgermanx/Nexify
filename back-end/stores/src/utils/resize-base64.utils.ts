import sharp from 'sharp';

export async function resizeBase64Image(base64String: string, width: number, height: number): Promise<string> {
    const buffer = Buffer.from(base64String, 'base64');

    const resizedBuffer = await sharp(buffer)
        .resize({
            width: width,
            height: height,
            fit: sharp.fit.inside, // Mantém o aspect ratio original
            withoutEnlargement: true // Evita que a imagem seja ampliada
        })
        .toBuffer();

    const resizedBase64 = resizedBuffer.toString('base64');

    return resizedBase64;
}