/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import Lottie from 'lottie-react-web';
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';

/* Import */
import './Home.css'
import LiveABC_logo from '../../resource/LiveABC-logo.png';
import spaceBackground_animation from '../../resource/lottie-animation/space.json'

var wow = new WOW.WOW(
    {
        boxClass: 'wow',             // animated element css class (default is wow)
        animateClass: 'animated',    // animation css class (default is animated)
        offset: 0,                   // distance to the element when triggering the animation (default is 0)
        mobile: true,                // trigger animations on mobile devices (default is true)
        live: false,                 // act on asynchronously loaded content (default is true)
        scrollContainer: null        // optional scroll container selector, otherwise use window
    }
);
wow.init();

function Card(props) {
    return (
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-2">
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

    componentDidMount() {
        wow.sync();
    }

    render() {
        return (
            <div className="bg-white pb-5">

                <div className="home-background-container">
                    <div className="home-background-animation">
                        <Lottie
                            options={{
                                animationData: spaceBackground_animation,
                            }}
                            speed={0.5}
                            ariaRole="none"
                        />
                    </div>
                    <div className="wow fadeIn home-background-text text-white w-100 h-100 p-4" data-wow-duration="3s" data-wow-delay="0.5s">
                        <div className="d-flex justify-content-center h-100">
                            <h1 className="d-block d-sm-block d-md-none font-weight-lighter text-center" style={{ fontSize: '10vw' }}>
                                <a className="text-white hover-text" style={{ textDecoration: 'none' }} href="https://github.com/boylin0"><i className="fab fa-github"></i> BOYLIN0</a>
                                <br />
                                Github Pages
                            </h1>
                            <h1 className="d-none d-md-block font-weight-lighter text-center justify-content-center align-self-center" style={{ marginTop: '-20%', fontSize: '5rem' }}>
                                <a className="text-white hover-text" style={{ textDecoration: 'none' }} href="https://github.com/boylin0"><i className="fab fa-github"></i> BOYLIN0</a>
                                <br />
                                Github Pages
                            </h1>
                        </div>
                    </div>

                </div>

                <div className="p-5 bg-white">



                    <div className="row">
                        <div className="col-12 p-4 text-muted">
                            <div className="d-flex justify-content-center p-2">
                                <h3 className="font-weight-light"><i className="fa fa-tools p-1"></i> TOOLBOX</h3>
                            </div>
                        </div>

                        <Card intro="LiveABC 解答工具 (For NPTU)" src={LiveABC_logo} alt="LiveABC_logo" to="/LiveABC"></Card>

                    </div>
                </div>
            </div>

        );
    }
}

export default Home;
