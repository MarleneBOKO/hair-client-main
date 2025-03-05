<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const rendezVous = ref([]);

const fetchRendezVous = async () => {
  try {
    const response = await axios.get('https://hair-api-main-production.up.railway.app/api/rdv', config);
    rendezVous.value = response.data.data; // Assurez-vous que la structure des données correspond à ce qui est utilisé ici
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
  }
};

onMounted(() => {
  fetchRendezVous();
});

const modifierRdv = (rdv) => {
  // Logique pour modifier le rendez-vous
};

const annulerRdv = (rdv) => {
  // Logique pour annuler le rendez-vous
};

const terminerRdv = (rdv) => {
  // Logique pour marquer le rendez-vous comme terminé
};
</script>



<template>
    <div class="p-5 mx-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Nom du Salon</th>
            <th class="p-2 border">Date et Heure</th>
            <th class="p-2 border">Durée de la Coiffure</th>
            <th class="p-2 border">Montant</th>
            <th class="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rdv, index) in rendezVous" :key="index" class="border">
            <td class="p-2 border">{{ rdv.nom_salon }}</td>
            <td class="p-2 border">{{ rdv.date_et_heure }}</td>
            <td class="p-2 border">{{ rdv.duree }}</td>
            <td class="p-2 border">{{ rdv.montant }}</td>
            <td class="p-2 border">
              <button @click="modifierRdv(rdv)" class="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Modifier</button>
              <button @click="annulerRdv(rdv)" class="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600">Annuler</button>
              <button v-if="rdv.status !== 'Terminé'" @click="terminerRdv(rdv)" class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Terminer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  

  
  <style scoped>
  
  </style>
  