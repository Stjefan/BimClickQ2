<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für generisches Baueigenschaftsprofilformular                                                                  -->
  <!-- Rendered, abhängig vom ausgewählten Baueigenchaftsprofil ein QForm für alle Felder im Profil - die Reihenfolge ist dabei      -->
  <!-- einstweilen so, wie diese vom Backend kommen                                                                                  -->
  <!-- TODO: Konfigurierbares Layout mit Selektions (d.h. Auswahl, welche Baueigenschaften aus dem Profil im Form als Felder         -->
  <!-- angezeigt werden-, Sortier- und Strukturierungsmöglichkeiten (Unter-Tabs, Rubriken), etc.                                     -->
  <!-- HINWEIS: Neben diesr Vue-Komponente für ein generisches Baueigenschaftsprofilformular gibt es spezifische Vue-Komponenten mit -->
  <!-- spezifischen Baueigenschaftsprofilformularen für Bauvorhaben, Standort, Gebäude, Geschoss, Bodenaufbau, Schicht, etc.         -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- NEU - @MS: Die Komponente enabled, dass sie auch für Profile im Baustoffbaum verwendet werden kann (Aufruf nun in             -->
  <!--            baueinheiten.vue und baustoffe.vue - dafür neue prop baum zur Fallunterscheidung!                                  -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <q-form>
    <div class="q-pa-xs">
      <!-- RELIKT:  Die null-Prüfung hier ist unbedingt notwendig, da der Array profilModelAusgewaehlterKnoten, während das Template erstmals gerendered wird, -->
      <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
      <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
      <!--          profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
      <div v-if="profilModelAusgewaehlterKnoten != null">
        <div v-if="ausgewaehltesBaueigenschaftsProfil">
          <p class="text-h6" v-if="$q.screen.gt.sm">
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              Fachliche Planung für die
            </span>
            <span v-else>
              Fachliche Daten des
            </span>
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              im Bauvorhabenbaum ausgewählte
            </span>
            <span v-else>
              im Baustoffbaum ausgewählten
            </span>
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              Baueinheit
            </span>
            <span v-else>
              Baustoffs
            </span>
            <strong>
              <span v-if="$props.baum === 'Bauvorhabenbaum'">
                "{{ selectedNode.baueinheitsBezeichnung }}"
              </span>
              <span v-else> "{{ selectedNode.baustoffBezeichnung }}" </span>
            </strong>
            gemäß Baueigenschaftsprofil
            <strong
              >"{{
                ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
              }}"</strong
            >
          </p>
          <p class="text-subtitle1" v-else>
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              Fachliche Planung für die
            </span>
            <span v-else>
              Fachliche Daten des
            </span>
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              im Bauvorhabenbaum ausgewählte
            </span>
            <span v-else>
              im Baustoffbaum ausgewählten
            </span>
            <span v-if="$props.baum === 'Bauvorhabenbaum'">
              Baueinheit
            </span>
            <span v-else>
              Baustoffs
            </span>
            <strong>
              <span v-if="$props.baum === 'Bauvorhabenbaum'">
                "{{ selectedNode.baueinheitsBezeichnung }}"
              </span>
              <span v-else> "{{ selectedNode.baustoffBezeichnung }}" </span>
            </strong>
            gemäß Baueigenschaftsprofil
            <strong
              >"{{
                ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
              }}"</strong
            >
          </p>
          <!-- ALT: zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung -->
        </div>
        <q-separator />
        <div class="row full-width items-start">
          <div class="col-md-5 col-12 q-pr-sm">
            Im Dropdown-Menü rechts das <b>Baueigenschaftsprofil</b> auswählen,
            für das die Werte der diesem Profil zugeordneten Baueigenschaften an
            dem links im Baum <b>ausgewählten Knoten</b> im Formular unten
            angezeigt bzw. bearbeitet werden sollen
            {{ displayRightArrow }}
          </div>
          <!-- QSelect zur Auswahl eines Baueigenschaftsprofils -->
          <!-- ACHTUNG: Initialisierung von ausgewaehltesBaueigenschaftsProfil erfolgt in readAlleBaueigenschaftsProfile()! -->
          <!-- ACHUTNG: Kein :disable hier! -->
          <q-select
            class="col-md-2 col-12 q-pa-xs q-gutter-xs"
            label="Baueigenschaftsprofil"
            v-model="ausgewaehltesBaueigenschaftsProfil"
            :options="alleBaueigenschaftsProfile"
            option-label="baueigenschaftsProfilBezeichnung"
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            square
          />
          <!-- ------------------------------------------------------------------------------------------------------------------------ -->
          <!-- HINWEIS: class="q-pl-sm" sorgt für Abstand zwischen QSelect und dem nachfolgenden Text!!!                                -->
          <!--          Siehe https://forum.quasar-framework.org/topic/3934/row-with-2-50-cols-space-between-them/6                     -->
          <!--          und https://quasar.dev/style/spacing#Table-of-permutations - pl steht für "paddin left", "xs" für "extra small" -->
          <!-- ------------------------------------------------------------------------------------------------------------------------ -->
          <div class="col-md-5 col-12 q-pl-sm">
            <b>Hinweise:</b> In Feldern für Baueigenschaften, die am ausgewählten Knoten im
            Baum <b>nicht aktiviert</b> sind, oder deren
            <b>Werte von Elternknoten ererbt</b> werden (cyanfarbig), ist keine Eingabe von
            Werten möglich. Nach Anwahl eines Eingabefelds für eine
            Baueigenschaft wird in der <b>fachlichen Hilfe</b> rechts die
            Beschreibung der Baueigenschaft angezeigt.
          </div>
        </div>
      </div>
      <!--
      ausgewaehltesBaueigenschaftsProfil:
      {{ ausgewaehltesBaueigenschaftsProfil }}
      profilModelAusgewaehlterKnoten:
      {{  profilModelAusgewaehlterKnoten  }}
      -->
      <br />
      <div v-if="profilBezeichnung != null">
        <!-- ======================================================================================== -->
        <!-- Start Code für generisches Baueigenschaftsprofilformular mit v-for-Steuerung             -->
        <q-separator />
        <!-- ---------------------------------------------------------------------------------------- -->
        <div class="row q-pa-xs bg-grey-2">
          <!-- =========== ACHTUNG: In erster Spalte q-pl-none zusätzlich, sonst ist der Spaltentext dort zu weit rechts!!! ================== -->
          <div class="col-md-3 col-12 q-pl-none q-pr-xs q-pt-xs q-pb-xs q-gutter-xs">
            <b>Baueigenschaft</b>
          </div>
          <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
            <b>Einheit</b>
          </div>
          <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
            <b>Symbol</b>
          </div>
          <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
            <b>Operator</b>
          </div>
          <div class="col-md-3 col-12 q-pa-xs q-gutter-xs">
            <b>Wert am ausgewählten Knoten</b>
          </div>
          <!-- 2. Feld für Einheit disabled, um Platz zu gewinnen für breitere Eingabefelder zur Anzeige der Bezeichnungen im Feld: -->
          <!--
              <div class="col-md-1  col-12 q-pl-sm">
                <b>Einheit</b>
              </div>
              -->
          <!-- Leerspalte, um Platz zwischen den beiden Eingabefeldern zu schaffen, TODO für bessere Lösung: -->
          <!--
              <div class="col-md-1 col-12">
              </div>
              -->
          <div class="col-md-3 col-12 q-pa-xs q-gutter-xs">
            <b>Zweiter Wert (bei Wertepaaren)</b>
          </div>
          <!-- ALT: Bemerkungsspalte, ersetzt durch Tooltip -->
          <!--
          <div class="col-md-3 col-12 q-pa-xs q-gutter-xs">
            <b>Bemerkung zur Baueigenschaft</b>
          </div>
          -->
        </div>
        <q-separator />
        <div
          v-for="eigenschaft in profilModelAusgewaehlterKnoten"
          :key="eigenschaft.typbezogeneBaueigenschaft._id"
        >
          <!-- {{ eigenschaft.datumsWert1 }} -->
          <!----------------------------------------------------------------------------------->
          <!-- Start Zeile für Baueigenschaft:                                               -->
          <!-- ----------------------------------------------------------------------------- -->
          <!-- ACHTUNG: class="items-start" notwendig, damit bei langer Bezeichnung/Bemerkung-->
          <!-- die QInput-, QSelect- und QToggle-Felder in der Spalte OBEN sind auf derselben-->
          <!-- Höhe wie Bezeichnung, Symbol, Einheit!!!                                      -->
          <!-- ----------------------------------------------------------------------------- -->
          <!-- ACHTUNG: An den q-markdowns für Symbol und Einheit ist jeweils class="q-pl-sm"-->
          <!-- notwendig, damit Abstand zu den Feldern links davon eingefügt wird!!!         -->
          <!-- ----------------------------------------------------------------------------- -->
          <!-- ==================================================================================================================== -->
          <!-- ACHTUNG: Unbedingt auch an ALLEN <div v-else> class="q-gutter-xs", sonst ist da ganze Layout vertikal nicht dense!!! -->
          <!-- ==================================================================================================================== -->
          <div class="row items-start q-pa-xs">
            <!-- ================================================================= -->
            <!-- ACHTUNG: items-center funktioniert, warum auch immer, hier nicht: -->
            <!-- Dafür funktionert self-center oder self-top , Tipp von            -->
            <!-- https://codepen.io/Pratik__007/pen/oNNQMJP                        -->
            <!-- ================================================================= -->
            <div class="col-md-3 col-12 q-pa-xs q-gutter-xs self-top">
              {{
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              }}
              <!-- --------------------------------------------------------------------------------- -->
              <!-- NEU: Tooltip auf dem obigen Feld: baueigenschaftsBezeichnung anzeigen             -->
              <!-- ALT: content-class="my-tooltip"                                                   -->
              <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
              <!-- --------------------------------------------------------------------------------- -->
              <q-tooltip
                :delay="1000"
                :offset="[0, 0]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
                }}
              </q-tooltip>
            </div>
            <!-- Einheit: -->
            <q-markdown
              v-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  'Kennwertepaar'
              "
              class="col-md-1 col-12 q-pa-xs self-top"
              :src="eigenschaft.typbezogeneBaueigenschaft.einheit"
            />
            <!-- ==================================================================================================================== -->
            <!-- ACHTUNG: Unbedingt auch an allen <div v-else> class="q-gutter-xs", sonst ist da ganze Layout vertikal nicht dense!!! -->
            <!-- ==================================================================================================================== -->
            <div v-else class="col-md-1 col-12 q-pa-xs q-gutter-xs self-top"></div>
            <q-markdown
              v-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  'Kennwertepaar'
              "
              class="col-md-1 col-12 q-pa-xs self-top"
              :src="eigenschaft.typbezogeneBaueigenschaft.symbol"
            />
            <!-- ==================================================================================================================== -->
            <!-- ACHTUNG: Unbedingt auch an allen <div v-else> class="q-gutter-xs", sonst ist da ganze Layout vertikal nicht dense!!! -->
            <!-- ==================================================================================================================== -->
            <div v-else class="col-md-1 col-12 q-pa-xs q-gutter-xs self-top"></div>
            <q-markdown
              v-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  'Kennwertepaar'
              "
              class="col-md-1 col-12 q-pa-xs self-top"
              :src="eigenschaft.typbezogeneBaueigenschaft.operator"
            />
            <!-- ==================================================================================================================== -->
            <!-- ACHTUNG: Unbedingt auch an allen <div v-else> class="q-gutter-xs", sonst ist da ganze Layout vertikal nicht dense!!! -->
            <!-- ==================================================================================================================== -->
            <div v-else class="col-md-1 col-12 q-pa-xs q-gutter-xs self-top"></div>
            <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
            <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip                                   -->
            <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
            <q-input
              v-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Kennwertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.kennWert1"
              :type="
                !benutzerDarfBearbeitenSelectedNode ||
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null ||
                !eigenschaft
                  .aktiviertNichtDeaktiviert
                  ? ''
                  : 'number'
              "
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Kennwert' ||
                    eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                      'Kennwertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <q-input
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Bezeichnungswert' ||
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Bezeichnungswertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.bezeichnungsWert1"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Bezeichnungswert' ||
                    eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                      'Bezeichnungswertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <q-input
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Tageszeitwert' ||
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Tageszeitwertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.tagesZeitWert1"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Tageszeitwert' ||
                    eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                      'Tageszeitwertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                    <q-time
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                          !eigenschaft.aktiviertNichtDeaktiviert
                      "
                      v-model="eigenschaft.tagesZeitWert1"
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
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Datumswert' ||
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Datumswertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs self-top"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.datumsWert1"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Datumswert' ||
                    eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                      'Datumswertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                    <q-date
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                          !eigenschaft.aktiviertNichtDeaktiviert
                      "
                      v-model="eigenschaft.datumsWert1"
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
            <q-select
              clearable
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Aufzählungswert'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.aufzaehlungsWert"
              :options="
                eigenschaft.typbezogeneBaueigenschaft
                  .selektierbareOptionenAufzaehlungsWert
              "
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Aufzählungswert'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-select>
            <q-toggle
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Wahrheitswert'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.wahrheitsWert"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              indeterminate
              dense
              @input="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Wahrheitswert'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-toggle>
            <div v-else class="col-md-3 col-12 q-pa-xs q-gutter-xs">
              Nicht unterstützter Wertetyp
            </div>
            <!-- ------------------------------------------------------------------------------------------------------------------------ -->
            <!-- HINWEIS: class="q-pl-sm" sorgt für Abstand zwischen QSelect und dem nachfolgenden Text!!!                                -->
            <!--          Siehe https://forum.quasar-framework.org/topic/3934/row-with-2-50-cols-space-between-them/6                     -->
            <!--          und https://quasar.dev/style/spacing#Table-of-permutations - pl steht für "paddin left", "xs" für "extra small" -->
            <!-- ------------------------------------------------------------------------------------------------------------------------ -->
            <!-- Spalte disabled, um Platz zu gewinnen: -->
            <!--
            <q-markdown
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                'Kennwert' ||
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Kennwertepaar'
            "
            class="col-1 q-pa-xs q-gutter-xs"
            :src="eigenschaft.typbezogeneBaueigenschaft.einheit"
            />
            <div v-else class="col-1 q-pa-xs q-gutter-xs"></div>
            -->
            <!-- Ende 1. Spalte für die Input-Felder (QInput, QSelect, QToggle)  -->
            <!-- --------------------------------------------------------------- -->
            <!-- Leerspalte: -->
            <!--
              <div class="col-1 q-pa-xs q-gutter-xs">
              </div>
            -->
            <!-- Start 2. Spalte für die Input-Felder (QInput) bei Wertepaaren   -->
            <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
            <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip -->
            <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
            <q-input
              v-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Kennwertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.kennWert2"
              :type="
                !benutzerDarfBearbeitenSelectedNode ||
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null ||
                !eigenschaft
                  .aktiviertNichtDeaktiviert
                  ? ''
                  : 'number'
              "
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Kennwertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <q-input
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Tageszeitwertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.tagesZeitWert2"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Tageszeitwertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
              <!-- HINWEIS: Die aufwändigen Konvertierungen von Date nach String in mounted(), reset() und in watch() (= Refresh) und zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
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
                    <q-time
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                          !eigenschaft.aktiviertNichtDeaktiviert
                      "
                      v-model="eigenschaft.tagesZeitWert2"
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
            <!-- :rules="[isValidDate]"                                                               -->
            <!-- ---------------------------------------------------------------------------------- -->
            <q-input
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Datumswertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.datumsWert2"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Datumswertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
              <!-- Das Datumsfeld kommt von Mongoose im Date-Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
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
                    <q-date
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                          !eigenschaft.aktiviertNichtDeaktiviert
                      "
                      v-model="eigenschaft.datumsWert2"
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
            <q-input
              v-else-if="
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Bezeichnungswertepaar'
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  eigenschaft.bezeichnungWerteVererbenderElternknoten != null ||
                  !eigenschaft.aktiviertNichtDeaktiviert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="eigenschaft.bezeichnungsWert2"
              :bg-color="
                eigenschaft
                  .bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung,
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBeschreibung
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
                  eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                    'Bezeichnungswertepaar'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <div v-else class="col-md-3 col-12 q-pa-xs q-gutter-xs"></div>
            <!-- Ende 2. Spalte für die Input-Felder (QInput, QSelect) bei Paaren -->
            <!-- ------------------------------------------------------------------->
            <!-- Spalte für Bemerkung: Disabled zugunsten von Tooltip -->
            <!--
            <div class="col-md-3 col-12 q-pl-xs q-gutter-xs self-top text-caption">
              {{ eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBemerkung }}
            -->
            <!-- Spezielle Felder, nur bei generischem Baueigenschaftsprofilformular: -->
            <!-- Die folgende Information erzeugt einen Spillover über rechten Rand, deshalb disabled: -->
            <!--
              <div class="col-md-2 col-12 q-pa-xs q-gutter-xs">
                Erstmals definiert auf Pfad an:
                {{ eigenschaft.bezeichnungWerteVererbenderElternknoten }}
              </div>
              -->
            <!-- Die folgende Checkbox erzeugt einen Spillover über rechten Rand, deshalb disabled: -->
            <!--
              <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
              <q-checkbox
                :disable="true"
                :value="eigenschaft.aufzaehlungsWert !== null"
                label="Definiert"
                dense
              />
              </div>
              -->
          </div>
          <!-- Ende Zeile für Baueigenschaft                                              -->
          <!-- -------------------------------------------------------------------------- -->
          <q-separator />
        </div>
      </div>
      <!-- <q-separator /> -->
      <!----------------------------------------------------------------------------------------------------- -->
      <!-- Start Button Section: -->
      <q-separator />
      <div class="row q-pa-xs q-gutter-xs">
        <q-btn
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Werte für Baueigenschaften speichern"
          @click="submitWerteAnKnoten()"
          color="positive"
          glossy
          no-caps
        />
        <!-- <div class="col-1" /> -->
        <q-btn
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Eingaben auf Originalwerte zurücksetzen"
          @click="resetWerteAnKnoten"
          color="deep-orange"
          text-color="white"
          glossy
          no-caps
        />
      </div>
    </div>
  </q-form>
