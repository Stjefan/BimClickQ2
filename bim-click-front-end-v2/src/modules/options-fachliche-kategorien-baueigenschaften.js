// options-fachliche-kategorien-baueigenschaften.js
// Exportiert ein "map-artiges" JS Objekt mit Options für fachliche Kategorien/Rubriken, welches in den welches im den Details für eine ausgewählte Baueigenschaft
// in baueinheiten.vue, baustoffe.vue sowie in baueigenschaften.vue verwendet wird
// ZUGRIFF auf ein Unterobjekt erfolgt per Key: optionsFachlicheKategorienBaueigenschaften["Wirtschaft"].ueberschriftKategorie
// ACHTUNG: Es handelt sich bei diesem speziellen Objekt
// a) nicht um einen Array, sondern eine "Pseudo-Map" als JS-Objekt, welche die fachliche Kategorie (z.B. "Wirtschaft") als Key verwendet
// b) um ein File, dass die Options für alle fachlichen Kategorien spezifiziert, nicht nur für eine - deshalb auch die "Pseudo-Map"!
// c) Es hat ein spezielles Format (z.B. Objekt vs. Array) für die Steuerung von q-option-groups
// HINWEIS: "Echte" JS-Maps müssten mit new Map erst erzeugt werden - dies testweise versucht in baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue.
// Vorteile: Es gibt zusätzliche Funktionen für Map, die Sortierung beim Einfügen wird garantiert (wird für dieses Layout aktuell aber nicht gebraucht)
// Nachteil: new Map, teilweise Zugriff mit .get statt direkt mit map["key"]

