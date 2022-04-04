// Javascript Programm gemeinden-deutschland-aufbereitung
// Hilfsprogramm für Aufbereitung der Gemeindedaten mit populierten Textfeldern statt Nummern
// Läuft über Ausgangs-JSON-Files, die etwas nachbearbeitete ndjson-Files aus dem Paket https://www.npmjs.com/package/gemeindeverzeichnis?activeTab=readme sind
// (Diese ndjson-Dateien nach json konvertiert (Alle "}}" am Zeilenende ersetzt durch "}}," und jeweils umschließende Array-Klammmern pro File eingefügt)
// Kann ausgeführt werden aus dem Verzeichnis \bim-click\bim-click-front-end\src\modules>
// Dort liegt sowohl dieses Programm als auch die benötigten obigen Hilfsdateien
// Das Programm generiert in dasselbe Verzeichnis die Datei gemeinden-deutschland-mit-namen-ihrer-verwaltungs-einheiten.json
// Diese wird in QSelect für Auswahl des Gemeindeschlüssels für eine Gemeinde als Options verwendet
// In obiges Verzeichnis in Powershell navigieren, dann als Command eingeben > node
// Dann das Programm starten mit gemeinden-deutschland-aufbereitung.js
// Oder in einem Commmand > node gemeinden-deutschland-aufbereitung
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
const fs = require("fs");
let laender = require("./laender.json");
let regierungsBezirke = require("./regierungsbezirke.json");
let kreise = require("./kreise.json");
let gemeindeVerbaende = require("./gemeindeverbaende.json");
let gemeinden = require("./gemeinden.json");
// Hilfsfunktionen:
function searchGemeindeVerbandName(gemeinde) {
    for (let gemeindeVerband of gemeindeVerbaende) {
        if (gemeindeVerband.schlüssel.land === gemeinde.schlüssel.land &&
            gemeindeVerband.schlüssel.regierungsbezirk === gemeinde.schlüssel.regierungsbezirk &&
            gemeindeVerband.schlüssel.kreis === gemeinde.schlüssel.kreis &&
            gemeindeVerband.schlüssel.gemeindeverband === gemeinde.schlüssel.gemeindeverband) {
            // Match!
            return gemeindeVerband.name
        } // else weitersuchen
    };
    console.log("ACHTUNG: Gemeindeverband mit Schlüssel ", gemeinde.schlüssel.gemeindeverband, " nicht gefunden für Gemeinde: ", gemeinde.name, " , Schlüssel: ", gemeinde.schlüssel.nummer);
    return "Undefiniert";
};
function searchKreisName(gemeinde) {
    for (let kreis of kreise) {
        if (kreis.schlüssel.land === gemeinde.schlüssel.land &&
            kreis.schlüssel.regierungsbezirk === gemeinde.schlüssel.regierungsbezirk &&
            kreis.schlüssel.kreis === gemeinde.schlüssel.kreis) {
            // Match!
            return kreis.name
        } // else weitersuchen
    };
    console.log("ACHTUNG: Kreis mit Schlüssel ", gemeinde.schlüssel.kreis, " nicht gefunden für Gemeinde: ", gemeinde.name, " , Schlüssel: ", gemeinde.schlüssel.nummer);
    return "Nicht vorhanden";
};
function searchRegierungsBezirkName(gemeinde) {
    for (let regierungsBezirk of regierungsBezirke) {
        if (regierungsBezirk.schlüssel.land === gemeinde.schlüssel.land &&
            regierungsBezirk.schlüssel.regierungsbezirk === gemeinde.schlüssel.regierungsbezirk) {
            // Match!
            return regierungsBezirk.name
        } // else weitersuchen
    };
    console.log("ACHTUNG: Regierungsbezirk mit Schlüssel ", gemeinde.schlüssel.regierungsbezirk, " nicht gefunden für Gemeinde: ", gemeinde.name, " , Schlüssel: ", gemeinde.schlüssel.nummer);
    return "Nicht vorhanden";
};
function searchLandName(gemeinde) {
    for (let land of laender) {
        if (land.schlüssel.land === gemeinde.schlüssel.land) {
            // Match!
            return land.name
        } // else weitersuchen
    };
    console.log("ACHTUNG: Land mit Schlüssel ", gemeinde.schlüssel.land, " nicht gefunden für Gemeinde: ", gemeinde.name, " , Schlüssel: ", gemeinde.schlüssel.nummer);
    return "Undefiniert";
};
//--------------------------------------------------------------------------------------------------------------------------------
// Hauptfunktion:
function gemeindenDeutschlandAufbereitung() {
    console.log("In gemeindenDeutschlandAufbereitung");
    // Alle Gemeinden durchlaufen und die Namen des Gemeindeverbands, Kreises, Regierungsbezirks und Landes aus den Nummern an der Gemeinde ermitteln
    for (let gemeinde of gemeinden) {
        gemeinde.namen = {}; // Leeres Unterobjekt für die einzutragenden Texte anlegen, ist notwendig!
        // Suche den Namen des Gemeindeverbands im Array gemeindeverbaende und füge diesen als Feld in ein Unterobjekt "namen" für diese Gemeinde:
        gemeinde.namen.gemeindeverband = searchGemeindeVerbandName(gemeinde); // Text für Gemeindeverband ermitteln und eintragen
        // Dito für Namen des Kreises:
        gemeinde.namen.kreis = searchKreisName(gemeinde); // Text für Kreis ermitteln und eintragen
        // Dito für Namen des Regierungsbezirks:
        gemeinde.namen.regierungsbezirk = searchRegierungsBezirkName(gemeinde); // Text für Regierungsbezirk ermitteln und eintragen
        // Dito für Namen des Bundeslands:
        gemeinde.namen.land = searchLandName(gemeinde); // Text für Bundesland ermitteln und eintragen
    };
    //----------------------------------------------------------
    // Ausgabe des Ergebnisses in File:
    console.log("Vor stringify");
    let stringifiedGemeinden = JSON.stringify(gemeinden);
    console.log("Vor writeFileSync"),
    fs.writeFileSync("gemeinden-deutschland-mit-namen-ihrer-verwaltungs-einheiten.json", stringifiedGemeinden);
    console.log("Ende von gemeindenDeutschlandAufbereitung()");
}

gemeindenDeutschlandAufbereitung()