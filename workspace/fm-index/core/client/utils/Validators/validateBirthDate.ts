export function validateBirthDate(birthDate: string){
    const currentDate = new Date();
    const inputDate = new Date(birthDate);
  
    // Verifica se a data de nascimento é válida
    if (isNaN(inputDate.getTime())) {
      return {
        isValid: false,
        message: "Data de nascimento inválida."
      };
    }
  
    // Verifica se a pessoa tem mais de 16 anos
    const ageInYears = currentDate.getFullYear() - inputDate.getFullYear();
    const isOver16 = ageInYears > 16 || (ageInYears === 16 && currentDate.getMonth() > inputDate.getMonth());
  
    if (!isOver16) {
      return {
        isValid: false,
        message: "Você deve ter mais de 16 anos."
      };
    }
  
    return {
      isValid:true
    };
}
  