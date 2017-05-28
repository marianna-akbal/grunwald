import React from 'react';
import ReactDOM from 'react-dom';
import Hotspot from './hotspot.jsx';

export default class PathHotspot extends Hotspot {
    constructor(props) {
        super(props);
    }

    render() {
        return <g>
            <clipPath id={"clip-"+this.props.id} >
                <path transform="matrix(1 0 0 1 1677 719)" d={this.props.points} />
            </clipPath>
            <path transform="matrix(1 0 0 1 1677 719)"
            id={this.props.id} d={this.props.points}
            style={{fill: "white"}}
            fillOpacity = {this.state.isActive ? 0: 0}
            onClick={e => this.handleMouseEnter()}></path>
        </g>
    }
}
