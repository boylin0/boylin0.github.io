/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import Lottie from 'lottie-react-web';

/* Import */
import NotFoundAnimation from '../../resource/lottie-animation/404.json'

class NotFound extends React.Component {

    componentDidMount() {
        document.title = 'Page Not Found';
    }

    onBackClicked() {
        window.history.back();
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex align-content-center flex-wrap" style={{ height: '80vh', minHeight: '512px' }}>
                    <div className="w-100 text-center">
                        <Lottie options={{
                            animationData: NotFoundAnimation,
                        }} height={'25rem'} width={'25rem'} ariaRole="none" />
                        <h1 className="d-flex justify-content-center font-weight-lighter">
                            找不到此頁面
                        </h1>
                        <div className="m-5">
                            <button onClick={this.onBackClicked} className="btn btn-lg btn-outline-primary" style={{ minWidth: '10rem' }}><i className="fa fa-arrow-left"></i>&nbsp;返回</button>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default NotFound;
