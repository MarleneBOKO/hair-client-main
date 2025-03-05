<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Définir la référence pour stocker les rendez-vous du salon
const rendezVousList = ref([]);

// Fonction pour récupérer les rendez-vous du salon
const getRendezVousForClient = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/getRendezVousForClient', config);
    console.log('Response data:', response.data); 
    rendezVousList.value = response.data.map(rendezVous => ({
      id_appointment: rendezVous.id_appointment,
      date_and_time: new Date(rendezVous.date_and_time),
      status: rendezVous.status,
      total_amount: rendezVous.total_amount,
      payment_method: rendezVous.payment_method,
      client: rendezVous.client,
      coiffure: rendezVous.coiffure,
      employes: rendezVous.employes || []
        }));
       console.log('Transformed rendezVousList:', rendezVousList.value);  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous du salon :", error);
  }
};

// Appeler la fonction pour récupérer les rendez-vous lors du montage du composant
onMounted(() => {
  getRendezVousForClient();
});

// Formater la date et l'heure pour l'affichage
const formatDateTime = (dateTime) => {
  const dt = new Date(dateTime);
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
};

// Logique pour récupérer les informations du salon
const rdvInfo = ref({
  count_rdv: 0,
  
});

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Authorization": "Bearer " + token
  }
};

// Fonction pour récupérer les informations du salon
const getClientrdv = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/getClientrdv', config);
    rdvInfo.value = response.data;
    console.log(rdvInfo.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du salon :", error);
  }
};
const userName = ref('');

onMounted(async () => {
 try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/user', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
    userName.value = response.data.name;
 } catch (error) {
    console.error("Failed to fetch user data", error);
 }
});

// Appeler la fonction pour récupérer les informations lors du montage du composant
onMounted(() => {
  getClientrdv();
});
</script>

<template>
  <div class="flex flex-col">
    <div class="p-6 mb-20 bg-gray-100">
      <div class="flex justify-between">
        <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
          <ol class="inline-flex p-0 list-none">
            <li class="flex items-center text-[#5D7052]">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Dashboard</a>
            </li>
          </ol>
        </nav>
        <div class="flex justify-between gap-3 text-sm font-semibold " aria-label="Breadcrumb">
          <router-link to="/" class="text-[#5D7052]">Accueil</router-link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
      <div class="items-center justify-between mb-6 lg:flex">
        <p class="mb-2 text-2xl font-semibold lg:mb-0">Good afternoon, <strong>{{ userName }}</strong></p>
        <router-link to="/profil_user" class="bg-[#6A645A] hover:bg-[#6A645A] focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">Completer mon profil</router-link> 
      </div>
      <div class="flex flex-wrap mb-20 -mx-3">
        <div class="w-1/2 px-3 xl:w-1/4">
          <div class="flex items-center w-full p-6 mb-6 space-x-4 text-blue-400 bg-white rounded-lg xl:mb-0">
            <div class="flex items-center justify-center w-16 h-16 bg-[#D2D2EB] rounded-full">
              <img src="/images/dash/booking.png" alt="" class="w-10 h-10">
            </div>
            <div class="text-[#2A2C24]">
              <p class="text-3xl font-semibold">{{ rdvInfo.count_rdv }}</p>
              <p>Reservations</p>
            </div>
          </div>
        </div>
        
        <div class="w-1/2 px-3 xl:w-1/4">
          <div class="flex items-center w-full p-6 space-x-4 text-blue-400 bg-white rounded-lg">
            <div class="flex items-center justify-center w-16 h-16 bg-[#AA9D9F] rounded-full">
              <img src="/images/dash/procedure.png" alt="" class="w-10 h-w-10">
            </div>
            <div class="text-[#2A2C24]">
              <p class="text-3xl font-semibold">{{ rdvInfo.somme }} FCFA</p>
              <p>Mon compte</p>
            </div>
          </div>
        </div>
        
      </div>
      <div class="bg-white rounded-lg ">
        <div class="flex flex-row justify-between p-6">
          <h1 class="text-xl font-bold">Details des services</h1>
          <div class="flex flex-row gap-4 text-[#2A2C24]">
            <input type="text" placeholder="Rechercher par nom ou adresse" class="p-2 border border-gray-300 rounded" @input="filterSalons">

          </div>
        </div>
        <div class="flex flex-col gap-4 p-6">
          <div class="grid grid-cols-7 p-3 rounded-t-lg bg-[#CFCAC6]">
            <span class="ml-6">Employé</span>
            <span class="ml-6">Réservation</span>
            <span class="ml-6">Heure</span>
            <span class="ml-6">Coiffure</span>
            <span class="ml-6">Montant</span>
            <span class="ml-6">Statut</span>
          </div>
          
          <template v-for="(rendezVous, index) in rendezVousList" :key="index">
        <div class="grid grid-cols-7 p-3 rounded-lg bg-[#cfc7bc75]">
          <span class="ml-6">{{ rendezVous.employes ? rendezVous.employes.join(', ') : 'N/A' }}</span>      
          <span class="ml-6">{{ rendezVous.id_appointment }}</span>
          <span class="ml-6">{{ formatDateTime(rendezVous.date_and_time) }}</span>
          <span class="ml-6">{{ rendezVous.coiffure }}</span>
          <span class="ml-6">{{ rendezVous.total_amount }}</span>
          <span class="ml-6">{{ rendezVous.status }}</span>
        </div>
      </template>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>



<style scoped>
.size-4 {
  width: 16px;
  height: 16px;
}
</style>