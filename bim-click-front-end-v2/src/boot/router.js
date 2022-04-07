// boot/router.js
// Boot-File, um eine Vue Router Instance verfügbar zu machen in .js Modules (z.B. global-store.js),
// außerhalb der Quasar .vue Files, wo per this.$router auf den Vue Router zugegriffen werden kann OHNE dieses Boot File
// Vorlage: https://forum.quasar-framework.org/topic/3960/access-router-outside-vue/9
// 1. Das Boot File zunächst erzeugen per: bim-click-front-end> quasar new boot router.js
// 2. Dann den Code aus der Vorlage unten eingetragen in das Boot File
// 3. Das Boot File in quasar.conf.js eintragen in die Boot Files (boot: [...])
// 4. In js-Modules, z.B. global-store.js: import { routerInstance } from 'boot/router'
// 5. Dann zugreifen auf den Router in diesem JS-Module:
//    a) In Arrow Functions: Z.B. mit routerInstance.push('/some-route')
//    b) außerhalb von Arrow Functions: Z.B. mit this.$router.push'/some-route')
//--------------------------------------------------------------------------------------
// Generated lines by Quasar
// import something here
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
  // something to do
// }
let routerInstance = void 0
export default async ({ router }) => {
  // something to do
  routerInstance = router
}
export { routerInstance }