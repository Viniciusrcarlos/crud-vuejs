<script lang="ts">
  export default {
    name: 'header',
    props: {
      name: {
        type: String,
        required: true,
      }
    }
  }
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">{{ name }}</a>
    </div>
  </div>
</template>

<style scoped>

</style>