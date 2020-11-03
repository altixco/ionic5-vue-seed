import { Validation } from '@vuelidate/core/index';

/* This helps the editor and the compiler understand the types of Vuelidate plugin */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $v: Validation;
  }
}
