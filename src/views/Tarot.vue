<script setup>
    import { ref } from 'vue'
    import { onBeforeMount, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue'
    import imagefriend from '../assets/audio/imagefriend.mp3'
    import charjoined from '../assets/audio/charjoined.ogg'
    import THE_HOLY from '../assets/audio/THE_HOLY.ogg'
    import sadchord2 from '../assets/audio/sadchord2.ogg'

    var attempts = ref(10)
    var wishes = ref(3)
    var gameover = ref(false)

    const card_list = ref([
          {lbl: 'The Fool',             num: '0', txtclr: 'palevioletred', selected: false, corrupted: false, hinted: false,    filesrc: "/images/0_fool.png"},
          {lbl: 'The Magican',          num: 'I', txtclr: 'blueviolet', selected: false, corrupted: false, hinted: false,       filesrc: "/images/1_magican.png"},
          {lbl: 'The High Priestess',   num: 'II', txtclr: 'aquamarine', selected: false, corrupted: false, hinted: false,      filesrc: "/images/2_hp.png"},
          {lbl: 'The Empress',          num: 'III', txtclr: 'turquoise', selected: false, corrupted: false, hinted: false,      filesrc: "/images/3_empress.png"},
          {lbl: 'The Emperor',          num: 'IV', txtclr: 'seagreen', selected: false, corrupted: false, hinted: false,        filesrc: "/images/4_emperor.png"},
          {lbl: 'The Hierophant',       num: 'V', txtclr: 'slateblue', selected: false, corrupted: false, hinted: false,        filesrc: "/images/5_hiero.png"},
          {lbl: 'The Lovers',           num: 'VI', txtclr: 'pink', selected: false, corrupted: false, hinted: false,            filesrc: "/images/6_lovers.png"},
          {lbl: 'The Chariot',          num: 'VII', txtclr: 'powderblue', selected: false, corrupted: false, hinted: false,     filesrc: "/images/7_chariot.png"},
          {lbl: 'Strength',             num: 'VIII', txtclr: 'magenta', selected: false, corrupted: false, hinted: false,       filesrc: "/images/8_strength.png"},
          {lbl: 'The Hermit',           num: 'IX', txtclr: 'midnightblue', selected: false, corrupted: false, hinted: false,    filesrc: "/images/9_hermit.png"},
          {lbl: 'Wheel of Fortune',     num: 'X', txtclr: 'hotpink', selected: false, corrupted: false, hinted: false,          filesrc: "/images/10_wof.png"},
          {lbl: 'Justice',              num: 'XI', txtclr: 'skyblue', selected: false, corrupted: false, hinted: false,         filesrc: "/images/11_justice.png"},
          {lbl: 'The Hanged Man',       num: 'XII', txtclr: 'rosybrown', selected: false, corrupted: false, hinted: false,      filesrc: "/images/12_hangedman.png"},
          {lbl: 'Death',                num: 'XIII', txtclr: 'gray', selected: false, corrupted: false, hinted: false,          filesrc: "/images/13_death.png"},
          {lbl: 'Temperance',           num: 'XIV', txtclr: 'wheat', selected: false, corrupted: false, hinted: false,          filesrc: "/images/14_temperance.png"},
          {lbl: 'The Devil',            num: 'XV', txtclr: 'red', selected: false, corrupted: false, hinted: false,             filesrc: "/images/15_devil.png"},
          {lbl: 'The Tower',            num: 'XVI', txtclr: 'firebrick', selected: false, corrupted: false, hinted: false,      filesrc: "/images/16_tower.png"},
          {lbl: 'The Star',             num: 'XVII', txtclr: 'white', selected: false, corrupted: false, hinted: false,         filesrc: "/images/17_star.png"},
          {lbl: 'The Moon',             num: 'XVIII', txtclr: 'cadetblue', selected: false, corrupted: false, hinted: false,    filesrc: "/images/18_moon.png"},
          {lbl: 'The Sun',              num: 'XIX', txtclr: 'yellow', selected: false, corrupted: false, hinted: false,         filesrc: "/images/19_sun.png"},
          {lbl: 'Judgement',            num: 'XX', txtclr: 'crimson', selected: false, corrupted: false, hinted: false,         filesrc: "/images/20_judgement.png"},
          {lbl: 'The World',            num: 'XXI', txtclr: 'lime', selected: false, corrupted: false, hinted: false,           filesrc: "/images/21_world.png"},
          {lbl: 'Time',                 num: 'XXII', txtclr: 'goldenrod', selected: false, corrupted: false, hinted: false,     filesrc: "/images/22_time.png"},
          {lbl: 'The Ending',           num: 'XXIII', txtclr: 'grey', selected: false, corrupted: false, hinted: false,         filesrc: "/images/23_ending.png"},
        ])
    
    const select = (idx) => {
        const card = card_list.value[idx]

        if(gameover.value || card.selected){
            console.log("Nope")
            return
        }

        card.selected = true
        if(card.corrupted){
            gameover.value = true
            //const audio = new Audio(charjoined)
            const audio = new Audio(THE_HOLY)
            audio.play()

            for (let i = 0; i < card_list.value.length; i++) {
                if(!card_list.value[i].corrupted && !card_list.value[i].selected){
                    card_list.value[i].selected = true
                }
            }
        } 
        else 
        {
            attempts.value = (attempts.value - 1)
            if(attempts.value <= 0){
                gameover.value = true
                const audio2 = new Audio(sadchord2)
                audio2.play()
                const audio1 = new Audio(imagefriend)
                audio1.play()
                for (let i = 0; i < card_list.value.length; i++) {
                    if(card_list.value[i].corrupted && !card_list.value[i].selected){
                        card_list.value[i].selected = true
                    }
                }
            } else {
                giveAHint()
            }
        }
    }

    const isSelected = (idx) => {
        const card = card_list.value[idx]
        if(card.selected){
            return true
        } else {
            return false
        }
    }

    const notCorrupted = (idx) => {
        const card = card_list.value[idx]
        if(!card.corrupted){
            return true
        } else {
            return false
        }
    }

    const giveAHint = () => {
        while(true){
            var r = Math.ceil(Math.random()*card_list.value.length);
            const card = card_list.value[r]
            if(!card.selected && !card.hinted && !card.corrupted){
                card.hinted = true
                break
            }
        }
    }

    onBeforeMount(() => {
        let currentIndex = card_list.value.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [card_list.value[currentIndex], card_list.value[randomIndex]] = [
            card_list.value[randomIndex], card_list.value[currentIndex]];
        }
    })

    onMounted(() => {
        var r = Math.ceil(Math.random()*card_list.value.length);
        const card = card_list.value[r]
        card.corrupted = true
    })
