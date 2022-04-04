// raum-nutzungs-arten-und-profile.js
// Exportiert nutzungsArtenUndProfileRaum
// Raum-Nutzungsarten nach DIN 18599
// Ausgangsbasis: XLS "BIM.click Baueigenschaften", Tab "Vorhandene Baueig. 'Nutzungsprofile'"
// HINWEISE:
// 1) Es war bereis eine vorläufige Baueigenschaft "Raum: Nutzungsprofil (nach erweiterter DIN 18599)" definiert,
//    die allerdings nur testweise von Stefan angelegt worden war, und später wieder disabled wurde
// 2) Es gibt außerdem bereits eine weitere vorläufige Baueigenschaft  baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"}, { nutzungsArt: "Raum > Nutzung > Profil", die allerdings bisher ein Bezeichnungswert,
//    kein Aufzählungswert ist
// 3) Die "Oberrubriken" (Knoten in der Hierarchie) entfernt, außer wenn diese explizit in der Tabelle 5 der DIN 18599 (PDF) aufgeführt sind als Nutzungen.
// 4) "Wohnen" vereinfacht (Aufteilung in Eigentums-/Miet-/Sozialwohnungen und gewerbliche/freiberufliche Nutzung entfernt)
// 5)  baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"}, { nutzungsArt: "Raum > Allgemein" hinzugefügt
// 6) Unterfelder nutzungsArt und baueigenschaftsProfilBezeichnung angelegt
// 7) Wenn noch kein Baueigenschaftsprofil vorhanden ist, das Unterfeld baueigenschaftsProfilBezeichnung auf null gesetzt

// TODOs:
// 1) Bei "Wohnen" fehlen die Nebenflächen (Treppenhäuser, Flure, Kellerräume, Technikräume, Fahrradräume, etc.), die zm Teil bei "Nicht-Wohnen" vorhanden sind

