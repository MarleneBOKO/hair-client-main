<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  imagePath1: {
    type: String,
    default: ''
  },
  selectedHairstyle: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close']);
const router = useRouter();

function closeModal() {
  emit('close');
}

function navigateToReservationWithDetails(id_salon, id_hairstyle_type, price, percent, image1, image2, imagePath1) {
  if (!id_salon) {
    console.error("Paramètre requis 'id_salon' manquant");
    return;
  }

  const completeImagePath1 = `https://hair-api-main-production.up.railway.app/storage/${image1}`;
  const completeImagePath2 = `https://hair-api-main-production.up.railway.app/storage/${image2}`;
  
  localStorage.setItem("imagePath", imagePath1);
  localStorage.setItem("image1", completeImagePath1);
  localStorage.setItem("image2", completeImagePath2);
  localStorage.setItem("name", name);

  console.log(completeImagePath2)
  router.push({
    name: 'Reservation',
    params: {
      id_salon,
      id_hairstyle_type,
      price,
      percent,
      image1,
      image2
    },
    query: {
      image: imagePath1,
      image1: completeImagePath1,
      image2: completeImagePath2
    }
  });
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-[#FCF2F2] p-4 rounded shadow-lg w-[555px]">
      <div class="flex flex-col justify-end">
        <!-- Image principale -->
        <div>
          <img :src="imagePath1" alt="" class="w-[555px] h-96 object-cover">
        </div>
        <!-- Miniatures -->
        <div class="relative flex flex-row justify-between m-2">
          
          <!-- Informations sur la coiffure -->
          <div class="absolute flex flex-col justify-between p-4 bg-white right-2 -top-24 w-44">
            <h2 class="text-2xl font-semibold">{{ selectedHairstyle.name }}</h2>            <div class="flex flex-row justify-between">
              <div class="flex flex-col">
                <span class="text-[#D9D9D9] font-light">Prix</span>
                <div class="flex space-x-1">
                  <span>{{ selectedHairstyle.price }}</span>
                  <span class="text-[#D9D9D9] font-light">cfa</span>
                </div>
              </div>
              <div class="flex items-center justify-between space-x-1">
                <img src="/images/modal/star.png" alt="" class="w-3 h-3">
                <span class="text-[#D9D9D9] font-light">3</span>
              </div>
            </div>
            <div class="bg-[#667D45] mt-6 right-4 px-4 h-12 w-auto text-center flex justify-center items-center text-white font-semibold rounded-md">
              <!-- Assurez-vous de passer les paramètres appropriés à navigateToReservationWithDetails -->
              <button @click="navigateToReservationWithDetails(selectedHairstyle.id_salon, selectedHairstyle.id_hairstyle_type, selectedHairstyle.price, selectedHairstyle.percent, selectedHairstyle.image1, selectedHairstyle.image2, imagePath1)" type="submit">Réserver</button>
            </div>
          </div>
        </div>
      </div>
      <button class="mt-4 px-4 py-2 bg-[#e6b8b8] text-white rounded" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<style scoped>
/* Vos styles ici */
</style>
