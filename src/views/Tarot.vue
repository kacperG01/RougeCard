<script setup>
    import { ref } from 'vue'
    import { onBeforeMount, onMounted, onUpdated, onUnmounted, onErrorCaptured } from 'vue'
    import imagefriend from '../assets/audio/imagefriend.mp3'
    import charjoined from '../assets/audio/charjoined.ogg'
    import THE_HOLY from '../assets/audio/THE_HOLY.ogg'
    import sadchord2 from '../assets/audio/sadchord2.ogg'

    var attempts = ref(7)
    var wishes = ref(3)
    var gameover = ref(false)
    var recent_number = ref('')
    var corrupted_number = ref('')
    var corrupted_revealed = ref(false)
    const guessText = ref('')
    var gamestate = ref(0)

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

    const game_states = ref([
        "Click on cards to reveal them. Find the corrupted card!",
        "You've found the corrupted card! Now you have to find out what its original number was.",
        "Success! You've banished the spirit!",
        "You couldn't find the corrupted card...",
        "You guessed wrong.",
        "You forced an ending. The spirit is banished, but you'll never know where it was."
        ])

    const card_wishes={ 
        "0":"The Fool wants to help you by highlighting an unrevealed card that isn't corrupted.", 
        "I":"The Magican can give you one free reveal token he has in his pocket.", 
        "II":"You can join The High Priestess in prayer to reveal a rangom highlighted card without spending a token.",
        "III":"By the grace of The Empress, you may copy the last wish you made. If you haven't made any wishes yet, nothing will happen and you'll keep the token.",
        "IV":"By the grace of The Emperor, ",
        "V":"",
        "VI":"",
        "VII":"",
        "VIII":"",
        "IX":"The Hermit will give you 4 numbers. None of those numbers will belong to the corrupted card.",
        "X":"You may spin the Wheel of Fortune to reveal a random card without spending a token.",
        "XI":"",
        "XII":"The Hanged Man will give you 8 numbers. One of those numbers will belong to the corrupted card.",
        "XIII":"",
        "XIV":"Your own Temperance will be judged. You shall receive bonus reveal tokens based on how many wish tokens you have right now.",
        "XV":"The Devil offers you a deal: immediately reveal the corrupted card and all highlighted ones, but in return you'll lose all your reveal tokens.",
        "XVI":"",
        "XVII":"",
        "XVIII":"",
        "XIX":"",
        "XX":"",
        "XXI":"The World itself is on your side. Reveal every single card that isn't highlighted.",
        "XXII":"You have the opportunity to turn back time. All cards will be hidden and all tokens will be refunded (except for one wish token, that the Time itself will keep).",
        "XXIII":"All hope is lost, but you may force an ending by permanently removing the corrupted card from the deck, without knowing what it was. A hollow victory.",
    };
    
    const select = (idx) => {
        const card = card_list.value[idx]

        if(gameover.value || card.selected){
            console.log("Nope")
            return
        }

        card.selected = true
        if(card.corrupted){
            //gameover.value = true
            //const audio = new Audio(charjoined)
            const audio = new Audio(THE_HOLY)
            audio.play()
            corrupted_revealed.value = true
            attempts.value += 4
            gamestate.value = 1
            //for (let i = 0; i < card_list.value.length; i++) {
            //    if(!card_list.value[i].corrupted && !card_list.value[i].selected){
            //        card_list.value[i].selected = true
            //    }
            //}
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
                gamestate.value = 3
                for (let i = 0; i < card_list.value.length; i++) {
                    if(card_list.value[i].corrupted && !card_list.value[i].selected){
                        card_list.value[i].selected = true
                    }
                }
            } else {
                recent_number.value = card.num
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
        var amnt = 0;

        for (let i = 0; i < card_list.value.length; i++) {
            if(!card_list.value[i].selected && !card_list.value[i].hinted && !card_list.value[i].corrupted){
                amnt += 1
            }
        }

        if(amnt == 0){
            alert("Unable to highlight.")
            return
        }

        while(true){
            var r = Math.ceil(Math.random()*card_list.value.length);
            const card = card_list.value[r]
            if(!card.selected && !card.hinted && !card.corrupted){
                card.hinted = true
                break
            }
        }
    }

    const wishTooltip = () => {
        if(recent_number.value == ''){
            return "You may not make a wish yet."
        } else {
            return card_wishes[recent_number.value]
        }
    }

    const makeAWish = () => {
        if(gameover.value){
            alert("It's too late. Wishes cannot help you now.")
            return
        }
        if(wishes.value <= 0){
            alert("You have no wishes left. You're on your own.")
            return
        }

        switch(recent_number.value) {
            case "0":
                giveAHint()
                break;
            case "I":
                attempts.value = (attempts.value+1)
                break;
            case "XXIII":
                gameover.value = true
                const audio2 = new Audio(sadchord2)
                audio2.play()
                for (let i = 0; i < card_list.value.length; i++) {
                    if(card_list.value[i].corrupted && !card_list.value[i].selected){
                        card_list.value[i].selected = true
                    }
                }
                gamestate.value = 5
                break;
            default:
                alert("This wish is either unimplemented or invalid.")
                return
        }

        wishes.value = (wishes.value-1)
        recent_number.value = ""
    }

    const revealed = () => {
        return (corrupted_revealed.value && !gameover.value)
    }

    const getGameState = () => {
        return game_states.value[gamestate.value]
    }

    const takeAGuess = () => {
        if(guessText.value == corrupted_number.value){
            gameover.value = true
            const audio = new Audio(charjoined)
            //const audio = new Audio(THE_HOLY)
            audio.play()
            gamestate.value = 2
        } else {
            gameover.value = true
            const audio2 = new Audio(sadchord2)
            audio2.play()
            const audio1 = new Audio(imagefriend)
            audio1.play()
            gamestate.value = 4
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
        corrupted_number.value = card.num
    })
</script>

<template>
    <div class="box">
        <p>{{ getGameState() }}</p>
        Reveal tokens: {{attempts}}<br/>Wish tokens: {{wishes}}
    </div>

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

    <div class="box">{{ wishTooltip() }} 
        <br/>
        <button v-on:click="makeAWish()">I wish...</button>
        <p v-if="revealed()">
            So which card has been corrupted?
            <form v-on:submit.prevent="takeAGuess">
                Enter number<input type="text" required v-model="guessText">
                <button type="submit">Take a guess!</button>
            </form>
        </p>
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