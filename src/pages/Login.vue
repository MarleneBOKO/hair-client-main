<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { login, loginWithToken } from '../services/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

const toast = useToast();
const router = useRouter();

const form = ref({
  email: '',
  password: '',
  token: ''
});

const errors = ref({
  email: '',
  password: ''
});

let tokenFieldVisible = ref(false);

const handlePostLoginRedirect = async () => {
    try {
        const response = await axios.get('https://hair-api-main-production.up.railway.app/api/getUserType', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        // Debugging: Log response
        console.log(response.data);

        const userTypeData = response.data;
        const userType = userTypeData.type;
        console.log(userType)
        localStorage.setItem("userType", userType);
        const salon = userTypeData.salon;
        localStorage.setItem("salonId", salon);
        const isActive = response.data.data.is_active;  // Check if the salon is active
          console.log("active", isActive)
        if (userType === 'Client') {
            toast.success("Connexion réussie", { timeout: 5000 });
            router.push('/');
        } else if (userType === 'Admin') {
            toast.success("Connexion réussie", { timeout: 5000 });
            router.push('/dashboardad');
        } else if (userType === 'Salon') {
            if (userTypeData.data === 'salon non existant') {
                toast.success("Votre compte salon est créé. Veuillez configurer votre salon.", { timeout: 5000 });
                router.push('/form_salon');
            } else if (isActive) {
                toast.success("Connexion réussie", { timeout: 5000 });
                router.push('/dashboard');
            } else {
                toast.error("Votre salon n'est pas activé. Veuillez contacter l'administrateur.", { timeout: 5000 });
            }
        } else {
            toast.error("Type d'utilisateur inconnu", { timeout: 5000 });
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            toast.error("Votre salon n'est pas activé. Veuillez contacter l'administrateur.", { timeout: 5000 });
        } else {
            toast.error(`Erreur lors de la récupération du type d'utilisateur: ${error.message}`, { timeout: 5000 });
        }
    }
};


const onSubmit = async () => {
  if (form.value) {
    const { email, password, token } = form.value;

    if (!tokenFieldVisible.value) {
      try {
        const response = await login(email, password);
        toast.success("Un code de connexion a été envoyé à votre adresse e-mail.", { timeout: 5000 });
        tokenFieldVisible.value = true;
      } catch (error) {
        console.error(error); // Affichez l'erreur complète pour débogage
        toast.error(`Erreur lors de la connexion: ${error.response.data.message}`, { timeout: 5000 });
        errors.value = error.response.data.errors || {};
      }
    } else {
      try {
        const response = await loginWithToken(token);
        localStorage.setItem("token", response.data.token);
        await handlePostLoginRedirect();
      } catch (error) {
        console.error(error); // Affichez l'erreur complète pour débogage
        toast.error(`Erreur lors de la connexion: ${error.response.data.message}`, { timeout: 5000 });
        errors.value = error.response.data.errors || {};
      }
    }
  } else {
    toast.error("Veuillez remplir tous les champs.", { timeout: 5000 });
  }
};
</script>




<template>
  <div class="flex flex-row">
    <div class="flex items-center justify-center flex-1 flex_col">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
        <div class="flex items-center justify-center">
          <h2 class="text-lg font-bold">Vous utilisez déjà HairHub ?</h2>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="form.email" class="mt-1 block w-[400px] p-2 border border-gray-300 rounded-md" placeholder="Email">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" v-model="form.password" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Mot de passe">
          <router-link to="/forgot-password" class="mb-1 font-semibold underline cursor-pointer">Mot de passe oublié ?</router-link>
        </div>
        <div v-if="tokenFieldVisible" class="mb-4">
          <label for="token" class="block text-sm font-medium text-gray-700">Code</label>
          <input type="text" v-model="form.token" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Code">
        </div>

        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-black">
          Se connecter
        </button>
        <div class="flex flex-row items-center justify-between mt-4">
          <hr class="w-40 h-2 font-bold">
          <span class="mt-auto mb-2 font-bold">ou</span>
          <hr class="w-40 h-2 font-bold">
        </div>

        <div class="flex flex-col gap-4 mb-6">
          <span class="flex items-center justify-center text-lg font-bold">Nouveau sur HairHub ?</span>
          <router-link to="/register" class="w-full px-4 py-2 font-semibold text-center text-black bg-white border border-black rounded-md hover:bg-black hover:text-white">
            Créer mon compte        
          </router-link>
        </div>
      </form>
    </div>

    <div style="width: 45%; position: relative;">
      <img class="object-cover h-screen" src="../../public/images/A Photographer Is Taking Beautiful Photos Of Black Girls Getting Their Hair Done.jpeg" alt="" style="width: 100%;">
    </div>
  </div>
</template>


<style lang="scss" scoped>
/* Ajoutez ici vos styles spécifiques */
</style>



<style lang="scss" scoped>

</style>