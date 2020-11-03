<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>

      <h3>Profile page</h3>

      <ion-list>
        <ion-item @click="test()" button>
          <ion-icon slot="start" color="medium" :icon="globeOutline"></ion-icon>
          <ion-label>Call test endpoint</ion-label>
        </ion-item>
        <ion-item v-if="$auth.isAuthenticated" @click="$auth.logout()" button>
          <ion-icon slot="start" color="medium" :icon="logOut"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
        <ion-item v-else @click="toLogin()" button>
          <ion-icon slot="start" color="medium" :icon="key"></ion-icon>
          <ion-label>Login</ion-label>
        </ion-item>
      </ion-list>

      <p v-if="testResult">{{ testResult }}</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { logOut, key, globeOutline } from 'ionicons/icons';
import { IonList, IonItem, IonLabel } from '@ionic/vue';
import userAPI from '@/api/user';

export default defineComponent({
  name: 'Tab3',
  components: { IonList, IonItem, IonLabel },
  setup() {
    return {
      logOut, key, globeOutline
    }
  },
  data() {
    return {
      testResult: undefined
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ name: 'landing' });
    },
    async test() {
      this.testResult = undefined;
      try {
        this.testResult = await userAPI.testForAuthenticatedUser();
      } catch (e) {
        this.testResult = e;
      }
    }
  }
});
</script>
