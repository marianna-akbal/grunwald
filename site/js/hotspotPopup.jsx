import React from 'react';
import ReactDOM from 'react-dom';

export default class Grunwald extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.isVisible) {
            let style = {
                position: "absolute",
                top: this.props.top,
                left: this.props.left
            }
            return <div className="popup" style={style}>
                <div className="close-btn pull-right" onClick={e=>this.props.close()}></div>
                <h3>{this.props.title}</h3>
                <span>{this.props.description}</span>
            </div>
        } else {
            return null
        }
    }
}