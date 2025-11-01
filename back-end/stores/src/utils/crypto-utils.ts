import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = '248e30ae-b6c9-4477-8735-588590a1e531';
const IV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

// Função para criptografar dados
export function encryptData(data: string): string {
    const ciphertext = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, { iv: IV });
    return ciphertext.toString();
}

// Função para descriptografar dados
export function decryptData(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY, { iv: IV });
    return bytes.toString(CryptoJS.enc.Utf8);
}