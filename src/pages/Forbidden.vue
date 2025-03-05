<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  // Récupérer le type d'utilisateur depuis le localStorage
  const userType = localStorage.getItem('userType');

  // Vérifier le type d'utilisateur et rediriger en conséquence
  if (userType === 'Client') {
    router.push('/');
  } else if (userType === 'Salon') {
    router.push('/dashboard');
  } else if (userType === 'Admin') {
    router.push('/dashboardad');
  } else {
    // Par défaut, rediriger vers la page d'accueil
    router.push('/');
  }
};
</script>


<template>
  <div class="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white overflow-hidden">
    <h1 class="text-6xl font-bold mb-4 animate-bounce">403</h1>
    <p class="text-xl mb-8">Vous n'avez pas la permission d'accéder à cette page.</p>
    <button @click="goHome" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
      Retour à l'accueil
    </button>

   

    
  </div>
</template>

<style scoped>
@keyframes move {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.icon-animation {
  font-size: 2rem;
  position: absolute;
  animation: move 10s infinite;
  color: rgba(255, 255, 255, 0.5);
}

.icon-0 { top: 10%; left: 20%; animation-delay: 0s; }
.icon-1 { top: 30%; left: 50%; animation-delay: 0.5s; }
.icon-2 { top: 70%; left: 30%; animation-delay: 1s; }
.icon-3 { top: 50%; left: 80%; animation-delay: 1.5s; }
.icon-4 { top: 20%; left: 70%; animation-delay: 2s; }

/* Styles for the SVG spinner and line-md-question-square-twotone */
.spinner,
.line-md-question-square-twotone {
  /* Adjust the size and color as needed */
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
