import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const Emittery = require('emittery');

const emitter = new Emittery();

emitter.on('blub', data => {
	console.log(data);
});

export default boot(async ({ app}) => {
  // something to do
  app.config.globalProperties.$emitter = emitter
})
