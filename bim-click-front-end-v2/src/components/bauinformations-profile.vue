<template>
  <q-page class="q-pa-none"> <!--NEU: Hier vor Verschiebung dieser Komponente von /pages nach /components class="q-pa-xs", nach Verschhiebung -->
                             <!--     trat damit ein zu großer Abstand zwischen der ersten und zweiten grauen Untertableiste auf, daher seither "q-pa-none"! -->
    <!-- Die folgende q-card disabled, sie ist nicht notwendig, verbraucht nur zusätzlichen vertikalen Space -->
    <!-- <q-card class="q-pa-xs"> -->
    <!-- =============================================================================================================================== -->
    <q-tabs mobile-arrows
      v-model="tabBauinformationsProfile"
      class="q-pa-none text-black bg-grey-4 full-width"
      active-color="primary"
      active-bg-color="white"
      content-class="text-h7"
      dense
      align="left"
    >
      <q-tab
        name="uebersichtTabBauinformationsProfile"
        label="Übersicht aller Bauinformationsprofile"
        no-caps
      />
      <q-tab
        name="detailsTabBauinformationsProfil"
        label="Details zum ausgewählten Bauinformationsprofil"
        no-caps
        :disable="selectedBauinformationsProfil == null"
      />
      <q-tab
        :disable="!benutzerDarfBearbeitenBauinformationsProfile"
        name="neuanlageTabBauinformationsProfil"
        label="Neuanlage eines Bauinformationsprofils"
        no-caps
      />
    </q-tabs>
    <q-tab-panels v-model="tabBauinformationsProfile">
      <!-- ACHTUNG: Hier kein keep-alive möglich!!! Grund: Wenn eine Bauinformation für ein in "Übersicht" ausgewähltes Profil zunächst in "Vorgabewerte" bearbeitet wird, und dann -->
      <!--          im Tab "Übersicht" das Profil gewechselt wird, bekommt das Tab "Vorgabewerte" diese Änderung nicht mit und zeigt eine leere Bauinformation an (FEHLER) -->
      <!--          keep-alive ist auf dieser unteren Ebene nicht unbedingt notwendig, verwirrt eventuell sogar, weil der Benutzer dann eventuell -->
      <!--          gar nicht mitbekommt, dass er das Profil gewechselt hat (weil das Tab dasselbe bliebe) -->
      <!--          Wenn keep-alive gewünscht würde, müsste die Komponente für die Vorgabewerte diesen Fall explizit handlen -->
      <q-tab-panel name="uebersichtTabBauinformationsProfile" class="q-pa-xs">
        <!-- ACHTUNG: uebersichtTabBauinformationsProfile enthält eine Tabelle für die Profile. Deren ausgewählte Row wird über prop selectedRowsTableaueigenschaftsProfile festgelegt. -->
        <!-- Im Unterschied dazu enthält die analoge Komponente bauinformations-profile-tab-baustoffe-und-baueinheiten diese Tabelle direkt und steuert die ausgewählte -->
        <!-- Zeile selbst über selected.sync="internalSelectedRowsTableBauinformationsProfile" -->
        <!-- NEU - Formatierung mit stringify -->
        <!-- Vorlage: https://stackoverflow.com/questions/45539735/prettify-json-string-vuejs2-webpack -->
        <!-- Erfordert Vue v-html und computed Property, die JSON.stringify aufruft! -->
        <pre
          v-if="localStore.state.debugMode"
          v-html="stringifyAlleBauinformationsProfile"
        ></pre>
        <uebersichtTabBauinformationsProfile
          :dataTableBauinformationsProfile="alleBauinformationsProfile"
          :columnsTableBauinformationsProfile="
            columnsTableBauinformationsProfile
          "
          :selectedRowsTableBauinformationsProfile="
            selectedBauinformationsProfil
          "
          @selection-changed-table-bauinformations-profile-bauinformations-profil="
            selectionHandlerUebersichtBauinformationsProfile
          "
          @change-tab-request-bauinformations-profil="onTabChangeRequest"
          @delete-request-bauinformations-profil="
            deleteSelectedBauinformationsProfilDialog = true
          "
        />
        <!-- <br /> -->
        <!-- ALT: v-if="$q.screen.gt.xs" -->
        <div
          class="flex row full-width q-pa-xs q-col-gutter-xs
          "
        >
          <div class="col-md-3 col-12 text-caption">
            Aktionen für Bauinformationsprofile
            {{ displayRightArrow }}
            <br />
            <!-- &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -->
            Mit
            <q-checkbox v-model="alwaysOn" disable dense color="primary" />
            in der ersten Spalte zuerst Bauinformationssprofil auswählen.
            Alternativ mit rechter Maustaste Kontextmenü aufrufen.
            <!-- <br />&nbsp; <br /> -->
          </div>
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" class="q-mr-sm" -->
            <q-btn
              class="stretch full-width"
              label="Bauinformationsprofil anzeigen / bearbeiten"
              color="secondary"
              glossy
              push
              no-caps
              :disable="selectedBauinformationsProfil === null"
              @click="
                tabBauinformationsProfile = 'detailsTabBauinformationsProfil'
              "
            />
          </div>
          <!-- TODO  @click="openEigenschaftAuswahl()" -->
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" class="q-mr-sm" -->
            <q-btn
              class="stretch full-width"
              :disable="
                selectedBauinformationsProfil === null ||
                  !benutzerDarfBearbeitenBauinformationsProfile
              "
              label="Bauinformationsprofil löschen"
              color="negative"
              glossy
              push
              no-caps
              @click="deleteSelectedBauinformationsProfilDialog = true"
            />
          </div>
          <!-- ALT (ohne Confirmation Dialog): @click="deleteSelectedBauinformation()"-->
          <!-- <q-separator vertical inset /> -->
          <!-- TODO: QSeparator funktioniert nicht, evtl. mit q-toolbar probieren: https://quasar.dev/vue-components/separator -->
          <div class="col-md-3 col-12">
            <!-- ALT:  style="width:90%" -->
            <q-btn
              class="stretch full-width"
              :disable="!benutzerDarfBearbeitenBauinformationsProfile"
              label="Bauinformationsprofil neu anlegen"
              glossy
              push
              color="green-8"
              @click="
                tabBauinformationsProfile = 'neuanlageTabBauinformationsProfil'
              "
              no-caps
            />
          </div>
        </div>
        <!--
        <br />
        <br />
        <div class="row justify-center">
          <q-card
            class="q-pa-sm bg-red text-white text-bold shadow-2" style="max-width: 700px"
          >
            <br/>
            Hinweis: Bitte die Funktionen in diesem Teil noch nicht benutzen. Wir bitten um etwas Geduld.
            <br/>
            <br/>
          </q-card>
        </div>
        -->
      </q-tab-panel>
      <q-tab-panel name="detailsTabBauinformationsProfil" class="q-pa-xs">
        <!-- ACHTUNG: -->
        <!--Aus Vorlage, hier entfernt: -->
        <!--@selection-changed-table-zugeordnete-bauinformationen-bauinformations-profil="
              selectionHandlerVorgabeWerteBauinformationsProfile
            "
        -->
        <detailsTabBauinformationsProfil
          modus="Bearbeitung"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBauinformationenAusgewaehltesBauinformationsProfil="
            alleBauinformationen
          "
          :zuModifizierendesBauinformationsProfil="
            selectedBauinformationsProfil
          "
          @refresh-request-bauinformations-profil="
            refreshBauinformationsProfile
          "
          @error-bezeichnung-bauinformations-profil="showErrorNotification"
        />
      </q-tab-panel>
      <q-tab-panel name="neuanlageTabBauinformationsProfil" class="q-pa-xs">
        <detailsTabBauinformationsProfil
          modus="Neuanlage"
          :alleBauinformationen="alleBauinformationen"
          :selectOptionsBauinformationenAusgewaehltesBauinformationsProfil="
            alleBauinformationen
          "
          @refresh-request-bauinformations-profil="
            refreshBauinformationsProfile
          "
          @error-bezeichnung-bauinformations-profil="showErrorNotification"
        />
      </q-tab-panel>
    </q-tab-panels>
    <!-- </q-card> -->
    <!-- NEU: Dialog für Confirmation des Löschens einer Bauinformation: -->
    <q-dialog
      v-if="selectedBauinformationsProfil"
      v-model="deleteSelectedBauinformationsProfilDialog"
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
              Soll das Bauinformationsprofil
              <b
                >"{{
                  selectedBauinformationsProfil.bauinformationsProfilBezeichnung
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
                @click="deleteSelectedBauinformationsProfil()"
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
  </q-page>
