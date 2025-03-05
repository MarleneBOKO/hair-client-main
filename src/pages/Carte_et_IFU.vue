<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { createDocument } from '../services/salon';

const toast = useToast();
const router = useRouter();

const form = ref({
  ifu: '',
  type_photo: 'Passeport',
  photo1: null,
  photo2: null,
});

const handleDocumentTypeChange = () => {
  form.value.photo1 = null;
  form.value.photo2 = null;
};

const handleFileChange = (event, fileType) => {
  const file = event.target.files[0];
  if (fileType === 'photo1') {
    form.value.photo1 = file;
  } else if (fileType === 'photo2') {
    form.value.photo2 = file;
  }
};

const validateForm = () => {
  const { type_photo, photo1, photo2 } = form.value;
  if (type_photo === 'Passeport' && !photo1) {
    toast.error("Veuillez télécharger une photo de votre passeport.", {
      timeout: 5000,
    });
    return false;
  } else if ((type_photo === 'Carte d\'identité' || type_photo === 'Carte CIP') && (!photo1 || !photo2)) {
    toast.error("Veuillez télécharger les photos recto et verso de votre carte.", {
      timeout: 5000,
    });
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  try {
    const { ifu, type_photo, photo1, photo2 } = form.value;
    const response = await createDocument(ifu, type_photo, photo1, photo2);
    toast.success("Document enregistré avec succès.", {
      timeout: 5000,
    });
    router.push('/Assignation_coi_acc');
  } catch (error) {
    toast.error("Erreur lors de l'enregistrement du document.", {
      timeout: 5000,
    });
    console.error(error);
  }
};
</script>



<template>
      <div class="flex flex-row gap-20 bg-gray-200">
    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="/images/salon/Mur vert de gris salon de coiffure.jpeg" alt="" style="width: 100%;">
      <div class="absolute top-0 left-0 right-0 mt-12 text-center">
        <h1 class="text-xl ">Créer votre salon </h1>
        <h6>Une nouvelle aventure commence pour vous</h6>
      </div>
    </div>
    <div class="flex flex-col flex-1">
    <form @submit.prevent="handleSubmit">
        <div class="flex flex-col items-center justify-center">
            <h2 class="mb-4 text-xl font-semibold text-center text-gray-700">Enregistrement de Document</h2>
        </div>

      <div class="mb-4">
        <label for="ifu" class="block text-sm font-medium text-gray-700">Numéro IFU (facultatif) :</label>
        <input type="text" id="ifu" v-model="form.ifu" placeholder="Entrez le numéro" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">
      </div>

      <div class="mb-4">
        <label for="type_photo" class="block text-sm font-medium text-gray-700">Type de document :</label>
        <select id="type_photo" v-model="form.type_photo" @change="handleDocumentTypeChange" class="px-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="Passeport">Passeport</option>
          <option value="Carte d'identité">Carte d'identité</option>
          <option value="Carte CIP">Carte CIP</option>
        </select>
      </div>

      <div v-if="form.type_photo === 'Passeport'" class="mb-4">
        <label for="photo1" class="block text-sm font-medium text-gray-700">Télécharger la photo du passeport :</label>
        <input type="file" id="photo1" @change="handleFileChange($event, 'photo1')" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">
      </div>

      <div v-if="form.type_photo === 'Carte d\'identité'" class="mb-4">
        <label for="photo1" class="block text-sm font-medium text-gray-700">Télécharger la photo recto de la carte d'identité :</label>
        <input type="file" id="photo1" @change="handleFileChange($event, 'photo1')" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">

        <label for="photo2" class="block text-sm font-medium text-gray-700">Télécharger la photo verso de la carte d'identité :</label>
        <input type="file" id="photo2" @change="handleFileChange($event, 'photo2')" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">
      </div>

      <div v-if="form.type_photo === 'Carte CIP'" class="mb-4">
        <label for="photo1" class="block text-sm font-medium text-gray-700">Télécharger la photo recto de la carte CIP :</label>
        <input type="file" id="photo1" @change="handleFileChange($event, 'photo1')" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">

        <label for="photo2" class="block text-sm font-medium text-gray-700">Télécharger la photo verso de la carte CIP :</label>
        <input type="file" id="photo2" @change="handleFileChange($event, 'photo2')" class="block p-2 mt-1 border border-gray-300 rounded-md w-96">
      </div>

      <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-md">
        Enregistrer
      </button>
    </form>
    </div>
</div>

</template>


<style lang="scss" scoped>
/* Ajoutez vos styles ici */
</style>
