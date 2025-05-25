<script setup>
import { computed } from "vue";
import { useShopStore } from "../stores/shop";
import DrawerHead from "./DrawerHead.vue";
import InfoBlock from "./InfoBlock.vue";

const emit = defineEmits(["close"]);

const shop = useShopStore();

function closeDrawer() {
  emit("close");
}

const totalPrice = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const totalItems = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

function removeFromCart(id) {
  shop.removeFromCart(id);
}

function increaseQuantity(id, currentQuantity) {
  shop.updateQuantity(id, currentQuantity + 1);
}

function decreaseQuantity(id, currentQuantity) {
  if (currentQuantity > 1) {
    shop.updateQuantity(id, currentQuantity - 1);
  } else {
    shop.removeFromCart(id);
  }
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black opacity-50 z-10"
    @click="closeDrawer"
  ></div>

  <div class="bg-white w-[480px] h-full fixed right-0 top-0 z-20 flex flex-col">
    <div class="p-8">
      <DrawerHead @close="closeDrawer" />
    </div>

    <div class="flex-1 overflow-y-auto px-8">
      <div
        v-if="shop.cartItems.length === 0"
        class="h-full flex flex-col justify-center items-center"
      >
        <InfoBlock
          title="Корзина пустая"
          description="Добавьте товары в корзину, чтобы сделать заказ"
          image-url="/package-icon.png"
        />
      </div>

      <div v-else class="flex flex-col">
        <div
          v-if="shop.notification"
          class="fixed top-8 right-6 bg-green-500 text-md text-white py-2 px-5 rounded shadow-md z-50 transition-opacity duration-500"
        >
          {{ shop.notification }}
        </div>
        <table class="w-full table-auto border-collapse text-left mb-6">
          <tbody>
            <tr
              v-for="item in shop.cartItems"
              :key="item.id"
              class="border-b border-gray-300"
            >
              <td class="py-3">
                <div class="w-24 h-24 overflow-hidden rounded-lg shadow-md">
                  <img
                    :src="item.imageUrl"
                    alt="product"
                    class="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td class="py-3 pl-6 align-top">
                <div class="font-semibold text-lg mb-1">{{ item.title }}</div>
                <div class="text-slate-600 font-semibold text-xl mb-3">
                  {{ (item.price * item.quantity).toLocaleString() }} руб.
                </div>
                <div class="flex items-center gap-4 mt-2">
                  <div
                    class="flex items-center bg-gray-100 rounded-full px-3 py-1 w-max select-none"
                  >
                    <button
                      @click="decreaseQuantity(item.id, item.quantity)"
                      class="text-xl px-3 hover:text-pink-500 transition cursor-pointer"
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span class="px-4 font-medium">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item.id, item.quantity)"
                      class="text-xl px-3 hover:text-pink-500 transition cursor-pointer"
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                    aria-label="Удалить товар"
                  >
                    <img
                      src="/bin.png"
                      alt="Удалить"
                      class="w-6 h-6 opacity-70 hover:opacity-100"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="shop.cartItems.length > 0" class="p-8 border-t">
      <p class="text-lg font-semibold mb-2">
        Товары ({{ totalItems }}):
        <span class="float-right">{{ totalPrice.toLocaleString() }} руб.</span>
      </p>
      <button
        class="bg-green-500 text-white w-full py-3 rounded hover:bg-green-600 transition"
        @click="
          $router.push('/checkout');
          closeDrawer();
        "
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
