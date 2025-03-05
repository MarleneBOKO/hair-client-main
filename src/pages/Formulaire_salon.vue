<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { create_salon } from '../services/salon';

const toast = useToast();
const router = useRouter();
const emits = defineEmits(['nextStep']);

// Initialisation de l'objet form avec des valeurs nullables ou par défaut
const form = ref({
    salon_name: '',
    address: null,  // nullable
    phone_number: '',
    email: '',
    description: null,  // nullable
    image: null,  
    website: null,  // nullable
    opening_hours: '',
    creation_date: '',
    last_update_date: null,  // nullable
    longitude: null,  // nullable
    latitude: null,  // nullable
    percent: '' ,  // nullable mais mis par défaut comme requis
    percent_cancel: '',  // nullable mais mis par défaut comme requis
    heure_debut: '',
    heure_fin: ''
});

const errors = ref({
    salon_name: '',
    address: '',
    phone_number: '',
    email: '',
    password: '',
    description: '',
    image: '',
    opening_hours: '',
    website: '',
    creation_date: '',
    last_update_date: '',
    longitude: '',
    latitude: '',
    percent: '',
    percent_cancel: '',
    heure_debut: '',
    heure_fin: ''
});

const nextStep = () => {
    emits('nextStep');
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Fichier sélectionné:', file); // Affiche les détails du fichier
    if (file) {
        form.value.image = file;
    } else {
        form.value.image = null;
    }
};








const validateForm = () => {
    const {
        salon_name, address, phone_number, email, password, description, image, website, creation_date,
        last_update_date, longitude, latitude, percent, percent_cancel, heure_debut, heure_fin
    } = form.value;

    // Verify required fields
    if (form.value.image) {
        console.log(form.value.image); // This should show a File object
        if (form.value.image) {
        console.log('Type de fichier:', form.value.image instanceof File); // Devrait afficher true si c'est un objet File
        if (!(form.value.image instanceof File)) {
            toast.error("Veuillez télécharger un fichier image valide.", { timeout: 5000 });
            return;
        }
    }
        create_salon(
            salon_name, address, phone_number, email, password, description, password, image, website,
            creation_date, last_update_date, longitude, latitude, percent, percent_cancel, heure_debut, heure_fin
        )
        .then(response => {
            toast.success("Salon created successfully", { timeout: 5000 });
            router.push('/typcoifsalon');
        })
        .catch(error => {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message);
            errors.value = error.response?.data?.errors || {};
        });
    } else {
        toast.error("Please fill out all required fields", { timeout: 5000 });
    }
};



</script>




<template>
    <div class="flex flex-row gap-20 bg-gray-200">
        <div style="width: 45%; position: relative;">
            <img class="object-cover h-screen" src="/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%; height: max-content;" >
            <div class="absolute top-0 left-0 right-0 mt-12 text-center">
                <h1 class="text-xl">Créer votre salon</h1>
                <h6>Une nouvelle aventure commence pour vous</h6>
            </div>
        </div>

        <div class="flex flex-1 flex_col">
            <form @submit.prevent="validateForm" class="p-3 mt-10">
                <div class="flex flex-col items-center justify-center">
                    <h3 class="text-lg font-semibold">Informations générales</h3>
                </div>

                <div class="grid grid-cols-2 gap-20 p-8">
                    <div>
                        <div class="mb-4">
                            <label for="salon_name" class="block text-sm font-medium text-gray-700">Nom du salon</label>
                            <input v-model="form.salon_name" type="text" id="salon_name" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.salon_name">{{ errors.salon_name }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="phone_number" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                            <input v-model="form.phone_number" type="text" id="phone_number" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.phone_number">{{ errors.phone_number }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <input type="text" v-model="form.description" id="description" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.description">{{ errors.description }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
                            <input v-model="form.latitude" type="text" id="latitude" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.latitude">{{ errors.latitude }}</div>
                        </div>
                        <div class="mb-4">
                            <label for="heure_debut" class="block text-sm font-medium text-gray-700">Heure d'ouverture</label>
                            <input v-model="form.heure_debut" type="time" id="heure_debut" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.heure_debut">{{ errors.heure_debut }}</div>
                     </div>
                     <div class="mb-4">
                            <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
                            <input v-model="form.address" type="text" id="address" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.address">{{ errors.address }}</div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input v-model="form.email" type="email" id="email" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.email">{{ errors.email }}</div>
                        </div>
                        <div class="mb-4">
                <label for="opening_hours" class="block text-sm font-medium text-gray-700">Heures d'ouverture</label>
                <input type="text" v-model="form.opening_hours" id="opening_hours" name="opening_hours" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                <div v-if="errors.opening_hours">{{ errors.opening_hours }}</div>

            </div>
            <div class="mb-4">
                <label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
                <input v-model="form.longitude" type="text" id="longitude" name="longitude"  class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                <div v-if="errors.longitude">{{ errors.longitude }}</div>

            </div>
                    </div>
                   

                  

                    <div>
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" id="image" @change="handleFileUpload" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.image">{{ errors.image }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="website" class="block text-sm font-medium text-gray-700">Site Web</label>
                            <input v-model="form.website" type="url" id="website" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.website">{{ errors.website }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="last_update_date" class="block text-sm font-medium text-gray-700">Date de mise à jour</label>
                            <input v-model="form.last_update_date" type="datetime-local" id="last_update_date" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.last_update_date">{{ errors.last_update_date }}</div>
                        </div>

                        <div class="mb-4">
                            <label for="percent" class="block text-sm font-medium text-gray-700">Pourcentage à prélever pour une coiffure</label>
                            <input v-model="form.percent" type="number" step="0.01" id="percent" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Ex: 5.00">
                            <div v-if="errors.percent">{{ errors.percent }}</div>
                        </div>
                        
                        <div class="mb-4">
                            <label for="heure_fin" class="block text-sm font-medium text-gray-700">Heure de fermeture</label>
                            <input v-model="form.heure_fin" type="time" id="heure_fin" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                            <div v-if="errors.heure_fin">{{ errors.heure_fin }}</div>
                        </div>
                        <div class="mb-4">
                            <label for="percent_cancel" class="block text-sm font-medium text-gray-700">Pourcentage à prélever pour une annulation de rdv </label>
                            <input v-model="form.percent_cancel" type="number" step="0.01" id="percent_cancel" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Ex: 5.00">
                            <div v-if="errors.percent_cancel">{{ errors.percent_cancel }}</div>
                        </div>
                        <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <input v-model="form.password" type="password" id="password" name="password" required class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                <div v-if="errors.password">{{ errors.password }}</div>

            </div>
            <div class="mb-4">
                <label for="creation_date" class="block text-sm font-medium text-gray-700">Date de création</label>
                <input v-model="form.creation_date" type="datetime-local" id="creation_date" required name="creation_date" class="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                <div v-if="errors.creation_date">{{ errors.creation_date }}</div>

            </div>
                        
                    </div>

               
                        

           
       
        
    </div>
    <div class="flex justify-end ">
    <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Suivant <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"   stroke="currentColor" class="inline-block w-5 h-5 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>

    </button>
</div>


  

</form>
</div>
    </div>
</template>

  

<style lang="scss" scoped>

</style>