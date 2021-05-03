import React from 'react';

import liveabc_tutorial from '../../resource/liveabc-tutorial.mp4'
import { code, problem } from './LiveABC.const'
import Clipboard from 'clipboard';
import $ from 'jquery';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

var passIndex = 0;
var componentHashName = '';

class LiveABC extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      problem_db_Count: Object.keys(problem).length,
      tutorial_display: true,
      problem_time: 60 * 0,
      problem_field: code.sample_problem,
      answerList: [],
      problem_errorRate: 0,
      examType: 'none',
      problem_max_time: 0,
      devTools: false
    };
    this.keypressHiddenEnable = this.keypressHiddenEnable.bind(this);
  }


  componentDidMount() {
    componentHashName = window.location.hash;
    document.addEventListener("keydown", this.keypressHiddenEnable);

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypressHiddenEnable);
  }

  keypressHiddenEnable(event) {
    if (window.location.hash != componentHashName) return;

    let pass = "dev".toUpperCase();
    if (pass.charCodeAt(passIndex) == event.keyCode) {
      if (pass.length - 1 == passIndex) {
        this.setState({ devTools: true });
        document.removeEventListener("keydown", this.keypressHiddenEnable);
        return;
      }
      passIndex++;
    } else {
      passIndex = 0;
    }

  }

  problemChanged(event) {
    this.setState({ problem_field: event.target.value });
  }

  generateProblemAnswer() {
    let inputProblem = this.state.problem_field.split('\n').join('');
    inputProblem = inputProblem.split(',');

    let ansDOM = [];

    let problems = [];

    inputProblem.map(function (problemID, index) {
      problems.push({ 'problem_id': problemID, 'problem_answer': problem[problemID] });
    });

    for (let i = 0; i < inputProblem.length * (this.state.problem_errorRate / 100); i++) {
      const wrong_map = {
        'A': ['B', 'C'].sample(),
        'B': ['A', 'C'].sample(),
        'C': ['A', 'B'].sample(),
        'D': ['A', 'B', 'C'].sample()
      };
      let random_id = Math.floor(Math.random() * inputProblem.length);

      /* Answer already wrong */
      if (problems[random_id].problem_wrong_answer != null) {
        for (let j = 0; j < inputProblem.length; j++) {
          if (problems[random_id].problem_wrong_answer != null) {
            random_id = (random_id + 1) % inputProblem.length;
          } else {
            break;
          }
        }
      }

      let new_wrong_answer = wrong_map[problems[random_id].problem_answer];
      problems[random_id].problem_wrong_answer = new_wrong_answer;
    }

    // Answer Statistics
    ansDOM.push(<div key={0.2} >
      <h5>作答資訊</h5>
      {/* Statistics */}
      <div className="mt-3">
        <h6>[錯誤答案/全部題目]：</h6>
        {Math.floor(inputProblem.length * (this.state.problem_errorRate / 100))}
        /
        {inputProblem.length}
      </div>
      {/* Auto fill answer */}
      <div className="mt-3">
        <h6>自動填答：
          <button type="button" onClick={() => {
            this.copyText(
              code.autoAnswer_js(
                problems.map(problem => problem.problem_wrong_answer != null ? problem.problem_wrong_answer : problem.problem_answer)
              )
            );
          }} className="btn btn-sm btn-outline-info m-1">複製</button>
        </h6>
        <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
          <code>
            {
              code.autoAnswer_js(
                problems.map(problem => problem.problem_wrong_answer != null ? problem.problem_wrong_answer : problem.problem_answer)
              )
            }
          </code>
        </div>
      </div>
    </div>);

    // Output
    ansDOM.push(<div className="mt-3" key={0.1} ><h5>輸出結果</h5></div>);
    problems.map(function (problem, i) {
      ansDOM.push(
        <div key={i} className="text-danger">
          {String(i + 1)}.&nbsp;
          {problem.problem_wrong_answer != null ? problem.problem_wrong_answer : problem.problem_answer}
          &nbsp;{problem.problem_wrong_answer != null ? <small>(正確答案:{problem.problem_answer ?? '此題不在資料中'})</small> : ''}
          <small className="ml-2 text-muted">(題號：{(!isNaN(problem.problem_id) && parseFloat(problem.problem_id) % 1 === 0 ? problem.problem_id : '錯誤的題號')})</small>
        </div>
      );

      if (i % 5 == 4) {
        ansDOM.push(<div key={i + 0.1} className="mt-4" />);
      }
    });

    this.setState({ answerList: ansDOM }, () => {
      if ($('body,html').scrollTop() + 1 < $('*[data-block="#output"]').offset().top - ($(window).height() / 2)) {
        $('body,html').stop();
        $('body,html').animate({
          scrollTop: $('*[data-block="#output"]').offset().top - ($(window).height() / 2)
        }, { duration: 800 });
      }
    });

  }

  analyzeAnswer() {

    let ansDOM = [];
    let keyIndex = 0;

    let inputProblem = this.state.problem_field.split('\n').join('');

    let AnswerList = [];
    let IDList = [];
    let splittedDOM = inputProblem.split('解答&nbsp;&nbsp;:&nbsp;&nbsp;<span class="ans2">');
    for (let i = 1; i < splittedDOM.length; i++) {
      AnswerList.push(splittedDOM[i].split('</span>&nbsp;&nbsp;</td></tr></tbody></table></div></td></tr>')[0]);
    }

    let splittedDOM_testid = inputProblem
      .split('<input type="hidden" id="testidseq" name="testidseq" value="')[1]
      ?.split('">')[0]
      ?.split(',');

    if (splittedDOM_testid == null) {
      return;
    }

    splittedDOM_testid.forEach((elem, index) => {
      IDList.push(elem);
    });
    console.log(AnswerList);
    console.log(IDList);

    if (AnswerList.length != IDList.length) {
      ansDOM.push(<div key={keyIndex++}>題目數量不匹配</div>);
      ansDOM.push(<div key={keyIndex++}>{AnswerList}</div>);
      ansDOM.push(<div key={keyIndex++}>{IDList}</div>);
    } else {


      ansDOM.push(<div key={keyIndex++}>data_Q = [{
        IDList.map((elem, i) => {
          if (i == IDList.length - 1) {
            return elem;
          }
          return elem + ',';
        })
      }];</div>);

      ansDOM.push(<div key={keyIndex++}>data_A = [{
        AnswerList.map((elem, i) => {
          if (i == AnswerList.length - 1) {
            return '\"' + elem + '\"';
          }
          return '\"' + elem + '\"' + ',';
        })
      }];</div>);

      ansDOM.push(<div key={keyIndex++}>addToMap(data_Q, data_A);</div>);

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
          <h4 className="pl-3">使用範例：
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
              <h4>修改作答時間：<button type="button" disabled={this.state.examType !== 'none' ? false : true} onClick={() => {
                this.copyText(code.setTime_js(this.state.problem_time));
              }} className="btn btn-sm btn-outline-info m-2">複製</button></h4>
              <div className="p-3 rounded-lg" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 235, 235)' }}>
                <code>{this.state.examType !== 'none' ? code.setTime_js(this.state.problem_time) : '請選擇測驗類別'}</code>
              </div>

              <div className="col-sm-5 p-1 pb-2 mb-3">
                <h5><span className="badge badge-pill badge-primary">設定資訊</span></h5>
                <label>作答秒數</label>

                <div className="form-group">
                  測驗類別
                  <select onChange={(e) => {
                    this.state.examType = e.target.value;
                    let pMaxTime = 0;
                    if (e.target.value == 'listening') {
                      pMaxTime = 2640;
                      if (this.state.problem_max_time == 0) this.state.problem_max_time = 2640;
                    } else if (e.target.value == 'reading') {
                      pMaxTime = 4440;
                      if (this.state.problem_max_time == 0) this.state.problem_max_time = 4440;
                    }
                    this.setState((state, props) => ({
                      problem_max_time: pMaxTime,
                      problem_time: (state.problem_max_time > pMaxTime ? pMaxTime : state.problem_max_time)
                    }));
                  }} className="form-control">
                    <option value="none">未選擇</option>
                    <option value="listening">聽力 (45分鐘)</option>
                    <option value="reading">閱讀 (75分鐘)</option>
                  </select>
                </div>

                <div className="form-group">

                  <input type="range" value={this.state.problem_time / 60} onChange={(e) => {
                    this.setState((state, props) => ({
                      problem_time: e.target.value * 60,
                    }));
                  }} className="custom-range" min="0" max={this.state.problem_max_time / 60} step="0.1" />

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
            {this.state.devTools ? <button type="button" onClick={this.analyzeAnswer.bind(this)} className="btn btn-lg btn-info ml-3">解析詳解</button> : null}
          </div>

          {/* 輸出 */}
          <div className="mt-4 p-3 text-break" data-block="#output">
            {this.state.answerList}
          </div>

        </div>
      </>
    );
  }
}

export default LiveABC;
