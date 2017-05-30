import React from 'react';
import ReactDOM from 'react-dom';




export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    close() {
        this.props.close();
    }

    render() {
        return <div className='about' style={{left: this.props.isVisible ? "0" : "-100%"}}>
            <div className="close-btn pull-right" onClick={e => this.close() }/>
            <div className='containerAbout'>
                <span>Nazywam się Marianna Konarska-Czerwiakowska i mieszkam w Warszawie. <br />  <br /> Jestem grafikiem i art directorem z ponad 10-letnim doświadczeniem w projektowaniu na potrzeby druku oraz digitalu.<br /> W 2017 postanowiłam zmienić swoją ścieżkę zawodową i zająć sie projektowaniem na potrzeby Front-endu. Po ukonczeniu stacjonarnego bootcampu organizowanego przez Coders Lab szukam stażu/pracy i zleceń jako Junior Front-end Developer.<br /> <br /> Będzie mi miło, jeżeli obejrzysz moje <a href="https://akbalmedia.blob.core.windows.net/public/mkonarska_cv.pdf"> CV</a> i skontaktujesz sie ze mną.</span>
            </div>
        </div>
    }
}
