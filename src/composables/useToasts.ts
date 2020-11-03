import { toastController } from "@ionic/vue";

export interface ExtraToastOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
}

// Composable for Vue 3 Composition API (See: https://v3.vuejs.org/guide/composition-api-introduction.html)
export default function useToasts() {
  const displayToast = async (message: string, color = "dark", { duration = 2000, position = 'bottom' }: ExtraToastOptions = {}) => {
    const toast = await toastController.create({
      message: message,
      color: color,
      duration: duration,
      position: position
    });

    return toast.present();
  }

  return {
    displayToast
  }
}
