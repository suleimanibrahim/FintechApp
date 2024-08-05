import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  CancelTokenSource,
} from "axios";

export const cancelTokenSources: CancelTokenSource[] = [];

// Function to create an Axios instance
const createAxiosInstance = (
  baseUrl: string,
  tokenKey: string = "token",
  includeAuthHeader: boolean = true,
  headers: any = { "Content-Type": "application/json" }
): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: headers
  });

  // Common interceptor setup
  instance.interceptors.request.use(
    (config: any) => {
      if (includeAuthHeader) {
        const token = localStorage.getItem(tokenKey) || "null";
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      cancelTokenSources.push(source);

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    function (res: any) {
      return res;
    },
    function (err: any) {
      if (err?.status === 401) {
        const url = new URL(window?.location?.href);
        let from = url?.pathname;
        const sp = url?.searchParams?.toString();
        if (sp) {
          from += `?${sp}`;
        }
        cancelTokenSources.forEach((source) => source.cancel("Token Expired"));
        cancelTokenSources.length = 0;
        window.location.href = from;
      }
      return Promise.reject(err);
    }
  );
  return instance;
};

// Wrapper function to create CRUD operations
const createFetchWrapper = (instance: AxiosInstance) => ({
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.post(url, data, config),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.patch(url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) =>
    instance.delete(url, config),
});

// Creating Axios instances
const authAxiosInstance = createAxiosInstance(
  `${process.env.REACT_APP_BACKEND_URI}api/v1`
);

const baseAxiosInstance = createAxiosInstance(
  `${process.env.REACT_APP_BACKEND_URI}api/v1`,
  "token",
  false
);

const formAxiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}api/v1`,
  "sctk",
  true,
  { "Content-Type": "multipart/form-data" }
);

const fetchAuthWrapper = createFetchWrapper(authAxiosInstance);
const fetchUserProfileWrapper = createFetchWrapper(authAxiosInstance);
const fetchBaseWrapper = createFetchWrapper(baseAxiosInstance);
const fetchFormWrapper = createFetchWrapper(formAxiosInstance);

export {
  fetchAuthWrapper,
  fetchUserProfileWrapper,
  fetchBaseWrapper,
  fetchFormWrapper
};
