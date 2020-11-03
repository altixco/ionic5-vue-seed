<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    <ion-button class="ion-margin-top" color="medium" fill="clear" expand="full" :router-link="{ name: 'landing' }">
      To&nbsp;<ion-text color="dark">Landing</ion-text>
      <ion-icon :icon="arrowForward"></ion-icon>
    </ion-button>

    <ion-card v-if="$auth.isAuthenticated">
      <ion-card-header>
        <ion-card-subtitle>Authenticated!</ion-card-subtitle>
        <ion-card-title>Welcome: {{ tokenPart }}</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-button class="ion-margin-top" @click="$auth.logout()">
          Logout <ion-icon :icon="arrowForward"></ion-icon>
        </ion-button>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle } from "@ionic/vue";
import { arrowForward } from 'ionicons/icons';

export default defineComponent({
  name: 'ExploreContainer',
  components: { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle },
  props: {
    name: String
  },
  setup() {
    return {
      arrowForward
    }
  },
  computed: {
    tokenPart(): string | undefined {
      return this.$auth.accessToken?.substr(0, 6);
    }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
