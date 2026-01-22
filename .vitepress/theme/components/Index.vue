<script setup lang="ts">
import { computed, ref, onMounted, watchEffect, effect, watch } from "vue";
import FilterButtonGroup from "./FilterButtonGroup.vue";
import { updateUrl } from "../../lib/updateUrl.ts";
import { parseHash2Object } from "../../lib/parseHash2Object.ts";
import { filterCard } from "../../lib/filterCard.ts";
import { getLangObject } from "../../lib/getLangObject.ts";

const { data } = defineProps<{ data: any }>();
const lang = computed(() => {
  return data.lang;
});
const langObject = computed(() => {
  return data.langObject;
});

const searchQuery = ref("");
const currentDeck = ref("");
const currentPlayer = ref("");

const cardMapSortedFilterBySearch = computed(() => {
  return filterCard(
    langObject.value,
    searchQuery.value,
    currentDeck.value,
    currentPlayer.value
  );
});

const scrollRef = ref<HTMLDivElement | void>();
const searchChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  searchQuery.value = el.value;
  el.blur();
  scrollRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  updateUrl({ q: searchQuery.value });
};
const searchEl = ref<HTMLInputElement | null>(null);
const initSearchUrl = () => {
  const oriObj = parseHash2Object();
  searchQuery.value = oriObj.q || "";
  currentDeck.value = oriObj.deck || "";
  currentPlayer.value = oriObj.player || "";
  if (searchEl.value) {
    searchEl.value.value = searchQuery.value;
  }
};
onMounted(() => {
  initSearchUrl();

  // 監聽手動修改網址 Hash 的行為 (例如點擊上一頁)
  window.addEventListener("hashchange", () => {
    initSearchUrl();
  });
});
const clearSearch = () => {
  searchQuery.value = "";
  if (searchEl.value) searchEl.value.value = "";
  updateUrl({ q: "" });
};
</script>
<template>
  <div class="flex flex-col overflow-hidden h-full">
    <div class="flex items-center mb-5">
      <div class="relative w-full">
        <input
          type="text"
          name="search"
          placeholder="請輸入卡號/卡名/描述進行搜尋"
          class="input"
          ref="searchEl"
          @keyup.enter="searchChange"
          @blur="searchChange"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute top-2 right-2 p-1 border-none bg-transparent cursor-pointer color-[var(--vp-c-text-2)] hover:color-[var(--vp-c-text-1)] flex items-center justify-center transition-colors"
          aria-label="Clear search"
        >
          <div class="i-carbon-close-filled text-lg" v-if="false"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="whitespace-nowrap ml-5">
        {{ cardMapSortedFilterBySearch.length }} results
      </div>
    </div>
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
          <!-- <a
            :href="`/${lang}/cards/${item.id}`"
            target="_blank"
            class="flex justify-center"
          > -->
          <img
            class="max-w-300px w-full min-h-200px"
            :src="`/${lang}/${item.id}.webp`"
            :alt="`${item.name}`"
            loading="lazy"
          />
          <!-- </a> -->
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
          {{ item.desc.map((v:string) => langObject[lang].object?.[v] ?? v).join("") }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input {
  @apply w-full py-2 pl-5 pr-4 rounded-lg border border-solid transition-all duration-200 outline-none; /* 淺色模式樣式 (預設) */
  @apply bg-gray-100 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500;
  @apply focus:ring-2 focus:ring-blue-500/20; /* 黑色模式樣式 (VitePress 使用 .dark 類名) */
  @apply dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:focus:bg-zinc-900 dark:focus:border-blue-400 dark:focus:ring-blue-400/30;
}
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
