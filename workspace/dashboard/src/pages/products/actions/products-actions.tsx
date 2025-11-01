import { useEffect, useState } from "react";

import { useProducts } from "@/core/client/providers/products/products.provider";
import { IVariables } from "@/core/client/providers/variables/variables-provider.types";
import { useVariables } from "@/core/client/providers/variables/variables.provider";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { defaultImage } from "./default-image";

export const ProductsCreateAction = () => {
  const { variables, ProviderGetAllVariables } = useVariables();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [variablesSelected, setVariablesSelected] = useState<IVariables[]>([])
  const { ProviderCreateProduct } = useProducts();

  useEffect(() => {
    ProviderGetAllVariables("1", "300")
  }, [])

  const onSubmit = (data: any) => {

    if(data.product_stock <= 0){
      return toast.warning("O estoque do produto precisa ser maior que 0")
    }

    ProviderCreateProduct({
      ...data,
      images: images ? images : defaultImage,
      variables: variablesSelected.map((variable) => variable.variable_reference),
      product_description: description,
    });
    reset()
    setDescription("")
    setImages("")
    setVariablesSelected([])
  };

  const handlerSelectVariable = (value:string) => {
    if(variables){
      const variable = variables.find((v) => v.variable_reference === value);
      if(variable){
        const alreadySelected = variablesSelected.some(
          (selected: IVariables) => selected.variable_reference === variable.variable_reference
        );

        console.log(alreadySelected)
        if (!alreadySelected) {
          setVariablesSelected((prev) => [...prev, variable]);
        }
      }
    }
  }

  const handlerRemoveVariable = (value: string) => {
    setVariablesSelected((prev) =>
      prev.filter((selected: IVariables) => selected.variable_reference !== value)
    );
  };

  
  //transformando as variáveis em um formato compatível com o select
  const variablesOptions = variables?.map((item: any) => ({
    label: item.option_name,
    value: item?.variable_reference,
  }));

  return {register,  handleSubmit: handleSubmit(onSubmit), setValue, description, setDescription, images, setImages, handlerSelectVariable, variablesOptions, variablesSelected, handlerRemoveVariable}
};

export const ProductsModalUpdateHandler = () => {
  const [showModalUpdateProducts, setShowModalUpdateProducts] = useState(false);

  const handleCloseModalUpdateProducts = () =>
    setShowModalUpdateProducts(false);
  const handleShowModalUpdateProducts = () => setShowModalUpdateProducts(true);

  return {
    showModalUpdateProducts,
    handleCloseModalUpdateProducts,
    handleShowModalUpdateProducts,
  };
};

export const ProductsUpdateHandler = () => {
  const { variables, ProviderGetAllVariables } = useVariables();
  const { register, handleSubmit, setValue, getValues} = useForm();
  const [images, setImages] = useState<any>();
  const [description, setDescription] = useState("");
  const [variablesSelected, setVariablesSelected] = useState<IVariables[]>([])
  const {ProviderProductUpdate} = useProducts()

  useEffect(() => {
    ProviderGetAllVariables("1", "300")
  }, [])
  
  const onSubmit = (data: any) => {
    if(data.product_stock <= 0){
      return toast.warning("O estoque do produto precisa ser maior que 0")
    }

    ProviderProductUpdate({
      ...data,
      images: images,
      variables: variablesSelected.map((variable) => variable.variable_reference),
      product_description: description
   });
  };

  const handlerSelectVariable = (value:string) => {
    if(variables){
      const variable = variables.find((v) => v.variable_reference === value);
      if(variable){
        const alreadySelected = variablesSelected.some(
          (selected: IVariables) => selected.variable_reference === variable.variable_reference
        );

        if (!alreadySelected) {
          setVariablesSelected((prev) => [...prev, variable]);
        }
      }
    }
  }

  const handlerRemoveVariable = (value: string) => {
    setVariablesSelected((prev) =>
      prev.filter((selected: IVariables) => selected.variable_reference !== value)
    );
  };

  const variablesOptions = variables?.map((item: any) => ({
    label: item.option_name,
    value: item?.variable_reference,
  }));

  useEffect(()=>{
    const variablesArray = getValues("variables")?.split(",").map((value:any) => value.trim())
    for(const x in variablesArray){
      handlerSelectVariable(variablesArray[x])
    }
  }, [getValues("variables")])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    onSubmit,
    setValue,
    setImages,
    setDescription,
    description,
    images,
    handlerSelectVariable,
    variablesOptions,
    variablesSelected,
    handlerRemoveVariable
  };
};
