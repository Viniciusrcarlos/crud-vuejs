<script setup lang="ts">
import Header from './components/Header.vue'
import { useUserStore } from "./stores/userStore.ts";
import { onMounted, ref } from "vue";
import type { User } from "./types/User.ts";


const userStore = useUserStore();
onMounted(() => {
  userStore.fetchUsers();
});

const name = ref("");
const email = ref("");
const phone = ref("");
const editingUser = ref<User | null>(null);

const addUser = () => {
  if (!name.value || !email.value) return;
  userStore.createUsers({
    name: name.value,
    email: email.value,
    phone: phone.value,
  });
  resetForm();
};

const editUser = (user: User) => {
  editingUser.value = { ...user };
  name.value = user.name;
  email.value = user.email;
  phone.value = user.phone || "";
};

const updateUser = () => {
  if (!editingUser.value) return;

  userStore.updateUser(editingUser.value.id, {
    name: name.value,
    email: email.value,
    phone: phone.value,
  });

  resetForm();
};

const resetForm = () => {
  editingUser.value = null;
  name.value = "";
  email.value = "";
  phone.value = "";
};

</script>

<template>
  <Header />
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-96 flex flex-col items-center gap-6 bg-base-200 rounded-lg shadow-lg p-6">

      <ul class="w-full bg-base-100 rounded-lg shadow p-4">
        <li
            v-for="user in userStore.users"
            :key="user.id"
            class="p-4 border-b last:border-none flex flex-col gap-2"
        >
          <span class="text-lg font-bold">{{ user.name }}</span>
          <span class="text-sm text-gray-600">Email: {{ user.email }}</span>
          <span class="text-sm text-gray-600">Phone: {{ user.phone || "N/A" }}</span>
          <div class="flex justify-end gap-2 mt-2">
            <button class="btn btn-warning btn-sm" @click="editUser(user)">EDIT</button>
            <button class="btn btn-error btn-sm" @click="userStore.deleteUsers(user.id)">DELETE</button>
          </div>
        </li>
      </ul>

      <div class="w-full flex flex-col items-center gap-4">
        <h2 class="text-xl font-bold">{{ editingUser ? "Edit User" : "Add User" }}</h2>
        <input class="input input-bordered w-full" v-model="name" placeholder="Name" />
        <input class="input input-bordered w-full" v-model="email" placeholder="Email" />
        <input class="input input-bordered w-full" v-model="phone" placeholder="Phone" />
        <button v-if="editingUser" class="btn btn-success w-full" @click="updateUser">UPDATE</button>
        <button v-else class="btn btn-primary w-full" @click="addUser">ADD</button>
        <button v-if="editingUser" class="btn btn-outline w-full" @click="resetForm">CANCEL</button>
      </div>

    </div>
  </div>
</template>
