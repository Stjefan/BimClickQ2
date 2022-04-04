<!-- konto-reset.vue -->
<!-- Vue/Quasar-Komponente zum Reset des Kennworts des per E-Mail-Adresse identifizierten Benuterkontos -->
<!-- Wird normalerweise über URL-Link in der Reset-E-Mail angeseteuert -->
<!-- Hat als Prop einen token (die entsprechende Route hat sogenannten Boolean Mode in front-end-server-routes.js)-->
<!-- Die dazu passende E-Mail-Adresse muss zusätzlich vom Benutzer sicherheitshalber eingegeben werden -->
<!-- So wird verhindert, dass ein Hacker nur mit dem Token alleine eine E-Mail-Adresse resetten kann -->
<!-- HINWEIS: Der Aufruf dieser Page zum Kontoreset funktioniert nur, weil in my-layout.vue in created() eine neue Abfrage eingebaut wurde, -->
<!--          die verhindert, dass wegen fehlender gültiger Anmeldedaten sonst eine Redirection auf die Seite mit der Aufforderung zur Anmeldung erfolgt -->
<template>
  <q-page padding>
    <!-- content -->
    <!-- NEU: -->
    <div class="fixed-center text-center">
      <q-card class="my-card-anzeige q-pa-sm">
        <img src="statics/logos/bim-click-logo-945x256.png" />
        <br />
        <q-banner rounded dense class="bg-cyan-7 text-white text-h4">
          Geben Sie hier die E-Mail-Adresse, mit der Sie sich als Benutzerkennung für BIM.click
          registriert haben, ein neues Kennwort, sowie eine Wiederholung des
          neuen Kennworts ein. Drücken Sie dann die Schaltfläche darunter ("Neues
          Kennwort für die eingegebene E-Mail-Adresse speichern").
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
          hint="Hier die E-Mail-Adresse eingeben, mit der Sie sich als Benutzerkennung für BIM.click registriert haben"
          :rules="eMailValidierung"
        >
        </q-input>
        <br />
        <!-- NEU: Hier 2 Input-Felder für das neue Kennwort -->
        <q-input
          square
          bg-color="teal-2"
          standout="bg-teal-4 text-black"
          dense
          v-model="neuesKennWort"
          label="Neues Kennwort"
          hint="Neues Kennwort eingeben (Anzeige per Klick auf das Icon rechts ein-/ausschalten)"
          hide-hint
          :type="isPwd ? 'password' : 'text'"
          :rules="kennWortValidierung"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            >
            </q-icon>
          </template>
        </q-input>
        <br />
        <!-- Platz für Hint -->
        <q-input
          square
          bg-color="teal-2"
          standout="bg-teal-4 text-black"
          dense
          v-model="neuesKennWortDuplikat"
          label="Neues Kennwort (Wiederholung)"
          hint="Neues Kennwort nochmals eingeben (Anzeige per Klick auf das Icon rechts ein-/ausschalten)"
          hide-hint
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            v =>
              (v && kennWortEingabenSindValide) ||
              'Die Kennworteingaben stimmen nicht überein'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            >
            </q-icon>
          </template>
        </q-input>
        <q-btn
          :disable="eMail == '' || !eMailEingabeIstValide || !kennWortEingabenSindValide"
          class="stretch full-width"
          label="Neues Kennwort für die eingegebene E-Mail-Adresse speichern"
          no-caps
          color="positive"
          glossy
          size="md"
          @click="submitReset()"
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
  name: "KennWortReset", // Vue Component Name - ACHTUNG - dabei beachten:
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
      isPwd: true, // NEU: Zur Steuerung der Sichtbarkeit der Eingabe für Kennwortfeld, siehe https://quasar.dev/vue-components/input#Input-types
      eMail: "",
      neuesKennWort: null,
      neuesKennWortDuplikat: null
    };
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    submitReset: function() {
      // Per Axios die neue Post-Methode resetKennWortBenutzer am Backend aurufen zum Kennwort-Reset für die E-Mail-Adresse des Benutzers mit Token
      // Siehe https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
      // Im Request Body müssen E-Mail und Token mitgegeben werden
      // Der Token kann dabei aus der Route-Property :token entnommen werden (Prop token oben)
      // Die E-Mail-Adresse kommt aus obigem Input Feld (Variable eMail)
      const apiRoute =
        process.env.API + "/Authentifizierung/Kennwortreset/Durchfuehrung";
      this.$axios
        .post(apiRoute, {
          // Body:
          token: this.token, // Aus Props
          eMail: this.eMail, // Aus Input-Feld
          neuesKennWort: this.neuesKennWort // Aus Input-Feld
        })
        .then(response => {
          // Bei Erfolg Benutzernachricht, dass die E-Mail-Adresse bzw. das Benutzerkonto erfolgreich verifiziert wurde,
          // dann Umleitung auf Anmeldeseite
          console.log("Response aus Post Request: ", response);
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.eMail = "";
          this.neuesKennWort = "";
          this.neuesKennWortDuplikat = "";
          //------------------------------------------------------------------------------------------------------------------------------
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_ERFOLG
          );
          // Anmeldungsseite anzeigen:
          this.$router.push("/Anmeldung");
        })
        .catch(error => {
          // TODO XXXXXX: Je nach Fehler entsprechende individuelle Meldung anzeigen
          console.log("Error aus Post Request: ", error);
          //------------------------------------------------------------------------------------------------------------------------------
          // NEU - #285 e): Aus Security-Gründen die Eingabefelder leeren (sonst bleiben sensitive Inhalte dort stehen und sind einsehbar,
          this.isPwd = true; // Kennwort-Sichtbarkeit ausschalten!
          this.eMail = "";
          this.neuesKennWort = "";
          this.neuesKennWortDuplikat = "";
          //------------------------------------------------------------------------------------------------------------------------------
          globalStore.showBenutzerNachricht(
            BenutzerNachrichten.AUTHORISIERUNG_KENNWORT_RESET_FEHLER
          );
        });
    }
  },
  //***============================================================================================================================
  computed: {
    computeXYZ: function() {
      return "http://localhost:4200/"; // Test-Methode
    },
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

    kennWortValidierung: function() {
      // Prüft, ob Kennwort eingegeben wurde, sonst Fehlermeldung
      // NEU: Prüfung auf zusätzliche Kriterien
      // Vorlage: https://www.kurmis.com/2019/11/01/password-strength-javascript.html
      return [v => !!v || "Die Eingabe des neuen Kennworts ist erforderlich",
              v => v.length > 7 || "Das neue Kennwort muss mindestens 8 Zeichen enthalten",
              v => /[a-z]/.test(v) || "Das neue Kennwort muss mindestens einen Kleinbuchstaben enthalten",
              v => /[A-Z]/.test(v) || "Das neue Kennwort muss mindestens einen Großbuchstaben enthalten",
              v => /\d/.test(v) || "Das neue Kennwort muss mindestens eine Ziffer enthalten",
              v => /[^A-Za-z0-9]/.test(v) || "Das neue Kennwort muss mindestens ein Sonderzeichen enthalten"
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

    kennWortEingabenSindValide: function() {
      // Prüft, ob die Kennworteingaben valide sind und übereinstimmen
      if (this.neuesKennWort == null || this.neuesKennWortDuplikat == null) {
        return false;
      } else {
        if (this.neuesKennWort === this.neuesKennWortDuplikat) {
          return true;
        } else {
          return false;
        }
      }
    }
  } // /computed:
}; // /exports
</script>
//***
==================================================================================================================================================================
<style lang="sass" scoped>
.my-card-anzeige
  width: 100%
  max-width: 480px
</style>
