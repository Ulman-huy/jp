import { API_BASE_URL } from "@/configs/contains";

const fetchApi = {
  post: async (url: string, data: any = {}, headers?: any) => {
    try {
      const newUrl = `${API_BASE_URL}${url}`;
      const config = {
        method: "POST",
        headers: {
          ...headers,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(newUrl, config);
      return await response.json();
    } catch (error) {
      console.log(`fetch api: ${url} ===>>`, error);
      return null;
    }
  },
  get: async (url: string, headers?: any) => {
    try {
      const newUrl = `${API_BASE_URL}${url}`;
      const config = {
        method: "GET",
        headers: {
          ...headers,
        },
      };

      const response = await fetch(newUrl, config);
      return await response.json();
    } catch (error) {
      console.log(`fetch api: ${url} ===>>`, error);
      return null;
    }
  },
};

export default fetchApi;
