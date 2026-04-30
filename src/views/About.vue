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

  <p>©2026 CasTheDev</p>
  <p>All rights reserved</p>

</template>