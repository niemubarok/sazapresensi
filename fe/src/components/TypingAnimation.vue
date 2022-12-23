<template>
  <div class="container">
    <div class="col">
      <h5>
        Today's Quote :
      </h5>
      <h1>
        <span class="typed-text"> <span v-if="typeValue">"</span>{{ typeValue }}<span v-if="typeValue">"</span></span>
        <span class="blinking-cursor">|</span>
        <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const typeValue = ref("")
const typeStatus = ref(false)
const displayTextArray = ["Ilmu yang tidak diamalkan Bagaikan Pohon tak Berbuah", "Sebaik-baik Manusia adalah yang Paling Bermanfaat bagi Orang Lain"]
const typingSpeed = 100
const erasingSpeed = 20
const newTextDelay = 2000
const indexText = ref(0)
const charIndex = ref(0)




const typeText = () => {
  if (charIndex.value < displayTextArray[indexText.value].length) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value += displayTextArray[indexText.value].charAt(
      charIndex.value
    );
    charIndex.value += 1;
    setTimeout(typeText, typingSpeed);
  } else {
    typeStatus.value = false;
    setTimeout(eraseText, newTextDelay);
  }
}
const eraseText = () => {
  if (charIndex.value > 0) {
    if (!typeStatus.value) typeStatus.value = true;
    typeValue.value = displayTextArray[indexText.value].substring(
      0,
      charIndex.value - 1
    );
    charIndex.value -= 1;
    setTimeout(eraseText, erasingSpeed);
  } else {
    typeStatus.value = false;
    indexText.value += 1;
    if (indexText.value >= displayTextArray.length)
      indexText.value = 0;
    setTimeout(typeText, typingSpeed + 1000);
  }
}


onMounted(() => {
  setTimeout(typeText(), newTextDelay + 200);
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  flex: start;
}

h1 {
  font-size: 6rem;
  font-weight: normal;

  span.typed-text {
    color: #d59e46;
  }
}

// Cursor blinking CSS Starts...
.blinking-cursor {
  font-size: 6rem;
  color: #2c3e50;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}

@keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-moz-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-webkit-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-ms-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

@-o-keyframes blink {

  from,
  to {
    color: transparent;
  }

  50% {
    color: #2c3e50;
  }
}

// Cursor blinking CSS Ends...
</style>
