<template>
  <q-card class="q-pa-xs">
    <div v-if="copyOfProps.baueigenschaftsBezeichnung !== null">
      <p class="text-h6" v-if="$q.screen.gt.sm">
        Beschreibung für ausgewählte Baueigenschaft <strong>"{{
          copyOfProps.baueigenschaftsBezeichnung
        }}"</strong>
      </p>
      <p class="text-subtitle1" v-else>
        Beschreibung für ausgewählte Baueigenschaft <strong>"{{
          copyOfProps.baueigenschaftsBezeichnung
        }}"</strong>
      </p>
    </div>
    <!-- Felder für das Editieren des Markdowns mit q-input und q-markdown: -->
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <div class="col-md-6 col-12">
        <strong>Eingabe (im Markdown-Format)</strong>
        <!-- ACHTUNG: no-html wegen Security!!! -->
        <!-- ACHTUNG: Tests ergeben, dass bei q-input standout="..." die Textfarbe immer weiß ist, -->
        <!-- auch wenn standout="bg-green-1 text-black" angegeben wird!!! -->
        <!-- Textfarbe weiß ist aber bei Hintergrundfarbe green-1 (sollte gleich wie in fachlicher Hilfe sein) nicht lesbar! -->
        <!-- Deshalb das q-input Feld auf q-input square umgestellt, color="green-1" beeinflusst den Strich unten -->
        <!-- wenn das Feld im Fokus ist -->
        <q-input
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          v-model="copyOfProps.baueigenschaftsBeschreibung"
          square
          dense
          type="textarea"
          color="green-1"
          bg-color="green-1"
          debounce="300"
          autofocus
          autogrow
          no-html
        >
        </q-input>
        <br />
      </div>
      <div class="col-md-6 col-12">
        <strong>Formatierte Ausgabe (Vorschau fachliche Hilfe):</strong>
        <q-list dense>
          <q-item dense class="bg-green-1">
            <q-markdown :src="copyOfProps.baueigenschaftsBeschreibung" />
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <div class="col-md-3 col-12">
        <!-- ALT: url="http://localhost:4444/upload/" -->
        <!-- NEU: :url="computeUploadURL" // computed Property -->
        <!-- :factory="uploadFile" mit neuer Factory Function uploadFile, die den JWT Header übermittelt wie in den sonstigen Axios API Calls -->
        <!-- ALT: style="max-width: 255px bzw. style="width: 90%" -->
        <q-uploader
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          :factory="uploadFile"
          square
          class="stretch full-width"
          ref="uploaderBaueigenschaftsBeschreibung"
          :url="computeUploadURL"
          label="Bild hochladen für internen Link"
          accept=".jpg, .png, .tif, .gif"
          color="light-green"
          text-color="white"
          @uploaded="
            displayLinkForUploadedFileUploaderBaueigenschaftsBeschreibung
          "
          :multiple="false"
        />
      </div>
      <div class="col-md-3 col-12" v-if="uploadDoneBaueigenschaftsBeschreibung">
        <strong>Interner Link für hochgeladenes Bild:</strong>
        <br />
        {{ internerLinkAusUploadBaueigenschaftsBeschreibung }}
        <br />
        <br />
        <!-- NEU: type="submit" präventiv entfernt!!! -->
        <q-btn
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          class="stretch full-width"
          color="secondary"
          glossy
          label="Link in die Zwischenablage kopieren"
          no-caps
          @click="
            copyToClipboardBaueigenschaftsBeschreibung(
              internerLinkAusUploadBaueigenschaftsBeschreibung
            )
          "
        />
        <div
          v-if="copyToClipboardDoneBaueigenschaftsBeschreibung"
          class="text-caption"
        >
          Zum Einfügen des Bildes in die Beschreibung nun diesen Link mit Strg+V in den Markdown oben einfügen. Anschließend Linkbezeichnung und Linkanzeigetext anpassen.
        </div>
      </div>
    </div>
    <q-separator />
    <div class="row full-width q-pa-xs q-col-gutter-xs">
      <!-- NEU: type="submit" präventiv entfernt!!! -->
      <div class="col-md-3 col-12">
        <!-- ALT:  style="width: 90%" -->
        <q-btn
          class="stretch full-width" style="height:100%"
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          color="positive"
          glossy
          label="Beschreibung für Baueigenschaft speichern"
          @click="updateBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaft"
          no-caps
        />
      </div>
      <div class="col-md-3 col-12">
        <!-- ALT:  style="width: 90%" -->
        <q-btn
          class="stretch full-width" style="height:100%"
          :disable="!benutzerDarfBearbeitenTypbezogeneBaueigenschaften"
          color="deep-orange"
          glossy
          text-color="white"
          label="Eingaben auf Originalwerte zurücksetzen"
          no-caps
          @click="
            copyOfProps.baueigenschaftsBeschreibung = baueigenschaftsBeschreibung
          "
        />
        <!-- TODO: Löschen Baustoffbeschreibung??? -->
      </div>
    </div>
  </q-card>
