import { NavLink, withRouter } from 'react-router-dom';
import { withState } from '../../blog-context';
import * as actionTypes from '../../store/actionTypes';
import './NavBar.css';

const NavBar = (props) => {

    const authHandler = () => {
        if(props.state.user) {
            props.dispatch({ type: actionTypes.LOGOUT });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }else {
            props.history.push('/auth');
        }
    };

    return (
        <div className="navbar">
            <ul className="navbar-items">
                <li className="navbar-item">
                    <NavLink to="/" className="active">
                        Home
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/add-blog">
                        Add Blog
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/blogs">
                        My Blogs
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <button onClick={authHandler}>
                        <p>{props.state.user !== null ? "Logout" : "Login"}</p>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(withState(NavBar));