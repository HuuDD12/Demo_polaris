import ApiRequest from '@/utils/ApiRequest';
import {IAuthCredentials, IUser} from "@/types/auth";

export const reqAuthLogin = async (data: IAuthCredentials) => {
    return ApiRequest.post('auth/login', data)
}
export const reqAuthLogingg = async (data: any, token: string) => {
    return ApiRequest.post('auth/google/login',{data,token})}
export const reqAuthRegister = async (data: IUser) => {
    return ApiRequest.post('auth/register', data)
}
export const reqVerifyToken = async () => {
    return ApiRequest.get('auth/verifyToken')
}
export const reqAuthLogout = async () => {
    return ApiRequest.get('auth/logout')
}

export const changePass = async (data:any) =>{
    return ApiRequest.post('auth/change',data);
}
