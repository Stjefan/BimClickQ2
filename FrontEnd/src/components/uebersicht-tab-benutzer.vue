<template>
  <div>
    <q-table
      color="primary"
      ref="tableBenutzer"
      :rows="dataTableBenutzer"
      :columns="columnData"
      row-key="_id"
      :filter="filterTableBenutzer"
      :selected.sync="internalSelectedRowsTableBenutzer"
      selection="single"
      :visible-columns="visibleColumnsTableBenutzer"
      @update:selected="
        val => $emit('selection-changed-table-benutzer-konten-verwaltung', val)
      "
      @selection="customConsoleLog"
      dense
      separator="cell"
      rows-per-page-label="Einträge pro Seite"
      :pagination.sync="paginationTableBenutzer"
      :pagination-label="getPaginationLabel"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
      :selected-rows-label="getSelectedStringTableBenutzer"
      v-bind:class="{ stickyColumnsTable2HeaderLines: $q.screen.gt.sm }"
      >
      <!-- ACHTUNG: Sticky Column funktioniert nur auf großen Bildschirmen - auf mobilen Bildschirmen funktioniert damit das horizontale Scrolling der QTable nicht! -->
      <!-- LÖSUNG (#378): Per v-bind mit Bedingung $q.screen.gt.sm die sticky Column nur auf nicht kleinen Bildschirmen! -->
      <!-- Vorlage: https://vuejs.org/v2/guide/class-and-style.html -->
      <!-- Dazu musste allerdings die CSS Class sticky-columns-table-... (kebab-case) umbenannt werden nach -->
      <!-- stickyColumnsTable... (camelCase) -->
      <template v-slot:top="props">
        <div
          class="row full-width q-table__title q-col-gutter-xs q-pa-none text-body2"
        >
          <!-- HINWEIS: Diese Classes heissen anscheinend tatsächlich q-table__title, q-table__top, etc. -->
          <div class="col-2">
            <q-input
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              debounce="300"
              color="primary"
              v-model="filterTableBenutzer"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-8 text-h6" v-if="$q.screen.gt.sm">
            Benutzerkonten
          </div>
          <div class="col-8 text-subtitle1" v-else>
            Benutzerkonten
          </div>
          <div class="col-2">
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
          <!-- Hier bisher keine Toggles, die folgenden sind nur potentielle Vorlagen: -->
          <!--
          <div class="col-2">
            <q-toggle
              dense
              label="Kennwertbezogene Angaben"
              v-model="kennwertbezogeneAngabenAnzeigen"
              @input="
                toggleSpaltenKennwertbezogeneAngaben()
              "
            />
          </div>
          <div class="col-2">
            <q-toggle
              dense
              label="Wertbezogene Angaben"
              v-model="wertbezogeneAngabenAnzeigen"
              @input="toggleSpaltenWertbezogeneAngaben()"
            />
          </div>
          <div class="col-2">
            <q-toggle
              dense
              label="Typbezogene Angaben"
              v-model="typbezogeneAngabenAnzeigen"
              @input="toggleSpaltenTypbezogeneAngaben()"
            />
          </div>
          <div class="col-2">
            <q-toggle
              dense
              label="Schutzkategorien"
              v-model="schutzKategorienAnzeigen"
              @input="toggleSpaltenSchutzKategorien()"
            />
          </div>
          -->
        </div>
      </template>
      <template v-slot:header="props">
        <!-- Header-Zeile, ohne v-ifs -->
        <q-tr :props="props">
          <!-- Erste Spalte, reserviert für Checkboxes: -->
          <q-th>
            <!-- Checkbox für "Select/Deselect All" bei selection="multiple", muss explizit generiert werden -->
            <!-- TODO: Sollte "-" anzeigen, wie Quasar es selbst macht??? -->
            <q-checkbox
              v-if="selectionModeTableBenutzer === 'multiple'"
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
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <!-- =================================================================================================================================== -->
          <!-- START CODE FÜR KONTEXTMENÜ für Rechtsklick-Aktionen auf einer Spalte/Zeile in der QTable -->
          <!-- Diese Kontextmenüs waren ursprünglich nur für die Spalten, die in booleanFieldsTypbezogen und booleanFieldsWertbezogen enthalten sind, -->
          <!-- später auch für die Spalte für die Benutzerkennung definiert, nun diese zentral hier für alle Spalten definiert: -->
          <!-- TODO: Man könnte später selektiv auch noch andere Aktionen anbieten je nach Spalte/Zeile, z.B. auf den Link-Spalten -->
          <!-- Dabei ist die (per Maus angewählte) Spalte in col.name, die Zeile in props.row enthalten, siehe Debug Info Kontextmenü unten -->
          <!-- ================================================================================================================================ -->
          <q-menu touch-position context-menu>
            <q-list dense style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Bearbeitung', props.row)"
              >
                <q-item-section>
                  Benutzerkonto auswählen und anzeigen/bearbeiten
                </q-item-section>
              </q-item>
              <q-item
                :disable="!benutzerDarfBearbeitenBenutzer"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Löschen', props.row)"
              >
                <q-item-section
                  >Benutzerkonto auswählen und löschen</q-item-section
                >
              </q-item>
              <q-separator />
              <q-item
                :disable="!benutzerDarfBearbeitenBenutzer"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Neuanlage', props.row)"
              >
                <q-item-section>Benutzerkonto neu registrieren </q-item-section>
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
            <!-- ========================================================================================================================================= -->
            <!-- Hier kein weiterer Code für Behandlugn besonderer Felder, wie z.B. Markdown-Felder! -->
            <!-- ========================================================================================================================================= -->
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<!-- ====================================================================================================================================================== -->
<script>
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
//-------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  props: {
    // TODO XXXXXX: Props-Bezeichnungen umbenennen, sie sollten die Namenskonventionen befolgen und stets den Typ des Objekts wiedergeben
    dataTableBenutzer: Array, // Flacher Array!!!
    columnsTableBenutzer: Array, // Array mit Columns
    selectedRowsTableBenutzer: {
      // Array mit den selektierten Row(s) in dataTableBenutzer
      default: null
    }
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.
      internalSelectedRowsTableBenutzer:
        this.selectedRowsTableBenutzer !== null
          ? [this.selectedRowsTableBenutzer]
          : [],
      paginationTableBenutzer: {
        sortBy: "benutzerKennung", // HINWEIS: Hier stand ursprünglich nur "Name"!!!
        // Es sollte aber laut q-table API Doc ein Column name (from colummn definition)" sein!!!
        descending: false,
        page: 1,
        rowsPerPage:
          globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // ALT: 35
        // rowsNumber: xx if getting data from a server
        // rowsNumber ist laut https://quasar.dev/vue-components/table#Pagination nur relevant bei Server Side Pagination!!!
        // Dann müsste rowsNumber mit dem aktuellen Wert der Zeilen in der q-table für die Benutzer initialisiert und ggf. updated werden,
        // z.B. in computed: selectedNodeTreeBaustoffe (wird aufgerufen, wenn sich der selected Node im Baustoffbaum ändert)
        // unter Verwendung von selectedNodeTreeBaustoffe.baueigenschaften.length, wenn dieses initialisiert und geändert wird
      },

      filterTableBenutzer: "",
      visibleColumnsTableBenutzer: [
        "benutzerKennung",
        "istVerifiziert",
        "istAktiv",
        "vorName",
        "nachName",
        "benutzerRolle",
        "benutzerGruppe",
        "istAngemeldet",
        "zeitLetzteAnmeldung",
        "zeitLetzteAbmeldung",
        "tablesPaginationRowsPerPage",
        "farbSchema", // NEU
        "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig",
        "vorgabeWerteUeberschreibenVorhandeneWerte", // NEU: #262"
      ],
      ausgewaehlterBenutzer: null,
      selectionModeTableBenutzer: "single",
      columnData: this.columnsTableBenutzer
    };
  },

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBenutzer: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an (typbezogenen) Benutzer
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenTypbezogeneBenutzer
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        return false;
      } else {
        // Administrator oder Redakteur
        return true;
      }
    }
  }, // /computed:

  //***==================================================================================================================================================
  methods: {
    customConsoleLog(arg) {
      //-----------------------------------------------------------------------------------------------------------------------------------
      console.log("In customConsoleLog:", arg);
    },

    foo1() {
      //-----------------------------------------------------------------------------------------------------------------------------------
      console.log("Emit an event");
      this.$emit("myEvent");
    },

    contextMenuSelectionHandler(goToTab, row) {
      //-----------------------------------------------------------------------------------------------------------------------------------
      // Handled die unterschiedlichen Eingaben im Kontextmenü
      console.log(
        "In contextMenuSelectionHandler mit den Argumenten",
        goToTab,
        row
      );
      switch (goToTab) {
        case "Bearbeitung":
          this.internalSelectedRowsTableBenutzer.splice(
            0,
            this.internalSelectedRowsTableBenutzer.length
          );
          this.internalSelectedRowsTableBenutzer.push(row);
          this.$emit(
            "selection-changed-table-benutzer-konten-verwaltung",
            this.internalSelectedRowsTableBenutzer
          );
          this.$emit("change-tab-request-benutzer-konten-verwaltung", goToTab);
          break;
        case "Neuanlage":
          this.$emit("change-tab-request-benutzer-konten-verwaltung", goToTab);
          break;
        case "Löschen":
          this.internalSelectedRowsTableBenutzer.splice(
            0,
            this.internalSelectedRowsTableBenutzer.length
          );
          this.internalSelectedRowsTableBenutzer.push(row);
          this.$emit(
            "selection-changed-table-benutzer-konten-verwaltung",
            this.internalSelectedRowsTableBenutzer
          );
          this.$emit(
            "delete-request-benutzer-konten-verwaltung",
            this.internalSelectedRowsTableBenutzer
          );
          break;
        default:
          throw Error("Illegales Argument in contextMenuSelectionHandler");
      }
    },
    // ACHTUNG: Die folgende Funktion wird auch für die q-table für die zugeordneten Bauinformationen benutzt!!!

    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      // Wird in q-tables für Benutzer UND Bauinformationen verwewndet
      // Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      // Wird im Templates oben durch :pagination-label="getPaginationLabel" verwendet.
      // --------------------------------------------------------------------------------------------------------------------
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    getSelectedStringTableBenutzer: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.internalSelectedRowsTableBenutzer.length === 0
        ? ""
        : `${this.internalSelectedRowsTableBenutzer.length} Benutzer${
            this.internalSelectedRowsTableBenutzer.length > 1 ? "" : ""
          } ausgewählt`;
    },

    /*
    toggleSpaltenWertbezogeneAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Benutzer die Spaltensichtbarkeit für die wertbezogenen Angaben
      // ACHTUNG: Relikt aus Vorlage für Baueigenschaften, nicht verwendet!
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.wertbezogeneAngabenAnzeigen) {
        for (let i = 0; i < this.wertbezogeneAngabenArray.length; i++) {
          this.visibleColumnsTableBenutzer.push(
            this.wertbezogeneAngabenArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBenutzer = this.visibleColumnsTableBenutzer.filter(
          value => !this.wertbezogeneAngabenArray.includes(value)
        );
      }
    },

    toggleSpaltenKennwertbezogeneAngaben() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Benutzer die Spaltensichtbarkeit für die kennwertbezogenen Angaben
      // ACHTUNG: Relikt aus Vorlage für Baueigenschaften, nicht verwendet!
      // -------------------------------------------------------------------------------------------------------------------------------
      if (this.kennwertbezogeneAngabenAnzeigen) {
        this.visibleColumnsTableBenutzer.push("einheit");
        this.visibleColumnsTableBenutzer.push("symbol");
        this.visibleColumnsTableBenutzer.push("operator");
        this.visibleColumnsTableBenutzer.push("formel");
      } else {
        this.visibleColumnsTableBenutzer = this.visibleColumnsTableBenutzer.filter(
          value =>
            value !== "einheit" &&
            value !== "symbol" &&
            value !== "operator" &&
            value !== "formel"
        );
      }
    },

    toggleSpaltenTypbezogeneAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in der QTable für Benutzer die Spaltensichtbarkeit
      // ACHTUNG: Relikt aus Vorlage für Baueigenschaften, nicht verwendet!
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.typbezogeneAngabenAnzeigen) {
        // sts: Update 26.05.20
        this.visibleColumnsTableBenutzer.push("werteTyp");
        this.visibleColumnsTableBenutzer.push("baueigenschaftsBemerkung");
        this.visibleColumnsTableBenutzer.push("bauinformationsBezeichnung");
        this.visibleColumnsTableBenutzer.push("bauinformationsTyp");
      } else {
        this.visibleColumnsTableBenutzer = this.visibleColumnsTableBenutzer.filter(
          value =>
            value !== "werteTyp" &&
            value !== "baueigenschaftsBemerkung" &&
            value !== "bauinformationsBezeichnung" &&
            value !== "bauinformationsTyp"
          // TODO: && value !== "bauinformation"
        );
      }
    },
    toggleSpaltenSchutzKategorien() {
      // ----------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Benutzer die Spaltensichtbarkeit für die Schutzkategorien
      // ACHTUNG: Relikt aus Vorlage für Baueigenschaften, nicht verwendet!
      // ----------------------------------------------------------------------------------------------------------------------
      // this.schutzKategorienAnzeigen = !this.schutzKategorienAnzeigen;
      if (this.schutzKategorienAnzeigen) {
        for (let i = 0; i < this.schutzKategorienArray.length; i++) {
          this.visibleColumnsTableBenutzer.push(this.schutzKategorienArray[i]);
        }
      } else {
        this.visibleColumnsTableBenutzer = this.visibleColumnsTableBenutzer.filter(
          value => !this.schutzKategorienArray.includes(value)
        );
      }
    }
    */
  },
  //------------------------------------------------------------------------------------------------------------------------------------------
  mounted: function() {
    console.log("In mounted() von uebersicht-tab-benutzer");
    // this.toggleSpaltenTypbezogeneAngaben() // ACHTUNG: Relikt aus Vorlage, disabled!
  }
};
</script>
//***
=========================================================================================================================================
<style lang="sass">

