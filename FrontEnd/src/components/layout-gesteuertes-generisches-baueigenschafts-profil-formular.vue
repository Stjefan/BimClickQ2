<template>
  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <!-- Vue-Komponente für layoutgesteuertes generisches Baueigenschaftsprofilformular                                                -->
  <!-- Siehe internes BIM.click Design, Abschnitt 38.o                                                                               -->
  <!-- Zeigt auf Desktops ein mehrspaltiges, auf Mobilgeräten ein 1-spaltiges Layout zum Anzeigen und Editieren der Eingabefelder    -->
  <!-- für Baueigenschaften in einem Baueigenschaftsprofil an, gesteuert durch ein für das Profil angelegtes Layout File.            -->
  <!-- Besonderheit: Das Layout wird automatisch erzeugt ausschließlich aus dem Layout File und dem Profil, ohne Notwendigkeit für   -->
  <!-- profilspezifische Eingriffe im Template-Teil dieser Komponente.                                                               -->
  <!-- HINWEIS: Dieses Baueigenschaftsprofilformular kann, abhängig vom Layout File, mehrere Unter-Tabs mit Unter-Rubriken anzeigen  -->
  <!-- Properties: Siehe unten "props"                                                                                               -->
  <!-- ============================================================================================================================= -->
  <!-- NEU: Readonly-Fähigkeit, gesteuert über zusätzliche Prop readonlyAusZugeordneteBaustoffeBaueinheit                            -->
  <!-- Dann wird in in mounted(), watch() (2-mal), reset() der komplette Baustoff gelesen mit allen seinen Eigenschaften             -->
  <!-- Der Bau der Vererbungsdatenstruktur wird danach geskippt, da sowieso alle Felder readonly sind                                -->
  <!-- TODO XXXXXX: Anleitung für Werteeingabe abschalten bei readonly, wird aber statisch per Layoyut generiert, müsste deshalb     -->
  <!--              ähnlich wie orangefarbiges Flag per Push in das Profil Model in mounted(), watch() (2-mal), reset() realisiert   -->
  <!--              werden? Template-Logik müsste es von dort auslesen. Ist einstweilen per Hack gelöst, durch v-if-Abfrage          -->
  <!--              im Template an hinweiseRubrik                                                                                    -->
  <!-- TODO XXXXXX: Ererbte Werte werden dann nicht cyanfarbig angezeigt, hat aber keine hohe Priorität                              -->
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
    <div v-if="profilBezeichnung === '' || profilBezeichnung === null">
      TODO: Aufruf mit falscher profilBezeichnung!
    </div>
    <div v-else>
      <!-- =================================================================================================== -->
      <!-- ACHTUNG: class="q-pa-xs" oder "q-pa-none" kontrolliert Breite der Tableiste!                        -->
      <!-- =================================================================================================== -->
      <q-tabs
        mobile-arrows
        class="q-pa-none text-black bg-grey-4 full-width"
        active-color="primary"
        active-bg-color="white"
        content-class="text-h7"
        dense
        align="left"
        v-model="tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular"
        @input="
          initialisiereAusgewaehltesTabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
        "
      >
        <q-tab
          v-for="tab in layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular"
          :key="tab.ueberschriftTab"
          :name="tab.ueberschriftTab"
          :label="tab.labelTab"
          no-caps
        >
          <!-- ---------------------------------------------------- -->
          <!-- NEU: Tooltip an Tab, aus Prop bemerkungTab im Layout -->
          <!-- ALT: :offset="[0, 10]" -->
          <!-- NEU: anchor="bottom right"  -->
          <q-tooltip
            v-if="tab.bemerkungTab"
            :delay="1000"
            anchor="bottom right"
            max-width="500px"
            content-class="bg-secondary text-white text-caption shadow-4"
          >
            {{ tab.bemerkungTab }}
          </q-tooltip>
        </q-tab>
      </q-tabs>
      <!-- <q-separator /> -->
      <!-- ----------------------------------------------------------------------------------------------------------------------------------- -->
      <q-tab-panels
        v-model="tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular"
        animated
      >
        <!-- ============================================================================================== -->
        <!-- ACHTUNG: class="q-pa-xs" an allen q-tab-panels zur Reduzierung des vertikalen Platzverbrauchs! -->
        <!-- ============================================================================================== -->
        <q-tab-panel
          v-for="tab in layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular"
          :key="tab.ueberschriftTab"
          :name="tab.ueberschriftTab"
          class="q-pa-xs"
        >
          <!--=========================================================================================== -->
          <!--                                                                                            -->
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
              <div v-if="baum === 'Baustoffbaum'">
                <div v-if="$q.screen.gt.sm" class="text-h6">
                  <!-- Auf Desktop Screens -->
                  {{ tab.ueberschriftTab }}
                  an dem im Baustoffbaum ausgewählten Baustoff
                  <strong>"{{ selectedNode.baustoffBezeichnung }}"</strong>
                </div>
                <div v-else class="text-subtitle1">
                  <!-- Auf kleineren Screens -->
                  {{ tab.ueberschriftTab }}
                  an dem im Baustoffbaum ausgewählten Baustoff
                  <strong>"{{ selectedNode.baustoffBezeichnung }}"</strong>
                </div>
              </div>
            </div>
            <!-- ------------------------------------------------------------------------------------------ -->
            <!-- NEU: Mehrere Spalten pro Tab                                                               -->
            <!-- Wird bestimmt durch optionale Property spaltenProTab am Tab (1, 2, 3 - Default: 1)         -->
            <!-- ------------------------------------------------------------------------------------------ -->
            <div class="row full-width">
              <!-- ACHTUNG: Am folgenden <div> ist unbedingt class="self-start" nötig, sonst werden die Expansion Items vertical centered!!! -->
              <!-- Siehe https://quasar.dev/layout/grid/introduction-to-flexbox#self-alignment -->
              <div
                :class="
                  'self-start row q-pa-xs q-gutter-xs col-12' +
                    ' ' +
                    determineColStringSpaltenProTab(tab)
                "
                v-for="rubrik in tab.rubrikenInTab"
                :key="rubrik.ueberschriftRubrik"
              >
                <q-separator v-if="!rubrik.hideRubrik" />
                <!-- QExpansionItem für Rubrik: -->
                <q-expansion-item
                  v-if="!rubrik.hideRubrik"
                  default-opened
                  dense
                  switch-toggle-side
                  class="stretch full-width"
                  :header-class="
                    rubrik.farbeRubrik
                      ? 'text-bold' + ' ' + rubrik.farbeRubrik
                      : 'text-bold bg-blue-grey-2'
                  "
                  :label="rubrik.ueberschriftRubrik"
                >
                  <!-- ---------------------------------------------------------------------------------------------------------------- -->
                  <!-- NEU: Tooltip an Rubrik, aus Prop bemerkungRubrik im Layout                                                       -->
                  <!-- ACHTUNG: Wird ohne Header Slot am QExpansionItem nicht auf dem Header der Rubrik angezeigt, sondern nur im Body! -->
                  <!-- Erfordert Header Slot am QExpansion Item, worauf sich dann der QTooltip bezieht                                  -->
                  <!-- Siehe auch https://v1.quasar.dev/vue-components/tooltip#example--using-target                                    -->
                  <!-- ---------------------------------------------------------------------------------------------------------------- -->
                  <!-- ALT: :offset="[0, -5]" -->
                  <!-- NEU: anchor="bottom middle"  -->
                  <template v-slot:header>
                    <div class="self-center">
                      {{ rubrik.ueberschriftRubrik }}
                    </div>
                    <q-tooltip
                      v-if="rubrik.bemerkungRubrik"
                      :delay="1000"
                      anchor="bottom middle"
                      max-width="500px"
                      content-class="bg-secondary text-white text-caption shadow-4"
                    >
                      {{ rubrik.bemerkungRubrik }}
                    </q-tooltip>
                  </template>
                  <template v-slot:default>
                    <!-- ---------------------------------------------------------------------------------------------------------- -->
                    <!-- NEU: Optionale Überschriftenzeile am Anfang einer Rubrik                                                   -->
                    <!--      aus optionaler Array-Property rubrik.spaltenUeberschriftenRubrik im L<yout für Rubrik                 -->
                    <!-- ---------------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Solche Spaltenüberschriften sind nicht responsive, wenn auf mobilen Devices die Felder einspaltig gerendert werden (per col-12) -->
                    <!-- TODO XXXXX: Auf mobilen Devices könnten sie eventuell per <div v-if="$q.screen.gt.sm"> auch ganz unterdrückt werden! -->
                    <div
                      v-if="rubrik.spaltenUeberschriftenRubrik"
                      class="row full-width q-pa-xs q-col-gutter-xs"
                    >
                      <!-- ---------------------------------------------------------------------------------------------------------------------------- -->
                      <!-- Vorlage für folgendes v-for "x times": https://stackoverflow.com/questions/44617484/vue-js-loop-via-v-for-x-times-in-a-range -->
                      <!-- ACHTUNG: Der Index hier startet bei 1, nicht 0, und ist somit eigentlich ein Counter!!! -->
                      <!-- ---------------------------------------------------------------------------------------------------------------------------- -->
                      <div
                        v-for="index in determineAnzahlSpaltenRubrik(rubrik)"
                        :key="index"
                        :class="
                          determineColStringSpaltenProRubrik(rubrik, index) +
                            ' ' +
                            'col-12 q-pa-xs row'
                        "
                      >
                        <!-- NEU: Mit v-html per <div v-html=""../> - ACHTUNG mit <pre v-html=".."/> wird der Font auf monospaced geändert! -->
                        <div
                          v-html="rubrik.spaltenUeberschriftenRubrik[index - 1]"
                        />
                        <!-- ALT: Ohne v-html: -->
                        <!--
                   {{ rubrik.spaltenUeberschriftenRubrik[index -1] }}
                   -->
                      </div>
                    </div>
                    <!-- ------------------------------------------------------------------------------------------------- -->
                    <!-- In durch rubrik.spaltenRubrik pro Zeile angeordnete Eingabefelder für die Felder in Rubrik: -->
                    <!-- Vorlage: https://codepen.io/mickey58/pen/eYGMPxa                                                  -->
                    <!-- Das äußere v-for läuft über die Anzahl der Rows, die gebraucht werden, um die Baueigenschaften zu -->
                    <!-- rendern. Diese sind in einem Array mit Zeilennummern, den baueigenschaftenRows(rubrik) liefert.   -->
                    <!-- ------------------------------------------------------------------------------------------------- -->
                    <!-- ACHTUNG: Der v-for Index hier startet bei 1, nicht 0, und ist somit eigentlich ein Counter!!!     -->
                    <div
                      class="row full-width q-pa-xs q-col-gutter-xs"
                      v-for="(row, index1) in baueigenschaftenRows(rubrik)"
                      :key="index1"
                    >
                      <!-- ------------------------------------------------------------------------------------------------------- -->
                      <!-- ACHTUNG: Das nächste, innere v-for läuft (für jeweils eine Zeile beim Rendern) über die passend         -->
                      <!-- aus dem Gesamt-Array der Baueigenschaften in der Rubrik "herausgesliceten"                              -->
                      <!-- Baueigenschaften in der Rubrik.                                                                         -->
                      <!-- ACHTUNG: Es benötigt einen eigenen index2, der der Spalte entspricht - dieser                           -->
                      <!-- muss übergeben werden an determineColStringSpaltenProRubrik(), allerdings mit index2 + 1, da er per     -->
                      <!-- Log als Array-Index offenbar bei 0, nicht 1 wie der obige v-for-Index startet!!!                        -->
                      <!-- ------------------------------------------------------------------------------------------------------- -->
                      <div
                        v-for="(baueigenschaft,
                        index2) in rubrik.baueigenschaftenInRubrik.slice(
                          index1 * determineAnzahlSpaltenRubrik(rubrik),
                          (index1 + 1) * determineAnzahlSpaltenRubrik(rubrik)
                        )"
                        :key="baueigenschaft.baueigenschaftsBezeichnung"
                        :class="
                          determineColStringSpaltenProRubrik(
                            rubrik,
                            index2 + 1
                          ) +
                            ' ' +
                            'col-12 q-pa-xs q-col-gutter-xs'
                        "
                      >
                        <!-- ============================================================================================================================================================== -->
                        <!-- NEU: Füllfeld, siehe Epic 38.o unten - span mit vHTML-Formatierung, alternativ könnte man auch ein einfaches Moustache verwenden -->
                        <!-- ============================================================================================================================================================== -->
                        <div v-if="baueigenschaft.specialField === 'Filler'">
                          <span v-html="baueigenschaft.fillText"> </span>
                        </div>
                        <!-- ============================================================================================================================================================== -->
                        <!-- NEU: Link-Feld, siehe Epic 38.o unten -->
                        <!-- ============================================================================================================================================================== -->
                        <div v-else-if="baueigenschaft.specialField === 'Link'">
                          <q-btn
                            dense
                            class="stretch full-width"
                            style="height: 100%"
                            :href="baueigenschaft.linkButton"
                            type="a"
                            target="_blank"
                            :label="baueigenschaft.labelButton"
                            :color="baueigenschaft.colorButton"
                            :icon-right="baueigenschaft.iconRightButton"
                            glossy
                            no-caps
                            :disable="false"
                          />
                        </div>
                        <!-- ======================================================================================================================= -->
                        <!-- NEU: Button-Feld, siehe Epic 38.o unten - Ruft bei @click generalisierte Methode generalClickMethod(baueigenschaft) auf -->
                        <!-- Diese kann dann die weiteren Props der baueigenschaft (im Layout) abfragen, und das Richtige tun, z.B. Felder resetten  -->
                        <!-- Die primäre Prop, die das steuert, ist clickAction, die verschiedene Werte annehmen kann z.B. "Reset" oder "Calculate". -->
                        <!-- Alternativ könnte man auch, abhängig von clickAction oder optionalen weiteren Props an der baueigenschaft im Layout     -->
                        <!-- eine spezialisierte Funktion aus functions-xyz-baueigenschafts-profil-formular.js aufrufen, die dann allerdings geladen -->
                        <!-- werden müsste, in mounted(), spezifisch für das übergebene/angezeigte Baueigenschaftsprofil!                            -->
                        <!-- ======================================================================================================================= -->
                        <div
                          v-else-if="baueigenschaft.specialField === 'Button'"
                        >
                          <q-btn
                            dense
                            class="stretch full-width"
                            style="height: 100%"
                            :label="baueigenschaft.labelButton"
                            :color="baueigenschaft.colorButton"
                            :icon-right="baueigenschaft.iconRightButton"
                            glossy
                            no-caps
                            :disable="false"
                            @click="generalClickMethod(baueigenschaft)"
                          />
                        </div>
                        <!-- ===================================================================================================================================================== -->
                        <!-- NEU: Vergleichsfeld, siehe Epic 38.o unten - Zeigt Icon an, das den Vergleich der Werte zweier Baueigenschaften (links und rechts davon) visualisiert -->
                        <!-- -->
                        <!-- ===================================================================================================================================================== -->
                        <div
                          v-else-if="
                            baueigenschaft.specialField === 'Comparison'
                          "
                          class="text-center"
                        >
                          <q-icon
                            :name="
                              generalComparisonFunction(
                                baueigenschaft.linkeBaueigenschaft,
                                baueigenschaft.rechteBaueigenschaft,
                                'icon'
                              )
                            "
                            color="grey-6"
                            size="lg"
                            :class="
                              generalComparisonFunction(
                                baueigenschaft.linkeBaueigenschaft,
                                baueigenschaft.rechteBaueigenschaft,
                                'flip'
                              )
                            "
                          />
                        </div>
                        <!-- ============================================================================================================================================================== -->
                        <!-- Es folgen die diversen Arten von Eingabefeldern, je nach Wertetyp der anzuzeigenden Baueigenschaft ("Aufzählungswert" => QSelect, "Kennwert" => QInput, usw.): -->
                        <!-- ============================================================================================================================================================== -->
                        <!-- ============================================================================================================================================================== -->
                        <!-- NEU: Alternativ zum q-select q-option-group für Aufzählungswerte -->
                        <!-- Wird gesteuert über neue Prop "optionGroup: true im Layout. -->
                        <!-- Optional zusätzlich "options: [ {label: "abc", value: "xyz", color: "uvw"}, ..., { ... } ]". -->
                        <!-- Die Differenzierung zwischen type="checkbox" und type="radio" erfolgt über die Prop "radio: true" oder "radio: false". -->
                        <!-- -->
                        <!-- ACHTUNG: @focus-Event für das Setzen der Felder für die fachliche Hilfe funktioniert bei q-option-group (wie auch bei -->
                        <!--          q-toggle NICHT. Stattdessen muss das @input-Event dafür benutzt werden. -->
                        <!-- ACHTUNG: Ursprünglich Probleme mit v-model: -->
                        <!--          Mit .aufzaehlungsWert[0]: Funktionierte nicht, wenn das Feld initial null ist! -->
                        <!--          Mit .aufzaehlungsWert: Funktionierte nicht beim Speichern -->
                        <!-- Ursache: type="radio" erwartet String als v-model, keinen Array!!!  -->
                        <!-- Lösung: In Mounted, Reset und in Watch (= Refresh) die betroffenen Aufzählungswerte für type="radio" von Array nach String konvertiert -->
                        <!--         Beim Speichern zurückkonvertiert nach String -->
                        <!-- ACHTUNG: :readonly funktioniert an q-option-group nicht, musste durch :disable ersetzt werden! -->
                        <div
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Aufzählungswert' && baueigenschaft.optionGroup
                          "
                        >
                          <b>
                          {{
                            baueigenschaft.labelBaueigenschaft
                                ? baueigenschaft.labelBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                          }}
                          </b>
                          <q-option-group
                            :hint="
                              baueigenschaft.hintBaueigenschaft
                                ? baueigenschaft.hintBaueigenschaft
                                : null
                            "
                            :type="baueigenschaft.radio ? 'radio' : 'checkbox'"
                            :disable="determineReadonly(baueigenschaft)"
                            @input="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].aufzaehlungsWert
                            "
                            :options="baueigenschaft.options"
                            :label="
                              baueigenschaft.labelBaueigenschaft
                                ? baueigenschaft.labelBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            dense
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                          >
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Aufzählungswert' &&
                                  baueigenschaft.optionGroup
                              "
                              :delay="1000"
                              :offset="[0, 28]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft
                                  ? baueigenschaft.toolTipBaueigenschaft
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
                              }}
                            </q-tooltip>
                          </q-option-group>
                        </div>
                        <!-- -------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                        <!-- Es folgt ein QSelect als reguläres Eingabefeld für Aufzählungswerte (alternativ ist obige QOptionGroup per Prop optionGroup möglich)                           -->
                        <!-- NEU: Optionale Property multiple (Boolean) im Layout für multiple Selection - steuert :multiple am QSelect!                                                    -->
                        <!-- ============================================================================================================================================================== -->
                        <!-- ================================================================================== -->
                        <!-- ACHTUNG: Nach Einführung des obigen specialFields hier "v-else-if" statt "v-if"!!! -->
                        <!-- ================================================================================== -->
                        <q-select
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Aufzählungswert'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :multiple="
                            baueigenschaft.multiple
                              ? baueigenschaft.multiple
                              : false
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          @focus="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.bauinformation
                              ? setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .bauinformationsAnzeigeText,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .internerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .idInternerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .externerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .oneDriveLink
                                )
                              : setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  null,
                                  null,
                                  null,
                                  null,
                                  null
                                )
                          "
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].aufzaehlungsWert
                          "
                          :options="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft
                              .selektierbareOptionenAufzaehlungsWert
                          "
                          :label="
                            baueigenschaft.labelBaueigenschaft
                              ? baueigenschaft.labelBaueigenschaft
                              : profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft
                                  .baueigenschaftsAnzeigeText
                          "
                          single
                          clearable
                          dense
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                        >
                          <q-tooltip
                            v-if="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Aufzählungswert'
                            "
                            :delay="1000"
                            :offset="[0, 28]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4"
                          >
                            {{
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
                            }}
                          </q-tooltip>
                        </q-select>
                        <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                        <!-- Es folgen Felder für weitere nicht paarige Wertetypen:                                                                           -->
                        <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                        <!-- NEU: readonly-Felder sollten nicht type="number" haben, sonst erzeugt der Browser beim Mouseover eine missverständliche Meldung, -->
                        <!--      dass der Benutzer einen gültigen Wert eingeben soll - diese überlagert den Quasar-Tooltip                                   -->
                        <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                        <q-input
                          label-slot
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp === 'Kennwert'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].kennWert1
                          "
                          :type="
                            !benutzerDarfBearbeitenSelectedNode ||
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].bezeichnungWerteVererbenderElternknoten != null ||
                            !profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].aktiviertNichtDeaktiviert
                              ? ''
                              : 'number'
                          "
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                          dense
                          @focus="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.bauinformation
                              ? setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .bauinformationsAnzeigeText,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .internerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .idInternerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .externerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .oneDriveLink
                                )
                              : setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  null,
                                  null,
                                  null,
                                  null,
                                  null
                                )
                          "
                        >
                          <!-- ---------------------------------------------------------------------------------- -->
                          <!-- NEU: Label-VSlot für Label mit Custom HTML (für Einheiten) im obigen QInput-Feld   -->
                          <!-- Vorlage: https://forum.quasar-framework.org/topic/7733/custom-html-inside-a-label  -->
                          <!-- Vorlage: https://v1.quasar.dev/vue-components/input#custom-label                   -->
                          <!-- HINWEIS: Das was rechts in v-html="..." steht, war vor der Einführung dieses VSlots-->
                          <!-- oben am q-input mit label=".." deklariert!                                         -->
                          <!-- HINWEIS: Symbol, Einheit sind theoretisch Markdown, nicht nur HTML. Praktisch ist  -->
                          <!--          Markdown aber ausreichend, und ist Untermenge von HTML, daher kein Problem-->
                          <!-- ACHTUNG: Erfordert oben am q-input label-slot Prop!                                -->
                          <!-- ---------------------------------------------------------------------------------- -->
                          <template v-slot:label>
                            <div
                              v-html="
                                baueigenschaft.labelBaueigenschaft
                                  ? baueigenschaft.labelBaueigenschaft +
                                    '  [' +
                                    (profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.symbol
                                      ? profilModelAusgewaehlterKnoten[
                                          baueigenschaft
                                            .indexInProfilModelAusgewaehlterKnoten
                                        ].typbezogeneBaueigenschaft.symbol +
                                        ', '
                                      : '') +
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.einheit +
                                    ']'
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsAnzeigeText +
                                    '  [' +
                                    (profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.symbol
                                      ? profilModelAusgewaehlterKnoten[
                                          baueigenschaft
                                            .indexInProfilModelAusgewaehlterKnoten
                                        ].typbezogeneBaueigenschaft.symbol +
                                        ', '
                                      : '') +
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.einheit +
                                    ']'
                              "
                            />
                          </template>
                          <!-- --------------------------------------------------------------------------------- -->
                          <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                          <!-- ALT: content-class="my-tooltip"                                                   -->
                          <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                          <!-- --------------------------------------------------------------------------------- -->
                          <q-tooltip
                            v-if="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Kennwert'
                            "
                            :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4"
                          >
                            {{
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
                            }}
                          </q-tooltip>
                        </q-input>
                        <q-input
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswert'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          :autogrow="baueigenschaft.autogrow
                              ? baueigenschaft.autogrow
                              : false
                          "
                          :label="
                            baueigenschaft.labelBaueigenschaft
                              ? baueigenschaft.labelBaueigenschaft
                              : profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft
                                  .baueigenschaftsAnzeigeText
                          "
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].bezeichnungsWert1
                          "
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                          dense
                          @focus="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.bauinformation
                              ? setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .bauinformationsAnzeigeText,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .internerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .idInternerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .externerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .oneDriveLink
                                )
                              : setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  null,
                                  null,
                                  null,
                                  null,
                                  null
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
                                baueigenschaft
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
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
                            }}
                          </q-tooltip>
                        </q-input>
                        <q-input
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Tageszeitwert'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          :label="
                            baueigenschaft.labelBaueigenschaft
                              ? baueigenschaft.labelBaueigenschaft
                              : profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft
                                  .baueigenschaftsAnzeigeText
                          "
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].tagesZeitWert1
                          "
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                          dense
                          @focus="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.bauinformation
                              ? setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .bauinformationsAnzeigeText,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .internerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .idInternerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .externerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .oneDriveLink
                                )
                              : setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  null,
                                  null,
                                  null,
                                  null,
                                  null
                                )
                          "
                          mask="##:##"
                          :rules="[isValidTime]"
                        >
                          <!-- --------------------------------------------------------------------------------- -->
                          <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                          <!-- ALT: content-class="my-tooltip"                                                   -->
                          <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                          <!-- --------------------------------------------------------------------------------- -->
                          <q-tooltip
                            v-if="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Tageszeitwert'
                            "
                            :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4"
                          >
                            {{
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
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
                          <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh), sowie zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
                          <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                          <!-- Es folgt der Code für q-time: -->
                          <!-- :locale="dateLocale" -->
                          <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                          <template v-slot:append>
                            <q-icon name="query_builder" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                <q-time
                                  :readonly="determineReadonly(baueigenschaft)"
                                  v-model="
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].tagesZeitWert1
                                  "
                                  mask="HH:mm"
                                />
                                <div
                                  class="q-pa-md row items-center justify-end"
                                >
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
                        <!-- ---------------------------------------------------------------------------------- -->
                        <!-- ACHTNG: mask und :rules für Kombination QInput mit QDate mit mask="DD.MM.YYYY"     -->
                        <!-- Siehe https://quasar.dev/vue-components/date#With-QInput                           -->
                        <!-- Sowie https://forum.quasar-framework.org/topic/5868/qinput-and-qdate/3             -->
                        <!-- und https://codepen.io/metalsadman/pen/ZEbrjwB                                     -->
                        <!-- mask="##.##.####"                                                                  -->
                        <!-- :rules="[isValidDate]" "                                                           -->
                        <!-- ---------------------------------------------------------------------------------- -->
                        <q-input
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswert'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          :label="
                            baueigenschaft.labelBaueigenschaft
                              ? baueigenschaft.labelBaueigenschaft
                              : profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft
                                  .baueigenschaftsAnzeigeText
                          "
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].datumsWert1
                          "
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                          dense
                          @focus="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.bauinformation
                              ? setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .bauinformationsAnzeigeText,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .internerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .idInternerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .externerLink,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft.bauinformation
                                    .oneDriveLink
                                )
                              : setzeFelderFuerFachlicheHilfe(
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBezeichnung,
                                  profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBeschreibung,
                                  null,
                                  null,
                                  null,
                                  null,
                                  null
                                )
                          "
                          mask="##.##.####"
                          :rules="[isValidDate]"
                        >
                          <!-- --------------------------------------------------------------------------------- -->
                          <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                          <!-- ALT: content-class="my-tooltip"                                                   -->
                          <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                          <!-- --------------------------------------------------------------------------------- -->
                          <q-tooltip
                            v-if="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.werteTyp ===
                                'Datumswert'
                            "
                            :delay="1000"
                            :offset="[0, 10]"
                            max-width="500px"
                            content-class="bg-secondary text-white text-caption shadow-4"
                          >
                            {{
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
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
                          <!-- Das Datumsfeld kommt aus Mongoose im Date Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                          <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                          <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                          <!-- und neueBaueigenschaft.datumsWert1/2 -->
                          <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                          <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteAnKnoten() - siehe Kommentare dort! -->
                          <!-- Es folgt der Code für q-date: -->
                          <!-- :locale="dateLocale" -->
                          <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                <q-date
                                  :readonly="determineReadonly(baueigenschaft)"
                                  v-model="
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].datumsWert1
                                  "
                                  mask="DD.MM.YYYY"
                                  today-btn
                                />
                                <div
                                  class="q-pa-md row items-center justify-end"
                                >
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
                        <q-toggle
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Wahrheitswert'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft
                              ? baueigenschaft.hintBaueigenschaft
                              : null
                          "
                          :readonly="determineReadonly(baueigenschaft)"
                          :label="
                            baueigenschaft.labelBaueigenschaft
                              ? baueigenschaft.labelBaueigenschaft
                              : profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft
                                  .baueigenschaftsAnzeigeText
                          "
                          v-model="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].wahrheitsWert
                          "
                          :bg-color="
                            determineFieldBackgroundColor(baueigenschaft)
                          "
                          standout="bg-teal-4 text-black"
                          square
                          indeterminate
                          dense
                          @input="
                            setzeFelderFuerFachlicheHilfe(
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft
                                .baueigenschaftsBezeichnung,
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft
                                .baueigenschaftsBeschreibung
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
                                baueigenschaft
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
                              baueigenschaft.toolTipBaueigenschaft
                                ? baueigenschaft.toolTipBaueigenschaft
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsBemerkung
                            }}
                          </q-tooltip>
                        </q-toggle>
                        <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                        <!-- NEU: Behandlung von Wertepaaren - dazu wird eine reguläre Spalte in 2 Felder aufgeteilt:                                         -->
                        <!-- -------------------------------------------------------------------------------------------------------------------------------- -->
                        <!-- Kennwertepaar: -->
                        <div
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Kennwertepaar'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'row full-width col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft1
                              ? baueigenschaft.hintBaueigenschaft1
                              : null
                          "
                        >
                          <!-- Feld für den ersten Wert des Wertepaars: -->
                          <q-input
                            label-slot
                            :readonly="determineReadonly(baueigenschaft)"
                            class="
                              col-md-6 col-12 q-pa-xs q-col-gutter-xs
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].kennWert1
                            "
                            :type="
                              !benutzerDarfBearbeitenSelectedNode ||
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].bezeichnungWerteVererbenderElternknoten !=
                                null ||
                              !profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].aktiviertNichtDeaktiviert
                                ? ''
                                : 'number'
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                          >
                            <!-- ---------------------------------------------------------------------------------- -->
                            <!-- NEU: Label-VSlot für Label mit Custom HTML (für Einheiten) im obigen QInput-Feld   -->
                            <!-- Vorlage: https://forum.quasar-framework.org/topic/7733/custom-html-inside-a-label  -->
                            <!-- Vorlage: https://v1.quasar.dev/vue-components/input#custom-label                   -->
                            <!-- HINWEIS: Das was rechts in v-html="..." steht, war vor der Einführung dieses VSlots-->
                            <!-- oben am q-input mit label=".." deklariert!                                         -->
                            <!-- HINWEIS: Symbol, Einheit sind theoretisch Markdown, nicht nur HTML. Praktisch ist  -->
                            <!--          Markdown aber ausreichend, und ist Untermenge von HTML, daher kein Problem-->
                            <!-- ACHTUNG: Erfordert oben am q-input label-slot Prop!                                -->
                            <!-- ---------------------------------------------------------------------------------- -->
                            <template v-slot:label>
                              <div
                                v-html="
                                  baueigenschaft.labelBaueigenschaft1
                                    ? baueigenschaft.labelBaueigenschaft1 +
                                      '  [' +
                                      (profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.symbol
                                        ? profilModelAusgewaehlterKnoten[
                                            baueigenschaft
                                              .indexInProfilModelAusgewaehlterKnoten
                                          ].typbezogeneBaueigenschaft.symbol +
                                          ', '
                                        : '') +
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.einheit +
                                      ']'
                                    : profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft
                                        .baueigenschaftsAnzeigeText +
                                      '  [' +
                                      (profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.symbol
                                        ? profilModelAusgewaehlterKnoten[
                                            baueigenschaft
                                              .indexInProfilModelAusgewaehlterKnoten
                                          ].typbezogeneBaueigenschaft.symbol +
                                          ', '
                                        : '') +
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.einheit +
                                      ']'
                                "
                              />
                            </template>
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Kennwertepaar'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft1
                                  ? baueigenschaft.toolTipBaueigenschaft1
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
                              }}
                            </q-tooltip>
                          </q-input>
                          <!-- Feld für zweiten Wert des Wertepaars: -->
                          <q-input
                            label-slot
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft2
                                ? baueigenschaft.hintBaueigenschaft2
                                : null
                            "
                            class="
                              col-md-6 col-12 q-pa-xs q-col-gutter-xs
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].kennWert2
                            "
                            :type="
                              !benutzerDarfBearbeitenSelectedNode ||
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].bezeichnungWerteVererbenderElternknoten !=
                                null ||
                              !profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].aktiviertNichtDeaktiviert
                                ? ''
                                : 'number'
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                          >
                            <!-- ---------------------------------------------------------------------------------- -->
                            <!-- NEU: Label-VSlot für Label mit Custom HTML (für Einheiten) im obigen QInput-Feld   -->
                            <!-- Vorlage: https://forum.quasar-framework.org/topic/7733/custom-html-inside-a-label  -->
                            <!-- Vorlage: https://v1.quasar.dev/vue-components/input#custom-label                   -->
                            <!-- HINWEIS: Das was rechts in v-html="..." steht, war vor der Einführung dieses VSlots-->
                            <!-- oben am q-input mit label=".." deklariert!                                         -->
                            <!-- HINWEIS: Symbol, Einheit sind theoretisch Markdown, nicht nur HTML. Praktisch ist  -->
                            <!--          Markdown aber ausreichend, und ist Untermenge von HTML, daher kein Problem-->
                            <!-- ACHTUNG: Erfordert oben am q-input label-slot Prop!                                -->
                            <!-- ---------------------------------------------------------------------------------- -->
                            <template v-slot:label>
                              <div
                                v-html="
                                  baueigenschaft.labelBaueigenschaft2
                                    ? baueigenschaft.labelBaueigenschaft2 +
                                      '  [' +
                                      (profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.symbol
                                        ? profilModelAusgewaehlterKnoten[
                                            baueigenschaft
                                              .indexInProfilModelAusgewaehlterKnoten
                                          ].typbezogeneBaueigenschaft.symbol +
                                          ', '
                                        : '') +
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.einheit +
                                      ']'
                                    : profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft
                                        .baueigenschaftsAnzeigeText +
                                      '  [' +
                                      (profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.symbol
                                        ? profilModelAusgewaehlterKnoten[
                                            baueigenschaft
                                              .indexInProfilModelAusgewaehlterKnoten
                                          ].typbezogeneBaueigenschaft.symbol +
                                          ', '
                                        : '') +
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].typbezogeneBaueigenschaft.einheit +
                                      ']'
                                "
                              />
                            </template>
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Kennwertepaar'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft2
                                  ? baueigenschaft.toolTipBaueigenschaft2
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
                              }}
                            </q-tooltip>
                          </q-input>
                        </div>
                        <!-- Bezeichnungswertepaar: -->
                        <div
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Bezeichnungswertepaar'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'row full-width col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft1
                              ? baueigenschaft.hintBaueigenschaft1
                              : null
                          "
                        >
                          <!-- Feld für den ersten Wert des Wertepaars: -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            class="
                        col-md-6 col-12 q-pa-xs q-col-gutter-xs
                      "
                            :label="
                              baueigenschaft.labelBaueigenschaft1
                                ? baueigenschaft.labelBaueigenschaft1
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].bezeichnungsWert1
                            "
                            :autogrow="baueigenschaft.autogrow
                              ? baueigenschaft.autogrow
                              : false
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
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
                                  baueigenschaft
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
                                baueigenschaft.toolTipBaueigenschaft1
                                  ? baueigenschaft.toolTipBaueigenschaft1
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
                              }}
                            </q-tooltip>
                          </q-input>
                          <!-- Feld für den zweiten Wert des Wertepaars: -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft2
                                ? baueigenschaft.hintBaueigenschaft2
                                : null
                            "
                            class="
                        col-md-6 col-12 q-pa-xs q-col-gutter-xs
                      "
                            :label="
                              baueigenschaft.labelBaueigenschaft2
                                ? baueigenschaft.labelBaueigenschaft2
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].bezeichnungsWert2
                            "
                            :autogrow="baueigenschaft.autogrow
                              ? baueigenschaft.autogrow
                              : false
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
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
                                  baueigenschaft
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
                                baueigenschaft.toolTipBaueigenschaft2
                                  ? baueigenschaft.toolTipBaueigenschaft2
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
                              }}
                            </q-tooltip>
                          </q-input>
                        </div>
                        <!-- Tageszeitwertepaar: -->
                        <div
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Tageszeitwertepaar'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'row full-width col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft1
                              ? baueigenschaft.hintBaueigenschaft1
                              : null
                          "
                        >
                          <!-- Feld für den ersten Wert des Wertepaars: -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft1
                                ? baueigenschaft.hintBaueigenschaft1
                                : null
                            "
                            class="
                        col-md-6 col-12 q-pa-xs q-col-gutter-xs
                      "
                            :label="
                              baueigenschaft.labelBaueigenschaft1
                                ? baueigenschaft.labelBaueigenschaft1
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].tagesZeitWert1
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                            mask="##:##"
                            :rules="[isValidTime]"
                          >
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Tageszeitwertepaar'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft1
                                  ? baueigenschaft.toolTipBaueigenschaft1
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
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
                            <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh), sowie zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
                            <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                            <!-- Es folgt der Code für q-time: -->
                            <!-- :locale="dateLocale" -->
                            <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                            <template v-slot:append>
                              <q-icon
                                name="query_builder"
                                class="cursor-pointer"
                              >
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                  <q-time
                                    :readonly="
                                      determineReadonly(baueigenschaft)
                                    "
                                    v-model="
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].tagesZeitWert1
                                    "
                                    mask="HH:mm"
                                  />
                                  <div
                                    class="q-pa-md row items-center justify-end"
                                  >
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
                          <!-- Feld für den zweiten Wert des Wertepaars: -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft2
                                ? baueigenschaft.hintBaueigenschaft2
                                : null
                            "
                            class="
                        col-md-6 col-12 q-pa-xs q-col-gutter-xs
                      "
                            :label="
                              baueigenschaft.labelBaueigenschaft2
                                ? baueigenschaft.labelBaueigenschaft2
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].tagesZeitWert2
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                            mask="##:##"
                            :rules="[isValidTime]"
                          >
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Tageszeitwertepaar'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft2
                                  ? baueigenschaft.toolTipBaueigenschaft2
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
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
                            <!-- HINWEIS: Die aufwändigen Konvertierungen von UTC nach String in mounted(), reset() und in watch() (= Refresh), sowie zurück in submitWerteAnKnoten wie in QDate sind für QTime überflüssig, -->
                            <!-- Grund: Die Felder tagesZeitWert1/2 sind in Mongoose bereits String, im Gegensatz zu datumsWert1/2, welche type: Date sind!!! -->
                            <!-- Es folgt der Code für q-time: -->
                            <!-- :locale="dateLocale" -->
                            <!-- Prop von q-time - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                            <template v-slot:append>
                              <q-icon
                                name="query_builder"
                                class="cursor-pointer"
                              >
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                  <q-time
                                    :readonly="
                                      determineReadonly(baueigenschaft)
                                    "
                                    v-model="
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].tagesZeitWert2
                                    "
                                    mask="HH:mm"
                                  />
                                  <div
                                    class="q-pa-md row items-center justify-end"
                                  >
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
                        </div>
                        <!-- Datumswertepaar: -->
                        <div
                          v-else-if="
                            profilModelAusgewaehlterKnoten[
                              baueigenschaft
                                .indexInProfilModelAusgewaehlterKnoten
                            ].typbezogeneBaueigenschaft.werteTyp ===
                              'Datumswertepaar'
                          "
                          :class="
                            determineColStringSpaltenProRubrik(
                              rubrik,
                              index2 + 1
                            ) +
                              ' ' +
                              'row full-width col-12 q-pa-xs q-col-gutter-xs'
                          "
                          :hint="
                            baueigenschaft.hintBaueigenschaft1
                              ? baueigenschaft.hintBaueigenschaft1
                              : null
                          "
                        >
                          <!-- Feld für den ersten Wert des Wertepaars: -->
                          <!-- ---------------------------------------------------------------------------------- -->
                          <!-- ACHTNG: mask und :rules für Kombination QInput mit QDate mit mask="DD.MM.YYYY"     -->
                          <!-- Siehe https://quasar.dev/vue-components/date#With-QInput                           -->
                          <!-- Sowie https://forum.quasar-framework.org/topic/5868/qinput-and-qdate/3             -->
                          <!-- und https://codepen.io/metalsadman/pen/ZEbrjwB                                     -->
                          <!-- mask="##.##.####"                                                                  -->
                          <!-- :rules="[isValidDate]" "                                                           -->
                          <!-- ---------------------------------------------------------------------------------- -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft1
                                ? baueigenschaft.hintBaueigenschaft1
                                : null
                            "
                            class="
                          col-md-6 col-12 q-pa-xs q-col-gutter-xs
                        "
                            :label="
                              baueigenschaft.labelBaueigenschaft1
                                ? baueigenschaft.labelBaueigenschaft1
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].datumsWert1
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .idInternerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                            mask="##.##.####"
                            :rules="[isValidDate]"
                          >
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Datumswert'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft1
                                  ? baueigenschaft.toolTipBaueigenschaft1
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
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
                            <!-- Das Datumsfeld kommt aus Mongoose im Date Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                            <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                            <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                            <!-- und neueBaueigenschaft.datumsWert1/2 -->
                            <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                            <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteAnKnoten() - siehe Kommentare dort! -->
                            <!-- Es folgt der Code für q-date: -->
                            <!-- :locale="dateLocale" -->
                            <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                  <q-date
                                    :readonly="
                                      determineReadonly(baueigenschaft)
                                    "
                                    v-model="
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].datumsWert1
                                    "
                                    mask="DD.MM.YYYY"
                                    today-btn
                                  />
                                  <div
                                    class="q-pa-md row items-center justify-end"
                                  >
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
                          <!-- Feld für den zweiten Wert des Wertepaars: -->
                          <!-- ---------------------------------------------------------------------------------- -->
                          <!-- ACHTNG: mask und :rules für Kombination QInput mit QDate mit mask="DD.MM.YYYY"     -->
                          <!-- Siehe https://quasar.dev/vue-components/date#With-QInput                           -->
                          <!-- Sowie https://forum.quasar-framework.org/topic/5868/qinput-and-qdate/3             -->
                          <!-- und https://codepen.io/metalsadman/pen/ZEbrjwB                                     -->
                          <!-- mask="##.##.####"                                                                  -->
                          <!-- :rules="[isValidDate]" "                                                           -->
                          <!-- ---------------------------------------------------------------------------------- -->
                          <q-input
                            :readonly="determineReadonly(baueigenschaft)"
                            :hint="
                              baueigenschaft.hintBaueigenschaft2
                                ? baueigenschaft.hintBaueigenschaft2
                                : null
                            "
                            class="
                          col-md-6 col-12 q-pa-xs q-col-gutter-xs
                        "
                            :label="
                              baueigenschaft.labelBaueigenschaft2
                                ? baueigenschaft.labelBaueigenschaft2
                                : profilModelAusgewaehlterKnoten[
                                    baueigenschaft
                                      .indexInProfilModelAusgewaehlterKnoten
                                  ].typbezogeneBaueigenschaft
                                    .baueigenschaftsAnzeigeText
                            "
                            v-model="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].datumsWert2
                            "
                            :bg-color="
                              determineFieldBackgroundColor(baueigenschaft)
                            "
                            standout="bg-teal-4 text-black"
                            square
                            dense
                            @focus="
                              profilModelAusgewaehlterKnoten[
                                baueigenschaft
                                  .indexInProfilModelAusgewaehlterKnoten
                              ].typbezogeneBaueigenschaft.bauinformation
                                ? setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .bauinformationsAnzeigeText,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .internerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .externerLink,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft.bauinformation
                                      .oneDriveLink
                                  )
                                : setzeFelderFuerFachlicheHilfe(
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBezeichnung,
                                    profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBeschreibung,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                  )
                            "
                            mask="##.##.####"
                            :rules="[isValidDate]"
                          >
                            <!-- --------------------------------------------------------------------------------- -->
                            <!-- NEU: Tooltip auf dem obigen Feld                                                  -->
                            <!-- ALT: content-class="my-tooltip"                                                   -->
                            <!-- NEU: content-class="bg-secondary text-white text-caption shadow-4"                -->
                            <!-- --------------------------------------------------------------------------------- -->
                            <q-tooltip
                              v-if="
                                profilModelAusgewaehlterKnoten[
                                  baueigenschaft
                                    .indexInProfilModelAusgewaehlterKnoten
                                ].typbezogeneBaueigenschaft.werteTyp ===
                                  'Datumswert'
                              "
                              :delay="1000"
                              :offset="[0, 10]"
                              max-width="500px"
                              content-class="bg-secondary text-white text-caption shadow-4"
                            >
                              {{
                                baueigenschaft.toolTipBaueigenschaft2
                                  ? baueigenschaft.toolTipBaueigenschaft2
                                  : profilModelAusgewaehlterKnoten[
                                      baueigenschaft
                                        .indexInProfilModelAusgewaehlterKnoten
                                    ].typbezogeneBaueigenschaft
                                      .baueigenschaftsBemerkung
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
                            <!-- Das Datumsfeld kommt aus Mongoose im Date Format aus der Datenbank (YYYY-MM-DDTHH:MM:SS.000Z -->
                            <!-- In der QTable Feldern wird es aktuell mit formatDate nach YYYY-MM-DD bzw. neuerdings mit Quasar Date Util nach DD.MM.YYYY konvertiert -->
                            <!-- Es wird in diversen Funktionen in baueinheiten.vue/baustoffe.vue bereits umformatiert in das Format 'DD.MM.YYYY', in ausgewaehlteBaueigenschaft.datumsWert1/2 -->
                            <!-- und neueBaueigenschaft.datumsWert1/2 -->
                            <!-- Analog muss es hier wegen Verwendung von mask="DD.MM.YYYY" umformatiert werden in einen String in diesem Format, in mounted(), reset() und in watch() (= Refresh). -->
                            <!-- Umgekehrt muss eine Rückformatierung durchgeführt werden in submitWerteAnKnoten() - siehe Kommentare dort! -->
                            <!-- Es folgt der Code für q-date: -->
                            <!-- :locale="dateLocale" -->
                            <!-- Prop von q-date - nicht notwendig, wenn in quasar.conf.js lang: "de" als Quasar language gesetzt wird -->
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <!-- ACHTUNG - Hier Fix für #390 [DONE]: Selbes :readonly wie am q-input oben nötig! -->
                                  <q-date
                                    :readonly="
                                      determineReadonly(baueigenschaft)
                                    "
                                    v-model="
                                      profilModelAusgewaehlterKnoten[
                                        baueigenschaft
                                          .indexInProfilModelAusgewaehlterKnoten
                                      ].datumsWert2
                                    "
                                    mask="DD.MM.YYYY"
                                    today-btn
                                  />
                                  <div
                                    class="q-pa-md row items-center justify-end"
                                  >
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
                        </div>
                        <div v-else>
                          Nicht unterstützter Wertetyp
                        </div>
                      </div>
                    </div>
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- NEU: Optionale Hinweiszeile am Ende einer Rubrik                                                        -->
                    <!--      aus optionaler Property rubrik.hinweiseRubrik im Layout für Rubrik                                 -->
                    <!-- NEU: Optional als QExpansionItem, gesteuert durch optionale Prop rubrik.hinweiseRubrikAusklappbar       -->
                    <!--      sowie 2 weitere zugehörige Props                                                                   -->
                    <!-- ------------------------------------------------------------------------------------------------------- -->
                    <!-- Hier Sonderbehandlung eingebaut, dass bei readonlyAusZugeordneteBaustoffeBaueinheit spezielle Hinweise  -->
                    <!-- zur Werteeingabe unterdrückt werden! -->
                    <!-- TODO XXXXXX: Ist ein Hack bisher! -->
                    <div
                      v-if="
                        rubrik.hinweiseRubrik &&
                          !readonlyAusZugeordneteBaustoffeBaueinheit &&
                          !rubrik.hinweiseRubrik.startsWith(
                            'Anleitung: Werteeingabe'
                          )
                      "
                    >
                      <!-- ACHTUNG: Hier keine eigenes class="row full-width q-pa-xs q-col-gutter-xs", sonst "schrumpft" das QExpansionItem beim Einklappen! -->
                      <div v-if="rubrik.hinweiseRubrikAusklappbar">
                        <q-expansion-item
                          :label="rubrik.hinweiseRubrikAusklappbarLabel"
                          expand-separator
                          :default-opened="
                            rubrik.hinweiseRubrikAusklappbarDefaultOpened
                          "
                          dense
                          class="stretch full-width"
                          header-class="
                            bg-grey-4 text-black text-bold shadow-2 q-col-gutter-xs
                          "
                        >
                          <!-- NEU: Mit v-html per <div v-html=""../> - ACHTUNG mit <pre v-html=".."/> wird der Font auf monospaced geändert! -->
                          <div v-html="rubrik.hinweiseRubrik" />
                        </q-expansion-item>
                      </div>
                      <div
                        v-else
                        class="
                        q-pa-xs row full-width q-col-gutter-x
                      "
                      >
                        <!-- NEU: Mit v-html per <div v-html=""../> - ACHTUNG mit <pre v-html=".."/> wird der Font auf monospaced geändert! -->
                        <div v-html="rubrik.hinweiseRubrik" />
                        <!-- ALT: Ohne v-html: -->
                        <!--
                        {{ rubrik.hinweiseRubrik }}
                        -->
                      </div>
                    </div>
                  </template>
                </q-expansion-item>
              </div>
            </div>
            <!-- ========================== Ende Rubrik  ============================================================= -->
            <!-- START Test Section (Epic 38.o)                                                                        -->
            <!-- ===================================================================================================== -->
            <!-- NEU: Es folgen Testfelder für Test von Funktionen (computed Properties und Methoden) aus JS-Modul für -->
            <!-- ein Layout - diese beziehen sich auf das Profilformular für "Baustoff > Estrich" als Testprofil!      -->
            <!-- Der Code kann zum Testen mit v-if="true" enabled werden!                                              -->
            <!-- ----------------------------------------------------------------------------------------------------- -->
            <!-- ACHTUNG: Hier temporär mountedDone-Prüfung notwendig, sonst Fehler!                                   -->
            <!-- Mit undefined-Prüfung in myTestComputedProperty war dies nicht mehr notwendig!                        -->
            <!-- ACHTUNG: Prüfung auf profilBezeichnung nötig, sonst wirft das Profilformular für "Baustoff",          -->
            <!-- welches ebenfalls durch layout-gesteuertes-generisches-baueigenschafts-profil-formular angezeigt wird -->
            <!-- einen undefined-Fehler beim ersten Rendern!                                                           -->
            <!-- ===================================================================================================== -->

            <!-- v-if="localStore.state.debugMode" -->
            <div v-if="false && profilBezeichnung == 'Baustoff > Estrich'">
              <q-separator />
              <div class="q-pa-xs row full-width color-red">
                <strong>Achtung: Debug-Mode (nur für Entwickler): </strong>
                Testfelder für neues JS-Modul mit Funktionen (computed
                Properties und Methoden) für Profil "Baustoff > Estrich" -
                Ansteuerung teilweise über neue Properties im Layout. Durch
                Wechselwirkungen zwischen den beteiligten Feldern kann es zu
                Inkonsistenzen kommen - daher Browser bei wiederholten Tests
                refreshen für Cleanup!
              </div>
              <div class="q-pa-md row full-width">
                <!-- Test 1: Readonly-QInput-Feld, das aus computedProperty befüllt wird: -->
                <!-- ACHTUNG: Wenn hier statt :value="myTestComputedProperty" :value="testComputedProperty" angegeben wird, -->
                <!-- wird die computed Property aus dem JS-Modul nicht ausgewetet, sondern es wird als String im Testfeld -->
                <!-- "function() { // Eine erste Computed Property für Tests - ..." ausgegeben!!! -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 1 für computed Property aus JS-Modul"
                  dense
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="myTestComputedProperty"
                  hint="Berechnet: Feld wird mit fixem Wert 'CT: Zementestrich' belegt"
                >
                </q-input>
                <!-- Disabled: Test-Button, um temporär Initialisierungscode für computed Property aus Module zum Testen initial außerhalb von mounted() aufzurufen -->
                <!-- Wird nach Durchlauf des Codes für das Lesen der computed Property aus dem JS-Module in mounted -->
                <!-- UND einer undefined-Abfrage in myTestComputedProperty (computed Property welche die aus dem -->
                <!-- Module kommende wrapped) nicht mehr benötigt -->
                <q-btn
                  v-if="false"
                  class="col-md-3 col-12 stretch"
                  no-caps
                  glossy
                  color="purple-4"
                  label="Test-Schaltfläche für createComputedPropertyFromModule()"
                  @click="createComputedPropertyFromModule()"
                />
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 2: Readonly-QInput-Feld, das aus dem Layout File mittels neuer Prop  -->
                <!-- angesteuert werden soll - hier noch ohne diese Prop, d.h. nur Aufruf von testSetMethod() -->
                <!-- HINWEIS: Als erster Parameter wird der Aufzählungswert der ersten BEg im Profil übergeben: "Baustoff > Estrich > Einbauart" -->
                <!-- Als zu aktualisierende Baueigenschaft wird die zweite BEg im Profil als Parameter übergeben "Baustoff > Estrich > Biegezugfestigkeitsklasse" an die Methode übergeben -->
                <!-- -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 2 für Set-Methode aus JS-Modul"
                  dense
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="
                    testSetMethod(
                      profilModelAusgewaehlterKnoten[
                        layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                          .indexInProfilModelAusgewaehlterKnoten
                      ].aufzaehlungsWert,
                      profilModelAusgewaehlterKnoten[
                        layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                          .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                          .indexInProfilModelAusgewaehlterKnoten
                      ]
                    )
                  "
                  hint="Berechnet: Feld wird mit Wert aus Estricheinbauart (Feld oben) synchronisiert"
                >
                </q-input>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 3: Readonly-QInput-Feld, das aus dem Layout File mittels neuer Prop setValueByMethod: "testSetMethod" -->
                <!-- angesteuert werden soll - diese spezifiziert, welche der in functions-baustoff-estrich-baueigenschafts-profil-formular.js -->
                <!-- definierten Methoden verwendet werden soll. -->
                <!-- HINWEIS: Als erster Parameter wird der Aufzählungswert der ersten BEg im Profil übergeben: "Baustoff > Estrich > Einbauart" -->
                <!-- Als zu aktualisierende Baueigenschaft wird die zweite BEg im Profil als Parameter übergeben "Baustoff > Estrich > Biegezugfestigkeitsklasse" an die Methode übergeben -->
                <!-- ACHTUNG: Die Prop setValueByMethod wird hier provisorisch am Feld "Biegezugfestigkeitsklasse" abgefragt, eigentlich müsste sie an der aktuell -->
                <!--          iterierten Eigenschaft im Layout abgefragt werden -->
                <!-- -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 3 für Set-Methode aus JS-Modul per Prop im Layout"
                  dense
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="
                    layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                      .setValueByMethod === 'testSetMethod'
                      ? testSetMethod(
                          profilModelAusgewaehlterKnoten[
                            layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ].aufzaehlungsWert,
                          profilModelAusgewaehlterKnoten[
                            layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      : null
                  "
                  hint="Berechnet: Feld wird mit Wert aus Estricheinbauart (Feld oben) synchronisiert, gesteuert per Prop setValueByMethod: 'testSetMethod' an Estrichbiegezugfestigkeitsklasse (Feld oben)"
                >
                </q-input>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 4: Readonly-QInput-Feld, das aus dem Layout File mittels neuer Prop setValueByMethod: "testGeneralSetMethod" -->
                <!-- angesteuert werden soll - diese spezifiziert, dass eine in functions-baustoff-estrich-baueigenschafts-profil-formular.js -->
                <!-- definierte generische Methode testGeneralSetMethod() aufgerufen wird, welche als Parameter zwei -->
                <!-- Baueigenschaften hat - die zweite wird mit dem Wert der ersten aktualisiert (bisher nur für Aufzählungwerte) -->
                <!-- ACHTUNG: Die Prop setValueByMethod wird hier provisorisch am Feld "Estrichbiegezugfestigkeitsklasse" abgefragt, eigentlich müsste sie an der aktuell -->
                <!--          iterierten Eigenschaft im Layout abgefragt werden -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 4 für generelle Set-Methode aus JS-Modul per Prop im Layout"
                  dense
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="
                    layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                      .setValueByMethod === 'testGeneralSetMethod'
                      ? testGeneralSetMethod(
                          profilModelAusgewaehlterKnoten[
                            layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[0].baueigenschaftenInRubrik[1]
                              .indexInProfilModelAusgewaehlterKnoten
                          ],
                          profilModelAusgewaehlterKnoten[
                            layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[0].baueigenschaftenInRubrik[2]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      : null
                  "
                  hint="Berechnet: Feld wird mit Wert aus Estricheinbauart (Feld oben) synchronisiert, gesteuert per Prop setValueByMethod: 'testGeneralSetMethod' an Estrichbiegezugfestigkeitsklasse (Feld oben)"
                >
                </q-input>
              </div>
              <br />
              <div class="q-pa-md row full-width">
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 5: Readonly-QInput-Feld, das aus dem Layout File mittels neuer Prop setValueByMethod: "testSpecificSetMethod" -->
                <!-- angesteuert werden soll - diese spezifiziert, dass eine in functions-baustoff-estrich-baueigenschafts-profil-formular.js -->
                <!-- definierte Methode testSpecificSetMethod() aufgerufen wird, welche als Parameter die -->
                <!-- Baueigenschaft hat, deren Wert aktualisiert werden soll gemäß spezifischer Logik in testSpecificSetMethod -->
                <!-- ACHTUNG: Die Prop setValueByMethod wird hier provisorisch am Feld "Estrichdruckfestigkeitsklasse" abgefragt, eigentlich müsste sie an der aktuell -->
                <!--          iterierten Eigenschaft im Layout abgefragt werden -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 5 für spezifische Set-Methode aus JS-Modul per Prop im Layout"
                  dense
                  bg-color="green-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="
                    layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                      .rubrikenInTab[0].baueigenschaftenInRubrik[4]
                      .setValueByMethod === 'testSpecificSetMethod'
                      ? testSpecificSetMethod(
                          profilModelAusgewaehlterKnoten[
                            layoutBaustoffEstrichBaueigenschaftsProfilFormular[0]
                              .rubrikenInTab[0].baueigenschaftenInRubrik[4]
                              .indexInProfilModelAusgewaehlterKnoten
                          ]
                        )
                      : null
                  "
                  hint="Berechnet: Feld wird mit Wert aus Estrichoberflächenklasse (Feld oben) synchronisiert, gesteuert per Prop setValueByMethod: 'testSpecificSetMethod' an Estrichdruckfestigkeitsklasse (Feld oben)"
                >
                </q-input>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 6: Readonly-QInput-Feld, das über steuernden Aufzählungwert readonly geschaltet wird -->
                <!-- ACHTUNG: Bei den Expressions zur Prüfung enthalten die Aufzählungwerte Arrays of String, nicht String! -->
                <!-- Die Prüfung unten funktionierte nicht mit == ['CT: Zementestrich], sondern nur mit includes('CT: Zementestrich') -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 6 für steuernden Aufzählungswert aus Profil Model"
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  :readonly="
                    profilModelAusgewaehlterKnoten[
                      findeIndexVonBaueigenschaft(
                        'Baustoff > Estrich > Bindemittelart'
                      )
                    ].aufzaehlungsWert.includes('CT: Zementestrich')
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      findeIndexVonBaueigenschaft(
                        'Baustoff > Estrich > Einbauart'
                      )
                    ].aufzaehlungsWert
                  "
                  hint="Readonly in Abhängigkeit von Aufzählungswert: Feld wird readonly geschaltet, falls Estrichbindemittelart (Feld oben) den Wert 'CT: Zementestrich' hat"
                >
                </q-input>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 7: Readonly-QInput-Feld, das über steuernden Aufzählungwert readonly geschaltet wird -->
                <!-- Dieses wird nun aus dem Layout File per Prop readonlyMitSteuerndemAufzaehlungsWert an der BEg "Baustoff > Estrich > Einbauart" gesteuert -->
                <!-- Diese wird statt hart kodiert über Array-Indizes im Layout mit neuer Convenience-Funktion layoutBaueigenschaft(baueigenschaftsBezeichnung) im Layout gesucht -->
                <!-- ACHTUNG: Bei den Expressions zur Prüfung enthalten die Aufzählungwerte Arrays of String, nicht String! -->
                <!-- Die Prüfung unten funktionierte nicht mit == ['CT: Zementestrich], sondern nur mit includes('CT: Zementestrich') -->
                <!-- ACHTUNG: Dies funktioniert so NICHT, die Property raeadOnlyMitSteuerndemAufzaehlungsWert wird per Browser Log als String, nicht als JS Expression ausgewertet! -->
                <!-- Unklar, wie man auf dem String eine Interpolation als JS Expression hinbekommt -->
                <!-- Siehe https://vuejs.org/v2/guide/syntax.html#Using-JavaScript-Expressions: Es sind nur sandboxed Expressions im Data Scope der Vue Instance erlaubt -->
                <!-- Mögliche Lösungen: -->
                <!-- Versuch mit v-bind funktionierte ebenfalls nicht! -->
                <!-- Advanced Vue: -->
                <!-- Dynamic Arguments für Vue Directives: https://vuejs.org/v2/guide/syntax.html#Dynamic-Arguments -->
                <!-- Mixins: https://blog.jscrambler.com/advanced-vue-features-directives-filters-and-mixins -->
                <!-- Vermutlich ist in functions-baustoff-estrich-baueigenschafts-profil-formular.js ein computed oder method notwendig, die true oder false returned auf dem :readonly -->
                <!-- Vorläufig disabled. Siehe Test 8 -->
                <q-input
                  v-if="false"
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 7 für steuernden Aufzählungswert per Prop mit String im Layout"
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  :readonly="
                    layoutBaueigenschaft('Baustoff > Estrich > Einbauart')
                      .readonlyMitSteuerndemAufzaehlungsWert
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      findeIndexVonBaueigenschaft(
                        'Baustoff > Estrich > Einbauart'
                      )
                    ].aufzaehlungsWert
                  "
                  hint="[FAIL] Readonly in Abhängigkeit von Aufzählungswert per Prop readonlyMitSteuerndemAufzaehlungsWert an Estricheinbauart (Feld oben)"
                >
                </q-input>
                <div v-else class="col-md-3 col-12"></div>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 8: Readonly-QInput-Feld, das über steuernden Aufzählungwert readonly geschaltet wird - per Funktion -->
                <!-- Dieses wird nun aus dem Layout File per Prop readonlyByMethod an der BEg "Baustoff > Estrich > Einbauart" gesteuert -->
                <!-- Die Methode testUniverslReadonlyMethod() bekommt die zu steuernde BEg mit - sie fragt dann die steurnde BEg "Baustoff > Estrich > Bindemittelart" auf den -->
                <!-- Wert ihres Aufzählungwerts ab, und liefert je nach Wert true oder false zurück -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 8 für steuernden Aufzählungswert per Prop für spezifische Methode im Layout"
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  :readonly="
                    layoutBaueigenschaft('Baustoff > Estrich > Einbauart')
                      .readonlyByMethod === 'testSpecificReadonlyMethod'
                      ? testSpecificReadonlyMethod(
                          profilModelAusgewaehlterKnoten[
                            findeIndexVonBaueigenschaft(
                              'Baustoff > Estrich > Einbauart'
                            )
                          ]
                        )
                      : false
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      findeIndexVonBaueigenschaft(
                        'Baustoff > Estrich > Einbauart'
                      )
                    ].aufzaehlungsWert
                  "
                  hint="Readonly in Abhängigkeit von Aufzählungswert per Prop readonlyByMethod: 'testSpecificReadonlyMethod' an Estricheinbauart (Feld oben)"
                >
                </q-input>
              </div>
              <br />
              <div class="q-pa-md row full-width">
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 9: Initialisierung eines Felds aus anderem Feld per Methode -->
                <!-- Dieses wird nun aus dem Layout File per Prop initialize an der BEg "Baustoff > Estrich > Einbauart" gesteuert -->
                <!-- Die Methode testUniverslReadonlyMethod() bekommt die zu steuernde BEg mit - sie fragt dann die steurnde BEg "Baustoff > Estrich > Bindemittelart" auf den -->
                <!-- Wert ihres Aufzählungwerts ab, und liefert je nach Wert true oder false zurück -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 9 für steuernden Aufzählungswert per Prop für generelle Methode im Layout"
                  dense
                  bg-color="teal-2"
                  standout="bg-teal-4 text-black"
                  square
                  :readonly="
                    layoutBaueigenschaft('Baustoff > Estrich > Härteklasse')
                      .readonlyByMethod === 'testGeneralReadonlyMethod'
                      ? testGeneralReadonlyMethod(
                          'Baustoff > Estrich > Bindemittelart',
                          'CT: Zementestrich'
                        )
                      : false
                  "
                  v-model="
                    profilModelAusgewaehlterKnoten[
                      findeIndexVonBaueigenschaft(
                        'Baustoff > Estrich > Härteklasse'
                      )
                    ].aufzaehlungsWert
                  "
                  hint="Readonly in Abhängigkeit von Aufzählungswert per Prop readonlyByMethod: 'testGeneralReadonlyMethod' an Estrichhärteklasse (Feld oben)"
                >
                </q-input>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 10: Initialisierung von Feldern per Methode testGeneralInitializeMethod() -->
                <!-- Dies initialisiert per Test-Button die Baueigenschaft "Estrichoberflächensklasse" mit dem Aufzählungswert aus "Estrichbindemittelart" -->
                <q-btn
                  class="q-pa-xs col-md-3 col-12"
                  dense
                  glossy
                  no-caps
                  color="teal-4"
                  label="Test von testGeneralInitializeMethod()"
                  @click="
                    testGeneralInitializeMethod(
                      'Baustoff > Estrich > Bindemittelart',
                      profilModelAusgewaehlterKnoten[
                        findeIndexVonBaueigenschaft(
                          'Baustoff > Estrich > Oberflächenhärteklasse'
                        )
                      ]
                    )
                  "
                />
                <div class="q-pa-xs col-md-3 col-12 text-caption">
                  Initialisiert Feld Estrichoberflächenhärteklasse, falls leer,
                  mit Wert aus Estrichbindemittelart
                </div>
                <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
                <!-- Test 11: Readonly-QInput-Feld, das aus dem Layout File mittels neuer Prop setValueByMethod: "sollIstWertePaarSetMethod" -->
                <!-- angesteuert werden soll - diese spezifiziert, dass eine in functions-baustoff-estrich-baueigenschafts-profil-formular.js -->
                <!-- definierte Methode sollIstWertePaarSetMethod() aufgerufen wird, welche als Parameter zwei -->
                <!-- Baueigenschaften hat - die zweite wird mit dem Wert der ersten aktualisiert (bisher nur für Aufzählungwerte) -->
                <!-- ACHTUNG: Die Prop setValueByMethod sowie sollWertBaueigenschaft wird hier provisorisch am Feld "Estrichoberflächenhärteklasse" abgefragt, eigentlich müsste sie an der aktuell -->
                <!--          iterierten Eigenschaft im Layout abgefragt werden -->
                <q-input
                  class="q-pa-xs col-md-3 col-12"
                  label="Testfeld 11 für Set-Methode für Soll-/Istwertepaare aus JS-Modul per Props im Layout"
                  dense
                  bg-color="purple-2"
                  standout="bg-teal-4 text-black"
                  square
                  readonly
                  :value="
                    layoutBaueigenschaft(
                      'Baustoff > Estrich > Oberflächenhärteklasse'
                    ).setValueByMethod === 'sollIstWertePaarSetMethod'
                      ? sollIstWertePaarSetMethod(
                          profilModelAusgewaehlterKnoten[
                            layoutBaueigenschaft(
                              layoutBaueigenschaft(
                                'Baustoff > Estrich > Oberflächenhärteklasse'
                              ).sollWertBaueigenschaft
                            ).indexInProfilModelAusgewaehlterKnoten
                          ],
                          profilModelAusgewaehlterKnoten[
                            findeIndexVonBaueigenschaft(
                              'Baustoff > Estrich > Oberflächenhärteklasse'
                            )
                          ]
                        )
                      : null
                  "
                  hint="Vorbelegt: Feld wird - falls leer - mit Wert aus Estrichbindemittelart (Feld oben) synchronisiert, gesteuert per Prop setValueByMethod: 'sollIstWertePaarSetMethod' sowie Prop 'sollWertBaueigenschaft' an Estrichoberflächenhärteklasse (Feld oben)"
                >
                </q-input>
              </div>
              <br />
              <br />
              <!-- ========================================================================================================================================================================= -->
              <q-separator />
              <!-- ACHTUNG: Wegen Zugriff auf BEg aus Profil "Baustoff > Estrich" muss dieses {{ }} unbedingt innerhalb des obigen divs mit profilBezeichnung == "Baustoff > Estrich" sein!!! -->
              Steuernder Aufzählungswert:
              {{
                profilModelAusgewaehlterKnoten[
                  findeIndexVonBaueigenschaft(
                    "Baustoff > Estrich > Bindemittelart"
                  )
                ].aufzaehlungsWert
              }}
            </div>
            <!-- ------------------------------------------------------------------------------------------------------------------------------------------ -->
          </div>
        </q-tab-panel>
        <!--================================================================================================================================== -->
      </q-tab-panels>
      <!-- =================================== Ende QTabPanels =============================================  -->
      <!-- </q-card> -->
      <!----------------------------------------------------------------------------------------------------- -->
      <!-- Start gemeinsame Button Section für alle Tabs:                                                     -->
      <!-- Die @-Methoden haben Parameter tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, der ihnen anzeigt,        -->
      <!-- für welches Tab sie gerufen werden                                                                 -->
      <!----------------------------------------------------------------------------------------------------- -->
      <q-separator />
      <!-- NEU: Vollständige Unterdrückung der Button-Zeile, wenn Prop :benutzerDarfBearbeitenSelectedNode auf false steht! -->
      <!-- Damit ist dann das gesamte layoutgesteuerte generische Profilformular im Readonly-Modus! -->
      <!-- NEU: Bestätigungsdialog beim Speichern an Nicht-Blattknoten im Baustoffbaum, #388: -->
      <!-- HINWEIS: Man könnte zusätzlich beim Aktivieren des Dialogs noch abfragen, ob eingabeFreischaltenAnVerzweigungsKnoten auf true steht (für #388 transientes Flag) -->
      <!-- und ob es ggf. wirklich Kindknoten mit undefinierten Werten gibt (orangefarbige Felder, ist alleredings optional vom Benutzer gesteuert). -->
      <!-- Allerdings gilt die Warnung auch für das (potenziell absichtliche) Setzen von undefinierten Feldern in Kindknoten, daher diese zusätzlichen Bedingungen einstweilen weggelassen! -->
      <q-dialog v-model="speichernProfilFormularDialog">
        <!-- HINWEIS: Das v-model wird beim Verlassen des QDialogs offenbar von selbst zurückgesetzt! -->
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
                <b>Achtung:</b>
                Beim Speichern werden die am im Baustoffbaum ausgewählten
                Baustoff
                <b>"{{ selectedNode.baustoffBezeichnung }}"</b>
                eingegebenen Werte auch automatisch an alle direkten und
                indirekten Kindknoten des ausgewählten Baustoffs weitervererbt.
                An solchen Kindknoten bisher <b>undefinierte</b> Werte werden
                dabei mit <b>denselben Werten definiert,</b> wie sie am
                ausgewählten Baustoff eingegeben wurden, was im Sinne der
                Einheitlichkeit der Werte in dem am ausgewählten Baustoff
                beginnenden Zweig des Baustoffbaums auch
                <b>beabsichtigt</b> sein kann.
                <br />
                <br />
                Allerdings werden dabei an diesen Kindknoten auch eventuell
                bereits <b>vorhandene Werte</b> mit den am ausgewählten Baustoff
                eingegebenen Werten
                <b>überschrieben.</b>
                <br />
                <br />
                Wenn Sie nicht wollen, dass eventuell vorhandene Werte an
                Kindbaustoffen überschrieben werden, drücken Sie
                <b>"Abbrechen",</b> andernfalls
                <b
                  >"Speichern und eventuell vorhandene Werte an Kindbaustoffen
                  überschreiben"</b
                >
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
                  label="Speichern und eventuell vorhandene Werte an Kindbaustoffen überschreiben"
                  color="negative"
                  @click="
                    submitWerteAnKnoten(
                      tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
                    )
                  "
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
      <!-- -------------------------------------------------------------------------------------------------- -->
      <div
        class="row q-pa-xs full-width q-col-gutter-xs"
        v-if="benutzerDarfBearbeitenSelectedNode"
      >
        <div class="col-md-2 col-12">
          <!-- NEU - #388: Zusätziche Bedingung am :disable: "...|| (selectedNode.baumKnotenTyp !== 'Blattknoten' && !eingabeFreischaltenAnVerzweigungsKnoten)" -->
          <q-btn
            dense
            :disable="
              !benutzerDarfBearbeitenSelectedNode ||
                (baum == 'Baustoffbaum' &&
                  selectedNode.baumKnotenTyp !== 'Blattknoten' &&
                  !eingabeFreischaltenAnVerzweigungsKnoten)
            "
            class="stretch full-width"
            label="Angaben in allen Tabs speichern"
            @click="
              baum === 'Baustoffbaum' &&
              selectedNode.baumKnotenTyp !== 'Blattknoten'
                ? (speichernProfilFormularDialog = true)
                : submitWerteAnKnoten(
                    tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
                  )
            "
            color="positive"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-2 col-12">
          <!-- NEU - #388: Zusätziche Bedingung am :disable: "...|| (selectedNode.baumKnotenTyp !== 'Blattknoten' && !eingabeFreischaltenAnVerzweigungsKnoten)" -->
          <q-btn
            dense
            :disable="
              !benutzerDarfBearbeitenSelectedNode ||
                (baum == 'Baustoffbaum' &&
                  selectedNode.baumKnotenTyp !== 'Blattknoten' &&
                  !eingabeFreischaltenAnVerzweigungsKnoten)
            "
            class="stretch full-width"
            label="Eingaben auf Originalwerte zurücksetzen"
            @click="
              resetWerteAnKnoten(
                tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              )
            "
            color="deep-orange"
            text-color="white"
            glossy
            no-caps
          />
        </div>
        <div class="col-md-3 col-12">
          <!-- ===================================================================================================== -->
          <!-- NEU: Button für #388, um transientes Flag eingabeFreischaltenAnVerzweigungsKnoten auf true zu setzen  -->
          <!-- Bisher nur im Baustoffbaum, die Logik dahinter wäre aber auch im Bauvorhabenbaum sinnvoll!            -->
          <!-- Der Code kann zum Testen mit v-if="true" enabled werden!                                              -->
          <!-- ----------------------------------------------------------------------------------------------------- -->
          <!-- v-if="localStore.state.debugMode" -->
          <q-btn
            v-if="true && baum == 'Baustoffbaum'"
            :disable="
              !benutzerDarfBearbeitenSelectedNode ||
                selectedNode.baumKnotenTyp === 'Blattknoten'
            "
            dense
            class="stretch full-width"
            no-caps
            glossy
            color="lime"
            text-color="white"
            label="Werteeingabe am Verzweigungsknoten temporär freischalten"
            @click="buttonClickedWerteEingabeAnVerzweigungsKnoten()"
          />
        </div>
        <div class="col-md-5 col-12">
          <!-- ===================================================================================================== -->
          <!-- NEU: Es folgen Testfelder Für Test der Ermittlung des Definiertheitszustands von Kindknoten           -->
          <!-- - diese bisher nur im Baustoffbaum, zum Testen: Profilformular für "Baustoff > Estrich"!              -->
          <!-- Der Code kann zum Testen mit v-if="true" enabled werden!                                              -->
          <!-- ----------------------------------------------------------------------------------------------------- -->
          <!-- v-if="localStore.state.debugMode" -->
          <q-btn
            v-if="true && baum == 'Baustoffbaum'"
            :disable="
              !benutzerDarfBearbeitenSelectedNode ||
                selectedNode.baumKnotenTyp === 'Blattknoten'
            "
            dense
            class="stretch full-width"
            no-caps
            glossy
            color="orange"
            text-color="white"
            label="Undefinierte Felder orangefarbig kennzeichnen, die definierte Werte an Kindbaustoffen haben"
            @click="ermittleDefiniertheitKindKnoten()"
          />
        </div>
      </div>
    </div>
  </div>
  <!--  </q-form> -->
</template>
<!-- ***===================================================================================================================================== -->
<script>
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import { date } from "quasar";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
import LayoutBaustoffBaueigenschaftsProfilFormular from "../modules/layout-baustoff-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaustoffEstrichBaueigenschaftsProfilFormular from "../modules/layout-baustoff-estrich-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
// NEU: Für Test von computed Functions in Layout File:
import FunctionsBaustoffEstrichBaueigenschaftsProfilFormular from "../modules/functions-baustoff-estrich-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular from "../modules/layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-bauvorhaben-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitStandortBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-standort-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-gebaeude-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitGeschossBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-geschoss-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitRaumBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-raum-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitBodenBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-boden-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformula
import LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import FunctionsBaueinheitBodenBaueigenschaftsProfilFormular from "../modules/functions-baueinheit-boden-baueigenschafts-profil-formular.js"; // NEU: Importiere spezifische Layout-Datenstruktur für dieses Profilformular
import LayoutBaueinheitSchichtBaueigenschaftsProfilFormular from "../modules/layout-baueinheit-schicht-baueigenschafts-profil-formular.js"; // Importiere spezifische Layout-Datenstruktur für dieses Profilformular

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
// import VueAutonumeric from "vue-autonumeric"; // Erfordert unten Eintrag in components: { ..., VueAutoNumeric }
//================================================================================================================================================
export default {
  // name: 'ComponentName',
  components: {
    // VueAutonumeric // NEU - für Tests mit VueAutoNumeric
  },
  props: [
    "profilBezeichnung", // Bezeichnung des anzuzeigenden Baueigenschaftsprofils
    "baum", // String, "Baustoffbaum" oder "Bauvorhabenbaum"
    "nodes", // Referenz auf nodesTreeBaueinheiten bzw. nodesTreeBaustoffe
    "selectedNode", // Referenz auf selectedNodeTreeBaueinheiten bzw. selectedNodeTreeBaustoffe
    "benutzerDarfBearbeitenSelectedNode", // Boolean, wird in aufrufender Komponente ausgewertet und der Komponente übergeben, für Readonly-Schaltung aller Felder
    // UND (NEU!) Unterdrückung der Button-Zeile zum Speichern/Zurücksetzen
    // ACHTUNG: Wenn diese Prop auf false gesetzt wird, entspricht dies im Effekt der invertierten Variable "alleFelderSindReadOnly" im generischen Profilformular -
    //          die Komponente arbeitet dann effektiv im Readonly-Modus!
    // ACHTUNG: Eine Änderung der Prop in der Elternkomponente wird reaktiv weitergegeben an die Kindkomponente und kann hier in der Kindkomponente ggf. per watch() erkannt und behandelt werden!
    // HINWEIS: Zusätzlich wird Refresh-Event von der Komponente gefeuert! @refresh-request-baueigenschafts-profil
    "readonlyAusZugeordneteBaustoffeBaueinheit" // Boolean, für neuen Aufruf als readonly-Variante aus "Zugeordnete Baustoffe" an einer Baueinheit
  ],
  //--------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      speichernProfilFormularDialog: false, // NEU: Confirmation Dialog beim Speichern des Profilformulars, #388
      eingabeFreischaltenAnVerzweigungsKnoten: false, // Transientes Flag für #388, sollte entweder mit am Profil Model hängen, spezifisch für gesamtes Profilformular,
      // oder hier als Variable in data(), dann muss es allerdings beim Knoten- oder Profilwechsel auf false zurückgesetzt werden in mounted(), watch() (= Refresh, dort 2-mal!) und reset()
      // Default ist: Flag ist false oder undefined, dann werden im Baustoffbaum Felder an Nicht-Blattknoten auf readonly geschaltet!
      //----------------------------------------------------------------------------------------------------------------------------------
      // Die folgenden Variablen sind für Tests zusammen mit Modul functions-baustoff-estrich-baueigenschafts-profil-formular.js
      testComputedProperty: null, // NEU: Für Test von computed Property aus JS-Modul
      testSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testSpecificSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      sollIstWertePaarSetMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testSpecificlReadonlyMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralReadonlyMethod: null, // NEU: Für Test von Methode aus JS-Modul
      testGeneralInitializeMethod: null, // NEU: Für Test von Methode aus JS-Modul
      //-----------------------------------------------------------------------------------------------------------------------------------
      //
      benutzerNachrichtFuerProfilFormularBaueigenschaftenFehlerWurdeAngezeigt: false, // Merker für Fehlermeldung, wenn Profilformular nicht gerendert werden kann
      // anzahlBaueigenschaftenPerRow: 4, // Für Ausgabe von Feldern in durch diesen Wert spezifizierten Anzahl Spalten - ersetzt durch Property spaltenRubrik im Layout File
      //-----------------------------------------------------------------------------------------------------------------------------------
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
      tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular:
        "geometrieTabGeschossBaueigenschaftsProfilFormular", // TODO - vorläufig
      indexFuerTabLayoutGesteuertesGenerischesProfilFormular: 0, // TODO - vorläufiger Index im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, der auf die Daten für ein Tab zeigt
      localStore: globalStore,
      mountedDone: false,

      layoutBaustoffBaueigenschaftsProfilFormular: LayoutBaustoffBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen
      // NEU: Für Test von Methoden aus JS-Modulen: Neues separates JS-Module, korrespondierend zum Layout File für ein Profil, mit Funktionen:
      functionsBaustoffEstrichBaueigenschaftsProfilFormular: FunctionsBaustoffEstrichBaueigenschaftsProfilFormular,
      // ACHTUNG: Hier noch keine this-Übergabe! Diese erfolgt in mounted(), wo die testComputedProperty aus dem Modul geholt wird!!!
      layoutBaustoffEstrichBaueigenschaftsProfilFormular: LayoutBaustoffEstrichBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen
      layoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular: LayoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular, // Für Testzwecke an Baustoffen und Baueinheiten
      layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular: LayoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitStandortBaueigenschaftsProfilFormular: LayoutBaueinheitStandortBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular: LayoutBaueinheitGebaeudeBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitGeschossBaueigenschaftsProfilFormular: LayoutBaueinheitGeschossBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitBodenBaueigenschaftsProfilFormular: LayoutBaueinheitBodenBaueigenschaftsProfilFormular, // NEU: Layout für neues Profil "Baueinheit > Boden"
      // NEU: Für Test von Methoden aus JS-Modulen: Neues separates JS-Module, korrespondierend zum Layout File für ein Profil, mit Funktionen:
      functionsBaueinheitBodenBaueigenschaftsProfilFormular: FunctionsBaueinheitBodenBaueigenschaftsProfilFormular,
      // ACHTUNG: Hier noch keine this-Übergabe! Diese erfolgt in mounted(), wo die testComputedProperty aus dem Modul geholt wird!!!
      layoutBaueinheitRaumBaueigenschaftsProfilFormular: LayoutBaueinheitRaumBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular: LayoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten
      layoutBaueinheitSchichtBaueigenschaftsProfilFormular: LayoutBaueinheitSchichtBaueigenschaftsProfilFormular, // Für Testzwecke an Baueinheiten

      layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: null, // Array für die Speicherung von Layout-Information für
      // dieses layoutgesteuerte generische Baueigenschaftsprofilformular, wird in mounted() initialisiert
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
    generalComparisonFunction(linkeBaueigenschaft, rechteBaueigenschaft, mode) {
      //-------------------------------------------------------------------------------------------------------------------------------------------
      // Funktion, die zwei Baueigenschaften (bisher nur Kennwerte) vergleicht und bei mode "icon" den passenden Icon-Namen zurückgibt zur Anzeige
      // mode: "icon" oder "flip"
      //       "icon": Returned Name des anzuzeigenden Icons
      //       "flip": Returned bei ">": "flip-vertical", bei "<" und "=": "" (kein vertikaler Flip)
      // HINWEISE:
      // - Diese Funktion, die im Template für die Visualisierung von Vergleichen aufgerufen wird, ist etwas anders strukturier als generalClickMethod()
      // - Sie hat nicht die baueigenschaft im Layout als Argument
      // - Sie holt ihre Argumente dann nicht aus den entsprechenden Props an der baueigenschaft im Layout, sondern erhält sie direkt als Parameter!
      // - Dies könnte auch umgestaltet werden nach dem Muster von generalClickMethod()
      //-------------------------------------------------------------------------------------------------------------------------------------------
      console.log("In generalComparisonMethod()");
      let differenzNumber = 0;
      differenzNumber =
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaft(linkeBaueigenschaft)
            .indexInProfilModelAusgewaehlterKnoten
        ].kennWert1 -
        this.profilModelAusgewaehlterKnoten[
          this.layoutBaueigenschaft(rechteBaueigenschaft)
            .indexInProfilModelAusgewaehlterKnoten
        ].kennWert1;
      if (mode === "icon") {
        if (differenzNumber === 0) return "done"; // NEU: Checkmark statt Headline für Gleichheit // ALT: "view_headline" // =
        if (differenzNumber > 0) return "south_east"; // ↘
        if (differenzNumber < 0) return "north_east"; // ↗, kein flip-vertical notwendig
      } // else // mode ="flip"
      if (differenzNumber === 0) return ""; // Kein flip
      if (differenzNumber < 0) return ""; // Kein flip
      if (differenzNumber > 0) return ""; // Kein flip bei Aufwärtspfeil "north_east"
      // Alternative Icons (Treppen):
      /*
      if (differenzNumber === 0) return "view_headline"; // =
      if (differenzNumber < 0) return "stairs"; //  ↗, Treppen-Icon, gibt es nur aufwärts
      if (differenzNumber > 0) return "stairs"; // ↘, hier flip-vertical des Treppen-Icons notwendig
      */
      // Alternative Icons (Pfeile):
      /*
      if (differenzNumber === 0) return "view_headline" // =
      if (differenzNumber > 0) return "south_east" // ↘
      if (differenzNumber < 0) return "north_east" // ↗, kein flip-vertical notwendig
      */
      // Frühere Versuche mit Unicode - geht nur zusammen mit v-html im Template - siehe dort:
      /*
      if (differenzNumber === 0) return "&#8596;" // ↔
      if (differenzNumber < 0) return "&#8600;" // ↘
      if (differenzNumber < 0) return "&#8599;" // ↗
      */
    },

    generalClickMethod(baueigenschaft) {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Generalisierte @click-Methode auf Button im Layout
      //      Hat als Parameter eine baueigenschaft aus dem Layout
      //      Fragt dann Prop clickAction am Layout ab und macht dann die erforderliche Aktion
      //      Benutzt dafür ggf. noch weitere Sub-Props aus dem Layout
      // Bisher implementierte Properties bzw. Sub-Properties:
      // - clickAction: "Reset" // Macht Feld-Reset
      //   - sollWertBaueigenschaft // Bezeichung der Baueigenschaft, deren Wert zum Reset von istWertBaueigenschaft genommen wird
      //   - istWertBaueigenschaft // Bezeichung der Baueigenschaft, die resetted werden soll mit Wert aus sollWertBaueigenschaft
      // - clickAction: "Calculate" // Macht Berechnung
      //   - istWertBaueigenschaft // Bezeichung der Baueigenschaft, deren Wert mit einem berechneten Wert aktualisiert wird
      // Alternativ könnte man auch, abhängig von clickAction oder optionalen weiteren Props an der baueigenschaft im Layout
      // eine spezialisierte Funktion aus functions-xyz-baueigenschafts-profil-formular.js aufrufen, die dann allerdings geladen
      // werden müsste, in mounted(), spezifisch für das übergebene/angezeigte Baueigenschaftsprofil!
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In generalClickMethod()");
      console.log("baueigenschaft: ", baueigenschaft);
      console.log("baueigenschaft.clickAction: ", baueigenschaft.clickAction);
      let baueigenschaft1,
        baueigenschaft2 = null; // Hilfsvariablen
      let result = null; // Hilfsvariable
      switch (baueigenschaft.clickAction) {
        case "Reset":
          // In diesem Fall werden 2 weitere Props erwartet im Layout:
          console.log(
            "baueigenschaft.sollWertBaueigenschaft: ",
            baueigenschaft.sollWertBaueigenschaft
          );
          console.log(
            "baueigenschaft.istWertBaueigenschaft: ",
            baueigenschaft.istWertBaueigenschaft
          );
          // Die benötigten Baueigenschaften im Profil Model identifizieren:
          baueigenschaft1 = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaft(baueigenschaft.sollWertBaueigenschaft)
              .indexInProfilModelAusgewaehlterKnoten
          ]; // Baueigenschaft, mit deren Wert resetted werden soll (Sollwert)
          baueigenschaft2 = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaft(baueigenschaft.istWertBaueigenschaft)
              .indexInProfilModelAusgewaehlterKnoten
          ]; // Zu resettende Baueigenschaft (Istwert)
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp ===
            "Aufzählungswert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              baueigenschaft1.aufzaehlungsWert // Sollwert
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.aufzaehlungsWert: ",
              baueigenschaft2.aufzaehlungsWert
            );
          }
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp === "Kennwert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "kennWert1", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              baueigenschaft1.kennWert1 // Sollwert
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.kennWert1: ",
              baueigenschaft2.kennWert1
            );
          }
          break;
        case "Calculate":
          // In diesem Fall wird aktuell nur eine Prop erwartet im Layout
          console.log(
            "baueigenschaft.istWertBaueigenschaft: ",
            baueigenschaft.istWertBaueigenschaft
          );
          // Die benötigte Baueigenschaft im Profil Model identifizieren:
          baueigenschaft2 = this.profilModelAusgewaehlterKnoten[
            this.layoutBaueigenschaft(baueigenschaft.istWertBaueigenschaft)
              .indexInProfilModelAusgewaehlterKnoten
          ]; // Zu resettende Baueigenschaft (Istwert)
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp ===
            "Aufzählungswert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "aufzaehlungsWert", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              ["Otto"] // TODO XXXXXX: Hier echtes Computen, z.B. per Aufruf einer spezifischen Funktion aus functions-Modul für das Profilformular,
              // abhängig z.B. von der Bezeichnung der Baueigenschaft, oder von weiteren Props, wenn clickAction === "Calculate"
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.aufzaehlungsWert: ",
              baueigenschaft2.aufzaehlungsWert
            );
          }
          if (
            baueigenschaft2.typbezogeneBaueigenschaft.werteTyp === "Kennwert"
          ) {
            result = this.$set(
              // Testhalber Baueigenschaft updaten im Profil Model, Vue $set returns the set value
              baueigenschaft2, // Diese BEg mit diesem Testwert aktualisieren
              "kennWert1", // TODO XXXXXX: Hier alle Wertetypen unterstützen
              42 // TODO XXXXXX: Hier echtes Computen, z.B. per Aufruf einer spezifischen Funktion aus functions-Modul für das Profilformular,
              // abhängig z.B. von der Bezeichnung der Baueigenschaft, oder von weiteren Props, wenn clickAction === "Calculate"
            );
            console.log("result: ", result);
            console.log(
              "baueigenschaft2.kennWert1: ",
              baueigenschaft2.kennWert1
            );
          }
          break;
        default:
          console.log("FEHLER: Nicht unterstützte clickAction");
      }
    },

    initializeIstWerteMitSollWerten() {
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Initialisiere das Profil Model für solche Baueigenschaften, die im Layout eine Prop "initializeMitSollWert" haben, zusammen mit
      //      weiterer Prop "sollWertBaueigenschaft", die eine andere Baueigenschaft bezeichnet, mit deren Wert die aktuelle
      //      (Istwert-)Baueigenschaft initialisiert wird, falls sie null ist.
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In initializeIstWerteMitSollWerten()");
      for (let tab of this
        .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
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
                "In for in Reihenfolge der Baueigenschaften in layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
                baueigenschaftInRubrik.baueigenschaftsBezeichnung
              );
              // NEU: Initialisiere das Profil Model für solche Baueigenschaften, die im Layout eine Prop "initializeMitSollWert" haben, zusammen mit
              //      weiterer Prop "sollWertBaueigenschaft", die eine andere Baueigenschaft bezeichnet, mit deren Wert die aktuelle
              //      Baueigenschaft initialisiert wird, falls sie null ist
              // TODO XXXXXX: Für alle Wertetypen erweitern
              if (baueigenschaftInRubrik.initializeMitSollWert !== undefined) {
                let aktuelleBaueigenschaftImProfilModel = this
                  .profilModelAusgewaehlterKnoten[
                  baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten
                ];
                switch (
                  aktuelleBaueigenschaftImProfilModel.typbezogeneBaueigenschaft
                    .werteTyp
                ) {
                  case "Kennwert":
                    if (
                      // Null-Prüfung (d.h. undefiniert im BIM.click-Sinn)
                      aktuelleBaueigenschaftImProfilModel.kennWert1 == null ||
                      this.profilModelAusgewaehlterKnoten[
                        baueigenschaftInRubrik
                          .indexInProfilModelAusgewaehlterKnoten
                      ].kennWert1 === ""
                    ) {
                      // Baueigenschaft mit Default-Wert vorbelegen, wenn ihr Wert bisher null ist:
                      this.$set(
                        aktuelleBaueigenschaftImProfilModel, // Sollwert bzw. BEg, die mit Default-Wert vorzubelegen ist
                        "kennWert1",
                        this.profilModelAusgewaehlterKnoten[
                          this.layoutBaueigenschaft(
                            baueigenschaftInRubrik.sollWertBaueigenschaft
                          ).indexInProfilModelAusgewaehlterKnoten
                        ].kennWert1 // Default-Wert aus anderer BEg, die per Prop sollWertBaueigenschaft bezeichnet wurde
                      );
                    }
                    break;
                  case "Aufzählungswert":
                    if (
                      // Null-Prüfung (d.h. undefiniert im BIM.click-Sinn)
                      aktuelleBaueigenschaftImProfilModel.aufzaehlungsWert ==
                        null ||
                      aktuelleBaueigenschaftImProfilModel.aufzaehlungsWert
                        .length === 0
                    ) {
                      // Baueigenschaft mit Default-Wert vorbelegen, wenn ihr Wert bisher null ist:
                      this.$set(
                        aktuelleBaueigenschaftImProfilModel, // Sollwert bzw. BEg, die mit Default-Wert vorzubelegen ist
                        "aufzaehlungsWert",
                        this.profilModelAusgewaehlterKnoten[
                          this.layoutBaueigenschaft(
                            baueigenschaftInRubrik.sollWertBaueigenschaft
                          ).indexInProfilModelAusgewaehlterKnoten
                        ].aufzaehlungsWert // Default-Wert aus anderer BEg, die per Prop sollWertBaueigenschaft bezeichnet wurde
                      );
                    }
                    break;
                  default:
                    console.log(
                      "FEHLER: Nicht unterstützter Wertetyp bei Prop 'initializeMitSollWert'!"
                    );
                }
              }
            }
          }
        }
      }
    },

    buttonClickedWerteEingabeAnVerzweigungsKnoten() {
      // Hilfsmethode bei Button-Click
      globalStore.showBenutzerNachricht(
        BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFILFORMULAR_VERZWEIGUNGSKNOTEN_WERTEEINGABE_WARNUNG
      );
      this.eingabeFreischaltenAnVerzweigungsKnoten = true;
    },

    determineReadonly(baueigenschaft) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Methode, um mit #388 die :readonly-Prop eines Felds zu bestimmen. War früher nur abhängig von Mitarbeiterrolle, Aktiviertheit und
      // Definiertheit an einem wertevererbenden Elternknoten (wurde mit dem Code, der unten mit "selbe Logik wie :readonly Prop schon immer war",
      // direkt im Template am :readonly abgefragt, ohne Paramete baueigenschaft).
      // NEU: Mit #388 zusätzlich im Baustoffbaum Felder nur an Blattknoten nicht auf readonly setzen (zusätzlich dann bisherige Logik)
      // An Verzweigungsknoten kann über ein Flag am Profil Model oder ein Setting im Profilformular temporär :readonly abgeschaltet werden
      // Es wird als (transientes) Flag eingabeFreischaltenAnVerzweigungsKnoten verwendet, ist in data()
      // muss allerdings auf false zurückgesetzt werden in mounted(), watch() (= Refresh, dort 2-mal!) und reset()
      // Default ist: Flag ist false oder undefined, dann werden im Baustoffbaum Felder an Nicht-Blattknoten auf readonly geschaltet!
      // Das Flag kann per Button auf true gesetzt werden!
      //==================================================================================
      console.log("In determineReadonly()")
      console.log("bezeichnungWerteVererbenderElternknoten: ",
        this.profilModelAusgewaehlterKnoten[
              baueigenschaft.indexInProfilModelAusgewaehlterKnoten
            ].bezeichnungWerteVererbenderElternknoten)
      // NEU: readonly Prop aus Layout am Feld überschreibt alle anderen readonly-Logiken:
      if (baueigenschaft.readonly) return true;
      //==================================================================================
      if (this.baum === "Baustoffbaum") {
        if (this.selectedNode.baumKnotenTyp === "Blattknoten") {
          // Blattknoten, dann selbe Logik wie :readonly Prop schon immer war:
          if (
            !this.benutzerDarfBearbeitenSelectedNode ||
            this.profilModelAusgewaehlterKnoten[
              baueigenschaft.indexInProfilModelAusgewaehlterKnoten
            ].bezeichnungWerteVererbenderElternknoten != null ||
            !this.profilModelAusgewaehlterKnoten[
              baueigenschaft.indexInProfilModelAusgewaehlterKnoten
            ].aktiviertNichtDeaktiviert
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          // Verzweigungsknoten oder anderer Knotentyp im Baustoffbaum
          if (this.eingabeFreischaltenAnVerzweigungsKnoten) {
            // Wenn dieses Flag existiert und true ist, dann selbe Logik wie :readonly Prop schon immer war:
            if (
              !this.benutzerDarfBearbeitenSelectedNode ||
              this.profilModelAusgewaehlterKnoten[
                baueigenschaft.indexInProfilModelAusgewaehlterKnoten
              ].bezeichnungWerteVererbenderElternknoten != null ||
              !this.profilModelAusgewaehlterKnoten[
                baueigenschaft.indexInProfilModelAusgewaehlterKnoten
              ].aktiviertNichtDeaktiviert
            ) {
              console.log("Vor return true")
              return true;
            } else {
              console.log("Vor return false")
              return false;
            }
          } else {
            // Verzweigungsknoten im Baustoffbaum, Flag nicht vorhanden oder false, true zurückgeben, d.h. Feld auf readonly schalten
            return true;
          }
        }
      } else {
        // Bauvorhabenbaum, dort ist die Logik dieselbe wie die :readonly Prop schon immer war:
        if (
          !this.benutzerDarfBearbeitenSelectedNode ||
          this.profilModelAusgewaehlterKnoten[
            baueigenschaft.indexInProfilModelAusgewaehlterKnoten
          ].bezeichnungWerteVererbenderElternknoten != null ||
          !this.profilModelAusgewaehlterKnoten[
            baueigenschaft.indexInProfilModelAusgewaehlterKnoten
          ].aktiviertNichtDeaktiviert
        ) {
          return true;
        } else {
          return false;
        }
      }
    },

    determineFieldBackgroundColor(baueigenschaft) {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Methode, um die Hintergrundfarbe eines Felds zu bestimmen. War früher nur abhängig von
      // profilModelAusgewaehlterKnoten[baueigenschaft.indexInProfilModelAusgewaehlterKnoten].bezeichnungWerteVererbenderElternknoten
      // Seit Einführung des Buttons "Felder mit definierten Werten an Kindbaustoffen kennzeichnen" gibt es aber zusätzlich
      // eine Property bgColor, die anzeigt, ob Kindknoten mit definierten Werten existieren. Diese kann nicht im Layout abgelegt werden, denn sie ist spezifisch
      // pro Knoten und muss daher beim Wechseln des Knotens aktualisiert werden!
      // Diese Property bgColor muss in der Funktion ermittleDefiniertheitKindKnoten() nach Drücken des Buttons reaktiv in das profilModel eingetragen werden.
      // Die Property wird allerdings nicht gespeichert wie andere Flags (Performance!), sondern ist transient. Wechselt man den Knoten,
      // verschwindet sie und damit die durch diese Funktion ggf. gesetzte orangefarbige Farbe der FElder - die Funktion hier prüft deshalb ab, ob die Property existiert oder nicht!
      // HINWEIS: Ein Anlegen der Property in projiziereBaueigenschaften() erwies sich in Tests als überflüssig - das $set in ermittleDefiniertheitKindKnoten()
      // ist offenbar ausreichend - es legt die Prop, wenn nicht schon vorhanden, neu an!
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // ALT (im Layout an allen Eingabefeldern):
      /*
        :bg-color="
          profilModelAusgewaehlterKnoten[
          baueigenschaft
            .indexInProfilModelAusgewaehlterKnoten
        ].bezeichnungWerteVererbenderElternknoten != null
          ? 'cyan-2'
          : 'teal-2'
        "
      */
      // NEU - mit dieser Funktion kann im Template die Feldfarbe gesteuert werden:
      // :bg-color="determineFieldBackgroundColor(baueigenschaft)"
      if (baueigenschaft.bgColor) {
        // NEU: bgColor-Prop aus Layout bestimmt primär die Farbe
        return baueigenschaft.bgColor;
      }
      // Ansonsten:
      if (
        this.profilModelAusgewaehlterKnoten[
          baueigenschaft.indexInProfilModelAusgewaehlterKnoten
        ].bezeichnungWerteVererbenderElternknoten != null
      ) {
        return "cyan-2"; // Feld mit von Elternknoten ererbtem Wert
      } else {
        if (
          this.profilModelAusgewaehlterKnoten[
            baueigenschaft.indexInProfilModelAusgewaehlterKnoten
          ].bgColor
        ) {
          // Wird gesetzt in ermittleDefiniertheitKindKnoten() - wird nur im Baustoffbaum verwendet, ist allerdings optional, d.h. es ist unschädlich im Bauvorhabenbaum!
          return this.profilModelAusgewaehlterKnoten[
            baueigenschaft.indexInProfilModelAusgewaehlterKnoten
          ].bgColor; // Triggert orangefarbiges Feld mit definierten Werten an Kindknoten
        } else return "teal-2"; // Normalfall
      }
    },

    ermittleDefiniertheitKindKnoten() {
      //----------------------------------------------------------------------------------------------------------------------------------------------------------
      // NEU - Epic 38.o: Ermittelt die Definierheit von Kindknoten für am ausgewählten Knoten aktivierte UND UNDEFINIERTE Baueigenschaften im Profil per API
      // Bekommt vom API Array zurück mit Baueigenschaftsbezeichnungen von aktivierten UND DEFINIERTEN Baueigenschaften im Profil, die mindestens einen
      // definierten Kindknoten haben - wird aktuell dazu benutzt, diese Felder farbig zu kennzeichnen, um ein versehentliches Überschreiben der
      // Werte in den Kindknoten zu vermeiden. Ein readonly-Schalten der Felder würde das Überschreiben ganz verhindern, was zu restriktiv wäre.
      //==========================================================================================================================================================
      // TODO XXXXXX: Ist aktuell nur für Baustoffe implementiert, könnte auch für Baueinheiten brauchbar sein (allerdings sind dort im Gegensatz zum Baustoffbaum
      // Profile/Baueigenschaften an Kindknoten oft deaktiviert, es sei denn, es handelt sich um gemeinsame Baueigenschaften in mehreren Profilen,
      // die aber als Sollwerte meistens im Kindknoten auf readonly geschaltet sind!!!
      //==========================================================================================================================================================
      const apiRoute =
        process.env.API +
        "/Baustoffe/" +
        this.selectedNode._id +
        "/Baueigenschaftsprofil/Definiertheitszustand/Kindknoten";
      console.log("profilBezeichnung: ", this.profilBezeichnung);
      this.$axios // ACHTUNG: Route mit Body, muss put sein statt get!!!
        .put(apiRoute, {
          baueigenschaftsProfilBezeichnung: this.profilBezeichnung // Body-Parameter: Profilbezeichnung, zusätzlich zu Request-Parameter :id
        })
        .then(response => {
          console.log(
            "response.data.resultBaueigenschaften: ",
            response.data.resultBaueigenschaften
          );
          if (
            response.data.resultBaueigenschaften == null ||
            response.data.resultBaueigenschaften.length === 0
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_KEINE_VORHANDEN
            );
          } else {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_WARNUNG
            );
            // Nun durch den Array result mit den betroffenen Baueigenschaften, für die Kindknoten mit definierten Werten existieren, wandern
            // und deren Felder im Layout Felder farblich kennzeichnen!
            for (let baueigenschaftsBezeichnung of response.data
              .resultBaueigenschaften) {
              // NEU: Hinzufügung dieser Property per $set im Profil Model - die Property ist transient und wird absichtlich nicht gespeichert!
              // Wenn das Profil Model in mounted(), reset() oder watch() (Refresh) neu geladen wird, verschwinden diese Props absichtlich!
              // Obige Funktion determineFieldBackgroundColor() triggert dann daraus ggf. orangefarbige Kennzeichnung des Felds.
              // Siehe dazu auch Hinweise in determineFieldBackgroundColor() oben!
              this.$set(
                this.profilModelAusgewaehlterKnoten[
                  this.findeIndexVonBaueigenschaft(baueigenschaftsBezeichnung)
                ],
                "bgColor",
                "orange-3"
              );
            }
          }
        })
        .catch(error => {
          console.log("error: ", error);
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_DEFINIERTHEIT_KINDKNOTEN_ERMITTELN_FEHLER
          );
        });
    },

    layoutBaueigenschaft(baueigenschaftsBezeichnung) {
      // NEU: Convenience-Hilfsfunktion - returned das Layout für eine Baueigenschaft aus dem Layout File/JS Modul
      // Dieses enthält sämtliche Properties aus dem Layout für die Baueigenschaft
      // Parameter baueigenschaftsBezeichnung enthält Bezeichnung einer Baueigenschaft aus dem Layout bzw. Profil Model
      // Traversiert dazu das Layout, bis die Baueigenschaft gefunden wird
      //*******************************************************************************************************************************************
      // HINWEIS: Kann auch aus functions-baustoff-estrich-baueigenschafts-profil-formular.js per _self.layoutBaueigenschaft() aufgerufen werden!!!
      console.log("In layoutBaueigenschaft()");
      console.log(
        "Parameter baueigenschaftsBezeichnung:",
        baueigenschaftsBezeichnung
      );
      for (let tab of this
        .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
        for (let rubrik of tab.rubrikenInTab) {
          for (let layoutBaueigenschaft of rubrik.baueigenschaftenInRubrik) {
            // console.log("layoutBaueigenschaft: ", layoutBaueigenschaft)
            if (
              layoutBaueigenschaft.baueigenschaftsBezeichnung ===
              baueigenschaftsBezeichnung
            ) {
              console.log(
                "Vor return von layoutBaueigenschaft: ",
                layoutBaueigenschaft
              );
              return layoutBaueigenschaft;
            } // else // weitersuchen
          }
        }
      }
      // Wenn wir oben nicht bereits returned sind:
      console.log("FEHLER: Baueigenschaft nicht gefunden im Layout!");
      return null;
    },

    createComputedPropertyFromModule() {
      // Testmethode für Test von computed Properties aus JS-Modulen
      // Wurde zunächst außerhalb vom mounted() zum Testen auf Button gelegt
      console.log(
        "functionsBaustoffEstrichBaueigenschaftsProfilFormular: ",
        this.functionsBaustoffEstrichBaueigenschaftsProfilFormular
      );
      this.testComputedProperty = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
        this
      ).testComputedProperty;
      // HINWEIS: Hier wird dem Module für die computed Properties am Layout File "this" mit übergeben!
      // ACHTUNG: Hier unbedingt nicht testComputedProperty(), sondern testComputedProperty!!!
      // Andernfalls wird die computed-Funktion nicht übergeben, sondern direkt ausgeführt!!!
    },

    isValidTime(v) {
      // Feldvalidierng für Input-Felder für Zeit, mit :rules="[isValidTime]"
      // Vorlage: https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes/5563222
      if (v == null || v === "") return true; // ACHTUNG: Bei mit Tasten geleertem Feld ist v offenbar "", nicht null!
      if (v.length < 5) {
        return "Ungültige Zeit";
      }
      // Benutztes Zeitformat: HH:mm
      // Validierung mit RegExp, 24:00 ist ungültig, HH:60 ist ungültig
      return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || "Ungültige Zeit";
    },

    isValidDate(v) {
      // Feldvalidierng für Input-Felder für Datum, mit :rules="[isValidDate]"
      // Vorlage: https://codepen.io/metalsadman/pen/ZEbrjwB
      if (v == null || v === "") return true; // ACHTUNG: Bei mit Tasten geleertem Feld ist v offenbar "", nicht null!
      if (v.length < 10) {
        return "Ungültiges Datum";
      }
      // ISO standard date: YYYY-MM-DD
      // Our date is nonstandard: DD.MM.YYYY
      // Attempt to standardize it before validation:
      const standardizedDate = v
        .split(".")
        .reverse()
        .join("-"); // String umformatieren von DD.MM.YYYY nach YYYY-MM-DD
      console.log("standardizedDate ", standardizedDate); // String im Format YYYY-MM-DD
      console.log(
        "Formatiertes standardizedDate:",
        date.formatDate(standardizedDate, "DD.MM.YYYY")
      );
      return date.isValid(standardizedDate) || "Ungültiges Datum"; // Quasar date util function isValid
    },

    determineAnzahlSpaltenRubrik(rubrik) {
      // NEU: Funktion, um die Anzahl der Spalten pro Rubrik, falls dort definiert, aus dem Layout File zu entnehmen, andernfalls Default-Wert 4 Spalten returnen
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      if (rubrik.spaltenRubrik) {
        // NEU: spaltenRubrik kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
        // Beispiel für Array: spaltenRubrik: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert alternativ zu festen Spaltenbreiten potentiell unterschiedliche col-x-Werte, Summe muss 12 ergeben!
        // DONE: Die Prop wurde deshalb von anzahlSpaltenRubrik nach spaltenRubrik umbenannt!
        console.log(
          "rubrik.spaltenRubrik.length: ",
          rubrik.spaltenRubrik.length
        ); // undefined, wenn kein Array!
        if (!rubrik.spaltenRubrik.length) {
          return rubrik.spaltenRubrik;
        } // Kein Array, sondern Zahl wie bisher
        if (rubrik.spaltenRubrik.length > 0) {
          // Array mit mindestens einem Element
          return rubrik.spaltenRubrik.length;
        }
      }
      // In allen anderen Fällen (keine Prop, Array mit Länge 0):
      return 4; // Default-Wert
    },

    determineColStringSpaltenProRubrik(rubrik, spalte) {
      // NEU: Funktion, um den richtigen String für col-md-x zu returnen in Abhängigkeit von der Anzahl der Spalten pro Rubrik (4 oder 6 oder 12)
      // Hier in methods() statt computed(), da Parameter erforderlich sind. Seit für spaltenRubrik auch ein
      // Array möglich ist, wird zusätzlichr Parameter spalte benötigt für die laufende Spalte in den beiden v-fors für
      // die Zeile mit Spaltenüberschriften und die Zeile mit Baueigenschaften
      // NEU: spaltenRubrik kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
      // Beispiel für Array: spaltenRubrik: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert alternativ zu festen Spaltenbreiten potentiell unterschiedliche col-x-Werte, Summe muss 12 ergeben!
      if (!rubrik.spaltenRubrik.length) {
        // Kein Array, Logik wie bisher, gleiche Spaltenbreiten:
        switch (rubrik.spaltenRubrik) {
          case 1:
            return "col-md-12";
          case 2:
            return "col-md-6";
          case 3:
            return "col-md-4";
          case 4:
            return "col-md-3";
          case 6:
            return "col-md-2";
          case 12:
            return "col-md-1";
          default:
            return "col-md-3"; // 4 Felder
        }
      } else {
        // Array mit den col-x-Werten, unterschiedliche Spaltenbreiten
        /*
        console.log("spalte: ", spalte);
        console.log(
          "rubrik.spaltenRubrik[spalte-1]: ",
          rubrik.spaltenRubrik[spalte - 1]
        );
        */
        return "col-md-" + rubrik.spaltenRubrik[spalte - 1];
      }
    },

    determineColStringSpaltenProTab(tab) {
      // NEU: Funktion, um den richtigen String für col-md-x zu returnen in Abhängigkeit von der Anzahl der Spalten pro Tab (2 oder 3 oder 4)
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      switch (tab.anzahlSpaltenTab) {
        case 1:
          return "col-md-12";
        case 2:
          return "col-md-6";
        case 3:
          return "col-md-4";
        case 4:
          return "col-md-3";
        case 6:
          return "col-md-2";
        case 12:
          return "col-md-1";
        default:
          return "col-md-12"; // 1-spaltig
      }
    },

    baueigenschaftenRows(rubrik) {
      // NEU: Funktion, um Array mit Zeilennummern zur Anzeige in durch rubrik.spaltenRubrik spezifizierten Spalten zu returnen
      // Vorlage: https://codepen.io/mickey58/pen/eYGMPxa
      // Hier in methods() statt computed(), da Parameter erforderlich ist
      // NEU: spaltenRubrik kann Zahl sein wie bisher (1, 2, 3, 4, 6 ,12) ODER Array!
      // Beispiel für Array: spaltenRubrik: [ "2", "2", "2", "1", "2", "3" ] - spezifiziert col-x Werte, Summe muss 12 ergeben!
      // Deshalb anzahlSpalten hier neu berechnen:
      let spaltenRubrik = rubrik.spaltenRubrik.length
        ? rubrik.spaltenRubrik.length // Array, könnte allerdings auch Länge 0 haben!!!
        : rubrik.spaltenRubrik; // Zahl

      if (spaltenRubrik) {
        // Anzahl Spalten ist im Layout File spezifiziert
        return Array.from(
          Array(
            Math.ceil(rubrik.baueigenschaftenInRubrik.length / spaltenRubrik)
          ).keys()
        );
      } else {
        // Anzahl Spalten auf 4 setzen:
        return Array.from(
          Array(Math.ceil(rubrik.baueigenschaftenInRubrik.length / 4)).keys()
        );
      }
    },

    //------------------------------------------------------------------------------------------------------------------------------------------
    initialisiereAusgewaehltesTabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular() {
      //------------------------------------------------------------------------------------------------------------------------------------
      // Methode zur Initialisierung der Unter-Tabs im layoutgesteuerten generischen Baueigenschaftsprofilformular
      // TODO XXXXXX - anzupassen für layoutgesteuertes generisches Formular!
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In initialisiereAusgewaehltesTabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular()"
      );
      // TODO XXXXXX: Geborgte Funktion aus baueinheit-raum-baueigenschafts-profil-formular.vue, muss angepasst werden
      // Der Content für die fachliche Hilfe für ein Unter-Tab soll dabei aus der Property tabBeschreibung im Layout kommen!
      // this.setzeProfilFormularBezogeneFachlicheHilfe("Baueinheit > Raum", 0); // Erster Parameter ist Profil, zweiter ist Unter-Tab!
      switch (
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      ) {
        /*
        case "geometrieTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 0;
          break;
        case "geopolitischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 1;
          break;
        case "bauordnungsrechtlicheAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 2;
          break;
        case "umweltbezogeneAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 3;
          break;
        case "hydrogeologischeAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 4;
          break;
        case "grundstuecksGeometrieAngabenTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 5; // NEU
          break;
        case "anforderungenAusGeschossTabGeschossBaueigenschaftsProfilFormular":
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 6; // NEU
          break;
        */
        default:
          this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular = 0;
          break;
      }
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Da Index geändert wurde, muss auch das Enabling/Disabling hier neu berechnet werden, sonst werden bei Tab-Wechsel
      //          die falschen Felder enalbed/disabled (z.B. die eines anderen Knotens im Baum, für den vorher das Enabling/Disabling berechnet wurde,
      //          und dann der Knoten und anschließend das Tab neu ausgewählt werden.
      // NEU: Auch hier in Abhängigkeit der ausgewählten Optionen diverser Aufzählungswerte
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für dieses Profilformular entfernt!
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
      //--------------------------------------------------------------------------------------------------------------------
      // @focus-Methode für QSelects und QInputs zum Setzen der Felder und Anzeigen der fachlichen Hilfe über global Store
      // ACHTUNG: @focus funktioniert NICHT an QToggles! Daher dort @input statt @focus verwendet!
      // Verallgemeinert auch für Baueinheiten und Baustoffe!
      // ACHTUNG: Die 4 optionalen Parameter für die Bauinformation sollten, wenn diese null ist, im Template als null
      //          übergeben werden. Dadurch wird beim Anwählen von Feldern für Baueigenschaften mit fehlender Bauinformation
      //          deren Anzeige in der fachlichen Hilfe gelöscht, was sinnvoll ist!
      //---------------------------------------------------------------------------------------------------------------------
      baueigenschaftsBezeichnung,
      baueigenschaftsBeschreibung,
      anzeigeTextZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      internerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      idInternerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      externerLinkZugeordneteBauinformation, // NEU - für #379 (optionaler Parameter)
      oneDriveLinkZugeordneteBauinformation // NEU (optionaler Parameter)
    ) {
      // NEU: Für #379 Unterscheidung, in welchem Baum die Komponente arbeitet:
      if (this.baum !== "Baustoffbaum") {
        // Bauvorhabenbaum
        // Fachliche Hilfe für die ausgewählte Baueigenschaft an der Baueinheit aufsetzen:
        // baueigenschaftsBezeichnung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBezeichnung
        );
        // baueigenschaftsBeschreibung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit(
          baueigenschaftsBeschreibung
        );
        // anzeigeTextZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          anzeigeTextZugeordneteBauinformation
        ); // NEU - für #379
        // internerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          internerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // idIinternerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          idInternerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // externerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          externerLinkZugeordneteBauinformation
        ); // NEU - für #379
        globalStore.setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaueinheit(
          oneDriveLinkZugeordneteBauinformation
        ); // NEU - für #379
        this.showFachlicheHilfe("fachlicheHilfeBaueigenschaftAnBaueinheit");
      } else {
        // Baustoffbaum
        // Fachliche Hilfe für die ausgewählte Baueigenschaft am Baustoff aufsetzen:
        // baueigenschaftsBezeichnung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBezeichnungAusgewaehlteBaueigenschaftBaustoff(
          baueigenschaftsBezeichnung
        );
        // baueigenschaftsBeschreibung für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff(
          baueigenschaftsBeschreibung
        );
        // anzeigeTextZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setAnzeigeTextZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          anzeigeTextZugeordneteBauinformation
        ); // NEU - für #379
        // internerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          internerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // idIinternerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setIdInternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          idInternerLinkZugeordneteBauinformation
        ); // NEU - für #379
        // externerLinkZugeordneteBauinformation für die fachliche Hilfe für das ausgewählte Feld setzen per global Store
        globalStore.setExternerLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          externerLinkZugeordneteBauinformation
        ); // NEU - für #379
        globalStore.setOneDriveLinkZugeordneteBauinformationAusgewaehlteBaueigenschaftBaustoff(
          oneDriveLinkZugeordneteBauinformation
        ); // NEU - für #379
        this.showFachlicheHilfe("fachlicheHilfeBaueigenschaftAnBaustoff");
      }
    },

    setzeProfilFormularBezogeneFachlicheHilfe(
      //--------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Methode, um profilspezifische fachliche Hilfe für ein Profilformular zu setzen
      baueigenschaftsProfilBezeichnung, // Bezeichnung des Profils bzw. Profilformulars
      // TODO: Davon abhängig könnte auch auf dessen Beschreibung zugegriffen werden!
      baueigenschaftsProfilTab // Index des aktuell vom Benutzer angewählten Unter-Tabs im Layout File für das Profilformular - optional
      // Davon abhängig kann auf dessen Überschrift zugegriffen werden!
      // baueigenschaftsProfilRubrik // Index der Rubrik im Layout File für das Profilformular - optional - bisher nicht implementiert
      // Davon abhängig kann auf deren Überschrift zugegriffen werden!
    ) {
      globalStore.setBaueigenschaftsProfilBezeichnung(
        baueigenschaftsProfilBezeichnung
      );
      // Felder für die fachliche Hilfe setzen per global Store
      globalStore.setBaueigenschaftsProfilTabUeberschrift(
        this.layoutBaueinheitRaumBaueigenschaftsProfilFormular[baueigenschaftsProfilTab]
          .ueberschriftTab
      );
      globalStore.setBaueigenschaftsProfilTabBeschreibung(
        this.layoutBaueinheitRaumBaueigenschaftsProfilFormular[baueigenschaftsProfilTab]
          .beschreibungTab
      );
    },

    selectModelChangedAufzaehlungswert( // NEU
      // ACHTUNG: Methode ist aus dem Profilformular "Baueinheit > Standort" - wird hier nicht verwendet, nur als Vorlage im Code belassen!
      // selectModelChangedAufzaehlungswertSchichttypImBodenaufbau( // ALT
      //--------------------------------------------------------------------------------------------------------------------------------------
      // @input-Methode für QSelect für Aufzählungswerte - gilt für ALLE Aufzählungswerte im Template
      // Für bestimmte "steuernde" Aufzählungwerte:
      // a) In Abhängigkeit von der bisher ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder resetten
      // b) In Abhängigkeit von der neu ausgewählten Option für einen Aufzählungswert (per Code unten) bestimmte andere Felder enablen/disablen
      // Hinweis: Zusammen mit :value muss diese Methode in ihrem Code "manuell" das Model updaten.
      // Alternative: v-model, kommt ohne @input aus, erlaubt aber auch keinen Eingriff bei Änderungen im Model.
      // Der neue Wert für das Model wird per Parameter newSelectModelValue übergeben an die Methode.
      // Der bisherige Wert steht noch im Model.
      eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, // Parameter: Zugehörige Eigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular -
      // wird u.a. benötigt, um den Wert (Option) des richtigen Aufzählungswerts neu zu setzen im Model - ACHTUNG: Dies muss FÜR ALLE Aufzählungswerte
      // im Formular erfolgen!!!
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // Folgender Parameter wird nicht mehr benötigt, weil der Zugriff auf profilModelAusgewaehlterKnoten[] per Index
      // eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten erfolgt, und zwar nicht nur für die
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
        "Parameter eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: ",
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      );
      // Model für den per index bestimmten Aufzählungswert setzen:
      // ACHTUNG: Dies ist NICHT immer der unten gesondert behandelte Aufzählungswert "Schichttyp im Bodenaufbau", sondern kann auch ein beliebiger anderer
      //          Aufzählungswert im Formular sein!!!
      let oldSelectModelValue = this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
          .indexInProfilModelAusgewaehlterKnoten
      ].aufzaehlungsWert;
      console.log("oldSelectModelValue: ", oldSelectModelValue);
      this.profilModelAusgewaehlterKnoten[
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.indexInProfilModelAusgewaehlterKnoten
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
      // Aufruf in Abhängigkeit von tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular (Name des jeweils ausgewählten Tabs)
      //-------------------------------------------------------------------------------------------------------------------------------------
      console.log(
        "Vor spezifischem Reset/Enabling/Disabling für das ausgewählte Tab: ",
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      );
      console.log(
        "Vor Resetting und Disabling für 'steuernden' Aufzählungswert mit baueigenschaftsBezeichnung: ",
        eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
      );
      console.log(
        "ACHTUNG: Bisher nur implementiert für Tab 'Geopolitische Angaben' - sonst NoOp"
      );
      switch (
        this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      ) {
        case "lageAngabenTabStandortBaueigenschaftsProfilFormular":
          //
          break;
        case "geopolitischeAngabenTabStandortBaueigenschaftsProfilFormular":
          switch (
            //=======================================================================================================================================
            // ACHTUNG: Der folgende Code enthält hard coded bestimmte Baueigenschaftsbezeichnungen
            //          Wenn diese geändert werden, müuss der Code hier auch geändert werden!!!
            //=======================================================================================================================================
            eigenschaftInLayoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.baueigenschaftsBezeichnung
            // Alter Code aus Vorlage - disabled:
            /*
            case "Baueinheit > Standort > Geopolitik > Welt > Kontinent": {
              // In Abhängigkeit vom bisherigen Wert diverse Felder resetten:
              this.resetFelderInAbhaengigkeitVonAufzaehlungswertGeschossKontinentWelt(
                oldSelectModelValue
              );
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
              // NEU: Nun in Abhängigkeit vom neuen Wert diverse Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
              //      Diese Flags layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[n].baueigenschaftenInRubrik[m].disable steuern per :disable das Enabling/Disabling
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
            */
          ) {
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

    submitWerteAnKnoten(
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
      console.log("In submitWerteAnKnoten()");
      // console.log("Parameter tab: ", tab);
      // Vorlage-Code für Extrakt genau der Eigenschaften (aus der größeren Gesamtmenge in profilModelAusgewaehlterKnoten), die durch die im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      // enthaltenen Rubriken FUER DAS AKTUELL AUSGEWÄHLTE TAB bestimmt sind (diese Untermenge von Eigenschaften wird als Input-Felder in dem betreffenden Tab angezeigt).
      // indexFuerTabLayoutGesteuertesGenerischesProfilFormular zeigt dabei immmer auf das Element (= Objekt mit enthaltenem Array der Eigenschaften im jeweiligen Tab im Unterobjekt rubrikenInTab) des Arrays
      // layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular mit den Eigenschaften für das jeweilige Unter-Tab des Profilformulars.
      // Der Code hier wandert dann durch die Rubriken in diesem Element des Arrays, macht aktuell aber nur ein console.log der betreffenden Eigenschaften
      // Code disabled, da aktuell nicht gebraucht:
      /*
      for (let rubrik of this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[
        this.indexFuerTabLayoutGesteuertesGenerischesProfilFormular
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
        ); // HINWEIS: In der Vorlage in generisches-baueigenschafts-profil-formular.vue wird das Ergebnis erst zwischengespeichert in Variable result und dann zugewiesen.
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
        //=================================================================================================================================================
        // Nun die Date-Strings zurückkonvertieren in die von Mongoose benötigten Date Objects für die Felder datumsWert1/2:
        // ACHTUNG: Dies geht NICHT mittels Quasar Date Util formatDate (diese liefern stets Strings zurück),
        // sondern nur, nachdem der bisherige String umständlich mit dem Code unten in ein Date-Objekt umgewandelt wurde!!!
        // Die Quasar Date Utilities werden für die andere Richtung verwendet, vom Mongoose Date-Objekt nach String!!!
        // ACHTUNG: Gleichzeitig musste im Backend die Funktion pruefeWertgleichheit() angepasst werden, die auf den
        // Mongoose-Date-Objekten Wertevergleiche macht. Diese war einen obskuren Fehler "getTime is not a function" beim
        // API-Aufruf der Backend-Methode schreibeInhaltAusProfilformular() von hier aus dem Frontend. In pruefeWertgleichheit()
        // gefixt (baueigenschafts-profile-aktivierungslogik.js - siehe Kommentare dort)
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
      if (this.baum === "Bauvorhabenbaum") {
        // NEU - Wir sind im Bauvorhabenbaum
        const apiRoute =
          process.env.API + "/Baueinheiten/" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
        this.$axios
          .put(apiRoute, {
            idBaueinheit: this.selectedNode._id, // ACHTUNG: Hier idBaueinheit, nicht idBaustoff!!!
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
      } else {
        // Wir sind im Baustoffbaum
        const apiRoute = process.env.API + "/Baustoffe/" + "/Baueigenschaften"; // Macht updateMany für die im Body mitgegebenen Baueigenschaften an der im Body mitgegebenen Baueinheit
        this.$axios
          .put(apiRoute, {
            idBaustoff: this.selectedNode._id, // ACHTUNG: Hier idBaustoff, nicht idBaueinheit!!!
            wertbezogeneBaueigenschaftenArray: kopieProfilModelAusgewaehlterKnoten // NEU: FIX MS für Typo - hieß wertbezogenBueigenschaftenArray!!!
          })
          .then(success => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_ERFOLG
            );
            this.$emit("refresh-request-baueigenschafts-profil"); // TODO XXXXX: In baustoffe.vue ist beim Aufruf der Komponente
            // ein Event Handler für diesen Event anzugeben - in baustoffe.vue gibt es dafür bisher nur die nicht optimierte Methode refreshTreeBaustoffe()
          })
          .catch(error => {
            console.log("error: ", error);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUSTOFF_BAUEIGENSCHAFTSPROFIL_WERTE_SPEICHERN_FEHLER
            );
            this.$emit("refresh-request-baueigenschafts-profil"); // TODO XXXXX: In baustoffe.vue ist beim Aufruf der Komponente
            // ein Event Handler für diesen Event anzugeben - in baustoffe.vue gibt es dafür bisher nur die nicht optimierte Methode refreshTreeBaustoffe()
          });
      }
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
      //==============================================================================================================
      // ACHTUNG: Dieser Code hier war leider spezifisch für Bauvorhabenbaum (Baueinheiten) vs. Baustoffbaum (Baustoffe)!!!
      //          Der Code war ursprünglich nur für Baueinheiten (verwendete baueinheitsBezeichnung, nicht baustoffBezeichnung)
      // Daher hier 2 Fallunterscheidungen mittels der prop baum eingebaut:
      //==============================================================================================================
      this.myDatenstrukturVererbung = datenstrukturVererbung
        .filter(
          arg => arg.bezeichnungWerteVererbenderElternknoten !== undefined
        )
        .map(arg => {
          return this.baum === "Bauvorhabenbaum"
            ? arg.bezeichnungWerteVererbenderElternknoten
                .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung +
                " in " +
                arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
            : arg.bezeichnungWerteVererbenderElternknoten // Baustoffbaum
                .typbezogeneBaueigenschaft.baueigenschaftsBezeichnung +
                " in " +
                arg.werteVererbenderElternKnoten.baustoffBezeichnung;
        });
      //----------------------------------------------------------------------------------------------------------------
      // Nun obige Information zurückgeben, aber ohne den Filter:
      var result = datenstrukturVererbung.map(arg => {
        return {
          idTypbezogeneBaueigenschaft: arg.idTypbezogeneBaueigenschaft,
          baueigenschaftsBezeichnung: arg.baueigenschaftsBezeichnung,
          bezeichnungWerteVererbenderElternknoten:
            arg.werteVererbenderElternKnoten !== undefined
              ? this.baum === "Bauvorhabenbaum"
                ? arg.werteVererbenderElternKnoten.baueinheitsBezeichnung
                : arg.werteVererbenderElternKnoten.baustoffBezeichnung // Baustoffbaum
              : null
        };
      });
      return result;
    },

    projiziereBaueigenschaftenAnKnotenAufProfil(knoten, profil) {
      //--------------------------------------------------------------------------------------------------------------------------------------------
      // Sucht die Eigenschaften aus dem Profil am Knoten (Baueinheit oder Baustoff) und erzeugt erstmalig den Array profilModelAusgewaehlterKnoten,
      // welcher die Baueigenschaften mit ihren Werten enthält. Später wird dazu noch zusätzliche Vererbungsinformation hinzugefügt.
      var idsTypbezogeneBaueigenschaften = profil.zugeordneteBaueigenschaften.map(
        arg => arg.typbezogeneBaueigenschaft._id
      );
      // Finde die Eigenschaften des Profils in der Knoten (d.h. Änderungen werden am Orginal-Objekt gemacht)
      var projizierteBaueigenschaftenAnKnoten = knoten.baueigenschaften.filter(
        i =>
          idsTypbezogeneBaueigenschaften.findIndex(
            ii => i.typbezogeneBaueigenschaft._id === ii
          ) > -1
      );
      console.log(
        "projizierteBaueigenschaftenAnKnoten: ",
        projizierteBaueigenschaftenAnKnoten
      );
      // Erstelle Arbeitskopien der Elemente im Array
      var kopierteProjizierteBaueigenschaftenAnKnoten = projizierteBaueigenschaftenAnKnoten.map(
        i => Object.assign({}, i) // Erstelle Kopie des Objekts
      );
      this.profilModelAusgewaehlterKnoten = kopierteProjizierteBaueigenschaftenAnKnoten;
      //---------------------------------------------------------------------------------------------------
      // Das folgende Hinzufügen der transienten Property bgColor für #38.p (Button für Ermittlung der
      // Definiertheit an Kindknoten) ist überflüssig - das reaktive Vue $set für diese Property in
      // ermittleDefiniertheitKindKnoten() funktioniert auch ohne es!
      /*
      for (let baueigenschaft of this.profilModelAusgewaehlterKnoten) {
        baueigenschaft.bgColor = null; // NEU - #38.o: Füge Feld für Hintergrundfarbe hinzu (transient)
      }
      */
      //---------------------------------------------------------------------------------------------------
      // return kopierteProjizierteBaueigenschaftenAnKnoten;
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
      // Liest das durch die Prop profilBezeichnung spezifizierte Profil aus der Datenbank nach zuFormularGehoerigesProfil,
      // speziell die dem Profil zugeordneten Baueigenschaften, inklusive ihrer populierten typbezogenen Baueigenschaften
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
            (eigenschaft.aufzaehlungsWert === null ||
              (Array.isArray(eigenschaft.aufzaehlungsWert) &&
                eigenschaft.aufzaehlungsWert.length === 0)) && // NEU: #399, leere Arrays ([]) wie null behandeln, Klammerung um (Array.isArry() && ...) ist wichtig!
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

    resetWerteAnKnoten(
      tab // Parameter: aktuelles Tab im Formular - wird noch nicht verwendet!
    ) {
      // ALT: Hieß handleReset()
      // Resetted die eventuell im Form geänderten Werte im Profil auf die ursprünglichen Werte aus dem selektierten Node (Prop)
      // NEU: Auch hier Disabling/Enabling notwendig, weil die steuernden Werte dafür im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //      ebenfalls angepasst werden müssen!
      //--------------------------------------------------------------------------------------------------------------------------------------
      console.log("In resetWerteAnKnoten() - Parameter tab: ", tab);
      // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
      // welcher die Baueigenschaften mit ihren Werten enthält:
      this.projiziereBaueigenschaftenAnKnotenAufProfil(
        this.selectedNodeArbeitskopie,
        this.zuFormularGehoerigesProfil
      );
      //================================================================================================================================
      // NEU - provisorisch! Bauen der Vererbungsdatenstruktur beie readonly-Version skippen:
      if (!this.readonlyAusZugeordneteBaustoffeBaueinheit) {
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
      }
      console.log(
        "Nach (falls readonlyAusZugeordneteBaustoffeBaueinheit geskipptem) Join - profilModelAusgewaehlterKnoten:",
        this.profilModelAusgewaehlterKnoten
      );
      //================================================================================================================================
      // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
      //-----------------------------------------------------------------------------------------------------------------------------
      // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
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
        //========================================================================================================================================
        // NEU: Zusätzlich auch für alle Aufzählungwerte, die per q-option-group mit type="radio" angezeigt werden,
        //      den Array für aufzaehlungsWert (der aus dem Backend kommt) in einen String umwandeln!
        // GRUND: q-option-group mit type="radio" arbeitet auf Strings und erzeugt bei Auswahl ebenfalls einen String, keinen Array
        // HINWEIS: Diese Konvertierungen müssen beim Speichern zurückkonvertiert werden!
        //----------------------------------------------------------------------------------------------------------------------------------------
        if (
          eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Aufzählungswert"
        ) {
          // Finde Baueigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
          // die Konvertierung von Array nach String durch
          for (let tab of this
            .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
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
      //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
      //----------------------------------------------------------------------------------------------------------------------------------------------
      // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
      // Hier für layoutgesteuertes generisches Profilformular entfernt!
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      //===============================================================================================================================================
      // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
      this.initializeIstWerteMitSollWerten();
      //===============================================================================================================================================
      this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen
    }
  },

  //***====================================================================================================================================== */
  computed: {
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Computed-Funktionen
    //------------------------------------------------------------------------------------------------------------------------------------------------------------

    myTestComputedProperty() {
      // Für ersten Test von computed Properties am Layout File
      // Test-computed-Property, welche die aus dem JS-Module kommende this.testComputedProperty wrapped
      // HINWEIS: Man macht sich hier zunutze, dass computed Properties durchaus Methoden aufrufen dürfen!
      // PROBLEM: Weil computed Properties keine Parameter haben können, kann hier nicht die Baueigenschaft mitgegeben werden,
      //          mit welcher dann eine individuelle computed Property ausgewählt werden könnte.
      //          Es kann hier nur unspezifisch EINE bestimmte statisch vorbestimmte computed Property aus dem JS-Modul für die
      //          computed Properties des Profils verknüpft werden, was es unmöglich macht, individuelle Dinge für jedes Feld
      //          zu computen. Daher :value="methodenAufruf(baueigenschaft)" statt :value="computedProperty"!
      if (this.testComputedProperty != null) {
        // ACHTUNG: Diese undefined-Prüfung ist notwendig, um Fehler zu vermeiden, die sonst passieren, wenn mounted noch nicht durchlaufen ist!!!
        return this.testComputedProperty();
      } else {
        return null;
      }
    }
  }, // /computed

  //***=====================================================================================================================================
  watch: {
    // Watch auf ausgewaehltesBaueigenschaftsProfil
    ausgewaehltesBaueigenschaftsProfil: {
      handler: function() {
        console.log(
          "In watch von layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop ausgewaehltesBaueigenschaftsProfil erkannt - neuer Wert: ",
          this.ausgewaehltesBaueigenschaftsProfil
        );
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
          // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
          // welcher die Baueigenschaften mit ihren Werten enthält:
          this.projiziereBaueigenschaftenAnKnotenAufProfil(
            this.selectedNodeArbeitskopie,
            this.zuFormularGehoerigesProfil
          );
          //================================================================================================================================
          // NEU - provisorisch! Bauen der Vererbungsdatenstruktur beie readonly-Version skippen:
          if (!this.readonlyAusZugeordneteBaustoffeBaueinheit) {
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
          }
          console.log(
            "Nach (falls readonlyAusZugeordneteBaustoffeBaueinheit geskipptem) Join - profilModelAusgewaehlterKnoten:",
            this.profilModelAusgewaehlterKnoten
          );
          //================================================================================================================================
          // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
          //---------------------------------------------------------------------------------------------------------------------------------------------
          //===============================================================================================================================================
          // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
          this.initializeIstWerteMitSollWerten();
          //===============================================================================================================================================
          this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen - ACHTUNG: Muss 2-mal in watch() erfolgen!
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
      handler: async function(value) {
        console.log(
          "In watch von layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue: Änderung der Prop selectedNode erkannt"
        );
        //================================================================================================================================
        // NEU - provisorisch! Lese Baustoffbaumknoten (für readonly-Version)
        let apiRoute = process.env.API;
        if (
          this.readonlyAusZugeordneteBaustoffeBaueinheit &&
          this.baum === "Baustoffbaum"
        ) {
          apiRoute += "/Baustoffe/";
          let response = await this.$axios.get(
            apiRoute + this.selectedNode._id
          ); // selectedNode._id enthält die id des zu ladenden und im Profilformular anzuzeigenden Knotens im Baustofbaum
          this.selectedNodeArbeitskopie = Object.assign({}, response.data);
          //===============================================================================================================================================
        } else {
          this.selectedNodeArbeitskopie = Object.assign({}, value); // Wie bisher, wenn nicht als readonly-Formular für zueordnete Baustoffe an Baueinheit
        }
        // console.log("this.selectedNodeArbeitskopie: ", this.selectedNodeArbeitskopie)
        if (
          this.selectedNodeArbeitskopie !== null &&
          this.selectedNodeArbeitskopie !== undefined
        ) {
          // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
          // welcher die Baueigenschaften mit ihren Werten enthält:
          this.projiziereBaueigenschaftenAnKnotenAufProfil(
            this.selectedNodeArbeitskopie,
            this.zuFormularGehoerigesProfil
          );
          //================================================================================================================================
          // NEU - provisorisch! Bauen der Vererbungsdatenstruktur beie readonly-Version skippen:
          if (!this.readonlyAusZugeordneteBaustoffeBaueinheit) {
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
          }
          console.log(
            "Nach (falls readonlyAusZugeordneteBaustoffeBaueinheit geskipptem) Join - profilModelAusgewaehlterKnoten:",
            this.profilModelAusgewaehlterKnoten
          );
          //================================================================================================================================
          // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
          //--------------------------------------------------------------------------------------------------------------------------------------------------------
          // Folgender Code wandelt alle Datumswerte im Array profilModelAusgewaehlterKnoten in Strings um, für Quasar QDate Picker, welcher String-Format erfordert
          for (var i = 0; i < this.profilModelAusgewaehlterKnoten.length; i++) {
            let eigenschaft = this.profilModelAusgewaehlterKnoten[i];
            if (
              eigenschaft.typbezogeneBaueigenschaft.werteTyp === "Datumswert" ||
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
                "Datumswertepaar"
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
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Datumswertepaar"
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
            //-------------------------------------------------------------------------------------------------------------------------------------------
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
              // Finde Baueigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
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
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted () und Reset-Methode
          // Hier für layoutgesteuertes generisches Profilformular entfernt!
        }
        //------------------------------------------------------------------------------------------------------------------------------------------------
        //===============================================================================================================================================
        // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
        this.initializeIstWerteMitSollWerten();
        //===============================================================================================================================================
        this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen - ACHTUNG: Muss 2-mal in watch() erfolgen!
      }
    }
  },

  //***=====================================================================================================================================
  mounted: async function() {
    console.log(
      "In mounted() von layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue"
    );
    //-------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Mittels der Prop profilBezeichung das zum Profil gehörende Layout File in den Array
    // layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular laden.
    // Wahrscheinlich müssen dafür statisch alle vorhandenen bzw. anzuzeigenden Layout Files importiert werden, und bei Änderung
    // der Prop muss das jeweils richtige davon in den Array geladen werden.
    // Vorläufig wurde hierzu weiter oben nur das Profil "Baustoff > Estrich" importiert, mittlerweile fast alle Profile.
    switch (this.profilBezeichnung) {
      case "Baustoff":
        console.log("In case für Profil 'Baustoff'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaustoffBaueigenschaftsProfilFormular;
        // ACHTUNG/TODO XXXXXX: Das Profil "Baustoff" musste erst in back-end-server.js angelegt werden zu Testzwecken - es hat aktuell noch keine BEgs zugeordnet! -->
        break;
      //---------------------------------------------------------------------------------------------------------------------------------
      case "Baustoff > Estrich":
        console.log("In case für Profil 'Baustoff > Estrich'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaustoffEstrichBaueigenschaftsProfilFormular;
        // NEU: Für Test von Functions (computed Properties und Methods) aus JS-Modul:
        console.log(
          "functionsBaustoffEstrichBaueigenschaftsProfilFormular: ",
          this.functionsBaustoffEstrichBaueigenschaftsProfilFormular
        );
        this.testComputedProperty = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testComputedProperty; // Statisch vordefinierte computed Property zu Testzwecken aus dem JS-Modul
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHTUNG: Hier unbedingt nicht testComputedProperty(), sondern testComputedProperty!!!
        // Andernfalls wird die computed-Funktion nicht übergeben, sondern direkt ausgeführt!!!utBaustoffEstrichBaueigenschaftsProfilFormular(this).testComputedProperty
        this.testSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSetMethod;
        // HINWEIS: Hier wird dem Module für Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSetMethod(), sondern testSetMethod
        this.testGeneralSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralSetMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralSetMethod(), sondern testGeneralSetMethod
        this.testSpecificSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSpecificSetMethod;
        // HINWEIS: Hier wird dem Module für Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSetMethod(), sondern testSetMethod
        this.sollIstWertePaarSetMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).sollIstWertePaarSetMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificSetMethod(), sondern testSpecificSetMethod
        this.testSpecificReadonlyMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testSpecificReadonlyMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificReadonlyMethod(), sondern testSpecificReadonlyMethod
        this.testGeneralReadonlyMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralReadonlyMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralReadonlyMethod(), sondern testGeneralReadonlyMethod
        this.testGeneralInitializeMethod = this.functionsBaustoffEstrichBaueigenschaftsProfilFormular(
          this
        ).testGeneralInitializeMethod;
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testGeneralInitializeMethod(), sondern testGeneralInitializeMethod
        break;
      //-------------------------------------------------------------------------------------------------------------------------------------------
      case "Allgemein > Test > Wertetypen":
        console.log("In case für Profil 'Allgemein > Test > Wertetypen'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutAllgemeinTestWertetypenBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Bauvorhaben":
        console.log("In case für Profil 'Baueinheit > Bauvorhaben'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitBauvorhabenBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Standort":
        console.log("In case für Profil 'Baueinheit > Standort'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitStandortBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Gebäude":
        console.log("In case für Profil 'Baueinheit > Gebäude'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitGebaeudeBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Geschoss":
        console.log("In case für Profil 'Baueinheit > Geschoss'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitGeschossBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Raum":
        console.log("In case für Profil 'Baueinheit > Raum'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitRaumBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Boden":
        console.log("In case für Profil 'Baueinheit > Boden'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitBodenBaueigenschaftsProfilFormular;
        // NEU: Spezifische Funktion für dieses Layout
        // Wird aktuell nicht mehr benutzt, daher disabled
        //==============================================================================================================================
        // HINWEISE:
        // Stattdessen wird die generalisierte Methode generalClickMethod() hier in dieser vue-Komponente benutzt!
        // Bei Bedarf können spezifische Methoden für ein Profil/Layout aber so wie sollIstWertePaarSetMethod() hier deklariert und
        // aus dem Layout aufgerufen werden, als @click-Methoden an Buttons, oder als :value="method()" - dies macht aber nur für
        // readonly-Felder Sinn. Die Initialisierung von Feldern mit Default-Werten erfolgt generalisiert in der Methode
        // initializeIstWerteMitSollWerten(), angesteuert über Prop initializeMitSollWert im Layout auf den betroffenen Feldern
        //==============================================================================================================================
        /*
        this.sollIstWertePaarSetMethod = this.functionsBaueinheitBodenBaueigenschaftsProfilFormular(
          this
        ).sollIstWertePaarSetMethod;
        */
        // HINWEIS: Hier wird dem Module für die Functions am Layout File "this" mit übergeben!
        // ACHUTNG: Hier ebenfalls nicht testSpecificSetMethod(), sondern testSpecificSetMethod
        break;
      case "Baueinheit > Bodenaufbau":
        console.log("In case für Profil 'Baueinheit > Bodenaufbau'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitBodenaufbauBaueigenschaftsProfilFormular;
        break;
      case "Baueinheit > Schicht":
        console.log("In case für Profil 'Baueinheit > Schicht'");
        this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutBaueinheitSchichtBaueigenschaftsProfilFormular;
        console.log(
          "FEHLER: Profil 'Baueinheit > Schicht' wird aktuell im layoutgesteuerten generischen Profilformular nicht unterstützt!"
        );
        // ACHTUNG: Das Layout für "Baueinheit > Schicht" ist spezifisch, es hat keine Unter-Tabs und kann daher aktuell noch nicht angezeigt werden!
        break;
      default:
        console.log(
          "FEHLER: Nicht unterstützte Profilbezeichnung im layoutgesteuerten generischen Profilformular: ",
          this.profilBezeichnung
        );
        break;
    }
    //--------------------------------------------------------------------------------------------------------------------------------------
    // NEU: Im Template oben 2 v-fors eingebaut:
    // a) Für q-tabs, iterieren auf layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.ueberschriftTab
    // b) Für q-tab-panels, iterieren auf layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular.ueberschriftTab
    // Das v-model für beide ist tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular, das hier in mounted() initialisiert wird:
    this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular = this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular[0].ueberschriftTab; // TODO XXXXXX - vorläufig auf erstes Tab initialisiert
    console.log(
      "tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: ",
      this.tabLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
    );
    //--------------------------------------------------------------------------------------------------------------------------------------
    // this.readAlleBaueigenschaftsProfile(); // NEU: Für QSelect zur Auswahl des Profils im generischen Formular - wird hier nicht benötigt
    this.readZugehoerigesProfil()
      .then(async () => {
        console.log("Erfolg aus readZugehoerigesProfil()");
        console.log("Erstelle Arbeitskopie des im Baum selektierten Knotens");
        //================================================================================================================================
        // NEU - provisorisch! Lese Baustoffbaumknoten (für readonly-Version)
        let apiRoute = process.env.API;
        if (
          this.readonlyAusZugeordneteBaustoffeBaueinheit &&
          this.baum === "Baustoffbaum"
        ) {
          apiRoute += "/Baustoffe/";
          let response = await this.$axios.get(
            apiRoute + this.selectedNode._id
          ); // selectedNode._id enthält die id des zu ladenden und im Profilformular anzuzeigenden Knotens im Baustofbaum
          this.selectedNodeArbeitskopie = Object.assign({}, response.data);
          //===============================================================================================================================================
        } else {
          this.selectedNodeArbeitskopie = Object.assign({}, this.selectedNode);
        }
        // console.log("this.selectedNodeArbeitskopie: ", this.selectedNodeArbeitskopie)
        if (this.selectedNode !== null && this.selectedNode !== undefined) {
          // Suche die Eigenschaften aus dem Profil am Knoten im Baum heraus und erzeuge erstmalig den Array profilModelAusgewaehlterKnoten,
          // welcher die Baueigenschaften mit ihren Werten enthält:
          this.projiziereBaueigenschaftenAnKnotenAufProfil(
            this.selectedNodeArbeitskopie,
            this.zuFormularGehoerigesProfil
          );
          //================================================================================================================================
          // NEU - provisorisch! Bauen der Vererbungsdatenstruktur beie readonly-Version skippen:
          if (!this.readonlyAusZugeordneteBaustoffeBaueinheit) {
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
          }
          console.log(
            "Nach (falls readonlyAusZugeordneteBaustoffeBaueinheit geskipptem) Join - profilModelAusgewaehlterKnoten:",
            this.profilModelAusgewaehlterKnoten
          );
          //================================================================================================================================
          // this.baueIndexMapFuerProfilModelAusgewaehlterKnoten(); // Aktuell nicht verwendet, siehe Kommentare oben
          //-----------------------------------------------------------------------------------------------------------------------------
          // NEU: Initialisiere den Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular mit der Layout-Information für dieses Formular,
          // der im Template per v-for traversiert wird zum Rendern des Baueigenschaftsprofilformulars

          // Initialisiere zunächst alle Felder baueigenschaftInRubrik.indexInProfilModelAusgewaehlterKnoten im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
          // Dazu die Funktion findeIndexVonBaueigenschaft() rufen mit der jeweils im Array für jede Baueigenschaft statisch vordefinierten baueigenschaftsBezeichnung:

          // console.log("layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular: ", this.layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular)
          for (let tab of this
            .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
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
                    "In for in Reihenfolge der Baueigenschaften in layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular - aktuell iterierte baueigenschaftInRubrik: ",
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
          //      diverse andere Felder disablen/enablen, per Flag im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular
          //----------------------------------------------------------------------------------------------------------------------------------------------
          // this.disableFelderInAbhaengigkeitVonAufzaehlungswerten(); // Gemeinsame Funktion zwischen watch(), mounted() und Reset-Methode
          // Hier für layoutgesteuertes generisches Profilformular entfernt!
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
              eigenschaft.typbezogeneBaueigenschaft.werteTyp ===
              "Datumswertepaar"
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
            //----------------------------------------------------------------------------------------------------------------------------------------
            // DONE: Obiger Code zur Konvertierung des Datumsformats auf dem "Hinweg" muss in mounted(), reset() und in watch() (= Refresh) ausgeführt werden!
            // DONE: Geänderte Werte von datumsFeld1/2 müssen nach derzeitigem Design auf dem "Rückweg" VOR Speicherung wieder in das Mongoose-Format
            //       zurückverwandelt werden, denn Mongoose akzeptiert nur sein eigenes Format, nicht ein String-Format für Dates!
            //       Vorlage: In baueinheiten.vue wird ebenfalls eine solche Rückverwandlung gemacht in updateAusgewaehlteBaueigenschaft(), per:
            //       this.ausgewaehlteBaueigenschaft.datumsWert1 = date.formatDate(
            //          this.ausgewaehlteBaueigenschaft.datumsWert1, // Erfordert normalerweise Date Objekt als 1. Parameter, nicht String!
            //          "YYYY-MM-DD") // Ausnahme: Akzeptiert auch String im Format "YYYY-MM-DD"
            //       Dies erfolgt in submitWerteAnKnoten()
            //       ACHTUNG: In baueinheiten.vue etc. ist datumsWert1/2 aber nicht wie hier (wegen Konvertierung auf dem "Hinweg" in mounted() etc., weil QDate (wie QTime) nur mit
            //       Strings arbeitet) im Format String, sondern im UTC-Date-Format. Hier in baueigenschafts-profil-formulare.vue ist wegen der Konvertierung nach
            //       String auf dem "Hinweg" dann auf dem "Rückweg" vor Aufruf von formatDate() (in submitWerteAnKnoten()) zuerst eine Konvertierung
            //       von datumsWert1 von String nach Date durchgeführt werden!!! Siehe Kommentare in submitWerteAnKnoten().
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
              // Finde Baueigenschaft im Array layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular und führe, falls Boolean-Feld "radio" gesetzt ist.
              // die Konvertierung von Array nach String durch
              for (let tab of this
                .layoutLayoutGesteuertesGenerischesBaueigenschaftsProfilFormular) {
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
          //       resetWerteAnKnoten() und Watch für selectedNode
          // DONE: Aufzählungswerte für type="radio" im Format String müssen auf dem "Rückweg" VOR Speicherung wieder in Arrays zurückkonvertiert werden,
          //       in submitWerteAnKnoten()
          //========================================================================================================================================
        }
        //===============================================================================================================================================
        // NEU: Felder mit Default-Werten initialisieren (Steuerung per Props aus Layout);
        this.initializeIstWerteMitSollWerten();
        //===============================================================================================================================================
        console.log("✅✅✅ $refs: ", this.$refs);
        this.eingabeFreischaltenAnVerzweigungsKnoten = false; // NEU: Für #388 transientes Flag zurücksetzen
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
.color-teal-2 {
  color: rgb(178, 223, 219); /* teal-2, per Color Picker ermittelt */
}
.color-red {
  color: red;
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
