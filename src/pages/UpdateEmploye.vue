<template>
  <div class="flex flex-row">
    <div class="flex items-center justify-center flex-1 flex_col">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
        <div class="flex items-center justify-center">
          <h2 class="text-lg font-bold">Modifier les informations de l'employé</h2>
        </div>
        <div class="grid grid-cols-2 gap-20 p-8">
          <div>
            <div class="mb-4">
              <label for="name" class="block mb-2 font-bold text-gray-700">Nom :</label>
              <input type="text" v-model="form.name" id="name" name="name" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>

            <div class="mb-4">
              <label for="skills" class="block mb-2 font-bold text-gray-700">Compétences :</label>
              <input type="text" v-model="form.skills" id="skills" name="name" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">

            </div>

            <div class="mb-4">
              <label for="description" class="block mb-2 font-bold text-gray-700">Description :</label>
              <input type="text" id="description" v-model="form.description" name="description" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="image" class="block mb-2 font-bold text-gray-700">Image :</label>
              <input type="file" id="image" name="image" @change="handleFileUpload" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="hiring_date" class="block mb-2 font-bold text-gray-700">Date d'embauche :</label>
              <input type="date" id="hiring_date" v-model="form.hiring_date" name="hiring_date" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="departure_date" class="block mb-2 font-bold text-gray-700">Date de départ :</label>
              <input type="date" id="departure_date" v-model="form.departure_date" name="departure_date" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="work_hours" class="block mb-2 font-bold text-gray-700">Heures de travail :</label>
              <input type="text" id="work_hours" v-model="form.work_hours" name="work_hours" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div class="mb-4">
            <label for="salary" class="block mb-2 font-bold text-gray-700">Salaire :</label>
            <input type="number" v-model="form.salary" id="salary" name="salary" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
          </div>

          <div>
            <div class="mb-4">
              <label for="status" class="block mb-2 font-bold text-gray-700">Statut :</label>
              <select id="status" v-model="form.status" name="status" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="actif">Disponible</option>
                <option value="inactif">Occupée</option>
              </select>    
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="phone" class="block mb-2 font-bold text-gray-700">Phone :</label>
              <input type="text" v-model="form.phone" id="phone" name="phone" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div>
            <div class="mb-4">
              <label for="email" class="block mb-2 font-bold text-gray-700">Email :</label>
              <input type="email" v-model="form.email" id="email" name="email" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            </div>
          </div>
        </div>
        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-black">
          Mettre à jour
        </button>
        <div v-if="message" class="message">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { getEmployeInfo, UpdateEmploye } from '../services/auth';
import { useRouter, useRoute } from 'vue-router';

const toast = useToast();
const router = useRouter();
const route = useRoute();
const id_employe = ref(route.params.id_employe);

const form = ref({
    name: '',
    skills: '',
    description: '',
    image: '',
    hiring_date: '',
    departure_date: '',
    work_hours: '',
    salary: '',
    status: '',
    phone: '',
    email: ''
});

const skillsOptions = ['Coiffure', 'Manucure', 'Maquillage']; // Exemple de compétences

const fetchEmployeData = async () => {
  try {
    const response = await getEmployeInfo(id_employe.value);
    const data = response.data.data;
    console.log('Employe Data:', data); // Debugging: affiche les données de l'employé dans la console
    Object.assign(form.value, data);
    form.value.image = ''; // Clear image field to avoid displaying old image path
  } catch (error) {
    toast.error("Erreur lors de la récupération des informations de l'employé", { timeout: 5000 });
    console.error(error);
  }
};

onMounted(() => {
  fetchEmployeData();
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  form.value.image = file;
};

const onSubmit = async () => {
  try {
    const formData = new FormData();
    for (const key in form.value) {
      formData.append(key, form.value[key]);
    }

    await UpdateEmploye(id_employe.value, form.value); 
    toast.success("Employé mis à jour avec succès", { timeout: 5000 });
    router.push('/employees'); // Redirigez vers la page de détails du client après la mise à jour

  } catch (error) {
    toast.error(`Erreur lors de la mise à jour de l'employé: ${error.response.data.message}`, { timeout: 5000 });
    console.error(error);
  }
};
</script>

<style scoped>
.message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
