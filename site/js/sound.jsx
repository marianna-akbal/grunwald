import React from 'react';
import ReactDOM from 'react-dom';



export default class Sound extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          muted:false
        }
    }

    render() {
      if(this.props.mute){
        return <audio src="./audio/siteAudio.mp3" autoPlay loop muted /> 
      }
      return <audio src="./audio/siteAudio.mp3" autoPlay loop />
    }
  }
