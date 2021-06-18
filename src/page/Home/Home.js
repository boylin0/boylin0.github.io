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
        this.lastScroll = 0;
    }

    componentDidMount() {
        document.title = `BOYLIN0's Github Pages`;
        wow.sync();
        window.addEventListener('scroll', this.fullPageMagnet);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.fullPageMagnet);
    }

    goMyGithubRepo() {
        window.open('https://github.com/boylin0?tab=repositories', '_blank');
    }

    fullPageMagnet() {
        this.lastScroll = new Date().getTime();
        if (typeof this._magnetDelay !== 'undefined') clearTimeout(this._magnetDelay);
        this._magnetDelay = setTimeout(() => {
            let allSections = document.querySelectorAll('.page-section');
            for (let i = 0; i < allSections.length; i++) {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let topInRange = scrollTop > allSections[i].offsetTop - (allSections[i].offsetHeight / 2);
                let bottomInRange = scrollTop < allSections[i].offsetTop + (allSections[i].offsetHeight / 2);
                if (i == 0) {
                    topInRange = scrollTop > allSections[i].offsetTop - 50;
                }
                if (i == allSections.length - 1) {
                    bottomInRange = scrollTop < allSections[i].offsetTop + (allSections[i].offsetHeight / 3);
                }

                if (topInRange && bottomInRange) {
                    window.scrollTo({ top: allSections[i].offsetTop, behavior: 'smooth' });
                    break;
                }
            }
        }, 500);

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
                    <h3 className="m-3 gradient-text display-4" style={{ fontWeight: '900' }}>My Online Apps</h3>
                </div>

                {/* Application: FlappyBird */}
                <section className="container">
                    <div className="page-section row m-0 p-4 d-flex align-items-center justify-content-center">
                        <div className="col-12 col-md-6 wow fadeIn">
                            <img src={require('../../resource/section-flappybird.svg').default}></img>
                        </div>
                        <div className="col-12 col-md-6 text-center wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-3">
                                <h2>FlappyBird</h2>
                                <p>A FlappyBird game created with <a target="_blank" href="https://www.pixijs.com/">pixi.js</a>.</p>
                            </div>
                            <Link className="btn btn-outline-primary btn-lg" to={"/FlappyBird"} style={{ minWidth: '150px' }}><i className="fa fa-arrow-right"></i> GO</Link>
                        </div>
                    </div>
                </section>

                {/* Application: LiveABC */}
                <section className="container">
                    <div className="page-section row m-0 p-4 d-flex align-items-center justify-content-center flex-row-reverse">
                        <div className="col-12 col-md-6 p-3 wow fadeIn">
                            <img src={require('../../resource/section-liveabc.svg').default}></img>
                        </div>
                        <div className="col-12 col-md-6 p-3 text-center wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-3">
                                <h2>LiveABC自動產生解答工具</h2>
                                <small className="text-muted">(For NPTU only)</small>
                            </div>
                            <Link className="btn btn-outline-primary btn-lg" to={"/LiveABC"} style={{ minWidth: '150px' }}><i className="fa fa-arrow-right"></i> GO</Link>
                        </div>
                    </div>
                </section>

                <section className="d-flex flex-column text-center mb-5">
                    <div className="m-3">
                        <img width="32" src={require('../../resource/section-more.svg').default}></img>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary btn-lg" onClick={this.goMyGithubRepo} style={{ minWidth: '20rem' }}><i className="fab fa-github"></i>&nbsp;See More</button>
                    </div>
                </section>

                {/* About Me */}
                <div className="text-center">
                    <h3 className="m-3 gradient-text display-4" style={{ fontWeight: '900' }}>About Me</h3>
                </div>

                {/* About Me: Content */}
                <section className="p-5 bg-white wow fadeIn">
                    <div className="row mb-5">
                        <div className="col-12 col-lg-6 text-center text-lg-right">
                            <img className="rounded-circle" src="https://avatars.githubusercontent.com/boylin0" style={{ width: '15rem' }}></img>
                        </div>
                        <div className="col-12 col-lg-6 text-center text-lg-left d-flex flex-column justify-content-center">
                            <span className="gradient-name m-2">BOYLIN0</span>
                            <p className="mt-3">
                                <a type="button" className="btn btn-outline-info m-2" href="https://github.com/boylin0"><i className="fab fa-github"></i> Github</a>
                                <a type="button" className="btn btn-outline-info m-2" href="mailto:as20757738@gmail.com"><i className="fas fa-envelope"></i> E-Mail</a>
                            </p>
                        </div>
                    </div>
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
