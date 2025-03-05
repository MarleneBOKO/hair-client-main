<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const salonInfos = ref({
  countsalons: 0,
  salonsactifs: 0,
  countCoiffures: 0,
  salonsnonactifs: 0
});

const detailsalons = ref({
  name: '',
  address: '',
  num_reservations: 0,
  num_clients: 0,
  num_hairstyles: 0,
  num_employees: 0,
  status: ''
});


const token = localStorage.getItem("token");
const config = {
  headers: {
    "Authorization": "Bearer " + token
  }
};

// Fonction pour récupérer les informations du salon
const getSalonInfos = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/getInfoSalons', config);
    salonInfos.value = response.data;
    console.log(salonInfos.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du salon :", error);
  }
};

// Fonction pour récupérer les détails des salons
const getSalonDetails = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/detailsalon', config);
    console.log(response); // Vérifiez la réponse dans la console
    detailsalons.value = response.data;
    console.log(detailsalons.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails des salons :", error);
  }
};

// Appeler la fonction pour récupérer les informations lors du montage du composant
onMounted(() => {
  getSalonInfos();
  getSalonDetails();
});
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
</script>
<template>
  
          <div class="flex flex-col">
            <div class="p-6 mb-20 bg-gray-100">
            <div class="flex justify-between">
              <nav class="mb-6 text-sm font-semibold" aria-label="Breadcrumb">
                <ol class="inline-flex p-0 list-none">
                  <li class="flex items-center text-[#667D45]">
                    <a href="#" class="text-gray-700">Home</a>
                    <svg class="w-3 h-3 mx-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                  </li>
                  <li class="flex items-center">
                    <a href="#" class="text-gray-600">Dashboard</a>
                  </li>
                </ol>
              </nav>
              
            </div>
          <!-- breadcrumb end -->
          <div class="items-center justify-between mb-6 lg:flex">
            <p class="mb-2 text-2xl font-semibold lg:mb-0">Good afternoon, <strong>{{ userName }}</strong></p>
          </div>
          <div class="flex flex-wrap mb-20 -mx-3">

            <div class="w-1/2 px-3 xl:w-1/4">
              <div class="w-full bg-white space-x-4 text-[#D2D2EB] rounded-lg flex items-center p-6 mb-6 xl:mb-0">
                <div class="flex items-center justify-center w-16 h-16 bg-[#D2D2EB] rounded-full">

                    <img src="/images/dash/hairdresser-barber-shop-hair-salon-hair-studio-svgrepo-com.png" alt="" class="w-10 h-w-10">
                </div>
                <div class="text-[#2A2C24]">
                     <p class="text-3xl font-semibold">{{ salonInfos.count_salons }}</p>
                  <p>Salons</p>
                </div>

              </div>
            </div>

            <div class="w-1/2 px-3 xl:w-1/4 ">
              <div class="flex items-center w-full p-6 mb-6 space-x-4 text-blue-400 bg-white rounded-lg xl:mb-0">
                <div class="flex items-center justify-center w-16 h-16 bg-[#AA9D9F] rounded-full">
                    <img src="/images/dash/disable-eye-inactive-svgrepo-com.png" alt="" class="w-10 h-w-10">

                </div>
                <div class="text-[#2A2C24]">
                  <p class="text-3xl font-semibold">{{ salonInfos.salonsnonactifs }}</p>
                  <p>Salon non activé</p>
                </div>
              </div>
            </div>

            <div class="w-1/2 px-3 xl:w-1/4">
              <div class="flex items-center w-full p-6 space-x-4 text-blue-400 bg-white rounded-lg">
                <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[#826D62]">

                    <img src="/images/dash/active-svgrepo-com.png" alt="" class="w-10 h-w-10">
                </div>

                <div class="text-[#2A2C24]">
                  <p class="text-3xl font-semibold">{{ salonInfos.salonsactifs }}</p>
                  <p>Salon activé</p>
                </div>
              </div>
            </div>

            
            <div class="w-1/2 px-3 xl:w-1/4">
          <div class="flex items-center w-full p-6 mb-6 space-x-4 text-blue-400 bg-white rounded-lg xl:mb-0">
            <div class="flex items-center justify-center w-16 h-16 bg-[#585B4C] rounded-full">
              <img src="/images/dash/hairstyle-2-svgrepo-com.png" alt="" class="w-10 h-10">

            </div>
            <div class="text-[#2A2C24]">
              <p class="text-3xl font-semibold">{{ salonInfos.count_coiffures}}</p>
              <p>Coiffures</p>
            </div>
          </div>
        </div>
        
          </div>
          <div class="bg-white rounded-lg ">
            <div class="flex flex-row justify-between p-6">
                <h1 class="text-xl font-bold">Details des salons</h1>
                <div class="flex flex-row gap-4">
                  <input type="text" placeholder="Rechercher par nom ou adresse" class="p-2 border border-gray-300 rounded" @input="filterSalons">

                </div>

            </div>
            <div class="flex flex-col gap-4 p-6">
                <div class="grid grid-cols-7 p-3 rounded-t-lg bg-[#758294]">
                    <span class="ml-6">Nom</span>
                    <span class="ml-6">Adresse</span>
                    <span class="ml-6">Nombres d'Employé</span>
                    <span class="ml-6">Nombres de coiffure</span>
                    <span class="ml-6">Nombre de clients</span>
                    <span class="ml-6">Nombres de reservation</span>
                    <span class="ml-6">Statut</span>

                </div>
      
                <div v-for="salon in detailsalons" :key="salon.id_salon" class="grid grid-cols-7 p-3 rounded-lg bg-[#D4D3DC]">
                  <span class="ml-6">{{ salon.name }}</span>
                  <span class="ml-6">{{ salon.address }}</span>
                  <span class="ml-6">{{ salon.num_employees }}</span>
                  <span class="ml-6">{{ salon.num_hairstyles }}</span>
                  <span class="ml-6">{{ salon.num_clients }}</span>
                  <span class="ml-6">{{ salon.num_reservations }}</span>
                  <span class="ml-6">{{ salon.status }}</span>
               </div>
            </div>

          </div>
          <router-view />
          </div>
         
          
         
          
          </div>
         
  </template>
  
 

  