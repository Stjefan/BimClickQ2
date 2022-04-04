<template>
  <div>
    <div>
      <!-- <q-card> -->
      <!-- Im Rahmen des "dense" Layouts entfernt, wird hier nicht gebraucht -->
      <!-- ALT: -->
      <!--
        class="text-grey-10 bg-grey-2"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      -->
      <!-- =================================================================================================== -->
      <!-- ACHTUNG: class="q-pa-xs" oder "q-pa-none" kontrolliert Breite der Tableiste!                        -->
      <!-- =================================================================================================== -->
      <q-tabs
        mobile-arrows
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="white"
        content-class="text-h7"
        dense
        align="left"
        v-model="selectedTab"
      >
        <q-tab
          name="angabenTabBaueigenschaftsProfil"
          label="Angaben zum Baueigenschaftsprofil"
          no-caps
        />
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="beschreibungTabBaueigenschaftsProfil"
          label="Beschreibung für Baueigenschaftsprofil"
          no-caps
          :disable="
            copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung ===
              ''
          "
        />
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="zugeordneteBaueigenschaftenTabBaueigenschaftsProfil"
          label="Zugeordnete Baueigenschaften am Baueigenschaftsprofil"
          no-caps
          :disable="
            copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung ===
              ''
          "
        />
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil"
          label="Vorgabewerte für ausgewählte Baueigenschaft am Baueigenschaftsprofil"
          no-caps
          :disable="
            ausgewaehlteBaueigenschaft === null ||
              copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung ===
                ''
          "
        />
      </q-tabs>
      <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel name="angabenTabBaueigenschaftsProfil" class="q-pa-xs">
          <q-card class="q-pa-xs">
            <!-- NEU - einheitlich mit anderen ähnlichen Formularen -->
            <div v-if="$q.screen.gt.sm">
              <p v-if="modus === 'Bearbeitung'" class="text-h6">
                Angaben zum ausgewählten Baueigenschaftsprofil
                <strong
                  >"{{
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                  }}"</strong
                >
              </p>
              <p class="text-h6" v-else>
                Details für neues Baueigenschaftsprofil
              </p>
            </div>
            <div v-else>
              <p v-if="modus === 'Bearbeitung'" class="text-subtitle1">
                Details zum ausgewählten Baueigenschaftsprofil
                <strong
                  >"{{
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                  }}"</strong
                >
              </p>
              <p class="text-subtitle1" v-else>
                Details für neues Baueigenschaftsprofil
              </p>
            </div>
            <div class="row full-width items-start q-pa-xs q-col-gutter-xs">
              <div class="col-md-4 col-12">
                <q-input
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  v-model="
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                  "
                  label="Bezeichnung des Baueigenschaftsprofils"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  lazy-rules
                  :rules="[
                    v => !!v || 'Bezeichnung ist erforderlich',
                    v =>
                      (v && v.length <= 200) ||
                      'Bezeichnung darf höchstens 200 Zeichen lang sein'
                  ]"
                  hint="Eindeutige Bezeichnung für das Baueigenschaftsprofil"
                  hide-hint
                />
              </div>
              <br />
              <div class="col-md-4 col-12">
                <q-input
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBemerkung
                  "
                  label="Bemerkung zum Baueigenschaftsprofil"
                  hint="Optionale Bemerkung zum Profil, z.B. 'Neu angelegt für Schallschutz'"
                  hide-hint
                  autogrow
                />
              </div>
              <div class="col-md-4 col-12">
                <!-- DONE - Es fehlt noch ein Feld bzw. eigenes Tab für die baueigenschaftsProfilBeschreibung (Markdown) -->
                <!-- DONE - Der Filter auf dem q-select funktioniert noch nicht! Siehe Vorlage in baueinheiten.vue -->
                <!-- NEU: @ms - Steuerung für Hint hinzugefügt über @focus, @blur, bottom-slots nach Vorlage in baueinheiten.vue -->
                <!-- ALT: -->
                <!--
                 v-model="zugeordneteBauinformation"
                :options="alleBauinformationen"
              -->
                <q-select
                  dense
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  :options="
                    selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil
                  "
                  @new-value="
                    createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil
                  "
                  @filter="
                    selectFilterFunctionBauinformationenAusgewaehltesBaueigenschaftsProfil
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  filled
                  v-model="zugeordneteBauinformation"
                  option-value="bauinformationsBezeichnung"
                  :multiple="false"
                  label="Zugeordnete Bauinformation auswählen/abwählen"
                  stack-label
                  use-chips
                  options-selected-class="text-primary"
                  options-dense
                  use-input
                  input-debounce="0"
                  @focus="
                    showHintSelectBauinformationAusgewaehltesBaueigenschaftsProfil = true
                  "
                  @blur="
                    showHintSelectBauinformationAusgewaehltesBaueigenschaftsProfil = false
                  "
                  bottom-slots
                >
                  <!-- TODO: style="width: 720px" -->
                  <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                  <template v-slot:append>
                    <q-icon name="search" @click.stop />
                    <!-- Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                    <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                    <!-- ALT: Am folgenden template v-if="selectModelBauinformationNeueBaueigenschaft" -->
                    <!-- ACHTUNG: Da selectModelBauinformationNeueBaueigenschaft ein Objekt, kein Array ist, -->
                    <!-- muss es auf null oder {} resetted werden, nicht auf [] -->
                    <q-icon
                      name="cancel"
                      class="cursor-pointer"
                      color="primary"
                      @click.stop="
                        copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation = null
                      "
                    />
                  </template>
                  <template
                    v-slot:hint
                    v-if="
                      showHintSelectBauinformationAusgewaehltesBaueigenschaftsProfil
                    "
                  >
                    <ul class="q-pl-xs">
                      <li>
                        <strong>Filtern:</strong> Eine
                        Bauinformationsbezeichnung (z.B. "Norm > DIN > EN >
                        13164") oder einen Bauinformationsanzeigetext (z.B.
                        "Datenblatt") als Filtertext in das Eingabefeld
                        eingeben. Auch unvollständige Angaben (z.B. "Datenbl")
                        sind möglich. Dies filtert die im Dropdown-Menü
                        angezeigten Optionen.
                      </li>
                      <li>
                        <strong>Auswählen:</strong> Eine dem
                        Baueigenschaftsprofil zugeordnete Bauinformation im
                        Dropdown-Menü auswählen.
                      </li>
                      <li>
                        <strong>Abwählen:</strong> Die ausgewählte
                        Bauinformation kann mit
                        <q-icon name="cancel" color="primary" />&nbsp;abgewählt
                        werden.
                      </li>
                      <li>
                        <strong>Speichern:</strong> Unten Schaltfläche
                        "Speichern" drücken.
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
                        <q-item-label
                          v-html="scope.opt.bauinformationsBezeichnung"
                        />
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
              </div>
            </div>
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ALT: style="width: 90%" -->
              <!-- NEU: type="submit" präventiv entfernt!!! -->
              <div class="col-md-4 col-12">
                <q-btn
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  color="positive"
                  glossy
                  class="stretch full-width"
                  style="height:100%"
                  @click="
                    createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil()
                  "
                  label="Baueigenschaftsprofil speichern"
                  no-caps
                />
              </div>
              <div class="col-md-4 col-12">
                <q-btn
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  color="deep-orange"
                  text-color="white"
                  glossy
                  class="stretch full-width"
                  style="height:100%"
                  label="Eingaben zurücksetzen"
                  no-caps
                  @click="resetToInitialState"
                />
              </div>
            </div>
          </q-card>
        </q-tab-panel>
        <q-tab-panel
          name="beschreibungTabBaueigenschaftsProfil"
          class="q-pa-xs"
        >
          <beschreibungTabBaueigenschaftsProfil
            :baueigenschaftsProfil="copyOfPropBaueigenschaftsProfil"
            :baueigenschaftsProfilBeschreibung="
              copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBeschreibung
            "
            @refresh-request-baueigenschafts-profil="
              $emit('refresh-request-baueigenschafts-profil', $event)
            "
          />
          <!-- @refresh-request-baueigenschafts-profil handelt Refresh Request aus der Kindkomponente für die Beschreibung -->
          <!-- In diesem Fall wird der Refresh Request als neues Event an die Elternkomponenten propagiert -->
          <!-- Das sind baueigenschafts-profile.vue und baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue!!! -->
          <!-- Hinweis: $emit(...) ist der Handler dieses Events. Er hat keine definierten Parameter (außer dem Eventnamen "refresh-request-baueigenschafts-profil"). -->
          <!-- $event ist eine Variable, die die Daten des angekommenen Events enthält und diese weiterschickt -->
        </q-tab-panel>
        <q-tab-panel
          class="q-pa-xs"
          name="zugeordneteBaueigenschaftenTabBaueigenschaftsProfil"
        >
          <div>
            <div v-if="$q.screen.gt.sm">
              <div
                v-if="
                  copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung !==
                    null
                "
                class="q-pa-sm text-h6"
              >
                Zugeordnete Baueigenschaften am ausgewählten
                Baueigenschaftsprofil
                <strong
                  >"{{
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                  }}"</strong
                >
              </div>
              <div class="q-pa-sm text-h6" v-else>
                Zugeordnete Baueigenschaften am neuen Baueigenschaftsprofil
              </div>
            </div>
            <div v-else>
              <div
                v-if="
                  copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung !==
                    null
                "
                class="q-pa-sm text-subtitle1"
              >
                Zugeordnete Baueigenschaften am ausgewählten
                Baueigenschaftsprofil
                <strong
                  >"{{
                    copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                  }}"</strong
                >
              </div>
              <div class="q-pa-sm text-subtitle1" v-else>
                Zugeordnete Baueigenschaften am neuen Baueigenschaftsprofil
              </div>
            </div>
            <q-table
              color="primary"
              :data="tableDataZugeordneteBaueigenschaften"
              :columns="columnsAlleBaueigenschaften"
              :visible-columns="visibleColumnsTableBaueigenschaften"
              :row-key="row => row.typbezogeneBaueigenschaft._id"
              :selected.sync="selectedTableAlleBaueigenschaften"
              :filter="filterTableBaueigenschaften"
              @update:selected="tableSelectionChangedHandler"
              selection="single"
              dense
              separator="cell"
              rows-per-page-label="Einträge pro Seite"
              :pagination.sync="paginationTableBaueigenschaften"
              :pagination-label="getPaginationLabel"
              :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
              :selected-rows-label="getSelectedStringTableBaueigenschaften"
              v-bind:class="{
                stickyColumnsTable2HeaderLinesZugeordneteBaueigenschaften:
                  $q.screen.gt.sm
              }"
            >
              <!-- ACHTUNG: Sticky Column funktioniert nur auf großen Bildschirmen - auf mobilen Bildschirmen funktioniert damit das horizontale Scrolling der QTable nicht! -->
              <!-- LÖSUNG (#378): Per v-bind mit Bedingung $q.screen.gt.sm die sticky Column nur auf nicht kleinen Bildschirmen! -->
              <!-- Vorlage: https://vuejs.org/v2/guide/class-and-style.html -->
              <!-- Dazu musste allerdings die CSS Class sticky-columns-table-... (kebab-case) umbenannt werden nach -->
              <!-- stickyColumnsTable... (camelCase) -->
              <template v-slot:top="props">
                <div class="row full-width">
                  <q-btn
                    flat
                    round
                    dense
                    :icon="
                      props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                    "
                    @click="props.toggleFullscreen"
                    class="absolute-top-right"
                    no-caps
                  />
                  <!-- HINWEIS: Diese Classes heissen anscheinend tatsächlich q-table__title, q-table__top, etc. -->
                  <div class="col-md-2 col-11">
                    <q-input
                      square
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      dense
                      debounce="300"
                      color="primary"
                      v-model="filterTableBaueigenschaften"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1 col-12"></div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Kennwertbezogene Angaben"
                      v-model="kennwertbezogeneAngabenAnzeigen"
                      @input="toggleSpaltenKennwertbezogeneAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Vorgabewertbezogene Angaben"
                      v-model="wertbezogeneAngabenAnzeigen"
                      @input="toggleSpaltenWertbezogeneAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Typbezogene Angaben"
                      v-model="weitereTypbezogeneAngabenAnzeigen"
                      @input="toggleSpaltenWeitereTypbezogeneAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Fachliche Kategorien und Rubriken"
                      v-model="schutzKategorienAnzeigen"
                      @input="toggleSpaltenSchutzKategorien()"
                    />
                  </div>
                  <!--
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Wertbzogene Angaben"
                      v-model="weitereWertbezogeneAngabenAnzeigen"
                      @input="
                        toggleSpaltenWeitereWertbezogeneAngaben()
                      "
                    />
                  </div>
                  -->
                  <!--
                  -->
                </div>
              </template>
              <template v-slot:header="props">
                <!-- 1. Header-Zeile -->
                <q-tr>
                  <!-- Für Column-Alignment notwendig: <q-th> für die Zelle über der erste Checkbox-Spalte: -->
                  <!-- Für Column-Alignment notwendig: <q-th> für die Zelle über der erste Checkbox-Spalte: -->
                  <q-th auto-width>
                    Auswahl
                    <!-- War früher leer, um Platz zu sparen! -->
                    <!-- <div v-if localStore.state.debugMode> -->
                    <!--   props.cols.length: {{props.cols.length}} -->
                    <!-- </div> -->
                  </q-th>
                  <!-- Für die Zelle über der fixen zweiten Bezeichnungsspalte -->
                  <q-th align="center" color="primary"
                    >Baueigenschaftsbezeichnung</q-th
                  >
                  <!-- Achtung: Mit <div v-if=..." funktioniert die folgende Steuerung NICHT!!! -->
                  <!-- Die v-ifs müssen direkt an q-th sein!!! -->
                  <!-- NEU: Mit Wegfall von "obligatorisch" und "aktivierbar" ist colspan="1" statt "3" -->
                  <!-- NEU: Spaltenüberschrift "Akivierungzustand" statt "Aktivierungsmerkmale" -->
                  <q-th
                    v-if="aktivierungsMerkmaleAnzeigen"
                    colspan="1"
                    align="center"
                    >Aktivierungzustand</q-th
                  >
                  <!-- ALT: Kennwertbezogene Angaben waren nested innerhalb der wertbezogenen Angaben -->
                  <!-- Dies führte bei den neue eingeführten Kategorieüberschriften in der ersten Header-Zeile dann zu Fehlern bei diversen -->
                  <!-- Sonderfällen, falls wertbezogene und kennwertbezogene Angaben beide ausgeschaltet wurden, -->
                  <!-- oder wertbezogene Angaben ausgeschaltet wurden, während kennwertbezogene Angaben noch an waren -->
                  <!-- Dann blieben falsche Überschriften stehen, selbst wenn man an den v-ifs doppelte -->
                  <!-- Kombinationen der beiden abprüft -->
                  <!-- NEU: Kennwertbezogene Angaben vor die wertbezogenen Angaben verschoben -->
                  <!-- NEU: Fix von @ms - colspan="4" statt "3" wegen zusätzlicher Spalte "Formel" -->
                  <q-th
                    v-if="kennwertbezogeneAngabenAnzeigen"
                    colspan="4"
                    align="center"
                    >Kennwertbezogene Angaben</q-th
                  >
                  <!-- NEU: Im folgenden <q-th colspan="11"> statt <q-th colspan="9"> wegen Hinzunahme zweier Spalten für Tageszeit1/2 -->
                  <q-th
                    v-if="wertbezogeneAngabenAnzeigen"
                    colspan="11"
                    align="center"
                    >Vorgabewertbezogene Angaben</q-th
                  >
                  <!--
                  <q-th
                    v-if="wertbezogeneMerkmaleAnzeigen"
                    colspan="7"
                    align="center"
                    >Wertbezogene Merkmale</q-th
                  >
                  -->
                  <!-- NEU: #514 - colspan="6" statt "3" -->
                  <q-th
                    v-if="weitereTypbezogeneAngabenAnzeigen"
                    colspan="6"
                    align="center"
                    >Typbezogene Angaben</q-th
                  >
                  <!-- NEU: Im folgenden <q-th colspan="11"> statt <q-th colspan="9"> wegen Hinzunahme zweier Spalten für Brandschutz und Nachhaltigkeit -->
                  <!-- NEU: Weitere 8 Spalten hinzugenommen => 19 statt 11 -->
                  <!-- NEU: "Schutzkategorien" am UI umbenannt in "Fachliche Rubriken" -->
                  <!-- NEU: colspan="35" statt "19" wegen Hinzunahme von 16 zusätzlichen Rubriken in #515 -->
                  <!-- NEU: Für #401 werden 33 "alte" Spalten benötigt ("Materialeigenschaften" und "Nachhaltigkeit" entfallen) plus 59 "neue" = 92 -->
                  <!-- Diese werden in Kategorien unterteilt: -->
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Struktur</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="5"
                    align="center"
                    >Fachliche Kategorie: Wirtschaft</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="7"
                    align="center"
                    >Fachliche Kategorie: Umgebung</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="15"
                    align="center"
                    >Fachliche Kategorie: Gebäudetechnik</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="3"
                    align="center"
                    >Fachliche Kategorie: Geometrie</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Statik</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="1"
                    align="center"
                    >Fachliche Kategorie: Konstruktion</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Bautenschutz</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="1"
                    align="center"
                    >Fachliche Kategorie: Feuchteschutz</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="2"
                    align="center"
                    >Fachliche Kategorie: Wärmeschutz</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="3"
                    align="center"
                    >Fachliche Kategorie: Akustik</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="3"
                    align="center"
                    >Fachliche Kategorie: Schwingungs- und
                    Erschütterungsschutz</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="1"
                    align="center"
                    >Fachliche Kategorie: Brandschutz</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Sicherheit</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="2"
                    align="center"
                    >Fachliche Kategorie: Gebrauchstauglichkeit</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="3"
                    align="center"
                    >Fachliche Kategorie: Gesundheit</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Ressourcen</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="4"
                    align="center"
                    >Fachliche Kategorie: Bautechnik</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="20"
                    align="center"
                    >Fachliche Kategorie: Verwendung</q-th
                  >
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="2"
                    align="center"
                    >Fachliche Kategorie: Sonstiges</q-th
                  >
                  <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
                  <!-- ALT: Fachliche Rubriken vor #401 -->
                  <!--
                  <q-th
                    auto-width
                    v-if="schutzKategorienAnzeigen"
                    colspan="35"
                    align="center"
                    >Typbezogene fachliche Rubriken zur
                    Baueigenschaft</q-th
                  >
                  -->
                  <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
                </q-tr>
                <!-- 2. Header-Zeile, diese funktionierte im Gegensatz zur ersten sofort tadellos, da ohne v-ifs -->
                <q-tr :props="props">
                  <!-- Erste Spalte, reserviert für Checkboxes: -->
                  <q-th>
                    <!-- Checkbox für "Select/Deselect All" bei selection="multiple", muss explizit generiert werden -->
                    <!-- TODO: Sollte "-" anzeigen, wie Quasar es selbst macht??? -->
                    <q-checkbox
                      v-if="selectionModeTableBaueigenschaften === 'multiple'"
                      v-model="props.selected"
                      dense
                    />
                    <!-- TODO: Hier eventuell zusätzlich einbauen: -->
                    <!-- Sort-Möglichkeit nach selected/deselected bei Selection="multiple", über zusätzliche -->
                    <!-- "virtual" Column -->
                    <!-- Siehe https://forum.quasar-framework.org/topic/4602/qtable-question-sort-by-selected-deselected-rows/11 -->
                    <!-- sowie selbst erstellte Vorlage auf https://codepen.io/mickey58/pen/XWWVEEN -->
                    <!-- HINWEIS: Quasar erzeugt und rotiert Sort internen Icon q-table__sort-icon (= die "Up/Down" Arrows) -->
                    <!-- per CSS und handled Events darauf - das ist nicht so leicht zu kopieren: -->
                    <!-- https://github.com/quasarframework/quasar/blob/dev/ui/src/components/table/QTable.styl -->
                  </q-th>
                  <!-- Nun die Zellen für die Überschriften der normalen Table-Spalten erzeugen. -->
                  <!-- Diese werden offenbar automatisch von Quasar zusätzlich befüllt mit den Up/Down-Arrows für "sortable" Spalten  -->
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    :auto-width="true"
                  >
                    <!-- Folgender Code, um die Baueigenschaftsbezeichnungsspalte optisch hervorzuheben, bringt leider die Column-Höhe durcheinander auskommentiert: -->
                    <!--
                    <div v-if="col.label=='Baueigenschaftsbezeichnung'" class="text-red">{{col.label}}</div>
                    <div v-else>{{col.label}}</div>
                    -->
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <!-- =================================================================================================================================== -->
                  <!-- START CODE FÜR KONTEXTMENÜ für Rechtsklick-Aktionen auf einer Spalte/Zeile in der QTable -->
                  <!-- Diese Kontextmenüs waren ursprünglich nur für die Spalten, die in booleanFieldsTypbezogen und booleanFieldsWertbezogen enthalten sind, -->
                  <!-- später auch für die Spalte für die Baueigenschaftsbezeichnung definiert, nun diese zentral hier für alle Spalten definiert: -->
                  <!-- TODO: Man könnte später selektiv auch noch andere Aktionen anbieten je nach Spalte/Zeile, z.B. auf den Link-Spalten -->
                  <!-- Dabei ist die (per Maus angewählte) Spalte in col.name, die Zeile in props.row enthalten, siehe Debug Info Kontextmenü unten -->
                  <!-- ================================================================================================================================ -->
                  <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item
                        clickable
                        v-close-popup
                        @click="contextMenuHandler(props.row)"
                      >
                        <q-item-section>
                          Baueigenschaft auswählen und Vorgabewerte
                          anzeigen/bearbeiten
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                  <!-- ENDE CODE FÜR KONTEXTMENÜ -->
                  <!-- ====================================================================================================================== -->
                  <q-td :auto-width="true">
                    <q-checkbox
                      v-model="props.selected"
                      color="primary"
                      dense
                    />
                  </q-td>
                  <q-td
                    :auto-width="true"
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.type === 'toggle'">
                      <!-- NEU: color="grey-9" und toggle-indeterminate für die Checkboxes für die  Schutzkategorien -->
                      <q-checkbox
                        :value="col.value"
                        disabled="true"
                        dense
                        color="grey-9"
                        toggle-indeterminate
                      />
                    </div>
                    <div
                      v-else-if="col.type === 'markdown'"
                      class="height-small"
                    >
                      <q-markdown
                        :src="col.value"
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
                      />
                    </div>
                    <div v-else>
                      {{ col.value }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <!-- <br /> -->
          <div class="row full-width q-pa-xs q-col-gutter-xs">
            <div class="col-md-2 col-12 text-caption">
              Aktion für dem Profil zugeordnete Baueigenschaft
              {{ displayRightArrow }}
              <br />
              <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
              Mit &nbsp;
              <q-checkbox v-model="alwaysOn" disable dense color="primary" />
              &nbsp; in erster Spalte Baueigenschaft auswählen. Alternativ mit
              rechter Maustaste Kontextmenü aufrufen.
              <!-- <br />&nbsp;
            <br /> -->
            </div>
            <div class="col-md-2 col-12">
              <q-btn
                class="stretch full-width"
                label="Vorgabewerte für ausgewählte Baueigenschaft bearbeiten"
                color="purple-6"
                glossy
                dense
                no-caps
                @click="
                  selectedTab =
                    'vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil'
                "
                :disable="selectedTableAlleBaueigenschaften.length == 0"
              />
            </div>
            <!-- TODO XXXXXX: Filter am q-select fehlt noch! Siehe Vorlage in baueinheiten.vue -->
            <!-- ACHTUNG: Prop style="width: 720px" am q-select entfernt, da sonst Konflikt mit <div class="col-4"> -->
            <!--
            <div class="col-2"></div>
            -->
            <!-- Folgendes Feld vergrößert für lange Bezeichnungen von Baueigenschaften: -->
            <div class="col-md-6 col-12">
              <div>
                <q-select
                  :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  filled
                  :value="
                    selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  :options="
                    selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  option-label="baueigenschaftsBezeichnung"
                  label="Dem Profil zugeordnete Baueigenschaften auswählen/abwählen"
                  stack-label
                  use-chips
                  :multiple="true"
                  options-selected-class="text-primary"
                  options-dense
                  use-input
                  input-debounce="0"
                  bottom-slots
                  @new-value="
                    createSelectValueBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @filter="
                    selectFilterFunctionBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @add="
                    selectAddHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @remove="
                    selectRemoveHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @focus="
                    showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = true
                  "
                  @blur="
                    showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = false
                  "
                >
                  <!--
                  q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  filled
                  :value="
                    selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  :options="
                    selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  option-label="baueigenschaftsBezeichnung"
                  label="Zugeordnete Baueigenschaften auswählen/abwählen"
                  stack-label
                  use-chips
                  :multiple="true"
                  options-selected-class="text-primary"
                  options-dense
                  use-input
                  input-debounce="0"
                  bottom-slots
                  @new-value="
                    createSelectValueBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                    "
                  @filter="
                      selectFilterFunctionBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                    "
                  @add="
                    selectAddHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @remove="
                    selectRemoveHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                  "
                  @focus="
                    showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = true
                  "
                  @blur="
                    showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = false
                  "
                -->
                  <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                  <template
                    v-slot:append
                    v-if="
                      selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                    "
                  >
                    <q-icon name="search" @click.stop />
                    <!-- NEU: Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                    <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                    <q-icon
                      name="cancel"
                      @click.stop="
                        selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = []
                      "
                      class="cursor-pointer"
                      color="primary"
                    />
                    <!-- ACHTUNG: TODO - Muss oben leerer Array sein??? -->
                  </template>
                  <template v-slot:after>
                    <!-- Hier war der Speichern-Button vorher -->
                  </template>
                  <!-- <template v-slot:hint> -->
                  <!-- NEU: Hint nur anzeigen, wenn das q-select Fokus hat -->
                  <!-- Per v-if="showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil" und native Vue Events: -->
                  <!-- @focus="showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil=true" -->
                  <!-- @blur="showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil=false" -->
                  <template
                    v-slot:hint
                    v-if="
                      showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
                    "
                  >
                    <ul class="q-pl-xs">
                      <li>
                        <strong>Filtern:</strong> Eine
                        Baueigenschaftsbezeichnung (z.B. "dynamische
                        Steifigkeit") oder einen Baueigenschaftstyp
                        (z.B."Kennwert") als Filtertext in das Eingabefeld
                        eingeben. Auch unvollständige Angaben (z.B. "Steif")
                        sind möglich. Dies filtert die im Dropdown-Menü
                        angezeigten Optionen.
                      </li>
                      <li>
                        <strong>Auswählen:</strong> Dem Baueigenschaftsprofil
                        zugeordnete Baueigenschaften im Dropdown-Menü auswählen.
                      </li>
                      <li>
                        <strong>Abwählen:</strong> Ausgewählte Baueigenschaften
                        können mit
                        <q-icon name="cancel" color="primary" />&nbsp;abgewählt
                        werden.
                      </li>
                      <li>
                        Zum
                        <strong>Speichern:</strong> Unten Schaltfläche
                        "Speichern" drücken.
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
                      <!-- {{ scope.opt.baueigenschaftsBezeichnung }} -->
                      <!-- ACHTUNG - hier NICHT: scope.opt.benutzerKennung !!! -->
                      <!-- ACHTUNG: Bzgl. Sanitization wird hier für die Anzeige im q-chip kein v-html verwendet, sondern wie unten bei den Options nur Moustaches -->
                      <!-- NEU: Long Label Truncation, mit Tooltip der vollen Bezeichnung, mittels spezieller CSS Class "ellipsis": -->
                      <!-- Damit Truncation für lange Texte an QChip - Vorlage: https://quasar.dev/vue-components/chip#Example--Long-label-truncation -->
                      <div class="ellipsis">
                        {{ scope.opt.baueigenschaftsBezeichnung }}
                        <q-tooltip
                          :delay="1000"
                          :offset="[0, 10]"
                          max-width="500px"
                          content-class="bg-secondary text-white text-caption shadow-4"
                          >{{ scope.opt.baueigenschaftsAnzeigeText }}</q-tooltip
                        >
                      </div>
                    </q-chip>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                      <!--
                      <q-item-section avatar>
                        <q-icon :name="scope.opt.icon" />
                      </q-item-section>
                      -->
                      <q-item-section>
                        <q-item-label
                          v-html="scope.opt.baueigenschaftsBezeichnung"
                        />
                        <q-item-label caption>{{
                          scope.opt.werteTyp
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <!-- /q-select für Referenz auf Baueigenschaft -->
                <!-- Platz für Hint schaffen: -->
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
            <div class="col-md-2 col-12">
              <!-- ALT: type="submit" -->
              <q-btn
                :disable="!benutzerDarfBearbeitenBaueigenschaftsprofil"
                color="positive"
                glossy
                class="stretch full-width"
                @click="
                  ordneZuBaueigenschaftenAusgewaehltesBaueigenschaftsProfil()
                "
                label="Die dem Profil zugeordneten Baueigenschaften speichern"
                no-caps
              />
            </div>
          </div>
          <!-- Weitere Buttons werden hier nicht mehr gebraucht - disabled: -->
          <!--
          <div class="row q-gutter-md">
              <q-btn
                class="col-auto offset-md-10"
                padding="lg"
                color="positive"
                glossy
                type="submit"
                @click="createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil()"
                label="Speichern"
                no-caps
              />
              <q-btn
                class="col-auto"
                padding="lg"
                color="deep-orange"
                text-color="white"
                glossy
                label="Zurücksetzen"
                no-caps
                @click="resetToInitialState"
              />
          </div>
          -->
        </q-tab-panel>
        <q-tab-panel
          class="q-pa-xs"
          name="vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil"
        >
          <vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil
            :alleBauinformationen="alleBauinformationen"
            :zuBearbeitendeVorgabeWerteBaueigenschaftInBaueigenschaftsProfil="
              ausgewaehlteBaueigenschaft
            "
            :idZugeordnetesBaueigenschaftsProfil="
              copyOfPropBaueigenschaftsProfil._id
            "
            :bezeichnungZugeordnetesBaueigenschaftsProfil="
              copyOfPropBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
            "
            @refresh-request-baueigenschafts-profil="
              $emit('refresh-request-baueigenschafts-profil', $event)
            "
          />
          <!-- Refresh Request der Kindkomponente von details-tab-baueigenschafts-profil.vue löst seinerseits Refresh Request von details-tab-baueigenschafts-profil.vue aus, -->
          <!-- auf dieses Event wird in deren Elternkomponente (baueigenschafts-profile.vue) gehört -->
          <!-- 21.07.2020:  @refresh-request-baueigenschafts-profil="$emit('refresh-request-baueigenschafts-profil', modus)" -->
          <!-- Hinweis: $emit(...) ist der Handler dieses Events. Er hat keine definierten Parameter (außer dem Eventnamen "refresh-request-baueigenschafts-profil"). -->
          <!-- $event ist eine Variable, die die Daten des Events enthält -->
        </q-tab-panel>
      </q-tab-panels>
      <!-- </q-card> -->
    </div>
  </div>
</template>
//***==========================================================================================================================================================
<script>
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil from "./vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue";
import beschreibungTabBaueigenschaftsProfil from "../components/beschreibung-tab-baueigenschafts-profil.vue";
import { date, copyToClipboard, Loading, QSpinnerGears, Notify } from "quasar";
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  components: {
    vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil,
    beschreibungTabBaueigenschaftsProfil
  },
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  props: {
    zuModifizierendesBaueigenschaftsProfil: {
      // ACHTUNG: Unten Watch auf dieser Prop baueigenschaftsProfil!!!
      default: null
    },
    modus: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return ["Bearbeitung", "Neuanlage"].includes(value);
      }
    },
    selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: Array,
    alleBauinformationen: Array
  },
  //=============================================================================================================================================
  // ACHTUNG: Zusätzlich verwendet die Komponente 2 Events: Diese werden beim Aufruf jeweils an eine Funktion gebunden in der Elternkomponente!!!
  // @refresh-request-baueigenschafts-profil
  // @error-bezeichnung-baueigenschafts-profil
  //=============================================================================================================================================
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore,
      selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: null,
      tableDataZugeordneteBaueigenschaften: [],
      filterTableBaueigenschaften: "",
      visibleColumnsTableBaueigenschaften: ["baueigenschaftsBezeichnung"],
      ausgewaehlteBaueigenschaft: null,
      selectionModeTableBaueigenschaften: "single",
      // wertbezogeneMerkmaleAnzeigen: false, // Wird nicht verwendet!!!
      wertbezogeneAngabenAnzeigen: false,
      wertbezogeneAngabenArray: [
        "werteTyp",
        "kennWert1",
        "kennWert2", // TODO XXXXXX: #514 - Operator verschieben
        "datumsWert1",
        "datumsWert2",
        "tagesZeitWert1", // NEU
        "tagesZeitWert2", // NEU
        "bezeichnungsWert1",
        "bezeichnungsWert2",
        "aufzaehlungsWert",
        "wahrheitsWert"
      ],
      kennwertbezogeneAngabenAnzeigen: false,
      kennwertbezogeneAngabenArray: ["einheit", "symbol", "operator", "formel"], // NEU: "formel" // TODO XXXXXX: #514 - operator verschieben
      schutzKategorienAnzeigen: false,
      schutzKategorienArray: [
        // #401 - alte Schutzkategorien (ersetzt durch neue fachliche Kategorien/Rubriken), disabled:
        /*
        "schallSchutz",
        "wärmeSchutz",
        "brandSchutz",
        "raumAkustik",
        "feuchteSchutz",
        "chemischerHolzSchutz",
        "abdichtungsTechnik",
        "korrosionsSchutz",
        "schadstoffSchutz",
        "ökoBilanz",
        "nachhaltigkeit",
        // NEU:
        "energieEinsparung",
        "gebrauchsTauglichkeit",
        "standSicherheit",
        "verkehrsSicherheit",
        "barriereFreiheit",
        "gesundheitUndHygiene",
        "umweltVerträglichkeit",
        "sonstiges",
        // NEU: #514/515
        "recht",
        "geografie",
        "infrastruktur",
        "geoPolitik",
        "projektManagement",
        "umweltUndKlima",
        "hydroGeologie",
        "geometrie",
        "konstruktion",
        "nutzungsUndBetriebsZeiten",
        "beleuchtung",
        "raumKlima",
        "lastAnnahmen",
        "materialEigenschaften",
        "baueigenschaftsProfile",
        "bauinformationsProfile",
        */
        //=======================================================
        // NEU - #401:
        "strukturAllgemein",
        "strukturEinordnung",
        "strukturZusammensetzung",
        "strukturProfilzuordnung",
        "wirtschaftAllgemein",
        "wirtschaftHandel",
        "wirtschaftProjektsteuerung",
        "wirtschaftRecht",
        "wirtschaftKosten", // NEU
        "umgebungAllgemein",
        "umgebungGeografie",
        "umgebungGeopolitik",
        "umgebungInfrastruktur",
        "umgebungUmwelt",
        "umgebungKlima",
        "umgebungHydrogeologie",
        "gebäudetechnikAllgemein", // NEU
        "gebäudetechnikWasserUndAbwasser", // NEU
        "gebäudetechnikHeizung", // NEU
        "gebäudetechnikKühlung", // NEU
        "gebäudetechnikLüftung", // NEU
        "gebäudetechnikElektrik", // NEU
        "gebäudetechnikKommunikation", // NEU
        "gebäudetechnikBeförderung", // NEU
        "gebäudetechnikTechnikFürSpezifischeNutzungen",
        "gebäudetechnikAutomation", // NEU
        "gebäudetechnikNutzungsUndBetriebszeiten", // NEU
        "gebäudetechnikRaumklima", // NEU
        "gebäudetechnikBeleuchtung", // NEU
        "gebäudetechnikBeschattung", // NEU
        "gebäudetechnikBelichtung", // NEU
        "geometrieAllgemein",
        "geometrieMaße",
        "geometrieMengen",
        "statikAllgemein",
        "statikLasten",
        "statikStandsicherheit",
        "statikFestigkeit",
        "konstruktionAllgemein",
        "bautenschutzAllgemein", // NEU
        "bautenschutzAbdichtungstechnik", // NEU
        "bautenschutzKorrosionsschutz", // NEU
        "bautenschutzHolzschutz", // NEU
        "feuchteschutzAllgemein",
        "wärmeschutzAllgemein",
        "wärmeschutzEnergiebedarf",
        "akustikAllgemein", // NEU
        "akustikSchallschutz", // NEU
        "akustikRaumakustik", // NEU
        "schwingungsUndErschütterungsschutzAllgemein", // NEU
        "schwingungsUndErschütterungsschutzSchwingungen", // NEU
        "schwingungsUndErschütterungsschutzErschütterungen", // NEU
        "brandschutzAllgemein",
        // "brandschutzBlitzschutz", // ALT - entfernt!
        "sicherheitAllgemein",
        "sicherheitVerkehrssicherheit",
        "sicherheitBarrierefreiheit",
        "sicherheitElektrischeSicherheit",
        "gebrauchstauglichkeitAllgemein",
        "gebrauchstauglichkeitBehaglichkeit",
        "gesundheitAllgemein",
        "gesundheitSchadstoffschutz",
        "gesundheitRadonschutz",
        "ressourcenAllgemein",
        "ressourcenUmweltverträglichkeit",
        "ressourcenÖkobilanz",
        "ressourcenLebenszyklus",
        "bautechnikAllgemein",
        "bautechnikBauablauf",
        "bautechnikZeitbedarf",
        "bautechnikWinterbau",
        "verwendungAllgemein",
        "verwendungHerkunft",
        "verwendungQualität",
        "verwendungHerstellung",
        "verwendungVerpackung",
        "verwendungLieferung",
        "verwendungLagerung",
        "verwendungVerarbeitung",
        "verwendungAnwendung",
        "verwendungMontage",
        "verwendungVerbrauch",
        "verwendungNachbehandlung",
        "verwendungBetrieb",
        "verwendungBenutzung",
        "verwendungReinigung",
        "verwendungPflege",
        "verwendungWartung",
        "verwendungDemontage",
        "verwendungWiederverwertung",
        "verwendungEntsorgung",
        "sonstigesAllgemein",
        "sonstigesTest"
      ],
      aktivierungsMerkmaleAnzeigen: false,
      weitereTypbezogeneAngabenAnzeigen: true,
      alwaysOn: true, // Für Checkbox in statischem Textfeld zur Erklärung der Button-Aktionen auf der QTable
      alwaysOff: false, // Dito
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      selectedTab: "angabenTabBaueigenschaftsProfil",
      paginationTableBaueigenschaften: {
        sortBy: "baueigenschaftsBezeichnung", // HINWEIS: Hier stand ursprünglich nur "Name"!!!
        // Es sollte aber laut q-table API Doc ein Column name (from colummn definition)" sein!!!
        descending: false,
        page: 1,
        rowsPerPage:
          globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // ALT: 15 // Für FHD Laptops
        // rowsNumber: xx if getting data from a server
        // rowsNumber ist laut https://quasar.dev/vue-components/table#Pagination nur relevant bei Server Side Pagination!!!
        // Dann müsste rowsNumber mit dem aktuellen Wert der Zeilen in der q-table für die Baueigenschaften initialisiert und ggf. updated werden,
        // z.B. in computed: selectedNodeTreeBaustoffe (wird aufgerufen, wenn sich der selected Node im Baustoffbaum ändert)
        // unter Verwendung von selectedNodeTreeBaustoffe.baueigenschaften.length, wenn dieses initialisiert und geändert wird
      },

      copyOfPropBaueigenschaftsProfil: null, // this.profilFactoryMethod(this.profil)
      alleBaueigenschaften: [],

      selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil: this
        .alleBauinformationen,
      selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: [],
      showHintSelectBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: true,
      showHintSelectBauinformationAusgewaehltesBaueigenschaftsProfil: true,
      inProfilEnthalteneBaueigenschaften: null,

      selectedTableAlleBaueigenschaften: [],

      columnsAlleBaueigenschaften: [
        {
          name: "baueigenschaftsBezeichnung",
          label: "Baueigenschaftsbezeichnung",
          field: row =>
            row.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
          align: "left",
          sortable: true
        },
        {
          name: "symbol",
          label: "Symbol",
          field: row => row.typbezogeneBaueigenschaft.symbol, // Fix MS 27.08.2020 - .typbezogeneBaueigenschaft fehlte hier!!!
          align: "right",
          sortable: true,
          type: "markdown"
        },
        {
          name: "einheit",
          label: "Einheit",
          field: row => row.typbezogeneBaueigenschaft.einheit,
          align: "right",
          sortable: true,
          type: "markdown"
        },
        {
          name: "operator",
          label: "Operator",
          field: row => row.typbezogeneBaueigenschaft.operator,
          align: "right",
          sortable: true,
          type: "markdown"
        },
        {
          // NEU - eingefügt von @ms - fehlte!
          name: "formel",
          label: "Formel",
          field: row => row.typbezogeneBaueigenschaft.formel,
          align: "right",
          sortable: true,
          type: "markdown"
        },
        {
          name: "werteTyp",
          label: "Wertetyp", // NEU
          field: row => row.typbezogeneBaueigenschaft.werteTyp,
          align: "left",
          sortable: true
        },
        // Wertbezogene Angaben:
        {
          name: "kennWert1",
          label: "Kennwert 1",
          field: "kennWert1",
          sortable: true
        },
        {
          name: "kennWert2",
          label: "Kennwert 2",
          field: "kennWert2",
          sortable: true
        },
        {
          name: "datumsWert1",
          label: "Datum 1",
          field: "datumsWert1",
          sortable: true,
          format: val => this.formatDate(val)
        },
        {
          name: "datumsWert2",
          label: "Datum 2",
          field: "datumsWert2",
          sortable: true,
          format: val => this.formatDate(val)
        },
        {
          name: "tagesZeitWert1", // NEU
          label: "Tageszeit 1",
          field: "tagesZeitWert1",
          sortable: true,
          format: val => this.formatTime(val)
        },
        {
          name: "tagesZeitWert2", // NEU
          label: "Tageszeit 2",
          field: "tagesZeitWert2",
          sortable: true,
          format: val => this.formatTime(val)
        },
        {
          name: "bezeichnungsWert1",
          label: "Bezeichnung 1",
          field: "bezeichnungsWert1",
          sortable: true,
          // format: (val, row) => `${val}%` // Hilft nicht, die Länge zu truncaten
          // style: "width: 1200" // Hat keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bezeichnungne hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "bezeichnungsWert2",
          label: "Bezeichnung 2",
          field: "bezeichnungsWert2",
          sortable: true,
          // format: (val, row) => `${val}%` // Hilft nicht, die Länge zu truncaten
          // style: "width: 1200" // Hat keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bezeichnungne hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "wahrheitsWert",
          label: "Wahrheitswert",
          field: "wahrheitsWert",
          align: "center",
          sortable: true,
          type: "toggle"
        },
        {
          name: "aufzaehlungsWert",
          label: "Aufzählungswert",
          field: "aufzaehlungsWert",
          sortable: true
        },
        // Weitere fachliche Angaben:
        {
          name: "baueigenschaftsAnzeigeText", // NEU: #514:
          label: "Anzeigetext",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText,
          align: "left",
          sortable: true
        },
        {
          name: "baueigenschaftsBemerkung",
          label: "Baueigenschaftsbemerkung",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.baueigenschaftsBemerkung,
          align: "left",
          sortable: true,
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bemerkungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "systemdefiniertNichtBenutzerdefiniert", // NEU: #514:
          label: "Systemdefiniert",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.systemdefiniertNichtBenutzerdefiniert,
          align: "center",
          sortable: true,
          type: "toggle" // Triggert Anzeige von Checkbox statt "true"/"False"
        },
        {
          name: "sollwertNichtIstwert", // NEU: #514:
          label: "Sollwert",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.sollwertNichtIstwert,
          align: "center",
          sortable: true,
          type: "toggle" // Triggert Anzeige von Checkbox statt "true"/"False"
        },
        {
          name: "bauinformationsBezeichnung",
          label: "Bauinformationsbezeichnung",
          // ACHTUNG: "field" wuude früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.bauinformation !== undefined && // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
            row.typbezogeneBaueigenschaft.bauinformation !== null
              ? row.typbezogeneBaueigenschaft.bauinformation
                  .bauinformationsBezeichnung
              : null,
          // field: row => row.bauinformation.bauinformationsBezeichnung, // Auskommentiert wegen flacher Objekte seit 12.12.19
          // ACHTUNG: Nested Property, funktionierte in q-table mit v-slots für Body nur mit speziellem Code unten!!
          // ACHTUNG: Das Feld musste zusätzlich in den Array textFields aufgenommen werden, um per v-slot angezeigt zu werden
          align: "left",
          sortable: true
        },
        {
          name: "bauinformationsTyp",
          label: "Bauinformationstyp",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.bauinformation !== undefined && // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
            row.typbezogeneBaueigenschaft.bauinformation !== null
              ? row.typbezogeneBaueigenschaft.bauinformation.bauinformationsTyp
              : null,
          // field: row => row.bauinformation.bauinformationsTyp,
          // ACHTUNG: Nested Property, funktioniert in q-table mit v-slots für Body nur mit speziellem Code unten!!
          // ACHTUNG: Das Feld musste zusätzlich in den Array textFields aufgenommen werden, um per v-slot angezeigt zu werden
          align: "left",
          sortable: true
        },
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // ALT: Schutzkategorien/fachliche Rubriken
        // NEU - #401: Neue fachliche Kategorien/Rubriken, wie in options-fachliche-kategorien-baueigenschaften.js definiert
        {
          name: "strukturAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Struktur > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "strukturEinordnung", // NEU: #514/515
          align: "center",
          label: "Einordnung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Struktur > Einordnung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "strukturZusammensetzung", // NEU: #514/515
          align: "center",
          label: "Zusammensetzung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Struktur > Zusammensetzung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "strukturProfilzuordnung", // NEU: #514/515
          align: "center",
          label: "Profilzuordnung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Struktur > Profilzuordnung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wirtschaftAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wirtschaft > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wirtschaftHandel", // NEU: #514/515
          align: "center",
          label: "Handel", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wirtschaft > Handel"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wirtschaftProjektsteuerung", // NEU: #514/515
          align: "center",
          label: "Projektsteuerung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wirtschaft > Projektsteuerung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wirtschaftRecht", // NEU: #514/515
          align: "center",
          label: "Recht", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wirtschaft > Recht"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wirtschaftKosten", // NEU: #514/515
          align: "center",
          label: "Kosten", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wirtschaft > Kosten"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungGeografie", // NEU: #514/515
          align: "center",
          label: "Geografie", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Geografie"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungGeopolitik", // NEU: #514/515
          align: "center",
          label: "Geopolitik", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Geopolitik"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungInfrastruktur", // NEU: #514/515
          align: "center",
          label: "Infrastruktur", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Infrastruktur"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungUmwelt", // NEU: #514/515
          align: "center",
          label: "Umwelt", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Umwelt"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungKlima", // NEU: #514/515
          align: "center",
          label: "Klima", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Klima"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umgebungHydrogeologie", // NEU: #514/515
          align: "center",
          label: "Hydrogeologie", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Umgebung > Hydrogeologie"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikWasserUndAbwasser", // NEU: #514/515
          align: "center",
          label: "Wasser und Abwasser", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Wasser und Abwasser"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikHeizung", // NEU: #514/515
          align: "center",
          label: "Heizung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Heizung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikKühlung", // NEU: #514/515
          align: "center",
          label: "Kühlung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Kühlung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikLüftung", // NEU: #514/515
          align: "center",
          label: "Lüftung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Lüftung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikElektrik", // NEU: #514/515
          align: "center",
          label: "Elektrik", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Elektrik"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikKommunikation", // NEU: #514/515
          align: "center",
          label: "Kommunikation", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Kommunikation"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikBeförderung", // NEU: #514/515
          align: "center",
          label: "Beförderung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Beförderung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikTechnikFürSpezifischeNutzungen", // NEU: #514/515
          align: "center",
          label: "Technik für spezifische Nutzungen", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Technik für spezifischeNutzungen"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikAutomation", // NEU: #514/515
          align: "center",
          label: "Automation", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Automation"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikNutzungsUndBetriebszeiten", // NEU: #514/515
          align: "center",
          label: "Nutzungs- und Betriebszeiten", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Nutzungs- und Betriebszeiten"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikRaumklima", // NEU: #514/515
          align: "center",
          label: "Raumklima", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Raumklima"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikBeleuchtung", // NEU: #514/515
          align: "center",
          label: "Beleuchtung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Beleuchtung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikBeschattung", // NEU: #514/515
          align: "center",
          label: "Beschattung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Beschattung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebäudetechnikBelichtung", // NEU: #514/515
          align: "center",
          label: "Belichtung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebäudetechnik > Belichtung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geometrieAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Geometrie > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geometrieMaße", // NEU: #514/515
          align: "center",
          label: "Maße", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Geometrie > Maße"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geometrieMengen", // NEU: #514/515
          align: "center",
          label: "Mengen", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Geometrie > Mengen"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "statikAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Statik > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "statikLasten", // NEU: #514/515
          align: "center",
          label: "Lasten", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Statik > Lasten"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "statikStandsicherheit", // NEU: #514/515
          align: "center",
          label: "Standsicherheit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Statik > Standsicherheit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "statikFestigkeit", // NEU: #514/515
          align: "center",
          label: "Festigkeit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Statik > Festigkeit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        //-
        {
          name: "konstruktionAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Konstruktion > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautenschutzAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautenschutz > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautenschutzAbdichtungstechnik", // NEU: #514/515
          align: "center",
          label: "Abdichtungstechnik", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautenschutz > Abdichtungstechnik"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautenschutzKorrosionsschutz", // NEU: #514/515
          align: "center",
          label: "Korrosionsschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautenschutz > Korrosionsschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautenschutzHolzschutz", // NEU: #514/515
          align: "center",
          label: "Holzschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautenschutz > Holzschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
         {
          name: "feuchteschutzAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Feuchteschutz > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wärmeschutzAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wärmeschutz > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wärmeschutzEnergiebedarf", // NEU: #514/515
          align: "center",
          label: "Energiebedarf", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Wärmeschutz > Energiebedarf"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "akustikAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Akustik > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "akustikSchallschutz", // NEU: #514/515
          align: "center",
          label: "Schallschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Akustik > Schallschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "akustikRaumakustik", // NEU: #514/515
          align: "center",
          label: "Raumakustik", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Akustik > Raumakustik"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
         {
          name: "schwingungsUndErschütterungsschutzAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Schwingungs- und Erschütterungsschutz > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "schwingungsUndErschütterungsschutzSchwingungen", // NEU: #514/515
          align: "center",
          label: "Schwingungen", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Schwingungs- und Erschütterungsschutz > Schwingungen"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
         {
          name: "schwingungsUndErschütterungsschutzErschütterungen", // NEU: #514/515
          align: "center",
          label: "Erschütterungen", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Schwingungs- und Erschütterungsschutz > Erschütterungen"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "brandschutzAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Brandschutz > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        // ALT - entfernt:
        /*
        {
          name: "brandschutzBlitzschutz", // NEU: #514/515
          align: "center",
          label: "Blitzschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Brandschutz > Blitzschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        */
        {
          name: "sicherheitAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sicherheit > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sicherheitVerkehrssicherheit", // NEU: #514/515
          align: "center",
          label: "Verkehrssicherheit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sicherheit > Verkehrssicherheit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sicherheitBarrierefreiheit", // NEU: #514/515
          align: "center",
          label: "Barrierefreiheit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sicherheit > Barrierefreiheit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sicherheitElektrischeSicherheit", // NEU: #514/515
          align: "center",
          label: "Elektrische Sicherheit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sicherheit > Elektrische Sicherheit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebrauchstauglichkeitAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebrauchstauglichkeit > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebrauchstauglichkeitBehaglichkeit", // NEU: #514/515
          align: "center",
          label: "Behaglichkeit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gebrauchstauglichkeit > Behaglichkeit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gesundheitAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gesundheit > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gesundheitSchadstoffschutz", // NEU: #514/515
          align: "center",
          label: "Schadstoffschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gesundheit > Schadstoffschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gesundheitRadonschutz", // NEU: #514/515
          align: "center",
          label: "Radonschutz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Gesundheit > Radonschutz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "ressourcenAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Ressourcen > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "ressourcenUmweltverträglichkeit", // NEU: #514/515
          align: "center",
          label: "Umweltverträglichkeit", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Ressourcen > Umweltverträglichkeit"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "ressourcenÖkobilanz", // NEU: #514/515
          align: "center",
          label: "Ökobilanz", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Ressourcen > Ökobilanz"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "ressourcenLebenszyklus", // NEU: #514/515
          align: "center",
          label: "Lebenszyklus", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Ressourcen > Lebenszyklus"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautechnikAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautechnik > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautechnikBauablauf", // NEU: #514/515
          align: "center",
          label: "Bauablauf", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautechnik > Bauablauf"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautechnikZeitbedarf", // NEU: #514/515
          align: "center",
          label: "Zeitbedarf", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautechnik > Zeitbedarf"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "bautechnikWinterbau", // NEU: #514/515
          align: "center",
          label: "Winterbau", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Bautechnik > Winterbau"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungHerkunft", // NEU: #514/515
          align: "center",
          label: "Herkunft", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Herkunft"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungQualität", // NEU: #514/515
          align: "center",
          label: "Qualität", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Qualität"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungHerstellung", // NEU: #514/515
          align: "center",
          label: "Herstellung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Herstellung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungVerpackung", // NEU: #514/515
          align: "center",
          label: "Verpackung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Verpackung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungLieferung", // NEU: #514/515
          align: "center",
          label: "Lieferung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Lieferung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungLagerung", // NEU: #514/515
          align: "center",
          label: "Lagerung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Lagerung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungVerarbeitung", // NEU: #514/515
          align: "center",
          label: "Verarbeitung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Verarbeitung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungAnwendung", // NEU: #514/515
          align: "center",
          label: "Anwendung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Anwendung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungMontage", // NEU: #514/515
          align: "center",
          label: "Montage", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Montage"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungVerbrauch", // NEU: #514/515
          align: "center",
          label: "Verbrauch", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Verbrauch"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungNachbehandlung", // NEU: #514/515
          align: "center",
          label: "Nachbehandlung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Nachbehandlung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungBetrieb", // NEU: #514/515
          align: "center",
          label: "Betrieb", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Betrieb"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungBenutzung", // NEU: #514/515
          align: "center",
          label: "Benutzung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Benutzung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungReinigung", // NEU: #514/515
          align: "center",
          label: "Reinigung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Reinigung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungPflege", // NEU: #514/515
          align: "center",
          label: "Pflege", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Pflege"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungWartung", // NEU: #514/515
          align: "center",
          label: "Wartung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Wartung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungDemontage", // NEU: #514/515
          align: "center",
          label: "Demontage", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Demontage"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungWiederverwertung", // NEU: #514/515
          align: "center",
          label: "Wiederverwertung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Recyclilng"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verwendungEntsorgung", // NEU: #514/515
          align: "center",
          label: "Entsorgung", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Verwendung > Entsorgung"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sonstigesAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sonstiges > Allgemein"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sonstigesTest", // NEU: #514/515
          align: "center",
          label: "Test", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.typbezogeneBaueigenschaft.fachlicheKategorien.includes(
              "Sonstiges > Test"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        // ----------------------------------------------------------------------------------------------------------------------------------
        // ALT: Struktur vor #401 (alte fachliche Rubriken)
        /*
        {
          name: "projektManagement", // NEU: #514/515
          align: "center",
          label: "Projektmanagement",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.projektManagement,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "recht", // NEU: #514/515
          align: "center",
          label: "Recht",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.recht,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geografie", // NEU: #514/515
          align: "center",
          label: "Geografie",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.geografie,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geoPolitik", // NEU: #514/515
          align: "center",
          label: "Geopolitik",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.geoPolitik,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "infrastruktur", // NEU: #514/515
          align: "center",
          label: "Infrastruktur",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.infrastruktur,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umweltUndKlima", // NEU: #514/515
          align: "center",
          label: "Umwelt und Klima",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.umweltUndKlima,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "hydroGeologie", // NEU: #514/515
          align: "center",
          label: "Hydrogeologie",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.hydroGeologie,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "geometrie", // NEU: #514/515
          align: "center",
          label: "Geometrie",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.geometrie,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "konstruktion", // NEU: #514/515
          align: "center",
          label: "Konstruktion",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.konstruktion,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "lastAnnahmen", // NEU: #514/515
          align: "center",
          label: "Lastannahmen",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.lastAnnahmen,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "nutzungsUndBetriebsZeiten", // NEU: #514/515
          align: "center",
          label: "Nutzungs- und Betriebszeiten",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.nutzungsUndBetriebsZeiten,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "raumKlima", // NEU: #514/515
          align: "center",
          label: "Raumklima",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.raumKlima,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "beleuchtung", // NEU: #514/515
          align: "center",
          label: "Beleuchtung",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.beleuchtung,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "schallSchutz",
          align: "center",
          label: "Schallschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.schallSchutz,
          // format: val => this.displayCheckMark(val),
          // Erste simple Lösung mit Unicode Checkmarks statt q-checkbox, wieder entfernt
          sortable: true,
          type: "toggle"
        },
        {
          name: "raumAkustik",
          align: "center",
          label: "Raumakustik",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.raumAkustik,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "wärmeSchutz",
          align: "center",
          label: "Wärmeschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.wärmeSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle" // Selbsterstelltes Feld um die Anzeige in der qTable zu steuern
        },
        {
          name: "energieEinsparung",
          align: "center",
          label: "Energieeinsparung",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.energieEinsparung,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle" // Selbsterstelltes Feld um die Anzeige in der qTable zu steuern
        },
        {
          name: "standSicherheit",
          align: "center",
          label: "Standsicherheit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.standSicherheit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verkehrsSicherheit",
          align: "center",
          label: "Verkehrssicherheit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.verkehrsSicherheit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gebrauchsTauglichkeit",
          align: "center",
          label: "Gebrauchstauglichkeit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.gebrauchsTauglichkeit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "barriereFreiheit",
          align: "center",
          label: "Barrierefreiheit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.barriereFreiheit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "brandSchutz",
          align: "center",
          label: "Brandschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.brandSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "feuchteSchutz",
          align: "center",
          label: "Feuchteschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.feuchteSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "abdichtungsTechnik",
          align: "center",
          label: "Abdichtungstechnik",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.abdichtungsTechnik,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "korrosionsSchutz",
          align: "center",
          label: "Korrosionsschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.korrosionsSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "chemischerHolzSchutz",
          align: "center",
          label: "Holzschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.chemischerHolzSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "gesundheitUndHygiene",
          align: "center",
          label: "Gesundheit und Hygiene",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.gesundheitUndHygiene,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "schadstoffSchutz",
          align: "center",
          label: "Schadstoffschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.schadstoffSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "umweltVerträglichkeit",
          align: "center",
          label: "Umweltverträglichkeit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.umweltVerträglichkeit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "ökoBilanz",
          align: "center",
          label: "Ökobilanz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.ökoBilanz,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "nachhaltigkeit",
          align: "center",
          label: "Nachhaltigkeit",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.nachhaltigkeit,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "materialEigenschaften", // NEU: #514/515
          align: "center",
          label: "Materialeigenschaften",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.materialEigenschaften,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "sonstiges",
          align: "center",
          label: "Sonstiges",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.sonstiges,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "baueigenschaftsProfile", // NEU: #514/515
          align: "center",
          label: "Baueigenschaftsprofile",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.baueigenschaftsProfile,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
         {
          name: "bauinformationsProfile", // NEU: #514/515
          align: "center",
          label: "Bauinformationsprofile",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.typbezogeneBaueigenschaft.bauinformationsProfile,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        */
      ]
    };
  }, // /data()

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
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenBaueigenschaftsprofile
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeitenBaueigenschaftsprofile
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

    /*
    selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      //
      // -------------------------------------------------------------------------------------------------------------------------------
      get: function() {
        console.log(
          "In computed getter für selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil",
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.map(
            arg => arg.typbezogeneBaueigenschaft
          )
        );
        return this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.map(
          arg => arg.typbezogeneBaueigenschaft
        );
      }
    },
    */

    zugeordneteBauinformation: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Computed getter und setter für die zugeordnete Bauinformation
      // Wird als Model für das q-select zur Auswahl der Bauinformation am ausgewählten Baueigenschaftsprofil verwendet!
      // Beim Set des v-models wird im Setter unten copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation updated!
      // Dieser Code wurde von @sts zur Adressierung des null-Falls entwickelt
      // HINWEIS: Auf Heroku kam ursprünglich bei Anwahl eines Baueigenschaftsprofils mit leerer Bauinformation in der Tabelle im Tab "Übersicht aller Baueigenschaftsprofile" ein Fehler "TypeError: Cannot read
      // property '_id' of undefined" - dieser Fehler verschwand jedoch, seit alle Baueigenschaftsprofile in der Datenbank (überprüfbar mit MongoDB Compasss) wenigstens ein Baueigenschaftsprofil mit dem Feld zugeordneteBauinformation = null
      // statt gar keinem solchen Feld angelegt haben!
      // -------------------------------------------------------------------------------------------------------------------------------
      get: function() {
        console.log("In computed getter für ausgewaehltesBauinformation");
        if (
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation !==
          null
        ) {
          const result = this.alleBauinformationen.find(
            arg =>
              arg._id ===
              this.copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation._id
          ); // this.neueBaueigenschaft.bauinformation
          return result !== undefined ? result : null;
        } else return null;
      },
      set: function(value) {
        console.log(
          "In computed setter für zugeordneteBauinformation - value: ",
          value
        );
        this.copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation = value;
      }
    }
  }, // /computed:

  //***==================================================================================================================================================

  //=======================================================================================================================================================
  methods: {
    contextMenuHandler(rowOfContextMenu) {
      // Selection-Array leeren und anschließend mit Array-Operation die ausgewaehlte row hinzufügen
      this.selectedTableAlleBaueigenschaften.splice(
        0,
        this.selectedTableAlleBaueigenschaften.length
      );
      this.selectedTableAlleBaueigenschaften.push(rowOfContextMenu);
      // Aufruf der Funktion um allen Komponenten mitzuteilen, dasss sich die Selection geändert hat
      this.tableSelectionChangedHandler(this.selectedTableAlleBaueigenschaften);
      // Anschließend auf das Vorgabewerte-Tab wechseln
      this.selectedTab = "vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil";
    },

    ordneZuBaueigenschaftenAusgewaehltesBaueigenschaftsProfil() {
      // Schreibt die im q-select ausgewählten zugeordneteBaueigenschaften vom Typ vorgabewerteBaueigenschaften in zugeordneteBaueigenschaften der lokalen Kopie des ausgewaehlten Baueigenschaftsprofils
      console.log(
        "Aufruf von ordneZuBaueigenschaftenAusgewaehltesBaueigenschaftsProfil"
      );
      // this.tableDataZugeordneteBaueigenschaften = this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.map(arg => Object.assign({}, arg))
      // this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften = this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
      // Finde Eigenschaften aus dem selectModel, die noch nicht zugeordnet waren
      var nochNichtVorhandeneVorgabewerteBaueigenschaftAnProfil = this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.filter(
        arg =>
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.findIndex(
            innerArg => innerArg.typbezogeneBaueigenschaft._id === arg._id
          ) === -1
      );
      for (
        var i = 0;
        i <
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
          .length;
        i++
      ) {
        var aktuelleIterierteBaueigenschaft = this
          .selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil[i];
        var indexInArray = this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.findIndex(
          arg =>
            arg.typbezogeneBaueigenschaft._id ===
            aktuelleIterierteBaueigenschaft._id
        );
        console.log(indexInArray);
        if (indexInArray === -1) {
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push(
            {
              typbezogeneBaueigenschaft: aktuelleIterierteBaueigenschaft,
              _deleted: false
            }
          );
        } else {
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften[
            indexInArray
          ]._deleted = false;
        }
      }
      /*
      nochNichtVorhandeneVorgabewerteBaueigenschaftAnProfil.map(arg => {
        this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
          typbezogeneBaueigenschaft: arg
        });
        return null;
      });
      */
      console.log(
        "copyOfPropBaueigenschaftsProfil",
        this.copyOfPropBaueigenschaftsProfil
      );
      this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften = this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.filter(
        arg => arg._deleted === false
      );
      console.log(
        "copyOfPropBaueigenschaftsProfil",
        this.copyOfPropBaueigenschaftsProfil
      );
      // Hier wurde das Löschen vergessen von entfernten Baueigenschaften
      /*
      this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.map(arg => {
        this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
          typbezogeneBaueigenschaft: arg
        });
        return null;
      });
      */
      this.createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil();
    },

    createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil(
      val,
      done
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil für QSelect zur Auswahl von Bauinformationen
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
        "In createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil(val, done) - val: ",
        val
      );
      if (val.length > 1) {
        if (
          // NEU: Fix für #269
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation
            .bauinformationsBezeichnung != null && // NEU
          !this.copyOfPropBaueigenschaftsProfil.zugeordneteBauinformation.bauinformationsBezeichnung.includes(
            val
          )
        ) {
          done(val, "toggle");
        }
      }
    },

    selectFilterFunctionBauinformationenAusgewaehltesBaueigenschaftsProfil(
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
          "In selectFilterFunctionBauinformationenAusgewaehltesBaueigenschaftsProfil(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil = this.alleBauinformationen;
          console.log("optionsBauinformationen: ", this.alleBauinformationen);
          console.log(
            "selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil: ",
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
          this.selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil = this.alleBauinformationen.filter(
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
            "selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil: ",
            this
              .selectFilterOptionsBauinformationenAusgewaehltesBaueigenschaftsProfil
          );
        }
      });
    },

    createSelectValueBaueigenschaftenAusgewaehltesBaueigenschaftsProfil(
      val,
      done
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectValueBaueigenschaftenAusgewaehltesBaueigenschaftsProfil für QSelect zur Auswahl von Baueigenschaften
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
        "In createSelectValueBaueigenschaftenAusgewaehltesBaueigenschaftsProfil(val, done) - val: ",
        val
      );
      if (val.length > 1) {
        const needle = val.baueigenschaftsBezeichnung;
        if (
          !this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.indexOf(
            //=============================================================================================================================
            // NEU: Abfrage gegen null und undefined (falls z.B. keine Options definiert sind) als Fix für #268
            // arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung.toLowerCase().indexOf(needle) > -1// ALT
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld arg.subField angegeben werden!!!
            arg =>
              arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung !=
                null && // NEU
              arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
                .toLowerCase()
                .indexOf(needle) > -1
          )
        ) {
          done(val, "toggle");
        }
      }
    },

    selectFilterFunctionBaueigenschaftenAusgewaehltesBaueigenschaftsProfil(
      val,
      update
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Auswahl von Baueigenschaften
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung auf bauinformationsBezeichnung oder bauinformationsTyp,
      // ohne dass die durch den Filter erfassten Objekte automatisch zum Menü selbst (d.h. zum selectOptionsBauinformationen)
      // hinzugefügt werden
      //--------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionBaueigenschaftenAusgewaehltesBaueigenschaftsProfil(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = this.selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil;
          console.log(
            "selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: ",
            this
              .selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
          );
        } else {
          const needle = val.toLowerCase();
          this.selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = this.selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.filter(
            //===============================================================================================================================
            // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
            // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
            // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
            // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
            //===============================================================================================================================
            v =>
              // ALT:
              // v.baueigenschaftsBezeichnung.toLowerCase().indexOf(needle) > -1 ||
              // v.werteTyp.toLowerCase().indexOf(needle) > -1
              // NEU: ACHTUNG - ix für #268, "!= null"-Abfrage erschlägt auch gleich den undefined-Fall!
              //=============================================================================================================================
              // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
              (v.baueigenschaftsBezeichnung != null &&
                v.baueigenschaftsBezeichnung.toLowerCase().indexOf(needle) >
                  -1) ||
              (v.werteTyp != null &&
                v.werteTyp.toLowerCase().indexOf(needle) > -1) // NEU
          );
          console.log(
            "selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: ",
            this
              .selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil
          );
        }
      });
    },

    createSelectValueAufzaehlungswertNeueBaueigenschaft(val, done) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectvalueAufzaehlungswertNeueBaueigenschaft für QSelect zur Definition von Optionen
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
        "In createSelectValueAufzaehlungswertNeueBaueigenschaft(val, done) - val: ",
        val
      );

      if (val.length > 0) {
        // ACHTUNG: Werte mit val.length >= 1 sind erlaubt, z.B. "s", "m", "l", "xl" bei Größenangaben!
        if (
          !this.selectOptionsAufzaehlungswertNeueBaueigenschaft.includes(val)

          // ACHTUNG - TODO bei option-value="valueAufzaehlungswert" = nested q-select Option Values:
          // !this.selectOptionsAufzaehlungswertNeueBaueigenschaft.valueAufzaehlungswert.includes(val)
        ) {
          // Den Wert als neue Option zum Select Dropdown Menü hinzufügen:
          this.selectOptionsAufzaehlungswertNeueBaueigenschaft.push(
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

    tableSelectionChangedHandler: function(newSelection) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Setzt bei Auswahländerung in der Tabelle die ausgewaehlteBaueigenschaft entweder auf null oder die Auswahl
      // Intention: Quasar-Auswahl arbeitet auf einem (ein-elementigen, bei Single-Auswahl) Array, wir benötigten aber ein Objekt
      // -------------------------------------------------------------------------------------------------------------------------------
      if (newSelection.length > 0) {
        this.ausgewaehlteBaueigenschaft = newSelection[0];
      } else {
        this.ausgewaehlteBaueigenschaft = null;
      }
      this.$emit(
        "selection-changed-table-zugeordnete-baueigenschaften-baueigenschafts-profil",
        newSelection
      );
      // Sendet Event an die Elternkomponenten baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue  oder baueigenschafts-profile.vue
      // dass sich die ausgewählte Baueigenschaft in der QTable geändert hat!
    },

    // ACHTUNG: Die folgende Funktion wird auch für die q-table für die zugeordneten Bauinformationen benutzt!!!
    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      // Wird in q-tables für Baueigenschaften UND Bauinformationen verwewndet
      // Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      // Wird im Templates oben durch :pagination-label="getPaginationLabel" verwendet.
      // --------------------------------------------------------------------------------------------------------------------
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    getSelectedStringTableBaueigenschaften: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.selectedTableAlleBaueigenschaften.length === 0
        ? ""
        : `${this.selectedTableAlleBaueigenschaften.length} Eigenschaft${
            this.selectedTableAlleBaueigenschaften.length > 1 ? "en" : ""
          } ausgewählt`;
    },
    createSelectValueBauinformationenAusgewaehlterBaustoff(val, done) {
      // -------------------------------------------------------------------------------------------------------------------------------
      //
      // -------------------------------------------------------------------------------------------------------------------------------
    },

    resetToInitialState: function() {
      // -------------------------------------------------------------------------------------------------------------------------------
      //
      // -------------------------------------------------------------------------------------------------------------------------------
      this.copyOfPropBaueigenschaftsProfil = this.profilFactoryMethod(
        this.zuModifizierendesBaueigenschaftsProfil
      );
    },

    createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil: function() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Legt das in copyOfPropBaueigenschaftsProfil befindliche Profil im Backend entweder neu an oder updated es
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil()"
      );
      if (
        this.copyOfPropBaueigenschaftsProfil
          .baueigenschaftsProfilBezeichnung === ""
      ) {
        this.$emit(
          "error-bezeichnung-baueigenschafts-profil",
          "Neuanlage",
          "Der Profilname darf nicht leer sein."
        );
        // TODO XXXXXXX - Wo ist der Event Handler???
        // TODO XXXXXXX - Wo sind die Benutzernachrichten????
        return;
        // throw new Error("Der Profilname darf nicht leer sein.");
      }
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBaueigenschaftsprofile'");
      this.$socket.emit("leaveRoom", {
        room: "roomBaueigenschaftsprofile"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBaueigenschaftsprofile'");
      //=========================================================================================================================================
      if (this.modus === "Neuanlage") {
        console.log("Im Modus ", this.modus);
        this.$axios
          .post(
            process.env.API + "/Baueigenschaftsprofile",
            this.copyOfPropBaueigenschaftsProfil
          )
          .then(res => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_ERFOLG
            );
            // this.$emit("neuanlage-request-baueigenschafts-profil");
            // Event disabled, wird nicht mehr gebraucht, es gab auch keinen Event Handler dafür!
            // res.data enthält die id des neuangelegten Profils
            this.$emit(
              "refresh-request-baueigenschafts-profil",
              this.modus,
              res.data // Enthält id der neu angelegten Baueigenschaft vom Backend
            ); // Event an Elternkomponente, z.B.
            // baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue
            // oder baueigenschafts-profile.vue
          })
          .catch(err => {
            console.log(
              "In catch of createNeuesOderUpdateAusgewaehltesBaueigenschaftsProfil",
              err
            );
            console.log(err.response.status);
            this.$emit(
              "error-bezeichnung-baueigenschafts-profil",
              this.modus,
              err
            );
          });
      }
      if (this.modus === "Bearbeitung") {
        console.log(
          "Im Modus ",
          this.modus,
          this.copyOfPropBaueigenschaftsProfil
        );
        this.$axios
          .put(
            process.env.API +
              "/Baueigenschaftsprofile/" +
              this.copyOfPropBaueigenschaftsProfil._id +
              "/Baueigenschaften",
            this.copyOfPropBaueigenschaftsProfil
          )
          .then(res => {
            console.log(res);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_ERFOLG
            );
            this.$emit(
              "refresh-request-baueigenschafts-profil",
              this.modus // ACHTUNG: In diesem Fall darf NICHT der dritte Parameter mitgesendet werden wie oben (res.data)!!!
            ); // Event an Elternkomponente, z.B.
            // baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue
            // oder baueigenschafts-profile.vue
          })
          .catch(err =>
            this.$emit(
              "error-bezeichnung-baueigenschafts-profil",
              this.modus,
              err
            )
          );
      }
    },

    populateBauinformation(currentValue) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Führt eine Population basierend auf der _id einer Bauinformation mittels der in alleBauinformationen befindlichen Bauinformationen durch
      // -------------------------------------------------------------------------------------------------------------------------------
      if (typeof currentValue === "object") {
        return currentValue;
      } else {
        if (currentValue !== null) {
          console.log(
            "Felder in Bauinformation in typbezogener Baueigenschaft werden populiert"
          );
          return this.alleBauinformationen.find(
            arg => arg._id === currentValue
          );
        } else {
          return null;
        }
      }
    },

    profilFactoryMethod(arg) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Erstellt und returned Objekt vom Typ baueigenschaftsProfil basierend auf arg - bei null wird ein leeres Objekt hergestellt, sonst werden die
      // Felder aus dem arg befüllt (kommt normalerweise aus den Props)
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log("In profilFactoryMethod(arg) - Parameter arg: ", arg);
      if (arg !== null) {
        // this.inProfilEnthalteneBaueigenschaften = []
        this.inProfilEnthalteneBaueigenschaften = arg.zugeordneteBaueigenschaften.map(
          arg => arg.typbezogeneBaueigenschaft
        ); // Array mit typbezogenen Baueigenschaften
        const tmp = arg.zugeordneteBaueigenschaften.map(element => {
          // Populiert die Bauinformations-Felder in allen typbezogeneBaueigenschaften im Frontend
          // Diese werden z.B. in typbezogeneBaueigenschaft.bauinformation.bauinformationsBezeichnung etc. abgelegt
          element.typbezogeneBaueigenschaft.bauinformation = this.populateBauinformation(
            element.typbezogeneBaueigenschaft.bauinformation
          );
          return { ...element }; // Spread-Operator, bei null werden keine Felder eingefügt
        });
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = this.selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.filter(
          arg =>
            this.inProfilEnthalteneBaueigenschaften.findIndex(
              innerArg => innerArg._id === arg._id
            ) > -1
        );
        this.tableDataZugeordneteBaueigenschaften = arg.zugeordneteBaueigenschaften.map(
          arg => Object.assign({}, arg)
        );
        return {
          zugeordneteBaueigenschaften: tmp,
          baueigenschaftsProfilBezeichnung:
            arg.baueigenschaftsProfilBezeichnung,
          baueigenschaftsProfilBemerkung: arg.baueigenschaftsProfilBemerkung,
          baueigenschaftsProfilBeschreibung:
            arg.baueigenschaftsProfilBeschreibung,
          zugeordneteBauinformation: this.populateBauinformation(
            arg.zugeordneteBauinformation
          ),
          _id: arg._id
        };
      } else {
        // console.log("Zustand (missing arg):", arg); // Sinnlos, arg ist null und wurde oben schon ausgegeben!
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = [];
        return {
          zugeordneteBaueigenschaften: [],
          baueigenschaftsProfilBezeichnung: "",
          baueigenschaftsProfilBemerkung: null,
          baueigenschaftsProfilBeschreibung: null,
          zugeordneteBauinformation: null,
          _id: null
        };
      }
    },

    toggleSpaltenWertbezogeneAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Baueigenschaften die Spaltensichtbarkeit für die wertbezogenen Angaben
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.wertbezogeneAngabenAnzeigen) {
        for (let i = 0; i < this.wertbezogeneAngabenArray.length; i++) {
          this.visibleColumnsTableBaueigenschaften.push(
            this.wertbezogeneAngabenArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBaueigenschaften = this.visibleColumnsTableBaueigenschaften.filter(
          value => !this.wertbezogeneAngabenArray.includes(value)
        );
      }
    },

    toggleSpaltenKennwertbezogeneAngaben() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Baueigenschaften die Spaltensichtbarkeit für die kennwertbezogenen Angaben
      // -------------------------------------------------------------------------------------------------------------------------------
      if (this.kennwertbezogeneAngabenAnzeigen) {
        this.visibleColumnsTableBaueigenschaften.push("einheit");
        this.visibleColumnsTableBaueigenschaften.push("symbol");
        this.visibleColumnsTableBaueigenschaften.push("operator");
        this.visibleColumnsTableBaueigenschaften.push("formel"); // NEU
      } else {
        this.visibleColumnsTableBaueigenschaften = this.visibleColumnsTableBaueigenschaften.filter(
          value =>
            value !== "einheit" &&
            value !== "symbol" &&
            value !== "operator" &&
            value !== "formel"
        );
      }
    },

    toggleSpaltenWeitereTypbezogeneAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in der QTable für Baueigenschaften die Spaltensichtbarkeit für die fachlichen Angaben
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.weitereTypbezogeneAngabenAnzeigen) {
        this.visibleColumnsTableBaueigenschaften.push(
          "baueigenschaftsAnzeigeText"
        ); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push(
          "baueigenschaftsBemerkung"
        );
        this.visibleColumnsTableBaueigenschaften.push(
          "systemdefiniertNichtBenutzerdefiniert"
        ); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push("sollwertNichtIstwert"); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push(
          "bauinformationsBezeichnung"
        );
        this.visibleColumnsTableBaueigenschaften.push("bauinformationsTyp");
      } else {
        this.visibleColumnsTableBaueigenschaften = this.visibleColumnsTableBaueigenschaften.filter(
          value =>
            value !== "baueigenschaftsAnzeigeText" && // NEU: #514
            value !== "baueigenschaftsBemerkung" &&
            value !== "systemdefiniertNichtBenutzerdefiniert" && // NEU: #514
            value !== "sollwertNichtIstwert" && // NEU: #514
            value !== "bauinformationsBezeichnung" &&
            value !== "bauinformationsTyp"
          // TODO: && value !== "bauinformation"
        );
      }
    },

    toggleSpaltenSchutzKategorien() {
      // ----------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Baueigenschaften die Spaltensichtbarkeit für die Schutzkategorien
      // ----------------------------------------------------------------------------------------------------------------------
      // this.schutzKategorienAnzeigen = !this.schutzKategorienAnzeigen;
      if (this.schutzKategorienAnzeigen) {
        for (let i = 0; i < this.schutzKategorienArray.length; i++) {
          this.visibleColumnsTableBaueigenschaften.push(
            this.schutzKategorienArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBaueigenschaften = this.visibleColumnsTableBaueigenschaften.filter(
          value => !this.schutzKategorienArray.includes(value)
        );
      }
    },

    formatDate: function(val) {
      // --------------------------------------------------------------------------------------------------------------------
      // Helper function for Date Formatting
      // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
      // Sonst müssen sie nach methods: verschoben werden!
      // Die Mongoose Dates werden in Quasar z.B. so dargestellt: 2020-12-04T00:00:00.000Z
      // Siehe https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
      // Die bessere Lösung scheint die JS Library Momentjs zu sein (var moment : require('moment'), läuft in Node und Browser)
      // Mongoose kann anscheinend nur Dates mit Time: https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
      // Auch hier wird Momentjs empfohlen: https://stackoverflow.com/questions/53932266/how-to-convert-date-format-in-nodejs-using-mongoose
      // --------------------------------------------------------------------------------------------------------------------
      if (typeof val === "undefined" || val === null || val === "") {
        return;
      }
      // Ursprüngliche Variante mit eigener simpler Formatierung per Substring aus obigem Mongoose Format, das die ersten 10 Spalten abschneidet:
      // var yyyymmdd = val.substring(0, 10);
      // return yyyymmdd;

      // Stattdessen Quasar Date Utils (per obigem import { date } from 'quasar') benutzen:
      return date.formatDate(val, "DD.MM.YYYY"); // Wandelt das Datum in deutsches Format um
    },

    formatTime: function(val) {
      // --------------------------------------------------------------------------------------------------------------------
      // Helper function for Time of Day Formatting
      // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
      // Sonst müssen sie nach methods: verschoben werden!
      // Die Time of Days werden am Backend abgelegt als Strings im Format: "hh:mm" (war ursprünglich "hhmm")
      // Diese Fuktion formatiert sie um nach: "hh:mm"
      // Aktuell muss keine Umformatierung erfolgen!!!
      // --------------------------------------------------------------------------------------------------------------------
      if (typeof val === "undefined" || val === null || val === "") {
        return;
      }
      // return val.substring(0, 2) + ":" + val.substring(2, 4);
      return val;
    },

    selectAddHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: function(
      details
    ) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Fügt beim Hinzufügen eines Elements im QSelect ein darauf referenzierendes Element mit leeren Kennwerten
      // in zugeordneteBaueigenschaften des bearbeiteten Profils hinzu
      // details : in value steht die dem Model hinzugefügte typbezogeneBaueigenschaft
      // Intention: Da die zugeordnetenBaueigenschaften nicht vom Typ typbezogeneBaueigenschaft sondern vom vom vorgabewerteBaueigenschaft sind,
      // die Options im QSelect allerdings typbezogeneBaueigenschaften sind, ist die Nutzung eines v-models nicht direkt möglich. Es wird stehts ein neues Objekt vom Typ VorgabewerteBaueigenschaft hinzugefügt
      // Ferner ist zu beachten, dass die eingetragenen Vorgabewerte nicht überschrieben werden.
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log(details);
      if (
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.findIndex(
          arg => arg._id === details.value._id
        ) === -1
      ) {
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.push(
          details.value
        );
      }
      /*
      this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
        typbezogeneBaueigenschaft: details.value
      });
      */
    },

    selectRemoveHandlerBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: function(
      details
    ) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Siehe selectAddHandler
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log(details);
      this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.filter(
        arg => arg._id !== details.value._id
      );
    }
  },

  //========================================================================================================================================================
  watch: {
    inProfilEnthalteneBaueigenschaften: {
      // -------------------------------------------------------------------------------------------------------------------------------
      //
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      handler: function(val) {
        // Momentan ohne Funktion
        console.log(
          "In watch für inProfilEnthalteneBaueigenschaften - val: ",
          val
        );
      }
    },

    zuModifizierendesBaueigenschaftsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Watch auf Prop baueigenschaftsProfil!!!
      // Lädt bei Änderungen im Prop alle Daten dieser Komponente neu
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log("In watch für baueigenschaftsProfil - val: ", val);
        this.copyOfPropBaueigenschaftsProfil = this.profilFactoryMethod(val);
        if (
          this.ausgewaehlteBaueigenschaft !== null &&
          this.ausgewaehlteBaueigenschaft !== undefined
        ) {
          const idAusgewaehlteBaueigenschaft = this.ausgewaehlteBaueigenschaft
            .typbezogeneBaueigenschaft._id;
          console.log(
            "idAusgewaehlteBaueigenschaft: ",
            idAusgewaehlteBaueigenschaft
          );
          this.ausgewaehlteBaueigenschaft = this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.find(
            arg =>
              arg.typbezogeneBaueigenschaft._id === idAusgewaehlteBaueigenschaft
          );
          console.log(
            "ausgewaehlteBaueigenschaft: ",
            this.ausgewaehlteBaueigenschaft
          );
        }
      }
    },

    selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // watch auf prop um bei Prop-Änderung ein Neuladen durchzuführen
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log(
          "In watch für selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil - val:",
          val
        );
        this.selectFilterOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil = val;
      }
    }
  },

  //========================================================================================================================================================
  created() {
    console.log("In created() von details-tab-baueigenschafts-profil");
    this.toggleSpaltenWeitereTypbezogeneAngaben();
  }
};
</script>
<style>
.height-small {
  height: 18px;
}
</style>
<style lang="sass">
.stickyColumnsTable2HeaderLinesZugeordneteBaueigenschaften
  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Farben für Table mit 2 Header-Zeilen und Body: */
  /* #C0C0C0 ist HTML Silver, siehe https://www.w3schools.com/colors/colors_shades.asp */

  thead tr:first-child td:first-child /* Setzt Farbe der 1. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  thead tr:first-child  /* Setzt Farbe der gesamten 1. Header-Zeile, 1. Spalte bereits oben separat gesetzt  - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  /* Wegen Opacity-Änderung das folgende thead hinter das vorherige thead oben verschoben */
  thead tr:first-child td:nth-child(2) /* Setzt Farbe und Opacity der 1. Header-Zeile, 2. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.8

  thead tr:nth-child(2) td:first-child /* Setzt Farbe der 2. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  thead tr:nth-child(2) /* Setzt Farbe der gesamten 2. Header-Zeile, 1. Spalte bereits oben separat gesetzt  - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  /* Wegen Opacity-Änderung das folgende thead hinter das vorherige thead oben verschoben */
  thead tr:nth-child(2) th:nth-child(2) /* Setzt Farbe und Opacity der 2. Header-Zeile, 2. Spalte (th) */
    /* ACHTUNG: nth-Zählung zählt ALLE Typen von Children, auch das erste td in der 2. Row, daher hier für das th:nth-child(2) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.8

  td:first-child /* Setzt Farbe der 1. Spalte NUR im Table Body (ab 3. Zeile in Table mit 2 Header-Zeilen) - OK */
    background-color: #FFFFFF // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  tbody td:nth-child(2) /* Setzt Farbe der 2. Spalte in allen Zeilen im Body, überschreibt nicht die Header-Zeilen */
    background-color: #F5F5DC // ein Beige, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.9

  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Stickiness der 1. und 2. Spalte im Table Header (2 Zeilen) und im Body: */

  /* Definitionen für 1. Header-Zeile (thead tr: first-child) */
  thead tr:first-child th:first-child /* Setzt Stickiness in der 1. Header-Zeile (tr) für 1. Spalte (th:first-child, leeres Feld für Checkboxes) - OK  */
    position: sticky
    left: 0
    z-index: 1

  /* ACHTUNG: Offensichtlich hat sich in Quasar 1.8 das Rendering der 1. Header-Zeile geändert, es sind jetz dort: */
  /* 1. Spalte (Checkboxen - leer): th - früher war das ein td???  */
  /* 2. Spalte (Bezeichnung): th -- früher war das ein td??? */
  /* 3. Spalte (Aktivierungsmerkmale mit Unterspalten): th colspan=2 (bei 3 Unterspalten unter Aktivierungsmerkmalen) -- früher waren das tds, nicht ths!!! */
  /* ACHTUNG: Mit Wegfall von "obligatorisch" und "aktivierbar" ist colspan=1 für 3. Spalte!

  /* Setzt Stickiness in der 1. Header-Zeile (tr:first-child) für 2. Spalte (nth-child(2)) */
  /* ALT, vor Quasar 1.8 */
  /* thead tr:first-child td:nth-child(2) */ /* ALT: 2. td */
  /*   position: sticky */
  /*   left: 37px */
  /*   z-index: 1 */

  /* ALT, seit Quasar 1.8 */
  /* thead tr:first-child th:nth-child(2) */ /* NEU: 2. th */
  /*   position: sticky */
  /*   left: 37px */
  /*   z-index: 1 */

  /* NEU für 1. Header-Zeile, 2. Spalte (th:nth-child(2), Baueigenschafsbezeichnung) */
  /* NEU: Mit Ueberschrift in 1. Header-Zeile, braucht mehr Platz - 70px statt 37px */
  thead tr:first-child th:nth-child(2)
    position: sticky
    left: 70px
    z-index: 1

  /* Definitionen für 2. Header-Zeile (thead tr: n-th-child(2)) */
  /* NEU: Mit Ueberschrift in 1. Header-Zeile, braucht mehr Platz - 70px statt 37px */
  thead tr:nth-child(2) th:first-child /* Setzt Stickiness in der 2. Header-Zeile (tr) für 1. Spalte (th:first-child, Checkboxes) - OK  */
    position: sticky
    left: 0
    z-index: 1

  thead tr:nth-child(2) th:nth-child(2) /* Setzt Stickiness in der 2. Header-Zeile (tr) für 2. Spalte (th:nth-child(2), Baueigenschaftsbezeichnung) - OK  */
    position: sticky
    left: 70px
    z-index: 1

  tbody td:first-child /* Setzt Stickiness der 1. Spalte (td:first-child, Checkboxes) im Table Body (ab 3. Zeile in Table mit 2 Header-Zeilen) - OK */
    position: sticky
    left: 0
    z-index: 1

  tbody td:nth-child(2) /* Setzt Stickiness der 2. Spalte (td:nth-child(2), Baueigenschaftsbezeichnung) im Table Body (ab 3. Zeile in Table mit 2 Header-Zeilen) - OK */
    position: sticky
    left: 70px
    z-index: 1

/* Aktueller q-table Aufbau für Tabelle zugeordnete Bauinformationen: */
/* Header: */
/* q-tr für einzige Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung"), weitere q-ths für Spalten-Labels */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* ACHTUNG: Für die OHNE VSlots für Header und Body aufgebaute Tabelle für zugeordnete Bauinformationen mit einer Header-Zeile ist die Generierung */
/* von HTML <th>s und <td>s anders als bei der Tabelle für Baueigenschaften MIT VSlots für Header und Body und zwei Header-Zeilen!!! */
/* In der einzigen Header-Zeile wird hier für die erste (De-)Select All Checkbox Spalte ein <th> verwendet und auch sonst nur <th>s!!! */
/* Daher sind hier andere thead und tbody Definitionen erforderlich als für .stickyColumnsTable2HeaderLines */
</style>
