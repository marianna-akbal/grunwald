import React from 'react';
import ReactDOM from 'react-dom';


export default class Popup extends React.Component {
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
    return <div className={this.state.isClosed ? 'popup closed' : 'popup'}>
        <h1>Bitwa pod Grunwaldem - Who is Who</h1>
        <p id='tekstOne'><span id="bigger">15 lipca 1410</span> na polach pod Grunwaldem stczono jedną z najważniejszych bitew w historii średniowiecznej Europy. Siły zakonu krzyżackiego pod dowództwem wielkiego mistrza Ulricha von Jungingena starły się z połączonymi
            siłami polskio-litewskimi pod wodzą króla Polski Władysława II Jagiełły i wielkiego księcia litewskiego Witolda.</p>
          <p id='tekstTwo'><br /><span id="bigger">365 lat póżniej</span> najwybitniejszy polski malarz rozpoczął prace nad monumentalnym dziełem ukazujacym zacietą walkę w momencie gdy szala zwycięstwa zaczęła przechylać sić na stronę polsko-litewską.</p>
        <p id='tekstThree'><br /><span id="bigger">Tu i Teraz</span> poznaj i usłysz tę wielką chwilę naszej historii. <br><span>Klikaj</span></br> w hotspoty aby odkryć kulisy bitwy pod Grunwaldem. </p>
        <div id='next' onClick={e=>this.closePopup()}></div>
        </div>
  }
}
