import { createRouter, createWebHistory } from 'vue-router';
import Accueil from './pages/Accueil.vue';
import Salon from './pages/Salon.vue';
import Register from './pages/Register.vue';
import Register_cli from './pages/Register_cli.vue';
import Login from './pages/Login.vue';
import Presentation_salon from './pages/Presentation_salon.vue';
import Formulaire_salon from './pages/Formulaire_salon.vue';
import Employe_salon from './pages/Employe_salon.vue';
import Type_coif_salon from './pages/Type_coif.vue';
import Accesssoire from './pages/Accesssoire.vue';
import Carteifu from './pages/Carte_et_IFU.vue';
import Assignation_coi_acc from './pages/Assignation_coi_acc.vue';
import Assignation_coif_emp from './pages/Assignation_coif_emp.vue';
import Rdv from './pages/Rdv.vue';
import Profil_cli from './pages/Profil_cli.vue';
import Partie_gauche_salon from './pages/Partie_gauche_salon.vue';
import Historiques from './pages/Historiques.vue';
import Rdv_cli from './pages/Rdv_cli.vue';
import Dashbord_salon from './pages/Dashbord_salon.vue';
import VoirPlus from './pages/Voir_plus_coif_sal.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import ResetPassword from './pages/ResetPassword.vue';
import Layout from './pages/Layout.vue';
import NotFound from './pages/NotFound.vue';
import EvaluationForm from './pages/EvaluationForm.vue';
import Profil_Apre_Cli from './pages/Apres_iscri_cli.vue';

import Dashboard from './components/DashSalon/Dashboard.vue';
import Hairstyles from './components/DashSalon/Hairstyles.vue'
import AccessoiresDash from './components/DashSalon/AccessoireSalon.vue'
import Employees from './components/DashSalon/Employees.vue'
import Clients from './components/DashSalon/Clients.vue'
import LayoutDash from './components/DashSalon/LayoutDash.vue'

import DashboardAdmin from './components/DashAdmin/Dashboard.vue';
import HairstylesAdmin from './components/DashAdmin/Hairstyles.vue'
import AccessoiresDashAdmin from './components/DashAdmin/Accessoires.vue'
import SalonAdmin from './components/DashAdmin/Salon.vue'
import PhotoIfu from './components/DashAdmin/PhotoIfu.vue'
import Forbidden from './pages/Forbidden.vue'; 
import LayoutDashAdmin from './components/DashAdmin/LayoutDash.vue'

import SendInv  from './pages/SendMail.vue';
import UpdateClient from './pages/UpdateClient.vue';
import UpdateSalon from './pages/UpdateSalon.vue';
import UpdateEmploye from './pages/UpdateEmploye.vue';
import UpdateAccessoire from './pages/UpdateAccessoire.vue';
import UpdateCoiffure from './pages/UpdateCoiffure.vue'

import DashboardClient from './components/DashClient/DashboardClient.vue';
import HairstylesClient from './components/DashClient/HairstylesClient.vue'
import reservationClient from './components/DashClient/ReservationsClient.vue'
import EditProfilClient from './components/DashClient/EditProfilClient.vue'
import LayoutDashClient from './components/DashClient/LayoutDashClient.vue'

