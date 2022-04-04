<!-- Vue/Quasar Komponente Bauinformationen.vue          -->
<!-- NEU: Baubestimmungen umbenannt in Bauinformationen -->
<!------------------------------------------------------------------------------------------------------------------------- -->
<!-- Verbleibende TODOs (Backlog Items) für Bauinformationen: -->
<!-- 1. DONE Korrekter Tab-Wechsel - möglichst die bisher in den Tabs enthaltenen Daten anzeigen -->
<!--    Idee: Dieselben Methoden wie in den Buttons im 1. Tab verwenden? -->
<!--    Es musste das dritte Tab in mounted: noch mit einer leeren Bauinformation initialisiet werden -->
<!-- 2. DONE - Sonderfälle: -->
<!--    Wenn eine im 2. oder 3. Tab angezeigte und ggf. sogar veränderte Bauinformation im 1. Tab gelöscht wird, bleibt sie -->
<!--    im 2. bzw. 3. Tab stehen, obowhl sie gelöscht ist - das ist ein Inkonsistenz, die dann zu Backend Errors führt bei -->
<!--    Submit oder Delete in den hinteren Tabs. -->
<!--    In diesen Fällen muss also beim Löschen im 1. Tab geprüft werden, ob die zu löschende _id in ausgewaehlteBauinformation -->
<!--    bzw. neueBauinformation enthalten ist, und ggf. ein Close des 2. Tabs bzw. ein Reset des 3. Tabs ausgelöst werden -->
<!-- 3. DONE - Bug fixen im Routing, der verhindert dass TestRouter.vue Bauinformationen.vue heißen kann (siehe ganz oben) -->
<!-- 4. DONE - In QTable die Bezeichnungsspalte fixieren bei Scroll nach rechts (sticky Column) - braucht Quasar 1.1.0+ oder SASS -->
<!--    Preprocessor, siehe <style> Region unten. -->
<!-- 5. DONE - Im zweiten Tab, falls keine Bauinformation ausgewählt ist, statt leerem Tab Hinweis, dass eine Bauinformation -->
<!--    ausgewählt werden kann im ersten Tab -->
<!-- 6. DONE - Upload von Dateien für interne URL_Links einbauen - der Upload ist bereits implementiert inklusive des Abspeicherns -->
<!--    der URL mit dem Dateinamen für den internen Link im Backend und der Prüfung, ob eine Bauinformation dafür ausgewählt ist. -->
<!--    Diese Prüfung nun für alle Buttons über :disable="computeSelectedRowsTableBauinformationen" implementiert! -->
<!-- 7. DONE - Die Prüfung, ob eine Bauinformation in QTable selektiert für das Tab "Auswahl" ebenfalls -->
<!--    mit <q-tab :disable="computeSelectedRowsTableBauinformationen"> gesteuert - den Watch aber vorläufig belassen, denn er -->
<!--    initialisiert auch ausgewaehlteBauinformation! -->
<!-- 8. DONE - Check, ob schon ein PDF vorhanden ist vor dem Upload, falls ja, Warnung ausgeben, dass es überschrieben wird -->
<!--    siehe https://forum.quasar-framework.org/topic/4600/how-to-deal-with-added-event-method-in-q-uploader -->
<!-- 9. TODO - Selection="multiple" für "Bauinformationen löschen" unterstützen -->
<!-- 10.TODO - Lazy Loading für QTable implementieren -->
<!-- 11.TODO - Optimierungen beim q-table Refresh: Selektive Updates von dataTableBauinformationen statt komplettem Reload aus Backend -->
<!--    Dies Stellen sind jeweils mit TODO markiert! Falls q-table aber in der Zukunft lazy loaded wird, ändern sich vermutlich -->
<!--    diese Methoden, daher einstweilen zurückgestellt! -->
<!-- 12.TODO - Beim File Upload im Uploader am Server prüfen, ob eine Datei mit dem Namen schon existiert - diese ggf. löschen, per -->
<!--    API und File System Code am Backend -->
<!-- 13.TODO - Beim File Upload müssen die abgespeicherten Links noch mit URIencode zu gültigen Lnks gemacht werden, z.B. müssen -->
<!--    Blanks im Dateinamen von hochgeladenen Dateien durch %20 ersetzt werden!!! -->
<!-- 14.DONE (B18 im Backlog) - Beim Löschen einer Bauinformation sollte überprüft werden, ob es Baustoffe oder Baueigenschaften in Baustoffen (später auch analog für Bauvorhaben!) gibt, -->
<!--    die auf die Bauinformation verweisen. Falls ja, sollte eine Bestätigung erolgen (Confirm Dialog), und wenn das Löschen vom Benutzer bestätigt wird, sollten die Referenzen -->
<!--    in den betroffenen Objekten gelöscht werden. -->
<!--    HINWEIS: Anscheinend wird das Löschen der Referenzen von Mongoose selbst gemacht, wie Tests zeigen!!! -->
<!--    Dadurch muss nach dem Löschen einer Bauinformation lediglich der Baustoffbaum neu geladen werden!!! -->
<!--    (Obsolet) Dazu muss Folgendes gemacht werden: -->
<!-- -  Für Baustoffe: Alle Baustoffe durchsuchen, die die _id der zu löschenden Bauinformation als Referenz im Feld zugeordneteBauinformationen (Array) enthalten - -->
<!--    die Referenz dann dort löschen -->
<!-- -  Für Materialeigenschhaften in Baustoffen: Alle Baustoffe durchsuchen, die in ihren Materialeigenschaften (Array, = Baueigenschaften) im Unterfeld bauinformation -->
<!--    (= Verweis auf Bauinformation) des Unterfelds typbezogeneBaueigenschaften (= Verweis auf Objekt in TypBezogeneEigenschaftenCollection) die _id der zu löschenden -->
<!--    Bauinformation als Referenz enthalten - die Referenz dann dort löschen -->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<!-- ACHTUNG: PROBLEM (SOLVED) -->
<!-- Dubiose Quasar Compile Fehler bei Verwendung der früheren Komponente Baubestimmungen.vue: -->
<!-- ./src/router/routes.js: Module not found: Error: Can't resolve 'pages/BauBestimmungen.vue' -->
<!-- in 'C:\Users\Familie Scheible\GitHub\BIMclick\bimclickfrontend\src\router' -->
<!-- Daher temporär folgenden Workaround implementiert: -->

<!-- 1. Einen neue Quasar-Komponente TestRouter.vue erzeugt mittels: bimclickfrontend> quasar new page TestRouter -->
<!--    Dann allen Code aus Baubestimmungen.vue nach TestRouter.vue umkopiert -->

<!-- 2. Zusätzlich war Änderung notwendig in MyLayout.vue - dort Parameter "name" in der Route dafür eingefügt: -->
<!--    <q-route-tab :to="{name: 'Baubestimmungen'}" label="Baubestimmungen" -->

