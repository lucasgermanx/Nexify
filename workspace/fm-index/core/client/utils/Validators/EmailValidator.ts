class EmailValidator {
  public validate(email: string): string[] | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);

    const errors: string[] = [];

    if (!isValidFormat) {
      errors.push("O endereço de e-mail deve estar em um formato válido.");
    }

    return errors.length > 0 ? errors : null;
  }
}

export default new EmailValidator()