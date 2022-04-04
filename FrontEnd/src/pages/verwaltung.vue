<!-- NEU: verwaltung.vue -->
<!-- Vue-/Quasar-Komponente zur Verwaltung (für Benutzer etc.) -->
<!-- Darf nur für Benutzer mit Benutzerrolle "Administrator" zugänglich sein! -->
<!--  -->
<!--  -->
<!--***=======================================================================================================================================================-->
<template>
  <q-page class="q-pa-xs">
    <!-- Die folgende q-card disabled, sie ist nicht notwendig, verbraucht nur zusätzlichen vertikalen Space -->
    <!-- <q-card class="q-pa-xs"> -->
    <!-- =============================================================================================================================== -->
    <q-tabs
      mobile-arrows
      class="q-pa-none text-black bg-grey-4 full-width"
      active-color="primary"
      active-bg-color="white"
      content-class="text-h7"
      dense
      align="left"
      v-model="tabVerwaltung"
      @input="initialisiereAusgewaehltesTabVerwaltung"
    >
      <q-tab name="benutzerTabVerwaltung" label="Benutzerkonten" no-caps />
      <q-tab name="test1TabVerwaltung" label="Test Area 1" no-caps />
      <q-tab name="test2TabVerwaltung" label="Test Area 2" no-caps />
      <q-tab name="test3TabVerwaltung" label="Test Area 3" no-caps />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tabVerwaltung" animated>
      <!--------------------------------------------------------------------------------------------------------------------->
      <q-tab-panel name="benutzerTabVerwaltung" class="q-pa-xs">
        <q-tabs
          mobile-arrows
          class="q-pa-none text-black bg-grey-4 full-width"
          active-color="primary"
          active-bg-color="white"
          content-class="text-h7"
          dense
          align="left"
          v-model="tabBenutzer"
        >
          <q-tab
            name="uebersichtTabBenutzer"
            label="Übersicht aller Benutzerkonten"
            no-caps
          />
          <q-tab
            name="detailsTabBenutzer"
            :disable="selectedBenutzer == null"
            label="Details zum ausgewählten Benutzerkonto"
            no-caps
          />
          <q-tab
            :disable="!benutzerDarfBearbeitenBenutzer"
            name="neuAnlageTabBenutzer"
            label="Neuregistrierung eines Benutzerkontos"
            no-caps
          />
        </q-tabs>
        <!-- ALT: style="min-width: 1600px" -->
        <!-- Verhindert korrekte responsive Formatierung auf kleinen Bildschirmen, entfernt! -->
        <q-tab-panels v-model="tabBenutzer" animated>
          <q-tab-panel name="uebersichtTabBenutzer" class="q-pa-xs">
            <uebersichtTabBenutzer
              :dataTableBenutzer="alleBenutzer"
              :columnsTableBenutzer="columnsTableBenutzer"
              :selectedRowsTableBenutzer="selectedBenutzer"
              @selection-changed-table-benutzer-konten-verwaltung="
                changeSelectionAusgewaehlterBenutzer
              "
              @change-tab-request-benutzer-konten-verwaltung="
                handleChangeTabRequest
              "
              @delete-request-benutzer-konten-verwaltung="
                deleteSelectedBenutzerDialog = true
              "
            />
            <!-- ALT: v-if="$q.screen.gt.xs" -->
            <div class="row full-width q-col-gutter-xs q-pa-xs">
              <div class="col-md-3 col-12 text-caption">
                Aktionen für Benutzerkonten
                {{ displayRightArrow }}
                <br />
                <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
                Mit &nbsp;
                <q-checkbox v-model="alwaysOn" disable dense color="primary" />
                &nbsp; in der ersten Spalte ein Benutzerkonto auswählen.
                Alternativ mit rechter Maustaste Kontextmenü aufrufen.
                <!--
                  <br />&nbsp;
                  <br />
                -->
              </div>
              <div class="col-md-3 col-12">
                <!-- ALT: style="width:90%" class="q-mr-sm" -->
                <q-btn
                  class="stretch full-width"
                  label="Benutzerkonto anzeigen / bearbeiten"
                  color="secondary"
                  glossy
                  no-caps
                  :disable="selectedBenutzer == null"
                  @click="tabBenutzer = 'detailsTabBenutzer'"
                />
              </div>
              <!-- TODO  @click="openEigenschaftAuswahl()" -->
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Benutzerkonto löschen"
                  color="negative"
                  glossy
                  no-caps
                  @click="deleteSelectedBenutzerDialog = true"
                  :disable="
                    selectedBenutzer == null || !benutzerDarfBearbeitenBenutzer
                  "
                />
              </div>
              <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBenutzer()"-->
              <!-- <q-separator vertical inset /> -->
              <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Benutzerkonto neu registrieren"
                  glossy
                  color="green-8"
                  @click="tabBenutzer = 'neuAnlageTabBenutzer'"
                  no-caps
                  :disable="!benutzerDarfBearbeitenBenutzer"
                />
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel
            name="detailsTabBenutzer"
            v-if="selectedBenutzer"
            class="q-pa-xs"
          >
            <detailsTabBenutzer
              :zuManipulierenderBenutzer="selectedBenutzer"
              modus="Bearbeitung"
              @refresh-request-benutzer-konten-verwaltung="refreshBenutzer"
              @error-in-component-benutzer-konten-verwaltung="
                showErrorNotification
              "
            />
          </q-tab-panel>
          <q-tab-panel name="neuAnlageTabBenutzer" class="q-pa-xs">
            <detailsTabBenutzer
              modus="Neuanlage"
              @refresh-request-benutzer-konten-verwaltung="refreshBenutzer"
              @error-in-component-benutzer-konten-verwaltung="
                showErrorNotification
              "
            />
          </q-tab-panel>
        </q-tab-panels>
        <!-- NEU: Dialog für Confirmation des Löschens eines Benutzers: -->
        <q-dialog
          v-if="selectedBenutzer"
          v-model="deleteSelectedBenutzerDialog"
        >
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
              <div class="row full-width q-pt-md">
                <span class="q-pa-none">
                  Soll das Benutzerkonto mit der Benutzerkennung
                  <b>"{{ selectedBenutzer.benutzerKennung }}"</b> wirklich
                  gelöscht werden?
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
                    @click="deleteSelectedBenutzer()"
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
      </q-tab-panel>
      <!-- /q-tab-panel name="benutzerTabVerwaltung" ------------------------------------------------------------------------>
      <q-tab-panel name="test1TabVerwaltung" class="q-pa-xs">
        <q-tabs
          mobile-arrows
          class="q-pa-none text-black bg-grey-4 full-width"
          active-color="primary"
          active-bg-color="white"
          content-class="text-h7"
          dense
          align="left"
          v-model="tabTestArea1"
          @input="initialisiereAusgewaehltesTabVerwaltung"
        >
          <q-tab
            name="test01TabVerwaltung"
            label="Validation (QForm)"
            no-caps
          />
          <q-tab
            name="test02TabVerwaltung"
            label="Wandaufbau (QCarousel)"
            no-caps
          />
          <q-tab name="test03TabVerwaltung" label="Filterung" no-caps />
          <q-tab name="test04TabVerwaltung" label="Dezimalzahlen" no-caps />
          <q-tab
            name="test05TabVerwaltung"
            label="Dezimalzahlen (VMoney)"
            no-caps
          />
          <q-tab
            name="test06TabVerwaltung"
            label="Dezimalzahlen (VueAutoNumeric)"
            no-caps
          />
          <q-tab
            name="test07TabVerwaltung"
            label="Dezimalzahlen (VueNumeric)"
            no-caps
          />
          <q-tab
            name="test08TabVerwaltung"
            label="Dezimalzahlen (VueFilters)"
            no-caps
          />
          <q-tab
            name="test09TabVerwaltung"
            label="Dezimalzahlen (VueCurrencyInput)"
            no-caps
          />
          <q-tab
            name="test10TabVerwaltung"
            label="Normaußentemperaturen (QSelect)"
            no-caps
          />
        </q-tabs>
        <q-tab-panels v-model="tabTestArea1" class="q-pa-xs">
          <q-tab-panel name="test01TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">Test: QForm Validation</div>
            <!-- Vorlage: https://quasar.dev/vue-components/form#Usage und https://codepen.io/pen/?editors=1010 -->
            <br />
            <q-form @submit="onSubmit" @reset="onReset" class="q-pa-none">
              <div class="row full-width q-pa-none q-col-gutter-xs">
                <div class="col-3">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="name"
                    label="Ihr Name"
                    hint="Name und Vorname eingeben"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) ||
                        'Bitte Ihren Namen und Vornamen eingeben'
                    ]"
                  >
                  </q-input>
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    type="number"
                    v-model="age"
                    label="Ihr Alter"
                    hint="Alter eingeben"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') ||
                        'Bitte Ihr Alter eingeben',
                      val =>
                        (val > 0 && val < 100) ||
                        'Bitte ein gültiges Alter eingeben'
                    ]"
                  >
                  </q-input>
                  <q-toggle
                    v-model="accept"
                    label="Ich akzeptiere die Lizenzbedingungen"
                  ></q-toggle>
                  <q-separator spaced />
                  <div class="row q-col-gutter-xs">
                    <div class="col-6">
                      <q-btn
                        label="Speichern"
                        class="stretch full-width"
                        type="submit"
                        color="positive"
                        glossy
                        no-caps
                      ></q-btn>
                    </div>
                    <div class="col-6">
                      <q-btn
                        label="Zurücksetzen"
                        class="stretch full-width"
                        type="reset"
                        color="deep-orange-8"
                        glossy
                        no-caps
                      ></q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <!-- /q-tab-panel name="test01TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test02TabVerwaltung" class="q-pa-xs">
            <!-- Tests für Profilformulare für Wandaufbauten aus vertikal angeordneten Einzelschichten -->
            <!-- ------------------------------------------------------------------------------------- -->
            <!-- Folgenden ersten Test mit rotierten Custom QExpansion Items disabled, da diese nicht funktionieren! -->
            <!--
        <div class="text-h6 q-pa-xs">Test: Wandaufbau (mit rotierten QExpansion Items)</div>
        -->
            <!-- Siehe auch https://codepen.io/mickey58/pen/jOVbaea -->
            <!-- Siehe auch https://forum.quasar-framework.org/topic/7721/how-to-get-a-rotated-stack-of-q-expansion-items -->
            <!-- ACHTUNG: Funktioniert leider bisher nicht! -->
            <!-- Die zugehörigen CSS Styles in <style> sind experimentell, die dort verwendeten absoluten Pixel-Transformationen -->
            <!-- sind sowieso nur zum Test, nicht serienreif! -->
            <!-- <br /> -->
            <!-- <div class="row"> -->
            <!--
          <div class="q-pa-xs rotate-270-degrees" style="max-width: 300px">
          -->
            <!-- max-width controls vertical height of rotated expansion items stack? -->
            <!-- ACHTUNG: Leider kommt hier im Gegensatz zum Code Pen oben auch noch eine Scrollbar ins Spiel, vermutlich wegen q-tab-panel oder q-page! -->
            <!--
          <q-expansion-item
            dense
            expand-separator
            switch-toggle-side
            header-class="q-pa-xs text-black bg-brown-2 text-bold"
            class=" q-pa-xs text-black"
            label="Expansion Item"
          >
            Inhalt Expansion Item
          </q-expansion-item>
        </div>
        -->
            <!-- ----------------------------------------------------------------------------------------------------- -->
            <!-- Test: Alternative Visualisierung des Wandaufbaus mit QCarousel aus QCards mit QExpansion Items -->
            <!-- Nachteil dieses QCarousel aus QExpansionItems für Wandaufbau vs. Liste von QExpansionItems für Bodenaufbau: -->
            <!-- Es kann immer nur eine Schicht angezeigt werden, Navigation mit Pfeiltasten und Buttons notwendig -->
            <!-- Vorteil: So erhält man eine horizontale Visualisierung der Schichten für den Wandaufbau vs. der vertikalen im Bodenaufbau -->
            <div class="text-h6 q-pa-xs">
              Test: Wandaufbau (mit QCarousel aus QCards mit QExpansion Items)
            </div>
            <div
              class="q-pl-md q-pt-xs q-pb-xs q-pr-xs bg-brown-4 text-subtitle1 text-white"
            >
              Planung des Wandaufbaus an der im Bauvorhabenbaum ausgewählten
              Baueinheit "Außenwandaufbau"
              <!-- <b>"{{ currentlySelectedNode.baueinheitsBezeichnung }}"</b> -->
            </div>
            <!-- class="inset-shadow-down", NEU in Quasar 1.14.7! -->
            <q-expansion-item
              dense
              switch-toggle-side
              class="q-pl-none q-pt-none q-pb-none q-pr-none bg-brown-1 text-black inset-shadow-down"
              header-class="q-pa-none bg-brown-1 text-black inset-shadow-down"
            >
              <!-- NEU: Header VSlot, für Icon und selbe Höhe wie bei den QExpansion Items für die einzelnen Schichten: -->
              <template v-slot:header>
                <q-icon
                  name="img:statics/icons/icons8-layers-96.png"
                  size="300%"
                />
                <q-item-section class="q-pa-xs text-subtitle1">
                  <b>
                    Eigenschaften des Gesamt-Wandaufbaus
                  </b>
                </q-item-section>
              </template>
              <div>
                <b>Platzhalter für Profilformular für Gesamt-Wandaufbau</b>
                <br />
                Feld 1
                <br />
                Feld 2
              </div>
            </q-expansion-item>
            <!-- -------------------------------------------------------------------------------------------------------- -->
            <div
              class="text-subtitle1 q-pl-sm q-pt-xs q-pb-xs q-pr-xs text-bold bg-brown-2"
            >
              Schichten im Wandaufbau:
            </div>
            <!-- Es folgt das QCarousel zur Verwaltung der Einzelschichten: -->
            <!-- Hier für Test 4 Schichten, spezifiziert in Array schichtenInWandaufbau -->
            <!-- v-for im QCarouselSlide auf diesem Array -->
            <!-- Vorlage: https://codepen.io/smolinari/pen/VwZOBYx?editors=1010 -->
            <!-- bzw. https://forum.quasar-framework.org/topic/4431/qcarousel-using-v-for -->
            <!-- HINWEIS: heigth="65vh" (65% vertikale Höhe/vertical height) ist experimentell -->
            <!--          Alternativ auch absolute Höhe möglich, z.B. height="300px" -->
            <q-carousel
              v-model="ausgewaehlteSchichtNummerInWandaufbau"
              animated
              control-type="push"
              control-color="brown-3"
              navigation
              padding
              arrows
              class="text-black q-pa-xs"
              height="65vh"
            >
              <!-- Vorlage für alternative Custom Navigation: https://v1.quasar.dev/vue-components/carousel#custom-navigation -->
              <!-- Aktuell disabled -->
              <!--
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn v-if="active" size="lg" icon="home" color="brown" flat round dense @click="onClick" />
            <q-btn v-else size="sm" :icon="btnProps.icon" color="brown-3" flat round dense @click="onClick" />
          </template>
          -->
              <q-carousel-slide
                v-for="schicht in schichtenInWandaufbau"
                :key="schicht.schichtNummer"
                :name="schicht.schichtNummer"
                class="column no-wrap flex-top"
              >
                <q-card class="row full-width">
                  <!-- max-width controls vertical height of rotated expansion items stack? -->
                  <!-- ACHTUNG: Leider kommt hier im Gegensatz zum Code Pen oben auch noch eine Scrollbar ins Spiel, vermutlich wegen q-tab-panel oder q-page! -->
                  <q-expansion-item
                    dense
                    default-opened
                    expand-separator
                    switch-toggle-side
                    header-class="stretch full-width q-pa-none text-black bg-brown-2 text-bold inset-shadow-down"
                    class="stretch full-width q-pa-none text-black inset-shadow-down"
                    :label="schicht.baueinheitsBezeichnung"
                  >
                    <div>
                      <b
                        >Platzhalter für Profilformular für
                        {{ schicht.baueinheitsBezeichnung }}</b
                      >
                      <br />
                      Feld 1
                      <br />
                      Feld 2
                    </div>
                  </q-expansion-item>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
            <!-- Optionale Custom Navigation mit Buttons: https://v1.quasar.dev/vue-components/carousel#basic -->
            <!-- Die Default-Navigation kann dann durch entfernen der Prop navigation oben am q-carousel disabled werden! -->
            <!-- Basis-Variante mit Labels an den Buttons: -->
            <div class="row justify-center">
              <q-btn-toggle
                glossy
                color="brown-1"
                text-color="black"
                v-model="ausgewaehlteSchichtNummerInWandaufbau"
                :options="[
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                  { label: 4, value: 4 }
                ]"
              />
            </div>
            <br />
            <!-- Variante mit Custom Icons gemäß https://quasar.dev/vue-components/button-toggle#qbtntoggle-api: -->
            <div class="row justify-center">
              <q-btn-toggle
                glossy
                color="brown-1"
                v-model="ausgewaehlteSchichtNummerInWandaufbau"
                padding="sm"
                :options="[
                  {
                    icon: 'img:statics/icons/icons8-1-100.png',
                    value: 1
                  },
                  {
                    icon: 'img:statics/icons/icons8-2-100.png',
                    value: 2
                  },
                  {
                    icon: 'img:statics/icons/icons8-3-100.png',
                    value: 3
                  },
                  {
                    icon: 'img:statics/icons/icons8-4-100.png',
                    value: 4
                  }
                ]"
              />
            </div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test03TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test03TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">Test: Lesen gefilterter Baustoffe</div>
            <br />
            <div class="row full-width items-start q-col-gutter-xs">
              <div class="col-3">
                <q-input
                  square
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="baustoffIdFuerFilterungBaustoffe"
                  label="Id des Baustoffs"
                  hint="Id des Baustoffs, z.B. '5ec2d1d93c235300174789e7' (ohne Anführungszeichen). Feld ist vorbelegt mit der Id des Wurzelknotens des Baustoffbaums. Hinweis: Zur Ermittlung der Id eines Baustoffs im Tab 'Einstellungen' den Debug-Modus einschalten. Dann wird im Tab 'Baustoffe' für einen links im Baustoffbaum ausgewählten Baustoff dessen Id im Unter-Tab 'Angaben zum Baustoff' angezeigt."
                  hide-hint
                />
              </div>
              <div class="col-3">
                <q-btn
                  :disable="
                    this.baustoffIdFuerFilterungBaustoffe == null ||
                      this.baustoffIdFuerFilterungBaustoffe === ''
                  "
                  class="stretch full-width"
                  style="height:100%"
                  label="Gefilterte Baustoffe lesen"
                  color="secondary"
                  glossy
                  size="md"
                  no-caps
                  @click="leseGefilterteBaustoffe()"
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            Gefilterte Baustoffe:
            <!-- VUE3
            <pre v-html="stringifyGefilterteBaustoffe"></pre>
            -->
          </q-tab-panel>
          <!-- /q-tab-panel name="test03TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test04TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Eingabefelder für Dezimalzahlen
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs">
              <div class="col-6">
                <b
                  >q-input mit mask="###.##"" (und eventuell zusätzlich
                  "fill-mask")</b
                >
                <br />
                <br />
                <b>Vorteile:</b>
                <ul>
                  <li>
                    Es sind nur Zahlen mit maximal 3 Vorkomma- und maximal 2
                    Nachkommastellen eingebbar
                  </li>
                </ul>
                <b>Nachteile:</b>
                <ul>
                  <li>
                    Die Dezimalzahl 0.01 im v-model wird als "001," angezeigt -
                    das ist eine Art Showstopper! (kommt häufig vor bei
                    0.0-Niveauwerten)
                  </li>
                  <li>
                    Die potentielle Alternative 000.01 ist allerdings gar kein
                    valides JS (Compile-Fehler)!
                  </li>
                  <li>
                    So scheint mask im Grunde nur für Texte zu funktionieren!
                  </li>
                  <li>
                    Unser Model und v-model für Kennwerte ist aber Number!
                  </li>
                  <li>
                    Um die Dezimalstellen überhaupt eingeben zu können, müssen
                    bei weniger als dreistelligen Vorkommastellen evtl. führende
                    Nullen eingegeben werden
                  </li>
                  <li>
                    Keine praktischen Spinners für Inkrementierung und
                    Dekrementierung wie bei type ="number"
                  </li>
                  <li>
                    Falls fill-mask verwendet würde, müsste der String ggf. noch
                    nachkorrigiert werden, da er "_" enthalten kann
                  </li>
                  <li>
                    Die Dezimalzahl 0.0 wird als 0 angezeigt (noch akzeptabel)
                  </li>
                  <li>
                    Es werden auch Zahlen ohne die 2 Nachkommastellen zugelassen
                    (noch akzeptabel)
                  </li>
                </ul>
                <b>Beobachtungen:</b>
                <ul>
                  <li>
                    mask="###.##" ist auf den ersten Blick auch mit numerischem
                    v-model verwendbar - es erfolgt eine Umwandlung nach String
                  </li>
                  <li>
                    Allerdings treten dabei obige große Problem eauf, z.B. dass
                    0.01 als "001," dargestellt wird
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <b>q-input mit type="number" und step="0.01"</b>
                <br />
                <br />
                <b>Vorteile:</b>
                <ul>
                  <li>
                    Praktische Spinners mit passendem Step auf der 2.
                    Nachkommastelle
                  </li>
                </ul>
                <b>Nachteile:</b>
                <ul>
                  <li>
                    Es kann ohne weitere Validation jede beliebige Zahl
                    eingegeben werden, auch ohne Dezimalpunkt und mit beliebig
                    vielen Vor- und Nachkommastellen!
                  </li>
                  <li>
                    Dies wird allerdings durch die Field Validation
                    isValidNiveau() überprüft! Vor Speichern müsste per Form
                    Validation zusätzlich noch geprüft werden, ob die Validation
                    fehlerfrei ist (Vorlage dafür: details-tab-benutzer.vue)
                  </li>
                  <li>
                    Allerdings ist dadurch noch nicht gewährleistet, dass bei
                    den Dezimalstellen an den letzten 2 Stellen ggf. Nullen
                    stehen, was optisch schöner wäre. Diese knapst aber der
                    Browser bei Verwendung der Spinners ab, sowie in dem Fall,
                    wenn Ganzzahlen ohne Dezimalkomma eingegeben werden. Dagegen
                    kann "245,00" manuell eingegeben werden!
                  </li>
                </ul>
                <b>Hinweise:</b>
                <ul>
                  <li>
                    Es erfolgt eine Umwandlung nach String, die aber unschädlich
                    sein dürfte
                  </li>
                  <li>
                    Bei mehreren Feldern mit Niveauwerten in den Formularen für
                    Geometrie/Niveaus sollte vermutlich ein ähnliches Design
                    (QForm mit Submit/Reset-Methoden wie in #285 f.) verwendet
                    werden!
                  </li>
                </ul>
                <b>Achtung:</b>
                <ul>
                  <li>
                    Wenn gleichzeitig das q-input links mit mask="###.##"
                    aktiviert ist mit selbem v-model, hat dies als Nebenwirkung,
                    dass testDezimalWertFuerNiveau00 auch in diesem q-input
                    unten bei 2 Dezimalstellen abgeschnitten wird! Beim Testen
                    dieses q-inputs hier sollte also im Code das andere q-input
                    auskommentiert werden!
                  </li>
                  <li>
                    Am q-input darunter für den zweiten Dezimalwert, der aus dem
                    ersten computed wird, musste in der computed-Funktion eine
                    Konvertierung des ersten Dezimalwerts von String nach Number
                    durchgeführt werden!
                  </li>
                  <li>
                    Der Browser lässt auch merkwürdige Eingaben "--123",
                    "-+123", "+-123", "++123" zu, allerdings wird das v-model
                    dabei auf null gesetzt, die Validierungsfunktion meldet dann
                    wie dort aktuell kodiert keinen Fehler! Bei Eingabe von
                    "12," wird das v-model auf "12" gesetzt, bei "12,0" auf
                    "12,0". Wird aber per Spinner inkrementiert, wird die
                    trailing Zero nicht im v-model reflektiert!
                  </li>
                  <li>
                    Weitere Tests: "min=999.99", max="999.99" - beeinflusst nur
                    die Spinner! type="range" zeigt interessanten Slider, statt
                    Wert. Siehe
                    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
                  </li>
                </ul>
              </div>
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs">
              <div class="col-6">
                testDezimalWertFuerNiveau00: {{ testDezimalWertFuerNiveau00 }}
                <br />
                typeof(testDezimalWertFuerNiveau00):
                {{ typeof testDezimalWertFuerNiveau00 }}
                <br />
                -- q-input hier auskommentiert, um Tests an q-inputs rechts
                nicht zu beeinflussen --
                <!--
            <q-input
              square
              bg-color="teal-2"
              standout="bg-teal-4 text-black"
              dense
              v-model="decimalTestNumber"
              label="Dezimalzahl"
              hint="mask='###,##'"
              mask="###,##"
            >
            </q-input>
            -->
              </div>
              <div class="col-6">
                q-input mit v-model testDezimalWertFuerNiveau00
                <br />
                v-model testDezimalWertFuerNiveau00:
                {{ testDezimalWertFuerNiveau00 }}
                <br />
                typeof(testDezimalWertFuerNiveau00):
                {{ typeof testDezimalWertFuerNiveau00 }}
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="testDezimalWertFuerNiveau00"
                  label="Dezimalzahl"
                  hint="type='number' step='0.01'"
                  type="number"
                  step="0.01"
                  :rules="[isValidNiveau]"
                >
                </q-input>
                <br />
                q-input mit v-model als computed-Funktion
                computeTestDezimalWertFuerNiveauNHN:
                <br />
                v-model computeTestDezimalWertFuerNiveauNHN:
                {{ computeTestDezimalWertFuerNiveauNHN }}
                <br />
                typeof(computeTestDezimalWertFuerNiveauNHN):
                {{ typeof computeTestDezimalWertFuerNiveauNHN }}
                <!-- Mit v-model auf computeTestDezimalWertFuerNiveauNHN, welches durch watch auf testDezimalWertFuerNiveau00 aktualisiert wird -->
                <!-- :rules="[isValidNiveau]" -->
                <!-- Wirft Fehler wegen Typ Number statt String, siehe Kommentare in Funktion -->
                <q-input
                  disable
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="computeTestDezimalWertFuerNiveauNHN"
                  label="Dezimalzahl"
                  hint="disable type='number' step='0.01'"
                  type="number"
                  step="0.01"
                >
                </q-input>
                <br />
                q-input mit eigenem v-model, das durch watch auf
                testDezimalWertFuerNiveau00 aktualisiert wird:
                <br />
                v-model testDezimalWertFuerNiveauNHN:
                {{ testDezimalWertFuerNiveauNHN }}
                <br />
                typeof(testDezimalWertFuerNiveauNHN):
                {{ typeof testDezimalWertFuerNiveauNHN }}
                <!-- Mit v-model auf testDezimalWertFuerNiveauNHN, welches durch watch auf testDezimalWertFuerNiveau00 aktualisiert wird -->
                <!-- :rules="[isValidNiveau]" -->
                <!-- Wirft Fehler wegen Typ Number statt String, siehe Kommentare in Funktion -->
                <q-input
                  readonly
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="testDezimalWertFuerNiveauNHN"
                  label="Dezimalzahl"
                  hint="readonly type='number' step='0.01'"
                  type="number"
                  step="0.01"
                >
                </q-input>
              </div>
            </div>
          </q-tab-panel>
          <!-- --------------------------------------------------------------------------------------------------------------------- -->
          <q-tab-panel name="test05TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Dezimalzahl-Formatierung mit VMoney                                           -->
            <!-- NEU: Disabled per v-if="false" wegen Problemen, stattdessen VueAutonumeric benutzt!     -->
            <!-- Deinstalliert mit npm uninstall v-money                                                 -->
            <!-- https://www.npmjs.com/package/v-money                                                   -->
            <!-- https://quasar.dev/vue-components/input#Using-third-party-mask-processors               -->
            <!-- Vorteile:                                                                               -->
            <!-- - Damit sind 2 Dezimalstellen gewährleistet!                                            -->
            <!-- - Auch negative Zahlen möglich                                                          -->
            <!-- Nachteile:                                                                              -->
            <!-- - Damit sind keine nativen Spinners möglich - type="number" wird per Tests im Codepen   -->
            <!--   ignoriert. Es sind dann Custom Spinners mit template v-slot:append nötig              -->
            <!-- - Ungewohnte Eingabe von rechts nach links wie bei reverse-fill-mask, vermutlich nicht  -->
            <!--   abzuschalten                                                                          -->
            <!-- - Die Strings müssen teilweise manuell von Number nach String                           -->
            <!--   (genauer gesagt Dezimalstring - das per VMoney eingstellte String-Format ###.###,##)  -->
            <!--   und umgekehrt konvertiert werden                                                      -->
            <!--   Dazu 2 Hilsfunktionen (siehe unten): convertNumberToDecimalString() und               -->
            <!--   convertDecimalStringToNumber()                                                        -->
            <!-- - Es traten beim Testen teilweise Rundungsfehler auf - mit Math.round "bekämpft"        -->
            <!--   Zahlreiche Hinweise zu Decimals in JS auf StackOverflow etc. - es gibt auch spezielle -->
            <!--   Packages dafür, wie z.B. decimal.js                                                   -->
            <!--   https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript -->
            <!--   http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html             -->
            <!--   https://spin.atomicobject.com/2016/01/04/javascript-math-precision-decimals/                               -->
            <!-- ======================================================================================= -->
            <!-- ACHTUNG: VMoney erfordert Installation: npm i --save v-money                            -->
            <!-- Codepen dafür: https://codepen.io/mickey58/pen/JjbpWzm?editors=1111                     -->
            <!-- Fork von: https://quasar.dev/vue-components/input#Example--Filling-the-mask-in-reverse  -->
            <!-- und https://codepen.io/pdanpdan/pen/KKKrwbe?editors=1011                                -->
            <!-- Benutzt q-fields mit einem v-slot als Wrapper für <input> oder <money> statt <q-input>  -->
            <!-- ======================================================================================= -->
            <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Arithmetik bei mehr als 3-stelligen -->
            <!-- Dezimalwerten nicht korrekt!                                                            -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Eingabe- und Ausgabefelder für Dezimalzahlen mit VMoney
              <br />
              <br />
              <div style="color: red" class="text-subtitle1">
                [Aktuell disabled wegen Vue Warnings "Expected Number, String,
                got Null"]
              </div>
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs" v-if="false">
              <div class="col-2">
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="nullNiveau"
                  label="Niveau [m über 0.0]"
                  hint="VMoney Directive, Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                    <input
                      :id="id"
                      class="q-field__native text-right"
                      :value="value"
                      @change="e => emitValue(e.target.value)"
                      v-money="moneyFormatForDirective"
                      v-show="floatingLabel"
                    />
                  </template>
                </q-field>
                <pre class="text-caption">
              v-models: {{ typeof nullNiveau }} {{ nullNiveau }}
            </pre
                >
              </div>
              <div class="col-1">
                <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Arithmetik bei mehr als 3-stelligen Dezimalwerten nicht korrekt! -->
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="nullNiveau"
                  label="[m über 0.0]"
                  hint="VMoney Comp., Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                    <money
                      :id="id"
                      class="q-field__native text-right"
                      :value="value"
                      @input="emitValue"
                      v-bind="moneyFormatForComponent"
                      v-show="floatingLabel"
                    ></money>
                  </template>
                  <template v-slot:prepend>
                    <q-btn
                      dense
                      @click="myIncrementNullNiveau"
                      icon="arrow_drop_up"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                  <template v-slot:append>
                    <q-btn
                      dense
                      @click="myDecrementNullNiveau"
                      icon="arrow_drop_down"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                </q-field>
                <pre class="text-caption">
              {{ typeof nullNiveau }} {{ nullNiveau }}
            </pre
                >
              </div>
              <div class="col-1">
                <div class="col-2">
                  <!-- Bei Variante mit watch: v-model="nhnNiveau" -->
                  <!-- Bei Variante mit computed: v-model="computeNHNNiveau" -->
                  <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Arithmetik bei mehr als 3-stelligen Werten nicht korrekt! -->
                  <!-- Hier mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt, daher in diesem     -->
                  <!-- Spezialfall q-input verwendet statt q-field. Mit q-field kokmmt eine Vue Warning "Computed property "computeNHNNiveau" -->
                  <!-- -was assigned to but it has no setter." -->
                  <q-input
                    dense
                    disable
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    input-class="text-black"
                    v-model="computeNHNNiveau"
                    label="[m über NHN]"
                    hint="VMoney Comp., Format: #.###,00"
                  >
                    <template
                      v-slot:control="{ id, floatingLabel, value, emitValue }"
                    >
                      <money
                        :id="id"
                        class="q-field__native text-right"
                        :value="value"
                        @input="emitValue"
                        v-bind="moneyFormatForComponent"
                        v-show="floatingLabel"
                      ></money>
                    </template>
                  </q-input>
                  <pre class="text-caption">
               {{ typeof nhnNiveau }} {{ nhnNiveau }}
              </pre
                  >
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- --------------------------------------------------------------------------------------------------------------------- -->
          <q-tab-panel name="test06TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Dezimalzahl-Formatierung mit VueAutoNumeric                                   -->
            <!-- https://www.npmjs.com/package/vue-autonumeric                                           -->
            <!-- http://autonumeric.org/ -->
            <!-- http://autonumeric.org/configurator - für Options Generation -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Eingabe- und Ausgabefelder für Dezimalzahlen mit
              VueAutoNumeric
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs">
              <div class="row full-width">
                <br />
                VueAutoNumeric-Eingabefeld für 0.0-Wert und aus dem Wert des
                Eingabefelds berechnetes reguläres Ausgabefeld für NHN-Wert
                <br />
              </div>
              <div class="col-2">
                <!-- Eingabefeld für Dezimalzahl mit VueAutoNumeric -->
                <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Dezimalzahl-Formatierung durch VueAutoNumeric NICHT! -->
                <!--          Der Typ des v-models für das Feld ist dann String, nicht Number!!! -->
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="nullNiveau"
                  label="[m über 0.0]"
                  hint="VueAutoNumeric, Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                  <!--
                    <vue-autonumeric
                      :id="id"
                      class="q-field__native text-right"
                      :options="autoNumericOptions"
                      :value="value"
                      @input="emitValue"
                      :placeholder="'###,##'"
                      v-show="floatingLabel"
                    >
                    </vue-autonumeric>
                    -->
                    <!--
                VueAutoNumeric is far better than VMoney!!!
                -->
                  </template>
                  <template v-slot:prepend>
                    <q-btn
                      dense
                      @click="myIncrementNullNiveau"
                      icon="arrow_drop_up"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                  <template v-slot:append>
                    <q-btn
                      dense
                      @click="myDecrementNullNiveau"
                      icon="arrow_drop_down"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                </q-field>
                <pre class="text-caption">
              {{ typeof nullNiveau }} {{ nullNiveau }}
            </pre
                >
              </div>
              <div class="col-2">
                <!-- Ausgabefeld für den aus dem 0.0-Wert computeten NHN-Wert -->
                <!-- ACHTUNG: Mit computed-Funktion auf v-model: v-model="computeNHNNiveauForAutoNumeric" -->
                <!-- ACHTUNG: Das "echte" v-model nhnNiveauObject muss dann in der computed-Funktion per Vue $set manuell aktualisiert werden! -->
                <!-- ACHTUNG: Hier mit computed wird die Formatierung durch die computed-Funktion erledigt, daher in diesem     -->
                <!--          Spezialfall q-input verwendet statt q-field. -->
                <!-- ACHTUNG: Mit q-field kokmmt eine Vue Warning "Computed property "computeNHNNiveau" -->
                <!--          was assigned to but it has no setter." Diese kann eliminiert werden durch Umstellung -->
                <!--          der computed-Funktion auf Getter/Setter (siehe baueinheit-geschoss-baueigenschafts-profil-formular.js) -->
                <!-- ACHTUNG: VueAutoNumeric ist hier durch die Formatierung in der computed-Funktion  sogar ganz"außen vor", -->
                <!--          der Template VSlot dafür -->
                <!--          kann deshalb entfernt werden - es funktioniert dann (im Feld-disabled-Fall!) OHNE VueAutoNumeric -->
                <!-- ACHTUNG: Für anderen Use Case, wo ein Istwert aus einem Sollwert initialisiert werden soll, -->
                <!--          muss anders verfahren werden: -->
                <!--          q-field mit eingebettetem v-autonumeric und normalem v-model für den Istwert, OHNE computed-Funktion, NICHT disabled -->
                <!--          Initialisierung des Istwerts aus dem Sollwert in mounted: Wenn Istwert == null ist, -->
                <!--          das v-model des Istwerts mit dem Sollwert initialisieren -->
                <!-- ACHTUNG: input-class="text-right", damit es so formatiert wird wie im ersten q-field!!! -->
                <q-input
                  dense
                  disable
                  square
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-black text-right"
                  v-model="computeNHNNiveauForAutoNumeric"
                  label="[m über NHN]"
                  hint="VueAutoNumeric, Format: #.###,00"
                >
                  <!--
                <template
                  v-slot:control="{ id, floatingLabel, value, emitValue }"
                >
                  <vue-autonumeric
                    :id="id"
                    class="q-field__native text-right"
                    :options="autoNumericOptions"
                    :value="value"
                    @input="emitValue"
                    :placeholder="'###,##'"
                    v-show="floatingLabel"
                  >
                  </vue-autonumeric>
                </template>
              -->
                </q-input>
                <pre class="text-caption">
               {{ typeof nhnNiveauObject.kennWert1 }} {{
                    nhnNiveauObject.kennWert1
                  }}
              </pre
                >
              </div>
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs">
              <div class="row full-width">
                Reguläres Ausgabefeld für Sollwert und mit Sollwert
                initialisiertes VueAutoNumeric-Eingabefeld für Istwert
              </div>
              <div class="col-2">
                <!-- Ausgabefeld für den Sollwert -->
                <!-- ACHTUNG: Mit computed-Funktion auf v-model: v-model="computeSollWertForAutoNumeric" -->
                <!-- ACHTUNG: Das "echte" v-model ist sollWertObject.kennWert1, woraus diese computed-Funktion den Wert holt -->
                <!-- ACHTUNG: Hier mit computed wird die Formatierung durch die computed-Funktion erledigt, daher in diesem     -->
                <!--          Spezialfall q-input verwendet statt q-field. -->
                <!-- ACHTUNG: Mit q-field kokmmt eine Vue Warning "Computed property "computeNHNNiveau" -->
                <!--          was assigned to but it has no setter." Diese kann eliminiert werden durch Umstellung -->
                <!--          der computed-Funktion auf Getter/Setter (siehe baueinheit-geschoss-baueigenschafts-profil-formular.js) -->
                <!-- ACHTUNG: VueAutoNumeric ist hier durch die Formatierung in der computed-Funktion  sogar ganz"außen vor", -->
                <!--          der Template VSlot dafür -->
                <!--          kann deshalb entfernt werden - es funktioniert dann (im Feld-disabled-Fall!) OHNE VueAutoNumeric -->
                <!-- ACHTUNG: input-class="text-right", damit es so formatiert wird wie im ersten q-field!!! -->
                <q-input
                  dense
                  disable
                  square
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-black text-right"
                  v-model="computeSollWertForAutoNumeric"
                  label="Sollwert [m]"
                  hint="VueAutoNumeric, Format: #.###,00"
                >
                  <!--
                <template
                  v-slot:control="{ id, floatingLabel, value, emitValue }"
                >
                  <vue-autonumeric
                    :id="id"
                    class="q-field__native text-right"
                    :options="autoNumericOptions"
                    :value="value"
                    @input="emitValue"
                    :placeholder="'###,##'"
                    v-show="floatingLabel"
                  >
                  </vue-autonumeric>
                </template>
              -->
                </q-input>
                <pre class="text-caption">
               {{ typeof sollWertObject.kennWert1 }} {{
                    sollWertObject.kennWert1
                  }}
            </pre
                >
              </div>
              <div class="col-2">
                <!-- Eingabefeld für Dezimalzahl (Istwert) mit VueAutoNumeric -->
                <!-- ACHTUNG: Für den Use Case, wo ein Istwert aus einem Sollwert initialisiert werden soll, -->
                <!--          q-field mit eingebettetem v-autonumeric und normalem v-model für den Istwert, OHNE computed-Funktion, NICHT disabled -->
                <!-- ACHTUNG: Das v-model für den Istwert, istWertObject.kennWert1, muss in mounted mit dem Sollwert initialisiert werden, wenn Sollwert nicht null ist!!! -->
                <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Dezimalzahl-Formatierung durch VueAutoNumeric NICHT! -->
                <!--          Der Typ des v-models für das Feld ist dann String, nicht Number!!! -->
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="istWertObject.kennWert1"
                  label="Istwert [m]"
                  hint="VueAutoNumeric, Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                  <!--
                    <vue-autonumeric
                      :id="id"
                      class="q-field__native text-right"
                      :options="autoNumericOptions"
                      :value="value"
                      @input="emitValue"
                      :placeholder="'###,##'"
                      v-show="floatingLabel"
                    >
                    </vue-autonumeric>
                    -->
                    <!--
                VueAutoNumeric is far better than VMoney!!!
                -->
                  </template>
                  <template v-slot:prepend>
                    <q-btn
                      dense
                      @click="myIncrementIstWert"
                      icon="arrow_drop_up"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                  <template v-slot:append>
                    <q-btn
                      dense
                      @click="myDecrementIstWert"
                      icon="arrow_drop_down"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                </q-field>
                <pre class="text-caption">
              {{ typeof istWertObject.kennWert1 }} {{ istWertObject.kennWert1 }}
            </pre
                >
              </div>
            </div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test06TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test07TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Dezimalzahl-Formatierung mit VueNumeric                                       -->
            <!-- Potentielle Alternative mit Vue 2 Support zu VueAutoNumeric                             -->
            <!-- https://www.npmjs.com/package/vue-numeric                                               -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Eingabe- und Ausgabefelder für Dezimalzahlen mit VueNumeric
              als Ersatz für VueAutoNumeric [disabled]
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs" v-if="false">
              <div class="row full-width">
                <br />
                VueNumeric-Eingabefeld für 0.0-Wert und aus dem Wert des
                Eingabefelds berechnetes reguläres Ausgabefeld für NHN-Wert
                <br />
              </div>
              <div class="col-2">
                <!-- Eingabefeld für Dezimalzahl mit VueAutoNumeric -->
                <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Dezimalzahl-Formatierung durch VueAutoNumeric NICHT! -->
                <!--          Der Typ des v-models für das Feld ist dann String, nicht Number!!! -->
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="nullNiveau"
                  label="[m über 0.0]"
                  hint="VueNumeric, Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                    <!-- ACHTUNG: placeholder="###,##" funktioniert so NICHT, ist keine Maske wie der gleichnamige Parameter bei VueAutoNumeric, -->
                    <!-- sondern nur ein Default-Text im Eingabefeld, wenn dieses gecleared wurde!!! -->
                    <vue-numeric
                      :id="id"
                      class="q-field__native text-right"
                      :value="value"
                      @input="emitValue"
                      placeholder="###,##"
                      v-show="floatingLabel"
                      decimal-separator=","
                      :precision="2"
                      thousand-separator="."
                      :max="999.99"
                      :min="-999.99"
                      :empty-value="null"
                      output-type="Number"
                    >
                    </vue-numeric>
                    <!--
                -->
                  </template>
                  <template v-slot:prepend>
                    <q-btn
                      dense
                      @click="myIncrementNullNiveauVueNumeric"
                      icon="arrow_drop_up"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                  <template v-slot:append>
                    <q-btn
                      dense
                      @click="myDecrementNullNiveauVueNumeric"
                      icon="arrow_drop_down"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                </q-field>
                <pre class="text-caption">
              {{ typeof nullNiveau }} {{ nullNiveau }}
            </pre
                >
              </div>
              <div class="col-2">
                <!-- Ausgabefeld für den aus dem 0.0-Wert computeten NHN-Wert -->
                <!-- ACHTUNG: Mit computed-Funktion auf v-model: v-model="computeNHNNiveauForAutoNumeric" -->
                <!-- ACHTUNG: Das "echte" v-model nhnNiveauObject muss dann in der computed-Funktion per Vue $set manuell aktualisiert werden! -->
                <!-- ACHTUNG: Hier mit computed wird die Formatierung durch die computed-Funktion erledigt, daher in diesem     -->
                <!--          Spezialfall q-input verwendet statt q-field. -->
                <!-- ACHTUNG: Mit q-field kokmmt eine Vue Warning "Computed property "computeNHNNiveau" -->
                <!--          was assigned to but it has no setter." Diese kann eliminiert werden durch Umstellung -->
                <!--          der computed-Funktion auf Getter/Setter (siehe baueinheit-geschoss-baueigenschafts-profil-formular.js) -->
                <!-- ACHTUNG: VueAutoNumeric ist hier durch die Formatierung in der computed-Funktion  sogar ganz"außen vor", -->
                <!--          der Template VSlot dafür -->
                <!--          kann deshalb entfernt werden - es funktioniert dann (im Feld-disabled-Fall!) OHNE VueAutoNumeric -->
                <!-- ACHTUNG: Für anderen Use Case, wo ein Istwert aus einem Sollwert initialisiert werden soll, -->
                <!--          muss anders verfahren werden: -->
                <!--          q-field mit eingebettetem v-autonumeric und normalem v-model für den Istwert, OHNE computed-Funktion, NICHT disabled -->
                <!--          Initialisierung des Istwerts aus dem Sollwert in mounted: Wenn Istwert == null ist, -->
                <!--          das v-model des Istwerts mit dem Sollwert initialisieren -->
                <!-- ACHTUNG: input-class="text-right", damit es so formatiert wird wie im ersten q-field!!! -->
                <q-input
                  dense
                  disable
                  square
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-black text-right"
                  v-model="computeNHNNiveauForVueNumeric"
                  label="[m über NHN]"
                  hint="VueNumeric, Format: #.###,00"
                >
                  <!--
                <template
                  v-slot:control="{ id, floatingLabel, value, emitValue }"
                >
                  <vue-autonumeric
                    :id="id"
                    class="q-field__native text-right"
                    :options="autoNumericOptions"
                    :value="value"
                    @input="emitValue"
                    :placeholder="'###,##'"
                    v-show="floatingLabel"
                  >
                  </vue-autonumeric>
                </template>
              -->
                </q-input>
                <pre class="text-caption">
               {{ typeof nhnNiveauObject.kennWert1 }} {{
                    nhnNiveauObject.kennWert1
                  }}
              </pre
                >
              </div>
              <div class="col-8">
                VueNumeric funktioniert hier bisher nur mit
                output-type="Number".
                <br />
                Zusätzlich mussten am VueNumeric-Feld links die Konvertierungen
                in den Inkrement-/Dekrement-Funktionen angepasst werden - siehe
                Kommentare dort!
              </div>
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs" v-if="false">
              <div class="row full-width">
                Reguläres Ausgabefeld für Sollwert und mit Sollwert
                initialisiertes VueNumeric-Eingabefeld für Istwert
              </div>
              <div class="col-2">
                <!-- Ausgabefeld für den Sollwert -->
                <!-- ACHTUNG: Mit computed-Funktion auf v-model: v-model="computeSollWertForAutoNumeric" -->
                <!-- ACHTUNG: Das "echte" v-model ist sollWertObject.kennWert1, woraus diese computed-Funktion den Wert holt -->
                <!-- ACHTUNG: Hier mit computed wird die Formatierung durch die computed-Funktion erledigt, daher in diesem     -->
                <!--          Spezialfall q-input verwendet statt q-field. -->
                <!-- ACHTUNG: Mit q-field kokmmt eine Vue Warning "Computed property "computeNHNNiveau" -->
                <!--          was assigned to but it has no setter." Diese kann eliminiert werden durch Umstellung -->
                <!--          der computed-Funktion auf Getter/Setter (siehe baueinheit-geschoss-baueigenschafts-profil-formular.js) -->
                <!-- ACHTUNG: VueAutoNumeric ist hier durch die Formatierung in der computed-Funktion  sogar ganz"außen vor", -->
                <!--          der Template VSlot dafür -->
                <!--          kann deshalb entfernt werden - es funktioniert dann (im Feld-disabled-Fall!) OHNE VueAutoNumeric -->
                <!-- ACHTUNG: input-class="text-right", damit es so formatiert wird wie im ersten q-field!!! -->
                <q-input
                  dense
                  disable
                  square
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-black text-right"
                  v-model="computeSollWertForAutoNumeric"
                  label="Sollwert [m]"
                  hint="VueNumeric, Format: #.###,00"
                >
                  <!--
                <template
                  v-slot:control="{ id, floatingLabel, value, emitValue }"
                >
                  <vue-autonumeric
                    :id="id"
                    class="q-field__native text-right"
                    :options="autoNumericOptions"
                    :value="value"
                    @input="emitValue"
                    :placeholder="'###,##'"
                    v-show="floatingLabel"
                  >
                  </vue-autonumeric>
                </template>
              -->
                </q-input>
                <pre class="text-caption">
               {{ typeof sollWertObject.kennWert1 }} {{
                    sollWertObject.kennWert1
                  }}
            </pre
                >
              </div>
              <div class="col-2">
                <!-- Eingabefeld für Dezimalzahl (Istwert) mit VueNumeric -->
                <!-- ACHTUNG: Für den Use Case, wo ein Istwert aus einem Sollwert initialisiert werden soll, -->
                <!--          q-field mit eingebettetem vue-numeric und normalem v-model für den Istwert, OHNE computed-Funktion, NICHT disabled -->
                <!-- ACHTUNG: Das v-model für den Istwert, istWertObject.kennWert1, muss in mounted mit dem Sollwert initialisiert werden, wenn Sollwert nicht null ist!!! -->
                <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Dezimalzahl-Formatierung durch VueAutoNumeric NICHT! -->
                <!--          Der Typ des v-models für das Feld ist dann String, nicht Number!!! -->
                <q-field
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="istWertObject.kennWert1"
                  label="Istwert [m]"
                  hint="VueNumeric, Format: #.###,00"
                >
                  <template
                    v-slot:control="{ id, floatingLabel, value, emitValue }"
                  >
                    <!-- ACHTUNG: placeholder="###,##" funktioniert so NICHT, ist keine Maske wie der gleichnamige Parameter bei VueAutoNumeric, -->
                    <!-- sondern nur ein Default-Text im Eingabefeld, wenn dieses gecleared wurde!!! -->
                    <vue-numeric
                      :id="id"
                      class="q-field__native text-right"
                      :value="value"
                      @input="emitValue"
                      placeholder="###,##"
                      v-show="floatingLabel"
                      decimal-separator=","
                      :precision="2"
                      thousand-separator="."
                      :max="999.99"
                      :min="-999.99"
                      :empty-value="null"
                      output-type="Number"
                    >
                    </vue-numeric>
                    <!--
                -->
                  </template>
                  <template v-slot:prepend>
                    <q-btn
                      dense
                      @click="myIncrementIstWertVueNumeric"
                      icon="arrow_drop_up"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                  <template v-slot:append>
                    <q-btn
                      dense
                      @click="myDecrementIstWertVueNumeric"
                      icon="arrow_drop_down"
                      color="grey-4"
                      text-color="black"
                      style="width:20px"
                    >
                    </q-btn>
                  </template>
                </q-field>
                <pre class="text-caption">
              {{ typeof istWertObject.kennWert1 }} {{ istWertObject.kennWert1 }}
            </pre
                >
              </div>
              <div class="col-8">
                VueNumeric funktioniert hier bisher nur mit
                output-type="Number".
                <br />
                Zusätzlich mussten am VueNumeric-Feld rechts die Konvertierungen
                in den Inkrement-/Dekrement-Funktionen angepasst werden - siehe
                Kommentare dort!
              </div>
            </div>
            <div style="color: red" class="text-subtitle1">
              Achtung: Leider unterstützt VueNumeric nur die Ausgabe von
              Dezimalzahlen mit per Property precision definierten
              Dezimalstellen, nicht die Eingabe von maskierten Dezimalzahlen im
              Format ###.##!!! Daher VueNumeric wieder deinstalliert - beim
              Aufruf dieses Tabs daher Fehler.
            </div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test07TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test08TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Vue Filters                                                                   -->
            <!-- Potentielle Alternative zu VueAutoNumeric?                                              -->
            <!-- https://www.npmjs.com/package/vue2-filters#placeholder                                  -->
            <!-- https://stackoverflow.com/questions/54744877/vue-filters-for-input-v-model              -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Vue 2 Filters [disabled]
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs" v-if="false">
              <div class="row full-width">
                <br />
                Vue Filter auf Eingabefeld
                <br />
              </div>
              <div class="col-2">
                <q-input
                  dense
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  input-class="text-black text-right"
                  :value="myFilterValue | number('0,00')"
                  @input="myFilterFunction"
                  label="[m über NHN]"
                  hint="Vue Filter"
                >
                </q-input>
                <pre class="text-caption">
              Ungefilterter Wert: {{ myFilterValue }}
              Gefilterter Wert: {{ myFilterValue | number("0.00") }}
            </pre
                >
              </div>
            </div>
            <div style="color: red" class="text-subtitle1">
              Achtung: Offenbar unterbindet der Vue Filter number('0.00') nicht
              Falscheingaben wie z.B. Backspace oder Buchstaben. Er macht nach
              Benutzereingabe lediglich eine Rundung des eingegebenen Werts auf
              2 Nachkommastellen.
            </div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test08TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test09TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Vue Currency Input                                                            -->
            <!-- https://github.com/dm4t2/vue-currency-input                                             -->
            <!-- https://dm4t2.github.io/vue-currency-input/                                             -->
            <!-- https://dm4t2.github.io/vue-currency-input/guide.html                                   -->
            <!-- https://dm4t2.github.io/vue-currency-input/playground.html                              -->
            <!-- Nutzung in Quasar QInput-Feld:                                                          -->
            <!-- https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/QCurrencyInput.vue -->
            <!-- Unterstützt Vue 3!                                                                      -->
            <!-- Benutzt Vue Composition API                                                             -->
            <!-- Installation:                                                                           -->
            <!-- ...\bim-click-front-end>                                                                -->
            <!-- npm install vue-currency-input                                                          -->
            <!-- npm install @vue/composition-api                                                        -->
            <!-- ACHTUNG: https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/QCurrencyInput.vue -->
            <!-- If the value of the input is changed externally (and not only by user input)            -->
            <!-- you need to use the setValue function returned by useCurrencyInput within a watcher.    -->
            <!-- Dies ist wegen unserer computed-Funktionen zur Vorinitialisierung von Feldern           -->
            <!-- und der Inkrement-/Dekrement-Funktionen bei uns der Fall!                               -->
            <!-- Code-Beispiel dafür unter obigem Link!                                                  -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Vue Currency Input
            </div>
            <div class="row full-width q-pa-none q-col-gutter-xs" v-if="true">
              <div class="col-3">
                <!-- Hier wird die Komponente QDecimalInput eingebettet: -->
                <!-- Diese liegt im ..\components Ordner und wird weiter oben im Code importiert -->
                <!-- Vorlage: https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/App.vue:35-295 -->
                <!-- Zu den verschiedenen Lösungen: Siehe Kommentare in dezimal-eingabe.vue -->
                <!-- ----------------------------------------------------------------------------- -->
                <!-- Lösung 3 (verworfen): -->
                <!-- Hier testweise zusätzlich zum v-model ein v-bind eingebaut, -->
                <!-- siehe Kommentare in dezimal-eingabe.vue dazu -->
                <!-- v-model="istWertObject.kennWert1" -->
                <!-- v-bind:unterFeld.sync="istWertObject.kennWert1" - verworfen -->
                <!-- Lösung 3 funktioniert nur MIT watch() in dezimal-eingabe.vue!!! -->
                <!-- ----------------------------------------------------------------------------- -->
                <!-- Lösung 5 (gewählt): -->
                <!-- v-model, hier für Test mit istWertObject, welches in mounted() mit Wert aus -->
                <!-- sollWertObject initialisiert wird. -->
                <!-- v-model="istWertObject.kennWert1" -->
                <!-- Alternativ ist auch ein Test mit v-model="myCurrencyInputValue" möglich. -->
                <!-- Lösung 5 funktioniert zusammen mit $emit("input", number) -->
                <!-- Lösung 5 funktioniert nur MIT watch() in dezimal-eingabe.vue!!! -->
                <!-- ----------------------------------------------------------------------------- -->
                <!-- Versuch 6 (Stefan): -->
                <!-- :value="istWertObject.kennWert1" -->
                <!-- @update="istWertObject.kennWert1 = $event" -->
                <!-- Alternativ zu letzter Zeile ist auch möglich (allerdings ist der Update -->
                <!-- Handler dabei spezifisch für das jeweilige Feld): -->
                <!-- @update="myUpdateHandlerDecimalInput":-->
                <!-- Siehe https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components) -->
                <!-- Lösung 6 hat zusätzlich noch einen weiteren @update-Handler in der Komponente selbst am q-input -->
                <!-- Dieser wirft aber einen Laufzeitfehler und war eigentlich dazu gedacht, den watch() überflüssig zu machen, -->
                <!-- daher diese Lösung nicht weiter verfolgt! -->
                <!-- Lösung 6 funktioniert zusammen mit $emit("update", number) -->
                <!-- Lösung 6 funktioniert leider auch nur MIT watch() in dezimal-eingabe.vue!!! -->
                <!-- ----------------------------------------------------------------------------- -->
                <!--
                <QDecimalInput
                  v-model="istWertObject.kennWert1"
                  :options="{
                    currency: 'EUR', // Ist erforderlich, wird aber unterdrückt
                    currencyDisplay: 'hidden', // 'EUR' nicht anzeigen
                    autoDecimalDigits: false, // Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is false (the decimal symbol needs to be inserted manually).
                    precision: 2, // 2 Nachkommastellen
                    // distractionFree: false, // So nicht dokumentiert in API Reference
                    hideCurrencySymbolOnFocus: true, // Whether to hide the currency symbol on focus. Default is true.
                    hideGroupingSeparatorOnFocus: true, // Whether to hide the grouping separator on focus. Default is true.
                    hideNegligibleDecimalDigitsOnFocus: true, // Whether to hide negligible decimal digits on focus. Default is true.
                    valueRange: { min: -1000, max: 1000 }, // The range of accepted values as object {min, max}. Default is undefined (no value range).
                    // The validation is triggered on blur and automatically sets the respective threshold if out of range.
                    useGrouping: true // Trennzeichen für Tausenderstellen, '.' mit deutschem Locale
                  }"
                />
                -->
              </div>
            </div>
            <div style="color: red" class="text-subtitle1"></div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test09TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test10TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Normaussentemperaturen per API
            </div>
            <q-form
              @submit="onSubmitNormAussenTemperaturen"
              @reset="onResetNormAussenTemperaturen"
              class="q-pa-none"
            >
              <div class="row full-width q-pa-none q-col-gutter-xs">
                <div class="col-3">
                  <q-input
                    square
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    dense
                    v-model="postLeitZahl"
                    label="Postleitzahl"
                    hint="Postleitzahl eingeben"
                    lazy-rules
                    :rules="[
                      val =>
                        (val && val.length > 0) || 'Bitte Postleitzahl eingeben'
                    ]"
                    mask="#####"
                    fill-mask
                  >
                  </q-input>
                  <q-input
                    readonly
                    square
                    bg-color="green-2"
                    standout="bg-teal-4 text-black"
                    dense
                    type="number"
                    v-model="auslegungsAussenTemperatur"
                    label="Auslegungsaußentemperatur"
                    hint="Auslegungsaußentemperatur"
                  >
                  </q-input>
                  <q-input
                    readonly
                    square
                    bg-color="green-2"
                    standout="bg-teal-4 text-black"
                    dense
                    type="number"
                    v-model="jahresMittlereAussenTemperatur"
                    label="Jahresmittlere Außentemperatur"
                    hint="Jahresmittlere Außentemperatur"
                  >
                  </q-input>
                  <q-separator spaced />
                  <div class="row q-col-gutter-xs">
                    <div class="col-6">
                      <q-btn
                        label="Normaußentemperaturen"
                        class="stretch full-width"
                        type="submit"
                        color="positive"
                        glossy
                        no-caps
                      ></q-btn>
                    </div>
                    <div class="col-6">
                      <q-btn
                        label="Alle Felder leeren"
                        class="stretch full-width"
                        type="reset"
                        color="deep-orange-8"
                        glossy
                        no-caps
                      ></q-btn>
                    </div>
                  </div>
                  <!-- Button für Klimakarte: -->
                  <q-separator spaced />
                  <div class="row">
                    <q-btn
                      class="stretch full-width"
                      style="height: 100%"
                      href="https://www.waermepumpe.de/normen-technik/klimakarte/"
                      type="a"
                      target="_blank"
                      label="Klimakarte nach DIN 12831-1 (dort PLZ eingeben)"
                      color="blue-grey-7"
                      glossy
                      no-caps
                    />
                  </div>
                </div>
              </div>
            </q-form>
            <!-- </div> -->
          </q-tab-panel>
          <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
        </q-tab-panels>
      </q-tab-panel>
      <q-tab-panel name="test2TabVerwaltung" class="q-pa-xs">
        <q-tabs
          mobile-arrows
          class="q-pa-none text-black bg-grey-4 full-width"
          active-color="primary"
          active-bg-color="white"
          content-class="text-h7"
          dense
          align="left"
          v-model="tabTestArea2"
          @input="initialisiereAusgewaehltesTabVerwaltung"
        >
          <q-tab
            name="test11TabVerwaltung"
            label="Raumnachbarschaften (Tabelle)"
            no-caps
          />
          <q-tab
            name="test12TabVerwaltung"
            label="Raumnachbarschaften (Grafik)"
            no-caps
          />
          <q-tab
            name="test13TabVerwaltung"
            label="Testautomation (Selenium)"
            no-caps
          />
          <q-tab
            name="test14TabVerwaltung"
            label="Import (abstractBIM)"
            no-caps
          />
          <q-tab
            name="test15TabVerwaltung"
            label="Nutzlastkategorien (QSelect)"
            no-caps
          />
          <q-tab
            name="test16TabVerwaltung"
            label="Jobverwaltung (Agenda)"
            no-caps
          />
          <q-tab
            name="test17TabVerwaltung"
            label="Content Management (ButterCMS)"
            no-caps
          />
          <q-tab
            name="test18TabVerwaltung"
            label="Content Management (Storyblok)"
            no-caps
          />
        </q-tabs>
        <q-tab-panels v-model="tabTestArea2" class="q-pa-xs">
          <q-tab-panel name="test11TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Nachbarschaftsbeziehungen zwischen Räumen für den
              Schallschutz
            </div>
            <q-separator />
            <br />
            <template>
              <vue-excel-editor
                v-model="raumNachbarschaften"
                autocomplete
                filter-row
                :cell-style="quasarCellStyle"
                :localized-label="deutscheLabels"
              >
                <vue-excel-column
                  field="geschoss"
                  label="Geschoss"
                  type="select"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(252, 228, 236)' }"
                  :options="geschossOptions"
                />
                <!-- pink-1 -->
                <vue-excel-column
                  field="raum"
                  label="Raum"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(252, 228, 236)' }"
                  :options="raumOptions"
                />
                <!-- pink-1 -->
                <vue-excel-column
                  field="nachbarGeschoss"
                  label="Nachbargeschoss"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(232, 234, 246)' }"
                  :options="geschossOptions"
                />
                <!-- indigo-1 -->
                <vue-excel-column
                  field="nachbarRaum"
                  label="Nachbarraum"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(232, 234, 246)' }"
                  :options="raumOptions"
                />
                <!-- indigo-1 -->
                <vue-excel-column
                  field="geschossTrennBauteil"
                  label="Geschoss Trennbauteil"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(224, 247, 250)' }"
                  :options="geschossOptions"
                />
                <!-- cyan-1 -->
                <vue-excel-column
                  field="raumTrennBauteil"
                  label="Raum Trennbauteil"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(224, 247, 250)' }"
                  :options="raumOptions"
                />
                <!-- cyan-1 -->
                <vue-excel-column
                  field="trennBauteil"
                  label="Trennbauteil"
                  type="string"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(224, 247, 250)' }"
                  :options="bauteilOptions"
                />
                <!-- cyan-1 -->
                <vue-excel-column
                  field="typTrennBauteil"
                  label="Typ Trennbauteil"
                  type="select"
                  width="150px"
                  :options="['Wand', 'Boden/Decke']"
                  :init-style="{ backgroundColor: 'rgb(224, 247, 250)' }"
                />
                <!-- cyan-1 -->
                <vue-excel-column
                  field="laengeTrennKante"
                  label="Gemeinsame Trennkantenlänge [cm]"
                  type="number"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(178,223,219)' }"
                />
                <!-- teal-2 -->
                <vue-excel-column
                  field="trennFlaeche"
                  label="Gemeinsame Trennfläche [m²]"
                  type="number"
                  width="150px"
                  :init-style="{ backgroundColor: 'rgb(178,223,219)' }"
                />
                <!-- teal-2 -->
                <!-- <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="100px" /> -->
              </vue-excel-editor>
            </template>
            <br />
            <br />
            <b>Hinweise zur Implementierung:</b>
            <ul>
              <li>
                Bezeichnungen für Räume sind nur eindeutig für ein Geschoss,
                Bezeichnungen für Bauteile (Wände/Böden) sind nur eindeutig für
                einen Raum.
              </li>
              <li>
                Deshalb müssen in der Tabelle jeweils das Geschoss bzw. der Raum
                mit ausgewählt und angezeigt werden.
              </li>
              <li>
                Die oben für den Prototyp verwendete Komponente
                <b>Vue Excel Editor</b>
                kann allerdings nur Select-Options für ganze Spalten einheitlich
                verwalten (wie Excel).
              </li>
              <li>
                Deshalb sollte zur echten Implementierung der
                Nachbarschaftsbeziehungen eine <b>Quasar QTable</b> (ähnlich wie
                bei der Verwaltung der einer Baueinheit zugeordneten
                Baueigenschaftsprofile) verwendet werden.
              </li>
              <li>
                Die Tabelle sollte als Teil des Baueigenschaftsprofils für
                <b>Gebäude</b>
                verwaltet werden. Dies ist am flexibelsten - es können so auch
                vertikale Nachbarschaften zwischen Räumen in verschiedenen
                Geschossen verwaltet werden. Das hier prototypisch
                implementierte Formular sollte als Teil des Profilformulars für
                Gebäude angezeigt werden.
              </li>
              <li>
                Die dafür notwendigen Schema-, d.h. Model-Änderungen können im
                <b>baueinheitenModel</b>
                erfolgen (Array of Objects, jedes Object enthält mehrere
                Referenzen auf die in der Nachbarschaftsbeziehung vertretenen
                Baueinheiten, d.h. Geschosse, Räume bzw. (Trenn-)Bauteile, sowie
                zusätzliche Felder für die Eigenschaften, die an der
                Relationship hängen, wie z.B. Trennkantenlänge und Trennfläche).
              </li>
              <li>
                Mit der MPath-Methode getImmediateChildren() bzw.
                getAllChildren() könnten alle <b>Räume</b> als direkte oder
                indirekte Kindbaueinheiten unter einem Geschoss gefunden werden
                (mit aktiviertem Profil "Baueinheit > Raum" und
                istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst
                === true). Analog können alle <b>Wände</b> bzw.
                <b>Böden</b> unter einem Raum gefunden werden. Dabei müssen die
                Bezeichnung und ggf. weitere Felder populiert werden.
              </li>
              <li>
                Testweise wurde dafür in baueinheiten.controller.js bereits eine
                Methode readRaumKindKnotenGeschossBaueinheit() implementiert,
                die die direkten und indirekten Kindknoten für ein Geschoss
                liest, an denen <b>Raumprofile</b> aktiviert sind
                (startsWith("Baueinheit > Raum")). Die Bezeichnungen dieser
                Profile könnten dann im QSelect für ein Geschoss, das in einer
                Raumnnachbarschaft vorkommt, als Options verwendet werden.
                Achtung: Diese Methode benutzt das Aggregation Framework, nicht
                die obigen MPath-Methoden! Eine alternative Variante mit
                getAllChildren() und Filterung der Räume per JS ist in der
                Methode unten auskommentiert.
              </li>
              <li>
                Ähnlich könnte eine analoge Funktion
                readWandKindKnotenRaumBaueinheit() die Kindknoten für einen Raum
                liefern, an denen <b>Wandprofile</b> aktiviert sind. Allerdings
                müsste auch diese Auswahl zweistufig aufgebaut werden: Zunächst
                muss ein Geschoss für ein Trennbauteil in einem
                Raum-Nachbarschaftspaar ausgesucht werden (eventuell
                eingeschränkt auf das/die Geschosse der bereits selektierten
                beiden Räume in dem betreffenden Raumnachbarschaftspaar), dann
                mittels obiger Funktion ein Raum in diesem Geschoss, dann können
                mittels dieser Funktion die passenden Wände in diesem Geschoss
                als Options angezeigt und eine davon als Trennbauteil ausgewählt
                werden. Falls diese Nachbarschaftsverwaltung sogar mehrere
                Trennbauteile (z.B. Flankenbauteile) unterstützen würde, könnten
                auf diese Weise auch mehrere Wände (oder Böden) als
                Trennbauteile festgelegt werden (die in der Tabellendarstellung
                dann weitere Spalten erfordern würden).
              </li>
              <li>
                Bei der Neuanlage einer Nachbarschaftsbeziehung im Formular
                "Neuanlage" werden zunächst alle Geschosse zur Auswahl
                angeboten. Wurde ein Geschoss ausgewählt, werden im Eingabefeld
                für einen Raum die Räume dieses Geschosses angezeigt. Ähnlich
                werden nach Auswahl eines Raums zur Auswahl eines Trennbauteils
                die Wände (wenn die beiden ausgewählten Räume im selben Geschoss
                liegen) bzw. die Böden der ausgewählten Räume zur Auswahl
                angeboten.
              </li>
              <li>
                Anmerkung zur <b>Datenintegrität:</b> Die Zuordnung von
                Geschossen, Räumen und Trennbauteilen zu solchen
                Nachbarschaftsbeziehungen würde dabei stets auf vorhandenen
                Baueinheiten erfolgen (die im Bauvorhabenbaum mit den
                vorhandenen Funktionen vorangelegt sein müssten). Allerdings
                müsste bei Löschung oder Umbenennung von Baueinheiten, die in
                diesen Nachbarschaftsbeziehungen referenziert werden, eine
                automatische Aktualisierung erfolgen, sonst käme es zu Fehlern
                beim Anzeigen der Tabelle!
              </li>
              <li>
                Bauteile (d.h. Wände oder Böden) werden als Kindbaueinheiten
                unter Räumen modelliert. Damit diese zentral verwaltete,
                gemeinsame Baueigenschaften haben können, könnten als
                Ausbaustufe zusätzlich sogenannte
                <b>Familienprofile</b> zum Einsatz kommen, dies diese
                gemeinsamen Eigenschaften enthalten. Diese Familienprofile
                werden weiter oben im Baum (am Geschoss oder Gebäude) aktiviert.
                Die dort eingetragenen Werte werden an alle Bauteile
                weitervererbt, können dort aber nicht verändert werden. Dies
                betrifft auch Schichten unterhalb von Wänden bzw. Böden! Ein
                identischer Aufbau von Bauteilen (z.B. aus n Schichten) kann
                dabei durch Verwendung entsprechender Vorlagen erreicht werden,
                würde allerdings somit nicht wirklich zentral (by Reference)
                verwaltet, sondern by Copy.
              </li>
              <li>
                Zur Modellierung von Räumen, die nicht rechteckig sind, und von
                Situationen, wo sowohl Außenwände als auch Innenwände einen Raum
                umschließen, ist es erforderlich, dass eine Raum mehr als 4
                Wände (d.h. Wandbaueinheiten mit aktiviertem Profil "Wand")
                haben kann! Dann können bestimmte Wände auch aufgesplittet
                werden, um die Wandlänge und die Trennkantenlänge zum
                Nachbbarraum identisch zu halten. Allerdings muss entschieden
                werden, ob/wie solche zusammengehörigen Wände ("Fluchten")
                explizit verwaltet werden, oder ob man dies nur implizit
                erlaubt.
              </li>
            </ul>
            <b>Zu klärende Fragen:</b>
            <ul>
              <li>
                <b>Wieviele Trennbauteile zwischen zwei benachbarten Räumem</b>
                sollen verwaltet weden, mit zusätzlichen weiteren Attributen wie
                z.B. der gemeinsamen Trennkantenlänge bzw. Trennfläche für das
                betreffende Trennbauteil? Der obige Prototyp unterstützt nur ein
                Trennbauteil pro Nachbarschaftsbeziehung. Zusätzlich könnte man
                für eine Nachbarschaftsbeziehung statt einzelner Trennwände und
                Trennböden/-decken auch weitere Flankenbauteile (bis zu 8?) pro
                Nachbarschaftsraumpaar verwalten, was die insgesamt zu
                verwaltenden und zu erfassenden Daten aber weiter erhöht.
              </li>
              <li>
                Wie soll <b>"außen"</b> modelliert werden? Dies könnte durch
                besonders "ausgezeichnete" Paare von fiktiven Geschossen/Räumen
                erfolgen - z.B. Geschoss: "Außen"/Raum: "Nordseite". Dabei
                verwendete Trennbauteile sind dann Außenwände bzw. Dächer.
                Ähnliches gilt für erdberührte Wände und Böden. Wenn man diese
                Situationen jedoch differenziert verwalten will, müsste man z.B.
                Unter-Himmelsrichtungen einführen ("Außenluft"/"Südwestseite")
                und Unterscheidungen für erdberührte Situationen ("Erde"/"Über
                Grundwasser"). Es ist noch unklar, ob dies statisch festlegbar
                ist für alle Situationen.
              </li>
              <li>
                Wie sollen <b>Fenster</b> und <b>Türen</b> modelliert werden? Im
                BIM.click-Metamodell wäre es naheliegend, diese als
                Kindbaueinheiten unter Wänden zu modellieren. Dann wären
                allerdings Kindbaueinheiten unter Wänden sowohl solche Fenster
                und Türen als auch Schichten. Im abstractBIM-Schema heißen
                Fenster und Türen "openings". Sie sind im Gegensatz zu dem hier
                für BIM.click vorgeschlagenen hierarchischen Metamodell
                gleichberechtigt zu Wänden (walls) und Böden/Decken (slabs), und
                werden Räumen (so wie auch walls und slabs) über das
                Zwischenkonstrukt analyticSurfaces zugeordnet.
              </li>
            </ul>
          </q-tab-panel>
          <!-- /q-tab-panel name="test11TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test12TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Raum-Kindbaueinheiten eines Geschosses lesen und in Diagramm
              anzeigen
            </div>
            <br />
            <div class="row full-width items-start q-col-gutter-xs">
              <div class="col-3">
                <q-input
                  square
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="baueinheitsIdVonGeschoss"
                  label="Id der Geschoss-Baueinheit"
                  hint="Id des Geschosses, z.B. '5ec2d3263c235300174794bd' (ohne Anführungszeichen). Hinweis: Zur Ermittlung der Id einer Baueinheit im Tab 'Einstellungen' den Debug-Modus einschalten. Dann wird im Tab 'Baueinheiten' für eine links im Bauvorhabenbaum ausgewählte Baueinheit deren Id im Unter-Tab 'Angaben zur Baueinheit' angezeigt."
                  hide-hint
                />
              </div>
              <div class="col-3">
                <q-btn
                  :disable="
                    this.baueinheitsIdVonGeschoss == null ||
                      this.baueinheitsIdVonGeschoss === ''
                  "
                  class="stretch full-width"
                  style="height:100%"
                  label="Raum-Kindbaueinheiten des Geschosses ermitteln"
                  color="secondary"
                  glossy
                  size="md"
                  no-caps
                  @click="leseRaumKindBaueinheitenVonGeschoss()"
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <!-- NEU: Vue Diagram Editor Komponente -->
            <!-- Verwendet Custom Functions nodeColorDiagramEditor(node), nodePulsableDiagramEditor(node) und formatNodeDiagramEditor(node) -->
            <VueDiagramEditor
              ref="diagram"
              :height="600"
              :node-color="nodeColorDiagramEditor"
              :node-pulsable="nodePulsableDiagramEditor"
            >
              <template slot="node" slot-scope="{ node }">
                <q-card flat square class="bg-grey-2">
                  <!--
            <q-card-section class="text-caption text-bold">
              {{ node.data.baueinheitsBezeichnung }}
            </q-card-section>
            <q-separator inset />
            -->
                  <q-card-section class="q-pt-none text-caption">
                    <small>
                      <b>Typ der Baueinheit im Bauvorhabenbaum:</b>
                      <br />
                      {{ node.data.baumKnotenTyp }}
                      <br />
                      {{ node.data.verzweigungsTyp }}
                    </small>
                  </q-card-section>
                  <q-separator inset />
                  <q-card-section class="q-pt-none text-caption">
                    <small>
                      <b>Koordinaten:</b>
                      <br />
                      x: {{ node.coordinates.x }} &nbsp; y:
                      {{ node.coordinates.y }}
                      <br />
                      <b>Größe:</b>
                      <br />
                      Breite: {{ node.size.width }} &nbsp; Höhe:
                      {{ node.size.height }}
                    </small>
                  </q-card-section>
                </q-card>
                <!--
            <small>
              {{
                formatNodeDiagramEditor(node)
              }}
           </small>
           -->
              </template>
            </VueDiagramEditor>
            <q-separator />
            <div class="row full-width q-col-gutter-xs q-pa-xs">
              <div class="col-3">
                <!-- ACHTUNG: Der folgende API-Call am @click schlägt fehl mit "...is not a function"!!! -->
                <!-- https://vue-diagram-editor.js.org/#methods -->
                <q-btn
                  class="stretch full-width"
                  color="secondary"
                  glossy
                  no-caps
                  label="Diagramm zentrieren"
                  @click="$refs.diagram.center()"
                />
              </div>
              <div class="col-9">
                <!-- $refs: {{ $refs }} -->
                <!-- Wirft ebenfalls Fehler im Log, "TypeError: Converting circular structure to JSON" -->
              </div>
            </div>
            <br />
            <q-expansion-item
              dense
              class="stretch full-width"
              header-class="text-bold bg-lime-3"
              label="
            Raum-Kindbaueinheiten des Geschosses (Schaltfläche rechts oben drücken zum Ermitteln)
          "
            >
            <!--
              <pre v-html="stringifyRaumKindBaueinheiten"></pre>
              -->
            </q-expansion-item>
            <br />
            <q-expansion-item
              dense
              class="stretch full-width"
              header-class="text-bold bg-lime-3"
              label="
            VModel für Diagram Editor (nach Ermittlung der Raum-Kindbaueinheiten werden diese dort aufbereitet)
          "
            >
            <!-- VUE3-Error
              <pre
              
                v-html="
                  JSON.stringify(compoundModelDiagramEditor.nodes, null, 2)
                "
              ></pre>
              -->
              <!-- <pre v-html="JSON.stringify(objectRaumKindBaueinheiten, null, 2)"></pre> -->
            </q-expansion-item>
          </q-tab-panel>
          <!-- /q-tab-panel name="test12TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test12aTabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: VG-Editor
            </div>
            <br />
            <!-- NEU: VG-Editor Komponente -->
            <!-- https://github.com/ChrisShen93/VGEditor -->
            <!-- https://chrisshen93.github.io/VGEditor/ -->
            <!-- Demo: https://chrisshen93.github.io/VGEditor/demo/build/#/flow -->
            <!-- Installiert am Frontend mit npm install vg-editor@2.7.2 -S bzw. -G -->
            <!-- Testergebnisse: -->
            <!-- Der eigentliche Editor kann nur mit speziellen CSS-Klassen an den Komponenten zum Laufen gebracht werden -->
            <!-- (demo-editor, demo-chart, etc., diese aus dem Source Code abgeleitet) -->
            <!-- Ohne diese gibt es Probleme bei der Einbettung, der Editor kommt zwar fehlerfrei hoch, es werden aber nur wenige Pixel angezeigt -->
            <!-- Die API-Doku ist chinesisch!  -->
            <!-- Im Demo Code auf GitHub sind zusätzliche Vue Komponenten für die Steuerung (Toolbar etc.), die wiederum -->
            <!-- Unterkomponenten der Vue-Komponente v-g-editor verwenden und aufrufen. -->
            <!-- Vorlage dafür: https://github.com/ChrisShen93/VGEditor/blob/master/demo/flow/index.vue -->
            <!-- Dort wird z.B. eine Unterkomponente FlowToolBar verwendet -->
            <!-- Diese liegt in https://github.com/ChrisShen93/VGEditor/blob/master/demo/components/EditorToolbar/FlowToolbar.vue -->
            <!-- Sie verwendet die Komponente { Toolbar } from 'vg-editor' -->
            <!-- Diese Komponenten müssten bei weiterem Ausbau der Verwendung von VG-Editor in BIM.click hier "nachgebaut" werden nach diesen Vorlagen! -->
            <!-- Dabei gibt es schwer zu durchschauende Abhängigkeiten auf die verwendeten CSS-Styles! -->
            <!-- Die direkte Verwendung von Toolbar unten funktioniert z.B. aus unbekanntem Grund NICHT, daher disabled! -->
            <!-- -->
            <v-g-editor class="">
              <div class="">
                <!--
              <div class="demo-chart-header">
                <toolbar class="demo-toolbar"/>
              </div>
              -->
                <flow :data="dataVGEditor" />
              </div>
            </v-g-editor>
          </q-tab-panel>
          <!-- -------------------------------------------------------------------------------------------------------------------------- -->
          <q-tab-panel name="test13TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Selenium (disabled, nicht aus Browser aufrufbar, stattdessen
              Standalone Node Module)
            </div>
            <br />
            <!--
        <div class="row full-width items-start q-col-gutter-xs">
          <div class="col-3">
            <q-btn
              :disable="false"
              class="stretch full-width"
              style="height:100%"
              label="Selenium Driver für Chrome starten"
              color="secondary"
              glossy
              size="md"
              no-caps
              @click="launchSelenium()"
            />
          </div>
        </div>
        -->
            <!--
        <br />
        <br />
        <br />
        -->
          </q-tab-panel>
          <!-- -------------------------------------------------------------------------------------------------------------------------------------- -->
          <q-tab-panel name="test14TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">Test: Import aus abstractBIM</div>
            <br />
            <div class="row full-width items-start q-gutter-xs">
              <div class="col-3">
                <q-input
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="bezeichnungZielGebaeude"
                  label="Gebäudebezeichnung"
                  hint="Bezeichnung des Zielgebäudes für den Import aus abstractBIM eingeben. Falls nicht vorhanden, wird ein Zielgebäude mit dieser Bezeichnung neu angelegt."
                >
                </q-input>
              </div>
              <div class="col-3">
                <q-btn
                  :disable="
                    bezeichnungZielGebaeude == null ||
                      bezeichnungZielGebaeude == ''
                  "
                  class="stretch full-width"
                  style="height:100%"
                  label="Gebäudemodell aus abstractBIM-Datei importieren"
                  color="accent"
                  glossy
                  size="md"
                  no-caps
                  @click="importAbstractBIMGebauede()"
                />
              </div>
            </div>
            <br />
          </q-tab-panel>
          <!-- /q-tab-panel name="test11TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test15TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Nutzungskategorien für Nutzlasten nach DIN EN 1991
            </div>
            <br />
            <div class="row full-width q-gutter-xs">
              <div class="col-3">
                <b>Nutzungskategorie</b>
                <!-- dense -->
                <!-- Dann ragt der Hint rechts über das Ende des QSelects hinaus -->
                <!-- label="Nutzungskategorie" -->
                <!-- Überflüssig, wenn Überschrift -->
                <!-- Quasar hint: -->
                <!-- :hint="computeNutzlastKategorieHint" -->
                <q-select
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  v-model="ausgewaehlteNutzlastKategorie"
                  :options="optionsNutzlastKategorie"
                  options-dense
                  hint="Bitte eine Nutzungskategorie für Nutzlasten nach DIN 1991 auswählen"
                >
                </q-select>
                <!-- Platz schaffen für Quasar hint - dieser kann nur darunter angezeigt werden -->
                <!--
            <p>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Alternative 1: Custom Hint mit der Möglichkeit, HTML-Formatierungen anzuzeigen (z.B. <b>..</b>): -->
                <!-- Allerdings missachtet dies die Quasar Column-Breite und wechselt eigenmächtig den Font! -->
                <!-- ACHTUNG: class="text-caption" am <div> oder <pre> beeinflusst zwar die Größe, aber mit dem falschen Font!-->
                <!-- Die folgende Kombination aus <div> und <pre> fixt zwar den Font und dessen Größe, aber nicht das Width-Problem! -->
                <!-- Das <pre> scheint also nicht mit dem Quasar Grid System kompatibel zu sein! -->
                <!-- Vorschläge in https://stackoverflow.com/questions/26028922/limit-the-width-size-in-pre führen nicht zur Lösung! -->
                <!-- Daher diese Alternative 2 disabled -->
                <!--
            <div
              style="font-size: 80%"
            >
              <pre v-html="computeNutzlastKategorieHint" style="font-family: Roboto">
              </pre>
            </div>
            -->
              </div>
              <!-- --------------------------------------------------------------------------------------------------------------- -->
              <!-- Alternative 2: Custom Hint, ohne HTML-Formatierungen, aber neben dem q-select statt darunter: -->
              <!-- Vorteil: Bei Auswahl einer Option ist der Hint nicht verdeckt durch die Options! -->
              <div class="col-3">
                <b>Beispiele für ausgewählte Nutzungskategorie</b>
                <br />
                <div class="text-caption">
                  {{ computeNutzlastKategorieHint }}
                </div>
              </div>
            </div>
          </q-tab-panel>
          <!-- --------------------------------------------------------------------------------------------------------------------- -->
          <q-tab-panel name="test16TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für #354, Agenda Job Scheduling                                                   -->
            <!-- https://npmjs.com/package/agenda                                                        -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Agenda Job Scheduling
            </div>
            <br />
            <div class="row full-width q-col-gutter-xs">
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Agenda Job für Import von Baustoffen starten"
                  color="secondary"
                  glossy
                  no-caps
                  @click="startImportBaustoffeAgendaJob()"
                />
                <br />
                <br />
                <b>Warnung: Löscht auf Heroku alle vorhandenen Baustoffe!</b>
                <br />Die Schaltfläche deshalb nur für lokale Tests drücken.
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  class="stretch full-width"
                  label="Agenda Testjob starten"
                  color="purple-4"
                  glossy
                  no-caps
                  @click="startAgendaJob()"
                />
              </div>
            </div>
          </q-tab-panel>
          <!-- /q-tab-panel name="test16TabVerwaltung -------------------------------------------------------------------------------->
          <q-tab-panel name="test17TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für ButterCMS Content Management Integration                                      -->
            <!-- https://buttercms.com                                                                   -->
            <!-- bim-click-front-end> npm install buttercms --save                                       -->
            <!-- Nach erfolgreichen Tests wieder deinstalliert mit npm uninstall buttercms               -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Content Management Integration mit ButterCMS (aktuell
              disabled)
            </div>
            <br />
            <div class="row full-width q-pa-xs">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="true"
                  class="stretch full-width"
                  label="Rufe ButterCMS APIs"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doButterCMSAPICalls()"
                />
              </div>
              <div class="col-md-6 col-12 q-pa-xs">
                <q-card dark bordered class="bg-grey-2 text-black">
                  <q-card-section>
                    <div class="text-h6">Text Content aus ButterCMS</div>
                    <div class="text-subtitle2">von Michael</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    {{ textCardButterCMS }}
                  </q-card-section>
                </q-card>
              </div>
              <div class="row full-width">
                <div class="col-md-9 col-12 q-pa-xs">
                  <q-card dark bordered class="bg-grey-2 text-black">
                    <q-card-section>
                      <div class="text-h6">Blog Content aus ButterCMS</div>
                      <div class="text-subtitle2">von Michael</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <!-- v-html, Vorlage: https://forum.quasar-framework.org/topic/6782/html-inside-qdialog/5 - sollte sanitized werden! -->
                      <!-- VUE3-Error
                      <div v-html="postCardButterCMS" class="text-caption">
                      </div>
                      -->
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="test18TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für Storyblok Content Management Integration                                      -->
            <!-- https://storyblok.com                                                                   -->
            <!-- https://github.com/storyblok/storyblok-vue                                              -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Content Management Integration mit Storyblok (aktuell
              disabled)
            </div>
            <br />
            <p v-for="story in stories" :key="story.id">{{ story.name }}</p>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="true"
                  class="stretch full-width"
                  label="Rufe Storyblok APIs"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doStoryblokAPICalls()"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-tab-panel>
      <q-tab-panel name="test3TabVerwaltung" class="q-pa-xs">
        <q-tabs
          mobile-arrows
          class="q-pa-none text-black bg-grey-4 full-width"
          active-color="primary"
          active-bg-color="white"
          content-class="text-h7"
          dense
          align="left"
          v-model="tabTestArea3"
          @input="initialisiereAusgewaehltesTabVerwaltung"
        >
          <q-tab
            name="test21TabVerwaltung"
            label="File Management (Filestack)"
            no-caps
          />
          <q-tab
            name="test22TabVerwaltung"
            label="File Management (OneDrive)"
            no-caps
          />
          <q-tab
            name="test23TabVerwaltung"
            label="Javascript Map"
            no-caps
          />
          <q-tab
            name="test24TabVerwaltung"
            label="Löschen von Baueinheitsbaueigenschaften in Baustoffen"
            no-caps
          />
          <q-tab
            name="test25TabVerwaltung"
            label="Lesen von Baueinheit mit Pfad und Kindern"
            no-caps
          />
           <q-tab
            name="test26TabVerwaltung"
            label="Migration von fachlichen Rubriken in Baueigenschaften"
            no-caps
          />
          <q-tab
            name="test27TabVerwaltung"
            label="Entferne Schutzkategorien in Baueigenschaften"
            no-caps
          />
          <!--
          <q-tab
            name="test28TabVerwaltung"
            label=""
            no-caps
          />
          <q-tab name="test27TabVerwaltung" label="" no-caps />
          <q-tab name="test28TabVerwaltung" label="" no-caps />
          -->
        </q-tabs>
        <q-tab-panels v-model="tabTestArea3" class="q-pa-xs">
          <q-tab-panel name="test21TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Datei-Upload mit Filestack
            </div>
            <br />
            <div class="row q-pa-xs q-gutter-xs full-width">
              <!-- ACHTUNG: @onUploadDone wird nicht ausgeführt! -->
              <q-btn
                :disable="false"
                class="q-pa-xs col-md-3 col-12 stretch"
                label="Datei hochladen mit Filestack File Picker"
                color="secondary"
                glossy
                no-caps
                @click="filestackUploadPickerOpen()"
                @onUploadDone="filestackUploadDone()"
              >
              </q-btn>
              <!-- ACHTUNG: @onUploadDone wird so nicht ausgeführt! -->
              <q-btn
                :href="
                  filestackPickerResponse
                    ? filestackPickerResponse.filesUploaded[0].url
                    : ''
                "
                type="a"
                target="_blank"
                class="q-pa-xs col-md-3 col-12 stretch"
                label="Datei anzeigen mit Filestack URL (nach Upload)"
                color="purple-4"
                glossy
                no-caps
                :disable="false"
              />
            </div>
            <br />
            <q-separator />
            filestackPickerResponse:
            <!-- NEU - Formatierung mit stringify -->
            <!-- Vorlage: https://stackoverflow.com/questions/45539735/prettify-json-string-vuejs2-webpack -->
            <!-- Erfordert Vue v-html und computed Property, die JSON.stringify aufruft! -->
            <!-- VUE3-Error
            <pre v-html="stringifyFilestackPickerResponse"></pre>
            -->
            <!-- ALT: -->
            <!--
            {{ filestackPickerResponse }}
            -->
          </q-tab-panel>
          <q-tab-panel name="test22TabVerwaltung" class="q-pa-xs">
            <div class="text-h6 q-pa-xs">
              Test: Datei-Upload zu OneDrive
            </div>
            <br />
            <div class="row q-pa-xs q-gutter-xs full-width">
              <q-btn
                :disable="false"
                class="q-pa-xs col-md-3 col-12 stretch"
                label="Datei auf OneDrive auswählen mit File Picker"
                color="secondary"
                glossy
                no-caps
                @click="oneDrivePickerOpen('share')"
              >
              </q-btn>
              <!-- -->
              <!-- OneDrive Picker Options als Parameter an oneDrivePickerOpen(action): -->
              <!-- action "share": oneDrivePickerResponse.value[0].webUrl enthält die URL der im Picker ausgewählten Datei! -->
              <!-- action "query": Damit kann u.a. auch ein Upload durchgeführt werden, etc. -->
              <q-btn
                :disable="!oneDrivePickerResponse"
                :href="
                  oneDrivePickerResponse
                    ? oneDrivePickerResponse.value[0].webUrl
                    : ''
                "
                type="a"
                target="_blank"
                class="q-pa-xs col-md-3 col-12 stretch"
                label="Ausgewählte Datei anzeigen per OneDrive URL"
                color="purple-4"
                glossy
                no-caps
              />
              <q-btn
                :disable="false"
                class="q-pa-xs col-md-3 col-12 stretch"
                label="Datei auf OneDrive hochladen mit File Picker"
                color="secondary"
                glossy
                no-caps
                @click="oneDrivePickerOpen('query')"
              >
              </q-btn>
            </div>
            <br />
            <q-separator />
            oneDrivePickerResponse:
            <!-- NEU - Formatierung mit stringify -->
            <!-- Vorlage: https://stackoverflow.com/questions/45539735/prettify-json-string-vuejs2-webpack -->
            <!-- Erfordert Vue v-html und computed Property, die JSON.stringify aufruft! -->
            <!--
            <pre v-html="stringifyOneDrivePickerResponse"></pre>
            -->
            <!-- ALT: -->
            <!-- -->
            <!-- {{ oneDrivePickerResponse }} -->
            <!-- -->
          </q-tab-panel>
          <q-tab-panel name="test23TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Tests für JS Map                                                                        -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Test: Javascript Map
            </div>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="false"
                  class="stretch full-width"
                  label="Führe Map Code aus"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doMapCalls()"
                />
              </div>
            </div>
            <br />
            testMap: {{ testMap }}
            <br />testMap['Otto'].a: {{ testMap["Otto"].a }}
            <br />testMap['Hugo'].e: {{ testMap["Hugo"].e }}
            <br />testMap['Bruno'].i {{ testMap["Bruno"].i }}
          </q-tab-panel>
          <q-tab-panel name="test24TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Löschen von Baueinheitsbaueigenschaften in Baustoffen, #396                             -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Löschen von Baueinheitsbaueigenschaften in Baustoffen
            </div>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="false"
                  class="stretch full-width"
                  label="Löschen Baueinheitsbaueigenschaften in Baustoffen"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doLoescheBaueinheitsBaueigenschaftenAnBaustoffen()"
                />
              </div>
            </div>
            <div style="color: red" class="q-pa-xs text-caption">
              <b>Achtung:</b> Löscht Baueigenschaften - nur für Administratoren!
            </div>
          </q-tab-panel>
          <q-tab-panel name="test25TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Löschen von Baueinheitsbaueigenschaften in Baustoffen, #396                             -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Lese Baueinheit mit Pfad und Kindern
            </div>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="false"
                  class="stretch full-width"
                  label="Lese Baueinheit mit Pfad und Kindern"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doLeseBaueinheitMitPfadUndKindern()"
                />
              </div>
            </div>
            <br />
            <q-tree
              dense
              node-key="_id"
              label-key="baueinheitsBezeichnung"
              :expanded.sync="expandedKeysTreeBaueinheiten"
              selected-color="white bg-primary shadow-2"
              no-nodes-label="Keine Baueinheiten vorhanden"
              no-results-label="Keine Baueinheiten erfüllen die Filterbedingungen"
              :nodes="ergebnisLeseBaueinheitMitPfadUndKindern"
            />

            <div style="color: black" class="q-pa-xs text-caption">
              <b>Hinweis:</b> Arbeitet auf festen Ids in der Datenbank - diese können nur im Code in verwaltung.vue angepasst werden
              <br />
              expandedKeysTreeBaueinheiten: {{ expandedKeysTreeBaueinheiten }}
              <br />
              ergebnisLeseBaueinheitMitPfadUndKindern:
              <br />
              <!-- VUE3-Error
              <pre v-html="JSON.stringify(ergebnisLeseBaueinheitMitPfadUndKindern, null, 2)">
              </pre>
              -->
            </div>
          </q-tab-panel>
          <q-tab-panel name="test26TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Migration von Baueigenschaften, #401                                                    -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Migration von fachlichen Rubriken/Kategorien in Baueigenschaften
            </div>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="false"
                  class="stretch full-width"
                  label="Migriere fachliche Rubriken/Kategorien in Baueigenschaften"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doMigriereFachlicheKategorienBaueigenschaften()"
                />
              </div>
            </div>
            <div style="color: red" class="q-pa-xs text-caption">
              <b>Achtung:</b> Ändert Baueigenschaften - nur für Administratoren!
            </div>
            <div style="color: black" class="q-pa-xs text-caption">
              Typbezogene Baueigenschaften:
              <br />
              <!-- VUE3-Error
              <pre v-html="JSON.stringify(ergebnisMigriereFachlicheKategorienBaueigenschaften, null, 2)">
              </pre>
              -->
            </div>
          </q-tab-panel>
          <q-tab-panel name="test27TabVerwaltung" class="q-pa-xs">
            <!-- ======================================================================================= -->
            <!-- Entfernung von Schutzkategorien in Baueigenschaften, #401                               -->
            <!-- ======================================================================================= -->
            <div class="text-h6 q-pa-xs">
              Entfernung der Schutzkategorien in Baueigenschaften
            </div>
            <br />
            <div class="row full-width">
              <div class="col-md-3 col-12 q-pa-xs">
                <q-btn
                  :disable="false"
                  class="stretch full-width"
                  label="Entferne alle Schutzkategorien in allen Baueigenschaften"
                  color="secondary"
                  glossy
                  no-caps
                  @click="doEntferneSchutzkategorienBaueigenschaften()"
                />
              </div>
            </div>
            <div style="color: red" class="q-pa-xs text-caption">
              <b>Achtung:</b> Ändert Baueigenschaften - nur für Administratoren!
            </div>
            <!--
            <div style="color: black" class="q-pa-xs text-caption">
              Typbezogene Baueigenschaften:
              <br />
              <pre v-html="JSON.stringify(ergebnisMigriereFachlicheKategorienBaueigenschaften, null, 2)">
              </pre>
            </div>
            -->
          </q-tab-panel>
        </q-tab-panels>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>
