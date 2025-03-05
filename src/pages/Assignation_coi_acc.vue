<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
};

const toast = useToast();
const coiffures = ref([]);
const selectedHairstyle = ref(null);
const accessoires = ref([]);
const selectedAccessory = ref(null);
const assignedAccessories = ref(new Set()); // Utiliser un Set pour suivre les accessoires assignés

const loadHairstylesAndAccessories = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/salonhairstyleandaccessory', config);
    coiffures.value = response.data.coiffures;
    accessoires.value = response.data.accessoires;
    console.log('Coiffures et accessoires chargés:', coiffures.value);
    console.log('Accessoires:', accessoires.value);
  } catch (error) {
    console.error('Erreur lors du chargement des coiffures:', error);
    toast.error('Erreur lors du chargement des coiffures');
  }
};


const selectHairstyle = (hairstyle) => {
  selectedHairstyle.value = hairstyle;
  selectedAccessory.value = null; 
};

const showInput = (accessory) => {
  selectedAccessory.value = accessory;
};

const form = ref({
  nb_accessory: ''
});

const submitAccessory = async () => {
  const { nb_accessory } = form.value;
  const { id_hairstyle_type, salon_id } = selectedHairstyle.value;
  const { id_accessory } = selectedAccessory.value;

  if (id_hairstyle_type && salon_id && id_accessory && nb_accessory) {
    try {
      const response = await axios.post('https://hair-api-main-production.up.railway.app/api/accessoirehairstyle', {
        hairstyle_type_id: id_hairstyle_type,
        salon_id: salon_id,
        accessory_id: id_accessory,
        nb_accessory: nb_accessory,
      }, config);
      
      toast.success("Accessoire ajouté avec succès", { timeout: 5000 });
      assignedAccessories.value.add(id_accessory); // Ajouter l'accessoire à la liste des accessoires assignés
      resetForm();
    } catch (error) {
      console.error('Erreur:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  } else {
    toast.error("Veuillez remplir tous les champs", { timeout: 5000 });
  }
};

const resetForm = () => {
  form.value.nb_accessory = '';
  selectedAccessory.value = null; // Fermer l'input
};

onMounted(() => {
  loadHairstylesAndAccessories();
});
</script>




<template>
  <div class="flex flex-col bg-gray-200">
    <div class="flex flex-row gap-20 ">
    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="../../public/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%;">
      <div class="absolute top-0 left-0 right-0 mt-12 text-center">
        <h1 class="text-xl ">Créer votre salon </h1>
        <h6>Une nouvelle aventure commence pour vous</h6>
      </div>
    </div>
    <div class="flex flex-1 overflow-hidden flex_col">
      <div class="p-3 mt-10 ">
        <h3 class="text-lg font-semibold">Informations générales</h3>
      <div class="overflow-y-scroll image-container">
        <div class="grid grid-cols-3 gap-4 mt-8 overflow-y-hidden">
          <div v-for="coiffure in coiffures" :key="coiffure.id_hairstyle_type" class="flex-col items-center">
            <div class="grid grid-cols-2 gap-4">
              <div @click="selectHairstyle(coiffure)" class="flex flex-col items-center cursor-pointer">
                <img :src="`https://hair-api-main-production.up.railway.app/storage/${coiffure.image}`" :alt="coiffure.name" class="object-cover w-32 h-32 mb-2 rounded-lg cursor-pointer">
                <span class="text-sm font-medium">{{ coiffure.name }}</span>
                <span class="text-sm text-gray-600">{{ coiffure.price }} CFA</span>
              </div>
            </div>
            <div v-if="selectedHairstyle && selectedHairstyle.id_hairstyle_type === coiffure.id_hairstyle_type" class="p-6 mt-8 bg-white rounded-lg shadow-md accessories">
              <h3 class="mb-4 text-xl font-semibold">Les accessoires</h3>
              <div v-for="accessory in accessoires" :key="accessory.id_accessory" class="flex-col p-2 mb-4 transition border-b rounded hover:bg-gray-100">
                <div class="flex">
                  <!-- Appliquer une classe conditionnelle pour barrer le texte si l'accessoire est assigné -->
                  <span :class="{'line-through': assignedAccessories.has(accessory.id_accessory), 'cursor-pointer': !assignedAccessories.has(accessory.id_accessory)}"
                        class="flex-grow text-gray-800"
                        @click="!assignedAccessories.has(accessory.id_accessory) && showInput(accessory)">
                    {{ accessory.name }}
                  </span>
                  <span class="text-sm text-gray-600">{{ accessory.price }} CFA</span>
                </div>
                <!-- Afficher l'input et le bouton uniquement si l'accessoire n'est pas assigné -->
                <div v-if="selectedAccessory && selectedAccessory.id_accessory === accessory.id_accessory && !assignedAccessories.has(accessory.id_accessory)" class="flex mt-2">
                  <input type="text" v-model="form.nb_accessory" class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Nombre de quantité pour la coiffure">
                  <button @click="submitAccessory" class="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600">Ajouter</button>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>

    </div>
    
  
  </div>

  <div class="flex justify-end mt-8">
        <router-link to="/Assignation_coif_emp" class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Suivant
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"   stroke="currentColor" class="w-4 h-4 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </template>
  
  

  
  <style scoped>
/* Ajoutez ici vos styles personnalisés */
.line-through {
  text-decoration: line-through;
}
</style>