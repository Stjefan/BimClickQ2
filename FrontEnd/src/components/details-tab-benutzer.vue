<!-- Komponente zur Bearbeitung oder Neuanlage eines Benutzers -->
<template>
  <!-- ALT: style="min-width: 1000px" -->
  <!-- ---------------------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Muster-QForm für Validation mit interner Quasar Validation                                                                               -->
  <!-- Vorlage: https://quasar.dev/vue-components/form#Usage und https://codepen.io/pen/?editors=1010                                           -->
  <!-- Sowie: https://quasar.dev/vue-components/input#QInput-API                                                                                -->
  <!-- ACHTUNG:                                                                                                                                 -->
  <!-- Ein QForm mit QBtns, die die üblichen @clicke-Methoden haben, funktioniert nicht, sondern führt zu obskuren Fehlern,                     -->
  <!-- bei denen ein Refresh mit Route-Wechsel auf Route /Verwaltung? ausgelöst wird!!!                                                         -->
  <!-- QForms erfordern offenbar zwingend @submit-Methoden, und machen bei Felen default-mäßig einen solchen obskuren Refresh!                  -->
  <!-- Stattdessen ist die richtige Kombination für QForms:                                                                                     -->
  <!-- 1. QForm mit korrekter Syntax: wie hier, auf den Abschluss mit ">" HINTER den @submit- und @reset-Methoden achten!!!                     -->
  <!-- 2. Zum QForm (nicht den QBtns) gehörende @submit- und @reset-Methoden - diese sind inhaltlich identisch zu den bisher verwendeten        -->
  <!--    @click-Methoden an den Buttons "Speichern" bzw. "Zurücksetzen"                                                                        -->
  <!--    a) Die Semantik der @submit-Methode ist jedoch hier anders:                                                                           -->
  <!--       Erst wird automatisch geprüft und ggf. angezeigt, ob alle in den Eingabefeldern des QForms per :rules spezifizierten Validations   -->
  <!--       erfüllt sind - erst dann wird der Code in der @submit-Methode ausgeführt!                                                          -->
  <!--    b) Ein weiterer Unterschied ist, dass der Submit-Button nicht disabled werden sollte wie bisher mit eigenen :disable-Methoden, die    -->
  <!--       den Gesamtstand der Validierung aller Felder manuell per "||" abprüfen, sondern dass die :rules an den Feldern automatisch         -->
  <!--       abgearbeitet werden (ggf. können noch extra Prüfungen am Anfang der @submit-Methode selbst eingebaut werden, z.B. von              -->
  <!--       Toggle-Feldern, die keine :rules haben. Siehe Sample auf https://codepen.io/pen/?editors=1010                                      -->
  <!-- 2. :rules (mit lazy-rules Prop optional) für die einzelnen Feldvalidierungen an den q-inputs - diese werden am Anfang von @submit geprüft-->
  <!-- 3. a) An den Button(s) für "Speichern" type="submit" OHNE @click-Methode an den Buttons (stattdessen 2.)                                 -->
  <!--    b) Am Button für "Zurücksetzen" type="reset" OHNE zugehörige @click-Methode am Button (stattdessen 2.)                                -->
  <!-- ---------------------------------------------------------------------------------------------------------------------------------------- -->
  <q-form
    v-if="neuerOderAusgewaehlterBenutzer"
    @submit="createNeuenOderUpdateAusgewaehlterBenutzer"
    @reset="
      neuerOderAusgewaehlterBenutzer = benutzerCreator(
        zuManipulierenderBenutzer
      )
    "
  >
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <div v-if="localStore.state.debugMode">
        neuerOderAusgewaehlterBenutzer:
        {{ neuerOderAusgewaehlterBenutzer }}
      </div>
      <div v-if="$q.screen.gt.sm">
        <div v-if="modus == 'Neuanlage'" class="text-h6 q-pb-sm">
          Neuregistrierung eines Benutzerkontos
        </div>
        <div v-else class="text-h6 q-pb-sm">
          Details zum ausgewählten Benutzerkonto mit Benutzerkennung
          <strong>"{{ neuerOderAusgewaehlterBenutzer.benutzerKennung }}"</strong>
        </div>
      </div>
      <div v-else>
        <div v-if="modus == 'Neuanlage'" class="text-subtitle1 q-pb-sm">
          Neuregistrierung eines Benutzerkontos
        </div>
        <div v-else class="text-subtitle1 q-pb-sm">
          Details zum ausgewählten Benutzerkonto mit Benutzerkennung
          <strong>"{{ neuerOderAusgewaehlterBenutzer.benutzerKennung }}"</strong>
        </div>
      </div>
    </div>
    <div class="row full-width q-pa-xs q-col-gutter-xs inset-shadow">
      <!-- ACHTUNG: Hier q-col-gutter-md, nicht q-gutter-md, sonst wird die letzte Column gewrapped!!! -->
      <!-- 1. Spalte: -->
      <div class="col-md-3 col-12">
        <div>
          <b>Angaben zum Benutzerkonto</b>
        </div>
        <br />
        <div>
          <b>Festlegung der Benutzerkennung (= E-Mail-Adresse)</b>
        </div>
        <div>
          <!-- Erstes q-input hat Testcode zur Nutzung von rules: -->
          <!-- ALT:
            :rules="[
              v =>
                (v !== null && v !== '') || 'Benutzerkennung ist erforderlich',
              v =>
                (v && v.length <= 80) ||
                'Benutzerkennung darf höchstens 200 Zeichen lang sein'
            ]"
          -->
          <!-- NEU: rules:"eMailValidierung" -->
          <!-- NEU: Änderung der Benutzerkennung disablen, falls keine Neuanlage!!! -->
          <!-- NEU: type="email", siehe https://quasar.dev/vue-components/input#Input-types -->
          <!-- ACHTUNG: Funktioniert in Chrome per Test allerdings NICHT, daher wieder entfernt! -->
          <q-input
            :disable="!benutzerDarfBearbeitenBenutzer || modus != 'Neuanlage'"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="neuerOderAusgewaehlterBenutzer.benutzerKennung"
            :rules="eMailValidierung"
            label="Benutzerkennung"
            hint="Eindeutige Benutzerkennung (= E-Mail-Adresse)"
            hide-hint
          />
        </div>
        <div>
          <b>Weitere Angaben zum Benutzerkonto</b>
        </div>
        <div>
          <q-input
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="neuerOderAusgewaehlterBenutzer.vorName"
            label="Vorname"
            hint="Vorname (z.B. 'Bob')"
            hide-hint
            :rules="vorNameErforderlich"
          />
        </div>
        <div>
          <q-input
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="neuerOderAusgewaehlterBenutzer.nachName"
            label="Nachname"
            hint="Nachname (z.B. 'Baumeister')"
            hide-hint
            :rules="nachNameErforderlich"
          />
        </div>
        <!-- NEU: Feld für Kennwort, nur bei Neuanlage: -->
        <!-- ALT: Vorläufige Kennwortvalidierung: -->
        <!--
           :rules="[
              v => (v !== null && v !== '') || 'Kennwort ist erforderlich',
              v =>
                (v && v.length >= 8) ||
                'Das Kennwort muss aus mindestens 8 Zeichen bestehen'
            ]"
        -->
        <!-- NEU: Kennwortvalidierung per Funktion -->
        <div v-if="modus === 'Neuanlage'">
          <!-- NEU: Natives Attribut "autocomplete" an input-Feldern platziert: -->
          <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
          <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
          <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
          <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
          <q-input
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="neuerOderAusgewaehlterBenutzer.kennWort"
            label="Kennwort"
            hint="Mindestens 8 Zeichen - auch Ziffern und Sonderzeichen sind erlaubt. Auf Groß- und Kleinschreibung achten. Die Anzeige des Kennworts per Klick auf das Icon rechts ein-/ausschalten."
            hide-hint
            :type="isPwd ? 'password' : 'text'"
            :rules="kennWortValidierung"
            autocomplete="new-password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              >
              </q-icon>
            </template>
          </q-input>
          <br />
          <!-- Platz für Hint -->
        </div>
        <!-- NEU: Feld zur Kontrolle des Kennworts, nur bei Neuanlage: -->
        <div v-if="modus === 'Neuanlage'">
          <q-input
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            dense
            v-model="neuerOderAusgewaehlterBenutzer.kennWortDuplikat"
            label="Kennwort (Bestätigung)"
            hint="Das oben eingegebene Kennwort zur Sicherheit hier ein zweites Mal eingeben"
            hide-hint
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              v =>
                (v && kennWortEingabenSindValide) ||
                'Die Kennworteingaben stimmen nicht überein'
            ]"
            autocomplete="new-password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              >
              </q-icon>
            </template>
          </q-input>
          <br />
          <!-- Platz für Hint -->
        </div>
        <div>
          <q-select
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            input-class="text-white"
            filled
            v-model="neuerOderAusgewaehlterBenutzer.benutzerRolle"
            :options="['Mitarbeiter', 'Redakteur', 'Administrator']"
            option-value="benutzerRolle"
            :multiple="false"
            label="Benutzerrolle auswählen/abwählen"
            hint="Benutzerrolle auswählen/abwählen (z.B. 'Baumeister')"
            hide-hint
            stack-label
            options-selected-class="text-primary"
            options-dense
            use-input
            input-debounce="0"
          >
          </q-select>
          <!-- /q-select für Referenz auf Bauinformation -->
          <!-- Platz für Hint und Dropdown-Menü schaffen: -->
          <br />
          <br />
          <br />
          <br />
          <br />
          <!--
          <q-select
            :disable="!benutzerDarfBearbeitenBenutzer"
            square
            bg-color="teal-2"
            standout="bg-teal-4 text-black"
            input-class="text-white"
            filled
            v-model="neuerOderAusgewaehlterBenutzer.benutzerGruppe"
            :options="[]"
            option-value="benutzerGruppe"
            :multiple="false"
            label="Benutzergruppe auswählen/abwählen"
            hint="Benutzergruppe auswählen/abwählen (z.B. 'Team Winnenden')"
            hide-hint
            stack-label
            options-selected-class="text-primary"
            options-dense
            use-input
            input-debounce="0"
          >
          </q-select>
          -->
          <!-- /q-select für Referenz auf Bauinformation -->
          <!-- Platz für Hint schaffen: -->
          <!--
          <br />
          <br />
          <br />
          <br />
          <br />
          -->
          <div class="row full-width q-col-gutter-xs inset-shadow">
            <b>Merkmale des Benutzers</b>
          </div>
          <div class="row full-width q-pa-xs q-col-gutter-xs">
            <div class="col-6">
              <q-toggle
                :disable="!benutzerDarfBearbeitenBenutzer"
                dense
                v-model="neuerOderAusgewaehlterBenutzer.istVerifiziert"
                label="Verifiziert"
              />
            </div>
            <div class="col-6">
              <q-toggle
                :disable="!benutzerDarfBearbeitenBenutzer"
                dense
                v-model="neuerOderAusgewaehlterBenutzer.istAktiv"
                label="Aktiv"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-12">
        <div>
          <!--- /col, 1. Spalte  -->
          <!-- 2. Spalte: -->
          <div>
            <b>Benutzerspezifische Einstellungen</b>
          </div>
          <br />
          <div>
            Anzahl der Zeilen pro Seite in den Tabellen
            <q-select
              :disable="!benutzerDarfBearbeitenBenutzer"
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="
                neuerOderAusgewaehlterBenutzer.tablesPaginationRowsPerPage
              "
              label="Anzahl der Zeilen pro Seite"
              hint="Anzahl der Zeilen pro Seite auswählen"
              hide-hint
              :options="selectOptionsTablesPaginationRowsPerPage"
              options-dense
            />
          </div>
          <div>
            Bildschirmfarbschema
            <q-select
              :disable="!benutzerDarfBearbeitenBenutzer"
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="
                neuerOderAusgewaehlterBenutzer.farbSchema
              "
              label="Bildschirmfarbschema"
              hint="Bilschirmfarbschema 'blau' oder 'grau' auswählen"
              hide-hint
              :options="selectOptionsFarbSchema"
              options-dense
            />
          </div>
          <br />
          <div>
            <b>Logik der Wertevererbung</b> von Baueigenschaften beim
            <b
              >Einfügen (d.h. Kopieren oder Verschieben) von markierten
              Zweigen</b
            >
            unter einen Zielelternknoten im Baustoff- und Bauvorhabenbaum:
            <br />
            <br />
            <q-toggle
              :disable="!benutzerDarfBearbeitenBenutzer"
              dense
              v-model="
                neuerOderAusgewaehlterBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
              "
              label="Im Zweig mitgebrachte Werte durchsetzen: Vorhandene
                    Werte von Baueigenschaften im Pfad vom Wurzelknoten bis zum Zielelternknoten des
                    neu eingefügten Zweigs ggf. überschreiben mit mitgebrachten
                    Werten aus dem neu eingefügten Zweig"
            />
          </div>
          <br />
          <!-- NEU: -->
          <div>
            <b>Logik der Wertevererbung</b> von Baueigenschaften beim
            <b>Aktivieren von Baueigenschaftsprofilen</b>
            an einem Zielknoten im Baustoff- oder Bauvorhabenbaum:
            <br />
            <br />
            <q-toggle
              :disable="!benutzerDarfBearbeitenBenutzer"
              dense
              v-model="
                neuerOderAusgewaehlterBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte
              "
              label="Im Baueigenschaftsprofil mitgebrachte Vorgabewerte durchsetzen (Voreinstellung):
                    Vorhandene Werte von Baueigenschaften im Pfad vom Wurzelknoten bis zum Zielknoten der
                    Profilaktivierung ggf. überschreiben mit mitgebrachten
                    Vorgabewerten aus dem neu aktivierten Baueigenschaftsprofil"
            />
          </div>
        </div>
      </div>
      <div class="col-md-3 col-12"></div>
      <!-- /col, 4. Spalte-->
    </div>
    <q-separator />
    <!-- Es folgen die Buttons unter dem q-form: -->
    <!-- NEU: type="submit" präventiv entfernt!!! -->
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <div class="col-md-3 col-12">
        <div v-if="modus !== 'Neuanlage'">
          <!-- NEU: Unterscheidung, wegen unterschiedlichen labels -->
          <q-btn
            type="submit"
            :disable="!benutzerDarfBearbeitenBenutzer"
            class="stretch full-width"
            style="height:100%"
            color="positive"
            glossy
            label="Benutzerkonto speichern"
            no-caps
          />
        </div>
        <div v-else>
          <q-btn
            type="submit"
            :disable="!benutzerDarfBearbeitenBenutzer"
            class="stretch full-width"
            style="height:100%"
            color="positive"
            glossy
            label="Neues Benutzerkonto registrieren"
            no-caps
          />
        </div>
      </div>
      <div class="col-md-3 col-12">
        <q-btn
          type="reset"
          :disable="!benutzerDarfBearbeitenBenutzer"
          class="stretch full-width"
          style="height:100%"
          color="deep-orange"
          glossy
          text-color="white"
          label="Eingaben zurücksetzen"
          no-caps
        />
      </div>
      <!--
      <q-btn
        color="negative"
        glossy
        label="Löschen"
        no-caps
      />
      -->
    </div>
  </q-form>
