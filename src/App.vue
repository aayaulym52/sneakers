<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Drawer from "./components/Drawer.vue";

const isDrawerOpen = ref(false);

function openDrawer() {
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
}
</script>

<template>
  <Drawer v-if="isDrawerOpen" @close="closeDrawer" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header @openDrawer="openDrawer" />
    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>
