import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonicVue, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/vue';

/*
Vuelidate core is in ALPHA but it's the way to go for Vue 3.0
See docs: https://vuelidate-next.netlify.app/
*/
import { VuelidatePlugin } from '@vuelidate/core';

/* Our own Auth Plugin */
import Auth from '@/plugins/auth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* App styles */
import '@/theme/app.scss';

const app = createApp(App);

app.use(IonicVue);
app.use(router);
app.use(Auth, {
  clientId: process.env.VUE_APP_API_CLIENT_ID
});
app.use(VuelidatePlugin);

/*
Global registration of components that we don't want to import for each view/component (Important not to overdeclare components here, otherwise the final application won't be optimized)
See: https://ionicframework.com/docs/vue/quickstart#optimizing-your-build
*/
app.component('ion-content', IonContent);
app.component('ion-page', IonPage);
app.component('ion-header', IonHeader);
app.component('ion-toolbar', IonToolbar);
app.component('ion-footer', IonFooter);
app.component('ion-title', IonTitle);
app.component('ion-col', IonCol);
app.component('ion-row', IonRow);
app.component('ion-img', IonImg);
app.component('ion-button', IonButton);
app.component('ion-text', IonText);
app.component('ion-icon', IonIcon);

router.isReady().then(() => {
  app.mount('#app');
});
