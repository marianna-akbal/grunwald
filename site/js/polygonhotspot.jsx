import React from 'react';
import ReactDOM from 'react-dom';
import Hotspot from './hotspot.jsx';

export default class PolygonHotspot extends Hotspot {
    constructor(props) {
        super(props);
    }

    render() {
        return <g><clipPath id={"clip-"+this.props.id} >
                <polygon transform="matrix(1 0 0 1 1677 719)" points={this.props.points} />
            </clipPath>
            <polygon transform="matrix(1 0 0 1 1677 719)"
            id={this.props.id} points={this.props.points}
            style={{fill: "white"}}
            fillOpacity = {this.state.isActive ? 0: 0}
            onClick={e => this.handleMouseEnter()}/>
            </g>
    }
}
