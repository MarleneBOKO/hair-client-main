<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(true);
const mainImage = ref('');


const emit = defineEmits(['close']);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  },
  thumbnails: {
    type: Array,
    default: () => []
  },
  hairstyle: {
    type: Object,
    default: () => ({})
  },
  id_salon: {
    type: String,
    required: true
  }
});

function closeModal() {
  isOpen.value = false;
  emit('close');
}

function changeMainImage(imagePath) {
  mainImage.value = `https://hair-api-main-production.up.railway.app/storage/${imagePath}`;
}

onMounted(() => {
  mainImage.value = `https://hair-api-main-production.up.railway.app/storage/${props.imagePath}`;
});

watch(() => props.imagePath, (newImagePath) => {
  mainImage.value = `https://hair-api-main-production.up.railway.app/storage/${newImagePath}`;
});

function navigateToReservationWithDetails(id_salon, id_hairstyle_type, price, percent, image1, image2, imagePath) {
  if (!id_salon) {
    console.error("Missing required param 'id_salon'");
    return;
  }
  const completeImagePath1 = `https://hair-api-main-production.up.railway.app/storage/coiffure_store/others_images/femme/${image1}`;
  const completeImagePath2 = `https://hair-api-main-production.up.railway.app/storage/coiffure_store/others_images/femme/${image2}`;
  localStorage.setItem("imagePath", imagePath);
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
      image: imagePath,
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
        <!-- Main image -->
        <div>
          <img :src="mainImage" alt="" class="w-[555px] h-96 object-cover">
        </div>
        <!-- Thumbnails -->
        <div class="relative flex flex-row justify-between m-2">
          <div class="flex flex-row items-center justify-between space-x-2">
            <img 
              v-for="(thumbnail, index) in thumbnails" 
              :key="index" 
              :src="thumbnail" 
              alt="" 
              class="object-cover w-20 h-20"
              @click="changeMainImage(thumbnail)"
            >
          </div>
          <!-- Hairstyle information -->   
          <div class="absolute flex flex-col justify-between p-4 bg-white right-2 -top-24 w-44">
            <h2 class="font-light">{{ hairstyle?.name }}</h2>
            <div class="flex flex-row justify-between">
              <div class="flex flex-col">
                <span class="text-[#D9D9D9] font-light">Prix</span>
                <div class="flex space-x-1">
                  <span>{{ hairstyle?.price }}</span><span class="text-[#D9D9D9] font-light">cfa</span>
                </div>
              </div>
              <div class="flex items-center justify-between space-x-1">
                <img src="/images/modal/star.png" alt="" class="w-3 h-3">
                <span class="text-[#D9D9D9] font-light">3</span>
              </div>
            </div>
            <div class="bg-[#667D45] mt-6 right-4 px-4 h-12 w-auto text-center flex justify-center items-center text-white font-semibold rounded-md">
              <button @click="navigateToReservationWithDetails(id_salon, hairstyle.id_hairstyle_type, hairstyle.price,  hairstyle.percent, hairstyle.image1, hairstyle.image2, mainImage)" type="submit">Réservé</button>
            </div>
          </div>
        </div>
      </div>
      <button class="mt-4 px-4 py-2 bg-[#e6b8b8] text-white rounded" @click="closeModal">Fermer</button>
    </div>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>

