import React from "react";
import './Odliczanie.css';
import PropTypes from "prop-types";
import {
    czyPoprawnyNumer,
    zmienZnakiNaLiczbe,
    czyNazwaIstnieje,
    czyGodzinaJestPrawidlowa,
    czyMinutaJestPrawidlowa
} from "./utilsy"

const EdycjaLekcji = props => {
    return(
        <div className="EdycjaLekcji">
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="poleTekstowe">Podaj nazwę: </label>
                <input 
                type="text" 
                id="name" 
                name="name"
                value = {props.name}
                onChange={(e) => props.onInputChange({[e.target.name]: e.target.value})}
                />
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="pczasG">Podaj godzinę: </label>
                <input 
                type="text" 
                id="czasH" 
                name="czasH"
                value = {props.czasH === -1 ? "" : props.czasH}
                onKeyPress={e => czyPoprawnyNumer(e)}
                onChange={(e) => props.onInputChange({[e.target.name]: e.target.value})}
                />
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="czasM">Podaj minuty: </label>
                <input 
                type="text" 
                id="czasM" 
                name="czasM"
                value = {props.czasM === -1 ? "" : props.czasM}
                onKeyPress={e => czyPoprawnyNumer(e)}
                onChange={(e) => props.onInputChange({[e.target.name]: e.target.value})}
                />
            </div>
            
            <button disabled = {!(czyNazwaIstnieje(props.name))} onClick={() => props.onSave()} id="button1">OK</button>
            <button disabled = {!(czyNazwaIstnieje(props.name)) || !(czyGodzinaJestPrawidlowa(props.czasH)) || !(czyMinutaJestPrawidlowa(props.czasM))} id="button2">Cancel</button>
        </div>
    )
};



EdycjaLekcji.propsTypes={
    name: PropTypes.string,
    czasH: PropTypes.number,
    czasM: PropTypes.number,
    onSave: PropTypes.func,
    Usun: PropTypes.func,
    czyPoprawnyNumer: PropTypes.func,
    czyszczenieEdycji: PropTypes.func
};

export default EdycjaLekcji;