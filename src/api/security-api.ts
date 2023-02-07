import { instance } from './Api';

type GetCaptchaUrlType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`).then(resp => resp.data)
    }
}