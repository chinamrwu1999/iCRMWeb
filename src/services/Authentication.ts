

 class User{
    Name : string=''
    UserId : string=''
    Role : string=''
    constructor(){ }
    
    isAuthenticated(){
        return this.Name!='' && this.UserId!=''
    }

}
const user=new User()
export default user
