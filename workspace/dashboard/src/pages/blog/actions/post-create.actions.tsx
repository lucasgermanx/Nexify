import { useAuth } from "@/core/client/providers/auth/auth.provider";
import { useBlog } from "@/core/client/providers/blog/blog.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const BlogHandler = () => {
    const [description, setDescription] = useState("");
    const { user } = useAuth();
    const [images, setImages] = useState("");
    const { register, handleSubmit, reset} = useForm();
    const {ProviderCreatePost} = useBlog();

    const onSubmit = (data: any) => {
      ProviderCreatePost({
        ...data,
        post_description: description,
        images: images,
        author: user?.name,
        user_reference: user?.user_reference
      })

      reset()
    };
  
  
    return {
      register,
      onSubmit,
      handleSubmit,
      setImages,
      images,
      setDescription,
      description,
    };
  };