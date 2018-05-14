import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.css';

class HomePage extends Component {
  state = {
    score: 0
  }

  componentDidMount() {
    const { getQList } = this.props;
    getQList();
  }

  // handleAnswerChange = e => {
  //   const qAns = e.target.value === 'true';
  //   this.setState({
  //     ...this.state,
  //     currentAns: qAns
  //   });
  // }

  // handleAnswerSubmit = () => {
  //   const { currentQ, currentAns, qAnswers, score } = this.state;
  //   let _score = score;
  //   currentAns ? _score++ : null;
  //   const _QAnswers = qAnswers;
  //
  //   _QAnswers.push({
  //     qId: currentQ,
  //     qAns: currentAns
  //   });
  //
  //   let _CurrentQ = currentQ;
  //   _CurrentQ > 9 ? null : _CurrentQ++;
  //
  //   this.setState({
  //     ...this.state,
  //     currentQ: _CurrentQ,
  //     qAnswers: _QAnswers,
  //     currentAns: false,
  //     score: _score
  //   });
  // }

  render() {
    const { score } = this.state;
    const { isFetching, qList } = this.props;
    console.log(qList);
    return (
      <div>
        {
          isFetching && (
            <div className='homePage__loader-container'>
              <div className='loader'>
              </div>
            </div>
          )
        }
        {
          <div>
            <div>
              {qList.map((q, qIndex) => {
                <ul key={qIndex}>
                  <h3>{q.question}</h3>;
                  {
                    q.incorrect_answers.map((ans, ansIndex) => {
                      return (
                        <li key={ansIndex}>
                          <input type='radio' name={q.currentQ} id={ansIndex}
                            value={false}
                            onChange={this.handleAnswerChange}/>
                          <label htmlFor='answer1'>{ans}</label><br/>
                        </li>
                      );
                    }),
                    <li key={qIndex+4}>
                      <input type='radio' name={q.correct_answer} id={qIndex+4}
                        value={false}
                        onChange={this.handleAnswerChange}/>
                      <label htmlFor='answer1'>{q.correct_answer}</label><br/>
                    </li>
                  }
                </ul>;
              })}
              <button type='button' onClick={this.handleAnswerSubmit}>Submit</button>;
            </div>
          </div>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  getQList: PropTypes.func,
  qList: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.object
};

export default HomePage;
