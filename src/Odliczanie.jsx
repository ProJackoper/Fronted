import React from "react";
import PropTypes from "prop-types";
import { godzinaMinutaDoSekund, sekundyDoGodzinMinutSekund } from "./utilsy";


const Odliczanie = (props) => {
    const sekundyLekcja = godzinaMinutaDoSekund(props.czasH, props.czasM, 0);
    const sekundyTeraz = godzinaMinutaDoSekund(props.obecnyCzas.godzina, props.obecnyCzas.minuta, props.obecnyCzas.sekunda )
    const pozostaloSekund = sekundyLekcja - sekundyTeraz;
    const pozostaloSekundTekst = pozostaloSekund > 0 ? sekundyDoGodzinMinutSekund(pozostaloSekund) : `ta lekcja odbędzie się dopiero jutro`;
    return (
    <div className="odliczanie">
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