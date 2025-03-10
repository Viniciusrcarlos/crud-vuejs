<script setup lang="ts">
import Header from "./components/Header.vue";
import ConfirmationModal from './components/ConfirmDelete.vue';
import UserList from "./components/UserList.vue";
import UserForm from "./components/UserForm.vue";
import { useUserStore } from "./stores/userStore";
import { onMounted, ref } from "vue";
import type { User } from "./types/User";

const userStore = useUserStore();
onMounted(() => {
  userStore.fetchUsers();
});

const editingUser = ref<User | null>(null);
const isModalOpen = ref(false);
const userToDelete = ref<User | null>(null);

const handleSaveUser = (user: { name: string; email: string; phone?: string }) => {
  if (editingUser.value) {
    userStore.updateUser(editingUser.value.id, user);
  } else {
    userStore.createUsers(user);
  }
  resetForm();
};

const editUser = (user: User) => {
  editingUser.value = { ...user };
};

const resetForm = () => {
  editingUser.value = null;
};

const confirmDeleteUser = (user: User) => {
  userToDelete.value = user;
  isModalOpen.value = true;
};

const deleteUser = () => {
  if (userToDelete.value) {
    userStore.deleteUsers(userToDelete.value.id);
    userToDelete.value = null;
    isModalOpen.value = false;
  }
};
</script>

<template>
  <Header :name="'CRUD VueJS'"/>

  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="w-96 flex flex-col items-center gap-6 bg-base-200 rounded-lg shadow-lg p-6">

      <UserForm
          :user="editingUser"
          @save="handleSaveUser"
          @cancel="resetForm"
      />

      <UserList
          :users="userStore.users"
          @editUser="editUser"
          @deleteUser="confirmDeleteUser"
      />
    </div>
  </div>

  <ConfirmationModal
      :title="'Excluir Usuário'"
      :message="'Tem certeza que deseja excluir o usuário ' + (userToDelete?.name || '') + '?'"
      :isOpen="isModalOpen"
      @confirm="deleteUser"
      @cancel="isModalOpen = false"
  />
</template>
