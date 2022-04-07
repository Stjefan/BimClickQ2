<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Read-only-Variante der Vue-Komponente für generisches Baueigenschaftsprofilformular                                           -->
  <!-- Rendered, abhängig vom ausgewählten Baueigenschaftsprofil ein QForm für alle Felder im Profil - die Reihenfolge ist dabei     -->
  <!-- einstweilen so, wie diese vom Backend kommen                                                                                  -->
  <!-- BESONDERHEIT: Die Eingabefelder bleiben alle disabled bzw. sind readonly, daher ist kein Zugriff auf die Knoten im Pfad       -->
  <!-- erforderlich, um das Feld bezeichnungVererbenderElternKnoten zu setzen für :disable!!!                                        -->
  <!-- Daher wird der Komponente nur die Prop selectedKey mitgegeben, mittels dieses Keys holt sie die Baueinheit oder den Baustoff  -->
  <!-- vom Backend (statt sie wie die reguläre Variante in selectedNode übergeben zu bekommen)                                       -->
  <!-- Diese Variante der Komponente benötigt keine submit-Methode und keine reset-Methode, da read only!                            -->
  <!-- TODO: Konfigurierbares Layout mit Selektions- (d.h. Auswahl, welche Baueigenschaften aus dem Profil im Form als Felder        -->
  <!-- angezeigt werden), Sortier- und Strukturierungsmöglichkeiten (Unter-Tabs, Rubriken), etc.                                     -->
  <!-- HINWEIS: Neben diesr Vue-Komponente für ein generisches Baueigenschaftsprofilformular gibt es spezifische Vue-Komponenten mit -->
  <!-- spezifischen Baueigenschaftsprofilformularen für Bauvorhaben, Standort, Gebäude, Geschoss, Bodenaufbau, Schicht, etc.         -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- NEU - @MS: Die Komponente enabled, dass sie auch für Profile im Baustoffbaum verwendet werden kann (Aufruf nun in             -->
  <!--            baueinheiten.vue und baustoffe.vue - dafür neue prop baum zur Fallunterscheidung!                                  -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <q-form v-if="selectedKey != null">
    <!-- RELIKT:  Die null-Prüfung von profilModelAusgewaehlterKnoten hier ist unbedingt notwendig, da der Array profilModelAusgewaehlterKnoten, während das Template erstmals gerendered wird, -->
    <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
    <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
    <!--          profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
    <div v-if="profilModelAusgewaehlterKnoten != null">
      <div class="text-subtitle1 q-pa-none">
        <span v-if="$props.baum === 'Bauvorhabenbaum'">
          Fachliche Planung für die
        </span>
        <span v-else> <strong>Fachliche Daten</strong> des </span>
        <span v-if="$props.baum === 'Bauvorhabenbaum'">
          links ausgewählte
        </span>
        <span v-else>
          links ausgewählten
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
        <!-- ALT: zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung -->
      </div>
      <q-separator />
      <div class="q-pa-xs row full-width items-start">
        <div class="col-md-5 col-12 q-pr-sm">
          Im Dropdown-Menü rechts das <b>Baueigenschaftsprofil</b> auswählen,
          für das die Werte der diesem Profil zugeordneten Baueigenschaften an
          dem links im Baum <b>ausgewählten Knoten</b> unten angezeigt werden
          sollen
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
          <b>Hinweise:</b> In diesem Formular sind keine Werteeingaben möglich.
          Änderungen von Baustoffdaten können von Administratoren im Tab
          "Baustoffe" vorgenommen werden.
        </div>
      </div>
    </div>
    <!--
      ausgewaehltesBaueigenschaftsProfil:
      {{ ausgewaehltesBaueigenschaftsProfil }}
      profilModelAusgewaehlterKnoten:
      {{  profilModelAusgewaehlterKnoten  }}
      -->
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
        <div class="col-md-1 col-12 q-pl-sm">
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
          <!-- ==================================================================================================================== -->
          <!-- NEU: Alle Eingabefelder :readonly statt :disable, sonst werden Tooltips nicht angezeigt!!!                           -->
          <!-- ==================================================================================================================== -->
          <!-- ALT: -->
          <!--
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
          -->
          <q-input
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Kennwertepaar'
            "
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.kennWert1"
            type="number"
            bg-color="teal-2"
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
                eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.bezeichnungsWert1"
            bg-color="teal-2"
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.tagesZeitWert1"
            bg-color="teal-2"
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
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    :readonly="alleFelderSindReadOnly"
                    v-model="eigenschaft.tagesZeitWert1"
                    mask="HH:mm" />
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
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Datumswertepaar'
            "
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs self-top"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.datumsWert1"
            bg-color="teal-2"
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
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    :readonly="alleFelderSindReadOnly"
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.aufzaehlungsWert"
            :options="
              eigenschaft.typbezogeneBaueigenschaft
                .selektierbareOptionenAufzaehlungsWert
            "
            bg-color="teal-2"
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
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
            "
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.wahrheitsWert"
            bg-color="teal-2"
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
            class="col-md-1 col-12 q-pa-xs q-gutter-xs"
            :src="eigenschaft.typbezogeneBaueigenschaft.einheit"
            />
            <div v-else class="col-md-1 col-12 q-pa-xs q-gutter-xs"></div>
            -->
          <!-- Ende 1. Spalte für die Input-Felder (QInput, QSelect, QToggle)  -->
          <!-- --------------------------------------------------------------- -->
          <!-- Leerspalte: -->
          <!--
              <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
              </div>
            -->
          <!-- Start 2. Spalte für die Input-Felder (QInput) bei Wertepaaren   -->
          <q-input
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
            "
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.kennWert2"
            type="number"
            bg-color="teal-2"
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.tagesZeitWert2"
            bg-color="teal-2"
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
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time
                    :readonly="alleFelderSindReadOnly"
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.datumsWert2"
            bg-color="teal-2"
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
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    :readonly="alleFelderSindReadOnly"
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
            :readonly="alleFelderSindReadOnly"
            class="col-md-3 col-12 q-pa-xs q-gutter-xs"
            :label="
              eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
            "
            v-model="eigenschaft.bezeichnungsWert2"
            bg-color="teal-2"
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
    <!-- Spezielle Button Section zur Ansteuerung diverser Aktionen: -->
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <!-- ALT: style="width: 90%" -->
      <!-- Funktion aktuell disabled, da experimentell: -->
      <div class="col-md-9 col-12">
        <q-btn
          dense
          :disable="selectedNodeTreeBaueinheiten == null"
          color="purple-6"
          class="stretch full-width"
          style="height: 100%"
          text-color="white"
          glossy
          label="Werte aus ausgewähltem Baustoff in ausgewählte Baueinheit übertragen"
          no-caps
          @click="uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit()"
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
import KorrespondierendeBaueigenschaften from "../modules/korrespondierende-baueigenschaften.js";
//----------------------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  props: [
    "profilBezeichnung", // Hier kann die Bezeichnung eines anzuzeigenden Baueigenschaftsprofils mitgegeben werden
    "baum", // NEU: String zur Fallunterscheidung, ob die Komponente im Bauvorhaben- oder im Baustoffbaum arbeitet, wahlweise "Bauvorhabenbaum" oder "Baustoffbaum"
    // Wird aktuell nur in baueinheiten.vue für den dortigen Baustoffbaum für die zugeordneten Baustoffe benutzt, mit baum === "Baustoffbaum"
    "selectedKey", // selectedKeyTreeBaueinheiten bzw. selectedKeyTreeBaustoffe
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    "selectedNodeTreeBaueinheiten" // selectedNodeTreeBaueinheiten - für das Laden von Werten aus einem im Baustoffbaum ausgewählten Baustoff in eine im Bauvorhabenbaum ausgewählte Baueinheit
    // Nur relevant mit baum ==== "Baustoffbaum"
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // ACHTUNG: Kann theoretisch auch null sein, aber aktuell können keine Baueinheiten abgewählt werden im Bauvorhabenbaum in baueinheiten.vue
    // ACHTUNG: Dafür ist auch ein watch() sinnvoll!
    //==========================================================================================================================================================
    // ACHTUNG: Zusätzlich wird Event refresh-request-baueigenschafts-profil ausgelöst, auf den mit nicht optimiertem Refresh reagiert wird in baueinheiten.vue!
    //==========================================================================================================================================================
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data: function() {
    return {
      korrespondierendeBaueigenschaften: KorrespondierendeBaueigenschaften, // NEU, für die Zuordnung von Baueigenschaften zwischen Baustoffen und Baueinheiten
      alleFelderSindReadOnly: true, // Konstante, um im Template alle Eingabefelder zu disablen!
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      profilModelAusgewaehlterKnoten: null, // Array für die Speicherung aller im Profilformular enthaltenen Baueigenschaften, mit deren aktuellen Werten (am ausgewählten Knoten)
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      selectedNode: null, // NEU - spezifisch für read-only-generisches-baueigenschafts-profil.vue, ist im regulären generischen Profilformular eine Prop!
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
        console.log(
          "***ACHTUNG*** - Profil 'Baustoff > Estrich': Profil Model wird sortiert!"
        );
        var sortOrderBaueigenschaftenImProfilEstrich = [
          // "Baustoff > Estrich > Bauart", // 0 // NEU - #380: BEg gelöscht
          "Baustoff > Estrich > Bindemittelart",
          "Baustoff > Estrich > Einbauart",
          "Baustoff > Estrich > Biegezugfestigkeitsklasse",
          // Bis hier selbe Reihenfolge wie die korrespondierende Baueigenschaften im Profilformular "Schicht"!
          "Baustoff > Estrich > Härteklasse",
          "Baustoff > Estrich > Druckfestigkeitsklasse",
          "Baustoff > Estrich > Oberflächenhärteklasse" // 6
        ];
        projizierteBaueigenschaftenAnKnoten.sort((a, b) => {
          // console.log("a: ", a)
          // console.log("b: ", b)
          return (
            sortOrderBaueigenschaftenImProfilEstrich.indexOf(
              a.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
            ) -
            sortOrderBaueigenschaftenImProfilEstrich.indexOf(
              b.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
            )
          );
        });
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

    innerJoin(arr1, arr2, keyArr1, keyArr2) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Wird in dieser Komponente nicht aufgerufen, weil hier keine Vererbungsinformation in das Profil-Model eingetragen wird
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

    getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff(
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
          // console.log("Aufzählungswert");
          zielBaueigenschaft.aufzaehlungsWert =
            quellBaueigenschaft.aufzaehlungsWert;
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

    pruefeDefiniertheitVonEigenschaft(eigenschaft) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // DAs Original dieser Funktion kommt aus generisches-baueigenschafts-profil-formular.vue
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

    profilIstAktiviertAnNode: function(
      node,
      baueigenschaftsProfilBezeichnung
      // Hilfsfunktion
    ) {
      console.log("In profilIstAktiviertAnNode()");
      let indexZugeordneteBaueigenschaftsProfile = node.zugeordneteBaueigenschaftsProfile.findIndex(
        arg =>
          arg.referenzAufBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung ===
          baueigenschaftsProfilBezeichnung // NEU: Für #272/#515
        // Siehe https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
      );
      if (indexZugeordneteBaueigenschaftsProfile > -1) return true;
      else return false; // Profil ist nicht am Knoten aktiviert
    },

    profilIstAktiviertAnNodeUndNodeIstUntersterKnotenAnDemProfilAktiviertIst: function(
      node,
      baueigenschaftsProfilBezeichnung
      // Hilfsfunktion
    ) {
      console.log(
        "In profilIstAktiviertAnNodeUndNodeIstUntersterKnotenAnDemProfilAktiviertIst()"
      );
      let indexZugeordneteBaueigenschaftsProfile = node.zugeordneteBaueigenschaftsProfile.findIndex(
        arg =>
          arg.referenzAufBaueigenschaftsProfil
            .baueigenschaftsProfilBezeichnung ===
          baueigenschaftsProfilBezeichnung // NEU: Für #272/#515
        // Siehe https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
      );
      if (indexZugeordneteBaueigenschaftsProfile > -1) {
        if (
          node.zugeordneteBaueigenschaftsProfile[
            indexZugeordneteBaueigenschaftsProfile
          ].istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst
        ) {
          return true;
        // Profil ist am untersten Knoten im Pfad aktiviert
        } else return false; // Profil ist nicht am untersten Knoten im Pfad aktiviert
      } else return false; // Profil ist nicht am untersten Knoten im Pfad aktiviert
    },

    uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit() {
      //---------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Unvollständiger Status - bisher nur für Profil "Estriche"!!!
      // Uebertragt Werte der Baueigenschaften am ausgewählten Baustoff in korrespondierende (Ist-)Werte an der ausgewählten Baueinheit
      // Benutzt dazu die Hilfsfunktion getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff()
      // sowie uebertrageWerteVonBaueigenschaft()
      //---------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Die Übertragung funktioniert auch ohne $set in uebertrageWerteVonBaueigenschaft(), allerdings werden die übertragenen Werte
      // nur im Tab "Baueigenschaften" aktualisiert und angezeigt (für das Profil "Baustoff > Estrich" unter "Baueinheit > Schicht > Estrich > ..."), da die
      // Profilformulare für "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht" die Felder in Kopien vorhalten. Erst falls Speichern und Refresh gemacht würde,
      // würden diese dort auch angezeigt!
      // ACHTUNG: Ein Speichern der ersten Istwert-Baueigenschaft "Baueinheit > Schicht > Estrich > Bauart" aus dem Tab "Baueigenschaften", deren Wert vorher
      //          mit dieser Funktion gesetzt wurde, ist
      //          zwar erfolgreich, führt aber beim anschließenden Navigieren im Bauvorhabenbaum zum Bodenaufbau in "Fachliche Planung" zur Anzeige
      //          von nur noch 3 statt 9 Schichten - also Vorsicht! Auch das Flag "ererbtNichtGesetzt" steht dabei fälschlich auf true für diese Baueigenschaft.
      //          Dieses stand allerdings, warum auch immer, schon im Array pseudoProfilModelIstwerteAnBaueinheit überall auf true statt false,
      //          obwohl es in den kopierten Istwerten vorher auf false stand per Log - vermutlich eine Inkonsitenz in den Testdaten,
      //          mit frischen Testdaten nicht reproduzierbar!
      // ACHTUNG: Aufruf ist nur sinnvoll bei baum === "Baustoffbaum"!
      //---------------------------------------------------------------------------------------------------------------------------------------
      // TODO XXXXXX - erforderlicher Ablauf:
      // 0. Für alle Arten von Baustoffprofilen verallgemeinern
      // 1. DEFER - Prüfen, ob Baustoffprofil aktiviert ist am Baustoff - geht nicht ohne Population von zugeordneteBaueigenschaftsProfile
      // 2. DONE - Prüfen, ob die ausgewählte Baueinheit der unterste Knoten ist, an dem das Profil "Baueinheit > Schicht" aktiviert ist!
      // 3. DONE - Prüfen, ob bei ausgewählter Baueinheit mit aktiviertem Profil "Baueinheit > Schicht" der zum Baustoffprofil passende Schichttyp (z.B. "Estrich") definiert ist
      // 4. DONE - Prüfen, ob die Istwerte an der Baueinheit auch aktiviert sind - diese werden in uebertrageWerteVonBaueigenschaft() ansonsten unkonditionell übertragen aus den Werten am Baustoff
      // 5. DONE - Vor Submit Definiertheit an der Quelle prüfen, mit Funktion pruefeDefiniertheitVonEigenschaft() - als Teil von 7. erledigt
      // 6. DEFER - Wertevererbung überprüfen - Übertragung nur, wenn nicht ererbte definierte Werte vorhanden sind - für den Use Case "Schicht" müsste allerdings
      //    der Fall vorliegen, dass die Schichteigenschaften nicht bereits weiter oben im Bauvorhabenbaum definiert sind, da sie schichtspezifisch sind.
      // 7. DONE - Flag für definiert setzen, könnte erledigt werden ähnlich wie in spezifischen Profilformularen:
      //    istwertBaueigenschaftAnBaueinheit.definiertNichtUndefiniert = this.pruefeDefiniertheitVonEigenschaft(istwertBaueigenschaftAnBaueinheit)
      // 8. ACHTUNG: Eventuell müssen noch mehr Flags gesetzt werden, z.B. ererbtNichtGesetzt, was (siehe Testfall oben) bei manchen Testläufen fälschlich true
      //    war - vermutlich eine Inkonsistenz in den Testdaten!
      // 0. DONE - Spezifischer Submit der beteiligten Werte an die Zielbaueinheit mit anschließendem Refresh
      //----------------------------------------------------------------------------------------------------------------------------------------
      // Komplex - daher mit folgender ALTERNATIVE unten implementiert:
      // Temporär ein "Pseudo-Profil-Model" für die ausgewählte Baueinheit aufbauen mit den korrespondierenden Istwert-Baueigenschaften
      // statt direkter Updates auf selectedNodeTreeBaueinheiten - dieses dann submitten an baueinheiten.controller.updateManyWerteBaueigenschaftenAnBaueinheit()
      // Der Array beim Submit muss aus Objekten der Form { idTypbezogeneBaueigenschaft, <wertbezogene Felder, typbezogeneBaueigenschaft: { <typbezogene Fedler> } } aufgebaut sein.
      // ACHTUNG: idTypbezogeneBaueigenschaft muss dabei doch nicht enthalten sein!
      // Der Code zum Aufbau konnte aus mounted() von spezifischen Profilformularen entnommen werden, dito der Code für das submit.
      // Damit funktioniert 8.!!!
      // ACHTUNG: Das Feld ererbtNichtGesetzt stand anfänglich nach dem Submit fälschlich auf true - vermutlich eine Inkonsistenz in den Testdaten,
      //          mit frischen Testdaten nicht reproduzierbar!
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // Zunächst diverse Validierungen:
      console.log("In uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit() ");
      if (this.baum !== "Baustoffbaum") {
        console.log(
          "Achtung: Aufruf dieser Funktion darf nur aus dem Baustoffbaum erfolgen!"
        );
        return;
      }
      // console.log("***ACHTUNG***: Funktion ist aktuell disabled!") // Erster Sniff Test war ok, aber Code sicherheitshalber disabled, wegen noch fehlenden Prüfungen für TODOs oben!

      const baueigenschaftsProfilBezeichnungBaustoff = "Baustoff > Estrich"; // TODO XXXXXX - bisher nur testweise für dieses Profil
      // Prüfen, ob Profil "Baustoff > Estrich" aktiviert ist an Baustoff:
      // ACHTUNG: Dies kann so nicht geprüft werden, weil zugeordneteBaueigenschaftsProfile nicht populiert sind im Baustofbaum innerhalb von baueinheiten.vue!!!
      /*
      let profilIstAktiviertAnBaustoff = this.profilIstAktiviertAnNode(
        this.selectedNode,
        baueigenschaftsProfilBezeichnungBaustoff
      );
      if (!profilIstAktiviertAnBaustoff) {
        console.log(
          "FEHLER/ERROR: Profil ist nicht aktiviert am ausgewählten Baustoff"
        );
        return;
      }
      */
      // Prüfen, ob Profil "Baueinheit > Schicht" aktiviert ist an Baueinheit und BAueinheit der unterste Knoten ist, an dem Profil aktiviert ist:
      const baueigenschaftsProfilBezeichnungBaueinheit = "Baueinheit > Schicht";
      let aktivierungsResult = this.profilIstAktiviertAnNodeUndNodeIstUntersterKnotenAnDemProfilAktiviertIst(
        this.selectedNodeTreeBaueinheiten,
        baueigenschaftsProfilBezeichnungBaueinheit
      );
      if (!aktivierungsResult) {
        console.log(
          "FEHLER/ERROR: Profil ist nicht aktiviert an ausgewählter Baueinheit oder Baueinheit ist nicht unterster Knoten, an dem Profil aktiviert ist"
        );
        return;
      }
      // Prüfen, ob Schichttyp "Estrich" ausgewählt ist an ausgewählter Schicht:
      // BEg: "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" in den Baueigenschaften in selectedNodeTreeBaueinheiten finden:
      if (baueigenschaftsProfilBezeichnungBaustoff === "Baustoff > Estrich") {
        const schichtTypBaueigenschaftsBezeichnung =
          "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ";
        let index = this.selectedNodeTreeBaueinheiten.baueigenschaften.findIndex(
          item =>
            item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            schichtTypBaueigenschaftsBezeichnung
        );
        if (index <= -1) {
          console.log(
            "FEHLER/ERROR: Baueigenschaft für Schichttyp nicht gefunden"
          );
          return;
        } else {
          // BEg für Schichttyp gefunden
          const schichtTyp = this.selectedNodeTreeBaueinheiten.baueigenschaften[
            index
          ].aufzaehlungsWert;
          console.log("schichtTyp: ", schichtTyp);
          if (schichtTyp !== "Estrich" && schichtTyp[0] !== "Estrich") {
            console.log(
              "FEHLER/ERROR: Schichttyp der ausgewählten Schicht ist nicht 'Estrich'"
            );
            return;
          }
        }
      } // else do nothing (TODO XXXXXX: Behandlung für andere Profile)

      var pseudoProfilModelIstwerteAnBaueinheit = []; // Pseudo-Profil-Model zur späteren Speicherung der Werte an der Baueinheit
      // Für alle Baueigenschaften im Profil-Model des ausgewählten Baustoffs
      for (let baueigenschaft of this.profilModelAusgewaehlterKnoten) {
        // Muss Baustoffbaum sein!
        const baueigenschaftsBezeichnung =
          baueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung;
        const baueigenschaftsZuordnungen = this.getKorrespondierendeBaueigenschaftenFuerBaueigenschaftAnBaustoff(
          baueigenschaftsProfilBezeichnungBaustoff,
          baueigenschaftsBezeichnung
        );
        if (baueigenschaftsZuordnungen == null) {
          // Inkludiert undefined bei Fehlern in korrespondierende-baueigenschaften.js
          console.log(
            "ERROR/FEHLER: Fehler beim Holen der korrespondierenden Baueigenschaften für Baustoff-Baueigenschaft: ",
            baueigenschaftsBezeichnung
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_WERTE_AUS_BAUSTOFF_UEBERTRAGEN_FEHLER
          );
          return;
        }
        // console.log("baueigenschaftsZuordnungen: ", baueigenschaftsZuordnungen)
        const istwertBaueigenschaftenAnBaueinheit = this.selectedNodeTreeBaueinheiten.baueigenschaften.filter(
          element =>
            // Übertragung in die korrespondierenden Eigenschaften an der Baueinheit, z.B. Schicht:
            element.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            baueigenschaftsZuordnungen.istwertAnBaueinheit
          // Alternativ hier in eine Testbaueigenschaft übertragen:
          // element.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung === "Allgemein > Test > Wertetypen > Kreditwürdigkeit" // Für Tests
        ); // ACHTUNG: filter() liefert null oder Array!
        if (istwertBaueigenschaftenAnBaueinheit.length > 0) {
          // Korrespondierende istwertBaueigenschaftAnBaueinheit gefunden
          const istwertBaueigenschaftAnBaueinheit =
            istwertBaueigenschaftenAnBaueinheit[0];
          console.log(
            "istwertBaueigenschaftAnBaueinheit: ",
            istwertBaueigenschaftAnBaueinheit
          ); // ACHTUNG: Ist Array der Länge 1!
          // Überprüfe, ob diese BEg an Baueinheit aktiviert ist:
          if (istwertBaueigenschaftAnBaueinheit.aktiviertNichtDeaktiviert) {
            const baueigenschaftAnBaustoff = this
              .profilModelAusgewaehlterKnoten[ // Muss Baustoffbaum sein!
              this.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung)
            ];
            if (baueigenschaftAnBaustoff != null) {
              console.log(
                "baueigenschaftAnBaustoff: ",
                baueigenschaftAnBaustoff
              );
              // Mache Kopie von istwertBaueigenschaftAnBaueinheit:
              const kopieIstwertBaueigenschaftAnBaueinheit = Object.assign(
                {},
                istwertBaueigenschaftAnBaueinheit
              );
              pseudoProfilModelIstwerteAnBaueinheit.push(
                kopieIstwertBaueigenschaftAnBaueinheit
              );
              console.log(
                "pseudoProfilModelIstwerteAnBaueinheit.length - 1: ",
                pseudoProfilModelIstwerteAnBaueinheit.length - 1
              );
              this.uebertrageWerteVonBaueigenschaft(
                baueigenschaftAnBaustoff,
                pseudoProfilModelIstwerteAnBaueinheit[
                  pseudoProfilModelIstwerteAnBaueinheit.length - 1
                ]
              );
              // pseudoProfilModelIstwerteAnBaueinheit[pseudoProfilModelIstwerteAnBaueinheit.length-1].definiertNichtUndefiniert = true // ALT
              pseudoProfilModelIstwerteAnBaueinheit[
                pseudoProfilModelIstwerteAnBaueinheit.length - 1
              ].definiertNichtUndefiniert = this.pruefeDefiniertheitVonEigenschaft(
                pseudoProfilModelIstwerteAnBaueinheit[
                  pseudoProfilModelIstwerteAnBaueinheit.length - 1
                ]
              );
              console.log(
                "pseudoProfilModelIstwerteAnBaueinheit[pseudoProfilModelIstwerteAnBaueinheit.length-1].ererbtNichtGesetzt: ",
                pseudoProfilModelIstwerteAnBaueinheit[
                  pseudoProfilModelIstwerteAnBaueinheit.length - 1
                ].ererbtNichtGesetzt
              );
              // pseudoProfilModelIstwerteAnBaueinheit[pseudoProfilModelIstwerteAnBaueinheit.length-1].ererbtNichtGesetzt = false // Quick Fix,
              // um dieses Feld umzuschießen auf false, unklar, warum es sonst bei Testläufen auf true stand!!!
              // War vermutlich eine Inkonsistenz in den Testdaten - bei Testläufen mit frischen Daten nicht mehr reproduzierbar! Daher disabled.
            } else {
              console.log(
                "ERROR/FEHLER: Baueigenschaft nicht gefunden im Profil-Model des ausgewählten Baustoffs: ",
                baueigenschaftsBezeichnung
              );
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUEINHEIT_WERTE_AUS_BAUSTOFF_UEBERTRAGEN_FEHLER
              );
              return;
            }
          } else {
            console.log(
              "ERROR/FEHLER: Istwert-Baueigenschaft an Baueinheit ist nicht aktiviert für: ",
              baueigenschaftsZuordnungen.istwertAnBaueinheit
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEINHEIT_WERTE_AUS_BAUSTOFF_UEBERTRAGEN_FEHLER
            );
            return;
          }
        } else {
          console.log(
            "ACHTUNG: Keine Istwert-Baueigenschaft an Baueinheit gefunden für: ",
            baueigenschaftsZuordnungen.istwertAnBaueinheit
          );
          // Hier einfach weitermachen, überträgt so nur die Baueigenschaften, für die Istwert-Baueigenschaften existieren an Baueinheit
        }
      }
      console.log(
        "pseudoProfilModelIstwerteAnBaueinheit: ",
        pseudoProfilModelIstwerteAnBaueinheit
      ); // HINWEIS: Enthält kein Feld idTypbezogeneBaueigenschaft wie die regulären Profil-Models!!!
      //-------------------------------------------------------------------------------
      const apiRoute = process.env.API + "/Baueinheiten" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
      this.$axios
        .put(apiRoute, {
          idBaueinheit: this.selectedNodeTreeBaueinheiten._id,
          wertbezogeneBaueigenschaftenArray: pseudoProfilModelIstwerteAnBaueinheit // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
        })
        .then(success => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
          );
          this.$emit("refresh-request-baueigenschafts-profil"); // NEU: Event, neue Prop, nicht optimierter Refresh muss erfolgen!
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
          );
          this.$emit("refresh-request-baueigenschafts-profil"); // NEU: Event, neue Prop, nicht optimierter Refresh muss erfolgen!
        });
      //
    }
  },

  //***====================================================================================================================================== */
  computed: {
    // HINWEIS: Hier waren in alter Version in /historic-code Funktionen für spezifisches Baueigenschaftsprofilformular "Schicht"
  },
  //***=====================================================================================================================================
  watch: {
    selectedNodeTreeBaueinheiten: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNodeTreeBaueinheiten"
      // TODO XXXXXX
      // Dieser Watch darf nicht auf dem Profil-Model profilModelZuFilterndeBaueigenschaften arbeiten, sondern auf profilModelAusgewaehlterKnoten,
      // welches aber bisher noch gar nicht initial aufgebaut wird (müsste auch in mounted() erst aufgebaut werden).
      // Dieses wird aber hier gar nicht benötigt, denn es kann auf Baueigenschaften in selectedNode bei Bedarf auch direkt zugegriffen werden.
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch: von read-onlny-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNodeTreeBaueinheiten erkannt"
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

    ausgewaehltesBaueigenschaftsProfil: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop ausgewaehltesBaueigenschaftsProfil
      // immdediate: false, // TODO XXXXXX - hier nicht notwendig???
      handler: function() {
        console.log(
          "In watch von read-only-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
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
          // NICHT in dieser Variante der Komponente (da nicht benötigt für read only Felder): Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
          // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
          console.log(
            "profilModelAusgewaehlterKnoten:",
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

    selectedKey: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedKey"
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch: von read-only-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedKey erkannt"
        );
        // ACHTUNG: Bei Deselektion des ausgewählten Knotens im Baum kann selectedKey auch null sein!
        // Dies zunächst abfangen:
        if (value == null) {
          console.log(
            "neuer Wert von selectedKey ist null - profilModel und Arbeitskopie auch auf null setzen"
          );
          this.profilModelAusgewaehlterKnoten = null;
          this.selectedNodeArbeitskopie = null;
          return;
        }
        //-------------------------------------------------------------------------------------------
        // NEU - spezifisch für die Read-only-Version des generischen Baueigenschaftsprofilformulars:
        // Zunächst aus value (neuer Wert von selectedKey per Backend Call den selected Node holen:)
        let apiRoute = process.env.API;
        if (this.baum === "Bauvorhabenbaum") {
          apiRoute += "/Baueinheiten/";
        } else {
          apiRoute += "/Baustoffe/";
        }
        this.$axios
          .get(apiRoute + value) // value enthält den neuen selectedKey (id)
          .then(response => {
            console.log("response.data: ");
            console.log(response.data);
            this.selectedNode = response.data;
            console.log("Knoten wurde aus dem Backend geladen");
            //------------------------------------------------------------------------------------------
            this.selectedNodeArbeitskopie = Object.assign(
              {},
              this.selectedNode
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
              // NICHT in dieser Variante der Komponente (da nicht benötigt für read only Felder): Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
              // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
              console.log(
                "profilModelAusgewaehlterKnoten:",
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
          })
          .catch(error => {
            // NEU: Error Handling mit .catch
            console.log(
              "Error beim Laden des Knotens aus dem Backend - error: ",
              error
            );
          });
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von read-only-generisches-baueigenschafts-profil-formular.vue"
    );
    this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl im generischen Formular
    if (this.selectedKey != null) {
      // Hier null-Prüfung wegen API-Aufruf mit selectedKey als id unten nötig!
      this.readZugehoerigesProfil().then(() => {
        //-------------------------------------------------------------------------------------------
        // NEU - spezifisch für die Read-only-Version des generischen Baueigenschaftsprofilformulars:
        // Zunächst aus value (neuer Wert von selectedKey per Backend Call den selected Node holen:)
        let apiRoute = process.env.API;
        if (this.baum === "Bauvorhabenbaum") {
          apiRoute += "/Baueinheiten/";
        } else {
          apiRoute += "/Baustoffe/";
        }
        this.$axios
          .get(apiRoute + this.selectedKey) // Prop selectedKey enthält die id des zu ladenden und im Profilformular anzuzeigenden Knotens
          .then(response => {
            console.log("response.data: ");
            console.log(response.data);
            this.selectedNode = response.data;
            console.log("Knoten wurde aus dem Backend geladen");
            //------------------------------------------------------------------------------------------
            console.log(
              "Erstelle Arbeitskopie des im Baum selektierten Knotens"
            );
            this.selectedNodeArbeitskopie = Object.assign(
              {},
              this.selectedNode
            );
            if (this.selectedNode !== null && this.selectedNode !== undefined) {
              // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
              // welcher die Baueigenschaften mit ihren Werten enthält:
              this.projiziereBaueigenschaftenAnKnotenAufProfil(
                this.selectedNodeArbeitskopie,
                this.ausgewaehltesBaueigenschaftsProfil // ACHTUNG: Hier andere Variable als in spezifischen Profilformularen!!!
              );
              // NICHT in dieser Variante der Komponente (da nicht benötigt für read only Felder): Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
              // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht
              console.log(
                "profilModelAusgewaehlterKnoten:",
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
              //----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
            }
          })
          .catch(error => {
            // NEU: Error Handling mit .catch
            console.log(
              "Error beim Laden des Knotens aus dem Backend - error: ",
              error
            );
          });
      });
    } else {
      console.log("selectedKey ist null - nichts zu tun");
    }
  } // /mounted:
};
</script>
