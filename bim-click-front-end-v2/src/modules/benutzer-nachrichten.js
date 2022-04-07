// Node Module benutzer-nachrichten.js
// Enum-Definitionen für Benutzernachrichten - werden für Banner Messages im Footer verwendet
// Verwendung in konsumierenden Komponenten mit:
// import BenutzerNachrichten from "./benutzer-nachrichten.js";

// ACHTUNG: Dabei NICHT require verwenden, sont undefined Fehler beim Zugriff:
// Also NICHT: const BenutzerNachrichten = require("./benutzer-nachrichten.js");

// HINWEIS: Zugriff auf bestimmte Benutzernachrichten z.B. mit:
// BenutzerNachrichten.DEFAULT_BENUTZERNACHRICHT,
// Also NICHT: this.BenutzerNachrichten.DEFAULT_BENUTZERNACHRICHT,

// HINWEIS: NEUE Benutzernachrichten wie folgt hinzufügen:
// 1) Einen Eintrag hier hinzufügen für die neue Benutzernachricht it Enum-Deklaration (dabei ALL_CAPS_SNAKE_CASE verwenden!)
//    und String-Wert für die Anzeige der Nachricht.
// 2) Aufnahme in GlobalStore.js Mutator-Methode showBenutzerNachricht, dort in das switch-Statement mit aufnehmen,
//    die genaue Stelle ist abhängig davon, ob es eine Information, Fehlermeldung, Erfolgsmeldung oder Warnung ist
//----------------------------------------------------------------------------------------------------------------
// makeEnum Helper Funktion, siehe https://stackoverflow.com/questions/44447847/enums-in-javascript-with-es6:
function makeEnum(arr) {
  let obj = {};
  for (let val of arr) {
    obj[val] = Symbol(val);
  }
  return Object.freeze(obj);
}
// Zusammen mit: const BenutzerNachrichtenTypen = this.makeEnum (["DEFAULT_BENUTZERNACHRICHT", ..., BAUEIGENSCHAFT_NEUANLAGE_FEHLER"]);
// Führte ohne die Array-Klammern beim Aufruf zu Fehlermeldung Cannot read property makeEnum of undefined!!!
// ACHTUNG: Bei Verwendung von Symbol in der makeEnum-Funktion sind wohl keine Collisions bei gleichen String-Werten möglich, aber dafür werden
// die Werte nicht als lesbare/anzeigbare Strings gespeichert, sondern müssen erst rückkonvertiert werden von Symbol in passende Strings, wie
// man bei Tests für Umstellung BaumKnotenTypen auf Symbol sieht.
// Daher sind auch die enums für VerzweigungsTypen, BaumKnotenTypen, Baustoffe bisher ohne Symbol implementiert!!!
// Siehe https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/
// Es kamen ursprünglich auch ohne makeEnum Fehler "Cannot assign to read only property 'exports' of....""
// Letztere gelöst durch Umstellung des Export Statements unten

//----------------------------------------------------------------------------------------------------------------
// Erzeuge Enums für BenutzerNachrichten  mit obiger elper Funktion - vorläufig nicht verwendet. ACHTUNG: Array-Klammern notwendig!
/*
const BenutzerNachrichten = makeEnum([
  "DEFAULT_BENUTZERNACHRICHT",
  "BAUSTOFF_AENDERUNG_ERFOLG",
  "BAUSTOFF_NEUANLAGE_ERFOLG",
  "BAUSTOFF_AENDERUNG_FEHLER",
  "BAUSTOFF_NEUANLAGE_FEHLER",
  "BAUEIGENSCHAFT_AENDERUNG_ERFOLG",
  "BAUEIGENSCHAFT_NEUANLAGE_ERFOLG",
  "BAUEIGENSCHAFT_AENDERUNG_FEHLER",
  "BAUEIGENSCHAFT_NEUANLAGE_FEHLER"
]);
*/

