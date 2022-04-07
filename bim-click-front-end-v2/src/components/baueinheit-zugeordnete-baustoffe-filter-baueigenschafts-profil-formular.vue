<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für layoutgesteuertes generisches Filter-Baueigenschaftsprofilformular für "Zugeordnete Baustoffe"             -->
  <!-- einer Baueinheit                                                                                                              -->
  <!-- Siehe internes BIM.click Design, Abschnitt 38.p                                                                               -->
  <!-- Zeigt auf Desktops ein mehrspaltiges, auf Mobilgeräten ein 1-spaltiges Layout zum Anzeigen und Editieren der Eingabefelder    -->
  <!-- für Baueigenschaften in einem Filter-Baueigenschaftsprofil an, gesteuert durch ein zentrales Layout File für alle solchen     -->
  <!-- Filterprofile (Map-artiges JS-Objekt statt Array), layout-baueinheit-zugeordnete-baustoffe-baueigenschafts-profil-formular.js -->
  <!-- Besonderheit: Das Layout wird automatisch erzeugt ausschließlich aus dem Layout File und dem Profil, ohne Notwendigkeit für   -->
  <!-- profilspezifische Eingriffe im Template-Teil dieser Komponente.                                                               -->
  <!-- HINWEIS: Dieses Baueigenschaftsprofilformular kann, abhängig vom Layout File, mehrere Spalten anzeigen                        -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- ============================================================================================================================= -->
  <!-- TODO XXXXXX:                                                                                                                  -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!--  <q-form v-if="profilModelZuFilterndeBaueigenschaften != null && mountedDone"> -->
  <div v-if="profilModelZuFilterndeBaueigenschaften != null && mountedDone">
    <!-- ACHTUNG: Die obige null-Prüfung ist unbedingt notwendig, da der Array profilModelZuFilterndeBaueigenschaften, während das Template erstmals gerendered wird, -->
    <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
    <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
    <!--          profilModelZuFilterndeBaueigenschaften[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
    <!-- <div class style="max-width: 1300px"> -->
    <!-- ACHTUNG: Dieses div mit style="min-width:" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
    <!-- Sonst macht es sich automatisch klein??? -->
    <!-- <div class="q-pa-md row q-col-gutter-sm"> -->
    <div v-if="profilBezeichnung === '' || profilBezeichnung === null">
      TODO: Aufruf mit falscher profilBezeichnung!
    </div>
    <div v-else>
      <!-- =================================================================================================== -->
      <!-- ACHTUNG: class="q-pa-xs" oder "q-pa-none" kontrolliert Breite der Tableiste!                        -->
      <!-- =================================================================================================== -->
      <!--=========================================================================================== -->
      <!--                                                                                            -->
      <!-- ------------------------------------------------------------------------------------------ -->
      <div class="q-pa-none">
        <div v-if="ausgewaehltesBaueigenschaftsProfil">
          <!--
              <div style="color: red">
                <b
                  >[Hinweis: Funktion ist in Entwicklung - bitte vorläufig hier
                  noch keine Werte speichern]</b
                >
              </div>
              -->
          <!-- -------------------------------------------------------------------------------------------------------------------- -->
          <!-- NEU: Optionale Hinweiszeile am Anfang eines Filters                                                                  -->
          <!--      aus optionaler Property ausgewaehlterFilter.hinweiseFilter im Layout für Filter                                 -->
          <!-- NEU: Optional als QExpansionItem, gesteuert durch optionale Prop ausgewaehlterFilter.hinweiseFilterAusklappbar       -->
          <!--      sowie 2 weitere zugehörige Props                                                                                -->
          <!-- -------------------------------------------------------------------------------------------------------------------- -->
          <div v-if="ausgewaehlterFilter.hinweiseFilter">
            <!-- ACHTUNG: Hier keine eigenes class="row full-width q-pa-xs q-col-gutter-xs", sonst "schrumpft" das QExpansionItem beim Einklappen! -->
            <div
              class="row full-width q-pa-xs q-col-gutter-xs"
              v-if="ausgewaehlterFilter.hinweiseFilterAusklappbar"
            >
              <q-expansion-item
                :label="ausgewaehlterFilter.hinweiseFilterAusklappbarLabel"
                expand-separator
                :default-opened="
                  ausgewaehlterFilter.hinweiseFilterAusklappbarDefaultOpened
                "
                dense
                class="stretch full-width"
                header-class="
                    bg-grey-4 text-black text-bold shadow-2 q-col-gutter-xs
                    "
              >
                <!-- NEU: Mit v-html per <div v-html=""../> - ACHTUNG mit <pre v-html=".."/> wird der Font auf monospaced geändert! -->
                <div v-html="ausgewaehlterFilter.hinweiseFilter" />
                <q-separator class="row full-width" />
              </q-expansion-item>
            </div>
            <div
              v-else
              class="
                    q-pa-xs row full-width q-col-gutter-x
                    "
            >
              <!-- NEU: Mit v-html per <div v-html=""../> - ACHTUNG mit <pre v-html=".."/> wird der Font auf monospaced geändert! -->
              <div v-html="ausgewaehlterFilter.hinweiseFilter" />
              <!-- ALT: Ohne v-html: -->
              <!--
                {{ ausgewaehlterFilter.hinweiseFilter }}
              -->
              <q-separator class="row full-width" />
            </div>
          </div>
          <!-- ========================================================================================================================================================== -->
          <!-- HINWEIS: layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung] wird -->
          <!--          zur Abkürzung per computed-Funktion ausgewaehlterFilter berechnet! -->
          <!-- ========================================================================================================================================================== -->
          <!-- Experimentelle Anpassung der Textgröße in Abhängigkeit von Screen Size mit Quasar Screen Plugin -->
          <!-- https://quasar.dev/options/screen-plugin -->
          <div v-if="baum === 'Baustoffbaum'">
            <div v-if="selectedNodeTreeBaustoffe">
              <!-- ACHTUNG: Hier zusätzliche Prüfung, ob selectedNodeTreeBaustoffe gesetzt ist, sonst undefined-Fehler, wenn links kein Baustoff ausgewählt ist! -->
              <div v-if="$q.screen.gt.sm" class="text-subtitle1 q-pa-none">
                <!-- Auf Desktop Screens -->
                <strong>Filtern</strong> in Baustoffen unterhalb des links
                ausgewählten Knotens
                <strong
                  >"{{ selectedNodeTreeBaustoffe.baustoffBezeichnung }}"</strong
                >
                gemäß Filterprofil
                <strong>
                  "{{ ausgewaehlterFilter.ueberschriftFilter }}"
                </strong>
              </div>
              <div v-else class="text-subtitle1">
                <!-- Auf kleineren Screens -->
                <strong>Filtern</strong> in Baustoffen unterhalb des links
                ausgewählten Knotens
                <strong
                  >"{{ selectedNodeTreeBaustoffe.baustoffBezeichnung }}"</strong
                >
                gemäß Filterprofil
                <strong>
                  "{{ ausgewaehlterFilter.ueberschriftFilter }}"
                </strong>
              </div>
            </div>
            <div v-else class="text-subtitle1">
              <!-- Kein Knoten ausgewählt im Baustoffbaum! -->
              <strong>Filtern</strong> in Baustoffen gemäß Filterprofil
              <strong> "{{ ausgewaehlterFilter.ueberschriftFilter }}" </strong>
              <div class="text-caption">
                Bitte links im Baustoffbaum einen
                <strong>Startknoten</strong> für die Filterung auswählen - es
                werden dann in allen Zweigen unterhalb dieses Startknotens
                Baustoffe gesucht, welche die Filterbedingungen erfüllen.
              </div>
            </div>
          </div>
          <div v-else class="text-subtitle1" style="color: red">
            >
            <!-- Nicht im Baustoffbaum! -->
            <strong>Fehler:</strong> Dieses Filterprofilformular funktioniert
            nur im Baustoffbaum!
          </div>
          <q-separator class="row full-width" />
        </div>
        <!-- ------------------------------------------------------------------------------------------ -->
        <!-- NEU: Auswahlmöglichkeit für Filterprofil per QSelect                                       -->
        <!-- Übernommen aus filter-generisches-baueigenschafts-profil-formular.vue                      -->
        <!-- ------------------------------------------------------------------------------------------ -->
        <!-- <q-separator class="row full-width" /> -->
        <div class="q-pa-xs row full-width">
          <div class="col-md-5 col-12 q-gutter-xs text-caption">
            Im Dropdown-Menü rechts ein
            <b>Filterbaueigenschaftsprofil</b> auswählen, mit dessen
            Baueigenschaften bestimmte Baustoffe im Baum herausgefiltert werden
            sollen
            {{ displayRightArrow }}
          </div>
          <!-- QSelect zur Auswahl eines Baueigenschaftsprofils -->
          <!-- ACHTUNG: Initialisierung von ausgewaehltesBaueigenschaftsProfil erfolgt in readAlleBaueigenschaftsProfile()! -->
          <!-- ACHTUNG: Kein :disable hier! -->
          <!-- ACHTUNG: v-model ist nicht "ausgewaehltesBaueigenschaftsProfil", sondern "ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung" -->
          <!-- HINWEIS: Als options wird hier der Array alleFilterBaueigenschaftsProfileAusLayout verwendet (wird initialisiert in mounted()), nicht alleBaueigenschaftsProfile -->
          <!-- Aufbau: [ { filterProfilBezeichnung: "Baustoff > Filter > Estrich", filterProfilAnzeigeText: "Filter für Estriche" }, ... { .. , .. } ] -->
          <!-- Die erste Prop muss als emit-value="filterProfilBezeichnung" zum Update des v-models und in option-value="filterProfilBezeichnung" benutzt werden -->
          <!-- Die zweite Prop muss per option-label="filterProfilAnzeigeText" zur Anzeige als Dropdown-Option verwendet werden -->
          <!-- Zusätzlich ist emit-value und map-options notwendig! -->
          <q-select
            class="col-md-3 col-12 q-gutter-xs"
            label="Filterbaueigenschaftsprofil"
            v-model="
              ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
            "
            :options="alleFilterBaueigenschaftsProfileAusLayout"
            :emit-value="true"
            option-value="filterProfilBezeichnung"
            option-label="filterProfilAnzeigeText"
            map-options
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            square
          />
          <!-- ------------------------------------------------------------------------------------------------------------------------ -->
          <!-- HINWEIS: class="q-pl-sm" sorgt für Abstand zwischen QSelect und dem nachfolgenden Text!!!                                -->
          <!--          Siehe https://forum.quasar-framework.org/topic/3934/row-with-2-50-cols-space-between-them/6                     -->
          <!--          und https://quasar.dev/style/spacing#Table-of-permutations - pl steht für "paddin left", "xs" für "extra small" -->
          <!-- ------------------------------------------------------------------------------------------------------------------------ -->
          <div class="col-md-4 col-12 q-pl-sm text-caption">
            Unten mindestens einen
            <b>Wert für eine Filterbedingung</b> eingeben/auswählen. Links im
            Baustoffbaum <b>Startknoten</b> auswählen. Dann Schaltfläche
            <b>"Baustoffe filtern"</b> drücken.
          </div>
        </div>
        <div class="row q-pa-xs full-width">
          <!-- ---------------------------------------------------------------------------------------------------------- -->
          <!-- NEU: Überschriftenzeile am Anfang eines Filters                                                            -->
          <!--      aus Array-Property ausgewaehlterFilter.spaltenUeberschriftenFilter im Layout für Filter               -->
          <!-- ---------------------------------------------------------------------------------------------------------- -->
          <!-- ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12) -->
          <!-- TODO XXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden! -->
          <div
            v-if="
              layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
                ausgewaehltesBaueigenschaftsProfil
                  .baueigenschaftsProfilBezeichnung
              ].spaltenUeberschriftenFilter
            "
            class="row full-width q-pa-xs bg-grey-2"
          >
            <div
              class="col-md-3 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[0]"
            ></div>
            <div
              class="col-md-1 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[1]"
            ></div>
            <div
              class="col-md-1 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[2]"
            ></div>
            <div
              class="col-md-3 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[3]"
            ></div>
            <div
              class="col-md-1 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[4]"
            ></div>
            <div
              class="col-md-3 col-12 q-gutter-xs"
              v-html="ausgewaehlterFilter.spaltenUeberschriftenFilter[5]"
            ></div>
          </div>
          <!-- -------------------------------------------------------------------------------------------------------- -->
          <!-- Spaltenweises Rendern der Texte und Eingabefelder im obigen Format                                       -->
          <!-- ACHTUNG: Der optionale v-for Index hier startet bei 1, nicht 0, und ist somit eigentlich ein Counter!!!  -->
          <!-- -------------------------------------------------------------------------------------------------------- -->
          <!-- ausgewaehlterFilter.baueigenschaftenInFilter: {{ ausgewaehlterFilter.baueigenschaftenInFilter }} -->
          <div
            v-for="(baueigenschaft,
            index1) in ausgewaehlterFilter.baueigenschaftenInFilter"
            class="row full-width q-pa-xs q-col-gutter-xs items-start"
            :key="index1"
          >
            <!-- ------------------------------------------------------------------------------------------------------- -->
            <!--                                                                                                         -->
            <!-- ------------------------------------------------------------------------------------------------------- -->
            <div class="col-md-3 col-12 q-gutter-xs">
              {{
                profilModelZuFilterndeBaueigenschaften[
                  baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              }}
            </div>
            <div class="col-md-1 col-12 q-gutter-xs">
              <span
                v-html="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.einheit
                "
              >
              </span>
            </div>
            <div class="col-md-1 col-12 q-gutter-xs">
              <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
              <!-- NEU: Start Spalte für Operator für Filterbedingung                                                                                                            -->
              <!-- HINWEIS: Das Profil Model für das layoutgesteuerte Filterbaueigenschaftsprofilformular verwendet auch die Property operator für die Filterbedingung           -->
              <!-- Es wird erstmals gesetzt in erstelleProfilModel(). Diese Property wurde verschoben aus typbezogeneBaueigenschaft in die wertbezogenen Properties!             -->
              <!-- TODO XXXXXX: Für einen zweiten Operator bei Wertepaaren muss das Model/Profil Model erweitert werden um ein Feld operator2 bzw. operator1 und operator2       -->
              <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
              <q-select
                :readonly="determineReadonly(baueigenschaft)"
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                square
                dense
                label="
                    Operator
                    "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].operator
                "
                :options="operatorOptions"
                option-label="label"
                emit-value
                map-options
              />
            </div>
            <div class="col-md-3 col-12 q-gutter-xs">
              <!-- ============================================================================================================================================================== -->
              <!-- NEU: Füllfeld, siehe Epic 38.o unten - span mit vHTML-Formatierung, alternativ könnte man auch ein einfaches Moustache verwenden -->
              <!-- ============================================================================================================================================================== -->
              <div v-if="baueigenschaft.specialField === 'Filler'">
                <span v-html="baueigenschaft.fillText"> </span>
              </div>
              <!-- ============================================================================================================================================================== -->
              <!-- NEU: Link-Feld, siehe Epic 38.o unten -->
              <!-- ============================================================================================================================================================== -->
              <div v-else-if="baueigenschaft.specialField === 'Link'">
                <q-btn
                  dense
                  class="stretch full-width"
                  style="height: 100%"
                  :href="baueigenschaft.linkButton"
                  type="a"
                  target="_blank"
                  :label="baueigenschaft.labelButton"
                  :color="baueigenschaft.colorButton"
                  :icon-right="baueigenschaft.iconRightButton"
                  glossy
                  no-caps
                  :disable="false"
                />
              </div>
              <!-- ======================================================================================================================= -->
              <!-- NEU: Button-Feld, siehe Epic 38.o unten - Ruft bei @click generalisierte Methode generalClickMethod(baueigenschaft) auf -->
              <!-- Diese kann dann die weiteren Props der baueigenschaft (im Layout) abfragen, und das Richtige tun, z.B. Felder resetten  -->
              <!-- Die primäre Prop, die das steuert, ist clickAction, die verschiedene Werte annehmen kann z.B. "Reset" oder "Calculate". -->
              <!-- Alternativ könnte man auch, abhängig von clickAction oder optionalen weiteren Props an der baueigenschaft im Layout     -->
              <!-- eine spezialisierte Funktion aus functions-xyz-baueigenschafts-profil-formular.js aufrufen, die dann allerdings geladen -->
              <!-- werden müsste, in mounted(), spezifisch für das übergebene/angezeigte Baueigenschaftsprofil!                            -->
              <!-- ======================================================================================================================= -->
              <div v-else-if="baueigenschaft.specialField === 'Button'">
                <q-btn
                  dense
                  class="stretch full-width"
                  style="height: 100%"
                  :label="baueigenschaft.labelButton"
                  :color="baueigenschaft.colorButton"
                  :icon-right="baueigenschaft.iconRightButton"
                  glossy
                  no-caps
                  :disable="false"
                  @click="generalClickMethod(baueigenschaft)"
                />
              </div>
              <!-- ===================================================================================================================================================== -->
              <!-- NEU: Vergleichsfeld, siehe Epic 38.o unten - Zeigt Icon an, das den Vergleich der Werte zweier Baueigenschaften (links und rechts davon) visualisiert -->
              <!-- -->
              <!-- ===================================================================================================================================================== -->
              <div
                v-else-if="baueigenschaft.specialField === 'Comparison'"
                class="text-center"
              >
                <q-icon
                  :name="
                    generalComparisonFunction(
                      baueigenschaft.linkeBaueigenschaft,
                      baueigenschaft.rechteBaueigenschaft,
                      'icon'
                    )
                  "
                  color="grey-6"
                  size="lg"
                  :class="
                    generalComparisonFunction(
                      baueigenschaft.linkeBaueigenschaft,
                      baueigenschaft.rechteBaueigenschaft,
                      'flip'
                    )
                  "
                />
              </div>
              <!-- ============================================================================================================================================================== -->
              <!-- Es folgen die diversen Arten von Eingabefeldern, je nach Wertetyp der anzuzeigenden Baueigenschaft ("Aufzählungswert" => QSelect, "Kennwert" => QInput, usw.): -->
              <!-- Es folgt ein QSelect als Eingabefeld für Aufzählungswerte:                                                                                                     -->
              <!-- NEU: Optionale Property multiple (Boolean) im Layout für multiple Selection - steuert :multiple am QSelect!                                                    -->
              <!-- ============================================================================================================================================================== -->
              <!-- ================================================================================== -->
              <!-- ACHTUNG: Nach Einführung des obigen specialFields hier "v-else-if" statt "v-if"!!! -->
              <!-- ================================================================================== -->
              <q-select
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :multiple="
                  baueigenschaft.multiple ? baueigenschaft.multiple : false
                "
                :readonly="determineReadonly(baueigenschaft)"
                @focus="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.bauinformation
                    ? setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .bauinformationsAnzeigeText,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.internerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .idInternerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.externerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.oneDriveLink
                      )
                    : setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        null,
                        null,
                        null,
                        null,
                        null
                      )
                "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].aufzaehlungsWert
                "
                :options="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft
                    .selektierbareOptionenAufzaehlungsWert
                "
                :label="
                  baueigenschaft.labelBaueigenschaft
                    ? baueigenschaft.labelBaueigenschaft
                    : profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                "
                single
                clearable
                dense
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
              >
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                  "
                  :delay="1000"
                  :offset="[0, 28]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
              </q-select>
              <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
              <!-- Es folgen Felder für nicht paarige und die erste Spalte bei paarigen Wertetypen:                                                 -->
              <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
              <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
              <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip                                   -->
              <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
              <q-input
                label-slot
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :readonly="determineReadonly(baueigenschaft)"
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].kennWert1
                "
                :type="
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].aktiviertNichtDeaktiviert
                    ? ''
                    : 'number'
                "
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
                dense
                @focus="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.bauinformation
                    ? setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .bauinformationsAnzeigeText,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.internerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .idInternerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.externerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.oneDriveLink
                      )
                    : setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        null,
                        null,
                        null,
                        null,
                        null
                      )
                "
              >
                <!-- ---------------------------------------------------------------------------------- -->
                <!-- NEU: Label-VSlot für Label mit Custom HTML (für Einheiten) im obigen QInput-Feld   -->
                <!-- Vorlage: https://forum.quasar-framework.org/topic/7733/custom-html-inside-a-label  -->
                <!-- Vorlage: https://v1.quasar.dev/vue-components/input#custom-label                   -->
                <!-- HINWEIS: Das was rechts in v-html="..." steht, war vor der Einführung dieses VSlots-->
                <!-- oben am q-input mit label=".." deklariert!                                         -->
                <!-- HINWEIS: Symbol, Einheit sind theoretisch Markdown, nicht nur HTML. Praktisch ist  -->
                <!--          Markdown aber ausreichend, und ist Untermenge von HTML, daher kein Problem-->
                <!-- ACHTUNG: Erfordert oben am q-input label-slot Prop!                                -->
                <!-- ---------------------------------------------------------------------------------- -->
                <template v-slot:label>
                  <div
                    v-html="
                      baueigenschaft.labelBaueigenschaft
                        ? baueigenschaft.labelBaueigenschaft +
                          '  [' +
                          (profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.symbol
                            ? profilModelZuFilterndeBaueigenschaften[
                                baueigenschaft
                                  .indexInProfilModelZuFilterndeBaueigenschaften
                              ].typbezogeneBaueigenschaft.symbol + ', '
                            : '') +
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.einheit +
                          ']'
                        : profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsAnzeigeText +
                          '  [' +
                          (profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.symbol
                            ? profilModelZuFilterndeBaueigenschaften[
                                baueigenschaft
                                  .indexInProfilModelZuFilterndeBaueigenschaften
                              ].typbezogeneBaueigenschaft.symbol + ', '
                            : '') +
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.einheit +
                          ']'
                    "
                  />
                </template>
                <!-- --------------------------------------------------------------------------------- -->
                <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                <!-- ALT: content-class="my-tooltip"                                                   -->
                <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                <!-- --------------------------------------------------------------------------------- -->
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                  "
                  :delay="1000"
                  :offset="[0, 10]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
              </q-input>
              <q-input
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert' ||
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Bezeichnungswertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :readonly="determineReadonly(baueigenschaft)"
                :label="
                  baueigenschaft.labelBaueigenschaft
                    ? baueigenschaft.labelBaueigenschaft
                    : profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].bezeichnungsWert1
                "
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
                dense
                @focus="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.bauinformation
                    ? setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .bauinformationsAnzeigeText,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.internerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .idInternerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.externerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.oneDriveLink
                      )
                    : setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        null,
                        null,
                        null,
                        null,
                        null
                      )
                "
              >
                <!-- --------------------------------------------------------------------------------- -->
                <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                <!-- ALT: content-class="my-tooltip"                                                   -->
                <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                <!-- --------------------------------------------------------------------------------- -->
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Bezeichnungswert' ||
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                  "
                  :delay="1000"
                  :offset="[0, 10]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
              </q-input>
              <q-input
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Tageszeitwertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :readonly="determineReadonly(baueigenschaft)"
                :label="
                  baueigenschaft.labelBaueigenschaft
                    ? baueigenschaft.labelBaueigenschaft
                    : profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].tagesZeitWert1
                "
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
                dense
                @focus="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.bauinformation
                    ? setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .bauinformationsAnzeigeText,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.internerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .idInternerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.externerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.oneDriveLink
                      )
                    : setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        null,
                        null,
                        null,
                        null,
                        null
                      )
                "
                mask="##:##"
                :rules="[isValidTime]"
              >
                <!-- --------------------------------------------------------------------------------- -->
                <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                <!-- ALT: content-class="my-tooltip"                                                   -->
                <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                <!-- --------------------------------------------------------------------------------- -->
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Tagesezeitwertepaar'
                  "
                  :delay="1000"
                  :offset="[0, 10]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
                <!-- NEU: Mit QTime Code unten, statt /> -->
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Code für Quasar q-time -->
                <!-- Hinweis: In baueinheiten.vue und baustofffe.vue ist q-time aktuell disabled zugunsten von alternativem native Time (Browser TimePicker) an q-input-Feldern -->
                <!-- für tagesZeitWert1/2 mittels type="time", allerdings dürfen diese q-input Felder dann keine autogrow Prop haben!!! -->
                <!-- Varianten für mask: -->
                <!-- Gewählt: mask="HH:mm", HH steht für 24-Stunden-Format -->
                <!-- ACHTUNG: Erfordert am q-input oben ebenfalls ein mask="##:##" -->
                <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh), sowie zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
                <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                <!-- Es folgt der Code für q-time: -->
                <!-- :locale="dateLocale" -->
                <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                <template v-slot:append>
                  <q-icon name="query_builder" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                      <q-time
                        :readonly="determineReadonly(baueigenschaft)"
                        v-model="
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].tagesZeitWert1
                        "
                        mask="HH:mm"
                      />
                      <div class="q-pa-md row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Auswahl übernehmen"
                          color="positive"
                          glossy
                          no-caps
                        />
                      </div>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- ---------------------------------------------------------------------------------- -->
              <!-- ACHTNG: mask und :rules für Kombination QInput mit QDate mit mask="DD.MM.YYYY"     -->
              <!-- Siehe https://quasar.dev/vue-components/date#With-QInput                           -->
              <!-- Sowie https://forum.quasar-framework.org/topic/5868/qinput-and-qdate/3             -->
              <!-- und https://codepen.io/metalsadman/pen/ZEbrjwB                                     -->
              <!-- mask="##.##.####"                                                                  -->
              <!-- :rules="[isValidDate]" "                                                           -->
              <!-- ---------------------------------------------------------------------------------- -->
              <q-input
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :readonly="determineReadonly(baueigenschaft)"
                :label="
                  baueigenschaft.labelBaueigenschaft
                    ? baueigenschaft.labelBaueigenschaft
                    : profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].datumsWert1
                "
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
                dense
                @focus="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.bauinformation
                    ? setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .bauinformationsAnzeigeText,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.internerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation
                          .idInternerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.externerLink,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.bauinformation.oneDriveLink
                      )
                    : setzeFelderFuerFachlicheHilfe(
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung,
                        null,
                        null,
                        null,
                        null,
                        null
                      )
                "
                mask="##.##.####"
                :rules="[isValidDate]"
              >
                <!-- --------------------------------------------------------------------------------- -->
                <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                <!-- ALT: content-class="my-tooltip"                                                   -->
                <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                <!-- --------------------------------------------------------------------------------- -->
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar'
                  "
                  :delay="1000"
                  :offset="[0, 10]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
                <!-- NEU: Mit QDateCode unten, statt /> -->
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Code für Quasar q-date -->
                <!-- Hinweis: In baueinheiten.vue und baustofffe.vue ist q-date aktuell disabled zugunsten von alternativem native Date (Browser Date Picker) an q-input-Feldern -->
                <!-- für datumsWert1/2 mittels type="date", allerdings dürfen diese q-input Felder dann keine autogrow Prop haben!!! -->
                <!-- Varianten für mask: -->
                <!-- mask="####-##-##" -->
                <!-- Gewählt: mask="DD.MM.YYYY" -->
                <!-- ACHTUNG: Erfordert am q-input oben ebenfalls ein mask="##.##.####" -->
                <!-- Für Verwendung als Property an diesen q-input Feldern, zusammen mit dem q-date Date Picker für datumsWert1 unten -->
                <!-- DONE: Mask Properties ausprobiert am q-input (z.B. mask="####-##-##") und am q-date (z.B. mask="YYYY-MM-DD" oder 'DD.MM.YYYY', mit obiger funktionierender Kombination -->
                <!-- Das Datumsfeld kommt aus Mongoose im Date Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                <!-- und neueBaueigenschaft.datumsWert1/2 -->
                <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteAnKnoten() - siehe Kommentare dort! -->
                <!-- Es folgt der Code für q-date: -->
                <!-- :locale="dateLocale" -->
                <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                      <q-date
                        :readonly="determineReadonly(baueigenschaft)"
                        v-model="
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].datumsWert1
                        "
                        mask="DD.MM.YYYY"
                        today-btn
                      />
                      <div class="q-pa-md row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Auswahl übernehmen"
                          color="positive"
                          glossy
                          no-caps
                        />
                      </div>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-toggle
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                "
                :class="
                  determineColStringSpaltenProFilter(
                    ausgewaehlterFilter,
                    index2 + 1
                  ) +
                    ' ' +
                    'col-12 q-pa-xs q-col-gutter-xs'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft
                    ? baueigenschaft.hintBaueigenschaft
                    : null
                "
                :readonly="determineReadonly(baueigenschaft)"
                :label="
                  baueigenschaft.labelBaueigenschaft
                    ? baueigenschaft.labelBaueigenschaft
                    : profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                "
                v-model="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].wahrheitsWert
                "
                :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                standout="bg-teal-4 text-black"
                square
                indeterminate
                dense
                @input="
                  setzeFelderFuerFachlicheHilfe(
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                  )
                "
              >
                <!-- --------------------------------------------------------------------------------- -->
                <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                <!-- ALT: content-class="my-tooltip"                                                   -->
                <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                <!-- --------------------------------------------------------------------------------- -->
                <q-tooltip
                  v-if="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                  "
                  :delay="1000"
                  :offset="[0, 10]"
                  max-width="500px"
                  content-class="bg-secondary text-white text-caption shadow-4"
                >
                  {{
                    baueigenschaft.toolTipBaueigenschaft
                      ? baueigenschaft.toolTipBaueigenschaft
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                  }}
                </q-tooltip>
              </q-toggle>
            </div>
            <!-- /Spalte für ersten Wert für die Filterbedingung -->
            <div class="col-md-1 col-12 q-gutter-xs">
              <!-- TODO: Dropdown -->
            </div>
            <div class="col-md-3 col-12 q-pa-xs q-col-gutter-xs'">
              <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
              <!-- NEU: Behandlung von Wertepaaren - dazu wird eine reguläre Spalte in 2 Felder aufgeteilt:                                         -->
              <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
              <!-- Kennwertepaar: -->
              <div
                v-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft1
                    ? baueigenschaft.hintBaueigenschaft1
                    : null
                "
              >
                <!-- Feld für zweiten Wert des Wertepaars: -->
                <q-input
                  label-slot
                  :readonly="determineReadonly(baueigenschaft)"
                  :hint="
                    baueigenschaft.hintBaueigenschaft2
                      ? baueigenschaft.hintBaueigenschaft2
                      : null
                  "
                  v-model="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].kennWert2
                  "
                  :type="
                    !benutzerDarfBearbeitenSelectedNode ||
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].bezeichnungWerteVererbenderElternknoten != null ||
                    !profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].aktiviertNichtDeaktiviert
                      ? ''
                      : 'number'
                  "
                  :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  @focus="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.bauinformation
                      ? setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .bauinformationsAnzeigeText,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .internerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .idInternerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .externerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .oneDriveLink
                        )
                      : setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          null,
                          null,
                          null,
                          null,
                          null
                        )
                  "
                >
                  <!-- ---------------------------------------------------------------------------------- -->
                  <!-- NEU: Label-VSlot für Label mit Custom HTML (für Einheiten) im obigen QInput-Feld   -->
                  <!-- Vorlage: https://forum.quasar-framework.org/topic/7733/custom-html-inside-a-label  -->
                  <!-- Vorlage: https://v1.quasar.dev/vue-components/input#custom-label                   -->
                  <!-- HINWEIS: Das was rechts in v-html="..." steht, war vor der Einführung dieses VSlots-->
                  <!-- oben am q-input mit label=".." deklariert!                                         -->
                  <!-- HINWEIS: Symbol, Einheit sind theoretisch Markdown, nicht nur HTML. Praktisch ist  -->
                  <!--          Markdown aber ausreichend, und ist Untermenge von HTML, daher kein Problem-->
                  <!-- ACHTUNG: Erfordert oben am q-input label-slot Prop!                                -->
                  <!-- ---------------------------------------------------------------------------------- -->
                  <template v-slot:label>
                    <div
                      v-html="
                        baueigenschaft.labelBaueigenschaft2
                          ? baueigenschaft.labelBaueigenschaft2 +
                            '  [' +
                            (profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].typbezogeneBaueigenschaft.symbol
                              ? profilModelZuFilterndeBaueigenschaften[
                                  baueigenschaft
                                    .indexInProfilModelZuFilterndeBaueigenschaften
                                ].typbezogeneBaueigenschaft.symbol + ', '
                              : '') +
                            profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].typbezogeneBaueigenschaft.einheit +
                            ']'
                          : profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].typbezogeneBaueigenschaft
                              .baueigenschaftsAnzeigeText +
                            '  [' +
                            (profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].typbezogeneBaueigenschaft.symbol
                              ? profilModelZuFilterndeBaueigenschaften[
                                  baueigenschaft
                                    .indexInProfilModelZuFilterndeBaueigenschaften
                                ].typbezogeneBaueigenschaft.symbol + ', '
                              : '') +
                            profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].typbezogeneBaueigenschaft.einheit +
                            ']'
                      "
                    />
                  </template>
                  <!-- --------------------------------------------------------------------------------- -->
                  <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                  <!-- ALT: content-class="my-tooltip"                                                   -->
                  <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                  <!-- --------------------------------------------------------------------------------- -->
                  <q-tooltip
                    v-if="
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      baueigenschaft.toolTipBaueigenschaft2
                        ? baueigenschaft.toolTipBaueigenschaft2
                        : profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                </q-input>
              </div>
              <!-- Bezeichnungswertepaar: -->
              <div
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp ===
                    'Bezeichnungswertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft1
                    ? baueigenschaft.hintBaueigenschaft1
                    : null
                "
              >
                <!-- Feld für den zweiten Wert des Wertepaars: -->
                <q-input
                  :readonly="determineReadonly(baueigenschaft)"
                  :hint="
                    baueigenschaft.hintBaueigenschaft2
                      ? baueigenschaft.hintBaueigenschaft2
                      : null
                  "
                  :label="
                    baueigenschaft.labelBaueigenschaft2
                      ? baueigenschaft.labelBaueigenschaft2
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                  "
                  v-model="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].bezeichnungsWert2
                  "
                  :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  @focus="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.bauinformation
                      ? setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .bauinformationsAnzeigeText,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .internerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .idInternerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .externerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .oneDriveLink
                        )
                      : setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          null,
                          null,
                          null,
                          null,
                          null
                        )
                  "
                >
                  <!-- --------------------------------------------------------------------------------- -->
                  <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                  <!-- ALT: content-class="my-tooltip"                                                   -->
                  <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                  <!-- --------------------------------------------------------------------------------- -->
                  <q-tooltip
                    v-if="
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      baueigenschaft.toolTipBaueigenschaft2
                        ? baueigenschaft.toolTipBaueigenschaft2
                        : profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                </q-input>
              </div>
              <!-- Tageszeitwertepaar: -->
              <div
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft1
                    ? baueigenschaft.hintBaueigenschaft1
                    : null
                "
              >
                <!-- Feld für den zweiten Wert des Wertepaars: -->
                <q-input
                  :readonly="determineReadonly(baueigenschaft)"
                  :hint="
                    baueigenschaft.hintBaueigenschaft2
                      ? baueigenschaft.hintBaueigenschaft2
                      : null
                  "
                  :label="
                    baueigenschaft.labelBaueigenschaft2
                      ? baueigenschaft.labelBaueigenschaft2
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                  "
                  v-model="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].tagesZeitWert2
                  "
                  :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  @focus="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.bauinformation
                      ? setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .bauinformationsAnzeigeText,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .internerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .idInternerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .externerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .oneDriveLink
                        )
                      : setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          null,
                          null,
                          null,
                          null,
                          null
                        )
                  "
                  mask="##:##"
                  :rules="[isValidTime]"
                >
                  <!-- --------------------------------------------------------------------------------- -->
                  <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                  <!-- ALT: content-class="my-tooltip"                                                   -->
                  <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                  <!-- --------------------------------------------------------------------------------- -->
                  <q-tooltip
                    v-if="
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Tageszeitwertepaar'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      baueigenschaft.toolTipBaueigenschaft2
                        ? baueigenschaft.toolTipBaueigenschaft2
                        : profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  <!-- NEU: Mit QTime Code unten, statt /> -->
                  <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
                  <!-- Code für Quasar q-time -->
                  <!-- Hinweis: In baueinheiten.vue und baustofffe.vue ist q-time aktuell disabled zugunsten von alternativem native Time (Browser TimePicker) an q-input-Feldern -->
                  <!-- für tagesZeitWert1/2 mittels type="time", allerdings dürfen diese q-input Felder dann keine autogrow Prop haben!!! -->
                  <!-- Varianten für mask: -->
                  <!-- Gewählt: mask="HH:mm", HH steht für 24-Stunden-Format -->
                  <!-- ACHTUNG: Erfordert am q-input oben ebenfalls ein mask="##:##" -->
                  <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh), sowie zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
                  <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                  <!-- Es folgt der Code für q-time: -->
                  <!-- :locale="dateLocale" -->
                  <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                  <template v-slot:append>
                    <q-icon name="query_builder" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                        <q-time
                          :readonly="determineReadonly(baueigenschaft)"
                          v-model="
                            profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].tagesZeitWert2
                          "
                          mask="HH:mm"
                        />
                        <div class="q-pa-md row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Auswahl übernehmen"
                            color="positive"
                            glossy
                            no-caps
                          />
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <!-- Datumswertepaar: -->
              <div
                v-else-if="
                  profilModelZuFilterndeBaueigenschaften[
                    baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
                  ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar'
                "
                :hint="
                  baueigenschaft.hintBaueigenschaft1
                    ? baueigenschaft.hintBaueigenschaft1
                    : null
                "
              >
                <!-- Feld für den zweiten Wert des Wertepaars: -->
                <!-- ---------------------------------------------------------------------------------- -->
                <!-- ACHTNG: mask und :rules für Kombination QInput mit QDate mit mask="DD.MM.YYYY"     -->
                <!-- Siehe https://quasar.dev/vue-components/date#With-QInput                           -->
                <!-- Sowie https://forum.quasar-framework.org/topic/5868/qinput-and-qdate/3             -->
                <!-- und https://codepen.io/metalsadman/pen/ZEbrjwB                                     -->
                <!-- mask="##.##.####"                                                                  -->
                <!-- :rules="[isValidDate]" "                                                           -->
                <!-- ---------------------------------------------------------------------------------- -->
                <q-input
                  :readonly="determineReadonly(baueigenschaft)"
                  :hint="
                    baueigenschaft.hintBaueigenschaft2
                      ? baueigenschaft.hintBaueigenschaft2
                      : null
                  "
                  :label="
                    baueigenschaft.labelBaueigenschaft2
                      ? baueigenschaft.labelBaueigenschaft2
                      : profilModelZuFilterndeBaueigenschaften[
                          baueigenschaft
                            .indexInProfilModelZuFilterndeBaueigenschaften
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                  "
                  v-model="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].datumsWert2
                  "
                  :bg-color="determineFieldBackgroundColor(baueigenschaft)"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  @focus="
                    profilModelZuFilterndeBaueigenschaften[
                      baueigenschaft
                        .indexInProfilModelZuFilterndeBaueigenschaften
                    ].typbezogeneBaueigenschaft.bauinformation
                      ? setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .bauinformationsAnzeigeText,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .internerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .externerLink,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.bauinformation
                            .oneDriveLink
                        )
                      : setzeFelderFuerFachlicheHilfe(
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung,
                          null,
                          null,
                          null,
                          null,
                          null
                        )
                  "
                  mask="##.##.####"
                  :rules="[isValidDate]"
                >
                  <!-- --------------------------------------------------------------------------------- -->
                  <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                  <!-- ALT: content-class="my-tooltip"                                                   -->
                  <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                  <!-- --------------------------------------------------------------------------------- -->
                  <q-tooltip
                    v-if="
                      profilModelZuFilterndeBaueigenschaften[
                        baueigenschaft
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      baueigenschaft.toolTipBaueigenschaft2
                        ? baueigenschaft.toolTipBaueigenschaft2
                        : profilModelZuFilterndeBaueigenschaften[
                            baueigenschaft
                              .indexInProfilModelZuFilterndeBaueigenschaften
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  <!-- NEU: Mit QDateCode unten, statt /> -->
                  <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
                  <!-- Code für Quasar q-date -->
                  <!-- Hinweis: In baueinheiten.vue und baustofffe.vue ist q-date aktuell disabled zugunsten von alternativem native Date (Browser Date Picker) an q-input-Feldern -->
                  <!-- für datumsWert1/2 mittels type="date", allerdings dürfen diese q-input Felder dann keine autogrow Prop haben!!! -->
                  <!-- Varianten für mask: -->
                  <!-- mask="####-##-##" -->
                  <!-- Gewählt: mask="DD.MM.YYYY" -->
                  <!-- ACHTUNG: Erfordert am q-input oben ebenfalls ein mask="##.##.####" -->
                  <!-- Für Verwendung als Property an diesen q-input Feldern, zusammen mit dem q-date Date Picker für datumsWert1 unten -->
                  <!-- DONE: Mask Properties ausprobiert am q-input (z.B. mask="####-##-##") und am q-date (z.B. mask="YYYY-MM-DD" oder 'DD.MM.YYYY', mit obiger funktionierender Kombination -->
                  <!-- Das Datumsfeld kommt aus Mongoose im Date Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                  <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                  <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                  <!-- und neueBaueigenschaft.datumsWert1/2 -->
                  <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                  <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteAnKnoten() - siehe Kommentare dort! -->
                  <!-- Es folgt der Code für q-date: -->
                  <!-- :locale="dateLocale" -->
                  <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                        <q-date
                          :readonly="determineReadonly(baueigenschaft)"
                          v-model="
                            profilModelZuFilterndeBaueigenschaften[
                              baueigenschaft
                                .indexInProfilModelZuFilterndeBaueigenschaften
                            ].datumsWert2
                          "
                          mask="DD.MM.YYYY"
                          today-btn
                        />
                        <div class="q-pa-md row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Auswahl übernehmen"
                            color="positive"
                            glossy
                            no-caps
                          />
                        </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else>
                <!-- Spalte bleibt leer -->
              </div>
            </div>
          </div>
        </div>
        <!-- ========================== Ende Filter  ============================================================= -->
        <!-- ==================================================================================================  -->
        <!-- </q-card> -->
        <!----------------------------------------------------------------------------------------------------- -->
        <!-- Start gemeinsame Button Section für alle Tabs:                                                     -->
        <!-- Die @-Methoden haben Parameter tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, der ihnen anzeigt,        -->
        <!-- für welches Tab sie gerufen werden                                                                 -->
        <!----------------------------------------------------------------------------------------------------- -->
        <q-separator />
        <!-- -------------------------------------------------------------------------------------------------- -->
        <!-- Spezielle Button Section zur Ansteuerung diverser Aktionen: -->
        <div class="row full-width q-pa-xs q-col-gutter-xs">
          <!-- ALT: style="width: 90%" -->
          <div class="col-md-4 col-12">
            <!-- NEU: Disablen, wenn kein Knoten im Baustoffbaum ausgewählt ist, da Backend-Call für Filtern -->
            <!-- neuerdings mit dem dort ausgewählten Knoten als Startknoten für die Filterung erfolgt! -->
            <!-- ACHTUNG: Hier wird neue Prop selectedNodeTreeBaustoffe benötigt, zum Zugriff auf den baumKnotenTyp -->
            <!-- An Blattknoten wird der Button für das Filtern disabled, weil die Suche am Backend -->
            <!-- per getChildrenTree() in den Kindern sucht, was immer einen leeren Array liefert, und somit sinnlos ist -->
            <q-btn
              dense
              :disable="
                !selectedKeyTreeBaustoffe ||
                  !mindestensEineFilterBedingungIstAusgefuellt ||
                  selectedNodeTreeBaustoffe.baumKnotenTyp === 'Blattknoten'
              "
              color="positive"
              glossy
              class="stretch full-width"
              style="height: 100%"
              @click="filtereBaustoffe()"
              label="Baustoffe filtern"
              no-caps
            >
            </q-btn>
            <!-- ACHTUNG: Folgender Tooltip funktioniert nicht, wenn innerhalb von <q-btn> .. </q-btn> oben, falls q-btn disabled ist - daher hier hinter </q-btn>! -->
            <q-tooltip
              :delay="1000"
              :offset="[0, 20]"
              max-width="500px"
              content-class="bg-secondary text-white text-caption shadow-4"
            >
              Zur Aktivierung der Schaltfläche im Baustoffbaum links einen
              Startknoten für die Filterung auswählen und oben mindestens eine
              Filterbedingung eingeben
            </q-tooltip>
          </div>
          <div class="col-md-4 col-12">
            <q-btn
              dense
              :disable="false"
              color="deep-orange"
              class="stretch full-width"
              style="height: 100%"
              text-color="white"
              glossy
              label="Eingaben zurücksetzen"
              no-caps
              @click="resetEingabefelder(ausgewaehltesBaueigenschaftsProfil)"
            />
          </div>
          <div class="col-md-4 col-12">
            <q-btn
              dense
              :disable="selectedNodeTreeBaueinheiten == null"
              color="purple-6"
              class="stretch full-width"
              style="height: 100%"
              text-color="white"
              glossy
              label="Sollwerte aus ausgewählter Baueinheit laden"
              no-caps
              @click="ladeSollwerteAusAusgewaehlterBaueinheit()"
            />
          </div>
        </div>
        <div v-if="localStore.state.debugMode">
          <q-separator />
          filteredNodesTreeBaustoffe:
          <!-- NEU - Formatierung mit stringify -->
          <!-- Vorlage: https://stackoverflow.com/questions/45539735/prettify-json-string-vuejs2-webpack -->
          <!-- Erfordert Vue v-html und computed Property, die JSON.stringify aufruft! -->
          <pre
            v-html="JSON.stringify(filteredNodesTreeBaustoffe, null, 2)"
          ></pre>
        </div>
      </div>
    </div>
  </div>
  <!--  </q-form> -->
</template>
<!-- ***===================================================================================================================================== -->
<script>
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import { date } from "quasar";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import KorrespondierendeBaueigenschaften from "../modules/korrespondierende-baueigenschaften.js"; // Übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
//-------------------------------------------------------------------------
// Die folgenden Layouts werden hier im Filterformular nicht benötigt:
/*
import LayoutBaustoffBaueigenschaftsProfilFormular from "../modules/layout-baustoff-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaustoffEstrichBaueigenschaftsProfilFormular from "../modules/layout-baustoff-estrich-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// NEU: Für Test von computed Functions in Layout File:
import FunctionsBaustoffEstrichBaueigenschaftsProfilFormular from "../modules/functions-baustoff-estrich-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular from "../modules/layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-bauvorhaben-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitStandortBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-standort-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-gebaeude-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitGeschossBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-geschoss-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitRaumBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-raum-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitBodenBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-boden-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformula
import LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import FunctionsBaueinheitBodenBaueigenschaftsProfilFormular from "../modules/functions-baueinheit-boden-baueigenschafts-profil-formular.js"; // NEU: Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitSchichtBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-schicht-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
*/
import LayoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.js"; // NEU
//-------------------------------------------------------------------------
// import Vue from "vue/dist/vue.js"; // NEU: Für Geocoder
// import Geocoder from "@pderas/vue2-geocoder"; // NEU: Für Geocoding (Bestimmung von geografischen Koordinaten aus Adresse über Google Maps API)
// import * as VueGoogleMaps from "vue2-google-maps";
// NEU: Für Package vue2-google-maps,https://github.com/xkjyeah/vue-google-maps/blob/vue2/README.md - zurückgestellt
// import GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten from "../modules/gemeinden-deutschland-mit-namen-ihrer-verwaltungs-einheiten.json"; // HINWEIS: JSON kann an JS Variable zugewiesen werden,
// siehe https://stackoverflow.com/questions/39513427/how-do-i-convert-json-array-to-javascript-array
// Quelle dieser Daten: https://www.npmjs.com/package/gemeindeverzeichnis - die Datei gemeinden.ndjson nach json konvertiert ("}}"</strong> am Zeilenende ersetzt durch "}}," und
// Array-Klammern darum eingefügt, dann dort bestimmte Unternummern per Programm ergänzt im Unterobjekt "namen" mit den passenden Texte aus den anderen Dateien dort, für Verwendung als Options in QSelect
// für Gemeindeschlüssel
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Dezimalzahlen mit VMoney, https://www.npmjs.com/package/v-money -->
// VMoney erfordert Installation per: npm i --save v-money
// NEU: Deinstalliert mit npm uninstall v-money
// import Vue from "vue";
// import money from "v-money"; // NEU: Disabled wegen Problemen, zugunsten von VueAutonumeric
// Vue.use(money, { precision: 4 }); // NEU: Disabled wegen Problemen, zugunsten von VueAutonumeric
//----------------------------------------------------------------------------------------------------------------------------------------------------------
import { decimalHandling } from "../modules/decimal-handling"; // NEU: Zentrale Helper-Funktionen zur Konvertierung von Dezimalzahlen von String nach Number
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Dezimalzahlen mit VueAutoNumeric (statt VMoney), https://www.npmjs.com/package/vue-autonumeric
// import VueAutonumeric from "vue-autonumeric"; // Erfordert unten Eintrag in components: { ..., VueAutoNumeric }
//================================================================================================================================================
export default {
  // name: 'ComponentName',
  components: {
    // VueAutonumeric // NEU - für Tests mit VueAutoNumeric
  },
  props: [
    "profilBezeichnung", // Hier kann die Bezeichnung eines anzuzeigenden Filter-Baueigenschaftsprofils mitgegeben werden
    "baum", // NEU: String zur Fallunterscheidung, ob die Komponente im Bauvorhaben- oder im Baustoffbaum arbeitet, wahlweise "Bauvorhabenbaum" oder "Baustoffbaum"
    //===========================================================================================================================================
    // TODO XXXXXX: Die Komponente wird bisher nur für Filtern im Baustoffbaum (mit prop baum === "Baustoffbaum") aufgerufen,
    // mit optionalem Zugriff auf selectedNodeTreeBaueinheiten für Sollwerte an der Baueinheit
    // Könnte später mit entsprechenden Anpassungen der Backend-Methoden auch im Bauvorhabenbaum filtern.
    //===========================================================================================================================================
    "selectedNodeTreeBaueinheiten", // selectedNodeTreeBaueinheiten - für das Laden von Sollwerten aus der im Bauvorhabenbaum ausgewählten Baueinheit
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // ACHTUNG: Kann theoretisch auch null sein, aber aktuell können keine Baueinheiten abgewählt werden im Bauvorhabenbaum in baueinheiten.vue
    "selectedKeyTreeBaustoffe", // NEU: Für Filterung nur in dem durch diesen Startknoten definierten Unterzweig (Performance)
    // ACHTUNG: Kann auch null sein!
    "selectedNodeTreeBaustoffe", // NEU: Für Zugriff auf das Feld baumKnotenTyp zum Disabling des Buttons für das Filtern
    "keyWurzelBaustoffbaum" // NEU: Id der Wurzel des Baustoffbaums (bei baum = "Baustoffbaum")
    //=========================================================================================
    // ACHTUNG: Diese ist am Frontend in baueinheiten.vue aktuell nicht direkt verfügbar, weil dort der Baustoffbaum erst ab der zweiten Ebene angezeigt wird.
    // Aktuell durch Workaround Hack gelöst, indem es aus dem parent Feld des ersten Baustoffs auf der zweiten Ebene entnommen wird beim Aufruf der Komponente in baueinheiten.vue!!!
    //=========================================================================================
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      speichernProfilFormularDialog: false, // NEU: Confirmation Dialog beim Speichern des Profilformulars, #388
      eingabeFreischaltenAnVerzweigungsKnoten: false, // Transientes Flag für #388, sollte entweder mit am Profil Model hängen, spezifisch für gesamtes Profilformular,
      // oder hier als Variable in data(), dann muss es allerdings beim Knoten- oder Profilwechsel auf false zurückgesetzt werden in mounted(), watch() (= Refresh, dort 2-mal!) und reset()
      // Default ist: Flag ist false oder undefined, dann werden im Baustoffbaum Felder an Nicht-Blattknoten auf readonly geschaltet!
      //----------------------------------------------------------------------------------------------------------------------------------
      // Die folgenden Variablen sind für Tests zusammen mit Modul functions-baustoff-estrich-baueigenschafts-profil-formular.js
      // Hier nicht benötigt in Filterformular:
      /*
      testComputedProperty: null, // NEU: Für Test von computed Property aus JS-Modul
      testSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testSpecificSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      sollIstWertePaarSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testSpecificlReadonlyMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralReadonlyMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralInitializeMethod: null, // NEU: Für Test von Methode aus JS-Modul
      */
      //-----------------------------------------------------------------------------------------------------------------------------------
      //
      benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt: false, // Merker für Fehlermeldung, wenn Profilformular nicht gerendert werden kann
      // anzahlBaueigenschaftenPerRow: 4, // Für Ausgabe von Feldern in durch diesen Wert spezifizierten Anzahl Spalten - ersetzt durch Property spaltenRubrik im Layout File
      //-----------------------------------------------------------------------------------------------------------------------------------
      // Für Dezimalzahlen mit QField und VueAutoNumeric:
      // VueAutoNumeric Options - generiert mit http://autonumeric.org/configurator
      autoNumericOptionsWithMinMax: {
        decimalCharacter: ",",
        decimalPlaces: 2,
        digitGroupSeparator: ".",
        maximumValue: "999.99",
        minimumValue: "-999.99",
        emptyInputBehavior: "null" // VueAutoNumeric Docs dafür: When the element is empty, the rawValue and the element value/text is set to null.
        // This also allows to set the value to null using anElement.set(null)
      },
      autoNumericOptions: {
        decimalCharacter: ",",
        decimalPlaces: 2,
        digitGroupSeparator: ".",
        emptyInputBehavior: "null" // VueAutoNumeric Docs dafür: When the element is empty, the rawValue and the element value/text is set to null.
        // This also allows to set the value to null using anElement.set(null)
      },
      //---------------------------------------------------------------------------------------------------------------------
      // Für Dezimalzahlen mit QField und VMoney:
      decimalHandling: decimalHandling, // NEU: Modul mit zentralen Helper-Funktionen für Dezimalzahlen
      //------------------------------------------------------------------------------------------------
      nullNiveau: 0.45, // v-model für Tests von q-field mit VMoney
      nhnNiveau: 250.0, // v-model für Tests von q-field mit VMoney
      //------------------------------------------------------------------------------------------------
      // Steuerungsparameter für VMoney - siehe https://www.npmjs.com/package/v-money
      moneyFormatForDirective: {
        decimal: ",", // ALT: '.'
        thousands: ".", // ALT: '.'
        prefix: "", // ALT: '$ ', // ACHTUNG: - erzeugt negative Zahl! //  ALT: 'NHN: '
        suffix: "", // ALT: ' #',
        precision: 2, // 2 Nachkommastellen
        masked: false /* doesn't work with directive */ // Daher oben prefix auf '' eingestellt
      },
      moneyFormatForComponent: {
        decimal: ",", // ALT: '.'
        thousands: ".", // ALT: ','
        prefix: "", // ALT: '$ ', // ACHTUNG: - erzeugt negative Zahl!
        suffix: "", //  ALT: ' #',
        precision: 2, // 2 Nachkommastellen
        masked: true // Kontrolliert, ob Prefix mit in den Wert aufgenommen wird oder nicht
      },
      //---------------------------------------------------------------------------------------------------------------------

      // INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT,
      // INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT,
      //-------------------------------------------------------------------
      // NEU: Für Auswahl Gemeinde mit Gemeindeschlüssel per QSelect:
      // selectModelGemeinden: null, // ALT: Variable zum ersten Testen des QSelects für Gemeinden, ersetzt durch entsprechende Baueigenschaften
      // selectOptionsGemeinden: null, // ACHTUNG: Muss in mounted mit JSON-Array GemeindenCondensed initialisiert werden!
      // selectFilterOptionsGemeinden: null,
      //-------------------------------------------------------------------
      // Übernommen aus filter-generisches-baueigenschafts-profil-formular.vue:
      operatorOptions: [
        { label: "=", value: "$eq" },
        { label: "≥", value: "$gte" },
        { label: ">", value: "$gt" },
        { label: "≤", value: "$lte" },
        { label: "<", value: "$lt" },
        { label: "≠", value: "$ne" }
      ],
      korrespondierendeBaueigenschaften: KorrespondierendeBaueigenschaften, // NEU, für die Zuordnung von Baueigenschaften zwischen Baustoffen und Baueinheiten
      filteredNodesTreeBaustoffe: null, // Array zum Lesen gefilterter Baustoffe
      alleFelderSindReadOnly: false, // Konstante, um im Template alle Eingabefelder zu disablen!
      //--------------------------------------------------------------------
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      displayLeftArrow: "\u2190", // Konstante für Linkspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular:
        "geometrieTabGeschossBaueigenschaftsProfilFormular", // TODO XXXXXX - wird hier in Filterformular nicht benötigt
      indexFuerTabLayoutGesteuertesGenerischesProfilFormular: 0, // TODO - vorläufiger Index im Map-artigen JS-Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular, der auf die Daten für ein Tab zeigt
      // ACHTUNG: Aktuell nicht verwendet!
      localStore: globalStore,
      mountedDone: false,

      // Die folgenden Layouts aus layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue werden hier für das Filterformular nicht benötigt:
      /*
      layoutBaustoffBaueigenschaftsProfilFormular: LayoutBaustoffBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen
      // NEU: Für Test von Methoden aus JS-Modulen: Neues separates JS-Module, korrespondierend zum Layout File für ein Profil, mit Funktionen:
      functionsBaustoffEstrichBaueigenschaftsProfilFormular: FunctionsBaustoffEstrichBaueigenschaftsProfilFormular,
      // ACHTUNG: Hier noch keine this-Übergabe! Diese erfolgt in mounted(), wo die testComputedProperty aus dem Modul geholt wird!!!
      layoutBaustoffEstrichBaueigenschaftsProfilFormular: LayoutBaustoffEstrichBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen
      layoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular: LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen und Baueinheiten
      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular: LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitStandortBaueigenschaftsProfilFormular: LayoutBaueinheitStandortBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular: LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitGeschossBaueigenschaftsProfilFormular: LayoutBaueinheitGeschossBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitBodenBaueigenschaftsProfilFormular: LayoutBaueinheitBodenBaueigenschaftsProfilFormular, // NEU: Layout für neues Profil "Baueinheit > Boden"
      // NEU: Für Test von Methoden aus JS-Modulen: Neues separates JS-Module, korrespondierend zum Layout File für ein Profil, mit Funktionen:
      functionsBaueinheitBodenBaueigenschaftsProfilFormular: FunctionsBaueinheitBodenBaueigenschaftsProfilFormular,
      // ACHTUNG: Hier noch keine this-Übergabe! Diese erfolgt in mounted(), wo die testComputedProperty aus dem Modul geholt wird!!!
      layoutBaueinheitRaumBaueigenschaftsProfilFormular: LayoutBaueinheitRaumBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular: LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitSchichtBaueigenschaftsProfilFormular: LayoutBaueinheitSchichtBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      */

      // layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: null, // Array für die Speicherung von Layout-Information für
      // dieses layoutgesteuerte generische Baueigenschaftsprofilformular, wird in mounted() initialisiert
      // Für das Filterformular umbenannt nach:
      layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular: LayoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular, // Map für die Speicherung aller im Profilformular enthaltener Baueigenschaften, mit deren aktuellen Werten (am augewählten Knoten)
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      profilModelÁusgewaehlterKnoten: null, // Dies ist das Profil-Model für den ausgewählten Knoten im Bauvorhabenbaum, welches aus der Prop selectedKey befüllt werden muss (TODO XXXXXX)
      profilModelZuFilterndeBaueigenschaften: null, // Dies ist das Profil-Model für die im Filter-Formular angezeigten Baueigenschaften für die Filter-Felder (Baustoffeigenschaften!), für
      // das aktuell ausgewählte (Filter-)Profil, inklusive den populierten typbegezogenen Feldern
      // ACHTUNG: Diese werden nur zur Filterung verwendet, sie werden aktuell NICHT abgespeichert!
      // Array für die Felder aller im Profilformular für die Filterung enthaltenen Baueigenschaften, mit deren aktuellen Werten
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      // selectedNode: null, // Hier nicht benötigt
      // selectedNodeArbeitskopie: null, // Hier nicht benötigt
      // eigenschaftenAusEltern: null, // Hier nicht benötigt
      alleFilterBaueigenschaftsProfile: [], // Die Filterprofile aus dem Backend, populiert, inklusive zugeordneterBaueigenschaften
      ausgewaehltesBaueigenschaftsProfil: null, // Das Filterprofil aus diesem Array als Objekt, das aktuell ausgewählt ist (bzw. der Komponente in profilBezeichnung übergeben wurde)
      alleFilterBaueigenschaftsProfileAusLayout: [], // Dieselben Filterprofile aus dem Layout, für Auswahl eines Baueigenschaftsprofils per QSelect, ACHTUNG: Andere Reihenfolge als alleBaueigenschaftsProfile!
      // Aufbau; [ { filterProfilBezeichnung: "Baustoff > Filter > Estrich", filterProfilAnzeigeText: "Filter für Estriche" }, ... { .. , .. } ]
      bezeichnungenBaueigenschaftsProfile: ["TODO"]
      // indexMapFuerProfilModelZuFilterndeBaueigenschaften: [] // Aktuell nicht verwendet, Map um statt per computed-Funktion findeIndexVonBaueigenschaftSchichtdicke den Index
      // für eine Baueigenschaft mit baueigenschaftsBezeichnung im Array profilModelZuFilterndeBaueigenschaften zu finden
      // Beispiel für Aufbau: {"Baueinheit > Schicht > Dicke": 17, ... }
      // this.indexMapFuerProfilModelZuFilterndeBaueigenschaften["Baueinheit > Schicht > Dicke"] liefert dann den Index
      // Muss in mounted: initialisiert werden per Funktion baueIndexMapFuerProfilModelZuFilterndeBaueigenschaften()
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet bzw. die in mounted vorinitialisierten Felder indexInProfilModelZuFilterndeBaueigenschaften im Layout File
      //----------------------------------------------------------------------------------------------------------------------
      // Code verwendet aktuell direkt die Date Utils mit date.formatDate/formatTime, daher die folgenden Funktionen auskommentiert:
      /*
      formatDate: function(val) {
        //--------------------------------------------------------------------------------------------------------------------
        // Helper function for Date Formatting
        // ACHTUNG: Funktion wird oben im Template verwendet, in Methoden wird meist date.formatDate direkt aus den Quasar Date Utilities gerufen!
        // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
        // Sonst müssen sie nach methods: verschoben werden!
        // Die Mongoose Dates werden in Quasar z.B. so dargestellt: 2020-12-04T00:00:00.000Z
        // Siehe https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Die bessere Lösung scheint die JS Library Momentjs zu sein (var moment : require('moment'), läuft in Node und Browser)
        // Mongoose kann anscheinend nur Dates mit Time: https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Auch hier wird Momentjs empfohlen: https://stackoverflow.com/questions/53932266/how-to-convert-date-format-in-nodejs-using-mongoose
        //--------------------------------------------------------------------------------------------------------------------
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
        //--------------------------------------------------------------------------------------------------------------------
        // Helper function for Time of Day Formatting
        // ACHTUNG: Funktion wird oben im Template verwendet, in Methoden wird meist date.formatDate direkt aus den Quasar Date Utilities gerufen!
        // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
        // Sonst müssen sie nach methods: verschoben werden!
        // Die Time of Days werden am Backend abgelegt als Strings im Format: "hh:mm" (war ursprünglich "hhmm")
        // Diese Fuktion formatiert sie um nach: "hh:mm"
        // Aktuell muss keine Umformatierung erfolgen!!!
        //--------------------------------------------------------------------------------------------------------------------
        if (typeof val === "undefined" || val === null || val === "") {
          return;
        }
        // return val.substring(0, 2) + ":" + val.substring(2, 4);
        return val;
      },
      */
    };
  },
  //***=====================================================================================================================================
  methods: {
    resetEingabefelder(profil) {
      //-----------------------------------------------------------------------------------------------------------------------
      // Setzt das Profil-Model auf Null-Werte zurück
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      console.log("In resetEingabefelder()");
      // Zunächst eine leere wertbezogene Baueigenschaft anlegen:
      const leereWertbezogeneBaueigenschaft = {
        // ACHTUNG: Vue kann nicht ohne Weiteres Konstanten deklarieren! Müssten in externe Files ausgelagert werden
        // Siehe https://github.com/vuejs/vue/issues/6004
        // Objekt, mit dem neue Baueigenschaft initialisiert und resetted wird
        // ACHTUNG: Diese Werte müssen die Mongoose Validation bestehen bei Save in die Datenbank!
        // Zu beachtende Regeln für Mongoose Validation: required-Felder müssen vorhanden und gesetzt sein
        // null heisst ein Feld ist vorhanden, aber nicht gesetzt
        // enum-Felder dürfen nur null sein, wenn in enum-Definition null dabei ist!
        // Mongoose Validation Fehler kommen als Error 500 vom Mongoose Call (z.B. save()) zurück
        // Return Parameter error.message enthält dabei die Error Message, ggf. im Controller loggen!
        aktiviertNichtDeaktiviert: true,
        definiertNichtUndefiniert: false, // Unabhängig von ererbtNichtGesetzt
        ererbtNichtGesetzt: false, // Unabhängig von definiertNichtUndefiniert, d.h. auch undefinierte Werte können geerbt sein
        systemdefiniertNichtBenutzerdefiniert: false, // Nur if definiertNichtUndefiniert. ACHTUNG: Deprecated im Rahmen von #514
        systemberechnetNichtSystemgesetzt: false, // Nur if systemdefiniertNichtBenutzerdefiniert, bedeutet: ist computed Property
        vererbtAnKindknoten: false, // Nur if definiertNichtUndefiniert (kann bei Bedarf gesetzt werden) - aktuell nur für Bauvorhabenbaum reserviert, nicht verwenden für Baustoffbaum!!!
        sollwertNichtIstwert: false, // Nur if definiertNichtUndefiniert (kann bei Bedarf gesetzt werden). ACHTUNG: Deprecated im Rahmen von #514
        // Stattdessen Mongoose enum-Syntax gemäß https://mongoosejs.com/docs/validation.html:
        güteBewertung: null, // NEU: null hinzugefügt im Rahmen von #514!!!
        //-------------------------------------------------------------------------------------------------------------------------------
        kennWert1: null, // ACHTUNG: Diese Wertefelder müssen alle null sein, damti die Prüfun in filtereBaustoffe() funktioniert!!!
        kennWert2: null,
        datumsWert1: null,
        datumsWert2: null,
        tagesZeitWert1: null, // NEU
        tagesZeitWert2: null, // NEU
        bezeichnungsWert1: null,
        bezeichnungsWert2: null,
        aufzaehlungsWert: null,
        wahrheitsWert: null,
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        operator: "$eq" // NEU - Operator auf Filterbedingung, Default ist "$eq" (für das Backend mit MongoDB), angezeigt wird "=" mit emit-value und map-options
      };
      console.log(
        "profil.zugeordneteBaueigenschaften: ",
        profil.zugeordneteBaueigenschaften
      ); // Zur Kontrolle, steuert die beiden nächsten Schritte
      //---------------------------------------------------------------------------------------------------------------------------------------------------------
      // Nun die wertbezogenen Felder erzeugen mit Hilfe der obigen leeren Baueigenschaft:
      let arbeitsKopieProfilModelZuFilterndeBaueigenschaften = [];
      for (var j = 0; j < profil.zugeordneteBaueigenschaften.length; j++) {
        // Befüllen der wertbezogenen Felder mit leerer Baueigenschaft mit Object.assign()
        // Vorlage: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften[j] = Object.assign(
          // ACHTUNG: Kann Array of Strings für aufzaehlungsWert enthalten!!! Dann wird angeblich nur Referenz kopiert? Funktioniert aber!
          {},
          leereWertbezogeneBaueigenschaft
          // this.profilModelZuFilterndeBaueigenschaften.push(leereWertbezogeneBaueigenschaft) // Alternative mit push(), funktioniert auch, disabled
          // profil.zugeordneteBaueigenschaft[j].typbezogeneBaueigenschaft // ACHTUNG: typbezogeneBaueigenschaft ist selbst ein Objekt!
          // Dies würde dessen Felder flach hinein kopieren- FALSCH! Wird jetzt weiter unten erledigt.
        ); // Kopie der leeren Baueigenschaft
      }
      console.log(
        "Nach erster Schleife - arbeitsKopieProfilModelZuFilterndeBaueigenschaften: ",
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften
      );
      // ACHTUNG: Enthält laut Log auch schon ein Objekt typbezogeneBaueigenschaft, das eigentlich erst unten hinzugefügt wird!!! Wird eventuell bei der
      // Konsolausgabe hinzugefügt?
      //-----------------------------------------------------------------------------------------------------------------------------------------------------
      // Nun auch die typbezogenen Felder befüllen:
      // ACHTUNG: zugeordneteBaueigenschaften enthalten neben dem Unterobjekt typbezogeneBaueigenschaft
      // für die Vorgabewerte einer Eigenschaft AUCH Namensduplikate obiger wertbezogener Felder! Diese dürfen nicht versehentlich mitkopiert werden!
      for (var i = 0; i < profil.zugeordneteBaueigenschaften.length; i++) {
        console.log(
          "profil.zugeordneteBaueigenschaft[" + i + "]: ",
          profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        );
        //--------------------------------------------------------
        // Variante mit Object.assign() - funktioniert!
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften[
          i
        ].typbezogeneBaueigenschaft = Object.assign(
          // ACHTUNG: Kann Array of Strings für selektierbareOptionenAufzaehlungsWert enthalten!!! Dann wird angeblich nur Referenz kopiert? Funktioniert aber!
          {},
          profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        ); // Kopiert die Felder der typbezogene Baueigenschaft in das Unterfeld typbezogeneBaueigenschaft
        //--------------------------------------------------------
        // Alternative mit JSON.parse/stringify - funktioniert auch!
        // Vorlage: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/10916838#10916838
        // arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i].typbezogeneBaueigenschaft = JSON.parse(JSON.stringify(profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft))
        //--------------------------------------------------------
        // Alternative mit einfacher Zuweisung - funktioniert auch!
        // arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i].typbezogeneBaueigenschaft = profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        //--------------------------------------------------------
        // Siehe auch https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array - dort weitere Varianten, z.B. mit spread-Operator
        //--------------------------------------------------------
        /*
        console.log(
          "arbeitsKopieProfilModelZuFilterndeBaueigenschaften[" +
            i +
            "].typbezogeneBaueigenschaft: ",
          arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i]
            .typbezogeneBaueigenschaft
        ); // Diese Konsolausgabe stimmt noch!
        */
      }
      console.log(
        "Nach zweiter Schleife - arbeitsKopieProfilModelZuFilterndeBaueigenschaften: ",
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften
      ); // Zeigt ggf. das fehlerhafte Model!
      // Kopiere nun das aufgebaute Objekt nach profilModelZuFilterndeBaueigenschaften:
      this.profilModelZuFilterndeBaueigenschaften = arbeitsKopieProfilModelZuFilterndeBaueigenschaften.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      //===============================================================================================
      // HINWEIS: Hier könnte man die Baueigenschaften in profilModelZuFilterndeBaueigenschaften auch noch
      //          anders sortieren, z.B. in einer durch ein spezifisches Layout File für jedes Profil
      //          spezifizierten Reihenfolge. Ohne eine solche weitere Sortierung befinden sich
      //          die Baueigenschaften in der Reihenfolge, wie sie vom Backend kamen. Am Backend
      //          (baueinheiten/baustoffe.controller.readBaueinheit/readBaustoff()) werden sie alphabetisch sortiert,
      //          in derselben Reihenfolge (toUpperCase()) wie auch Quasar sortiert.
      //===============================================================================================
    },

    getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff(
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      baueigenschaftsProfilBezeichnung,
      baueigenschaftsBezeichnungAnBaustoff
    ) {
      // Hilfsfunktion zum einfacheren Zugriff auf die Zuordnungen der korrespondierenden Baueigenschaften
      console.log(
        "In getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff()"
      );
      const profilZuordnungen = this.korrespondierendeBaueigenschaften.find(
        e =>
          e.baueigenschaftsProfilBezeichnung ===
          baueigenschaftsProfilBezeichnung
      );
      console.log("profilZuordnungen: ", profilZuordnungen);
      const baueigenschaftsZuordnungen = profilZuordnungen.baustoffZuBaueinheitZuordnungen.find(
        e => e.wertAnBaustoff === baueigenschaftsBezeichnungAnBaustoff
      );
      console.log("baueigenschaftsZuordnungen: ", baueigenschaftsZuordnungen);
      return baueigenschaftsZuordnungen;
    },

    uebertrageWerteVonBaueigenschaft(quellBaueigenschaft, zielBaueigenschaft) {
      //-----------------------------------------------------------------------------------------------------------------------
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      // Überträgt die Werte einer Baueigenschaft (quellBaueigenschaft) in Abhängigkeit vom gesetzten Wertetyp
      // nach zielBaueigenschaft
      // Vorlage: baueinheiten.getWerteVonBaueigenschaft()
      //-----------------------------------------------------------------------------------------------------------------------
      console.log("In uebertrageWertevVonBaueigenschaft()");
      // console.log("quellBaueigenschaft: ", quellBaueigenschaft);
      switch (quellBaueigenschaft.typbezogeneBaueigenschaft.werteTyp) {
        case "Kennwert":
          zielBaueigenschaft.kennWert1 = quellBaueigenschaft.kennWert1;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
        case "Kennwertepaar":
          zielBaueigenschaft.kennWert1 = quellBaueigenschaft.kennWert1;
          zielBaueigenschaft.kennWert2 = quellBaueigenschaft.kennWert2;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          zielBaueigenschaft.bezeichnungsWert2 =
            quellBaueigenschaft.bezeichnungsWert2;
          break;
        case "Datumswert":
          zielBaueigenschaft.datumsWert1 = quellBaueigenschaft.datumsWert1;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
        case "Datumswertepaar":
          zielBaueigenschaft.datumsWert1 = quellBaueigenschaft.datumsWert1;
          zielBaueigenschaft.datumsWert2 = quellBaueigenschaft.datumsWert2;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          zielBaueigenschaft.bezeichnungsWert2 =
            quellBaueigenschaft.bezeichnungsWert2;
          break;
        case "Tageszeitwert": // NEU
          zielBaueigenschaft.tagesZeitWert1 =
            quellBaueigenschaft.tagesZeitWert1;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
        case "Tageszeitwertepaar": // NEU
          zielBaueigenschaft.tagesZeitWert1 =
            quellBaueigenschaft.tagesZeitWert1;
          zielBaueigenschaft.tagesZeitWert2 =
            quellBaueigenschaft.tagesZeitWert2;
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          zielBaueigenschaft.bezeichnungsWert2 =
            quellBaueigenschaft.bezeichnungsWert2;
          break;
        case "Bezeichnungswert":
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
        case "Bezeichnungswertepaar":
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          zielBaueigenschaft.bezeichnungsWert2 =
            quellBaueigenschaft.bezeichnungsWert2;
          break;
        case "Aufzählungswert":
          console.log(
            "quellBaueigenschaft.aufzaehlungsWert: ",
            quellBaueigenschaft.aufzaehlungsWert
          );
          // ACHTUNG: Bei Übetragung von Aufzählungswerten aus Baueinheiten (z.B. Schicht) kommt hier ein Array of String an!!!
          // Dies führt zu Fehlern beim Filtern im Backend!!!
          // Fix per Konvertierung:
          if (Array.isArray(quellBaueigenschaft.aufzaehlungsWert)) {
            // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, wenn Aufzählungswerte
            // aus einer Baueinheit "Schicht" übertragen werden!!
            console.log(
              "quellBaueigenschaft.aufzaehlungsWert ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
            );
            if (quellBaueigenschaft.aufzaehlungsWert.length > 0) {
              // Das erste Element aus dem Array nehmen, dieser hat, da nicht multiple Selection, normalerweise length 1!!!
              zielBaueigenschaft.aufzaehlungsWert =
                quellBaueigenschaft.aufzaehlungsWert[0];
              // Achtung: Per Browser Log gibt es auch den Fall [null] (Array mit einem Element null) - dieser wird hier mit erledigt!!!
            } else {
              // Sonst leerer Array [] - dies kommt auch vor per Browser Log!!!
              zielBaueigenschaft.aufzaehlungsWert = null; // null-Felder werden später nicht an das Backend geschickt
            }
          } else {
            // Kein Array, sondern String:
            zielBaueigenschaft.aufzaehlungsWert =
              quellBaueigenschaft.aufzaehlungsWert;
          }
          console.log(
            "zielBaueigenschaft.aufzaehlungsWert: ",
            zielBaueigenschaft.aufzaehlungsWert
          );
          // NEU: TODO #222 - auch Aufzählungs- und Wahrheitswerte haben Feld bezeichnungsWert1 zusätzlich enabled!
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
        case "Wahrheitswert":
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          // NEU: TODO #222 - auch Aufzählungs- und Wahrheitswerte haben Feld bezeichnungsWert1 zusätzlich enabled!
          zielBaueigenschaft.bezeichnungsWert1 =
            quellBaueigenschaft.bezeichnungsWert1;
          break;
      }
    },

    ladeSollwerteAusAusgewaehlterBaueinheit() {
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      // Funktion zum Laden von Sollwerten aus ausgewählter Baueinheit in die Filter-Felder zum Suchen gefilterter Baustoffe
      // Verwendet für das Mapping zwischen den beteiligten Baueigenschaften die Datenstruktur korrespondierendeBaueigenschaften,
      // die oben importiert wird.
      // Pseudocode:
      // Für alle Baueigenschaften im Profil-Model (zunächst nur testweise für Profil "Baustoff > Estrich"):
      //   - Finde Bezeichnung der korrespondierende Sollwert-Baueigenschaft per Hilfsfunktion getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff()
      //   - Hole deren Sollwerte aus der ausgewählten Baueinheit (in Abhängigkeit vom Wertetyp) - diese ist über eine Prop zugreifbar
      //     ACHTUNG: selectedNode müsste mit einer Prop selectedKey immer erst aus dem Backend geladen werden in ein profilModelAusgewaehlterKnoten
      //              Deshalb stattdessen selectedNodeTreeBaueinheiten als Prop übergeben.
      //              Ein eigenes Profil-Model (welches bei Neu-Auswahl von selectedNode per watch() aktualisiert werden müsste)
      //              ist dafür aber hier nicht notwendig, wenn auf die Baueigenschaften darin direkt zugegriffen wird!
      //              Dies ist möglich mit filter-Funktion.
      //     ACHTUNG: Dabei musste auch der watch() für selectedKey nach selectedNode angepasst werden!
      //   - Übertrage diese Werte in die korrespondierende Eigenschaft im Filterfeld - dazu baueinheiten.getWerteVonBaueigenschaft() als Vorlage
      //=========================================================================================================================================
      // ACHTUNG: Am q-select im Profilformular "Schicht" UND hier "selection="single" hinzugefügt, um zu verhindern, dass
      // diese Funktion ladeSollwerteAusAusgewaehlterBaueinheit() Arrays of Strings in die Felder lädt aus der Baueinheit/Schicht, was zu
      // fehlerhaften Suchen am Backend führt!!!
      // Hilft aber nicht - es kommen trotzdem Arrays of Strings oder leere Arrays aus der Baueinheit.
      // selection="single" wieder entfernt - laut Quasar QSelect API ist sowieso "multiple" (alleine!) notwendig, um multiple Selection zu enablen.
      // selection="single" gibt es wohl gar nicht mehr als Prop.
      // Dies hängt wohl damit zusammen dass das Backend normalerweise für "echte" Aufzählungswerte Arrays of Strings liefert.
      // Deshalb werden in baueinheit-schicht-baueigenschafts-profil-formular.selectModelChangedAufzaehlungswert() Konvertierungen
      // für Aufzählungswerte von Array nach String durchgeführt, die vermutlich in uebertrageWerteVonBaueigenschaft() auch erfolgen müssen!
      //=========================================================================================================================================
      // TODO XXXXXX:
      // 1. [DONE] Obigen Fehler mit Arrays of Strings bei Aufzählungswerten beheben - Konvertierung in uebertrageWerteVonBaueigenschaft() a
      // 2. Für alle Arten von Baustoffprofilen verallgemeinern
      // 3. Prüfen, ob bei ausgewählter Baueinheit mit aktiviertem Profil "Baueinheit > Schicht" der zum Baustoffprofil passende Schichttyp (z.B. "Estrich") definiert ist
      // 4. Prüfen, ob die Sollwerte an der Baueinheit auch definiert sind - diese werden in uebertrageWerteVonBaueigenschaft bisher unkonditionell übertragen in die Filter-Werte
      //-----------------------------------------------------------------------------------------------------------------------------------------
      const baueigenschaftsProfilBezeichnung = "Baustoff > Estrich"; // TODO XXXXXX - bisher nur testweise für dieses Profil
      // Für alle Baueigenschaften im Profil-Model:
      for (let baueigenschaft of this.profilModelZuFilterndeBaueigenschaften) {
        const baueigenschaftsBezeichnung =
          baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung;
        const baueigenschaftsZuordnungen = this.getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff(
          baueigenschaftsProfilBezeichnung,
          baueigenschaftsBezeichnung
        );
        // console.log("baueigenschaftsZuordnungen: ", baueigenschaftsZuordnungen)
        const sollwertBaueigenschaftAnBaueinheit = this.selectedNodeTreeBaueinheiten.baueigenschaften.filter(
          element =>
            // NEU - Sollwert an Baueinheit aus Mapping File benutzen:
            element.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            baueigenschaftsZuordnungen.sollwertAnBaueinheit
          // HINWEIS: Die BEgs dafür im Profil "Baueinheit > Schicht" mussten erst neu angelegt werden!
          // ALT - Testbaueigenschaft benutzen:
          // element.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          // "Allgemein > Test > Wertetypen > Kreditwürdigkeit" // Für erste Tests
        ); // ACHTUNG: filter() liefert Array
        if (sollwertBaueigenschaftAnBaueinheit.length > 0) {
          // Korrespondierenden Sollwert an Baueinheit gefunden
          console.log(
            "sollwertBaueigenschaftAnBaueinheit: ",
            sollwertBaueigenschaftAnBaueinheit
          ); // ACHTUNG: Ist Array der Länge 1!
          const baueigenschaftAnBaustoff = this
            .profilModelZuFilterndeBaueigenschaften[
            this.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung)
          ];
          console.log("baueigenschaftAnBaustoff: ", baueigenschaftAnBaustoff);
          this.uebertrageWerteVonBaueigenschaft(
            sollwertBaueigenschaftAnBaueinheit[0],
            baueigenschaftAnBaustoff
          );
        } else {
          console.log(
            "***ACHTUNG***: Keinen korrespondierenden Sollwert an Baueinheit gefunden, daher nichts zu laden für Baueigenschaft: ",
            baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
          );
        }
      }
    },

    filtereBaustoffe() {
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // Funktion zum Lesen gefilterter Baustoffe:
      // Status 02.10.2021: In Beta-Test, Entwicklung noch nicht vollständig
      // Status 05.10.2021: Entwicklung vollständig bis auf einzelne Punkte, Performance/Memory auf Heroku muss beobachtet werden
      // Siehe Updates dazu im Epic 27 ("Hochzeit") im internen Design.
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // Erster Test mit lokaler Testdatenbank, dabei die 2 Baueigenschaften unten (Estrich-Aufzählungswerte) an verschiedenen Baustoffen im Baustoffbaum
      // mit definierten Werten belegt und nach diesen gefiltert mit der Filter-Maske und dem "Baustoffe filtern" Button aus diesem Formular hier:
      // - Estrichbauart: "Schwimmender Estrich"
      // - Biegezugfestigkeitsklasse: "F02 >= 2 N/mm2"
      // Erste Testergebnisse:
      // 1. An Blattknoten "Hydraulisch erhärtender Kleber": Suche erfolgreich, Zweig wird returned (allerdings nur ab "Kleber")
      // 2. An Blattknoten ""KNAUF schwimmender Zementestrich, erdfeucht": Suche erfolgreich, Zweig wird returned (allerdings nur ab "Estrich")
      // 3. An Blattknoten "Verglasung": Zweig wurde nicht returned! Besonderheit: Es handelt sich um einen Blattknoten auf der 2. Ebene von oben. Gefixt, siehe unten.
      // Die Suchergebnisse können im Browser Log inspiziert werden (data.response) sowie in der Debug-Ausgabe unter den Buttons (filteredNodesTreeBaustoffe)
      // ACHTUNG: In den ersten Tests wurden generell die Elternknoten nur bis zur 3. Ebene nach oben ausgegegeben, die 2. Ebene fehlte!
      //          Dies hing damit zusammen, dass in Zeile 496 getChildrenTree() bestimmungsgemäß nur die Kinder sucht und findet, nicht den Wurzelknoten - allerdings
      //          kommen schon dort nur die Kinder ab der 3. und nicht wie erwartet ab der 2. Ebene (Ausgabe "gefilterter Baustoffbaum nach Query, vor Aufbereitung: ")
      //          Dies war auch der Grund, weshalb oben 3. "Verglasung" nicht returned wurde! Musste in readFilteredExtraktBaustoffe() in baustoffe.controller.js
      //          noch weiter evaluiert werden! Der Grund dafür ist, dass im API die Wurzel des zu durchsuchenden Zweigs mitgegeben werden kann. Diese wird
      //          am Frontend aus der Prop keyWurzelBaustoffbaum entnommen - diese war aber schon beim Aufruf von filter-generisches-baueigenschafts-profil-formular.vue
      //          in baueinheiten.vue falsch gesetzt - dies korrigiert beim Aufruf von baueinheiten.vue - damit werden die Knoten korrekt ab der zweiten
      //          Ebene angezeigt, inklusive "Verglasung" im Beispiel oben.
      // ACHTUNG: Die Backend-Funktion readFilteredExtraktBaustoffe() in baustoffe.controller.js muss zur Unterstützung unterschiedlicher Wertetypen noch angepasst werden.
      //          Aktuell werden dort hartkodierte Query-Parameter verwendet, die zu den Test-Aufzählungswerten hier im Frontend passen.
      // ACHTUNG: Die beiden Baueigenschaften wurden zuerst logisch per Oder-Bedingung verknüpft, nicht per Und-Bedingung!
      //          Daher noch $and für Und-Bedingung in die Controller-Methode eingebaut, nach Vorlage auf
      //          https://stackoverflow.com/questions/23272682/combining-two-elemmatch-queries-with-and-boolean-operator-in-mongodb - $and
      //-------------------------------------------------------------------------------------------------------------------------------------------
      // Beschreibung der weiteren Implementierung:
      //   Gefilterter Baustoffbaum wird an baueinheiten.vue (per Refresh-Event) zurückgegeben - diese refreshed damit den Baustoffbaum für
      //   die zugeordneten Baustoffe mittels Event Handler am Event (@-Methode loadFilteredBaustoffe()).
      //   Es müssen die Attribute, die von filtereBaustoffe() zurückgeliefert werden, übereinstimmmen mit denen an nodesTreeBaustoffe in baueinheiten.vue.
      //   Dies sind laut Debug-Info: "_id", baustoffBezeichnung, baumKnotenTyp, verzweigungsTyp, parent (MTree), path (MTree), children (MTree/Quasar).
      //   Diese werden bereits per query-Parameter fields im Backend selektiert, zusätzlich auch noch die gefilterten Baueigenschaften.

      //   HINWEIS: Die gefilterten Baueigenschaften könnte man aus Performance-Gründen auch noch einsparen für diesen Use Case!
      //   HINWEIS: Das Feld children mit den verschachtelten Kindern wird automatisch von MPath hinzugefügt!

      //   Es wird ein Refresh-Event an baueinheiten.vue mit dem gefilterten verschachtelten Tree (liegt vor am Ende in response.data vom Backend, was nach
      //   filteredNodesTreeBaustoffe hier in der Komponente kopiert wird) an die Elternkomponente baueinheiten.vue geschickt (refresh-requst-tree-baustoffe)
      //   mit dem gefilterten Tree als Parameter ($event in Signatur der Prop). baueinheiten.vue reagiert daraufin loadFilteredBaustoffe(), indem es den
      //   Baustoffbaum neu aufbaut mit diesen gefilterten Knoten

      //   Nach dem Refresh werden bisher alle Knoten im Baum expandiert per Quasar-QTree-Methode expandAll(). Performance dafür muss beobachtet werden.
      //   Es werden nach dem Refresh die bereits vorher getickten Nodes getickt, allerdings nur die vorher gespeicherten.
      //   Überlegung: Als ticked Nodes könnte man zusätzlich noch die gefundenen Blattknoten automatisch ticken (Ausbaustufe).
      //   Dazu musste einfach wie in baueinheiten.loadTreeBaustoffe() der Array nodesTreeBaustoffe mit den von dieser Komponente gelieferten gefilterten
      //   Baustoffe (filteredNodesTreeBaustoffe) ersetzt werden in diesem Refresh-Event Handler. Der Rest wird wie in loadTreeBaustoffe() erledigt
      //   (Knoten ticken aus Array zugeordneteBaustoffe an der Baueinheit), Felder an Relationship laden etc.
      //   Allerdings würden diese dann die bereits zugeordneten (und daher bisher getickten) Baustoffe überschreiben, so dass man nicht mehr
      //   unterscheiden könnte, welche in der Datenbank bereits vorher zugeordnet waren. Daher bisher nicht implementiert.
      //-----------------------------------------------------------------------------------------------------------------------------------------
      console.log("In filtereBaustoffe()");
      // Filter-Test-Array:
      /*
      let filterArrayBaueigenschaften = [
        {
          baueigenschaftsBezeichnung: this
            .profilModelZuFilterndeBaueigenschaften[0].typbezogeneBaueigenschaft
            .baueigenschaftsBezeichnung, // Baustoff > Estrich > Bauart
          aufzaehlungsWert: this.profilModelZuFilterndeBaueigenschaften[0]
            .aufzaehlungsWert, // Aktuell String bei Einfachauswahl!
          operator: "$eq"
        },
        {
          baueigenschaftsBezeichnung: this
            .profilModelZuFilterndeBaueigenschaften[1].typbezogeneBaueigenschaft
            .baueigenschaftsBezeichnung, // Baustoff > Estrich > Biegezugfestigkeitsklasse
          aufzaehlungsWert: this.profilModelZuFilterndeBaueigenschaften[1]
            .aufzaehlungsWert, // Aktuell String bei Einfachauswahl!
          operator: "$gt"
        } // ACHTUNG: Strings für bezeichnungsWert und aufzaehlungsWert können Blanks und Sonderzeichen enthalten!
      ];
      */
      // Nun der richtige Filter-Array:
      // Zunächst alle Elemente im Profil-Model, die null sind für die Query an das Backend herausfiltern
      console.log(
        "profilModelZuFilterndeBaueigenschaften: ",
        this.profilModelZuFilterndeBaueigenschaften
      );
      console.log(
        "profilModelZuFilterndeBaueigenschaften.map(): ",
        this.profilModelZuFilterndeBaueigenschaften.map(
          e =>
            e.kennWert1 != null ||
            e.kennWert2 != null ||
            (e.bezeichnungsWert1 != null && e.bezeichnungsWert1 !== "") ||
            (e.bezeichnungsWert2 != null && e.bezeichnungsWert2 !== "") ||
            (e.datumsWert1 != null && e.datumsWert1 !== "") ||
            (e.datumsWert2 != null && e.datumsWert2 !== "") ||
            (e.tagesZeitWert1 != null && e.tagesZeitWert1 !== "") ||
            (e.tagesZeitWert2 != null && e.tagesZeitWert2 !== "") ||
            e.aufzaehlungsWert != null ||
            (Array.isArray(e.aufzaehlungsWert) && // Nur relevant bei aus regulären Profil Models hierher in das Filter Model
              // übertragenen Aufzählungswerten, oder bei selection "multiple" (hier Default "single")
              e.aufzaehlungsWert.length > 0) ||
            e.wahrheitsWert != null
        )
      );
      let nonNullElementsProfilModelZuFilterndeBaueigenschaften = this.profilModelZuFilterndeBaueigenschaften.filter(
        e =>
          e.kennWert1 != null ||
          e.kennWert2 != null ||
          (e.bezeichnungsWert1 != null && e.bezeichnungsWert1 !== "") ||
          (e.bezeichnungsWert2 != null && e.bezeichnungsWert2 !== "") ||
          (e.datumsWert1 != null && e.datumsWert1 !== "") ||
          (e.datumsWert2 != null && e.datumsWert2 !== "") ||
          (e.tagesZeitWert1 != null && e.tagesZeitWert1 !== "") ||
          (e.tagesZeitWert2 != null && e.tagesZeitWert2 !== "") ||
          e.aufzaehlungsWert != null ||
          (Array.isArray(e.aufzaehlungsWert) && // Nur relevant bei aus regulären Profil Models hierher in das Filter Model
            // übertragenen Aufzählungswerten, oder bei selection "multiple" (hier Default "single")
            e.aufzaehlungsWert.length > 0) ||
          e.wahrheitsWert != null
      );
      console.log(
        "nonNullElementsProfilModelZuFilterndeBaueigenschaften: ",
        nonNullElementsProfilModelZuFilterndeBaueigenschaften
      );
      let filterArrayBaueigenschaften = [];
      for (
        let i = 0;
        i < nonNullElementsProfilModelZuFilterndeBaueigenschaften.length;
        i++
      ) {
        filterArrayBaueigenschaften.push({
          baueigenschaftsBezeichnung:
            nonNullElementsProfilModelZuFilterndeBaueigenschaften[i]
              .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
          // operator: "$eq" // Für Tests
          operator:
            nonNullElementsProfilModelZuFilterndeBaueigenschaften[i].operator // NEU: Per QSelect auswählbarer Operator, mit emit-value und map-options
        });
        this.uebertrageWerteVonBaueigenschaft(
          nonNullElementsProfilModelZuFilterndeBaueigenschaften[i],
          filterArrayBaueigenschaften[i]
        );
        // ACHTUNG: Schickt auch die zugehörigen Bezeichnungswerte1/2 mit!!!
      }
      console.log("filterArrayBaueigenschaften: ", filterArrayBaueigenschaften);
      if (filterArrayBaueigenschaften.length === 0) {
        console.log("filterArrayBaueigenschaften hat Länge 0");
        return;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Lösung für Query String:
      // Vorlage: https://stackoverflow.com/questions/16903476/node-js-http-get-request-with-query-string-parameters - den Array erst mit stringify()
      //          in String umwandeln, dann noch als URI encoden, dann als Query Parameter mit "?" hinten an den Request anhängen
      let filterArrayBaueigenschaftenStringified = JSON.stringify(
        filterArrayBaueigenschaften
      );
      console.log(
        "filterArrayBaueigenschaftenStringified: ",
        filterArrayBaueigenschaftenStringified
      ); // JSON-Notation für Array, enthält Blanks
      // [
      //  {"baueigenschaftsBezeichnung":"Allgemein > Test > Wertetypen > Dynamische Steifigkeit","kennWert1":35,"operator":"$eq"},
      //  {"baueigenschaftsBezeichnung":"Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung","bezeichnungsWert1":"Knauf","operator":"$eq"}
      // ]
      // Enthält etwaige Blanks und Sonderzeichen
      // 2. Schritt, um etwaige Blanks und Sonderzeichen zu encoden:
      let filterArrayBaueigenschaftenStringifiedAndURIEncoded = encodeURIComponent(
        filterArrayBaueigenschaftenStringified
      );
      // Siehe dazu https://www.w3schools.com/tags/ref_urlencode.ASP
      // sowie https://stackoverflow.com/questions/6807180/how-to-escape-a-json-string-to-have-it-in-a-url
      // Rekursiv bei nested Objects: https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
      // https://stackoverflow.com/questions/4540753/should-i-use-encodeuri-or-encodeuricomponent-for-encoding-urls - encodeURI() gilt für ganze URLs,
      // encodeURIComponent() für Teile davon (wie z.B. Query String)
      // Dasselbe gilt für decodeURI() vs. decodeURIComponent(): https://stackoverflow.com/questions/747641/what-is-the-difference-between-decodeuricomponent-and-decodeuri
      console.log(
        "filterArrayBaueigenschaftenStringifiedAndURIEncoded: ",
        filterArrayBaueigenschaftenStringifiedAndURIEncoded
      ); // Mit encoded Blanks und Sonderzeichen
      // %5B%7B%22baueigenschaftsBezeichnung%22%3A%22Test%20%3E%20Dynamische%20Steifigkeit%22%2C%22kennWert1%22%3A35%2C%22operator%22%3A%22%24eq%22%7D%2C%7B%22baueigenschaftsBezeichnung%22%3A%22Test%20%3E%20Herstellerkurzbezeichnung%22%2C%22bezeichnungsWert1%22%3A%22Knauf%22%2C%22operator%22%3A%22%24eq%22%7D%5D
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // HINWEISE zum Decoding in JS-Objekt auf Server-Seite:
      // In einfachen Fällen genügt JSON.parse des Query Strings!
      // Eventuell vorher decodeURIComponent()
      // Außerdem gibt es noch Node Funktionen zur Bearbeitung des Query Strings: https://nodejs.org/api/querystring.html
      // Komplexere Decoding-Lösung mit decodeURI: https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
      // Tutorial: https://www.developerdrive.com/turning-the-querystring-into-a-json-object-using-javascript/
      // Weitere Hinweise zum Parsen von Query Strings mit Arrays: // Vorlage: https://stackoverflow.com/questions/30048806/parsing-a-json-query-string-into-a-json-object
      //----------------------------------------------------------------------------------------------------------------------------------------------
      let apiRoute =
        process.env.API +
        "/Baustoffe/" +
        // this.keyWurzelBaustoffbaum + // ALT: Prop, Filterung im gesamten Baustoffbaum - aus Performance-Gründen (Heroku) disabled
        this.selectedKeyTreeBaustoffe + // NEU: Filterung nur im ausgewählten Zweig - dazu neue Prop selectedKeyTreeBaustoffe eingeführt!
        "/Baueigenschaften/Filter" +
        "?filter=" +
        filterArrayBaueigenschaftenStringifiedAndURIEncoded;
      // NEU: Request Parameter Id am Backend hinzugefügt
      // ACHTUNG: Wenn der Parameter id null ist, wird vom Backend Router die falsche Methode aufgerufen (readBaustoff())!!!
      //          Die eigentliche API-Methode für Filtertest wird dann gar nicht aufgerufen und kann den Fall nicht wie gewünscht auf den Wurzelknoten umbiegen!!!
      // ACHTUNG: Get Request, kann keinen Body haben!
      // Nur ggf. Query String, siehe https://stackoverflow.com/questions/514892/how-to-make-an-http-get-request-with-parameters
      // NEU: Query String mit Array der Filterbedingungen per "?filter=" + myArryStringifiedAndURIEncoded hinten am Request hinzugefügt
      //=============================================================================================================================================================================================
      // ACHTUNG: Dabei muss der Array mittels "?filter=! + myFilterArryStringifiedAndURIEncoded einen Namen erhalten, damit am Server mittels req.query.filter auf diesen zugegriffen werden kann!!!
      // Siehe https://stackoverflow.com/questions/22080770/i-need-to-create-url-for-get-which-is-going-to-accept-array-how-in-node-js-expr - Arrays als Query Strings
      //=============================================================================================================================================================================================
      this.$axios
        .get(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.get, response.status: ",
            response.status
          );
          console.log("response.data:", response.data);
          if (response.data.length > 0) {
            // Gefilterte Baustoffe wurden gefunden, Baustoffbaum refreshen per Event an baueinheiten.vue!
            this.filteredNodesTreeBaustoffe = response.data;
            this.$emit(
              "refresh-request-tree-baustoffe",
              this.filteredNodesTreeBaustoffe
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFFE_FILTERUNG_ERFOLG
            );
          } else {
            // Keine gefilterten Baustoffe gefunden, Baustoffbaum nicht refreshen!
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFFE_FILTERUNG_KEINE_GEFUNDEN
            );
          }
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.get, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFFE_FILTERUNG_FEHLER
          );
        });
    },

    generalComparisonFunction(linkeBaueigenschaft, rechteBaueigenschaft, mode) {
      //-------------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, die zwei Baueigenschaften (bisher nur Kennwerte) vergleicht und bei mode "icon" den passenden Icon-Namen zurückgibt zur Anzeige
      // mode: "icon" oder "flip"
      //       "icon": Returned Name des anzuzeigenden Icons
      //       "flip": Returned bei ">": "flip-vertical", bei "<" und "=": "" (kein vertikaler Flip)
      // HINWEISE:
      // - Diese Funktion, die im Template für die Visualisierung von Vergleichen aufgerufen wird, ist etwas anders strukturier als generalClickMethod()
      // - Sie hat nicht die baueigenschaft im Layout als Argument
      // - Sie holt ihre Argumente dann nicht aus den entsprechenden Props an der baueigenschaft im Layout, sondern erhält sie direkt als Parameter!
      // - Dies könnte auch umgestaltet werden nach dem Muster von generalClickMethod()
      //-------------------------------------------------------------------------------------------------------------------------------------------
      console.log("In generalComparisonMethod()");
      let differenzNumber = 0;
      differenzNumber =
        this.profilModelZuFilterndeBaueigenschaften[
          this.layoutBaueigenschaft(linkeBaueigenschaft)
            .indexInProfilModelZuFilterndeBaueigenschaften
        ].kennWert1 -
        this.profilModelZuFilterndeBaueigenschaften[
          this.layoutBaueigenschaft(rechteBaueigenschaft)
            .indexInProfilModelZuFilterndeBaueigenschaften
        ].kennWert1;
      if (mode === "icon") {
        if (differenzNumber === 0) return "done"; // NEU: Checkmark statt Headline für Gleichheit // ALT: "view_headline" // =
        if (differenzNumber > 0) return "south_east"; // ↘
        if (differenzNumber < 0) return "north_east"; // ↗, kein flip-vertical notwendig
      } // else // mode ="flip"
      if (differenzNumber === 0) return ""; // Kein flip
      if (differenzNumber < 0) return ""; // Kein flip
      if (differenzNumber > 0) return ""; // Kein flip bei Aufwärtspfeil "north_east"
      // Alternative Icons (Treppen):
      /*
      if (differenzNumber === 0) return "view_headline"; // =
      if (differenzNumber < 0) return "stairs"; //  ↗, Treppen-Icon, gibt es nur aufwärts
      if (differenzNumber > 0) return "stairs"; // ↘, hier flip-vertical des Treppen-Icons notwendig
      */
      // Alternative Icons (Pfeile):
      /*
      if (differenzNumber === 0) return "view_headline" // =
      if (differenzNumber > 0) return "south_east" // ↘
      if (differenzNumber < 0) return "north_east" // ↗, kein flip-vertical notwendig
      */
      // Frühere Versuche mit Unicode - geht nur zusammen mit v-html im Template - siehe dort:
      /*
      if (differenzNumber === 0) return "&#8596;" // ↔
      if (differenzNumber < 0) return "&#8600;" // ↘
      if (differenzNumber < 0) return "&#8599;" // ↗
      */
    },

    generalClickMethod(baueigenschaft) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Generalisierte @click-Methode auf Button im Layout
      //      Hat als Parameter eine baueigenschaft aus dem Layout
      //      Fragt dann Prop clickAction am Layout ab und macht dann die erforderliche Aktion
      //      Benutzt dafür ggf. noch weitere Sub-Props aus dem Layout
      // Bisher implementierte Properties bzw. Sub-Properties:
      // - clickAction: "Reset" // Macht Feld-Reset
      //   - sollWertBaueigenschaft // Bezeichung der Baueigenschaft, deren Wert zum Reset von istWertBaueigenschaft genommen wird
      //   - istWertBaueigenschaft // Bezeichung der Baueigenschaft, die resetted werden soll mit Wert aus sollWertBaueigenschaft
      // - clickAction: "Calculate" // Macht Berechnung
      //   - istWertBaueigenschaft // Bezeichung der Baueigenschaft, deren Wert mit einem berechneten Wert aktualisiert wird
      // Alternativ könnte man auch, abhängig von clickAction oder optionalen weiteren Props an der baueigenschaft im Layout
      // eine spezialisierte Funktion aus functions-xyz-baueigenschafts-profil-formular.js aufrufen, die dann allerdings geladen
      // werden müsste, in mounted(), spezifisch für das übergebene/angezeigte Baueigenschaftsprofil!
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In generalClickMethod()");
      console.log("baueigenschaft: ", baueigenschaft);
      console.log("baueigenschaft.clickAction: ", baueigenschaft.clickAction);
      let baueigenschaft1,
        baueigenschaft2 = null; // Hilfsvariablen
      let result = null; // Hilfsvariable
      switch (baueigenschaft.clickAction) {
        case "Reset":
          // In diesem Fall werden 2 weitere Props erwartet im Layout:
          console.log(
            "baueigenschaft.sollWertBaueigenschaft: ",
            baueigenschaft.sollWertBaueigenschaft
          );
          console.log(
            "baueigenschaft.istWertBaueigenschaft: ",
            baueigenschaft.istWertBaueigenschaft
          );
          // Die benötigten Baueigenschaften im Profil Model identifizieren:
          baueigenschaft1 = this.profilModelZuFilterndeBaueigenschaften[
            this.layoutBaueigenschaft(baueigenschaft.sollWertBaueigenschaft)
              .indexInProfilModelZuFilterndeBaueigenschaften
          ]; // Baueigenschaft, mit deren Wert resetted werden soll (Sollwert)
          baueigenschaft2 = this.profilModelZuFilterndeBaueigenschaften[
            this.layoutBaueigenschaft(baueigenschaft.istWertBaueigenschaft)
              .indexInProfilModelZuFilterndeBaueigenschaften
          ]; // Zu resettende Baueigenschaft (Istwert)
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp ===
            "Aufzählungswert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              baueigenschaft1.aufzaehlungsWert // Sollwert
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.aufzaehlungsWert: ",
              baueigenschaft2.aufzaehlungsWert
            );
          }
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp === "Kennwert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "kennWert1", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              baueigenschaft1.kennWert1 // Sollwert
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.kennWert1: ",
              baueigenschaft2.kennWert1
            );
          }
          break;
        case "Calculate":
          // In diesem Fall wird aktuell nur eine Prop erwartet im Layout
          console.log(
            "baueigenschaft.istWertBaueigenschaft: ",
            baueigenschaft.istWertBaueigenschaft
          );
          // Die benötigte Baueigenschaft im Profil Model identifizieren:
          baueigenschaft2 = this.profilModelZuFilterndeBaueigenschaften[
            this.layoutBaueigenschaft(baueigenschaft.istWertBaueigenschaft)
              .indexInProfilModelZuFilterndeBaueigenschaften
          ]; // Zu resettende Baueigenschaft (Istwert)
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp ===
            "Aufzählungswert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              ["Otto"] // TODO XXXXXX: Hier echtes Computen, z.B. per Aufruf einer spezifischen Funktion aus functions-Modul für das Profilformular,
              // abhängig z.B. von der Bezeichnung der Baueigenschaft, oder von weiteren Props, wenn clickAction === "Calculate"
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.aufzaehlungsWert: ",
              baueigenschaft2.aufzaehlungsWert
            );
          }
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp === "Kennwert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "kennWert1", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              42 // TODO XXXXXX: Hier echtes Computen, z.B. per Aufruf einer spezifischen Funktion aus functions-Modul für das Profilformular,
              // abhängig z.B. von der Bezeichnung der Baueigenschaft, oder von weiteren Props, wenn clickAction === "Calculate"
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.kennWert1: ",
              baueigenschaft2.kennWert1
            );
          }
          break;
        default:
          console.log("FEHLER: Nicht unterstützte clickAction");
      }
    },

    initializeIstWerteMitSollWerten() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Initialisiere das Profil Model für solche Baueigenschaften, die im Layout eine Prop "initializeMitSollWert" haben, zusammen mit
      //      weiterer Prop "sollWertBaueigenschaft", die eine andere Baueigenschaft bezeichnet, mit deren Wert die aktuelle
      //      (Istwert-)Baueigenschaft initialisiert wird, falls sie null ist.
      // ACHTUNG: Stammt aus Vorlage layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue
      //          Verwendet als Layout layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In initializeIstWerteMitSollWerten()");
      for (let tab of this
        .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
        if (tab.ueberschriftTab !== undefined) {
          // Notwendig, sonst hier Fehler bei Tabs ohne Überschrift!!!
          console.log("In for für Tab: ", tab.ueberschriftTab);
        }
        for (let rubrik of tab.rubrikenInTab) {
          if (rubrik.ueberschriftRubrik !== undefined) {
            // Notwendig, sonst hier Fehler bei Rubriken ohne Überschrift!!!
            console.log("In for für Rubrik: ", rubrik.ueberschriftRubrik);
          }
          for (let baueigenschaftInRubrik of rubrik.baueigenschaftenInRubrik) {
            /*
          if (Object.keys(baueigenschaftInRubrik).length === 0 && baueigenschaftInRubrik.constructor === Object
          // Test auf leeres Objekt, siehe https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object:
          ) {
            console.log("Achtung: Rubrik ohne Baueigenschaften!");
          } else {
          */
            if (
              baueigenschaftInRubrik.baueigenschaftsBezeichnung !== undefined // Notwendig, sonst hier Fehler bei Rubriken ohne Baueigenschaften!!!
            ) {
              console.log(
                "In for in Reihenfolge der Baueigenschaften in layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
                baueigenschaftInRubrik.baueigenschaftsBezeichnung
              );
              // NEU: Initialisiere das Profil Model für solche Baueigenschaften, die im Layout eine Prop "initializeMitSollWert" haben, zusammen mit
              //      weiterer Prop "sollWertBaueigenschaft", die eine andere Baueigenschaft bezeichnet, mit deren Wert die aktuelle
              //      Baueigenschaft initialisiert wird, falls sie null ist
              // TODO XXXXXX: Für alle Wertetypen erweitern
              if (baueigenschaftInRubrik.initializeMitSollWert !== undefined) {
                let aktuelleBaueigenschaftImProfilModel = this
                  .profilModelZuFilterndeBaueigenschaften[
                  baueigenschaftInRubrik
                    .indexInProfilModelZuFilterndeBaueigenschaften
                ];
                switch (
                  aktuelleBaueigenschaftImProfilModel.typbezogeneBaueigenschaft
                    .werteTyp
                ) {
                  case "Kennwert":
                    if (
                      // Null-Prüfung (d.h. undefiniert im BIM.click-Sinn)
                      aktuelleBaueigenschaftImProfilModel.kennWert1 == null ||
                      this.profilModelZuFilterndeBaueigenschaften[
                        baueigenschaftInRubrik
                          .indexInProfilModelZuFilterndeBaueigenschaften
                      ].kennWert1 === ""
                    ) {
                      // Baueigenschaft mit Default-Wert vorbelegen, wenn ihr Wert bisher null ist:
                      this.$set(
                        aktuelleBaueigenschaftImProfilModel, // Sollwert bzw. BEg, die mit Default-Wert vorzubelegen ist
                        "kennWert1",
                        this.profilModelZuFilterndeBaueigenschaften[
                          this.layoutBaueigenschaft(
                            baueigenschaftInRubrik.sollWertBaueigenschaft
                          ).indexInProfilModelZuFilterndeBaueigenschaften
                        ].kennWert1 // Default-Wert aus anderer BEg, die per Prop sollWertBaueigenschaft bezeichnet wurde
                      );
                    }
                    break;
                  case "Aufzählungswert":
                    if (
                      // Null-Prüfung (d.h. undefiniert im BIM.click-Sinn)
                      aktuelleBaueigenschaftImProfilModel.aufzaehlungsWert ==
                        null ||
                      aktuelleBaueigenschaftImProfilModel.aufzaehlungsWert
                        .length === 0
                    ) {
                      // Baueigenschaft mit Default-Wert vorbelegen, wenn ihr Wert bisher null ist:
                      this.$set(
                        aktuelleBaueigenschaftImProfilModel, // Sollwert bzw. BEg, die mit Default-Wert vorzubelegen ist
                        "aufzaehlungsWert",
                        this.profilModelZuFilterndeBaueigenschaften[
                          this.layoutBaueigenschaft(
                            baueigenschaftInRubrik.sollWertBaueigenschaft
                          ).indexInProfilModelZuFilterndeBaueigenschaften
                        ].aufzaehlungsWert // Default-Wert aus anderer BEg, die per Prop sollWertBaueigenschaft bezeichnet wurde
                      );
                    }
                    break;
                  default:
                    console.log(
                      "FEHLER: Nicht unterstützter Wertetyp bei Prop 'initializeMitSollWert'!"
                    );
                }
              }
            }
          }
        }
      }
    },

    buttonClickedWerteEingabeAnVerzweigungsKnoten() {
      // Hilfsmethode bei Button-Click
      globalStore.showBenutzerNachricht(
        BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFILFORMULAR_VERZWEIGUNGSKNOTEN_WERTEEINGABE_WARNUNG
      );
      this.eingabeFreischaltenAnVerzweigungsKnoten = true;
    },

     determineReadonly(baueigenschaft) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // HINWEIS: Musste angepasst werden, stammte noch aus Vorlage!
      // Methode, um die :readonly-Prop eines Felds zu bestimmen.
      // Returned vorläufig false, es sei denn, an der Baueigenschaft wird im Layout "readonly" als Prop auf true gesetzt!
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // [DEFER]: Bei ausgewähltem Knoten im Baustoffbaum könnte man auch die Aktiviertheit der jeweiligen Baueigenschaft am ausgewählten Knoten im Baustoffbaum abfragen,
      // mittels der Prop selectedNodeTreeBaustoffe, und damit Felder, die am ausgewählten Knoten nicht aktiviert sind, erst gar
      // NICHT zum Filtern zulassen. Damit werden dann Filterungen mit Eigenschaften, die im jeweiligen Zweig gar nicht aktiviert sind, ausgeschlossen.
      // Dies könnte z.B. vorkommen, falls der Benutzer im Dropdown-Menü ein ein an dem ausgewählten Baustoff nicht aktiviertes Profil ausgewählt hat.
      // ABER: Dies würde einen Backend-Call erfordern, da die Baueigenschaften im "reduzierten" Baustoffbaum nicht populiert sind, sondern erst auf
      // Knopfdruck (in "Details zum ausgewählten Baustoff") populiert werden. Daher müsste man dann bei Auswahl eines
      // Knotens im Baustoffbaum (in watch()) erst einmal einen Backend-Call machen, um den Knoten mit Baueigenschaften zu laden.
      // Als Vorlage dafür könnte die Readonly-Variante von layout-gesteuertes-generisches-profil-formular.vue dienen, bei der in mounted(), watch() (2-mal), reset() der Baustoff gelesen wird.
      // Dann könnte die Funktion hier die Aktiviertheit der Baueigenschaften abfragen (diese wird an jedem Feld aufgerufen, daher sollte sie keine Backend-Calls machen!)
      // HINWEIS: Die Definiertheit der Baueigenschaften sollte beim Filtern allerdings NICHT eingeschränkt werden, da an Verzeigungsknoten im Baustoffbaum Baueigenschaften oft undefiniert sind!
      //==================================================================================
      // return false; // Temporär zum Testen
      //----------------------------------------------------------------------------------
      function findeIndexVonBaueigenschaft(
        node,
        gesuchteBaueigenschaftsBezeichnung
      ) {
        //------------------------------------------------------------------------------------------------------------------------------------------
        // Hilfsfunktion
        // Bestimmt mittels findIndex den Index der Baueigenschaft mit der Bezeichnung gesuchteBaueigenschaftsBezeichnung (zweiter Parameter)
        // im Array der Baueigenschaften am ausgewählten Knoten (Baustoff im Baustoffbaum, erster Parameter)
        // ACHTUNG: Funktioniert so NICHT, weil die baueigenschaften nicht populiert sind (undefiniert)!!!
        //------------------------------------------------------------------------------------------------------------------------------------------
        const index = node.baueigenschaften.findIndex(
          item =>
            item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            gesuchteBaueigenschaftsBezeichnung
        );
        return index;
      };
      //----------------------------------------------------------------------------------
      // NEU: readonly Prop aus Layout am Feld überschreibt alle anderen readonly-Logiken:
      if (baueigenschaft.readonly) return true;
      return false; // Vorläufig immer false!
      //==================================================================================
      // Nachfolgender Code disabled, würde erfordern, dass die baueigenschaften populiert sind am ausgewählten Knoten im Baustoffbaum:
      /*
      if (this.selectedNodeTreeBaustoffe) { // Knoten augewählt im Baustoffbaum
         let myIndex = null;
         myIndex = findeIndexVonBaueigenschaft(this.selectedNodeTreeBaustoffe, baueigenschaft.baueigenschaftsBezeichnung)
         if (myIndex) {
           if (this.selectedKeyTreeBaustoffe.baueigenschaften[myIndex].aktiviertNichtDeaktiviert) {
              return false
            } else {
                return true
            }
         } else { // null - sollte nicht vorkommen
           return true // Sicherheitshalber Feld auf readonly setzen
         }
      } else { // Kein Knoten ausgewählt im Baustofbaum
          return false // Eingaben zulassen
      }
      */
    },

    determineFieldBackgroundColor(baueigenschaft) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Methode, um die Hintergrundfarbe eines Felds zu bestimmen. War früher nur abhängig von
      // profilModelZuFilterndeBaueigenschaften[baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften].bezeichnungWerteVererbenderElternknoten
      // Seit Einführung des Buttons "Felder mit definierten Werten an Kindbaustoffen kennzeichnen" gibt es aber zusätzlich
      // eine Property bgColor, die anzeigt, ob Kindknoten mit definierten Werten existieren. Diese kann nicht im Layout abgelegt werden, denn sie ist spezifisch
      // pro Knoten und muss daher beim Wechseln des Knotens aktualisiert werden!
      // Diese Property bgColor muss in der Funktion ermittleDefiniertheitKindKnoten() nach Drücken des Buttons reaktiv in das profilModel eingetragen werden.
      // Die Property wird allerdings nicht gespeichert wie andere Flags (Performance!), sondern ist transient. Wechselt man den Knoten,
      // verschwindet sie und damit die durch diese Funktion ggf. gesetzte orangefarbige Farbe der FElder - die Funktion hier prüft deshalb ab, ob die Property existiert oder nicht!
      // HINWEIS: Ein Anlegen der Property in projiziereBaueigenschaften() erwies sich in Tests als überflüssig - das $set in ermittleDefiniertheitKindKnoten()
      // ist offenbar ausreichend - es legt die Prop, wenn nicht schon vorhanden, neu an!
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // ALT (im Layout an allen Eingabefeldern):
      /*
        :bg-color="
          profilModelZuFilterndeBaueigenschaften[
          baueigenschaft
            .indexInProfilModelZuFilterndeBaueigenschaften
        ].bezeichnungWerteVererbenderElternknoten != null
          ? 'cyan-2'
          : 'teal-2'
        "
      */
      // NEU - mit dieser Funktion kann im Template die Feldfarbe gesteuert werden:
      // :bg-color="determineFieldBackgroundColor(baueigenschaft)"
      if (baueigenschaft.bgColor) {
        // NEU: bgColor-Prop aus Layout bestimmt primär die Farbe
        return baueigenschaft.bgColor;
      }
      // Ansonsten:
      if (
        this.profilModelZuFilterndeBaueigenschaften[
          baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
        ].bezeichnungWerteVererbenderElternknoten != null
      ) {
        return "cyan-2"; // Feld mit von Elternknoten ererbtem Wert
      } else {
        if (
          this.profilModelZuFilterndeBaueigenschaften[
            baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
          ].bgColor
        ) {
          // Wird gesetzt in ermittleDefiniertheitKindKnoten() - wird nur im Baustoffbaum verwendet, ist allerdings optional, d.h. es ist unschädlich im Bauvorhabenbaum!
          return this.profilModelZuFilterndeBaueigenschaften[
            baueigenschaft.indexInProfilModelZuFilterndeBaueigenschaften
          ].bgColor; // Triggert orangefarbiges Feld mit definierten Werten an Kindknoten
        } else return "teal-2"; // Normalfall
      }
    },

    ermittleDefiniertheitKindKnoten() {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // NEU - Epic 38.o: Ermittelt die Definierheit von Kindknoten für am ausgewählten Knoten aktivierte UND UNDEFINIERTE Baueigenschaften im Profil per API
      // Bekommt vom API Array zurück mit Baueigenschaftsbezeichnungen von aktivierten UND DEFINIERTEN Baueigenschaften im Profil, die mindestens einen
      // definierten Kindknoten haben - wird aktuell dazu benutzt, diese Felder farbig zu kennzeichnen, um ein versehentliches Überschreiben der
      // Werte in den Kindknoten zu vermeiden. Ein readonly-Schalten der Felder würde das Überschreiben ganz verhindern, was zu restriktiv wäre.
      //==========================================================================================================================================================
      // TODO XXXXXX: Ist aktuell nur für Baustoffe implementiert, könnte auch für Baueinheiten brauchbar sein (allerdings sind dort im Gegensatz zum Baustoffbaum
      // Profile/Baueigenschaften an Kindknoten oft deaktiviert, es sei denn, es handelt sich um gemeinsame Baueigenschaften in mehreren Profilen,
      // die aber als Sollwerte meistens im Kindknoten auf readonly geschaltet sind!!!
      //==========================================================================================================================================================
      const apiRoute =
        process.env.API +
        "/Baustoffe/" +
        this.selectedNode._id +
        "/Baueigenschaftsprofil/Definiertheitszustand/Kindknoten";
      console.log("profilBezeichnung: ", this.profilBezeichnung);
      this.$axios // ACHTUNG: Route mit Body, muss put sein statt get!!!
        .put(apiRoute, {
          baueigenschaftsProfilBezeichnung: this.profilBezeichnung // Body-Parameter: Profilbezeichnung, zusätzlich zu Request-Parameter :id
        })
        .then(response => {
          console.log(
            "response.data.resultBaueigenschaften: ",
            response.data.resultBaueigenschaften
          );
          if (
            response.data.resultBaueigenschaften == null ||
            response.data.resultBaueigenschaften.length === 0
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_KEINE_VORHANDEN
            );
          } else {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_WARNUNG
            );
            // Nun durch den Array result mit den betroffenen Baueigenschaften, für die Kindknoten mit definierten Werten existieren, wandern
            // und deren Felder im Layout Felder farblich kennzeichnen!
            for (let baueigenschaftsBezeichnung of response.data
              .resultBaueigenschaften) {
              // NEU: Hinzufügung dieser Property per $set im Profil Model - die Property ist transient und wird absichtlich nicht gespeichert!
              // Wenn das Profil Model in mounted(), reset() oder watch() (Refresh) neu geladen wird, verschwinden diese Props absichtlich!
              // Obige Funktion determineFieldBackgroundColor() triggert dann daraus ggf. orangefarbige Kennzeichnung des Felds.
              // Siehe dazu auch Hinweise in determineFieldBackgroundColor() oben!
              this.$set(
                this.profilModelZuFilterndeBaueigenschaften[
                  this.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung)
                ],
                "bgColor",
                "orange-3"
              );
            }
          }
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_FEHLER
          );
        });
    },

    layoutBaueigenschaft(baueigenschaftsBezeichnung) {
      // NEU: Convenience-Hilfsfunktion - returned das Layout für eine Baueigenschaft aus dem Layout File/JS Modul
      // Dieses enthält sämtliche Properties aus dem Layout für die Baueigenschaft
      // Parameter baueigenschaftsBezeichnung enthält Bezeichnung einer Baueigenschaft aus dem Layout bzw. Profil Model
      // Traversiert dazu das Layout, bis die Baueigenschaft gefunden wird
      //*******************************************************************************************************************************************
      // HINWEIS: Kann auch aus functions-baustoff-estrich-baueigenschafts-profil-formular.js per _self.layoutBaueigenschaft() aufgerufen werden!!!
      console.log("In layoutBaueigenschaft()");
      console.log(
        "Parameter baueigenschaftsBezeichnung:",
        baueigenschaftsBezeichnung
      );
      for (let tab of this
        .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular) {
        for (let rubrik of tab.rubrikenInTab) {
          for (let layoutBaueigenschaft of rubrik.baueigenschaftenInRubrik) {
            // console.log("layoutBaueigenschaft: ", layoutBaueigenschaft)
            if (
              layoutBaueigenschaft.baueigenschaftsBezeichnung ===
              baueigenschaftsBezeichnung
            ) {
              console.log(
                "Vor return von layoutBaueigenschaft: ",
                layoutBaueigenschaft
              );
              return layoutBaueigenschaft;
            } // else // weitersuchen
          }
        }
      }
      // Wenn wir oben nicht bereits returned sind:
      console.log("FEHLER: Baueigenschaft nicht gefunden im Layout!");
      return null;
    },

    createComputedPropertyFromModule() {
      // Testmethode für Test von computed Properties aus JS-Modulen
      // Wurde zunächst außerhalb vom mounted() zum Testen auf Button gelegt
      console.log(
        "functionsBaustoffEstrichBaueigenschaftsProfilFormular: ",
        this.functionsBaustoffEstrichBaueigenschaftsProfilFormular
      );
      this.testComputedProperty = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
        this
      ).testComputedProperty;
      // HINWEIS: Hier wird dem Module für die computed Properties am Layout File "this" mit übergeben!
      // ACHTUNG: Hier unbedingt nicht testComputedProperty(), sondern testComputedProperty!!!
      // Andernfalls wird die computed-Funktion nicht übergeben, sondern direkt ausgeführt!!!
    },

    isValidTime(v) {
      // Feldvalidierng für Input-Felder für Zeit, mit :rules="[isValidTime]"
      // Vorlage: https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes/5563222
      if (v == null || v === "") return true; // ACHTUNG: Bei mit Tasten geleertem Feld ist v offenbar "", nicht null!
      if (v.length < 5) {
        return "Ungültige Zeit";
      }
      // Benutztes Zeitformat: HH:mm
      // Validierung mit RegExp, 24:00 ist ungültig, HH:60 ist ungültig
      return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || "Ungültige Zeit";
    },

    isValidDate(v) {
      // Feldvalidierng für Input-Felder für Datum, mit :rules="[isValidDate]"
      // Vorlage: https://codepen.io/metalsadman/pen/ZEbrjwB
      if (v == null || v === "") return true; // ACHTUNG: Bei mit Tasten geleertem Feld ist v offenbar "", nicht null!
      if (v.length < 10) {
        return "Ungültiges Datum";
      }
      // ISO standard date: YYYY-MM-DD
      // Our date is nonstandard: DD.MM.YYYY
      // Attempt to standardize it before validation:
      const standardizedDate = v
        .split(".")
        .reverse()
        .join("-"); // String umformatieren von DD.MM.YYYY nach YYYY-MM-DD
      console.log("standardizedDate ", standardizedDate); // String im Format YYYY-MM-DD
      console.log(
        "Formatiertes standardizedDate:",
        date.formatDate(standardizedDate, "DD.MM.YYYY")
      );
      return date.isValid(standardizedDate) || "Ungültiges Datum"; // Quasar date util function isValid
    },

    determineAnzahlSpaltenFilter(filter) {
      // NEU: Funktion, um die Anzahl der Spalten pro Filter, falls dort definiert, aus dem Layout File zu entnehmen, andernfalls Default-Wert 4 Spalten returnen
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      if (filter.spaltenFilter) {
        // NEU: spaltenFilter kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
        // Beispiel für Array: spaltenFilter: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert alternativ zu festen Spaltenbreiten potentiell unterschiedliche col-x-Werte, Summe muss 12 ergeben!
        // DONE: Die Prop wurde deshalb von anzahlSpaltenFilter nach spaltenFilter umbenannt!
        console.log(
          "filter.spaltenFilter.length: ",
          filter.spaltenFilter.length
        ); // undefined, wenn kein Array!
        if (!filter.spaltenFilter.length) {
          return filter.spaltenFilter;
        } // Kein Array, sondern Zahl wie bisher
        if (filter.spaltenFilter.length > 0) {
          // Array mit mindestens einem Element
          return filter.spaltenFilter.length;
        }
      }
      // In allen anderen Fällen (keine Prop, Array mit Länge 0):
      return 4; // Default-Wert
    },

    determineColStringSpaltenProFilter(filter, spalte) {
      // NEU: Funktion, um den richtigen String für col-md-x zu returnen in Abhängigkeit von der Anzahl der Spalten pro Filter (4 oder 6 oder 12)
      // Hier in methods() statt computed(), da Parameter erforderlich sind. Seit für spaltenFilter auch ein
      // Array möglich ist, wird zusätzlichr Parameter spalte benötigt für die laufende Spalte in den beiden v-fors für
      // die Zeile mit Spaltenüberschriften und die Zeile mit Baueigenschaften
      // NEU: spaltenFilter kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
      // Beispiel für Array: spaltenFilter: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert alternativ zu festen Spaltenbreiten potentiell unterschiedliche col-x-Werte, Summe muss 12 ergeben!
      if (!filter.spaltenFilter.length) {
        // Kein Array, Logik wie bisher, gleiche Spaltenbreiten:
        switch (filter.spaltenFilter) {
          case 1:
            return "col-md-12";
          case 2:
            return "col-md-6";
          case 3:
            return "col-md-4";
          case 4:
            return "col-md-3";
          case 6:
            return "col-md-2";
          case 12:
            return "col-md-1";
          default:
            return "col-md-3"; // 4 Felder
        }
      } else {
        // Array mit den col-x-Werten, unterschiedliche Spaltenbreiten
        /*
        console.log("spalte: ", spalte);
        console.log(
          "filter.spaltenFilter[spalte-1]: ",
          filter.spaltenFilter[spalte - 1]
        );
        */
        return "col-md-" + filter.spaltenFilter[spalte - 1];
      }
    },

    determineColStringSpaltenProTab(tab) {
      // NEU: Funktion, um den richtigen String für col-md-x zu returnen in Abhängigkeit von der Anzahl der Spalten pro Tab (2 oder 3 oder 4)
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      switch (tab.anzahlSpaltenTab) {
        case 1:
          return "col-md-12";
        case 2:
          return "col-md-6";
        case 3:
          return "col-md-4";
        case 4:
          return "col-md-3";
        case 6:
          return "col-md-2";
        case 12:
          return "col-md-1";
        default:
          return "col-md-12"; // 1-spaltig
      }
    },

    baueigenschaftenRows(filter) {
      // NEU: Funktion, um Array mit Zeilennummern zur Anzeige in durch filter.spaltenFilter spezifizierten Spalten zu returnen
      // Vorlage: https://codepen.io/mickey58/pen/eYGMPxa
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      // NEU: spaltenFilter kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
      // Beispiel für Array: spaltenFilter: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert col-x Werte, Summe muss 12 ergeben!
      // Deshalb anzahlSpalten hier neu berechnen:
      let spaltenFilter = filter.spaltenFilter.length
        ? filter.spaltenFilter.length // Array, könnte allerdings auch Länge 0 haben!!!
        : filter.spaltenFilter; // Zahl

      if (spaltenFilter) {
        // Anzahl Spalten ist im Layout File spezifiziert
        return Array.from(
          Array(
            Math.ceil(filter.baueigenschaftenInFilter.length / spaltenFilter)
          ).keys()
        );
      } else {
        // Anzahl Spalten auf 4 setzen:
        return Array.from(
          Array(Math.ceil(filter.baueigenschaftenInFilter.length / 4)).keys()
        );
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    initialisiereAusgewaehltesTabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Unter-Tabs im layoutgesteuerten generischen Baueigenschaftsprofilformular
      // TODO XXXXXX - anzupassen für layoutgesteuertes generisches Formular!
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In initialisiereAusgewaehltesTabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular()"
      );
      // TODO XXXXXX: Geborgte Funktion aus baueinheit-raum-baueigenschafts-profil-formular.vue, muss angepasst werden
      // Der Content für die fachliche Hilfe für ein Unter-Tab soll dabei aus der Property tabBeschreibung im Layout kommen!
      // this.setzeProfilFormularBezogeneFachlicheHilfe("Baueinheit > Raum", 0); // Erster Parameter ist Profil, zweiter ist Unter-Tab!
      switch (
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      ) {
        /*
        case "geometrieTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 0;
          break;
        case "geopolitischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 1;
          break;
        case "bauordnungsrechtlicheAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 2;
          break;
        case "umweltbezogeneAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 3;
          break;
        case "hydrogeologischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 4;
          break;
        case "grundstuecksGeometrieAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 5; // NEU
          break;
        case "anforderungenAusGeschossTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 6; // NEU
          break;
        */
        default:
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 0;
          break;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Da Index geändert wurde, muss auch das Enabling/Disabling hier neu berechnet werden, sonst werden bei Tab-Wechsel
      //          die falschen Felder enalbed/disabled (z.B. die eines anderen Knotens im Baum, für den vorher das Enabling/Disabling berechnet wurde,
      //          und dann der Knoten und anschließend das Tab neu ausgewählt werden.
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für dieses Profilformular entfernt!
    },

    baueIndexMapFuerProfilModelZuFilterndeBaueigenschaften() {
      //---------------------------------------------------------------------------------------------------------------------------------------------------------------
      // Für Testzwecke, Variante mit Map statt computed-Funktionen für die Bestimmung des Indexes einer Baueigenschaft im Array
      // Verwendet die Funktion findeIndexVonBaueigenschaft() weiter unten
      // Die Funktion hier baut diese Map auf aus dem Array profilModelZuFilterndeBaueigenschaften
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet
      for (var eigenschaft of this.profilModelZuFilterndeBaueigenschaften) {
        this.indexMapFuerProfilModelZuFilterndeBaueigenschaften[
          eigenschaft
        ] = this.findeIndexVonBaueigenschaft(eigenschaft);
      }
    },

    findeIndexVonBaueigenschaft(
      baueigenschaftsBezeichnung // Parameter: String
    ) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------------
      // Generische Methode mit Parameter, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // Die Bezeichnung der gesuchten Baueigenschaft wird per Parameter übergeben
      // ACHTUNG: Ist KEINE computed-Funktion, kann daher Parameter haben
      //          Kann alternativ zu den computed-Funktionen verwendet werden, die statt eines Parameters die Baueigenschaftsbezeichnung aus dem Funktionsnamen ableiten!
      //          Allerdings muss dann im Template die jeweilige Baueigenschaftsbezeichnung der Funktion hier übergeben werden, was noch
      //          fehleranfälliger ist als der Aufruf der jeweiligen computed-Funktionen mit der Baueigenschaftsbezeichung im Funktionsnamen - daher
      //          im Template bislang die Variante mit den computed-Funktionen beibehalten - diese brauchen dafür viele verschieden benannte, eigentlich
      //          identische computed-Funktionen!
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      // console.log("In findeIndexVonBaueigenschaft() - baueigenschaftsBezeichnung: ", baueigenschaftsBezeichnung);
      let index = this.profilModelZuFilterndeBaueigenschaften.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          baueigenschaftsBezeichnung
      );
      // console.log("In findeIndexVonBaueigenschaft() - index: ", index);
      if (index === -1) {
        console.log(
          "❌❌❌❌❌❌ FEHLER: Index für Baueigenschaft",
          baueigenschaftsBezeichnung,
          "im Array profilModelZuFilterndeBaueigenschaften nicht gefunden!"
        );
        // NEU - in diesem Fall auch Benutzernachricht anzeigen:
        if (
          !this
            .benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt
        ) {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BAUEIGENSCHAFTEN_FEHLER
          );
          this.benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt = true;
        }
      }
      return index;
    },

    // Methoden für das Abfeuern von Events für Hilfe - Vorlagen sind in baueinheiten.vue/baustoffe.vue
    //--------------------------------------------------------------------------------------------------------------------
    // Methode showBedienungsHilfe(ref)
    // NEU: Für Öffnen Bedienungshilfethema im rechten Drawer
    // Feuert einen Event an Global Event Bus, der in my-layout.vue konsumiert wird und dort das q-expansion-item, das
    // per Parameter ref identifiziert wird, öffnet für eventuelle Anzeige durch rechten Drawer
    //--------------------------------------------------------------------------------------------------------------------
    showBedienungsHilfe(ref) {
      console.log("In showBedienungsHilfe()");
      console.log(
        "Emit Event showBedienungsHilfeEvent mit String-Parameter ref: ",
        ref
      );
      this.$root.$emit("showBedienungsHilfeEvent", ref); // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Use Bus)
    },

    //--------------------------------------------------------------------------------------------------------------------
    // Methode showFachlicheHilfe(ref)
    // NEU: Für Öffnen fachliches Hilfethema im rechten Drawer
    // Feuert einen Event an Global Event Bus, der in my-layout.vue konsumiert wird und dort das q-expansion-item, das
    // per Parameter ref identifiziert wird, öffnet für eventuelle Anzeige durch rechten Drawer
    //--------------------------------------------------------------------------------------------------------------------
    showFachlicheHilfe(ref) {
      console.log("In showFachlicheHilfe()");
      console.log(
        "Emit Event showFachlicheHilfeEvent mit String-Parameter ref: ",
        ref
      );
      this.$root.$emit("showFachlicheHilfeEvent", ref); // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Use Bus)
    },

    setzeFelderFuerFachlicheHilfe(
      //--------------------------------------------------------------------------------------------------------------------
      // @focus-Methode für QSelects und QInputs zum Setzen der Felder und Anzeigen der fachlichen Hilfe über global Store
      // ACHTUNG: @focus funktioniert NICHT an QToggles! Daher dort @input statt @focus verwendet!
      // Verallgemeinert auch für Baueinheiten und Baustoffe!
      // ACHTUNG: Die 4 optionalen Parameter für die Bauinformation sollten, wenn diese null ist, im Template als null
      //          übergeben werden. Dadurch wird beim Anwählen von Feldern für Baueigenschaften mit fehlender Bauinformation
      //          deren Anzeige in der fachlichen Hilfe gelöscht, was sinnvoll ist!
      //---------------------------------------------------------------------------------------------------------------------
      baueigenschaftsBezeichnung,
      baueigenschaftsBeschreibung,
      anzeigeTextZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      internerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      idInternerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      externerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      oneDriveLinkZugeordneteBauinformation // NEU (optionaler Parameter)
    ) {
      // NEU: Für #379 Unterscheidung, in welchem Baum die Komponente arbeitet:
      if (this.baum !== "Baustoffbaum") {
        // Bauvorhabenbaum
        // Fachliche Hilfe für die ausgewählte Baueigenschaft an der Baueinheit aufsetzen:
        // baueigenschaftsBezeichnung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBezeichnung
        );
        // baueigenschaftsBeschreibung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBeschreibung
        );
        // anzeigeTextZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          anzeigeTextZugeordneteBauinformation
        ); // NEU - für #379
        // internerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          internerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // idIinternerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          idInternerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // externerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          externerLinkZugeordneteBauinformation
        ); // NEU - für #379
        globalStore.setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          oneDriveLinkZugeordneteBauinformation
        ); // NEU - für #379
        this.showFachlicheHilfe("fachlicheHilfeBaueigenschaftAnBaueinheit");
      } else {
        // Baustoffbaum
        // Fachliche Hilfe für die ausgewählte Baueigenschaft am Baustoff aufsetzen:
        // baueigenschaftsBezeichnung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff(
          baueigenschaftsBezeichnung
        );
        // baueigenschaftsBeschreibung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff(
          baueigenschaftsBeschreibung
        );
        // anzeigeTextZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          anzeigeTextZugeordneteBauinformation
        ); // NEU - für #379
        // internerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          internerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // idIinternerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          idInternerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // externerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          externerLinkZugeordneteBauinformation
        ); // NEU - für #379
        globalStore.setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          oneDriveLinkZugeordneteBauinformation
        ); // NEU - für #379
        this.showFachlicheHilfe("fachlicheHilfeBaueigenschaftAnBaustoff");
      }
    },

    setzeProfilFormularBezogeneFachlicheHilfe(
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Methode, um profilspezifische fachliche Hilfe für ein Profilformular zu setzen
      baueigenschaftsProfilBezeichnung, // Bezeichnung des Profils bzw. Profilformulars
      // TODO: Davon abhängig könnte auch auf dessen Beschreibung zugegriffen werden!
      baueigenschaftsProfilTab // Index des aktuell vom Benutzer angewählten Unter-Tabs im Layout File für das Profilformular - optional
      // Davon abhängig kann auf dessen Überschrift zugegriffen werden!
      // baueigenschaftsProfilRubrik // Index der Rubrik im Layout File für das Profilformular - optional - bisher nicht implementiert
      // Davon abhängig kann auf deren Überschrift zugegriffen werden!
    ) {
      globalStore.setBaueigenschaftsProfilBezeichnung(
        baueigenschaftsProfilBezeichnung
      );
      // Felder für die fachliche Hilfe setzen per global Store
      globalStore.setBaueigenschaftsProfilTabUeberschrift(
        this.layoutBaueinheitRaumBaueigenschaftsProfilFormular[baueigenschaftsProfilTab]
          .ueberschriftTab
      );
      globalStore.setBaueigenschaftsProfilTabBeschreibung(
        this.layoutBaueinheitRaumBaueigenschaftsProfilFormular[baueigenschaftsProfilTab]
          .beschreibungTab
      );
    },

    selectModelChangedAufzaehlungswert( // NEU
      // ACHTUNG: Methode ist aus dem Profilformular "Baueinheit > Standort" - wird hier nicht verwendet, nur als Vorlage im Code belassen!
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte:
      // a) In Abhängigkeit von der bisher ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelZuFilterndeBaueigenschaften[] per Index
      // eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.indexInProfilModelZuFilterndeBaueigenschaften erfolgt, und zwar nicht nur für die
      // Baueigenschaft, die einen "steuernden" Aufzählungswert (z.B."Baueinheit > Standort > Geopolitik > Welt > Kontinent") repräsentiert, sondern auch für
      // andere Baueigenschaften vom Wertetyp "Aufzählungswert" im Formular, die in Abhängigkeit von der ausgewählten Option am "steuernden"
      // Aufzählungswert disabled/enabled oder auf null gesetzt werden.
      // eigenschaftInProfilModelZuFilterndeBaueigenschaften, // Parameter: Die Eigenschaft im Array profilModelZuFilterndeBaueigenschaften,
      // Aufbau (flach):
      // {<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }
      //-------------------------------------------------------------------------------------------------------------------------------------
      newSelectModelValue // Parameter: String mit neuer ausgewählter Option des Aufzählungswerts, siehe https://quasar.dev/vue-components/select#QSelect-API
      // ACHTUNG: Ist per Log beim ersten Aufruf allerdings ein Array, da so vom Backend geliefert (auch für potentielle Multi-Selects)!!!
      //          Daher ist unten Code enthalten, der nur in diesem Fall den Wert von Array nach String konvertiert!!!
      //--------------------------------------------------------------------------------------------------------------------------------------
    ) {
      console.log("In selectModelChangedAufzaehlungswert()");
      console.log(
        "Parameter eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelZuFilterndeBaueigenschaften[
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
          .indexInProfilModelZuFilterndeBaueigenschaften
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelZuFilterndeBaueigenschaften[
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.indexInProfilModelZuFilterndeBaueigenschaften
      ].aufzaehlungsWert = [newSelectModelValue]; // ACHTUNG: Muss Array sein, sonst Probleme beim Speichern im Backend
      console.log("newSelectModelValue: ", newSelectModelValue);

      if (Array.isArray(oldSelectModelValue)) {
        // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        console.log(
          "oldSelectModel ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
        );
        if (oldSelectModelValue.length > 0) {
          oldSelectModelValue = oldSelectModelValue[0];
        } else {
          // Sonst leerer Array, kann vorkommen
          oldSelectModelValue = null;
        }
      }
      //---------------------------------------------------------------------------------------------------------------------
      // Es folgt Resetting und Enabling/Disabling von Feldern in Abhängigkeit vom im Formular geänderten Aufzählungswerten
      // (nach Vorlage aus Formular für Schicht):
      // ALT: Dieser Code war usrprünglich spezifisch für Tab "Geopolitische Angaben"!!!
      // NEU: Es fogt Wrapper-Code zum Aufruf der für ein Tab zuständigen Enabling/Disabling-Methoden
      // Aufruf in Abhängigkeit von tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "Vor spezifischem Reset/Enabling/Disabling für das ausgewählte Tab: ",
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      );
      console.log(
        "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
      );
      console.log(
        "ACHTUNG: Bisher nur implementiert für Tab 'Geopolitische Angaben' - sonst NoOp"
      );
      switch (
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      ) {
        case "lageAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "geopolitischeAngabenTabStandortBaueigenschaftsProfilFormular":
          switch (
            //=======================================================================================================================================
            // ACHTUNG: Der folgende Code enthält hard coded bestimmte Baueigenschaftsbezeichnungen
            //          Wenn diese geändert werden, müuss der Code hier auch geändert werden!!!
            //=======================================================================================================================================
            eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
            // Alter Code aus Vorlage - disabled:
            /*
            case "Baueinheit > Standort > Geopolitik > Welt > Kontinent": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossKontinentWelt(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossKontinentWelt(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Europäische Union": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaeischeUnion(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaeischeUnion(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Europa (nicht EU)": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaNichtEU(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaNichtEU(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Nordamerika": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandNordamerika(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandNordamerika(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Australien und Ozeanien": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandAustralienUndOzeanien(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandAustralienUndOzeanien(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Bundesland > Deutschland": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossBundeslandDeutschland(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossBundeslandDeutschland(
                newSelectModelValue
              );
              break;
            }
            // Für andere Aufzählungswerte in diesem Profil für Geschoss: TODO
            default:
              break;
            */
          ) {
          }
          break;
        case "bauordnungsrechtlicheAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "umweltbezogeneAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "hydrogeologischeAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        /*
        case "verwendungsverboteTabStandortBaueigenschaftsProfilFormular":
          //
          break; // NEU: Dropped
        */
        case "grundstuecksGeometrieAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "anforderungenAusGeschossTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        default:
          break;
      }
    },

    submitWerteAnKnoten(
      //==============================================================================================
      // TODO XXXXXX: Der Code für die Konvertierung von kennWert1 bei Kennwertepaaren ist vorläufig!!
      // Es sollten nur die betroffenen Niveauwerte konvertiert werden, nicht alle Kennwertepaare!
      // TODO XXXXXX: Stammt aus Vorlage layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue
      // Wird in Filterformular nicht benötigt!
      //==============================================================================================
      tab // Parameter: aktuelles Tab - wird aktuell noch nicht verwendet
    ) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // DONE: Hier werden auch leere bzw. disabled Felder auf "definiert" gesetzt!?!
      // DONE: Parameter? Weder idBaueinheit noch baueigenschaften werden verwendet!?!
      // DONE: API Naming Baueinheiten/Schichtaufbau? Wir updaten hier die Baueigenschaften für eine Schicht an einer Baueinheit,
      //       daher Aufruf put-API /baueinheiten/baueigenschaften
      // DONE: Error Handling, Benutzernachrichten
      // ACHTUNG: Nach jetzigem Stand speichert "Speichern" unter den Tabs ALLE Änderungen auf allen Tabs, nicht nur auf dem aktuellen
      //       Vorteile: Code ist einfacher, es gehen keine Änderungen des Benutzers verloren, Refresh nach Speichern würde andernfalls Änderungen auf den ungespeicherten Tabs
      //       (ohne besondere Vorkehrungen dagegen) sowieso überschreiben!!!
      //       Nachteile: Eventuell unbeabsichtigte Änderungen werden gespeichert, Verhalten ist anders als z.B. zwischen Tabs "Beschreibung" und "Details" einer Baueigenschaft
      // TODO: Eventuell Bestätigungs-Dialog vor Speichern einfügen
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In submitWerteAnKnoten()");
      // console.log("Parameter tab: ", tab);
      // Vorlage-Code für Extrakt genau der Eigenschaften (aus der größeren Gesamtmenge in profilModelZuFilterndeBaueigenschaften), die durch die im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      // enthaltenen Rubriken FUER DAS AKTUELL AUSGEWÄHLTE TAB bestimmt sind (diese Untermenge von Eigenschaften wird als Input-Felder in dem betreffenden Tab angezeigt).
      // indexFuerTabLayoutGesteuertesGenerischesProfilFormular zeigt dabei immmer auf das Element (= Objekt mit enthaltenem Array der Eigenschaften im jeweiligen Tab im Unterobjekt rubrikenInTab) des Arrays
      // layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular mit den Eigenschaften für das jeweilige Unter-Tab des Profilformulars.
      // Der Code hier wandert dann durch die Rubriken in diesem Element des Arrays, macht aktuell aber nur ein console.log der betreffenden Eigenschaften
      // Code disabled, da aktuell nicht gebraucht:
      /*
      for (let rubrik of this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[
        this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular
      ].rubrikenInTab) {
        console.log(
          "Eigenschaft in Rubrik: ",
          rubrik.ueberschriftRubrik,
          rubrik.baueigenschaftenInRubrik.map(
            arg =>
              this.profilModelZuFilterndeBaueigenschaften[ // Hier erfolgt das Index-Mapping zwischen den beiden Arrays
                arg.indexInProfilModelZuFilterndeBaueigenschaften
              ]
          )
        );
      }
      */
      //---------------------------------------------------------------------------------------------------------------------------------------------------
      // Der folgende Code wandert durch ALLE Eigenschaften im Profil (NICHT nur durch die im Layout!)
      // und setzt die richtigen Werte auf "definiertNichtUndefiniert" pro Eigenschaft:
      for (let eigenschaft of this.profilModelZuFilterndeBaueigenschaften) {
        // console.log("Vor Aufruf pruefeDefiniertheitVonEigenschaft(eigenschaft);")
        eigenschaft.definiertNichtUndefiniert = this.pruefeDefiniertheitVonEigenschaft(
          eigenschaft
        ); // HINWEIS: In der Vorlage in generisches-baueigenschafts-profil-formular.vue wird das Ergebnis erst zwischengespeichert in Variable result und dann zugewiesen.
      }
      // Erstelle Clone-Kopie des Arrays für Rückkonvertierung der Datumsfelder im Array in das von Mongoose am Backend benötigte Format
      // ACHTUNG: Der originale Array darf nicht direkt konvertiert werden, da er ja das Model für das Form und die QDates darin ist!!!
      // Macht vermutlich nur shallow Copy, von https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript:
      let kopieProfilModelZuFilterndeBaueigenschaften = this.profilModelZuFilterndeBaueigenschaften.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      console.log("Vor Konvertierungen");
      /*
      // Alternative: Deep Copy, von https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript, wird hier vermutlich nicht benötigt!?!
      let kopieProfilModelZuFilterndeBaueigenschaften = this.profilModelZuFilterndeBaueigenschaften.map(a => {
        let newObject = {};
        Object.keys(a).forEach(propertyKey => {
            newObject[propertyKey] = a[propertyKey];
        });
        return newObject;
      });
      */
      //==================================================================================================================================================
      for (let eigenschaft of kopieProfilModelZuFilterndeBaueigenschaften) {
        // NEU: Konvertierung von Dezimalzahlen nach Number (sonst Mongoose Cast Errors am Backend)
        //====================================================================================================================
        // ALT:     Dieser Code für die Konvertierung von kennWert1 bei Kennwertepaaren war für die
        //          Verwendung von VMoney zur Anzeige von Niveaus (jeweils für kennWert1, 0.0-Niveau),
        //          da VMoney deren v-model stets von Object (bei null-Werten) oder Number nach String
        //          umwandelte und keine Rückumwandlung machte!
        // ACHTUNG: Es sollten dabei nur die betroffenen Niveauwerte konvertiert werden, nicht alle Kennwertepaare!
        //          Die Logik unten war vorläufig eingeschränkt auf solche, die "Niveau >" in der Bezeichnung enthalten:
        // ACHTUNG: Damit wurde auch der kennWert1 der Baueigenschaft für UKTS mit konvertiert, außer den
        //          4 Decken- und 4 Bodenniveaus!
        // NEU:     Nach Ersetzung von VMoney durch VueAutoNumeric ist diese Rückkonvertierung unnötig,
        //          da VueAutoNumeric die v-models als Object (bei null-Werten) bzw. Number belässt und
        //          die Wandlung in Dezimalstrings intern erledigt!!!
        // ACHTUNG: Allerdings ist für die Initialisierung von Istwertfeldern aus Sollwerten (z.B. bei
        //          Istwerten für Raumniveaus aus Sollwerten von Geschossniveaus) in mounted() eine
        //          Initialisierung solcher Istwert-Felder aus den (aus dem Elternknoten geerbten) Sollwerten erforderlich!
        // ACHTUNG: Diese Initialisierung sollte in Produktion nur erfolgen, wenn das Feld für den Istwert null ist -
        //          ist es ungleich null, wurde es vom Benutzer vorher bereits absichtlich einmal verändert und abgespeichert!
        //          Dieser Wert muss dann erhalten bleiben!
        //          Siehe Testbeispiel in verwaltung.vue.
        //====================================================================================================================
        /*
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Kennwertepaar" &&
          eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung.includes(
            "Niveau >"
          )
        ) {
          console.log(
            "Vor String to Number Conversion für Niveau - kennWert1: ",
            eigenschaft.kennWert1
          );
          eigenschaft.kennWert1 = this.decimalHandling.convertDecimalStringToNumber(
            eigenschaft.kennWert1
          );
        }
        */
        //=================================================================================================================================================
        // Nun die Date-Strings zurückkonvertieren in die von Mongoose benötigten Date Objects für die Felder datumsWert1/2:
        // ACHTUNG: Dies geht NICHT mittels Quasar Date Util formatDate (diese liefern stets Strings zurück),
        // sondern nur, nachdem der bisherige String umständlich mit dem Code unten in ein Date-Objekt umgewandelt wurde!!!
        // Die Quasar Date Utilities werden für die andere Richtung verwendet, vom Mongoose Date-Objekt nach String!!!
        // ACHTUNG: Gleichzeitig musste im Backend die Funktion pruefeWertgleichheit() angepasst werden, die auf den
        // Mongoose-Date-Objekten Wertevergleiche macht. Diese war einen obskuren Fehler "getTime is not a function" beim
        // API-Aufruf der Backend-Methode schreibeInhaltAusProfilformular() von hier aus dem Frontend. In pruefeWertgleichheit()
        // gefixt (baueigenschafts-profile-aktivierungslogik.js - siehe Kommentare dort)
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
        // Folgender Code wandelt alle Strings für Datumswerte im Array profilModelZuFilterndeBaueigenschaften in Mongoose-Format YYYY-MM-DD um, für Quasar QDate Picker,
        // welcher String-Format erfordert, wegen mask="DD.MM.YYYY" in genau diesem Format!
        // Vorlage: https://stackoverflow.com/questions/40768606/i-have-a-utc-string-and-i-want-to-convert-it-to-utc-date-object-in-javascript/40768745#40768745
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
        ) {
          console.log(
            "Vor Date Conversion für Backend Call - eigenschaft.datumsWert1: ",
            eigenschaft.datumsWert1
          );
          // String, wegen Konvertierungen schon beim Laden im Format DD.MM.YYYY, z.B. 14.10.2020
          // Zurückkonvertieren in das von Mongoose benötigte Date Object:
          // Wird mangels besserer funktionierender Alternativen (Paket Moments ist z.B. zu heavyweight) hier im Folgenden einfach per String-Split gemacht:
          if (eigenschaft.datumsWert1 != null) {
            // ACHTUNG: Sonst undefined-Fehler im Log bei nicht ausgefülltem datumsWert1 (d.h. null)!
            let splittedDateString = eigenschaft.datumsWert1.split(".");
            // Rekonstruiere JS Date Objekt aus dem gesplitteten String - erfordert per Test noch eine Korrektur -1 beim Monat!!! Format ist YYYY, MM-1, DD
            // Siehe auch https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript
            let dateObject = new Date(
              // ACHTUNG: Date muss laut https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
              // mit Konstruktor (new Date) aufgerufen werden, sonst gibt es kein Date-Objekt, sondern einen String zurück!
              // ACHTUNG: Diese Konvetierung berücksichtigt offfenbar eine für das jeweilige Datum spezifische Lokalzeit - bisher nicht weiter erforscht, ob das Probleme machen kann!!!
              // Beispiel 1: datumsWert1: 23.07.1999
              //             dateObject: Fri Jul 23 1999 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)
              // Beispiel 2: datumsWert1: 01.01.2000
              //             dateObject: Sat Jan 01 2000 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)
              splittedDateString[2], // Parameter year
              splittedDateString[1] - 1, // Parameter monthindex
              splittedDateString[0] // Parameter day
            );
            console.log("dateObject: ", dateObject);
            eigenschaft.datumsWert1 = dateObject; // NEU: Fix für #295, Date Object an das Backend schicken
            //----------------------------------------------------------------------------------------------------------------------
            // eigenschaft.datumsWert1 = date.formatDate(dateObject, "YYYY-MM-DD"); // Alternative: Liefert String in diesem Format
            //----------------------------------------------------------------------------------------------------------------------
            // Konvertierung mit Quasar Date Util, wandelt das Date Objekt um in das von Mongoose benötigte Format YYYY-MM-DD um
            // ACHTUNG: Quasar formatDate erfordert als ersten Parameter ein Date-Objekt. Strings werden nur akzeptiert im Format YYYY-MM-DD!!!
            // Das Problem hier ist, dass QDate wegen mask="MM.DD.YYYY" NICHT auf diesem Format arbeitet, sondern auf "MM.DD.YYYY" - dieses Format
            // wird in profilModelZuFilterndeBaueigenschaften per Konvertierung mit date.formatDate() erzeugt in mounted(), reset() und in watch() (= Refresh) auf der Prop selectedNode!!!
            // ACHTUNG: Dies führte temporär zu Mongoose TypeError am Backend beim Speichern!
            // Nach anderem Fix (pruefeWertgleichheit() am Backend macht nun ebenfalls Date-Vergleiche mit new Date())
            // funktioniert dies als Alternative ebenso wie die direkte Speicherung von dateObject! Vermutlich erfolgt
            // am Backend ein automatisches Casting des "YYYY-MM-DD"-Strings in das von Mongoose in der MongoDB gespeichertete Date-Format.
            // Dieses Casting erfolgt offenbar auch beim initialen Laden von Datumswerten aus Strings im selben Format für datumsWert1/2 aus
            // baueigenchaften.js und die Speicherung von Vorgabewerten in back-end-server.js
            //----------------------------------------------------------------------------------------------------------------------
            console.log(
              "Nach Date Conversion für Backend Call - eigenschaft.datumsWert1: ",
              eigenschaft.datumsWert1
            ); // Muss im Browser Log im Format YYYY-MM-DD sein, z.B. 14.10.2020
          } // /else // null belassen
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
        ) {
          console.log(
            "Vor Date Conversion für Backend Call - eigenschaft.datumsWert2: ",
            eigenschaft.datumsWert2
          );
          // String, wegen Konvertierungen schon beim Laden im Format DD.MM.YYYY, z.B. 14.10.2020
          // Zurückkonvertieren in das von Mongoose benötigte Format (Date Object)
          // Wird mangels besserer funktionierender Alternativen (Paket Moments ist z.B. zu heavyweight) hier im Folgenden einfach per String-Split gemacht:
          if (eigenschaft.datumsWert2 != null) {
            // ACHTUNG: Sonst undefined-Fehler im Log bei nicht ausgefülltem datumsWert2 (d.h. null)!
            let splittedDateString = eigenschaft.datumsWert2.split(".");
            // Rekonstruiere JS Date Objekt aus dem gesplitteten String - erfordert per Test noch eine Korrektur -1 beim Monat!!! Format ist YYYY, MM-1, DD
            // Siehe auch https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript
            let dateObject = new Date(
              // ACHTUNG: Date muss laut https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
              // mit Konstruktor (new Date) aufgerufen werden, sonst gibt es kein Date-Objekt, sondern einen String zurück!
              // ACHTUNG: Diese Konvetierung berücksichtigt offfenbar eine für das jeweilige Datum spezifische Lokalzeit - bisher nicht weiter erforscht, ob das Probleme machen kann!!!
              // Beispiel 1: datumsWert1: 23.07.1999
              //             dateObject: Fri Jul 23 1999 00:00:00 GMT+0200 (Mitteleuropäische Sommerzeit)
              // Beispiel 2: datumsWert1: 01.01.2000
              //             dateObject: Sat Jan 01 2000 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)
              splittedDateString[2],
              splittedDateString[1] - 1,
              splittedDateString[0]
            );
            console.log("dateObject: ", dateObject);
            eigenschaft.datumsWert2 = dateObject; // NEU: Fix für #295, Date Object an das Backend schicken
            //----------------------------------------------------------------------------------------------------------------------
            // eigenschaft.datumsWert2 = date.formatDate(dateObject, "YYYY-MM-DD"); // Alternative: Liefert String in diesem Format
            //----------------------------------------------------------------------------------------------------------------------
            // Konvertierung mit Quasar Date Util, wandelt das Date Objekt um in das von Mongoose benötigte Format YYYY-MM-DD um
            // ACHTUNG: Quasar formatDate erfordert als ersten Parameter ein Date-Objekt. Strings werden nur akzeptiert im Format YYYY-MM-DD!!!
            // Das Problem hier ist, dass QDate wegen mask="MM.DD.YYYY" NICHT auf diesem Format arbeitet, sondern auf "MM.DD.YYYY" - dieses Format
            // wird in profilModelZuFilterndeBaueigenschaften per Konvertierung mit date.formatDate() erzeugt in mounted(), reset() und in watch() (= Refresh) auf der Prop selectedNode!!!
            // ACHTUNG: Dies führte temporär zu Mongoose TypeError am Backend beim Speichern!
            // Nach anderem Fix (pruefeWertgleichheit() am Backend macht nun ebenfalls Date-Vergleiche mit new Date())
            // funktioniert dies als Alternative ebenso wie die direkte Speicherung von dateObject! Vermutlich erfolgt
            // am Backend ein automatisches Casting des "YYYY-MM-DD"-Strings in das von Mongoose in der MongoDB gespeichertete Date-Format.
            // Dieses Casting erfolgt offenbar auch beim initialen Laden von Datumswerten aus Strings im selben Format für datumsWert1/2 aus
            // baueigenchaften.js und die Speicherung von Vorgabewerten in back-end-server.js
            //----------------------------------------------------------------------------------------------------------------------
            console.log(
              "Nach Date Conversion für Backend Call - eigenschaft.datumsWert2: ",
              eigenschaft.datumsWert2
            ); // Muss im Browser Log im Format YYYY-MM-DD sein, z.B. 14.10.2020
          } // /else // null belassen
        }
      }
      //-------------------------------------------------------------------------------
      if (this.baum === "Bauvorhabenbaum") {
        // NEU - Wir sind im Bauvorhabenbaum
        const apiRoute =
          process.env.API + "/Baueinheiten/" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
        this.$axios
          .put(apiRoute, {
            idBaueinheit: this.selectedNode._id, // ACHTUNG: Hier idBaueinheit, nicht idBaustoff!!!
            wertbezogeneBaueigenschaftenArray: kopieProfilModelZuFilterndeBaueigenschaften // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
          })
          .then(success => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
            );
            this.$emit("refresh-request-baueigenschafts-profil");
          })
          .catch(error => {
            console.log("error: ", error);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
            );
            this.$emit("refresh-request-baueigenschafts-profil");
          });
      } else {
        // Wir sind im Baustoffbaum
        const apiRoute = process.env.API + "/Baustoffe/" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
        this.$axios
          .put(apiRoute, {
            idBaustoff: this.selectedNode._id, // ACHTUNG: Hier idBaustoff, nicht idBaueinheit!!!
            wertbezogeneBaueigenschaftenArray: kopieProfilModelZuFilterndeBaueigenschaften // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
          })
          .then(success => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
            );
            this.$emit("refresh-request-baueigenschafts-profil"); // TODO XXXXX: In baustoffe.vue ist beim Aufruf der Komponente
            // ein Event Handler für diesen Event anzugeben - in baustoffe.vue gibt es dafür bisher nur die nicht optimierte Methode refreshTreeBaustoffe()
          })
          .catch(error => {
            console.log("error: ", error);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
            );
            this.$emit("refresh-request-baueigenschafts-profil"); // TODO XXXXX: In baustoffe.vue ist beim Aufruf der Komponente
            // ein Event Handler für diesen Event anzugeben - in baustoffe.vue gibt es dafür bisher nur die nicht optimierte Methode refreshTreeBaustoffe()
          });
      }
    },

    kennWert1InputHandler(
      //------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für Testzwecke
      // Aufruf: @input="inputValue => kennWert1InputHandler(inputValue, eigenschaft)"
      inputValue, // Parameter: (Neuer) Input-Wert des Feldes, wird von Quasar gefüllt
      eigenschaft
    ) {
      // Parameter: Muss beim Aufruf mitgegeben werden
      console.log("In kennWert1InputHandler()");
    },

    baueEigenschaftenVererbungsDatenstruktur(
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Hilfsfunktion, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
      // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
      // Dieser Array of Objects wird von der Funktion returned
      rootNode,
      currentNode,
      zuUntersuchendeBaueigenschaften // Enthält die Baueigenschaften im Profil
    ) {
      console.log("In baueEigenschaftenVererbungsDatenstruktur()");
      var datenstrukturVererbung = []; // Enthält für jede der zu untersuchenden Baueigenschaften die erste definierte Eigenschaft auf dem Pfad
      var idCurrentNode = currentNode._id;
      var pathCurrentNode = currentNode.path.split("#");
      for (var aktuellBetrachteteBaueigenschaft of zuUntersuchendeBaueigenschaften) {
        // Suche die definierten Werte der aktuell betrachteten Baueigenschaften im Elternpfad heraus
        // (jeweils die obersten definierten Werte im Pfad)
        var node_i = rootNode; // Knoten im Pfad
        var hierarchyIndex = 0;
        var vererbungsInformation = {
          baueigenschaft:
            aktuellBetrachteteBaueigenschaft.typbezogeneBaueigenschaft
              .baueigenschaftsBezeichnung,
          idTypbezogeneBaueigenschaft:
            aktuellBetrachteteBaueigenschaft.typbezogeneBaueigenschaft._id
        };
        datenstrukturVererbung.push(vererbungsInformation);
        // Suche die Eigenschaft am Knoten im Pfad heraus:
        while (node_i._id !== idCurrentNode) {
          var node_i_baueigenschaft = node_i.baueigenschaften.find(
            arg =>
              arg.typbezogeneBaueigenschaft._id ===
              aktuellBetrachteteBaueigenschaft.typbezogeneBaueigenschaft._id
          );
          /*
          console.log(
            "node_i_baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung: ",
            node_i_baueigenschaft.typbezogeneBaueigenschaft
              .baueigenschaftsBezeichnung
          );
          */
          //-------------------------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Für Epic 38.n (selektive Analage wertbezogener Baueigenschaften nur im Baustoff- oder Bauvorhabenbaum):
          //      Damit kann es vorkommen, dass node_i_baueigenschaft undefined ist, weil das obige find sie bereits nicht im Array der (wertbezogenen) Baueigenschaften
          //      am Wurzelknoten findet. In diesem Fall gibt es einen undefined-Fehler im Log beim Zugriff auf node_i_baueigenschaft.definiertNichtUndefiniert
          //      in dem nachfolgenden if weiter unten.
          // NEU: Deshalb als Fehlervermeidung für diesen Fehler in diesem Fall die Schleife vorzeitig per break verlassen.
          //      Das Profil Model für Profile, die im betreffenden Baum ausschließlich nicht angelegte Baueigenschaften enthalten (z.B. das Baustoffprofil "Baustoff > Estrich" im
          //      Bauvorhabenbaum) ist ein leerer Array. Das generische Profilformular rendert dann zwar fehlerlos, enthält dann aber keine Zeilen mit Eingabefeldern.
          //      Spezifische Profilformulare für Profile im Bauvorhabenbaum, die im "falschen" Baum (d.h. dem Baustoffbaum) aufgerufen werden, enthalten mittlerweile
          //      dieselbe Fehlervermeidung - diese werfen jedoch im Log (wie erwartbar) die Meldung (Beispiel für Profil "Baueinheit > Gebäude")
          //      "❌❌❌❌❌❌ FEHLER: Index für Baueigenschaft Gebäude > Recht > Bauordnung > Bauweise im Array profilModelZuFilterndeBaueigenschaften nicht gefunden!"
          //      und rendern ein leeres Formular. Deren Profil Model ist dementsprechend ein leerer Array.
          //      Das Profil Model im generischen Profilformular von "gemischten" Profilen, die sowohl im betreffenden Baum angelegte als auch nicht angelegte Baueigenschaften enthalten,
          //      enthält per Test nur die angelegten Baueigenschaften. Im generischen Profilformular werden dann auch nur Zeilen/Felder für diese angelegten Baueigenschaften
          //      gerendet. Speichern und Zurücksetzen funktionieren damit fehlerlos per Test.
          // console.log("node_i_baueigenschaft: ", node_i_baueigenschaft);
          if (node_i_baueigenschaft === undefined) break; // NEU - Fehlervermeidung für Epic 38.n
          //-------------------------------------------------------------------------------------------------------------------------------------------------------------
          if (
            vererbungsInformation.werteVererbenderElternKnoten === undefined
          ) {
            // Ist der Fall, wenn die Eigenschaft im Pfad bisher undefiniert ist. In diesem Fall
            // den wertevererbenden Elternknoten in das Objekt vererbungsInformation eintragen:
            if (node_i_baueigenschaft.definiertNichtUndefiniert) {
              console.log(
                "An einem Elternknoten definierte Baueigenschaft: ",
                node_i_baueigenschaft
              );
              vererbungsInformation.werteVererbenderElternKnoten = node_i;
              vererbungsInformation.bezeichnungWerteVererbenderElternknoten = node_i_baueigenschaft;
            }
          }
          node_i = node_i.children.find(
            arg => arg._id === pathCurrentNode[hierarchyIndex + 1]
          );
          hierarchyIndex++;
        }
      }
      //---------------------------------------------------------------------------------------------------------------
      // Der Array datenstrukturVererbung enthält für jede Baueigenschaft im Profil ein Objekt vererbungsInformation.
      // Wenn hier am Ende nichts eingetragen ist im Feld vererbungsInformation.werteVererbenderElternknoten, ist die
      // betreffende Eigenschaft im Elternpfad undefiniert,
      // sonst steht in werteverebenderElternknoten der Elternknoten, an dem die Baueigenschaft erstmalig definiert ist
      console.log("datenstrukturVererbung:", datenstrukturVererbung);
      //---------------------------------------------------------------------------------------------------------------
      // Nun die Baueigenschaften im obigen Array herausfiltern, die im Elternpfad bereits definiert waren, und die
      // Baueinheitsbezeichnungen ausgeben, an denen die Baueigenschaft erstmalig definiert ist:
      //==============================================================================================================
      // ACHTUNG: Dieser Code hier war leider spezifisch für Bauvorhabenbaum (Baueinheiten) vs. Baustoffbaum (Baustoffe)!!!
      //          Der Code war ursprünglich nur für Baueinheiten (verwendete baueinheitsBezeichnung, nicht baustoffBezeichnung)
      // Daher hier 2 Fallunterscheidungen mittels der prop baum eingebaut:
      //==============================================================================================================
      this.myDatenstrukturVererbung = datenstrukturVererbung
        .filter(
          arg => arg.bezeichnungWerteVererbenderElternknoten !== undefined
        )
        .map(arg => {
          return this.baum === "Bauvorhabenbaum"
            ? arg.bezeichnungWerteVererbenderElternknoten
                .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung +
                " in " +
                arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
            : arg.bezeichnungWerteVererbenderElternknoten // Baustoffbaum
                .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung +
                " in " +
                arg.werteVererbenderElternKnoten.baustoffBezeichnung;
        });
      //----------------------------------------------------------------------------------------------------------------
      // Nun obige Information zurückgeben, aber ohne den Filter:
      var result = datenstrukturVererbung.map(arg => {
        return {
          idTypbezogeneBaueigenschaft: arg.idTypbezogeneBaueigenschaft,
          baueigenschaftsBezeichnung: arg.baueigenschaftsBezeichnung,
          bezeichnungWerteVererbenderElternknoten:
            arg.werteVererbenderElternKnoten !== undefined
              ? this.baum === "Bauvorhabenbaum"
                ? arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
                : arg.werteVererbenderElternKnoten.baustoffBezeichnung // Baustoffbaum
              : null
        };
      });
      return result;
    },

    erstelleProfilModel(profil) {
      // Aus Vorlage in filter-generisches-baueigenschafts-profil-formular.vue
      //----------------------------------------------------------------------------------------------------------------------------------------------------
      // Erzeugt erstmalig den Array profilModelZuFilterndeBaueigenschaften, welcher die Filter-Baueigenschaften mit ihren Werten enthält.
      // Die Werte aller Baueigenschaften sind in dieser Variante jedoch leer (leere Filter-Felder), nur die typbezogenen Felder
      // werden aus dem Baueigenschaftsprofil entnommen. Dieses enthält die Details zu allen Baueigenschaften im Profil in Unterfeldern - siehe Log-Ausgaben
      //----------------------------------------------------------------------------------------------------------------------------------------------------
      // DONE - profilModelAusgewaehlerKnoten umbenannt in profilModelZuFilterndeBaueigenschaften
      //        Ist hier ein Profil-Model für die zu filternden Baueigenschaften, nicht für den ausgewaehlten Knoten!!!
      //====================================================================================================================================================
      // ACHTUNG: Der Code hier zum Aufbau des Profil-Models funktioniert NUR, wenn zunächst eine Arbeitskopie des Models aufgebaut wird, und dann
      //          am Schluss dieses dem eigentlichen Profil-Model zugewiesen wird. Wenn der Aufbau direkt auf dem Profil-Model erfolgt,
      //          funktionieren die VModels an den Feldern NICHT (Eingaben in die Felder werden ignoriert)! Oder es treten merkwürdige Inkonsistenzen in den
      //          Objekten auf, z.B. sieht man manchen Varianten stets dieselbe, letzte Baueigenschaft im Profil in den typbezogenen Feldern im Profil-Model
      //====================================================================================================================================================
      // Aus den wertbezogenen und den typbezogenen Feldern das für dieses Profilformular passende profilModelZuFilterndeBaueigenschaften aufbauen
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Zunächst eine leere wertbezogene Baueigenschaft anlegen:
      const leereWertbezogeneBaueigenschaft = {
        // ACHTUNG: Vue kann nicht ohne Weiteres Konstanten deklarieren! Müssten in externe Files ausgelagert werden
        // Siehe https://github.com/vuejs/vue/issues/6004
        // Objekt, mit dem neue Baueigenschaft initialisiert und resetted wird
        // ACHTUNG: Diese Werte müssen die Mongoose Validation bestehen bei Save in die Datenbank!
        // Zu beachtende Regeln für Mongoose Validation: required-Felder müssen vorhanden und gesetzt sein
        // null heisst ein Feld ist vorhanden, aber nicht gesetzt
        // enum-Felder dürfen nur null sein, wenn in enum-Definition null dabei ist!
        // Mongoose Validation Fehler kommen als Error 500 vom Mongoose Call (z.B. save()) zurück
        // Return Parameter error.message enthält dabei die Error Message, ggf. im Controller loggen!
        aktiviertNichtDeaktiviert: true,
        definiertNichtUndefiniert: false, // Unabhängig von ererbtNichtGesetzt
        ererbtNichtGesetzt: false, // Unabhängig von definiertNichtUndefiniert, d.h. auch undefinierte Werte können geerbt sein
        systemdefiniertNichtBenutzerdefiniert: false, // Nur if definiertNichtUndefiniert. ACHTUNG: Deprecated im Rahmen von #514
        systemberechnetNichtSystemgesetzt: false, // Nur if systemdefiniertNichtBenutzerdefiniert, bedeutet: ist computed Property
        vererbtAnKindknoten: false, // Nur if definiertNichtUndefiniert (kann bei Bedarf gesetzt werden) - aktuell nur für Bauvorhabenbaum reserviert, nicht verwenden für Baustoffbaum!!!
        sollwertNichtIstwert: false, // Nur if definiertNichtUndefiniert (kann bei Bedarf gesetzt werden). ACHTUNG: Deprecated im Rahmen von #514
        // Stattdessen Mongoose enum-Syntax gemäß https://mongoosejs.com/docs/validation.html:
        güteBewertung: null, // NEU: null hinzugefügt im Rahmen von #514!!!
        //-------------------------------------------------------------------------------------------------------------------------------
        kennWert1: null, // ACHTUNG: Diese Wertefelder müssen alle null sein, damti die Prüfun in filtereBaustoffe() funktioniert!!!
        kennWert2: null,
        datumsWert1: null,
        datumsWert2: null,
        tagesZeitWert1: null, // NEU
        tagesZeitWert2: null, // NEU
        bezeichnungsWert1: null,
        bezeichnungsWert2: null,
        aufzaehlungsWert: null,
        wahrheitsWert: null,
        //------------------------------------------------------------------------------------------------------------------------------------------------------------------
        operator: "$eq" // NEU - Operator für die Filterbedingung, Default ist "$eq" (für das Backend mit MongoDB), angezeigt wird "=" mit emit-value und map-options
        // NEU: Start Spalte für Operator für Filterbedingung                                                                                                            -->
        // HINWEIS: Das Profil Model für das layoutgesteuerte Filterbaueigenschaftsprofilformular verwendet auch die Property operator für die Filterbedingung           -->
        // Es wird erstmals gesetzt in erstelleProfilModel(). Diese Property wurde verschoben aus typbezogeneBaueigenschaft in die wertbezogenen Properties!             -->
        // TODO XXXXXX: Für einen zweiten Operator bei Wertepaaren muss das Model/Profil Model erweitert werden um ein Feld operator2 bzw. operator1 und operator2       -->
        // ------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
      };
      console.log(
        "profil.zugeordneteBaueigenschaften: ",
        profil.zugeordneteBaueigenschaften
      ); // Zur Kontrolle, steuert die beiden nächsten Schritte
      //---------------------------------------------------------------------------------------------------------------------------------------------------------
      // Nun die wertbezogenen Felder erzeugen mit Hilfe der obigen leeren Baueigenschaft:
      let arbeitsKopieProfilModelZuFilterndeBaueigenschaften = [];
      for (var j = 0; j < profil.zugeordneteBaueigenschaften.length; j++) {
        // Befüllen der wertbezogenen Felder mit leerer Baueigenschaft mit Object.assign()
        // Vorlage: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften[j] = Object.assign(
          // ACHTUNG: Kann Array of Strings für aufzaehlungsWert enthalten!!! Dann wird angeblich nur Referenz kopiert? Funktioniert aber!
          {},
          leereWertbezogeneBaueigenschaft
          // this.profilModelZuFilterndeBaueigenschaften.push(leereWertbezogeneBaueigenschaft) // Alternative mit push(), funktioniert auch, disabled
          // profil.zugeordneteBaueigenschaft[j].typbezogeneBaueigenschaft // ACHTUNG: typbezogeneBaueigenschaft ist selbst ein Objekt!
          // Dies würde dessen Felder flach hinein kopieren- FALSCH! Wird jetzt weiter unten erledigt.
        ); // Kopie der leeren Baueigenschaft
      }
      console.log(
        "Nach erster Schleife - arbeitsKopieProfilModelZuFilterndeBaueigenschaften: ",
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften
      );
      // ACHTUNG: Enthält laut Log auch schon ein Objekt typbezogeneBaueigenschaft, das eigentlich erst unten hinzugefügt wird!!! Wird eventuell bei der
      // Konsolausgabe hinzugefügt?
      //-----------------------------------------------------------------------------------------------------------------------------------------------------
      // Nun auch die typbezogenen Felder befüllen:
      // ACHTUNG: zugeordneteBaueigenschaften enthalten neben dem Unterobjekt typbezogeneBaueigenschaft
      // für die Vorgabewerte einer Eigenschaft AUCH Namensduplikate obiger wertbezogener Felder! Diese dürfen nicht versehentlich mitkopiert werden!
      for (var i = 0; i < profil.zugeordneteBaueigenschaften.length; i++) {
        console.log(
          "profil.zugeordneteBaueigenschaft[" + i + "]: ",
          profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        );
        //--------------------------------------------------------
        // Variante mit Object.assign() - funktioniert!
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften[
          i
        ].typbezogeneBaueigenschaft = Object.assign(
          // ACHTUNG: Kann Array of Strings für selektierbareOptionenAufzaehlungsWert enthalten!!! Dann wird angeblich nur Referenz kopiert? Funktioniert aber!
          {},
          profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        ); // Kopiert die Felder der typbezogene Baueigenschaft in das Unterfeld typbezogeneBaueigenschaft
        //--------------------------------------------------------
        // Alternative mit JSON.parse/stringify - funktioniert auch!
        // Vorlage: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/10916838#10916838
        // arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i].typbezogeneBaueigenschaft = JSON.parse(JSON.stringify(profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft))
        //--------------------------------------------------------
        // Alternative mit einfacher Zuweisung - funktioniert auch!
        // arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i].typbezogeneBaueigenschaft = profil.zugeordneteBaueigenschaften[i].typbezogeneBaueigenschaft
        //--------------------------------------------------------
        // Siehe auch https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array - dort weitere Varianten, z.B. mit spread-Operator
        //--------------------------------------------------------
        /*
        console.log(
          "arbeitsKopieProfilModelZuFilterndeBaueigenschaften[" +
            i +
            "].typbezogeneBaueigenschaft: ",
          arbeitsKopieProfilModelZuFilterndeBaueigenschaften[i]
            .typbezogeneBaueigenschaft
        ); // Diese Konsolausgabe stimmt noch!
        */
      }
      console.log(
        "Nach zweiter Schleife - arbeitsKopieProfilModelZuFilterndeBaueigenschaften: ",
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften
      ); // Zeigt ggf. das fehlerhafte Model!
      //-----------------------------------------------------------------------------------------------------------------------------------
      // Disabled Code aus Vorlage filter-generisches-baueigenschafts-profil-formular.vue
      /*
      // NEU: Hack, um eine bestimmte, der hierarchischen Anordnung im Baustoffbaum entsprechende Sortierreihenfolge der Baueigenschaften
      // im Profil für die Anzeige zu erreichen, nur für Profil "Baustoff > Estrich":
      // Vorlage: https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
      if (profil.baueigenschaftsProfilBezeichnung === "Baustoff > Estrich") {
        console.log("***ACHTUNG*** - Profil 'Baustoff > Estrich': Profil Model wird sortiert!")
        var sortOrderBaueigenschaftenImProfilEstrich = [
            // "Baustoff > Estrich > Bauart", // NEU - #380: BEg gelöscht
            "Baustoff > Estrich > Bindemittelart",
            "Baustoff > Estrich > Biegezugfestigkeitsklasse", // Laut Erik für alle Estrichbindemittelarten außer "CA"
            // Bis hier selbe Reihenfolge wie die korrespondierenden Baueigenschaften im Profilformular "Baueinheit > Schicht"!
            "Baustoff > Estrich > Härteklasse", // Laut Erik nur gültig bei Estrichbindemittelart "CA"
            "Baustoff > Estrich > Einbauart", // ACHTUNG: Geändert, von weiter oben anch unten verschoben
            // Bis hier gibt es korrespondierende Baueigenschaften im Profil "Baueinheit > Schicht" für Schichttyp "Estrich"
            "Baustoff > Estrich > Druckfestigkeitsklasse", // Optional für verfeinerte Suche
            "Baustoff > Estrich > Oberflächenhärteklasse", // Optional für verfeinerte Suche
          ]
        arbeitsKopieProfilModelZuFilterndeBaueigenschaften.sort((a, b) => {
          // console.log("a: ", a)
          // console.log("b: ", b)
          return sortOrderBaueigenschaftenImProfilEstrich.indexOf(a.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung) -
            sortOrderBaueigenschaftenImProfilEstrich.indexOf(b.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung);
        })
        console.log(
          "arbeitsKopieProfilModelZuFilterndeBaueigenschaften nach Sortierung: ",
          arbeitsKopieProfilModelZuFilterndeBaueigenschaften
        );
      } // else { } // Do nothing
      */
      //-----------------------------------------------------------------------------------------------------------------------------------
      // Kopiere nun das aufgebaute Objekt nach profilModelZuFilterndeBaueigenschaften:
      this.profilModelZuFilterndeBaueigenschaften = arbeitsKopieProfilModelZuFilterndeBaueigenschaften.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      //===============================================================================================
      // HINWEIS: Hier könnte man die Baueigenschaften in profilModelZuFilterndeBaueigenschaften auch noch
      //          anders sortieren, z.B. in einer durch ein spezifisches Layout File für jedes Profil
      //          spezifizierten Reihenfolge. Ohne eine solche weitere Sortierung befinden sich
      //          die Baueigenschaften in der Reihenfolge, wie sie vom Backend kamen. Am Backend
      //          (baueinheiten/baustoffe.controller.readBaueinheit/readBaustoff()) werden sie alphabetisch sortiert,
      //          in derselben Reihenfolge (toUpperCase()) wie auch Quasar sortiert.
      //===============================================================================================
    },

    projiziereBaueigenschaftenAnKnotenAufProfil(knoten, profil) {
      //--------------------------------------------------------------------------------------------------------------------------------------------
      // Sucht die Eigenschaften aus dem Profil am Knoten (Baueinheit oder Baustoff) und erzeugt erstmalig den Array profilModelZuFilterndeBaueigenschaften,
      // welcher die Baueigenschaften mit ihren Werten enthält. Später wird dazu noch zusätzliche Vererbungsinformation hinzugefügt.
      var idsTypbezogeneBaueigenschaften = profil.zugeordneteBaueigenschaften.map(
        arg => arg.typbezogeneBaueigenschaft._id
      );
      // Finde die Eigenschaften des Profils in der Knoten (d.h. Änderungen werden am Orginal-Objekt gemacht)
      var projizierteBaueigenschaftenAnKnoten = knoten.baueigenschaften.filter(
        i =>
          idsTypbezogeneBaueigenschaften.findIndex(
            ii => i.typbezogeneBaueigenschaft._id === ii
          ) > -1
      );
      console.log(
        "projizierteBaueigenschaftenAnKnoten: ",
        projizierteBaueigenschaftenAnKnoten
      );
      // Erstelle Arbeitskopien der Elemente im Array
      var kopierteProjizierteBaueigenschaftenAnKnoten = projizierteBaueigenschaftenAnKnoten.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      this.profilModelZuFilterndeBaueigenschaften = kopierteProjizierteBaueigenschaftenAnKnoten;
      //---------------------------------------------------------------------------------------------------
      // Das folgende Hinzufügen der transienten Property bgColor für #38.p (Button für Ermittllung der
      // Definiertheit an Kindknoten) ist überflüssig - das reaktive Vue $set für diese Property in
      // ermittleDefiniertheitKindKnoten() funktioniert auch ohne es!
      /*
      for (let baueigenschaft of this.profilModelZuFilterndeBaueigenschaften) {
        baueigenschaft.bgColor = null; // NEU - #38.o: Füge Feld für Hintergrundfarbe hinzu (transient)
      }
      */
      //---------------------------------------------------------------------------------------------------
      // return kopierteProjizierteBaueigenschaftenAnKnoten;
    },

    readAlleBaueigenschaftsProfile() {
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Liest alle Profile mit allen ihren Daten - TODO: Aus Performance-Gründen eventuell nur Extrakt,
      // (Bezeichnung) holen, und erst bei Auswahl eines Profils das ganze Profil?
      // Wird im Filterformular nicht benötigt, stattdesssen readAlleFilterBaueigenschaftsProfile()
      return this.$axios
        .get(
          process.env.API +
            // "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung=Allgemein%20>%20Test%20>%20Wertetypen"
            "/Baueigenschaftsprofile/"
        )
        .then(doc => {
          this.alleBaueigenschaftsProfile = doc.data;
          this.bezeichnungenBaueigenschaftsProfile = doc.data.map(
            arg => arg.baueigenschaftsProfilBezeichnung
          );
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
          );
        });
    },

    readAlleFilterBaueigenschaftsProfile() {
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Liest alle Filter-Profile mit allen ihren Daten aus der Datenbank nach alleFilterBaueigenschaftsProfile
      // speziell die dem Profil zugeordneten Baueigenschaften, inklusive ihrer populierten typbezogenen Baueigenschaften
      // Zu entscheiden Alle Filter-Profile per Konvention holen ("Baustoff > Filter") oder diese aus dem Layout-File (der Map) "einsammeln"?
      // Entscheidung: Werden aus dem Layout-File nach alleFilterBaueigenschaftsProfileAusLayout "eingesammelt", da diese auch im QSelect benötigt werden
      // Dann wird Query aufgebaut, und die vollen Profile aus dem Backend geholt nach alleFilterBaueigenschaftsProfile!
      // TODO: Aus Performance-Gründen eventuell nur Extrakt,
      // (Bezeichnung) holen, und erst bei Auswahl eines Profils das ganze Profil?
      // Spezifisch für Filterformular!
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Die zu holenden Filterprofile aus dem Layout-File (Map) in einen Array "einsammeln" mit ihren Bezeichnungen und Anzeigetexten,
      // und diese in Mongoose-Query für Backend verpacken:
      // Dazu zunächst die Map mit forEach durchwandern und in Array pushen
      console.log("In readAlleFilterBaueigenschaftsProfile()");
      this.alleFilterBaueigenschaftsProfileAusLayout = []; // ACHTUNG: Array mit allen Filterprofilen aus dem Layout
      // alleFilterBaueigenschaftsProfile (wird weiter unten gesetzt aus der Datenbank): Dieser Array enthält dieselben Profile,
      // allerdings in potentiell anderer Reihenfolge, inklusive ihrer populierten typbezogenen Baueigenschaften
      console.log(
        "layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular: ",
        this
          .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
      );
      for (let propertyName in this
        .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular) {
        let element = this
          .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
          propertyName
        ];
        console.log("element: ", element);
        this.alleFilterBaueigenschaftsProfileAusLayout.push({
          filterProfilBezeichnung: element.filterProfilBezeichnung,
          filterProfilAnzeigeText: element.filterProfilAnzeigeText
        });
      }
      console.log(
        "alleFilterBaueigenschaftsProfileAusLayout: ",
        this.alleFilterBaueigenschaftsProfileAusLayout
      );
      // Nun die Filterprofilbezeichnungen aus diesem Array in Query-String umwandeln (Or-Operator mit ","):
      let queryString = "";
      this.alleFilterBaueigenschaftsProfileAusLayout.forEach(element => {
        queryString =
          queryString +
          "baueigenschaftsProfilBezeichnung=" +
          element.filterProfilBezeichnung +
          ","; // HINWEIS: Blanks müssen nicht durch %20 ersetzt werden, das macht Axios!
      });
      // Letztes "," hinten entfernen in der Query:
      // console.log("typeof queryString: ", typeof queryString)
      queryString = queryString.substring(0, queryString.length - 1); // Vorlage: https://stackoverflow.com/questions/952924/how-do-i-chop-slice-trim-off-last-character-in-string-using-javascript
      console.log("queryString nach Trim: ", queryString);
      return this.$axios
        .get(
          process.env.API +
            // "/Baueigenschaftsprofile/" // Holt alle Profile überhaupt
            // "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung='/^Baustoff%20>%20>Filter/'"
            // Holt alle Profile, die mit "Baustoffe > Filter" beginnen
            // Regex statt startsWith() - siehe https://stackoverflow.com/questions/29809887/mongoose-query-for-starts-with
            "/Baueigenschaftsprofile/Query?" +
            queryString // Query mit oben gebautem Query String
        )
        .then(doc => {
          this.alleFilterBaueigenschaftsProfile = doc.data; // Array!
          // Alternativ: Deep copy, hier nicht benötigt:
          /*
          this.alleFilterBaueigenschaftsProfile = doc.data.map(
            element => Object.assign({}, element) // Erstelle Kopie des Objekts
          );
          */
          this.bezeichnungenBaueigenschaftsProfile = doc.data.map(
            arg => arg.baueigenschaftsProfilBezeichnung
          );
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
          );
        });
    },

    readZugehoerigesProfil() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Liest das durch die Prop profilBezeichnung spezifizierte Profil aus der Datenbank nach ausgewaehltesBaueigenschaftsProfil,
      // speziell die dem Profil zugeordneten Baueigenschaften, inklusive ihrer populierten typbezogenen Baueigenschaften
      console.log("In readZugehoerigesProfil:", this.profilBezeichnung); // profilBezeichnung ist Prop der Vue-Komponente
      return this.$axios
        .get(
          process.env.API +
            // "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung=Allgemein%20>%20Test%20>%20Wertetypen"
            "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung=" +
            this.profilBezeichnung
        )
        .then(doc => {
          var bezeichnungenEigenschaftenImProfil = doc.data[0].zugeordneteBaueigenschaften.map(
            arg => arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
          );
          this.ausgewaehltesBaueigenschaftsProfil = doc.data[0];
          console.log(
            "bezeichnungenEigenschaftenImProfil: ",
            bezeichnungenEigenschaftenImProfil
          );
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER
          );
        });
    },

    pruefeDefiniertheitVonEigenschaft(eigenschaft) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Hier wird die Definiertheit in Abhängigkeit von der Definiertheit der jeweiligen Wertefelder geprüft.
      // Es ist #222 berücksichtigt, dass bei JEDEM Wertetyp auch das/die Felder bezeichnungsWert1/2 gesetzt werden können.
      // ACHTUNG: Wenn eines von diesen gesetzt ist, führt dies zur Definiertheit, selbst wenn das eigentliche Wertefeld leer ist!!!
      //
      // Parameter:
      // - eigenschaft: Wertbezogene Baueigenschaft mit typbezogenen Feldern (verschachtelt)
      // - Returned Prüfungsergebnis als Boolean
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In pruefeDefiniertheitVonEigenschaft(eigenschaft)");
      /*
      if (
        eigenschaft.baueigenschaftsBezeichnung ===
        "Baueinheit > Standort > Geografie > Grundstück > Flur"
      ) {
        // console.log("XXXXXXXXXXXXXXXXX");
        console.log(
          "eigenschaft.baueigenschaftsBezeichnung: ",
          eigenschaft.baueigenschaftsBezeichnung
        );
        console.log(
          "eigenschaft.kennWert1: ",
          eigenschaft.typbezogeneBaueigenschaft.kennWert1
        );
      }
      */
      switch (eigenschaft.typbezogeneBaueigenschaft.werteTyp) {
        case "Kennwert":
          if (
            (eigenschaft.kennWert1 === "" || eigenschaft.kennWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null)
          ) {
            return false;
          } else return true;
        case "Bezeichnungswert":
          if (
            eigenschaft.bezeichnungsWert1 === "" ||
            eigenschaft.bezeichnungsWert1 == null
          ) {
            return false;
          } else return true;
        case "Datumswert":
          if (
            (eigenschaft.datumsWert1 === "" ||
              eigenschaft.datumsWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null)
          ) {
            return false;
          } else return true;
        case "Tageszeitwert":
          if (
            (eigenschaft.tagesZeitWert1 === "" ||
              eigenschaft.tagesZeitWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null)
          ) {
            return false;
          } else return true;
        case "Kennwertepaar":
          if (
            (eigenschaft.kennWert1 === "" || eigenschaft.kennWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null) &&
            (eigenschaft.kennWert2 === "" || eigenschaft.kennWert2 == null) &&
            (eigenschaft.bezeichnungsWert2 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert2 === null)
          ) {
            return false;
          } else return true;
        case "Bezeichnungswertepaar":
          if (
            (eigenschaft.bezeichnungsWert1 === "" ||
              eigenschaft.bezeichnungsWert1 == null) &&
            (eigenschaft.bezeichnungsWert2 === "" ||
              eigenschaft.bezeichnungsWert2 == null)
          ) {
            return false;
          } else return true;
        case "Datumswertepaar":
          if (
            (eigenschaft.datumsWert1 === "" ||
              eigenschaft.datumsWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null) &&
            (eigenschaft.datumsWert2 === "" ||
              eigenschaft.datumsWert2 == null) &&
            (eigenschaft.bezeichnungsWert2 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert2 === null)
          ) {
            return false;
          } else return true;
        case "Tageszeitwertepaar":
          if (
            (eigenschaft.tagesZeitWert1 === "" ||
              eigenschaft.tagesZeitWert1 == null) &&
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null) &&
            (eigenschaft.tagesZeitWert2 === "" ||
              eigenschaft.tagesZeitWert2 == null) &&
            (eigenschaft.bezeichnungsWert2 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert2 === null)
          ) {
            return false;
          } else return true;
        case "Aufzählungswert":
          if (
          ((eigenschaft.aufzaehlungsWert === null ||
          (Array.isArray(eigenschaft.aufzaehlungsWert) &&
            eigenschaft.aufzaehlungsWert.length === 0))) && // NEU: #399, leere Arrays ([]) wie null behandeln, Klammerung um (Array.isArry() && ...) ist wichtig!
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null)
        ) {
            return false;
          } else return true;
        case "Wahrheitswert":
          if (
            eigenschaft.wahrheitsWert == null && // Hier nur Prüfung mit ==, für indeterminate?
            (eigenschaft.bezeichnungsWert1 === "" || // NEU: #222
              eigenschaft.bezeichnungsWert1 === null)
          ) {
            return false;
          } else return true;
        default:
          return false;
      }
    },

    projiziereAufKennwert() {
      //--------------------------------------------------------------------------------------------------------------------------------------
    },

    innerJoin(arr1, arr2, keyArr1, keyArr2) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Joined die Arrays arr1, arr2. Dabei ist KeyArr1 und KeyArr2 ein String mit dem Pfad zur Eigenschaft für den Join
      // Beispiel keyArr1 = ['a', 'bla'] ist der Pfad zu: {a: {bla: 5}}
      var result = [];
      for (var i of arr1) {
        for (var ii of arr2) {
          var item2CompareFromArr1 = i;
          for (var s of keyArr1) {
            // console.log(s);
            item2CompareFromArr1 = item2CompareFromArr1[s];
          }
          // console.log("item2CompareFromArr1: ", item2CompareFromArr1);
          if (item2CompareFromArr1 === ii[keyArr2]) {
            result.push({
              ...i,
              ...ii
            });
          }
        }
      }
      return result;
    }

    /*
    resetWerteAnKnoten(
      // TODO XXXXXX: Stammt aus Vorlage layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue, wird für Filterformular nicht benötigt! Daher disabled!
      // Stattdessen gibt es eine Methode resetEingabefelder()
      tab // Parameter: aktuelles Tab im Formular - wird noch nicht verwendet!
    ) {
      // ALT: Hieß handleReset()
      // Resetted die eventuell im Form geänderten Werte im Profil auf die ursprünglichen Werte aus dem selektierten Node (Prop)
      // NEU: Auch hier Disabling/Enabling notwendig, weil die steuernden Werte dafür im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //      ebenfalls angepasst werden müssen!
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In resetWerteAnKnoten() - Parameter tab: ", tab);
      // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelZuFilterndeBaueigenschaften,
      // welcher die Baueigenschaften mit ihren Werten enthält:
      this.projiziereBaueigenschaftenAnKnotenAufProfil(
        this.selectedNodeArbeitskopie,
        this.ausgewaehltesBaueigenschaftsProfil
      );
      //================================================================================================================================
      // NEU - provisorisch! Bauen der Vererbungsdatenstruktur beie readonly-Version skippen:
      if (!this.readonlyAusZugeordneteBaustoffeBaueinheit) {
        // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
        // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
        // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelZuFilterndeBaueigenschaften
        this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
          this.nodes[0],
          this.selectedNodeArbeitskopie,
          this.ausgewaehltesBaueigenschaftsProfil.zugeordneteBaueigenschaften
        );
        console.log("Vor Join");
        // Nun im Array profilModelZuFilterndeBaueigenschaften ein zusätzliches Feld bezeichnungWerteVererbenderElternknoten
        // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
        // Dazu für jede Baueigenschaft in profilModelZuFilterndeBaueigenschaften im Feld bezeichnungWerteVererbenderElternknoten
        // die Bezeichnung des Elternknotens anhängen, an dem die Eigenschaft erstmals
        // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
        // bezeichnungWerteVererbenderElternknoten stattdessen null
        // Dieses Feld wird in den :disable-Funktionen abgefragt, um zu verhindern, dass eine im
        // Elternpfad weiter oben definierte Baueigenschaft verändert wird - dies wäre ein Verstoß gegen die Vererbungsregel!
        var joinResult = this.innerJoin(
          this.profilModelZuFilterndeBaueigenschaften,
          this.eigenschaftenAusEltern,
          ["typbezogeneBaueigenschaft", "_id"], // Spezifiziert die zu joinende Baueigenschaft im ersten Array
          "idTypbezogeneBaueigenschaft" // Spezifiziert die zu joinende Baueigenschaft im zweiten Array
          // Joined die beiden Arrays:
          // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
          // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
          // Diese werden gejoined zu einem gemeinsamen Array
        );
        this.profilModelZuFilterndeBaueigenschaften = joinResult;
      }
      console.log(
        "Nach (falls readonlyAusZugeordneteBaustoffeBaueinheit geskipptem) Join - profilModelZuFilterndeBaueigenschaften:",
        this.profilModelZuFilterndeBaueigenschaften
      );
      //================================================================================================================================
      // this.baueIndexMapFuerProfilModelZuFilterndeBaueigenschaften(); // Aktuell nicht verwendet, siehe Kommentare oben
      //-----------------------------------------------------------------------------------------------------------------------------
      // Folgender Code wandelt alle Datumswerte im Array profilModelZuFilterndeBaueigenschaften in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
      for (
        var i = 0;
        i < this.profilModelZuFilterndeBaueigenschaften.length;
        i++
      ) {
        let eigenschaft = this.profilModelZuFilterndeBaueigenschaften[i];
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
        ) {
          if (eigenschaft.datumsWert1 != null) {
            // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
            this.profilModelZuFilterndeBaueigenschaften[
              i
            ].datumsWert1 = date.formatDate(
              eigenschaft.datumsWert1,
              "DD.MM.YYYY"
            );
          }
          console.log(
            "profilModelZuFilterndeBaueigenschaften[i].datumsWert1: ",
            this.profilModelZuFilterndeBaueigenschaften[i].datumsWert1
          );
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
        ) {
          if (eigenschaft.datumsWert1 != null) {
            // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
            this.profilModelZuFilterndeBaueigenschaften[
              i
            ].datumsWert2 = date.formatDate(
              eigenschaft.datumsWert2,
              "DD.MM.YYYY"
            );
          }
          console.log(
            "profilModelZuFilterndeBaueigenschaften[i].datumsWert2: ",
            this.profilModelZuFilterndeBaueigenschaften[i].datumsWert2
          );
        }
        //-----------------------------------------------------------------------------------------------------
        // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
        // profilModelZuFilterndeBaueigenschaften in Strings um, für Verwendung von
        // Quasar QTime Picker, welcher String-Format erfordert
        // ACHTUNG: Ist überflüssig, d.h. nur bei QDate notwendig, nicht bei QTime, da die Felder tagesZeitWert1/2 in Mongoose bereis Strings sind!!!
        // Deshalb ist bei QTime weder eine Vorwärts- noch eine Rückwärtskonvertierung notwendig
        // Daher auskommentiert:
        */
    /*
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Tageszeitwert" ||
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Tageszeitwertepaar"
        ) {
          this.profilModelZuFilterndeBaueigenschaften[
            i
          ].datumsWert1 = date.formatDate(
            eigenschaft.tagesZeitWert1,
            "HH:mm"
          );
          console.log(
            "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1: ",
            this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1
          );
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
          "Tageszeitwertepaar"
        ) {
          this.profilModelZuFilterndeBaueigenschaften[
            i
          ].datumsWert2 = date.formatDate(
            eigenschaft.tageszeitsWert2,
            "HH:mm"
          );
          console.log(
            "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2: ",
            this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2
          );
        }
        */
    /*
        //========================================================================================================================================
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        //----------------------------------------------------------------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          for (let tab of this
            .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
            for (let rubrik of tab.rubrikenInTab) {
              for (let myEigenschaft of rubrik.baueigenschaftenInRubrik) {
                if (
                  myEigenschaft.baueigenschaftsBezeichnung ===
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung
                ) {
                  if (myEigenschaft.radio) {
                    if (eigenschaft.aufzaehlungsWert != null) {
                      // Ist Array! Kann allerdings auch leerer Array [] oder [null] sein!
                      if (eigenschaft.aufzaehlungsWert.length > 0) {
                        eigenschaft.aufzaehlungsWert =
                          eigenschaft.aufzaehlungsWert[0];
                      } else {
                        eigenschaft.aufzaehlungsWert = null;
                      }
                    }
                  } else {
                    // Checkbox oder Toggles, benötigen Array, vertragen aber initial keinen Wert null!
                    if (eigenschaft.aufzaehlungsWert == null) {
                      eigenschaft.aufzaehlungsWert = []; // Setze leeren Array statt null - sonst Fehler in Checkboxen,
                      // Fehlermeldung "QOptionGroup.js: model should be array in your case" im Browser Log
                    }
                  }
                }
              }
            }
          }
        }
      }
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für layoutgesteuertes generisches Profilformular entfernt!
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      //===============================================================================================================================================
      // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
      // this.initializeIstWerteMitSollWerten(); // TODO XXXXXX - hier vorläufig disabled
      //===============================================================================================================================================
      this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen
    } // /resetWerteAnKnoten()
    */
  },

  //***====================================================================================================================================== */
  computed: {
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktionen
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    ausgewaehlterFilter() {
      // computed-Funktion zum "kürzeren" Zugriff auf das ausgewählte Unterobjekt im Layout:
      return this
        .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
        this.ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
      ];
    },

    mindestensEineFilterBedingungIstAusgefuellt() {
      // computed-Funktion, um zu bestimmen, ob mindestens eine Filterbedingung in den Eingabefeldern nicht null ist
      console.log("In mindestensEineFilterBedingungIstAusgefuellt (computed)");
      /*
      console.log(
        "profilModelZuFilterndeBaueigenschaften: ",
        this.profilModelZuFilterndeBaueigenschaften
      );
      */
      if (!this.profilModelZuFilterndeBaueigenschaften) return true; // Sonst Warning im Log beim ersten Aufruf "TypeError: Cannot read properties of null (reading 'some')"
      return this.profilModelZuFilterndeBaueigenschaften.some(
        e =>
          e.kennWert1 != null ||
          e.kennWert2 != null ||
          (e.bezeichnungsWert1 != null && e.bezeichnungsWert1 !== "") ||
          (e.bezeichnungsWert2 != null && e.bezeichnungsWert2 !== "") ||
          (e.datumsWert1 != null && e.datumsWert1 !== "") ||
          (e.datumsWert2 != null && e.datumsWert2 !== "") ||
          (e.tagesZeitWert1 != null && e.tagesZeitWert1 !== "") ||
          (e.tagesZeitWert2 != null && e.tagesZeitWert2 !== "") ||
          (!Array.isArray(e.aufzaehlungsWert) && e.aufzaehlungsWert != null) ||
          (Array.isArray(e.aufzaehlungsWert) && // Nur relevant bei aus regulären Profil Models hierher in das Filter Model
            // übertragenen Aufzählungswerten, oder bei selection "multiple" (hier Default "single")
            e.aufzaehlungsWert.length > 0) ||
          e.wahrheitsWert != null
      );
    },
    myTestComputedProperty() {
      // Für ersten Test von computed Properties am Layout File
      // Test-computed-Property, welche die aus dem JS-Module kommende this.testComputedProperty wrapped
      // HINWEIS: Man macht sich hier zunutze, dass computed Properties durchaus Methoden aufrufen dürfen!
      // PROBLEM: Weil computed Properties keine Parameter haben können, kann hier nicht die Baueigenschaft mitgegeben werden,
      //          mit welcher dann eine individuelle computed Property ausgewählt werden könnte.
      //          Es kann hier nur unspezifisch EINE bestimmte statisch vorbestimmte computed Property aus dem JS-Modul für die
      //          computed Properties des Profils verknüpft werden, was es unmöglich macht, individuelle Dinge für jedes Feld
      //          zu computen. Daher :value="methodenAufruf(baueigenschaft)" statt :value="computedProperty"!
      if (this.testComputedProperty != null) {
        // ACHTUNG: Diese undefined-Prüfung ist notwendig, um Fehler zu vermeiden, die sonst passieren, wenn mounted noch nicht durchlaufen ist!!!
        return this.testComputedProperty();
      } else {
        return null;
      }
    }
  }, // /computed

  //***=====================================================================================================================================
  watch: {
    ausgewaehltesBaueigenschaftsProfil: {
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Watch auf Prop ausgewaehltesBaueigenschaftsProfil
      // immdediate: false, // TODO XXXXXX - hier nicht notwendig???
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      //                    Anpassungen vorgenommen, damit derselbe Code wie in mounted() abläuft!
      handler: function() {
        console.log(
          "In watch von baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue : Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt"
        );
        // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erstelle daraus den Array profilModelZuFilterndeBaueigenschaften,
        // welcher die Baueigenschaften mit ihren Werten enthält:
        this.erstelleProfilModel(
          this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
        );
        // NICHT in dieser Variante der Komponente (da nicht benötigt für read only Felder): Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
        // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
        console.log(
          "profilModelZuFilterndeBaueigenschaften:",
          this.profilModelZuFilterndeBaueigenschaften
        );
        // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
        //-----------------------------------------------------------------------------------------------------------------------------
        // NEU: Initialisiere das Map-artige Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
        // das im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

        // Initialisiere zunächst alle Felder baueigenschaftInFilter.indexInProfilModelZuFilterndeBaueigenschaften im Map-artigen JS-Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
        // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
        /*
        console.log(
          "layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular: ",
          this
            .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
        );
        */
        console.log(
          "ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung: ",
          this.ausgewaehltesBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung
        );

        let filter = this
          .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
          this.ausgewaehltesBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung
        ]; // ACHTUNG: Bei echter JS-Map, hier .get notwendig!
        for (let baueigenschaftInFilter of filter.baueigenschaftenInFilter) {
          /*
            if (Object.keys(baueigenschaftInFilter).length === 0 && baueigenschaftInFilter.constructor === Object
            // Test auf leeres Objekt, siehe https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object:
            ) {
            console.log("Achtung: Filter ohne Baueigenschaften!");
            } else {
            */
          if (
            baueigenschaftInFilter.baueigenschaftsBezeichnung !== undefined // Notwendig, sonst hier Fehler bei Filteren ohne Baueigenschaften!!!
          ) {
            console.log(
              "In for in Reihenfolge der Baueigenschaften in layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInFilter: ",
              baueigenschaftInFilter.baueigenschaftsBezeichnung
            );
            baueigenschaftInFilter.indexInProfilModelZuFilterndeBaueigenschaften = this.findeIndexVonBaueigenschaft(
              baueigenschaftInFilter.baueigenschaftsBezeichnung
            );
          }
        }
        //-----------------------------------------------------------------------------------------------------------------------------
        // Folgender Code wandelt alle Datumswerte im Array profilModelZuFilterndeBaueigenschaften in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
        for (
          var i = 0;
          i < this.profilModelZuFilterndeBaueigenschaften.length;
          i++
        ) {
          let eigenschaft = this.profilModelZuFilterndeBaueigenschaften[i];
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.datumsWert1,
                "DD.MM.YYYY"
              );
              console.log(
                "profilModelZuFilterndeBaueigenschaften[i].datumsWert1: ",
                this.profilModelZuFilterndeBaueigenschaften[i].datumsWert1
              );
            }
          }
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert2 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.datumsWert2,
                "DD.MM.YYYY"
              );
              console.log(
                "profilModelZuFilterndeBaueigenschaften[i].datumsWert2: ",
                this.profilModelZuFilterndeBaueigenschaften[i].datumsWert2
              );
            }
          }
          //-----------------------------------------------------------------------------------------------------
          // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
          // profilModelZuFilterndeBaueigenschaften in Strings um, für Verwendung von
          // Quasar QTime Picker, welcher String-Format erfordert
          // ACHTUNG: Ist überflüssig, d.h. nur bei QDate notwendig, nicht bei QTime, da die Felder tagesZeitWert1/2 in Mongoose bereis Strings sind!!!
          // Deshalb ist bei QTime weder eine Vorwärts- noch eine Rückwärtskonvertierung notwendig
          // Daher auskommentiert:
          /*
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Tageszeitwert" ||
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Tageszeitwertepaar"
          ) {
            this.profilModelZuFilterndeBaueigenschaften[
              i
            ].datumsWert1 = date.formatDate(
              eigenschaft.tagesZeitWert1,
              "HH:mm"
            );
            console.log(
              "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1: ",
              this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1
            );
          }
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Tageszeitwertepaar"
          ) {
            this.profilModelZuFilterndeBaueigenschaften[
              i
            ].datumsWert2 = date.formatDate(
              eigenschaft.tageszeitsWert2,
              "HH:mm"
            );
            console.log(
              "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2: ",
              this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2
            );
          }
          */
        }
      }
    },

    selectedNodeTreeBaueinheiten: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNodeTreeBaueinheiten"
      // Bisher NoOp
      // Dieser Watch darf nicht auf dem Profil-Model profilModelZuFilterndeBaueigenschaften arbeiten, sondern auf profilModelAusgewaehlterKnoten,
      // welches aber bisher noch gar nicht initial aufgebaut wird (müsste auch in mounted() erst aufgebaut werden).
      // Dieses wird aber hier gar nicht benötigt, denn es kann auf Baueigenschaften in selectedNode bei Bedarf auch direkt zugegriffen werden.
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue : Änderung der Prop selectedNodeTreeBaueinheiten erkannt"
        );
        console.log(
          "Neuer Wert von selectedNodeTreeBaueinheiten - value: ",
          value
        );
        console.log(
          "In dieser Komponente ist hier in diesem Fall nichts weiter zu tun!"
        );
      }
    },

    selectedKeyTreeBaustoffe: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedKeyTreeBaustoffe"
      // Bisher NoOp
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue: Änderung der Prop selectedKeyTreeBaustoffe erkannt"
        );
        console.log("Neuer Wert von selectedKeyTreeBaustoffe - value: ", value);
        console.log(
          "In dieser Komponente ist hier in diesem Fall nichts weiter zu tun!"
        );
      }
    },

    selectedNodeTreeBaustoffe: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNodeTreeBaustoffe"
      // Bisher NoOp
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      // Status 27.02.2022: Code hierher übernommen aus filter-generisches-baueigenschafts-profil-formular.vue
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNodeTreeBaustoffe erkannt"
        );
        console.log(
          "Neuer Wert von selectedNodeTreeBaustoffe - value: ",
          value
        );
        console.log(
          "In dieser Komponente ist hier in diesem Fall nichts weiter zu tun!"
        );
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue"
    );
    //-------------------------------------------------------------------------------------------------------------------------------------
    // Pseudocode (aus Epic 38.p):
    // - Wie in filter-generisches-baueigenschafts-profil-formular.vue ein eigenes, normalerweise nicht abzuspeicherndes Profil Model aufbauen
    //   - profilModelZuFilterndeBaueigenschaften
    // - Eine Auswahl per QSelect, welches Filterformular aus der Map der Filterformulare es anzeigen soll, wäre sinnvoll (zumindest solange nicht eine per Prop
    //   gesteuerte Auswahl passiert, welche abhängig sein sollte vom links im Baustoffbaum für die zugeordneten Baustoffe ausgewählten Baustoff, bzw. genauer gesagt
    //   dessen "relevantestes" Profil)
    // - Es sollten zuerst wie in filter-generisches-baueigenschafts-profil-formular.mounted() die benötigten Profile gelesen werden - hier sind es die in
    //   layout-baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil.js enthaltenen Filterprofile statt aller Profile - insofern ist die dortige Methode readAlleProfile()
    //   anzupassen auf die Filterprofile - diese können dann in einem QSelect angezeigt werden, womit dann auch ein anderes Filterprofil ausgewählt werden kann
    // - Das im QSelect ausgewählte bzw. per Prop profilBezeichnung mitgegebene Profil muss dann in das Profil Model geladen werden wie in layout-gesteuertes-generisches-baueigenschafts-profil.formular.mounted()
    //   - Dort wird zuerst das Profil, d.h. dessen Baueigenschaften aus dem Backend geladen (optional mit Vorgabewerten - siehe oben)
    //   - Dort werden auch die Indizes im Layout gesetzt
    //   - Es wird das gemeinsame Layout zu laden sein statt eines individuellen Layouts
    //   - Dafür muss im Map-artigen JS-Objekt im Layout das durch das Filterprofil als Key zu identifizierende Objekt in dessen Array baueigenschaftenInFilter die Indizes indexInProfilModelZuFilterendeBaueigenschaften bestückt werden
    // - Falls dieses nicht benutzerspezifisch abspeicherbar sein soll (Ausbaustufe, Speicherung in Benutzer-Model), benötigt es zunächst keine submit-Methode zum Speichern (nur eine für
    //   das Filtern) und damit auch keine Reeset-Methode
    // - TODO XXXXXX: Es könnte dabei optional Vorgabewerte aus dem Profil in die Filter-Felder eingetragen werden
    //----------------------------------------------------------------------------------------------------------------------------------------
    // Es folgt stillgelegter Code aus Vorlage layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue:
    //-----------------------------------------------------------------------------------------------------------
    /*
    // NEU: Mittels der Prop profilBezeichung das Layout File in die Map
    // layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular laden.
    // Wahrscheinlich müssen dafür statisch alle vorhandenen bzw. anzuzeigenden Layout Files importiert werden, und bei Änderung
    // der Prop muss das jeweils richtige davon in den Array geladen werden.
    // Vorläufig wurde hierzu weiter oben nur das Profil "Baustoff > Estrich" importiert, mittlerweile fast alle Profile.
    //
    switch (this.profilBezeichnung) {
      case "Baustoff":
        console.log("In case für Profil 'Baustoff'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaustoffBaueigenschaftsProfilFormular;
        // ACHTUNG/TODO XXXXXX: Das Profil "Baustoff" musste erst in back-end-server.js angelegt werden zu Testzwecken - es hat aktuell noch keine BEgs zugeordnet! -->
        break;
      //---------------------------------------------------------------------------------------------------------------------------------
      case "Baustoff > Estrich":
        console.log("In case für Profil 'Baustoff > Estrich'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaustoffEstrichBaueigenschaftsProfilFormular;
        // NEU: Für Test von Functions (computed Properties und Methods) aus JS-Modul:
        console.log(
          "functionsBaustoffEstrichBaueigenschaftsProfilFormular: ",
          this.functionsBaustoffEstrichBaueigenschaftsProfilFormular
        );
        this.testComputedProperty = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testComputedProperty; // Statisch vordefinierte computed Property zu Testzwecken aus dem JS-Modul
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHTUNG: Hier unbedingt nicht testComputedProperty(), sondern testComputedProperty!!!
        // Andernfalls wird die computed-Funktion nicht übergeben, sondern direkt ausgeführt!!!utBaustoffEstrichBaueigenschaftsProfilFormular(this).testComputedProperty
        this.testSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSetMethod;
        // HINWEIS: Hier wird dem Module für Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSetMethod(), sondern testSetMethod
        this.testGeneralSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralSetMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralSetMethod(), sondern testGeneralSetMethod
        this.testSpecificSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSpecificSetMethod;
        // HINWEIS: Hier wird dem Module für Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSetMethod(), sondern testSetMethod
        this.sollIstWertePaarSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).sollIstWertePaarSetMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificSetMethod(), sondern testSpecificSetMethod
        this.testSpecificReadonlyMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSpecificReadonlyMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificReadonlyMethod(), sondern testSpecificReadonlyMethod
        this.testGeneralReadonlyMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralReadonlyMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralReadonlyMethod(), sondern testGeneralReadonlyMethod
        this.testGeneralInitializeMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralInitializeMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralInitializeMethod(), sondern testGeneralInitializeMethod
        break;
      //-------------------------------------------------------------------------------------------------------------------------------------------
      case "Allgemein > Test > Wertetypen":
        console.log("In case für Profil 'Allgemein > Test > Wertetypen'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Bauvorhaben":
        console.log("In case für Profil 'Baueinheit > Bauvorhaben'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Standort":
        console.log("In case für Profil 'Baueinheit > Standort'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitStandortBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Gebäude":
        console.log("In case für Profil 'Baueinheit > Gebäude'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Geschoss":
        console.log("In case für Profil 'Baueinheit > Geschoss'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Raum":
        console.log("In case für Profil 'Baueinheit > Raum'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitRaumBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Boden":
        console.log("In case für Profil 'Baueinheit > Boden'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitBodenBaueigenschaftsProfilFormular;
        // NEU: Spezifische Funktion für dieses Layout
        // Wird aktuell nicht mehr benutzt, daher disabled
        //==============================================================================================================================
        // HINWEISE:
        // Stattdessen wird die generalisierte Methode generalClickMethod() hier in dieser vue-Komponente benutzt!
        // Bei Bedarf können spezifische Methoden für ein Profil/Layout aber so wie sollIstWertePaarSetMethod() hier deklariert und
        // aus dem Layout aufgerufen werden, als @click-Methoden an Buttons, oder als :value="method()" - dies macht aber nur für
        // readonly-Felder Sinn. Die Initialisierung von Feldern mit Default-Werten erfolgt generalisiert in der Methode
        // initializeIstWerteMitSollWerten(), angesteuert über Prop initializeMitSollWert im Layout auf den betroffenen Feldern
        //==============================================================================================================================
        // this.sollIstWertePaarSetMethod = this.functionsBaueinheitBodenBaueigenschaftsProfilFormular(
        //  this
        // ).sollIstWertePaarSetMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificSetMethod(), sondern testSpecificSetMethod
        break;
      case "Baueinheit > Bodenaufbau":
        console.log("In case für Profil 'Baueinheit > Bodenaufbau'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Schicht":
        console.log("In case für Profil 'Baueinheit > Schicht'");
        this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = this.layoutBaueinheitSchichtBaueigenschaftsProfilFormular;
        console.log(
          "FEHLER: Profil 'Baueinheit > Schicht' wird aktuell im layoutgesteuerten generischen Profilformular nicht unterstützt!"
        );
        // ACHTUNG: Das Layout für "Baueinheit > Schicht" ist spezifisch, es hat keine Unter-Tabs und kann daher aktuell noch nicht angezeigt werden!
        break;
      default:
        console.log(
          "FEHLER: Nicht unterstützte Profilbezeichnung im layoutgesteuerten generischen Profilformular: ",
          this.profilBezeichnung
        );
        break;
    }
    //--------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Im Template oben 2 v-fors eingebaut:
    // a) Für q-tabs, iterieren auf layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular.ueberschriftTab
    // b) Für q-tab-panels, iterieren auf layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular.ueberschriftTab
    // Das v-model für beide ist tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, das hier in mounted() initialisiert wird:
    this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[0].ueberschriftTab; // TODO XXXXXX - vorläufig auf erstes Tab initialisiert
    console.log(
      "tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: ",
      this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
    );
    */
    //===================================================================================================================================================================================
    // Optional: Aus der "JS-Pseudo-Map" für das Layout eine echte JS-Map konstruieren: https://stackoverflow.com/questions/36644438/how-to-convert-a-plain-object-into-an-es6-map
    // this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular = new Map(Object.entries(this.layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular))
    // Disabled, nachdem sich herausstellte, dassd ie "JS-Pseudo-Map" auch funktioniert.
    // ACHTUNG: Falls man doch die "echte" Map nimmt, muss man im Code teilweise per .get (map.get["key"] darauf zugreifen, statt mit Key (map["key"])
    //--------------------------------------------------------------------------------------------------------------------------------------
    // this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl des Profils im generischen Formular - wird hier nicht benötigt
    // Ab hier folgt neuer Code für baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue
    this.readAlleFilterBaueigenschaftsProfile() // Alle im gemeinsamen Filter-Layout enthaltenen Profile lesen für QSelect-Auswahl und Initialisierung Profil Model
      .then(async () => {
        console.log("Erfolg aus readAlleFilterBaueigenschaftsProfile()");
        console.log(
          "alleFilterBaueigenschaftsProfile: ",
          this.alleFilterBaueigenschaftsProfile
        );
        // Die Filterprofile stehen nun in alleFilterBaueigenschaftsProfile, mit ihren Bezeichnungen und zugeordneten Baueigenschaften
        // Dieselben Profile für das QSelect stehen in alleFilterBaueigenschaftsProfileAusLayout - Aufbau: Siehe data()
        // 1. TODO XXXXXX: Da per Prop übergebene Filterprofil im QSelect auswählen
        // 2. Es steht schon im Array alleFilterBaueigenschaftsProfile inklusive populierter typbezogener Baueigenschaften
        //    Es muss also nicht mehr nochmals readZugehoerigesProfil() einzeln gelesen werden, sondern nur noch noch ggf. das richtige Profil
        //    aus alleFilterBaueigenschaftsProfile[] mit dem Index des per Prop übergebenen Filterprofils nach
        //    ausgewaehltesBaueigenschaftsProfil kopiert werden (alternativ könnte man auch direkt stets
        //    auf alleFilterBaueigenschaftsProfile[] mit dem Index des per Prop übergebenen Filterprofils arbeiten)
        // this.readZugehoerigesProfil()
        //  .then(async () => {
        //    console.log("Erfolg aus readZugehoerigesProfil()");
        // Statt readZugehoerigesProfil() also:
        // console.log("typeof alleFilterBaueigenschaftsProfile: ", typeof this.alleFilterBaueigenschaftsProfile)
        // console.log("typeof []:", typeof []) // ACHTUNG: typeof für Arrays ist "object" - Array-Prüfung geht mit Array.isArray()!!!
        console.log(
          "Array.isArray(alleFilterBaueigenschaftsProfile): ",
          Array.isArray(this.alleFilterBaueigenschaftsProfile)
        );
        this.ausgewaehltesBaueigenschaftsProfil = this.alleFilterBaueigenschaftsProfile.find(
          element =>
            element.baueigenschaftsProfilBezeichnung === this.profilBezeichnung
        );
        console.log(
          "ausgewaehltesBaueigenschaftsProfil: ",
          this.ausgewaehltesBaueigenschaftsProfil
        );
        // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erstelle daraus den Array profilModelZuFilterndeBaueigenschaften,
        // welcher die Baueigenschaften mit ihren Werten enthält:
        this.erstelleProfilModel(
          this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
        );
        // NICHT in dieser Variante der Komponente (da nicht benötigt für Filter-Felder): Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
        // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
        console.log(
          "profilModelZuFilterndeBaueigenschaften:",
          this.profilModelZuFilterndeBaueigenschaften
        );
        //================================================================================================================================
        // this.baueIndexMapFuerProfilModelZuFilterndeBaueigenschaften(); // Aktuell nicht verwendet, siehe Kommentare oben
        //-----------------------------------------------------------------------------------------------------------------------------
        // NEU: Initialisiere das Map-artige Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
        // das im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

        // Initialisiere zunächst alle Felder baueigenschaftInFilter.indexInProfilModelZuFilterndeBaueigenschaften im Map-artigen JS-Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
        // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:

        console.log(
          "layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular: ",
          this
            .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
        );
        console.log(
          "ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung: ",
          this.ausgewaehltesBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung
        );

        let filter = this
          .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
          this.ausgewaehltesBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung
        ]; // ACHTUNG: Bei echter JS-Map, hier .get notwendig!
        for (let baueigenschaftInFilter of filter.baueigenschaftenInFilter) {
          /*
            if (Object.keys(baueigenschaftInFilter).length === 0 && baueigenschaftInFilter.constructor === Object
            // Test auf leeres Objekt, siehe https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object:
            ) {
            console.log("Achtung: Filter ohne Baueigenschaften!");
            } else {
            */
          if (
            baueigenschaftInFilter.baueigenschaftsBezeichnung !== undefined // Notwendig, sonst hier Fehler bei Filteren ohne Baueigenschaften!!!
          ) {
            console.log(
              "In for in Reihenfolge der Baueigenschaften in layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInFilter: ",
              baueigenschaftInFilter.baueigenschaftsBezeichnung
            );
            baueigenschaftInFilter.indexInProfilModelZuFilterndeBaueigenschaften = this.findeIndexVonBaueigenschaft(
              baueigenschaftInFilter.baueigenschaftsBezeichnung
            );
          }
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------
        // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
        //      diverse andere Felder disablen/enablen, per Flag im Map-artigen JS-Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular
        //----------------------------------------------------------------------------------------------------------------------------------------------
        // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
        // Hier für layoutgesteuertes generisches Profilformular entfernt!
        //---------------------------------------------------------------------------------------------------------------------
        // Folgender Code wandelt alle Datumswerte im Array profilModelZuFilterndeBaueigenschaften in Strings um,
        // für Verwendung mit Quasar QDate Picker, welcher String-Format erfordert
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        for (
          var i = 0;
          i < this.profilModelZuFilterndeBaueigenschaften.length;
          i++
        ) {
          let eigenschaft = this.profilModelZuFilterndeBaueigenschaften[i];
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.datumsWert1,
                "DD.MM.YYYY"
              );
            }
            console.log(
              "profilModelZuFilterndeBaueigenschaften[i].datumsWert1: ",
              this.profilModelZuFilterndeBaueigenschaften[i].datumsWert1
            );
          }
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.datumsWert2,
                "DD.MM.YYYY"
              );
            }
            console.log(
              "profilModelZuFilterndeBaueigenschaften[i].datumsWert2: ",
              this.profilModelZuFilterndeBaueigenschaften[i].datumsWert2
            );
            //-----------------------------------------------------------------------------------------------------
            // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
            // profilModelZuFilterndeBaueigenschaften in Strings um, für Verwendung von
            // Quasar QTime Picker, welcher String-Format erfordert
            // ACHTUNG: Ist überflüssig, d.h. nur bei QDate notwendig, nicht bei QTime, da die Felder tagesZeitWert1/2 in Mongoose bereis Strings sind!!!
            // Deshalb ist bei QTime weder eine Vorwärts- noch eine Rückwärtskonvertierung notwendig
            // Daher auskommentiert:
            /*
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                "Tageszeitwert" ||
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                "Tageszeitwertepaar"
            ) {
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.tagesZeitWert1,
                "HH:mm"
              );
              console.log(
                "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1: ",
                this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert1
              );
            }
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Tageszeitwertepaar"
            ) {
              this.profilModelZuFilterndeBaueigenschaften[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.tageszeitsWert2,
                "HH:mm"
              );
              console.log(
                "profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2: ",
                this.profilModelZuFilterndeBaueigenschaften[i].tagesZeitWert2
              );
            }
            */
          }
          //----------------------------------------------------------------------------------------------------------------------------------------
          // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden!
          // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format
          //       zurückverwandelt werden, denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
          //       Vorlage: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
          //       this.ausgewaehlteBaueigenschaft.datumsWert1 = date.formatDate(
          //          this.ausgewaehlteBaueigenschaft.datumsWert1, // Erfordert normalerweise Date Objekt als 1. Parameter, nicht String!
          //          "YYYY-MM-DD") // Ausnahme: Akzeptiert auch String im Format "YYYY-MM-DD"
          //       Dies erfolgt in submitWerteAnKnoten()
          //       ACHTUNG: In baueinheiten.vue etc. ist datumsWert1/2 aber nicht wie hier (wegen Konvertierung auf dem "Hinweg" in mounted() etc., weil QDate (wie QTime) nur mit
          //       Strings arbeitet) im Format String, sondern im UTC-Date-Format. Hier in baueigenschafts-profil-formulare.vue ist wegen der Konvertierung nach
          //       String auf dem "Hinweg" dann auf dem "Rückweg" vor Aufruf von formatDate() (in submitWerteAnKnoten()) zuerst eine Konvertierung
          //       von datumsWert1 von String nach Date durchgeführt werden!!! Siehe Kommentare in submitWerteAnKnoten().
          // HINWEIS: Für tagesZeitWert1/2 ist weder Konvertierung auf dem "Hinweg" noch auf dem "Rückweg" erforderlich, da das Mongoose
          //          Model dafür bereits String ist, nicht Date!!!
          //========================================================================================================================================
          // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
          //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
          // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
          // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
          //----------------------------------------------------------------------------------------------------------------------------------------
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
          ) {
            // Finde Baueigenschaft im Map-artigen JS-Objekt layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
            // die Konvertierung von Array nach String durch
            let filter = this
              .layoutBaueinheitZugeordneteBaustoffeFilterBaueigenschaftsProfilFormular[
              this.ausgewaehltesBaueigenschaftsProfil
                .baueigenschaftsProfilBezeichnung
            ]; // ACHTUNG: Bei echter JS-Map, hier .get notwendig!
            for (let myEigenschaft of filter.baueigenschaftenInFilter) {
              if (
                myEigenschaft.baueigenschaftsBezeichnung ===
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
              ) {
                if (myEigenschaft.radio) {
                  if (eigenschaft.aufzaehlungsWert != null) {
                    // Ist Array! Kann allerdings auch leerer Array [] oder [null] sein!
                    if (eigenschaft.aufzaehlungsWert.length > 0) {
                      eigenschaft.aufzaehlungsWert =
                        eigenschaft.aufzaehlungsWert[0];
                    } else {
                      eigenschaft.aufzaehlungsWert = null;
                    }
                  }
                } else {
                  // Checkbox oder Toggles, benötigen Array, vertragen aber initial keinen Wert null!
                  if (eigenschaft.aufzaehlungsWert == null) {
                    eigenschaft.aufzaehlungsWert = []; // Setze leeren Array statt null - sonst Fehler in Checkboxen,
                    // Fehlermeldung "QOptionGroup.js: model should be array in your case" im Browser Log
                  }
                }
              }
            }
          }
          // DONE: Obiger Code zur Konvertierung des Aufzählungswerts auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden, in
          //       resetWerteAnKnoten() und Watch für selectedNode
          // DONE: Aufzählungswerte für type="radio" im Format String müssen auf dem "Rückweg" VOR Speicherung wieder in Arrays zurückkonvertiert werden,
          //       in submitWerteAnKnoten()
          //========================================================================================================================================
        }
        //===============================================================================================================================================
        // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
        // this.initializeIstWerteMitSollWerten(); // TODO XXXXXX - hier vorläufig disabled
        //===============================================================================================================================================
        console.log("✅✅✅ $refs: ", this.$refs);
        this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen
        //-----------------------------------------------------------------------------------------------------------------------------------------------
        this.mountedDone = true; // Wird im Template per v-if verwendet, verhindert Rendering vor Abschluss von mounted()
        //------------------------------------------------------------------------------------------------------------------------------------------
        // Weggefallenes readZuehoerigesProfil():
      }) // Catch-Block für Error, wenn Profie nicht gefunden wurde:
      .catch(error => {
        console.log(
          "Error aus readAlleFilterBaueigenschaftsProfile() - error: ",
          error
        );
        // Die Benutzernachricht wird bereits in readAlleFilterBaueigenschaftsProfile() ausgelöst, daher hier unterdrückt:
        // globalStore.showBenutzerNachricht(
        //   BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER
        // );
      }); // /.catch
  } // /mounted:
};
</script>
<style>
.lineheight {
  line-height: 160%;
} /* Nur für Testzwecke, wird zusammen mit class="lineheight" verwendet für Anpassung der Zeilenhöhe */
/* CSS, um selektiv die Spinners an Input-Feldern zu removen, z.B. bei Dezimalzahlen, wo sie keinen Sinn machen */
/* Vorlage: https://stackoverflow.com/questions/33749896/hide-html5-input-type-number-arrow-with-a-css-class */
/* Funktioniert so (selektiv per class="no-spin" an QInputs) warum auch immer NICHT! */
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
.no-spin {
  -moz-appearance: textfield !important;
}
.color-teal-2 {
  color: rgb(178, 223, 219); /* teal-2, per Color Picker ermittelt */
}
.color-red {
  color: red;
}
/* Stattdessen für alle Input-Felder mit type="number" Spinners removed in der gesamten Komponente: */
/* Vorlagen: https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box und https://codepen.io/smolinari/pen/pmdLrZ */
/* ACHTUNG: In Verbindung mit step="any" die Spinners wieder enabled, sie zählen dann nur die Stellen vor dem Komma hoch und runter */
/*
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
*/
</style>
