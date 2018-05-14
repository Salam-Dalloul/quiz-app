import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './index.css';

class HomePage extends Component {
  state = {
    results: [],
    score: 0,
    quizOver: false
  }

  componentDidMount() {
    const { getQList } = this.props;
    getQList();
  }

  handleAnswerSelect = e => {
    const ansValue = e.target.value === 'true';
    e.target.parentNode.parentNode.value = ansValue;
  }

  handleQuizSubmit = () => {
    const ansBoxes = document.querySelectorAll('.question__box');
    let _score = this.state.score;
    ansBoxes.forEach(ans => {
      if (ans.value) {
        _score ++;
      }
    });

    this.setState({
      ...this.state,
      score: _score,
      quizOver: true
    });
  }

  handleReQuiz = () => {
    this.setState({
      ...this.state,
      results: [],
      score: 0,
      quizOver: false
    });
  }

  render() {
    const { score, quizOver } = this.state;
    const { isFetching, qList } = this.props;

    if (isFetching) {
      return (
        <div className='homePage__loader-container'>
          <div className='loader'>
          </div>
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
            answers,
            correct_answer: q.correct_answer
          });
        }
      );
      return (
        <div>
          <div>
            <ul>
              {
                questionsAnswers.map((_q, _qI) => {
                  return (
                    <div key={_qI} id={_qI} className='question__box'>
                      <h3>{_q.question}</h3>
                      {
                        _q.answers.map((ans, index) => {
                          return (
                            <li key={index}>
                              <input
                                type='radio'
                                name={`q${_qI}`}
                                id={1}
                                value={ans === _q.correct_answer}
                                onChange={this.handleAnswerSelect}
                              />
                              <label>{ans}</label><br/>
                            </li>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
              <button type='button' onClick={this.handleQuizSubmit}>Submit</button>
            </ul>
          </div>
        </div>
      );
    } else if (quizOver) {
      return (
        <div>
          Your Result is { score } / 10!!
          <button className='' onClick={this.handleReQuiz}>Do It Again</button>
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
