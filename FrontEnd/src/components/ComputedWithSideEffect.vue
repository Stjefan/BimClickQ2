<template>
  <div>My component
    <div>{{computedNumber}}</div>
    <p>{{x}}</p>
    <p>{{y}}</p>
    <p>{{z}}</p>
    <q-input v-model="x" type="number" />
    <p>{{otherComputedNumber}}</p>
    <q-input :value="foo(x, otherComputedNumber)"/>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  setup () {
    return {}
  },
  data () {
    return {
      x: 20,
      y: 30,
      z: 90
    }
  },
  methods: {
    foo(a,b) {
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
