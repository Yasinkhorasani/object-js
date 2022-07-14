'use strict';

// Eine Factory ist eine Funktion, die ein Objekt zurückgibt
const Adresse = (id, strasse, hnr, plz, ort) => {
    return {id, strasse, hnr, plz, ort,get anschrift() {
            return `${this.strasse} ${this.hnr}\n${this.plz} ${this.ort}`;
        }
    }
}


const haus = {
    adresse: Adresse(1, 'Mustergasse', '37 1/3', '01234', 'Beispielbüttel'),

    eigentuemer: {
        vname: 'Thomas',
        nname: 'Schulz',

        adresse: Adresse(2, 'Schlossallee', '1', '01235', 'Nachbarstadt'),

    }
}

const init = () => {
    console.log(JSON.stringify(haus));
}

init();