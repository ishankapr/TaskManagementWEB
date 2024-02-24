export class LoginRequest {
    username!: string;
    password!: string;

    constructor(request: LoginRequest){
        this.username = request.username
        this.password = request.password
    }
}
