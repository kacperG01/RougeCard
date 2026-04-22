<script setup>
    import { ref } from 'vue'

    const showDiv = ref(true)

    const default_val = 25
    const msg = ref(default_val)

    const sizeChange = (step) => {
        const newValue = msg.value + step

        if (newValue > 50) 
        {
            alert("Nie przesadzaj.")
        } 
        else if (newValue < 1) 
        {
            alert("Nawet o tym nie myśl.")
        } 
        else 
        {
            acts.value.push("change by " + step)
            msg.value = newValue
        }
    }


    const sizeReset = () => {
        msg.value = default_val
        acts.value.push("reset")
    }

    const gone = () => {
        showDiv.value = !showDiv.value
        acts.value.push("gone")
    }

    var acts = ref(["start"])
</script>

<template>
  <h1>Home</h1>

  <span>Rozmiar: {{ msg }}</span>

  <button v-on:click="sizeChange(1)">+1</button>
  <button v-on:click="sizeChange(5)">+5</button>

  <button v-on:click="sizeChange(-1)">-1</button>
  <button v-on:click="sizeChange(-5)">-5</button>

  <button v-on:click="sizeReset">Reset</button>
  <button v-on:click="gone">DISAPPEAR!</button>

  <div v-show="showDiv"
        v-bind:class="'tekscior'"
        v-bind:style="{ 'font-size': msg + 'px' }">
    
        <p v-if="msg > default_val">
            Więcej
        </p>

        <p v-else-if="msg < default_val">
            Mniej
        </p>

        <p v-else>
            Równo
        </p>

  </div>

  <ul>
    <li v-for="x in acts">{{ x }}</li>
  </ul>

</template>