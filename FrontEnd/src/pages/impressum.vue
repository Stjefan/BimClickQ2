<!-- anmeldung.vue -->
<!-- Vue/Quasar-Komponente für Impressum -->
<template>
  <q-page padding>
    <!------------------------------------------------------------------------------------------------------------------------------->
    <!-- Es folgt Information im Markdown Format: -->
    <!-- Nutzt Quasar Extension QMarkdown - siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs -->
    <!-- TODO: Eventuell in QCard einbetten -->
    <q-card style="min-width: 80%" class="my-card bg-teal-1 text-black q-pa-md">
      <q-img
        :src="
              localStore.state.einstellungenBenutzer.farbSchema === 'grau'
                ? 'statics/logos/bim-click-logo-braun-gruen-945x256.png'
                : 'statics/logos/bim-click-logo-945x256.png'
            "
        style="width: 40%"
        class="my-img"
      />
      <q-markdown no-breaks ref="markdown" :src="markdownImpressum">
      </q-markdown>
    </q-card>
  </q-page>
</template>
<!-- ====================================================================================================================================== -->
<script>
import { globalStore } from "../modules/global-store"; // NEU: Für globale Daten, die zwischen MyLayout.vue und anderen Vue-Komponenten geshared werden
import markdownImpressum from "../markdown/bim-click-impressum.md"; // Markdown File mit BIM.click Impressum
export default {
  name: "Impressum", // Vue Component Name - ACHTUNG - dabei beachten:
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
  data: function() {
    return {
      localStore: globalStore,
      markdownImpressum: markdownImpressum // NEU: Für QMarkdown - hält den Markdown für die Dokumentation aus oben importiertem File
    };
  }
};
</script>
<style>
.my-card {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.my-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
