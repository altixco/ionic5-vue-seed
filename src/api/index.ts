import _axios, { AxiosRequestConfig } from 'axios';
import { auth, OAUTH_PREFIX } from '@/plugins/auth';

export interface ErrorResponse {
  isAjax: boolean;
  message: string;
  status: number;
  messageFromServer: boolean;
  url: string;
  response?: string;
}

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

const axios = _axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axios.interceptors.request.use((config) => {
  if (auth && auth.isAuthenticated) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
}, error => Promise.reject(error));

let firstRefreshTokenTry = true;
axios.interceptors.response.use((response) => {
  // Return data directly on success
  return response.data !== undefined ? response.data : null;
}, async (error) => {
  // Token refresh logic
  const onRefreshFail = () => {
    firstRefreshTokenTry = true;
    auth.logout();
  };

  // We should only try to refresh requests that are not related to OAUTH, otherwise we could get infinite bucle here
  const isNotAuthRequest = !error.config.url.startsWith(OAUTH_PREFIX);
  if (error.response?.status === 401 && error.config && isNotAuthRequest) {
    // The status code 401 means that the token has expired
    if (firstRefreshTokenTry) {
      // If it's the first time refreshing token then try it
      firstRefreshTokenTry = false;
      try {
        await auth.refresh();
        // Here the token has been refreshed, then proceed with the requested call to api
        firstRefreshTokenTry = true;
        return axios.request(error.config);
      } catch {
        // Refresh failed, there is nothing we can do :(
        onRefreshFail();
        return;
      }
    } else {
      // If it's the second time here trying to refresh the token then give up and go to login
      onRefreshFail();
      return;
    }
  }

  // Reject with an Error response
  const errorResponse: ErrorResponse = {
    isAjax: true,
    message: 'An error occurred',
    status: 0,
    messageFromServer: false,
    url: error.request.responseURL,
  };
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorResponse.status = error.response.status;
    // When server returns an error
    if (error.response.data && error.response.data.error) {
      errorResponse.messageFromServer = true;
      errorResponse.message = error.response.data.error;
    } else if (error.response.status === 404) {
      errorResponse.message = 'The URL does not exists';
    }
    if (error.response.data) {
      errorResponse.response = error.response.data;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    errorResponse.message = 'Internet disconnected or problem unknown';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorResponse.message = error.message;
  }
  return Promise.reject(errorResponse);
});

// TODO: Globlal event bus to show dialog when errors are unhandled
/* window.addEventListener('unhandledrejection', (e) => {
  if (e.detail && e.detail.reason && e.detail.reason.isAjax) {
    EventBus.$emit('ErrorDialog:show', e.detail.reason);
  }
}); */

export default {
  // Third parameter use destructuring and sets default values ( = {} is required for default calls without this parameter)
  get(url: string, params?: any, { isAbsoluteURL = false } = {}): Promise<any> {
    const options: AxiosRequestConfig = isAbsoluteURL ? { baseURL: BASE_URL } : {};
    // Check if params is defined
    if (typeof params !== 'undefined') {
      options.params = params;
    }
    // Return promise
    return axios.get(url, options);
  },
  post(url: string, data: any, { isAbsoluteURL = false, contentType = 'application/json', params = null } = {}): Promise<any> {
    const options: AxiosRequestConfig = isAbsoluteURL ? { baseURL: BASE_URL } : {};
    options.headers = {
      'Content-Type': contentType,
    };
    if (params) {
      options.params = params;
    }
    // Returns promise
    return axios.post(url, data, options);
  },
  put(url: string, data: any, { isAbsoluteURL = false, contentType = 'application/json' } = {}): Promise<any> {
    const options: AxiosRequestConfig = isAbsoluteURL ? { baseURL: BASE_URL } : {};
    options.headers = {
      'Content-Type': contentType,
    };
    // Returns promise
    return axios.put(url, data, options);
  },
  delete(url: string, { isAbsoluteURL = false, params = {} } = {}): Promise<any> {
    const options: AxiosRequestConfig = isAbsoluteURL ? { baseURL: BASE_URL } : {};
    options.params = params;
    // Returns promise
    return axios.delete(url, options);
  },
  upload(url: string, data: any, { isAbsoluteURL = false } = {}): Promise<any> {
    const options: AxiosRequestConfig = isAbsoluteURL ? { baseURL: BASE_URL } : {};
    options.timeout = 0;
    options.headers = {
      'Content-Type': 'multipart/form-data',
    };
    // Returns promise
    return axios.put(url, data, options);
  }
};
