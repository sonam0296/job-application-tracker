import axios from "axios";

const BASE_API_URL = "http://localhost:9000/api";

const API = axios.create({
  baseURL: BASE_API_URL,
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await API.post("/auth/login", { email, password });
    return resp.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getJobs = async () => await API.get("/jobs");

export const createJob = async (data: {
  title: string;
  company: string;
  status: string;
  notes?: string;
}) => await API.post("/jobs", data);
export const updateJob = (id: number, data: any) =>
  API.put(`/jobs/${id}`, data);
export const deleteJob = (id: number) => API.delete(`/jobs/${id}`);
