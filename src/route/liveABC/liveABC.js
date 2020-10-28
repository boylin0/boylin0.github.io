import React from 'react';

import liveabc_tutorial from '../../resource/liveabc-tutorial.mp4'
import { code, problem } from './liveABC.const'
import Clipboard from 'clipboard';
import $ from 'jquery';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

class LiveABC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem_db_Count: Object.keys(problem).length,
      tutorial_display: true,
      problem_time: 2000,
      problem_field: code.sample_problem,
      answerList: [],
      problem_errorRate: 0,
    };
  }

  componentDidMount() {

  }

  problemChanged(event) {
    this.setState({ problem_field: event.target.value });
  }

  generateProblemAnswer() {
    let inputProblem = this.state.problem_field.split('\n').join('');
    inputProblem = inputProblem.split(',');
    let inputProblemCount = inputProblem.length;

    let ansDOM = [];
    let answers = inputProblem.map(problemID => problem[problemID]);
    /*  */
    ansDOM.push(<div key={0.2} >
      <h5>作答資訊</h5>

      {/*  */}
      <div className="mt-3">
        <h6>[錯誤答案/全部題目]：</h6>
        {Math.floor(inputProblemCount * (this.state.problem_errorRate / 100))}
        /
        {inputProblemCount}
      </div>

      {/*  */}
      <div className="mt-3">
        <h6>自動填答：
          <button type="button" onClick={() => { this.copyText(code.autoAnswer_js(answers)) }} className="btn btn-sm btn-outline-info m-1">複製</button>
        </h6>
        <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
          <code>
            {code.autoAnswer_js(answers)}
          </code>
        </div>
      </div>
    </div>);

    /*  */
    ansDOM.push(<div className="mt-3" key={0.1} ><h5>輸出結果</h5></div>);

    /*  */
    let errorMap = inputProblem.slice(0);
    for (let i = 0; i < inputProblemCount * (this.state.problem_errorRate / 100); i++) {
      errorMap.splice(Math.floor(Math.random() * errorMap.length), 1);
    }

    /*  */
    for (let i = 0; i < inputProblemCount; i++) {
      let problemID = inputProblem[i];
      let dom;
      if (!problem[problemID] == null) {

      } else {
        if (errorMap.includes(problemID)) {
          dom =
            <div key={i} className="text-danger">
              {String(i + 1)}.&nbsp;
            {problem[problemID] ?? '此題不在資料中'}
              <small className="ml-2 text-muted">(題號：{(!isNaN(problemID) && parseFloat(problemID) % 1 == 0 ? problemID : '錯誤的題號')})</small>
            </div>;
        } else {
          dom =
            <div key={i} className="text-danger">
              {String(i + 1)}.&nbsp;
                  {['A', 'B', 'C'][Math.floor(Math.random() * 3)]}
                  &nbsp;<small>(正確答案:{problem[problemID] ?? '此題不在資料中'})</small>
              <small className="ml-2 text-muted">(題號：{(!isNaN(problemID) && parseFloat(problemID) % 1 == 0 ? problemID : '錯誤的題號')})</small>
            </div>;
        }
      }

      ansDOM.push(dom);
      if ((i + 1) % 5 == 0) ansDOM.push(<div key={i + 0.5} className="mt-3" ></div>);
    }
    this.setState({ answerList: ansDOM }, () => {
      if ($('body,html').scrollTop() + 1 < $('*[data-block="#output"]').offset().top - ($(window).height() / 2)) {
        $('body,html').stop();
        $('body,html').animate({
          scrollTop: $('*[data-block="#output"]').offset().top - ($(window).height() / 2)
        }, { duration: 800 });
      }
    });



  }

  copyText(text) {
    let clipboard = new Clipboard('.btn', {
      text: function (trigger) {
        return text;
      }
    });
    iziToast.info({ message: '複製完成' });
  }

  render() {
    return (
      <>
        <div className="container p-3 mb-5">
          <div className="row">
            <div className="col-12">
              <h2 className="font-weight-light">LiveABC Tool</h2><small>(已搜集總題數:&nbsp;{this.state.problem_db_Count})</small>
            </div>
          </div>
        </div>


        <div className="container-sm p-0">
          <h4>使用範例：
                <a onClick={() => {
              this.setState((state, props) => ({
                tutorial_display: !state.tutorial_display
              }));
            }} className="btn btn-sm btn-outline-info">顯示內容</a>
          </h4>
          <video className={this.state.tutorial_display ? 'fadeIn' : 'fadeOut'} style={{ width: '100%', maxWidth: '768px' }} controls src={liveabc_tutorial} type="video/mp4" />
        </div>

        <div className="container p-3 mb-5">
          <div className="row">
            <div className="col-12 mt-4">
              <h4>獲取題號：<button type="button" onClick={() => { this.copyText(code.getProblems_js()) }} className="btn btn-sm btn-outline-info m-2">複製</button></h4>
              <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
                <code>{code.getProblems_js()}</code>
              </div>
            </div>

            <div className="col-12 mt-4">
              <h4>修改作答時間：<button type="button" onClick={() => { this.copyText(code.setTime_js(this.state.problem_time)) }} className="btn btn-sm btn-outline-info m-2">複製</button></h4>
              <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
                <code>{code.setTime_js(this.state.problem_time)}</code>
              </div>

              <div className="col-sm-5 p-1 pb-2 mb-3">
                <h5><span className="badge badge-pill badge-primary">設定資訊</span></h5>
                <label>作答秒數</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">作答秒數</div>
                  </div>
                  <input className="form-control" onChange={(event) => {
                    event.target.value = parseInt(Math.min(Math.max(event.target.value, 0), 2640));
                    this.setState((state, props) => ({
                      problem_time: event.target.value
                    }));

                  }} type="number" step="1" defaultValue={this.state.problem_time} />
                  <div className="input-group-append">
                    <div className="input-group-text">秒</div>
                  </div>
                </div>
                <small>≈&nbsp;約為{(this.state.problem_time / 60).toFixed(2)}分鐘</small>
              </div>

            </div>
          </div>

          {/* 輸入題號 */}
          <div className="col-12 mt-3 form-group pl-0 pr-0">
            <h4>輸入題號：<small className="text-muted">&nbsp;(以,區隔)</small></h4>
            <textarea onChange={this.problemChanged.bind(this)} style={{ minHeight: '10rem' }} defaultValue={this.state.problem_field} className="form-control" />

            <div className="col-sm-5 p-1 pb-2 mb-3">
              <h5><span className="badge badge-pill badge-primary">設定資訊</span></h5>
              <label>模擬錯誤</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">錯誤率</div>
                </div>
                <input className="form-control" onChange={(event) => {
                  event.target.value = Math.min(Math.max(event.target.value, 0), 100)
                  this.setState((state, props) => ({
                    problem_errorRate: event.target.value
                  }));

                }} type="number" step="1" defaultValue={this.state.problem_errorRate} />
                <div className="input-group-append">
                  <div className="input-group-text">%</div>
                </div>
              </div>
            </div>

            <button type="button" onClick={this.generateProblemAnswer.bind(this)} className="btn btn-lg btn-info">產生解答</button>
          </div>

          {/* 輸出 */}
          <div className="mt-4 p-3" data-block="#output">
            {this.state.answerList}
          </div>

        </div>
      </>
    );
  }
}

export default LiveABC;
