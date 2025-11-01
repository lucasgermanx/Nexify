import userRepository from "./repositories/user.repository"

class UserService{
    public async GetUserByReference(user_reference:string){
        const findUser = await userRepository.findUserByReference(user_reference)

        if(!findUser){
            return{
              status:200,
              failed: true,
              message: "Nenhum usuário encontrato com essa referência"
            }
        }

        delete findUser.password

        return {
            user: findUser,
            failed:false,
            message:"Usuário encontrado com sucesso!",
            status:200,
        }
    }
}

export default new UserService()