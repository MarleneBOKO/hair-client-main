<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { create_employe_salon } from '../services/salon';

const toast = useToast();
const router = useRouter();
const emits = defineEmits(['nextStep']);

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

const errors = ref({
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

const skillsOptions = ['expert', 'débutant', 'moyen'];

const handleFileUpload = (event) => {
    form.value.image = event.target.files[0];
};

const validateForm = () => {
    const { name, skills, description, image, hiring_date, departure_date, work_hours, salary, status, phone, email } = form.value;
    if (name && skills && description && image && hiring_date && departure_date && work_hours && salary && status && phone && email) {
        return true;
    } else {
        toast.error("Veuillez remplir tous les champs", {
            timeout: 5000,
        });
        return false;
    }
};

const saveEmploye = async () => {
    if (validateForm()) {
        const { name, skills, description, image, hiring_date, departure_date, work_hours, salary, status, phone, email } = form.value;
        try {
            const response = await create_employe_salon(name, skills, description, image, hiring_date, departure_date, work_hours, salary, status, phone, email);
            toast.success("Création de compte réussi", {
                timeout: 5000,
            });
            return response;
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            errors.value = error.response.data.errors;
            return error;
        }
    }
};

const saveAndRedirect = async () => {
    const response = await saveEmploye();
    if (response) {
      router.push('/Accesssoire')
    }
};

const saveAndNew = async () => {
    const response = await saveEmploye();
    if (response) {
        form.value = {
            name: '',
            skills: '',
            description: '',
            hiring_date: '',
            departure_date: '',
            work_hours: '',
            salary: '',
            status: '',
            phone: '',
            email: ''
        };
    }
};
</script>

<template>
      <div class="flex flex-row gap-20 bg-gray-200 ">
    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%;">
      <div class="absolute top-0 left-0 right-0 mt-12 text-center">
        <h1 class="text-xl ">Créer votre salon </h1>
        <h6>Une nouvelle aventure commence pour vous</h6>
      </div>
    </div>
    <div class="flex flex-col flex-1">
        <form @submit.prevent="saveEmploye" class="p-3 overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <h3 class="text-lg font-semibold">Informations générales</h3>
            </div>
            <div class="grid grid-cols-2 gap-20 p-8">
                <div>
                    <div class="mb-4">
                        <label for="name" class="block mb-2 font-bold text-gray-700">Nom :</label>
                        <input type="text" v-model="form.name" id="name" name="name" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="mb-4">
                        <label for="skills" class="block mb-2 font-bold text-gray-700">Compétences :</label>
                        <select v-model="form.skills" id="skills" name="skills" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                            <option v-for="skill in skillsOptions" :key="skill" :value="skill">{{ skill }}</option>
                        </select>
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
                        <input type="number" v-model="form.phone" id="phone" name="phone" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    </div>
                </div>

                <div>
                    <div class="mb-4">
                        <label for="email" class="block mb-2 font-bold text-gray-700">Email :</label>
                        <input type="email" v-model="form.email" id="email" name="email" required class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    </div>
                </div>
            </div>

            <div class="flex justify-end space-x-4">
                <button type="button" @click="saveAndRedirect" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Enregistrer 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block w-5 h-5 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
                 
                <button type="button" @click="saveAndNew" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Enregistrer & Nouveau
                </button>
            </div>
        </form>
    </div>
</div>

</template>


<style lang="scss" scoped>
/* Ajoutez vos styles ici */
</style>
