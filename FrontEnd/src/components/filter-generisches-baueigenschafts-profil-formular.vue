<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Derivat der Read-only-Variante der Vue-Komponente für generisches Baueigenschaftsprofilformular                               -->
  <!-- Rendered, abhängig vom ausgewählten Baueigenschaftsprofil ein QForm zum Filtern nach Feldern im Profil - die Reihenfolge ist  -->
  <!-- dabei einstweilen so, wie diese vom Backend kommen                                                                            -->
  <!-- Diese Variante bekommt in selectedNodeTreeBaueinheiten ggf. die ausgewählte Baueinheit übergeben                              -->
  <!-- um aus der ausgewählten Baueinheit Sollwerte in die Filter-Felder zu laden en per Button                                      -->
  <!-- Diese Variante der Komponente benötigt keine submit-Methode und keine reset-Methode, da read only!                            -->
  <!-- TODO: Konfigurierbares Layout mit Selektions (d.h. Auswahl, welche Baueigenschaften aus dem Profil im Form als Felder         -->
  <!-- angezeigt werden-, Sortier- und Strukturierungsmöglichkeiten (Unter-Tabs, Rubriken), etc.                                     -->
  <!-- Zusätzliche prop baum zur Fallunterscheidung, in welchem Baum die Komponente operiert!                                        -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <q-form>
    <!-- In dieser Variante hier kein v-if="selectedKey != null" -->
    <!-- RELIKT:  Die null-Prüfung hier ist unbedingt notwendig, da der Array profilModelZuFilterndeBaueigenschaften, während das Template erstmals gerendered wird, -->
    <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
    <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
    <!--          profilModelZuFilterndeBaueigenschaften[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
    <div
      v-if="
        ausgewaehltesBaueigenschaftsProfil != null &&
          ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung !=
            null
      "
    >
      <!-- ohne die v-ifs Fehler beim Rendern beim Zugriff auf baueigenschaftsProfilBezeichnung, diese wird in mounted(), -->
      <!-- readZugehoerigesProfil() erst gesetzt! -->
      <div class="text-subtitle1 q-pa-none">
        <span>
          <strong>Filtern</strong>
        </span>
        <span v-if="$props.baum === 'Bauvorhabenbaum'">
          in Baueinheiten
        </span>
        <span v-else>
          in Baustoffen
        </span>
        gemäß Baueigenschaftsprofil
        <strong
          >"{{
            ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
          }}"</strong
        >
        <!-- ALT: zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung -->
      </div>
      <!--
      <div style="color: red">
        <b
          >[Hinweis: Beta-Funktion - Filterung bisher nur mit bestimmten
          Baueigenschaften!]</b
        >
      </div>
      -->
      <q-separator />
      <div class="q-pa-xs row full-width items-start">
        <div class="col-md-5 col-12 q-pr-sm">
          Im Dropdown-Menü rechts das <b>Baueigenschaftsprofil</b> auswählen,
          mit dessen Baueigenschaften bestimmte Baustoffe im Baum
          herausgefiltert werden sollen
          {{ displayRightArrow }}
        </div>
        <!-- QSelect zur Auswahl eines Baueigenschaftsprofils -->
        <!-- ACHTUNG: Initialisierung von ausgewaehltesBaueigenschaftsProfil erfolgt in readAlleBaueigenschaftsProfile()! -->
        <!-- ACHTUNG: Kein :disable hier! -->
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
        <!--          und https://quasar.dev/style/spacing#Table-of-permutations - pl steht für "padding left", "xs" für "extra small"-->
        <!-- ------------------------------------------------------------------------------------------------------------------------ -->
        <!-- ALT: -->
        <!--
        <div class="col-md-5 col-12 q-pl-sm">
          <b>Hinweise:</b> Unten mindestens einen <b>Wert für eine Filterbedingung</b> eingeben bzw. auswählen. Links im Baustoffbaum einen
            <b>Startknoten</b> für die Filterung auswählen. Dann Schaltfläche <b>"Baustoffe filtern"</b> drücken.
        </div>
        -->
      </div>
      <div class="q-pa-xs row full-width q-col-gutter-xs">
        <q-expansion-item
          label="Kurzanleitung"
          expand-separator
          :default-opened="false"
          dense
          class="stretch full-width"
          header-class="
          bg-grey-4 text-black text-bold shadow-2
        "
        >
          <div class="q-pa-xs">
            <ul>
              <li>
                In den Eingabefeldern unten mindestens einen
                <b>Wert für eine Filterbedingung</b> eingeben/auswählen.
                Beispiel für "Estrichbiegezugfestigkeit" als zu filternde
                Baueigenschaft: "F02 ≥ 2 N/mm2"
              </li>
              <li>
                Für jede Filterbedingung eine zugehörigen
                <b>Vergleichsoperator</b> für deren Filterung auswählen.
                Beispiel: Der Operator <b>"≥"</b> für obigen Wert "F02 ≥ 2
                N/mm2" sucht nach allen Baustoffen, die dieselbe oder eine
                größere Estrichbiegezugfestigkeit haben (d.h. "F02 ≥ 2 N/mm2",
                "F03 ≥ 3 N/mm2", "F04 ≥ 4 N/mm2", usw.). Die
                <b>Voreinstellung</b> für die Operatoren ist <b>"=".</b>
              </li>
              <li>
                Mehrere Filterbedingungen werden als
                <b>Und-Bedingungen</b> logisch verknüpft, d.h. es wird nach
                Baustoffen gesucht, die alle Filterbedingungen gleichzeitig
                erfüllen.
              </li>
              <li>
                Zusätzlich links im Baustoffbaum einen geeigneten
                <b>Startknoten</b> für die Filterung auswählen. Dieser muss vor
                Start der Filterung
                <span style="color: #ffffff; background-color: #1976d2">
                  <strong>
                    &nbsp; farblich markiert &nbsp;
                  </strong> </span
                >&nbsp; sein. Es werden dann in allen Zweigen
                <b>unterhalb</b> dieses Startknotens Baustoffe im Baustoffbaum
                gesucht, welche die Filterbedingungen erfüllen.
              </li>
              <li>
                Anschließend unten die Schaltfläche
                <b>"Baustoffe filtern"</b> drücken, um die Filterung zu starten.
              </li>
              <li>
                <b>Hinweis:</b> Ist aktuell <b>kein Knoten</b> oder ein
                <b>Blattknoten</b> im Baustoffbaum als Startknoten ausgewählt,
                bleibt die Schaltfläche <b>"Baustoffe filtern" deaktiviert.</b>
              </li>
              <li>
                Die Ergebnisse der Filterung werden links als
                <b>gefilterter Baustoffbaum</b> angezeigt. Es werden dabei
                <b>nur solche Unterzweige angezeigt,</b> die Baustoffe
                enthalten, welche die gewählten Filterbedingungen erfüllen.
              </li>
              <li>
                Liefert die Filterung nicht die gewünschten Ergebnisse, kann
                mittels der Schaltfläche oberhalb des Baustoffbaums
                <b>"Eingaben zurücksetzen/Baum neu laden"</b> wieder der
                vollständige Baustoffbaum mit den ursprünglichen Zuordnungen von
                Baustoffen zur ausgewählten Baueinheit geladen werden.
              </li>
            </ul>
          </div>
        </q-expansion-item>
      </div>
    </div>
    <!--
    ausgewaehltesBaueigenschaftsProfil:
    {{ ausgewaehltesBaueigenschaftsProfil }}
    profilModelZuFilterndeBaueigenschaften:
    {{  profilModelZuFilterndeBaueigenschaften  }}
    -->
    <div v-if="profilBezeichnung != null">
      <!-- ======================================================================================== -->
      <!-- Start Code für generisches Baueigenschaftsprofilformular mit v-for-Steuerung             -->
      <q-separator />
      <!-- ---------------------------------------------------------------------------------------- -->
      <div class="row q-pa-xs bg-grey-2">
        <!-- =========== ACHTUNG: In erster Spalte q-pl-none zusätzlich, sonst ist der Spaltentext dort zu weit rechts!!! ================== -->
        <div class="col-md-3 col-md-1 col-12 q-pl-none q-pr-xs q-pt-xs q-pb-xs q-gutter-xs">
          <b>Zu filternde Baueigenschaft</b>
        </div>
        <!-- Feld disabled, um Platz zu gewinnen für breitere Eingabefelder zur Anzeige der Bezeichnungen im Feld: -->
        <!--
        <div class="col-md-1 col-12 q-pl-sm">
          <b>Symbol</b>
        </div>
        -->
        <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
          <b>Einheit</b>
        </div>
        <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
          <b>Operator</b>
        </div>
        <div class="col-md-3 col-12 q-pa-xs q-gutter-xs">
          <b>Wert für die Filterbedingung</b>
        </div>
        <div class="col-md-1 col-12 q-pa-xs q-gutter-xs">
          <b>Operator</b>
        </div>
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
        v-for="eigenschaft in profilModelZuFilterndeBaueigenschaften"
        :key="eigenschaft.typbezogeneBaueigenschaft._id"
      >
        <!-- {{ eigenschaft.datumsWert1 }} -->
        <!-- {{ eigenschaft.aufzaehlungsWert }} -->
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
          <!-- Nur für Testzwecke: -->
          <!-- @input="kennWert1InputHandler($event, eigenschaft)" -->
          <!-- --------------------------------------------------------------- -->
          <!-- Spalte für Einheit: -->
          <q-markdown
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                'Kennwertepaar'
            "
            class="col-md-1 col-12 q-pa-xs self-top"
            :src="eigenschaft.typbezogeneBaueigenschaft.einheit"
          />
          <div v-else class="col-md-1 col-12 q-pa-xs q-gutter-xs self-top"></div>
          <!-- --------------------------------------------------------------------------------------------------------------------------------------------------- -->
          <!-- NEU: Start Spalte für Operator für Filterbedingung                                                                                                  -->
          <!-- HINWEIS: Das spezielle Profil Model für das generische Filterbaueigenschaftsprofilformular hat auch ein Feld operator für die Filterbedingung       -->
          <!-- Es wird erstmals geesetzt in erstelleProfilModel() Dieses Feld darf nicht verwechselt werden mit dem Feld operator in typbezogeneBaueigenschaft!    -->
          <!-- TODO XXXXXX: Für einen zweiten Operator bei Wertepaaren muss das Profil Model erweitert werden um ein Feld operator2 bzw. operator1 und operator2   -->
          <!-- --------------------------------------------------------------------------------------------------------------------------------------------------- -->
          <q-select
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
            class="col-md-1 col-12 q-pa-xs q-gutter-xs"
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            square
            dense
            label="
              Operator
            "
            v-model="eigenschaft.operator"
            :options="operatorOptions"
            option-label="label"
            emit-value
            map-options
          />
          <!-- ==================================================================================================================== -->
          <!-- ACHTUNG: Unbedingt auch an allen <div v-else> class="q-gutter-xs", sonst ist da ganze Layout vertikal nicht dense!!! -->
          <!-- ==================================================================================================================== -->
          <q-input
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                  'Kennwertepaar'
            "
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
                    :disable="
                      alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
                    "
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
                    :disable="
                      alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
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
          <!-- ACHTUNG: Hier kein "multiple" am QSelect, Default ist single Selection -->
          <q-select
            clearable
            v-else-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                'Aufzählungswert'
            "
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
          <!-- Ende 1. Spalte für die Input-Felder (QInput, QSelect, QToggle)  -->
          <!-- -------------------------------------------------------------------------------------------- -->
          <!-- Start 2. Spalte für die Input-Felder (QInput) bei Wertepaaren   -->
          <q-input
            v-if="
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
            "
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
                    :disable="
                      alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
                    :disable="
                      alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
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
            :disable="
              alleFelderSindReadOnly || !eigenschaft.aktiviertNichtDeaktiviert
            "
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
          <!-- {{ eigenschaft.aufzaehlungsWert }} -->
          <!-- Für Debugging -->
          <!--
          </div>
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
    <q-separator />
    <!----------------------------------------------------------------------------------------------------- -->
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
        />
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
      <pre v-html="JSON.stringify(filteredNodesTreeBaustoffe, null, 2)"></pre>
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
  data: function() {
    return {
      operatorOptions: [
        { label: "=", value: "$eq" },
        { label: "≥", value: "$gte" },
        { label: ">", value: "$gt" },
        { label: "≤", value: "$lte" },
        { label: "<", value: "$lt" },
        { label: "≠", value: "$ne" }
      ],
      korrespondierendeBaueigenschaften: KorrespondierendeBaueigenschaften, // NEU, für die Zuordnung von Baueigenschaften zwischen Baustoffen und Baueinheiten
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.

      filteredNodesTreeBaustoffe: null, // Array zum Lesen gefilterter Baustoffe
      alleFelderSindReadOnly: false, // Konstante, um im Template alle Eingabefelder zu disablen!
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      //----------------------------------------------------------------------------------------------------------------------------------
      profilModelAusgewaehlterKnoten: null, // Dies ist das Profil-Model für den ausgewählten Knoten im Bauvorhabenbaum, welches aus der Prop selectedKey befüllt werden muss (TODO XXXXXX)
      profilModelZuFilterndeBaueigenschaften: null, // Dies ist das Profil-Model für die im Filter-Formular angezeigten Baueigenschaften für die Filter-Felder (Baustoffeigenschaften!)
      // ACHTUNG: Diese werden nur zur Filterung verwendet, sie werden aktuell NICHT abgespeichert!
      // Array für die Felder aller im Profilformular für die Filterung enthaltenen Baueigenschaften, mit deren aktuellen Werten
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      // selectedNode: null, // Hier nicht benötigt
      // selectedNodeArbeitskopie: null, // Hier nicht benötigt
      // eigenschaftenAusEltern: null, // Hier nicht benötigt
      alleBaueigenschaftsProfile: [],
      // NEU: Für Auswahl eines Baueigenschaftsprofils - TODO:
      ausgewaehltesBaueigenschaftsProfil: null
      // bezeichnungenBaueigenschaftsProfile: ["TODO"],
      // indexMapFuerProfilModelAusgewaehlterKnoten: [] // Aktuell nicht verwendet, Map um statt per computed-Funktion findeIndexVonBaueigenschaftSchichtdicke den Index
      // für eine Baueigenschaft mit baueigenschaftsBezeichnung im Array profilModelZuFilterndeBaueigenschaften zu finden
      // Beispiel für Aufbau: {"Baueinheit > Schicht > Dicke": 17, ... }
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Baueinheit > Schicht > Dicke"] liefert dann den Index
      // Muss in mounted: initialisiert werden per Funktion baueIndexMapFuerProfilModelAusgewaehlterKnoten()
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet bzw. die in mounted vorinitialisierten Felder indexInProfilModelAusgewaehlterKnoten im Layout File
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
        // Diese Funktion formatiert sie um nach: "hh:mm"
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
            if (quellBaueigenschaft.aufzaehlungsWert.length > 0) { // Das erste Element aus dem Array nehmen, dieser hat, da nicht multiple Selection, normalerweise length 1!!!
              zielBaueigenschaft.aufzaehlungsWert = quellBaueigenschaft.aufzaehlungsWert[0];
              // Achtung: Per Browser Log gibt es auch den Fall [null] (Array mit einem Element null) - dieser wird hier mit erledigt!!!
            } else {
              // Sonst leerer Array [] - dies kommt auch vor per Browser Log!!!
              zielBaueigenschaft.aufzaehlungsWert = null; // null-Felder werden später nicht an das Backend geschickt
            }
          } else { // Kein Array, sondern String:
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
      // Die Funktion hier baut diese Map auf aus dem Array profilModelZuFilterndeBaueigenschaften
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet
      for (var eigenschaft of this.profilModelZuFilterndeBaueigenschaften) {
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
      let index = this.profilModelZuFilterndeBaueigenschaften.findIndex(
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

    erstelleProfilModel(profil) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------
      // Erzeugt erstmalig den Array profilModelZuFilterndeBaueigenschaften, welcher die Filter-Baueigenschaften mit ihren Werten enthält.
      // Die Werte aller Baueigenschaften sind in dieser Variante jedoch leer (leere Filter-Felder), nur die typbezogenen Felder
      // werden aus dem Baueigenschaftsprofil entnommen. Dieses enthält die Details zu allen Baueigenschaften im Profil in Unterfeldern - siehe Log-Ausgaben
      //----------------------------------------------------------------------------------------------------------------------------------------------------
      // DONE - profilModelAusgewaehlterKnoten umbenannt in profilModelZuFilterndeBaueigenschaften
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
      //-----------------------------------------------------------------------------------------------------------------------------------
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
      } // else { /* Do nothing */ }
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
      //--------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Originale Funktion zum Aufbau eines Profil-Models für den ausgewählten Knoten - wird hier für das Filter-Formular für Baustoffe
      // eventuell nicht benötigt
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
    }
  },
  //***====================================================================================================================================== */
  computed: {
    // HINWEIS: Hier waren in alter Version in /historic-code Funktionen für spezifisches Baueigenschaftsprofilformular "Schicht"
    mindestensEineFilterBedingungIstAusgefuellt() {
      // computed-Funktion, um zu bestimmen, ob mindestens eine Filterbedingung in den Eingabefeldern nicht null ist
      console.log("In mindestensEineFilterBedingungIstAusgefuellt (computed)");
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
    }
  },
  //***=====================================================================================================================================
  watch: {
    ausgewaehltesBaueigenschaftsProfil: {
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Watch auf Prop ausgewaehltesBaueigenschaftsProfil
      // immdediate: false, // TODO XXXXXX - hier nicht notwendig???
      handler: function() {
        console.log(
          "In watch von filter-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt"
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
            if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
            if (eigenschaft.datumsWert2 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von filter-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNodeTreeBaueinheiten erkannt"
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
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von filter-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedKeyTreeBaustoffe erkannt"
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
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch() von filter-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNodeTreeBaustoffe erkannt"
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
      "In mounted() von filter-generisches-baueigenschafts-profil-formular.vue"
    );
    this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl im generischen Formular

    // ACHTUNG: Hier keine null-Prüfung auf selectedKey!
    // Der Knoten im Baustoffbaum für die zugeordneten Baustoffe wird gar nicht gelesen, denn
    // dessen Werte sind für die Filterung hier irrelevant!
    this.readZugehoerigesProfil()
      .then(() => {
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
        // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
        //-----------------------------------------------------------------------------------------------------------------------------
        // NEU: Fix für #295 - diese Konvertierungen bei mounted: fehlten hier!!!
        // Folgender Code wandelt alle Datumswerte im Array profilModelZuFilterndeBaueigenschaften in Strings um,
        // für Verwendung mit Quasar QDate Picker, welcher String-Format erfordert
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
            if (eigenschaft.datumsWert1 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
            if (eigenschaft.datumsWert2 != null) { // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
        //----------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        //=======================================================================================================================================
      })
      .catch(error => {
        // NEU: Error Handling mit .catch
        console.log(
          "Error beim Laden des ausgewählten Baueigenschaftsprofils aus dem Backend - error: ",
          error
        );
      });
  } // /mounted:
};
</script>
