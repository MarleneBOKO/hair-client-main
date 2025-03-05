<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { create_rdv } from '../services/salon';
import { useToast } from 'vue-toastification';
import Modal from './ModalRdv.vue';
import Header from './Header.vue';

const token = localStorage.getItem("token");
const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const route = useRoute();
const router = useRouter();
const toast = useToast();

const showModal = ref(false);
const openModal = () => { showModal.value = true; };
const closeModal = () => { showModal.value = false; };

const salon_id = ref(route.params.id_salon);
const hairstyle_type_id = ref(route.params.id_hairstyle_type);
const coiffure_price = ref(parseInt(route.params.price));
const completeService = ref(null);
const accessories = ref([]);
const selectedAccessory = ref(null);
const assignedAccessories = ref(new Set());
const appointmentId = ref(null);
const availableEmployees = ref([]);

const imagePath = localStorage.getItem('imagePath');
const image1 = localStorage.getItem('image1');
const image2 = localStorage.getItem('image2');
const mainImage = ref(imagePath);

watch(completeService, async (newVal) => {
    form.value.usesOwnAccessories = !newVal;

    if (newVal) {
        try {
            const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/accessoires/${hairstyle_type_id.value}/${salon_id.value}`, config);
            accessories.value = response.data.data;
        } catch (error) {
            toast.error('Erreur lors de la récupération des accessoires', { timeout: 5000 });
        }
    } else {
        accessories.value = [];
        form.value.accessories = [];
    }
});

const updateMainImage = (newImage) => {
    mainImage.value = newImage;
};

const showInput = (accessory) => {
    selectedAccessory.value = accessory;
};

const submitAccessory = () => {
    if (selectedAccessory.value && form.value.nb_accessory > 0) {
        form.value.accessories.push({
            id_accessory: selectedAccessory.value.id_accessory,
            nb_accessory: form.value.nb_accessory
        });
        assignedAccessories.value.add(selectedAccessory.value.id_accessory);
        selectedAccessory.value = null;
    }
};

const availableHours = ref([]);
const fetchAvailableHours = async () => {
    const selectedDate = form.value.date_and_time.split('T')[0];
    try {
        const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getHours/${hairstyle_type_id.value}/${selectedDate}`, config);
        const data = response.data;

        availableEmployees.value = data.employes;

        if (!Array.isArray(data.data)) {
            throw new Error('Format de données incorrect pour les heures disponibles');
        }

        availableHours.value = data.data.map(hour => ({
            time: hour.time,
            unavailable: !hour.is_available
        }));
    } catch (error) {
        toast.error('Erreur lors de la récupération des heures disponibles', { timeout: 5000 });
    }
};

const selectHour = (hour) => {
    form.value.selectedHour = hour.time;
};

const form = ref({
    date_and_time: '',
    notes: '',
    hairstyle_type_id: hairstyle_type_id.value,
    price: coiffure_price.value,
    accessories: [],
    usesOwnAccessories: false,
    employes: [],
    selectedHour: ''
});

const errors = ref({
    date_and_time: '',
    notes: '',
    hairstyle_type_id: '',
    price: '',
    accessories: '',
    usesOwnAccessories: ''
});

const isLoggedIn = () => localStorage.getItem('token') !== null;

const validateForm = () => {
    if (!isLoggedIn()) {
        router.push('/login');
        return;
    }

    const { date_and_time, notes, hairstyle_type_id, price, usesOwnAccessories, accessories, selectedHour } = form.value;

    if (date_and_time && notes && hairstyle_type_id && price && selectedHour) {
   
        form.value.employes = availableEmployees.value;

        if (usesOwnAccessories || accessories.length > 0) {
            create_rdv(date_and_time, notes, hairstyle_type_id, price, usesOwnAccessories, accessories, availableEmployees.value, selectedHour )
                .then((response) => {
                    if (response.data && response.data.rendezVous && response.data.rendezVous.id_appointment) {
                        toast.success('Rendez-vous créé avec succès', { timeout: 5000 });
                        appointmentId.value = response.data.rendezVous.id_appointment;
                        showModal.value = true;
                    } else {
                        throw new Error("L'ID du rendez-vous est manquant dans la réponse.");
                    }
                })
                .catch((error) => {
                    toast.error(error.response?.data?.message || error.message);
                    errors.value = error.response?.data?.errors || {};
                });
        } else {
            toast.error("Veuillez ajouter des accessoires ou choisir d'utiliser vos propres accessoires.", { timeout: 5000 });
        }
    } else {
        toast.error('Veuillez remplir tous les champs', { timeout: 5000 });
    }
};

const setPaymentMethod = (method) => {
    form.value.payment_method = method.toString();
};

</script>



  <style lang="scss" scoped>
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .btn img {
    border-radius: 50%; /* Rendre les images rondes */
  }
  </style>





  <template>
    <div class="flex flex-col bg-[#e5e7e6]">
      <!-- Header Component -->
      <Header class="w-full p-5" />

      <div class="flex flex-row p-32 m-10">
        <div class="flex flex-col p-4 m-4 bg-white shadow-md w-[600px]" style="height: max-content;">
          <div class="flex items-end justify-end">
            <span class="font-bold">{{ form.price }} FCFA</span>
          </div>

          <div class="flex flex-col gap-3 mt-2">
            <div>
              <img :src="mainImage" alt="" class="w-[600px] h-96 object-cover">
            </div>

            <div class="flex flex-row items-center justify-between gap-4 mt-4">
              <img :src="image1" alt="" class="object-cover w-32 h-32 cursor-pointer" @click="updateMainImage(image1)">
              <img :src="imagePath" alt="" class="object-cover w-32 h-32 cursor-pointer" @click="updateMainImage(imagePath)">
              <img :src="image2" alt="" class="object-cover w-32 h-32 cursor-pointer" @click="updateMainImage(image2)">
            </div>
          </div>

          <div class="flex flex-col mt-6">
            <span>Accessoires associés</span>
            <!-- Display selected accessories -->
            <div class="p-2 mt-2 border rounded"  v-for="accessory in accessories" :key="accessory.id_accessory">
          <h3 class="text-lg font-semibold"> {{ accessory.name }}</h3>
          <p> {{ accessory.price }} CFA</p>
        </div>

          </div>

          <div class="flex flex-col">
            <span class="font-bold">Avertissement</span>
            <p>
            Pour garantir votre réservation, un acompte est requis. En cas d'annulation, un pourcentage de cet acompte sera retenu en fonction de notre politique d'annulation. 
            Veuillez noter que nous ne remboursons pas l'argent versé ; il restera disponible pour une utilisation future dans notre salon pour un autre service de coiffure.
          </p>     
     </div>
        </div>

        <div class="flex flex-col gap-6 p-4 m-4 bg-[#00000023] shadow-md w-80" style="height: max-content;">
          <div class="flex flex-col items-center text-black">
            <span class="text-black">Hair style</span>
            <span class="text-white">Réservez auprès du meilleur</span>
          </div>

          <div class="flex flex-col gap-3">
          <label for="date" class="text-black">Date</label>
          <input type="date" id="date" v-model="form.date_and_time" @change="fetchAvailableHours" class="p-2 text-white bg-transparent border border-white">
        </div>

        <div class="flex flex-col gap-3">
          <label for="hours" class="text-black">Heures disponibles</label>
          <div class="grid grid-cols-4 gap-2">
            <button
    v-for="hour in availableHours"
    :key="hour.time"
    :disabled="hour.unavailable"
    @click="selectHour(hour)"
    :class="{
        'bg-gray-200 text-gray-500 cursor-not-allowed': hour.unavailable,
        'bg-white text-black cursor-pointer': !hour.unavailable,
        'bg-blue-500 text-white': form.selectedHour === hour.time
    }"
    class="p-2 transition rounded"
