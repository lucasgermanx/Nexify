class PasswordValidator {
    public validate(password: string): string[] | null {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  
      const errors: string[] = [];
  
      if (password.length < minLength) {
        errors.push(`A senha deve ter pelo menos ${minLength} caracteres. <br/>`);
      }
  
      if (!hasUpperCase) {
        errors.push('A senha deve conter pelo menos uma letra maiúscula. <br/>');
      }
  
      if (!hasLowerCase) {
        errors.push('A senha deve conter pelo menos uma letra minúscula. <br/>');
      }
  
      if (!hasDigit) {
        errors.push('A senha deve conter pelo menos um dígito. <br/>');
      }
  
      if (!hasSpecialChar) {
        errors.push('A senha deve conter pelo menos um caractere especial. <br/>');
      }
  
      return errors.length > 0 ? errors : null;
    }
  }
  
export default new PasswordValidator()