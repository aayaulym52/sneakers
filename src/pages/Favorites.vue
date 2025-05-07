<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import CardList from "../components/CardList.vue";

const favorites = ref([]);
onMounted(async () => {
  try {
    const { data } = await axios.get(
      "https://713aef495936238c.mokky.dev/favorites?_relations=items"
    );
    favorites.value = data.map((obj) => obj.item);
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="p-10">
  <div v-if="favorites.length > 0">
    <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    <CardList :items="favorites" is-favorites />
  </div>

  <div v-else class="flex flex-col items-center">
    <img width="80" height="80" src="/emoji-2.png" alt="Emoji" />
    <h2 class="text-2xl font-bold mt-4">Закладок нет :(</h2>
    <p class="mt-4 text-gray-400">Вы ничего не добавляли в закладки</p>

    <router-link to="/">
      <button
        class="mt-10 w-60 transition bg-lime-500 p-14 rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
      >
        Вернуться назад
      </button>
    </router-link>
  </div>
  </div>
</template>
