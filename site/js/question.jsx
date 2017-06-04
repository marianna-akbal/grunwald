var React = require('react');

var Question = React.createClass({
  propTypes: {
    setAnswer: React.PropTypes.func,
    validateAnswers: React.PropTypes.func,
    data: React.PropTypes.obj
  },

  render: function(){
    var answersNodes = Object.keys(this.props.data.answers).map(function(value, index){
      return (
        <div key={"div-answer-input-" + index + "-" + this.props.id} className="answers">
          <input key={"answer-input-" + index + "-" + this.props.id}
            id={"answer-input-" + index + "-" + this.props.id}
            type="checkbox"
            value={value}
            onChange={this.props.setAnswer}
            defaultChecked={false}
          />
          <label htmlFor={"answer-input-" + index + "-" + this.props.id}>
            {(parseInt(index) + 1) + ": " + this.props.data.answers[index].value}
          </label>
        </div>
      )
    }.bind(this));

    return (
      <div>
        <h4>{(parseInt(this.props.id) + 1) + ": " + this.props.data.question}</h4>
        <form>
          {answersNodes}
          <br/>
          <button type="button" onClick={this.props.validateAnswers}>
              Dalej
          </button>
        </form>
      </div>
    );
  }
});

module.exports = Question;
