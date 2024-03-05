import React from "react";
import PropTypes from "prop-types";
import { godzinaMinutaDoSekund, sekundyDoGodzinMinutSekund } from "./utilsy";


const Odliczanie = (props) => {
    const sekundyLekcja = godzinaMinutaDoSekund(props.czasH, props.czasM, 0);
    const sekundyTeraz = godzinaMinutaDoSekund(props.obecnyCzas.godzina, props.obecnyCzas.minuta, props.obecnyCzas.sekunda )
    const pozostaloSekund = sekundyLekcja - sekundyTeraz;
    let pozostaloSekundTekst = "";
    let textColor = "";
    if(sekundyTeraz < sekundyLekcja) {
        textColor = "Blue";
        pozostaloSekundTekst = sekundyDoGodzinMinutSekund(pozostaloSekund);
    }
    else if(sekundyTeraz >= sekundyLekcja && sekundyTeraz < (sekundyLekcja + 2700)) {
        if(sekundyTeraz < (sekundyLekcja + 900)) textColor = "DarkGreen";
        else if(sekundyTeraz < (sekundyLekcja + 1800) && sekundyTeraz >= (sekundyLekcja + 900)) textColor = "Green";
        else if(sekundyTeraz < (sekundyLekcja + 2700) && sekundyTeraz >= (sekundyLekcja + 1800)) textColor = "Lime";
        pozostaloSekundTekst = "Lekcja zakończy się za " + sekundyDoGodzinMinutSekund((sekundyLekcja + 2700)- sekundyTeraz)
    } else if (sekundyTeraz > (sekundyLekcja + 2700)) {
        textColor = "Red";
        pozostaloSekundTekst = "ta lekcja odbędzie się dopiero jutro";
    }
    //const pozostaloSekundTekst = pozostaloSekund > 0 ? sekundyDoGodzinMinutSekund(pozostaloSekund) : `ta lekcja odbędzie się dopiero jutro`;
    return (
    <div className="odliczanie" style={{color:textColor}}>
        <strong>{props.name}</strong>_{props.czasH}:{props.czasM}
        <i>do tej lekcji pozostalo jeszcze: </i> {pozostaloSekundTekst}
        <div className="Odliczanie_kasowanie">
            <i className="edycja" onClick={() => props.edytujLekcje(props.id)}>edytuj</i>
            <b className="iks" onClick={() => props.Usun(props.id)}>x</b>
        </div>
    </div>
    );
};


Odliczanie.propsTypes={
    name: PropTypes.string,
    czasH: PropTypes.number,
    czasM: PropTypes.number,
    edytujLekcje: PropTypes.func,
    obecnyCzas: PropTypes.shape(
        {
            godzina: PropTypes.number,
            minuta: PropTypes.number,
            sekunda: PropTypes.number
        }
    ),
    Usun: PropTypes.func
};

export default Odliczanie;