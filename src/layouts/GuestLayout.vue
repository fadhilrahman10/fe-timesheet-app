<script setup>

</script>

<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div>
      <router-link to="/">
        <img src="./../assets/vue.svg" alt="Vue Logo" />
      </router-link>
    </div>

    <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>