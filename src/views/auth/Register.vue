<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
        <!-- This is a slot config of ionic, not the slot config of vue -->
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="register()">
        <ion-button type="submit" expand="full" color="primary">Register</ion-button>
      </form>

      <div class="ion-padding-top">
        <p class="ion-text-center">Already have an account?</p>
        <ion-button expand="full" color="danger" @click="dismiss(true)">Login</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, modalController } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Register",
  components: { IonButtons },
  methods: {
    register() {
      console.log('Register');
    },
    // Dismiss modal
    dismiss(toLogin = false) {
      modalController.dismiss({ toLogin });
    },
  },
});
</script>
