<template>
  <q-page class="q-pa-xs">
    <!-- Die folgende q-card disabled, sie ist nicht notwendig, verbraucht nur zusätzlichen vertikalen Space -->
    <!-- <q-card class="q-pa-xs"> -->
    <!-- =============================================================================================================================== -->
    <q-tabs mobile-arrows
      class="q-pa-none text-black bg-grey-4 full-width"
      active-color="primary"
      active-bg-color="white"
      content-class="text-h7"
      dense
      align="left"
      v-model="tabBaueigenschaften"
    >
      <q-tab
        name="uebersichtTabBaueigenschaften"
        label="Übersicht aller Baueigenschaften"
        no-caps
      />
      <q-tab
        name="beschreibungTabBaueigenschaft"
        :disable="selectedBaueigenschaft == null"
        label="Beschreibung für ausgewählte Baueigenschaft"
        no-caps
      />
      <q-tab
        name="detailsTabBaueigenschaft"
        :disable="selectedBaueigenschaft == null"
        label="Details zur ausgewählten Baueigenschaft"
        no-caps
      />
      <q-tab
        :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
        name="neuAnlageTabBaueigenschaft"
        label="Neuanlage einer Baueigenschaft"
        no-caps
      />
      <!-- NEU - aus Haupttableiste hierher verschoben: -->
      <q-tab
        :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
        name="baueigenschaftsProfileTab"
        label="Baueigenschaftsprofile"
        no-caps
      />
    </q-tabs>
    <!-- =============================================================================================================================== -->
    <q-tab-panels v-model="tabBaueigenschaften" keep-alive animated>
      <q-tab-panel name="uebersichtTabBaueigenschaften" class="q-pa-xs">
        <!-- ACHTUNG: @xyz sind 3 Events, die uebersichtTabBaueigenschaften aussendet, hier werden dafür die Event Handler angegeben! -->
        <uebersichtTabBaueigenschaften
          :dataTableBaueigenschaften="alleBaueigenschaften"
          :columnsTableBaueigenschaften="columnsTableBaueigenschaften"
          :selectedRowsTableBaueigenschaften="selectedBaueigenschaft"
          @selection-changed="changeSelectionAusgewaehlteBaueigenschaft"
          @change-tab-request="handleChangeTabRequest"
          @delete-request="deleteSelectedBaueigenschaftDialog = true"
        />
        <!-- <br /> -->
        <!-- ALT: -->
        <!-- v-if="$q.screen.gt.xs" -->
        <div
          class="flex row full-width q-pa-xs q-col-gutter-xs"
        >
          <div class="col-md-3 col-12 text-caption">
            Aktionen für Baueigenschaften
            {{ displayRightArrow }}
            <br />
            <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
            Mit
            <q-checkbox v-model="alwaysOn" disable dense color="primary" />
            in der ersten Spalte Baueigenschaft auswählen. Alternativ mit
            rechter Maustaste Kontextmenü aufrufen.
            <!-- <br />&nbsp; <br /> -->
          </div>
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" class="q-mr-sm" -->
            <q-btn
              class="stretch full-width"
              label="Baueigenschaft anzeigen / bearbeiten"
              color="secondary"
              glossy
              no-caps
              :disable="selectedBaueigenschaft === null"
              @click="tabBaueigenschaften = 'detailsTabBaueigenschaft'"
            />
          </div>
          <!-- TODO  @click="openEigenschaftAuswahl()" -->
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" -->
            <q-btn
              class="stretch full-width"
              label="Baueigenschaft löschen"
              color="negative"
              glossy
              no-caps
              @click="deleteSelectedBaueigenschaftDialog = true"
              :disable="
                selectedBaueigenschaft === null ||
                  !benutzerDarfBearbeitenTypbezogeneBaueigenschaften
              "
            />
          </div>
          <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBaueigenschaft()"-->
          <!-- <q-separator vertical inset /> -->
          <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" -->
            <q-btn
              class="stretch full-width"
              label="Baueigenschaft neu anlegen"
              glossy
              color="green-8"
              @click="tabBaueigenschaften = 'neuAnlageTabBaueigenschaft'"
              no-caps
              :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
            />
          </div>
        </div>
      </q-tab-panel>
      <!-- =============================================================================================================================== -->
      <q-tab-panel
        name="beschreibungTabBaueigenschaft"
        v-if="selectedBaueigenschaft"
        class="q-pa-xs"
      >
        <beschreibungTabBaueigenschaft
          :baueigenschaft="selectedBaueigenschaft"
          :baueigenschaftsBeschreibung="
            selectedBaueigenschaft.baueigenschaftsBeschreibung
          "
          @refreshRequest="refreshBaueigenschaften"
        />
      </q-tab-panel>
      <q-tab-panel
        name="detailsTabBaueigenschaft"
        v-if="selectedBaueigenschaft"
        class="q-pa-xs"
      >
        <detailsTabBaueigenschaft
          :zuManipulierendeBaueigenschaft="selectedBaueigenschaft"
          modus="Bearbeitung"
          :alleBauinformationen="alleBauinformationen"
          @refreshRequest="refreshBaueigenschaften"
          @errorInComponent="showErrorNotification"
        />
      </q-tab-panel>
      <q-tab-panel
        name="neuAnlageTabBaueigenschaft"
        class="q-pa-xs"
      >
        <detailsTabBaueigenschaft
          modus="Neuanlage"
          :alleBauinformationen="alleBauinformationen"
          @refreshRequest="refreshBaueigenschaften"
          @errorInComponent="showErrorNotification"
        />
      </q-tab-panel>
      <!--===================================================================================== -->
      <!-- NEU: QTabPanel für Baueigenschaftsprofile hierher verschoben aus der Haupttableiste: -->
      <q-tab-panel
          name="baueigenschaftsProfileTab"
          label="Baueigenschaftsprofile"
          no-caps
          class="q-pa-xs"
        >
        <baueigenschaftsProfile
        />
        <!-- --------------------------------------------------------------------------------- -->
        <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
        <!-- --------------------------------------------------------------------------------- -->
        <q-tooltip
          :delay="1000"
          :offset="[0, 10]"
          max-width="500px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          Verwaltung zusammengehöriger Baueigenschaften
        </q-tooltip>
        </q-tab-panel>
      <!-- =============================================================================================================================== -->
    </q-tab-panels>
    <!-- </q-card> -->
    <!-- NEU: Dialog für Confirmation des Löschens einer Baueigenschaft: -->
    <q-dialog
      v-if="selectedBaueigenschaft"
      v-model="deleteSelectedBaueigenschaftDialog"
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
              Soll die Baueigenschaft
              <b
                >"{{
                  selectedBaueigenschaft.baueigenschaftsBezeichnung
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
                @click="deleteSelectedBaueigenschaft()"
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
  </q-page>
