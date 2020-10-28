import React from 'react';

import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container p-5">
                <div className="row">
                    <h2 className="font-weight-light"><a href="https://github.com/boylin0">BOYLIN0</a>'s Github Pages</h2>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        <h4 className="font-weight-light"><i className="fa fa-wrench p-1"></i> Toolbox</h4>
                    </div>
                    <div className="col-12 mt-1">
                        <Link  className="btn btn-info text-white" to="/liveABC">LiveABC Tool</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
