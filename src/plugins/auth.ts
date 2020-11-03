import api from '@/api';
import router from '@/router';
import { App, reactive } from 'vue';

const STORAGE_ACCESS_TOKEN = 'accessToken';
const STORAGE_REFRESH_TOKEN = 'refreshToken';
export const OAUTH_PREFIX = '/o/';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
}

export interface OAuth2Response {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface AuthPlugin {
  isAuthenticated: boolean;
  user: User;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  login: (username: string, password: string) => Promise<any>;
  refresh: () => Promise<any>;
  logout: () => Promise<any>;
  saveTokens: () => void;
  clearTokens: () => void;
}

export interface AuthOptions {
  clientId: string;
}

export let auth: AuthPlugin;

function getAuthInstance(options: AuthOptions): AuthPlugin {
  if (auth) return auth;

  const savedAccessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN);
  const savedRefreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN);

  const authPlugin: AuthPlugin = {
    isAuthenticated: !!savedAccessToken && !!savedRefreshToken,
    user: {} as User,
    accessToken: savedAccessToken || undefined,
    refreshToken: savedRefreshToken || undefined,
    async login(username: string, password: string) {
      const data = `grant_type=password&username=${username}&password=${password}&client_id=${options.clientId}`;
      const response: OAuth2Response = await api.post(`${OAUTH_PREFIX}token/`, data, { contentType: 'application/x-www-form-urlencoded' });

      // Successfully authenticated (Error should be handled by the component requesting to Login)
      this.isAuthenticated = true;
      this.accessToken = response.access_token;
      this.refreshToken = response.refresh_token;
      this.saveTokens();
      return response;
    },
    async refresh() {
      const data = `grant_type=refresh_token&refresh_token=${this.refreshToken}&client_id=${options.clientId}`
      const response: OAuth2Response = await api.post(`${OAUTH_PREFIX}token/`, data, { contentType: 'application/x-www-form-urlencoded'});

      // Successful refresh (Error should be handled by the component requesting to Login)
      this.accessToken = response.access_token;
      this.refreshToken = response.refresh_token;
      this.saveTokens();
      return response;
    },
    async logout() {
      const data = `token=${this.accessToken}&client_id=${options.clientId}`;
      try {
        await api.post(`${OAUTH_PREFIX}revoke_token/`, data, { contentType: 'application/x-www-form-urlencoded' });
      } catch {
        // eslint-disable
      }
      // Successful logout (Error should be handled by the component requesting the logout)
      this.isAuthenticated = false;
      this.accessToken = undefined;
      this.refreshToken = undefined;
      this.clearTokens();
      router.push({ name: 'landing' });
    },
    saveTokens() {
      if (this.accessToken && this.refreshToken) {
        localStorage.setItem(STORAGE_ACCESS_TOKEN, this.accessToken);
        localStorage.setItem(STORAGE_REFRESH_TOKEN, this.refreshToken);
      }
    },
    clearTokens() {
      localStorage.removeItem(STORAGE_ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_REFRESH_TOKEN);
    }
  };

  auth = reactive(authPlugin);
  return auth;
}

export default {
  install: (app: App, options: AuthOptions) => {
    app.config.globalProperties.$auth = getAuthInstance(options);
  }
}
