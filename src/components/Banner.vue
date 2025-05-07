<template>

<div class="relative w-full h-96 rounded-3xl overflow-hidden my-8">
    <!-- Фон -->
    <img
      src="/banner-border.png"
      alt="Фон"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Модель -->
    <img
      src="/banner.png"
      alt="Модель"
      class="absolute bottom-0 right-0 h-full"
      style="right: 0; max-width: none"
    />

    <!-- Логотип -->
    <img
      src="/banner-logo.png"
      alt="Логотип"
      class="absolute top-8 left-10 h-16"
    />

    <div
      class="absolute left-20 top-2/3 -translate-y-2/3 max-w-[30%] text-white"
    >
      <h2 class="text-5xl font-bold text-lime-600 mb-3">
        San Smith <span class="text-stone-950">,</span>
      </h2>
      <h2 class="text-5xl font-bold text-stone-950">Forever!</h2>
      <router-link to="/">
        <button
          class="mt-6 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-4xl text-lg transition"
        >
          Начать покупки
        </button>
      </router-link>
    </div>
  </div>

</template>