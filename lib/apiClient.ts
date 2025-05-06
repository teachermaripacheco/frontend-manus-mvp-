import axios from 'axios';

// Define the base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Default to localhost:8000

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    // Check if running in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Auth Endpoints ---
export const registerUser = (userData: any) => apiClient.post('/auth/register', userData);

// Note: Axios automatically handles the form data encoding for OAuth2PasswordRequestForm
export const loginUser = (formData: FormData) => apiClient.post('/auth/login', formData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// --- Student Endpoints ---
export const submitStudentInput = (inputData: any) => apiClient.post('/student/input', inputData);
export const triggerPlanGeneration = () => apiClient.post('/student/plan');
export const getStudentPlan = () => apiClient.get('/student/plan');
export const submitFeedback = (feedbackData: any) => apiClient.post('/student/feedback', feedbackData);

// --- Admin Endpoints ---
export const getAllUsers = () => apiClient.get('/admin/users');
export const getUserDetails = (userId: string) => apiClient.get(`/admin/users/${userId}`);

export default apiClient;