const OptionsFachlicheKategorienBaueigenschaften = {
  Struktur: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Struktur",
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Struktur > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Einordnung", // Fachliche Rubrik
        value: "Struktur > Einordnung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Zusammensetzung", // Fachliche Rubrik
        value: "Struktur > Zusammensetzung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Profilzuordnung", // Fachliche Rubrik
        value: "Struktur > Profilzuordnung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Wirtschaft: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Wirtschaft",
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Wirtschaft > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Handel", // Fachliche Rubrik
        value: "Wirtschaft > Handel", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Projektsteuerung", // Fachliche Rubrik
        value: "Wirtschaft > Projektsteuerung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Recht", // Fachliche Rubrik
        value: "Wirtschaft > Recht", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Kosten", // NEU
        // label: "Rechnungswesen", // ALT- fachliche Rubrik
        value: "Wirtschaft > Kosten", // NEU
        // value: "Wirtschaft > Rechnungswesen", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Umgebung: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Umgebung",
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Umgebung > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Geografie", // Fachliche Rubrik
        value: "Umgebung > Geografie", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Geopolitik", // Fachliche Rubrik
        value: "Umgebung > Geopolitik", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Infrastruktur", // Fachliche Rubrik
        value: "Umgebung > Infrastruktur", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Umwelt", // Fachliche Rubrik
        value: "Umgebung > Umwelt", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Klima", // Fachliche Rubrik
        value: "Umgebung > Klima", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Hydrogeologie", // Fachliche Rubrik
        value: "Umgebung > Hydrogeologie", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Energie: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Gebäudetechnik", // NEU
    // ueberschriftKategorie: "Energie", // ALT
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Gebäudetechnik > Allgemein", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Allgemein", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Wasser und Abwasser", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Wasser und Abwasser", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Wärme und Heizung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Heizung", // NEU - fachliche Rubrik
        // label: "Wärme und Heizung", // ALT - fachliche Rubrik
        value: "Gebäudetechnik > Heizung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Wärme und Heizung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Kühlung", // Fachliche Rubrik
        value: "Gebäudetechnik > Kühlung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Kühlung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Lüftung", // NEU
        // label: "Raumlufttechnik", // ALT - fachliche Rubrik
        value: "Gebäudetechnik > Lüftung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik" // HINWEIS: Hieß ursprünglich "Raumlufttechnik"
        // value: "Energie > Raumlufttechnik", // ALT - Bezeichnungsschema: "Kategorie > Rubrik" // HINWEIS: Hieß ursprünglich "Belüftung"
        color: "primary"
      },
      {
        label: "Elektrik", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Elektrik", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Kommunikation", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Kommunikation", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Beförderung", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Beförderung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Technik für spezifische Nutzungen", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Technik für spezifische Nutzungen", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Automation", // NEU - fachliche Rubrik
        value: "Gebäudetechnik > Automation", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Nutzungs- und Betriebszeiten", // Fachliche Rubrik
        value: "Gebäudetechnik > Nutzungs- und Betriebszeiten", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Nutzungs- und Betriebszeiten", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Raumklima", // Fachliche Rubrik
        value: "Gebäudetechnik > Raumklima", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Raumklima", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Beleuchtung", // Fachliche Rubrik
        value: "Gebäudetechnik > Beleuchtung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Beleuchtung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Beschattung", // Fachliche Rubrik
        value: "Gebäudetechnik > Beschattung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Beschattung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Belichtung", // NEU
        // label: "Lichteinfall", // ALT - fachliche Rubrik
        value: "Gebäudetechnik > Belichtung", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Energie > Lichteinfall", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Geometrie: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Geometrie",
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Geometrie > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Maße", // Fachliche Rubrik
        value: "Geometrie > Maße", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Mengen", // Fachliche Rubrik
        value: "Geometrie > Mengen", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Statik: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Statik",
    optionsKategorie: [
      // Steuert die auswählbaren Werte in der q-option-group
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Statik > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Lasten", // Fachliche Rubrik
        value: "Statik > Lasten", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Standsicherheit", // Fachliche Rubrik
        value: "Statik > Standsicherheit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Festigkeit", // Fachliche Rubrik
        value: "Statik > Festigkeit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Konstruktion: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Konstruktion",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Konstruktion > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Bautenschutz: {
    // NEU
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Bautenschutz", // NEU
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Bautenschutz > Allgemein", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Feuchteschutz > Allgemein", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Abdichtungstechnik", // Fachliche Rubrik
        value: "Bautenschutz > Abdichtungstechnik", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Feuchteschutz > Abdichtungstechnik", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Korrosionsschutz", // Fachliche Rubrik
        value: "Bautenschutz > Korrosionsschutz", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Feuchteschutz > Korrosionsschutz", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Holzschutz", // Fachliche Rubrik
        value: "Bautenschutz > Holzschutz", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Feuchteschutz > Holzschutz", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Feuchteschutz: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Feuchteschutz",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Feuchteschutz > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
      // ALT:
      /*
      {
        label: "Abdichtungstechnik", // Fachliche Rubrik
        value: "Feuchteschutz > Abdichtungstechnik", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Korrosionsschutz", // Fachliche Rubrik
        value: "Feuchteschutz > Korrosionsschutz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Holzschutz", // Fachliche Rubrik
        value: "Feuchteschutz > Holzschutz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
      */
    ]
  },
  Wärmeschutz: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Wärmeschutz",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Wärmeschutz > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Energiebedarf", // Fachliche Rubrik
        value: "Wärmeschutz > Energiebedarf", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Akustik: {
    // NEU
    // Schallschutz: { // ALT
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Akustik", // NEU
    // ueberschriftKategorie: "Schallschutz", // ALT
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Akustik > Allgemein", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Schallschutz > Allgemein", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Schallschutz", // NEU - Fachliche Rubrik
        value: "Akustik > Schallschutz", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Raumakustik", // Fachliche Rubrik
        value: "Akustik > Raumakustik", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        // value: "Schallschutz > Raumakustik", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
      // ALT:
      /*
      {
        label: "Schwingung", // Fachliche Rubrik
        value: "Schallschutz > Schwingung", // ALT - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
      */
    ]
  },
  "Schwingungs- und Erschütterungsschutz": {
    // NEU
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // ACHTUNG: Da hier Key "Schwingungs- und Erschütterungsschutz" mit Blanks, ist das bei diesem nicht so!
    // Fachliche Kategorie
    ueberschriftKategorie: "Schwingungs- und Erschütterungsschutz", // NEU
    // ueberschriftKategorie: "Schallschutz", // ALT
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Schwingungs- und Erschütterungsschutz > Allgemein", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Schwingungen", // NEU - Fachliche Rubrik
        value: "Schwingungs- und Erschütterungsschutz > Schwingungen", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Erschütterungen", // NEU - Fachliche Rubrik
        value: "Schwingungs- und Erschütterungsschutz > Erschütterungen", // NEU - Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Brandschutz: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Brandschutz",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Brandschutz > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Blitzschutz", // Fachliche Rubrik
        value: "Brandschutz > Blitzschutz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Sicherheit: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Sicherheit",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Sicherheit > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Verkehrssicherheit", // Fachliche Rubrik
        value: "Sicherheit > Verkehrssicherheit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Barrierefreiheit", // Fachliche Rubrik
        value: "Sicherheit > Barrierefreiheit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Elektrische Sicherheit", // Fachliche Rubrik
        value: "Sicherheit > Elektrische Sicherheit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Gebrauchstauglichkeit: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Gebrauchstauglichkeit",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Gebrauchstauglichkeit > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Behaglichkeit", // Fachliche Rubrik
        value: "Gebrauchstauglichkeit > Behaglichkeit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Gesundheit: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Gesundheit",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Gesundheit > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Schadstoffschutz", // Fachliche Rubrik
        value: "Gesundheit > Schadstoffschutz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Radonschutz", // Fachliche Rubrik
        value: "Gesundheit > Radonschutz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Ressourcen: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Ressourcen",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Ressourcen > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Umweltverträglichkeit", // Fachliche Rubrik
        value: "Ressourcen > Umweltverträglichkeit", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Ökobilanz", // Fachliche Rubrik
        value: "Ressourcen > Ökobilanz", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Lebenszyklus", // Fachliche Rubrik
        value: "Ressourcen > Lebenszyklus", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Bautechnik: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Bautechnik",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Bautechnik > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Baubablauf", // Fachliche Rubrik
        value: "Bautechnik > Bauablauf", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Zeitbedarf", // Fachliche Rubrik
        value: "Bautechnik > Zeitbedarf", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Winterbau", // Fachliche Rubrik
        value: "Bautechnik > Winterbau", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Verwendung: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Verwendung",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Verwendung > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Herkunft", // Fachliche Rubrik
        value: "Verwendung > Herkunft", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Qualität", // Fachliche Rubrik
        value: "Verwendung > Qualität", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Herstellung", // Fachliche Rubrik
        value: "Verwendung > Herstellung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Verpackung", // Fachliche Rubrik
        value: "Verwendung > Verpackung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Lieferung", // Fachliche Rubrik
        value: "Verwendung > Lieferung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Lagerung", // Fachliche Rubrik
        value: "Verwendung > Lagerung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Verarbeitung", // Fachliche Rubrik
        value: "Verwendung > Verarbeitung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Anwendung", // Fachliche Rubrik
        value: "Verwendung > Anwendung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Montage", // Fachliche Rubrik
        value: "Verwendung > Montage", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Verbrauch", // Fachliche Rubrik
        value: "Verwendung > Verbrauch", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Nachbehandlung", // Fachliche Rubrik
        value: "Verwendung > Nachbehandlung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Betrieb", // Fachliche Rubrik
        value: "Verwendung > Betrieb", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Benutzung", // Fachliche Rubrik
        value: "Verwendung > Benutzung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      { // NEU
        label: "Reinigung", // Fachliche Rubrik
        value: "Verwendung > Reinigung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Pflege", // Fachliche Rubrik
        value: "Verwendung > Pflege", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Wartung", // Fachliche Rubrik
        value: "Verwendung > Wartung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Demontage", // Fachliche Rubrik
        value: "Verwendung > Demontage", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Wiederverwertung", // Fachliche Rubrik
        value: "Verwendung > Wiederverwertung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Entsorgung", // Fachliche Rubrik
        value: "Verwendung > Entsorgung", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  },
  Sonstiges: {
    // ACHTUNG: Formatter macht hier aus dem Key "Kategorie" einen Identifier ohne Anführungszeichen - dies ist in JS auch gleichbedeutend!
    // Fachliche Kategorie
    ueberschriftKategorie: "Sonstiges",
    optionsKategorie: [
      {
        label: "Allgemein", // Fachliche Rubrik
        value: "Sonstiges > Allgemein", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      },
      {
        label: "Test", // Fachliche Rubrik
        value: "Sonstiges > Test", // Bezeichnungsschema: "Kategorie > Rubrik"
        color: "primary"
      }
    ]
  }
};

module.exports = OptionsFachlicheKategorienBaueigenschaften; // NEU
// ACHTUNG: Mit
// export default OptionsFachlicheKategorienBaueigenschaften
// kommt Fehler "SyntaxError: Unexpected token export"!!!
