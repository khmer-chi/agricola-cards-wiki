<script setup lang="ts">
import { updateUrl } from "../../lib/updateUrl.ts";
const { name, array } = defineProps<{
  name: string;
  array: string[];
}>();
const data = defineModel<string>();
const scrollRef = defineModel<HTMLElement | void>("scrollRef");
const setCurrent = (payload: string) => {
  if (data.value == payload) {
    payload = "";
  }
  data.value = payload;
  scrollRef.value?.scrollTo({ top: 0, behavior: "smooth" });
  updateUrl({ [name]: payload });
};
</script>
<template>
  <div class="flex items-center mb-5">
    <div class="mr-2">{{ name }}</div>
    <div class="w-full overflow-x-auto flex flex-nowrap">
      <button
        v-for="item in array"
        :key="item"
        @click="setCurrent(item)"
        :class="[
          'mr-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
          data === item
            ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
            : 'bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:border-orange-500 hover:text-orange-500',
        ]"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>
