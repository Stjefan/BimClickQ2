<!-- DONE: neueBaueigenschaft überall umbenannt in neueOderAusgewaehlteBaueigenschaft -->
<!-- ausgewaehlteBaueigenschaft wurde vorher bereits umbenannt in neueBaueigenschaft, um Einheitlichkeit zu erreichen! -->

<template>
  <!-- ALT: style="min-width: 1000px" -->
  <q-form class="q-pa-none" v-if="neueOderAusgewaehlteBaueigenschaft">
    <div v-if="localStore.state.debugMode">
      neueOderAusgewaehlteBaueigenschaft:
      {{ neueOderAusgewaehlteBaueigenschaft }}
    </div>
    <div v-if="$q.screen.gt.sm">
      <div v-if="modus == 'Neuanlage'" class="text-h6 q-pb-sm">
        Neuanlage einer Baueigenschaft
      </div>
      <div v-else class="text-h6 q-pb-sm">
        Details zur ausgewählten Baueigenschaft
        <strong
          >"{{
            neueOderAusgewaehlteBaueigenschaft.baueigenschaftsBezeichnung
          }}"</strong
        >
      </div>
    </div>
    <div v-else>
      <div v-if="modus == 'Neuanlage'" class="text-subtitle1 q-pb-sm">
        Neuanlage einer Baueigenschaft
      </div>
      <div v-else class="text-subtitle1 q-pb-sm">
        Details zur ausgewählten Baueigenschaft
        <strong
          >"{{
            neueOderAusgewaehlteBaueigenschaft.baueigenschaftsBezeichnung
          }}"</strong
        >
      </div>
    </div>
    <!-- <br /> -->
    <div class="row q-pa-xs q-col-gutter-xs inset-shadow">
      <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
      <!-- ------------------------------------------------------------------------------------------ -->
      <!-- 1. Spalte: -->
      <div class="col-md-3 col-12">
        <div>
          <b>Typbezogene Angaben zur Baueigenschaft (systemweit gültig)</b>
        </div>
        <br />
        <div>
          <b>Festlegung der Bezeichnung der Baueigenschaft</b>
        </div>
        <div>
          <!-- Erstes q-input hat Testcode zur Nutzung von rules: -->
          <q-input
            :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="
              neueOderAusgewaehlteBaueigenschaft.baueigenschaftsBezeichnung
            "
            lazy-rules
            :rules="[
              v => (v !== null && v !== '') || 'Bezeichnung ist erforderlich',
              v =>
                (v && v.length <= 200) ||
                'Bezeichnung darf höchstens 200 Zeichen lang sein'
            ]"
            label="Bezeichnung"
            hint="Eindeutige Bezeichnung für die Baueigenschaft"
            hide-hint
          />
        </div>
        <div>
          <b>Weitere typbezogene Angaben zur Baueigenschaft</b>
        </div>
        <div>
          <!-- ============================================================================================= -->
          <!-- NEU: #514/515 - q-input-Feld für baueigenschaftsAnzeigeText -->
          <q-input
            :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="
              neueOderAusgewaehlteBaueigenschaft.baueigenschaftsAnzeigeText
            "
            label="Anzeigetext"
            hint="Anzeigetext für die Baueigenschaft, z.B. 'Schallschutzklasse'"
            hide-hint
          />
          <!-- ============================================================================================= -->
          <q-input
            :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="
              neueOderAusgewaehlteBaueigenschaft.baueigenschaftsBemerkung
            "
            label="Bemerkung"
            hint="Bemerkung für die Baueigenschaft, z.B. 'Neu angelegt für Türen'"
            hide-hint
            autogrow
          />
        </div>
        <div>
          <q-select
            :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            input-class="text-white"
            filled
            dense
            v-model="neueOderAusgewaehlteBaueigenschaft.bauinformation"
            :options="
              selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft
            "
            option-value="bauinformationsBezeichnung"
            :multiple="false"
            label="Zugeordnete Bauinformation auswählen/abwählen"
            stack-label
            use-chips
            options-selected-class="text-primary"
            options-dense
            use-input
            input-debounce="0"
            @new-value="
              createSelectValueBauinformationenNeueOderAusgewaehlteBaueigenschaft
            "
            @filter="
              selectFilterFunctionBauinformationenNeueOderAusgewaehlteBaueigenschaft
            "
            bottom-slots
            @focus="
              showHintSelectBauinformationenNeueOderAusgewaehlteBaueigenschaft = true
            "
            @blur="
              showHintSelectBauinformationenNeueOderAusgewaehlteBaueigenschaft = false
            "
          >
            <!-- TODO: style="width: 720px" -->
            <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
            <template v-slot:append>
              <q-icon name="search" @click.stop />
              <!-- Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
              <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
              <!-- ALT: Am folgenden template v-if="selectModelBauinformationNeueOderAusgewaehlteBaueigenschaft" -->
              <!-- ACHTUNG: Da selectModelBauinformationNeueOderAusgewaehlteBaueigenschaft ein Objekt, kein Array ist, -->
              <!-- muss es auf null oder {} resetted werden, nicht auf [] -->
              <q-icon
                name="cancel"
                class="cursor-pointer"
                color="primary"
                @click.stop="
                  neueOderAusgewaehlteBaueigenschaft.bauinformation = null
                "
              />
            </template>
            <template
              v-slot:hint
              v-if="
                showHintSelectBauinformationenNeueOderAusgewaehlteBaueigenschaft
              "
            >
              <ul class="q-pl-xs">
                <li>
                  <strong>Filtern:</strong> Eine Bauinformationsbezeichnung
                  (z.B. "Norm > DIN > EN > 13164") oder einen
                  Bauinformationsanzeigetext (z.B. "Datenblatt") als Filtertext
                  in das Eingabefeld eingeben. Auch unvollständige Angaben (z.B.
                  "Datenbl") sind möglich. Dies filtert die im Dropdown-Menü
                  angezeigten Optionen.
                </li>
                <li>
                  <strong>Auswählen:</strong> Eine der Baueigenschaft
                  zugeordnete Bauinformation im Dropdown-Menü auswählen.
                </li>
                <li>
                  <strong>Abwählen:</strong> Die ausgewählte Bauinformation kann
                  mit <q-icon name="cancel" color="primary" />&nbsp;abgewählt
                  werden.
                </li>
                <li>
                  <strong>Speichern:</strong> Unten Schaltfläche "Speichern"
                  drücken.
                </li>
              </ul>
              <!-- <br /> <br /> <br /> -->
              <!-- TODO: Um vertikalen Scrollbalken zu verhindern, funktioniert nicht -->
            </template>
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                dense
                @remove="scope.removeAtIndex(scope.index)"
                :tabindex="scope.tabindex"
                color="primary"
                text-color="white"
                class="q-ma-xs shadow-4"
              >
                <!-- ALT: -->
                <!-- {{ scope.opt.bauinformationsBezeichnung }} -->
                <!-- NEU: Long Label Truncation, mit Tooltip der vollen Bezeichnung, mittels spezieller CSS Class "ellipsis": -->
                <!-- Damit Truncation für lange Texte an QChip - Vorlage: https://quasar.dev/vue-components/chip#Example--Long-label-truncation -->
                <div class="ellipsis">
                  {{ scope.opt.bauinformationsBezeichnung }}
                  <q-tooltip
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                    >{{ scope.opt.bauinformationsBezeichnung }}</q-tooltip
                  >
                </div>
                <!-- <q-avatar color="secondary" text-color="white" :icon="scope.opt.icon" /> -->
                <!-- scope.opt.bauinformationsBezeichnung -->
              </q-chip>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.bauinformationsBezeichnung" />
                  <!-- ALT: scope.opt.bauinformationsTyp -->
                  <q-item-label caption>{{
                    scope.opt.bauinformationsAnzeigeText
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <!-- /q-select für Referenz auf Bauinformation -->
          <!-- Platz für Hint schaffen: -->
          <br />
          <br />
          <br />
          <br />
          <br />
          <!-- =================================================================== -->
          <!-- NEU: #514/515: -->
          <div class="row q-col-gutter-xs inset-shadow">
            <b>Typbezogene Merkmale der Baueigenschaft</b>
          </div>
          <!-- ------------------------------------------------------------------- -->
          <div class="text-caption">
            <div class="row full-width q-pa-xs">
              <div class="col-6">
                <q-toggle
                  dense
                  v-model="
                    neueOderAusgewaehlteBaueigenschaft.systemdefiniertNichtBenutzerdefiniert
                  "
                  label="Ist im System vordefiniert, nicht benutzerdefiniert"
                />
              </div>
              <div class="col-6">
                <q-toggle
                  dense
                  v-model="
                    neueOderAusgewaehlteBaueigenschaft.sollwertNichtIstwert
                  "
                  label="Definiert Sollwerte, nicht Istwerte"
                />
              </div>
            </div>
          </div>
          <!-- =================================================================== -->
          <!-- ALT - ohne QExpansionItem: -->
          <!--
          <div class="row q-col-gutter-xs inset-shadow">
            <b
              >Zuordnung der Baueigenschaft zu
              fachlichen Rubriken</b
            >
          </div>
          -->
          <!-- ------------------------- -->
          <!-- NEU - mit QExpansionItem: -->
          <br />
          <q-expansion-item
            expand-separator
            :default-opened="false"
            dense
            header-class="bg-white text-bold inset-shadow q-gutter-xs"
            label="Zuordnung zu fachlichen Rubriken"
          >
             <!-- -------------------------------------------------------------------------------------- -->
            <div class="text-caption">
              <!-- NEU - #401: -->
              <!--
              neueOderAusgewaehlteBaueigenschaft
                .fachlicheKategorien:
              {{
                neueOderAusgewaehlteBaueigenschaft
                  .fachlicheKategorien
              }}
              -->
              <div
                class="row full-width q-pa-xs"
                v-for="kategorie in optionsFachlicheKategorienBaueigenschaften"
                :key="kategorie.ueberschriftKategorie"
              >
                <div class="col-5">
                  <b
                    >{{ kategorie.ueberschriftKategorie }}
                  </b>
                </div>
                <div class="col-7">
                  <q-option-group
                    type="checkbox"
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft
                        .fachlicheKategorien
                    "
                    :options="kategorie.optionsKategorie"
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                  >
                  </q-option-group>
                </div>
                <q-separator class="row full-width" />
              </div>
            </div>
            <!-- -------------------------------------------------------------------------------------- -->
            <!-- #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled: -->
            <!-- NEU - #515: -->
            <!--
            <div class="text-caption">
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.projektManagement
                    "
                    label="Projektsteuerung"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.recht"
                    label="Recht"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.geografie"
                    label="Geografie"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.geoPolitik"
                    label="Geopolitik"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.infrastruktur"
                    label="Infrastruktur"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.umweltUndKlima"
                    label="Umwelt und Klima"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.hydroGeologie"
                    label="Hydrogeologie"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.geometrie"
                    label="Geometrie"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.konstruktion"
                    label="Konstruktion"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.lastAnnahmen"
                    label="Lastannahmen"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.nutzungsUndBetriebsZeiten
                    "
                    label="Nutzungs- und Betriebszeiten"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.raumKlima"
                    label="Raumklima"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.beleuchtung"
                    label="Beleuchtung"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.schallSchutz"
                    label="Schallschutz"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.raumAkustik"
                    label="Raumakustik"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.wärmeSchutz"
                    label="Wärmeschutz"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.energieEinsparung
                    "
                    label="Energieeinsparung"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.standSicherheit"
                    label="Standsicherheit"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.gebrauchsTauglichkeit
                    "
                    label="Gebrauchstauglichkeit"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.verkehrsSicherheit
                    "
                    label="Verkehrssicherheit"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.barriereFreiheit
                    "
                    label="Barrierefreiheit"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.brandSchutz"
                    label="Brandschutz"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.feuchteSchutz"
                    label="Feuchteschutz"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.korrosionsSchutz
                    "
                    label="Korrosionsschutz"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.abdichtungsTechnik
                    "
                    label="Abdichtungstechnik"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.chemischerHolzSchutz
                    "
                    label="Holzschutz"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.gesundheitUndHygiene
                    "
                    label="Gesundheit und Hygiene"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.schadstoffSchutz
                    "
                    label="Schadstoffschutz"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.umweltVerträglichkeit
                    "
                    label="Umweltverträglichkeit"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.ökoBilanz"
                    label="Ökobilanz"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.nachhaltigkeit"
                    label="Nachhaltigkeit"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.materialEigenschaften
                    "
                    label="Materialeigenschaften"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="neueOderAusgewaehlteBaueigenschaft.sonstiges"
                    label="Sonstiges"
                  />
                </div>
              </div>
              <q-separator />
              <div class="row full-width q-pa-xs">
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.baueigenschaftsProfile
                    "
                    label="Baueigenschaftsprofile"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="
                      !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                    "
                    dense
                    v-model="
                      neueOderAusgewaehlteBaueigenschaft.bauinformationsProfile
                    "
                    label="Bauinformationsprofile"
                  />
                </div>
              </div>
              <q-separator />
            </div>
            -->
          </q-expansion-item>
        </div>
        <!-- ------------------------------------------------------------------- -->
      </div>
      <!-- /1. Spalte -->
      <!-- ------------------------------------------------------------------------------------------ -->
      <!-- 2. Spalte: -->
      <div class="col-md-3 col-12">
        <div>
          <b>Angaben zum Wertetyp der Baueigenschaft (systemweit gültig)</b>
        </div>
        <br />
        <div>
          <b>Festlegung des Wertetyps</b>
        </div>
        <div>
          <q-select
            :disable="
              disableWerteTypQSelect ||
                !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
            "
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            input-class="text-white"
            dense
            v-model="neueOderAusgewaehlteBaueigenschaft.werteTyp"
            label="Wertetyp"
            hint="Auszuwählender Typ für die Werte der Eigenschaft, z.B. 'Datumswert'"
            hide-hint
            :options="optionsWertetypBaueigenschaft"
            options-dense
          />
        </div>
        <div>
          <b>Angaben zum Wertetyp "Kennwert"/"Kennwertepaar"</b>
        </div>
        <div>
          <div class="q-col-gutter-xs">
            <q-input
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="neueOderAusgewaehlteBaueigenschaft.symbol"
              label="Symbol (Markdown-Format)"
              hint="Symbol, z.B. 'λ'"
              hide-hint
              :disable="
                disabledFieldsNeueOderAusgewaehlteBaueigenschaft ||
                  !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
              "
            />
          </div>
          <div class="row full-width q-col-gutter-xs">
            <div class="col-4">
              <small>Formatiertes Symbol:</small>
            </div>
            <div class="col-8">
              <q-markdown
                :src="neueOderAusgewaehlteBaueigenschaft.symbol"
                :no-blockquote="true"
                :no-abbreviation="true"
                :no-breaks="true"
                :no-container="true"
                :no-deflist="true"
                :no-footnote="true"
                :no-highlight="true"
                :no-image="true"
                :no-insert="true"
                :no-line-numbers="true"
                :no-link="true"
                :no-linkify="true"
                :no-tasklist="true"
                :no-typographer="true"
              ></q-markdown>
            </div>
          </div>
          <br />
          <div class="q-col-gutter-xs">
            <q-input
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="neueOderAusgewaehlteBaueigenschaft.einheit"
              label="Einheit (Markdown-Format)"
              hint="Einheit, z.B. 'W/(mK)'"
              hide-hint
              :disable="
                disabledFieldsNeueOderAusgewaehlteBaueigenschaft ||
                  !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
              "
            />
          </div>
          <div class="row full-width q-col-gutter-xs">
            <br />
            <div class="col-4">
              <small>Formatierte Einheit:</small>
            </div>
            <div class="col-8">
              <q-markdown
                :src="neueOderAusgewaehlteBaueigenschaft.einheit"
                :no-blockquote="true"
                :no-abbreviation="true"
                :no-breaks="true"
                :no-container="true"
                :no-deflist="true"
                :no-footnote="true"
                :no-highlight="true"
                :no-image="true"
                :no-insert="true"
                :no-line-numbers="true"
                :no-link="true"
                :no-linkify="true"
                :no-tasklist="true"
                :no-typographer="true"
              ></q-markdown>
            </div>
          </div>
          <br />
          <!-- --------------------------------------------------------------------------------------- -->
          <!-- NEU: #514, Operator in typbezogenen Feldern wird nicht mehr unterstützt, daher disabled -->
          <!--
            <div class="q-col-gutter-xs">
              <q-input
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                dense
                v-model="neueOderAusgewaehlteBaueigenschaft.operator"
                label="Operator (Markdown-Format)"
                hint="Operator, z.B. '<' oder '≤'"
                hide-hint
                :disable="
                  disabledFieldsNeueOderAusgewaehlteBaueigenschaft ||
                    !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
                "
              />
            </div>
            <div class="row full-width q-col-gutter-xs">
              <div class="col-4">
                <small>Formatierter Operator:</small>
              </div>
              <div class="col-8">
                <q-markdown
                  :src="neueOderAusgewaehlteBaueigenschaft.operator"
                  :no-blockquote="true"
                  :no-abbreviation="true"
                  :no-breaks="true"
                  :no-container="true"
                  :no-deflist="true"
                  :no-footnote="true"
                  :no-highlight="true"
                  :no-image="true"
                  :no-insert="true"
                  :no-line-numbers="true"
                  :no-link="true"
                  :no-linkify="true"
                  :no-tasklist="true"
                  :no-typographer="true"
                ></q-markdown>
              </div>
            </div>
            <br />
            -->
          <!-- --------------------------------------------------------------------------------------- -->
          <div class="q-col-gutter-xs">
            <q-input
              autogrow
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="neueOderAusgewaehlteBaueigenschaft.formel"
              label="Formel (Markdown-Format)"
              :hint="hintFuerFormelMitSonderzeichen"
              hide-hint
              :disable="
                disabledFieldsNeueOderAusgewaehlteBaueigenschaft ||
                  !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
              "
            />
          </div>
          <div class="row full-width q-col-gutter-xs">
            <div class="col-4">
              <small>Formatierte Formel:</small>
            </div>
            <div class="col-8">
              <q-markdown
                :src="neueOderAusgewaehlteBaueigenschaft.formel"
                :no-blockquote="true"
                :no-abbreviation="true"
                :no-breaks="true"
                :no-container="true"
                :no-deflist="true"
                :no-footnote="true"
                :no-highlight="true"
                :no-image="true"
                :no-insert="true"
                :no-line-numbers="true"
                :no-link="true"
                :no-linkify="true"
                :no-tasklist="true"
                :no-typographer="true"
              ></q-markdown>
            </div>
          </div>
          <br />
          <!-- NEU: q-select zur Auswahl von Sonderzeichen -->
          <b>Sonderzeichen im Markdown-Format in obige Felder einfügen:</b>
          <div class="text-caption">
            Im folgenden Dropdown-Menü ein Sonderzeichen auswählen. Dabei wird
            dessen-Formatierung in die Zwischenablage kopiert. Diese mit Strg+V
            an der gewünschten Cursorposition in obige Felder einfügen.
          </div>
          <q-select
            square
            dense
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            input-class="text-white"
            filled
            options-dense
            :multiple="false"
            v-model="selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft"
            :options="selectOptionsSonderzeichen"
            stack-label
            label="Sonderzeichen - per Dropdown-Menü (rechts) auswählen"
            :display-value="
              `${
                selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft
                  ? selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft.label
                  : 'Kein Sonderzeichen ausgewählt'
              }`
            "
            :display-value-sanitize="false"
            @input="
              copyToClipboardSonderzeichenNeueOderAusgewaehlteBaueigenschaft(
                selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft.value
              )
            "
            :disable="
              disabledFieldsNeueOderAusgewaehlteBaueigenschaft ||
                !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
            "
          >
            <template v-slot:append>
              <q-icon
                v-if="
                  selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft !=
                    null
                "
                class="cursor-pointer"
                name="clear"
                @click.stop="
                  selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft = null
                "
              ></q-icon>
            </template>
          </q-select>
          <!-- Selbstgemachter Hint unter dem q-select: -->
          <div
            v-if="
              copyToClipboardDoneSonderzeichenNeueOderAusgewaehlteBaueigenschaft
            "
            class="text-caption"
          >
            Die Formatierung für das ausgewählte Sonderzeichen mit Strg+V in
            passende obige Markdown-Felder einfügen
          </div>
          <!-- Ende neuer Code für symbol, einheit, operator, formel als Markdown -->
          <!-- ========================================================================================================================= -->
          <div>
            <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
            <br />
            <!-- <br /> -->
            <b>Angaben zum Wertetyp 'Aufzählungswert'</b>
            <!-- <br /> -->
            <!-- Reserviert für die Definition der selektierbaren Optionen für den Wertetyp 'Aufzählungswert' (TBD) -->
            <!-- ======================================================================================================================= -->
            <!-- ACHTUNG: Hier können im Tab "Details zur ausgewählten Baueigenschaft offenbar im Tab "Neuanlage" angelegte Optionen -->
            <!-- für einen Aufzählungswert auch wieder GEÄNDERT werden!!! -->
            <!-- ACHTUNG: Dazu läuft das folgende QSelect in beiden Fällen im "New Value Mode", d.h. bei "Neuanlage" UND "Bearbeitung!!! -->
            <!-- Per Test funktioniert es auch!!! -->
            <!-- HINWEIS: Die Filter-Funktion filter dabei die angezeigten Optionen im Dropdown-Menü! -->
            <!-- ACHTUNG: Das v-model ist hier neueOderAusgewaehlteBaueigenschaft.selektierbareOptionenAufzaehlungsWert (typbezogen)! -->
            <!-- ======================================================================================================================= -->
            <q-select
              square
              dense
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              input-class="text-white"
              filled
              v-model="
                neueOderAusgewaehlteBaueigenschaft.selektierbareOptionenAufzaehlungsWert
              "
              :options="
                selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
              "
              @filter="
                selectFilterFunctionAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
              "
              @new-value="
                createSelectValueAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
              "
              :multiple="true"
              :label="
                computeLabelAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
              "
              stack-label
              use-chips
              options-selected-class="text-primary"
              options-dense
              use-input
              input-debounce="0"
              bottom-slots
              @focus="
                showHintSelectAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = true
              "
              @blur="
                showHintSelectAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = false
              "
              :disable="
                disableAufzaehlungswertQSelect ||
                  !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
              "
            >
              <!-- TODO: style="width: 720px" -->
              <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
              <template v-slot:append>
                <!-- Icon für den Filter auf im Dropdown-Menü angezeigten Options: -->
                <q-icon name="search" @click.stop />
                <q-icon
                  name="cancel"
                  @click.stop="
                    neueOderAusgewaehlteBaueigenschaft.selektierbareOptionenAufzaehlungsWert = []
                  "
                  class="cursor-pointer"
                  color="primary"
                />
                <!-- ACHTUNG: TODO - Muss oben leerer Array sein???  -->
              </template>
              <template
                v-slot:hint
                v-if="
                  showHintSelectAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
                "
              >
                <ul class="q-pl-xs">
                  <li>
                    <strong>Hinzufügen</strong> von möglichen Optionen für den
                    Aufzählungswert: Die gewünschte Bezeichnung für eine Option
                    in das Eingabefeld eingeben und durch Drücken der
                    Eingabetaste zur Liste der Optionen hinzufügen.
                    <!-- Beispiele:
                      "xs", "s", "m", "l", "xl", "xxl" (jeweils mittels
                      Eingabetaste zur Liste der Optionen hinzufügen)
                      -->
                  </li>
                  <li>
                    <strong>Filtern:</strong> Einen Filtertext in das
                    Eingabefeld eingeben. Auch unvollständige Angaben sind
                    möglich. Dies filtert die im Dropdown-Menü angezeigten
                    Optionen.
                  </li>
                  <li>
                    <strong>Abwählen:</strong> Zur Liste der Optionen
                    hinzugefügte Optionen können mit
                    <q-icon name="cancel" color="primary" />&nbsp;abgewählt
                    werden.
                  </li>
                  <li>
                    <strong>Auswählen:</strong>
                    Bereits abgewählte Optionen verbleiben im Dropdown-Menü und
                    können dort erneut ausgewählt werden
                  </li>
                  <!--
                    <li>
                      Zum
                      <strong>Speichern:</strong> Unten Schaltfläche
                      "Baueigenschaft speichern" drücken.
                    </li>
                    -->
                </ul>
              </template>
              <!-- Es folgt der v-slot zur Anzeige des q-chips für eine ausgewählte Option: -->
              <template v-slot:selected-item="scope">
                <!-- <div v-if="localStore.state.debugMode"> -->
                <!--   scope: {{scope}} -->
                <!-- </div> -->
                <!-- scope ist hier ein Objekt, das einen selektierten Optionswert repräsentiert, welcher per q-chip angezeigt wird -->
                <!-- Dieses besteht aus den Feldern scope.index, .opt, .sanitize, .selected und .tabindex -->
                <q-chip
                  removable
                  dense
                  @remove="scope.removeAtIndex(scope.index)"
                  :tabindex="scope.tabindex"
                  color="primary"
                  text-color="white"
                  class="q-ma-xs shadow-4"
                >
                  <!-- ALT: -->
                  <!-- {{ scope.opt }} -->
                  <!-- ACHTUNG - hier NICHT: scope.opt.benutzerKennung !!! -->
                  <!-- ACHTUNG: Bzgl. Sanitization wird hier für die Anzeige im q-chip kein v-html verwendet, sondern wie unten bei den Options nur Moustaches -->
                  <!-- NEU: Long Label Truncation, mit Tooltip der vollen Bezeichnung, mittels spezieller CSS Class "ellipsis": -->
                  <!-- Damit Truncation für lange Texte an QChip - Vorlage: https://quasar.dev/vue-components/chip#Example--Long-label-truncation -->
                  <div class="ellipsis">
                    {{ scope.opt }}
                    <q-tooltip
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                      >{{ scope.opt }}</q-tooltip
                    >
                  </div>
                </q-chip>
              </template>
              <!-- Es folgt der v-slot zur Anzeige der Options im Dropdown-Menü -->
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label>{{ scope.opt }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- Platz für Hint schaffen: -->
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <!-- /2. Spalte  -->
      <!-- 3. Spalte - NEU: Radio Buttons für Steuerung baumTyp bei Neuanlage (Epic 38.n) -->
      <div class="col-md-3 col-12" v-if="modus === 'Neuanlage'">
        <div>
          <b>In welchen Bäumen soll die Baueigenschaft neu angelegt werden?</b>
        </div>
        <br />
        <div v-if="false">
          <!-- Für Debugging -->
          neueOderAusgewaehlteBaueigenschaft.baumTyp:
          {{ neueOderAusgewaehlteBaueigenschaft.baumTyp }}
        </div>
        <q-option-group
          type="radio"
          v-model="neueOderAusgewaehlteBaueigenschaft.baumTyp"
          :options="optionsBaumTypNeuanlageBaueigenschaft"
          bg-color="teal-2"
          standout="bg-teal-4 text-black"
          square
          dense
        >
        </q-option-group>
        <br />
        <div>
          <b>Hinweise: </b>
          <ul>
            <li>
              Es erfolgt bei der Neuanlage der Baueigenschaft nach Drücken der Schaltfläche "Baueigenschaft speichern" noch
              <b>keine gleichzeitige Aktivierung</b> der Baueigenschaft am Wurzelknoten des Bauvorhaben- bzw. Baustoffbaums
            </li>
            <li>
              Eine anschließende <b>Aktivierung</b> und <b>Werteeingabe</b> für eine hier neu angelegte Baueigenschaft
              ist <b>nach deren Neuanlage</b> wie folgt möglich:
              <ul>
                <li>Die Schaltfläche 'Diese Seite neu laden' links oben im Browser drücken bzw. die Tastenkombination Strg + R im Browser oder der App eingeben</li>
                <li>Das Tab "Bauvorhaben" bzw. "Baustoffe" anwählen</li>
                <li>Den Wurzelknotens des betreffenden Baums auswählen</li>
                <li>Das Unter-Tab "Baueigenschaften an der Baueinheit" bzw. "Baueigenschaften am Baustoff" anwählen</li>
                <li>Im Unter-Tab "Übersicht aller Baueigenschaften" die hier neu angelegte Baueigenschaft auswählen und diese mit der Schaltfläche
                    "Baueigenschaft bearbeiten" oder dem entsprechenden Kontextmenü bearbeiten</li>
                <li>Im dortigen Unter-Tab "Details zur ausgewählten Baueigenschaft" kann dann
                    am ausgewählten Knoten im Bauvorhaben- bzw. Baustoffbaum für die ausgewählte Baueigenschaft die Aktivierung und Werteeingabe durchgeführt werden</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- /3. Spalte-->
    </div>
    <q-separator />
    <!-- Es folgen die Buttons unter dem q-form: -->
    <!-- NEU: type="submit" präventiv entfernt!!! -->
    <div class="row full-width q-pa-xs q-gutter-xs">
      <div class="col-md-3 col-12">
        <!-- ALT: style="width: 90%" -->
        <q-btn
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          class="stretch full-width"
          style="height:100%"
          color="positive"
          glossy
          label="Baueigenschaft speichern"
          no-caps
          @click="createNeueOderUpdateAusgewaehlteBaueigenschaft"
        />
      </div>
      <div class="col-md-3 col-12">
        <!-- ALT: style="width: 90%" -->
        <q-btn
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          class="stretch full-width"
          style="height:100%"
          color="deep-orange"
          glossy
          text-color="white"
          label="Eingaben zurücksetzen"
          @click="
            neueOderAusgewaehlteBaueigenschaft = baueigenschaftCreator(
              zuManipulierendeBaueigenschaft
            )
          "
          no-caps
        />
      </div>
      <!--
      <q-btn
        color="negative"
        glossy
        label="Löschen"
        no-caps
      />
      -->
    </div>
  </q-form>
</template>
//***===========================================================================================================================
<script>
//-------------------------------------------------------------------------------------------------------------------------------
// NEU - #401: Für q-option-group-basierende Anzeige der neuen fachlichen Kategorien/Rubriken von Baueigenschaften:
import OptionsFachlicheKategorienBaueigenschaften from "../modules/options-fachliche-kategorien-baueigenschaften";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Imports für Quasar Utilities
// Quasar Date Utils, siehe https://quasar.dev/quasar-utils/date-utils
// Quasar Copy to Clipboard, siehe https://quasar.dev/quasar-utils/other-utils#Copy-to-Clipboard
import { copyToClipboard } from "quasar";
//--------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  props: {
    modus: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return ["Bearbeitung", "Neuanlage"].includes(value);
      }
    },
    zuManipulierendeBaueigenschaft: {
      // (typbezogene) Baueigenschaft, flaches Objekt, außer bauinformation!?!
      type: Object,
      default: null
    },
    alleBauinformationen: {
      type: Array,
      default: () => [] // muss eine Funktion sein bei Arrays
    }
    //=============================================================================================================================================
    // ACHTUNG: Zusätzlich verwendet die Komponente 2 Events: Diese werden beim Aufruf jeweils an eine Funktion gebunden in der Elternkomponente!!!
    // @refreshRequest
    // @errorInComponent
    //=============================================================================================================================================
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      optionsFachlicheKategorienBaueigenschaften: OptionsFachlicheKategorienBaueigenschaften, // NEU - #401
      optionsBaumTypNeuanlageBaueigenschaft: [
        {
          label: "Im Bauvorhabenbaum",
          value: "Bauvorhabenbaum"
        },
        {
          label: "Im Baustoffbaum",
          value: "Baustoffbaum"
        },
        { label: "In beiden Bäumen", value: "Allgemein" }
      ],
      baumTypNeuanlageBaueigenschaft: "Bauvorhabenbaum",
      selectModelSonderzeichenNeueOderAusgewaehlteBaueigenschaft: null,
      selectOptionsSonderzeichen: require("../modules/select-options-sonderzeichen")
        .selectOptionsSonderzeichen, // NEU: Select Options aus separater Datei laden
      hintFuerFormelMitSonderzeichen:
        "Formel, z.B. 'a" +
        "\u2080" +
        " = 10" +
        "\u207B\u00B3" +
        "m/s" +
        "\u00B2" +
        "'",
      copyToClipboardDoneSonderzeichenNeueOderAusgewaehlteBaueigenschaft: false,
      disableWerteTypQSelect: this.modus === "Bearbeitung",
      selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: [],
      showHintSelectAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: false,
      showHintSelectBauinformationenNeueOderAusgewaehlteBaueigenschaft: false,
      selectModelAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: [],
      selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: [],
      selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft: this
        .alleBauinformationen,
      optionsBauinformationen: this.alleBauinformationen,
      optionsWertetypBaueigenschaft: [
        // Mögliche Optionen für den Wertetyp einer Baueigenschaft (für Dropdown-Menü)
        "Kennwert",
        "Kennwertepaar",
        "Datumswert",
        "Datumswertepaar",
        "Tageszeitwert", // NEU
        "Tageszeitwertepaar", // NEU
        "Bezeichnungswert",
        "Bezeichnungswertepaar",
        "Wahrheitswert",
        "Aufzählungswert"
      ],
      neueOderAusgewaehlteBaueigenschaft: this.baueigenschaftCreator(
        this.zuManipulierendeBaueigenschaft
      ),
      localStore: globalStore
    };
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    createSelectValueBauinformationenNeueOderAusgewaehlteBaueigenschaft(
      val,
      done
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectValueBauinformationenNeueOderAusgewaehlteBaueigenschaft für QSelect zur Auswahl von Bauinformationen
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      //--------------------------------------------------------------------------------------------------------------------
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      console.log(
        "In createSelectValueBauinformationenNeueOderAusgewaehlteBaueigenschaft(val, done) - val: ",
        val
      );
      if (val.length > 1) {
        if (
          !this.neueOderAusgewaehlteBaueigenschaft.bauinformation.bauinformationsBezeichnung.includes(
            val
          )
        ) {
          done(val, "toggle");
        }
      }
    },

    selectFilterFunctionBauinformationenNeueOderAusgewaehlteBaueigenschaft(
      val,
      update
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Auswahl von Bauinformationen
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung auf bauinformationsBezeichnung oder bauinformationsTyp,
      // ohne dass die durch den Filter erfassten Objekte automatisch zum Menü selbst (d.h. zum selectOptionsBauinformationen)
      // hinzugefügt werden
      //--------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionBauinformationenNeueOderAusgewaehlteBaueigenschaft(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft = this.optionsBauinformationen;
          console.log(
            "optionsBauinformationen: ",
            this.optionsBauinformationen
          );
          console.log(
            "selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
          //===============================================================================================================================
          this.selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft = this.optionsBauinformationen.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            v =>
              // ACHTUNG: Fix für #268, "!= null"-Abfrage erschlägt auch gleich den undefined-Fall!
              (v.bauinformationsBezeichnung != null &&
                v.bauinformationsBezeichnung.toLowerCase().indexOf(needle) >
                  -1) ||
              // v.bauinformationsTyp.toLowerCase().indexOf(needle) > -1 // ALT
              (v.bauinformationsAnzeigeText != null &&
                v.bauinformationsAnzeigeText.toLowerCase().indexOf(needle) > -1) // NEU
          );
          console.log(
            "selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsBauinformationenNeueOderAusgewaehlteBaueigenschaft
          );
        }
      });
    },

    createSelectValueAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft(
      val,
      done
    ) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectvalueAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft für QSelect zur Definition von Optionen
      // für einen neuen Aufzählungswert
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // --------------------------------------------------------------------------------------------------------------------
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      console.log(
        "In createSelectValueAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft(val, done) - val: ",
        val
      );

      if (val.length > 0) {
        // ACHTUNG: Werte mit val.length >= 1 sind erlaubt, z.B. "s", "m", "l", "xl" bei Größenangaben!
        if (
          !this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft.includes(
            val
          )

          // ACHTUNG - TODO bei option-value="valueAufzaehlungswert" = nested q-select Option Values:
          // !this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft.valueAufzaehlungswert.includes(val)
        ) {
          // Den Wert als neue Option zum Select Dropdown Menü hinzufügen:
          this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft.push(
            val
            // TODO bei option-value="valueAufzaehlungswert" = nested q-select Option Values:
            // { "valueAufzaehlungswert": val } // ??? Unklar, ob richtig so - bei q-select für Bauinformationen (ebenfalls nested) steht hier nur val!!!
          );
        }
        // TODO bei option-value="valueAufzaehlungswert" = nested q-select Option Values:
        // done({ "valueAufzaehlungswert": val }, "toggle");  // ??? Unklar, ob richtig so - bei q-select für Bauinformationen (ebenfalls nested) steht hier nur val!!!
        done(val, "toggle");
      }
    },

    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    selectFilterFunctionAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft(
      val,
      update
    ) {
      // --------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Definition der Optionen für einen neuen Aufzählungswert
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung der auswählbaren Menü Options
      // --------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft(val, update) für update - val: ",
          val
        ); // val ist der vom Benutzer eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = this.neueOderAusgewaehlteBaueigenschaft.selektierbareOptionenAufzaehlungsWert; //this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft;
          // Variante: Array Cloning statt Zuweisung - funktioniert, aber beseitigt den Fehler mit @new-value="...()" nicht
          // this.selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = [...this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft];
          // ES6 Spread Operation auf Array, siehe https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array?source=post_page-----9a782b17fa89----------------------
          console.log(
            "selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: ",
            this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
          );
          console.log(
            "selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
          //===============================================================================================================================
          this.selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            // Nur bei nested Objekten: v => v.valueAufzaehlungswert.toLowerCase().indexOf(needle) > -1
            //=============================================================================================================================
            // NEU: Abfrage gegen null und undefined (falls z.B. keine Options definiert sind):
            // v => v.toLowerCase().indexOf(needle) > -1 // ALT
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            v => v != null && v.toLowerCase().indexOf(needle) > -1 // NEU
          );
          console.log(
            "selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
          );
        }
      });
    },

    copyToClipboardSonderzeichenNeueOderAusgewaehlteBaueigenschaft: async function(
      text
    ) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Funktion CopyToClipbaordSonderzeichenNeueOderAusgewaehlteBaueigenschaft für QSelect im Tab "Baueigenschaften > Details zur ausgewählten Baueigenschaft"
      // Siehe https://quasar.dev/quasar-utils/other-utils#Copy-to-Clipboard
      //------------------------------------------------------------------------------------------------------------------------------
      copyToClipboard(text)
        .then(() => {
          // success!
          console.log(
            "Success in copyToClipboardSonderzeichenNeueOderAusgewaehlteBaueigenschaft"
          );
          this.copyToClipboardDoneSonderzeichenNeueOderAusgewaehlteBaueigenschaft = true; // Für Anzeige Hint unter dem Button
        })
        .catch(() => {
          // fail
          console.log(
            "Error in copyToClipboardSonderzeichenNeueOderAusgewaehlteBaueigenschaft"
          );
        });
    },

    populateBaueigenschaft(currentValue) {
      // --------------------------------------------------------------------------------------------------------------------
      // Populiert das Bauinformationsfeld mittels der Daten in alleBauinformationen, wenn es noch nicht populiert ist. Bei einem null Eintrag, wird dieser beibehalten
      // --------------------------------------------------------------------------------------------------------------------
      if (typeof currentValue === "object") {
        return currentValue;
      } else {
        console.log("Baueigenschaft wird populiert");
        return this.alleBauinformationen.find(arg => arg._id === currentValue);
      }
    },

    createNeueOderUpdateAusgewaehlteBaueigenschaft() {
      // --------------------------------------------------------------------------------------------------------------------
      // Methode - Legt bei modus "Neuanlage" eine neue (typbezogene) Baueigenschaft im Backend an (post)
      // Bei Modus "Bearbeitung" wird ein Update der Baueigenschaft am Backend (put) durchgeführt
      // TODO XXXXXX - Werden die typbezogenen Felder, insbesondere bauinformation (nested?) hier richtig behandelt?
      // --------------------------------------------------------------------------------------------------------------------
      if (this.modus === "Bearbeitung") {
        console.log("Führe Update durch");
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        console.log("Vor Emit to leave room 'roomBaueigenschaften'");
        this.$socket.emit("leaveRoom", {
          room: "roomBaueigenschaften"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBaueigenschaften'");
        //=========================================================================================================================================
        this.$axios
          .put(
            process.env.API +
              "/Baueigenschaften/" +
              this.neueOderAusgewaehlteBaueigenschaft._id,
            {
              typbezogeneBaueigenschaft: this.neueOderAusgewaehlteBaueigenschaft
            }
          )
          .then(response => {
            console.log("response: ", response);
            this.$emit("refreshRequest", this.modus);
          })
          .catch(error => {
            console.log("error: ", error);
            if (error.response.status === 403) {
              console.log(
                "Error 403 - Baueigenschaft mit dieser Bezeichnung existiert bereits"
              );
            }
            this.$emit("errorInComponent", error);
          });
      } else if (this.modus === "Neuanlage") {
        console.log(
          "In createNeueOderUpdateAusgewaehlteBaueigenschaft()",
          this.neueOderAusgewaehlteBaueigenschaft
        );
        // this.neueOderAusgewaehlteBaueigenschaft.baumTyp = "Baustoffbaum"; // ALT: Parameter zur Unterscheidung des BaumTyps hier fix auf Baustoffbaum setzen
        // HINWEIS: Im Backend wird neuerdings in Methode createBaueigenschaft() bzw. dort legeNeuAnBaueigenschaft() die Baueigenschaft in Abhängigkeit vom Baumtyp angelegt am Baustoff- und/oder Bauvorhabenbaum
        this.neueOderAusgewaehlteBaueigenschaft.idKnoten = null; // HINWEIS: idKnoten heißt dieses Feld im Body für API-Methode createBaueigenschaft(), bei null
        // wird die Baueigenschaft an den Wurzelknoten angelegt

        // Triggere nun Erzeugung der neuen Baueigenschaft am Backend:
        const apiRoute = process.env.API + "/Baueigenschaften/";
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        console.log("Vor Emit to leave room 'roomBaueigenschaften'");
        this.$socket.emit("leaveRoom", {
          room: "roomBaueigenschaften"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBaueigenschaften'");
        //=========================================================================================================================================
        this.$axios
          .post(apiRoute, {
            idKnoten: null,
            baumTyp: this.neueOderAusgewaehlteBaueigenschaft.baumTyp,
            // NEU: Für Epic 38.n Radio Buttons für diesen Parameter eingeführt, welche 3 Auswahlen bieten ("Baustoffbaum", "Bauvorhabenbaum", "Allgemein")
            // baumTyp: "Baustoffbaum", // ALT - fix
            typbezogeneBaueigenschaft: this.neueOderAusgewaehlteBaueigenschaft
          })
          .then(response => {
            // NEU: Banner-Benutzernachricht im Footer per global Store und Enums:
            /*
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_ERFOLG
          );
          */
            this.$emit("refreshRequest", this.modus);
          })
          // NEU: Catch für Error 403 - Baueigenschaft mit dieser Bezeichnung existiert bereits
          .catch(error => {
            console.log("error: ", error);
            if (error.response.status === 403) {
              console.log(
                "Error 403 - Baueigenschaft mit dieser Bezeichnung existiert bereits"
              );
              /*
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS
            );
            */
            }
            this.$emit("errorInComponent", error);
          });
      }
    },

    baueigenschaftCreator(arg) {
      //----------------------------------------------------------------------------------------------------
      // Funktion, die beim Reset oder Initialisieren aufgerufen wird.
      // Gibt ein Objekt vom Typ TypbezogeneBaueigenschaft zurück
      // Wenn arg eine Baueigenschaft ist, wird sie (tief-) kopiert. Sonst wird eine leere Baueigenschaft erstellt
      //---------------------------------------------------------------------------------------------------
      if (arg !== null) {
        // this.selectFilterOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft
        // this.selectOptionsAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft = arg.selektierbareOptionenAufzaehlungsWert
        return {
          baueigenschaftsBemerkung: arg.baueigenschaftsBemerkung,
          baueigenschaftsAnzeigeText: arg.baueigenschaftsAnzeigeText, // NEU: #514
          systemdefiniertNichtBenutzerdefiniert:
            arg.systemdefiniertNichtBenutzerdefiniert, // NEU: #514
          sollwertNichtIstwert: arg.sollwertNichtIstwert, // NEU: #514
          werteTyp: arg.werteTyp,
          symbol: arg.symbol,
          einheit: arg.einheit,
          formel: arg.formel,
          // ACHTUNG: operator steht unten!
          selektierbareOptionenAufzaehlungsWert:
            arg.selektierbareOptionenAufzaehlungsWert,
          //-----------------------------------------------
          // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
          /*
          schallSchutz: arg.schallSchutz,
          wärmeSchutz: arg.wärmeSchutz,
          brandSchutz: arg.brandSchutz,
          feuchteSchutz: arg.feuchteSchutz,
          chemischerHolzSchutz: arg.chemischerHolzSchutz,
          raumAkustik: arg.raumAkustik,
          abdichtungsTechnik: arg.abdichtungsTechnik,
          korrosionsSchutz: arg.korrosionsSchutz,
          schadstoffSchutz: arg.schadstoffSchutz,
          ökoBilanz: arg.ökoBilanz,
          nachhaltigkeit: arg.nachhaltigkeit,
          //-----------------------------------------------
          // NEU - zusätzliche Kategorien:
          energieEinsparung: arg.energieEinsparung,
          gebrauchsTauglichkeit: arg.gebrauchsTauglichkeit,
          standSicherheit: arg.standSicherheit,
          verkehrsSicherheit: arg.verkehrsSicherheit,
          barriereFreiheit: arg.barriereFreiheit,
          gesundheitUndHygiene: arg.gesundheitUndHygiene,
          umweltVerträglichkeit: arg.umweltVerträglichkeit,
          sonstiges: arg.sonstiges,
          //------------------------------------------------
          // NEU - #515:
          recht: arg.recht,
          geografie: arg.geografie,
          infrastruktur: arg.infrastruktur,
          geoPolitik: arg.geoPolitik,
          projektManagement: arg.projektManagement,
          umweltUndKlima: arg.umweltUndKlima,
          hydroGeologie: arg.hydroGeologie,
          geometrie: arg.geometrie,
          konstruktion: arg.konstruktion,
          nutzungsUndBetriebsZeiten: arg.nutzungsUndBetriebsZeiten,
          beleuchtung: arg.beleuchtung,
          raumKlima: arg.raumKlima,
          lastAnnahmen: arg.lastAnnahmen,
          materialEigenschaften: arg.materialEigenschaften,
          baueigenschaftsProfile: arg.baueigenschaftsProfile,
          bauinformationsProfile: arg.baueigenschaftsProfile,
          */
          //----------------------------------------------------------
          // NEU - #401
          fachlicheKategorien: arg.fachlicheKategorien,
          //----------------------------------------------------------
          _id: arg._id,
          baueigenschaftsBezeichnung: arg.baueigenschaftsBezeichnung,
          baueigenschaftsBeschreibung: arg.baueigenschaftsBeschreibung,
          operator: arg.operator, // TODO XXXXXX - #514
          bauinformation: this.populateBaueigenschaft(arg.bauinformation)
        };
      } else {
        return {
          baueigenschaftsBemerkung: null,
          baueigenschaftsAnzeigeText: null, // NEU: #514
          systemdefiniertNichtBenutzerdefiniert: false, // NEU: #514
          sollwertNichtIstwert: false, // NEU: #514
          werteTyp: "Kennwert",
          symbol: "",
          einheit: "",
          formel: "",
          operator: "", // TODO XXXXXX - #514
          selektierbareOptionenAufzaehlungsWert: [],
          //---------------------------------
          // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
          /*
          schallSchutz: false,
          wärmeSchutz: false,
          brandSchutz: false,
          feuchteSchutz: false,
          chemischerHolzSchutz: false,
          raumAkustik: false,
          abdichtungsTechnik: false,
          korrosionsSchutz: false,
          schadstoffSchutz: false,
          ökoBilanz: false,
          nachhaltigkeit: false,
          //----------------------------------
          // NEU - zusätzliche Kategorien:
          energieEinsparung: false,
          gebrauchsTauglichkeit: false,
          standSicherheit: false,
          verkehrsSicherheit: false,
          barriereFreiheit: false,
          gesundheitUndHygiene: false,
          umweltVerträglichkeit: false,
          sonstiges: false,
          //-----------------------------------
          // NEU - #515:
          recht: false,
          geografie: false,
          infrastruktur: false,
          geoPolitik: false,
          projektManagement: false,
          umweltUndKlima: false,
          hydroGeologie: false,
          geometrie: false,
          konstruktion: false,
          nutzungsUndBetriebsZeiten: false,
          beleuchtung: false,
          raumKlima: false,
          lastAnnahmen: false,
          materialEigenschaften: false,
          baueigenschaftsProfile: false,
          bauinformationsProfile: false,
          */
           //----------------------------------------------------------
          // NEU - #401
          fachlicheKategorien: [],
          //----------------------------------------------------------
          _id: null,
          baueigenschaftsBezeichnung: null,
          baueigenschaftsBeschreibung: "",
          bauinformation: null,
          //-------------------------------------
          baumTyp: "Bauvorhabenbaum" // NEU: Für Epic 38.n
        };
      }
    }
  },

  //==========================================================================================================================================
  watch: {
    "neueOderAusgewaehlteBaueigenschaft.werteTyp": function(newValue) {
      // Watch, der die selektierbareOptionen im Aufzählungswert bei Wechsel des Wertetyps löscht
      console.log("In watch werteTyp", newValue);
      if (newValue !== "Aufzählungswert") {
        this.neueOderAusgewaehlteBaueigenschaft.selektierbareOptionenAufzaehlungsWert = [];
      }
      if (newValue !== "Kennwert" && newValue !== "Kennwertepaar") {
        this.neueOderAusgewaehlteBaueigenschaft.symbol = "";
        this.neueOderAusgewaehlteBaueigenschaft.einheit = "";
        this.neueOderAusgewaehlteBaueigenschaft.formel = "";
        this.neueOderAusgewaehlteBaueigenschaft.operator = ""; // TODO XXXXXX - #514
      }
    },

    zuManipulierendeBaueigenschaft: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Watch auf Prop zuManipulierendeBaueigenschaft
      // Baut bei Änderungen im Prop die neue oder ausgewählte Baueigenschaft (Kopie des Objekts) neu auf
      // -------------------------------------------------------------------------------------------------------------------------------
      // deep: true,
      immediate: true,
      handler: function(val) {
        console.log("In watch für zuManipulierendeBaueigenschaft - val: ", val);
        this.neueOderAusgewaehlteBaueigenschaft = this.baueigenschaftCreator(
          val
        );
      }
    }
  },

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  computed: {
    // NEU: Computed-Funktion für Label zur Eingabe/Auswahl der Optionen für Aufzählungswerte, in Abhängigkeit vom Modus
    computeLabelAufzaehlungswertNeueOderAusgewaehlteBaueigenschaft: function() {
      if (this.modus === "Neuanlage") {
        return "Auswählbare Optionen für den Aufzählungswert eingeben";
      } else {
        // "Bearbeitung"
        return "Auswählbare Optionen für den Aufzählungswert eingeben"; // Selber Text, da sich herausstellte, dass in beiden Modi das QSelect
        // im "New Value" Modus läuft!!!
        // return "Optionen für den Aufzählungswert auswählen"
      }
    },

    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenTypbezogeneBaueigenschaften: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an (typbezogenen) Baueigenschaften
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // Administrator oder Redakteur
        return true;
      }
    },

    ausgewaehlteBauinformation: {
      //------------------------------------------------------------------------------------------------------------------------------
      // Get und Set der ausgewaehltenBauinformation aus der Auswahl.
      // Methode ist so designed, dass sie eine populierte Baueigenschaft oder null zurückgibt
      //------------------------------------------------------------------------------------------------------------------------------
      get: function() {
        const result = this.optionsBauinformationen.find(
          arg =>
            arg._id ===
            this.neueOderAusgewaehlteBaueigenschaft.bauinformation._id
        ); // this.neueOderAusgewaehlteBaueigenschaft.bauinformation
        return result !== undefined ? result : null;
      },
      set: function(value) {
        this.neueOderAusgewaehlteBaueigenschaft.bauinformation = value;
      }
    },

    disableAufzaehlungswertQSelect: function() {
      //--------------------------------------------------------------------------------------------------------------------------------
      if (
        this.neueOderAusgewaehlteBaueigenschaft.werteTyp === "Aufzählungswert"
      ) {
        return false;
      } else return true;
    },

    disabledFieldsNeueOderAusgewaehlteBaueigenschaft: function() {
      //--------------------------------------------------------------------------------------------------------------------------------
      if (
        this.neueOderAusgewaehlteBaueigenschaft.werteTyp === "Kennwert" ||
        this.neueOderAusgewaehlteBaueigenschaft.werteTyp === "Kennwertepaar"
      ) {
        return false;
      } else return true;
    }
  }
};
</script>
