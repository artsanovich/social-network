import axios from "axios";
import { ProfileType, UserType } from "../types/Types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '512a09b5-5004-4a81-a184-420afe4ade63'
    }
});

export type ResponseType<D= {}, RC= ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}


export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
