<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für spezifisches Baueigenschaftsprofilformular für Baueigenschaftsprofil "Baueinheit > Bauvorhaben"                            -->
  <!-- HINWEIS: Dieses Baueigenschaftsprofilformular hat mehrere Unter-Tabs                                                          -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!--  <q-form v-if="profilModelAusgewaehlterKnoten != null && mountedDone"> -->
  <div v-if="profilModelAusgewaehlterKnoten != null && mountedDone">
    <!-- ACHTUNG: Die obige null-Prüfung ist unbedingt notwendig, da der Array profilModelAusgewaehlterKnoten, während das Template erstmals gerendered wird, -->
    <!--          noch in mounted: aufgebaut wird aus dem Backend. Da beim Template-Aufbau aber schon computed-Funktionen laufen, -->
    <!--          werfen diese sonst undefined-Fehler beim Zugriff per -->
    <!--          profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaftSchichttypImBodenaufbau].typbezogeneBaueigenschaft -->
    <!-- <div class style="max-width: 1300px"> -->
    <!-- ACHTUNG: Dieses div mit style="min-width:" ist unbedingt notwendig hinter dem q-form, um dessen Größe zu definieren!!! -->
    <!-- Sonst macht es sich automatisch klein??? -->
    <!-- <div class="q-pa-md row q-col-gutter-sm"> -->
    <div v-if="profilBezeichnung !== 'Baueinheit > Bauvorhaben'">
      TODO: Aufruf mit falscher profilBezeichnung!
    </div>
    <div v-else>
      <!-- </q-card> -->
      <!-- ACHTUNG: Diese q-card DISABLED, da sie einen horizontalen Scrollbalken verursacht unter dem Formular!!! -->
      <!-- @input="initialisiereAusgewaehltesTabBauvorhabenBaueigenschaftsProfilFormular" -->
      <!-- <q-card> -->
      <!-- ALT: -->
      <!--
        class="text-grey-10 bg-grey-2"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      -->
      <!-- =================================================================================================== -->
      <!-- ACHTUNG: class="q-pa-xs" oder "q-pa-none" kontrolliert Breite der Tableiste!                        -->
      <!-- =================================================================================================== -->
      <q-tabs mobile-arrows
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="white"
        content-class="text-h7"
        dense
        align="left"
        v-model="tabBauvorhabenBaueigenschaftsProfilFormular"
        @input="initialisiereAusgewaehltesTabBauvorhaben"
      >
        <q-tab
          name="projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular"
          label="Projekt"
          no-caps
        />
        <!-- NEU: Tab "Verwendungsverbote/-gebote dropped, Inhalt verschoben nach "Bauordnungsrechtliche Angaben" -->
        <!--
          <q-tab
            name="verwendungsverboteTabBauvorhabenBaueigenschaftsProfilFormular"
            label="Verwendungsverbote/-gebote"
            no-caps
          />
          -->
        <q-tab
          name="projektBeteiligteTabBauvorhabenBaueigenschaftsProfilFormular"
          label="Projektbeteiligte"
          no-caps
        />
        <q-tab
          name="baumassnahmenTabBauvorhabenBaueigenschaftsProfilFormular"
          label="Baumaßnahmen"
          no-caps
        />
        <!-- NEU - #387 -->
        <q-tab
          name="musterhaftigkeitTabBauvorhabenBaueigenschaftsProfilFormular"
          label="Musterhaftigkeit"
          no-caps
        />
      </q-tabs>
      <!-- <q-separator /> -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
      <q-tab-panels
        v-model="tabBauvorhabenBaueigenschaftsProfilFormular"
        animated
      >
        <!--================================================================================================================================== -->
        <!-- TODO: width justieren -->
        <!-- ALT: style="max-width: 550px" -->
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 0: "Projektbezogene Angaben"                                                             -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pt-xs q-gutter-xs full-width">
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Projektbezogene Angaben zum Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Projektbezogene Angaben zum Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <q-separator />
              </div>
              <b>Hinweis: </b>Hier können grundlegende Informationen zum Projekt angegeben
              werden. Ein Datenaustausch mit <b>untermStrich® X3</b> ist in einer späteren Ausbaustufe geplant.
              <!-- ========================== Start Rubrik 0 ================================== -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <!-- ========================== Überschriften Rubrik 1 und 2 in 2 Header-Zeilen ========================================== -->
              <q-separator />
              <div class="row q-pa-xs q-col-gutter-xs full-width">
                <div class="col-md-1 col-12 text-subtitle1 bg-indigo-2">
                  <b>Projekt</b>
                </div>
                <div class="col-md-2 col-12 bg-indigo-2">
                  <b></b>
                </div>
                <div class="col-md-3 col-12 bg-indigo-2">
                  <b></b>
                </div>
                <!-- ---------------- -->
                <div class="col-md-2 col-12 text-subtitle1 bg-blue-2">
                  <b>Projektleiter</b>
                </div>
                <div class="col-md-2 col-12 bg-blue-2">
                  <b></b>
                </div>
                <div class="col-md-2 col-12 bg-blue-2"></div>
              </div>
              <div class="row q-pl-xs q-pr-xs q-col-gutter-xs full-width">
                <div class="col-md-1 col-12 bg-indigo-2">
                  <b>Nummer</b>
                </div>
                <div class="col-md-2 col-12 bg-indigo-2">
                  <b>Kurzbezeichnung</b>
                </div>
                <div class="col-md-3 col-12 bg-indigo-2">
                  <b>Langbezeichnung</b>
                </div>
                <!-- NEU: Für Erdbeben-Info -->
                <div class="col-md-2 col-12 bg-blue-2">
                  <b>Nachname </b>
                </div>
                <div class="col-md-2 col-12 bg-blue-2">
                  <b>Vorname</b>
                </div>
                <div class="col-md-2 col-12 bg-blue-2">
                  <b>Benutzerkennung</b>
                </div>
              </div>
              <!-- <q-separator /> -->
              <!-- ========================== Start Rubrik 1 und 2 in einer Zeile ================================== -->
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-1 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projektnummer (Bezeichnungswert)                                                -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                      )
                    "
                    mask="#####"
                    fill-mask
                  >
                    <!-- --------------------------------------------------------------------------------- -->
                    <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                    <!-- ALT: content-class="my-tooltip"                                                   -->
                    <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-tooltip
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-2 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projekt Kurzbezeichnung (Bezeichnungswertepaar!)                                -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft1
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .toolTipBaueigenschaft1
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projekt Langbezeichnung (Bezeichnungswertepaar!)                                -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft2
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert2
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .toolTipBaueigenschaft2
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-2 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projektleiter Nachname (Bezeichnungswertepaar!)                                  -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft1
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .toolTipBaueigenschaft1
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-2 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projektleiter Vorname (Bezeichnungswertepaar!)                                 -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswertepaar'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft2
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert2
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .toolTipBaueigenschaft2
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-2 col-12">
                  <!-- ------------------------------------------------------------------------------- -->
                  <!-- Start Feld:                                                                     -->
                  <!-- Projektleiter Benutezrkennung (Bezeichnungswert)                                -->
                  <!-- class="q-pa-xs" -->
                  <q-input
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert2
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
              </div>
              <br />
              <!-- ========================================= Keine 2. Zeile von Feldern in Rubrik 1 ==================================== -->
              <!-- ================================= Keine Rubrik 2 ================================== -->
              <!-- /Rubrik -->
            </div>
          </div>
        </q-tab-panel>
        <!--================================================================================================================================== -->
        <!-- TODO: width justieren -->
        <!-- ALT: style="max-width: 550px" -->
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="projektBeteiligteTabBauvorhabenBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 1: "Projektbeteiligte"                                                   -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pa-xs q-gutter-xs full-width">
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Projektbeteiligte im Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Projektbeteiligte im Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <q-separator />
              </div>
              <b>Hinweis: </b>Hier können Projektbeteiligte angegeben werden.
              Ein Datenaustausch mit <b>untermStrich® X3</b> ist in einer späteren Ausbaustufe geplant.
              <q-separator />
              <!-- ========================== Start Rubrik 0 ================================== -->
              <div class="row q-pa-xs q-col-gutter-xs full-width">
                <!-- Header-Zeile -->
                <div class="col-md-1 col-12 text-subtitle1 bg-purple-2">
                  <b>Projektbeteiligte</b>
                </div>
                <div class="col-md-2 col-12 text-subtitle1 bg-indigo-2">
                  <b>Rolle</b>
                </div>
                <div class="col-md-1 col-12 text-subtitle1 bg-blue-2">
                  <b>Firma</b>
                </div>
                <div class="col-md-1 col-12 bg-blue-2">
                  <!-- leer -->
                </div>
                <div class="col-md-2 col-12 text-subtitle1 bg-cyan-2">
                  <b>Ansprechpartner</b>
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <!-- leer -->
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <!-- leer -->
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <!-- leer -->
                </div>
                <div class="col-md-2 col-12 bg-cyan-2">
                  <!-- leer -->
                </div>
              </div>
              <div class="row q-pl-xs q-pr-xs q-col-gutter-xs full-width">
                <!-- Header-Zeile -->
                <div class="col-md-1 col-12 bg-purple-2">
                  <!-- -->
                </div>
                <div class="col-md-2 col-12 bg-indigo-2">
                  <b>im Projekt</b>
                </div>
                <div class="col-md-2 col-12 bg-blue-2">
                  <b>Firmenname</b>
                </div>
                <div class="col-md-2 col-12 bg-cyan-2">
                  <b>Nachname</b>
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <b>Vorname</b>
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <b>Festnetznummer</b>
                </div>
                <div class="col-md-1 col-12 bg-cyan-2">
                  <b>Mobilnummer</b>
                </div>
                <div class="col-md-2 col-12 bg-cyan-2">
                  <b>E-Mail-Adresse</b>
                </div>
              </div>
              <q-separator />
              <!-- ==================== Start 1. Zeile von Feldern  in Rubrik 0 ========================= -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <!-- v-for-Schleife über 10 Projektbeteiligte (Rubriken) aus dem Layout: -->
              <div
                v-for="rubrik in layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[1]
                  .rubrikenInTab"
                :key="rubrik.ueberschriftRubrik"
              >
                <div class="row q-pt-xs q-col-gutter-xs full-width">
                  <!-- ================================================================= -->
                  <!-- ACHTUNG: items-center funktioniert, warum auch immer, hier nicht: -->
                  <!-- Dafür funktionert self-center, Tipp von                           -->
                  <!-- https://codepen.io/Pratik__007/pen/oNNQMJP                        -->
                  <!-- ================================================================= -->
                  <div class="col-md-1 col-12 bg-purple-2">
                    <div class="self-center">
                      <b>
                        {{ rubrik.ueberschriftRubrik }}
                      </b>
                    </div>
                  </div>
                  <div class="col-md-2 col-12">
                    <!-- Rolle (Aufzählungswert) -->
                    <q-select
                      clearable
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Aufzählungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[0].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :options="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft
                          .selektierbareOptionenAufzaehlungsWert
                      "
                      :label="
                        rubrik.baueigenschaftenInRubrik[0].labelBaueigenschaft
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[0]
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
                          rubrik.baueigenschaftenInRubrik[0]
                            .toolTipBaueigenschaft
                        }}
                      </q-tooltip>
                    </q-select>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12">
                    <!-- Firmenname (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[1].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[1].labelBaueigenschaft1
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          rubrik.baueigenschaftenInRubrik[1]
                            .toolTipBaueigenschaft1
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- ========================================================================================================================= -->
                  <!-- ACHTUNG: baueigenschaftenInRubrik[2] wird hier übersprungen (nur 1. Feld aus dem Bezeichnunswertepaar wird oben genommen) -->
                  <!-- ========================================================================================================================= -->
                  <div class="col-md-2 col-12">
                    <!-- Nachname Ansprechpartner (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[3].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[3].labelBaueigenschaft1
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          rubrik.baueigenschaftenInRubrik[3]
                            .toolTipBaueigenschaft1
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div class="col-md-1 col-12">
                    <!-- Vorname Ansprechpartner (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[4].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[4].labelBaueigenschaft2
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert2
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          rubrik.baueigenschaftenInRubrik[4]
                            .toolTipBaueigenschaft2
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div class="col-md-1 col-12">
                    <!-- Telefonnummern Ansprechpartner (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[5]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[5].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[5].labelBaueigenschaft1
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[5]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      type="tel"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          rubrik.baueigenschaftenInRubrik[5]
                            .toolTipBaueigenschaft1
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div class="col-md-1 col-12">
                    <!-- Mobilfunknummer Ansprechpartner (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[6]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[6]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[6]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[6].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[6].labelBaueigenschaft2
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[6]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert2
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[6]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[6]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      type="tel"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[6]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Bezeichnungswertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 10]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          rubrik.baueigenschaftenInRubrik[6]
                            .toolTipBaueigenschaft2
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12">
                    <!-- E-Mail-Adresse Ansprechpartner (Bezeichnungswertepaar) -->
                    <q-input
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[7]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp ===
                          'Bezeichnungswert'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[7]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].baueigenschaftAnWerteVererbendemElternKnoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[7]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          rubrik.baueigenschaftenInRubrik[7].disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      dense
                      :label="
                        rubrik.baueigenschaftenInRubrik[7].labelBaueigenschaft
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          rubrik.baueigenschaftenInRubrik[7]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungsWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[7]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[7]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      type="email"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            rubrik.baueigenschaftenInRubrik[7]
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
                          rubrik.baueigenschaftenInRubrik[7]
                            .toolTipBaueigenschaft
                        }}
                      </q-tooltip>
                    </q-input>
                    <div v-else>
                      Nicht unterstützter Wertetyp
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-pt-xs q-col-gutter-xs full-width"></div>
            </div>
            <!-- ========================== Ende Rubrik 0 ================================== -->
            <!-- ========================== Start Rubrik mit Button =======================  -->
            <div class="row q-pa-xs q-col-gutter-xs full-width items-end">
              <!--
                <div class="col-6">
                  Zur Aktivierung dieser Schaltfläche <b>Geokoordinaten</b> des
                  Standorts im Tab "Lageangaben" eingeben
                  {{ displayRightArrow }}
                </div>
                <div class="col-3">
              -->
              <!-- Button für Ermittlung Höhe -->
              <!--
                  <q-btn
                    class="stretch full-width"
                    label="TODO"
                    color="light-blue"
                    glossy
                    no-caps
                  />
                </div>
                <div class="col-3">
              -->
              <!-- Leer -->
              <!--
                </div>
              -->
            </div>
            <!-- =========================================================== -->
          </div>
        </q-tab-panel>
        <!--================================================================================================================================== -->
        <!-- TODO: width justieren -->
        <!-- ALT: style="max-width: 550px" -->
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="baumassnahmenTabBauvorhabenBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 2 "Angaben zu den Baumaßnahmen"                                                        -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pt-xs q-gutter-xs full-width">
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Baumaßnahmen im Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Baumaßnahmen im Bauvorhaben
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <q-separator />
              </div>
              <!-- ========================== Start Rubrik 0 ================================== -->
              <div class="q-pa-xs q-gutter-xs">
              <div class="row full-width q-pa-xs bg-blue-grey-2">
                <!-- Rubrik 0 -->
                <!-- <b>Kombination Bestandsbau/Neubau/b> -->
                <b>
                  {{
                    layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                      .rubrikenInTab[0].ueberschriftRubrik
                  }}
                </b>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern  in Rubrik 1 ========================= -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <div
                class="row q-pl-xs q-pr-xs q-pt-xs q-pb-none q-col-gutter-xs full-width items-end"
              >
                <!-- Überschriften-Zeile -->
                <!-- Überschriften: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Art der Kombination von Bestandsbau/Neubau/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Kombination der Heizung von Bestands-/Neubau</b> -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Art der Heizung des Bestandsbaus</b> -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Art der Heizung des Neubaus</b> -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
              </div>
              <div
                class="row q-pt-none q-pl-xs q-pr-xs q-pb-xs q-col-gutter-xs full-width"
              >
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Kombination Bestandsbau/Neubau/b>                                     -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Kombination der Heizung von Bestandsbau/Neubau/b>                     -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <!-- NEU: Zusätzliches Feld für Art der Heizung im Bestandsbau: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Art der Heizung des Bestandsbaus</b>                                  -->
                  <!-- ACHTUNG: "multiple" notwendig für Mehrfachauswahl!!!                     -->
                  <!-- NEU: Mehrfachauswahl, mit q-chips: -->
                  <q-select
                    use-chips
                    multiple
                    hint="Hier können
                    mehrere Optionen ausgewählt werden"
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                    <!-- NEU: Styling für q-chips: -->
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
                            >{{ scope.opt }}
                          </q-tooltip>
                        </div>
                      </q-chip>
                    </template>
                  </q-select>
                  <!-- --------------------------------------------------------------------------------- -->
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Art der Heizung des Neubaus/b>                                        -->
                  <!-- ACHTUNG: "multiple" notwendig für Mehrfachauswahl!!!                     -->
                  <!-- NEU: Mehrfachauswahl, mit q-chips: -->
                  <q-select
                    use-chips
                    multiple
                    hint="Hier können
                    mehrere Optionen ausgewählt werden"
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[3].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                    <!-- NEU: Styling für q-chips: -->
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
                            >{{ scope.opt }}
                          </q-tooltip>
                        </div>
                      </q-chip>
                    </template>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
              </div>
              <!-- ========================== Ende Rubrik 0 ================================== -->
              <!-- ========================== Start Rubrik 1 ================================== -->
              <q-separator />
              <div class="row full-width q-pa-xs bg-blue-grey-2">
                <!-- <b>Bestandsbau</b> -->
                <b>
                  {{
                    layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                      .rubrikenInTab[1].ueberschriftRubrik
                  }}
                </b>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <div
                class="row q-pl-xs q-pr-xs q-pt-xs q-pb-none q-col-gutter-xs full-width items-end"
              >
                <!-- Überschriften: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Art der Nutzung des Bestandsbaus/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Art der Förderung für die Sanierung von Bestandsbauten/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Baujahr des Bestandsbaus/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Denkmalschutzanforderung Bestandsbau/b>                                -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
              </div>
              <div
                class="row q-pt-none q-pl-xs q-pr-xs q-pb-xs q-col-gutter-xs full-width"
              >
                <div class="col-md-3 col-12 q-pa-xs self-center">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QToggle Feld                                                             -->
                  <!-- <b>Nutzung Bestandsbau</b>                                               -->
                  <!-- ACHTUNG: Fachliche Hilfe am @input, hard Coded Label                     -->
                  <!-- ======================================================================== -->
                  <q-toggle
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0].disable
                    "
                    label="
                      Nutzung Bestandsbau als Wohngebäude?
                    "
                    left-label
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-toggle>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Denkmalschutzanforderung Bestandsbau<b>                               -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QInput-Feld                                                              -->
                  <!-- <b>Baujahr Bestandsbau</b>                                               -->
                  <q-input
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                      )
                    "
                    mask="####"
                    fill-mask
                  >
                    <!-- --------------------------------------------------------------------------------- -->
                    <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-tooltip
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Denkmalschutzanforderung Bestandsbau</b>                              -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[3].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
              </div>
              <!-- ========================== Ende Rubrik 1 ================================== -->
              <!-- ========================== Start Rubrik 2 ================================== -->
              <q-separator />
              <div class="row full-width q-pa-xs bg-blue-grey-2">
              <!--
              <div
                class="row q-pt-none q-pl-xs q-pr-xs q-pb-xs q-col-gutter-xs full-width"
              >
              --> <!-- ALT -->
                <!-- <b>Neubau/b> -->
                <b>
                  {{
                    layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                      .rubrikenInTab[2].ueberschriftRubrik
                  }}
                </b>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <div
                class="row q-pl-xs q-pr-xs q-pt-xs q-pb-none q-col-gutter-xs full-width items-end"
              >
                <!-- Überschriften: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Nutzung Neubau/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Förderung Neubau/b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
              </div>
              <div
                class="row q-pt-none q-pl-xs q-pr-xs q-pb-xs q-col-gutter-xs full-width"
              >
                <!-- ============================ Start Feld ================================ -->
                <!-- Platzhalter                                                              -->
                <div class="col-md-3 col-12 q-pa-xs self-center">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QToggle Feld                                                             -->
                  <!-- <b>Nutzung Bestandsbau</b>                                               -->
                  <!-- ACHTUNG: Fachliche Hilfe am @input, hard Coded Label                     -->
                  <!-- ======================================================================== -->
                  <q-toggle
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0].disable
                    "
                    label="
                      Nutzung Neubau als Wohngebäude?
                    "
                    left-label
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-toggle>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Denkmalschutzanforderung Bestandsbau<b>                               -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                      }}
                    </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
              </div>
              <!-- ========================== Ende Rubrik 2 ================================== -->
            </div>
            <!-- Bisher keine weiteren Rubriken! -->
          </div>
          </div>
        </q-tab-panel>
        <!-- =============== Ende QTabPanel für "Angaben zu den Baumaßnahmen" ========================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="musterhaftigkeitTabBauvorhabenBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 3 "Musterhaftigkeit" (NEU, für #387)                                                   -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pt-xs q-gutter-xs full-width">
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Angaben zur Musterhaftigkeit des Bauvorhabens
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Angaben zur Musterhaftigkeit des Bauvorhabens
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <q-separator />
              </div>
              <!-- ========================== Start Rubrik 0 ================================== -->
              <div class="q-pa-xs q-gutter-xs">
              <div class="row full-width q-pa-xs bg-blue-grey-2">
                <!-- Rubrik 0 -->
                <!-- <b>Musterhaftigkeit</b> -->
                <b>
                  {{
                    layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                      .rubrikenInTab[0].ueberschriftRubrik
                  }}
                </b>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern  in Rubrik 1 ========================= -->
              <!--====================================================================================================================== -->
              <!-- ACHTUNG: Separate Zeile notwendig für Headers, wegen deren eventuellem Umbruch über mehrere Zeilen bei Platzmangel!!! -->
              <!-- Weiterer Grund: Mit HTML- bzw. Moustache-Werten IN den Columns für die QInput/QSelect-Felder kann die horizontale     -->
              <!-- Breite nicht voll ausgenutzt werden - das letzte col-3 (bei insgesamt 4) wird dann in eine neue Zeile umgebrochen!    -->
              <!-- Daher diese Lösung mit separater Header-Row für die HTML bzw. Moustache-Werte. Der Abstand dieser Header zu den       -->
              <!-- Feldern darunter ist allerdings etwas größer als sonst! Dafür q-pa-xs bzw. q-pt-xs verwendet!                         -->
              <!-- Außerdem ist class="items-end" notwendig am <div> für die Row für die vertikale Ausrichtung!                          -->
              <!-- ACHTUNG: Für das obige Problem, dass das letzte col-3 in einen neue Zeile umgebrochen wird, ist "q-gutter-xs"         -->
              <!--          verantwortlich. Hier deshalb stattdessen unbedingt "q-col-gutter" verwenden!                                 -->
              <!--====================================================================================================================== -->
              <div
                class="row q-pl-xs q-pr-xs q-pt-xs q-pb-none q-col-gutter-xs full-width items-end"
              >
                <!-- Überschriften-Zeile -->
                <!-- Überschriften: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- <b>Gültigkeit als Musterbauvorhaben</b> -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Leerspalte, wird nur bei  Profilformular "Raum" genutzt -->
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Erläuterung zur Gültigkeit als Musterbauvorhaben</b> -->
                  <b>
                    {{
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- Leerspalte -->
                </div>
              </div>
              <div
                class="row q-pt-none q-pl-xs q-pr-xs q-pb-xs q-col-gutter-xs full-width"
              >
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Gültigkeit als Musterbauvorhaben</b>                                  -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- Leerspalte                                                               -->
                </div>
                <!-- NEU: Zusätzliches Feld für Art der Heizung im Bestandsbau: -->
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QInput-Feld                                                             -->
                  <!-- <b>Erläuterung zur Gültigkeit als Musterbauvorhaben</b>                                  -->
                  <q-input
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1].disable
                    "
                    autogrow
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :label="
                      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- Leerspalte                                                              -->
                </div>
              </div>
              <!-- ========================== Ende Rubrik 0 ================================== -->
            </div>
            <!-- Bisher keine weiteren Rubriken! -->
          </div>
          </div>
        </q-tab-panel>
        <!-- =============== Ende QTabPanel für "Angaben zur Musterhaftigkeit" ========================== -->
      </q-tab-panels>
      <!-- =================================== Ende QTabPanels =============================================  -->
      <!-- </q-card> -->
      <!----------------------------------------------------------------------------------------------------- -->
      <!-- Start gemeinsame Button Section für alle Tabs:                                                     -->
      <!-- Die @-Methoden haben Parameter tabBauvorhabenBaueigenschaftsProfilFormular, der ihnen anzeigt,        -->
      <!-- für welches Tab sie gerufen werden                                                                 -->
      <!----------------------------------------------------------------------------------------------------- -->
      <q-separator />
      <div class="row full-width q-pa-sm q-gutter-xs">
        <q-btn
          dense
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Angaben in allen Tabs für Bauvorhaben speichern"
          @click="
            submitWerteAnBaueinheit(tabBauvorhabenBaueigenschaftsProfilFormular)
          "
          color="positive"
          glossy
          no-caps
        />
        <!-- <div class="col-1" /> -->
        <q-btn
          dense
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Eingaben auf Originalwerte zurücksetzen"
          @click="
            resetWerteAnBaueinheit(tabBauvorhabenBaueigenschaftsProfilFormular)
          "
          color="deep-orange"
          text-color="white"
          glossy
          no-caps
        />
      </div>
    </div>
  </div>
  <!--  </q-form> -->
</template>
<!-- ***===================================================================================================================================== -->
<script>
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Konstante Indexes in den Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, der das Layout für dieses Formular (Tabs/Rubriken/Baueigenschaften) steuert
// Diese konstanten Indexes entsprechen 1:1 den Tabs im Baueigenschaftsprofilformular für das Bauvorhaben
// Siehe layout-baueinheit-bauvorhaben-baueigenschafts-profil-formular.vue.js
const INDEX_FUER_PROJEKTBEZOGENE_ANGABEN_TAB_LAYOUT_BAUVORHABEN = 0;
const INDEX_FUER_PROJEKTBETEILIGTE_TAB_LAYOUT_BAUVORHABEN = 1;
const INDEX_FUER_BAUMASSNAHMEN_TAB_LAYOUT_BAUVORHABEN = 2;
// DONE: Diese Konstanten im Code unten verwendet - stattdessen wurde ursprünglich vorher dynamisch die Variable indexTabLayoutBauvorhaben verwendet. Diese
//       wurde (und wird noch) bei Tab-Wechsel gesetzt in initialisiereAusgewaehltesTabBauvorhaben().
//       Würde sich die Zuordnung der Tabs zu den Objekten im Array ändern, müsste aber dieser Code auch geändert werden, daher hat man eigentlich keinen Vorteil davon,
//       dass dieser Index eine Variable ist. Stattdessen sollten also in den disable- und reset-Methoden für einzelne Tabs (z.B. "Geopolitische Angaben") diese
//       Konstanten verwendet werden statt indexTabLayoutBauvorhaben, was anfällig für Fehler ist, wenn es falsch gesetzt ist - dann wird ggf. das falsche Tab disabled odder resetted!!!
// ACHTUNG: Diese Konstanten können leider im Template nicht verwendet werden - sondern müssten (unschön) als Variablen in data() als Variablen nachdeklariert werden unten, oder
//       stattdessen müssen eben hardcoded Werte im Template verwenet werden - kommt dort aber nur an 2 Stellen vor bisher, daher im Template diese hardcoded (siehe Kommentare dort).
//       TODO: Was wäre eine bessere Lösung?
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import { date } from "quasar";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-bauvorhaben-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// import Vue from "vue/dist/vue.js"; // NEU: Für Geocoder
// import Geocoder from "@pderas/vue2-geocoder"; // NEU: Für Geocoding (Bestimmung von geografischen Koordinaten aus Adresse über Google Maps API)
// import * as VueGoogleMaps from "vue2-google-maps";
// NEU: Für Package vue2-google-maps,https://github.com/xkjyeah/vue-google-maps/blob/vue2/README.md - zurückgestellt
//================================================================================================================================================
export default {
  // name: 'ComponentName',
  props: [
    "profilBezeichnung", // Bezeichnung des anzuzeigenden Baueigenschaftsprofils, sollte für dieses Formular "Baueinheit > Standort" sein
    "nodes", // Referenz auf nodesTreeBaueinheiten bzw. nodesTreeBaustoffe
    "selectedNode", // Referenz auf selectedNodeTreeBaueinheiten bzw. selectedNodeTreeBaustoffe
    "benutzerDarfBearbeitenSelectedNode" // Boolean, wird in aufrufender Komponente ausgewertet und der Komponente übergeben, für Disabling/Enabling von Feldern
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // HINWEIS: Zusätzlich wird Refresh-Event von der Komponente gefeuert! @refresh-request-baueigenschafts-profil
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt: false, // Merker für Fehlermeldung, wenn Profilformular nicht gerendert werden kann
      // Die folgenden Variablen waren Testdaten für die erste Version dieser Komponente, werden aktuell nicht mehr benötigt:
      /*
      placeholderAufzaehlungswertStandortTrinkwasserVersorger: [
        "Landeswasserversorgung"
      ], // Testdaten
      placeholderAufzaehlungswertStandortTrinkwasserHerkunft: ["Grundwasser"], // Testdaten
      placeholderAufzaehlungswertStandortTrinkwasserHaertebereich: ["mittel"], // Testdaten
      placeholderAufzaehlungswertStandortAbwasserMischsystem: ["Direkt"], // Testdaten
      placeholderAufzaehlungswertStandortAbwasserTrennsystem: ["Hebeanlage"], // Testdaten
      placeholderAufzaehlungswertStandortZugaengeVerkehrsmittel: ["PKW"], // Testdaten
      placeholderAufzaehlungswertStandortGebietscharakterGrundstueck: [
        "Allgemeines Wohngebiet"
      ], // Testdaten
      placeholderAufzaehlungswertStandortNachbargrundstueck01: ["Mischgebiet"], // Testdaten
      placeholderAufzaehlungswertStandortNachbargrundstueck02: ["Parkanlage"], // Testdaten
      placeholderAufzaehlungswertStandortNachbargrundstueck03: [
        "Reines Wohngebiet"
      ], // Testdaten
      placeholderAufzaehlungswertStandortNachbargrundstueck04: ["Friedhof"], // Testdaten
      placeholderAufzaehlungswertStandortWaermeenergietraeger: ["Erdgas"], // Testdaten
      placeholderAufzaehlungswertStandortTypElektrischerHausanschluss: [
        "Kabelhausanschluss"
      ], // Testdaten
      placeholderAufzaehlungswertStandortArtElektrischerHausanschluss: [
        "Hauanschlusskasten in Baugröße KH 1 für NH-Sicherungen bis 250 A"
      ], // Testdaten
      placeholderAufzaehlungswertStandortAusfuehrungElektrischerHausanschluss: [
        "Drehstrom"
      ], // Testdaten
      placeholderAufzaehlungswertStandortDatennetz: ["Strom"], // Testdaten
      placeholderAufzaehlungswertStandortImmissionenUndRestriktionen: [], // Testdaten
      optionGroupStandortTrinkwasserVersorger: [
        // Testdaten
        {
          label: "Landeswasserversorgung Baden-Württemberg",
          value: "Landeswasserversorgun Baden-Württemberg",
          color: "primary"
        },
        {
          label: "Bodensee-Wasserversorgung",
          value: "Bodensee-Wasserversorgung",
          color: "primary"
        },
        {
          label: "Wasserversorgung Nordostwürttemberg",
          value: "Wasserversorgung Nordostwürttemberg",
          color: "primary"
        },
        {
          label: "Wasserversorgung Kleine Kinzig",
          value: "Wasserversorgung Kleine Kinzig",
          color: "primary"
        },
        {
          label: "Sonstiger Wasserversorger",
          value: "Sonstiger Wasserversorger",
          color: "primary"
        },
        {
          label: "Unbekannter Wasserversorger",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortTrinkwasserHerkunft: [
        // Testdaten
        {
          label: "Bodenseewasser",
          value: "Bodenseewasser",
          color: "primary"
        },
        {
          label: "Flusswasser",
          value: "Flusswasser",
          color: "primary"
        },
        { label: "Grundwasser", value: "Grundwasser", color: "primary" },
        {
          label: "Sonstige Herkunft",
          value: "Sonstige Herkunft",
          color: "primary"
        },
        {
          label: "Unbekannte Herkunft",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortTrinkwasserHaertebereich: [
        // Testdaten
        {
          label: "weich",
          value: "weich",
          color: "green"
        },
        {
          label: "mittel",
          value: "mittel",
          color: "orange"
        },
        {
          label: "hart",
          value: "hart",
          color: "red"
        },
        {
          label: "unbekannt",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortAbwasserMischsystem: [
        // Testdaten
        { label: "Direkt", value: "Direkt", color: "green" },
        {
          label: "Über Rückstausicherung",
          value: "Über Rückstausicherung",
          color: "green"
        },
        { label: "Über Hebeanlage", value: "Über Hebeanlage", color: "orange" },
        {
          label: "Kein Anschluss an Vorflut - Hauskläranlage",
          value: "Kein Anschluss an Vorflut - Hauskläranlage",
          color: "red"
        },
        {
          label: "Unbekanntes Mischsystem",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortAbwasserTrennsystem: [
        // Testdaten
        { label: "Direkt", value: "Direkt", color: "green" },
        {
          label: "Über Rückstausicherung",
          value: "Über Rückstausicherung",
          color: "green"
        },
        { label: "Über Hebeanlage", value: "Über Hebeanlage", color: "orange" },
        {
          label: "Kein Anschluss Schmutzwasser an Vorflut - Hauskläranlage",
          value: "Kein Anschluss Schmutzwasser an Vorflut - Hauskläranlage",
          color: "red"
        },
        {
          label:
            "Kein Anschluss Regenwasser an Vorflut - Rückhaltebecken und/oder Hebeanlage",
          value:
            "Kein Anschluss Regenwasser an Vorflut - Rückhaltebecken und/oder Hebeanlage",
          color: "red"
        },
        {
          label: "Kein Anschluss Regenwasser an Vorflut - Versickerung",
          value: "Kein Anschluss Regenwasser an Vorflut - Versickerung",
          color: "red"
        },
        {
          label: "Unbekanntes Trennsystem",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortWaermeenergietraeger: [
        // Testdaten
        {
          label: "Erdgas",
          value: "Erdgas",
          color: "green"
        },
        {
          label: "Fernwärme",
          value: "Fernwärme",
          color: "green"
        },
        {
          label: "Heizöl",
          value: "Heizöl",
          color: "orange"
        },
        {
          label: "Unbekannter Wärmeenergieträger",
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortTypElektrischerHausanschluss: [
        // Testdaten
        {
          label: "Kabelhausanschluss",
          value: "Kabelhausanschluss",
          color: "primary"
        },
        {
          label: "Freileitungshausanschluss",
          value: "Freileitungshausanschluss",
          color: "primary"
        },
        {
          label: "Unbekannter Anschlusstyp",
          value: null,
          color: "grey-9"
        }
      ],

      optionGroupStandortAusfuehrungElektrischerHausanschluss: [
        // Testdaten
        {
          label: "Drehstrom",
          value: "Drehstrom",
          color: "primary"
        },
        {
          label: "Wechselstrom",
          value: "Wechselstrom",
          color: "primary"
        },
        {
          label: "Unbekannte Anschlussausführung", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
          value: null,
          color: "grey-9"
        }
      ],

      optionGroupStandortAnschluesseDatennnetz: [
        // Testdaten
        { label: "Analog-Modem", value: "Analog-Modem", color: "red" },
        {
          label: "ISDN",
          value: "ISDN",
          color: "red"
        },
        {
          label: "DSL-Kupferleitung",
          value: "DSL-Kupferleitung",
          color: "orange"
        },
        {
          label: "DSL-Glasfaser",
          value: "DSL-Glasfaser",
          color: "green"
        },
        {
          label: "TV-Kabel",
          value: "TV-Kabel",
          color: "green"
        },
        {
          label: "Satellit",
          value: "Satellit",
          color: "green"
        },
        {
          label: "Mobilfunk",
          value: "Mobilfunk",
          color: "green"
        },
        {
          label: "Unbekannte Anschlussausführung", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortZugaengeVerkehrsmittel: [
        // Testdaten
        {
          label: "Personenkraftwagen",
          value: "Personenkraftwagen",
          color: "primary"
        },
        {
          label: "Kleinlastkraftwagen (bis 3,5 Tonnen)",
          value: "Kleinlastkraftwagen (bis 3,5 Tonnen)",
          color: "primary"
        },
        {
          label: "Leichte Lastkraftwagen (bis 7,5 Tonnen)",
          value: "Leichte Lastkraftwagen (bis 7,5 Tonnen)",
          color: "primary"
        },
        {
          label: "Mittelschwere Lastkraftwagen (bis 18 Tonnen)",
          value: "Mittelschwere Lastkraftwagen (bis 18 Tonnen)",
          color: "primary"
        },
        {
          label: "Schwere Lastkraftwagen (über 18 Tonnen)",
          value: "Schwere Lastkraftwagen (über 18 Tonnen)",
          color: "primary"
        },
        {
          label: "Busse",
          value: "Busse",
          color: "primary"
        },
        {
          label: "Krane",
          value: "Krane",
          color: "primary"
        },
        {
          label: "Feuerwehrfahrzeuge",
          value: "Feuerwehrfahrzeuge",
          color: "primary"
        },
        {
          label: "Öffentliche Verkehrsmittel",
          value: "Öffentliche Verkehrsmittel",
          color: "primary"
        },
        {
          label: "Unbekannte Zugänge", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
          value: null,
          color: "grey-9"
        }
      ],
      optionGroupStandortImmissionenUndRestriktionen: [
        // Testdaten
        {
          label: "Elektrische Felder",
          value: "Elektrische Felder",
          color: "orange"
        },
        {
          label: "Erhöhte Radonkonzentration",
          value: "Erhöhte Radonkonzentration",
          color: "orange"
        },
        {
          label: "Flugbewegungen",
          value: "Flugbewegungen",
          color: "orange"
        },
        {
          label: "Fluglärmzone",
          value: "Fluglärmzone",
          color: "orange"
        },
        {
          label: "Beschränkungen für Radarreflexion",
          value: "Beschränkungen für Radarreflexion",
          color: "orange"
        },
        {
          label: "Beschränkungen für Blendschutz",
          value: "Beschränkungen für Blendschutz",
          color: "orange"
        },
        {
          label: "Trinkwasserschutzgebiet",
          value: "Trinkwasserschutzgebiet",
          color: "orange"
        },
        {
          label: "Unbekannte Immissionen und Restriktionen", // Ermöglicht Zurücksetzen des Aufzählungswerts auf null! Andernfalls ist nach einer Auswahl kein Zurücksetzen möglich!
          value: null,
          color: "grey-9"
        }
      ],

      optionsStandortArtElektrischerHausanschluss: [
        "Hausanschlusskasten in Baugröße KH 00 für NH-Sicherungen bis 100 A",
        "Hauanschlusskasten in Baugröße KH 1 für NH-Sicherungen bis 250 A",
        "Hausanschlusskasten für NH-Sicherungen NH 2 bis 400 A",
        "Sonderbauform mit Anschlussmöglichkeit für mehr als ein Hausanschlusskabel",
        "Hausanschlusskasten im Verbund mit Hauptverteilern (Hauanschlussteil)",
        "Wandeinbau-Hausanschlusskasten zur Einbringung in Außenwände",
        "Hausanschlussäule zur Aufstellung im Freien",
        "Sicherungskasten für Leitungsschutzsicherungen",
        "Klein-Hausanschlusskasten für sehr geringen Leistungsbedarf",
        "Sonstiger Hausanschluss"
      ],

      optionsStandortGebietscharakter: [
        "Industriegebiet",
        "Gewerbegebiet",
        "Kerngebiet",
        "Dorfgebiet",
        "Mischgebiet",
        "Urbanes Gebiet",
        "Allgemeines Wohngebiet",
        "Reines Wohngebiet",
        "Besonderes Wohngebiet",
        "Kleinsiedlungsgebiet",
        "Campingplatzgebiet",
        "Wochenendhausgebiet",
        "Ferienhausgebiet",
        "Krankenhaus",
        "Kurgebiet",
        "Pflegeanstalt",
        "Altenheim",
        "Kurheim",
        "Schule",
        "Friedhof",
        "Parkanlage",
        "Kleingartenanlage"
      ],
      */

      // INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT,
      // INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT,
      displayLeftArrow: "\u2190", // Konstante für Linkspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      tabBauvorhabenBaueigenschaftsProfilFormular:
        "projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular", // TODO - vorläufig
      indexFuerTabLayoutBauvorhaben: 0, // TODO - vorläufiger Index im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, der auf die Daten für ein Tab zeigt
      localStore: globalStore,
      mountedDone: false,
      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular: LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, // Array für die Speicherung von Layout-Information für
      // das spezifische Baueigenschaftsprofilformular, wird in mounted() initialisiert
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
      indexMapFuerProfilModelAusgewaehlterKnoten: [] // Aktuell nicht verwendet, Map um statt per computed-Funktion findeIndexVonBaueigenschaftSchichtdicke den Index
      // für eine Baueigenschaft mit baueigenschaftsBezeichnung im Array profilModelAusgewaehlterKnoten zu finden
      // Aufbau: {"Schicht: Schichtdicke": 17, ... }
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Schichtdicke"] liefert dann den Index
      // Muss in mounted: initialisiert werden per Funktion baueIndexMapFuerProfilModelAusgewaehlterKnoten()
      // Wird aktuell nicht verwendet, stattdessen werden computed-Funktionen verwendet

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
    };
  },
  //***=====================================================================================================================================
  methods: {
    //======================================================================================================================================

    //=============================================================================================================================
    // Die folgende Methode wurde anfangs für Testzwecke verwendet, disabled:
    /*
    returnOptionGroupBauordnungsrechtlicheAngabenTabBauvorhabenBaueigenschaftsProfilFormular(
      // DISABLED: Nur für Testzwecke verwendet!
      // Methode zur Ermittlung der Options (Return-Wert der Methode) an q-option-group im Template für das Tab "Bauordnungsrechtliche Angaben",
      // in Abhängigkeit von der baueigenschaftsBezeichnung (Parameter)
      // ACHTUNG: Die :options müssen mit dieser Methode ermittelt werden, im Format [ {label: "abc", value: "xyz", color: "uvw"}, ..., { ... } ]
      // (Array of Objects)
      // Dazu sind weiter oben Konstanten definiert für jede betroffen Baueigenschaft
      // Statt der Konstanten könnte alternativ auch mit zusätzlichem Code dieser Array of Objects generiert werden, per Zugriff auf
      // this.profilModelAusgewaehlterKnoten[
      //      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[x].rubrikenInTab[y].baueigenschaftenInRubrik[z]
      //        .indexInProfilModelAusgewaehlterKnoten
      //    ].typbezogeneBaueigenschaft
      //      .selektierbareOptionenAufzaehlungswert
      // ACHTUNG: Diese Methode kann keine computed-Funktion sein, da sie einen Parameter hat!
      baueigenschaftsBezeichnung // Parameter: String
    ) {
      console.log(
        "In returnOptionGroupBauordnungsrechtlicheAngabenTabBauvorhabenBaueigenschaftsProfilFormular() - Parameter baueigenschaftsBezeichnung: ",
        baueigenschaftsBezeichnung
      );
      switch (baueigenschaftsBezeichnung) {
        case "Baueinheit > Standort > Infrastruktur > Trinkwasser > Versorger":
          return this.optionGroupStandortTrinkwasserVersorger;
        case "Baueinheit > Standort > Infrastruktur > Trinkwasser > Herkunft":
          return this.optionGroupStandortTrinkwasserHerkunft;
        default:
          console.log(
            "Fehler: Aufruf returnOptionGroupBauordnungsrechtlicheAngabenTabBauvorhabenBaueigenschaftsProfilFormular() mit falscher baueigenschaftsBezeichnung"
          );
          return null;
      }
    },
    */

    initialisiereAusgewaehltesTabBauvorhaben() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Unter-Tabs im Baueigenschaftsprofilformular für den Standort
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log("In initialisiereAusgewaehltesTabBauvorhaben()");
      switch (this.tabBauvorhabenBaueigenschaftsProfilFormular) {
        case "projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutBauvorhaben = 0;
          break;
        case "projektBeteiligteTabBauvorhabenBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutBauvorhaben = 1;
          break;
        case "baumassnahmenTabBauvorhabenBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutBauvorhaben = 2;
          break;
        default:
          break;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Da Index geändert wurde, muss auch das Enabling/Disabling hier neu berechnet werden, sonst werden bei Tab-Wechsel
      //          die falschen Felder enalbed/disabled (z.B. die eines anderen Knotens im Baum, für den vorher das Enabling/Disabling berechnet wurde,
      //          und dann der Knoten und anschließend das Tab neu ausgewählt werden.
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
    },

    disableFelderInAbhaengigkeitVonAufzaehlungswerten() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Wrapper-Methode zum Aufruf der für ein Tab zuständigen Enabling/Disabling-Methoden
      // Aufruf in Abhängigkeit von tabBauvorhabenBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log("In disableFelderInAbhaengigkeitVonAufzaehlungswerten()");
      console.log(
        "Aktuell kein Disabling von Feldern in Abhängigkeit von Tab/Aufzählungswerten'"
      );

      switch (this.tabBauvorhabenBaueigenschaftsProfilFormular) {
        case "projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        case "projektBeteiligteTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        case "baumassnahmenTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        default:
          break;
      }
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

    selectModelChangedAufzaehlungswert( // NEU
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte (in diesem Formular für "Baueinheit > Standort" sind das zahlreiche, kaskadierend arbeitende Aufzählungswerte):
      // a) In Abhängigkeit von der bisher ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
      // Baueigenschaft, die einen "steuernden" Aufzählungswert (z.B."Baueinheit > Standort > Geopolitik > Welt > Kontinent") repräsentiert, sondern auch für
      // andere Baueigenschaften vom Wertetyp "Aufzählungswert" im Formular, die in Abhängigkeit von der ausgewählten Option am "steuernden"
      // Aufzählungswert disabled/enabled oder auf null gesetzt werden.
      // eigenschaftInProfilModelAusgewaehlterKnoten, // Parameter: Die Eigenschaft im Array profilModelAusgewaehlterKnoten,
      // Aufbau (flach):
      // {<alle Felder der Baueigenschaft, populiert, inklusive Wertefeldern>,
      //  idTypbezogeneBaueigenschaft, baueigenschaftsBezeichnung, bezeichnungWerteVererbenderElternknoten, aktiviertNichtDeaktiviert
      // }
      //-------------------------------------------------------------------------------------------------------------------------------------
      newSelectModelValue // Parameter: String mit neuer ausgewählter Option des Aufzählungswerts, siehe https://quasar.dev/vue-components/select#QSelect-API
      // ACHTUNG: Ist per Log beim ersten Aufruf allerdings ein Array, da so vom Backend geliefert (auch für potentielle Multi-Selects)!!!
      //          Daher ist unten Code enthalten, der nur in diesem Fall den Wert von Array nach String konvertiert!!!
      //--------------------------------------------------------------------------------------------------------------------------------------
    ) {
      console.log("In selectModelChangedAufzaehlungswert()");
      console.log(
        "Parameter eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert = [newSelectModelValue]; // ACHTUNG: Muss Array sein, sonst Probleme beim Speichern im Backend
      console.log("newSelectModelValue: ", newSelectModelValue);

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
      //---------------------------------------------------------------------------------------------------------------------
      // Es folgt Resetting und Enabling/Disabling von Feldern in Abhängigkeit vom im Formular geänderten Aufzählungswerten
      // (nach Vorlage aus Formular für Schicht):
      // ALT: Dieser Code war usrprünglich spezifisch für Tab "Geopolitische Angaben"!!!
      // NEU: Es fogt Wrapper-Code zum Aufruf der für ein Tab zuständigen Enabling/Disabling-Methoden
      // Aufruf in Abhängigkeit von tabBauvorhabenBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "Vor spezifischem Reset/Enabling/Disabling für das ausgewählte Tab: ",
        this.tabBauvorhabenBaueigenschaftsProfilFormular
      );
      console.log(
        "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
        eigenschaftInLayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
      );
      console.log(
        "ACHTUNG: Bisher nicht implementiert für Profilformular 'Bauvorhaben'"
      );

      // Falls Resetting und Enabling/Disabling gebraucht wird: Codevorlage ist in
      // selber Funktion in baueinheit-standort-baueigenschafts-profil-formular.vue
      // Noop:
      switch (this.tabBauvorhabenBaueigenschaftsProfilFormular) {
        case "projektbezogeneAngabenTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        case "projektBeteiligteTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        case "baumassnahmenTabBauvorhabenBaueigenschaftsProfilFormular":
          //
          break;
        default:
          break;
      }
    },

    submitWerteAnBaueinheit(
      tab // Parameter: aktuelles Tab - wird aktuell noch nicht verwendet
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
      // console.log("Parameter tab: ", tab);
      // Vorlage-Code für Extrakt genau der Eigenschaften (aus der größeren Gesamtmenge in profilModelAusgewaehlterKnoten), die durch die im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
      // enthaltenen Rubriken FUER DAS AKTUELL AUSGEWÄHLTE TAB bestimmt sind (diese Untermenge von Eigenschaften wird als Input-Felder in dem betreffenden Tab angezeigt).
      // indexFuerTabLayoutBauvorhaben zeigt dabei immmer auf das Element (= Objekt mit enthaltenem Array der Eigenschaften im jeweiligen Tab im Unterobjekt rubrikenInTab) des Arrays
      // layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular mit den Eigenschaften für das jeweilige Unter-Tab des Profilformulars für "Baueinheit > Bauvorhaben".
      // Der Code hier wandert dann durch die Rubriken in diesem Element des Arrays, macht aktuell aber nur ein console.log der betreffenden Eigenschaften
      // Code disabled, da aktuell nicht gebraucht:
      /*
      for (let rubrik of this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[
        this.indexFuerTabLayoutBauvorhaben
      ].rubrikenInTab) {
        console.log(
          "Eigenschaft in Rubrik: ",
          rubrik.ueberschriftRubrik,
          rubrik.baueigenschaftenInRubrik.map(
            arg =>
              this.profilModelAusgewaehlterKnoten[ // Hier erfolgt das Index-Mapping zwischen den beiden Arrays
                arg.indexInProfilModelAusgewaehlterKnoten
              ]
          )
        );
      }
      */
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
      // Nun die Date-Strings zurückkonvertieren in die von Mongoose benötigten UTC Dates:
      // ACHTUNG: Dies geht mittels Quasar Date Util formatDate nicht direkt mit dem String als erstem Parameter (nur für Strings im Format YYYY-MM-DD!),
      // sondern nur, nachdem der bisherige String umständlich mit dem Code unten in ein Date-Objekt umgewandelt wurde!!!
      // Diese Utilities werden im übrigen auch für die andere Richtung verwendet, von Date nach String!!!
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
          ); // String, wegen Konvertierung schon beim Laden im Format DD.MM.YYYY, z.B. 14.10.2020
          // Zurückkonvertieren in das von Mongoose benötigte Format YYYY-MM-DD:
          // Wird mangels besserer funktionierender Alternativen (Paket Moments ist z.B. zu heavyweight) hier im Folgenden einfach per String-Split gemacht:
          if (eigenschaft.datumsWert1 != null) {
            // ACHTUNG: Sonst undefined-Fehler im Log bei nicht ausgefülltem datumsWert1 (d.h. null)!
            let splittedDateString = eigenschaft.datumsWert1.split(".");
            // Rekonstruiere JS Date Objekt aus dem gesplitteten String - erfordert per Test noch eine Korrektur -1 beim Monat!!! Format ist YYYY, MM-1, DD
            let dateObject = new Date(
              splittedDateString[2],
              splittedDateString[1] - 1,
              splittedDateString[0]
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
          ); // String, wegen Konvertierung schon beim Laden im Format DD.MM.YYYY, z.B. 14.10.2020
          // Zurückkonvertieren in das von Mongoose benötigte Format YYYY-MM-DD:
          // Wird mangels besserer funktionierender Alternativen (Paket Moments ist z.B. zu heavyweight) hier im Folgenden einfach per String-Split gemacht:
          if (eigenschaft.datumsWert2 != null) {
            // ACHTUNG: Sonst undefined-Fehler im Log bei nicht ausgefülltem datumsWert2 (d.h. null)!
            let splittedDateString = eigenschaft.datumsWert2.split(".");
            // Rekonstruiere JS Date Objekt aus dem gesplitteten String - erfordert per Test noch eine Korrektur -1 beim Monat!!! Format ist YYYY, MM-1, DD
            let dateObject = new Date(
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
              "Nach Date Conversion für Backend Call - eigenschaft.datumsWert1: ",
              eigenschaft.datumsWert2
            ); // Muss im Browser Log im Format YYYY-MM-DD sein, z.B. 14.10.2020
          } // /else // null belassen
        }
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular und führe ggf. die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) {
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
      //-------------------------------------------------------------------------------
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
              console.log("An einem Elternknoten definierte Baueigenschaft: ", node_i_baueigenschaft);
              vererbungsInformation.werteVererbenderElternKnoten = node_i;
              vererbungsInformation.baueigenschaftAnWerteVererbendemElternKnoten = node_i_baueigenschaft;
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
          arg => arg.baueigenschaftAnWerteVererbendemElternKnoten !== undefined
        )
        .map(arg => {
          return (
            arg.baueigenschaftAnWerteVererbendemElternKnoten
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
          baueigenschaftAnWerteVererbendemElternKnoten:
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

    resetWerteAnBaueinheit(
      tab // Parameter: aktuelles Tab in Formular für Bauvorhaben - wird noch nicht verwendet!
    ) {
      // ALT: Hieß handleReset()
      // Resetted die eventuell im Form geänderten Werte im Profil auf die ursprünglichen Werte aus dem selektierten Node (Prop)
      // NEU: Auch hier Disabling/Enabling notwendig, weil die steuernden Werte dafür im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
      //      ebenfalls angepasst werden müssen!
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In resetWerteAnBaueinheit() - Parameter tab: ", tab);
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
      // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld baueigenschaftAnWerteVererbendemElternknoten
      // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
      // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld baueigenschaftAnWerteVererbendemElternknoten
      // die Id des Elternknotens anhängen, an dem die Eigenschaft erstmals
      // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
      // baueigenschaftAnWerteVererbendemElternknoten stattdessen null
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
        //========================================================================================================================================
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        //----------------------------------------------------------------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) {
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
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      //-----------------------------------------------------------------------------------------------------------------------------------------------
    }
  },

  //***====================================================================================================================================== */
  computed: {
    // Nur als Vorlage - Code ist spezifisch für bestimmte Baueigenschaften im Profil "Baueinheit > Standort", müsste angepasst werden
    //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    computeMaximumVonHGWUndHHW: function() {
      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      // computed-Funktion zur Bestimmung des Maximums aus den Werten für HGW und HHW
      // ACHTUNG: Diese computed-Funktion erledigt auch gleich den Update des für das Maximum definierten Baueigenschaft passenden v-models im Array
      //          profilModelAusgewaehlterKnoten!!!
      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log("In computeMaximumVonHGWUndHHW (computed)");
      let maximum = Math.max(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[4]
            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
            .indexInProfilModelAusgewaehlterKnoten
        ].kennWert1,
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[4]
            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
            .indexInProfilModelAusgewaehlterKnoten
        ].kennWert1
      );
      console.log("maximum: ", maximum);
      // Es folgt der Update des v-models der Baueigenschaft für das Maximum aus HGW und HHW
      // Deren "Koordinaten" sind definiert in layout-baueinheit-standort-baueigenschafts-profil-formular.js
      // ACHTUNG: Bei direktem Update ohne Vue $set kommt Fehler: Unerlaubter Side Effect!!!
      // Daher per Vue $set:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular[4]
            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
            .indexInProfilModelAusgewaehlterKnoten
        ],
        "kennWert1",
        maximum
      );
      return maximum;
    },

    // Nur als Vorlage für ähnliche Funktionen:
    computeURLGeoportalBadenWuerttemberg: function() {
      let urlGeoportalBadenWuerttemberg =
        "https://www.geoportal-bw.de/startseite";
      return urlGeoportalBadenWuerttemberg;
    },

    // Nur als Vorlage für ähnliche Funktionen:
    computeCheckAufAdresseStandortBaueigenschaftsProfilFormular: function() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // NEU für Button "Geokoordinaten aus Adresse ermitteln"
      // Computed Property, die prüft, ob alle dafür notwendigen Adressfelder vorhanden sind.
      //------------------------------------------------------------------------------------------------------------------------------------
      let indexAdressePLZUndOrt = this.findeIndexVonBaueigenschaft(
        "Baueinheit > Standort > Geografie > Anschrift > Postleitzahl und Ort"
      );
      let indexAdresseStrasseUndHausnummer = this.findeIndexVonBaueigenschaft(
        "Baueinheit > Standort > Geografie > Anschrift > Straße und Hausnummer"
      );
      let ort = this.profilModelAusgewaehlterKnoten[indexAdressePLZUndOrt]
        .bezeichnungsWert2; // Ort
      let strasse = this.profilModelAusgewaehlterKnoten[
        indexAdresseStrasseUndHausnummer
      ].bezeichnungsWert1; // Straße
      if (ort === null || ort === "" || strasse === null || strasse === "") {
        return true;
      } else {
        return false;
      }
    }

    //---------------------------------------------------------------------------------------------------------------------------------------------------
    // Die folgenden computed-Funktionen werden mit dem neuen, generischen Design (v-for-Aufbau des Profilformulars im Template aus dem
    // Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) nicht mehr benötigt, daher auskommentiert:
    /*
    findeIndexVonBaueigenschaftSchichttypImBodenaufbau() {
      // HINWEIS: Diese computed-Funktion wurde zuerst noch aufgerufen weiter unten, daher erst später disabled,
      //          wie die übrigen solchen computed-Funktionen. Dafür musste in der @input-Methode
      //          als weiterer Parameter die Eigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular mitgegeben werden, wo
      //          der gesuchte Index im Array profilModelAusgewaehlterKnoten für die Baueigenschaft "Schichttyp im Bodenaufbau" bereits
      //          gespeichert ist (wird in mounted() initialisiert)
      //--------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, um Index einer Baueigenschaft im Array für das Model für die Baueigenschaften im Baueigenschaftsprofilformular zu finden
      // ACHTUNG: Ist eine computed-Funktion, kann keine Parameter haben - Bestimmung der Baueigenschaft muss über Funktionsnamen passieren!
      let bezeichnungBaueigenschaft = "Schicht: Schichttyp im Bodenaufbau"; // String
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
      let bezeichnungAufzaehlungsWert = "Schicht: Schichttyp im Bodenaufbau"; // String
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
      let bezeichnungAufzaehlungsWert = "Schicht: Schichttyp im Bodenaufbau"; // String
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
      let bezeichnungAufzaehlungsWert = "Schicht: Schichttyp im Bodenaufbau"; // String
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
      let bezeichnungAufzaehlungsWert = "Schicht: Schichttyp im Bodenaufbau"; // String
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
          "In watch von baueinheit-bauvorhaben-baueigenschafts-profil-formular.vue.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
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
        // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld baueigenschaftAnWerteVererbendemElternknoten
        // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
        // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld baueigenschaftAnWerteVererbendemElternknoten
        // die Id des Elternknotens anhängen, an dem die Eigenschaft erstmals
        // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
        // baueigenschaftAnWerteVererbendemElternknoten stattdessen null
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
        }
      }
    },
    //---------------------------------------------------------------------------------------------------------------------------------------
    selectedNode: {
      //--------------------------------------------------------------------------------------------------------------
      // Watch auf Prop "selectedNode"
      // Festgestelltes Problem: handler für watch wird vor mounted() aufgerufen - mit immediate: false vermieden
      //---------------------------------------------------------------------------------------------------------------
      immediate: false,
      handler: function(value) {
        console.log(
          "In watch von baueinheit-bauvorhaben-baueigenschafts-profil-formular.vue.vue: Änderung der Prop selectedNode erkannt"
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
          // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld baueigenschaftAnWerteVererbendemElternknoten
          // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
          // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld baueigenschaftAnWerteVererbendemElternknoten
          // die Id des Elternknotens anhängen, an dem die Eigenschaft erstmals
          // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
          // baueigenschaftAnWerteVererbendemElternknoten stattdessen null
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
            //========================================================================================================================================
            // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
            //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
            // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
            // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
            //----------------------------------------------------------------------------------------------------------------------------------------
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Aufzählungswert"
            ) {
              // Finde Baueigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) {
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
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted () und Reset-Methode
        }
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von baueinheit-bauvorhaben-baueigenschafts-profil-formular.vue.vue"
    );
    // this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl des Profils im generischen Formular - wird hier nicht benötigt
    this.readZugehoerigesProfil()
      .then(() => {
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
          // Nun im Array profilModelAusgewaehlterKnoten ein zusätzliches Feld baueigenschaftAnWerteVererbendemElternknoten
          // für jede Baueigenschaft im Profil setzen, welches anzeigt, ob das Feld bereits weiter oben im Elternpfad definiert ist:
          // Dazu für jede Baueigenschaft in profilModelAusgewaehlterKnoten im Feld baueigenschaftAnWerteVererbendemElternknoten
          // die Id des Elternknotens anhängen, an dem die Eigenschaft erstmals
          // im Elternpfad definiert ist. Wenn sie im Elternpfad nicht definiert ist, steht im Feld
          // baueigenschaftAnWerteVererbendemElternknoten stattdessen null
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
          // NEU: Initialisiere den Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
          // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

          // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
          // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
          for (let tab of this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) {
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
                  baueigenschaftInRubrik.baueigenschaftsBezeichnung !==
                  undefined // Notwendig, sonst hier Fehler bei Rubriken ohne Baueigenschaften!!!
                ) {
                  console.log(
                    "In for in Reihenfolge der Baueigenschaften in layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
                    baueigenschaftInRubrik.baueigenschaftsBezeichnung
                  );
                  baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten = this.findeIndexVonBaueigenschaft(
                    baueigenschaftInRubrik.baueigenschaftsBezeichnung
                  );
                }
              }
            }
          }
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular
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
            // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss auch bei Reset und in Watch ausgeführt werden!
            // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format
            //       zurückverwandelt werden, denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
            //       Vorlage: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
            //       this.ausgewaehlteBaueigenschaft.datumsWert1 = date.formatDate(
            //          this.ausgewaehlteBaueigenschaft.datumsWert1, // Erfordert normalerweise Date Format als 1. Parameter, nicht String!
            //          "YYYY-MM-DD") // Ausnahme: Akzeptiert auch String im Format "YYYY-MM-DD"
            //       Dies erfolgt in submitWerteAnBaueinheit()
            //       ACHTUNG: In baueinheiten.vue etc. ist datumsWert1/2 aber nicht wie hier (wegen Konvertierung auf dem "Hinweg" in mounted() etc., weil QDate (wie QTime) nur mit
            //       Strings arbeitet) im Format String, sondern im UTC-Date-Format. Hier in baueigenschafts-profil-formulare.vue ist wegen der Konvertierung nach
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
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Aufzählungswert"
            ) {
              // Finde Baueigenschaft im Array layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular) {
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
          // DONE: Obiger Code zur Konvertierung des Aufzählungswerts auf dem "Hinweg" muss auch bei Reset und in Watch ausgeführt werden, in
          //       resetWerteAnBaueinheit() und Watch für selectedNode
          // DONE: Aufzählungswerte für type="radio" im Format String müssen auf dem "Rückweg" VOR Speicherung wieder in Arrays zurückkonvertiert werden,
          //       in submitWerteAnBaueinheit()
          //========================================================================================================================================
        }
        //-----------------------------------------------------------------------------------------------------------------------------------------------
        this.mountedDone = true; // Wird im Template per v-if verwendet, verhindert Rendering vor Abschluss von mounted()
        //------------------------------------------------------------------------------------------------------------------------------------------
      }) // Catch-Block für Error, wenn zugehöriges Profil nicht gefunden wurde:
      .catch(error => {
        console.log("Error aus readZugehoerigesProfil() - error: ", error);
        // Die Benutzernachricht wird bereits in readZugehoerigesProfil() ausgelöst, daher hier unterdrückt:
        /*
      globalStore.showBenutzerNachricht(
        BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LESEN_FEHLER
      );
      */
      }); // /.catch
  } // /mounted:
};
</script>
<style>
.lineheight {
  line-height: 160%;
} /* Nur für Testzwecke, wird zusammen mit class="lineheight" verwendet für Anpassung der Zeilenhöhe */
</style>
