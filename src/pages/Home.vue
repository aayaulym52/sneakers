<script setup>
import { useShopStore } from "../stores/shop";
import { reactive, watch, onMounted } from "vue";
import debounce from "lodash.debounce";
import CardList from "../components/CardList.vue";
import Banner from "../components/Banner.vue";

const shop = useShopStore();
const filters = reactive({
  sortBy: "title",
  searchQuery: "",
  category: "",
});

const onChangeSearchInput = debounce((e) => {
  filters.searchQuery = e.target.value;
}, 300);

const onChangeSelect = (e) => (filters.sortBy = e.target.value);

watch(
  filters,
  () => {
    shop.fetchItems(filters.sortBy, filters.searchQuery);
  },
  { deep: true }
);

onMounted(() => {
  shop.fetchItems(filters.sortBy, filters.searchQuery);
});
</script>

<template>
  <Banner />

  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
        :value="filters.sortBy"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевле)</option>
        <option value="-price">По цене (дороже)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="shop.items" />
  </div>
</template>
