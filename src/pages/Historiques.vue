<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const services = ref([]);

const fetchServices = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/client-services', config);
    services.value = response.data.servicedata;
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
  }
};

onMounted(() => {
  fetchServices();
});
</script>


<template>
    <div class="service-history p-5">
      <h1 class="text-2xl font-bold mb-5">Historique des Services</h1>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2 text-left">Client</th>
            <th class="border p-2 text-left">Nom de la Coiffure</th>
            <th class="border p-2 text-left">Montant</th>
            <th class="border p-2 text-left">Employé</th>
            <th class="border p-2 text-left">Date</th>
            <th class="border p-2 text-left">Heure Début</th>
            <th class="border p-2 text-left">Heure Fin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(service, index) in services" :key="index" class="border ">
            <td class="border p-2">{{ service.client }}</td>
            <td class="border p-2 ">{{ service.nom_coiffure }}</td>
            <td class="border p-2 ">{{ service.montant }}</td>
            <td class="border p-2 ">{{ service.employe }}</td>
            <td class="border p-2 ">{{ service.date }}</td>
            <td class="border p-2 ">{{ service.heure_debut }}</td>
            <td class="border p-2 ">{{ service.heure_fin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
 
  
  <style scoped>
  .service-history {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  </style>
  