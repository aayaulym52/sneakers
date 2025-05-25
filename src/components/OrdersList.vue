<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6">Мои заказы</h3>

    <div
      v-if="orders.length"
      class="flex flex-col gap-4 max-h-[400px] overflow-y-auto"
    >
      <div
        v-for="order in orders"
        :key="order.id"
        class="p-4 border border-slate-200 rounded cursor-pointer"
      >
        <div class="flex justify-between mb-2">
          <span class="font-semibold">Заказ №{{ order.id }}</span>
          <span class="text-gray-600 text-sm">
            {{ formatDate(order.createdAt) }}
          </span>
        </div>

        <ul class="list-disc list-inside text-gray-700 mb-2">
          <li
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center gap-3"
          >
            <img
              :src="item.imageUrl"
              alt="Товар"
              class="w-12 h-12 object-cover rounded"
            />

            <span>{{ item.title }} — {{ item.quantity }} шт.</span>
          </li>
        </ul>

        <div class="font-bold text-blue-600">Итого: {{ order.total }} руб.</div>
      </div>
    </div>

    <p v-else>У вас пока нет заказов.</p>
  </div>
</template>

<script setup>
defineProps(["orders"]);

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString();
}
</script>
