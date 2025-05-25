<template>
  <label class="block text-3xl font-bold mb-6">Способ доставки</label>
  <div class="flex flex-col gap-3">
    <label
      v-for="option in options"
      :key="option.value"
      :class="[
        radioLabelClass,
        { 'border-green-400 bg-green-50': selected === option.value },
      ]"
    >
      <input
        type="radio"
        :value="option.value"
        v-model="selected"
        class="appearance-none w-4 h-4 rounded-full border-2 border-green-400 checked:bg-green-400"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});

const options = [
  { value: "taxi", label: "Яндекс или Индрайвер (по городу)" },
  { value: "kazpost", label: "KAZPOST (неделя)" },
  { value: "cdek", label: "CDEK (3 дня)" },
];

const radioLabelClass =
  "border rounded-lg px-4 py-3 cursor-pointer hover:border-green-400 transition flex items-center gap-3";
</script>
