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
                  <svg version="1.0" x="0px" y="0px"
                  	 viewBox="0 0 3554 1537" >
                  <Hotspot points="M84.1,158.6c0,4.5-19.5,72-19.5,72l19.5,51l6,142.5l21,40.5l51-52.5v-94.5l61.5-115.5l37.5-30
                		l39-72.1l27-89.9l36-33l60-43.5l7.5-90l-21-121.5l-31.5-52.5l-57,49.5l-25.5,132l-21-15l-10.5-58.5l-67.5-30l-25.5,94.5l-22.5,28.5
                		l-108-70.5l-3-36l76.5-202.5l-18-30l-129,273L106.6-55.9l42,55.9l-16.5,73.1L84.1,158.6z"
                    title="Jagiełło" description="A tutaj jest opis"/>
                </svg>



            </div>
        </div>
    }
}
