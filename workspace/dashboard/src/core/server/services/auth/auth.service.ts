import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const getUserData = async (token:string) => {    
    const response = await axios.get(API_URL+'/auth/user', {
        headers:{
            authorization: `${token}`,
        }
    })

    return response.data
}