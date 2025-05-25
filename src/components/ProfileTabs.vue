<template>
  <nav class="w-1/4 border-r pr-6">
    <ul class="flex flex-col gap-4 text-lg">
      <li
        v-for="tab in tabs"
        :key="tab.name"
        @click="selectTab(tab.name)"
        :class="{
          'text-blue-500 font-semibold cursor-pointer':
            selectedTab === tab.name,
          'cursor-pointer hover:text-blue-400': selectedTab !== tab.name,
        }"
      >
        {{ tab.label }}
      </li>
      <li
        @click="$emit('logout')"
        class="cursor-pointer text-red-500 hover:text-red-600 font-semibold mt-10"
      >
        Выйти
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps(["selectedTab"]);
const emit = defineEmits(["update:selectedTab", "logout"]);

const tabs = [
  { name: "orders", label: "История заказов" },
  { name: "address", label: "Адрес доставки" },
  { name: "contacts", label: "Контактные данные" },
];

function selectTab(tab) {
  emit("update:selectedTab", tab);
}
</script>
