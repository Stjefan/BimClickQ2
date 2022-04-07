// Node Module decimal-handling.js
// Modul für zentrale Funktionen zur Konvertierung von Dezimalzahlen
// const startMarker = "◥◤◥◤◥◤◥◤◥◤◥◤◥◤◥◤◥◤◥◤";
// const errorMarker = "❌❌❌❌❌❌❌❌❌❌";
// const successMarker = "✅✅✅✅✅✅✅✅✅✅";
//-----------------------------------------------------
export const decimalHandling = {
  //---------------------------------------------------------------------------------------------------------------
  // Aus Vorlage global-store.js - hier nicht benötigt:
  // Es folgen globalen Daten in state Objekt - diesen unbedingt initiale Testwerte zuweisen für Debugging!!!
  //----------------------------------------------------------------------------------------------------------------
  // state: {
  //   loggingLevel: 1,
  // }, // /state

  //-------------------------------------------------------------------------------------------------------------------
  // Methoden:
  //-------------------------------------------------------------------------------------------------------------------

  // Helper Functions für Konvertierung von Dezimalzahlen von/nach String aus/von Number nach Vorlagen:
  // 1) Funktion zur Konvertierung eines von VMoney erzeugten Dezimalstring mit "." als Tausender-Trennzeichen und "," als
  //    Dezimaltrennzeichen in eine Number, um darauf Arithmetik zu betreien
  // Vorlage: https://stackoverflow.com/questions/7431833/convert-string-with-dot-or-comma-as-decimal-separator-to-number-in-javascript
  // HINWEIS: Kann auch für potentiell notwendige Rückkonvertierung vor Save/Submit an das Backend
  // von String nach Number verwendet werden!
  // Die Funktion hieß ursprünglich: parsePotentiallyGroupedFloat(stringValue)
  // Umbenannt in: convertDecimalStringToNumber(stringValue)
  convertDecimalStringToNumber(stringValue) {
    console.log(
      "In convertDecimalStringToNumber(stringValue) - stringValue: ",
      stringValue
    );
    console.log("typeof(stringValue): ", typeof(stringValue))
    if (stringValue == null) return null; // NEU - Funktion wird neuerdings auch aufgerufen für Konvertierung
    // von kennWert1 vor Submit, dann lief der Code bei null-Werten in Error "Cannot read property 'trim' of null"
    if (typeof(stringValue) === "number") { // Zur Prävention, falls am Anfang die Funktion mit Number statt String aufgerufen wird
      return stringValue;
    };
    if (typeof(stringValue) === "string") {
      stringValue = stringValue.trim();
      // Der folgende Code funktionierte im Codepen, hier kam aber gleich 2 ESLint Fehler "Unncessary escape character:" für \- und \., für
      // die nächste und übernächste Code-Zeile - umgangen mit 2 ESLint Ignore Statements vor diesen Zeilen:
      // eslint-disable-next-line
      var result = stringValue.replace(/[^0-9\-]/g, ""); // Mit "\-" für negative Zahlen!
      // eslint-disable-next-line
      if (/[,\.]\d{2}$/.test(stringValue)) {
        result = result.replace(/(\d{2})$/, ".$1");
      }
      return parseFloat(result);
    };
    console.log("XXXXXXXXXXX Error: Unerwarteter Typ in decimal-handling.convertDecimalStringToNumber() - typeof(stringValue):", typeof(stringValue))
    return stringValue
  },

  // 2) "Umkehr"-Funktion, um eine Number (JS-Format, 1.23) in einen Dezimalstring (mit Dezimal- und Tausendertrennzeichen und
  //    einer variablen Anzahl von Dezimalstellen (decimals) zu konvertieren, wie es auch VMoney macht
  // Erste Fehlversuche mit Vorlagen aus: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string?noredirect=1&lq=1
  // PROBLEM mit der dortigen "Non ES-6 "Lösung": Die Tausender-Trennzeichen werden ab 6 Vorkommastellen nicht mehr korrekt gesetzt!
  // Daher diese Vorlage benutzt: https://spin.atomicobject.com/2016/01/04/javascript-math-precision-decimals/
  // Die Funktion hieß ursprünglich: formatMoney(value, decimals, decimalSeparator, thousandSeparator, currencyString)
  // Umbenannt in: convertNumberToDecimalString(numberValue, decimals, decimalSeparator, thousandSeparator, currencyString)
  convertNumberToDecimalString(
    numberValue,
    decimals,
    decimalSeparator,
    thousandSeparator,
    currencyString = ""
  ) {
    // console.log("In convertNumberToDecimalString()")
    if (numberValue == null || isNaN(numberValue)) return "";
    // ACHTUNG: Hier hatte die Vorlage vars für die folgenden 3 Parameter, funktionierte auf Codepen, hier Compile-Fehler! Deshalb die vars hier entfernt!
    decimals = isNaN(Math.abs(decimals)) ? 2 : decimals; // ACHTUNG: Hieß in Vorlage isNaN(c = Math.abs(decimals))!!! Compile Fehler! Geändert!
    decimalSeparator = decimalSeparator === undefined ? "." : decimalSeparator;
    thousandSeparator = thousandSeparator === undefined ? " " : thousandSeparator;
    var negativeSign = numberValue < 0 ? "-" : "";
    var numberValueNoDecimals = String(
      parseInt(
        (numberValue = Math.abs(Number(numberValue) || 0).toFixed(decimals))
      )
    );
    var spacingStart = 0;
    if (numberValueNoDecimals.length > 3) spacingStart = numberValueNoDecimals.length % 3; // ACHTUNG: Wird beim Compile nur ohne {} aktzeptiert, wenn in einer Zeile!
    var leadingNumber = spacingStart
      ? numberValueNoDecimals.substr(0, spacingStart) + thousandSeparator
      : "";
    var separatedMiddle = numberValueNoDecimals
      .substr(spacingStart)
      .replace(/(\d{3})(?=\d)/g, "$1" + thousandSeparator);
    decimals = decimals // ACHTUNG: Hier hatte die Vorlage nochmals ein "var decimals" - funktionierte auf Codepen, hier Compile-Fehler! Deshalb var hier entfernt!
      ? decimalSeparator +
        Math.abs(numberValue - numberValueNoDecimals)
          .toFixed(decimals)
          .slice(2)
      : "";
    var result =
      negativeSign +
      leadingNumber +
      separatedMiddle +
      decimals +
      currencyString;
    return result.trim();
  }
};
