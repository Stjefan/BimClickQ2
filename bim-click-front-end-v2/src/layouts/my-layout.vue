<template>
  <q-layout view="hHh LpR fff">
    <!-- -->
    <!-- ACHTUNG: "LpR" ist zwingend notwendig, damit die Drawers und die Main Page jeweils eigene Scrollbars haben!!!           -->
    <!--          Die Scrollbars werden nur bei Bedarf angezeigt, wenn die Informationen tatsächlich nicht in das Window passen. -->
    <!--          Bei "lpR" (ursprüngliches Setting) gibt es nur eine Scrollbar für die Main Page (rechts),                      -->
    <!--          die (bei Bedarf) gemeinsam den linken Drawer und die Main Page scrolled!!!                                     -->
    <!-- Ob man dabei "p" oder "P" in der Mitte von "LpR" angibt, ist ohne Bedeutung - siehe https://quasar.dev/layout-builder   -->
    <!-- ======================================================================================================================= -->
    <!-- TODO: :reveal-offset is aktuell auf "10" zum Ausprobieren, Default ist "250"                                            -->
    <!-- NEU: Tipp von https://forum.quasar-framework.org/topic/8026/non-sticky-q-footer                                         -->
    <!-- NEU: view="hHh LpR fff" am q-layout, statt                                                                              -->
    <!-- ALT: view="hHh LpR fFf"                                                                                                 -->
    <!-- Dies lässt den Footer außer am Anfang verschwinden (dadurch mehr Platz). Gleichzeit "reveal" Prop am q-footer entfernt! -->
    <!-- ======================================================================================================================= -->
    <!-- Alternatives Branding: -->
    <!-- class="q-pa-xs bg-grey-4 text-black" -->
    <!-- NEU - #385: Farbschema einstellbar, wird reaktiv im global Store gehalten und kann in einstellungen.vue geändert werden -->
    <!-- Default ist "blau" -->
    <!-- ALT: 'bordered' sieht blöd aus bei bg-grey-4, daher diese Prop aktuell am q-header und q-footer entfernt! -->
    <q-header
      elevated
      :class="
        localStore.state.einstellungenBenutzer.farbSchema === 'grau'
          ? 'q-pa-xs bg-grey-4 text-black'
          : 'q-pa-xs bg-primary text-white'
      "
      reveal
      :reveal-offset="8"
    >
      <!-- Default ist "250" -->
      <!--
        <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        <img src="statics/logos/icons/lego.svg" />
      </q-avatar>
      -->
      <!-- ALT: style="max-height: 145px; max-width: 800px" -->
      <!-- NEU: QButton für Hamburger-Menü auf kleinen Bildschirmen: -->
      <!-- NEU: size="sm" statt "md" - für Smartphones -->
      <q-btn
        v-if="!$q.screen.gt.sm"
        size="sm"
        class="float-left"
        dense
        flat
        icon="menu"
        @click="hamburger = !hamburger"
      >
        <q-tooltip
          :delay="1000"
          :offset="[0, -5]"
          max-width="600px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          Hauptmenü öffnen/schließen
        </q-tooltip>
      </q-btn>
      <q-img
        v-if="$q.screen.gt.sm"
        :src="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? '../statics/logos/kurz-und-fischer-logo-linker-teil-gruen-wie-bim-click-logo.png'
            : '../statics/logos/kurz-und-fischer-logo-linker-teil.png'
        "
        style="max-height: 27%; max-width: 27%"
        @click="
          right = false;
          left = false;
          navigateToDefaultRoute();
        "
      >
        <q-tooltip
          :delay="2000"
          anchor="bottom left"
          :offset="[20, 0]"
          max-width="300px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          🏠 Take me home 😉
          <!-- <span>&#127968;</span> -->
          <!-- <span>&#8962;</span> -->
          <!-- 😉 -->
          <!-- Siehe auch https://www.w3schools.com/charsets/ref_emoji.asp und weitere Seiten dort -->
        </q-tooltip>
      </q-img>
      <!-- ACHTUNG: "max-height: 47%" hier weggelassen, für PWA auf Smartphones -->
      <q-img
        v-else
        :src="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? 'statics/logos/kurz-und-fischer-logo-linker-teil-gruen-wie-bim-click-logo.png'
            : 'statics/logos/kurz-und-fischer-logo-linker-teil.png'
        "
        style="max-width: 47%"
        @click="
          right = false;
          left = false;
          navigateToDefaultRoute();
        "
      >
        <q-tooltip
          :delay="2000"
          anchor="bottom left"
          :offset="[20, 0]"
          max-width="300px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          🏠 Take me home 😉
          <!-- <span>&#127968;</span> -->
          <!-- <span>&#8962;</span> -->
          <!-- 😉 -->
          <!-- Siehe auch https://www.w3schools.com/charsets/ref_emoji.asp und weitere Seiten dort -->
        </q-tooltip>
      </q-img>
      <!-- class="float-right" -->
      <q-img
        v-if="$q.screen.gt.sm"
        :src="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? 'statics/logos/kurz-und-fischer-logo-rechter-teil-neu-gruen-wie-bim-click-logo.png'
            : 'statics/logos/kurz-und-fischer-logo-rechter-teil.png'
        "
        style="max-height: 30%; max-width: 30%"
      />
      <!-- <div class="float-right on-left text-subtitle1 text-weight-regular"> -->
      <!-- TODO: Sehr groß auf kleinen Smartphone Displays!!! -->
      <div class="float-right on-left text-subtitle2 text-weight-regular">
        <!-- Kleiner! -->
        <!--
        BIM.
        <div class="text-italic">
          click
        </div>
        V1.0.16
        -->
        <!-- Führt zu Zeilenumbruch! -->
        BIM.<em>click</em> v1.0.67
        <q-tooltip
          :delay="100"
          anchor="bottom right"
          :offset="[20, 0]"
          max-width="600px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          <b class="text-white text-center">
            Neu in BIM.click Version 1.0.67:
          </b>
          <ul>
            <li>Funktion: Musterhafte Baueinheiten mit optionaler Gültigkeit für bestimmte Teile von Bauvorhaben bzw. für bestimmte Nutzungsprofile von Räumen und benachbarten Räumen</li>
            <li>Struktur: Überarbeitete zweistufige fachliche Kategorien/Rubriken für Baueigenschaften</li>
            <li>Komfort: Nach Neuladen oder Neuanmeldung wird in den Bäumen automatisch wieder der bisher/vorher ausgewählte Zweig angezeigt</li>
            <li>Komfort: Anzeige von Tooltips für Baustoffe im Baustoffbaum (sofern angelegt)</li>
            <li>Funktion: Auf die neue fachliche Gliederung des Baustoffbaums abgestimmte neue Untertabstruktur in "Baustoffe" > "Fachliche Daten"</li>
            <li>Doku: FAQs in der Online-Dokumentation</li>
            <li>Inhalte: Neue fachliche Gliederung des Baustoffbaums</li>
            <li>Funktion: Neues layoutgesteuertes generisches Filterprofilformular zum Filtern in Baustoffen</li>
            <li>Funktion: Neues Profilformular für Trennbauteile ("Baueinheit > Boden")</li>
            <li>Funktion: Neue Schaltflächen in Profilformularen im Baustoffbaum, um Werteeingabe an Verzweigungsknoten freizuschalten, und um undefinierte Felder orangefarbig zu kennzeichnen, die an Kindknoten definierte Werte haben (um versehentliches Überschreiben zu verhindern)</li>
            <li>Inhalte: Markdown-Vorlagen für Beschreibungen</li>
            <li>Funktion: Links zu Dachflächensolarpotenzialkarte und Wärme- und Kältenetzen</li>
            <li>Komfort: Umschaltbares Farbschema in "Einstellungen"</li>
            <li>Funktion: OneDrive-Integration in "Bauinformationen"</li>
            <li>
              Performance: Asynchrone Ausführung von langlaufenden Jobs am Server
            </li>
            Funktion: Verbessertes layoutgesteuertes generisches Profilformular zur Anzeige von
            fachlichen Daten von Baustoffen und Baueinheiten
            <li>
              Performance: Selektive Anlage von Baueigenschaften nur im Baustoff- oder nur im
              Bauvorhabenbaum
            </li>
            <li>
              Inhalte: Umbenennung aller Baueigenschaften und Baueigenschaftsprofile nach
              aktuellem Bezeichnungsschema
            </li>
            <li>
              Funktion: Verbesserte Anzeige auf mobilen Geräten (PWA-Modus mit
              Hamburger-Menü links oben)
            </li>
            <li>Inhalte: Baueigenschaftsprofile für Baustoffe</li>
            <li>Funktion: Kontextmenüs für Profilaktivierung im Baustoffbaum</li>
            <li>Funktion: Formulare für fachliche Daten von Baustoffen</li>
            <li>Funktion: Filtern in zugeordneten Baustoffen an Baueinheiten</li>
            <li>Funktion: Überarbeitung von Bodenaufbau und Schichten</li>
            <li>
              Funktion: Excel-Ausgabe von Bodenaufbau- und Schichtinformationen in
              Bauteilkatalog
            </li>
            <li>
              Funktion: Felder für Schnee-, Wind- und Erdbebenlasten in 'Standort' >
              'Umwelt'
            </li>
            <li>
              Hinweis: Vorhandene Bodenaufbauten, Schichten und Standorte erfordern eine
              Deaktivierung und Neuaktivierung ihrer Profile zur Nutzung
            </li>
          </ul>
        </q-tooltip>
      </div>
      <!-- Die folgende QToolbar-Zeile für das Inhaltsverzeichnis Doku und die Hilfe in die QToolbar-Zeile darunter integriert, um vertikalen Platz zu sparen -->
      <!--
      <q-toolbar>
        <q-btn
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          class="float-left"
          dense
          flat
          round
          icon="menu_book"
          @click="left = !left"
        >
          <q-tooltip
            v-if="left === false"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation schließen
          </q-tooltip>
        </q-btn>
        -->
      <!-- <q-separator /> -->
      <!-- Erzeugt unerwünschten, dünnen, horizontalen Strich, disabled  zugunsten von leerem q-toolbar-title: -->
      <!--
        <q-toolbar-title />
        <q-btn
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          class="float-right"
          dense
          flat
          round
          icon="contact_support"
          @click="right = !right"
        >
          <q-tooltip
            v-if="right === false"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe schließen
          </q-tooltip>
        </q-btn>
      </q-toolbar>
      -->
      <!-- Hauptmenü aus q-route-tabs: mit Routes: -->
      <!-- class="glossy" -->
      <!-- ALT: -->
      <!-- ALTERNATIVE - verworfen: -->
      <!--
      <q-tabs mobile-arrows
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="grey-1"
        dense
      >
      -->
      <!-- ========================================================================================================================================== -->
      <!-- ACHTUNG: Es ist schwierig, die Fontgröße in den QTabs zu ändern -->
      <!-- Versuche mit CSS content-class="my-menu-font" führten zu keinem Ergebnis! -->
      <!-- Am Besten funktioniert bisher content-class="text-h7" für horizontale Kondensierung des Textes, damit die Menüleiste am Laptop mit Zoomfaktor -->
      <!-- 80% nicht rechts über den Rand läuft und dann immer ein Pfeil angezeigt wird, um zum Anmeldemenü zu gelangen -->
      <!-- ========================================================================================================================================== -->
      <!-- NEU: Tableiste nur noch anzeigen auf großen Bildschirmen (andernfalls wird oben Hamburger-Menü angezeigt) -->
      <q-tabs
        mobile-arrows
        v-if="$q.screen.gt.sm"
        align="left"
        active-color="primary"
        active-bg-color="white inset-shadow"
        indicator-color="primary"
        content-class="text-h7"
        dense
      >
        <q-btn
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          class="float-left"
          dense
          flat
          round
          icon="menu_book"
          @click="left = !left"
        >
          <q-tooltip
            v-if="left === false"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation schließen
          </q-tooltip>
        </q-btn>
        <!-- NEU: Enablen/disablen der Route in Abhängigkeit davon, ob Benutzer angemeldet/abgemeldet ist -->
        <q-route-tab
          to="/Bauvorhaben"
          label="Bauvorhaben"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Planung von Bauprojekten mit Vorlagen
          </q-tooltip>
        </q-route-tab>
        <!-- NEU: Baustoffe (alt) ausblenden -->
        <!--
        <q-route-tab
          :to="{ name: 'Baustoffe' }"
          label="Baustoffe (alt)"
          no-caps
        />
        -->
        <q-route-tab
          to="/Baustoffe"
          label="Baustoffe"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller Baustoffe, die bei der Planung verwendet werden
            können
          </q-tooltip>
        </q-route-tab>
        <!-- ALT: ier stand, warum auch immer: -->
        <!-- :to="{ name: 'Bauinformationen' }" -->
        <!-- NEU: Tab weiter nach links verschoben, da von Nicht-Administratoren häufiger gebraucht als Baueigenchaften -->
        <q-route-tab
          to="/Bauinformationen"
          label="Bauinformationen"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller Dokumente und Links, die für die Planung relevant
            sind
          </q-tooltip>
        </q-route-tab>
        <!-- NEU: Die folgende Page wurde hier per q-route-tab aus der Haupttableiste in my-layout.vue bzw. front-end-server-routes angesprochen. -->
        <!-- Jetzt eine Tab-Ebene tiefer verlagert, um die Haupttableiste zu verschlanken. -->
        <!-- Hier das q-route-tab daher disabled: -->
        <!--
        <q-route-tab
          to="/Bauinformationsprofile"
          label="Bauinformationsprofile"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
        -->
        <!-- --------------------------------------------------------------------------------- -->
        <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
        <!-- --------------------------------------------------------------------------------- -->
        <!--
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung zusammengehöriger Dokumente und Links
          </q-tooltip>
        </q-route-tab>
        -->
        <q-route-tab
          to="/Baueigenschaften"
          label="Baueigenschaften"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller fachlichen Eigenschaften, die in Bauvorhaben und
            Baustoffen verwendet werden
          </q-tooltip>
        </q-route-tab>
        <!-- NEU: Die folgende Page wurde hier per q-route-tab aus der Haupttableiste in my-layout.vue bzw. front-end-server-routes angesprochen. -->
        <!-- Jetzt eine Tab-Ebene tiefer verlagert, um die Haupttableiste zu verschlanken. -->
        <!-- Hier das q-route-tab daher disabled: -->
        <!--
          <q-route-tab
            to="/Baueigenschaftsprofile"
            label="Baueigenschaftsprofile"
            no-caps
            v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
            :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          >
          -->
        <!-- --------------------------------------------------------------------------------- -->
        <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
        <!-- --------------------------------------------------------------------------------- -->
        <!--
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung zusammengehöriger fachlicher Eigenschaften
          </q-tooltip>
        </q-route-tab>
        -->
        <!-- <q-route-tab to="/Baubestimmungen" label="Baubestimmungen" no-caps /> -->
        <!-- Nächstes Tab vorübergehend disabled wegen Platzmangel - TODO XXXXXX -->
        <!--
        <q-route-tab
          to="/Auswertungen"
          label="Auswertungen"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
        -->
        <!-- --------------------------------------------------------------------------------- -->
        <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
        <!-- --------------------------------------------------------------------------------- -->
        <!--
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Auswertungen und Berichte
          </q-tooltip>
        </q-route-tab>
        -->
        <q-route-tab
          to="/Datenaustausch"
          label="Datenaustausch"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Import und Export von Daten in verschiedenen Formaten
          </q-tooltip>
        </q-route-tab>
        <q-route-tab
          to="/Einstellungen"
          label="Einstellungen"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Benutzerspezifische Einstellungen
          </q-tooltip>
        </q-route-tab>
        <!-- ALT: <q-route-tab to="/Hilfe" label="Hilfe" no-caps /> -->
        <!-- Für Scrolling Tests ohne named Route mit Prop, entsprechende Änderung auch in routes.js nötig -->
        <!-- NEU: label="Hilfe" umbenannt in label="Dokumentation", da die Kontexthilfe im rechten Drawer künftig "Hilfe" heißen soll -->
        <q-route-tab
          :to="{
            name: 'Dokumentation',
            params: { docTopicElementIdToScrollTo: this.selectedDocTopicId }
          }"
          label="Dokumentation"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Dokumentation mit Anleitungen (links wird ein
            Inhaltsverzeichnis zur Navigation angezeigt)
          </q-tooltip>
        </q-route-tab>
        <!-- HINWEISE: -->
        <!-- Ursprünglicher Template Code hier: <q-route-tab to="/Dokumentation/1" label="Dokumentation" /> -->
        <!-- Das bewirkte, dass bei erneutem Klick auf das Tab Dokumentation im Menü oben immer wieder Dokumentation/1 aufgerufen wird-->
        <!-- Daher andere Lösung: Die im Drawer selektierte id in data() in Variable selectedDocTopicId gespeichert. -->
        <!-- Dann hier dynamisch die richtige Route erzeugen auf Basis dieser id-->
        <!-- Siehe https://router.vuejs.org/api/#v-slot-api-3-1-0 -->
        <!-- Siehe auch https://forum.quasar-framework.org/topic/986/qroutetab-appending-routes-correctly für q-route-tab Parameter -->
        <!-- Siehe auch https://forum.quasar-framework.org/topic/707/problem-with-qtabs-routing für q-route-tab Parameter: -->
        <!-- Für Parameterübergabe der id muss es eine named Route sein, siehe https://router.vuejs.org/guide/essentials/named-routes.html -->
        <!-- Syntax für named Route: :to="{ name: 'user', params: { userId: 123 }}">User  -->
        <!-- Dokumentation ist in routes.js schon eine named Route mit dem Namen "Dokumentation" und dem Parameter docTopicElementIdToScrollTo -->
        <!-- Also: :to="{ name: 'Dokumentation', params: { docTopicElementIdToScrollTo: 123 }}">Dokumentation -->
        <!-- Statt 123 ist die im Drawer selektierte id aus data zu nehmen, this.selectedDocTopicId -->
        <!-- Also: :to="{ name: 'Dokumentation', params: { docTopicElementIdToScrollTo: this.selectedDocTopicId }}">Dokumentation -->
        <!-- ACHTUNG: Syntax in diesem Fall ist :to (Vue-Router Befehl), nicht to!!! -->
        <!-- ACHTUNG: @click="$refs.leftDrawer.open()" funktioniert hier an q-route-tab nicht, wird ignoriert. Vermutlich nicht clickable!!!-->
        <!-- ACHTUNG: @click="openLeftDrawer()" mit Methode openLeftDrawer() unten funktioniert genauso wenig, wird per Log auch nie gerufen!!!-->
        <!-- Dieselben Calls mit @input werden ebenfalls ignoriert -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- NEU: Tab für Verwaltung, nur für Admninistratoren sichtbar: -->
        <q-route-tab
          v-if="
            localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
              'Administrator'
          "
          to="/Verwaltung"
          label="Verwaltung"
          no-caps
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Administration des Systems
          </q-tooltip>
        </q-route-tab>
        <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- NEU Dropdown Button für Benutzeraktionen (Registrierung/Login/Logoout): -->
        <q-space />
        <!-- NEU: Um Platz zu schaffen zwischen den Tabs und dem q-btn-dropdown -->
        <!-- <div class="float-right"> -->
        <!-- ALT: Separate class="float-right" sowohl an q-btn-dropdown und an q-btn -->
        <!-- NEU: Nach Quasar Upgrade auf 1.15.2 funktionierten diese nicht mehr - diese beiden Controls -->
        <!-- waren nicht mehr ganz rechts, sondern rechts von den Tabs -->
        <!-- Gefixt mit obigem <div class="float-right"> ... </div> um beide herum, PLUS -->
        <!-- obigem <q-space />. Alternative: class"absolute-right" - bringt jedoch neues Problem, -->
        <!-- dass die blaue Tableiste hinter dem q-btn-dropdown bei Abmeldung verschwindet! -->
        <!-- Die neue Kombination mit <q-space /> funktioniert. -->
        <!-- Nachteil: Auf Smartphone wird die Toolbar warum auch immer dann höher, was unschön ist -->
        <!-- Mit neuester Quasar Version ist dieses Problem weg, daher wieder die alte Lösung enabled! -->
        <q-btn-dropdown
          class="float-right"
          icon="person"
          label="An-/Abmelden"
          dense
          glossy
          color="positive"
          no-caps
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen Dropdown-Button                                       -->
          <!-- TODO: Funktioniert erst nach Aufklappen!                                          -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="600px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Benutzeranmeldung, -abmeldung und -registrierung
          </q-tooltip>
          <!-- Forms für Registrierung/Login/Logout -->
          <!-- DONE: Das folgende <form> in der Größe optimiert mittels style="min-width:650px" -->
          <!-- Diese Breite ist erforderlich, um die Hints anzuzeigen unter den Feldern! -->
          <!-- Hier bisher keine q-card verwendet! -->
          <q-form class="q-pa-sm background-color-grey-1">
            <div class="row full-width q-col-gutter-xs q-pa-xs">
              <div class="col-9">
                <!-- NEU: lazy-rules und v-bind:rules mit Regel vorNameErforderlich, plus ref, mit denen Eingabe Vorname erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.vorName"
                  label="Vorname (nur bei Neuregistrierung)"
                  hint="Vorname eingeben (bei Neuregistrierung)"
                  hide-hint
                  lazy-rules
                  v-bind:rules="vorNameErforderlich"
                  ref="vorNameFeld"
                  autocomplete="given-name"
                />
                <!-- NEU: lazy-rules und v-bind:rules mit Regel nachNameErforderlich, plus ref, mit denen Eingabe Nachname erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.nachName"
                  label="Nachname (nur bei Neuregistrierung)"
                  hint="Nachname eingeben (bei Neuregistrierung)"
                  hide-hint
                  lazy-rules
                  v-bind:rules="nachNameErforderlich"
                  ref="nachNameFeld"
                  autocomplete="family-name"
                />
                <!-- Hinweis: data-cy Prop wird vom Test Automation Tool Cypress benutzt! -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel eMailValidierung, plus ref, mit denen Eingabe eMail erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- TODO XXXXXX #285, type="submit" in Verbindung mit @submit am q-form und type="email" am q-input - getestet, hat -->
                <!-- aber keine Auswirkung! -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  data-cy="e-mail"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.eMail"
                  label="E-Mail-Adresse (Benutzerkennung)"
                  hint="E-Mail-Adresse, z.B. bob.baumeister@bob-bau.de"
                  lazy-rules
                  v-bind:rules="eMailValidierung"
                  ref="eMailFeld"
                  autocomplete="username"
                />
                <!-- NEU: kennWort-Input-Feld gemäß https://quasar.dev/vue-components/input#Input-types: -->
                <!-- Hinweis: data-cy Prop wird vom Test Automation Tool Cypress benutzt! -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel kennWortValidierung, plus ref, mit denen Eingabe Kennwort erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Versuch, natives Attribut "autocomplete" am input-Feld zu platzieren: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <!-- Problem ist in diesem Form allerdings, dass selbes Feld für current-password (bei Login) und new-password (bei Registrierung) -->
                <!-- benutzt wird, daher funktioniert es für dieses Feld nicht richtig - aktuell nur autocomplete alleine genommen -->
                <q-input
                  data-cy="kennWort"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.kennWort"
                  label="Kennwort"
                  hint="Kennwort eingeben (Anzeige per Klick auf Icon)"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  v-bind:rules="kennWortValidierung"
                  ref="kennWortFeld"
                  autocomplete="current-password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <!-- NEU: 2. Kennwortfeld bei Registrierung -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel kennWoerterIdentisch, plus ref, mit denen geprüft wird, ob die beiden Kennwörter identisch sind -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- ACHTUNG: Das v-model kennWortBestaetigung hier ist in data(), NICHT in benutzer!!! -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="kennWortBestaetigung"
                  label="Kennwortwiederholung (bei Neuregistrierung)"
                  hint="Kennwort bei Neuregistrierung nochmals eingeben (Anzeige per Klick auf Icon)"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  v-bind:rules="kennWoerterIdentisch"
                  ref="kennWortBestaetigungFeld"
                  autocomplete="new-password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <br />
                <!-- Platz für Hint schaffen -->
              </div>
              <!-- ACHTUNG: vertical funktioniert, warum auch immer, hier nicht, daher disabled -->
              <!--
              <div class="col-1">
                <q-separator vertical inset />
              </div>
              -->
              <div class="col-3 text-center">
                <q-avatar size="82px">
                  <img src="statics/images/avatar-bob.png" />
                </q-avatar>
                <!-- NEU: Im Rahmen von #285 e) aus Security-Gründen die Anzeige des Vor- und Nachnamens unter dem Bild rechts -->
                <!-- von benutzer.vorName/nachName in eigene Variablen anzeigeVorName/NachName verlagert -->
                <div class="text-subtitle2 q-pa-sm">
                  {{ anzeigeVorName }}
                  {{ anzeigeNachName }}
                </div>
                <!-- NEU: Parameter timeOut (hier false) an abmeldenBenutzer(timeOut) - steuert, welche Meldung ausgegeben wird -->
                <q-btn
                  color="deep-orange"
                  label="Abmelden"
                  glossy
                  class="stretch full-width"
                  v-close-popup
                  no-caps
                  @click="abmeldenBenutzer(false)"
                  :disable="
                    localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
                  "
                />
              </div>
            </div>
            <!-- <br /> -->
            <!-- Platz für Hint, nicht nötig mit Breite 650px -->
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier kein v-close-popup, sonst wird nach dem ersten Klick das Dropdown geschlossen! -->
              <!-- NEU: Computed-Funktion invalidFieldsRegistrierung wertet Validität aller Eingabefelder bei
                          Neuregistrierung aus und enabled Button nur, wenn alle Felder valide sind -->
              <!-- Zusätzlich Quasar Rules an den einzelnen Feldern, die ggf. Meldungen ausgeben bei invaliden Eingaben -->
              <!-- TODO XXXXXX #285, type="submit" in Verbindung mit @submit am q-form und type="email" am q-input -->
              <!-- NEU: Disablen, wenn Registrierung pending ist: -->
              <!-- NEU: Auch disablen, wenn Eingabefelder invalide sind (E-Mail-Adresse und Kennwort) -->
              <div class="col-3">
                <q-btn
                  color="positive"
                  label="Anmelden"
                  class="col-2 stretch full-width"
                  style="height: 100%"
                  glossy
                  v-close-popup
                  no-caps
                  @click="anmeldenBenutzer()"
                  :disable="
                    !localStore.state.anmeldeDatenBenutzer
                      .istAbgemeldetBenutzer ||
                      registrierungPending ||
                      invalidFieldsAnmeldung
                  "
                />
              </div>
              <div class="col-3">
                <q-btn
                  :disable="
                    computeDisableRegistrierenBenutzer ||
                      invalidFieldsRegistrierung
                  "
                  color="accent"
                  :label="!registrierungPending ? 'Registrieren' : 'Absenden'"
                  class="stretch full-width"
                  style="height: 100%"
                  glossy
                  no-caps
                  @click="
                    !registrierungPending
                      ? (registrierungPending = true)
                      : registrierenBenutzer()
                  "
                />
              </div>
              <!-- NEU: Disablen, wenn Registrierung pending ist: -->
              <div class="col-6">
                <q-btn
                  :disable="registrierungPending"
                  color="negative"
                  label="Kennwort vergessen"
                  class="stretch full-width"
                  glossy
                  style="height: 100%"
                  v-close-popup
                  no-caps
                  @click="kennWortVergessenBenutzer()"
                />
              </div>
            </div>
          </q-form>
          <!-- -->
        </q-btn-dropdown>
        <q-btn
          class="float-right"
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          dense
          flat
          round
          icon="contact_support"
          @click="right = !right"
        >
          <q-tooltip
            v-if="right === false"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe schließen
          </q-tooltip>
        </q-btn>
        <!-- </div> -->
      </q-tabs>
    </q-header>
    <!-- ============================================================================================================== -->
    <!-- Linker Drawer für Inhaltsverzeichnis Dokumentation: -->
    <!-- TODO XXXXXX #369: Scrolling in der Doku bei kleinen Bildschirmen funktioniert nicht, auch nicht mit :overlay="false" -->
    <!-- und auch nicht mit testweisem v-bind:overlay="{ false: !$q.screen.gt.sm }" -->
    <!-- Dies liegt wohl daran, dass der QPageContainer in der Mitte des QLayout keinen Fokus bekommt auf kleinen Bildschirmen, wenn der linke Drawer geöffnet ist -->
    <!-- Versuchte LÖSUNG: :breakpoint="500" UND :overlay="false" -->
    <!-- Dies öffnet den Drawer mit dem Doku-Inhalt auf großen Bildschirmen wie gewünscht NICHT im Overlay-Modus -->
    <!-- Auf kleinen Bildschirmen wird er jedoch (von Quasar?) im Overlay-Modus geöffnet, allerdings ist dann ein Scrollen möglich, da der Inhalt des -->
    <!-- QPageContainers mit der Doku Fokus behält, auch wenn der QDrawer mit dem Inhalt geöffnet ist. -->
    <!-- Leider funktioniert diese per Test nur beim Klein-Zoomen am Browser (ist insofern eine Verbesserung), nicht jedoch in der App auf dem Smartphone! -->
    <!-- Deshalb den gesamten q-drawer per v-if="$q.screen.gt.sm"/v-else dupliziert und am Desktop mit :overlay="false" bzw. auf Mobilgeräten mit anderen Props (behavior="desktop", anders ging es nicht) aufgesetzt. -->
    <!-- HINWEIS: Auf kleinen Bildschirmen kann der linke Drawer auch ohne Klick auf das im Hamburger-Menü befindliche, nicht sichtbare Close-Icon weggeswiped werden nach links -->
    <!-- ----------------------------------------------- -->
    <!-- q-drawer für Desktop mit :overlay="false":      -->
    <!-- v-if="$q.screen.gt.sm" -->
    <!-- Wieder disabled -->
    <!-- ALT: bordered am q-drawer - entfernt -->
    <q-drawer
      v-model="left"
      side="left"
      ref="leftDrawer"
      :width="localStore.state.widthLeftDrawer"
      :breakpoint="500"
      :overlay="false"
    >
      <div class="row full-width q-pa-sm q-gutter-x-xs bg-cyan-1">
        <q-slider
          v-model="localStore.state.widthLeftDrawer"
          :min="220"
          :max="320"
          color="teal-6"
          dense
        />
      </div>
      <!-- HINWEIS: :width='500' (Beispiel) erlaubt Veränderung der Breite des Drawers, könnte auch dynamisch über ein Model gesteuert werden! -->
      <!-- NEU: Versuchsweise hier separate q-scroll-area -->
      <!-- Damit lässt sich zwar der linke Drawer unabhängig von der Main Page scrollen, -->
      <!-- aber er scrolled trotzdem mit, wenn die Dokumentations-Seite zu einer id scrolled!!! -->
      <!-- Daher wieder auskommentiert, Lösung war "LPR" in view Properties von q-layout oben. -->
      <!-- <q-scroll-area ref="leftDrawerScrollArea" style="height: 1500px;"> -->
      <!-- <q-scroll-area ref="leftDrawerScrollArea" class="fit" -->
      <!-- -->
      <!-- BIM.click Dokumentationsverzeichnis folgt: -->
      <!-- Verschachtelte q-list auf einem v-Model für das dokumentationsVerzeichnis in data() -->
      <!-- Vorlage: Vue native "nested v-fors" Beispiel (mit 2 Leveln, mit $index und $parent.$index): -->
      <!--    https://codepen.io/blikblum/pen/ZQRRmm  -->
      <!-- Damit z.B. das zweite v-for geändert zu v-for="dokumentationsThemaEbene2 in dokumentationsThemaEbene1.children" -->
      <!-- Die v-fors dann noch alle verlagert von q-item in div Wrapper, -->
      <!-- sonst kommt es zu einem häßlichen Nesting der q-labels der drei Ebenen im Dokumentationsverzeichnis links im Drawer!!! -->

      <!-- Weitere v-for Optionen hier: -->
      <!-- Z.B. 2. Beispiel unter https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results  -->

      <!-- Alternative - den ganzen Array "flachklopfen" und mit einem einzigen v-for bearbeiten -->
      <!-- Siehe https://quasar.dev/vue-components/list-and-list-items - dort "Contact list" - lädt ebenfalls das Menü mit (einem) v-for aus data()-->
      <!-- Wenn der Array flach ist, müsste aber abhängig von der id der q-item ode q-expansion-item indent-level bestimmt werden -->
      <!-- D.h. diese müssten dann z.B. im Array mitgespeichert werden und von dort geholt werden als Parameter von indent-level! -->

      <!-- NEU: Weiterentwicklung des Dokumentationsverzeichnisses mit q-expansion-items: Siehe https://quasar.dev/vue-components/expansion-item -->
      <!-- Damit kann per expand-icon-toggle beim Klicken auf den kleinen Expand-Icon (Pfeil nach unten) nur der Expand ausgelöst werden -->
      <!-- Wenn man auf den Header daneben klicked, kann dann Router Link ausgelöst werden, unabhängig vom Expand State -->
      <!-- Beides kann auch zusammen ausgelöst werden. -->
      <!-- Siehe auch: https://forum.quasar-framework.org/topic/3403/solved-v1-q-expansion-item-open-tree-when-route-is-active/7 -->
      <!-- Dort Mix von q-expansion-items und q-items -->

      <!-- Zweck des Ganzen: Aufruf der Dokumentationsthemen im dokumentationsVerzeichnis (Array mit verschachtelten Unter-Arrays) mit Scroll in der Dokumentations-Komponente dorthin -->
      <!-- Erfolgt per Props-Übergabe der DOM id für jede Überschrift im Dokumentationsverzeichnis an die Dokumentations-Komponente, per -->
      <!-- 1) Vue Router-Befehl $router.replace in Verbindung mit Boolean Mode (d.h. prop: true) an der betreffenden Route in routes.js -->
      <!-- 2) NEU: Zusätzlich die selektierte id in selectedDocTopicId speichern, zur Weitergabe per Router Link in q-route-tab im Hauptmenü oben -->
      <!-- Beides in Funktion setRouteandId zusammengefasst -->

      <!-- NEU: q-list auf dokumentationsVerzeichnis mit 3 verschachtelten q-expansion-items -->
      <!-- ALT: q-list auf dokumentationsVerzeichnis mit 3 verschachtelten q-items (hier nur noch das dritte, innerste): -->
      <!--  <div
              v-for="dokumentationsThemaEbene3 in dokumentationsThemaEbene2.children"
              :key="dokumentationsThemaEbene3.id"
            >
              <q-item
               :inset-level="0.4"
               class="q-my-sm"
               clickable
               @click="setRouteAndId(dokumentationsThemaEbene3.id)"
               v-ripple
              >
               <q-item-section>
                 <q-item-label>{{ dokumentationsThemaEbene3.id }} {{ dokumentationsThemaEbene3.title }}</q-item-label>
               </q-item-section>
              </q-item>
      </div>-->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-teal-7">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="menu_book" size="24px" left />
          Inhaltsverzeichnis Dokumentation
        </div>
        <div
          v-for="dokumentationsThemaEbene1 in dokumentationsVerzeichnis"
          :key="dokumentationsThemaEbene1.id"
        >
          <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
          <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->

          <!-- PROBLEM (SOLVED): Nach dem Quasar Upgrade auf 1.1.7 funktionieren die q-expansion-items NICHT mehr korrekt -->
          <!-- Die Expansion funktioniert nicht mehr, das Scrolling auch nur manchmal! -->
          <!-- WEITERES PROBLEM (SOLVED): Es kommen außerdem Vue-Warnungen, z.B. -->
          <!--         vue-router.esm.js?8c4f:2051 Uncaught (in promise) NavigationDuplicated -->
          <!--         {_name: "NavigationDuplicated", name: "NavigationDuplicated", -->
          <!--         message: "Navigating to current location ("/Dokumentation/2") is not allowed" -->
          <!-- Diese Warnungen waren ein weiterer, unabhängiger Fehler, der auftritt, -->
          <!-- wenn 2-mal hintereinander dasselbe Dokumentationsthema angeklickt wird!!! -->
          <!-- Dieses Problem verschwand nach der Umstellung auf :to (siehe unten) -->
          <!-- WORKAROUND für das erste Problem: Wenn man @input="setRouteAndId(dokumentationsThemaEbene1.id)" im ersten Expansion Item -->
          <!-- temporär entfernt, funktioniert wenigstens die Expansion wieder, dafür das Scrolling nicht immer! -->
          <!-- Von Einfluss sind: -->
          <!--      - Die @input-Methoden: Lässt man diese auf den 2 oberen Dokumentationsverzeichnisebenen temporär weg, funktioniert -->
          <!--        die q-expansion-items einwandfrei, bis auf die 3. Ebene hinunter (z.B. Abschnitt 3.3.1)!!! -->
          <!--        Diese durch direktes Routing per :to ersetzt. -->
          <!--      - :to Property (siehe q-expansion-item API) ausprobieren, um neue Route auf ("/Dokumentation/" + id) zu setzen, statt den @input-Methoden -->
          <!--        D.h. auf der ersten Dokumentationsverzeichnisebene: :to="'/Dokumentation/' + dokumentationsThemaEbene1.id" -->
          <!--        Die Tests damit sind erfolgreich!!! -->
          <!--      - (@input könnte auch ein Boolean property :value setzen, damit sich das Expansion Item bei Klick öffnet? Siehe API -->
          <!--        Das scheint aber auf der zweiten Dokumentationsverzeichnisebene auch nicht notwendig zu sein, daher nicht weiterverfolgt) -->
          <!--      - WEITERES PROBLEM (SOLVED): Watch auf docTopicElementIdToScrollTo in Dokumentation funktioniert zunächst nicht, nur Mounted darauf! -->
          <!--        Dabei handelte es sich um ein weiteres Problem, das auftrat, sobald :key Property  -->
          <!--        in router-view unten gesetzt wurde. Diese :key Property entfernt. Siehe die Kommentare dazu unten bei router-view  -->
          <!--        sowie die Testergebnisse in Dokumentation.vue. -->
          <!--      - WEITERES PROBLEM (SOLVED): Bei Anwahl der Dokumentation über das Dokumentations-Tab im Hauptmenü (statt aus dem Dokumentationsverzeichnis) -->
          <!--        wurde überhaupt nicht gescrolled oder immer nach "1" - wünschenswert wäre, dass auch in diesem Fall stets zu -->
          <!--        dem selectedDocTopicId gescrolled wird. Dies gelöst durch @click Events an den q-expansion-items, die die -->
          <!--        selectedDocTopicId setzen. Damit dann den ersten Watcher in Dokumentation auf der Prop-Änderung stillgelegt und dafür -->
          <!--        den neuen Watcher auf der Route-Änderung aktiviert, der zuverlässig erkennt, wenn sich die Route ändert (dort -->
          <!--        wird ja die Prop auch geändert und die id ist eigentlich sogar Teil der Route) und -->
          <!--        gleichzeitig durch obige @click-Events die zuletzt im Dokumentationsverzeichnis ausgewählte id zur Verfügung hat. -->
          <!--        Die Lösung kam von https://forum.quasar-framework.org/topic/4536/solved-by-metalsadman-how-to-store-data-in-nested-v-for-loops-for-q-expansion-items -->
          <!--      - VERBLEIBENDES TODO: Routing Logik insgesamt überprüfen, bestehend aus -->
          <!--              a) Boolean Mode/Property für die Route "Dokumentation" in routes.js -->
          <!--              b) Named Route mit Parameterübergabe (der id) in q-route-tab oben -->
          <!--              c) "keep alive" in der router-view unten. Dieses "keep alive" temporär entfernt, um Scrolling Probleme -->
          <!--                 wegen der nicht funktionierenden Expansion Items zu fixen, später wieder hinzugefügt -->
          <!--              d) :key Prop an router-view - entfernt -->
          <!-- Beispiele für q-expansion-item: -->
          <!-- https://codepen.io/smolinari/pen/EJgaxe?editors=1010 - mit v-model, mittels :value müsste man auch og. Property nutzen können -->
          <!-- https://github.com/quasarframework/quasar/issues/3735 -->
          <!-- ============================================================== -->
          <!-- NEU: Arrow am QExpansionItem NUR, falls Kinder vorhanden sind: -->
          <!-- ============================================================== -->
          <!-- ALT: -->
          <!-- header-class="bg-teal text-white shadow-2" -->
          <!-- NEU: header-class auf jeder Ebene mit Lambda-Expression-Steuerung -->
          <!--      für andere Farbe, wenn das zugehörige Topic selektiert ist   -->
          <!-- ALT - Variante: ? 'bg-white text-primary text-bold shadow-2' -->
          <q-expansion-item
            :expand-icon="
              arrowDownIconOnlyIfChildren(dokumentationsThemaEbene1)
            "
            expand-icon-toggle
            expand-separator
            default-opened
            dense
            dark
            group="accordeon-group-1"
            :header-class="
              selectedDocTopicId === dokumentationsThemaEbene1.id
                ? 'bg-primary text-white text-bold shadow-2'
                : 'bg-teal text-white shadow-2'
            "
            :header-inset-level="0"
            :icon="dokumentationsThemaEbene1.icon"
            :label="dokumentationsThemaEbene1.title"
            label-lines="1"
            :to="'/Dokumentation/' + dokumentationsThemaEbene1.id"
            @click="selectedDocTopicId = dokumentationsThemaEbene1.id"
          >
            <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
            <!-- @input="setRouteAndId(dokumentationsThemaEbene1.id)" -->
            <!-- ALT:
            <q-item
              :inset-level="0.1"
              class="q-my-sm"
              clickable
              @click="setRouteAndId(dokumentationsThemaEbene2.id)"
              v-ripple
            >
              <q-item-section>
                <q-itelabel>{{ dokumentationsThemaEbene2.id }} {{ dokumentationsThemaEbene2.title }}</q-item-label>
              </q-item-section>
            </q-item>
            -->

            <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
            <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
            <div
              v-for="dokumentationsThemaEbene2 in dokumentationsThemaEbene1.children"
              :key="dokumentationsThemaEbene2.id"
            >
              <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
              <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
              <!-- HINWEISE: -->
              <!--    1) Das automatisches Double Quoting z.B. von 0.1 nach "0.1" beim File Save in VS Code wurde von folgendem VS Code Setting verursacht: -->
              <!--    VS Code Menü: File/Preferences/Settings -->
              <!--    Vetur › Format › Default Formatter: HTML -- war auf "prettyhtml" eingestellt, umgestellt auf "prettier" -->
              <!--    (Default formatter for <template> region), "prettier" war auch eingestellt für CSS, d.h. <style> Region, belassen -->
              <!--    Für <script> Region war prettier-eslint eingestellt, belassen -->
              <!--    Die gegenüber den Defaults geänderten VS Code Settings können angezeigt werden per Eingabe von @modified im Suchfeld der Settings oben -->
              <!--    Dies war allerdings nicht die Ursache für ursprüngliche Vue Warnings für die q-expansion-items ("Expected Number..., got String...") -->
              <!--    2) :header-inset-level=0.x war ursprünglich falsch, ":" davor vergessen - dies war die Ursache für diese Vue Warnings -->
              <!-- ============================================================== -->
              <!-- NEU: Arrow am QExpansionItem NUR, falls Kinder vorhanden sind: -->
              <!-- ============================================================== -->
              <q-expansion-item
                :expand-icon="
                  arrowDownIconOnlyIfChildren(dokumentationsThemaEbene2)
                "
                expand-icon-toggle
                expand-separator
                default-closed
                dense
                dark
                group="accordeon-group-2"
                :header-class="
                  selectedDocTopicId === dokumentationsThemaEbene2.id
                    ? 'bg-primary text-white text-bold shadow-2'
                    : 'bg-teal-3 text-black shadow-2'
                "
                :header-inset-level="0.1"
                :label="dokumentationsThemaEbene2.title"
                label-lines="1"
                :to="'/Dokumentation/' + dokumentationsThemaEbene2.id"
                @click="selectedDocTopicId = dokumentationsThemaEbene2.id"
              >
                <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
                <!-- @input="setRouteAndId(dokumentationsThemaEbene2.id)" -->
                <div
                  v-for="dokumentationsThemaEbene3 in dokumentationsThemaEbene2.children"
                  :key="dokumentationsThemaEbene3.id"
                >
                  <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
                  <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
                  <!-- ========================================================================================== -->
                  <!-- NEU: expand-icon=null auf der dritten Ebene, um dort KEIN Icon zum Expandieren anzuzeigen! -->
                  <!-- ========================================================================================== -->
                  <q-expansion-item
                    expand-icon="null"
                    expand-icon-toggle
                    expand-separator
                    default-closed
                    dense
                    dark
                    group="accordeon-group-3"
                    :header-class="
                      selectedDocTopicId === dokumentationsThemaEbene3.id
                        ? 'bg-primary text-white text-bold shadow-2'
                        : 'bg-teal-2 text-black shadow-2'
                    "
                    :header-inset-level="0.4"
                    :label="dokumentationsThemaEbene3.title"
                    label-lines="1"
                    :to="'/Dokumentation/' + dokumentationsThemaEbene3.id"
                    @click="selectedDocTopicId = dokumentationsThemaEbene3.id"
                  >
                    <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
                    <!-- @input="setRouteAndId(dokumentationsThemaEbene3.id)" -->
                  </q-expansion-item>
                </div>
              </q-expansion-item>
            </div>
          </q-expansion-item>
        </div>
      </q-list>
      <br />
      <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
      <!-- TODO: Fake Chat Funktion -->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-deep-orange-7" v-if="true">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="chat" size="24px" left />
          Expertenchat
        </div>
        <q-list dense class="bg-deep-orange-2">
          <q-chat-message
            name="Stefan"
            avatar="statics/images/avatar-boy-1.png"
            :text="['Wie heßt nochmal die Estrichnorm?']"
            stamp="vor 5 Minuten"
            sent
          />
          <q-chat-message
            name="Katrin"
            avatar="statics/images/avatar-girl-1.png"
            :text="['DIN 18560-2']"
            stamp="vor 3 Minuten"
            sent
          />
          <q-chat-message
            name="Erik"
            avatar="statics/images/avatar-boy-2.png"
            :text="['Cool!']"
            stamp="vor 2 Minuten"
            sent
          />
        </q-list>
      </q-list>
      <!-- </q-scroll-area> -->
    </q-drawer>
    <!-- ---------------------------------------------------------------------------------------------------------- -->
    <!-- Aktuell wieder disabled:                                                                                   -->
    <!-- Alternativer q-drawer für Mobilgeräte mit overlay und behavior="desktop", ansonsten identisch zum Desktop: -->
    <!-- behavior="desktop" auch für Mobilgeräte, sonst verliert der q-page-container in der Mitte den Fokus beim   -->
    <!-- Ausklappen des q-drawers, und es funktioniert das Scrolling in der Doku aus dem Inhaltsverzeichnis nicht!  -->
    <!-- Allerdings funktioniert dafür das Weg-Swipen des q-drawers nach rechts nicht mehr!                         -->
    <!-- Daher vorläufig wieder behavior="mobile" eingestellt, was das Scrolling verhindert, aber das Wegwischen des-->
    <!-- q-drawers erlaubt auf Mobilgeräten (kleineres Übel)                                                        -->
    <!-- ACHTUNG: overlay scheint, warum auch immer, mobil immer true zu sein, selbst mit :overlay="false"!         -->
    <!-- ACHTUNG: Eigentlich ist damit das per v-if duplizierte q-drawer wieder hinfällig!                          -->
    <!-- Daher diesen wieder disabled!                                                                              -->
    <!-- ---------------------------------------------------------------------------------------------------------- -->
    <!-- ALT: bordered am q-drawer - entfernt! -->
    <q-drawer
      v-if="false"
      v-model="left"
      side="left"
      ref="leftDrawer"
      :width="localStore.state.widthLeftDrawer"
      behavior="mobile"
      elevated
    >
      <div class="row full-width q-pa-sm q-gutter-x-xs bg-cyan-1">
        <q-slider
          v-model="localStore.state.widthLeftDrawer"
          :min="220"
          :max="320"
          color="teal-6"
          dense
        />
      </div>
      <!-- HINWEIS: :width='500' (Beispiel) erlaubt Veränderung der Breite des Drawers, könnte auch dynamisch über ein Model gesteuert werden! -->
      <!-- NEU: Versuchsweise hier separate q-scroll-area -->
      <!-- Damit lässt sich zwar der linke Drawer unabhängig von der Main Page scrollen, -->
      <!-- aber er scrolled trotzdem mit, wenn die Dokumentations-Seite zu einer id scrolled!!! -->
      <!-- Daher wieder auskommentiert, Lösung war "LPR" in view Properties von q-layout oben. -->
      <!-- <q-scroll-area ref="leftDrawerScrollArea" style="height: 1500px;"> -->
      <!-- <q-scroll-area ref="leftDrawerScrollArea" class="fit" -->
      <!-- -->
      <!-- BIM.click Dokumentationsverzeichnis folgt: -->
      <!-- Verschachtelte q-list auf einem v-Model für das dokumentationsVerzeichnis in data() -->
      <!-- Vorlage: Vue native "nested v-fors" Beispiel (mit 2 Leveln, mit $index und $parent.$index): -->
      <!--    https://codepen.io/blikblum/pen/ZQRRmm  -->
      <!-- Damit z.B. das zweite v-for geändert zu v-for="dokumentationsThemaEbene2 in dokumentationsThemaEbene1.children" -->
      <!-- Die v-fors dann noch alle verlagert von q-item in div Wrapper, -->
      <!-- sonst kommt es zu einem häßlichen Nesting der q-labels der drei Ebenen im Dokumentationsverzeichnis links im Drawer!!! -->

      <!-- Weitere v-for Optionen hier: -->
      <!-- Z.B. 2. Beispiel unter https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results  -->

      <!-- Alternative - den ganzen Array "flachklopfen" und mit einem einzigen v-for bearbeiten -->
      <!-- Siehe https://quasar.dev/vue-components/list-and-list-items - dort "Contact list" - lädt ebenfalls das Menü mit (einem) v-for aus data()-->
      <!-- Wenn der Array flach ist, müsste aber abhängig von der id der q-item ode q-expansion-item indent-level bestimmt werden -->
      <!-- D.h. diese müssten dann z.B. im Array mitgespeichert werden und von dort geholt werden als Parameter von indent-level! -->

      <!-- NEU: Weiterentwicklung des Dokumentationsverzeichnisses mit q-expansion-items: Siehe https://quasar.dev/vue-components/expansion-item -->
      <!-- Damit kann per expand-icon-toggle beim Klicken auf den kleinen Expand-Icon (Pfeil nach unten) nur der Expand ausgelöst werden -->
      <!-- Wenn man auf den Header daneben klicked, kann dann Router Link ausgelöst werden, unabhängig vom Expand State -->
      <!-- Beides kann auch zusammen ausgelöst werden. -->
      <!-- Siehe auch: https://forum.quasar-framework.org/topic/3403/solved-v1-q-expansion-item-open-tree-when-route-is-active/7 -->
      <!-- Dort Mix von q-expansion-items und q-items -->

      <!-- Zweck des Ganzen: Aufruf der Dokumentationsthemen im dokumentationsVerzeichnis (Array mit verschachtelten Unter-Arrays) mit Scroll in der Dokumentations-Komponente dorthin -->
      <!-- Erfolgt per Props-Übergabe der DOM id für jede Überschrift im Dokumentationsverzeichnis an die Dokumentations-Komponente, per -->
      <!-- 1) Vue Router-Befehl $router.replace in Verbindung mit Boolean Mode (d.h. prop: true) an der betreffenden Route in routes.js -->
      <!-- 2) NEU: Zusätzlich die selektierte id in selectedDocTopicId speichern, zur Weitergabe per Router Link in q-route-tab im Hauptmenü oben -->
      <!-- Beides in Funktion setRouteandId zusammengefasst -->

      <!-- NEU: q-list auf dokumentationsVerzeichnis mit 3 verschachtelten q-expansion-items -->
      <!-- ALT: q-list auf dokumentationsVerzeichnis mit 3 verschachtelten q-items (hier nur noch das dritte, innerste): -->
      <!--  <div
              v-for="dokumentationsThemaEbene3 in dokumentationsThemaEbene2.children"
              :key="dokumentationsThemaEbene3.id"
            >
              <q-item
               :inset-level="0.4"
               class="q-my-sm"
               clickable
               @click="setRouteAndId(dokumentationsThemaEbene3.id)"
               v-ripple
              >
               <q-item-section>
                 <q-item-label>{{ dokumentationsThemaEbene3.id }} {{ dokumentationsThemaEbene3.title }}</q-item-label>
               </q-item-section>
              </q-item>
      </div>-->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-teal-7">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="menu_book" size="24px" left />
          Inhaltsverzeichnis Dokumentation
        </div>
        <div
          v-for="dokumentationsThemaEbene1 in dokumentationsVerzeichnis"
          :key="dokumentationsThemaEbene1.id"
        >
          <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
          <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->

          <!-- PROBLEM (SOLVED): Nach dem Quasar Upgrade auf 1.1.7 funktionieren die q-expansion-items NICHT mehr korrekt -->
          <!-- Die Expansion funktioniert nicht mehr, das Scrolling auch nur manchmal! -->
          <!-- WEITERES PROBLEM (SOLVED): Es kommen außerdem Vue-Warnungen, z.B. -->
          <!--         vue-router.esm.js?8c4f:2051 Uncaught (in promise) NavigationDuplicated -->
          <!--         {_name: "NavigationDuplicated", name: "NavigationDuplicated", -->
          <!--         message: "Navigating to current location ("/Dokumentation/2") is not allowed" -->
          <!-- Diese Warnungen waren ein weiterer, unabhängiger Fehler, der auftritt, -->
          <!-- wenn 2-mal hintereinander dasselbe Dokumentationsthema angeklickt wird!!! -->
          <!-- Dieses Problem verschwand nach der Umstellung auf :to (siehe unten) -->
          <!-- WORKAROUND für das erste Problem: Wenn man @input="setRouteAndId(dokumentationsThemaEbene1.id)" im ersten Expansion Item -->
          <!-- temporär entfernt, funktioniert wenigstens die Expansion wieder, dafür das Scrolling nicht immer! -->
          <!-- Von Einfluss sind: -->
          <!--      - Die @input-Methoden: Lässt man diese auf den 2 oberen Dokumentationsverzeichnisebenen temporär weg, funktioniert -->
          <!--        die q-expansion-items einwandfrei, bis auf die 3. Ebene hinunter (z.B. Abschnitt 3.3.1)!!! -->
          <!--        Diese durch direktes Routing per :to ersetzt. -->
          <!--      - :to Property (siehe q-expansion-item API) ausprobieren, um neue Route auf ("/Dokumentation/" + id) zu setzen, statt den @input-Methoden -->
          <!--        D.h. auf der ersten Dokumentationsverzeichnisebene: :to="'/Dokumentation/' + dokumentationsThemaEbene1.id" -->
          <!--        Die Tests damit sind erfolgreich!!! -->
          <!--      - (@input könnte auch ein Boolean property :value setzen, damit sich das Expansion Item bei Klick öffnet? Siehe API -->
          <!--        Das scheint aber auf der zweiten Dokumentationsverzeichnisebene auch nicht notwendig zu sein, daher nicht weiterverfolgt) -->
          <!--      - WEITERES PROBLEM (SOLVED): Watch auf docTopicElementIdToScrollTo in Dokumentation funktioniert zunächst nicht, nur Mounted darauf! -->
          <!--        Dabei handelte es sich um ein weiteres Problem, das auftrat, sobald :key Property  -->
          <!--        in router-view unten gesetzt wurde. Diese :key Property entfernt. Siehe die Kommentare dazu unten bei router-view  -->
          <!--        sowie die Testergebnisse in Dokumentation.vue. -->
          <!--      - WEITERES PROBLEM (SOLVED): Bei Anwahl der Dokumentation über das Dokumentations-Tab im Hauptmenü (statt aus dem Dokumentationsverzeichnis) -->
          <!--        wurde überhaupt nicht gescrolled oder immer nach "1" - wünschenswert wäre, dass auch in diesem Fall stets zu -->
          <!--        dem selectedDocTopicId gescrolled wird. Dies gelöst durch @click Events an den q-expansion-items, die die -->
          <!--        selectedDocTopicId setzen. Damit dann den ersten Watcher in Dokumentation auf der Prop-Änderung stillgelegt und dafür -->
          <!--        den neuen Watcher auf der Route-Änderung aktiviert, der zuverlässig erkennt, wenn sich die Route ändert (dort -->
          <!--        wird ja die Prop auch geändert und die id ist eigentlich sogar Teil der Route) und -->
          <!--        gleichzeitig durch obige @click-Events die zuletzt im Dokumentationsverzeichnis ausgewählte id zur Verfügung hat. -->
          <!--        Die Lösung kam von https://forum.quasar-framework.org/topic/4536/solved-by-metalsadman-how-to-store-data-in-nested-v-for-loops-for-q-expansion-items -->
          <!--      - VERBLEIBENDES TODO: Routing Logik insgesamt überprüfen, bestehend aus -->
          <!--              a) Boolean Mode/Property für die Route "Dokumentation" in routes.js -->
          <!--              b) Named Route mit Parameterübergabe (der id) in q-route-tab oben -->
          <!--              c) "keep alive" in der router-view unten. Dieses "keep alive" temporär entfernt, um Scrolling Probleme -->
          <!--                 wegen der nicht funktionierenden Expansion Items zu fixen, später wieder hinzugefügt -->
          <!--              d) :key Prop an router-view - entfernt -->
          <!-- Beispiele für q-expansion-item: -->
          <!-- https://codepen.io/smolinari/pen/EJgaxe?editors=1010 - mit v-model, mittels :value müsste man auch og. Property nutzen können -->
          <!-- https://github.com/quasarframework/quasar/issues/3735 -->
          <!-- ============================================================== -->
          <!-- NEU: Arrow am QExpansionItem NUR, falls Kinder vorhanden sind: -->
          <!-- ============================================================== -->
          <!-- ALT: -->
          <!-- header-class="bg-teal text-white shadow-2" -->
          <!-- NEU: header-class auf jeder Ebene mit Lambda-Expression-Steuerung -->
          <!--      für andere Farbe, wenn das zugehörige Topic selektiert ist   -->
          <!-- ALT - Variante: ? 'bg-white text-primary text-bold shadow-2' -->
          <q-expansion-item
            :expand-icon="
              arrowDownIconOnlyIfChildren(dokumentationsThemaEbene1)
            "
            expand-icon-toggle
            expand-separator
            default-opened
            dense
            dark
            group="accordeon-group-1"
            :header-class="
              selectedDocTopicId === dokumentationsThemaEbene1.id
                ? 'bg-primary text-white text-bold shadow-2'
                : 'bg-teal text-white shadow-2'
            "
            :header-inset-level="0"
            :icon="dokumentationsThemaEbene1.icon"
            :label="dokumentationsThemaEbene1.title"
            label-lines="1"
            :to="'/Dokumentation/' + dokumentationsThemaEbene1.id"
            @click="selectedDocTopicId = dokumentationsThemaEbene1.id"
          >
            <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
            <!-- @input="setRouteAndId(dokumentationsThemaEbene1.id)" -->
            <!-- ALT:
            <q-item
              :inset-level="0.1"
              class="q-my-sm"
              clickable
              @click="setRouteAndId(dokumentationsThemaEbene2.id)"
              v-ripple
            >
              <q-item-section>
                <q-itelabel>{{ dokumentationsThemaEbene2.id }} {{ dokumentationsThemaEbene2.title }}</q-item-label>
              </q-item-section>
            </q-item>
            -->

            <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
            <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
            <div
              v-for="dokumentationsThemaEbene2 in dokumentationsThemaEbene1.children"
              :key="dokumentationsThemaEbene2.id"
            >
              <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
              <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
              <!-- HINWEISE: -->
              <!--    1) Das automatisches Double Quoting z.B. von 0.1 nach "0.1" beim File Save in VS Code wurde von folgendem VS Code Setting verursacht: -->
              <!--    VS Code Menü: File/Preferences/Settings -->
              <!--    Vetur › Format › Default Formatter: HTML -- war auf "prettyhtml" eingestellt, umgestellt auf "prettier" -->
              <!--    (Default formatter for <template> region), "prettier" war auch eingestellt für CSS, d.h. <style> Region, belassen -->
              <!--    Für <script> Region war prettier-eslint eingestellt, belassen -->
              <!--    Die gegenüber den Defaults geänderten VS Code Settings können angezeigt werden per Eingabe von @modified im Suchfeld der Settings oben -->
              <!--    Dies war allerdings nicht die Ursache für ursprüngliche Vue Warnings für die q-expansion-items ("Expected Number..., got String...") -->
              <!--    2) :header-inset-level=0.x war ursprünglich falsch, ":" davor vergessen - dies war die Ursache für diese Vue Warnings -->
              <!-- ============================================================== -->
              <!-- NEU: Arrow am QExpansionItem NUR, falls Kinder vorhanden sind: -->
              <!-- ============================================================== -->
              <q-expansion-item
                :expand-icon="
                  arrowDownIconOnlyIfChildren(dokumentationsThemaEbene2)
                "
                expand-icon-toggle
                expand-separator
                default-closed
                dense
                dark
                group="accordeon-group-2"
                :header-class="
                  selectedDocTopicId === dokumentationsThemaEbene2.id
                    ? 'bg-primary text-white text-bold shadow-2'
                    : 'bg-teal-3 text-black shadow-2'
                "
                :header-inset-level="0.1"
                :label="dokumentationsThemaEbene2.title"
                label-lines="1"
                :to="'/Dokumentation/' + dokumentationsThemaEbene2.id"
                @click="selectedDocTopicId = dokumentationsThemaEbene2.id"
              >
                <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
                <!-- @input="setRouteAndId(dokumentationsThemaEbene2.id)" -->
                <div
                  v-for="dokumentationsThemaEbene3 in dokumentationsThemaEbene2.children"
                  :key="dokumentationsThemaEbene3.id"
                >
                  <!-- ACHTUNG: v-for musste unbedingt in dieses <div> ausgelagert werden, nicht an q-item, -->
                  <!-- sonst kommt es zu einem Nesting der q-item Labels!!! -->
                  <!-- ========================================================================================== -->
                  <!-- NEU: expand-icon=null auf der dritten Ebene, um dort KEIN Icon zum Expandieren anzuzeigen! -->
                  <!-- ========================================================================================== -->
                  <q-expansion-item
                    expand-icon="null"
                    expand-icon-toggle
                    expand-separator
                    default-closed
                    dense
                    dark
                    group="accordeon-group-3"
                    :header-class="
                      selectedDocTopicId === dokumentationsThemaEbene3.id
                        ? 'bg-primary text-white text-bold shadow-2'
                        : 'bg-teal-2 text-black shadow-2'
                    "
                    :header-inset-level="0.4"
                    :label="dokumentationsThemaEbene3.title"
                    label-lines="1"
                    :to="'/Dokumentation/' + dokumentationsThemaEbene3.id"
                    @click="selectedDocTopicId = dokumentationsThemaEbene3.id"
                  >
                    <!-- Alter Workaround: Folgenden Parameter am q-expansion-item weglassen: -->
                    <!-- @input="setRouteAndId(dokumentationsThemaEbene3.id)" -->
                  </q-expansion-item>
                </div>
              </q-expansion-item>
            </div>
          </q-expansion-item>
        </div>
      </q-list>
      <br />
      <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
      <!-- TODO: Fake Chat Funktion -->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-deep-orange-7" v-if="true">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="chat" size="24px" left />
          Expertenchat
        </div>
        <q-list dense class="bg-deep-orange-2">
          <q-chat-message
            name="Stefan"
            avatar="statics/images/avatar-boy-1.png"
            :text="['Wie heßt nochmal die Estrichnorm?']"
            stamp="vor 5 Minuten"
            sent
          />
          <q-chat-message
            name="Katrin"
            avatar="statics/images/avatar-girl-1.png"
            :text="['DIN 18560-2']"
            stamp="vor 3 Minuten"
            sent
          />
          <q-chat-message
            name="Erik"
            avatar="statics/images/avatar-boy-2.png"
            :text="['Cool!']"
            stamp="vor 2 Minuten"
            sent
          />
        </q-list>
      </q-list>
      <!-- </q-scroll-area> -->
    </q-drawer>
    <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
    <!-- NEU: Experimentelles Hamburger-Menü in zusätzlichem linken Drawer -->
    <q-drawer
      v-if="!$q.screen.gt.sm"
      v-model="hamburger"
      side="left"
      ref="hamburgerDrawer"
      :width="200"
      :breakpoint="500"
      overlay
    >
      <!--
      <div class="text-white text-h7 text-weight-medium">
        <q-btn
          dense
          glossy
          color="primary"
          no-caps
          icon="menu"
          @click="hamburger = !hamburger"
        />
        <q-tooltip
          :delay="1000"
          :offset="[0, 3]"
          max-width="600px"
          content-class="bg-secondary text-white text-caption shadow-4"
        >
          Hauptemenü schließen
        </q-tooltip>
        Hauptmenü
      </div>
      -->
      <!-- ACHTUNG: class="text-left" wird ignoriert! -->
      <!-- NEU: Farbe gemäß einstellbarem Farbschema -->
      <q-tabs
        mobile-arrows
        vertical
        dense
        :class="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? 'text-left text-black bg-grey-4'
            : 'text-left text-white bg-primary'
        "
        class="text-left text-white bg-primary"
        align="left"
        active-color="primary"
        active-bg-color="white inset-shadow"
        indicator-color="primary"
        content-class="text-left text-h7"
      >
        <q-btn-dropdown
          class="stretch full-width"
          icon="person"
          label="An-/Abmelden"
          dense
          glossy
          color="positive"
          no-caps
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen Dropdown-Button                                       -->
          <!-- TODO: Funktioniert erst nach Aufklappen!                                          -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="600px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Benutzeranmeldung, -abmeldung und -registrierung
          </q-tooltip>
          <!-- Forms für Registrierung/Login/Logout -->
          <!-- DONE: Das folgende <form> in der Größe optimiert mittels style="min-width:650px" -->
          <!-- Diese Breite ist erforderlich, um die Hints anzuzeigen unter den Feldern! -->
          <!-- Hier bisher keine q-card verwendet! -->
          <q-form class="q-pa-sm background-color-grey-1">
            <div class="row full-width q-col-gutter-xs q-pa-xs">
              <div class="col-9">
                <!-- NEU: lazy-rules und v-bind:rules mit Regel vorNameErforderlich, plus ref, mit denen Eingabe Vorname erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.vorName"
                  label="Vorname (nur bei Neuregistrierung)"
                  hint="Vorname eingeben (bei Neuregistrierung)"
                  hide-hint
                  lazy-rules
                  v-bind:rules="vorNameErforderlich"
                  ref="vorNameFeld"
                  autocomplete="given-name"
                />
                <!-- NEU: lazy-rules und v-bind:rules mit Regel nachNameErforderlich, plus ref, mit denen Eingabe Nachname erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.nachName"
                  label="Nachname (nur bei Neuregistrierung)"
                  hint="Nachname eingeben (bei Neuregistrierung)"
                  hide-hint
                  lazy-rules
                  v-bind:rules="nachNameErforderlich"
                  ref="nachNameFeld"
                  autocomplete="family-name"
                />
                <!-- Hinweis: data-cy Prop wird vom Test Automation Tool Cypress benutzt! -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel eMailValidierung, plus ref, mit denen Eingabe eMail erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- TODO XXXXXX #285, type="submit" in Verbindung mit @submit am q-form und type="email" am q-input - getestet, hat -->
                <!-- aber keine Auswirkung! -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  data-cy="e-mail"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.eMail"
                  label="E-Mail-Adresse (Benutzerkennung)"
                  hint="E-Mail-Adresse, z.B. bob.baumeister@bob-bau.de"
                  lazy-rules
                  v-bind:rules="eMailValidierung"
                  ref="eMailFeld"
                  autocomplete="username"
                />
                <!-- NEU: kennWort-Input-Feld gemäß https://quasar.dev/vue-components/input#Input-types: -->
                <!-- Hinweis: data-cy Prop wird vom Test Automation Tool Cypress benutzt! -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel kennWortValidierung, plus ref, mit denen Eingabe Kennwort erforderlich gemacht wird -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- NEU: Versuch, natives Attribut "autocomplete" am input-Feld zu platzieren: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <!-- Problem ist in diesem Form allerdings, dass selbes Feld für current-password (bei Login) und new-password (bei Registrierung) -->
                <!-- benutzt wird, daher funktioniert es für dieses Feld nicht richtig - aktuell nur autocomplete alleine genommen -->
                <q-input
                  data-cy="kennWort"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="benutzer.kennWort"
                  label="Kennwort"
                  hint="Kennwort eingeben (Anzeige per Klick auf Icon)"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  v-bind:rules="kennWortValidierung"
                  ref="kennWortFeld"
                  autocomplete="current-password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <!-- NEU: 2. Kennwortfeld bei Registrierung -->
                <!-- NEU: lazy-rules und v-bind:rules mit Regel kennWoerterIdentisch, plus ref, mit denen geprüft wird, ob die beiden Kennwörter identisch sind -->
                <!-- Vorlage: https://stackoverflow.com/questions/58199265/how-validate-confirm-password-with-vue-quasar -->
                <!-- ACHTUNG: Das v-model kennWortBestaetigung hier ist in data(), NICHT in benutzer!!! -->
                <!-- NEU: Natives Attribut "autocomplete" am input-Feld platziert: -->
                <!-- Siehe https://quasar.dev/vue-components/input#native-attributes -->
                <!-- sowie https://www.w3schools.com/tags/tag_input.asp und https://www.w3schools.com/tags/att_input_autocomplete.asp -->
                <!-- Außerdem: https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands -->
                <!-- und https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute -->
                <q-input
                  :disable="!registrierungPending"
                  square
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  dense
                  v-model="kennWortBestaetigung"
                  label="Kennwortwiederholung (bei Neuregistrierung)"
                  hint="Kennwort bei Neuregistrierung nochmals eingeben (Anzeige per Klick auf Icon)"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  v-bind:rules="kennWoerterIdentisch"
                  ref="kennWortBestaetigungFeld"
                  autocomplete="new-password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <br />
                <!-- Platz für Hint schaffen -->
              </div>
              <!-- ACHTUNG: vertical funktioniert, warum auch immer, hier nicht, daher disabled -->
              <!--
              <div class="col-1">
                <q-separator vertical inset />
              </div>
              -->
              <div class="col-3 text-center">
                <q-avatar size="82px">
                  <img src="statics/images/avatar-bob.png" />
                </q-avatar>
                <!-- NEU: Im Rahmen von #285 e) aus Security-Gründen die Anzeige des Vor- und Nachnamens unter dem Bild rechts -->
                <!-- von benutzer.vorName/nachName in eigene Variablen anzeigeVorName/NachName verlagert -->
                <div class="text-subtitle2 q-pa-sm">
                  {{ anzeigeVorName }}
                  {{ anzeigeNachName }}
                </div>
                <!-- NEU: Parameter timeOut (hier false) an abmeldenBenutzer(timeOut) - steuert, welche Meldung ausgegeben wird -->
                <q-btn
                  color="deep-orange"
                  label="Abmelden"
                  glossy
                  class="stretch full-width"
                  v-close-popup
                  no-caps
                  @click="abmeldenBenutzer(false)"
                  :disable="
                    localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
                  "
                />
              </div>
            </div>
            <!-- <br /> -->
            <!-- Platz für Hint, nicht nötig mit Breite 650px -->
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ACHTUNG: Hier kein v-close-popup, sonst wird nach dem ersten Klick das Dropdown geschlossen! -->
              <!-- NEU: Computed-Funktion invalidFieldsRegistrierung wertet Validität aller Eingabefelder bei
                          Neuregistrierung aus und enabled Button nur, wenn alle Felder valide sind -->
              <!-- Zusätzlich Quasar Rules an den einzelnen Feldern, die ggf. Meldungen ausgeben bei invaliden Eingaben -->
              <!-- TODO XXXXXX #285, type="submit" in Verbindung mit @submit am q-form und type="email" am q-input -->
              <!-- NEU: Disablen, wenn Registrierung pending ist: -->
              <!-- NEU: Auch disablen, wenn Eingabefelder invalide sind (E-Mail-Adresse und Kennwort) -->
              <div class="col-3">
                <q-btn
                  color="positive"
                  label="Anmelden"
                  class="col-2 stretch full-width"
                  style="height: 100%"
                  glossy
                  v-close-popup
                  no-caps
                  @click="anmeldenBenutzer()"
                  :disable="
                    !localStore.state.anmeldeDatenBenutzer
                      .istAbgemeldetBenutzer ||
                      registrierungPending ||
                      invalidFieldsAnmeldung
                  "
                />
              </div>
              <div class="col-3">
                <q-btn
                  :disable="
                    computeDisableRegistrierenBenutzer ||
                      invalidFieldsRegistrierung
                  "
                  color="accent"
                  :label="!registrierungPending ? 'Registrieren' : 'Absenden'"
                  class="stretch full-width"
                  style="height: 100%"
                  glossy
                  no-caps
                  @click="
                    !registrierungPending
                      ? (registrierungPending = true)
                      : registrierenBenutzer()
                  "
                />
              </div>
              <!-- NEU: Disablen, wenn Registrierung pending ist: -->
              <div class="col-6">
                <q-btn
                  :disable="registrierungPending"
                  color="negative"
                  label="Kennwort vergessen"
                  class="stretch full-width"
                  glossy
                  style="height: 100%"
                  v-close-popup
                  no-caps
                  @click="kennWortVergessenBenutzer()"
                />
              </div>
            </div>
          </q-form>
          <!-- -->
        </q-btn-dropdown>
        <q-route-tab
          to="/Bauvorhaben"
          label="Bauvorhaben"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Planung von Bauprojekten mit Vorlagen
          </q-tooltip>
        </q-route-tab>
        <q-route-tab
          to="/Baustoffe"
          label="Baustoffe"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller Baustoffe, die bei der Planung verwendet werden
            können
          </q-tooltip>
        </q-route-tab>
        <!-- ALT: ier stand, warum auch immer: -->
        <!-- :to="{ name: 'Bauinformationen' }" -->
        <!-- NEU: Tab weiter nach links verschoben, da von Nicht-Administratoren häufiger gebraucht als Baueigenchaften -->
        <q-route-tab
          to="/Bauinformationen"
          label="Bauinformationen"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller Dokumente und Links, die für die Planung relevant
            sind
          </q-tooltip>
        </q-route-tab>
        <q-route-tab
          to="/Baueigenschaften"
          label="Baueigenschaften"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Verwaltung aller fachlichen Eigenschaften, die in Bauvorhaben und
            Baustoffen verwendet werden
          </q-tooltip>
        </q-route-tab>
        <q-route-tab
          to="/Datenaustausch"
          label="Datenaustausch"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Import und Export von Daten in verschiedenen Formaten
          </q-tooltip>
        </q-route-tab>
        <q-route-tab
          to="/Einstellungen"
          label="Einstellungen"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Benutzerspezifische Einstellungen
          </q-tooltip>
        </q-route-tab>
        <!-- ALT: <q-route-tab to="/Hilfe" label="Hilfe" no-caps /> -->
        <!-- Für Scrolling Tests ohne named Route mit Prop, entsprechende Änderung auch in routes.js nötig -->
        <!-- NEU: label="Hilfe" umbenannt in label="Dokumentation", da die Kontexthilfe im rechten Drawer künftig "Hilfe" heißen soll -->
        <q-route-tab
          :to="{
            name: 'Dokumentation',
            params: { docTopicElementIdToScrollTo: this.selectedDocTopicId }
          }"
          label="Dokumentation"
          no-caps
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Dokumentation mit Anleitungen (links wird ein
            Inhaltsverzeichnis zur Navigation angezeigt)
          </q-tooltip>
        </q-route-tab>
        <!-- NEU: Tab für Verwaltung, nur für Admninistratoren sichtbar: -->
        <q-route-tab
          v-if="
            localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
              'Administrator'
          "
          to="/Verwaltung"
          label="Verwaltung"
          no-caps
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        >
          <!-- --------------------------------------------------------------------------------- -->
          <!-- NEU: Tooltip auf dem obigen QRouteTab                                             -->
          <!-- --------------------------------------------------------------------------------- -->
          <q-tooltip
            :delay="1000"
            :offset="[0, -10]"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Administration des Systems
          </q-tooltip>
        </q-route-tab>
        <q-btn
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          dense
          flat
          class="stretch full-width"
          no-caps
          icon="menu_book"
          label="Inhalt Online-Doku"
          @click="
            hamburger = !hamburger;
            left = !left;
          "
        >
          <q-tooltip
            v-if="left === false"
            :offset="[0, -10]"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            :offset="[0, -10]"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Inhaltsverzeichnis Online-Dokumentation schließen
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          :disable="localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
          class="stretch full-width"
          dense
          flat
          icon="contact_support"
          label="Online-Hilfe"
          no-caps
          @click="right = !right"
        >
          <q-tooltip
            v-if="right === false"
            :offset="[0, -10]"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe öffnen
          </q-tooltip>
          <q-tooltip
            v-else
            :offset="[0, -10]"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Online-Hilfe schließen
          </q-tooltip>
        </q-btn>
      </q-tabs>
    </q-drawer>
    <!-- ------------------------------------------------------------------------------------------------------------------- -->
    <!-- ALT: bordered am q-list - entfernt! -->
    <q-drawer
      v-model="right"
      side="right"
      @before-show="left = false"
      :width="localStore.state.widthRightDrawer"
    >
      <!-- HINWEIS: :width='500' (Beispiel) erlaubt Veränderung der Breite des Drawers, könnte auch dynamisch über ein Model gesteuert werden! -->
      <!-- NEU: @before-show="left=false" schließt linken Drawer, um Platz zu gewinnen -->
      <!-- 1. Test: Im Drawer eine Kontexthilfe mit HTML, ohne Markdown -->
      <!-- Diese Variante später disabled zugunsten von Markdown-Variante unten: -->
      <!--
      <br />
      <strong>Kontexthilfe</strong>
      <br />
      <div v-if="currentTopicContextHelp === 50">
        <h6>DIN 18560-2 Estriche und Heizestriche auf Dämmschichten</h6>
        <q-img src="statics/images/estrich.jpg" style="max-width: 280px"></q-img>
        <br />
        <br />
        <br />3.1 Allgemeine Anforderungen - Estrich, schwimmend <br />3.2.1
        Dicke und Festigkeits- bzw. Härteklassen - Estrich, unbeheizt
        <br />3.2.2 Dicke und Festigkeits- bzw. Härteklassen - Heizestrich
        <br />3.3 Dämmschichten - Estrich, schwimmend <br />4 Bauliche
        Anforderungen - Estrich, schwimmend <br />5.1 Ausführung der Dämmschicht
        - Estrich, schwimmend <br />5.2 Randstreifen - Estrich, schwimmend
        <br />5.3 Ausführung - Estrich, schwimmend <br />6.2 Eignungsprüfung -
        Estrich, schwimmend <br />6.3 Bestätigungsprüfung - Estrich, schwimmend
        <br />
      </div>
      <div v-if="currentTopicContextHelp === 100">
        <strong>Baueigenschaft anlegen/bearbeiten</strong>
        <div class="doc-note doc-note--tip">
          <strong>Hinweise zu Baueigenschaften:</strong>
          <ul>
            <li>
              Die Angaben in den linken beiden Spalten beziehen sich auf den
              <strong>Typ</strong> der Baueigenschaft und sind im gesamten
              System gültig.
            </li>
            <li>
              Die Angaben in den rechten beiden Spalten beziehen sich auf die
              <strong>Werte</strong>, die die Baueigenschaft (gemäß ihrem bei
              Neuanlage festlegten <strong>Wertetyp)</strong> annehmen kann.
            </li>
            <li>
              Dazu muss sie für einen Baustoff (bzw. eine Baueinheit)
              <font color="text-accent">
                <strong>aktiviert</strong>
              </font>
              werden (siehe dazu die Hinweise zur Bedienung).
            </li>
            <li>
              Diese Werte der Baueigenschaft sind
              <u>spezifisch</u> für den im Baustoffbaum ausgewählten
              <u>Baustoff</u> (bzw. für eine im Bauvorhabenbaum ausgewählte
              <u>Baueinheit)</u>.
            </li>
          </ul>
        </div>
        <div class="doc-note doc-note--tip">
          <strong>Hinweise zur Bedienung:</strong>
          <ul>
            <li>
              In der rechten Spalte "Merkmale der Baueigenschaft..." den
              Schiebeschalter
              <font color="text-accent"><strong>"Aktiviert"</strong> </font>
              oben links verwenden, um eine Baueigenschaft für den im
              Baustoffbaum ausgewählten Baustoff zu
              <strong>aktivieren</strong> oder zu
              <strong>deaktivieren.</strong>
            </li>
            <li>
              Dabei zeigt der benachbarte Schiebeschalter
              <strong>"Aktivierbar"</strong> an, ob die Baueigenschaft aktiviert
              werden darf oder nicht (abhängig davon, ob sie im Elternknoten im
              Baustoffbaum aktiviert ist).
            </li>
            <li>
              Für aktivierte Baueigenschaften können
              <strong>Werte</strong> in der dritten Spalte "Wertbezogene
              Angaben..." eingegeben oder geändert werden.
            </li>
          </ul>
        </div>
      </div>
      -->
      <!-- 2. Test: Kontexthilfe mit QMarkdown Quasar App Extension: -->
      <!-- Test mit fixer Kontexthilfe, ist noch ein Mix aus fachlicher Hilfe und Bedienungshilfe, später die beiden separiert: -->
      <!--
      <q-list bordered class="bg-green-7">
        <div class="text-white text-h7 text-weight-regular">
          Kontexthilfe
        </div>
        <br />
        <q-expansion-item
          switch-toggle-side
          dark
          expand-separator
          default-opened
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          :header-inset-level="0"
          icon="apartment"
          label="Baueinheitsbeschreibung"
          label-lines="1"
        >
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          dark
          expand-separator
          default-opened
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="build"
          :header-inset-level="0"
          label="Baustoffbeschreibung"
          label-lines="1"
          :caption="localStore.state.baustoffBezeichnungAusgewaehlterBaustoff"
        >
          <q-item-section class="bg-green-1">
            <!- localStore.state.baustoffBeschreibungAusgewaehlterBaustoff ist reaktives Objekt ->
            <!- (String im Markdown-Format) das über den globalen Store synchronisiert wird. ->
            <q-markdown
              v-if="
                localStore.state.baustoffBeschreibungAusgewaehlterBaustoff !==
                  undefined &&
                  localStore.state.baustoffBeschreibungAusgewaehlterBaustoff !==
                    null
              "
              :src="localStore.state.baustoffBeschreibungAusgewaehlterBaustoff"
            />
            <!- Test-Markdown, der sonst angezeigt wird: ->
            <q-markdown v-else :src="bedienungsHilfeMarkdownDefault" />
          </q-item-section>
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          dark
          expand-separator
          default-opened
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="list"
          :header-inset-level="0"
          label="Baueigenschaftsbeschreibung"
          label-lines="1"
          expand-icon-class="text-white"
        >
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          dark
          :value="currentTopicContextHelp === 100"
          expand-separator
          default-opened
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="contact_support"
          :header-inset-level="0"
          label="Bedienungshinweise"
          label-lines="1"
        >
          <q-item-section class="bg-green-1">
            <!- Test-Markdown, der bei Neuanlage und Auswahl von Baueigenschaften angezeigt wird: ->
            <q-markdown
              v-if="currentTopicContextHelp === 100"
              :src="bedienungsHilfeMarkdownDefault"
            />
          </q-item-section>
        </q-expansion-item>
      </q-list>
      -->
      <!-- 3. Test mit per v-for aus bedienungsHilfeVerzeichnis erzeugter Bedienungshilfe: -->
      <!-- Verworfen wegen mangelnder Identifizierbarkeit der generierten q-expansion-items per ref (sind Arrays!!!) -->
      <!--
      <q-list bordered class="bg-cyan-8">
        <div class="text-white text-h7 text-weight-regular">
          Bedienungshilfe
        </div>
        <br />
        <div
          v-for="dokumentationsThemaEbene1 in this.bedienungsHilfeVerzeichnis"
          :key="dokumentationsThemaEbene1.id"
        >
          <q-expansion-item
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            default-opened
            dense
            dark
            group="accordeon-group-1-bedienungsHilfe"
            header-class="bg-cyan text-white shadow-2"
            :header-inset-level="0"
            :icon="dokumentationsThemaEbene1.icon"
            :label="dokumentationsThemaEbene1.title"
            label-lines="1"
          >
            <q-item :inset-level="0.1" class="q-my-sm" v-ripple>
              <q-item-section>
                <q-item-label>ABC - nur für Test</q-item-label>
              </q-item-section>
            </q-item>
            <div
              v-for="dokumentationsThemaEbene2 in dokumentationsThemaEbene1.children"
              :key="dokumentationsThemaEbene2.id"
            >
              <q-expansion-item
                switch-toggle-side
                expand-icon-toggle
                expand-separator
                default-opened
                dense
                dark
                group="accordeon-group-2-bedienungsHilfe"
                header-class="bg-cyan-4 text-black shadow-2"
                :header-inset-level="0.1"
                :label="dokumentationsThemaEbene2.title"
                label-lines="1"
              >
                <div
                  v-for="dokumentationsThemaEbene3 in dokumentationsThemaEbene2.children"
                  :key="dokumentationsThemaEbene3.id"
                >
                -->
      <!-- TODO: Sichtbarkeit triggern -->
      <!-- :value="currentTopicContextHelp === 100" -->
      <!-- ACHTUNG: Funktioniert nicht, da so alle Expansion Items dieselbe Value haben!!! -->
      <!-- Es müsste aber individuell angesteuert werden für jedes der 3 Expansion Items in dieser Untergruppe: -->
      <!-- Z.B. mit :value="hilfeSelector.dokumentationsThemaEbene3.ref -->
      <!-- mit hilfeSelector: { ref_1_1_1_Uebersicht: false, ref_1_1_2_Auswahl: true, ref_1_!_3_Neu: false} -->
      <!-- Dieser müsste dynamisch gesetzt werden -- komplex, ähnlich viel Code wie die Steuerungsvariante über show-Methode in Event-Handler: -->
      <!-- Daher einstweilen per show-Methode (benutzt $refs) Sichtbarkeit aktiviert - siehe Script Section -->
      <!--
                  <q-expansion-item
                    :ref="dokumentationsThemaEbene3.ref"
                    switch-toggle-side
                    expand-icon-toggle
                    expand-separator
                    default-opened
                    dense
                    dark
                    group="accordeon-group-3-bedienungsHilfe"
                    header-class="bg-cyan-2 text-black shadow-2"
                    :header-inset-level="0.4"
                    :label="dokumentationsThemaEbene3.title"
                    label-lines="1"
                  >
                    <q-item-section class="bg-cyan-2">
                -->
      <!-- Test-Markdown, der bei Neuanlage und Auswahl von Baueigenschaften angezeigt wird: -->
      <!-- {{ showCurrentTopicContextHelp }} -->
      <!-- {{ dokumentationsThemaEbene3.markdown }} -->
      <!-- TODO: Hier Steuerung, welcher Markdown als Bedienungshilfe angezeigt wird, per v-if -->
      <!-- Ist nur vorläufig -->
      <!--
                      <q-markdown
                        v-if="
                          currentTopicContextHelp === 100 &&
                            dokumentationsThemaEbene3.markdownFileName ===
                              'bedienungsHilfeMarkdownDefault'
                        "
                        :src="bedienungsHilfeMarkdownDefault"
                      />
                      <q-markdown
                        v-if="
                          currentTopicContextHelp === 50 &&
                            dokumentationsThemaEbene3.markdownFileName ===
                              'bedienungsHilfeMarkdownDefault'
                        "
                        :src="bedienungsHilfeMarkdownDefault"
                      />
                    </q-item-section>
                  </q-expansion-item>
                </div>
              </q-expansion-item>
            </div>
          </q-expansion-item>
        </div>
      </q-list>
      -->
      <!-- 4. Test mit statisch aufgebauter Bedienungshilfe aus q-expansion-items, die q-markdowns für jedes Bedienungshilfethema enthalten: -->
      <!-- DESIGN: -->
      <!-- a) Die Expansion Items im Template (ohne die Steuerung per bedienungsHilfeVerzeichnis und v-fors) statisch aufbauen -->
      <!-- b) An den Expansion Items vorläufig :value nutzen zum Öffnen statt der show-Methode (später wieder geändert, siehe HINWEISE unten) -->
      <!-- c) Damit kann auch in jedem Expansion Item statisch das passende md-File geladen werden, ohne die Notwendigkeit der Übergabe einers Filenamens dafür -->
      <!--    Das offene Problem, diese in bedienungsHilfeVerzeichnis.js zu importieren oder als Strings zu definieren, entfällt damit auch! -->
      <!-- d) Die v-ifs an den q-markdowns könnten dann auch aus über den global Store synchronisierten reaktiven Variablen kontrolliert werden, ebenso die Captions -->
      <!--    in der fachlichen Hilfe -->
      <!--    Passende Variablen dafür im global Store, z.B. für :value: (dabei immer nur eine der 3 Variablen auf true setzen in Mutator-Methode, die anderen auf false) -->
      <!--      isSelectedUebersichtBaueigenschaftenBaustoffe: Boolean, -->
      <!--      isSelectedAuswahlBaueigenschaftenBaustoffe: Boolean, -->
      <!--      isSelectedNeuBaueigenschaftenBaustoffe: Boolean, -->
      <!--    Für Captions, z.B.: baustoffBezeichnungAusgewaehlterBaustoff: "Caption Text", -->
      <!--    Diese Variablen müssen z.B. in Baustoffe.vue passend mutated werden (statt aktuell Event notifyTopicContextHelpEvent) -->
      <!-- e) Die Labels wären dann statisch definiert statt aus bedienungsHilfeVerzeichnis geladen (ist kein Problem) -->
      <!-- f) Die refs an den q-expansion-items könnten eventuell sogar entfallen, da die show-Methode nicht mehr aufgerufen würde (später wieder geändert, siehe HINWEISE unten) -->
      <!-- g) Das Event notifyTopicContextHelpEvent könnte entfallen, wenn die Steuerung der q-expansion-items komplett über reaktive Pendants zu global Store Variablen -->
      <!--    erfolgen würde (später ersetzt durch showBedienungsHilfe(ref), siehe HINWEISE unten) -->
      <!-- HINWEISE: -->
      <!-- 1. Die Property default-opened an allen q-expansion-items entfernt, da die Items in der Bedienungshilfe initial geschlossen sein sollten! -->
      <!-- 2. Eine Steuerung per :value mit spezifischen Boolean-Wert für jedes q-expansion-item aus dem Store funktioniert nur bedingt: -->
      <!--    - Das Öffnen eines bestimmten Themas bei Auswahl z.B. des entsprechenden Tabs im Main UI funktioniert nur bedingt: -->
      <!--      -- Bei erstmaligeer Auswahl, wenn noch alle Bedienungshilfe-Items geschlossen sind, funktioniert es korrekt -->
      <!--      -- Innerhalb einer bereits geöffneten Akkordeon-Gruppe funktioniert es auch korrekt, wenn ein anderes Tab ausgewählt wird -->
      <!--      -- Wenn aber manuell die betroffene Gruppe oder ein Item im Pfad der Gruppe geschlossen wurde, -->
      <!--         oder ein Item in einem anderen Pfad innerhalb der Bedienungshilfe ausgewählt wurde, funktioniert -->
      <!--         das Öffnen des richtigen Items bei erneuter Anwahl eines Tabs innerhalb derselben Gruppe NICHT!!! -->
      <!--      -- Dies ist selbst dann der Fall, wenn man in den Mutator-Methoden ALLE betreffenden Boolean-Werte auch für die Eltern- und Geschwister-Items richtig setzt -->
      <!--      -- Dies ist selbst dann der Fall, wenn man die Akkordeon-Gruppen disabled -->
      <!-- 3. Für eine gute Benutzererfahrung muss daher doch eine Steuerung des Öffnens per show-Methode mit individiduellem ref pro Bedienungshilfe-Expansion-Item -->
      <!--    in einem Event Handler erfolgen. Dafür müssen individuelle, triggernde Events showBedienungsHilfe(ref) pro Item in die Main-UI-Komponenten eingebaut werden!!! -->
      <!--    Zunächst die Bedienungshilfe (folgt hier direkt im Template) auf dieses Konzept umgestellt. -->
      <!--    Getestet mit Baustoffe.vue, neues Event dafür heißt showBedienungsHilfeEvent, Event Handler ($on) dafür ist hier in my-layout.vue -->
      <!--    Es müssen dabei mehrere show()-Aufrufe abgesetzt werden für den kompletten Pfad der verschachtelten q-expansion-items - siehe Event Handler unten -->
      <!-- 4. Die refs an den q-expansion-items werden für 3. benötigt, die :values mit Referenzen auf die entsprechenden Boolean-Variablen im Store sind damit aber -->
      <!--    überflüssig, diese entfernt. -->
      <!-- 5. Unterhalb der q-expansion-items werden z.T. q-lists und q-items verwendet. Statt q-lists könnten auch q-cards verwendet werden. -->
      <div class="row full-width q-pa-sm q-gutter-x-xs bg-cyan-1">
        <q-slider
          v-model="localStore.state.widthRightDrawer"
          :min="220"
          :max="490"
          reverse
          color="teal-6"
          dense
        />
      </div>
      <!-- Start Fachliche Hilfe - NEU: Diese vor die Bedienungshilfe verschoben! --->
      <!-- ------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- Fachliche Hilfe aus statisch definierten QExpansionItems (d.h. ohne v-fors aus Datei wie beim Inhaltsverzeichnis der Dokumentation -->
      <!-- mit QMarkdown Quasar App Extension: -->
      <!-- TODO: Die Ansteuerung der QExpansionItems in der fachlichen Hilfe wurde ursprünglich experimentell über eine -->
      <!-- Variable currentTopicKontexthilfe, die mit dem openRightDrawerEvent mitkam und im Event Handler gesetzt wird, gesteuert -->
      <!-- Dazu hatten die QExpansionItems entsprechende :values:, z.B. :value="currentTopicContextHelp === 100" -->
      <!-- (in Baustoffe.vue sind dafür testhalber 2 Konstanten CONTEXT_HELP_* definiert für das topicContextHelp) -->
      <!-- Die echte Ansteuerung muss in Vorbereitung von tiefer verschachtelten QExpansionItems für die fachliche Hilfe -->
      <!-- wie bei der Bedienungshilfe erfolgen über refs an den q-expansion-items und Aufruf der show()-Methoden im Pfad -->
      <!-- per Event Handler -->
      <!-- TODOs also: -->
      <!-- 1. refs an den q-expansion-items für die fachliche Hilfe definieren -->
      <!-- 2. Event showFachlicheHilfeEvent definieren, welcher bei der Auswahl von Baustoffen, Baueinheiten, Baueigenschaften gefeuert -->
      <!--    wird, mit Parameter ref, analog zu showBedienungsHilfeEvent -->
      <!-- 3. Event Handler ($on) dafür hier in MyLayout.vue implementieren, welcher aus dem ref-Parameter des Events wie -->
      <!--    bei der Bedienungshilfe die entsprechenden q-expansion-items in der fachlichen Hilfe per show-Methode mit öffnet -->
      <!-- Vorläufig ist hier Folgendes implementiert: -->
      <!-- Für einen im Baustoffbaum ausgewählten Baustoff wird in Baustoffe.vue die Bezeichnung und Beschreibung (Markdown-Feld) -->
      <!-- im global Store per Mutator-Methoden aktualisiert, die von der fachlichen Hilfe in MyLayout.vue per q-expansion-item bzw. -->
      <!-- per q-markdown über den local Store reaktiv konsumiert werden -->
      <!-- default-opened entfernt -->
      <!-- Start Fachliche Hilfe -->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-green-7">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="info" size="24px" left />
          Fachliche Hilfe
        </div>
        <q-expansion-item
          ref="fachlicheHilfeBaueinheit"
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          :header-inset-level="0"
          icon="apartment"
          label="Baueinheit"
          label-lines="1"
          :caption="
            localStore.state.baueinheitsBezeichnungAusgewaehlteBaueinheit
          "
        >
          <q-list dense>
            <q-item dense class="bg-green-1">
              <!-- localStore.state.baustoffBeschreibungAusgewaehlterBaustoff ist reaktives Objekt -->
              <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
              <q-markdown
                v-if="
                  localStore.state
                    .baueinheitsBeschreibungAusgewaehlteBaueinheit !==
                    undefined &&
                    localStore.state
                      .baueinheitsBeschreibungAusgewaehlteBaueinheit !== null
                "
                :src="
                  localStore.state.baueinheitsBeschreibungAusgewaehlteBaueinheit
                "
              />
              <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
              <q-markdown v-else :src="fachlicheHilfeMarkdownDefault" />
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          ref="fachlicheHilfeBaustoff"
          default-opened
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="build"
          :header-inset-level="0"
          label="Baustoff"
          label-lines="1"
          :caption="localStore.state.baustoffBezeichnungAusgewaehlterBaustoff"
        >
          <q-list dense>
            <q-item dense class="bg-green-1">
              <!-- localStore.state.baustoffBeschreibungAusgewaehlterBaustoff ist reaktives Objekt -->
              <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
              <q-markdown
                v-if="
                  localStore.state.baustoffBeschreibungAusgewaehlterBaustoff !==
                    undefined &&
                    localStore.state
                      .baustoffBeschreibungAusgewaehlterBaustoff !== null
                "
                :src="
                  localStore.state.baustoffBeschreibungAusgewaehlterBaustoff
                "
              />
              <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
              <q-markdown v-else :src="fachlicheHilfeMarkdownEstriche" />
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          ref="fachlicheHilfeBaueigenschaftAnBaueinheit"
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="list"
          :header-inset-level="0"
          label="Baueigenschaft an Baueinheit"
          label-lines="1"
          expand-icon-class="text-white"
          :caption="
            localStore.state
              .baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit
          "
        >
          <q-list dense>
            <q-item dense class="bg-green-1">
              <!-- localStore.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit ist reaktives Objekt -->
              <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
              <q-markdown
                v-if="
                  localStore.state
                    .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit !==
                    undefined &&
                    localStore.state
                      .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit !==
                      null
                "
                :src="
                  localStore.state
                    .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit
                "
              />
              <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
              <q-markdown v-else :src="fachlicheHilfeMarkdownDefault" />
            </q-item>
            <!-- NEU: #353, hier testweise Anzeigetext und Links anzeigen von zugeordneter Bauinformation an Baueigenschaft aus Baueinheit: -->
            <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
              }}
            </q-item>
            -->
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  !localStore.state
                    .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="Internen BIM.click-Link öffnen"
                dense
                glossy
                color="light-green"
                no-caps
                @click="
                  openInternerLinkBauinformation(
                    localStore.state
                      .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                  )
                "
              />
            </q-item>
            <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
              }}
            </q-item>
            -->
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  !localStore.state
                    .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="Externen Link öffnen"
                dense
                glossy
                color="purple-4"
                no-caps
                :href="
                  localStore.state
                    .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                type="a"
                target="_blank"
              />
            </q-item>
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  !localStore.state
                    .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="OneDrive-Link öffnen"
                dense
                glossy
                color="light-blue-7"
                no-caps
                :href="
                  localStore.state
                    .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                type="a"
                target="_blank"
              />
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          ref="fachlicheHilfeBaueigenschaftAnBaustoff"
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="list"
          :header-inset-level="0"
          label="Baueigenschaft an Baustoff"
          label-lines="1"
          expand-icon-class="text-white"
          :caption="
            localStore.state
              .baueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff
          "
        >
          <q-list dense>
            <q-item dense class="bg-green-1">
              <!-- localStore.state.baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff ist reaktives Objekt -->
              <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
              <q-markdown
                v-if="
                  localStore.state
                    .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff !==
                    undefined &&
                    localStore.state
                      .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff !==
                      null
                "
                :src="
                  localStore.state
                    .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff
                "
              />
              <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
              <q-markdown v-else :src="fachlicheHilfeMarkdownDefault" />
            </q-item>
            <!-- NEU: #353, hier Anzeigetext und Links anzeigen von zugeordneter Bauinformation an Baueigenschaft aus Baustoff: -->
            <div
              v-if="
                localStore.state
                  .anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              "
            >
              <q-item dense class="bg-green-1">
                {{
                  localStore.state
                    .anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                }}
              </q-item>
              <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              }}
            </q-item>
            -->
              <q-item dense class="bg-green--1 row justify-center">
                <q-btn
                  icon="library_books"
                  :disable="
                    !localStore.state
                      .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                  "
                  label="Internen BIM.click-Link öffnen"
                  dense
                  glossy
                  color="light-green"
                  no-caps
                  @click="
                    openInternerLinkBauinformation(
                      localStore.state
                        .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    )
                  "
                />
              </q-item>
              <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              }}
            </q-item>
            -->
              <q-item dense class="bg-green--1 row justify-center">
                <q-btn
                  icon="library_books"
                  :disable="
                    !localStore.state
                      .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                  "
                  label="Externen Link öffnen"
                  dense
                  glossy
                  color="purple-4"
                  no-caps
                  :href="
                    localStore.state
                      .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                  "
                  type="a"
                  target="_blank"
                />
              </q-item>
              <q-item dense class="bg-green--1 row justify-center">
                <q-btn
                  icon="library_books"
                  :disable="
                    !localStore.state
                      .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                  "
                  label="OneDrive-Link öffnen"
                  dense
                  glossy
                  color="light-blue-7"
                  no-caps
                  :href="
                    localStore.state
                      .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                  "
                  type="a"
                  target="_blank"
                />
              </q-item>
            </div>
          </q-list>
        </q-expansion-item>
        <!-- NEU - #353 - TODO XXXXXX - provisorisch AUCH mit Infos zur Bauinformation für Baueigenschaft an Baustoff und Baueinheit, nicht nur -->
        <!-- für ausgewählte Bauinformation in bauinformationen.vue - Unterscheidung jeweils per $route.name -->
        <q-expansion-item
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="library_books"
          :header-inset-level="0"
          label="Bauinformation"
          label-lines="1"
          :caption="
            $route.name === 'Baustoffe'
              ? localStore.state
                  .anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              : localStore.state
                  .anzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
          "
        >
          <q-list dense>
            <!-- ALT: -->
            <!--
            <q-item dense class="bg-green-1">
              <q-markdown :src="fachlicheHilfeMarkdownDefault" />
            </q-item>
            -->
            <!-- NEU: #353, hier testweise Anzeigetext und Links anzeigen von zugeordneter Bauinformation an Baueigenschaft aus Baustoff: -->
            <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .internerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              }}
            </q-item>
            -->
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  $route.name === 'Baustoffe'
                    ? !localStore.state
                        .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    : !localStore.state
                        .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="Internen BIM.click-Link öffnen"
                dense
                glossy
                color="light-green"
                no-caps
                @click="
                  $route.name === 'Baustoffe'
                    ? openInternerLinkBauinformation(
                        localStore.state
                          .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                      )
                    : openInternerLinkBauinformation(
                        localStore.state
                          .idInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                      )
                "
              />
            </q-item>
            <!--
            <q-item dense class="bg-green-1">
              {{
                localStore.state
                  .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
              }}
            </q-item>
            -->
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  $route.name === 'Baustoffe'
                    ? !localStore.state
                        .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    : !localStore.state
                        .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="Externen Link öffnen"
                dense
                glossy
                color="purple-4"
                no-caps
                :href="
                  $route.name === 'Baustoffe'
                    ? localStore.state
                        .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    : localStore.state
                        .externerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheitstoff
                "
                type="a"
                target="_blank"
              />
            </q-item>
            <q-item dense class="bg-green--1 row justify-center">
              <q-btn
                icon="library_books"
                :disable="
                  $route.name === 'Baustoffe'
                    ? !localStore.state
                        .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    : !localStore.state
                        .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit
                "
                label="OneDrive-Link öffnen"
                dense
                glossy
                color="light-blue-7"
                no-caps
                :href="
                  $route.name === 'Baustoffe'
                    ? localStore.state
                        .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff
                    : localStore.state
                        .oneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheitstoff
                "
                type="a"
                target="_blank"
              />
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- NEU: Prototypische Erweiterung der fachlichen Hilfe für profilspezifische Hilfeinhalte für Baueigenschaftsprofilformulare -->
        <!-- (d.h. fachliche Hilfe für die profilspezifischen Unter-Tabs unter "Baueinheit" > "Fachliche Planung") -->
        <!-- TODO: Diese könnte auch als Kind der fachlichen Hilfe für "Baueinheit" angezeigt werden statt hier auf der obersten Ebene der fachlichen Hilfe -->
        <!-- Dafür neu hinzugefügte Felder im global Store, z.B. -->
        <!-- localStore.state.baueigenschaftsProfilBezeichnung - diese müssen bei der Anwahl eines Baueigenschaftsprofils (bzw. Unter-Tabs) korrekt gesetzt werden, z.B. mit "Raum" -->
        <!-- Dito für localStore.state.baueigenschaftsProfilBeschreibung, welches mit einer fachlichen Hilfe (Markdown-Format) gefüllt sein muss -->
        <!-- Dieses Feld ist durch einen Admin editierbar unter "Baueigenschaften" > "Baueigenschaftsprofile" > "Details" > "Beschreibung" -->
        <!-- In diesem Markdown können leicht auch Images eingebettet wereen. -->
        <!-- HINWEIS: So wird natürlich die Profilbeschreibung "missbraucht" als Profilformularbeschreibung! -->
        <!-- HINWEIS: Für die Unterstrukturen (Unter-Tabs und Rubriken) eines Profilformulars wird ebenfalls fachliche Hilfe benötigt. -->
        <!-- Diese sind aber bisher keine First Class Citizens, die per Admin UIs verwaltet werden können, sondern sind über die Komponenten für die Profilformulare -->
        <!-- und deren zugehörige Layxout Files hart codiert. -->
        <!-- Solange das so ist, müsste dieser Content über ein JS-File geladen werden bei der Anwahl von Unter-Tabs und Rubriken von Profilformularen -->
        <!-- Dieses Help File für ein Profilformular wäre dann ein Pendant zum Layout File für ein Profilformular, -->
        <!-- Besser aber ist es nur eine Erweiterung des Layout Files, da die Überschriften für Tabs und Rubriken sowohl in der fachlichen Hilfe als auch im Profilformular benötigt werden -->
        <!-- und nicht doppelt verwaltet werden sollten! -->
        <!-- Insofern müssen dafür im Layout File neue Felder mit Beschreibungen (= Mardkdown Content) eingefügt werden -->
        <!-- z.B.: -->
        <!--   beschreibungTab -->
        <!--   beschreibungRubrik -->
        <!-- Erster Test dieser Mechanik in layout-baueinheit-raum-baueigenschafts-profil-formular.js und raum-paueigenschafts-rofil-formular.vue (Unter-Tab "Boden/Decke") -->
        <!-- Es ist Multline Markdown für solche Markdown-Felder im Layout File möglich, einige Hinweise dazu in bedienungs-hilfe-verzeichnis.js ) -->
        <!-- Es ist möglich, dort auch Bilder in den Markdown einzufügen mittels Links, ![..](..), siehe layout-baueinheit-raum-baueigenschafts-profil-formular mit Testbeispiel -->
        <!-- Leider funktinonieren aber im Multiline-Markdown z.B. Markdown Container (::: .. :::) nicht richtig! -->
        <!-- Bei Tests mit Markdown Files als Quelle für q-markdown (z.B. fachliche-hilfe-markdown-default) funktioniern diese Dinge dagegen einwandfrei. -->
        <!-- --------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Alternativ müssten folglich wohl besser separate Markdown Files geladen werden, deren Dateinamen im Layout-File gehalten werden müssten bzw. die -->
        <!-- über eine Id und v-if-Steuerung ausgewählt würden im Template von my-layout.vue, wo die fachliche Hilfe angezeigt wird --->
        <!-- Siehe dazu als Vorlage in bedienungs-hilfe-verzeichnis.js das Feld markdownFileName: -->
        <!-- Per -->
        <!--   import markdown from "../markdown/markdown-file.md" " -->
        <!-- und -->
        <!--   ":src=markdown --->
        <!-- können ganze Markdown Files angezeigt werden, allerdings ist dann eine zusätzliche Steuerung notwendig, wann welches File geladen werden soll -->
        <!-- Siehe dazu das Beispiel in bedienungs-hilfe-verzeichnis.js: -->
        <!--
            <q-markdown
              v-if="currentTopicContextHelp === 100"
              :src="bedienungsHilfeMarkdownDefault"
            />
        -->
        <!-- Ob der Wechsel des Hilfe-Contents beim Tab-Wechsel von Profilformularen (mit keep alive) gelingt, ist noch zu testen -->
        <q-expansion-item
          ref="fachlicheHilfeBaueigenschaftProfilformulare"
          switch-toggle-side
          dark
          expand-separator
          dense
          group="accordeon-group-rechts"
          header-class="bg-green-5 text-white shadow-2"
          icon="edit_note"
          :header-inset-level="0"
          label="Fachliche Planung"
          label-lines="1"
          expand-icon-class="text-white"
          :caption="localStore.state.baueigenschaftsProfilBezeichnung"
        >
          <q-list dense>
            <!-- ACHTUNG: Ohne q-items um {{ .. }} und <q-markdown> .. </q-markdown> erfolgt kein korrekter Zeilenumbruch! -->
            <!-- TODO: Hier unter-Expansion-Items verwenden wie in Bedienungshilfe -->
            <q-item dense class="bg-green-1">
              Fachliche Hilfe für Profilformular &nbsp;
              <b> "{{ localStore.state.baueigenschaftsProfilBezeichnung }}" </b>
            </q-item>
            <q-item dense class="bg-green-1">
              <!-- localStore.state.baueigenschaftsProfilBeschreibung ist reaktives Objekt -->
              <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
              <!-- ACHTUNG: Dieses Feld müsste im global Store mit Beschreibung (Markdown) des Profils gesetzt werden, aktuell noch nicht implementiert -->
              <!--          in baueinheit-raum-baueigenschafts-profil-formular.vue, setzeProfilFormularBezogeneFachlicheHilfe() -->
              <q-markdown
                v-if="
                  localStore.state.baueigenschaftsProfilBeschreibung !==
                    undefined &&
                    localStore.state.baueigenschaftsProfilBeschreibung !== null
                "
                :src="localStore.state.baueigenschaftsProfilBeschreibung"
              />
              <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
              <q-markdown v-else :src="fachlicheHilfeMarkdownDefault" />
            </q-item>
            <q-list dense>
              <!-- ACHTUNG: Ohne q-items um {{ .. }} und <q-markdown> .. </q-markdown> erfolgt kein korrekter Zeilenumbruch! -->
              <q-item dense class="bg-green-1">
                <!-- localStore.state.baueigenschaftsProfilTabUeberschrift ist reaktives Objekt -->
                <!-- (String im Markdown-Format) das über den globalen Store synchronisiert wird. -->
                Ausgewähltes Unter-Tab: &nbsp;
                <b>
                  "{{ localStore.state.baueigenschaftsProfilTabUeberschrift }}"
                </b>
              </q-item>
              <q-item dense class="bg-green-1">
                <q-markdown
                  v-if="
                    localStore.state.baueigenschaftsProfilTabBeschreibung !==
                      undefined &&
                      localStore.state.baueigenschaftsProfilTabBeschreibung !==
                        null
                  "
                  :src="localStore.state.baueigenschaftsProfilTabBeschreibung"
                />
                <!-- Test-Markdown, der per v-else ansonsten angezeigt wird: -->
                <q-markdown v-else :src="fachlicheHilfeMarkdownDefault" />
              </q-item>
            </q-list>
          </q-list>
        </q-expansion-item>
      </q-list>
      <!-- /Fachliche Hilfe -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- Start Bedienungshilfe -->
      <!-- ALT: bordered am q-list - entfernt! -->
      <q-list class="bg-cyan-8">
        <div class="text-white text-h7 text-weight-medium">
          <q-icon name="help" size="24px" left />
          Bedienungshilfe
        </div>
        <q-expansion-item
          ref="bedienungsHilfeBauvorhaben"
          label="Bauvorhaben"
          switch-toggle-side
          expand-separator
          dense
          dark
          icon="apartment"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-card dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/4-Bauvorhaben"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item dense class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          ref="bedienungsHilfeBaustoffe"
          label="Baustoffe"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="build"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/5-Baustoffe"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item dense class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                TODO: Hier Bedienungshilfe für Baustoffbaum
                <!-- Debug-Info für ältere Variante mit Steuerung des Öffnens der Expansion Items über :value und Store Variablen, statt über show per Event -->
                <!--
              <font size="1">
                <br />
                localStore.state:
                <br />
                .isSelectedStrukturierungsAngabenBaustoffe:
                {{ localStore.state.isSelectedStrukturierungsAngabenBaustoffe }}
                <br />
                .isSelectedBaueigenschaftenBaustoffe:
                {{ localStore.state.isSelectedBaueigenschaftenBaustoffe }}
                <br />
                .isSelectedZugeordneteBauinformationenBaustoffe:
                {{
                  localStore.state.isSelectedZugeordneteBauinformationenBaustoffe
                }}
                <br />
                .isSelectedAbhaengigeBaustoffeBaustoffe:
                {{ localStore.state.isSelectedAbhaengigeBaustoffeBaustoffe }}
              </font>
              --></div>
            </q-item>
          </q-list>
          <q-expansion-item
            ref="bedienungsHilfeStrukturierungsaAngabenBaustoffe"
            label="Strukturierungsangaben"
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            dense
            dark
            group="accordeon-group-2-bedienungsHilfe"
            header-class="bg-cyan-5 text-black shadow-2"
            :header-inset-level="0.2"
            label-lines="1"
          >
          </q-expansion-item>
          <q-expansion-item
            ref="bedienungsHilfeBeschreibungBaustoffe"
            label="Beschreibung"
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            dense
            dark
            group="accordeon-group-2-bedienungsHilfe"
            header-class="bg-cyan-5 text-black shadow-2"
            :header-inset-level="0.2"
            label-lines="1"
          >
            <q-list dense>
              <q-item dense class="bg-cyan-4 row justify-center">
                <q-btn
                  icon="menu_book"
                  to="/Dokumentation/11-Hilfe"
                  label="Dokumentation öffnen"
                  dense
                  glossy
                  color="teal-7"
                  no-caps
                />
              </q-item>
              <q-item dense class="bg-cyan-4">
                <q-markdown
                  :src="bedienungsHilfeMarkdownBeschreibungBaustoffe"
                />
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item
            ref="bedienungsHilfeBaueigenschaftenBaustoffe"
            label="Baueigenschaften"
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            dense
            dark
            group="accordeon-group-2-bedienungsHilfe"
            header-class="bg-cyan-5 text-black shadow-2"
            :header-inset-level="0.2"
            label-lines="1"
          >
            <q-list dense>
              <q-item dense class="bg-cyan-4 row justify-center">
                <q-btn
                  icon="menu_book"
                  to="/Dokumentation/2-Baueigenschaften"
                  label="Dokumentation öffnen"
                  dense
                  glossy
                  color="teal-7"
                  no-caps
                />
              </q-item>
              <q-item dense class="bg-cyan-4">
                <div v-if="localStore.state.debugMode">
                  <!-- Debug-Info für ältere Variante mit Steuerung des Öffnens der Expansion Items über :value und Store Variablen, statt über show per Event -->
                  <!--
                <font size="1">
                  localStore.state:
                  .isSelectedUebersichtBaueigenschaftenBaustoffe:
                  {{
                    localStore.state
                      .isSelectedUebersichtBaueigenschaftenBaustoffe
                  }}
                  <br />
                  .isSelectedAuswahlBaueigenschaftenBaustoffe:
                  {{
                    localStore.state
                      .isSelectedAuswahlBaueigenschaftenBaustoffe
                  }}
                  <br />
                  .isSelectedNeuBaueigenschaftenBaustoffe
                  {{
                    localStore.state.isSelectedNeuBaueigenschaftenBaustoffe
                  }}
                </font>
                --></div>
              </q-item>
            </q-list>
            <q-expansion-item
              ref="bedienungsHilfeUebersichtlBaueigenschaftenBaustoffe"
              label="Übersicht"
              switch-toggle-side
              expand-icon-toggle
              expand-separator
              dense
              dark
              group="accordeon-group-3-bedienungsHilfe"
              header-class="bg-cyan-3 text-black shadow-2"
              :header-inset-level="0.4"
              label-lines="1"
            >
              <q-list dense>
                <q-item dense class="bg-cyan-2">
                  <q-markdown :src="bedienungsHilfeMarkdownDefault" />
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item
              ref="bedienungsHilfeAuswahlBaueigenschaftenBaustoffe"
              label="Auswahl"
              switch-toggle-side
              expand-icon-toggle
              expand-separator
              dense
              dark
              group="accordeon-group-3-bedienungsHilfe"
              header-class="bg-cyan-3 text-black shadow-2"
              :header-inset-level="0.4"
              label-lines="1"
            >
              <q-list dense>
                <q-item dense class="bg-cyan-2">
                  <q-markdown
                    :src="
                      bedienungsHilfeMarkdownAuswahlBaueigenschaftenBaustoffe
                    "
                  />
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item
              ref="bedienungsHilfeNeuBaueigenschaftenBaustoffe"
              label="Neu"
              switch-toggle-side
              expand-icon-toggle
              expand-separator
              dense
              dark
              group="accordeon-group-3-bedienungsHilfe"
              header-class="bg-cyan-3 text-black shadow-2"
              :header-inset-level="0.4"
              label-lines="1"
            >
              <q-list dense>
                <q-item dense class="bg-cyan-2">
                  <q-markdown
                    :src="bedienungsHilfeMarkdownNeuBaueigenschaftenBaustoffe"
                  />
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-expansion-item>
          <!-- /Baueigenschaften -->
          <q-expansion-item
            ref="bedienungsHilfeZugeordneteBauinformationenBaustoffe"
            label="Relevante Bauinformationen"
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            dense
            dark
            group="accordeon-group-2-bedienungsHilfe"
            header-class="bg-cyan-5 text-black shadow-2"
            :header-inset-level="0.2"
            label-lines="1"
          >
          </q-expansion-item>
          <q-expansion-item
            ref="bedienungsHilfeAbhaengigeBaustoffeBaustoffe"
            label="Abhängige Baustoffe"
            switch-toggle-side
            expand-icon-toggle
            expand-separator
            dense
            dark
            group="accordeon-group-2-bedienungsHilfe"
            header-class="bg-cyan-5 text-black shadow-2"
            :header-inset-level="0.2"
            label-lines="1"
          >
          </q-expansion-item>
        </q-expansion-item>
        <!-- /Baustoffe -->
        <q-expansion-item
          ref="bedienungsHilfeBauinformationen"
          label="Bauinformationen"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="library_books"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/6-Bauinformationen"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- /Bauinformationen -->
        <q-expansion-item
          ref="bedienungsHilfeAuswertungen"
          label="Auswertungen"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="wb_incandescent"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/7-Auswertungen"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- /Auswertungen, hieß früher /Validierung/Optimierung -->
        <q-expansion-item
          ref="bedienungsHilfeDatenaustausch"
          label="Datenaustausch"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="import_export"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/8-Datenaustausch"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- /Datenaustausch -->
        <q-expansion-item
          ref="bedienungsHilfeEinstellungen"
          label="Einstellungen"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="playlist_add_check"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/9-Einstellungen"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- /Einstellungen -->
        <q-expansion-item
          ref="bedienungsHilfeDokumentation"
          label="Dokumentation"
          switch-toggle-side
          expand-icon-toggle
          expand-separator
          dense
          dark
          icon="menu_book"
          group="accordeon-group-1-bedienungsHilfe"
          header-class="bg-cyan-7 text-white shadow-2"
          :header-inset-level="0"
          label-lines="1"
        >
          <q-list dense>
            <q-item dense class="bg-cyan-6 row justify-center">
              <q-btn
                icon="menu_book"
                to="/Dokumentation/10-Dokumentation"
                label="Dokumentation öffnen"
                dense
                glossy
                color="teal-7"
                no-caps
              />
            </q-item>
            <q-item class="bg-cyan-6">
              <div v-if="localStore.state.debugMode">
                <font size="1"> </font>
              </div>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- /Dokumentation -->
      </q-list>
      <div class="row full-width q-pa-sm q-gutter-x-xs bg-cyan-1"></div>
      <!-- /Bedienungshilfe -->
    </q-drawer>
    <!-- --------------------------------------------------------------------------------------------------------------------------------- -->
    <q-page-container>
      <!-- VUE3: KEINE KOMMENTARE IN KEEP-alive Block -->
      <!-- <div id="q-app" class="q-pa-md q-mt-xs q-gutter-md">
        <q-btn color="white" text-color="black"  @click="$router.replace('/')"label="Anzeigen" />
        <q-btn color="primary"  @click="$router.replace('/add')" label="Hinzufügen" />
        <q-btn color="secondary"  @click="$router.replace('/search')" label="Suchen" />
      </div> -->

      <!-- NEU: Vue Element Keep alive, um Vue Komponenten in Memory zu halten, -->
      <!-- Ursprünglich nur für Komponenten Dokumentation, Bauinformationen, Baustoffe, Baueinheiten  -->
      <!-- Siehe https://vuejs.org/v2/api/#keep-alive und https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components -->
      <!-- Keep alive funktionierte für Baustoffe u.a. Komponenten, aber zunächst NICHT für Dokumentation, welche spezielles Routing mit Id hat -
      >1-- diese wurde stets neu geladen und mounted aufgerufen, was auch Scrolling auslöst -->
      <!-- Dies lag allerdings an der :key Prop - diese entfernt - siehe unten -->

      <!-- ACHTUNG: Die Komponenten-Namen müssen mit Komma getrennt werden, aber OHNE Blanks!!! -->
      <!-- ACHTUNG: Der Komponentenname muss in der Komponente per name: gesetzt werden, sonst funktioniert es NICHT, dabei auf Groß-/Kleinschreibung achten! -->
      <!-- TODO: MyLayout auch aufnehmen in <keep-alive>??? Testweise probiert, hat keinen unmittelbar erkennbaren Effekt -->

      <!-- NEU: -->
      <!-- Um zu verhindern, dass nach Logout die Komponenten einfach auf den alten Daten weiterarbeiten: -->
      <!-- Keep alive nur noch aktiv, wenn Benutzer angemeldet ist -->
      <!-- Siehe https://stackoverflow.com/questions/52967418/refresh-pages-in-vue-js-keep-alive-section -->
      <keep-alive
        v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer"
        include="Baueinheiten,Baustoffe,Baueigenschaften,BaueigenschaftsProfile,Bauinformationen,BauinformationsProfile,Auswertungen,Datenaustausch,Einstellungen,Dokumentation,Verwaltung"
      >
        <router-view />
      </keep-alive>
       <!-- ALT: -->
          <!-- Vue-Befehl - hier injected der Router die Pages -->
          <!-- NEU: -->
          <!--  <router-view :key="$route.fullPath"> -->
          <!-- :key Prop: Siehe https://itnext.io/yes-this-is-how-to-cache-pages-by-url-with-vue-vue-router-and-keep-alive-component-697ed76896e8 -->
          <!-- :key bewirkt, dass die Dokumentations-Komponente re-rendered wird, wenn der Key ("/Dokumentation/3") verschieden ist, -->
          <!-- obwohl die Komponente "Dokumentation" immer dieselbe ist, weshalb Vue default-mäßig kein Rerendering macht! -->
          <!-- Dies scheint aber eher für den Fall zu sein, dass man gleichzeitig verschiedene Tabs mit derselben Komponente anzeigen will, -->
          <!-- der Fall hier ist anders, man will ggf. die Dokumentations-Komponente auch bei Anwahl über das Tab oben im Hauptmenü mit der zuvor -->
          <!-- im Dokumentationsverzeichnis ausgewählten Id (= Prop) anzeigen, nicht mit Id "1" -->

          <!-- Dies wird auch durch Tests MIT dieser :key Prop bestätigt - es wird dann die Dokumentation immer wieder neu geladen bei Klick auf das -->
          <!-- Dokumentations-Tab oben in der Menüleiste, sie läuft dann durch Mounted: und scrolled zur Dokumentations-Id "1". -->
          <!-- Daher ist für unseren Fall eher die Variante OHNE :key richtig!!! -->

          <!-- Tests OHNE diese :key Prop ergeben ein anderes Verhalten: In diesem Fall wird bei Klick auf Dokumentationsverzeichniseintrag -->
          <!-- Watch: von Dokumentation aufgerufen (welcher mit der :key Prop nie aufgerufen wurde!), und auch beim Klick auf das Tab Dokumentation oben  -->
          <!-- in der Menüleiste, dann allerdings mit Id "1"! -->
          <!--  -->
          <!-- In https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes wird empfohlen, -->
          <!-- auf Route Changes zu reagieren per weiterem Watch in Dokumentation.vue, per watch:{ '$route' (to, from) {// react to route changes...} } -->
          <!-- Tests damit ergaben aber, dass dieser Watch im Grunde nur nach dem schon vorhandenen Watch aufgerufen wird -->
          <!-- Wechselt nicht die Komponente, werden die Lifecycle Hooks nicht aufgerufen (mounted, watch???) -->
      <!-- NEU - in Verbindung mit obigem v-if, wenn Benutzer nicht angemeldet ist: -->
      <!-- <router-view v-else></router-view> -->
      <!-- ---------------------------------------------------------------------------------------------------- -->
      <!-- NEU - zusätzliche QPageScroller mit Buttons zum Scrollen an das Ende oder den Anfang: -->
      <!-- ACHTUNG - TODO XXXXXX: Dieser wurde offenbar durch QFab (Floating Action Button) ersetzt in Quasar v1.18 und v2.x -->
      <!-- https://v1.quasar.dev/layout/page-scroller#introduction -->
      <!-- https://v1.quasar.dev/vue-components/floating-action-button#introduction -->
      <!-- -->
      <div v-if="!localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer">
        <q-page-scroller
          position="top-right"
          :scroll-offset="80"
          :offset="[16, 4]"
        >
          <q-btn fab-mini glossy icon="keyboard_arrow_up" color="accent" />
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="600px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Nach ganz oben scrollen
          </q-tooltip>
        </q-page-scroller>
        <!-- ACHTUNG: :scroll-offset="200" funktioniert irgendwie nicht bei reverse, Button wird immer angezeigt! -->
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="80"
          reverse
          :offset="[16, 4]"
        >
          <q-btn fab-mini glossy icon="keyboard_arrow_down" color="accent" />
          <q-tooltip
            :delay="1000"
            :offset="[0, 10]"
            max-width="600px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            Nach ganz unten scrollen
          </q-tooltip>
        </q-page-scroller>
      </div>
      <!-- ---------------------------------------------------------------------------------------------------- -->
    </q-page-container>

    <!-- ================================================================================================================================================================================ -->
    <!-- ACHTUNG: QFooter Höhe kann mit style="height:3vh" oder style="height:30px" beeinflussst werden, aber Positionierung des Textes ist dann schwierig, daher wird Höhe von Quasar gesteuert -->
    <!-- Siehe https://forum.quasar-framework.org/topic/7810/how-to-i-set-a-custom-footer-height -->
    <!-- Weiterer Tipp: https://forum.quasar-framework.org/topic/2511/solved-change-height-of-top-toolbar-when-running-pwa-standalone -->
    <!-- v-bind:style="{ height: 30 + 'px', 'padding-top': 5 + 'px', 'padding-bottom': 5 +'px' }" - funktioniert auch nicht -->
    <!-- Multiple stlyes in einem style tag: https://stackoverflow.com/questions/31202996/assigning-multiple-styles-on-an-html-element -->
    <!-- style="max-height:35px; text-align:center" - funktioniert auch nicht -->
    <!-- ACHTUNG: :reveal-offset wie am QHeader gibt es nicht am QFooter API! -->
    <!-- ================================================================================================================================================================================ -->
    <!-- <q-footer elevated class="bg-primary" bordered style="max-height:44px"> --> <!-- ALT -->
    <!-- ALT: 'bordered' sieht blöd aus bei bg-grey-4, daher diese Prop aktuell am q-header und q-footer entfernt! -->
    <!-- ACHTUNG: Allerdings musst dann max-height:44px auf 50px erhöht werden, weil sonst ganz unten ein dünner weißer Strich stört!!! -->
    <q-footer
        elevated
       :class="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? 'bg-grey-4 text-black'
            : 'bg-primary text-white'
        "
        style="max-height:50px"
    >
      <!-- ALT: reveal - entfernt mit view="fff" am q-layout (siehe oben)-->
      <!-- ALT: class="bg-primary text-white glossy" -->
      <!-- NEU: Farbe gemäß einstellbarem Farbschema, nach oben an den q-footer verschoben -->
      <q-toolbar
      >
        <!-- NEU -->
        <!-- <q-toolbar-title> -->
        <!-- q-toolbar-title hier entfernt, da sonst der Text auf Mobilgeräten abgeschnitten wird! -->
        <div class="text-caption text-weight-regular">
          <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"> -->
          © 2022 BIM.<em>live</em> UG / Kurz & Fischer GmbH
        </div>
        <!-- </q-toolbar-title> -->
        <!-- NEU: Laufschrift mit Vue Marquee Komponente, nur am Desktop -->
        <q-toolbar-title
        >
          <marqueeText
            v-if="
              !localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer &&
                $q.screen.gt.sm
            "
            class="text-caption"
            :duration="45"
            :paused="pauseMarquee"
          >
            <div v-if="showMarqueeText">
              <div :class="localStore.state.einstellungenBenutzer.farbSchema === 'grau'
                ? 'text-bold text-pink-7'
                : 'text-bold text-lime-13'
              ">
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ■■■■■■ ■■■■■■ ■■■■■■ Neu in BIM.click V1.0.58 ■■■■■■ ■■■■■■ ■■■■■■
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Umschaltbares Farbschema in "Einstellungen" ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ OneDrive-Integration in "Bauinformationen" ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Asynchrone Ausführung von langlaufenden Jobs am Server ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Layoutgesteuertes generisches Profilformular zur Anzeige von fachlichen Daten von Baustoffen ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Selektive Anlage von Baueigenschaften nur im Baustoff- oder nur im Bauvorhabenbaum ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Umbenennung aller Baueigenschaften und Baueigenschaftsprofile nach aktuellem Bezeichnungsschema ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Verbesserte Anzeige auf mobilen Geräten (PWA-Modus mit Hamburger-Menü) ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Baueigenschaftsprofile für Baustoffe ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Kontextmenüs für Profilaktivierung im Baustoffbaum ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Formulare für fachliche Daten von Baustoffen ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Filtern in zugeordneten Baustoffen an Baueinheiten ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Überarbeitung von Bodenaufbau und Schichten ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Excel-Ausgabe von Bodenaufbau- und Schichtinformationen in Bauteilkatalog ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Felder für Schnee-, Wind- und Erdbebenlasten in 'Standort' > 'Umwelt' ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■■■■■■ Vorhandene Bodenaufbauten, Schichten und Standorte erfordern eine Deaktivierung und Neuaktivierung ihrer Profile zur Nutzung ■■■■■■&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </marqueeText>
        </q-toolbar-title>
        <!-- <q-space> </q-space> -->
        <!-- ALT: -->
        <!-- class="bg-red text-white glossy" -->
        <div v-if="localStore.state.debugMode" class="text-caption">
          localStore.state.anmeldeDatenBenutzer - istAbgemeldetBenutzer:
          <strong class="text-orange">
            {{ localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer }}
          </strong>
          eMailBenutzer:
          <strong class="text-orange">
            {{ localStore.state.anmeldeDatenBenutzer.eMailBenutzer }}
          </strong>
          benutzerRolle:
          <strong class="text-orange">
            {{ localStore.state.anmeldeDatenBenutzer.benutzerRolle }}
          </strong>
        </div>
        <!-- ----------------------------------------------------- -->
        <!-- NEU: QRouteTabs für Impressum und Datenschutz: -->
        <q-tabs
          mobile-arrows
          align="right"
          active-color="primary"
          active-bg-color="white inset-shadow"
          indicator-color="primary"
          content-class="text-h7"
          dense
        >
          <q-route-tab to="/Impressum" label="Impressum" no-caps />
          <q-route-tab to="/Datenschutz" label="Datenschutz" no-caps />
        </q-tabs>
        <!-- ----------------------------------------------------- -->
        <q-banner
          v-if="localStore.state.showBenutzerNachricht"
          dense
          rounded
          inline-actions
          :class="localStore.state.classBenutzerNachricht"
        >
          <template v-slot:default>
            {{ localStore.state.inhaltBenutzerNachricht }}
          </template>
          <template v-slot:action>
            <q-btn
              dense
              flat
              round
              glossy
              icon="cancel"
              @click="hideBenutzerNachricht()"
            />
            <!-- Immer wieder erstaunlich: @click="localStore.hideBenutzerNachricht()"" funktioniert auch!!! -->
            <!-- Sicherheitshalber aber lieber über lokale Helper-Funktion hideBenutzerNachricht() doch -->
            <!-- globalStore.hideBenutzerNachricht() aufgerufen -->
          </template>
        </q-banner>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

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
<!-- ================================================================================================================================================= -->
<script>
// NEU:
import MarqueeText from "vue-marquee-text-component"; // NEU - für Laufschrift unten, https://www.npmjs.com/package/vue-marquee-text-component
// npm install vue-marquee-text-component@1.2.0 // ACHTUNG: Unbedingt @1.2.0, sonst wird Vue 3 vorausgesetzt!

// const appRoot = require("app-root-path"); // NEU: Für dynamische Bestimmung des App Root Paths (für Heroku Cloud Deployment)
// Funktioniert nicht - siehe routes.js - daher einstweilen disabled

// import { openURL} from "quasar" // Hier nicht benötigt, disabled
// import { colors } from "quasar"; // Für Ermittlung von Hex Codes von Quasar Palette Colors - siehe unten, disabled

// NEU (require, absolute Pfade mit appRoot):
/*
const BenutzerNachrichten = require(appRoot +
  "/src/modules/benutzer-nachrichten.js");
const BenutzerNachrichtenTypen = require(appRoot +
  "/src/modules/benutzer-nachrichten-typen.js");
*/
// ALT (import, relative Pfade ohne appRoot):
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";

// Markdown für fachliche Hilfe im rechten Auszug, genutzt von QMarkdown App Extension:
// NEU (require, absolute Pfade mit appRoot):
/*
const fachlicheHilfeMarkdownDefault = require(appRoot +
  "/src/markdown/fachliche-hilfe-markdown-default.md");
const fachlicheHilfeMarkdownEstriche = require(appRoot +
  "/src/markdown/fachliche-hilfe-markdown-estriche.md");
*/
// ALT (import, relative Pfade ohne appRoot):
import fachlicheHilfeMarkdownDefault from "../markdown/fachliche-hilfe-markdown-default.md";
import fachlicheHilfeMarkdownEstriche from "../markdown/fachliche-hilfe-markdown-estriche.md";

// Markdown für Bedienungshilfe im rechten Auszug, genutzt von QMarkdown App Extension:
// NEU (require, absolute Pfade mit appRoot):
/*
const bedienungsHilfeMarkdownDefault = require(appRoot +
  "/src/markdown/bedienungs-hilfe-markdown-default.md");
const bedienungsHilfeMarkdownBeschreibungBaustoffe = require(appRoot +
  "src/markdown/bedienungs-hilfe-markdown-beschreibung-baustoffe.md");
const bedienungsHilfeMarkdownAuswahlBaueigenschaftenBaustoffe = require(appRoot +
  "src/markdown/bedienungs-hilfe-markdown-auswahl-baueigenschaften-baustoffe.md");
const bedienungsHilfeMarkdownNeuBaueigenschaftenBaustoffe = require(appRoot +
  "src//markdown/bedienungs-hilfe-markdown-neu-baueigenschaften-baustoffe.md");
*/
// ALT (import, relative Pfade ohne appRoot):
import bedienungsHilfeMarkdownDefault from "../markdown/bedienungs-hilfe-markdown-default.md";
import bedienungsHilfeMarkdownBeschreibungBaustoffe from "../markdown/bedienungs-hilfe-markdown-beschreibung-baustoffe.md";
import bedienungsHilfeMarkdownAuswahlBaueigenschaftenBaustoffe from "../markdown/bedienungs-hilfe-markdown-auswahl-baueigenschaften-baustoffe.md";
import bedienungsHilfeMarkdownNeuBaueigenschaftenBaustoffe from "../markdown/bedienungs-hilfe-markdown-neu-baueigenschaften-baustoffe.md";

// NEU: Selbst implementierter global Store für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
// NEU (require, absolute Pfade mit appRoot):
// var globalStore = require(appRoot + "/src/modules/global-store");
// ALT (import, relative Pfade ohne appRoot):
import { globalStore } from "../modules/global-store";

// NEU (require, absolute Pfade mit appRoot):
/*
const dokumentationsVerzeichnis = require(appRoot +
  "/src/modules/dokumentations-verzeichnis"); // NEU, konstantes File mit JS Array für Dokumentationsverzeichnis-Struktur
const bedienungsHilfeVerzeichnis = require(appRoot +
  "/src/modules/bedienungs-hilfe-verzeichnis"); // NEU, konstantes File mit JS Array für Bedienungshilfeverzeichnis-Struktur
*/
// ALT (require, relative Pfade ohne appRoot)
const dokumentationsVerzeichnis = require("../modules/dokumentations-verzeichnis"); // NEU, konstantes File mit JS Array für Dokumentationsverzeichnis-Struktur
const bedienungsHilfeVerzeichnis = require("../modules/bedienungs-hilfe-verzeichnis"); // NEU, konstantes File mit JS Array für Bedienungshilfeverzeichnis-Struktur
// import bedienungsHilfeVerzeichnis from "../modules/bedienungsHilfeVerzeichnis"; // ALT

// ACHTUNG: Wenn module.exports, dann require, nicht import
// Siehe auch: https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x/46677972

//***--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  name: "MyLayout", // Vue Component Name, , auf Groß-/Kleinschreibung achten!
  components: {
    // NEU: Vue-Komponente für Marquee-Laufschrift
    marqueeText: MarqueeText
  },
  data() {
    return {
      anzeigeVorName: "", // NEU: Im Rahmen von #285 e) aus Security-Gründen die Anzeige des Vornamens unter dem Bild rechts von benutzer.vorName in diese eigene Variable verlagert
      anzeigeNachName: "", // NEU: Im Rahmen von #285 e) aus Security-Gründen die Anzeige des Nachnamens unter dem Bild rechts von benutzer.nachName in diese eigene Variable verlagert
      kennWortBestaetigung: "",
      registrierungPending: false, // NEU: Zur Steuerung der Eingabn (2. Kennwortfeld und Button) bei Registrierung
      // Wird beim 1. Klick auf Button "Registrieren" auf true gesetzt!
      // Muss in registrierenBenutzer zurückgesetzt werden!
      isPwd: true, // NEU: Zur Steuerung der Sichtbarkeit der Eingabe für kennWortfeld, siehe https://quasar.dev/vue-components/input#Input-types
      benutzer: { vorName: "", nachName: "", eMail: "", kennWort: "" }, // NEU: Benutzerinformationen für Authorisierung
      // debugMode: false, // Zeigt für Debugging ggf. diverse interne Objekte an am User Interface - NEU: Ersetzt durch local/globalStore.state.debugMode
      showBannerMessageFooter: true, // NEU: Für Anzeige Banner Message im Footer
      showCurrentTopicContextHelp: null,
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.
      // Wird u.a. erwendet zur Steuerung der Bedienungshilfe im rechten Drawer

      // Variablen für Markdown für die fachliche Hilfe im rechten Drawer
      fachlicheHilfeMarkdownDefault: fachlicheHilfeMarkdownDefault,
      fachlicheHilfeMarkdownEstriche: fachlicheHilfeMarkdownEstriche,

      // Variablen für Markdown für die Bedienungshilfe im rechten Drawer
      bedienungsHilfeMarkdownDefault: bedienungsHilfeMarkdownDefault,
      bedienungsHilfeMarkdownBeschreibungBaustoffe: bedienungsHilfeMarkdownBeschreibungBaustoffe,
      bedienungsHilfeMarkdownAuswahlBaueigenschaftenBaustoffe: bedienungsHilfeMarkdownAuswahlBaueigenschaftenBaustoffe,
      bedienungsHilfeMarkdownNeuBaueigenschaftenBaustoffe: bedienungsHilfeMarkdownNeuBaueigenschaftenBaustoffe,

      leftDrawerOpen: this.$q.platform.is.desktop,
      left: false, // Steuert linken Drawer/Auszug
      right: false, // Steuert rechten Drawer/Auszug
      hamburger: false, // NEU: Steuert zusätzlichen linken Drawer für Hamburger-Menü
      selectedDocTopicId: "Online-Dokumentation", // NEU: Variable, um die Id des im  Dokumentationsverzeichnis im linken Drawer selektierten
      // Doc Topics zu speichern und per Router Link Parameter weiterzugeben an Dokumentations-Komponente - dort ist diese als Prop definiert
      dokumentationsVerzeichnis, // Siehe oben, konstantes File mit JS Array für Dokumentationsverzeichnis-Struktur
      // ACHTUNG: diese Redeklaration in data() ist unbedingt notwendig!!!
      bedienungsHilfeVerzeichnis, // Siehe oben, konstantes File mit JS Array für Bedienungshilfeverzeichnis-Struktur
      // ACHTUNG: diese Redeklaration in data() ist unbedingt notwendig!!!
      // HINWEIS: Wird aktuell nicht mehr verwendet, da statischer Aufbau der q-expansion-items für die
      // Bedienungshilfe, weil es beim dynamischen Aufbau per v-for Probleme gab mit den refs (sind unklar
      // definierte Arrays, die sich dynamisch ändern können)
      currentTopicContextHelp: 0, // Default-Wert für Kontexthilfe - TODO: Nur für Tests
      pauseMarquee: false, // NEU - Timer: Wird durch startMarqueeTimeout() auf true gesetzt, für Marquee-Lauftext im Footer
      // Wird in created() gestartet, besser wäre, wenn es nach echtem Logon gestartet würde, das passiert aber in anmeldung.vue, nicht hier!
      // Müsste also in anmeldung.vue gesetzt werden über Update Prop bzw. Event - einstweilen darauf verzichtet
      showMarqueeText: true // Um den Text im Marquee nach der Pause zu hiden
    };
  }, // /data

  //***--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    // NEU: Timeout, die die Marquee-Laufschrift im Footer pausiert = beendet nach vorgegebner Zeit, wird in created: aufgerufen
    startMarqueeTimeout: function() {
      console.log(
        "In startMarqueeTimeout() - pauseMarquee: ",
        this.pauseMarquee
      );
      setTimeout(() => {
        // ACHTUNG: Syntax von setTimeOut() muss Arrow Function benutzen, sonst funktioniert der Timeout nicht!!!
        this.pauseMarqueeNow();
      }, 180000); // ms, d.h. 3 Minuten Laufzeit
    },
    pauseMarqueeNow() {
      this.pauseMarquee = true; // Steuert die :pause am Marquee
      this.showMarqueeText = false; // Steuert per v-if die Anzeige des Lauftexts im Marquee
      console.log("In pauseMarqueeNow()- pauseMarquee: ", this.pauseMarquee);
    },
    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Methode zum Öffnen eines internen Links (in einem neuen Browser Tab) in der ausgewählten Bauinformation
    // ACHTUNG: Dies ist eine Kopie der analogen Funktion in baueinheiten.vue
    // Hier mit Parameter für die idInternerLinkBauinformation (id der Datei zum internen Link, die heruntergeladen werden soll)
    // Für lokales und Heroku Cloud Deployment enabled
    openInternerLinkBauinformation: function(idInternerLinkBauinformation) {
      console.log(
        "In openInternerLinkBauinformation() - Parameter idInternerLinkBauinformation: ",
        idInternerLinkBauinformation
      );
      if (idInternerLinkBauinformation) {
        // BIM.click Backend File Server API rufen, um mit dieser id die Datei aus der Datenbank zu lesen und am Backend File Server in tmp/download-Folder zur Verfügung zu stellen
        const apiRoute =
          process.env.fileAPI +
          "/Dateien/download/" +
          idInternerLinkBauinformation; // id der zugehörigen hochgeladenen Datei in DateienCollection in Mongoose
        //
        this.$axios
          .get(apiRoute)
          .then(response => {
            console.log(
              "In openSelectedInternerLinkBauinformatin() nach HTTP Get Request für Download Datei - response.data: ",
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
            // TODO: XXXXXX - Die downloadURL für lokal und Production ist aktuell identisch, funktioniert auch in beiden Umgebungen, kann also zusammengeführt werden!!!
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
              // downloadDir = "app/tmp/download"; // Wird nicht gebraucht bei Zugriff über express.static in file-server.js
              // gemäß https://stackoverflow.com/questions/35744597/how-to-link-pages-in-node
              // Die URLS zum Zugriff sind direkt: bimclickfiles.herokuapp.com/filename.ext
              downloadURL =
                // "https://" + // ACHTUNG: https:// ist entgegen ersten Annahmen hier doch nicht notwendig gegen Status 404/"cannot GET..." Errors
                // Im Gegenteil: Mit "https://" kommt in Tests sogar zweimal https://https://bimclickfiles als URL im Browser, was
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
      }
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    navigateToDefaultRoute() {
      // NEU: Wird bei Klick auf linkes oberes Image im Header aufgerufen, wechselt auf die Routes "Anmeldung" oder "Bauvorhaben"
      // Siehe https://stackoverflow.com/questions/45962539/enclosing-a-router-link-tag-in-an-image-in-vuejs
      // und https://stackoverflow.com/questions/53126710/how-to-get-current-name-of-route-in-vue
      // und https://forum.vuejs.org/t/how-to-get-path-from-route-instance/26934/3
      console.log("$route.path: ", this.$route.path);
      console.log("$route.name: ", this.$route.name);
      if (this.$route.path === "/Anmeldung") {
        // ACHTUNG: Hier "/" erforderlich!
        // NEU - #391: Präventiv linken und rechten Drawer schließen:
        this.left = false;
        this.right = false;
        // Die Route nicht ändern, daher return
        // NEU - auf kleinen Bildschirmen vorher Hamburger-Menü (mit Anmeldung) öffnen (bzw. wenn geöffnet schließen, d.h. togglen)
        if (!this.$q.screen.gt.sm) {
          this.hamburger = !this.hamburger;
        }
        return;
      } // Dann nichts machen
      if (!this.localStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer) {
        // Benutzer ist angemeldet, dann auf die Route "Bauvorhaben" wechseln
        if (this.$route.name !== "Bauvorhaben") {
          // ACHTUNG: Hier kein "/"!
          // Um NavigationDuplicated Error zu vermeiden, wenn diese Route schon die current Location ist
          return this.$router.push("/Bauvorhaben"); // ACHTUNG: Hier "/" erforderlich!
        } // Sonst ist diese Route schon die richtige
      } else {
        // Kein Benutzer angemeldet, auf die Route "Anmeldung" wechseln
        return this.$router.push("/Anmeldung"); // ACHTUNG: Hier "/" erforderlich!
      }
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Expansion Icon im Inhalstsverzeichnis der Dokumentatin nur bei Vorhandensein von Kindern:
    // Hilfsfunktion dafür an der QExpansionItem :expand-icon Property:
    arrowDownIconOnlyIfChildren(object) {
      if (object.hasOwnProperty("children")) {
        return "keyboard_arrow_down";
      } else {
        return "null";
      }
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    kennWortVergessenBenutzer() {
      // Leitet um auf Route/Seite für Anforderung Kennwort-Reset
      this.$router.push("/Kennwortresetanforderung");
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    logEingabeFelderSindInvalide() {
      // Console Log Ausgabe für diesen Fall:
      console.log(
        "Eingabefelder sind invalide, nichts tun bei Click auf Button 'Neuregistrierung absenden'"
      );
      // TODO XXXXXX: Benutzernachricht!
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    registrierenBenutzer() {
      // Registriert Benutzer
      console.log("In registrierenBenutzer");
      const apiRoute = process.env.API + "/Authentifizierung/Registrierung";
      this.$axios
        .post(
          apiRoute,
          // Schickt einen Post-Request an das Backend für Registrierung
          this.benutzer // als Body
        )
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.post, response.status: ",
            response.status
          ); // Status loggen
          // NEU: registrierungPending zurücksetzen
          this.registrierungPending = false;
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          // z.B. wenn Abmeldung vergessen wird!
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.benutzer.eMail = "";
          this.benutzer.kennWort = "";
          this.kennWortBestaetigung = ""; // Dieses Feld nicht vergessen!
          this.benutzer.vorName = "";
          this.benutzer.nachName = "";
          //------------------------------------------------------------------------------------------------------------------------------
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_ERFOLG
          );
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.post, error: ", error); // Error loggen
          // NEU: registrierungPending zurücksetzen
          this.registrierungPending = false;
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          // z.B. wenn Abmeldung vergessen wird!
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.benutzer.eMail = "";
          this.benutzer.kennWort = "";
          this.kennWortBestaetigung = ""; // Dieses Feld nicht vergessen!
          this.benutzer.vorName = "";
          this.benutzer.nachName = "";
          //------------------------------------------------------------------------------------------------------------------------------
          if (error.response.status === 403) {
            console.log(
              "Error 403 - Es existiert bereits ein Benutzer mit der angegebenen E-Mail-Adresse als Benutzerkennung"
            );
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_FEHLER_BENUTZERKENNUNG_EXISTIERT_BEREITS
            );
          } else {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_REGISTRIERUNG_FEHLER
            );
          }
        });
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    anmeldenBenutzer() {
      // Macht Login für Benutzer
      // ACHTUNG: Der für den Benutzer eingestellbare Wert für tablesPaginationRowsPerPage wird zusammen mit der Mongoose id des Benutzers im global/local Store
      //          (worauf das QSelect-Feld in den Einstellungen in einstellungen.vue arbeitet) gehalten, aber auch in der Datenbank UND im Browser localStorage.
      //          Auf letzteres wird (bei angemeldetem Benutzer) zurückgegriffen, wenn bei Browser Refresh das Feld neu gesetzt
      //          werden muss im global Store. Zusätzlich wird es hier bei Benutzeranmeldung in my-layout.vue aus der Datenbank gelesen und
      //          mit dem aus der Datenbank gelesenen Wert die Felder im global Store (Mutator anmeldungBenutzer()) und localStorage gesetzt.
      // NEU: Selbes Verhalten implementiert für zusätzliches Feld treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
      //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log("In anmeldenBenutzer");

      const apiRoute = process.env.API + "/Authentifizierung/Anmeldung";
      this.$axios
        .post(
          // Schickt einen Post-Request an das Backend für Login
          apiRoute,
          {
            eMail: this.benutzer.eMail,
            kennWort: this.benutzer.kennWort
          } // als Body
        )
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.post, response.status: ",
            response.status
          ); // Status loggen
          // Receive JWT token:
          console.log("Vor localStorage.setItem() für Credentials");
          // console.log("Token empfangen"); // Disabled aus Security-Gründen
          // console.log("response.data.token: ", response.data.token); // Disabled aus Security-Gründen
          // console.log("Vor setItem für Token in localStorage"); // Disabled aus Security-Gründen
          localStorage.setItem("jwtToken", response.data.token);
          // NEU: Zusätzlichen Timestamp mit abspeichern - siehe https://stackoverflow.com/questions/2326943/when-do-items-in-html5-local-storage-expire
          // Wird hier als natives Date abgespeichert, nicht als String:
          localStorage.setItem("timeStamp", new Date().getTime());

          // NEU: In localStorage (Browser Storage) zusätzlich zu token auch weitere Felder eMail, vorName, nachName abspeichern:
          localStorage.setItem("vorName", response.data.vorName);
          localStorage.setItem("nachName", response.data.nachName);
          localStorage.setItem("eMail", response.data.eMail); // NEU: Dieses Response-Feld umbenannt nach eMail - ALT: Dieses Response-Feld hieß früher benutzer, nicht eMail!

          // NEU: Auch id und Einstellungen in localStorage merken (müssen bei Refresh daraus restauriert werden in den global Store, sonst
          //      kommen die QTables mangels valider Rows per Page nicht hoch!!!

          // console.log("response.data.id: ", response.data.id); // OK, kommt zurück vom Backend
          // console.log("response.data.tablesPaginationRowsPerPage: ", response.data.tablesPaginationRowsPerPage); // OK, kommt zurück vom Backend
          localStorage.setItem("id", response.data.id);
          localStorage.setItem(
            "tablesPaginationRowsPerPage",
            response.data.tablesPaginationRowsPerPage
          );
          localStorage.setItem(
            // NEU - einstellbares Farbschema
            "farbSchema",
            response.data.farbSchema
          );
          localStorage.setItem(
            "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig",
            JSON.stringify(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              // ACHTUNG: Dies ist auch in einstellunge.vue notwendig, wo diese Einstellung nach einem Update (API put Request) ebenfalls im local Storage aktualisiert werden muss!!!
              response.data
                .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig
            )
          );
          localStorage.setItem(
            "vorgabeWerteUeberschreibenVorhandeneWerte", // NEU: Für #262
            JSON.stringify(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              // ACHTUNG: Dies ist auch in einstellunge.vue notwendig, wo diese Einstellung nach einem Update (API put Request) ebenfalls im local Storage aktualisiert werden muss!!!
              response.data.vorgabeWerteUeberschreibenVorhandeneWerte
            )
          );

          // NEU: Auch benutzerRolle in localStorage melden (müssen bei Refresh durch Code in created (#113) restauriert werden in den global Store,
          // sonst ist in diesem Fall localStore.anmeldeDatenBenutzer.benutzerRolle undefiniert bzw. auf dem Default-Wert
          localStorage.setItem("benutzerRolle", response.data.benutzerRolle);
          // NEU - #400:
          localStorage.setItem("selectedKeyTreeBaueinheiten", response.data.selectedKeyTreeBaueinheiten)
          localStorage.setItem("selectedKeyTreeBaustoffe", response.data.selectedKeyTreeBaustoffe)
          // NEU: Felder im Dropdown Menü rechts oben füllen:
          this.anzeigeVorName = response.data.vorName;
          this.anzeigeNachName = response.data.nachName;
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          // z.B. wenn Abmeldung vergessen wird!
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.benutzer.eMail = "";
          this.benutzer.kennWort = "";
          // HINWEIS: Die Eingabefelder für Vor- und Nachname sind in diesem Fall disabled und müssen nicht zurückgesetzt werden!
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU: Anmeldedaten auch in global Store merken (für Zugriff z.B. aus myLayout.vue zur Zugriffskontrolle für dortige q-route-tabs im Hauptmenü):
          globalStore.anmeldungBenutzer(
            // this.benutzer.eMail, // FALSCH: Bug!!! Wurde oben auf "" gesetzt!
            response.data.eMail, // NEU: Richtig, kommt ebenfalls mit Response wieder zurück!
            response.data.token,
            response.data.id, // NEU: id des Benutzers
            response.data.benutzerRolle, // NEU: Für Benutzerberechtigungen
            response.data.tablesPaginationRowsPerPage, // NEU: Einstellung für Rows per Page in QTables
            response.data.farbSchema, // NEU: Einstellbares Farbschema
            response.data
              .treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig, // NEU: Einstellung für Wertevererbung in Bäumen
            response.data.vorgabeWerteUeberschreibenVorhandeneWerte, // NEU: Für #262
            response.data.selectedKeyTreeBaueinheiten, // NEU: Für #400
            response.data.selectedKeyTreeBaustoffe, // NEU: Für #400
          );

          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_ANMELDUNG_ERFOLG
          );

          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BROWSER_EINSTELLUNGEN
          );
          // ACHTUNG: Diese Nachricht zeigt jetzt an, dass man per Browser Refresh auf die neueste Version upgraden soll
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.WAS_GIBT_ES_NEUES
          ); // NEU
          // NEU: Nach Anmeldung auf Seite für Bauvorhaben wechseln:
          this.$router.push("/Bauvorhaben");
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.post, error: ", error); // Error loggen
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          // z.B. wenn Abmeldung vergessen wird!
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.benutzer.eMail = "";
          this.benutzer.kennWort = "";
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_ANMELDUNG_FEHLER
          );
        });
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    abmeldenBenutzer(timeOut) {
      // NEU: Parameter timeOut - steuert, welche Meldung ausgegeben wird - siehe unten
      // Macht Logout für Benutzer
      console.log("In abmeldenBenutzer");
      // NEU: Da die Route für die Abmeldung neuerdings guarded ist (siehe back-end-server-routes.js), hier den JWT Header setzen für den nachfolgenden Axios Call an das Backend:
      const myJWTToken = localStorage.getItem("jwtToken");
      console.log("Token geholt");
      // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
      // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
      // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
      this.$axios.defaults.headers.common["Authorization"] =
        "bearer " + myJWTToken;
      const apiRoute = process.env.API + "/Authentifizierung/Abmeldung";
      console.log("benutzer.eMail: ", this.benutzer.eMail);
      // NEU: E-Mail (Benutzerkennung) im Body mitschicken, damit Abmeldung getracked werden kann:
      this.$axios
        .post(
          // ALT: Schickt einen Get-Request an das Backend für Logout
          // NEU: Macht dasselbe mit Post-Request, da Body erforderlich
          // Siehe https://stackoverflow.com/questions/978061/http-get-with-request-body
          apiRoute,
          {
            eMail: this.benutzer.eMail // NEU
          } // als Body
        )
        .then(response => {
          // Was im Erfolgsfall zu tun ist:
          console.log(
            "Erfolg aus $axios.get, response.status: ",
            response.status
          ); // Status loggen
          console.log("Vor localStorage removeItem()");
          // console.log("Token wird entfernt"); // Aus Sicherheitsgründen disabled
          localStorage.removeItem("jwtToken"); // NEU: Zusätzlich Token entfernen aus local Storage, siehe authentifizierung.controller.js, logoutBenutzer
          // Dies ist zwar noch nicht 100%ig wasserdicht, aber danach können wegen des gelöschten Tokens keine guarded Routes mehr aufgerufen werden!
          // Durch Test verifiziert!
          // NEU: removeItem() auch für die weiteren Felder, die bei anmeldenBenutzer angelegt wurden:
          localStorage.removeItem("eMail");
          localStorage.removeItem("vorName");
          localStorage.removeItem("nachName");
          localStorage.removeItem("id");
          localStorage.removeItem("benutzerRolle");
          localStorage.removeItem("tablesPaginationRowsPerPage");
          localStorage.removeItem("farbSchema"); // NEU
          localStorage.removeItem(
            "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig",
            localStorage.removeItem("vorgabeWerteUeberschreibenVorhandeneWerte") // NEU: Für #262
          );
          localStorage.removeItem("selectedKeyTreeBaueinheiten"); // NEU: #400
          localStorage.removeItem("selectedKeyTreeBaustoffe"); // NEU: #400
          // NEU: Anmeldedaten auch in global Store merken (für Zugriff z.B. aus myLayout.vue zur Zugriffskontrolle für dortige q-route-tabs im Hauptmenü):
          globalStore.abmeldungBenutzer();

          // NEU: Felder im Dropdown-Menü leeren:
          this.benutzer.eMail = "";
          this.benutzer.vorName = "";
          this.benutzer.nachName = "";
          this.benutzer.kennWort = "";
          this.anzeigeVorName = "";
          this.anzeigeNachName = "";

          // NEU: Parameter timeOut steuert, welche Meldung ausgegegben wird
          // timeOut = false: Abmelden durch Benutzer per Button, Meldung "Sie wurden erfolgreich abgemeldet"
          // timeOut = true: Abmelden wegen Session Expiration, Meldung "Sie wurden aus Sicherheitsgründen abgemeldet. Bitte melden Sie sich ggf. im Dropdown-Menü rechts oben neu an."
          if (!timeOut) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_ERFOLG
            );
          } else {
            // timeOut, Aufruf, wenn Session abgelaufen ist, d.h. Token epxired ist
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_ERFOLG_NACH_ABLAUF
            );
          }
          // NEU: Drawers schließen:
          this.hamburger = false; // NEU - sicherheitshalber
          this.left = false;
          this.right = false;

          // NEU: Auf Anmeldungsseite wechseln
          // ACHTUNG: Funktioniert so nur, wenn in front-end-server-routes an der obersten Route path: "/" ersetzt wird durch path: ""!!!
          // Sonst wird wahrscheinlich wegen keep-alive versucht, die bisher geladene Komponente neu zu laden (mounted dafür wird aufgerufen - führt zu 401 Fehlern)
          this.$router.push("/Anmeldung");
        })
        .catch(error => {
          // Was im Fehlerfall zu tun ist:
          console.log("Error aus $axios.get, error: ", error); // Error loggen
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_FEHLER
          );
          // NEU: Drawers schließen:
          this.hamburger = false; // NEU - sicherheitshalber
          this.left = false;
          this.right = false;
        });
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    hideBenutzerNachricht() {
      // Ruft Mutator im global Store auf, aum die Banner-Benutzernachricht im Footer auszublenden
      globalStore.hideBenutzerNachricht();
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Wird aktuell nicht mehr verwendet! (war Methode für @input an q-expansion-items)
    setRouteAndId(id) {
      console.log("In MyLayout setRouteAndId. id: " + id);
      this.$router.push("/Dokumentation/" + id); // leaves record in browser history
      // this.$router.replace("/Dokumentation/" + id); // leaves no record in browser history
      this.selectedDocTopicId = id;
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Testmethode handleClickInDrawer1_0
    // Die ursprüngliche Dokumentations-Implementierung benutzte ein Event, um aus MyLayout.vue (Parent) und dem dort verwalteten Dokumentationsverzeichnis in linken Drawer eine Dokumentations-Id per Event
    // an die Kind-Komponente Dokumentation.vue zu senden - siehe Details in Dokumentation.vue
    // Ist so nicht empfehlenswert, da Parent-to-Child Kommunikation nicht über Events, sondern über Props erfolgen sollte
    // Daher ersetzt durch Prop-Übergabe am Vue Router-Befehl (siehe weiter oben in MyLayout.vue)
    // handleClickInDrawer1_0 war eine solche Methode, die per @click="handleClickInDrawer1_0" am q-item oben aufgerufen wurde:
    /*
    handleClickInDrawer1_0() {
      this.$emitter.$emit("scrollToDocTopic", "1"); // ACHTUNG: Unbedingt $emitter notwendig, da Cross-Component Event (Use Bus)
      console.log("In MyLayout. Emitted event scrollToDocTopic.");
      this.$router.replace("/Dokumentation"); // Dokumentations-Komponente rendern, diese bekommt Id von Dokumentationsthema per 2. Event-Parameter oben
    }, // /handleClickInDrawer1_0
    */

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Methode, um linken Drawer zu öffnen
    // Wird aktuell nur als Testmethode verwwendet, um aus Child-Komopnente (Datenaustausch.vue) Methodenaufrufe in der Parent-Komponente MyLayout.vue zu testen
    openLeftDrawer: function() {
      console.log("In MyLayout: Methode openLeftDrawer aufgerufen.");
      this.$refs.leftDrawer.open();
      this.hamburger = false; // NEU - sicherheitshalber
      this.left = true;
    }
  }, // /methods

  //***--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  computed: {
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // computed-Funktion für Eingabefelder beim Registrieren/Anmelden
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
      //================================================================================
      // NEU: Bei Neuregistrierung nur Nur Kurz & Fischer und BIM.live E-Mail-Adressen zur Registrierung zulassen!
      // Dies sollte stets eingeschaltet werden, wenn die Registrierung auf Heroku
      // freigeschaltet ist (separate computed-Funktion computeDisableRegistrierenBenutzer)
      //================================================================================
      const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      if (this.registrierungPending) {
        // HINWEIS: Separate if-Abfrage notwendig, da unten in den "v => ..." die Operatoren "&&"" und "||"" nicht gemixed werden dürfen!
        // HINWEIS: Mit Klammerung "( ... || ... )" geht es offenbar doch!
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

    kennWoerterIdentisch: function() {
      // Prüft, ob Kennwort eingegeben wurde, sonst Fehlermeldung
      return [
        v => !!v || "Die Wiederholung des Kennworts ist erforderlich",
        v =>
          v === this.$refs.kennWortFeld.value ||
          "Die Kennworteingaben stimmen nicht überein"
      ];
    },

    invalidFieldsRegistrierung: function() {
      console.log("In invalidFieldsRegistrierung (computed)");
      // ACHTUNG: Die Abfragen hier lauten auf "", nicht auf null, weil die Variablen oben so initialisiert werden!!!
      // ALT: Zugriff per $refs - fragil, disabled. Funktionierte nur mit $nextTick(), aber nur mit
      //      invalidFieldsRegistrierung alleine, nicht mit analoger computed-Funktion invalidFieldsAnmeldung!!!
      /*
      var result = false;
      console.log("$refs: ", this.$refs);
      this.$nextTick();
      console.log("$refs: ", this.$refs);
      result =
        this.registrierungPending &&
        (this.$refs.vorNameFeld.value === "" ||
          this.$refs.nachNameFeld.value === "" ||
          this.$refs.kennWortFeld.value === "" ||
          this.$refs.kennWortBestaetigungFeld.value === "" ||
          this.$refs.kennWortFeld.value !==
            this.$refs.kennWortBestaetigungFeld.value);
      console.log("result: ", result);
      return result;
      */
      //----------------------------------------------------------------------------------------------------------------------
      // NEU: Zusätzliche Validierung eMail-Feld:
      // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/4
      const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      // NEU: Direkte Zugriffe auf die v-models:
      return (
        this.registrierungPending &&
        (this.benutzer.vorName === "" ||
        this.benutzer.nachName === "" ||
        this.benutzer.eMail === "" || // NEU - vergessen!
        !eMailPattern.test(this.benutzer.eMail) || // NEU: Validierung - siehe oben
          this.benutzer.kennWort === "" ||
          this.benutzer.kennWort === "" ||
          this.benutzer.kennWort !== this.kennWortBestaetigung)
      );
    },

    invalidFieldsAnmeldung: function() {
      console.log("In invalidFieldsAnmeldung (computed)");
      // ACHTUNG: Die Abfragen hier lauten auf "", nicht auf null, weil die Variablen oben so initialisiert werden!!!
      // ALT: Zugriff per $refs - fragil, disabled. Funktionierte nur mit $nextTick(), aber nur mit
      //      invalidFieldsRegistrierung alleine, nicht mit analoger computed-Funktion invalidFieldsAnmeldung!!!
      /*
      var result = false;
      console.log("$refs: ", this.$refs);
      this.$nextTick();
      console.log("$refs: ", this.$refs);
      result =
        this.$refs.eMailFeld.value === "" ||
        this.$refs.kennWortFeld.value === "";
      console.log("result: ", result);
      return result;
      */
      //----------------------------------------------------------------------------------------------------------------------
      // NEU: Zusätzliche Validierung eMail-Feld:
      // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/4
      const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      // NEU: Direkte Zugriffe auf die v-models:
      return (
        this.benutzer.eMail === "" ||
        !eMailPattern.test(this.benutzer.eMail) || // NEU: Validierung - siehe oben
        this.benutzer.kennWort === ""
      );
    },

    computeDisableRegistrierenBenutzer: function() {
      //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      // computed-Funktion, um zu berechnen, ob  Schaltfläche/Button für "Registrieren" disabled ist (für BIM.clickBeta-Programm)
      // TODO XXXXXX
      // ALT: War nur enabled bei Development
      // oder bei Production (d.h. Heroku, siehe Environment Variable dort) UND Anmeldung von Benutzer "michael.scheible@kurz-fischer.de"
      // NEU: Registrieren auf Heroku erlaubt - Sicherheitsvorkehrungen siehe unten
      //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      if (
        process.env.NODE_ENV === "development" ||
        (process.env.NODE_ENV === "production" && // ALT: Registrieren auf Heroku ist nur für angemeldeten Administrator MS erlaubt
          globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer !==
            true &&
          globalStore.state.anmeldeDatenBenutzer.eMailBenutzer ===
            "michael.scheible@kurz-fischer.de")
      ) {
        return false; // Registrieren-Button enablen
      } else {
        // return true; // Registrieren-Button disablen
        return false; // NEU: Registrieren auch auf Heroku enablen
        // Geht (Security!) einher mit:
        // 1. Passwortsicherheitsregeln aktiv bei Registrierung, Passwort vergessen, Passwortänderung
        // 2. Nur K&F und BIM.live E-Mail-Adressen dürfen sich registrieren (am Frontend hier in my-layout.vue und am Backend, in authentifizierung.controller.js)
      }
    }
  },

  //***--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  created: function() {
    // Hinweise für Event Handling mit global Event Bus: https://quasar.dev/options/global-event-bus - erklärt this.$emitter.$on, $once, $off, $emit etc.

    // ACHTUNG: https://medium.com/@brockreece/vue-parent-and-child-lifecycle-hooks-5d6236bd561f
    // Reihenfolge von mounted: bei Eltern-Kind-Komponenten ist andersherum: Erst wird mounted: des Kinds aufgerufen, dann mounted: des Parents!!!
    // Das erklärt, dass bei Reload der Dokumentation der Event zum Öffnen des linken Drawers in mounted von Dokumentation (Child-Komponente) emittiert wurde,
    // noch bevor in mounted von MyLayout.vue (Parent-Komponente) der Event Handler dafür registriert war. Dies führte dazu, dass beim Reload der Dokumentation
    // das Inhaltsverzeichnis nicht wie gewohnt geöffnet wurde. Lösung: Verschiebung der Event Listener aus mounted: nach created: von MyLayout.vue!!!
    // Dafür einfach mounted: nach created: umbenannt.
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------
    console.log("In created() von myLayout.vue");
    console.log(this.$emitter)
    //=================================================================================================================================================================
    // NEU: Client-seitiger Code für Registrierung eines Service Workers, um später Web Push Notifications zu verarbeiten (siehe internes Design für BIM.click)
    // Siehe auch die Kommentare dazu in
    // - hier in my-layout.vue (Frontend Code dafür für Registrierung und Subscription von Push Notifications)
    // - service-worker.js (Frontend Code für Empfang der Push Notifications)
    // - back-end-server.js (experimenteller Backend Code, der testweise eine Push Notification an den Client schickt)
    // Vorlagen: https://dzone.com/articles/how-to-add-real-web-push-notifications-to-your-web - dort wird die Push Notification vom Server aus gesendet
    // und: https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html - dort wird die Push Notification vom Client aus gesendet
    // ACHTUNG: Erfordert https und funktioniert daher aktuell nur auf Heroku - daher den Code konditional für Production gemacht!
    //--------------------------------------------------------------------------------------------
    // ACHTUNG: Die in der Funktion registerServiceWorker() referenzierte Datei mit dem Service Worker Code (service-worker.js muss) im Pfad liegen, z.B. in \statics
    // Der Tipp, service-worker.js einfach mit in /statics abzulegen, stammt von https://github.com/quasarframework/quasar/issues/6935
    // Bei Ablage des unten referenzierten Files service-worker.js in \statics kam aber beim Start der App auf Heroku im Browser zunächst diese Fehlermeldung:
    // ServiceWorker registration failed: TypeError: Failed to register a ServiceWorker for scope ('https://bimclick.herokuapp.com/')
    // with script ('https://bimclick.herokuapp.com/service-worker.js'): A bad HTTP response code (404) was received when fetching the script.
    // Daher im Code unten den Pfad korrigiert auf
    // .register('statics/service-worker.js') // NEU - Der ursprüngliche Pfad in der Vorlage war nur /service-worker.js
    // Danach ist laut Browser Log die Registrierung des Service Workers erfolgreich!!!
    // Der Service Worker Code kann daher auch im Browser eingesehen werden auf https://bimclick.herokuapp.com/statics/service-worker.js
    // TODO XXXXXX - Sicherheitsrisiko???
    //-------------------------------------------------------------------------------------------
    // HINWEIS: Weitere Tipps (Alternative) dazu in obiger Vorlage:
    // One caveat to keep in mind is that service workers are limited to the scope they're served from.
    // You can't serve that file from a CDN, or from a static.domain.com, or even domain.com/static/.
    // This is a security precaution.
    // My solution was to use the Webpack sw-loader and configure it to compile this particular file into a different location and with a different publicPath
    // than all other JavaScript, which goes into CDNs and has fingerprinting and stuff.
    // That part was tricky, but it's very specific to every web app, so it's not a good candidate for this article.
    //--------------------------------------------------------------------------------------------
    // HINWEIS: Am Backend muss dafür NPM Package web-push installiert werden mittels
    // bim-click-back-end> npm install web-push -g
    // Dann mussten dort einmalig VAPID Keys generiert werden mittels
    // bim-click-back-end> web-push generate-vapid-keys [--json]
    // Output davon:
    // ========================================
    // Public Key:
    // BLge3HT02yQG_WzA0uMCZndZY2bzqQ03hv2f57azyJS6KU9VBb1MUGtu_I563XTkoYc7xkuR29R0aPGJgd2rC74
    // Private Key:
    // _H67OYEOsnLKppnEvRXN9EmTa9r8ia7WUTJbZFxIFu0
    // ========================================
    // Der public Key daraus wird unten verwendet im Aufruf von registration.pushManager für die Subscription von Push Messages:
    const publicVapidKey =
      "BLge3HT02yQG_WzA0uMCZndZY2bzqQ03hv2f57azyJS6KU9VBb1MUGtu_I563XTkoYc7xkuR29R0aPGJgd2rC74";
    //--------------------------------------------------------------------------------------------
    // TODO XXXXXX: Hard-coded public key - in Environment Variable auslagern!
    // DONE: Replaced with above generated public key
    //--------------------------------------------------------------------------------------------
    // PROBLEM: Am Server funktioniert zwar sendNotification in back-end-servers.js testweise mit 201, am Client/Browser kommt aber keine Notification an!
    // https://stackoverflow.com/questions/46634261/firebase-messaging-web-receiving-message-does-not-work - Nachdem Chrome "Connection State" "WAITING FOR BACKOFF" war,
    // den GCM Store Folder nach diesen Anweisungen gelöscht - danach ist der Status "CONNECTED"
    // chrome://gcm-internals/ - GCM-Verwaltung von Chrome
    // Siehe https://developers.google.com/web/fundamentals/push-notifications/common-issues-and-reporting-bugs#payload_encryption_issue
    // Siehe https://stackoverflow.com/questions/47075726/web-push-201-but-cant-see-notification-on-device
    // Siehe https://stackoverflow.com/questions/57495393/error-when-sending-web-push-notification-no-endpoint - auth und p256dh sind dort wie bei mir Strings!
    // Siehe https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries
    // ACHTUNG: Auf den Service Worker kann zugegriffen werden sogar im Browser unter https://bimclick.herokuapp.com/statics/service-worker.js
    // Danach gab es noch ein weiteres Problem mit der korrekten Übergabe
    // des Parameters Payload (ein String mit JSON-Inhalt) am Backend in web-push-notification.js - dort gelöst, sowie in service-worker.js im Frontend

    function urlBase64ToUint8Array(base64String) {
      // Hilfsfunktion, gemäß Vorlage auf https://github.com/web-push-libs/web-push
      // Wandelt obigen VAPID public Key von base64 String in uint8Array um, um ihn in den subscribe Call als Argument geben zu können
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    async function setupServiceWorkerAndPushNotifications() {
      //-------------------------------------------------------------------------------------------------------------------------
      // Asynchrone Hilfsfunktion ohne Aufruf von weiteren Hilfsfunktionen (außer urlBase64ToUint8Array())
      // für 1) Registrierung von Service Worker im Browser und 2) Subscription für Push Notifications
      // Vorlage: https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html
      // ACHTUNG: Service Worker Registrierung und Subscription für Push Notfications sind aktuell DISABLED, zugunsten von
      // Alternative Web Sockets (im Code weiter unten)
      console.log("Before registering service worker");
      const registration = await navigator.serviceWorker
        .register("statics/service-worker.js") // NEU - Der ursprüngliche Pfad in der Vorlage war nur /service-worker.js
        .then(registration => {
          console.log(
            "ServiceWorker registered with scope - registration.scope:",
            registration.scope
          );
          // console.log("registration object in .then: ", registration);
          return registration; // ACHTUNG: Dieses return ist unbedingt notwendig, sonst ist registration Objekt oben im Folgenden undefined!!!
        })
        .catch(error =>
          console.error("Error in service worker registration - error:", error)
        );
      console.log("registration object after .register: ", registration);
      console.log("After registering service worker");
      console.log("Before subscribing to push notifications");
      const subscription = await registration.pushManager // Verwendet das registration Objekt von oben!!!
        .subscribe({
          userVisibleOnly: true,
          // The `urlBase64ToUint8Array()` function is the same as in
          // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey) // Weitere Hilfsfunktion unten
        })
        .then(pushSubscription => {
          console.log(
            "Success in subscription to push notifications - pushSubscription: ",
            JSON.stringify(pushSubscription)
          );
          return pushSubscription; // ACHTUNG: Dieses return ist unbedingt notwendig, sonst ist subscription oben undefined!!!
        })
        .catch(error => {
          console.error(
            "Error in subscription to push notifications - error: ",
            error
          );
        });
      console.log("After subscribing to push notifications");
    }

    //====================================================================================================================================
    // Nun obige Hilfsfunktion (nur im Production Environment mit https!) aufrufen, um Service Worker zu registrieren
    // und Subscription für Push Notifications im Browser
    // Dies löst im Browser automatisch eine Browser-Sicherheitsabfrage aus, ob der Benutzer diese Push Notifications erlaubt!
    // ACHTUNG: Service Worker Registrierung und Subscription für Push Notfications sind aktuell DISABLED, zugunsten von
    // Alternative Web Sockets (im Code weiter unten)
    //====================================================================================================================================
    if (process.env.NODE_ENV === "production") {
      // TODO XXXXXX - Vorläufig nur auf Heroku, da registerServiceWorker() https erfordert!
      if (navigator && navigator.serviceWorker) {
        // der Browser unterstützt Service Workers
        console.log(
          "Registrierung eines Service Workers und Subscription für Push Notifications sind in dieser Codeversion disabled"
        );
        // console.log("Vor Registrierung eines Service Workers und Subscription für Push Notifications");
        // setupServiceWorkerAndPushNotifications();
      } else {
        console.log(
          "Dieser Browser unterstützt keine Service Worker - daher keine Registrierung eines Service Workers und keine Subscription von Push Notifications"
        );
      }
    } else {
      console.log(
        "Im Development Environment mit http - daher keine Registrierung eines Service Workers und keine Subscription von Push Notifications"
      );
    }

    // Ende Code für Test von Push Notifications
    //=====================================================================================================================================================================

    // Start Code für Initialisierung, Test und Verarbeitung von Nachrichten vom Backend Server mittels Web Sockets
    // Vorlage: https://forum.quasar-framework.org/topic/3267/how-to-use-socket-io-in-quasar-building-an-electron-app/7?_=1594620929632
    // Dazu wurde
    // - am Quasar Frontend das NPM Package socket.io installiert per >bim-click-front-end> npm install socket.io (wie auch am Backend!)
    // - Am Frontend dies später ersetzt durch socket.io-client!
    // - ein zusätzliches Boot File socket.js angelegt per: bim-click-front-end> quasar new boot socket.js, mit Code: Siehe dieses File
    // - dieses Boot File socket.js in die Boot Section von quasar.conf.js mit aufgenommen
    // Das in der Boot File definierte Socket kann dann in allen .vue Files mit this.$socket verwendet werden
    // Empfange Message vom back-end-server über Socket, veranlasse entsprechende Aktionen (z.B. Aufforderung zum Refresh)

    this.$socket.on("Aktualisierungsnachricht", function(data) {
      // Reagiere auf Empfang von Nachrichten auf Channel "Aktualisierungsnachricht"
      // ACHTUNG: data enthält hier nur ein Feld message, kein Feld room!
      console.log(
        "Web Socket Nachricht auf Channel 'Aktualisierungsnachricht' vom Backend Server empfangen:",
        data.message
      );
      switch (data.message) {
        case "Testnachricht":
          console.log("Testnachricht empfangen, nichts weiter zu tun");
          break;
        case "Baustoffe wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUSTOFFE_AKTUALISIERUNG_AKTION
          );
          break;
        case "Bauvorlagen wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUVORLAGEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Bauinformationen wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUINFORMATIONEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Baueigenschaften wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Baueigenschaftsprofile wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_AKTUALISIERUNG_AKTION
          );
          break;
        default:
          console.log("Fehler: Unbekannte Aktualisierungsnachricht empfangen");
      }
    });

    //===============================================================================================================
    // NEU: Joining Rooms für den Empfang von Web Socket Nachrichten (d.h. Aktualisierungsnachrichten) vom Backend
    console.log("Before emits to join rooms for web socket messages");
    // console.log("Before emit to join room 'roomBauinformationen'");
    this.$socket.emit("joinRoom", {
      room: "roomBauinformationen"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    // console.log("After emit to join room 'roomBauinformationen'");
    // console.log("Before emit to join room 'roomBaueigenschaften'");
    this.$socket.emit("joinRoom", {
      room: "roomBaueigenschaften"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    // console.log("After emit to join room 'roomBaueigenschaften'");
    this.$socket.emit("joinRoom", {
      room: "roomBaueigenschaftsprofile"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    this.$socket.emit("joinRoom", {
      room: "roomBauinformationsprofile" // NEU: 07.01.2020
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    this.$socket.emit("joinRoom", {
      room: "roomBaustoffe"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    this.$socket.emit("joinRoom", {
      room: "roomBauvorlagen"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    this.$socket.emit("joinRoom", {
      room: "roomBaueigenschaften"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.
    this.$socket.emit("joinRoom", {
      room: "roomBenutzer"
    }); // Event, der am Server ein Join für diesen Room auslöst! Der Room wird mitgegeben.

    //------------------------------------------------------------------------------------------------------------------------
    // Test Codefür Leaving Rooms - wenn dieser Code aktiviert ist, wird die vom Server geschickte Nachricht NICHT empfangen!
    /*
    console.log("Before emit to leave room 'roomBauinformationen'");
    this.$socket.emit("leaveRoom", {
      room: "roomBauinformationen"
    }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
    console.log("After emit to leave room 'roomBauinformationen'");
    */
    //-------------------------------------------------------------------------------------------------------------------------------------------------
    // Web Socket Event Handler Code, der beim Empfang eines "Update" Events mit einer Aktualisierungsnachricht vom Backend Server abläuft
    // HINWEIS: Das Event wird nur ausgelöst, wenn der Client den vom Server beim emit mitegebenen Room angehört!!!
    // Der Room wird zusätzlich in der Payload mitgegeben (data.room)
    this.$socket.on("Update", function(data) {
      // Reagiere auf Empfang von Nachrichten in Room "roomBauinformationen"
      console.log("Web Socket Nachricht vom Backend Server empfangen");
      console.log("data.message: ", data.message);
      console.log("data.room: ", data.room);
      switch (data.message) {
        case "Testnachricht":
          console.log(
            "Test-Aktualisierungsnachricht empfangen, nichts weiter zu tun"
          );
          break;
        case "Baustoffe wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUSTOFFE_AKTUALISIERUNG_AKTION
          );
          break;
        case "Bauvorlagen wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUVORLAGEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Bauinformationen wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUINFORMATIONEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Baueigenschaften wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUEIGENSCHAFTEN_AKTUALISIERUNG_AKTION
          );
          break;
        case "Baueigenschaftsprofile wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_AKTUALISIERUNG_AKTION
          );
          break;
        case "Benutzer wurden geändert":
          globalStore.showBenutzerAktion(
            BenutzerNachrichten.BENUTZER_AKTUALISIERUNG_AKTION
          );
          break;
        default:
          console.log("Fehler: Unbekannte Aktualisierungsnachricht empfangen");
      }
    });
    // Ende Code für Initialisierung und Verarbeitung von Web Sockets
    //=====================================================================================================================================================================

    // Start Test-Code zur Ermittlung der Hex Codes für bestimmte Quasar Palette Colors
    // Vorlage: https://quasar.dev/quasar-utils/color-utils#Helper---getPaletteColor
    // Erfordert oben import { colors } from 'quasar'
    // Wieder disabled, da nur einmal benötigt
    /*
    const { getPaletteColor } = colors;
    console.log(
      "XXXXXXXX 'Hex code of Quasar palette color grey-1: ",
      getPaletteColor("grey-1")
    ); // Ergibt '#fafafa'
    */

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Listen to Event "openLeftDrawerEvent", um den linken Drawer anzuzeigen- Komponente Dokumentation feuert dann bei Bedarf diesen Event.
    // ACHTUNG: Stattdessen einfach per @click="$refs.leftDrawer.open()" am <q-route-tab> für die Dokumentation hier in MyLayout.vue den Drawer zu öffnen (per $ref mit seinem Component Name)
    // funktioniert NICHT!!! Siehe Kommentare oben.
    console.log(
      "In created() von MyLayout.vue: Setting up listening for event openLeftDrawerEvent"
    );
    // VUE3
    this.$emitter.on("openLeftDrawerEvent", () => {
      // Keine Parameter am Event
      // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In created() von myLayout.vue: Event openLeftDrawerEvent empfangen. Keine Parameter. Öffne linken Auszug."
      );
      this.hamburger = false; // NEU - sicherheitshalber
      this.left = true;
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Listen to Event "openRightDrawerEvent", um den rechten Drawer mit Parameter Kontexthilfe Id zu öffnen
    // Wurde zuerst nur testweise aufgerufen aus Datenaustausch.vue
    // Wird nun in baueinheiten.vue verwendet, um fachliche Hilfe anzuzeigen bei Auswahl bestimmter Knoten im Bauvorhabenbaum
    console.log(
      "In created() von myLayout.vue: Setting up listening for event openRightDrawerEvent(topicContextHelp)"
    );
    // VUE3
    this.$emitter.on("openRightDrawerEvent", topicContextHelp => {
      // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In created() von myLayout.vue: Event openRightDrawerEvent(topicContextHelp) empfangen. Schließe linken Drawer, öffne rechten Drawer."
      );
      console.log("Parameter aus Event -topicContextHelp: ", topicContextHelp);
      this.currentTopicContextHelp = topicContextHelp; // Kontexthlfe Id ändern, um Anzeige des Themas im rechten Auszug zu steuern
      this.hamburger = false; // NEU - sicherheitshalber
      this.left = false; // Linken Drawer schließen, um Platz zu gewinnen für rechten Drawer
      this.right = true;
    });

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Listen to Event "closeRightDrawerEvent", um den rechten Drawer zu schließen
    // Wird in baueinheiten.vue verwendet, um fachliche Hilfe zu schließen bei Auswahl bestimmter Knoten im Bauvorhabenbaum
    console.log(
      "In created() von myLayout.vue: Setting up listening for event closeRightDrawerEvent"
    );
    // VUE3
    this.$emitter.on("closeRightDrawerEvent", () => {
      // ACHTUNG: Unbedingt $emitter notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In created() von myLayout.vue: Event closeRightDrawerEvent empfangen. Schließe rechten Drawer."
      );
      this.right = false;
    });
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // TODO: Experimenteller Code, wird aktuell nicht mehr gebraucht, stattdessen neuer Event this.$emitter.$on("showBedienungsHilfe", ref) unten
    // NEU: Listen to Event "notifyTopicContextHelpEvent", um die Id der Kontexthilfe im rechten Drawer zu setzen. Setzt nur die ID, der Drawer selbst kann mit dem Button
    // rechts oben aufgerufen werden und zeigt dann die durch das letzte solche Event per Id gesetzte aktuelle Kontexthilfe an
    console.log(
      "In created() von MyLayout.vue: Setting up listening for event notifyTopicContextHelpEvent(topicContextHelp)"
    );
    /*
    this.$emitter.$on("notifyTopicContextHelpEvent", topicContextHelp => {
      // ACHTUNG: Unbedingt $emitter notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In MyLayout: Event notifyTopicContextHelpEvent(topicContextHelp) empfangen. Aktualisiere ausgewähltes Kontexthilfethema."
      );
      console.log("Parameter aus Event - topicContextHelp: ", topicContextHelp);

      console.log("$refs: ", this.$refs);
      if (topicContextHelp === 100) {
        // TODO: Für Steuerung Kontexthilfe (experimentell)
        console.log("Vor Aufruf $refs.ref_1_2_3_Neu[0].show()");
        this.$refs.ref_1_2_3_Neu[0].show();
        // TODO/ACHTUNG: $refs für ein bestimmtes Expansion Item ist laut Log ein Array!!!
        // Der Grund dafür ist unbekannt, hängt allerdings wahrscheinlich zusammen mit den im Template per v-for erzeugten Expansion Items
        // Laut Log hat dieser Array für ein Expansion Item manchmal leider sogar die Länge 0, dann kommen Warnings im Log: Error: Cannot read property 'show' of undefined,
        // obwohl der Code ansonsten scheinbar funktioniert!!!
        // Normalerweise haben diese Arrays die Länge 1, dann gelingt obiger, extra dafür eingebauter Zugriff z.B. mit this.$refs.ref_1_2_3_Neu[0].show();
        // Eigentlich müsste es z.B. heißen: this.$refs.ref_1_2_3_Neu.show(); - damit kommt allerdings IMMER obiger Error: Cannot read property 'show' of undefined!!!
        // Diese Methodik mit $refs und show, um ein Expansion Item zu öffnen, ist also sehr fragil!
        // Deshalb neues Design mit statischen q-expansion-items im Template oben (siehe 4. dort) -->

        console.log("Nach Aufruf $refs.ref_1_2_3_Neu[0].show()");
      } else if (topicContextHelp === 50) {
        console.log("Vor Aufruf $refs.ref_1_2_2_Auswahl[0].show()");
        this.$refs.ref_1_2_2_Auswahl[0].show(); // Expansion Item für Kontexthilfe öffnen
        console.log("Nach Aufruf $refs.ref_1_2_2_Auswahl[0].show()");
      }

      this.showCurrentTopicContextHelp = true; // TODO: Für Test Kontexhilfe auf/zu
      this.currentTopicContextHelp = topicContextHelp; // Kontext Hilfe Id ändern, um Anzeige des Themas im rechten Auszug zu steuern

      // Linken Drawer jetzt nicht öffnen, kann durch Benutzer später erfolgen mit dem gesetzten Topic
      // this.left = false;

      // Rechten Drawer kurz öffnen und wieder schließen, um dessen refs zu initialisieren,
      // sonst kommen bei Feuern von showBedienungsHilfeEvents mit Parameter ref Errors im Log, die anzeigen, dass diese refs undefined sind!
      this.right = true;
      this.right = false;
    });
*/
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // this.$emitter.$on("showBedienungsHilfeEvent", ref) unten
    // NEU: Listen to Event "showBedienungsHilfe", um das per ref identifizierte Expansion Item in der Bedienungshilfe im rechten Drawer zu öffnen
    // TODO: Dabei unbedingtes Öffnen der Hilfe oder vorher Öffnen der Hilfe per Button rechts oben?
    console.log(
      "In created() von MyLayout.vue: Setting up listening for event showBedienungsHilfe(ref)"
    );
    /*
    this.$emitter.$on("showBedienungsHilfeEvent", ref => {
      // ACHTUNG: Unbedingt $emitter notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In MyLayout: Event showBedienungsHilfe(ref) empfangen. Zeige das per ref identifizierte Kontexthilfethema mit show-Methode."
      );
      console.log("Parameter aus Event - ref: ", ref);
      console.log("$refs: ", this.$refs);
      console.log("$refs[ref]: ", this.$refs[ref]); // defined, weil ref Parameter hier String ist!!!
      // console.log("$refs.ref: ", this.$refs.ref); // undefined, weil ref Parameter hier String ist!!!

      // ACHTUNG: Beim Testen besser die App stets komplett reloaden, da beim partiellen Hot Reload die Refs falsch sein können,
      // was zu Fehlern im Console Log führt!!!

      // ACHTUNG: Falls direkter Aufruf von show des durch den ref Parameter (String) identifizierten Expansion Items erfolgen soll,
      // muss das so erfolgen:
      // this.$refs[ref].show(); // OK, da ref Parameter String ist!!!
      // NICHT: this.$refs.ref.show() // Undefined Fehler, da ref Parameter hier kein Objekt ist, sondern String!!!

      console.log(
        "Vor Aufruf show() für alle Expansion Items im Pfad des per ref identifizierten Items"
      );

      // ACHTUNG: Es müssen hier auch sämtliche Parent Expansion Items im Pfad per show() geöffnet werden, nicht nur das betroffene1!!
      // Ansonsten wird das Item nicht geöffnet, falls manuell andere Items vom Benutzer zur Anzeige ausgewählt sind
      // (nur falls sein Eltern-Item schon geöfl)
      // Daher der folgende Switch (für das betroffene Item alleine würde this.$refs[ref].show(); ausreichen):
      switch (ref) {
        case "bedienungsHilfeBeschreibungBaustoffe":
          this.$refs.bedienungsHilfeBaustoffe.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          break;
        case "bedienungsHilfeUebersichtBaueigenschaftenBaustoffe":
        case "bedienungsHilfeAuswahlBaueigenschaftenBaustoffe":
        case "bedienungsHilfeNeuBaueigenschaftenBaustoffe":
          this.$refs.bedienungsHilfeBaustoffe.show(); // Zeigt den Großvater des Expansion Items an
          this.$refs.bedienungsHilfeBaueigenschaftenBaustoffe.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          break;
      }

      console.log(
        "Nach Aufruf show() für alle Expansion Items im Pfad des per ref identifizierten Items"
      );

      // Rechten Drawer jetzt nicht öffnen, kann durch Benutzer später erfolgen mit dem gesetzten Topic
      // this.left = false; // Rechten Drawer schließen, um Platz zu gewinnen für rechten Drawer
      // this.right = true;
    });
    */
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // this.$emitter.$on("showFachlicheHilfeEvent", ref) unten
    // NEU: Listen to Event "showFachlicheHilfe", um das per ref identifizierte Expansion Item in der fachlichen Hilfe im rechten Drawer zu öffnen
    // NEU: Zweiter optionaler Parameter openRightDrawer (Boolean) - wenn true, wird der rechte Drawer geöffnet, sonst (auch wenn undefined) bleibt er, wie er ist
    console.log(
      "In created() von MyLayout.vue: Setting up listening for event showFachlicheHilfe(ref)"
    );
    // VUE3
    this.$emitter.on("showFachlicheHilfeEvent", (ref, openRightDrawer) => {
      // ACHTUNG: Unbedingt $emitter notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log(
        "In MyLayout: Event showfachlicheHilfe(ref, openRightDrawer) empfangen. Öffne rechten Drawer, wenn openRightDrawer 'true'. Zeige das per ref identifizierte Kontexthilfethema mit show-Methode."
      );
      console.log("Parameter aus Event - ref: ", ref);
      console.log("$refs: ", this.$refs);
      console.log("$refs[ref]: ", this.$refs[ref]); // defined, weil ref Parameter hier String ist!!!
      // console.log("$refs.ref: ", this.$refs.ref); // undefined, weil ref Parameter hier String ist!!!

      // ACHTUNG: Beim Testen besser die App stets komplett reloaden, da beim partiellen Hot Reload die Refs falsch sein können,
      // was zu Fehlern im Console Log führt!!!

      // ACHTUNG: Falls direkter Aufruf von show des durch den ref Parameter (String) identifizierten Expansion Items erfolgen soll,
      // muss das so erfolgen:
      // this.$refs[ref].show(); // OK, da ref Parameter String ist!!!
      // NICHT: this.$refs.ref.show() // Undefined Fehler, da ref Parameter hier kein Objekt ist, sondern String!!!
      console.log(
        "Vor Aufruf show() für alle Expansion Items im Pfad des per ref identifizierten Items"
      );
      // ACHTUNG: Es müssen hier auch sämtliche Parent Expansion Items im Pfad per show() geöffnet werden, nicht nur das betroffene1!!
      // Ansonsten wird das Item nicht geöffnet, falls manuell andere Items vom Benutzer zur Anzeige ausgewählt sind
      // (nur falls sein Eltern-Item schon geöfl)
      // Daher der folgende Switch (für das betroffene Item alleine würde this.$refs[ref].show(); ausreichen):
      let fachlicheHilfeIstVorhanden = false; // NEU: Hilfsvariable, mit der bestimmt wird, ob definierter fachlicher Hilfeinhalt vorhanden ist
      // Wird unten verwendet, um zu entscheiden, ob der rechte Drawer geöffnet wird (diese Logik kann noch optimiert werden)
      switch (ref) {
        case "fachlicheHilfeBaustoff":
          // this.$refs.fachlicheHilfeBaustoffe.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          if (
            this.localStore.state.baustoffBeschreibungAusgewaehlteBaueinheit !=
              null &&
            this.localStore.state.baustoffBeschreibungAusgewaehlteBaueinheit !==
              ""
          ) {
            fachlicheHilfeIstVorhanden = true;
          }
          break;
        case "fachlicheHilfeBaueinheit":
          // this.$refs.fachlicheHilfeBaueinheit.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          if (
            this.localStore.state
              .baueinheitsBeschreibungAusgewaehlteBaueinheit != null &&
            this.localStore.state
              .baueinheitsBeschreibungAusgewaehlteBaueinheit !== ""
          ) {
            fachlicheHilfeIstVorhanden = true;
          }
          break;
        case "fachlicheHilfeBaueigenschaftAnBaueinheit":
          // this.$refs.fachlicheHilfeBaueinheit.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          if (
            this.localStore.state
              .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit !=
              null &&
            this.localStore.state
              .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit !==
              ""
          ) {
            fachlicheHilfeIstVorhanden = true;
          }
          break;
        case "fachlicheHilfeBaueigenschaftAnBaustoff":
          // this.$refs.fachlicheHilfeBaustoff.show(); // Zeigt den Vater des Expansion Items an
          this.$refs[ref].show(); // Zeigt das betroffene Item selbst an
          if (
            this.localStore.state
              .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff !=
              null &&
            this.localStore.state
              .baueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff !==
              ""
          ) {
            fachlicheHilfeIstVorhanden = true;
          }
          break;
      }
      console.log(
        "Nach Aufruf show() für alle Expansion Items im Pfad des per ref identifizierten Items - vor bedingtem Öffnen des rechten Drawers"
      );
      // ALT: Rechten Drawer jetzt nicht öffnen, kann durch Benutzer später erfolgen mit dem gesetzten Topic
      // NEU: Abhängig vom zweiten, optionalen Parameter den rechten Drawer öffnen
      if (openRightDrawer) {
        // Abhängig vom zweiten, optionalen Parameter den rechten Drawer öffnen, allerdings nur, wenn definierter Inhalt in fachlicher Hilfe:
        if (fachlicheHilfeIstVorhanden) {
          this.hamburger = false; // NEU - sicherheitshalber
          this.left = false; // Linken Drawer schließen, um Platz zu gewinnen für rechten Drawer
          this.right = true;
        } // Sonst bleibt der Drawer unverändert (kann vom Benutzer geöffent oder geschlossen sein)
      } // Sonst bleibt der Drawer unverändert (kann vom Benutzer geöffent oder geschlossen sein)
    });

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // NEU - Backlog Item #113 : Anmelden nur auslösen, wenn keine eMail oder kein Token zu finden ist in localStorage:
    // UPDATE: Dies nur ausführen, wenn die aktuelle Route nicht /Kontobestaetigung/... oder /Kennwortresetanforderung/... oder /Kennwortreset ist
    //         Andernfalls würde, da für Kontobestätigung noch keine Anmeldedaten gültig sind,
    //         fälschlich eine Redirection auf die Anmeldeseite ausgeführt, statt die Page für die Kontobestätigung anzuzeigen.
    //         Ob die aktuelle Route die für die Kontobestätigung ist (/Kontobestaetigung/:token) muss hier allerdings erst aus dem $route-Objekt bestimmt werden:
    console.log("$route: ", this.$route);
    console.log("$route.name: ", this.$route.name); // ACHTUNG: $route.name ist noch undefined zu diesem Zeitpunkt!!! Daher nicht verwendbar für obige Route-Bestimmung
    // Stattdessen: Den ersten Teil (z.B. "Kontobestaetigung") aus der current Route extrahieren:
    const firstPartOfRoute = window.location.pathname.split("/")[1]; // Von https://stackoverflow.com/questions/8082239/get-the-first-part-of-a-url-path
    console.log("firstPartOfRoute: ", firstPartOfRoute); // ACHTUNG: firstPartOfRoute ist tatsächlich Case-sensitiv, wie man bei Tests aus obigen Console Logs sieht, daher ist toLowerCase notwendig!!!
    if (
      firstPartOfRoute.toLowerCase() !== "kontobestaetigung" &&
      firstPartOfRoute.toLowerCase() !== "kennwortresetanforderung" &&
      firstPartOfRoute.toLowerCase() !== "kennwortreset"
    ) {
      console.log(
        "In localStorage nach Credentials suchen und ggf. Benutzerdaten damit setzen"
      );
      if (
        localStorage.getItem("eMail") &&
        localStorage.getItem("timeStamp") &&
        localStorage.getItem("jwtToken") &&
        localStorage.getItem("id") &&
        localStorage.getItem("benutzerRolle") &&
        localStorage.getItem("tablesPaginationRowsPerPage") &&
        localStorage.getItem("farbSchema") && // NEU
        localStorage.getItem(
          "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig"
        ) &&
        localStorage.getItem("vorgabeWerteUeberschreibenVorhandeneWerte") && // NEU: Für #262
        localStorage.getItem("selectedKeyTreeBaueinheiten") && // NEU: Für #400 - ACHTUNG: Werte müssen bei Anmeldung aus Benutzereinstellungen nach localStorage kopiert worden sein, sonst passiert Rerouting auf Anmeldung unten!
        localStorage.getItem("selectedKeyTreeBaustoffe") // NEU: Für #400 - ACHTUNG: Werte müssen bei Anmeldung aus Benutzereinstellungen nach localStorage kopiert worden sein, sonst passiert Rerouting auf Anmeldung unten!
      ) {
        // NEU: Wenn localStorage Credentials enthält (z.B. nach einem Browser Refresh), mit diesen in localStorage gehaltenen Credentials weitermachen
        // NEU: Macht nur Sinn, wenn wie am Backend Expiration Timeout dafür berücksichtigt wird (sonst wird nach einer Token Expiration am Backend hier versucht,
        // sich mit dem abgelaufenen Token anzumelden) - die Token Expiration am Backend ist aktuell auf 12 h gesetzt, selber Wert wird hier verwendet
        let timeNow = new Date(); // Aktuelle Zeit
        let timeStamp = localStorage.getItem("timeStamp"); // Die bei der Anmeldung abgespeicherte Zeit im Date()-Format, zu der der Token gesetzt wurde
        let timeDifference = (timeNow - timeStamp) / (1000 * 60); // Zeitdifferenz in Minuten, siehe siehe https://stackoverflow.com/questions/13894632/get-time-difference-between-two-dates-in-seconds
        console.log("Credentials-Alter in Minuten: ", timeDifference);
        if (timeDifference < 12 * 60) {
          // Wenn Token jünger ist als 12 Stunden
          console.log(
            "In localStorage gehaltene Credentials werden weiter verwendet"
          );

          // Felder setzen für Dropdown-Menu:
          this.benutzer.eMail = localStorage.getItem("eMail");
          this.benutzer.vorName = localStorage.getItem("vorName");
          this.benutzer.nachName = localStorage.getItem("nachName");

          globalStore.anmeldungBenutzer(
            this.benutzer.eMail,
            localStorage.getItem("jwtToken"),
            localStorage.getItem("id"),
            localStorage.getItem("benutzerRolle"),
            localStorage.getItem("tablesPaginationRowsPerPage"),
            localStorage.getItem("farbSchema"), // NEU
            JSON.parse(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              // ACHTUNG: Dies ist auch in einstellungen.vue notwendig, wo diese Einstellung nach einem Update (API put Request) ebenfalls im local Storage aktualisiert werden muss!!!
              localStorage.getItem(
                "treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig"
              )
            ),
            JSON.parse(
              // ACHTUNG: Im Browser localStorage (Web Storage) müsssen Boolean-Werte zu Strings konvertiert werden - siehe https://stackoverflow.com/questions/28926997/how-to-have-localstorage-value-of-true
              // ACHTUNG: Dies ist auch in einstellungen.vue notwendig, wo diese Einstellung nach einem Update (API put Request) ebenfalls im local Storage aktualisiert werden muss!!!
              localStorage.getItem("vorgabeWerteUeberschreibenVorhandeneWerte")
            ), // NEU: Für #262
            localStorage.getItem("selectedKeyTreeBaueinheiten"), // NEU: Für #400
            localStorage.getItem("selectedKeyTreeBaustoffe"), // NEU: Für #400
          );
          // ACHTUNG: In diesem Fall die bisherige Route wieder aufrufen:
          // Siehe https://stackoverflow.com/questions/53788975/vue-router-how-to-get-previous-page-url
          // this.$router.go(-1); // Nicht notwendig, die bisherige Route bleibt erhalten!
          // Siehe Code in beforeEnter Route Guard in front-end-server-routes.js!
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU: Farbschema, hier nur loggen:
          let farbSchema = this.localStore.state.einstellungenBenutzer
            .farbSchema; // NEU: Einstellbares Farbschema holen, wird aus localStore im Template benutzt
          console.log("farbSchema:", farbSchema);
        } else {
          console.log(
            "Credentials sind älter als 12 Stunden, Neuanmeldung ist erforderlich"
          );
          // Hier wird dann die Default Route aufgerufen (Anmeldeseite)
          // Siehe Code in beforeEnter Route Guard in front-end-server-routes.js!
          // NEU: In diesem Fall abmelden - setzt auch globalStore.state.anmeldeDatenBenutzer zurück
          this.abmeldenBenutzer(true); // HINWEIS: Das Backend liefert am API beim Logout aktuell immer 200, egal ob der Benutzer angemeldet war oder nicht
          // NEU: Parameter timeOut (hier true) - steuert in abmeldenBenutzer(timeOut), welche Meldung ausgegeben wird
          // Daher müsste man diesen Call immer machen können, ohne dass Fehler auftreten
          this.$router.push("/Anmeldung");
        }
      } else {
        console.log(
          "Keine Credentials in localStorage gefunden oder diese sind expired, Neuanmeldung ist erforderlich"
        );
        // Hier wird dann die Default Route aufgerufen (Anmeldeseite)
        // Siehe Code in beforeEnter Route Guard in front-end-server-routes.js!
        //-------------------------------------------------------------------------------------------------------------------------------------------------
        // NEU: In diesem Fall auch Meldung anzeigen, dass Abmeldung aus Sicherheitsgründen erfolgt ist
        // Dies eingebaut, nachdem aus obigem Call (abmeldenBenutzer(true)) im Testbetrieb keine solche Meldung kam
        // HINWEISE zu localStorage: https://stackoverflow.com/questions/2326943/when-do-items-in-html5-local-storage-expire
        // localStorage kennt offenbar keine Expiration von selbst, d.h. localStorage wird eigentlich nur gelöscht durch abMeldenBenutzer()!!!
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.AUTHORISIERUNG_ABMELDUNG_ERFOLG_NACH_ABLAUF
        );
        // NEU - #391: Auch hier präventiv die Drawers closen, linker Drawer ist in Tests, warum auch immer, manchmal offen:
        this.left = false;
        this.right = false;
        this.$router.push("/Anmeldung");
      }
    } else {
      console.log(
        "firstPartOfRoute.toLowerCase() ist 'kontobestaetigung', 'kennwortresetanforderung' oder 'kennwortrest' - diese Route wird beibehalten"
      );
    }
    this.startMarqueeTimeout(); // Initiere Timeout für Marquee Laufschrift
  } // /created:
};
</script>
//***------------------------------------------------------------------------------------------------------------------------------------------------------------------
<style>
.my-menu-font {
  /* Font Definition für Property content-class="my-menu-font" am obersten QTab (Hauptmenü)
  /* height: 20px; */ /* Funktioniert, aber nicht der gewünschte Effekt */
  /* max-width: 80vw; */ /* Funktioniert, aber nicht der gewünschte Effekt */
  /* color: yellow */ /* Funktioniert, aber nicht der gewünschte Effekt */
  /* font-size: 8px; */ /* Funktioniert leider nicht */
  /* font-size: 50vw; */ /* Funktioniert leider nicht */
  /* font-stretch: 50%; */ /* Funktioniert leider nicht */
  /* font-stretch: condensed; */ /* Funktioniert leider nicht */
  /* font-size-adjust: 0.5; */ /* Funktioniert leider nicht */
  /* transform: scale(.9, 1); */ /* Funktioniert, aber nicht der gewünschte Effekt */
  /* transform: scalex(.9); */ /* Funktioniert, aber nicht der gewünschte Effekt */
  /* font-family: Roboto; */ /* Funktioniert, aber nicht der gewünschte Effekt */
  font-stretch: condensed;
}
.accent {
  color: #8e24aa;
} /* Diese CSS-Klasse wird verwendet im Markdown für Bedienungshilfe! */

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
  height: 10px;
}
.background-color-grey-1 {
  background-color: #fafafa;
}
</style>
