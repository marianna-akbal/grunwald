require('../sass/main.scss');
// require('./popup.jsx')


import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './popup.jsx';
import PopupMobile from './popupmobile.jsx';
import Grunwald from './grunwald.jsx';
import WhoButton from './whoButton.jsx';
import Quiz from './quiz.jsx';
import QuizButton from './quizButton.jsx';
import Sound from './sound.jsx';
import About from './about.jsx';
import MuteButton from './muteButton.jsx'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isWhoVisible: false,
            isQuizVisible: false,
            isEnable: false,
            isMuted: false
        }
    }

    showWhoPopup() {
      let newState = this.state;
      newState.isWhoVisible = !this.state.isWhoVisible;
      this.setState(newState);
      console.log("ShowWhoPopup");
    }

    showQuiz() {
      let newState = this.state;
      newState.isQuizVisible = !this.state.isQuizVisible;
      this.setState(newState);
      console.log("Show quiz");
    }

    closeAbout() {
        let newState = this.state;
        newState.isEnable = true;
        this.setState(newState);
    }

    mute(isMuted) {
       let newState = this.state;
       newState.isMuted = isMuted;
       this.setState(newState);
    }

    render(){
        return <div>
            <Sound mute={this.state.isMuted} />
          <About isVisible = {this.state.isWhoVisible}  />
          <MuteButton isMuted = {this.state.isMuted} mute={this.mute.bind(this)} />
          <Quiz isVisible = {this.state.isQuizVisible} close ={this.showQuiz.bind(this)}  />
          <WhoButton click={e => this.showWhoPopup()} />
          <QuizButton isVisible = {!this.state.isQuizVisible} click={e => this.showQuiz()} />
          <Grunwald isEnable={this.state.isEnable} />
          <Popup close={this.closeAbout.bind(this)} />
          <PopupMobile />
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
