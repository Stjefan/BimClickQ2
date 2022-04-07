<template>
  <div>My component
    <div>{{computedNumber}}</div>
    <p>{{x}}</p>
    <p>{{y}}</p>
    <p>{{z}}</p>
    <q-input v-model="x" type="number" />
    <p>{{otherComputedNumber}}</p>
    <p>{{foo(x, y)}}</p>
    <q-input :model-value="foo(x, y)"/>
    <p>{{blub}}</p>
    <QDecimalInput @update-modelValue="baz" v-model="blub" :options="{
                    currency: 'EUR', // Ist erforderlich, wird aber unterdrückt
                    currencyDisplay: 'hidden', // 'EUR' nicht anzeigen
                    autoDecimalDigits: false, // Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits. Default is false (the decimal symbol needs to be inserted manually).
                    precision: 2, // 2 Nachkommastellen
                    // distractionFree: false, // So nicht dokumentiert in API Reference
                    hideCurrencySymbolOnFocus: true, // Whether to hide the currency symbol on focus. Default is true.
                    hideGroupingSeparatorOnFocus: true, // Whether to hide the grouping separator on focus. Default is true.
                    hideNegligibleDecimalDigitsOnFocus: true, // Whether to hide negligible decimal digits on focus. Default is true.
                    valueRange: { min: -1000, max: 1000 }, // The range of accepted values as object {min, max}. Default is undefined (no value range).
                    // The validation is triggered on blur and automatically sets the respective threshold if out of range.
                    useGrouping: true // Trennzeichen für Tausenderstellen, '.' mit deutschem Locale
                  }"/>
  </div>
</template>

<script>
import QDecimalInput from "../components/dezimal-eingabe.vue";

export default {
  components: {
    QDecimalInput
  },
  // name: 'ComponentName',
  setup () {
    return {}
  },
  data () {
    return {
      blub: 10.3,
      x: 20,
      y: 30,
      z: 90
    }
  },
  methods: {
    baz(arg) {
      console.log(arg)
    },
    foo(a,b) {
      console.log("foo", a, b)
      return Number(a)-Number(b);
    }

  },
  computed: {
    computedNumber: function () {
      this.z = Number(this.x)+22;
      return Number(this.x)+Number(this.y);
    },
    otherComputedNumber: function () {
      return Number(this.z) + 100
    }
  }
}
</script>
