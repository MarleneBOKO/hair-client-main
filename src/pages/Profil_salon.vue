<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { client } from './services/auth';

const toast = useToast();
const router = useRouter();
const form = ref({
    address: '',
    phone_number: '',
    birth_date: null,
    gender: '',
    notes: ''
});

const errors = ref({
    address: '',
    phone_number: '',
    birth_date: null,
    gender: '',
    notes: ''
});

const onRegisterClient = () => {
  const { address,phone_number,birth_date,gender,notes } = form.value;
  if (address && phone_number && birth_date && gender && notes) {
    client(address,phone_number,birth_date,gender,notes)
      .then(function (response) {
        //localStorage.setItem("token", response.data.token);
        toast.success("Création de compte réussi", {
          timeout: 5000,
        });
        router.push('/');
        return response;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
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
</script>

<template>
    <div class="flex flex-row">
        <div class="bg-gray-100 h-screen w-1/6  flex flex-col p-4">
            <nav class=" text-black ">
                <ul>
                    <li><router-link to="#" class="active-route" :class="{ active: $route.name === 'historique' }">Historique</router-link></li>
                    <li><router-link to="#" class="active-route">Vos reservation</router-link></li>
                    <li><router-link to="#" class="active-route">Reservation</router-link></li>
                </ul>
            </nav>
        </div>
        <div class=" flex flex-col p-6 flex-1 ">
            <div class="flex justify-between">
                <div class="flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span class="text-sm">Back</span>

                </div>
                <div class="bg-[#667D45]  right-4 px-4  w-auto text-center flex justify-center items-center text-white font-semibold rounded-md">
                    <router-link to="/presentation" type="submit">Edit User</router-link>
                </div>
            </div>
            <div class="flex flex-row mt-9">
                <div class="w-1/5 flex flex-col space-y-1">
                    <img src="/images/tresses/télécharger (11).jpeg" alt="" class="rounded-full w-32 h-32">
                    <span>. David Smith</span>
                    <span>ruthboko23@gmail.com</span>
                    <span>66776655</span>
                    <span>Aphapka</span>

                </div>
                <div class="flex-1 flex-col space-y-20">
                    <form @submit.prevent="onRegisterClient" class="p-6">
                    <div class=" flex flex-col justify-between text-black">
                       <div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="text" v-model="form.address" id="date_time" class=" ml-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                            <label for="floating_ Adresse" class=" ml-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse      </label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input  type="text" v-model="form.phone_number" id="phone_number"  class=" ml-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                            <label for="floating_ Adresse" class=" ml-4  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numéro de téléphone</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group ">
                            <input  type="date" v-model="form.birth_date" id="birth_date"  class=" ml-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                            <label for="floating_ Adresse" class=" ml-4  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date de naissance</label>
                        </div> 
                        <div class="relative z-0 w-full mb-5 group">
                             <select  v-model="form.gender" id="gender" required class="ml-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer">
                                 <option value="male">Homme</option>
                                            <option value="female">Femme</option>
                                            <option value="other">Autre</option>
                             </select>
                
                            <label for="floating_email" class="ml-4 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Genre</label>
                        </div> 
                        <div class="relative z-0 w-full mb-5 group ">
                            <input type="text" v-model="form.notes" id="notes"  class=" ml-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
                            <label for="floating_ Adresse" class=" ml-4  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Note</label>
                        </div>

                       </div>
                            
                         
                        <div class="flex ">
                            <div class="w-full px-3 mb-5 mr-20 ">
                                <button class="block w-full max-w-xs mx-auto bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] text-white  px-3 py-3 font-semibold ">S'INSCRIRE</button>
                            </div>
                        </div>

                       
                    </div>
                </form>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.active-route.active {
  color: #007bff; /* Changez la couleur ici */
}
</style>