</script>

<template>
    <div class="box">Remaining reveals: {{attempts}}</div>
    <div class="cards">
        <div v-for="(img, index) in card_list"
            :key="index"
            v-bind:class="[
                'colorCard',
                { selClass: img.selected },
                { colorCardHint: img.hinted },
                { rotate: isSelected(index), rotateBack: !isSelected(index) }
            ]"
            :style="{ color: img.txtclr }"
            @click="select(index)">

            <p v-if="isSelected(index)">
            <div v-if="notCorrupted(index)">
                {{ img.num }}<br/>{{ img.lbl }}
                <img 
                :src="img.filesrc" 
                alt="img.lbl" 
                class="friend"/>
            </div>
            <div v-else
            v-bind:class="[
                'me']">
                ???<br/>ME
                <img 
                :src="'/images/x_me.png'" 
                alt="img.lbl" 
                class="friend"/>
            </div>
            </p>

        </div>
    </div>
</template>

<style scoped>
    .rotate {
        transform: rotate(360deg);
        transition: rotate 0.75s;
    }
    .rotateBack {
        rotate: -360deg;
        transition: rotate 0.75s;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
        margin: 0 auto;
    }

    .me{
        text-shadow: 2px 2px 2px white;
        color: black;
    }

    .box{
        width: 100%;
    }
</style>