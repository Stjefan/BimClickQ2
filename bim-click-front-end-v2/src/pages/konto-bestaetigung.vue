<!-- konto-bestaetigung.vue -->
<!-- Vue/Quasar-Komponente zur Bestätigung/Verifikation der E-Mail-Adresse für das Benuterkonto -->
<!-- Wird normalerweise über URL-Link in der Bestätigungs-E-Mail angeseteuert -->
<!-- Hat als Prop einen token (die entsprechende Route hat sogenannten Boolean Mode in front-end-server-routes.js)-->
<!-- Die dazu passende E-Mail-Adresse muss zusätzlich vom Benutzer sicherheitshalber eingegeben werden -->
<!-- So wird verhindert, dass ein Hacker nur mit dem Token alleine eine E-Mail-Adresse verifizieren kann -->
<!-- HINWEIS: Der Aufruf dieser Page zur Kontobestätigung funktioniert nur, weil in my-layout.vue in created() eine neue Abfrage eingebaut wurde, -->
<!--          die verhindert, dass wegen fehlender gültiger Anmeldedaten sonst eine Redirection auf die Seite mit der Aufforderung zur Anmeldung erfolgt -->
<template>
  <q-page padding>
    <!-- content -->
    <!-- NEU: -->
    <div class="fixed-center text-center">
      <q-card class="my-card-anmeldung">
         <q-img
        :src="
          localStore.state.einstellungenBenutzer.farbSchema === 'grau'
            ? 'statics/logos/bim-click-logo-braun-gruen-945x256.png'
            : 'statics/logos/bim-click-logo-945x256.png'
          "
        />
        <br />
        <q-banner rounded dense class="bg-cyan-7 text-white text-h4">
          Bitte bestätigen Sie hier die E-Mail-Adresse, mit der Sie sich als Benutzerkennung für
          BIM.click registriert haben
        </q-banner>
        <br />
        <q-input
          v-model="eMail"
          label="E-Mail-Adresse"
          bg-color="teal-2"
          standout="bg-teal-4 text-black"
          square
          dense
          debounce="300"
          color="primary"
          hint="Bitte hier die E-Mail-Adresse eingeben, mit der Sie sich als Benutzerkennungfür BIM.click registriert haben. Dann die Schaltfläche unten betätigen."
          :rules="eMailValidierung"
        >
        </q-input>
        <br />
        <q-btn
          :disable="eMail == '' || !eMailEingabeIstValide"
          class="stretch full-width"
          label="Eingegebene E-Mail-Adresse als Benutzerkennung bestätigen"
          no-caps
          color="positive"
          glossy
          size="md"
          @click="submitConfirmation()"
        >
        </q-btn>
      </q-card>
    </div>
  </q-page>
</template>
//***
==================================================================================================================================================================
<script>
//-------------------------------------------------------------------------------------------------------------------------------
// NEU: Imports für Enums zur Verwaltung der Benutzernachrichten (QNotify Message im Footer)
// ACHTUNG: Dabei kein require, sondern import, sonst undefined Fehler beim Zugriff!!!
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";
// NEU: Import für global Store
// Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
// Siehe https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
//
import { globalStore } from "../modules/global-store";
//-------------------------------------------------------------------------------------------------------------------------------------------------
export default {
  name: "KontoBestaetigung", // Vue Component Name - ACHTUNG - dabei beachten:
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
  props: { token: String },
  // NEU: Der für die Verifikation am Backend generierte Token als Prop
  data: function() {
    return {
      localStore: globalStore,
      eMail: "" // NEU: Für QMarkdown - hält den Markdown für die Dokumentation aus oben importiertem File
    };
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  computed: {
    //--------------------------------------------------------------------------------------------------------------------------------
    // NEU: Computed Properties zur Validierung von Feldern
    //--------------------------------------------------------------------------------------------------------------------------------
    eMailValidierung: function() {
      // NEU: Prüft E-Mail auf Validität
      // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/4
      const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
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
        ];
    },

    eMailEingabeIstValide: function() {
      // Prüft, ob die E-Mail-Eingabe valide ist
      // Vorlage: https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/4
      if (this.eMail == null) {
        return false;
      } else {
        const eMailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return eMailPattern.test(this.eMail)
      }
    },

  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    submitConfirmation: function() {
      // Per Axios die neue Post-Methode confirmBenutzer am Backend aurufen zur Bestätigung der E-Mail-Adresse des Benutzers mit Token
      // Siehe https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
      // Im Request Body müssen E-Mail und Token mitgegeben werden
      // Der Token kann dabei aus der Route-Property :token entnommen werden (Prop token oben)
      // Die E-Mail-Adresse kommt aus obigem Input Feld (Variable eMail)
      const apiRoute = process.env.API + "/Authentifizierung/Bestaetigung";
      this.$axios
        .post(apiRoute, {
          // Body:
          token: this.token, // Aus Props
          eMail: this.eMail // Aus Input-Feld
        })
        .then(response => {
          // Bei Erfolg Benutzernachricht, dass die E-Mail-Adresse bzw. das Benutzerkonto erfolgreich verifiziert wurde,
          // dann Umleitung auf Anmeldeseite
          console.log("Response aus Post Request: ", response);
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen das Eingabefeld leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          this.eMail = "";
          //------------------------------------------------------------------------------------------------------------------------------
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_VERIFIKATION_ERFOLG
          );
          // Anmeldungsseite anzeigen:
          this.$router.push("/Anmeldung");
        })
        .catch(error => {
          // TODO XXXXXX: Je nach Fehler entsprechende individuelle Meldung anzeigen
          console.log("Error aus Post Request: ", error);
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen das Eingabefeld leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          this.eMail = "";
          //------------------------------------------------------------------------------------------------------------------------------
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_VERIFIKATION_FEHLER
          );
        });
    }
  }
};
</script>
//***
==================================================================================================================================================================
<style lang="sass" scoped>
.my-card-anmeldung
  width: 100%
  max-width: 450px
</style>
