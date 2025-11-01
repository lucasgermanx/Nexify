import { useState } from "react";
import { useForm } from "react-hook-form";
import useContent from "../hook";

export const TemplateSEOHandler = () => {
    const { register, handleSubmit, setValue} = useForm();
    const [description, setDescription] = useState('')
    const {ProviderUpdate} = useContent()
  
    const onSubmit = (data: any) => {
      ProviderUpdate({
        title: data.title,
        description: description
      })
    };
  
    return {register, handleSubmit: handleSubmit(onSubmit), setDescription, description, setValue}
  }
  
  export const TemplateWidgetHandler = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {ProviderUpdate} = useContent()

    const onSubmit = (data: any) => {
      ProviderUpdate({
        widget_discord: data.widget_discord,
        widget_fiveM: data.widget_fiveM
      })
    };
  
    return {widget_register:register, widgetSubmit: handleSubmit(onSubmit), widget_setValue:setValue}
  }