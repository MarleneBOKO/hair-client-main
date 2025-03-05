    <script setup>
    import { ref } from 'vue';
    import { register } from '../services/auth';
    import { useToast } from "vue-toastification";
    import { useRouter } from 'vue-router';

    const toast = useToast();
    const router = useRouter();
    const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    });

    const errors = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
    });

    const onRegister = () => {
    const { name, email, password, password_confirmation} = form.value;
    if (name && email && password && password_confirmation) {
        register(name, email, password, password_confirmation)
        .then(function (response) {
            toast.success("Création de compte réussi", {
            timeout: 5000,

            });
            router.push('/login')

            
        })
        .catch(function (error) {
            toast.error(error.response.data.message);
            errors.value = error.response.data.errors;
            return error;
        });
    } else {
        toast.error("Veuillez remplir tous les champs", {
        timeout: 5000,
        });
    }
    };
    const openTerms = () => {
    window.open('/conditions.html', '_blank');
    };
    </script>

<template>
    <div class="flex flex-row">
      
      <div class="flex items-center justify-center flex-1 flex_col">
          <form @submit.prevent="onRegister" class="flex flex-col gap-3">
             <div class="flex items-center justify-center">
              <h2 class="text-lg font-bold">Nouveau sur HairHub ?</h2>
  
             </div>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
            <input type="text" v-model="form.name" class="mt-1 block w-[400px] p-2 border border-gray-300 rounded-md" placeholder="Nom">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="form.email" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Email">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" v-model="form.password" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Mot de passe">
          </div>
          <div class="mb-4">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input type="password" v-model="form.password_confirmation" class="block w-full p-2 mt-1 border border-gray-300 rounded-md" placeholder="Confirmer le mot de passe">
          </div>
          <div class="flex items-start mb-4">
                                          <div class="flex items-center h-5">
                                              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 rounded-[70px] border-gray-300 bg-black focus:ring-3 focus:ring-primary-300 dark:bg-black dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                                          </div>
                                          <div class="ml-3 text-sm">
                                              <label for="terms" @click="openTerms" class="font-light text-black cursor-pointer dark:text-black">J'accepte toutes les conditions générales </label>
                                          </div>
                                      </div>
          <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-black">
                  Créer mon compte        
              </button>
              <div class="flex flex-row items-center justify-between mt-4">
      <hr class="w-40 h-2 font-bold">
      <span class="mt-auto mb-2 font-bold">ou</span>
      <hr class="w-40 h-2 font-bold">
  </div>
  
  <div class="flex flex-col gap-4 mb-6">
      <span class="flex items-center justify-center text-lg font-bold">Vous utilisez déjà HairHub ?</span>
      <div></div>
      <router-link to="/login" class="w-full px-4 py-2 font-semibold text-center text-black bg-white border border-black rounded-md hover:bg-black hover:text-white">
                 Se connecter       
              </router-link>
  </div>
  
  
        </form>
  
          </div>
  
          <div style="width: 45%; position: relative;">
        <img class="object-cover h-screen" src="/images/A Photographer Is Taking Beautiful Photos Of Black Girls Getting Their Hair Done.jpeg" alt="" style="width: 100%;">
        
      </div>
  </div>
  
  </template>
  
    <style lang="scss" scoped>
    /* styles here */
    </style>
