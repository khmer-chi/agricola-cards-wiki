<script setup lang="ts">
import { updateUrl } from "../../lib/updateUrl.ts";
import { ref, watch } from "vue";
const { resultCount } = defineProps<{ resultCount: number }>();
const data = defineModel<string>({
  required: true,
});
const scrollRef = defineModel<HTMLElement | void>("scrollRef");
const searchEl = ref<HTMLInputElement | null>(null);
const searchChange = (e: Event) => {
  const el = e.target as HTMLInputElement;
  data.value = el.value;
  el.blur();
  scrollRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  updateUrl({ q: data.value });
};
const clearSearch = () => {
  data.value = "";
  //   if (searchEl.value) searchEl.value.value = "";
  updateUrl({ q: "" });
};
watch(data, () => {
  if (!searchEl.value) return;
  searchEl.value.value = data.value;
});
</script>
<template>
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
        v-if="data"
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
    <div class="whitespace-nowrap ml-5">{{ resultCount }} results</div>
  </div>
</template>
<style scoped>
.input {
  @apply w-full py-2 pl-5 pr-4 rounded-lg border border-solid transition-all duration-200 outline-none; /* 淺色模式樣式 (預設) */
  @apply bg-gray-100 border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500;
  @apply focus:ring-2 focus:ring-blue-500/20; /* 黑色模式樣式 (VitePress 使用 .dark 類名) */
  @apply dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:focus:bg-zinc-900 dark:focus:border-blue-400 dark:focus:ring-blue-400/30;
}
</style>
