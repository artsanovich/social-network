import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    console.log(props)
    return (
        <header className={classes.header}>
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081797.png" alt="" />

            <div className={classes.loginBlock}>
                {props.isAuth 
                ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={'/login'}>Log in</NavLink>}
                
            </div>
        </header>
    )
}

export default Header;