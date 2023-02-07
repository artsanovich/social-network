import { UserType } from '../types/Types';
import { GetUsersType, instance, ResponseType } from './Api';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`).then(resp => resp.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(resp => resp.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(resp => resp.data)
    }
}