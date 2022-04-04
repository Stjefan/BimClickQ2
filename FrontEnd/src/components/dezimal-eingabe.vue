<!-- Komponente für ein Input-Feld mit Dezimalzahleingabe -->
<!-- Vorlagen: -->
<!-- https://dm4t2.github.io/vue-currency-input/guide.html#creating-a-custom-component -->
<!-- https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/QCurrencyInput.vue -->
<template>
  <!--  -->
  <div>
    <!-- Erste Variante, ohne Inkrement-/Dekrement-Buttons: -->
    <!--
    <q-input
        ref="inputRef"
        :value="formattedValue"
        dense
        square
        bg-color="teal-2"
        standout="bg-teal-4 text-black"
        input-class="text-black text-right"
        label="[m über NHN]"
        hint="NHN-Niveau mit VueCurrencyInput"
    >
    </q-input>
    -->
    <!-- Zweite Variante, mit Inkrement-/Dekrement-Buttons: -->
    <!-- Für Lösung 6: @input:"myUpdateFunction" - bringt aber Error, aktuell disabled -->
    <!-- ACHTUNG: In Vue 3 muss es @update:model-value="myUpdateFunction" heißen -->
    <q-input
      ref="inputRef"
      :value="formattedValue"
      dense
      square
      bg-color="teal-2"
      standout="bg-teal-4 text-black"
      input-class="text-black text-right"
      label="[m über NHN]"
      hint="NHN-Niveau mit VueCurrencyInput"
    >
    <!--
    <template
    v-slot:control="{ id, floatingLabel, value, emitValue }"
    >
    </template>
    -->
      <template v-slot:prepend>
        <q-btn
          dense
          @click="myIncrementOrDecrement(true)"
          icon="arrow_drop_up"
          color="grey-4"
          text-color="black"
          style="width:20px"
        >
        </q-btn>
      </template>
      <template v-slot:append>
        <q-btn
          dense
          @click="myIncrementOrDecrement(false)"
          icon="arrow_drop_down"
          color="grey-4"
          text-color="black"
          style="width:20px"
        >
        </q-btn>
      </template>
    </q-input>
    <br />
    <br />
    Aktueller Wert im VModel: <code>{{ $props.value }}</code>
    <br />
    Typ des VModels: <code>{{ typeof $props.value }}</code>
    <br />
    Durch VueCurrencyInput formatierter Wert: <code>{{ formattedValue }}</code>
    <br />
    Typ des formatierten Werts: <code>{{ typeof formattedValue }}</code>
    <br />
    VueCurrencyInput Props: <code>{{ $props }}</code>
  </div>
</template>
//***===========================================================================================================================
<script>
import { watch } from '@vue/composition-api'; // Für watch() unten NOTWENDIG!
import { parse, useCurrencyInput } from "vue-currency-input";

