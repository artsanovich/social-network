import React from "react";
import { NavLink } from 'react-router-dom';

import classes from '.././Dialogs.module.css';

type PropsType = {
    id: number,
    name: string
}

const DialogItem = (props: PropsType) => {
    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;