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
      v-model="tabBaueigenschaftsProfile"
    >
      <q-tab
        name="uebersichtTabBaueigenschaftsProfile"
        label="Übersicht aller Baueigenschaftsprofile"
        no-caps
      />
      <q-tab
        name="detailsTabBaueigenschaftsProfil"
        label="Details zum ausgewählten Baueigenschaftsprofil"
        no-caps
        :disable="selectedBaueigenschaftsProfil == null"
      />
      <q-tab
        :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
        name="neuanlageTabBaueigenschaftsProfil"
        label="Neuanlage eines Baueigenschaftsprofils"
        no-caps
      />
      <!-- Test für Bodenaufbau hier entfernt, in Unter-Tab von Tab "Bauvorhaben" > "Baueigenschaftsprofilformulare"  verschoben:-->
      <!--
      <q-tab
        label="Test"
        name="test"
        no-caps
      />
      -->
      <!-- Entfernt: -->
      <!--
        <q-tab
          label="Test 2"
          name="test2"
        />
      -->
    </q-tabs>
    <q-tab-panels v-model="tabBaueigenschaftsProfile" keep-alive>
      <!-- ACHTUNG: keep-alive NEU!!! -->
      <!-- Tab Panel entfernt, siehe oben: -->
      <!--
      <q-tab-panel name="test">
        <baueinheitBodenaufbauBaueigenschaftsProfilFormular/>
      </q-tab-panel>
      -->
      <!-- Tab Panel entfernt, da Aufruf unvollständige Parameter hat: -->
      <!--
      <q-tab-panel name="test2">
        <baueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten
          :profil="alleBaueigenschaftsProfile[0]"
        />
      </q-tab-panel>
      -->
      <!-- ================================================================================================== -->
      <!-- ACHTUNG: Hier class="q-pa-xs" oder "q-pa-none" zur Kontrolle des  Abstands zwischen den Tableisten -->
      <!-- ================================================================================================== -->
      <!-- HINWEIS: @update:selected="val => $emit('selection-changed-table-baueigenschafts-profile-baueigenschafts-profil', val)" - dieses Event wird aktuell nicht gehandelt, ist aber -->
      <!--          auch nicht notwendig, Code trotzdem belassen -->
      <!-- Gehandelt werden müsste das in baueinheiten.vue und baustoffe.vue, den Elternkomponenten -->
      <!-- ACHTUNG: Diese QTable arbeitet auf Array internalSelectedRowsTableBaueigenschaftsProfile als selected.sync -->
      <!--          Unterschied im Code zu baueigenschafts-profile.vue, diese erzeugt die Table über Komponente uebersicht-tab-baueigenschafts-profile.vue -->
      <q-tab-panel
        class="q-pa-xs full-width"
        name="uebersichtTabBaueigenschaftsProfile"
      >
        <q-table
          color="primary"
          ref="tableBaueigenschaftsProfile"
          :rows="alleBaueigenschaftsProfile"
          :columns="columnsTableBaueigenschaftsProfile"
          row-key="_id"
          v-model:selected="internalSelectedRowsTableBaueigenschaftsProfile"
          :filter="filterTableBaueigenschaftsProfile"
          selection="single"
          @update:selected="
            val =>
              $emit(
                'selection-changed-table-baueigenschafts-profile-baueigenschafts-profile',
                val
              )
          "
          dense
          v-bind:class="{ stickyColumnsTable1HeaderLine: $q.screen.gt.sm }"
          separator="cell"
          rows-per-page-label="Einträge pro Seite"
          :pagination.sync="paginationTableBaueigenschaftsProfile"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
          :selected-rows-label="getSelectedStringTableBaueigenschaftsProfile"
        >
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
                  v-model="filterTableBaueigenschaftsProfile"
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
              <!-- später auch für die Spalte für die Baueigenschaftsbezeichnung definiert, nun diese zentral hier für alle Spalten definiert: -->
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
                    :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
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
                  <!-- NEU - #511: -->
                  <q-item
                    :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
                    clickable
                    v-close-popup
                    @click="
                      contextMenuSelectionHandler('Duplizieren', props.row)
                    "
                  >
                    <q-item-section
                      >Profil auswählen und duplizieren</q-item-section
                    >
                  </q-item>
                  <q-item
                    :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
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
                    :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
                    clickable
                    v-close-popup
                    @click="contextMenuSelectionHandler('Neuanlage', props.row)"
                  >
                    <q-item-section>Neues Profil anlegen</q-item-section>
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
          <div class="col-md-2 col-12 text-caption">
            Aktionen für Baueigenschaftsprofile
            {{ displayRightArrow }}
            <br />
            <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
            Mit &nbsp;
            <q-checkbox v-model="alwaysOn" disable dense color="primary" />
            &nbsp; in erster Spalte Baueigenschaftsprofil auswählen. Alternativ
            mit rechter Maustaste Kontextmenü aufrufen.
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
              :disable="selectedBaueigenschaftsProfil === null"
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
              :disable="selectedBaueigenschaftsProfil === null"
              @click="
                tabBaueigenschaftsProfile = 'detailsTabBaueigenschaftsProfil'
              "
            />
          </div>
          <!-- TODO  @click="openEigenschaftAuswahl()" -->
          <!-- NEU - #511: -->
          <div class="col-md-2 col-12">
            <q-btn
              :disable="
                selectedBaueigenschaftsProfil === null ||
                  !benutzerDarfBearbeitenBaueigenschaftsProfile
              "
              class="stretch full-width"
              label="Profil duplizieren"
              color="light-blue-7"
              glossy
              no-caps
              @click="duplicateSelectedBaueigenschaftsProfil()"
            />
          </div>
          <div class="col-md-2 col-12">
            <q-btn
              :disable="
                selectedBaueigenschaftsProfil === null ||
                  !benutzerDarfBearbeitenBaueigenschaftsProfile
              "
              class="stretch full-width"
              label="Profil löschen"
              color="negative"
              glossy
              no-caps
              @click="deleteSelectedBaueigenschaftsProfilDialog = true"
            />
          </div>
          <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBaueigenschaft()"-->
          <!-- <q-separator vertical inset /> -->
          <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
          <div class="col-md-2 col-12">
            <q-btn
              :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
              class="stretch full-width"
              label="Profil neu anlegen"
              glossy
              color="green-8"
              @click="
                tabBaueigenschaftsProfile = 'neuanlageTabBaueigenschaftsProfil'
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
        name="detailsTabBaueigenschaftsProfil"
      >
        <detailsTabBaueigenschaftsProfil
          modus="Bearbeitung"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil="
            alleBaueigenschaften
          "
          :zuModifizierendesBaueigenschaftsProfil="
            selectedBaueigenschaftsProfil
          "
          @refresh-request-baueigenschafts-profil="
            refreshBaueigenschaftsProfile
          "
          @selection-changed-table-zugeordnete-baueigenschaften-baueigenschafts-profil="
            selectionHandlerVorgabeWerteBaueigenschaftsProfile
          "
          @error-bezeichnung-baueigenschafts-profil="showErrorNotification"
        />
      </q-tab-panel>
      <!-- ================================================================================================== -->
      <!-- ACHTUNG: Hier class="q-pa-xs" oder "q-pa-none" zur Kontrolle des  Abstands zwischen den Tableisten -->
      <!-- ================================================================================================== -->
      <q-tab-panel
        class="q-pa-xs full-width"
        name="neuanlageTabBaueigenschaftsProfil"
      >
        <detailsTabBaueigenschaftsProfil
          modus="Neuanlage"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBaueigenschaftenAusgewaehltesBaueigenschaftsProfil="
            alleBaueigenschaften
          "
          @refresh-request-baueigenschafts-profil="
            refreshBaueigenschaftsProfile
          "
          @error-bezeichnung-baueigenschafts-profil="showErrorNotification"
        />
      </q-tab-panel>
    </q-tab-panels>
    <!-- NEU: Dialog für Confirmation des Löschens einer Baueigenschaft: -->
    <q-dialog
      v-if="selectedBaueigenschaftsProfil"
      v-model="deleteSelectedBaueigenschaftsProfilDialog"
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
            <span class="q-pa-none text-center">
              <b>Achtung:</b>
              <br />
              Diese Aktion <b>löscht</b> das ausgewählte Baueigenschaftsprofil
                 <b
                >"{{
                  selectedBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
                }}" unwiderruflich im gesamten System!</b>
              <br />
              <br />
              Wenn Sie unsicher sind bzw. das Profil nur an einer Baueinheit deaktivieren statt löschen möchten,
              wählen Sie bitte <b>"Aktion abbrechen".</b>
              <br />
              <br />
              Soll dieses Baueigenschaftsprofil <b>wirklich gelöscht</b> werden?
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
                label="Aktion abbrechen"
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
                label="Unwiderruflich löschen"
                color="negative"
                @click="deleteSelectedBaueigenschaftsProfil()"
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
// import UebersichtTabBaueigenschaftsProfile from "../components/uebersicht-tab-baueigenschafts-profile.vue";
import DetailsTabBaueigenschaftsProfil from "../components/details-tab-baueigenschafts-profil.vue";
// import BaueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten from "../components/baueigenschafts-profil-formulare-tab-baustoffe-und-baueinheiten.vue"
// import BaueinheitBodenaufbauBaueigenschaftsProfilFormular from "../components/baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue";
//***==================================================================================================================================================
export default {
  // name: 'ComponentName',
  props: [
    "node", // Knoten im Baustoff- oder Bauvorhabenbaum (d.h. verschachteltes Objekt für Baustoff oder Baueinheit) - ALT: zugeordnetesDokument
    "modus" // "Baustoff" oder "Baueinheit", zur Unterscheidung, von wo die Komponente aufgerufen wird
    // ACHTUNG: Zusätzlich emittiert die Komponente ein Event refresh-request-baueigenschafts-profil, für das beim Aufruf Ein Event Handler (Methode) angegeben werden muss!
  ],
  //***==================================================================================================================================================
  components: {
    // Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    // uebersichtTabBaueigenschaftsProfile,
    // detailsTabBaueigenschaftsProfil // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Baueigenschaftsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    // dummy,
    // bearbeitung
    detailsTabBaueigenschaftsProfil: DetailsTabBaueigenschaftsProfil
    // baueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten: BaueigenschaftsProfilFormulareTabBaustoffeUndBaueinheiten,
    // baueinheitBodenaufbauBaueigenschaftsProfilFormular: BaueinheitBodenaufbauBaueigenschaftsProfilFormular // ALT: "entwurf-schichtaufbau",
    // verschoben nach Unter-Tab von Tab "Bauvorhaben" > "Baueigenschaftsprofilformulare"
  },
  //***==================================================================================================================================================
  data() {
    return {
      btnLabel: "Profil aktivieren / deaktivieren", //
      // "Baueigenschaftsprofil an " + this.modus + " aktivieren/deaktivieren", // ALT - nimmt zu viel Platz ein
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      alwaysOn: true,
      selectedBaueigenschaftsProfil: null,
      alleBauinformationen: [],
      alleBaueigenschaften: [],
      tabBaueigenschaftsProfile: "uebersichtTabBaueigenschaftsProfile",
      localStore: globalStore,
      filterTableBaueigenschaftsProfile: "",
      internalSelectedRowsTableBaueigenschaftsProfile: [],
      alleBaueigenschaftsProfile: [],
      columnsTableBaueigenschaftsProfile: [
        {
          name: "baueigenschaftsProfilBezeichnung",
          label: "Bezeichnung des Baueigenschaftsprofils",
          field: row => row.baueigenschaftsProfilBezeichnung,
          align: "left",
          sortable: true
        },
        //=======================================================================
        // ACHTUNG: Die nächste Column wird eigens vom Frontend hinzugefügt!!!!!
        {
          name: "profilIstAktiviertAnDokument",
          label: "Aktiviert an " + this.modus + "?",
          field: row => row.profilAktiviertAnDokument,
          type: "toggle",
          align: "center",
          sortable: true
        },
        //=======================================================================
        {
          name: "baueigenschaftsProfilBemerkung",
          label: "Bemerkung zum Baueigenschaftsprofil",
          field: row => row.baueigenschaftsProfilBemerkung,
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
          name: "bauinformationsBezeichnungZugeordneteBauinformation",
          label: "Zugeordnete Bauinformation",
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
        // TODO XXXXXX: Hier weitere Columns (Bemerkung, Bauinformation, eventuell: zugeordnete Baueigenschaften per read-only Dropdown-Menü (q-select))
      ],
      deleteSelectedBaueigenschaftsProfilDialog: false,
      paginationTableBaueigenschaftsProfile: {
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
      }
    };
  },
  //======================================================================================================================================================
  methods: {
    duplicateSelectedBaueigenschaftsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------
      // NEU - #511: Dupliziert per API das ausgewählte Baueigenschaftsprofil
      //------------------------------------------------------------------------------------------------------------------------------
      console.log("In duplicateSelectedBaueigenschaftsProfil()");
      console.log("selectedProfilInTable._id: ", this.selectedProfilInTable._id);
      this.$axios
        .post(process.env.API + "/Baueigenschaftsprofile/" + this.selectedProfilInTable._id)
        .then(doc => {
          console.log("Nach API-Aufruf für Clonen des Profils", doc);
          this.refreshBaueigenschaftsProfile();
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_ERFOLG
          );
        })
        .catch(e => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_FEHLER
          );
        });
    },

    updateBeziehungAnBackend() {
      //------------------------------------------------------------------------------------------------------------------------------
      // Updated per API die zugeordneten Profile für einen Baustoff bzw. eine Baueinheit (d.h. die Beziehung zwischen diesen und den Profilen)
      //------------------------------------------------------------------------------------------------------------------------------
      let aktivierenNichtDeaktivieren = !this
        .internalSelectedRowsTableBaueigenschaftsProfile[0]
        .profilAktiviertAnDokument;
      if (this.modus === "Baustoff") {
        console.log("Update einer Baustoff-Beziehung");
        console.log("selectedProfilInTable: ", this.selectedProfilInTable);
        // console.log("Vor put-Request - vorgabeWerteUeberschreibenVorhandeneWerte: ", this.localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte)
        this.$axios
          .put(
            process.env.API +
              "/Baustoffe/" +
              this.node._id +
              "/Baueigenschaftsprofil/Aktivierungszustand",
            {
              idProfil: this.internalSelectedRowsTableBaueigenschaftsProfile[0]
                ._id,
              aktivierenNichtDeaktivieren: aktivierenNichtDeaktivieren,
              vorgabeWerteUeberschreibenVorhandeneWerte: this.localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte, // #357
              // NEU - #502: Neuer optionaler Parameter bei Deaktivieren, muss hier true sein:
              baueigenschaftenDeaktivieren: true
            }
          )
          .then(doc => {
            console.log("Nach Modifizierung", doc);
            this.$emit("refresh-request-baueigenschafts-profil"); // Refresh Request Event, wird in Elternkomponenten baueinheiten.vue und baustoffe.vue gehandelt
            if (aktivierenNichtDeaktivieren) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUSTOFF_ERFOLG
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUSTOFF_ERFOLG
              );
            }
          })
          .catch(e => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BAUSTOFF_MODIFIKATION_FEHLER
            );
          });
      } else {
        console.log("Update einer Baueinheit-Beziehung");
        console.log(this.selectedProfilInTable);
        // console.log("Vor put-Request - vorgabeWerteUeberschreibenVorhandeneWerte: ", this.localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte)
        this.$axios
          .put(
            process.env.API +
              "/Baueinheiten/" +
              this.node._id +
              "/Baueigenschaftsprofil/Aktivierungszustand",
            {
              idProfil: this.internalSelectedRowsTableBaueigenschaftsProfile[0]
                ._id,
              aktivierenNichtDeaktivieren: aktivierenNichtDeaktivieren,
              vorgabeWerteUeberschreibenVorhandeneWerte: this.localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte, // #357
              // NEU - #502: Neuer optionaler Parameter bei Deaktivieren, muss hier true sein:
              baueigenschaftenDeaktivieren: true
            }
          )
          .then(doc => {
            console.log("Nach Modifizierung", doc);
            this.$emit("refresh-request-baueigenschafts-profil"); // Refresh Request Event, wird in Elternkomponenten baueinheiten.vue und baustoffe.vue gehandelt
            if (aktivierenNichtDeaktivieren) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AKTIVIERUNG_AN_BAUEINHEIT_ERFOLG
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DEAKTIVIERUNG_AN_BAUEINHEIT_ERFOLG
              );
            }
          })
          .catch(e => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_BAUEINHEIT_MODIFIKATION_FEHLER
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
      this.internalSelectedRowsTableBaueigenschaftsProfile.splice(
        0,
        this.internalSelectedRowsTableBaueigenschaftsProfile.length
      );
      this.internalSelectedRowsTableBaueigenschaftsProfile.push(contextOnRow);
      switch (gewaehltesContextItem) {
        case "UpdateAktivierung":
          console.log("UpdateAktivierung");
          this.updateBeziehungAnBackend();
          break;
        case "Bearbeitung":
          this.tabBaueigenschaftsProfile = "detailsTabBaueigenschaftsProfil";
          break;
        case "Neuanlage":
          this.tabBaueigenschaftsProfile = "neuanlageTabBaueigenschaftsProfil";
          break;
        case "Löschen":
          this.deleteSelectedBaueigenschaftsProfilDialog = true;
          break;
        case "Duplizieren":
          this.duplicateSelectedBaueigenschaftsProfil();
          break;
      }
    },

    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      // Wird in q-tables für Baueigenschaften UND Bauinformationen verwewndet
      // Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      // Wird im Templates oben durch :pagination-label="getPaginationLabel" verwendet.
      // --------------------------------------------------------------------------------------------------------------------
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    getSelectedStringTableBaueigenschaftsProfile: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.internalSelectedRowsTableBaueigenschaftsProfile.length === 0
        ? ""
        : `${
            this.internalSelectedRowsTableBaueigenschaftsProfile.length
          } Baueieigenschaftsprofil${
            this.internalSelectedRowsTableBaueigenschaftsProfile.length > 1
              ? "e"
              : ""
          } ausgewählt`;
    },

    deleteSelectedBaueigenschaftsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------
      // API-Call um das in selectedBaueigenschaftsProfil befindliche Baueigenschaftsprofil zu löschen
      //------------------------------------------------------------------------------------------------------------------------------
      if (this.selectedBaueigenschaftsProfil !== null) {
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
          .delete(
            process.env.API +
              "/Baueigenschaftsprofile/" +
              this.selectedBaueigenschaftsProfil._id
          )
          .then(doc => {
            this.selectedBaueigenschaftsProfil = null; // Clear selection
            this.refreshBaueigenschaftsProfile();
            this.deleteSelectedBaueigenschaftsProfilDialog = false;
            this.localStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_ERFOLG
            );
          })
          .catch(error => {
            console.log("error: ", error);
            this.localStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_FEHLER
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
          this.tabBaueigenschaftsProfile = "detailsTabBaueigenschaftsProfil";
          break;
        case "Neuanlage":
          this.tabBaueigenschaftsProfile = "neuanlageTabBaueigenschaftsProfil";
          break;
        default:
          throw new Error("Invalid Argument in on TabChangeRequest");
      }
    },

    selectionHandlerUebersichtBaueigenschaftsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Setzt das Object selectedBaueigenschaftsProfil auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Profil ausgewaehlt wird
      //------------------------------------------------------------------------------------------------------------------------------
      console.log("In selectionHandlerUebersichtBaueigenschaftsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectedBaueigenschaftsProfil = newSelected[0];
      } else {
        this.selectedBaueigenschaftsProfil = null;
      }
    },

    selectionHandlerVorgabeWerteBaueigenschaftsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Setzt das Object selectionForDefaultValueChange auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Default-Wert-Objekt ausgewählt wird
      //-------------------------------------------------------------------------------------------------------------------------------
      console.log("In selectionHandlerVorgabeWerteBaueigenschaftsProfile()");
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
          BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD
        );
      } else {
        switch (sender) {
          case "Neuanlage":
            console.log(error.response.status);
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_NEUANLAGE_FEHLER
              );
            }
            break;
          case "Bearbeitung":
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_AENDERUNG_FEHLER
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
      //------------------------------------------------------------------------------------------------------------------------------
      // Setzt für alle Profile in der Table das Feld für die Spalte "Ist aktiviert" in Abhängigkeit davon, ob das Profil im
      // Array der zugeordneten Profile enthalten ist oder nicht
      // ACHTUNG: Der Aufbau für alleBaueigenschaftsProfile ist überall Array of Objects
      //=========================================================================================================================
      // ACHTUNG: Hier bisher noch Unterschied zu bauinformations-profile-tab-baustoffe-und-baueinheiten:
      // Der Aufbau des Array node.zugeordnteBaueigenschaftsProfile ist BISHER NICHT nested (nur Array of Ids)
      //=========================================================================================================================
      // NEU: Für #272/#505 wurde dieser bisher flache Array zum Array of Objects, daher musste der Code unten geändert werden!!!
      // NEU: arg => arg.referenzAufBaueigenschaftsProfil === element._id (ALT: arg => arg._id === element._id)
      //=========================================================================================================================
      console.log("In preprareZugeordneteProfileTable()");
      console.log(
        "node.zugeordneteBaueigenschaftsProfile: ",
        this.node.zugeordneteBaueigenschaftsProfile
      );
      this.alleBaueigenschaftsProfile.forEach(element => {
        if (
          // ALT: Finde Index in Array of _ids_:
          // this.node.zugeordneteBaueigenschaftsProfile.findIndex(arg => arg === element._id) >
          // NEU: Finde Index in populiertem Array of Objects {_id, baueigenschaftsProfilBezeichnung}:
          this.node.zugeordneteBaueigenschaftsProfile.findIndex(
            arg => arg.referenzAufBaueigenschaftsProfil._id === element._id
          ) >
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

    refreshBaueigenschaftsProfile(eventArgsModus, payload) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Lädt alle Daten aus dem Backend neu
      // eventArgsModus: "Neuanlage" oder "Bearbeitung" - wird nicht verwendet (d.h. unbedingter Refresh) - dafür wird die payload herangezogen
      //                  TODO: Umschreiben, dass zur Steuerung nicht die payload, sondern eventArgModus herangezogen wird
      // payload: id, welches Baueigenschaftsprofil (Wieder nach Update) ausgewählt werden soll (bei "Neuanlage" wird darin die id des neuen Profils mitgegeben)
      //          Bei Bearbeitung wird statt payload die id aus selectedBaueigenschaftsProfil entnommen.
      //          Kann/sollte also im Fall "Bearbeitung" leer sein
      console.log("In refreshBaueigenschaftsProfile()");
      console.log("eventArgsModus: ", eventArgsModus);
      console.log("payload: ", payload);
      let idGewuenschteAuswahlTabelleBaueigenschaftsprofile = null;
      if (payload != null && payload !== undefined) {
        idGewuenschteAuswahlTabelleBaueigenschaftsprofile = payload;
      } else {
        if (this.selectedBaueigenschaftsProfil !== null) {
          console.log(this.selectedBaueigenschaftsProfil);
          idGewuenschteAuswahlTabelleBaueigenschaftsprofile = this
            .selectedBaueigenschaftsProfil._id; // id der bisherige Table Selection merken, sonst null
        } else {
          // Es war kein Baueigenschaftsprofil ausgewählt - nichts zu tun
        }
      }
      // Jetzt weitermachen mit Refresh:
      console.log("Vor Axios-Call für Get aller Baueigenschaftsprofile");
      this.$axios
        .get(process.env.API + "/Baueigenschaftsprofile")
        .then(doc => {
          console.log("Alle Baueigenschaftsprofile - doc:", doc);
          this.alleBaueigenschaftsProfile = doc.data;
          if (idGewuenschteAuswahlTabelleBaueigenschaftsprofile !== null) {
            // Ausgewähltes Baueigenschaftsprofil ggf. wiederfinden und Table Selection darauf setzen
            this.selectedBaueigenschaftsProfil = this.alleBaueigenschaftsProfile.find(
              arg =>
                arg._id === idGewuenschteAuswahlTabelleBaueigenschaftsprofile
            );
            this.internalSelectedRowsTableBaueigenschaftsProfile = [
              this.selectedBaueigenschaftsProfil
            ]; // Die Auswahl in der Tabelle der zugeordneten Baueigenschaften muss aktualisiert werden
            // selectedBaueigenschaftsProfil ist ein Objekt der ausgewählten Baueigenschaft, während internalSelectedRowsTableBaueigenschaftsProfile ein Array der Länge 1 (0, falls nichts ausgewählt) ist.
          }
          // Fix von @sts für #343, seit 08/21:
          this.prepareZugeordneteProfileTable()
          if (payload != null && payload !== undefined) {
            this.tabBaueigenschaftsProfile = "detailsTabBaueigenschaftsProfil";
          }
          console.log("Nach Axios-Call für Get aller Baueigenschaften");
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log(
            "Fehler beim Lesen aller Baueigenschaftsprofile - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
          );
          this.tabBaueigenschaftsProfile =
            "uebersichtTabBaueigenschaftsProfile";
        });
    }
  },
  //***==================================================================================================================================================
  computed: {
    getTableTitleString: function() {
      // NEU: Computed-Funktion für variablen Titel an QTable
      return (
        "Baueigenschaftsprofile an " +
        (this.modus === "Baueinheit" ? "der " : "dem ") +
        "im " +
        (this.modus === "Baueinheit" ? "Bauvorhabenbaum " : "Baustoffbaum ") +
        "ausgewählten " +
        this.modus +
        " ''" +
        (this.modus === "Baueinheit"
          ? this.node.baueinheitsBezeichnung
          : this.node.baustoffBezeichnung) +
        "''"
      );
    },

    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBaueigenschaftsProfile: function() {
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
            .mitarbeiterDuerfenBearbeiteneBaueigenschaftsprofile
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
      if (this.internalSelectedRowsTableBaueigenschaftsProfile.length > 0) {
        return this.internalSelectedRowsTableBaueigenschaftsProfile[0];
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
    internalSelectedRowsTableBaueigenschaftsProfile: {
      handler: function(value) {
        console.log(
          "In Watcher für internalSelectedRowsTableBaueigenschaftsProfile"
        );
        if (this.internalSelectedRowsTableBaueigenschaftsProfile.length > 0) {
          this.selectedBaueigenschaftsProfil = this.internalSelectedRowsTableBaueigenschaftsProfile[0];
        } else {
          this.selectedBaueigenschaftsProfil = null;
        }
      }
    }
  },
  //***==================================================================================================================================================
  mounted() {
    let baueigenschaftenGetError = true;
    let baueigenschaftsProfileGetError = true;
    let bauinformationenExtraktGetError = true;
    this.$axios
      .get(process.env.API + "/Baueigenschaften")
      .then(doc => {
        // console.log("Alle Baueigenschaften - doc:", doc);
        console.log("Success beim Get aller Baueigenschaften");
        this.alleBaueigenschaften = doc.data;
        baueigenschaftenGetError = false;
      })
      .then(() => this.$axios.get(process.env.API + "/Baueigenschaftsprofile"))
      .then(doc => {
        // console.log("Alle Baueigenschaftsprofile - doc:", doc);
        console.log("Success beim Get aller Baueigenschaftsprofile");
        this.alleBaueigenschaftsProfile = doc.data;
        baueigenschaftsProfileGetError = false;
      })
      .then(() => {
        return this.$axios.get(process.env.API + "/Bauinformationen/Extrakt"); // ACHTUNG: Hier return notwendig wegen Chaining von .thens!!!
        // NEU: Nur Extrakt von Felder holen, nicht die ganze Bauinformation (für QSelects ausreichend) - Fix für Backlog Item #159
      })
      .then(doc => {
        // console.log("Extrakt aller Bauinformationen - doc: ", doc);
        console.log("Success beim Get des Extrakts aller Bauinformationen");
        bauinformationenExtraktGetError = false;
        this.alleBauinformationen = doc.data;
        this.prepareZugeordneteProfileTable();
      })
      .catch(error => {
        if (baueigenschaftenGetError) {
          console.log(
            "Fehler beim Get für alle Baueigenschaften - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_LESEN_FEHLER
          );
        } else if (baueigenschaftsProfileGetError) {
          console.log(
            "Fehler beim Get für alle Baueigenschaftsprofile- error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
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
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_ANZEIGEN_FEHLER
          );
        }
      });
  }
};
</script>
