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
        //const gomokuStatusUrl = `localhost:3001`;
        this.socket = io(`wss://${gomokuStatusUrl}`,
            {
                reconnectionDelayMax: 5000,
            }
        );
        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });
        this.socket.on("updateGomoku", (data) => {
            console.log(data);
            if (data == null) return;
            this.updateStatus(data)
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
                        <h3>NPTU資工五子棋AI比賽</h3>
                        <h6>即時對戰資訊</h6>
                        {
                            this.state.info ?
                                <div>
                                    <div className="m-3">
                                        <div className="mt-3">
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: this.state.info['completeRate'] + '%' }}></div>
                                            </div>
                                            {this.state.info['conductIndex']} / {this.state.info['conductTotal']} = {this.state.info['completeRate']}%
                                        </div>
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
