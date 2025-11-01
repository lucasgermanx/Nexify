export const FormHandler = (validators:any, setDataForm:any) => {
  const addForm = (type: any, value: any) => {
    const validator = validators[type];

    if (validator && validator(value)) {
      setDataForm((prevData: any) => ({ ...prevData, [type]: value }));
    }
  };

  return {addForm}
};