const NutzungsArtenUndProfileRaum = [
  {
    nutzungsArt: "Raum > Allgemein",
    baueigenschaftsProfilBezeichnung: "Baueinheit > Raum" // Vorhandenes "generisches" Profil für Raum, ohne Vorgabewerte
  },
  {
    nutzungsArt:
      "Raum > Testnutzungsart (NICHT AUSWÄHLEN - DEAKTIVIERT NUTZUNGSPROFIL 'RAUM'!)", // TODO XXXXXX #323 - nur temporär zum Testen
    baueigenschaftsProfilBezeichnung: "Allgemein > Test > Wertetypen" // Für Tests
  },
  {
    nutzungsArt:
      "Raum > Wohnen > Wohnraum als eingeschossige Nutzereinheit, geringe Belegung i. S. v. DIN 1946-6",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Wohnen > Wohnraum als eingeschossige Nutzereinheit, hohe Belegung i. S. v. DIN 1946-6",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Wohnen > Wohnraum als eingeschossige Nutzereinheit, genaue Personenzahl i. S. v. DIN 1946-6",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Wohnen > Wohnraum als mehrgeschossige Nutzereinheit i. S. v. DIN 1946-6",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Wohnen > Schlafraum (nach schalltechnischen Anforderungen)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Wohnen > Sanitärräume in Wohnungen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Wohnen > Flur in der Wohnung",
    baueigenschaftsProfilBezeichnung: "Baueinheit > Raum > Wohnen > Flur in der Wohnung" // Testprofil! ****************************************
  },
  {
    nutzungsArt: "Raum > Wohnen > Abstellraum in der Wohnung",
    baueigenschaftsProfilBezeichnung: "Baueinheit > Raum > Wohnen > Abstellraum in der Wohnung" // Testprofil! ****************************************
  },
  {
    nutzungsArt: "Raum > Wohnen > Küche in der Wohnung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Wohnen > Wohnküche > 10 m²",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Wohnen > Wohnküche > 10 Nutzungseinheit Gewerbe",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Büroräume > Einzelbüro",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Büroräume > Gruppenbüro (zwei bis sechs Arbeitsplätze)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Büroräume > Großraumbüro (ab sieben Arbeitsplätze)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Büroräume > Besprechung, Sitzung, Seminar",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Büroräume > Schalterhalle",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Handelsräume > Einzelhandel/Kaufhaus",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Handelsräume > Einzelhandel/Kaufhaus (Lebensmittelabteilung mit Kühlprodukten)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unterrichtsräume > Klassenzimmer (Schule), Gruppenraum (Kindergarten)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unterrichtsräume > Werkräume in Schulen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Unterrichtsräume > Hörsaal, Auditorium",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Unterkunftsräume > Bettenzimmer",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unterkunftsräume > Bettenzimmer im Krankenhaus",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Unterkunftsräume > Hotelzimmer",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Verpflegung und Gastronomie > Kantine",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Verpflegung und Gastronomie > Restaurant",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Verpflegung und Gastronomie > Küchen in Nichtwohngebäuden",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Verpflegung und Gastronomie > Küche – Vorbereitung, Lager",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > WC und Sanitärräume in Nichtwohngebäuden > WC-Räume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > WC und Sanitärräume in Nichtwohngebäuden > WC-Vorräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > WC und Sanitärräume in Nichtwohngebäuden > Duschräume, gewerblich",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Sonstige Aufenthaltsräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Nebenflächen (ohne Aufenthaltsräume)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Verkehrsflächen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Räume in kerntechnischen Anlagen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerstätten für schwach- und mittelradioaktive Anlagen > Kontrollbereiche",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerstätten für schwach- und mittelradioaktive Anlagen > Lager, Technik, Archiv",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Rechenzentrum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Gewerbliche und industrielle Hallen – schwere Arbeit, stehende Tätigkeit p",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Gewerbliche und industrielle Hallen – mittelschwere Arbeit, überwiegend stehende Tätigkeit p",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Gewerbliche und industrielle Hallen – leichte  Arbeit, überwiegend sitzende Tätigkeit p",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Auditorien > Zuschauerbereich (Theater und Veranstaltungsbauten)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Rundfunkstudio",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Fernsehstudio",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Konzertsaal",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Opernhaus",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Theater",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Kino",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Auditorien > Kino THX",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zu Veranstaltungsgebäuden > Foyer (Theater und Veranstaltungsbauten)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zu Veranstaltungsgebäuden > Bühne (Theater und Veranstaltungsbauten)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zu Veranstaltungsgebäuden > Messe / Kongress",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zu Veranstaltungsgebäuden > Ausstellungsräume und Museum mit konservatorischen Anforderungen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Bibliotheken > Bibliothek – Lesesaal",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Bibliotheken > Bibliothek – Freihandbereich",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Bibliotheken > Bibliothek – Magazin und Depot",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Turnhalle (ohne Zuschauerbereich)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Turnhalle (ohne Zuschauerbereich) > Turnhalle",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Turnhalle (ohne Zuschauerbereich) > Umkleide",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Turnhalle (ohne Zuschauerbereich) > Dusche",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Turnhalle (ohne Zuschauerbereich) > Sanitätsräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Schwimmhalle",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Saunabereich",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Fitnessraum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Schwimmbadtechnik",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Lager Chemie max. 200 Liter Schwefelsäure 37 % (eigene Auffangwanne)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Lager Chemie max. 200 Liter Natronlauge 33 % (eigene Auffangwanne)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Lager Chemie max. 200 Liter Polyaluminiumhydrochlorid (Flockungsmittel) (eigene Auffangwanne)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Schwimmhalle (ohne Zuschauerbereich) > Chlorgasraum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Eislaufhalle > Halle, Eisbereich",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Eislaufhalle > Halle, Zuschauerbereich",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Eislaufhalle > Umkleiden Eislaufhalle (Böden!)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume für Sport > Eislaufhalle > Technik",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Räume für Sport > Kegelbahn",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zum Abstellen von Fahrzeugen (Parkbauten) > Parkhäuser (Büro- und Privatnutzung)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume zum Abstellen von Fahrzeugen (Parkbauten) > Parkhäuser (öffentliche Nutzung)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Laborräume > Allgemeine Laborräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Laborräume > Reinräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Laborräume > Sauberräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Untersuchungs- und Behandlungsräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Operationsraum im Krankenhaus",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Untersuchungsraum im Krankenhaus",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Spezialpflegebereiche",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Flure des allgemeinen Pflegebereichs",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Räume im Gesundheitswesen > Arztpraxen und Therapeutische Praxen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerhallen, Logistikhallen > Allgemeine Lagerhallen, Logistikräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerhallen, Logistikhallen > Salzlagerhalle",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerhallen, Logistikhallen > Vorkühlraum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Lagerhallen, Logistikhallen > Kühlraum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Lagerhallen, Logistikhallen > Tiefkühlraum",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Erschließungsräume > Treppenräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt: "Raum > Nichtwohnen > Erschließungsräume > Parkdeckrampen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Erschließungsräume > Aufzugsunterfahrten",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Erschließungsräume > Aufzugsüberfahrten",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Lichtschacht",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Zuluftschacht",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Abluftschacht",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Außenluftschacht",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Fortluftschacht",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Hausanschlussräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Hausanschlussräume > Gas",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Hausanschlussräume > Fernwärme",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Hausanschlussräume > Wasser",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Hausanschlussräume > Abwasser",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Technikräume > Sprinklerzentrale",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Technikräume > Sprinklerbehälter",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Technikräume > Heizzentrale",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Technikräume > Lüftungszentrale",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Technikräume > Kältezentrale",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Elektroräume > Hochspannungsverteilung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Elektroräume > Mittelspannungsverteilung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Elektroräume > Niederspannungsverteilung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Elektroräume > Brandmeldezentrale",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Technikräume und -flächen > Technikzentralen > Serverräume",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Unbeheizter Kellerraum mit Abdichtung gegen Feuchte nach AaRdT für anspruchsvolle Nutzung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Unbeheizter Kellerraum mit Abdichtung gegen Feuchte nach AaRdT für normale Nutzung (DBV-Merkblatt)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Unbeheizter Kellerraum mit Abdichtung gegen Feuchte nach AaRdT für einfache Nutzung (DBV-Merkblatt)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Unbeheizter Kellerraum mit Abdichtung gegen Feuchte nach AaRdT für untergeordnete Nutzung (DBV-Merkblatt)",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Unbeheizter Kellerraum ohne Abdichtung gegen Feuchte nach AaRdT für untergeordnete Nutzung",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  {
    nutzungsArt:
      "Raum > Nichtwohnen > Unbeheizte Kellerräume > Räume zur Abfuhr von Wärme, Staub und Schadstoffen aus Maschinen",
    baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"
  },
  { // NEU: Catcher - bei Auswahl dieser Option wird generisches Nutzungsprofil "Baueinheit > Raum" zugewiesen!
    // ACHTUNG: Durch die Funktion in :option-value wird beim Nutzungsprofil "Baueinheit > Raum" dann automatisch die ERSTE Option oben ausgewählt ("Raum > Allgemein")
    nutzungsArt:
      "Raum > Unbekannte Nutzungsart",
    baueigenschaftsProfilBezeichnung: "Baueinheit > Raum"
  }
];
module.exports = NutzungsArtenUndProfileRaum; // NEU
// ACHTUNG: Mit
// export default nutzungsArtenRaum
// kommt Fehler  baueigenschaftsProfilBezeichnung: "Für die ausgewählte Nutzungsart ist kein Nutzungsprofil vorhanden"}, { nutzungsArt: "Raum > SyntaxError: Unexpected token export"!!!
