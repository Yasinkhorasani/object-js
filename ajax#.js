'use strict';

// FACTORIES
// Eine Factory ist eine Funktion, die ein Objekt zurückgibt
// Um die Adressdaten als komplettes Objekt übergeben zu können, wird hier Destructuring ("named parameters") verwendet
const Adresse = ({ id, strasse, hnr, plz, ort }) => {
    return {
        id, strasse, hnr, plz, ort,
        get anschrift() {
            return `${this.strasse} ${this.hnr}\n${this.plz} ${this.ort}`;
        }
    }
}

// VARIABLEN / KONSTANTEN
let haus = {};

// FUNKTIONEN
// Geladene Daten verarbeiten
const processData = data => {

    haus.adresse = Adresse(data.adresse);
    haus.eigentuemer = {
        vname: data.eigentuemer.vname,
        nname: data.eigentuemer.nname,
        adresse: Adresse(data.eigentuemer.adresse)
    }

    console.log(haus);
}

// Beliebige Daten per Ajax laden und als JSON an eine Callback-Funktion geben
const loadData = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.addEventListener('load', () => {
        callback(JSON.parse(xhr.responseText))
    });
    xhr.send();
}

// Initialisierung
const init = () => {
    loadData('./data/stammdaten.json', processData);
}

init();