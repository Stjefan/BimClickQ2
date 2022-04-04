import { Notify } from "quasar";
// Defaults für QNotify - siehe https://quasar.dev/quasar-plugins/notify#setting-defaults
Notify.setDefaults({
  // position: "bottom",
  timeout: 30000,
  // textColor: "white",
  // actions: [{ icon: "close", color: "white" }] // NEU: Default-Action für Benutzer-Closing der Notification mit Icon "X" - diese hat keinen Handler
  // Siehe https://github.com/quasarframework/quasar/issues/1847
  // Mit noDismiss: true müsste man solche "Ignorieren"-Buttons unterdrücken können - funktioniert aber nicht
  // Daher das Default-Closing "X" hier wieder disabled und in den individuellen Aufruf von Notify.create in global-store.js verschoben
  // Siehe global-store.showBenutzerNachricht() und global-store.showBenutzerAktion() für individuelle Parameter beim Aufruf von QNotify.create(),
  // was eine solche Notification des Benutzers auslöst
});
