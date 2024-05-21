export class User {
    username : string = '';
    password : string = '';

    constructor(userName : string, userPass : string){
        this.username = userName;
        this.password = userPass;
    }


    // falta registrar
}

export class UserResponse {
    userId : number = 0;
    accessToken : string = '';
}