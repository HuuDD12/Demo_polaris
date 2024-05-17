export interface IAuthCredentials {
    username: string;
    password: string
}

export interface IUser extends IAuthCredentials {
    id: number;
    email: string;
    role: 'mkt' | 'cskh' | 'admin',
    full_name: string
}
