import React from 'react';
import ReactDOM from 'react-dom';

import Hotspot from './hotspot.jsx';

export default class Grunwald extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='grunwald'>
            <div className='container'>
                <img src='images/bitwa.jpg'/>
                <Hotspot width="9%" height="40%" top="31%" left="49%" title="Jagiełło" description="A tutaj jest opis"/>


            </div>
        </div>
    }
}
