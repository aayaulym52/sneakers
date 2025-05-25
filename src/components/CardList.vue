<script setup>
import Card from "./Card.vue";
import { defineProps } from "vue";

const props = defineProps({
  items: Array,
});
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>
