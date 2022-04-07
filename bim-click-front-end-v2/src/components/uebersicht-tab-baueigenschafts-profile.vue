<template>
  <div>
    <q-table
      color="primary"
      ref="tableBaueigenschaftsProfile"
      :rows="dataTableBaueigenschaftsProfile"
      :columns="columnsTableBaueigenschaftsProfile"
      row-key="_id"
      :selected.sync="internalSelectedRowsTableBaueigenschaftsProfile"
      :filter="filterTableBaueigenschaftsProfile"
      selection="single"
      @update:selected="
        val =>
          $emit(
            'selection-changed-table-baueigenschafts-profile-baueigenschafts-profil',
            val
          )
      "
      dense
      separator="cell"
      rows-per-page-label="Einträge pro Seite"
      :pagination.sync="paginationTableBaueigenschaftsProfile"
      :pagination-label="getPaginationLabel"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
      :selected-rows-label="getSelectedStringTableBaueigenschaftsProfile"
      v-bind:class="{ stickyColumnsTable1HeaderLineBaueigenschaftsProfile: $q.screen.gt.sm }"
      >
      <!-- ACHTUNG: Sticky Column funktioniert nur auf großen Bildschirmen - auf mobilen Bildschirmen funktioniert damit das horizontale Scrolling der QTable nicht! -->
      <!-- LÖSUNG (#378): Per v-bind mit Bedingung $q.screen.gt.sm die sticky Column nur auf nicht kleinen Bildschirmen! -->
      <!-- Vorlage: https://vuejs.org/v2/guide/class-and-style.html -->
      <!-- Dazu musste allerdings die CSS Class sticky-columns-table-... (kebab-case) umbenannt werden nach -->
      <!-- stickyColumnsTable... (camelCase) -->
      <!-- ACHTUNG: Separator-Bug in Quasar, https://github.com/quasarframework/quasar/issues/5374 - fixed in 1.2.6  -->
      <!-- ACHTUNG: Selection="multiple" erfordert speziellen Code für die erste Checkbox-Spalte bei -->
      <!-- Verwendung des Header Slots (q-th) unten!!! -->
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
              v-model="filterTableBaueigenschaftsProfile"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-8 text-h6" v-if="$q.screen.gt.sm">
            Baueigenschaftsprofile
          </div>
           <div class="col-8 text-subtitle1" v-else>
            Baueigenschaftsprofile
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
          <!--
          <div class="col-2">
            <q-toggle
              label="Aktivierungzustand"
              v-model="aktivierungsMerkmaleAnzeigen"
              @input="toggleSpaltenAktivierungsMerkmale()"
            />
          </div>
          <div class="col-2">
            <q-toggle
              label="Kennwertbezogene Angaben"
              v-model="kennwertbezogeneAngabenAnzeigen"
              @input="
                toggleSpaltenKennwertbezogeneAngaben()
              "
            />
          </div>
          <div class="col-2">
            <q-toggle
              label="Wertbezogene Angaben"
              v-model="wertbezogeneAngabenAnzeigen"
              @input="toggleSpaltenWertbezogeneAngaben()"
            />
          </div>
          <div class="col-2">
            <q-toggle
              label="Wertbezogene Merkmale"
              v-model="wertbezogeneMerkmaleAnzeigen"
              @input="toggleSpaltenWertbezogeneMerkmale()"
            />
          </div>
          <div class="col-2">
            <q-toggle
              label="Typbezogene Angaben"
              v-model="weitereTypbezogeneAngabenAnzeigen"
              @input="
                toggleSpaltenWeitereTypbezogeneAngaben()
              "
            />
          </div>
          <div class="col-2">
            <q-toggle
              label="Schutzkategorien"
              v-model="schutzKategorienAnzeigen"
              @input="toggleSpaltenSchutzKategorien()"
            />
          </div>
          -->
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
                @click="contextMenuSelectionHandler('Bearbeitung', props.row)"
              >
                <q-item-section>
                  Profil auswählen und anzeigen/bearbeiten
                </q-item-section>
              </q-item>
              <!-- NEU - #511: -->
              <q-item
                :disable="!benutzerDarfBearbeitenBaueigenschaftsprofile"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Duplizieren', props.row)"
              >
                <q-item-section>Profil auswählen und duplizieren</q-item-section>
              </q-item>
              <q-item
                :disable="!benutzerDarfBearbeitenBaueigenschaftsprofile"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Löschen', props.row)"
              >
                <q-item-section>Profil auswählen und löschen</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                :disable="!benutzerDarfBearbeitenBaueigenschaftsprofile"
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
  </div>
</template>
//***
=====================================================================================================================================================
<script>
import { globalStore } from "../modules/global-store";

export default {
  // name: 'ComponentName',
  props: {
    // DONE: Props-Bezeichnungen umbenennen, sie sollten die Namenskonventionen befolgen und stets den Typ des Objekts wiedergeben
    dataTableBaueigenschaftsProfile: Array,
    columnsTableBaueigenschaftsProfile: Array,
    selectedRowsTableBaueigenschaftsProfile: {
      default: null
    }
  },
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore,
      internalSelectedRowsTableBaueigenschaftsProfile: null, // this.selected !== null ? [this.selected] : [],
      filterTableBaueigenschaftsProfile: null,
      paginationTableBaueigenschaftsProfile: {
        sortBy: "baueigenschaftsProfilBezeichnung", // HINWEIS: Hier stand ursprünglich nur "Name"!!!
        // Es sollte aber laut q-table API Doc ein Column name (from colummn definition)" sein!!!
        descending: false,
        page: 1,
        rowsPerPage: globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // ALT: rowsPerPage: 15 // Für FHD Laptops
        // rowsNumber: xx if getting data from a server
        // rowsNumber ist laut https://quasar.dev/vue-components/table#Pagination nur relevant bei Server Side Pagination!!!
        // Dann müsste rowsNumber mit dem aktuellen Wert der Zeilen in der q-table für die Baueigenschaften initialisiert und ggf. updated werden,
        // z.B. in computed: selectedNodeTreeBaustoffe (wird aufgerufen, wenn sich der selected Node im Baustoffbaum ändert)
        // unter Verwendung von selectedNodeTreeBaustoffe.baueigenschaften.length, wenn dieses initialisiert und geändert wird
      }
    };
  },

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBaueigenschaftsprofile: function() {
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
    }
  }, // /computed:

  //***==================================================================================================================================================
  methods: {
    foo1() {
      console.log("Emit an event");
      this.$emit("myEvent");
    },
    contextMenuSelectionHandler(goToTab, row) {
      // Handelt die unterschiedlichen Eingaben im Kontextmenü
      console.log(
        "In contextMenuSelectionHandler mit den Argumenten",
        goToTab,
        row
      );
      switch (goToTab) {
        case "Bearbeitung":
          // Zunächst Selection in der Table ändern:
          this.internalSelectedRowsTableBaueigenschaftsProfile.splice(
            0,
            this.internalSelectedRowsTableBaueigenschaftsProfile.length
          );
          this.internalSelectedRowsTableBaueigenschaftsProfile.push(row);
          // HINWEISE zur Event-Verarbeitung:
          // Die nächsten Events benachrichtigen die Elternkomponente baueigenschafts-profile.vue
          // a) dass das ausgewählte Baueigenschaftsprofil in der Table für die Profile geändert wurde
          // b) dass sie zum  Details-Tab (per Parameter goToTab) für das neu ausgewählte Profil wechseln soll
          // ACHTUNG: Die Komponente baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue verwendet für die Übersichts-Table der
          //          Profile NICHT diese Kindkomponente hier, sondern implementiert selbst die QTable!!!
          this.$emit(
            "selection-changed-table-baueigenschafts-profile-baueigenschafts-profil",
            this.internalSelectedRowsTableBaueigenschaftsProfile
          );
          // Nun das neu selektierte Profil anzeigen/bearbeiten:
          this.$emit("change-tab-request-baueigenschafts-profil", goToTab);
          break;
        case "Neuanlage":
          this.$emit("change-tab-request-baueigenschafts-profil", goToTab);
          break;
        case "Duplizieren":
          // NEU - #511:
          // Zunächst Selection in der Table ändern:
          this.internalSelectedRowsTableBaueigenschaftsProfile.splice(
            0,
            this.internalSelectedRowsTableBaueigenschaftsProfile.length
          );
          this.internalSelectedRowsTableBaueigenschaftsProfile.push(row);
          this.$emit(
            "selection-changed-table-baueigenschafts-profile-baueigenschafts-profil",
            this.internalSelectedRowsTableBaueigenschaftsProfile
          );
          // Nun das neue selektierte Profil duplizieren:
          this.$emit(
            "duplicate-request-baueigenschafts-profil",
            this.internalSelectedRowsTableBaueigenschaftsProfile
          );
          break;
        case "Löschen":
          // Zunächst Selection in der Table ändern:
          this.internalSelectedRowsTableBaueigenschaftsProfile.splice(
            0,
            this.internalSelectedRowsTableBaueigenschaftsProfile.length
          );
          this.internalSelectedRowsTableBaueigenschaftsProfile.push(row);
          // HINWEISE zur Event-Verarbeitung
          // Die nächsten Events benachrichtigen die Elternkomponente baueigenschafts-profile.vue
          // a) dass das ausgewählte Baueigenschaftsprofil in der Table für die Profile geändert wurde
          // b) dass sie das ausgewählte Baueigenschaftsprofil löschen soll
          // ACHTUNG: Die Komponente baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue verwendet für die Übersichts-Table der
          //          Profile NICHT diese Kindkomponente hier, sondern implementiert selbst die QTable!!!
          this.$emit(
            "selection-changed-table-baueigenschafts-profile-baueigenschafts-profil",
            this.internalSelectedRowsTableBaueigenschaftsProfile
          );
          // Nun das neu selektierte Profil löschen:
          this.$emit(
            "delete-request-baueigenschafts-profil",
            this.internalSelectedRowsTableBaueigenschaftsProfile
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
          } Baueigenschaftsprofil${
            this.internalSelectedRowsTableBaueigenschaftsProfile.length > 1
              ? "e"
              : ""
          } ausgewählt`;
    }
  },
  watch: {
    selectedRowsTableBaueigenschaftsProfile: {
      // watch auf prop
      immediate: true,
      handler: function() {
        console.log("In watch für selected mit", this.selectedRowsTableBaueigenschaftsProfile);
        this.internalSelectedRowsTableBaueigenschaftsProfile =
          this.selectedRowsTableBaueigenschaftsProfile !== null &&
          this.selectedRowsTableBaueigenschaftsProfile !== undefined
            ? [this.selectedRowsTableBaueigenschaftsProfile]
            : [];
      }
    }
  }
};
</script>
<style lang="sass">
/*============================================================================================================================*/
/* Aktueller q-table Aufbau für Tabelle Baueigenschaftssprofile: */
/* Header: */
/* q-tr für einzige Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung"), weitere q-ths für Spalten-Labels */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* ACHTUNG: Für die OHNE VSlots für Header und Body aufgebaute Tabelle für zugeordnete Bauinformationen mit einer Header-Zeile ist die Generierung */
/* von HTML <th>s und <td>s anders als bei der Tabelle für Baueigenschaften MIT VSlots für Header und Body und zwei Header-Zeilen!!! */
/* In der einzigen Header-Zeile wird hier für die erste (De-)Select All Checkbox Spalte ein <th> verwendet und auch sonst nur <th>s!!! */
/* Daher sind hier andere thead und tbody Definitionen erforderlich als für .stickyColumnsTable2HeaderLines */

.stickyColumnsTable1HeaderLineBaueigenschaftsProfile
  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Farben für Table mit 1 Header-Zeile und Body: */
  /* #C0C0C0 ist HTML Silver, siehe https://www.w3schools.com/colors/colors_shades.asp */

  thead tr:first-child th:first-child /* Setzt Farbe der 1. Header-Zeile, 1. Spalte (th - nicht td wie oben) - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  thead tr:first-child /* Setzt Farbe der gesamten 1. Header-Zeile, 1. Spalte bereits oben separat gesetzt  - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  /* Wegen Opacity-Änderung das folgende thead hinter das vorherige thead oben verschoben */
  thead tr:first-child th:nth-child(2) /* Setzt Farbe und Opacity der 1. Header-Zeile, 1. Spalte (th) */
    /* ACHTUNG: nth-Zählung zählt ALLE Typen von Children, gleichgültig ob th oder td - OK */
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.8

  td:first-child /* Setzt Farbe der 1. Spalte NUR im Table Body (ab 2. Zeile in Table mit 1 Header-Zeile) - OK */
    background-color: #FFFFFF // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 1

  tbody td:nth-child(2) /* Setzt Farbe der 2. Spalte in allen Zeilen im Body, überschreibt nicht die Header-Zeilen */
    background-color: #F5F5DC // ein Beige, siehe https://www.w3schools.com/colors/colors_shades.asp
    opacity: 0.9

  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Stickiness der 1. und 2. Spalte im Table Header (1 Zeile) und im Body: */
  thead tr:first-child th:first-child /* Setzt Stickiness in der 1. Header-Zeile (tr) für 1. Spalte (erstes td) - OK  */
    position: sticky
    left: 0
    z-index: 1

  thead tr:first-child th:nth-child(2) /* Setzt Stickiness in der 1. Header-Zeile (tr) für 2. Spalte (zweites td) - OK */
    position: sticky
    left: 43px
    z-index: 1

  tbody td:first-child /* Setzt Stickiness der 1. Spalte (td) im Table Body (ab 1. Zeile in Table mit 1 Header-Zeile) - OK */
    position: sticky
    left: 0
    z-index: 1

  tbody td:nth-child(2) /* Setzt Stickiness der 2. Spalte (td) im Table Body (ab 2. Zeile in Table mit 1 Header-Zeile) - OK */
    position: sticky
    left: 43px
    z-index: 1
</style>

<style>
/* CSS Klasse für Tooltips: */
.my-tooltip {
  background-color: #f5f5dc;
  color: black
}

/* CSS Klassen zum Test: */
.background-color-beige {
  /* Aktuell nicht verwendet */
  background-color: #f5f5dc;
}
.my-card-schicht {
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
