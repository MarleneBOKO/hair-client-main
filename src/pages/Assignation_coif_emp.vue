<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";

// Récupérer le token d'authentification stocké dans le localStorage
const token = localStorage.getItem("token");
const config = {
  headers: {
    "Authorization": `Bearer ${token}`
  }
};

const toast = useToast();
const coiffures = ref([]);  
const selectedHairstyle = ref(null);  
const employees = ref([]);  
const selectedEmployees = ref(null);  
const assignedEmploye = ref(new Set());  

// Fonction pour charger les types de coiffures et les employés depuis l'API
const loadHairstylesAndEmployees = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/employe', config);
    coiffures.value = response.data.coiffures;
    employees.value = response.data.employees;
    console.log('Coiffures et employés chargés:', coiffures.value);
    console.log('Employés:', employees.value);
  } catch (error) {
    console.error('Erreur lors du chargement des coiffures et des employés:', error);
    toast.error('Erreur lors du chargement des coiffures et des employés');
  }
};

// Fonction pour sélectionner un type de coiffure
const selectHairstyle = (hairstyle) => {
  selectedHairstyle.value = hairstyle;
  selectedEmployees.value = null; // Réinitialise l'employé sélectionné lorsque la coiffure change
};

// Fonction pour afficher l'input pour ajouter un employé à une coiffure
const showInput = (employe) => {
  selectedEmployees.value = employe;
};

const form = ref({
  duration: ''
});

// Fonction pour soumettre l'association employé-coiffure à l'API
const submitEmploye = async () => {
  const { duration } = form.value;
  const { id_hairstyle_type } = selectedHairstyle.value;
  const employe = selectedEmployees.value;


  console.log("Selected Hairstyle ID:", selectedHairstyle.value.id_hairstyle_type);
  console.log("Selected Employee ID:", employe.employe_id);
  console.log("Assigned Employees:", assignedEmploye.value);

  if (id_hairstyle_type && employe && employe.id_employe && duration) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employehairstyle', {
        hairstyle_type_id: id_hairstyle_type,
        employe_id: employe.id_employe,
        duration: duration,
      }, config);

      toast.success("Employé associé avec succès", { timeout: 5000 });
      assignedEmploye.value.add(employe.id_employe);
      console.log('assigne',assignedEmploye.value);
      resetForm();
    } catch (error) {
      console.error('Erreur:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  } else {
    toast.error("Veuillez remplir tous les champs", { timeout: 5000 });
  }
};



// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  form.value.duration = '';
  selectedEmployees.value = null; // Fermer l'input
};

// Charger les coiffures et les employés lorsque le composant est monté
onMounted(() => {
  loadHairstylesAndEmployees();
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
              <img :src="`http://127.0.0.1:8000/storage/${coiffure.image}`" :alt="coiffure.name" class="object-cover w-32 h-32 mb-2 rounded-lg cursor-pointer">
              <span class="text-sm font-medium">{{ coiffure.name }}</span>
              <span class="text-sm text-gray-600">{{ coiffure.price }} CFA</span>
            </div>
          </div>
          <div v-if="selectedHairstyle && selectedHairstyle.id_hairstyle_type === coiffure.id_hairstyle_type" class="p-6 mt-8 bg-white rounded-lg shadow-md employees">
            <h3 class="mb-4 text-xl font-semibold">Les employés</h3>
            <div v-for="employe in employees" :key="employe.employe_id" class="flex-col p-2 mb-4 transition border-b rounded hover:bg-gray-100">
  <div class="flex">
    <span :class="{'line-through': assignedEmploye.has(employe.employe_id), 'cursor-pointer': !assignedEmploye.has(employe.employe_id)}"
          class="flex-grow text-gray-800"
          @click="!assignedEmploye.has(employe.employe_id) && showInput(employe); console.log('Employe ID:', employe.employe_id, 'Assigned:', assignedEmploye)">
      {{ employe.name }}
  </span>

    <span class="text-sm text-gray-600">{{ employe.skills }}</span>
  </div>
  <!-- Modifier la condition pour afficher l'input uniquement pour l'employé sélectionné -->
  <div v-if="selectedEmployees && selectedEmployees === employe && !assignedEmploye.has(employe.employe_id)" class="flex mt-2">
    <input type="time" v-model="form.duration" class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Durée">
    <button @click="submitEmploye" class="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Ajouter</button>
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
        <router-link to="/presentation" class="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
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