</template>
//***========================================================================================================================================================
<script>
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Imports für Quasar Utilities
// Quasar Date Utils, siehe https://quasar.dev/quasar-utils/date-utils
// Quasar Copy to Clipboard, siehe https://quasar.dev/quasar-utils/other-utils#Copy-to-Clipboard
import { copyToClipboard } from "quasar";
export default {
  // name: 'ComponentName',
  // components: [q-markdown],
  props: [
    "baueigenschaft", // (Flaches) Objekt mit (typbezogener) Baueigenschaft
    "baueigenschaftsBeschreibung" // Beschreibungsfeld mit Markdown
  ],
  //------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {
      localStore: globalStore, // NEU: lokales reaktives Objekt für Pendant aus global Store, enthält localStore.state.debugMode u.v.m.
      copyOfProps: {
        _id: this.baueigenschaft._id,
        baueigenschaftsBezeichnung: this.baueigenschaft
          .baueigenschaftsBezeichnung,
        baueigenschaftsBeschreibung: this.baueigenschaftsBeschreibung
      },
      uploadDoneBaueigenschaftsBeschreibung: false,
      copyToClipboardDoneBaueigenschaftsBeschreibung: false
    };
  },

  //***==================================================================================================================================================
  computed: {
    //======================================================================================================================================
    // NEU: Computed Properties, die in Abhängigkeit von der Benutzerrolle des angemeldeten Benutzers Labels berechnen oder
    //      Boolean-Werte zum Disablen von Kontextmenü-Einträgen/Buttons/Tabs zurückliefern
    //--------------------------------------------------------------------------------------------------------------------------------
    benutzerDarfBearbeitenTypbezogeneBaueigenschaften: function() {
      //----------------------------------------------------------------------------------------------------------------------------
      // Neue computed Property zum Disablen von Aktionen an (typbezogenen) Baueigenschaften
      // Ob ein Mitarbeiter (d.h. nicht Administrator oder Redakteur) solche bearbeiten (d.h. anlegen/ändern/löschen) darf,
      // wird durch ein globales Flag gesteuert: localStore.state.mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften
      // Administratoren und Redakteure dürfen diese immer bearbeiten
      if (
        this.localStore.state.anmeldeDatenBenutzer.benutzerRolle ===
        "Mitarbeiter"
      ) {
        if (
          this.localStore.state
            .mitarbeiterDuerfenBearbeitenTypbezogeneBaueigenschaften
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        // Administrator oder Redakteur
        return true;
      }
    },

    computeUploadURL: function() {
      // -------------------------------------------------------------------------------------------------------------------------------
      // Computed Property - returned URL für File Upload
      // -------------------------------------------------------------------------------------------------------------------------------
      // const port = process.env.PORT || 4444
      console.log("In computeUploadURL");
      console.log(
        "computeUploadURL: ",
        process.env.fileAPI /* + ":" + port */ + "/Dateien/upload"
      );
      return process.env.fileAPI /* + ":" + port */ + "/Dateien/upload";
    }
  }, // /computed:

  //***==================================================================================================================================================

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    copyToClipboardBaueigenschaftsBeschreibung: async function(text) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Funktion CopyToClipbaord für QUploader UploaderBaueigenschaftsBeschreibung im Tab "Baueigenschaften > Beschreibung"
      // Siehe https://quasar.dev/quasar-utils/other-utils#Copy-to-Clipboard
      //------------------------------------------------------------------------------------------------------------------------------
      copyToClipboard(text)
        .then(() => {
          // success!
          console.log("Success in copyToClipboardBaueigenschaftsBeschreibung");
          this.copyToClipboardDoneBaueigenschaftsBeschreibung = true; // Für Anzeige Hint unter dem Button
        })
        .catch(() => {
          // fail
          console.log("Error in copyToClipboardBaueigenschaftsBeschreibung");
        });
    },

    displayLinkForUploadedFileUploaderBaueigenschaftsBeschreibung: function(
      info
    ) {
      //------------------------------------------------------------------------------------------------------------------------------
      // Funktion für QUploader UploaderBaueigenschaftsBeschreibung im Tab "Baueigenschaften > Beschreibung"
      // Zeigt File Name nach File Upload an in einem Feld "DateiNameAusUpload"
      // Hat als Parameter Objekt info = { [files], xhr } laut https://quasar.dev/vue-components/uploader
      // ACHTUNG: Erfordert offensichtlich nicht die Factory Function unten, daher diese disabled!
      //------------------------------------------------------------------------------------------------------------------------------
      // console.log(info.files[0]);
      console.log(
        "In displayLinkForUploadedFileUploaderBaueigenschaftsBeschreibung() - info.files[0].name: ",
        info.files[0].name
      ); // File Name aus dem Upload

      // ALT: Ohne slugified File Name vom Backend:
      // const uriEncodedFileName = encodeURI(info.files[0].name);
      // Ersetzt u.a. Blanks durch %20 - mit denen kann QMarkdown in seinen internen Links nicht umgehen!
      // Siehe https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/encodeURI

      // NEU: Mit slugified File Name aus xhr Header vom Backend:
      console.log("info.xhr: ", info.xhr); // NEU
      // console.log("info.xhr.response.id: ", info.xhr.response.id); // Ist leider undefined, id muss daher geparsed werden aus dem Response Text:

      const idOfUploadedFile = JSON.parse(info.xhr.responseText).id;
      console.log("idOfUploadedFile: ", idOfUploadedFile);

      const slugNameOfUploadedFile = JSON.parse(info.xhr.responseText)
        .slugFileName;
      console.log("slugNameOUploadedFile: ", slugNameOfUploadedFile);

      this.internerLinkAusUploadBaueigenschaftsBeschreibung =
        // ALT: Bei lokalem Deployment mit Upload/Download nach/von statics/pdfs
        // "![Linkbezeichnung](/statics/pdfs/" +
        // NEU: Für Heroku und lokal mit Download aus tmp/download/img:
        "![Linkbezeichnung]" +
        "(" +
        process.env.fileAPI +
        "/img/" +
        // Beispiel lokal:  ![Linkbezeichnung](http://localhost:8080/img/parkplatz.gif "Linkanzeigetext")
        // Beispiel Heroku: ![Linkbezeichnung](https://bimclickfiles.herokuapp.com/img/parkplatz.gif "Linkanzeigetext")
        // ALT:
        // uriEncodedFileName +
        // NEU:
        slugNameOfUploadedFile +
        ' "Linkanzeigetext")';
      console.log(
        "In displayLinkForUploadedFileUploaderBaueigenschaftsBeschreibung()  - internerLinkAusUploadBaueigenschaftsBeschreibung: ",
        this.internerLinkAusUploadBaueigenschaftsBeschreibung
      );

      this.uploadDoneBaueigenschaftsBeschreibung = true; // Steuert Anzeige

      // Test Code, um zu prüfen, ob QUploader Reset per API funktioniert - positiv verifiziert
      /*
      console.log(
        "In displayLinkForUploadedFileUploaderBaueigenschaftsBeschreibung() - vor Reset von QUploader: "
      );
       this.$refs.uploaderBaueigenschaftsBeschreibung.reset(); // Issue reset of q-uploader through API
      */
    },

    resetUploaderBaueigenschaftsBeschreibung: function() {
      // ------------------------------------------------------------------------------------------------------------------------------
      // Reset Funktion, um QUploader UploaderBaueigenschaftsBeschreibung zu resetten
      // Wird aktuell nicht aufgerufen
      // ------------------------------------------------------------------------------------------------------------------------------
      console.log("In resetUploaderBaueigenschaftsBeschreibugn");
      this.$refs.uploaderBaueigenschaftsBeschreibung.reset(); // Issue reset of q-uploader through API
    },

    uploadFile: function(file) {
      // ----------------------------------------------------------------------------------------------------------------------------
      // NEU: Neue Factory Function für q-uploader, um Authorization Header mit JWT Token mitgeben zu können und damit 401 Fehler
      // mit den bisherigen q-uploaders ohne Factory Function (bei Aktivierung von JWT Authorisierung am Frontend und Backend)
      // zu eliminieren!!!
      // Wird an ALLEN q-uploaders definiert per :factory="uploadFile" (NICHT: "uploadfFle()")
      // Siehe https://quasar.dev/vue-components/uploader#ASP.NET-MVC%2FCore als Vorlage und BIM.click Backlog Item #96
      // Bringt per Test nach Upoload Status 200 (uff!!!)
      // TODO: XXXXXX Der Code läuft im Gegensatz zu den anderen API Calls OHNE Axios und fällt daher aus dem Rahmen -
      // z.B. funktionieren damit für die File Upoload Requests nicht die Axios Interceptors
      // Allerdings returned der Code nur eine Promise, die sich in ein Objekt für Quasar resolved (bestehend aus {url, method, headers})
      // und macht gar nicht selbst den HTTP-Post-Call (den man durch Axios mit JWT-Header ersetzen könnte), sondern dieser wird
      // offenbar in Quasar intern gemacht! Daher ist eine Umstellung auf Axios nicht so einfach möglich.
      // ----------------------------------------------------------------------------------------------------------------------------
      return new Promise((resolve, reject) => {
        console.log("In getUploadFile");
        // Retrieve JWT token from your store.
        const myJWTToken = localStorage.getItem("jwtToken");
        console.log("jwtToken: ", myJWTToken);
        // Set Authorization Header mit JWT Token aus localStorage für den nachfolgenden Axios Call für secure Route
        // TODO: XXXXXX - besser mit Axios?!? Aber wie genau den Axios Call in resolve() unten einpassen?
        console.log("Vor Post für File Upload");
        resolve({
          url: process.env.fileAPI + "/Dateien/upload",
          method: "POST",
          headers: [
            /* { name: "Content-Type", value: "application/json" }, */ // Damit kommt Error Status 500 - disabled!!!
            { name: "Authorization", value: "Bearer " + myJWTToken }
          ]
        });
      });
    },

    updateBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaft() {
      // ----------------------------------------------------------------------------------------------------------------------------
      // Macht einen Update der Baueigenschaftsbeschreibung
      // ----------------------------------------------------------------------------------------------------------------------------
      console.log(
        "In updateBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaft()"
      );
      if (this.copyOfProps != null) {
        // ALT - mit Flattening:
        /*
        console.log(
          "ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaftId: ",
          this.ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaftId
        );
        */
        // NEU - ohne Flattening:
        console.log("ausgewaehlteBaueigenschaft._id: ", this.copyOfProps._id);
        /*
        console.log(
          "baueigenschaftsBeschreibung: ",
          this.ausgewaehlteBaueigenschaft.baueigenschaftsBeschreibung
        );
        */
        const apiRoute =
          process.env.API +
          "/Baueigenschaften/" +
          // ALT - mit Flattening:
          // this.ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaftId +
          // NEU - ohne Flattening:
          this.copyOfProps._id +
          "/Beschreibung";
        //=========================================================================================================================================
        // NEU: Für Leaving Rooms (socket.io) - wenn dieser Code aktiviert ist, wird die vom Server geschickte Web Socket Aktualisierungs-
        // nachricht NICHT empfangen! Der Server macht nach einer Pausenzeit dann wieder ein Join Room für diesen Client!
        console.log("Vor Emit to leave room 'roomBaueigenschaften'");
        this.$socket.emit("leaveRoom", {
          room: "roomBaueigenschaften"
        }); // Event, der am Server ein Leave für diesen Room auslöst! Der Room wird mitgegeben.
        console.log("Nach Emit to leave room 'roomBaueigenschaften'");
        //=========================================================================================================================================
        this.$axios
          .put(/* url, */ apiRoute, {
            // Schickt einen Put-Request an das Backend für Update des Felds baueigenschaftsBeschreibung für die (typbezogene) Baueigenschaft
            baueigenschaftsBeschreibung: this.copyOfProps
              .baueigenschaftsBeschreibung
          })
          .then(response => {
            // Was im Erfolgsfall zu tun ist:
            console.log(
              "Erfolg aus $axios.put, response.status: ",
              response.status
            ); // Status loggen
            this.$emit("refreshRequest", "Bearbeitung");
            // Nun auch die Baustoffbeschreibung im global Store updaten, damit sie in der fachlichen Hilfe reaktiv angezeigt wird:
            /*
            globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaustoff(
              this.ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBeschreibung
            )
            */
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_ERFOLG
            );
          })
          .catch(error => {
            // Was im Fehlerfall zu tun ist:
            console.log("Error aus $axios.put, error: ", error); // Error loggen
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BAUEIGENSCHAFT_BESCHREIBUNG_AENDERUNG_FEHLER
            );
          });
      }
    }
  }, // /methods

  //=======================================================================================================================================================
  watch: {
    baueigenschaft: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Watch auf Prop baueigenschaft
      // Baut bei Änderungen im Prop die neue oder ausgewählte Baueigenschaft (Kopie des Objekts) neu auf
      // -------------------------------------------------------------------------------------------------------------------------------
      // deep: true,
      immediate: true,
      handler: function(val) {
        console.log("In watch für baueigenschaft - val: ", val);
        this.copyOfProps._id = val._id;
        this.copyOfProps.baueigenschaftsBezeichnung =
          val.baueigenschaftsBezeichnung;
        // ACHTUNG: Es werden nur diese 2 Felder updated, andere Änderungen bleiben unberücksichtigt
        // Daher funktioniert der Code nur für den eingeschränkten Fall, dass die Bezeichnung und die Beschreibung verwendet werden
        // baueigenschaftsBezeichnung = this.baueigenschaft
        //  .baueigenschaftsBezeichnung
      }
    },
    baueigenschaftsBeschreibung: {
      // -------------------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Watch auf Prop baueigenschaftsBeschreibung
      // Baut bei Änderungen im Prop die neue oder ausgewählte Baueigenschaft (Kopie des Objekts) neu auf
      // -------------------------------------------------------------------------------------------------------------------------------
      // deep: true,
      immediate: true,
      handler: function(val) {
        console.log("In watch für baueigenschaftsBeschreibung - val: ", val);
        this.copyOfProps.baueigenschaftsBeschreibung = val;
        // ACHTUNG: Es wird nur dieses Feld updated, andere Änderungen bleiben unberücksichtigt
        // Daher funktioniert der Code nur für den eingeschränkten Fall, dass die Bezeichnung und die Beschreibung verwendet werden
        // baueigenschaftsBezeichnung = this.baueigenschaft
        //  .baueigenschaftsBezeichnung
      }
    }
  } // /watch
};
// -----------------------------------------------------------------------------------------------------------------------------------
</script>
