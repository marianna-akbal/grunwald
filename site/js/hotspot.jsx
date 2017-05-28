import React from 'react';
import ReactDOM from 'react-dom';

export default class Hotspot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        }
    }

    updateDimensions(){
        let thisComponent = ReactDOM.findDOMNode(this);
        this.boundries = thisComponent.getBoundingClientRect();
        
    }

    componentDidMount(){
        let thisComponent = ReactDOM.findDOMNode(this);
        window.addEventListener('resize', this.updateDimensions.bind(this));
        this.boundries = thisComponent.getBoundingClientRect();
        this.props.addPointer(this.boundries);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions)
    }

    handleMouseEnter() {
        this.setState({isActive: true});
        console.log(this.boundries)
        this.props.handleShow(this.props.id, this.props.title, this.props.description, this.boundries)
    }

    handleMouseLeave() {
         this.setState({isActive: false});
        //this.props.handleHide()
    }
}




