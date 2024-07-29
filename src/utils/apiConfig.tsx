import axios from 'axios';

export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${apiBaseUrl}/token/access`, {
          refreshToken: refreshToken,
        });

        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;

        return axiosInstance(error.config);
      } catch (refreshError) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');

        localStorage.clear();
        window.location.href = '/';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
