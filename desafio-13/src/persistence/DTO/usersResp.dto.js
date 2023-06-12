export class UserDTOResponse{
    constructor(user){
        this.fullname = user.fullname
        this.password = user.password
        this.email = user.email
    }
}