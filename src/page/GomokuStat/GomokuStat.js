/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

class GomokuView extends React.Component {

    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            info: null
        }
    }

    updateStatus(data) {
        this.setState({
            info: data
        })
    }

    componentDidMount() {
        document.title = 'Gomoku Stat';
        const gomokuStatusUrl = `gomoku-stat.herokuapp.com`;
        this.socket = io(`wss://${gomokuStatusUrl}`,
            {
                reconnectionDelayMax: 5000,
            }
        );
        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });
        this.socket.on("updateGomoku", (data) => {
            this.updateStatus(data)
            console.log(data);
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    onBackClicked() {
        window.history.back();
    }

    render() {
        return (
            <React.Fragment>
                <div className="row align-items-center" style={{ height: '100vh', margin: '0px' }}>
                    <div className="container text-center p-3" id="status">
                        <h3>GOMOKU STATUS</h3>
                        <h6>即時對戰資訊</h6>
                        {
                            this.state.info ?
                                <div>
                                    <div className="m-3">
                                        {this.state.info['conductIndex']} / {this.state.info['conductTotal']} = {this.state.info['completeRate']}%
                                        <br />
                                        共有 {this.state.info['totalUser']} 人參賽
                                        <br />
                                        {this.state.info['user1']} 正在對戰 {this.state.info['user2']}
                                        <br />
                                        進行第{this.state.info['round']}回合
                                    </div>
                                    <div className="m-3">
                                        <small className="text-muted">資料為即時更新，無須重新整理。</small>
                                    </div>
                                </div>
                                :
                                <div>
                                    連線中，請稍後...
                                </div>
                        }
                        <button className="btn btn-outline-primary btn-sm m-3" onClick={() => window.history.back()}>回上一頁</button>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default GomokuView;
