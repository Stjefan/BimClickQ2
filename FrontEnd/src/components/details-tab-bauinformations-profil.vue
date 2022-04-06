<!-- ============================================================================== -->
<!-- Komponente zur Verwaltung von Bauinformationsprofilen -->
<!-- DONE: Komplett überarbeitet aus Vorlage details-tab-baueigenschafts-profil.vue -->
<!-- ============================================================================== -->
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
      <q-tabs mobile-arrows
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="white"
        content-class="text-h7"
        dense
        align="left"
        v-model="selectedTab"
      >
        <q-tab
          name="angabenTabBauinformationsProfil"
          label="Angaben zum Bauinformationsprofil"
          no-caps
        />
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="beschreibungTabBauinformationsProfil"
          label="Beschreibung für Bauinformationsprofil"
          no-caps
          :disable="
            copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung ===
              ''
          "
        />
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="zugeordneteBauinformationenTabBauinformationsProfil"
          label="Zugeordnete Bauinformationen am Bauinformationsprofil"
          no-caps
          :disable="
            copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung ===
              ''
          "
        />
        <!-- Dieses Tab disabled für Bauinformationsprofile vs. Baueigenschaftsprofile -->
        <!--
        <q-tab
          v-if="modus === 'Bearbeitung'"
          name="vorgabeWerteTabBauinformationBauinformationsProfil"
          label="Vorgabewerte für ausgewählte Bauinformation am Bauinformationsprofil"
          no-caps
          :disable="
            ausgewaehlteBauinformation === null ||
              copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung ===
                ''
          "
        />
        -->
      </q-tabs>
      <q-tab-panels v-model="selectedTab" animated>
        <q-tab-panel name="angabenTabBauinformationsProfil" class="q-pa-xs">
          <q-card class="q-pa-xs">
            <!-- NEU - einheitlich mit anderen ähnlichen Formularen -->
            <div v-if="$q.screen.gt.sm">
              <p v-if="modus === 'Bearbeitung'" class="text-h6">
                Angaben zum ausgewählten Bauinformationsprofil <strong>"{{
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung
                }}"</strong>
              </p>
              <p class="text-h6" v-else>
                Details für neues Bauinformationsprofil
              </p>
            </div>
            <div v-else>
              <p v-if="modus === 'Bearbeitung'" class="text-subtitle1">
                Details zum ausgewählten Bauinformationsprofil <strong>"{{
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung
                }}"</strong>
              </p>
              <p class="text-subtitle1" v-else>
                Details für neues Bauinformationsprofil
              </p>
            </div>
            <div class="row full-width items-start q-pa-xs q-col-gutter-xs">
              <div class="col-md-4 col-12">
                <q-input
                  :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                  v-model="
                    copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung
                  "
                  label="Bezeichnung des Bauinformationsprofils"
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
                  hint="Eindeutige Bezeichnung für das Bauinformationsprofil"
                  hide-hint
                />
              </div>
              <br />
              <div class="col-md-4 col-12">
                <q-input
                  :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    copyOfPropBauinformationsProfil.bauinformationsProfilBemerkung
                  "
                  label="Bemerkung zum Bauinformationsprofil"
                  hint="Optionale Bemerkung zum Profil, z.B. 'Neu angelegt für Schallschutz'"
                  hide-hint
                  autogrow
                />
              </div>
              <div class="col-md-4 col-12">
                <!-- DONE - Es fehlt noch ein Feld bzw. eigenes Tab für die bauinformationsProfilBeschreibung (Markdown) -->
                <!-- DONE - Der Filter auf dem q-select funktioniert noch nicht! Siehe Vorlage in baueinheiten.vue -->
                <!-- NEU: @ms - Steuerung für Hint hinzugefügt über @focus, @blur, bottom-slots nach Vorlage in baueinheiten.vue -->
                <!-- ALT: -->
                <!--
                 v-model="zugeordneteBauinformation"
                :options="alleBauinformationen"
                -->
                <!-- ACHTUNG: QSelect aus details-tab-bauinformations-profil.vue (Vorlage) hier -->
                <!--          entfernt, weil Bauinformationsprofile im Gegensatz zu Baueigenschaftsprofilen hier keine einzelne Bauinformation -->
                <!--          zugeordnet haben im Model! -->
              </div>
            </div>
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ALT: style="width: 90%" -->
              <!-- NEU: type="submit" präventiv entfernt!!! -->
              <div class="col-md-4 col-12">
                <q-btn
                  :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                  color="positive"
                  glossy
                  class="stretch full-width" style="height:100%"
                  @click="
                    createNeuesOderUpdateAusgewaehltesBauinformationsProfil()
                  "
                  label="Bauinformationsprofil speichern"
                  no-caps
                />
              </div>
              <div class="col-md-4 col-12">
                <q-btn
                  :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                  color="deep-orange"
                  text-color="white"
                  glossy
                  class="stretch full-width" style="height:100%"
                  label="Eingaben zurücksetzen"
                  no-caps
                  @click="resetToInitialState"
                />
              </div>
            </div>
          </q-card>
        </q-tab-panel>
        <q-tab-panel
          name="beschreibungTabBauinformationsProfil"
          class="q-pa-xs"
        >
          <beschreibungTabBauinformationsProfil
            :bauinformationsProfil="copyOfPropBauinformationsProfil"
            :bauinformationsProfilBeschreibung="
              copyOfPropBauinformationsProfil.bauinformationsProfilBeschreibung
            "
            @refresh-request-bauinformations-profil="
              $emit('refresh-request-bauinformations-profil', $event)
            "
          />
          <!-- @refresh-request-bauinformations-profil handelt Refresh Request aus der Kindkomponente für die Beschreibung -->
          <!-- In diesem Fall wird der Refresh Request als neues Event an die Elternkomponenten propagiert -->
          <!-- Das sind bauinformations-profile.vue und bauinformations-profile-tab-baustoffe-und-baueinheiten.vue!!! -->
          <!-- Hinweis: $emit(...) ist der Handler dieses Events. Er hat keine definierten Parameter (außer dem Eventnamen "refresh-request-bauinformations-profil"). -->
          <!-- $event ist eine Variable, die die Daten des angekommenen Events enthält und diese weiterschickt -->
        </q-tab-panel>
        <q-tab-panel
          class="q-pa-xs"
          name="zugeordneteBauinformationenTabBauinformationsProfil"
        >
          <div>
            <div v-if="$q.screen.gt.sm">
              <div
                v-if="
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung !==
                    null
                "
                class="q-pa-sm text-h6"
              >
                Zugeordnete Bauinformationen am ausgewählten Bauinformationsprofil
                <strong>"{{
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung
                }}"</strong>
              </div>
              <div class="q-pa-sm text-h6" v-else>
                Zugeordnete Bauinformationen am neuen Bauinformationsprofil
              </div>
            </div>
            <div v-else>
              <div
                v-if="
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung !==
                    null
                "
                class="q-pa-sm text-subtitle1"
              >
                Zugeordnete Bauinformationen am ausgewählten Bauinformationsprofil
                <strong>"{{
                  copyOfPropBauinformationsProfil.bauinformationsProfilBezeichnung
                }}"</strong>
              </div>
              <div class="q-pa-sm text-subtitle1" v-else>
                Zugeordnete Bauinformationen am neuen Bauinformationsprofil
              </div>
            </div>
            <!-- ALT: :row-key="row => row.typbezogeneBauinformation._id" -->
            <!-- NEU: :row-key="row => row-_id" -->
            <!-- ACHTUNG: CSS Class "sticky-colunmns-table-2-header-lines" ist wie in Vorlage baueigenschafts-profile.vue -->
            <!-- außerhalb in uebersicht-tab-bauinformations-profile.vue deklariert!!! -->
            <!-- TODO XXXXXX -->
            <q-table
              color="primary"
              :rows="tableDataZugeordneteBauinformationen"
              :columns="columnsAlleBauinformationen"
              :visible-columns="visibleColumnsTableBauinformationen"
              :row-key="row => row._id"
              :selected.sync="selectedTableAlleBauinformationen"
              :filter="filterTableBauinformationen"
              @update:selected="tableSelectionChangedHandler"
              selection="single"
              dense
              separator="cell"
              rows-per-page-label="Einträge pro Seite"
              :pagination.sync="paginationTableBauinformationen"
              :pagination-label="getPaginationLabel"
              :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
              :selected-rows-label="getSelectedStringTableBauinformationen"
               v-bind:class="{ stickyColumnsTable2HeaderLinesZugeordneteBauinformationen: $q.screen.gt.sm }"
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
                      v-model="filterTableBauinformationen"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1 col-12"></div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Allgemeine Angaben"
                      v-model="allgemeineAngabenAnzeigen"
                      @input="toggleSpaltenAllgemeineAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Herausgeberangaben"
                      v-model="herausgeberAngabenAnzeigen"
                      @input="toggleSpaltenHerausgeberAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Normangaben"
                      v-model="normAngabenAnzeigen"
                      @input="toggleSpaltenNormAngaben()"
                    />
                  </div>
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Normkategorien"
                      v-model="normKategorienAnzeigen"
                      @input="toggleSpaltenNormKategorien()"
                    />
                  </div>
                  <!--
                  <div class="col-md-2 col-12">
                    <q-toggle
                      label="Wertbezogene Angaben"
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
                    >Bauinformationsbezeichnung</q-th
                  >
                  <!-- Achtung: Mit <div v-if=..." funktioniert die folgende Steuerung NICHT!!! -->
                  <!-- Die v-ifs müssen direkt an q-th sein!!! -->
                  <!-- -->
                  <!-- Relikt aus Vorlage details-tab-baueigenschafts-profi.vue, disabled: -->
                  <!--
                  <q-th
                    v-if="aktivierungsMerkmaleAnzeigen"
                    colspan="1"
                    align="center"
                    >Aktivierungzustand (TODO XXXXXX)</q-th
                  >
                  -->
                  <!-- ALT: Kennwertbezogene Angaben waren nested innerhalb der wertbezogenen Angaben -->
                  <!-- Dies führte bei den neue eingeführten Kategorieüberschriften in der ersten Header-Zeile dann zu Fehlern bei diversen -->
                  <!-- Sonderfällen, falls wertbezogene und kennwertbezogene Angaben beide ausgeschaltet wurden, -->
                  <!-- oder wertbezogene Angaben ausgeschaltet wurden, während kennwertbezogene Angaben noch an waren -->
                  <!-- Dann blieben falsche Überschriften stehen, selbst wenn man an den v-ifs doppelte -->
                  <!-- Kombinationen der beiden abprüft -->
                  <!-- NEU: Kennwertbezogene Angaben vor die wertbezogenen Angaben verschoben -->
                  <!-- ACHTUNG: colspan ist 8 + 6 + 5, falls Herausgeber- und Normangaben mit angezeigt werden -->
                  <q-th
                    v-if="allgemeineAngabenAnzeigen"
                    colspan="8"
                    align="center"
                    >Allgemeine Angaben</q-th
                  >
                  <!-- NEU: Im folgenden <q-th colspan="11"> statt <q-th colspan="9"> wegen Hinzunahme zweier Spalten für Tageszeit1/2 -->
                  <q-th
                    v-if="herausgeberAngabenAnzeigen"
                    colspan="6"
                    align="center"
                    >Herausgeberangaben</q-th
                  >
                  <q-th
                    v-if="normAngabenAnzeigen"
                    colspan="5"
                    align="center"
                    >Normanangaben</q-th
                  >
                  <q-th
                    v-if="normKategorienAnzeigen"
                    colspan="10"
                    align="center"
                    >Normkategorien</q-th
                  >
                  <!--
                  <q-th
                    v-if="wertbezogeneAngabenAnzeigen"
                    colspan="7"
                    align="center"
                    >Wertbezogene Merkmale</q-th
                  >
                  -->
                </q-tr>
                <!-- 2. Header-Zeile, diese funktionierte im Gegensatz zur ersten sofort tadellos, da ohne v-ifs -->
                <q-tr :props="props">
                  <!-- Erste Spalte, reserviert für Checkboxes: -->
                  <q-th>
                    <!-- Checkbox für "Select/Deselect All" bei selection="multiple", muss explizit generiert werden -->
                    <!-- TODO: Sollte "-" anzeigen, wie Quasar es selbst macht??? -->
                    <q-checkbox
                      v-if="selectionModeTableBauinformationen === 'multiple'"
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
                    <!-- Folgender Code, um die Bauinformationsbezeichnungsspalte optisch hervorzuheben, bringt leider die Column-Höhe durcheinander auskommentiert: -->
                    <!--
                    <div v-if="col.label=='Bauinformationsbezeichnung'" class="text-red">{{col.label}}</div>
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
                  <!-- später auch für die Spalte für die Bauinformationsbezeichnung definiert, nun diese zentral hier für alle Spalten definiert: -->
                  <!-- TODO: Man könnte später selektiv auch noch andere Aktionen anbieten je nach Spalte/Zeile, z.B. auf den Link-Spalten -->
                  <!-- Dabei ist die (per Maus angewählte) Spalte in col.name, die Zeile in props.row enthalten, siehe Debug Info Kontextmenü unten -->
                  <!-- ================================================================================================================================ -->
                  <!-- TODO XXXXXX - Hier eventuell weitere Kontextmenüs, z.B. zum Öffnen von Links -->
                  <q-menu touch-position context-menu>
                    <q-list dense style="min-width: 100px">
                      <!-- NEU: Externen Link öffnen -->
                      <q-item
                        :disable="props.row.referenzAufBauinformation.externerLink==null || props.row.referenzAufBauinformation.externerLink===''"
                        clickable
                        v-close-popup
                        @click="contextMenuHandler(props.row, 'oeffneExternenLink')
                        "
                      >
                        <q-item-section
                          >Bauinformation auswählen und externen Link
                          öffnen</q-item-section
                        >
                      </q-item>
                      <!-- NEU: Internen Link öffnen -->
                      <q-item
                        :disable="props.row.referenzAufBauinformation.internerLink==null || props.row.referenzAufBauinformation.internerLink===''"
                        clickable
                        v-close-popup
                        @click="contextMenuHandler(props.row, 'oeffneInternenLink')
                        "
                      >
                        <q-item-section
                          >Bauinformation auswählen und internen Link
                          öffnen</q-item-section
                        >
                      </q-item>
                      <!-- ALT - aus Vorlage für Baueigenschaftsprofile, disabled: -->
                      <!--
                      <q-item
                        clickable
                        v-close-popup
                        @click="contextMenuHandler(props.row)"
                      >
                        <q-item-section>
                          Bauinformation auswählen und Vorgabewerte
                          anzeigen/bearbeiten
                        </q-item-section>
                      </q-item>
                      -->
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
              Aktion für dem Profil zugeordnete Bauinformation
              {{ displayRightArrow }}
              <br />
              <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
              Mit &nbsp;
              <q-checkbox v-model="alwaysOn" disable dense color="primary" />
              &nbsp; in erster Spalte Bauinformation auswählen. Alternativ mit
              rechter Maustaste Kontextmenü aufrufen.
              <!-- <br />&nbsp;
            <br /> -->
            </div>
            <!-- Disabled für Bauinformationsprofile statt Baueigenschaftsprofile: -->
            <!--
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
            -->
            <!-- TODO XXXXXX: Filter am q-select fehlt noch! Siehe Vorlage in baueinheiten.vue -->
            <!-- ACHTUNG: Prop style="width: 720px" am q-select entfernt, da sonst Konflikt mit <div class="col-4"> -->
            <!--
            <div class="col-md-2 col-12"></div>
            -->
            <!-- Folgendes Feld vergrößert für lange Bezeichnungen von Bauinformationen: -->
            <div class="col-md-7 col-12">
              <div>
                <q-select
                  :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  filled
                  :value="
                    selectValuesBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  :options="
                    selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  option-label="bauinformationsBezeichnung"
                  label="Dem Profil zugeordnete Bauinformationen auswählen/abwählen"
                  stack-label
                  use-chips
                  :multiple="true"
                  options-selected-class="text-primary"
                  options-dense
                  use-input
                  input-debounce="0"
                  bottom-slots
                  @new-value="
                    createSelectValueBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @filter="
                    selectFilterFunctionBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @add="
                    selectAddHandlerBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @remove="
                    selectRemoveHandlerBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @focus="
                    showHintSelectBauinformationenAusgewaehltesBauinformationsProfil = true
                  "
                  @blur="
                    showHintSelectBauinformationenAusgewaehltesBauinformationsProfil = false
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
                    selectValuesBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  :options="
                    selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  option-label="bauinformationsBezeichnung"
                  label="Zugeordnete Bauinformationen auswählen/abwählen"
                  stack-label
                  use-chips
                  :multiple="true"
                  options-selected-class="text-primary"
                  options-dense
                  use-input
                  input-debounce="0"
                  bottom-slots
                  @new-value="
                    createSelectValueBauinformationenAusgewaehltesBauinformationsProfil
                    "
                  @filter="
                      selectFilterFunctionBauinformationenAusgewaehltesBauinformationsProfil
                    "
                  @add="
                    selectAddHandlerBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @remove="
                    selectRemoveHandlerBauinformationenAusgewaehltesBauinformationsProfil
                  "
                  @focus="
                    showHintSelectBauinformationenAusgewaehltesBauinformationsProfil = true
                  "
                  @blur="
                    showHintSelectBauinformationenAusgewaehltesBauinformationsProfil = false
                  "
                -->
                  <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                  <template
                    v-slot:append
                    v-if="
                      selectValuesBauinformationenAusgewaehltesBauinformationsProfil
                    "
                  >
                    <q-icon name="search" @click.stop />
                    <!-- NEU: Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                    <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                    <q-icon
                      name="cancel"
                      @click.stop="
                        selectValuesBauinformationenAusgewaehltesBauinformationsProfil = []
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
                  <!-- Per v-if="showHintSelectBauinformationenAusgewaehltesBauinformationsProfil" und native Vue Events: -->
                  <!-- @focus="showHintSelectBauinformationenAusgewaehltesBauinformationsProfil=true" -->
                  <!-- @blur="showHintSelectBauinformationenAusgewaehltesBauinformationsProfil=false" -->
                  <template
                    v-slot:hint
                    v-if="
                      showHintSelectBauinformationenAusgewaehltesBauinformationsProfil
                    "
                  >
                    <ul class="q-pl-xs">
                      <li>
                        <strong>Filtern:</strong> TODO XXXXXXX - Eine
                        Bauinformationsbezeichnung (z.B. "dynamische
                        Steifigkeit") oder einen Bauinformationstyp
                        (z.B."Kennwert") als Filtertext in das Eingabefeld
                        eingeben. Auch unvollständige Angaben (z.B. "Steif")
                        sind möglich. Dies filtert die im Dropdown-Menü
                        angezeigten Optionen.
                      </li>
                      <li>
                        <strong>Auswählen:</strong> Dem Bauinformationsprofil
                        zugeordnete Bauinformationen im Dropdown-Menü auswählen.
                      </li>
                      <li>
                        <strong>Abwählen:</strong> Ausgewählte Bauinformationen
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
                      <!-- {{ scope.opt.bauinformationsBezeichnung }} -->
                      <!-- ACHTUNG - hier NICHT: scope.opt.benutzerKennung !!! -->
                      <!-- ACHTUNG: Bzgl. Sanitization wird hier für die Anzeige im q-chip kein v-html verwendet, sondern wie unten bei den Options nur Moustaches -->
                      <!-- NEU: Long Label Truncation, mit Tooltip der vollen Bezeichnung, mittels spezieller CSS Class "ellipsis": -->
                      <!-- Damit Truncation für lange Texte an QChip - Vorlage: https://quasar.dev/vue-components/chip#Example--Long-label-truncation -->
                      <div class="ellipsis">
                        {{ scope.opt.bauinformationsBezeichnung }}
                        <q-tooltip :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4">{{
                          scope.opt.bauinformationsAnzeigeText
                        }}</q-tooltip>
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
                          v-html="scope.opt.bauinformationsBezeichnung"
                        />
                        <q-item-label caption>{{
                          scope.opt.werteTyp
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
            <div class="col-md-3 col-12">
              <!-- ALT: type="submit" -->
              <q-btn
                :disable="!benutzerDarfBearbeitenBauinformationsprofil"
                color="positive"
                glossy
                class="stretch full-width"
                @click="
                  ordneZuBauinformationenAusgewaehltesBauinformationsProfil()
                "
                label="Die dem Profil zugeordneten Bauinformationen speichern"
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
                @click="createNeuesOderUpdateAusgewaehltesBauinformationsProfil()"
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
        <!-- Disabled für Bauinformationsprofile vs. Baueigenschaftsprofile: -->
        <!--
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
            @refresh-request-bauinformations-profil="
              $emit('refresh-request-bauinformations-profil', $event)
            "
          />
          -->
        <!-- Refresh Request der Kindkomponente von details-tab-bauinformations-profil.vue löst seinerseits Refresh Request von details-tab-bauinformations-profil.vue aus, -->
        <!-- auf dieses Event wird in deren Elternkomponente (bauinformations-profile.vue) gehört -->
        <!-- 21.07.2020:  @refresh-request-bauinformations-profil="$emit('refresh-request-bauinformations-profil', modus)" -->
        <!-- Hinweis: $emit(...) ist der Handler dieses Events. Er hat keine definierten Parameter (außer dem Eventnamen "refresh-request-bauinformations-profil"). -->
        <!-- $event ist eine Variable, die die Daten des Events enthält -->
        <!-- </q-tab-panel> -->
      </q-tab-panels>
      <!-- </q-card> -->
    </div>
  </div>
</template>
//***==========================================================================================================================================================
<script>
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil from "./vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue"; // Disabled für Baunformationsprofile
import beschreibungTabBauinformationsProfil from "../components/beschreibung-tab-bauinformations-profil.vue";
import { date, copyToClipboard, Loading, QSpinnerGears, Notify } from "quasar";
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  components: {
    // vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil,// Disabled für Baunformationsprofile
    beschreibungTabBauinformationsProfil
  },
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  props: {
    zuModifizierendesBauinformationsProfil: {
      // ACHTUNG: Unten Watch auf dieser Prop bauinformationsProfil!!!
      default: null
    },
    modus: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return ["Bearbeitung", "Neuanlage"].includes(value);
      }
    },
    selectOptionsBauinformationenAusgewaehltesBauinformationsProfil: Array,
    alleBauinformationen: Array
  },
  //=============================================================================================================================================
  // ACHTUNG: Zusätzlich verwendet die Komponente 2 Events: Diese werden beim Aufruf jeweils an eine Funktion gebunden in der Elternkomponente!!!
  // @refresh-request-bauinformations-profil
  // @error-bezeichnung-bauinformations-profil
  //=============================================================================================================================================
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore,
      selectValuesBauinformationenAusgewaehltesBauinformationsProfil: null,
      tableDataZugeordneteBauinformationen: [], // TODO XXXXXX
      filterTableBauinformationen: "",
      ausgewaehlteBauinformation: null,
      selectionModeTableBauinformationen: "single",
      allgemeineAngabenAnzeigen: true, // Zeigt die folgenden ersten 8 Spalten plus "bauinformationsBezeichnung" an
      visibleColumnsTableBauinformationen: [
        // Array, der die sichtbaren Columns in q-table über ein v-model steuert
        // Allgemeine Angaben:
        "bauinformationsBezeichnung",
        "bauinformationsAnzeigeText", // NEU
        "bauinformationsTyp",
        "benutzerKennungenAutoren", // NEU
        "bauinformationsBemerkung",
        "gültigkeitsDatumVon",
        "gültigkeitsDatumBis",
        "externerLink",
        "internerLink",
         // Herausgeberangaben:
         /*
        "herausgeberGeografie",
        "herausgeberInstitution",
        "herausgeberBezeichnung",
        "herausgeberBundeslandDeutschland",
        "herausgeberBundeslandÖsterreich",
        "herausgeberKantonSchweiz",
        */
        // Normangaben:
        /*
        "normTypDIN",
        "normTypÖNORM",
        "normTypSN",
        "normTypEN",
        "normTypISO",
        */
        // Normkategorien:
        /*
        "grundNorm",
        "terminologieNorm",
        "prüfNorm",
        "produktNorm",
        "verfahrensNorm",
        "dienstleistungsNorm",
        "schnittstellenNorm",
        "deklarationsNorm",
        "fachbereichsNorm",
        "werkNorm"
        */
      ],
      herausgeberAngabenAnzeigen: false,
      herausgeberAngabenArray: [
        "herausgeberGeografie",
        "herausgeberInstitution",
        "herausgeberBezeichnung",
        "herausgeberBundeslandDeutschland",
        "herausgeberBundeslandÖsterreich",
        "herausgeberKantonSchweiz"
      ],
      normAngabenAnzeigen: false,
      normAngabenArray: [
        "normTypDIN",
        "normTypÖNORM",
        "normTypSN",
        "normTypEN",
        "normTypISO",
      ],
      normKategorienAnzeigen: false,
      normKategorienArray: [
        "grundNorm",
        "terminologieNorm",
        "prüfNorm",
        "produktNorm",
        "verfahrensNorm",
        "dienstleistungsNorm",
        "schnittstellenNorm",
        "deklarationsNorm",
        "fachbereichsNorm",
        "werkNorm"
      ],
      // aktivierungsMerkmaleAnzeigen: false, // Disabled, Relikt aus details-tab-baueigenschafts-profil.vue
      alwaysOn: true, // Für Checkbox in statischem Textfeld zur Erklärung der Button-Aktionen auf der QTable
      alwaysOff: false, // Dito
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      // selectedTab: "beschreibungTabBauinformationsProfil", // TODO XXXXXX - Temporär geändert zum Test darauf, hilft aber nichts
      selectedTab: "angabenTabBauinformationsProfil",
      paginationTableBauinformationen: {
        sortBy: "bauinformationsBezeichnung", // HINWEIS: Hier stand ursprünglich nur "Name"!!!
        // Es sollte aber laut q-table API Doc ein Column name (from colummn definition)" sein!!!
        descending: false,
        page: 1,
        rowsPerPage:
          globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // ALT: 15 // Für FHD Laptops
        // rowsNumber: xx if getting data from a server
        // rowsNumber ist laut https://quasar.dev/vue-components/table#Pagination nur relevant bei Server Side Pagination!!!
        // Dann müsste rowsNumber mit dem aktuellen Wert der Zeilen in der q-table für die Bauinformationen initialisiert und ggf. updated werden,
        // z.B. in computed: selectedNodeTreeBaustoffe (wird aufgerufen, wenn sich der selected Node im Baustoffbaum ändert)
        // unter Verwendung von selectedNodeTreeBaustoffe.baueigenschaften.length, wenn dieses initialisiert und geändert wird
      },

      copyOfPropBauinformationsProfil: null, // this.profilFactoryMethod(this.profil)
      // alleBauinformationen: [], // TODO XXXXXX - aus Vorlage für Baueigenschaftsprofile, duplicated Key, weil auch Prop!!!

      selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil: this
        .alleBauinformationen,
      // selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil: [], // TODO XXXXXX - aus Vorlage für Baueigenschaftsprofile, duplicated Key für letzte Zeile!!!
      showHintSelectBauinformationenAusgewaehltesBauinformationsProfil: true,
      showHintSelectBauinformationAusgewaehltesBauinformationsProfil: true,
      inProfilEnthalteneBauinformationen: null,

      selectedTableAlleBauinformationen: [],

      columnsAlleBauinformationen: [
        // DONE: Hier Komplettüberarbeitung für Bauinformationen statt Baueigenschaften (in Vorlage details-tab-baueigenschafts-profile.vue)
        // Spaltendefinitionen für q-table - Vorlage ist bauinformatione.vue
        // Bei Boolean-Felder zusätzlich hinzugenommen: type: "toggle" - triggert Anzeige von Checkboxes
        //====================================================================================================================================
        // TODO XXXXXX: Als Quickfix unten an allen Columns eingefügt: field: row => row.referenzAufBauinformation.feldName,
        //                                                      statt: field: feldName,
        // Ohne diesen Quickfix bleiben die einzelnen Felder in der QTable leer!
        //====================================================================================================================================
        {
          name: "bauinformationsBezeichnung",
          required: true,
          label: "Bezeichnung",
          align: "left",
          field: row => row.referenzAufBauinformation.bauinformationsBezeichnung,
          // format: val => `${val}`, // Offenbar überflüssigg
          // Zu $ Symbols in Vue, z.B. "format: val => `${val}`," siehe Hinweise in interner BIM.click Dokumentation!
          /*------------------------------------------------------------------------------------------------------------------//
          Aus der QTable Doc:
          (optional) you can format the data with a function: format: (val, row) => `${val}%`
          Anderes Beispiel: format: val => date.formatDate(val, ‘DD-MM-YYYY’)
          Es können auch Funktionen (mit .this !!!) aufgerufen werden:
          format: (val) => this.displayCheckMark(val) mit val: Boolean
          //------------------------------------------------------------------------------------------------------------------*/
          sortable: true
          /* Auch hier können Funktionen verwendet werden:
          sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          */
        },
        {
          name: "bauinformationsAnzeigeText", // NEU
          align: "left",
          label: "Anzeigetext",
          field: row => row.referenzAufBauinformation.bauinformationsAnzeigeText,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "bauinformationsTyp",
          align: "left",
          label: "Typ",
          field: row => row.referenzAufBauinformation.bauinformationsTyp,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "benutzerKennungenAutoren", // NEU
          align: "left",
          label: "Autoren",
          field: row => row.referenzAufBauinformation.benutzerKennungenAutoren,
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell viele Benutzerkennungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // Nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "bauinformationsBemerkung",
          align: "left",
          label: "Bemerkung",
          field: row => row.referenzAufBauinformation.bauinformationsBemerkung,
          // // format: val => `${val}`, // Offenbar überflüssig
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bemerkungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        // Gültigkeit:
        {
          name: "gültigkeitsDatumVon",
          align: "left",
          label: "Gültig von",
          field: row => row.referenzAufBauinformation.gültigkeitsDatumVon,
          format: val => this.formatDate(val),
          sortable: true
        },
        {
          name: "gültigkeitsDatumBis",
          align: "left",
          label: "Gültig bis",
          field: row => row.referenzAufBauinformation.gültigkeitsDatumBis,
          format: val => this.formatDate(val),
          sortable: true
        },
        // Links:
        {
          name: "externerLink",
          align: "left",
          label: "Externer Link",
          field: row => row.referenzAufBauinformation.externerLink,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Links hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "internerLink",
          align: "left",
          label: "Interner Link",
          field: row => row.referenzAufBauinformation.internerLink,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Links hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        // Herausgeberangaben:
        {
          name: "herausgeberGeografie",
          align: "left",
          label: "Geografie",
          field: row => row.referenzAufBauinformation.herausgeberGeografie,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "herausgeberInstitution",
          align: "left",
          label: "Institution",
          field: row => row.referenzAufBauinformation.herausgeberInstitution,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "herausgeberBezeichnung",
          align: "left",
          label: "Herausgeber",
          field: row => row.referenzAufBauinformation.herausgeberBezeichnung,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "herausgeberBundeslandDeutschland",
          align: "left",
          label: "Bundesland (D)",
          field: row => row.referenzAufBauinformation.herausgeberBundeslandDeutschland,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "herausgeberBundeslandÖsterreich",
          align: "center",
          label: "Bundesland (AU)",
          field: row => row.referenzAufBauinformation.herausgeberBundeslandÖsterreich,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "herausgeberKantonSchweiz",
          align: "left",
          label: "Kanton (CH)",
          field: row => row.referenzAufBauinformation.herausgeberKantonSchweiz,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        // Normtypen:
        {
          name: "normTypDIN",
          align: "left",
          label: "Normtyp (DIN)",
          field: row => row.referenzAufBauinformation.normTypDIN,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "normTypÖNORM",
          align: "center",
          label: "Normtyp (ÖNORM)",
          field: row => row.referenzAufBauinformation.normTypÖNORM,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "normTypSN",
          align: "center",
          label: "Normtyp (SN)",
          field: row => row.referenzAufBauinformation.normTypSN,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "normTypEN",
          align: "left",
          label: "Normtyp (EN)",
          field: row => row.referenzAufBauinformation.normTypEN,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        {
          name: "normTypISO",
          align: "left",
          label: "Normtyp (ISO)",
          field: row => row.referenzAufBauinformation.normTypISO,
          // format: val => `${val}`, // Offenbar überflüssig
          sortable: true
        },
        // Normkategorien:
        {
          name: "grundNorm",
          align: "center",
          label: "Grundnorm",
          // format: val => `${val}`, // Offenbar überflüssig
          field: row => row.referenzAufBauinformation.grundNorm,
          // format: val => this.displayCheckMark(val), // Alternative Lösung mit Unicode Checkmarks statt q-checkboxes
          sortable: true,
          type: "toggle"
        },
        {
          name: "terminologieNorm",
          align: "center",
          label: "Terminologienorm",
          // format: val => `${val}`, // Offenbar überflüssig
          field: row => row.referenzAufBauinformation.terminologieNorm,

          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "prüfNorm",
          align: "center",
          label: "Prüfnorm",
          field: row => row.referenzAufBauinformation.prüfNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "produktNorm",
          align: "center",
          label: "Produktnorm",
          field: row => row.referenzAufBauinformation.produktNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "verfahrensNorm",
          align: "center",
          label: "Verfahrensnorm",
          field: row => row.referenzAufBauinformation.verfahrensNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "dienstleistungsNorm",
          align: "center",
          label: "Dienstleistungsnorm",
          field: row => row.referenzAufBauinformation.dienstleistungsNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "schnittstellenNorm",
          align: "center",
          label: "Schnittstellennorm",
          field: row => row.referenzAufBauinformation.schnittstellenNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "deklarationsNorm",
          align: "center",
          label: "Deklarationsnorm",
          field: row => row.referenzAufBauinformation.deklarationsNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "fachbereichsNorm",
          align: "center",
          label: "Fachbereichsnorm",
          field: row => row.referenzAufBauinformation.fachbereichsNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        {
          name: "werkNorm",
          align: "center",
          label: "Werknorm",
          field: row => row.referenzAufBauinformation.werkNorm,
          // format: val => `${val}`, // Offenbar überflüssig
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        }
      ]
    };
  }, // /data()

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBauinformationsprofil: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an Bauinformationen
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenBauinformationsprofile
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeitenauBauinformationsprofile
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
    selectValuesBauinformationenAusgewaehltesBauinformationsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Schon in Vorlage disabled!!!
      // -------------------------------------------------------------------------------------------------------------------------------
      get: function() {
        console.log(
          "In computed getter für selectValuesBauinformationenAusgewaehltesBauinformationsProfil",
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
      // Wird als Model für das q-select zur Auswahl der Bauinformation am ausgewählten Bauinformationsprofil verwendet!
      // Beim Set des v-models wird im Setter unten copyOfPropBauinformationsProfil.zugeordneteBauinformation updated!
      // Dieser Code wurde von @sts zur Adressierung des null-Falls entwickelt
      // HINWEIS: Auf Heroku kam ursprünglich bei Anwahl eines Bauinformationsprofils mit leerer Bauinformation in der Tabelle im Tab "Übersicht aller Bauinformationsprofile" ein Fehler "TypeError: Cannot read
      // property '_id' of undefined" - dieser Fehler verschwand jedoch, seit alle Bauinformationsprofile in der Datenbank (überprüfbar mit MongoDB Compasss) wenigstens ein Bauinformationsprofil mit dem Feld zugeordneteBauinformation = null
      // statt gar keinem solchen Feld angelegt haben!
      // -------------------------------------------------------------------------------------------------------------------------------
      get: function() {
        console.log("In computed getter für ausgewaehltesBauinformation");
        if (
          this.copyOfPropBauinformationsProfil.zugeordneteBauinformation !==
          null
        ) {
          const result = this.alleBauinformationen.find(
            arg =>
              arg._id ===
              this.copyOfPropBauinformationsProfil.zugeordneteBauinformation._id
          ); // this.neueBauinformation.bauinformation
          return result !== undefined ? result : null;
        } else return null;
      },
      set: function(value) {
        console.log(
          "In computed setter für zugeordneteBauinformation - value: ",
          value
        );
        this.copyOfPropBauinformationsProfil.zugeordneteBauinformation = value;
      }
    }
  }, // /computed:

  //***==================================================================================================================================================

  //=======================================================================================================================================================
  methods: {
    contextMenuHandler(rowOfContextMenu, aktion) {
      //--------------------------------------------------------------------------------------------------------
       // Zuerst Selection-Array leeren und anschließend mit Array-Operation die ausgewaehlte row hinzufügen
      this.selectedTableAlleBauinformationen.splice(
        0,
        this.selectedTableAlleBauinformationen.length
      );
      this.selectedTableAlleBauinformationen.push(rowOfContextMenu);
      // Aufruf der Funktion, um allen Komponenten mitzuteilen, dasss sich die Selection geändert hat
      this.tableSelectionChangedHandler(this.selectedTableAlleBauinformationen);
      //----------------------------------------------------------------------------------------------------------
      if (aktion === "oeffneExternenLink") {
        // NEU: Externen Link in neuem Tab öffnen - Vorlage: Siehe baueinheiten.vue
        let win = window.open(
          rowOfContextMenu.referenzAufBauinformation.externerLink,
          "_blank"
        );
        win.focus();
      } else { // Oeffne internen Link
         // TODO XXXXXX - Code ist vorläufig, Test lokal okay, auf Heroku noch ausstehend
         let win = window.open(process.env.fileAPI + "/" +
          rowOfContextMenu.referenzAufBauinformation.internerLink,
          "_blank"
        );
        win.focus();
      }
      //----------------------------------------------------------------------------------------------------------
      // ALT:
      // Anschließend auf das Vorgabewerte-Tab wechseln - dieses existiert hier nicht!!!
      // console.log("TODO XXXXXX - Tab für Vorgabewerte existiert hier nicht!!!");
      // this.selectedTab = "vorgabeWerteTabBaueigenschaftBaueigenschaftsProfil"; // TODO XXXXXX - existiert nicht für Baueigenschaftsprofil
      // this.selectedTab = "beschreibungTabBauinformationsProfil" // Auf Beschreibungs-Tab wechseln - macht keinen Sinn, da für Baueigenschaftsprofil, nicht Bauinformation in Table! -->
    },

    ordneZuBauinformationenAusgewaehltesBauinformationsProfil() {
      // TODO XXXXXX - Komplettüberarbeitung notwendig für Bauinformationsprofile vs. Baueigenschaftsprofile!
      // FALSCH: Schreibt die im q-select ausgewählten zugeordneteBauinformationen vom Typ vorgabewerteBaueigenschaften in zugeordneteBaueigenschaften der lokalen Kopie des ausgewaehlten Baueigenschaftsprofils
      console.log(
        "Aufruf von ordneZuBauinformationenAusgewaehltesBauinformationsProfil"
      );
      let wahr = false;
      if (wahr) {
        console.log("XXXXXX - Funktion temporär disabled");
      } else {
        // this.tableDataZugeordneteBaueigenschaften = this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.map(arg => Object.assign({}, arg))
        // this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften = this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil
        // Finde Eigenschaften aus dem selectModel, die noch nicht zugeordnet waren

        // Relikt aus Vorlage - disabled:
        /*
        var nochNichtVorhandeneVorgabewerteBaueigenschaftAnProfil = this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil.filter(
          arg =>
            this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.findIndex(
              innerArg => innerArg.typbezogeneBaueigenschaft._id === arg._id
            ) === -1
        );
        */
        for (
          var i = 0;
          i <
          this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil
            .length;
          i++
        ) {
          var aktuelleIterierteBauinformation = this
            .selectValuesBauinformationenAusgewaehltesBauinformationsProfil[i];
          var indexInArray = this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen.findIndex(
            arg =>
              arg.referenzAufBauinformation._id ===
              aktuelleIterierteBauinformation._id
          );
          console.log(indexInArray);
          if (indexInArray === -1) {
            this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen.push(
              {
                referenzAufBauinformation: aktuelleIterierteBauinformation,
                _deleted: false
              }
            );
          } else {
            this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen[
              indexInArray
            ]._deleted = false;
          }
        }
        // Relikt aus Vorlage - disabled:
        /*
        nochNichtVorhandeneVorgabewerteBaueigenschaftAnProfil.map(arg => {
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
            typbezogeneBaueigenschaft: arg
          });
          return null;
        });
        */
        console.log(
          "copyOfPropBauinformationsProfil",
          this.copyOfPropBauinformationsProfil
        );
        this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen = this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen.filter(
          arg => arg._deleted === false
        );
        console.log(
          "copyOfPropBauinformationsProfil",
          this.copyOfPropBauinformationsProfil
        );
        // Aus Vorlage - dort bereits disabled, hier ebenfalls:
        // Hier wurde das Löschen vergessen von entfernten Baueigenschaften
        /*
        this.selectValuesBaueigenschaftenAusgewaehltesBaueigenschaftsProfil.map(arg => {
          this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
            typbezogeneBaueigenschaft: arg
          });
          return null;
        });
        */
        this.createNeuesOderUpdateAusgewaehltesBauinformationsProfil();
      }
    },

    createSelectValueBauinformationenAusgewaehltesBauinformationsProfil(
      val,
      done
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion createSelectValueBauinformationenAusgewaehltesBauinformationsProfil für QSelect zur Auswahl von Bauinformationen
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
        "In createSelectValueBauinformationenAusgewaehltesBauinformationsProfil(val, done) - val: ",
        val
      );
      if (val.length > 1) {
        if (
          // NEU: Fix für #269
          this.copyOfPropBauinformationsProfil.zugeordneteBauinformation
            .bauinformationsBezeichnung != null && // NEU
          !this.copyOfPropBauinformationsProfil.zugeordneteBauinformation.bauinformationsBezeichnung.includes(
            val
          )
        ) {
          done(val, "toggle");
        }
      }
    },

    selectFilterFunctionBauinformationenAusgewaehltesBauinformationsProfil(
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
          "In selectFilterFunctionBauinformationenAusgewaehltesBauinformationsProfil(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil = this.alleBauinformationen;
          console.log("optionsBauinformationen: ", this.alleBauinformationen);
          console.log(
            "selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil: ",
            this
              .selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
          //===============================================================================================================================
          this.selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil = this.alleBauinformationen.filter(
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
            "selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil: ",
            this
              .selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil
          );
        }
      });
    },

    tableSelectionChangedHandler: function(newSelection) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Setzt bei Auswahländerung in der Tabelle die ausgewaehlteBauinformation entweder auf null oder die Auswahl
      // Intention: Quasar-Auswahl arbeitet auf einem (ein-elementigen, bei Single-Auswahl) Array, wir benötigten aber ein Objekt
      // -------------------------------------------------------------------------------------------------------------------------------
      if (newSelection.length > 0) {
        this.ausgewaehlteBauinformation = newSelection[0];
      } else {
        this.ausgewaehlteBauinformation = null;
      }
      this.$emit(
        "selection-changed-table-zugeordnete-bauinformationen-bauinformations-profil",
        newSelection
      );
      // Sendet Event an die Elternkomponenten bauinformations-profile-tab-baustoffe-und-baueinheiten.vue  oder bauinformations-profile.vue
      // dass sich die ausgewählte Bauinformation in der QTable geändert hat!
    },

    // ACHTUNG: Die folgende Funktion wird auch für die q-table für die zugeordneten Bauinformationen benutzt!!!
    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      // Wird in q-tables für Baueigenschften UND Bauinformationen verwewndet
      // Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      // Wird im Templates oben durch :pagination-label="getPaginationLabel" verwendet.
      // --------------------------------------------------------------------------------------------------------------------
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    getSelectedStringTableBauinformationen: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.selectedTableAlleBauinformationen.length === 0
        ? ""
        : `${this.selectedTableAlleBauinformationen.length} Eigenschaft${
            this.selectedTableAlleBauinformationen.length > 1 ? "en" : ""
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
      this.copyOfPropBauinformationsProfil = this.profilFactoryMethod(
        this.zuModifizierendesBauinformationsProfil
      );
    },

    createNeuesOderUpdateAusgewaehltesBauinformationsProfil: function() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Legt das in copyOfPropBauinformationsProfil befindliche Profil im Backend entweder neu an oder updated es
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In createNeuesOderUpdateAusgewaehltesBauinformationsProfil()"
      );
      if (
        this.copyOfPropBauinformationsProfil
          .bauinformationsProfilBezeichnung === ""
      ) {
        this.$emit(
          "error-bezeichnung-bauinformations-profil",
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
      console.log("Vor Emit to leave room 'roomBauinformationsprofile'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationsprofile"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationsprofile'");
      //=========================================================================================================================================
      if (this.modus === "Neuanlage") {
        console.log("Im Modus ", this.modus);
        this.$axios
          .post(
            process.env.API + "/Bauinformationsprofile",
            this.copyOfPropBauinformationsProfil
          )
          .then(res => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_ERFOLG
            );
            this.$emit("neuanlage-request-bauinformations-profil");
            // Event disabled, wird nicht mehr gebraucht, es gab auch keinen Event Handler dafür!
            // res.data enthält die id des neuangelegten Profils
            this.$emit(
              "refresh-request-bauinformations-profil",
              this.modus,
              res.data // Enthält id der neu angelegten Bauinformation vom Backend
            ); // Event an Elternkomponente, z.B.
            // bauinformations-profile-tab-baustoffe-und-baueinheiten.vue
            // oder bauinformations-profile.vue
          })
          .catch(err => {
            console.log(
              "In catch of createNeuesOderUpdateAusgewaehltesBauinformationsProfil",
              err
            );
            console.log(err.response.status);
            this.$emit(
              "error-bezeichnung-bauinformations-profil",
              this.modus,
              err
            );
          });
      }
      if (this.modus === "Bearbeitung") {
        console.log(
          "Im Modus ",
          this.modus,
          this.copyOfPropBauinformationsProfil
        );
        this.$axios
          .put(
            process.env.API +
              "/Bauinformationsprofile/" +
              this.copyOfPropBauinformationsProfil._id +
              "/Bauinformationen",
            this.copyOfPropBauinformationsProfil
          )
          .then(res => {
            console.log(res);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_ERFOLG
            );
            this.$emit(
              "refresh-request-bauinformations-profil",
              this.modus // ACHTUNG: In diesem Fall darf NICHT der dritte Parameter mitgesendet werden wie oben (res.data)!!!
            ); // Event an Elternkomponente, z.B.
            // bauinformations-profile-tab-baustoffe-und-baueinheiten.vue
            // oder bauinformations-profile.vue
          })
          .catch(err =>
            this.$emit(
              "error-bezeichnung-bauinformations-profil",
              this.modus,
              err
            )
          );
      }
    },

    populateBauinformation(currentValue) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Führt eine Population basierend auf der _id einer Bauinformation mittels der in alleBauinformationen befindlichen Bauinformationen durch
      // TODO XXXXXX - Überarbeitung notwendig für Bauinformationsprofile vs. Baueigenschaftsprofile
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
      // Erstellt und returned Objekt vom Typ bauinformationsProfil basierend auf arg - bei null wird ein leeres Objekt hergestellt, sonst werden die
      // Felder aus dem arg befüllt (kommt normalerweise aus den Props)
      // TODO XXXXXX - muss komplett überarbeitet werden für Bauinformationsprofile vs. Baueigenschaftsprofile!
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log("In profilFactoryMethod(arg) - Parameter arg: ", arg);
      if (arg !== null) {
        // this.inProfilEnthalteneBauinformationen = []
        this.inProfilEnthalteneBauinformationen = arg.zugeordneteBauinformationen.map(
          arg => arg.referenzAufBauinformation
        ); // Array mit Referenzen auf Bauinformationen

        // TODO XXXXXX - in Bauinformationsprofilen gibt es keine typbezogenen Baueigenschaften!!!
        // Daher diesen Teil disabled
        /*
        const tmp = arg.zugeordneteBauinformationen.map(element => {
          // Populiert die Bauinformations-Felder in allen typbezogeneBaueigenschaften im Frontend
          // Diese werden z.B. in typbezogeneBaueigenschaft.bauinformation.bauinformationsBezeichnung etc. abgelegt
          element.typbezogeneBaueigenschaft.bauinformation = this.populateBauinformation(
            element.typbezogeneBaueigenschaft.bauinformation
          );
          return { ...element }; // Spread-Operator, bei null werden keine Felder eingefügt
        });
        */
        this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil = this.selectOptionsBauinformationenAusgewaehltesBauinformationsProfil.filter(
          arg =>
            this.inProfilEnthalteneBauinformationen.findIndex(
              innerArg => innerArg._id === arg._id
            ) > -1
        );
        this.tableDataZugeordneteBauinformationen = arg.zugeordneteBauinformationen.map(
          arg => Object.assign({}, arg)
        );
        return {
          // zugeordneteBauinformationen: tmp, // ALT - TODO XXXXXX
          zugeordneteBauinformationen: arg.zugeordneteBauinformationen, // NEU - TODO XXXXXX
          bauinformationsProfilBezeichnung:
            arg.bauinformationsProfilBezeichnung,
          bauinformationsProfilBemerkung: arg.bauinformationsProfilBemerkung,
          bauinformationsProfilBeschreibung:
            arg.bauinformationsProfilBeschreibung,
          // Relikt aus Vorlage details-tab-baueigenschafts-profil.vue, disabled:
          /*
          zugeordneteBauinformation: this.populateBauinformation(
            arg.zugeordneteBauinformation
          ),
          */
          _id: arg._id
        };
      } else {
        // console.log("Zustand (missing arg):", arg); // Sinnlos, arg ist null und wurde oben schon ausgegeben!
        this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil = [];
        return {
          zugeordneteBauinformationen: [],
          bauinformationsProfilBezeichnung: "",
          bauinformationsProfilBemerkung: null,
          bauinformationsProfilBeschreibung: null,
          zugeordneteBauinformation: null,
          _id: null
        };
      }
    },

    toggleSpaltenHerausgeberAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für Herausgeberangaben
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.herausgeberAngabenAnzeigen) {
        for (let i = 0; i < this.herausgeberAngabenArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(
            this.herausgeberAngabenArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.herausgeberAngabenArray.includes(value)
        );
      }
    },

    toggleSpaltenNormAngaben() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für Normangaben
      // -------------------------------------------------------------------------------------------------------------------------------
      if (this.normAngabenAnzeigen) {
        this.visibleColumnsTableBauinformationen.push("normTypDIN");
        this.visibleColumnsTableBauinformationen.push("normTypÖNORM");
        this.visibleColumnsTableBauinformationen.push("normTypSN");
        this.visibleColumnsTableBauinformationen.push("normTypEN");
        this.visibleColumnsTableBauinformationen.push("normTypISO");
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value =>
            value !== "normTypDIN" &&
            value !== "normTypÖNORM" &&
            value !== "normTypSN" &&
            value !== "normTypEN" &&
            value !== "normTypISO"
        );
      }
    },

    toggleSpaltenAllgemeineAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in der QTable für Baueigenschaften die Spaltensichtbarkeit für die fachlichen Angaben
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.allgemeineAngabenAnzeigen) {
        this.visibleColumnsTableBauinformationen.push(
          "bauinformationsAnzeigeText"
        );
        this.visibleColumnsTableBauinformationen.push(
          "bauinformationsTyp"
        ); // NEU: #514
        this.visibleColumnsTableBauinformationen.push(
          "benutzerKennungenAutoren"
        ); // NEU
        this.visibleColumnsTableBauinformationen.push(
          "bauinformationsBemerkung"
        );
        this.visibleColumnsTableBauinformationen.push(
          "gültigkeitsDatumVon"
        );
        this.visibleColumnsTableBauinformationen.push(
          "gültigkeitsDatumBis"
        ); // NEU: #514
        this.visibleColumnsTableBauinformationen.push(
          "externerLink");
        this.visibleColumnsTableBauinformationen.push(
          "internerLink"
        );
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value =>
            value !== "bauinformationsAnzeigeText" && // NEU: #514
            value !== "bauinformationsTyp" &&
            value !== "benutzerKennungenAutoren" &&
            value !== "bauinformationsBemerkung" &&
            value !== "gültigkeitsDatumVon" &&
            value !== "gültigkeitsDatumBis" &&
            value !== "externerLink" &&
            value !== "internerLink"
        );
      }
    },

    toggleSpaltenNormKategorien() {
      // ----------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Baueigenschaften die Spaltensichtbarkeit für die Normkategorien
      // ----------------------------------------------------------------------------------------------------------------------
      // this.normKategorienAnzeigen = !this.normKategorienAnzeigen;
      if (this.normKategorienAnzeigen) {
        for (let i = 0; i < this.normKategorienArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(
            this.normKategorienArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.normKategorienArray.includes(value)
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

    selectAddHandlerBauinformationenAusgewaehltesBauinformationsProfil: function(
      // TODO XXXXXX - muss komplett überarbeitet werden für Bauinformationsprofile vs. Baueigenschaftsprofile!
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
        this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil.findIndex(
          arg => arg._id === details.value._id
        ) === -1
      ) {
        this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil.push(
          details.value
        );
      }
      /*
      this.copyOfPropBaueigenschaftsProfil.zugeordneteBaueigenschaften.push({
        typbezogeneBaueigenschaft: details.value
      });
      */
    },

    selectRemoveHandlerBauinformationenAusgewaehltesBauinformationsProfil: function(
      // TODO XXXXXX - muss komplett überarbeitet werden für Bauinformationsprofile vs. Baueigenschaftsprofile!
      details
    ) {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Siehe selectAddHandler
      // -------------------------------------------------------------------------------------------------------------------------------
      console.log(details);
      this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil = this.selectValuesBauinformationenAusgewaehltesBauinformationsProfil.filter(
        arg => arg._id !== details.value._id
      );
    }
  },

  //========================================================================================================================================================
  watch: {
    inProfilEnthalteneBauinformationen: {
      // -------------------------------------------------------------------------------------------------------------------------------
      //
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      handler: function(val) {
        // Momentan ohne Funktion
        console.log(
          "In watch für inProfilEnthalteneBauinformationen - val: ",
          val
        );
      }
    },

    zuModifizierendesBauinformationsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Watch auf Prop bauinformationsProfil!!!
      // Lädt bei Änderungen im Prop alle Daten dieser Komponente neu
      // ACHTUNG: val wird an profilFactoryMethod(val) weitergegeben!!!
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log("In watch für bauinformationsProfil - val: ", val);
        this.copyOfPropBauinformationsProfil = this.profilFactoryMethod(val);
        console.log(
          "XXXXXX - ausgewaehlteBauinformation: ",
          this.ausgewaehlteBauinformation
        );
        if (
          this.ausgewaehlteBauinformation !== null &&
          this.ausgewaehlteBauinformation !== undefined
        ) {
          const idAusgewaehlteBauinformation =
            // .typbezogeneBauinformation._id; /// ALT
            this.ausgewaehlteBauinformation._id; // NEU - TODO XXXXXX
          console.log(
            "idAusgewaehlteBauinformation: ",
            idAusgewaehlteBauinformation
          );
          this.ausgewaehlteBauinformation = this.copyOfPropBauinformationsProfil.zugeordneteBauinformationen.find(
            arg =>
              // arg.typbezogeneBauinformation._id === idAusgewaehlteBauinformation
              arg._id === idAusgewaehlteBauinformation // NEU - TODO XXXXXX
          );
          console.log(
            "ausgewaehlteBauinformation: ",
            this.ausgewaehlteBauinformation
          );
        }
      }
    },

    selectOptionsBauinformationenAusgewaehltesBauinformationsProfil: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // watch auf prop um bei Prop-Änderung ein Neuladen durchzuführen
      // -------------------------------------------------------------------------------------------------------------------------------
      deep: true,
      immediate: true,
      handler: function(val) {
        console.log(
          "In watch für selectOptionsBauinformationenAusgewaehltesBauinformationsProfil - val:",
          val
        );
        this.selectFilterOptionsBauinformationenAusgewaehltesBauinformationsProfil = val;
      }
    }
  },

  //========================================================================================================================================================
  created() {
    console.log("In created() von details-tab-bauinformations-profil");
    this.toggleSpaltenAllgemeineAngaben();
  }
};
</script>
<style>
.height-small {
  height: 18px;
}
</style>
<style lang="sass">
.stickyColumnsTable2HeaderLinesZugeordneteBauinformationen
  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Farben für Table mit 2 Header-Zeilen und Body: */
  /* #C0C0C0 ist HTML Silver, siehe https://www.w3schools.com/colors/colors_shades.asp */

  thead tr:first-child td:first-child /* Setzt Farbe der 1. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  thead tr:first-child  /* Setzt Farbe der gesamten 1. Header-Zeile, 1. Spalte bereits oben separat gesetzt  - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  /* Wegen Opacity-Änderung das folgende thead hinter das vorherige thead oben verschoben */
  thead tr:first-child td:nth-child(2) /* Setzt Farbe und Opacity der 1. Header-Zeile, 2. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.8

  thead tr:nth-child(2) td:first-child /* Setzt Farbe der 2. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White Smoke // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
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