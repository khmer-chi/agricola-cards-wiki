<script setup lang="ts">
import { computed, ref } from "vue";
import cardMap from "../../../docs/cardMap.json";
function transformString(input: string) {
  // 1. 取得第一個字元 'A' 的 ASCII 碼 (65)
  const charCode = input.charCodeAt(0);

  // 2. 取得後面的數字部分 '001' 並轉為整數 (1)
  // substring(1) 代表從索引 1 開始截取到最後
  const numPart = parseInt(input.substring(1), 10);

  // 3. 執行運算：ASCII * 1000 + 數字
  return charCode * 1000 + numPart;
}
const cardMapSorted = (cardMap as any[]).toSorted(([, a], [, b]) => {
  return transformString(a.numbering) - transformString(b.numbering);
});
const { data } = defineProps<{ data: any }>();
const { lang, langObject } = data;
const search = ref("");

const cardMapSortedFilterBySearch = computed(() => {
  if (!search.value) return cardMapSorted;
  return cardMapSorted.filter(([, item]) => {
    const searchLower = search.value.toLowerCase();
    const name = langObject[item.name] ?? item.name;
    if (name.toLowerCase().includes(searchLower)) return true;
    for (const descItem of item.desc) {
      const descText = langObject[descItem] ?? descItem;
      if (descText.toLowerCase().includes(searchLower)) return true;
    }
    return false;
  });
});
const searchChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  search.value = el.value;
  el.blur();
};
</script>
<template>
  <div class="flex flex-col">
    <div class="flex items-center mb-5">
      <input
        type="text"
        name="search"
        placeholder="搜尋內容..."
        class="input"
        @keyup.enter="searchChange"
        @blur="searchChange"
      />
      <div class="whitespace-nowrap ml-5">
        {{ cardMapSortedFilterBySearch.length }} 筆結果
      </div>
    </div>
    <div class="flex flex-col overflow-y-auto min-h-0 flex-1">
      <div
        class="flex py-2 border-gray-200 dark:border-zinc-700 border-b pb-3"
        v-for="[, item] in cardMapSortedFilterBySearch"
        :key="item.id"
      >
        <div class="w-1/4">
          <a :href="`/${lang}/cards/${item.id}`">
            <img
              class="max-w-unset h-[200px]"
              :src="`/${lang}/${item.id}.webp`"
              :data-src="`/${lang}/${item.id}.webp`"
              :alt="`${item.name}`"
              loading="lazy"
            />
          </a>
          <div class="text-center pt-2">
            {{ item.numbering }}-{{ langObject[item.name] ?? item.name }}
          </div>
        </div>
        <div class="w-full px-2 py-2 w-3/4">
          {{ item.desc.map((v:string) => langObject[v] ?? v).join("") }}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.input {
  @apply w-full py-2 pl-5 pr-4 rounded-lg border border-solid transition-all duration-200 outline-none; /* 淺色模式樣式 (預設) */
  @apply bg-gray-100 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500;
  @apply focus:ring-2 focus:ring-blue-500/20; /* 黑色模式樣式 (VitePress 使用 .dark 類名) */
  @apply dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:focus:bg-zinc-900 dark:focus:border-blue-400 dark:focus:ring-blue-400/30;
}
</style>
