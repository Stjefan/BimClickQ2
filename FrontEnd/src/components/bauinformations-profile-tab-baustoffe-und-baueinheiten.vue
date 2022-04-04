<!-- ============================================================================== -->
<!-- Eingebette Bauinformationsprofile in Baueinheiten und Baustoffen mit Aktivierung -->
<!-- Vorlage: baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue -->
<!-- ============================================================================== -->

<template>
  <!-- ACHTUNG: Versuchter Fix für #183, löst das Problem aber NICHT!!! -->
  <!-- Folgenden Code testweise geändert von <div> ... </div> nach <q-page-padding> ... </q-page>, wie in baueigenschafts-profile.vue -->
  <!-- Damit verschwindet aber die Scrollbar bei vielen Spalten unten ganz, daher wieder rückgängig gemacht! -->
  <!-- Hinweis auf https://quasar.dev/layout/page/#Usage A QPage must be encapsulated by QPageContainer, which in turn must be a child of QLayout -->
  <div>
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
      v-model="tabBauinformationsProfile"
    >
      <q-tab
        name="uebersichtTabBauinformationsProfile"
        label="Übersicht aller Bauinformationsprofile"
        no-caps
      />
      <q-tab
        name="detailsTabBauinformationsProfil"
        label="Details zum ausgewählten Bauinformationsprofil"
        no-caps
        :disable="selectedBauinformationsProfil == null"
      />
      <q-tab
        :disable="!benutzerDarfBearbeitenBauinformationsprofile"
        name="neuanlageTabBauinformationsProfil"
        label="Neuanlage eines Bauinformationsprofils"
        no-caps
      />
    </q-tabs>
    <q-tab-panels v-model="tabBauinformationsProfile" keep-alive>
      <!-- ACHTUNG: keep-alive NEU!!! -->
      <!-- ================================================================================================== -->
      <!-- ACHTUNG: Hier class="q-pa-xs" oder "q-pa-none" zur Kontrolle des  Abstands zwischen den Tableisten -->
      <!-- ================================================================================================== -->
      <!-- HINWEIS: @update:selected="val => $emit('selection-changed-table-bauinformations-profile-bauinformations-profil', val)" - dieses Event wird aktuell nicht gehandelt, ist aber -->
      <!--          auch nicht notwendig, Code trotzdem belassen -->
      <!-- Gehandelt werden müsste das in baueinheiten.vue und baustoffe.vue, den Elternkomponenten -->
      <!-- ACHTUNG: Diese QTable arbeitet auf Array internalSelectedRowsTableBauinformationsProfile als selected.sync -->
      <!--          Unterschied im Code zu bauinformations-profile.vue, diese erzeugt die Table über Komponente uebersicht-tab-bauinformations-profile.vue -->
      <q-tab-panel
        class="q-pa-xs full-width"
        name="uebersichtTabBauinformationsProfile"
      >
        <q-table
          color="primary"
          ref="tableBauinformationsProfile"
          :data="alleBauinformationsProfile"
          :columns="columnsTableBauinformationsProfile"
          row-key="_id"
          :selected.sync="internalSelectedRowsTableBauinformationsProfile"
          :filter="filterTableBauinformationsProfile"
          selection="single"
          @update:selected="
            val => $emit('selection-changed-table-bauinformations-profile-bauinformations-profile', val)
          "
          dense
          separator="cell"
          rows-per-page-label="Einträge pro Seite"
          :pagination.sync="paginationTableBauinformationsProfile"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
          :selected-rows-label="getSelectedStringTableBauinformationsProfile"
          v-bind:class="{ stickyColumnsTable1HeaderLineZugeordneteBauinformationen: $q.screen.gt.sm }"
        >
          <!-- ACHTUNG: Sticky Column funktioniert nur auf großen Bildschirmen - auf mobilen Bildschirmen funktioniert damit das horizontale Scrolling der QTable nicht! -->
          <!-- LÖSUNG (#378): Per v-bind mit Bedingung $q.screen.gt.sm die sticky Column nur auf nicht kleinen Bildschirmen! -->
          <!-- Vorlage: https://vuejs.org/v2/guide/class-and-style.html -->
          <!-- Dazu musste allerdings die CSS Class sticky-columns-table-1-header-line-zugeordnete-bauinformationen (kebab-case) umbenannt werden nach -->
          <!-- stickyColumnsTable1HeaderLineZugeordneteBauinformationen (camelCase) -->
          <template v-slot:top="props">
            <div
              class="row full-width q-table__title text-body2 q-col-gutter-xs"
            >
              <!-- HINWEIS: Diese Classes heissen anscheinend tatsächlich q-table__title, q-table__top, etc. -->
              <div class="col-md-2 col-11">
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  debounce="300"
                  color="primary"
                  v-model="filterTableBauinformationsProfile"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-8 col-12 text-h6" v-if="$q.screen.gt.sm">
                {{ getTableTitleString }}
              </div>
              <div class="col-md-8 col-12 text-subtitle1" v-else>
                {{ getTableTitleString }}
              </div>
              <div class="col-md-2 col-12">
                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  class="absolute-top-right"
                  no-caps
                />
              </div>
            </div>
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
              <q-menu touch-position context-menu>
                <q-list dense style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="
                      contextMenuSelectionHandler('Bearbeitung', props.row)
                    "
                  >
                    <q-item-section>
                      Profil auswählen und anzeigen/bearbeiten
                    </q-item-section>
                  </q-item>
                  <q-item
                    :disable="!benutzerDarfBearbeitenBauinformationsprofile"
                    clickable
                    v-close-popup
                    @click="
                      contextMenuSelectionHandler(
                        'UpdateAktivierung',
                        props.row
                      )
                    "
                  >
                    <q-item-section
                      >Profil auswählen und an
                      {{ modus }} aktivieren/deaktivieren</q-item-section
                    >
                  </q-item>
                  <q-item
                    :disable="!benutzerDarfBearbeitenBauinformationsprofile"
                    clickable
                    v-close-popup
                    @click="contextMenuSelectionHandler('Löschen', props.row)"
                  >
                    <q-item-section
                      >Profil auswählen und löschen</q-item-section
                    >
                  </q-item>
                  <q-separator />
                  <q-item
                    :disable="!benutzerDarfBearbeitenBauinformationsprofile"
                    clickable
                    v-close-popup
                    @click="contextMenuSelectionHandler('Neuanlage', props.row)"
                  >
                    <q-item-section>Neues Profil anlegen </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <!-- ENDE CODE FÜR KONTEXTMENÜ -->
              <!-- ====================================================================================================================== -->
              <q-td :auto-width="true">
                <q-checkbox v-model="props.selected" color="primary" dense />
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
                <div v-else-if="col.type === 'markdown'" class="height-small">
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
        <!-- ALT: -->
        <!-- v-if="$q.screen.gt.xs" -->
        <div
          class="row full-width q-pa-xs q-col-gutter-xs"
        >
          <div class="col-md-4 col-12 text-caption">
            Aktionen für Bauinformationsprofile
            {{ displayRightArrow }}
            <br />
            <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
            Mit &nbsp;
            <q-checkbox v-model="alwaysOn" disable dense color="primary" />
            &nbsp; in erster Spalte Bauinformationsprofil auswählen.
            Alternativ mit rechter Maustaste Kontextmenü aufrufen.
            <!-- <br />&nbsp;
            <br /> -->
          </div>
          <!-- ALT: -->
          <!-- <div class="col-2 q-gutter-y-md column"> -->
          <!--     <q-btn style="width:80% stretch">    -->
          <!-- und <q-btn class="q-mx-sm q-py-xs">      -->
          <div class="col-md-2 col-12">
            <q-btn
              class="stretch full-width"
              :label="btnLabel"
              color="purple-6"
              glossy
              no-caps
              :disable="selectedBauinformationsProfil === null"
              @click="updateBeziehungAnBackend()"
            />
          </div>
          <div class="col-md-2 col-12">
            <q-btn
              class="stretch full-width"
              label="Profil anzeigen / bearbeiten"
              color="secondary"
              glossy
              no-caps
              :disable="selectedBauinformationsProfil === null"
              @click="
                tabBauinformationsProfile = 'detailsTabBauinformationsProfil'
              "
            />
          </div>
          <!-- TODO  @click="openEigenschaftAuswahl()" -->
          <div class="col-md-2 col-12">
            <q-btn
              :disable="
                selectedBauinformationsProfil === null ||
                  !benutzerDarfBearbeitenBauinformationsprofile
              "
              class="stretch full-width"
              label="Profil löschen"
              color="negative"
              glossy
              no-caps
              @click="deleteSelectedBauinformationsProfilDialog = true"
            />
          </div>
          <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBauinformation()"-->
          <!-- <q-separator vertical inset /> -->
          <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
          <div class="col-md-2 col-12">
            <q-btn
              :disable="!benutzerDarfBearbeitenBauinformationsprofile"
              class="stretch full-width"
              label="Profil neu anlegen"
              glossy
              color="green-8"
              @click="
                tabBauinformationsProfile = 'neuanlageTabBauinformationsProfil'
              "
              no-caps
            />
          </div>
        </div>
      </q-tab-panel>
      <!-- ================================================================================================== -->
      <!-- ACHTUNG: Hier class="q-pa-xs" oder "q-pa-none" zur Kontrolle des  Abstands zwischen den Tableisten -->
      <!-- ================================================================================================== -->
      <q-tab-panel
        class="q-pa-xs full-width"
        name="detailsTabBauinformationsProfil"
      >
        <detailsTabBauinformationsProfil
          modus="Bearbeitung"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBauinformationenAusgewaehltesBauinformationsProfil="
            alleBauinformationen
          "
          :zuModifizierendesBauinformationsProfil="
            selectedBauinformationsProfil
          "
          @refresh-request-bauinformations-profil="
            refreshBauinformationsProfile
          "
          @selection-changed-table-zugeordnete-bauinformationen-bauinformations-profil="
            selectionHandlerVorgabeWerteBauinformationsProfile
          "
          @error-bezeichnung-bauinformations-profil="showErrorNotification"
        />
      </q-tab-panel>
      <!-- ================================================================================================== -->
      <!-- ACHTUNG: Hier class="q-pa-xs" oder "q-pa-none" zur Kontrolle des  Abstands zwischen den Tableisten -->
      <!-- ================================================================================================== -->
      <q-tab-panel
        class="q-pa-xs full-width"
        name="neuanlageTabBauinformationsProfil"
      >
        <detailsTabBauinformationsProfil
          modus="Neuanlage"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBauinformationenAusgewaehltesBauinformationsProfil="
            alleBauinformationen
          "
          @refresh-request-bauinformations-profil="
            refreshBauinformationsProfile
          "
          @error-bezeichnung-bauinformations-profil="showErrorNotification"
        />
      </q-tab-panel>
    </q-tab-panels>
    <!-- NEU: Dialog für Confirmation des Löschens einer Bauinformation: -->
    <q-dialog
      v-if="selectedBauinformationsProfil"
      v-model="deleteSelectedBauinformationsProfilDialog"
    >
      <!-- =========================================================================== -->
      <!-- ACHTUNG: Für die Formatierung in diesem QDialog ist aktuell nur eine QCard, -->
      <!-- kein div-Wrapper und kein QForm erforderlich!                               -->
      <!-- =========================================================================== -->
      <q-card>
        <q-card-section>
          <div class="row full-width q-pa-xs">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
              style="margin-left: auto;margin-right: auto;"
            />
          </div>
          <!-- ------------------------------------------------------------------------------------------------ -->
          <!-- HINWEIS: style="margin-left: auto;margin-right: auto;" am q-avatar in Verbindung mit div-Wrapper -->
          <!--          für Centering des Avatars, siehe                                                        -->
          <!--          https://forum.quasar-framework.org/topic/6109/align-to-center-within-grid-column/3      -->
          <!-- ------------------------------------------------------------------------------------------------ -->
          <div class="row full-width q-pt-md">
            <span class="q-pa-none">
              Soll das Bauinformationsprofil
              <b
                >"{{
                  selectedBauinformationsProfil.bauinformationsProfilBezeichnung
                }}"</b
              >
              wirklich gelöscht werden?
            </span>
          </div>
        </q-card-section>
        <!-- ALT: -->
        <!-- <q-card-actions align="right"> -->
        <!-- NEU: Buttons, die sich stretchen - erfordert Wrapper-div -->
        <q-card-actions>
          <div class="row full-width q-col-gutter-xs q-pa-xs">
            <div class="col-6">
              <q-btn
                class="stretch full-width"
                style="height: 100%"
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
              />
            </div>
            <div class="col-6">
              <q-btn
                class="stretch full-width"
                style="height: 100%"
                glossy
                label="Löschen"
                color="negative"
                @click="deleteSelectedBauinformationsProfil()"
                v-close-popup
                no-caps
              />
            </div>
          </div>
          <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
          <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<!-- ================================================================================================================================================== -->
