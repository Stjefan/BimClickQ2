<template>
  <q-page class="q-pa-none">
    <!--NEU: Hier vor Verschiebung dieser Komponente von /pages nach /components class="q-pa-xs", nach Verschhiebung -->
    <!--     trat damit ein zu großer Abstand zwischen der ersten und zweiten grauen Untertableiste auf, daher seither "q-pa-none"! -->
    <!-- Die folgende q-card disabled, sie ist nicht notwendig, verbraucht nur zusätzlichen vertikalen Space -->
    <!-- <q-card class="q-pa-xs"> -->
    <!-- =============================================================================================================================== -->
    <q-tabs mobile-arrows
      v-model="tabBaueigenschaftsProfile"
      class="q-pa-none text-black bg-grey-4 full-width"
      active-color="primary"
      active-bg-color="white"
      content-class="text-h7"
      dense
      align="left"
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
    </q-tabs>
    <q-tab-panels v-model="tabBaueigenschaftsProfile">
      <!-- ACHTUNG: Hier kein keep-alive möglich!!! Grund: Wenn eine Baueigenschaft für ein in "Übersicht" ausgewähltes Profil zunächst in "Vorgabewerte" bearbeitet wird, und dann -->
      <!--          im Tab "Übersicht" das Profil gewechselt wird, bekommt das Tab "Vorgabewerte" diese Änderung nicht mit und zeigt eine leere Baueigenschaft an (FEHLER) -->
      <!--          keep-alive ist auf dieser unteren Ebene nicht unbedingt notwendig, verwirrt eventuell sogar, weil der Benutzer dann eventuell -->
      <!--          gar nicht mitbekommt, dass er das Profil gewechselt hat (weil das Tab dasselbe bliebe) -->
      <!--          Wenn keep-alive gewünscht würde, müsste die Komponente für die Vorgabewerte diesen Fall explizit handlen -->
      <q-tab-panel name="uebersichtTabBaueigenschaftsProfile" class="q-pa-xs">
        <!-- ACHTUNG: uebersichtTabBaueigenschaftsProfile enthält eine Tabelle für die Profile. Deren ausgewählte Row wird über prop selectedRowsTableaueigenschaftsProfile festgelegt. -->
        <!-- Im Unterschied dazu enthält die analoge Komponente baueigenschafts-profile-tab-baustoffe-und-baueinheiten diese Tabelle direkt und steuert die ausgewählte -->
        <!-- Zeile selbst über selected.sync="internalSelectedRowsTableBaueigenschaftsProfile" -->
        <!-- NEU - #511: @duplicate-request-baueigenschafts-profil -->
        <uebersichtTabBaueigenschaftsProfile
          :dataTableBaueigenschaftsProfile="alleBaueigenschaftsProfile"
          :columnsTableBaueigenschaftsProfile="
            columnsTableBaueigenschaftsProfile
          "
          :selectedRowsTableBaueigenschaftsProfile="
            selectedBaueigenschaftsProfil
          "
          @selection-changed-table-baueigenschafts-profile-baueigenschafts-profil="
            selectionHandlerUebersichtBaueigenschaftsProfile
          "
          @change-tab-request-baueigenschafts-profil="onTabChangeRequest"
          @delete-request-baueigenschafts-profil="
            deleteSelectedBaueigenschaftsProfilDialog = true
          "
          @duplicate-request-baueigenschafts-profil="duplicateSelectedBaueigenschaftsProfil()"
        />
        <!-- <br /> -->
        <!-- ALT: -->
        <!-- v-if="$q.screen.gt.xs" -->
        <div
          class="flex row full-width q-pa-xs q-col-gutter-xs
          "
        >
          <div class="col-md-4 col-12 text-caption">
            Aktionen für Baueigenschaftsprofile
            {{ displayRightArrow }}
            <br />
            <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
            Mit
            <q-checkbox v-model="alwaysOn" disable dense color="primary" />
            in der ersten Spalte zuerst Baueigenschaftsprofil auswählen.
            Alternativ mit rechter Maustaste Kontextmenü aufrufen.
            <!-- <br />&nbsp; <br /> -->
          </div>
          <div class="col-md-2 col-12">
            <!-- ALT:  style="width:90%" class="q-mr-sm" -->
            <q-btn
              class="stretch full-width"
              label="Profil anzeigen / bearbeiten"
              color="secondary"
              glossy
              push
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
            <!-- ALT:  style="width:90%" class="q-mr-sm" -->
            <q-btn
              class="stretch full-width"
              :disable="
                selectedBaueigenschaftsProfil === null ||
                  !benutzerDarfBearbeitenBaueigenschaftsProfile
              "
              label="Profil löschen"
              color="negative"
              glossy
              push
              no-caps
              @click="deleteSelectedBaueigenschaftsProfilDialog = true"
            />
          </div>
          <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBaueigenschaft()"-->
          <!-- <q-separator vertical inset /> -->
          <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
          <div class="col-md-2 col-12">
            <!-- ALT:  style="width:90%" -->
            <q-btn
              class="stretch full-width"
              :disable="!benutzerDarfBearbeitenBaueigenschaftsProfile"
              label="Profil neu anlegen"
              glossy
              push
              color="green-8"
              @click="
                tabBaueigenschaftsProfile = 'neuanlageTabBaueigenschaftsProfil'
              "
              no-caps
            />
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="detailsTabBaueigenschaftsProfil" class="q-pa-xs">
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
      <q-tab-panel name="neuanlageTabBaueigenschaftsProfil" class="q-pa-xs">
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
    <!-- </q-card> -->
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
  </q-page>
