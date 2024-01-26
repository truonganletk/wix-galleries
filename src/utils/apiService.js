class ApiService {
  constructor(baseUrl, tokenUrl) {
    this.baseUrl = baseUrl;
    this.tokenUrl = tokenUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async fetchAuthToken() {
    try {
      const response = await fetch(`${this.tokenUrl}/_functions/token`, {
        method: "GET",
        headers: this.headers,
      });
      const data = await response.text();
      return data;
    } catch (error) {
      console.error("Error fetching authentication token:", error);
      throw error;
    }
  }

  async get(endpoint) {
    const authToken = await this.fetchAuthToken();
    this.headers.Authorization = authToken;

    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "GET",
        headers: this.headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async post(endpoint, data) {
    const authToken = await this.fetchAuthToken();
    this.headers.Authorization = authToken;

    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Error creating data at ${endpoint}:`, error);
      throw error;
    }
  }

  async put(endpoint, data) {
    const authToken = await this.fetchAuthToken();
    this.headers.Authorization = authToken;

    try {
      await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      throw error;
    }
  }

  async patch(endpoint, data) {
    const authToken = await this.fetchAuthToken();
    this.headers.Authorization = authToken;

    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Error partially updating data at ${endpoint}:`, error);
      throw error;
    }
  }

  async delete(endpoint) {
    const authToken = await this.fetchAuthToken();
    this.headers.Authorization = authToken;

    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "DELETE",
        headers: this.headers,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      throw error;
    }
  }

  async uploadFile(endpoint, file, fileName) {
    const authToken = await this.fetchAuthToken();
    try {
      const response = await fetch(`${endpoint}?filename=${fileName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: authToken,
        },
        body: file,
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(`Error uploading file at ${endpoint}:`, error);
      throw error;
    }
  }
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;

if (!BASE_URL || !TOKEN_URL) {
  throw new Error("Missing environment variables. Check your .env file.");
}

const apiService = new ApiService(BASE_URL, TOKEN_URL);

export default apiService;
