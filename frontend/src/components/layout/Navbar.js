import {Link, useNavigate} from 'react-router-dom'
import classes from './Navbar.module.css';

const Navbar = () => {
    
    const navigate = useNavigate();

    const redirectLogin = () => {
        navigate('/login');
    }
    
    return (
        <header className={classes.header}>
        <Link to='/'>
            <div className={classes.logo}>TITA</div>
        </Link>
        <nav>
            <ul>
                <li>
                    <Link to='/homepage'>Clients</Link>
                </li>
                <li>
                    <Link to='/homepage'>Solutions</Link>
                </li>
                <li>
                    <Link to='/homepage'>Contact Us</Link>
                </li>
                <li>
                    <button onClick={redirectLogin}>Login</button>
                </li>
            </ul>
        </nav>
        </header>
    )
}

export default Navbar;