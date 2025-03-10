<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import type { User } from "../types/User.ts";

const name = ref("");
const email = ref("");
const phone = ref("");

const resetForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
  emit("cancel");
};

const props = defineProps<{
  user: User | null;
}>();

const emit = defineEmits<{
  (e: "save", user: { name: string; email: string; phone?: string }): void;
  (e: "cancel"): void;
}>();

watch(
    () => props.user,
    (newUser) => {
      if (newUser) {
        name.value = newUser.name;
        email.value = newUser.email;
        phone.value = newUser.phone || "";
      } else {
        resetForm();
      }
    },
    { immediate: true }
);

const saveUser = () => {
  if (!name.value || !email.value) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }
  emit("save", {
    name: name.value,
    email: email.value,
    phone: phone.value,
  });
  resetForm();
};
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <h2 class="text-xl font-bold">{{ user ? "Edit User" : "Add User" }}</h2>
    <input
        class="input input-bordered w-full"
        v-model="name"
        placeholder="Name"
    />
    <input
        class="input input-bordered w-full"
        v-model="email"
        placeholder="Email"
        type="email"
    />
    <input
        class="input input-bordered w-full"
        v-model="phone"
        placeholder="Phone"
        type="tel"
    />
    <button
        class="btn btn-success w-full"
        @click="saveUser"
    >
      {{ user ? "UPDATE" : "ADD" }}
    </button>
    <button
        v-if="user"
        class="btn btn-outline w-full"
        @click="resetForm"
    >
      CANCEL
    </button>
  </div>
</template>
