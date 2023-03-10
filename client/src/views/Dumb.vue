<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const width = ref<number>(window.innerWidth / 2);
    const urls = ref<string[]>([]);
    for (let i = 0; i < 1; i++) {
      urls.value.push(`https://picsum.photos/400?${i}`);
    }

    const sliderValue = ref<number>(1);
    watch(sliderValue, (newValue) => {
      urls.value = [];
      for (let i = 0; i < newValue; i++) {
        urls.value.push(`https://picsum.photos/400?${i}`);
      }
      width.value = Math.max(window.innerWidth / (sliderValue.value / 10), 128);
    });

    return { urls, sliderValue, width };
  },
});
</script>

<template>
  <div>
    <div>
      <input v-model="sliderValue" type="range" min="1" max="100" />
    </div>
    <div id="root">
      <img v-for="(url, i) in urls" :width="width" :key="i" :src="url" />
    </div>
  </div>
</template>
<style scoped>
#root {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1em;
  justify-content: center;
}

img{
    transition: 1s;
    filter: contrast(0.5);
}

img:hover{
    transform: scale(3);
    z-index: 10;
    border-radius: 2em;
    filter: contrast(1.0);
    box-shadow: 0 0 2em 0.5em black;
}
</style>