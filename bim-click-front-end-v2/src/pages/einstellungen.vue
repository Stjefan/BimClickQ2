<!-- NEU: einstellungen.vue -->
<!-- ALT: verwaltung.vue -->
<!-- ALT: Einstellungen.vue -->
<!-- TODOs -->
<!--  -->
<!--  -->
<!--***=======================================================================================================================================================-->
<template>
  <q-page class="q-pa-xs">
    <q-card ref="cardEinstellungen">
      <q-tabs mobile-arrows
        v-model="tabEinstellungen"
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="white"
        content-class="text-h7"
        dense
        align="left"
        @input="initialisiereAusgewaehltesTabEinstellungen"
      >
        <q-tab
          name="erstesTabEinstellungen"
          label="Benutzerspezifische Einstellungen"
          no-caps
        />
        <q-tab
          name="zweitesTabEinstellungen"
          label="Kennwort des Benutzerkontos ändern"
          no-caps
        />
        <q-tab
          name="drittesTabEinstellungen"
          label="Test Area (für Administratoren)"
          :v-if="!benutzerRolleIstMitarbeiter"
          no-caps
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tabEinstellungen" animated>
        <!--------------------------------------------------------------------------------------------------------------------->
        <q-tab-panel name="erstesTabEinstellungen" class="q-pa-xs">
          <q-form>
            <br />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
              <div class="col-md-4 col-12">
                <b>Debug-Modus:</b> Zeigt in der Benutzeroberfläche zusätzlich
                interne Daten an
                <br />
                (wird bei Abmeldung ausgeschaltet)
              </div>
              <!-- ALT: class="self-center" -->
              <div class="col-md-4 col-12">
                <q-toggle
                  :value="localStore.state.debugMode"
                  @input="localStore.toggleDebugMode()"
                  label="Debug-Modus ein/aus"
                />
              </div>
              <div class="col-md-4 col-12">
                <div v-if="localStore.state.debugMode">
                  localStore.state.debugMode:
                  {{ localStore.state.debugMode }}
                </div>
              </div>
            </div>
            <br />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
              <div class="col-md-4 col-12">
                <b>Anzahl der angezeigten Tabellenzeilen</b> pro Seite in den
                Formularen mit Tabellen
                <br />
                (anpassbar an Bildschirmgröße - eine Änderung des Werts wird
                wirksam in neu geöffneten Tabs - um die Änderung in bereits
                geöffneten Tabs wirksam werden zu lassen, muss die Seite im
                Browser bzw. der App neu geladen werden)
              </div>
              <div class="col-md-4 col-12">
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .tablesPaginationRowsPerPage
                  "
                  label="Anzahl der angezeigten Tabellenzeilen pro Seite"
                  hint="Anzahl der angezeigten Tabellenzeilen pro Seite auswählen"
                  hide-hint
                  :options="selectOptionsTablesPaginationRowsPerPage"
                  options-dense
                />
              </div>
              <div class="col-md-4 col-12">
                <div v-if="localStore.state.debugMode">
                  localStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage:
                  {{
                    localStore.state.einstellungenBenutzer
                      .tablesPaginationRowsPerPage
                  }}
                </div>
              </div>
            </div>
            <br />
             <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
              <div class="col-md-4 col-12">
                <b>Bildschirmfarbschema</b> für Kopf- und Fußzeile
              </div>
              <div class="col-md-4 col-12">
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .farbSchema
                  "
                  label="Bildschirmfarbschema"
                  hint="Ein Farbschema auswählen"
                  hide-hint
                  :options="selectOptionsFarbSchema"
                  options-dense
                />
              </div>
              <div class="col-md-4 col-12">
                <div v-if="localStore.state.debugMode">
                  localStore.state.einstellungenBenutzer.farbSchema:
                  {{
                    localStore.state.einstellungenBenutzer
                      .farbSchema
                  }}
                </div>
              </div>
            </div>
            <br />
            <div class="row full-width q-pa-xs q-gutter-xs">
              <!-- ALT: Originaler Code von @sts -->
              <!--
                <div class="col-md-4 col-12">
                  Verhalten bei Vererbungskonflikten bei Kopieren
                  <br />
                  bzw. Verschieben eines Zweigs unter einen Zielknoten
                </div>
                  <q-radio v-model="localStore.state.verhaltenBeiVererbungskonfliktenBeiKopierenVerschiebenVonZweig" val="ueberschreibeAnZielknoten" label="Überschreibe an Zielknoten" />
                  <q-radio v-model="localStore.state.verhaltenBeiVererbungskonfliktenBeiKopierenVerschiebenVonZweig" val="ueberschreibeAnBewegtemZweig" label="Überschreibe an bewegtem Zweig" />
              -->
              <!-- NEU: Code für neues Feld in Datenbank: -->
              <div class="col-md-4 col-12">
                <b>Logik der Wertevererbung</b> von Baueigenschaften beim
                <b
                  >Einfügen (d.h. Kopieren oder Verschieben) von markierten
                  Zweigen</b
                >
                unter einen Zielelternknoten im Baustoff- oder Bauvorhabenbaum
              </div>
              <div class="col-md-4 col-12">
                <!-- ACHTUNG: Am q-radio hier unbedingt :val=false, nicht :val="false" (letzeres bindet Variable mit Namen false)!?! -->
                <!-- ACHTUNG: Prettify oder ESLInt macht nach einem "Format Document" per VS Code Menü aus :val=false wieder :val="false", genauso aus val=false, val="false" - insofern ist dies wahrscheinlich egal!!! -->
                <!-- ACHTUNG: Mit val="false" bzw. val=false OHNE : werden 2 leere Radio Buttons angezeigt! -->
                <!-- ACHTUNG: Um nach einem Browser Refresh diese Benutzerdaten weiterhin zu haben, werden sie initial in my-layout.vue und hier in einstellungen.vue unten nach einem Update per API -->
                <!--          zusätzlich im Browser local Storage gespeichert und nach einem Refresh von dort retrieved in my-layout.vue -->
                <!--          Dabei muss eine Boolean-Variable wie treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig besonders behandelt werden mit -->
                <!--          JSON.stringify beim Speichern und JSON.parse beim Retrieven in den/aus dem local Storage, da Browser local Storage nur Strings speichert!!! -->
                <!--          Siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true -->
                <!-- NEU: Um im Label-Text HTML-Formatierung (<b> ... </b>) verwenden zu können, muss statt der Label-Property der Default VSlot (der zur Formatierung des -->
                <!--      Label-Strings dient, siehe https://quasar.dev/vue-components/radio#QRadio-API) verwendet werden! -->
                <!-- ALT (am q-radio): label="Am Ziel bereits vorhandene Werte durchsetzen: Mitgebrachte Werte im neu eingefügten Zweig ggf. überschreiben mit vorhandenen Werten aus dem Pfad vom Wurzelknoten bis zum Zielelternknoten des neu eingefügten Zweigs" -->
                <!-- NEU: <template v-slot:default> <b>...</b> ... </template> -->
                <q-radio
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
                  "
                  :val="false"
                >
                  <template v-slot:default>
                    <b>Am Ziel bereits vorhandene Werte durchsetzen (Voreinstellung):</b>
                    Mitgebrachte Werte von Baueigenschaften im neu eingefügten Zweig ggf.
                    überschreiben mit vorhandenen Werten aus dem Pfad vom
                    Wurzelknoten bis zum Zielelternknoten des neu eingefügten Zweigs
                  </template>
                </q-radio>
              </div>
              <div class="col-md-4 col-12">
                <div v-if="localStore.state.debugMode">
                  localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig:
                  {{
                    localStore.state.einstellungenBenutzer
                      .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
                  }}
                </div>
              </div>
            </div>
            <br />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <div class="col-md-4 col-12">
                &nbsp;
              </div>
              <div class="col-md-4 col-12">
                <!-- ACHTUNG: Am q-radio hier unbedingt :val=false, nicht :val="false" (letzeres bindet Variable mit Namen false)!?! -->
                <!-- ACHTUNG: Prettify oder ESLInt macht nach einem "Format Document" per VS Code Menü aus :val=false wieder :val="false", genauso aus val=false, val="false" - insofern ist dies wahrscheinlich egal!!! -->
                <!-- ACHTUNG: Mit val="false" bzw. val=false OHNE : werden 2 leere Radio Buttons angezeigt! -->
                <!-- ACHTUNG: Um nach einem Browser Refresh diese Benutzerdaten weiterhin zu haben, werden sie initial in my-layout.vue und hier in einstellungen.vue unten nach einem Update per API -->
                <!--          zusätzlich im Browser local Storage gespeichert und nach einem Refresh von dort retrieved in my-layout.vue -->
                <!--          Dabei muss eine Boolean-Variable wie treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig besonders behandelt werden mit -->
                <!--          JSON.stringify beim Speichern und JSON.parse beim Retrieven in den/aus dem local Storage, da Browser local Storage nur Strings speichert!!! -->
                <!--          Siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true -->
                <!-- NEU: Um im Label-Text HTML-Formatierung (<b> ... </b>) verwenden zu können, muss statt der Label-Property der Default VSlot (der zur Formatierung des -->
                <!--      Label-Strings dient, siehe https://quasar.dev/vue-components/radio#QRadio-API) verwendet werden! -->
                <!-- ALT (am q-radio): label="Im Zweig mitgebrachte Werte durchsetzen: Vorhandene Werte im Pfad vom Wurzelknoten bis zum Zielelternknoten des neu eingefügten Zweigs ggf. überschreiben mit mitgebrachten Werten aus dem neu eingefügten Zweig" -->
                <!-- NEU: <template v-slot:default> <b>...</b> ... </template> -->
                <q-radio
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
                  "
                  :val="true"
                >
                  <template v-slot:default>
                    <b>Im Zweig mitgebrachte Werte durchsetzen:</b> Vorhandene
                    Werte von Baueigenschaften im Pfad vom Wurzelknoten bis zum Zielelternknoten des
                    neu eingefügten Zweigs ggf. überschreiben mit mitgebrachten
                    Werten aus dem neu eingefügten Zweig
                  </template>
                </q-radio>
              </div>
            </div>
            <br />
            <br />
            <div class="row full-width q-pa-xs q-gutter-xs">
              <!-- ALT: Originaler Code von @sts -->
              <!--
                <div class="col-md-4 col-12">
                  Verhalten bei Vererbungskonflikten bei Kopieren
                  <br />
                  bzw. Verschieben eines Zweigs unter einen Zielknoten
                </div>
                  <q-radio v-model="localStore.state.verhaltenBeiVererbungskonfliktenBeiKopierenVerschiebenVonZweig" val="ueberschreibeAnZielknoten" label="Überschreibe an Zielknoten" />
                  <q-radio v-model="localStore.state.verhaltenBeiVererbungskonfliktenBeiKopierenVerschiebenVonZweig" val="ueberschreibeAnBewegtemZweig" label="Überschreibe an bewegtem Zweig" />
              -->
              <!-- NEU: Code für neues Feld in Datenbank: -->
              <div class="col-md-4 col-12">
                <b>Logik der Wertevererbung</b> von Baueigenschaften beim
                <b
                  >Aktivieren von Baueigenschaftsprofilen</b
                >
                an einem Zielknoten im Baustoff- oder Bauvorhabenbaum
              </div>
              <div class="col-md-4 col-12">
                <!-- ACHTUNG: Am q-radio hier unbedingt :val=false, nicht :val="false" (letzeres bindet Variable mit Namen false)!?! -->
                <!-- ACHTUNG: Prettify oder ESLInt macht nach einem "Format Document" per VS Code Menü aus :val=false wieder :val="false", genauso aus val=false, val="false" - insofern ist dies wahrscheinlich egal!!! -->
                <!-- ACHTUNG: Mit val="false" bzw. val=false OHNE : werden 2 leere Radio Buttons angezeigt! -->
                <!-- ACHTUNG: Um nach einem Browser Refresh diese Benutzerdaten weiterhin zu haben, werden sie initial in my-layout.vue und hier in einstellungen.vue unten nach einem Update per API -->
                <!--          zusätzlich im Browser local Storage gespeichert und nach einem Refresh von dort retrieved in my-layout.vue -->
                <!--          Dabei muss eine Boolean-Variable wie treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig besonders behandelt werden mit -->
                <!--          JSON.stringify beim Speichern und JSON.parse beim Retrieven in den/aus dem local Storage, da Browser local Storage nur Strings speichert!!! -->
                <!--          Siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true -->
                <!-- NEU: Um im Label-Text HTML-Formatierung (<b> ... </b>) verwenden zu können, muss statt der Label-Property der Default VSlot (der zur Formatierung des -->
                <!--      Label-Strings dient, siehe https://quasar.dev/vue-components/radio#QRadio-API) verwendet werden! -->
                <!-- ALT (am q-radio): label="Am Ziel bereits vorhandene Werte durchsetzen: Mitgebrachte Werte im neu eingefügten Zweig ggf. überschreiben mit vorhandenen Werten aus dem Pfad vom Wurzelknoten bis zum Zielelternknoten des neu eingefügten Zweigs" -->
                <!-- NEU: <template v-slot:default> <b>...</b> ... </template> -->
                <!-- #357 - ALT: :val="true" - FALSCH, NEU: val="false" - RICHTIG -->
                <q-radio
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .vorgabeWerteUeberschreibenVorhandeneWerte
                  "
                  :val="false"
                >
                  <template v-slot:default>
                    <b>Am Ziel bereits vorhandene Werte durchsetzen:</b>
                    Mitgebrachte Vorgabewerte von Baueigenschaften aus dem neu aktivierten Baueigenschaftsprofil ggf.
                    überschreiben mit vorhandenen Werten im Pfad vom Wurzelknoten bis zum Zielknoten der Profilaktivierung
                  </template>
                </q-radio>
              </div>
              <div class="col-md-4 col-12">
                <div v-if="localStore.state.debugMode">
                  localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte:
                  {{
                    localStore.state.einstellungenBenutzer
                      .vorgabeWerteUeberschreibenVorhandeneWerte
                  }}
                </div>
              </div>
            </div>
            <br />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <div class="col-md-4 col-12">
                &nbsp;
              </div>
              <div class="col-md-4 col-12">
                <!-- ACHTUNG: Am q-radio hier unbedingt :val=false, nicht :val="false" (letzeres bindet Variable mit Namen false)!?! -->
                <!-- ACHTUNG: Prettify oder ESLInt macht nach einem "Format Document" per VS Code Menü aus :val=false wieder :val="false", genauso aus val=false, val="false" - insofern ist dies wahrscheinlich egal!!! -->
                <!-- ACHTUNG: Mit val="false" bzw. val=false OHNE : werden 2 leere Radio Buttons angezeigt! -->
                <!-- ACHTUNG: Um nach einem Browser Refresh diese Benutzerdaten weiterhin zu haben, werden sie initial in my-layout.vue und hier in einstellungen.vue unten nach einem Update per API -->
                <!--          zusätzlich im Browser local Storage gespeichert und nach einem Refresh von dort retrieved in my-layout.vue -->
                <!--          Dabei muss eine Boolean-Variable wie treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig besonders behandelt werden mit -->
                <!--          JSON.stringify beim Speichern und JSON.parse beim Retrieven in den/aus dem local Storage, da Browser local Storage nur Strings speichert!!! -->
                <!--          Siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true -->
                <!-- NEU: Um im Label-Text HTML-Formatierung (<b> ... </b>) verwenden zu können, muss statt der Label-Property der Default VSlot (der zur Formatierung des -->
                <!--      Label-Strings dient, siehe https://quasar.dev/vue-components/radio#QRadio-API) verwendet werden! -->
                <!-- ALT (am q-radio): label="Im Zweig mitgebrachte Werte durchsetzen: Vorhandene Werte im Pfad vom Wurzelknoten bis zum Zielelternknoten des neu eingefügten Zweigs ggf. überschreiben mit mitgebrachten Werten aus dem neu eingefügten Zweig" -->
                <!-- NEU: <template v-slot:default> <b>...</b> ... </template> -->
                <!-- #357 - ALT: :val="false" - FALSCH, NEU: val="true" - RICHTIG -->
                <q-radio
                  v-model="
                    localStore.state.einstellungenBenutzer
                      .vorgabeWerteUeberschreibenVorhandeneWerte
                  "
                  :val="true"
                >
                  <template v-slot:default>
                    <b>Im Baueigenschaftsprofil mitgebrachte Vorgabewerte durchsetzen (Voreinstellung):</b>
                    Vorhandene Werte von Baueigenschaften im Pfad vom Wurzelknoten bis zum Zielknoten der
                    Profilaktivierung ggf. überschreiben mit mitgebrachten
                    Vorgabewerten aus dem neu aktivierten Baueigenschaftsprofil
                  </template>
                </q-radio>
              </div>
            </div>
            <q-separator />
            <div class="row full-width items-start">
              <div class="col-md-4 col-12">
                <!-- ACHTUNG: Am folgenden q-btn darf type="submit" nicht verwendet werden, da Teil eines q-forms!!! -->
                <q-btn
                  class="stretch full-width" style="height:100%"
                  color="positive"
                  glossy
                  @click="updateBenutzer()"
                  label="Einstellungen dauerhaft speichern"
                  no-caps
                />
              </div>
              <!--
              <div class="col-md-4 col-12">
                <q-btn
                  class="stretch full-width"
                  color="deep-orange"
                  glossy
                  text-color="white"
                  @click="
                    resetBenutzer()
                  "
                  label="Zurücksetzen"
                  no-caps
                />
              </div>
              -->
            </div>
          </q-form>
        </q-tab-panel>
        <!-- /q-tab-panel name="erstesTabEinstellungen" ------------------------------------------------------------------------>
        <q-tab-panel name="zweitesTabEinstellungen" class="q-pa-xs">
          <q-form class="q-pa-xs">
            <p class="text-h6">
              Kennwort des Benutzerkontos ändern
            </p>
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <b>Bisheriges Kennwort</b>
            </div>
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <div class="col-md-3 col-12">
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="bisherigesKennWort"
                  label="Bisheriges Kennwort"
                  hint="Bisheriges Kennwort eingeben (auf Groß- und Kleinschreibung achten, Anzeige per Klick auf das Icon rechts ein-/ausschalten)"
                  hide-hint
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    v =>
                      (v !== null && v !== '') ||
                      'Bisheriges Kennwort ist erforderlich',
                    v =>
                      (v && v.length >= 8) ||
                      'Das Kennwort besteht aus mindestens 8 Zeichen'
                  ]"
                  autocomplete="current-password"
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
              <div class="col-md-9 col-12"></div>
            </div>
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <b>Neues Kennwort </b>
            </div>
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <div class="col-md-3 col-12">
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neuesKennWort"
                  label="Neues Kennwort"
                  hint="Neues Kennwort eingeben (Anzeige per Klick auf das Icon rechts ein-/ausschalten)"
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
            </div>
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <div class="col-md-3 col-12">
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neuesKennWortDuplikat"
                  label="Neues Kennwort (Wiederholung)"
                  hint="Neues Kennwort nochmals eingeben (Anzeige per Klick auf das Icon rechts ein-/ausschalten)"
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
            </div>
            <q-separator />
            <!-- Es folgen die Buttons unter dem q-form: -->
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier NICHT type="submit" am q-btn, sonst kommt der mysteriöse Route-Change Fehler!!! -->
              <div class="col-md-3 col-12">
                <q-btn
                  :disable="!kennWortEingabenSindValide"
                  class="stretch full-width" style="height:100%"
                  color="positive"
                  glossy
                  label="Kennwortänderung durchführen"
                  no-caps
                  @click="changeKennWort"
                />
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width" style="height:100%"
                  color="deep-orange"
                  glossy
                  text-color="white"
                  label="Eingaben zurücksetzen"
                  @click="
                    bisherigesKennWort = null;
                    neuesKennWort = null;
                    neuesKennWortDuplikat = null;
                  "
                  no-caps
                />
              </div>
            </div>
          </q-form>
        </q-tab-panel>
        <!-- /q-tab-panel name="zweitesTabEinstellungen -------------------------------------------------------------------------------->
        <q-tab-panel name="drittesTabEinstellungen">
          <q-form>
            <div class="row full width q-col-gutter-xs">
              <div class="col-md-3 col-12">
                Input-Feld mit JSON für String-Feld in Mongoose:
                <br />
                <b>Achtung:</b> Ändert Baueinheitsbemerkung des
                Baustoffbaumwurzelknotens als Test-String-Feld!
                <br />
                <b>Achtung:</b> Ohne JSON.stringify Cast Error beim Speichern mit
                Mongoose!
              </div>
              <div class="col-md-3 col-12">
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="testBemerkung"
                  label="JSON-String"
                />
                Teststring mit JSON, z.B.: { "a": 1, "b": 2 }
                <br />
                {{ testBemerkung }}
                <br />
                Test auf Validität nach Lesen - Summe aus Werten von a und b:
                {{ testBemerkung.a + testBemerkung.b }}
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Lesen aus String-Feld mit JSON.parse"
                  no-caps
                  color="teal-7"
                  glossy
                  size="md"
                  @click="readBaustoffBemerkungAnWurzelBaustoffBaum"
                />
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Speichern in String-Feld mit JSON.stringify"
                  no-caps
                  color="cyan-7"
                  glossy
                  size="md"
                  @click="updateBaustoffBemerkungAnWurzelBaustoffBaum"
                />
              </div>
            </div>
            <br />
            <br />
            <div class="row full-width items-start q-col-gutter-xs">
              <div class="col-md-3 col-12">
                Auswahl Gemeindeschlüssel
              </div>
              <div class="col-md-3 col-12">
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="selectModelGemeinden"
                  label="Gemeindeschlüssel der Gemeinde"
                  hint="Gemeinde mit Gemeindeschlüssel auswählen"
                  hide-hint
                  :options="selectFilterOptionsGemeinden"
                  options-dense
                  :option-value="
                    opt =>
                      Object(opt) === opt && 'name' in opt ? opt.name : null
                  "
                  :option-label="
                    opt =>
                      Object(opt) === opt && 'name' in opt
                        ? 'Gemeinde: ' +
                          '<span class=\'text-pink-10\'><b>' +
                          opt.name +
                          '</span></b>' +
                          ', Land: ' +
                          '<span class=\'text-purple-10\'><b>' +
                          opt.namen.land +
                          '</span></b>' +
                          ', Reg.-Bez. (nur BY, BW, HE, NW): ' +
                          '<span class=\'text-deep-purple-10\'><b>' +
                          opt.namen.regierungsbezirk +
                          '</span></b>' +
                          ', Kreis: ' +
                          '<span class=\'text-cyan-10\'><b>' +
                          opt.namen.kreis +
                          '</span></b>' +
                          ', Gemeindeverband: ' +
                          '<span class=\'text-teal-10\'><b>' +
                          opt.namen.gemeindeverband +
                          '</span</b></b>' +
                          ', Gemeindeschlüssel: ' +
                          '<span class=\'text-deep-orange-10\'><b>' +
                          opt.schlüssel.nummer +
                          '</span</b>'
                        : 'null'
                  "
                  emit-value
                  map-options
                  use-input
                  @filter="selectFilterFunctionGemeinden"
                />
              </div>
            </div>
            <br />
            <br />
            <div class="row full-width items-start q-col-gutter-xs">
              <div class="col-md-3 col-12">
                Route Guards
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width" style="height:100%"
                  label="Test Route Guard mit JWT"
                  color="secondary"
                  glossy
                  size="md"
                  no-caps
                  @click="requestGuardedRouteBenutzer()"
                />
              </div>
            </div>
            <br />
            <br />
            <div class="row full-width items-start q-col-gutter-xs">
              <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
              <div class="col-md-3 col-12">
                Testdaten laden
                <br />
                Lädt Testdaten in die Datenbank
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width" style="height:100%"
                  label="Lade Testdaten"
                  no-caps
                  color="primary"
                  glossy
                  size="md"
                  @click="ladeTestDaten()"
                />
              </div>
              <div class="col-md-4 col-12"></div>
            </div>
          </q-form>
        </q-tab-panel>
        <!-- /q-tab-panel name="drittesTabEinstellungen -------------------------------------------------------------------------------->
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<!--***===============================================================================================================================-->
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
  "blau",
  "grau"
];

import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten from "../modules/gemeinden-deutschland-mit-namen-ihrer-verwaltungs-einheiten.json"; // HINWEIS: JSON kann an JS Variable zugewiesen werden,
// siehe https://stackoverflow.com/questions/39513427/how-do-i-convert-json-array-to-javascript-array
// Quelle dieser Daten: https://www.npmjs.com/package/gemeindeverzeichnis - die Datei gemeinden.ndjson nach json konvertiert ("}}" am Zeilenende ersetzt durch "}}," und
// Array-Klammern darum eingefügt, dann dort bestimmte Unternummern per Programm ergänzt im Unterobjekt "namen" mit den passenden Texte aus den anderen Dateien dort, für Verwendung als Options in QSelect
// für Gemeindeschlüssel

export default {
  components: {
    //ABCg
  },
  // NEU:
  name: "Einstellungen", // Vue Component Name - ACHTUNG - dabei beachten:
  // ALT:
  // name: "Einstellungen", // Vue Component Name - ACHTUNG - dabei beachten:
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
  data() {
    return {
      testBemerkung: { a: 1, b: 2 }, // Für Test der Speicherung von JS/JSON in String-Feldern am Backend
      baustoffWurzel: null,
      selectModelGemeinden: null, // Für Tests von Gemeinden/Gemeindechlüsseln
      selectOptionsGemeinden: null, // Dito - ACHTUNG: Muss in mounted mit JSON-Array GemeindenCondensed initialisiert werden!
      selectFilterOptionsGemeinden: null, // Dito
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält Markdown für Baustoff
      // Testdaten für q-select zur Auswahl der Art des Bauvorhabens
      selectOptionsTablesPaginationRowsPerPage: selectOptionsTablesPaginationRowsPerPage, // Konstante oben
      selectOptionsFarbSchema: selectOptionsFarbSchema, // NEU - Konstante oben
      tabEinstellungen: "erstesTabEinstellungen",
      bisherigesKennWort: null,
      neuesKennWort: null,
      neuesKennWortDuplikat: null,
      isPwd: true, // NEU: Zur Steuerung der Sichtbarkeit der Eingabe für Kennwortfeld, siehe https://quasar.dev/vue-components/input#Input-types

      formatDate: function(val) {
        /*------------------------------------------------------------------------------------------------------------------//
          Helper function for Date Formatting
          ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
          Sonst müssen sie nach methods: verschoben werden!
        //------------------------------------------------------------------------------------------------------------------*/
        // Die Mongoose Dates werden in Quasar z.B. so dargestellt: 2020-12-04T00:00:00.000Z
        // Siehe https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Die bessere Lösung scheint die JS Library Momentjs zu sein (var moment : require('moment'), läuft in Node und Browser)
        // Mongoose kann anscheinend nur Dates mit Time: https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Auch hier wird Momentjs empfohlen: https://stackoverflow.com/questions/53932266/how-to-convert-date-format-in-nodejs-using-mongoose
        // Einstweilen ist das Einzige, was funktioniert, die ersten 10 Stellen im Mongoose Date abzuschneiden, was diese Funktion macht:
        if (typeof val === "undefined" || val === null || val === "") {
          return;
        }
        var yyyymmdd = val.substring(0, 10);
        return yyyymmdd;
      }
    };
  },

  //***=========================================================================================================================================
  methods: {
    updateBaustoffBemerkungAnWurzelBaustoffBaum() {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Macht einen Update des Felds baustoffBemerkung
      // für den ausgewählten Baustoff (Aufruf per Button "Speichern" im Tab "Angaben zum Baustoff"/früher "Strukturierungsangaben"
      // TODO XXXXXX: Auch Feld baustoffBezeichnung updaten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In updateBaustoffBemerkungAnWurzelBaustoffBaum()");
      let apiRoute = process.env.API + "/Baustoffe/" + this.baustoffWurzel._id;
      //==============================================================================================================================
      // let stringifiedBemerkung = JSON.stringify(this.testBemerkung); // Stringify nötig, um Mongoose Cast Fehler am Backend zu verhindern!
      // ACHTUNG:
      // Funktioniert so alleine noch NICHT, denn stringify oder Mongoose inserted (per Compass) Backslahes vor den "-Zeichen in der hier
      // korrekt stringifiten JSON, als Escape Characters. Passiert auch mit ' statt ".
      // Siehe https://stackoverflow.com/questions/36338849/using-json-stringify-on-javascript-object-inserts-backslashes
      // und https://stackoverflow.com/questions/22484340/mongoose-stringify-removes-empty-elements/22486577#22486577 -
      // Versuch, es am Backend zu lösen mit minimize: false in den Schema Options - probiert, löst das Problem nicht! -->
      // Backend-Lösung braucht daher vermutlich Eingriff beim Speichern des Felds (dort auch minimize möglich laut obigen Posts)!
      //==============================================================================================================================
      // Daher 1. Hack-Lösung hier gemäß https://stackoverflow.com/questions/45717079/stop-json-stringify-from-adding-escape-characters
      let stringifiedBemerkung = JSON.stringify(this.testBemerkung).replace(
        /\\/g,
        ""
      );
      // Das speichert den String zwar ohne Backslashes per Compass, aber es gibt noch ein anderes Problem, dass die JSON mit "
      // am Anfang und am Ende versehen ist danach.
      // Dieses verhindert dann korrektes Parsen beim Lesen - Fehler unexpected token a in JSON at position 4 at JSON.parse!
      stringifiedBemerkung = stringifiedBemerkung.slice(1, -1); // 2. Hack: Daher noch den ersten und letzten Char entfernen ("...")
      // Damit funktioniert es dann!!!
      // Eine bessere Lösung wäre aber vermutlich Einsatz von Type "mixed" in Mongoose statt Speicherung von Objekten in Strings
      console.log("stringifiedBemerkung: ", stringifiedBemerkung);
      //==============================================================================================================================
      this.$axios
        .put(apiRoute, {
          baustoffBemerkung: stringifiedBemerkung
        })
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.put, response.status: ",
            response.status
          ); // Status loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_AENDERUNG_ERFOLG
          );
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.put, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_AENDERUNG_FEHLER
          );
        });
    },

    readBaustoffBemerkungAnWurzelBaustoffBaum() {
      //--------------------------------------------------------------------------------------------------------------------
      // Liest testweise Wurzelknoten des Baustoffbaums
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In readBaustoffBemerkungAnWurzelBaustoffBaum()");
      const apiRoute = process.env.API + "/Baustoffe/Wurzel";
      this.$axios
        .get(apiRoute)
        .then(response => {
          this.baustoffWurzel = response.data; // Merkt sich id von Baustoffbaumwurzelknoten für obigen update-Call
          console.log(
            "response.data.baustoffBemerkung: ",
            response.data.baustoffBemerkung
          );
          this.testBemerkung = JSON.parse(response.data.baustoffBemerkung); // Reverse von JSON.stringify, macht wieder JSON daraus
          // Funktioniert aber nicht, wegen obigem Problem, dass der String am Backend von Mongoose mit Backslahes vor den " escaped wird!
          console.log(
            "baustoffBemerkung nach JSON.parse: ",
            this.testBemerkung
          ); // Sollte Object sein!
          console.log("this.testBemerkung.a: ", this.testBemerkung.a); // Fehler: undefined
          console.log("this.testBemerkung.b: ", this.testBemerkung.b); // Fehler: undefined
          console.log(
            "Testsumme: ",
            this.testBemerkung.a + this.testBemerkung.b
          ); // Fehler: NaN
        })
        .catch(error => {
          // NEU: Error Handling mit .catch
          console.log("Error bei loadRootNodeTreeBaustoffe - error: ", error);
        });
    },

    selectFilterFunctionGemeinden(val, update) {
      //----------------------------------------------------------------------------------------------------------------------
      // Filter-Funktion für QSelect zur Auswahl von Gemeinden mit Gemeinden in QSelect
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung auf den Feldern name (Gemeindename), land (Bundesland), kreis,
      // gemeindeverband, nummer (Gemeindeschlüssel)
      // ohne dass die durch den Filter erfassten Objekte automatisch zum Menü selbst (d.h. zum selectOptionsBauinformationen)
      // hinzugefügt werden
      //----------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionGemeinden(val) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsGemeinden = this.selectOptionsGemeinden;
          console.log("selectOptionsGemeinden: ", this.selectOptionsGemeinden);
          console.log(
            "selectFilterOptionsGemeinden: ",
            this.selectFilterOptionsGemeinden
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          //===============================================================================================================================
          this.selectFilterOptionsGemeinden = this.selectOptionsGemeinden.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            (
              v // ACHTUNG: Fix für #268, "!= null"-Abfrage erschlägt auch gleich den undefined-Fall!
            ) =>
              (v.name != null && v.name.toLowerCase().indexOf(needle) > -1) ||
              (v.namen.land != null &&
                v.namen.land.toLowerCase().indexOf(needle) > -1) ||
              (v.namen.regierungsbezirk != null &&
                v.namen.regierungsbezirk.toLowerCase().indexOf(needle) > -1) ||
              (v.namen.kreis != null &&
                v.namen.kreis.toLowerCase().indexOf(needle) > -1) ||
              (v.namen.gemeindeverband != null &&
                v.namen.gemeindeverband.toLowerCase().indexOf(needle) > -1) ||
              (v.schlüssel.nummer != null &&
                v.schlüssel.nummer.toLowerCase().indexOf(needle) > -1) // NEU
          );
          console.log(
            "selectFilterOptionsGemeinden: ",
            this.selectFilterOptionsGemeinden
          );
        }
      });
    },

    changeKennWort: function() {
      // --------------------------------------------------------------------------------------------------------------------
      // Methode - Ändert das Kennwort für den aktuell angemeldeten Benutzer am Backend
      // --------------------------------------------------------------------------------------------------------------------
      console.log("In changeKennWort()");
      console.log(
        "localStore.state.anmeldeDatenBenutzer.eMailBenutzer: ",
        this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
      );
      const apiRoute = process.env.API + "/Authentifizierung/Kennwortaenderung";
      this.$axios
        // Schickt einen Post-Request an das Backend für Passwortänderung
        .post(apiRoute, {
          // Body:
          eMail: this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer,
          bisherigesKennWort: this.bisherigesKennWort, // Das oben im Form eingegebene Feld
          neuesKennWort: this.neuesKennWort // Das oben im Form eingegebene Feld
        })
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.post, response.status: ",
            response.status
          ); // Status loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_ERFOLG
          );
          /*
          this.bisherigesKennWort = null;
          this.neuesKennWort = null;
          this.neuesKennWortDuplikat = null;
          */
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.post, error: ", error); // Error loggen
          if (error.response.status === 403) {
            console.log(
              "Status 403 - Inkorrektes bisheriges Passwort von Passport local Mongoose gemeldet"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_INKORREKT
            );
          } else {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_AENDERUNG_FEHLER
            );
          }
          this.bisherigesKennWort = null;
          this.neuesKennWort = null;
          this.neuesKennWortDuplikat = null;
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methode zum Laden von Testdaten in die Datenbank - noch nicht implementiert
    // 0. Eventuell betroffene Collections löschen
    // 1. Bauinformationen erzeugen
    //    Dabei API für createBauinformation benutzen - gibt id zurück - diese merken!
    // 2. Test-Dokumente für diese Bauinformationen aus statischem Ordner im Frontend hochladen per Dateien-Controller
    //    Dabei Filenamen und ids merken
    // 3. Bauinformationen aus 1. updaten mit der Info aus 2.
    // 4. Baustoffe erzeugen mit /Baustoffe/
    //    Dabei API für createKindKnotenBaustoff verwenden
    //    TODO: Diese Controller-Methode muss id zurückgeben
    // 5. Optional: In erzeugten Baustoffen zugeordnete Bauinformationen speichern per put /Baustoffe/:/id/Bauinformationen mit ids im Body
    // HINWEIS: Wurzelbaustoff und Wurzel des Rohstoffbaums muss bereits beim Server Start am Backend angelegt werden!!!
    // 6. Optional: In erzeugten Rohstoffen zugeordnete Rohstoffe speichern
    // 7. Baueigenschaften erzeugen
    //    Dabei API für createBaueigenschaft verwenden
    //    TODO: Diese Controller-Methode muss id zurückgeben
    //    Dabei kann auch ein Verweis auf eine Bauinformation eingetragen werden!
    //
    ladeTestDaten: function() {
      console.log("In ladeTestDaten");
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Testmethode zum testweisen Aufruf der guarded Route /Benutzer mit JWT Token im Header zur Authentifizierung
    requestGuardedRouteBenutzer: function() {
      console.log("In requestGuardedRouteBenutzer");
      const apiRoute = process.env.API + "/Benutzer";
      const myJWTToken = localStorage.getItem("jwtToken");
      console.log("Token geholt");
      // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
      // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
      // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
      this.$axios.defaults.headers.common["Authorization"] =
        "bearer " + myJWTToken;
      // Testergebnisse bei eingelogtem Benutzer mit Token in local Storage:
      // Fehlversuch 0: = myJWTToken => Error 401, Route wird nicht aufgerufen per Server Log (Code aus der Vorlage)
      // Fehlversuch 1: = "JWT " + myJWTToken => Error 401, Route wird nicht aufgerufen per Server Log
      // Fehlversuch 2: = "jwt " + myJWTToken => Error 401, Route wird nicht aufgerufen per Server Log
      // Lösung 3: = "Bearer " + myJWTToken => Route benutzerRoute.get wird aufgerufen per Server Log, Success 200!!!
      // Lösung 4: = "bearer " + myJWTToken => Route benutzerRoute.get wird aufgerufen per Server Log, Success 200!!!
      // Die Lösung stand in June 2, 2018 Kommentar von https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/
      // sowie in https://stackoverflow.com/questions/45897044/passport-jwt-401-unauthorized
      this.$axios
        .get(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.get, response.status: ",
            response.status
          ); // Status loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT
          );
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.get, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
          );
        });
    },

    vorlageFuerMethode: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion für ...
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In vorlageFuerMethode");
    },

    initialisiereAusgewaehltesTabEinstellungen() {
      //--------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Tabs für die Einstellungen
      //--------------------------------------------------------------------------------------------------------------------------------
      console.log("In initialisiereAusgewaehltesTabEinstellungen");
      console.log("this.tabEinstellungen: ", this.tabEinstellungen);
    },

    updateBenutzer: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Macht einen Update des Benutzers (Aufruf per Button "Speichern" im Tab "Einstellungen")
      // ACHTUNG: Der für den Benutzer einstellbare Wert für tablesPaginationRowsPerPage wird zusammen mit der Mongoose id des Benutzers im global/local Store
      //          (worauf das QSelect-Feld in den Einstellungen hier in einstellungen.vue arbeitet) gehalten, aber auch in der Datenbank UND im Browser localStorage.
      //          Auf letzteres wird (bei angemeldetem Benutzer) zurückgegriffen, wenn bei Browser Refresh das Feld neu gesetzt
      //          werden muss im global Store. Zusätzlich wird es bei Benutzeranmeldung in my-layout.vue aus der Datenbank gelesen und
      //          mit dem aus der Datenbank gelesenen Wert die Felder im global Store (Mutator anmeldungBenutzer()) und localStorage (Browser) gesetzt.
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In updateBenutzer()");
      console.log(
        "localStore.state.anmeldeDatenBenutzer.idBenutzer: ",
        this.localStore.state.anmeldeDatenBenutzer.idBenutzer
      );
      const apiRoute =
        process.env.API +
        "/Benutzer/" +
        this.localStore.state.anmeldeDatenBenutzer.idBenutzer;
      this.$axios
        .put(apiRoute, {
          // Schickt einen Put-Request an das Backend für Update des Benutzers
          // Hier wird nur das Feld tablesPaginationRowsPerPage updated/mitgeschickt!
          tablesPaginationRowsPerPage: this.localStore.state
            .einstellungenBenutzer.tablesPaginationRowsPerPage, // Das oben im Form per QSelect abgeänderte Feld
          // NEU: Zusätzlich das Feld farbSchema mitgeschicken:
          farbSchema: this.localStore.state
            .einstellungenBenutzer.farbSchema, // Das oben im Form per QSelect abgeänderte Feld
          // NEU: Zusätzlich das Feld treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig mitschicken:
          treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig: this
            .localStore.state.einstellungenBenutzer
            .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig,
           // NEU: Für #262 7usätzlich das Feld vorgabeWerteUeberschreibenVorhandeneWerte mitschicken:
          vorgabeWerteUeberschreibenVorhandeneWerte: this
            .localStore.state.einstellungenBenutzer
            .vorgabeWerteUeberschreibenVorhandeneWerte
        })
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.put, response.status: ",
            response.status
          ); // Status loggen
          // ACHTUNG: RowsPerPage auch in localStorage aktualisieren, sonst wird bei Browser Refresh daraus noch der alte Wert restauriert!!!
          // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
          localStorage.setItem(
            "tablesPaginationRowsPerPage",
            this.localStore.state.einstellungenBenutzer
              .tablesPaginationRowsPerPage
          );
          // NEU:
          localStorage.setItem(
            "farbSchema",
            this.localStore.state.einstellungenBenutzer
              .farbSchema
          );
          localStorage.setItem(
            "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig",
            JSON.stringify(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              this.localStore.state.einstellungenBenutzer
                .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
            )
          );
          localStorage.setItem( // NEU: Für #262
            "vorgabeWerteUeberschreibenVorhandeneWerte",
            JSON.stringify(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              this.localStore.state.einstellungenBenutzer
                .vorgabeWerteUeberschreibenVorhandeneWerte
            )
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BENUTZER_AENDERUNG_ERFOLG
          );
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.put, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BENUTZER_AENDERUNG_FEHLER
          );
        });
    }
  }, // /methods:

  //***============================================================================================================================
  computed: {
    computeXYZ: function() {
      return "http://localhost:4200/"; // Test-Methode
    },

    kennWortValidierung: function() {
      // Prüft, ob Kennwort eingegeben wurde, sonst Fehlermeldung
      // NEU: Prüfung auf zusätzliche Kriterien
      // Vorlage: https://www.kurmis.com/2019/11/01/password-strength-javascript.html
      return [v => !!v || "Die Eingabe des neuen Kennworts ist erforderlich",
              v => v.length > 7 || "Das neue Kennwort muss mindestens 8 Zeichen enthalten",
              v => /[a-z]/.test(v) || "Das neue Kennwort muss mindestens einen Kleinbuchstaben enthalten",
              v => /[A-Z]/.test(v) || "Das neue Kennwort muss mindestens einen Großbuchstaben enthalten",
              v => /\d/.test(v) || "Das neue Kennwort muss mindestens eine Ziffer enthalten",
              v => /[^A-Za-z0-9]/.test(v) || "Das neue Kennwort muss mindestens ein Sonderzeichen enthalten"
      ];
    },

    benutzerRolleIstMitarbeiter: function() {
      console.log("In benutzerRolleIstMitarbeiter (computed)");
      // console.log("localStore.state.anmeldeDatenBenutzer.benutzerRolle: ", this.localStore.state.anmeldeDatenBenutzer.benutzerRolle);
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        return true;
      } else {
        return false;
      }
    },

    //--------------------------------------------------------------------------------------------------------------------------------
    // NEU: Computed Properties zur Validierung von Feldern
    //--------------------------------------------------------------------------------------------------------------------------------
    kennWortEingabenSindValide: function() {
      // Prüft, ob die Kennworteingaben valide sind und übereinstimmen
      if (this.neuesKennWort == null || this.neuesKennWortDuplikat == null) {
        return false;
      } else {
        if (this.neuesKennWort === this.neuesKennWortDuplikat) {
          return true;
        } else {
          return false;
        }
      }
    }
  }, // /computed:

  //***============================================================================================================================
  mounted: async function() {
    console.log("In mounted von einstellungen.vue");
    //---------------------------------------------------------------------------------------------------------------------------
    // NEU: JWT Header setzen für Axios Calls an das Backend:
    // Muss VOR Backend Calls stehen, sonst 401 Fehler!!!
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;
    //-----------------------------------------------------------------------------------------------------------------------------
    // Für Tests von Gemeinden:
    console.log("Initialisiere Variable selectOptionsGemeinden aus JSON-Array");
    this.selectOptionsGemeinden = GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten;
    this.selectFilterOptionsGemeinden = GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten;
    console.log("selectOptionsGemeinden[0]: ", this.selectOptionsGemeinden[0]);
    // NEU: JWT Header setzen für Axios Calls an das Backend:
    //-----------------------------------------------------------------------------------------------------------------------------
    // Für Tests von Casting von JSON (Testfeld ist Bemerkung an Wurzel Baustoffbaum)
    this.readBaustoffBemerkungAnWurzelBaustoffBaum();
  } // /mounted:
}; // /exports
</script>
//***============================================================================================================================
<style></style>
