<script setup>
import { ref, onMounted } from 'vue';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
const appointments = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://hair-api-main-production.up.railway.app/api/salon_appointments', config);
    const data = await response.json();
    appointments.value = data.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
});

</script>


<template>
  <div class="flex flex-col p-6 gap-4">
    <div class="grid grid-cols-7 bg-gray-400 p-3 rounded-t-lg">
      <span class="ml-6">Date et Heure</span>
      <span class="ml-6">Statut</span>
      <span class="ml-6">Montant total</span>
      <span class="ml-6">Méthode de paiement</span>
      <span class="ml-6">Coiffure</span>
      <span class="ml-6">Actions</span> 
    </div>
    <div v-for="appointment in appointments" :key="appointment.id" class="grid grid-cols-7 bg-gray-200 p-3 rounded-lg">
      <span class="ml-6">{{ appointment.date_and_time }}</span>
      <span class="ml-6">{{ appointment.status }}</span>
      <span class="ml-6">{{ appointment.total_amount }}</span>
      <span class="ml-6">{{ appointment.payment_method }}</span>
      <span class="ml-6">{{ appointment.hairstyle_name }}</span>
      <div class="ml-6"> 
        <button >Modifier</button>
        <button>Annuler</button>


      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
