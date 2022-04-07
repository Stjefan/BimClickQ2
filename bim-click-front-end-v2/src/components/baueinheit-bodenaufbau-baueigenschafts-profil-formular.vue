<!-- ------------------------------------------------------------------------------------------------------------------ -->
<!-- ACHTUNG: -->
<!-- Der Code, der in anderen Profilformularen speziell die Datumsfelder behandelt, FEHLT hier! -->
<!-- Bisher kommen in diesem Profilformular auch keine Datumsfelder vor, dies erfordern. -->
<!-- Wenn solche gebraucht werden, muss in mounted(), reset() und in watch() (= Refresh) der Code eingefügt werden aus den -->
<!-- anderen Profilformulare, welcher die Felder datumsWert1/2 konvertiert von Date in das von QDate erforderliche -->
<!-- String-Format "DD.MM.YYYY". Zusätzlich muss in der Submit-Methode eine Rückkonvertierung eingefügt werden. -->
<!-- ------------------------------------------------------------------------------------------------------------------ -->
<template>
  <div v-if="mountedDone">
    <!-- ====================================================================================================================== -->
    <!-- Debug-Code: -->
    <!-- ACHTUNG: Die verwendete @click-Funktion existiert nicht mehr! -->
    <div v-if="false">
      <q-btn
        label="dev"
        @click="
          sollIstWerteVergleich(
            layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[0],
            'Bodenaufbau > Geometrie > Rohboden > Dicke', // NEU: #281/#302
            'Raum > Geometrie > Bodenaufbau > Rohboden > Dicke' // NEU: #281/#302
            // 'Bodenaufbau > Geometrie > Rohdecke > Höhe > Istwert', // ALT
            // 'Geschoss > Geometrie > Bodenaufbau > Rohdecke > Höhe > Sollwert' // ALT
          )
        "
      />
    </div>
    <!-- /Debug-Code -->
    <!-- ====================================================================================================================== -->
    <div
      v-for="tab in layoutBaueigenschaftsProfilFormular"
      :key="tab.ueberschriftTab"
      class="q-pa-none"
    >
      <!-- ACHtUNG: Das folgende QToolbar macht sich auch mit style="height: 50px" nicht schmäler, nur größer, z.B. mit 100px!!! -->
      <!-- Daher disabled, durch normales div ersetzt: -->
      <!--
      <q-toolbar class="bg-brown-4 q-pl-sm">
        <q-toolbar-title
          class="text-subtitle1 text-white text-bold"
          shrink
        >
          {{ currentlySelectedNode.baueinheitsBezeichnung }}
        </q-toolbar-title>
      </q-toolbar>
      -->
      <div
        class="q-pl-md q-pt-xs q-pb-xs q-pr-xs bg-brown-4 text-subtitle1 text-white"
      >
        Planung des Bodenaufbaus an der im Bauvorhabenbaum ausgewählten
        Baueinheit
        <b>"{{ currentlySelectedNode.baueinheitsBezeichnung }}"</b>
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
          <q-icon name="img:statics/icons/icons8-layers-96.png" size="300%" />
          <q-item-section class="q-pa-xs text-subtitle1">
            <b>
              Eigenschaften des Gesamt-Bodenaufbaus
            </b>
          </q-item-section>
        </template>
        <!-- =================================================================================================== -->
        <!-- Zuerst Anzeige der übergeordneten Angaben: -->
        <!-- Übergeordnete Angaben -->
        <!-- ALT: -->
        <!--
        <div class="row full-width q-pl-none q-pb-xs text-h6">
          {{ tab.ueberschriftTab }}
        </div>
        <div class="row full-width q-pl-none q-pb-xs q-pt-xs bg-brown-2 text-black">
          <b>
            {{ tab.rubrikenInTab[0].ueberschriftRubrik }}
          </b>
        </div>
        -->
        <!-- =================================================================================================== -->
        <!-- NEU - als Expansion Item: -->
        <q-expansion-item
          dense
          expand-separator
          switch-toggle-side
          header-class="q-pa-none text-black bg-brown-2 text-bold inset-shadow-down"
          class="q-pa-none text-black inset-shadow-down"
          :label="tab.rubrikenInTab[0].ueberschriftRubrik"
        >
          <div class="row q-pa-none full-width">
            <div class="col-md-4 col-12 bg-brown-1">
              <b>Raumniveau</b>
              <!-- NEU: #281/#302 -->
              <!-- <b>Geschossniveau</b> -->
              <!-- ALT -->
            </div>
            <div class="col-md-2 col-12 bg-brown-1 text-right">
              <b>OKFFB</b>
            </div>
            <div class="col-md-2 col-12 bg-brown-1 text-right">
              <b>OKRFB</b>
            </div>
            <div class="col-md-2 col-12 bg-brown-1 text-right">
              <b>UKRFB</b>
              <!-- NEU: #281/#302 -->
              <!-- <b>UKRD</b> -->
              <!-- ALT -->
            </div>
            <div class="col-md-2 col-12 bg-brown-1 text-right">
              <b>UKFFB</b>
              <!-- NEU: #281/#302 -->
              <!-- <b>UKD</b> -->
              <!-- ALT -->
            </div>
          </div>
          <div class="row q-pa-none full-width">
            <div class="col-md-4 col-12 bg-brown-1">
              <b>
                - Höhe bezogen auf 0.0 (Niveau der Eingangstür des Gebäudes)
              </b>
            </div>
            <!-- NEU: Alle Niveau-Eigenschaften werden als Kennwertepaare benutzt, kennWert1: 0.0-Wert, kennWert2: NHN-Wert -->
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[0]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[1]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[2]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[3]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1
              }}
            </div>
          </div>
          <div class="row q-pa-none full-width">
            <div class="col-md-4 col-12 bg-brown-1">
              <b>
                - Höhe bezogen auf Normalhöhennull (NHN)
              </b>
            </div>
            <!-- NEU: Alle Niveau-Eigenschaften werden als Kennwertepaare benutzt, kennWert1: 0.0-Wert, kennWert2: NHN-Wert -->
            <!-- ALT: Früher wurdenhier einfach jeweils die NHN-Werte aus dem 0. Feld (OKFFB, dort kennWert2, mit Korrektur um kennwert!) -->
            <!--      zur Ermittlung des NHN-Werts (eigentlich kennWert2) vom Wert für kennWert1 (0.0-Wert) abgezogen -->
            <!-- NUE:  Hier muss der NHN-Wert des Niveaus der Eingangstür (neue Baueigenschaft am Gebäude, die -->
            <!--       als gemeinsame Baueigenschaft auch im Profil für den Bodenaufbau enthalten ist, -->
            <!--       genommen werden - ebenfalls ein Kennwertepaar, ihr kennWert2 enthält dann den hier zu addierenden -->
            <!--       NHN-Wert an der Eingangstür -->
            <!--       In layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.js ist diese schon vorbereitet alls -->
            <!--       layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0].baueigenschaftenInRubrik[4] -->
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                /*
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[0]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1 -
                */
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[0]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1 +
                  profilModelAusgewaehlterKnoten[
                    layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                      .baueigenschaftenInRubrik[4]
                      .indexInProfilModelAusgewaehlterKnoten
                  ].kennWert2
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[1]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1 +
                  profilModelAusgewaehlterKnoten[
                    layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                      .baueigenschaftenInRubrik[4]
                      .indexInProfilModelAusgewaehlterKnoten
                  ].kennWert2
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[2]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1 +
                  profilModelAusgewaehlterKnoten[
                    layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                      .baueigenschaftenInRubrik[4]
                      .indexInProfilModelAusgewaehlterKnoten
                  ].kennWert2
              }}
            </div>
            <div class="col-md-2 col-12 bg-grey-1 text-right">
              {{
                profilModelAusgewaehlterKnoten[
                  layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                    .baueigenschaftenInRubrik[3]
                    .indexInProfilModelAusgewaehlterKnoten
                ].kennWert1 +
                  profilModelAusgewaehlterKnoten[
                    layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
                      .baueigenschaftenInRubrik[4]
                      .indexInProfilModelAusgewaehlterKnoten
                  ].kennWert2
              }}
            </div>
          </div>
          <!-- ACHTUNG: Ohne q-pb-xs am folgenden div wird der inset-shadow-down vom Expansion Item oben nicht angezeigt! -->
          <div class="row q-pb-xs full-width">
            <div class="col-md-4 col-12 bg-brown-1">
              <b>Raumprofil</b>
            </div>
            <div class="col-md-8 col-12 bg-grey-1">
              <b>Büroraum</b>
            </div>
          </div>
        </q-expansion-item>
        <!-- =============================================== -->
        <!-- Trennzeile - disabled:                          -->
        <!--
          <div class="row full-width bg-grey-1">
            <br />
          </div>
          -->
        <!-- <q-separator /> -->
        <!-- =================================================================================================== -->
        <!-- Es folgen die Eigenschaften des Gesamtbodenaufbaus: -->
        <div class="row full-width q-pa-xs q-col-gutter-xs bg-brown-2">
          <!-- =========== ACHTUNG: In erster Spalte q-pl-none zusätzlich, sonst ist der Spaltentext zu weit rechts!!! ================== -->
          <div class="col-md-3 col-12 q-pa-xs">
            <b>Baueigenschaft</b>
          </div>
          <div class="col-md-1 col-12 q-pa-xs">
            <b>Symbol</b>
          </div>
          <!-- NEU: Spalte "Einheit" nach vorne verschoben wegen Einheitlichkeit mit Profilformular "Schicht": -->
          <div class="col-md-1 col-12 q-pa-xs">
            <b>Einheit</b>
            <!-- TODO XXXXXX #302 - Hier noch Problem mit Einheit, kommt als "m" aus Raum, hier "mm" - muss angeglichen oder umgerechnet werden! -->
            <!-- ACHTUNG: Workaround auf Heroku: Dort an den 4 betrofffenen Istwerten (Aufbauhöhe/Dicken) die Einheit in der Datenbank vorläufig auf "m (vorläufig)" statt "mm" geändert!!! -->
          </div>
          <div class="col-md-3 col-12 q-pa-xs">
            <b>Sollwert für den Bodenaufbau</b>
            <div class="text-caption">
              <b>Hinweis:</b> Cyanfarbige Felder sind ererbt, z.B. vom Gebäude
              oder Raum, hellgrüne Felder sind berechnet
            </div>
          </div>
          <div class="col-md-1 col-12 q-pa-xs text-center">
            <b>Vergleich</b>
          </div>
          <div class="col-md-3 col-12 q-pa-xs">
            <b>Istwert für den Bodenaufbau</b>
            <div class="text-caption">
              <b>Hinweis:</b> Hellgrüne Felder sind berechnet
            </div>
          </div>
          <!-- NEU: Spalte "Bewertung" zusammengefasst mit Spalte "Operator" zu Spalte "Vergleich" oben -->
          <!--
          <div class="col-md-1 col-12 q-pa-xs text-center">
            <b>Bewertung</b>
          </div>
          -->
          <!-- NEU: Bemerkungs-Spalte disabled zugunsten von Tooltips auf den Eingabefeldern -->
          <!--
          <div class="col-md-2 col-12 q-pa-xs">
            <b>Bemerkung (optional)</b>
          </div>
          -->
        </div>
        <q-separator />
        <div
          v-for="rubrik in tab.rubrikenInTab"
          :key="rubrik.ueberschriftRubrik"
          :class="rubrik.hintergrundFarbeRubrik"
        >
          <!-- NEU: Fallunterscheidung, die erste Rubrik aus der Schleife genommen: -->
          <div v-if="rubrik.ueberschriftRubrik !== 'Übergeordnete Angaben'
          "
          >
            <!-- ALT: -->
            <!--
              <div class="row full-width q-pl-none q-pt-xs q-pr-none q-pb-xs bg-brown-1 inset-shadow-down">
                <b>
                  {{ rubrik.ueberschriftRubrik }}
                </b>
              </div>
              -->
            <!-- NEU - mit QExpansionItem pro Rubrik: -->
            <q-expansion-item
              dense
              switch-toggle-side
              default-opened
              header-class="q-pa-none text-black text-bold bg-brown-1 inset-shadow-down"
              class="q-pa-none text-black inset-shadow-down"
              :label="rubrik.ueberschriftRubrik"
            >
              <!-- NEU - #387: Die Rubriken für "Musterhaftigkeit" und "Raumnutzungsnachbarschaften" separat rendern weiter unten -->
              <div v-if="rubrik.ueberschriftRubrik !== 'Angaben zur Musterhaftigkeit' &&
                rubrik.ueberschriftRubrik !== 'Angaben zu den Raumnutzungsnachbarschaften'"
              >
                <div
                  v-for="eigenschaft in rubrik.baueigenschaftenInRubrik"
                  :key="eigenschaft.baueigenschaftsBezeichnung"
                >
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
                  <div
                    v-if="eigenschaft.disable !== true"
                    class="row full-width q-pa-xs q-col-gutter-xs"
                  >
                    <div class="col-md-3 col-12 q-pa-xs">
                      {{ eigenschaft.labelBaueigenschaft }}
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
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
                        }}
                      </q-tooltip>
                      <!-- Debug-Info: -->
                      <div v-if="localStore.state.debugMode">
                        {{ !benutzerDarfBearbeitenSelectedNode }}
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null
                        }}
                        {{
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert
                        }}
                        {{ eigenschaft.disable }}
                      </div>
                      <!-- /Debug-Info -->
                    </div>
                    <q-markdown
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      class="col-md-1 col-12 q-pa-xs self-top"
                      :src="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.symbol
                      "
                    />
                    <div
                      v-else
                      class="col-md-1 col-12 q-pa-xs self-top"
                    ></div>
                    <!-- ------------------------------------------------------------------->
                    <!-- Einheit: -->
                    <!-- ACHTUNG: Einheit für Dicken/Aufbauhöhe kommmen als "m" aus Raum, hier am Bodenaufbau "mm" - werden im Rahmen von #305 umgerechnet! -->
                    <!-- NEU @ MS - Hier bei der Ausgabe der Einheit Speziallösung für diese Dicken, bei denen die Sollwerte in [m] sind, die Istwerte aber in [mm]. -->
                    <!-- Seitdem es nur noch eine Spalte für "Einheit" gibt, muss dies hier speziell behandelt werden: -->
                    <q-markdown
                      v-if="
                        (profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar') &&
                          !(
                            eigenschaft.baueigenschaftsBezeichnungSollwert !=
                              null &&
                            (eigenschaft.baueigenschaftsBezeichnungSollwert ===
                              'Raum > Geometrie > Bodenaufbau > Rohboden > Dicke' ||
                              eigenschaft.baueigenschaftsBezeichnungSollwert ===
                                'Raum > Geometrie > Bodenaufbau > Bodenunterseite > Dicke' ||
                              eigenschaft.baueigenschaftsBezeichnungSollwert ===
                                'Raum > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe' ||
                              eigenschaft.baueigenschaftsBezeichnungSollwert ===
                                'Raum > Geometrie > Bodenaufbau > Gesamtdicke')
                          )
                      "
                      class="col-md-1 col-12 q-pa-xs"
                      :src="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.einheit
                      "
                    />
                    <div
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (eigenschaft.baueigenschaftsBezeichnungSollwert ===
                            'Raum > Geometrie > Bodenaufbau > Rohboden > Dicke' ||
                            eigenschaft.baueigenschaftsBezeichnungSollwert ===
                              'Raum > Geometrie > Bodenaufbau > Bodenunterseite > Dicke' ||
                            eigenschaft.baueigenschaftsBezeichnungSollwert ===
                              'Raum > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe' ||
                            eigenschaft.baueigenschaftsBezeichnungSollwert ===
                              'Raum > Geometrie > Bodenaufbau > Gesamtdicke')
                      "
                      class="col-md-1 col-12 q-pa-xs"
                    >
                      m (Sollwert) / mm (Istwert)
                    </div>
                    <div v-else class="col-md-1 col-12 q-pa-xs"></div>
                    <!-- =============================================================================================================== -->
                    <!-- Hier beginnen die Input-Felder für die SOLLWERTE!!! -->
                    <!-- Auf diese wird aus dem Feld indexSollwertInProfilModelAusgewaehlterKnoten ihres Istwerts im Layout zugegriffen! -->
                    <!-- =============================================================================================================== -->
                    <div
                      v-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert == null
                      "
                      class="col-md-3 col-12 q-pa-xs"
                    />
                    <!-- D.h. diese Sollwert-Spalte leer lasssen, falls kein Sollwert im Layout-File definiert ist für diese Eigenschaft!!! -->
                    <!-- ======================================================================================================================================================= -->
                    <!-- NEU: Von höheren Knoten im Baum ererbte Sollwerte als readonly-Felder in Farbe cyan-2 rendern -->
                    <!-- Dazu profilModelAusgewaehlterKnoten[eigenschaft.indexSollwertInProfilModelAusgewwehlterKnoten].bezeichnungWerteVererbenderElternknoten != null abfragen -->
                    <!-- Es gibt auch Sollwerte, die nicht von einem höheren Knoten im Baum ererbt werden! Dann ist dieses Feld null -->
                    <!-- Diese dürfen nicht readonly sein und die Farbe muss teal-2 sein -->
                    <!-- Dies gilt für alle Arten von Wertetypen! -->
                    <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                    <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
                    <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip -->
                    <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                    <!-- NEU: computed-Feld auch für Sollwerte (vorläufig nur hier bei Kennwerten) -->
                    <!--      Steuerung per v-if mittels zusätzlicher Property "benutzeComputedWertSollwert" im Layout File  -->
                    <!--      Die computed-Funktion ist mittels mapOfComputedProperties wie bei den Istwerten implementiert -->
                    <!-- ======================================================================================================================================================= -->
                    <!-- -->
                    <q-input
                      v-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Kennwertepaar') &&
                          eigenschaft.benutzeComputedWertSollwert
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable ||
                          eigenschaft.benutzeComputedWertSollwert
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      :value="
                        mapOfComputedProperties[
                          eigenschaft.bezeichnungComputedPropertySollwert
                        ]
                      "
                      :type="
                        !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null ||
                        !profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        eigenschaft.disable ||
                        eigenschaft.benutzeComputedWertSollwert
                          ? ''
                          : 'number'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft
                                  .indexSollwertInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Kennwertepaar') &&
                            eigenschaft.benutzeComputedWertSollwert
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- --------------------------------------------------------------------------------------- -->
                    <!-- Es folgen die reguären Eingabefelder für die erste Spalte: -->
                    <q-input
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Kennwertepaar')
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      :type="
                        !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null ||
                        !profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        eigenschaft.disable
                          ? ''
                          : 'number'
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft
                                  .indexSollwertInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Kennwertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- --------------------------------------------------------------------------------------- -->
                    <q-input
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswertepaar')
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft
                                  .indexSollwertInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Bezeichnungswertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-input
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Tageszeitwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Tageszeitwertepaar')
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].tagesZeitWert1
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                      mask="##:##"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Tageszeitwert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft
                                  .indexSollwertInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Tageszeitwertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                      <!-- HINWEIS: Die aufwändigen Konvertierungen von Date nach String in mounted(), reset() und in watch() (= Refresh) und zurück in submitWerteAnBaueinheit wie in QDate sind für QTime überflüssig, -->
                      <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                      <!-- Es folgt der Code für q-time: -->
                      <!-- :locale="dateLocale" -->
                      <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              :readonly="
                                !benutzerDarfBearbeitenSelectedNode ||
                                  profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].bezeichnungWerteVererbenderElternknoten !=
                                    null ||
                                  !profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].aktiviertNichtDeaktiviert ||
                                  eigenschaft.disable
                              "
                              v-model="
                                profilModelAusgewaehlterKnoten[
                                  eigenschaft
                                    .indexSollwertInProfilModelAusgewaehlterKnoten
                                ].tagesZeitWert1
                              "
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
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-input
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswertepaar')
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        eigenschaft.typbezogeneBaueigenschaft
                          .baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].datumsWert1
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                      mask="##.##.####"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft
                                  .indexSollwertInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Datumswertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                      <!-- Das Datumsfeld kommt im Mongoose Date-Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                      <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                      <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                      <!-- und neueBaueigenschaft.datumsWert1/2 -->
                      <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                      <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteanBaueinheit() - siehe Kommentare dort! -->
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
                                  profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].bezeichnungWerteVererbenderElternknoten !=
                                    null ||
                                  !profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].aktiviertNichtDeaktiviert ||
                                  eigenschaft.disable
                              "
                              v-model="
                                profilModelAusgewaehlterKnoten[
                                  eigenschaft
                                    .indexSollwertInProfilModelAusgewaehlterKnoten
                                ].datumsWert1
                              "
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
                    <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                    <!-- Folgender Code am QSelect für Aufzählungswerte ist für die Steuerung des Disablings/Enablings von anderen Feldern -->
                    <!-- in Abhängigkeit von der gewählten Option eines Aufzählungswerten -->
                    <!-- Beim Reset eines solchen Aufzählungswerts müssen in diesem Fall auch bestimmte andere Felder auf null gesetzt werden. -->
                    <!-- Vorkehrungen dafür: -->
                    <!-- 1. @input-Methode (wird aufgerufen bei Model Change für das QSelect, steuert Disabling/Enabling UND Reset von anderen Feldern auf dem Form, -->
                    <!--    Hat Parameter -->
                    <!-- 2. :value statt v-model, muss in Verbindung mit @input benutzt werden -->
                    <!-- 3. @focus-Methode (wird aufgerufen bei Anklicken des QSelects, setzt fachliche Hilfe für das Feld) -->
                    <!-- HINWEIS: Parameter newValue an diesem @input ist identisch mit Vue $event - Quasar emitted newValue als $event (= Event Payload) -->
                    <!-- ACHTUNG: :value und @input ersetzt durch v-model, weil hier nicht benötigt! -->
                    <!-- ======================== ACHTUNG: Hier q-pl-sm zusätzlich, sonst sind die QSelects links anders als die QInputs!!! ========================= -->
                    <!-- ======================== ACHTUNG: Hier kein multiple am QSelect -->
                    <q-select
                      clearable
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Aufzählungswert'
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      :options="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Aufzählungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-toggle
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      :readonly="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].wahrheitsWert
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft
                            .indexSollwertInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      indeterminate
                      dense
                      @input="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Wahrheitswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-toggle>
                    <div
                      v-else-if="
                        eigenschaft.baueigenschaftsBezeichnungSollwert != null
                      "
                      class="col-md-3 col-12 q-pa-xs"
                    >
                      Nicht unterstützter Wertetyp
                      <!-- ALT -->
                      <!-- NEU: Seit dem computed auch für Sollwert-Felder oben läuft der Code in Zeilen mit leeren Sollwerten, d.h. nur Istwerten, hier rein -->
                      <!--      und produziert diese Anzeige mitsamt Spillover der Zeile rechts! -->
                      <!--      Abgefangen mit v-else-if oben -->
                    </div>
                    <!-- Ende 1. Spalte für die Input-Felder (QInput, QSelect, QToggle)  -->
                    <!-- ========================================================================================================================== -->
                    <!-- NEU: Spalten "Operator" und "Bewertung" zu einer Spalte "Vergleich" zusammengefasst -->
                    <!-- ALT: Spalte "Operator" für Soll-/Istwertevergleich: -->
                    <div class="col-md-1 col-12 q-pa-xs text-center">
                      <!-- ALT - mit q-markdown für Operator, damit gibt es aber einen größeren Zeilenumbruch zwischen operator und displayCheckMark()! -->
                      <!--
                      <q-markdown
                        v-if="eigenschaft.operatorSollIstWerteVergleich != null"
                        :src="eigenschaft.operatorSollIstWerteVergleich"
                      />
                      -->
                      <!-- NEU - mit div: Damit gibt es immer noch einen (kleineren) Zeilenumbruch zwischen operator und displayCheckMark()! -->
                      <div
                        v-if="eigenschaft.operatorSollIstWerteVergleich != null"
                      >
                        {{ eigenschaft.operatorSollIstWerteVergleich }}
                        <!-- ============================================================================================= -->
                        <!-- NEU: Checkmarks für für Bewertung: -->
                        <!-- ACHTUNG: Wenn diese nicht in das obige div am operator eingebettet sind, gibt es einen größeren Abstand!!! -->
                        <!-- ACHTUNG: Ohne die class="text-center" gibt es trotzdem einen Zeilenumbruch zwischen operator und displayCheckMark()! -->
                        <!-- <div class="col-md-1 col-12 self-center" -->
                        <!-- ALT - in separater Spalte hinten -->
                        <div
                          v-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Geometrie > Fertigboden > Aufbauhöhe' // NEU: #281/#302
                            // 'Bodenaufbau > Geometrie > Oberboden > Aufbauhöhe > Istwert' // ALT
                          "
                        >
                          <!--  {{ computeAufbauhoeheFertigbodenSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeAufbauhoeheFertigbodenSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeAufbauhoeheFertigbodenSollIstWerteVergleich ===
                                false
                            "
                            class="text-red"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                        </div>
                        <!-- ------------------------------------------------------------------------------------------------------------------ -->
                        <!-- ACHTUNG - #302:                                                                                                    -->
                        <!-- TODO XXXXXX - BEg wird verglichen mit Niveaudifferenz OKFFB - diese müsste erst noch computed werden am Raum!      -->
                        <!--               Macht aber auch so keinen Sinn - gemeint war mit dieser BEg eventuell eine "lokale" Bodenabsenkung   -->
                        <!--               des Rohbodens, z.B. für eine Dusche. Diese vorläufig disabled im Layout File.                        -->
                        <!--               Daher wird dieser Teil aktuell nicht mehr ausgeführt, inklusive der comupteAbsenkung...()-Funktion!  -->
                        <!-- ------------------------------------------------------------------------------------------------------------------ -->
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung' // NEU: #281/#302
                            // 'Bodenaufbau > Geometrie > Rohdecke > Absenkung > Istwert' // ALT
                          "
                        >
                          <!--  {{ computeAbsenkungSollIstWerteVergleich }} -->
                          <div
                            v-if="computeAbsenkungSollIstWerteVergleich === true"
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeAbsenkungSollIstWerteVergleich === false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <!-- ------------------------------------------------------------------------------------------------------------------ -->
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Geometrie > Bodenunterseite > Dicke' // NEU: #281/#302
                            // 'Bodenaufbau > Geometrie > Unterdecke > Bekleidung > Höhe > Istwert' // ALT
                          "
                        >
                          <!--  {{ computeDickeBodenunterseiteSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeDickeBodenunterseiteSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeDickeBodenunterseiteSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <div
                          v-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Geometrie > Rohboden > Dicke' // NEU: #281/#302
                            // 'Bodenaufbau > Geometrie > Rohdecke > Höhe > Istwert' // ALT
                          "
                        >
                          <!--  {{ computeDickeRohbodenSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeDickeRohbodenSollIstWerteVergleich === true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeDickeRohbodenSollIstWerteVergleich === false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <!-- ----------------------------------------------------------------------- -->
                        <!-- NEU - @MS: -->
                        <div
                          v-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Geometrie > Gesamtdicke' // NEU: #281/#302
                          "
                        >
                          <!--  {{ computeGesamtdickeBodenSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeGesamtdickeBodenSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeGesamtdickeBodenSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <!-- -------------------------------------------------------------------------- -->
                        <!-- 'Raum > Lastannahmen > Bodenaufbau > Nutzlastenkategorie > Sollwert' -->
                        <!-- // ALT -->
                        <!-- 'Raum > Nutzlasten > Kategorie > Richtwert' -->
                        <!-- NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten") -->
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Raum > Nutzlasten > Kategorie > Richtwert'
                          "
                        >
                          <!--  {{ computeBodenaufbauNutzlastenkategorieSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeBodenaufbauNutzlastenkategorieSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeBodenaufbauNutzlastenkategorieSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Nutzlasten > Flächenlast > Istwert'
                          "
                        >
                          <!--  {{ computeLastannahmenFlächenlastSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeLastannahmenFlächenlastSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeLastannahmenFlächenlastSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Nutzlasten > Einzellast > Istwert'
                          "
                        >
                          <!--  {{ computeLastannahmenEinzellastSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeLastannahmenEinzellastSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeLastannahmenEinzellastSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert'
                          "
                        >
                          <!-- {{ computeWärmeschutzWärmedurchgangskoeffizientSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeWärmeschutzWärmedurchgangskoeffizientSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeWärmeschutzWärmedurchgangskoeffizientSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <!-- ----------------------------------------------------------------------------------------------------------------- -->
                        <div
                          v-else-if="
                            eigenschaft.baueigenschaftsBezeichnung ===
                              'Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert'
                          "
                        >
                          <!-- {{ computeWärmeschutzWärmedurchlasswiderstandSollIstWerteVergleich }} -->
                          <div
                            v-if="
                              computeWärmeschutzWärmedurchlasswiderstandSollIstWerteVergleich ===
                                true
                            "
                            class="text-center"
                          >
                            {{ displayCheckMark(true) }}
                          </div>
                          <div
                            v-else-if="
                              computeWärmeschutzWärmedurchlasswiderstandSollIstWerteVergleich ===
                                false
                            "
                            class="text-red text-center"
                          >
                            {{ displayCheckMark(false) }}
                          </div>
                          <div v-else>
                            <!-- null-Fall: Leer lassen -->
                          </div>
                        </div>
                        <div v-else>
                          <!-- Fehlerhafte Baueigenschaftsbezeichnung -->
                        </div>
                      </div>
                    </div>
                    <!-- ================================================================================================================================ -->
                    <!-- Start der Spalte für die Input-Felder der ISTWERTE - auf diese wird direkt per indexInProfilModelAusgewaehlterKnoten zugegriffen -->
                    <!-- ====================================================================================================== -->
                    <!-- NEU: Mittels Prop nurSollWertAnzeigen im Layout File kann die Anzeige der Istwerte unterdrückt werden! -->
                    <!-- ACHTUNG: Gleichzeitig sollte Prop operatorSollIstWerteVergleich: null, gesetzt werden!                 -->
                    <!-- ====================================================================================================== -->
                    <!-- ACHTUNG: Hier bei Kennwerten und Kennwertepaaren Unterscheidung, ob benutzeComputedWert == false ist    -->
                    <!-- ACHTUNG: Ist vorläufig nur für diese Wertetypen implementiert!!!                                       -->
                    <!-- ====================================================================================================== -->
                    <q-input
                      v-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp == 'Kennwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ==
                              'Kennwertepaar') &&
                          eigenschaft.benutzeComputedWert == false
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="eigenschaft.eigenschaftIstwert.kennWert1"
                      type="number"
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          !eigenschaft.nurSollWertAnzeigen &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft.indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ==
                                'Kennwertepaar') &&
                            eigenschaft.benutzeComputedWert == false
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- ---------------------------------------------------------------------------------------------------------------- -->
                    <!-- NEU 25.01.2021:                                                                                                  -->
                    <!-- benutzeComputedWert zeigt an, dass dieser Wert über computed-Eigenschaften berechnet wird                        -->
                    <!-- Es wird deswegen anstatt des kennWert1 der eigenschaft ein Property im (computed) Objekt mapOfComputedProperties -->
                    <!-- angezeigt. Der Namen der anzuzeigenden Property dieses Objekts steht in eigenschaft.bezeichnungComputedProperty, -->
                    <!-- deshalb auch der Aufruf mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]                         -->
                    <!-- Die Eingabe hier ist standardmäßig disabled                                                                      -->
                    <!-- NEU @MS: readonly statt disable, green-2 statt teal-2. HINWEIS: readonly zeigt Tooltip an, disable nicht!        -->
                    <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
                    <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip -->
                    <!--      Daher type="number" hier weggelassen! -->
                    <!-- ---------------------------------------------------------------------------------------------------------------- -->
                    <q-input
                      v-else-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp == 'Kennwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ==
                              'Kennwertepaar') &&
                          eigenschaft.benutzeComputedWert == true
                      "
                      readonly
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      :value="
                        mapOfComputedProperties[
                          eigenschaft.bezeichnungComputedProperty
                        ]
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          !eigenschaft.nurSollWertAnzeigen &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft.indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ==
                                'Kennwertepaar') &&
                            eigenschaft.benutzeComputedWert == true
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                    <!-- Folgender Code am QSelect für Aufzählungswerte ist für die Steuerung des Disablings/Enablings von anderen Feldern -->
                    <!-- in Abhängigkeit von der gewählten Option eines Aufzählungswerten -->
                    <!-- Beim Reset eines solchen Aufzählungswerts müssen in diesem Fall auch bestimmte andere Felder auf null gesetzt werden. -->
                    <!-- Vorkehrungen dafür: -->
                    <!-- 1. @input-Methode (wird aufgerufen bei Model Change für das QSelect, steuert Disabling/Enabling UND Reset von anderen Feldern auf dem Form, -->
                    <!--    Hat Parameter -->
                    <!-- 2. :value statt v-model, muss in Verbindung mit @input benutzt werden -->
                    <!-- 3. @focus-Methode (wird aufgerufen bei Anklicken des QSelects, setzt fachliche Hilfe für das Feld) -->
                    <!-- HINWEIS: Parameter newValue an diesem @input ist identisch mit Vue $event - Quasar emitted newValue als $event (= Event Payload) -->
                    <!-- ACHTUNG: :value und @input ersetzt durch v-model, weil hier nicht benötigt! -->
                    <!-- ======================== ACHTUNG: Hier q-pl-sm zusätzlich, sonst sind die QSelects links anders als die QInputs!!! ========================= -->
                    <q-select
                      clearable
                      v-else-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Aufzählungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      :options="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          !eigenschaft.nurSollWertAnzeigen &&
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Aufzählungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <q-input
                      v-else-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Tageszeitwert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ==
                              'Tageszeitwertepaar')
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        eigenschaft.typbezogeneBaueigenschaft
                          .baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].tagesZeitWert2
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                      mask="##:##"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          !eigenschaft.nurSollWertAnzeigen &&
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Tageszeitwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                      <!-- HINWEIS: Die aufwändigen Konvertierungen von Date nach String in mounted(), reset() und in watch() (= Refresh), und zurück in submitWerteAnBaueinheit wie in QDate sind für QTime überflüssig, -->
                      <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                      <!-- Es folgt der Code für q-time: -->
                      <!-- :locale="dateLocale" -->
                      <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time
                              :readonly="
                                !benutzerDarfBearbeitenSelectedNode ||
                                  profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].bezeichnungWerteVererbenderElternknoten !=
                                    null ||
                                  !profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].aktiviertNichtDeaktiviert ||
                                  eigenschaft.disable
                              "
                              v-model="
                                profilModelAusgewaehlterKnoten[
                                  eigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].tagesZeitWert2
                              "
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
                    <q-input
                      v-else-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswertepaar')
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].datumsWert2
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                      mask="##.##.####"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          !eigenschaft.nurSollWertAnzeigen &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft.indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Datumswertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
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
                      <!-- Das Datumsfeld kommt im Mongoose Date-Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                      <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                      <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                      <!-- und neueBaueigenschaft.datumsWert1/2 -->
                      <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                      <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteanBaueinheit() - siehe Kommentare dort! -->
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
                                  profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].bezeichnungWerteVererbenderElternknoten !=
                                    null ||
                                  !profilModelAusgewaehlterKnoten[
                                    eigenschaft
                                      .indexSollwertInProfilModelAusgewaehlterKnoten
                                  ].aktiviertNichtDeaktiviert ||
                                  eigenschaft.disable
                              "
                              v-model="
                                profilModelAusgewaehlterKnoten[
                                  eigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].datumsWert2
                              "
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
                        !eigenschaft.nurSollWertAnzeigen &&
                          (profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswert' ||
                            profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswertepaar')
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].datumsWert2
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          !eigenschaft.nurSollWertAnzeigen &&
                            (profilModelAusgewaehlterKnoten[
                              eigenschaft.indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswert' ||
                              profilModelAusgewaehlterKnoten[
                                eigenschaft.indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Bezeichnungswertepaar')
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- -------------------------------------------------------------------------- -->
                    <!-- NEU: Unterstützung für Wahrheitswerte auch in hinterer Spalte für Istwerte -->
                    <q-toggle
                      v-else-if="
                        !eigenschaft.nurSollWertAnzeigen &&
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-3 col-12 q-pa-xs"
                      :label="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].wahrheitsWert
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      indeterminate
                      dense
                      @input="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          eigenschaft.baueigenschaftsBezeichnungSollwert !=
                            null &&
                            profilModelAusgewaehlterKnoten[
                              eigenschaft
                                .indexSollwertInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Wahrheitswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            eigenschaft
                              .indexSollwertInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-toggle>
                    <div v-else class="col-md-3 col-12 q-pa-xs"></div>
                    <!-- Ende 2. Spalte für die Input-Felder (QInput, QSelect) bei Paaren -->
                    <!-- ============================================================================================= -->
                    <!-- Spalte für Bemerkungs-Feld, Freitext auf bezeichnungsWert der Baueigenschaft für den ISTWERT: -->
                    <!-- DONE - Label korrigiert: -->
                    <!-- ALT:
                  :label="
                      profilModelAusgewaehlterKnoten[
                        eigenschaft.indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
                    "
                    -->
                    <!-- NEU:
                    label="
                        Hier Bemerkung eintragen
                      "
                    -->
                    <!-- ============================================================================================= -->
                    <!-- NEU: Bemerkungs-Spalte disabled zugunsten von Tooltips auf den Eingabefeldern: -->
                    <!--
                    <q-input
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      class="col-md-2 col-12 q-pa-xs"
                      label="
                      Hier ggf. Bemerkung eintragen
                    "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    />
                    -->
                    <!-- Spezielle Felder, nur bei generischem Baueigenschaftsprofilformular: -->
                    <!-- Die folgende Information erzeugt einen Spillover über rechten Rand, deshalb disabled: -->
                    <!--
                          <div class="col-md-2 col-12 q-pa-xs">
                              Erstmals definiert auf Pfad an:
                              {{ profilModelAusgewaehlterKnoten[eigenschaft.indexInProfilModelAusgewaehlterKnoten].bezeichnungWerteVererbenderElternknoten }}
                          </div>
                          -->
                    <!-- Die folgende Checkbox erzeugt einen Spillover über rechten Rand, deshalb disabled: -->
                    <!--
                  <div class="col-md-1 col-12 q-pa-xs">
                  <q-checkbox
                      :disable="true"
                      :value="profilModelAusgewaehlterKnoten[eigenschaft.indexInProfilModelAusgewaehlterKnoten].aufzaehlungsWert !== null"
                      label="Definiert"
                      dense
                  />
                  </div>
                  --></div>
                  <!-- Ende Zeile für Baueigenschaft  -->
                </div>
              </div>
              <!-- NEU - #387: Die Rubriken für "Musterhaftigkeit" und "Raumnutzungsnachbarschaften" nun separat rendern: -->
              <div
                v-if="rubrik.ueberschriftRubrik === 'Angaben zur Musterhaftigkeit'"
                class="bg-grey-1 inset-shadow-down"
              >
                <div
                  class="row full-width q-col-gutter-xs q-pa-xs"
                >
                  <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- QSelect-Feld                                                             -->
                    <!-- <b>Gültigkeit als Musterboden</b>                                  -->
                    <q-select
                      clearable
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0].disable
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :options="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Aufzählungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <!-- --------------------------------------------------------------------------------- -->
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <div class="col-md-2 col-12 q-pa-xs">
                    <!-- Leerspalte                                                              -->
                  </div>
                  <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- Gültigkeit für Raumnutzungsnachbarschaften?                              -->
                     <q-toggle
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[1].disable
                      "
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].wahrheitsWert
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      indeterminate
                      dense
                      @input="
                        setzeFelderFuerFachlicheHilfe(
                           profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                                .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                                .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                                .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                                .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
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
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                                .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Wahrheitswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                                .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                                .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-toggle>
                  </div>
                  <div class="col-md-1 col-12 q-pa-xs">
                    <!-- Leerspalte                                                              -->
                  </div>
                  <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- QInput-Feld                                                             -->
                    <!-- <b>Erläuterung zur Gültigkeit als Musterbodenaufbau</b>                                  -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2].disable
                      "
                      autogrow
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-input>
                    <!-- --------------------------------------------------------------------------------- -->
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="rubrik.ueberschriftRubrik === 'Angaben zu den Raumnutzungsnachbarschaften'"
                class="bg-grey-1 inset-shadow-down"
              >
                <div
                  class="row full-width q-col-gutter-xs q-pa-xs"
                >
                  <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- QSelect-Feld                                                             -->
                    <!-- <b>Raumnutzungsprofil des Raums über dem Bodenaufbau</b>                 -->
                    <!-- TODO XXXXXX: Vorläufig Bezeichnungswert, muss Aufzählungswert sein!      -->
                    <q-select
                      clearable
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0].disable
                      "
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :options="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <!-- --------------------------------------------------------------------------------- -->
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <div class="col-md-2 col-12 q-pa-xs">
                    <!-- Leerspalte                                                              -->
                  </div>
                  <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- QSelect-Feld                                                             -->
                    <!-- <b>Raumnutzungsprofil des Nachbarraums unter dem Bodenaufbau (Sollwert)</b> -->
                    <!-- Ererbt vom Boden -->
                    <q-select
                      clearable
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1].disable
                      "
                      readonly
                      :bg-color="
                        profilModelAusgewaehlterKnoten[
                         layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                             .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten != null
                          ? 'cyan-2'
                          : 'teal-2'
                      "
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :options="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Aufzählungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <!-- --------------------------------------------------------------------------------- -->
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                 </div>
                 <div class="col-md-1 col-12 q-pa-xs">
                    <!-- Leerspalte                                                              -->
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                    <!-- ============================ Start Feld ================================ -->
                    <!-- QSelect-Feld                                                             -->
                    <!-- <b>Raumnutzungsprofil des Nachbarraums unter dem Bodenaufbau (Istwert)</b> -->
                    <!-- TODO XXXXXX: Muss initialisiert werden mit Sollwert!                    -->
                    <q-select
                      clearable
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[2].disable
                      "
                      :bg-color="customBackgroundColorIstWerteFelder"
                      :standout="customStandoutColorIstWerteFelder"
                      square
                      dense
                      :options="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :label="
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                          .labelBaueigenschaft ?
                        layoutBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                          .labelBaueigenschaft :
                         profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Aufzählungswert'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                    </q-select>
                    <!-- --------------------------------------------------------------------------------- -->
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                </div>
              </div>
            </q-expansion-item>
          </div>
          <q-separator />
        </div>
      </q-expansion-item>
    </div>
    <div v-if="alleSchichtknoten">
      <q-separator />
      <div
        class="text-subtitle1 q-pl-sm q-pt-xs q-pb-xs q-pr-xs text-bold bg-brown-2"
      >
        Schichten im Bodenaufbau:
      </div>
      <div v-for="(schicht, index) in alleSchichtknoten" :key="schicht._id">
        <div v-if="mapRelevanteBaueigenschaftenEinzelschichten != null">
          <!-- Größere Icons? -->
          <!-- https://forum.quasar-framework.org/topic/3714/how-to-set-qexpansionitem-icon-tooltip-size - per CSS, aber nur für Expansion Icon rechts -->
          <!-- DONE: https://quasar.dev/vue-components/expansion-item#Options, per v-slot:header und q-icon in Header -->
          <!-- DONE: expand-icon-toggle - zum selektiven Auswählen einer Schicht vs. dem Ausklappen der Schicht per Arrow rechts -->
          <!--       Dies funktionierte ursprünglich nicht zusammen mit dem Header VSlots - es wurde dann bei Click gar keine Schicht mehr selektiert! -->
          <!--       Lösung: Das @click-Event auch am q-icon und der q-icon-section im Header VSlot - so kann Selektion unabhängig von Expansion erfolgen! -->
          <!-- DONE: Fix für #286 -->
          <!-- ALT: :header-class="selectedSchicht !== schicht" -->
          <!-- NEU: :header-class="selectedSchicht._id !== schicht._id" -->
          <q-list bordered>
            <q-expansion-item
              expand-icon-toggle
              switch-toggle-side
              class="q-pa-none"
              :header-class="
                selectedSchicht != null && selectedSchicht._id === schicht._id
                  ? 'bg-brown-3 text-primary inset-shadow-down'
                  : 'bg-brown-1 text-black inset-shadow-down'
              "
              dense
              group="accordion-all"
              :label="schicht.baueinheitsBezeichnung"
              @click="selectedSchicht = schicht"
            >
              <template v-slot:header>
                <!-- Nur zum Testen: -->
                <!--
                  <q-item-section avatar>
                    <q-avatar icon="bluetooth" color="primary" text-color="white" />
                  </q-item-section>
                  -->
                <q-icon
                  :name="
                    index < 100
                      ? 'img:statics/icons/icons8-' + (index + 1) + '-100.png'
                      : null
                  "
                  size="250%"
                  @click="selectedSchicht = schicht"
                />
                <q-item-section
                  class="q-pl-md text-subtitle1"
                  @click="selectedSchicht = schicht"
                >
                  <strong>
                    {{ schicht.baueinheitsBezeichnung }}
                  </strong>
                </q-item-section>
                <!-- Nur zum Testen: -->
                <!--
                  <q-item-section side>
                    <div class="row items-center">
                      <q-icon name="star" color="red" size="24px" />
                      <q-icon name="star" color="red" size="24px" />
                      <q-icon name="star" color="red" size="24px" />
                    </div>
                  </q-item-section>
                  -->
              </template>
              <!-- QCard disabled, braucht zuviel Platz: -->
              <!--
              <q-card class="q-pa-none text-black">
                <q-card-section v-if="useSchichtComponent">
              -->
              <!-- Debug-Info: -->
              <!--
               <div>{{ schicht.indexInAggregationsknoten }}</div>
              -->
              <einzel-schicht
                profilBezeichnung="Baueinheit > Schicht"
                :selectedNode="schicht"
                :nodes="treeNodes"
                :benutzerDarfBearbeitenSelectedNode="
                  benutzerDarfBearbeitenSelectedNode
                "
                :profilFormularIstReadonly="false"
                @eigenschaft-kennwert-update="
                  handleUpdateValueBaueigenschaftKennwert1
                "
                @eigenschaft-aufzaehlungswert-update="
                  handleUpdateValueBaueigenschaftAufzaehlungswert
                "
              />
              <!--
                </q-card-section>
              </q-card>
              -->
              <!--
              <q-item-section>
                <q-item-label>{{
                  schicht.bezeichnung
                }}</q-item-label>
                <q-item-label caption lines="1"
                  >Schichtdicke (mm):
                  {{ schicht.dicke }}</q-item-label
                >
              </q-item-section>
              -->
              <!--
              <q-item-section side>
                <q-icon name="chat_bubble" color="green" />
              </q-item-section>
              -->
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>
    <div v-if="localStore.state.debugMode">
      <div class="row full-width q-pa-xs q-col-gutter-xs">
        <div class="col-md-4 col-12">
          Testaktionen (nur für Entwickler!) &nbsp;
          {{ displayRightArrow }}
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            style="height: 100%"
            label="Zeige Kinder"
            color="indigo-4"
            glossy
            no-caps
            @click="getChildrenOfCurrentNode"
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            style="height: 100%"
            label="Aktiviere Schichtprofil an Kind"
            @click="aktiviereProfilAnKindern(profilEinzelschicht._id)"
            color="indigo-4"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            style="height: 100%"
            label="Vererbungsdatenstrukturen erstellen"
            color="indigo-4"
            glossy
            no-caps
            @click="
              baueEigenschaftenVererbungsdatenstruktur(
                treeNodes[0],
                currentlySelectedNode,
                profilEinzelschicht.zugeordneteBaueigenschaften
              )
            "
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            style="height: 100%"
            label="Gesamtschichtaufbau"
            color="indigo-4"
            glossy
            no-caps
            @click="gesamtschichtKnoten = baueGesamtschichtDatenstruktur()"
          />
        </div>
      </div>
      <div class="row full-width q-pa-xs q-col-gutter-xs">
        <div class="col-md-4 col-12">
          Testaktionen (nur für Entwickler!) &nbsp;
          {{ displayRightArrow }}
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            label="Sortiere Schicht"
            @click="orderSchichtknoten"
            class="stretch full-width"
            color="purple-4"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            label="Bearbeite Schicht"
            @click="showDialog = true"
            color="purple-4"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            label="Update Schichtaufbau"
            @click="updateGesamtschichtaufbau"
            color="purple-4"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-2 col-12">
          <q-btn
            class="stretch full-width"
            label="Datenstrukturen für Berechnung"
            @click="
              erstelleDatenstrukturen(
                currentlySelectedNode,
                alleSchichtknoten,
                profilGesamtschichtaufbau,
                profilEinzelschicht
              )
            "
            color="purple-4"
            glossy
            no-caps
          />
        </div>
      </div>
      <q-separator />
    </div>
    <!-- <br /> -->
    <!-- ACHTUNG: Hier q-col-gutter notwendig, sonst gibt es einen Spillover der letzten Column über den rechten Rand in eine neue Zeile!!! --->
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <!--
        <div class="col-md-3 col-12">
          Aktionen für ausgewählte Schicht&nbsp;
          {{ displayRightArrow }}
        </div>
        -->
      <div class="col-md-3 col-12">
        <q-btn
          :disable="selectedSchicht == null"
          class="stretch full-width"
          style="height: 100%"
          label="Ausgewählte Schicht nach oben verschieben"
          color="pink-7"
          glossy
          no-caps
          @click="swapSchichtposition('up')"
        />
      </div>
      <div class="col-md-3 col-12">
        <q-btn
          :disable="selectedSchicht == null"
          class="stretch full-width"
          style="height: 100%"
          label="Ausgewählte Schicht nach unten verschieben"
          color="purple-7"
          glossy
          no-caps
          @click="swapSchichtposition('down')"
        />
      </div>
      <div class="col-md-3 col-12">
        <q-btn
          :disable="selectedSchicht == null"
          class="stretch full-width"
          style="height: 100%"
          label="Ausgewählte Schicht entfernen"
          color="red-7"
          glossy
          no-caps
          @click="
            zuLoeschenderNodeTreeBaueinheiten = selectedSchicht;
            deleteSchichtDialog = true;
          "
        />
      </div>
      <div class="col-md-3 col-12">
        <q-btn
          class="stretch full-width"
          style="height: 100%"
          label="Neue Schicht unten hinzufügen"
          color="green-7"
          glossy
          no-caps
          @click="showCreateSchichtDialog = true"
        />
      </div>
    </div>
    <!-- --------------------------------------------------- -->
    <!-- Für Debugging von #394: -->
    <div v-if="localStore.state.debugMode && selectedSchicht">
      <br/>
      selectedSchicht._id: {{ selectedSchicht._id }}
    </div>
    <!-- --------------------------------------------------- -->
    <div>
      <q-separator />
    </div>
    <!-- ACHTUNG: Hier q-col-gutter notwendig, sonst gibt es einen Spillover der letzten Column über den rechten Rand in eine neue Zeile!!! -->
    <!-- ============ ACHTUNG: Hier q-pl-none notwendig, sonst sind die Buttons nicht mit denen darüber aligend!!! =======================  -->
    <div class="row full-width q-pt-xs q-pr-xs q-pb-xs q-pl-xs q-col-gutter-xs">
      <div class="col-md-3 col-12">
        <q-btn
          class="stretch full-width"
          style="height: 100%"
          color="positive"
          glossy
          no-caps
          label="Bodenaufbau speichern"
          @click="updateGesamtschichtaufbau"
        />
      </div>
      <div class="col-md-3 col-12">
        <q-btn
          class="stretch full-width"
          style="height: 100%"
          color="deep-orange"
          glossy
          label="Bodenaufbau zurücksetzen"
          @click="zuruecksetzenAufAnfangszustand"
          no-caps
        />
      </div>
    </div>
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Information</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Das ausgewählte Tab von BIM.<em>click</em>wird geändert. Nicht
          gespeicherte Eingaben gehen verloren.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Fortsetzen"
            @click="modifySelectedSchicht"
            color="primary"
            v-close-popup
          />
          <q-btn flat label="Abbrechen" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- ------------------------------------------------------------------------------------------- -->
    <!-- NEU: Teil von #282 - Delete Dialog für Schicht, triggert Löschen des in                     -->
    <!--      zuLoeschenderNodeTreeBaueinheiten zwischengespeicherten Nodes (eine Schicht)           -->
    <!-- ------------------------------------------------------------------------------------------- -->
    <q-dialog
      v-if="zuLoeschenderNodeTreeBaueinheiten"
      v-model="deleteSchichtDialog"
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
              Soll die Schicht
              <b
                >"{{
                  zuLoeschenderNodeTreeBaueinheiten.baueinheitsBezeichnung
                }}"</b
              >
              wirklich gelöscht werden?
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
                @click="deleteSchicht(zuLoeschenderNodeTreeBaueinheiten)"
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
    <q-dialog v-model="showCreateSchichtDialog">
      <div>
        <!-- WICHTIG: div-Wrapper für q-form!!! -->
        <q-form ref="formNeueBaueinheitDialog" @submit="createSchicht">
          <!-- Für Validation, erfordert dieses q-form mit div-Wrapper inside q-dialog, das sonst überflüssig wäre -->
          <q-card>
            <q-card-section>
              <div>
                Bitte die gewünschte Baueinheitsbezeichnung für die neue Schicht
                des Bodenaufbaus "{{
                  currentlySelectedNode.baueinheitsBezeichnung
                }}" im Bauvorhabenbaum eingeben:
                <br />
                <br />
              </div>
              <q-input
                autofocus
                square
                bg-color="teal-2"
                standout="bg-teal-4 text-black"
                dense
                :clearable="true"
                :rules="[
                  v =>
                    (v != null && v !== '') || 'Bezeichnung ist erforderlich',
                  v =>
                    (v.length > 0 && v.length <= 200) ||
                    'Bezeichnung darf höchstens 200 Zeichen lang sein'
                ]"
                hint="Unter den Schichten im Bodenaufbau eindeutige Bezeichnung für die neue Schicht"
                hide-hint
                label="Bezeichnung der neuen Schicht"
                v-model="bezeichnungNeueSchicht"
              />
              <br />
              <div>
                Die neue Schicht wird unten im Bodenaufbau hinzugefügt und kann
                anschließend an eine andere Position verschoben werden
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <div class="row full-width q-col-gutter-xs q-pa-xs">
                <div class="col-3">
                  <q-btn
                    class="stretch full-width"
                    style="height: 100%"
                    glossy
                    label="Abbrechen"
                    color="negative"
                    no-caps
                    v-close-popup
                  />
                </div>
                <!-- ACHTUNG: q-btn type="reset" für obige Form Validation mit q-form! -->
                <!--  -->
                <div class="col-3">
                  <q-btn
                    class="stretch full-width"
                    style="height: 100%"
                    glossy
                    type="reset"
                    label="Zurücksetzen"
                    color="deep-orange"
                    text-color="white"
                    no-caps
                  />
                </div>
                <!-- ACHTUNG: q-btn type="submit" für obige Form Validation mit q-form! -->
                <!--  -->
                <div class="col-6">
                  <q-btn
                    class="stretch full-width"
                    style="height: 100%"
                    glossy
                    type="submit"
                    label="Schicht neu anlegen"
                    color="positive"
                    no-caps
                  />
                </div>
              </div>
            </q-card-actions>
          </q-card>
        </q-form>
        <!-- Für Form Validation Tests statt q-dialog -->
      </div>
    </q-dialog>
  </div>
  <div v-else>
    <p>
      <br />
      Das Baueigenschaftsprofilformular "Bodenaufbau" kann für die links im
      Bauvorhabenbaum ausgewählte Baueinheit
      <b>"{{ currentlySelectedNode.baueinheitsBezeichnung }}"</b>
      nicht angezeigt werden. Bitte überprüfen Sie:
    </p>
    <p>
      1. An der links im Bauvorhabenbaum <b>ausgewählten Baueinheit</b> muss das
      <b>Baueigenschaftsprofil "Baueinheit > Bodenaufbau"</b> aktiviert sein.
      <br />
      2. An allen <b>Kindbaueinheiten</b> der ausgewählten Baueinheit muss
      jeweils das <b>Baueigenschaftsprofil "Baueinheit > Schicht"</b> aktiviert
      sein.
    </p>
  </div>
</template>
<!-- ***===================================================================================================================================== -->
<script>
//================================================================================================================================================================
import BaueinheitSchichtBaueigenschaftsProfilFormular from "../components/baueinheit-schicht-baueigenschafts-profil-formular"; // NEU: Spezifisches Baueigenschaftsprofilformular für Schicht
// import BodenaufbauFormular from "../components/bodenaufbau-development-version.vue"; // NEU: Spezifisches Baueigenschaftsprofilformular für Schicht
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import layoutBodenaufbau from "../modules/layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.js";
import { date } from "quasar";
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  components: {
    // Komponenten für Baueigenschaftsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    // uebersichtTabBaueigenschaftsProfile,
    // detailsTabBaueigenschaftsProfil // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Baueigenschaftsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    "einzel-schicht": BaueinheitSchichtBaueigenschaftsProfilFormular
    // "boden-aufbau": BodenaufbauFormular
  },
  //-----------------------------------------------------------------------------------------------------------------
  props: [
    "treeNodes",
    "currentlySelectedNode",
    "benutzerDarfBearbeitenSelectedNode",
    "idCurrentlySelectedSchicht"
  ], // Boolean, wird in aufrufender Komponente ausgewertet und der Komponente übergeben, für Disabling/Enabling von Feldern],

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      // NEU: Custom-Farben der Input-Felder von Istwerten:
      customBackgroundColorIstWerteFelder: "teal-2",
      customStandoutColorIstWerteFelder: "bg-teal-4 text-black",
      mountedDone: false,
      benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt: false, // Merker für Fehlermeldung, wenn Profilformular nicht gerendert werden kann
      zuLoeschenderNodeTreeBaueinheiten: null, // NEU: Node für Löschen einer Schicht
      deleteSchichtDialog: false, // NEU: Dialog für Löschen einer Schicht
      // Hier TODOD #364: Die Zuordnung einer Schicht zu einem Schichtpaket wird neuerdings nicht mehr direkt aus dem Schichttyp bestimmt, sondern kann
      // vom Benutzer in einem neuen Aufzählungswert gesetzt werden: "Baueinheit > Schicht > Zuordnung > Schichtpaket"
      // Die 3 Arrays hier dürfen daher nicht mehr aus dem Schichttyp statisch gesetzt werden, sondern es müssen jeweils die Schichten in den passenden Array gepushed werden,
      // deren Aufzählungswert für das Schichtpaket den Wert "Bodenunterseite", "Rohboden" bzw."Bodenoberseite" hat
      elementeSchichtpaketBodenunterseite: [
        "Unterdecke",
        "Unterboden",
        "Deckenbekleidung",
        "Hohlraum"
      ], // DONE #302 - "Unterboden" dazugenommen, temporär wird auch "Unterdecke" noch akzeptiert
      elementeSchichtpaketRohboden: [
        "Rohdecke",
        "Rohboden",
        "Abdeckplatte",
        "Dielenboden",
        "Holzbalkendecke"
      ], // DONE #302 - "Rohboden" dazugenommen, temporär wird auch "Rohdecke" noch akzeptiert
      elementeSchichtpaketBodenoberseite: [
        "Bodenbelag",
        "Kleber",
        "Grundierung",
        "Bodenausgleichsmasse",
        "Estrich",
        "Trennlage",
        "Trennschicht", // Wird vorläufig auch noch akzeptiert
        "Abdichtung",
        "Trittschalldämmung",
        "Wärmedämmung",
        "Dichtschlämme",
        "Ausgleichsschüttung"
      ],
      localStore: globalStore,
      voraussetzungenZurAnzeigeErfuellt: false,
      useSchichtComponent: true,
      bezeichnungNeueSchicht: null,
      showCreateSchichtDialog: false,
      debugMode: false,
      showComponent: true,
      showDialog: false,
      selectedSchicht: null,
      myDatenstrukturVererbung: null,
      alleSchichtknoten: [],
      gesamtschichtKnoten: null,
      // Die folgenden 3 Variablen von @ms umbenannt am 23.06.2021, im Rahmen von #292
      mapBaueigenschaftenGesamtschichtaufbau: null, // Map (mit baueigenschaftsBezeichnung als Key) über die Baueigenschaften des Gesamtschichtaufbaus
      mapRelevanteBaueigenschaftenEinzelschichten: null, // Map (mit baueigenschaftsBezeichnung als Key) über die relevanten Baueigenschaften einer Einzelschicht
      mapBaueigenschaftenLayoutFile: null, // Map (mit baueigenschaftsBezeichnung als Key) über die Baueigenschaften im Layout File
      // mapComputedGesamtschichteigenschaften: null, // Wird nicht verwendet!!! Disabled @ms 23.06.2021
      reverseMapBaueigenschaftenGesamtschichtaufbau: {},
      reverseMapBaueigenschaftenEinzelschicht: {}, // Von @ms umbenannt am 23.06.2021, im Rahmen von #292, hieß vorher reverseMapBaueigenschaften
      eigenschaftenGesamtschichtaufbau: null,
      eigenschaftenEinzelschicht: null,
      profilGesamtschichtaufbau: null,
      profilEinzelschicht: null,
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      //===========================================================================================================================
      // Kopierte Data aus bodenaufbau-development-version
      layoutBaueigenschaftsProfilFormular: layoutBodenaufbau, // Array für die Speicherung von Layout-Information für
      // das spezifische Baueigenschaftsprofilformular, wird in mounted() initialisiert
      // profilBezeichnung: "Bodenaufbau (NEU)", // ALT - Wird als Prop für aufgerufene Komponente benutzt und als Parameter für Axios-Request
      profilBezeichnung: "Baueinheit > Bodenaufbau", // NEU - Wird als Prop für aufgerufene Komponente benutzt und als Parameter für Axios-Request      mountedDone: false,
      profilModelAusgewaehlterKnoten: null, // Array für die Speicherung aller im Profilformular enthaltenen Baueigenschaften, mit deren aktuellen Werten (am ausgewählten Knoten)
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      selectedNodeArbeitskopie: null,
      zuFormularGehoerigesProfil: null,
      eigenschaftenAusEltern: null,
      alleBaueigenschaftsProfile: [],
      displayCheckMark: function(val) {
        //--------------------------------------------------------------------------------------------------------------------
        // Helper function for Boolean val to display checkmarks instead of "true" or "false"
        // Wird aktuell nicht mehr benutzt, stattdessen werden Quasar QCheckboxes benutzt.
        // Diese triggern allerdings eine etwas größere Zeilenhöhe (unschön) - daher doch wieder displayCheckMark() verwendet
        //--------------------------------------------------------------------------------------------------------------------
        if (val) {
          // return "\u2611";  // Unicode ballot box with check
          return "\u2705"; // Unicode white heavy check mark
        } else {
          // return "\u2610"; // Unicode ballot box unchecked
          // return "\u2612"; // Unicode ballot box with cross
          return "\u274C"; // Unicode cross mark
        }
      }
    };
  },

  //==============================================================================================================================================
  methods: {

    initializeIstwerteMitSollwerten: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // NEU: Initialisierungsfunktion für Istwerte mit Sollwerten
      // NEU: Bisher nur für Raumnutzungsprofil des Nachbarraums (#387)
      // Aufruf aus mounted, reset, refresh
      // Nur wenn die Istwerte am Raum null sind, werden sie mit ihren paarigen Sollwerten aus dem Geschoss initialisiert
      // NEU: Farbliche Kennzeichnung der initialisierten Istwerte, über Variablen
      //      customBackgroundColorIstWerteFelder: "teal-2", // Default Color, wie für normale Input-Felder
      //      customStandoutColorIstWerteFelder: "bg-teal-4 text-black", // Default Color, wie für normale Input-Felder
      //      customBackgroundColorIstWerteFelder: "purple-2", // Custom Color für Input-Feld für mit Sollwert initialisiertem Istwert
      //      customStandoutColorIstWerteFelder: "bg-purple-4 text-black", // Custom Color für Input-Feld für mit Sollwert initialisiertem Istwert
      // NEU: Benutzernachricht mit Hinweis, dass Istwerte mit Sollwerten initialisiert wurden
      console.log("In initializeIstwerteMitSollwerten()");
      let showSollWertInitialisierungsBenutzerNachricht = false; // Zur Steuerung der Benutzernachricht mit Hinweis
      if (
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
            .baueigenschaftenInRubrik[2]
            .indexInProfilModelAusgewaehlterKnoten
        ].aufzaehlungsWert == null // Raumnutzungsprofil des Nachbarraums (Istwert)
      ) {
        console.log("Null-Istwert entdeckt, vor $set mit Sollwert)");
        /*
        console.log(
          "Zuzuweisender Wert: ",
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
              .baueigenschaftenInRubrik[2]
              .indexInProfilModelAusgewaehlterKnoten
          ].aufzaehlungsWert
        );
        */
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
              .baueigenschaftenInRubrik[2]
              .indexInProfilModelAusgewaehlterKnoten
          ],
          "aufzaehlungsWert",
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
              .baueigenschaftenInRubrik[1]
              .indexInProfilModelAusgewaehlterKnoten
          ].aufzaehlungsWert
        ); // Sollwert
      }
      //----------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Mit Sollwert initialisiertes Input-Feld Istwert farblich kennzeichnen:
      this.customBackgroundColorIstWerteFelder = "purple-2"; // Custom Color für Input-Feld für mit Sollwert initialisiertem Istwert
      this.customStandoutColorIstWerteFelder = "bg-purple-4 text-black"; // Custom Color für Input-Feld für mit Sollwert initialisiertem Istwert
      // showSollWertInitialisierungsBenutzerNachricht = true;
      //----------------------------------------------------------------------------------------------------------------------------------------
      if (showSollWertInitialisierungsBenutzerNachricht) {
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_ISTWERTE_MIT_SOLLWERTEN_INITIALISIERT
        );
      }
    },

    handleUpdateValueBaueigenschaftKennwert1(value, eigenschaft, schicht) {
      //-----------------------------------------------------------------------------------------------------------------
      console.log(
        "In handleUpdateValueBaueigenschaftKennwert1 mit value",
        value,
        eigenschaft,
        schicht
      );
      this.mapRelevanteBaueigenschaftenEinzelschichten[schicht._id][
        eigenschaft.typbezogeneBaueigenschaft._id
      ].eigenschaft.kennWert1 = value;
    },

    handleUpdateValueBaueigenschaftAufzaehlungswert(
      //-----------------------------------------------------------------------------------------------------------------
      value,
      eigenschaft,
      schicht
    ) {
      console.log(
        "In handleUpdateValueBaueigenschaftAufzaehlungswert mit value",
        value,
        eigenschaft,
        schicht
      );
      console.log(
        "Vorher:",
        this.mapRelevanteBaueigenschaftenEinzelschichten[schicht._id][
          eigenschaft.typbezogeneBaueigenschaft._id
        ].eigenschaft.aufzaehlungsWert
      );
      this.mapRelevanteBaueigenschaftenEinzelschichten[schicht._id][
        eigenschaft.typbezogeneBaueigenschaft._id
      ].eigenschaft.aufzaehlungsWert = value;
      console.log(
        "Nachher:",
        this.mapRelevanteBaueigenschaftenEinzelschichten[schicht._id][
          eigenschaft.typbezogeneBaueigenschaft._id
        ].eigenschaft.aufzaehlungsWert
      );
    },

    buildReverseMapBaueigenschaftenEinzelschicht() {
      //-----------------------------------------------------------------------------------------------------------------
      // Returned ein Objekt, dessen Properties die Bezeichnungen der Baueigenschaften im Profil Schicht sind
      // und dessen Werte die jeweiligen typbezogenen Ids sind
      // Funktion umbenannt im Rahmen von #292 von @ms, hieß ursprünglich buildReverseMapBaueigenschaften()

      this.reverseMapBaueigenschaftenEinzelschicht = {};
      for (var eigenschaft of this.profilEinzelschicht
        .zugeordneteBaueigenschaften) {
        this.reverseMapBaueigenschaftenEinzelschicht[
          eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        ] = eigenschaft.typbezogeneBaueigenschaft._id;
      }
    },

    buildReverseMapBaueigenschaftenGesamtschichtaufbau(profilMitEigenschaften) {
      //-----------------------------------------------------------------------------------------------------------------
      // Returned ein Objekt, dessen Properties die Bezeichnungen der Baueigenschaften im Profil Bodenaufbau sind
      // und dessen Werte die jeweiligen typbezogenen Ids sind
      var result = {};
      for (var eigenschaft of profilMitEigenschaften.zugeordneteBaueigenschaften) {
        result[
          eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        ] = eigenschaft.typbezogeneBaueigenschaft._id;
      }
      return result;
    },

    buildBaueigenschaftenAnBaueinheitAusProfilMap(arg) {
      //-----------------------------------------------------------------------------------------------------------------
      this.reverseMapBaueigenschaftenEinzelschicht = {};
      for (var eigenschaft of arg.zugeordneteBaueigenschaften) {
        this.reverseMapBaueigenschaftenEinzelschicht[
          eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        ] = eigenschaft.typbezogeneBaueigenschaft._id;
      }
    },

    pruefeVoraussetzungen() {
      //-----------------------------------------------------------------------------------------------------------------
      // Prüft, ob die Voraussetzungen für einen Schichtaufbau gegeben sind:
      // Schichtaufbau-Profil aktiviert (bzw. alle Eigenschaften darin)
      // Schicht-Profil an allen Kindern aktiviert (bzw. alle Eigenschaften darin)
      if (
        this.currentlySelectedNode.verzweigungsTyp !==
        "vertikal angeordnete Aggregation"
      ) {
        console.log("Falscher Knotentyp");
      }
      if (
        // ALT: Finde Index in Array of _ids_:
        // this.currentlySelectedNode.zugeordneteBaueigenschaftsProfile.find(arg => arg === this.profilGesamtschichtaufbau._id)
        // NEU: Finde Index in populiertem Array of Objects {_id, baueigenschaftsProfilBezeichnung}:
        // ALT: find(arg => arg._id === this.profilGesamtschichtaufbau._id)
        // NEU - für #272/#505:
        this.currentlySelectedNode.zugeordneteBaueigenschaftsProfile.find(
          arg =>
            arg.referenzAufBaueigenschaftsProfil._id ===
            this.zuFormularGehoerigesProfil._id
        )
        // Siehe https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
      ) {
        if (this.currentlySelectedNode.children !== undefined) {
          // Prüfung auf null und auf undefined
          for (var child of this.currentlySelectedNode.children) {
            if (
              // ALT: Finde Index in Array of _ids_:
              // child.zugeordneteBaueigenschaftsProfile.find(arg => arg === this.profilEinzelschicht._id)
              // NEU: Finde Index in populiertem Array of Objects {_id, baueigenschaftsProfilBezeichnung}:
              // ALT: find(arg => arg._id === this.profilEinzelschicht._id)
              // NEU - für #272/#505:
              child.zugeordneteBaueigenschaftsProfile.find(
                arg =>
                  arg.referenzAufBaueigenschaftsProfil._id ===
                  this.profilEinzelschicht._id
              )
              // Siehe https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
            ) {
            } else {
              console.log(
                "Profil Einzelschicht ist in einem Kindknoten nicht aktiviert"
              );
              return false;
            }
          }
        } else {
          if (this.currentlySelectedNode.baumKnotenTyp === "Blattknoten") {
            return true;
          } else {
            console.log("Kindknoten sind noch nicht geladen");
            return false; // Kinder sind noch nicht
          }
        }
        return true;
      } else {
        console.log(
          `Profil ${this.zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung} ist nicht aktiviert`
        );
        return false;
      }
    },

    convertArray2Object(arg) {
      //-----------------------------------------------------------------------------------------------------------------
      var target = {};
      arg.forEach(i => {
        target[i.typbezogeneBaueigenschaft._id] = i;
        return 0;
      });
      return target;
    },

    modifySelectedSchicht() {
      //-----------------------------------------------------------------------------------------------------------------
      this.showDialog = false;
      console.log("In modifySelectedSchicht");
      this.$emit("change-tab-request", this.selectedSchicht);
    },

    orderSchichtknoten() {
      //-----------------------------------------------------------------------------------------------------------------
      var eigenschaftSchichtIndex = {};
      for (var schicht of this.alleSchichtknoten) {
        for (var eigenschaft of schicht.projizierteBaueigenschaften) {
          // console.log(eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung)
          if (
            eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            "Baueinheit > Schicht > Zuordnung > Schichtaufbau > Index"
          ) {
            eigenschaftSchichtIndex[schicht._id] = eigenschaft;
            // schicht.indexInAggregationsknoten = eigenschaft.kennWert1
          }
        }
      }
      // console.log("eigenschaftSchichtIndex:", eigenschaftSchichtIndex)
      // Vor 27.10.20: var sortedArray = this.alleSchichtknoten.sort((a, b) => eigenschaftSchichtIndex[a._id].kennWert1 - eigenschaftSchichtIndex[b._id].kennWert1)
      // Seit 27.10.20:
      var sortedArray = this.alleSchichtknoten.sort(
        (a, b) => a.indexInAggregationsknoten - b.indexInAggregationsknoten
      );
      // console.log("SortedArray:", sortedArray)
      for (var i = 0; i < sortedArray.length; i++) {
        schicht = sortedArray[i];
        // schicht.indexInAggregationsknoten = i
        for (eigenschaft of schicht.projizierteBaueigenschaften) {
          if (
            eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
            "Baueinheit > Schicht > Zuordnung > Schichtaufbau > Index"
          ) {
            // console.log(schicht.baueinheitsBezeichnung, eigenschaft.kennWert1)
          }
        }
      }
    },

    callBackUpdateSelectedSchicht(idSelectedSchichtAfterReload) {
      // Callback-Funktion für #394, damit die ausgewählte Schicht nach Moven von Schichten nach dem Refresh korrekt gesetzt wird
      console.log("In callBackUpdateSelectedSchicht");
      console.log("this.alleSchichtknoten", this.alleSchichtknoten);
      this.selectedSchicht = this.alleSchichtknoten.find(
        i => i._id === idSelectedSchichtAfterReload
      );
      console.log("selectedSchicht changed", this.selectedSchicht);
    },

    updateGesamtschichtaufbau(doRefresh = true) {
      //----------------------------------------------------------------------------------------------------------------------------------
      // Schicke bisher eingegebenen Werte in den Profilformularen für "Bodenaufbau" und "Schicht(en) an das Backend
      //----------------------------------------------------------------------------------------------------------------------------------
      // Pruefe Definiertheit aller Eigenschaften
      for (var s of this.alleSchichtknoten) {
        var eigenschaftenAusSchicht = Object.values(
          this.mapRelevanteBaueigenschaftenEinzelschichten[s._id]
        ).map(arg => arg.eigenschaft);
        for (var e of eigenschaftenAusSchicht) {
          e.definiertNichtUndefiniert = this.pruefeDefiniertheitVonEigenschaft(
            e
          );
        }
        // Setze die Werte aus der Map an die passende Stelle im Schichtknoten-Objekt
        s.projizierteBaueigenschaften = Object.values(
          this.mapRelevanteBaueigenschaftenEinzelschichten[s._id]
        ).map(arg => arg.eigenschaft);
      }
      return this.$axios
        .put(process.env.API + "/Baueinheiten/Schichtaufbau/update", {
          alleSchichten: this.alleSchichtknoten
        })
        .then(success => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
          );
          // NEU: Auch die den Gesamt-Bodenaufbau betreffenden Felder speichern per separatem API-Call über Methode submitWerteAnBaueinheit()
          // TODO: Dies in ein API zusammenführen (Transaktionalität)
          return this.submitWerteAnBaueinheit(null, true);
          // this.$emit("refresh-request-baueigenschafts-profil");
        })
        .then(success => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
          );
          // TODO XXXXXX #286: Selektierte Schicht bei Refresh nicht verlieren!
          // ALT:
          /*
          if (doRefresh) {
            this.$emit("refresh-request-baueigenschafts-profil");
          }
          */
          // NEU: Gegen Problem #394
          if (this.selectedSchicht) {
          this.$emit("refresh-request-with-callback-for-selected-schicht", { callBack: this.callBackUpdateSelectedSchicht, idSelectedSchicht: this.selectedSchicht._id })
          } else {
            this.$emit("refresh-request-baueigenschafts-profil"); // Wenn keine Schicht ausgewählt war, wie bisher refreshen
          }
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
          );
          // TODO XXXXXX #286: Selektierte Schicht bei Refresh nicht verlieren!
          if (doRefresh) {
            this.$emit("refresh-request-baueigenschafts-profil");
          }
        });
    },

    setzeBerechneteWerteGesamtschichtaufbau() {
      //---------------------------------------------------------------------------------------------------------------------------------------------------------
      // Speichert die berechneten Eigenschaften in den entsprechenden Baueigenschaften im Baueinheitsobjekt der Gesamtschicht
      // Anders ausgedrückt: Die computed Property Values werden in den passenden Eigenschaften der Baueinheit mit aktiviertem Profil "Baueinheit > Bodenaufbau" abgespeichert
      console.log("In setzeBerechneteWerteGesamtschichtaufbau");
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Geometrie > Bodenunterseite > Dicke" // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Unterdecke > Bekleidung > Höhe > Istwert" // ALT
          ]
      ).kennWert1 = this.dickeBodenunterseiteBerechnet;
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Aufbauhöhe" // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Oberboden > Aufbauhöhe > Istwert" // ALT
          ]
      ).kennWert1 = this.aufbauhoeheFertigbodenBerechnet;
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Geometrie > Rohboden > Dicke" // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Rohdecke > Höhe > Istwert" // ALT
          ]
      ).kennWert1 = this.dickeRohbodenBerechnet;
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Geometrie > Gesamtdicke" // NEU: #286/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Gesamthöhe > Istwert" // ALT
          ]
      ).kennWert1 = this.gesamtdickeBodenBerechnet;
      //--------------------------------------------------------------------------------------------
      // NEU: Rsi und Rse als computed-Felder dazugenommen:
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Intern"
          ]
      ).kennWert1 = this.internerWaermeuebergangswiderstandBerechnet;
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Extern"
          ]
      ).kennWert1 = this.externerWaermeuebergangswiderstandBerechnet;
      //--------------------------------------------------------------------------------------------
      // NEU: Wärmedurchlasswiderstand und Wärmedurchgangskoeffizient als computed-Felder dazugenommen:
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
          ]
      ).kennWert1 = this.waermedurchlasswiderstandBerechnet;
      this.profilModelAusgewaehlterKnoten.find(
        i =>
          i.idTypbezogeneBaueigenschaft ===
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert"
          ]
      ).kennWert1 = this.waermedurchgangskoeffizientBerechnet;
    },

    aktiviereProfilAnKindern(idProfil) {
      //-----------------------------------------------------------------------------------------------------------------

      for (var schicht of this.alleSchichtknoten) {
        this.$axios
          .put(
            process.env.API +
              "/Baueinheiten/" +
              schicht._id +
              "/Baueigenschaftsprofil/Aktivierungszustand",
            {
              idProfil: idProfil,
              aktivierenNichtDeaktivieren: true
            }
          )
          .then(doc => {
            console.log("Nach Modifizierung", doc);
          });
      }
    },

    getChildrenOfCurrentNode() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In getChildrenOfCurrentNode())");
      if (this.currentlySelectedNode.children === undefined) {
        console.log("Kinder wurden noch nicht geladen");
        this.$emit("loadChildrenRequest");
        return;
      }
      if (this.currentlySelectedNode.children === []) {
        console.log("Keine Kinder vorhanden");
      } else {
        var tmpListeKindknoten = this.currentlySelectedNode.children;
        // Erstelle Kopie aller Knoten:
        for (var i = 0; i < tmpListeKindknoten.length; i++) {
          // Stand vor Kopie-Erstellung
          this.alleSchichtknoten.push({
            ...tmpListeKindknoten[i],
            projizierteBaueigenschaften: this.projiziereBaueigenschaftenInBaueinheitAufProfilMitReturnWert(
              tmpListeKindknoten[i],
              this.profilEinzelschicht
            )
          });
        }
        this.orderSchichtknoten();
        console.log(
          "Kinder:",
          this.currentlySelectedNode.children.map(
            arg => arg.baueinheitsBezeichnung
          )
        );
        console.log("alleSchichknoten: ", this.alleSchichtknoten);
      }
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
      var datenstrukturVererbung = []; // Enthält für jede der zu untersuchenden Baueigenschaften die erste definierte Eigenschaft auf dem Pfad
      var idCurrentNode = currentNode._id;
      var pathCurrentNode = currentNode.path.split("#");
      for (var aktuellBetrachteteBaueigenschaft of zuUntersuchendeBaueigenschaften) {
        // Suche die definierten Werte der aktuell betrachteten Baueigenschaften im Elternpfad heraus
        // (jeweils die obersten definierten Werte im Pfad)
        var node_i = rootNode; // Knoten im Pfad
        var hierarchyIndex = 0;
        var vererbungsInformation = {
          baueigenschaft:
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
      // Baueinheitsbezeichnungen ausgeben, an denen die Baueigenschaft erstmalig definiert ist:
      this.myDatenstrukturVererbung = datenstrukturVererbung
        .filter(
          arg => arg.bezeichnungWerteVererbenderElternknoten !== undefined
        )
        .map(arg => {
          return (
            arg.bezeichnungWerteVererbenderElternknoten
              .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung +
            " in " +
            arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
          );
        });
      //----------------------------------------------------------------------------------------------------------------
      // Nun obige Information zurückgeben, aber ohne den Filter:
      var result = datenstrukturVererbung.map(arg => {
        return {
          idTypbezogeneBaueigenschaft: arg.idTypbezogeneBaueigenschaft,
          baueigenschaftsBezeichnung: arg.baueigenschaftsBezeichnung,
          bezeichnungWerteVererbenderElternknoten:
            arg.werteVererbenderElternKnoten !== undefined
              ? arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
              : null
        };
      });
      return result;
    },

    projiziereBaueigenschaftenAnBaueinheitAufProfil(baueinheit, profil) {
      //==================================================================================================
      // ACHTUNG: Von dieser Funktion existieren hier 2 Varianten!!!
      // Diese hier ändert profilModelAusgewaehlterKnoten, ohne return-Wert
      //==================================================================================================
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Sucht die Eigenschaften aus dem Profil an der Baueinheit und erzeugt erstmalig den Array profilModelAusgewaehlterKnoten,
      // welcher die Baueigenschaften mit ihren Werten enthält. Später wird dazu noch zusätzliche Vererbungsinformation hinzugefügt.
      var idsTypbezogeneBaueigenschaften = profil.zugeordneteBaueigenschaften.map(
        arg => arg.typbezogeneBaueigenschaft._id
      );
      // Finde die Eigenschaften des Profils in der Baueinheit (d.h. Änderungen werden am Orginal-Objekt gemacht)
      var projizierteBaueigenschaftenAnBaueinheit = baueinheit.baueigenschaften.filter(
        i =>
          idsTypbezogeneBaueigenschaften.findIndex(
            ii => i.typbezogeneBaueigenschaft._id === ii
          ) > -1
      );
      console.log(
        "projizierteBaueigenschaftenAnBaueinheit: ",
        projizierteBaueigenschaftenAnBaueinheit
      );
      // Erstelle Arbeitskopien der Elemente im Array
      var kopierteProjizierteBaueigenschaftenAnBaueinheit = projizierteBaueigenschaftenAnBaueinheit.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      this.profilModelAusgewaehlterKnoten = kopierteProjizierteBaueigenschaftenAnBaueinheit;
      // return kopierteProjizierteBaueigenschaftenAnBaueinheit;
    },

    projiziereBaueigenschaftenInBaueinheitAufProfilMitReturnWert(
      baueinheit,
      profil
    ) {
      //==================================================================================================
      // ACHTUNG: Von dieser Funktion existieren hier 2 Varianten!!!
      // Diese arbeitet mit einem return-Wert
      //==================================================================================================
      //-----------------------------------------------------------------------------------------------------------------
      // Sucht die Eigenschaften aus dem Profil in der Baueinheit und gibt einen Array dieser Eigenschaften zurück
      var idsTypbezogeneBaueigenschaften = profil.zugeordneteBaueigenschaften.map(
        arg => arg.typbezogeneBaueigenschaft._id
      );
      var projizierteBaueigenschaftenAusBaueinheit = baueinheit.baueigenschaften.filter(
        i =>
          idsTypbezogeneBaueigenschaften.findIndex(
            ii => i.typbezogeneBaueigenschaft._id === ii
          ) > -1
      );
      var kopieProjizierteBaueigenschaftenAusBaueinheit = this.erstelleKopieVonArray(
        projizierteBaueigenschaftenAusBaueinheit
      );
      // this.myWertbezogenBueigenschaftenArray = projizierteBaueigenschaftenAusBaueinheit;
      return kopieProjizierteBaueigenschaftenAusBaueinheit;
    },

    erstelleKopieVonArray(array) {
      var arrayCopy = Object.assign([], array);
      for (var i = 0; i < array.length; i++) {
        var el = Object.assign({}, arrayCopy[i]);
        arrayCopy[i] = el;
      }
      return arrayCopy;
    },

    erstelleDatenstrukturen(
      //-----------------------------------------------------------------------------------------------------------------
      aggregationsknoten,
      schichtknoten,
      profilGesamtschichtaufbau,
      profilEinzelschichtaufbau
    ) {
      console.log("In erstelleDatenstrukturen()");
      // Suche in jeder Einzelschicht die passenden Eigenschaften raus und speichere einen Verweis auf sie
      // Suche aus dem Aggregationsknoten die passenden Eigenschaften raus und speichere einen Verweis auf sie
      var indexMapBaueigenschaftenGesamtschichtaufbau = {}; // Hält einen Verweis für jede Eigenschaft im Schichtaufbau auf eine Liste der Eigenschaften in den einzelnen Schichten
      var indexMapRelevanteBaueigenschaftenEinzelschicht = {}; // Hält einen Verweis für die relevanten Eigenschaften für den Schichtaufbau für jede einzelne Schicht (d.h. ein Extrakt von allen Baueigenschaften)
      for (var j = 0; j < schichtknoten.length; j++) {
        indexMapRelevanteBaueigenschaftenEinzelschicht[
          schichtknoten[j]._id
        ] = {}; // Vor 21.10.2020: []; seitdem: {}
      }
      console.log(
        profilEinzelschichtaufbau.zugeordneteBaueigenschaften.length,
        schichtknoten.length
      );
      for (
        var i = 0;
        i < profilEinzelschichtaufbau.zugeordneteBaueigenschaften.length;
        i++
      ) {
        var eigenschaftImEinzelschichtaufbau =
          profilEinzelschichtaufbau.zugeordneteBaueigenschaften[i];
        indexMapBaueigenschaftenGesamtschichtaufbau[
          eigenschaftImEinzelschichtaufbau.typbezogeneBaueigenschaft._id
        ] = {
          arrayVerweise: [],
          verweisTypbezogeneBaueigenschaft:
            eigenschaftImEinzelschichtaufbau.typbezogeneBaueigenschaft
              .baueigenschaftsBezeichnung
        };
        for (var ii = 0; ii < schichtknoten.length; ii++) {
          var eigenschaftInAktuellemSchichtknoten = schichtknoten[
            ii
          ].projizierteBaueigenschaften.find(
            // Vor 02.11.2020: baueigenschaften.find
            arg =>
              arg.typbezogeneBaueigenschaft._id === // Bug-Fix 21.10.2020: Hier stand nur arg.typbezogeneBaueigenschaft
              eigenschaftImEinzelschichtaufbau.typbezogeneBaueigenschaft._id
          );
          // Eigenschaft muss vorhanden sein, da alle Eigenschaften immer an jedem Knoten vorhanden sind
          indexMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaftImEinzelschichtaufbau.typbezogeneBaueigenschaft._id
          ].arrayVerweise.push(eigenschaftInAktuellemSchichtknoten);
          // Alter Stand mit Array der Eigenschaften:
          /*
          indexMapRelevanteBaueigenschaftenEinzelschicht[
            schichtknoten[ii]._id
          ].push({
            eigenschaft: eigenschaftInAktuellemSchichtknoten,
            verweisTypbezogeneBaueigenschaft: eigenschaftImEinzelschichtaufbau
          });
          */
          // Neu: Mit Javascript-Objekt mit Zugriff über typbezogeneBaueigenschaft._id
          indexMapRelevanteBaueigenschaftenEinzelschicht[schichtknoten[ii]._id][
            eigenschaftInAktuellemSchichtknoten.typbezogeneBaueigenschaft._id
          ] = {
            eigenschaft: eigenschaftInAktuellemSchichtknoten,
            verweisTypbezogeneBaueigenschaft: eigenschaftImEinzelschichtaufbau
          };
        }
        this.mapBaueigenschaftenGesamtschichtaufbau = indexMapBaueigenschaftenGesamtschichtaufbau;
        this.mapRelevanteBaueigenschaftenEinzelschichten = indexMapRelevanteBaueigenschaftenEinzelschicht;
        // Für weitere Verwendung benötigt:
      }
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------
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
          this.zuFormularGehoerigesProfil = doc.data[0];
          this.reverseMapBaueigenschaftenGesamtschichtaufbau = this.buildReverseMapBaueigenschaftenGesamtschichtaufbau(
            this.zuFormularGehoerigesProfil
          );
        })
        .catch(error => {
          console.log("error: ", error);
          /*
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER
          );
          */
        });
    },

    readProfilEinzelschicht() {
      //-----------------------------------------------------------------------------------------------------------------
      var p2 = this.$axios
        .get(
          process.env.API +
            // "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung=Schicht" // ALT
            "/Baueigenschaftsprofile/Query?baueigenschaftsProfilBezeichnung=Baueinheit%20>%20Schicht" // NEU - #375: Neue Profilbezeichnung!
        )
        .then(doc => {
          var bezeichnungenEigenschaftenImProfil = doc.data[0].zugeordneteBaueigenschaften.map(
            arg => arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
          );
          console.log(bezeichnungenEigenschaftenImProfil);
          this.profilEinzelschicht = doc.data[0];
          this.buildReverseMapBaueigenschaftenEinzelschicht();
        });
      return Promise.all([p2]); // p1
    },

    swapSchichtposition(modus) {
      //-----------------------------------------------------------------------------------------------------------------
      if (modus === "up") {
        var indexCurrentlySelectedSchicht = this.alleSchichtknoten.findIndex(
          arg => arg._id === this.selectedSchicht._id
        );
        console.log("indexCurrentlySelectedSchicht: ", indexCurrentlySelectedSchicht)
        if (indexCurrentlySelectedSchicht > 0) {
          // var indexEigenschaftSelectedSchicht = this.alleSchichtknoten[indexCurrentlySelectedSchicht].projizierteBaueigenschaften.find(arg => arg.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung === 'Schicht: Schichtindex im Schichtaufbau')
          var indexEigenschaftSelectedSchicht = this.alleSchichtknoten[
            indexCurrentlySelectedSchicht
          ].indexInAggregationsknoten;
          var tmpIndex = indexEigenschaftSelectedSchicht;
          var tmp = this.alleSchichtknoten.splice(
            indexCurrentlySelectedSchicht - 1,
            1
          );
          this.alleSchichtknoten.splice(
            indexCurrentlySelectedSchicht,
            0,
            tmp[0]
          );
          this.selectedSchicht.indexInAggregationsknoten =
            tmp[0].indexInAggregationsknoten;
          tmp[0].indexInAggregationsknoten = tmpIndex;
        }
        console.log("index:", indexCurrentlySelectedSchicht);
      } else if (modus === "down") {
        console.log("In swap down");
        indexCurrentlySelectedSchicht = this.alleSchichtknoten.findIndex(
          arg => arg._id === this.selectedSchicht._id
        );
        if (indexCurrentlySelectedSchicht < this.alleSchichtknoten.length - 1) {
          indexEigenschaftSelectedSchicht = this.alleSchichtknoten[
            indexCurrentlySelectedSchicht
          ].indexInAggregationsknoten;
          tmpIndex = indexEigenschaftSelectedSchicht;
          tmp = this.alleSchichtknoten.splice(
            indexCurrentlySelectedSchicht + 1,
            1
          );
          this.alleSchichtknoten.splice(
            indexCurrentlySelectedSchicht - 1,
            0,
            tmp[0]
          );
          this.selectedSchicht.indexInAggregationsknoten =
            tmp[0].indexInAggregationsknoten;
          tmp[0].indexInAggregationsknoten = tmpIndex;
        } else {
          new Error("Kein Modus im Swap angegeben");
        }
        console.log("index:", indexCurrentlySelectedSchicht);
      }
      this.orderSchichtknoten();
    },

    createMapEigenschaftenInLayoutFile() {
      //-----------------------------------------------------------------------------------------------------------------
      // Geklaut aus: https://stackoverflow.com/questions/33679850/how-to-do-equivalent-of-linq-selectmany-just-in-javascript
      function property(key) {
        return function(x) {
          return x[key];
        };
      }
      function flatten(a, b) {
        return a.concat(b);
      }
      // Ein nested-Array wird mittels dieser Methode flach gemacht, d.h.
      // result = []
      // myArray = [{a: [x,y,z]}, {a: [v,w]}]
      // wird mittels myArray.map(property('a')).reduce(result, []) zu:
      // result = [x, y, z, v, w]
      var alleRubriken = this.layoutBaueigenschaftsProfilFormular
        .map(property("rubrikenInTab"))
        .reduce(flatten, []);
      var listeAllerBaueigenschaftenImLayoutFile = alleRubriken
        .map(property("baueigenschaftenInRubrik"))
        .reduce(flatten, []);
      console.log(alleRubriken);
      console.log(listeAllerBaueigenschaftenImLayoutFile);
      return listeAllerBaueigenschaftenImLayoutFile;
    },

    async deleteSchicht(node) {
      //-----------------------------------------------------------------------------------------------------------------
      // DONE #282 (Stefan)
      // Neu implementiert:
      // - Lokaler Dialog deleteSchichtDialog, schon angelegt im Template, für Delete einer Schicht, der diese Methode
      //   hier triggert
      // - Die Methode macht folgendes:
      //   -- NEU: Parameter node, kann im Dialog aus Variable zuLoeschenderNodeTreeBaeinheiten entnommen werden
      //      Im Button für das Löschen einer Schicht wird der betreffende node für die Schicht dort zwischengespeichert
      //   -- NEU: Update Gesamtbodenaufbau in Datenbank
      //   -- NEU: Delete Schicht in Datenbank
      //   -- NEU: Anschließender Refresh auslösen in Elternkomponente
      //------------------------------------------------------------------------------------------------------------------
      console.log("In deleteSchicht()");
      if (node != null) {
        console.log(
          "Vor Löschen des Knotens node mit baueinheitsBezeichnung: " +
            node.baueinheitsBezeichnung
        );
        //============================================================================================================
        // NEU (DONE # 282): Vor dem Löschen den Bodenaufbau speichern, um pending Changes abzuspeichern:
        // Anschließend Refresh auslösen!
        //============================================================================================================
        await this.updateGesamtschichtaufbau(false);
        console.log("Nach updateGesamtschichtaufbau in Delete");
        // console.log("process.env.API: ", process.env.API);
        // NEU - https://quasar.dev/quasar-cli/cli-documentation/handling-process-env
        // process.env.API zeigt die URL des APIs an, abhängig davon, ob Dev oder Production Build
        var apiRoute = process.env.API + "/Baueinheiten/" + node._id;
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        // NEU: @MS - den folgenden Code disabled - unklar, warum hier Leave 'roomBauvorlagen' gemacht wird
        /*
        console.log("Vor Emit to leave room 'roomBauvorlagen'");
        this.$socket.emit("leaveRoom", {
          room: "roomBauvorlagen"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBauvorlagen'");
        */
        //=========================================================================================================================================
        this.$axios
          // Löschen des übergebenen Knotens mit allen Kindknoten!!!
          .delete(apiRoute)
          .then(response => {
            console.log(
              "In deleteSchicht() nach Delete für Baueinheit mit Kindern und Kindeskindern, response: ",
              response
            );
            this.deleteSchichtDialog = false;
            this.selectedSchicht = null; // Fix - @MS 02.02.2021
            //------------------------------------------------------------------------------------------------
            // delete this.$refs.treeBaueinheiten.lazy[parentId] // Resetten des Eintrags im Objekt lazy - hier disabled, unnötig
            // lazy: Von Quasar verwaltetes Objekt mit lazy loaded Nodes - Format: {"id1": "loaded", .. "idn": "loaded"}
            // HINWEIS: Es handelt sich bei lazy um ein JS Objekt, keinen Array
            // Zugriff auf ein Element darin mit this.$refs.treeBaueinheiten.lazy[id]
            // Resetten eines Elements darin mit delete this.$refs.treeBaueinheiten.lazy[id]
            //------------------------------------------------------------------------------------------------
            // NEU: Banner-Benutzernachricht im Footer per global Store und Enums:
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEINHEIT_LOESCHEN_ERFOLG
            );
            // NEU: Refresh Request emittieren:
            // this.$emit("refresh-request-baueigenschafts-profil"); // ALT - ursprünglicher Code, selber Refresh Request wie beim Speichern
            // NEU: Speziellen Refresh Request nach Delete emittieren, welcher vorläufig den nicht optimierten Refresh auslöst (wegen Problem #358)
            this.$emit("delete-refresh-request-baueigenschafts-profil");
            //------------------------------------------------------------------------------------------------
          })
          .catch(error => {
            console.log(
              "Fehler bei delete von Baueinheit mit id: ",
              this.selectedKeyTreeBaueinheiten
            );
            console.log("error:", error);
            this.deleteSchichtDialog = false;
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEINHEIT_LOESCHEN_FEHLER
            );
          });
      } else {
        console.log(
          "In deleteSchicht(): Keine Baueinheit übergeben - kein Löschen möglich"
        );
        this.deleteSchichtDialog = false;
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUEINHEIT_LOESCHEN_WARNUNG_KEINE_BAUEINHEIT_AUSGEWAEHLT
        );
      }
    },

    async createSchicht() {
      //----------------------------------------------------------------------------------------------------------------
      // DONE #282 (Stefan)
      // - Diese Methode wird getriggert durch lokalen Dialog (showCreateSchichtDialog)
      // - Die Methode musste etwas umgebaut werden:
      // -- NEU: Update Gesamtbodenaufbau in Datenbank
      // -- Schon vorhanden: Create Schicht in Datenbank
      // -- Schon vorhanden: Refresh auslösen in Elternkomponente
      // TODO XXXXXX: Diese Funktion ist in das Problem #358 involviert!
      //----------------------------------------------------------------------------------------------------------------
      console.log("In createSchicht()");
      await this.updateGesamtschichtaufbau(false);
      console.log("Nach updateGesamtschichtaufbau in createSchicht()");
      this.$emit("create-schicht-request", {
        // Request an Elternkomponente (baueinheiten.vue)
        idElternknoten: this.currentlySelectedNode._id,
        gewuenschteBezeichnungNeueSchicht: this.bezeichnungNeueSchicht,
        callback: idSelectedSchichtAfterReload => {
          // Fix von Stefan für #311, damit die eingefügte Schicht ausgewählt wird.
          console.log("callback to set selectedSchicht");
          console.log("this.alleSchichtknoten", this.alleSchichtknoten);
          this.selectedSchicht = this.alleSchichtknoten.find(
            i => i._id === idSelectedSchichtAfterReload
          );
          console.log("selectedSchicht changed", this.selectedSchicht);
        }
      });
      this.showCreateSchichtDialog = false;
      this.bezeichnungNeueSchicht = null;
      // DONE - #311: selectedSchicht auf die unten neue eingefügte Schicht setzen
      // 2 Fehlversuche unten - oben mittlerweile von Stefan gefixt!
      // Mit der jetzigen Lösung unten bleibt eine etwaige ausgewählte Schicht immerhin erhalten nach dem
      // Einfügen der neuen Schicht ganz unten im Schichtaufbau
      // ACHTUNG: Hier kann nicht einfach this.selectedSchicht = neueSchicht gesetzt werden,
      //          weil obiger API Call offenbar keine neue Schicht returned
      // this.$emit("refresh-request-baueigenschafts-profil"); // Refresh Request emittieren
      //-------------------------------------------------------------------------------------------
      // Erster Fehlversuch, aus alleSchichtknoten die neue Schicht zu ermitteln - wieder disabled:
      // console.log("alleSchichtknoten: ", this.alleSchichtknoten);
      // console.log("typeof alleSchichtknoten: ", typeof this.alleSchichtknoten);
      // ACHTUNG: alleSchichtknoten ist laut Log-Ausgaben unten gar kein Array, auf den mit Index und length zugegriffen werden
      // darf, sondern ein Objekt!!! Es enthält per Log auch die meisten Schichten, warum auch immer, doppelt!
      // console.log("alleSchichtknoten.length: ", this.alleSchichtknoten.length); // Nur sinnvoll bei Arrays!!!
      // this.selectedSchicht = this.alleSchichtknoten[this.alleSchichtknoten.length-1]; // Funktioniert nicht, da kein Array!!!
      //--------------------------------------------------------------------------------------------
      // Alternativer Fehlversuch - wieder disabled
      // Stattdessen selectedSchicht aus currentlySelectedNode.children setzen (auf dieser Variable ist sowieso ein watch definiert!
      // Allerdings zeigt das Log, dass currentlySelectedNode.children zwar die Schichtknoten als Array enthält, aber VOR dem Einfügen
      // des obigen neuen Schichtknotens am Ende - offenbar ist der oben emitttierte Refresh Request noch nicht fertig, wenn der Code ausgeführt wird!
      // Auch ein await vor dem this.$emit oben hilft hier nicht, da dieser nur den $emit selbst betrifft, nicht den Refresh
      // console.log("currentlySelectedNode.children: ", this.currentlySelectedNode.children)
      // this.selectedSchicht = this.currentlySelectedNode.children[this.currentlySelectedNode.children.length-1]
      // Funktioniert daher auch nicht - zeigt auf letztes Element VOR Einfügen der neuen Schicht am Ende
      //--------------------------------------------------------------------------------------------
      // Mit der jetzigen Lösung bleibt eine etwa ausgewählte Schicht immerhin erhalten nach dem Einfügen der neuen Schicht
      // ganz unten im Schichtaufbau:
      console.log("selectedSchicht: ", this.selectedSchicht);
    },

    zuruecksetzenAufAnfangszustand() {
      // Reset-Funktion
      //-----------------------------------------------------------------------------------------------------------------
      this.createArbeitskopieBodenaufbauKnoten();
      this.alleSchichtknoten = [];
      console.log("In zuruecksetzenAufAnfangszustand");
      this.getChildrenOfCurrentNode(); //readZugehoerigesProfil();
      this.voraussetzungenZurAnzeigeErfuellt = this.pruefeVoraussetzungen();
      // this.gesamtschichtKnoten = this.baueGesamtschichtDatenstruktur();
      this.erstelleDatenstrukturen(
        this.currentlySelectedNode,
        this.alleSchichtknoten,
        this.zuFormularGehoerigesProfil,
        this.profilEinzelschicht
      );
      //==============================================================================================================================================
      // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaaren:
      // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
      // Es handelt sich bisher nur um den Wert für das Raumnutzungsprofil des Nachbarraums.
      // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
      //==============================================================================================================================================
      this.initializeIstwerteMitSollwerten();
    },

    createArbeitskopieBodenaufbauKnoten() {
      //-----------------------------------------------------------------------------------------------------------------
      // this.voraussetzungenZurAnzeigeErfuellt = this.pruefeVoraussetzungen()
      console.log("Arbeitskopie des im Baum selektierten Knotens");
      this.selectedNodeArbeitskopie = Object.assign(
        {},
        this.currentlySelectedNode
      );
      if (
        this.currentlySelectedNode !== null &&
        this.currentlySelectedNode !== undefined
      ) {
        //---------------------------------------------------------------------------------------------------------------------------------
        // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
        // welcher die Baueigenschaften mit ihren Werten enthält:
        this.projiziereBaueigenschaftenAnBaueinheitAufProfil(
          this.selectedNodeArbeitskopie,
          this.zuFormularGehoerigesProfil
        );
        // Nun Hilfsfunktion aufrufen, welche für jede Baueigenschaft im Profil zusätzliche Vererbungsinformation zusammenträgt, die anzeigt,
        // ob die Baueigenschaft weiter oben im Elternpfad definiert ist oder nicht - dies erfolgt zunächst in einer Hilfsvariablen
        // eigenschaftenAusEltern, welche dann weiter unten gejoined wird mit profilModelAusgewaehlterKnoten
        this.eigenschaftenAusEltern = this.baueEigenschaftenVererbungsDatenstruktur(
          this.treeNodes[0], // ACHTUNG: Heißt hier im Bodenaufbau treeNodes, nicht nodes wie in anderen Profilen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          this.selectedNodeArbeitskopie,
          this.zuFormularGehoerigesProfil.zugeordneteBaueigenschaften
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
          // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft0}, .., {baueigenschaftN}]
          // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
          // Diese werden gejoined zu einem gemeinsamen Array
        );
        this.profilModelAusgewaehlterKnoten = joinResult;
        console.log(
          "Nach Join - profilModelAusgewaehlterKnoten:",
          this.profilModelAusgewaehlterKnoten
        );
        //===================================================================================================================
        // Es folgt spezieller Code für den Aufbau von Datenstrukturen für den Gesamt-Bodenaufbau!!!
        // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
        console.log(
          "this.reverseMapBaueigenschaftenGesamtschichtaufbau",
          this.reverseMapBaueigenschaftenGesamtschichtaufbau
        );
        this.eigenschaftenGesamtschichtaufbau = this.convertArray2Object(
          this.profilModelAusgewaehlterKnoten
        );
        //====================================================================================================================
        //------------------------------------------------------------------------------------------------------------------------------------------
        // NEU: Initialisiere den Array layoutBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
        // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

        // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutBaueigenschaftsProfilFormular
        // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
        for (let tab of this.layoutBaueigenschaftsProfilFormular) {
          if (tab.ueberschriftTab !== undefined) {
            // Notwendig, sonst hier Fehler bei Tabs ohne Überschrift!!!
            console.log("In for für Tab: ", tab.ueberschriftTab);
          }
          for (let rubrik of tab.rubrikenInTab) {
            if (rubrik.ueberschriftRubrik !== undefined) {
              // Notwendig, sonst hier Fehler bei Rubriken ohne Überschrift!!!
              console.log("In for für Rubrik: ", rubrik.ueberschriftRubrik);
            }
            for (let baueigenschaftInRubrik of rubrik.baueigenschaftenInRubrik) {
              /*
              if (Object.keys(baueigenschaftInRubrik).length === 0 && baueigenschaftInRubrik.constructor === Object
              // Test auf leeres Objekt, siehe https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object:
              ) {
                console.log("Achtung: Rubrik ohne Baueigenschaften!");
              } else {
              */
              if (
                baueigenschaftInRubrik.baueigenschaftsBezeichnung !== undefined // Notwendig, sonst hier Fehler bei Rubriken ohne Baueigenschaften!!!
              ) {
                console.log(
                  "In for in Reihenfolge der Baueigenschaften in layoutBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
                  baueigenschaftInRubrik.baueigenschaftsBezeichnung
                );
                baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten = this.findeIndexVonBaueigenschaft(
                  baueigenschaftInRubrik.baueigenschaftsBezeichnung
                );
                baueigenschaftInRubrik.eigenschaftIstwert = this.profilModelAusgewaehlterKnoten[ // TODO XXXXXX - Wo verwendet? Relikt???
                  baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten
                ];
                // NEU: Setze Indexfeld  auch für Soll-/Istwertepaare:
                if (
                  baueigenschaftInRubrik.baueigenschaftsBezeichnungSollwert !==
                  undefined
                ) {
                  baueigenschaftInRubrik.indexSollwertInProfilModelAusgewaehlterKnoten = this.findeIndexVonBaueigenschaft(
                    baueigenschaftInRubrik.baueigenschaftsBezeichnungSollwert
                  );
                }
              }
            }
          }
        }
        //----------------------------------------------------------------------------------------------------------------------------------------------
        // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
        //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
        //----------------------------------------------------------------------------------------------------------------------------------------------
        this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
        //---------------------------------------------------------------------------------------------------------------------
        // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um,
        // für Verwendung mit Quasar QDate Picker, welcher String-Format erfordert
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
          let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswertepaar"
          ) {
            if (eigenschaft.datumsWert1 != null) {
              // NEU: Nur wenn Wert != null ist, sonst ist das Feld per Log nach formatDate() undefined!!!
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
          //----------------------------------------------------------------------------------------------------------------------------------------
          // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden!
          // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format
          //       zurückverwandelt werden, denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
          //       Vorlage: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
          //       this.ausgewaehlteBaueigenschaft.datumsWert1 = date.formatDate(
          //          this.ausgewaehlteBaueigenschaft.datumsWert1, // Erfordert normalerweise Date Objekt als 1. Parameter, nicht String!
          //          "YYYY-MM-DD") // Ausnahme: Akzeptiert auch String im Format "YYYY-MM-DD"
          //       Dies erfolgt in submitWerteAnBaueinheit()
          //       ACHTUNG: In baueinheiten.vue etc. ist datumsWert1/2 aber nicht wie hier (wegen Konvertierung auf dem "Hinweg" in mounted() etc., weil QDate (wie QTime) nur mit
          //       Strings arbeitet) im Format String, sondern im Date-Format. Hier in baueigenschafts-profil-formulare.vue ist wegen der Konvertierung nach
          //       String auf dem "Hinweg" dann auf dem "Rückweg" vor Aufruf von formatDate() (in submitWerteAnBaueinheit()) zuerst eine Konvertierung
          //       von datumsWert1 von String nach Date durchgeführt werden!!! Siehe Kommentare in submitWerteAnBaueinheit().
          // HINWEIS: Für tagesZeitWert1/2 ist weder Konvertierung auf dem "Hinweg" noch auf dem "Rückweg" erforderlich, da das Mongoose
          //          Model dafür bereits String ist, nicht Date!!!
          //========================================================================================================================================
          // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
          //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
          // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
          // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
          //----------------------------------------------------------------------------------------------------------------------------------------
          if (
            eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
          ) {
            // Finde Baueigenschaft im Array layoutBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
            // die Konvertierung von Array nach String durch
            for (let tab of this.layoutBaueigenschaftsProfilFormular) {
              for (let rubrik of tab.rubrikenInTab) {
                for (let myEigenschaft of rubrik.baueigenschaftenInRubrik) {
                  if (
                    myEigenschaft.baueigenschaftsBezeichnung ===
                    eigenschaft.typbezogeneBaueigenschaft
                      .baueigenschaftsBezeichnung
                  ) {
                    if (myEigenschaft.radio) {
                      if (eigenschaft.aufzaehlungsWert != null) {
                        // Ist Array! Kann allerdings auch leerer Array [] oder [null] sein!
                        if (eigenschaft.aufzaehlungsWert.length > 0) {
                          eigenschaft.aufzaehlungsWert =
                            eigenschaft.aufzaehlungsWert[0];
                        } else {
                          eigenschaft.aufzaehlungsWert = null;
                        }
                      }
                    } else {
                      // Checkbox oder Toggles, benötigen Array, vertragen aber initial keinen Wert null!
                      if (eigenschaft.aufzaehlungsWert == null) {
                        eigenschaft.aufzaehlungsWert = []; // Setze leeren Array statt null - sonst Fehler in Checkboxen,
                        // Fehlermeldung "QOptionGroup.js: model should be array in your case" im Browser Log
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // DONE: Obiger Code zur Konvertierung des Aufzählungswerts auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden, in
        //       resetWerteAnBaueinheit() und Watch für selectedNode
        // DONE: Aufzählungswerte für type="radio" im Format String müssen auf dem "Rückweg" VOR Speicherung wieder in Arrays zurückkonvertiert werden,
        //       in submitWerteAnBaueinheit()
        //========================================================================================================================================
      }
      console.log(
        "this.profilModelAusgewaehlterKnoten",
        this.profilModelAusgewaehlterKnoten
      );
      //==============================================================================================================================================
      // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaaren:
      // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
      // Es handelt sich bisher nur um den Wert für das Raumnutzungsprofil des Nachbarraums.
      // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
      //==============================================================================================================================================
      this.initializeIstwerteMitSollwerten();
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      this.mountedDone = true; // Wird im Template per v-if verwendet, verhindert Rendering vor Abschluss von mounted()
      //------------------------------------------------------------------------------------------------------------------------------------------
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
      // console.log("In findeIndexVonBaueigenschaft() - baueigenschaftsBezeichnung: ", baueigenschaftsBezeichnung);
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          baueigenschaftsBezeichnung
      );
      // console.log("In findeIndexVonBaueigenschaft() - index: ", index);
      if (index === -1) {
        console.log(
          "❌❌❌❌❌❌ FEHLER: Index für Baueigenschaft",
          baueigenschaftsBezeichnung,
          "im Array profilModelAusgewaehlterKnoten nicht gefunden!"
        );
        // NEU - in diesem Fall auch Benutzernachricht anzeigen:
        if (
          !this
            .benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt
        ) {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BAUEIGENSCHAFTEN_FEHLER
          );
          this.benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt = true;
        }
      }
      return index;
    },

    submitWerteAnBaueinheit(
      //-------------------------------------------------------------------------------------------------------------------------------------------
      // Submit-Methode, macht Uppdate der die den gesamten Bodenaufbau betreffenden Felder (d.h. nicht auch der Felder der Einzelschichten) per API
      tab, // Parameter: aktuelles Tab - wird aktuell noch nicht verwendet
      doRefresh = true
    ) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // DONE: Hier werden auch leere bzw. disabled Felder auf "definiert" gesetzt!?!
      // DONE: Parameter? Weder idBaueinheit noch baueigenschaften werden verwendet!?!
      // DONE: API Naming Baueinheiten/Schichtaufbau? Wir updaten hier die Baueigenschaften für eine Schicht an einer Baueinheit,
      //       daher Aufruf put-API /baueinheiten/baueigenschaften
      // DONE: Error Handling, Benutzernachrichten
      // ACHTUNG: Nach jetzigem Stand speichert "Speichern" unter den Tabs ALLE Änderungen auf allen Tabs, nicht nur auf dem aktuellen
      //       Vorteile: Code ist einfacher, es gehen keine Änderungen des Benutzers verloren, Refresh nach Speichern würde andernfalls Änderungen auf den ungespeicherten Tabs
      //       (ohne besondere Vorkehrungen dagegen) sowieso überschreiben!!!
      //       Nachteile: Eventuell unbeabsichtigte Änderungen werden gespeichert, Verhalten ist anders als z.B. zwischen Tabs "Beschreibung" und "Details" einer Baueigenschaft
      // TODO: Eventuell Bestätigungs-Dialog vor Speichern einfügen
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In submitWerteAnBaueinheit()");
      //---------------------------------------------------------------------------------------------------------------------------------------------------
      this.setzeBerechneteWerteGesamtschichtaufbau(); // Speichert die berechneten Eigenschaften in den entsprechenden Baueigenschaften im Baueinheitsobjekt der Gesamtschicht
      //---------------------------------------------------------------------------------------------------------------------------------------------------
      // Der folgende Code wandert durch ALLE Eigenschaften im Profil (NICHT nur durch die im Layout!)
      // und setzt die richtigen Werte auf "definiertNichtUndefiniert" pro Eigenschaft:
      for (let eigenschaft of this.profilModelAusgewaehlterKnoten) {
        // console.log("Vor Aufruf pruefeDefiniertheitVonEigenschaft(eigenschaft);")
        eigenschaft.definiertNichtUndefiniert = this.pruefeDefiniertheitVonEigenschaft(
          eigenschaft
        );
        // Temporäres Logging für Bug in "Baueinheit > Standort > Geografie > Grundstück > Flur" - Ursache war nicht hier im Code, sondern
        // falsche Syntax für Kommentar innerhalb von dessen v-model="..."" im Template ("//" statt "<!--", beim Compile kein Fehler!!!)
        /*
        console.log("Nach Aufruf pruefeDefiniertheitVonEigenschaft(eigenschaft);")
        console.log("baueigenschaftsBezeichnung: ", eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung);
        console.log("definiertNichtUndefiniert: ", eigenschaft.definiertNichtUndefiniert);
        if (eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung === "Baueinheit > Standort > Geografie > Grundstück > Flur") {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
          console.log("baueigenschaftsBezeichnung: ", eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung);
          console.log("kennWert1: ", eigenschaft.kennWert1);
          console.log("bezeichnungsWert1: ", eigenschaft.bezeichnungsWert1);
          console.log("definiertNichtUndefiniert: ", eigenschaft.definiertNichtUndefiniert);
          console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
        */
        /*
        console.log(eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                    eigenschaft.typbezogeneBaueigenschaft.werteTyp,
                    eigenschaft.bezeichnungsWert1,
                    eigenschaft.definiertNichtUndefiniert)
        };
        */
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
        //-------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueigenschaftsProfilFormular und führe ggf. die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueigenschaftsProfilFormular) {
            for (let rubrik of tab.rubrikenInTab) {
              for (let myEigenschaft of rubrik.baueigenschaftenInRubrik) {
                if (
                  myEigenschaft.baueigenschaftsBezeichnung ===
                  eigenschaft.typbezogeneBaueigenschaft
                    .baueigenschaftsBezeichnung
                ) {
                  if (myEigenschaft.radio) {
                    if (eigenschaft.aufzaehlungsWert != null) {
                      // Wandle String in Array um
                      eigenschaft.aufzaehlungsWert = [
                        eigenschaft.aufzaehlungsWert
                      ];
                    }
                  }
                }
              }
            }
          }
        }
      }
      //------------------------------------------------------------------------------------------------------------------------------------
      const apiRoute = process.env.API + "/Baueinheiten" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
      return this.$axios.put(apiRoute, {
        idBaueinheit: this.selectedNodeArbeitskopie._id,
        wertbezogeneBaueigenschaftenArray: kopieProfilModelAusgewaehlterKnoten // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
      });
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

    getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(
      //-------------------------------------------------------------------------------------------------------------------------------
      bezeichnungSchichttypEigenschaft,
      gesuchteSchichttypen,
      bezeichnungWertEigenschaft
    ) {
      //-------------------------------------------------------------------------------------------------------------------------------
      // Hilfsfunktion - sucht die Schichtknoten mit baueigenschaftsBezeichnung bezeichnungSchichttypEigenschaft aus dem Objekt
      // mapRelevanteBaueigenschaftenEinzelschichten heraus, die in gesuchteSchichttypen übergebene Werte in ihrem Aufzählungswert enthalten.
      // Für diese Schichtknoten wird anschließend der kennWert1 der Eigenschaft mit baueigenschaftsBezeichnung bezeichnungWertEigenschaft herausgesucht.
      // Returned wird ein Array all dieser kennWert1-Werte.
      // Beispiel-Verwendung:
      // this.getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen("Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",", this.elementeSchichtpaketRohboden, "Baueinheit > Schicht > Geometrie > Dicke")
      // Returned die Werte von kennWert1 in allen Schichten, die zum Schichttyp "Rohboden" gehören, als Array, der z.B. anschließend aufsummiert werden kann.
      //================================================================================================================================
      // HINWEIS: Ein Objekt in mapRelevanteBaueigenschaftenEinzelschichten hat folgenden Aufbau:
      // idSchicht: {idBaueigenschaft: {eigenschaft: { <wertbezogene Felder>, typbezogeneBaueigenschaft: { <typbezogene Felder> }},
      //                                verweisTypbezogeneBaueigenschaft: { <nochmal dieselben typbezogenen Felder, warum auch immer > }
      //                               }
      //            }
      // Feld-Zugriff z.B. mit:
      // let bezeichnungBaueigenschaft = "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
      // this.mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][
      //   this.reverseMapBaueigenschaftenEinzelschicht[bezeichnungBaueigenschaft]
      // ]["eigenschaft"]["kennWert1"]
      //================================================================================================================================
      console.log(
        "In getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen()"
      );
      /*
      console.log(
        "mapRelevanteBaueigenschaftenEinzelschichten: ",
        this.mapRelevanteBaueigenschaftenEinzelschichten
      );
      */
      var result = [];
      for (var idSchicht in this.mapRelevanteBaueigenschaftenEinzelschichten) {
        // some ist Array-Funktion und liefert true zurück,
        // wenn ein Element im Array die Bedingung in der Lambda-Funktion erfüllt
        var relevantFuerBerechnung = gesuchteSchichttypen.some(el =>
          this.mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][
            this.reverseMapBaueigenschaftenEinzelschicht[
              bezeichnungSchichttypEigenschaft
            ]
          ]["eigenschaft"]["aufzaehlungsWert"].includes(el)
        );

        if (relevantFuerBerechnung === true) {
          // Für Debugging:
          /*
          console.log(
            "Relevant für Berechnung: mapRelevanteBaueigenschaftenEinzelschichten[idSchicht]: ",
            this.mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][
              this.reverseMapBaueigenschaftenEinzelschicht[
                bezeichnungWertEigenschaft
              ]
            ]["verweisTypbezogeneBaueigenschaft"]["typbezogeneBaueigenschaft"]
              .baueigenschaftsBezeichnung
          );
          console.log("mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][reverseMapBaueigenschaftenEinzelschicht[bezeichnungWertEigenschaft]]['eigenschaft'].kennWert1: ",
            this.mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][
              this.reverseMapBaueigenschaftenEinzelschicht[
                bezeichnungWertEigenschaft
              ]
            ]["eigenschaft"].kennWert1);
          */
          result.push(
            this.mapRelevanteBaueigenschaftenEinzelschichten[idSchicht][
              this.reverseMapBaueigenschaftenEinzelschicht[
                bezeichnungWertEigenschaft
              ]
            ]["eigenschaft"].kennWert1
          );
        }
      }
      return result;
    },

    summiereArray(arg) {
      //-----------------------------------------------
      // arg ist ein Array von Zahlen
      // Berechnet die Summe der Zahlen im Array
      return arg.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        0
      );
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
      console.log("In pruefeDefiniertheitVonEigenschaft(eigenschaft)");
      /*
      if (
        eigenschaft.baueigenschaftsBezeichnung ===
        "Baueinheit > Standort > Geografie > Grundstück > Flur"
      ) {
        // console.log("XXXXXXXXXXXXXXXXX");
        console.log(
          "eigenschaft.baueigenschaftsBezeichnung: ",
          eigenschaft.baueigenschaftsBezeichnung
        );
        console.log(
          "eigenschaft.kennWert1: ",
          eigenschaft.typbezogeneBaueigenschaft.kennWert1
        );
      }
      */
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

    sollIstWerteVergleich_01: function(
      //-----------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Wird aktuell nicht mehr verwendet, ersetzt durch sollIstWerteVergleich_02()
      eigenschaft,
      baueigenschaftsBezeichnungSollwert,
      baueigenschaftsBezeichnungIstwert
    ) {
      console.log(
        `In sollIstWerteVergleich_01 mit ${eigenschaft}, ${baueigenschaftsBezeichnungSollwert} und ${baueigenschaftsBezeichnungIstwert}`
      );
      var wertSollwert = this.eigenschaftenGesamtschichtaufbau[
        this.reverseMapBaueigenschaftenGesamtschichtaufbau[
          baueigenschaftsBezeichnungSollwert
        ]
      ].kennWert1;
      var wertIstwert = this.eigenschaftenGesamtschichtaufbau[
        this.reverseMapBaueigenschaftenGesamtschichtaufbau[
          baueigenschaftsBezeichnungIstwert
        ]
      ].kennWert1;
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (wertIstwert == null || wertIstwert === "") {
        return null;
      }
      let istwertKennwert = Number(wertIstwert);
      // console.log("istwertKennwert: ", istwertKennwert);
      // console.log("Typ: ", typeof(istwertKennwert));
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (wertSollwert == null || wertSollwert === "") {
        return null;
      }
      let sollwertKennwert = Number(wertSollwert);
      // console.log("solltwertKennwert: ", sollwertKennwert);
      let operator = eigenschaft.operatorSollIstWerteVergleich; // Kommmt aus Layout File
      // console.log("operator: ", operator);
      let werteTyp = "Kennwert"; // ACHTUNG: Wertetyp für diese 2 Felder ist jeweils "Kennwert"! Ist hier hard coded, nicht aus Layout File.
      let result = this.doAllgemeinerSollIstWerteVergleich(
        werteTyp,
        sollwertKennwert,
        istwertKennwert,
        operator
      );
      console.log("result: ", result);
      return result;
    },

    sollIstWerteVergleich_02: function(
      eigenschaft,
      wertSollwert,
      wertIstwert,
      werteTyp = "Kennwert",
      umrechnungIstWertVonMMNachM = false
    ) {
      console.log(
        `In sollIstWerteVergleich_02() mit ${eigenschaft}, ${wertSollwert} und ${wertIstwert}`
      );
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (wertIstwert == null || wertIstwert === "") {
        return null;
      }
      let istwertKennwert = Number(wertIstwert);
      if (umrechnungIstWertVonMMNachM) {
        // NEU: #305 - Umrechnung für Dicken von mm nach m!!!
        istwertKennwert = istwertKennwert / 1000;
      }
      // console.log("istwertKennwert: ", istwertKennwert);
      // console.log("Typ: ", typeof(istwertKennwert));
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (wertSollwert == null || wertSollwert === "") {
        return null;
      }
      let sollwertKennwert = Number(wertSollwert);
      // console.log("solltwertKennwert: ", sollwertKennwert);
      let operator = eigenschaft.operatorSollIstWerteVergleich; // Kommmt aus Layout File
      // console.log("operator: ", operator);
      let result = this.doAllgemeinerSollIstWerteVergleich(
        werteTyp,
        sollwertKennwert,
        istwertKennwert,
        operator
      );
      console.log("result: ", result);
      return result;
    },

    disableFelderInAbhaengigkeitVonAufzaehlungswerten() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Wrapper-Methode zum Aufruf der für ein Tab zuständigen Enabling/Disabling-Methoden
      // Aufruf in Abhängigkeit von tabGebaeudeBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log("In disableFelderInAbhaengigkeitVonAufzaehlungswerten()");
      console.log(
        "Aktuell kein Disabling von Feldern in Abhängigkeit von Tab/Aufzählungswerten'"
      );
      /*
      switch (this.tabBodenaufbauBaueigenschaftsProfilFormular) {
        default:
          break;
      }
      */
    },

    doAllgemeinerSollIstWerteVergleich(
      //-------------------------------------------------------------------------------------------------------------------------------------
      werteTyp,
      sollwert,
      istwert,
      operator
    ) {
      // Allgemeine Funktion zum Vergleich von Sollwerten mit Istwerten in Abhängigkeit vom Wertetyp und Operator
      // Um duplicate Code in computed-Funktionen zu vermeiden!
      // Macht vorläufig für die meisten Wertetypen denselben, alphabetischen Vergleich!!!
      console.log("In doAllgemeinerSollIstWerteVergleich()");

      console.log("sollwert: ", sollwert);
      console.log("istwert: ", istwert);
      console.log("operator: ", operator);
      console.log("werteTyp: ", werteTyp);

      // NEU: return null, falls einer der Werte null ist:
      // NEU: Zusätzlich Abfrage auf leeren Array für Aufzählungswerte, per .length
      if (
        sollwert === null ||
        istwert == null ||
        sollwert === "" ||
        istwert === "" ||
        istwert.length === 0 ||
        sollwert.length === 0
      ) {
        return null;
      }
      //-----------------------------------------------------
      switch (werteTyp) {
        case "Kennwert":
        case "Bezeichnungswert":
        case "Aufzählungswert":
        case "Datumswert":
        case "Tageszeitwert":
        case "Kennwertepaar":
        case "Bezeichnungswertepaar":
        case "Datumswertepaar":
        case "Tageszeitwertepaar": {
          // Operator wird hier für alphabetischen Vergleich herangezogen:
          // console.log("In case für erste Wertetyp-Gruppe")
          switch (operator) {
            case "=": {
              if (sollwert === istwert) {
                return true;
              }
              break;
            }
            case "≤": {
              if (sollwert <= istwert) {
                return true;
              }
              break;
            }
            case "≥": {
              // console.log("Im Case für '≥'");
              if (sollwert >= istwert) {
                return true;
              }
              break;
            }
            case "<": {
              if (sollwert < istwert) {
                return true;
              }
              break;
            }
            case ">": {
              if (sollwert > istwert) {
                return true;
              }
              break;
            }
          }
          return false; // Ansonsten falscher Operator, immer false zurückgeben
        }
        case "Wahrheitswert":
          // Operator wird hier vorläufig ignoriert, Test immer auf Gleichheit/Ungleichheit
          if ((sollwert = istwert)) {
            return true;
          } else {
            return false;
          }
      }
      return false; // Ansonsten falscher Wertetyp, immer false zurückgeben
    }
  },

  //===============================================================================================================================================
  watch: {
    // Watch auf der ausgewählten Schicht:
    selectedSchicht: function(newVal, oldVal) {
      console.log("selectedSchicht changed");
      if (newVal != null) {
        // Fix für Type Error in #358 nach Löschen einer Schicht (dann ist newVal null)
        this.$emit("update:idCurrentlySelectedSchicht", newVal._id);
      }
    },

    // Watch auf den children des Bodenaufbaus:
    "currentlySelectedNode.children": function(newVal, oldVal) {
      //-----------------------------------------------------------------------------------------------------------------
      // 12.02.21: HOTFIX
      // Problem: Laden der Kinder wird durch baueinheiten.vue erledigt - wie kriegt man hier mit, dass dies abgeschlossen ist?
      console.log(
        "In watch für currentlySelectedNode.children - für lazy loaded Kindknoten"
      );
      this.getChildrenOfCurrentNode(); // readZugehoerigesProfil();
      this.voraussetzungenZurAnzeigeErfuellt = this.pruefeVoraussetzungen();
      // this.gesamtschichtKnoten = this.baueGesamtschichtDatenstruktur();
      this.erstelleDatenstrukturen(
        this.currentlySelectedNode,
        this.alleSchichtknoten,
        this.zuFormularGehoerigesProfil,
        this.profilEinzelschicht
      );
      this.createArbeitskopieBodenaufbauKnoten();
    },

    // Watch auf dem Bodenaufbau:
    currentlySelectedNode: {
      //-----------------------------------------------------------------------------------------------------------------
      handler: function(oldValue, newValue) {
        console.log(
          "In watch für currentlySelectedNode - Datenstrukturen werden neu erstellt"
        );
        this.alleSchichtknoten = [];
        this.getChildrenOfCurrentNode();
        this.voraussetzungenZurAnzeigeErfuellt = this.pruefeVoraussetzungen();
        // this.gesamtschichtKnoten = this.baueGesamtschichtDatenstruktur();
        this.erstelleDatenstrukturen(
          this.currentlySelectedNode,
          this.alleSchichtknoten,
          this.zuFormularGehoerigesProfil,
          this.profilEinzelschicht
        );
        this.createArbeitskopieBodenaufbauKnoten();
        //==============================================================================================================================================
        // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaaren:
        // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
        // Es handelt sich bisher nur um den Wert für das Raumnutzungsprofil des Nachbarraums.
        // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
        //==============================================================================================================================================
        this.initializeIstwerteMitSollwerten();
      }
    }
  },
  //=================================================================================================================================================
  computed: {
    sollIstWerteVergleichsMap: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Wird aktuell NICHT verwendet! Hat auch noch nicht mehr aktuelle Bezeichnungen!
      return {
        OberbodenAufbauHoehe: this
          .computeAufbauhoeheFertigbodenSollIstWerteVergleich,
        Rohdeckenhoehe: this.computeDickeRohbodenSollIstWerteVergleichVariante,
        Rohdeckenbekleidung: this
          .computeAufbauhoeheFertigbodenSollIstWerteVergleich,
        Gesamtdeckenhoehe: null,

        Nutzlastenkategorie: null,
        Flaechenlast: null,
        Einzellast: null,

        Waermedurchgangskoeffizient: null,
        ReferenzWohngebaeudeDurchgangskoeffizient: null,
        ReferenzNichtWohngebaeudeDurchgangskoeffizient: null,

        Waermedurchlasswiderstand: null
      };
    },

    computeAufbauhoeheFertigbodenSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeAufbauhoeheFertigbodenSollIstWerteVergleich (computed)"
      );
      var result = this.sollIstWerteVergleich_02(
        this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[0],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Raum > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe" // NEU: #281/#302
            // "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Fertigboden > Aufbauhöhe" // ALT
          ]
        ].kennWert1,
        this.aufbauhoeheFertigbodenBerechnet,
        "Kennwert",
        true // NEU - #305: Umrechnung des Istwerts von mm nach m
      );
      return result;
    },

    // Variante von Funktion unten - aktuell nicht verwendet!
    computeAbsenkungSollIstWerteVergleichVariante: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeAbsenkungSollIstWerteVergleichVariante (computed)"
      );
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[2];
      // ACHTUNG: Indizes sind spezifisch für Bodenaufbau > Geometrie > Rohdecke > Absenkung > Istwert!!!
      // ACHTUNG: Heißt neu "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung" // NEU: #281/#302
      let istwertIndex = eigenschaft.indexInProfilModelAusgewaehlterKnoten;
      let sollwertIndex =
        eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten;
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (
        this.profilModelAusgewaehlterKnoten[istwertIndex].kennWert1 == null ||
        this.profilModelAusgewaehlterKnoten[istwertIndex].kennWert1 === ""
      ) {
        return null;
      }
      let istwertKennwert = Number(
        this.profilModelAusgewaehlterKnoten[istwertIndex].kennWert1
      );
      // console.log("istwertKennwert: ", istwertKennwert);
      // console.log("Typ: ", typeof(istwertKennwert));
      // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
      // ACHTUNG: Number(null) returned 0!
      // Daher vor Konvertierung aussteuern:
      if (
        this.profilModelAusgewaehlterKnoten[sollwertIndex].kennWert1 == null ||
        this.profilModelAusgewaehlterKnoten[sollwertIndex].kennWert1 === ""
      ) {
        return null;
      }
      let sollwertKennwert = Number(
        this.profilModelAusgewaehlterKnoten[sollwertIndex].kennWert1
      );
      // console.log("solltwertKennwert: ", sollwertKennwert);
      let operator = eigenschaft.operatorSollIstWerteVergleich; // Kommmt aus Layout File
      // console.log("operator: ", operator);
      let werteTyp = "Kennwert"; // ACHTUNG: Wertetyp für diese 2 Felder ist jeweils "Kennwert"! Ist hier hard coded, nicht aus Layout File.
      let result = this.doAllgemeinerSollIstWerteVergleich(
        werteTyp,
        sollwertKennwert,
        istwertKennwert,
        operator
      );
      console.log("result: ", result);
      return result;
    },

    computeDickeRohbodenSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In computeDickeRohbodenSollIstWerteVergleich (computed)");
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[1]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Geometrie > Rohboden > Dicke"
      var result = this.sollIstWerteVergleich_02(
        this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[1],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        this.dickeRohbodenBerechnet,
        "Kennwert",
        true // NEU - #305: Umrechnung des Istwerts von mm nach m
      );
      return result;
    },

    // Variante obiger Funktion - diese wurde oben in sollIstWerteVergleichsMap aufgerufen!
    computeDickeRohbodenSollIstWerteVergleichVariante: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeDickeRohbodenSollIstWerteVergleichVariante (computed)"
      );
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[1]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Geometrie > Rohboden > Dicke", // NEU: #281/#302
      var result = this.sollIstWerteVergleich_02(
        this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[1],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Raum > Geometrie > Bodenaufbau > Rohboden > Dicke" // NEU: #281/#302
            // "Baueinheit > Geschoss > Geometrie > Bodenaufbau > Rohboden > Dicke" // ALT
          ]
        ].kennWert1,
        this.dickeRohbodenBerechnet,
        "Kennwert",
        true // NEU - #305: Umrechnung des Istwerts von mm nach m
      );
      return result;
    },

    computeAbsenkungSollIstWerteVergleich: function() {
      // ACHTUNG: Funktion wird aktuell nicht mehr verwendet, da die Anzeige der betreffenden Baueigenschaft per Layout File disabled ist -
      // "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung"!
      //------------------------------------------------------------------------------------------------------------------------------------
      console.log("In computeAbsenkungSollIstWerteVergleich (computed)");
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[2];
      // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung", // NEU: #281/#302
      console.log("In computeAbsenkungSollIstWerteVergleich (computed)");
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnung
          ]
        ].kennWert1
      );
      return result;
    },

    computeDickeBodenunterseiteSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log(
        "In computeDickeBodenunterseiteSollIstWerteVergleich (computed)"
      );
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[3]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Geometrie > Bodenunterseite > Dicke"
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        this.dickeBodenunterseiteBerechnet,
        "Kennwert",
        true // NEU - #305: Umrechnung des Istwerts von mm nach m
      );
      return result;
    },

    // NEU - MS: @281/302:
    computeGesamtdickeBodenSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In computeGesamtdickeBodenSollIstWerteVergleich (computed)");
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[1].baueigenschaftenInRubrik[4]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Geometrie > Gesamtdicke"
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        this.gesamtdickeBodenBerechnet,
        "Kennwert",
        true // NEU - #305: Umrechnung des Istwerts von mm nach m
      );
      return result;
    },

    computeBodenaufbauNutzlastenkategorieSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeBodenaufbauNutzlastenkategorieSollIstWerteVergleich (computed)"
      );
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[2].baueigenschaftenInRubrik[0]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Nutzlasten > Kategorie > Istwert"
      let istwertIndex = eigenschaft.indexInProfilModelAusgewaehlterKnoten;
      let sollwertIndex =
        eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten;
      // console.log("profilModelAusgewaehlterKnoten:", this.profilModelAusgewaehlterKnoten)
      // ACHTUNG: Code hier ist spezifisch für Aufzählungwerte
      // Fall null wird in aufgerufener Funktion abgefangen!
      // TODO: Handling, wenn aufzaehlungsWert ein Array (bei Mehrfachauswahl) ist - dann kein Vergleich möglich!
      // Vorlage für Array Handling dafür in baueinheit-standort-baueigenschafts-profil-formular (für Checkboxes/Radio Buttons)
      let istwertKennwert = this.profilModelAusgewaehlterKnoten[istwertIndex]
        .aufzaehlungsWert;
      // console.log("istwertKennwert: ", istwertKennwert);
      // console.log("Typ: ", typeof(istwertKennwert));
      // ACHTUNG: Code hier ist spezifisch für Aufzählungwerte (Array):
      // Fall null wird in aufgerufener Funktion abgefangen!
      // TODO: Handling, wenn aufzaehlungsWert ein Array (bei Mehrfachauswahl) ist - dann kein Vergleich möglich!
      // Vorlage für Array Handling dafür in baueinheit-standort-baueigenschafts-profil-formular (für Checkboxes/Radio Buttons)
      let sollwertKennwert = this.profilModelAusgewaehlterKnoten[sollwertIndex]
        .aufzaehlungsWert;
      // console.log("solltwertKennwert: ", sollwertKennwert);
      let operator = eigenschaft.operatorSollIstWerteVergleich; // Kommmt aus Layout File
      // console.log("operator: ", operator);
      let werteTyp = "Aufzählungswert"; // ACHTUNG: Wertetyp für diese 2 Felder ist jeweils "Aufzählungswert"! Ist hier hard coded, nicht aus Layout File.
      let result = this.doAllgemeinerSollIstWerteVergleich(
        werteTyp,
        sollwertKennwert,
        istwertKennwert,
        operator
      );
      console.log("result: ", result);
      return result;
    },

    computeLastannahmenFlächenlastSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeLastannahmenFlächenlastSollIstWerteVergleich (computed)"
      );
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          "Baueinheit > Bodenaufbau > Nutzlasten > Flächenlast > Istwert"
        ],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            // "Baueinheit > Raum > Lastannahmen > Bodenaufbau > Flächenlast > Sollwert" // ALT
            "Baueinheit > Raum > Nutzlasten > Flächenlast > Sollwert" // NEU - ersetzt BEg in voriger Zeile (aus neuem Tab "Raum" > "Lasten")
          ]
        ].kennWert1,
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Nutzlasten > Flächenlast > Istwert"
          ]
        ].kennWert1
      );
      return result;
    },

    computeLastannahmenEinzellastSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeLastannahmenEinzellastSollIstWerteVergleich (computed)"
      );
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[2].baueigenschaftenInRubrik[2]; // ACHTUNG: Indizes sind spezifisch für "Baueinheit > Bodenaufbau > Nutzlasten > Einzellast > Istwert"!!!
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnung
          ]
        ].kennWert1
      );
      return result;
    },

    computeWärmeschutzWärmedurchgangskoeffizientSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      console.log(
        "In computeWärmeschutzWärmedurchgangskoeffizientSollIstWerteVergleich (computed)"
      );
      // console.log("layoutBaueigenschaftsProfilFormular: ", this.layoutBaueigenschaftsProfilFormular);
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
        .rubrikenInTab[3].baueigenschaftenInRubrik[6]; // ACHTUNG: Indizes sind spezifisch für Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert!!!
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        /*
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        */
        // ACHTUNG: Sollwert ist computed! Muss hier neu berechnet werden!
        this.waermedurchgangskoeffizientSollwertBerechnet,
        /*
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnung
          ]
        ].kennWert1,
        */
        this.waermedurchgangskoeffizientBerechnet
      );
      return result;
    },

    computeWärmeschutzWärmedurchlasswiderstandSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeWärmeschutzWärmedurchlasswiderstandSollIstWerteVergleich (computed)"
      );
      let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0] // .rubrikenInTab[4].baueigenschaftenInRubrik[0]; // ALT - ACHTUNG: Indizes sind spezifisch für Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert!!!
        .rubrikenInTab[3].baueigenschaftenInRubrik[5]; // NEU - wegen Verschiebung im Layout File!!!
      var result = this.sollIstWerteVergleich_02(
        this.mapBaueigenschaftenLayoutFile[
          eigenschaft.baueigenschaftsBezeichnung
        ],
        /*
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnungSollwert
          ]
        ].kennWert1,
        */
        // ACHTUNG: Sollwert ist computed! Muss hier neu berechnet werden!
        this.waermedurchlasswiderstandSollwertBerechnet,
        /*
        this.eigenschaftenGesamtschichtaufbau[
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            eigenschaft.baueigenschaftsBezeichnung
          ]
        ].kennWert1
        */
        this.waermedurchlasswiderstandBerechnet
      );
      return result;
    },

    // ------------------------------------------------------------------------------------------------------------------ //
    mapOfComputedProperties: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Wrapper-Objekt um die im Template berechneten computed-Eigenschaften.
      // Wird verwendet, um über einen String-Parameter auf die entsprechende Eigenschaft zugreifen zu können
      // Dadurch wird eine große if-... - else-if- ... - else-if Fallunterscheidung im Template vermieden
      // ACHTUNG: Die folgenden computed-Funktionen returnen alle diese Map!
      // Die Gesamtdicke weiter unten muss daher speziell anders computed werden!!!
      //==========================================================================================================================
      // ACHTUNG: Diese computed-Felder müssen im Layout File jeweils per Property benutzeComputedWert: true und z.B.
      // bezeichnungComputedProperty: "aufbauhoeheFertigboden" angesteuert werden!!!
      // ACHTUNG: Die Speicherung der computed-Werte erfolgt in setzeBerechneteWerteGesamtschichtaufbau() beim Submit!
      //==========================================================================================================================
      return {
        aufbauhoeheFertigboden: this.aufbauhoeheFertigbodenBerechnet,
        dickeRohboden: this.dickeRohbodenBerechnet,
        dickeBodenunterseite: this.dickeBodenunterseiteBerechnet,
        gesamtdickeBoden: this.gesamtdickeBodenBerechnet,
        internerWaermeuebergangswiderstand: this
          .internerWaermeuebergangswiderstandBerechnet, // NEU
        externerWaermeuebergangswiderstand: this
          .externerWaermeuebergangswiderstandBerechnet, // NEU
        waermedurchlasswiderstand: this.waermedurchlasswiderstandBerechnet, // NEU
        waermedurchgangskoeffizient: this.waermedurchgangskoeffizientBerechnet, // NEU
        waermedurchlasswiderstandSollwert: this
          .waermedurchlasswiderstandSollwertBerechnet, // NEU
        waermedurchgangskoeffizientSollwert: this
          .waermedurchgangskoeffizientSollwertBerechnet // NEU
      };
    },

    waermedurchlasswiderstandSollwertBerechnet: function() {
      //-------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Sollwerts des Wärmedurchgangskoeefizienten des Bodenaufbaus
      //
      //-------------------------------------------------------------------------------------------------------------------
      console.log("In waermedurchlasswiderstandSollwertBerechnet");
      let waermedurchgangskoeffizientSollwertBerechnet = this
        .waermedurchgangskoeffizientSollwertBerechnet;
      if (
        waermedurchgangskoeffizientSollwertBerechnet == null ||
        waermedurchgangskoeffizientSollwertBerechnet === 0
      ) {
        return null;
      }
      let result = 1 / waermedurchgangskoeffizientSollwertBerechnet; // Kehrwert
      result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
      console.log("Gerundetes result: ", result);
      // Nun per Side Effect das VModel updaten:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
            .baueigenschaftenInRubrik[5]
            .indexSollwertInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Sollwert
        ],
        "kennWert1",
        result
      );
      return result;
    },

    waermedurchgangskoeffizientSollwertBerechnet: function() {
      //-------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Sollwerts des Wärmedurchgangskoeefizienten des Bodenaufbaus
      //
      /*
         Vorschriften zur Berechnung:
          EnEV 2014 (§3 Wohngebäude)
          https://enev-online.com/enev_2014_volltext/enev_2014_anlage_01_anforderungen_wohngebaeude.pdf
          Sollwerte für Wärmedurchgangskoeffizient (U-Wert, U max)
          - Geschossdecke gegen Außenluft: 0,28 W/m²K
          - Bodenplatte über Erdreich und zu unbeheizten Räumen: 0,35 W/m²K

          EnEV 2014 (§4 Nichtwohngebäude)
          https://enev-online.com/enev_2014_volltext/enev_2014_anlage_02_anforderungen_nichtwohngebaeude.pdf
          Sollwerte für Wärmedurchgangskoeffizient (U-Wert, U max)
          Geschossdecke gegen Außenluft: 0,28 W/m²K bei Raum-Solltemperaturen im Heizfall >= 19 Grad (erfordert zusätzlichen Wahrheitswert zur Steuerung!)
          Geschossdecke gegen Außenluft: 0,35 W/m²K bei Raum-Solltemperaturen im Heizfall von 12 bis 19 Grad
          Bodenplatte über Erdreich und zu unbeheizten Räumen: 0,35 W/m²K (bei beiden Heizfällen)

          GEG (Wohngebäude)
          https://www.leipfinger-bader.de/wp-content/uploads/2021/03/GEG2020-20210226.pdf – Tabelle 8.2
          https://www.gesetze-im-internet.de/geg/anlage_1.html – Anlage 1 zum GEG
          Sollwerte für Wärmedurchgangskoeffizient (U-Wert, U max)
          Geschossdecke gegen Außenluft: 0,28 W/m²K
          Bodenplatte über Erdreich und zu unbeheizten Räumen: 0,34 W/m²K

          GEG (Nichtwohngebäude)
          https://www.gesetze-im-internet.de/geg/anlage_2.html - Anlage 2 zum GEG
          Sollwerte für Wärmedurchgangskoeffizient (U-Wert, U max)
          Geschossdecke gegen Außenluft: 0,28 W/m²K bei Raum-Solltemperaturen im Heizfall >= 19 Grad (erfordert zusätzlichen Wahrheitswert zur Steuerung!)
          Geschossdecke gegen Außenluft: 0,35 W/m²K bei Raum-Solltemperaturen im Heizfall von 12 bis 19 Grad
          Bodenplatte über Erdreich und zu unbeheizten Räumen: 0,35 W/m²K (bei beiden Heizfällen)

          Fazit:
          - EnEV und GEG können identisch berechnet werden
          - Es genügt zur Berechnung der vorhandene Aufzählungswert für die Angrenzungssituation plus ein Wahrheitswert für die Raum-Solltemperatur zur Unterscheidung bei Nichtwohngebäuden – dieser sollte vom Raum geerbt werden!
            - Vorläufig kann hier für Nichtwohngebäude bei „Geschossdecke gegen Außenluft“ auch vereinfacht immer 0,28 wie im Fall Wohngebäude eingesetzt werden!
      */
      //---------------------------------------------------------------------------------------------------------------------------------------
      console.log("In waermedurchgangskoeffizientSollwertBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        // "Baueinheit > Gebäude > Nutzung > Typ > EnEV/GEG":
        let gebäudetypNachEnEVUndGEG = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].aufzaehlungsWert[0]; // ACHTUNG: Ist array of String!
        console.log("gebäudetypNachEnEVUndGEG: ", gebäudetypNachEnEVUndGEG);
        let angrenzungssituation = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].aufzaehlungsWert; // ACHTUNG: Ist beim ersten Mal array of String! Danach nur noch String! Muss hier gehandelt werden:
        if (angrenzungssituation == null || angrenzungssituation === []) {
          return null;
        }
        console.log(
          "typeof angrenzungssituation: ",
          typeof angrenzungssituation
        );
        if (typeof angrenzungssituation !== "string") {
          // Array
          angrenzungssituation = angrenzungssituation[0];
        }
        console.log("angrenzungssituation: ", angrenzungssituation);
        let result = null;
        if (gebäudetypNachEnEVUndGEG === "Nichtwohngebäude nach § 4 EnEV") {
          switch (angrenzungssituation) {
            case "gegen niedrig beheizte Räume":
              result = 0.34;
              break;
            case "gegen Außenluft":
              result = 0.28;
              break;
            case "gegen Erdreich":
              result = 0.34;
              break;
            default:
            // result = null // Schon oben gesetzt
          }
        } else {
          if (gebäudetypNachEnEVUndGEG === "Wohngebäude nach § 3 EnEV") {
            switch (angrenzungssituation) {
              case "gegen niedrig beheizte Räume":
                result = 0.35;
                break;
              case "gegen Außenluft":
                result = 0.28;
                break;
              case "gegen Erdreich":
                result = 0.35;
                break;
              default:
              // result = null // Schon oben gesetzt
            }
          } // else result = null // Schon oben gesetzt
        } // else result = null // Schon oben gesetzt
        if (result == null) return null;
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[6]
              .indexSollwertInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Sollwert"
          ],
          "kennWert1",
          result
        );
        /*
        console.log("VModel: ", this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[6].indexSollwertInProfilModelAusgewaehlterKnoten].kennWert1 // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Sollwert"
        )
        */
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    waermedurchlasswiderstandBerechnet: function() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Wärmedurchlasswiderstands des Bodenaufbaus nach DIN 6946
      // Ergibt sich aus Rsi + Rse + Summe der Wärmedurchlasswiderstände aller Schichten
      //======================================================================================================================================
      // ACHTUNG: Funktionierte mit erstem Versuch nicht, vermutlich, da der computed-Wert des Wärmedurchlasswiderstands an der Schicht (Istwert)
      // dort nur jedes Mal computed wird, aber nicht wirklich abgespeichert wird - in der mapRelevanteBaueigenschaftenEinzelschichten sind deren
      // Felder kennWert1 daher per Log stets null!. Das obwohl im Formular für die Schichten das Feld per $set updated wird, was aber nur
      // das VModel im Profil-Model der Schicht aktualisiert. Das ist anders als bei der Addition Dicken, die keine computed-Werte in der Schicht sind!
      // Abhilfe: Den Wärmedurchlasswiderstand pro Schicht hier am Bodenaufbau neu computen aus Lambda und Dicke, welche nicht computed sind.
      // Dazu wandert der Code durch alle Schichten und extrahiert die Dicke und Lambda aus mapBaueigenschaftenGesamtSchichtaufbau
      // für jede Schicht und errechnet dann daraus den Wärmedurchlasswiderstand pro Schicht neu. Anschließend werden diese Werte alle aufaddiert.
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In waermedurchlasswiderstandBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        // Erster Versuch, die Berechnung mit getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen() für alle Schichttypen zu machen.
        // Schlägt fehl, denn die Felder kennWert1 des Wärmedurchlasswiderstands der Schichten sind alle null. Grund Siehe oben.
        // Daher disabled:
        /*
        let result = null;
        let alleSchichttypen = this.elementeSchichtpaketBodenoberseite.concat(
          this.elementeSchichtpaketRohboden,
          this.elementeSchichtpaketBodenunterseite
        );
        console.log("alleSchichttypen: ", alleSchichttypen);
        result = this.getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(
          "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
          alleSchichttypen, // ACHTUNG: Alle Elemente!!!
          "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
        );
        console.log(
          "result aus getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(): ",
          result
        );
        */
        //----------------------------------------------------------------------------------------------------------------------------------
        // Neues Verfahren: Compute die einzelnen Wärmedurchlasswiderstände aller Schichten hier neu aus Schichtdicke und Lambda
        // Diese Werte können mapRelevanteBaueigenschaftenEinzelschichten entnommen werden.
        // Zwischenspeicherung der kennWert1-Wete in Array, dann aufsummieren mit summiereArray
        let result = []; // Array mit errechneten Wärmedurchlasswiderständen aller Schichten
        // HINWEIS: Ein Objekt in mapRelevanteBaueigenschaftenEinzelschichten hat den Aufbau:
        // idSchicht: {idBaueigenschaft: {eigenschaft: <wertbezogene Felder>, typbezogeneBaueigenschaft: {<typbezogene Felder>}}, verweisTypbezogeneBaueigenschaft: {<Nochmal dieselben Felder, warum auch immer >}}}
        // Feld-Zugriff mit:
        var bezeichnungBaueigenschaftDickeSchicht =
          "Baueinheit > Schicht > Geometrie > Dicke";
        var bezeichnungBaueigenschaftWärmedurchlasswiderstandIstwertSchicht =
          "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert";
        // Nun für alle Schichten in mapRelevanteBaueigenschaftenEinzelschichten
        for (let idSchicht in this
          .mapRelevanteBaueigenschaftenEinzelschichten) {
          let dickeSchicht = this.mapRelevanteBaueigenschaftenEinzelschichten[
            idSchicht
          ][
            this.reverseMapBaueigenschaftenEinzelschicht[
              bezeichnungBaueigenschaftDickeSchicht
            ]
          ]["eigenschaft"]["kennWert1"];
          let lambdaSchicht = this.mapRelevanteBaueigenschaftenEinzelschichten[
            idSchicht
          ][
            this.reverseMapBaueigenschaftenEinzelschicht[
              bezeichnungBaueigenschaftWärmedurchlasswiderstandIstwertSchicht
            ]
          ]["eigenschaft"]["kennWert1"];
          let wärmedurchlasswiderstand =
            dickeSchicht == null || dickeSchicht === 0
              ? 0
              : lambdaSchicht == null || lambdaSchicht === 0
              ? null
              : Math.round((dickeSchicht / 1000 / lambdaSchicht) * 100) / 100; // ACHTUNG: Schichtdicke ist in mm, daher durch 1000 dividieren!
          result.push(wärmedurchlasswiderstand);
        }
        console.log("result nach for: ", result);
        // Berechne Summe:
        result = this.summiereArray(result);
        console.log("result nach summiereArray: ", result);
        // Addiere Rsi und Rse zum result:
        result +=
          this.internerWaermeuebergangswiderstandBerechnet +
          this.externerWaermeuebergangswiderstandBerechnet;
        console.log("result nach Addition Rsi und Rse: ", result);
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[5].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    waermedurchgangskoeffizientBerechnet: function() {
      //-------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Wärmedurchlasswiderstands des Bodenaufbaus nach DIN 6946
      // Ergibt sich aus Rsi + Rse + Summe der Wärmedurchlasswiderstände aller Schichten
      //-------------------------------------------------------------------------------------------------------------------
      console.log("In waermedurchgangskoeffizientBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        let result = null;
        let waermedurchlasswiderstand = this.waermedurchlasswiderstandBerechnet;
        if (
          waermedurchlasswiderstand != null &&
          waermedurchlasswiderstand !== 0
        ) {
          result = 1 / waermedurchlasswiderstand;
          result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
          console.log("Gerundetes result: ", result);
        } // else {
        // result = null; // Schon oben gesetzt
        // }
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[6].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmedurchgangskoeffizient > Istwert"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    internerWaermeuebergangswiderstandBerechnet: function() {
      //-------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Rsi des Bodenaufbaus nach DIN 6946
      // Dieser beträgt für normal beheizte und niedrig beheizte Räume 0.17
      // D.h. "Baueinheit > Bodenaufbau > Wärmeschutz > Angrenzungssituation" muss nicht abgefragt werden
      // Bei Fußbodenheizung beträgt er 0.0.
      // D.h. "Baueinheit > Bodenaufbau > Wärmeschutz > Flächenheizung?" muss abgefragt werden
      //-------------------------------------------------------------------------------------------------------------------
      console.log("In internerWaermeuebergangswiderstandBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        let result = null;
        let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
          .rubrikenInTab[3].baueigenschaftenInRubrik[2]; // "Baueinheit > Bodenaufbau > Wärmeschutz > Flächenheizung?"
        let istwertIndex = eigenschaft.indexInProfilModelAusgewaehlterKnoten;
        let flächenheizung = this.profilModelAusgewaehlterKnoten[istwertIndex]
          .wahrheitsWert;
        if (flächenheizung) {
          result = 0;
        } else {
          result = 0.17;
        }
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Intern"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    externerWaermeuebergangswiderstandBerechnet: function() {
      //-------------------------------------------------------------------------------------------------------------------
      // NEU: Computed-Funktion zur Berechnung des Rse des Bodenaufbaus nach DIN 6946
      // Dafür muss "Baueinheit > Bodenaufbau > Wärmeschutz > Angrenzungssituation" abgefragt werden:
      //   "gegen niedrig beheizten Raum": Rse = 0.17
      //   "gegen Außenluft": Rse = 0.04
      //   "gegen Erdreich": Rse = 0.0
      // Bei anderen Werten sollte sicherheitshalber null returned werden
      //-------------------------------------------------------------------------------------------------------------------
      console.log("In externerWaermeuebergangswiderstandBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        let result = null;
        let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
          .rubrikenInTab[3].baueigenschaftenInRubrik[1]; // "Baueinheit > Bodenaufbau > Wärmeschutz > Angrenzungssituation"
        let istwertIndex = eigenschaft.indexInProfilModelAusgewaehlterKnoten;
        let angrenzungssituation = this.profilModelAusgewaehlterKnoten[
          istwertIndex
        ].aufzaehlungsWert; // ACHTUNG: Ist beim ersten Mal array of String! Danach nur noch String! Muss hier gehandelt werden:
        if (angrenzungssituation == null || angrenzungssituation === []) {
          return null;
        }
        console.log(
          "typeof angrenzungssituation: ",
          typeof angrenzungssituation
        );
        if (typeof angrenzungssituation !== "string") {
          // Array
          angrenzungssituation = angrenzungssituation[0];
        }
        console.log("angrenzungssituation: ", angrenzungssituation);
        switch (angrenzungssituation) {
          case "gegen niedrig beheizte Räume":
            result = 0.17;
            break;
          case "gegen Außenluft":
            result = 0.04;
            break;
          case "gegen Erdreich":
            result = 0.0;
            break;
          default:
          // result = null // Schon oben gesetzt
        }
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[3]
              .baueigenschaftenInRubrik[4].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Wärmeschutz > Wärmeübergangswiderstand > Extern"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    dickeRohbodenBerechnet: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In dickeRohbodenBerechnet");
      if (
        this.mapBaueigenschaftenGesamtschichtaufbau != null &&
        this.profilModelAusgewaehlterKnoten != null
      ) {
        var result = this.getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(
          "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
          this.elementeSchichtpaketRohboden, // ACHTUNG: Nur die Elemente im Rohboden!!!
          "Baueinheit > Schicht > Geometrie > Dicke"
        );
        // Berechne Summe
        let eigenschaft = this.layoutBaueigenschaftsProfilFormular[0]
          .rubrikenInTab[1].baueigenschaftenInRubrik[2];
        let istwertIndex = eigenschaft.indexInProfilModelAusgewaehlterKnoten;
        console.log(
          this.reverseMapBaueigenschaftenGesamtschichtaufbau[
            "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Oberkante (OKFFB) > Absenkung" // NEU: #281/#302
            // "Baueinheit > Bodenaufbau > Geometrie > Rohdecke > Absenkung > Istwert" // ALT
          ]
        );
        result =
          this.summiereArray(result) -
          this.profilModelAusgewaehlterKnoten[istwertIndex].kennWert1;
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Geometrie > Rohboden > Dicke"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    aufbauhoeheFertigbodenBerechnet: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In aufbauhoeheFertigbodenBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        var result = this.getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(
          "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
          this.elementeSchichtpaketBodenoberseite, // ACHTUNG: Nur die Elemente im Fertigboden!!!
          "Baueinheit > Schicht > Geometrie > Dicke"
        );
        // Berechne Summe
        result = this.summiereArray(result);
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Geometrie > Fertigboden > Aufbauhöhe"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    dickeBodenunterseiteBerechnet: function() {
      //-----------------------------------------------------------------------------------------------------------------
      console.log("In dickeBodenunterseiteBerechnet");
      if (this.mapBaueigenschaftenGesamtschichtaufbau != null) {
        var result = this.getListeVonKennwertenFuerAlleSchichtenMitBestimmtenSchichttypen(
          "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ",
          this.elementeSchichtpaketBodenunterseite, // ACHTUNG: Nur die Elemente der Bodenunterseite!!!
          "Baueinheit > Schicht > Geometrie > Dicke"
        );
        // Berechne Summe
        result = this.summiereArray(result);
        result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
        console.log("Gerundetes result: ", result);
        // Nun per Side Effect das VModel updaten:
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Geometrie > Bodenunterseite > Dicke"
          ],
          "kennWert1",
          result
        );
        return result;
      }
      return this.mapBaueigenschaftenGesamtschichtaufbau;
    },

    gesamtdickeBodenBerechnet: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Hier spezielle Berechnung aus obiger Map!
      //===========================================================================================================
      // TODO XXXXXX #302: Hier kommt es zu Rundungsfehlern, z.B. 0,6999999999999 statt 0,7
      // Vorläufig auf 2 Stellen nach dem Komma gerundet, muss im Kontext mit Einheit (mm oder m) angepasst werden!
      //===========================================================================================================
      console.log("In gesamtdickeBodenBerechnet");
      let computedAufbauhoeheFertigboden = this.aufbauhoeheFertigbodenBerechnet;
      // console.log("computedAufbauhoeheFertigboden: ", computedAufbauhoeheFertigboden);
      // console.log("typeof computedAufbauhoeheFertigboden: ", typeof computedAufbauhoeheFertigboden);
      let computedDickeRohboden = this.dickeRohbodenBerechnet;
      let computedDickeBodenunterseite = this.dickeBodenunterseiteBerechnet;
      let result =
        computedAufbauhoeheFertigboden +
        computedDickeRohboden +
        computedDickeBodenunterseite;
      console.log("result: ", result);
      result = Math.round(result * 100) / 100; // TODO XXXXXX #302 - gegen Rundungsfehler! Vorläufig auf 2 Stellen gerundet
      console.log("Gerundetes result: ", result);
      // Nun per Side Effect das VModel updaten:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
            .baueigenschaftenInRubrik[4].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Bodenaufbau > Geometrie > Gesamtdicke"
        ],
        "kennWert1",
        result
      );
      return result;
    }
  },

  //=================================================================================================================================================
  mounted: function() {
    //-----------------------------------------------------------------------------------------------------------------
    this.mapBaueigenschaftenLayoutFile = {};
    this.createMapEigenschaftenInLayoutFile().forEach(i => {
      this.mapBaueigenschaftenLayoutFile[i.baueigenschaftsBezeichnung] = i;
      return 0;
    });
    Promise.all([this.readProfilEinzelschicht(), this.readZugehoerigesProfil()])
      .then(() => {
        // this.voraussetzungenZurAnzeigeErfuellt = this.pruefeVoraussetzungen();
        this.getChildrenOfCurrentNode(); //readZugehoerigesProfil();
        // this.gesamtschichtKnoten = this.baueGesamtschichtDatenstruktur();
        // console.log("Gesamtschichtknoten: ", this.gesamtschichtKnoten);
        this.erstelleDatenstrukturen(
          this.currentlySelectedNode,
          this.alleSchichtknoten,
          this.zuFormularGehoerigesProfil,
          this.profilEinzelschicht
        );
        return 0;
      })
      .then(() => this.createArbeitskopieBodenaufbauKnoten())
      // Catch-Block für Error, wenn zugehöriges Profil nicht gefunden wurde:
      .catch(error => {
        console.log("Error aus readBaueigenschaftsProfil() - error: ", error);
        // Die Benutzernachricht wird bereits in readZugehoerigesProfil() ausgelöst, daher hier unterdrückt:
        /*
      globalStore.showBenutzerNachricht(
        BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER
      );
      */
      }); // /.catch
    // /mounted:
  },

  beforeDestroy: function() {
    //-----------------------------------------------------------------------------------------------------------------
    // Test für Lifecycle Hook - Alert-Meldung beim Abbau der Komponente
    // ACHTUNG: Wird nicht ausgelöst, falls keep-alive aktiv an q-tab-panels für Fachliche Planung!!!
    console.log("In beforeDestroy() von Bodenaufbau");
    // Alert-Meldung - disabled, siehe https://quasar.dev/quasar-plugins/notify#With-actions
    // this.$q.notify({
    //    message: 'Jim just pinged you.',
    //    color: 'primary',
    //    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    //    actions: [
    //      { label: 'Reply', color: 'yellow', handler: () => { /* ... */ } },
    //      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    //    ]
    // })
    /*
    globalStore.showBenutzerNachricht(
        BenutzerNachrichten.XYZ
      );
    */
  } // /beforeDestroy
};
</script>
