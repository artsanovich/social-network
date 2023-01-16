import React, { useState } from "react";
import classes from './Paginator.module.css'
import { NavLink } from 'react-router-dom';
import classnames from "classnames"

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
    totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {    
    
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(Math.floor(currentPage/10) + 1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
    <div className={classes.paginator}>
        {
            portionNumber > 1 &&
            <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>
        }
        {
        pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map(page => {
            return <span
                className={classnames({
                    [classes.selectedPage] : currentPage === page
                }, classes.pageNumber)}
                key={page}
                onClick={() => onPageChanged(page)}
            >{page}</span>
        })}
        {
            portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>
        }
    </div>
    )
}

export default Paginator;