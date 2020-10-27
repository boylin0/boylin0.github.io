import React from 'react';

import { Link } from "react-router-dom";

class Navbar extends React.Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#"><Link to="/"><i className="fa fa-home text-light"></i></Link></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link className="text-dark" to="/">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">HOME</a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
