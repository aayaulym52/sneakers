<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
import { inject } from "vue";
import CardList from "../components/CardList.vue";
import Banner from '../components/Banner.vue'

const { cart, addToCart, removeFromCart } = inject("cart");

const items = ref([]); //state - хранит все кроссовки - массивы

const filters = reactive({
  sortBy: "title",
  searchQuery: "",
}); // state реактивный - хранит фильтры - обьекты

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
}; // следит за изменением селекта

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 300); // следит за изменением фильтров

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id,
      };

      item.isFavorite = true;

      const { data } = await axios.post(
        `https://713aef495936238c.mokky.dev/favorites`,
        obj
      );

      item.favoriteId = data.id;
    } else {
      item.isFavorite = false;

      await axios.delete(
        `https://713aef495936238c.mokky.dev/favorites/${item.favoriteId}`
      );
      item.favoriteId = null;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      `https://713aef495936238c.mokky.dev/favorites`
    );

    items.value = items.value.map((item) => {
      const favorite = favorites.find(
        (favorite) => favorite.item_id === item.id
      );
      if (!favorite) {
        return item;
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get(
      `https://713aef495936238c.mokky.dev/items`,
      {
        params,
      }
    );
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }));
  } catch (err) {
    console.log(err);
  }
}; //функция которая будет при каждом изменении фильтров или же при первом рендере, выполнять запрос на бэкэнд

onMounted(async () => {
  const localCart = localStorage.getItem("cart");
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }));
});

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }));
});

watch(filters, fetchItems);
</script>

<template>
  <Banner />

  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевое)</option>
        <option value="-price">По цене (дорогие)</option>
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
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddPlus"
    />
  </div>
</template>