</template>
<!-- ***===================================================================================================================================== -->
<script>
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import { date } from "quasar";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
//----------------------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  props: [
    "profilBezeichnung", // Hier kann die Bezeichnung eines anzuzeigenden Baueigenschaftsprofils mitgegeben werden
    "baum", // NEU: String zur Fallunterscheidung, ob die Komponente im Bauvorhaben- oder im Baustoffbaum arbeitet, wahlweise "Bauvorhabenbaum" oder "Baustoffbaum"
    "nodes", // Referenz auf nodesTreeBaueinheiten bzw. nodesTreeBaustoffe
    "selectedNode", // Referenz auf selectedNodeTreeBaueinheiten bzw. selectedNodeTreeBaustoffe
    "benutzerDarfBearbeitenSelectedNode" // Boolean, wird in aufrufender Komponente ausgewertet und der Komponente übergeben, für Disabling/Enabling von Feldern
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // HINWEIS: Zusätzlich wird Refresh-Event von der Komponente gefeuert! @refresh-request-baueigenschafts-profil
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data: function() {
    return {
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      profilModelAusgewaehlterKnoten: null, // Array für die Speicherung aller im Profilformular enthaltenen Baueigenschaften, mit deren aktuellen Werten (am ausgewählten Knoten)
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      selectedNodeArbeitskopie: null,
      eigenschaftenAusEltern: null,
      alleBaueigenschaftsProfile: [],
      // NEU: Für Auswahl eines Baueigenschaftsprofils - TODO:
      ausgewaehltesBaueigenschaftsProfil: null,
      bezeichnungenBaueigenschaftsProfile: ["TODO"],
      indexMapFuerProfilModelAusgewaehlterKnoten: [] // Aktuell nicht verwendet, Map um statt per computed-Funktion findeIndexVonBaueigenschaftSchichtdicke den Index
      // für eine Baueigenschaft mit baueigenschaftsBezeichnung im Array profilModelAusgewaehlterKnoten zu finden
      // Beispiel für Aufbau: {"Baueinheit > Schicht > Dicke": 17, ... }
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Baueinheit > Schicht > Dicke"] liefert dann den Index
      // Muss in mounted: initialisiert werden per Funktion baueIndexMapFuerProfilModelAusgewaehlterKnoten()
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet bzw. die in mounted vorinitialisierten Felder indexInProfilModelAusgewaehlterKnoten im Layout File

      // Code verwendet aktuell direkt die Date Utils mit date.formatDate/formatTime, daher diese Funktionen auskommentiert:
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

    baueIndexMapFuerProfilModelAusgewaehlterKnoten() {
      //---------------------------------------------------------------------------------------------------------------------------------------------------------------
      // Für Testzwecke, Variante mit Map statt computed-Funktionen für die Bestimmung des Indexes einer Baueigenschaft im Array
      // Verwendet die Funktion findeIndexVonBaueigenschaft() weiter unten
      // Die Funktion hier baut diese Map auf aus dem Array profilModelAusgewaehlterKnoten
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet
      for (var eigenschaft of this.profilModelAusgewaehlterKnoten) {
        this.indexMapFuerProfilModelAusgewaehlterKnoten[
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
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          baueigenschaftsBezeichnung
      );
      console.log("In findeIndexVonBaueigenschaft() - index: ", index);
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
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @focus-Methode für QSelects und QInputs zum Setzen der Felder und Anzeigen der fachlichen Hilfe über global Store
      // ACHTUNG: @focus funktioniert NICHT an QToggles! Daher dort @input statt @focus verwendet!
      baueigenschaftsBezeichnung,
      baueigenschaftsBeschreibung
    ) {
      //==============================================================================================================
      // ACHTUNG: Dieser Code ist leider spezifisch für Bauvorhabenbaum (Baueinheiten) vs. Baustoffbaum (Baustoffe)!!!
      //          Der Code war ursprünglich nur für Baueinheiten
      // Daher hier 2 Fallunterscheidungen mittels der prop baum eingebaut:
      //==============================================================================================================
      if (this.baum === "Bauvorhabenbaum") {
        // Fachliche Hilfe für die ausgewählte Baueigenschaft an der Baueinheit aufsetzen:
        // baueigenschaftsBezeichnung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBezeichnung
        );
        // baueigenschaftsBeschreibung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBeschreibung
        );
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
        this.showFachlicheHilfe("fachlicheHilfeBaueigenschaftAnBaustoff");
      }
    },

    submitWerteAnKnoten() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // DONE: Hier werden auch leere bzw. disabled Felder auf "definiert" gesetzt!?!
      // DONE: Parameter? Weder idBaueinheit noch baueigenschaften werden verwendet!?!
      // DONE: API Naming Baueinheiten/Schichtaufbau? Wir updaten hier die Baueigenschaften für eine Schicht an einer Baueinheit,
      //       daher Aufruf put-API /baueinheiten/baueigenschaften
      // DONE: Error Handling, Benutzernachrichten
      // DONE: Umbenennung, ALT: submitWerteAnBaueinheit(), NEU: submitWerteAnKnoten()
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In submitWerteAnKnoten()");
      // Setze die Werte auf "definiert":
      for (let eigenschaft of this.profilModelAusgewaehlterKnoten) {
        var result = this.pruefeDefiniertheitVonEigenschaft(eigenschaft);
        eigenschaft.definiertNichtUndefiniert = result;
        // console.log(eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung, eigenschaft.typbezogeneBaueigenschaft.werteTyp, eigenschaft.bezeichnungsWert1, eigenschaft.definiertNichtUndefiniert)
      }
      // Erstelle Clone-Kopie des Arrays für Rückkonvertierung der Datumsfelder im Array in das von Mongoose am Backend benötigte Format
      // ACHTUNG: Der originale Array darf nicht direkt konvertiert werden, da er ja das Model für das Form und die QDates darin ist!!!
      // Macht vermutlich nur shallow Copy, von https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript:
      let kopieProfilModelAusgewaehlterKnoten = this.profilModelAusgewaehlterKnoten.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      /*
      // Alternative: Deep Copy, von https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript, wird hier vermutlich nicht benötigt!?!
      let kopieProfilModelAusgewaehlterKnoten = this.profilModelAusgewaehlterKnoten.map(a => {
        let newObject = {};
        Object.keys(a).forEach(propertyKey => {
            newObject[propertyKey] = a[propertyKey];
        });
        return newObject;
      });
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
      //==================================================================================================================================================
      for (let eigenschaft of kopieProfilModelAusgewaehlterKnoten) {
        // Folgender Code wandelt alle Strings für Datumswerte im Array profilModelAusgewaehlterKnoten in Mongoose-Format YYYY-MM-DD um, für Quasar QDate Picker,
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
            // wird in profilModelAusgewaehlterKnoten per Konvertierung mit date.formatDate() erzeugt in mounted(), reset() und in watch() (= Refresh) auf der Prop selectedNode!!!
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
            // wird in profilModelAusgewaehlterKnoten per Konvertierung mit date.formatDate() erzeugt in mounted(), reset() und in watch() (= Refresh) auf der Prop selectedNode!!!
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
        //------------------------------------------------------------------------------------------------------------
        // ACHTUNG: Hier noch kein Code für Konvertierung von Aufzählungswerten von Array nach String für Radio Buttons
        // Bei Bedarf (wenn Radio Buttons gebraucht werden) hier einfügen nach Vorlage z.B. aus baueinheit-standort-baueigenschafts-profil-formular.vue
        //------------------------------------------------------------------------------------------------------------
      }
      //-------------------------------------------------------------------------------
      if (this.baum === "Bauvorhabenbaum") {
        // NEU - Wir sind im Bauvorhabenbaum
        const apiRoute =
          process.env.API + "/Baueinheiten/" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
        this.$axios
          .put(apiRoute, {
            idBaueinheit: this.selectedNode._id, // ACHTUNG: Hier idBaueinheit, nicht idBaustoff!!!
            wertbezogeneBaueigenschaftenArray: kopieProfilModelAusgewaehlterKnoten // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
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
            wertbezogeneBaueigenschaftenArray: kopieProfilModelAusgewaehlterKnoten // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
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
      // console.log("zuUntersuchendeBaueigenschaften: ", zuUntersuchendeBaueigenschaften)
      var datenstrukturVererbung = []; // Enthält für jede der zu untersuchenden Baueigenschaften die erste definierte Eigenschaft auf dem Pfad
      var idCurrentNode = currentNode._id;
      var pathCurrentNode = currentNode.path.split("#");
      for (var aktuellBetrachteteBaueigenschaft of zuUntersuchendeBaueigenschaften) {
        // Suche die definierten Werte der aktuell betrachteten Baueigenschaften im Elternpfad heraus
        // (jeweils die obersten definierten Werte im Pfad)
        var node_i = rootNode; // Knoten im Pfad
        var hierarchyIndex = 0;
        var vererbungsInformation = {
          // @MS - ALT: Hieß nur "baueigenschaft"
          baueigenschaftsBezeichnung:
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
          //      "❌❌❌❌❌❌ FEHLER: Index für Baueigenschaft Gebäude > Recht > Bauordnung > Bauweise im Array profilModelAusgewaehlterKnoten nicht gefunden!"
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
      // Knotenbezeichnungen ausgeben, an denen die Baueigenschaft erstmalig definiert ist:
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

    projiziereBaueigenschaftenAnKnotenAufProfil(knoten, profil) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Sucht die Eigenschaften aus dem Profil am Knoten (Baueinheit oder Baustoff) und erzeugt erstmalig den Array profilModelAusgewaehlterKnoten,
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
      //-----------------------------------------------------------------------------------------------------------------------------------
      // NEU: Hack, um eine bestimmte, der hierarchischen Anordnung im Baustoffbaum entsprechende Sortierreihenfolge der Baueigenschaften
      // im Profil für die Anzeige zu erreichen, nur für Profil "Baustoff > Estrich":
      // Vorlage: https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
      if (profil.baueigenschaftsProfilBezeichnung === "Baustoff > Estrich") {
        console.log("***ACHTUNG*** - Profil 'Baustoff > Estrich': Profil Model wird sortiert!")
        var sortOrderBaueigenschaftenImProfilEstrich = [
            // "Baustoff > Estrich > Bauart", // 0 // NEU - #380: BEg gelöscht
            "Baustoff > Estrich > Bindemittelart",
            "Baustoff > Estrich > Einbauart",
            "Baustoff > Estrich > Biegezugfestigkeitsklasse",
            // Bis hier selbe Reihenfolge wie die korrespondierende Baueigenschaften im Profilformular "Baueinheit > Schicht"!
            "Baustoff > Estrich > Härteklasse",
            "Baustoff > Estrich > Druckfestigkeitsklasse",
            "Baustoff > Estrich > Oberflächenhärteklasse", // 6
          ]
        projizierteBaueigenschaftenAnKnoten.sort((a, b) => {
          // console.log("a: ", a)
          // console.log("b: ", b)
          return sortOrderBaueigenschaftenImProfilEstrich.indexOf(a.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung) -
            sortOrderBaueigenschaftenImProfilEstrich.indexOf(b.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung);
        })
        console.log(
          "projizierteBaueigenschaftenAnKnoten nach Sortierung: ",
          projizierteBaueigenschaftenAnKnoten
        );
      } // else { /* Do nothing */ }
      //-----------------------------------------------------------------------------------------------------------------------------------
      // Erstelle Arbeitskopien der Elemente im Array
      var kopierteProjizierteBaueigenschaftenAnKnoten = projizierteBaueigenschaftenAnKnoten.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      //===============================================================================================
      // HINWEIS: Hier könnte man die Baueigenschaften in profilModelAusgewaehlterKnoten auch noch
      //          anders sortieren, z.B. in einer durch ein spezifisches Layout File für jedes Profil
      //          spezifizierten Reihenfolge. Ohne eine solche weitere Sortierung befinden sich
      //          die Baueigenschaften in der Reihenfolge, wie sie vom Backend kamen. Am Backend
      //          (baueinheiten/baustoffe.controller.readBaueinheit/readBaustoff()) werden sie alphabetisch sortiert,
      //          in derselben Reihenfolge (toUpperCase()) wie auch Quasar sortiert.
      //===============================================================================================
      this.profilModelAusgewaehlterKnoten = kopierteProjizierteBaueigenschaftenAnKnoten;
      // return kopierteProjizierteBaueigenschaftenAnKnoten;
    },

    readAlleBaueigenschaftsProfile() {
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Liest alle Profile mit allen ihren Daten - TODO: Aus Performance-Gründen eventuell nur Extrakt,
      // (Bezeichnung) holen, und erst bei Auswahl eines Profils das ganze Profil?
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
          //=========================================================================================================================================
          // NEU: Initialisierung des v-models am QSelect oben:
          if (this.ausgewaehltesBaueigenschaftsProfil == null) {
            this.ausgewaehltesBaueigenschaftsProfil = this.alleBaueigenschaftsProfile[0];
          } else {
            this.ausgewaehltesBaueigenschaftsProfil = this.alleBaueigenschaftsProfile.find(
              i =>
                i.baueigenschaftsProfilBezeichnung ===
                this.ausgewaehltesBaueigenschaftsProfil
                  .baueigenschaftsProfilBezeichnung
            );
          }
          //=========================================================================================================================================
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
    },

    resetWerteAnKnoten() {
      //-----------------------------------------------------------------------------------------------------------------------------------
      // ALT: Hieß handleReset(), dann resetWerteAnBaueinheit()
      // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
      // welcher die Baueigenschaften mit ihren Werten enthält:
      this.projiziereBaueigenschaftenAnKnotenAufProfil(
        this.selectedNodeArbeitskopie,
        this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
      );
      // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
      // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
      // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelAusgewaehlterKnoten
      this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
        this.nodes[0],
        this.selectedNodeArbeitskopie,
        this.ausgewaehltesBaueigenschaftsProfil.zugeordneteBaueigenschaften // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
      );
      console.log("Vor Join");
      // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld bezeichnungWerteVererbenderElternknoten
      // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
      // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld bezeichnungWerteVererbenderElternknoten
      // die Bezeichnung des Elternknotens anhängen, an dem die Eigenschaft erstmals
      // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
      // bezeichnungWerteVererbenderElternknoten stattdessen null
      // Dieses Feld wird in den :disable-Funktionen abgefragt, um zu verhindern, dass eine im
      // Elternpfad weiter oben definierte Baueigenschaft verändert wird - dies wäre ein Verstoß gegen die Vererbungsregel!
      var joinResult = this.innerJoin(
        this.profilModelAusgewaehlterKnoten,
        this.eigenschaftenAusEltern,
        ["typbezogeneBaueigenschaft", "_id"], // Spezifiziert die zu joinende Baueigenschaft im ersten Array
        "idTypbezogeneBaueigenschaft" // Spezifiziert die zu joinende Baueigenschaft im zweiten Array
        // Joined die beiden Arrays:
        // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
        // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
        // Diese werden gejoined zu einem gemeinsamen Array
      );
      this.profilModelAusgewaehlterKnoten = joinResult;
      console.log(
        "Nach Join - profilModelAusgewaehlterKnoten:",
        this.profilModelAusgewaehlterKnoten
      );
      // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
      //-----------------------------------------------------------------------------------------------------------------------------
      // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
      for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
        let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Datumswertepaar"
        ) {
          if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
            this.profilModelAusgewaehlterKnoten[
              i
            ].datumsWert1 = date.formatDate(
              eigenschaft.datumsWert1,
              "DD.MM.YYYY"
            );
          }
          console.log(
            "profilModelAusgewaehlterKnoten[i].datumsWert1: ",
            this.profilModelAusgewaehlterKnoten[i].datumsWert1
          );
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
          "Datumswertepaar"
        ) {
          if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
            this.profilModelAusgewaehlterKnoten[
              i
            ].datumsWert2 = date.formatDate(
              eigenschaft.datumsWert2,
              "DD.MM.YYYY"
            );
          }
          console.log(
            "profilModelAusgewaehlterKnoten[i].datumsWert2: ",
            this.profilModelAusgewaehlterKnoten[i].datumsWert2
          );
        }
        //-----------------------------------------------------------------------------------------------------
        // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
        // profilModelAusgewaehlterKnoten in Strings um, für Verwendung von
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
          this.profilModelAusgewaehlterKnoten[
            i
          ].datumsWert1 = date.formatDate(
            eigenschaft.tagesZeitWert1,
            "HH:mm"
          );
          console.log(
            "profilModelAusgewaehlterKnoten[i].tagesZeitWert1: ",
            this.profilModelAusgewaehlterKnoten[i].tagesZeitWert1
          );
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
          "Tageszeitwertepaar"
        ) {
          this.profilModelAusgewaehlterKnoten[
            i
          ].datumsWert2 = date.formatDate(
            eigenschaft.tageszeitsWert2,
            "HH:mm"
          );
          console.log(
            "profilModelAusgewaehlterKnoten[i].tagesZeitWert2: ",
            this.profilModelAusgewaehlterKnoten[i].tagesZeitWert2
          );
        }
        */
      }
    }
  },

  //***====================================================================================================================================== */
  computed: {
    // HINWEIS: Hier waren in alter Version in /historic-code Funktionen für spezifisches Baueigenschaftsprofilformular "Schicht"
  },
  //***=====================================================================================================================================
  watch: {
    // Watch auf ausgewaehltesBaueigenschaftsProfil
    ausgewaehltesBaueigenschaftsProfil: {
      handler: function() {
        console.log(
          "In watch von generisches-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
          this.ausgewaehltesBaueigenschaftsProfil
        );
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
          // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
          // welcher die Baueigenschaften mit ihren Werten enthält:
          this.projiziereBaueigenschaftenAnKnotenAufProfil(
            this.selectedNodeArbeitskopie,
            this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
          );
          // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
          // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
          // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelAusgewaehlterKnoten
          this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
            this.nodes[0],
            this.selectedNodeArbeitskopie,
            this.ausgewaehltesBaueigenschaftsProfil.zugeordneteBaueigenschaften // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
          );
          console.log("Vor Join");
          // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld bezeichnungWerteVererbenderElternknoten
          // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
          // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld bezeichnungWerteVererbenderElternknoten
          // die Bezeichnung des Elternknotens anhängen, an dem die Eigenschaft erstmals
          // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
          // bezeichnungWerteVererbenderElternknoten stattdessen null
          // Dieses Feld wird in den :disable-Funktionen abgefragt, um zu verhindern, dass eine im
          // Elternpfad weiter oben definierte Baueigenschaft verändert wird - dies wäre ein Verstoß gegen die Vererbungsregel!
          var joinResult = this.innerJoin(
            this.profilModelAusgewaehlterKnoten,
            this.eigenschaftenAusEltern,
            ["typbezogeneBaueigenschaft", "_id"], // Spezifiziert die zu joinende Baueigenschaft im ersten Array
            "idTypbezogeneBaueigenschaft" // Spezifiziert die zu joinende Baueigenschaft im zweiten Array
            // Joined die beiden Arrays:
            // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
            // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
            // Diese werden gejoined zu einem gemeinsamen Array
          );
          this.profilModelAusgewaehlterKnoten = joinResult;
          console.log(
            "Nach Join - profilModelAusgewaehlterKnoten:",
            this.profilModelAusgewaehlterKnoten
          );
          // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
          //-----------------------------------------------------------------------------------------------------------------------------
          // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
          for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
            let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                "Datumswertepaar"
            ) {
              if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
                this.profilModelAusgewaehlterKnoten[
                  i
                ].datumsWert1 = date.formatDate(
                  eigenschaft.datumsWert1,
                  "DD.MM.YYYY"
                );
              }
              console.log(
                "profilModelAusgewaehlterKnoten[i].datumsWert1: ",
                this.profilModelAusgewaehlterKnoten[i].datumsWert1
              );
            }
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Datumswertepaar"
            ) {
              if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
                this.profilModelAusgewaehlterKnoten[
                  i
                ].datumsWert2 = date.formatDate(
                  eigenschaft.datumsWert2,
                  "DD.MM.YYYY"
                );
              }
              console.log(
                "profilModelAusgewaehlterKnoten[i].datumsWert2: ",
                this.profilModelAusgewaehlterKnoten[i].datumsWert2
              );
            }
            //-----------------------------------------------------------------------------------------------------
            // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
            // profilModelAusgewaehlterKnoten in Strings um, für Verwendung von
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
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.tagesZeitWert1,
                "HH:mm"
              );
              console.log(
                "profilModelAusgewaehlterKnoten[i].tagesZeitWert1: ",
                this.profilModelAusgewaehlterKnoten[i].tagesZeitWert1
              );
            }
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Tageszeitwertepaar"
            ) {
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.tageszeitsWert2,
                "HH:mm"
              );
              console.log(
                "profilModelAusgewaehlterKnoten[i].tagesZeitWert2: ",
                this.profilModelAusgewaehlterKnoten[i].tagesZeitWert2
              );
            }
            */
          }
        }
      }
    },

    // Watch auf Prop "selectedNode"
    // Festgestelltes Problem: handler wird vor mounted aufgerufen
    selectedNode: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNode"
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch: von generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNode erkannt"
        );
        this.selectedNodeArbeitskopie = Object.assign({}, value);
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
          // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
          // welcher die Baueigenschaften mit ihren Werten enthält:
          this.projiziereBaueigenschaftenAnKnotenAufProfil(
            this.selectedNodeArbeitskopie,
            this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
          );
          // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
          // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
          // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelAusgewaehlterKnoten
          this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
            this.nodes[0],
            this.selectedNodeArbeitskopie,
            this.ausgewaehltesBaueigenschaftsProfil.zugeordneteBaueigenschaften // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
          );
          console.log("Vor Join");
          // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld bezeichnungWerteVererbenderElternknoten
          // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
          // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld bezeichnungWerteVererbenderElternknoten
          // die Bezeichnung des Elternknotens anhängen, an dem die Eigenschaft erstmals
          // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
          // bezeichnungWerteVererbenderElternknoten stattdessen null
          // Dieses Feld wird in den :disable-Funktionen abgefragt, um zu verhindern, dass eine im
          // Elternpfad weiter oben definierte Baueigenschaft verändert wird - dies wäre ein Verstoß gegen die Vererbungsregel!
          var joinResult = this.innerJoin(
            this.profilModelAusgewaehlterKnoten,
            this.eigenschaftenAusEltern,
            ["typbezogeneBaueigenschaft", "_id"], // Spezifiziert die zu joinende Baueigenschaft im ersten Array
            "idTypbezogeneBaueigenschaft" // Spezifiziert die zu joinende Baueigenschaft im zweiten Array
            // Joined die beiden Arrays:
            // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
            // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
            // Diese werden gejoined zu einem gemeinsamen Array
          );
          this.profilModelAusgewaehlterKnoten = joinResult;
          console.log(
            "Nach Join - profilModelAusgewaehlterKnoten:",
            this.profilModelAusgewaehlterKnoten
          );
          // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
          //-----------------------------------------------------------------------------------------------------------------------------
          // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
          for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
            let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                "Datumswertepaar"
            ) {
              if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
                this.profilModelAusgewaehlterKnoten[
                  i
                ].datumsWert1 = date.formatDate(
                  eigenschaft.datumsWert1,
                  "DD.MM.YYYY"
                );
              }
              console.log(
                "profilModelAusgewaehlterKnoten[i].datumsWert1: ",
                this.profilModelAusgewaehlterKnoten[i].datumsWert1
              );
            }
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Datumswertepaar"
            ) {
              if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
                this.profilModelAusgewaehlterKnoten[
                  i
                ].datumsWert2 = date.formatDate(
                  eigenschaft.datumsWert2,
                  "DD.MM.YYYY"
                );
              }
              console.log(
                "profilModelAusgewaehlterKnoten[i].datumsWert2: ",
                this.profilModelAusgewaehlterKnoten[i].datumsWert2
              );
            }
            //-----------------------------------------------------------------------------------------------------
            // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
            // profilModelAusgewaehlterKnoten in Strings um, für Verwendung von
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
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.tagesZeitWert1,
                "HH:mm"
              );
              console.log(
                "profilModelAusgewaehlterKnoten[i].tagesZeitWert1: ",
                this.profilModelAusgewaehlterKnoten[i].tagesZeitWert1
              );
            }
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Tageszeitwertepaar"
            ) {
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.tageszeitsWert2,
                "HH:mm"
              );
              console.log(
                "profilModelAusgewaehlterKnoten[i].tagesZeitWert2: ",
                this.profilModelAusgewaehlterKnoten[i].tagesZeitWert2
              );
            }
            */
          }
        }
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von generisches-baueigenschafts-profil-formular.vue"
    );
    this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl im generischen Formular
    this.readZugehoerigesProfil().then(() => {
      console.log("Erstelle Arbeitskopie des im Baum selektierten Knotens");
      this.selectedNodeArbeitskopie = Object.assign({}, this.selectedNode);
      if (this.selectedNode !== null && this.selectedNode !== undefined) {
        // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
        // welcher die Baueigenschaften mit ihren Werten enthält:
        this.projiziereBaueigenschaftenAnKnotenAufProfil(
          this.selectedNodeArbeitskopie,
          this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
        );
        // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
        // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
        // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelAusgewaehlterKnoten
        this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
          this.nodes[0],
          this.selectedNodeArbeitskopie,
          this.ausgewaehltesBaueigenschaftsProfil.zugeordneteBaueigenschaften // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
        );
        console.log("Vor Join");
        // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld bezeichnungWerteVererbenderElternknoten
        // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
        // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld bezeichnungWerteVererbenderElternknoten
        // die Id des Elternknotens anhängen, an dem die Eigenschaft erstmals
        // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
        // bezeichnungWerteVererbenderElternknoten stattdessen null
        // Dieses Feld wird in den :disable-Funktionen abgefragt, um zu verhindern, dass eine im
        // Elternpfad weiter oben definierte Baueigenschaft verändert wird - dies wäre ein Verstoß gegen die Vererbungsregel!
        var joinResult = this.innerJoin(
          this.profilModelAusgewaehlterKnoten,
          this.eigenschaftenAusEltern,
          ["typbezogeneBaueigenschaft", "_id"], // Spezifiziert die zu joinende Baueigenschaft im ersten Array
          "idTypbezogeneBaueigenschaft" // Spezifiziert die zu joinende Baueigenschaft im zweiten Array
          // Joined die beiden Arrays:
          // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
          // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
          // Diese werden gejoined zu einem gemeinsamen Array
        );
        this.profilModelAusgewaehlterKnoten = joinResult;
        console.log(
          "Nach Join - profilModelAusgewaehlterKnoten:",
          this.profilModelAusgewaehlterKnoten
        );
        // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
        //-----------------------------------------------------------------------------------------------------------------------------
        // NEU: Fix für #295 - diese Konvertierungen bei mounted: fehlten hier!!!
        // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um,
        // für Verwendung mit Quasar QDate Picker, welcher String-Format erfordert
        for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
          let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert1 = date.formatDate(
                eigenschaft.datumsWert1,
                "DD.MM.YYYY"
              );
            }
            console.log(
              "profilModelAusgewaehlterKnoten[i].datumsWert1: ",
              this.profilModelAusgewaehlterKnoten[i].datumsWert1
            );
          }
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
              this.profilModelAusgewaehlterKnoten[
                i
              ].datumsWert2 = date.formatDate(
                eigenschaft.datumsWert2,
                "DD.MM.YYYY"
              );
            }
            console.log(
              "profilModelAusgewaehlterKnoten[i].datumsWert2: ",
              this.profilModelAusgewaehlterKnoten[i].datumsWert2
            );
          }
          //-----------------------------------------------------------------------------------------------------
          // Analoger Code für QTime, wandelt alle Tageszeitwerte im Array
          // profilModelAusgewaehlterKnoten in Strings um, für Verwendung von
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
            this.profilModelAusgewaehlterKnoten[
              i
            ].datumsWert1 = date.formatDate(
              eigenschaft.tagesZeitWert1,
              "HH:mm"
            );
            console.log(
              "profilModelAusgewaehlterKnoten[i].tagesZeitWert1: ",
              this.profilModelAusgewaehlterKnoten[i].tagesZeitWert1
            );
          }
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
            "Tageszeitwertepaar"
          ) {
            this.profilModelAusgewaehlterKnoten[
              i
            ].datumsWert2 = date.formatDate(
              eigenschaft.tageszeitsWert2,
              "HH:mm"
            );
            console.log(
              "profilModelAusgewaehlterKnoten[i].tagesZeitWert2: ",
              this.profilModelAusgewaehlterKnoten[i].tagesZeitWert2
            );
          }
          */
        }
        // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden!
        // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format zurückverwandelt werden,
        //       denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
        //       Hinweis: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
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
      }
    });
  } // /mounted:
};
</script>
