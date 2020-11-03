<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
        <!-- This is a slot config of ionic, not the slot config of vue -->
        <ion-buttons slot="end">
          <ion-button @click="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form @submit.prevent="login()">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="$v.email.$model" type="email"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <small class="d-block" v-for="(error, index) of $v.email.$errors" :key="index">{{ error.$message }}</small>
        </ion-text>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="$v.password.$model" type="password"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <small class="d-block" v-for="(error, index) of $v.password.$errors" :key="index">{{ error.$message }}</small>
        </ion-text>

        <ion-button type="submit" expand="full" color="primary" :disabled="$v.$invalid">Login</ion-button>
      </form>

      <div class="ion-padding-top">
        <p class="ion-text-center">Don't have an account?</p>
        <ion-button expand="full" color="danger" @click="dismiss(true)">Register</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonItem, IonInput, IonLabel, IonButtons, modalController } from "@ionic/vue";
import { defineComponent } from 'vue';
import { minLength, required, email } from '@vuelidate/validators';
import { ErrorResponse } from '@/api';
import useToasts from '@/composables/useToasts';

export default defineComponent({
  name: "Login",
  components: { IonItem, IonInput, IonLabel, IonButtons },
  // Vue Composition API (See: https://v3.vuejs.org/guide/composition-api-introduction.html)
  setup() {
    const { displayToast } = useToasts();

    return {
      displayToast
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(4) }
    }
  },
  methods: {
    async login() {
      this.$v.$touch();
      if(this.$v.$invalid) return;

      try {
        await this.$auth.login(this.email, this.password);
        this.displayToast('Successful Authentication');
        this.dismiss();
        this.$router.replace({ name: 'home' });
      } catch (e) {
        const errorResponse: ErrorResponse = e;
        if (errorResponse.message === 'invalid_grant') {
          this.displayToast('Wrong email or password', 'warning');
        } else {
          this.displayToast('Unexpected error', 'danger');
        }
      }
    },
    // Dismiss Login Modal
    dismiss(toRegister = false) {
      this.email = '';
      this.password = '';

      this.$v.$reset();
      modalController.dismiss({ toRegister });
    }
  }
})
</script>
