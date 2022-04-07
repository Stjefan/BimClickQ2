<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für spezifisches Baueigenschaftsprofilformular für Baueigenschaftsprofil "Baueinheit > Gebäude"                            -->
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
    <div v-if="profilBezeichnung !== 'Baueinheit > Gebäude'">
      TODO: Aufruf mit falscher profilBezeichnung!
    </div>
    <div v-else>
      <!-- </q-card> -->
      <!-- ACHTUNG: Diese q-card DISABLED, da sie einen horizontalen Scrollbalken verursacht unter dem Formular!!! -->
      <!-- @input="initialisiereAusgewaehltesTabGebaeudeBaueigenschaftsProfilFormular" -->
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
        v-model="tabGebaeudeBaueigenschaftsProfilFormular"
        @input="initialisiereAusgewaehltesTabGebaeude"
      >
        <!-- NEU: -->
        <!-- Tab für "Geometrie", vorläufig beschränkt auf Angaben zum Niveau, daher Label entsprchend benannt -->
        <q-tab
          name="geometrieTabGebaeudeBaueigenschaftsProfilFormular"
          label="Niveau"
          no-caps
        />
        <q-tab
          name="bauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular"
          label="Bauordnungsrecht"
          no-caps
        />
        <!-- NEU: Tab "Verwendungsverbote/-gebote dropped, Inhalt verschoben nach "Bauordnungsrechtliche Angaben" -->
        <!--
          <q-tab
            name="verwendungsverboteTabGebaeudeBaueigenschaftsProfilFormular"
            label="Verwendungsverbote/-gebote"
            no-caps
          />
          -->
        <q-tab
          name="nutzungTabGebaeudeBaueigenschaftsProfilFormular"
          label="Nutzung"
          no-caps
        />
        <q-tab
          name="anforderungenTabGebaeudeBaueigenschaftsProfilFormular"
          label="Anforderungen"
          no-caps
        />
         <!-- NEU - #387 -->
        <q-tab
          name="musterhaftigkeitTabGebaeudeBaueigenschaftsProfilFormular"
          label="Musterhaftigkeit"
          no-caps
        />
      </q-tabs>
      <!-- <q-separator /> -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
      <q-tab-panels v-model="tabGebaeudeBaueigenschaftsProfilFormular" animated>
        <!--================================================================================================================================== -->
        <!-- TODO: width justieren -->
        <!-- ALT: style="max-width: 550px" -->
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="geometrieTabGebaeudeBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 3: "Geometrie"                                                                         -->
          <!-- ACHTUNG Tab 3 nach vorne gezogen!!                                                         -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pa-xs q-gutter-xs full-width"> <!-- ACHTUNG: So unbedingt nötig für Funktion der q-separators! -->
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Angaben zum Gebäudeniveau
                  <!--
                  {{
                    zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung
                  }}
                  -->
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Angaben zum Gebäudeniveau
                  <!--
                  {{
                    zuFormularGehoerigesProfil.baueigenschaftsProfilBezeichnung
                  }}
                  -->
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
              </div>
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
              <!-- ========================== Start Rubrik 0 ================================== -->
              <q-separator />
              <div class="row full-width q-pa-xs bg-blue-grey-2">
                <b>
                {{
                  layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                    .rubrikenInTab[0].ueberschriftRubrik
                }}
                </b>
              </div>
              <!-- 2 Felder für Dezimalwerte mit VueAutonNumeric - Vorlage siehe Baueigenschaftsprofil "Baueinheit > Geschoss": -->
              <!-- --------------------------------------------------- -->
              <div class="row full-width q-pt-xs q-gutter-xs">
                <!-- Start Spalte für Höhenlage (Sollwert aus Standort): -->
                <div class="col-md-3 col-12">
                  <!-- ACHTUNG: Hier Custom Label statt: -->
                  <!--3
                :label="
                  layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                  .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                  .labelBaueigenschaft
                "
                -->
                  <!-- ACHTUNG: Bisher kein Hint! -->
                  <!-- ACHTUNG: q-fields für Sollwerte sind readonly! -->
                  <q-field
                    readonly
                    ref="refHoehenlage"
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                    "
                    bg-color="green-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                        ref="refHoehenlageAutoNumeric"
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
                    <!-- ACHTUNG: Bei Sollwerten aus Geschoss sind q-btns disabled! -->
                    <!--          (diese aus optischen Gründen beibehalten) -->
                    <template v-slot:prepend>
                      <q-btn
                        disable
                        dense
                        @click="changeNiveau('Hoehenlage', 0.01)"
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
                        disable
                        dense
                        @click="changeNiveau('Hoehenlage', -0.01)"
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1
                    }}
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1
                    }}
                  </div>
                </div>
                <!-- Start Spalte für OKFFB EG (Istwert, initialisiert mit Sollwert - Höhenlage aus Standort) -->
                <div class="col-md-3 col-12">
                  <!-- ACHTUNG: Hier Custom Label statt: -->
                  <!--3
                :label="
                  layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                  .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                  .labelBaueigenschaft
                "
                -->
                  <!-- ACHTUNG: Bisher kein Hint! -->
                  <!-- ACHTUNG: q-fields für Sollwerte sind readonly! -->
                  <q-field
                    ref="refOKFFBEG"
                    dense
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                    "
                    bg-color="purple-2"
                    standout="bg-purple-4 text-black"
                    square
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert2
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Kennwertepaar'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
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
                        ref="refOKFFBEG"
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
                    <!-- ACHTUNG: Bei Sollwerten aus Geschoss sind q-btns disabled! -->
                    <!--          (diese aus optischen Gründen beibehalten) -->
                    <template v-slot:prepend>
                      <q-btn
                        dense
                        @click="changeNiveau('OKFFBEG', 0.01)"
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
                        @click="changeNiveau('OKFFBEG', -0.01)"
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1
                    }}
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1
                    }}
                  </div>
                </div>
                <div class="col-md-6 col-12">
                <!-- Leer -->
                </div>
                <!-- ------------------------------------------------------------------------------------------ -->
                <q-separator
                  class="stretch full-width"
                />
                <div class="row q-pa-xs">
                  <b>Hinweise:</b>
                  <ul>
                  <li>
                  Das <b>Niveau der Oberkante des Fertigbodens am
                  Gebäudeeingang</b> (OKFFB EG, rechtes, <span style='color: #000000; background-color: #E1BEE7'>lilafarbiges</span> Eingabefeld) wird mit der <b>Höhenlage der
                  Geländeoberkante des Grundstücks am Standort</b> (linkes <span style='color: #000000; background-color: #C8E6C9'>hellgrünes</span> Ausgabefeld) vorbelegt.
                  </li>
                  <li>
                  Dieser vorbelegte Wert von OKFFB EG am Gebäude im rechten, <span style='color: #000000; background-color: #E1BEE7'>lilafarbigen</span> Eingabefeld kann bei Bedarf <b>gebäudespezifisch angepasst</b> werden.
                  </li>
                  <b>Achtung:</b> Solche vorbelegte oder angepasste Werte von OKFFB EG am Gebäude im rechten, <span style='color: #000000; background-color: #E1BEE7'>lilafarbigen</span> Eingabefeld werden
                  <b>erst nach einmaligem Speichern wirksam.</b>
                  <li>Der gespeicherte Wert von OKFFB EG wird an Geschosse und Räume im Gebäude weitervererbt und
                  dort zur Umrechnung aller 0,0-Niveaus in NHN-Niveaus verwendet.
                  </li>
                  <li>
                  Der Wert des linken Ausgabefelds kann im Tab
                  <b>"Bauvorhaben" > "Fachliche Planung" > "Standort" > "Grundstück"</b> durch Handeingabe festgelegt
                  oder aus den Geokoordinaten des Grundstücks ermittelt werden.
                  </li>
                  <li>
                  Alle Einheiten in [m ü. NHN].
                  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <!-- --------------------------------------------------------------------------------------------- -->
        <q-tab-panel
          name="bauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 0: "Bauordnungsrechtliche Angaben"                                                     -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pa-xs q-gutter-xs full-width"> <!-- ACHTUNG: So unbedingt nötig für Funktion der q-separators! -->
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Bauordnungsrechtliche Angaben zum Gebäude
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Bauordnungsrechtliche Angaben zum Gebäude
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
              </div>
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
              <!-- ========================== Start Rubrik 0 ================================== -->
                <q-separator />
                <div class="row full-width q-pa-xs bg-blue-grey-2">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[0].ueberschriftRubrik
                    }}
                  </b>
                </div>
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Bauweise gemäß Bauordnung/b>                              -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
              <!-- ========================== Start Rubrik 1 ================================== -->
              <q-separator />
                <div class="row full-width q-pa-xs bg-indigo-2">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].ueberschriftRubrik
                    }}
                  </b>
                </div>
              <div
                class="row q-pt-xs q-col-gutter-xs full-width items-end"
              >
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
                <!-- ========================== Überschriften Rubrik 1 ========================================== -->
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>Honorarordnung für Architekten und Ingenieure (HOAI)</b>
                </div>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-3 col-12 q-pa-xs">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Honorarzone für Wärmeschutz/b>                                        -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
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
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Honorarzone für Schallschutz/b>                                       -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
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
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Honorarzone für Raumakustik/b>                                        -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[2]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- style="height: 100%" --> <!-- Hier nicht, wird warum auch immer höher als QSelects -->
                  <q-btn
                    dense
                    class="stretch full-width"
                    :href="computeURLHOAI"
                    type="a"
                    target="_blank"
                    label="Honorarordnung für Architekten und Ingenieure"
                    color="indigo-3 text-black"
                    glossy
                    no-caps
                  />
                </div>
              </div>
              <!-- ==================== Ende  1. Zeile von Feldern in Rubrik 1 ========================= -->
            </div>
            <!-- ========================== Ende Rubrik 0 ================================== -->
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
          name="nutzungTabGebaeudeBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 1 "Nutzung                                                                             -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <div class="q-pa-xs q-gutter-xs full-width"> <!-- ACHTUNG: So unbedingt nötig für Funktion der q-separators! -->
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Nutzung des Gebäudes
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Nutzung des Gebäudes
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
              </div>
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
              <!-- ========================== Start Rubrik 0 ================================== -->
                <q-separator />
                <div class="row full-width q-pa-xs bg-blue-grey-2">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[0].ueberschriftRubrik
                    }}
                  </b>
                </div>
              <!-- ===================================================================================================================== -->
              <!-- NEU: Vorlage auf https://codepen.io/mickey58/pen/yLJEJNG?editors=1111                                                 -->
              <!--
                    Quasar QSelect with nested, expandable options, 3 levels, (single) selection is supported on all option levels
                    Uses QSelect VSlot with QExpansionItems for the options
                    Code does recursive traversal of options array with nested children to generate nested QExpansionItems as
                    the options of the QSelect
                    Note: With QSelect selection 'multiple', the simple "model = value" assignment for @click() needs to be
                    replaced by an array push operation
                    Erkenntnisse/Hinweise:
                    1. Verschachtelter Array mit children für die Options am QSelect- dessen V-Model ist String.
                    2. Die Options werden per QExpansionItems und v-ifs gerendered und traversiert - per @click-Events
                       wird die jeweils ausgewählte Option (Feld label) aus dem Array an das VModel zugewiesen.
                    3. expand-icon-toggle am q-expansion-item funktioniert hier aus unbekanntem Grund NICHT - es bricht die
                       Auswählbarkeit eines Items per @click!
                    4. Auf der 1. und 2. Kindebene spezielle computed-Funktion :expand-icon=arrowDownIconOnlyIfChildren, um
                       Expansion Icon auszublenden, falls keine Kinder
                    5. :expand-icon="null" auf der 3. Kindebene, um dort KEIN Icon zum Expandieren anzuzeigen!
                    6. Spezielle class und header-class am expansion-icon zur Formatierung der Options
                    7. Auswahl eines Items als QSelect-Option ist absichtlich auf ALLEN Eltern- und Kindebenen möglich per
                       @click-Funktion, mit passender Zuweisung an das v-model des q-select
                    8. Options sind Bauwerkszuordnungen nach BWZ-Schema - eine Eltern- und 3 Kindebenen -
                       bei tieferen Strukturen muss der Code angepasst werden!
                -->
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-6 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Bauwerkszuordnung (BWZ)/b>                                            -->
                  <!-- ALT: QSelect mit BWZ-Aufzählungswerten als "lineare" Options             -->
                  <!--
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                      )
                    "
                  ></q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                  -->
                  <!-- ----------------------------------------------------------------------------------------- -->
                  <!-- NEU: Selbes QSelect mit speziellen, nested Options                                        -->
                  <q-select
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    clearable
                    options-selected-class="text-primary"
                    :options="bauwerksZuordnungenHierarchisch"
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                      )
                    "
                  >
                    <template v-slot:option="scope">
                      <!-- ACHTUNG: Die oberste Ebene ("Elternebene") in den Options wird durch obige -->
                      <!-- :options am QSelect von selbst angezeigt, ohne v-for!!!-->
                      <!-- {{ scope }} -->
                      <!-- Die Property scope an diesem VSlot ist z.B. { index: 0 , opt: scope.opt } -->
                      <!-- {{ scope.opt }} -->
                      <!-- scope.opt ist jeweils ein verschachteltes Element auf der obersten Ebene im -->
                      <!-- Array options -->
                      <!-- ACHTUNG: divs mit v-ifs über den options OHNE scope.opt.children als Start -->
                      <!-- funktionieren NICHT!!! -->
                      <!-- -------------------------------------------------------------------------------- -->
                      <!-- 1. Kindebene, z.B. "1300 - ...": -->
                      <!-- Traversiert jeweils per v-for alle Elemente im Array der Kinder
                            eines Elements auf der obersten Ebene (scope.opt.children) und rendered diese als
                            Expansion Items:
                        -->
                      <div
                        v-for="child1 in scope.opt.children"
                        :key="child1.label"
                      >
                        <q-expansion-item
                          :expand-icon="arrowDownIconOnlyIfChildren(child1)"
                          dense
                          expand-separator
                          group="children1Group"
                          class="text-body2 bg-light-green-3"
                          :header-class="{
                            'text-blue-10 bg-light-blue-2':
                              profilModelAusgewaehlterKnoten[
                                layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                                  .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].aufzaehlungsWert === child1.label
                          }"
                          :label="child1.label"
                          @click="
                            profilModelAusgewaehlterKnoten[
                              layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1].rubrikenInTab[0].baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
                            ].aufzaehlungsWert = child1.label
                          "
                        >
                          <!-- ---------------------------------------------------------------------------- -->
                          <!-- 2. Kindebene, z.B. "1320 - ...": -->
                          <!-- Traversiert per v-for alle Elemente im Array der Kinder (child1.children)
                                und rendered diese als Expansion Items:
                            -->
                          <div
                            v-for="child2 in child1.children"
                            :key="child2.label"
                          >
                            <q-expansion-item
                              :expand-icon="arrowDownIconOnlyIfChildren(child2)"
                              :header-inset-level="0.2"
                              dense
                              expand-separator
                              group="children2Group"
                              class="text-body2 bg-light-green-2"
                              :header-class="{
                                'text-blue-10 text-bold bg-light-blue-2':
                                  profilModelAusgewaehlterKnoten[
                                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                                      .rubrikenInTab[0]
                                      .baueigenschaftenInRubrik[0]
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].aufzaehlungsWert === child2.label
                              }"
                              :label="child2.label"
                              @click="
                                profilModelAusgewaehlterKnoten[
                                  layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1].rubrikenInTab[0].baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
                                ].aufzaehlungsWert = child2.label
                              "
                            >
                              <!-- ------------------------------------------------------------------------ -->
                              <!-- 3. Kindebene, z.B. "1321 - ....": -->
                              <!-- Traversiert per v-for alle Elemente im Array der Enkelkinder
                                    (child2.children) und rendered diese als Expansion Items:
                                -->
                              <div
                                v-for="child3 in child2.children"
                                :key="child3.label"
                              >
                                <q-expansion-item
                                  expand-icon="null"
                                  :header-inset-level="0.4"
                                  dense
                                  expand-separator
                                  group="children3Group"
                                  class="text-body2 bg-light-green-1"
                                  :label="child3.label"
                                  @click="
                                    profilModelAusgewaehlterKnoten[
                                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1].rubrikenInTab[0].baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
                                    ].aufzaehlungsWert = child3.label
                                  "
                                  :header-class="{
                                    'text-blue-10 text-bold bg-light-blue-2':
                                      profilModelAusgewaehlterKnoten[
                                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                                          .rubrikenInTab[0]
                                          .baueigenschaftenInRubrik[0]
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].aufzaehlungsWert === child3.label
                                  }"
                                >
                                </q-expansion-item>
                              </div>
                            </q-expansion-item>
                          </div>
                        </q-expansion-item>
                      </div>
                      <div class="col-md-6 col-12">
                      </div>
                    </template>
                    <!-- --------------------------------------------------------------------------------- -->
                    <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                    <!-- ALT: content-class="my-tooltip"                                                   -->
                    <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                    <!-- --------------------------------------------------------------------------------- -->
                    <q-tooltip
                      v-if="
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                      "
                      :delay="1000"
                      :offset="[0, 10]"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
              <!-- ========================== Ende  Rubrik 0 ================================== -->
              <!-- ========================== Start Rubrik 1 ================================== -->
              <!-- Gebäudetyp -->
                <q-separator />
                <div class="row full-width q-pa-xs bg-blue-grey-2">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[1].ueberschriftRubrik
                    }}
                  </b>
                </div>
              <div
                class="row q-pt-xs q-col-gutter-xs full-width items-end"
              >
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
                <!-- ========================== Überschriften Rubrik 1 ========================================== -->
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Gebäudetyp (EnEV/GEG)</b>                                            -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[0]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Gebäudetyp (Schallschutz)>/b>                                         -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[1].baueigenschaftenInRubrik[1]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[1].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
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
                <div class="col-md-6 col-12">
                  <!-- Leer -->
                </div>
                <!-- ==================== Ende  1. Zeile von Feldern in Rubrik 1 ========================= -->
              </div>
              <!-- ========================== Ende Rubrik 1 ================================== -->
              <!-- ========================== Start Rubrik 2 ================================== -->
              <!-- Nutzungsprofile -->
              <q-separator />
                <div class="row full-width q-pa-xs bg-light-green-4">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].ueberschriftRubrik
                    }}
                  </b>
              </div>
              <!-- <q-separator /> -->
              <div class="row q-pa-xs full-width bg-light-green-2">
                  <b>
                    Deutsche Gesellschaft für Nachhaltiges Bauen (DGNB)
                  </b>
              </div>
              <div
                class="row q-pt-xs q-col-gutter-xs full-width items-end"
              >
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
                <!-- ========================== Überschriften Rubrik 1 ========================================== -->
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-3 col-12">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
              </div>
              <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
              <div class="row q-pt-xs q-col-gutter-xs full-width">
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Nutzungsprofil für Neubau (DGNB)</b>                                  -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[0]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Nutzungsprofil für Sanierung und Bestand (DGNB)</b>                   -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[1]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Nutzungsprofil für Innenraum (DGNB)</b>                               -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[2]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-select>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-3 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QSelect-Feld                                                             -->
                  <!-- <b>Nutzungsprofil für Quartier (DGNB)</b>                                -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                            .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
                      );
                      h;
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[3]
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
              <!-- -------------------------------------------------------------------------------- -->
              <!-- Start 2. Zeile für DGNB-Nutzungsprofile:                                         -->
              <div
                class="row q-pt-xs q-col-gutter-xs full-width items-end"
              >
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
                <!-- ========================== Überschriften Rubrik 1 ========================================== -->
                <div class="col-3">
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                        .labelBaueigenschaft
                    }}
                  </b>
                </div>
                <div class="col-md-6 col-12">
                  <!-- Platzhalter -->
                </div>
                <div class="col-md-3 col-12">
                  <b>Deutsche Gesellschaft für Nachhaltiges Bauen (DGNB)</b>
                </div>
              </div>
            <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
            <div class="row q-pt-xs q-col-gutter-xs full-width">
              <div class="col-md-3 col-12">
                <!-- ============================ Start Feld ================================ -->
                <!-- QSelect-Feld                                                             -->
                <!-- <b>Nutzungsprofil für Neubau (DGNB)</b>                                  -->
                <q-select
                  clearable
                  v-if="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                  "
                  :disable="
                    !benutzerDarfBearbeitenSelectedNode ||
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungWerteVererbenderElternknoten != null ||
                      !profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aktiviertNichtDeaktiviert ||
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[4].disable
                  "
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  :options="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft
                      .selektierbareOptionenAufzaehlungsWert
                  "
                  :label="
                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                      .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                      .labelBaueigenschaft
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].aufzaehlungsWert
                  "
                  @focus="
                    setzeFelderFuerFachlicheHilfe(
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[4]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                </q-select>
                <div v-else>
                  Nicht unterstützter Wertetyp
                </div>
              </div>
              <div class="col-md-6 col-12">
                <!-- Platzhalter -->
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  dense
                  class="stretch full-width"
                  :href="computeURLDGNB"
                  type="a"
                  target="_blank"
                  label="DGNB Zertifizierungssystem"
                  color="light-green-3 text-black"
                  glossy
                  no-caps
                />
              </div>
            </div>
            <!-- ================================================================================ -->
            <!-- Unterrubrik für BNB: -->
            <q-separator />
            <div class="row q-pa-xs full-width bg-light-green-2">
              <b>
                Bewertungssystem Nachhaltiges Bauen für Bundesgebäude (BNB)
              </b>
            </div>
            <!-- Start Zeile für BNB-Nutzungsprofile:                                         -->
            <div
              class="row q-pt-xs q-col-gutter-xs full-width items-end"
            >
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
              <!-- ========================== Überschriften Rubrik 1 ========================================== -->
              <div class="col-md-3 col-12">
                <b>
                  {{
                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                      .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                      .labelBaueigenschaft
                  }}
                </b>
              </div>
              <div class="col-md-6 col-12">
                <!-- Platzhalter --->
              </div>
              <div class="col-md-3 col-12">
                <b>Nachhaltiges Bauen für Bundesgebäude</b>
              </div>
            </div>
            <!-- ==================== Start 1. Zeile von Feldern in Rubrik 1 ========================= -->
            <div class="row q-pt-xs q-col-gutter-xs full-width">
              <div class="col-md-3 col-12">
                <!-- ============================ Start Feld ================================ -->
                <!-- QSelect-Feld                                                             -->
                <!-- <b>Nutzungsprofil für Neubau (DGNB)</b>                                  -->
                <q-select
                  clearable
                  v-if="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                  "
                  :disable="
                    !benutzerDarfBearbeitenSelectedNode ||
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungWerteVererbenderElternknoten != null ||
                      !profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aktiviertNichtDeaktiviert ||
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[5].disable
                  "
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  dense
                  :options="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].typbezogeneBaueigenschaft
                      .selektierbareOptionenAufzaehlungsWert
                  "
                  :label="
                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                      .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                      .labelBaueigenschaft
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                        .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                        .indexInProfilModelAusgewaehlterKnoten
                    ].aufzaehlungsWert
                  "
                  @focus="
                    setzeFelderFuerFachlicheHilfe(
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[1]
                          .rubrikenInTab[2].baueigenschaftenInRubrik[5]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                </q-select>
                <div v-else>
                  Nicht unterstützter Wertetyp
                </div>
              </div>
              <div class="col-md-6 col-12">
                <!-- Platzhalter -->
              </div>
              <div class="col-md-3 col-12">
                <q-btn
                  dense
                  class="stretch full-width"
                  :href="computeURLBNB"
                  type="a"
                  target="_blank"
                  label="BNB Bewertungsystem"
                  color="light-green-3 text-black"
                  glossy
                  no-caps
                />
              </div>
              <!-- ==================== Ende  1. Zeile von Feldern in Rubrik 2 ========================= -->
            </div>
            <!-- ========================== Ende Tab 1 ===================================== -->
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
          name="anforderungenTabGebaeudeBaueigenschaftsProfilFormular"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!-- Tab 2 "Anforderungen"                                                        -->
          <!-- ------------------------------------------------------------------------------------------ -->
          <div class="flex">
            <!--============ ACHTUNG: Hier q-gutter-xs, sonst Fehlformatierung des Separators! ================= -->
            <div class="q-pa-xs q-gutter-xs full-width"> <!-- ACHTUNG: So unbedingt nötig für Funktion der q-separators! -->
              <div v-if="zuFormularGehoerigesProfil">
                <div class="text-h6" v-if="$q.screen.gt.sm">
                  Anforderungen an das Gebäude
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Anforderungen an das Gebäude
                  an der im Bauvorhabenbaum ausgewählten Baueinheit
                  <strong>"{{ selectedNode.baueinheitsBezeichnung }}"</strong>
                </div>
              </div>
              <!-- ========================== Start Rubrik 0 ================================== -->
              <q-separator />
              <div class="row full-width q-pa-xs bg-blue-grey-2">
                <!-- Rubrik 0 -->
                <!-- <b>Anforderungen des Bauherrn</b> -->
                <b>
                  {{
                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
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
                class="row q-pt-xs q-col-gutter-xs full-width items-end"
              >
                <!-- Überschriften-Zeile -->
                <!-- Überschriften: -->
                <div class="col-md-6 col-12">
                  <!-- <b>Besondere Anforderungen des Bauherrn</b>                                 -->
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    }}
                  </b>
                  <br />
                </div>
              </div>
              <div
                class="row q-pt-xs q-col-gutter-xs full-width"
              >
                <div class="col-md-6 col-12">
                  <!-- ============================ Start Feld ================================ -->
                  <!-- QInput-Feld                                                             -->
                  <!-- <b>Besondere Anforderungen des Bauherrn</b>                              -->
                  <q-input
                    dense
                    autogrow
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp ===
                        'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].bezeichnungWerteVererbenderElternknoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
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
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                    "
                    :delay="1000"
                    :offset="[0, 10]"
                    max-width="500px"
                    content-class="bg-secondary text-white text-caption shadow-4"
                  >
                    {{
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[2]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.baueigenschaftsBemerkung
                    }}
                  </q-tooltip>
                  </q-input>
                  <div v-else>
                    Nicht unterstützter Wertetyp
                  </div>
                </div>
                <div class="col-md-6 col-12 self-center">
                  <b>Hinweis:</b> Entscheidungsrelevante Anforderungen und Vorgaben des Bauherrn des Gebäudes ohne Regelwerksbezug können hier als
                  Freitext eingegeben werden
                </div>
              </div>
              <!-- ========================== Ende Rubrik 0 ================================== -->
            </div>
            <!-- Bisher keine weiteren Rubriken! -->
          </div>
        </q-tab-panel>
        <!-- =============== Ende QTabPanel für "Anforderungen" ========================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          name="musterhaftigkeitTabGebaeudeBaueigenschaftsProfilFormular"
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
                  Angaben zur Musterhaftigkeit des Gebäudes
                  an der im Bauvorhabenbaum ausgewählten Baueinheit <strong>"{{
                    selectedNode.baueinheitsBezeichnung
                  }}"</strong>
                </div>
                <div class="text-subtitle1" v-else>
                  Angaben zur Musterhaftigkeit des Gebäudes
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
                    layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                  <!-- <b>Gültigkeit als Mustergebäude</b> -->
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                  <!-- Erläuterung zur Gültigkeit als Mustergebäude</b> -->
                  <b>
                    {{
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                  <!-- <b>Gültigkeit als Mustergebäude</b>                                  -->
                  <q-select
                    clearable
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Aufzählungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0].disable
                    "
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :options="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft
                        .selektierbareOptionenAufzaehlungsWert
                    "
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[0]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                  <!-- <b>Erläuterung zur Gültigkeit als Mustergebäude</b>                                  -->
                  <q-input
                    v-if="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].typbezogeneBaueigenschaft.werteTyp === 'Bezeichnungswert'
                    "
                    :disable="
                      !benutzerDarfBearbeitenSelectedNode ||
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].baueigenschaftAnWerteVererbendemElternKnoten !=
                          null ||
                        !profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].aktiviertNichtDeaktiviert ||
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1].disable
                    "
                    autogrow
                    bg-color="teal-2"
                    standout="bg-teal-4 text-black"
                    square
                    dense
                    :label="
                      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                        .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                        .labelBaueigenschaft
                    "
                    v-model="
                      profilModelAusgewaehlterKnoten[
                        layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].bezeichnungsWert1
                    "
                    @focus="
                      setzeFelderFuerFachlicheHilfe(
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
                            .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                            .indexInProfilModelAusgewaehlterKnoten
                        ].typbezogeneBaueigenschaft.baueigenschaftsBezeichnung,
                        profilModelAusgewaehlterKnoten[
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
                          layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4]
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
      <!-- Die @-Methoden haben Parameter tabGebaeudeBaueigenschaftsProfilFormular, der ihnen anzeigt,        -->
      <!-- für welches Tab sie gerufen werden                                                                 -->
      <!----------------------------------------------------------------------------------------------------- -->
      <q-separator />
      <div class="row full-width q-pa-sm q-gutter-xs">
        <q-btn
          dense
          :disable="!benutzerDarfBearbeitenSelectedNode"
          class="col-md-3 col-12"
          label="Angaben in allen Tabs für Gebäude speichern"
          @click="
            submitWerteAnBaueinheit(tabGebaeudeBaueigenschaftsProfilFormular)
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
            resetWerteAnBaueinheit(tabGebaeudeBaueigenschaftsProfilFormular)
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
// NEU: Konstante Indexes in den Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, der das Layout für dieses Formular (Tabs/Rubriken/Baueigenschaften) steuert
// Diese konstanten Indexes entsprechen 1:1 den Tabs im Baueigenschaftsprofilformular für das Gebäude
// Siehe layout-baueinheit-gebaeude-baueigenschafts-profil-formular.js
const INDEX_FUER_PROJEKTBEZOGENE_ANGABEN_TAB_LAYOUT_GEBAEUDE = 0;
const INDEX_FUER_PROJEKTBETEILIGTE_TAB_LAYOUT_GEBAEUDE = 1;
const INDEX_FUER_BAUMASSNAHMEN_TAB_LAYOUT_GEBAEUDE = 2;
// DONE: Diese Konstanten im Code unten verwendet - stattdessen wurde ursprünglich vorher dynamisch die Variable indexTabLayoutGebaeude verwendet. Diese
//       wurde (und wird noch) bei Tab-Wechsel gesetzt in initialisiereAusgewaehltesTabGebaeude().
//       Würde sich die Zuordnung der Tabs zu den Objekten im Array ändern, müsste aber dieser Code auch geändert werden, daher hat man eigentlich keinen Vorteil davon,
//       dass dieser Index eine Variable ist. Stattdessen sollten also in den disable- und reset-Methoden für einzelne Tabs (z.B. "Geopolitische Angaben") diese
//       Konstanten verwendet werden statt indexTabLayoutGebaeude, was anfällig für Fehler ist, wenn es falsch gesetzt ist - dann wird ggf. das falsche Tab disabled odder resetted!!!
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
import BauwerksZuordnungenHierarchisch from "../modules/bauwerks-zuordnungen-hierarchisch.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-gebaeude-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// import Vue from "vue/dist/vue.js"; // NEU: Für Geocoder
// import Geocoder from "@pderas/vue2-geocoder"; // NEU: Für Geocoding (Bestimmung von geografischen Koordinaten aus Adresse über Google Maps API)
// import * as VueGoogleMaps from "vue2-google-maps";
// NEU: Für Package vue2-google-maps,https://github.com/xkjyeah/vue-google-maps/blob/vue2/README.md - zurückgestellt
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Für Dezimalzahlen mit VueAutoNumeric (statt VMoney), https://www.npmjs.com/package/vue-autonumeric
// VUE3 import VueAutonumeric from "vue-autonumeric"; // Erfordert unten Eintrag in components: { ..., VueAutoNumeric }
//================================================================================================================================================
export default {
  // name: 'ComponentName',
  components: {
    // VUE3 VueAutonumeric // NEU - für VueAutoNumeric
  },
  props: [
    "profilBezeichnung", // Bezeichnung des anzuzeigenden Baueigenschaftsprofils, sollte für dieses Formular "Baueinheit > Gebäude" sein
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
      // INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_LAGE_ANGABEN_TAB_LAYOUT_STANDORT,
      // INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT: INDEX_FUER_GEOPOLITISCHE_ANGABEN_TAB_LAYOUT_STANDORT,
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
      bauwerksZuordnungenHierarchisch: BauwerksZuordnungenHierarchisch, // Nested Array of Options für QSelect für Bauwerkszuordnungen nach BWZ-Schema
      displayLeftArrow: "\u2190", // Konstante für Linkspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      tabGebaeudeBaueigenschaftsProfilFormular:
        "geometrieTabGebaeudeBaueigenschaftsProfilFormular", // TODO - vorläufig
      indexFuerTabLayoutGebaeude: 0, // TODO - vorläufiger Index im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, der auf die Daten für ein Tab zeigt
      localStore: globalStore,
      mountedDone: false,
      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular: LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, // Array für die Speicherung von Layout-Information für
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
    //---------------------------------------------------------------------------------------------------------------------
    initializeNiveauIstwerteMitSollwerten: function() {
      // NEU: Initialisierungsfunktion für Niveauwerte
      // Hier am Gebäude nur für OKFFB EG (Istwert) mit Höhenlage (Sollwert)
      // Aufruf aus mounted, reset, refresh
      // Nur wenn die Istwerte am Raum null sind, werden sie mit ihren paarigen Sollwerten aus dem Geschoss initialisiert
      console.log("In initializeNiveauIstwerteMitSollwerten()");
      // OKFFB EG:
      if (
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3].rubrikenInTab[0]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].kennWert2 == null // NHN-Istwert OKFFB EG, Kennwertepaar
      ) {
        console.log("Null-Istwert entdeckt, vor $set mit Sollwert)");
        /*
          console.log(
            "Zuzuweisender Wert: ",
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3].rubrikenInTab[0]
                .baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ].kennWert1 // ACHTUNG: Höhenlage ist nur Kennwert, kein Kennwertepaar!
          );
          */
        this.$set(
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3].rubrikenInTab[0]
              .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
          ],
          "kennWert2", // NHN-Istwert OKFFB EG, Kennwertepaar
          this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3].rubrikenInTab[0]
              .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
          ].kennWert1 // ACHTUNG: NHN-Sollwert "Höhenlage" ist nur Kennwert, kein Kennwertepaar!
        ); // 0,0-Sollwert
      }
    },

    //---------------------------------------------------------------------------------------------------------------------
    // Niveauänderung:
    changeNiveau(niveauString, incrementOrDecrementNumber) {
      // niveaString: "OKFD", "OKRD", "UKRD", "UKFD" (Deckenniveaus) oder "OKFFB", "OKRFB", "UKRFB", "UKFFB" (Bodenniveaus)
      // incrementOrDecrementNumber: JS Number - z.B. 0.01 oder -0.01 (numerisch!)
      console.log("In changeNiveau()");
      let nhnNiveau;
      switch (niveauString) {
        case "OKFFBEG":
          nhnNiveau = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3].rubrikenInTab[0]
              .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
          ].kennWert2;
          break;
        default:
          console.log(
            "XXXXXX - ACHTUNG: Fehler in changeNiveau() - ungültiger niveauString: ",
            niveauString
          );
          return;
      }
      console.log("nhnNiveau: ", nhnNiveau);
      // console.log("typeof(nhnNiveau): ", typeof(this.nhnNiveau))
      // console.log("nhnNiveau: ", this.nhnNiveau)
      // let number = Number(this.nhnNiveau)
      // Problem: Funktioniert nur mit "." als Dezimaltrennzeichen!
      // Mit "," kommt "NaN" von Number() zurück
      // Daher manuelle Konvertierung mit Helper-Funktion von String nach Number notwendig!
      //-----------------------------------------------------------------------------------------------
      // ALT (VMoney) - Umwandlung von Number nach Decimal nötig:
      // let number = this.decimalHandling.convertDecimalStringToNumber(
      //  nhnNiveau
      // ); // ACHTUNG: Hier nicht this.nhnNiveau wie bei Tests, sondern obige lokale Variable
      //-------------------------------------------------------------------------------------------------------
      // NEU (VueAutoNumeric) - Alles Numbers oder null, null wird aber wohl hier bei Arithmetik wie 0 behandelt:
      // TODO XXXXXX - Null Handling in dieser Funktion ist zu überprüfen!!!
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      //========================================================================================================
      let number = nhnNiveau;
      console.log("typeof(number): ", typeof number);
      number = number + incrementOrDecrementNumber; // Z.B. 0.01 oder -0.01 (Number)
      number = Math.round(number * 100) / 100;
      // Daher obige Korrektur: https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      //---------------------------------------------------------------------------------------------------------
      // ALT (VMoney) - Rückumwandlung von Number nach Decimal nötig:
      // ACHTUNG: Es musste eine manuelle Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt werden:
      // nhnNiveau = this.decimalHandling.convertNumberToDecimalString(
      //  number,
      //  2,
      //  ",",
      //  "."
      //); // ACHTUNG: Hier nicht this.nhnNiveau wie bei Tests, sondern obige lokale Variable
      //---------------------------------------------------------------------------------------------------------
      nhnNiveau = number; // NEU
      // Hier Fehler - diese Zuweisungen müssen nicht direkt, sondern reaktiv mit Vue $set erfolgen!!!
      switch (niveauString) {
        case "OKFFBEG":
          this.$set(
            this.profilModelAusgewaehlterKnoten[
              this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[3]
                .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                .indexInProfilModelAusgewaehlterKnoten
            ],
            "kennWert2",
            nhnNiveau
          );
          break;
        default:
          console.log(
            "XXXXXX - ACHTUNG: Fehler in changeNiveau() - ungültiger niveauString: ",
            niveauString
          );
          break;
      }
      console.log("nhnNiveau aus changeNiveau(): ", nhnNiveau); // ACHTUNG: Hier nicht this.nhnNiveau wie bei Tests, sondern obige lokale Variable
    },

    //======================================================================================================================================
    // NEU: Methoden für nested QSelect für BWZ-Schema:
    hasChild(scope) {
      return scope.opt.children.some(c => c.label === this.model);
    },

    // NEU: Return Expansion Icon nur bei Vorhandensein von Kindern:
    arrowDownIconOnlyIfChildren(object) {
      if (object.hasOwnProperty("children")) {
        return "keyboard_arrow_down";
      } else {
        return "null";
      }
    },

    //=============================================================================================================================
    // Die folgende Methode wurde anfangs für Testzwecke verwendet, disabled:
    /*
    returnOptionGroupBauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular(
      // DISABLED: Nur für Testzwecke verwendet!
      // Methode zur Ermittlung der Options (Return-Wert der Methode) an q-option-group im Template für das Tab "Bauordnungsrechtliche Angaben",
      // in Abhängigkeit von der baueigenschaftsBezeichnung (Parameter)
      // ACHTUNG: Die :options müssen mit dieser Methode ermittelt werden, im Format [ {label: "abc", value: "xyz", color: "uvw"}, ..., { ... } ]
      // (Array of Objects)
      // Dazu sind weiter oben Konstanten definiert für jede betroffen Baueigenschaft
      // Statt der Konstanten könnte alternativ auch mit zusätzlichem Code dieser Array of Objects generiert werden, per Zugriff auf
      // this.profilModelAusgewaehlterKnoten[
      //      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[x].rubrikenInTab[y].baueigenschaftenInRubrik[z]
      //        .indexInProfilModelAusgewaehlterKnoten
      //    ].typbezogeneBaueigenschaft
      //      .selektierbareOptionenAufzaehlungswert
      // ACHTUNG: Diese Methode kann keine computed-Funktion sein, da sie einen Parameter hat!
      baueigenschaftsBezeichnung // Parameter: String
    ) {
      console.log(
        "In returnOptionGroupBauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular() - Parameter baueigenschaftsBezeichnung: ",
        baueigenschaftsBezeichnung
      );
      switch (baueigenschaftsBezeichnung) {
        case "Baueinheit > Standort > Infrastruktur > Trinkwasser > Versorger":
          return this.optionGroupStandortTrinkwasserVersorger;
        case "Baueinheit > Standort > Infrastruktur > Trinkwasser > Herkunft":
          return this.optionGroupStandortTrinkwasserHerkunft;
        default:
          console.log(
            "Fehler: Aufruf returnOptionGroupBauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular() mit falscher baueigenschaftsBezeichnung"
          );
          return null;
      }
    },
    */

    initialisiereAusgewaehltesTabGebaeude() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Unter-Tabs im Baueigenschaftsprofilformular für den Standort
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log("In initialisiereAusgewaehltesTabGebaeude()");
      switch (this.tabGebaeudeBaueigenschaftsProfilFormular) {
        case "bauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGebaeude = 0;
          break;
        case "nutzungTabGebaeudeBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGebaeude = 1;
          break;
        case "anforderungenTabGebaeudeBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGebaeude = 2;
          break;
        default:
          break;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Da Index geändert wurde, muss auch das Enabling/Disabling hier neu berechnet werden, sonst werden bei Tab-Wechsel
      //          die falschen Felder enalbed/disabled (z.B. die eines anderen Knotens im Baum, für den vorher das Enabling/Disabling berechnet wurde,
      //          und dann der Knoten und anschließend das Tab neu ausgewählt werden.
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
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

      switch (this.tabGebaeudeBaueigenschaftsProfilFormular) {
        case "bauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular":
          //
          break;
        case "nutzungTabGebaeudeBaueigenschaftsProfilFormular":
          //
          break;
        case "anforderungenTabGebaeudeBaueigenschaftsProfilFormular":
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
      eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
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
        "Parameter eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten
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
      // Aufruf in Abhängigkeit von tabGebaeudeBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "Vor spezifischem Reset/Enabling/Disabling für das ausgewählte Tab: ",
        this.tabGebaeudeBaueigenschaftsProfilFormular
      );
      console.log(
        "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
        eigenschaftInLayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
      );
      console.log(
        "ACHTUNG: Bisher nicht implementiert für Profilformular 'Gebäude'"
      );

      // Falls Resetting und Enabling/Disabling gebraucht wird: Codevorlage ist in
      // selber Funktion in baueinheit-standort-baueigenschafts-profil-formular.vue
      // Noop:
      switch (this.tabGebaeudeBaueigenschaftsProfilFormular) {
        case "bauordnungsrechtlicheAngabenTabGebaeudeBaueigenschaftsProfilFormular":
          //
          break;
        case "nutzungTabGebaeudeBaueigenschaftsProfilFormular":
          //
          break;
        case "anforderungenTabGebaeudeBaueigenschaftsProfilFormular":
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
      // Vorlage-Code für Extrakt genau der Eigenschaften (aus der größeren Gesamtmenge in profilModelAusgewaehlterKnoten), die durch die im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
      // enthaltenen Rubriken FUER DAS AKTUELL AUSGEWÄHLTE TAB bestimmt sind (diese Untermenge von Eigenschaften wird als Input-Felder in dem betreffenden Tab angezeigt).
      // indexFuerTabLayoutGebaeude zeigt dabei immmer auf das Element (= Objekt mit enthaltenem Array der Eigenschaften im jeweiligen Tab im Unterobjekt rubrikenInTab) des Arrays
      // layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular mit den Eigenschaften für das jeweilige Unter-Tab des Profilformulars für "Baueinheit > Gebäude".
      // Der Code hier wandert dann durch die Rubriken in diesem Element des Arrays, macht aktuell aber nur ein console.log der betreffenden Eigenschaften
      // Code disabled, da aktuell nicht gebraucht:
      /*
      for (let rubrik of this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[
        this.indexFuerTabLayoutGebaeude
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
        // Es folgt Code für Konvertierung von Aufzählungswerten von Array nach String für Radio Buttons:
        //------------------------------------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular und führe ggf. die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) {
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
      tab // Parameter: aktuelles Tab in Formular für Gebäude - wird noch nicht verwendet!
    ) {
      // ALT: Hieß handleReset()
      // Resetted die eventuell im Form geänderten Werte im Profil auf die ursprünglichen Werte aus dem selektierten Node (Prop)
      // NEU: Auch hier Disabling/Enabling notwendig, weil die steuernden Werte dafür im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
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
          // Finde Baueigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          for (let tab of this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) {
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
      //==============================================================================================================================================
      // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaar (Höhenlage/OKFFB EG):
      // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
      // Es handelt sich bei der Höhenlage um einen Kennwert, beim OKFFB EG um ein Kennwertepaar (NHN-Wert wird genommen)
      // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
      //==============================================================================================================================================
      this.initializeNiveauIstwerteMitSollwerten();
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
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
          this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[0].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1,
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[1].indexInProfilModelAusgewaehlterKnoten
        ].kennWert1
      );
      console.log("maximum: ", maximum);
      // Es folgt der Update des v-models der Baueigenschaft für das Maximum aus HGW und HHW
      // Deren "Koordinaten" sind definiert in layout-baueinheit-standort-baueigenschafts-profil-formular.js
      // ACHTUNG: Bei direktem Update ohne Vue $set kommt Fehler: Unerlaubter Side Effect!!!
      // Daher per Vue $set:
      this.$set(
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular[4].rubrikenInTab[1]
            .baueigenschaftenInRubrik[2].indexInProfilModelAusgewaehlterKnoten
        ],
        "kennWert1",
        maximum
      );
      return maximum;
    },

    // Computed-Funktion für URL:
    computeURLDGNB: function() {
      let urlDGNB = "https://www.dgnb-system.de/de/";
      return urlDGNB;
    },

    // Computed-Funktion für URL:
    computeURLBNB: function() {
      let urlBNB = "https://www.bnb-nachhaltigesbauen.de/";
      return urlBNB;
    },

    // Computed-Funktion für URL:
    computeURLHOAI: function() {
      let urlHOAI = "https://www.gesetze-im-internet.de/hoai_2013/";
      return urlHOAI;
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
    // Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) nicht mehr benötigt, daher auskommentiert:
    /*
    findeIndexVonBaueigenschaftSchichttypImBodenaufbau() {
      // HINWEIS: Diese computed-Funktion wurde zuerst noch aufgerufen weiter unten, daher erst später disabled,
      //          wie die übrigen solchen computed-Funktionen. Dafür musste in der @input-Methode
      //          als weiterer Parameter die Eigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular mitgegeben werden, wo
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
          "In watch von baueinheit-gebaeude-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
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
          "In watch von baueinheit-gebaeude-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNode erkannt"
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
              // Finde Baueigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) {
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
          //==============================================================================================================================================
          // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaar (Höhenlage/OKFFB EG):
          // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
          // Es handelt sich bei der Höhenlage um einen Kennwert, beim OKFFB EG um ein Kennwertepaar (NHN-Wert wird genommen)
          // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
          //==============================================================================================================================================
          this.initializeNiveauIstwerteMitSollwerten();
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted () und Reset-Methode
        }
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von baueinheit-gebaeude-baueigenschafts-profil-formular.vue"
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
          // NEU: Initialisiere den Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
          // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

          // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
          // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:
          for (let tab of this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) {
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
                    "In for in Reihenfolge der Baueigenschaften in layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
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
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular
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
            // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden!
            // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format
            //       zurückverwandelt werden, denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
            //       Vorlage: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
            //       this.ausgewaehlteBaueigenschaft.datumsWert1 = date.formatDate(
            //          this.ausgewaehlteBaueigenschaft.datumsWert1, // Erfordert normalerweise Date Objekt als 1. Parameter, nicht String!
            //          "YYYY-MM-DD") // Ausnahme: Akzeptiert auch String im Format YYYY-MM-DD
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
              // Finde Baueigenschaft im Array layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular) {
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
        //==============================================================================================================================================
        // NEU: Speziell für dieses Profilformular mit Soll-/Istwertepaar (Höhenlage/OKFFB EG):
        // Istwerte mit Sollwerten initialisieren per Hilfsfunktion.
        // Es handelt sich bei der Höhenlage um einen Kennwert, beim OKFFB EG um ein Kennwertepaar (NHN-Wert wird genommen)
        // Selber Aufruf ist nötig in mounted(), reset() und watch() (= Refresh)!
        //==============================================================================================================================================
        this.initializeNiveauIstwerteMitSollwerten();
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
