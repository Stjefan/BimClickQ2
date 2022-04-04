// bauwerks-zuordnungen.js
// Exportiert BauwerksZuordnungen in hierarchischer Gliederung
// ACHTUNG: Options OHNE Kinder können, müssen aber nicht children: [] haben, für das v-for-Processing!!!
// ACHTUNG: Diese Datei existiert zweimal - im Frontend und Backend! Änderungen müssen in beiden Dateien eingepflegt werden!

// Bauwerkszuordnungen nach Bauwerkszuordnungskatalog (BWZK) bestehend aus Bauwerkszuordnungskennzeichen und Bauwerkszuordnungsbezeichnung
// Siehe http://www.stadtentwicklung.berlin.de/service/gesetzestexte/de/download/bauen/abau/Bauwerkszuordnungskatalog.pdf
// und http://www.ifbor.eu/resources/ifBOR+BZK+2007-10+S1-10.pdf

const BauwerksZuordnungenHierachisch = [
  {
    label: "1000 - Parlament, Gericht, Verwaltung",
    children: [
      {
        label: "1100 - Parlamentsgebäude"
        // children: []  // Kann auch entfallen!
      },
      {
        label: "1200 - Gerichtsgebäude",
        children: [
          {
            label: "1210 - Gerichtsgebäude mit normaler technischer Ausstattung"
          },
          {
            label: "1220 - Gerichtsgebäude mit höherer technischer Ausstattung"
          },
          { label: "1230 - Staatsanwaltschaften" },
          { label: "1240 - Notariate" }
        ]
      },
      {
        label: "1300 - Verwaltungsgebäude",
        children: [
          {
            label: "1310 - Ministerien / Staatskanzleien / Landesvertretungen"
          },
          {
            label:
              "1320 - Verwaltungsgebäude mit einfacher technischer Ausstattung",
            children: [
              { label: "1321 - Behördenzentren / Behördenhäuser" },
              { label: "1322 - Rathäuser" },
              { label: "1323 - Verwaltungsgebäude / Ämtergebäude" }
            ]
          },
          {
            label:
              "1330 - Verwaltungsgebäude mit erhöhter technischer Ausstattung / Ausrüstung / Funktion",
            children: [
              { label: "1331 - Bankgebäude" },
              { label: "1332 - Rechenzentren" },
              { label: "1333 - Verwaltungsgebäude mit Prüffunktion" }
            ]
          },
          {
            label: "1340 - Polizeidienstgebäude Bund / Land",
            children: [
              { label: "1341 - Präsidien / Direktionen" },
              { label: "1342 - Kommissariate / Reviere / Inspektionen" },
              { label: "1343 - Polizeigebäude mit Zusatzfunktion" },
              { label: "1344 - Bereitschaftspolizei / Bundespolizei" },
              { label: "1345 - Bundeskriminalämter" },
              { label: "1346 - Landeskriminalämter" }
            ]
          },
          {
            label: "1350 - Militärische Verwaltungsgebäude",
            children: [
              {
                label:
                  "1351 - Militärische Verwaltungsgebäude mit einfacher technischer Ausstattung"
              },
              {
                label:
                  "1352 - Militärische Verwaltungsgebäude mit erhöhter technischer Ausstattung"
              }
            ]
          },
          {
            label: "1360 - Anlagen für Zoll",
            children: [
              { label: "1361 - Zollämter" },
              { label: "1362 - Zollabfertigungsanlagen" }
            ]
          },
          {
            label: "1370 - Verwaltungsgebäude für Justizvollzug",
            children: []
          },
          {
            label: "1380 - Dienstgebäude für öffentliche Bereitschaftsdienste",
            children: []
          }
        ]
      }
    ]
  },
  {
    label: "2000 - Wissenschaftliche Lehre und Forschung",
    children: [
      {
        label: "2100 - Gebäude für Lehre",
        children: [
          {
            label: "2110 - Hörsäle",
            children: [
              { label: "2111 - Hörsäle ohne Zusatznutzung" },
              { label: "2112 - Hörsäle mit Zusatznutzung" }
            ]
          },
          { label: "2120 - Seminargebäude" }
        ]
      },
      {
        label: "2200 - Institute für Lehre und Forschung",
        children: [
          {
            label:
              "2210 - Geistes-, Wirtschafts-, Rechts-, Sozialwissenschaften (Institutsgruppe 1)"
          },
          {
            label:
              "2220 - Agrar- u. Forstwissenschaften, Tierhaltung (ohne hochinstall. Forschungsbereiche) (Institutsgruppe 2)"
          },
          {
            label:
              "2230 - Erziehungswissenschaften, Kunst und Design (Institutsgruppe 3)"
          },
          {
            label:
              "2240 - Ingenieurwissenschaften, Informatik, Mathematik (Institutsgruppe 4)"
          },
          {
            label:
              "2250 - Naturwissenschaften, Sportwissenschaften (Institutsgruppe 5)"
          },
          { label: "2260 - Medizin (ohne Kliniken) (Institutsgruppe 6)" },
          { label: "2270 - Musikwissenschaften (Institutsgruppe 7)" },
          {
            label:
              "2280 - Chemie, Physik, Biologie, Pharmazie (Institutsgruppe 8)"
          }
        ]
      },
      {
        label: "2300 - Institute für Lehre und Forschung hochinstalliert",
        children: [
          { label: "2310 - Medizinische Forschung (Institutsgruppe 9)" },
          {
            label:
              "2320 - Physikforschung, Tierforschung, Biologieforschung, Materialforschung (Institutsgruppe 10)"
          }
        ]
      },
      {
        label: "2400 - Gebäude für Forschung ohne Lehre",
        children: [{ label: "2410 Forschungsanstalten" }]
      },
      {
        label: "2500 - Laborgebäude",
        children: [
          { label: "2510 - Labore mit einfacher technischer Ausstattung" },
          { label: "2520 - Speziallabore" }
        ]
      }
    ]
  },
  {
    label: "3000 - Gesundheit",
    children: [
      {
        label: "3100 - Hochschulkliniken (mit Forschung und Lehre)",
        children: [
          {
            label: "3110 - Hochschulkliniken",
            children: [
              { label: "3111 - Hochschulkliniken gesamt" },
              {
                label:
                  "3112 - Behandlungszentren (Pflege sowie Untersuchung und Behandlung mehrerer Fachdisziplinen) nur in Anbindung an ein Krankenhaus Operatives Zentrum)"
              },
              {
                label:
                  "3113 - Kliniken (Pflege sowie Untersuchung und Behandlung einer Fachdisziplin)"
              }
            ]
          },
          {
            label: "3120 - Gebäude für somatische Krankenversorgung",
            children: [
              { label: "3121 - Bettenhaus (- Pflege)" },
              { label: "3122 - Gebäude (Untersuchung u. Behandlung)" }
            ]
          },
          {
            label: "3130 - Gebäude mit besonderen Anforderungen",
            children: [
              { label: "3131 - Strahlentherapie" },
              { label: "3132 - Nuklearmedizin" },
              { label: "3133 - Schwerstbrandverletztenzentrum" },
              { label: "3134 - Palliativzentrum" },
              { label: "3135 - Zentrum für hochkontagiöse Infektionskranke" },
              {
                label:
                  "3136 - Knochenmarktransplantationen (Pflege und Therapie)"
              },
              { label: "3137 - Querschnittsgelähmte" },
              { label: "3138 - Geriatrie" }
            ]
          },
          {
            label:
              "3140 - Gebäude für psychiatrische und psychosomatische Krankenversorgung",
            children: [
              { label: "3141 - Psychiatrie gesamt (Pflege u. Therapie)" },
              { label: "3142 - Bettenhaus (Pflege)" },
              { label: "3143 - Untersuchung und Therapie" },
              { label: "3144 - Kinder- und Jugendpsychiatrie (gesamt)" }
            ]
          }
        ]
      },
      {
        label: "3200 - Krankenhäuser (ohne Forschung und Lehre)",
        children: [
          {
            label: "3210 - Krankenhäuser",
            children: [
              { label: "3211 - Krankenhäuser gesamt" },
              {
                label:
                  "3212 - Behandlungszentren (Pflege sowie Untersuchung und Behandlung mehrerer Fachdisziplinen) nur in Anbindung an ein Krankenhaus"
              },
              {
                label:
                  "3213 - Kliniken (Pflege sowie Untersuchung u. Behandlung einer Fachdisziplin)"
              }
            ]
          },
          {
            label: "3220 - Gebäude für somatische Krankenversorgung",
            children: [
              { label: "3221 - Bettenhaus (Pflege)" },
              { label: "3222 - Gebäude (Untersuchung u. Behandlung)" }
            ]
          },
          {
            label: "3230 - Gebäude mit besonderen Anforderungen",
            children: [
              { label: "3231 - Strahlentherapie" },
              { label: "3232 - Nuklearmedizin" },
              { label: "3233 - Schwerstbrandverletztenzentrum" },
              { label: "3234 - Palliativzentrum" },
              { label: "3235 - Zentrum für hochkontagiöse Infektionskranke" },
              {
                label:
                  "3236 - Knochenmarktransplantationen (Pflege und Therapie)"
              },
              { label: "3237 - Querschnittsgelähmte" },
              { label: "3238 - Geriatrie" }
            ]
          },
          {
            label:
              "3240 - Gebäude für psychiatrische und psychosomatische Krankenversorgung",
            children: [
              { label: "3241 - Psychiatrie gesamt (Pflege u. Therapie)" },
              { label: "3242 - Bettenhaus (Pflege)" },
              { label: "3243 - Untersuchung und Therapie" },
              { label: "3244 - Kinder- und Jugendpsychiatrie (gesamt)" }
            ]
          },
          {
            label: "3250 - Sonderkrankenhäuser",
            children: [{ label: "3251 - Forensik (Maßregelvollzug)" }]
          }
        ]
      },
      {
        label: "3300 - Gebäude für teilstationäre Versorgung",
        children: [
          { label: "3310 - Tageskliniken" },
          { label: "3320 - Geburtshäuser" }
        ]
      },
      {
        label: "3400 - Gebäude für nicht stationäre Versorgung",
        children: [
          { label: "3410 - Medizinische Versorgungszentren (MVZ)" },
          { label: "3420 - Arztpraxen" },
          { label: "3430 - Notfallpraxen" }
        ]
      },
      {
        label: "3500 - Gebäude für den Sanitätsdienst der Bundeswehr",
        children: [
          {
            label: "3510 - Bundeswehrkrankenhäuser",
            children: [
              {
                label:
                  "3511 - Bundeswehrkrankenhäuser gesamt (Pflege sowie Untersuch. u. Behand., Ver- u. Entsorgung)"
              }
            ]
          },
          { label: "3520 - Facharzt- und Sanitätszentren" },
          { label: "3530 - Sonstige Gebäude für Untersuchung und Behandlung" }
        ]
      },
      {
        label: "3600 - Pflegeheime",
        children: [
          { label: "3610 - Altenheime/Altenpflegeheime" },
          { label: "3620 - Pflegeheime für Behinderte" },
          { label: "3630 - Psychiatrische Pflegeheime" },
          { label: "3640 - Tagespflegeeinrichtungen" },
          { label: "3650 - Hospize" }
        ]
      },
      {
        label: "3700 - Rehabilitation (Reha)",
        children: [{ label: "3710 - Rehabilitationskliniken (Reha)" }]
      },
      {
        label: "3800 - Kur und Genesung",
        children: [
          { label: "3810 - Kurkliniken" },
          { label: "3820 - Sole- und Thermalbäder" },
          { label: "3840 - Gebäude für Erholung" }
        ]
      }
    ]
  },
  {
    label: "4000 - Bildung und Kultur",
    children: [
      {
        label: "4100 - Allgemeinbildende Schulen",
        children: [
          { label: "4110 - Schulen, allgemein" },
          { label: "4120 - Ganztagesschulen mit Verpflegungseinrichtung" },
          { label: "4130 - Internatsschulen gesamt" },
          { label: "4140 - Förderschulen / Sonderschulen" }
        ]
      },
      {
        label: "4200 - Berufsbildende Schulen",
        children: [
          {
            label: "4210 - Berufsbildende Schulen (gewerblich/wirtschaftlich)"
          },
          {
            label:
              "4220 - Berufsbildende Schulen mit höherer techn. Ausstattung"
          },
          { label: "4230 - Berufsakademien / Berufskollegs" },
          {
            label: "4240 - Ausbildungsstätten Bundeswehr / Polizei",
            children: [
              { label: "4241 - Unteroffiziers- / Offiziersschulen" },
              { label: "4242 - Führungsakademien" },
              { label: "4243 - Fachschulen" },
              { label: "4244 - Fachhochschulen" },
              { label: "4245 - Besondere Ausbildungsstätten" }
            ]
          }
        ]
      },
      {
        label: "4300 - Bildungseinrichtungen für Erwachsene",
        children: [
          { label: "4310 - Bildungszentren" },
          { label: "4320 - Ausbildungsstätten" },
          { label: "4330 - Volkshochschulen" }
        ]
      },
      {
        label: "4400 - Kinderbetreuungseinrichtungen",
        children: [
          { label: "4410 - Kindertagesstätten" },
          { label: "4420 - Kindertagesstätten mit Küche" },
          { label: "4430 - Sonderkindertagesstätten" },
          { label: "4440 - Sonderkindertagesstätten mit Küche" }
        ]
      },
      {
        label: "4500 - Bibliotheken / Archive",
        children: [
          {
            label: "4510 - Bibliotheksgebäude mit einfacher techn. Ausstattung"
          },
          {
            label: "4520 - Bibliotheksgebäude mit erhöhter techn. Ausstattung"
          },
          { label: "4530 - Archive mit einfacher techn. Ausstattung" },
          { label: "4540 - Archive mit erhöhter techn. Ausstattung" }
        ]
      },
      {
        label: "4600 - Ausstellungsgebäude",
        children: [{ label: "4610 - Galerien" }, { label: "4620 - Museen" }]
      },
      {
        label: "4700 - Veranstaltungsgebäude",
        children: [
          {
            label:
              "4710 - Veranstaltungsgebäude mit einfacher techn. Ausstattung",
            children: [
              { label: "4711 - Gemeinschaftshäuser" },
              { label: "4712 - Haus des Gastes" }
            ]
          },
          {
            label:
              "4720 - Veranstaltungsgebäude mit erhöhter techn. Ausstattung"
          },
          {
            label: "4800 - Sakralbauten",
            children: [
              { label: "4810 - Dome/Münster" },
              { label: "4820 - Kirchen" },
              { label: "4830 - Kapellen" }
            ]
          }
        ]
      },
      {
        label: "4900 - Historische Gebäude / Gedenkstätten",
        children: [
          { label: "4910 - Schlösser" },
          { label: "4920 - Burgen" },
          { label: "4930 - Ruinen" },
          { label: "4940 - Baudenkmäler" },
          { label: "4950 - Gedenkstätten" },
          { label: "4960 - Gedenksteine" }
        ]
      }
    ]
  },
  {
    label: "5000 - Sport",
    children: [
      {
        label: "5100 - Sporthallen",
        children: [
          { label: "5110 - Ein- und Mehrfeldhallen" },
          { label: "5120 - Gymnastikhallen" },
          { label: "5130 - Sporthallen mit Mehrzwecknutzung" }
        ]
      },
      {
        label: "5200 - Schwimmhallen",
        children: [
          { label: "5210 - Hallenbäder" },
          { label: "5220 - Spaß- und Freizeitbäder" },
          { label: "5230 - Thermalbäder" },
          { label: "5240 - Hallenbäder mit Freibadanlagen" }
        ]
      },
      {
        label: "5300 - Sondersportanlagen",
        children: [
          { label: "5310 - Kegelbahnen / Bowling" },
          {
            label: "5320 - Schießanlagen / auch für die Polizei",
            children: [
              { label: "5321 - Schießstände" },
              { label: "5322 - Raumschießanlagen" }
            ]
          },
          { label: "5330 - Reithallen" },
          { label: "5340 - Eissporthallen" },
          { label: "5350 - Tennishallen" },
          { label: "5360 - Sportleistungszentren" }
        ]
      },
      {
        label: "5400 - Gebäude für Sportaußenanlagen",
        children: [
          { label: "5420 - Tribünengebäude" },
          { label: "5430 - Sportheime / Clubheime" },
          { label: "5440 - Platzwartgebäude" },
          { label: "5450 - Sportbetriebsgebäude" }
        ]
      },
      {
        label: "5500 - Sportaußenanlagen",
        children: [
          { label: "5510 - Sportplätze" },
          { label: "5520 - Freibadanlagen" },
          { label: "5530 - Stadien / Arenen" }
        ]
      }
    ]
  },
  {
    label: "6000 - Wohnen, Beherbergen, Betreuen, Verpflegen",
    children: [
      {
        label: "6100 - Wohnhäuser",
        children: [
          {
            label: "6110 - Einfamilienhäuser",
            children: [
              { label: "6111 - Einfamilienhäuser nur für Wohnzwecke" },
              { label: "6112 - Einfamilienhäuser mit zusätzl. Nutzung" }
            ]
          },
          {
            label: "6120 - Mehrfamilienhäuser",
            children: [
              { label: "6121 - Mehrfamilienhäuser nur für Wohnzwecke" },
              { label: "6122 - Mehrfamilienhäuser mit zusätzl. Nutzung" },
              { label: "6123 - Behelfswohngebäude" }
            ]
          }
        ]
      },
      {
        label: "6200 - Wohnheime",
        children: [
          { label: "6210 - Altenwohnheime / Feierabendheime" },
          { label: "6220 - Personalwohnheime, Schwesternwohnheime" },
          { label: "6230 - Studentenwohnheime" },
          { label: "6240 - Behindertenwohnheime" },
          { label: "6250 - Sportlerwohnheime" },
          { label: "6260 - Schülerwohnheime" },
          { label: "6270 - Kinderheime" }
        ]
      },
      {
        label: "6300 - Gemeinschaftsunterkünfte",
        children: [
          { label: "6310 - Unterkünfte für Bundeswehr und Polizei" },
          { label: "6320 - Sammellagerunterkünfte" },
          { label: "6330 - Klostergebäude" }
        ]
      },
      {
        label: "6400 - Beherbergungsstätten",
        children: [
          { label: "6410 - Hotels / Pensionen" },
          { label: "6420 - Jugendherbergen" },
          { label: "6430 - Gästehäuser / Ferienhäuser" },
          { label: "6440 - Ferienheime / Schullandheime" }
        ]
      },
      {
        label: "6500 - Beherbergen im Justizvollzug",
        children: [
          { label: "6510 - Justizvollzugsanstalten Gesamtanlagen" },
          { label: "6520 - Jugendvollzugsanstalten Gesamtanlagen" },
          { label: "6530 - Jugendarrestanstalten" },
          {
            label: "6540 - Unterkunftsgebäude",
            children: [
              { label: "6541 - Zellengebäude" },
              { label: "6542 - Freigängerhäuser" }
            ]
          }
        ]
      },
      {
        label: "6600 - Betreuungseinrichtungen",
        children: [
          { label: "6610 - Studentenhäuser" },
          { label: "6620 - Altenzentren / Altentagesstätten" },
          { label: "6630 - Jugendzentren" },
          { label: "6640 - Zentren für Gemeinschaftshilfe / Sozialgebäude" },
          { label: "6650 - Betreuungsgebäude der Bundeswehr" }
        ]
      },
      {
        label: "6700 - Verpflegungseinrichtungen",
        children: [
          { label: "6710 - Gaststätten" },
          { label: "6720 - Mensen / Kantinen" },
          { label: "6730 - Mensen mit Zusatznutzung" },
          { label: "6740 - Raststätten" },
          {
            label: "6750 - Wirtschaftsgebäude der Bundeswehr",
            children: [
              { label: "6751 - Verpflegungsteilnehmer VT 300/600/900" },
              { label: "6752 - Verpflegungsteilnehmer VT 1200" },
              { label: "6753 - Verpflegungsteilnehmer VT über 1200" }
            ]
          },
          {
            label: "6760 - Wirtschaftsgebäude der Bundeswehr mit Zusatznutzung"
          },
          { label: "6770 - Verpflegungseinrichtung in der JVA" }
        ]
      }
    ]
  },
  {
    label:
      "7000 - Produktion, Lagerung, Verkauf, Wartung und Pflege, zentrale Ver- u. Entsorgung, öffentliche Bereitschaftsdienste",
    children: [
      {
        label: "7100 - Produktionsstätten / Verarbeitung",
        children: [
          { label: "7110 - Gewerbliche Produktionsstätten" },
          { label: "7120 - Industrielle Produktionsstätten" }
        ]
      },
      {
        label: "7200 - Gebäude für Haltung u. Pflege von Tieren u. Pflanzen",
        children: [
          {
            label:
              "7210 - Gebäude für Tierhaltung (Landwirtschaft, Ausstellung, Züchtung)",
            children: [
              { label: "7211 - Kleintierhäuser" },
              { label: "7212 - Großtierhäuser" },
              { label: "7213 - Stallgebäude" },
              { label: "7214 - Hundezwinger" }
            ]
          },
          {
            label: "7220 - Gebäude für Tiermedizin/ Pflege",
            children: [
              { label: "7221 - Tierkliniken" },
              { label: "7222 - Tierarztpraxen" }
            ]
          },
          {
            label: "7230 - Gebäude für Pflanzenhaltung (Ausstellung, Züchtung)",
            children: [
              { label: "7231 - Gärtnereigebäude" },
              { label: "7232 - Gewächshäuser" },
              { label: "7233 - Gärtnerische Anlagen" }
            ]
          },
          { label: "7240 - Produktionsstätten bei Tier- und Pflanzenhaltung" }
        ]
      },
      {
        label: "7300 - Gebäude für Lagerung",
        children: [
          { label: "7310 - Offene Lagergebäude" },
          {
            label: "7320 - Geschlossene Lagergebäude",
            children: [
              { label: "7321 - Landwirtschaftliche Lagergebäude" },
              { label: "7322 - Streugutlagerhallen" },
              { label: "7323 - Gerätelagerhallen" },
              { label: "7324 - Magazingebäude" },
              { label: "7325 - Magazingebäude mit besonderen Anforderungen" },
              { label: "7326 - Hochregallager" },
              { label: "7327 - Lagergebäude in Hafenanlagen" },
              { label: "7328 - Bundeswehrspezifische Lagergebäude" }
            ]
          },
          {
            label: "7330 - Siloanlagen",
            children: [
              { label: "7331 - Futter- und Getreidesilos" },
              { label: "7332 - Streugutsilos" },
              { label: "7333 - Offene Fahrsilos" },
              { label: "7334 - Güllebehälter" }
            ]
          },
          { label: "7340 - Kühlhäuser" },
          {
            label: "7350 - Brennstoff- / Betriebsstofflagergebäude",
            children: [
              { label: "7351 - Feste Brennstoffe" },
              { label: "7352 - Flüssige Brennstoffe" },
              { label: "7353 - Gasförmige Brennstoffe" }
            ]
          },
          { label: "7360 - Gefahrstofflagergebäude" },
          { label: "7370 - Munitionslagergebäude" }
        ]
      },
      {
        label: "7400 - Verkaufsstätten",
        children: [
          { label: "7410 - Kioske" },
          { label: "7420 - Einzelhandel" },
          { label: "7430 - Großhandelsgebäude" }
        ]
      },
      {
        label: "7500 - Werkstätten",
        children: [
          { label: "7510 - Allgemeine Werkstätten" },
          { label: "7520 - Allgemeine Werkstätten mit Zusatzfunktion" },
          {
            label:
              "7530 - Gebäude zur Wartung, Instandsetzung u. Reparatur für",
            children: [
              {
                label:
                  "7531 - Gebäude zur Wartung, Instandsetzung u. Reparatur für KFZ"
              },
              {
                label:
                  "7532 - Gebäude zur Wartung, Instandsetzung u. Reparatur für  Flugzeuge / Hubschrauber"
              },
              {
                label:
                  "7533 - Gebäude zur Wartung, Instandsetzung u. Reparatur für  Schienenfahrzeuge"
              },
              {
                label:
                  "7534 - Gebäude zur Wartung, Instandsetzung u. Reparatur für  Kettenfahrzeuge"
              },
              {
                label:
                  "7535 - Gebäude zur Wartung, Instandsetzung u. Reparatur für  Wasserfahrzeuge"
              },
              {
                label:
                  "7536 - Gebäude zur Wartung, Instandsetzung u. Reparatur für  Waffen"
              },
              {
                label:
                  "7537 - Gebäude zur Wartung, Instandsetzung u. Reparatur für Sonstige Kleingeräte"
              }
            ]
          },
          { label: "7540 - Kfz.-Werkstätten mit Garage und Lagerung" }
        ]
      },
      {
        label: "7600 - Gebäude zur Pflege / zum Abstellen von Fahrzeugen",
        children: [
          {
            label: "7610 - Pflege- und Waschhallen",
            children: [
              { label: "7611 - Pflege- und Waschhallen für KFZ" },
              {
                label:
                  "7612 - Pflege- und Waschhallen für Flugzeuge / Hubschrauber"
              },
              { label: "7613 - Pflege- und Waschhallen für Schienenfahrzeuge" },
              { label: "7614 - Pflege- und Waschhallen für Kettenfahrzeuge" },
              { label: "7615 - Pflege- und Waschhallen für Wasserfahrzeuge" }
            ]
          },
          { label: "7620 - Kfz.-Pflege- und Waschhallen mit Zusatzfunktion" },
          { label: "7630 - KFZ- Prüfanlagen" },
          {
            label: "7640 - Garagen und Parkbauten",
            children: [
              { label: "7641 - PKW-Garagen" },
              { label: "7642 - KFZ-Garagen" },
              {
                label: "7643 - Parkpaletten ohne UG, Überdachte Abstellplätze"
              },
              { label: "7644 - Parkhäuser" },
              { label: "7645 - Tiefgaragen" }
            ]
          },
          {
            label: "7650 - Hallen für sonstige Verkehrsmittel",
            children: [
              { label: "7651 - Flugzeuge / Hubschrauber" },
              { label: "7652 - Schienenfahrzeuge" },
              { label: "7653 - Wasserfahrzeuge" },
              { label: "7654 - Landwirtschaftliche Maschinen" }
            ]
          },
          { label: "7660 - Fahrradparkhäuser", children: [] }
        ]
      },
      {
        label: "7700 - Gesamtanlage für öffentl. Bereitschaftsdienste",
        children: [
          { label: "7710 - Straßenmeistereien" },
          { label: "7720 - Flussmeistereien" },
          { label: "7730 - Hafenmeistereien" },
          { label: "7740 - Bauhöfe" },
          { label: "7750 - Fuhrparks" },
          { label: "7760 - Feuerwehren / Rettungswachen" },
          { label: "7770 - THW-Höfe" },
          { label: "7780 - Katastrophenschutzzentren" }
        ]
      },
      {
        label:
          "7800 - Zentrale Wirtschaftsgebäude / Zentr. Ver- u. Entsorgung (z.B. Krankenhäuser, Bundeswehr, Polizei)",
        children: [
          { label: "7810 - Zentrale Wirtschaftsgebäude (mehrere Funktionen)" },
          { label: "7820 - Zentralapotheken" },
          { label: "7830 - Zentralküchen" },
          { label: "7840 - Zentralwäschereien" },
          { label: "7850 - Zentrale Materialgutversorgung / Logistik" },
          { label: "7860 - Zentralsterilisation" }
        ]
      },
      { label: "7900 - Gründer- und Technologiezentren" }
    ]
  },
  {
    label: "8000 - Technik",
    children: [
      {
        label: "8100 - Kraftwerke (Gesamtanl. f. Energieversorgung)",
        children: [
          { label: "8110 - Kohlekraftwerke" },
          { label: "8120 - Ölkraftwerke" },
          { label: "8130 - Gaskraftwerke" },
          { label: "8140 - Wasserkraftwerke" },
          { label: "8150 - Solarkraftwerke" },
          { label: "8160 - Windkraftwerke" },
          { label: "8170 - Biogaskraftwerke" },
          { label: "8180 - Bauwerke für Wärmerückgewinnung" }
        ]
      },
      {
        label:
          "8200 - Bauwerke f. Lenkung, Steuerung, Überwachung und Nachrichtenübermittlung",
        children: [
          {
            label:
              "8210 - Betriebsgebäude für technische öffentl. Einrichtungen"
          },
          { label: "8220 - Funkstationen" },
          { label: "8230 - Vermittlungsgebäude, Kabelhäuser" },
          { label: "8240 - Stellwerke" },
          { label: "8250 - Wetterstationen, Wetterwarten, Sturmwarnanlagen" },
          { label: "8260 - Waagehäuser" },
          { label: "8270 - Pförtnerhäuser" },
          { label: "8280 - Turmartige Gebäude" }
        ]
      },
      {
        label:
          "8300 - Bauwerke für Versorgung mit elektrischer Energie, Wärme, Kälte, Gas und Öl",
        children: [
          { label: "8310 - Heizzentralen" },
          { label: "8320 - Trafostationen" },
          { label: "8330 - Turbinenhäuser" },
          { label: "8340 - Verteilerhäuser" },
          { label: "8350 - Ladestationen" },
          { label: "8360 - Akkumulatorenhäuser" },
          { label: "8370 - Gasstationen" },
          { label: "8380 - Tankstellen" }
        ]
      },
      {
        label: "8400 - Bauwerke und Anlagen für die Versorgung mit Wasser",
        children: [
          { label: "8410 - Brunnenhäuser" },
          { label: "8420 - Tränkanlagen" },
          { label: "8430 - Wasserhochbehälter" },
          { label: "8440 - Wasserversorgungsanlagen" },
          { label: "8450 - Löschwasserbehälter" },
          { label: "8460 - Wasserbehälter unterirdisch" },
          { label: "8470 - Pumpstationen (Frischwasser)" }
        ]
      },
      {
        label:
          "8500 - Bauwerke und Anlagen für die Abwasserbehandlung (Schmutz- u. Regenwasser)",
        children: [
          { label: "8510 - Abwasseranlagen" },
          { label: "8520 - Pumpstationen (Abwasser)" },
          { label: "8530 - Kläranlagen" }
        ]
      },
      {
        label: "8600 - Bauwerke für die Abfallbehandlung",
        children: [
          { label: "8610 - Müllverbrennungsanlagen" },
          { label: "8620 - Abfallbunker, Müllhäuser, Recyclinghöfe" },
          { label: "8630 - Müllaufbereitungsanlagen" },
          { label: "8640 - Sondermüllbehandlung" }
        ]
      }
    ]
  },
  {
    label: "9000 - Sonstiges und Ausland",
    children: [
      {
        label: "9100 - Gebäude für Verkehrsanlagen",
        children: [
          { label: "9110 - Flughafengebäude" },
          { label: "9120 - Bahnhofsgebäude" },
          { label: "9130 - Busbahnhofsgebäude" },
          { label: "9140 - Autobahnraststätten" },
          { label: "9150 - Schiffterminals" }
        ]
      },
      {
        label: "9200 - Wachgebäude",
        children: [
          { label: "9210 - Torwachen, Wachgebäude" },
          { label: "9220 - Wachtürme" }
        ]
      },
      {
        label: "9300 - Friedhofsgebäude",
        children: [
          { label: "9310 - Aussegnungshallen" },
          { label: "9320 - Krematorien" },
          { label: "9330 - Leichenhäuser" },
          { label: "9340 - Urnenhäuser" }
        ]
      },
      {
        label: "9400 - Schutzbauwerke, Einfriedungen, Sonderbauwerke",
        children: [
          { label: "9410 - Befestigungsanlagen" },
          { label: "9420 - Bunker" },
          { label: "9430 - Umwehrungsmauern / -zäune z.B. JVA" },
          { label: "9440 - Lärmschutzwälle / -wände" },
          { label: "9450 - Zaunanlagen" },
          { label: "9460 - Leitungskanäle / Unterirdische Verbindungsbauten" }
        ]
      },
      {
        label: "9500 - Bauwerke in Außenanlagen",
        children: [
          { label: "9510 - Baukonstruktionen in Außenanlagen" },
          { label: "9511 - Brücken" },
          { label: "9520 - WC- Anlagen" }
        ]
      },
      {
        label: "9600 - Wasserbauten, Hafenanlagen",
        children: [
          { label: "9610 - Schiffsstege" },
          { label: "9620 - Schleusen" },
          { label: "9630 - Kaianlagen" },
          { label: "9640 - Hochwasserschutzanlagen" },
          { label: "9650 - Trockendock" },
          { label: "9660 - Schwimmdock" }
        ]
      },
      {
        label: "9700 - Zivile Gebäude im Ausland",
        children: [
          {
            label:
              "9710 - Auslandsvertretungen des AA (Botschaften, Generalkonsulate, Bo.-Außenstellen)",
            children: [
              {
                label:
                  "9711 - Kanzlei/Generalkonsulate (mit RK-/Visastelle) u. Residenz"
              },
              { label: "9712 - Kanzlei/Generalkonsulate (mit RK-/Visastelle)" },
              { label: "9713 - RK-/Visastelle - separat von Kanzlei" }
            ]
          },
          { label: "9720 - Deutsche Forschungs-Institutionen im Ausland" },
          { label: "9730 - Auslandsschulen" },
          { label: "9740 - Kindergärten im Ausland" },
          { label: "9750 - Bildungseinrichtungen für Erwachsene im Ausland" },
          {
            label: "9760 - Dienstwohnungen / Residenz (Gebäude) im Ausland",
            children: [
              { label: "9761 - Dienstwohnungen / Residenz (B6)" },
              { label: "9762 - Dienstwohnungen / Residenz (B3)" },
              { label: "9763 - Dienstwohnungen allgemein" }
            ]
          },
          {
            label: "9770 - Außenwache (bei Auslandsvertretungen des AA)",
            children: [
              { label: "9771 - Außenwache mit KFZ-Schleusen-Anlage" },
              { label: "9772 - Außenwache ohne KFZ-Schleusen-Anlage" }
            ]
          }
        ]
      },
      {
        label: "9800 - Gebäude der Bundeswehr im Ausland",
        children: [
          { label: "9810 - Gebäude mit büroartiger Nutzung" },
          { label: "9820 - Gebäude für wissenschaftliche Lehre und Forschung" },
          { label: "9830 - Gebäude des Gesundheitswesens" },
          { label: "9840 - Gebäude für Bildung und Kultur" },
          { label: "9850 - Sportbauten" },
          { label: "9860 - Wohnen, Beherbergen, Pflegen" },
          {
            label: "9870 - Gebäude für Lagerung, Verteilung, Wartung und Pflege"
          },
          { label: "9880 - Bauwerke für technische Zwecke" },
          { label: "9890 - sonstige Gebäude" }
        ]
      }
    ]
  }
];

module.exports = BauwerksZuordnungenHierachisch; // NEU
// ACHTUNG: Mit
// export default BauwerksZuordnungenHierarchisch
// kommt Fehler "SyntaxError: Unexpected token export"!!!
