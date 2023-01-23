import React, { useState } from "react";
import classes from './Paginator.module.css'
import { NavLink } from 'react-router-dom';
import classnames from "classnames"
import { Button, Pagination } from "antd";

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
            <Button disabled={portionNumber <= 1} onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</Button>
        }
        {
        pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map(page => {
            return <div className={classes.pageNumberWrapper}>
                <span
                    className={classnames({
                        [classes.selectedPage] : currentPage === page
                    }, classes.pageNumber)}
                    key={page}
                    onClick={() => onPageChanged(page)}
                >{page}</span>
            </div>
        })}
        {
            
            <Button disabled={ portionNumber > portionCount - 1} onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</Button>
        }
    </div>
    )
}

export default Paginator;