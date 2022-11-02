import { NavLink } from "react-router-dom";

function Nav({status}) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Municipalities Services</span>
                            <div className="navbar-collapse">
                                <div className="navbar-nav">
                                    {status === 2 || status === 3 || status === 4 ? <NavLink to="/" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink> : null}
                                    {status === 3 ? <NavLink to="/municipalities" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Municipalities</NavLink> : null}
                                    {status === 3 ? <NavLink to="/services" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink> : null}
                                    {status === 3 ? <NavLink to="/comments" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Comments</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                                    {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Nav;