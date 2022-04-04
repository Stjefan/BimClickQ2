<template>
  <q-page padding>
    <!-- content -->
    <!-- NEU: -->
    <div class="fixed-center text-center">
      <q-card class="my-card-anzeige q-pa-sm">
        <img src="statics/logos/bim-click-logo-945x256.png" />
        <br />
        <q-card-section class="bg-deep-orange-2 text-blue-grey-10">
          Dieser Teil ist aktuell nicht verfügbar. Wir bitten um etwas Geduld.
        </q-card-section>
      </q-card>
    </div>
    <!-- ALT: --->
    <!--
    <div class="text-subtitle2 fixed-center">
      Diese Seite ist zur Zeit im Umbau. Wir bitten um etwas Geduld.
    </div>
    -->
  </q-page>
</template>

<script>
export default {
  // name: 'PageName', // Vue Component Name - ACHTUNG - dabei beachten:
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
};
</script>

<style lang="sass" scoped>
.my-card-anzeige
  width: 100%
  max-width: 480px
</style>
