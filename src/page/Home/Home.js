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

    goMyGithub() {
        window.location.href = 'https://github.com/boylin0';
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
                        <div className="d-flex flex-column justify-content-center h-100">
                            <h1 className="d-block d-sm-block d-md-none font-weight-lighter text-center" style={{ fontSize: '10vw' }}>
                                <a target="_blank" className="text-white hover-text" style={{ textDecoration: 'none' }} href="https://github.com/boylin0"><i className="fab fa-github"></i> BOYLIN0</a>
                                <br />
                                Github Pages
                            </h1>
                            <h1 className="d-none d-md-block font-weight-lighter text-center justify-content-center align-self-center" style={{ marginTop: '-20%', fontSize: '5.5rem' }}>
                                <a target="_blank" className="text-white hover-text" style={{ textDecoration: 'none' }} href="https://github.com/boylin0"><i className="fab fa-github"></i> BOYLIN0</a>
                                <br />
                                Github Pages
                            </h1>
                        </div>
                    </div>

                </div>

                {/* Application */}
                <div className="text-center">
                    <h3 className="m-3 gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900' }}>My Application</h3>
                </div>

                {/* Application: FlappyBird */}
                <section className="row m-0 d-flex align-items-center justify-content-center wow fadeIn">
                    <div className="col-12 col-sm-6 p-3">
                        <img src={require('../../resource/home-section-flappybird.svg').default}></img>
                    </div>
                    <div className="col-12 col-sm-6 p-3 text-center wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-3">
                            <h2>FlappyBird</h2>
                            <p>A FlappyBird game created with <a target="_blank" href="https://www.pixijs.com/">pixi.js</a>.</p>
                        </div>
                        <Link className="btn btn-outline-primary btn-lg" to={"/FlappyBird"} style={{ minWidth: '150px' }}><i className="fa fa-arrow-right"></i> GO</Link>
                    </div>
                </section>

                {/* Application: LiveABC */}
                <section className="row m-0 d-flex align-items-center justify-content-center wow fadeIn">
                    <div className="col-12 col-sm-6 p-3 text-center wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-3">
                            <h2>LiveABC自動產生解答工具</h2>
                            <small className="text-muted">(For NPTU only)</small>
                        </div>
                        <Link className="btn btn-outline-primary btn-lg" to={"/LiveABC"} style={{ minWidth: '150px' }}><i className="fa fa-arrow-right"></i> GO</Link>
                    </div>
                    <div className="col-12 col-sm-6 p-3">
                        <img src={require('../../resource/home-section-liveabc.svg').default}></img>
                    </div>

                </section>


                {/* About Me */}
                <div className="text-center">
                    <h3 className="m-3 gradient-text" style={{ fontSize: '2.5rem', fontWeight: '900' }}>About Me</h3>
                </div>

                {/* About Me: Content */}
                <section className="p-5 bg-white wow fadeIn">
                    <div className="row">
                        <div className="col-12 col-lg-6 text-center text-lg-right mb-3">
                            <img style={{ maxWidth: '100%', Width: '100%', height: '100%' }} src={"https://github-readme-stats.vercel.app/api?username=boylin0&count_private=true&show_icons=true&icon_color=fff&bg_color=30,e96443,904e95&title_color=fff&text_color=fff"} />
                        </div>
                        <div className="col-12 col-lg-6 text-center text-lg-left mb-3">
                            <img style={{ maxWidth: '100%', Width: '100%', height: '100%' }} src={"https://github-readme-stats.anuraghazra1.vercel.app/api/top-langs/?username=boylin0&layout=compact&bg_color=30,e96443,904e95&title_color=fff&text_color=fff"} />
                        </div>
                    </div>
                </section>

            </div>

        );
    }
}

export default Home;
