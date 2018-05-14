import React, { Component } from 'react';

import PropTypes from 'prop-types';
import randomize from '../../helpers/randomize';

import './index.css';

class HomePage extends Component {
  state = {
    results: [],
    score: 0,
    quizStarted: false,
    quizOver: false,
    clockStarted: '',
    quizTime: ''
  }

  componentDidMount() {
    const { getQList } = this.props;
    getQList();
  }

  handleQuizStart = () => {
    const _clockStarted = new Date().getTime() / 1000;
    this.setState({
      ...this.state,
      quizStarted: true,
      clockStarted: _clockStarted
    });
  }

  handleAnswerSelect = e => {
    const ansValue = e.target.value === 'true';
    e.target.parentNode.parentNode.value = ansValue;
  }

  handleQuizSubmit = () => {
    const ansBoxes = document.querySelectorAll('.question__box');
    const clockOver = new Date().getTime() / 1000;
    const { clockStarted } = this.state;
    const _quizTime = clockOver - clockStarted;

    let _score = this.state.score;
    ansBoxes.forEach(ans => {
      if (ans.value) {
        _score ++;
      }
    });

    this.setState({
      ...this.state,
      score: _score,
      quizOver: true,
      quizTime: _quizTime
    });
  }

  handleReQuiz = () => {
    const _clockStarted = new Date().getTime() / 1000;
    this.setState({
      ...this.state,
      results: [],
      score: 0,
      quizOver: false,
      quizStarted: true,
      clockStarted: _clockStarted
    });
  }

  render() {
    const { score, quizStarted, quizOver, quizTime } = this.state;
    const { isFetching, qList } = this.props;

    if (isFetching) {
      return (
        <div className='homePage__loader-container'>
          <div className='loader'>
          </div>
        </div>
      );
    } else if (!quizStarted) {
      return (
        <div>
          <button type='button' className='btn-check btn-start'
            onClick={this.handleQuizStart}>Start Quiz!</button>
        </div>
      );
    } else if (qList.length && !quizOver) {
      const questionsAnswers = [];
      qList.map(
        q => {
          const answers = q.incorrect_answers;
          answers.push(q.correct_answer);
          questionsAnswers.push({
            question: q.question,
            answers: randomize(answers),
            correct_answer: q.correct_answer
          });
        }
      );

      return (
        <div>
          <div className='wrapper'>
            <ul>
              {
                questionsAnswers.map((_q, _qI) => {
                  return (
                    <div key={_qI} id={_qI} className='question__box question'>
                      <h3 className='question-headline '>{_q.question}</h3>
                      {
                        _q.answers.map((ans, index) => {
                          const uniqueId = _qI + index;
                          return (
                            <li key={uniqueId}>
                              <input
                                type='radio'
                                name={`q${_qI}`}
                                key={uniqueId}
                                className='question-answers'
                                value={ans === _q.correct_answer}
                                onChange={this.handleAnswerSelect}
                              />
                              <label className='answer'>{ans}</label><br/>
                            </li>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
              <button type='button' className='btn-check'
                onClick={this.handleQuizSubmit}>Submit</button>
            </ul>
          </div>
        </div>
      );
    } else if (quizOver) {
      return (
        <div className='result'>
          <p>Your Got: { score } / 10, in { Math.ceil(quizTime) } Seconds Time!</p>
          <button className='btn-check' onClick={this.handleReQuiz}>Do It Again</button>
        </div>
      );
    } else {
      return '';
    }
  }
}

HomePage.propTypes = {
  getQList: PropTypes.func,
  qList: PropTypes.array,
  isFetching: PropTypes.bool,
  error: PropTypes.object
};

export default HomePage;
