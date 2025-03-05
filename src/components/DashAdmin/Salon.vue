<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const salonInfos = ref({
  countsalons: 0,
  salonsactifs: 0,
  countCoiffures: 0,
  salonsnonactifs: 0
});

const detailsalons = ref([]);

const id_salon = ref('');

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
    detailsalons.value = response.data;
    id_salon.value = detailsalons.value.id_salon;
    console.log(id_salon.value);
    console.log(detailsalons.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails des salons :", error);
  }
};



const viewSalonDetails = (id_salon) => {
  router.push({ path: `/photoifu/${id_salon}` }); // Correction du chemin
};

const activateSalon = async (id) => {
  try {
    const response = await axios.post('https://hair-api-main-production.up.railway.app/api/salon/activate/${id}', {}, config);
    console.log(response.data.message);
    getSalonDetails(); // Mettre à jour la liste des salons
  } catch (error) {
    console.error("Erreur lors de l'activation du salon :", error);
  }
};

onMounted(() => {
  getSalonInfos();
  getSalonDetails();
});
</script>

<template>
 <div class="flex flex-col gap-4 p-6">
    <div class="grid grid-cols-7 p-3 rounded-t-lg bg-[#758294]">
        <span class="ml-6">Nom</span>
        <span class="ml-6">Adresse</span>
        <span class="ml-6">Nombres d'Employé</span>
        <span class="ml-6">Nombres de coiffure</span>
        <span class="ml-6">Nombre de clients</span>
        <span class="ml-6">Nombres de reservation</span>
        <span class="ml-6">Action</span>
    </div>
  
    <div v-for="salon in detailsalons" :key="salon.id_salon" class="grid grid-cols-7 p-3 rounded-lg bg-[#D4D3DC]">
      <span class="ml-6">{{ salon.name }}</span>
      <span class="ml-6">{{ salon.address }}</span>
      <span class="ml-6">{{ salon.num_employees }}</span>
      <span class="ml-6">{{ salon.num_hairstyles }}</span>
      <span class="ml-6">{{ salon.num_clients }}</span>
      <span class="ml-6">{{ salon.num_reservations }}</span>
      <div class="flex justify-between w-full mt-4 mr-16">
        <button @click="viewSalonDetails(salon.id_salon)" class="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Activer</button>
      <button type="button" class="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600">Déactiver</button>
    </div>
  
  </div>
</div>
</template>

<style lang="scss" scoped>
/* Ajoutez vos styles CSS ici */
</style>