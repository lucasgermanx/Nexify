import { useAuth } from "@/core/client/providers/auth/auth.provider";
import { useBlog } from "@/core/client/providers/blog/blog.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const BlogUpdateHandler = () => {
  const { user } = useAuth();
    const { register, handleSubmit, setValue } = useForm();
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<any>("");
    const {ProviderUpdatePost} = useBlog()
    
    const onSubmit = (data: any) => {
        console.log(data)
        ProviderUpdatePost({
            ...data,
            post_description: description,
            images: images,
            author: user?.name,
            user_reference: user?.user_reference
          })
    };
  
    return {
      register,
      handleSubmit,
      onSubmit,
      setValue,
      setDescription,
      description,
      setImages,
      images
    };
  };
  
  export const BlogModalUpdateHandler = () => {
    const [showModalUpdatePosts, setShowModalUpdatePosts] = useState(false);
  
    const showModalUpdateAction = () => {
      setShowModalUpdatePosts(true);
    };
  
    const closeModalUpdateAction = () => {
      setShowModalUpdatePosts(false);
    };
  
    return {
      showModalUpdateAction,
      closeModalUpdateAction,
      showModalUpdatePosts,
    };
  };