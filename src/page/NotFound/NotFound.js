/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import Lottie from 'lottie-react-web';

/* Import */
import NotFoundAnimation from '../../resource/lottie-animation/404.json'

class NotFound extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="d-flex align-content-center flex-wrap" style={{ height: '80vh', minHeight: '512px' }}>
                    <div className="w-100">
                        <Lottie options={{
                            animationData: NotFoundAnimation,
                        }} height={'25rem'} width={'25rem'} ariaRole="none" />
                        <h1 className="d-flex justify-content-center font-weight-lighter">
                            找不到此頁面
                        </h1>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default NotFound;
