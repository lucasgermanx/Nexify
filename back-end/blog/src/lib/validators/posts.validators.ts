import * as yup from 'yup';

export  const PostsCreateValidator = yup.object({
  user_reference: yup.string().required(),
  store_reference: yup.string().required(),
  author: yup.string().required(),
  post_title: yup.string().required(),
  post_description: yup.string().required(),
});


export const PostUpdateValidator = yup.object({
  user_reference: yup.string().required(),
  store_reference: yup.string().required(),
  post_reference: yup.string().required(),
  author: yup.string().required(),
  post_title: yup.string().required(),
  post_description: yup.string().required(),
});