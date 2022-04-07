/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js


const ESLintPlugin = require('eslint-webpack-plugin')


const { configure } = require('quasar/wrappers');

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: [
      
      'axios', "notify-defaults", "socket", "router", "emittery"
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.scss'
    ],
    // In BIM.cick v1/Quasar v1: css: ["app.styl"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      env: ctx.dev
      ? {
          // so on dev we'll have

          // URL für Backend Server APIs:
          API: "http://localhost:8080", // TODO/ACHTUNG: Aktuell ist hier für das Backend API http, nicht https eingestellt!
          // TODO XXXXXX: Das Backend API bedient bislang nur http!!!
          // Bzgl. Aufsetzen von https am Backend API siehe server.js, ganz unten

          // NEU: URL für Backend File Server APIs:
          // file-sever.js gleichzeitig verschoben vom bim-click-front-end => bim-click-back-end-server => bim-click-back-end-file-server
          // fileAPI: JSON.stringify("http://localhost:4444"), // ALT
          fileAPI: "http://localhost:8080", // NEU - back-end-file-server gemerged in back-end-server, daher sind API und fileAPI nun gleich
          // TODO XXXXXX: Das Backend API bedient bislang nur http!!!

          // NEU: Eigene Frontend URL, z.B. für lokale File Downloads verwendet:
          ownURL: "http://localhost:4200"

          // NEU: Test-Variable für File Uploader Upload Port
          // ACHTUNG: Hier muss unbedingt JSON.stringify("") benutzt werden, nicht nur "", sonst Parser Fehler
          // UPLOAD_PORT: JSON.stringify("")
        }
      : {
          // and on build (production):

          // NEU - siehe https://stackoverflow.com/questions/58561195/how-do-you-remove-console-log-from-a-build-using-the-js-quasar-framework
          // Erfordert anscheinend Webpack Plugin Terser: https://github.com/webpack-contrib/terser-webpack-plugin/#minify
          // Unklar, ob dieses manuell installiert werden muss, sicherheitshalber installiert (lokal) mit
          // bim-click-front-end> npm install terser-webpack-plugin --save-dev
          // ACHTUNG: Bewirkt so aber bisher KEIN Removal der console.logs bei Build auf Heroku!!!
          // Selbst wenn Environment Variable NODE_ENV = production gesetzt wird auf Heroku, bleiben die console.logs!!!
          // Es erscheint auch immer noch die Warnung im Console Log:
          // "You are running Vue in development mode.
          // Make sure to turn on production mode when deploying for production.
          // See more tips at https://vuejs.org/guide/deployment.html"
          // ACHTUNG: Dieser Teil von quasar.conf.js ist da, um Felder in process.env hinzuzufügen, nicht zum Ändern von Build Options!!!
          // Siehe https://forum.quasar-framework.org/topic/2655/how-to-drop-console-statements-in-production/12
          // Daher uglifyOptions-Statement nach weiter unten verschoben, hier disabled:
          /*
          uglifyOptions: {
            compress: { drop_console: true }
          },
          */

          // ALT: Aufruf des BIM.click Backends auf Heroku mit http
          // ACHTUNG: Damit kommt, wenn man https://bimclick.herokuapp.com eingibt für Aufruf des BIM.click Frontends mit https, ein Axios Response Error
          // und in der Konsole wird angezeigt: Mixed Content: The page at 'https://bimclick.herokuapp.com/' was loaded over HTTPS, but requested an insecure
          // XMLHttpRequest endpoint 'http://bimclickbackend.herokuapp.com/Baustoffe/Wurzel'. This request has been blocked; the content must be served over HTTPS.
          // Daher disabled zugunsten von https (weiter unten)
          //
          // ALT:
          // API: JSON.stringify("http://bimclickbackend.herokuapp.com") // NEU: Für Deployment auf Heroku Cloud
          // NEU: Für Aufruf des BIM.click Backends auf Heroku mit https:
          // ACHTUNG: Dies muss offenbar OHNE Port aufgerufen werden!!!
          API: "https://bimclickserver.herokuapp.com", // NEU: Für Deployment auf Heroku Cloud

          // NEU: URL für Backend File Server APIs:
          // file-sever.js gleichzeitig verschoben vom bim-click-front-end => bim-click-back-end-server => bim-click-back-end-file-server
          // Gleich mit https aufgesetzt
          // ACHTUNG: Dies muss offenbar OHNE Port aufgerufen werden!!!
          // fileAPI: JSON.stringify("https://bimclickfiles.herokuapp.com"), // ALT
          fileAPI: "https://bimclickserver.herokuapp.com", // NEU - back-end-file-server gemerged in back-end-server, daher sind API und fileAPI nun gleich

          // Wird nicht mehr verwendet - disabled:
          // uploadPort: JSON.stringify(process.env.UPLOAD_PORT), // UPLOAD_PORT muss einstweilen per Dashboard in Heroku gesetzt werden vor Start
          // Siehe https://quasar.dev/quasar-cli/cli-documentation/handling-process-env#Adding-to-process.env

          // NEU: Eigene URL, z.B. für File Downloads:
          ownURL: "https://bimclick.herokuapp.com"
          // ownURL: JSON.stringify("https://bim.click")
          // Falls statt der von Heroku zugewiesenen URL später die bei Franken Web Hosting reservierte Domain bim.click verwendet würde)
        },
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,


      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
          chain.module.rule('md')
          .test(/\.md$/)
          .use('raw-loader')
            .loader('raw-loader')

            chain.module.rule('pdf')
          .test(/\.pdf$/)
          .use('raw-loader')
            .loader('raw-loader')

            chain.module.rule('vmd')
            .test(/\.vmd$/)
            .use('vmd-loader')
              .loader('vmd-loader')
      },
      //--------------------------------------------------------------------------------------------------------------------------
      // NEU: Disabling des Console Loggings auf Heroku (Production Frontend Server) aus Security-Gründen mittels uglifyOptions:
      // HINWEIS: uglifyOptions muss an dieser Stelle stehen, bewirkte aber früher obigen Fehler auf Heroku, daher war es 
      // temporär disabled. Dieser Fehler (siehe "Update Oktober 2020 oben") war ein Timing-Problem, das mittlerweile gefixt wurde.
      // Damit kann das Disabling des Console Loggings aus Sicherheitsgründen normalerweise für Production auf Heroku normalerweise
      // hier enabled bleiben - bei Debugging-Bedarf auf Heroku können die folgenden drei Zeilen hier auch temporär auskommentiert werden:
      //---------------------------------------------------------------------------------------------------------------------------
      uglifyOptions: {
        compress: { drop_console: !ctx.dev } // Müsste äquivalent sein zu drop_console: true, da Build normalerweise nur auf Heroku läuft, wo !ctx.dev true ist
      },
      
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http'
      },
      port: 4200,
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {
        notify: { /* look at QuasarConfOptions from the API card */ }
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack
      // NEU: Deutsch als Quasar language aktiviert
      lang: "de", // Quasar language

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],
      directives: ["Ripple", "ClosePopup"],

      // Quasar plugins
      plugins: ['Notify', 'Loading']
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
        // Tell browser when a file from the server should expire from cache (in ms)

      
      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      //-------------------------------------------------------------------------------------------------------------------------------
      // Potentieller Workaround gegen Refresh-Probleme mit Workbox im PWA-Mode, siehe #344 -
      // nach Vorlage auf https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa#reload-and-update-automatically:
      // Siehe auch https://developers.google.com/web/tools/workbox/modules/workbox-core 
      // Erfordert aber dennoch einmaligen, manuellen Browser Refresh! Siehe Medium-Artikel in #344 zur Begründung.
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
        // Weitere Workarounds, die nicht zum Ziel führen, dass immer der aktuellste App Code/Content verwendet und angezeigt wird ohne Refresh:
        // navigateFallback: false, // Diskussion auf https://github.com/quasarframework/quasar/issues/7043, bewirkt aber offenbar nichts
        // exclude: [
        //  /\.html$/
        // ] // Nach https://github.com/quasarframework/quasar-cli/issues/206 - führt im Zusammenspiel mit den obigen Options skipWaiting, clientsClaim führt dies aber dazu,
        //      dass selbst nach einem Browser Refresh nicht der aktuelle HTML-Content in der Doku angezeigt wird!
      },
      // useCredentials: true, // Nach https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa#configuring-manifest-file - hat aber keine Auswirkung auf Refresh-Problem!
      // Mit #391 temporär auf true gesetzt, half aber nicht, daher wieder disabled
      //-------------------------------------------------------------------------------------------------------------------------------

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      
      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      

      manifest: {
        name: `BimClickV2`,
        short_name: `BimClickV2`,
        description: 'A Quasar Framework App for Building Information Modeling (BIM)',
        display: 'standalone',
        orientation: "any", // NEU: #378 - ALT: "portrait" - siehe https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
        background_color: "#ffffff", // weiß - unklar, wo das zum Einsatz kommt
        // theme_color: "#027be3", // ALT: blau - bestimmt offenbar obere Leiste auf Smartphone - sollte besser grau sein, seit das graue Theme möglich ist!
        theme_color: "#e0e0e0", // NEU: grau - bestimmt offenbar obere Leiste auf Smartphone - sollte besser grau sein, seit das graue Theme möglich ist!
        icons: [
          /*
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
          */
         //------------------------------------------------------------------------------------------------
          // NEU: Braun/grüne Icons:
          {
            src: "statics/icons/bim-click-lego-icon-braun-gruen-transparent-rund-mittlerer-schatten-austritt-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "statics/icons/bim-click-lego-icon-braun-gruen-transparent-rund-mittlerer-schatten-austritt-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "statics/icons/bim-click-lego-icon-braun-gruen-transparent-rund-mittlerer-schatten-austritt-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'bim-click-front-end-v2'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      
      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },

      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      
    }
  }
});