<!--***===============================================================================================================================-->
<script>
//------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Test von OneDrive File Upload/Download - funktioniert sehr gut!!!
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
// NEU: Für Test von Filestack:
// https://www.npmjs.com/package/filestack-js
// bim-click-front-end> npm install filestack-js
// Siehe auch https://www.filestack.com/docs/uploads/pickers/web/
const filestackApiKey = "AArzkWXtYRgmXFMJXVCIKz"; // Von https://dev.filestack.com/apps/AArzkWXtYRgmXFMJXVCIKz/dashboard/
import * as filestack from "filestack-js";
//------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Test von Selenium - aktuell disabled:
// import webdriver from "selenium-webdriver";
// Varianten für Code-Alternativen:
// import chrome from "selenium-webdriver/chrome";
// import { Builder, By, Key, util } from "selenium-webdriver";
// import { Builder, By, Key, util } from "selenium-webdriver";
// import { Builder, By, Key, util } from "selenium-webdriver/chrome"; /
//------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Test von VGEditor:
// VUE3: import VGEditor, { Flow /* Toolbar */ } from "vg-editor";
/*
const dataVGEditor = {
  nodes: [{
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '起止节点',
    x: 55,
    y: 55,
    id: 'ea1184e8',
    index: 0,
  }, {
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '结束节点',
    x: 55,
    y: 255,
    id: '481fbb1a',
    index: 2,
  }],
  edges: [{
    source: 'ea1184e8',
    sourceAnchor: 2,
    target: '481fbb1a',
    targetAnchor: 0,
    id: '7989ac70',
    index: 1,
  }],
};
*/
//------------------------------------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------------------------------------------
import Vue from "vue";
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Tests mit Storyblok CMS
// Vorlage: https://github.com/storyblok/storyblok-vue:
// Nach positivem Kurztest wieder disabled (nur nächste Zeile und Vue.use(StoryblokVue)):
// import { StoryblokVue, apiPlugin } from '@storyblok/vue'; // Erfordert npm install --save-dev @storyblok/vue
/*
Vue.use(StoryblokVue, {
  accessToken: 'KiJ52BAuu6x3RQj5dIcWygtt', // Von http://app.storyblok.com/#!/me/spaces/144368/edit?tab=api
  // bridge: process.env.NODE_ENV !== "production", // optimises by excluding the bridge on production
  use: [apiPlugin],
});
*/
//--------------------------------------------------------------------------------------------------------------------------------------------
// import { VueCompositionAPI } from "@vue/composition-api"; // War nicht zum Laufen zu bekommen mit Storyblok auf Vue 1, daher hier disabled
// Erfordert npm install @vue/composition-api - dieses ist aber am BIM.click Frontend schon installiert für Tests von Vue Currency Input,
// es darf nicht deinstalliert werden, solange Vue Currency Input als Test in verwaltung.vue benutzt wird!
// Vue.use(VueCompositionAPI);
// import { ref } from '@vue/composition-api' // Unklar, ob nötig, Vue 3?
// import { VueCompositionAPI, useStoryblokApi, ref } from "@vue/composition-api"; // Erfordert npm install @vue/composition-api
//--------------------------------------------------------------------------------------------------------------------------------------------
// Komponenten für alternatives Storyblok Vue 3 Tutorial - disabled, weil nicht zum Laufen zu Bekommen auf Vue 2
// Die Komponenten selbst nach historic-code verschoben für spätere Verwendung!
// https://www.storyblok.com/tp/add-a-headless-CMS-to-vuejs-in-5-minutes
// import Grid from "../components/grid.vue";
// import Page from "../components/page.vue";
// import Teaser from "../components/teaser.vue";
// import Feature from "../components/feature.vue";
//--------------------------------------------------------------------------------------------------------------------------------------------
// Komponenten für Verwaltung von BIM.click Benutzern - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
import uebersichtTabBenutzer from "../components/uebersicht-tab-benutzer.vue";
import detailsTabBenutzer from "../components/details-tab-benutzer.vue";
//--------------------------------------------------------------------------------------------------------------------------------------------
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import { date } from "quasar";
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Tests Vue CurrencyInput:
// VUE3: import QDecimalInput from "../components/dezimal-eingabe.vue";
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Tests von vue Filters:
// https://www.npmjs.com/package/vue2-filters - installiert mit npm install vue2-filters
// import Vue2Filters from "vue2-filters"; // NEU - für Vue 2 Filter Tests - wieder disabled
// Vue.use(Vue2Filters); // Wieder disabled
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Tests von Vue Excel Editor:
// VUE3: import VueExcelEditor from "vue-excel-editor";
// VUE3: Vue.use(VueExcelEditor);
//--------------------------------------------------------------------------------------------------------------------------------------------
// Test von Dezimal-Handling-Paketen:
// NEU: Für Tests mit VMoney, https://www.npmjs.com/package/v-money -->
// VMoney erfordert Installation per: npm i --save v-money
// import Vue from "vue";
// import money from "v-money"; // Disabled wegen Problemen! Stattdessen VueAutonumeric benutzt!
// Vue.use(money, { precision: 4 }); // Disabled wegen Problemen!
import { decimalHandling } from "../modules/decimal-handling"; // NEU: Zentrale Helper-Funktionen zur Konvertierung von Dezimalzahlen von String nach Number
//-----------------------------------------------------------------------------------------------------------------
// NEU: Für Tests mit VueAutoNumeric, https://www.npmjs.com/package/vue-autonumeric
// Dieses Paket musste dafür installiert werden am Frontend mit npm install vue-autonumeric --save
// VUE 3
// import VueAutonumeric from "vue-autonumeric"; // Erfordert unten Eintrag in components: { ..., VueAutoNumeric }
//-----------------------------------------------------------------------------------------------------------------
// NEU: Für Tests mit VueNumeric, https://www.npmjs.com/package/vue-numeric
// Dieses Paket musstes dafür installiert werden am Frontend mit npm install vue-numeric --save
// Da nicht geeignet, wieder deinstalliert und hier disabled:
// import VueNumeric from "vue-numeric"; // Erfordert unten Eintrag in components: { ..., VueNumeric }
//-----------------------------------------------------------------------------------------------------------------
// NEU: Für Tests mit Vue Diagram Editor, https://vue-diagram-editor.js.org/
// VUE3 import VueDiagramEditor from "vue-diagram-editor";
// VUE3 import "vue-diagram-editor/dist/vue-diagram-editor.css";
//============================================================================================================================================
export default {
  // NEU:
  name: "Verwaltung", // Vue Component Name - ACHTUNG - dabei beachten:
  // ALT:
  // name: "Verwaltung", // Vue Component Name - ACHTUNG - dabei beachten:
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
  //----------------------------------------------------------------------------------------------------------------------------
  components: {
    // DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
    //----------------------------------------------------------------------------------------------------------------
    // Komponenten für Benutzer - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    uebersichtTabBenutzer,
    detailsTabBenutzer,
    // VUE3: VueAutonumeric, // NEU - für Tests mit VueAutoNumeric
    // VueNumeric, // NEU - für Tests mit VueNumeric - wieder disabled
    // VUE3: QDecimalInput, // NEU - für Tests mit VueCurrencyInput
    // VUE3 VueDiagramEditor, // NEU - für Tests mit Vue Diagram Editor
    // VUE3 VGEditor, // NEU - für Tests mit VG Editor
    // VUE3 Flow // NEU - für Tests mit VG Editor
    // Toolbar // NEU - für Tests mit VG Editor - funktioniert nicht, disabled
    // Grid, // NEU - für Tests mit Storyblok CMS, Vue 3 - disabled
    // Page, // NEU - für Tests mit Storyblok CMS, Vue 3 - disabled
    // Teaser, // NEU - für Tests mit Storyblok CMS, Vue 3 - disabled
    // Feature // NEU - für Tests mit Storyblok CMS, Vue 3 - disabled
  },
  //***================================================================================================================================
  data() {
    return {
      ergebnisLeseBaueinheitMitPfadUndKindern: [],
      ergebnisMigriereFachlicheKategorienBaueigenschaften: [],
      expandedKeysTreeBaueinheiten: [],
      testMap : { "Otto": { a: 1, b: 2, c: 3 }, "Hugo": { d: 4, e: 5, f: 6 }, "Bruno": { g: 7, h: 8, i: 9 } }, // NEU - für Test von JS Maps
      filestack: null, // NEU - für Test mit Filestack
      filestackPickerResponse: null, // NEU - für Test mit Filestack
      oneDrivePickerResponse: null, // NEU - für Test mit OneDrive
      textCardButterCMS: null, // NEU - für Test mit butterCMS
      postCardButterCMS: null, // NEU - für Test mit butterCMS
      stories: null, // NEU - für Test mit Storyblok
      //-------------------------------------------------------------------------------------------------------------------------------
      // NEU - Testdaten für Nutzlastkategorie in Test Area 12:
      // ACHTUNG: Es wird auf die ersten 4 Stellen dieser Strings abgefragt bei der Ermittlung eines passenden Hint-Textes!
      ausgewaehlteNutzlastKategorie:
        "A2:   Wohn- und Aufenthaltsräume - ausreichende Querverteilung der Lasten",
      optionsNutzlastKategorie: [
        "A1:   Spitzböden - für Wohnzwecke nicht geeigneter, aber zugänglicher Dachraum bis 1,80 m lichter Höhe",
        "A2:   Wohn- und Aufenthaltsräume - ausreichende Querverteilung der Lasten",
        "A3:   Wohn- und Aufenthaltsräume - ohne ausreichende Querverteilung der Lasten",
        "B1:   Büroflächen, Arbeitsflächen, Flure - mit normaler Belastung",
        "B2:   Büroflächen, Arbeitsflächen, Flure - mit erhöhter Belastung",
        "B3:   Büroflächen, Arbeitsflächen, Flure - mit schwerer Belastung",
        "C1:   Räume, Versammlungsräume und Flächen mit Personenansammlung - mit Tischen",
        "C2:   Räume, Versammlungsräume und Flächen mit Personenansammlung - mit fester Bestuhlung",
        "C3:   Räume, Versammlungsräume und Flächen mit Personenansammlung - mit frei begehbaren Flächen oder Flure für C1 bis C3",
        "C4:   Räume, Versammlungsräume und Flächen mit Personenansammlung - Sport- und Spielflächen",
        "C5:   Räume, Versammlungsräume und Flächen mit Personenansammlung - für große Menschenansammlungen oder Tribünen mit fester Bestuhlung",
        "C6:   Räume, Versammlungsräume und Flächen mit Personenansammlung - für erhebliche Menschenansammlungen oder Tribünen ohne feste Bestuhlung",
        "D1:   Verkaufsräume - bis 50 m² in Wohn-, Büro- und vergleichbaren Gebäuden",
        "D2:   Verkaufsräume - in Einzelhandelsgeschäften und Warenhäusern",
        "D3:   Verkaufsräume - in Einzelhandelsgeschäften und Warenhäusern mit erhöhten Einzellasten infolge hoher Lagerregale",
        "E1.1: Lager, Fabriken und Werkstätten, Ställe, Lagerräume und Zugänge - mit leichtem Betrieb oder Großviehställe ",
        "E1.2: Lager, Fabriken und Werkstätten, Ställe, Lagerräume und Zugänge - Lagerflächen einschließlich Bibliotheken",
        "E1.3: Lager, Fabriken und Werkstätten, Ställe, Lagerräume und Zugänge - mit mittlerem oder schwerem Betrieb",
        "T1:   Treppen und Treppenpodeste - in Wohn-, Bürogebäuden und Arztpraxen ohne schweres Gerät",
        "T2:   Treppen und Treppenpodeste - nicht eingeordnet in T1 oder T3",
        "T3:   Treppen und Treppenpodeste - Zugänge und Treppen von Tribünen ohne feste Sitzplätze, die als Fluchtwege dienen",
        "Z:    Zugänge, Balkone und ähnliches - Dachterrassen, Laubengänge, Loggien usw., Balkone, Ausstiegspodeste"
      ],
      //-------------------------------------------------------------------------------------------------------------------------------
      // NEU - Testdaten für QCarousel in Test Area 2:
      schichtenInWandaufbau: [
        { schichtNummer: 1, baueinheitsBezeichnung: "Außenmauerwerk" },
        { schichtNummer: 2, baueinheitsBezeichnung: "Dämmschicht" },
        { schichtNummer: 3, baueinheitsBezeichnung: "Tragwand" },
        { schichtNummer: 4, baueinheitsBezeichnung: "Innenputz" }
      ],
      ausgewaehlteSchichtNummerInWandaufbau: 1,
      //-------------------------------------------------------------------------------------------------------------------------------
      // NEU - Testdaten für Import aus abstractBIM:
      bezeichnungZielGebaeude: "Einstein-Schule", // Gebäudebezeichnung für Zielgebäude für Import aus abstractBIM-JSON-File
      //-------------------------------------------------------------------------------------------------------------------------------
      // NEU - Testdaten für VG Editor:
      dataVGEditor: {
        nodes: [
          {
            type: "node",
            size: "250*200",
            shape: "flow-rectangle",
            color: "#FA8C16",
            label: "Klassenzimmer 1",
            x: 150,
            y: 150,
            id: "ea1184e8",
            index: 0
          },
          {
            type: "node",
            size: "250*200",
            shape: "flow-rectangle",
            color: "#FA8C16",
            label: "Klassenzimmer 2",
            x: 350,
            y: 450,
            id: "481fbb1a",
            index: 2
          }
        ],
        edges: [
          {
            source: "ea1184e8",
            sourceAnchor: 2,
            target: "481fbb1a",
            targetAnchor: 0,
            id: "7989ac70",
            index: 1
          }
        ]
      },
      //-------------------------------------------------------------------------------------------------------------------------------
      // NEU - Testdaten für Vue Diagram Editor:
      // ACHTUNG: Die nächsten beiden Objekte können auch Arrays sein und bilden zusammen das initiale VModel von Vue Diagram Editor
      // Initial sind es Objekte, KEINE Arrays!!!
      nodesDiagramEditor: {
        // WICHTIG: Erläuterungen zu den eizelnen Feldern in Funktion leseRaumKindBaueinheitenVonGeschoss()
        "Klassenraum 1": {
          id: "Klassenraum 1",
          title: "Klassenraum 1",
          size: {
            width: 250,
            height: 220
          },
          portsIn: {},
          portsOut: {
            // default: "Auswärts-Port 1",
            "Start-Port 1": "Start-Port 1"
          }
        },
        "Klassenraum 2": {
          id: "Klassenraum 2",
          title: "Klassenraum 2",
          size: {
            width: 250,
            height: 220
          },
          coordinates: {
            x: 280,
            y: 100
          },
          portsIn: {
            // default: "Einwärts-Port 2",
            "Ziel-Port 2": "Ziel-Port 2"
          },
          portsOut: {}
        }
      },
      linksDiagramEditor: {
        "Nachbarschaft 1": {
          id: "Nachbarschaft 1",
          start_id: "Klassenraum 1", // Nur für Test!
          start_port: "Start-Port 1",
          end_id: "Klassenraum 2", // Nur für Test!
          end_port: "Ziel-Port 2"
        }
      },
      compoundModelDiagramEditor: {
        // Compound-Object für VModel
        // ACHTUNG: Dieses ist nur Convenience, man könnte auch mit den 2 Unterobjekten arbeiten,
        // und disese getrennt als {nodes, links} übergeben an Methode setModel({nodes, links})
        // ACHTUNG: Das Compound-Objekt muss im Code trotzdem nochmals neu gesetzt werden,
        // die this.nodesDiagramEditor bzw. this.linksDiagramEditor bewirken KEINE automatische Initialisierung
        // mit obigen Werten!!!
        nodes: this.nodesDiagramEditor,
        links: this.linksDiagramEditor
      },
      // NEU - Testdaten für Vue Excel Editor:
      geschossOptions: [
        "Untergeschoss",
        "Erdgeschoss",
        "1. Obergeschoss",
        "2. Obergeschoss"
      ],
      raumOptions: [
        "Klassenraum 1",
        "Klassenraum 2",
        "Klassenraum 3",
        "Klassenraum 4",
        "Klassenraum 5"
      ],
      bauteilOptions: ["Wand 1", "Wand 2", "Wand 3", "Wand 4", "Wand 5"],
      raumNachbarschaften: [
        {
          geschoss: "Erdgeschoss",
          raum: "Klassenraum 1",
          nachbarGeschoss: "Erdgeschoss",
          nachbarRaum: "Klassenraum 2",
          geschossTrennBauteil: "Erdgeschoss",
          raumTrennBauteil: "Klassenraum 1",
          trennBauteil: "Wand 1",
          typTrennBauteil: "Wand",
          laengeTrennKante: 200,
          trennFlaeche: 6.0
        },
        {
          geschoss: "Erdgeschoss",
          raum: "Klassenraum 2",
          nachbarGeschoss: "Erdgeschoss",
          nachbarRaum: "Klassenraum 3",
          geschossTrennBauteil: "Erdgeschoss",
          raumTrennBauteil: "Klassenraum 2",
          trennBauteil: "Wand 2",
          typTrennBauteil: "Wand",
          laengeTrennKante: 200,
          trennFlaeche: 6.0
        },
        {
          geschoss: "Erdgeschoss",
          raum: "Klassenraum 3",
          nachbarGeschoss: "Erdgeschoss",
          nachbarRaum: "Klassenraum 4",
          geschossTrennBauteil: "Erdgeschoss",
          raumTrennBauteil: "Klassenraum 3",
          trennBauteil: "Wand 3",
          typTrennBauteil: "Wand",
          laengeTrennKante: 200,
          trennFlaeche: 6.0
        },
        {
          geschoss: "Erdgeschoss",
          raum: "Klassenraum 4",
          nachbarGeschoss: "Erdgeschoss",
          nachbarRaum: "Klassenraum 5",
          geschossTrennBauteil: "Erdgeschoss",
          raumTrennBauteil: "Klassenraum 3",
          trennBauteil: "Wand 4",
          typTrennBauteil: "Wand",
          laengeTrennKante: 200,
          trennFlaeche: 6.0
        }
      ],
      deutscheLabels: {
        footerLeft: (top, bottom, total) =>
          `Eintrag ${top} bis ${bottom} von ${total}`,
        first: "Erster",
        previous: "Vorheriger",
        next: "Nächster",
        last: "Letzter",
        footerRight: {
          selected: "Ausgewählt:",
          filtered: "Gefiltert:",
          loaded: "Geladen:"
        },
        processing: "Verarbeitung",
        tableSetting: "Tabelleneinstellungen",
        exportExcel: "Exportieren nach Excel",
        importExcel: "Importieren aus Excel",
        back: "Zurück",
        reset: "Standardwerte",
        sortingAndFiltering: "Sortieren und Filtern",
        sortAscending: "Ansteigend sortieren",
        sortDescending: "Absteigend sortieren",
        near: "≒ Ungefähr gleich",
        exactMatch: "= Gleich",
        notMatch: "≠ Ungleich",
        greaterThan: "&gt; Größer als",
        greaterThanOrEqualTo: "≥ Größer als oder gleich",
        lessThan: "&lt; Kleiner als",
        lessThanOrEqualTo: "≤ Kleiner als oder gleich",
        regularExpression: "~ Regulärer Ausdruck",
        customFilter: "Filter",
        listFirstNValuesOnly: n => `Nur die ersten ${n} Werte auflisten`,
        apply: "Anwenden",
        noRecordIsRead: "Kein Eintrag gelesen",
        readonlyColumnDetected: "Nur-Lese-Spalte festgestellt",
        columnHasValidationError: (name, err) =>
          `Spalte ${name} hat Validierungsfehler: ${err}`,
        noMatchedColumnName: "Kein passender Spaltenname gefunden",
        invalidInputValue: "Ungültiger Eingabewert",
        missingKeyColumn: "Fehlende Schlüsselspalte",
        noRecordIndicator: "Kein Eintrag"
      },
      //--------------------------------------------------------------------------------------------------------------------
      baueinheitsIdVonGeschoss: null, // Für Tests des Lesens von Raum-Kindbaueinheiten im Tab "Test Area"
      //--------------------------------------------------------------------------------------------------------------------
      baustoffIdFuerFilterungBaustoffe: null, // Fuer Tests der Filterung von Baustoffen im Tab "Test Area"
      //--------------------------------------------------------------------------------------------------------------------
      // Für Tests von Normaußentemperatur:
      postLeitZahl: null,
      auslegungsAussenTemperatur: null,
      jahresMittlereAussenTemperatur: null,
      //--------------------------------------------------------------------------------------------------------------------
      // Weitere Testdaten:
      myCurrencyInputValue: 250.2833, // Für Vue Currency Input Test
      myFilterValue: 250.2833, // Für Vue Filter Test
      //--------------------------------------------------------------------------------------------------------------------
      // Für Tests mit Dezimalzahlen mit QField und VueAutoNumeric:
      // Dabei werden teilweise auch die Variablen für VMoney unten wiederbenutzt!
      sollWertObject: { kennWert1: 333 }, // Alternativ für null-Test: { kennWert1: null }
      istWertObject: { kennWert1: null },
      // VueAutoNumeric Options - generiert mit http://autonumeric.org/configurator
      autoNumericOptions: {
        decimalCharacter: ",",
        decimalPlaces: 2,
        digitGroupSeparator: ".",
        maximumValue: "999.99",
        minimumValue: "-999.99",
        emptyInputBehavior: "null" // VueAutoNumeric Docs dafür: When the element is empty, the rawValue and the element value/text is set to null.
        // This also allows to set the value to null using anElement.set(null)
      },
      //---------------------------------------------------------------------------------------------------------------------
      // Für Tests von Dezimalzahlen mit QField und VMoney, VueAutoNumeric, VueNumeric:
      decimalHandling: decimalHandling, // NEU: Modul mit zentralen Helper-Funktionen für Dezimalzahlen
      //------------------------------------------------------------------------------------------------
      nullNiveau: 0.45, // v-model für q-field mit VMoney, VueAutoNumeric, VueNumeric
      nhnNiveau: 250, // v-model für q-field mit VMoney, VueAutoNumeric, VueNumeric
      nhnNiveauObject: { kennWert1: null }, // v-model als Object für Test mit VueAutoNumeric
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
      // Für Test von Dezimalzahlen mit QInput-Feldern:
      testDezimalWertFuerNiveau00: 0.25, // Für Test von Dezimalzahlen
      testDezimalWertFuerNiveauEingang: 245.0, // Für Test von Dezimalzahlen
      testDezimalWertFuerNiveauNHN: 245.25, // Für Test von Dezimalzahlen
      //--------------------------------------------------------------------
      // Für Tests Lesen gefilterter Baustoffe:
      gefilterteBaustoffe: [], // Array
      //--------------------------------------------------------------------
      // Für Tests Lesen Raum-Kindbaueinheiten von Geschoss:
      raumKindBaueinheiten: [], // Array

      //---------------------------------------------------------------------------------------------------------------------
      // Für QForm Tests, Vorlage: https://codepen.io/pen/?editors=1010
      name: null,
      age: null,
      accept: false,
      //---------------------------------------------------------------------------------------------------------------------
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält Markdown für Baustoff
      // Testdaten für q-select zur Auswahl der Art des Bauvorhabens
      selectOptionsTablesPaginationRowsPerPage: selectOptionsTablesPaginationRowsPerPage, // Konstante oben

      tabVerwaltung: "benutzerTabVerwaltung",
      tabTestArea1: "test01TabVerwaltung",
      tabTestArea2: "test11TabVerwaltung",
      tabTestArea3: "test21TabVerwaltung",

      /*
      formatDate: function(val) {
        //------------------------------------------------------------------------------------------------------------------//
        // Helper function for Date Formatting
        // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
        // Sonst müssen sie nach methods: verschoben werden!
        //------------------------------------------------------------------------------------------------------------------//
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
      },
      */
      deleteSelectedBenutzerDialog: false,
      alwaysOn: true,
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      // Vorerst liegen diese Sachen hier:
      // alleBaueigenschaftsProfile: [],
      alleBenutzer: [],
      topLevelTabBenutzer: null,
      tabBenutzer: "uebersichtTabBenutzer",
      selectedBenutzer: null,
      nothingSelectedInTableBenutzer: false,
      selectionForDefaultValueChange: null, // TODO: Diese Bezeichnung folgt noch nicht dem vereinbarten Namenskonventionen!!! Meint es selectedBaueigenschaft???
      columnsTableBenutzer: [
        {
          name: "benutzerKennung",
          label: "Benutzerkennung",
          field: row => row.benutzerKennung,
          sortable: true
        },
        {
          name: "nachName",
          label: "Nachname",
          field: row => row.nachName,
          sortable: true
        },
        {
          name: "vorName",
          label: "Vorname",
          field: row => row.vorName,
          align: "right",
          sortable: true
        },
        // Boolean-Felder:
        {
          name: "istVerifiziert",
          align: "center",
          label: "Konto verifiziert?",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.istVerifiziert,
          // format: val => this.displayCheckMark(val),
          // Erste simple Lösung mit Unicode Checkmarks statt q-checkbox, wieder entfernt
          sortable: true,
          type: "toggle"
        },
        // NEU: #150 - Feld istAktiv unterstützen
        {
          name: "istAktiv",
          align: "center",
          label: "Konto aktiv?",
          // ACHTUNG: "field" wurde früher gar nicht genutzt, stattdessen wurden die Felder per v-slots gesteuert!
          // HINWEIS: row => Lambda-Funktion, sucht nach nested Field (andere Felder sind meistens flat)
          field: row => row.istAktiv,
          // format: val => this.displayCheckMark(val),
          sortable: true,
          type: "toggle" // Selbsterstelltes Feld, um die Anzeige in der QTable zu steuern
        },
        {
          name: "benutzerRolle",
          label: "Benutzerrolle",
          field: row => row.benutzerRolle,
          sortable: true
        },
        {
          name: "benutzerGruppe",
          label: "Benutzergruppe",
          field: row => row.benutzerGruppe,
          sortable: true
        },
        {
          // NEU:
          name: "istAngemeldet",
          label: "Konto angemeldet?",
          field: row => row.istAngemeldet,
          sortable: true,
          align: "center",
          type: "toggle"
        },
        {
          // NEU:
          // Verwendet Quasar Date Utils!
          name: "zeitLetzteAnmeldung",
          label: "Letzte Anmeldung",
          field: row => row.zeitLetzteAnmeldung,
          format: val =>
            val
              ? date.formatDate(val, "DD.MM.YYYY") +
                ", " +
                date.formatDate(val, "HH:mm:ss") // ACHTUNG: "HH:MM:SS" statt "HH:mm:ss" führt zu unkorrekten Zeitanzeigen für die Minuten/Sekunden, HH statt hh funktioniert offenbar nur bei den Stunden für 24-Stunden-Format
              : null,
          sortable: true
        },
        {
          // NEU:
          // Verwendet Quasar Date Utils!
          name: "zeitLetzteAbmeldung",
          label: "Letzte Abmeldung",
          field: row => row.zeitLetzteAbmeldung,
          format: val =>
            val
              ? date.formatDate(val, "DD.MM.YYYY") +
                ", " +
                date.formatDate(val, "HH:mm:ss") // ACHTUNG: "HH:MM:SS" statt "HH:mm:ss" führt zu unkorrekten Zeitanzeigen für die Minuten/Sekunden, HH statt hh funktioniert offenbar nur bei den Stunden für 24-Stunden-Format
              : null,
          sortable: true
        },
        {
          // NEU:
          name: "tablesPaginationRowsPerPage",
          label: "Einstellung: Anzahl Zeilen in Tabellen",
          field: row => row.tablesPaginationRowsPerPage,
          sortable: true,
          align: "center"
        },
        {
          // NEU:
          name: "farbSchema",
          label: "Einstellung: Farbschema",
          field: row => row.farbSchema,
          sortable: true,
          align: "center"
        },
        {
          // NEU:
          name:
            "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig",
          label:
            "Einstellung: Werte von Baueigenschaften beim Einfügen in Bäumen überschreiben?",
          field: row =>
            row.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig,
          sortable: true,
          align: "center",
          type: "toggle"
        },
        {
          // NEU:
          name:
            "vorgabeWerteUeberschreibenVorhandeneWerte",
          label:
            "Einstellung: Werte von Baueigenschaften beim Aktivieren von Profilen überschreiben?",
          field: row =>
            row.vorgabeWerteUeberschreibenVorhandeneWerte,
          sortable: true,
          align: "center",
          type: "toggle"
        }
      ]
    };
  },

  //***=========================================================================================================================================
  methods: {
    oneDrivePickerOpen(action) {
      // NEU: Testfunktion für OneDrive Picker
      // Parameter action - wird an options-Objekt weitergereicht
      console.log("In oneDrivePickerOpen() - action:", action);
      const oneDriveOptions = {
        clientId: oneDriveApplicationId,
        action: action, // The action type being performed with the files selected.
        // You can specify
        // - "share" to generate a sharable URL
        // - "download" to receive a short-lived URL that downloads the content of the files,
        // - "query" to return identifiers that can be used with the Microsoft Graph API or OneDrive API.
        multiSelect: true,
        accountSwitchEnabled: false,
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

    filestackUploadPickerOpen() {
      // NEU: Testfunktion für Filestack Picker Open
      console.log("In filestackUploadPickerOpen()");
      const options = {
        onFileSelected: file => {
          // Hier Callback Funktion
          console.log("file: ", file);
        },
        onUploadDone: filestackPickerResponse => {
          // Hier Callback Funktion
          console.log("filestackPickerResponse: ", filestackPickerResponse);
          this.filestackPickerResponse = filestackPickerResponse;
        }
      };
      this.filestackClient.picker(options).open();
    },

    filestackUploadDone(filestackPickerResponse) {
      // NEU: Testfunktion für Filestack Picker Response
      console.log("In filestackUploadDone()");
      console.log("filestackPickerResponse: ", filestackPickerResponse);
    },

    doButterCMSAPICalls() {
      // NEU: Testfunktion für ButterCMS API Calls
      // Vorlage: https://buttercms.com/docs/api-client/vuejs#CreatingPages
      // bim-click-front-end> npm install buttercms --save
      // bim-click-front-end> npm uninstall buttercms
      // Nach erfolgreichem Test aktuell wieder deinstalliert und Code hier disabled:
      /*
      const apiToken = "1e0828151da85c63c370c3ddcc6b5f08ba99fb9c"; // Nach Registrierung, siehe internes Design
      var butter = require("buttercms")(apiToken);
      butter.page
        .retrieve("*", "simple-page")
        .then(response => {
          console.log("response.data vom ButterCMS API: ", response.data)
          this.textCardButterCMS = response.data.data.fields.headline
      });
      */
      // Dieser API Call liefert im Browser Log:
      /* data:
          fields:
            call_to_action: "Buy Now"
            - customer_logos: (2) [{…}, {…}]
            headline: "Acme Co provides supplies to your favorite cartoon heroes."
            hero_image: "https://cdn.buttercms.com/c8oSTGcwQDC5I58km5WV"
            seo_title: "Anvils and Dynamite | Acme Co"
          - [[Prototype]]: Object
          name: "Simple Page"
          page_type: null
          published: "2022-01-22T16:04:13.738572Z"
          slug: "simple-page"
          updated: "2022-01-22T16:04:13.758996Z"
          [[Prototype]]: Object
          [[Prototype]]: Object
      */
      // Und noch ein Test API Call:
      // Vorlage: https://buttercms.com/post/149499 - dort aus API Explorer extrahiert
      // https://api.buttercms.com/v2/posts/example-post/?auth_token=1e0828151da85c63c370c3ddcc6b5f08ba99fb9c
      /*
     butter.post
       .retrieve("example-post")
       .then(response => {
          console.log("response.data vom ButterCMS API: ", response.data)
          this.postCardButterCMS = response.data.data.body
      })
      */
    },

    doMapCalls: function() {
      // NEU: Testfunktion für JS Map
      console.log("testMap['Otto'].a: ", this.testMap["Otto"].a)
      console.log("testMap['Hugo'].e: ", this.testMap["Hugo"].e)
      console.log("testMap['Bruno'}.i ", this.testMap["Bruno"].i)
      // this.testMap.forEach(element => console.log("element: ", element)) // ACHTUNG: Wirft Fehler "forEach is not a function"!
    },

    doEntferneSchutzkategorienBaueigenschaften() {
      // Hilfsmethode für Datenbank-Migration für #401
      console.log("In doEntferneSchutzkategorienBaueigenschaften()");
      let apiRoute = process.env.API + "/Baueigenschaften/" + "Entfernung/Schutzkategorien";
      this.$axios
        .put(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log("Erfolg aus $axios.get, response: ", response);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT
          );
          this.ergebnisMigriereFachlicheKategorienBaueigenschaften = response.data
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.get, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
          );
        });
    },

    doMigriereFachlicheKategorienBaueigenschaften() {
      // Hilfsmethode für Datenbank-Migration für #401
      console.log("In doMigriereFachlicheKategorienBaueigenschaften()");
      let apiRoute = process.env.API + "/Baueigenschaften/" + "Migration/FachlicheKategorien";
      this.$axios
        .put(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log("Erfolg aus $axios.get, response: ", response);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT
          );
          this.ergebnisMigriereFachlicheKategorienBaueigenschaften = response.data
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.get, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
          );
        });
    },

    doLoescheBaueinheitsBaueigenschaftenAnBaustoffen() {
      // Hilfsmethode für Heroku-Datenbank-Migration für #396
      console.log("In doLoescheBaueinheitsBaueigenschaftenAnBaustoffen()");
      let apiRoute = process.env.API + "/Baueigenschaften/" + "LoescheBaueinheitsBaueigenschaftenAnBaustoffen";
      this.$axios
        .delete(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log("Erfolg aus $axios.get, response: ", response);
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

    doLeseBaueinheitMitPfadUndKindern() {
      // Testmethode für #400
      console.log("In doLeseBaueinheitMitPfadUndKindern()");
        const myBaueinheitId = "6220ad94aa8a318008a7e889" // Heesters-Seniorenheim lokal, mit dazu passenden expanded Nodes unten
        // const myBaueinheitId = "6220ad94aa8a318008a7e897" // Einstein-Schule lokal
        // const myBaueinheitId = "6220ad94aa8a318008a7e89" // Klassenraum 1 lokal
        let apiRoute = process.env.API + "/Baueinheiten/" + myBaueinheitId + "/Reload/Pfad";
        this.$axios
          .get(apiRoute)
          .then(response => {
            // Was im Erfolgsfall zu tun ist:
            console.log("Erfolg aus $axios.get, response: ", response);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT
            );
            this.ergebnisLeseBaueinheitMitPfadUndKindern = response.data;
            this.expandedKeysTreeBaueinheiten = ["6220ad94aa8a318008a7e876", "6220ad94aa8a318008a7e883", "6220ad94aa8a318008a7e889"]
            // Alle Knoten auf Pfad zum Heesters-Seniorenheim für Test
          })
          .catch(error => {
            // Was im Fehlerfall zu tun ist:
            console.log("Error aus $axios.get, error: ", error); // Error loggen
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
            );
          });
    },

    doStoryblokAPICalls: async function() {
      // NEU: Testfunktion für Storyblok API Calls
      //--------------------------------------------------------------------------------------------------------------------------
      // Vorlage: https://github.com/storyblok/storyblok-vue - aber vorläufig OHNE Composition API
      // Dazu notwendig: npm install --save-dev @storyblok/vue
      // (npm install @vue/composition-api)
      // HINWEISE:
      // API Key: http://app.storyblok.com/#!/me/spaces/144368/edit?tab=api
      // Test-Content im Space "Vue 5 Minutes": http://app.storyblok.com/#!/me/spaces/144368/stories/0/0/index/0?page=1
      // Dort "Home" anwählen, dann zeigt sich der Space unter http://app.storyblok.com/#!/me/spaces/144368/stories/0/0/102123494
      // http://app.storyblok.com/#!/me/spaces/144368/edit - dort unter "General" > "Location" eingeben: http://localhost:4200
      // http://app.storyblok.com/#!/me/spaces/144368/stories/0/0/102123494 - dort muss in Config rechts unter "Real Path" "/" eingegeben werden
      // Es bleibt jedoch unklar, ob der API Call für cdn/stories tatsächlich gegen diesen Space läuft
      // Er liefert nur einen Array der Länge 1, in dem im Feld story.name "Home" steht, zurück
      // Alternative Calls, z.b. cdn/spaces scheitern mit 404!
      // Insgesamt ist die Benutzbarkeit von Storyblok für Developer deutlich schlechter als die von ButterCMS
      // Die Vue-Komponenten erscheinen bleeding Edge auf Vue 3 zu sein
      // Der API Explorer von Butter ist deutlich besser als die API Doc von Storyblok
      // Daher den Test abgebrochen, die obigen npm installs rückgängig gemacht und den Code hier und in data() disabled
      //--------------------------------------------------------------------------------------------------------------------------
      // Alternatives Storyblook Tutorial mit visual Vue Components - dieses scheint aber auf Vue 3 zugeschnitten zu sein:
      // https://www.storyblok.com/tp/add-a-headless-CMS-to-vuejs-in-5-minutes
      // Dieses war nicht zum Laufen zu bekommen - abgebrochen (mit Vue 2)
      //--------------------------------------------------------------------------------------------------------------------------
      /*
      const storyblokApi = useStoryblokApi();
      const { data } = await storyblokApi.get('cdn/stories', {
          version: 'draft',
        });
      console.log("data: ", data)
      this.stories = data.stories;
      */
    },

    startImportBaustoffeAgendaJob() {
      console.log("In startImportBaustoffeAgendaJob()");
      let apiRoute =
        process.env.API +
        "/Baustoffe/StartImportJob/baustoffe_import_2022_03_03.json"; // ACHTUNG: TODO XXXXXX - hard coded für Testzwecke!!!
      this.$axios
        .get(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log("Erfolg aus $axios.get, response: ", response);
          this.$socket.emit("joinRoomForAgendaJob", {
            // Socket Event
            room: response.data.room // Name des Rooms
          });
          this.$socket.once("importBaustoffeAgendaJobComplete", args =>
            console.log("On args", args)
          );
          // Joine einem Room, der die Bezeichnung der vom Server für diesen Client gesendeten Id trägt (eindeutig für jeden Agenda Job)
          // Besser als z.B. den Room per User Id zu identifizieren, da User mehrfach angelogt sein kann!!
          // ACHTUNG: Der Join für diesen Room am Server steckt in back-end-server, beim Aufsetzen auch anderer Rooms für Socket Nachrichten,
          // in dortigem on-Event-Handler für "joinRoomForAgendaJob"!
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
    startAgendaJob() {
      // NEU: Testfunktion für #354, um Agenda Job am Backend zu starten
      // ACHTUNG - Voraussetzung: Client hört auf Event "agendaTestJobComplete" vom Server, der Listener dafür muss in mounted() aufgesetzt sein!!!
      // Vorlage: https://stackoverflow.com/questions/4647348/send-message-to-specific-client-with-socket-io-and-node-js
      //          https://stackoverflow.com/a/24232050/11858583
      console.log("In startAgendaJob()");
      let apiRoute = process.env.API + "/Baueinheiten/" + "/Agenda";
      this.$axios
        .get(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log("Erfolg aus $axios.get, response: ", response);
          this.$socket.emit("joinRoomForAgendaJob", {
            // Socket Event
            room: response.data.room // Name des Rooms
          });
          // Joine einem Room, der die Bezeichnung der vom Server für diesen Client gesendeten Id trägt (eindeutig für jeden Agenda Job)
          // Besser als z.B. den Room per User Id zu identifizieren, da User mehrfach angelogt sein kann!!
          // ACHTUNG: Der Join für diesen Room am Server steckt in back-end-server, beim Aufsetzen auch anderer Rooms für Socket Nachrichten,
          // in dortigem on-Event-Handler für "joinRoomForAgendaJob"!
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

    myUpdateHandlerDecimalInput(value) {
      // Reagiert auf jedes Update Event der Kindkomponente QDecimalInput
      // In value stehen die neuen Werte
      console.log("In myUpdateHandlerDecimalInput(value) - value: ", value);
      this.istWertObject.kennWert1 = value;
      // Alternativ kann man im Template auch schreiben: @input="istWertObject.kennWert1 = $event"
      // Siehe https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components)
    },

    myFilterFunction(value) {
      // Filter Function - Testfunktion für Vue Filters:
      console.log("In myFilterFunction() - value: ", value);
      this.myFilterValue = this.$options.filters.number(value, "0.00");
      // Hier könnte man statt der Vue-Filter-Funktion number() auch eine beliebige andere Funktion aufrufen, die den Input validiert und formatiert, aber es ist schwierig,
      // damit eine echte "as-you-type"-Validierung zu erzielen!
      // Z.B. regex-Funktion, die bei 2 Dezimalstellen abschneidet auf https://stackoverflow.com/questions/59750692/limit-number-of-decimals-on-input-vuejs
      console.log("myFilterValue: ", this.myFilterValue);
    },
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests mit Selenium:
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Selenium Infos und Tutorials:
    // https://blog.testproject.io/2020/06/17/selenium-javascript-automation-testing-tutorial-for-beginners/
    // https://www.selenium.dev/selenium/docs/api/javascript/index.html
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Versuche, den Standalone Node Selenium Code in selenium-test.js auch aus Vue-Komponente verwaltung.vue (d.h. aus dem Browser) zu starten
    // ACHTUNG: Ob dies aus Security-Gründen überhaupt erlaubt ist, ist zweifelhaft!!!
    // Dieser Link bestätigt, dass es nicht erlaubt ist: https://stackoverflow.com/questions/66675966/using-selenium-from-the-browser
    // Es funktioniert auch bisher NICHT, allerdings kommen Fehler, die eher auf Webpack-Import- oder Require-Fehler deuten, nicht auf Browser Security!
    // Potentielle Alternativen:
    // - Lokale Registrierung einer exe, Verknüpfung mit URI: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa767914(v=vs.85)?redirectedfrom=MSDN
    // - Standalone Programm (siehe selenium-test.js in /bim-click-frontend, funktioniert mit bim-click-frontend> npm selenium-test.js)
    launchSelenium() {
      console.log("In launchSelenium()");
      console.log(
        "Aktuell NoOp, Selenium nicht launchable aus Browser wegen Security!"
      );
      // a) Variante mit require:
      // const webdriver = require("selenium-webdriver"),
      // By = webdriver.By, // Wird aktuell nicht verwendet
      // until = webdriver.until; // Wird aktuell nicht verwendet
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Resultate damit:
      // ZUERST: Compile Warning: "Critical dependency: the request of a dependency is an expression":
      // Diese Warning eliminiert mit Webpack-config-Eingriff in quasar.conf.js (siehe dort)
      // Diesen Patch wieder entfernt, da es auch damit nicht funktioniert, offenbar aus Security Gründen!
      // Posts dazu:
      // https://stackoverflow.com/questions/59235497/i-get-a-webpack-warning-critical-dependency-the-request-of-a-dependency-is-an-e
      // https://stackoverflow.com/questions/42908116/webpack-critical-dependency-the-request-of-a-dependency-is-an-expression
      // https://stackoverflow.com/questions/60494700/critical-dependency-the-request-of-a-dependency-is-an-expression-vue-js - dort Vorlage für Elimnierung der Warning
      // https://webpack.js.org/guides/dependency-management/#require-with-expression
      // DANN trotzdem Laufzeit-Fehler: "Builder is not a constructor"
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // b) Variante mit import (dies geht nur oben bei den anderen imports, nicht hier in der Funktion - "'import' and 'export' may only appear at the top level"
      // Disabled - siehe oben:
      /*
      let By = webdriver.By; // Wird aktuell nicht verwendet
      let until = webdriver.until; // Wird aktuell nicht verwendet
      */
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // Resultate damit:
      // Es kommt mit obigem Webpack-Eingriff ebenfalls Laufzeit-Fehler: "Builder is not a constructor" mit geringfügig anderer Message in Zeile nach
      // "After webdriver initilization"
      //-----------------------------------------------------------------------------------------------
      // Ähnliche Probleme (bisher keine Lösung):
      // https://stackoverflow.com/questions/39069396/selenium-webdriver-node-js
      //-----------------------------------------------------------------------------------------------
      // Disabled - siehe oben:
      /*
      console.log("After webdriver initialization");
      const driver = new webdriver.Builder().forBrowser("chrome").build();
      console.log("After Builder constructor");
      driver.get("http://www.google.de").then(function() {
        driver
          .findElement(webdriver.By.name("q"))
          .sendKeys("webdriver\n")
          .then(function() {
            driver.getTitle().then(function(title) {
              console.log(title);
              if (title === "webdriver - Google Suche") {
                console.log("Test passed");
              } else {
                console.log("Test failed");
              }
              // driver.quit();
            });
          });
      });
      */
      //----------------------------------------------------------------------------------------------------------
      // Weitere Testfälle, aktuell disabled:
      // Variante A - nur mit selenium-webdriver
      // Vorlage: https://stackoverflow.com/questions/44197253/headless-automation-with-nodejs-selenium-webdriver
      /*
      // const chrome = require("selenium-webdriver/chrome");
      // const firefox = require("selenium-webdriver/firefox");
      // const { Builder, By, Key, until } = require("selenium-webdriver");
      const screen = {
        width: 640,
        height: 480
      };
      let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(new chrome.Options().headless().windowSize(screen))
        // .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        .build();
      */
      //------------------------------------------------------------------------------------------
      // Variante B - ursprünglich Warning: "Critical dependency: the request of a dependency is an expression"
      // const { Builder, By, Key, util } = require("selenium-webdriver/chrome");
      // import { Builder, By, Key, util } from "selenium-webdriver/chrome"; // Fehler: 'import' and 'export' may only appear at the top level (2063:6)
      /*
      async function example() {
        console.log("Builder: ", Builder); // undefined
        let driver = await new Builder().forBrowser("Chrome").build();
        await driver.get("https://www.google.com");
        await driver.findElement(By.name("q")).sendKeys("Selenium", Key.RETURN);
      }
      example(); // Fehler "Builder is not a constructor"
      */
      //-------------------------------------------------------------------------------------------
      // Variante C - ursprünglich selbe Warning:
      /*
      var webdriver = require('selenium-webdriver');
      var driver = new webdriver.Builder().forBrowser("chrome").build();
      driver.get("http://www.google.com");
      var element = driver.findElement(webdriver.By.name("q"));
      element.sendKeys("Cheese!");
      element.submit();
      driver.getTitle().then(function(title) {
        console.log("Page title is: " + title);
      });
      driver.wait(function() {
        return driver.getTitle().then(function(title) {
          return title.toLowerCase().lastIndexOf("cheese!", 0) === 0;
        });
      }, 3000);
      driver.getTitle().then(function(title) {
        console.log("Page title is: " + title);
      });
      driver.quit();
      */
    },
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests mit Vue Diagram Editor:
    initDiagramEditor() {
      // ACHTUNG 1: Zugriff auf $refs funktioniert NUR mit verschachtelten this.$nextTicks!!!
      // Ohne die ist $refs meistens undefiniert (Timing-Problem), selbst wenn es manchaml im Browser Log richtig angezeigt wird!
      // Das Browser Log wird erst beim Anschauen ausgewertet, was irreführend sein kann!
      // Vorlage dafür: https://forum.vuejs.org/t/ref-not-working-on-mounted-on-vue-components/66164/7
      // ACHTUNG 2: Der Aufruf von $refs.diagram.setModel() über diese Funktion initDiagramEditor() funktioniert überdies NICHT in mounted(),
      // sondern nur in initialisiereAusgewaehltesTabVerwaltung()!!!
      console.log("In initDiagramEditor()");
      this.$nextTick(() => {
        console.log("$refs: ", this.$refs);
        console.log("$refs.diagram: ", this.$refs.diagram);
        this.$nextTick(() => {
          // ACHTUNG: Das Compound VModel MUSS hier initialisiert werden mit den richtigen Werten!
          // Die Deklaration in data() oben reicht nicht aus!
          this.compoundModelDiagramEditor = {
            nodes: this.nodesDiagramEditor,
            links: this.linksDiagramEditor
          };
          console.log(
            "In nextTick(), compoundModelDiagramEditor: ",
            this.compoundModelDiagramEditor
          );
          this.$refs.diagram.setModel(this.compoundModelDiagramEditor);
          // Der folgende Test-Call wirft Fehler "...is not a function"!!! Mit und ohne nextTick()!
          /*
          this.$nextTick(() => {
            this.$refs.diagram.center()
          });
          console.log("nextTick() abgelaufen");
          */
        });
      });
    },

    formatNodeDiagramEditor(node) {
      // Hier könnte man auch andere Formatierungen machen innerhalb eines Nodes, oder man könnte über den VSlot des Diagram Editors
      // schönere UI-Elemente anzeigen. Die Daten müssten dabei wahrscheinlich aus dem Unterobjekt nodes.data kommen!!!
      return JSON.stringify(node, null, 2);
    },

    nodeColorDiagramEditor(node) {
      // Custom Funktion für Node Coloring, alle Knoten mit bestimmten Koordinaten sind grün oder rot!!
      if (node.coordinates.x > 800) {
        return "#0f0"; // grün
      }
      if (node.coordinates.y > 200) {
        return "#f00"; // rot
      }
    },

    nodePulsableDiagramEditor(node) {
      // Custom Funktion für pulsierende Nodes, alle Knoten mit bestimmten Koordinaten pulsieren!!!
      return node.coordinates.y > 200;
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests mit Vue Excel Editor:
    quasarCellStyle() {
      // style-Funktion für Vue Excel Editor
      // Färbt die Zellen gleich wie BIM.click Eingabefelder (teal-2, Vue-Excel-Editor kennt aber nur bestimmte Standardfarben)
      // ACHTUNG: Muss style-Objekt returnen, z.B. { color: "red" }
      // Wird im Template angezogen mit :cell-style="quasarCellStyle"
      return { color: "black", backgroundColor: "rgb(178,223,219)" };
    },
    quasarCellStyle2() {
      // style-Funktion für Vue Excel Editor
      // Färbt die Zellen gleich wie BIM.click Eingabefelder (teal-2, Vue-Excel-Editor kennt aber nur bestimmte Standardfarben)
      // ACHTUNG: Muss style-Objekt returnen, z.B. { color: "red" }
      // Wird im Template angezogen mit :cell-style="quasarCellStyle"
      return { color: "black", backgroundColor: "red" };
    },
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests von QField mit VueAutoNumeric:
    myIncrementIstWert() {
      console.log("In myIncrementIstWert()");
      console.log(
        "typeof(istWertObject.kennWert1): ",
        typeof this.istWertObject.kennWert1
      );
      console.log("istWertObject.kennWert1: ", this.istWertObject.kennWert1);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Hier KEINE manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // let number = this.decimalHandling.convertDecimalStringToNumber(
      //  this.istWertObject.kennWert1
      // );
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      let number = this.istWertObject.kennWert1;
      number = number + 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Es muss eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      this.istWertObject.kennWert1 = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      console.log(
        "istWertObject.kennWert1 aus myIncrement(): ",
        this.istWertObject.kennWert1
      );
    },

    myDecrementIstWert() {
      console.log("In myDecrementIstWert()");
      console.log(
        "typeof(istWertObject.kennWert1): ",
        typeof this.istWertObject.kennWert1
      );
      console.log("istWertObject.kennWert1: ", this.istWertObject.kennWert1);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Hier KEINE manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // let number = this.decimalHandling.convertDecimalStringToNumber(
      //  this.istWertObject.kennWert1
      // );
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      let number = this.istWertObject.kennWert1;
      number = number - 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Es muss eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      this.istWertObject.kennWert1 = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      console.log(
        "istWertObject.kennWert1 aus myDecrement(): ",
        this.istWertObject.kennWert1
      );
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests von QField mit VueNumeric:
    myIncrementIstWertVueNumeric() {
      console.log("In myIncrementIstWertVueNumeric()");
      console.log(
        "typeof(istWertObject.kennWert1): ",
        typeof this.istWertObject.kennWert1
      );
      console.log("istWertObject.kennWert1: ", this.istWertObject.kennWert1);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      //------------------------------------------------------------------------------------
      // ACHTUNG: Mit VueNumeric output-type="Number" ist hier (anders als bei VueAutoNumeric)
      // eine manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.istWertObject.kennWert1
      );
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      // let number = this.istWertObject.kennWert1;
      number = number + 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Mit VueNumeric output-type="Number" muss hier (anders als bei VueAutoNumeric)
      // KEINE Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      /*
      this.istWertObject.kennWert1 = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      */
      this.istWertObject.kennWert1 = number;
      console.log(
        "istWertObject.kennWert1 aus myIncrement(): ",
        this.istWertObject.kennWert1
      );
    },

    myDecrementIstWertVueNumeric() {
      console.log("In myDecrementIstWertVueNumeric()");
      console.log(
        "typeof(istWertObject.kennWert1): ",
        typeof this.istWertObject.kennWert1
      );
      console.log("istWertObject.kennWert1: ", this.istWertObject.kennWert1);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      //------------------------------------------------------------------------------------
      // ACHTUNG: Mit VueNumeric output-type="Number" ist hier (anders als bei VueAutoNumeric)
      // eine manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.istWertObject.kennWert1
      );
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      // let number = this.istWertObject.kennWert1;
      number = number - 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Mit VueNumeric output-type="Number" muss hier (anders als bei VueAutoNumeric)
      // KEINE Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      /*
      this.istWertObject.kennWert1 = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      */
      this.istWertObject.kennWert1 = number;
      console.log(
        "istWertObject.kennWert1 aus myDecrement(): ",
        this.istWertObject.kennWert1
      );
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests von QField mit VMoney - werden auch für VueAutoNumeric verwendet!
    myIncrementNullNiveau() {
      console.log("In myIncrementNullNiveau()");
      console.log("typeof(nullNiveau): ", typeof this.nullNiveau);
      console.log("nullNiveau: ", this.nullNiveau);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // ACHTUNG: Ist anders als in myIncrementSollwert()!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.nullNiveau
      );
      // console.log("typeof(number): ", typeof(number))
      console.log("number aus convertDecimalStringToNumber(): ", number);
      number = number + 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Es muss eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      this.nullNiveau = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      console.log("nullNiveau aus myIncrement(): ", this.nullNiveau);
    },

    myDecrementNullNiveau() {
      console.log("In myDecrementNullNiveau()");
      console.log("typeof(nullNiveau): ", typeof this.nullNiveau);
      console.log("nullNiveau: ", this.nullNiveau);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // ACHTUNG: Ist anders als in myDecrementSollwert()!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.nullNiveau
      );
      // console.log("typeof(number): ", typeof(number)) // number
      console.log("number aus convertDecimalStringToNumber(): ", number);
      number = number - 0.01; // ACHTUNG: Manchmal Rundungsfehler!
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Es muss eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      this.nullNiveau = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      console.log("nullNiveau aus myDecrement(): ", this.nullNiveau);
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Tests von QField mit VueNumeric - mit Anpassungen bzgl. Typkonvertierungen gegenüber
    // ihren ursprünglichen Pendants myIncrementNullNiveau/myDecrementNullNiveau()
    myIncrementNullNiveauVueNumeric() {
      console.log("In myIncrementNullNiveauVueNumeric()");
      console.log("typeof(nullNiveau): ", typeof this.nullNiveau);
      console.log("nullNiveau: ", this.nullNiveau);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // ACHTUNG: Ist anders als in myDecrementSollwert()!
      //------------------------------------------------------------------------------------
      // ACHTUNG: Diese ist hier auch mit VueNumeric und output-type="Number" NOTWENDIG!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.nullNiveau
      );
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      // let number = this.nullNiveau
      number = number + 0.01;
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      // ACHTUNG: Hier mit VueNumeric und output-type="Number" KEINE manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring:
      /*
      this.nullNiveau = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      */
      this.nullNiveau = number;
      console.log("nullNiveau aus myIncrement(): ", this.nullNiveau);
    },

    myDecrementNullNiveauVueNumeric() {
      console.log("In myDecrementNullNiveauVueNumeric()");
      console.log("typeof(nullNiveau): ", typeof this.nullNiveau);
      console.log("nullNiveau: ", this.nullNiveau);
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      // ACHTUNG: Ist anders als in myDecrementSollwert()!
      //------------------------------------------------------------------------------------
      // ACHTUNG: Diese ist hier auch mit VueNumeric und output-type="Number" NOTWENDIG!
      let number = this.decimalHandling.convertDecimalStringToNumber(
        this.nullNiveau
      );
      // console.log("typeof(number): ", typeof(number)) // number
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      // let number = this.nullNiveau
      number = number - 0.01; // ACHTUNG: Manchmal Rundungsfehler!
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      //----------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Hier mit VueNumeric und output-type="Number" KEINE manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring:
      /*
      this.nullNiveau = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      */
      this.nullNiveau = number;
      console.log("nullNiveau aus myDecrement(): ", this.nullNiveau);
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------
    // Für Tests von QInput-Feldern für Kennwerte als Dezimalzahlen (0.0/NHN-Werte)
    isNumeric(n) {
      // Hilfsfunktion, siehe https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric?rq=1
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isValidNiveau(v) {
      // Feldvalidierung für Input-Felder mit :rules="[isValidNiveau]"
      // Vorlage: https://codepen.io/metalsadman/pen/ZEbrjwB
      // ACHTUNG: Die Niveaus können auch negative Dezimalzahlen enthalten!!!
      //================================================================================================================
      // ACHTUNG: Der Parameter v ist bei Aufruf an einem normalen q-input mit type="number" NACH BENUTZEREINGABE
      //          offenbar immer ein String, weil der Browser oder Quasar eine Konvertierung des Wertes im v-model
      //          von Number nach String macht!!!
      // ACHTUNG: Bei Aufruf derselben Funktion an einem q-input mit type="number" und :value statt v-model ist der
      //          Typ von v nicht String, sondern Number. Daher braucht es in diesem Fall eine angepasst Validierungsfunktion.
      //          Diese hier wirft sonst einen Fehler "splitPositiveDecimalNumber.split is not a function".
      // ACHTUNG: Auch am zweiten q-input oben mit computed-Funktion zur Berechnung des v-models scheint der Typ
      //          Number zu sein, und die Funktion wirft ebenfalls diesen Fehler - daher dort disabled (macht sowieso
      //          keinen Sinn, dort Validierungsmeldungen anzuzeigen, wenn dort nicht direkt etwas eingegeben wird)
      // ACHTUNG: Man kann die Eingabewerte hier in der Validierungsfunktion nicht einfach korrigieren vor return per Zuweisung,
      //          sonst wird die Funktion mit dem korrigierten Wert nochmals aufgerufen, und findet dann keinen
      //          Validierungsfehler. Der Benutzer muss also die Werte manuell korrigieren!
      //================================================================================================================
      if (v == null || v === "") return true; // ACHTUNG: Bei mit Tasten geleertem Feld ist v offenbar "", nicht null!
      console.log("In isValidNiveau(v) für Parameter v:", v);
      // Zunächst Test auf gültige Dezimalzahl (z.B. 1,5, -2,0, ,4)
      // Dabei sind auch ganze Zahlen ohne Dezimalpunkt valide (z.B. 0, 1, -1)
      // Vorlage: https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric?rq=1
      if (!this.isNumeric(v)) {
        return "Keine gültige Dezimalzahl"; // HINWEIS: Da diese Meldung beim Testen NIE kommt, scheint dies bereits durch type="number"
        // vom Browser gewährleistet zu werden!
      } else {
        // Check auf Dezimalzahl (decimal Places) - Vorlagen:
        // https://stackoverflow.com/questions/1133770/how-to-convert-a-string-to-an-integer-in-javascript
        // https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
        const number = Number(v);
        console.log("number: ", number);
        if (Number.isInteger(number)) {
          // v ist positive oder negative ganze Zahl
          if (number < -9999 || number > 9999) {
            return "Dezimalwert darf nicht größer als 9999,99 und nicht kleiner als -9999,99 sein";
          }
        } else {
          // v ist String mit positiver oder negative Dezimalzahl - ACHTUNG: Dezimaltrennzeichen im String per Log ist ".", nicht ","!!!
          let splitPositiveDecimalNumber = v;
          if (v[0] === "-") {
            splitPositiveDecimalNumber = splitPositiveDecimalNumber.substring(
              1
            ); // Minuszeichen entfernen, wenn vorhanden, returned Array
          }
          // Dieser String muss mindestens Länge 1 haben, denn es war eine Dezimalzahl, mit oder ohne Vorzeichen
          console.log(
            "splitPositiveDecimalNumber: ",
            splitPositiveDecimalNumber
          );
          const splitDecimalNumber = splitPositiveDecimalNumber.split(".");
          // Zerlegt den positiven Teil der Dezimalzahl in 2 Teile
          console.log("splitDecimalNumber: ", splitDecimalNumber);
          const vorkommaString = splitDecimalNumber[0];
          // Der Vorkommateil kann auch leer sein! Oder er kann führende Nullen enthalten!
          if (vorkommaString.length > 4) {
            return "Dezimalwert darf höchstens 4 Vorkommastellen haben";
          } else {
            // Kein Nachkommateil oder höchstens 4 Stellen
            if (splitDecimalNumber.length > 1) {
              const nachkommaString = splitDecimalNumber[1];
              console.log("nachkommaString: ", nachkommaString); // Kann führende Nullen enthalten!
              if (nachkommaString.length > 2) {
                return "Dezimalwert darf höchstens 2 Nachkommastellen haben";
              } else {
                // Kein Nachkommateil oder höchstens 2 Stellen, ok
                return true;
              }
            }
          }
        }
      }
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Für Tests zum Lesen gefilterter Baustoffe:
    leseRaumKindBaueinheitenVonGeschoss() {
      console.log("In leseRaumKindBaueinheitenVonGeschoss()");
      let apiRoute =
        process.env.API +
        "/Baueinheiten/" +
        this.baueinheitsIdVonGeschoss +
        "/Kinder/Raeume";
      this.$axios
        .get(apiRoute)
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.get, response.status: ",
            response.status
          );
          this.raumKindBaueinheiten = response.data;
          console.log(
            "raumKindBaueinheitena aus API Request: ",
            this.raumKindBaueinheiten
          );
          // ACHTUNG: raumKindBaueinheiten wird im Tab unten angezeigt per stringify-Funktion. Sollte erhalten bleiben.
          // Deshalb wird es zunächst umkopiert in einen anderen Array, der danach aufbereitet wird für die Anzeige mittels Vue Diaram Editor
          // Dazu muss der Array gecloned werden, denn mit dem folgenden Assignment wird nur eine Referenz erzeugt, wie man im Log sieht:
          // let raumKindBaueinheitenFuerDiagramm = this.raumKindBaueinheiten
          // Daher Cloning des Arrays nach Vorlage mit Spread Syntax: https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
          let raumKindBaueinheitenFuerDiagramm = this.raumKindBaueinheiten.map(
            a => ({ ...a })
          );
          // Nun die Daten aufbereiten für die Anzeige mit Vue Diagram Editor
          // Dieser kann Objekte UND Arrays anzeigen
          // ACHTUNG: Das VModel für den Vue Diagram Editor muss per setModel({nodes, links}) übergeben und aktualisiert werden!!!
          // Dieses VModel-Objekt {nodes, links} wurde hierbei in data() zu einem gemeinsamen Objekt compoundModelDiagramEditor zusammengefasst, das ist aber nur Convenience, nicht obligatorisch
          // ACHTUNG: Vue Diagram Editor erwartet in einem Node ZWINGEND bestimmte Felder: coordinates, size, title - diese müssen so heißen!!!
          // ACHTUNG: Ein id-Feld ist optional - wenn keines hier angegeben wird, generiert Vue Diagram Editor eines!
          // Siehe https://vue-diagram-editor.js.org/#node
          // ACHTUNG: Zooming wird über das Package svg-pan-zoom libary unterstützt - unklar, wie dies genau erfolgt:
          // https://vue-diagram-editor.js.org/#methods
          // https://www.npmjs.com/package/svg-pan-zoom - muss irgendwie in das HTML Doc eingebunden werden und dann initialisiert werden
          // https://github.com/bumbu/svg-pan-zoom#public-api
          for (let i = 0; i < raumKindBaueinheitenFuerDiagramm.length; i++) {
            raumKindBaueinheitenFuerDiagramm[i].id =
              raumKindBaueinheitenFuerDiagramm[i]._id;
            raumKindBaueinheitenFuerDiagramm[i].coordinates = {};
            raumKindBaueinheitenFuerDiagramm[i].coordinates.x =
              (250 + 40) * i + 20;
            raumKindBaueinheitenFuerDiagramm[i].coordinates.y = 20;
            raumKindBaueinheitenFuerDiagramm[i].size = {};
            raumKindBaueinheitenFuerDiagramm[i].size.width = 250;
            raumKindBaueinheitenFuerDiagramm[i].size.height = 200;
            raumKindBaueinheitenFuerDiagramm[i].title =
              raumKindBaueinheitenFuerDiagramm[i].baueinheitsBezeichnung;
            //-------------------------------------------------------------------------------------------------------------------
            // Zusätzliche Custom Payload kann hierbei in das Feld data gepackt werden:
            // Diese wird auch angezeigt von formatNodeDiagramEditor(node), ohne dass die Unterfelder vordefiniert werden müssen!
            raumKindBaueinheitenFuerDiagramm[i].data = {
              baueinheitsBezeichnung:
                raumKindBaueinheitenFuerDiagramm[i].baueinheitsBezeichnung,
              baumKnotenTyp: raumKindBaueinheitenFuerDiagramm[i].baumKnotenTyp,
              verzweigungsTyp:
                raumKindBaueinheitenFuerDiagramm[i].verzweigungsTyp
            };
            //--------------------------------------------------------------------------------------------------------------------
            // "Doppelte" bzw. hier überflüssige Felder entfernen (nur der Übersicht halber):
            delete raumKindBaueinheitenFuerDiagramm[i].baueinheitsBezeichnung;
            delete raumKindBaueinheitenFuerDiagramm[i]._id;
            delete raumKindBaueinheitenFuerDiagramm[i].verzweigungsTyp;
            delete raumKindBaueinheitenFuerDiagramm[i].baumKnotenTyp;
            delete raumKindBaueinheitenFuerDiagramm[i]
              .zugeordneteBaueigenschaftsProfile;
            delete raumKindBaueinheitenFuerDiagramm[i].path;
            delete raumKindBaueinheitenFuerDiagramm[i].parent;
          }
          console.log(
            "raumKindBaueinheiten nach Umwandlung zum VModel für Vue Diagram Editor: ",
            raumKindBaueinheitenFuerDiagramm
          );
          // Nun das VModel für Vue Diagram Editor aktualisieren:
          this.compoundModelDiagramEditor.links = []; // TODO XXXXXX - Dieses auf leeren Array setzen, sonst müssten Ports
          // zwischen den Räumen korrekt gesetzt werden
          this.compoundModelDiagramEditor.nodes = raumKindBaueinheitenFuerDiagramm;
          this.$refs.diagram.setModel(this.compoundModelDiagramEditor);
          // Status loggen
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

    //-----------------------------------------------------------------------------------------------------------------------------
    importAbstractBIMGebauede() {
      console.log("in importAbstractBIMGebaeude()");
      let apiRoute =
        process.env.API + "/Baueinheiten" + "/Import/AbstractBIM/Gebaeude";
      this.$axios
        .post(apiRoute, {
          bezeichnungZielGebaeude: this.bezeichnungZielGebaeude
        })
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.post, response.status: ",
            response.status
          );
          // Status loggen
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

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Für Tests zum Lesen gefilterter Baustoffe:
    leseGefilterteBaustoffe() {
      console.log("In leseGefilterteBaustoffe()");
      // Hier zunächst Tests für Umgang mit Query Parameters
      // Test-Array für Lösung 1 (disabled)
      /*
      let myArray = {
        str: "abc def, ghi",
        arr: ["abc", 123]
      }
      */
      // Filter-Test-Array für Lösung 2:
      let myFilterArray = [
        {
          baueigenschaftsBezeichnung:
            "Allgemein > Test > Wertetypen > Dynamische Steifigkeit",
          kennWert1: 35,
          operator: "$eq"
        },
        {
          baueigenschaftsBezeichnung:
            "Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung",
          bezeichnungsWert1: "Knauf",
          operator: "$eq"
        } // ACHTUNG: String für bezeichnungsWert kann Blanks und Sonderzeichen enthalten!
      ];
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Erste Lösung für Query String (wenig brauchbar, daher disabled)
      // Vorlage: https://stackoverflow.com/questions/6243051/how-to-pass-an-array-within-a-query-string - dort Antwort für Javascript unten!
      // let queryParams = new URLSearchParams(myArray).toString();
      // ?str=abc&arr=abc,123 (with escaped characters)
      // console.log("queryParams:", queryParams)
      // str=abc+def%2C+ghi&arr=abc%2C123 (mit escaped characters, z.B. %2C = ",")
      // Erscheint so wenig brauchbar! Daher disabled
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Lösung für Query String:
      // Vorlage: https://stackoverflow.com/questions/16903476/node-js-http-get-request-with-query-string-parameters - den Array erst mit stringify()
      //          in String umwandeln, dann noch als URI encoden, dann als Query Parameter mit "?" hinten an den Request anhängen
      let myFilterArrayStringified = JSON.stringify(myFilterArray);
      console.log("myFilterArrayStringified: ", myFilterArrayStringified); // JSON-Notation für Array, enthält Blanks
      // [
      //  {"baueigenschaftsBezeichnung":"Allgemein > Test > Wertetypen > Dynamische Steifigkeit","kennWert1":35,"operator":"$eq"},
      //  {"baueigenschaftsBezeichnung":"Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung","bezeichnungsWert1":"Knauf","operator":"$eq"}
      // ]
      // Enthält etwaige Blanks und Sonderzeichen
      // 2. Schritt, um etwaige Blanks und Sonderzeichen zu encoden:
      let myFilterArrayStringifiedAndURIEncoded = encodeURIComponent(
        myFilterArrayStringified
      );
      // Siehe dazu https://www.w3schools.com/tags/ref_urlencode.ASP
      // sowie https://stackoverflow.com/questions/6807180/how-to-escape-a-json-string-to-have-it-in-a-url
      // Rekursiv bei nested Objects: https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
      // https://stackoverflow.com/questions/4540753/should-i-use-encodeuri-or-encodeuricomponent-for-encoding-urls - encodeURI() gilt für ganze URLs,
      // encodeURIComponent() für Teile davon (wie z.B. Query String)
      // Dasselbe gilt für decodeURI() vs. decodeURIComponent(): https://stackoverflow.com/questions/747641/what-is-the-difference-between-decodeuricomponent-and-decodeuri
      console.log(
        "myFilterArrayStringifiedAndURIEncoded: ",
        myFilterArrayStringifiedAndURIEncoded
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
        this.baustoffIdFuerFilterungBaustoffe +
        "/Baueigenschaften/Filter" +
        "?filter=" +
        myFilterArrayStringifiedAndURIEncoded;
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
          this.gefilterteBaustoffe = response.data;
          // Status loggen
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

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Für QForm Tests für Normaußentemperatur - siehe oben
    onSubmitNormAussenTemperaturen(arg) {
      console.log("In onSubmitNormAussenTemperaturen(arg) - arg: ", arg);
      let myQueryString = "?plz=" + this.postLeitZahl;
      this.$axios
        .get(
          process.env.API + "/Tabellen/Normaussentemperaturen/" + myQueryString
        )
        .then(doc => {
          console.log("doc.data:", doc.data);
          this.auslegungsAussenTemperatur = doc.data.auslegungsAussenTemperatur;
          this.jahresMittlereAussenTemperatur =
            doc.data.jahresMittlereAussenTemperatur;
        })
        .catch(error => {
          console.log(
            "Fehler beim Ermitteln der Normaußentemperaturen: ",
            error
          );
        });
    },

    onResetNormAussenTemperaturen() {
      this.postLeitZahl = null;
      this.auslegungsAussenTemperatur = null;
      this.jahresMittlereAussenTemperatur = null;
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------
    // Für QForm Tests - siehe oben
    onSubmit(arg) {
      console.log("In onSubmit(arg) - arg: ", arg);
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methode zum Laden von Testdaten in die Datenbank
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
      console.log("In requestGuardedRouteBenutzer()");
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
      console.log("In vorlageFuerMethode()");
    },

    formatDate: function(val) {
      //------------------------------------------------------------------------------------------------------------------//
      // Helper function for Date Formatting
      // ACHTUNG: Helper Funktionen, die nicht auf Variablen in data() operieren, können in data () deklariert werden!
      // Sonst müssen sie nach methods: verschoben werden!
      //------------------------------------------------------------------------------------------------------------------//
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
    },

    initialisiereAusgewaehltesTabVerwaltung() {
      //--------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Tabs für die Verwaltung
      //--------------------------------------------------------------------------------------------------------------------------------
      console.log("In initialisiereAusgewaehltesTabVerwaltung()");
      console.log("tabVerwaltung: ", this.tabVerwaltung);
      console.log("tabTestArea1: ", this.tabTestArea1);
      console.log("tabTestArea2: ", this.tabTestArea2);
      console.log("tabTestArea3: ", this.tabTestArea3);
      //===========================================================================
      // NEU: Für Tests von Vue Diagram Editor:
      if (this.tabTestArea2 === "test12TabVerwaltung") {
        console.log("Initialisierung");
        this.initDiagramEditor();
      }
    },

    updateBenutzer: function() {
      //--------------------------------------------------------------------------------------------------------------------
      // NEU: Macht einen Update des Benutzers (Aufruf per Button "Speichern" im Tab "Verwaltung")
      // ACHTUNG: Der für den Benutzer einstellbare Wert für tablesPaginationRowsPerPage wird zusammen mit der Mongoose id des Benutzers im global/local Store
      //          (worauf das QSelect-Feld in den Verwaltung hier in verwaltung.vue arbeitet) gehalten, aber auch in der Datenbank UND im Browser localStorage.
      //          Auf letzteres wird (bei angemeldetem Benutzer) zurückgegriffen, wenn bei Browser Refresh das Feld neu gesetzt
      //          werden muss im global Store. Zusätzlich wird es bei Benutzeranmeldung in my-layout.vue aus der Datenbank gelesen und
      //          mit dem aus der Datenbank gelesenen Wert die Felder im global Store (Mutator anmeldungBenutzer()) und localStorage (Browser) gesetzt.
      //--------------------------------------------------------------------------------------------------------------------
      console.log("In updateBenutzer()");
      console.log("ACHTUNG: Macht aktuell nur return");
      /*
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
            .einstellungenBenutzer.tablesPaginationRowsPerPage // Das oben im Form per QSelect abgeänderte Feld
        })
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.put, response.status: ",
            response.status
          ); // Status loggen
          // ACHTUNG: RowsPerPage auch in localStorage aktualisieren, sonst wird bei Brwoser Refresh daraus noch der alte Wert restauriert!!!
          localStorage.setItem(
            "tablesPaginationRowsPerPage",
            this.localStore.state.einstellungenBenutzer
              .tablesPaginationRowsPerPage
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
        */
    },

    showErrorNotification(modus, error) {
      // Unterkomponenten teilen ihre Fehler per Parameter error mit!
      // Diese Komponente zeigt sie dann mittels des global-stores dann an.
      console.log("In showErrorNotification(): ", error);
      if (!error.hasOwnProperty("response")) {
        // Fehler ohne Backend-Beteiligung (z.B. Validation-Fehler)
        console.log(
          "ACHTUNG: XXXXXXXXXXXXXXXX Unvorhergesehener Fall in showErrorNotification()"
        );
      } else {
        switch (modus) {
          case "Neuanlage":
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BENUTZER_NEUANLAGE_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BENUTZER_NEUANLAGE_FEHLER
              );
            }
            break;
          case "Bearbeitung":
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BENUTZER_AENDERUNG_FEHLER
            );
            break;
        }
      }
      // PROBLEM: Hier tritt Reload auf/Route Change auf localhost://Verwaltung?
      // this.tabBenutzer = "neuAnlageTabBenutzer"; // Nutzt nichts
      console.log("Vor Ende von showErrorNotification()");
    },

    handleChangeTabRequest(nameOfTab) {
      // -----------------------------------------------------------------------------
      // Wird verwendet um von Kindkomponenten gewünschte Tabwechsel durchzuführen
      console.log("In handleChangeTabRequest() mit Argument: ", nameOfTab);
      switch (nameOfTab) {
        case "Bearbeitung":
          this.tabBenutzer = "detailsTabBenutzer";
          break;
        case "Neuanlage":
          this.tabBenutzer = "neuAnlageTabBenutzer";
          break;
        default:
          throw new Error("Es gab ein Problem in handleChangeTabRequest()");
      }
    },

    deleteSelectedBenutzer() {
      // --------------------------------------------------------------------------
      // Löscht die in selectedBenutzer befindlichen Benutzer am Backend
      this.$axios
        .delete(process.env.API + "/Benutzer/" + this.selectedBenutzer._id)
        .then(doc => {
          console.log("Benutzer wurde erfolgreich gelöscht");
          this.refreshBenutzer();
          this.deleteSelectedBenutzerDialog = false;
        });
    },

    changeSelectionAusgewaehlterBenutzer(newSelected) {
      // -----------------------------------------------------------------------------
      // Setzt das Objekt selectedBenutezr in dieser Komponente auf newSelected
      // Wird verwendet, wenn Kindkomponenten die Auswahl ändern
      console.log("In changeSelectionAusgewaehlterBenutzer()");
      console.log("Parameter newSelected: ", newSelected);
      console.log(newSelected);
      if (newSelected.length > 0) {
        this.selectedBenutzer = newSelected[0];
      } else {
        this.selectedBenutzer = null;
      }
    },

    refreshBenutzer(modus, payload) {
      // Lädt die Benutzer aus dem Backend neu und gibt eine vom Aufrufer (eine Komponente) festgelegte Meldung an den Nutzer ab
      // ACHTUNG: Diese Version des Codes wählt nach einer Neuanlage NICHT den neu angelegten Benutzer in der Übersichtstabelle aus (TODO).
      // TODO XXXXXX: Dafür müsste die id  des neu angelegten Benutezrs vom Backend geliefert werden und dann
      // mit find aus dem VModel der QTable gesucht werden und die selected Row darauf gesetzt werden - siehe
      // baueigenschafts-profile.vue
      console.log("In refreshBenutzer(modus, payload)");
      console.log("modus: ", modus);
      console.log("payload: ", payload);
      // NEU: Zunächst Nachrichten ausgeben:
      switch (modus) {
        case "Neuanlage":
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BENUTZER_NEUANLAGE_ERFOLG
          );
          break;
        case "Bearbeitung":
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BENUTZER_AENDERUNG_ERFOLG
          );
          break;
      }
      let idGewuenschteAuswahlTabelleBenutzer = null;
      if (payload != null && payload !== undefined) {
        idGewuenschteAuswahlTabelleBenutzer = payload; // Bei Neuanlage Id des neu erzeugten Bemutzers aus dem Backend!
      } else {
        if (this.selectedBenutzer !== null) {
          console.log("selectedBenutzer: ", this.selectedBenutzer);
          idGewuenschteAuswahlTabelleBenutzer = this.selectedBenutzer._id; // id der bisherige Table Selection merken, sonst null
        } else {
          // Es war kein Benutzer ausgewählt - nichts zu tun
        }
      }
      // Jetzt weitermachen mit Refresh:
      this.$axios
        .get(process.env.API + "/Benutzer")
        .then(doc => {
          console.log("Alle Benutzer - doc:", doc);
          this.alleBenutzer = doc.data;
          if (idGewuenschteAuswahlTabelleBenutzer !== null) {
            // Ausgewähltes Benutzer ggf. wiederfinden und Table Selection darauf setzen
            this.selectedBenutzer = this.alleBenutzer.find(
              arg => arg._id === idGewuenschteAuswahlTabelleBenutzer
            );
          }
          if (payload != null && payload !== undefined) {
            this.tabBenutzer = "detailsTabBenutzer";
          }
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log("Fehler beim Lesen aller Benutzer - error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BENUTZER_LESEN_FEHLER
          );
          this.tabBenutzer = "uebersichtTabBenutzer";
        });
    }
  }, // /methods:

  //***============================================================================================================================
  computed: {
    stringifyFilestackPickerResponse: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Macht Pretty Printing für Debug-Ausgabe
      //----------------------------------------------------------------------------------------------------------------------------
      if (this.filestackPickerResponse != null) {
        return JSON.stringify(this.filestackPickerResponse, null, 2);
      } else {
        return null;
      }
    },
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
    //-------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktion für Test Area 12, Hint unter QSelect für Nutzlastkategorie
    // Switch auf den ersten 4 Stellen des Aufzählungswerts
    // Vorlage: https://answers.unity.com/questions/174869/using-the-startswith-function-in-a-switch-case-sta.html
    // Die Texte stammmen aus der Tabelle 6.1 DE in DIN 1991
    computeNutzlastKategorieHint: function() {
      switch (this.ausgewaehlteNutzlastKategorie.substring(0, 4)) {
        case "A1: ":
          return `Für Wohnzwecke nicht geeigneter, aber zugänglicher Dachraum bis 1,80 m lichler Höhe`;
        case "A2: ":
          return `Decken mit ausreichender Querverteilung der Lasten, Räume und Flure in Wohngebäuden,
                    Bettenräume in Wohn- und Krankenhäusem, Hotelzimmer einschließlich zugehöriger Aufenthaltsräume, Küchen und Bäder`;
        case "A3: ":
          return `Wie A2, aber ohne ausreichende Querverteilung der Lasten`;
        case "B1: ":
          return `Flure in Bürogebäuden, Büroflächen, Arztpraxen ohne schweres Gerät,
                    Stationsräume, Aufenthaltsräume einschließlich der Flure, Kleinviehställe`;
        case "B2: ":
          return `Flure und Küchen in Krankenhäusem, Hotels, Altenfheimen, Flure in Internaten usw.;
                    Behandlungsraume in Krankenhäusem, einschließlich Operationsraume ohne schweres Gerat; Kellerräume in Wohngebäuden`;
        case "B3: ":
          return `Alle Beispiele von B1 u. B2, jedoch mit schwerem Gerät`;
        case "C1: ":
          return `Flächen mit Tischen;  Kindertagesstätten, Kinderkrippen, Schulräume, Cafés,
                    Restaurants, Speisesäle, Lesesäle, Empfangsräume, Lehrerzimmer`;
        case "C2: ":
          return `Flächen mit fester Bestuhlung; z.B. Flächen in Kirchen, Theatern oder Kinos,
                    Kongresssäle, Hörsäle, Wartesäle`;
        case "C3: ":
          return `Frei begehbare Flächen; z.B. Museumsflächen, Ausstellungsflächen, Eingangsbereiche
                    in öffentlichen Gebäuden, Hotels, nicht befahrbare Hofkellerdecken, sowie die zu C1 bis C3 gehörigen Flure`;
        case "C4: ":
          return `Sport- und Spielflächen; z.B. Tanzsäle, Sporthallen, Gymnastik- und Kraftsporträume, Bühnen`;
        case "C5: ":
          return `Flächen für große Menschenansammlungen; z.B. in Gebäuden wie Konzertsäle, Terrassen
                    und Eingangsbereiche sowie Tribünen mit fester Bestuhlung`;
        case "C6: ":
          return `Flächen mit regelmäßiger Nutzung durch erhebliche Menschenansammlungen, Tribünen ohne feste Bestuhlung`;
        case "D1: ":
          return `Flächen von Verkaufsräumen bis 50 m² Grundfläche in Wohn-, Büro- und vergleichbaren Gebäuden`;
        case "D2: ":
          return `Flächen in Einzelhandelsgeschäften und Warenhäusern`;
        case "D3: ":
          return `Flächen wie D2, jedoch mit erhöhten Einzellasten infolge hoher Lagerregale`;
        case "E1.1":
          return `Flächen in Fabriken und Werkstätten3 mit leichtem Betrieb und Flächen in Großviehställen`;
        case "E1.2":
          return `Allgemeine Lagerflächen, einschließlich Bibliotheken`;
        case "E1.3":
          return `Flächen in Fabriken und Werkstätten mit mittlerem oder schwerem Betrieb`;
        case "T1: ":
          return `Treppen und Treppenpodeste in Wohngebäuden, Bürogebäuden und von Arztpraxen ohne schweres Gerät`;
        case "T2: ":
          return `Alle Treppen und Treppenpodeste, die nicht in T1 oder T3 eingeordnet werden können`;
        case "T3: ":
          return `Zugänge und Treppen von Tribünen ohne feste Sitzplätze, die als Fluchtwege dienen`;
        case "Z:  ":
          return `Dachterrassen, Laubengänge, Loggien usw., Balkone, Ausstiegspodeste`;
        default:
          return "Fehler in Hint für Nutzungskategorie für Nutzlasten nach Tabelle 6.1 DE in DIN 1991";
      }
    },
    //-------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktion für Test von QField mit VMoney:
    // HINWEISE: 2 alternative Varianten hier getestet:
    // 1) watch auf nullNiveau (v-model des 2. Testfelds), in dem nhnNiveau (v-model des 3. Testfelds) aktualisiert wird
    // 2) computed-Funktion als v-model des 3. Testfelds, welches aus dem aktuellen Wert
    //    von nullNiveau den Wert ausrechnet, der dann im 3. Testfeld angezeigt wird
    // Beide Varianten funktionieren (wenn computed verwendet wird, kann der watch disabled werden
    // ACHTUNG: Bei 2) ist das v-model "number", nicht "string", wie es auch unter dem 3. Testfeld angezeigt wird (typeOf)
    computeNHNNiveau: function() {
      console.log("In computeNHNNiveau(computed)");
      // ACHTUNG: Der Typ des v-models ist anfangs Number und ändert sich nach der ersten Eingabe von Number nach String!!!
      // Daher müssen beide Fälle hier behandelt werden:
      // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
      if (typeof this.nullNiveau === "string") {
        console.log(
          "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
        );
        let number = this.decimalHandling.convertDecimalStringToNumber(
          this.nullNiveau
        );
        console.log(
          "number aus Konvertierung, vor Addition von NHN-Testwert: ",
          number
        );
        // console.log("typeof(number): ", typeof(number))
        number = number + 250.0; // ACHTUNG: Manchmal Rundungsfehler!
        // number = Math.round(number *100) / 100
        // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
        console.log(
          "number nach Addition von NHN-Testwert, vor Rückkonvertierung nach Dezimalstring: ",
          number
        );
        // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als Number, aber
        // dieser wird leider NICHT durch v-money formatiert!
        // this.nhnNiveau = number; // Nur in watch-Variante!
        // Daher mit Custom Funktion wieder in Dezimalstring rückkonvertieren, wie es VMoney intern auch macht:
        let result = this.decimalHandling.convertNumberToDecimalString(
          number,
          2,
          ",",
          "."
        );
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log(
          "Berechnetes nhnNiveau nach Rückkonvertierung in Dezimalstring in computed: ",
          result
        );
        return result;
        //
        // Alternativer Fehlversuch mit Rückkonvertierung nach String
        // console.log("typeof(number): ", typeof(number))
        // this.nhnNiveau = number.toString()
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        // onsole.log("Adjusted nhnNiveau: ", this.nhnNiveau)
        // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als String, aber
        // dieser wird leider auch NICHT durch v-money formatiert!
        // Man muss also die durch VMoney durchgeführte Formatierung hier manuell per Funktion machen!
        // Obige Funktion convertNumberToDecimalString() macht das, es ist die Umkehrfunktion von convertDecimalStringToNumber()
      } else {
        // type "number", kommt am Anfang vor per Tests!!!
        console.log(
          "nullNiveau hat Typ Number, vor direkter Addition von NHN-Testwert"
        );
        let number = this.nullNiveau + 250.0;
        number = Math.round(number * 100) / 100;
        // Gegen Rundungsfehler: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
        let result = this.decimalHandling.convertNumberToDecimalString(
          number,
          2,
          ",",
          "."
        );
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log(
          "Berechnetes nhNiveau nach Konvertierung in Dezimalstring in computed: ",
          result
        );
        return result;
      }
    },

    computeNHNNiveauForAutoNumeric: function() {
      // Neue computed-Funktion für VueAutoNumeric
      // Einfacher als obige, da sie nur mit Numbers, nicht mit Strings arbeitet
      // Allerdings muss sie ebenfalls manuall das fiktive v-model nhnNiveauObject updaten,
      // per Vue $set, denn dieses bleibt sonst untouched, da das v-model ja durch diese Funktion computed ist
      console.log("In computeNHNNiveauForAutoNumeric()");
      console.log("nullNiveau: ", this.nullNiveau);
      console.log("typeof nullNiveau: ", typeof this.nullNiveau); // Object oder Number
      if (this.nullNiveau == null) return null;
      else if (typeof this.nullNiveau === "number") {
        let number = this.nullNiveau + 250.0; // Number
        // Diese wird aber so ebenfalls NICHT von VueAutoNumeric nach Dezimalstring konvertiert!
        // Daher hier ebenfalls manuelle Konvertierung:
        number = Math.round(number * 100) / 100;
        // Gegen Rundungsfehler: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
        let result = this.decimalHandling.convertNumberToDecimalString(
          number,
          2,
          ",",
          "."
        );
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log(
          "Berechnetes nhNiveau nach Konvertierung in Dezimalstring in computed: ",
          result
        );
        // Per this.$set nun Update von nhnNiveau mit number
        this.$set(this.nhnNiveauObject, "kennWert1", number);
        return result;
      } else {
        console.log("XXXXXX Error - invalider Typ von nullNiveau");
        return "Invalider Typ von nullNiveau";
      }
    },

    computeNHNNiveauForVueNumeric: function() {
      // Angepasste computed-Funktion für VueNumeric, abgeleitet aus computeNHNNiveauForAutoNumeric()
      // Einfacher als obige, da sie nur mit Numbers, nicht mit Strings arbeitet
      // Allerdings muss sie ebenfalls manuall das fiktive v-model nhnNiveauObject updaten,
      // per Vue $set, denn dieses bleibt sonst untouched, da das v-model ja durch diese Funktion computed ist
      console.log("In computeNHNNiveauForVueNumeric()");
      console.log("nullNiveau: ", this.nullNiveau);
      console.log("typeof nullNiveau: ", typeof this.nullNiveau); // Object oder Number
      // ACHTUNG: Ist mit VueNumeric output-type="Number" beim ersten Rendering "number".
      // Mit der ursprünglichen Konvertierung hier unten würde sie allerdins zu "string", was dann
      // später zur Fehlermeldung "XXXXXX Error - invalider Typ von nullNiveau führt.
      // Daher diese Konvertierung für AutoNumeric hier unten AUSGEBAUT -
      // trotzdem zeigt die Funktion weiter "string" and und liefert daher "Invalider Typ" zurück! zzzzz
      if (this.nullNiveau == null) return null;
      else if (typeof this.nullNiveau === "number") {
        let number = this.nullNiveau + 250.0; // Number
        // Diese wird aber so ebenfalls NICHT von VueAutoNumeric nach Dezimalstring konvertiert!
        // Daher hier ebenfalls manuelle Konvertierung:
        number = Math.round(number * 100) / 100;
        // Gegen Rundungsfehler: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
        // Hier mit VueNumeric KEINE manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
        /*
        let result = this.decimalHandling.convertNumberToDecimalString(
          number,
          2,
          ",",
          "."
        );
        */
        let result = number; // Stattdessen mit VueNumeric
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log("Berechnetes nhNiveau in computed: ", result);
        // Per this.$set nun Update von nhnNiveau mit number
        this.$set(this.nhnNiveauObject, "kennWert1", number);
        return result;
      } else {
        console.log("XXXXXX Error - invalider Typ von nullNiveau");
        return "Invalider Typ von nullNiveau";
      }
    },

    computeSollWertForAutoNumeric: function() {
      // Neue computed-Funktion für VueAutoNumeric
      // ACHTUNG: Wird unverändert auch für VueNumeric verwendet und funktioniert!
      // Initialisiert das disablete erste Ausgabefeld mit dem Sollwert aus dem fiktiven v-model
      // Ein Update dieses fiktiven v-models sollWertObject per Vue $set kann hier unterbleiben
      // Das v-model wird, weil das Feld disabled ist, NIE geändert
      console.log("In computeSollWertForAutoNumeric");
      console.log("sollWertObject.kennWert1: ", this.sollWertObject.kennWert1);
      console.log("typeof sollWertObject: ", typeof this.sollWertObject); // Object oder Number
      if (this.sollWertObject.kennWert1 == null) return null;
      else if (typeof this.sollWertObject.kennWert1 === "number") {
        let number = this.sollWertObject.kennWert1; // Initialisierung mit Iswert, Typ Number
        // Diese wird aber so ebenfalls NICHT von VueAutoNumeric nach Dezimalstring konvertiert!
        // Daher hier ebenfalls manuelle Konvertierung:
        number = Math.round(number * 100) / 100; // Sicherheitshalber
        // Gegen Rundungsfehler: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
        let result = this.decimalHandling.convertNumberToDecimalString(
          number,
          2,
          ",",
          "."
        );
        console.log(
          "Berechneter Sollwert nach Konvertierung in Dezimalstring in computed: ",
          result
        );
        // Per this.$set nun Update von sollWertObject mit number - kann hier unterbleiben
        // this.$set(this.sollWertObject, "kennWert1", number);
        return result;
      } else {
        console.log("XXXXXX Error - invalider Typ von sollWertObject");
        return "Invalider Typ von sollWertObject";
      }
    },

    //-------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funkktionen für Test von QInput-Felder für Dezimalzahlen:
    computeTestDezimalWertFuerNiveauNHN: function() {
      // this.testDezimalWertFuerNiveauEingang = Number(this.testDezimalWertFuerNiveau00) + 245.00; // ACHTUNG: Side Effect - nicht erlaubt!
      return Number(this.testDezimalWertFuerNiveau00) + 245.0; // Test von computed-Funktion für Dezimalzahl
    },

    stringifyGefilterteBaustoffe: function() {
      return JSON.stringify(this.gefilterteBaustoffe, null, 2);
    },

    stringifyRaumKindBaueinheiten: function() {
      return JSON.stringify(this.raumKindBaueinheiten, null, 2);
    },

    //======================================================================================================================================
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
  }, // /computed:

  //***============================================================================================================================
  watch: {
    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // Watch-Funktion zum Test von QField mit VMoney:
    // HINWEISE: 2 alternative Varianten hier getestet:
    // 1) watch auf nullNiveau, in dem nhnNiveau (v-model des 3. Testfelds) aktualisiert wird
    // 2) computed-Funktion als v-model des 3. Feldes, welches aus dem aktuellen Wert
    //    von nullNiveau den Wert ausrechnet, der dann im 3. Testfeld angezeigt wird
    // Beide Varianten funktionieren
    // ACHTUNG: Wenn computed verwendet wird, sollte der watch disabled werden!
    // ACHTUNG: Bei 2) ist das v-model "number", nicht "string", wie es auch unter dem 3. Testfeld angezeigt wird (typeOf)
    // ACHTUNG: Bei 2) wird das eigentliche v-model ja ersetzt durch eine computed-Funktion. Diese Variante eignet sich daher NICHT zum späteren
    //          Abspeichern des Wertes!
    /*
    nullNiveau: async function(value) {
      console.log("In watch für nullNiveau - value: ", value);
      // ACHTUNG: Der Typ des v-models ist anfangs Number und ändert sich nach der ersten Eingabe von Number nach String!!!
      // Daher müssen beide Fälle hier behandelt werden:
      // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
      if (typeof this.nullNiveau === "string") {
        console.log("nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number");
        let number = this.decimalHandling.convertDecimalStringToNumber(this.nullNiveau);
        console.log("number aus Konvertierung, vor Addition von NHN-Testwert: ", number);
        // console.log("typeof(number): ", typeof(number))
        number = number + 250.0; // ACHTUNG: Manchmal Rundungsfehler!
        // number = Math.round(number *100) / 100
        // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
        console.log("number nach Addition von NHN-Testwert, vor Rückkonvertierung nach Dezimalstring: ", number);
        // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als Number, aber
        // dieser wird leider NICHT durch v-money formatiert!
        // this.nhnNiveau = number;
        // Daher mit Custom Funktion wieder in Dezimalstring rückkonvertieren, wie es VMoney intern auch macht:
        this.nhnNiveau = this.decimalHandling.convertNumberToDecimalString(number, 2, ",", ".");
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log("Aktualisiertes nhnNiveau nach Rückkonvertierung in Dezimalstring in watch: ", this.nhnNiveau);
        //
        // Alternativer Fehlversuch mit Rückkonvertierung nach String
        // console.log("typeof(number): ", typeof(number))
        // this.nhnNiveau = number.toString()
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        // console.log("Adjusted nhnNiveau: ", this.nhnNiveau)
        // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als String, aber
        // dieser wird leider auch NICHT durch v-money formatiert!
        // Man muss also die durch VMoney durchgeführte Formatierung hier manuell per Funktion machen!
        // Obige Funktion convertNumberToDecimalString() macht das, es ist die Umkehrfunktion von convertDecimalStringToNumber()
      } else {
        // type "number", kommt am Anfang vor per Tests!!!
        console.log("nullNiveau hat Typ Number, vor direkter Addition von NHN-Testwert");
        let number = this.nullNiveau + 250.0;
        number = Math.round(number * 100) / 100;
        // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
        this.nhnNiveau = this.decimalHandling.convertNumberToDecimalString(number, 2, ",", ".");
        // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
        console.log("Aktualisiertes nhNiveau nach Konvertierung in Dezimalstring in watch: ", this.nhnNiveau);
      }
    },
    */

    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // Watch-Funktionen für Test von QInput-Feldern für Dezimalzahlen:

    // Hier zum Test 2 watch-Funktionen, die "kreuzweise" 0.0 in NHN-Werte umrechnen
    // Diese dürfen jedoch nicht gleichzeitig aktiv sein, sonst gibt es merkwürdige Effekte (Rekursionen, Typ von
    // testDezimalWertFuerNiveau00 ist plötzlich ebenfalsl Number statt String, Fehler "splitPositiveDecimalNumber.split
    // is not a function" im Log.
    // SCHLUSSFOLGERUNG:
    // Im produktiven Einsatz sollten, um solche Interferenzen zu vermeiden, Änderungen nur auf den 0.0-Werten erfolgen. Die paarigen
    // NHN-Werte sollten per computed-Funktion (2. q-input in obigem Test) oder eventuell auch per watch (3. q-input in obigem Test) aktualisiert werden,
    // aber die Eingabe dort sollte in beiden Varianten disabled sein auf diesen q-inputs, sonst kommt es zu obigen Interferenzen.
    // ACHTUNG: Ob ein watch auf Array-Werten (im Array profilModelXYZ) so einfach möglich ist, wäre zu untersuchen.
    // Computed-Funktionen auf diesen Feldern im Array müssten jedoch einfach möglich sein - die jeweils paarigen
    // 0.0/NHN-Niveaus werden dabei jeweils paarig als kennWert1/2 in einem Kennwertepaar abgelegt.
    // Eventuell könnte man sich als Ausbaustufe noch einen "großen roten" Umschalter überlegen, mit dem die Eingabe dann auf die NHN-Werte
    // umgeschaltet würde mit paariger Aktualisierung der zugehörigen 0.0-Werte.
    testDezimalWertFuerNiveau00: async function(value) {
      //------------------------------------------------------------------------------------------------------------------------------------------------
      // Watch-Funktion auf testDezimalWertFuerNiveau00
      // value ist der neue Wert - offenbar ist dieser String, daher muss er konvertiert werden!
      // Aktualisiert damit testDezimalWertFuerNiveauNHN (mit testDezimalWertFuerNiveauEingang als Nullniveau)
      console.log("In watch für testDezimalWertFuerNiveau00 - value: ", value);
      const number = Number(value);
      console.log("Number(value): ", number);
      this.testDezimalWertFuerNiveauNHN =
        this.testDezimalWertFuerNiveauEingang + number;
    }

    // Disabled - siehe Kommentare oben:
    /*
    testDezimalWertFuerNiveauNHN: async function (value) {
      //------------------------------------------------------------------------------------------------------------------------------------------------
      // Watch-Funktion auf testDezimalWertFuerNiveauNHN
      // value ist der neue Wert - offenbar ist dieser String, daher muss er konvertiert werden!
      // Aktualisiert damit testDezimalWertFuerNiveau00 (mit testDezimalWertFuerNiveauEingang als Nullniveau)
      console.log("In watch für testDezimalWertFuerNiveauNHN - value: ", value);
      const number = Number(value);
      console.log("Number(value): ", number)
      this.testDezimalWertFuerNiveau00 = number - this.testDezimalWertFuerNiveauEingang
    }
    */
  },

  //***============================================================================================================================
  mounted: async function() {
    console.log("In mounted von verwaltung.vue");
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
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU - #354: Für Tests mit Agenda, Listener für Web Sockets - Client hört damit auf Event "agendaTestJobComplete" vom Server:
    this.$socket.on("agendaTestJobComplete", function(data) {
      // "agendaTestJobComplete" ist ein Socket Event, kein Room!
      console.log(
        "Socket-Nachricht empfangen vom Backend - Agenda Job completed"
      );
      console.log("data: ", data); // In data.id steckt die id aus Agenda am Backend, die als Bezeichnung vom Server beim emit Socket für
      // den client-spezifischen Room für genau diesen Agenda Job verwendet wird
      // Im weiteren Ausbau können hier weiter Daten kommen, z.B. ob Job auf Heroku von Agenda erfolgreich oder mit Fehler completed wurde
      // Die Auslagerung in Agenda Jobs dient der Vermeidung von H12/H13 Timeout Fehlern, die auf Heroku automatisch nach 30 Sekunden ausgelöst werden.
      // Hier soll im Gefolge dann z.B. ein Refresh Event (z.B. in baueinheiten.vue, baustoffe.vue oder datenaustausch.vue) ausgelöst werden, z.B.
      // nach Verschieben von Zweigen in den Bäumen, oder nach Import
      globalStore.showBenutzerNachricht(
        BenutzerNachrichten.DEFAULT_ERFOLGSNACHRICHT
      ); // Nochmals grüne Erfolgsmeldung, kann auf Heroku (kein Browser Log) zur Verifikation, dass die Socket-Meldung angekommen ist, verwendet werden
    });
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Ermittlung der Wurzel des Baustoffbaums für Tests des Lesens gefilterter Baustoffe:
    console.log("Lade Wurzel des Baustoffbaums für Testzwecke");
    let apiRoute = process.env.API + "/Baustoffe/Wurzel";
    this.$axios
      .get(apiRoute)
      .then(response => {
        // console.log("response.data: ");
        // console.log(response.data);
        this.baustoffIdFuerFilterungBaustoffe = response.data._id; // Setze Id des Wurzelknotens des Baustoffbaums für das Eingabefeld in Test Area 3
        // (kann ggf. vom Benutzer angepasst werden)
        console.log("id der Wurzel des Baustoffbaums: ", response.data._id);
      })
      .catch(error => {
        // NEU: Error Handling mit .catch
        console.log(
          "Error bei Lesen der Wurzel des Baustoffbaums - error: ",
          error
        );
      });
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Initialisierung für Tests von Dezimalzahlfeldern mit VueAutoNumeric:
    // Per this.$set Update von istWertObject mit Wert aus sollWertObject
    console.log(
      "Initialisiere istWertObject.kennWert1 aus sollWertObject.kennWert1"
    );
    this.$set(this.istWertObject, "kennWert1", this.sollWertObject.kennWert1);
    // ACHTUNG: Diese Initialisierung sollte in Produktion nur erfolgen, wenn das Feld für den Istwert null ist -
    //          ist es ungleich null, wurde es vom Benutzer vorher bereits absichtlich einmal verändert und abgespeichert!
    //          Dieser Wert muss dann erhalten bleiben!

    //--------------------------------------------------------------------------------------------------------------------------
    // Benutzer laden für Tab "Benutzer":
    console.log("process.env.API: ", process.env.API);
    this.$axios
      .get(process.env.API + "/Benutzer")
      .then(doc => {
        console.log("Alle Benutzer - doc:", doc);
        this.alleBenutzer = doc.data;
      })
      .catch(error => {
        console.log("Fehler beim Lesen aller Benutzer: ", error);
      });
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Initialisierung für Test von Vue Diagram Editor:
    // this.initDiagramEditor(); // Funktioniert hier nicht, wegen Timing Problement mit der Initialisierung von $refs
    // Daher verlagert nach initialisiereAusgewaehltesTabVerwaltung()
    // Siehe Kommentare in initDiagramEditor()

    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Initialisierung für Test von Filestack:
    this.filestackClient = filestack.init(filestackApiKey);
    //--------------------------------------------------------------------------------------------------------------------------
    // NEU: Initialisierung für Test von OneDrive:
    this.oneDriveClient = oneDrive;
    // Keine weitere Initialisierung notwendig per https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/open-file?view=odsp-graph-online
  } // /mounted:
}; // /exports
</script>
