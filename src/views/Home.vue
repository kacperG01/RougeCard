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
  <h1>Rouge Card - A game of chance, risk and reward</h1>

  <h3>The fate has been disturbed!</h3>

  <p>A malicious spirit from a shadow realm has corrupted one of the Tarot cards! You have to find out which one it was and then correctly point it our, or else the balance of the world will collapse!</p>
  <p>Rules:</p>
  <ol>
    <li>You start the game with 7 reveal tokens and 3 wish tokens.</li>
    <li>Click on a card to spend a reveal token and flip it.</li>
    <li>Every time you reveal an uncorrupted card, another one will be highlighted to narrow your search (but only if it's not revealed).</li>
    <li>You may spend a wish token to ask the recently revealed card for help (but only the uncorrupted ones).</li>
    <li>Once you reveal a corrupted card, you'll be able to point out </li>
  </ol>

</template>