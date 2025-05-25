<template>
  <div class="mt-6 mx-auto max-w-md">
    <form @submit.prevent="register" class="space-y-4">
      <h2 class="text-3xl font-bold">Регистрация</h2>
      <input v-model="name" type="text" placeholder="ФИО" :class="inputClass" />
      <input
        v-model="phone"
        type="phone"
        placeholder="Телефон"
        :class="inputClass"
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        :class="inputClass"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Пароль"
        :class="inputClass"
      />

      <button
        type="submit"
        class="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full transition"
      >
        Зарегистрироваться
      </button>
    </form>
    <p class="text-center mt-6">
      У меня есть аккаунт.
      <button
        class="text-blue-500 hover:text-blue-700"
        @click="$emit('switch')"
      >
        Войти
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";
import Authorization from "../components/Authorization.vue";

const inputClass =
  "w-full py-4 px-4 rounded-full border border-slate-300 outline-none hover:border-green-400 transition";

const name = ref("");
const email = ref("");
const password = ref("");
const phone = ref("");

const router = useRouter();

const emit = defineEmits(["switch", "success"]);

const register = async () => {
  if (!name.value || !email.value || !password.value || !phone.value) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  try {
    const res = await fetch("https://713aef495936238c.mokky.dev/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", email.value);

      alert("Регистрация прошла успешно!");
      emit("success");
      router.push("/");
    } else {
      alert("Ошибка: " + (result.message || "Не удалось зарегистрироваться"));
    }
  } catch (err) {
    alert("Ошибка регистрации: " + err.message);
  }
};
</script>
