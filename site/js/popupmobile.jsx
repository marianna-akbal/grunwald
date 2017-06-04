import React from 'react';
import ReactDOM from 'react-dom';

export default class PopupMobile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClosed: false
    }
  }

  closePopup() {
    this.setState({isClosed: true});
    this.props.close();
  }

  render(){
    return <div className={this.state.isClosed ? 'popupMobile closed' : 'popupMobile'}>
        <h1>Bitwa pod Grunwaldem - Who is Who</h1>
        <p id='tekstMobile'><span id="biggerMobile">Drogi użytkowniku urządzenia mobilnego</span> aby w pełni korzystać z aplikacji <span id="biggerMobile">Bitwa pod Grunwaldem - Who is Who</span> zapraszam do uruchomienia jej na komputerze. W ramach rozgrzewki przed poznawaniem jednej z najważniejszych bitew w historii średniowniecznej Europy mam dla Ciebie quiz. <br /><span id="biggerMobile">Zaczynamy?</span></p>
        <div id='nextMobile' onClick={e=>this.closePopup()}></div>
    </div>
  }
}
