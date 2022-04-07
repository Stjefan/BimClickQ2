//----------------------------------------------------------------------------------------------------------------------------------------------------
// AKTUELL - READY!
// front-end-server.js für BIM.click Frontend
// - Dies ist der unter Kontrolle von Node laufende minimaler Express Web Server für das BIM.click Frontend
// - Er wird benötigt für das Cloud Deployment auf Heroku und arbeitet auf dem während des Quasar Production Builds auf Heroku
//   erzeugten Verzeichnis app/dist (vom Heroku Root-Verzeichnis aus, siehe z.B.
//   - Powershell> heroku run bash --app bimclick
//   - In Bash Shell: $ dir
// - Auf Heroku gehört er zu der App mit dem Namen bimclick (ACHTUNG: NICHT bimclickfrontend oder bim-click-front-end wie in Git gewählt, um URL kurz zu halten)
// - Siehe auch https://quasar.dev/quasar-cli/developing-spa/deploying#Deploying-with-Heroku
// - Die von diesem Express Server kontrollierte Express App bedient lokal localhost:4200 (Port)
// - Auf Heroku bedient sie aktuell https://bimcclik.herokuapp.com auf einem von Heroku beim Start zugewiesenen Port
// - Diesen Port weist Heroku der Environment Variablen process.env.PORT zu
// - Bei lokalem Development Build mit quasar dev wird dieser Frontend Server NICHT benötigt!
// - Nach einem lokalen Production Build mit quasar build muss dieser Frontend Server gestartet werden aus der Powershell per
//   - bim-click-front-end> node front-end-server.js
//   oder per
//   - bim-click-front-end> nodemon serve front-end-server.js
//  - Manueller Start auf Heroku per
//    - heroku run bash --app bimclick
//    - node front-end-server.js
//  - Auf Heroku erfolgt jedoch nach dem Production Build dort per package.json "scripts:" Section ein automatischer Start:
//    - "build": "quasar build",
//    - "start": "node front-end-server.js",
//----------------------------------------------------------------------------------------------------------------------------------------------------

// NEU: Erst App Root Path ermitteln (für Cloud Deployment auf Heroku, nur testweise, wird am Frontend offenbar nicht gebraucht, in den Backend Servern
// ist es so implementiert, unklar, ob es dort unbedingt gebraucht wird)
// Siehe https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
// sowie https://stackoverflow.com/questions/39069629/obtaining-path-in-nodejs
// Benutzt populäres Paket https://www.npmjs.com/package/app-root-path
// global.appRoot = require("app-root-path");
//==================================================================================================================================================
// Beginn eigentlicher Code von server.js
console.log(
  "==============================================================================================="
);
console.log(
  "In front-end-server.js - Express Server für das BIM.click Frontend wird unter Node.js gestartet"
);

// console.log("appRoot: ", global.appRoot + " "); // ACHTUNG: Muss mit " " konkateniert werden, um auf Konsole korrekt ausgegeben zu werden!!!
// ACHTUNG: Hier global.appRoot statt appRoot notwendig!?!

// ACHTUNG: Zugriff auf appRoot als global in den anderen Backend Modulen funktioniert, warum auch immer nicht, daher dort das
// const appRoot = require("app-root-path") ebenfalls deklariert!
//----------------------------------------------------------------------------------------------------------------------------------------------------

// const path = require("path"); // Wird aktuell nicht benutzt
const express = require("express"),
  serveStatic = require("serve-static"),
  history = require("connect-history-api-fallback"),
  port = process.env.PORT || 4200;

const app = express();

app.use(history());

// Nun das Directory aufsetzen, aus dem die App von diesem Express Web Server geserved wird:
// eslint-disable-next-line no-path-concat
app.use(serveStatic(__dirname + "/dist/pwa")); // NEU: Für SPA und PWA auf Heroku
// app.use(serveStatic(__dirname + "/dist/spa")); // ALT: Für SPA only

//-----------------------------------------------------------------------------------------------------------------------
// NEU: CORS aufsetzen geegn CORS Fehler auf Heroku bei uglifyOptions: { compress: { drop_console: !ctx.dev } },
// in quasar.conf.js
// Macht eigentlich keinen Sinn hier, denn diese CORS Fehlermeldungen sind bei XMLhttp Requests an das Backend,
// z.B. bei 'https://bimclickserver.herokuapp.com/Baueinheiten/5e79fa6619d8a20017723398/Kinder'
// from origin https://bimclick.herokuapp.com - daher betreffen sie die CORS Settings im Backend Server!
// Daher CORS hier disabled
/*
console.log("Setting up CORS");
const cors = require("cors"); // Für den CORS Options Call, der folgt
//=======================================================================================================================
// ACHTUNG: Die folgenden CORS Calls müssen unbedingt NACH der Kreation der app in Express gemacht werden,
// aber (ENTSCHEIDEND!!!) VOR der Definition der Routes!!!
//=======================================================================================================================
app.options("*", cors());
app.use(cors());
*/
//-----------------------------------------------------------------------------------------------------------------------

console.log("port: ", port);
console.log(
  "==============================================================================================="
);
app.listen(port);