<!-- 3. Eventuell auch von Einfluss: -->
<!--    Unten im Code der Komponente: -->
<!--    export default { -->
<!--      name: "bauBestimmungen", // Component Name -->
<!--      // ACHTUNG: Auf Groß-/Kleinschreibung achten!!! -->
<!---   Der Component Name hieß zuerst "bauBestimmungen" (Tippfehler), dann "baubestimmungen", es muss aber wohl "Baubestimmungen" heißen -->

<!-- Dieses Problem gelöst im Zuge der Umbenennung von Baubestimmungen nach Bauinformationen -->
<!-- 1. Neue Komponente Bauinformationen mit obigem Quasar Befehl erzeugt  -->
<!--    Allen Code aus TestRouter.vue mit Änderungen von Baubestimmungen nach Bauinformationen in Bauinformationen.vue eingefügt -->
<!-- 2. In MyLayout.vue:  <q-route-tab :to="{ name: 'Bauinformationen' }" label="Bauinformationen" no-caps /> -->
<!-- 3. In Bauinformationen.vue: -->
<!--    export default { -->
<!--      name: "Bauinformationen", // Component Name -->
<!--      // ACHTUNG: Auf Groß-/Kleinschreibung achten!!! -->
<!-- 4. In routes.js: -->
<!-- {  -->
<!--    path: "/Bauinformationen", -->
<!--    name: "Bauinformationen", -->
<!--    component: () => import("pages/Bauinformationen.vue") // NEU: Renaming - Bauinformationen statt Baubestimmungen  -->
<!--    // Plus Eliminierung des Workarounds -->
<!-- }, -->
<!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
<template>
  <q-page class="q-pa-xs">
    <!------------------------------------------------------------------------------------------------------------------>
    <!-- 3 q-tabs mit zugehörigen q-tab-panels, gesteuert per v-model="tabBauinformationen"                            -->
    <!------------------------------------------------------------------------------------------------------------------>
    <!-- Die folgende QCard disabled, sie ist nicht notwendig, verbraucht nur zusätzlichen vertikalen Space -->
    <!-- <q-card class="q-pa-xs"> -->
    <q-tabs
      mobile-arrows
      v-model="tabBauinformationen"
      class="q-pa-none text-black bg-grey-4 full-width"
      active-color="primary"
      active-bg-color="white"
      content-class="text-h7"
      dense
      align="left"
    >
      <q-tab
        name="uebersichtTabBauinformationen"
        label="Übersicht aller Bauinformationen"
        no-caps
      />
      <q-tab
        name="auswahlTabBauinformationen"
        label="Details zur ausgewählten Bauinformation"
        no-caps
        :disable="computeSelectedRowsTableBauinformationen"
      />
      <q-tab
        name="neuTabBauinformationen"
        label="Neuanlage einer Bauinformation"
        no-caps
      />
      <!-- NEU - aus Haupttableiste hierher verschoben: -->
      <q-tab
        name="tabBauinformationsProfile"
        label="Bauinformationsprofile"
        no-caps
      />
    </q-tabs>
    <q-separator />
    <!-- ALT: <q-tab-panels v-model="tabBauinformationen" animated keep-alive :key="keyUebersichtTabBauinformationen"> -->
    <q-tab-panels v-model="tabBauinformationen" animated>
      <!-- Es folgen mehrere q-tab-panels für die q-tabs oben -->
      <q-tab-panel name="uebersichtTabBauinformationen" class="q-pa-xs">
        <div v-if="localStore.state.debugMode">
          selectedRowsTableBauinformationen:
          {{ selectedRowsTableBauinformationen }}
          <br />
          <!-- {{visibleColumnsTableBauinformationen}} -->
        </div>
        <!-- q-dialog für Hinweis, dass erst eine Bauinformation auszuwählen ist                                     -->
        <!-- // ACHTUNG: q-dialog muss stets lokal zu dem q-tab-panel definiert sein, in dem er per v-model aktiviert wird, sonst passiert nichts!!! -->
        <q-dialog
          v-model="confirmHinweisAuswaehlenBauinformationAusQTable"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="notification_important"
                color="warning"
                text-color="white"
              />
              <span class="q-ml-sm"
                >Bitte eine Bauinformation in der ersten Spalte mit
                <q-checkbox
                  v-model="alwaysOn"
                  disable
                  dense
                  color="primary"
                />&nbsp;auswählen</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Weiter"
                color="secondary"
                no-caps
                v-close-popup
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
              <!-- ACHTUNG: Offenbar muss das v-model this.confirmHinweisAuswaehlenBauinformationAusQTable nicht auf false zurückgesetzt werden!!! -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Konfirmation beim Löschen                                            -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                                    -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop               -->
        <q-dialog v-model="confirmLoeschenBauinformationenAusQTable" persistent>
          <!-- =========================================================================== -->
          <!-- ACHTUNG: Für die Formatierung in diesem QDialog ist aktuell nur eine QCard, -->
          <!-- kein div-Wrapper und kein QForm erforderlich!                               -->
          <!-- =========================================================================== -->
          <q-card>
            <q-card-section>
              <div class="row full-width q-pa-xs">
                <q-avatar
                  icon="warning"
                  color="negative"
                  text-color="white"
                  style="margin-left: auto;margin-right: auto;"
                />
              </div>
              <!-- ------------------------------------------------------------------------------------------------ -->
              <!-- HINWEIS: style="margin-left: auto;margin-right: auto;" am q-avatar in Verbindung mit div-Wrapper -->
              <!--          für Centering des Avatars, siehe                                                        -->
              <!--          https://forum.quasar-framework.org/topic/6109/align-to-center-within-grid-column/3      -->
              <!-- ------------------------------------------------------------------------------------------------ -->
              <!-- NEU: Dialog eingeschränkt auf Löschen EINER Bauinformation -->
              <!-- mit Anzeige der Bauinformationsbezeichnung, da der Dialog nun auch -->
              <!-- per Kontextmenü aufgerufen werden kann, wo die ausgewählte Bauinformation in der QTable -->
              <!-- nicht klar erkennbar ist im Vergleich zur Auswahl durch Checkmark und Button -->
              <!-- ACHTUNG: Das {{ selectedRowsTableBauinformationen[0].bauinformationsBezeichnung }} führte manchmal zu unerklärlichen -->
              <!-- Rendering-Fehlern - wenn es enabled war, renderte zeitweise die Page für die Bauinformationen überhaupt nicht mehr, ohne -->
              <!-- Fehlermeldungen im Browser Log!!! Manchmal kam der Fehler "TypeError: Cannot read property 'bauinformationsBezeichnung' of undefined" -->
              <!-- Dies heißt also, dass selectedRowsTableBauinformationen[0] undefined war!!! -->
              <!-- selectedRowsTableBauinformationen[0] wird aber im Kontextmenü unten für das Löschen auf props.row gesetzt, bevor der Dialog hier angestoßen wird!!! -->
              <!-- Daher hier mit v-if/v-else sichergestellt, dass es auch funktioniert, wenn selectedRowsTableBauinformationen[0] undefined ist  -->
              <!-- Diese Fehler passierten allerdings BEVOR unten im Template die Zuweisungen im Kontextmenü für selectedRowsTableBauinformationen[0] auf props.row -->
              <!-- auf reaktives Push umgestellt wurden! Vermutlich geschah der Fehler in dem Fall (ohne reaktives Push), wo vor der Anwahl einer Row per Kontextmenü -->
              <!-- KEINE Row in der Table ausgewählt war per Checkmark in der ersten Spalte. Trotzdem den Code defensiv mit v-if belassen. -->
              <div class="row full-width q-pt-md">
                <span
                  class="q-pa-none"
                  v-if="selectedRowsTableBauinformationen[0]"
                  >Soll die ausgewählte Bauinformation
                  <b
                    >"{{
                      selectedRowsTableBauinformationen[0]
                        .bauinformationsBezeichnung
                    }}"</b
                  >
                  wirklich gelöscht werden?
                </span>
                <span v-else class="q-pa-none"
                  >Soll die ausgewählte Bauinformation wirklich gelöscht werden?
                </span>
              </div>
            </q-card-section>
            <!-- ALT: -->
            <!-- <q-card-actions align="right"> -->
            <!-- NEU: Buttons, die sich stretchen - erfordert Wrapper-div -->
            <q-card-actions>
              <div class="row full-width q-col-gutter-xs q-pa-xs">
                <div class="col-6">
                  <q-btn
                    class="stretch full-width"
                    style="height: 100%"
                    glossy
                    label="Abbrechen"
                    color="positive"
                    no-caps
                    v-close-popup
                  />
                </div>
                <div class="col-6">
                  <q-btn
                    class="stretch full-width"
                    style="height: 100%"
                    glossy
                    label="Löschen"
                    color="negative"
                    @click="deleteAusgewaehlteBauinformationenAusQTable()"
                    v-close-popup
                    no-caps
                  />
                </div>
              </div>
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Hinweis, dass eine Bauinformation mit internem Link auszuwählen ist                                     -->
        <!-- // ACHTUNG: q-dialog muss stets lokal zu dem q-tab-panel definiert sein, in dem er per v-model aktiviert wird, sonst passiert nichts!!! -->
        <q-dialog
          v-model="
            confirmHinweisAuswaehlenBauinformationAusQTableMitInternemLink
          "
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="notification_important"
                color="warning"
                text-color="white"
              />
              <span class="q-ml-sm"
                >Bitte eine Bauinformation in der ersten Spalte mit
                <q-checkbox
                  v-model="alwaysOn"
                  disable
                  dense
                  color="primary"
                />&nbsp;auswählen, die einen Link in Spalte 'Interner Link'
                enthält</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Weiter"
                color="secondary"
                no-caps
                v-close-popup
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
              <!-- ACHTUNG: Offenbar muss das v-model this.confirmHinweisAuswaehlenBauinformationAusQTable nicht auf false zurückgesetzt werden!!! -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Hinweis, dass eine Bauinformation mit externem Link auszuwählen ist                                     -->
        <!-- // ACHTUNG: q-dialog muss stets lokal zu dem q-tab-panel definiert sein, in dem er per v-model aktiviert wird, sonst passiert nichts!!! -->
        <q-dialog
          v-model="
            confirmHinweisAuswaehlenBauinformationAusQTableMitExternemLink
          "
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="notification_important"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm"
                >Bitte eine Bauinformation in der ersten Spalte mit
                <q-checkbox
                  v-model="alwaysOn"
                  disable
                  dense
                  color="primary"
                />&nbsp;auswählen, die einen Link in Spalte 'Externer Link'
                enthält</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Weiter"
                color="primary"
                no-caps
                v-close-popup
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
              <!-- ACHTUNG: Offenbar muss das v-model this.confirmHinweisAuswaehlenBauinformationAusQTable nicht auf false zurückgesetzt werden!!! -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="
            confirmHinweisAuswaehlenBauinformationAusQTableMitOneDriveLink
          "
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="notification_important"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm"
                >Bitte eine Bauinformation in der ersten Spalte mit
                <q-checkbox
                  v-model="alwaysOn"
                  disable
                  dense
                  color="primary"
                />&nbsp;auswählen, die einen Link in Spalte 'OneDrive-Link'
                enthält</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Weiter"
                color="primary"
                no-caps
                v-close-popup
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
              <!-- ACHTUNG: Offenbar muss das v-model this.confirmHinweisAuswaehlenBauinformationAusQTable nicht auf false zurückgesetzt werden!!! -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Konfirmation beim File Upload für schon definierten internen Link    -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                                    -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop               -->
        <q-dialog
          v-model="confirmUploadInternerLinkBauinformationenAusQTable"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die ausgewählte Bauinformation enthält bereits einen internen
                Link und eine Datei. <br />
                <br />
                Wenn Sie diese beibehalten wollen, wählen Sie "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diese mit der für das Hochladen ausgewählten Datei
                überschreiben wollen, wählen Sie zunächst "Weiter" aus, und
                anschließend das Icon oben rechts im Uploader für "Hochladen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="resetUploaderUebersichtBauinformationen()"
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für OneDrive-Link: -->
        <q-dialog
          v-model="confirmUploadOneDriveLinkBauinformationenAusQTable"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die ausgewählte Bauinformation enthält bereits einen
                OneDrive-Link.
                <br />
                <br />
                Wenn Sie diesen OneDrive-Link beibehalten wollen, wählen Sie
                "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diesen mit dem OneDrive-Link einer neu auszuwählenden
                Datei auf OneDrive überschreiben wollen, wählen Sie "Weiter"
                aus, sonst "Abbrechen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="
                  confirmUploadOneDriveLinkBauinformationenAusQTable = false
                "
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
                @click="
                  confirmUploadOneDriveLinkBauinformationenAusQTable = false;
                  oneDrivePickerOpen('share');
                "
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- style="max-width: 1600px" -->
        <!-- <div class="q-pa-xs"> -->
        <!-- HINWEIS: Dieses div zwischen q-tab-panel und q-table ist nur wichtig bei den q-tables, die in einen q-splitter eingebettet sind! -->
        <!-- Hier kann es disabled werden -->
        <!-- ALT: <div class="q-gutter-xs" style="max-width: 1500px"> -->
        <!-- NEU: Erste Spalte zur Selektion von Zeilen mit color="primary" (blau statt grau) -->
        <!-- ALT: title="Bauinformationen: Normen, Vorschriften, Richtlinien, Zulassungen, Nachweise, Datenblätter, etc." -->
        <q-table
          color="primary"
          rows-per-page-label="Einträge pro Seite"
          dense
          row-key="_id"
          :data="dataTableBauinformationen"
          :columns="columnsTableBauinformationen"
          :visible-columns="visibleColumnsTableBauinformationen"
          :pagination.sync="paginationTableBauinformationen"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 40, 0]"
          selection="single"
          :selected.sync="selectedRowsTableBauinformationen"
          :selected-rows-label="getSelectedStringTableBauinformationen"
          :filter="filterTableBauinformationen"
          v-bind:class="{
            stickyColumnsTable1HeaderLineZugeordneteBauinformationen:
              $q.screen.gt.sm
          }"
        >
          <!-- ACHTUNG: Sticky Column funktioniert nur auf großen Bildschirmen - auf mobilen Bildschirmen funktioniert damit das horizontale Scrolling der QTable nicht! -->
          <!-- LÖSUNG (#378): Per v-bind mit Bedingung $q.screen.gt.sm die sticky Column nur auf nicht kleinen Bildschirmen! -->
          <!-- Vorlage: https://vuejs.org/v2/guide/class-and-style.html -->
          <!-- Dazu musste allerdings die CSS Class sticky-columns-table-... (kebab-case) umbenannt werden nach -->
          <!-- stickyColumnsTable... (camelCase) -->

          <!-- NEU: class="stickyColumnsTable1HeaderLineZugeordneteBauinformationen" enthält CSS für sticky Columns, braucht SASS Preprocessor -->
          <!-- Siehe Hinweise dazu ganz unten in <style>-Sektion -->
          <!-- ACHTUNG: row-key muss gesetzt sein, wenn Selection verwendet wird (Checkboxes pro Tabellenzeile, links) -->

          <!-- class="table-class" -->
          <!-- CSS zum Test von eigener CSS auf Table, vorläufig auskommentiert -->

          <!-- ACHTUNG: title oben in q-table wird überdeckt von v-slot:top? Daher eigenes div mit Titel unten -->
          <!-- ACHTUNG: div mit v-if hier nicht erlaubt, <template v-slot:> muss Root Level in der receiving Component sein!!! -->

          <!-- Der folgende <template v-slot:> Teil inklusive v-model, das :visible-columns in q-table oben referenziert,-->
          <!-- ist für die Selektion der sichtbaren q-table Spalten per Toggles -->
          <template v-slot:top="props">
            <!------------------------------------------------------------------------------------------->
            <!-- ALT: (aus Baustoffe.vue mit Q-tree): Erst neues div mit v-if="selectedKey" hier probiert, funktioniert aber nicht -->
            <!-- für alle Teile der komplexen Tabelle mit eigenem v-model und q-select!!!              -->
            <!-- v-if="selectedKey" an q-tab-panel oben scheint dagegen zu funktionieren!!!            -->
            <!------------------------------------------------------------------------------------------->
            <div class="row full-width q-table__title">
              <div class="col-md-6 col-12 text-h6" v-if="$q.screen.gt.sm">
                <!-- NEU: col-6 statt col-8 wegen Platzbedarf für weitern Toggle für Anzeigetext -->
                Bauinformationen: Planungsrelevante Dokumente und Links
              </div>
              <div class="col-md-6 col-12 text-subtitle1" v-else>
                <!-- NEU: col-6 statt col-8 wegen Platzbedarf für weitern Toggle für Anzeigetext -->
                Bauinformationen: Planungsrelevante Dokumente und Links
              </div>
              <!-- Ursprünglich für die "multiplen" "Keine/Alle Normkategorien" "Wenige/Viele Spalten" Toggles (falsch!!!): -->
              <!--   @input="toggleAllNormkategorien" und  -->
              <!--   value="toggleAllNormkategorienState"  -->
              <!--   In Verbindung mit Inversion von toggleAllNormkategorienState am Ende von toggleAllNormkategorien -->
              <!-- Damit wurde dann zwar der Array korrekt gesteuert, aber es erfolgte kein "Ticking" des Toggles! -->
              <!-- Per https://forum.quasar-framework.org/topic/4373/how-to-use-q-toggle-with-input-and-value-rather-than-v-model/5 ersetzt durch v-model -->
              <!-- sollte stattdessen verwendet werden:     -->
              <!--   @input="toggleAllNormkategorien" und   -->
              <!--   v-model="toggleAllNormkategorienState" -->
              <!--   Funktioniert aber nur, wenn am Ende von toggleAllNormkategorien toggleAllNormkategorien NICHT invertiert wird! -->
              <div class="col-md-2 col-6 text-body2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="bauinformationsAnzeigeText"
                  label="Anzeigetext"
                />
              </div>
              <div class="col-md-2 col-6 text-body2">
                <q-toggle
                  dense
                  label="Keine/Alle Normkategorien"
                  v-model="toggleAllNormkategorienState"
                  @input="toggleAllNormkategorien"
                  ref="toggleAllNormkategorien"
                  color="info"
                />
              </div>
              <div class="col-md-2 col-6 text-body2">
                <q-toggle
                  dense
                  label="Wenige/Viele Spalten"
                  v-model="toggleAllColumnsState"
                  @input="toggleAllColumns"
                  ref="toggleAllColumns"
                  color="secondary"
                />
              </div>
              <div class="col-md-2 col-6">
                <!-- Weiterer Toggle Button für Fullscreen-Darstellung von q-table -->
                <!-- Verschoben von ursprünglicher Position nach q-select in diese erste Zeile von q-toggles -->
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
              <!-- ALT: q-button, damit musste toggleAllNormkategorienState in toggleNormkategorien invertiert werden!!!
              <div class="col-2">
                <q-btn
                  label="Normkategorien ein/aus"
                  dense
                  v-model="toggleAllNormkategorienState"
                  @click="toggleNormkategorien"
                  no-caps
                />
              </div>
              -->
            </div>
            <!-- HINWEIS: Hier ursprünglich class="col-2" statt "row" -->
            <!-- <q-space /> -->
            <!-- ALT: -->
            <!-- v-if="$q.screen.gt.xs" -->
            <div class="row full-width">
              <!----------------------------------------------------------------------------------------->
              <!-- Alignment der Toggles in Spalten statt "wilder" Position  mit <q-space /> daszwichen-->
              <!-- nach Tipp auf https://forum.quasar-framework.org/topic/4254/how-to-align-the-q-toggles-that-control-q-table-column-visibility/2 -->
              <!-- Flex Row mit 6 even Columns, class="col-2" pro Spalte, d.h. 2/12 des Platzes        -->
              <!-- Hinweis: class="row full-width" ist dabei wichtig, sonst funktioniert es nicht!     -->
              <!-- Siehe https://quasar.dev/layout/grid/introduction-to-flexbox                        -->
              <!-- sowie https://quasar.dev/layout/grid/flex-playground                                -->
              <!-- TODO: Alternativ auch QSelect Dropdown oder QMenu mit QToggles als Items möglich    -->
              <!-- Sample dafür auf https://0ybb3.sse.codesandbox.io/table-extensions/custom-header    -->
              <!-- Zusätzlich: Gemeinsamer Button für alle bauphysikalische Schutzkategorien, s.u.     -->
              <!----------------------------------------------------------------------------------------->
              <!-- <q-toggle v-model="visibleColumnsMaterialEigenschaften" val="name" label="Name" />  -->
              <!-- HINWEIS: Die Spalte mit dem Key kann/sollte nicht ausgeblendet werden!              -->
              <!----------------------------------------------------------------------------------------->
              <!-- TODO: q-toggle Size verkleinern mit style="transform: scale(0.9, 0.9);"             -->
              <!-- Dieses Style Property unmittelbar an q-toggle anhängen, ohne weitere CSS in <style> -->
              <!-- Siehe https://github.com/quasarframework/quasar/issues/2833                         -->
              <!-- Verkleinert auch den Label-Text mit                                                 -->
              <!-- Hinweis: Bezeichnung kann nicht ausgeblendet werden, Toggle dafür kann entfallen    -->
              <!-- Stattdessen q-input Feld für Filter auf q-table an erster Stelle eingefügt          -->
              <div class="col-md-2 col-12">
                <!--
                <q-toggle
                  v-model="visibleColumnsTableBauinformationen"
                  val="bauinformationsBezeichnung"
                  label="Bezeichnung"
                />
                -->
                <q-input
                  class="q-pr-md"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  debounce="300"
                  color="primary"
                  v-model="filterTableBauinformationen"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              <!-- NEU: Toggle für Spalte Autoren, dadurch verschieben sich die weiteren Toggles nach rechts bzw. in die nächste Spalte: -->
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="benutzerKennungenAutoren"
                  label="Autoren"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="bauinformationsTyp"
                  label="Typ"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="bauinformationsBemerkung"
                  label="Bemerkung"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberGeografie"
                  label="Geografie"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberInstitution"
                  label="Institution"
                />
              </div>
            </div>
            <!-- <q-space /> -->
            <!-- 2. Toggles-Zeile: -->
            <!-- ALT: -->
            <!-- v-if="$q.screen.gt.xs" -->
            <div class="row full-width">
              <!-- ---------------------------------------------------------------------------------------- -->
              <!-- NEU: Toggles für mehrere, inhaltlich zusammengehörende Spalten (dadurch weniger Toggles) -->
              <div class="col-md-2">
                <!-- Leerspalte unter Filterfeld -->
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberBezeichnung"
                  label="Herausgeber"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="regionenAnzeigen"
                  @input="toggleSpaltenRegionen"
                  label="Regionen"
                  ref="toggleRegionenAnzeigen"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="gueltigkeitAnzeigen"
                  @input="toggleSpaltenGueltigkeit"
                  label="Gültigkeit"
                  ref="toggleGueltigkeitAnzeigen"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="normTypenAnzeigen"
                  @input="toggleSpaltenNormTypen"
                  label="Normtypen"
                  ref="toggleNormTypenAnzeigen"
                />
              </div>
              <div class="col-md-2 col-6">
                <q-toggle
                  dense
                  v-model="linksAnzeigen"
                  @input="toggleSpaltenLinks"
                  label="Links"
                  ref="toggleLinksAnzeigen"
                />
              </div>
              <!-- ALT: Toggles für einzelne Spalten - disabled  -->
              <!--
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberBundeslandDeutschland"
                  label="Bundesland (D)"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberBundeslandÖsterreich"
                  label="Bundesland (AU)"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="herausgeberKantonSchweiz"
                  label="Kanton (CH)"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="gültigkeitsDatumVon"
                  label="Gültig von"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="gültigkeitsDatumBis"
                  label="Gültig bis"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="normTypDIN"
                  label="Normtyp (DIN)"
              </div>
              -->
            </div>
            <!-- <q-space /> -->
            <!-- /2. Toggles-Zeile: -->
            <!-- 3. Toggles-Zeile: -->
            <!-- ALT (Einzel-Toggles) - disabled -->
            <!--
              <div v-if="$q.screen.gt.xs" class="row full-width">
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="normTypÖNORM"
                    label="Normtyp (ÖNORM)"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="normTypSN"
                    label="Normtyp (SN)"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="normTypEN"
                    label="Normtyp (EN)"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="normTypISO"
                    label="Normtyp (ISO)"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="externerLink"
                    label="Externer Link"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="oneDriveLink"
                    label="OneDrive-Link"
                  />
                </div>
                <div class="col-2">
                  <q-toggle
                    dense
                    v-model="visibleColumnsTableBauinformationen"
                    val="internerLink"
                    label="Interner BIM.click-Link"
                  />
                </div>
              </div>
              -->
            <!-- /3. Toggles-Zeile: -->
            <!-- <q-space /> -->
            <div v-if="$q.screen.gt.xs" class="row full-width">
              <!-- Die einzelnen Toggles für Normkategorien im Folgenden ausgeblendet -->
              <!-- 1) Es sind sonst zu viele Toggles -->
              <!-- 2) Die einzelnen Toggles funktionieren nicht im Zusammenspiel mit dem gemeinsamen Schalter für alle -->
              <!--
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="grundNorm"
                  label="Grundnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="terminologieNorm"
                  label="Terminologienorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="prüfNorm"
                  label="Prüfnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="produktNorm"
                  label="Produktnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="verfahrensNorm"
                  label="Verfahrensnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="dienstleistungsNorm"
                  label="Dienstleistungsnorm"
                />
              </div>
            </div>
            <div v-if="$q.screen.gt.xs" class="row full-width">
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="schnittstellenNorm"
                  label="Schnittstellensnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="deklarationsNorm"
                  label="Deklarationsnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="fachbereichsNorm"
                  label="Fachbereichsnorm"
                />
              </div>
              <div class="col-2">
                <q-toggle
                  dense
                  v-model="visibleColumnsTableBauinformationen"
                  val="werkNorm"
                  label="Werknorm"
                />
              </div>
              <div class="col-2">
              </div>
              -->
            </div>
            <!------------------------------------------------------------------------------------------------------------------------------->
            <!-- q-select, um abhängig von Toggles die Tabelle nur mit den ausgewählten Spalten anzuzeigen                                 -->
            <!-- ACHTUNG: Die Funktionsweise von q-select muss noch genauer erforscht werden                                               -->
            <!-- Durch das v-else am Anfang ist es ein unsichtbares Dropdown Select-Menü!                                                  -->
            <!-- Durch das emit-value und map-options scheinen die Toggle-Werte auf visibleColumnsTableBauinformationen gemapped zu werden -->
            <!-- Siehe auch https://quasar.dev/vue-components/select, dort QSelect API ganz unten                                          -->
            <!------------------------------------------------------------------------------------------------------------------------------->
            <q-select
              v-else
              v-model="visibleColumnsTableBauinformationen"
              multiple
              borderless
              dense
              options-dense
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              style="min-width: 150px"
            />
          </template>
          <!-- /template v-slot-->
          <!-- ========================================================================================================================================= -->
          <!-- START neuer Code für Enablement eines Kontextmenüs auf den Tabellenzeilen/-spalten -->
          <!-- Dazu willkürlich die zweite Spalte (dies war ursprünglich bauinformationsTyp) als v-slot definiert und das Kontextmenü darunter definiert -->
          <!-- Enabled erstaunlicherweise das Kontextmenü auf ALLEN Spalten!!! -->
          <!-- ACHTUNG: Im Zuge von #382 hier Fehler festgestellt, dass die Kontextmenüs nicht mehr korrekt angezeigt werden, wenn -->
          <!-- oben per QToggle z.B. der bauinformationsTyp ausgeblendet wird! -->
          <!-- Daher bauinformationsTyp durch bauinformationsBezeichnung ersetzt (erste Spalte, diese wird nie ausgeblendet), dann funktionierten -->
          <!-- die Kontextmenüs wieder! -->
          <!-- TODO XXXXXX: -->
          <!-- Der Template-Code für diese QTable hier ist allerdings alt und schlecht, er sollte überarbeitet werden z.B. nach der Vorlage -->
          <!-- der QTable mit Kontextmenps in uebersicht-tab-baueigenschaften.vue -->
          <!-- ========================================================================================================================================= -->
          <template v-slot:body-cell-bauinformationsBezeichnung="props"> <!-- NEU: #382 - ALT: bauinformationsTyp -->
            <q-td :props="props">
              {{ props.row["bauinformationsBezeichnung"] }} <!-- NEU: #382 - ALT: bauinformationsTyp -->
              <!-- q-td mit {{ }} ist notwendig, sonst wird für diese Spalte kein Wert angezeigt!!! -->
            </q-td>
            <!-- =================================================================================================================================== -->
            <!-- START CODE FÜR KONTEXTMENÜ für Rechtsklick-Aktionen auf einer Spalte/Zeile in der QTable -->
            <!-- Dabei ist die Zeile in props.rows enthalten, siehe Debug Info Kontextmenü unten -->
            <!-- Zugriff auf Columns in diesem Fall ist möglich wie oben: props.row["bauinformationsTyp"], allerdings ist ides statisch, nicht in Abhängigkeit von Mausposition   -->
            <!-- ================================================================================================================================ -->
            <q-menu touch-position context-menu>
              <!-- HINWEIS: v-model="props.row['bauinformationsTyp']" am <q-list> entfernt, unnötig oder gar falsch! -->
              <q-list dense style="min-width: 100px">
                <div v-if="localStore.state.debugMode">
                  Debug-Info Kontextmenü:
                  <q-separator />
                  props.row: {{ props.row }}
                  <q-separator />
                  props.selected: {{ props.selected }}
                  <!-- ACHTUNG: props.selected ist UNDEFINED - anders als in den QTables für Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! -->
                  <q-separator />
                </div>
                <!-- ACHTUNG: selectedRowsTableBauinformationen = props.row als erste Aktion bei @click unten funktioniert so NICHT!!! -->
                <!--          Es macht zwar die Zuweisung wie gewünscht, aber die selected Row in der QTable wird dadurch alleine noch nicht reaktiv geändert! -->
                <!--          Erst reaktives push auf den Array führt dazu, dass die selected Row updated wird (sichtbar durch checked Checkmark in der ersten Spalte der QTable) -->
                <!-- HINWEIS: In den QTables für die Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! wird die Row einfach per props.selected = true neu ausgewählt, -->
                <!--          dies funktioniert hier in der bzgl. VSlots anders aufgebauten QTable für Bauinformationen so nicht, props.selected ist UNDEFINED (siehe oben) -->
                <q-item
                  clickable
                  v-close-popup
                  @click="
                    selectedRowsTableBauinformationen = [];
                    selectedRowsTableBauinformationen.push(props.row);
                    openAuswahlTabBauinformationen();
                  "
                >
                  <q-item-section>
                    Bauinformation auswählen und anzeigen/bearbeiten
                  </q-item-section>
                </q-item>
                <!-- ACHTUNG: selectedRowsTableBauinformationen = props.row als erste Aktion bei @click unten funktioniert so NICHT!!! -->
                <!--          Es macht zwar die Zuweisung wie gewünscht, aber die selected Row in der QTable wird dadurch alleine noch nicht reaktiv geändert! -->
                <!--          Erst reaktives push auf den Array führt dazu, dass die selected Row updated wird (sichtbar durch checked Checkmark in der ersten Spalte der QTable) -->
                <!-- HINWEIS: In den QTables für die Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! wird die Row einfach per props.selected = true neu ausgewählt, -->
                <!--          dies funktioniert hier in der bzgl. VSlots anders aufgebauten QTable für Bauinformationen so nicht, props.selected ist UNDEFINED (siehe oben) -->
                <!-- NEU: Menüeintrag für Löschen disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <!--      Verwendet spezielle Funktion, die dies berechnet aus Parameter props.row -->
                <!--      ACHTUNG: Wegen des Parameters darf dies keine computed-Funktion sein! -->
                <q-item
                  :disable="
                    !benutzerDarfLoeschenPerKontextmenueSelektierteBauinformationInTableBauinformationen(
                      props.row
                    )
                  "
                  clickable
                  v-close-popup
                  @click="
                    selectedRowsTableBauinformationen = [];
                    selectedRowsTableBauinformationen.push(props.row);
                    checkAusgewaehlteBauinformationenAusQTableVorLoeschen();
                  "
                >
                  <q-item-section
                    >Bauinformation auswählen und löschen</q-item-section
                  >
                </q-item>
                <!-- NEU: Hier dedizierte neue Funktion oeffneExternenLinkAusgewaehlteBauinformationAusQTable()}zum Öffnen des externen Links: -->
                <!-- ACHTUNG: selectedRowsTableBauinformationen = props.row als erste Aktion bei @click unten funktioniert so NICHT!!! -->
                <!--          Es macht zwar die Zuweisung wie gewünscht, aber die selected Row in der QTable wird dadurch alleine noch nicht reaktiv geändert! -->
                <!--          Erst reaktives push auf den Array führt dazu, dass die selected Row updated wird (sichtbar durch checked Checkmark in der ersten Spalte der QTable) -->
                <!-- HINWEIS: In den QTables für die Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! wird die Row einfach per props.selected = true neu ausgewählt, -->
                <!--          dies funktioniert hier in der bzgl. VSlots anders aufgebauten QTable für Bauinformationen so nicht, props.selected ist UNDEFINED (siehe oben) -->
                <!-- HINWEIS: Die Abfrage if (selectedRowsTableBauinformationen[0].externerLink == null) ist auch true, wenn das Feld undefined ist (nicht der Fall bei === null) -->
                <!-- NEU: Disabling, wenn Link nicht vorhanden ist. ACHTUNG: Link ist undefined, wenn nicht vorhanden, daher Prüfung auf "==null -->
                <q-item
                  :disable="
                    props.row.externerLink == null ||
                      props.row.externerLink === ''
                  "
                  clickable
                  v-close-popup
                  @click="
                    selectedRowsTableBauinformationen = [];
                    selectedRowsTableBauinformationen.push(props.row);
                    checkAusgewaehlteBauinformationAusQTableAufExternenLink();
                    if (
                      selectedRowsTableBauinformationen[0].externerLink == null ||
                      selectedRowsTableBauinformationen[0].externerLink === ''
                    ) {
                      confirmHinweisAuswaehlenBauinformationAusQTableMitExternemLink = true;
                    } else {
                      oeffneExternenLinkAusgewaehlteBauinformationAusQTable();
                    }
                  "
                >
                  <q-item-section
                    >Bauinformation auswählen und externen Link
                    öffnen</q-item-section
                  >
                </q-item>
                <!-- NEU: Hier dedizierte neue Funktion oeffneOneDriveLinkAusgewaehlteBauinformationAusQTable()}zum Öffnen des OneDrive-Links: -->
                <!-- ACHTUNG: selectedRowsTableBauinformationen = props.row als erste Aktion bei @click unten funktioniert so NICHT!!! -->
                <!--          Es macht zwar die Zuweisung wie gewünscht, aber die selected Row in der QTable wird dadurch alleine noch nicht reaktiv geändert! -->
                <!--          Erst reaktives push auf den Array führt dazu, dass die selected Row updated wird (sichtbar durch checked Checkmark in der ersten Spalte der QTable) -->
                <!-- HINWEIS: In den QTables für die Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! wird die Row einfach per props.selected = true neu ausgewählt, -->
                <!--          dies funktioniert hier in der bzgl. VSlots anders aufgebauten QTable für Bauinformationen so nicht, props.selected ist UNDEFINED (siehe oben) -->
                <!-- HINWEIS: Die Abfrage if (selectedRowsTableBauinformationen[0].externerLink == null) ist auch true, wenn das Feld undefined ist (nicht der Fall bei === null) -->
                <!-- NEU: Disabling, wenn Link nicht vorhanden ist. ACHTUNG: Link ist undefined, wenn nicht vorhanden, daher Prüfung auf "==null -->
                <q-item
                  :disable="
                    props.row.oneDriveLink == null ||
                      props.row.oneDriveLink === ''
                  "
                  clickable
                  v-close-popup
                  @click="
                    selectedRowsTableBauinformationen = [];
                    selectedRowsTableBauinformationen.push(props.row);
                    checkAusgewaehlteBauinformationAusQTableAufOneDriveLink();
                    if (
                      selectedRowsTableBauinformationen[0].oneDriveLink == null  ||
                      selectedRowsTableBauinformationen[0].oneDriveLink === ''
                    ) {
                      confirmHinweisAuswaehlenBauinformationAusQTableMitOneDriveLink = true;
                    } else {
                      oeffneOneDriveLinkAusgewaehlteBauinformationAusQTable();
                    }
                  "
                >
                  <q-item-section
                    >Bauinformation auswählen und OneDrive-Link
                    öffnen</q-item-section
                  >
                </q-item>
                <!-- ACHTUNG: selectedRowsTableBauinformationen = props.row als erste Aktion bei @click unten funktioniert so NICHT!!! -->
                <!--          Es macht zwar die Zuweisung wie gewünscht, aber die selected Row in der QTable wird dadurch alleine noch nicht reaktiv geändert! -->
                <!--          Erst reaktives push auf den Array führt dazu, dass die selected Row updated wird (sichtbar durch checked Checkmark in der ersten Spalte der QTable) -->
                <!-- HINWEIS: In den QTables für die Baueigenschaften in baustoffe.vue und baueinheiten.vue!!! wird die Row einfach per props.selected = true neu ausgewählt, -->
                <!--          dies funktioniert hier in der bzgl. VSlots anders aufgebauten QTable für Bauinformationen so nicht, props.selected ist UNDEFINED (siehe oben) -->
                <!-- ACHTUNG: Die Logik für internen Link hier ist anders als für externen Link oben, die check-Funktion öffnet ggf. gleich den internen Link: -->
                <!-- ACHTUNG: Dies funktioniert aktuell nur für Links zu "frisch" hochgeladenen Dokumenten!!! -->
                <!--          Es entspricht dem Button "Internen Link öffnen (Cloud)"                         -->
                <!-- NEU: Disabling, wenn Link nicht vorhanden ist. ACHTUNG: Link ist undefined, wenn nicht vorhanden, daher Prüfung auf "==null -->
                <q-item
                  :disable="
                    props.row.internerLink == null ||
                      props.row.internerLink === ''
                  "
                  clickable
                  v-close-popup
                  @click="
                    selectedRowsTableBauinformationen = [];
                    selectedRowsTableBauinformationen.push(props.row);
                    checkAusgewaehlteBauinformationAusQTableAufInternenLink();
                  "
                >
                  <q-item-section
                    >Bauinformation auswählen und internen Link
                    öffnen</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  v-close-popup
                  @click="openNeuTabBauinformationen()"
                >
                  <q-item-section>Bauinformation neu anlegen </q-item-section>
                </q-item>
                <!--
                          <q-separator />
                          <q-item clickable v-close-popup>
                            <q-item-section>Weitere Aktion</q-item-section>
                          </q-item>
                          <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                          </q-item-section>
                        -->
              </q-list>
            </q-menu>
            <!-- ENDE CODE FÜR KONTEXTMENÜ -->
          </template>
          <!-- =================================================================================================================================== -->
          <!-- START spezieller Testcode mit v-slot für Spalte "Autoren" - dort (disabled) QSelect statt regulärem Textfeld -->
          <!-- Wenn dieser Code disabled wird, werden die Autoren in einem regulären Textfeld angezeigt! -->
          <template v-slot:body-cell-benutzerKennungenAutoren="props">
            <q-td :props="props">
              <q-select
                :value="props.row.benutzerKennungenAutoren"
                :options="props.row.benutzerKennungenAutoren"
                options-dense
                dense
                :multiple="true"
                hide-bottom-space
                class="font-size-small"
                :disable="true"
              />
            </q-td>
          </template>
          <!-- ----------------------------------------------------------------------------------------- -->
          <!-- Alternativer Test-code, der nur die ersten 3 Array-Elemente ausgibt -->
          <!-- Funktioniert per Test auch bei leerem Array-Feld -->
          <!-- Wenn dieser Code disabled wird, werden die Autoren in einem regulären Textfeld angezeigt! -->
          <!--
              <template v-slot:body-cell-benutzerKennungenAutoren="props">
                <q-td :props="props">
                  {{ props.row.benutzerKennungenAutoren[0] }}
                  {{ props.row.benutzerKennungenAutoren[1] }}
                  {{ props.row.benutzerKennungenAutoren[2] }}
                </q-td>
              </template>
              -->
          <!-- ========================================================================================================================================= -->
          <!-- Es geht weiter mit Code zur speziellen Formatierung der Boolean-Spalten für den Normtyp mit Checkboxen: -->
          <!----------------------------------------------------------------------------------------------------------------------------------------------->
          <!-- Vorschlag aus https://forum.quasar-framework.org/topic/4127/how-to-display-and-maybe-later-edit-checkboxes-for-boolean-values-in-qtable/2 -->
          <!-- Nested, disabled q-checkbox Konponente in den "Boolean" Spalten - theoretisch bessere Lösung als simples format mit Unicode               -->
          <!----------------------------------------------------------------------------------------------------------------------------------------------->
          <!-- Dieser Code war temporär auskommentiert, weil mit den q-checkboxes und q-toggles die Zeilenhöhe größer wird -->
          <!-- Mittels style="transform: scale(0.7,0.7);" (bei q-toggles) -->
          <!-- bzw.    style="transform: scale(0.7);" (bei q-checkboxes) -->
          <!-- lässt sich zwar per CSS die Größe verkleinern, aber die Zeilenhöhe von q-table bleibt davon leider unberührt!!! -->
          <!-- Ein CSS height Attribut an q-td hat per Test auch keinen Einfluss: <q-td :props="props" style="{height: '40px'}"> -->
          <!-- LÖSUNG/WICHTIG: "dense" Property and q-checkbox führt schließlich zu "dense" q-table Rows!!! -->
          <template v-slot:body-cell-grundNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.grundNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-terminologieNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.terminologieNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-prüfNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.prüfNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-produktNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.produktNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-verfahrensNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.verfahrensNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-dienstleistungsNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.dienstleistungsNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-schnittstellenNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.schnittstellenNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-deklarationsNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.deklarationsNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-fachbereichsNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.fachbereichsNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-werkNorm="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.werkNorm"
                disable
                dense
                color="grey-9"
              />
            </q-td>
          </template>
        </q-table>
        <!-- </div> -->
        <!-- <br /> -->
        <div class="row full-width q-pa-xs q-col-gutter-xs">
          <div class="col-md-8 col-12 q-pa-sm q-col-gutter-xs">
            <div class="row q-pa-xs q-col-gutter-xs">
              <div class="col-md-3 col-12 q-gutter-xs text-caption">
                Aktionen für Bauinformationen
                {{ displayRightArrow }}
                <br />
                <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
                Mit
                <q-checkbox v-model="alwaysOn" disable dense color="primary" />
                in der ersten Spalte Bauinformation auswählen.
                <br />
                Alternativ mit rechter Maustaste Kontextmenü aufrufen.
              </div>
              <div class="col-md-3 col-12 q-pa-xs q-gutter-xs">
                <!-- ALT: class="stretch full-width" -->
                <!-- ALT: style="width: 90%" -->
                <!-- ALT:  style="height:100%" -->
                <q-btn
                  dense
                  label="Bauinformation anzeigen / bearbeiten"
                  class="stretch full-width"
                  color="secondary"
                  glossy
                  no-caps
                  @click="openAuswahlTabBauinformationen()"
                  :disable="computeSelectedRowsTableBauinformationen"
                />
              </div>
              <div class="col-md-2 col-12 q-pa-xs q-gutter-xs">
                <!-- NEU: Button für Löschen disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <!-- ALT: class="stretch full-width" -->
                <!-- ALT: style="width: 90%" -->
                <q-btn
                  style="height:45%"
                  dense
                  :disable="
                    computeSelectedRowsTableBauinformationen ||
                      (benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformationInTableBauinformationen)
                  "
                  label="Bauinformation löschen"
                  class="stretch full-width"
                  color="negative"
                  glossy
                  no-caps
                  @click="
                    checkAusgewaehlteBauinformationenAusQTableVorLoeschen()
                  "
                />
                <q-btn
                  style="height:45%"
                  dense
                  label="Bauinformation neu anlegen"
                  color="green-8"
                  class="stretch full-width"
                  glossy
                  no-caps
                  @click="openNeuTabBauinformationen()"
                />
              </div>
              <div class="col-md-2 col-12 q-pa-xs q-gutter-xs">
                <q-btn
                  style="height:45%"
                  dense
                  :href="getSelectedExternerLinkTableBauinformationen"
                  type="a"
                  target="_blank"
                  label="Externen Link öffnen"
                  class="stretch full-width"
                  color="purple-4"
                  glossy
                  no-caps
                  @click="
                    checkAusgewaehlteBauinformationAusQTableAufExternenLink()
                  "
                  :disable="computeExternerLinkTableBauinformationen"
                />
                <q-btn
                  style="height:45%"
                  dense
                  :href="getSelectedOneDriveLinkTableBauinformationen"
                  type="a"
                  target="_blank"
                  label="OneDrive-Link öffnen"
                  class="stretch full-width"
                  color="light-blue-7"
                  glossy
                  no-caps
                  @click="
                    checkAusgewaehlteBauinformationAusQTableAufOneDriveLink()
                  "
                  :disable="computeOneDriveLinkTableBauinformationen"
                />
              </div>
              <!-- ACHTUNG: Notwendiger Wrapper für die style="width: 100%" an den q-btns!!! -->
              <div class="col-md-2 col-12 q-pa-xs q-gutter-xs">
                <!-- ALT: class="stretch full-width" -->
                <!-- ALT: style="width: 90%" -->
                <!-- ALT: -->
                <!--
                 :href="getSelectedInternerLinkTableBauinformationen"
                  @click="
                    checkAusgewaehlteBauinformationAusQTableAufInternenLink()
                  "
                -->
                <!-- NEU: Für Heroku Upload/Download -->
                <!-- Kein :href="getSelectedInternerLinkTableBauinformationen" mehr, sondern Anzeige des internen Links mit in die @click-Methode verlagert -->
                <q-btn
                  :disable="computeInternerLinkTableBauinformationen"
                  style="height:45%"
                  dense
                  class="stretch full-width"
                  type="a"
                  target="_blank"
                  label="Internen BIM.click-Link öffnen"
                  color="light-green"
                  glossy
                  no-caps
                  @click="
                    checkAusgewaehlteBauinformationAusQTableAufInternenLink()
                  "
                />
                <!-- ACHTUNG: Hier ist noch die alte Version mit :href="getSelectedInternerLinkTableBauinformationen" aktiv! -->
                <q-btn
                  :disable="computeInternerLinkTableBauinformationen"
                  style="height:45%"
                  class="stretch full-width"
                  type="a"
                  dense
                  target="_blank"
                  label="Internen BIM.click-Link öffnen (Test)"
                  color="light-green"
                  glossy
                  no-caps
                  :href="getSelectedInternerLinkTableBauinformationen"
                  @click="
                    checkAusgewaehlteBauinformationAusQTableAufInternenLink()
                  "
                >
                   <q-tooltip
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                    Nur für Tests mit statisch im Download-Verzeichnis
                    gespeicherten Dateien (an Stelle der Schaltfläche darüber)
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-12 q-pa-sm q-gutter-xs">
            <!-- q-uploader - siehe https://quasar.dev/vue-components/uploader -->
            <!-- HINWEISE: -->
            <!-- URL: -->
            <!-- Die URL-Property unten muss dieselbe sein wie die für den Post Request in fileuploader.js am Server -->
            <!-- fileuploader.js nimmt die Post Requests für File Upload, die von q-uploader kommen, am Server entgegen auf dieser URL -->

            <!-- Frühere Factory Function - wird aktuell nicht benötigt, daher disabled -->
            <!-- Vorlage für Upload Factory: https://stackoverflow.com/questions/53899220/quasar-quploader-failed-upload-with-upload-fcatory -->
            <!-- ACHTUNG: Laut https://forum.quasar-framework.org/topic/3729/uploader-with-axios/8 ist Factory Function in V1 anders: -->
            <!-- Aufruf jetzt per :factory="factoryFunctionForUploaderUebersichtBauinformationen" und der updateProgress Parameter ist weggefallen! -->
            <!-- ALT: :upload-factory="factoryFunctionForUploaderUebersichtBauinformationen" -->
            <!-- NEU: :factory="factoryFunctionForUploaderUebersichtBauinformationen" -->

            <!-- Disable des Uploads, falls keine Bauinformation selektiert ist (wie bei den Buttons daneben auch) -->
            <!-- ACHTUNG: :disable="computeSelectedRowsTableBauinformationen" (computed Property) darf KEINE "()" -->
            <!-- hinter dem Methodennamen haben, sonst Vue-Fehler -->
            <!-- "...is not a function" -->
            <!-- Siehe https://forum.quasar-framework.org/topic/4596/how-to-trigger-an-event-when-button-in-q-uploader-is-clicked-how-to-dynamically-disable-enable-it/3 -->

            <!-- @added="bestaetigungFallsInternerLinkDefiniertUploaderUebersichtBauinformationen": Die Methode wird gerufen nach dem Hinzufügen von Dateien in die -->
            <!-- Upload-File-Liste und prüft, ob für die ausgewählte Bauinformation schon ein interner Link vorhanden ist. -->
            <!-- Falls ja, wird q-dialog aufgerufen mit Warnung und Confirmation -->
            <!-- ACHTUNG: Die bei @added gerufene Methode darf keine Umlaute enthalten, sonst wird sie einfach ignoriert!!! -->

            <!-- HINWEIS: Einfacher @click Event funktioniert nicht bei q-uplaoder -->

            <!-- ALT: url="http://localhost:4444/upload/" -->
            <!-- NEU: :url="getUploadURL()" // Methode, um die URL zu berechnen -->
            <!-- ACHTUNG: Mit computed Property :url="computedUploadURL" statt Methode wird die computed-Funktion NICHT aufgerufen!!! -->

            <!-- NEU: Zur Eliminierung von 401 Fehlern, die beim Upload kommen seit Aktivierung von JWT am Frontend und Backend: -->
            <!-- Zunächst 2 Fehlversuche, den JWT Header für JWT Authentication ohne Factory Function zu übermitteln: -->
            <!--   1) :with-credentials="true" => CORS Fehler!!! -->
            <!--   2) :header="getUploadHeader()" =>  Die 401 Fehler gehen damit NICHT weg -->
            <!-- Dann die Lösung: :factory="uploadFile" mit neuer Factory Function uploadFile, die den JWT Header übermittelt wie in den sonstigen Axios API Calls -->
            <!-- ALT: style="max-width: 255px" -->
            <!-- ALT: style="width: 90%" -->
            <!-- ALT: style="height:60%" -->
            <q-uploader
              dense
              square
              class="stretch full-width"
              :factory="uploadFile"
              ref="uploaderUebersichtBauinformationen"
              :url="getUploadURL()"
              label="Datei hochladen für internen BIM.click-Link"
              accept=".jpg, image/*, .png, .gif, .tif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx"
              color="light-green"
              text-color="white"
              @added="
                bestaetigungFallsInternerLinkDefiniertUploaderUebersichtBauinformationen(
                  $event
                )
              "
              @uploaded="
                storeNameOfUploadedFileUploaderUebersichtBauinformationen(
                  $event
                )
              "
              :disable="computeSelectedRowsTableBauinformationen"
              :multiple="false"
            />
          </div>
          <div class="col-md-2 col-12 q-pa-sm q-gutter-xs">
            <!-- ALT: style="height:60%" -->
            <!-- NEU: Den OneDrive File Picker hier disablen, wenn keine Benutzerberechtigung!!! -->
            <!-- Dafür Abfrage mit computed-Funktion auf selektierter Bauinformation in QTable notwendig -->
            <q-btn
              :disable="
                computeSelectedRowsTableBauinformationen ||
                  (benutzerRolleIstMitarbeiter &&
                    !benutzerIstAutorFuerAusgewaehlteBauinformationInTableBauinformationen)
              "
              class="stretch full-width"
              label="Datei auswählen oder hochladen auf OneDrive und BIM.click-OneDrive-Link dafür aktualisieren"
              color="light-blue-7"
              glossy
              no-caps
              dense
              @click="
                bestaetigungFallsOneDriveLinkDefiniertUploaderUebersichtBauinformationen()
              "
            >
            </q-btn>
          </div>
        </div>
        <!-- Eventuelle 2. Zeile mit Buttons, aktuell disabled -->
        <!--
              <div v-if="$q.screen.gt.xs" class="row full-width">
                <div class="col-2"></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
                <div class="col-2"></div>
              </div>
              -->
      </q-tab-panel>
      <!----------------------------------------------------------------------------------------------------------------------->
      <!-- Zweites q-tab-panel, q-form für im ersten Tab ausgewählte Bauinformation                                                                     -->
      <!----------------------------------------------------------------------------------------------------------------------->
      <!-- ALT: <q-tab-panel
        name="auswahlTabBauinformationen"
        v-if="selectedRowsTableBauinformationen[0]"
        :key="keyAuswahlTabBauinformationen"
      > -->
      <q-tab-panel
        name="auswahlTabBauinformationen"
        v-if="ausgewaehlteBauinformation"
        class="q-pa-xs"
      >
        <!-- q-dialog für Konfirmation beim Löschen                                 -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                         -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop    -->
        <q-dialog
          v-model="confirmLoeschenAusgewaehlteBauinformationAusQForm"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Wollen Sie die ausgewählte Bauinformation wirklich
                löschen?</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                label="Abbrechen"
                color="positive"
                glossy
                no-caps
                v-close-popup
              />
              <q-btn
                label="Löschen"
                color="negative"
                glossy
                @click="deleteAusgewaehlteBauinformationAusQForm()"
                v-close-popup
                no-caps
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!! -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Konfirmation beim File Upload für schon definierten internen Link    -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                                    -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop               -->
        <q-dialog
          v-model="confirmUploadInternerLinkAusgewaehlteBauinformation"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die ausgewählte Bauinformation enthält bereits einen internen
                Link und eine Datei. <br />
                <br />
                Wenn Sie diese beibehalten wollen, wählen Sie "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diese mit der für das Hochladen ausgewählten Datei
                überschreiben wollen, wählen Sie zunächst "Weiter" aus, und
                anschließend das Icon oben rechts im Uploader für "Hochladen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="resetUploaderAuswahlBauinformationen()"
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für OneDrive-Link: -->
        <q-dialog
          v-model="confirmUploadOneDriveLinkAusgewaehlteBauinformation"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die ausgewählte Bauinformation enthält bereits einen
                OneDrive-Link.
                <br />
                <br />
                Wenn Sie diesen OneDrive-Link beibehalten wollen, wählen Sie
                "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diesen mit dem OneDrive-Link einer neu auszuwählenden
                Datei auf OneDrive überschreiben wollen, wählen Sie "Weiter"
                aus, sonst "Abbrechen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="
                  confirmUploadOneDriveLinkAusgewaehlteBauinformation = false
                "
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
                @click="
                  confirmUploadOneDriveLinkAusgewaehlteBauinformation = false;
                  oneDrivePickerOpen('share');
                "
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-form>
          <!-- ALT: <div style="min-width: 1400px>" -->
          <!-- ACHTUNG: Dieses div mit style="min-width:" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
          <!-- Sonst macht es sich automatisch klein!!! -->
          <div class="text-h6" v-if="$q.screen.gt.sm">
            Bauinformation: Norm, Vorschrift, Richtlinie, Zulassung, Nachweis,
            Datenblatt oder sonstige Information
          </div>
          <div class="text-subtitle1" v-else>
            Bauinformation: Norm, Vorschrift, Richtlinie, Zulassung, Nachweis,
            Datenblatt oder sonstige Information
          </div>
          <q-separator />
          <div v-if="localStore.state.debugMode">
            ausgewaehlteBauinformation: {{ ausgewaehlteBauinformation }}
            <br />
          </div>
          <div class="row full-width items-start q-col-gutter-xs">
            <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
            <div class="col-md-4 col-12">
              <div>
                <b>Allgemeine Angaben</b>
              </div>
              <div>
                <!-- Erstes q-input hat Testcode zur Nutzung von rules: -->
                <!-- NEU: Bisherige Bauinformationsbezeichnung beim ersten Rendern merken in oldValueBauinformationsBezeichnungAusgewaehlteBauinformation -->
                <!-- Wird beim Submit des Forms für die ausgewählte Bauinformation verwendet, um zu prüfen, ob sich die Bezeichnung geändert hat -->
                <!-- Falls ja, muss die neue Bezeichnung erst auf Eindeutigkeit geprüft werden -->
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <!-- Benutzer mit Benutzerrolle "Mitarbeiter" dürfen damit nur noch Bauinformationen ändern, für die sie Autor sind -->
                <!-- Der erstellende Benutzer wird beim Create der Bauinformation als Autor eingetragen -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  v-if="ausgewaehlteBauinformation"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    ausgewaehlteBauinformation.bauinformationsBezeichnung
                  "
                  lazy-rules
                  :rules="[
                    v => !!v || 'Bezeichnung ist erforderlich',
                    v =>
                      (v && v.length <= 80) ||
                      'Bezeichnung darf höchstens 80 Zeichen lang sein'
                  ]"
                  label="Bezeichnung"
                  hint="Frei wählbare Bezeichnung für die Bauinformation"
                  hide-hint
                  @mounted="
                    oldValueBauinformationsBezeichnungAusgewaehlteBauinformation =
                      ausgewaehlteBauinformation.bauinformationsBezeichnung
                  "
                />
                <!-- TODO: Erster Test von gemeinsamem q-tab-panel/q-form für ausgewählte und neue Bauinformation, mit v-else: -->
                <q-input
                  v-else
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.bauinformationsBezeichnung"
                  lazy-rules
                  :rules="[
                    v => !!v || 'Bezeichnung ist erforderlich',
                    v =>
                      (v && v.length <= 80) ||
                      'Bezeichnung darf höchstens 80 Zeichen lang sein'
                  ]"
                  label="Bezeichnung"
                  hint="Frei wählbare Bezeichnung für die Bauinformation"
                  hide-hint
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.bauinformationsTyp"
                  :options="selectOptionsBauinformationsTyp"
                  options-dense
                  label="Typ:"
                  hint="Typ der Bauinformation, z.B.: 'Norm', 'Gesetz', etc."
                  hide-hint
                  stack-label
                />
              </div>
              <div>
                <!-- NEU: QInput-Feld für neues Feld "bauinformationsAnzeigeText" -->
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="
                    ausgewaehlteBauinformation.bauinformationsAnzeigeText
                  "
                  label="Anzeigetext"
                  hint="Anzeigetext für die Bauinformation, z.B. 'Produktdatenblatt für Zement'"
                  hide-hint
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.bauinformationsBemerkung"
                  label="Bemerkung"
                  hint="Bemerkung für die Bauinformation, z.B. 'Vom Fachplaner für Brandschutz erhalten'"
                  hide-hint
                  autogrow
                />
              </div>
            </div>
            <!--- /col, 1. Spalte  -->
            <div class="col-md-4 col-12">
              <div>
                <b>Links</b>
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.externerLink"
                  label="Externer Link"
                  hint="Beliebige externe URL, z.B.'http://gaa.baden-wuerttemberg.de/servlet/is/16493/1_2_1.pdf'"
                  hide-hint
                  autogrow
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.oneDriveLink"
                  label="OneDrive-Link"
                  hint="Externe OneDrive-URL im Format 'https://1drv.ms/...' - wird per Schaltfläche unten 'Datei auswählen oder hochladen auf OneDrive und BIM.click-OneDrive-Link dafür aktualisieren' automatisch eingetragen"
                  hide-hint
                  autogrow
                />
              </div>
              <br /> <!-- Platz für Hint -->
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.internerLink"
                  label="Interner BIM.click-Link"
                  hint="Interner Dateiname - wird per Schaltfläche unten 'Datei hochladen für internen BIM.click-Link' mit Zeitstempel automatisch eingetragen"
                  hide-hint
                  autogrow
                />
              </div>
              <div class="row full-width q-pa-xs q-col-gutter-xs">
                <div class="col-6">
                  <q-btn
                    dense
                    class="stretch full-width"
                    :disable="computeExternerLinkAusgewaehlteBauinformation"
                    :href="getSelectedExternerLinkAusgewaehlteBauinformation"
                    type="a"
                    target="_blank"
                    label="Externen Link öffnen"
                    color="purple-4"
                    glossy
                    no-caps
                  />
                </div>
                <div class="col-6">
                  <!-- NEU: Für Tests mit Heroku Upload/Download -->
                  <!-- Kein :href="getSelectedInternerAusgewaehlteBauinformationen" mehr, sondern Anzeige des internen Links mit in die @click-Methode verlagert -->
                  <q-btn
                    dense
                    :disable="computeInternerLinkAusgewaehlteBauinformation"
                    class="stretch full-width"
                    type="a"
                    target="_blank"
                    label="Internen BIM.click-Link öffnen"
                    color="light-green"
                    glossy
                    no-caps
                    @click="openInternerLinkAusgewaehlteBauinformation()"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs q-col-gutter-xs">
                <div class="col-6">
                  <!-- NEU: Für Heroku Upload/Download -->
                  <q-btn
                    dense
                    class="stretch full-width"
                    :disable="computeOneDriveLinkAusgewaehlteBauinformation"
                    :href="getSelectedOneDriveLinkAusgewaehlteBauinformation"
                    type="a"
                    target="_blank"
                    label="OneDrive-Link öffnen"
                    color="light-blue-7"
                    glossy
                    no-caps
                  />
                </div>
                <div class="col-6">
                  <!-- ACHTUNG: Hier ist noch die alte Version mit :href aktiv!!! -->
                  <q-btn
                    dense
                    :disable="computeInternerLinkAusgewaehlteBauinformation"
                    class="stretch full-width"
                    :href="getSelectedInternerLinkAusgewaehlteBauinformation"
                    type="a"
                    target="_blank"
                    label="Internen BIM.click-Link öffnen (Test)"
                    color="light-green"
                    glossy
                    no-caps
                  >
                    <q-tooltip
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      Nur für Tests mit statisch im Download-Verzeichnis
                      gespeicherten Dateien (an Stelle der Schaltfläche darüber)
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <br />
              <div class="q-pa-xs q-gutter-xs">
                <!-- QUploader uploaderAuswahlBauinformationen - kann immer enabled sein, bzw. :disable="computeSelectedRowsTableBauinformationen" (sollte true sein im Fall von Tab "Auswahl") -->
                <!-- ALT: url="http://localhost:4444/upload/" -->
                <!-- NEU: :url="getUploadURL()" // Methode, um die URL zu berechnen -->
                <!-- ACHTUNG: Mit computed Property :url="computedUploadURL" statt Methode wird die computed-Funktion NICHT aufgerufen!!! -->
                <!-- NEU: Zur Eliminierung von 401 Fehlern, die beim Upload kommen seit Aktivierung von JWT am Frontend und Backend: -->
                <!-- :factory="uploadFile" mit neuer Factory Function uploadFile, die den JWT Header übermittelt wie in den sonstigen Axios API Calls -->
                <!-- ------------------------------------------------------------ -->
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-uploader
                  class="q-pa-xs stretch full-width"
                  dense
                  square
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  :factory="uploadFile"
                  ref="uploaderAuswahlBauinformationen"
                  :url="getUploadURL()"
                  color="light-green"
                  text-color="white"
                  label="Datei hochladen für internen BIM.click-Link"
                  accept=".jpg, image/*, .png, .gif, .tif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx"
                  @added="
                    bestaetigungFallsInternerLinkDefiniertUploaderAuswahlBauinformationen
                  "
                  @uploaded="
                    storeNameOfUploadedFileUploaderAuswahlBauinformationen
                  "
                  :multiple="false"
                />
                <!-- ALT: @click="oneDrivePickerOpen('share')" -->
                <!-- ACHTUNG: Hier selbe :disable-Funktion wie oben am q-uploader! -->
                <!-- Im Unterschied zum Tab für Neuanlage!!! -->
                <q-btn
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  class="stretch full-width q-pa-xs"
                  label="Datei auswählen oder hochladen auf OneDrive und BIM.click-OneDrive-Link dafür aktualisieren"
                  color="light-blue-7"
                  glossy
                  no-caps
                  @click="
                    bestaetigungFallsOneDriveLinkDefiniertUploaderAuswahlBauinformationen()
                  "
                >
                </q-btn>
                <q-expansion-item
                  label="Kurzanleitung"
                  expand-separator
                  default-opened="false"
                  dense
                  class="stretch full-width"
                  header-class="
                  bg-grey-4 text-black text-bold shadow-2
                "
                >
                  <div class="text-caption">
                    <ul>
                      <li>
                        Nach Drücken der obigen blauen Schaltfläche erscheint in
                        einem Unterfenster der <b>OneDrive File Picker</b>
                      </li>
                      <li>Dort mit ihrem <b>Microsoft-Konto</b> anmelden</li>
                      <li>
                        Im File Picker eine der Dateien auf OneDrive
                        <b>per Checkbox auswählen</b>
                      </li>
                      <li>
                        Nach dieser OneDrive-Dateiauswahl die
                        <b>Schaltfläche 'Öffnen'</b> unten rechts im File Picker
                        drücken - tatsächlich <b>schließt</b> dies den File
                        Picker mit der getroffenen Dateiauswahl
                      </li>
                      <li>
                        <b>Hinweis:</b> Mit dem Dropdown-Menü <b>'Hochladen' > 'Dateien'</b>
                        oben rechts im File Picker kann auch eine
                        Datei neu auf OneDrive hochgeladen und anschließend
                        per Checkbox ausgewählt werden
                      </li>
                      <li>
                        Ein <b>permanenter Link</b> zu der so im File Picker
                        ausgewählten OneDrive-Datei wird beim Verlassen des
                        File Pickers per Schaltfläche <b>'Öffnen'</b> automatisch in das
                        obige <b>Feld 'OneDrive-Link' übertragen</b> und so mit
                        der ausgewählten Bauinformation in BIM.<em>click</em>
                        verbunden
                      </li>
                      <li>
                        <b>Hinweis:</b> Vergessen Sie nicht, die ausgewählte
                        Bauinformation mit der Schaltfläche
                        <b>'Ausgewählte Bauinformation speichern'</b> unten
                        links abzuspeichern
                      </li>
                    </ul>
                  </div>
                </q-expansion-item>
              </div>
            </div>
            <!-- /col, 2. Spalte -->
            <!-- ACHTUNG: 3. Spalte darf nur col-4 sein, wenn oben q-col-gutter-xs, nicht q-guttter-xs, sonst Column Wrapping! Workaround: col-3 -->
            <div class="col-md-4 col-12">
              <div class="row items-start q-col-gutter-xs">
                <b>Gültigkeitsangaben</b>
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.gültigkeitsDatumVon"
                  label="Gültig von"
                  hint="Gültigkeitsdatum von, z.B. '2019-8-01'"
                  hide-hint
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="ausgewaehlteBauinformation.gültigkeitsDatumBis"
                  label="Gültig bis"
                  hint="Gültigkeitsdatum bis, z.B. '2024-12-31'"
                  hide-hint
                />
              </div>
              <br />
              <div class="row items-start q-col-gutter-xs">
                <b>Autoren</b>
              </div>
              <!-- NEU: QSelect für Autoren, disablen in Abhängigkeit von Benutzerrolle -->
              <!-- NEU: Zusätzlich externe Validation am QSelect -->
              <!-- Mit :error, nicht mit :rules -->
              <!-- Diese externe Validation prüft aber aktuell nur bestimmte Bedingungen im Select Model ab und gibt ggf. Warnungen aus, NICHT einen echten Error -->
              <!-- Dies geschieht per :error="!isValidAutorenAusgewaehlteBauinformation", isValidAutorenAusgewaehlteBauinformation ist computed -->
              <!-- Liefert aktuell immer true zurück, daher wird kein echter Validation Error ausgelöst, nur ggf. Warnungen ausgegeben -->
              <!-- Zusätzlich unten Error VSlot am QSelect für Error Message eingefügt, der aber aktuell nicht benutzt wird  -->
              <!-- Siehe https://quasar.dev/vue-components/input#External-validation -->
              <!-- Bei echtem Validation Error müsste zusätzlich der "Speichern"- Button disabled werden mit derselben computed Property! -->
              <q-select
                :error="!isValidAutorenAusgewaehlteBauinformation"
                :disable="
                  benutzerRolleIstMitarbeiter &&
                    !benutzerIstAutorFuerAusgewaehlteBauinformation
                "
                dense
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                input-class="text-white"
                filled
                v-model="
                  selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation
                "
                :options="
                  selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
                "
                option-value="benutzerKennung"
                emit-value
                :multiple="true"
                label="Der Bauinformation zugeordnete Autoren aus-/abwählen"
                stack-label
                use-chips
                options-selected-class="text-primary"
                options-dense
                use-input
                input-debounce="0"
                @new-value="
                  createSelectValueBenutzerKennungenAutorenAusgewaehlteBauinformation
                "
                @filter="
                  selectFilterFunctionBenutzerKennungenAutorenAusgewaehlteBauinformation
                "
                bottom-slots
                @focus="
                  showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation = true
                "
                @blur="
                  showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation = false
                "
              >
                <!-- VSlot für Append (Icons für Suchen und Cancel rechts im QSelect-Feld) -->
                <!-- Zu den Icons siehe https://quasar.dev/vue-components/select#Decorators - erfordert "bottom-slots" Prop am q-select  -->
                <template
                  v-slot:append
                  v-if="ausgewaehlteBauinformation.benutzerKennungenAutoren"
                >
                  <q-icon name="search" @click.stop />
                  <!-- NEU: Statt "clearable" Prop am q-select expliziter Cancel-Icon - erlaubt es, dessen Color zu setzen -->
                  <!-- Vorlage: https://quasar.dev/vue-components/select#Clearable -->
                  <q-icon
                    name="cancel"
                    @click.stop="
                      ausgewaehlteBauinformation.benutzerKennungenAutoren = []
                    "
                    class="cursor-pointer"
                    color="primary"
                  />
                  <!-- ACHTUNG: TODO - Muss oben leerer Array sein??? -->
                </template>
                <!-- VSlot für den Hint: -->
                <!-- NEU: Hint nur anzeigen, wenn das q-select Fokus hat -->
                <!-- Per v-if="showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation" und native Vue Events: -->
                <!-- @focus="showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation=true" -->
                <!-- @blur="showHintBenutzerKennungenAutorenAusgewaehlteBauinformation=false" -->
                <template
                  v-slot:hint
                  v-if="
                    showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation
                  "
                >
                  <ul class="q-pl-xs">
                    <li>
                      Der ausgewählten Bauinformation zugeordnete
                      <strong>Autoren</strong> sind Benutzer, die berechtigt
                      sind, die Bauinformation zu
                      <strong>bearbeiten</strong> oder zu
                      <strong>löschen</strong>.
                    </li>
                    <li>
                      Bei der <strong>Neuanlage</strong> einer Bauinformation
                      durch einen Benutzer wird dieser deren erster zugeordneter
                      Autor.
                    </li>
                    <li>
                      <strong>Filtern:</strong> Die Benutzerkennung eines Autors
                      (d.h. dessen E-Mail-Adresse, z.B.
                      'bob.baumeister@kurz-fischer.de') als Filtertext in das
                      Eingabefeld eingeben. Auch unvollständige Angaben (z.B.
                      'baumeister') sind möglich. Dies filtert die im
                      Dropdown-Menü angezeigten Optionen.
                    </li>
                    <li>
                      <strong>Auswählen:</strong> Der ausgewählten
                      Bauinformation zugeordnete Autoren im Dropdown-Menü
                      auswählen.
                    </li>
                    <li>
                      <strong>Abwählen:</strong> Ausgewählte Autoren können mit
                      <q-icon name="cancel" color="primary" />&nbsp;abgewählt
                      werden.
                    </li>
                  </ul>
                  <!-- <br /> <br /> <br /> -->
                  <!-- TODO: Um vertikalen Scrollbalken zu verhindern, funktioniert nicht -->
                </template>
                <!-- VSlot für die selected Items: -->
                <template v-slot:selected-item="scope">
                  <q-chip
                    removable
                    dense
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="primary"
                    text-color="white"
                    class="q-ma-xs shadow-4"
                  >
                    <!-- ALT: -->
                    <!-- {{ scope.opt }} -->
                    <!-- ACHTUNG - hier NICHT: scope.opt.benutzerKennung !!! -->
                    <!-- ACHTUNG: Bzgl. Sanitization wird hier für die Anzeige im q-chip kein v-html verwendet, sondern wie unten bei den Options nur Moustaches -->
                    <!-- NEU: Long Label Truncation, mit Tooltip der vollen Bezeichnung, mittels spezieller CSS Class "ellipsis": -->
                    <!-- Damit Truncation für lange Texte an QChip - Vorlage: https://quasar.dev/vue-components/chip#Example--Long-label-truncation -->
                    <div class="ellipsis">
                      {{ scope.opt }}
                      <q-tooltip
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                        >{{ scope.opt }}</q-tooltip
                      >
                    </div>
                  </q-chip>
                </template>
                <!-- VSlot für die Options: -->
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <!--
                      <q-item-section avatar>
                        <q-icon :name="scope.opt.icon" />
                      </q-item-section>
                      -->
                    <q-item-section>
                      <q-item-label v-html="scope.opt.benutzerKennung" />
                    </q-item-section>
                  </q-item>
                </template>
                <!-- NEU: VSlot für externe Validation Errors: Aktuell leer -->
                <template v-slot:error> </template>
              </q-select>
              <!-- /q-select für Referenz auf Bauinformation -->
              <!-- Platz für Hint schaffen: -->
              <br />
              <br />
              <br />
              <br />
            </div>
            <!-- /col, 3. Spalte-->
          </div>
          <q-separator />
          <!-- /row, 1. Zeile -->
          <div class="row full-width items-start q-col-gutter-xs">
            <!-- row, 2. Zeile -->
            <div class="col-md-4 col-12">
              <div>
                <b>Herausgeberangaben</b>
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.herausgeberGeografie"
                  label="Geografie"
                  hint="Geografie des Herausgebers, z.B. 'Deutschland'"
                  hide-hint
                  :options="selectOptionsHerausgeberGeografie"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.herausgeberInstitution"
                  label="Institution"
                  hint="Herausgeber-Institution, z.B. 'DIN'"
                  hide-hint
                  :options="selectOptionsHerausgeberInstitution"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-input
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.herausgeberBezeichnung"
                  label="Herausgeberbezeichnung"
                  hint="Falls Institution='Hersteller' oder 'Sonstige Institution', z.B. 'Knauf'"
                  hide-hint
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="
                    ausgewaehlteBauinformation.herausgeberBundeslandDeutschland
                  "
                  label="Bundesland (Deutschland)"
                  hint="Herausgeber-Bundesland (Deutschland), z.B. 'Baden-Württemberg'"
                  hide-hint
                  :options="selectOptionsHerausgeberBundeslandDeutschland"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="
                    ausgewaehlteBauinformation.herausgeberBundeslandÖsterreich
                  "
                  label="Bundesland (Österreich)"
                  hint="Herausgeber-Bundesland (Österreich), z.B. 'Vorarlberg'"
                  hide-hint
                  :options="selectOptionsHerausgeberBundeslandÖsterreich"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.herausgeberKantonSchweiz"
                  label="Kanton (Schweiz)"
                  hint="Herausgeber-Kanton (Schweiz), z.B. 'Basel-Stadt'"
                  :options="selectOptionsHerausgeberKantonSchweiz"
                  options-dense
                  hide-hint
                />
              </div>
            </div>

            <!-- /col, 1. Spalte -->
            <div class="col-md-4 col-12">
              <!-- col, 1. Spalte -->
              <div>
                <b>Normangaben</b>
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.normTypDIN"
                  label="Normtyp (DIN)"
                  hint="Typ der deutschen Norm, z.B. 'DIN', DIN EN','DIN EN ISO'"
                  hide-hint
                  :options="selectOptionsNormTypDIN"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.normTypÖNORM"
                  label="Normtyp (ÖNORM)"
                  hint="Typ der österreichischen Norm, z.B. 'ÖNORM', 'ÖNORM B'"
                  hide-hint
                  :options="selectOptionsNormTypÖNORM"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.normTypSN"
                  label="Normtyp (SN)"
                  hint="Typ der schweizerischen Norm, z.B. 'SN', 'SN ENV', 'SIA'"
                  hide-hint
                  :options="selectOptionsNormTypSN"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.normTypEN"
                  label="Normtyp (EN)"
                  hint="Typ der europäischen Norm, z.B. 'EN'"
                  hide-hint
                  :options="selectOptionsNormTypEN"
                  options-dense
                />
              </div>
              <div>
                <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                <q-select
                  :disable="
                    benutzerRolleIstMitarbeiter &&
                      !benutzerIstAutorFuerAusgewaehlteBauinformation
                  "
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="ausgewaehlteBauinformation.normTypISO"
                  label="Normtyp (ISO)"
                  hint="Typ der internationalen Norm, z.B. 'ISO'"
                  hide-hint
                  :options="selectOptionsNormTypISO"
                  options-dense
                />
              </div>
            </div>
            <!-- /col, 2. Spalte -->
            <div class="col-4 q-pa-xs">
              <!-- ACHTUNG: 3. Spalte darf nur col-4 sein, wenn oben q-col-gutter-xs, nicht q-guttter-xs, sonst Column Wrapping! Workaround: col-3 -->
              <!-- col, 3. Spalte -->
              <div>
                <b>Normkategorien</b>
              </div>
              <div class="text-caption">
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.grundNorm"
                    label="Grundnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.terminologieNorm"
                    label="Terminologienorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.prüfNorm"
                    label="Prüfnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.produktNorm"
                    label="Produktnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.verfahrensNorm"
                    label="Verfahrensnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.dienstleistungsNorm"
                    label="Dienstleistungsnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.schnittstellenNorm"
                    label="Schnittstellennnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.deklarationsNorm"
                    label="Deklarationsnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.fachbereichsNorm"
                    label="Fachbereichsnorm"
                  />
                </div>
                <div>
                  <!-- NEU: Feld disablen in Abhängigkeit vom angemeldeten Benutzer -->
                  <q-toggle
                    :disable="
                      benutzerRolleIstMitarbeiter &&
                        !benutzerIstAutorFuerAusgewaehlteBauinformation
                    "
                    v-model="ausgewaehlteBauinformation.werkNorm"
                    label="Werknorm"
                  />
                </div>
              </div>
            </div>
            <!-- /col, 3. Spalte -->
          </div>
          <!-- /row, 2. Zeile -->
          <!--------------------------------------------------------------------------------------------------------------------------------->
          <!-- Komponente q-separator als sichtbare Trennung zwischen q-table und den Schaltflächen darunter (q-btns) -->
          <q-separator />
          <div class="row full-width q-pa-xs q-col-gutter-xs">
            <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
            <!-- NEU: Button disablen in Abhängigkeit vom angemeldeten Benutzer -->
            <!-- Benutzer mit Benutzerrolle "Mitarbeiter" dürfen damit nur noch Bauinformationen ändern, für die sie Autor sind -->
            <!-- Der erstellende Benutzer wird beim Create der Bauinformation als Autor eingetragen -->
            <div class="col-md-4 col-12">
              <q-btn
                :disable="
                  benutzerRolleIstMitarbeiter &&
                    !benutzerIstAutorFuerAusgewaehlteBauinformation
                "
                class="stretch full-width"
                style="height: 100%"
                color="positive"
                glossy
                @click="submitAusgewaehlteBauinformationAusQForm()"
                label="Ausgewählte Bauinformation speichern"
                no-caps
              />
            </div>
            <div class="col-md-4 col-12">
              <!-- NEU: Button disablen in Abhängigkeit vom angemeldeten Benutzer -->
              <q-btn
                :disable="
                  benutzerRolleIstMitarbeiter &&
                    !benutzerIstAutorFuerAusgewaehlteBauinformation
                "
                class="stretch full-width"
                style="height: 100%"
                color="deep-orange"
                glossy
                text-color="white"
                @click="cancelAusgewaehlteBauinformationAusQForm()"
                label="Eingaben auf Originalwerte zurücksetzen"
                no-caps
              />
            </div>
            <div class="col-md-4 col-12">
              <!-- NEU: Button disablen in Abhängigkeit vom angemeldeten Benutzer -->
              <q-btn
                :disable="
                  benutzerRolleIstMitarbeiter &&
                    !benutzerIstAutorFuerAusgewaehlteBauinformation
                "
                class="stretch full-width"
                style="height: 100%"
                color="negative"
                glossy
                @click="
                  confirmLoeschenAusgewaehlteBauinformationAusQForm = true
                "
                label="Ausgewählte Bauinformation löschen"
                no-caps
              />
            </div>
          </div>
        </q-form>
      </q-tab-panel>
      <!----------------------------------------------------------------------------------------->
      <!-- Drittes q-tab-panel für Neuanlage Bauinformation                                    -->
      <!-- TODO: Evtl. zusammenlegen mit zweitem q-tab-panel (Layout ist identisch, nur die    -->
      <!-- Initialisierung, v-ifs und v-models sind unterschiedlich)                           -->
      <!-- HINWEIS: ALLE Benutzer dürfen neue Bauinformationen anlegen                         -->
      <!--          Beim Anlegen (createBauinformation()) wird der aktuell angemeldete Benutzer-->
      <!--          als Autor eingetragen in das Feld benutzerKennungenAutoren                 -->
      <!--          Bauinformationen bearbeiten/löschen dürfen dann nur die jeweiligen Autoren -->
      <!----------------------------------------------------------------------------------------->
      <q-tab-panel
        name="neuTabBauinformationen"
        v-if="neueBauinformation"
        class="q-pa-xs"
      >
        <!-- q-dialog für Konfirmation beim Löschen                                           -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                                         -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop              -->
        <q-dialog
          v-model="confirmLoeschenNeueBauinformationAusQForm"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Wollen Sie die neu angelegte Bauinformation wirklich
                löschen?</span
              >
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
              />
              <q-btn
                glossy
                label="Löschen"
                color="negative"
                @click="deleteNeueBauinformationAusQForm()"
                v-close-popup
                no-caps
              />
              <!-- ACHTUNG: Bei @click="method()" unbedingt "()"" hinter "method" angeben, sonst passiert gar nichts!!!  -->
              <!-- ANDERERSEITS: @click="handleClick" und @click="handleClick()" sind äquivalent laut https://flaviocopes.com/vue-events/ -->
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für Konfirmation beim File Upload für schon definierten internen Link    -->
        <!-- q-dialogs sind dediziert für jedes q-tab-panel                                    -->
        <!-- TODO: Alternativ eine gemeinsame Komponente mit Steuerung über Prop               -->
        <q-dialog
          v-model="confirmUploadInternerLinkNeueBauinformation"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die neue Bauinformation enthält bereits einen internen Link und
                eine Datei. <br />
                <br />
                Wenn Sie diese beibehalten wollen, wählen Sie "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diese mit der für das Hochladen ausgewählten Datei
                überschreiben wollen, wählen Sie zunächst "Weiter" aus, und
                anschließend das Icon oben rechts im Uploader für "Hochladen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="resetUploaderNeuBauinformationen()"
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <!-- q-dialog für OneDrive-Link: -->
        <q-dialog
          v-model="confirmUploadOneDriveLinkNeueBauinformation"
          persistent
        >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm"
                >Die neue Bauinformation enthält bereits einen OneDrive-Link.
                <br />
                <br />
                Wenn Sie diesen OneDrive-Link beibehalten wollen, wählen Sie
                "Abbrechen" aus.
                <br />
                <br />
                Wenn Sie diesen mit dem OneDrive-Link einer neu auszuwählenden
                Datei auf OneDrive überschreiben wollen, wählen Sie "Weiter"
                aus, sonst "Abbrechen".
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                glossy
                label="Abbrechen"
                color="positive"
                no-caps
                v-close-popup
                @click="confirmUploadOneDriveLinkNeueBauinformation = false"
              />
              <q-btn
                glossy
                label="Weiter"
                color="negative"
                v-close-popup
                no-caps
                @click="
                  confirmUploadOneDriveLinkNeueBauinformation = false;
                  oneDrivePickerOpen('share');
                "
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-form>
          <!-- ALT: <div class style="min-width: 1400px"> -->
          <!-- ACHTUNG: Dieses div mit style="min-width:" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
          <!-- Sonst macht es sich automatisch klein!!! -->
          <div class="text-h6" v-if="$q.screen.gt.sm">
            Neue Bauinformation: Norm, Vorschrift, Richtlinie, Zulassung,
            Nachweis, Datenblatt oder sonstige Information
          </div>
          <div class="text-subtitle1" v-else>
            Neue Bauinformation: Norm, Vorschrift, Richtlinie, Zulassung,
            Nachweis, Datenblatt oder sonstige Information
          </div>
          <q-separator />
          <br />
          <div v-if="localStore.state.debugMode">
            neueBauinformation: {{ neueBauinformation }}
            <br />
            <br />
          </div>
          <div class="row full-width items-start q-col-gutter-xs">
            <!-- ACHTUNG: Hier q-col-gutter-xs, nicht q-gutter-xs, sonst wird die letzte Column gewrapped!!! -->
            <div class="col-md-4 col-12">
              <div>
                <b>Allgemeine Angaben</b>
              </div>
              <div>
                <!-- Erstes q-input hat Testcode zur Nutzung von rules: -->
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.bauinformationsBezeichnung"
                  lazy-rules
                  :rules="[
                    v => !!v || 'Bezeichnung ist erforderlich',
                    v =>
                      (v && v.length <= 80) ||
                      'Bezeichnung darf höchstens 80 Zeichen lang sein'
                  ]"
                  label="Bezeichnung"
                  hint="Frei wählbare Bezeichnung"
                  hide-hint
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.bauinformationsTyp"
                  :options="selectOptionsBauinformationsTyp"
                  options-dense
                  label="Typ:"
                  hint="Typ, z.B.: 'Norm', 'Gesetz', etc."
                  hide-hint
                  stack-label
                />
              </div>
              <div>
                <!-- NEU: QInput-Feld für neues Feld "bauinformationsAnzeigeText" -->
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.bauinformationsAnzeigeText"
                  label="Anzeigetext"
                  hint="Anzeigetext für die Bauinformation, z.B. 'Produktdatenblatt für Zement'"
                  hide-hint
                />
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.bauinformationsBemerkung"
                  label="Bemerkung"
                  hint="Bemerkung für die Bauinformation, z.B. 'Vom Fachplaner für Brandschutz erhalten'"
                  hide-hint
                  autogrow
                />
              </div>
            </div>
            <!--- /col, 1. Spalte  -->
            <div class="col-md-4 col-12">
              <div>
                <b>Links</b>
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.externerLink"
                  label="Externer Link"
                  hint="Beliebige externe URL, z.B.'http://gaa.baden-wuerttemberg.de/servlet/is/16493/1_2_1.pdf'"
                  hide-hint
                  autogrow
                />
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.oneDriveLink"
                  label="OneDrive-Link"
                  hint="Externe OneDrive-URL im Format 'https://1drv.ms/...' - wird per Schaltfläche unten 'Datei hochladen und auswählen auf OneDrive und BIM.click-OneDrive-Link dafür aktualisieren' automatisch eingetragen"
                  hide-hint
                  autogrow
                />
              </div>
              <br /> <!-- Platz für Hint -->
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.internerLink"
                  label="Interner BIM.click-Link"
                  hint="Interner Dateiname - wird per Schaltfläche unten 'Datei hochladen für internen BIM.click-Link' mit Zeitstempel automatisch eingetragen"
                  hide-hint
                  autogrow
                />
              </div>
              <div class="row full-width q-pa-xs q-col-gutter-xs">
                <div class="col-6">
                  <q-btn
                    class="stretch full-width"
                    :href="getSelectedExternerLinkNeueBauinformation"
                    type="a"
                    target="_blank"
                    label="Externen Link öffnen"
                    color="purple-4"
                    glossy
                    no-caps
                    :disable="computeExternerLinkNeueBauinformation"
                  />
                </div>
                <div class="col-6">
                  <!-- NEU: Für Tests mit Heroku Upload/Download -->
                  <!-- Kein :href="getSelectedInternerNeueBauinformation" mehr, sondern Anzeige des internen Links mit in die @click-Methode verlagert -->
                  <q-btn
                    class="stretch full-width"
                    type="a"
                    target="_blank"
                    label="Internen BIM.click Link öffnen"
                    color="light-green"
                    glossy
                    no-caps
                    @click="openInternerLinkNeueBauinformation()"
                    :disable="computeInternerLinkNeueBauinformation"
                  />
                </div>
              </div>
              <div class="row full-width q-pa-xs q-col-gutter-xs">
                <!-- NEU: Für Heroku Upload/Download -->
                <div class="col-6">
                  <q-btn
                    class="stretch full-width"
                    :href="getSelectedOneDriveLinkNeueBauinformation"
                    type="a"
                    target="_blank"
                    label="OneDrive-Link öffnen"
                    color="light-blue-7"
                    glossy
                    no-caps
                    :disable="computeOneDriveLinkNeueBauinformation"
                  />
                </div>
                <div class="col-6">
                  <!-- ACHTUNG: Hier ist noch die alte Version mit :href aktiv!!! -->
                  <q-btn
                    class="stretch full-width"
                    :href="getSelectedInternerLinkNeueBauinformation"
                    type="a"
                    target="_blank"
                    label="Internen BIM.click-Link öffnen (Test)"
                    color="light-green"
                    glossy
                    no-caps
                    :disable="computeInternerLinkNeueBauinformation"
                  >
                    <q-tooltip
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      Nur für Tests mit statisch im Download-Verzeichnis
                      gespeicherten Dateien (an Stelle der Schaltfläche darüber)
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
              <br />
              <div class="q-pa-xs">
                <!-- QUploader uploaderNeuBauinformationen - kann immer enabled sein -->
                <!-- ALT: url="http://localhost:4444/upload/" -->
                <!-- NEU: :url="getUploadURL()" // Methode, um die URL zu berechnen -->
                <!-- ACHTUNG: Mit computed Property :url="computedUploadURL" statt Methode wird die computed-Funktion NICHT aufgerufen!!! -->
                <!-- NEU: Zur Eliminierung von 401 Fehlern, die beim Upload kommen seit Aktivierung von JWT am Frontend und Backend: -->
                <!-- :factory="uploadFile" mit neuer Factory Function uploadFile, die den JWT Header übermittelt wie in den sonstigen Axios API Calls -->
                <q-uploader
                  dense
                  class="stretch full-width"
                  square
                  :factory="uploadFile"
                  ref="uploaderNeuBauinformationen"
                  :url="getUploadURL()"
                  color="light-green"
                  text-color="white"
                  label="Datei hochladen für internen BIM.click-Link"
                  accept=".jpg, image/*, .png, .gif, .tif, .pdf, .xls, .xlsx, .csv, .doc, .docx, .ppt, .pptx"
                  @added="
                    bestaetigungFallsInternerLinkDefiniertUploaderNeuBauinformationen
                  "
                  @uploaded="storeNameOfUploadedFileUploaderNeuBauinformationen"
                  :multiple="false"
                  :disable="false"
                />
              </div>
              <q-btn
                :disable="false"
                class="stretch full-width q-pa-xs"
                label="Datei hochladen und auswählen auf OneDrive und BIM.click-OneDrive-Link dafür aktualisieren"
                color="light-blue-7"
                glossy
                no-caps
                @click="
                  bestaetigungFallsOneDriveLinkDefiniertUploaderNeuBauinformationen()
                "
              >
              </q-btn>
              <q-expansion-item
                label="Kurzanleitung"
                expand-separator
                default-opened="false"
                dense
                class="stretch full-width"
                header-class="
                bg-grey-4 text-black text-bold shadow-2
              "
              >
                <div class="text-caption">
                  <ul>
                    <li>
                      Nach Drücken der obigen blauen Schaltfläche erscheint in
                      einem Unterfenster der <b>OneDrive File Picker</b>
                    </li>
                    <li>Dort mit Ihrem <b>Microsoft-Konto</b> anmelden</li>
                    <li>
                      Im File Picker das Dropdown-Menü
                      <b>'Hochladen' > 'Dateien'</b> oben rechts anwählen
                    </li>
                    <li>
                      Im sich dann öffnenden Datei-Auswahldialog eine lokale
                      Datei auswählen und auf OneDrive <b>hochladen</b>
                    </li>
                    <li>
                      <b>Achtung:</b> Anschließend muss die hochgeladene Datei
                      im File Picker per <b>Checkbox</b> nochmals manuell
                      ausgewählt werden.
                    </li>
                    <b>Hinweis:</b> Es kann so auch eine andere, bereits auf
                      OneDrive gespeicherte Datei per Checkbox ausgewählt werden
                    <li>
                      Dann die Schaltfläche <b>'Öffnen'</b> unten rechts im File
                      Picker drücken - tatsächlich <b>schließt</b> dies den File
                      Picker mit der getroffenen Dateiauswahl
                    </li>
                    <li>
                      Ein <b>permanenter Link</b> zu der so im File Picker
                      hochgeladenen und ausgewählten OneDrive-Datei wird beim
                      Verlassen des File Pickers per Schaltfläche <b>'Öffnen'</b>
                      in das obige <b>Feld 'OneDrive-Link' übertragen</b> und so mit
                      der neuen Bauinformation in BIM.<em>click</em> verbunden
                    </li>
                    <li>
                      <b>Hinweis:</b>Vergessen Sie nicht, die neue
                      Bauinformation mit der Schaltfläche
                      <b>'Neue Bauinformation speichern'</b> unten links
                      abzuspeichern
                    </li>
                  </ul>
                </div>
              </q-expansion-item>
            </div>
            <!-- /col, 2. Spalte -->
            <!-- ACHTUNG: 3. Spalte darf nur col-4 sein, wenn oben q-col-gutter-xs, nicht q-guttter-xs, sonst Column Wrapping! Workaround: col-3 -->
            <div class="col-md-4 col-12">
              <div class="row items-start q-col-gutter-xs">
                <b>Gültigkeitsangaben</b>
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.gültigkeitsDatumVon"
                  label="Gültig von"
                  hint="Gültigkeitsdatum von, z.B. '2019-8-01'"
                  hide-hint
                />
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.gültigkeitsDatumBis"
                  label="Gültig bis"
                  hint="Gültigkeitsdatum bis, z.B. '2024-12-31'"
                  hide-hint
                />
              </div>
            </div>
            <!-- /col, 3. Spalte-->
          </div>
          <q-separator />
          <!-- /row, 1. Zeile -->
          <div class="row full-width items-start q-col-gutter-xs">
            <!-- row, 2. Zeile -->
            <div class="col-md-4 col-12">
              <div>
                <b>Herausgeberangaben</b>
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.herausgeberGeografie"
                  label="Geografie:"
                  hint="Geografie des Herausgebers, z.B. 'Deutschland'"
                  hide-hint
                  :options="selectOptionsHerausgeberGeografie"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.herausgeberInstitution"
                  label="Institution"
                  hint="Herausgeber-Institution, z.B. 'DIN'"
                  hide-hint
                  :options="selectOptionsHerausgeberInstitution"
                  options-dense
                />
              </div>
              <div>
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="neueBauinformation.herausgeberBezeichnung"
                  label="Herausgeberbezeichnung"
                  hint="Falls Institution='Hersteller' oder 'Sonstige Institution', z.B. 'Knauf'"
                  hide-hint
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.herausgeberBundeslandDeutschland"
                  label="Bundesland (Deutschland)"
                  hint="Herausgeber-Bundesland (Deutschland), z.B. 'Baden-Württemberg'"
                  hide-hint
                  :options="selectOptionsHerausgeberBundeslandDeutschland"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.herausgeberBundeslandÖsterreich"
                  label="Bundesland (Österreich)"
                  hint="Herausgeber-Bundesland (Österreich), z.B. 'Vorarlberg'"
                  hide-hint
                  :options="selectOptionsHerausgeberBundeslandÖsterreich"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.herausgeberKantonSchweiz"
                  label="Kanton (Schweiz)"
                  hint="Herausgeber-Kanton (Schweiz), z.B. 'Basel-Stadt'"
                  :options="selectOptionsHerausgeberKantonSchweiz"
                  options-dense
                  hide-hint
                />
              </div>
            </div>
            <!-- /col, 1. Spalte -->
            <div class="col-md-4 col-12">
              <!-- col, 1. Spalte -->
              <div>
                <b>Normangaben</b>
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.normTypDIN"
                  label="Normtyp (DIN)"
                  hint="Typ der deutschen Norm, z.B. 'DIN', DIN EN','DIN EN ISO'"
                  hide-hint
                  :options="selectOptionsNormTypDIN"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.normTypÖNORM"
                  label="Normtyp (ÖNORM)"
                  hint="Typ der österreichischen Norm, z.B. 'SN', 'SN ENV'"
                  hide-hint
                  :options="selectOptionsNormTypÖNORM"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.normTypSN"
                  label="Normtyp (SN)"
                  hint="Typ der schweizerischen Norm, z.B. 'ÖNORM', 'ÖNORM B"
                  hide-hint
                  :options="selectOptionsNormTypSN"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.normTypEN"
                  label="Normtyp (EN)"
                  hint="Typ der europäischen Norm, z.B. 'EN'"
                  hide-hint
                  :options="selectOptionsNormTypEN"
                  options-dense
                />
              </div>
              <div>
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-white"
                  dense
                  v-model="neueBauinformation.normTypISO"
                  label="Normtyp (ISO)"
                  hint="Typ der internationalen Norm, z.B. 'ISO'"
                  hide-hint
                  :options="selectOptionsNormTypISO"
                  options-dense
                />
              </div>
            </div>
            <!-- /col, 2. Spalte -->
            <div class="col-4 q-pa-xs">
              <!-- ACHTUNG: 3. Spalte darf nur col-4 sein, wenn oben q-col-gutter-xs, nicht q-guttter-xs, sonst Column Wrapping! Workaround: col-3 -->
              <!-- col, 3. Spalte -->
              <div>
                <b>Normkategorien</b>
              </div>
              <div class="text-caption">
                <div>
                  <q-toggle
                    v-model="neueBauinformation.grundNorm"
                    label="Grundnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.terminologieNorm"
                    label="Terminologienorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.prüfNorm"
                    label="Prüfnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.produktNorm"
                    label="Produktnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.verfahrensNorm"
                    label="Verfahrensnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.dienstleistungsNorm"
                    label="Dienstleistungsnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.schnittstellenNorm"
                    label="Schnittstellennnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.deklarationsNorm"
                    label="Deklarationsnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.fachbereichsNorm"
                    label="Fachbereichsnorm"
                  />
                </div>
                <div>
                  <q-toggle
                    v-model="neueBauinformation.werkNorm"
                    label="Werknorm"
                  />
                </div>
              </div>
            </div>
            <!-- /col, 3. Spalte -->
          </div>
          <!-- /row, 2. Zeile -->
          <!--------------------------------------------------------------------------------------------------------------------------------->
          <!-- Komponente q-separator als sichtbare Trennung zwischen q-tree und den Schaltflächen darunter (q-btns) -->
          <q-separator />
          <div class="row full-width q-pa-xs q-col-gutter-xs">
            <div class="col-md-4 col-12">
              <!-- NEU: Fix 22.05.2020 - type="submit" entfernt, da sonst q-form einen Fehler beim @submit Event auslöst, der zum Logout führt! -->
              <q-btn
                class="stretch full-width"
                style="height: 100%"
                color="positive"
                glossy
                @click="createNeueBauinformationAusQForm()"
                label="Neue Bauinformation speichern"
                no-caps
              />
            </div>
            <div class="col-md-4 col-12">
              <q-btn
                class="stretch full-width"
                style="height: 100%"
                color="deep-orange"
                glossy
                text-color="white"
                @click="cancelNeueBauinformationAusQForm()"
                label="Eingaben zurücksetzen"
                no-caps
              />
            </div>
            <div class="col-md-4 col-12">
              <!-- TODO XXXXXX: Button nur enablen nach einer erfolgreichen Neuanlage -->
              <q-btn
                class="stretch full-width"
                style="height: 100%"
                color="negative"
                glossy
                @click="confirmLoeschenNeueBauinformationAusQForm = true"
                label="Neu angelegte Bauinformation löschen"
                no-caps
              />
            </div>
          </div>
        </q-form>
      </q-tab-panel>
      <!--===================================================================================== -->
      <!-- NEU: QTabPanel für Bauinformationsprofile hierher verschoben aus der Haupttableiste: -->
      <q-tab-panel
        name="tabBauinformationsProfile"
        label="Bauinformationsprofile"
        no-caps
        class="q-pa-xs"
      >
        <bauinformationsProfile />
        <!-- --------------------------------------------------------------------------------- -->
        <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
        <!-- --------------------------------------------------------------------------------- -->
        <q-tooltip
          :delay="1000"
          :offset="[0, 10]"
          max-width="500px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          Verwaltung zusammengehöriger Dokumente und Links
        </q-tooltip>
      </q-tab-panel>
      <!-- ================================================================================== -->
    </q-tab-panels>
    <!-- </q-card> -->
  </q-page>
