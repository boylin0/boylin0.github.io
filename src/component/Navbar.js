import React from 'react';

import { Link } from "react-router-dom";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultRoute: props.defaultRoute
        };

        this.nav_item = [
            { title: 'Home', url: '/' },
        ];

        this.navigate = this.navigate.bind(this);
    }

    navigate(url) {
        this.setState((state, props) => ({
            defaultRoute: url
        }));
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><i className="fa fa-home text-light"></i></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            this.nav_item.map((nav, index) =>
                                <li
                                    key={index}
                                    className={`nav-item ${this.state.defaultRoute === nav.url ? `active` : ``}`}
                                    onClick={() => this.navigate(nav.url)}
                                >
                                    <Link className="nav-link" to={nav.url}>{nav.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
