<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  title: string;
  message: string;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();


const confirmAction = () => {
  emit("confirm");
};

const cancelAction = () => {
  emit("cancel");
};
</script>

<template>
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ message }}</p>
      <div class="modal-action">
        <button class="btn btn-outline" @click="cancelAction">Cancelar</button>
        <button class="btn btn-error" @click="confirmAction">Excluir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
