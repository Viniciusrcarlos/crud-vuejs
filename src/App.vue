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
  <ul>
    <li v-for="user in userStore.users">
      {{ user.name }}
      <button @click="userStore.deleteUsers(user.id)">DELETE</button>
    </li>
  </ul>

  <h2>Add User</h2>
  <input v-model="name" placeholder="Name" />
  <input v-model="email" placeholder="Email" />
  <input v-model="phone" placeholder="Phone" />
  <button @click="addUser">ADD</button>

</template>

<style scoped>
</style>
