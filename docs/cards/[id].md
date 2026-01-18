<script setup lang="ts">
import { useData } from "vitepress";
const { params } = useData();
</script>
<CardDetail :data="params" />
