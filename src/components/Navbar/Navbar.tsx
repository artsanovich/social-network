import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={classes.nav}>
        <div className={classes.item}><NavLink to="/profile">profile</NavLink></div>
        <div className={classes.item}><NavLink to="/dialogs">messages</NavLink></div>
        <div className={classes.item}><NavLink to="/users">users</NavLink></div>
      </nav>
    )
}

export default Navbar;