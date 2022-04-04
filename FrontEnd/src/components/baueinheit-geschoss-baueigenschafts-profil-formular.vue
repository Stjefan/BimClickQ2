<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für spezifisches Baueigenschaftsprofilformular für Baueigenschaftsprofil "Baueinheit > Geschoss"                            -->
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
    <div v-if="profilBezeichnung !== 'Baueinheit > Geschoss'">
      TODO: Aufruf mit falscher profilBezeichnung!
    </div>
    <div v-else>
      <!-- </q-card> -->
      <!-- ACHTUNG: Diese q-card DISABLED, da sie einen horizontalen Scrollbalken verursacht unter dem Formular!!! -->
      <!-- @input="initialisiereAusgewaehltesTabGeschossBaueigenschaftsProfilFormular" -->
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
        v-model="tabGeschossBaueigenschaftsProfilFormular"
        @input="initialisiereAusgewaehltesTabGeschoss"
      >
        <q-tab
          name="geometrieTabGeschossBaueigenschaftsProfilFormular"
          label="Geometrie"
          no-caps
        />
        <!-- NEU - #387 -->
        <q-tab
          name="musterhaftigkeitTabGeschossBaueigenschaftsProfilFormular"
          label="Musterhaftigkeit"
          no-caps
        />
        <!--
        <q-tab
          name="xyzAngabenTabGeschossBaueigenschaftsProfilFormular"
          label="Tab xyz"
          no-caps
        />
        -->
      </q-tabs>
      <!-- <q-separator /> -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
      <q-tab-panels v-model="tabGeschossBaueigenschaftsProfilFormular" animated>
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="geometrieTabGeschossBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab "Geometrie"                                                                            -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="q-pa-xs">
            <div v-if="zuFormularGehoerigesProfil">
              <!--
              <div style="color: red">
                <b
                  >[Hinweis: Funktion ist in Entwicklung - bitte vorläufig hier
                  noch keine Werte speichern]</b
                >
              </div>
              -->
              <!-- Experimentelle Anpassung der Textgröße in Abhängigkeit von Screen Size mit Quasar Screen Plugin -->
              <!-- https://quasar.dev/options/screen-plugin -->
              <div v-if="$q.screen.gt.sm" class="text-h6">
                <!-- Auf Desktop Screens -->
                Geometrieangaben zum Geschoss
                an der im Bauvorhabenbaum ausgewählten Baueinheit
                <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
              </div>
              <div v-else class="text-subtitle1">
                <!-- Auf kleineren Screens -->
                Geometrieangaben zum Geschoss
                an der im Bauvorhabenbaum ausgewählten Baueinheit
                <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
              </div>
            </div>
            <!-- =============================================================================== -->
            <!-- -->
            <!-- ========================== Start Rubrik 0 ===================================== -->
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
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ======================================================================================== -->
              <!-- R1 C1 / Rubrik 1 (Rubrik 0 ist für gemeinsame Baueigenschaften mit anderen Profilen!) -->
              <div class="col-md-5 col-12">
                <div class="row q-pa-xs bg-indigo-2">
                  <!-- <b>Deckenniveaus</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C1 -->
                <div class="row q-pa-xs q-col-gutter-xs">
                  <div class="col-md-4 col-12 text-center self-center">
                    <!-- -->
                    <b>
                      Niveau
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m über 0,0]
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m über NHN]
                    </b>
                  </div>
                  <div class="col-md-2 col-12 text-center self-center">
                    <b>
                      Aktion
                    </b>
                  </div>
                </div>
                <!-- =========================================================================================== -->
                <!-- OKFD: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- ALT: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ========================================================================================= -->
                  <!-- NEU: Stattdessen Dezimalzahlen mit VueAutoNumeric (gilt für alle 4 x 2 Niveau-Feld-Paare) -->
                  <!-- ACHTUNG: Mit q-input statt q-field funktioniert die Dezimalzahl-Formatierung durch        -->
                  <!--          VueAutoNumeric NICHT!                                                            -->
                  <!--          Der Typ des v-models für das Feld ist dann String, nicht Number!!!               -->
                  <!-- ACHTUNG: Für die 2. Spalte (NHN-Werte) wird die Formatierung als Dezimalzahlen durch die  -->
                  <!--          computed-Funktion erledigt. Man könnte dort auf die VueAutoNumerics auch ver-    -->
                  <!--          zichten, muss dann allerdings q-input statt q-field nehmen, wie schon für die    -->
                  <!--          Felder in den beiden rechten Spalten auf diesem Tab "Geometrie"                  -->
                  <!-- ACHTUNG: Alle Felder in 2. Spalte sind disabled - stattdessen aber (mit VueAutoNumeric)   -->
                  <!--          readonly genommen (hatte Fehler mit VMoney!).                                    -->
                  <!--          Nur dann ist Copy und Tooltip aktiv.                                             -->
                  <!-- ACHTUNG: In den Options für VueAutoNumeric sind Min/Max-Werte spezifiziert (+/-999.99)    -->
                  <!--          für die 0.0-Werte. Die berechneten NHN-Werte können größer/kleiner sein, dann    -->
                  <!--          kommen Errors im Log. Daher für Felder in 2. Spalte andere Options verwendet.    -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--3
                      :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                      "
                      -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refOKFD"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateOKFD"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <!-- HINWEIS: Die ref taucht in $refs auf, es wird aber zur Validierung die ref -->
                        <!-- des umgebenden q-fields oben verwendet! -->
                        <vue-autonumeric
                          ref="refOKFDAutoNumeric"
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('OKFD', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('OKFD', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                      -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                        "
                      -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauOKFD"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!--
                        <template
                          v-slot:control="{
                            id,
                            floatingLabel,
                            value,
                            emitValue
                          }"
                        >
                        -->
                      <!-- NEU: -->
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
                      <!-- ALT: -->
                      <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      <!--
                        </template>
                        -->
                    </q-input>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <div class="col-md-2 col-12">
                    <!-- ACHTUNG - QBtn Styling: class="stretch" beeinflusst hier, warum auch immer, nicht die vertikale Höhe -->
                    <!-- WORKAROUND: style="min-height: 63%" -->
                    <q-btn
                      dense
                      :disable="!benutzerDarfBearbeitenSelectedNode"
                      class="stretch full-width"
                      style="min-height: 63%"
                      label="Decke"
                      icon-right="arrow_upward"
                      color="grey-4"
                      text-color="black"
                      @click="
                        changeNiveau('OKFD', 0.01);
                        changeNiveau('OKRD', 0.01);
                        changeNiveau('UKRD', 0.01);
                        changeNiveau('UKFD', 0.01);
                      "
                      glossy
                      no-caps
                    />
                  </div>
                  <!-- ---------------------------------------------------------------------------------- -->
                </div>
                <!-- =========================================================================================== -->
                <!-- OKRD: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                      .labelBaueigenschaft
                     "
                -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refOKRD"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateOKRD"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('OKRD', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('OKRD', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauOKRD"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <!-- ---------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12"></div>
                  <!-- ---------------------------------------------------------------------------------- -->
                </div>
                <!-- =========================================================================================== -->
                <!-- UKRD: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                      .labelBaueigenschaft
                     "
                -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refUKRD"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateUKRD"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('UKRD', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('UKRD', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauUKRD"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <!-- ---------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12"></div>
                </div>
                <!-- =========================================================================================== -->
                <!-- UKFD: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                      .labelBaueigenschaft
                     "
                -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refUKFD"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateUKFD"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('UKFD', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('UKFD', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauUKFD"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <div class="col-md-2 col-12">
                    <!-- ACHTUNG - QBtn Styling: class="stretch" beeinflusst hier, warum auch immer, nicht die vertikale Höhe -->
                    <!-- WORKAROUND: style="min-height: 63%" -->
                    <q-btn
                      dense
                      :disable="!benutzerDarfBearbeitenSelectedNode"
                      class="stretch full-width"
                      style="min-height: 63%"
                      label="Decke"
                      icon-right="arrow_downward"
                      color="grey-4"
                      text-color="black"
                      @click="
                        changeNiveau('OKFD', -0.01);
                        changeNiveau('OKRD', -0.01);
                        changeNiveau('UKRD', -0.01);
                        changeNiveau('UKFD', -0.01);
                      "
                      glossy
                      no-caps
                    />
                  </div>
                  <!-- ---------------------------------------------------------------------------------- -->
                  <div class="row q-pa-xs">
                    <div class="col-md-12 col-12 text-caption">
                      <b>Hinweis:</b> Alle <span style='color: #000000; background-color: #C8E6C9'>hellgrünen</span> Felder sowie die lichte
                      Raumhöhe sind automatisch berechnete Ausgabefelder
                    </div>
                  </div>
                </div>
              </div>
              <!-- =========================================================================================== -->
              <!-- R1 C2 -->
              <div class="col-md-3 col-12">
                <div class="row q-pa-xs bg-blue-2">
                  <q-separator />
                  <!-- <b>Berechnete Maße der Geschossdecke</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[2].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C2 / Rubrik 2 -->
                <div class="row q-pa-xs">
                  <div class="col-md-8 col-12 text-right self-center">
                    <!-- -->
                    <b>
                      Maß
                    </b>
                  </div>
                  <div class="col-md-4 col-12 text-center self-center">
                    <b>
                      [m]
                    </b>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Aufbauhöhe: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Aufbauhöhe [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Dicke Rohdecke: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Dicke Rohdecke [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Dicke Deckenunterseite: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Dicke Deckenunterseite [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Gesamtdicke des Deckenaufbaus: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    <b>
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      }}
                    </b>
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Gesamtdicke [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                    -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Lichte Höhe: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-right">
                    <b>
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      }}
                      <br />(UKFD - OKFFB)
                    </b>
                    <!-- ===================== ACHTUNG: Hier Text hinzugefügt und self-center entfernt! ======================= -->
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="lime-4"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Lichte Höhe [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
              </div>
              <!-- =========================================================================================== -->
              <!-- R1 C3 / Rubrik 3  -->
              <div class="col-md-4 col-12">
                <div class="row q-pa-xs bg-cyan-2">
                  <q-separator />
                  <!-- <b>Brüstungsbezogene Maße im Geschoss</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[3].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C2 -->
                <div class="row q-pa-xs">
                  <div class="col-md-6 col-12 text-right self-center">
                    <!-- -->
                    <b>
                      Maß
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m]
                    </b>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Absturzhöhe: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-6 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      dense
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      label="Absturzhöhe [m]"
                      hint="Handeingabe"
                      type="number"
                      step="0.01"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Brüstungshöhe: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-6 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      dense
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      label="Brüstungshöhe [m]"
                      hint="Handeingabe"
                      type="number"
                      step="0.01"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Brüstungshöhe Rohbaumaß: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-6 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      dense
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      label="Rohbaumaß Brüstungshöhe [m]"
                      hint="Handeingabe"
                      type="number"
                      step="0.01"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[3].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
            <!-- ===================================================================================================================== -->
            <q-separator />
            <div class="row full-width q-pa-xs q-col-gutter-xs">
              <!-- ======================================================================================== -->
              <!-- R2 C1 / Rubrik 4 (Rubrik 0 ist für gemeinsame Baueigenschaften mit anderen Profilen!) -->
              <div class="col-md-5 col-12">
                <div class="row q-pa-xs bg-indigo-2">
                  <!-- <b>Bodenniveaus</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C1 -->
                <div class="row q-pa-xs q-col-gutter-xs">
                  <div class="col-md-4 col-12 text-center self-center">
                    <!-- -->
                    <b>
                      Niveau
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m über 0,0]
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m über NHN]
                    </b>
                  </div>
                  <div class="col-md-2 col-12">
                    <b>
                      Aktion
                    </b>
                  </div>
                </div>
                <!-- =========================================================================================== -->
                <!-- OKFFB: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--3
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                      .labelBaueigenschaft
                     "
                  -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refOKFFB"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateOKFFB"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('OKFFB', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('OKFFB', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauOKFFB"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <div class="col-md-2 col-12">
                    <!-- ACHTUNG - QBtn Styling: class="stretch" beeinflusst hier, warum auch immer, nicht die vertikale Höhe -->
                    <!-- WORKAROUND: style="min-height: 63%" -->
                    <q-btn
                      dense
                      :disable="!benutzerDarfBearbeitenSelectedNode"
                      class="stretch full-width"
                      style="min-height: 63%"
                      label="Boden"
                      icon-right="arrow_upward"
                      color="grey-4"
                      text-color="black"
                      @click="
                        changeNiveau('OKFFB', 0.01);
                        changeNiveau('OKRFB', 0.01);
                        changeNiveau('UKRFB', 0.01);
                        changeNiveau('UKFFB', 0.01);
                      "
                      glossy
                      no-caps
                    />
                  </div>
                  <!-- ---------------------------------------------------------------------------------- -->
                </div>
                <!-- =========================================================================================== -->
                <!-- OKRFB: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                      .labelBaueigenschaft
                     "
                -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refOKRFB"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateOKRFB"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('OKRFB', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('OKRFB', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauOKRFB"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <!-- ---------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12"></div>
                  <!-- ---------------------------------------------------------------------------------- -->
                </div>
                <!-- =========================================================================================== -->
                <!-- UKRFB: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                      :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                      "
                      -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refUKRFB"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateUKRFB"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('UKRFB', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('UKRFB', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauUKRFB"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <!-- ---------------------------------------------------------------------------- -->
                  <div class="col-md-2 col-12"></div>
                </div>
                <!-- =========================================================================================== -->
                <!-- UKFFB: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-4 col-12 text-caption">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Spezielle Eingabefelder für Dezimalzahlen mit VMoney:                                -->
                  <!-- ACHTUNG: Das v-model wird durch VMoney von Number nach String (Dezimalstring)             -->
                  <!--          konvertiert und muss deshalb vor Submit in das von Mongoose erwartete            -->
                  <!--          Format "Number" rückkonvertiert werden, in submitWerteAnBaueinheit()             -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-3 col-12">
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                      .labelBaueigenschaft
                     "
                -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <q-field
                      ref="refUKFFB"
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :disable="
                        !benutzerDarfBearbeitenSelectedNode ||
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].bezeichnungWerteVererbenderElternknoten !=
                            null ||
                          !profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aktiviertNichtDeaktiviert ||
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .disable
                      "
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      label="[m ü. 0,0]"
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :rules="validateUKFFB"
                      lazy-rules hint="Handeingabe"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
                        <vue-autonumeric
                          :id="id"
                          class="q-field__native text-right"
                          :options="autoNumericOptionsWithMinMax"
                          :value="value"
                          @input="emitValue"
                          :placeholder="'###,##'"
                          v-show="floatingLabel"
                        >
                        </vue-autonumeric>
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                      <template v-slot:prepend>
                        <q-btn
                          dense
                          @click="changeNiveau('UKFFB', 0.01)"
                          icon="arrow_upward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                      <template v-slot:append>
                        <q-btn
                          dense
                          @click="changeNiveau('UKFFB', -0.01)"
                          icon="arrow_downward"
                          color="grey-4"
                          text-color="black"
                          style="width:22px"
                          glossy
                        >
                        </q-btn>
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert1:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      }}
                    </div>
                  </div>
                  <div class="col-md-3 col-12">
                    <!-- ======================================================================================================= -->
                    <!-- Bei Variante mit watch: v-model="nhnNiveau"                                                             -->
                    <!-- Bei Variante mit computed: v-model="computeNHNNiveau"                                                   -->
                    <!-- In der Variante mit computed wird die Formatierung allerdings durch die computed-Funktion erledigt,     -->
                    <!-- daher kann in diesem Spezialfall per Tests auch q-input verwendet werden statt q-field!                 -->
                    <!-- In beiden Fällen (q-input und q-field) kamen allerdings im Test Vue Warnings                            -->
                    <!-- "Computed property "computeNHNNiveau" was assigned to but it has no setter."                            -->
                    <!-- Diese verschwanden nach Umstellung der computed-Funktion unten auf                                      -->
                    <!-- Getter und Setter. Eventuell kommen diese Warnings auch nur, wenn in der computed-Funktion die          -->
                    <!-- experimentellen Side Effect Updates mit Vue $set aktiv sind!!!                                         -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Hier vorläufige computed-Berechnung des v-models für den NHN-Wert in kennWert2 statt -->
                    <!-- des folgenden regulären v-model: -->
                    <!--
                      v-model="
                        profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                       "
                    -->
                    <!-- ACHTUNG: Hier Custom Label statt: -->
                    <!--
                        :label="
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                        "
                    -->
                    <!-- ACHTUNG: Feld immer disabled! -->
                    <!-- ACHTUNG: Bisher kein Hint! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Bei Verwendung von "readonly" statt "disable" können, vermutlich durch VMoney    -->
                    <!--          bedingt, trotzdem die Werte editiert werden!!! Daher "disable" statt "readonly"! -->
                    <!-- ----------------------------------------------------------------------------------------- -->
                    <q-field
                      readonly
                      dense
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauUKFFB"
                      label="[m ü. NHN]" hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <template
                        v-slot:control="{
                          id,
                          floatingLabel,
                          value,
                          emitValue
                        }"
                      >
                        <!-- NEU: -->
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
                        <!-- ALT: -->
                        <!--
                          <money
                            :id="id"
                            class="q-field__native text-right"
                            :value="value"
                            @input="emitValue"
                            v-bind="moneyFormatForComponent"
                            v-show="floatingLabel"
                          ></money>
                          -->
                      </template>
                    </q-field>
                    <div class="text-caption" v-if="localStore.state.debugMode">
                      kennWert2:
                      {{
                        typeof profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert2
                      }}
                    </div>
                  </div>
                  <div class="col-md-2 col-12">
                    <!-- ACHTUNG - QBtn Styling: class="stretch" beeinflusst hier, warum auch immer, nicht die vertikale Höhe -->
                    <!-- WORKAROUND: style="min-height: 63%" -->
                    <q-btn
                      dense
                      :disable="!benutzerDarfBearbeitenSelectedNode"
                      class="stretch full-width"
                      style="min-height: 63%"
                      label="Boden"
                      icon-right="arrow_downward"
                      color="grey-4"
                      text-color="black"
                      @click="
                        changeNiveau('OKFFB', -0.01);
                        changeNiveau('OKRFB', -0.01);
                        changeNiveau('UKRFB', -0.01);
                        changeNiveau('UKFFB', -0.01);
                      "
                      glossy
                      no-caps
                    />
                  </div>
                  <!-- ---------------------------------------------------------------------------------- -->
                </div>
                <div class="row q-pa-xs">
                  <div class="col-md-12 col-12 text-caption">
                    <b>Hinweis:</b> Alle <span style='color: #000000; background-color: #C8E6C9'>hellgrünen</span> Felder sowie die Angaben zur
                    Grundwasserberührtheit sind automatisch berechnete
                    Ausgabefelder
                  </div>
                </div>
              </div>
              <!-- =========================================================================================== -->
              <!-- R2 C2 -->
              <div class="col-md-3 col-12">
                <div class="row q-pa-xs bg-blue-2">
                  <q-separator />
                  <!-- <b>Berechnete Maße der Geschossdecke</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[5].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C2 / Rubrik 2 -->
                <div class="row q-pa-xs">
                  <div class="col-md-8 col-12 text-right self-center">
                    <!-- -->
                    <b>
                      Maß
                    </b>
                  </div>
                  <div class="col-md-4 col-12 text-center self-center">
                    <b>
                      [m]
                    </b>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Aufbauhöhe: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Aufbauhöhe [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Dicke Rohboden: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Dicke Rohboden [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Dicke Bodenunterseite: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Dicke Bodenunterseite [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Gesamtdicke des Bodenaufbaus: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-8 col-12 text-caption text-right">
                    <b>
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      }}
                    </b>
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="
                        subtractNiveaus(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].kennWert1,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      "
                      label="Gesamtdicke [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[3]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Grundwasserberührt!: -->
                <div class="row q-pa-xs q-col-gutter-xs">
                  <div class="col-md-2 col-12 text-left text-caption items-start">
                    <b>
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                      }}
                    </b>
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-1 col-12">
                    <q-checkbox
                      readonly
                      dense
                      color="red"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Wahrheitswert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="computeGrundwasserberuehrtheit"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Wahrheitswert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-checkbox>
                  </div>
                  <div class="col-md-1 col-12 q-pa-xs text-center">
                    <q-icon name="waves" color="light-blue" size="sm" />
                  </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Eintauchtiefe: -->
                  <div class="col-md-4 col-12 text-caption text-right items-start">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <div class="col-md-4 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="light-blue-3"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      :value="computeEintauchtiefe"
                      label="Eintauchtiefe [m]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[5].baueigenschaftenInRubrik[5]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- MIT vue-autonumeric -->
                      <!--
                        <template
                          v-slot:control="{ id, floatingLabel, value, emitValue }"
                        >
                          <vue-autonumeric
                            id="inputToEmpty" DOM id, wird nicht benötigt
                            options="euro"  options Objekt -> Docs
                            v-model="value"  von oben übergeben
                            :placeholder="'Enter your value here'" Wird als Text angezeigt, leer lassen?
                           />
                           Alternativ statt v-model="value":
                           :value="value"
                            @input="emitValue"
                           Eventuell class="q-field__native text-right"
                        -->
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
              </div>
              <!-- =========================================================================================== -->
              <!-- R1 C3 / Rubrik 3  -->
              <div class="col-md-4 col-12">
                <div class="row q-pa-xs bg-cyan-2">
                  <q-separator />
                  <!-- <b>Brüstungsbezogene Maße im Geschoss</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[6].ueberschriftRubrik
                    }}
                  </b>
                </div>
                <!-- R1 C2 -->
                <div class="row q-pa-xs">
                  <div class="col-md-6 col-12 text-right self-center">
                    <!-- -->
                    <b>
                      Maß
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m]/[m über0,0]
                    </b>
                  </div>
                  <div class="col-md-3 col-12 text-center self-center">
                    <b>
                      [m über NHN]
                    </b>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Lichte Durchgangshöhe Türen: -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-6 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      dense
                      bg-color="teal-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1
                      "
                      label="Lichte Durchgangshöhe [m]"
                      hint="Handeingabe"
                      type="number"
                      step="0.01"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[0]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
                <!-- Unterkante Türstürze (UKTS - Niveau: Kennwertepaar!): -->
                <!-- ACHTUNG: Da beide Werte computed sind, über 2 q-inputs wie obige Felder, ohne VMoney realisiert! -->
                <div class="row q-pa-xs q-col-gutter-xs ">
                  <div class="col-md-6 col-12 text-caption text-right">
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsAnzeigeText
                    }}
                  </div>
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- 0.0-Wert UKTS: -->
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNullNiveauTuerstuerze"
                      label="UKTS [m ü. 0,0]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                  <!-- ------------------------------------------------------------------------------------- -->
                  <!-- NHN-Wert UKTS: -->
                  <div class="col-md-3 col-12">
                    <q-input
                      input-class="text-right"
                      readonly
                      dense
                      bg-color="green-2"
                      standout="bg-teal-4 text-black"
                      square
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      @focus="
                        setzeFelderFuerFachlicheHilfe(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBezeichnung,
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft
                            .baueigenschaftsBeschreibung
                        )
                      "
                      v-model="computeNHNNiveauTuerstuerze"
                      label="UKTS [m ü. NHN]"
                      hint="Berechnet"
                    >
                      <!-- --------------------------------------------------------------------------------- -->
                      <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                      <!-- ALT: content-class="my-tooltip"                                                   -->
                      <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                      <!-- --------------------------------------------------------------------------------- -->
                      <q-tooltip
                        v-if="
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.werteTyp ===
                            'Kennwertepaar'
                        "
                        :delay="1000"
                        :offset="[0, 28]"
                        max-width="500px"
                        content-class="bg-secondary text-white text-caption shadow-4"
                      >
                        {{
                          profilModelAusgewaehlterKnoten[
                            layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                        }}
                      </q-tooltip>
                      <!-- ACHTUNG: OHNE VMoney: -->
                      <!--
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
                        -->
                    </q-input>
                  </div>
                </div>
                <!-- -------------------------------------------------------------------------- -->
              </div>
            </div>
            <!-- ========================== Ende Rubrik 0 ================================== -->
          </div>
        </q-tab-panel>
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="musterhaftigkeitTabGeschossBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 4 "Musterhaftigkeit" (NEU, für #387)                                                   -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pt-xs q-gutter-xs full-width">
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Angaben zur Musterhaftigkeit des Geschosses
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Angaben zur Musterhaftigkeit des Geschosses
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
                    layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                  <!-- <b>Gültigkeit als Mustergeschoss</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                  <!-- Erläuterung zur Gültigkeit als Mustergeschoss</b> -->
                  <b>
                    {{
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                  <!-- <b>Gültigkeit als Mustergeschoss</b>                                  -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                  <!-- <b>Erläuterung zur Gültigkeit als Mustergeschoss</b>                                  -->
                  <q-input
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1].disable
                    "
                    autogrow
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :label="
                      layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
                          layoutBaueinheitGeschossBaueigenschaftsProfilFormular[1]
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
        <!--================================================================================================================================== -->
      </q-tab-panels>
      <!-- =================================== Ende QTabPanels =============================================  -->
      <!-- </q-card> -->
      <!----------------------------------------------------------------------------------------------------- -->
      <!-- Start gemeinsame Button Section für alle Tabs:                                                     -->
      <!-- Die @-Methoden haben Parameter tabGeschossBaueigenschaftsProfilFormular, der ihnen anzeigt,        -->
      <!-- für welches Tab sie gerufen werden                                                                 -->
      <!----------------------------------------------------------------------------------------------------- -->
      <q-separator />
      <div class="row q-pa-sm q-gutter-xs">
        <q-btn
          dense
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Angaben in allen Tabs für Geschoss speichern"
          @click="
            submitWerteAnBaueinheit(tabGeschossBaueigenschaftsProfilFormular)
          "
          color="positive"
          glossy
          no-caps
        />
        <q-btn
          dense
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Eingaben auf Originalwerte zurücksetzen"
          @click="
            resetWerteAnBaueinheit(tabGeschossBaueigenschaftsProfilFormular)
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
// Zur Steuerung bestimmter computed-Funktionen, die für VueAutoNumeric anders sind als für VMoney:
const VUE_AUTO_NUMERIC_MODUS = true; // Für VueAutoNumeric auf true, für VMoney auf false setzen!
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Konstante Indexes in den Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular, der das Layout für dieses Formular (Tabs/Rubriken/Baueigenschaften) steuert
// Diese konstanten Indexes entsprechen 1:1 den Tabs im Baueigenschaftsprofilformular für das Geschoss
// Siehe layout-baueinheit-geschoss-baueigenschafts-profil-formular.js
const INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT = 0;
const INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT = 1;
const INDEX_FUER_BAUORDNUNGSRECHTLICHE_ANGABEN_TAB_LAYOUT_STANDORT = 2;
const INDEX_FUER_KLIMABEZOGENE_ANGABEN_TAB_LAYOUT_STANDORT = 3;
const INDEX_FUER_HYDROGEOLOGISCHE_ANGABEN_TAB_LAYOUT_STANDORT = 4;
// const INDEX_FUER_VERWENDUNGSVERBOTE_GEBOTE_TAB_LAYOUT_STANDORT = 5; // Dropped, Inhalt in "Bauordnungsrechtliche Angaben"
const INDEX_FUER_GRUNDSTUECKSGEOMETRIE_ANGABEN_TAB_LAYOUT_STANDORT = 5;
const INDEX_FUER_ANFORDERUNGEN_AUS_STANDORT_TAB_LAYOUT_STANDORT = 5;
// DONE: Diese Konstanten im Code unten verwendet - stattdessen wurde ursprünglich vorher dynamisch die Variable indexTabLayoutGeschoss verwendet. Diese
//       wurde (und wird noch) bei Tab-Wechsel gesetzt in initialisiereAusgewaehltesTabGeschoss().
//       Würde sich die Zuordnung der Tabs zu den Objekten im Array ändern, müsste aber dieser Code auch geändert werden, daher hat man eigentlich keinen Vorteil davon,
//       dass dieser Index eine Variable ist. Stattdessen sollten also in den disable- und reset-Methoden für einzelne Tabs (z.B. "Geopolitische Angaben") diese
//       Konstanten verwendet werden statt indexTabLayoutGeschoss, was anfällig für Fehler ist, wenn es falsch gesetzt ist - dann wird ggf. das falsche Tab disabled odder resetted!!!
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
import LayoutBaueinheitGeschossBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-geschoss-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// import Vue from "vue/dist/vue.js"; // NEU: Für Geocoder
// import Geocoder from "@pderas/vue2-geocoder"; // NEU: Für Geocoding (Bestimmung von geografischen Koordinaten aus Adresse über Google Maps API)
// import * as VueGoogleMaps from "vue2-google-maps";
// NEU: Für Package vue2-google-maps,https://github.com/xkjyeah/vue-google-maps/blob/vue2/README.md - zurückgestellt
// import GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten from "../modules/gemeinden-deutschland-mit-namen-ihrer-verwaltungs-einheiten.json"; // HINWEIS: JSON kann an JS Variable zugewiesen werden,
// siehe https://stackoverflow.com/questions/39513427/how-do-i-convert-json-array-to-javascript-array
// Quelle dieser Daten: https://www.npmjs.com/package/gemeindeverzeichnis - die Datei gemeinden.ndjson nach json konvertiert ("}}"</strong> am Zeilenende ersetzt durch "}}," und
// Array-Klammern darum eingefügt, dann dort bestimmte Unternummern per Programm ergänzt im Unterobjekt "namen" mit den passenden Texte aus den anderen Dateien dort, für Verwendung als Options in QSelect
// für Gemeindeschlüssel
//--------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Dezimalzahlen mit VMoney, https://www.npmjs.com/package/v-money -->
// VMoney erfordert Installation per: npm i --save v-money
// NEU: Deinstalliert mit npm uninstall v-money
// import Vue from "vue";
// import money from "v-money"; // NEU: Disabled wegen Problemen, zugunsten von VueAutonumeric
// Vue.use(money, { precision: 4 }); // NEU: Disabled wegen Problemen, zugunsten von VueAutonumeric
//----------------------------------------------------------------------------------------------------------------------------------------------------------
import { decimalHandling } from "../modules/decimal-handling"; // NEU: Zentrale Helper-Funktionen zur Konvertierung von Dezimalzahlen von String nach Number
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Dezimalzahlen mit VueAutoNumeric (statt VMoney), https://www.npmjs.com/package/vue-autonumeric
import VueAutonumeric from "vue-autonumeric"; // Erfordert unten Eintrag in components: { ..., VueAutoNumeric }
//================================================================================================================================================
export default {
  // name: 'ComponentName',
  components: {
    VueAutonumeric // NEU - für Tests mit VueAutoNumeric
  },
  props: [
    "profilBezeichnung", // Bezeichnung des anzuzeigenden Baueigenschaftsprofils, sollte für dieses Formular "Baueinheit > Geschoss" sein
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
      //--------------------------------------------------------------------------------------------------------------------
      // Für Dezimalzahlen mit QField und VueAutoNumeric:
      // VueAutoNumeric Options - generiert mit http://autonumeric.org/configurator
      autoNumericOptionsWithMinMax: {
        decimalCharacter: ",",
        decimalPlaces: 2,
        digitGroupSeparator: ".",
        maximumValue: "999.99",
        minimumValue: "-999.99",
        emptyInputBehavior: "null" // VueAutoNumeric Docs dafür: When the element is empty, the rawValue and the element value/text is set to null.
        // This also allows to set the value to null using anElement.set(null)
      },
      autoNumericOptions: {
        decimalCharacter: ",",
        decimalPlaces: 2,
        digitGroupSeparator: ".",
        emptyInputBehavior: "null" // VueAutoNumeric Docs dafür: When the element is empty, the rawValue and the element value/text is set to null.
        // This also allows to set the value to null using anElement.set(null)
      },
      //---------------------------------------------------------------------------------------------------------------------
      // Für Dezimalzahlen mit QField und VMoney:
      decimalHandling: decimalHandling, // NEU: Modul mit zentralen Helper-Funktionen für Dezimalzahlen
      //------------------------------------------------------------------------------------------------
      nullNiveau: 0.45, // v-model für Tests von q-field mit VMoney
      nhnNiveau: 250.0, // v-model für Tests von q-field mit VMoney
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

      // INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT,
      // INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT,
      //-------------------------------------------------------------------
      // NEU: Für Auswahl Gemeinde mit Gemeindeschlüssel per QSelect:
      // selectModelGemeinden: null, // ALT: Variable zum ersten Testen des QSelects für Gemeinden, ersetzt durch entsprechende Baueigenschaften
      // selectOptionsGemeinden: null, // ACHTUNG: Muss in mounted mit JSON-Array GemeindenCondensed initialisiert werden!
      // selectFilterOptionsGemeinden: null,
      //-------------------------------------------------------------------
      displayLeftArrow: "\u2190", // Konstante für Linkspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      tabGeschossBaueigenschaftsProfilFormular:
        "geometrieTabGeschossBaueigenschaftsProfilFormular", // TODO - vorläufig
      indexFuerTabLayoutGeschoss: 0, // TODO - vorläufiger Index im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular, der auf die Daten für ein Tab zeigt
      localStore: globalStore,
      mountedDone: false,
      layoutBaueinheitGeschossBaueigenschaftsProfilFormular: LayoutBaueinheitGeschossBaueigenschaftsProfilFormular, // Array für die Speicherung von Layout-Information für
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
      // Beispiel für Aufbau: {"Baueinheit > Schicht > Dicke": 17, ... }
      // this.indexMapFuerProfilModelAusgewaehlterKnoten["Baueinheit > Schicht > Dicke"] liefert dann den Index
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
    };
  },
  //***=====================================================================================================================================
  methods: {
    //------------------------------------------------------------------------------------------------------------------------------------------
    // Methoden für Dezimalwerte mit VMoney:
    subtractNiveaus(minuendNiveau, subtrahendNiveau, resultObject) {
      // Macht Subtraktion von 2 Dezimalzahlen, returned Ergebnis als Dezimalstring (im V-Money Format #.###,##)
      // NEU: Wenn 3. Parameter definiert ist: Konvertiert das Ergebnis der Subtraktion nach Number und schreibt es per Vue $set
      // reaktiv in das resultObject (Objekt im Array profilModelAusgewaehlterKnoten), in dessen Feld "kennWert1")
      console.log("In subtractNiveaus()");
      if (!VUE_AUTO_NUMERIC_MODUS) {
        let minuendNumber = this.decimalHandling.convertDecimalStringToNumber(
          minuendNiveau
        );
        let subtrahendNumber = this.decimalHandling.convertDecimalStringToNumber(
          subtrahendNiveau
        );
        let differenzNumber = minuendNumber - subtrahendNumber;
        differenzNumber = Math.round(differenzNumber * 100) / 100; // Gegen Rundungsfehler! Unbedingt notwendig - ohne diese Korrektur ist Ergebnis im Log z.B. 0.9000000001
        // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
        let resultString = this.decimalHandling.convertNumberToDecimalString(
          differenzNumber,
          2,
          ",",
          "."
        );
        console.log("resultString: ", resultString);
        // NEU: Ergebnis als Number nach resultObject schreiben, wenn 3. Parameter spezifiziert:
        if (resultObject !== undefined) {
          this.$set(resultObject, "kennWert1", differenzNumber);
          console.log(
            "differenzNumber aus subtractNiveaus(): ",
            differenzNumber
          );
        }
        return resultString;
      } else {
        // VUE_AUTO_NUMERIC_MODUS: Alle Niveau-Werte sind entweder vom Typ Object (bei null) oder vom Typ Number!
        // Hier zunächst null-Werte so behandeln, dass dann null returned wird - es macht keinen großen Sinn, Differenzen aus null-Werten anzuzeigen
        if (minuendNiveau == null || subtrahendNiveau == null) return null;
        let differenzNumber = minuendNiveau - subtrahendNiveau;
        differenzNumber = Math.round(differenzNumber * 100) / 100; // Gegen Rundungsfehler! Unbedingt notwendig - ohne diese Korrektur ist Ergebnis im Log z.B. 0.9000000001
        // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
        let resultString = this.decimalHandling.convertNumberToDecimalString(
          differenzNumber,
          2,
          ",",
          "."
        );
        console.log("resultString: ", resultString);
        // NEU: Ergebnis als Number nach resultObject schreiben, wenn 3. Parameter spezifiziert:
        if (resultObject !== undefined) {
          this.$set(resultObject, "kennWert1", differenzNumber);
          console.log(
            "differenzNumber aus subtractNiveaus(): ",
            differenzNumber
          );
        }
        return resultString;
      }
    },

    // Niveauänderung:
    changeNiveau(niveauString, incrementOrDecrementNumber) {
      // niveaString: "OKFD", "OKRD", "UKRD", "UKFD" (Deckenniveaus) oder "OKFFB", "OKRFB", "UKRFB", "UKFFB" (Bodenniveaus)
      // incrementOrDecrementNumber: JS Number - z.B. 0.01 oder -0.01 (numerisch!)
      console.log("In changeNiveau()");
      let nullNiveau;
      switch (niveauString) {
        case "OKFD":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "OKRD":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "UKRD":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "UKFD":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
              .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        //----------------------------------------------------------------------
        case "OKFFB":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "OKRFB":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
              .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "UKRFB":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
              .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        case "UKFFB":
          nullNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
              .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1;
          break;
        default:
          console.log(
            "XXXXXX - ACHTUNG: Fehler in changeNiveau() - ungültiger niveauString: ",
            niveauString
          );
          return;
      }
      console.log("nullNiveau: ", nullNiveau);
      // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
      // console.log("nullNiveau: ", this.nullNiveau)
      // let number = Number(this.nullNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      //-----------------------------------------------------------------------------------------------
      // ALT (VMoney) - Umwandlung von Number nach Decimal nötig:
      // let number = this.decimalHandling.convertDecimalStringToNumber(
      //  nullNiveau
      // ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
      //-------------------------------------------------------------------------------------------------------
      // NEU (VueAutoNumeric) - Alles Numbers oder null, null wird aber wohl hier bei Arithmetik wie 0 behandelt:
      // TODO XXXXXX - Null Handling in dieser Funktion ist zu überprüfen!!!
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      //========================================================================================================
      let number = nullNiveau;
      console.log("typeof(number): ", typeof number);
      number = number + incrementOrDecrementNumber; // Z.B. 0.01 oder -0.01 (Number)
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      //---------------------------------------------------------------------------------------------------------
      // ALT (VMoney) - Rückumwandlung von Number nach Decimal nötig:
      // ACHTUNG: Es musste eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      // nullNiveau = this.decimalHandling.convertNumberToDecimalString(
      //  number,
      //  2,
      //  ",",
      //  "."
      //); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
      //---------------------------------------------------------------------------------------------------------
      nullNiveau = number; // NEU
      // Hier Fehler - diese Zuweisungen müssen nicht direkt, sondern reaktiv mit Vue $set erfolgen!!!
      switch (niveauString) {
        case "OKFD":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "OKRD":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "UKRD":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "UKFD":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        //----------------------------------------------------------------------------------------------
        case "OKFFB":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "OKRFB":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "UKRFB":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        case "UKFFB":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1",
            nullNiveau
          );
          break;
        default:
          console.log(
            "XXXXXX - ACHTUNG: Fehler in changeNiveau() - ungültiger niveauString: ",
            niveauString
          );
          break;
      }
      console.log("nullNiveau aus changeNiveau(): ", nullNiveau); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
    },

    initialisiereAusgewaehltesTabGeschoss() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Unter-Tabs im Baueigenschaftsprofilformular für das Geschoss
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log("In initialisiereAusgewaehltesTabGeschoss()");
      switch (this.tabGeschossBaueigenschaftsProfilFormular) {
        case "geometrieTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 0;
          break;
        /*
        case "geopolitischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 1;
          break;
        case "bauordnungsrechtlicheAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 2;
          break;
        case "umweltbezogeneAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 3;
          break;
        case "hydrogeologischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 4;
          break;
        case "grundstuecksGeometrieAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 5; // NEU
          break;
        case "anforderungenAusGeschossTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGeschoss = 6; // NEU
          break;
        */
        default:
          break;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Da Index geändert wurde, muss auch das Enabling/Disabling hier neu berechnet werden, sonst werden bei Tab-Wechsel
      //          die falschen Felder enalbed/disabled (z.B. die eines anderen Knotens im Baum, für den vorher das Enabling/Disabling berechnet wurde,
      //          und dann der Knoten und anschließend das Tab neu ausgewählt werden.
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für Geschoss entfernt!
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
      // ACHTUNG: Methode ist aus dem Profilformular "Baueinheit > Standort" - wird hier nicht verwendet, nur als Vorlage im Code belassen!
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte (in diesem Formular für "Baueinheit > Geschoss" sind das zahlreiche, kaskadierend arbeitende Aufzählungswerte):
      // a) In Abhängigkeit von der bisher ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
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
        "Parameter eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten
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
      // Aufruf in Abhängigkeit von tabGeschossBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "Vor spezifischem Reset/Enabling/Disabling für das ausgewählte Tab: ",
        this.tabGeschossBaueigenschaftsProfilFormular
      );
      console.log(
        "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
        eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
      );
      console.log(
        "ACHTUNG: Bisher nur implementiert für Tab 'Geopolitische Angaben' - sonst NoOp"
      );
      switch (this.tabGeschossBaueigenschaftsProfilFormular) {
        case "lageAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "geopolitischeAngabenTabStandortBaueigenschaftsProfilFormular":
          switch (
            //=======================================================================================================================================
            // ACHTUNG: Der folgende Code enthält hard coded bestimmte Baueigenschaftsbezeichnungen
            //          Wenn diese geändert werden, müuss der Code hier auch geändert werden!!!
            //=======================================================================================================================================
            eigenschaftInLayoutBaueinheitGeschossBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
          ) {
            case "Baueinheit > Standort > Geopolitik > Welt > Kontinent": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossKontinentWelt(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossKontinentWelt(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Europäische Union": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaeischeUnion(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaeischeUnion(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Europa (nicht EU)": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaNichtEU(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandEuropaNichtEU(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Nordamerika": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandNordamerika(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandNordamerika(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Land > Australien und Ozeanien": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandAustralienUndOzeanien(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossLandAustralienUndOzeanien(
                newSelectModelValue
              );
              break;
            }
            case "Baueinheit > Standort > Geopolitik > Bundesland > Deutschland": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossBundeslandDeutschland(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
              //      Diese Flags layoutBaueinheitGeschossBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
              //      des betreffenden Felds im Template
              // HINWEIS: newSelectModelValue ist (siehe oben) im Gegensatz zu oldSelectModelValue KEIN Array!
              this.disableFelderInAbhaengigkeitVonAufzaehlungswertGeschossBundeslandDeutschland(
                newSelectModelValue
              );
              break;
            }
            // Für andere Aufzählungswerte in diesem Profil für Geschoss: TODO
            default:
              break;
          }
          break;
        case "bauordnungsrechtlicheAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "umweltbezogeneAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "hydrogeologischeAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        /*
        case "verwendungsverboteTabStandortBaueigenschaftsProfilFormular":
          //
          break; // NEU: Dropped
        */
        case "grundstuecksGeometrieAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "anforderungenAusGeschossTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        default:
          break;
      }
    },

    submitWerteAnBaueinheit(
      //==============================================================================================
      // TODO XXXXXX: Der Code für die Konvertierung von kennWert1 bei Kennwertepaaren ist vorläufig!!
      // Es sollten nur die betroffenen Niveauwerte konvertiert werden, nicht alle Kennwertepaare!
      //==============================================================================================
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
      // Vorlage-Code für Extrakt genau der Eigenschaften (aus der größeren Gesamtmenge in profilModelAusgewaehlterKnoten), die durch die im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
      // enthaltenen Rubriken FUER DAS AKTUELL AUSGEWÄHLTE TAB bestimmt sind (diese Untermenge von Eigenschaften wird als Input-Felder in dem betreffenden Tab angezeigt).
      // indexFuerTabLayoutGeschoss zeigt dabei immmer auf das Element (= Objekt mit enthaltenem Array der Eigenschaften im jeweiligen Tab im Unterobjekt rubrikenInTab) des Arrays
      // layoutBaueinheitGeschossBaueigenschaftsProfilFormular mit den Eigenschaften für das jeweilige Unter-Tab des Profilformulars für "Baueinheit > Geschoss".
      // Der Code hier wandert dann durch die Rubriken in diesem Element des Arrays, macht aktuell aber nur ein console.log der betreffenden Eigenschaften
      // Code disabled, da aktuell nicht gebraucht:
      /*
      for (let rubrik of this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[
        this.indexFuerTabLayoutGeschoss
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
      console.log("Vor Konvertierungen");
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
        // NEU: Konvertierung von Dezimalzahlen nach Number (sonst Mongoose Cast Errors am Backend)
        //====================================================================================================================
        // ALT:     Dieser Code für die Konvertierung von kennWert1 bei Kennwertepaaren war für die
        //          Verwendung von VMoney zur Anzeige von Niveaus (jeweils für kennWert1, 0.0-Niveau),
        //          da VMoney deren v-model stets von Object (bei null-Werten) oder Number nach String
        //          umwandelte und keine Rückumwandlung machte!
        // ACHTUNG: Es sollten dabei nur die betroffenen Niveauwerte konvertiert werden, nicht alle Kennwertepaare!
        //          Die Logik unten war vorläufig eingeschränkt auf solche, die "Niveau >" in der Bezeichnung enthalten:
        // ACHTUNG: Damit wurde auch der kennWert1 der Baueigenschaft für UKTS mit konvertiert, außer den
        //          4 Decken- und 4 Bodenniveaus!
        // NEU:     Nach Ersetzung von VMoney durch VueAutoNumeric ist diese Rückkonvertierung unnötig,
        //          da VueAutoNumeric die v-models als Object (bei null-Werten) bzw. Number belässt und
        //          die Wandlung in Dezimalstrings intern erledigt!!!
        // ACHTUNG: Allerdings ist für die Initialisierung von Istwertfeldern aus Sollwerten (z.B. bei
        //          Istwerten für Raumniveaus aus Sollwerten von Geschossniveaus) in mounted() eine
        //          Initialisierung solcher Istwert-Felder aus den (aus dem Elternknoten geerbten) Sollwerten erforderlich!
        // ACHTUNG: Diese Initialisierung sollte in Produktion nur erfolgen, wenn das Feld für den Istwert null ist -
        //          ist es ungleich null, wurde es vom Benutzer vorher bereits absichtlich einmal verändert und abgespeichert!
        //          Dieser Wert muss dann erhalten bleiben!
        //          Siehe Testbeispiel in verwaltung.vue.
        //====================================================================================================================
        /*
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Kennwertepaar" &&
          eigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBezeichnung.includes(
            "Niveau >"
          )
        ) {
          console.log(
            "Vor String to Number Conversion für Niveau - kennWert1: ",
            eigenschaft.kennWert1
          );
          eigenschaft.kennWert1 = this.decimalHandling.convertDecimalStringToNumber(
            eigenschaft.kennWert1
          );
        }
        */
        //-------------------------------------------------------------------------------------------------------------------------------------------------------
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
      tab // Parameter: aktuelles Tab in Formular für Geschoss - wird noch nicht verwendet!
    ) {
      // ALT: Hieß handleReset()
      // Resetted die eventuell im Form geänderten Werte im Profil auf die ursprünglichen Werte aus dem selektierten Node (Prop)
      // NEU: Auch hier Disabling/Enabling notwendig, weil die steuernden Werte dafür im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
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
        //========================================================================================================================================
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        //----------------------------------------------------------------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular) {
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
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für Geschoss entfernt!
      //-----------------------------------------------------------------------------------------------------------------------------------------------
    }
  },

  //***====================================================================================================================================== */
  computed: {
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktionen zur Berechnung des Grundwasserstands
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    computeGrundwasserberuehrtheit: function() {
      // Returned true, wenn NHN-Wert von UKFFB < Bemessungswasserstand
      // Bemessungswasserstand ist Baueigenschaft aus Profil "Baueinheit > Standort":
      // baueigenschaftsBezeichnung: "Baueinheit > Standort > Hydrogeologie > Wasser > Bemessungswasserstand"
      // Diese ist eine gemeinsame Baueigenschaft auch im Profil "Baueinheit > Geschoss" - hier zugreifbar per:
      // this.profilModelAusgewaehlterKnoten[
      //   this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
      //   .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      // ].kennWert1; // Normaler Kennwert, kein Niveau, also Typ Number
      // Der NHN-Wert von UKFFB wird in computeNHNNiveauUKFFB gesetzt per Vue $set
      // ACHTUNG: Hier wird dieser so gesetzte Wert genutzt - er hat den Typ Number und steht in:
      // this.profilModelAusgewaehlterKnoten[
      //    this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
      //    .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      // ].kennWert2
      // Zusätzlich wird per Vue $set der Wahrheitswert der entsprechenden Baueigenschaft für die Grundwasserberührtheit
      // in profilModelAusgewaehlterKnoten mit dem Ergebnis der Berechnung aktualisiert
      // ACHTUNG: Wenn einer der beiden obigen Werte null ist, wird nur false returned, keine Aktualisierung
      console.log("In computeGrundwasserberuehrtheit");
      let bemessungsWasserstand = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      console.log("bemessungsWasserstand: ", bemessungsWasserstand);
      if (bemessungsWasserstand == null) return false; // Sicherheitshalber
      let ukffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert2;
      console.log("ukffb: ", ukffb);
      if (ukffb == null) return false; // Sicherheitshalber
      let differenzNumber = bemessungsWasserstand - ukffb;
      // Beide Werte sind hier nicht null und müssen für diese Berechnung vom Typ Number sein!
      differenzNumber = Math.round(differenzNumber * 100) / 100; // Gegen Rundungsfehler!
      let result = differenzNumber > 0; // Boolean, Geschoss ist grundwasserberührt
      console.log(
        "result aus computeGrundwasserberuehrtheit, vor Vue $set der entsprechenden Baueigenschaft: ",
        result
      );
      // ACHTUNG: Experimenteller Update des WahrheitsWerts der Baueigenschaft für die Grundwasserberührtheit per Vue $set:
      // Baueigenschaft: "Baueinheit > Geschoss > Geometrie > Angrenzungssituation > Grundwasser > Grundwasserberührt!",
      // Siehe Layout File
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[5]
            .baueigenschaftenInRubrik[4].indexInProfilModelAusgewaehlterKnoten
        ],
        "wahrheitsWert",
        result
      );
      console.log(
        "baueigenschaftsBezeichnung der per Vue $set aktualisierten Baueigenschaft: ",
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[5]
            .baueigenschaftenInRubrik[4].indexInProfilModelAusgewaehlterKnoten
        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
      );
      return result;
    },

    computeEintauchtiefe: function() {
      // Berechnet die Eintauchtiefe in das Grundwasser als Differenz des Bemessungswassertands und des NHN-Werts von UKFFB
      // Beide Werte sind numerisch (Typ Number).
      // Returned das Ergebnis zur Anzeige als Dezimalstring
      // Bemessungswasserstand ist Baueigenschaft aus Profil "Baueinheit > Standort":
      // baueigenschaftsBezeichnung: "Baueinheit > Standort > Hydrogeologie > Wasser > Bemessungswasserstand"
      // Diese ist eine gemeinsame Baueigenschaft auch im Profil "Baueinheit > Geschoss" - hier zugreifbar per:
      // this.profilModelAusgewaehlterKnoten[
      //   this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
      //   .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      // ].kennWert1; // Normaler Kennwert, kein Niveau, also Typ Number
      // Der NHN-Wert von UKFFB wird in computeNHNNiveauUKFFB gesetzt per Vue $set
      // ACHTUNG: Hier wird dieser so gesetzte Wert genutzt - er hat den Typ Number und steht in:
      // this.profilModelAusgewaehlterKnoten[
      //    this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
      //    .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      // ].kennWert2
      // Zusätzlich wird per Vue $set der Kennwert der entsprechenden Baueigenschaft für die Eintauchtiefe
      // in profilModelAusgewaehlterKnoten mit dem Ergebnis der Berechnung aktualisiert
      // ACHTUNG: Wenn einer der beiden obigen Werte null ist, wird nur null returned, keine Aktualisierung
      console.log("In computeEintauchtiefe");
      let bemessungsWasserstand = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      console.log("bemessungsWasserstand: ", bemessungsWasserstand);
      if (bemessungsWasserstand == null) return null; // Sicherheitshalber
      // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
      //       Daher mit VMoney einfach Number 0 als Workaround returned
      // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
      let ukffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert2;
      console.log("ukffb: ", ukffb);
      if (ukffb == null) return null; // Sicherheitshalber
      // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
      //       Daher mit VMoney einfach Number 0 als Workaround returned
      // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
      let eintauchtiefeNumber = bemessungsWasserstand - ukffb; // Beide Werte sind hier nicht null und müssen für diesen Vergleich vom Typ Number sein!
      eintauchtiefeNumber = Math.round(eintauchtiefeNumber * 100) / 100; // Gegen Rundungsfehler!
      console.log(
        "eintauchtiefeNumber vor Vue $set der entsprechenden Baueigenschaft: ",
        eintauchtiefeNumber
      );
      // ACHTUNG: Experimenteller Update des WahrheitsWerts der Baueigenschaft für die Grundwasserberührtheit per Vue $set:
      // Baueigenschaft: "Baueinheit > Geschoss > Geometrie > Angrenzungssituation > Grundwasser > Eintauchtiefe",
      // Siehe Layout File
      if (eintauchtiefeNumber > 0) {
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[5]
              .baueigenschaftenInRubrik[5].indexInProfilModelAusgewaehlterKnoten
          ],
          "kennWert1",
          eintauchtiefeNumber
        );
        console.log(
          "baueigenschaftsBezeichnung der per Vue $set aktualisierten Baueigenschaft: ",
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[5]
              .baueigenschaftenInRubrik[5].indexInProfilModelAusgewaehlterKnoten
          ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung
        );
        let result = this.decimalHandling.convertNumberToDecimalString(
          eintauchtiefeNumber
        );
        console.log("Resultat von computeEintauchtiefe: ", result);
        return result;
      } else {
        // Nicht im Grundwasser
        console.log(
          "Eintauchtiefe ist <= 0, returning null aus computeEintauchtiefe"
        );
        // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
        //       Daher mit VMoney einfach Number 0 als Workaround returned
        return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
      }
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktionen für Validierung von Niveauwerten
    // HINWEIS: Oben im Template die Prop lazy-rules angeben, sonst wird die Validierung sofort bei Eingabe ausgelöst, was
    //          lästige Effekte hat, z.B. wenn man 0, tippt, wird, obwohl man noch die Chance hätte einen korrekten
    //          Werte einzugeben, schon eine Fehlermeldung ausgelöst, die bei weiterer Eingabe wieder verschwindet!
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    validateOKFD: function() {
      // Prüft OKFD, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateOKFD");
      let okfd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      //--------------------------------------------------------------------
      // ALT (VMoney):
      /*
      console.log(
        "okfd: ", okfd
      );
      console.log(
        "typeof okfd: ",
        typeof okfd
      );
      */
      // Nur mit VMoney:
      // Sicherheitshalber, da am Anfang das v-model "number" sein kann:
      /*
      if (typeof okfd !== "string") {
        return [v => true || ""];
      }
      */
      //---------------------------------------------------------------------
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (okfd == null || okrd == null) return [v => true || ""]; // Bei null-Werten keine Validierung
      return [
        v =>
          this.$refs.refOKFD.value >= this.$refs.refOKRD.value ||
          "OKFD muss ≥ OKRD sein"
      ];
      //--------------------------------------------------------------------
      // ALT (VMoney):
      // console.log("okfd.length: ", okfd.length)
      // console.log("okfd.charAt(9): ", okfd.charAt(0))
      // ALT - Min-/Max-Prüfung - wird jetzt durch VueAutoNumeric erledigt!
      /*
      return [
        v =>
          (v.length > 0 && v.charAt(0) === "-" && v.length < 8) ||
          (v.length > 0 && v.charAt(0) !== "-" && v.length < 7) ||
          "Wert zwischen -999.99 und 999.99 eingeben"
      ];
      */
    },

    validateOKRD: function() {
      // Prüft OKRD, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateOKRD");
      let okfd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (okrd == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (okfd == null) {
        // OKFD ist null, prüfe dann "nach unten"
        if (ukrd == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // UKRD und OKRD sind beide nicht null:
            v =>
              this.$refs.refOKRD.value >= this.$refs.refUKRD.value ||
              "OKRD muss ≥ UKRD sein"
          ];
        }
      } else {
        // OKFD und OKRD sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (ukrd == null) {
          // UKRD null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refOKFD.value >= this.$refs.refOKRD.value ||
              "OKRD muss ≤ OKFD sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refOKFD.value >= this.$refs.refOKRD.value ||
              "OKRD muss ≤ OKFD sein",
            v =>
              this.$refs.refOKRD.value >= this.$refs.refUKRD.value ||
              "OKRD muss ≥ UKRD sein"
          ];
        }
      }
    },

    validateUKRD: function() {
      // Prüft UKRD, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateUKRD");
      let okrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukfd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (ukrd == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (okrd == null) {
        // OKRD ist null, prüfe dann "nach unten"
        if (ukfd == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // UKFD und UKRD sind beide nicht null:
            v =>
              this.$refs.refUKRD.value >= this.$refs.refUKFD.value ||
              "UKRD muss ≥ UKFD sein"
          ];
        }
      } else {
        // OKRD und UKRD sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (ukfd == null) {
          // UKFD null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refOKRD.value >= this.$refs.refUKRD.value ||
              "UKRD muss ≤ OKRD sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refOKRD.value >= this.$refs.refUKRD.value ||
              "UKRD muss ≤ OKRD sein",
            v =>
              this.$refs.refUKRD.value >= this.$refs.refUKFD.value ||
              "UKRD muss ≥ UKFD sein"
          ];
        }
      }
    },

    validateUKFD: function() {
      // Prüft UKFD, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateUKFD");
      let ukrd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukfd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (ukfd == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (ukrd == null) {
        // UKRD ist null, prüfe dann "nach unten"
        if (okffb == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // OKFFB und UKFD sind beide nicht null:
            v =>
              this.$refs.refUKFD.value >= this.$refs.refOKFFB.value ||
              "UKFD muss ≥ OKFFB sein"
          ];
        }
      } else {
        // UKRD und UKFD sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (okffb == null) {
          // OKFFB null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refUKRD.value >= this.$refs.refUKFD.value ||
              "UKFD muss ≤ UKRD sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refUKRD.value >= this.$refs.refUKFD.value ||
              "UKFD muss ≤ UKRD sein",
            v =>
              this.$refs.refUKFD.value >= this.$refs.refOKFFB.value ||
              "UKFD muss ≥ OKFFB sein"
          ];
        }
      }
    },

    //----------------------------------------------------------------------------
    validateOKFFB: function() {
      // Prüft OKFFB, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateOKFFB");
      let ukfd = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (okffb == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (ukfd == null) {
        // UKFD ist null, prüfe dann "nach unten"
        if (okrfb == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // OKRFB und OKFFB sind beide nicht null:
            v =>
              this.$refs.refOKFFB.value >= this.$refs.refOKRFB.value ||
              "OKFFB muss ≥ OKRFB sein"
          ];
        }
      } else {
        // UKFD und OKFFB sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (okrfb == null) {
          // OKRFB null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refUKFD.value >= this.$refs.refOKFFB.value ||
              "OKFFB muss ≤ UKFD sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refUKFD.value >= this.$refs.refOKFFB.value ||
              "OKFFB muss ≤ UKFD sein",
            v =>
              this.$refs.refOKFFB.value >= this.$refs.refOKRFB.value ||
              "OKFFB muss ≥ OKRFB sein"
          ];
        }
      }
      //--------------------------------------------------------------------
      // ALT (VMoney):
      // console.log("okffb.length: ", okffb.length)
      // console.log("okffb.charAt(9): ", okffb.charAt(0))
      // ALT - Min-/Max-Prüfung - wird jetzt durch VueAutoNumeric erledigt!
      /*
      return [
        v =>
          (v.length > 0 && v.charAt(0) === "-" && v.length < 8) ||
          (v.length > 0 && v.charAt(0) !== "-" && v.length < 7) ||
          "Wert zwischen -999.99 und 999.99 eingeben"
      ];
      */
    },

    validateOKRFB: function() {
      // Prüft OKRFB, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateOKRFB");
      let okffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let okrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (okrfb == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (okffb == null) {
        // OKFFB ist null, prüfe dann "nach unten"
        if (ukrfb == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // UKRFB und OKRFB sind beide nicht null:
            v =>
              this.$refs.refOKRFB.value >= this.$refs.refUKRFB.value ||
              "OKRFB muss ≥ UKRFB sein"
          ];
        }
      } else {
        // OKFFB und OKRFB sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (ukrfb == null) {
          // UKRFB null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refOKFFB.value >= this.$refs.refOKRFB.value ||
              "OKRFB muss ≤ OKFFB sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refOKFFB.value >= this.$refs.refOKRFB.value ||
              "OKRFB muss ≤ OKFFB sein",
            v =>
              this.$refs.refOKRFB.value >= this.$refs.refUKRFB.value ||
              "OKRFB muss ≥ UKRFB sein"
          ];
        }
      }
    },

    validateUKRFB: function() {
      // Prüft UKRFB, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateUKRFB");
      let okrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      let ukffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (ukrfb == null) return [v => true || ""]; // Wenn Feld selbst null ist, ist alles okay
      if (okrfb == null) {
        // OKRFB ist null, prüfe dann "nach unten"
        if (ukffb == null) return [v => true || ""];
        // Bei null keine Validierung
        else {
          return [
            // UKFFB und UKRFB sind beide nicht null:
            v =>
              this.$refs.refUKRFB.value >= this.$refs.refUKFFB.value ||
              "UKRFB muss ≥ UKFFB sein"
          ];
        }
      } else {
        // OKRFB und UKRFB sind beide nicht null, prüfe "nach oben" und "nach unten"
        if (ukffb == null) {
          // UKFFB null, prüfe nur nach oben
          return [
            v =>
              this.$refs.refOKRFB.value >= this.$refs.refUKRFB.value ||
              "UKRFB muss ≤ OKRFB sein"
          ];
        } else {
          // Alle 3 nicht null, prüfe nach oben und unten
          return [
            v =>
              this.$refs.refOKRFB.value >= this.$refs.refUKRFB.value ||
              "UKRFB muss ≤ OKRFB sein",
            v =>
              this.$refs.refUKRFB.value >= this.$refs.refUKFFB.value ||
              "UKRFB muss ≥ UKFFB sein"
          ];
        }
      }
    },

    validateUKFFB: function() {
      // Prüft UKFFB, Vergleich mit Nachbarniveause
      // ACHTUNG: Muss stets array returnen, Format siehe unten!
      // Siehe https://quasar.dev/vue-components/field#Internal-validation
      console.log("In validateUKFFB");
      let ukffb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // ACHTUNG: Prüfung "nach oben"!
      let ukrfb = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
          .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
      ].kennWert1;
      // Mit VueAutoNumeric ist das v-model immer Object (bei null) oder Number!
      if (ukffb == null || ukrfb == null) return [v => true || ""]; // Bei null-Werten keine Validierung
      return [
        v =>
          this.$refs.refUKRFB.value >= this.$refs.refUKFFB.value ||
          "UKFFB muss ≤ UKRFB sein"
      ];
    },

    computeEingangsTuerNiveau: function() {
      // Computed-Hilsfunktion für die 4 nachfolgenden Computed-Funktionen
      // Ermittelt Number-Wert des Niveaus an der Eingangstür (Baueigenschaft aus dem Profil "Baueinheit > Gebäude")
      // Zugriff über Layout File - könnte alternativ auch per findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung)
      // ermittelt werden aus dem Array profilModelAusgewaehlterKnoten
      // ACHTUNG: Der Wert könnte auch null sein!!! TODO XXXXXX - Testen!
      //===================================================================================================================================
      // ACHTUNG: Solche computed-Funktionen müssen aus dem Skript-Teil aufgerufen werden mit this.computeEingangsTuerNiveau OHNE Klammern!
      //===================================================================================================================================
      console.log("In computeEingangsTuerNiveau");
      let eingangsTuerNiveau = this.profilModelAusgewaehlterKnoten[
        this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[0]
          .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
      ].kennWert2; // Typ: Number (aus Backend)
      console.log("eingangsTuerNiveau: ", eingangsTuerNiveau);
      console.log("typeof eingangsTuerNiveau: ", typeof eingangsTuerNiveau); // Number (aus Backend)
      return eingangsTuerNiveau;
    },

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktionen für QFields mit VMoney:
    // HINWEISE: 2 alternative Varianten in Codepen auf https://codepen.io/mickey58/pen/JjbpWzm?editors=1111 getestet (mit einfachen Variablen statt
    //           Feldern in Objekten in Array wie hier):
    // 1) watch auf kennWert1 (v-model für 0.0-Niveauwert in kennWert1), in dem nhnNiveau (kennWert2, v-model für paariges Anzeigefeld für NHN-Niveauwert) aktualisiert wird
    // 2) computed-Funktion als "fiktives" v-model für das Feld zur Anzeige von kennWert2 (NHN-Niveauwert), welches aus dem aktuellen Wert
    //    des 0.0-Werts in kennWert1 den NHN-Wert ausrechnet (durch Addition des Niveaus am Eingang, aus Profil "Baueinheit > Gebäude" und das Ergebnis per VMoney anzeigen lässt
    // Beide Varianten funktionieren, hier wird aktuell 1) verwendet
    // ACHTUNG: Wenn die computed-Variante verwendet wird, sollte der watch disabled werden!
    // ACHTUNG: Bei 2) ist das "fiktive" v-model für kennWert2 "number", nicht "string", wie es auch unter dem 3. Testfeld angezeigt wird (typeOf)
    // ACHTUNG: Bei 2) wird das eigentliche v-model ja ersetzt durch eine computed-Funktion. Diese Variante eignet sich daher NICHT zum späteren
    //          Abspeichern des Wertes!
    //          Ob man in der computed-Funktion das "fiktive" v-model für kennWert2 updaten sollte, ist kontrovers -
    //          Ohne Vue $set gibt es Fehler "unerlaubter Side Effect"!!! Mit Vue $set maskiert man den Side Effect.
    //          Bisher einen experimentellen Update von kennWert2 eingebaut, dieser hat dabei stets Typ "Number"!!!
    //          Wenn man diese Updates macht, kann man diese paarigen Werte auch gleich mit speichern.
    //          Wenn sie stets den Typ "Number" haben, müssen sie nicht wie kennWert1 vor dem Submit von String nach Number umgewandelt werden.
    //          Statt dieser "Side Effect" Updates von kennWert2 könnte man erst beim Submit kennWert2 aus kennWert1 berechnen und dann kennWert2 speichern.
    //          Allerdings kann man dann auch keine Felder im Profilformular für kennWert2 anzeigen.
    // ACHTUNG: Alle computed-Funktionen werden von Vue automatisch daraufhin ausgewertet, von welchen Variablen (auch Array-Variablen)
    //          sie abhängig sind, und NUR DANN AUFGERUFEN, WENN DIESE SICH GEÄNDERT HABEN!!! Wird eine computed-Funktion per Log NICHT aufgerufen, liegt
    //          meist ein Typo vor in den Array-Indexes beim Zugriff auf Felder in layoutProfilFormular - diese dann in der betroffenen computed-Funktion überprüfen
    // ACHTUNG: Zerlegung der computed-Funktionen in Getter und Setter nach Fehlern (vermutlich durch VMoney ausgelöst) im Log!
    //          https://riptutorial.com/vue-js/example/25860/computed-setters
    //          Diese sind danach verschwunden!
    // ACHTUNG: Variante 1) mit Watch auf Objekt in Array profilModelAusgewaehlterKnoten ist eventuell komplex (Arrays sind nicht reaktiv). Eventuell müssen die
    //          v-models dieser NHN-Werte in normalen Variablen gehalten werden, die bei mounted, refresh, und reset mit dem Array synchronisiert werden müssten!
    //          Oder "deep Watch": https://michaelnthiessen.com/how-to-watch-nested-data-vue/ - wäre aber auf
    //          Array of Objects profilModelAusgewaehlerKnoten nötig!
    //          Siehe auch: https://stackoverflow.com/questions/34283891/vue-js-watch-array-of-objects
    // ACHTUNG: Die berechneten Felder rechts (Aufbauhöhe, Dicken) sind Kennwerte, nicht Kennwertepaar wie die Niveaus! Sie werden aktuell durch q-inputs mit
    //          :value="subtractNiveaus()" bedient. Dabei wird aktuell noch kein v-model für diese Felder aktualisiert (d.h. die
    //          dafür definierten Baueigenschaften (einfache Kennwerte, Typ Number) im Array profilModelAusgewaehlterKnoten, die
    //          dann die aktuell berechneten Werte auch in der Datenbank für etwaige Abfragen und Reports vorhalten).
    //=====================================================================================================================================
    //          DONE: Dies wie oben per Side Effect in dieser Methode subtractNiveaus(), alternativ könnte es erst beim Submit erfolgen)
    //          Dazu subtractNiveaus einen 3. optionalen Result-Parameter spendiert (Verweis auf das Objekt im Array, in dessen Feld kennWert1 die Funktion das Ergebnis
    //          per Vue $set schreibt).
    //=====================================================================================================================================
    // 4 Computed-Funktionen für Deckenniveaus:
    computeNHNNiveauOKFD: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauOKFD(computed)"); // Number
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1; // 0.0-Wert des Niveaus als Eingangsgröße, Typ: Number
        console.log("Zu konvertierendes nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von OKFD setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKFD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKFD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function(value) {
        console.log(
          "In Setter von computeNHNNiveauOKFD(value) - value: ",
          value
        );
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauOKRD: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauOKRD(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von OKRD setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKRD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKRD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauOKRD(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauUKRD: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauUKRD(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
            .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von UKRD setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKRD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor direkter Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKRD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauUKRD(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauUKFD: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauUKFD(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[1]
            .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von UKFD setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKFD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor direkter Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[1].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKFD(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauUKFD(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },
    //======================================================================================================================================
    // 4 Computed-Funktionen für Bodenniveaus:
    computeNHNNiveauOKFFB: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauOKFFB(computed)"); // Number
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1; // 0.0-Wert des Niveaus als Eingangsgröße, Typ: Number
        console.log("Zu konvertierendes nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von OKFFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKFFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[0]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKFFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauOKFFB(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauOKRFB: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauOKRFB(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von OKRFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKRFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauOKRFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauOKRFB(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauUKRFB: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauUKRFB(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von UKRFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKRFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor direkter Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[2]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKRFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauUKRFB(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    computeNHNNiveauUKFFB: {
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauUKFFB(computed)");
        // NEU: Ermittle zunächst das Niveau der Eingangstür aus Standort:
        let eingangsTuerNiveau = this.computeEingangsTuerNiveau; // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        // console.log("typeof(nullNiveau): ", typeof(this.nullNiveau))
        let nullNiveau = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[3].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        console.log("nullNiveau: ", nullNiveau);
        console.log("typeof nullNiveau: ", typeof nullNiveau);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveau == null) {
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          return null; // Paarigen NHN-Wert auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (eingangsTuerNiveau == null) {
          console.log("Eingangstürniveau aus Profil 'Baueinheit > Gebäude' ist null");
          // NEU: Auch für null-Fall Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nullNiveau; // Paarigen Wert auf 0.0-Wert von UKFFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nullNiveau
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Eingangstürniveau null stattdessen problemlos null auch für NHN-Werte returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        if (typeof nullNiveau === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveau hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let number = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveau
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "number aus Konvertierung, vor Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude': ",
            number
          );
          // console.log("typeof(number): ", typeof(number))
          number = number + eingangsTuerNiveau; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition des Niveaus an der Eingangstür, vor Rückkonvertierung nach Dezimalstring: ",
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKFFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveau hat Typ Number, vor direkter Addition des Niveaus an der Eingangstür aus Profil 'Baueinheit > Gebäude'"
          );
          let number = nullNiveau + eingangsTuerNiveau; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
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
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[4].baueigenschaftenInRubrik[3]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            number
          );
          console.log("Ergebnis von computeNHNNiveauUKFFB(computed): ", result);
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNHNNiveauUKFFB(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    //======================================================================================================================================
    // 2 Computed-Funktionen für Niveau Türstürze:
    computeNHNNiveauTuerstuerze: {
      // Berechnet aus OKFFB (Niveau) zuzüglich lichter Türdurchgangshöhe (Number)
      // Returned NHN-Niveau als Dezimalstring (Format wie VMoney)
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNHNNiveauTuerstuerze(computed)"); // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        let tuerDurchgangsHoehe = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1; // ACHTUNG: Ist bei Zugriff String (Format ...###,###... !!!
        // Wird wohl von Quasar automatisch hin- und herkonvertiert String <=> Number
        // Muss für Verwendung in Berechnung unten erst von String nach Number konvertiert werden!
        // Dies erfolgt weiter unten!
        console.log("tuerDurchgangsHoehe: ", tuerDurchgangsHoehe);
        console.log("typeof tuerDurchgangsHoehe: ", typeof tuerDurchgangsHoehe);
        let nhnNiveauOKFFB = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert2; // NHN-Wert des OKFFB-Niveaus als Eingangsgröße
        console.log("Zu konvertierendes nhnNiveauOKFFB: ", nhnNiveauOKFFB);
        console.log("typeof nhnNiveauOKFFB: ", typeof nhnNiveauOKFFB);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nhnNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nhnNiveauOKFFB == null) {
          // NEU: Auch bei null Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2", // NHN-Niveau!
            null
          );
          return null; // Computed NHN-Wert für Türstürze auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (tuerDurchgangsHoehe == null) {
          console.log("Türdurchgangshöhe ist null");
          // NEU: Auch bei null Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2", // NHN-Niveau!
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nhnNiveauOKFFB; // Paarigen Wert auf NHN-Wert von OKFFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nhnNiveauOKFFB
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Türdurchgangshöhe null stattdessen problemlos null auch für UKTS returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        //=======================================================================
        // Nun tuerDurchgangsHoehe konvertieren von String nach Number:
        let numberTuerDurchgangsHoehe = parseFloat(tuerDurchgangsHoehe);
        console.log("numberTuerDurchgangsHoehe: ", numberTuerDurchgangsHoehe);
        //=======================================================================
        // ACHTUNG: tuerDurchgangsHoehe kann auch String sein!!!
        if (typeof nhnNiveauOKFFB === "string") {
          // ACHTUNG: Hier nicht this.nhnNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nhnNiveauOKFFB hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let numberOKFFB = this.decimalHandling.convertDecimalStringToNumber(
            nhnNiveauOKFFB
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "numberOKFFB aus Konvertierung, vor Addition der Türdurchgangshöhe: ",
            numberOKFFB
          );
          // console.log("typeof(numberOKFFB): ", typeof(numberOKFFB))
          let number = numberOKFFB + numberTuerDurchgangsHoehe; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition der Türdurchgangshöhe, vor Rückkonvertierung nach Dezimalstring: ",
            number
          );
          // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als Number, aber
          // dieser wird leider NICHT durch v-money formatiert!
          // Daher mit Custom Funktion wieder in Dezimalstring rückkonvertieren, wie es VMoney intern auch macht:
          let result = this.decimalHandling.convertNumberToDecimalString(
            number,
            2,
            ",",
            "."
          );
          // console.log("typeof(result): ", typeof(this.result))
          console.log(
            "Berechnetes NHN-Niveau nach Rückkonvertierung in Dezimalstring in computed: ",
            result
          );
          // ACHTUNG: Experimenteller Update von kennWert2 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2", // NHN-Niveau!
            number
          );
          console.log(
            "Ergebnis von computeNHNNiveauTuerstuerze(computed): ",
            result
          );
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nhnNiveauOKFFB hat Typ Number, vor Addition der Türdurchgangshöhe"
          );
          let number = nhnNiveauOKFFB + numberTuerDurchgangsHoehe; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
          let result = this.decimalHandling.convertNumberToDecimalString(
            number,
            2,
            ",",
            "."
          );
          // console.log("typeof(number): ", typeof(this.number))
          console.log(
            "Berechnetes NHN-Niveau nach Konvertierung in Dezimalstring in computed: ",
            result
          );
          // ACHTUNG: Experimenteller Update von kennWert1 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2", // NHN-Niveau!
            number
          );
          console.log(
            "Ergebnis von computeNHNNiveauTuerstuerze(computed): ",
            result
          );
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      set: function(value) {
        console.log(
          "In Setter von computeNHNNiveauTuerstuerze(value) - value:",
          value
        );
      }
    },

    computeNullNiveauTuerstuerze: {
      // Berechnet aus OKFFB (Niveau) zuzüglich lichter Türdurchgangshöhe (Number)
      // Returned 0.0-Niveau als Dezimalstring (Format wie VMoney)
      // ACHTUNG: Zerlegung in Getter und Setter nach Fehlern im Log!
      // https://riptutorial.com/vue-js/example/25860/computed-setters
      // Diese sind danach verschwunden!
      // computed Getter:
      get: function() {
        console.log("In Getter von computeNullNiveauTuerstuerze(computed)"); // Number
        // ACHTUNG: Der Typ des v-models von per VMoney angezeigten Niveaus ist anfangs Number
        // und ändert sich nach der ersten Eingabe von Number nach String!!!
        // Daher müssen beide Fälle hier behandelt werden:
        let tuerDurchgangsHoehe = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[6]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
        // ACHTUNG: Ist aktuell Input-Feld mit type="number"!!!
        // ACHTUNG: Kann per Tests sowohl Object als auch String (Format ...###,###... sein!!!
        // Wird wohl von Quasar/HTML automatisch hin- und herkonvertiert String <=> Number
        // Muss für Verwendung in Berechnung unten erst von String nach Number konvertiert werden!
        // Dies erfolgt weiter unten!
        console.log("tuerDurchgangsHoehe: ", tuerDurchgangsHoehe);
        console.log("typeof tuerDurchgangsHoehe: ", typeof tuerDurchgangsHoehe);
        let nullNiveauOKFFB = this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0].rubrikenInTab[4]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1; // 0.0-Wert des OKFFB-Niveaus als Eingangsgröße
        console.log("Zu konvertierendes nullNiveauOKFFB: ", nullNiveauOKFFB);
        console.log("typeof nullNiveauOKFFB: ", typeof nullNiveauOKFFB);
        // ACHTUNG: Mit dieser Umstellung auf das Objekt im Array als
        // Quelle kann am Anfang typeof nullNiveau nicht nur
        // String oder Number sein, sondern sogar Object und null!!!
        // Daher muss dieser Fall zuerst getrennt abgefangen werden:
        if (nullNiveauOKFFB == null) {
          // NEU: Auch bei null Update von kennWert1 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1", // 0.0-Niveau!
            null
          );
          return null; // Computed 0.0-Wert für Niveau Türstürze auch auf null setzen!
          // return 0; // ALT - mit VMoney: Wenn mit VMoney null returned wurde, gab es Error "expected Number, String, got Null"!!!
          //       Daher mit VMoney einfach Number 0 als Workaround returned
          // return null; // NEU - mit VueAutoNumeric: Korrekter Wert ist null, VueAutonumeric kann mit null umgehen
        }
        if (tuerDurchgangsHoehe == null) {
          // NEU: Auch bei null Update von kennWert1 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1", // 0.0-Niveau!
            null
          );
          //-----------------------------------------------------------------------------------------------------------------
          // ALT: Fehlversuche mit VMoney
          // return nhnNiveauOKFFB; // Paarigen Wert auf NHN-Wert von OKFFB setzen
          // ACHTUNG: Damit kam bei Wert des Eingangstürniveaus null (d.h. dieses nicht gesetzt am Gebäude) anfangs
          // folgende Warnung im Log:
          // "[Vue warn]: Invalid prop: type check failed for prop "value". Expected Number, String, got Null."
          // Vermutlich ist dies, weil anfangs nhnNiveau Type Object und null ist!
          // Mit return null hier kommt erst recht dieser Fehler!
          // WORKAROUND: Konvertieren nach String:
          // return this.decimalHandling.convertDecimalStringToNumber(
          //   // HINWEIS: Der Fall, dass nullNiveau null ist wurde oben schon behandelt!
          //   nhnNiveauOKFFB
          // );
          //-----------------------------------------------------------------------------------------------------------------
          // NEU: Obigen Quatsch gegen Null-Fehler mit VMoney durch Ersetzung von VMoney durch VueAutoNumeric eliminiert.
          // Mit VueAutoNumeric kann bei Türdurchgangshöhe null stattdessen problemlos null auch für UKTS returned werden:
          return null; // HINWEIS: Der Fall, dass nhnNiveauOKFFB null ist wurde oben schon behandelt!
        }
        //=======================================================================
        // Nun tuerDurchgangsHoehe konvertieren von String nach Number:
        let numberTuerDurchgangsHoehe = parseFloat(tuerDurchgangsHoehe);
        console.log("numberTuerDurchgangsHoehe: ", numberTuerDurchgangsHoehe);
        //=======================================================================
        if (typeof nullNiveauOKFFB === "string") {
          // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "nullNiveauOKFFB hat Typ (Dezimal-)String, deshalb Konvertierung nach Number"
          );
          let numberOKFFB = this.decimalHandling.convertDecimalStringToNumber(
            nullNiveauOKFFB
          ); // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          console.log(
            "numberOKFFB aus Konvertierung, vor Addition der Türdurchgangshöhe: ",
            numberOKFFB
          );
          // console.log("typeof(numberOKFFB): ", typeof(numberOKFFB))
          let number = numberOKFFB + numberTuerDurchgangsHoehe; // ACHTUNG: Manchmal Rundungsfehler!
          number = Math.round(number * 100) / 100;
          // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
          console.log(
            "number nach Addition der Türdurchgangshöhe, vor Rückkonvertierung nach Dezimalstring: ",
            number
          );
          // ACHTUNG: Dies ist per Test zwar der korrekt berechnete Wert als Number, aber
          // dieser wird leider NICHT durch v-money formatiert!
          // Daher mit Custom Funktion wieder in Dezimalstring rückkonvertieren, wie es VMoney intern auch macht:
          let result = this.decimalHandling.convertNumberToDecimalString(
            number,
            2,
            ",",
            "."
          );
          // console.log("typeof(result): ", typeof(this.result))
          console.log(
            "Berechnetes 0.0-Niveau nach Rückkonvertierung in Dezimalstring in computed: ",
            result
          );
          // ACHTUNG: Experimenteller Update von kennWert1 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1", // 0.0-Niveau!
            number
          );
          console.log(
            "Ergebnis von computeNullNiveauTuerstuerze(computed): ",
            result
          );
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
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
            "nullNiveauOKFFB hat Typ Number, vor Addition der Türdurchgangshöhe"
          );
          let number = nullNiveauOKFFB + numberTuerDurchgangsHoehe; // ACHTUNG: Hier nicht this.nullNiveau wie bei Tests, sondern obige lokale Variable
          number = Math.round(number * 100) / 100;
          console.log(
            "number vor Aufruf von convertNumberToDecimalString: ",
            number
          );
          // Daher Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-   without-rounding-to-the-next-bigger-numb
          let result = this.decimalHandling.convertNumberToDecimalString(
            number,
            2,
            ",",
            "."
          );
          // console.log("typeof(number): ", typeof(this.number))
          console.log(
            "Berechnetes Nullniveau nach Konvertierung in Dezimalstring in computed: ",
            result
          );
          // ACHTUNG: Experimenteller Update von kennWert1 per Vue $set - ohne das kommt Fehlermeldung "Side Effect"
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[0]
                .rubrikenInTab[6].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert1", // 0.0-Niveau!
            number
          );
          console.log(
            "Ergebnis von computeNullNiveauTuerstuerze(computed): ",
            result
          );
          console.log("Typ: ", typeof result);
          return result; // Dezimalstring
        }
      },
      // computed Setter:
      set: function() {
        console.log("In Setter von computeNullNiveauTuerstuerze(computed)");
        // ACHTUNG: Setter wird per Log aufgerufen!!! Macht aber nur obige Console Log Ausgabe!
        // TODO XXXXXX: Hier etwas zu tun?
      }
    },

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------
    computeMaximumVonHGWUndHHW: function() {
      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      // Hier nur als Vorlage!
      // computed-Funktion zur Bestimmung des Maximums aus den Werten für HGW und HHW
      // ACHTUNG: Diese computed-Funktion erledigt auch gleich den Update des für das Maximum definierten Baueigenschaft passenden v-models im Array
      //          profilModelAusgewaehlterKnoten!!!
      //------------------------------------------------------------------------------------------------------------------------------------------------------------
      console.log("In computeMaximumVonHGWUndHHW (computed)");
      let maximum = Math.max(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1,
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1
      );
      console.log("maximum: ", maximum);
      // Es folgt der Update des v-models der Baueigenschaft für das Maximum aus HGW und HHW
      // Deren "Koordinaten" sind definiert in layout-baueinheit-geschoss-baueigenschafts-profil-formular.js
      // ACHTUNG: Bei direktem Update ohne Vue $set kommt Fehler: Unerlaubter Side Effect!!!
      // Daher per Vue $set:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
        ],
        "kennWert1",
        maximum
      );
      return maximum;
    }
  }, // /computed

  //***=====================================================================================================================================
  watch: {
    // Watch auf ausgewaehltesBaueigenschaftsProfil
    ausgewaehltesBaueigenschaftsProfil: {
      handler: function() {
        console.log(
          "In watch von baueinheit-geschoss-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
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
          "In watch von baueinheit-geschoss-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNode erkannt"
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
              // Finde Baueigenschaft im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitGeschossBaueigenschaftsProfilFormular) {
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
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted () und Reset-Methode
          // Hier für Geschoss entfernt!
        }
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von baueinheit-geschoss-baueigenschafts-profil-formular.vue"
    );
    // this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl des Profils im generischen Formular - wird hier nicht benötigt
    this.readZugehoerigesProfil()
      .then(() => {
        console.log("Erfolg aus readZugehoerigesProfil()");
        // Folgender Code war für Standort, disabled für Geschoss:
        /*
        console.log(
          "Initialisiere Variable selectOptionsGemeinden aus JSON-Array"
        );
        this.selectOptionsGemeinden = GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten;
        this.selectFilterOptionsGemeinden = GemeindenDeutschlandMitNamenIhrerVerwaltungsEinheiten;
        console.log(
          "selectOptionsGemeinden[0]: ",
          this.selectOptionsGemeinden[0]
        );
        */
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
          //-----------------------------------------------------------------------------------------------------------------------------
          // NEU: Initialisiere den Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
          // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

          // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
          // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
          for (let tab of this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular) {
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
                    "In for in Reihenfolge der Baueigenschaften in layoutBaueinheitGeschossBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
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
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
          // Hier für Geschoss entfernt!
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
              // Finde Baueigenschaft im Array layoutBaueinheitGeschossBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitGeschossBaueigenschaftsProfilFormular) {
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
        console.log("✅✅✅ $refs: ", this.$refs);
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
/* CSS, um selektiv die Spinners an Input-Feldern zu removen, z.B. bei Dezimalzahlen, wo sie keinen Sinn machen */
/* Vorlage: https://stackoverflow.com/questions/33749896/hide-html5-input-type-number-arrow-with-a-css-class */
/* Funktioniert so (selektiv per class="no-spin" an QInputs) warum auch immer NICHT! */
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
.no-spin {
  -moz-appearance: textfield !important;
}
/* Stattdessen für alle Input-Felder mit type="number" Spinners removed in der gesamten Komponente: */
/* Vorlagen: https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box und https://codepen.io/smolinari/pen/pmdLrZ */
/* ACHTUNG: In Verbindung mit step="any" die Spinners wieder enabled, sie zählen dann nur die Stellen vor dem Komma hoch und runter */
/*
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}
*/
</style>
