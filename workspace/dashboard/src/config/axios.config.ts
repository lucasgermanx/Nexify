/* eslint-disable @typescript-eslint/ban-ts-comment */
// Importação da biblioteca axios

import axios from 'axios';
import Cookies from 'universal-cookie';

// Importação das classes CredentialsConfig e ProtectionConfig da pasta Security

//@ts-ignore
const cookies = new Cookies();
/**
 * Classe AxiosConfig: Possui configurações para serem utilizadas pelo axios
 */
class AxiosConfig {
  /**
   * Criação de uma instância axios
   * baseURL: Define a URL base para as requisições
   * headers: Define o tipo de conteúdo a ser enviado nas requisições e adiciona o token de autorização
   */
  static instance = axios.create({
    baseURL: 'https://api.fivemarket.com.br/',
    timeout: 10000,
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0,8',
      'Authorization': `Bearer ${cookies.get("fm_token")}`
    } //10 segundos
  });
}

// Exporta a classe AxiosConfig como padrão
export default AxiosConfig.instance;