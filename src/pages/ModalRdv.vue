
<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const token = localStorage.getItem("token");
const props = defineProps(['appointmentId']);


const config = {
headers: {
  "Authorization": "Bearer " + token
}
};

console.log("ID du rendez-vous reçu par le Modal:", props.appointmentId);

const accompte = ref(null);


const showModal = ref(false);
const emit = defineEmits(['close']);
function closeModal() {
  emit('close');
}



const fetchAccompte = async (id) => {
try {
  const response = await axios.get(`https://hair-api-main-production.up.railway.app/api/getAccompte/${id}`, config);
  accompte.value = response.data.accompte;
  console.log(accompte.value);
} catch (error) {
  console.error('Erreur lors de la récupération de l’acompte :', error);
  accompte.value = null;
  toast.error('Erreur lors de la récupération de l’acompte', { timeout: 5000 });
}
};

// Récupérer l'acompte dès que l'ID du rendez-vous change
watch(() => props.appointmentId, (newId) => {
  if (newId) {
    fetchAccompte(newId);
  }
});

onMounted(() => {
  if (props.appointmentId) {
    fetchAccompte(props.appointmentId);
  }
});
function paynow() {
    window.openKkiapayWidget({
        amount: accompte.value,
        position: "center",
        callback: "",
        data: "TEST",
        sandbox: true,
        key: "fcacd9b00d9411ecb46e736c002ecf6b",
    });

    window.addSuccessListener((response) => {
    const transactionId = response.transactionId;
    const id_appointment = props.appointmentId;

    sendTransactionId(transactionId, id_appointment);
  });
}

async function sendTransactionId(transactionId, id_appointment) {
  try {
    await axios.post(`https://hair-api-main-production.up.railway.app/api/initiatePayment/${transactionId}/${id_appointment}`, {}, config);
    console.log('ID de transaction et ID de rendez-vous envoyés avec succès.');
    router.push('/')
    toast.success("Payement Valider", {
                    timeout: 5000,
                });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'ID de transaction et de rendez-vous :', error);
    toast.error('Erreur lors de la confirmation du paiement.', { timeout: 5000 });
  }
}

</script>
<template>
    <transition name="modal">
      <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
        <div class="relative w-full max-w-md p-8 bg-white rounded-lg">
          <button @click="closeModal" class="absolute text-gray-500 top-3 right-3 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h2 class="mb-4 text-xl font-semibold">Confirmation de réservation</h2>
          <p class="mb-6 text-gray-700">Pour valider votre rendez-vous, veuillez payer un acompte.</p>
          <div  class="text-lg font-semibold text-gray-800">
            Montant de l'acompte : {{ accompte }} CFA
          </div>
          
          <button @click="paynow" class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Payer Maintenant</button>
        </div>
      </div>
    </transition>
  </template>
  
 
  
  <style scoped>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
  </style>
  