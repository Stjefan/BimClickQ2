// service-worker.js
// Für Web Push Notifications
// Vorlage: https://dzone.com/articles/how-to-add-real-web-push-notifications-to-your-web
// Siehe auch die Kommentare dazu in 
// - my-layout.vue (Frontend Code dafür für Registrierung und Subscription von Push Notifications, in created())
// - service-worker.js (Frontend Code für Empfang der Push Notifications)
// - back-end-server.js (experimenteller Backend Code, der testweise eine Push Notification an den Client schickt)
// HINWEISE: Bei Änderungen in diesem Code:
// - Lokal: quasar dev muss manuell veranlasst werden, da der Code nicht vom automatischen Quasar Development Build erkannt wird!
// - Heroku: Der Code muss nach Heroku repliziert werden, dann Heroku Build des BIM.click Frontends anstoßen
// - ACHTUNG: Anschließend muss nicht nur das Frontend (bimclick.herokuapp.com) im Browser refreshed werden, sondern
//   a) es muss der Browser neu gestartet werden und
//   b) es muss die Heroku Frontend App komplett neu geladen werden (eventuell MEHRFACH!!!)
//   damit der neue Service Worker Code auch sicher aktiv wird - sonst ist oft eine alte, gecachte Version des Service Workers 
// - Der Service Worker Code liegt im BIM.click Frontend Server auf https://bimclick.herokuapp.com/statics/service-worker.js und kann dort per Browser eingesehen werden!
//----------------------------------------------------------------
// VERSUCH: Benutzung von Quasar QNotify - erfordert import:
// import { Notify } from "quasar"; // Es kommt dann im Browser Log Fehler: Uncaught SyntaxError: Cannot use import statement outside a module!!!
// Daher disabled
// ---------------------------------------------------------------
console.log("Loaded BIM.click Service Worker - Version 1.0.10"); // Versionsnummer anzeigen, das service-worker.js offenbar gecached wird, und oft alte Versionen im Cache verbleiben

function showNotification(event) {
  console.log("In Service Worker showNotification(event)");
  console.log("event: ", event);
  return new Promise(resolve => {
    const { body, title, tag } = JSON.parse(event.data.text());
    // ACHTUNG: Vom Server Code im Backend (web-push-notifications.js) kommt die JSON in String-Form, daher hier JSON.parse, um an die Objekte zu kommen
    console.log("body: ", body); // Dieses Feld kommt richtig an mit korrespondierendem Code im Backend (web-push-notifications.js)
    console.log("title: ", title); // Dieses Feld kommt richtig an mit korrespondierendem Code im Backend (web-push-notifications.js)
    console.log("tag: ", tag); // Dieses Feld kommt richtig an mit korrespondierendem Code im Backend (web-push-notifications.js)
    self.registration
      .getNotifications({ tag })
      .then(existingNotifications => {
        console.log("Im then-Zweig für existingNotifications");
        console.log("existingNotifications: ", existingNotifications);
        console.log("Closing existing notifications with same tag");
        // ACHTUNG: Offenbar MÜSSEN vorherige Notifications mit selbem Tag erst geclosed werden, bevor neue angezeigt werden!!! Daher:
        // Close existingNotifications with close() method:
        // API-Methode close(): https://developer.mozilla.org/en-US/docs/Web/API/Notification
        for (let arrayElement of existingNotifications) {
          arrayElement.close();
        }
        // Positiv verifiziert: Wenn obiger close()-Code nicht ausgeführt wird und stattdessen nur die folgende Console Log Meldung, 
        // wird neue Push Notification mit selbem Tag NICHT angezeigt:
        // console.log("Existierende Notifications werden ignoriert");
      })
      .then(() => {
        console.log("Im then-Zweig für showNotification()");
        //--------------------------------------------------------------------
        // VERSUCH (disabled - siehe Kommentare oben):
        // Hier Quasar QNotify benutzen zum Anzeigen der Notification
        /* 
        Notify.create({
            message: "Push-Benachrichtigung vom BIM.click Server empfangen",
            color: "accent"
            });
        */
        //--------------------------------------------------------------------
        const icon = "notification_important"; // NEU
        // Siehe https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
        return self.registration.showNotification(title, {
          body: body,
          tag: tag,
          icon: icon
        });
      })
      .then(resolve);
  });
}
self.addEventListener("push", event => {
  console.log("In Service Worker addEventListener mit 'push'");
  event.waitUntil(showNotification(event));
});
self.addEventListener("notificationclick", event => {
  console.log("In Service Worker addEventListener mit 'notificationClick'");
  event.waitUntil(clients.openWindow("/"));
});
