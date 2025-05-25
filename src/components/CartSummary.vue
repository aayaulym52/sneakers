<template>
  <div class="bg-[#F7F7F7] p-6 rounded-xl">
    <h2 class="text-xl font-semibold mb-4">Ваш заказ</h2>
    <ul class="mb-4 space-y-2">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-4">
        <img
          :src="item.imageUrl"
          alt=""
          class="w-24 h-24 object-contain rounded-2xl"
        />
        <div class="flex flex-col">
          <p>{{ item.title }}</p>
          <p class="text-slate-700">({{ item.quantity }} шт.)</p>
          <p>{{ item.price * item.quantity }} тг.</p>
        </div>
      </li>
    </ul>

    <div class="text-2xl font-bold flex justify-between mt-6">
      <span>Итого:</span>
      <span>{{ total.toLocaleString() }} руб.</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: Array,
  total: Number,
});
</script>
