<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für spezifisches Baueigenschaftsprofilformular für Baueigenschaftsprofil Schicht"                              -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- ======================================================================================================================================================== -->
  <!-- ACHTUNG - WICHTIG:                                                                                                                                       -->
  <!-- Dieses Profilformular für die Schicht muss Update Events beim Updaten von Kennwerten und Aufzählungswerten an den Bodenaufbau schicken,                  -->
  <!-- damit dieser reaktiv abgeleitete Größen berechnen kann (wie z.B. die Gesamtdicke des Bodenaufbaus und den Wärmedurchlasswiderstand des Bodenaufbaus).    -->
  <!-- Diese werden aus Feldern in den Schichten berechnet (Dicke der Schicht, Wärmedurchlasswiderstand der Schicht)                                            -->
  <!-- Dazu gib es die Events eigenschaft-kennwert-update und eigenschaft-aufzaehlungswert-update, die mit $emit gesendet werden aus dieser Schicht-Komoponente -->
  <!-- an die Elternkomponente für den Bodenaufbau. Bei Änderungen nicht vergessen!!!                                                                           -->
  <!-- ACHTUNG: Für Aufzählungswerte wird der Update Event zentral in den Funktionen selectModelChangedAufzaehlungsWert...() gefeuert!                          -->
  <!--          Für Kennwerte werden die Update Events in @input-Methoden an den q-inputs gefeuert!                                                             -->
  <!--          Für computed-Werte müssen ggf. solche Events in den computed-Funktionen gefeuert werden! Beispiel: waermedurchlasswiderstandSchichtBerechnet    -->
  <!-- ======================================================================================================================================================== -->
  <q-form
    class="q-pa-xs"
    v-if="profilModelAusgewaehlterKnoten != null && mountedDone"
  >
    <!-- ACHTUNG: Die obige null-Prüfung ist unbedingt notwendig, da der Array profilModelAusgewaehlterKnoten, während das Template erstmals gerendered wird, -->
    <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
    <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
    <!--          profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
    <div
      class="q-pa-xs row full-width bg-brown-3 text-subtitle1"
      v-if="zuFormularGehoerigesProfil"
    >
      <!-- ALT: -->
      <!--
        Formular für Baueigenschaften im Baueigenschaftsprofil <strong>"{{
          zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung
       }}"</strong> an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
       -->
      <!-- NEU: -->
      <!-- Unklar, warum hier &nbsp; für Abstände erforderlich sind! -->
      Eigenschaften der Schicht &nbsp;<strong
        >"{{ selectedNode.baueinheitsBezeichnung }}"</strong
      >
    </div>
    <div v-if="profilFormularIstReadonly === true" class="text-caption">
      <mark><b>Hinweis:</b> Dieses Formular dient nur zur <b>Anzeige</b> von Werten der links im Bauvorhabenbaum ausgewählten Schicht.
      <br />
      <b>Änderungen</b> der Werte für die Schicht können durch <b>Auswahl des Elternknotens der Schicht</b> links im Bauvorhabenbaum vorgenommen werden.
      <br/>
      Dort steht im <b>Profilformular 'Bodenaufbau'</b> für jede Schicht ein ausklappbares Unterformular für <b>Werteeingaben</b> zur Verfügung.</mark>
    </div>
    <div v-if="profilBezeichnung !== 'Baueinheit > Schicht'">
      ACHTUNG - Aufruf Profilformular für "Schicht" mit falscher
      Profilbezeichnung: {{ profilBezeichnung }}
    </div>
    <div v-else>
      <!-- ========================================================================================= -->
      <!-- Start Code für spezifisches Baueigenschaftsprofilformular für Schicht mit v-for-Steuerung -->
      <!-- ----------------------------------------------------------------------------------------- -->
      <q-separator />
      <div class="row full-width q-pa-xs q-col-gutter-xs bg-brown-2">
        <!-- =========== ACHTUNG: In erster Spalte q-pl-none zusätzlich, sonst ist der Spaltentext zu weit rechts!!! ================== -->
        <div class="col-md-3 col-12 q-pl-none q-pr-xs q-pt-xs q-pb-xs">
          <b>Baueigenschaft</b>
        </div>
        <div class="col-md-1 col-12 q-pa-xs">
          <b>Symbol</b>
        </div>
        <!-- NEU: Nur eine Spalte "Einheit" hinter "Symbol", wegen Einheitlichkeit mit Profilformular "Bodenaufbau": -->
        <div class="col-md-1 col-12 q-pa-xs">
          <b>Einheit</b>
        </div>
        <div class="col-md-3 col-12 q-pa-xs q-col-gutter-xs">
          <b>Sollwert für die Schicht</b>
          <div class="text-caption">
            <b>Hinweis:</b> Cyanfarbige Felder sind ererbt z.B. vom Raum oder
            Bodenaufbau, hellgrüne Felder sind berechnet
          </div>
        </div>
        <div class="col-md-1 col-12 q-pa-xs q-col-gutter-xs text-center">
          <b>Vergleich</b>
        </div>
        <div class="col-md-3 col-12 q-pa-xs q-col-gutter-xs">
          <b>Istwert für die Schicht</b>
          <div class="text-caption">
            <b>Hinweis:</b> Hellgrüne Felder sind berechnet
          </div>
        </div>
        <!-- ALT: -->
        <!--
          <div class="col-md-1 col-12 q-pa-xs">
            <b>Einheit</b>
          </div>
          -->
        <!-- ALT: bemerkung, ersetzt durch Tooltip auf den Eingabefeldern -->
        <!--
          <div class="col-md-3 col-12 q-pa-xs">
            <b>Bemerkung</b>
          </div>
          -->
      </div>
    </div>
    <q-separator />
    <!-- Das folgende <div> iteriert per v-for über alle Rubriken: -->
    <!-- ALT - div statt q-expansion-item: -->
    <!--
    <div
      v-for="rubrik in layoutBaueigenschaftsProfilFormular"
      :key="rubrik.ueberschriftRubrik"
    >
      <div class="row full-width bg-brown-1">
        <b>
          {{ rubrik.ueberschriftRubrik }}
        </b>
      </div>
    -->
    <!-- NEU: Hier q-expansion-item statt div -->
    <!-- TODO: Mit computed v-model, das in Abhängigkeit vom Schichttyp berechnet, ob eine Rubrik geöffent wird oder nicht -->
    <!-- Ginge aber nur ohne v-for und mit separater computed-Funktion pro Rubrik, da diese bekannt sein muss und computed-Funktionen keine Parameter haben können! -->
    <q-expansion-item
      v-for="rubrik in layoutBaueigenschaftsProfilFormular"
      :key="rubrik.ueberschriftRubrik"
      dense
      expand-separator
      switch-toggle-side
      header-class="q-pa-none text-black bg-brown-1 text-bold inset-shadow-down"
      class="q-pa-none text-black inset-shadow-down"
      :label="rubrik.ueberschriftRubrik"
      default-opened
    >
      <!-- Das folgende <div> iteriert per v-for über alle Baueigenschaften im Array layoutBaueigenschaftsProfilFormular. -->
      <!-- Dann wird per profilModelAusgewaehlterKnoten(eigenschaft.indexInProfilModelAusgewaehlterKnoten) auf den -->
      <!-- zweiten Array profilModelAusgewaehlterKnoten, der die Werte für die Baueigenschaften etc. enthält, zugegriffen -->
      <div
        v-for="eigenschaft in rubrik.baueigenschaftenInRubrik"
        :key="eigenschaft.baueigenschaftsBezeichnung"
      >
        <div class="q-pa-none bg-grey-1">
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
          <div class="row items-start q-pa-none">
            <div class="col-md-3 col-12 q-pa-xs self-top">
              <!-- ALT: -->
              <!--
              {{
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              }}
              -->
              <!-- NEU: -->
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
              class="col-md-1 col-12 q-pa-xs q-pr-none self-top"
              :src="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.symbol
              "
            />
            <div v-else class="col-md-1 col-12 q-pa-xs self-top"></div>
            <!-- ------------------------------------------------------------------------------------------------------------------------ -->
            <!-- Einheit:                                                                                                                 -->
            <!-- ------------------------------------------------------------------------------------------------------------------------ -->
            <q-markdown
              v-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
              "
              class="col-md-1 col-12 q-pa-xs"
              :src="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.einheit
              "
            />
            <div v-else class="col-md-1 col-12 q-pa-xs"></div>
            <!-- Nur für Testzwecke: -->
            <!-- @input="kennWert1InputHandler($event, eigenschaft)" -->
            <!-- -------------------------------------------------------------------------------------------------------- -->
            <!-- ALT: Experimentelle computed-Berechnung für "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert" -->
            <!--
            <q-input
              v-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
                  'Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert' &&
                (profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar')
              "
              readonly
              class="col-md-3 col-12 q-pa-xs q-gutter-sm"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              :value="computeWaermedurchlasswiderstandSchicht
              "
              type="number"
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
            -->
            <!-- --------------------------------------------------------------------------------- -->
            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
            <!-- ALT: content-class="my-tooltip"                                                   -->
            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
            <!-- --------------------------------------------------------------------------------- -->
            <!--
              <q-tooltip
                v-if="
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
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
            -->
            <!-- ----------------------------------------------------------------------------------- -->
            <!-- =============================================================================================================== -->
            <!-- Hier beginnen die Input-Felder für die SOLLWERTE!!! -->
            <!-- Auf diese wird aus dem Feld indexSollwertInProfilModelAusgewaehlterKnoten ihres Istwerts im Layout zugegriffen! -->
            <!-- =============================================================================================================== -->
            <div
              v-if="eigenschaft.baueigenschaftsBezeichnungSollwert == null"
              class="col-md-3 col-12 q-pa-xs"
            />
            <!-- D.h. diese Sollwert-Spalte leer lasssen, falls kein Sollwert im Layout-File definiert ist für diese Eigenschaft!!! -->
            <!-- ======================================================================================================================================================= -->
            <!-- NEU: Von höheren Knoten im Baum ererbte (Soll-)Werte als readonly-Felder in Farbe cyan-2 rendern -->
            <!-- Dazu profilModelAusgewaehlterKnoten[eigenschaft.indexInProfilModelAusgewwehlterKnoten].bezeichnungWerteVererbenderElternknoten != null abfragen -->
            <!-- Es gibt auch Sollwerte, die nicht von einem höheren Knoten im Baum ererbt werden! Dann ist dieses Feld null -->
            <!-- Diese dürfen nicht readonly sein und die Farbe muss teal-2 sein -->
            <!-- Dies gilt für alle Arten von Wertetypen! -->
            <!-- ======================================================================================================================================================= -->
            <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
            <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip -->
            <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- NEU: computed-Feld auch für Sollwerte (vorläufig nur hier bei Kennwerten) -->
            <!--      Steuerung per v-if mittels zusätzlicher Property "benutzeComputedWertSollwert" im Layout File  -->
            <!--      Die computed-Funktion ist mittels mapOfComputedProperties wie bei den Istwerten implementiert -->
            <!-- ======================================================================================================================================================= -->
            <!-- ACHTUNG: Hier sicherheitshalber $emit("eigenschaft-kennwert-update"), für computed Sollwert. Eventuell werden auch solche am Bodenaufbau verarbeitet?!? -->
            <!-- ======================================================================================================================================================= -->
            <q-input
              v-else-if="
                eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar') &&
                  eigenschaft.benutzeComputedWertSollwert
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable ||
                  eigenschaft.benutzeComputedWertSollwert
              "
              class="col-md-3 col-12 q-pa-xs q-gutter-sm"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].bezeichnungWerteVererbenderElternknoten != null ||
                !profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].aktiviertNichtDeaktiviert ||
                eigenschaft.disable ||
                eigenschaft.benutzeComputedWertSollwert
                  ? ''
                  : 'number'
              "
              bg-color="
                green-2
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @input="
                $emit(
                  'eigenschaft-kennwert-update',
                  $event,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ],
                  selectedNode
                )
              "
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <!-- --------------------------------------------------------------------------------------- -->
            <!-- Es folgen die reguären Eingabefelder für die erste Spalte: -->
            <!-- ======================================================================================================================================================= -->
            <!-- ACHTUNG: Hier $emit("eigenschaft-kennwert-update"), für Sollwert-Feld -->
            <!-- ======================================================================================================================================================= -->
            <q-input
              v-else-if="
                eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pa-xs"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].kennWert1
              "
              @input="
                $emit(
                  'eigenschaft-kennwert-update',
                  $event,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ],
                  selectedNode
                )
              "
              :type="
                !benutzerDarfBearbeitenSelectedNode ||
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].bezeichnungWerteVererbenderElternknoten != null ||
                !profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].aktiviertNichtDeaktiviert ||
                eigenschaft.disable
                  ? ''
                  : 'number'
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert' ||
                      profilModelAusgewaehlterKnoten[
                        eigenschaft
                          .indexSollwertInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar')
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <!-- --------------------------------------------------------------------------------------- -->
            <q-input
              v-else-if="
                eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Bezeichnungswertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pa-xs"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].bezeichnungsWert1
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-input>
            <!-- --------------------------------------------------------------------------------- -->
            <q-input
              v-else-if="
                eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Tageszeitwertepaar')
              "
              :readonly="
                !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pa-xs"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].tagesZeitWert1
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
              <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh) und zurück in submitWerteAnBaueinheit wie in QDate sind für QTime überflüssig, -->
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
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pa-xs"
              :label="
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].datumsWert1
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
              <!-- Das Datumsfeld kommt im Mongoose Format aus der Datenbank (Date-Objekt, YYYY-MM-DDTHH:MM:SS.000Z -->
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
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pl-sm q-pa-xs"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              :value="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].aufzaehlungsWert
              "
              :options="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft
                  .selektierbareOptionenAufzaehlungsWert
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].bezeichnungWerteVererbenderElternknoten != null
                  ? 'cyan-2'
                  : 'teal-2'
              "
              standout="bg-teal-4 text-black"
              square
              dense
              @input="
                selectModelChangedAufzaehlungswertSollwert(eigenschaft, $event)
              "
              @focus="
                setzeFelderFuerFachlicheHilfe(
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-select>
            <!-- --------------------------------------------------------------------------------- -->
            <q-toggle
              v-else-if="
                eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
              "
              :readonly="
                profilFormularIstReadonly ||
                  !benutzerDarfBearbeitenSelectedNode ||
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].bezeichnungWerteVererbenderElternknoten != null ||
                  !profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].aktiviertNichtDeaktiviert ||
                  eigenschaft.disable
              "
              class="col-md-3 col-12 q-pa-xs"
              :label="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                ].wahrheitsWert
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                }}
              </q-tooltip>
            </q-toggle>
            <div
              v-else-if="eigenschaft.baueigenschaftsBezeichnungSollwert != null"
              class="col-md-3 col-12 q-pa-xs"
            >
              Nicht unterstützter Wertetyp
              <!-- ALT -->
              <!-- NEU: Seit dem computed auch für Sollwert-Felder oben läuft der Code in Zeilen mit leeren Sollwerten, d.h. nur Istwerten, hier rein -->
              <!--      und produziert diese Anzeige mitsamt Spillover der Zeile rechts! -->
              <!--      Abgefangen mit v-else-if oben -->
            </div>
            <!-- Ende 1. Spalte für die Input-Felder (QInput, QSelect, QToggle)  -->
            <!-- --------------------------------------------------------------- -->
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
              <div v-if="eigenschaft.operatorSollIstWerteVergleich != null">
                {{ eigenschaft.operatorSollIstWerteVergleich }}
                <!-- ============================================================================================= -->
                <!-- NEU: Checkmarks für für Bewertung: -->
                <!-- ACHTUNG: Wenn diese nicht in das obige div am operator eingebettet sind, gibt es einen größeren Abstand!!! -->
                <!-- ACHTUNG: Ohne die class="text-center" gibt es trotzdem einen Zeilenumbruch zwischen operator und displayCheckMark()! -->
                <!-- <div class="col-md-1 col-12 self-center" -->
                <!-- ALT - in separater Spalte hinten -->
                <!-- -------------------------------------------------------------- -->
                <div
                  v-if="
                    eigenschaft.baueigenschaftsBezeichnung ===
                      'Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert'
                  "
                >
                  <!--  {{ computeWaermedurchlasswiderstandSchichtSollIstWerteVergleich }} -->
                  <div
                    v-if="
                      computeWaermedurchlasswiderstandSchichtSollIstWerteVergleich ===
                        true
                    "
                    class="text-center"
                  >
                    {{ displayCheckMark(true) }}
                  </div>
                  <div
                    v-else-if="
                      computeWaermedurchlasswiderstandSchichtSollIstWerteVergleich ===
                        false
                    "
                    class="text-red"
                  >
                    {{ displayCheckMark(false) }}
                  </div>
                </div>
                <!-- -------------------------------------------------------------- -->
                <div
                  v-else-if="
                    eigenschaft.baueigenschaftsBezeichnung ===
                      'Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert'
                  "
                >
                  <!--  {{ computeWaermeleitfaehigkeitSchichtSollIstWerteVergleich }} -->
                  <div
                    v-if="
                      computeWaermeleitfaehigkeitSchichtSollIstWerteVergleich ===
                        true
                    "
                    class="text-center"
                  >
                    {{ displayCheckMark(true) }}
                  </div>
                  <div
                    v-else-if="
                      computeWaermeleitfaehigkeitSchichtSollIstWerteVergleich ===
                        false
                    "
                    class="text-red"
                  >
                    {{ displayCheckMark(false) }}
                  </div>
                </div>
                <!-- -------------------------------------------------------------- -->
                <div
                  v-else-if="
                    eigenschaft.baueigenschaftsBezeichnung ===
                      'Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert'
                  "
                >
                  <!--  {{ computeEstrichbiegezugfestigkeitsklasseSchichtSollIstWerteVergleich }} -->
                  <div
                    v-if="
                      computeEstrichbiegezugfestigkeitsklasseSchichtSollIstWerteVergleich ===
                        true
                    "
                    class="text-center"
                  >
                    {{ displayCheckMark(true) }}
                  </div>
                  <div
                    v-else-if="
                      computeEstrichbiegezugfestigkeitsklasseSchichtSollIstWerteVergleich ===
                        false
                    "
                    class="text-red"
                  >
                    {{ displayCheckMark(false) }}
                  </div>
                </div>
                <!-- -------------------------------------------------------------- -->
                <div
                  v-else-if="
                    eigenschaft.baueigenschaftsBezeichnung ===
                      'Schicht > Estrich > Härteklasse > Istwert'
                  "
                >
                  <!--  {{ computeEstrichhaerteklasseSchichtSollIstWerteVergleich }} -->
                  <div
                    v-if="
                      computeEstrichhaerteklasseSchichtSollIstWerteVergleich ===
                        true
                    "
                    class="text-center"
                  >
                    {{ displayCheckMark(true) }}
                  </div>
                  <div
                    v-else-if="
                      computeEstrichhaerteklasseSchichtSollIstWerteVergleich ===
                        false
                    "
                    class="text-red"
                  >
                    {{ displayCheckMark(false) }}
                  </div>
                </div>
                <!-- -------------------------------------------------------------- -->
                <div
                  v-else-if="
                    eigenschaft.baueigenschaftsBezeichnung ===
                      'Schicht > Nutzlasten > Flächenlast > Istwert'
                  "
                >
                  <!--  {{ computeFlaechenlastSchichtSollIstWerteVergleich }} -->
                  <div
                    v-if="
                      computeFlaechenlastSchichtSollIstWerteVergleich === true
                    "
                    class="text-center"
                  >
                    {{ displayCheckMark(true) }}
                  </div>
                  <div
                    v-else-if="
                      computeFlaechenlastSchichtSollIstWerteVergleich === false
                    "
                    class="text-red"
                  >
                    {{ displayCheckMark(false) }}
                  </div>
                </div>
                <!-- ------------------------------------------------------------------------------------------------------------------ -->
                <div v-else>
                  <!-- Fehlerhafte Baueigenschaftsbezeichnung -->
                  <!-- Hier nach obigem Muster mit v-if weitere computed-Felder einfügen -->
                </div>
              </div>
            </div>
            <!-- ================================================================================================================================ -->
            <!-- Start 2. Spalte für die Input-Felder (QInput) bei Wertepaaren (ALT)/Sollwerte (NEU)  -->
            <!-- ====================================================================================================== -->
            <!-- NEU: Mittels Prop nurSollWertAnzeigen im Layout File kann die Anzeige der Istwerte unterdrückt werden! -->
            <!-- ACHTUNG: Gleichzeitig sollte Prop operatorSollIstWerteVergleich: null, gesetzt werden!                 -->
            <!-- ====================================================================================================== -->
            <!-- ****************************************************************************************************** -->
            <!-- START disableter alter Code für Anzeige von Wertepaaren in der 2. Spalte statt Istwerten:              -->
            <!-- ****************************************************************************************************** -->
            <!-- ======================================================================================================================================================= -->
            <!-- ALT: Von höheren Knoten im Baum ererbte (Soll-)Werte als readonly-Felder in Farbe cyan-2 rendern -->
            <!-- Dazu profilModelAusgewaehlterKnoten[eigenschaft.indexSollwertInProfilModelAusgewwehlterKnoten].bezeichnungWerteVererbenderElternknoten != null abfragen -->
            <!-- Es gibt auch Sollwerte, die nicht von einem höheren Knoten im Baum ererbt werden! Dann ist dieses Feld null -->
            <!-- Diese dürfen nicht readonly sein und die Farbe muss teal-2 sein -->
            <!-- Dies gilt für alle Arten von Wertetypen! -->
            <!-- ======================================================================================================================================================= -->
            <!--
            <q-input
              v-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
              "
              :readonly="
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
                ].kennWert2
              "
              @input="
                $emit(
                  'eigenschaft-kennwert-update',
                  $event,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ],
                  selectedNode
                )
              "
              type="number"
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft
                    .indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                )
              "
            >
            -->
            <!-- --------------------------------------------------------------------------------- -->
            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
            <!-- ALT: content-class="my-tooltip"                                                   -->
            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
            <!-- --------------------------------------------------------------------------------- -->
            <!--
              <q-tooltip
                v-if="
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
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
            -->
            <!--
            <q-input
              v-else-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwertepaar'
              "
              :readonly="
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
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
              "
              v-model="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].tagesZeitWert2
              "
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft
                    .indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                )
              "
              mask="##:##"
            >
            -->
            <!-- --------------------------------------------------------------------------------- -->
            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
            <!-- ALT: content-class="my-tooltip"                                                   -->
            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
            <!-- --------------------------------------------------------------------------------- -->
            <!--
              <q-tooltip
                v-if="
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwertepaar'
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
              -->
            <!-- NEU: Mit QTime Code unten, statt /> -->
            <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------ -->
            <!-- Code für Quasar q-time -->
            <!-- Hinweis: In baueinheiten.vue und baustofffe.vue ist q-time aktuell disabled zugunsten von alternativem native Time (Browser TimePicker) an q-input-Feldern -->
            <!-- für tagesZeitWert1/2 mittels type="time", allerdings dürfen diese q-input Felder dann keine autogrow Prop haben!!! -->
            <!-- Varianten für mask: -->
            <!-- Gewählt: mask="HH:mm", HH steht für 24-Stunden-Format -->
            <!-- ACHTUNG: Erfordert am q-input oben ebenfalls ein mask="##:##" -->
            <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh) und zurück in submitWerteAnBaueinheit wie in QDate sind für QTime überflüssig, -->
            <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
            <!-- Es folgt der Code für q-time: -->
            <!-- :locale="dateLocale" -->
            <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
            <!--
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      :readonly="
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
            -->
            <!--
            <q-input
              v-else-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar'
              "
              :readonly="
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
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft
                    .indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                )
              "
              mask="##.##.####"
            >
            -->
            <!-- --------------------------------------------------------------------------------- -->
            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
            <!-- ALT: content-class="my-tooltip"                                                   -->
            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
            <!-- --------------------------------------------------------------------------------- -->
            <!--
              <q-tooltip
                v-if="
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar'
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
              -->
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
            <!-- Das Datumsfeld kommt im Mongoose Format aus der Datenbank (Date-Objekt, YYYY-MM-DDTHH:MM:SS.000Z -->
            <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
            <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
            <!-- und neueBaueigenschaft.datumsWert1/2 -->
            <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
            <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteanBaueinheit() - siehe Kommentare dort! -->
            <!-- Es folgt der Code für q-date: -->
            <!-- :locale="dateLocale" -->
            <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
            <!--
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :readonly="
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
            -->
            <!--
            <q-input
              v-else-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswertepaar'
              "
              :readonly="
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
              :bg-color="
                profilModelAusgewaehlterKnoten[
                  eigenschaft
                    .indexInProfilModelAusgewaehlterKnoten
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
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                )
              "
            >
            -->
            <!-- --------------------------------------------------------------------------------- -->
            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
            <!-- ALT: content-class="my-tooltip"                                                   -->
            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
            <!-- --------------------------------------------------------------------------------- -->
            <!--
              <q-tooltip
                v-if="
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp ===
                    'Bezeichnungswertepaar'
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
            -->
            <!--
            <div v-else class="col-md-3 col-12 q-pa-xs"></div>
            -->
            <!-- Ende 2. Spalte für die Input-Felder (QInput, QSelect) bei Paaren -->
            <!-- ------------------------------------------------------------------->
            <!-- NEU: Spalte "Einheit" hier weggelassen, wegen Einheitlichkeit mit Profilformular "Bodenaufbau": -->
            <!--
            <q-markdown
              v-if="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
              "
              class="col-md-1 col-12 q-pa-xs"
              :src="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.einheit
              "
            />
            <div v-else class="col-md-1 col-12 q-pl-sm"></div>
            -->
            <!-- ------------------------------------------------------------------->
            <!-- ALT: bemerkung, ersetzt durch Tooltip auf den Eingabefeldern -->
            <!--
            <div class="col-md-3 col-12">
              {{
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
              }}
            </div>
            -->
            <!-- Spezielle Felder, nur bei generischem Baueigenschaftsprofilformular: -->
            <!-- Die folgende Information erzeugt einen Spillover über rechten Rand, deshalb disabled: -->
            <!--
            <div class="col-md-2 col-12  q-pa-xs">
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
            -->
            <!-- ****************************************************************************************************** -->
            <!-- ENDE disableter alter Code für Anzeige von Wertepaaren in der 2. Spalte statt Istwerten:              -->
            <!-- ****************************************************************************************************** -->
            <!-- ================================================================================================================================ -->
            <!-- Start der Spalte für die Input-Felder der ISTWERTE - auf diese wird direkt per indexInProfilModelAusgewaehlterKnoten zugegriffen -->
            <!-- ====================================================================================================== -->
            <!-- NEU: Mittels Prop nurSollWertAnzeigen im Layout File kann die Anzeige der Istwerte unterdrückt werden! -->
            <!-- ACHTUNG: Gleichzeitig sollte Prop operatorSollIstWerteVergleich: null, gesetzt werden!                 -->
            <!-- ====================================================================================================== -->
            <!-- ====================================================================================================== -->
            <!-- ACHTUNG: Hier bei Kennwerten und Kennwertepaaren Unterscheidung, ob benutzeComputedWert == false ist    -->
            <!-- ACHTUNG: Ist vorläufig nur für diese Wertetypen implementiert!!!                                       -->
            <!-- ====================================================================================================== -->
            <!-- ======================================================================================================================================================= -->
            <!-- ACHTUNG: Hier $emit("eigenschaft-kennwert-update") für Istwert, Event an den Bodenaufbau -->
            <!-- ======================================================================================================================================================= -->
            <q-input
              v-if="
                !eigenschaft.nurSollWertAnzeigen &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp == 'Kennwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp == 'Kennwertepaar') &&
                  eigenschaft.benutzeComputedWert == false
              "
              :readonly="
                profilFormularIstReadonly ||
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
                ].kennWert1
              "
              @input="
                $emit(
                  'eigenschaft-kennwert-update',
                  $event,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ],
                  selectedNode
                )
              "
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
            <!-- ======================================================================================================================================================= -->
            <!-- ACHTUNG: Hier $emit("eigenschaft-kennwert-update"), bei computed Istwert. Z.B. wird Wärmedurchlasswiderstand hier an der Schicht                        -->
            <!-- computed als Istwert, und dann am Bodenaufbau in der computed-Funktion für den Wärmedurchlasswiderstands des Bodenaufbaus verarbeitet!                  -->
            <!-- ======================================================================================================================================================= -->
            <q-input
              v-else-if="
                !eigenschaft.nurSollWertAnzeigen &&
                  (profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ].typbezogeneBaueigenschaft.werteTyp == 'Kennwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp == 'Kennwertepaar') &&
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
                mapOfComputedProperties[eigenschaft.bezeichnungComputedProperty]
              "
              @input="
                $emit(
                  'eigenschaft-kennwert-update',
                  $event,
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexInProfilModelAusgewaehlterKnoten
                  ],
                  selectedNode
                )
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
                  ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
              "
              :readonly="
                profilFormularIstReadonly ||
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
              :value="
                profilModelAusgewaehlterKnoten[
                  eigenschaft.indexInProfilModelAusgewaehlterKnoten
                ].aufzaehlungsWert
              "
              @input="
                selectModelChangedAufzaehlungswertIstwert(eigenschaft, $event)
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
                    ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
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
                  ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp ==
                      'Tageszeitwertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
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
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
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
                    (profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Tageszeitwert' ||
                      profilModelAusgewaehlterKnoten[
                        eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
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
                    ].typbezogeneBaueigenschaft.werteTyp === 'Datumswert' ||
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
                        profilFormularIstReadonly ||
                          !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten != null ||
                          !profilModelAusgewaehlterKnoten[
                            eigenschaft.indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          eigenschaft.disable
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          eigenschaft.indexInProfilModelAusgewaehlterKnoten
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
                  ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert' ||
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp ===
                      'Bezeichnungswertepaar')
              "
              :readonly="
                profilFormularIstReadonly ||
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
              :readonly="
                profilFormularIstReadonly ||
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
                  eigenschaft.baueigenschaftsBezeichnungSollwert != null &&
                    profilModelAusgewaehlterKnoten[
                      eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                "
                :delay="1000"
                :offset="[0, 10]"
                max-width="500px"
                content-class="bg-secondary text-white text-caption shadow-4"
              >
                {{
                  profilModelAusgewaehlterKnoten[
                    eigenschaft.indexSollwertInProfilModelAusgewaehlterKnoten
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
                    class="col-md-2 col-12  q-pa-xs"
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
                        <div class="col-md-2 col-12  q-pa-xs">
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
                -->
          </div>
          <!-- Ende Zeile für Baueigenschaft                                              -->
          <!-- -------------------------------------------------------------------------- -->
        </div>
        <q-separator />
      </div>
      <!-- Baueigenschaften -->
    </q-expansion-item>
    <!-- /Rubriken -->
    <!-- <q-separator /> -->
    <!----------------------------------------------------------------------------------------------------- -->
    <!-- Start Button Section: -->
    <!-- <q-separator /> -->
    <!-- <div class="row q-pa-xs"> -->
    <!-- TODO XXXXXX - CODE FÜR UNTERSUCHUNG STILLGELEGT, SOLLTE WIEDER AKTIVIERT WERDEN
        <q-btn
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12 stretch full-width"
          style="height: 100%"
          label="Baueigenschaften speichern"
          @click="submitWerteAnBaueinheit()"
          color="positive"
          glossy
          no-caps
        />
      -->
    <!-- Weitere Buttons ebenfalls in dieser Variante DISABLED: -->
    <!--
      <q-btn
        :disable="!benutzerDarfBearbeitenSelectedNode"
        class="col-md-3 col-12 stretch full-width"
        style="height: 100%"
        label="Baueigenschaften speichern"
        @click="changeOccured()"
        color="positive"
        glossy
        no-caps
      />
      -->
    <!-- <div class="col-1" /> -->
    <!--
      <q-btn
        :disable="!benutzerDarfBearbeitenSelectedNode"
        class="col-md-3 col-12 stretch full-width"
        style="height: 100%"
        label="Eingaben auf Originalwerte zurücksetzen"
        @click="resetWerteAnBaueinheit"
        color="deep-orange"
        text-color="white"
        glossy
        no-caps
      />
    </div>
    -->
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
import createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-schicht-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// ACHTUNG - #360: Ist hier Factory-Funktion!!!
export default {
  // name: 'ComponentName',
  props: [
    "profilBezeichnung", // Bezeichnung des anzuzeigenden Baueigenschaftsprofils, sollte für dieses Formular "Baueinheit > Schicht" sein
    "nodes", // Referenz auf nodesTreeBaueinheiten bzw. nodesTreeBaustoffe
    "selectedNode", // Referenz auf selectedNodeTreeBaueinheiten bzw. selectedNodeTreeBaustoffe
    "benutzerDarfBearbeitenSelectedNode", // Boolean, wird in aufrufender Komponente ausgewertet und der Komponente übergeben, für Disabling/Enabling von Feldern
    "profilFormularIstReadonly" // Boolean, true schaltet alle Quasar-Eingabefelder auf readonly.
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // HINWEIS: Zusätzlich wird Refresh-Event von der Komponente gefeuert! @refresh-request-baueigenschafts-profil
    // HINWEIS: Zusätzlich werden noch Update-Events für Kennwerte und Aufzählungswerte gefeuert @update-eigenschaft-kennwert und @update-eigenschaft-aufzaehlungswert...
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore,
      mountedDone: false,
      benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt: false, // Merker für Fehlermeldung, wenn Profilformular nicht gerendert werden kann
      layoutBaueigenschaftsProfilFormular: createLayoutBaueinheitSchichtBaueigenschaftsProfilFormular(), // Array für die Speicherung von Layout-Information für
      // das spezifische Baueigenschaftsprofilformular, wird in mounted() initialisiert - ACHTUNG - #360: Ist hier Factory-Funktion!!!
      // ACHTUNG: Hier unbedingt () für dieses spezielle Factory-Profilformular, sonst Fehler "not iterable"!!!
      profilModelAusgewaehlterKnoten: null, // Array für die Speicherung aller im Profilformular enthaltenen Baueigenschaften, mit deren aktuellen Werten (am ausgewählten Knoten)
      // Aufbau (flach):
      // [{<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }]
      selectedNodeArbeitskopie: null,
      zuFormularGehoerigesProfil: null,
      eigenschaftenAusEltern: null,
      alleBaueigenschaftsProfile: [],
      // NEU: Für Auswahl eines Baueigenschaftsprofils - TODO:
      ausgewaehltesBaueigenschaftsProfil: null,
      bezeichnungenBaueigenschaftsProfile: ["TODO"],
      indexMapFuerProfilModelAusgewaehlterKnoten: [], // Aktuell nicht verwendet, Map um statt per computed-Funktion findeIndexVonBaueigenschaftSchichtdicke den Index
      // für eine Baueigenschaft mit baueigenschaftsBezeichnung im Array profilModelAusgewaehlterKnoten zu finden
      // Beispiel für Aufbau: {"Baueinheit > Schicht > Dicke": 17, ... }
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Baueinheit > Schicht > Dicke"] liefert dann den Index
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Schichtdicke"] liefert dann den Index
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
  //***=====================================================================================================================================
  methods: {
    sollIstWerteVergleich_02: function(
      eigenschaft,
      wertSollwert,
      wertIstwert,
      werteTyp = "Kennwert",
      umrechnungIstWertVonMMNachM = false
    ) {
      console.log(
        `In sollIstWerteVergleich_02() mit ${eigenschaft}, ${wertSollwert}, ${wertIstwert} und ${werteTyp}`
      );
      if (
        wertIstwert == null ||
        wertIstwert === "" ||
        wertIstwert.length === 0
      ) {
        return null;
      }
      if (
        wertSollwert == null ||
        wertSollwert === "" ||
        wertSollwert.length === 0
      ) {
        return null;
      }
      var operator = eigenschaft.operatorSollIstWerteVergleich; // Kommmt aus Layout File
      if (werteTyp === "Kennwert") {
        let istwertKennwert = Number(wertIstwert);
        if (umrechnungIstWertVonMMNachM) {
          // NEU: #305 - Umrechnung für Dicken von mm nach m!!!
          istwertKennwert = istwertKennwert / 1000;
        }
        // console.log("istwertKennwert: ", istwertKennwert);
        // console.log("Typ: ", typeof(istwertKennwert));
        // ACHTUNG: Kennwert-Felder sind am Frontend auch Strings, daher Konvertierung nach Number notwendig!!!
        // ACHTUNG: Number(null) returned 0 - dieser Fall wurde oben schon ausgesteuert!
        let sollwertKennwert = Number(wertSollwert);
        // console.log("solltwertKennwert: ", sollwertKennwert);
        // console.log("operator: ", operator);
        let result = this.doAllgemeinerSollIstWerteVergleich(
          werteTyp,
          sollwertKennwert,
          istwertKennwert,
          operator
        );
        console.log("result: ", result);
        return result;
      } else {
        // Andere Wertetypen, insbesondere "Aufzählungswert"
        let result = this.doAllgemeinerSollIstWerteVergleich(
          werteTyp,
          wertSollwert,
          wertIstwert,
          operator // "Aufzählungswert"
        );
        console.log("result: ", result);
        return result;
      }
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
    },

    disableEingabeFeldInAbhaengigkeitVonSchichttyp(baueigenschaftInLayoutFile) {
      console.log(
        "In disableEingabeFeldInAbhaengigkeitVonSchichttyp() - Parameter baueigenschaftInLayoutFile: ",
        baueigenschaftInLayoutFile
      );
    },

    propertyChangedEventHandler(eventPayload, herkunft) {
      console.log(
        "Aufruf von propertyChangedEventHandler mit payload:",
        eventPayload
      );
      for (let eigenschaft of this.profilModelAusgewaehlterKnoten) {
        var result = this.pruefeDefiniertheitVonEigenschaft(eigenschaft);
        eigenschaft.definiertNichtUndefiniert = result;
      }
      this.changeOccured();
    },

    changeOccured() {
      this.$emit("update:selectedNode", {
        nodeId: this.selectedNode._id,
        updatedEigenschaften: this.profilModelAusgewaehlterKnoten
      });
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
        if (!this.benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt) {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILFORMULAR_BAUEIGENSCHAFTEN_FEHLER
          );
          this.benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt = true;
        }
      }
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

    resetFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: In Abhängigkeit von der vorherigen ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
      //      diverse andere Felder resetten, per Flag im Array layoutBaueigenschaftsProfilFormular
      //========================================================================================================================
      // ACHTUNG: Auf Sollwerte muss aus Layout File mittels indexSollwertInProfilModelAusgewaehlterKnoten zugegriffen werden!!!
      //========================================================================================================================
      selectModelValue // Parameter: Die vorher ausgewählte Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"
    ) {
      switch (
        selectModelValue // ACHTUNG: Code ist spezifisch für diesen Aufzählungswert!!!
      ) {
        case "Estrich": // Die Felder für die Rubrik "Spezifische Angaben für Estriche" resetten:
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Bauart"
          ].aufzaehlungsWert = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Bindemittelart"
          ].aufzaehlungsWert = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Einbauart"
          ].aufzaehlungsWert = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert"
          ].aufzaehlungsWert = null;
          //---------------------------------------------------------------------------------
          // ACHTUNG: Sollwert - Zugriff per indexSollwertInProfilModelAusgewaehlterKnoten!!!
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[3].indexSollwertInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Sollwert"
          ].aufzaehlungsWert = null;
          //---------------------------------------------------------------------------------
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[4].indexInProfilModelAusgewaehlterKnoten //  "Baueinheit > Schicht > Estrich > Härteklasse > Istwert"
          ].aufzaehlungsWert = null;
          //---------------------------------------------------------------------------------
          // ACHTUNG: Sollwert - Zugriff per indexSollwertInProfilModelAusgewaehlterKnoten!!!
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[4].indexSollwertInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Härteklasse > Sollwert"
          ].aufzaehlungsWert = null;
          //---------------------------------------------------------------------------------
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[5].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Heizestrich > Bauart"
          ].aufzaehlungsWert = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[6].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Estrich > Heizestrich > Heizrohre > Dicke"
            // ACHTUNG: Muss kennWert1 werden!
          ].kennWert1 = null;

          break;
        case "Trittschalldämmung":
        case "Wärmedämmung": // Analog
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Mechanik > Dynamische Steifigkeit"
          ].kennWert1 = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Mechanik > Zusammendrückbarkeit"
          ].kennWert1 = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Mechanik > Druckspannung bei 10 % Stauchung"
          ].kennWert1 = null;
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Nutzlasten > Flächenlast > Istwert"
          ].kennWert1 = null;
          //---------------------------------------------------------------------------------
          // ACHTUNG: Sollwert - Zugriff per indexSollwertInProfilModelAusgewaehlterKnoten!!!
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[3].indexSollwertInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Nutzlasten > Flächenlast > Sollwert"
          ].kennWert1 = null;
          //---------------------------------------------------------------------------------
          break;
        default:
          // Bei "Bodenbelag", "Kleber", "Trennschicht", "Bodenausgleichsmasse", "Grundierung", "Dichtschlämme", "Rohdecke" bzw. "Rohboden", "Unterdecke" bzw. "Unterboden"
          // sowie bei null ist nichts zu tun
          break;
      }
    },

    disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: In Abhängigkeit der ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
      //      Diese Flags layoutBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
      //      des betreffenden Felds im Template
      //================================================================================================================================================
      // [DONE] #360: Hier Bug, das disable-Feld wird im Layout File aktualisiert, dort überschrieben sich die disables aus verschiedenen Schichten!!!
      // Gelöst mit Factory Function in layout-baueinheit-schicht-baueigenschafts-profil-formular.js
      //================================================================================================================================================
      selectModelValue // Parameter: Die aktuell ausgewählte Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"
    ) {
      console.log(
        "In disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau() - Parameter selectModelValue: ",
        selectModelValue
      );
      switch (
        selectModelValue // ACHTUNG: Code ist spezifisch für diesen Aufzählungswert!!!
      ) {
        case "Estrich":
          // Gemeinsame Angaben für die Schicht: Immer enabled (Default in layoutBaueigenschaftsProfilFormular: true)
          // Gemeinsame Angaben zum Wärmeschutz enablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[1]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = false;
          }
          // Angaben zum Estrich enablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[2]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = false;
          }
          // Angaben für Dämmungen disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[3]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          // Spezifische Angaben für weitere Schichttypen disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[4]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          break;
        case "Trittschalldämmung":
        case "Wärmedämmung":
          // Gemeinsame Angaben zum Wärmeschutz enablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[1]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = false;
          }
          // Angaben zum Estrich disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[2]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          // Spezifische Angaben für Dämmungen enablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[3]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = false;
          }
          // Spezifische Angaben für weitere Schichttypen disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[4]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          break;
        default:
          // Bei "Bodenbelag", "Kleber", "Trennschicht", "Bodenausgleichsmasse", "Grundierung", "Dichtschlämme", "Rohdecke" bzw. "Rohboden", "Unterdecke" bzw. "Unterboden"
          // sowie bei null:
          // Gemeinsame Angaben für die Schicht: Immer enabled (Default in layoutBaueigenschaftsProfilFormular: true)
          // Spezifische Angaben für Estriche disablen:
          // Angaben zum Wärmeschutz enablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[1]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = false;
          }
          // Angaben zum Estrich disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[2]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          // Spezifische Angaben für Dämmungen disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[3]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          // Spezifische Angaben für weitere Schichttypen disablen:
          for (let baueigenschaft of this.layoutBaueigenschaftsProfilFormular[4]
            .baueigenschaftenInRubrik) {
            baueigenschaft.disable = true;
          }
          console.log(
            "Vor return aus disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau()"
          );
          break;
      }
    },

    selectModelChangedAufzaehlungswertSollwert( // NEU
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //=========================================================================================================================================
      // ACHTUNG: Diese Funktion für Select Model Changes musste dupliziert werden, da sie jetzt sowohl für Sollwert-Felder in der ersten Spalte
      //          aufgerufen wird als auch für Istwert-Felder in der zweiten Spalte!!!
      //========================================================================================================================================
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte (in diesem Formular für "Schicht" ist dies der Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"):
      // a) In Abhängigkeit von der bisher ausgewählten Option für diesen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für diesen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
      // Baueigenschaft, die den "steuernden" Aufzählungswert (hier "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ") repräsentiert, sondern auch für
      // andere Baueigenschaften vom Wertetyp "Aufzählungswert" im Formular, die in Abhängigkeit von der ausgewählten Option am "steuernden"
      // Aufzählungswert disabled/enabled oder auf null gesetzt werden.
      // eigenschaftInProfilModelAusgewaehlterKnoten, // Parameter: Die Eigenschaft im Array profilModelAusgewaehlterKnoten,
      // Aufbau (flach):
      // {<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }
      newSelectModelValue // Parameter: String mit neuer ausgewählter Option des Aufzählungswerts, siehe https://quasar.dev/vue-components/select#QSelect-API
      // ACHTUNG: Ist per Log beim ersten Aufruf allerdings ein Array, da so vom Backend geliefert (auch für potentielle Multi-Selects)!!!
      //          Daher ist unten Code enthalten, der nur in diesem Fall den Wert von Array nach String konvertiert!!!
    ) {
      console.log("In selectModelChangedAufzaehlungswertSollwert()");
      console.log(
        "Parameter eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
      );
      //=================================================================================================================================
      // ACHTUNG: Hier für Sollwerte muss mit indexSollwertInProfilModelAusgewaehlterKnoten statt indexInProfilModelAusgewaehlterKnoten
      //          gearbeitet werden!
      //=================================================================================================================================
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.indexSollwertInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert = [newSelectModelValue]; // ACHTUNG: Muss Array sein, sonst Probleme beim Speichern im Backend
      console.log("newSelectModelValue: ", newSelectModelValue);
      //======================================================================================================================================================
      // ACHTUNG - WICHTIG: Update Event an den Bodenaufbau schicken, damit dieser Änderungen von Aufzählungswerten an der Schicht wie die Zuordnung der Schicht zu
      // einem Schichttyp oder die Zuordnung zu Schichtpaketen reaktiv verarbeiten kann:
      //======================================================================================================================================================
      this.$emit(
        "eigenschaft-aufzaehlungswert-update",
        [newSelectModelValue], // Neuer Wert - im Template wird hierfür $event verwendet!!!
        this.profilModelAusgewaehlterKnoten[
          eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
            .indexSollwertInProfilModelAusgewaehlterKnoten
        ],
        this.selectedNode
      );
      //======================================================================================================================================================
      if (Array.isArray(oldSelectModelValue)) {
        // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        console.log(
          "oldSelectModel ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
        );
        if (oldSelectModelValue.length > 0) {
          oldSelectModelValue = oldSelectModelValue[0];
        } else {
          // Sonst leerer Array, kann vorkommen
          oldSelectModelValue = null;
        }
      }

      // NUR bei Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ":
      if (
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung ===
        "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"
      ) {
        console.log(
          "layoutBaueigenschaftsProfilFormular[0].baueigenschaftenInRubrik[0]: ",
          this.layoutBaueigenschaftsProfilFormular[0]
            .baueigenschaftenInRubrik[0]
        );
        console.log(
          "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        );
        // Nun in Abhängigkeit vom bisherigen Wert diverse Felder resetten:
        this.resetFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
          oldSelectModelValue
        );
        // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
        //      Diese Flags layoutBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
        //      des betreffenden Felds im Template
        // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
        this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
          newSelectModelValue
        );
      } // /else // Für andere Aufzählungswerte in diesem Profil für Schicht: Nichts zu tun
    },

    selectModelChangedAufzaehlungswertIstwert( // NEU
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //=========================================================================================================================================
      // ACHTUNG: Diese Funktion für Select Model Changes musste dupliziert werden, da sie jetzt sowohl für Sollwert-Felder in der ersten Spalte
      //          aufgerufen wird als auch für Istwert-Felder in der zweiten Spalte!!!
      //========================================================================================================================================
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte (in diesem Formular für "Schicht" ist dies der Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"):
      // a) In Abhängigkeit von der bisher ausgewählten Option für diesen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für diesen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
      // Baueigenschaft, die den "steuernden" Aufzählungswert (hier "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ") repräsentiert, sondern auch für
      // andere Baueigenschaften vom Wertetyp "Aufzählungswert" im Formular, die in Abhängigkeit von der ausgewählten Option am "steuernden"
      // Aufzählungswert disabled/enabled oder auf null gesetzt werden.
      // eigenschaftInProfilModelAusgewaehlterKnoten, // Parameter: Die Eigenschaft im Array profilModelAusgewaehlterKnoten,
      // Aufbau (flach):
      // {<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }
      newSelectModelValue // Parameter: String mit neuer ausgewählter Option des Aufzählungswerts, siehe https://quasar.dev/vue-components/select#QSelect-API
      // ACHTUNG: Ist per Log beim ersten Aufruf allerdings ein Array, da so vom Backend geliefert (auch für potentielle Multi-Selects)!!!
      //          Daher ist unten Code enthalten, der nur in diesem Fall den Wert von Array nach String konvertiert!!!
    ) {
      console.log("In selectModelChangedAufzaehlungswertIstwert()");
      console.log(
        "Parameter eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert = [newSelectModelValue]; // ACHTUNG: Muss Array sein, sonst Probleme beim Speichern im Backend
      console.log("newSelectModelValue: ", newSelectModelValue);
      this.$emit(
        "eigenschaft-aufzaehlungswert-update",
        [newSelectModelValue], // Neuer Wert - im Template wird hierfür $event verwendet!!!
        this.profilModelAusgewaehlterKnoten[
          eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular
            .indexInProfilModelAusgewaehlterKnoten
        ],
        this.selectedNode
      );
      if (Array.isArray(oldSelectModelValue)) {
        // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        console.log(
          "oldSelectModel ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
        );
        if (oldSelectModelValue.length > 0) {
          oldSelectModelValue = oldSelectModelValue[0];
        } else {
          // Sonst leerer Array, kann vorkommen
          oldSelectModelValue = null;
        }
      }

      // NUR bei Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ":
      if (
        eigenschaftInLayoutBaueinheitSchichtBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung ===
        "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"
      ) {
        console.log(
          "layoutBaueigenschaftsProfilFormular[0].baueigenschaftenInRubrik[0]: ",
          this.layoutBaueigenschaftsProfilFormular[0]
            .baueigenschaftenInRubrik[0]
        );
        console.log(
          "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        );
        // Nun in Abhängigkeit vom bisherigen Wert diverse Felder resetten:
        this.resetFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
          oldSelectModelValue
        );
        // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
        //      Diese Flags layoutBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
        //      des betreffenden Felds im Template
        // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
        this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
          newSelectModelValue
        );
      } // /else // Für andere Aufzählungswerte in diesem Profil für Schicht: Nichts zu tun
    },

    submitWerteAnBaueinheit() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // DONE: Hier werden auch leere bzw. disabled Felder auf "definiert" gesetzt!?!
      // DONE: Parameter? Weder idBaueinheit noch baueigenschaften werden verwendet!?!
      // DONE: API Naming Baueinheiten/Schichtaufbau? Wir updaten hier die Baueigenschaften für eine Schicht an einer Baueinheit,
      //       daher Aufruf put-API /baueinheiten/baueigenschaften
      // DONE: Error Handling, Benutzernachrichten
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In submitWerteAnBaueinheit()");
      // Setze die Werte auf "definiert":
      for (let eigenschaft of this.profilModelAusgewaehlterKnoten) {
        var result = this.pruefeDefiniertheitVonEigenschaft(eigenschaft);
        eigenschaft.definiertNichtUndefiniert = result;
        // console.log(eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung, eigenschaft.typbezogeneBaueigenschaft.werteTyp, eigenschaft.bezeichnungsWert1, eigenschaft.definiertNichtUndefiniert)
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
        //------------------------------------------------------------------------------------------------------------
        // ACHTUNG: Hier noch kein Code für Konvertierung von Aufzählungswerten von Array nach String für Radio Buttons
        // Bei Bedarf (wenn Radio Buttions gebraucht werden) hier einfügen nach Vorlage z.B. aus baueinheit-standort-baueigenschafts-profil-formular.vue
        //------------------------------------------------------------------------------------------------------------
      }
      const apiRoute = process.env.API + "/Baueinheiten" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
      this.$axios
        .put(apiRoute, {
          idBaueinheit: this.selectedNode._id,
          wertbezogeneBaueigenschaftenArray: kopieProfilModelAusgewaehlterKnoten // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
        })
        .then(success => {
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
          );
          this.$emit("refresh-request-baueigenschafts-profil");
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEINHEIT_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
          );
          this.$emit("refresh-request-baueigenschafts-profil");
        });
    },

    kennWert1InputHandler(
      //------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für Testzwecke
      // Aufruf: @input="inputValue => kennWert1InputHandler(inputValue, eigenschaft)"
      inputValue, // Parameter: (Neuer) Input-Wert des Feldes, wird von Quasar gefüllt
      eigenschaft
    ) {
      // Parameter: Muss beim Aufruf mitgegeben werden
      console.log("In kennWert1InputHandler()");
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
          this.zuFormularGehoerigesProfil = doc.data[0];
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

    projiziereAufKennwert() {
      //--------------------------------------------------------------------------------------------------------------------------------------
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

    resetWerteAnBaueinheit() {
      // ALT: Hieß handleReset()
      //--------------------------------------------------------------------------------------------------------------------------------------
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
        this.nodes[0],
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
        // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
        // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
        // Diese werden gejoined zu einem gemeinsamen Array
      );
      this.profilModelAusgewaehlterKnoten = joinResult;
      console.log(
        "Nach Join - profilModelAusgewaehlterKnoten:",
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
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Auch hier in Abhängigkeit der ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
      let aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = this
        .profilModelAusgewaehlterKnoten[
        this.layoutBaueigenschaftsProfilFormular[0].baueigenschaftenInRubrik[0]
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert; // Die aktuell ausgewählte Option von Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"

      if (
        Array.isArray(aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau)
      ) {
        // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        console.log(
          "aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
        );
        if (
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau.length > 0
        ) {
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau =
            aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau[0];
        } else {
          // Sonst leerer Array, kann vorkommen
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = null;
        }
      }
      this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
        aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
      ); // Schicht: Schichttyp im Bodenaufbau
      //-----------------------------------------------------------------------------------------------------------------------------------------------
    }
  },

  //***====================================================================================================================================== */
  computed: {
    computeEstrichbiegezugfestigkeitsklasseSchichtSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeEstrichbiegezugfestigkeitsklasseSchichtSollIstWerteVergleichh (computed)"
      );
      let istWertEigenschaftInLayoutFile = this
        .layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[3]; // "Baueinheit > Schicht > Estrich > Biegezugfestigkeitsklasse > Istwert"
      let wertSollwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      let wertIstwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile.indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("wertSollwert: ", wertSollwert);
      console.log("wertIstwert: ", wertIstwert);
      let result = this.sollIstWerteVergleich_02(
        istWertEigenschaftInLayoutFile,
        wertSollwert,
        wertIstwert,
        "Aufzählungswert"
      );
      return result;
    },

    computeEstrichhaerteklasseSchichtSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeEstrichhaerteklasseSchichtSollIstWerteVergleichh (computed)"
      );
      let istWertEigenschaftInLayoutFile = this
        .layoutBaueigenschaftsProfilFormular[2].baueigenschaftenInRubrik[4]; // "Baueinheit > Schicht > Estrich > Härteklasse > Istwert"
      let wertSollwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      let wertIstwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile.indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      let result = this.sollIstWerteVergleich_02(
        istWertEigenschaftInLayoutFile,
        wertSollwert,
        wertIstwert,
        "Aufzählungswert"
      );
      return result;
    },

    computeFlaechenlastSchichtSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeFlaechenlastSchichtSollIstWerteVergleichh (computed)"
      );
      let istWertEigenschaftInLayoutFile = this
        .layoutBaueigenschaftsProfilFormular[3].baueigenschaftenInRubrik[3]; // "Baueinheit > Schicht > Nutzlasten > Flächenlast > Istwert"
      let wertSollwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let wertIstwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile.indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let result = this.sollIstWerteVergleich_02(
        istWertEigenschaftInLayoutFile,
        wertSollwert,
        wertIstwert
        // "Kennwert" = Default
      );
      return result;
    },

    computeWaermeleitfaehigkeitSchichtSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeWaermeleitfaehigkeitSchichtSollIstWerteVergleich (computed)"
      );
      let istWertEigenschaftInLayoutFile = this
        .layoutBaueigenschaftsProfilFormular[1].baueigenschaftenInRubrik[0]; // "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert"
      let wertSollwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Istwert ist computed, könnte hier auch neu berechnet werden:
      // let wertIstwert = this.waermedurchlasswiderstandSchichtBerechnet["waermedurchlasswiderstandSchicht"] // Map - kann null sein, dann Fehler!!!
      let wertIstwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile.indexInProfilModelAusgewaehlterKnoten
      ].kennWert1; // ACHTUNG: Nutzt $set Side Effect der computed-Funktion!
      let result = this.sollIstWerteVergleich_02(
        istWertEigenschaftInLayoutFile,
        wertSollwert,
        wertIstwert
        // "Kennwert" = Default
      );
      return result;
    },

    computeWaermedurchlasswiderstandSchichtSollIstWerteVergleich: function() {
      //-----------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zum Soll-/Istwertevergleich
      // Ist spezifisch für die im Funktionsnamen identifizierte Baueigenschaft
      // Liefert in Abhängigkeit der Werte und des Operators aus dem Layout Boolean-Wert, der anzeigt, ob der Vergleich erfüllt ist oder nicht
      // Suche die Indexes in den Array profilModelAusgewaehlterKnoten der beteiligten Baueigenschaften aus dem Layout File:
      //---------------------------------------------------------------------------------------------------
      console.log(
        "In computeWaermedurchlasswiderstandSchichtSollIstWerteVergleich (computed)"
      );
      let istWertEigenschaftInLayoutFile = this
        .layoutBaueigenschaftsProfilFormular[1].baueigenschaftenInRubrik[1]; // "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
      let wertSollwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile
          .indexSollwertInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let wertIstwert = this.profilModelAusgewaehlterKnoten[
        istWertEigenschaftInLayoutFile.indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let result = this.sollIstWerteVergleich_02(
        istWertEigenschaftInLayoutFile,
        wertSollwert,
        wertIstwert
        // "Kennwert" = Default
      );
      return result;
      /*
      // Variante:
      let computedIstwert = this.waermedurchlasswiderstandSchichtBerechnet// ACHTUNG: Map!!!
      // ACHTUNG: Kann null sein, wenn Wärmedurchlasswiderstand (Istwert) 0 ist!
      if (computedIstwert === null) {return null} else { // Map
        let wertIstwert = computedIstwert["waermedurchlasswiderstandSchicht"].kennWert1;
        let result = this.sollIstWerteVergleich_02(
          istWertEigenschaftInLayoutFile,
          wertSollwert,
          wertIstwert
        );
        return result;
      }
      */
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
        waermedurchlasswiderstandSchicht: this
          .waermedurchlasswiderstandSchichtBerechnet // NEU
      };
    },

    waermedurchlasswiderstandSchichtBerechnet() {
      //-----------------------------------------------------------------------------------------------------------------------------------------
      // Computed-Funktion zur Berechnung des Wärmedurchlasswiderstands der Schicht als Quotient aus Dicke und Wärmeleitfähigkeit der Schicht
      // Muss mit :value="computeWaermedurchlasswiderstandSchicht" im Template definiert werden
      // Macht per Vue $set einen Update des VModels per Side Effect
      //=========================================================================================================================================
      // ACHTUNG: Auch mit dem Vue $set wird der berechnete Wert NICHT mitgespeichert beim Speichern des Bodenaufbaus, da dieser seine eigenen
      // Kopien der Baueigenschaften der Schichten hält!!!
      // Normale Eingabewerte der Schichten, wie z.B. Schichtdicke, werden aber beim Speichern des Bodenaufbaus gespeichert, da die Schichten
      // per $emit an ihren QInputs bzw. @input-Methoden an QSelect-Feldern den Bodenaufbau über Änderungen benachrichtigen.
      // Abhilfe: Hier ebenfalls ein $emit eines Update Events für den neu berechneten Wert direkt aus dieser computed-Funktion unten.
      //=========================================================================================================================================
      console.log("In waermedurchlasswiderstandSchichtBerechnet()");
      const dickeSchicht = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueigenschaftsProfilFormular[0].baueigenschaftenInRubrik[2]
          .indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Geometrie > Dicke"
      ].kennWert1;
      const lambdaSchicht = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueigenschaftsProfilFormular[1].baueigenschaftenInRubrik[0]
          .indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Wärmeschutz > Wärmeleitfähigkeit > Istwert"
      ].kennWert1;
      if (
        dickeSchicht == null ||
        dickeSchicht === "" ||
        lambdaSchicht == null ||
        lambdaSchicht === 0 ||
        lambdaSchicht === ""
      ) {
        return null;
      }
      let waermedurchlasswiderstandSchicht =
        dickeSchicht / 1000 / lambdaSchicht; // ACHTUNG: Schichtdicke ist in mm, daher durch 1000 dividieren!
      /*
      let resultObject = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueigenschaftsProfilFormular[1].baueigenschaftenInRubrik[1]
          .indexInProfilModelAusgewaehlterKnoten // "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
      ];
      */
      // Runden auf 2 Stellen:
      waermedurchlasswiderstandSchicht =
        Math.round(waermedurchlasswiderstandSchicht * 100) / 100;
      //============================================================================
      // Update v-model der Schicht per Side Effect:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[1]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ], // "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
        "kennWert1",
        waermedurchlasswiderstandSchicht
      );
      //============================================================================
      // Nun Update-Event an Bodenaufbau feuern - siehe Kommentare dazu im Header!!!
      this.$emit(
        'eigenschaft-kennwert-update',
        waermedurchlasswiderstandSchicht, // Neuer (berechneter) Wert - im Template wird hierfür $event verwendet!!!
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaftsProfilFormular[1]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ], // "Baueinheit > Schicht > Wärmeschutz > Wärmedurchlasswiderstand > Istwert"
        this.selectedNode
      )
      //=============================================================================
      console.log(
        "waermedurchlasswiderstandSchicht aus computeWaermedurchlasswiderstandSchicht: ",
        waermedurchlasswiderstandSchicht
      );
      return waermedurchlasswiderstandSchicht;
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------
    // Die folgenden comoputed-Funktionen werden mit dem neuen, generischen Design (v-for-Aufbau des Profilformulars im Template aus dem
    // Array layoutBaueigenschaftsProfilFormular) nicht mehr benötigt, daher auskommentiert:
    /*
    findeIndexVonBaueigenschaftSchichttypImBodenaufbau() {
      // HINWEIS: Diese computed-Funktion wurde zuerst noch aufgerufen weiter unten, daher erst später disabled,
      //          wie die übrigen solchen computed-Funktionen. Dafür musste in der @input-Methode
      //          als weiterer Parameter die Eigenschaft im Array layoutBaueigenschaftsProfilFormular mitgegeben werden, wo
      //          der gesuchte Index im Array profilModelAusgewaehlterKnoten für die Baueigenschaft "Schichttyp im Bodenaufbau" bereits
      //          gespeichert ist (wird in mounted() initialisiert)
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      console.log(
        "In findeIndexVonBaueigenschaftSchichttypImBodenaufbau() - index: ",
        index
      );
      return index;
    }

    findeIndexVonBaueigenschaftSchichtdicke() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Schichtdicke"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftWaermeleitfaehigkeitBemessungswert() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft =
        "Schicht: Wärmeleitfähigkeit Bemessungswert"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftHeizestrichBauart() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Heizestrich-Bauart"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftEstrichart() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Estrichart"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftEstrichBiegezugfestigkeitsklasse() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft =
        "Schicht: Estrich-Biegezugfestigkeitsklasse"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftDickeDerHeizrohre() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Dicke der Heizrohre"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftDynamischeSteifigkeit() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Dynamische Steifigkeit"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftZulaessigeFlaechenlast() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Zulässige Flächenlast"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftZusammendrueckbarkeit() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Zusammendrückbarkeit"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftDruckspannungBei10ProzentStauchung() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft =
        "Schicht: Druckspannung bei 10% Stauchung"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    findeIndexVonBaueigenschaftRohdichte() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Rohdichte"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungBaueigenschaft
      );
      return index;
    },

    istAusgewaehltOptionEstrichVonAufzaehlungswertSchichttypImBodenaufbau() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um zu prüfen, ob eine bestimmte Option für eine bestimmte
      // Baueigenschaft vom Wertetyp "Aufzählungswert" aktuell ausgewählt ist im Baueigenschaftsprofilformular
      // Gibt true oder false zurück in Abhängigkeit von dieser Prüfung.
      // Kann verwendet werden zum Disablen/Enablen bestimmter anderer, abhängiger Felder in Abhängigkeit von der Auswahl für diesen Aufzählungswert.
      // ACHTUNG: Das Resetten eventuell geänderter, bisher enableter abhängiger Felder bei Änderung der ausgewählten Option muss per @input-Methode am QSelect erfolgen!
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let option = "Estrich"; // String
      let bezeichnungAufzaehlungsWert = "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungAufzaehlungsWert
      );
      // Prüfe, ob option der aktuell ausgewählte Wert ist und returne Ergebnis als Boolean
      // console.log("profilModelAusgewaehlterKnoten[index].aufzaehlungsWert: ", this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert);
      if (
        Array.isArray(
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert
        )
      ) {
        // Wird verwendet, um zu prüfen, ob es sich bei dem Feld aufzaehlungsWert um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        if (
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert.length > 0
        ) {
          // ACHTUNG: aufzaehlungswert ist Array!
          return (
            this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert[0] ===
            option
          );
        } else {
          // leerer Array []
          return false;
        }
      } else {
        // Kein Array oder Feld ist null (z.B. bei nicht ausgewählter Option möglich)
        return false;
      }
    },

    istAusgewaehltOptionTrittschalldaemmungVonAufzaehlungswertSchichttypImBodenaufbau() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um zu prüfen, ob eine bestimmte Option für eine bestimmte
      // Baueigenschaft vom Wertetyp "Aufzählungswert" aktuell ausgewählt ist im Baueigenschaftsprofilformular
      // Gibt true oder false zurück in Abhängigkeit von dieser Prüfung.
      // Kann verwendet werden zum Disablen/Enablen bestimmter anderer, abhängiger Felder in Abhängigkeit von der Auswahl für diesen Aufzählungswert.
      // ACHTUNG: Das Resetten eventuell geänderter, bisher enableter abhängiger Felder bei Änderung der ausgewählten Option muss per @input-Methode am QSelect erfolgen!
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let option = "Trittschalldämmung"; // String
      let bezeichnungAufzaehlungsWert = "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungAufzaehlungsWert
      );
      // Prüfe, ob option der aktuell ausgewählte Wert ist und returne Ergebnis als Boolean
      // console.log("profilModelAusgewaehlterKnoten[index].aufzaehlungsWert: ", this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert);
      if (
        Array.isArray(
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert
        )
      ) {
        // Wird verwendet, um zu prüfen, ob es sich bei dem Feld aufzaehlungsWert um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        if (
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert.length > 0
        ) {
          // ACHTUNG: aufzaehlungswert ist Array!
          return (
            this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert[0] ===
            option
          );
        } else {
          // leerer Array []
          return false;
        }
      } else {
        // Kein Array oder Feld ist null (z.B. bei nicht ausgewählter Option möglich)
        return false;
      }
    },

    istAusgewaehltOptionWaermedaemmungVonAufzaehlungswertSchichttypImBodenaufbau() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um zu prüfen, ob eine bestimmte Option für eine bestimmte
      // Baueigenschaft vom Wertetyp "Aufzählungswert" aktuell ausgewählt ist im Baueigenschaftsprofilformular
      // Gibt true oder false zurück in Abhängigkeit von dieser Prüfung.
      // Kann verwendet werden zum Disablen/Enablen bestimmter anderer, abhängiger Felder in Abhängigkeit von der Auswahl für diesen Aufzählungswert.
      // ACHTUNG: Das Resetten eventuell geänderter, bisher enableter abhängiger Felder bei Änderung der ausgewählten Option muss per @input-Methode am QSelect erfolgen!
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let option = "Wärmedämmung"; // String
      let bezeichnungAufzaehlungsWert = "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungAufzaehlungsWert
      );
      // Prüfe, ob option der aktuell ausgewählte Wert ist und returne Ergebnis als Boolean
      // console.log("profilModelAusgewaehlterKnoten[index].aufzaehlungsWert: ", this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert);
      if (
        Array.isArray(
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert
        )
      ) {
        // Wird verwendet, um zu prüfen, ob es sich bei dem Feld aufzaehlungsWert um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        if (
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert.length > 0
        ) {
          // ACHTUNG: aufzaehlungswert ist Array!
          return (
            this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert[0] ===
            option
          );
        } else {
          // leerer Array []
          return false;
        }
      } else {
        // Kein Array oder Feld ist null (z.B. bei nicht ausgewählter Option möglich)
        return false;
      }
    },

    istAusgewaehltOptionRohdeckeVonAufzaehlungswertSchichttypImBodenaufbau() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um zu prüfen, ob eine bestimmte Option für eine bestimmte
      // Baueigenschaft vom Wertetyp "Aufzählungswert" aktuell ausgewählt ist im Baueigenschaftsprofilformular
      // Gibt true oder false zurück in Abhängigkeit von dieser Prüfung.
      // Kann verwendet werden zum Disablen/Enablen bestimmter anderer, abhängiger Felder in Abhängigkeit von der Auswahl für diesen Aufzählungswert.
      // ACHTUNG: Das Resetten eventuell geänderter, bisher enableter abhängiger Felder bei Änderung der ausgewählten Option muss per @input-Methode am QSelect erfolgen!
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let option = "Rohdecke"; // String
      let bezeichnungAufzaehlungsWert = "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"; // String
      // Suche Index der Bezeichnung des Aufzählungswerts im Array:
      let index = this.profilModelAusgewaehlterKnoten.findIndex(
        item =>
          item.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung ===
          bezeichnungAufzaehlungsWert
      );
      // Prüfe, ob option der aktuell ausgewählte Wert ist und returne Ergebnis als Boolean
      // console.log("profilModelAusgewaehlterKnoten[index].aufzaehlungsWert: ", this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert);
      if (
        Array.isArray(
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert
        )
      ) {
        // Wird verwendet, um zu prüfen, ob es sich bei dem Feld aufzaehlungsWert um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        if (
          this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert.length > 0
        ) {
          // ACHTUNG: aufzaehlungswert ist Array!
          return (
            this.profilModelAusgewaehlterKnoten[index].aufzaehlungsWert[0] ===
            option
          );
        } else {
          // leerer Array []
          return false;
        }
      } else {
        // Kein Array oder Feld ist null (z.B. bei nicht ausgewählter Option möglich)
        return false;
      }
    }
  */
  },

  //***=====================================================================================================================================
  watch: {
    // Watch auf ausgewaehltesBaueigenschaftsProfil
    ausgewaehltesBaueigenschaftsProfil: {
      handler: function() {
        console.log(
          "In watch von baueinheit-schicht-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
          this.ausgewaehltesBaueigenschaftsProfil
        );
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
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
            this.nodes[0],
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
            // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
            // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
            // Diese werden gejoined zu einem gemeinsamen Array
          );
          this.profilModelAusgewaehlterKnoten = joinResult;
          console.log(
            "Nach Join - profilModelAusgewaehlterKnoten:",
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
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Auch hier in Abhängigkeit der ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
          let aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = this
            .profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].aufzaehlungsWert; // Die aktuell ausgewählte Option von Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"

          if (
            Array.isArray(
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
            )
          ) {
            // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
            console.log(
              "aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
            );
            if (
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau.length >
              0
            ) {
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau =
                aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau[0];
            } else {
              // Sonst leerer Array, kann vorkommen
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = null;
            }
          }
          this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
            aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
          ); // Schicht: Schichttyp im Bodenaufbau
          //-----------------------------------------------------------------------------------------------------------------------------------------------
        }
      }
    },

    // Watch auf Prop "selectedNode"
    // Festgestelltes Problem: handler wird vor mounted aufgerufen
    selectedNode: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNode"
      // Festgestelltes Problem: handler für watch wird vor mounted aufgerufen - mit immediate: false vermieden
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch von baueinheit-schicht-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNode erkannt"
        );
        this.selectedNodeArbeitskopie = Object.assign({}, value);
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
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
            this.nodes[0],
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
            // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
            // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
            // Diese werden gejoined zu einem gemeinsamen Array
          );
          this.profilModelAusgewaehlterKnoten = joinResult;
          console.log(
            "Nach Join - profilModelAusgewaehlterKnoten:",
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
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Auch hier in Abhängigkeit der ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
          let aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = this
            .profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaftsProfilFormular[0]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].aufzaehlungsWert; // Die aktuell ausgewählte Option von Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"

          if (
            Array.isArray(
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
            )
          ) {
            // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
            console.log(
              "aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
            );
            if (
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau.length >
              0
            ) {
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau =
                aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau[0];
            } else {
              // Sonst leerer Array, kann vorkommen
              aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = null;
            }
          }
          this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
            aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
          ); // Schicht: Schichttyp im Bodenaufbau
          //-----------------------------------------------------------------------------------------------------------------------------------------------
        }
      }
    },
    profilModelAusgewaehlterKnoten: {
      immediate: false,
      deep: true,
      handler: function(value) {
        if (this.mountedDone) {
          console.log("In watch von profilModelAusgewaehlterKnoten");
          this.changeOccured();
        }
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log("In mounted() von baueinheit-schicht-baueigenschafts-profil-formular.vue");
    // this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl des Profils im generischen Formular - wird hier nicht benötigt
    this.readZugehoerigesProfil().then(() => {
      console.log("Erstelle Arbeitskopie des im Baum selektierten Knotens");
      this.selectedNodeArbeitskopie = Object.assign({}, this.selectedNode);
      if (this.selectedNode !== null && this.selectedNode !== undefined) {
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
          this.nodes[0],
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
          // 1. Array enthält die Baueigenschaften, die im Profil sind, am ausgewählten Knoten, inklusive ihren Werten [ {baueigenschaft1}, .., {baueigenschaftn}]
          // 2. Array hat Struktur: [ { idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten }]
          // Diese werden gejoined zu einem gemeinsamen Array
        );
        this.profilModelAusgewaehlterKnoten = joinResult;
        console.log(
          "Nach Join - profilModelAusgewaehlterKnoten:",
          this.profilModelAusgewaehlterKnoten
        );
        // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
      }
      //------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Initialisiere den Array layoutBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
      // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

      // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutBaueigenschaftsProfilFormular
      // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
      //==========================================================================
      // ACHTUNG: In diesem Layout File gibt es bisher keine Tabs, nur Rubriken!!!
      //==========================================================================
      for (let rubrik of this.layoutBaueigenschaftsProfilFormular) {
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
            /*
            baueigenschaftInRubrik.eigenschaftIstwert = this.profilModelAusgewaehlterKnoten[ // ACHTUNG: Dieses Feld wird aktuell hier nicht verwendet, daher disabled!
            // In einer früheren Version war es das VModel am q-input des Istwerts (für kennWert1)!!!
              baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten
            ];
            */
            //=====================================================================================================================================
            // NEU: Setze zusätzliches Indexfeld für Sollwerte im Layout File (für Soll-/Istwertepaare):
            // Wird aktuell in den Layout Files für "Schicht" und "Bodenaufbau" benutzt!
            //=====================================================================================================================================
            // ACHTUNG: Weil im Layout File für "Schicht" baueigenschaftsBezeichnungSollwert: null vorkommt, muss hier auf
            // != null statt !== undefined wie in sonstigen Profilformularen abgefragt werden, sonst Fehler in findeIndexVonBaueigenschaft(null)!!!
            //=====================================================================================================================================
            if (
              baueigenschaftInRubrik.baueigenschaftsBezeichnungSollwert != null
            ) {
              baueigenschaftInRubrik.indexSollwertInProfilModelAusgewaehlterKnoten = this.findeIndexVonBaueigenschaft(
                baueigenschaftInRubrik.baueigenschaftsBezeichnungSollwert
              );
            }
            //=====================================================================================================================================
          }
        }
      }
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
        //=============================================================================================================================================
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        //----------------------------------------------------------------------------------------------------------------------------------------
        // ACHTUNG: Da in "Schicht" aktuell keine Radio Buttons vorkommen, dies aus Performance-Gründen disabled
        // Muss hier in mounted() UND in reset() und in watch() (= Refresh) enabled werden, falls Radio Buttons verwendet werden auf Aufzählungswerten!
        //=============================================================================================================================================
        /*
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          //========================================================================
          // ACHTUNG: Hier keine Tabs im Profilformular für Schicht, nur Rubriken!!!
          //========================================================================
          for (let rubrik of this.layoutBaueigenschaftsProfilFormular) {
            for (let myEigenschaft of rubrik.baueigenschaftenInRubrik) {
              if (
                myEigenschaft.baueigenschaftsBezeichnung ===
                eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
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
        */
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Auch hier in Abhängigkeit der ausgewählten Option des Aufzählungswerts "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ" (Parameter)
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueigenschaftsProfilFormular
      let aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = this
        .profilModelAusgewaehlterKnoten[
        this.layoutBaueigenschaftsProfilFormular[0].baueigenschaftenInRubrik[0]
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert; // Die aktuell ausgewählte Option von Aufzählungswert "Baueinheit > Schicht > Zuordnung > Bodenaufbau > Typ"

      console.log(
        "aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau: ",
        aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
      );
      if (
        Array.isArray(aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau)
      ) {
        // Wird verwendet, um zu prüfen, ob es sich um einen Array handelt (dies ist per Log stets der Fall, auch wenn erstmals das Form gerendered wird!)
        console.log(
          "aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau ist ein Array, wird für die Weiterverarbeitung nach String konvertiert"
        );
        if (
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau.length > 0
        ) {
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau =
            aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau[0];
        } else {
          // Sonst leerer Array, kann vorkommen
          aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau = null;
        }
      }
      this.disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau(
        aktuelleOptionVonAufzaehlungswertSchichttypImBodenaufbau
      ); // Schicht: Schichttyp im Bodenaufbau
      // DONE: Obiger Code zur Konvertierung des Aufzählungswerts auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden, in
      //       resetWerteAnBaueinheit() und Watch für selectedNode
      // DONE: Aufzählungswerte für type="radio" im Format String müssen auf dem "Rückweg" VOR Speicherung wieder in Arrays zurückkonvertiert werden,
      //       in submitWerteAnBaueinheit()
      //========================================================================================================================================
      console.log(
        "this.profilModelAusgewaehlterKnoten",
        this.profilModelAusgewaehlterKnoten
      );
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      this.mountedDone = true; // Wird im Template per v-if verwendet, verhindert Rendering vor Abschluss von mounted()
      //------------------------------------------------------------------------------------------------------------------------------------------
    }); // TODO: Catch-Block für Error, wenn zugehöriges Profil nicht gefunden wurde!!!
  } // /mounted:
};
</script>