>
    {{ hour.time }}
</button>

</div>

        </div>
        
          <div class="flex flex-col gap-3">
            <label for="" class="text-black">Note</label>
            <input type="text" v-model="form.notes" class="p-2 text-white bg-transparent border border-white">
          </div>

          <div class="flex flex-col gap-3">
              <div class="flex flex-col">
                <label class="mb-2 text-sm text-black dark:text-black">La coiffure sera avec vos accessoires ou vous optez pour le service complet</label>
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center ml-4">
                    <input id="default-radio-1" type="radio" :value="false" v-model="completeService" name="default-radio" class="w-4 h-4 text-black bg-gray-100 border-0 border-b-2 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-black dark:border-black">
                    <label for="default-radio-1" class="ml-4 text-sm text-black dark:text-black">Avec mes accessoires</label>
                  </div>
                  <div class="flex items-center ml-4">
                    <input id="default-radio-2" type="radio" :value="true" v-model="completeService" name="default-radio" class="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-black dark:border-black">
                    <label for="default-radio-2" class="ml-4 text-sm text-black dark:text-black">Service complet</label>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="completeService" class="p-6 mt-8 overflow-auto bg-white rounded-lg shadow-md accessories">
              <h3 class="mb-4 text-xl font-semibold">Les accessoires</h3>
              <div v-for="accessory in accessories" :key="accessory.id_accessory" class="flex-col p-2 mb-4 transition border-b rounded hover:bg-gray-100">
                <div class="flex">
                  <!-- Appliquer une classe conditionnelle pour barrer le texte si l'accessoire est assigné -->
                  <span :class="{'line-through': assignedAccessories.has(accessory.id_accessory), 'cursor-pointer': !assignedAccessories.has(accessory.id_accessory)}" class="flex-grow text-gray-800" @click="!assignedAccessories.has(accessory.id_accessory) && showInput(accessory)">
                    {{ accessory.name }}
                  </span>
                  <span class="text-sm text-gray-600">{{ accessory.price }} CFA</span>
                </div>
                <!-- Afficher l'input et le bouton uniquement si l'accessoire n'est pas assigné -->
                <div v-if="selectedAccessory && selectedAccessory.id_accessory === accessory.id_accessory && !assignedAccessories.has(accessory.id_accessory)" class="flex mt-2">
                  <input type="number" v-model="form.nb_accessory" class="px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" placeholder="Nombre de quantité pour la coiffure">
                  <button @click="submitAccessory" class="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Ajouter</button>
                </div>
              </div>


          </div>

          <div class="flex items-center justify-center mt-4">
            <button type="submit" class="w-auto h-12 px-4 font-semibold text-white bg-transparent border border-white right-4" @click="validateForm">
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Component -->
      <Modal v-if="showModal" @close="closeModal" :appointmentId="appointmentId" />    
      <!-- Footer -->
      <footer>
        <div class="bg-[#FCF2F2] flex flex-col p-4 space-y-4">
          <div class="flex space-x-2">
            <a href="#">Blog</a>
            <a href="#">A propos</a>
            <a href="#">Condition d'utilisation</a>
            <a href="#">Contact</a>
          </div>
          <div class="flex flex-row space-x-4">
            <img src="/images/logo_footer.png" alt="" class="h-20 w-25">
            <p>© 2024 HairHub Tous les droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  </template>






