<script setup lang="ts">
import Header from './components/Header.vue'
import {useUserStore} from "./stores/userStore.ts";
import {onMounted, ref} from "vue";

const userStore = useUserStore();
onMounted(() => {
  userStore.fetchUsers();
})

const name = ref("");
const email = ref("");
const phone = ref("");

const addUser = () => {
  if (!name.value || !email.value) return
  userStore.createUsers({
    name: name.value,
    email: email.value,
    phone: phone.value,
  })
  name.value = "";
  phone.value = "";
  email.value = "";
}

</script>

<template>
  <Header />
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-80 flex flex-col items-center gap-6 bg-base-200 rounded-lg shadow-lg p-6">

      <!-- Lista de Usuários -->
      <ul class="w-full bg-base-100 rounded-lg shadow p-4">
        <li
            v-for="user in userStore.users"
            :key="user.id"
            class="flex justify-between items-center p-2 border-b last:border-none"
        >
          <span class="text-lg">{{ user.name }}</span>
          <button class="btn btn-error btn-sm" @click="userStore.deleteUsers(user.id)">DELETE</button>
        </li>
      </ul>

      <!-- Formulário de Adição -->
      <div class="w-full flex flex-col items-center gap-4">
        <h2 class="text-xl font-bold">Add User</h2>
        <input class="input input-bordered w-full" v-model="name" placeholder="Name" />
        <input class="input input-bordered w-full" v-model="email" placeholder="Email" />
        <input class="input input-bordered w-full" v-model="phone" placeholder="Phone" />
        <button class="btn btn-primary w-full" @click="addUser">ADD</button>
      </div>

    </div>
  </div>




</template>

<style scoped>
</style>
