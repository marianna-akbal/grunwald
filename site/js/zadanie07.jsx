import React from 'react';
import ReactDOM from 'react-dom';

class ActiveSpot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            style: {fill: "lime"}
        };
    }

    handleMouseEnter () {
        this.setState({style:{fill:"red"}});
    }

    handleMouseLeave(){
        this.setState({style:{fill:"lime"}});
    }

    render() {
        return <path 
            id={this.props.id}
            d={this.props.points} style={this.state.style} 
            onMouseEnter={e => this.handleMouseEnter()} 
            onMouseLeave={e => this.handleMouseLeave()} />
    }
}

class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let spots = [
            <ActiveSpot key="svg_9" id = "svg_9" points = "m372.5,80.4c64,57 132,24 64,58c-68,34 -128,-115 -64,-58z" />,
            <ActiveSpot key="svg_10" id = "svg_10" points = "m92.5,197.4l179.5,118.6l57,-138l-203,-86l-33.5,105.4z" />,
            <ActiveSpot key="svg_11" id = "svg_11" points = "m378.5,261.4c-252,-169 46,75 -54,76c-100,1 -139,-149 -139,-149c0,0 55,-132 109,-62c54,70 154,59 154,59c0,0 32,81 31.5,80.6c0.5,0.4 -353.5,-173.6 -101.5,-4.6z" />
        ];
        return <svg height="500" width="500">
           {spots}
        </svg>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <Overlay />;
    }
}

document.addEventListener('DOMContentLoaded', function(){

    ReactDOM.render(
        <App />, 
        document.getElementById('app')
    );
});