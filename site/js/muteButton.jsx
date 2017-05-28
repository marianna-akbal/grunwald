import React from 'react';
import ReactDOM from 'react-dom';

export default class MuteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            isMuted: false
        }
    }

    handleClick() {
      let newState = this.state;
      newState.isMuted = !this.state.isMuted;
      this.setState(newState);
      this.props.mute(this.state.isMuted);
    }

    render() {
        if(!this.state.isMuted){
            return <div className="mute-btn" onClick = {e=> this.handleClick()}></div>
        }
        else {
            return <div className="mute-btn muted" onClick = {e=> this.handleClick()}></div>
        }
    }
  }
