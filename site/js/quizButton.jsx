import React from 'react';
import ReactDOM from 'react-dom';



export default class QuizButton extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick() {
      this.props.click();
      console.log("O Autorce");
    }

    render() {
      if(this.props.isVisible) {
        return <div className='quizButton' onClick={e => this.handleClick()}>
        <div className="pulse-red">
        </div>
        <div className="label">QUIZ</div>
      </div>
      }

      return null;
      
    }
  }
