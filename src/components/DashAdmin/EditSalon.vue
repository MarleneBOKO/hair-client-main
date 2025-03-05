<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-6">Modifier Salon</h2>
      <form>
        <!-- Form fields go here -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom du salon</label>
          <input type="text" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
          <input type="text" id="address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Enregistrer</button>
      </form>
    </div>
  </template>
  

<script setup>

</script>

<style lang="scss" scoped>

</style>