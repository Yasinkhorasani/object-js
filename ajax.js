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

const Mietpartei = ({ vname, nname, wnr, km }) => {
    return {
        vname, nname, wnr, km, vname,
        get name() {
            return `${this.vname} ${this.nname}`;
        }
    };
}

// VARIABLEN / KONSTANTEN
let haus = {};

// Flags, umspäter festzustellen, ob Dateien erfolgreich geladen sind
let flags = {
    stammdatenLoaded: false,
    mietparteienLoaded: false
};

// FUNKTIONEN
// Geladene Daten verarbeiten
const processData = data => {

    haus.adresse = Adresse(data.adresse);
    haus.eigentuemer = {
        vname: data.eigentuemer.vname,
        nname: data.eigentuemer.nname,
        adresse: Adresse(data.eigentuemer.adresse)
    }

    // Datei wurde erfolgreich verarbeitet
    flags.stammdatenLoaded = true;

    output();

}

// Geladene Mietparteien verarbeiten
const processMietparteien = data => {
    haus.mietparteien = data.map(Mietpartei);

    // Datei wurde erfolgreich verarbeitet
    flags.mietparteienLoaded = true;

    output();
}

// Ausgabe
const output = () => {
    if (Object.values(flags).every(el => el)) {
        // 
        console.log(
            haus.mietparteien.find(el => el.wnr == 2).name
        );
    }
}

// Beliebige Daten per Ajax laden und als JSON an eine Callback-Funktion geben
const loadData = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) callback(JSON.parse(xhr.responseText))
        else console.warn(`${url} konnte nicht geladen werden (${xhr.statusText})`)
    });
    xhr.send();
}

// Initialisierung
const init = () => {
    loadData('./data/stammdaten.json', processData);
    loadData('./data/mietparteien.json', processMietparteien);
}

init();