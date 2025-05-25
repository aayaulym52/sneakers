<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Адрес доставки</h2>

    <input
      v-model="localForm.city"
      placeholder="г.Астана"
      :class="inputClass"
    />
    <input v-model="localForm.street" placeholder="Улица" :class="inputClass" />

    <div class="flex items-center gap-2">
      <input v-model="localForm.house" placeholder="Дом" :class="inputClass" />
      <input
        v-model="localForm.apartment"
        placeholder="Квартира"
        :class="inputClass"
      />
    </div>

    <button v-if="showButton" @click="submitAddress" :class="buttonClass">
      Сохранить адрес
    </button>

    <p v-if="saveSuccess" class="text-green-500 mt-2">Адрес сохранён</p>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from "vue";

const props = defineProps({
  form: Object,
  showButton: Boolean,
});
const emit = defineEmits(["update:form", "save"]);

const localForm = reactive({ ...props.form });

watch(
  () => props.form,
  (newVal) => {
    Object.assign(localForm, newVal);
  }
);

watch(
  localForm,
  (newVal) => {
    emit("update:form", { ...newVal });
  },
  { deep: true }
);

const saveSuccess = ref(false);
const submitAddress = () => {
  emit("save");
  saveSuccess.value = true;
  setTimeout(() => (saveSuccess.value = false), 2000);
};

const inputClass = "w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg";
const buttonClass =
  "bg-green-500 hover:bg-green-600 text-white w-xs mt-4 py-3 rounded-lg transition";
</script>
