import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '512a09b5-5004-4a81-a184-420afe4ade63'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(resp => resp.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    setProfile(userId) {
        console.warn('Obsolete method. Use profileAPI object')
        return profileAPI.setProfile(userId)
    }
}

export const profileAPI = {
    setProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatusText(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatusText(statusText) {
        return instance.put(`profile/status`, {status: statusText})
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append('image', photo)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}


export const authAPI = {
    auth() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}