const routes = [
  { path: '/laydah', component: LayoutDash, 
    children: [
      { path: '/dashboard', component: Dashboard,  meta: { requiresSalon: true } },
      { path: '/hairstyles', name: 'Hairstyles', component: Hairstyles  , meta: { requiresSalon: true } },
      { path: '/accessoires', name: 'AccessoiresDash', component: AccessoiresDash , meta: { requiresSalon: true }  },     
       { path: '/employees', name: 'Employees', component: Employees  , meta: { requiresSalon: true } },
      { path: '/clients', name: 'Clients', component: Clients  , meta: { requiresSalon: true } },
      {
        path: '/send_mail',
        name: 'SendInv',
        component: SendInv
       , meta: { requiresSalon: true } },
    ]
  }, 

  { path: '/laydahadmin', component: LayoutDashAdmin, 
    children: [
      { path: '/dashboardad', component: DashboardAdmin, meta: { requiresAdmin: true }},
      { path: '/hairstylesad', name: 'HairstylesAdmin', component: HairstylesAdmin, meta: { requiresAdmin: true }},
      { path: '/accessoiresad', name: 'AccessoiresDashAdmin', component: AccessoiresDashAdmin, meta: { requiresAdmin: true }},
      { path: '/salonad', name: 'SalonAdmin', component: SalonAdmin, meta: { requiresAdmin: true }},
    ]
  },

  { path: '/photoifu/:id', name: 'PhotoIfu', component: PhotoIfu, meta: { requiresAdmin: true }},

  { path: '/laydahclient', component: LayoutDashClient, 
    children: [
      { path: '/dashboarclient', component: DashboardClient, meta: { requiresClient: true } },
      { path: '/hairstylesclient', name: 'HairstylesClient', component: HairstylesClient , meta: { requiresClient: true } },
      { path: '/reservationclient', name: 'reservationClient', component: reservationClient , meta: { requiresClient: true } },      
      { path: '/editproficlient', name: 'EditProfilClient', component: EditProfilClient,  meta: { requiresClient: true } },      

    ]
  }, 
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Accueil, meta: { requiresClient: true }  },
      
      { path: 'salon/:id_salon', name: 'Salon', component: Salon, meta: { requiresClient: true } },
      { path: 'forgot-password', name: 'ForgotPassword', component: ForgotPassword },
      { path: 'reset-password', name: 'ResetPassword', component: ResetPassword },
      { path: 'register', component: Register },
      { path: 'voir-plus/:id_salon', name: 'VoirPlus', component: VoirPlus },
      { path: 'login', component: Login, meta: { requiresAuth: false } },
      { path: 'presentation', component: Presentation_salon },
      { path: 'histo_cli', component: Historiques },
      { path: 'register_clients', component: Register_cli },
      { path: 'form_salon', component: Formulaire_salon, meta: { requiresSalon: true } },
      { path: 'emp_salon', component: Employe_salon, meta: { requiresSalon: true } },
      { path: 'salon_pro', component: Partie_gauche_salon, meta: { requiresSalon: true } },
      { path: 'rdv_cli', component: Rdv_cli, meta: { requiresClient: true } },
      { path: 'dash_salon', component: Dashbord_salon, meta: { requiresSalon: true } },
      { path: 'profil_user', component: Profil_cli, meta: { requiresClient: true } },
      { path: 'profil', component: Profil_Apre_Cli, meta: { requiresClient: true } },
      { path: 'typcoifsalon', name: 'Type_coif_salon', component: Type_coif_salon, meta: { requiresSalon: true } },
      { path: 'Accesssoire', name: 'Accesssoire', component: Accesssoire, meta: { requiresSalon: true } },
      { path: 'carteifu', name: 'Carteifu', component: Carteifu, meta: { requiresSalon: true } },
      { path: 'Assignation_coi_acc', name: 'Assignation_coi_acc', component: Assignation_coi_acc, meta: { requiresSalon: true } },
      { path: 'Assignation_coif_emp', name: 'Assignation_coif_emp', component: Assignation_coif_emp, meta: { requiresSalon: true } },
      { path: 'reservation/:id_salon/:id_hairstyle_type/:price/:percent/:image1/:image2', name: 'Reservation', component: Rdv, meta: { requiresClient: true } },
      { path: '/evaluation-form', name: 'EvaluationForm', component: EvaluationForm, meta: { requiresClient: true } },
      { path: '/update-clients', name: 'UpdateClient', component: UpdateClient, meta: { requiresClient: true } },
      { path: '/update-salons', name: 'UpdateSalon', component: UpdateSalon, meta: { requiresSalon: true } },
      { path: '/update-employes/:id_employe', name: 'UpdateEmploye', component: UpdateEmploye, meta: { requiresSalon: true } },
      { path: '/update-accessories/:id_accessory', name: 'UpdateAccessoire', component: UpdateAccessoire, meta: { requiresSalon: true } },
      { path: '/update-coiffures/:id_coiffure', name: 'UpdateCoiffure', component: UpdateCoiffure, meta: { requiresSalon: true } },


      





    ]
  },
  { path: '/403', name: 'Forbidden', component: Forbidden }, 
  { path: '/:pathMatch(.)', name: 'NotFound', component: NotFound } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const getUserType = () => {
  return localStorage.getItem("userType");
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userType = getUserType();

  if (to.meta.requiresAuth && !token) {
    localStorage.setItem('redirectUrl', to.fullPath);
    next({ path: '/login', query: { redirect: 'true' } });
  } else if (to.meta.requiresClient && userType !== 'Client') {
    next({ path: '/403' });
  } else if (to.meta.requiresSalon && userType !== 'Salon') {
    next({ path: '/403' });
  } else if (to.meta.requiresAdmin && userType !== 'Admin') {
    next({ path: '/403' });
  } else {
    next();
  }
});


export default router;