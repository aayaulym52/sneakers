<template>
  <div>
    <div v-if="isLoggedIn">
      <h2 class="text-2xl font-bold mb-10">Профиль</h2>
      <p class="mb-10">
        <strong>Привет</strong> {{ userStore.currentUser?.fullName }}
      </p>

      <div class="flex gap-10">
        <ProfileTabs
          :selectedTab="selectedTab"
          @update:selectedTab="selectedTab = $event"
          @logout="logout"
        />

        <section class="flex-1">
          <OrdersList v-if="selectedTab === 'orders'" :orders="orders" />

          <AddressForm
            v-if="selectedTab === 'address'"
            v-model:form="address"
            @save="handleSaveAddress"
            :showButton="true"
          />

          <ContactForm
            v-if="selectedTab === 'contacts'"
            v-model="editedUser"
            @save="saveChanges"
            :showButton="true"
          />
        </section>
      </div>
    </div>

    <div v-else>
      <Register
        v-if="!showLogin"
        @switch="toggleForm"
        @success="handleSuccess"
      />
      <Authorization v-else @switch="toggleForm" @success="handleSuccess" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import Authorization from "../components/Authorization.vue";
import Register from "../components/Register.vue";
import AddressForm from "../components/AddressForm.vue";
import OrdersList from "../components/OrdersList.vue";
import ContactForm from "../components/ContactForm.vue";
import ProfileTabs from "../components/ProfileTabs.vue";

const showLogin = ref(true);
const isLoggedIn = ref(false);
const userStore = useUserStore();

const selectedTab = ref("orders");
const orders = ref([]);

function toggleForm() {
  showLogin.value = !showLogin.value;
}

async function handleSuccess() {
  await userStore.fetchCurrentUser();
  isLoggedIn.value = true;
  showLogin.value = false;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  userStore.setUser(null);
  isLoggedIn.value = false;
  showLogin.value = true;
}
const address = ref({
  city: "",
  street: "",
  house: "",
  apartment: "",
});

const editedUser = reactive({
  fullName: "",
  email: "",
  phone: "",
});

async function handleSaveAddress() {
  const updatedUser = {
    ...userStore.currentUser,
    address: address.value,
  };

  await fetch(`https://713aef495936238c.mokky.dev/users/${updatedUser.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: address.value }),
  });

  userStore.currentUser = updatedUser;
}

async function saveChanges() {
  if (!userStore.currentUser?.id) return;

  try {
    const response = await fetch(
      `https://713aef495936238c.mokky.dev/users/${userStore.currentUser.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      }
    );

    const updated = await response.json();
    userStore.currentUser = updated;
    alert("Данные успешно обновлены!");
  } catch (error) {
    console.error(error);
    alert("Ошибка при сохранении");
  }
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  isLoggedIn.value = true;
  showLogin.value = false;

  await userStore.fetchCurrentUser();

  if (userStore.currentUser) {
    editedUser.fullName = userStore.currentUser.fullName || "";
    editedUser.email = userStore.currentUser.email || "";
    editedUser.phone = userStore.currentUser.phone || "";

    if (userStore.currentUser.address) {
      address.value = { ...userStore.currentUser.address };
    }

    const res = await fetch("https://713aef495936238c.mokky.dev/orders");
    const data = await res.json();

    orders.value = data
      .filter((order) => order.userId === userStore.currentUser.id)
      .map((order) => ({ ...order, items: order.items || [] }));
  }
});
</script>
