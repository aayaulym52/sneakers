<script setup>
import { onMounted, computed } from "vue";
import { useShopStore } from "../stores/shop";
import CardList from "../components/CardList.vue";

const shop = useShopStore();

const favoriteItems = computed(() =>
  shop.items.filter((item) => item.isFavorite)
);

onMounted(async () => {
  await shop.fetchItems();
});
</script>

<template>
  <div
    v-if="shop.notification"
    class="fixed top-8 right-6 bg-green-500 text-md text-white py-2 px-5 rounded shadow-md z-50 transition-all"
  >
    {{ shop.notification }}
  </div>
  <div v-if="favoriteItems.length > 0">
    <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    <CardList :items="favoriteItems" />
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
</template>
