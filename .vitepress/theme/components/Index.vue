<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import FilterButtonGroup from "./FilterButtonGroup.vue";
import { parseHash2Object } from "../../lib/parseHash2Object.ts";
import { filterCard } from "../../lib/filterCard.ts";
import { getLangObject } from "../../lib/getLangObject.ts";
import FilterInput from "./FilterInput.vue";

const { data } = defineProps<{ data: any }>();
const lang = computed(() => data.lang);
const langObject = computed(() => data.langObject);
const cardData = computed(() => data.cardData);
const cardRank = computed(() => {
  return new Map(
    (data.cardRank as [cardName: string, score: number][]).map(([cardName], index) => {
      const per = (index / data.cardRank.length) * 100;
      const rank = (() => {
        if (per >= 0 && per < 16) return 1;
        if (per >= 16 && per < 50) return 2;
        if (per >= 50 && per < 84) return 3;
        if (per >= 84) return 4;
      })();
      return [cardName, rank];
    })
  );
});
// console.log(cardRank.value);
const searchQuery = ref("");
const currentDeck = ref("");
const currentPlayer = ref("");

const cardMapSortedFilterBySearch = computed(() => {
  return filterCard(
    cardData.value,
    langObject.value,
    searchQuery.value,
    currentDeck.value,
    currentPlayer.value
  );
});

const scrollRef = ref<HTMLDivElement | void>();
const initSearchUrl = () => {
  const oriObj = parseHash2Object();
  searchQuery.value = oriObj.q || "";
  currentDeck.value = oriObj.deck || "";
  currentPlayer.value = oriObj.player || "";
};
onMounted(() => {
  initSearchUrl();
  window.addEventListener("hashchange", () => {
    initSearchUrl();
  });
});
</script>
<template>
  <div class="flex flex-col overflow-hidden h-full">
    <FilterInput
      v-model="searchQuery"
      v-model:scrollRef="scrollRef"
      ref="searchEl"
      :resultCount="cardMapSortedFilterBySearch.length"
    />
    <FilterButtonGroup
      v-model="currentDeck"
      name="deck"
      :array="['A', 'B', 'C', 'D', 'E']"
      v-model:scrollRef="scrollRef"
    />
    <FilterButtonGroup
      v-model="currentPlayer"
      name="player"
      :array="['1+', '3+', '4+']"
      v-model:scrollRef="scrollRef"
    />

    <div
      class="flex flex-col overflow-y-auto min-h-0 flex-1 overflw-x-hidden w-full mb-5"
      ref="scrollRef"
    >
      <div class="item" v-for="[, item] in cardMapSortedFilterBySearch" :key="item.id">
        <div class="w-full sm:w-1/4 flex flex-col justify-center items-center">
          <a
            :href="`/${lang}/cards/${item.id}`"
            target="_blank"
            class="flex justify-center"
          >
            <img
              class="max-w-300px w-full min-h-200px"
              :src="`/${lang}/${item.id}.webp`"
              :alt="`${item.name}`"
              loading="lazy"
            />
          </a>
          <div class="text-center pt-2">
            {{ item.numbering }}-{{ langObject[lang].object[item.name] ?? item.name }}
            <template v-if="lang == 'zh'">
              <div>({{ getLangObject(langObject, "cn", "object", item.name) }})</div>
              <div>({{ getLangObject(langObject, "en", "object", item.name) }})</div>
            </template>
            <template v-if="lang == 'cn'">
              <div>({{ getLangObject(langObject, "zh", "object", item.name) }})</div>
              <div>({{ getLangObject(langObject, "en", "object", item.name) }})</div>
            </template>
            <template v-if="lang == 'en'">
              <div>({{ getLangObject(langObject, "cn", "object", item.name) }})</div>
              <div>({{ getLangObject(langObject, "zh", "object", item.name) }})</div>
            </template>
          </div>
        </div>
        <div class="w-full sm:w-3/4 px-2 py-2">
          <div v-if="cardRank.get(item.numbering)">
            cardRank: {{ cardRank.get(item.numbering) }}
          </div>
          {{ item.desc.map((v:string) => langObject[lang].object?.[v] ?? v).join("") }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.item {
  @apply flex py-2  border-0 border-b-2 border-solid pb-3;
  @apply border-[var(--vp-c-neutral)];
  @apply w-full;
  @apply flex-wrap;
}
</style>
<style>
html {
  @apply overflow-hidden;
  @apply h-100dvh;
}
body,
#app,
.Layout,
.VPContent,
.VPDoc,
.container,
.content-container,
.content,
.main {
  @apply h-full;
}
.container .content {
  @apply pb-0;
}
.vp-doc {
  @apply h-full;
  @apply overflow-hidden;
}
.vp-doc > div {
  @apply h-full;
  @apply overflow-hidden;
}
</style>
