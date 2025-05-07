<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import CardList from '../components/CardList.vue'; 

// Получаем токен и проверяем авторизацию
const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");
const isAuthenticated = ref(!!token);
const orders = ref([]);

// Функция для загрузки заказов
const fetchOrders = async () => {
  try {
    const { data } = await axios.get(
      "https://713aef495936238c.mokky.dev/orders?_relations=items",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orders.value = data;
  } catch (err) {
    console.error("Ошибка при загрузке заказов:", err);
  }
};

// При загрузке компонента
onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push("/register"); // Если не авторизован — на регистрацию
    return;
  }

  await fetchOrders(); // Загружаем заказы
});

// Если пользователь уже на /profile и снова пришёл сюда — заново загружаем заказы
watch(
  () => route.fullPath,
  async () => {
    if (isAuthenticated.value) {
      await fetchOrders();
    }
  }
);
</script>

<template>
  <div class="p-10" v-if="isAuthenticated">
    <div v-if="orders.length > 0">
      <h2 class="text-3xl font-bold mb-8">Мои заказы</h2>
      <div v-for="order in orders" :key="order.id" class="mb-10">
        <p class="text-2xl font-bold mb-4">Заказ №{{ order.id }}</p>
        <CardList :items="order.items" />
      </div>
    </div>
    <div v-else class="flex flex-col items-center">
      <img width="80" height="80" src="/emoji-1.png" alt="Emoji" />
      <h2 class="text-2xl font-bold mt-4 mb-4">У вас нет заказов</h2>
      <p class="text-gray-400">Вы что, нищеброд?</p>
      <p class="text-gray-400">Оформите хотя бы один заказ.</p>
      <router-link to="/">
        <button
          class="mt-10 w-60 transition bg-lime-500 p-14 rounded-xl py-3 text-white hover:bg-lime-600"
        >
          Вернуться назад
        </button>
      </router-link>
    </div>
  </div>
</template>