/* Aktueller q-table Aufbau für Tabelle Benutzer: */
/* Header: */
/* q-tr für 1. Header-Zeile */
/*   q-th mindestens 2-mal (1 leer, 1 leer über Bezeichnung) */
/* q-tr für 2. Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung") */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* Für die MIT VSlots für Header und Body aufgebaute QTable für die Tabelle Benutzer mit EINER Header-Zeile gilt :/
/* In der ersten Header-Zeile werden unter der Decke von Quasar offenbar NUR HTML <td>s verwendet!!! */
/* In der zweiten Header-Zeile wird für die erste (De-)Select All Checkbox Spalte offenbar ein <td> verwendet, sonst <th>s!!! */

.stickyColumnsTable2HeaderLines
  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Farben für Table mit 2 Header-Zeilen und Body: */
  /* #C0C0C0 ist HTML Silver, siehe https://www.w3schools.com/colors/colors_shades.asp */

  thead tr:first-child td:first-child /* Setzt Farbe der 1. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #FFFFFF // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  thead tr:first-child  /* Setzt Farbe der gesamten 1. Header-Zeile, 1. Spalte bereits oben separat gesetzt  - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  /* Wegen Opacity-Änderung das folgende thead hinter das vorherige thead oben verschoben */
  thead tr:first-child td:nth-child(2) /* Setzt Farbe und Opacity der 1. Header-Zeile, 2. Spalte (td) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.8

  thead tr:nth-child(2) td:first-child /* Setzt Farbe der 2. Header-Zeile, 1. Spalte (td) - OK */
    background-color: #FFFFFF // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
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
  thead tr:first-child th:nth-child(2)
    position: sticky
    left: 37px
    z-index: 1

  /* Definitionen für 2. Header-Zeile (thead tr: n-th-child(2)) */
  thead tr:nth-child(2) th:first-child /* Setzt Stickiness in der 2. Header-Zeile (tr) für 1. Spalte (th:first-child, Checkboxes) - OK  */
    position: sticky
    left: 0
    z-index: 1

  thead tr:nth-child(2) th:nth-child(2) /* Setzt Stickiness in der 2. Header-Zeile (tr) für 2. Spalte (th:nth-child(2), Benutzerkennung) - OK  */
    position: sticky
    left: 37px
    z-index: 1

  tbody td:first-child /* Setzt Stickiness der 1. Spalte (td:first-child, Checkboxes) im Table Body (ab 3. Zeile in Table mit 2 Header-Zeilen) - OK */
    position: sticky
    left: 0
    z-index: 1

  tbody td:nth-child(2) /* Setzt Stickiness der 2. Spalte (td:nth-child(2), Benutzerkennung) im Table Body (ab 3. Zeile in Table mit 2 Header-Zeilen) - OK */
    position: sticky
    left: 37px
    z-index: 1