</template>
<!-- ==================================================================================================================== -->
<!-------------------------------------------------------------------------------------------------------------------------->
<!-- <style> Region VOR die <script> Region verschoben, nach Tipp in der Vue Syntax Highlighting Extension für VS Code, -->
<!-- um einen Bug in ESLint zu umgehen -->

<!--//====================================================================================================================================-->
<!-- CSS .my-sticky-column-table, ursprünglich auskommentiert, wegen Dependency auf SASS-Preprocessor -->
<!--
     CSS, um erste Spalte in q-table (mit zunächst EINER Header-Zeile) "sticky" zu machen, siehe https://quasar.dev/vue-components/table */
     Benötigt SASS als CSS Pre-Processor - dieser wird angezogen per style lang="sass"
     Neu:    https://quasar.dev/quasar-cli/cli-documentation/css-preprocessors#Introduction
             SASS kann mit Quasar App v1.1.0+ direkt verwendet werden!
     Vorher: http://v0-13.quasar-framework.org/guide/app-pre-processors.html

     a) Zunächst Quasar Upgrade nach Quasar 1.1.7 und Quasar App 1.1.4 durchgeführt mit:
        bimclickfrontend> quasar upgrade
        bimclickfrontend> quasar upgrade --install
        Am Besten aus separatem Node.js Command Window mit Admin-Rechten bzw. bei geschlossenem VS Code,
        da bei laufendem VS Code es zu gelockten Files, die vom NPM Install gebraucht werden, kommen kann!!!
        Siehe auch https://quasar.dev/start/upgrade-guide

     b) Sass-Loader und Node-Sass mussten (sonst auch nach dem Quasar Upgrade Compile-Fehler mit dem <style lange="sass">)
        dennoch installiert werden nach Hinweisen in https://quasar.dev/quasar-cli/cli-documentation/handling-webpack, mittels:
          bimclickfrontend> npm add --dev sass-loader node-sass
          (Note you also need to install node-sass because sass-loader depends on it as a peer dependency)
     c) Es kamen danach Warnungen, dass zusätzliche Pakete sass und fibers benötigt werden (ignorieren???
        Diese könnten installiert werden mit npm install -g sass bzw. npm install fibers (unklar, ob notwendig oder nicht)

     d) Zusätzlich in VS Code eine Sass Extension installiert zur Formatierung des SASS-Codes

     e) Dann den ursprünglichen SASS/CSS-Code aus der Vorlage umfänglich angepasst mit vielen Versuchen,
        damit auch die zweite Spalte "sticky" wird!!!
        CSS-HINWEISE: https://stackoverflow.com/questions/5664773/how-can-i-get-a-specific-number-child-using-css
        ACHTUNG: max-width: 600px verursachte Compile-Fehler, daher entfernt!!!

     f) TODO: Später zusätzlich zu sticky Column noch sticky Header hinzufügen, dazu gibt es auch eine Vorlage auf
        https://quasar.dev/vue-components/table

-->
<!-- Start Vorlage -->
<!--
<style lang="sass">
.my-sticky-column-table
    /* specifying max-width so the example can highlight the sticky column on any browser window     */
    max-width: 600px

    /* bg color is important for th; just specify one */
    thead tr: first-child th: first-child
      background-color: #fff
      opacity: 1

    td:first-child
      background-color: #f5f5dc

    thead tr: first-child th: first-child,

    td: first-child
      position: sticky
      left: 0
      z-index: 1
 </style>
-->
<!-- Ende Vorlage -->

