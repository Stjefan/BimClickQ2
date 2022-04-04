<!-- daten-austausch.vue -->
<!-- TODOs -->
<!-- 1. TODO - Nach einem Import von Bauinformationen sind die Referenzen aus Baustoffen auf Bauinformationen nicht mehr korrekt, da diese neue Ids erhalten! -->
<!--    Daher ist dieser Import bisher nur für die Erstanlage von Bauinformationen einsetzbar -->
<!-- 2. Benutzernachrichten beim Import - beim Export bereits implementiert -->
<!--***=======================================================================================================================================================-->
<template>
  <q-page class="q-pa-xs">
    <!-- content -->
    <div>
      <!--<p>{{treeSelectedItem}}</p> -->
      <!-- <q-splitter v-model="splitterModel" style="height: 1000px"> -->
      <q-splitter v-model="splitterModel" :limits="[10, 50]"
        >"
        <template v-slot:before>
          <q-card>
            <div class="q-pa-xs text-center">
              <br />
              [Reserviert für Baumstrukturen]
              <!--
              <q-tree
                ref="tree"
                :nodes="treeData"
                default-expand-all
                node-key="_id"
                label-key="Name"
                :selected.sync="treeSelectedKey"
                @lazy-load="lazyLoadHandling"
              />
              -->
            </div>
          </q-card>
        </template>
        <template v-slot:after>
          <!-- <div v-if="treeSelectedItem"> -->
          <div class="q-pa-xs">
            <q-tabs
              mobile-arrows
              v-model="tabDatenaustausch"
              class="q-pa-none text-black bg-grey-4 full-width"
              active-color="primary"
              active-bg-color="white"
              content-class="text-h7"
              dense
              align="left"
            >
              <q-tab name="exportTabDatenaustausch" label="Export" no-caps />
              <!-- NEU: Import-Tab disablen, wenn Benutzerrolle nicht "Administrator" ist! -->
              <q-tab
                name="importTabDatenaustausch"
                label="Import"
                :disable="
                  localStore.state.anmeldeDatenBenutzer.benutzerRolle !==
                    'Administrator'
                "
                no-caps
              />
              <q-tab
                name="testTabDatenaustausch"
                label="Test Area (für Administratoren)"
                v-if="
                  localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
                    'Administrator'
                "
                no-caps
              />
            </q-tabs>
            <!-- <q-separator /> -->
            <q-tab-panels v-model="tabDatenaustausch" animated>
              <!--------------------------------------------------------------------------------------------------------------------->
              <q-tab-panel name="exportTabDatenaustausch" class="q-pa-xs">
                <q-form>
                   <p class="text-h6" v-if="$q.screen.gt.sm">
                      Export von Daten aus BIM.<em>click</em>
                  </p>
                  <p class="text-subtitle1" v-else>
                    Export von Daten aus BIM.<em>click</em>
                  </p>
                  <div>
                    <b>Hinweis:</b> Zum Export in der Zeile mit den gewünschten
                    zu exportierenden Informationen:
                    <ul>
                      <li>Zunächst ggf. das Eingabefeld ausfüllen</li>
                      <li>
                        Dann die grüne Schaltfläche zum Export
                        drücken
                      </li>
                      <li>
                        Das Ergebnis des Exports wird durch eine
                        Benutzernachricht angezeigt
                      </li>
                      <li>
                        Nach erfolgreichem Export die orangefarbige Schaltfläche drücken, um das Ergebnis des Exports als Datei
                        herunterzuladen
                      </li>
                    </ul>
                  </div>
                  <q-separator />
                  <br />
                  <div class="row full-width items-start q-col-gutter-xs">
                    <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
                    <div class="col-md-3 col-12">
                      Baueigenschaften an Baustoff:
                    </div>
                    <div class="col-md-3 col-12">
                      <q-input
                        square
                        dense
                        bg-color="teal-2"
                        standout="bg-teal-4 text-black"
                        v-model="baustoffId"
                        label="Id des Baustoffs"
                        hint="Id des Baustoffs, z.B. '5ec2d3cacf5663001718c346' (ohne Anführungszeichen). Bei Eingabe von '*' statt einer Id wird die Id des Wurzelknotens des Baustoffbaums herangezogen. Hinweis: Zur Ermittlung der Id eines Baustoffs im Tab 'Einstellungen' den Debug-Modus einschalten. Dann wird im Tab 'Baustoffe' für einen links im Baustoffbaum ausgewählten Baustoff dessen Id im Unter-Tab 'Angaben zum Baustoff' angezeigt"
                        hide-hint
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baustoffe.controller.js) so eingestellt, dass hier JSON File und CSV File erzeugt wird!                  -->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        color="secondary"
                        glossy
                        @click="submitExportBaueigenschaftenAnBaustoff()"
                        label="Baueigenschaften exportieren"
                        no-caps
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baustoffe.controller.js) temporär umgestellt, dass hier JSON File statt CSV File heruntergeladen wird    -->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        :href="getPfadExportBaueigenschaftenAnBaustoff"
                        type="a"
                        target="_blank"
                        label="Baueigenschaften herunterladen (aktuell JSON-Datei)"
                        color="deep-orange"
                        glossy
                        no-caps
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <!-- ------------------------------------------------------------------------------------------------- -->
                  <div class="row full-width items-start q-col-gutter-xs">
                    <div class="col-md-3 col-12">
                      Baueigenschaften an Baueinheit:
                    </div>
                    <div class="col-md-3 col-12">
                      <q-input
                        square
                        dense
                        bg-color="teal-2"
                        standout="bg-teal-4 text-black"
                        v-model="baueinheitId"
                        label="Id der Baueinheit"
                        hint="Id der Baueinheit, z.B. '5ec2d1d93c235300174789e7' (ohne Anführungszeichen). Bei Eingabe von '*' statt einer Id wird die Id des Wurzelknotens des Bauvorhabenbaums herangezogen. Hinweis: Zur Ermittlung der Id einer Baueinheit im Tab 'Einstellungen' den Debug-Modus einschalten. Dann wird im Tab 'Bauvorhaben' für einen links im Bauvorhabenbaum ausgewählte Baueinheit deren Id im Unter-Tab 'Angaben zur Baueinheit' angezeigt."
                        hide-hint
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baueinheiten.controller.js) temporär umgestellt, dass hier JSON- und XLSX-Datei erzeugt wird per ExcelJS!-->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        color="secondary"
                        glossy
                        @click="submitExportBaueigenschaftenAnBaueinheit()"
                        label="Baueigenschaften exportieren"
                        no-caps
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baueinheiten.controller.js) so eingestellt, dass hier XLSX-Datei heruntergeladen wird!                   -->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        :href="getPfadExportBaueigenschaftenAnBaueinheit"
                        type="a"
                        target="_blank"
                        label="Baueigenschaften herunterladen (aktuell XLSX-Datei)"
                        color="deep-orange"
                        glossy
                        no-caps
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <!-- --------------------------------------------------------------------------------------------- -->
                  <div class="row full-width items-start q-col-gutter-xs">
                    <div class="col-md-3 col-12">
                      Bauteilkatalog an Baueinheit (experimentell):
                    </div>
                    <div class="col-md-3 col-12">
                      <q-input
                        square
                        dense
                        bg-color="teal-2"
                        standout="bg-teal-4 text-black"
                        v-model="baueinheitId"
                        label="Id der Baueinheit"
                        hint="Id der Baueinheit, z.B. '5ec2d1d93c235300174789e7' (ohne Anführungszeichen). Bei leerer Id oder '*' wird die Id des Wurzelknotens des Bauvorhabenbaums herangezogen. Hinweis: Zur Ermittlung der Id einer Baueinheit im Tab 'Einstellungen' den Debug-Modus einschalten. Dann wird im Tab 'Bauvorhaben' für einen links im Bauvorhabenbaum ausgewählte Baueinheit deren Id im Unter-Tab 'Angaben zur Baueinheit' angezeigt."
                        hide-hint
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baueinheiten.controller.js) temporär umgestellt, dass hier JSON- und XLSX-Datei erzeugt wird per ExcelJS!-->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        color="secondary"
                        glossy
                        @click="submitExportBauteilkatalogAnBaueinheit()"
                        label="Bauteilkatalog exportieren"
                        no-caps
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- ================================================================================================================================================== -->
                      <!-- ACHTUNG: Den zugehörigen Code im Backend (baueinheiten.controller.js) so eingestellt, dass hier XLSX-Datei heruntergeladen wird!                   -->
                      <!-- ================================================================================================================================================== -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        :href="getPfadExportBauteilkatalogAnBaueinheit"
                        type="a"
                        target="_blank"
                        label="Bauteilkatalog herunterladen (XLSX-Datei)"
                        color="deep-orange"
                        glossy
                        no-caps
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <!-- --------------------------------------------------------------------------------------------- -->
                  <div class="row full-width items-start q-col-gutter-xs">
                    <div class="col-md-3 col-12">
                      Layout-Vorlage für Baueigenschaftsprofil:
                    </div>
                    <div class="col-md-3 col-12">
                      <q-input
                        square
                        dense
                        bg-color="teal-2"
                        standout="bg-teal-4 text-black"
                        v-model="baueigenschaftsProfilBezeichnung"
                        label="Bezeichnung des Baueigenschaftsprofils"
                        hint="Z.B. 'Allgemein > Test > Wertetypen'"
                        hide-hint
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        color="secondary"
                        glossy
                        @click="submitExportLayoutBaueigenschaftsProfil()"
                        label="Layout-Vorlage exportieren"
                        no-caps
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        :href="getPfadExportLayoutBaueigenschaftsProfil"
                        type="a"
                        target="_blank"
                        label="Layout-Vorlage herunterladen (JSON-Datei)"
                        color="deep-orange"
                        glossy
                        no-caps
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <!-- --------------------------------------------------------------------------------------------- -->
                  <div class="row full-width items-start q-col-gutter-xs">
                    <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
                    <div class="col-md-3 col-12">
                      Bauinformationen:
                    </div>
                    <div class="col-md-3 col-12"></div>
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        color="secondary"
                        glossy
                        @click="submitExportBauinformationen()"
                        label="Bauinformationen exportieren"
                        no-caps
                      />
                    </div>
                    <div class="col-md-3 col-12">
                      <q-btn
                        class="stretch full-width"
                        style="height:100%"
                        :href="getPfadExportBauinformationen"
                        type="a"
                        target="_blank"
                        label="Bauinformationen herunterladen"
                        color="deep-orange"
                        glossy
                        no-caps
                      />
                    </div>
                  </div>
                </q-form>
              </q-tab-panel>
              <!-- /q-tab-panel name="exportTabDatenaustausch" ------------------------------------------------------------------------>
              <q-tab-panel name="importTabDatenaustausch" class="q-pa-xs">
                <q-form>
                  <p class="text-h6" v-if="$q.screen.gt.sm">
                      Import von Daten nach BIM.<em>click</em>
                  </p>
                  <p class="text-subtitle1" v-else>
                    Import von Daten nach BIM.<em>click</em>
                  </p>
                  <div class="text-red">
                    <b>Hinweis:</b> Importe führen zu permanenten Änderungen in der BIM.<em>click</em>-Datenbank, die Verluste von
                    vorhandenen Daten zur Folge haben können. Sie sollten nur von erfahrenen Adminnistratoren durchgeführt werden.
                  </div>
                  <br />
                  <div class="row full-width items-start q-col-gutter-xs">
                    <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
                    <!-- NEU: Factory Function uploadFile, um 401 Fehler beim Upload zu eliminieren durch sonst fehlenden Authorization Header mit JWT Token! -->
                    <!-- Den Code für uploadFile() Code kopiert aus den Uploadern in bauinformationen.vue -->
                    <div class="col-md-3 col-12 q-pr-sm">
                      <q-uploader
                        square
                        class="stretch full-width"
                        :factory="uploadFile"
                        ref="uploaderImportDatenaustausch"
                        :url="getUploadURL()"
                        label="Datei hochladen für Import"
                        accept=".json, .csv"
                        color="light-green"
                        text-color="white"
                        @uploaded="
                          storeNameOfUploadedFileUploaderImportDatenaustausch
                        "
                        :multiple="false"
                      />
                    </div>
                    <!-- <div class="col-1"></div> -->
                    <div class="col-md-9 col-12">
                      <div class="row full-width items-start q-col-gutter-xs">
                        <div class="col-md-4 col-12">
                          Bauinformationen:
                        </div>
                        <div class="col-md-4 col-12">
                          <q-input
                            square
                            bg-color="teal-1"
                            standout="bg-teal-4 text-black"
                            dense
                            v-model="nameCSVFileImportBauinformationen"
                            label="Dateiname"
                            hint="Dateiname der zu importierenden CSV-Datei, z.B. 'Bauinformationen_20191215_124540.csv'"
                            hide-hint
                          />
                        </div>
                        <div class="col-md-4 col-12">
                          <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                          <q-btn
                            color="secondary"
                            class="stretch full-width"
                            style="height: 100%"
                            glossy
                            @click="submitImportBauinformationen()"
                            label="Bauinformationen importieren"
                            no-caps
                          />
                        </div>
                      </div>
                      <div class="row full-width items-start q-col-gutter-xs">
                        <div class="col-md-4 col-12">
                          Bauvorhaben/Baueinheiten:
                        </div>
                        <div class="col-md-4 col-12">
                          <q-input
                            square
                            bg-color="teal-1"
                            standout="bg-teal-4 text-black"
                            dense
                            v-model="nameJSONFileImportBaueinheiten"
                            label="Dateiname"
                            hint="Dateiname der zu importierenden JSON-Datei, z.B. 'bauvorhaben.json'"
                            hide-hint
                          />
                        </div>
                        <div class="col-md-4 col-12">
                          <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                          <!-- @click="submitImportBaueinheitenMitAgendaJob()" -->
                          <q-btn
                            color="secondary"
                            class="stretch full-width"
                            style="height: 100%"
                            glossy
                            @click="submitImportBaueinheiten()"
                            label="Baueinheiten importieren"
                            no-caps
                          />
                        </div>
                      </div>
                      <div class="row full-width items-start q-col-gutter-xs">
                        <div class="col-md-4 col-12">
                          Baustoffe:
                        </div>
                        <div class="col-md-4 col-12">
                          <q-input
                            square
                            bg-color="teal-1"
                            standout="bg-teal-4 text-black"
                            dense
                            v-model="nameJSONFileImportBaustoffe"
                            label="Dateiname"
                            hint="Dateiname der zu importierenden JSON-Datei, z.B. 'baustoffe.json'"
                            hide-hint
                          />
                        </div>
                        <div class="col-md-4 col-12">
                          <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                          <q-btn
                            color="secondary"
                            class="stretch full-width"
                            style="height: 100%"
                            glossy
                            @click="submitImportBaustoffe()"
                            label="Baustoffe importieren"
                            no-caps
                          />
                        </div>
                      </div>
                      <div class="row full-width items-start q-col-gutter-xs">
                        <div class="col-md-4 col-12">
                          Baueigenschaften (für Baustoffe und Baueinheiten):
                        </div>
                        <div class="col-md-4 col-12">
                          <q-input
                            square
                            bg-color="teal-1"
                            standout="bg-teal-4 text-black"
                            dense
                            v-model="nameJSONFileImportBaueigenschaften"
                            label="Dateiname"
                            hint="Dateiname der zu importierenden JSON-Datei, z.B. 'Baueigenschaften.json'"
                            hide-hint
                          />
                        </div>
                        <div class="col-md-4 col-12">
                          <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                          <q-btn
                            color="secondary"
                            class="stretch full-width"
                            style="height: 100%"
                            glossy
                            @click="submitImportBaueigenschaftenMitAgendaJob()"
                            label="Baueigenschaften importieren"
                            no-caps
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-tab-panel>
              <!-- /q-tab-panel name="importTabDatenaustausch ------------------------------------------------------------------------>
              <q-tab-panel name="testTabDatenaustausch" class="q-pa-xs">
                <q-form>
                  <br />
                  <div
                    class="row full-width items-start q-pa-xs q-col-gutter-xs"
                  >
                    <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <q-btn
                        class="stretch full-width"
                        style="height: 100%"
                        color="secondary"
                        glossy
                        @click="emitEventAusDatenAustausch()"
                        label="Öffne rechten Auszug"
                        no-caps
                      />
                    </div>
                  </div>
                  <div
                    class="row full-width items-start q-pa-xs q-col-gutter-xs"
                  >
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <q-btn
                        class="stretch full-width"
                        style="height: 100%"
                        color="purple-4"
                        glossy
                        @click="aendereGlobalTestObject()"
                        label="Ändere globales Testobjekt"
                        no-caps
                      />
                      <div v-if="localStore.state.debugMode">
                        <br />
                        <br />
                        localStore.state.globalTestObject:
                        <br />
                        {{ localStore.state.globalTestObject }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="row full-width items-start q-pa-xs q-col-gutter-xs"
                  >
                    <div class="col-md-3 col-12">
                      <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
                      <q-btn
                        class="stretch full-width"
                        style="height: 100%"
                        color="green-4"
                        glossy
                        @click="leseBauinformationsProfile()"
                        label="Lese Bauinformationsprofile"
                        no-caps
                      />
                      <div v-if="localStore.state.debugMode">
                        <br />
                        <br />
                        localStore.state.globalTestObject:
                        <br />
                        {{ localStore.state.globalTestObject }}
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
            <q-separator />
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>
<!--***===============================================================================================================================-->
<script>
// import bauwerkszuordnungen from "./bauwerkszuordnungen.js";

/*
// ALT:
const selectOptionsTypBauvorhaben = [
  "Einfamilienhaus",
  "Mehrfamilienhaus",
  "Bürogebäude",
  "Fabrikgebäude",
  "Verwaltungsgebäude",
  "Schulgebäude",
  "Therme"
];
*/

//***============================================================================================================================

// import * as VueGoogleMaps from "vue2-google-maps";
// NEU: Für Package vue2-google-maps,https://github.com/xkjyeah/vue-google-maps/blob/vue2/README.md - zurückgestellt

//***============================================================================================================================
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { Loading, QSpinnerGears, Notify } from "quasar"; // NEU: Loading, QSpinnerGears, Notify für Spinner Gears, z.B. in loadTreeBaustoffe()

export default {
  components: {
    //ABC
  },
  name: "Datenaustausch", // Vue Component Name - ACHTUNG - dabei beachten:
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
      // debugMode: false, // Zeigt für Debugging ggf. diverse interne Objekte an am User Interface - NEU: Ersetzt durch local/globalStore.state.debugMode
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.

      splitterModel: 14,
      tabDatenaustausch: "exportTabDatenaustausch",
      baustoffId: "", // NEU
      baueinheitId: "", // NEU
      // baustoffBezeichnung: "Baustoffe", // ALT
      baueigenschaftsProfilBezeichnung: "Allgemein > Test > Wertetypen", // NEU
      nameCSVFileImportBauinformationen:
        "Bauinformationen_YYYY-MM-DD_HH-mm-ss-SSS.csv",
      nameJSONFileImportBaueinheiten: "bauvorhaben.json",
      nameJSONFileImportBaustoffe: "baustoffe.json",
      nameJSONFileImportBaueigenschaften: "baueigenschaften.json",
      pfadExportBaueigenschaftenAnBaustoff: "", // ACHTUNG: Muss aus der Response des Export-API-Aufrufs jeweils individuell gesetzt werden!
      pfadExportBaueigenschaftenAnBaueinheit: "", // NEU - ACHTUNG: Muss aus der Response des Export-API-Aufrufs jeweils individuell gesetzt werden!
      pfadExportBauteilkatalogAnBaueinheit: "", // NEU - ACHTUNG: Muss aus der Response des Export-API-Aufrufs jeweils individuell gesetzt werden!
      pfadExportBauinformationen: "",
      pfadExportLayoutBaueigenschaftsProfil: "", // NEU

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

  //***============================================================================================================================
  methods: {
    vorlageFuerMethode: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion für ...
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In vorlageFuerMethode");
    },

    handleImportBaueigenschaftenMitAgendaJob: async function(data) {
      // ACHTUNG: Muss async sein, wegen await unten!
      // Funktion, die bei $socket.on Event ausgeführt wird, wenn Agenda Job am Backend complete ist (#354)
      console.log(
        "In handleImportBaueigenschaftenMitAgendaJob() - Socket-Nachricht empfangen vom Backend - Agenda Job complete"
      );
      console.log("data: ", data);
      // In data.id steckte beim Testjob agendaTestJob die id aus Agenda am Backend, die als Bezeichnung vom Server beim emit Socket für
      // den client-spezifischen Room für genau diesen Agenda Job verwendet wird!
      // Im weiteren Ausbau können hier weiter Daten kommen, z.B. ob Job auf Heroku von Agenda erfolgreich oder mit Fehler completed wurde
      // Die Auslagerung in Agenda Jobs dient der Vermeidung von H12/H13 Timeout Fehlern, die auf Heroku automatisch nach 30 Sekunden ausgelöst werden.
      // Hier soll im Gefolge dann z.B. ein Refresh Event (z.B. in baueinheiten.vue, baustoffe.vue oder datenaustausch.vue) ausgelöst werden, z.B.
      // nach Verschieben von Zweigen in den Bäumen, oder nach Import
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Hier nun verzögert die Aktionen nach Import von Baueigenschaften ausführen, die bisher direkt nach der ersten Request-Response
      // ausgeführt wurden:
      Loading.hide(); // Spinner beenden
      // Hier Unterscheidung Kopieren/Verschieben, kann z.B. aus result entnommen werden (sonst müsste es zwischengespeichert werden in data())
      if (data.result.status === 201) {
        // ACHTUNG: Hier kommt 201 zurück, nicht 200!
        globalStore.showBenutzerAktion(
          // ACHTUNG: Hier Benutzeraktion mit Refresh-Schaltfläche!
          BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_ERFOLG
        );
      } else {
        // 401 - bei falschem Filename, 500 - z.B. bei duplicate Key aus MongoDB o.ä.
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_FEHLER
        );
      }
    },

    //----------------------------------------------------------------------------------------------------------------------------
    // NEU: Neue Factory Function für q-uploader, um Authorization Header mit JWT Token mitgeben zu können und damit 401 Fehler
    // mit den bisherigen q-uploaders ohne Factory Function (bei Aktivierung von JWT Authorisierung am Frontend und Backend)
    // zu eliminieren!!!
    // Diesen Code für uploadFile() Code kopiert aus den Uploadern in bauinformationen.vue
    // Wird an ALLEN q-uploaders definiert per :factory="uploadFile" (NICHT: "uploadFile()")
    // Siehe https://quasar.dev/vue-components/uploader#ASP.NET-MVC%2FCore als Vorlage und BIM.click Backlog Item #96
    // Bringt per Test nach Upoload Status 200 (uff!!!)
    // TODO: XXXXXX Der Code läuft im Gegensatz zu den anderen API Calls OHNE Axios und fällt daher aus dem Rahmen -
    // z.B. funktionieren damit für die File Upoload Requests nicht die Axios Interceptors
    // Allerdings returned der Code nur eine Promise, die sich in ein Objekt für Quasar resolved (bestehend aus {url, method, headers})
    // und macht gar nicht selbst den HTTP-Post-Call (den man durch Axios mit JWT-Header ersetzen könnte), sondern dieser wird
    // offenbar in Quasar intern gemacht! Daher ist eine Umstellung auf Axios nicht so einfach möglich.
    //----------------------------------------------------------------------------------------------------------------------------
    uploadFile: function(file) {
      return new Promise((resolve, reject) => {
        console.log("In getUploadFile");
        // Retrieve JWT token from your store.
        const myJWTToken = localStorage.getItem("jwtToken");
        console.log("Token geholt");
        // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
        // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
        // TODO: XXXXXX - besser mit Axios?!? Aber wie genau den Axios Call in resolve() unten einpassen?
        console.log("Vor Post für File Upload");
        resolve({
          url: process.env.fileAPI + "/Dateien/upload",
          method: "POST",
          headers: [
            // { name: "Content-Type", value: "application/json" }, // // Damit kommt Error Status 500 - disabled!!!
            { name: "Authorization", value: "Bearer " + myJWTToken }
          ]
        });
      });
      /*
        // Variante OHNE Promise, nicht weiter getestet:
        console.log("In getUploadFile");
        // Retrieve JWT token from your store.
        const myJWTToken = localStorage.getItem("jwtToken");
        console.log("Token geholt");
        // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
        // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
        // TODO: XXXXXX - besser mit Axios?!? Aber wie genau den Axios Call in resolve() unten einpassen?
        console.log("Vor Post für File Upload");
        return {
          url: process.env.fileAPI + "/Dateien/upload",
          method: "POST",
          headers: [
            // { name: "Content-Type", value: "application/json" }, // Damit kommt Error Status 500 - disabled!!!
            { name: "Authorization", value: "Bearer " + myJWTToken }
          ]
        };
      */
    },

    getUploadURL: function() {
      //---------------------------------------------------------------------------------------------------------------------
      // Methode, um die URL des Upload APIs am Backend Server für q-uploader (:url="getUploadURL()") zu bestimmen:
      // Angepasst für lokales Deployment auf localhost und Deployment auf Heroku!
      // Siehe bauinformationen.vue, getUploadURL für weitere Kommentare zur Funktionsweise
      // TODO XXXXXX Eventuell andere API-Methode definieren, die einen Upload speziell für Import in ein anderes Directory, z.B. /tmp/import macht
      // und die File nicht unbedingt in der Datenbank speichert (allerdings wird eigentlich trotzdem ein slugified, unique Name gebraucht, um
      // Namenskollisionen im Directory zu vermeiden)
      console.log("In getUploadURL");
      // Die return-Werte für lokal (if (process.env.DEV) {) und Production (} else {}) sind identisch, funktionieren auch in beiden Umgebungen, können also zusammengeführt werden!!!
      console.log(
        "getUploadURL: ",
        process.env.fileAPI + "/Dateien/upload" // Ohne Port, da dieser lokal in fileAPI enthalten ist und auf Heroku nicht gebraucht wird
      );
      return process.env.fileAPI + "/Dateien/upload"; // Ohne Port, da dieser lokal in fileAPI enthalten ist und auf Heroku nicht gebraucht wird
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion für QUploader uploaderImportDatenaustausch im Tab "Import"
    // Speichert File Name nach File Upload für internen Link in der Variablen slugNameOfUploadedFile
    // Hat als Parameter Objekt info = { [files], xhr } laut https://quasar.dev/vue-components/uploader
    // ACHTUNG: Erfordert offenbar nicht die Factory Function unten, daher diese disabled!
    // ACHTUNG: Dieser Change muss mit Vue $set, nicht mit einfacher Zuweisung erfolgen, sonst bekommt Vue es nicht mit - siehe https://vuejs.org/v2/guide/list.html#Caveats
    // Es handelt sich hier um einen Object Change in einem Array
    // Object Changes müssen auf jeden Fall mit $set erfolgen, wenn neue Felder zum Objekt hinzugefügt werden oder gelöscht werden
    // Dies ist hier eigentlich nicht der Fall - trotzdem per Test verifiziert, dass ohne $set für das Feld internerLink Vue dieses Feld in der q-table nicht aktualisiert!!!
    // Siehe https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats für die Fälle, wo $set notwendig ist.
    // sowie https://stackoverflow.com/questions/48809248/vuejs-and-vue-set-update-an-key-value-array
    // DONE: Abspeichern in der Datenbank!
    storeNameOfUploadedFileUploaderImportDatenaustausch: function(info) {
      // console.log(info.files[0]);
      console.log(
        "In storeNameOfUploadedFileUploaderImportDatenaustausch - info.files[0].name: ",
        info.files[0].name
      ); // File Name aus dem Upload

      console.log("info.xhr: ", info.xhr); // NEU
      // console.log("info.xhr.response.id: ", info.xhr.response.id); // Ist leider undefined, id muss daher geparsed werden aus dem Response Text:

      const idOfUploadedFile = JSON.parse(info.xhr.responseText).id;
      console.log("idOfUploadedFile: ", idOfUploadedFile);

      const slugNameOfUploadedFile = JSON.parse(info.xhr.responseText)
        .slugFileName;
      console.log("slugNameOUploadedFile: ", slugNameOfUploadedFile);

      // Abhängig von der File Extension die entsprechenden Input-Felder für den weiteren Import befüllen:
      // .csv => nameCSVFileImportBauinformationen
      // .json => nameJSONFileImportBaueigenschaften, nameJSONFileImportBaustoffe
      // HINWEIS: q-uploader lädt aktuell per Prop nur .csv und .json hoch
      if (slugNameOfUploadedFile.split(".").pop() === "csv") {
        // Siehe https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
        this.nameCSVFileImportBauinformationen = slugNameOfUploadedFile;
      } else {
        this.nameJSONFileImportBaueinheiten = slugNameOfUploadedFile;
        this.nameJSONFileImportBaustoffe = slugNameOfUploadedFile;
        this.nameJSONFileImportBaueigenschaften = slugNameOfUploadedFile;
      }
    },

    submitExportLayoutBaueigenschaftsProfil: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Export des Layouts für ein Baueigenschaftsprofil im q-input-Feld zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitExportLayoutBaueigenschaftsProfil()");
      // NEU:
      const apiRoute =
        process.env.API +
        "/Baueigenschaftsprofile/Export/?baueigenschaftsProfilBezeichnung=" +
        this.baueigenschaftsProfilBezeichnung;
      this.$axios
        .get(/* url */ apiRoute)
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          this.pfadExportLayoutBaueigenschaftsProfil = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler bei Export von Layout für Baueigenschaftsprofil - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LAYOUT_EXPORT_FEHLER
          );
        });
    },

    submitExportBaueigenschaftenAnBaustoff: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Export der Baueigenschaften für den Baustoff im q-input-Feld zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitExportBaueigenschaftenAnBaustoff()");
      // ALT:
      /* const url =
        "http://localhost:8080/api/baustoffe/exportMaterialEigenschaftenByBaustoffBezeichnung/" +
        this.baustoffBezeichnung;
      */
      // NEU:
      const apiRoute =
        process.env.API +
        "/Baustoffe/" +
        this.baustoffId +
        "/Baueigenschaften/Export";
      this.$axios
        .get(/* url */ apiRoute)
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          this.pfadExportBaueigenschaftenAnBaustoff = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler bei Export von Baueigenschaften an Baustoff - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTEN_EXPORT_FEHLER
          );
        });
    },

    submitExportBaueigenschaftenAnBaueinheit: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Funktion, um Export der Baueigenschaften für die Baueinheit im q-input-Feld zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitExportBaueigenschaftenAnBaueinheit()");

      // NEU: Wenn baueinheitId leer ist, dafür "*" einsetzen - dieses Zeichen wird dann am Backend abgefangen und dafür die ID der Wurzel des Bauvorhabenbaums genommen
      // ACHTUNG: /Baueinheiten//Baueigenschaften/Export führt dagegen zu 404 Fehler, API wird nicht gefunden!
      if (this.baueinheitId === "" || this.baueinheitId == null) {
        this.baueinheitId = "*";
      }
      const apiRoute =
        process.env.API +
        "/Baueinheiten/" +
        this.baueinheitId +
        "/Baueigenschaften/Export";
      this.$axios
        .get(/* url */ apiRoute)
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          this.pfadExportBaueigenschaftenAnBaueinheit = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler bei Export von Baueigenschaften an Baueinheit - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTEN_EXPORT_FEHLER
          );
        });
    },

    submitExportBauteilkatalogAnBaueinheit: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Funktion, um Export von Bauteilkatalog für die Baueinheit im q-input-Feld zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitExportBauteilkatalogAnBaueinheit()");

      // NEU: Wenn baueinheitId leer ist, dafür "*" einsetzen - dieses Zeichen wird dann am Backend abgefangen und dafür die ID der Wurzel des Bauvorhabenbaums genommen
      // ACHTUNG: /Baueinheiten//Bauteilkatalog/Export führt dagegen zu 404 Fehler, API wird nicht gefunden!
      if (this.baueinheitId === "" || this.baueinheitId == null) {
        this.baueinheitId = "*";
      }
      const apiRoute =
        process.env.API +
        "/Baueinheiten/" +
        this.baueinheitId +
        "/Bauteilkatalog/Export";
      this.$axios
        .get(/* url */ apiRoute)
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          this.pfadExportBauteilkatalogAnBaueinheit = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUTEILKATALOG_EXPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler bei Export von Bauteilkatalog an Baueinheit - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUTEILKATALOG_EXPORT_FEHLER
          );
        });
    },

    submitExportBauinformationen: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Export der Bauinformationen zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitExportBauinformationen()");
      // ALT: var url = "http://localhost:8080/api/bauinformationen/exportBauinformationen";
      // NEU:
      var apiRoute = process.env.API + "/Bauinformationen/Export";
      this.$axios
        .get(/* url */ apiRoute)
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_EXPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler beim Export von Bauinformationen - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_EXPORT_FEHLER
          );
        });
    },

    submitImportBaueinheiten: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Bauvorhaben/Baueinheiten zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBaueinheiten()");
      const apiRoute = process.env.API + "/Baueinheiten/Import";
      this.$axios
        .post(/* url */ apiRoute, {
          nameJSONFileImportBaueinheiten: this.nameJSONFileImportBaueinheiten
        })
        .then(response => {
          console.log("response.data: ", response.data);
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEITEN_IMPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log("Fehler beim Import von Baueinheiten - error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEITEN_IMPORT_FEHLER
          );
        });
    },

    submitImportBaueinheitenMitAgendaJob: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Bauvorhaben/Baueinheiten zu submitten, für #354
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBaueinheitenMitAgendaJob()");
      const apiRoute = process.env.API + "/Baueinheiten/ImportMitAgendaJob";
      this.$axios
        .post(/* url */ apiRoute, {
          nameJSONFileImportBaueinheiten: this.nameJSONFileImportBaueinheiten
        })
        .then(response => {
          console.log("response.data: ", response.data);
          this.$socket.emit("joinRoomForAgendaJob", {
            room: response.data.room
          });
          // Joine einem Room, der die Bezeichnung der vom Server für diesen Client gesendeten Id trägt (eindeutig für jeden Agenda Job)
          // Besser als z.B. den Room per User Id zu identifizieren, da User mehrfach angelogt sein kann!!
          // ACHTUNG: Der Join für diesen Room am Server steckt in back-end-server, beim Aufsetzen auch anderer Rooms für Socket Nachrichten,
          // in dortigem on-Event-Handler für "joinRoomForAgendaJob"!
          //------------------------------------------------------------------------------------------------------------------------------------------
          // Spinner anzeigen - wird bei Erhalt der Socket-Nachricht vom Server ausgeblendet per loading.hide()
          Loading.show({
            spinner: QSpinnerGears
            // delay: 200 // ms, Default ist 500 ms, bevor Loading den Spinner zeigt
            // other props
          });
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEITEN_IMPORT_IM_GANG
          );
        })
        .catch(error => {
          console.log("Fehler beim Import von Baueinheiten - error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEITEN_IMPORT_FEHLER
          );
        });
    },

    submitImportBaustoffe: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Baustoffe zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBaustoffe()");
      // ALT: const url = "http://localhost:8080/api/baustoffe/importBaustoffe";
      // NEU:
      const apiRoute = process.env.API + "/Baustoffe/Import";
      this.$axios
        .post(/* url */ apiRoute, {
          nameJSONFileImportBaustoffe: this.nameJSONFileImportBaustoffe
        })
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFFE_IMPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log("Fehler beim Import von Baustoffen - error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFFE_IMPORT_FEHLER
          );
        });
    },

    submitImportBaueigenschaften: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Baueigenschaften zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBaueigenschaften()");
      // ALT:
      // const url =
      //   "http://localhost:8080/api/baustoffe/importMaterialEigenschaften";
      // NEU:
      const apiRoute = process.env.API + "/Baueigenschaften/Import";
      this.$axios
        .post(/* url, */ apiRoute, {
          nameJSONFileImportBaueigenschaften: this
            .nameJSONFileImportBaueigenschaften
        })
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler beim Import von Baueigenschaften - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_FEHLER
          );
        });
    },

    submitImportBaueigenschaftenMitAgendaJob: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Baueigenschaften zu submitten, mit Agenda Job (354)
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBaueigenschaftenMitAgendaJob()");
      const apiRoute = process.env.API + "/Baueigenschaften/ImportMitAgendaJob";
      this.$axios
        .post(/* url, */ apiRoute, {
          nameJSONFileImportBaueigenschaften: this
            .nameJSONFileImportBaueigenschaften
        })
        .then(response => {
          console.log("response.data: ", response.data);
          this.$socket.emit("joinRoomForAgendaJob", {
            room: response.data.room
          });
          // Joine einem Room, der die Bezeichnung der vom Server für diesen Client gesendeten Id trägt (eindeutig für jeden Agenda Job)
          // Besser als z.B. den Room per User Id zu identifizieren, da User mehrfach angelogt sein kann!!
          // ACHTUNG: Der Join für diesen Room am Server steckt in back-end-server, beim Aufsetzen auch anderer Rooms für Socket Nachrichten,
          // in dortigem on-Event-Handler für "joinRoomForAgendaJob"!
          //------------------------------------------------------------------------------------------------------------------------------------------
          // Spinner anzeigen - wird bei Erhalt der Socket-Nachricht vom Server ausgeblendet per loading.hide()
          Loading.show({
            spinner: QSpinnerGears
            // delay: 200 // ms, Default ist 500 ms, bevor Loading den Spinner zeigt
            // other props
          });
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_IM_GANG
          );
        })
        .catch(error => {
          console.log(
            "Fehler beim Import von Baueigenschaften - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_IMPORT_FEHLER
          );
        });
    },

    submitImportBauinformationen: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // Funktion, um Import der Bauinformationen zu submitten
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In submitImportBauinformationen()");
      // ALT: var url = "http://localhost:8080/api/bauinformationen/importBauinformationen";
      // NEU:
      var apiRoute = process.env.API + "/Bauinformationen/Import";
      this.$axios
        .post(/* url */ apiRoute, {
          nameCSVFileImportBauinformationen: this
            .nameCSVFileImportBauinformationen
        })
        .then(response => {
          console.log("response.data: ");
          console.log(response.data);
          // this.pfadExportBauinformationen = response.data;
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_IMPORT_ERFOLG
          );
        })
        .catch(error => {
          console.log(
            "Fehler beim Import von Bauinformationen - error:",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_IMPORT_FEHLER
          );
        });
    },

    aendereGlobalTestObject: function() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Test-Funktion
      // 1. Testweise global Object in JS Module globalStore.js ändern - FUNKTIONIERT!
      // (2. Dann mit einem Event changedGlobalTestObjectEvent die Komponente MyLayout.vue
      //    benachrichtigen, dass sich das globale Testobjekt geändert hat - dies feuerte ursprünglich in MyLayout.vue eine Event
      //    Handler Methode, welche die lokale Kopie des globalen Objekts dort aktualisierte - dies ist wegen Reaktivität der
      //    local Objects, welche die Pendants zum global Objects sind, überflüssig!
      //--------------------------------------------------------------------------------------------------------------------------
      console.log(
        "globalStore.state.globalTestObject vor Change:",
        globalStore.state.globalTestObject
      ); // "Hallo, hier bin ich"
      globalStore.changeGlobalTestObject(); // Globales Objekt ändern
      console.log(
        "Shared global Object globalStore.state.globalTestObject nach Change:",
        globalStore.state.globalTestObject // "Ich wurde geändert"
      );
      console.log(
        "Reaktiver Update von localStore.state.globalTestObject in Datenaustausch.vue nach Change:",
        this.localStore.state.globalTestObject // "Ich wurde geändert"
      );

      /*
      console.log(
        "Feuere testweise changedGlobalTestObjectEvent, um MyLayout.vue zu benachrichtigen"
      );
      this.$root.$emit("changedGlobalTestObjectEvent");
      // Feuere Test-Event, um MyLayout zu benachrichtigen, dass das global Object sich geändert hat -
      // ist mit Reaktivität des global Objects überflüssig
      console.log(
        "localStore.state.globalTestObject in Datenaustausch.vue nach Abfeuern Event: ",
        this.localStore.state.globalTestObject // "Ich wurde geändert"!!!
      );
      */
    },

    leseBauinformationsProfile: function() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Test-Funktion
      // Liest Bauinformationsprofile per API
      //--------------------------------------------------------------------------------------------------------------------------
      console.log("In leseBauinformationsProfile()");

      this.$axios
        .get(process.env.API + "/Bauinformationsprofile")
        .then(doc => {
          console.log(
            "Success aus API - alle Bauinformationssprofile - doc:",
            doc
          );
          this.alleBauinformationsProfile = doc.data;
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log(
            "Fehler beim Lesen aller Bauinformationsprofile - error: ",
            error
          );
        });
    },

    emitEventAusDatenAustausch: function() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Test-Funktion
      // 1. Testweise Event emitten an Komponente MyLayout.vue mit Parameter topicContextHelp
      //    Dort triggered das Event das Öffnen des rechten Auszugs, der entsprechende Kontexthilfe per topicContextHelp anzeigt
      //    Siehe auch https://code.tutsplus.com/tutorials/design-patterns-for-communication-between-vuejs-component--cms-32354
      //--------------------------------------------------------------------------------------------------------------------------
      console.log("In emitEventAusDatenaustausch()");

      const topicContextHelp = 100; // Testweise 100
      this.$root.$emit("openRightDrawerEvent", topicContextHelp); // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Use Bus)

      // Tests, ob man auch direkt Methoden in MyLayout.vue aufrufen kann (Ziel-Testmethode dafür ist die Methode openLeftDrawer() dort):
      // Laut https://stackoverflow.com/questions/46208610/call-parent-method-with-component geht das mit this.$parent.someMethod() für direkte Vue-Elternkomponenten, nicht jedoch mit
      // komplexen verschachtelten Quasar Komponenten, wie die Tests unten zeigen, weder mit $parent, noch mit $root. Der Grund ist offenbar, dass MyLayout weder die direkte
      // Elternkomponente von Datenaustausch.vue ist, noch die Root-Komponnete´, wie die Log Messages unten zeigen.
      // Alternativen laut diesem SO-Aritkel https://stackoverflow.com/questions/36764151/vue-js-inheritance-call-parent-method/36765534#36765534
      // sind Mixins, oder die Methode aus der Elternkomponente an die Child-Komponente per Prop zu übergeben

      // console.log("$parent: ", this.$parent); // Referenziert per Log Output vermutlich q-page-container Quasar Komponnete, nicht MyLayout.vue - daher schlagen die folgenden Calls von openLeftDrawer fehl!
      // console.log("$root: ", this.$root); // Referenziert per Log Output vermutlich q-page-container Quasar Komponnete, nicht MyLayout.vue - daher schlagen die folgenden Calls von openLeftDrawer fehl!
      // Es ist unklar, wie man Methoden der Komponente MyLayout.vue dann in solchen Calls aus einer Kindkomponente referenzieren kann - ihr Name ist zwar definiert als "MyLayout", aber
      // scheinbar gibt es keine Möglichkeit, Methoden direkt mit diesem Komponentennamen aufzurufen aus einer anderen Komponente
      // (innerhalb einer Komponente ist es per $refs.component.method() einfach möglich!)
      // Die folgenden Varianten funktionieren daher alle NICHT:
      // this.$root.openleftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - "TypeError: "TypeError: this.$root.openleftDrawer is not a function"
      // this.$root.$options.methods.openLeftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - "TypeError: Cannot read property 'openLeftDrawer' of undefined"
      // this.$root.methods.openLeftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - "TypeError: Cannot read property 'openLeftDrawer' of undefined"
      // this.$parent.openleftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - "TypeError: this.$root.openleftDrawer is not a function"
      // this.$parent.$options.methods.openLeftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - Error "TypeError: Cannot read property 'openLeftDrawer' of undefined"
      // this.$parent.methods.openLeftDrawer(); // Testweise Methode aus Parent-Komponente aufrufen - Error "TypeError: Cannot read property 'openLeftDrawer' of undefined"
    }
  }, // /methods:

  //***============================================================================================================================
  computed: {
    getPfadExportLayoutBaueigenschaftsProfil: function() {
      console.log(
        "In getPfadExportLayoutBaueigenschaftsProfil() - pfadExportLayoutBaueigenschaftsProfil: ",
        this.pfadExportLayoutBaueigenschaftsProfil
      );
      return (
        // ALT:
        // "http://localhost:4200/" + this.pfadExportBaueigenschaften.substring(24) // Remove "../BIMclickFrontend/src/" (24 characters)
        // NEU:
        process.env.fileAPI + "/" + this.pfadExportLayoutBaueigenschaftsProfil
      );
    },
    getPfadExportBaueigenschaftenAnBaustoff: function() {
      // ================================================================================================================================================== -->
      // ACHTUNG: Den zugehörigen Code im Backend (baustoffe.controller.js) temporär umgestellt, dass hier JSON File statt CSV File heruntergeladen wird!!! -->
      // ================================================================================================================================================== -->
      console.log(
        "In getPfadExportBaueigenschaftenAnBaustoff() - pfadExportBaueigenschaften: ",
        this.pfadExportBaueigenschaftenAnBaustoff
      );
      return (
        // ALT:
        // "http://localhost:4200/" + this.pfadExportBaueigenschaften.substring(24) // Remove "../BIMclickFrontend/src/" (24 characters)
        // NEU:
        process.env.fileAPI + "/" + this.pfadExportBaueigenschaftenAnBaustoff
      );
    },

    getPfadExportBaueigenschaftenAnBaueinheit: function() {
      // ================================================================================================================================================== -->
      // -->
      // ================================================================================================================================================== -->
      console.log(
        "In getPfadExportBaueigenschaftenAnBaueinheit()- pfadExportBaueigenschaften: ",
        this.pfadExportBaueigenschaftenAnBaueinheit
      );
      return (
        process.env.fileAPI + "/" + this.pfadExportBaueigenschaftenAnBaueinheit
      );
    },

    getPfadExportBauteilkatalogAnBaueinheit: function() {
      // ================================================================================================================================================== -->
      // -->
      // ================================================================================================================================================== -->
      console.log(
        "In getPfadExportBauteilkatalogAnBaueinheit()- pfadExportBauteilkatalog: ",
        this.pfadExportBauteilkatalogAnBaueinheit
      );
      return (
        process.env.fileAPI + "/" + this.pfadExportBauteilkatalogAnBaueinheit
      );
    },

    getPfadExportBauinformationen: function() {
      console.log(
        "In getPfadExportBauinformationen() - pfadExportBauinformationen: ",
        this.pfadExportBauinformationen
      );
      return (
        // ALT:
        // "http://localhost:4200/" + this.pfadExportBauinformationen.substring(24) // Remove "../BIMclickFrontend/src/" (24 characters)
        // NEU:
        process.env.fileAPI + "/" + this.pfadExportBauinformationen
      );
    }
  }, // /computed:

  //***============================================================================================================================
  mounted: async function() {
    console.log("In mounted() von daten-autausch.vue");

    // NEU: JWT Header setzen für Axios Calls an das Backend:
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU - #354: Für Agenda Jobs am Backend, Listener für Web Sockets -  Client hört damit auf Event "importBaueigenschaftenAgendaJobComplete" vom Server:
    this.$socket.on("importBaueigenschaftenAgendaJobComplete", data => {
      // NEU, statt generischem Socket Event "agendaTestJobComplete", um am Client komponentenspezifisch nur darauf reagieren zu können
      this.handleImportBaueigenschaftenMitAgendaJob(data); // Aufzurufende Funktion nach Import von Baueigenschaften (bisher, TODO XXXXXX: Muss erweitert werden!)
      // ACHTUNG: Für die aufzurufende Funktion muss mit arrow method "this" für Vue gebunden werden, sonst undefined-Fehler bei Ausführung!
      // data ist hierbei die Socket-Payload - auf diese wird in der Funktion handleImportBaueigenschaftenMitAgendaJob(data) zugegriffen!
      // Vorlage: https://stackoverflow.com/questions/61729677/referencing-a-vue-component-from-a-socket-function
      // HINWEIS: "importBaueigenschaftenAgendaJobComplete" ist ein Socket Event, kein Room!
    });
    //------------------------------------------------------------------------------------------------------------------------------------------
  } // /mounted:
}; // /exports
</script>
//***============================================================================================================================
<style lang="sass" scoped>
.my-card
  width: 100%
  flat
</style>
