<script setup lang="ts">
const { data } = defineProps<{ data: any }>();
</script>
<template>
  <div class="flex flex-wrap">
    <div class="md:w-1/2 w-full flex-none flex justify-center items-start">
      <img :src="`/${data.lang}/${data.id}.webp`" :alt="`${data.name}`" />
    </div>
    <div class="md:w-1/2 w-full p-2 flex-none">
      <div>lang:{{ data.lang }}</div>
      <div>name:{{ data.name }}</div>
      <div>desc:{{ data.desc.join("\n") }}</div>
      <div>cost:{{ data.cost }}</div>
      <div>deck:{{ data.deck }}</div>
      <div>prerequisite:{{ data.prerequisite }}</div>
      <div>costs:{{ data.costs }}</div>
      <div>conditionalCost:{{ data.conditionalCost }}</div>
      <div>numbering:{{ data.numbering }}</div>
      <div>vp:{{ data.vp }}</div>
      <div>players:{{ data.players }}</div>
      <div>type:{{ data.type }}</div>
      <div>category:{{ data.category }}</div>
      <div>holder:{{ data.holder }} 物资或农民放在卡片上 或是把资源放回行动格</div>
      <div>animalHolder:{{ data.animalHolder }} 卡牌可容纳动物</div>
      <div>bread:{{ !!data.bread }}</div>
      <div>cook:{{ !!data.cook }}</div>
      <div>actionCard:{{ data.actionCard }}行动格</div>
      <div>field:{{ data.field }}种田卡</div>
      <div>passing:{{ data.passing }}传递卡</div>
    </div>
    <!-- <pre>{{ JSON.stringify(data,null,2) }}</pre> -->
    <div class="w-full flex-none p-2">
      <!-- 出场排名 -->
      <!-- 被选排名 -->
      <!-- 其他卡 一起出场排名 -->
    </div>
    <div class="w-full flex-none p-2">
      <!-- 相关卡片 同category  -->
      <!-- 可达成combo -->
    </div>
  </div>
</template>