<style lang="sass">
/* Aktueller q-table Aufbau für Tabelle Bauinformationen: */
/* Header: */
/* q-tr für einzige Header-Zeile */
/*   Von Quasar erzeugte q-ths, mindestens 2-mal (1 für (De-)Select All Checkbox, 1 für "Bezeichnung"), weitere q-ths für Spalten-Labels */
/* Body: Viele q-trs mit q-tds */
/* ACHTUNG: Ein Quasar <q-th> entspricht nicht immer einem HTML <th> was in der CSS verwendet wird! */
/* ACHTUNG: Für die OHNE VSlots für Header und Body aufgebaute Tabelle für Bauinformationen mit einer Header-Zeile ist die Generierung */
/* von HTML <th>s und <td>s anders als bei der Tabelle für Materialeigenschaften MIT VSlots für Header und Body und zwei Header-Zeilen!!! */
/* In der einzigen Header-Zeile wird hier für die erste (De-)Select All Checkbox Spalte ein <th> verwendet und auch sonst nur <th>s!!! */
/* Daher sind hier andere thead und tbody Definitionen erforderlich als für .stickyColumnsTable2HeaderLines */
.stickyColumnsTable1HeaderLineZugeordneteBauinformationen
  /*----------------------------------------------------------------------------------------------------------------------------*/
  /* Definitionen für Farben für Table mit 1 Header-Zeile und Body: */
  /* #C0C0C0 ist HTML Silver, siehe https://www.w3schools.com/colors/colors_shades.asp */

  thead tr:first-child th:first-child /* Setzt Farbe der 1. Header-Zeile, 1. Spalte (th - nicht td wie oben) - OK */
    background-color: #F5F5F5 // HTML White Smoke // HTML White, siehe https://www.w3schools.com/colors/colors_shades.asp
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
.background-color-beige {
  /* Aktuell nicht verwendet */
  background-color: #f5f5dc;
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
</style>

<!--
<style>
.list {
  /* Wird aktuell nicht verwendet */
  text-align: left;
  max-width: 450;
  margin: auto;
}
.table-class {
  /* Wird aktuell nicht verwendet, CSS für q-table, aktivierbar per table-class="table-class" */
  height: 300px; /* Setzt Table Height auf 300px - funktioniert! */
}
</style>
-->

<script>
/*===================================================================================================================================================//
NEU: Vue/Quasar Komponente Bauinformationen.vue
ALT: Vue/Quasar Komponente Baubestimmungen.vue
//-------------------------------------------------------------------------------------------------------------------------------------*/
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { date } from "quasar"; // NEU: Für Quasar Date Utils, siehe https://quasar.dev/quasar-utils/date-utils

// import http from "../http-common"; // ACHTUNG: "Peek Definition" zeigt, dass dies indirekt Axios importiert!!!
// Damit funktionieren API Calls per http.get, http.put, etc.
// Allerdings scheinen die nicht per Axios zu laufen, denn laut Log werden die Axios Interceptors bei diesen Calls nicht ausgeführt!!!
// Daher auskommenteirt und alle http Calls umgestellt auf native Axios Calls wie in Baustoff.vue!!!
// Siehe https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index - Axios Cheat Sheet

// import Vue from "vue"; /* ALT */
// VUE 3: import Vue from "vue/dist/vue.js"; /* NEU - Muss ÜBERALL so importiert werden, auch in den anderen Vue Schwester-Komponenten
// ACHTUNG: In index.js funktioniert es so nicht, dort den obigen alten Import belassen !!!!!!!!!!!! */
/*---------------------------------------------------------------------------------------------------------------------------------------------//
Dies soll Vue Warning verhindern, die zuerst durch die (vorübergehende) Verwendung der template: Option für neu eingefügte Komponente in baustoff.vue kam:
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available.
Either pre-compile the templates into render functions, or use the compiler-included build.
Ohne dieses Import auch andere Fehler, dass Baustoff in Liste nicht gefunden wird, also wo immer möglich den neuen Import verwenden!
//---------------------------------------------------------------------------------------------------------------------------------------------*/

// NEU Enums zur Verwaltung der Benutzernachrichten (Banner Message im Footer)
// ACHTUNG: Dabei kein require, sondern import, sonst undefined Fehler beim Zugriff!!!
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BauinformationsProfile from "../components/bauinformations-profile.vue"; // NEU
//------------------------------------------------------------------------------------------------------------------------------
// NEU: Für OneDrive File Upload/Download - basierend auf erstem Prototyp in verwaltung.vue, Test Area 3
// Finale Vorlage:  https://github.com/microsoftgraph/msgraph-training-smartui-components/tree/main/Demos/01-pickers
// ACHTUNG: Die App-Definitionen im Azure Portal waren ursprünglich nur für die lokale Ausführung auf http://localhost:4200
// Später noch https://bimclick.herokuappcom als Umleitungs-URI für die App BIM.click auf Azure hinzugefügt - damit funktioniert der File Picker auch auf Heroku!!!
//------------------------------------------------------------------------------------------------------------------------------
// ACHTUNG: Mangels funktionierendem NPM Packge für den OneDrive File Picker den Code dafür von https://js.live.net/v7.2/OneDrive.js (dies ist im Januar 2022 die neueste Version)
// in eine lokale js-Datei kopiert (../modules/onedrive-file-picker.js) und unten per require benutzt.
// Erfordert daher KEINE Package Installation per npm!!!
//------------------------------------------------------------------------------------------------------------------------------
// Siehe auch https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/open-file?view=odsp-graph-online
// und https://github.com/OneDrive/onedrive-api-docs/issues/864
// ACHTUNG: App-Registrierung für App bim.click dafür notwendig mit Microsoft-Konto, unter https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
// Siehe Instruktionen auf  https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/?view=odsp-graph-online#setting-up
//------------------------------------------------------------------------------------------------------------------------------
// Instruktionen für App-Registrierung:
// Log in to the Azure App registrations page using your Microsoft account, or a work or school account. (URL siehe oben, MS-Konto von MS@bimlive.de)
// Click Add an app and enter a name for your app. (BIM.click)
// After your application is created, configure it to support the JavaScript picker:
//  Click Generate New Password to create an Application secret. While this value is not necessary for the picker, it must have been created. (Secret für OneDrive File Picker)
//  Click Add Platform and then select Web.
//  Enter one or more URLs where the picker will be hosted on your website. Each page that hosts the picker needs to have a redirect URL provided.
//    (Web-Anwendung ausgewählt, Redirect URL: http://localhost:4200, für ersten Versuch mit MS-Konto MS@scheibles.info "Zugriffstoken" und "ID-Token" zusätzlich angekreuzt, für SPAs)
//  Click the Save button to save your changes.
// Copy the Application Id for your application and use it in the JavaScript options object you provided to open or save a file. (Siehe const unten!)
// PROBLEM mit MS-Konto von MS@scheibles.info:
// MS Login Window kommt hoch, bringt aber trotz Registrierung der Anwendung oben eine Fehlermeldung
// "unauthorized_client: The client does not exist or is not enabled for consumers. If you are the application developer, configure a new application through the App Registrations in the Azure Portal at https://go.microsoft.com/fwlink/?linkid=2083908."
// Oben unter "Unterstützte Kontotypen" angekreuzt wird:
// "Konten in einem beliebigen Organisationsverzeichnis (beliebiges Azure AD-Verzeichnis – mehrinstanzenfähig)" (für MS@scheibles.info)
// "Nur Konten in diesem Organisationsverzeichnis (nur "Standardverzeichnis" – einzelner Mandant)" (für MS@bimlive.de)
// bleibt das Login Window, allerdings kann man dann mit michael@scheibles.info nicht anloggen
// Das könnte daran liegen, dass dies ein persönliches Microsoft Konto ist, kein Developer Konto?
//------------------------------------------------------------------------------------------------------------------------------
// Weitere Links zur Authorisierung von Apps mit JS bei Microsoft:
// https://stackoverflow.com/questions/25357750/how-to-use-one-drive-file-picker-in-browser
// https://stackoverflow.com/questions/56954799/ms-identity-azure-app-registered-but-sends-unauthorized-client-in-implicit-flow
// https://stackoverflow.com/questions/41029581/use-onedrive-file-picker-without-user-logging-in-every-time
// https://stackoverflow.com/questions/64316719/prevent-the-use-of-onedrive-personal-account-with-onedrive-api
// https://stackoverflow.com/questions/68484959/onedrive-filepicker-works-with-a-personal-account-but-not-with-business-account
// https://stackoverflow.com/questions/29973283/onedrive-filepicker-the-provided-value-for-the-input-parameter-redirect-uri-i
// Älteres Tutorial: https://hawramani.com/how-to-get-a-demo-of-the-onedrive-file-picker-javascript-sdk-to-work-on-a-local-development-server/
//------------------------------------------------------------------------------------------------------------------------------
// Daher Azure-Konto für MS@bimlive.de angelegt (Visa-Karte erforderlich!) auf https://azure.microsoft.com/de-de/free/
// Verwaltung per Login mit diesem Konto auf https://portal.azure.com/#home
// Obige Registrierung der App im Azure Portal mit diesem neuen Konto MS@bimlive.de wiederholt
// Es kommt aber derselbe Fehler!!! Daher weitere Variationen probiert:
// Unter "Web" > "Umleitungs-URLs" zusätzlich zu http://localhost:4200 hinzugefügt: http://localhost:4200/Verwaltung - wichtig, aber selber Fehler!
// HINWEIS: Beim erfolgreichen Versuch unten war hier http://localhost:4200/Verwaltung eingetragen!
// Unter "Erweiterte Einstellungen": "Öffentliche Clientflows zulassen" - erforderlich, aber selber Fehler!
// Die obigen beiden zusätzlichen "unterstützten Kontotypen" angekreuzt - erforderlich, aber selber Fehler!
// Nach mehrfachem Browser Refresh und Logout aus dem in einem anderen Tab angemeldeten MS-Konto mit MS@bimlive.de
// kommt beim Klicken auf den Button "Datei hochladen mit OneDrive File Picker" schließlich immerhin ein Microsoft-Konto-Anmeldefenster hoch, dessen
// URL ist: https://login.microsoftonline.com/common/oauth2/v2.0/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A4200%2FVerwaltung&client_id=35945efb-7233-4d2e-b98d-4f573f8e70ee&scope=profile%20openid%20https%3A%2F%2Fgraph.microsoft.com%2FUser.Read%20https%3A%2F%2Fgraph.microsoft.com%2FFiles.Read.All&response_mode=fragment&state=http%3A%2F%2Flocalhost%3A4200_2k9tm&nonce=pHv0o&response_type=id_token+token
// Allerdings kommt derselbe obige Fehler nach dem Klicken auf "Weiter"!
// Bei weiteren Login-Versuchen kommt "bimlive.de ist nicht in unserem System enthalten" trotz korrekter Eingabe von "michael.scheible@bimlive.de"
// Es wurde eine gelbe SPA-Warnungsbox im Azure Portal für "Web" angezeigt, mit Hinweis, dass man es automatisch umkonfigurieren kann - dies durchgeführt - selber Fehler!
// Warnungstext: "Für diese App sind implizite Zuweisungseinstellungen aktiviert. Wenn Sie einen dieser URIs in einer SPA mit MSAL.js 2.0 verwenden, müssen Sie URIs migrieren"
//------------------------------------------------------------------------------------------------------------------------------
// Anderes, neueres Tutorial mit MS Graph: https://github.com/microsoftgraph/msgraph-training-smartui-components/tree/main/Demos/01-pickers
// Verwendet diesen Zugang in das Azure Portal zur Konfiguration der App: https://aad.portal.azure.com/#@michaelscheiblebimlive.onmicrosoft.com/dashboard/private/591e9753-0d7e-4d78-b34f-48ea014ee026
// Dort Login mit MS@bimlive.de
// Dort die im Tutorial angegebenen Settings eingegeben, die weitgehend gleich sind wie im vorherigen Versuch
//**********************************************************************************************************************************************************************
// Der entscheidende Unterschied, der zum Erfolg führte, sind jedoch die unter Punkt 10.ff beschriebenen zusätzlich zu erteilenden beiden Microsoft-Graph-Berechtigungen Directory.Read.All und Group.Read.All!!!
//**********************************************************************************************************************************************************************
// HINWEIS: In diesem Tutorial ist eine spezielle App enthalten, die beim ersten Aufruf ebenso die erforderlichen spezielle Berechtigungen erteilt (Abschnitt "Provide administrative consent to application")
// wie beim ersten Versuch mit BIM.click (siehe unten)
// Beim ersten Versuch kommt noch die Fehlermeldung: "invalid_request: The provided value for the input parameter 'redirect_uri' is not valid. The expected value is a URI which matches a redirect URI registered for this client application."
// Dann unter "Web" die Redirect URL geändert auf http://localhost:4200/Verwaltung - damit verschwindet dieser Fehler!
// Später hier im Azure Portal noch https://bimclick.herokuapp.com/Verwaltung hinzugefügt - dann funktioniert der File Picker in verwaltung.vue auch auf Heroku!!!
// Später hier im Azure Portal noch http://localhost:4200/Bauinformationen und https://bimclick.herokuapp.com/Bauinformationen hinzugefügt - dann funktioniert der File Picker in bauinformationen.vue auch auf Heroku!!!
// ACHTUNG: Dies im Portal durchgeführt unter https://aad.portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/appId/9c8d0e97-1b63-43f0-87c0-ff598e4885c5
// Dann gelingt der Access mit MS@bimlive.de (dieses Microsoft-Konto war bei diesem ersten Versuch bereits angelogged in anderem Browser Window!)
// Es kommt dann in dem Child Window zunächst ein Consent Dialog hoch:
// BIM.click benötigt Zugriff auf
// - Lesen Ihres Profils
// - OneDrive-Dateien öffnen
// Beide Berechtigungen erteilt - danach kommt der sehr komfortable File Picker für OneDrive hoch und kann bedient werden!
// HINWEIS: Dies war ein Test mit action: "query" in den übergebenen Picker Options, bei nachfolgendem Test mit action: "share"
// kam Consent-Abfrage für "Vollzugriff auf alle Dateien, auf die Sie Zugrif haben" - erteilt
// Die action entscheidet darüber, was der Picker macht und returned!!!
// The action type being performed with the files selected.
// You can specify
// - "share" to generate a sharable URL
// - "download" to receive a short-lived URL that downloads the content of the files
// - "query" to return identifiers that can be used with the Microsoft Graph API or OneDrive API.
// Bisher testweise "share" und "query" getestet
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Browser-basierte Anmeldung mit Microsoft-Konto generell hier: https://account.microsoft.com/account?lang=de-de - dort MS@bimlive.de (oder MS@scheibles.info)
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
const oneDrive = require("../modules/onedrive-file-picker"); // ACHTUNG: Eslint-Fehler beim Compile! FIX: /* eslint-disable */ dort in erster Zeile des Files
const oneDriveApplicationId = "9c8d0e97-1b63-43f0-87c0-ff598e4885c5"; // Aus obiger Registrierung der App im Azure-Portal
//------------------------------------------------------------------------------------------------------------------------------
// Alternative mit auf NPM gefundenen Package von Microsoft, das sich aber als leer herausstellte:
// const oneDrive = require("@microsoft/onedrive-file-picker") // https://www.npmjs.com/package/@microsoft/onedrive-file-picker
// Erfordert bim-click-front-end> npm i @microsoft/onedrive-file-picker
// ACHTUNG: Funktioniert nicht, es kommt beim Start im Browser Log "This is a placeholder package"!!!
//------------------------------------------------------------------------------------------------------------------------------

export default {
  // NEU:
  components: {
    bauinformationsProfile: BauinformationsProfile // NEU: Diese Komponente war ursprünglich eine Page
    // und wurde per q-route-tab aus der Haupttableiste in my-layout.vue bzw. front-end-server-routes angesprochen.
    // Jetzt hierher verlagert, eine Tab-Ebene tiefer, um die Haupttableiste zu verschlanken.
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------
  name: "Bauinformationen", // Vue Component Name - ACHTUNG - dabei beachten:
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

  computed: {
    // ACHTUNG: Computed Properties sind zwar auch functions, dürfen aber im Template NICHT mit :property="function()",
    //          sondern MÜSSEN per :property="function" aufgerufen werden!!!
    //          Andernfalls kommt die irreführendé Vue-Fehlermeldung "..is not a function"!!!
    // ERKLÄRUNG: Computed Properties akzeptieren keine Argumente, deshalb funktioniert computed() NICHT!!!
    // Siehe https://forum.quasar-framework.org/topic/4596/how-to-trigger-an-event-when-button-in-q-uploader-is-clicked-how-to-dynamically-disable-enable-it/3
    //-----------------------------------------------------------------------------------------------------------------------------------------
    stringifyOneDrivePickerResponse: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Macht Pretty Printing für Debug-Ausgabe
      //----------------------------------------------------------------------------------------------------------------------------
      if (this.oneDrivePickerResponse != null) {
        return JSON.stringify(this.oneDrivePickerResponse, null, 2);
      } else {
        return null;
      }
    },
    isValidAutorenAusgewaehlteBauinformation: function() {
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Computed Property für external Validation per :error="!isValidAutorenAusgewaehlteBauinformation" am QSelect für zugeordnete Autoren:
      // Vorlage siehe: https://quasar.dev/vue-components/input#External-validation
      // Eine etwaige Error Message müsste wie in baueinheiten.vue abhängig von dieser computed Property per dediziertem neuen Error VSlot unter dem QSelect
      // displayed werden! Ist aber aktuell nicht notwendig, da die computed Property immer true zurückliefert
      // und nur zusätzlich zunächst vorab zwei Prüfungen macht, ob alle Autoren abgewählt wurden und ob der angemeldete Benutzer im Select Model abgewählt wurde
      // Dann gibt sie ggf. Warnungen aus, dass z.B. der angemeldete Benutzer nicht ohne Folgen abgewählt werden kann (dieser darf dann nach Speichern
      // nichts mehr ändern an der ausgewählten Bauinformation, auch keine Autoren mehr eintragen).
      // ACHTUNG: Die :error Property wird per Test unabhängig von den sonstigen :disable-Bedingugen am QSelect ausgeführt, selbst wenn das QSelect disabled ist!
      //          Deshalb muss vor obiger Validation GENAU die negierte Bedingung vom :disable abgefragt werden, sonst erscheint die
      //          Warnung fälschlich auch bei disabletem QSelect!
      // ACHTUNG: Fehler (fixed) Diese Funktion führte zu einer infinite Loop beim Rendern, wenn man den angemeldeten Benutzer als Autor abwählte
      //          Die Ursache war die fälschliche Verwendung einer weiteren computed Property benutzerIstAutorFuerAusgewaehlteBauinformation, die auf
      //          ausgewaehlteBauinformation.benutzerKennungenAutoren beruht, was zu der infinite Loop führte. Diese zunächst ersetzt durch
      //          explizite Abfrage von ausgewaehlteBauinformation.benutzerKennungenAutoren.length, dann verschwand die infinite Loop.
      //          Diese weitere computed Property hat leider noch andere obskure Probleme (siehe Kommentare dort)...später die ganze Abfrage geändert
      //          in die korrekte, negierte Bedingung an der :disable-Prop des QSelects.
      // console.log("In isValidAutorenAusgewaehlteBauinformation (computed)")
      // console.log("ausgewaehlteBauinformation.benutzerKennungenAutoren: ", this.ausgewaehlteBauinformation.benutzerKennungenAutoren);
      if (
        !(
          // Negierte Bedingung vom :disable am QSelect
          (
            this.benutzerRolleIstMitarbeiter &&
            !this.benutzerIstAutorFuerAusgewaehlteBauinformation
          )
        )
      ) {
        // Das QSelect ist dann also NICHT disabled und es muss in diesem Fall dann obige Prüfung erfolgen
        // Zunächst Prüfung, ob bei Benutzerrolle "Mitarbeiter" das Select Model leer ist - wenn ja, Warnung ausgeben
        if (this.benutzerRolleIstMitarbeiter) {
          if (
            this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation
              .length === 0
          ) {
            // Das Select Model ist leerer Array
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATION_ALLE_AUTOREN_ABGEWAEHLT_WARNUNG
            );
          } else {
            // Select Model ist nicht leer, prüfen ob angemeldeter Benutzer enthalten ist, sonst Warnung ausgeben
            if (
              !this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation.includes(
                this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
              )
            ) {
              // Benutzer ist Mitarbeiter, aber im Select Model ist der angemeldete Benutzer nicht enthalten!
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_ANGEMELDETER_BENUTZER_ALS_AUTOR_ABGEWAEHLT_WARNUNG
              );
            } // Angemeldeter Benutzer ist Autor, hier kein else
          } // /else
        } // Benutzer ist Admininistrator oder Redaktuer, hier kein else
      } // QSelect ist disabled, deshalb ist nichts zu tun, hier kein else
      //-------------------------------------------------------------------------------------------------------------------------------------
      // Es folgt hier KEINE weitere externe Validation, unabhängig von obigen Prüfungen
      // Man beachte dabei, dass die computed Property ja in jedem Fall einen Wert zurückliefern muss, deshalb return true
      return true;
    },

    //======================================================================================================================================
    // NEU: Computed-Funktionen, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    computeLabelButtonBauinformationAnzeigenOderBearbeiten: function() {
      if (this.benutzerRolleIstMitarbeiter) {
        return "Bauinformation anzeigen";
      } else {
        return "Bauinformation bearbeiten";
      }
    },

    computeLabelKontextMenueBauinformationAnzeigenOderBearbeiten: function() {
      if (this.benutzerRolleIstMitarbeiter) {
        return "Bauinformation auswählen und anzeigen";
      } else {
        return "Bauinformation auswählen und bearbeiten";
      }
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

    benutzerIstAutorFuerAusgewaehlteBauinformation: function() {
      //-----------------------------------------------------------------------------------------------------
      // ACHTUNG: Diese Funktion ist defensiv programmiert
      // ACHTUNG: Bei lokalen Tests kamen Fehlermeldungen gleich beim ersten Rendern von bauinformationen.vue:
      // "TypeError: Cannot read property 'length' of undefined
      // at VueComponent.benutzerIstAutorFuerAusgewaehlteBauinformation" - d.h. Zugriff auf
      // ausgewaehlteBauinformation, bei der diese oder das darin enthaltene Array-Feld benutzerKennungenAutoren
      // undefined ist aus unbekanntem Grund
      // Ursache ist definitiv KEIN Fehler in den teilweise per Compass erzeugten Bauinformationen!
      //-----------------------------------------------------------------------------------------------------
      console.log("In benutzerIstAutorFuerAusgewaehlteBauinformation()");
      /*
      console.log(
        "ausgewaehlteBauinformation: ",
        this.ausgewaehlteBauinformation
      );
      */
      // Die folgenden Abfragen betreffen die ausgewaehlteBauinformation
      // Diese wird oben anfangs mit {} als leeres Objekt initialisiert!!!
      // Vermutlich wird beim Mounten der Komponente aus dem Template durch Aufruf dieser Funktion
      // bereits darauf zugegriffen! Allerdings ist dann ausgewaehlteBauinformation weder undefind noch null,
      // noch kann mit === {} erfolgreich getestet werden, ob sie leer ist - erst die komplexe Abfrage auf empty Object unten
      // schließt diese Eventualität aus!
      // Allerdings lässt sich MIT dieser Abfrage und dem aktuellen Codestand unten der Fehler auch nicht mehr reproduzieren
      // TODO XXXXXX: Weitere Investigation dieses obskuren Problems
      if (
        this.ausgewaehlteBauinformation === undefined || // ACHTUNG: Diese 3 Abfragen catchen den Fehler NICHT!
        this.ausgewaehlteBauinformation == null || // ACHTUNG: Diese 3 Abfragen catchen den Fehler NICHT!
        this.ausgewaehlteBauinformation === {} || // ACHTUNG: Diese 3 Abfragen catchen den Fehler NICHT!
        (Object.keys(this.ausgewaehlteBauinformation).length === 0 &&
          this.ausgewaehlteBauinformation.constructor === Object)
        // ACHTUNG: Erst diese letzte Abfrage nach empty Object liefert den Fehler per Ausgabe der folgenden Log-Meldung!!!
        // VORLAGE: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
      ) {
        console.log(
          "ACHTUNG: Problem mit Zugriff auf leeres Feld ausgewaehlteBauinformation"
        );
        return false;
      } else {
        // Hier wurden sicherheitshalber alle weiteren Eventualitäten abgeprüft, ob das Array-Feld benutzerKennungenAutoren in
        // ausgewaehlteBauinformation existiert, nicht null ist
        // und kein leerer Array ist (length === 0). Bei Bauinformationen, die
        // nicht am UI oder API per createBauinformation() erzeugt wurden, sondern direkt in Compass in
        // der Datenbank, z.B. ohne Eintragung eines Autors in den Array, ist length === 0
        // Allerdings funktioniert includes auch erfolgreich mit empty Arrays/length === 0, so dass diese Abfragen eigentlich nicht
        // unbedingt notwendig sind, wie Tests auf https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        // zeigen (dort "Run>" auswählen")
        // Daher diesen Teil wieder disabled:
        let always = true;
        if (
          always
          /*
          this.ausgewaehlteBauinformation.hasOwnProperty(
            "benutzerKennungenAutoren"
          ) &&
          this.ausgewaehlteBauinformation.benutzerKennungenAutoren != null &&
          this.ausgewaehlteBauinformation.benutzerKennungenAutoren.length !== 0
          */
        ) {
          if (
            this.ausgewaehlteBauinformation.benutzerKennungenAutoren.includes(
              this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
            )
          ) {
            return true; // Der eigentliche Sinn dieser Funktion!
          } else {
            return false;
          }
        } else {
          // Das Array-Feld existiert nicht oder ist null oder hat Länge 0
          console.log(
            "ACHTUNG: Problem mit Zugriff auf Array-Feld benutzerKennungenAutoren"
          );
          console.log(
            "ausgewaehlteBauinformation.benutzerKennungenAutoren: ",
            this.ausgewaehlteBauinformation.benutzerKennungenAutoren
          );
          console.log(
            "ausgewaehlteBauinformation.benutzerKennungenAutoren.length: ",
            this.ausgewaehlteBauinformation.benutzerKennungenAutoren.length
          );
          return false;
        }
      }
    },

    benutzerIstAutorFuerAusgewaehlteBauinformationInTableBauinformationen: function() {
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return false;
      } else {
        if (
          this.selectedRowsTableBauinformationen[0].benutzerKennungenAutoren.includes(
            this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    // Computed Property zum Disablen der Buttons unter der QTable, wenn keine Bauinformation ausgewählt ist
    computeSelectedRowsTableBauinformationen: function() {
      return this.selectedRowsTableBauinformationen.length === 0; // return "true", falls nichts ausgewählt ist
    },

    computeExternerLinkTableBauinformationen: function() {
      //---------------------------------------------------------------------------------------------------------------------------------
      // Computed Property zum Disablen des Buttons für externen Link im Tab "Übersicht"
      //---------------------------------------------------------------------------------------------------------------------------------
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return true;
      }
      if (
        this.selectedRowsTableBauinformationen[0].externerLink === undefined ||
        this.selectedRowsTableBauinformationen[0].externerLink === null ||
        this.selectedRowsTableBauinformationen[0].externerLink === "" // NEU - gegen Fehler #382
      ) {
        return true;
      }
      return false;
    },

    computeOneDriveLinkTableBauinformationen: function() {
      //---------------------------------------------------------------------------------------------------------------------------------
      // Computed Property zum Disablen des Buttons für OneDrive-Link im Tab "Übersicht"
      //---------------------------------------------------------------------------------------------------------------------------------
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return true;
      }
      if (
        this.selectedRowsTableBauinformationen[0].oneDriveLink === undefined ||
        this.selectedRowsTableBauinformationen[0].oneDriveLink === null ||
        this.selectedRowsTableBauinformationen[0].oneDriveLink === "" // NEU - gegen Fehler #382
      ) {
        return true;
      }
      return false;
    },

    computeInternerLinkTableBauinformationen: function() {
      //---------------------------------------------------------------------------------------------------------------------------------
      // Computed Property zum Disablen des Buttons für internen Link im Tab "Übersicht"
      //---------------------------------------------------------------------------------------------------------------------------------
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return true;
      }
      if (
        this.selectedRowsTableBauinformationen[0].internerLink === undefined ||
        this.selectedRowsTableBauinformationen[0].internerLink === null ||
        this.selectedRowsTableBauinformationen[0].internerLink === "" // NEU - gegen Fehler #382
      ) {
        return true;
      }
      return false;
    },

    // Computed Property zum Disablen des Buttons für internen Link im Tab "Auswahl"
    computeInternerLinkAusgewaehlteBauinformation: function() {
      return (
        this.ausgewaehlteBauinformation.internerLink === undefined ||
        this.ausgewaehlteBauinformation.internerLink === null ||
        this.ausgewaehlteBauinformation.internerLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein interner Link definiert ist
    },

    // Computed Property zum Disablen des Buttons für internen Link im Tab "Neu"
    computeInternerLinkNeueBauinformation: function() {
      return (
        this.neueBauinformation.internerLink === undefined ||
        this.neueBauinformation.internerLink === null ||
        this.neueBauinformation.internerLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein interner Link definiert ist
    },

    // Computed Property zum Disablen des Buttons für externen Link im Tab "Auswahl"
    computeExternerLinkAusgewaehlteBauinformation: function() {
      return (
        this.ausgewaehlteBauinformation.externerLink === undefined ||
        this.ausgewaehlteBauinformation.externerLink === null ||
        this.ausgewaehlteBauinformation.externerLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein externer Link definiert ist
    },
    // Computed Property zum Disablen des Buttons für OneDrive-Link im Tab "Auswahl"
    computeOneDriveLinkAusgewaehlteBauinformation: function() {
      return (
        this.ausgewaehlteBauinformation.oneDriveLink === undefined ||
        this.ausgewaehlteBauinformation.oneDriveLink === null ||
        this.ausgewaehlteBauinformation.oneDriveLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein OneDrive-Link definiert ist
    },

    // Computed Property zum Disablen des Buttons für externen Link im Tab "Neu"
    computeExternerLinkNeueBauinformation: function() {
      return (
        this.neueBauinformation.externerLink === undefined ||
        this.neueBauinformation.externerLink === null ||
        this.neueBauinformation.externerLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein externer Link definiert ist
    },
    // Computed Property zum Disablen des Buttons für OneDrive-Link im Tab "Neu"
    computeOneDriveLinkNeueBauinformation: function() {
      return (
        this.neueBauinformation.oneDriveLink === undefined ||
        this.neueBauinformation.oneDriveLink === null ||
        this.neueBauinformation.oneDriveLink === "" // NEU - gegen Fehler #382
      ); // return "true", falls kein OneDrive-Link definiert ist
    },

    // Computed Property zur Berechnung des externen Links in der ausgewählten Bauinformation in der Tabelle im Tab "Übersicht"
    getSelectedExternerLinkTableBauinformationen: function() {
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return;
      }
      if (
        this.selectedRowsTableBauinformationen[0].externerLink === undefined
      ) {
        return;
      }
      return this.selectedRowsTableBauinformationen[0].externerLink; // URL-Feld im 1. Eintrag in den selektierten Rows
    },
    // Computed Property zur Berechnung des externen Links in der ausgewählten Bauinformation in der Tabelle im Tab "Übersicht"
    getSelectedOneDriveLinkTableBauinformationen: function() {
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return;
      }
      if (
        this.selectedRowsTableBauinformationen[0].oneDriveLink === undefined
      ) {
        return;
      }
      return this.selectedRowsTableBauinformationen[0].oneDriveLink; // URL-Feld im 1. Eintrag in den selektierten Rows
    },

    // Computed Property zur Berechnung des externen Links in der Bauinformation im Tab "Auswahl"
    getSelectedExternerLinkAusgewaehlteBauinformation: function() {
      if (
        this.ausgewaehlteBauinformation.externerLink === undefined ||
        this.ausgewaehlteBauinformation.externerLink === null ||
        this.ausgewaehlteBauinformation.externerLink === "" // NEU - gegen Fehler #382
      ) {
        return;
      }
      return this.ausgewaehlteBauinformation.externerLink;
    },

    // Computed Property zur Berechnung des OneDrive-Links in der Bauinformation im Tab "Auswahl"
    getSelectedOneDriveLinkAusgewaehlteBauinformation: function() {
      if (
        this.ausgewaehlteBauinformation.oneDriveLink === undefined ||
        this.ausgewaehlteBauinformation.oneDriveLink === null ||
        this.ausgewaehlteBauinformation.oneDriveLink === "" // NEU - gegen Fehler #382
      ) {
        return;
      }
      return this.ausgewaehlteBauinformation.oneDriveLink;
    },

    // Computed Property zur Berechnung des externen Links in der Bauinformation im Tab "Neu"
    getSelectedExternerLinkNeueBauinformation: function() {
      if (
        this.neueBauinformation.externerLink === undefined ||
        this.neueBauinformation.externerLink === null ||
        this.neueBauinformation.externerLink === "" // NEU - gegen Fehler #382
      ) {
        return;
      }
      return this.neueBauinformation.externerLink;
    },
    // Computed Property zur Berechnung des OneDrive-Links in der Bauinformation im Tab "Neu"
    getSelectedOneDriveLinkNeueBauinformation: function() {
      if (
        this.neueBauinformation.oneDriveLink === undefined ||
        this.neueBauinformation.oneDriveLink === null ||
        this.neueBauinformation.oneDriveLink === "" // NEU - gegen Fehler #382
      ) {
        return;
      }
      return this.neueBauinformation.oneDriveLink;
    },

    // Computed Property zur Berechnung des internen Links in der ausgewählten Bauinformation in der Tabelle im Tab "Übersicht"
    getSelectedInternerLinkTableBauinformationen: function() {
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return;
      }
      if (
        this.selectedRowsTableBauinformationen[0].internerLink === undefined ||
        this.selectedRowsTableBauinformationen[0].internerLink === null ||
        this.selectedRowsTableBauinformationen[0].internerLink === "" // NEU - gegen Fehler #382
      ) {
        return;
      }
      console.log(
        "In getSelectedInternerLinkTableBauinformationen - selectedRowsTableBauinformationen[0].internerLink: ",
        this.selectedRowsTableBauinformationen[0].internerLink
      );
      return (
        // TODO XXXXXX
        // Hier gemäß https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node testen:
        // a) href mit Link auf Heroku Route, die File aus dem tmp Directory per sendfile an den Browser schickt
        // b) href mit Link auf die File im tmp Directory auf Heroku und express.static für das tmp Directory

        // a) FUNKTIONIERT per Test!
        // "https://bimclickserver.herokuapp.com/sendfile" // ACHTUNG: https:// ist notwendig, sonst prefixed href es mit einer lokalen URL!!!

        // b) FUNKTIONERT per Test!
        // "https://bimclickserver.herokuapp.com/parkplatz.gif" // ACHTUNG: https:// ist notwendig, sonst prefixed href es mit einer lokalen URL!!!

        // Bisheriger Code für den lokalen Fall - temporär wieder enabled
        // SEHR ALT: "http://localhost:4200/" +
        // ALT: process.env.ownURL +
        // NEU:
        process.env.fileAPI +
        "/" +
        // ACHTUNG: Ohne Origin "http://" öffnet sich zwar das Browser-Tab mit der URL, aber das PDF wird erst bei Refresh geladen!!!
        this.selectedRowsTableBauinformationen[0].internerLink
      ); // URL-Feld im 1. Eintrag in den selektierten Rows
    },

    // Computed Property zur Berechnung des internen Links in der Bauinformation im Tab "Auswahl"
    getSelectedInternerLinkAusgewaehlteBauinformation: function() {
      if (this.ausgewaehlteBauinformation.internerLink === undefined) {
        return;
      }
      return (
        // SEHR ALT: "http://localhost:4200/" +
        // ALT: process.env.ownURL +
        // NEU:
        process.env.fileAPI +
        "/" +
        // ACHTUNG: Ohne Origin "http://" öffnet sich zwar das Browser-Tab mit der URL, aber das PDF wird erst bei Refresh geladen!!!
        this.ausgewaehlteBauinformation.internerLink
      );
    },

    // Computed Property zur Berechnung des internen Links in der Bauinformation im Tab "Neu"
    getSelectedInternerLinkNeueBauinformation: function() {
      if (this.neueBauinformation.internerLink === undefined) {
        return;
      }
      return (
        // SEHR ALT: "http://localhost:4200/" +
        // ALT: process.env.ownURL +
        // NEU:
        process.env.fileAPI +
        "/" +
        // ACHTUNG: Ohne Origin "http://" öffnet sich zwar das Browser-Tab mit der URL, aber das PDF wird erst bei Refresh geladen!!!
        this.neueBauinformation.internerLink
      );
    }
  }, // /computed:

  data() {
    return {
      oneDrivePickerResponse: null, // NEU - für File Upload/Download auf/von Microsoft OneDrive
      //----------------------------------------------------------------------------------------------------------------------------------------
      // Daten für q-uploader - werden aktuell nicht verwendet
      // files: [],
      // info: {},
      // debugMode: true, // Zeigt für Debugging ggf. diverse interne Objekte an am User Interface - NEU: Ersetzt durch local/globalStore.state.debugMode
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält z.B. localstore.state.debugMode für Debugging u.v.m.

      // Daten für q-tabs:
      tabBauinformationen: "uebersichtTabBauinformationen", // v-model für q-tabs. Wird bisher nur hier gesetzt, um das initiale Tab anzuwählen

      //*------------------------------------------------------------------------------------------------------------------//
      // Daten für q-table für Bauinformationen
      // NEU: Sichtbare Spalten werden per q-toggles gesteuert
      // btnClickCounter: 1, // Für gemeinsames Togglen aller Normkategorien - ALT, nicht mehr verwendet
      alwaysOn: true, // Für Checkbox in statischem Textfeld zur Erklärung der Button-Aktionen auf der QTable
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt

      //  splitterModel: 30, // Für q-splitter
      dataTableBauinformationen: [], // Array für die eigentlichen Bauinformationen (vom Backend)
      filterTableBauinformationen: null, // NEU: Für die Filterung
      // NEU: Pagination Objekt für Steuerung, muss im Template oben mit ".sync" Modifier verwendet werden: :pagination.sync="pagniationTableBauinformationen"
      paginationTableBauinformationen: {
        sortBy: "bauinformationsBezeichnung", // (initiale) Sortierungsspalte, erwartet einen Column Name aus der Column Definition der q-table
        descending: false, // Sortierungsreihenfolge
        page: 1, // Initial gezeigte Page
        rowsPerPage:
          globalStore.state.einstellungenBenutzer.tablesPaginationRowsPerPage // NEU - einstellbarer Wert
        // rowsPerPage: 35, // ALT
        // rowsNumber: xx if getting data from a server
      },
      // reloadTableBauinformationen: false, // Wird verwendet zusammen mit :loading, um die Tabelle neu zu laden, aktuell disabled

      selectedRowsTableBauinformationen: [], // Array, der die mit den Checkboxes in der ersten Spalte der q-table selektierten Rows enthält
      // HINWEIS: Dieser diente per selectedRowsTableBauinformationen[0] ursprünglich auch als v-model für die q-form im zweiten Tab.
      // Wenn dort Felder verändert wurden, änderten sich diese auch automatisch synchron in der q-table! (D.h. er ist v-model für q-table und q-form)
      // ACHTUNG: Dies führte allerdings zu Komplikationen beim Canceln - dann können Inkonsistenzen zwischen q-table und q-form zu
      // Problemen führen, z.B. konnte q-form im zweiten q-tab-panel nach eineme Cancel nicht mehr per q-input mit neuen Werten aktualisiert werden,
      // sondern erst nach einem "Zwischenstopp" (mit Re-Rendering) im ersten q-tab-panel mit der q-table
      // Daher sollten die Tabs jeweils alle dedizierte v-models haben.
      // Das v-model des zweiten Tabs muss ggf. über einen programmatisch zu verwaltenden selectedIndex (indexOf im Array mit _id)
      // mit der in der q-table ausgewählten Row "assoziiert" werden.

      visibleColumnsTableBauinformationen: [
        // Array, der die sichtbaren Columns in q-table über ein v-model steuert
        "bauinformationsBezeichnung",
        "bauinformationsTyp",
        "benutzerKennungenAutoren", // NEU
        "bauinformationsAnzeigeText", // NEU
        "bauinformationsBemerkung",
        "herausgeberGeografie",
        "herausgeberInstitution",
        "herausgeberBezeichnung",
        "herausgeberBundeslandDeutschland",
        "herausgeberBundeslandÖsterreich",
        "herausgeberKantonSchweiz",
        "gültigkeitsDatumVon",
        "gültigkeitsDatumBis",
        "normTypDIN",
        "normTypÖNORM",
        "normTypSN",
        "normTypEN",
        "normTypISO",
        "externerLink",
        "oneDriveLink",
        "internerLink"
        /*
        "grundNorm",
        "terminologieNorm"
        "prüfNorm",
        "produktNorm",
        "verfahrensNorm",
        "dienstleistungsNorm",
        "schnittstellenNorm",
        "deklarationsNorm",
        "fachbereichsNorm",
        "werkNorm"
        */
      ],

      //--------------------------------------------------------------------------------------------------------------------
      // Boolean-Variablen für die beiden "besonderen" Toggles rechts oben:
      toggleAllNormkategorienState: false, // Für gemeinsames Togglen aller Normkategorien, anfangs keine Normkategorien, d.h. false
      toggleAllColumnsState: true, // Für gemeinsames Togglen aller Spalten, anfangs alle außer Normkategorien, d.h. true

      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Variablen für Toggling der Sichtbarkeit von MEHREREN gemeinsamen Spalten in der QTable für die Bauinformationen
      // HINWEIS: Die 5 Toggles für das Toggling der EINZELNEN Spalten Autoren, Typ, Bemerkung, Geografie, Institution
      //          funktionieren anders, nämlich direkt auf dem Array visibleColumnsTableBauinformationen als v-model plus val Prop!!!
      // Siehe https://quasar.dev/vue-components/toggle#Array-model und https://quasar.dev/vue-components/toggle#QToggle-API
      regionenAnzeigen: true,
      regionenArray: [
        "herausgeberBundeslandDeutschland",
        "herausgeberBundeslandÖsterreich",
        "herausgeberKantonSchweiz"
      ],

      gueltigkeitAnzeigen: true,
      gueltigkeitArray: ["gültigkeitsDatumVon", "gültigkeitsDatumBis"],

      normTypenAnzeigen: true,
      normTypenArray: [
        "normTypDIN",
        "normTypÖNORM",
        "normTypSN",
        "normTypEN",
        "normTypISO"
      ],

      linksAnzeigen: true,
      linksArray: ["internerLink", "externerLink", "oneDriveLink"],

      /*------------------------------------------------------------------------------------------------------------------//
      Helper function for Boolean val to display checkmarks instead of "true" or "false"
      Wird aktuell nicht mehr benutzt, stattdessen werden Quasar QCheckboxes benutzt.
      Diese triggern allerdings eine etwas größere Zeilenhöhe (unschön) - daher doch wieder displayCheckmark verwendet

      ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können hier in data () deklariert werden!
      Sonst müssen sie nach methods: verschoben werden!
      //------------------------------------------------------------------------------------------------------------------*/
      displayCheckMark: function(val) {
        if (val) {
          // return "\u2611";  // Unicode ballot box with check
          return "\u2705"; // Unicode white heavy check mark
        } else {
          return "\u2610"; // Unicode ballot box unchecked
          // return "\u2612"; // Unicode ballot box with cross
          // return "\u274C"; // Unicode cross mark
        }
      },

      /*------------------------------------------------------------------------------------------------------------------//
      Helper function for Date Formatting

      ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können hier in data () deklariert werden!
      Sonst müssen sie nach methods: verschoben werden!
      //------------------------------------------------------------------------------------------------------------------*/
      formatDate: function(val) {
        //--------------------------------------------------------------------------------------------------------------------
        // Helper function for Date Formatting
        // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
        // Sonst müssen sie nach methods: verschoben werden!
        // Die Mongoose Dates werden in Quasar z.B. so dargestellt: 2020-12-04T00:00:00.000Z
        // Siehe https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Die bessere Lösung scheint die JS Library Momentjs zu sein (var moment : require('moment'), läuft in Node und Browser)
        // Mongoose kann anscheinend nur Dates mit Time: https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
        // Auch hier wird Momentjs empfohlen: https://stackoverflow.com/questions/53932266/how-to-convert-date-format-in-nodejs-using-mongoose
        // Einstweilen ist das Einzige, was funktioniert, die ersten 10 Stellen im Mongoose Date abzuschneiden, was diese Funktion macht:
        //--------------------------------------------------------------------------------------------------------------------
        if (typeof val === "undefined" || val === null || val === "") {
          return;
        }
        // Ursprüngliche Variante mit eigener simpler Formatierung per Substring aus obigem Mongoose Format:
        // var yyyymmdd = val.substring(0, 10);
        // return yyyymmdd;

        // Stattdessen Quasar Date Utils (per obigem import { date } from 'quasar') benutzen:
        return date.formatDate(val, "DD.MM.YYYY"); // Wandelt das Datum in deutsches Format um
      },

      //------------------------------------------------------------------------------------------------------------------*/
      columnsTableBauinformationen: [
        // Spaltendefinitionen für q-table
        {
          name: "bauinformationsBezeichnung",
          required: true,
          label: "Bezeichnung der Bauinformation",
          align: "left",
          field: row => row.bauinformationsBezeichnung,
          format: val => `${val}`,
          /*------------------------------------------------------------------------------------------------------------------//
          Aus der QTable Doc:
          (optional) you can format the data with a function: format: (val, row) => `${val}%`
          Anderes Beispiel: format: val => date.formatDate(val, ‘DD-MM-YYYY’)
          Es können auch Funktionen (mit .this !!!) aufgerufen werden:
          format: (val) => this.displayCheckMark(val) mit val: Boolean
          //------------------------------------------------------------------------------------------------------------------*/
          sortable: true
          /* Auch hier können Funktionen verwendet werden:
          sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
          */
        },
        {
          name: "bauinformationsAnzeigeText", // NEU
          align: "left",
          label: "Anzeigetext für die Bauinformation",
          field: "bauinformationsAnzeigeText",
          sortable: true
        },
        {
          name: "benutzerKennungenAutoren", // NEU
          align: "left",
          label: "Autoren",
          field: "benutzerKennungenAutoren",
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell viele Benutzerkennungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "bauinformationsTyp",
          align: "left",
          label: "Typ",
          field: "bauinformationsTyp",
          sortable: true
        },
        {
          name: "bauinformationsBemerkung",
          align: "left",
          label: "Bemerkung zur Bauinformation",
          field: "bauinformationsBemerkung",
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bemerkungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "herausgeberGeografie",
          align: "left",
          label: "Geografie",
          field: "herausgeberGeografie",
          sortable: true
        },
        {
          name: "herausgeberInstitution",
          align: "left",
          label: "Institution",
          field: "herausgeberInstitution",
          sortable: true
        },
        {
          name: "herausgeberBezeichnung",
          align: "left",
          label: "Herausgeber",
          field: "herausgeberBezeichnung",
          sortable: true
        },
        {
          name: "herausgeberBundeslandDeutschland",
          align: "left",
          label: "Bundesland (D)",
          field: "herausgeberBundeslandDeutschland",
          sortable: true
        },
        {
          name: "herausgeberBundeslandÖsterreich",
          align: "center",
          label: "Bundesland (AU)",
          field: "herausgeberBundeslandÖsterreich",
          sortable: true
        },
        {
          name: "herausgeberKantonSchweiz",
          align: "left",
          label: "Kanton (CH)",
          field: "herausgeberKantonSchweiz",
          sortable: true
        },
        {
          name: "gültigkeitsDatumVon",
          align: "left",
          label: "Gültig von",
          field: "gültigkeitsDatumVon",
          format: val => this.formatDate(val),
          sortable: true
        },
        {
          name: "gültigkeitsDatumBis",
          align: "left",
          label: "Gültig bis",
          field: "gültigkeitsDatumBis",
          format: val => this.formatDate(val),
          sortable: true
        },
        {
          name: "normTypDIN",
          align: "left",
          label: "Normtyp (DIN)",
          field: "normTypDIN",
          sortable: true
        },
        {
          name: "normTypÖNORM",
          align: "center",
          label: "Normtyp (ÖNORM)",
          field: "normTypÖNORM",
          sortable: true
        },
        {
          name: "normTypSN",
          align: "center",
          label: "Normtyp (SN)",
          field: "normTypSN",
          sortable: true
        },
        {
          name: "normTypEN",
          align: "left",
          label: "Normtyp (EN)",
          field: "normTypEN",
          sortable: true
        },
        {
          name: "normTypISO",
          align: "left",
          label: "Normtyp (ISO)",
          field: "normTypISO",
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Links hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "externerLink",
          align: "left",
          label: "Externer Link",
          field: "externerLink",
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Links hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "oneDriveLink",
          align: "left",
          label: "OneDrive-Link",
          field: "oneDriveLink",
          sortable: true,
          // format: (val, row) => `${val}%`, // Hilft nicht, die Länge zu truncaten!
          // style: "width: 1200" // Hat auch keine Auswirkung!
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Links hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        },
        {
          name: "internerLink",
          align: "left",
          label: "Interner BIM.click-Link",
          field: "internerLink",
          sortable: true
        },
        {
          name: "grundNorm",
          align: "center",
          label: "Grundnorm",
          field: "grundNorm",
          // format: val => this.displayCheckMark(val), // Alternative Lösung mit Unicode Checkmarks statt q-checkboxes
          sortable: true
        },
        {
          name: "terminologieNorm",
          align: "center",
          label: "Terminologienorm",
          field: "terminologieNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "prüfNorm",
          align: "center",
          label: "Prüfnorm",
          field: "prüfNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "produktNorm",
          align: "center",
          label: "Produktnorm",
          field: "produktNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "verfahrensNorm",
          align: "center",
          label: "Verfahrensnorm",
          field: "verfahrensNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "dienstleistungsNorm",
          align: "center",
          label: "Dienstleistungsnorm",
          field: "dienstleistungsNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "schnittstellenNorm",
          align: "center",
          label: "Schnittstellennorm",
          field: "schnittstellenNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "deklarationsNorm",
          align: "center",
          label: "Deklarationsnorm",
          field: "deklarationsNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "fachbereichsNorm",
          align: "center",
          label: "Fachbereichsnorm",
          field: "fachbereichsNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        },
        {
          name: "werkNorm",
          align: "center",
          label: "Werknorm",
          field: "werkNorm",
          // format: val => this.displayCheckMark(val),
          sortable: true
        }
      ],

      //-----------------------------------------------------------------------------------------------------------------------
      // TODO - für spätere Selektion von Zeilen in der QTable
      //-----------------------------------------------------------------------------------------------------------------------

      selectedRowKeyTableBauinformationen: null, // NEU: Hält _id einer ausgewählten Zeile, muss bei QTable erst z.B. mit computed-Funktion
      // aus selectedRowsTableBauinformationen extrahiert werden (:selected.sync="selectedRowsTableBauinformationen")
      // selectedRowsTableBauinformationen ist allerdings bei multipler Selection ein Array mit evtl. mehreren Bauinformationen
      // Die Daten der selektierten Rows der q-table liegen im oben schon definierten Array selectedRowsTableBauinformationen

      //---------------------------------------------------------------------------------------------------------------------------------
      // Es folgen die data() Deklarationen für die QForms in den hinteren QTab-Panels
      //---------------------------------------------------------------------------------------------------------------------------------

      // v-models für q-dialogs für Bestätigung Löschen
      confirmLoeschenBauinformationenAusQTable: false, // v-model für ersten q-dialog beim Löschen
      confirmLoeschenAusgewaehlteBauinformationAusQForm: false, // v-model für zweiten q-dialog beim Löschen (ausgewählte Bauinformation )
      confirmLoeschenNeueBauinformationAusQForm: false, // v-model für dritten q-dialog beim Löschen (neue Bauinformation anlegen)

      // v-model für q-dialog für Anwahl des Tabs "Auswahl" oder des Buttons "Bauinformation anzeigen" oder der Buttons für Link-Anzeige ohne selektierte Bauinformation im Tab Übersicht
      confirmHinweisAuswaehlenBauinformationAusQTable: false, // v-model für q-dialog bei Anwahl Tab "Auswahl" oder mit Buttons ohne selektierte Bauinformation im Tab Übersicht
      // v-model für q-dialog für Anwahl der Buttons "Internen Link öffnen" bzw. "Externen Link öffnen" mit selektierter Bauinformation ohne internen bzw. externen Link
      confirmHinweisAuswaehlenBauinformationAusQTableMitInternemLink: false, // v-model für q-dialog bei Anwahl Button "Internen Link öffnen" ohne Auswahl selektierte Bauinformation mit internem Link
      confirmHinweisAuswaehlenBauinformationAusQTableMitExternemLink: false, // v-model für q-dialog bei Anwahl Button "Externen Link öffnen" ohne Auswahl selektierte Bauinformation mit externem Link
      confirmHinweisAuswaehlenBauinformationAusQTableMitOneDriveLink: false, // v-model für q-dialog bei Anwahl Button "OneDrive-Link öffnen" ohne Auswahl selektierte Bauinformation mit OneDrive-Link

      // v-models für q-dialog für Bestätigung File Upload für internen Link
      confirmUploadInternerLinkBauinformationenAusQTable: false, // v-model für ersten q-dialog beim uploaderUebersichtBauinformationen im Tab "Übersicht"
      confirmUploadInternerLinkAusgewaehlteBauinformation: false, // v-model für ersten q-dialog beim uploaderAuswahlBauinformationen im Tab "Auswahl"
      confirmUploadInternerLinkNeueBauinformation: false, // v-model für ersten q-dialog beim uploaderNeuBauinformationen im Tab "Neu"

      // v-models für q-dialog für Bestätigung File Upload für internen Link
      confirmUploadOneDriveLinkBauinformationenAusQTable: false, // v-model für ersten q-dialog beim OneDrive File Picker im Tab "Übersicht"
      confirmUploadOneDriveLinkAusgewaehlteBauinformation: false, // v-model für ersten q-dialog beim OneDrive File Picker für ausgewählte Bauinformation im Tab "Auswahl"
      confirmUploadOneDriveLinkNeueBauinformation: false, // v-model für ersten q-dialog beim OneDrive File Picker für neue Bauinformation im Tab "Neu"

      // Auskommentiert, da aktuell nicht mehr benötigt:
      // Component Keys, um Re-Render der Vue Komponenten für die q-tab-panels zu forcen
      // Wurde in früherer Variante benötigt, wenn "Cancel" Button gedrückt wird in tab tabBauinformationAuswwahl und tabBauinformationNeu
      // Wird mit :key gebunden an alle q-tab-panel Komponenten
      // Siehe https://michaelnthiessen.com/force-re-render/
      // Hinweis: Versuchweise eingeführter gemeinsamer :key auf allen 3 Tabs führte nur zum Re-render des aktuell offenen Tabs
      /*
      keyUebersichtTabBauinformationen: 0, // Muss Number sein, die hochgezählt wird, nicht Boolean, da sie sich ändern muss
      keyAuswahlTabBauinformationen: 0,
      keyNeuTabBauinformationen: 0,
      */

      // Neue dedizierte v-models für die beiden q-tab-panels mit q-forms:
      // Zweites q-tab-panel mit q-form für ausgewählte Bauinformation:
      ausgewaehlteBauinformation: {},
      // Objekt, um in q-table ausgewählte Bauinformation anzuzeigen, v-model für q-form im Tab "auswahlTabBauinformationen"
      // ACHTUNG: {} ist nicht dasselbe wie undefined, nur bei undefined wird per v-if das Tab ausgeblendet!!!

      // NEU: Variable zum Merken der bisherigen Bauinformationsbezeichnung:
      oldValueBauinformationsBezeichnungAusgewaehlteBauinformation: null,

      // Drittes q-tab-panel mit q-form für neue Bauinformation:
      neueBauinformation: {}, // Objekt, um neue Bauinformation anzulegen, v-model für q-form im Tab "neuTabBauinformationen"
      // ACHTUNG: {} ist nicht dasselbe wie undefined, nur bei undefined wird per v-if das Tab ausgeblendet!!!

      leereBauinformation: {
        // ACHTUNG: Vue kann nicht ohne Weiteres Konstanten in data() deklarieren! Müssten in externe Files ausgelagert oder lokal mit const deklariert werden
        // Siehe https://github.com/vuejs/vue/issues/6004

        // Objekt, mit dem neue Bauinformation initialisiert und resetted wird
        // ACHTUNG: Diese Werte müssen die Mongoose Validation bestehen bei Save in die Datenbank!
        // Zu beachtende Regeln für Mongoose Validation: required-Felder müssen vorhanden und gesetzt sein
        // null heisst ein Feld ist vorhanden, aber nicht gesetzt
        // enum-Felder dürfen nur null sein, wenn in enum-Definition null dabei ist!
        // Mongoose Validation Fehler kommen als Error 500 vom Mongoose Call (z.B. save()) zurück
        // Return Parameter error.message enthält dabei die Error Message, ggf. im Controller loggen!
        bauinformationsBezeichnung: "", // ACHTUNG: War "Bezeichnung hier eingeben", was ohne Änderung durch den Benutezr als Bezeichnung abgespeichert wurde!!!
        benutzerKennungenAutoren: [], // NEU!
        bauinformationsTyp: "Sonstige Bauinformation",
        bauinformationsAnzeigeText: null, // NEU
        bauinformationsBemerkung: null,
        herausgeberGeografie: "Sonstige Geografie",
        herausgeberInstitution: "Sonstige Institution",
        herausgeberBezeichnung: null,
        herausgeberBundeslandDeutschland: null,
        herausgeberBundeslandÖsterreich: null,
        herausgeberKantonSchweiz: null,
        gültigkeitsDatumVon: "2019-01-01",
        gültigkeitsDatumBis: "2022-12-31",
        normTypDIN: null,
        normTypÖNORM: null,
        normTypSN: null,
        normTypEN: null,
        normTypISO: null,
        // ACHTUNG: Wenn internerLink und externerLink auf null statt undefined gesetzt werden,
        // werten das die Funktionen auf den Buttons zum Öffnen der Links und deren Compute-Funktionen für :disable als definierten Wert!!!
        internerLink: undefined,
        externerLink: undefined,
        oneDriveLink: undefined,
        grundNorm: false,
        terminologieNorm: false,
        prüfNorm: false,
        produktNorm: false,
        verfahrensNorm: false,
        dienstleistungsNorm: false,
        schnittstellenNorm: false,
        deklarationsNorm: false,
        fachbereichsNorm: false,
        werkNorm: false
      },

      //--------------------------------------------------------------------------------------------------------------------------------
      // NEU: Daten für q-select zur Auswahl von Autoren in q-form für ausgewählte Bauinformation (Tab "Details zur ausgewählten Bauinformationen")
      //--------------------------------------------------------------------------------------------------------------------------------
      selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: [], // Array, um ALLE Benutzerkennungen aufzunehmen als Options im QSelect
      // HINWEIS: Der Array enthält nicht direkt die Benutzerkennungen, sondern ganze Benutzer als Objekte
      // Im QSelect werden per option-value="benutzerKennung" die Felder für die Benutzerkennung daraus extrahiert als Werte für die Options
      // ACHTUNG: In den VSlots für die Options muss ebenfalls scope.opt.benutzerKennung angegeben werden, sonst werden diese falsch angezeigt!
      // ACHTUNG: Zusätzlich ist emit-value="benutzerKennung" notwendig, damit das Feld "benutzerkennung" in die Selection übertragen wird
      // selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation wird aus der Datenbank geladen werden mit den entsprechenden Daten für ALLE Benutzerkennungen
      // Wird im Template nicht direkt referenziert, sondern dient zur Initialisierung von selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation

      selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation: [], // Model, enthält die aktuell im QSelect selektierten Objekte in einem Array
      // ACHTUNG: Muss ein Array sein bei Selection multiple bzw. :multiple=true!!!
      // Wird im Template referenziert per v-model="selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation" -->
      // Disabled, Template verwendet als v-model direkt ausgewaehlteBauinformation.benutzerKennungenAutoren

      selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: [], // Gefilterte Options, enthält die aktuell im QSelect Dropdown zur Auswahl
      // stehenden gefilterten Objekte in einem Array - mit Filterung gemäß https://quasar.dev/vue-components/select#Example--Filtering-and-adding-to-menu
      // Wird im Template referenziert per :options="selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation"
      // Wird anfangs initialisiert mit Werten aus selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation

      showHintSelectBenutzerKennungenAutorenAusgewaehlteBauinformation: false, // Hint am q-select nur anzeigen, wenn das q-select Fokus hat -->

      /*------------------------------------------------------------------------------------------------------------------//
      Select Options für Dropdown Menüs in q-selects in q-forms
      ACHTUNG: Diese müssen übereinstimmmen mit den korrespondierenden Enum-Definitionen in bauinformationen.model.js!!!
      //------------------------------------------------------------------------------------------------------------------*/
      selectOptionsBauinformationsTyp: [
        // Rubrik Normen
        "Norm",

        // Rubrik Vorschriften
        "Gesetz", // Bund, Länder/Kantone
        "Verordnung", // EU, Bund, Länder/Kantone
        "Verwaltungsvorschrift (VWV)", // z.B. Land Baden-Württemberg:
        // VwV TB, https://www.baden-wuerttemberg.de/fileadmin/redaktion/m-um/intern/Dateien/Dokumente/3_Umwelt/Baurechts-_und_Bergbehörde/171220_VwV_Technische_Baubestimmungen.pdf
        "Richtlinie (EU)", // "Richtlinie" wird aber auch von DAfStb verwendet - siehe unten
        // EU: Siehe https://europa.eu/european-union/eu-law/legal-acts_de
        // EU-Verordnungen sind rechtsverbindlich, EU-Richtlinien müssen als Rechtsvorschriften in den Ländern umgesetzt werden
        "Urteil", // NEU
        "Satzung", // NEU

        // Rubrik Richtlinien
        "Richtlinie (DAfStb) ", // DAfStB - nicht zu verwechseln mit EU-Richtlinie=Vorschrift
        "Sonstige Richtlinie", // Catcher
        "Merkblatt", // ZDB - siehe https://www.zdb.de/zdb-cms.nsf/id/publikationen-de, kostenpflichtig, aber auch andere
        "Leitfaden", // ZDB - siehe https://www.zdb.de/zdb-cms.nsf/id/publikationen-de, kostenpflichtig
        "Bauregelliste (BRL)", // DIBt - siehe https://www.dibt.de/de/wir-bieten/technische-baubestimmungen/
        "Technische Baubestimmung (TB)", // DIBt
        "Leitlinie", // NEU
        "Empfehlung", // NEU

        // Rubrik Zulassungen/Genehmigungen
        // DIBt - siehe https://www.dibt.de/de/wir-bieten/zulassungen-etas-und-mehr/
        // DIBt gibt kostenpflichtige Nachweise für Bauprodukte und Bauarten heraus:
        "Allgemeine bauaufsichtliche Zulassung (abZ/BAZ)", // DIBt, Verweis z.B. aus Baustoffen
        "Allgemeine Bauaartgenehmigung (aBG)", // DIBt, Verweis z.B. aus Baustoffen
        // allgemeine bauaufsichtliche Zulassungen (abZ, alt) und allgemeine Bauartgenehmigungen (aBGs, neu)
        // Siehe https://www.dibt.de/de/service/zulassungsshop/zulassungs-und-genehmigungsverzeichnisse/
        "Europäische technische Bewertung (ETA/ETAG)", // DIBt, ETA, ETAG ist Vorgänger. Verweis z.B. aus Baustoffen
        // DIBt gibt kostenpflichtige europäische Bewertungen (ETAs) heraus
        // Siehe https://www.dibt.de/de/service/zulassungsshop/eta-verzeichnisse/

        // Rubrik Nachweise
        "Leistungserklärung (LE/DoP)", // Nach EU-BauPVO, siehe https://www.baustoffindustrie.de/fileadmin/user_upload/bbs/Dateien/Downloadarchiv/Technik/bauprodukteverordnung.pdf
        "CE-Konformitätserklärung", // Üblicherweise Teil der Leistungserklärung, Verweis z.B. aus Baustoffen
        "Energieausweis", // Nach EnEV, siehe https://de.wikipedia.org/wiki/Energieeinsparverordnung, Verweis z.B. aus Bauvorhaben
        "Schallschutzausweis", // DEGA, siehe http://www.dega-schallschutzausweis.de/index.php/ssa, Verweis z.B. aus Bauvorhaben
        "Nachhaltigkeitszertifikat", // DGNB, siehe https://www.dgnb-system.de/de/zertifizierung/weg-zum-zertifikat/, Verweis z.B. aus Bauvorhaben
        "Umwelt-Produktdeklaration/Environmental Product Declaration (EPD)", // NEU - #383
        "Beständigkeitsliste", // Siehe z.B. https://ravatherm.com/de/wp-content/uploads/sites/5/2019/05/bestndigkeitsliste-2019.pdf
        "Sonstiger Nachweis", // Catcher

        // Rubrik Datenblätter
        "Datenblatt", // Enthält oft Informationen aus der Leistungserklärung und CE-Konformitätserklärung, plus andere Informationen
        "Technisches Datenblatt", // NEU - #383
        "Sicherheitsdatenblatt",

        // Rubrik Sonstiges
        "Fachliteratur", // NEU - Umfasst Bücher und Artikel
        "Produktinformation",
        "Preisliste",
        "Artikelstammdaten",
        "Beispielvorlage",
        "Begriffserklärung",
        "Algorithmus",
        "Webseite",
        "Wiki", // NEU
        "Plan", // NEU
        "Karte", // NEU
        "Grafik", // NEU
        "Bild", // NEU
        "Werkzeug (Tool)", // NEU
        "Sonstige Bauinformation" // Catcher for all the rest...
      ],
      selectOptionsHerausgeberGeografie: [
        "Welt",
        "Europa",
        "Deutschland",
        "Österreich",
        "Schweiz",
        "Sonstige Geografie"
      ],
      selectOptionsHerausgeberInstitution: [
        // Siehe https://www.din.de/de/ueber-normen-und-standards/din-norm/ergebnisse
        // Siehe https://de.wikipedia.org/wiki/DIN-Norm
        "DIN", // Deutsches Institut für Normung, https://www.din.de/de
        "ASI", // Austrian Standards International, Österreichisches Normungsinstitut, https://www.austrian-standards.at/home/
        "SNV", // Schweizer Normen-Vereinigung, https://www.snv.ch/de/startseite.html
        "CEN", // European Committee for Standardisation, https://www.cen.eu/Pages/default.aspx
        "ISO", // International Standards Organization, https://www.iso.org/home.html
        "DIBt", // Deutsches Institut für Bautechnik, https://www.dibt.de/, siehe oben
        "DAfStb", // Deutscher Ausschuss für Stahlbeton, gibt Richtlinien heraus, http://www.dafstb.de/richtlinien.html
        "ZDB", // Zentralverband Deutsches Baugewerbe, gibt Merkblätter und Leitfäden heraus, https://www.zdb.de/zdb-cms.nsf/id/home-de
        "DEGA", // Deutsche Gesellschaft für Akustik, https://www.dega-akustik.de/, verantwortet Schallschutznachweise
        "DGNB", // Deutsche Gesellschaft für Nachhaltiges Bauen, https://www.dgnb.de/de/, verantwortet Zertifizierungen
        "BfS", // Bundesamt für Strahlenschutz, http://www.bfs.de/DE/home/home_node.html, z.B. Radonkarten, http://www.bfs.de/DE/themen/ion/umwelt/radon/karten/boden.html
        "AKBW", // Architenkammer Baden-Württemberg, https://www.akbw.de/
        "BAK", // Bundesarchitektenkammer, https://www.bak.de/
        "INGBW", // Ingenieurkammer Baden-Württemberg, https://www.ingkbw.de/
        "SIA", // Schweizerischer Ingenieur- und Architektenverein, http://www.sia.ch/de/
        "ZT", // Bundeskammer der ZiviltechnikerInnen, https://www.arching.at/home.html
        "Bund",
        "Bundesland",
        "Kanton",
        "Hersteller", // Catcher
        "Sonstige Institution" // Catcher for all the rest...
      ],
      selectOptionsHerausgeberBundeslandDeutschland: [
        "Baden-Württemberg",
        "Bayern",
        "Berlin",
        "Brandenburg",
        "Bremen",
        "Hamburg",
        "Hessen",
        "Mecklenburg-Vorpommern",
        "Niedersachsen",
        "Nordrhein-Westfalen",
        "Rheinland-Pfalz",
        "Saarland",
        "Sachsen",
        "Sachsen-Anhalt",
        "Schleswig-Holstein",
        "Thüringen"
      ],
      selectOptionsHerausgeberBundeslandÖsterreich: [
        "Burgenland",
        "Kärnten",
        "Niederösterreich",
        "Oberösterreich",
        "Salzburg",
        "Steiermark",
        "Tirol",
        "Vorarlberg",
        "Wien"
      ],
      selectOptionsHerausgeberKantonSchweiz: [
        "Zürich",
        "Bern",
        "Luzern",
        "Uri",
        "Schwyz",
        "Obwalden",
        "Nidwalden",
        "Glarus",
        "Zug",
        "Freiburg",
        "Solothurn",
        "Basel-Stadt",
        "Basel-Landschaft",
        "Schaffhausen",
        "Appenzell Ausserrhoden",
        "Appenzell Innerrhoden",
        "St. Gallen",
        "Graubünden",
        "Aargau",
        "Thurgau",
        "Tessin",
        "Waadt",
        "Wallis",
        "Neuenburg",
        "Genf",
        "Jura"
      ],
      selectOptionsNormTypDIN: [
        "DIN",
        "DIN ENTWURF", // Auch "DIN E", https://baulexikon.beuth.de/NORM-ENTWURF.HTM
        "DIN SPEC", // https://www.din.de/de/forschung-und-innovation/din-spec
        // Siehe auch https://www.din.de/de/forschung-und-innovation/din-spec/wie-eine-din-spec-entsteht-63574
        "DIN V", // Deutsche Vornorm
        "DIN V ENV", // Deutsche und europäische Vornorm
        "DIN EN", // Deutsche und europäische Norm
        "DIN EN ISO", // Deutsche, europäische und ISO-Norm
        "DIN ISO",
        "DIN IEC",
        "DIN ISO/IEC",
        "DIN CEN/TS",
        "DIN CLC/TS",
        "DIN ISO/TS",
        "DIN CWA",
        "DIN VDE",
        "DIN Sonstiges" // Catcher
      ],
      selectOptionsNormTypÖNORM: [
        // Hinweis: Die österreichischen Normen wurden hier nicht systematisch erfasst
        "ÖNORM", // Österreichische Norm, https://de.wikipedia.org/wiki/%C3%96NORM
        "ÖNORM A", // Österreichische allgemeine Norm
        "ÖNORM B", // Österreichische Baunorm
        "ÖNORM Sonstiges" // Catcher
      ],
      selectOptionsNormTypSN: [
        // Hinweis: Die schweizerischen Normen wurden hier nicht systematisch erfasst
        "SN", // Schweizer Norm der Schweizerischen Normenvereinigung SNV, https://www.snv.ch/de/startseite.html
        "SN ENV", // Schweizerische und europäische Vornorm, z.B. https://www.beuth.de/de/vornorm/sn-env-13005/37725154
        "SIA", // Schweizerischer Ingenieur- und Architektenverein, http://www.sia.ch/de/dienstleistungen/sia-norm/
        "SN Sonstiges" // Catcher
      ],
      selectOptionsNormTypEN: [
        // Hinweis: Diese Normen wurden hier nicht systematisch erfasst
        "EN" // Europäische Norm
      ],
      selectOptionsNormTypISO: [
        // Hinweis: Diese Normen wurden hier nicht systematisch erfasst
        "ISO" // ISO-Norm
      ]
    };
  }, // /data()
  //*** =================================================================================================================================
  methods: {
    oneDrivePickerOpen(action) {
      // NEU: Funktion für OneDrive Picker Open
      // Parameter action - wird an options-Objekt weitergereicht
      console.log("In oneDrivePickerOpen() - action:", action);
      const oneDriveOptions = {
        clientId: oneDriveApplicationId,
        action: action, // The action type being performed with the files selected.
        // You can specify
        // - "share" to generate a sharable URL
        // - "download" to receive a short-lived URL that downloads the content of the files,
        // - "query" to return identifiers that can be used with the Microsoft Graph API or OneDrive API.
        multiSelect: false, // ACHTUNG: Hier vs. Test auf verwaltung.vue auf false eingestellt (Einfachauswahl)!
        accountSwitchEnabled: true, // ACHTUNG: Hier vs. Test auf verwaltung.vue auf false eingestellt (auch andere Microsoft-Konten)!
        /*
        advanced: {
          redirectUri: "http://localhost:4200/Verwaltung", // ACHTUNG: Muss in derselben Domain wie der Picker sein!
          // Half aber auch nicht gegen das beim ersten Test auftretende Login-Problem, daher disabled
          // endPointHint: "api.onedrive.com"
        },
        */
        success: function(files) {
          /* success handler = Callback Funktion */
          // files wird nur befüllt bei action "share", bei action "query" kommen andere Daten zurück!
          console.log("Success aus oneDrivePickerOpen()");
          console.log("files: ", files);
          self.oneDrivePickerResponse = files; // self statt this!
          // ACHTUNG: Zugriff auf data() im Callback Code mit self statt this! Siehe https://sodocumentation.net/vue-js/topic/9350/using--this--in-vue
          // Alternative: Arrow function, siehe den Link - wird für Socket Callbacks in daten-austausch.vue und baueinheiten.vue verwendet!
          // NEU: Funktion nach Aufruf von OneDrivePickerOpen('share') zur Verarbeitung der Reponse aus dem Picker
          // Die WebURL aus OneDrive in die Bauinformation übertragen, Feld oneDriveLink
          console.log("oneDrivePickerResponse: ", self.oneDrivePickerResponse);
          if (
            self.oneDrivePickerResponse &&
            self.oneDrivePickerResponse.value &&
            self.oneDrivePickerResponse.value.length > 0 &&
            self.oneDrivePickerResponse.value[0] &&
            self.oneDrivePickerResponse.value[0].webUrl
          ) {
            console.log(
              "oneDrivePickerResponse.value[0].webUrl: ",
              self.oneDrivePickerResponse.value[0].webUrl
            );
            if (self.tabBauinformationen === "auswahlTabBauinformationen") {
              // aus Tab Auswahl/Details
              // ACHTUNG: Hier Reactivity Problem:
              // Vue bekommt dieses Hinzufügen des Felds oneDriveLink ohne $set nicht mit im q-input-Feld mit v-model ausgewaehlteBauinformation.oneDriveLink!!!
              self.$set(
                self.ausgewaehlteBauinformation,
                "oneDriveLink",
                self.oneDrivePickerResponse.value[0].webUrl
              );
            } else if (self.tabBauinformationen === "neuTabBauinformationen") {
              // aus Tab Neuanlage
              self.$set(
                self.neueBauinformation,
                "oneDriveLink",
                self.oneDrivePickerResponse.value[0].webUrl
              );
            } else {
              // aus Tab Übersicht
              self.$set(
                self.selectedRowsTableBauinformationen[0],
                "oneDriveLink",
                self.oneDrivePickerResponse.value[0].webUrl
              );
              //***************************************************************************************************** */
              // ACHTUNG: Diese Änderung unbedingt abspeichern in der Datenbank, wie beim Uploader für internen Link!!!
              self.submitAusgewaehlteBauinformationAusQTable();
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_AENDERUNG_ERFOLG
              );
              //***************************************************************************************************** */
            }
          }
          console.log(
            "ausgewaehlteBauinformation.oneDriveLink: ",
            self.ausgewaehlteBauinformation.oneDriveLink
          );
        },
        cancel: function() {
          /* cancel handler */
          console.log("Cancel aus oneDrivePickerOpen()");
        },
        error: function(error) {
          /* error handler */
          console.log("Error aus oneDrivePickerOpen()");
          console.log("error: ", error);
        }
      };
      //----------------------------------------------------------------------------------------------------------------------
      var self = this; // ACHTUNG: Save this to a local variable before making the next call!!!
      oneDrive.open(oneDriveOptions);
    },

    //----------------------------------------------------------------------------------------------------------------------------------
    // Funktionen für das q-select zum Auswählen/Abwählen der zugeordneten Bauinformation unter q-table für zugeordnete Bauinformationen
    // für ausgewählten Baustoff im Tab "Zugeordnete Bauinformationen":
    //----------------------------------------------------------------------------------------------------------------------------------
    initialisiereSelectModelUndOptionsUndFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation() {
      //---------------------------------------------------------------------------------------------------------------------------------
      // Lädt alle Benutzer aus der Datenbank und initialisiert damit die Options und Filter Options für das q-select für
      // zum Auswählen/Abwählen von zugeordneten Autoren im Tab "Details zur ausgewählten Bauinformation"
      // HINWEIS: Diese Arrays enthält nicht direkt die Benutzerkennungen, sondern ganze Benutzer als Objekte
      // Im QSelect werden per option-value="benutzerKennung" die Felder für die Benutzerkennung daraus extrahiert als Werte für die Optionts
      // ACHTUNG: In den VSlots für die Options muss ebenfalls scope.opt.benutzerKennung angegeben werden, sonst werden diese falsch angezeigt!
      // ACHTUNG: Zusätzlich ist emit-value="benutzerKennung" notwendig, damit das Feld "benutzerkennung" in die Selection übertragen wird
      // TODO: Eigentlich werden für die QSelect Options nur das Feld benutzerKennung benötigt, mit einer entsprechenden Extract-API-Methode
      //       könnte man die Größe der Daten im Memory und auf dem Netzwerk verringern
      //---------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In initialisiereSelectModelUndOptionsUndFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation()"
      );
      // Model für q-select laden mit den bereits für den Baustoff selektierten = aktuell in der q-table angezeigten zugeordneten Bauinformationen
      this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation = this.ausgewaehlteBauinformation.benutzerKennungenAutoren;
      // ACHTUNG: Muss Array sein bei Selection "multiple"
      // ACHTUNG: Hier kein Object.assign oder push für die Zuweisung verwenden, sonst merkwürdige Ergebnisse, z.B.
      // selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation hat bei push das Format "[[ {}, ..., {} ]]" statt "[ {}, ..., {} ]"
      console.log(
        "selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
        this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation
      );
      const apiRoute = process.env.API + "/Benutzer";
      this.$axios.get(apiRoute).then(response => {
        console.log("response.data: ");
        console.log(response.data);
        this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation =
          response.data; // RICHTIG - Array an Array
        // FALSCH: this.selectOptionsBauinformationenAusgewaehlterBaustoff.push(response.data);
        // ACHTUNG: Hier kein Object.assign oder push für die Zuweisung verwenden, sonst merkwürdige Ergebnisse, z.B.
        // selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation hat bei push das Format "[[ {}, ..., {} ]]" statt "[ {}, ..., {} ]"
        console.log(
          "selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
          this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
        );
        this.selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation =
          response.data; // RICHTIG
        // FALSCH: this.selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation.push(response.data);
        // ACHTUNG: Hier kein Object.assign oder push für die Zuweisung verwenden, sonst merkwürdige Ergebnisse, z.B.
        // selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation hat bei push das Format "[[ {}, ..., {} ]]" statt "[ {}, ..., {} ]"
        console.log(
          "selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
          this
            .selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
        );
      });
    },

    createSelectValueBenutzerKennungenAutorenAusgewaehlteBauinformation(
      val,
      done
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Funktion für QSelect zur Auswahl von Autoren
      // Wird im Tab "Details zur ausgewählten Bauinformation" verwendet
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      //--------------------------------------------------------------------------------------------------------------------
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      console.log(
        "In createSelectValueBenutzerKennungenAutorenAusgewaehlteBauinformation(val, done) - val: ",
        val
      );
      if (val.length > 1) {
        if (
          !this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation.benutzerKennung.includes(
            val
          )
        ) {
          done(val, "toggle");
        }
      }
    },

    selectFilterFunctionBenutzerKennungenAutorenAusgewaehlteBauinformation(
      val,
      update
    ) {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Filter-Funktion für QSelect zur Auswahl von Autoren
      // Wird im Tab "Details zur ausgewählten Bauinformation" verwendet
      // Vorlage: https://quasar.dev/vue-components/select#Example--Filtering-without-adding-to-menu
      // Der Filter-String kann eingegeben werden zur Filterung der auswählbaren Optionen auf BauinformationsBezeichnung
      // oder BauinformationsTyp
      //--------------------------------------------------------------------------------------------------------------------
      update(() => {
        console.log(
          "In selectFilterFunctionBenutzerKennungenAutorenAusgewaehlteBauinformation(val, update) für update - val: ",
          val
        ); // val ist der eingegebene Filter-String!
        if (val === "") {
          this.selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation = this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation;
          console.log(
            "selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
            this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
          );
          console.log(
            "selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
            this
              .selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
          );
        } else {
          const needle = val.toLowerCase();
          //===============================================================================================================================
          // ACHTUNG: Der folgende Array-Filter mit needle funktioniert NICHT, wenn eines der beteiligten Felder undefined oder null ist!!!
          // Er wirft dann im Browser Log Fehler "Cannot read property 'toLowerCase' of undefined"
          // Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!!
          // Allerdings fixed der Fix für #268 unten die null- und undefined-Eventualitäten!!!
          //===============================================================================================================================
          this.selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation = this.selectOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation.filter(
            // Array-Filter mit Arrow-Funktion:
            // Siehe https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
            // Nur bei nested Objekten: v => v.valueAufzaehlungswert.toLowerCase().indexOf(needle) > -1
            //=============================================================================================================================
            // NEU: Abfrage gegen null und undefined (falls z.B. keine Options definiert sind):
            // v => v.benutzerKennung.toLowerCase().indexOf(needle) > -1 // ALT
            //=============================================================================================================================
            // ACHTUNG: Hier muss bei Verwendung von Objekten als Options unbedingt das Unterfeld v.subField angegeben werden!!!
            v =>
              v.benutzerKennung != null &&
              v.benutzerKennung.toLowerCase().indexOf(needle) > -1 // NEU
          );
          console.log(
            "selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation: ",
            this
              .selectFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation
          );
        }
      });
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Funktion zur Berechnung, ob der angemeldete Benutzer eine Row in der Tabelle der Bauinformationen löschen darf
    // ACHTUNG: Da die Funktion einen Parameter row benötigt, kann sie KEINE computed-Funktion sein!
    // Parameter row enthält die per Kontextmenü selektierte Zeile mit Bauinformation
    // Die QTable musste dazu um das Feld und die Spalte benutzerKennungenAutoren erweitert werden!
    // ACHTUNG: row ist ein Objekt, kein Array!
    benutzerDarfLoeschenPerKontextmenueSelektierteBauinformationInTableBauinformationen: function(
      row
    ) {
      // console.log("In benutzerDarfLoeschenPerKontextmenueSelektierteBauinformationInTableBauinformationen(row)");
      // console.log("Parameter row: ", row)
      // console.log("localStore.state.anmeldeDatenBenutzer.benutzerRolle: ", this.localStore.state.anmeldeDatenBenutzer.benutzerRolle);
      if (row == null) {
        // Sicherheitshalber diesen Fall mit abfangen
        return false;
      } else {
        if (
          this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
            "Administrator" ||
          this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
            "Redakteur" ||
          (row.benutzerKennungenAutoren !== null && // #368 - Hier Prüfung auf null eingebaut, sonst Fehler auf Heroku "Cannot read properties of null"!
            // Tritt nur mit Benutzerrolle "Mitarbeiter" auf! Führt zu leerer Tabelle mit Bauinformationen (keine Daten, obwohl diese geladen wurden aus dem Backend)
            row.benutzerKennungenAutoren.includes(
              this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
            ))
        ) {
          // Benutzer ist Autor für die Bauinformation
          return true;
        } else {
          return false;
        }
      }
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Methode zum Öffnen eines internen Links (in einem neuen Browser Tab) in der ausgewählten Bauinformation in der Tabelle im Tab "Übersicht"
    // Für lokales und Heroku Cloud Deployment enabled
    openSelectedInternerLinkTableBauinformationen: function() {
      console.log("In openSelectedInternerLinkTableBauinformationen()");
      // console.log("selectedRowsTableBauinformationen.length: ", this.selectedRowsTableBauinformationen.length);
      if (this.selectedRowsTableBauinformationen.length === 0) {
        return;
      }
      // console.log("selectedRowsTableBauinformationen[0].internerLink: ", this.selectedRowsTableBauinformationen[0].internerLink);
      if (this.selectedRowsTableBauinformationen[0].internerLink == null ||
          this.selectedRowsTableBauinformationen[0].internerLink === "") { // NEU - gegen Fehler #382)
        return;
      }
      console.log(
        "In openSelectedInternerLinkTableBauinformationen - selectedRowsTableBauinformationen[0].internerLink: ",
        this.selectedRowsTableBauinformationen[0].internerLink
      );
      // NEU: id der gespeicherten Datei steht in this.selectedRowsTableBauinformationen[0].idInternerLink
      // BIM.click Backend File Server API rufen, um mit dieser id die Datei aus der Datenbank zu lesen und am Backend File Server in tmp/download-Folder zur Verfügung zu stellen

      const apiRoute =
        process.env.fileAPI +
        "/Dateien/download/" +
        this.selectedRowsTableBauinformationen[0].idInternerLink; // id der zugehörigen hochgeladenen Datei in DateienCollection in Mongoose
      //
      this.$axios
        .get(apiRoute)
        .then(response => {
          console.log(
            "In openSelectedInternerLinkTableBauinformationen nach HTTP Get Request für Download Datei - response.data: ",
            response.data
          );
          // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
          if (
            response.data.dateiName === undefined ||
            response.data.dateiName === null ||
            response.data.dateiName === ""
          ) {
            console.log(
              "WARNUNG: Keine Datei gefunden - die herunterzuladende Datei kann z.B. inzwischen gelöscht worden sein"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
            );
            return;
          }
          //-----------------------------------------------------------------------------------------------------------
          // URL zum Öffnen der Datei, jeweils für lokales Deployment und für Heroku Deployment, bestimmen:
          var downloadDir = null;
          var downloadURL = null;
          // TODO XXXXXX - Die downloadURL für lokal und Production ist aktuell identisch, funktioniert auch in beiden Umgebungen, kann also zusammengeführt werden!!!
          if (process.env.NODE_ENV !== "production") {
            // Greift auch, wenn undefined!!!
            // Bei lokalem Deployment auf localhost:
            // ALT (für Testzwecke)
            // downloadDir = "statics/pdfs"; //
            // downloadURL =
            //   process.env.ownURL + "/" + downloadDir + "/" + response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // selectedRowsTableBauinformationen[0].internerLink extrahiert werden
            // NEU (auch lokal Download aus Datenbank nach localhost:4444/tmp/download, welches statisch von Express geserved wird)
            downloadDir = "tmp/download";
            downloadURL =
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // selectedRowsTableBauinformationen[0].internerLink extrahiert werden
          } else {
            // Bei Cloud Deployment auf Heroku:
            // downloadDir = "app/tmp/download"; // Wird nicht gebraucht bei Zugriff über express.static in back-end-server.js
            // gemäß https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node
            // Die URLs zum Zugriff sind direkt: bimclickserver.herokuapp.com/filename.ext
            downloadURL =
              // "https://" + // ACHTUNG: https:// ist entgegen ersten Annahmen hier doch nicht notwendig gegen Status 404/"cannot GET..." Errors
              // Im Gegenteil: Mit "https://" kommt in Tests sogar zweimal https://https://bimclickserver als URL im Browser, was
              // zu "This website is unavailable..." Errors führt!!!
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // selectedRowsTableBauinformationen[0].internerLink extrahiert werden
          }
          console.log("downloadDir: ", downloadDir);
          console.log("downloadURL: ", downloadURL);

          window.open(downloadURL, "_blank"); // Die URL in neuem Tab öffnen - siehe https://www.tutorialsplane.com/vue-js-open-link-in-new-tab/
        })
        .catch(error => {
          console.log("Fehler beim Get für Download Datei");
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
          );
        });
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Methode zum Öffnen eines internen Links (in einem neuen Browser Tab) in der ausgewählten Bauinformation im Tab "Auswahl"
    // Für lokales und Heroku Cloud Deployment enabled
    openInternerLinkAusgewaehlteBauinformation: function() {
      if (this.ausgewaehlteBauinformation.internerLink == null ||
          this.ausgewaehlteBauinformation.internerLink === "") { // NEU - gegen Fehler #382)
        return;
      }
      console.log(
        "In openSelectedInternerLinkAusgewaehlteBauinformation - ausgewaehlteBauinformation.internerLink: ",
        this.ausgewaehlteBauinformation.internerLink
      );
      // NEU: id der gespeicherten Datei steht in this.ausgewaehlteBauinformation.idInternerLink
      // BIM.click Backend File Server API rufen, um mit dieser id die Datei aus der Datenbank zu lesen und am Backend File Server in tmp/download-Folder zur Verfügung zu stellen

      const apiRoute =
        process.env.fileAPI +
        "/Dateien/download/" +
        this.ausgewaehlteBauinformation.idInternerLink; // id der zugehörigen hochgeladenen Datei in DateienCollection in Mongoose
      //
      this.$axios
        .get(apiRoute)
        .then(response => {
          console.log(
            "In openSelectedInternerLinkAusgewaehlteBauinformation nach HTTP Get Request für Download Datei - response.data: ",
            response.data
          );
          // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
          if (
            response.data.dateiName === undefined ||
            response.data.dateiName === null ||
            response.data.dateiName === ""
          ) {
            console.log(
              "WARNUNG: Keine Datei gefunden - die herunterzuladende Datei kann z.B. inzwischen gelöscht worden sein"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
            );
            return;
          }
          //-----------------------------------------------------------------------------------------------------------
          // URL zum Öffnen der Datei, jeweils für lokales Deployment und für Heroku Deployment, bestimmen:
          var downloadDir = null;
          var downloadURL = null;
          // TODO XXXXXX - Die downloadURL für lokal und Production ist aktuell identisch, funktioniert auch in beiden Umgebungen, kann also zusammengeführt werden!!!
          if (process.env.NODE_ENV !== "production") {
            // Greift auch, wenn undefined!!!
            // Bei lokalem Deployment auf localhost:
            // ALT (für Testzwecke)
            // downloadDir = "statics/pdfs"; //
            // downloadURL =
            //   process.env.ownURL + "/" + downloadDir + "/" + response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // ausgewaehlteBauinformation.internerLink extrahiert werden
            // NEU (auch lokal Download aus Datenbank nach localhost:4444/tmp/download, welches statisch von Express geserved wird)
            downloadDir = "tmp/download";
            downloadURL =
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // ausgewaehlteBauinformation.internerLink extrahiert werden
          } else {
            // Bei Cloud Deployment auf Heroku:
            // downloadDir = "app/tmp/download"; // Wird nicht gebraucht bei Zugriff über express.static in back-end-server.js
            // gemäß https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node
            // Die URLs zum Zugriff sind direkt: bimclickserver.herokuapp.com/filename.ext
            downloadURL =
              // "https://" + // ACHTUNG: https:// ist entgegen ersten Annahmen hier doch nicht notwendig gegen Status 404/"cannot GET..." Errors
              // Im Gegenteil: Mit "https://" kommt in Tests sogar zweimal https://https://bimclickserver als URL im Browser, was
              // zu "This website is unavailable..." Errors führt!!!
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // ausgewaehlteBauinformation.internerLink extrahiert werden
          }
          console.log("downloadDir: ", downloadDir);
          console.log("downloadURL: ", downloadURL);

          window.open(downloadURL, "_blank"); // Die URL in neuem Tab öffnen - siehe https://www.tutorialsplane.com/vue-js-open-link-in-new-tab/
        })
        .catch(error => {
          console.log("Fehler beim Get für Download Datei");
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
          );
        });
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Methode zum Öffnen eines internen Links (in einem neuen Browser Tab) in der neuen Bauinformation im Tab "Neu"
    // Für lokales und Heroku Cloud Deployment enabled
    openInternerLinkNeueBauinformation: function() {
      if (this.neueBauinformation.internerLink == null ||
          this.neueBauinformation.internerLink === "") { // NEU - gegen Fehler #382)
        return;
      }
      console.log(
        "In openSelectedInternerLinkNeueBauinformation - neueBauinformation.internerLink: ",
        this.neueBauinformation.internerLink
      );
      // NEU: id der gespeicherten Datei steht in this.neueBauinformation.idInternerLink
      // BIM.click Backend File Server API rufen, um mit dieser id die Datei aus der Datenbank zu lesen und am Backend File Server in tmp/download-Folder zur Verfügung zu stellen

      const apiRoute =
        process.env.fileAPI +
        "/Dateien/download/" +
        this.neueBauinformation.idInternerLink; // id der zugehörigen hochgeladenen Datei in DateienCollection in Mongoose
      //
      this.$axios
        .get(apiRoute)
        .then(response => {
          console.log(
            "In openSelectedInternerLinkNeueBauinformation nach HTTP Get Request für Download Datei - response.data: ",
            response.data
          );
          // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
          if (
            response.data.dateiName === undefined ||
            response.data.dateiName === null ||
            response.data.dateiName === ""
          ) {
            console.log(
              "WARNUNG: Keine Datei gefunden - die herunterzuladende Datei kann z.B. inzwischen gelöscht worden sein"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
            );
            return;
          }
          //-----------------------------------------------------------------------------------------------------------
          // URL zum Öffnen der Datei, jeweils für lokales Deployment und für Heroku Deployment, bestimmen:
          var downloadDir = null;
          var downloadURL = null;
          // TODO XXXXXX - Die downloadURL für lokal und Production ist aktuell identisch, funktioniert auch in beiden Umgebungen, kann also zusammengeführt werden!!!
          if (process.env.NODE_ENV !== "production") {
            // Greift auch, wenn undefined!!!
            // Bei lokalem Deployment auf localhost:
            // ALT (für Testzwecke)
            // downloadDir = "statics/pdfs"; //
            // downloadURL =
            //   process.env.ownURL + "/" + downloadDir + "/" + response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // neueBauinformation.internerLink extrahiert werden
            // NEU (auch lokal Download aus Datenbank nach localhost:4444/tmp/download, welches statisch von Express geserved wird)
            downloadDir = "tmp/download";
            downloadURL =
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // neueBauinformation.internerLink extrahiert werden
          } else {
            // Bei Cloud Deployment auf Heroku:
            // downloadDir = "app/tmp/download"; // Wird nicht gebraucht bei Zugriff über express.static in back-end-server.js
            // gemäß https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node
            // Die URLS zum Zugriff sind direkt: bimclickserver.herokuapp.com/filename.ext
            downloadURL =
              // "https://" + // ACHTUNG: https:// ist entgegen ersten Annahmen hier doch nicht notwendig gegen Status 404/"cannot GET..." Errors
              // Im Gegenteil: Mit "https://" kommt in Tests sogar zweimal https://https://bimclickserver als URL im Browser, was
              // zu "This website is unavailable..." Errors führt!!!
              process.env.fileAPI +
              // "/" +
              // downloadDir +
              "/" +
              response.data.dateiName; // HINWEIS: Dateiname könnte alternativ aus
            // neueBauinformation.internerLink extrahiert werden
          }
          console.log("downloadDir: ", downloadDir);
          console.log("downloadURL: ", downloadURL);

          window.open(downloadURL, "_blank"); // Die URL in neuem Tab öffnen - siehe https://www.tutorialsplane.com/vue-js-open-link-in-new-tab/
        })
        .catch(error => {
          console.log("Fehler beim Get für Download Datei");
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DATEI_NICHT_OEFFENBAR
          );
        });
    },

    //---------------------------------------------------------------------------------------------------------------------
    // Methode, um die URL des Upload APIs am Backend File Server für q-uploader (:url="getUploadURL()") zu bestimmen:
    // Angepasst für lokales Deployment auf localhost und Deployment auf Heroku!
    //---------------------------------------------------------------------------------------------------------------------
    getUploadURL: function() {
      console.log("In getUploadURL");
      // console.log("process.env.PORT: ", process.env.PORT); // Ist lokal undefined!!!
      // const port = process.env.PORT || 4444; // process.env.PORT enthält auf Heroku den Port des EIGENEN Node Prozesses
      // Lokal ist es undefiniert, daher wird dann 4444 genommen.
      // Aber ACHTUNG: Bei Test auf Heroku wird hier auch 4444 genommen, weil process.env.PORT undefined ist!!!
      // Die im folgenden definierte Variable UPLOAD_PORT ist, obwohl sogar per Heroku Dashboard gesetzt für die App BIMclick (das ist das Frontend),
      // ebenfalls undefined!!!
      // Dies könnte daran liegen, dass der Prozess, den Heroku für das Frontend ausführt, server.js ist, und nur innerhalb von diesem sind
      // diese Enviornment Variablen bekannt?!?

      // Temporäre Tests mit selbst definierter Environment Variable UPLOAD_PORT:
      // Später wieder disabled, da sich herausstellte, dass den URLs auf Heroku gar kein Port mitgegeben werden muss, nur auf localhost!!!

      // console.log("process.env.UPLOAD_PORT: ", process.env.UPLOAD_PORT); // Problem: Ist, da sie nicht im Frontend, sondern in separater Heroku App
      // für Backend File Serfer gesetzt wird, ebenfalls immer undefined auf Heroku! (Environment Variablen funktioneiren nicht cross Apps - dies geht
      // nur mit speziellen Vorkehurungen, Packages oder Sharing über Env-Files)
      // Fazit: Quasar Frontend App kann nicht direkt auf diese Environment Variablen von Heroku zugreifen

      // Daher dann folgenden Workaround probiert:
      // console.log("process.env.uploadPort: ", process.env.uploadPort); // Variable aus quasar.conf.js - diese musste dort manuell mit dem richtigen
      // Wert des beim Start angezeigten von Heroku vergebenen Ports der Backend File Server App Environment Variable gesetzt werden per Heroku Dashboard
      // VOR Start der Frontend App,
      // siehe https://quasar.dev/quasar-cli/cli-documentation/handling-process-env#Adding-to-process.env
      // Dies funktionierte, wurde aber gar nicht gebraucht, da wie gesagt für Calls der regulären und File Server API auf Heroku KEIN Port mitgegeben werden muss!
      // const port = process.env.uploadPort || 4444; // NEU: In file-server.js gesetzte Heroku Environment Variable
      // (diese per Heroku Dashboard/Settings mit dem Wert aus dem Console Log von file-server.js definiert VOR Start des Frontends)

      // Zu Environment Variablen siehe auch https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
      // Sharing von Environment Variablen z.B. über env Files oder zusätzliche Node Packages (dotenv)
      // Alternativ könnte man die Variable (aber nur falls file-server.js auch im Frontend liefe, was Heroku nicht kann) auch in global-store.js speichern
      // und von dort mit der Quasar App sharen!!!
      // Config Variablen auf Heroku: https://devcenter.heroku.com/articles/config-vars

      // TODO XXXXXX - Die return-Werte für lokal und Production sind aktuell identisch, funktionieren auch in beiden Umgebungen, können also zusammengeführt werden!!!
      if (process.env.DEV) {
        // Running in development mode - see https://quasar.dev/quasar-cli/cli-documentation/handling-process-env#Introduction
        console.log(
          "getUploadURL: ",
          process.env.fileAPI /* + ":" + port */ + "/Dateien/upload" // NEU: Auch hier ohne Port, da dieser in fileAPI enthalten ist
        );
        return process.env.fileAPI /* + ":" + port */ + "/Dateien/upload"; // NEU: Auch hier ohne Port, da dieser in fileAPI enthalten ist
      } else {
        // In production and all other modes, d.h. auf Heroku:
        // Hier testweise Upload Request OHNE Port. Grund: Das reguläre Backend API wird ebenfalls ohne Port gerufen!!!
        // Führte zunächst zu CORS Error im Browser: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        // Auch die Chrome CORS Extensions halfen zunächst nicht - noch andere Fehler vorhanden
        //
        // Sonstige Testergebnisse:
        // 1. Postman Request: https://bimclickserver.herokuapp.com:43427/upload/
        //    Wenn man aus Postman (ignoriert CORS) einen solchen Post Request MIT dem aktuellen Port (hier 43427) von bimclickserver schickt,
        //    und OHNE im Body/Binary ein File selektiert zu haben,
        //    kommt laut Application Log von bimclickserver auf Heroku
        //    dort NICHTS an, und Postman bekommt KEINE Response
        // 2. Postman Request: https://bimclickserver.herokuapp.com/upload/ (ohne File)
        //    Wenn man aus Postman (ignoriert CORS) einen solchen Post Request OHNE Port schickt und OHNE im Body/Binary ein File selektiert zu haben,
        //    kommt laut Application Log von bimclickserver auf Heroku
        //    dort der Post Request an, und Postman bekommt ein Response mit Status 200 OK und der "Thank You" Message aus file-server.js im Body!
        //    Damit FUNKTIONIERT grundsätzlich auf Heroku der File Upload OHNE Port im Request
        // 2.a: Mit File im Body: Aktuell kommt dann Error Status 503 Service Unavailable
        //    Im Application Log von bimclickserver auf Heroku wird dersebe Fehler Status 503 mit desc="Server Request Interrupted" angezeigt!!!
        // 3. File Upload mit q-Uploader aus bauinformationen.vue in Chrome Browser:
        //    Es passiert MIT Port ein Timeout im Browser, im Application Log von bimclickserver kommt nichts an
        // 4. Dasselbe OHNE Port führt zu obigem CORS Fehler!!! Application Log von bimclickserver nicht überprüft
        //    Wenn man CORS mit der Chrome Extension mit dem Käfer abschaltet (Workaround), erhält man denselben Status 503 Fehler wie in 2.a mit Postman!!!

        //    Fazit:
        //    => Die Upload/Download Requests auf Heroku sollte auf jeden Fall OHNE port erfolgen!
        //    => Der CORS Fehler (einstweilen Workaround per Chrome Extension) und der 503 Fehler müssen noch gefixed werden!
        //    Update: Mittlwerweile sind beide Fehler gelöst - siehe unten

        //    Zum 503 Fehler:
        //      503 Fehler passieren unter anderem, wenn etwas im Request falsch ist
        //      Siehe https://stackoverflow.com/questions/43596835/heroku-is-giving-me-a-503-when-trying-to-open-my-web-app-works-on-local-host
        //      Kann auch an fehlenden Packages auf Heroku in package.json liegen - die Package Suchreihenfolge ist lokal anders
        //        Z.B. Cors nicht in package.json!!! fs? Wird gar nicht verwendet
        //      => Checken, ob das "/upload/" hier nicht "/upload" heißen sollte wie in der Route für den Post Request in file-server.js!
        //         Ein Postman Request mit "/upload" statt "/upload/" führte immerhin zu einer Log Message am Server mit "Uploading: %0" und
        //         Status 500 statt 503 (Message ganz unten)! Lokal bereits getestet - lokaler Upload funktioniert mit "/upload" ebenfalls.

        // Verbliebener 503 Error beim http Post für File Upload (SOLVED):
        // status=503 / code=H18 / sock=server / desc="Server Request Interrupted"
        // Folgend SO Artikel weisen eher darauf hin, dass während der Request Verarbeitung am Upload Server etwas schief geht und der Socket
        // am Server geschlossen wird, bevor der (Upload) Request vollständig abgearbeitet werden konnte
        // Siehe https://stackoverflow.com/questions/12704777/how-should-i-interpret-heroku-h18-errors
        // und   https://stackoverflow.com/questions/56548292/heroku-code-h18-server-request-interrupted-with-minimal-java-server
        // und   https://stackoverflow.com/questions/51309616/heroku-crash-over-and-over-by-post-request-multer-or-nodemailer-h-18/53170225#53170225
        //       => Daraus spezielles Stack Logging für uncaught Exceptions in file-server.js eingebaut - funktionierte aber nicht

        // => Die Lösung für den 503 Fehler: In file-server.js anderen Code verwendet für den Formidable Teil des Uploads, eine Mischung aus dem
        // bisherigen Code und der Vorlage auf https://quasar.dev/vue-components/uploader#Nodejs
        // Damit funktionierte der Upload für kleine Files, für größere gab es immer noch 503 Fehler!
        // Die eigentliche Ursache der 503 Fehler war dann ein falsch platziertes res.send in file-server.js, welches die Verbindung vorzeitig
        // beendete - siehe Kommentare dort!

        // Weiteres Problem: Auf Heroku konnte das hochgeladene File zwar in einen Ordner /app/public oder /app/tmp geschrieben werden
        // ACHTUNG: Bash Shell kann es allerdings nicht anzeigen, da diese in einem anderen Dyno läuft - siehe https://devcenter.heroku.com/articles/active-storage-on-heroku

        // https://stackoverflow.com/questions/38363641/viewing-the-pdf-file-in-heroku-app - man sollte das File in app/tmp speichern

        // Aber weiteres Problem mit dem Download der File: http://bimclickserver.herokuapp.com/app/tmp/parkplatz.gif (Beispiel) sagt dennoch
        // "Cannot GET /app/tmp/parkplatz.gif" (404 Fehler)

        // D.h. man kann die Files, selbst wenn man sie in einen Heroku Folder schreiben kann, nicht ohne weiteres später aus diesem Folder direkt im Browser anzeigen!!!
        // Hinweise dazu auf https://stackoverflow.com/questions/45776489/can-one-ever-access-a-file-stored-in-herokus-ephemeral-file-system-via-the-brow
        //                   Dort wird Download der Files empfohlen mit einem Phoenix Framework Service (nicht JS)
        // Mögliche Lösung:  https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
        //                   Express res.download - lädt File vom Server in den Download Ordner des Browsers - getestet mit spezieller Test Route /download - FUNKTIONIERT!
        // Weitere Lösung:   https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node
        // a) href mit "https://bimclickserver.herokuapp.com/sendfile" // ACHTUNG: https:// ist notwendig, sonst prefixed href es mit einer lokalen URL!!!
        //    sowie app.get auf diese Route mit res.sendFile() für eine File aus dem tmp Directory
        //    Funktioniert per Test - öffnet die File in separatem Browser Fenster!
        //    Siehe unten TODO XXXXXX - getestet - FUNKTIONIERT!
        // b) Weitere Lösung aus diesem SO Post: app.use(express.static(__dirname)); // zum Serven von statischem Content aus dem Ordner __dirname
        //    mit href="https://bimclickserver.herokuapp.com/parkplatz.gif" (Beispiel für eine Datei, für den Pfad kann auch __dirname verwendet werden)
        //    Siehe unten TODO XXXXXX - getestet - FUNKTIONIERT auch! Diese Lösung schließlich implementiert

        // Verbliebener CORS Fehler (SOLVED):
        // Gelöst durch Korrektur der CORS Calls in back-end-server.js - siehe dort

        console.log(
          "getUploadURL: ",
          process.env.fileAPI /* + ":" + port */ + "/Dateien/upload" // NEU: Ohne port
        );
        return process.env.fileAPI /* + ":" + port */ + "/Dateien/upload"; // NEU: Ohne port
      }
    },

    //---------------------------------------------------------------------------------------------------------------------
    // Gemeinsamer Toggle Button für alle Q-Table Spalten in der QTable für die Bauinformationen
    // ACHTUNG: Die einzelnen Toggles für die visible Columns fügen auch jeweils "ihren" Array-Wert HINTEN an den Array an!
    // Oder sie löschen "ihre" Werte aus dem Array an beliebiger Position
    // Dadurch kann sich die Länge des Arrays und die Position eines Wertes im Array über die Zeit verändern!
    toggleAllColumns() {
      console.log("In toggleAllColumns()");
      if (this.toggleAllColumnsState) {
        // "Viele Spalten"
        this.visibleColumnsTableBauinformationen.length = 0;
        this.visibleColumnsTableBauinformationen.push(
          // Array initialisieren mit allen Kategorien außer den 10 Normkategorien:
          // Hinweis: Würde hier eigentlich auch nicht-reaktiv durch normale Zuweisung statt push funktionieren (getestet)
          "bauinformationsBezeichnung",
          "bauinformationsTyp",
          "benutzerKennungenAutoren", // NEU
          "bauinformationsAnzeigeText", // NEU
          "bauinformationsBemerkung",
          "herausgeberGeografie",
          "herausgeberInstitution",
          "herausgeberBezeichnung",
          "herausgeberBundeslandDeutschland",
          "herausgeberBundeslandÖsterreich",
          "herausgeberKantonSchweiz",
          "gültigkeitsDatumVon",
          "gültigkeitsDatumBis",
          "normTypDIN",
          "normTypÖNORM",
          "normTypSN",
          "normTypEN",
          "normTypISO",
          "internerLink",
          "externerLink",
          "oneDriveLink"
          /*
          "grundNorm",
          "terminologieNorm",
          "prüfNorm",
          "produktNorm",
          "verfahrensNorm",
          "dienstleistungsNorm",
          "schnittstellenNorm",
          "deklarationsNorm",
          "fachbereichsNorm",
          "werkNorm"
          */
        );
        console.log(
          "In toggleAllColumns mit Toggle auf EIN - visibleColumnsTableBauinformationen:",
          this.visibleColumnsTableBauinformationen
        );

        // ACHTUNG: toggleAllColumnsState darf nicht invertiert werden - wird von q-toggle v-model automatisch gemacht!!!
        // this.toggleAllColumnsState = !this.toggleAllColumnsState;
        // Nur wenn :value statt v-model verwendet wird am q-toggle, muss der State in der @input-Methode invertiert werden!!!
        // Kan getestet werden in https://codepen.io/mickey58/pen/NWxdqKO?editors=1011

        // NEU: Auch die neuen Gruppen-Toggles alle einschalten - sonst sind diese Toggles eventuell inkonsistent:
        this.regionenAnzeigen = true;
        // console.log("regionenAnzeigen: ", this.regionenAnzeigen);
        // this.$refs.toggleRegionenAnzeigen.toggle(); // Überflüssig
        this.gueltigkeitAnzeigen = true;
        // this.$refs.toggleGueltigkeitAnzeigen.toggle(); // Überflüssig
        this.normTypenAnzeigen = true;
        // this.$refs.normTypenAnzeigen.toggle(); // Überflüssig
        this.linksAnzeigen = true;
        // this.$refs.linksAnzeigen.toggle(); // Überflüssig

        // NEU: Den Toggle für die Normkategorien ausschalten - sonst ist dieser Toggle eventuell inkonsistent:
        this.toggleAllNormkategorienState = false;
      } else {
        // "Wenige Spalten"
        // Array leeren außer den 4 ersten Spalten
        // Hinweis: Würde hier eigentlich auch nicht-reaktiv durch normale Zuweisung statt push funktionieren (getestet)
        this.visibleColumnsTableBauinformationen.length = 0;
        this.visibleColumnsTableBauinformationen.push(
          "bauinformationsBezeichnung",
          "benutzerKennungenAutoren",
          "bauinformationsTyp",
          // "bauinformationsBemerkung", // NEU: Weggelassen
          "bauinformationsAnzeigeText" // NEU: Dazugenommen
        );

        console.log(
          "In toggleAllColumns mit Toggle auf AUS - visibleColumnsTableBauinformationen:",
          this.visibleColumnsTableBauinformationen
        );

        // ACHTUNG: toggleAllColumnsState darf nicht invertiert werden - wird von q-toggle v-model automatisch gemacht!!!
        // this.toggleAllColumnsState = !this.toggleAllColumnsState;
        // Nur wenn :value statt v-model verwendet wird am q-toggle, muss der State in der @input-Methode invertiert werden!!!
        // Kann getestet werden in https://codepen.io/mickey58/pen/NWxdqKO?editors=1011

        // NEU: Auch die neuen Gruppen-Toggles alle ausschalten - sonst sind diese Toggles eventuell inkonsistent:
        this.regionenAnzeigen = false;
        // this.$refs.toggleRegionenAnzeigen.toggle(); // Überflüssig
        this.gueltigkeitAnzeigen = false;
        // this.$refs.toggleGueltigkeitAnzeigen.toggle(); // Überflüssig
        this.normTypenAnzeigen = false;
        // this.$refs.toggleNormTypenAnzeigen.toggle(); // Überflüssig
        this.linksAnzeigen = false;
        // this.$refs.toggleLinksAnzeigen.toggle(); // Überflüssig

        // NEU: Auch den Toggle für die Normkategorien ausschalten -  sonst ist dieser Toggle eventuell inkonsistent:
        this.toggleAllNormkategorienState = false;
      } // else

      console.log(
        "Am Ende von toggleAllColumns - toggleAllColumnsState neu: ",
        this.toggleAllColumnsState
      );
      // ALT:
      // this.$refs.toggleAllColumns.toggle(); // Führt zu infinite Loop!!!
      // await this.$nextTick(); // nur mit async function oben!
      // console.log("After next tick");
    },

    //---------------------------------------------------------------------------------------------------------------------
    // Gemeinsamer Toggle Button für alle Q-Table Spalten, die Normkategorien emthalten
    // ACHTUNG: Die einzelnen Toggles für die visible Columns fügen auch jeweils "ihren" Array-Wert HINTEN an den Array an!
    // Oder sie löschen "ihre" Werte aus dem Array an beliebiger Position
    // Dadurch kann sich die Länge des Arrays und die Position eines Wertes im Array über die Zeit verändern!
    // Deshalb mussten die früher vorhandenen Einzel-Toggles für die Normkategorien entfernt werden, da inkompatibel mit der folgenden Methode
    toggleAllNormkategorien() {
      // "Alle Normkategorien"
      // if (this.btnClickCounter % 2 === 1) {
      if (this.toggleAllNormkategorienState) {
        this.visibleColumnsTableBauinformationen.push(
          // Adds 10 Normkategorien at end of array (first parameter)
          /*
          "bauinformationsBezeichnung",
          "bauinformationsTyp",
          "benutzerKennungenAutoren", // NEU
          "bauinformationsAnzeigeText", // NEU
          "bauinformationsBemerkung",
          "herausgeberGeografie",
          "herausgeberInstitution",
          "herausgeberBezeichnung",
          "herausgeberBundeslandDeutschland",
          "herausgeberBundeslandÖsterreich",
          "herausgeberKantonSchweiz",
          "gültigkeitsDatumVon",
          "gültigkeitsDatumBis",
          "normTypDIN",
          "normTypÖNORM",
          "normTypSN",
          "normTypEN",
          "normTypISO",
          "internerLink",
          "externerLink",
          "oneDriveLink",
          */
          "grundNorm",
          "terminologieNorm",
          "prüfNorm",
          "produktNorm",
          "verfahrensNorm",
          "dienstleistungsNorm",
          "schnittstellenNorm",
          "deklarationsNorm",
          "fachbereichsNorm",
          "werkNorm"
        );
        console.log(
          "In toggleAllNormkategorien mit Toggle auf EIN - visibleColumnsTableBauinformationen:",
          this.visibleColumnsTableBauinformationen
        );
      } else {
        // "Keine Normkategorien"
        // if (this.btnClickCounter % 2 === 0) {
        // if (this.toggleAllNormkategorienState) {
        // Achtung: Da sich durch Togglen von anderen Toggles die Position von Normkategorien im Array visibleColunmnsBauinformationen ändern kann,
        // kann man nicht einfach hinten am Array mit der Splice-Funktion die 10 dort anfangs eingefügten Normkategorien abschneiden!!!
        // D.h. das Folgende funktioniert nicht so einfach, sondern schneidet evtl. andere getogglete Werte einfach mit ab:
        // this.visibleColumnsTableBauinformationen.splice(this.visibleColumnsTableBauinformationen.length - 10, 10);
        // Stattdessen müssen explizit die Normkategorien im Array herausgefiltert werden.
        // ACHTUNG: .filter liefert einen neuen Array zurück, funktioniert nicht direkt auf dem bisherigen Array!
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value =>
            value !== "grundNorm" &&
            value !== "terminologieNorm" &&
            value !== "prüfNorm" &&
            value !== "produktNorm" &&
            value !== "verfahrensNorm" &&
            value !== "dienstleistungsNorm" &&
            value !== "schnittstellenNorm" &&
            value !== "deklarationsNorm" &&
            value !== "fachbereichsNorm" &&
            value !== "werkNorm"
        );

        console.log(
          "In toggleAllNormkategorien mit Toggle auf AUS - visibleColumnsTableBauinformationen:",
          this.visibleColumnsTableBauinformationen
        );
      }
      // this.btnClickCounter += 1; // ALT
      // ACHTUNG: toggleAllNormkategorienState darf nicht invertiert werden - wird von q-toggle v-model automatisch gemacht!!!
      // this.toggleAllNormkategorienState = !this.toggleAllNormkategorienState;
      console.log(
        "Am Ende von toggleAllNormKategorien - toggleAllNormkategorienState neu: ",
        this.toggleAllNormkategorienState
      );

      // this.$refs.toggleAllNormkategorien.toggle(); // Führt zu infinite Loop!!!
      // await this.$nextTick(); // nur mit async function oben!
      // console.log("After next tick");
    },
    /* eslint-disable no-console */

    //----------------------------------------------------------------------------------------------------------------------------
    // NEU: Funktionen für "Gruppen-Toggles", die jeweils die Sichtbarkeit mehrerer Spalten in der QTable togglen:

    toggleSpaltenRegionen() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für die Normtypen
      //--------------------------------------------------------------------------------------------------------------------------
      // console.log("In toggleSpaltenRegionen() - regionenAnzeigen: ", this.regionenAnzeigen);
      if (this.regionenAnzeigen) {
        for (let i = 0; i < this.regionenArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(this.regionenArray[i]);
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.regionenArray.includes(value)
        );
      }
    },

    toggleSpaltenGueltigkeit() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für die Gültigkeit
      //--------------------------------------------------------------------------------------------------------------------------
      if (this.gueltigkeitAnzeigen) {
        for (let i = 0; i < this.gueltigkeitArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(
            this.gueltigkeitArray[i]
          );
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.gueltigkeitArray.includes(value)
        );
      }
    },

    toggleSpaltenNormTypen() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für die Normtypen
      //--------------------------------------------------------------------------------------------------------------------------
      if (this.normTypenAnzeigen) {
        for (let i = 0; i < this.normTypenArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(this.normTypenArray[i]);
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.normTypenArray.includes(value)
        );
      }
    },

    toggleSpaltenLinks() {
      //--------------------------------------------------------------------------------------------------------------------------
      // Methode - toggled in QTable für Bauinformationen die Spaltensichtbarkeit für die Links
      //--------------------------------------------------------------------------------------------------------------------------
      if (this.linksAnzeigen) {
        for (let i = 0; i < this.linksArray.length; i++) {
          this.visibleColumnsTableBauinformationen.push(this.linksArray[i]);
        }
      } else {
        this.visibleColumnsTableBauinformationen = this.visibleColumnsTableBauinformationen.filter(
          value => !this.linksArray.includes(value)
        );
      }
    },

    /*------------------------------------------------------------------------------------------------------------------//
      Funktion, um in QTable das Pagination Label unten rechts in deutsch anzuzeigen.
      Sonst würde z.B. "1 - 25 of 500" angezeigt werden,
      Wird im Template oben durch :pagination-label="getPaginationLabel" verwendet.
      ACHTUNG: Sicherheitshalber von data() nach methods verschoben!!!
    //------------------------------------------------------------------------------------------------------------------*/
    getPaginationLabel: function(firstRowIndex, endRowIndex, totalRowsNumber) {
      return firstRowIndex + " - " + endRowIndex + " von " + totalRowsNumber;
    },

    /*------------------------------------------------------------------------------------------------------------------//
      Funktion, um in QTable das Selected Label unten links auf Deutsch anzuzeigen.
      Sonst würde z.B. "2 records selected" angezeigt werden.
      Wird im Template oben durch :selected-rows-label="getSelectedStringTableBauinformationen" verwendet.
      ACHTUNG: Muss unbedingt in "methods" deklariert werden, NICHT oben in data ()!!!
    //-----------------------------------------------------------------------------------------------------------------*/
    getSelectedStringTableBauinformationen: function() {
      /* console.log(
        "In getSelectedStringTableBauinformationen - length:",
        this.selectedRowsTableBauinformationen.length
      ); */
      return this.selectedRowsTableBauinformationen.length === 0
        ? ""
        : `${this.selectedRowsTableBauinformationen.length} Bauinformation${
            this.selectedRowsTableBauinformationen.length > 1 ? "en" : ""
          } ausgewählt von ${this.dataTableBauinformationen.length}`;
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion zur Berechnung der ausgewählten Bauinformation
    getSelectedBauinformation: function() {
      if (this.selectedRowsTableBauinformationen.length === 0) return undefined; // ALT: {}
      // ACHTUNG: {} ist nicht dasselbe wie undefined, nur bei undefined wird per v-if das Tab ausgeblendet!!!
      return this.selectedRowsTableBauinformationen[0]; // Alle Felder im 1. Eintrag in den selektierten Rows
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion für QUploader uploaderUebersichtBauinformationen im Tab "Übersicht"
    // Speichert File Name nach File Upload für internen Link im Feld "internerLink" für die ausgewählte Bauinformation
    // Hat als Parameter Objekt info = { [files], xhr } laut https://quasar.dev/vue-components/uploader
    // ACHTUNG: Erfordert offenbar nicht die Factory Function unten, daher diese disabled!
    // ACHTUNG: Dieser Change muss mit Vue $set, nicht mit einfacher Zuweisung erfolgen, sonst bekommt Vue es nicht mit - siehe https://vuejs.org/v2/guide/list.html#Caveats
    // Es handelt sich hier um einen Object Change in einem Array
    // Object Changes müssen auf jeden Fall mit $set erfolgen, wenn neue Felder zum Objekt hinzugefügt werden oder gelöscht werden
    // Dies ist hier eigentlich nicht der Fall - trotzdem per Test verifiziert, dass ohne $set für das Feld internerLink Vue dieses Feld in der q-table nicht aktualisiert!!!
    // Siehe https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats für die Fälle, wo $set notwendig ist.
    // sowie https://stackoverflow.com/questions/48809248/vuejs-and-vue-set-update-an-key-value-array
    // DONE: Abspeichern in der Datenbank!
    storeNameOfUploadedFileUploaderUebersichtBauinformationen: function(info) {
      // console.log(info.files[0]);
      console.log(
        "In storeNameOfUploadedFileUploaderUebersichtBauinformationen - info.files[0].name: ",
        info.files[0].name
      ); // File Name aus dem Upload

      console.log("info.xhr: ", info.xhr); // NEU
      // console.log("info.xhr.response.id: ", info.xhr.response.id); // Ist leider undefined, id muss daher geparsed werden aus dem Response Text:

      const idOfUploadedFile = JSON.parse(info.xhr.responseText).id;
      console.log("idOfUploadedFile: ", idOfUploadedFile);
      this.selectedRowsTableBauinformationen[0].idInternerLink = idOfUploadedFile;

      const slugNameOfUploadedFile = JSON.parse(info.xhr.responseText)
        .slugFileName;
      console.log("slugNameOUploadedFile: ", slugNameOfUploadedFile);

      // ALT: (für lokales Deployment)
      /*
      this.$set(
        this.selectedRowsTableBauinformationen[0],
        "internerLink",
        "statics/pdfs/" + info.files[0].name
      );
      */
      // NEU (für lokales und Heroku Cloud Deployment - slugified File Name abspeichern zur späteren Anzeige des Files, wie oben geparsed aus der Response)
      // HINWEIS: $set ist hier notwendig, sonst aktualisiert Vue das Feld in der q-table NICHT (per Test verifiziert)
      this.$set(
        this.selectedRowsTableBauinformationen[0],
        "internerLink",
        slugNameOfUploadedFile
      );
      console.log(
        "In storeNameOfUploadedFileUploaderUebersichtBauinformationen - gespeicherter interner Link: ",
        this.selectedRowsTableBauinformationen[0].internerLink
      );

      // Abspeichern in der Datenbank:
      this.submitAusgewaehlteBauinformationAusQTable();
      globalStore.showBenutzerNachricht(
        // NEU: Benutzernachricht!
        BenutzerNachrichten.BAUINFORMATION_AENDERUNG_ERFOLG
      );
      // Test Code, um zu prüfen, ob QUploader Reset per API funktioniert - positiv verifiziert
      /*
      console.log(
        "In storeNameOfUploadedFileUploaderUebersichtBauinformationen - vor Reset von QUploader: "
      );
       this.$refs.uploader.reset(); // Issue reset of q-uploader through API
      */
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für QUploader uploaderAuswahlBauinformationen im Tab "Auswahl"
    storeNameOfUploadedFileUploaderAuswahlBauinformationen: function(info) {
      // console.log(info.files[0]);
      console.log(
        "In storeNameOfUploadedFileUploaderAuswahlBauinformationen- info.files[0].name: ",
        info.files[0].name
      ); // File Name aus dem Upload

      // ACHTUNG: Hier noch kein Abspeichern in der Datenbank wie beim UploaderUebersichtBauinformationen
      // Nur Update des internen Links am UI in ausgewaehlteBauinformation.internerLink
      // Auch diesen Update der Property nicht mit regulärer Zuweisung, sondern mit Vue $set, sonst aktualisiert Vue nicht das v-model!!

      console.log("info.xhr: ", info.xhr); // NEU
      // console.log("info.xhr.response.id: ", info.xhr.response.id); // Ist leider undefined, id muss daher geparsed werden aus dem Response Text:

      const idOfUploadedFile = JSON.parse(info.xhr.responseText).id;
      console.log("idOfUploadedFile: ", idOfUploadedFile);
      this.ausgewaehlteBauinformation.idInternerLink = idOfUploadedFile;

      const slugNameOfUploadedFile = JSON.parse(info.xhr.responseText)
        .slugFileName;
      console.log("slugNameOUploadedFile: ", slugNameOfUploadedFile);

      // ALT: (für lokales Deployment)
      /*
      this.$set(
        this.ausgewaehlteBauinformation,
        "internerLink",
        "statics/pdfs/" + info.files[0].name
      );
      */
      // NEU (für lokales und Heroku Cloud Deployment - slugified File Name abspeichern zur späteren Anzeige des Files, wie oben geparsed aus der Response)
      // HINWEIS: $set wie im alten Code ist hier wohl nicht unbedingt notwendig, sicherheitshalber aber verwendet
      this.$set(
        this.ausgewaehlteBauinformation,
        "internerLink",
        slugNameOfUploadedFile
      );
      // this.submitAusgewaehlteBauinformationAusQForm(); // ACHTUNG: Hier noch kein Abspeichern in der Datenbank wie beim UploaderUebersichtBauinformationen
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für QUploader uploaderNeuBauinformationen im Tab "Neu"
    storeNameOfUploadedFileUploaderNeuBauinformationen: function(info) {
      // console.log(info.files[0]);
      console.log(
        "In storeNameOfUploadedFileUploaderNeuBauinformationen- info.files[0].name: ",
        info.files[0].name
      ); // File Name aus dem Upload

      // ACHTUNG: Hier noch kein Abspeichern in der Datenbank wie beim UploaderUebersichtBauinformationen
      // Nur Update des internen Links am UI in neueBauinformation.internerLink
      // ACHTUNG: Auch diesen Update der Property nicht mit regulärer Zuweisung, sondern mit Vue $set, sonst aktualisiert Vue nicht das v-model!!

      console.log("info.xhr: ", info.xhr); // NEU
      // console.log("info.xhr.response.id: ", info.xhr.response.id); // Ist leider undefined, id muss daher geparsed werden aus dem Response Text:

      const idOfUploadedFile = JSON.parse(info.xhr.responseText).id;
      console.log("idOfUploadedFile: ", idOfUploadedFile);
      this.neueBauinformation.idInternerLink = idOfUploadedFile;

      const slugNameOfUploadedFile = JSON.parse(info.xhr.responseText)
        .slugFileName;
      console.log("slugNameOUploadedFile: ", slugNameOfUploadedFile);

      // ALT: (für lokales Deployment)
      /*
      this.$set(
        this.neueBauinformation,
        "internerLink",
        "statics/pdfs/" + info.files[0].name
      );
      */
      // NEU (für lokales und Heroku Cloud Deployment - slugified File Name abspeichern zur späteren Anzeige des Files, wie oben geparsed aus der Response)
      // HINWEIS: $set wie im alten Code ist hier wohl nicht unbedingt notwendig, sicherheitshalber aber verwendet
      this.$set(
        this.neueBauinformation,
        "internerLink",
        slugNameOfUploadedFile
      );
      // this.createNeueBauinformationAusQForm(); // ACHTUNG: Hier noch kein Abspeichern in der Datenbank wie beim UploaderUebersichtBauinformationen
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion, um für Uploader 1 vor File Upload für internen Link im Feld "internerLink" zu prüfen, ob für die ausgewählte Bauinformation
    // das Feld "internerLink" schon gesetzt wurde, und falls ja, eine Warnung auszugeben mit Bestätigung, ohne diese
    // Bestätigung muss der Q-Uploader resetted werden, mittels Methode reset, ansonsten kann der Upload geschehen.
    // Hat als Parameter Array files der ausgewählten Files zum Hochladen, laut https://quasar.dev/vue-components/uploader
    // ACHTUNG: Wird bei @added Event aufgerufen - dies funktioniert nicht, wenn Umlaut im Methodennamen!
    bestaetigungFallsInternerLinkDefiniertUploaderUebersichtBauinformationen: function(
      files
    ) {
      console.log(
        "In bestaetigungFallsInternerLinkDefiniertUploaderUebersichtBauinformationen - files[0].name: ",
        files[0].name
      ); // File Name für Upload

      console.log(
        "selectedRowsTableBauinformationen[0].internerLink: ",
        this.selectedRowsTableBauinformationen[0].internerLink
      );

      if (this.selectedRowsTableBauinformationen[0].internerLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadInternerLinkBauinformationenAusQTable = true;
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für QUploader uploaderAuswahlBauinformationen
    bestaetigungFallsInternerLinkDefiniertUploaderAuswahlBauinformationen: function(
      files
    ) {
      console.log(
        "In bestaeigungFallsInternerLinkDefiniertUploaderAuswahlBauinformationen - files[0].name: ",
        files[0].name
      ); // File Name für Upload

      if (this.ausgewaehlteBauinformation.internerLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadInternerLinkAusgewaehlteBauinformation = true;
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für QUploader uploaderNeuBauinformationen
    bestaetigungFallsInternerLinkDefiniertUploaderNeuBauinformationen: function(
      files
    ) {
      console.log(
        "In bestaeigungFallsInternerLinkDefiniertUploaderNeuBauinformationen - files[0].name: ",
        files[0].name
      ); // File Name für Upload

      if (this.neueBauinformation.internerLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadInternerLinkNeueBauinformation = true;
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion, um für OneDrive Uploader vor File Upload für OneDrive Link im Feld "oneDriveLink" zu prüfen, ob für die ausgewählte Bauinformation
    // das Feld "oneDriveLink" schon gesetzt wurde, und falls ja, eine Warnung auszugeben mit Bestätigung, ohne diese
    // Bestätigung muss der Q-Uploader resetted werden, mittels Methode reset, ansonsten kann der Upload geschehen.
    // Hat als Parameter Array files der ausgewählten Files zum Hochladen, laut https://quasar.dev/vue-components/uploader
    // ACHTUNG: Wird bei @added Event aufgerufen - dies funktioniert nicht, wenn Umlaut im Methodennamen!
    bestaetigungFallsOneDriveLinkDefiniertUploaderUebersichtBauinformationen: function() {
      console.log(
        "In bestaetigungFallsOneDriveLinkDefiniertUploaderUebersichtBauinformationen()"
      );

      console.log(
        "selectedRowsTableBauinformationen[0].oneDriveLink: ",
        this.selectedRowsTableBauinformationen[0].oneDriveLink
      );

      if (this.selectedRowsTableBauinformationen[0].oneDriveLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadOneDriveLinkBauinformationenAusQTable = true;
      } else {
        // this.confirmUploadOneDriveLinkBauinformationenAusQTable = false;
        this.oneDrivePickerOpen("share"); // OneDrive File Picker öffnen
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für OneDrive File Picker in ausgewählter Bauinformation
    bestaetigungFallsOneDriveLinkDefiniertUploaderAuswahlBauinformationen: function() {
      console.log(
        "In bestaeigungFallsOneDriveLinkDefiniertUploaderAuswahlBauinformationen()"
      );

      if (this.ausgewaehlteBauinformation.oneDriveLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadOneDriveLinkAusgewaehlteBauinformation = true;
      } else {
        // this.confirmUploadOneDriveLinkAusgewaehlteBauinformation = false;
        this.oneDrivePickerOpen("share"); // OneDrive File Picker öffnen
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion für OneDrive File Picker in neuer Bauinformation
    bestaetigungFallsOneDriveLinkDefiniertUploaderNeuBauinformationen: function() {
      console.log(
        "In bestaeigungFallsOneDriveLinkDefiniertUploaderNeuBauinformationen()"
      );
      if (this.neueBauinformation.oneDriveLink != null) {
        // Warnung mit Confirmation anstoßen:
        this.confirmUploadOneDriveLinkNeueBauinformation = true;
      } else {
        this.confirmUploadOneDriveLinkNeueBauinformation = false;
        this.oneDrivePickerOpen("share"); // OneDrive File Picker öffnen
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Funktion, um QUploader uploaderUebersichtBauinformationen zu resetten
    // HIWEIS: Mit this.$refs.uploader.reset() kann man den kompletten QUploader resetten, erfolgreich getestet unten!
    // HINWEIS: Mit this.$refs.uploader.removeFile(file) kann man einzelne Files removen aus der Upload Liste!
    // Siehe Code in https://forum.quasar-framework.org/topic/3759/q-uploader-with-factory-function/4
    resetUploaderUebersichtBauinformationen: function() {
      console.log("In resetUploaderUebersichtBauinformationen");

      this.$refs.uploaderUebersichtBauinformationen.reset(); // Issue reset of q-uploader through API
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion, um QUploader uploaderAuswahlBauinformationen zu resetten
    resetUploaderAuswahlBauinformationen: function() {
      console.log("In resetUploaderAuswahlBauinformationen");

      this.$refs.uploaderAuswahlBauinformationen.reset(); // Issue reset of q-uploader through API
    },

    //------------------------------------------------------------------------------------------------------------------------------
    // Selbe Funktion, um QUploader uploaderAuswahlBauinformationen zu resetten
    resetUploaderNeuBauinformationen: function() {
      console.log("In resetUploaderNeuBauinformationen");

      this.$refs.uploaderNeuBauinformationen.reset(); // Issue reset of q-uploader through API
    },

    //----------------------------------------------------------------------------------------------------------------------------
    // NEU: Neue Factory Function für q-uploader, um Authorization Header mit JWT Token mitgeben zu können und damit 401 Fehler
    // mit den bisherigen q-uploaders ohne Factory Function (bei Aktivierung von JWT Authorisierung am Frontend und Backend)
    // zu eliminieren!!!
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

    //---------------------------------------------------------------------------------------------------------------------
    // NEU: Methode, um Upload Header für q-uploader (:header="getUploadHeader())") zu bestimmen
    // Funktioniert zusammen mit :header Prop am q-uploader
    // Funktioniert leider so NICHT, es kommen damit immmer noch 401 Fehler!! Daher disabled
    //---------------------------------------------------------------------------------------------------------------------
    /*
    getUploadHeader: function() {
      console.log("In getUploadHeader");
      const myJWTToken = localStorage.getItem("jwtToken");
      console.log("jwtToken: ", myJWTToken);
      // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
      // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
      const headers = [
        // { name: "Content-Type", value: "application/json" },
        { name: "Authorization", value: "bearer " + myJWTToken }
      ];
      return headers;
    },
    */

    //------------------------------------------------------------------------------------------------------------------------------
    // ALT: Frühere Factory Funktion für QUploaderUebersichtBauinformationen
    // Aktuell disabled, scheint nicht ausgeführt zu werden bzw. wird nicht gebraucht!
    // Achtung, Signatur hat sich geändert zwischen Quasar 0.x und 1.x
    // Siehe https://quasar.dev/vue-components/uploader
    // sowie https://stackoverflow.com/questions/53899220/quasar-quploader-failed-upload-with-upload-fcatory
    // Siehe https://forum.quasar-framework.org/topic/4600/how-to-deal-with-added-event-method-in-q-uploader/4
    /*
    factoryFunctionForUploaderUebersichtBauinformationen: function(files) {
      return new Promise((resolve, reject) => {
        // resolve(file); // Aus obigem SO-Link, funktioniert, zusammen mit function(file, updateProgress)!
        // resolve(); // Funktioniert AUCH, zusammen mit function(file, updateProgress)! Siehe https://forum.quasar-framework.org/topic/3759/q-uploader-with-factory-function/5
        resolve(files); // Funktioniert AUCH, zusammen mit function(files, updateProgress)!
      });
    },
    */

    //------------------------------------------------------------------------------------------------------------------------------
    openAuswahlTabBauinformationen() {
      // Initialisiere dediziertes v-model ausgewaehlteBauinformation
      // für tabBauinformationAuswahl mit den Daten der ausgewählten Row in der q-table in tabBauinformationen
      // console.log("In openAuswahlTabBauinformationen()");
      this.ausgewaehlteBauinformation = Object.assign(
        {},
        this.getSelectedBauinformation() // Obige Funktion
      );
      // ACHTUNG: Ohne Object Assign, mit einfachem this.ausgewaehlteBauinformation = this.getSelectedBauinformation()
      // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
      // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d

      // Öffne q-tab-panel über v-model für die QTab Panels
      this.tabBauinformationen = "auswahlTabBauinformationen";

      // NEU: Initialisiere zusätzlich die Arrays für das QSelect zur Zuordnung von Autoren:
      this.initialisiereSelectModelUndOptionsUndFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation();

      // NEU: Zeige Benutzernachricht, wenn Benutzer nicht zum Bearbeiten berechtigt ist:
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
          "Mitarbeiter" &&
        !this.ausgewaehlteBauinformation.benutzerKennungenAutoren.includes(
          this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
        )
      ) {
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATION_AENDERUNG_KEINE_BERECHTIGUNG
        );
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------
    openNeuTabBauinformationen() {
      // Initialisiere dediziertes v-model neueBauinformation
      // für tabBauinformationNeu mit leerer Bauinformation
      this.neueBauinformation = Object.assign({}, this.leereBauinformation);
      // ACHTUNG: Ohne Object Assign, mit einfachem this.neueBauinformation = this.leereBauinformation
      // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
      // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d

      // Öffne q-tab-panel über v-model für die QTab Panels
      this.tabBauinformationen = "neuTabBauinformationen";
    },

    //-----------------------------------------------------------------------------------------------------------------------------
    createNeueBauinformationAusQForm() {
      console.log("In createNeueBauinformationAusQForm vor HTTP Post Request");
      // ALT: http.post("/api/bauinformationen/createBauinformation", this.neueBauinformation)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      // NEU: TODO XXXXXX - Array benutzerKennungenAutoren mit [localStore.anmeldeDatenBenutzer.eMail] initialisieren (Benutzerkennung des Erstellers)
      if (
        this.neueBauinformation.bauinformationsBezeichnung == null ||
        this.neueBauinformation.bauinformationsBezeichnung === ""
      ) {
        console.log(
          "Bezeichnung der neuen Bauinformation ist leer - kann so nicht abgespeichert werden"
        );
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BEZEICHNUNG_ERFORDERLICH
        );
        return;
      }
      const apiRoute = process.env.API + "/Bauinformationen";
      // NEU: Array-Feld benutzerKennungenAutoren hinzufügen mit Benutzerkennung des aktuell angemeldeten Benutzers
      this.neueBauinformation.benutzerKennungenAutoren = [
        this.localStore.state.anmeldeDatenBenutzer.eMailBenutzer
      ];
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBauinformationen'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationen"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationen'");
      //=========================================================================================================================================
      this.$axios
        .post(apiRoute, this.neueBauinformation)
        // ACHTUNG: Ein Objekt in selectedRowsTableBauinformationen enthält auch ein Feld __index (von Mongoose hinzugefügt)
        .then(response => {
          // ACHTUNG: Request Body bleibt unverändert bei post-Requests, nur Response kommt, wenn so programmiert im Controller, zurück!!!
          console.log(
            "In createNeueBauinformationausQForm nach HTTP Post für Create Bauinformation - response.data:",
            response.data
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_NEUANLAGE_ERFOLG
          );
          this.neueBauinformation._id = response.data._id; // _id der neuen Bauinformation hinzufügen
          this.dataTableBauinformationen.push(this.neueBauinformation); // Neue Bauinformation zum v-model der q-table hinzufügen
        })
        .catch(error => {
          console.log("error: ", error);
          if (error.response.status === 403) {
            console.log(
              "Error 403 von HTTP Post für Create Bauinformation - Bauinformation mit dieser Bezeichnung existiert bereits"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATION_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS
            );
          }
          // TODO XXXXXX: Andere Errors, z.B. 500 (z.B. Mongoose Validation Error, kommt z.B. bei fehlendem required Feld, wie hier z.B. bauinformationsBezeichnung und bauinformationsTyp)
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------
    submitAusgewaehlteBauinformationAusQForm() {
      // NEU: TODO XXXXXX - QSelect-Feld auf neuem Array-Feld ausgewaehlteBauinformation.benutzerKennungenAutoren
      // Dessen Model muss befüllt werden aus dem entsprechenden Feld in der Datenbank (selection="multiple")
      // Dessen Options müssen alle Benutzerkennungen aus der Datenbank sein (Feld benutzerKennung in BenutzerModel)
      // Dazu neue API-Methode in benutzer.controller.js readBenutzerKennungenBenutzer (/Benutzer/Benutzerkennungen), welche
      // alle Benutzerkennungen von verifizierten (und ggf. aktiven - weiteres Feld im BenutzerModel?) Benutzern per findAll zurückliefern sollte
      // Der Array benutzerKennungenAutoren sollte normalerweise nicht leer sein (sonst darf nur noch ein Administrator oder Redakteuer die Bauinformation bearbeiten)
      // Das Speichern im Tab "Bearbeiten" für eine Bauinformation sollte dann disabled werden, wenn der aktuell angemeldete Benutzer nicht
      // in diesem Array enthalten ist:
      // :disable="disable = "!ausgewaehlteBauinformation.benutzerKennungenAutoren.includes(localStore.state.anmeldeDatenBenutzer.eMailBenutzer"
      // In diesem Fall darf der angemeldete Benutzer die Bauinformation zwar anschauen, aber nicht ändern!
      // Dasselbe Prinzip gilt für das Löschen der Bauinformation
      var body = {
        // Lokale Variable zur Aufbereitung des Objekts, das dem Put Request mitgegeben werden könnte
        // Hier aktuell nicht verwendet, stattdessen unten direkt die richtigen Werte per this.ausgewaehlteBauinformation angegeben
        // als Parameter für http put.
        // Verwendet Chaining Syntax - diese ist möglich bei .http Befehlen (Express, z.B. .put .then .catch ) und Mongoose APIs
        // (z.B. .find .then .catch)
        _id: this.ausgewaehlteBauinformation._id // Hinweis: Kann im UI nicht geändert worden sein, da kein q-input Feld!!!
        // Weitere Felder wären entsprechend hier anzugeben, aus selectedRowsTableBauinformationen[]
        // ACHTUNG: Hier nicht angegebene Felder werden in der Datenbank einfach auf "null" gesetzt, wenn keine besonderen Vorkehrungen dafür am Backend getroffen sind!
      };
      console.log(
        "In submitAusgewaehlteBauinformationAusQForm vor HTTP Put Request - id: ",
        this.ausgewaehlteBauinformation._id
      );
      // NEU: Prüfen, ob die neue Bauinformationsbezeichnung leer ist
      // Falls ja, Fehlermeldung
      // Falls nein, fortfahren
      if (
        this.ausgewaehlteBauinformation.bauinformationsBezeichnung == null ||
        this.ausgewaehlteBauinformation.bauinformationsBezeichnung === ""
      ) {
        console.log(
          "Bezeichnung der ausgewählten Bauinformation ist leer - kann so nicht abgespeichert werden"
        );
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BEZEICHNUNG_ERFORDERLICH
        );
        return;
      }
      // NEU: Prüfen, ob die Bauinformationsbezeichnung sich geändert hat:
      // Falls nein, nichts zu tun, fortfahren
      // Falls ja, prüfen, ob die neue Bezeichnung schon vergeben ist
      //   Falls ja, Fehlermeldung
      //   Falls nein, fortfahren mit Abspeichern der ausgewählten Bauinformation
      let apiRoute = process.env.API + "/Bauinformationen/Extrakt";
      this.$axios
        .get(apiRoute)
        .then(response => {
          console.log(
            "In submitAusgewaehlteBauinformationenAusQForm nach HTTP Get Request für Read Extrakt aller Bauinformationen - response.data: ",
            response.data
          );
          // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
          if (response.data === []) {
            console.log(
              "WARNUNG: Keine Bauinformationen vorhanden - d.h. die ausgewählte Bauinformation muss inzwischen gelöscht worden sein"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BAUINFORMATION_GELOESCHT
            );
            return;
          }
          // Filtere aus allen Bauinformationen ggf. diejenige heraus, deren Bezeichnung der (eventuell geänderten) Bauinformationsbezeichnung entspricht
          var extraktBauinformationenMitSelberBezeichnung = response.data.filter(
            element =>
              element.bauinformationsBezeichnung ===
              this.ausgewaehlteBauinformation.bauinformationsBezeichnung
          );
          console.log(
            "extraktBauinformationenMitSelberBezeichnung: ",
            extraktBauinformationenMitSelberBezeichnung
          );
          // Array, enthält ggf. alle Bezeichnungen von Bauinformationen, die dieselbe Bezeichnung wie die (eventuell geänderte) ausgewählte Bauinformation haben
          // Dieser Array muss 0 oder 1 Element enthalten, bei 0 wurde eine geänderte Bezeichnung gewählt, die noch nicht vergeben ist, dann fortfahren
          if (extraktBauinformationenMitSelberBezeichnung.length > 0) {
            // Bei Länge 1 muss Array die ausgewählte Bauinformation oder eine andere mit derselben Bezeichnung enthalten
            if (
              extraktBauinformationenMitSelberBezeichnung[0]._id !==
              this.ausgewaehlteBauinformation._id
            ) {
              // Eine andere Bauinformation existiert mit derselben (geänderten) Bezeichnung
              console.log(
                "Die geänderte Bauinformationsbezeichnung ist bereits vergeben"
              );
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
              return;
            } // else {} // Keine andere Bauinformation existiert mit derselben (geänderten) Bezeichnung, dann fortfahren mit Abspeichern der Änderungen
          } // else {} // bei length 0 wurde eine geänderte Bezeichnung gewählt, die noch nicht vergeben ist, dann fortfahren mit Abspeichern der Änderungen
          //--------------------------------------------------------------------------------------------------------------------------
          // NEU: Das eventuell geänderte QSelect-Feld zur Zuordnung von Autoren mit abspeichern im Feld benutzerKennungenAutoren
          // HINWEIS: Wegen emit-value Prop am QSelct muss das Feld benutzerKennung hier NICHT extrahiert werden aus dem Array der selected Objects!
          // Dies ginge mit this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation.map(a => a.benutzerKennung);
          // Siehe dazu https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
          this.ausgewaehlteBauinformation.benutzerKennungenAutoren = this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation;
          console.log(
            "ausgewaehlteBauinformation.benutzerKennungenAutoren: ",
            this.ausgewaehlteBauinformation.benutzerKennungenAutoren
          );
          //---------------------------------------------------------------------------------------------------------------------------
          apiRoute =
            process.env.API +
            "/Bauinformationen/" +
            this.ausgewaehlteBauinformation._id;
          //=========================================================================================================================================
          // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
          // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
          console.log("Vor Emit to leave room 'roomBauinformationen'");
          this.$socket.emit("leaveRoom", {
            room: "roomBauinformationen"
          }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
          console.log("Nach Emit to leave room 'roomBauinformationen'");
          //=========================================================================================================================================
          this.$axios
            .put(apiRoute, this.ausgewaehlteBauinformation)
            // ACHTUNG: Ein Objekt in selectedRowsTableBauinformationen enthält auch ein Feld __index (von Quasar hinzugefügt???)
            .then(response => {
              // ACHTUNG: Request Body bleibt unverändert bei put-Requests, nur response kommt, wenn so programmiert im Controller, zurück!!!
              console.log(
                "In submitAusgewaehlteBauinformationAusQForm nach HTTP Put Request für Update Bauinformation - response.data: " +
                  response.data
              );
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_AENDERUNG_ERFOLG
              );
              // Dann die Bauinformationen neu laden vom Backend
              // TODO: Statt Backend Call, der den ganzen Array neu lädt, mit Array Methoden (wegen "Vue Array Pitfall) das per _id identifizierbare geänderte Objekt
              // auch in dataTableBauinformationen ändern, analog zum Push in createNeueBauinformation oben
              // ALT: http.get("/api/bauinformationen/readBauinformationen/")
              // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
              apiRoute = process.env.API + "/Bauinformationen";
              this.$axios
                .get(apiRoute)
                .then(response => {
                  console.log(
                    "In submitAusgewaehlteBauinformationenAusQForm nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                    response.data
                  );
                  // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
                  if (response.data === []) {
                    console.log(
                      "WARNUNG: Keine Bauinformationen vorhanden - d.h. die ausgewählte Bauinformation muss inzwischen gelöscht worden sein"
                    );
                    globalStore.showBenutzerNachricht(
                      BenutzerNachrichten.BAUINFORMATION_AENDERUNG_BAUINFORMATION_GELOESCHT
                    );
                    return;
                  }
                  // v-model von q-table zurücksetzen:
                  this.dataTableBauinformationen = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird

                  // Reset von selectedRowsTableBauinformationen - wird (per Test) NICHT automatisch von Quasar gemacht
                  // Erschien anfangs überflüssig, es stellte sich aber nach neueren Tests heraus, dass die selektierte Row nach dem Reload der Table oben
                  // zwar korrekt war, deren Inhalt aber nicht die ggf. geänderten Daten aus dataTableBauinformationen
                  // beinhaltete (z.B. nach einer Änderung im Tab "Auswahl").
                  // (Hinweis: Dabei ist die Auswahl des Elements innerhalb der neue geladenen dataTableBauinformationen
                  // nach wie vor korrekt, wahrscheinlich weil der Key dafür die _id ist, und diese sich nicht ändert bei einem Update einer Zeile)
                  // Daher selectedRowsTableBauinformationen[0] nun ebenfalls neu laden, per Index in die neu geladenen dataTableBauinformationen:
                  // Finde zunächst den Index des Array-Elements in dataTableBauinformationen, dessen _id identisch ist mit der _id in selectedRowsTableBauinformationen:
                  var indexOfSelectedRow = this.dataTableBauinformationen.findIndex(
                    value => {
                      if (
                        value._id ===
                        this.selectedRowsTableBauinformationen[0]._id
                      ) {
                        return true;
                      }
                    }
                  );
                  console.log("indexOfSelectedRow: ", indexOfSelectedRow)
                  /*
                  this.selectedRowsTableBauinformationen[0] = this.dataTableBauinformationen[
                    indexOfSelectedRow
                  ];
                  */
                  // Werte nun neu setzen mit den Werten aus dataTableBauinformationen
                  // ALT: Brute Force Lösung Per Zurücksetzen des ausgewählten Zeile in der q-table:
                  // Den Call ursprünglich sicherheitshalber hinter den ersten v-model Update verschoben, damit Quasar nicht durcheinanderkommt
                  // this.selectedRowsTableBauinformationen = []; // Deselektiert die Row auch in q-table
                  // Diese Art des Assignments des Arrays ist okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
                  //----------------------------------------------------------------------------------------------------------------------
                  // NEU - #382 - obiger Update ist wohl doch nicht reaktiv, da die computed-Funktionen für die
                  // Anzeige der Buttons zum Öffnen von Links offenbar nicht neu ausgewertet werden!
                  // Daher disabled und ersetzt mit Array-push:
                  this.selectedRowsTableBauinformationen = [];
                  this.selectedRowsTableBauinformationen.push(this.dataTableBauinformationen[
                      indexOfSelectedRow]
                    )
                  console.log(
                    "In submitAusgewaehlteBauinformationenAusForm nach HTTP Get Request für Read aller Bauinformationen: _id der ersten Zeile in der q-table: " +
                      this.dataTableBauinformationen[0]._id +
                      " bauinformationsBezeichnung: " +
                      this.dataTableBauinformationen[0]
                        .bauinformationsBezeichnung +
                      " bauinformationsTyp: " +
                      this.dataTableBauinformationen[0].bauinformationsTyp +
                      " bauinformationsBemerkung: " +
                      this.dataTableBauinformationen[0].bauinformationsBemerkung
                  );
                  console.log("selectedRowsTableBauinformationen[0].oneDriveLink: ", this.selectedRowsTableBauinformationen[0].oneDriveLink)
                })
                .catch(error => {
                  console.log(error);
                  globalStore.showBenutzerNachricht(
                    BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
                  );
                });
            })
            .catch(error => {
              console.log(error);
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_AENDERUNG_FEHLER
              );
            });
        })
        .catch(error => {
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
          );
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------
    submitAusgewaehlteBauinformationAusQTable() {
      // Diese Variante des Puts wird aktuell nur verwendet, um für die ausgewählte Bauinformation in der QTable für die Bauinformationen
      // das bei File Upload zu setzende Feld "internerLink" in der Datenbank upzudaten.
      var body = {
        // Lokale Variable zur Aufbereitung des Objekts, das dem Put Request mitgegeben wird
        // Wird aktuell nicht verwendet, stattdessen unten direkt die richtigen Werte per thisselectedRowsTableBauinformationen[0] angegeben als Parameter für http put
        // Verwendet Chaining Syntax - diese ist möglich bei .http Befehlen (Express, z.B. .put .then .catch ) und Mongoose APIs
        // (z.B. .find .then .catch)
        // _id: this.selectedRowsTableBauinformationen[0]._id, // Hinweis: Kann im UI nicht geändert worden sein, da kein q-input Feld!!!
        internerLink: this.selectedRowsTableBauinformationen[0].internerLink
        // Weitere upzudatende Felder wären bei Bedarf entsprechend hier anzugeben, aus selectedRowsTableBauinformationen[0]
        // ACHTUNG: Hier nicht angegebene Felder werden in der Datenbank einfach auf "null" gesetzt, wenn keine besonderen Vorkehrungen
        // dafür am Backend getroffen sind!
      };
      console.log(
        "In submitAusgewaehlteBauinformationAusQTable vor HTTP Put Request für Update Bauinformation"
      );
      // ALT: http.put "/api/bauinformationen/updateBauinformationByBauinformationId/" + this.selectedRowsTableBauinformationen[0]._id
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      var apiRoute =
        process.env.API +
        "/Bauinformationen/" +
        this.selectedRowsTableBauinformationen[0]._id;
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBauinformationen'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationen"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationen'");
      //=========================================================================================================================================
      this.$axios
        .put(apiRoute, this.selectedRowsTableBauinformationen[0])
        // Der Einfachheit halber wird das ganze Objekt rübergeschickt, obwohl nur das Feld "internerLink" geändert worden sein kann!
        // ACHTUNG: Ein Objekt in selectedRowsTableBauinformationen enthält z.B. auch ein Feld __index (von Mongoose hinzugefügt)
        .then(response => {
          // ACHTUNG: Request Body bleibt unverändert bei put-Requests, nur response kommt, wenn so programmiert im Controller, zurück!!!
          console.log(
            "In submitAusgewaehlteBauinformationAusQTable nach HTTP Put Request für Update Bauinformation - response.data: " +
              response.data
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_AENDERUNG_ERFOLG
          );

          /* Neues Laden der Bauinformationen aus dem Backend ist in diesem Fall nicht notwendig! */
          /*
          // Dann die Bauinformationen neu laden vom Backend
          // TODO: Statt Backend Call, der den ganzen Array neu lädt, mit Array Methoden (wegen "Vue Array Pitfall) das per _id identifizierbare geänderte Objekt
          // auch in dataTableBauinformationen ändern, analog zum Push in createNeueBauinformation oben
          this.$axios
            // ALT: http.get("/api/bauinformationen/readBauinformationen/")
            // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
            apiRoute =
              process.env.API + "/Bauinformationen";
            .get(apiRoute")
            .then(response => {
              console.log(
                "In submitAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                response.data
              );
              // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
              if (response.data === []) {
                return;
              }
              // v-model von q-table zurücksetzen:
              this.dataTableBauinformationen = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird

              // Reset von selectedRowsTableBauinformationen - wird (per Test) nicht automatisch von Quasar gemacht
              // Ist aber (per Test) überflüssig, da die selektierte Row auch nach dem Reload der Table oben noch korrekt funktioniert!!!
              // Den Call ursprünglich sicherheitshalber hinter den ersten v-model Update verschoben, damit Quasar nicht durcheinanderkommt
              // this.selectedRowsTableBauinformationen = []; // Deselektiert die Row auch in q-table
              // Diese Art des Assignments des Arrays ist okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird

              console.log(
                "In submitAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für Read aller Bauinformationen: _id der ersten Zeile in der q-table: " +
                  this.dataTableBauinformationen[0]._id +
                  " bauinformationsBezeichnung: " +
                  this.dataTableBauinformationen[0].bauinformationsBezeichnung +
                  " bauinformationsTyp: " +
                  this.dataTableBauinformationen[0].bauinformationsTyp +
                  " bauinformationsBemerkung: " +
                  this.dataTableBauinformationen[0].bauinformationsBemerkung
              );
            })
            .catch(error => {
              console.log(error);
          });
          */
        })
        .catch(error => {
          console.log(
            "Fehler beim Abspeichern des internen Links in Bauinformation"
          );
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_AENDERUNG_FEHLER
          );
        });
    },

    //------------------------------------------------------------------------------------------------------------------------------
    cancelAusgewaehlteBauinformationAusQForm() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Die ausgewählte Bauinformation nach evtl. Benutzereingaben zurücksetzen auf ihre Originalwerte (aus der Datenbank)
      // Damit gab es wegen der Kopplung an die in der q-table ausgewählte Row jedoch Probleme.
      // Workaround: Daher diese Methode zunächst reduziert auf Reset von ausgewaehlteBauinformation und Ausblenden des Tabs per v-if
      // Erst nach Korrektur dieses Bugs (Fehler beim Cloning von selectedRowsTableBauinformationen[0] nach ausgewaehlteBauinformation)
      // diese Methode umgestellt auf Reset von ausgewaehlteBauinformation
      // ACHTUNG: Reset auf selectedRowTableBauinformationen[0], wo die Originalwerte nach Korrektur des obigen Bugs noch enthalten sind,
      // funktioniert in vielen Fällen auch, nicht aber in dem Fall,
      // wo in der q-table mittlerweile eine andere Row selektiert wurde als die im zweiten Tab angezeigte und dann per
      // Klick auf das Tab das zweite Tab angewählt wird und dann "Abbrechen" gedrückt wird!!!
      // Daher Alternative gewählt mit Reload per get aus der Datenbank mit der (unveränderten) _id.
      // HINWEIS: dataTableBaubestimmugnen und selectedRowsTableBauinformationen behalten nach dem Cancel weiter ihre Gültigkeit!

      // NEU: Reload aus der Datenbank:
      console.log(
        "In cancelAusgewaehlteBauinformationAusQForm - ausgewählte Bauinformation auf selectedRowTableBauinformationen[0] zurücksetzen"
      );
      // ALT: http.get("/api/bauinformationen/readBauinformationByBauinformationId/" + this.ausgewaehlteBauinformation._id)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      const apiRoute =
        process.env.API +
        "/Bauinformationen/" +
        this.ausgewaehlteBauinformation._id;
      this.$axios
        .get(apiRoute)
        .then(response => {
          console.log(
            "In cancelAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read Bauinformation - response.data: ",
            response.data
          );
          // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
          if (response.data === []) {
            console.log(
              "WARNUNG: Keine Bauinformationen vorhanden - d.h. die zurückzusetzende Bauinformation muss inzwischen gelöscht worden sein"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUINFORMATION_ZURUECKSETZEN_BAUINFORMATION_GELOESCHT
            );
            return;
          }
          // v-model von q-table zurücksetzen:
          this.ausgewaehlteBauinformation = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
          this.selectModelBenutzerKennungenAutorenAusgewaehlteBauinformation =
            response.data.benutzerKennungenAutoren; // NEU: Select Model zurücksetzen

          console.log(
            "In cancelAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read Bauinformation: _id der Bauinformation: " +
              this.ausgewaehlteBauinformation._id +
              " bauinformationsBezeichnung: " +
              this.ausgewaehlteBauinformation.bauinformationsBezeichnung +
              " bauinformationsTyp: " +
              this.ausgewaehlteBauinformation.bauinformationsTyp +
              " bauinformationsBemerkung: " +
              this.ausgewaehlteBauinformation.bauinformationsBemerkung
          );

          // HINWEIS: Hier vorläufig keine Benutzernachricht!
        })
        .catch(error => {
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_LESEN_FEHLER
          );
        });

      // ALT: Falsch in bestimmten Fällen, siehe oben:
      /*
      console.log(
        "In cancelAusgewaehlteBauinformationAusQForm - ausgewählte Bauinformation auf selectedRowTableBauinformationen[0] zurücksetzen"
      );
      this.ausgewaehlteBauinformation = Object.assign(
        {},
        this.getSelectedBauinformation()
      );
      */

      // ACHTUNG: Ohne Object Assign, mit einfachem this.ausgewaehlteBauinformation = this.getSelectedBauinformation()
      // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
      // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d
      // Öffne q-tab-panel über v-model für die QTab Panels

      // ALT (Workaround):
      /*
      console.log(
        "In cancelAusgewaehlteBauinformationAusQForm - ausgewählte Bauinformation auf leeres Objekt setzen"
      );
      this.ausgewaehlteBauinformation = undefined; // Auf undefined, nicht {} setzen, damit wird auch per v-if das zweite Tab geschlossen
      */

      // ALT: Ursprünglicher Code mit v-model selectedRowsTableBaubestimmugen[0], hatte Probleme (unten genauer beschrieben)
      // Diese waren allerdings vermutlich alle verursacht durch "Vue Array Pitfall" Problem (unten genauer beschrieben)
      // Trotzdem die andere Variante beibehalten, dass das zweite q-tab-panel/q-form auf einem eigenen v-model
      // ausgewaehlteBauinformation unabhängig vom v-model der q-table operiert
      /*
      console.log("In cancelAusgewaehlteBauinformationAusQForm vor HTTP Get Request für Read Bauinformation");
      // ALT: http.get("/api/bauinformationen/readBauinformationByBauinformationId/" + this.selectedRowsTableBauinformationen[0]._id)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      const apiRoute =
        process.env.API + "/Bauinformationen/" +
          this.selectedRowsTableBauinformationen[0]._id;
      this.$axios
        .get(apiRoute)
        .then(responseGetBauinformation => {
          console.log(
            "In cancelAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read Bauinformation - response.data: ",
            responseGetBauinformation.data
          );
          // ACHTUNG: Wegen des Vue Array Pitfalls unten ist folgendes Statement FALSCH:
          // this.selectedRowsTableBauinformationen[0] =
          //    responseGetBauinformation.data; // v-model für eigene Komponente updaten
          // Richtig stattdessen:
          this.selectedRowsTableBauinformationen[0].$set(0, responseGetBauinformation.data );.

          console.log(
            "In cancelAusgewaehlteBauinformationAusQForm nach Zuweisung an selectedRowsTableBauinformationen[0]: ",
            this.selectedRowsTableBauinformationen[0]
          );
          // this.keyAuswahlTabBauinformationen += 1; // Force Re-render von q-tab mit q-form, hat keinen Einfluss

          // ACHTUNG: Notwendig, damit die eigene q-tab-panel Komponente re-rendered - ist :key auf q-tab-panel!!!
          // ACHTUNG: Update von selectedRowsTableBauinformationen alleine reicht nicht für Reload der q-table im ersten Tab
          // mit den Werten vor Cancel!!! Dies ist eventuell auch auf den "Vue Array Pitfall" unten zurückzuführen, weil dabei
          // this.selectedRowsTableBauinformationen[0] direkt gesetzt wurde, was Vue nicht merkt!!!

          // Ein versuchsweise wegen dieses Problems eingeführter :key auf dieser funktionierte auch nicht, wahrscheinlich weil sie aktuell nicht visible ist
          // WICHTIG: Deshalb unten auch alle Bauinformationen neu laden vom Backend (complete Array Replacement ist OK)
          // Anschließend in dataTableBauinformationen abspeichern (v-model Update forced Re-Rendering von q-table)
          // selectedRowTableBauinformationen sorgt dafür, dass diese Row auch nach dem Cancel in q-table richtig selektiert bleibt!!!

          // ACHTUNG: Verbleibendes PROBLEM: Wenn die Anzahl der angezeigten Rows in q-table verringert wird, bleibt trotzdem die
          // Selektion erhalten, die selektierte Row rutscht dann auf eine nicht unmittelbar sichtbare Seite weiter hinten!!!
          // Das gilt immer, unabhängig von Cancel!!!

          // ACHTUNG: Weiteres verbleibendes Problem: Nach dem ersten Cancel auf einer Bauinformation wird diese zwar
          // inklusive q-table korrekt zurückgesetzt, aber es gibt ein Problem mit dem v-model, weitere Änderungen
          // in der q-form dafür werden nicht mehr sofort akzeptiert, sondern erst wenn man das Tab gewechselt hat, d.h. ein
          // weiteres Re-Render passiert!!! Dieses Problem wurde vermutlich durch den "Vue Array Pitfall" verursacht...

          // Vermutliche Ursache: In selectedRowsTableBauinformationen[0] liegt wegen des obigen "Vue Aray Pitfall" Fehlers
          // offenbar immer noch die ursprüngliche Bauinformation mit den Werten vor dem Cancel der Änderungen im zweiten q-tab/q-form.
          // Diese Probleme zunächst ganz umgangen, indem einfach das zweite Tab bei "Abbruch" ganz geschlossen wird (Workaround).

          // Alternative für Cancel (vor Erkenntnis des "Vue Array Pitfalls"):
          // Alternativ müsste man im ersten Tab in der q-table die selected Row programmatisch setzen
          // Dazu müsste man mit indexOf() im Array dataTableBauinformation mit der _id aus selectedRowsTableBauinformationen[0}
          // die richtige Row suchen:
          // 1) _id der gecancelten Bauinformation merken
          // 2) dataTableBauinformationen aus DB neu laden und als Ganzes zuweisen (diese ist der "Master" für das v-model der qtable)
          // 3) Mit der _id aus 1) mittels indexOf() das zugehörige Objekt im Array dataTableBauinformation identifizieren
          // 4) selectedRowsTableBauinformationen = [ Objekt ] (als Ganzes, wegen des Pitfalls unten)
          // Dasselbe könnte vermutlich erreicht werden, indem man obige Zuweisung an selectedRowsTableBauinformationen[0] auf die alten
          // Werte nach der Zuweisung unten an dataTableBauinformationen verschiebt - allerdings muss die Zuweisung wegen des
          // folgenden Pitfalls anders erfolgen.

          // ACHTUNG: Hauptursache für obige Probleme ist vermutlich folgender "Vue Array Pitfall" für alle Operationen
          // auf Vue bzw. Quasar-Arrays!!! Siehe https://vuejs.org/2016/02/06/common-gotchas/:
          // When you modify an Array by directly setting an index (e.g. arr[0] = val) or modifying its length property,
          // Vue.js cannot pickup these changes. Always modify arrays by using an Array instance method, or replacing it entirely.
          // Falsch: selectedRowsTableBauinformationen[0] = this.myObject;
          // Richtig mit Vue Convenience Methode: this.selectedRowsTableBauinformationen[0].$set(0, this.myObject );
          // Siehe auch: https://stackoverflow.com/questions/48809248/vuejs-and-vue-set-update-an-key-value-array

          this.$axios
            // ALT: http.get("/api/bauinformationen/readBauinformationen/")
            // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
            const apiRoute =
              process.env.API + "/Bauinformationen";
            .get(apiRoute)
            .then(responseGetBauinformationen => {
              console.log(
                "In cancelAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                responseGetBauinformationen.data
              );
              // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
              if (responseGetBauinformationen.data == null) {
                return;
              }
              this.dataTableBauinformationen = responseGetBauinformationen.data; // OK, da der Array als Ganzes zugewiesen wird
              // this.keyTabBauinformationÜbersicht += 1; // Jetzt erst: Re-render von q-tab mit q-table!

              console.log(
                "In cancelAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read aller Bauinformationen: _id der ersten Zeile in der q-table: " +
                  this.dataTableBauinformationen[0]._id +
                  " bauinformationsBezeichnung: " +
                  this.dataTableBauinformationen[0].bauinformationsBezeichnung +
                  " bauinformationsTyp: " +
                  this.dataTableBauinformationen[0].bauinformationsTyp +
                  " bauinformationsBemerkung: " +
                  this.dataTableBauinformationen[0].bauinformationsBemerkung
              );
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });

        */ // /ALTer Code
    },

    //------------------------------------------------------------------------------------------------------------------------------
    cancelNeueBauinformationAusQForm() {
      // Die neue Bauinformation nach evtl. Benutzereingaben zurücksetzen auf ihre Grundwerte

      console.log("In cancelNeueBauinformationAusQForm");
      this.neueBauinformation = Object.assign({}, this.leereBauinformation);
      // ACHTUNG: Ohne Object Assign, mit einfachem this.neueBauinformation = this.leereBauinformation
      // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
      // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d

      // Alternativer "Cloning" Code, ohne Object.Assign:
      /*
      this.neueBauinformation.bauinformationsBezeichnung = "Bezeichnung der neuen Bauinformation";
      this.neueBauinformation.bauinformationsTyp = "Sonstige Bauinformation";
      this.neueBauinformation.benutzerKennungenAutoren = []; // NEU!
      this.neueBauinformation.bauinformationsAnzeigeText = null; // NEU!
      this.neueBauinformation.bauinformationsBemerkung = null;
      this.neueBauinformation.herausgeberGeografie = "Sonstige Geografie";
      this.neueBauinformation.herausgeberInstitution = "Sonstige Institution";
      this.neueBauinformation.herausgeberBezeichnung = null;
      this.neueBauinformation.herausgeberBundeslandDeutschland = null;
      this.neueBauinformation.herausgeberBundeslandÖsterreich = null;
      this.neueBauinformation.herausgeberKantonSchweiz = null;
      this.neueBauinformation.gültigkeitsDatumVon = "2019-01-01";
      this.neueBauinformation.gültigkeitsDatumBis = "2022-12-31";
      this.neueBauinformation.normTypDIN = null;
      this.neueBauinformation.normTypÖNORM = null;
      this.neueBauinformation.normTypSN = null;
      this.neueBauinformation.normTypEN = null;
      this.neueBauinformation.normTypISO = null;
      this.neueBauinformation.internerLink = null;
      this.neueBauinformation.externerLink = null;
      this.neueBauinformation.oneDriveLink = null;
      this.neueBauinformation.grundNorm = false;
      this.neueBauinformation.terminologieNorm = false;
      this.neueBauinformation.prüfNorm = false;
      this.neueBauinformation.produktNorm = false;
      this.neueBauinformation.verfahrensNorm = false;
      this.neueBauinformation.dienstleistungsNorm = false;
      this.neueBauinformation.schnittstellenNorm = false;
      this.neueBauinformation.deklarationsNorm = false;
      this.neueBauinformation.fachbereichsNorm = false;
      this.neueBauinformation.werkNorm = false;
      */
    },

    //--------------------------------------------------------------------------------------------------------------
    checkAusgewaehlteBauinformationenAusQTableVorLoeschen() {
      // NEU für Button "Bauinformationen löschen":
      // ALT: Direkter Aufruf des q-dialogs zum Confirm des Löschens, per Setzen des v-models
      // "confirmLoeschenBauinformationenAusQTable = true" am @click für den Button "Bauinformationen löschen",
      // NEU: Zuerst Aufruf dieser Methode, die prüft, ob überhaupt eine Bauinformation ausgewählt ist.
      // HINWEIS: Dies ist neuerdings eigentlich überflüssig, da die Buttons per :disable disabled werden, wenn keine Bauinformation
      // ausgewählt ist.
      // Wenn keine ausgewählt ist, triggered die Methode per v-model zunächst den anderen q-dialog, der einen Hinweis ausgibt,
      // dass eine Bauinformation auszuwählen ist und returned. Ansonsten stösst sie per v-model den vorhandenen q-dialog zum Confirm
      // des Löschens an. Dieser stösst dann bei positivem Confirm die Methode deleteAusgewaehlteBauinformation() an,
      // die das Löschen der ausgewählten Bauinformation durchführt.

      // ACHTUNG: Die ähnliche Prüfung, ob eine Bauinformation ausgewählt ist, erfolgt für den Button "Bauinformation bearbeiten"
      // über einen Watch, der auch ausgewaehlteBauinformation initialisiert, und neuerdings zusätzlich auch über ein :disable am q-tab.

      if (this.selectedRowsTableBauinformationen.length === 0) {
        this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // Hinweis, dass Bauinformation auszuwählen ist
        // return;
      } else {
        this.confirmLoeschenBauinformationenAusQTable = true; // Warnung, ob Bauinformation wirklich gelöscht werden soll und ggf. löschen
      }
    },

    //--------------------------------------------------------------------------------------------------------------
    deleteAusgewaehlteBauinformationenAusQTable() {
      // TODO: Erweitern auf mehrfaches Delete von ausgewählten Rows!!!
      // Bisher wird nur die erste selektierte Row deleted!!!
      var data = {}; // Objekt für Return der gelöschten Bauinformation in der Reponse
      // TODO: Wird dies so gebraucht?? Nach dem Call wird auf response.data, nicht data zurückgegriffen!
      var idGelöschteBauinformation = this.selectedRowsTableBauinformationen[0]
        ._id; // id merken
      console.log(
        "In deleteAusgewaehlteBauinformationenAusQTable vor HTTP Delete Request für Delete Bauinformation"
      );
      this.confirmLoeschenBauinformationenAusQTable = false; // NEU: Sicherheitshalber den Dialog disablen
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBauinformationen'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationen"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationen'");
      //=========================================================================================================================================
      // ALT: http.delete("/api/bauinformationen/deleteBauinformationByBauinformationId/" + this.selectedRowsTableBauinformationen[0]._id, data)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      var apiRoute =
        process.env.API +
        "/Bauinformationen/" +
        this.selectedRowsTableBauinformationen[0]._id;
      this.$axios
        .delete(apiRoute, data)
        .then(response => {
          console.log(
            "In deleteAusgewaehlteBauinformationenAusQTable nach HTTP Delete Request für Delete Bauinformation - response.data: ",
            response.data
          );
          // Dann die Bauinformationen neu laden vom Backend
          // TODO: Alternativ statt Backend Call, der den ganzen Array neu lädt, mit Array Methoden das per _id identifizierbare gelöschte Objekt aus
          // dataTableBauinformationen entfernen, analog zum Push in createNeueBauinformation oben
          // ALT: http.get("/api/bauinformationen/readBauinformationen/")
          // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
          apiRoute = process.env.API + "/Bauinformationen";
          this.$axios
            .get(apiRoute)
            .then(response => {
              console.log(
                "In deleteAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                response.data
              );
              // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
              if (response.data === []) {
                console.log(
                  "Keine Bauinformationen vorhanden - d.h. die gelöschte Bauinformation war die letzte Bauinformation"
                );
                globalStore.showBenutzerNachricht(
                  BenutzerNachrichten.BAUINFORMATION_LOESCHEN_KEINE_BAUINFORMATIONEN_VORHANDEN
                );
                return;
              }
              // v-model von q-table zurücksetzen:
              this.dataTableBauinformationen = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen auskommentiert, da dies (per Test) automatisch von Quasar erledigt wird
              // aufgrund des Reloads von dataTableBauinformationen
              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen zunächst sicherheitshalber hinter den ersten v-model Update verschoben, damit Quasar nicht durcheinanderkommt
              this.selectedRowsTableBauinformationen = []; // Deselektiert die Row auch in q-table, falls Quasar das nicht automatisch macht
              // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
              console.log(
                "Nach Reset von selectedRowsTableBauinformationen: ",
                this.selectedRowsTableBauinformationen
              );

              // Nun noch ggf. ausgewaehlteBauinformation und neueBauinformation zurücksetzen,
              // falls diese die gelöschte Bauinformation angezeigt haben:

              if (this.ausgewaehlteBauinformation !== undefined) {
                if (
                  idGelöschteBauinformation ===
                  this.ausgewaehlteBauinformation._id
                ) {
                  console.log(
                    "In deleteAusgewaehlteBauinformationenAusQTable - gelöschte = ausgewählte Bauinformation - diese zurücksetzen!"
                  );
                  this.ausgewaehlteBauinformation = undefined; // Auf undefined, nicht {} setzen, damit wird auch per v-if das zweite Tab geschlossen
                }
              }

              if (this.neueBauinformation !== undefined) {
                if (idGelöschteBauinformation === this.neueBauinformation._id) {
                  console.log(
                    "In deleteAusgewaehlteBauinformationenAusQTable - gelöschte = neue Bauinformation - diese zurücksetzen!"
                  );
                  this.neueBauinformation = Object.assign(
                    {},
                    this.leereBauinformation
                  );
                  // ACHTUNG: Ohne Object Assign, mit einfachem this.neueBauinformation = this.leereBauinformation
                  // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
                  // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d
                }
              }
              /*
              console.log(
                "In deleteAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für alle Bauinformationen: _id der ersten Zeile in der q-table: " +
                  this.dataTableBauinformationen[0]._id +
                  " bauinformationsBezeichnung: " +
                  this.dataTableBauinformationen[0].bauinformationsBezeichnung +
                  " bauinformationsTyp: " +
                  this.dataTableBauinformationen[0].bauinformationsTyp +
                  " bauinformationsBemerkung: " +
                  this.dataTableBauinformationen[0].bauinformationsBemerkung
              );
              */
              // NEU:
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_LOESCHEN_ERFOLG
              );
            })
            .catch(error => {
              console.log(error);
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
              );
            });
          // ALT: (aus Baustoff)
          // this.$emit("change", this.selectedRow);
          // this.$emit("change", this.selectedRowKeyTableBauinformationen);
          // this.$emit("refresh"); // ????????? Scheint zumindest nicht zu schaden...setzt aber noch nicht die Eingabefelder zurück!!!
        })
        .catch(error => {
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_LOESCHEN_FEHLER
          );
        });
    },

    //--------------------------------------------------------------------------------------------------------------
    altCheckAusgewaehlteBauinformationAusQTableAufInternenLink() {
      // ALT: Für Button "Internen Link öffnen" im Tab "Übersicht":
      // Zuerst Aufruf dieser Methode, die prüft, ob überhaupt eine Bauinformation ausgewählt ist. Wenn keine ausgewählt ist,
      // triggered die Methode per v-model zunächst den anderen q-dialog, der einen Hinweis ausgibt, dass eine Bauinformation auszuwählen ist
      // und returned.
      // Ansonsten prüft sie, ob die (erste) ausgewählte Bauinformation einen validen internen Link hat und returned in diesem Fall.
      // Sonst stösst sie per v-model einen weiteren q-dialog mit Hinweis an, dass eine Bauinformation mit internem Link auszuwählen ist.
      // ALT: Andernfalls returned sie, wodurch dann der Button "Internen Link öffnen" per :href das PDF anzeigt.
      // HINWEIS: Die Funktion "getSelectedInternerLinkTableBauinformationen" muss zur korrekten Gesamtfunktion returnen ohne Ergebnis, falls
      // selectedRowsTableBauinformationen[0].internerLink == null ist!

      if (this.selectedRowsTableBauinformationen.length === 0) {
        this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // Hinweis, dass Bauinformation auszuwählen ist
        // return;
      } else {
        // Testen, ob interner Link vorhanden
        if (this.selectedRowsTableBauinformationen[0].internerLink == null ||
           this.selectedRowsTableBauinformationen[0].internerLink === "") { // NEU - gegen Fehler #382)
          this.confirmHinweisAuswaehlenBauinformationAusQTableMitInternemLink = true; // Hinweis, dass Bauinformation mit internem Link auszuwählen ist
        }
      }
    },

    //--------------------------------------------------------------------------------------------------------------
    checkAusgewaehlteBauinformationAusQTableAufInternenLink() {
      // NEU: Für Button "Internen Link öffnen" im Tab "Übersicht":
      // Zuerst Aufruf dieser Methode, die prüft, ob überhaupt eine Bauinformation ausgewählt ist. Wenn keine ausgewählt ist,
      // triggered die Methode per v-model zunächst den anderen q-dialog, der einen Hinweis ausgibt, dass eine Bauinformation auszuwählen ist
      // und returned.
      // Ansonsten prüft sie, ob die (erste) ausgewählte Bauinformation einen validen internen Link hat und returned in diesem Fall.
      // Sonst stösst sie per v-model einen weiteren q-dialog mit Hinweis an, dass eine Bauinformation mit internem Link auszuwählen ist.
      // NEU: Andernfalls stösst sie die weitere Funktion openSelectedInternerLinkTableBauinformationen(); an, die das verlinkte File am Backend herunterlädt
      // aus MongoDB und diese im Browser öffnet
      // HINWEIS: Die Funktion "getSelectedInternerLinkTableBauinformationen" muss zur korrekten Gesamtfunktion returnen ohne Ergebnis, falls
      // selectedRowsTableBauinformationen[0].internerLink == null ist!

      if (this.selectedRowsTableBauinformationen.length === 0) {
        this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // Hinweis, dass Bauinformation auszuwählen ist
        // return;
      } else {
        // Testen, ob interner Link vorhanden
        if (this.selectedRowsTableBauinformationen[0].internerLink == null ||
            this.selectedRowsTableBauinformationen[0].internerLink === "") { // NEU - gegen Fehler #382)
          this.confirmHinweisAuswaehlenBauinformationAusQTableMitInternemLink = true; // Hinweis, dass Bauinformation mit internem Link auszuwählen ist
        } else {
          this.openSelectedInternerLinkTableBauinformationen(); // NEU: Lädt File am Backend herunter aus MongoDB per API von dateien.controller.js
          // und öffnet diese im Browser
        }
      }
    },

    //--------------------------------------------------------------------------------------------------------------
    checkAusgewaehlteBauinformationAusQTableAufExternenLink() {
      // NEU für Button "Externen Link öffnen":
      // Zuerst Aufruf dieser Methode, die prüft, ob überhaupt eine Bauinformation ausgewählt ist. Wenn keine ausgewählt ist,
      // triggered die Methode per v-model zunächst den anderen q-dialog, der einen Hinweis ausgibt, dass eine Bauinformation auszuwählen ist
      // und returned.
      // Ansonsten prüft sie, ob die (erste) ausgewählte Bauinformation einen validen externen Link hat und returned in diesem Fall.
      // Sonst stösst sie per v-model einen weiteren q-dialog mit Hinweis an, dass eine Bauinformation mit externem Link auszuwählen ist.
      // Andernfalls returned sie, wodurch dann der Button "Externen Link öffnen" das PDF anzeigt per :href.
      // HINWEIS: Die Funktion "getSelectedExternerLinkTableBauinformationen" muss zur korrekten Gesamtfunktion returnen ohne Ergebnis, falls
      // selectedRowsTableBauinformationen[0].externerLink == null ist!
      console.log(
        "In checkAusgewaehlteBauinformationAusQTableAufExternenLink():  selectedRowsTableBauinformationen[0]: ",
        this.selectedRowsTableBauinformationen[0]
      );
      if (this.selectedRowsTableBauinformationen.length === 0) {
        this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // Hinweis, dass Bauinformation auszuwählen ist
        // return;
      } else {
        // Testen, ob externer Link vorhanden
        if (this.selectedRowsTableBauinformationen[0].externerLink == null ||
            this.selectedRowsTableBauinformationen[0].externerLink === "") { // NEU - gegen Fehler #382)
          this.confirmHinweisAuswaehlenBauinformationAusQTableMitExternemLink = true; // Hinweis, dass Bauinformation mit externem Link auszuwählen ist
        }
      }
    },

    //--------------------------------------------------------------------------------------------------------------
    oeffneExternenLinkAusgewaehlteBauinformationAusQTable() {
      // NEU: Funktion zum Öffnen des externen Links in neuem Browser Tab - wird verwendet bei Öffnen aus Kontextmenü in der QTable für die Bauinformationen
      // Siehe https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
      let win = window.open(
        this.selectedRowsTableBauinformationen[0].externerLink,
        "_blank"
      );
      win.focus();
    },

    //--------------------------------------------------------------------------------------------------------------
    checkAusgewaehlteBauinformationAusQTableAufOneDriveLink() {
      // NEU für Button "OneDrive-Link öffnen":
      // Zuerst Aufruf dieser Methode, die prüft, ob überhaupt eine Bauinformation ausgewählt ist. Wenn keine ausgewählt ist,
      // triggered die Methode per v-model zunächst den anderen q-dialog, der einen Hinweis ausgibt, dass eine Bauinformation auszuwählen ist
      // und returned.
      // Ansonsten prüft sie, ob die (erste) ausgewählte Bauinformation einen validen externen Link hat und returned in diesem Fall.
      // Sonst stösst sie per v-model einen weiteren q-dialog mit Hinweis an, dass eine Bauinformation mit externem Link auszuwählen ist.
      // Andernfalls returned sie, wodurch dann der Button "Externen Link öffnen" das PDF anzeigt per :href.
      // HINWEIS: Die Funktion "getSelectedExternerLinkTableBauinformationen" muss zur korrekten Gesamtfunktion returnen ohne Ergebnis, falls
      // selectedRowsTableBauinformationen[0].externerLink == null ist!
      console.log(
        "In checkAusgewaehlteBauinformationAusQTableAufOneDriveLink():  selectedRowsTableBauinformationen[0]: ",
        this.selectedRowsTableBauinformationen[0]
      );
      if (this.selectedRowsTableBauinformationen.length === 0) {
        this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // Hinweis, dass Bauinformation auszuwählen ist
        // return;
      } else {
        // Testen, ob externer Link vorhanden
        if (this.selectedRowsTableBauinformationen[0].oneDriveLink == null ||
          this.selectedRowsTableBauinformationen[0].oneDriveLink === "") { // NEU - gegen Fehler #382)
          this.confirmHinweisAuswaehlenBauinformationAusQTableMitOneDriveLink = true; // Hinweis, dass Bauinformation mit OneDrive-Link auszuwählen ist
        }
      }
    },

    //--------------------------------------------------------------------------------------------------------------
    oeffneOneDriveLinkAusgewaehlteBauinformationAusQTable() {
      // NEU: Funktion zum Öffnen des OneDrive-Links in neuem Browser Tab - wird verwendet bei Öffnen aus Kontextmenü in der QTable für die Bauinformationen
      // Siehe https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window
      let win = window.open(
        this.selectedRowsTableBauinformationen[0].oneDriveLink,
        "_blank"
      );
      win.focus();
    },

    //--------------------------------------------------------------------------------------------------------------
    deleteAusgewaehlteBauinformationAusQForm() {
      var data = {}; // Objekt für Return der gelöschten Bauinformation in der Response
      // TODO: Wird dies so gebraucht?? Nach dem Call wird auf response.data, nicht data zurückgegriffen!
      console.log(
        "In deleteAusgewaehlteBauinformationAusQForm vor HTTP Get (für Delete) Request"
      );
      // ALT: http.delete("/api/bauinformationauinformationByBauinformationId/" + this.ausgewaehlteBauinformation._id, data)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      var apiRoute =
        process.env.API +
        "/Bauinformationen/" +
        this.ausgewaehlteBauinformation._id;
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBauinformationen'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationen"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationen'");
      //=========================================================================================================================================
      this.$axios
        .delete(apiRoute, data)
        .then(response => {
          console.log(
            "In deleteAusgewaehlteBauinformationAusQForm nach HTTP Delete Request für Delete Bauinformation - response.data: ",
            response.data
          );

          this.ausgewaehlteBauinformation = undefined; // Auf undefined, nicht {} setzen, damit wird auch per v-if das zweite Tab geschlossen

          // Bauinformationen neu laden vom Backend für v-model von q-table
          // TODO: Alternativ statt Backend Call, der den ganzen Array neu lädt, mit Array Methoden (filter?) das per _id identifizierbare gelöschte Objekt aus
          // dataTableBauinformationen entfernen, analog zum Push in createNeueBauinformation oben
          // ALT: http.get("/api/bauinformationen/readBauinformationen/")
          // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
          apiRoute = process.env.API + "/Bauinformationen";
          this.$axios
            .get(apiRoute)
            .then(response => {
              console.log(
                "In deleteAusgewaehlteBauinformationAusQForm nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                response.data
              );
              // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
              if (response.data === []) {
                console.log(
                  "Keine Bauinformationen vorhanden - d.h. die gelöschte Bauinformation war die letzte Bauinformation"
                );
                globalStore.showBenutzerNachricht(
                  BenutzerNachrichten.BAUINFORMATION_LOESCHEN_KEINE_BAUINFORMATIONEN_VORHANDEN
                );
                return;
              }
              // v-model von q-table zurücksetzen:
              this.dataTableBauinformationen = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird

              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen auskommentiert, da dies (per Test) automatisch von Quasar erledigt wird
              // aufgrund des Reloads von dataTableBauinformationen
              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen zunächst sicherheitshalber hinter den ersten v-model Update verschoben, damit Quasar nicht durcheinanderkommt
              this.selectedRowsTableBauinformationen = []; // Deselektiert die Row auch in q-table, falls Quasar das nicht automatisch macht
              // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
              console.log(
                "In deleteAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für Read aller Bauinformationen: selectedRowsTableBauinformationen: " +
                  this.selectedRowsTableBauinformationen[0]
              );
              /*
              console.log(
                "In deleteAusgewaehlteBauinformationAusQForm nach HTTP Get Request für alle Bauinformationen: _id der ersten Zeile in der q-table: " +
                  this.dataTableBauinformationen[0]._id +
                  " bauinformationsBezeichnung: " +
                  this.dataTableBauinformationen[0].bauinformationsBezeichnung +
                  " bauinformationsTyp: " +
                  this.dataTableBauinformationen[0].bauinformationsTyp +
                  " bauinformationsBemerkung: " +
                  this.dataTableBauinformationen[0].bauinformationsBemerkung
              );
              */
              // NEU:
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_LOESCHEN_ERFOLG
              );
            })
            .catch(error => {
              console.log(error);
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
              );
            });
          // ALT: (aus Baustoff)
          // this.$emit("change", this.selectedRow);
          // this.$emit("change", this.selectedRowKeyTableBauinformationen);
          // this.$emit("refresh"); // ????????? Scheint zumindest nicht zu schaden...setzt aber noch nicht die Eingabefelder zurück!!!
        })
        .catch(error => {
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_LOESCHEN_FEHLER
          );
        });
    },

    //--------------------------------------------------------------------------------------------------------------
    deleteNeueBauinformationAusQForm() {
      var data = {}; // Objekt für Return der gelöschten Bauinformation in der Response
      // TODO: Wird dies so gebraucht?? Nach dem Call wird auf response.data, nicht data zurückgegriffen!
      console.log(
        "In deleteNeueBauinformationAusQForm vor HTTP Get (für Delete) Request"
      );
      // ALT: http.delete("/api/bauinformationen/deleteBauinformationByBauinformationId/" + this.neueBauinformation._id, data)
      // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
      var apiRoute =
        process.env.API + "/Bauinformationen/" + this.neueBauinformation._id;
      //=========================================================================================================================================
      // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
      // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
      console.log("Vor Emit to leave room 'roomBauinformationen'");
      this.$socket.emit("leaveRoom", {
        room: "roomBauinformationen"
      }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
      console.log("Nach Emit to leave room 'roomBauinformationen'");
      //=========================================================================================================================================
      this.$axios
        .delete(apiRoute, data)
        .then(response => {
          console.log(
            "In deleteNeueBauinformationAusQForm nach HTTP Delete Request für Delete Bauinformation - response.data: ",
            response.data
          );

          this.neueBauinformation = Object.assign({}, this.leereBauinformation); // v-model für neue Bauinformation zurücksetzen auf leere Baubestimumung
          // ACHTUNG: Ohne Object Assign, mit einfachem this.neueBauinformation = this.leereBauinformation
          // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
          // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d

          // Bauinformationen neu laden vom Backend:
          // TODO: Statt Backend Call, der den ganzen Array neu lädt, mit Array Methoden (filter?) das per _id identifizierbare gelöschte Objekt aus
          // dataTableBauinformationen entfernen, analog zum Push in createNeueBauinformation oben
          // ALT: http.get("/api/bauinformationen/readBauinformationen")
          // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
          apiRoute = process.env.API + "/Bauinformationen";
          this.$axios
            .get(apiRoute)
            .then(response => {
              console.log(
                "In deleteNeueBauinformationAusQForm nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
                response.data
              );
              // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
              if (response.data === []) {
                console.log(
                  "Keine Bauinformationen vorhanden - d.h. die gelöschte Bauinformation war die letzte Bauinformation"
                );
                globalStore.showBenutzerNachricht(
                  BenutzerNachrichten.BAUINFORMATION_LOESCHEN_KEINE_BAUINFORMATIONEN_VORHANDEN
                );
                return;
              }
              // v-model von q-table zurücksetzen:
              this.dataTableBauinformationen = response.data; // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird

              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen auskommentiert, da dies (per Test) automatisch von Quasar erledigt wird
              // aufgrund des Reloads von dataTableBauinformationen
              // Den folgenden Call zum Reset von selectedRowsTableBauinformationen zunächst sicherheitshalber hinter den ersten v-model Update verschoben, damit Quasar nicht durcheinanderkommt
              this.selectedRowsTableBauinformationen = []; // Deselektiert die Row auch in q-table, falls Quasar das nicht automatisch macht
              // Ist so okay bzgl. obigem "Vue Array Pitfall", da der ganze Array replaced wird
              console.log(
                "In deleteAusgewaehlteBauinformationenAusQTable nach HTTP Get Request für Read aller Bauinformationen: selectedRowsTableBauinformationen: " +
                  this.selectedRowsTableBauinformationen[0]
              );
              /*
              console.log(
                "In deleteNeueBauinformationAusQForm nach HTTP Get Request für alle Bauinformationen: _id der ersten Zeile in der q-table: " +
                  this.dataTableBauinformationen[0]._id +
                  " bauinformationsBezeichnung: " +
                  this.dataTableBauinformationen[0].bauinformationsBezeichnung +
                  " bauinformationsTyp: " +
                  this.dataTableBauinformationen[0].bauinformationsTyp +
                  " bauinformationsBemerkung: " +
                  this.dataTableBauinformationen[0].bauinformationsBemerkung
              );
              */
              // NEU:
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATION_LOESCHEN_ERFOLG
              );
            })
            .catch(error => {
              console.log(error);
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
              );
            });
          // ALT: (aus Baustoff)
          // this.$emit("change", this.selectedRow);
          // this.$emit("change", this.selectedRowKeyTableBauinformationen);
          // this.$emit("refresh"); // ????????? Scheint zumindest nicht zu schaden...setzt aber noch nicht die Eingabefelder zurück!!!
        })
        .catch(error => {
          console.log(error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATION_LOESCHEN_FEHLER
          );
        });
    }
    /* eslint-enable no-console */
  }, // /methods:

  //---------------------------------------------------------------------------------------------------------------------------------------

  mounted: async function() {
    //--------------------------------------------------------------------------------------------------------------------------------------
    // Methode mounted: Bauinformationen initalisieren
    // ACHTUNG: mounted() muss nach https://forum.quasar-framework.org/topic/4033/not-solved-by-quasar-but-manual-coding-auto-expand-for-lazy-qtree-node/3
    // eine async function sein, wahrscheinlich nur, weil dort eine Promise verwendet wird für den asynchronen HTTP Call
    //---------------------------------------------------------------------------------------------------------------------------------------
    console.log("In mounted von bauinformationen.vue");

    // NEU: JWT Header setzen für Axios Calls an das Backend:
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Initialisierung für OneDrive-Integration:
    this.oneDriveClient = oneDrive;
    // Keine weitere Initialisierung notwendig per https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/open-file?view=odsp-graph-online
    //--------------------------------------------------------------------------------------------------------------------------
    // Nun als erstes die q-table im ersten Tab initialisieren:
    console.log(
      "In mounted vor HTTP Get Request für Read aller Bauinformationen"
    );
    // ALT: http.get("/api/bauinformationen/readBauinformationen")
    // NEU: process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
    const apiRoute = process.env.API + "/Bauinformationen";
    this.$axios
      .get(apiRoute)
      .then(response => {
        console.log(
          "In mounted nach HTTP Get Request für Read aller Bauinformationen - response.data: ",
          response.data
        );
        // ACHTUNG - TODO: Die folgende Abfrage auf [] ist per Tests immer false, also so nicht sinnvoll! Abfrage auf null oder {} ist ebenfalls false!!!
        if (response.data === []) {
          console.log("Keine Bauinformationen vorhanden");
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_KEINE_VORHANDEN
          );
          return;
        }
        this.dataTableBauinformationen = response.data;
        if (response.data.length > 0) {
          console.log(
            "Nach Get Request für Read aller Bauinformationen: _id der ersten Zeile in der q-table: " +
              this.dataTableBauinformationen[0]._id +
              " bauinformationsBezeichnung: " +
              this.dataTableBauinformationen[0].bauinformationsBezeichnung +
              " bauinformationsTyp: " +
              this.dataTableBauinformationen[0].bauinformationsTyp +
              " bauinformationsBemerkung: " +
              this.dataTableBauinformationen[0].bauinformationsBemerkung
          );
        } else {
          console.log("Keine Bauinformationen aus Backend");
        }
      })
      .catch(error => {
        console.log(
          "Error in HTTP Get Request für Read aller Bauinformationen"
        );
        console.log("error: ", error);
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
        );
      });
    // Als nächstes das zweite Tab (für Anzeige einer im ersten Tab ausgewählten Bauinformation) initialisieren
    // TODO: Einstweilen könnte man dort einen Hinweis einblenden, dass eine Bauinformation im ersten Tab ausgewählt werden kann
    this.ausgewaehlteBauinformation = undefined; // Auf undefined, nicht {} setzen, damit wird per v-if das zweite Tab ausgeblendet

    // Als nächstes das dritte Tab (für Anlage einer neuen Bauinformation) initialisieren
    this.neueBauinformation = Object.assign({}, this.leereBauinformation);
    // ACHTUNG: Ohne Object Assign, mit einfachem this.neueBauinformation = this.leereBauinformation
    // wird KEIN korrektes Cloning des Objekts durchgeführt, sondern nur eine Referenz auf das Source Objekt in das Target Objekt kopiert
    // Siehe https://medium.com/better-programming/3-ways-to-clone-objects-in-javascript-f752d148054d
  }, // /mounted:

  /*------------------------------------------------------------------------------------------------------------------------------------//
  Watch Property Option - diese wird gerufen, wenn sich etwas in den Properties oder eine Variable ändert
  Watch Tutorial: https://www.tutorialspoint.com/vuejs/vuejs_watch_property
  Watch Example: https://flaviocopes.com/vue-watchers/
  HINWEIS: Der Watch hat denselben Namen wie die Property/Variable, die er beobachtet
  Der val Parameter ist optional, er hält den neuen Wert der Variablen
  Optional gibt es noch einen zweiten Parameter, er hält den alten Wert der Variablen
  //------------------------------------------------------------------------------------------------------------------------------------*/

  // Watch-Funktion auf tabBauinformationen setzt bei direkter Anwahl von tabBauinformationAuswahl die Variable ausgewaehlteBauinformation (v-model),
  // für den Fall, dass das Tab direkt angewählt wird, ohne über den Button "Bauinformation bearbeiten" zu gehen,
  // und dennoch eine Bauinformation in q-table ausgewählt ist.
  // Statt if (this.tabBauinformationen...) könnte man hier auch if (val...) nehmen!
  // TODO: Diese Lösung ist noch verbeserungsbedürftig, da der watch auch zuschlägt, wenn das Tab über den Button "Bauinformation bearbeiten" angewählt wird.
  // Der Button setzt vorher ebenfalls ausgewaehlteBauinformation, so dass die eventuell mehrfach passiert?
  // NEU: Dies so wie bei den Buttons unter der QTable über <q-tab :disable="computeSelectedRowsTableBauinformationen"> gesteuert.
  // ACHTUNG: Der Watch inititalisiert auch ausgewaehlteBauinformation, daher kann er nicht ohne Weiteres ganz entfernt werden.

  watch: {
    tabBauinformationen: function(val) {
      if (this.tabBauinformationen === "auswahlTabBauinformationen") {
        console.log(
          "In watch für tabBauinformationen: auswahlTabBauinformationen angewählt."
        );
        if (this.selectedRowsTableBauinformationen.length === 0) {
          // Keine Bauinformation auswgewählt
          console.log(
            "In watch für tabBauinformationen: Keine Bauinformation ausgewählt."
          );
          this.tabBauinformationen = "uebersichtTabBauinformationen"; // Tab Panel wechseln zu Tab Übersicht
          this.confirmHinweisAuswaehlenBauinformationAusQTable = true; // QDialog (Popup) mit Hinweis, dass Bauinformation ausgewählt werden sollte
          // ACHTUNG: q-dialog muss stets lokal zu dem q-tab-panel definiert sein, in dem er per v-model aktiviert wird, sonst passiert nichts!!!
        } else {
          console.log(
            "In watch für tabBauinformationen: Setze ausgewaehlteBauinformation."
          );
          this.ausgewaehlteBauinformation = Object.assign(
            {},
            this.getSelectedBauinformation() // Obige Funktion
          );
          // NEU: Initialisiere zusätzlich die Arrays für das QSelect zur Zuordnung von Autoren:
          this.initialisiereSelectModelUndOptionsUndFilterOptionsBenutzerKennungenAutorenAusgewaehlteBauinformation();
        }
      }
    }
  } // /watch:
}; // /export default:
</script>
