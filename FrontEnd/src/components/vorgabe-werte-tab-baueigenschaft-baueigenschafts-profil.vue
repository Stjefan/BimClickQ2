<template>
  <!-- ============= ACHTUNG: class="q-pa-xs" ist für Formatierung schon am q-tab-panel beim Aufruf notwendig!!! ============ -->
  <div>
    <div v-if="ausgewaehltesBaueigenschaftsProfil">
      <q-form class="q-pa-none">
        <div v-if="localStore.state.debugMode">
          idZugeordnetesBaueigenschaftsProfil:
          {{ idZugeordnetesBaueigenschaftsProfil }}
          ausgewaehltesBaueigenschaftsProfil:
          {{ ausgewaehltesBaueigenschaftsProfil }}
        </div>
        <!-- <div class="q-pa-xs"> -->
        <!-- ACHTUNG: Dieses div mit style="min-width: 1000px" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
        <!-- Sonst macht es sich automatisch klein!!! -->
        <!-- TODO: Wozu hier 2 verschachtelte divs? -->
        <!-- ACHTUNG: Ohne diese kommt es zu Fehlformatierung!!! -->
        <!-- <div> -->
        <!-- ACHTUNG: Dieses div mit style="min-width:" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
        <!-- Sonst macht es sich automatisch klein!!! -->
        <!-- TODO XXXXXX: Hier wird ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung benötigt zur Anzeige - ist aber nicht populiert bisher! -->
        <!-- NEU: Anzeige der Profilbezeichnung aus zusätzlicher Prop bezeichnungZugeordnetesBaueigenschaftsProfil -->
        <div class="text-h6 q-pb-sm" v-if="$q.screen.gt.sm">
          Vorgabewerte für ausgewählte Baueigenschaft <strong>"{{
            ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
              .baueigenschaftsBezeichnung
          }}"</strong> am Baueigenschaftsprofil
          <strong>"{{
            bezeichnungZugeordnetesBaueigenschaftsProfil
          }}"</strong>
        </div>
        <div class="text-subtitle1" v-else>
           Vorgabewerte für ausgewählte Baueigenschaft <strong>"{{
            ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
              .baueigenschaftsBezeichnung
          }}"</strong> am Baueigenschaftsprofil
          <strong>"{{
            bezeichnungZugeordnetesBaueigenschaftsProfil
          }}"</strong>
        </div>
        <!-- <br /> -->
        <div class="row full-width q-col-gutter-xs q-pa-xs inset-shadow">
          <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
          <div class="col-md-3 col-12">
            <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst Layout der Spalte nicht dense!!! -->
            <div>
              <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
              <b>Typbezogene Angaben zur Baueigenschaft (systemweit)</b>
            </div>
            <br />
            <div>
              <b>Festlegung der Bezeichnung der Baueigenschaft</b>
            </div>
            <div class="q-col-gutter-xs">
              <!-- Erstes q-input hat Testcode zur Nutzung von rules: -->
              <q-input
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                dense
                v-model="
                  ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung
                "
                :disable="true"
                lazy-rules
                :rules="[
                  v => !!v || 'Bezeichnung ist erforderlich',
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
              <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
              <b>Weitere typbezogene Angaben zur Baueigenschaft</b>
            </div>
            <div class="q-col-gutter-xs">
              <!-- Typbezogenes Feld, Änderung einstweilen auf diesem Tab disabled -->
              <q-input
                :disable="true"
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                dense
                v-model="
                  ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
                    .baueigenschaftsAnzeigeText
                "
                label="Anzeigetext"
                hint="Anzeigetext für die Baueigenschaft, z.B. 'Schallschutzklasse'"
                hide-hint
                autogrow
              />
              <!-- NEU: #514 -->
              <!-- TODO XXXXXX: Typbezogenes Feld, Änderung einstweilen auf diesem Tab disabled -->
              <q-input
                :disable="true"
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                dense
                v-model="
                  ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
                    .baueigenschaftsBemerkung
                "
                 label="Bemerkung"
                hint="Bemerkung für die Baueigenschaft, z.B. 'Neu angelegt für Türen'"
                hide-hint
                autogrow
              />
            </div>
            <!-- NEU: Inline Code wie im Tab "Neu": -->
            <div>
              <q-badge
                v-if="localStore.state.debugMode"
                color="secondary"
                multi-line
              >
                selectModelBauinformationAusgewaehltesBaueigenschaftsProfil:
                <br />
                {{
                  selectModelBauinformationAusgewaehltesBaueigenschaftsProfil
                }}
              </q-badge>
              <!-- TODO XXXXXX: Typbezogenes Feld, Änderung einstweilen auf diesem Tab disabled -->
              <q-select
                dense
                :disable="true"
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                input-class="text-white"
                filled
                v-model="
                  ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
                    .bauinformation
                "
                :options="
                  selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil
                "
                option-value="bauinformationsBezeichnung"
                :multiple="false"
                label="Relevante Bauinformation auswählen/abwählen"
                stack-label
                use-chips
                options-selected-class="text-primary"
                options-dense
                use-input
                input-debounce="0"
                bottom-slots
                @new-value="
                  createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil
                "
                @filter="
                  selectFilterFunctionBauinformationenAusgewaehltesBaueigenschaftsProfil
                "
                @focus="
                  showHintSelectBauinformationenAusgewaehltesBaueigenschaftsProfil = true
                "
                @blur="
                  showHintSelectBauinformationenAusgewaehltesBaueigenschaftsProfil = false
                "
              >
                <!--
                                        -->
                <!-- TODO: style="width: 720px" -->
                <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                <template v-slot:append>
                  <q-icon name="search" @click.stop />
                  <!-- Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                  <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                  <!-- ALT: Am folgenden template v-if="selectModelBauinformationAusgewaehltesBaueigenschaftsProfil" -->
                  <!-- ACHTUNG: Da selectModelBauinformationAusgewaehltesBaueigenschaftsProfil ein Objekt, kein Array ist, -->
                  <!-- muss es auf null oder {} resetted werden, nicht auf [] -->
                  <q-icon
                    name="cancel"
                    @click.stop="
                      selectModelBauinformationAusgewaehltesBaueigenschaftsProfil = null
                    "
                    class="cursor-pointer"
                    color="primary"
                  />
                </template>
                <template
                  v-slot:hint
                  v-if="
                    showHintSelectBauinformationenAusgewaehltesBaueigenschaftsProfil
                  "
                >
                  <ul class="q-pl-xs">
                    <li>
                      <strong>Filtern:</strong> Eine Bauinformationsbezeichnung
                      (z.B. "13164", "LBO") oder einen Bauinformationstyp
                      (z.B."Norm", "Datenblatt") als Filtertext in das
                      Eingabefeld eingeben. Auch unvollständige Angaben (z.B.
                      "Verord") sind möglich. Dies filtert die im Dropdown-Menü
                      angezeigten Optionen.
                    </li>
                    <li>
                      <strong>Auswählen:</strong> Eine für die neue
                      Baueigenschaft zugeordnete Bauinformation im Dropdown-Menü
                      auswählen.
                    </li>
                    <li>
                      <strong>Abwählen:</strong> Die ausgewählte Bauinformation
                      kann mit
                      <q-icon name="cancel" color="primary" />&nbsp;abgewählt
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
                      <q-tooltip :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4">{{ scope.opt.bauinformationsBezeichnung }}</q-tooltip>
                    </div>
                    <!-- <q-avatar color="secondary" text-color="white" :icon="scope.opt.icon" /> -->
                    <!-- scope.opt.bauinformationsBezeichnung -->
                  </q-chip>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label
                        v-html="scope.opt.bauinformationsBezeichnung"
                      />
                      <q-item-label caption>{{
                        scope.opt.bauinformationsTyp
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <!-- /q-select für Referenz auf Bauinformation -->
            <!-- Platz für Hint schaffen: -->
            <!-- Hier nicht nötig, da Felder disabled! -->
            <!--
            <br />
            <br />
            <br />
            -->
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
                    :disable="true"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil
                        .typbezogeneBaueigenschaft
                        .systemdefiniertNichtBenutzerdefiniert
                    "
                    label="Ist im System vordefiniert, nicht benutzerdefiniert"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    :disable="true"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil
                        .typbezogeneBaueigenschaft.sollwertNichtIstwert
                    "
                    label="Definiert Sollwerte, nicht Istwerte"
                  />
                </div>
              </div>
            </div>
            <!-- ============================================================================================================= -->
            <!-- Typbezogene Felder mit Toggles für Schutzkategorien, Änderung einstweilen auf diesem Tab disabled -->
            <!-- ALT: Ohne QExpansionItem -->
            <!--
            <div class="row q-col-gutter-xs inset-shadow">
              <b>Für die Baueigenschaft relevante Schutzkategorien</b>
            </div>
            -->
            <!-- ------------------------------------------------------------------- -->
            <!-- NEU - mit QExpansionItem: -->
            <br />
            <q-expansion-item
              expand-separator
              :default-opened="false"
              dense
              header-class="bg-white text-bold inset-shadow q-gutter-xs"
              label="Zuordnung zu fachlichen Kategorien und Rubriken"
            >
              <!-- -------------------------------------------------------------------------------------- -->
              <div class="text-caption">
                <!-- NEU - #401: -->
                <!--
                ausgewaehlteBaueigenschaftsProfil.
                  .typbezogeneBaueigenschaft
                    .fachlicheKategorien:
                {{
                  ausgewaehlteBaueigenschaft
                    .typbezogeneBaueigenschaft
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
                        true
                      "
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
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
              <!-- ALT - vor #401: -->
              <!-- #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled: -->
              <!--
              <div class="text-caption">
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .projektManagement
                      "
                      label="Projektmanagement"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.recht
                      "
                      label="Recht"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .geografie
                      "
                      label="Geografie"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .geoPolitik
                      "
                      label="Geopolitik"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .infrastruktur
                      "
                      label="Infrastruktur"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .umweltUndKlima
                      "
                      label="Umwelt und Klima"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .hydroGeologie
                      "
                      label="Hydrogeologie"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .geometrie
                      "
                      label="Geometrie"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .konstruktion
                      "
                      label="Konstruktion"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .lastAnnahmen
                      "
                      label="Lastannahmen"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .nutzungsUndBetriebsZeiten
                      "
                      label="Nutzungs- und Betriebszeiten"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .raumKlima
                      "
                      label="Raumklima"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .beleuchtung
                      "
                      label="Beleuchtung"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .schallSchutz
                      "
                      label="Schallschutz"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.raumAkustik
                      "
                      label="Raumakustik"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.wärmeSchutz
                      "
                      label="Wärmeschutz"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .energieEinsparung
                      "
                      label="Energieeinsparung"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .standSicherheit
                      "
                      label="Standsicherheit"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .gebrauchsTauglichkeit
                      "
                      label="Gebrauchstauglichkeit"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .verkehrsSicherheit
                      "
                      label="Verkehrssicherheit"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .barriereFreiheit
                      "
                      label="Barrierefreiheit"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.brandSchutz
                      "
                      label="Brandschutz"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .feuchteSchutz
                      "
                      label="Feuchteschutz"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .korrosionsSchutz
                      "
                      label="Korrosionsschutz"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .abdichtungsTechnik
                      "
                      label="Abdichtungstechnik"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .chemischerHolzSchutz
                      "
                      label="Holzschutz"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .gesundheitUndHygiene
                      "
                      label="Gesundheit und Hygiene"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .schadstoffSchutz
                      "
                      label="Schadstoffschutz"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .umweltVerträglichkeit
                      "
                      label="Umweltverträglichkeit"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.ökoBilanz
                      "
                      label="Ökobilanz"
                    />
                  </div>
                </div>
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .nachhaltigkeit
                      "
                      label="Nachhaltigkeit"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.materialEigenschaften
                      "
                      label="Materialeigenschaften"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.sonstiges
                      "
                      label="Sonstiges"
                    />
                  </div>
                </div>
                <q-separator />
                <div class="row full-width q-pa-xs">
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .baueigenschaftsProfile
                      "
                      label="Baueigenschaftsprofile"
                    />
                  </div>
                  <div class="col-6">
                    <q-toggle
                      :disable="true"
                      dense
                      v-model="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft
                          .bauinformationsProfile
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
          <div class="col-md-3 col-12">
            <!-- ACHTUNG: Hier kein q-col-gutter-sm am div, sonst Layout der Spalte nicht dense!!! -->
            <div>
              <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
              <b>Angaben zum Wertetyp der Baueigenschaft (systemweit)</b>
            </div>
            <br />
            <b>Festlegung des Wertetyps</b>
            <div class="q-col-gutter-xs">
              <q-select
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                input-class="text-white"
                dense
                v-model="
                  ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
                    .werteTyp
                "
                label="Wertetyp"
                hint="Auszuwählender Typ für die Werte der Eigenschaft, z.B. 'Datumswert'"
                hide-hint
                :options="optionsWertetypBaueigenschaft"
                options-dense
                :disable="true"
              />
            </div>
            <div>
              <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
              <b> Angaben zum Wertetyp 'Kennwert/Kennwertepaar'</b>
            </div>
            <!-- NEU: 4 Felder mit Markdown - enabled: -->
            <!-- ACHTUNG: Aktuell sind dies reine Ausgabefelder, keine Eingabe (dies würde q-inputs erfordern), daher auch kein disable notwendig -->
            <!-- Disabling würde erfolgen z.B. mit :disable="disabledFieldsAusgewaehltesBaueigenschaftsProfil.symbol" -->
            <q-list dense>
              <div class="row q-col-gutter-xs">
                <div class="col-2">
                  <small>Symbol:</small>
                </div>
                <div class="col-10">
                  <q-item dense class="bg-teal-2">
                    <q-markdown
                      :src="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.symbol
                      "
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
                  </q-item>
                </div>
              </div>
              <br />
              <div class="row q-col-gutter-xs">
                <div class="col-2">
                  <small>Einheit:</small>
                </div>
                <div class="col-10">
                  <q-item dense class="bg-teal-2">
                    <q-markdown
                      :src="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.einheit
                      "
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
                  </q-item>
                </div>
              </div>
              <br />
              <div class="row q-col-gutter-xs">
                <div class="col-2">
                  <small>Operator:</small>
                </div>
                <div class="col-10">
                  <q-item dense class="bg-teal-2">
                    <q-markdown
                      :src="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.operator
                      "
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
                  </q-item>
                </div>
              </div>
              <br />
              <div class="row q-col-gutter-xs">
                <div class="col-2">
                  <small>Formel:</small>
                </div>
                <div class="col-10">
                  <q-item dense class="bg-teal-2">
                    <q-markdown
                      :src="
                        ausgewaehltesBaueigenschaftsProfil
                          .typbezogeneBaueigenschaft.formel
                      "
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
                  </q-item>
                </div>
              </div>
            </q-list>
            <!-- ALT: 3 Felder ohne Markdown - disabled: -->
            <!--
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil
                        .typbezogeneBaueigenschaft.symbol
                    "
                    label="Symbol"
                    hint="Symbol, z.B. 'λ'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.symbol
                    "
                  />
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil
                        .typbezogeneBaueigenschaft.einheit
                    "
                    label="Einheit"
                    hint="Einheit, z.B. 'W/(mK)'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.einheit
                    "
                  />
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil
                        .typbezogeneBaueigenschaft.operator
                    "
                    label="Operator"
                    hint="Operator, z.B. '≤'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.operator
                    "
                  />
                </div>
                -->
            <br />
            <div>
              <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
              <b>Angaben zum Wertetyp 'Aufzählungswert'</b>
              <br />
              <div class="text-caption">
                Reserviert für die Definition der selektierbaren Optionen für
                den Wertetyp 'Aufzählungswert'
              </div>
            </div>
          </div>
          <!-- /col, 2. Spalte -->
          <!-- 3. Spalte: -->
          <div class="col-md-6 col-12">
            <!-- ACHTUNG: Folgender Teil ist deaktiviert!!! -->
            <div
              v-if="false"
              class="row q-pa-xs q-col-gutter-xs inset-shadow-3"
            >
              <b
                >Aktivierungszustand der Baueigenschaft am ausgewählten Baustoff
                im Baustoffbaum</b
              >
              <div class="col-6">
                <!-- @input="handleAktivierung(true)" -->
                <q-radio
                  color="accent"
                  class="text-accent"
                  dense
                  v-model="
                    ausgewaehltesBaueigenschaftsProfil.aktiviertNichtDeaktiviert
                  "
                  :val="true"
                  label="Aktiviert (am ausgewählten Baustoff sowie an allen direkten und indirekten Elternbaustoffen bis zum Wurzelbaustoff)"
                  @input="handleAktivierung(true)"
                />
              </div>
              <div class="col-6">
                <!-- @input="handleAktivierung(false)" -->
                <q-radio
                  dense
                  color="primary"
                  v-model="
                    ausgewaehltesBaueigenschaftsProfil.aktiviertNichtDeaktiviert
                  "
                  :val="false"
                  label="Deaktiviert (am ausgewählten Baustoff sowie an allen direkten und indirekten Kindbaustoffen im Baustoffbaum)"
                  @input="handleAktivierung(false)"
                />
              </div>
              <!-- Die folgenden divs sind notwendig, um Abstand zwischen den q-radios für Aktivierungszustand und den Zeilen darunter zu bekommen, -->
              <!-- insbesondere wenn die Fensterbreite schmal ist - sonst ragt der Label-Text an den q-radios in die Zeilen darunter -->
              <div class="row q-col-gutter-xs"></div>
              <div class="col-12">
                <br />
              </div>
            </div>
            <!-- Nun eine Row mit 2 Columns für wertebezogene Angaben und wertbezogene Merkmale: -->
            <div class="row full-width q-col-gutter-xs inset-shadow-3">
              <!-- Erste Column für wertbezogene Angaben: -->
              <div class="col-md-6 col-12">
                <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst Layout der Spalte nicht dense!!! -->
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b
                    >Vorgabewerte (gemäß Wertetyp) für die Baueigenschaft am
                    ausgewählten Baueigenschaftsprofil
                  </b>
                  <br />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Kennwert/Kennwertepaar</b>
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.kennWert1"
                    type="number"
                    label="Kennwert 1"
                    hint="Numerischer Wert, z.B. '3,14'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.kennWert1 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                  />
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.kennWert2"
                    type="number"
                    label="Kennwert 2"
                    hint="Numerischer Wert, z.B. '5000'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.kennWert2 ||
                        disableWerteFelder
                    "
                  />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Datumswert/Datumswertepaar</b>
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.datumsWert1"
                    label="Datumswert 1"
                    stack-label
                    hint="Datum im Format 'tt.mm.jjjj', z.B. '01.12.2019'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.datumsWert1 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                    type="date"
                  >
                  </q-input>
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.datumsWert2"
                    label="Datumswert 2"
                    stack-label
                    hint="Datum im Format 'tt.mm.jjjj', z.B. '31.12.2020"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.datumsWert2 ||
                        disableWerteFelder
                    "
                    type="date"
                  />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Tageszeitwert/Tageszeitwertepaar</b>
                  <!-- NEU -->
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.tagesZeitWert1"
                    label="Tageszeitwert 1"
                    stack-label
                    hint="Uhrzeit im 24-Stunden-Format 'hh:mm', z.B. '08:00'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.tagesZeitWert1 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                    type="time"
                  >
                  </q-input>
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.tagesZeitWert2"
                    label="Tageszeitwert 2"
                    stack-label
                    hint="Uhrzeit im 24-Stunden-Format 'hh:nn', z.B. '18:00'"
                    hide-hint
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.tagesZeitWert2 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                    type="time"
                  />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Bezeichnungswert/Bezeichnungswertepaar</b>
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    type="date"
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.bezeichnungsWert1
                    "
                    label="Bezeichnungswert 1"
                    hint="Frei wählbare Bezeichnung, z.B. 'Gültig ab'"
                    hide-hint
                    autogrow
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.bezeichnungsWert1 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                  />
                </div>
                <div class="q-col-gutter-xs">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.bezeichnungsWert2
                    "
                    label="Bezeichnungswert 2"
                    hint="Frei wählbare Bezeichnung, z.B. 'Gültig bis'"
                    hide-hint
                    autogrow
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.bezeichnungsWert2 ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                  />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Wahrheitswert</b>
                </div>
                <div class="q-col-gutter-xs">
                  <!-- NEU in Quasar 1.8: Zustand des q-toggles ist neutrales "indeterminate" bei Wert "null", mit Prop toggle-indeterminate -->
                  <q-toggle
                    v-model="ausgewaehltesBaueigenschaftsProfil.wahrheitsWert"
                    toggle-indeterminate
                    label="unzutreffend/undefiniert/zutreffend"
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.wahrheitsWert ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                  />
                </div>
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Aufzählungswert</b>
                  <!-- NEU: Kindkomponente disabled zugunsten von Inline Code: -->
                  <q-select
                    dense
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    input-class="text-white"
                    filled
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.aufzaehlungsWert
                    "
                    :options="
                      selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil
                    "
                    @filter="
                      selectFilterFunctionAufzaehlungswertAusgewaehltesBaueigenschaftsProfil
                    "
                    :multiple="true"
                    label="Mögliche Optionen für den Aufzählungswert eingeben"
                    stack-label
                    use-chips
                    options-selected-class="text-primary"
                    options-dense
                    use-input
                    input-debounce="0"
                    bottom-slots
                    :disable="
                      disabledFieldsAusgewaehltesBaueigenschaftsProfil.aufzaehlungsWert ||
                        disableWerteFelder ||
                        !benutzerDarfBearbeitenBaueigenschaftsprofil
                    "
                    @focus="
                      showHintSelectAufzaehlungswertausgewaehltesBaueigenschaftsProfil = true
                    "
                    @blur="
                      showHintSelectAufzaehlungswertausgewaehltesBaueigenschaftsProfil = false
                    "
                  >
                    <!-- TODO: style="width: 720px" -->
                    <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                    <template v-slot:append>
                      <q-icon name="search" @click.stop />
                      <!-- NEU: Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                      <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                      <!-- ALT: Am folgenden template v-if="selectModelAufzaehlungswertausgewaehltesBaueigenschaftsProfil" -->
                      <q-icon
                        name="cancel"
                        class="cursor-pointer"
                        color="primary"
                        @click="
                          ausgewaehltesBaueigenschaftsProfil.aufzaehlungsWert = []
                        "
                      />
                      <!-- ACHTUNG: TODO - Muss oben leerer Array sein???  -->
                    </template>

                    <template
                      v-slot:hint
                      v-if="
                        showHintSelectAufzaehlungswertausgewaehltesBaueigenschaftsProfil
                      "
                    >
                      <ul class="q-pl-xs">
                        <li>
                          <strong>Auswählen</strong> von Optionen für den
                          Aufzählungswert: Diese im Dropdown-Menü auswählen. Es
                          können eine einzelne oder mehrere Optionen ausgewählt
                          werden.
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
                          <q-icon
                            name="cancel"
                            color="primary"
                          />&nbsp;abgewählt werden.
                        </li>
                        <li>
                          Zum
                          <strong>Speichern:</strong> Unten Schaltfläche
                          "Baueigenschaft speichern" drücken.
                        </li>
                      </ul>
                    </template>
                    <!-- Es folgt der v-slot zur Anzeige des q-chips für eine ausgewählte Option: -->
                    <template v-slot:selected-item="scope">
                      <!-- scope: {{scope}} -->
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
                        <q-tooltip :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4">{{ scope.opt }}</q-tooltip>
                      </div>
                      </q-chip>
                    </template>
                    <!-- Es folgt der v-slot zur Anzeige der Options im Dropdown-Menü -->
                    <template v-slot:option="scope">
                      <!-- scope: {{scope}} -->
                      <!-- scope ist hier das Objekt für einen Optionswert im Dropdown-Menü -->
                      <!-- Dieses besteht aus den Feldern scope.index, .opt, .sanitize, .selected, .focused, .itemProps (Unterobjekt) und .itemEvents (Unterobjekt) -->
                      <!-- Angezeigt wird aktuell nur scopt.opt, per v-html - das ist der Inhalt des Textfelds für den Optionswert -->
                      <!-- ACHTUNG: Die Werte für die Options des Felds Aufzaehlungswert müssen sanitized werden, da er vom User definiert/eingegeben wird!!! -->
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <!-- avatar section - funktioniert nur, falls ein Feld icon für die Option definiert ist -->
                        <!--
                                                                              <q-item-section avatar>
                                                                              <q-icon :name="scope.opt.icon" />
                                                                              </q-item-section>
                                                                              -->
                        <q-item-section>
                          <!-- TODO bei option-value="valueAufzaehlungswert": -->
                          <!-- scope.opt.valueAufzaehlungswert-->
                          <!-- TODO: Sanitization der durch den User eingegebenen Option-Werte -->
                          <!-- HINWEIS: Wenn im Folgenden v-html am q-item-label verwendet wird, wird der Inhalt des Felds scope.opt als HTML im Dropdown-Menü ausgegegaben -->
                          <!-- <q-item-label v-html="scope.opt" /> -->
                          <!-- Beispiel für eine solche "HTML-Option" (eingeben im Input-Feld des q-selects): <strong>xxl</strong> -->
                          <!-- Dann muss die Benutzereingabe dafür auf jeden Fall sanitized werden -->
                          <!-- Wenn nur {{ scope.opt }} am q-item-label ausgegeben wird, wird scope.opt nicht als HTML interpretiert -->
                          <!-- Dann ist eine Sanitization vermutlich weniger kritisch -->
                          <!-- Dies gilt auch für die q-chips oben, die die ausgewählten Options anzeigen -->
                          <!-- ACHTUNG: Automatische Sanitization durch Quasar mit den Props options-sanitize und diplay-value-sanitize am q-select -->
                          <!-- wird laut https://quasar.dev/vue-components/select#Sanitization nur unterstützt, wenn man NICHT wie hier der Fall -->
                          <!-- den option v-slot bzw. die selected oder selected-item v-slots verwendet!!! -->
                          <!-- Daher müsste für eine automatische Sanitzation durch Quasar mit diesen Props am q-select das q-select umgestellt werden -->
                          <!-- auf eine Variante ohne v-slots. Die v-slots werden aktuell verwendet für das Einfügen des Search-Icons und das Ein-/Ausblenden -->
                          <!-- der Hints bei Fokus. -->
                          <q-item-label>{{ scope.opt }}</q-item-label>
                          <!-- ALT: Gefährlichere Variante: -->
                          <!-- <q-item-label v-html="scope.opt" /> -->
                          <!-- <q-item-label caption>{{ scope.opt.bauinformationsTyp }}</q-item-label> -->
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <!-- Platz für Hint schaffen: -->
                  <br />
                  <br />
                </div>
              </div>
              <!-- /col, 3. Spalte -->
              <!-- 4. Spalte:      -->
              <!-- ACHTUNG: 4. Spalte darf nur col-3 sein, wenn oben q-col-gutter-xs, nicht q-guttter-xs, sonst Column Wrapping! Workaround: col-3 -->
              <div class="col-md-3 col-12" v-if="false"> <!-- ACHTUNG: Dieser Teil ist deaktiviert!!! -->
                <!-- ACHTUNG: Hier kein q-col-gutter-xs, sonst Layout der Spalte nicht dense!!! -->
                <div>
                  <b
                    >Wertbezogene Merkmale zur aktivierten Baueigenschaft am
                    ausgewählten Baustoff im Baustoffbaum</b
                  >
                </div>
                <br />
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Systemverwaltete wertbezogene Merkmale</b>
                </div>
                <!-- HINWEIS: definiertNichtUndefiniert ist systemverwaltet (:disable=true), nciht benutzerverwaltet-->
                <div>
                  <q-toggle
                    :value="istDefiniertausgewaehltesBaueigenschaftsProfil"
                    label="Werte sind in definiertem Zustand"
                    :disable="true"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.ererbtNichtGesetzt
                    "
                    label="Werte sind vom Elternbaustoff ererbt"
                    :disable="true"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.systemdefiniertNichtBenutzerdefiniert
                    "
                    label="Werte sind vom System vorgegeben (d.h. nicht vom Benutzer eingegeben)"
                    :disable="true"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.systemberechnetNichtSystemgesetzt
                    "
                    label="Werte sind vom System berechnet (d.h. nicht vom Benutzer eingegeben)"
                    :disable="true"
                  />
                </div>
                <br />
                <div>
                  <!-- ACHTUNG: Hier kein q-col-gutter-xs am div, sonst falscher Textumbruch, wenn das Main Window eng gezoomed wird!!! -->
                  <b>Benutzerverwaltete wertbezogene Merkmale</b>
                </div>
                <div>
                  <q-toggle
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.vererbtAnKindknnoten
                    "
                    label="Werte werden vererbt an direkte und indirekte Kindknoten (stets der Fall im Baustoffbaum)"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="
                      ausgewaehltesBaueigenschaftsProfil.sollwertNichtIstwert
                    "
                    label="Werte sind Sollwerte, nicht Istwerte"
                  />
                </div>
                <div>
                  <!-- TODO: q-select für Gütebewertung -->
                  <q-select
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    input-class="text-white"
                    dense
                    v-model="ausgewaehltesBaueigenschaftsProfil.güteBewertung"
                    label="Gütebewertung für die Werte der Baueigenschaft"
                    hint="Auswählbare Einschätzung der Güte des Werts der Baueigenschaft, in drei farblich bezeichneten Gütestufen, z.B. 'gelb'"
                    hide-hint
                    options-dense
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <q-separator />
        <!-- Es folgend die Buttons unter dem q-form: -->
        <div class="row full-width q-pa-xs q-col-gutter-xs">
          <div class="col-md-3 col-12">
            <q-btn
              :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
              class="stretch full-width" style="height:100%"
              color="positive"
              glossy
              @click="updateVorgabeWerteImBackend()"
              label="Vorgabewerte am Profil speichern"
              no-caps
            />
          </div>
          <div class="col-md-3 col-12">
            <q-btn
              :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
              class="stretch full-width" style="height:100%"
              color="deep-orange"
              text-color="white"
              glossy
              label="Eingaben zurücksetzen auf Originalwerte"
              no-caps
              @click="resetToInitialState()"
            />
          </div>
        </div>
      </q-form>
      <!-- </div> -->
      <!-- /row, 1. Zeile -->
      <!--------------------------------------------------------------------------------------------------------------------------------->
      <!-- </div> -->
    </div>
  </div>
</template>
//***
=============================================================================================================================================
<script>
//-------------------------------------------------------------------------------------------------------------------------------
// NEU - #401: Für q-option-group-basierende Anzeige der neuen fachlichen Kategorien/Rubriken von Baueigenschaften:
import OptionsFachlicheKategorienBaueigenschaften from "../modules/options-fachliche-kategorien-baueigenschaften";
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
export default {
  // name: 'ComponentName',
  props: [
    "alleBauinformationen", // Array mit allen Bauinformationen
    "zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil", // ACHTUNG: Relation-Objekt! Unten ist watch darauf definiert!
    // Diese prop enthält auch die id der (typbezogenen) Baueigenschaft, inklusive ihrer anderen Felder
    "idZugeordnetesBaueigenschaftsProfil", // id des Baueigenschaftsprofils, für das die Vorgabewerte definiert werden
    "bezeichnungZugeordnetesBaueigenschaftsProfil" // NEU - MS
  ],
  //------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      optionsFachlicheKategorienBaueigenschaften: OptionsFachlicheKategorienBaueigenschaften, // NEU: #401
      optionsBauinformationen: this.alleBauinformationen,
      selectOptionsBauinformationenAusgewaehlteBaueigenschaft: this
        .alleBauinformationen,
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
      ausgewaehltesBaueigenschaftsProfil: {
        typbezogeneBaueigenschaft: {
          baueigenschaftsBezeichnung: null,
          baueigenschaftsAnzeigeText: null, // NEU: #514
          baueigenschaftsBemerkung: null,
          //-------------------------------------
          // NEU: #514
          systemdefiniertNichtBenutzerdefiniert: false, // NEU: #514
          sollwertNichtIstwert: false, // NEU: #514
          //-------------------------------------
          symbol: null, // FIX: Ist typbezogenes Feld!
          einheit: null, // FIX: Ist typbezogenes Feld!
          operator: null, // FIX: Ist typbezogenes Feld! TODO XXXXXX: Soll im Rahmen von #514 wertbezogen werden! Noch nicht implementiert
          formel: null, // FIX: Ist typbezogenes Feld!
          //-------------------------------------
          // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
          /*
          schallSchutz: false,
          wärmeSchutz: false,
          brandSchutz: false, // NEU
          raumAkustik: false,
          feuchteSchutz: false,
          chemischerHolzSchutz: false,
          abdichtungsTechnik: false,
          korrosionsSchutz: false,
          schadstoffSchutz: false,
          ökoBilanz: false,
          nachhaltigkeit: false,
          // NEU:
          energieEinsparung: false,
          gebrauchsTauglichkeit: false,
          standSicherheit: false,
          verkehrsSicherheit: false,
          barriereFreiheit: false,
          gesundheitUndHygiene: false,
          umweltVerträglichkeit: false,
          sonstiges: false,
          // NEU: #514/515
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
          // NEU - #401
          fachlicheKategorien: []
        },

        aktiviertNichtDeaktiviert: false,
        ererbtNichtGesetzt: false,
        // systemdefiniertNichtBenutzerdefiniert: false /* Geändert MS */, // NEU: #514 - verschoben von wertbezogenen nach typbezogenen Merkmalen
        systemberechnetNichtSystemgesetzt: false,

        definiertNichtUndefiniert: false,
        vererbtAnKindknoten: false,
        // sollwertNichtIstwert: false, // NEU: #514 - verschoben von wertbezogenen nach typbezogenen Merkmalen
        güteBewertung: "gelb",
        werteTyp: "Kennwert",

        kennWert1: null,
        kennWert2: null,
        // symbol: null, // FIX: Ist typbezogenes Feld!
        // einheit: null, // FIX: Ist typbezogenes Feld!
        // operator: null, // FIX: Ist typbezogenes Feld! TODO XXXXXX: Soll im Rahmen von #514 wertbezogen werden! Noch nicht implementiert
        // formel: null, // FIX: Ist typbezogenes Feld!
        datumsWert1: null,
        datumsWert2: null,
        tagesZeitWert1: null, // NEU
        tagesZeitWert2: null, // NEU
        bezeichnungsWert1: null,
        bezeichnungsWert2: null,
        aufzaehlungsWert: [],

        aktivierbar: false
      },
      selectModelBauinformationAusgewaehltesBaueigenschaftsProfil: null,
      selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil: this
        .alleBauinformationen,
      showHintSelectBauinformationenAusgewaehltesBaueigenschaftsProfil: false,
      /*
      disabledFieldsAusgewaehltesBaueigenschaftsProfil: {
        werteTyp: false,
        kennWert1: false,
        kennWert2: false,
        symbol: false,
        formel: false, // NEU
        einheit: false,
        operator: false,
        datumsWert1: false,
        datumsWert2: false,
        tagesZeitWert1: false, // NEU
        tagesZeitWert2: false, // NEU
        bezeichnungsWert1: false,
        bezeichnungsWert2: false,
        aufzaehlungsWert: false
      },
      */
      selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil: [],
      disableWerteFelder: false,
      showHintSelectAufzaehlungswertausgewaehltesBaueigenschaftsProfil: false,
      istDefiniertausgewaehltesBaueigenschaftsProfil: true,
      localStore: globalStore // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.
    };
  },

  //***================================================================================================================================================
  methods: {
    resetToInitialState: function() {
      //------------------------------------------------------------------------------------------------------------------------------
      //
      //------------------------------------------------------------------------------------------------------------------------------
      this.ausgewaehltesBaueigenschaftsProfil = this.erstelleArbeitskopieVonProfilAusProp(
        this.zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil
      );
    },

    updateVorgabeWerteImBackend: function() {
      //------------------------------------------------------------------------------------------------------------------------------
      //
      //------------------------------------------------------------------------------------------------------------------------------
      console.log("In updateVorgabeWerteImBackend()");
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBaueigenschaftsprofile'");
      this.$socket.emit("leaveRoom", {
        room: "roomBaueigenschaftsprofile"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBaueigenschaftsprofile'");
      //=========================================================================================================================================
      this.$axios
        .put(
          process.env.API +
            "/Baueigenschaftsprofile/" +
            this.idZugeordnetesBaueigenschaftsProfil +
            "/Baueigenschaft/Vorgabewerte",
          {
            zugeordneteBaueigenschaft: this.ausgewaehltesBaueigenschaftsProfil
          }
        )
        .then(response => {
          console.log("response: ", response);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_ERFOLG
          );
          // Schicke Refresh Request an Elternkomponente details-tab-baueigenschafts-profil.vue
          this.$emit(
            "refresh-request-baueigenschafts-profil",
            "VorgabewerteBaueigenschaftInProfil"
          );
          // ACHTUNG: Aktuell wird dieser Parameter nicht benutzt!!!
        })
        .catch(error => {
          // NEU - MS 20.07.2020
          console.log("error: ", error);
          // Schicke Refresh Request an Elternkomponente details-tab-baueigenschafts-profil.vue
          this.$emit(
            "refresh-request-baueigenschafts-profil",
            "VorgabewerteBaueigenschaftInProfil"
          );
          // ACHTUNG: Aktuell wird dieser Parameter nicht benutzt!!!
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_VORGABEWERTE_AENDERUNG_FEHLER
          );
        });
    },

    createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil: () => {},

    selectFilterFunctionBauinformationenAusgewaehltesBaueigenschaftsProfil(
      val,
      update
    ) {
      // ----------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Auswahl von Bauinformationen
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung auf bauinformationsBezeichnung oder bauinformationsTyp,
      // ohne dass die durch den Filter erfassten Objekte automatisch zum Menü selbst (d.h. zum selectOptionsBauinformationen)
      // hinzugefügt werden
      // ----------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionBauinformationenAusgewaehlteBaueigenschaft(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil = this.selectOptionsBauinformationenAusgewaehlteBaueigenschaft;
          console.log(
            "selectOptionsBauinformationenAusgewaehlteBaueigenschaft: ",
            this.selectOptionsBauinformationenAusgewaehlteBaueigenschaft
          );
          console.log(
            "selectFilterOptionsBauinformationenAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
          //===============================================================================================================================
          this.selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil = this.selectOptionsBauinformationenAusgewaehlteBaueigenschaft.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            v =>
              // ACHTUNG: Fix für #268, "!= null"-Abfrage erschlägt auch gleich den undefined-Fall!
              (v.bauinformationsBezeichnung != null && v.bauinformationsBezeichnung.toLowerCase().indexOf(needle) > -1) ||
              // v.bauinformationsTyp.toLowerCase().indexOf(needle) > -1 // ALT
              (v.bauinformationsAnzeigeText != null && v.bauinformationsAnzeigeText.toLowerCase().indexOf(needle) > -1) // NEU
          );
          console.log(
            "selectFilterOptionsBauinformationenAusgewaehlteBaueigenschaft: ",
            this
              .selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil
          );
        }
      });
    },
    handleAktivierung: () => {},

    selectFilterFunctionAufzaehlungswertAusgewaehltesBaueigenschaftsProfil(
      val,
      update
    ) {
      // ----------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Auswahl von Bauinformationen
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung auf bauinformationsBezeichnung oder bauinformationsTyp,
      // ohne dass die durch den Filter erfassten Objekte automatisch zum Menü selbst (d.h. zum selectOptionsBauinformationen)
      // hinzugefügt werden
      // ----------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil = this.zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil.typbezogeneBaueigenschaft.selektierbareOptionenAufzaehlungsWert;
          console.log(
            "zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil.typbezogeneBaueigenschaft.selektierbareOptionenAufzaehlungsWert: ",
            this.zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil
              .typbezogeneBaueigenschaft.selektierbareOptionenAufzaehlungsWert
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Dies wurde im Code unten mit if (V != null) schon immer richtig abgefangen! ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
          //===============================================================================================================================
          this.selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil = this.zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil.typbezogeneBaueigenschaft.selektierbareOptionenAufzaehlungsWert.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            v => {
              if (v != null) {
                return v.toLowerCase().indexOf(needle) > -1;
              } else {
                return true;
              }
            }
          );
          console.log(
            "selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil: ",
            this
              .selectFilterOptionsAufzaehlungswertAusgewaehltesBaueigenschaftsProfil
          );
        }
      });
    },
    erstelleArbeitskopieVonProfilAusProp(source) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Erstellt eine (deep-) Copy von source. Erwartet ein VorgabeWerteBaueigenschaften-Objekt (siehe
      // baueigenschafts-profile.model.js). Bei null-Objekt wird ein neues Vorgabewert-Baueigenschaft-Objekt angelegt
      //------------------------------------------------------------------------------------------------------------------------------
      if (source === undefined || source === null) {
        // Dieser Fall kommt zur Zeit nicht vor
        return {
          typbezogeneBaueigenschaft: {
            baueigenschaftsBezeichnung: null,
            baueigenschaftsAnzeigeText: null, // NEU: #514
            baueigenschaftsBemerkung: null,
            //-------------------------------------
            // NEU: #514
            systemdefiniertNichtBenutzerdefiniert: false, // NEU: #514
            sollwertNichtIstwert: false, // NEU: #514
            //-------------------------------------
            // FIX:
            // symbol, einheit, formel (TODO XXXXXX: operator noch zu verschieben im Rahmen von #514)
            symbol: null,
            einheit: null,
            operator: null,
            formel: null,
            //-------------------------------------
            // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
            /*
            schallSchutz: false,
            wärmeSchutz: false,
            brandSchutz: false,
            raumAkustik: false,
            feuchteSchutz: false,
            chemischerHolzSchutz: false,
            abdichtungsTechnik: false,
            korrosionsSchutz: false,
            schadstoffSchutz: false,
            ökoBilanz: false,
            nachhaltigkeit: false,
            // NEU:
            energieEinsparung: false,
            gebrauchsTauglichkeit: false,
            standSicherheit: false,
            verkehrsSicherheit: false,
            barriereFreiheit: false,
            gesundheitUndHygiene: false,
            umweltVerträglichkeit: false,
            sonstiges: false,
            // NEU: #514/515
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
            //----------------------------
            // NEU - #401
            fachlicheKategorien: []
          },

          aktiviertNichtDeaktiviert: false,
          ererbtNichtGesetzt: false,
          // systemdefiniertNichtBenutzerdefiniert: false /* Geändert MS */, // NEU: #514
          systemberechnetNichtSystemgesetzt: false,

          definiertNichtUndefiniert: false,
          vererbtAnKindknoten: false,
          // sollwertNichtIstwert: false, // NEU: #514
          güteBewertung: "gelb",
          werteTyp: "Kennwert",

          kennWert1: null,
          kennWert2: null,
          // FIX: symbol, einheit, operator, formel waren falsch hier - disabled
          // symbol: null,
          // einheit: null,
          // operator: null, // TODO XXXXXX - NEU: #514 - noch zu implementieren
          // formel: null, // NEU
          datumsWert1: null,
          datumsWert2: null,
          tagesZeitWert1: null, // NEU
          tagesZeitWert2: null, // NEU
          bezeichnungsWert1: null,
          bezeichnungsWert2: null,
          aufzaehlungsWert: [],
          wahrheitsWert: null,

          aktivierbar: false
        };
      } else {
        console.log("_id: ", source._id);
        return {
          _id: source._id,
          typbezogeneBaueigenschaft: {
            _id: source.typbezogeneBaueigenschaft._id,
            baueigenschaftsBezeichnung:
              source.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
            baueigenschaftsAnzeigeText: source.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText, // NEU: #514
            baueigenschaftsBemerkung:
              source.typbezogeneBaueigenschaft.baueigenschaftsBemerkung,
            //---------------------------------------------------------
            // NEU: #514
            systemdefiniertNichtBenutzerdefiniert: source.typbezogeneBaueigenschaft.systemdefiniertNichtBenutzerdefiniert,
            sollwertNichtIstwert: source.typbezogeneBaueigenschaft.sollwertNichtIstwert,
            //---------------------------------------------------------
            // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
            /*
            schallSchutz: source.typbezogeneBaueigenschaft.schallSchutz,
            wärmeSchutz: source.typbezogeneBaueigenschaft.wärmeSchutz,
            brandSchutz: source.typbezogeneBaueigenschaft.brandSchutz,
            raumAkustik: source.typbezogeneBaueigenschaft.raumAkustik,
            feuchteSchutz: source.typbezogeneBaueigenschaft.feuchteSchutz,
            chemischerHolzSchutz:
              source.typbezogeneBaueigenschaft.chemischerHolzSchutz,
            abdichtungsTechnik:
              source.typbezogeneBaueigenschaft.abdichtungsTechnik,
            korrosionsSchutz: source.typbezogeneBaueigenschaft.korrosionsSchutz,
            schadstoffSchutz: source.typbezogeneBaueigenschaft.schadstoffSchutz,
            ökoBilanz: source.typbezogeneBaueigenschaft.ökoBilanz,
            nachhaltigkeit: source.typbezogeneBaueigenschaft.nachhaltigkeit,
            // NEU:
            energieEinsparung:
              source.typbezogeneBaueigenschaft.energieEinsparung,
            gebrauchsTauglichkeit:
              source.typbezogeneBaueigenschaft.gebrauchsTauglichkeit,
            standSicherheit: source.typbezogeneBaueigenschaft.standSicherheit,
            verkehrsSicherheit:
              source.typbezogeneBaueigenschaft.verkehrsSicherheit,
            barriereFreiheit: source.typbezogeneBaueigenschaft.barriereFreiheit,
            gesundheitUndHygiene:
              source.typbezogeneBaueigenschaft.gesundheitUndHygiene,
            umweltVerträglichkeit:
              source.typbezogeneBaueigenschaft.umweltVerträglichkeit,
            sonstiges: source.typbezogeneBaueigenschaft.sonstiges,
            //---------------------------------------------------------------------------------
            // NEU: #515
            recht: source.typbezogeneBaueigenschaft.recht,
            geografie: source.typbezogeneBaueigenschaft.geografie,
            infrastruktur: source.typbezogeneBaueigenschaft.infrastruktur,
            geoPolitik: source.typbezogeneBaueigenschaft.geoPolitik,
            projektManagement: source.typbezogeneBaueigenschaft.projektManagement,
            umweltUndKlima: source.typbezogeneBaueigenschaft.umweltUndKlima,
            hydroGeologie: source.typbezogeneBaueigenschaft.hydroGeologie,
            geometrie: source.typbezogeneBaueigenschaft.geometrie,
            konstruktion: source.typbezogeneBaueigenschaft.konstruktion,
            nutzungsUndBetriebsZeiten: source.typbezogeneBaueigenschaft.nutzungsUndBetriebsZeiten,
            beleuchtung: source.typbezogeneBaueigenschaft.beleuchtung,
            raumKlima: source.typbezogeneBaueigenschaft.raumKlima,
            lastAnnahmen: source.typbezogeneBaueigenschaft.lastAnnahmen,
            materialEigenschaften: source.typbezogeneBaueigenschaft.materialEigenschaften,
            baueigenschaftsProfile: source.typbezogeneBaueigenschaft.baueigenschaftsProfile,
            bauinformationsProfile: source.typbezogeneBaueigenschaft.bauinformationsProfile,
            */
            //---------------------------------------------------------------------------------
            // NEU - #401
            fachlicheKategorien: source.typbezogeneBaueigenschaft.fachlicheKategorien,
            //---------------------------------------------------------------------------------
            symbol: source.typbezogeneBaueigenschaft.symbol,
            einheit: source.typbezogeneBaueigenschaft.einheit,
            operator: source.typbezogeneBaueigenschaft.operator, // FIX - TODO XXXXXX: #514 - noch zu implementieren
            formel: source.typbezogeneBaueigenschaft.formel, // NEU
            //---------------------------------------------------------------------------------
            werteTyp: source.typbezogeneBaueigenschaft.werteTyp,
            bauinformation: this.alleBauinformationen.find(
              arg => arg._id === source.typbezogeneBaueigenschaft.bauinformation
            ) // suche die zur Id passende Bauinformationen aus allen Bauinformationen heraus
          },

          aktiviertNichtDeaktiviert: false,
          ererbtNichtGesetzt: false,
          // systemdefiniertNichtBenutzerdefiniert: false /* Geändert MS */, // NEU: #514 - verschoben von wertbezogenen nach typbezogenen Merkmalen
          systemberechnetNichtSystemgesetzt: false,
          definiertNichtUndefiniert: false,
          vererbtAnKindknoten: false,
          // sollwertNichtIstwert: false, // NEU: #514 - verschoben von wertbezogenen nach typbezogenen Merkmalen
          güteBewertung: "gelb",

          kennWert1: source.kennWert1,
          kennWert2: source.kennWert2,
          // operator: source.operator, // TODO XXXXXX: #514 - noch zu implementieren
          datumsWert1: source.datumsWert1,
          datumsWert2: source.datumsWert2,
          tagesZeitWert1: source.tagesZeitWert1, // NEU
          tagesZeitWert2: source.tagesZeitWert2, // NEU
          bezeichnungsWert1: source.bezeichnungsWert1,
          bezeichnungsWert2: source.bezeichnungsWert2,
          aufzaehlungsWert: source.aufzaehlungsWert,
          wahrheitsWert: source.wahrheitsWert, // FIX

          aktivierbar: false
        };
      }
    }
  },

  //------------------------------------------------------------------------------------------------------------------------------

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBaueigenschaftsprofil: function() {
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

    disabledFieldsAusgewaehltesBaueigenschaftsProfil: function() {
      //------------------------------------------------------------------------------------------------------------------------------
      // Disabled die passenden Felder entsprechend des ausgewählten Wertetyps
      //------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In disabledFieldsAusgewaehltesBaueigenschaftsProfil (computed)"
      );
      return {
        kennWert1: !["Kennwert", "Kennwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        kennWert2: !["Kennwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        datumsWert1: !["Datumswert", "Datumswertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        datumsWert2: !["Datumswertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        tagesZeitWert1: !["Tageszeitwert", "Tageszeitwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        tagesZeitWert2: !["Tageszeitwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        // Fix für Defect - Bezeichnungswert1 war disabled!!!
        bezeichnungsWert1: ![
          "Kennwert",
          "Kennwertepaar",
          "Datumswert",
          "Datumswertepaar",
          "Aufzählungswert", // #222
          "Wahrheitswert", // #222
          "Bezeichnungswert", // NEU: FIX
          "Bezeichnungswertepaar" // NEU: FIX
        ].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        // Fix für Defect - Bezeichnungswert2 war disabled!!!
        bezeichnungsWert2: ![
          "Kennwertepaar",
          "Datumswertepaar",
          "Bezeichnungswertepaar" // NEU
        ].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        aufzaehlungsWert: !["Aufzählungswert"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        wahrheitsWert: !["Wahrheitswert"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        symbol: !["Kennwert", "Kennwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        einheit: !["Kennwert", "Kennwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        operator: !["Kennwert", "Kennwertepaar"].includes(
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        ),
        formel: !["Kennwert", "Kennwertepaar"].includes(
          // NEU
          this.ausgewaehltesBaueigenschaftsProfil.typbezogeneBaueigenschaft
            .werteTyp
        )
      };
    }
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  watch: {
    zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil: {
      //------------------------------------------------------------------------------------------------------------------------------
      // watch auf Prop, um Neu-Initalisierung bei Prop-Ä#nderung durchzuführen
      //------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      immediate: true,
      handler: function(val) {
        // Refresh all data
        console.log(
          "In watch für zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil - val: ",
          val
        );
        this.ausgewaehltesBaueigenschaftsProfil = this.erstelleArbeitskopieVonProfilAusProp(
          val
        );
        console.log(
          "Return aus watch für zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil"
        );
      }
    }
  }
};
</script>
