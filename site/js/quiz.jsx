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
                    "question": "Kto opuścił na ziemię chorągiew wojsk polskich z białym orłem?",
                    "answers": [
                        {
                        "is_right": true,
                        "value": "Marcin z Wrocimowic"
                        },
                        {
                        "is_right": false,
                        "value": "Kazimierz V"
                      },
                      {
                      "is_right": false,
                      "value": "Zawisza Czarny"
                    },
                    {
                    "is_right": false,
                    "value": "Mikołaj Traba"
                  }

                    ]
                    },
                    {
                    "question": "Kto został następnym wielkim mistrzem krzyżackim po Ulrichu von Jungingenie",
                    "answers": [
                        {
                        "is_right": false,
                        "value": "Marquard von Salzbach"
                        },
                        {
                        "is_right": true,
                        "value": "Heinrich von Plauen"
                        },
                        {
                        "is_right": false,
                        "value": "Domrat Grzymalczyk z Kobylan"
                      },
                      {
                      "is_right": false,
                      "value": "Nikt. Zakon Krzyżacki upadł po bitwie pod Grunwaldem."
                    }
                    ]
                  },
                  {
                  "question": "Wielki komtur to....",
                  "answers": [
                      {
                      "is_right": false,
                      "value": "Rodzaj chorągwi wojennej"
                      },
                      {
                      "is_right": true,
                      "value": "Zastępca wielkiego mistrza zakonu krzyżackiego"
                      },
                      {
                      "is_right": false,
                      "value": "Koń, którego dosiadał dowódca wojsk"
                    },
                    {
                    "is_right": false,
                    "value": "Sekretarz króla"
                  }
                  ]
                },
                {
                "question": "Kim był Jan Długosz?",
                "answers": [
                    {
                    "is_right": false,
                    "value": "Czeskim bohaterem narodowym"
                    },
                    {
                    "is_right": true,
                    "value": "Autorem lubianych przez Matejkę 'Roczników'"
                    },
                    {
                    "is_right": false,
                    "value": "Paź na dworze króla Władysława Jagiełły"
                  },
                  {
                  "is_right": true,
                  "value": "Synem Jana Długosza uwiecznionego na obrazie Matejki"
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
