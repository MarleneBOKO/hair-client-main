<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};
const employees = ref([]);
const toast = useToast();

onMounted(async () => {
    try {
        const response = await fetch('https://hair-api-main-production.up.railway.app/api/salon_employes', config);
        const data = await response.json();
        employees.value = data.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
});

const onDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir retirer cet employé ?");
    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`https://hair-api-main-production.up.railway.app/api/employe/${id}`, {
            method: 'DELETE',
            headers: {
                ...config.headers,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }
        toast.success('Employé retiré avec succès');
        // Re-fetch the employees after deletion
        await fetchEmployees();
    } catch (error) {
        toast.error(`Erreur lors du retrait de l'employé : ${error.message}`);
        console.error('Error deleting employee:', error);
    }
};

const fetchEmployees = async () => {
    try {
        const response = await fetch('https://hair-api-main-production.up.railway.app/api/salon_employes', config);
        const data = await response.json();
        employees.value = data.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
};

</script>

<template>
  <div class="flex flex-col">
    <div class="p-6 bg-gray-100 mb-20">
      <div class="flex justify-between">
        <nav class="text-sm font-semibold mb-6" aria-label="Breadcrumb">
          <ol class="list-none p-0 inline-flex">
            <li class="flex items-center text-[#667D45]">
              <a href="#" class="text-gray-700">Home</a>
              <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
              </svg>
            </li>
            <li class="flex items-center">
              <a href="#" class="text-gray-600">Dashboard</a>
            </li>
          </ol>
        </nav>
        <div class="lg:flex justify-between items-center mb-6">
          <router-link to="" class="bg-[#EFE6D8] hover:bg-[#e0dbd2] focus:outline-none rounded-lg px-6 py-2 text-white font-semibold shadow">Ajouter en Employé</router-link>
        </div>
      </div>
      <div class="flex flex-col p-6 gap-4">
        <div class="grid grid-cols-9 bg-gray-400 p-3 rounded-t-lg">
          <span class="ml-6">Nom</span>
          <span class="ml-6">Compétences</span>
          <span class="ml-6">Description</span>
          <span class="ml-6">Date d'embauche</span>
          <span class="ml-6">Date de départ</span>
          <span class="ml-6">Heures de travail</span>
          <span class="ml-6">Salaire</span>
          <span class="ml-6">Statut</span>
          <span class="ml-6">Action</span>
        </div>
        <div v-for="employee in employees" :key="employee.id" class="grid grid-cols-9 bg-gray-200 p-3 rounded-lg">
          <span class="ml-6">{{ employee.name }}</span>
          <span class="ml-6">{{ employee.skills }}</span>
          <span class="ml-6">{{ employee.description }}</span>
          <span class="ml-6">{{ employee.hiring_date }}</span>
          <span class="ml-6">{{ employee.departure_date }}</span>
          <span class="ml-6">{{ employee.work_hours }}</span>
          <span class="ml-6">{{ employee.salary }}</span>
          <span class="ml-6">{{ employee.status }}</span>
          <div class="ml-6">
            <router-link :to="{ name: 'UpdateEmploye', params: { id_employe: employee.id_employe } }">
              <button class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Modifier</button>
            </router-link>
            <button @click="onDelete(employee.id_employe)" class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4">
              Retirer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Ajoutez vos styles CSS ici */
</style>