// Variante ohne makeEnum und Symbol:
const BenutzerNachrichten = Object.freeze({
  DEFAULT_BENUTZERNACHRICHT: "Default-Benutzernachricht",
  DEFAULT_ERFOLGSNACHRICHT: "Die Aktion wurde erfolgreich durchgeführt",
  DEFAULT_FEHLERNACHRICHT:
    "Die Aktion konnte nicht erfolgreich durchgeführt werden",
  BITTE_ANMELDEN: "Bitte im hellgrünen Dropdown-Menü links oder rechts oben anmelden",
  DATEI_NICHT_OEFFENBAR: "Die Datei konnte nicht geöffnet werden",
  FUNKTION_NICHT_VERFUEGBAR: "Diese Funktion ist aktuell nicht verfügbar",
  AUTHORISIERUNG_REGISTRIERUNG_ERFOLG:
    "Das Benutzerkonto wurde erfolgreich registriert",
  AUTHORISIERUNG_VERIFIKATION_ERFOLG:
    "Das Benutzerkonto wurde erfolgreich verifiziert",
  AUTHORISIERUNG_REGISTRIERUNG_FEHLER:
    "Das Benutzerkonto konnte nicht registriert werden",
  AUTHORISIERUNG_REGISTRIERUNG_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits ein Benutzerkonto mit derselben E-Mail-Adresse als Benutzerkennung wie die angegebene E-Mail-Adresse",
  AUTHORISIERUNG_VERIFIKATION_FEHLER:
    "Das Benutzerkonto konnte nicht verifiziert werden",
  AUTHORISIERUNG_ANMELDUNG_ERFOLG: "Sie wurden erfolgreich angemeldet",
  AUTHORISIERUNG_ANMELDUNG_FEHLER: "Sie konnten nicht angemeldet werden",
  AUTHORISIERUNG_ABMELDUNG_ERFOLG: "Sie wurden erfolgreich abgemeldet",
  AUTHORISIERUNG_ABMELDUNG_ERFOLG_NACH_ABLAUF: "Sie wurden aus Sicherheitsgründen abgemeldet. Bitte melden Sie sich im hellgrünen Dropdown-Menü links oder rechts oben neu an.", // NEU
  AUTHORISIERUNG_ABMELDUNG_FEHLER: "Sie konnten nicht abgemeldet werden",
  AUTHORISIERUNG_BERECHTIGUNG_FEHLER:
    "Sie verfügen nicht über die notwendige Berechtigung für diese Funktion",
  AUTHORISIERUNG_KENNWORT_AENDERUNG_ERFOLG:
    "Das Kennwort wurde erfolgreich geändert",
  AUTHORISIERUNG_KENNWORT_AENDERUNG_FEHLER:
    "Das Kennwort konnte nicht geändert werden",
  AUTHORISIERUNG_KENNWORT_AENDERUNG_INKORREKT:
    "Das Kennwort konnte nicht geändert werden - bitte überprüfen Sie das bisherige Kennwort",
  AUTHORISIERUNG_KENNWORT_RESET_ERFOLG:
    "Das neue Kennwort wurde erfolgreich gespeichert",
  AUTHORISIERUNG_KENNWORT_RESET_FEHLER:
    "Das neue Kennwort konnte nicht gespeichert werden - bitte überprüfen Sie die E-Mail-Adresse für die Benutzerkennung. Falls Sie die Vergabe eines neuen Kennworts nicht innerhalb von 24 Stunden durchführen konnten, müssen Sie diese nochmals veranlassen.",
  AUTHORISIERUNG_KENNWORT_RESET_ANFORDERUNG_ERFOLG:
    "Die Neuvergabe des Kennworts wurde erfolgreich veranlasst - bitte überprüfen Sie Ihren Posteingang auf eine E-Mail mit weiteren Anweisungen",
  AUTHORISIERUNG_KENNWORT_RESET_ANFORDERUNG_FEHLER:
    "Die Neuvergabe des Kennworts konnte nicht erfolgreich veranlasst werden - bitte überprüfen Sie die E-Mail-Adresse für die Benutzerkennung",
  BENUTZER_NEUANLAGE_ERFOLG: "Das Benutzerkonto wurde erfolgreich registriert",
  BENUTZER_NEUANLAGE_FEHLER:
    "Das Benutzerkonto konnte nicht registriert werden",
  BENUTZER_NEUANLAGE_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits ein Benutzerkonto mit derselben E-Mail-Adresse als Benutzerkennung wie die angegebene E-Mail-Adresse",
  BENUTZER_AENDERUNG_ERFOLG: "Das Benutzerkonto wurde erfolgreich aktualisiert",
  BENUTZER_AENDERUNG_FEHLER:
    "Das Benutzerkonto konnte nicht aktualisiert werden",
  BENUTZER_LESEN_FEHLER: "Die Benutzerkonten konnten nicht gelesen werden",
  BAUSTOFF_LESEN_FEHLER: "Der ausgewählte Baustoff konnte nicht gelesen werden",
  BAUSTOFF_AENDERUNG_ERFOLG:
    "Der geänderte Baustoff wurde erfolgreich gespeichert",
  BAUSTOFF_NEUANLAGE_ERFOLG:
    "Der neu angelegte Baustoff wurde erfolgreich gespeichert",
  BAUSTOFF_AENDERUNG_FEHLER:
    "Der geänderte Baustoff konnte nicht gespeichert werden",
  BAUSTOFF_BESCHREIBUNG_AENDERUNG_ERFOLG:
    "Die geänderte Beschreibung des Baustoffs wurde erfolgreich gespeichert",
  BAUSTOFF_BESCHREIBUNG_AENDERUNG_FEHLER:
    "Die geänderte Beschreibung des Baustoffs konnte nicht gespeichert werden",
  BAUSTOFF_BEZEICHNUNG_AENDERUNG_ERFOLG:
    "Die geänderte Bezeichnung des Baustoffs wurde erfolgreich gespeichert",
  BAUSTOFF_BEZEICHNUNG_AENDERUNG_FEHLER:
    "Die geänderte Bezeichnung des Baustoffs konnte nicht gespeichert werden",
  BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_ERFOLG:
    "Die Baueigenschaften am Baustoff wurden erfolgreich exportiert. Zum Datei-Download die zugehörige Schaltfläche 'Baueigenschaften herunterladen' drücken.",
  BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_FEHLER:
    "Die Baueigenschaften am Baustoff konnten nicht exportiert werden",
  BAUSTOFF_BEZEICHNUNG_AENDERUNG_FEHLER_EXISTIERT_BEREITS:
    "Es existiert bereits ein Geschwisterbaustoff unter dem ausgewählten Elternbaustoff im Baustoffbaum, welcher dieselbe Bezeichnung hat - bitte eine andere Bezeichnung für den neuen Baustoff wählen, oder den Geschwisterbaustoff zuerst umbenennen oder löschen",
  BAUSTOFF_BAUINFORMATIONEN_AENDERUNG_ERFOLG:
    "Die geänderten zugeordneten Bauinformationen des Baustoffs wurden erfolgreich gespeichert",
  BAUSTOFF_BAUINFORMATIONEN_AENDERUNG_FEHLER:
    "Die geänderten zugeordneten Bauinformationen des Baustoffs konnten nicht gespeichert werden",
  BAUSTOFF_ROHSTOFFE_AENDERUNG_ERFOLG:
    "Die geänderten zugeordneten Rohstoffe des Baustoffs wurden erfolgreich gespeichert",
  BAUSTOFF_ROHSTOFFE_AENDERUNG_FEHLER:
    "Die geänderten zugeordneten Rohstoffe des Baustoffs konnten nicht gespeichert werden",
  BAUSTOFF_NEUANLAGE_FEHLER:
    "Der neu angelegte Baustoff konnte nicht gespeichert werden",
  BAUSTOFF_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits ein Geschwisterbaustoff unter dem ausgewählten Elternbaustoff im Baustoffbaum, welcher dieselbe Bezeichnung hat - bitte eine andere Bezeichnung für den neuen Baustoff wählen, oder den Geschwisterbaustoff zuerst umbenennen oder löschen",
  BAUSTOFF_NEUANLAGE_WARNUNG_BEZEICHNUNG_EINGEBEN:
    "Bitte eine Bezeichnung für den neu anzulegenden Baustoff eingeben",
  BAUSTOFF_LOESCHEN_ERFOLG:
    "Der ausgewählte Baustoff wurde erfolgreich gelöscht",
  BAUSTOFF_LOESCHEN_FEHLER:
    "Der ausgewählte Baustoff konnte nicht gelöscht werden",
  BAUSTOFF_LOESCHEN_FEHLER_WURZELKNOTEN_NICHT_GEFUNDEN:
    "Der Wurzelknoten des Baustoffbaums konnte nach dem Löschen des ausgewählten Baustoffs nicht gefunden werden",
  BAUSTOFF_LOESCHEN_WARNUNG_KEIN_BAUSTOFF_AUSGEWAEHLT:
    "Löschen nicht möglich - bitte zuerst einen Baustoff auswählen",
  BAUSTOFF_ZWEIG_ZUM_BEWEGEN_MARKIERT:
    "Der Zweig des Baustoffbaums wurde zum Verschieben bzw. Kopieren unter einen anderen Baustoff markiert. Dazu in dessen Kontextmenü 'Markierten Zweig hierher verschieben' bzw. 'Markierten Zweig hierher kopieren' auswählen.",
  BAUSTOFF_ZWEIG_KOPIEREN_ERFOLG:
    "Der markierte Zweig des Baustoffbaums wurde erfolgreich unter den per Kontextmenü bestimmten Baustoff kopiert",
  BAUSTOFF_ZWEIG_KOPIEREN_FEHLER:
    "Der markierte Zweig des Baustoffbaums konnte nicht unter den per Kontextmenü bestimmten Baustoff kopiert werden",
  BAUSTOFF_ZWEIG_VERSCHIEBEN_ERFOLG:
    "Der markierte Zweig des Baustoffbaums wurde erfolgreich unter die per Kontextmenü bestimmten Baustoff verschoben",
  BAUSTOFF_ZWEIG_VERSCHIEBEN_FEHLER:
    "Der markierte Zweig des Baustoffbaums konnte nicht unter den per Kontextmenü bestimmten Baustoff verschoben werden",
  BAUSTOFF_ODER_BAUEINHEIT_ZWEIG_BEWEGEN_ZEITUEBERSCHREITUNG_AKTION:
    "Beim Verschieben oder Kopieren des markierten Zweigs ist eine Zeitüberschreitung aufgetreten. Bitte drücken Sie unten die Schaltfläche 'Neu laden' und überprüfen Sie die aktuell von Ihnen bearbeiteten Daten im Bauvorhaben- bzw. Baustoffbaum",
  BAUSTOFF_ZWEIG_KOPIEREN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Der markierte Zweig des Baustoffbaums konnte nicht unter den per Kontextmenü bestimmten Baustoff kopiert werden, da unter dem neuen Elternbaustoff bereits ein Kindbaustoff mit derselben Bezeichnung existiert wie die der Wurzelbaustoffs des markierten Zweigs",
  BAUSTOFF_ZWEIG_VERSCHIEBEN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Der markierte Zweig des Baustoffbaums konnte nicht unter den per Kontextmenü bestimmten Baustoff verschoben werden, da unter dem neuen Elternbaustoff bereits ein Kindbaustoff mit derselben Bezeichnung existiert wie die des Wurzelbaustoffs des markierten Zweigs",
  BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG:
    "Die Werte der Baueigenschaften im Baueigenschaftsprofil wurden erfolgreich am Baustoff gespeichert",
  BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER:
    "Die Werte der Baueigenschaften im Baueigenschaftsprofil konnten nicht am Baustoff gespeichert werden",
  BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_WARNUNG:
    "Achtung: Es sind Kindbaustoffe unter dem ausgewählten Baustoff im Baustoffbaum vorhanden, an denen am ausgewählten Baustoff bisher undefinierte Felder bereits definierte Werte haben. Die Eingabefelder für diese Baueigenschaften wurden im Profilformular orangefarbig gekennzeichnet. Bei Eingabe und Speicherung von Werten in diese orangefarbigen Felder werden bereits vorhandene Werte an Kindbaustoffen automatisch per Wertevererbung mit eingegebenen Werten überschrieben. In solche Felder sollten nur dann Werte eingegeben werden, falls diese die vorhandenen Werte an den Kindbaustoffen beim Speichern automatisch per Wertevererbung überschreiben sollen. Beim Speichern muss deshalb eine Bestätigung erfolgen, dass das Überschreiben beabsichtigt ist. An Verzweigungsknoten im Baustoffbaum muss zur Eingabe von Werten in das Profilformular generell zuerst die Schaltfläche 'Werteeingabe am Verzweigungsknoten temporär freischalten' gedrückt werden.",
  BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_FEHLER:
    "Die Definiertheit der Baueigenschaften im Baueigenschaftsprofil an Kindbaustoffen im Baustoffbaum konnte nicht ermittelt werden",
  BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_KEINE_VORHANDEN:
    "Es sind keine Kindbaustoffe unter dem ausgewählten Baustoff im Baustoffbaum vorhanden, an denen am ausgewählten Baustoff bisher undefinierte Felder bereits definierte Werte haben. Bei Eingabe und Speicherung von Werten im Profilformular werden daher auch keine bereits vorhandenen Werte an Kindbaustoffen automatisch per Wertevererbung mit eingegebenen Werten überschrieben.",
  BAUSTOFF_BAUEIGENSCHAFTSPROFILFORMULAR_VERZWEIGUNGSKNOTEN_WERTEEINGABE_WARNUNG:
    "Achtung: Die Werteeingabe am ausgewählten Verzweigungsknoten im Baustoffbaum wurde temporär freigeschaltet. Hier im Profilformular eingegebene Werte werden beim Speichern automatisch per Werteverebung an alle Kindknoten im Baustoffbaum weitervererbt. Drücken Sie die Schaltfläche rechts, um die Felder orangefarbig zu kennzeichnen, welche bereits definierte Werte an Kindknoten aufweisen. Diese würden beim Speichern des Profilformulars automatisch per Wertevererbung mit eingegebenen Werten überschrieben. Unterlassen Sie Eingaben in solche orangefarbigen Felder, falls Sie deren vorhandene Werte an Kindbaustoffen beim Speichern nicht automatisch per Wertevererbung überschreiben möchten. Beim Speichern muss deshalb eine Bestätigung erfolgen, dass das Überschreiben beabsichtigt ist.",
  BAUSTOFFE_IMPORT_ERFOLG:
    "Die Baustoffe wurden erfolgreich importiert",
  BAUSTOFFE_IMPORT_IM_GANG:
    "Die Baustoffe werden importiert - dies kann etwas dauern",
  BAUSTOFFE_IMPORT_FEHLER:
    "Beim Import der Baustoffe ist ein Fehler aufgetreten - überprüfen Sie das Ergebnis im Tab 'Baustoffe'",
  BAUSTOFFE_FILTERUNG_ERFOLG:
    "Die Filterung war erfolgreich. Links im Baustoffbaum werden nun diejenigen Zweige angezeigt, die Baustoffe enthalten, welche die Filterbedingungen erfüllen.",
  BAUSTOFFE_FILTERUNG_KEINE_GEFUNDEN:
    "Es wurden keine die Filterbedingungen erfüllenden Baustoffe gefunden. Bitte überprüfen Sie Ihre Eingaben in den Feldern für die Filterbedingungen und den Startknoten für die Filterung im Baustoffbaum.",
  BAUSTOFFE_FILTERUNG_FEHLER:
    "Beim Filtern der Baustoffe ist ein Fehler aufgetreten",
  //------------------------------------------------------------------------------------------------------------------------
  BAUEINHEIT_LESEN_FEHLER:
    "Der ausgewählte Baueinheit konnte nicht gelesen werden",
  BAUEINHEIT_AENDERUNG_ERFOLG:
    "Der geänderte Baueinheit wurde erfolgreich gespeichert",
  BAUEINHEIT_NEUANLAGE_ERFOLG:
    "Der neu angelegte Baueinheit wurde erfolgreich gespeichert",
  BAUEINHEIT_AENDERUNG_FEHLER:
    "Die geänderte Baueinheit konnte nicht gespeichert werden",
  BAUEINHEIT_BESCHREIBUNG_AENDERUNG_ERFOLG:
    "Die geänderte Beschreibung der Baueinheit wurde erfolgreich gespeichert",
  BAUEINHEIT_BESCHREIBUNG_AENDERUNG_FEHLER:
    "Die geänderte Beschreibung der Baueinheit konnte nicht gespeichert werden",
  BAUEINHEIT_BEZEICHNUNG_AENDERUNG_ERFOLG:
    "Die geänderte Bezeichnung der Baueinheit wurde erfolgreich gespeichert",
  BAUEINHEIT_BEZEICHNUNG_AENDERUNG_FEHLER:
    "Die geänderte Bezeichnung der Baueinheit konnte nicht gespeichert werden",
  BAUEINHEIT_BEZEICHNUNG_AENDERUNG_FEHLER_EXISTIERT_BEREITS:
    "Es existiert bereits eine Geschwisterbaueinheit unter der ausgewählten Elternbaueinheit im Bauvorhabenbaum, welche dieselbe Bezeichnung hat - bitte eine andere Bezeichnung für die neue Baueinheit wählen, oder die Geschwisterbaueinheit zuerst umbenennen oder löschen",
  BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_ERFOLG:
    "Die Baueigenschaften an der Baueinheit wurden erfolgreich exportiert. Zum Datei-Download die zugehörige Schaltfläche 'Baueigenschaften herunterladen' drücken.",
  BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_FEHLER:
    "Die Baueigenschaften an der Baueinheit konnten nicht exportiert werden",
  BAUEINHEIT_BAUINFORMATIONEN_AENDERUNG_ERFOLG:
    "Die geänderten zugeordneten Bauinformationen der Baueinheit wurden erfolgreich gespeichert",
  BAUEINHEIT_BAUINFORMATIONEN_AENDERUNG_FEHLER:
    "Die geänderten zugeordneten Bauinformationen der Baueinheit konnten nicht gespeichert werden",
  BAUEINHEIT_BAUSTOFFE_AENDERUNG_ERFOLG:
    "Die geänderten zugeordneten Baustoffe der Baueinheit wurden erfolgreich gespeichert",
  BAUEINHEIT_BAUSTOFFE_AENDERUNG_FEHLER:
    "Die geänderten zugeordneten Baustoffe der Baueinheit konnten nicht gespeichert werden",
  BAUEINHEIT_NEUANLAGE_FEHLER:
    "Die neu angelegte Baueinheit konnte nicht gespeichert werden",
  BAUEINHEIT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits eine Geschwisterbaueinheit unter der ausgewählten Elternbaueinheit im Bauvorhabenbaum, welche dieselbe Bezeichnung hat - bitte eine andere Bezeichnung für die neue Baueinheit wählen, oder die Geschwisterbaueinheit zuerst umbenennen oder löschen",
  BAUEINHEIT_NEUANLAGE_WARNUNG_BEZEICHNUNG_EINGEBEN:
    "Bitte eine Bezeichnung für die neu anzulegende Baueinheit eingeben",
  BAUEINHEIT_LOESCHEN_ERFOLG:
    "Die ausgewählte Baueinheit wurde erfolgreich gelöscht",
  BAUEINHEIT_LOESCHEN_FEHLER:
    "Die ausgewählte Baueinheit konnte nicht gelöscht werden",
  BAUEINHEIT_LOESCHEN_FEHLER_WURZELKNOTEN_NICHT_GEFUNDEN:
    "Der Wurzelknoten des Bauevorhabenbaums konnte nach dem Löschen der ausgewählten Baueinheit nicht gefunden werden",
  BAUEINHEIT_LOESCHEN_WARNUNG_KEINE_BAUEINHEIT_AUSGEWAEHLT:
    "Löschen nicht möglich - bitte zuerst eine Baueinheit auswählen",
  BAUEINHEIT_BAUVORHABEN_AENDERUNG_ERFOLG:
    "Die Angaben zum Bauvorhaben an der ausgewählten Baueinheit wurden erfolgreich gespeichert",
  BAUEINHEIT_ZWEIG_ZUM_BEWEGEN_MARKIERT:
    "Der Zweig des Bauvorhabenbaums wurde zum Verschieben bzw. Kopieren unter eine andere Baueinheit markiert. Dafür in deren Kontextmenü 'Markierten Zweig hierher verschieben' bzw. 'hierher kopieren' auswählen.",
  BAUEINHEIT_ZWEIG_KOPIEREN_ERFOLG:
    "Der markierte Zweig des Bauvorhabenbaums wurde erfolgreich unter die per Kontextmenü bestimmte Baueinheit kopiert",
  BAUEINHEIT_ZWEIG_KOPIEREN_IM_GANG:
    "Der markierte Zweig des Bauvorhabenbaums wird unter die per Kontextmenü bestimmte Baueinheit kopiert - dies kann etwas dauern",
  BAUEINHEIT_ZWEIG_KOPIEREN_FEHLER:
    "Der markierte Zweig des Bauvorhabenbaums konnte nicht unter die per Kontextmenü bestimmte Baueinheit kopiert werden",
  BAUEINHEIT_ZWEIG_KOPIEREN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Der markierte Zweig des Bauvorhabenbaums konnte nicht unter die per Kontextmenü bestimmte Baueinheit kopiert werden, da unter der neuen Elternbaueinheit bereits eine Kindbaueinheit mit derselben Bezeichnung existiert wie die der Wurzelbaueinheit des markierten Zweigs",
  BAUEINHEIT_ZWEIG_VERSCHIEBEN_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Der markierte Zweig des Bauvorhabenbaums konnte nicht unter die per Kontextmenü bestimmte Baueinheit verschoben werden, da unter der neuen Elternbaueinheit bereits eine Kindbaueinheit mit derselben Bezeichnung existiert wie die der Wurzelbaueinheit des markierten Zweigs",
  BAUEINHEIT_ZWEIG_VERSCHIEBEN_ERFOLG:
    "Der markierte Zweig des Bausvorhabenbaums wurde erfolgreich unter die per Kontextmenü bestimmte Baueinheit verschoben",
  BAUEINHEIT_ZWEIG_VERSCHIEBEN_IM_GANG:
    "Der markierte Zweig des Bauvorhabenbaums wird unter die per Kontextmenü bestimmte Baueinheit verschoben - dies kann etwas dauern",
  BAUEINHEIT_ZWEIG_VERSCHIEBEN_FEHLER:
    "Der markierte Zweig des Bauvorhabenbaums konnte nicht unter die per Kontextmenü bestimmte Baueinheit verschoben werden",
  BAUEINHEIT_ZWEIG_BEWEGEN_TIMEOUT:
    `Die Ausführung Ihrer Aktion durch den BIM.click-Server kann längere Zeit in Anspruch nehmen. Bitte haben Sie etwas Geduld und
    aktualisieren Sie nach ca. 30 bis 60 Sekunden den Browser bzw. die App mittels der Schaltfläche 'Seite aktualisieren' oder der Tastenkombination Strg und F5 bzw. durch eine Wischgeste von oben nach unten in der App .`,
  BAUEINHEIT_BAUVORHABEN_AENDERUNG_FEHLER:
    "Die Angaben zum Bauvorhaben an der ausgewählten Baueinheit konnten nicht gespeichert werden",
  BAUEINHEIT_ZUGEORDNETE_BAUSTOFFE_LADEN_WARNUNG:
    "Es kann etwas dauern bis alle Baustoffe aus der Datenbank geladen sind",
  BAUEINHEIT_ANGEMELDETER_BENUTZER_ALS_AUTOR_ABGEWAEHLT_WARNUNG:
    "Da Sie Ihre eigene Benutzerkennung aus den zugeordneten Autoren abgewählt haben, dürfen Sie, falls Sie 'Angaben speichern' drücken, den ausgewählten Zweig im Bauvorhabenbaum künftig nicht mehr bearbeiten. Danach können nur noch andere zugeordnete Autoren oder Administratoren und Redakteure Sie diesem Zweig erneut als Autor zuordnen. Wenn Sie weiterhin Autor bleiben möchten, drücken Sie 'Eingaben auf Originalwerte zurücksetzen'.",
  BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG:
    "Die Werte der Baueigenschaften im Baueigenschaftsprofil wurden erfolgreich an der Baueinheit gespeichert",
  BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER:
    "Die Werte der Baueigenschaften im Baueigenschaftsprofil konnten nicht an der Baueinheit gespeichert werden",
  BAUEINHEIT_BAUEIGENSCHAFTSPROFILFORMULARE_EXPORT_ERFOLG:
    "Die Excel-Arbeitsmappe mit der fachlichen Planung für die an der Baueinheit aktivierten Baueigenschaftsprofile wurde erfolgreich erzeugt. Zum Herunterladen der Arbeitsmappe drücken Sie die Schaltfläche 'Exel-Arbeitsmappe mit fachlicher Planung herunterladen'.",
  BAUEINHEIT_BAUEIGENSCHAFTSPROFILFORMULARE_EXPORT_FEHLER:
    "Die Excel-Arbeitsmappe mit der fachlichen Planung für die an der Baueinheit aktivierten Baueigenschaftsprofile konnte nicht erzeugt werden",
  BAUEINHEIT_BAUTEILKATALOG_EXPORT_ERFOLG:
    "Die Excel-Arbeitsmappe mit dem Bauteilkatalog für die Baueinheit wurde erfolgreich erzeugt. Zum Herunterladen der Arbeitsmappe drücken Sie die Schaltfläche 'Exel-Arbeitsmappe mit Bauteilkatalog herunterladen'.",
  BAUEINHEIT_BAUTEILKATALOG_EXPORT_FEHLER:
    "Die Excel-Arbeitsmappe mit dem Bauteilkatalog für die Baueinheit konnte nicht erzeugt werden",
  BAUEINHEIT_WERTE_AUS_BAUSTOFF_UEBERTRAGEN_FEHLER:
    "Die Werte aus dem Baustoff konnten nicht in die ausgewählte Baueinheit übertragen werden",
  BAUEINHEITEN_IMPORT_ERFOLG:
    "Die Baueinheiten wurden erfolgreich importiert",
  BAUEINHEITEN_IMPORT_FEHLER:
    "Beim Import der Baueinheiten ist ein Fehler aufgetreten - überprüfen Sie das Ergebnis im Tab 'Bauvorhaben'",
  BAUEIGENSCHAFT_LESEN_FEHLER:
    "Die ausgewählte Baueigenschaft konnte nicht gelesen werden",
  BAUEIGENSCHAFT_AENDERUNG_ERFOLG:
    "Die geänderte Baueigenschaft wurde erfolgreich gespeichert",
  BAUEIGENSCHAFT_NEUANLAGE_ERFOLG:
    "Die neu angelegte Baueigenschaft wurde erfolgreich gespeichert",
  BAUEIGENSCHAFT_NEUANLAGE_FEHLER:
    "Die neu angelegte Baueigenschaft konnte nicht gespeichert werden",
  BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits eine Baueigenschaft mit derselben Bezeichnung - bitte diese zuerst umbenennen, oder diese löschen, oder eine andere Bezeichnung für die neue Baueigenschaft wählen",
  BAUEIGENSCHAFT_AENDERUNG_FEHLER:
    "Die geänderte Baueigenschaft konnte nicht gespeichert werden",
  BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_ERFOLG:
    "Die geänderte Beschreibung der Baueigenschaft wurde erfolgreich gespeichert",
  BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_FEHLER:
    "Die geänderte Beschreibung der Baueigenschaft konnte nicht gespeichert werden",
  BAUEIGENSCHAFT_AENDERUNG_ABLEHNUNG:
    "Die geänderte Baueigenschaft wurde abgelehnt",
  BAUEIGENSCHAFT_LOESCHEN_ERFOLG:
    "Die Baueigenschaft wurde erfolgreich gelöscht",
  BAUEIGENSCHAFT_LOESCHEN_FEHLER:
    "Die ausgewählte Baueigenschaft konnte nicht gelöscht werden",
  BAUEIGENSCHAFTEN_LESEN_FEHLER:
    "Die Baueigenschaften konnte nicht gelesen werden",
  BAUEIGENSCHAFTEN_IMPORT_ERFOLG:
    "Die Baueigenschaften wurden erfolgreich importiert. Wenn Sie die aktuellsten Baueigenschaften verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  BAUEIGENSCHAFTEN_IMPORT_IM_GANG:
    "Die Baueigenschaften werden importiert - dies kann etwas dauern.",
  BAUEIGENSCHAFTEN_IMPORT_FEHLER:
    "Beim Import der Baueigenschaften ist ein Fehler aufgetreten - überprüfen Sie das Ergebnis im Tab 'Baueigenschaften'",
  WERTEEINGABE_MOEGLICH:
    "Werteeingabe möglich, da die Werte der Baueigenschaft am Elternknoten im Baum undefiniert sind",
  WERTEEINGABE_NICHT_MOEGLICH:
    "Keine Werteeingabe möglich, da die Werte der Baueigenschaft vom Elternknoten im Baum ererbt werden",
  AKTIVIERUNG_AUSGELOEST_WERTEEINGABE_NICHT_MOEGLICH:
    "Aktivierung der Baueigenschaft ausgelöst - keine Werteeingabe möglich, da die Werte der Baueigenschaft vom Elternknoten im Baum ererbt werden",
  PFADAKTIVIERUNG_AUSGELOEST_WERTEEINGABE_NICHT_MOEGLICH:
    "Aktivierung der Baueigenschaft ausgelöst - keine Werteeingabe möglich, da die Werte der Baueigenschaft von einem auf dem Pfad im Baum liegenden Elternknoten ererbt werden",
  AKTIVIERUNG_AUSGELOEST_WERTEEINGABE_MOEGLICH:
    "Aktivierung der Baueigenschaft ausgelöst - Werteeingabe möglich, da die Werte der Baueigenschaft am Elternknoten im Baum undefiniert sind",
  PFADAKTIVIERUNG_AUSGELOEST_WERTEEINGABE_MOEGLICH:
    "Aktivierung der Baueigenschaft ausgelöst - Werteeingabe möglich, da die Werte der Baueigenschaft in allen auf dem Pfad im Baum liegenden Elternknoten undefiniert sind",
  AKTIVIERUNG_AUSGELOEST_WURZELKNOTEN:
    "Aktivierung der Baueigenschaft ausgelöst - Werteeingabe möglich, da es sich um eine Baueigenschaft am Wurzelknoten im Baum handelt",
  AKTIVIERUNG_NICHT_MOEGLICH:
    "Keine Aktivierung der Baueigenschaft möglich, da die Baueigenschaft am Elternknoten im Baum deaktiviert ist - bitte zunächst weiter oben im Baum aktivieren",
  DEAKTIVIERUNG_AUSGELOEST:
    "Deaktivierung der Baueigenschaft ausgelöst - die Werte der Baueigenschaft werden auf undefiniert gesetzt",
  DEAKTIVIERUNG_NICHT_MOEGLICH:
    "Keine Deaktivierung der Baueigenschaft möglich, da die Baueigenschaft obligatorisch ist",
  OBLIGATORISCH_AUSGELOEST:
    "Obligatorisch-Machen der Baueigenschaft ausgelöst - diese wird stets aktiviert",
  OBLIGATORISCH_NICHT_MOEGLICH:
    "Die Baueigenschaft kann nicht obligatorisch gemacht werden, da sie am Elternknoten im Baum nicht aktiviert und damit nicht aktivierbar ist",
  OPTIONAL_AUSGELOEST:
    "Optional-Machen der Baueigenschaft ausgelöst - diese kann bei Bedarf deaktiviert werden",
  OPTIONAL_NICHT_MOEGLICH:
    "Die Baueigenschaft kann nicht optional gemacht werden, da sie am Elternknoten im Baum obligatorisch ist",
  //----------------------------------------------------------------------------------------------
  BAUINFORMATIONEN_LESEN_FEHLER:
    "Die Bauinformationen konnten nicht gelesen werden",
  BAUINFORMATIONEN_LESEN_KEINE_VORHANDEN:
    "Es sind keine Bauinformationen vorhanden",
  BAUINFORMATION_NEUANLAGE_ERFOLG:
    "Die neu angelegte Bauinformation wurde erfolgreich gespeichert",
  BAUINFORMATION_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS:
    "Es existiert bereits eine Bauinformation mit derselben Bezeichnung - bitte diese zuerst umbenennen, oder diese löschen, oder eine andere Bezeichnung für die neue Bauinformation wählen",
  BAUINFORMATION_AENDERUNG_ERFOLG:
    "Die geänderte Bauinformation wurde erfolgreich gespeichert",
  BAUINFORMATION_AENDERUNG_FEHLER:
    "Die geänderte Bauinformation konnte nicht gespeichert werden",
  BAUINFORMATION_AENDERUNG_KEINE_BERECHTIGUNG:
    "Da Sie der ausgewählten Bauinformation nicht als Autor zugeordnet sind, können Sie diese momentan nur anzeigen. Falls Sie Änderungen daran vornehmen möchten, bitten Sie deren Autor, Sie dieser Bauinformation als weiteren Autor zuzuordnen.",
  BAUINFORMATION_LOESCHEN_ERFOLG:
    "Die Bauinformation wurde erfolgreich gelöscht",
  BAUINFORMATION_LOESCHEN_KEINE_BAUINFORMATIONEN_VORHANDEN:
    "Die Bauinformation wurde erfolgreich gelöscht - keine weiteren Bauinformationen vorhanden",
  BAUINFORMATION_LOESCHEN_FEHLER:
    "Die Bauinformation konnte nicht gelöscht werden",
  BAUINFORMATION_AENDERUNG_BEZEICHNUNG_ERFORDERLICH:
    "Für die Bauinformation ist eine Bezeichnung erforderlich",
  BAUINFORMATION_AENDERUNG_BAUINFORMATION_GELOESCHT:
    "Die geänderte Bauinformation konnte nicht gespeichert werden, da sie mittlerweile gelöscht wurde",
  BAUINFORMATION_ZURUECKSETZEN_BAUINFORMATION_GELOESCHT:
    "Die Bauinformation konnte nicht zurückgesetzt werden, da sie mittlerweile gelöscht wurde",
  BAUINFORMATION_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
    "Die für die Bauinformation gewählte Bezeichnung ist bereits vergeben - bitte eine andere eindeutige Bezeichnung eingeben",
  BAUINFORMATION_ALLE_AUTOREN_ABGEWAEHLT_WARNUNG:
    "Da alle der ausgewählten Bauinformation zugeordneten Autoren abgewählt wurden, kann diese, falls Sie 'Ausgewählte Bauinformation speichern' drücken, künftig nur noch von Administratoren und Redakteuren bearbeitet werden. Drücken Sie die Schaltfläche 'Eingaben auf Originalwerte zurücksetzen', wenn Sie dies nicht wünschen.",
  BAUINFORMATION_ANGEMELDETER_BENUTZER_ALS_AUTOR_ABGEWAEHLT_WARNUNG:
    "Da Sie Ihre eigene Benutzerkennung aus den zugeordneten Autoren der ausgewählten Bauinformation abgewählt haben, dürfen Sie, falls Sie die Schaltfläche 'Ausgewählte Bauinformation speichern' drücken, diese künftig nicht mehr bearbeiten. Danach können nur noch andere zugeordnete Autoren oder Administratoren und Redakteure Sie dieser Bauinformation erneut als Autor zuordnen. Wenn Sie weiterhin Autor bleiben möchten, drücken Sie die Schaltfläche 'Eingaben auf Originalwerte zurücksetzen'.",
  BAUINFORMATIONEN_EXPORT_ERFOLG:
    "Die Bauinformationen wurden erfolgreich exportiert. Zum Datei-Download die zugehörige Schaltfläche 'Bauinformationen herunterladen' drücken.",
  BAUINFORMATIONEN_EXPORT_FEHLER:
    "Die Bauinformationen konnten nicht exportiert werden",
  BAUINFORMATIONEN_IMPORT_ERFOLG:
    "Die Bauinformationen wurden erfolgreich importiert",
  BAUINFORMATIONEN_IMPORT_FEHLER:
    "Beim Import der Bauinformationen ist ein Fehler aufgetreten - überprüfen Sie das Ergebnis im Tab 'Bauinformationen'",
  //---------------------------------------------------------------------------------------
  BAUINFORMATIONSPROFIL_AENDERUNG_ERFOLG:
    "Das geänderte Bauinformationsprofil wurde erfolgreich gespeichert",
  BAUINFORMATIONSPROFIL_AENDERUNG_FEHLER:
    "Das geänderte Bauinformationsprofil konnte nicht gespeichert werden",
  BAUINFORMATIONSPROFIL_NEUANLAGE_ERFOLG:
    "Das neu angelegte Bauinformationsprofil wurde erfolgreich gespeichert",
  BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER:
    "Das neu angelegte Bauinformationsprofil konnte nicht gespeichert werden",
  BAUINFORMATIONSPROFIL_BESCHREIBUNG_AENDERUNG_ERFOLG:
    "Die geänderte Beschreibung des Bauinformationsprofils wurde erfolgreich gespeichert",
  BAUINFORMATIONSPROFIL_BESCHREIBUNG_AENDERUNG_FEHLER:
    "Die geänderte Beschreibung des Bauinformationsprofils konnte nicht gespeichert werden",
  BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD:
    "Die Bezeichnung für das Bauinformationsprofil fehlt. Bitte eine Bezeichnung eintragen",
  BAUINFORMATIONSPROFIL_LOESCHEN_ERFOLG:
    "Das Bauinformationsprofil wurde erfolgreich gelöscht",
  BAUINFORMATIONSPROFIL_LOESCHEN_FEHLER:
    "Das Bauinformationsprofil konnte nicht gelöscht werden",
  BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
    "Die für das Bauinformationsprofil gewählte Bezeichnung ist bereits vergeben - bitte eine andere eindeutige Bezeichnung eingeben",
  BAUINFORMATIONSPROFIL_LESEN_FEHLER:
    "Das Bauinformationsprofil konnte nicht gelesen werden",
  BAUINFORMATIONSPROFILE_LESEN_FEHLER:
    "Die Bauinformationsprofile konnten nicht gelesen werden",
  BAUINFORMATIONSPROFILE_ANZEIGEN_FEHLER:
    "Beim Anzeigen der Bauinformationsprofile ist ein Fehler aufgetreten",
  BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
    "Das Bauinformationsprofil wurde erfolgreich an der ausgewählten Baueinheit aktiviert",
  BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
    "Das Bauinformationsprofil konnte an der ausgewählten Baueinheit nicht aktiviert werden",
  BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
    "Das Bauinformationsprofil wurde erfolgreich an der ausgewählten Baueinheit deaktiviert",
  BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
    "Das Bauinformationsprofil konnte an der ausgewählten Baueinheit nicht deaktiviert werden",
  BAUINFORMATIONSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER:
    "Fehler bei Aktivierung oder Deaktivierung des Bauinformationsprofils an der ausgewählten Baueinheit",
  BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
    "Das Bauinformationsprofil wurde erfolgreich am ausgewählten Baustoff aktiviert",
  BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
    "Das Bauinformationsprofil konnte am ausgewählten Baustoff nicht aktiviert werden",
  BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_FEHLER:
    "Das Bauinformationsprofil konnte am ausgewählten Baustoff nicht deaktiviert werden",
  BAUINFORMATIONSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER:
    "Fehler bei Aktivierung oder Deaktivierung des Bauinformationsprofils am ausgewählten Baustoff",
  BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
    "Das Bauinformationsprofil wurde erfolgreich am ausgewählten Baustoff deaktiviert",
  //---------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFIL_AENDERUNG_ERFOLG:
    "Das geänderte Baueigenschaftsprofil wurde erfolgreich gespeichert",
  BAUEIGENSCHAFTSPROFIL_AENDERUNG_FEHLER:
    "Das geänderte Baueigenschaftsprofil konnte nicht gespeichert werden",
  BAUEIGENSCHAFTSPROFIL_NEUANLAGE_ERFOLG:
    "Das neu angelegte Baueigenschaftsprofil wurde erfolgreich gespeichert",
  BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER:
    "Das neu angelegte Baueigenschaftsprofil konnte nicht gespeichert werden",
  BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_ERFOLG:
    "Das neu angelegte Baueigenschaftsprofil wurde erfolgreich dupliziert",
  BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_FEHLER:
    "Das neu angelegte Baueigenschaftsprofil konnte nicht dupliziert werden",
  BAUEIGENSCHAFTSPROFIL_BESCHREIBUNG_AENDERUNG_ERFOLG:
    "Die geänderte Beschreibung des Baueigenschaftsprofils wurde erfolgreich gespeichert",
  BAUEIGENSCHAFTSPROFIL_BESCHREIBUNG_AENDERUNG_FEHLER:
    "Die geänderte Beschreibung des Baueigenschaftsprofils konnte nicht gespeichert werden",
  BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD:
    "Die Bezeichnung für das Baueigenschaftsprofil fehlt. Bitte eine Bezeichnung eintragen.",
  BAUEIGENSCHAFTSPROFIL_LOESCHEN_ERFOLG:
    "Das Baueigenschaftsprofil wurde erfolgreich gelöscht",
  BAUEIGENSCHAFTSPROFIL_LOESCHEN_FEHLER:
    "Das Baueigenschaftsprofil konnte nicht gelöscht werden",
  BAUEIGENSCHAFTSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN:
    "Die für das Baueigenschaftsprofil gewählte Bezeichnung ist bereits vergeben - bitte eine andere eindeutige Bezeichnung eingeben",
  BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER:
    "Das Baueigenschaftsprofil konnte nicht gelesen werden",
  BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER:
    "Die Baueigenschaftsprofile konnten nicht gelesen werden",
  BAUEIGENSCHAFTSPROFILE_ANZEIGEN_FEHLER:
    "Beim Anzeigen der Baueigenschaftsprofile ist ein Fehler aufgetreten",
  BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_ERFOLG:
    "Die Vorgabewerte für das Baueigenschaftsprofil wurden erfolgreich gespeichert",
  BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_FEHLER:
    "Die Vorgabewerte für das Baueigenschaftsprofil konnten nicht gespeichert werden",
  BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_ERFOLG:
    "Die Layout-Vorlage für das Baueigenschaftsprofil wurde erfolgreich exportiert. Zum Datei-Download die zugehörige Schaltfläche 'Layout-Vorlage herunterladen' drücken.",
  BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_FEHLER:
    "Die Layout-Vorlage für das Baueigenschaftsprofil konnte nicht exportiert werden",
  //----------------------------------------------------------------------------------------------------
  // ACHTUNG: Die folgenden Meldungen werden an ausgewählter Baueinheit und an Kindbaueinheit verwendet,
  // daher lautet der Text nicht "an der ausgewählten..."!
  BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
    "Das Baueigenschaftsprofil wurde erfolgreich an der Baueinheit aktiviert",
  BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
    "Das Baueigenschaftsprofil konnte an der Baueinheit nicht aktiviert werden",
  BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG:
    "Das Baueigenschaftsprofil wurde erfolgreich an der Baueinheit deaktiviert",
  BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_FEHLER:
    "Das Baueigenschaftsprofil konnte an der Baueinheit nicht deaktiviert werden",
  //----------------------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER:
    "Fehler bei Aktivierung oder Deaktivierung des Baueigenschaftsprofils an der ausgewählten Baueinheit",
  //----------------------------------------------------------------------------------------------------
  // ACHTUNG: Die folgenden Meldungen werden am ausgewählten Baustoff und an Kindbaustoff verwendet,
  // daher lautet der Text nicht "am ausgewählten..."!
  BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
    "Das Baueigenschaftsprofil wurde erfolgreich am Baustoff aktiviert",
  BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
    "Das Baueigenschaftsprofil konnte am Baustoff nicht aktiviert werden",
  BAUEIGENSCHAFTSPROFIL_ELTERNPROFILE_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
    "Die am Elternbaustoff aktivierten Baueigenschaftsprofile wurden erfolgreich auch am Baustoff aktiviert",
  BAUEIGENSCHAFTSPROFIL_ELTERNPROFILE_AKTIVIERUNG_AN_BAUSTOFF_FEHLER:
    "Die am Elternbaustoff aktivierten Baueigenschaftsprofile konnten am Baustoff nicht aktiviert werden",
  BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG:
    "Das Baueigenschaftsprofil wurde erfolgreich am Baustoff deaktiviert",
  BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_FEHLER:
    "Das Baueigenschaftsprofil konnte am Baustoff nicht deaktiviert werden",
  //----------------------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER:
    "Fehler bei Aktivierung oder Deaktivierung des Baueigenschaftsprofils am ausgewählten Baustoff",
    //---------------------------------------------------------------------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFILE_AKTUALISIERUNG_AKTION:
    "Die Baueigenschaftsprofile wurden aktualisiert. Wenn Sie die aktuellsten Baueigenschaftsprofile verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  BAUINFORMATIONSPROFILE_AKTUALISIERUNG_AKTION:
    "Die Bauinformationsprofile wurden aktualisiert. Wenn Sie die aktuellsten Bauinformationsprofile verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  BAUSTOFFE_AKTUALISIERUNG_AKTION:
    "Die Baustoffe wurden aktualisiert. Wenn Sie die aktuellsten Baustoffe verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App die aktuellsten Daten laden.",
  BAUVORLAGEN_AKTUALISIERUNG_AKTION:
    "Die Vorlagen für Baueinheiten wurden aktualisiert. Wenn Sie die aktuellsten Vorlagen verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  BAUINFORMATIONEN_AKTUALISIERUNG_AKTION:
    "Die Bauinformationen wurden aktualisiert. Wenn Sie die aktuellsten Bauinformationen verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  BAUEIGENSCHAFTEN_AKTUALISIERUNG_AKTION:
    "Die Baueigenschaften wurden aktualisiert. Wenn Sie die aktuellsten Baueigenschaften verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann auch noch später durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. die Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App  die aktuellsten Daten laden.",
  //-----------------------------------------------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFILFORMULAR_BAUEIGENSCHAFTEN_FEHLER:
    "Das anzuzeigende Baueigenschaftsprofilformular enthält Baueigenschaften, die im System oder am ausgewählten Knoten im Bauvorhabenbaum bzw. Baustoffbaum nicht angelegt sind, oder die der aktuellen Version des Baueigenschaftsprofils nicht zugeordnet sind. Es kann daher nicht angezeigt werden.",
  BAUEIGENSCHAFTSPROFILFORMULAR_KEIN_PROFIL_AKTVIERT:
    "Hier wird kein Baueigenschaftsprofilformular angezeigt, da an der links im Bauvorhabenbaum ausgewählten Baueinheit aktuell kein Baueigenschaftsprofil aktiviert ist. Um an der links im Bauvorhabenbaum ausgewählten Baueinheit ein Baueigenschaftsprofil zu aktivieren, wählen Sie ein passendes Profil in deren Kontextmenü 'Baueinheit auswählen und bestimmtes Baueigenschaftsprofil daran aktivieren' aus.",
  BAUEIGENSCHAFTSPROFILFORMULAR_BAUVORHABEN_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Bauvorhaben' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt. Hier kann in der mit 'Bauvorhaben' beginnenden grauen Untertableiste auch ein Baueigenschaftsprofilformular für ein anderes Profil ausgewählt werden, z.B. 'Standort' (falls dieses Profil an der ausgewählten Baueinheit ebenfalls aktiviert ist).",
  BAUEIGENSCHAFTSPROFILFORMULAR_STANDORT_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Standort' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt. Hier kann in der mit 'Bauvorhaben' beginnenden grauen Untertableiste auch ein Baueigenschaftsprofilformular für ein anderes Profil ausgewählt werden, z.B. 'Gebäude' (falls dieses Profil an der ausgewählten Baueinheit ebenfalls aktiviert ist).",
  BAUEIGENSCHAFTSPROFILFORMULAR_STANDORT_UNGUELTIGE_POSTLEITZAHL:
    "Für die eingegebene Postleitzahl konnten keine Normtemperaturen ermittelt werden. Bitte überprüfen und korrigieren Sie die Postleitzahl im Unter-Tab 'Lage'.",
  BAUEIGENSCHAFTSPROFILFORMULAR_GEBAEUDE_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Gebäude' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_GESCHOSS_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Geschoss' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_RAUM_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Raum' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  //  "Hier wird künftig das Baueigenschaftsprofilformular für 'Raum' an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt", // ALT
  BAUEIGENSCHAFTSPROFILFORMULAR_BODENAUFBAU_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Bodenaufbau' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_BODENAUFBAU_NEU_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Bodenaufbau (NEU)' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_SCHICHTAUFBAU_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Bodenaufbau' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_WANDAUFBAU_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Wandaufbau' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_SCHICHT_ANZEIGE:
    "Das Baueigenschaftsprofilformular für 'Schicht' wird an der links im Bauvorhabenbaum ausgewählten Baueinheit angezeigt",
  BAUEIGENSCHAFTSPROFILFORMULAR_NICHT_GEFUNDEN:
    "Für die links im Bauvorhabenbaum ausgewählte Baueinheit wurde kein passendes fachliches Baueigenschaftsprofilformular gefunden. Sie können im angezeigten Tab 'Bauvorhaben' > 'Fachliche Planung' > 'Profile' ein Baueigenschaftsprofil per Dropdown-Menü auswählen, für das dann ein generisches Profilformular angezeigt wird.",
  //------------------------------------------------------------------------------------------------------------------------------
  BAUEIGENSCHAFTSPROFILFORMULAR_ISTWERTE_MIT_SOLLWERTEN_INITIALISIERT:
    "Die lilafarbigen Eingabefelder wurden mit den entsprechenden, links angezeigten Werten aus der übergeordneten Baueinheit vorbelegt. Diese vorbelegten Werte können ggf. baueinheitsspezifisch angepasst werden. Achtung: Solche vorbelegte oder angepasste Werte in den lilafarbigen Eingabefeldern werden erst nach einmaligem Speichern wirksam. Sie werden dann ggf. an Kindbaueinheiten weitervererbt.",
  //--------------------------------------------------------------------------------------------------------------------------------
  BENUTZER_AKTUALISIERUNG_AKTION:
    "Die Benutzerkontoinformationen wurden aktualisiert. Wenn Sie die aktuellsten Benutzerkontoinformationen verwenden möchten, drücken Sie unten die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie unten die Schaltfläche 'Ignorieren'. Sie können dann durch Drücken der Schaltfläche 'Seite aktualisieren' links oben im Browser bzw. mit der Tastenkombination Strg + R im Browser oder der App bzw. durch eine Wischgeste von oben nach unten in der App auch später noch die aktuellsten Daten laden.",
  BROWSER_EINSTELLUNGEN:
    "Zur optimalen Bedienung wird empfohlen, ggf. den Browser mit der Funktionstaste F11 in den Vollbildmodus zu schalten und die Zoomstufe im Browser oder der App mit den Tastenkombinationen Strg und + bzw. Strg und - auf 75% einzustellen",
  WAS_GIBT_ES_NEUES: "Laden Sie die BIM.click-Seite im Browser bzw. die BIM.click-App einige Male neu, um mit der aktuellsten BIM.click-Version zu arbeiten (wird rechts oben angezeigt)"
});

// Exportiere die Benutzernachrichten als statische Klassen zur Verwendung durch andere
// Verwendung in konsumierenden Komponenten mit:
// import BenutzerNachrichten from "./BenutzerNachrichten.js";
export default BenutzerNachrichten;
// ACHTUNG: Hier NICHT: module.exports = BenutzerNachrichten;
// Sonst Fehler: "TypeError: Cannot assign to read only property 'exports' of object '#<Object>'"
// Siehe https://stackoverflow.com/questions/42449999/webpack-import-module-exports-in-the-same-module-caused-error
