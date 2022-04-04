// import something here
import { boot } from 'quasar/wrappers'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
  // something to do
// }
// Vorlage: https://forum.quasar-framework.org/topic/3267/how-to-use-socket-io-in-quasar-building-an-electron-app/15
// Dieses Boot File für socket.io wurde generiert mit: bim-click-front-end> quasar new boot socket.js
// Erfordert NPM Package socket.io: bim-click-front-end> npm install socket.io - später ersetzt durch Package socket.io-client!
// Zusätzlich muss diese File in der Boot Section von quasar.conf.js mit in die Liste aufgenommen werden: boot: ["axios", "notify-defaults", "socket"], // NEU: socket.js für Web Sockets
// HINWEIS: Da hier in der Boot File definierte Socket kann dann in allen .vue Files mit this.$socket verwendet werden
import io from "socket.io-client"
const socket = io.connect(process.env.API); // API URL aus quasar.conf.js
export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
})
export { socket }