</template>
<script>
//***==================================================================================================================================================
// DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
// Komponenten für Baueigenschaften:
//----------------------------------------------------------------------------------------------------------------
// Komponenten für Baueigenschaften - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
// import uebersichtTabBaueigenschaften from "../components/uebersicht-tab-baueigenschaften.vue";
// import beschreibungTabBaueigenschaft from "../components/beschreibung-tab-baueigenschaft.vue";
// import detailsTabBaueigenschaft from "../components/details-tab-baueigenschaft.vue";
//----------------------------------------------------------------------------------------------------------------
// Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
import uebersichtTabBaueigenschaftsProfile from "../components/uebersicht-tab-baueigenschafts-profile.vue";
import detailsTabBaueigenschaftsProfil from "../components/details-tab-baueigenschafts-profil.vue";
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
//----------------------------------------------------------------------------------------------------------------
/*
import dummy from '../components/dummy-component.vue'
import bearbeitung from '../components/bearbeitung-profil-eigenschaft-defaultwerte.vue'
*/
//***==================================================================================================================================================
export default {
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  name: "BaueigenschaftsProfile", // Vue Component Name - ACHTUNG - dabei beachten:
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
    // uebersichtTabBaueigenschaften,
    // beschreibungTabBaueigenschaft,
    // detailsTabBaueigenschaft,
    //----------------------------------------------------------------------------------------------------------------
    // Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    uebersichtTabBaueigenschaftsProfile,
    detailsTabBaueigenschaftsProfil // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Baueigenschaftsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    // dummy,
    // bearbeitung
  },

  //***================================================================================================================================
  data: () => {
    return {
      deleteSelectedBaueigenschaftsProfilDialog: false,
      localStore: globalStore,
      alwaysOn: true,
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      // Vorerst liegen diese Sachen hier:
      alleBaueigenschaftsProfile: [],
      alleBaueigenschaften: [],
      alleBauinformationen: [],
      // topLevelTabBaueigenschaften: null,
      // tabBaueigenschaften: null,
      // selectedBaueigenschaft: null,
      selectedBaueigenschaftsProfil: null,
      tabBaueigenschaftsProfile: "uebersichtTabBaueigenschaftsProfile",
      selectionForDefaultValueChange: null, // TODO: Diese Bezeichnung folgt noch nicht dem vereinbarten Namenskonventionen!!! Meint es selectedBaueigenschaft???
      columnsTableBaueigenschaftsProfile: [
        {
          name: "baueigenschaftsProfilBezeichnung",
          label: "Bezeichnung des Baueigenschaftsprofils",
          field: row => row.baueigenschaftsProfilBezeichnung,
          align: "left",
          sortable: true
        },
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
          label: "Zugehörige Bauinformation",
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
      ]
      /*
      columnsTableBaueigenschaften: [
        {
          name: "baueigenschaftsBezeichnung",
          label: "Baueigenschaftsbezeichnung",
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
          name: "baueigenschaftsBemerkung",
          label: "Baueigenschaftsbemerkung",
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
          name: "bauinformationsBezeichnung",
          label: "Bauinformationsbezeichnung",
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
        // Schutzkategorien:
        // ACHTUNG: 8 neu hinzugenommene Schutzkategorien fehlen hier noch!!!
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
          name: "wärmeSchutz",
          align: "center",
          label: "Wärmeschutz",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.wärmeSchutz,
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
        }
         // ACHTUNG: 8 neu hinzugenommene Schutzkategorien fehlen hier noch!!!
      ],
      */
    };
  },

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBaueigenschaftsProfile: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an Baueigenschaftsprofilen
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
    }
  }, // /computed:

  //***==================================================================================================================================================
  methods: {
    showNutzernachricht(arg) {
      console.log("In showNutzernachricht: ", arg);
    },
    doStuff() {
      console.log("Stuff is done");
    },

    foo2(newSelected) {
      console.log("In foo2()");
      console.log("Parameter newSelected: ", newSelected);
      console.log(newSelected);
      if (newSelected.length > 0) {
        this.selectedBaueigenschaft = newSelected[0];
      } else {
        this.selectedBaueigenschaft = null;
      }
    },

    duplicateSelectedBaueigenschaftsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------
      // NEU - #511: Dupliziert per API das ausgewählte Baueigenschaftsprofil
      //------------------------------------------------------------------------------------------------------------------------------
      console.log("In duplicateSelectedBaueigenschaftsProfil()");
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
        .post(process.env.API + "/Baueigenschaftsprofile/" + this.selectedBaueigenschaftsProfil._id)
        .then(doc => {
          console.log("Nach API-Aufruf für Clonen des Profils", doc);
          this.refreshBaueigenschaftsProfile();
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_ERFOLG
          );
        })
        .catch(e => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_DUPLIZIEREN_ERFOLG
          );
        });
      }
    },

    deleteSelectedBaueigenschaftsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------b
      // API-Call um das in selectedBaueigenschaftsProfil befindliche Baueigenschaftsprofil zu löschen
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
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_ERFOLG
            );
            this.selectedBaueigenschaftsProfil = null; // Clear selection
            this.refreshBaueigenschaftsProfile();
            this.deleteSelectedBaueigenschaftsProfilDialog = false;
          })
          .catch(error => {
            console.log("error: ", error);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_FEHLER
            );
          });
      }
    },

    onTabChangeRequest(anzuwaehlendesTab) {
      //------------------------------------------------------------------------------------------------------------------------------b
      // Aufruf, Wenn Kindkomponenten einen Tabchange in dieser Komponente anfordern
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
      //------------------------------------------------------------------------------------------------------------------------------b
      // Setzt das Object selectedBaueigenschaftsProfil auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Profil ausgewaehlt wird
      console.log("In selectionHandlerUebersichtBaueigenschaftsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectedBaueigenschaftsProfil = newSelected[0];
      } else {
        this.selectedBaueigenschaftsProfil = null;
      }
    },

    selectionHandlerVorgabeWerteBaueigenschaftsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------b
      // Setzt das Object selectionForDefaultValueChange auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Vorgabewert-Objekt ausgewählt wird
      // ACHTUNG: Vermutlich obsolet, selectionForDefaultValueChange wird nicht benutzt!!!
      console.log("In selectionHandlerVorgabeWerteBaueigenschaftsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectionForDefaultValueChange = newSelected[0];
      } else {
        this.selectionForDefaultValueChange = null;
      }
    },

    showErrorNotification(sender, error) {
      // Unterkomponenten teilen ihre Fehler mit, diese Page zeigt sie dann mittels des global-stores an.
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
          }
          if (payload != null && payload !== undefined) {
            this.tabBaueigenschaftsProfile = "detailsTabBaueigenschaftsProfil";
          }
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
  mounted() {
    //---------------------------------------------------------------------------------------------------------------------------------
    // Mounted-Funktion, für Initialisierungen beim Laden der Komponente
    //---------------------------------------------------------------------------------------------------------------------------------
    console.log("In mounted() von baueigenschafts-profile.vue");
    // NEU: JWT Header setzen für Axios Calls an das Backend:
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;

    let baueigenschaftenGetError = true;
    let baueigenschaftsprofileGetError = true;
    // let bauinformationenGetError = true;
    console.log("process.env.API: ", process.env.API);
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
        baueigenschaftsprofileGetError = false;
      })
      .then(() => {
        return this.$axios.get(process.env.API + "/Bauinformationen/Extrakt"); // ACHTUNG: Hier return notwendig wegen Chaining von .thens!!!
        // NEU: Nur Extrakt von Felder holen, nicht die ganze Bauinformation (für QSelects ausreichend) - Fix für Backlog Item #159
      })
      .then(doc => {
        // console.log("Extrakt aller Bauinformationen - doc: ", doc);
        console.log("Success beim Get des Extrakts aller Baueinformationen");
        this.alleBauinformationen = doc.data;
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
        } else if (baueigenschaftsprofileGetError) {
          console.log(
            "Fehler beim Get für alle Baueigenschaftsprofile- error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
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
