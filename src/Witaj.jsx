import React, {Component} from 'react'
import Odliczanie from './Odliczanie';
import './Witaj.css';
import './Edycja.jsx';
import EdycjaLekcji from './Edycja.jsx';
import uniqid from 'uniqid';

class Powitanie extends Component{
    constructor(){
        super();
        this.state = {
            czas: {
                godzina: new Date().getHours(),
                minuta: new Date().getMinutes(),
                sekunda: new Date().getSeconds()
            },
            Lekcje: [
                // {id: uniqid(), name:"Lekcja 1",czasH: 7,czasM:45},
                // {id: uniqid(), name:"Lekcja 2",czasH: 8,czasM:35},
                // {id: uniqid(), name:"Lekcja 3",czasH: 9,czasM:25},
                // {id: uniqid(), name:"Lekcja 4",czasH: 10,czasM:15},
                // {id: uniqid(), name:"Lekcja 5",czasH: 11,czasM:15},
                // {id: uniqid(), name:"Lekcja 6",czasH: 12,czasM:15},                
                // {id: uniqid(), name:"Lekcja 7",czasH: 19,czasM:40}
            ],
            edytowaneLekcje:{
                id: uniqid(),
                name: "",
                czasH: -1,
                czasM: -1,
            }
        };
        this.dodanieLekcji = this.dodanieLekcji.bind(this);
        this.zapisanieLekcji = this.zapisanieLekcji.bind(this);
        this.usuwanieLekcji = this.usuwanieLekcji.bind(this);
        this.edycjaLekcjiE = this.edycjaLekcjiE.bind(this);
        this.czyscEdycje = this.czyscEdycje.bind(this);
        this.odswizanie = this.odswizanie.bind(this);
    }

    dodanieLekcji(val){
        this.setState(prevState => {
            return{
                edytowaneLekcje: Object.assign(prevState.edytowaneLekcje,val)
            }
        })
    }

    zapisanieLekcji() {
        this.setState(prevState => {
            const czyLekcjaJuzIstnieje = prevState.Lekcje.find(
                element => element.id === prevState.edytowaneLekcje.id
            );
            let aktualizowanieLekcji;
            if (czyLekcjaJuzIstnieje) {
                aktualizowanieLekcji = prevState.Lekcje.map(element => {
                    if (element.id === prevState.edytowaneLekcje.id)
                        return prevState.edytowaneLekcje;
                    else
                        return element;
                });
            } else {
                aktualizowanieLekcji = [...prevState.Lekcje, prevState.edytowaneLekcje];
            }
            return {
                Lekcje: aktualizowanieLekcji,
                edytowaneLekcje: {
                    id: uniqid(),
                    name: "",
                    czasH: -1,
                    czasM: -1,
                }
            };
        }, () => localStorage.setItem("Lekcje", JSON.stringify(this.state.Lekcje)));
    }
    

    usuwanieLekcji(id){
        this.setState(prevState => ({
            Lekcje: prevState.Lekcje.filter(element => element.id !== id)
        }));
    }

    edycjaLekcjiE(id){
        this.setState(prevState => ({
            edytowaneLekcje: {...prevState.Lekcje.find(element => element.id === id)}
        }));
    }

    czyscEdycje(){
        this.setState({edytowaneLekcje: {
            id: uniqid(),
            name: "",
            czasH: -1,
            czasM: -1,
        }});
    }

    odswizanie() {
        this.setState({
            czas: {
                godzina: new Date().getHours(),
                minuta: new Date().getMinutes(),
                sekunda: new Date().getSeconds()
            }
        });
    }

    componentDidMount(){
        const listaLekcji = JSON.parse(localStorage.getItem("Lekcje")) || [];
        this.setState({Lekcje:listaLekcji});
        setInterval(this.odswizanie, 1000)
    }


    
    render(){
        const Lekcje = this.state.Lekcje.map(element => {
            return (
            <Odliczanie 
            key = {element.id} 
            id = {element.id}
            name = {element.name} 
            czasH = {element.czasH} 
            czasM={element.czasM} 
            obecnyCzas={this.state.czas}
            Usun={id => this.usuwanieLekcji(id)}
            edytujLekcje = {id => this.edycjaLekcjiE(id)}
            />
            );
        })
        return(
            <div className='EdycjaLekcji'>
                {Lekcje}
                <EdycjaLekcji 
                    name = {this.state.edytowaneLekcje.name}
                    czasH = {this.state.edytowaneLekcje.czasH}
                    czasM = {this.state.edytowaneLekcje.czasM}
                    onInputChange={
                        val => this.dodanieLekcji(val)}
                        onSave={() => this.zapisanieLekcji()}
                        czyszczenieEdycji = {() => this.czyscEdycje()}
                    />
            </div>
        );
    }
}
export default Powitanie;