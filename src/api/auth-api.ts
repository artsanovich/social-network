import { instance, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum } from './Api';


type AuthResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    data: {
        userId: number
    }
}

export const authAPI = {
    auth() {
        return instance.get<ResponseType<AuthResponseDataType>>(`auth/me`).then(resp => resp.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum> >(`auth/login`, {email, password, rememberMe, captcha})
            .then(resp => resp.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
