/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";

/* Import */
import './Home.css'
import LiveABC_logo from '../../resource/LiveABC-logo.png';

function Card(props) {
    return (
        <div className="col-12 col-sm-6 col-md-4 p-2">
            <div className="home-card p-4" style={{ minHeight: '13rem' }} >
                <div className="d-flex justify-content-center p-2">
                    <img style={{ width: '50%' }} src={props.src} alt={props.alt} />
                </div>
                <div className="d-flex justify-content-center p-2">
                    {props.intro}
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <Link className="btn btn-outline-primary btn-lg" to={props.to}><i className="fa fa-arrow-right"></i></Link>
                </div>
            </div>
        </div>
    );
}

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
                    <div className="col-12 p-4 text-muted">
                        <div className="d-flex justify-content-center p-2">
                            <h3 className="font-weight-light"><i className="fa fa-tools p-1"></i> TOOLBOX</h3>
                        </div>
                    </div>

                    <Card intro="LiveABC 解答工具 (For NPTU)" src={LiveABC_logo} alt="LiveABC_logo" to="/LiveABC"></Card>

                </div>
            </div>
        );
    }
}

export default Home;
