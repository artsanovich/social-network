import React, { useEffect } from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/reduxStore";
import { requestUsersThunkCreator } from "../../redux/usersReducer";
import { getPageSize, getFollowingProgress, getIsFetching, getCurrentPage, getTotalUsersCount } from "../../redux/usersSelectors";
import Preloader from "../common/Preloader/Preloader";

import { Users } from "./Users";


export const UsersContainer = () => {

    const dispatch: AppDispatch = useDispatch()

    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)

    useEffect(() => {
        dispatch(requestUsersThunkCreator(currentPage, pageSize));
    }, [])

    const isFetching = useSelector(getIsFetching)

    return (<>
            {
                isFetching ? 
                <Preloader/>
                : <Users/>
            }   
            </>) 
}
