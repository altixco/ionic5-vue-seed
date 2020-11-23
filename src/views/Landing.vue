<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <ion-img src="/assets/shapes.svg"></ion-img>
        <ion-card-header>
          <ion-card-subtitle>Get Started</ion-card-subtitle>
          <ion-card-title>Welcome to {{ appName }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Starting point for Ionic 5 Application with Authentication (By <a href="http://altix.co" target="_blank">Altix</a>).</p>
        </ion-card-content>
      </ion-card>

      <ion-button class="ion-margin-top" color="medium" fill="clear" expand="full" @click="toHome()">
        To&nbsp;<ion-text color="dark">Home</ion-text>
        <ion-icon :icon="arrowForward"></ion-icon>
      </ion-button>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-row>
          <ion-col>
            <ion-button color="primary" expand="full" @click="openLoginModal()">Login</ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="danger" expand="full" @click="openRegistrationModal()">Register</ion-button>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, modalController } from "@ionic/vue";
import { arrowForward } from 'ionicons/icons';
import Login from './auth/Login.vue';
import Register from './auth/Register.vue';

export default defineComponent({
  name: 'Landing',
  components: { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle },
  // Vue Composition API
  setup() {
    return {
      arrowForward,
    }
  },
  data() {
    return {
      appName: process.env.VUE_APP_NAME
    }
  },
  created() {
    if (this.$auth.isAuthenticated) {
      this.toHome();
    }
  },
  methods: {
    toHome() {
      this.$router.replace({ name: 'home' });
    },
    async openLoginModal() {
      const loginModal = await modalController.create({
        component: Login,
      });

      loginModal.onDidDismiss().then((event: any) => {
        const toRegister = event['data'] && event['data'].toRegister;
        if (toRegister) {
          this.openRegistrationModal();
        }
      });

      return loginModal.present();
    },
    async openRegistrationModal() {
      const registerModal = await modalController.create({
        component: Register
      });

      registerModal.onDidDismiss().then((event: any) => {
        const toLogin = event['data'] && event['data'].toLogin;
        if (toLogin) {
          this.openLoginModal();
        }
      });

      return await registerModal.present();
    },
  }
});
</script>
