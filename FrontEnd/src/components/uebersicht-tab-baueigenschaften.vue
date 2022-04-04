<template>
  <div>
    <q-table
      color="primary"
      ref="tableBaueigenschaften"
      :data="dataTableBaueigenschaften"
      :columns="columnData"
      row-key="_id"
      :filter="filterTableBaueigenschaften"
      :selected.sync="internalSelectedRowsTableBaueigenschaften"
      selection="single"
      :visible-columns="visibleColumnsTableBaueigenschaften"
      @update:selected="val => $emit('selection-changed', val)"
      dense
      separator="cell"
      rows-per-page-label="Einträge pro Seite"
      :pagination.sync="paginationTableBaueigenschaften"
      :pagination-label="getPaginationLabel"
      :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
      :selected-rows-label="getSelectedStringTableBaueigenschaften"
      v-bind:class="{
        stickyColumnsTable2HeaderLinesBaueigenschaften: $q.screen.gt.sm
      }"
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
          <div class="col-md-2 col-11">
            <q-input
              class="q-pr-sm"
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
          <div class="col-md-2 col-12 text-h6" v-if="$q.screen.gt.sm">
            Baueigenschaften
          </div>
          <div class="col-md-2 col-12 text-subtitle1" v-else>
            Baueigenschaften
          </div>
          <div class="col-md-2 col-12 self-center">
            <q-toggle
              dense
              label="Kennwertbezogene Angaben"
              v-model="kennwertbezogeneAngabenAnzeigen"
              @input="toggleSpaltenKennwertbezogeneAngaben()"
            />
          </div>
          <!-- Folgende wertbezogenen Felder gibt es in dieser Tabelle nicht: -->
          <!--
          <div class="col-md-2 col-12">
            <q-toggle
              label="Wertbezogene Angaben"
              v-model="wertbezogeneAngabenAnzeigen"
              @input="toggleSpaltenWertbezogeneAngaben()"
            />
          </div>
          -->
          <div class="col-md-2 col-12 self-center">
            <q-toggle
              dense
              label="Typbezogene Angaben"
              v-model="typbezogeneAngabenAnzeigen"
              @input="toggleSpaltenTypbezogeneAngaben()"
            />
          </div>
          <div class="col-md-2 col-12 self-center">
            <!-- NEU: "Schutzkategorien" am UI umbenannt in "Fachliche Rubriken" -->
            <!-- NEU - #401: Umbenannt in "Fachliche Kategorien" (mit Rubriken als weitere Einteilung) -->
            <q-toggle
              dense
              label="Fachliche Kategorien und Rubriken"
              v-model="schutzKategorienAnzeigen"
              @input="toggleSpaltenSchutzKategorien()"
            />
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
      <template v-slot:header="props">
        <!-- 1. Header-Zeile -->
        <q-tr>
          <!-- Für Column-Alignment notwendig: <q-th> für die Zelle über der erste Checkbox-Spalte: -->
          <!-- NEU: In erster Spalte/Zeile links oben "Auswahl" anzeigen für die Doofen ;-) -->
          <q-th auto-width> Auswahl </q-th>
          <!-- Für die Zelle über der fixen zweiten Bezeichnungsspalte -->
          <q-th auto-width align="center" color="primary"
            >Bezeichnung der Baueigenschaft</q-th
          >
          <!-- Achtung: Mit <div v-if=..." funktioniert die folgende Steuerung NICHT!!! -->
          <!-- Die v-ifs müssen direkt an q-th sein!!! -->
          <!-- NEU: Mit Wegfall von "obligatorisch" und "aktivierbar" ist colspan="1" statt "3" -->
          <!-- NEU: Spaltenüberschrift "Aktivierungzustand" statt "Aktivierungsmerkmale" -->
          <q-th
            auto-width
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
          <q-th
            auto-width
            v-if="kennwertbezogeneAngabenAnzeigen"
            colspan="4"
            align="center"
            >Kennwertbezogene Angaben</q-th
          >
          <!-- NEU: Im folgenden <q-th colspan="11"> statt <q-th colspan="9"> wegen Hinzunahme zweier Spalten für Tageszeit1/2 -->
          <!-- Folgende wertbezogenen Felder gibt es in dieser Tabelle nicht: -->
          <!--
          <q-th v-if="wertbezogeneAngabenAnzeigen" colspan="11" align="center"
            >Wertbezogene Angaben</q-th
          >
          <q-th v-if="wertbezogeneMerkmaleAnzeigen" colspan="7" align="center"
            >Wertbezogene Merkmale</q-th
          >
          -->
          <!-- NEU: #514 - 3 weitere Felder hinzugenommen (baueigenschaftsAnzeigeText, systemdefiniertNichtBenutzerdefiniert, sollwertNichtIstwert. daher colspan="7" statt "4") -->
          <q-th
            auto-width
            v-if="typbezogeneAngabenAnzeigen"
            colspan="7"
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
            >Fachliche Kategorie: Schwingungs- und Erschütterungsschutz</q-th
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
          <q-th auto-width>
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
                @click="contextMenuSelectionHandler('Bearbeitung', props.row)"
              >
                <q-item-section>
                  Baueigenschaft auswählen und anzeigen/bearbeiten
                </q-item-section>
              </q-item>
              <q-item
                :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Löschen', props.row)"
              >
                <q-item-section
                  >Baueigenschaft auswählen und löschen</q-item-section
                >
              </q-item>
              <q-separator />
              <q-item
                :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
                clickable
                v-close-popup
                @click="contextMenuSelectionHandler('Neuanlage', props.row)"
              >
                <q-item-section>Baueigenschaft neu anlegen </q-item-section>
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
            <!-- NEU: Fix für einen der Bugs in #128: -->
            <!-- Hier Code eingefügt von MS zur gesonderten Behandlung der Markdown-Felder symbol, einheit, operator, formel: -->
            <!-- Vorlage dafür in baustoffe.vue -->
            <!-- ACHTUNG: Dafür class="height-small" in CSS notwendig1 -->
            <!-- ACHTUNG: Der Feldzugriff musste von nested nach flat geändert werden, z.B. von props.row.typbezogeneBaueigenschaft.einheit nach props.row.einheit!!! -->
            <!-- ========================================================================================================================================= -->
            <!-- NEU: Die typbezogenen Felder einheit, symbol, operator (sowie NEU: formel) werden als q-markdown Felder benutzt, nicht als gewöhnliche Textfelder -->
            <!-- Geht einher mit Änderungen der Eingabemasken für diese Felder (mit Markdown Preview und Dropdown-Select-Menü für Sonderzeichen) -->
            <!-- ACHTUNG: Erfordert spezielle CSS class="height-small", sonst wird wegen dieser Felder die Zeilenhöhe in der Table größer als bei den anderen Zeilen!!! -->
            <!-- ACHTUNG: Wenn dieser Code enabled ist, müssen in der Definition des Arrays textFieldsTypbezogen diese Felder, der sonst -->
            <!--          die Anzeige dieser Felder als normale Textfelder steuert, auskommentiert werden! -->
            <div class="height-small" v-else-if="col.name === 'einheit'">
              <!-- Code für Sniff Test mit v-html anstatt q-markdown - erlaubt dann (nur) HTML Tags, kein Markdown, muss aber wohl sanitized werden? -->
              <!--
              <pre v-html="props.row
                    .einheit">
              </pre>
              -->
              <q-markdown
                :src="props.row.einheit"
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
            <!-- ---------------------------------------------------------------------------------------------------- -->
            <!-- ACHTUNG: Hier überall v-else-if statt v-if verwendet, da performanter und die v-ifs exklusiv sind!!! -->
            <div class="height-small" v-else-if="col.name === 'symbol'">
              <q-markdown
                :src="props.row.symbol"
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
            <!-- ---------------------------------------------------------------------------------------------------- -->
            <!-- ACHTUNG: Hier überall v-else-if statt v-if verwendet, da performanter und die v-ifs exklusiv sind!!! -->
            <div class="height-small" v-else-if="col.name === 'operator'">
              <q-markdown
                :src="props.row.operator"
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
            <!-- ---------------------------------------------------------------------------------------------------- -->
            <!-- NEU: Spalte für Formel hier zusätzlich aufgenommen -->
            <!-- ACHTUNG: Hier überall v-else-if statt v-if verwendet, da performanter und die v-ifs exklusiv sind!!! -->
            <div class="height-small" v-else-if="col.name === 'formel'">
              <q-markdown
                :src="props.row.formel"
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
            <!-- /Code für Markdown-Felder -->
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
    // Events:
    // @selection-changed: Wird ausgesendet, wenn sich die Auswahl in der Tabelle ändert
    // @change-tab-request: Wird ausgesendet, wenn die weitere Bearbeitung auf einem anderen Tab erfolgen muss
    // @delete-request: Wird ausgesendet, wenn das Löschen der ausgewählten Eigenschaft angefordert wird
    // sind 3 Events, die uebersichtTabBaueigenschaften aussendet, beim Aufruf aus baueigenschaften.vue werden dafür die Event Handler angegeben! --
    // TODO XXXXXX: Props-Bezeichnungen umbenennen, sie sollten die Namenskonventionen befolgen und stets den Typ des Objekts wiedergeben
    dataTableBaueigenschaften: Array, // Flacher Array!!!
    columnsTableBaueigenschaften: Array, // Array mit Columns
    selectedRowsTableBaueigenschaften: {
      // Array mit den selektierten Row(s) in dataTableBaueigenschaften
      default: null
    }
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.
      internalSelectedRowsTableBaueigenschaften:
        this.selectedRowsTableBaueigenschaften !== null
          ? [this.selectedRowsTableBaueigenschaften]
          : [],
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

      filterTableBaueigenschaften: "",
      visibleColumnsTableBaueigenschaften: ["baueigenschaftsBezeichnung"],
      ausgewaehlteBaueigenschaft: null,
      selectionModeTableBaueigenschaften: "single",
      wertbezogeneMerkmaleAnzeigen: false,
      wertbezogeneAngabenArray: [
        "werteTyp",
        "kennWert1",
        "kennWert2",
        "datumsWert1",
        "datumsWert2",
        "tagesZeitWert1", // NEU
        "tagesZeitWert2", // NEU
        "bezeichnungsWert1",
        "bezeichnungsWert2",
        "aufzaehlungsWert",
        "wahrheitsWert"
      ],
      kennwertbezogeneAngabenArray: ["einheit", "symbol", "operator", "formel"],
      aktivierungsMerkmaleAnzeigen: false,
      kennwertbezogeneAngabenAnzeigen: false,
      wertbezogeneAngabenAnzeigen: false,
      typbezogeneAngabenAnzeigen: true,
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
      columnData: this.columnsTableBaueigenschaften
      /*
      columnData: [
        {
          name: 'baueigenschaftsBezeichnung',
          label: 'Baueigenschaftsbezeichnung',
          field: row => row.baueigenschaftsBezeichnung,
          sortable: true
        },
        // Weitere fachliche Angaben:
        {
          name: 'baueigenschaftsBemerkung',
          label: 'Baueigenschaftsbemerkung',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.baueigenschaftsBemerkung,
          align: 'left',
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
          name: 'bauinformationsBezeichnung',
          label: 'Bauinformationsbezeichnung',
          // ACHTUNG: "field" wuude früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.bauinformation !== undefined && // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
            row.bauinformation !== null
              ? row.bauinformation
                .bauinformationsBezeichnung
              : null,
          // field: row => row.bauinformation.bauinformationsBezeichnung, // Auskommentiert wegen flacher Objekte seit 12.12.19
          // ACHTUNG: Nested Property, funktionierte in q-table mit v-slots für Body nur mit speziellem Code unten!!
          // ACHTUNG: Das Feld musste zusätzlich in den Array textFields aufgenommen werden, um per v-slot angezeigt zu werden
          align: 'left',
          sortable: true
        },
        {
          name: 'bauinformationsTyp',
          label: 'Bauinformationstyp',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row =>
            row.bauinformation !== undefined && // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
            row.bauinformation !== null
              ? row.bauinformation.bauinformationsTyp
              : null,
          // field: row => row.bauinformation.bauinformationsTyp,
          // ACHTUNG: Nested Property, funktioniert in q-table mit v-slots für Body nur mit speziellem Code unten!!
          // ACHTUNG: Das Feld musste zusätzlich in den Array textFields aufgenommen werden, um per v-slot angezeigt zu werden
          align: 'left',
          sortable: true
        },
        // Schutzkategorien:
        // NEU: "Schutzkategorien" am UI umbenannt in "Fachliche Rubriken" -->
        // ACHTUNG: 8 neu hinzugenommene Schutzkategorien fehlen hier noch!!!
        {
          name: 'schallSchutz',
          align: 'center',
          label: 'Schallschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.schallSchutz,
          // format: val => this.displayCheckMark(val),
          // Erste simple Lösung mit Unicode Checkmarks statt q-checkbox, wieder entfernt
          sortable: true
        },
        {
          name: 'wärmeSchutz',
          align: 'center',
          label: 'Wärmeschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.wärmeSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'brandSchutz',
          align: 'center',
          label: 'Brandschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.brandSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'raumAkustik',
          align: 'center',
          label: 'Raumakustik',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.raumAkustik,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'feuchteSchutz',
          align: 'center',
          label: 'Feuchteschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.feuchteSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'chemischerHolzSchutz',
          align: 'center',
          label: 'Holzschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.chemischerHolzSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'abdichtungsTechnik',
          align: 'center',
          label: 'Abdichtungstechnik',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.abdichtungsTechnik,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'korrosionsSchutz',
          align: 'center',
          label: 'Korrosionsschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.korrosionsSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'schadstoffSchutz',
          align: 'center',
          label: 'Schadstoffschutz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.schadstoffSchutz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'ökoBilanz',
          align: 'center',
          label: 'Ökobilanz',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.ökoBilanz,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: 'nachhaltigkeit',
          align: 'center',
          label: 'Nachhaltigkeit',
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.nachhaltigkeit,
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        // ACHTUNG: 8 neu hinzugenommene Schutzkategorien fehlen hier noch!!!
        // ACHTUNG: #401 hier nicht implementiert
      ]
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
          this.internalSelectedRowsTableBaueigenschaften.splice(
            0,
            this.internalSelectedRowsTableBaueigenschaften.length
          );
          this.internalSelectedRowsTableBaueigenschaften.push(row);
          this.$emit(
            "selection-changed",
            this.internalSelectedRowsTableBaueigenschaften
          );
          this.$emit("change-tab-request", goToTab);
          break;
        case "Neuanlage":
          this.$emit("change-tab-request", goToTab);
          break;
        case "Löschen":
          this.internalSelectedRowsTableBaueigenschaften.splice(
            0,
            this.internalSelectedRowsTableBaueigenschaften.length
          );
          this.internalSelectedRowsTableBaueigenschaften.push(row);
          this.$emit(
            "selection-changed",
            this.internalSelectedRowsTableBaueigenschaften
          );
          this.$emit(
            "delete-request",
            this.internalSelectedRowsTableBaueigenschaften
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

    getSelectedStringTableBaueigenschaften: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Funktion, um in QTable das selected label unten links deutsch anzuzeigen.
      // Sonst würde z.B. "2 records selected" angezeigt werden.
      // Wird im Template oben durch :selected-rows-label="getSelectedString" verwendet.
      // ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
      // --------------------------------------------------------------------------------------------------------------------
      return this.internalSelectedRowsTableBaueigenschaften.length === 0
        ? ""
        : `${
            this.internalSelectedRowsTableBaueigenschaften.length
          } Eigenschaft${
            this.internalSelectedRowsTableBaueigenschaften.length > 1
              ? "en"
              : ""
          } ausgewählt`;
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
        this.visibleColumnsTableBaueigenschaften.push("operator"); // TODO XXXXXX: #514
        this.visibleColumnsTableBaueigenschaften.push("formel");
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

    toggleSpaltenTypbezogeneAngaben() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in der QTable für Baueigenschaften die Spaltensichtbarkeit für die fachlichen Angaben
      // ----------------------------------------------------------------------------------------------------------------------------
      if (this.typbezogeneAngabenAnzeigen) {
        // sts: Update 26.05.20
        this.visibleColumnsTableBaueigenschaften.push(
          "baueigenschaftsAnzeigeText"
        ); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push(
          "systemdefiniertNichtBenutzerdefiniert"
        ); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push("sollwertNichtIstwert"); // NEU: #514
        this.visibleColumnsTableBaueigenschaften.push("werteTyp");
        this.visibleColumnsTableBaueigenschaften.push(
          "baueigenschaftsBemerkung"
        );
        this.visibleColumnsTableBaueigenschaften.push(
          "bauinformationsBezeichnung"
        );
        this.visibleColumnsTableBaueigenschaften.push("bauinformationsTyp");
      } else {
        this.visibleColumnsTableBaueigenschaften = this.visibleColumnsTableBaueigenschaften.filter(
          value =>
            value !== "baueigenschaftsAnzeigeText" && // NEU: #514
            value !== "systemdefiniertNichtBenutzerdefiniert" && // NEU: #514
            value !== "sollwertNichtIstwert" && // NEU: #514
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
    }
  },
  //------------------------------------------------------------------------------------------------------------------------------------------
  mounted: function() {
    console.log("In mounted() von tab-uebersicht-baueigenschaften");
    this.toggleSpaltenTypbezogeneAngaben();
  }
};
</script>
//***
=========================================================================================================================================
<style lang="sass">

/* Aktueller q-table Aufbau für Tabelle Baueigenschaften: */
/* Header: */
/* q-tr für 1. Header-Zeile */
/*   q-th mindestens 2-mal (1 leer, 1 leer über Bezeichnung) */
/* q-tr für 2. Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung") */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* Für die MIT VSlots für Header und Body aufgebaute QTable für die Tabelle Baueigenschaften mit EINER Header-Zeile gilt :/
/* In der ersten Header-Zeile werden unter der Decke von Quasar offenbar NUR HTML <td>s verwendet!!! */
/* In der zweiten Header-Zeile wird für die erste (De-)Select All Checkbox Spalte offenbar ein <td> verwendet, sonst <th>s!!! */

.stickyColumnsTable2HeaderLinesBaueigenschaften
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
    background-color: #F5F5F5 // HTML White Smoke, siehe https://www.w3schools.com/colors/colors_shades.asp
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
    left: 70px
    z-index: 1

  /* Definitionen für 2. Header-Zeile (thead tr: nth-child(2) */
  /*========================================================================================================= */
  /* ACHTUNG - BUG FIX für #278: Ohne das nächste thead mit left: 0 wird die 2. Header-Zeile durch die (leere) 1. (Checkbox-)Spalte, 2. Zeile durchgescrollt!!! */
  thead tr:nth-child(2) th:first-child /* Setzt Stickiness in der 2. Header-Zeile (tr) für 1. Spalte (th:first-child, leeres Feld für Checkboxes) - OK  */
    position: sticky
    left: 0
    z-index: 1
  /*========================================================================================================= */

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
