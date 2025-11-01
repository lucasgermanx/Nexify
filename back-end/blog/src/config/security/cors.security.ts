export const corsOptions = {
    /**
     * Origem
     * Defina uma lista de origens permitidas para `Access-Control-Allow-Origin`.
     * O valor pode ser um dos seguintes:
     *
     * - Booleano (true)    - Permite a origem da requisição atual.
     * - Booleano (false)   - Não permite nenhuma origem.
     * - String            - Lista de origens permitidas separadas por vírgula.
     * - Array             - Uma array de origens permitidas.
     * - String (*)        - Um caractere curinga (*) para permitir todas as origens de requisição.
     * - Função            - Recebe a origem atual como string e deve retornar um dos valores acima.
     */
    origin: "*",
  
    /**
     * Métodos
     * Uma array de métodos HTTP permitidos para CORS. O valor do cabeçalho
     * `Access-Control-Request-Method` é verificado nessa lista.
     */
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  
    /**
     * Headers
     * Lista de headers permitidos para o cabeçalho `Access-Control-Allow-Headers`.
     * O valor pode ser um dos seguintes:
     *
     * - Booleano (true)    - Permite todos os headers mencionados em `Access-Control-Request-Headers`.
     * - Booleano (false)   - Não permite nenhum header.
     * - String            - Lista de headers permitidos separados por vírgula.
     * - Array             - Uma array de headers permitidos.
     * - Função            - Recebe o header atual como string e deve retornar um dos valores acima.
     */
    allowedHeaders: ['Content-Type', 'Authorization'],
  
    /**
     * Expor Headers
     * Uma lista de headers a serem expostos através do cabeçalho `Access-Control-Expose-Headers`.
     * Por padrão, os seguintes 6 headers de resposta são expostos:
     *
     * - Cache-Control
     * - Content-Language
     * - Content-Type
     * - Expires
     * - Last-Modified
     * - Pragma
     *
     * Para adicionar mais headers, basta defini-los dentro desta array.
     */
    exposedHeaders: [
      'cache-control',
      'content-language',
      'content-type',
      'expires',
      'last-modified',
      'pragma',
    ],
  
    /**
     * Credenciais
     * Ativa ou desativa o cabeçalho `Access-Control-Allow-Credentials`. Se definido como `true`,
     * o cabeçalho será definido; caso contrário, não será definido.
     */
    credentials: true,
  
    /**
     * Max Age
     * Define o valor do cabeçalho `Access-Control-Max-Age` em segundos.
     */
    maxAge: 90,
  };
  