<script setup>
    import { ref } from 'vue'

    const boxtext = ref('')
    const inpCount = ref(0)
    var inpKey = ref('')

    const boxTouched = () => {
      boxtext.value = 'You opened the box. They came.'
      alert('You opened the box. They came.')
    }
    const getKey = (evt) => {
      inpKey = evt.key
    }
    const getKEy = () => {
      alert('E')
    }
</script>

<template>
  <h1>About</h1>

  <input type="text"
          v-on:input="inpCount++"
          v-on:keydown="getKey"
          v-on:keydown.e="getKEy">

  <p>{{ 'Input key: ' + inpKey }}</p>
  <p>{{ 'Input events occured: ' + inpCount }}</p>

  <div
      v-on:mousemove.once="boxTouched" 
      v-bind:id="'dabox'">
    {{ boxtext }}
  </div>

</template>