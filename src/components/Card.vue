<script setup>
import { useShopStore } from "../stores/shop";
import { computed } from "vue";

const shop = useShopStore();

const props = defineProps({
  item: Object,
});

const { id } = props.item;

const isInCart = computed(() =>
  shop.cartItems.some((cartItem) => cartItem.id === id)
);

const isFavorite = computed(() => props.item.isFavorite);

async function toggleFavorite() {
  await shop.toggleFavorite(props.item);
}

function toggleCart() {
  if (isInCart.value) {
    shop.removeFromCart(id);
  } else {
    shop.addToCart({ ...props.item, quantity: 1 });
  }
}
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="!isFavorite ? './like-1.svg' : './like-2.svg'"
      alt="Like"
      class="absolute top-0 left-8"
      @click.stop="toggleFavorite"
    />

    <img :src="item.imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ item.title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ item.price }} руб.</b>
      </div>

      <img
        @click="toggleCart"
        :src="isInCart ? './checked.svg' : './plus.svg'"
        alt="Add"
      />
    </div>
  </div>
</template>
