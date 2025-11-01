class CPFValidator {
    public validate(cpf: string): string[] | null {
      // Remover caracteres não numéricos do CPF
      cpf = cpf.replace(/\D/g, '');
  
      // Verificar se o CPF tem 11 dígitos
      if (cpf.length !== 11) {
        return ['O CPF deve ter 11 dígitos.'];
      }
  
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(cpf)) {
        return ['O CPF não pode ter todos os dígitos iguais.'];
      }
  
      // Calcular o primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      let digit1 = remainder > 9 ? 0 : remainder;
  
      // Calcular o segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      let digit2 = remainder > 9 ? 0 : remainder;
  
      // Verificar se os dígitos verificadores estão corretos
      if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
        return ['O CPF é inválido.'];
      }
  
      // Se todas as verificações passarem, o CPF é válido
      return null;
    }
  }
  
  export default new CPFValidator();
  