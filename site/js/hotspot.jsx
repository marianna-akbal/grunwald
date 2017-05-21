import React from 'react';
import ReactDOM from 'react-dom';



export default class Hotspot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    }
  }

  handleMouseEnter() {
    this.setState({isActive: true});
  }

  handleMouseLeave() {
    this.setState({isActive: false});
  }

  render() {
    let style = {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      left: this.props.left,
      backgroundColor: this.state.isActive ? 'rgba(255,0,0,0.25)' : 'transparent'
    }

    if(this.state.isActive) {
      return <div className='hotspot'>
        <div
          style={style}
          onMouseEnter={e => this.handleMouseEnter()}
          onMouseLeave={e => this.handleMouseLeave()}>
          <div className='info'>
            <h1>{this.props.title}</h1>
            <text>{this.props.description}</text>
          </div>
        </div>

      </div>;
    } else {
      return <div className='hotspot'>
        <div
          style={style}
          onMouseEnter={e => this.handleMouseEnter()}
          onMouseLeave={e => this.handleMouseLeave()}></div>
      </div>;
    }
  }
}