<script>
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import UebersichtTabBauinformationsProfile from "../components/uebersicht-tab-bauinformations-profile.vue";
import DetailsTabBauinformationsProfil from "../components/details-tab-bauinformations-profil.vue";
// import BaueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten from "../components/baueigenschafts-profil-formulare-tab-baustoffe-und-baueinheiten.vue"
// import BaueinheitBodenaufbauBaueigenschaftsProfilFormular from "../components/baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue";
//***==================================================================================================================================================
export default {
  // name: 'ComponentName',
  props: [
    "node", // Knoten im Baustoff- oder Bauvorhabenbaum (d.h. verschachteltes Objekt für Baustoff oder Baueinheit) - ALT: zugeordnetesDokument
    "modus" // "Baustoff" oder "Baueinheit", zur Unterscheidung, von wo die Komponente aufgerufen wird
    // ACHTUNG: Zusätzlich emittiert die Komponente ein Event refresh-request-bauinformations-profil, für das beim Aufruf Ein Event Handler (Methode) angegeben werden muss!
  ],
  //***==================================================================================================================================================
  components: {
    // Komponenten für Bauinformationsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    // uebersichtTabBauinformationsProfile,
    // detailsTabBauinformationsProfil // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Bauinformationsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    // dummy,
    // bearbeitung
    detailsTabBauinformationsProfil: DetailsTabBauinformationsProfil
    // baueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten: BaueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten,
    // baueinheitBodenaufbauBaueigenschaftsProfilFormular: BaueinheitBodenaufbauBaueigenschaftsProfilFormular // ALT: "entwurf-schichtaufbau",
    // verschoben nach Unter-Tab von Tab "Bauvorhaben" > "Baueigenschaftsprofilformulare"
  },
  //***==================================================================================================================================================
  data() {
    return {
      btnLabel: "Profil aktivieren / deaktivieren", //
      // "Bauinformationsprofil an " + this.modus + " aktivieren/deaktivieren", // ALT - nimmt zu viel Platz ein
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      alwaysOn: true,
      selectedBauinformationsProfil: null,
      alleBauinformationen: [],
      tabBauinformationsProfile: "uebersichtTabBauinformationsProfile",
      localStore: globalStore,
      filterTableBauinformationsProfile: "",
      internalSelectedRowsTableBauinformationsProfile: [],
      alleBauinformationsProfile: [],
      columnsTableBauinformationsProfile: [
        {
          name: "baueigenschaftsProfilBezeichnung",
          label: "Bauinformationsprofilbezeichnung",
          field: row => row.bauinformationsProfilBezeichnung,
          align: "left",
          sortable: true
        },
        //=======================================================================
        // ACHTUNG: Die nächste Column wird eigens vom Frontend hinzugefügt!!!!!
        {
          name: "profilIstAktiviertAnDokument",
          label: "Aktiviert an " + this.modus +"?",
          field: row => row.profilAktiviertAnDokument,
          type: "toggle",
          align: "center",
          sortable: true
        },
        //=======================================================================
        {
          name: "bauinformationsProfilBemerkung",
          label: "Bemerkung",
          field: row => row.bauinformationsProfilBemerkung,
          align: "left",
          sortable: true,
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bemerkungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: 'ellipsis', // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: 'max-width: 600px', // NEU
          headerStyle: 'max-width: 600px' // NEU
          //===========================================================================================================================================
        },
        // Folgende Columns sind Relikte aus Baueigenschaftsprofilen, hier für Bauinformationsprofile disabled:
        /*
        {
          name: "bauinformationsBezeichnungZugeordneteBauinformation",
          label: "Bauinformationsbezeichnung",
          field: row =>
            row.zugeordneteBauinformation != null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.zugeordneteBauinformation.bauinformationsBezeichnung
              : null,
          align: "left",
          sortable: true
        },
        {
          name: "bauinformationsTypZugeordneteBauinformation",
          label: "Bauinformationstyp",
          field: row =>
            row.zugeordneteBauinformation != null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.zugeordneteBauinformation.bauinformationsTyp
              : null,
          align: "left",
          sortable: true
        }
        // TODO XXXXXX: Hier weitere Columns (Bemerkung, Bauinformation, eventuell: zugeordnete Bauinformationen per read-only Dropdown-Menü (q-select))
        */
      ],
      deleteSelectedBauinformationsProfilDialog: false,
      paginationTableBauinformationsProfile: {
        sortBy: "bauinformationsBezeichnung", // HINWEIS: Hier stand ursprünglich nur "Name"!!!
        // Es sollte aber laut q-table API Doc ein Column name (from colummn definition)" sein!!!
        descending: false,
        page: 1,
        rowsPerPage: globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // ALT: 15 // Für FHD Laptops
        // rowsNumber: xx if getting data from a server
        // rowsNumber ist laut https://quasar.dev/vue-components/table#Pagination nur relevant bei Server Side Pagination!!!
        // Dann müsste rowsNumber mit dem aktuellen Wert der Zeilen in der q-table für die Bauinformationen initialisiert und ggf. updated werden,
        // z.B. in computed: selectedNodeTreeBaustoffe (wird aufgerufen, wenn sich der selected Node im Baustoffbaum ändert)
        // unter Verwendung von selectedNodeTreeBaustoffe.baueigenschaften.length, wenn dieses initialisiert und geändert wird
      }
    };
  },
  //======================================================================================================================================================
  methods: {
    updateBeziehungAnBackend() {
      //------------------------------------------------------------------------------------------------------------------------------
      // Updated per API die zugeordneten Profile für einen Baustoff bzw. eine Baueinheit (d.h. die Beziehung zwischen diesen und den Profilen)
      //------------------------------------------------------------------------------------------------------------------------------
      let aktiverenNichtDeaktivieren = !this
        .internalSelectedRowsTableBauinformationsProfile[0]
        .profilAktiviertAnDokument;
      if (this.modus === "Baustoff") {
        console.log("Update einer Baustoff-Beziehung");
        console.log(this.selectedProfilInTable);
        this.$axios
          .put(
            process.env.API +
              "/Baustoffe/" +
              this.node._id +
              "/Bauinformationsprofil/Aktivierungszustand", // NEU: API umbenannt!!
            {
              idProfil: this.internalSelectedRowsTableBauinformationsProfile[0]
                ._id,
              aktivierenNichtDeaktivieren: aktiverenNichtDeaktivieren
            }
          )
          .then(doc => {
            console.log("Nach Modifizierung", doc);
            this.$emit("refresh-request-bauinformations-profil"); // Refresh Request Event, wird in Elternkomponenten baueinheiten.vue und baustoffe.vue gehandelt
            if (aktiverenNichtDeaktivieren) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG
              );
            }
          })
          .catch(e => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER
            );
          });
      } else {
        console.log("Update einer Baueinheit-Beziehung");
        console.log(this.selectedProfilInTable);
        this.$axios
          .put(
            process.env.API +
              "/Baueinheiten/" +
              this.node._id +
              "/Bauinformationsprofil/Aktivierungszustand", // NEU: API umbenannt!
            {
              idProfil: this.internalSelectedRowsTableBauinformationsProfile[0]
                ._id,
              aktivierenNichtDeaktivieren: aktiverenNichtDeaktivieren
            }
          )
          .then(doc => {
            console.log("Nach Modifizierung", doc);
            this.$emit("refresh-request-bauinformations-profil"); // Refresh Request Event, wird in Elternkomponenten baueinheiten.vue und baustoffe.vue gehandelt
            if (aktiverenNichtDeaktivieren) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG
              );
            }
          })
          .catch(e => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER
            );
          });
      }
    },

    contextMenuSelectionHandler(gewaehltesContextItem, contextOnRow) {
      //--------------------------------------------------------------------------------
      // Handelt die unterschiedlichen Eingaben im Kontextmenü
      //--------------------------------------------------------------------------------
      console.log(
        "In contextMenuSelectionHandler mit den Argumenten",
        gewaehltesContextItem,
        contextOnRow
      );
      this.internalSelectedRowsTableBauinformationsProfile.splice(
        0,
        this.internalSelectedRowsTableBauinformationsProfile.length
      );
      this.internalSelectedRowsTableBauinformationsProfile.push(contextOnRow);
      switch (gewaehltesContextItem) {
        case "UpdateAktivierung":
          console.log("UpdateAktivierung");
          this.updateBeziehungAnBackend();
          break;
        case "Bearbeitung":
          this.tabBauinformationsProfile = "detailsTabBauinformationsProfil";
          break;
        case "Neuanlage":
          this.tabBauinformationsProfile = "neuanlageTabBauinformationsProfil";
          break;
        case "Löschen":
          this.deleteSelectedBauinformationsProfilDialog = true;
          break;
      }
    },

    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      // Wird in q-tables für Bauinformationen UND Bauinformationen verwewndet
      // Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      // Wird im Templates oben durch :pagination-label="getPaginationLabel" verwendet.
      // --------------------------------------------------------------------------------------------------------------------
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    getSelectedStringTableBauinformationsProfile: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.internalSelectedRowsTableBauinformationsProfile.length === 0
        ? ""
        : `${
            this.internalSelectedRowsTableBauinformationsProfile.length
          } Baueieigenschaftsprofil${
            this.internalSelectedRowsTableBauinformationsProfile.length > 1
              ? "e"
              : ""
          } ausgewählt`;
    },

    deleteSelectedBauinformationsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------
      // API-Call um das in selectedBauinformationsProfil befindliche Bauinformationsprofil zu löschen
      //------------------------------------------------------------------------------------------------------------------------------
      if (this.selectedBauinformationsProfil !== null) {
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        console.log("Vor Emit to leave room 'roomBauinformationsprofile'");
        this.$socket.emit("leaveRoom", {
          room: "roomBauinformationsprofile"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBauinformationsprofile'");
        //=========================================================================================================================================
        this.$axios
          .delete(
            process.env.API +
              "/Bauinformationsprofile/" +
              this.selectedBauinformationsProfil._id
          )
          .then(doc => {
            this.selectedBauinformationsProfil = null; // Clear selection
            this.refreshBauinformationsProfile();
            this.deleteSelectedBauinformationsProfilDialog = false;
            this.localStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_LOESCHEN_ERFOLG
            );
          })
          .catch(error => {
            console.log("error: ", error);
            this.localStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATIONSPROFIL_LOESCHEN_FEHLER
            );
          });
      }
    },

    onTabChangeRequest(anzuwaehlendesTab) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Aufruf, Wenn Kindkomponenten einen Tabchange in dieser Komponente anfordern
      //------------------------------------------------------------------------------------------------------------------------------
      switch (anzuwaehlendesTab) {
        case "Bearbeitung":
          this.tabBauinformationsProfile = "detailsTabBauinformationsProfil";
          break;
        case "Neuanlage":
          this.tabBauinformationsProfile = "neuanlageTabBauinformationsProfil";
          break;
        default:
          throw new Error("Invalid Argument in on TabChangeRequest");
      }
    },

    selectionHandlerUebersichtBauinformationsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Setzt das Object selectedBauinformationsProfil auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Profil ausgewaehlt wird
      //------------------------------------------------------------------------------------------------------------------------------
      console.log("In selectionHandlerUebersichtBauinformationsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectedBauinformationsProfil = newSelected[0];
      } else {
        this.selectedBauinformationsProfil = null;
      }
    },

    selectionHandlerVorgabeWerteBauinformationsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Setzt das Object selectionForDefaultValueChange auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Default-Wert-Objekt ausgewählt wird
      //-------------------------------------------------------------------------------------------------------------------------------
      console.log("In selectionHandlerVorgabeWerteBauinformationsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectionForDefaultValueChange = newSelected[0];
      } else {
        this.selectionForDefaultValueChange = null;
      }
    },

    showErrorNotification(sender, error) {
      //-------------------------------------------------------------------------------------------------------------------------------
      // Unterkomponenten teilen ihre Fehler mit, diese Page zeigt sie dann mittels des global-stores an
      //-------------------------------------------------------------------------------------------------------------------------------
      console.log("In showErrorNotification: ", error);
      if (!error.hasOwnProperty("response")) {
        // Fehler ohne Backend-Beteiligung (z.B. Validation-Fehler)
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD
        );
      } else {
        switch (sender) {
          case "Neuanlage":
            console.log(error.response.status);
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER
              );
            }
            break;
          case "Bearbeitung":
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_FEHLER
              );
            }
            break;
          default:
            // Sonst zeige DEFAULT_FEHLERNACHRICHT
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
            );
        }
      }
    },

    prepareZugeordneteProfileTable() {
      // Setzt für alle Profile in der Table das Feld für die Spalte "Ist aktiviert" in Abhängigkeit davon, ob das Profil im
      // Array der zugeordneten Profile enthalten ist oder nicht
      // ACHTUNG: Der Aufbau für alle BauinformationsPrrofile ist überall Array of Objects
      //=========================================================================================================================
      // Der Aufbau des Array node.zugeordnteBauinformationsProfile ist HIER BEREITS NESTED (nur Array of Ids)
      // DONE - Code unten: arg.referenzAufBauinformationsProfil === element._id (statt arg._id)
      //=========================================================================================================================
      console.log("In preprareZugeordneteProfileTable()");
      console.log("node.zugeordneteBauinformationsProfile: ", this.node.zugeordneteBauinformationsProfile);
      this.alleBauinformationsProfile.forEach(element => {
        if (
          // ALT: Finde Index in Array of _ids_:
          // this.node.zugeordneteBauinformationsProfile.findIndex(arg => arg === element._id) >
          // NEU: Finde Index in populiertem Array of Objects {_id, bauinformationsProfilBezeichnung}:
          this.node.zugeordneteBauinformationsProfile.findIndex(arg => arg.referenzAufBauinformationsProfil === element._id) >
          // Siehe https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
          -1
        ) {
          this.$set(element, "profilAktiviertAnDokument", true);
        } else {
          this.$set(element, "profilAktiviertAnDokument", false);
          // element.profilAktiviertAnDokument = false;
        }
      });
    },

    refreshBauinformationsProfile(eventArgsModus, payload) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Lädt alle Daten aus dem Backend neu
      // eventArgsModus: "Neuanlage" oder "Bearbeitung" - wird nicht verwendet (d.h. unbedingter Refresh) - dafür wird die payload herangezogen
      //                  TODO: Umschreiben, dass zur Steuerung nicht die payload, sondern eventArgModus herangezogen wird
      // payload: id, welches Bauinformationsprofil (Wieder nach Update) ausgewählt werden soll (bei "Neuanlage" wird darin die id des neuen Profils mitgegeben)
      //          Bei Bearbeitung wird statt payload die id aus selectedBauinformationsProfil entnommen.
      //          Kann/sollte also im Fall "Bearbeitung" leer sein
      console.log("In refreshBauinformationsProfile()");
      console.log("eventArgsModus: ", eventArgsModus);
      console.log("payload: ", payload);
      let idGewuenschteAuswahlTabelleBauinformationsprofile = null;
      if (payload != null && payload !== undefined) {
        idGewuenschteAuswahlTabelleBauinformationsprofile = payload;
      } else {
        if (this.selectedBauinformationsProfil !== null) {
          console.log(this.selectedBauinformationsProfil);
          idGewuenschteAuswahlTabelleBauinformationsprofile = this
            .selectedBauinformationsProfil._id; // id der bisherige Table Selection merken, sonst null
        } else {
          // Es war kein Bauinformationsprofil ausgewählt - nichts zu tun
        }
      }
      // Jetzt weitermachen mit Refresh:
      console.log("Vor Axios-Call für Get aller Bauinformationsprofile");
      this.$axios
        .get(process.env.API + "/Bauinformationsprofile")
        .then(doc => {
          console.log("Alle Bauinformationsprofile - doc:", doc);
          this.alleBauinformationsProfile = doc.data;
          if (idGewuenschteAuswahlTabelleBauinformationsprofile !== null) {
            // Ausgewähltes Bauinformationsprofil ggf. wiederfinden und Table Selection darauf setzen
            this.selectedBauinformationsProfil = this.alleBauinformationsProfile.find(
              arg =>
                arg._id === idGewuenschteAuswahlTabelleBauinformationsprofile
            );
            this.internalSelectedRowsTableBauinformationsProfile = [this.selectedBauinformationsProfil] // Die Auswahl in der Tabelle der zugeordneten Bauinformationen muss aktualisiert werden
            // selectedBauinformationsProfil ist ein Objekt der ausgewählten Bauinformation, während internalSelectedRowsTableBauinformationsProfile ein Array der Länge 1 (0, falls nichts ausgewählt) ist.
          }
          if (payload != null && payload !== undefined) {
            this.tabBauinformationsProfile = "detailsTabBauinformationsProfil";
          }
          console.log("Nach Axios-Call für Get aller Bauinformationen");
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log(
            "Fehler beim Lesen aller Bauinformationsprofile - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONSPROFILE_LESEN_FEHLER
          );
          this.tabBauinformationsProfile =
            "uebersichtTabBauinformationsProfile";
        });
    }
  },
  //***==================================================================================================================================================
  computed: {

        getTableTitleString: function() {
      // NEU: Computed-Funktion für variablen Titel an QTable
      return ("Bauinformationsprofile an " + (this.modus === "Baueinheit" ? "der " : "dem ") +
                "im " + (this.modus === "Baueinheit" ? "Bauvorhabenbaum " : "Baustoffbaum ") +
                "ausgewählten " + this.modus + " ''" +
               (this.modus === "Baueinheit" ? this.node.baueinheitsBezeichnung : this.node.baustoffBezeichnung)) + "''"
    },

    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------

    benutzerDarfBearbeitenBauinformationsprofile: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an (typbezogenen) Bauinformationen
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenBauinformationsprofile
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeiteneBauinformationsprofile
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

    selectedProfilInTable: function() {
      if (this.internalSelectedRowsTableBauinformationsProfile.length > 0) {
        return this.internalSelectedRowsTableBauinformationsProfile[0];
      } else {
        return null;
      }
    }
  }, // /computed:
  //***==================================================================================================================================================
  watch: {
    immediate: false,
    node: {
      handler: function(value) {
        console.log("In Watcher für prop 'node'");
        this.prepareZugeordneteProfileTable();
      }
    },
    internalSelectedRowsTableBauinformationsProfile: {
      handler: function(value) {
        console.log(
          "In Watcher für internalSelectedRowsTableBauinformationsProfile"
        );
        if (this.internalSelectedRowsTableBauinformationsProfile.length > 0) {
          this.selectedBauinformationsProfil = this.internalSelectedRowsTableBauinformationsProfile[0];
        } else {
          this.selectedBauinformationsProfil = null;
        }
      }
    }
  },
  //***==================================================================================================================================================
  mounted() {
    let bauinformationenGetError = true;
    let bauinformationsProfileGetError = true;
    let bauinformationenExtraktGetError = true;
    this.$axios
      .get(process.env.API + "/Bauinformationen")
      .then(doc => {
        // console.log("Alle Bauinformationen - doc:", doc);
        console.log("Success beim Get aller Bauinformationen");
        this.alleBauinformationen = doc.data;
        bauinformationenGetError = false;
      })
      .then(() => this.$axios.get(process.env.API + "/Bauinformationsprofile"))
      .then(doc => {
        // console.log("Alle Bauinformationsprofile - doc:", doc);
        console.log("Success beim Get aller Bauinformationsprofile");
        this.alleBauinformationsProfile = doc.data;
        bauinformationsProfileGetError = false;
      })
      .then(() => {
        return this.$axios.get(process.env.API + "/Bauinformationen/Extrakt"); // ACHTUNG: Hier return notwendig wegen Chaining von .thens!!!
        // NEU: Nur Extrakt von Felder holen, nicht die ganze Bauinformation (für QSelects ausreichend) - Fix für Backlog Item #159
      })
      .then(doc => { // TODO XXXXXX - Ist das hier notwendig für Bauinformationsprofile - oben wurden schon alle geholt!!!
        // console.log("Extrakt aller Bauinformationen - doc: ", doc);
        console.log("Success beim Get des Extrakts aller Bauinformationen");
        bauinformationenExtraktGetError = false;
        this.alleBauinformationen = doc.data;
        this.prepareZugeordneteProfileTable();
      })
      .catch(error => {
        if (bauinformationenGetError) {
          console.log(
            "Fehler beim Get für alle Bauinformationen - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
          );
        } else if (bauinformationsProfileGetError) {
          console.log(
            "Fehler beim Get für alle Bauinformationsprofile- error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONSPROFILE_LESEN_FEHLER
          );
        } else if (bauinformationenExtraktGetError) {
          // Wenn wir hier sind, ist der Get für die Bauinformationen fehlgeschlagen
          console.log(
            "Fehler beim Get für Extrakt aller Bauinformationen - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
          );
        } else {
          // Wenn wir hier sind, ist im obigen Aufruf prepareZugeordneteProfileTable() z.B. eine Error passiert! Das sollte normalerweise nicht passieren.
          console.log(
            "In mounted von zuordnung-profile.vue - Fehler im letzten Catch-Block, z.B. aus prepareZugeordneteProfileTable()"
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONSPROFILE_ANZEIGEN_FEHLER
          );
        }
      });
  }
};
</script>
