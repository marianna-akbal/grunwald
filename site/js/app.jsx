require('../sass/main.scss');
// require('./popup.jsx')


import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './popup.jsx';
import PopupMobile from './popupmobile.jsx';
import Grunwald from './grunwald.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return <div>
      <Grunwald />
      <Popup />
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
