export class UserDTO{
    constructor(user){
        this.fullname = `${user.firstName} ${user.lastName}`
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.email = user.email
        this.age = user.age
        this.role = user.role
        this.isAdmin = user.isAdmin    
    }

}