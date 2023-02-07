import { PhotosType, ProfileType } from '../types/Types';
import { instance, ResponseType, ResultCodeEnum } from './Api';

type UpdateStatusTextType = {
    data: {
        status: string
    }
}

type SavePhotoType = {
    photos: PhotosType
}

type SaveProfileType = {
    data: ProfileType
}


export const profileAPI = {
    setProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`).then(resp => resp.data)
    },
    getStatusText(userId: number | null) {
        return instance.get<string>(`profile/status/${userId}`).then(resp => resp.data)
    },
    updateStatusText(statusText: string) {
        return instance.put<ResponseType<UpdateStatusTextType>>(`profile/status`, {status: statusText}).then(resp => resp.data)
    },
    savePhoto(photo: any) {
        const formData = new FormData();
        formData.append('image', photo)

        return instance.put<ResponseType<SavePhotoType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType<SaveProfileType>>(`profile`, profile).then(resp => resp.data)
    }
}