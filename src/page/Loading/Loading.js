/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import Lottie from 'lottie-react-web';

/* Import */
import loadingAnimation from '../../resource/lottie-animation/loading.json'

class Loading extends React.Component {

    componentDidMount(){
        document.title = 'Loading...';
    }

    render() {
        return (
            <React.Fragment>
                {/* <div className="d-flex align-content-end flex-column"
                    style={{ height: '100vh', minHeight: '100%' }}>
                    
                </div> */}
                <div className="d-flex align-content-center flex-wrap" style={{ height: '100vh', minHeight: '100%' }}>
                    <div className="w-100">
                        <Lottie options={{
                            animationData: loadingAnimation,
                        }} height={'15rem'} width={'15rem'} ariaRole="none" />
                        <h1 className="d-flex justify-content-center font-weight-lighter">
                            LOADING
                        </h1>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Loading;
