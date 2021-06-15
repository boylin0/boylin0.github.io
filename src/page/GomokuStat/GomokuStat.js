/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

class GomokuView extends React.Component {

    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            info: ''
        }
    }

    updateStatus(str) {
        this.setState({
            info: str
        })
    }

    componentDidMount() {
        document.title = 'Gomoku Stat';
        const gomokuStatusUrl =  `gomoku-stat.herokuapp.com`;
        this.socket = io(`ws://${gomokuStatusUrl}`,
            {
                reconnectionDelayMax: 5000,
            }
        );
        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });
        this.socket.on("updateGomoku", (data) => {
            this.updateStatus(`${data['conductIndex']} / ${data['conductTotal']} = ${data['completeRate']}% -> ${data['user1']} 正在對戰 ${data['user2']} 第${data['round']}回合`)
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
                <div className="container p-5 text-center" id="status">
                    <h3>GOMOKU STATUS</h3>
                    <h6>即時對戰資訊</h6>
                    {this.state.info}
                </div>
            </React.Fragment >
        );
    }
}

export default GomokuView;