/* Aktueller q-table Aufbau für Tabelle zugeordnete Bauinformationen: */
/* Header: */
/* q-tr für einzige Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung"), weitere q-ths für Spalten-Labels */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* ACHTUNG: Für die OHNE VSlots für Header und Body aufgebaute Tabelle für zugeordnete Bauinformationen mit einer Header-Zeile ist die Generierung */
/* von HTML <th>s und <td>s anders als bei der Tabelle für Benutzer MIT VSlots für Header und Body und zwei Header-Zeilen!!! */
/* In der einzigen Header-Zeile wird hier für die erste (De-)Select All Checkbox Spalte ein <th> verwendet und auch sonst nur <th>s!!! */
/* Daher sind hier andere thead und tbody Definitionen erforderlich als für .stickyColumnsTable2HeaderLines */
</style>

<style>
/* CSS Klassen zum Test: */
.background-color-beige {
  /* Aktuell nicht verwendet */
  background-color: #f5f5dc;
}
.my-card {
  width: 100%;
  max-width: 250px;
}
.height-1rem {
  height: 1rem;
  /* height: 1em; */
}
.font-size-small {
  font-size: small;
  /* font-size: x-small; */
  /* font-size: xx-small; */
  height: 25px;
}
.height-small {
  height: 18px;
}
</style>
