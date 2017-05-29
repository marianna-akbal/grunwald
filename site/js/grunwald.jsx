import React from 'react';
import ReactDOM from 'react-dom';

import PathHotspot from './pathhotspot.jsx';
import PolygonHotspot from './polygonhotspot.jsx';
import HotspotPopup from './hotspotPopup.jsx';
import PulseCircle from './pulseCircle.jsx';

export default class Grunwald extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            isVisible: false,
            pointers: [],
        }

        this.pointers = [];
        this._refi = 0;
    }

    updateDimensions(){
        this._refi = 0;
        if(this.props.isEnable) {
            this.svgBoundries = this.refs.clippingSvg.getBoundingClientRect();
            this.forceUpdate();
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateDimensions.bind(this));
        if(this.props.isEnable) {
            this.svgBoundries = this.refs.clippingSvg.getBoundingClientRect();
            console.log(this.svgBoundries)
        }
        console.log("grunwald mount")
    }

    getHotSpotBoundries(){
        if(this.props.isEnable) {
            this.svgBoundries = this.refs.clippingSvg.getBoundingClientRect();
            console.log(this.svgBoundries)
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions)
    }

    showPopup(id, title, description, boundries){
        let newState = this.state;
        newState.id = id;
        newState.title = title;
        newState.description = description;
        newState.isVisible = true;
        newState.left = (boundries.left / this.svgBoundries.width < 0.7 ?  boundries.left + boundries.width : boundries.left - (boundries.width + this.svgBoundries.width / 3)) + "px"
        newState.top = (boundries.top / this.svgBoundries.height < 0.35  ? (boundries.top - this.svgBoundries.top) : (boundries.top - this.svgBoundries.top) - this.svgBoundries.height*0.35)  + "px";
        this.setState(newState);

        console.log("SVG " + this.svgBoundries.top )
        console.log("Item " + boundries.top)
    }

    hidePopup() {
        let newState = this.state;
        newState.isVisible = false;
        this.setState(newState);
        this._refi = 0;
    }

    addPointer(boundries) {
        this.pointers.push(boundries);
        this.forceUpdate();
    }

    makeRef() {
        return 'HotSpot-'+(this._refi++); 
    }

    refsToArray(ctx, prefix){
        var results = [];
        for (var i=1;;i++){
            var ref = ctx.refs[prefix + '-' + String(i)];
            if (ref) results.push(ref);
            else return results;
        }
    }

    render() {
        if(!this.props.isEnable) {
            return <div className="grunwald">
                <div className="container">
                    <img src="images/bitwa.jpg" />
                    <svg ref = "clippingSvg" version="1.0" x="0px" y="0px" viewBox="0 0 3554 1537" >
                        <image style={style} width="3554" height="1537" href="images/bitwa.jpg" ></image>
                    </svg>
                </div>
            </div>
        }
        this.getHotSpotBoundries();
        let style = {}
        if(this.state.isVisible) {
            style.clipPath = "url(#clip-" + this.state.id + ")";
        }
        let points = [];
        if(!this.state.isVisible){
            let hotspots = this.refsToArray(this, "HotSpot");
            hotspots.forEach((item) => {
                let boundries = item.getBoundries();
                let style = {
                    left: boundries.left + boundries.width / 2.0 - 25.0/2+ "px",
                    top: (boundries.top -  this.svgBoundries.top - 25.0/2) + boundries.height / 2.0  + "px",
                    animation: `pulsate ${Math.floor((Math.random() * 2) + 1)}s ease-out ${Math.floor((Math.random() * 3) + 1)}s infinite`,
                    animationIterationCount: "infinite",
                    pointerEvents: "none"
                }

                points.push(<div className="pulse" style={style}></div>);
            });
        }
        return <div className='grunwald'>
            <div className='container'>
                <img src="images/bitwa.jpg" />

                <svg ref = "clippingSvg" version="1.0" x="0px" y="0px" viewBox="0 0 3554 1537" >
                    <image style={style} width="3554" height="1537" href="images/bitwa.jpg" ></image>
                    <PathHotspot
                        ref="HotSpot-1"
                        id="jagiello"
                        points="M84.1,158.6c0,4.5-19.5,72-19.5,72l19.5,51l6,142.5l21,40.5l51-52.5v-94.5l61.5-115.5l37.5-30 l39-72.1l27-89.9l36-33l60-43.5l7.5-90l-21-121.5l-31.5-52.5l-57,49.5l-25.5,132l-21-15l-10.5-58.5l-67.5-30l-25.5,94.5l-22.5,28.5 l-108-70.5l-3-36l76.5-202.5l-18-30l-129,273L106.6-55.9l42,55.9l-16.5,73.1L84.1,158.6z"
                        title="Wielki książe Litwy Witold" description="Matejko, za Dlugoszem, wskazuje 60-letniego księcia Witolda jako kluczową postać bitwy. Witold miał w trakcie bitwy zrugać swgo kuzyna - Władysława Jagiełłę za to, że w oddaleniu słucha mszy świętej.
                        Zwycięstwo w bitwie było niemał wyłączną zasługą Witolda i jego wojsk.
                        Na obrazie za księciem chyli sie ku upadkowi chorągiew wielkiego mistrza krzyżackigo."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                    <PolygonHotspot
                        ref="HotSpot-2"
                        id="swStanislaw"
                        points="-284,-584.7 -262,-648.7 -232,-677.3 -192,-648 -169.3,-609.3 -146,-572.7 -151.3,-508 -170,-446 -201.3,-414.7 -238.7,-438 -273.3,-450.7 -300.7,-517.3"
                        title="Święty Stanisław" description="Stanisław ze Szczepanowa, jeden z patronów Polski, który w czasie bitwy miał się ukazać rycerstwu na niebie."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                    <PolygonHotspot
                        ref="HotSpot-3"
                        id="ulrich"
                        points="-746,81 -777,59 -790,30 -826,24 -849,-43 -827,-87 -782,-77 -735,-57 -727,-108 -682,-123 -626,-134 -604,-84 -604,-28 -540,0 -504,33 -506,68 -415,98 -401,137 -478,247 -499,352 -557,422 -713,330 -802,278 	-748,194 -709,135"
                        title="Ulrich von Jungingen" description="Wielki mistrz zakonu krzyżackiego, który zginął w bitwie pod Grunwaldem. Wizja jego śmierci jest w całości dziełem wyobraźni Matejki. Twarz wielkiego mistrza widzimy dzieki temu, że malarz ukazał postać w ekwilibrystycznym obrocie w pasie o około 50 stopni.  Król Władysław Jagiełło polecił odesłać ciało z honorami do stolicy państwa zakonnego. Wielki mistrz został pochowany w kaplicy św. Anny na zamku krzyżackim w Malborku."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                    <PolygonHotspot
                        ref="HotSpot-4"
                        id="Werner-5"
                        points="-890,120 -930,196 -902,282 -880,360 -810,332 -756,228 -760,164 -820,128 -834,84 -872,66"
                        title="Werner von Tettingen" description="Szwajcar. Wielki szpitalnik zakonu krzyżackiego. W bitwie pod Grunwaldem, walczył pod swoją chorągwią komturstwa elbląskiego. W czasie bitwy uciekł i już nigdy nie podniósł się psychicznie po tym czynie. Na obrazie podnosi ręce jakby chciał chronić wielkiego mistrza przed upadkiem."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                      <PolygonHotspot
                        ref="HotSpot-5"
                         id="_x31_"
                         points="-1388.3,95.7 -1346.3,71.3 -1300.7,35 -1269.7,-17 -1298.7,-93 -1332.3,-149.3
                       		-1333.7,-176.7 -1370,-216.3 -1389,-201 -1406,-161.7 -1417,-116.3 -1468.7,-40.3 -1478,15 	"
                        title="Jakub Skarbek z Góry"
                        description="Wywodził się ze starego polskiego rodu szlacheckiego Skarbków. Początkowo był w służbie króla Zygmunta Luksemburskiego, a od 1410 r. u króla Władysława II Jagiełły. Zgodnie z relacjami historycznymi Skarbek na czele własnej chorągwi wziął udział w bitwie pod Grunwaldem gdzie był jednym z dziewięciu przedchorągiewnych, strzegących wielkiej chorągwi Królestwa Polskiego. Odznaczył się w walce męstwem atakując księcia szczecińskiego Kazimierza V i biorąc go do niewoli."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                        ref="HotSpot-6"
                        id="anonimowy-2" points="M-1436.5,241.5l-56,71l-41.5,27l-28.5-7.5c0,0-23.5,25-23.5,26.5s33.5,41,33.5,41l96-56
                      	l62.5-46l46,18l64.5-71.5l118-61l44.5-46l32-13.5l-16-39l-38-6.5l-47,60.5l-55.5,31l-46.5-8.5l-4.5-35.5l-26-32.5l-62.5,7l-22.5,47 l2,38.5L-1436.5,241.5z"
                        title="Anonimowy uczestnik bitwy"
                        description="Jeden z wielu anonimowych postaci uwiecznionych na obrazie. Prawdopodobnie giermek."
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>

                    


                     <PolygonHotspot
                        ref="HotSpot-7"
                      id="_x34_"
                      points="-942.7,173 -911.7,145 -895.3,125.3 -891.7,93 -916.3,77 -938.7,68.3 -980,90.3 -972.3,132"
                      title="Brat zakonny" description="W państwie krzyżackim zakonna elita liczyła najwyżej 450 rycerzy. Tylko oni mogli nosić białe płaszcze z czarnym krzyżem. Podczas bitwy zginęło 211 z nich."                        handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                        ref="HotSpot-7"
                        id="_x35_" points="M-1210.7,126l53.3-37l28-48.7l38.3-51.7l1.7-60l-15-31l-58-66.7l21.3-30c0,0-28.7-3.3-29.7-3.7
                        c-1-0.3-27.7-18.3-27.7-18.3l-27.3-30.7l-45.7,22.3l6.3,26.3l-46.7,38.3l7.7,41.7l30,54l37,49.7l2.7,105.7L-1210.7,126z"
                        title="Kazimierz V"
                        description="Książe szczeciński z dynastii Gryfitów, który stanął po stronie Krzyżaków.Obrócony jest do widza plecami i zadaje cios mieczem z półobrotu. Jego postać pokazuje, że wśród sojuszników von JUnginegena było wiele oddziałów gdzie dominował język polski.30 letni Kazimierz V w bitwie trafił do niewoli.Został z niej zwolniony 8 czerwca 1411, za poręczeniem Bogusława VIII, księcia stargardzkiego i słupskiego i cenę późniejszej współpracy książąt szczecińskich z Koroną"
                        handleShow={this.showPopup.bind(this)}
                        handleHide={this.hidePopup.bind(this)}
                        addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                        ref="HotSpot-8"
                      id="_x39_" points="M-400,39.5C-403,36-318,0-318,0l10.5-84l-30-54.5l-65,6l-33,62.5L-400,39.5z"
                      title="Zyndram z Maszkowic"
                      description="Rycerz herbu Słońce.Podczas wyprawy grunwaldzkiej pełnił funkcję oboźnego koronnego (łac.Praefectus castrorum). Według Jana Długosza w dniu 9 lipca 1410 roku został mianowany przez króla Władysława 'dowodzącym wojskiem'. Z rozkazu króla rozstawiał przed bitwą pod Grunwaldem chorągwie skrzydła polskiego. W czasie bitwy prowadził do boju chorągiew ziemi krakowskiej. Po wyprawie grunwaldzkiej nie otrzymał żadnej nagrody od króla, co mogło mieć związek z upadkiem w trakcie bitwy wielkiej chorągwi królestwa."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PolygonHotspot
                      ref="HotSpot-9"
                      id="_x31_0"
                      points="-201.7,0 -183,-36.3 -167.3,-109 -201,-134.3 -217.3,-167 -275,-183.3 -321,-259.7 	-346,-266.7 -346,-180.3 -283.3,-86.7 -236,15 "
                      title="Mikołaj Skunarowski vel Skunaczewski" description="Na obrazie zadaje pchnięcie mieczem rycerzowi zakonnemu, który trzyma upadającą choragiew wielkiego mistrza. Skunarowski po bitwie ze zdobyczną flagą biskupa pomezańskiego udał się do Krakowa aby obwieścić zwycięstwo."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PolygonHotspot
                      ref="HotSpot-10"
                      id="_x31_1"
                      points="-444,548 -476,356 -514,224 -582,144 -466,170 -388,138 -210,130 -112,226 -206,324 -228,446 -214,486 -278,536 -392,574"
                      title="Anonimowe postacie"
                      description="Z prawej strony na von Jungingena nacierają dwie nieznane postaci, które zdaniem historyków mają charakter symboliczny. Von Jungingen lewą ręką odpiera ATAK KATA, który nie miał prawa występować na polu bitwy i prawdopodobnie symbolizuje wymierzanie kary za przestępcze działania jakich dopuszczali się Krzyżacy.Druga postać cios zadaje włócznią św. Maurycego - rzymskiego dowódzccy, który zginął męczeńską śmiercią gdy odmówił walki przeciwko wyznawcom Chrystusa."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                      ref="HotSpot-11"
                      id="_x31_4" points="M452-88.5c1-3.5,5.5-81,5.5-81l28.5-9l95.5,47.5l29,69.5l-36,84.5l-99-53l-33-30L452-88.5z"
                      title="Marcin z Wrocimowic"
                      description="Chorąży Ziemi Krakowskiej.Marcin w ferworze bitwy upuśćił chorągiew na zimię a Krzyżacy zaczeli śpiewać wtedy triumfalną pieśń jednak dzięki innym rycerzom zażegnano niebezpieczeństwo."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                      ref="HotSpot-12"
                      id="_x31_5" points="M619.5,365.5c0-1.5,32.5-106,32.5-106l-66.5-67l25-39l61-46L723,157l25.5-36.5l39,8l6,85l29,47.5	l-61,53.5L731,397l-102,7.5L619.5,365.5z"
                      title="Jan Žižka z Trocnova"
                      description="Przywódca i strateg taborytów w czasie wojen husyckich. Czeski bohater narodowy. Do walki z Krzyżakami zachęciła go chęć legalnego zarobku. Na służbę w oddziałach króla Władysława zgodziło się nawet 3-4 tys. rycerzy czeskich i morawskich. Prawdopodobnie w samej bitwie Žižka nie uczestniczył jednak Matejko nie mógł odmówić sobie pominięcia postaci o tak sławnym nazwisku."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PolygonHotspot
                      ref="HotSpot-13"
                      id="_x31_6"
                      points="865,125.5 953,96 944,-19 936,-66.5 897.5,-138.5 865,-137.5 846.5,-74 777.5,-41.5 759.5,58.5 847,167.5"
                      title="Zawisza Czarny z Grabowa" description="Polski rycerz, symbol cnót rycerskich. Na wieść o wojnie z Krzyżakami porzucił karierę na dworze króla Węgier i udał się do Krakowa. Niewykluczone, że to właśnie Zawisza w krytycznym momencie bitwy uratował królewski sztandar, choć nie ma na to wyraźnych dowodów."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                      ref="HotSpot-14"
                      id="_x31_7" points="M929.5-90.5l45,17.5l25.5,18.5c0,0,27-30.5,25-32s-24-40.5-24-40.5l-48-24.5l-23.5,3l-8,33.5	L929.5-90.5z"
                      title="Domrat Grzymalczyk z Kobylan"
                      description="Przyboczny Jagiełły, późniejszy kasztelan lubelski."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                      ref="HotSpot-15"
                      id="_x31_8" points="M830.5,760c2.5,1,76,31.5,76,31.5l129-37.5c0,0,72-17,70.5-19.5s-48-137-48-137s77.5-44,73.5-48
                    	s-33.5-107-33.5-107l125.5-68l-131.5,16l-73-43L967.5,393l-30-48l48-43L892,364.5l27.5,80.5L905,587.5L828.5,715L809,741.5 L830.5,760z"
                      title="Henrich von Schwelborn"
                      description="Komandor tucholski, który za chwilę ma ptrzymać cios mieczem od Jana ŻiŻki. Według relacji Długosza Henryk uciekł z pola bitwy grunwaldzkiej, a we wsi Wielgnowa opadł go pościg i został zabity przez obcięcie głowy."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                      ref="HotSpot-16"
                      id="_x31_9" points="M1176.5,156c0,1.5,12,46,12,46l62.5,2.5l89.5-41.5l24.5-41l-45.5-57l-36-19.5l-101,31l-10,37.5 L1176.5,156z"
                      title="Jan Długosz"
                      description="Ojciec kronikarza Jana Długosza, autora tak lubianych przez Matejkę 'Roczników'. Pod Grunwaldem schwytał von Salzbacha licząc na wysoki okup za jeńca. Niestety dla niego Witold postanowił go stracić za dawne porachunki (podobno nazwał matkę wielkiego księcia 'ladacznicą i nieczystą matroną'). W podziękowaniu za postawę Długosza w bitwie Jagiełło został protektorem jego rodziny co pozwoliło jej na sięgnięcie po wysokie państwowe urzędy."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                      ref="HotSpot-17"
                      id="_x32_0" points="M1389.5,354c2,1,31.5,48,31.5,48l50.5,17.5l12.5,22l32.5-11.5c0,0-13.5,51-14,52.5s-31,74-31,74l-124-71.5c0,0-75.5-39-76-40.5s7-72,9-74.5s50-20.5,52-20.5S1365,368,1365,368L1389.5,354z"
                      title="Johan von Wenden"
                      description="Komtur krzyżacki , który przed wojną miał się narazić von Jungingenowi jako przeciwnik militarnej konfrontacji z Polską."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PathHotspot
                      ref="HotSpot-18"
                      id="_x32_1" points="M1342,285.5l80,66.5c0,0,76,51.5,78,51s98.5-12,98.5-12s74.5-29,74-30.5s-66.5-80-68.5-80
                    	s-76.5-41-76.5-41s-8-43.5-8.5-45s-31.5-24.5-31.5-24.5l-31,15l-21,37.5l-104,32.5L1342,285.5z"
                      title="Marquard von Salzbach"
                      description="Komtur branderburski. Zginął po bitwie pod Grunwaldem. Według Jana Długosza rycerza pojmał jego ojciec Jan Długosz z Niedzielska. Zaraz po bitwie Marquard został stracony na rozkaz wielkiego księcia Witolda. "
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PolygonHotspot
                      ref="HotSpot-19"
                      id="_x32_2"
                      points="1460.5,-368 1474.5,-352 1502,-367 1508.5,-277 1546.5,-263.5 1589,-306 1580.5,-367 1548,-394 1527.5,-424 1497,-426 1457,-380 	"
                      title="Władysław Jagiełło" description="Król Polski od 1386. Wielki książę litewski w latach 1377–1381 i 1382–1401, najwyższy książę litewski od 1401 do chwili śmierci w 1434. Matejko ukazał go jako tło dla bohaterów biwy. Jan Długodz w swoich relacjach pisał o nim, że był w prowadzeniu wojen niedbały i ciężki. Jednak pod Grunwaldem podobno ochrypł od wydawania komend więc może słusznie jego postawę porównuje się do chana Mamaja - wodza, który pilnuje zwyciestwa obserwując bitwę ze wzgórza."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                      ref="HotSpot-20"
                      id="_x32_3" points="M1449-73.5c3.5,0,59,22.5,59,22.5l42.5,16l21,100L1681-16l18-120l-18.5-60l-44.5,20.5l-39.5,61 L1501-121l-78,37.5L1449-73.5z"
                      title="Heinrich von Plauen"
                      description="Komtur na zamku w Świeciu. Nie uczestniczył w bitwie o czym atejko musiał wiedzieć.Na wieść o klęsce zakonu natychmiast pospieszył ze swym hufcem do Malborka przewidując, że tam właśnie skierują się oddziały polsko-litewskie. Dotarł na czas – i to w dużej mierze dzięki energicznej postawie von Plauena Krzyżacy utrzymali swoją stolicę. To dało mu godność wielkiego mistrza. Pochowany w katedrze w Kwidzynie gdzie miejsce jego spoczynku jest atrakcją turystyczną."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PolygonHotspot
                      ref="HotSpot-21"
                      id="_x32_4"
                      points="1775.5,-126 1830,-155.5 1842,-212 1774.5,-243 1734,-252 1703.5,-200 1705.5,-144 1753.5,-130 	"
                      title="biskup Krzysztof" description="Biskup lubeceński, który miał uczestniczyć w bitwie po stronie krzyżackiej. Niestety w Lubece nie było takiego księdza więc prawdopodobnie jest to pomyłka sekretarza Matejki."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PolygonHotspot
                      ref="HotSpot-22" 
                      id="_x37"
                      points="-190,696 -246,583 -263,522 -197,525 -118,529 -91,576 -81,705 	"
                      title="Kuno von Lichtenstein" description="Dostojnik zakonu, który od 1406r piastował godność wielkiego komtura (zastępcy wielkiego mistrza). W bitwie pod Grunwaldem von Lichtenstein dowodził prawym skrzydłem armii zakonnej, zginął prawdopodobnie walcząc w chorągwi wielkiej komturii. Według Jana Długosza uchodził za jednego z najlepszych szermierzy ówczesnej Europy. Matejko uwiecznił go w chwili śmierci."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>

                      <PathHotspot
                      ref="HotSpot-23"
                      id="_x38" points="M194,568c-1-4-23-118-23-118l-99,11c0,0-40-47-43-47s-64,10-64,10l-53,98c0,0,85,104,90,104 s168-25,168-25L194,568z"
                      title="Konrad VII Biały"
                      description="Książe oleśnicki z dynstii Piastów. W trakcie bitwy był niespełna 20-latkiem i walczył po stronie Krzyzaków, chociaż młodość spędził na Wawelu jako paź królowej Anny Cylejskiej. Wzięty w czasie bitwy do niewoli przez Josta z Salcz. Po roku wrocił do domu i wystąpił przeciwko Krzyżakom."
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>


                      <PolygonHotspot
                      ref="HotSpot-24"
                      id="_x32_5"
                      points="-1582,-161 -1442,-209 -1368,-265 -1263,-293 -1412,-326 -1615,-297 -1631,-151 	"
                      title="bój o obóz krzyżacki pod wsią Stębark" description=""
                      handleShow={this.showPopup.bind(this)}
                      handleHide={this.hidePopup.bind(this)}
                      addPointer={this.addPointer.bind(this)}/>
                </svg>
                {points}
                <HotspotPopup
                    title={this.state.title}
                    description={this.state.description}
                    isVisible={this.state.isVisible}
                    close={this.hidePopup.bind(this)}
                    left={this.state.left}
                    top={this.state.top}/>


            </div>
        </div>
    }
}
