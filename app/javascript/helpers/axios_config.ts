import axios from "axios";

// axiosでcsrf-tokenを設定するやーつ
axios.interceptors.request.use((config) => {
  if (!config.method) {
    return config;
  }
  const token = document.querySelector<HTMLMetaElement>("meta[name=\"csrf-token\"]");
  if (token) {
    if (["post", "put", "patch", "delete"].includes(config.method.toLowerCase())) {
      config.headers?.common?.set("X-CSRF-Token", token.content);
    }
  }

  return config;
}, (error) => Promise.reject(error));
