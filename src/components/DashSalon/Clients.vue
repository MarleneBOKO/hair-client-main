<script setup>
import { ref, onMounted } from 'vue';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
const clients = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://hair-api-main-production.up.railway.app/api/salon', config);
    const data = await response.json();
    clients.value = data.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
  }
});
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <div class="grid grid-cols-7 bg-gray-400 p-3 rounded-t-lg">
      <span class="ml-6">Nom</span>
      <span class="ml-6">Adresse</span>
      <span class="ml-6">Téléphone</span>
      <span class="ml-6">Email</span>
      <span class="ml-6">Date de naissance</span>
      <span class="ml-6">Sexe</span>
      <span class="ml-6">Notes</span>
    </div>
    <div v-for="client in clients" :key="client.id" class="grid grid-cols-7 bg-gray-200 p-3 rounded-lg">
      <span class="ml-6">{{ client.name }}</span>
      <span class="ml-6">{{ client.address }}</span>
      <span class="ml-6">{{ client.phone_number }}</span>
      <span class="ml-6">{{ client.email }}</span>
      <span class="ml-6">{{ client.birth_date }}</span>
      <span class="ml-6">{{ client.gender }}</span>
      <span class="ml-6">{{ client.notes }}</span>
      <div class="ml-6"> <!-- Ajout d'un conteneur pour les boutons -->
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
</style>
