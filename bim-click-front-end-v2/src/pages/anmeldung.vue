<!-- anmeldung.vue -->
<!-- Vue/Quasar-Komponente mit Aufforderung zur Anmeldung -->
<template>
  <q-page padding>
    <!-- content -->
    <!-- NEU: -->
    <div class="fixed-center text-center">
      <q-card class="my-card-anzeige q-pa-sm">
        <q-img
          :src="
            localStore.state.einstellungenBenutzer.farbSchema === 'grau'
              ? 'statics/logos/bim-click-logo-braun-gruen-945x256.png'
              : 'statics/logos/bim-click-logo-945x256.png'
          "
        >
        </q-img>
        <br />
        <q-banner rounded dense class="bg-positive text-white text-h4">
          Bitte im hellgrünen Dropdown-Menü links oder rechts oben anmelden.
        </q-banner>
        <img src="statics/logos/bmwi-und-digital-jetzt-logos-945x350.png" />
      </q-card>
    </div>
    <!-- ALT: -->
    <!--
    <div class="fixed-center text-center">
      <q-img src="statics/logos/bim-click-logo-945x256.png"></q-img>

      <q-space />
      <q-space />
      <br />
      <q-banner rounded dense class="bg-positive text-white text-h4">
        Bitte anmelden im Dropdown-Menü rechts oben
      </q-banner>
    </div>
    -->
    <!-- ALT: -->
    <!--
    <div class="q-pa-md q-gutter-lg">
      <div class="row justify-center">
        <q-img
          src="statics/logos/bim-click-logo-945x256.png"
          style="max-height: 30%; max-width: 30%"
        ></q-img>
      </div>
      <div class="row items-stretch">
        <div class="col">
          <q-space />
          <q-space />
        </div>
      </div>
      <div class="row justify-center items-end">
        <q-banner rounded class="bg-positive text-white text-h4">
          Bitte anmelden im Dropdown-Menü rechts oben
        </q-banner>
      </div>
    </div>
  -->
  </q-page>
</template>

<script>
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
export default {
  // name: 'PageName',
  data: function() {
    return {
      localStore: globalStore
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card-anzeige
  width: 100%
  max-width: 700px
</style>
