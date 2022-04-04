// Node Module math-handling.js
// Modul für zentrale Funktionen mit mathematischen Berechnungen
//-----------------------------------------------------
export const MathHandling = {
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
  // Helper Functions

  //-----------------------------------------------------------------------------------------------------------------------
  // 1) Funktion zur Berechnung des Sättigungsdampfdrucks nach DIN 13788 Anhang E1
  // Parameter: temperatur - Number oder String
  // Returned Sättigungsdampfdruck als Number
  computeSaettigungsDampfDruck(temperatur) {
    console.log(
      "In computeSaettigungsDampfDruck(temperatur) - temperatur: ",
      temperatur
    );
    console.log("typeof(temperatur): ", typeof temperatur);
    if (temperatur == null || temperatur === "") {
      console.log("Parameter temperatur ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let temperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter temperatur sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof temperatur === "string") {
      temperaturNumber = parseFloat(temperatur);
    } else {
      temperaturNumber = temperatur;
    }
    //------------------------------------------------------------------------------------------------------------------
    let saettigungsDampfDruck = null; // Number
    let exponent = null; // Hilfsvariable
    if (temperaturNumber >= 0) {
      // Fall E.1
      console.log("Fall E.1");
      exponent = (17.269 * temperaturNumber) / (237.3 + temperaturNumber);
    } else {
      // Fall E.2
      console.log("Fall E.2");
      exponent = (21.875 * temperaturNumber) / (265.5 + temperaturNumber);
    }
    console.log("exponent: ", exponent);
    saettigungsDampfDruck = 610.5 * Math.exp(exponent);
    console.log("saettigungsDampfDruck vor Runden: ", saettigungsDampfDruck);
    saettigungsDampfDruck = Math.round(saettigungsDampfDruck * 1) / 1; // KEINE Nachkommastelle
    console.log("saettigungsDampfDruck nach Runden: ", saettigungsDampfDruck);
    return saettigungsDampfDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 2) Funktion zur Berechnung des Wasserdampfpartialdrucks der Außenluft:
  // Parameter: relativeFeuchte - Number oder String
  //            saettigungsDampfdruck - Number oder String
  // Returned Wasserdampfpartialdruck als Number
  computeWasserDampfPartialDruckAussenLuft(relativeFeuchte, saettigungsDampfDruck) {
    console.log(
      "In computeWasserDampfPartialDruckAussenLuft(relativeFeuchte, wasserDampfPartialDruck)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log("relativeFeuchte: ", relativeFeuchte);
    console.log("typeof(relativeFeuchte): ", typeof relativeFeuchte);
    console.log("saettigungsDampfDruck: ", saettigungsDampfDruck);
    console.log(
      "typeof(saettigungsDampfDruck): ",
      typeof saettigungsDampfDruck
    );
    if (
      relativeFeuchte == null ||
      saettigungsDampfDruck == null ||
      relativeFeuchte === "" ||
      saettigungsDampfDruck === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let relativeFeuchteNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter relativeFeuchte sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof relativeFeuchte === "string") {
      relativeFeuchteNumber = parseFloat(relativeFeuchte);
    } else {
      relativeFeuchteNumber = relativeFeuchte;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let saettigungsDampfDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter saettigungsDampfDruck sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof saettigungsDampfDruck === "string") {
      saettigungsDampfDruckNumber = parseFloat(saettigungsDampfDruck);
    } else {
      saettigungsDampfDruckNumber = saettigungsDampfDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    let wasserDampfPartialDruck =
      (relativeFeuchteNumber / 100) * saettigungsDampfDruckNumber;
    console.log(
      "wasserDampfPartialDruck vor Runden: ",
      wasserDampfPartialDruck
    );
    wasserDampfPartialDruck = Math.round(wasserDampfPartialDruck * 1) / 1; // KEINE Nachkommastelle
    console.log(
      "wasserDampfPartialDruck nach Runden: ",
      wasserDampfPartialDruck
    );
    return wasserDampfPartialDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 3.a) Funktion zur Berechnung des Wasserdampfpartialdrucks der Innenluft im ungeregelten Fall
  // Parameter: wasserDampfPartialDruckAussenLuft - Number oder String
  //            deltaP - String (Aufzählungswert)!!!
  // Diese wird verwendet:
  // - Für Sollwert nach DIN 13788 bei ungeregelter Luftfeuchte
  // - Für Istwert für den Raum im Fall von ungeregelter Luftfeuchte
  // Returned Wasserdampfpartialdruck der Innenluft als Number (Summe der beiden Parameter)
  computeWasserDampfPartialDruckInnenLuftUngeregelt(
    wasserDampfPartialDruckAussenLuft,
    deltaP
  ) {
    console.log(
      "In computeWasserDampfPartialDruckInnenLuftUngeregelt(wasserDampfPartialDruckAussenLuft, deltaP)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "wasserDampfPartialDruckAussenLuft: ",
      wasserDampfPartialDruckAussenLuft
    );
    console.log(
      "typeof(wasserDampfPartialDruckAussenLuft): ",
      typeof wasserDampfPartialDruckAussenLuft
    );
    console.log("deltaP: ", deltaP);
    console.log("typeof(deltaP): ", typeof deltaP);
    if (
      wasserDampfPartialDruckAussenLuft == null ||
      deltaP == null ||
      wasserDampfPartialDruckAussenLuft === "" ||
      deltaP === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let wasserDampfPartialDruckAussenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter wasserDampfPartialDruckAussenLuft sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruckAussenLuft === "string") {
      wasserDampfPartialDruckAussenLuftNumber = parseFloat(
        wasserDampfPartialDruckAussenLuft
      );
    } else {
      wasserDampfPartialDruckAussenLuftNumber = wasserDampfPartialDruckAussenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Das Feld deltaP (Aufzählungswert) hat normalerweise den Typ String, muss daher erst nach Number konvertiert werden:
    let deltaPNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter deltaP sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof deltaP === "string") {
      deltaPNumber = parseFloat(deltaP);
    } else {
      deltaPNumber = deltaP;
    }
    //------------------------------------------------------------------------------------------------------------------
    let wasserDampfPartialDruck =
      wasserDampfPartialDruckAussenLuftNumber + deltaPNumber;
    console.log(
      "wasserDampfPartialDruck vor Runden: ",
      wasserDampfPartialDruck
    );
    wasserDampfPartialDruck = Math.round(wasserDampfPartialDruck * 1) / 1; // Keine Nachkommastelle
    console.log(
      "wasserDampfPartialDruck nach Runden: ",
      wasserDampfPartialDruck
    );
    return wasserDampfPartialDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 3.b) Funktion zur Berechnung des Wasserdampfpartialdrucks der Innenluft aus der Luftfeuchte
  // Diese wird verwendet:
  // - Für Sollwert nach DIN 13788 geregelt bei geregelter Luftfeuchte
  // - Für Sollwert nach DIN 4108-2 bei fester Luftfeuchte
  // - Für Istwert für den Raum im Fall von geregelter Luftfeuchte
  // Parameter: relativeLuftFeuchteInnenLuft - Number oder String
  //            saettigungsDampfDruckInnenLuft - Number oder String
  // Returned Wasserdampfpartialdruck der Innenluft als Number (Produkt der beiden Parameter dividiert durch 100)
  computeWasserDampfPartialDruckInnenLuftAusLuftFeuchte(
    relativeLuftFeuchteInnenLuft,
    saettigungsDampfDruckInnenLuft
  ) {
    console.log(
      "In computeWasserDampfPartialDruckInnenLuftAusLuftFeuchte(relativeLuftFeuchteInnenLuft, saettigungsDampfDruckInnenLuft)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "relativeLuftFeuchteInnenLuft: ",
      relativeLuftFeuchteInnenLuft
    );
    console.log(
      "typeof(relativeLuftFeuchteInnenLuft): ",
      typeof relativeLuftFeuchteInnenLuft
    );
    console.log("saettigungsDampfDruckInnenLuft: ", saettigungsDampfDruckInnenLuft);
    console.log("typeof(saettigungsDampfDruckInnenLuft): ", typeof saettigungsDampfDruckInnenLuft);
    if (
      relativeLuftFeuchteInnenLuft == null ||
      saettigungsDampfDruckInnenLuft == null ||
      relativeLuftFeuchteInnenLuft === "" ||
      saettigungsDampfDruckInnenLuft === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let relativeLuftFeuchteInnenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter relativeLuftFeuchteInnenLuft sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof relativeLuftFeuchteInnenLuft === "string") {
      relativeLuftFeuchteInnenLuftNumber = parseFloat(
        relativeLuftFeuchteInnenLuft
      );
    } else {
      relativeLuftFeuchteInnenLuftNumber = relativeLuftFeuchteInnenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let saettigungsDampfDruckInnenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter saettigungsDampfDruckInnenLuft sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof saettigungsDampfDruckInnenLuft === "string") {
      saettigungsDampfDruckInnenLuftNumber = parseFloat(saettigungsDampfDruckInnenLuft);
    } else {
      saettigungsDampfDruckInnenLuftNumber = saettigungsDampfDruckInnenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    let wasserDampfPartialDruck =
      (relativeLuftFeuchteInnenLuftNumber / 100) * saettigungsDampfDruckInnenLuftNumber;
    console.log(
      "wasserDampfPartialDruck vor Runden: ",
      wasserDampfPartialDruck
    );
    wasserDampfPartialDruck = Math.round(wasserDampfPartialDruck * 1) / 1; // Keine Nachkommastelle
    console.log(
      "wasserDampfPartialDruck nach Runden: ",
      wasserDampfPartialDruck
    );
    return wasserDampfPartialDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 4) Funktion zur Berechnung der relativen Luftfeuchte der Innenluft
  // Parameter: wasserDampfPartialDruckInnenLuft - Number oder String
  //            wasserDampfSaettigungsDruckInnenLuft - Number oder String
  // Returned relative Luftfeuchte als Number (Quotient der beiden Parameter)
  computeRelativeLuftFeuchteInnenLuft(
    wasserDampfPartialDruckInnenLuft,
    wasserDampfSaettigungsDruckInnenLuft
  ) {
    console.log(
      "In computeRelativeLuftFeuchteInnenLuft( wasserDampfPartialDruckInnenLuft, wasserDampfSaettigungsDruckInnenLuft)"
    );
    if (
      wasserDampfPartialDruckInnenLuft == null ||
      wasserDampfSaettigungsDruckInnenLuft == null ||
      wasserDampfPartialDruckInnenLuft === "" ||
      wasserDampfSaettigungsDruckInnenLuft === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "wasserDampfPartialDruckInnenLuft: ",
      wasserDampfPartialDruckInnenLuft
    );
    console.log(
      "typeof(wasserDampfPartialDruckInnenLuft): ",
      typeof wasserDampfPartialDruckInnenLuft
    );
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let wasserDampfPartialDruckInnenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruckInnenLuft === "string") {
      wasserDampfPartialDruckInnenLuftNumber = parseFloat(
        wasserDampfPartialDruckInnenLuft
      );
    } else {
      wasserDampfPartialDruckInnenLuftNumber = wasserDampfPartialDruckInnenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "wasserDampfSaettigungsDruckInnenLuft: ",
      wasserDampfSaettigungsDruckInnenLuft
    );
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(wasserDampfSaettigungsDruckInnenLuft): ",
      typeof wasserDampfSaettigungsDruckInnenLuft
    );
    let wasserDampfSaettigungsDruckInnenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfSaettigungsDruckInnenLuft === "string") {
      wasserDampfSaettigungsDruckInnenLuftNumber = parseFloat(
        wasserDampfSaettigungsDruckInnenLuft
      );
    } else {
      wasserDampfSaettigungsDruckInnenLuftNumber = wasserDampfSaettigungsDruckInnenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    let relativeLuftFeuchte =
      (wasserDampfPartialDruckInnenLuftNumber /
        wasserDampfSaettigungsDruckInnenLuftNumber) *
      100;
    console.log("relativeLuftFeuchte vor Runden: ", relativeLuftFeuchte);
    relativeLuftFeuchte = Math.round(relativeLuftFeuchte * 1) / 1; // Keine Nachkommastelle
    console.log("relativeLuftFeuchte nach Runden: ", relativeLuftFeuchte);
    return relativeLuftFeuchte;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 4) Funktion zur Berechnung der Dichte der trockenen Innenluft
  // Parameter: temperatur - Number oder String
  // Returned Dichte der trockenen Luft als Number nach Formel
  computeDichteTrockeneInnenLuft(temperatur) {
    console.log("In computeDichteTrockeneInnenLuft(temperatur)");
    console.log("temperatur: ", temperatur);
    console.log("typeof(temperatur): ", typeof temperatur);
    if (temperatur == null || temperatur === "") {
      console.log("Parameter temperatur ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let temperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof temperatur === "string") {
      temperaturNumber = parseFloat(temperatur);
    } else {
      temperaturNumber = temperatur;
    }
    //------------------------------------------------------------------------------------------------------------------
    let DichteTrockeneInnenLuft = (0.348 * 1013) / (273.15 + temperaturNumber); // Formel laut XLS
    console.log(
      "DichteTrockeneInnenLuft vor Runden: ",
      DichteTrockeneInnenLuft
    );
    DichteTrockeneInnenLuft = Math.round(DichteTrockeneInnenLuft * 1000) / 1000; // 3 Nachkommastellen
    console.log(
      "DichteTrockeneInnenLuft nach Runden: ",
      DichteTrockeneInnenLuft
    );
    return DichteTrockeneInnenLuft;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 5) Funktion zur Berechnung der Dichte der feuchten Innenluft
  // Parameter: dichteTrockeneLuft - Number oder String
  //            wasserDampfPartialDruck - Number oder String
  //            temperatur - Number oder String
  // Returned Dichte der feuchten Luft als Number nach Formel
  computeDichteFeuchteInnenLuft(
    dichteTrockeneLuft,
    wasserDampfPartialDruck,
    temperatur
  ) {
    console.log(
      "In computeDichteFeuchteInnenLuft(dichteTrockeneLuft, wasserDampfPartialDruck, temperatur)"
    );
    //----------------------------------------------------------------------------------------------------------------
    console.log("dichteTrockeneLuft: ", dichteTrockeneLuft);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(dichteTrockeneLuft): ", typeof dichteTrockeneLuft);
    if (dichteTrockeneLuft == null || dichteTrockeneLuft === "") {
      console.log("Parameter dichteTrockeneLuft ist null oder ''");
      return null;
    }
    let dichteTrockeneLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof dichteTrockeneLuft === "string") {
      dichteTrockeneLuftNumber = parseFloat(dichteTrockeneLuft);
    } else {
      dichteTrockeneLuftNumber = dichteTrockeneLuft;
    }
    //-----------------------------------------------------------------------------------------------------------------
    console.log("wasserDampfPartialDruck: ", wasserDampfPartialDruck);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(wasserDampfPartialDruck): ",
      typeof wasserDampfPartialDruck
    );
    if (wasserDampfPartialDruck == null || wasserDampfPartialDruck === "") {
      console.log("Parameter wasserDampfPartialDruck ist null oder ''");
      return null;
    }
    let wasserDampfPartialDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruck === "string") {
      wasserDampfPartialDruckNumber = parseFloat(wasserDampfPartialDruck);
    } else {
      wasserDampfPartialDruckNumber = wasserDampfPartialDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("temperatur: ", temperatur);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(temperatur): ", typeof temperatur);
    if (temperatur == null || temperatur === "") {
      console.log("Parameter temperatur ist null oder ''");
      return null;
    }
    let temperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof temperatur === "string") {
      temperaturNumber = parseFloat(temperatur);
    } else {
      temperaturNumber = temperatur;
    }
    //-----------------------------------------------------------------------------------------------------------------
    let DichteFeuchteInnenLuft =
      dichteTrockeneLuftNumber -
      (0.132 * wasserDampfPartialDruckNumber) /
        100 /
        (273.15 + temperaturNumber); // Formel laut XLS
    console.log("DichteFeuchteInnenLuft vor Runden: ", DichteFeuchteInnenLuft);
    DichteFeuchteInnenLuft = Math.round(DichteFeuchteInnenLuft * 1000) / 1000; // 3 Nachkommastellen
    console.log("DichteFeuchteInnenLuft nach Runden: ", DichteFeuchteInnenLuft);
    return DichteFeuchteInnenLuft;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 6) Funktion zur Berechnung des massebezogenen Wassergehalts der Luft
  // Parameter: wasserDampfPartialDruck - Number oder String
  // Returned massebezogenen Wassergehalt der Luft als Number nach Formel
  computeMasseBezogenerWasserGehalt(wasserDampfPartialDruck) {
    console.log(
      "In computeMasseBezogenerWasserGehalt(wasserDampfPartialDruck)"
    );
    console.log("wasserDampfPartialDruck: ", wasserDampfPartialDruck);
    console.log(
      "typeof(wasserDampfPartialDruck): ",
      typeof wasserDampfPartialDruck
    );
    if (wasserDampfPartialDruck == null || wasserDampfPartialDruck === "") {
      console.log("Parameter wasserDampfPartialDruck ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let wasserDampfPartialDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruck === "string") {
      wasserDampfPartialDruckNumber = parseFloat(wasserDampfPartialDruck);
    } else {
      wasserDampfPartialDruckNumber = wasserDampfPartialDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    let masseBezogenerWasserGehalt =
      ((0.6222 * wasserDampfPartialDruckNumber) /
        (101300 - wasserDampfPartialDruckNumber)) *
      1000; // Formel laut XLS
    console.log(
      "masseBezogenerWasserGehalt vor Runden: ",
      masseBezogenerWasserGehalt
    );
    masseBezogenerWasserGehalt =
      Math.round(masseBezogenerWasserGehalt * 100) / 100; // 2 Nachkommastellen
    console.log(
      "masseBezogenerWasserGehalt nach Runden: ",
      masseBezogenerWasserGehalt
    );
    return masseBezogenerWasserGehalt;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 7) Funktion zur Berechnung des volumenbezogenen Wassergehalts der Luft
  // Parameter: masseBezogenerWasserGehalt - Number oder String
  //            dichteFeuchteLuft - Number oder String
  // Returned volumenbezogenen Wassergehalt der Luft als Number nach Formel (Produkt der beiden Parameter)
  computeVolumenBezogenerWasserGehalt(
    masseBezogenerWasserGehalt,
    dichteFeuchteLuft
  ) {
    console.log(
      "In computeVolumenBezogenerWasserGehalt(masseBezogenerWasserGehalt, dichteFeuchteLuft)"
    );
    if (
      masseBezogenerWasserGehalt == null ||
      dichteFeuchteLuft == null ||
      masseBezogenerWasserGehalt === "" ||
      dichteFeuchteLuft === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("masseBezogenerWasserGehalt: ", masseBezogenerWasserGehalt);
    console.log(
      "typeof(masseBezogenerWasserGehalt): ",
      typeof masseBezogenerWasserGehalt
    );
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let masseBezogenerWasserGehaltNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof masseBezogenerWasserGehalt === "string") {
      masseBezogenerWasserGehaltNumber = parseFloat(masseBezogenerWasserGehalt);
    } else {
      masseBezogenerWasserGehaltNumber = masseBezogenerWasserGehalt;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("dichteFeuchteLuft: ", dichteFeuchteLuft);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(dichteFeuchteLuft): ", typeof dichteFeuchteLuft);
    let dichteFeuchteLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof dichteFeuchteLuft === "string") {
      dichteFeuchteLuftNumber = parseFloat(dichteFeuchteLuft);
    } else {
      dichteFeuchteLuftNumber = dichteFeuchteLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    let volumenBezogenerWasserGehalt =
      masseBezogenerWasserGehaltNumber * dichteFeuchteLuftNumber;
    console.log(
      "volumenBezogenerWasserGehalt vor Runden: ",
      volumenBezogenerWasserGehalt
    );
    volumenBezogenerWasserGehalt =
      Math.round(volumenBezogenerWasserGehalt * 100) / 100; // Zwei Nachkommastellen
    console.log(
      "volumenBezogenerWasserGehalt nach Runden: ",
      volumenBezogenerWasserGehalt
    );
    return volumenBezogenerWasserGehalt;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 8) Funktion zur Berechnung der Dichte der trockenen Außenluft
  // Parameter: temperatur - Number oder String
  // Returned Dichte der trockenen Außenluft als Number
  computeDichteTrockeneAussenLuft(temperatur) {
    console.log(
      "In computeDichteTrockeneAussenLuft(temperatur) - temperatur: ",
      temperatur
    );
    console.log("typeof(temperatur): ", typeof temperatur);
    if (temperatur == null || temperatur === "") {
      console.log("Parameter temperatur ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let temperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter temperatur sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof temperatur === "string") {
      temperaturNumber = parseFloat(temperatur);
    } else {
      temperaturNumber = temperatur;
    }
    //------------------------------------------------------------------------------------------------------------------
    let dichteTrockeneAussenLuft = (0.348 * 1013) / (273.15 + temperaturNumber); // Laut XLS "DIN 13788 Tauwasser am Fenster"
    console.log(
      "dichteTrockeneAussenLuft vor Runden: ",
      dichteTrockeneAussenLuft
    );
    dichteTrockeneAussenLuft =
      Math.round(dichteTrockeneAussenLuft * 1000) / 1000; // 3 Nachkommastellen
    console.log(
      "dichteTrockeneAussenLuft nach Runden: ",
      dichteTrockeneAussenLuft
    );
    return dichteTrockeneAussenLuft;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 9) Funktion zur Berechnung der Dichte der Außenluft bei Auslegungsklima
  // Parameter: dichteTrockeneLuft - Number oder String
  //            wasserDampfPartialDruck - Number oder String
  //            temperatur - Number oder String
  // Returned Dichte der feuchten Außenluft als Number nach Formel
  computeDichteAussenLuftAuslegungsKlima(
    dichteTrockeneLuft,
    wasserDampfPartialDruck,
    temperatur
  ) {
    console.log(
      "In computeDichteAussenLuftAuslegungsKlima(dichteTrockeneLuft, wasserDampfPartialDruck, temperatur)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log("dichteTrockeneLuft: ", dichteTrockeneLuft);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(dichteTrockeneLuft): ", typeof dichteTrockeneLuft);
    if (dichteTrockeneLuft == null || dichteTrockeneLuft === "") {
      console.log("Parameter dichteTrockeneLuft ist null oder ''");
      return null;
    }
    let dichteTrockeneLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof dichteTrockeneLuft === "string") {
      dichteTrockeneLuftNumber = parseFloat(dichteTrockeneLuft);
    } else {
      dichteTrockeneLuftNumber = dichteTrockeneLuft;
    }
    //-----------------------------------------------------------------------------------------------------------------
    console.log("wasserDampfPartialDruck: ", wasserDampfPartialDruck);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(wasserDampfPartialDruck): ",
      typeof wasserDampfPartialDruck
    );
    if (wasserDampfPartialDruck == null || wasserDampfPartialDruck === "") {
      console.log("Parameter wasserDampfPartialDruck ist null oder ''");
      return null;
    }
    let wasserDampfPartialDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruck === "string") {
      wasserDampfPartialDruckNumber = parseFloat(wasserDampfPartialDruck);
    } else {
      wasserDampfPartialDruckNumber = wasserDampfPartialDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("temperatur: ", temperatur);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(temperatur): ", typeof temperatur);
    if (temperatur == null || temperatur === "") {
      console.log("Parameter temperatur ist null oder ''");
      return null;
    }
    let temperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof temperatur === "string") {
      temperaturNumber = parseFloat(temperatur);
    } else {
      temperaturNumber = temperatur;
    }
    //-----------------------------------------------------------------------------------------------------------------
    let dichteAussenLuftAuslegungsKlima =
      dichteTrockeneLuftNumber -
      (0.132 * wasserDampfPartialDruckNumber) /
        100 /
        (273.15 + temperaturNumber);
    console.log(
      "dichteAussenLuftAuslegungsKlima vor Runden: ",
      dichteAussenLuftAuslegungsKlima
    );
    dichteAussenLuftAuslegungsKlima =
      Math.round(dichteAussenLuftAuslegungsKlima * 1000) / 1000; // 3 Nachkommastellen
    console.log(
      "dichteAussenLuftAuslegungsKlima nach Runden: ",
      dichteAussenLuftAuslegungsKlima
    );
    return dichteAussenLuftAuslegungsKlima;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 10) Funktion zur Berechnung des Auftriebsdruck des Raums bei Raumhöhe
  // Parameter: dichteAussenLuftAuslegungsKlima - Number oder String
  //            dichteFeuchteInnenLuft- Number oder String
  //            raumHoehe - Number oder String
  // Returned Auftriebsdruck als Number nach Formel
  // Formel: Delta-Rho * g * h
  // Delta-Rho: Dichteunterschied zwischen der (feuchten) Außenluft und der feuchten Raumluft
  // g: Erdbeschleunigung, 9.81 [m/s²]
  // h: Raumhöhe h [m]
  computeAuftriebsDruck(
    dichteAussenLuftAuslegungsKlima,
    dichteFeuchteInnenLuft,
    raumHoehe
  ) {
    console.log(
      "In computeAuftriebsDruck(dichteAussenLuftAuslegungsKlima, dichteFeuchteInnenLuft, raumHoehe)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "dichteAussenLuftAuslegungsKlima: ",
      dichteAussenLuftAuslegungsKlima
    );
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(dichteAussenLuftAuslegungsKlima): ",
      typeof dichteAussenLuftAuslegungsKlima
    );
    if (
      dichteAussenLuftAuslegungsKlima == null ||
      dichteAussenLuftAuslegungsKlima === ""
    ) {
      console.log("Parameter dichteAussenLuftAuslegungsKlima ist null oder ''");
      return null;
    }
    let dichteAussenLuftAuslegungsKlimaNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof dichteAussenLuftAuslegungsKlima === "string") {
      dichteAussenLuftAuslegungsKlimaNumber = parseFloat(
        dichteAussenLuftAuslegungsKlima
      );
    } else {
      dichteAussenLuftAuslegungsKlimaNumber = dichteAussenLuftAuslegungsKlima;
    }
    //-----------------------------------------------------------------------------------------------------------------
    console.log("dichteFeuchteInnenLuft: ", dichteFeuchteInnenLuft);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(dichteFeuchteInnenLuft): ",
      typeof dichteFeuchteInnenLuft
    );
    if (dichteFeuchteInnenLuft == null || dichteFeuchteInnenLuft === "") {
      console.log("Parameter dichteFeuchteInnenLuft ist null oder ''");
      return null;
    }
    let dichteFeuchteInnenLuftNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof dichteFeuchteInnenLuft === "string") {
      dichteFeuchteInnenLuftNumber = parseFloat(dichteFeuchteInnenLuft);
    } else {
      dichteFeuchteInnenLuftNumber = dichteFeuchteInnenLuft;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("raumHoehe: ", raumHoehe);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(raumHoehe): ", typeof raumHoehe);
    if (raumHoehe == null || raumHoehe === "") {
      console.log("Parameter raumHoehe ist null oder ''");
      return null;
    }
    let raumHoeheNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof raumHoehe === "string") {
      raumHoeheNumber = parseFloat(raumHoehe);
    } else {
      raumHoeheNumber = raumHoehe;
    }
    //-----------------------------------------------------------------------------------------------------------------
    let auftriebsDruck =
      (dichteAussenLuftAuslegungsKlimaNumber - dichteFeuchteInnenLuftNumber) *
      9.81 *
      raumHoeheNumber;
    console.log("auftriebsDruck vor Runden: ", auftriebsDruck);
    auftriebsDruck = Math.round(auftriebsDruck * 1) / 1; // Keine Nachkommastelle
    console.log("auftriebsDruck nach Runden: ", auftriebsDruck);
    return auftriebsDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 11) Funktion zur Berechnung des Höchst-Wasserdampfpartialdrucks zur Vermeidung von Tauwasser/Schimmel/Korrosion
  // Parameter: relativeFeuchte - Number oder String
  //            wasserDampfPartialDruck - Number oder String
  // Berechnung nach Formel: (wasserDampfPartialDruck / relativeFeuchte) * 100
  // Returned Mindest-Sättigungsdampfdruck als Number
  computeHoechstWasserDampfPartialDruck(
    relativeFeuchte,
    wasserDampfPartialDruck
  ) {
    console.log(
      "In computeHoechstWasserDampfPartialDruck(relativeFeuchte, wasserDampfPartialDruck)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log("relativeFeuchte: ", relativeFeuchte);
    console.log("typeof(relativeFeuchte): ", typeof relativeFeuchte);
    console.log("wasserDampfPartialDruck: ", wasserDampfPartialDruck);
    console.log(
      "typeof(wasserDampfPartialDruck): ",
      typeof wasserDampfPartialDruck
    );
    if (
      relativeFeuchte == null ||
      wasserDampfPartialDruck == null ||
      relativeFeuchte === "" ||
      wasserDampfPartialDruck === ""
    ) {
      console.log("Einer der Parameter ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let relativeFeuchteNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter relativeFeuchte sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof relativeFeuchte === "string") {
      relativeFeuchteNumber = parseFloat(relativeFeuchte);
    } else {
      relativeFeuchteNumber = relativeFeuchte;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let wasserDampfPartialDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter wasserDampfPartialDruck sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof wasserDampfPartialDruck === "string") {
      wasserDampfPartialDruckNumber = parseFloat(wasserDampfPartialDruck);
    } else {
      wasserDampfPartialDruckNumber = wasserDampfPartialDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    let hoechstWasserDampfPartialDruck =
      (wasserDampfPartialDruckNumber / relativeFeuchteNumber) * 100
    console.log("hoechstWasserDampfPartialDruck vor Runden: ", hoechstWasserDampfPartialDruck);
    hoechstWasserDampfPartialDruck = Math.round(hoechstWasserDampfPartialDruck * 1) / 1; // KEINE Nachkommastelle
    console.log("hoechstWasserDampfPartialDruck nach Runden: ", hoechstWasserDampfPartialDruck);
    return hoechstWasserDampfPartialDruck;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 12) Funktion zur Berechnung der Mindest-Oberflächentemperatur zur Vermeidung von Tauwasser/Schimmel/Korrosion
  // Parameter: hoechstWasserDampfPartialDruck - Number oder String
  // Returned Mindest-Oberflächentemperatur als Number
  computeMindestOberflaechenTemperatur(hoechstWasserDampfPartialDruck) {
    console.log(
      "In computeMindestOberflaechenTemperatur(hoechstWasserDampfPartialDruck) - hoechstWasserDampfPartialDruck: ",
      hoechstWasserDampfPartialDruck
    );
    console.log("typeof(hoechstWasserDampfPartialDruck): ", typeof hoechstWasserDampfPartialDruck);
    if (hoechstWasserDampfPartialDruck == null || hoechstWasserDampfPartialDruck === "") {
      console.log("Parameter hoechstWasserDampfPartialDruck ist null oder ''");
      return null;
    }
    //------------------------------------------------------------------------------------------------------------------
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    let hoechstWasserDampfPartialDruckNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter hoechstWasserDampfPartialDruck sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof hoechstWasserDampfPartialDruck === "string") {
      hoechstWasserDampfPartialDruckNumber = parseFloat(hoechstWasserDampfPartialDruck);
    } else {
      hoechstWasserDampfPartialDruckNumber = hoechstWasserDampfPartialDruck;
    }
    //------------------------------------------------------------------------------------------------------------------
    let logResult = Math.log(hoechstWasserDampfPartialDruckNumber / 610.5);
    console.log("logResult: ", logResult)
    let mindestOberflaechenTemperatur = (237.3 * logResult) / (17.269 - logResult) // Laut XLS "DIN 13788 Tauwasser am Fenster"
    console.log(
      "mindestOberflaechenTemperatur vor Runden: ",
      mindestOberflaechenTemperatur
    );
    mindestOberflaechenTemperatur =
      Math.round(mindestOberflaechenTemperatur * 10) / 10; // 1 Nachkommastelle
    console.log(
      "mindestOberflaechenTemperatur nach Runden: ",
      mindestOberflaechenTemperatur
    );
    return mindestOberflaechenTemperatur;
  },

  //-----------------------------------------------------------------------------------------------------------------------
  // 14) Funktion zur Berechnung des Mindest-Bemessungs-Temperaturfaktors
  // Parameter: mindestOberflaechenTemperatur - Number oder String
  //            innenLuftTemperatur - Number oder String
  //            aussenLuftTemperatur - Number oder String
  // Returned Auftriebsdruck als Number nach Formel
  // Formel: fRsi,min = (tsi,min - te) / (ti - te)
  // tsi: Mindestoberflächentemperatur
  // ti: Innenlufttemperatur des Raums
  // te: Außenlufttemperatur des Raums
  computeMindestBemessungsTemperaturFaktor(
    mindestOberflaechenTemperatur,
    innenLuftTemperatur,
    aussenLuftTemperatur
  ) {
    console.log(
      "In computeMindestBemessungsTemperaturFaktor(mindestOberflaechenTemperatur, innenLuftTemperatur, aussenLuftTemperatur)"
    );
    //------------------------------------------------------------------------------------------------------------------
    console.log(
      "mindestOberflaechenTemperatur: ",
      mindestOberflaechenTemperatur
    );
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(mindestOberflaechenTemperatur): ",
      typeof mindestOberflaechenTemperatur
    );
    if (
      mindestOberflaechenTemperatur == null ||
      mindestOberflaechenTemperatur === ""
    ) {
      console.log("Parameter mindestOberflaechenTemperatur ist null oder ''");
      return null;
    }
    let mindestOberflaechenTemperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof mindestOberflaechenTemperatur === "string") {
      mindestOberflaechenTemperaturNumber = parseFloat(
        mindestOberflaechenTemperatur
      );
    } else {
      mindestOberflaechenTemperaturNumber = mindestOberflaechenTemperatur;
    }
    //-----------------------------------------------------------------------------------------------------------------
    console.log("innenLuftTemperatur: ", innenLuftTemperatur);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log(
      "typeof(innenLuftTemperatur): ",
      typeof innenLuftTemperatur
    );
    if (innenLuftTemperatur == null || innenLuftTemperatur === "") {
      console.log("Parameter innenLuftTemperatur ist null oder ''");
      return null;
    }
    let innenLuftTemperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof innenLuftTemperatur === "string") {
      innenLuftTemperaturNumber = parseFloat(innenLuftTemperatur);
    } else {
      innenLuftTemperaturNumber = innenLuftTemperatur;
    }
    //------------------------------------------------------------------------------------------------------------------
    console.log("aussenLuftTemperatur: ", aussenLuftTemperatur);
    // ACHTUNG: Nach Eingaben kann dieses Feld temporär den Typ String haben, muss daher erst nach Number konvertiert werden:
    console.log("typeof(aussenLuftTemperatur): ", typeof aussenLuftTemperatur);
    if (aussenLuftTemperatur == null || aussenLuftTemperatur === "") {
      console.log("Parameter aussenLuftTemperatur ist null oder ''");
      return null;
    }
    let aussenLuftTemperaturNumber = null;
    // ACHTUNG: Separate Variable für Number-Umwandlung, der Parameter sollte nicht per Seiteneffekt umgewandelt werden, sonst evtl. Reactivity Fehler!!!
    if (typeof aussenLuftTemperatur === "string") {
      aussenLuftTemperaturNumber = parseFloat(aussenLuftTemperatur);
    } else {
      aussenLuftTemperaturNumber = aussenLuftTemperatur;
    }
    //-----------------------------------------------------------------------------------------------------------------
    let mindestBemessungsTemperaturFaktor =
      (mindestOberflaechenTemperaturNumber - aussenLuftTemperaturNumber) / (innenLuftTemperaturNumber - aussenLuftTemperaturNumber)
    console.log("mindestBemessungsTemperaturFaktor vor Runden: ", mindestBemessungsTemperaturFaktor);
    mindestBemessungsTemperaturFaktor = Math.round(mindestBemessungsTemperaturFaktor * 1000) / 1000; // 3 Nachkommastellen???
    console.log("mindestBemessungsTemperaturFaktor nach Runden: ", mindestBemessungsTemperaturFaktor);
    return mindestBemessungsTemperaturFaktor;
  },
};
