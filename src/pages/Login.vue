<template>
  <div class="login">
    <h2 class="text-3xl font-bold text-center">Вход</h2>
    <form @submit.prevent="login">
      <div class="p-8 flex flex-col items-center gap-3">
        <input
          class="w-80 py-3 rounded-lg outline-none px-10 bg-zinc-200"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="w-80 py-3 rounded-lg outline-none px-10 bg-zinc-200"
          type="password"
          placeholder="Пароль"
          v-model="password"
        />
      </div>
      <div class="text-center">
        <button
          class="w-80 transition bg-lime-500 p-14 rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          type="submit"
        >
          Войти
        </button>
      </div>
    </form>

    <p class="text-center mt-5 cursor-pointer">
      Нет аккаунта?
      <router-link to="/register" class="text-blue-500 " >Зарегистрироваться</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch("https://713aef495936238c.mokky.dev/auth", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const result = await res.json();

        if (res.ok) {
          localStorage.setItem("token", result.token);
          alert("Вход выполнен!");
          this.$router.push("/");
        } else {
          alert("Ошибка: " + (result.message || "Неверный email или пароль"));
        }
      } catch (err) {
        alert("Ошибка входа: " + err.message);
      }
    },
  },
};
</script>
