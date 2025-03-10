<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { User } from "../types/User.ts";

const props = defineProps<{
  users: User[];
}>();

const emit = defineEmits<{
  (e: "editUser", user: User): void;
  (e: "deleteUser", user: User): void;
}>();

const editUser = (user: User) => {
  emit("editUser", user);
};

const confirmDeleteUser = (user: User) => {
  emit("deleteUser", user);
};
</script>

<template>
  <ul class="w-full bg-base-100 rounded-lg shadow p-4">
    <li
        v-for="user in users"
        :key="user.id"
        class="p-4 border-b last:border-none flex flex-col gap-2"
    >
      <span class="text-lg font-bold">{{ user.name }}</span>
      <span class="text-sm text-gray-600">Email: {{ user.email }}</span>
      <span class="text-sm text-gray-600">Phone: {{ user.phone || "N/A" }}</span>
      <div class="flex justify-end gap-2 mt-2">
        <button class="btn btn-warning btn-sm" @click="editUser(user)">EDIT</button>
        <button class="btn btn-error btn-sm" @click="confirmDeleteUser(user)">DELETE</button>
      </div>
    </li>
  </ul>
</template>
