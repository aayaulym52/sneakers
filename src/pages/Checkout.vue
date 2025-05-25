<template>
  <div v-if="showSuccess" :class="successClass">Спасибо за заказ!</div>
  <div v-if="showError" :class="errorClass">Пожалуйста, заполните все поля</div>

  <div class="max-w-7xl mx-auto px-4 py-10 font-inter">
    <h1 class="text-5xl font-bold mb-8">Оформление заказа</h1>
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 class="text-3xl font-bold mb-4">Авторизация</h2>

        <button
          v-if="!isLoggedIn"
          @click="router.push('/profile')"
          class="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg transition mb-4"
        >
          Войти или Зарегистрироваться
        </button>

        <div v-else class="mb-4 text-lg font-semibold text-slate-500">
          Вошли как: {{ user.currentUser.email }}
        </div>

        <ContactForm
          v-model="form"
          :readonly="isLoggedIn"
          :showButton="false"
        />

        <AddressForm
          v-model:form="form.address"
          :readonly="isLoggedIn"
          :showButton="false"
        />

        <DeliveryOptions v-model="form.delivery" />

        <button
          @click="submitOrder"
          class="bg-green-500 hover:bg-green-600 text-white w-full mt-4 py-3 rounded-lg transition"
        >
          Оформить заказ
        </button>
      </div>

      <CartSummary :items="shop.cartItems" :total="totalSum" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useShopStore } from "../stores/shop";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

import CartSummary from "../components/CartSummary.vue";
import ContactForm from "../components/ContactForm.vue";
import AddressForm from "../components/AddressForm.vue";
import DeliveryOptions from "../components/DeliveryOptions.vue";

const shop = useShopStore();
const user = useUserStore();
const router = useRouter();

const isLoggedIn = computed(() => !!user.currentUser);

const showSuccess = ref(false);
const showError = ref(false);
const form = reactive({
  fullName: "",
  phone: "",
  email: "",
  address: {
    city: "",
    street: "",
    house: "",
    apartment: "",
  },
  delivery: "",
});

const totalSum = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const successClass =
  "fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
const errorClass =
  "fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";

async function submitOrder() {
  console.log("Данные формы перед проверкой:", JSON.stringify(form));

  const requiredFields = ["fullName", "phone", "email", "delivery"];
  const requiredAddressFields = ["city", "street", "house", "apartment"];

  const hasEmptyFields =
    requiredFields.some((field) => !form[field] || !form[field].trim()) ||
    requiredAddressFields.some(
      (field) => !form.address[field] || !form.address[field].trim()
    );

  if (hasEmptyFields) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 2500);
    return;
  }

  const userId = user.currentUser?.id || null;

  const order = {
    name: form.fullName,
    phone: form.phone,
    email: form.email,
    address: form.address,
    delivery: form.delivery,
    items: shop.cartItems,
    total: totalSum.value,
    createdAt: new Date().toISOString(),
    userId,
  };

  try {
    await fetch("https://713aef495936238c.mokky.dev/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
      shop.clearCart();
      router.push("/");
    }, 2500);
  } catch (err) {
    console.error(err);
    showError.value = true;
    setTimeout(() => (showError.value = false), 2500);
  }
}

watch(
  isLoggedIn,
  (loggedIn) => {
    if (loggedIn && user.currentUser) {
      form.fullName = user.currentUser.fullName || "";
      form.email = user.currentUser.email || "";
      form.phone = user.currentUser.phone || "";
      if (user.currentUser.address) {
        Object.assign(form.address, {
          city: user.currentUser.address.city || "",
          street: user.currentUser.address.street || "",
          house: user.currentUser.address.house || "",
          apartment: user.currentUser.address.apartment || "",
        });
      }
    }
  },
  { immediate: true }
);
</script>
