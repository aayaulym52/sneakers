<template>
  <div class="register">
    <h2 class="text-3xl font-bold text-center mb-5">Регистрация</h2>
    <form @submit.prevent="register">
      <div class="p-8 flex flex-col items-center gap-3">
        <input
          class="w-80 py-3 rounded-lg outline-none p-10 bg-zinc-200"
          type="text"
          placeholder="Имя"
          v-model="name"
        />
        <input
          class="w-80 py-3 rounded-lg outline-none p-10 bg-zinc-200"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="w-80 py-3 rounded-lg outline-none p-10 bg-zinc-200"
          type="password"
          placeholder="Пароль"
          v-model="password"
        />
      </div>
      <div class="text-center">
        <button
          class="w-80 transition bg-lime-500 p-14 rounded-lg py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>

    <p class="text-center mt-5 cursor-pointer">
      Уже зарегистрированы?
      <router-link to="/login" class="text-blue-600 ">Войти</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      if (!this.name || !this.email || !this.password) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      try {
        const res = await fetch("https://713aef495936238c.mokky.dev/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: this.name,
            email: this.email,
            password: this.password
          })
        });

        const result = await res.json();

        if (res.ok) {
          localStorage.setItem("token", result.token);
          alert("Регистрация прошла успешно!");
          this.$router.push("/");
        } else {
          alert("Ошибка: " + (result.message || "Не удалось зарегистрироваться"));
        }
      } catch (err) {
        alert("Ошибка регистрации: " + err.message);
      }
    }
  }
};
</script>
