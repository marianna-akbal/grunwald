var React = require('react');

var Question = require('./question.jsx');


var Quiz = React.createClass({

  getInitialState: function(){
    return {
      quiz: {},
      user_answers: [],
      step: 0
    }
  },

  componentDidMount: function(){
    this.setState({
        quiz: {
                "title": "QUIZ WIEDZY O BITWIE POD GRUNWALDEM",
                "questions": [
                    {
                    "question": "Where is the first question?",
                    "answers": [
                        {
                        "is_right": true,
                        "value": "Just here."
                        },
                        {
                        "is_right": false,
                        "value": "After this one."
                        }
                    ]
                    },
                    {
                    "question": "For this question you need to tick the second and the third answers, ok?",
                    "answers": [
                        {
                        "is_right": false,
                        "value": "Not this one."
                        },
                        {
                        "is_right": true,
                        "value": "This one."
                        },
                        {
                        "is_right": true,
                        "value": "This one too."
                        },
                        {
                        "is_right": false,
                        "value": "No."
                        }
                    ]
                    }
                ]
                }
    })
  },

  nextStep: function(){
    this.setState({step: (this.state.step + 1)});
  },

  setAnswer: function(event){
    this.state.user_answers[this.state.step] = this.state.user_answers[this.state.step] || [];
    this.state.user_answers[this.state.step][parseInt(event.target.value)] = event.target.checked;
  },

  isAnswerRight: function(index){
    var result = true;
    Object.keys(this.state.quiz.questions[index].answers).map(function(value, answer_index){
      var answer = this.state.quiz.questions[index].answers[value]
      if (!this.state.user_answers[index] || (answer.is_right != (this.state.user_answers[index][value] || false))) {
        result = false;
      }
    }.bind(this));
    return result;
  },

  computeScore: function(index){
    var score = 0
    Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerRight(parseInt(value))) {
        score = score + 1;
      }
    }.bind(this));
    return score;
  },

  renderResult: function(){
    var result = Object.keys(this.state.quiz.questions).map(function(value, index){
      if (this.isAnswerRight(value)) {
        return (
          <div>{"Pytanie " + index + ": Poprawnie!"}</div>
        )
      } else {
        return (
          <div>{"Pytanie " + index + ": Niestety źle :("}</div>
        )
      }
    }.bind(this));
    return (
      <div className="quizResult">
        <h3>Wynik</h3>
        <div>
          {this.computeScore()}/{this.state.quiz.questions.length}
        </div>
        <div>
          <h3>Twoje odpowiedzi</h3>
            {result}
        </div>
      </div>
   );
  },

  close: function() {
    this.props.close();
    console.log("close")
  },

  render: function(){
    if (!this.state.quiz.questions) {return <div></div>}
    return (
      <div className="quiz" style={{right: this.props.isVisible ? "0" : "130%"}}>
      <div className="close-btn pull-right" onClick={e => this.close() }></div>
      <div className='container'>
        <h1>{this.state.quiz.title}</h1>
        {(this.state.step < this.state.quiz.questions.length
          ? (<Question
                id={this.state.step}
                data={this.state.quiz.questions[this.state.step]}
                validateAnswers={this.nextStep}
                setAnswer={this.setAnswer}/>)
          : (<div>{this.renderResult()}</div>)
        )}
        </div>
      </div>
    )
  }
});

module.exports = Quiz;