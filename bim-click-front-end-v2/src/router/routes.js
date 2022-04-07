import { globalStore } from "../modules/global-store";
import BenutzerNachrichten from "../modules/benutzer-nachrichten.js";

const routes = [
  /*
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  */
  {
    path: "", // Wurzel-Pfad für die folgenden Unterpfade
    // NEU: path: "/" ersetzt durch path: "", sonst funktioniert bei Abmeldung in my-layout.vue nicht das $router.push("/Anmeldung")!!!
    // ALT: Schon für Test mit Quasar App Extension Auth Token Based: path: "/", ersetzt durch path: "",
    // Sonst kam die App nicht hoch mit der App Extension!!!
    component: () => import("../layouts/my-layout.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
    // component: () => import("layouts/my-layout.vue"), // ALT
    children: [

      // NEU: Route für Anforderung eines Kennwort-Resets für das per E-Mail-Adresse zu identifizierende Benutzerkonto - diese Route ist bisher NICHT aufrufbar in der obersten Tab-Leiste, sondern
      // wird normalerweise per Button "Kennwort vergessen?" aus dem Menü rechts oben angesteuert
      {
        path: "/Kennwortresetanforderung", // Noch ohne Token als Parameter!
        name: "KennWortResetAnforderung", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/kennwort-reset-anforderung.vue"), // Relativer Pfad, File Name der Komponente (kebab-case)!
        // HINWEIS: Diese Route hat KEIN Route Guarding wie die anderen Routes, d.h. sie ist ohne Anmeldung ansteuerbar!
      },

      // NEU: Route für die Durchführung eines Kennwort-Resets für das per E-Mail-Adresse zu identifizierende Benutzerkonto - diese Route ist bisher NICHT aufrufbar in der obersten Tab-Leiste, sondern
      // wird normalerweise per URL-Link in der Reset-E-Mail angesteuert
      {
        path: "/Kennwortreset/:token", // Token wird als Parameter mit übergeben
        name: "KennWortReset", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/kennwort-reset.vue"), // Relativer Pfad, File Name der Komponente (kebab-case)!
        props: true, // NEU: Sogenannter Boolean Mode, erlaubt Mitgabe von Prop :token an die Komponente konto-reset.vue per Vue Router-Befehl
        // HINWEIS: Diese Route hat KEIN Route Guarding wie die anderen Routes, d.h. sie ist ohne Anmeldung ansteuerbar!
      },

      // NEU: Route für Bestätigung der Verifikation der E-Mail-Adresse - diese Route ist bisher NICHT aufrufbar in der obersten Tab-Leiste, sondern
      // wird normalerweise per URL-Link in der Verifikations-E-Mail angesteuert
      {
        path: "/Kontobestaetigung/:token", // Token wird als Parameter mit übergeben
        name: "KontoBestaetigung", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/konto-bestaetigung.vue"), // Relativer Pfad, File Name der Komponente (kebab-case)!
        props: true, // NEU: Sogenannter Boolean Mode, erlaubt Mitgabe von Prop :token an die Komponente konto-bestaetigung.vue per Vue Router-Befehl
        // HINWEIS: Diese Route hat KEIN Route Guarding wie die anderen Routes, d.h. sie ist ohne Anmeldung ansteuerbar!
      },
      //----------------------------------------------------------------------------------------------------------------------------------------------

      {
        // TODO: Auf was soll "/" gerouted werden?
        // ALT: Vorläufig auf Baustoffe. Muss noch geändert werden!
        // NEU: Neue Page anmeldung.vue mit Aufforderung zum Login
        path: "/Anmeldung", // URL-Pfad der Route
        name: "BIMclick", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/anmeldung.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // ALT: component: () => import("../pages/baustoffe.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/baustoffe.vue") // ALT - File Name der Komponente (kebab-case)
      },

      //----------------------------------------------------------------------------------------------------------------------------------------------
      // NEU: Routes für Impressum und Datenschutz:
      {
        path: "/Impressum", // URL-Pfad der Route
        name: "Impressum", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/ErrorNotFound.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
      },
      {
        path: "/Datenschutz", // URL-Pfad der Route
        name: "Datenschutz", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/ErrorNotFound.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
      },

      //----------------------------------------------------------------------------------------------------------------------------------------------
      // ALT: Für Test mit Quasar App Extension Auth Token Based - disabled nach Uninstall dieser Extension:
      /*
      {
        path: "/Login",
        name: "Login",
        component: () =>
          import(
            "../../node_modules/quasar-app-extension-auth-token-basedcomponents/pages/Login.vue"
          ) // File Name der Komponente (kebab-case)!
      },
      */
      //-----------------------------------------------------------------------------------------------------------------------------------------------
      {
        path: "/Bauvorhaben", // URL-Pfad der Route
        name: "Bauvorhaben", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/baueinheiten.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // redirect: "/Schichtaufbau" // URL-Pfad der Route, auf die redirected wird
        // NEU: beforeEnter Route Guard, um zu prüfen, ob Benutzer angemeldet ist:
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Bauvorhaben");
          console.log("from: ", from);
          console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      {
        path: "/Baustoffe", // URL-Pfad der Route
        name: "Baustoffe", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/baustoffe.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/baustoffe.vue"), // ALT - File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Baustoffe");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      // ALT: Erste Version der Vue-Komponente für Baustoffe
      /*
      {
        path: "/BaustoffeAlteVersion", // URL-Pfad der Route
        name: "BaustoffeAlteVersion", // Name der Route, nicht Name der Komponente!
        // redirect: "/Umbauarbeiten" // URL-Pfad der Route, auf die redirected wird
        // component: () => import("pages/test-router.vue") // File Name der Komponente (kebab-case)!
        component: () => import("../pages/baustoffe-alte-version.vue") // NEU - appRoot, File Name der Komponente (kebab-case)!
        // component: () => import("pages/baustoffe-alte-version.vue") // ALT - File Name der Komponente (kebab-case)!
      },
      */
      {
        path: "/Baueigenschaften",
        name: "Baueigenschaften", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/baueigenschaften.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Baueigenschaften");
          console.log("from: ", from);
          console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      // Die nächste Route disabled, da die entsprechende Komponente von /pages nach /components verschoben wurde:
      /*
      {
        path: "/Baueigenschaftsprofile",
        name: "BaueigenschaftsProfile", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/baueigenschafts-profile.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Baueigenschaftsprofile");
          console.log("from: ", from);
          console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      */
      {
        path: "/Bauinformationen", // URL-Pfad der Route
        name: "Bauinformationen", // Name der Route, nicht Name der Komponente!
        // redirect: "/Umbauarbeiten" // URL-Pfad der Route, auf die redirected wird
        // component: () => import("pages/baubestimmmungen.vue") // Damit temporäre Compile Fehler!!! Siehe jetzt Bauinformationen.vue
        // component: () => import("pages/test-touter.vue") // Temporärer Workaround für diesen Fehler
        component: () => import("../pages/bauinformationen.vue"), // NEU: appRoot, Renaming - Bauinformationen statt Baubestimmungen
        // component: () => import("pages/bauinformationen.vue"), // ALT: Renaming - Bauinformationen statt Baubestimmungen
        // Plus Eliminierung des Workarounds
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Bauinformationen");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      // Die nächste Route disabled, da die entsprechende Komponente von /pages nach /components verschoben wurde:
      /*
      {
        path: "/Bauinformationsprofile",
        name: "BauinformationsProfile", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/bauinformations-profile.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Bauinformationsprofile");
          console.log("from: ", from);
          console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      */
      {
        path: "/Auswertungen", // URL-Pfad der Route
        name: "Auswertungen", // Name der Route, nicht Name der Komponente!
        redirect: "/Umbauarbeiten", // URL-Pfad der Route, auf die redirected wird
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Auswertungen");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      {
        path: "/Datenaustausch", // URL-Pfad der Route
        name: "Datenaustausch", // Name der Route, nicht Name der Komponente!
        // redirect: "/Umbauarbeiten" // URL-Pfad der Route, auf die redirected wird
        component: () => import("../pages/daten-austausch.vue"), // NEU - appRoot, File Name der Komponente (kebab-case)!
        // component: () => import("pages/daten-austausch.vue") // ALT - File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Datenaustausch");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      {
        path: "/Einstellungen", // URL-Pfad der Route
        // NEU:
        name: "Einstellungen", // Name der Route, nicht Name der Komponente!
        // ALT:
        // name: "Einstellungen, // Name der Route, nicht Name der Komponente!
        // redirect: "/Umbauarbeiten" // URL-Pfad der Route, auf die redirected wird
        // NEU:
        component: () => import("../pages/einstellungen.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // ALT:
        // component: () => import("../pages/einstellungen.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/einstellungen.vue") // ALT - File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Einstellungen");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      {
        // path: "Dokumentation", // URL-Pfad der Route
        path: "/Dokumentation/:docTopicElementIdToScrollTo",
        name: "Dokumentation", // Name der Route, nicht Name der Komponente!
        props: true, // NEU: Sogenannter Boolean Mode, erlaubt Mitgabe von Prop :docTopicElementIdToScrollTo an die Komponente Dokumentation per Vue Router-Befehl
        component: () => import("../pages/dokumentation.vue"), // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/dokumentation.vue") // ALT - File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Dokumentation");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            next();
          }
        }
      },
      {
        path: "/Verwaltung", // URL-Pfad der Route
        // NEU:
        name: "Verwaltung", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/Verwaltung.vue"), // Relativer Pfad, File Name der Komponente (kebab-case)!
        beforeEnter: (to, from, next) => {
          console.log("In beforeEnter Route Guard von Route /Verwaltung");
          // console.log("from: ", from);
          // console.log("to: ", to);
          if (
            from.path !== "/" && // NEU: Die Aufforderung zur Anmeldung nur ausgeben, wenn kein Browser Refresh erfolgt ist -
            // Browser Refresh wird hier (vorläufig?) so erkannt, dass from.path === "/" ist
            globalStore.state.anmeldeDatenBenutzer.istAbgemeldetBenutzer
          ) {
            globalStore.showBenutzerNachricht(
              BenutzerNachrichten.BITTE_ANMELDEN
            );
            next({ name: "BIMclick" }); // Auf die Page wechseln mit der Aufforderung zur Anmeldung
          } else {
            //=================================================================================
            // ACHTUNG: Auf diese Route nur wechseln, wenn Benutzerrolle "Administrator" ist!!!
            // ALT - disabled:
            // if (globalStore.state.anmeldeDatenBenutzer.benutzerRolle === "Administrator") {
            // NEU - siehe Kommentar unten:
              if (localStorage.benutzerRolle === "Administrator") {
              next();
            } else {
              // Diese Meldung irritierte, da sie auch für Administratoren kam - wahrscheinlich weil die benutzerRolle im global Store kurzzeitig undefiniert ist beim Refresh */
              // Daher obige Abfrage der Benutzerrolle geändert von globalStore nach localStorage! Damit kommt die Meldung nur noch für Nicht-Administratoren, wenn
              // sie versuchen, die Route /Verwaltung per Browser-Adresszeile anzuwählen
              globalStore.showBenutzerNachricht(
                BenutzerNachrichten.AUTHORISIERUNG_BERECHTIGUNG_FEHLER
              );
              // Wunsch: Kehre zurück zur vorherigen Route
              // console.log("from: ", from); // from ist allerdings leider "/", nicht die vorherige Route, warum auch immer
              next(from); // Funktioniert nicht wirklich, kehrt auf die Startseite zurück statt auf die vorherige Route
              // Einstweilen belassen, da die folgenden Alternativene auch nicht besser sind:
              // Alternativen dazu:
              // 1. Mit Browser-Funktion: Funktioniert, zeigt allerdings die obige Fehlermeldung nur ganz kurz an, daher disabled
              //    window.history.back();
              // 2. Siehe auch https://stackoverflow.com/questions/46413335/vue-router-how-to-abort-route-change-in-beforerouteenter
              //    Funktioniert aber nicht, daher disabled:
              //    next(vm => {
              //      console.log("Kehre zur vorherigen Route zurück");
              //      vm.$router.go(-1);
              //     })
              // -----------
              // Siehe auch https://stackoverflow.com/questions/33021372/vuejs-is-there-a-way-to-access-router-go-inside-a-component (nur in Vue Komponenten)
              // TODO XXXXXX: Generell last known Route pro Benutzer merken: https://css-tricks.com/storing-and-using-the-last-known-route-in-vue/
            }
          }
        }
      },
      // Route für Tests - disabled
      /*
      {
        path: "/Schichtaufbau", // URL-Pfad der Route
        name: "Schichtaufbau", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/schicht-aufbau.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/schicht-aufbau.vue") // ALT - File Name der Komponente (kebab-case)!
      },
      */
      {
        path: "/Umbauarbeiten",
        name: "Umbauarbeiten", // Name der Route, nicht Name der Komponente!
        component: () => import("../pages/seite-im-umbau.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/seite-im-umbau.vue") // ALT - File Name der Komponente (kebab-case)!
      }
      /* MS: Diese Error Route vorübergehend disabled, um Zugriff auf localhost:4200/statics zu testen */
      /*
      {
        path: "/:anythingElse", // URL-Pfad der Route
        name: "Error", // Name der Route, nicht Name der Komponente!
        alias: "/Error", // URL-Pfad für Alias der Route
        component: () => import("../pages/seite-im-umbau.vue") // NEU - relativer Pfad, File Name der Komponente (kebab-case)!
        // component: () => import("pages/seite-im-umbau.vue") // ALT - File Name der Komponente (kebab-case)!
      }
      */
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
