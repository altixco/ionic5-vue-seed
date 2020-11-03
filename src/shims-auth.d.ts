import { AuthPlugin } from '@/plugins/auth';

/* This helps the editor and the compiler understand the types of our Auth plugin */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $auth: AuthPlugin;
  }
}