</template>
//***===========================================================================================================================
<script>
// Neu: Konstante für die Options für die Anzahl der Zeilen pro Seite in den Tabellen
const selectOptionsTablesPaginationRowsPerPage = [
  5,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  0
];
const selectOptionsFarbSchema = [
  "blau", // Default
  "grau"
]
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Imports für Quasar Utilities
// Quasar Date Utils, siehe https://quasar.dev/quasar-utils/date-utils
// Quasar Copy to Clipboard, siehe https://quasar.dev/quasar-utils/other-utils#Copy-to-Clipboard
import { copyToClipboard } from "quasar";
//--------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  props: {
    modus: {
      type: String,
      validator: function(value) {
        // The value must match one of these strings
        return ["Bearbeitung", "Neuanlage"].includes(value);
      }
    },
    zuManipulierenderBenutzer: {
      type: Object,
      default: null // Daher wird bei Neuanlage, wenn kein Argument dafür mitgegeben wird, null genommen
    }
    //=============================================================================================================================================
    // ACHTUNG: Zusätzlich verwendet die Komponente 2 Events: Diese werden beim Aufruf jeweils an eine Funktion gebunden in der Elternkomponente!!!
    // @refresh-request-benutzer-konten-verwaltung(modus)
    // @error-in-component-benutzer-konten-verwaltung(modus, error)
    //=============================================================================================================================================
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      isPwd: true, // NEU: Zur Steuerung der Sichtbarkeit der Eingabe für Kennwortfeld, siehe https://quasar.dev/vue-components/input#Input-types
      selectOptionsTablesPaginationRowsPerPage: selectOptionsTablesPaginationRowsPerPage, // Konstante oben
      selectOptionsFarbSchema: selectOptionsFarbSchema, // Konstante oben
      neuerOderAusgewaehlterBenutzer: this.benutzerCreator(
        this.zuManipulierenderBenutzer
      ),
      localStore: globalStore
    };
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    createNeuenOderUpdateAusgewaehlterBenutzer() {
      // --------------------------------------------------------------------------------------------------------------------
      // Methode - Legt bei modus "Neuanlage" einen neuen Benutzer an im Backend per API-Post-Request /Authentifizierung/Registrierung
      // Bei Modus "Bearbeitung" wird ein Update der Baueigenschaft am Backend (put) durchgeführt per API-Put-Request /Benutzer
      // --------------------------------------------------------------------------------------------------------------------
      if (this.modus === "Bearbeitung") {
        console.log(
          "In createNeuenOderUpdateAusgewaehltenBenutzer() - Modus: 'Bearbeitung'"
        );
        this.$axios
          .put(
            process.env.API +
              "/Benutzer/" +
              this.neuerOderAusgewaehlterBenutzer._id,
            this.neuerOderAusgewaehlterBenutzer // Body
          )
          .then(response => {
            console.log("response: ", response);
            // NEU: Banner-Benutzernachricht im Footer per global Store und Enums:
            // Disabled - wird in der Elternkomponente verwaltung.vue im Rahmen des Event Handlings unten gemacht!
            /*
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BENUTZER_AENDERUNG_ERFOLG
            );
            */
            this.$emit(
              "refresh-request-benutzer-konten-verwaltung",
              this.modus // "Bearbeitung"
              // Parameter payload ist leer bei modus "Bearbeitung"!
              // Funktiniert!
            );
          })
          .catch(error => {
            console.log("Error bei Neuanlage Benutzer - error: ", error);
            // ACHTUNG: Benutzernachricht wird in der Elternkomponente verwaltung.vue im Rahmen des Event Handlings ausgegeben!
            this.$emit(
              "error-in-component-benutzer-konten-verwaltung",
              this.modus, // "Bearbeitung"
              error
            );
          });
      } else if (this.modus === "Neuanlage") {
        console.log(
          "In createNeuenOderUpdateAusgewaehltenBenutzer() - Modus: 'Neuanlage'"
        );
        console.log(
          "In createNeuenOderUpdateAusgewaehlterBenutzer()",
          this.neuerOderAusgewaehlterBenutzer
        );
        // Triggere nun Registrierung des neuen Benutzers am Backend:
        const apiRoute =
          process.env.API + "/Authentifizierung/InterneRegistrierung"; // NEU: Mit guarded Route - sicherer!
        this.$axios
          .post(apiRoute, {
            eMail: this.neuerOderAusgewaehlterBenutzer.benutzerKennung,
            vorName: this.neuerOderAusgewaehlterBenutzer.vorName,
            nachName: this.neuerOderAusgewaehlterBenutzer.nachName,
            kennWort: this.neuerOderAusgewaehlterBenutzer.kennWort //NEU: Feld für Kennwort - nur in QTabPanel für Neuanlage
          })
          .then(response => {
            console.log("response: ", response); // response.data sollte die Id des erzeugten Benutzers enthalten!
            //------------------------------------------------------------------------------------------------------------------------------
            // NEU - #285 e): Aus Security-Gründen die Kennwortfelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
            // z.B. wenn Abmeldung vergessen wird!
            this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
            this.neuerOderAusgewaehlterBenutzer.kennWort = "";
            this.neuerOderAusgewaehlterBenutzer.kennWortDuplikat = "";
            //------------------------------------------------------------------------------------------------------------------------------
            // ACHTUNG: Benutzernachricht wird in der Elternkomponente verwaltung.vue im Rahmen des Event Handlings ausgegeben!
            console.log(
              "Vor $emit 'refresh-request-benutzer-konten-verwaltung'"
            );
            this.$emit(
              "refresh-request-benutzer-konten-verwaltung",
              this.modus, // "Neuanlage"
              response.data // payload - enthält Id des erzeugten Benutzers aus dem Backend! Nötig für Update der Table der Benutzer!
            );
          })
          .catch(error => {
            // Catch für Errors, z.B. 403 möglich, wenn Benutzerkonto schon existiert!
            console.log(
              "Error aus Registrierung Benutzerkonto - error: ",
              error
            );
            //------------------------------------------------------------------------------------------------------------------------------
            // NEU - #285 e): Aus Security-Gründen die Kennwortfelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
            // z.B. wenn Abmeldung vergessen wird!
            this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
            this.neuerOderAusgewaehlterBenutzer.kennWort = "";
            this.neuerOderAusgewaehlterBenutzer.kennWortDuplikat = "";
            //------------------------------------------------------------------------------------------------------------------------------
            if (error.response.status === 403) {
              console.log(
                "Error 403 - Es existiert bereits ein Benutzer mit der angegebenen E-Mail-Adresse als Benutzerkennung"
              );
            } // else anderer Fehler, error in jedem Fall per $event weiterreichen an Elternkomponente
            // ACHTUNG: Benutzernachricht wird in der Elternkomponente verwaltung.vue im Rahmen des Event Handlings ausgegeben!
            console.log(
              "Vor $emit von Event 'error-in-component-benutzer-konten-verwaltung' an Elternkomponente"
            );
            this.$emit(
              "error-in-component-benutzer-konten-verwaltung",
              this.modus, // "Neuanlage"
              error
            );
          });
      }
    },

    benutzerCreator(arg) {
      //----------------------------------------------------------------------------------------------------
      // Funktion, die beim Reset oder Initialisieren aufgerufen wird.
      // Gibt ein Objekt vom Typ Benutzer zurück
      // Wenn arg ein Benutzer ist, wird sie als Objekt kopiert. Sonst wird ein leerer Benutzer erstellt,
      // plus eines Felds kennWort (wird nur gebraucht bei Modus "Neuanlage"/Neuregistrierung eines Benutzers)
      //---------------------------------------------------------------------------------------------------
      console.log("In benutzerCreator()- arg: ", arg);

      if (arg !== null) {
        return Object.assign({}, arg);
      } else {
        return {
          benutzerKennung: null,
          vorName: null,
          nachName: null,
          kennWort: null, // NEU - nur bei Neuanlage/Neu-Registrierung eines Benutzers
          kennWortDuplikat: null, // NEU - nur bei Neuanlage/Neu-Registrierung eines Benutzers
          benutzerRolle: "Mitarbeiter",
          benutzerGruppe: null,
          tablesPaginationRowsPerPage: 15, // Geeigneter Default-Wert für Full HD Bildschirm im Fullscreen Modus mit 80% Zoom
          farbSchema: "blau", // Default
          istVerifiziert: false,
          istAktiv: true
        };
      }
    }
  },
  watch: {},
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  computed: {
    //--------------------------------------------------------------------------------------------------------------------------------
    // NEU: Computed Properties zur Validierung von Feldern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerKennungIstValide: function() {
      // Prüft, ob eine Benutzerkennung eingegeben wurde
      if (
        this.neuerOderAusgewaehlterBenutzer.benutzerKennung == null ||
        this.neuerOderAusgewaehlterBenutzer.benutzerKennung === ""
      ) {
        return false;
      } else {
        return true;
      }
    },

    kennWortEingabenSindValide: function() {
      // Prüft, ob die Kennworteingaben valide sind und übereinstimmen
      if (
        this.neuerOderAusgewaehlterBenutzer.kennWort == null ||
        this.neuerOderAusgewaehlterBenutzer.kennWortDuplikat == null ||
        this.neuerOderAusgewaehlterBenutzer.kennWort === "" ||
        this.neuerOderAusgewaehlterBenutzer.kennWortDuplikat === ""
      ) {
        return false;
      } else {
        if (
          this.neuerOderAusgewaehlterBenutzer.kennWort ===
          this.neuerOderAusgewaehlterBenutzer.kennWortDuplikat
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    namenSindValide: function() {
      // Prüft, ob die Namensfelder valide sind
      if (
        this.neuerOderAusgewaehlterBenutzer.vorName == null ||
        this.neuerOderAusgewaehlterBenutzer.nachName == null ||
        this.neuerOderAusgewaehlterBenutzer.vorName === "" ||
        this.neuerOderAusgewaehlterBenutzer.nachName === ""
      ) {
        return false;
      } else {
        return true;
      }
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // computed-Funktion für Eingabefelder bei Neuanlage Benutzer
    // Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar
    vorNameErforderlich: function() {
      // Prüft, ob Vorname eingegeben wurde, sonst Fehlermeldung
      return [v => !!v || "Die Eingabe des Vornamens ist erforderlich"];
    },

    nachNameErforderlich: function() {
      // Prüft, ob Nachname eingegeben wurde, sonst Fehlermeldung
      return [v => !!v || "Die Eingabe des Nachnamens ist erforderlich"];
    },

    eMailValidierung: function() {
      // Prüft, ob eMail (Benutzerkennung) eingegeben wurde, sonst Fehlermeldung
      //=====================================================================================================================
      // NEU: Bei Neuregistrierung nur Nur Kurz & Fischer und BIM.live E-Mail-Adressen zur Registrierung zulassen!
      // Dies sollte stets eingeschaltet werden, wenn die Registrierung auf Heroku
      // freigeschaltet ist (separate computed-Funktion computeDisableRegistrierenBenutzer)
      // ACHTUNG: Die if-Abfrage if (this.registrierungPending) aus der Vorlage in my-layout.vue musste hier entfernt werden!
      // Dafür ist eine Unterscheidung nach modus notwendig - siehe Kommentare
      //=====================================================================================================================
      const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      if (this.modus === "Neuanlage") {
        // Dort nicht von K&F oder BIM.live stammende E-Mail-Adressen nicht zulassen
        return [
          v =>
            !!v ||
            "Die Eingabe der E-Mail-Adresse als Benutzerkennung ist erforderlich",
          //============================================================================================================
          // NEU: Prüfung auf valide E-Mail-Syntax mit obigem Pattern
          // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/
          v =>
            eMailPattern.test(v) ||
            "Die Eingabe ist keine gültige E-Mail-Adresse",
          //============================================================================================================
          // ACHTUNG: Nur bei Neuregistrierung, sonst werden z.B. auch andere schon registrierte Adressen abgewiesen!!!
          v =>
            v.endsWith("@kurz-fischer.de") ||
            v.endsWith("@bimlive.de") ||
            v === "01boka1mgp@hft-stuttgart.de" || // NEU: Für Masterarbeit Kay Bodenschlägel
            "Die eingegebene E-Mail-Adresse ist nicht zur Registrierung zugelassen"
          //============================================================================================================
        ];
      } else {
        // Modus "Bearbeitung" - dort die nicht von K&F oder BIM.live stammenden E-Mail-Adressen noch zulassen,
        // sonst kommt für diese ein Validation Error hoch, allerdings ist das Feld dafür sowieso disabled!
        return [
          v =>
            !!v ||
            "Die Eingabe der E-Mail-Adresse als Benutzerkennung ist erforderlich",
          //============================================================================================================
          // NEU: Prüfung auf valide E-Mail-Syntax mit obigem Pattern
          // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/
          v =>
            eMailPattern.test(v) ||
            "Die Eingabe ist keine gültige E-Mail-Adresse"
          //============================================================================================================
          // ACHTUNG: Nur bei Neuregistrierung, sonst werden z.B. auch andere schon registrierte Adressen abgewiesen!!!
          /*
          v =>
            v.endsWith("@kurz-fischer.de") ||
            v.endsWith("@bimlive.de") ||
            v === "01boka1mgp@hft-stuttgart.de" || // NEU: Für Masterarbeit Kay Bodenschlägel
            "Die eingegebene E-Mail-Adresse ist nicht zur Registrierung zugelassen"
          */
          //============================================================================================================
        ];
      }
    },

    kennWortValidierung: function() {
      // Prüft, ob Kennwort eingegeben wurde, sonst Fehlermeldung
      // NEU: Prüfung auf zusätzliche Kriterien
      // Vorlage: https://www.kurmis.com/2019/11/01/password-strength-javascript.html
      return [
        v => !!v || "Die Eingabe des Kennworts ist erforderlich",
        v => v.length > 7 || "Das Kennwort muss mindestens 8 Zeichen enthalten",
        v =>
          /[a-z]/.test(v) ||
          "Das Kennwort muss mindestens einen Kleinbuchstaben enthalten",
        v =>
          /[A-Z]/.test(v) ||
          "Das Kennwort muss mindestens einen Großbuchstaben enthalten",
        v =>
          /\d/.test(v) || "Das Kennwort muss mindestens eine Ziffer enthalten",
        v =>
          /[^A-Za-z0-9]/.test(v) ||
          "Das Kennwort muss mindestens ein Sonderzeichen enthalten"
      ];
    },

    //--------------------------------------------------------------------------------------------------------------------------------
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenBenutzer: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an (typbezogenen) Baueigenschaften
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften
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
  }
};
</script>
