<script setup>
import { ref } from 'vue';
import axios from 'axios';
import ModalRdvSolde from './ModalRdvSolde.vue';

const rendezVous = ref([]);
const showModal = ref(false);
const selectedAppointmentId = ref(null);
const token = localStorage.getItem("token");

const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const fetchRendezVous = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/rdv', config);
    rendezVous.value = response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error);
  }
};

const solderRdv = (rdv) => {
  selectedAppointmentId.value = rdv.id_appointment;
  showModal.value = true;
};

const annulerRdv = async (rdv) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/rdv/${rdv.id_appointment}`, config);
    // Retirer le rendez-vous annulé de la liste locale
    rendezVous.value = rendezVous.value.filter(r => r.id_appointment !== rdv.id_appointment);
    alert('Rendez-vous annulé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous:', error);
    alert('Une erreur est survenue lors de l\'annulation du rendez-vous.');
  }
};

const modifierRdv = (rdv) => {
  // Logique pour modifier un rendez-vous
};

const terminerRdv = (rdv) => {
  // Logique pour marquer un rendez-vous comme terminé
};

fetchRendezVous();
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
              <button v-if="rdv.status !== 'Terminé'" @click="solderRdv(rdv)" class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Solder</button>            </td>
          </tr>
        </tbody>
      </table>
      <ModalRdvSolde v-if="showModal" @close="showModal = false" :appointmentId="selectedAppointmentId" />
    </div>
  </template>
  
  
  

  
  <style scoped>
  
  </style>