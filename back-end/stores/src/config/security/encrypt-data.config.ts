import * as fs from 'fs';
import * as forge from 'node-forge';
import dotenv from 'dotenv';
dotenv.config();

// Função para ler o conteúdo da chave do arquivo
function readKeyFromFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

// Função para criptografar dados usando a chave pública
function encryptData(data: string, publicKey: string): string {
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObj.encrypt(data, 'RSA-OAEP', {
    md: forge.md.sha256.create()
  });

  return forge.util.encode64(encrypted);
}

const publicKeyFilePath = process.env.ZEUS_PATH as string;
// Função para criptografar dados e retornar o resultado criptografado
export function encryptAndReturnData(data: string): string {
  const publicKey = readKeyFromFile(publicKeyFilePath);
  const encryptedData = encryptData(data, publicKey);
  return encryptedData;
}