//--------------------------------------------------------------------------------------------------------------------------------
export default {
  // name: 'ComponentName',
  name: "QDecimalInput", // Für BIM.click-Zwecke (Dezimalzahleingabe) gewählter Komponentenname
  props: {
    value: Number, // Vue 2: value; Vue 3: modelValue
    options: Object
  },
  setup(props) {
    const { inputRef, formattedValue, setOptions, setValue } = useCurrencyInput(props.options)
    // ACHTUNG: Hier watch() eingefügt nach Vorlage auf https://dm4t2.github.io/vue-currency-input/guide.html#external-props-changes
    // Ist notwendig, wenn das VModel nicht nur durch Benutzereingabe, sondern durch externe Funktionen (z.B. Inkrement/Dekrement) geändert wird!
    // watch() hier ist notwendig für Lösungen 1, 2, 3, 5 und bei initialen Tests auch 6
    //==================================================================================
    watch(() => props.value, (value) => { // Vue 2: props.value; Vue 3: props.modelValue
      setValue(value)
    })
    //==================================================================================
    watch(() => props.options, (options) => {
      setOptions(options)
    })
    return { inputRef, formattedValue, setValue };
  },
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  data() {
    return {};
  },
  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  methods: {
    //---------------------------------------------------------------------------------------------------------------------------
    myUpdateFunction(arg) {
      // Methode für Lösung 6 für VueCurrencyInput
      console.log("In myUpdateFunction(arg) - arg: ", arg);
      this.$emit("update", arg)
    },
    //----------------------------------------------------------------------------------------------------------------------------
    // Methoden für Inkrement/Dekrement:
    myIncrementOrDecrement(incrementNotDecrement = true) {
      console.log("In myIncrementOrDecrement(incrementNotDecrement)");
      console.log("Parameter incrementNotDecrement: ", incrementNotDecrement);
      // Zugriff auf das VModel per obiger Prop value:
      // console.log("$props.value: ", this.$props.value);
      console.log("value: ", this.value) // ACHTUNG: this.value ist äquivalent zu this.$props.value!
      console.log(
        "typeof value: ",
        typeof this.value
      );
      //------------------------------------------------------------------------------------------------------------------------
      // HIER sind keine Typkonvertierungen notwendig, wie mit VueAutoNumeric!!!
      // Das VModel hat bereits den Type number
      // let number = Number(this.$props.value) // Konvertierung String nach Number
      /*
      let number = this.decimalHandling.convertDecimalStringToNumber( // Konvertierung Dezimalstring nach Number
        this.$props.value
      );
      */
      // console.log("typeof(number): ", typeof(number))
      // console.log("number aus convertDecimalStringToNumber(): ", number);
      //------------------------------------------------------------------------------------------------------------------------
      let number = this.value;
      if (incrementNotDecrement) {
        number = number + 0.01
      } else {
        number = number - 0.01
      }
      number = Math.round(number * 100) / 100; // Präventive Rundungskorrektur, siehe
      // https://stackoverflow.com/questions/38561833/obtain-two-decimal-places-in-javascript-without-rounding-to-the-next-bigger-numb
      //---------------------------------------------------------------------------------------------------------------------
      // ACHTUNG: Hier auch KEINE Rückkonvertierung mit Helper-Funktion nach Dezimalstring durchgeführt:
      /*
      this.$props.value = this.decimalHandling.convertNumberToDecimalString(
        number,
        2,
        ",",
        "."
      );
      */
      //======================================================================================================================
      // Es folgen mehrere Lösungen zur Mutation des VModels mit dem inkrementierten/dekrementierten neuen Wert:
      //======================================================================================================================
      // LÖSUNG 1 - verworfen zugunsten von Lösung 5 unten
      // ACHTUNG: Dies bewirkt zwar eine Änderung des VModels, aber VueCurrencyInput ohne obigen watch()
      // bemerkt diese Änderung NICHT! Daher obigen ersten watch() eingefügt!
      // NACHTEIL: Es kommt mit dem watch() durch diese Mutation des VModels allerdings eine Vue Warnung im Log:
      //   Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
      //   Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"
      //----------------------------------------------------------------------------------------------------------------------
      // this.value = number; // Lösung 1, Mutation des VModels, disabled zugunsten von eleganterer Lösung 5 unten
      //======================================================================================================================
      // LÖSUNG 2 - verworfen zugunsten von Lösung 5 unten
      //----------------------------------------------------------------------------------------------------------------------
      // this.$set(this.$props, "value", number); // Lösung 2, alternativer Versuch per $set, mit watch(), es kommt aber dieselbe Vue Warnung!
      //======================================================================================================================
      // LÖSUNG 3 - verworfen zugunsten von Lösung 5 unten
      // Tipp auf https://stackoverflow.com/questions/43959824/instead-use-a-data-or-computed-property-based-on-the-props-value-vue-js
      // Siehe auch https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier
      // 1) In der Definition der Komponente dezimal-eingabe.vue ein zusätzliches v-bind für das Feld eingebaut:
      //    v-model="istWertObject.kennWert1"
      //    v-bind:unterFeld.sync="istWertObject.kennWert1"
      // 2) Die Mutation this.value = number aus Lösung 1 oben disabled
      // 3) Hier unten mittels $emit("update:unterFeld", number) einen Update-Event für das per v-bind gesyncte Feld eingebaut.
      // Damit verschwinden die Vue Warnings im Log!
      // NACHTEIL: Diese Lösung ist allerdings spezifisch für diese Prop kennWert1! Sie funktioniert ebenfalls nur in Verbindung
      // mit obigem watch()
      // HINWEIS: Die nachfolgende Konsolausgabe nach dem $emit zeigt dann allerdings immer noch den alten Wert im VModel an -
      // dieser wird durch $emit aber offenbar danach aktualisiert!
      //----------------------------------------------------------------------------------------------------------------------
      // this.$emit("update:unterFeld", number) // Lösung 3, disabled zugunsten von Lösung 5 unten
      //======================================================================================================================
      // VERSUCH 4 - wirft aber Fehler "Error in v-on handler", veworfen:
      //-------------------------------------------------------------------------------------------------------------
      // const { inputRef, formattedValue, setOptions, setValue } = useCurrencyInput(this.options)
      // setValue(number);
      //======================================================================================================================
      // LÖSUNG 5 (GEWÄHLT)
      // Emittieren eines Standard-Input-Events - dieses wird standardmäßig vom VModel verarbeitet, siehe
      // https://stackoverflow.com/questions/54782010/using-v-bind-and-v-on-instead-of-v-model-vuejs
      // Dies funktioniert allerdings auch nur in Verbindung mit obigem watch() - vermutlich reagiert die Komponente selbst
      // auf diesen @input-Event und aktualisiert dann das VModel.
      //----------------------------------------------------------------------------------------------------------------------
      this.$emit("input", number) // Lösung 5 - dies bewirkt ebenfalls eine Aktualisierung des VModels.
      //======================================================================================================================
      // VERSUCH 6 (STEFAN)
      // Update des Models wird in der aufrufenden Komponente erledigt, mittels Update-Event aus der Kindkomponente hier.
      // Beim Aufruf: :value="istWertObject.kennWert1"
      // sowie @update="istWertObject.kennWert1 = $event"
      // Alternativ zu letzter Zeile ist auch möglich (allerdings ist der Update
      // Handler dabei spezifisch für das jeweilige Feld):
      // @update="myUpdateHandlerDecimalInput":
      // Siehe https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components)
      // Lösung 6 hat zusätzlich noch einen weiteren @update-Handler in der Komponente selbst am q-input -->
      // Dieser wirft aber einen Laufzeitfehler und war eigentlich dazu gedacht, den watch() überflüssig zu machen, -->
      // daher diese Lösung nicht weiter verfolgt!
      // Lösung 6 funktioniert auch nur MIT watch() in dezimal-eingabe.vue!!!
      // Lösung 6 funktioniert zusammen mit $emit("update", number):
      //----------------------------------------------------------------------------------------------------------------------
      // this.$emit("update", number)
      //======================================================================================================================
      // HINWEIS: Die nachfolgende Konsolausgabe nach dem $emit zeigt immer noch den alten Wert im VModel an -
      // dieser wird durch $emit aber offenbar danach aktualisiert!
      /*
      console.log(
        "$props.value aus myIncrementOrDecrement() - vor Änderung durch $emit: ",
        this.value
      );
      */
    },
  }
};
</script>
