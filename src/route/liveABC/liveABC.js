import React from 'react';

import liveabc_tutorial from '../../resource/liveabc-tutorial.mp4'
import { code, problem } from './liveABC.const'
import Clipboard from 'clipboard';
import $ from 'jquery';

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

    /*  */
    ansDOM.push(<div key={0.2} >
      <h6>作答資訊</h6>
      [錯誤答案/全部題目]：
      {Math.floor(inputProblemCount * (this.state.problem_errorRate / 100))}
      /
      {inputProblemCount}
    </div>);

    /*  */
    ansDOM.push(<div className="mt-3" key={0.1} ><h6>輸出結果：</h6></div>);

    /*  */
    let errorMap = inputProblem.slice(0);
    for (let i = 0; i < inputProblemCount * (this.state.problem_errorRate / 100); i++) {
      errorMap.splice(Math.floor(Math.random() * errorMap.length), 1);
    }
    console.log(errorMap);

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
              <small class="ml-2 text-muted">(題號：{(!isNaN(problemID) && parseFloat(problemID) % 1 == 0 ? problemID : '錯誤的題號')})</small>
            </div>;
        } else {
          dom =
            <div key={i} className="text-danger">
              {String(i + 1)}.&nbsp;
                  {['A', 'B', 'C'][Math.floor(Math.random() * 3)]}
                  &nbsp;<small>(正確答案:{problem[problemID] ?? '此題不在資料中'})</small>
              <small class="ml-2 text-muted">(題號：{(!isNaN(problemID) && parseFloat(problemID) % 1 == 0 ? problemID : '錯誤的題號')})</small>
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
  }

  render() {
    return (
      <>
        <div class="container p-3 mb-5">
          <div class="row">
            <div class="col-12">
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
            }} class="btn btn-sm btn-outline-info">顯示內容</a>
          </h4>
          <video className={this.state.tutorial_display ? 'fadeIn' : 'fadeOut'} style={{ width: '100%', maxWidth: '768px' }} controls src={liveabc_tutorial} type="video/mp4" />
        </div>

        <div class="container p-3 mb-5">
          <div class="row">
            <div class="col-12 mt-4">
              <h4>獲取題號：<button type="button" onClick={() => { this.copyText(code.getProblems_js) }} class="btn btn-sm btn-outline-info m-2">複製</button></h4>
              <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
                <code>{code.getProblems_js}</code>
              </div>
            </div>

            <div class="col-12 mt-4">
              <h4>修改作答時間：<button type="button" onClick={() => { this.copyText(code.setTime_js(this.state.problem_time)) }} class="btn btn-sm btn-outline-info m-2">複製</button></h4>
              <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
                <code>{code.setTime_js(this.state.problem_time)}</code>
              </div>

              <div class="col-sm-5 p-1 pb-2 mb-3">
                <h5><span class="badge badge-pill badge-primary">設定資訊</span></h5>
                <label>作答秒數</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">作答秒數</div>
                  </div>
                  <input class="form-control" onChange={(event) => {
                    event.target.value = parseInt(Math.min(Math.max(event.target.value, 0), 2640));
                    this.setState((state, props) => ({
                      problem_time: event.target.value
                    }));

                  }} type="number" step="1" defaultValue={this.state.problem_time} />
                  <div class="input-group-append">
                    <div class="input-group-text">秒</div>
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

            <div class="col-sm-5 p-1 pb-2 mb-3">
              <h5><span class="badge badge-pill badge-primary">設定資訊</span></h5>
              <label>模擬錯誤</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">錯誤率</div>
                </div>
                <input class="form-control" onChange={(event) => {
                  event.target.value = Math.min(Math.max(event.target.value, 0), 100)
                  this.setState((state, props) => ({
                    problem_errorRate: event.target.value
                  }));

                }} type="number" step="1" defaultValue={this.state.problem_errorRate} />
                <div class="input-group-append">
                  <div class="input-group-text">%</div>
                </div>
              </div>
            </div>

            <button type="button" onClick={this.generateProblemAnswer.bind(this)} class="btn btn-lg btn-info">產生解答</button>
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