</template>
<script>
//***==================================================================================================================================================
// DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
//----------------------------------------------------------------------------------------------------------------
// Komponenten für Bauinformationsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
import uebersichtTabBauinformationsProfile from "../components/uebersicht-tab-bauinformations-profile.vue";
import detailsTabBauinformationsProfil from "../components/details-tab-bauinformations-profil.vue";
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
import BenutzerNachrichtenTypen from "../modules/benutzer-nachrichten-typen.js";
//----------------------------------------------------------------------------------------------------------------
/*
import dummy from '../components/dummy-component.vue'
import bearbeitung from '../components/bearbeitung-profil-eigenschaft-defaultwerte.vue'
*/
//***==================================================================================================================================================
export default {
  name: "BauinformationsProfile", // Vue Component Name - ACHTUNG - dabei beachten:
  // Exkurs zu Vue Component Names:
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
  //***================================================================================================================================
  components: {
    // DONE: Auch die Component Names hier sollten CamelCase-Namen haben!
    //----------------------------------------------------------------------------------------------------------------
    // Komponenten für Bauinformationsprofile - diese bedienen das jeweilige Tab, INKLUSIVE Speichern und Zurücksetzen
    uebersichtTabBauinformationsProfile,
    detailsTabBauinformationsProfil // Diese Komponente wird je nach Parameter modus für Bearbeiten und Neuanlage von Bauinformationsprofilen verwendet!
    //----------------------------------------------------------------------------------------------------------------
    // dummy,
    // bearbeitung
  },

  //***================================================================================================================================
  data: () => {
    return {
      deleteSelectedBauinformationsProfilDialog: false,
      localStore: globalStore,
      alwaysOn: true,
      displayRightArrow: "\u2192", // Konstante für Rechtspfeil, in Moustaches {{displayRightArrow}} oben benutzt
      // Vorerst liegen diese Sachen hier:
      alleBauinformationsProfile: [],
      alleBauinformationen: [],
      selectedBauinformationsProfil: null,
      tabBauinformationsProfile: "uebersichtTabBauinformationsProfile",
      columnsTableBauinformationsProfile: [
        {
          name: "bauinformationsProfilBezeichnung",
          label: "Bezeichnung des Bauinformationsprofils",
          field: row => row.bauinformationsProfilBezeichnung,
          align: "left",
          sortable: true
        },
        {
          name: "bauinformationsProfilBemerkung",
          label: "Bemerkung zum Bauinformationsprofil",
          field: row => row.bauinformationsProfilBemerkung,
          align: "left",
          sortable: true,
          //===========================================================================================================================================
          // NEU: Column Width für potentiell lange Bemerkungen hier begrenzen, Vorlage: https://codepen.io/metalsadman/pen/XWXVNoZ
          // format: val => `${val}`, // NEU - nicht notwendig
          classes: "ellipsis", // NEU - unbedingt notwendig, um Text abzuschneiden mit "..." hinten, ohne das ragt dieser nach rechts ins nächste Feld!
          style: "max-width: 600px", // NEU
          headerStyle: "max-width: 600px" // NEU
          //===========================================================================================================================================
        }
        /*
        {
          name: "bauinformationsBezeichnungZugeordneteBauinformation",
          label: "Bauinformationsbezeichnung",
          field: row =>
            row.zugeordneteBauinformation != null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.zugeordneteBauinformation.bauinformationsBezeichnung
              : null,
          align: "left",
          sortable: true
        },
        {
          name: "bauinformationsTypZugeordneteBauinformation",
          label: "Bauinformationstyp",
          field: row =>
            row.zugeordneteBauinformation != null // NEU: Zusätzlich eingefügt, sonst undefined Fehler beim Rendern der QTable!!!
              ? row.zugeordneteBauinformation.bauinformationsTyp
              : null,
          align: "left",
          sortable: true
        }
        */
        // TODO XXXXXX: Hier weitere Columns (Bemerkung, Bauinformation, eventuell: zugeordnete Bauinformationen per read-only Dropdown-Menü (q-select))
      ]
    };
  },

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    stringifyAlleBauinformationsProfile: function() {
      return JSON.stringify(this.alleBauinformationsProfile, null, 2);
    },

    benutzerDarfBearbeitenBauinformationsProfile: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an Bauinformationsprofilen
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenBauinformationsprofile
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeitenBauinformationsprofile
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // Administrator oder Redakteur
        return true;
      }
    }
  }, // /computed:

  //***==================================================================================================================================================
  methods: {
    deleteSelectedBauinformationsProfil() {
      //------------------------------------------------------------------------------------------------------------------------------b
      // API-Call um das in selectedBauinformationsProfil befindliche Bauinformationsprofil zu löschen
      if (this.selectedBauinformationsProfil !== null) {
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        console.log("Vor Emit to leave room 'roomBauinformationsprofile'");
        this.$socket.emit("leaveRoom", {
          room: "roomBauinformationsprofile"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBauinformationsprofile'");
        //=========================================================================================================================================
        this.$axios
          .delete(
            process.env.API +
              "/Bauinformationsprofile/" +
              this.selectedBauinformationsProfil._id
          )
          .then(doc => {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_ERFOLG
            );
            this.selectedBauinformationsProfil = null; // Clear selection
            this.refreshBauinformationsProfile();
            this.deleteSelectedBauinformationsProfilDialog = false;
          })
          .catch(error => {
            console.log("error: ", error);
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFTSPROFIL_LOESCHEN_FEHLER
            );
          });
      }
    },

    onTabChangeRequest(anzuwaehlendesTab) {
      //------------------------------------------------------------------------------------------------------------------------------b
      // Aufruf, Wenn Kindkomponenten einen Tabchange in dieser Komponente anfordern
      switch (anzuwaehlendesTab) {
        case "Bearbeitung":
          this.tabBauinformationsProfile = "detailsTabBauinformationsProfil";
          break;
        case "Neuanlage":
          this.tabBauinformationsProfile = "neuanlageTabBauinformationsProfil";
          break;
        default:
          throw new Error("Invalid Argument in on TabChangeRequest");
      }
    },

    selectionHandlerUebersichtBauinformationsProfile(newSelected) {
      //------------------------------------------------------------------------------------------------------------------------------b
      // Setzt das Object selectedBauinformationsProfil auf newSelected
      // Wird verwendet, wenn in Unterkomponenten ein anderes Profil ausgewaehlt wird
      console.log("In selectionHandlerUebersichtBauinformationsProfile()");
      console.log("Parameter newSelected: ", newSelected);
      if (newSelected.length > 0) {
        this.selectedBauinformationsProfil = newSelected[0];
      } else {
        this.selectedBauinformationsProfil = null;
      }
    },

    showErrorNotification(sender, error) {
      // Unterkomponenten teilen ihre Fehler mit, diese Page zeigt sie dann mittels des global-stores an.
      console.log("In showErrorNotification: ", error);
      if (!error.hasOwnProperty("response")) {
        // Fehler ohne Backend-Beteiligung (z.B. Validation-Fehler)
        globalStore.showBenutzerNachricht(
          BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER_LEERES_NAMENSFELD
        );
      } else {
        switch (sender) {
          case "Neuanlage":
            console.log(error.response.status);
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_NEUANLAGE_FEHLER
              );
            }
            break;
          case "Bearbeitung":
            if (error.response.status === 403) {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_BEZEICHNUNG_BEREITS_VERGEBEN
              );
            } else {
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.BAUINFORMATIONSPROFIL_AENDERUNG_FEHLER
              );
            }
            break;
          default:
            // Sonst zeige DEFAULT_FEHLERNACHRICHT
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.DEFAULT_FEHLERNACHRICHT
            );
        }
      }
    },

    refreshBauinformationsProfile(eventArgsModus, payload) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Lädt alle Daten aus dem Backend neu
      // eventArgsModus: "Neuanlage" oder "Bearbeitung" - wird nicht verwendet (d.h. unbedingter Refresh) - dafür wird die payload herangezogen
      //                  TODO: Umschreiben, dass zur Steuerung nicht die payload, sondern eventArgModus herangezogen wird
      // payload: id, welches Bauinformationsprofil (Wieder nach Update) ausgewählt werden soll (bei "Neuanlage" wird darin die id des neuen Profils mitgegeben)
      //          Bei Bearbeitung wird statt payload die id aus selectedBauinformationsProfil entnommen.
      //          Kann/sollte also im Fall "Bearbeitung" leer sein
      console.log("In refreshBauinformationsProfile()");
      console.log("eventArgsModus: ", eventArgsModus);
      console.log("payload: ", payload);
      let idGewuenschteAuswahlTabelleBauinformationsprofile = null;
      if (payload != null && payload !== undefined) {
        idGewuenschteAuswahlTabelleBauinformationsprofile = payload;
      } else {
        if (this.selectedBauinformationsProfil !== null) {
          console.log(this.selectedBauinformationsProfil);
          idGewuenschteAuswahlTabelleBauinformationsprofile = this
            .selectedBauinformationsProfil._id; // id der bisherige Table Selection merken, sonst null
        } else {
          // Es war kein Bauinformationsprofil ausgewählt - nichts zu tun
        }
      }
      // Jetzt weitermachen mit Refresh:
      this.$axios
        .get(process.env.API + "/Bauinformationsprofile")
        .then(doc => {
          console.log("Alle Bauinformationsprofile - doc:", doc);
          this.alleBauinformationsProfile = doc.data;
          if (idGewuenschteAuswahlTabelleBauinformationsprofile !== null) {
            // Ausgewähltes Bauinformationsprofil ggf. wiederfinden und Table Selection darauf setzen
            this.selectedBauinformationsProfil = this.alleBauinformationsProfile.find(
              arg =>
                arg._id === idGewuenschteAuswahlTabelleBauinformationsprofile
            );
          }
          if (payload != null && payload !== undefined) {
            this.tabBauinformationsProfile = "detailsTabBauinformationsProfil";
          }
        })
        .catch(error => {
          // NEU - catch-Block fehlte!!!
          console.log(
            "Fehler beim Lesen aller Bauinformationen - error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUEIGENSCHAFTSPROFILE_LESEN_FEHLER
          );
          this.tabBauinformationsProfile =
            "uebersichtTabBauinformationsProfile";
        });
    }
  },

  //***==================================================================================================================================================
  mounted() {
    //---------------------------------------------------------------------------------------------------------------------------------
    // Mounted-Funktion, für Initialisierungen beim Laden der Komponente
    //---------------------------------------------------------------------------------------------------------------------------------
    console.log("In mounted() von bauinformations-profile.vue");
    // NEU: JWT Header setzen für Axios Calls an das Backend:
    const myJWTToken = localStorage.getItem("jwtToken");
    console.log("Token geholt");
    // console.log("jwtToken: ", myJWTToken); // Disabled aus Security-Gründen
    // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
    // Vorlage: https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport
    this.$axios.defaults.headers.common["Authorization"] =
      "bearer " + myJWTToken;

    let bauinformationenGetError = true;
    let bauinformationsProfileGetError = true;
    console.log("process.env.API: ", process.env.API);
    this.$axios
      .get(process.env.API + "/Bauinformationen/Extrakt")
      .then(doc => {
        // console.log("Alle Bauinformationen - doc:", doc);
        console.log("Success beim Get des Extrakts aller Bauinformationen");
        this.alleBauinformationen = doc.data;
        bauinformationenGetError = false;
      })
      .then(() => this.$axios.get(process.env.API + "/Bauinformationsprofile"))
      .then(doc => {
        // console.log("Alle Bauinformationsprofile - doc:", doc);
        console.log("Success beim Get aller Bauinformationsprofile");
        this.alleBauinformationsProfile = doc.data;
        bauinformationsProfileGetError = false;
      })
      .catch(error => {
        if (bauinformationenGetError) {
          console.log(
            "Fehler beim Get für alle Bauinformationen- error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONEN_LESEN_FEHLER
          );
        } else {
          // Wenn wir hier sind, ist der Get für die Bauinformationsprofile fehlgeschlagen
          console.log(
            "Fehler beim Get für alle Bauinformationsprofile- error: ",
            error
          );
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.BAUINFORMATIONSPROFILE_LESEN_FEHLER
          );
        }
      });
  }
};
</script>
