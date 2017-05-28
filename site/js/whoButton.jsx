import React from 'react';
import ReactDOM from 'react-dom';

export default class WhoButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
      this.props.click();
      console.log("O Autorce");
    }

    render() {
      return <div className='whoButton' onClick={e => this.handleClick()}>
        O AUTORCE
      </div>
    }
  }
