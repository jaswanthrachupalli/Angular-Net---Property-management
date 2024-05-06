export interface UserForRegister {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: number;

}

export interface UserForLogin {
    userName: string;
    password: string;
    token: string;
}
