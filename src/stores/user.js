import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    async fetchCurrentUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.currentUser = null;
        return;
      }

      try {
        const res = await fetch("https://713aef495936238c.mokky.dev/users");
        if (!res.ok) throw new Error("Ошибка получения пользователей");

        const users = await res.json();

        const email = localStorage.getItem("email");

        if (!email) {
          this.currentUser = null;
          return;
        }

        this.currentUser = users.find((user) => user.email === email) || null;
      } catch (e) {
        console.error("Ошибка при получении пользователя:", e);
        this.currentUser = null;
      }
    },

    setUser(userData) {
      this.currentUser = userData;
    },
  },
});
