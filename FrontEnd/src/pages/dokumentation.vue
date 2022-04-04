<template>
  <q-page padding>
    <!-- NEU: Seitenbreite reduzieren per div mit style="width" Parameter -->
    <!-- TODO: Eventuell später mehrspaltiges Layout implementieren -->
    <!-- <div style="width:1400px"> -->
    <div>
      <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- <q-scroll-area ref="scrollArea"> -->
      <!-- Quasar Scroll Area, aktuell disabled -->
      <!-- Siehe z.B. https://forum.quasar-framework.org/topic/3044/integrating-qlayout-qtabs-qscrollarea/5                                   -->
      <!-- und Scroll Observer: https://quasar.dev/vue-components/scroll-observer                                                             -->
      <!-- sowie Versuche im Code unten                                                                                                       -->
      <!-- QScrollArea wird aktuell nicht verwendet                                                                                           -->
      <!-- QScrollArea generiert zusätzliche "innere" Scroll Area zur äußeren des Browsers                                                    -->
      <!-- Innerhalb dieser Scroll Area gelingt das Scrollen mittels Aufrufen                                                                 -->
      <!-- this.$refs.scrollArea.setScrollPosition(target, duration) - d.h. nur 2, nicht 3 Parameter an setScrollPosition()                   -->
      <!-- Siehe auch https://quasar.dev/vue-components/scroll-area#Scroll-position                                                           -->
      <!-- ---------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- Hinweis: Die Dokumentation ist bisher vor allem zum Test von verschiedenen Gestaltungsmitteln angelegt,                            -->
      <!-- die eigentlichen BIM.<em>click</em> Dokumentationsinhalte werden erst nach und nach hinzugefügt.                                   -->
      <!------------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- Start HTML mit Dokumentations-Information, Heading-Struktur und Ids für Scrolling werden in dokumentationsVerzeichnis.js verwaltet -->
      <!-- Dabei generiert QMarkup die Ids (ab Dokumentationsabschnitt 2.0 aus seinem Table of Content                                        -->
      <!------------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- HINWEIS: Mit HTML Heading Level <h4> starten, der bzgl. Font Size in etwa dem <h1> aus QMarkdown entspricht, welches weiter        -->
      <!-- unten verwendet wird und welches automatisch weitere HTML Headings erzeugt:                                                        -->
      <!-- Dabei class="text-weight-medium" verwenden, um selbe Appearance wie die <h1> Headings von QMarkdown zu bekommen                    -->
      <!------------------------------------------------------------------------------------------------------------------------------------- -->
      <div id="Online-Dokumentation"></div>
      <q-expansion-item
        v-if="true"
        group="bim-click-doc-group-1"
        popup
        :default-opened="true"
        dense
        icon="visibility"
        label="BIM.click Logos und Video"
        header-class="bg-secondary text-white text-bold"
        expand-icon-class="text-white"
      >
        <div class="row full-width q-col-gutter-md q-pa-xs">
          <div class="col-md-4 col-12 self-center">
            <!-- style="max-height: 50%" -->
            <q-img
              :src="
                localStore.state.einstellungenBenutzer.farbSchema === 'grau'
                  ? 'statics/logos/bim-click-logo-braun-gruen-945x256.png'
                  : 'statics/logos/bim-click-logo-945x256.png'
              "
            >
            </q-img>
          </div>
          <div class="col-md-4 col-12 self-center">
            <!-- style="max-height: 50%" -->
            <!-- ALT: -->
            <!--
            <q-img
              :src="
                localStore.state.einstellungenBenutzer.farbSchema === 'grau'
                  ? 'statics/images/bim-click-all-in-one-teaser-braun-gruen.png'
                  : 'statics/images/bim-click-all-in-one-teaser-apricot-cyan.png'
              "
            >
            -->
            <!-- NEU: -->
            <q-img
              src="
              statics/logos/bmwi-und-digital-jetzt-logos-945x350.png
            "
            >
            </q-img>
          </div>
          <div class="col-md-4 col-12">
            <q-video
              :ratio="16 / 9"
              src="https://www.youtube.com/embed/UPQ3EGFrcGo"
            >
            </q-video>
          </div>
        </div>
      </q-expansion-item>
      <br />
      <q-expansion-item
        group="bim-click-doc-group-1"
        popup
        :default-opened="false"
        icon="visibility"
        dense
        label="BIM.click auf einen Blick"
        header-class="bg-secondary text-white text-bold"
        expand-icon-class="text-white"
      >
        <q-img
          :src="
            localStore.state.einstellungenBenutzer.farbSchema === 'grau'
              ? 'statics/images/bim-click-all-in-one-teaser-braun-gruen.png'
              : 'statics/images/bim-click-all-in-one-teaser-apricot-cyan.png'
          "
        >
        </q-img>
      </q-expansion-item>
      <br />
      <br />
      <div class="text-h4 text-weight-medium q-gutter-md">
        &nbsp; &nbsp;
        <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
        Online-Dokumentation
      </div>
      <br />
      <div class="row full-width q-col-gutter-md">
        <div class="col-md-4 col-12">
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            color="secondary"
            label="Doku-Inhaltsverzeichnis öffnen"
            @click="emitDrawerEvent"
            glossy
            no-caps
          />
        </div>
        <!-- Hinweis: #391 - solche statischen Dateien, wie z.B. der Beta Quickstart-Leitfaden hier, könnten statt aus dem unprotected statics Ordner am Frontend -->
        <!-- aus Sicherheitsgründen aus dem statisch vom -->
        <!-- Express Backend Server bedienten Folder tmp/download/.. AM BACKEND liegen, welches per Express app.use-Logik in back-end-server.js protected werdee kann durch Anmeldung ("Step 5" dort)?-->
        <!-- Diese Protection schlug aber leider fehl, weil damit auch Downloads aus diesem Ordner nicht mehr zugreifbar sind! -->
        <!-- Alternative mit protected assets Folder am Frontend? -->
        <!-- Leider funktioniert aber damit das q-btn mit href nicht mit Files im protected assets Folder (nur q-img unterstüzt es mit "~" Support, siehe Testfälle weiter unten) -->
        <!-- Testfall: href="~assets/LBO_BW.pdf", d.h. "~" Support am href funktioniert HIER am href NICHT wie am q-img src (es kommt Unauthorized/Cannot GET) -->
        <!-- Siehe weitere Testfälle unten -->
        <!-- href="https://bimclickserver.herokuapp.com/pdfs/bim-click-beta-quickstart-leitfaden.pdf" -->
        <!-- Dieses PDF liegt aktuell unprotected am Backend (Step 4 ist wieder aktiv in back-end-server.js), könnte aber auch in statics (auch unprotected) liegen am Frontend -->
        <!-- NEU: Lösung mittels per Webpack und computed-Funktion aus dem protected assets Folder am Frontend geladenen PDF: -->
        <div class="col-md-4 col-12">
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            :href="computeBetaPDF"
            type="a"
            target="_blank"
            label="Beta-Quickstart-Leitfaden öffnen"
            color="orange"
            glossy
            no-caps
          />
          <!-- ALT:
        <div class="col-md-4 col-12">
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            href="https://bimclickserver.herokuapp.com/pdfs/bim-click-beta-quickstart-leitfaden.pdf"
            type="a"
            target="_blank"
            label="Beta-Quickstart-Leitfaden öffnen"
            color="orange"
            glossy
            no-caps
          />
          -->
          <!-- Hier diverse Testfälle für #391, auch mit q-btn (wie es mit q-img funktioniert) auf den assets Folder zuzugreifen, um Image oder PDF in separatem Browser Tab anzuzeigen -->
          <!-- Ergebnisse: -->
          <!-- - Zugriff auf unprotected statics Folder funktioniert mit q-img src und q-btn href -->
          <!-- - Zuriff auf protected assets Folder funktioniert leider nicht mit q-btn href so wie mit q-img src -->
          <!-- Siehe https://github.com/quasarframework/quasar/discussions/12548 -->
          <!-- Lösung schließlich: Siehe unten, mit Webpack Loader für PDFs, include für das PDF und computed-Funktion für das href am q-btn -->
          <!--
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            label="QBtn with image at remote URL - works with q-img and q-btn"
            type="a"
            target="blank"
            href="https://dummyimage.com/100.png"
            color="orange"
            glossy
            no-caps
          />
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            label="QBtn with image in statics folder, using href='statics/...' - works with q-img and q-btn"
            type="a"
            target="blank"
            href="statics/100.png"
            color="orange"
            glossy
            no-caps
          />
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            label="QBtn with image in assets folder, using href='~assets/...' - works with q-img, 'Cannot GET' with q-btn!"
            type="a"
            target="blank"
            href="~assets/100.png"
            color="orange"
            glossy
            no-caps
          />
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="menu_book"
            label="QBtn with image in assets folder, using :href='~assets/...' and double quotes, 'Cannot GET' with q-btn!"
            type="a"
            target="blank"
            :href="'~assets/100.png'"
            color="orange"
            glossy
            no-caps
          />
        --></div>
        <div class="col-md-4 col-12">
          <q-btn
            class="stretch full-width"
            style="height:100%"
            size="md"
            icon="video_library"
            href="https://onedrive.live.com/embed?cid=A15AD755049DC6AC&resid=A15AD755049DC6AC%216961&authkey=AMli_vXZMRcvY7g"
            type="a"
            target="_blank"
            label="Intro-Video in Tab öffnen"
            color="info"
            glossy
            no-caps
          />
        </div>
      </div>
      <br />
      <q-separator />
      <h4 id="1-Digitale-Bauphysik" class="text-weight-medium">
        1 Digitale Bauphysik mit BIM.<em>click</em>
      </h4>
      <q-separator />
      <!-- ACHTUNG: Umlaut "ü" in folgendem Heading - können so nicht in URL/Route aufgenommen werden!!! -->
      <h5 id="1.1-Einfuehrung" class="text-weight-medium">
        1.1 Kurzeinführung: Was ist BIM.<em>click</em>?
      </h5>
      <ul>
        <li>
          BIM.<em>click</em> ist eine Softwarelösung für den
          <b>Planungsprozess im Bauwesen,</b> die alle dafür relevanten
          Informationen <b>digital verwaltet</b> und
          <b>integrativ zusammenführt.</b>
        </li>
        <li>
          Der Schwerpunkt von BIM.<em>click</em> liegt auf den für
          <b>Bauphysiker, Fachingenieure</b> und <b>Fachplaner</b> kritischen
          Planungsinformationen.
        </li>
        <li>
          Das BIM.<em>click</em> zugrundeliegende <b>Informationsmodell</b> und
          seine Implementierung in einem <b>Datenbankschema</b>
          sind auf die spezifischen Anforderungen dieser Zielgruppen
          zugeschnitten.
        </li>
        <li>
          BIM.<em>click</em> differenziert sich von anderen BIM-Werkzeugen durch
          die <b>Kombination</b> folgender <b>besonderer Fähigkeiten</b>:
        </li>
        <ul>
          <li>
            <b>Strukturierte Planung</b> auf Basis von <b>Regelwerken</b> und
            <b>Expertenwissen:</b>
            <ul>
              <li>
                BIM.<em>click</em> überprüft die Konformität der Planung mit den
                spezifisch relevanten Regelwerken, d.h. den gültigen
                <b>gesetzlichen Vorschriften</b> und anwendbaren <b>Normen.</b>
              </li>
              <li>
                Es steuert fachliches Expertenwissen bei der Planung bei (z.B.
                durch Wizards auf der Basis von
                <b>"best Practices").</b>
              </li>
              <li>
                Es liefert wichtige Informationen zur Erreichung der Ziele für
                <b>Klimaschutz</b> und <b>Nachhaltigkeit</b>
                der Planung.
              </li>
            </ul>
          </li>

          <li><b>Intelligentes Informationsmodell:</b></li>
          <ul>
            <li>
              BIM.<em>click</em> unterstützt ein breites Spektrum von fachlichen
              <b>Unterdisziplinen</b>, die im BIM.<em>click</em>-Kontext als
              <b>fachliche Kategorien</b> bezeichnet werden. Jede Kategorie wird weiter in <b>fachliche Rubriken</b>
              untergliedert.
              <q-expansion-item
                popup
                dense
                icon="visibility"
                label="Fachliche Kategorien und Rubriken in BIM.click"
                header-class="bg-secondary text-white text-bold"
                expand-icon-class="text-white"
              >
              <!-- NEU: Neue fachliche Kategorien/Rubriken in QCarousel: -->
              <!-- Ohne Prop navigation -->
              <q-carousel
                v-model="carouselSlideFachlicheKategorienBaueigenschaften"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                control-color="white"
                padding
                arrows
                height="1600px"
                class="bg-secondary text-black shadow-1 rounded-borders"
              >
                <q-carousel-slide name="FachlicheKategorienBaueigenschaften">
                  <div class="row q-gutter-md q-ma-md">
                    <q-card v-for="kategorie in optionsFachlicheKategorienBaueigenschaften" :key="kategorie.ueberschriftKategorie" class="my-card2">
                      <div class="text-center text-bold">
                        {{ kategorie.ueberschriftKategorie }}
                      </div>
                      <q-card-section class="column no-wrap flex-center">
                        <div class="q-pa-xs text-center" v-for="rubrik in kategorie.optionsKategorie" :key="rubrik.label">
                          {{ rubrik.label }}
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </q-carousel-slide>
              </q-carousel>
                <!-- ALT: Alte Schutzkategorien/fachliche Rubriken: -->
                <!--
                <q-card bordered>
                  <div class="row">
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Projektsteuerung</li>
                        <li>Recht</li>
                        <li>Geografie</li>
                        <li>Geopolitik</li>
                        <li>Infrastruktur</li>
                        <li>Umwelt und Klima</li>
                        <li>Hydrogeologie</li>
                      </ul>
                    </div>
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Geometrie</li>
                        <li>Konstruktion</li>
                        <li>Nutzlasten</li>
                        <li>Nutzungs- und Betriebszeiten</li>
                        <li>Raumklima</li>
                        <li>Beleuchtung</li>
                      </ul>
                    </div>
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Schallschutz</li>
                        <li>Raumakustik</li>
                        <li>Wärmeschutz</li>
                        <li>Energieeinsparung</li>
                      </ul>
                    </div>
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Standsicherheit</li>
                        <li>Gebrauchstauglichkeit</li>
                        <li>Verkehrssicherheit</li>
                        <li>Barrierefreiheit</li>
                      </ul>
                    </div>
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Brandschutz</li>
                        <li>Feuchteschutz</li>
                        <li>Korrosionsschutz</li>
                        <li>Abdichtungstechnik</li>
                        <li>Holzschutz</li>
                      </ul>
                    </div>
                    <div class="col-md-2 col-12">
                      <ul>
                        <li>Gesundheit und Hygiene</li>
                        <li>Schadstoffschutz</li>
                        <li>Umweltverträglichkeit</li>
                        <li>Ökobilanz</li>
                        <li>Nachhaltigkeit</li>
                        <li>Materialeigenschaften</li>
                      </ul>
                    </div>
                  </div>
                </q-card>
                -->
              </q-expansion-item>
            </li>
            <li>
              BIM.<em>click</em> ist so konzipiert, dass die Planung und
              Modellierung von Bauvorhaben und Gebäuden auch
              <b>ohne CAD-Modell</b> möglich ist. Dafür gibt es zwei wesentliche Gründe:
              <ul>
                <li>
                  Das CAD-Modell liegt in den frühen Leistungsphasen, in denen
                  Bauphysiker, Fachingenieure und Fachplaner proaktiv tätig
                  werden, in vielen Fällen noch nicht vor.
                </li>
                <li>
                  CAD-Systeme sind auf die
                  geometrische Modellierung durch den Architekten fokussiert
                  und erlauben nicht die Verwaltung komplexer fachlicher
                  Zusammenhänge wie Regelwerksbezüge und Vererbung von
                  Anforderungen in dem benötigten breiten Spektrum von
                  Unterdisziplinen.
                </li>
              </ul>
              Die Synchronisation mit CAD-Modellen erfolgt per bidirektionalem
              <b>BIM-Datenaustausch.</b>
            </li>
            <li>
              <b>Baumstrukturen</b> mit verschachtelten Strukturen aus Objekten
              ermöglichen sowohl die <b>Modellierung von Bauvorhaben</b> (z.B.
              Standorte, Gebäude, Geschosse, Räume, etc.) als auch die
              <b>Verwaltung von Baustoffen</b> (z.B. Betone, Estriche,
              Dämmstoffe, etc. )
            </li>
            <li>
              An den beteiligten Objekten können <b>Attribute</b>, die in
              BIM.<em>click</em> als <b>Baueigenschaften</b> bezeichnet werden,
              als Mittel zur technischen Charakterisierung dieser Objekte
              aktiviert und vom Planer mit Werten belegt werden. Diese decken
              das obige breite fachliche Spektrum ab.
            </li>
            <li>
              <b>Wertevererbung</b> erlaubt die Weitergabe der Werte von
              Attributen an Objekten an verschachtelte Unterobjekte (z.B. von
              Standortdaten an die Gebäude am Standort, oder von Anforderungen
              aus Regelwerken gemäß der geplanten Nutzung von Räumen an
              Bauteile). Auch diese Anforderungen werden von gängigen
              CAD-Systemen nicht unterstützt.
            </li>
            <li>
              Ähnlich wie <b>Property Sets</b> im
              <b>Industry Foundation Classes (IFC)</b> Standard für
              <b>Building Information Modelling (BIM)</b> können fachlich
              zusammengehörende Attribute zu sogenannten
              <b>Baueigenschaftsprofilen</b> zusammengefasst werden und
              gemeinsam an Objekten aktiviert werden.
            </li>
            <li>
              Die <b>Erweiterbarkeit</b> ist gewährleistet, da dem
              Informationsmodell jederzeit neue Attribute hinzugefügt werden
              können, ohne dass das Datenbankschema geändert werden muss.
            </li>
          </ul>
          <li>
            <b>Verfügbarkeit: </b> BIM.<em>click</em> ist als
            <b>Web- und Cloud-basierte</b>
            Software-Lösung mit Netzzugang und Zugangsberechtigung
            <b>jederzeit und überall verfügbar,</b> per
            <b>Internet Browser</b> und als <b>App</b>, auf stationären und auf
            mobilen Geräten.
          </li>
          <li>
            <b>Betrieb:</b> Mit BIM.<em>click</em> entfällt die lästige und auf
            Dauer aufwändige Notwendigkeit, die Software auf allen genutzten
            Geräten zu <b>installieren</b> und <b>aktuell zu halten.</b> Im
            Gegensatz zu gängiger CAD-Software stellt BIM.<em>click</em>
            außerdem keine erhöhten Anforderungen an die
            <b>Hardware-Ausstattung</b> von zum Zugang genutzten Geräten.
          </li>
        </ul>
      </ul>
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------------------>
      <div id="Testsprungziel">
        <!-- Test DOM ID für Scrolling/Link Tests -->
      </div>
      <h5
        id="1.2-Grundkonstrukte:-Bauvorhaben,-Baustoffe,-Bauinformationen"
        class="text-weight-medium"
      >
        1.2 Grundkonstrukte für die Planung: Bauvorhaben, Baustoffe,
        Bauinformationen
      </h5>
      BIM.<em>click</em> sieht die folgenden fundamentalen
      <b>Grundkonstrukte</b> für den Planungsprozess im Bauwesen vor:
      <!-- Vorlage von https://codepen.io/smolinari/pen/jRRLWE -->
      <!-- Ohne Prop navigation -->
      <div class="q-pa-md">
        <q-carousel
          v-model="carouselSlide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="white"
          padding
          arrows
          height="660px"
          class="bg-secondary text-black shadow-1 rounded-borders"
        >
          <q-carousel-slide name="Grundkonstrukte">
            <div class="row q-gutter-md q-ma-md">
              <q-card class="my-card">
                <q-card-section class="column wrap flex-center">
                  <q-icon
                    name="apartment"
                    color="secondary"
                    size="56px"
                  ></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Bauvorhaben</strong>
                  </div>
                  <div class="q-mt-md text-left">
                    <ul>
                      <li>
                        Diese sind der Hauptgegenstand der baulichen Planung.
                      </li>
                      <br />
                      <li>
                        Sie werden unter
                        <router-link to="/Bauvorhaben">Bauvorhaben</router-link>
                        im
                        <strong>Bauvorhabenbaum</strong>
                        verwaltet.
                      </li>
                      <br />
                      <li>
                        Im Bauvorhabenbaum ist jedes geplante Bauvorhaben aus
                        <strong>Baueinheiten</strong>
                        zusammengesetzt.
                      </li>
                      <br />
                      <li>
                        Diese <strong>Baueinheiten</strong> sind die
                        Grundkonstrukte, aus denen Projekte, Standorte, Gebäude,
                        Räume und alle weiteren bauvorhabens- und
                        gebäudespezifischen Bauteile modelliert und
                        zusammengesetzt werden können.
                      </li>
                      <br />
                      <li>
                        Baueinheiten haben spezifische <b>Eigenschaften,</b> die
                        sowohl Anforderungs- als auch Erfüllungscharakter haben
                        können.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="my-card">
                <q-card-section class="column wrap flex-center">
                  <q-icon name="build" color="secondary" size="56px"></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Baustoffe</strong>
                  </div>
                  <div class="q-mt-md text-left">
                    <ul>
                      <li>
                        Das sind Baumaterialien mit spezifischen Eigenschaften,
                        die ebenfalls in der baulichen Planung verwendet werden.
                      </li>
                      <br />
                      <li>
                        Sie werden unter
                        <router-link to="/Baustoffe"> Baustoffe</router-link>
                        im
                        <strong>Baustoffbaum</strong>
                        verwaltet.
                      </li>
                      <br />
                      <li>
                        Im Baustoffbaum werden der Einfachheit halber sowohl
                        bestimmte Kategorien von Baustoffen (z.B. Fenster oder
                        Türen) als auch konkrete Bauprodukte (z.B. Dämmplatten
                        eines bestimmten Herstellers und Typs) als
                        <strong>Baustoffe</strong>
                        bezeichnet.
                      </li>
                      <br />
                      <li>
                        Baustoffe bringen spezifische
                        <strong>Materialeigenschaften</strong>
                        mit, die überwiegend Erfüllungscharakter haben.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="my-card">
                <q-card-section class="column wrap flex-center">
                  <q-icon
                    name="menu_book"
                    color="secondary"
                    size="56px"
                  ></q-icon>
                  <div class="q-mt-md text-center">
                    <strong> Bauinformationen</strong>
                  </div>
                  <div class="q-mt-md text-left">
                    <ul>
                      <li>
                        Das sind Dokumente und Links, die in der baulichen
                        Planung verwendet werden.
                      </li>
                      <br />
                      <li>
                        Sie werden unter
                        <router-link to="/Bauinformationen"
                          >Bauinformationen</router-link
                        >
                        verwaltet.
                      </li>
                      <br />
                      <li>
                        Dazu zählen zum Beispiel Normen, Regelwerke,
                        Vorschriften, Richtlinien, Zulassungen, Nachweise,
                        Datenblätter und sonstige Informationen.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
          <!-- Weitere Carousel Slides werden vorläufig nicht benötigt: -->
          <!--
        <q-carousel-slide name="tv">
          <div class="row q-gutter-md q-ma-md">
            <q-card v-for="i in 3" :key="i" class="my-card">
              <q-card-section class="column no-wrap flex-center">
                <q-icon name="live_tv" color="secondary" size="56px"></q-icon>
                <div class="q-mt-md text-center">
                  <strong>Baustoffe</strong><br />
                  {{ loremshort }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers">
          <div class="row q-gutter-md q-ma-md">
            <q-card v-for="i in 3" :key="i" class="my-card">
              <q-card-section class="column no-wrap flex-center">
                <q-icon name="layers" color="secondary" size="56px"></q-icon>
                <div class="q-mt-md text-center">
                  <strong>Bauinformationen</strong><br />
                  {{ loremshort }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map">
          <div class="row q-gutter-md q-ma-md">
            <q-card v-for="i in 3" :key="i" class="my-card">
              <q-card-section class="column no-wrap flex-center">
                <q-icon name="terrain" color="secondary" size="56px"></q-icon>
                <div class="q-mt-md text-center">
                  <strong>Datenaustausch</strong><br />
                  {{ loremshort }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
       -->
        </q-carousel>
      </div>
      BIM.<em>click</em> führt somit alle relevanten Informationen für die
      bauliche Planung zusammen und <b>verknüpft</b> diese miteinander:
      <ul>
        <li>
          Bauvorhaben- und gebäudespezifische Informationen in
          <b>Bauvorhaben</b>, bestehend aus <b>Baueinheiten</b>
        </li>
        <li>
          Baustoffspezifische Informationen in <b>Baustoffen</b>, welche
          <b>Baueinheiten</b> in Bauvorhaben planerisch <b>zugeordnet</b> werden
          können
        </li>
        <li>
          Dokumente und Links als
          <b>Bauinformationen</b>, welche sowohl <b>Baueinheiten</b> in
          Bauvorhaben als auch <b>Baustoffen</b> planerisch
          <b>zugeordnet</b> werden können
        </li>
      </ul>
      Bei den genannten <b>Zuordnungen</b> durch den Planer kann das System
      <b>"Planungsintelligenz"</b>
      einbringen. Das lässt sich an zwei einfachen Beispielen erklären:
      <ul>
        <li>
          Bei der Zuordnung eines Baustoffs zu einer bestimmten Baueinheit kann
          das System überprüfen, ob z.B. an der Baueinheit definierte
          Anforderungen an den Schadstoffschutz durch den ausgewählten Baustoff
          erfüllt sind
        </li>
        <li>
          Bei der Zuordnung einer Bauinformation, die eine Nachhaltigkeitsnorm
          reflektiert, zu einer bestimmte Baueinheit kann das System durch die
          Norm vorgegebene Anforderungen an die Baueinheit weitergeben
        </li>
      </ul>
      Durch die Verknüpfbarkeit aller Daten im System sind der
      Planungsintelligenz in der Praxis keine Grenzen gesetzt. Denkbar sind
      intelligente Wizards, die den Planer unterstützen bis hin zum Einsatz von
      Algorithmen aus dem Data Mining und der künstlichen Intelligenz.
      <!------------------------------------------------------------------------------------------------------------------------------->
      <!-- Es folgt Dokumentationsinformation im Markdown Format: -->
      <!-- Nutzt Quasar Extension QMarkdown - siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs -->
      <!-- Dezember 2020: Defect #259 - Scrolling zu den von QMarkdown generierten Links funktioniert nicht mehr -->
      <!-- Per Log werden die Links (elementId) zwar von QMarkdown wie erwartet erzeugt, aber der Call document.getElementById(elementId) unten im Code -->
      <!-- liefert null, warum auch immer -->
      <!-- Die Angabe der toc Prop an q-markdown hilft auch nicht dagegen -->
      <!-- Fixed: Siehe unten Kommentare in bim-click-dokumentation.md -->
      <!-- q-markdown Props Docs hier: https://quasarframework.github.io/quasar-ui-qmarkdown/docs#QMarkdown-API -->
      <q-markdown
        no-breaks
        no-heading-anchor-links
        ref="markdown"
        :src="markdownDokumentation"
      >
        <!-- ACHTUNG - #391: Da die Anchor Links an den Headings irgendwie nicht funktionieren, diese mit obiger Prop temporär disabled! -->
        <!-- Referenziert mittels Properties toc und @data="onToc" sowie Methode onToc unten eine ToC-Generierung, dieses ToC wird aber vorläufig -->
        <!-- nicht benötigt, daher beides abgeklemmet. -->
        <!-- Stattdessen wird dokumentationsVerzeichnis.js verwendet mit (teilweise) von QMarkdown generierten Heading ids, zum Teil sind aber -->
        <!-- manuelle Eingrife in dokumentation.md nötig, siehe Kommentare dort -->
      </q-markdown>
      <!------------------------------------------------------------------------------------------------------------------------------->
      <!-- NEU: Test von Vue+Markdown Content aus .vmd-Komponente -->
      <!-- Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs#importing-vue%2Bmarkdown-(.vmd) -->
      <VmdTest />
      <!------------------------------------------------------------------------------------------------------------------------------->
      <!------------------------------------------------------------------------------------------------------------------------------->
      <!-- Es folgen Tests für weitere Gestaltungsmöglichkeiten der Dokumentation zusätzlich zu Markdown, mit Quasar, Vue und HTML-Mitteln -->
      <!-- <q-separator /> -->
      <!------------------------------------------------------------------------------------------------------------------------------->
      <!-- ACHTUNG: Sonderzeichen "(" und ")"! Muss manuell als Sprungziel definiert werden in HTML <h4>!!! -->
      <h4 id="13-Dokumentationsgestaltung-Test" class="text-weight-medium">
        13 Dokumentationsgestaltung (Test)
      </h4>
      <h5 id="13.1-Quasar-Gestaltungsmittel" class="text-weight-medium">
        13.1 Quasar Gestaltungsmittel
      </h5>
      <h6 id="13.1.1-QMarkupTable" class="text-weight-medium">
        13.1.1 QMarkupTable
      </h6>
      <div class="q-pa-md">
        <q-markup-table dark class="bg-indigo-8">
          <thead>
            <tr>
              <th class="text-left">Baustoff (100g)</th>
              <th class="text-right">Kalorien</th>
              <th class="text-right">Fett (g)</th>
              <th class="text-right">Kohlenhydrate (g)</th>
              <th class="text-right">Eiweiß (g)</th>
              <th class="text-right">Natrium (mg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Beton</td>
              <td class="text-right">159</td>
              <td class="text-right">6</td>
              <td class="text-right">24</td>
              <td class="text-right">4</td>
              <td class="text-right">87</td>
            </tr>
            <tr>
              <td class="text-left">Zement</td>
              <td class="text-right">237</td>
              <td class="text-right">9</td>
              <td class="text-right">37</td>
              <td class="text-right">4.3</td>
              <td class="text-right">129</td>
            </tr>
            <tr>
              <td class="text-left">Gips</td>
              <td class="text-right">262</td>
              <td class="text-right">16</td>
              <td class="text-right">23</td>
              <td class="text-right">6</td>
              <td class="text-right">337</td>
            </tr>
            <tr>
              <td class="text-left">Estrich</td>
              <td class="text-right">305</td>
              <td class="text-right">3.7</td>
              <td class="text-right">67</td>
              <td class="text-right">4.3</td>
              <td class="text-right">413</td>
            </tr>
            <tr>
              <td class="text-left">Sand</td>
              <td class="text-right">356</td>
              <td class="text-right">16</td>
              <td class="text-right">49</td>
              <td class="text-right">3.9</td>
              <td class="text-right">327</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <q-separator />
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------->
      <h6 id="13.1.2-QCard" class="text-weight-medium">13.1.2 QCard</h6>
      Beispiel für eine QCard als Gestaltungsmittel:
      <div class="q-pa-md">
        <q-card dark bordered class="bg-grey-9">
          <q-card-section>
            <div class="text-h6">BIM.click auf einen Blick</div>
            <div class="text-subtitle2">von Michael Scheible</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------->
      <h6 id="13.1.3-QCarousel" class="text-weight-medium">13.1.3 QCarousel</h6>
      Beispiel für QCarousel mit QCards als Gestaltungsmittel:
      <!-- Vorlage von https://codepen.io/smolinari/pen/jRRLWE -->
      <div class="q-pa-md">
        <q-carousel
          v-model="carouselSlide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-secondary text-black shadow-1 rounded-borders"
        >
          <q-carousel-slide name="Grundkonstrukte">
            <div class="row q-gutter-md q-ma-md">
              <q-card v-for="i in 3" :key="i" class="my-card">
                <q-card-section class="column no-wrap flex-center">
                  <q-icon name="style" color="secondary" size="56px"></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Bauvorhaben</strong><br />
                    {{ loremshort }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv">
            <div class="row q-gutter-md q-ma-md">
              <q-card v-for="i in 3" :key="i" class="my-card">
                <q-card-section class="column no-wrap flex-center">
                  <q-icon name="live_tv" color="secondary" size="56px"></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Baustoffe</strong><br />
                    {{ loremshort }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers">
            <div class="row q-gutter-md q-ma-md">
              <q-card v-for="i in 3" :key="i" class="my-card">
                <q-card-section class="column no-wrap flex-center">
                  <q-icon name="layers" color="secondary" size="56px"></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Bauinformationen</strong><br />
                    {{ loremshort }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map">
            <div class="row q-gutter-md q-ma-md">
              <q-card v-for="i in 3" :key="i" class="my-card">
                <q-card-section class="column no-wrap flex-center">
                  <q-icon name="terrain" color="secondary" size="56px"></q-icon>
                  <div class="q-mt-md text-center">
                    <strong>Datenaustausch</strong><br />
                    {{ loremshort }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <q-separator />
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------>
      <h6 id="13.1.4-QPdfViewer" class="text-weight-medium">
        13.1.4 QPdfViewer
      </h6>
      Test, um PDF "in-App" in der BIM.click App zu öffnen mit
      <b>QPdfViewer</b> Quasar App Extension: Aktuell deinstalliert und
      disabled, da nicht benötigt!
      <!-- Siehe https://quasarframework.github.io/app-extension-qpdfviewer/docs                 -->
      <!-- und https://quasarframework.github.io/app-extension-qpdfviewer/examples               -->
      <!-- Die Extension muss im BIMclickFrontend (Quasar App Directory) installiert werden mit: -->
      <!-- quasar ext add @quasar/qpdfviewer                                                     -->
      <!-- Danach kann ohne Weiteres das neue <q-pdfviewer /> Tag benutzt werden (quasar dev):   -->
      <!--------------------------------------------------------------------------------------------------------->
      <!-- ACHTUNG:                                                                                            -->
      <!-- Mit type="html5" funktioniert zwar der QPdfViewer, bringt aber Error im Browser Log:                -->
      <!-- v-on handler: "TypeError: handler.apply is not a function" found in <QPdfviewer>                    -->
      <!-- Siehe Bug Report auf https://github.com/quasarframework/app-extension-qpdfviewer/issues/33          -->
      <!-- Mit type="pdfjs" geht dieser Fehler weg, allerdings muss dafür QPdfViewer neu                       -->
      <!-- installiert werden (siehe https://github.com/quasarframework/app-extension-qpdfviewer#example-code) -->
      <!-- und Syntax der PDF-URL musste geändert werden (pdfsrc)                                              -->
      <!-- Vorläufig disabled -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------------- -->
      <!-- NEU - Februar 2022. Test mit neu installiertem QPdfViewer für PDFs aus protected assets Folder - funktioniert aber nicht (404/Cannot GET) -->
      <!-- pdfSrc: "assets/LBO_BW.pdf" -->
      <!-- Ansonsten funktionierte es mit pdfSrc: "statics/pdfs/LBO_BW.pdf" und type="html5" -->
      <!-- Wieder deinstalliert und disabled mit quasar ext remove @quasar/qpdfviewer -->
      <!--
      <q-page class="flex flex-center">
        <q-pdfviewer
          v-model="pdfShow"
          type="html5"
          :src="updatedPdfSrc"
          content-class="absolute"
        />
      </q-page>
      -->
      <br />
      <br />
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------->
      <h5 id="13.2-Links" class="text-weight-medium">13.2 Links/Images/PDFs</h5>
      Tests, um URLs und PDFs im Browser zu öffnen und innerhalb der App oder
      Seite zu navigieren, sowie Tests, um Images anzuzeigen
      <!-- 1. Per QButton, funktioniert aber so nicht -->
      <!-- <q-btn @click="openURL('https://www.bimlive.de')">BIM.live Webseite</q-btn> -->
      <!-- 2. Per HTML <a href= >-Tag -->
      <!-- Funktioniert mit statischen URLS, siehe unten -->
      <!-- Für dynamische URLs: -->
      <!-- a) Per Moustache-Interpolation für die URL -->
      <!-- href="{{url}}" -->
      <!-- url ist dabei normale Variable in data oder aus props -->
      <!-- Das wurde aber aus Vue removed: "Use v-bind or the colon shorthand instead. For example, instead of <div id="{{ val }}">, use <div :id="val">. -->
      <!-- b) Mit v-bind für die URL -->
      <!-- Zu v-bind: https://stackoverflow.com/questions/40899532/how-to-pass-a-value-from-vue-data-to-href -->
      <!-- Zu externen URLs: https://stackoverflow.com/questions/44595929/vue2-navigate-to-external-url-with-location-href -->
      <!-- Zur V-bind Syntax: https://vuejs.org/v2/guide/syntax.html#v-bind-Shorthand: -->
      <!-- full syntax -->
      <!-- <a v-bind:href="url"> ... </a> -->
      <!-- shorthand -->
      <!-- <a :href="url"> ... </a> -->
      <!-- shorthand with dynamic argument (2.6.0+) -->
      <!-- <a :[key]="url"> ... </a> -->
      <!-- url ist dabei stets normale Vue-Variable in data oder aus props -->
      <!-- c) Quasar Buttons mit type="a", siehe https://quasar.dev/vue-components/button#More-options -->
      <!-- Die to-Links werden beim Test allerdings mit localhost prefixed!!! -->
      <h6 id="13.2.1-Quasar-basiert" class="text-weight-medium">
        13.2.1 Quasar-basiert
      </h6>
      Per Quasar QButton mit type="to", um zu internen Zielen in der BIM.click
      App zu navigieren:
      <br />
      <q-btn
        to="/Bauinformationen"
        label="To - interner Link mit Route- und Seiten-Wechsel von Dokumentation zu Bauinformationen"
        glossy
        color="green"
        no-caps
      />
      <br />
      <br />
      Per Quasar QButton mit type="to" innerhalb der BIM.click Dokumentation,
      funktioniert bestens per smooth Scrolling, kann allerdings nicht von
      innerhalb des Markdowns aufgerufen werden, da dort keine Quasar und Vue
      Komponenten eingebettet werden können:
      <br />
      <q-btn
        to="13-Glossar"
        label="To - scrolle auf selber Dokumentations-Seite/-Route zu Dokumentationsabschnitt 13 Glossar"
        glossy
        color="purple"
        no-caps
      />
      <br />
      <br />
      Mit Quasar QButton und @click-Methode scrollToElement - scrolled smooth,
      kein erkennbarer Unterschied bzgl. Scrolling zur vorherigen Variante mit
      type="to"!!!
      <br />
      <q-btn
        @click="scrollToElement('13-Glossar')"
        label="To - scrolle auf selber Dokumentations-Seite/-Route zu Dokumentationsabschnitt 13 Glossar"
        glossy
        color="orange"
        no-caps
      />
      <br />
      <br />
      Per Quasar QButtons mit type="a" zu externen Links (target="_blank" öffnet
      dabei die Seiten in neuem Browser Tab):
      <br />
      <q-btn
        type="a"
        href="http://gaa.baden-wuerttemberg.de/servlet/is/16493/1_2_1.pdf"
        target="_blank"
        label="Type 'a' - externer Link zur LBO (PDF) in neuem Browser Tab"
        glossy
        color="blue"
        no-caps
      />
      <br />
      <br />
      <q-btn
        :href="bimLiveUrl"
        type="a"
        target="_blank"
        label="Type 'a' - externer Link (v-bind) zu BIMlive.de in neuem Browser Tab"
        glossy
        color="red"
        no-caps
      />
      <br />
      <br />
      <q-separator />
      <!-- ============================================================================================================================ -->
      <!-- Alternativer Test für #391 mit Frontend-URL auf assets-Folder in QImg von Quasar:                                            -->
      <!-- <q-img label="Estrich" src="http://localhost:4200/assets/estrich.jpg"/> -->
      <!-- Wirft 401 (Unauthorized)!!!                 -->
      <!-- SUCCESS, aber einstweilen disabled:                                                                                          -->
      <!-- <q-img label="Estrich" src="~/assets/estrich.jpg"/> -->
      <!-- Mit ~ im Pfad für den assets-Folder funktioniert der Zugriff!!! -->
      <!-- HINWEIS: <q-img label="Estrich" src="~assets/estrich.jpg"/> OHNE "/" vor "~" funktioniert auch!                              -->
      <!-- Siehe https://github.com/quasarframework/quasar/discussions/12548                                                            -->
      <!-- ---------------------------------------------------------------------------------------------------------------------------- -->
      Test von Quasar <b>QImg</b> mit remote URL:
      <q-img src="https://dummyimage.com/100.png" width="5%" />
      <!-- Works and displays inline the remote image -->
      Test von Quasar <b>QImg</b> mit Image aus protected asset Folder:
      <q-img src="~assets/100.png" width="5%" />
      <!-- Works and displays the same image inline now placed in assets folder -->
      <!-- <q-img :src="'~assets/100.png'"/> -->
      <!--404 error in browser log! -->
      <br />
      <br />
      <q-separator />
      <!-- #391: -->
      <b>Neu:</b> Erfolgreicher Test eines <b>QBtn</b> mit <b>href</b> auf ein
      per computed-Funktion mittels in quasar.conf.js zusätzlich installiertem
      Webpack Loader geladenes PDFs aus dem protected asset Folder, das in
      separatem Browser Tab angezeigt wird:
      <q-btn
        style="height:100%"
        size="md"
        icon="menu_book"
        label="PDF anzeigen aus protected asset-Verzeichnis"
        type="a"
        target="blank"
        :href="computeMyPDF"
        color="orange"
        glossy
        no-caps
      />
      <br />
      <br />
      <q-separator />
      <h6 id="13.2.2-HTML-basiert" class="text-weight-medium">
        13.2.2 HTML-basiert
      </h6>
      Per einfachem HTML a-Tag mit href und statischer externer URL:
      <br />
      Besuchen Sie die neue Webpräsenz der BIM.live UG:
      <a href="https://bimlive.de" title="https://BIMlive.de" target="_blank"
        >BIMlive.de</a
      >
      <br />
      <br />
      Per einfachem HTML a-Tag mit href und v-bind mit dynamischer externer URL
      aus Variable in Vue data:
      <br />
      Besuchen Sie die neue Webpräsenz der BIM.live UG:
      <a :href="bimLiveUrl" title="https://BIMlive.de" target="_blank"
        >BIMlive.de</a
      >
      <br />
      <br />
      Per einfachem HTML a-Tag mit href="elementID" auf elementId eines
      DOM-Elements (z.B. per div id="elementId") in der Dokumentations-Seite von
      BIM.click:
      <ul>
        <li>
          Funktioniert auch auf Elemente innnerhalb des HTML, das mittels
          Markdown erzeugt wurde
        </li>
        <li>
          Allerdings lädt diese Variante die ganze App inklusive Dokumentation
          NEU vor dem Scrolling, scrolled dann aber exakt zu der gewünschten
          Destination, und zwar
          <b>ohne den Offset, der bei QMarkdown Anchor Links auftritt</b>
        </li>
        <li>
          Diese Variante kann auch innerhalb des Markdowns in dokumentation.md
          verwendet werden, da pure HTML!
        </li>
        <li>
          <b>Hinweis:</b> Mit eingeschalteter Benutzerauthorisierung
          funktioniert sie temporär nicht mehr - sie führte dann zur
          Login-Seite! Dieses Problem tritt aktuell nicht mehr auf.
        </li>
      </ul>
      Springe zu DOM-Element auf der aktuellen Dokumentations-Seite - man
      beachte dabei die URL im Browser:
      <a
        href="/Dokumentation/2-Baueigenschaften"
        title="/Dokumentation/2-Baueigenschaften"
        >Dokumentationsabschnitt 2, Baueigenschaften</a
      >
      <!-- Laut https://stackoverflow.com/questions/24739126/scroll-to-a-specific-element-using-html kann man das HTML Scroll Behavior smooth machen mit -->
      <!-- /*CSS*/ html { scroll-behavior: smooth; } -->
      <!-- Hilft aber nicht -->
      <br />
      <br />
      <q-separator />
      <q-separator />
      <h6 id="13.2.3-Vue-basiert" class="text-weight-medium">
        13.2.3 Vue-basiert
      </h6>
      <b>Neu</b> - für #391: Test der <b>VueAuthImage</b> Vue Directive,
      <a
        href="https://github.com/xzag/vue-auth-image"
        title="https://github.com/xzag/vue-auth-image"
        target="_blank"
        >VueAuthImage</a
      >, für eingebettete HTML Images (kann wegen der Vue Directive nicht direkt
      im Markdown-Content verwendet werden (nur per VMD)!)
      <br />
      <br />
      Aktuell disabled
      <br />
      <br />
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <!-- NEU: #391, Test von VueAuthImage                                                                          -->
      <!-- bim-click-front-end> npm install vue-auth-image --save                                                    -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <!-- <img v-auth-image="'https://bimclickserver.herokuapp.com/img/estrich.jpg'"> -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <!-- <img v-auth-image="'https://dummyimage.com/100'"> -->
      <!-- Alternatives Test Image -->
      <!-- ACHTUNG: Erfordert boot File vue-auth-image.js in src/boot und Auflistung der Boot File in boot-Array in  -->
      <!-- quasar.conf.js                                                                                            -->
      <!-- ACHTUNG: Doppelte Quotes sind oben notwendig, warum auch immer, sonst compiled es nicht mit "http(s)://"  -->
      <!--          als Präfix, und wirft Laufzeitfehler!                                                            -->
      <!-- ACHTUNG: Kein /> am Ende erforderlich!                                                                    -->
      <!-- ACHTUNG: Beim ersten Aufruf wirft es noch einen CORS Fehler!                                              -->
      <!-- ACHTUNG: Build mit boot File funktioniert nur mit quasar dev, nicht im Production Build auf Heroku!       -->
      <!-- Module not found: Error: Can't resolve 'vue-auth-image' in '/tmp/build_fd03e8d8/src/boot'                 -->
      <!-- Konnte gelöst werden durch wiederholung der Installation - dann werden package.json und package.lock.json -->
      <!-- korrekt aktualisiert und beim Build auf Heroku berücksichtigt.                                            -->
      <!-- Aktuell ist VueAuthImage wieder disabled - da es sowieso mixed Vue/Markdown Content benötigt, ist es      -->
      <!-- Quasar QImg (mit "~"-Support für Zugriff auf assets Folder) unterlegen!                                   -->
      <!-- Disabled sind:                                                                                            -->
      <!-- a) Obige Verwendung                                                                                       -->
      <!-- b) Auflistung von vue-auth-image im boot-Array in quasar.conf.js                                          -->
      <!-- --------------------------------------------------------------------------------------------------------- -->
      <!-- HINWEISE:                                                                                                 -->
      <!-- Source Code auf https://github.com/xzag/vue-auth-image/blob/master/vue-auth-image.js:                     -->
      <!-- Q&A auf https://github.com/quasarframework/quasar/discussions/12536                                       -->
      <!-- Macht under the Covers einen Axios get-Request mit Authorization Header - in diesem ist per mounted() von -->
      <!-- dokumentation.vue der bearer Token                                                                        -->
      <!-- Da dieser so mitgeliefert wird, gelingt der Access in den ansonsten protecteten download-Folder am Backend-->
      <!-- (Positiv verifziert, wenn app.use für download-Folder in Step 5 in back-end-server.js aktiv ist!)         -->
      <b>Vue Router Link,</b> um innerhalb der Dokumentation zu navigieren -
      dies scrolled smooth zu der betreffenden Stelle in der Dokumentation:
      <br />
      Scrolle zu DOM-Element auf der aktuellen Seite - man beachte dabei die URL
      im Browser:
      <!-- Vue Router Link, siehe https://router.vuejs.org/guide/ und https://router.vuejs.org/api/#router-link -->
      <router-link to="/Dokumentation/2-Baueigenschaften">
        Dokumentationsabschnitt 2, Baueigenschaften
      </router-link>
      <br />
      <br />
      <q-separator />
      <q-separator />
      <!------------------------------------------------------------------------------------------------------------------------------->
      <h5 id="13.3-HTML-Gestaltungsmittel" class="text-weight-medium">
        13.3 HTML Gestaltungsmittel
      </h5>
      HTML Table Test (alternativ können QMarkupTables auch mit statischem
      Content verwendet werden - siehe
      <!-- Vue Router Link, siehe https://router.vuejs.org/guide/ und https://router.vuejs.org/api/#router-link -->
      <router-link to="/Dokumentation/Online-Dokumentation">
        Dokumentationsabschnitt 1, BIM.click Online-Dokumentation
      </router-link>
      <table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-right">Price</th>
            <th class="text-right">In Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Item #1</td>
            <td class="text-right">$10.11</td>
            <td class="text-right">101</td>
          </tr>
          <tr>
            <td class="text-left">Item #2</td>
            <td class="text-right">$8.88</td>
            <td class="text-right">34</td>
          </tr>
          <tr>
            <td class="text-left">Item #3</td>
            <td class="text-right">$0.15</td>
            <td class="text-right">1670</td>
          </tr>
        </tbody>
      </table>
      <q-separator />
      <h5 id="13.4-Sonderzeichentabellen" class="text-weight-medium">
        13.4 Sonderzeichentabellen
      </h5>
      <q-btn
        type="a"
        href="https://www.vioma.de/de/wiki/tools/html-sonderzeichen/"
        target="_blank"
        label="Tabellen mit HTML Sonderzeichen öffnen"
        glossy
        color="blue"
        no-caps
      />
      <br />
      <br />
      <strong>
        <q-separator />
      </strong>
      <h4 id="14-Interne-Dokumentation" class="text-weight-medium">
        14. Interne Dokumentation
      </h4>
      <h5 id="14.1-Projekt-Backlog" class="text-weight-medium">
        14.1 Projekt-Backlog für BIM.click
      </h5>
      <q-markdown no-breaks ref="backlog" :src="markdownBacklog"> </q-markdown>
      <!-- NEU: Sprungziel für Ende des Backlogs, aus Doku-Inhaltsverzeichnis -->
      <h6 id="14.1.1-Projekt-Backlog-Ende" class="text-weight-medium">
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■ [Aktuelles Ende des fortlaufend nummerierten
        Backlogs] ■■■■■■■■■■■■■■■■■■■■■■■■■■■
      </h6>
      <q-separator />
      <h5 id="14.2-Design-Internals" class="text-weight-medium">
        14.2 Internes Design für BIM.click
      </h5>
      <q-markdown no-breaks ref="design" :src="markdownDesign"> </q-markdown>
      <!-- QMarkdown API/Props: Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs#QMarkdown-API -->
      <br />
      <q-separator />
      <!-- </q-scroll-area> -->
    </div>
    <!-- für Begrenzung width -->
    <!------------------------------------------------------------------------------------------------------------------------------->
  </q-page>
</template>

<!-- ***---------------------------------------------------------------------------------------------------------------------------------- -->
<script>
// NEU: TEST - für Anchor Links (mit "#") von https://forum.vuejs.org/t/how-to-handle-anchors-bookmarks-with-vue-router/14563/5 - disabled
// const TIMEOUT = 1;
//---------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für ersten Test für Vue Directive VueAuthImage, für #391
// Hätte vermutlich funktioniert bei korrektem Aufruf, wurde aber ersetzt durch Boot File vue-auth-image.js
// nach Hinweisen auf https://github.com/quasarframework/quasar/discussions/12536
// bim-click-front-end> npm install vue-auth-image --save
/*
// import axios from "axios"; // Ist vermutlich unnötig, da per Quasar mit Boot File aktiviert
import Vue from "vue";
import VueAuthImage from "vue-auth-image";
Vue.use(VueAuthImage);
*/
// Template Code zum Aufruf:
/*
 <img v-auth-image="'https://bimclickserver.herokuapp.com/img/estrich.jpg'">
 */
//-------------------------------------------------------------------------------------------------------------------------------
// NEU - #401: Für q-option-group-basierende Anzeige der neuen fachlichen Kategorien/Rubriken von Baueigenschaften:
import OptionsFachlicheKategorienBaueigenschaften from "../modules/options-fachliche-kategorien-baueigenschaften";
//-------------------------------------------------------------------------------------------------------------------------------
import MyPDF from "../assets/LBO_BW.pdf"; // Für #391, q-btn mit href auf PDF im protected assets Folder
import BetaPDF from "../assets/bim-click-beta-quickstart-leitfaden.pdf"; // Für #391, selbe Lösung nun auf Beta-PDF angewendet, q-btn mit href auf PDF im protected assets Folder
//----------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Test von Vue+Markdown in QMarkdown (.vmd)
import VmdTest from "../markdown/vmd-test.vmd"; // Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs#importing-vue%2Bmarkdown-(.vmd)
// NEU: Für QMarkdown:
import markdownDokumentation from "../markdown/bim-click-dokumentation.md"; // Markdown File mit BIM.click Dokumentation
import markdownBacklog from "../markdown/bim-click-backlog.md"; // Markdown File mit BIM.click Projekt-Backlog
import markdownDesign from "../markdown/bim-click-design-internals.md"; // Markdown File mit BIM.click internem Design
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden,
// siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
// Für Scroll-Implementierung:
import { scroll } from "quasar"; // Rechte Maustaste auf scroll > "Peek Definition" zeigt Methoden an
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const { getScrollTarget, setScrollPosition } = scroll;
const { getScrollTarget, setVerticalScrollPosition } = scroll; // VUE3
const setScrollPosition = setVerticalScrollPosition // VUE3
// Siehe https://v0-17.quasar-framework.org/components/scrolling-utils.html
// Siehe https://quasar.dev/vue-components/scroll-area - dort Beispiel "Scroll Position"
// und https://v0-17.quasar-framework.org/components/scroll-observable.html#Determining-Scrolling-Container
// Dies scrollte zunächst den linken Drawer und die Main Page gemeinsam. Lösung: "LPR" in <q-layout view=...>
// NEU - #391:
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  name: "Dokumentation", // Vue Component Name - ACHTUNG - dabei beachten:
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
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  props: { docTopicElementIdToScrollTo: String },
  // NEU: Id von DOM-Element, wird per props: true in router.js der Komponente Dokumentation per Vue Router-Befehl mitgegeben
  // Definiert als HTML id Attribut an HTML-Tags, z.B. h1/h2/h3, ...
  // Beispiel: <h3 id="3.5.1">3.5.1 Kapitelübeschrift</h3>
  // An diese Stelle in der Dokumentation wird dann gescrolled
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  components: {
    VmdTest // NEU: Für Test von Vue+Markdown - siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs#importing-vue%2Bmarkdown-(.vmd)
    // Der gemischte Vue+Markdown-Content darin kann dann innerhalb von Markdown im template-Teil eingebettet werden mit <VmdTest />
  },
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  data: function() {
    return {
      optionsFachlicheKategorienBaueigenschaften: OptionsFachlicheKategorienBaueigenschaften, // NEU - #401
      myPDF: MyPDF, // #391 - nur Test, könnte disabled werden
      betaPDF: BetaPDF, // #391 - für Beta PDF
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store
      markdownDokumentation: markdownDokumentation, // NEU: Für QMarkdown - hält den Markdown für die Dokumentation aus oben importiertem File
      // tableOfContentDokumentation: [], // Array für hierarchisches ToC für Markdown-Headings - wurde in mounted: Code für QMarkdown-Methode makeTree verwendet,
      // dieser Code stellte sich aber als überflüssig heraus, die Methode onToc läuft auch ohne Variablen in data:
      // dokumentationsVerzeichnis.js hat dieselbe Struktur (mit zusätzlichem optionalen Feld icon) wie das hierarchische ToC von QMarkdown und verwendet dieselben von
      // makeTree per "toc" Property generierten DOM Element ids
      markdownBacklog: markdownBacklog, // NEU: Für Anzeige BIM.click Projekt-Backlog
      markdownDesign: markdownDesign, // NEU: Für Anzeige BIM.click Design Internals
      rawHTML: String, // Test-HTML-String
      bimLiveUrl: String, // Test-URL
      // Für QPDFviewer:
      pdfShow: true,
      // pdfSrc: "assets/LBO_BW.pdf", // NEU: Für Tests mit neu installiertem QPDFViewer mit PDF aus protected assets Folder, mit type="html5" - funktioniert nicht - Cannot GET/404!
      // pdfSrc: "http://localhost:4200/statics/pdfs/LBO_BW.pdf", // Test-PDF-URL für QPdfViewer type="pdfjs
      // pdfSrc: "statics/pdfs/LBO_BW.pdf", // Test-PDF-URL für QPdfViewer type="html5"
      carouselSlide: "Grundkonstrukte", // v-model für q-carousel
      carouselSlideFachlicheKategorienBaueigenschaften: "FachlicheKategorienBaueigenschaften", // v-model für q-carousel
      loremshort:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
  },
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    scrollToBottom(elementId) {
      // Nur zu Testzwecken
      // Vorlage: https://forum.quasar-framework.org/topic/2008/how-to-scroll-to-an-element/7
      console.log("In scrollToBottom(elementId) - elementId: , elementId");
      // const element = this.$refs.elementId.$el
      const element = document.getElementById(elementId);
      // MUST call it in timer
      setTimeout(() => {
        window.scrollTo(0, element.offsetTop);
      }, 100);
    },

    onToc(toc) {
      // NEU: Für QMarkdown - Table of Content aus Headings im Markdown generieren und ids für die Headings setzen als Scroll Targets
      // Einstweilen diese in dokumentationsVerzeichnis.js gleichlautend wie die von QMarkdown erzeugten ids verwaltet, da Dokumentationsverzeichnis zusätzlich Icon Felder
      // enthält.
      console.log("In onToc");
      // Hierarchisches ToC, wirft Fehler im Log [Vue warn]: Error in v-on handler: "TypeError: Cannot read property 'makeTree' of undefined"!!!
      // Resultierendes toc ist leerer Array!!! Daher die hierarchische Variante disabled.
      /*
      console.log("this.$refs: ", this.$refs);
      this.toc = this.$refs.markdown.makeTree(toc); // Aufruf QMarkdown API Methode für <q-markdown ref="markdown">, siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs
      */
      // Nicht-hierarchisches ToC, wirft keine Fehler, und resultierender Array hat korrektes Format:
      // Da ein ToC aktuell nicht benötigt wird, nur die von QMarkdown erzeugten ids für die Headings (für dokumentationsVerzeichnis.js) verwendet, Properties
      // toc und @data="onToc" später ganz abgeklemmt oben am <q-markdown>
      this.toc = toc;
      console.log("In onToc, toc: ", this.toc);
    },

    emitDrawerEvent() {
      // Helper Function, wird von Button oben verwendet
      this.$root.$emit("openLeftDrawerEvent"); // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Use Bus)
      console.log("In Dokumentation: Emittierte Event openLeftDrawerEvent.");
    },

    scrollToElement(elementId) {
      // scrollToElement (Scroll-Funktion um an durch elementID definierte Position zu scrollen
      // TODO: Noch verbesserungsfähig bezüglich der genauen Position
      // Parameter elementId erwartet eine sogenannte DOM Element Id
      // Siehe https://forum.quasar-framework.org/topic/2008/how-to-scroll-to-an-element/5
      // Siehe https://v0-17.quasar-framework.org/components/scrolling-utils.html
      // Siehe https://stackoverflow.com/questions/37507934/access-to-component-by-dom-element
      // Siehe https://stackoverflow.com/questions/3623110/get-an-elements-id
      // Siehe auch https://blog.logrocket.com/how-to-use-refs-to-access-your-application-dom-in-vue-js/ - $refs hier aber nicht verwendet
      // Oder https://codingexplained.com/coding/front-end/vue-js/accessing-dom-refs
      // Auch https://stackoverflow.com/questions/36970062/vue-js-document-getelementbyid-shorthand - hier wird direkte DOM Manipulation discouraged
      // zugunsten von $refs und vm.$refs bei plain DOM Referenzen, wie hier bei uns an h1/h2/h3/...
      // ACHTUNG: DOM Element Id ist NICHT gleich dem von Vue und Quasar benutzten ref="xyz" Attribut, sondern ein eigenes id="xyz" HTML Attribut!
      // Muss unique im gesamten DOM sein, darf keine Blanks enthalten
      // Wird an HTML-Elemente gehängt (z.B. <h1/<h2/<h3 id="xyz" /> oder <a id="xyz"/>) um zu diesen scrollen zu können
      // Siehe https://www.w3schools.com/tags/att_global_id.asp

      console.log("In scrollToElement(elementId)");
      console.log("elementId: ", elementId);
      let element = document.getElementById(elementId); // Zugriff auf das DOM mit der elementId, DOM API von Vue
      console.log("document.getElementById(elementId): ", element); // Bug: Es kommt bei den durch QMarkdown implizit erzeugten Ids null zurück!!!
      //------------------------------------------------------------------------------------------------------------------------------
      // Lösungsversuche für DEFECT #259:
      // Workaround 1 - FAIL:
      // let element = this.$refs[elementId]; // https://stackoverflow.com/questions/47616393/vue-js-mounted-scroll-to-specific-div
      // console.log("this.$refs[elementId]: ", element); // Funktioniert nicht, erwartet ref, nicht elementId

      // Workaround 2 - FAIL:
      // let element = this.$refs.elementId.$el; // https://forum.quasar-framework.org/topic/2008/how-to-scroll-to-an-element/7
      // console.log("$refs.elementId.$el: ", element);
      //------------------------------------------------------------------------------------------------------------------------------
      // Weiteres Logging, aktuell disabled:
      /*
      console.log("In Dokumentation, scrollToElement - element: " + element); // Korrekt, zeigt z.B. [object HTMLHeadingElement]
      console.log(
        "In Dokumentation, scrollToElement - element.id: " + element.id
      ); // Korrekt, zeigt z.B. "2" wenn im Template z.B. <h4 id="2" ...> definiert wurde
      console.log(
        "In Dokumentation, scrollToElement - element.value: " + element.value
      ); // Empty, since div element
      console.log(
        "In Dokumentation, scrollToElement - elementId: " + elementId
      );
      console.log(
        "In Dokumentation, scrollToElement - element.baseURI: " +
          element.baseURI
      ); // Correct, http://localhost:4200/
      */
      //------------------------------------------------------------------------------------------------------------------------------
      // ALT - Variante:
      // Versuch mit $refs und extra <q-scroll-area ref="scrollArea" ..> oben, wieder auskommentiert:
      // let target = this.$refs.scrollArea.getScrollTarget(element); // Unnötig?
      // this.$refs.scrollArea.setScrollPosition(offset, duration) // Funktioniert (vorher offset und duration setzen mit Code unten)
      //------------------------------------------------------------------------------------------------------------------------------
      // Vorbereitung für das Scrolling:
      let target = getScrollTarget(element);
      console.log("In scrollToElement() - target: ", target); // Zeigt [object Window]
      let offset = element.offsetTop; // Do not subtract the element.scrollHeight here
      console.log("In scrollToElement() - offset: ", offset); // Zeigt korrekten Wert, z.B. 481
      let duration = 300; // Millisekunden Scroll-Zeit
      // let scrollHeight = element.scrollHeight;
      // console.log("In scrollToElement() - scrollHeight: " + scrollHeight); // Ist stets 0, warum auch immer
      // ALT:
      // Versuch mit $refs und extra <q-scroll-area ref="scrollArea" ..> oben, wieder auskommentiert:
      // this.$refs.scrollArea.setScrollPosition(offset, duration); // FEHLER: Scrolled nicht dorthin, Seite bleibt leer!
      // ALT:
      // this.scrollToBottom(elementId); // Alternative, nur zu Testzwecken, benutzt Helper-Funktion in methods
      // ALT:
      // element.scrollIntoView(false); // Funktioniert auch nicht
      //--------------------------------------------------------------------------------------------------------------------------------
      // Es folgt das eigentliche Scrolling:
      // NEU - für Defect #259 Fix, Teil b): Korrektur des Scroll-Offsets, aber nur für die Sprungziele innerhalb des Markdowns in bim-click-dokumentation.md
      // D.h. per aktuellem Content in bim-click-dokumentation.md nicht für Sprungziele für Überschriften, die mit "1-", "1." oder jenseits von "13." beginnen!
      let elementIdString = String(elementId);
      console.log("elementIdString: ", elementIdString);
      if (
        elementIdString.startsWith("1-") ||
        elementIdString.startsWith("1.") ||
        elementIdString.startsWith("13") ||
        elementIdString.startsWith("14") // Nicht vergessen! Sonst kein korrektes Scrolling zum Backlog und internen Design!
      ) {
        // Sprungziel außerhalb des Markdowns
        setScrollPosition(target, offset, duration); // Scrolled zu der Stelle im DOM mit der elementId, keine Korrektur
      } else {
        // Sprungziel im Markdown, Scroll Offset ist warum auch immer zu korrigieren um die Höhe des Windows:
        // Vorlage: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
        let height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        console.log("height: ", height);
        height = Math.round(height * 1.5); // Korrektur gegen falsches Scrollen
        // ACHTUNG: 1.5 ist ein gewählter Mittelwert, am Anfang der Doku müsste der Wert etwas größer sein, am Ende etwas kleiner
        // console.log("1.5 * height: ", height);
        setScrollPosition(target, offset + height, duration); // Scrolled zu der Stelle im DOM mit der elementId, Korrektur um window.innerHeight
        // ACHTUNG: Dies ist nur eine Approximation, Scrolling ist abhängig von vielen Faktoren, wie Bildschirmgröße, Zoomfaktor, etc.
      }
    }

    // NEU: TEST - für Anchor Links (mit "#") von https://forum.vuejs.org/t/how-to-handle-anchors-bookmarks-with-vue-router/14563/5 - disabled
    /*
    scrollTo: function (hashtag) {
      setTimeout(() => { location.href = hashtag }, TIMEOUT)
    }
    */
  }, // /methods:

  mounted: function() {
    //----------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Versucht für Erweiterung der Lösung für #391, mit JWT Header per Cookie
    // JWT Header in Cookie platzieren, um diesen per Cookie ans Backend zu schicken, für Link-Anforderungen für protected Files vom Backend
    // aus Links mit solchen Files im Markdown für die Doku (bim-click-dokumentation.md, z.B. dort:
    // ![Screenshot-Raum-Profil-Formular](https://bimclickserver.herokuapp.com/img/dokumentation-screenshot-raum-baueigenschafts-profil-formular.png "Fachliches Baueigenschaftsprofilformular für Baueigenschaftsprofil 'Raum'")
    // Oder der obige Link im q-btn mit href auf den BIM.click Beta Quickstart Guide
    // Vorlage: https://stackoverflow.com/questions/46642960/authorization-header-in-img-src-link
    // ACHTUNG: Cookies für die Get Requests für obige Files kommen NICHT am Server an, wie das Server Log zeigt! Diese sind undefined!
    // (Eventuell Zusammenhang mit useCredentials (aktuell disabled) in quasar.conf??? Wenn man es auf true stellt, bewirkt das aber auch keine Besserung!)
    // (Auch in axios.js gibt es ein wihtCredentials (aktuell disabled), aber das scheint nur für Axios Calls zu gelten, es einzuschalten brachte nichts!)
    // Diese Cookie-Lösung funktioniert so insgesamt NICHT, warum auch immer!!! Die erste Antwort in obigem SO Post sagt auch, dass es NICHT geht, Authentication für
    // Images zu haben. Es wird aber weiter oben in dem SO Post auf NPM Package zur Lösung verwiesen: https://www.npmjs.com/package/vue-auth-image
    // Daher die nicht funktionierende Cookie-Lösung hier wieder disabled:
    //----------------------------------------------------------------------------------------------------------------------------------------
    //
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;
    // Code für Cookie - disabled:
    // document.cookie = `token=${myJWTToken};` // Per https://en.wikipedia.org/wiki/HTTP_cookie setzt document.cookie in JS das Cookie im Request Header! Siehe auch https://javascript.info/cookie
    // console.log("document.cookie: ", document.cookie) // Disabled - Security!
    //----------------------------------------------------------------------------------------------------------------------------------------
    // Stattdessen Versuch mit NPM Package https://www.npmjs.com/package/vue-auth-image
    // bim-click-front-end > npm install vue-auth-image --save

    //----------------------------------------------------------------------------------------------------------------------------------------
    // Folgender Code zur Initialisierung des QMarkdown ToCs wird NIE benötigt, egal ob mit normalem oder hierarchischem ToC!!!
    /*
    console.log("In mounted: of Dokumentation - vor Aufruf onToc");
    this.onToc(this.tableOfContentDokumentation); // QMarkdown ToC populieren und ids generieren für Headings im Markdown
    console.log(
      "In mounted: of Dokumentation - tableOfContentDokumentation: ",
      this.tableOfContentDokumentation
    );
    */

    this.rawHTML = "BIM.telligence"; // HTML Variable setzen für {{ rawHTML }} Test in Template
    this.bimLiveUrl = "https://bimlive.de"; // URL für Test von Link per  <a href={{url}} >

    // Die ursprüngliche Implementierung benutzte ein Listen to scrollToDocTopic Event, mit dem die Dokumentations-Komponente ein Event
    // empfing, mit dem eine id für das docTopic als Parameter mitkam (im Drawer per $emit gesetzt)
    // Allerdings funktionierte das nur einmal, da der vom Drawer emittierte Event nur einmal in mounted() konsumiert wurde
    // Wenn dann im Drawer-Dokumentationsverzeichnis dann bei offener Dokumentation ein weiteres Topic ausgewählt wird, funktioniert es nicht,
    // da dann nicht mehr dieses Event listened wurde.
    // Code dafür:
    /*
    console.log("In Dokumentation. Setting up listening to event scrollToDocTopic.");
    this.$root.$on("scrollToDocTopic", docTopic => {
      // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Bus)
      // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
      console.log("In Dokumentation. Received event scrollToDocTopic.");
      this.docTopicIdToScrollTo = docTopic; // Variable in Data
      this.scrollToElement(this.docTopicIdToScrollTo);
    */
    // Umgehung: Diese könnte eventuell umgangen werden, indem Dokumentation nicht "alive" gehalten wird, sondern immer neu geladen wird. Das funktioniert aber
    // nicht, da der Router merkt, dass Dokumentation schon geladen ist und sie nicht neu lädt. Ist ein unbedingter Refresh möglich?
    // Nach https://stackoverflow.com/questions/41305573/vue-router-reload-component geht das mit dem :key, funktioniert aber auch nicht ohne Weiteres!!!
    // Siehe auch https://itnext.io/yes-this-is-how-to-cache-pages-by-url-with-vue-vue-router-and-keep-alive-component-697ed76896e8

    // Lösung: Das richtige Pattern dafür ist aber ein Watch auf entsprechenden neuen Props von Dokumentation, die dann die Scroll Targets reflektieren müssten
    // Aber Dokumentation ist aktuell auch nicht Kindkompente von Drawer, also muss ein Weg gefunden werden, wie einer Geschwisterkomponente Props mitgegeben werden können.
    // Per https://router.vuejs.org/guide/essentials/passing-props.html#boolean-mode geschieht das über Vue Router-Befehl mit Boolean mode in MyLayout.vue

    // Aber ACHTUNG: Der Watch unten wurde (mit :key Prop in der router-view, siehe unten) NICHT aufgerufen laut Logs!
    // Dafür wurde dann mounted aufgerufen (z.B. bei jedem Reroute auf Dokumentation per Klick auf Dokumentationsverzeichniseintrag, dito bei Klick
    // auf Tab "Dokumentation" im Hauptmenü oben)
    // https://stackoverflow.com/questions/44584078/vuejs-2-0-cant-hook-a-component-on-props-update beschreibt ein ähnliches Problem.
    // Es hängt wahrscheinlich damit zusammen, dass die Property in diesem Fall per Router übergeben bzw. geändert wird.
    // Dieses Problem zunächst belassen, da aktuell das Scrolling per Mounted: von Dokumentation erfolgt, da sowieso (wegen des anderen
    // Problems, dass "keep alive" für Dokumentation nicht funktioniert, siehe MyLayout.vue) die Dokumentations-Komponente immer wieder neu aufgerufen und
    // somit nicht gecached wurde von Vue.

    // Es stellte sich dann heraus, dass die :key Prop in der router-view entscheidend ist:
    // Mit :key Prop wird Dokumentations-Komponente bei Klick auf Dokumentations-Tab im Hauptmenü stets neu gerendered und dabei mounted: mit ID "1" aufgerufen
    // Ohne :key Prop wird bei Klick auf Dokumentations-Tab in der Menüleiste oben stets ein Route Change auf /Dokumentation/1 ausgelöst und
    //  - falls dieser Klick aus einem anderen Tab erfolgt, gar kein Scrolling per Watch ausgelöst (Scroll bleibt ganz oben, das heißt, es kann
    //    kein Mounted: gelaufen sein, d.h. die Komponente kann in diesem Fall auch nicht rerendered worden sein, insofern funktioniert wohl
    //    das "keep alive", aber das fehlende Scrollling ist noch nicht optimal
    //  - falls der Klick auf das Dokumentations-Tab unmittelbar nach Scrollen in der Dokumentation per Klicks im Dokumentationsverzeichnis im Drawer erfolgt, per Watch auf
    //    docTopicElementIdToScrollTo ein Scrolling der Dokumentation nach ID "1" durchgeführt, auch das ist nicht optimal
    // Unter obiger URL wird empfohlen, per weiterem Watch auf $route Changes zu reagieren, siehe unten. Schon mal ausprobiert, aber erst
    // in Verbindung mit @click Event, die die selectedDocTopicId abspeichern, den Durchbruch damit erzielt!

    // Ziel ist es, dass die Dokumentation bei Anwahl über das Dokumentations-Tab sich die ggf. zuvor
    // im Dokumentationsverzeichnis ausgewählte Id merkt und stets dorthin scrolled, auch bei den Anwahlen über das Tab "Dokumentation" im Menü oben.
    // Seit Ersetzung der @input-Methode an den q-expansion-items
    // durch :to Router Links wird die aktuelle Id aber nicht mehr in selectedDocTopicId abgespeichert, was wohl der Grund ist,
    // dass dann einfach "1" als relative Route und Scroll Target genommen wird.

    // Lösung: https://forum.quasar-framework.org/topic/4536/how-to-store-data-in-nested-v-for-loops-for-q-expansion-items
    // @click Event auf den q-expansion-items in MyLayout.vue:
    // Dieser speichert die ausgewählte id in selectedDocTopicId ab.
    // Damit funktionierte dann der neue Watch auf den Route Changes in Dokumentation.vue. Es musste dort lediglich noch abgeprüft werden,
    // ob die neue (named) Route überhaupt "Dokumentation" ist, da der Watch auf JEDE Route Change (auch zu anderen Vue-Komponenten) reagiert.

    // Allererster Test Code, um zu DOM Ids zu scrollen, per Methode scrollToElement(id) oben:
    //   const el = "3.1"; // Test
    //   this.scrollToElement(el); // Test

    // TEST - für Anchor Links (mit "#") von https://forum.vuejs.org/t/how-to-handle-anchors-bookmarks-with-vue-router/14563/5
    // Wird aber nie aufgerufen, daher disabled!!!
    /*
    // From testing, without a brief timeout, it won't work.
    if (this.$route.hash) {
         console.log("Im mounted: of Dokumentation. Anchor link with '#' detected - preparing scrolling to anchor link");
         const anchorWithoutHash = this.$route.hash.split("#")[1]; // UrL string after "#"
         console.log("anchorWithoutHash: ", anchorWithoutHash);
         setTimeout(() => this.scrollTo(this.anchorWithoutHash), TIMEOUT)
    } else { // Bisheriger Code: Scrolle zu DOM id (Prop von named Route Dokumentation)
      console.log(
        "In mounted: von Dokumentation. Scrolle nach docTopicElementIdToScrollTo: " +
          this.docTopicElementIdToScrollTo
    );
    */
    console.log(
      "In mounted: von Dokumentation. Scrolle nach docTopicElementIdToScrollTo: " +
        this.docTopicElementIdToScrollTo
    );
    this.scrollToElement(this.docTopicElementIdToScrollTo); // Aus den Props zzzzz

    // Drawer Event emittieren, um linken Drawer zu öffnen:
    // ACHTUNG: Unbedingt $root notwendig, da Cross-Component Event (Bus)
    // Siehe https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
    // ACHTUNG: Alternative, bei Klick auf q-route-tab oben den linken Drawer per @click="$refs.leftDrawer.open()" in MyLayout.vue
    //          zu öffnen, funktioniert NICHT!!!

    console.log(
      "In mounted: von Dokumentation: Emittiere Event openLeftDrawerEvent, um linken Auszug zu öffnen"
    );
    this.$root.$emit("openLeftDrawerEvent");
  }, // /mounted:

  watch: {
    // Ursprünglicher Watch auf Props-Änderung von docTopicElmentIdToScrollTo
    // Stillgelegt, nachdem Watch auf Route (siehe unten) besser funktionierte:
    /*
    docTopicElementIdToScrollTo: function(val) {
      // Watch auf Props-Änderung von docTopicElmentIdToScrollTo
      // val ist der neue Wert
      // ACHTUNG: Dieser Watch wurde ursprünglich gar NICHT aufgerufen laut Logs, solange :key Prop in router-view gesetzt war!
      // Dafür wurde dann mounted oft aufgerufen (bei jedem Reroute auf Dokumentation?)
      console.log(
        "In watch: für docTopicElementIdToScrollTo of Dokumentation. Öffne sicherheitshalber linken Drawer. Scrolling to docTopicElementIdToScrollTo: " + val
      );
      this.$root.$emit("openLeftDrawerEvent"); // NEU, da es im Test bestimmte Situationen gab, wo der Drawer nicht geöffnet war, obwohl die Dokumentation angewählt war
      this.scrollToElement(val); // Aus den Props
    }
    */
    // Besserer Watch auf Route Changes, arbeitet in Verbindung mit @click Events auf den q-expansion-items in MyLayout.vue, die
    // die id abspeichern des ausgewählten Dokumentationsthemas in docTopicElementIdToScrollTo

    $route(to, from) {
      // React to route changes...
      // to und from sind route objects, https://router.vuejs.org/api/#route-object-properties
      // to ist die neue Route
      console.log(
        "In watch: of Dokumentation. Route change detected. to.name: " + to.name
      );
      if (to.name === "Dokumentation") {
        // Nur wenn name Route "Dokumentation" die neue Route ist: Scrollen nach docTopicElementIdToScrollTo
        // Dort ist die zuletzt ausgewählte id abgespeichert durch die neuen @click Events an den q-expansion-items
        console.log(
          "In watch: of Dokumentation. Öffne sicherheitshalber linken Drawer. Scrolling to docTopicElementIdToScrollTo: " +
            this.docTopicElementIdToScrollTo
        );
        this.$root.$emit("openLeftDrawerEvent"); // NEU, da es im Test bestimmte Situationen gab, wo der Drawer nicht geöffnet war, obwohl die Dokumentation angewählt war
        // Scrolle nach DOM id (Prop von named Route Dokumentation)
        this.scrollToElement(this.docTopicElementIdToScrollTo); // Aus den Props
      }
    }
  }, // /watch:

  computed: {
    computeMyPDF() {
      // Teil der Lösung für #391 für Test-PDF - q-btn mit href auf PDF im protected assets Folder, welches durch Webpack Loader und computed-Funktion geladen wird
      // Vorlage: https://stackoverflow.com/questions/36643649/serving-static-pdf-with-react-webpack-file-loader
      // Erfordert:
      // a) Webpack PDF Loader - muss in quasar.conf.js in extendedWebpackConf eingetragen werden - siehe dort
      // b) Oben: import MyPDF from ("../assets/LBO_BW.pdf") // Test-PDF in protectd assets Folder
      // c) In data(): myPDF: MyPDF,
      // c) In computed: computeMyPDF, welches this.myPDF returned
      // d) Im Template: <q-btn type="_a" :href="computeMyPDF">
      return this.myPDF;
    },

    computeBetaPDF() {
      // #391, selbe Lösung wie oben für Beta-PDF
      return this.betaPDF;
    },

    // Für Qpdfviewer:
    updatedPdfSrc() {
      if (process.env.MODE === "electron") {
        return "/" + this.pdfSrc;
      }
      return this.pdfSrc;
    }
  }
};
</script>

<style>
/* Folgende CSS ist für q-cards an q-carousel: */
.my-card {
  min-width: 30%;
}
.my-card2 {
  min-width: 15%;
}
/* Folgende CSS ist für Smooth-Machen des HTML Scrollens */
html {
  scroll-behavior: smooth;
}
</style>