</template>
<script>
//***==================================================================================================================================================
// DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
// Komponenten für Baueigenschaften:
//----------------------------------------------------------------------------------------------------------------
// Komponenten für Baueigenschaften - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
import uebersichtTabBaueigenschaften from "../components/uebersicht-tab-baueigenschaften.vue";
import beschreibungTabBaueigenschaft from "../components/beschreibung-tab-baueigenschaft.vue";
import detailsTabBaueigenschaft from "../components/details-tab-baueigenschaft.vue";
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import BaueigenschaftsProfile from "../components/baueigenschafts-profile.vue"; // NEU

//----------------------------------------------------------------------------------------------------------------
// Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
// import uebersichtTabBaueigenschaftsProfile from "../components/uebersicht-tab-baueigenschafts-profile.vue";
// import detailsTabBaueigenschaftsProfil from "../components/etails-tab-baueigenschafts-profil.vue";
//----------------------------------------------------------------------------------------------------------------
/*
import dummy from '../components/dummy-component.vue'
import bearbeitung from '../components/bearbeitung-profil-eigenschaft-defaultwerte.vue'
*/
//***==================================================================================================================================================
export default {
  name: "Baueigenschaften", // Vue Component Name - ACHTUNG - dabei beachten:
  // Exkurs zu Vue Component Names:
  // 1. Auf Groß-/Kleinschreibung achten
  // 2. Zwei Varianten möglich, siehe https://vuejs.org/v2/guide/components-registration.html
  //    Wir verwenden, weil Quasar es auch so macht, PascalCase für den Komponentennamen
  // 3. Der Component Name muss nicht mit dem gewählten File Name der Komponente übereinstimmen. Wir befolgen dafür folgende Namenskonvention:
  //    Component Name der Komponente:           ComponentName  in PascalCase (Großbuchstaben am Anfang aller Worte)
  //    Entsprechender File Name der Komponente: component-name in kebab-case (nur Kleinbuchstaben, mit Strichen getrennt)
  // 4. Der File Name der Komponente wird in routes.js referenziert - dort werden File Names von Komponenten zu Route Names und Route Pfaden zugeordnet!
  // 5. In MyLayout werden in den q-route-tabs nur Route Names referenziert, nicht Component Names!
  // 6. Wenn eine Komponente per components: andere Komponenten verwendet, werden diese zunächst importiert mit ihren File Names, und dann
  //    beliebig lokal benannt (dies sollte auch wieder obige Namenskonvention für die beiden beteiligten Namen folgen) - Beispiel:
  //    import ImportBaueigenschaftBearbeitung from "../components/baustoffe-baueigenschaft-bearbeitung"; // dabei beliebiger Name für den Import
  //    Danach in data():
  //    BaueigenschaftBearbeitung: ImportBaueigenschaftBearbeitung, // Lokaler Name für die verwendete Komponente, damit kann sie im Template
  //    dann per <BaueigenschaftBearbeitung> angesprochen werden, z.B.:
  //    <div> <BaueigenschaftBearbeitung :bearbeiteteBaueigenschaft="ausgewaehlteBaueigenschaft"> ... </div>
  //    Dabei erfolgen per :prop="xyz" Bindungen für deren Props.
  // 7. Im Template können Komponenten dann mit ihrem hier deklarierten Namen angesprochen werden per <ComponentName>
  // 8. Wenn man den Quasar Befehl quasar new page NewComponent benutzt, legt dieser ein File mit demselbern Namen NewComponent.vue an -
  //    dieses dann manuell umbenennen in new-component.vue, um obige Namenskonvention einzuhalten!
  //***================================================================================================================================
  components: {
    // DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
    //----------------------------------------------------------------------------------------------------------------
    // Komponenten für Baueigenschaften - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    uebersichtTabBaueigenschaften,
    beschreibungTabBaueigenschaft,
    detailsTabBaueigenschaft,
    // NEU:
    baueigenschaftsProfile: BaueigenschaftsProfile, // NEU: Diese Komponente war ursprünglich eine Page
    // und wurde per q-route-tab aus der Haupttableiste in my-layout.vue bzw. front-end-server-routes angesprochen.
    // Jetzt hierher verlagert, eine Tab-Ebene tiefer, um die Haupttableiste zu verschlanken.
    //----------------------------------------------------------------------------------------------------------------
    // Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    // uebersichtTabBaueigenschaftsProfile,
    // detailsTabBaueigenschaftsProfil, // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Baueigenschaftsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    // dummy,
    // bearbeitung
  },

  //***================================================================================================================================
  data: () => {
    return {
      localStore: globalStore,
      deleteSelectedBaueigenschaftDialog: false,
      alwaysOn: true,
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      // Vorerst liegen diese Sachen hier:
      // alleBaueigenschaftsProfile: [],
      alleBaueigenschaften: [],
      alleBauinformationen: [], // Enthält Extrakt der für die QSelects notwendigen Felder aller Bauinformationen
      topLevelTabBaueigenschaften: null,
      tabBaueigenschaften: "uebersichtTabBaueigenschaften",
      selectedBaueigenschaft: null,
      nothingSelectedInTableBaueigenschaften: false,
      // selectedBaueigenschaftsProfil: null,
      // tabBaueigenschaftsProfile: null,
      selectionForDefaultValueChange: null, // TODO: Diese Bezeichnung folgt noch nicht dem vereinbarten Namenskonventionen!!! Meint es selectedBaueigenschaft???
      /* columnsTableBaueigenschaftsProfile: [
        {
          name: "baueigenschaftsProfilBezeichnung",
          label: "Baueigenschaftsprofilbezeichnung",
          field: row => row.baueigenschaftsProfilBezeichnung
        },
        // TODO XXXXXX: Hier weitere Columns (Bemerkung, Bauinformation, eventuell: zugeordnete Baueigenschaften per read-only Dropdown-Menü (q-select))
      ],
      */
      columnsTableBaueigenschaften: [
        {
          name: "baueigenschaftsBezeichnung",
          label: "Bezeichnung der Baueigenschaft",
          field: row => row.baueigenschaftsBezeichnung,
          align: "left",
          sortable: true
        },
        // Kennwertbezogene Angaben
        // ALT: Direkt hinter den Kennwerten eingeblendet, um häufiges nach rechts scrollen zu verhindern!
        // In Konflikt mit dem neuen multiplen Header aus zwei Zeilen mit "Oberspalten" und "Unterspalten"
        // NEU: Kennwertbezogene Angaben vor die wertbezogenen Angaben verschoben
        {
          name: "symbol",
          label: "Symbol",
          field: row => row.symbol,
          align: "right",
          sortable: true
        },
        {
          name: "einheit",
          label: "Einheit",
          field: row => row.einheit,
          align: "right",
          sortable: true
        },
        {
          name: "operator",
          label: "Operator",
          field: row => row.operator,
          align: "right",
          sortable: true
        },
        {
          // NEU:
          name: "formel",
          label: "Formel",
          field: row => row.formel,
          align: "right",
          sortable: true
        },
        // Weitere fachliche Angaben:
        // sts: Update 26.05.20
        {
          name: "werteTyp",
          label: "Wertetyp", // NEU
          field: row => row.werteTyp,
          align: "left",
          sortable: true
        },
        {
          name: "baueigenschaftsAnzeigeText", // NEU: #514:
          label: "Anzeigetext für die Baueigenschaft",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.baueigenschaftsAnzeigeText,
          align: "left",
          sortable: true
        },
        {
          name: "baueigenschaftsBemerkung",
          label: "Bemerkung zur Baueigenschaft",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.baueigenschaftsBemerkung,
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
        {
          name: "systemdefiniertNichtBenutzerdefiniert", // NEU: #514:
          label: "Ist systemdefiniert?",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.systemdefiniertNichtBenutzerdefiniert,
          align: "center",
          sortable: true,
          type: "toggle" // Triggert Anzeige von Checkbox statt "true"/"False"
        },
        {
          name: "sollwertNichtIstwert", // NEU: #514:
          label: "Repräsentiert Sollwerte?",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.sollwertNichtIstwert,
          align: "center",
          sortable: true,
          type: "toggle" // Triggert Anzeige von Checkbox statt "true"/"False"
        },
        {
          name: "bauinformationsBezeichnung",
          label: "Zugehörige Bauinformation",
          // ACHTUNG: "field" wuude früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.bauinformation !== undefined && row.bauinformation !== null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.bauinformation.bauinformationsBezeichnung
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
            row.bauinformation !== undefined && row.bauinformation !== null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.bauinformation.bauinformationsTyp
              : null,
          // field: row => row.bauinformation.bauinformationsTyp,
          // ACHTUNG: Nested Property, funktioniert in q-table mit v-slots für Body nur mit speziellem Code unten!!
          // ACHTUNG: Das Feld musste zusätzlich in den Array textFields aufgenommen werden, um per v-slot angezeigt zu werden
          align: "left",
          sortable: true
        },
        // Schutzkategorien/fachliche Rubriken:
        //---------------------------------------------------------------------------------------------------------------------------------------------------------
        // ALT: Schutzkategorien/fachliche Rubriken
        // NEU - #401: Neue fachliche Kategorien/Rubriken, wie in options-fachliche-kategorien-baueigenschaften.js definiert
        // ACHTUNG: Hier nicht wie in baueinheiten.vue und baustoffe.vue "row.typbezogeneBaueigenschaft.fachlicheKategorien", sondern nur "row.fachlicheKategorien"
        {
          name: "strukturAllgemein", // NEU: #514/515
          align: "center",
          label: "Allgemein", // Rubrik - Unterüberschrift in 2. Header-Zeile, die Kategorie wird in der ersten Header-Zeile angezeigt
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
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
            row.fachlicheKategorien.includes(
              "Sonstiges > Test"
            ), // NEU - #401
          // field: row => row.typbezogeneBaueigenschaft.rubrikXyz, // ALT
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        }
        // ----------------------------------------------------------------------------------------------------------------------------------
        // ALT: Struktur vor #401 (alte fachliche Rubriken)
        /*
        {
          name: "projektManagement", // NEU: #514/515
          align: "center",
          label: "Projektsteuerung",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.projektManagement,
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
          field: row => row.recht,
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
          field: row => row.geografie,
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
          field: row => row.geoPolitik,
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
          field: row => row.infrastruktur,
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
          field: row => row.umweltUndKlima,
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
          field: row => row.hydroGeologie,
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
          field: row => row.geometrie,
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
          field: row => row.konstruktion,
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
          field: row => row.lastAnnahmen,
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
          field: row => row.nutzungsUndBetriebsZeiten,
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
          field: row => row.raumKlima,
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
          field: row => row.beleuchtung,
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
          field: row => row.schallSchutz,
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
          field: row => row.raumAkustik,
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
          field: row => row.wärmeSchutz,
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
          field: row => row.energieEinsparung,
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
          field: row => row.standSicherheit,
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
          field: row => row.verkehrsSicherheit,
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
          field: row => row.gebrauchsTauglichkeit,
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
          field: row => row.barriereFreiheit,
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
          field: row => row.brandSchutz,
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
          field: row => row.feuchteSchutz,
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
          field: row => row.abdichtungsTechnik,
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
          field: row => row.korrosionsSchutz,
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
          field: row => row.chemischerHolzSchutz,
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
          field: row => row.gesundheitUndHygiene,
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
          field: row => row.schadstoffSchutz,
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
          field: row => row.umweltVerträglichkeit,
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
          field: row => row.ökoBilanz,
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
          field: row => row.nachhaltigkeit,
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
          field: row => row.materialEigenschaften,
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
          field: row => row.sonstiges,
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
          field: row => row.baueigenschaftsProfile,
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
          field: row => row.bauinformationsProfile,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle"
        },
        */
      ]

      /*
      emptyProfile: {
        profilBezeichnung: "Neues Profil",
        zugehoerigeBaueigenschaften: []
      },

      emptyRelation: {
        zugehoerigeEigenschaft: null,
        kennWert1: null,
        kennWert2: null,
        datumsWert1: null,
        datumsWert2: null,
        tagesZeitWert1: null,
        tagesZeitWert2: null,
        bezeichnungsWert1: null,
        bezeichnungsWert2: null,
        aufzaehlungsWert: null,
        wahrheitsWert: null
      }
      */
    };
  },

  //***==================================================================================================================================================
  computed: {
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
    }
  }, // /computed:

  //***==================================================================================================================================================
  methods: {
    doStuff() {
      console.log("Stuff is done");
    },

    showErrorNotification(error) {
      // Unterkomponenten teilen ihre Fehler mit, diese Page zeigt sie dann mittels des global-stores dann an.
      console.log("In showErrorNotification: ", error);
      if (error.response.status === 403) {
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS
        );
      } else {
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER
        );
      }
    },

    handleChangeTabRequest(nameOfTab) {
      // -----------------------------------------------------------------------------
      // Wird verwendet um von Kindkomponenten gewünschte Tabwechsel durchzuführen
      console.log("In handleChangeTabRequest mit Argument: ", nameOfTab);
      switch (nameOfTab) {
        case "Bearbeitung":
          this.tabBaueigenschaften = "detailsTabBaueigenschaft";
          break;
        case "Neuanlage":
          this.tabBaueigenschaften = "neuAnlageTabBaueigenschaft";
          break;
        default:
          throw new Error("Es gab ein Problem");
      }
    },

    deleteSelectedBaueigenschaft() {
      // --------------------------------------------------------------------------
      // Löscht die in selectedBaueigenschaft befindliche Baueigenschaft am Backend
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBaueigenschaften'");
      this.$socket.emit("leaveRoom", {
        room: "roomBaueigenschaften"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBaueigenschaften'");
      //=========================================================================================================================================
      // ACHTUNG: Hier zusätzlich Leave für roomBaueigenschaften notwendig, denn es wurde ja eine Baueigenschaft gelöscht!
      console.log("Vor Emit to leave room 'roomBaueigenschaften'");
      this.$socket.emit("leaveRoom", {
        room: "roomBaueigenschaften"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBaueigenschaften'");
      //=========================================================================================================================================
      this.$axios
        .delete(
          process.env.API +
            "/Baueigenschaften/" +
            this.selectedBaueigenschaft._id +
            // #395 - Löschen in beiden Bäumen:
            "/" + "Allgemein"
        )
        .then(doc => {
          console.log("Baueigenschaft erfolgreich gelöscht");
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFT_LOESCHEN_ERFOLG
          );
          this.selectedBaueigenschaft = null // Fix vom 25.11.20, damit keine Baueigenschaft mehr ausgewählt ist
          this.refreshBaueigenschaften();
          this.deleteSelectedBaueigenschaftDialog = false;
        })
        .catch(error => {
          console.log("Fehler beim Löschen der Baueigenschaft - error:", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFT_LOESCHEN_FEHLER
          );
          this.refreshBaueigenschaften(); // NEU: Auch hier refreshen, es könnte z.B. Error 404 sein, wo ein anderer Benutzer bereits die
          // Baueigenschaft gelöscht hatte, daher ist es besser, die Baueigenschaften aus dem Backend zu refreshen
          // this.refreshBaueigenschaften(); // ALT
          this.deleteSelectedBaueigenschaftDialog = false;
        });
    },

    changeSelectionAusgewaehlteBaueigenschaft(newSelected) {
      // -----------------------------------------------------------------------------
      // Setzt das Objekt selectedBaueigenschaft in dieser Komponente auf new Selected
      // Wird verwendet, wenn Kindkomponenten die Auswahl ändern
      console.log("In changeSelectionAusgewaehlteBaueigenschaft()");
      console.log("Parameter newSelected: ", newSelected);
      console.log(newSelected);
      if (newSelected.length > 0) {
        this.selectedBaueigenschaft = newSelected[0];
      } else {
        this.selectedBaueigenschaft = null;
      }
    },

    /*
    selectionHandlerUebersichtBaueigenschaftsProfile(newSelected) {
      console.log("In selectionHandlerUebersichtBaueigenschaftsProfile()");
       console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectedBaueigenschaftsProfil = newSelected[0];
      } else {
        this.selectedBaueigenschaftsProfil = null;
      }
    },

    selectionHandlerVorgabeWerteBaueigenschaftsProfile(newSelected) {
      console.log("In selectionHandlerVorgabeWerteBaueigenschaftsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectionForDefaultValueChange = newSelected[0];
      } else {
        this.selectionForDefaultValueChange = null;
      }
    },

    refreshBaueigenschaftsProfile() {
      console.log("In refreshBaueigenschaftsProfile()");
      let idOldSelectionTable;
      if (this.selectedBaueigenschaftsProfil !== null) {
        idOldSelectionTable = this.selectedBaueigenschaftsProfil._id;
      }
      this.$axios
        .get(process.env.API + "/Baueigenschaftsprofile")
        .then(doc => {
          console.log("Alle Baueigenschaftsprofile - doc:", doc);
          this.alleBaueigenschaftsProfile = doc.data;
          if (idOldSelectionTable !== undefined) {
            this.selectedBaueigenschaftsProfil = this.alleBaueigenschaftsProfile.find(
              arg => arg._id === idOldSelectionTable
            );
          }
        });
    },
    */
    refreshBaueigenschaften(aufruferbezeichnung) {
      // Lädt die Baueigenschaften aus dem Backend neu und gibt eine vom Aufrufer (eine Komponente) festgelegte Meldung an den Nutzer ab
      console.log("In refreshBaueigenschaften()");
      let idOldSelectionTable = null; // id der bisherigen Table Selection merken, sonst null
      if (this.selectedBaueigenschaft !== null) {
        idOldSelectionTable = this.selectedBaueigenschaft._id;
      }
      this.$axios
        .get(process.env.API + "/Baueigenschaften")
        .then(doc => {
          console.log("Alle Baueigenschaften - doc: ", doc);
          this.alleBaueigenschaften = doc.data;
          if (idOldSelectionTable !== null) {
            // NEU, ALT: !== undefined
            // Ausgewählte Baueigesnchaft ggf. wiederfinden und Table Selection darauf setzen
            this.selectedBaueigenschaft = this.alleBaueigenschaften.find(
              arg => arg._id === idOldSelectionTable
            );
          }
          switch (aufruferbezeichnung) {
            case "Neuanlage":
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_ERFOLG
              );
              break;
            case "Bearbeitung":
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEIGENSCHAFT_AENDERUNG_ERFOLG
              );
              break;
          }
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log(
            "Fehler beim Lesen aller Baueigenschaften - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_LESEN_FEHLER
          );
        });
    }
  },

  //***==================================================================================================================================================
  mounted() {
    //---------------------------------------------------------------------------------------------------------------------------------
    // Mounted-Funktion, für Initialisierungen beim Laden der Komponente
    //---------------------------------------------------------------------------------------------------------------------------------
    console.log("In mounted() von baueigenschaften.vue");
    // NEU: JWT Header setzen für Axios Calls an das Backend:
    const myJWTToken = localStorage.getItem("jwtToken");
    let baueigenschaftenGetError = true;
    // let bauinformationenGetError = true;
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;
    console.log("process.env.API: ", process.env.API);
    this.$axios
      .get(process.env.API + "/Baueigenschaften")
      .then(doc => {
        // console.log("Alle Baueigenschaften - doc:", doc);
        console.log("Success beim Get aller Baueigenschaften");
        this.alleBaueigenschaften = doc.data;
        baueigenschaftenGetError = false;
      })
      .then(() => {
        return this.$axios.get(process.env.API + "/Bauinformationen/Extrakt"); // ACHTUNG: Hier return notwendig wegen Chaining von .thens!!!
        // NEU: Nur Extrakt von Felder holen, nicht die ganze Bauinformation (für QSelects ausreichend) - Fix für Backlog Item #159
      })
      .then(doc => {
        // console.log("Extrakt aller Bauinformationen - doc:", doc);
        console.log("Success beim Get des Extrakts aller Baueinformationen");
        this.alleBauinformationen = doc.data;
        // bauinformationenGetError = false;
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
        } else {
          // Wenn wir hier sind, ist der Get für die Bauinformationen fehlgeschlagen
          console.log(
            "Fehler beim Get für alle Bauinformationen - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
          );
        }
      });
  }
};
</script>
