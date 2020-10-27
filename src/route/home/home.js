import React from 'react';

import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="container p-5">
                <div class="row">
                    <h2 className="font-weight-light"><a href="https://github.com/boylin0">BOYLIN0</a>'s Github Pages</h2>
                </div>
                <div class="row">
                    <div class="col-12 mt-3">
                        <h4 className="font-weight-light"><i class="fa fa-wrench p-1"></i> Toolbox</h4>
                    </div>
                    <div class="col-12 mt-1">
                        <Link  class="btn btn-info text-white" to="/liveABC">LiveABC Tool</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
