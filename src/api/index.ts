import axios from "axios";
import { useAuthStore } from "@/store";
import { GetCurrentUserResponse } from "./types";

//   "email": "victor.hamzat@kibo.school",
//   "password": "@Promise05"
const BASE_URL = "https://rough-angle-curious-middle-production.pipeops.app/";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function tokenInterceptors() {
  const tokenInterceoptor = api.interceptors.request.use(
    async (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers["x-auth-token"] = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return () => api.interceptors.request.eject(tokenInterceoptor);
}

tokenInterceptors();

// =================================
// API ENDPOINTS FOR AUTHENTICATION
// =================================

export async function getCurrentUser() {
  const response = await api.get<GetCurrentUserResponse>("/user/me");
  return response.data;
}

export async function adminRegister(data: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}) {
  const response = await api.post<{ message: string }>(
    "/auth/admin/register",
    data
  );
  return response.data;
}

export async function regularRegister(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

//TODO: KYC upload

export async function verifyOTP(data: { email: string; otp: string }) {
  const response = await api.post("/auth/otp/verify", data);
  return response.data;
}

export async function resendOTP(data: { email: string }) {
  const response = await api.post("/auth/otp/resend", data);
  return response.data;
}
  
export async function login(data: { email: string; password: string }) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

// =================================
// API ENDPOINTS FOR PATIENTS
// =================================

export async function createPatient(data: {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) {
  const response = await api.post("/patient", data);
  return response.data;
}

export async function forwardPatientRecord({ recordId }: { recordId: string }) {
  const response = await api.post("/patient/record/forward/" + recordId);
  return response.data;
}

export async function getPatientRecords(data: {
  patientId: string;
  hospitalId?: string;
}) {
  const params = new URLSearchParams();
  if (data.hospitalId) {
    params.append("hospitalId", data.hospitalId);
  }
  const response = await api.get(`/patient/record/${data.patientId}?${params}`);
  return response.data;
}
export async function getPatientRecord({ recordId }: { recordId: string }) {
  const response = await api.get(`/patient/record/${recordId}`);
  return response.data;
}

export async function addPatientRecord({
  patientId,
  ...data
}: {
  patientId: string;
  date: Date;
  complaint: string[];
  doctorsReport: string[];
}) {
  const response = await api.post(`/patient/record/${patientId}`, data);
  return response.data;
}

export async function updatePatientRecord({
  recordId,
  ...data
}: {
  recordId: string;
  date?: Date;
  complaint?: string[];
  doctorsReport?: string[];
  treatment?: {
    name: string;
    description: string;
  };
  prescription?: {
    name: string;
    mg: string;
    measurement: string;
    frequency: string;
  };
}) {
  const response = await api.put(`/patient/record/${recordId}`, data);
  return response.data;
}

export async function searchPatient(query: string) {
  const response = await api.get(`/patient/search?query=${query}`);
  return response.data;
}

export async function getPatient({ patientId }: { patientId: string }) {
  const response = await api.get(`/patient/${patientId}`);
  return response.data;
}
export async function updatePatientBioData({
  patientId,
  ...data
}: {
  patientId: string;
  genotype?: string;
  bloodGroup?: string;
  height?: string;
  weight?: string;
  allergies?: string;
}) {
  const response = await api.put(`/patient/biodata/${patientId}`, data);
  return response.data;
}

// =================================
// API ENDPOINTS FOR NOTIFICATIONS
// =================================

export async function getNotifications() {
  const response = await api.get("/notification");
  return response.data;
}

export async function getNotification({
  notificationId,
}: {
  notificationId: string;
}) {
  const response = await api.get(`/notification/${notificationId}`);
  return response.data;
}

// =================================
// API ENDPOINTS FOR HOSPITALS
// =================================

export async function createHospital(data: {
  email: string;
  name: string;
  address: string;
  phone: string;
  cac_number: number;
  website_url: string;
}) {
  const response = await api.post("/hospital", data);
  return response.data;
}

// TODO: how does KYC work?
export async function updateHospitalKYC({
  hospitalId,
  ...data
}: {
  hospitalId: string;
  kyc: string;
}) {
  const response = await api.post(`/hospital/kyc/${hospitalId}`, data);
  return response.data;
}

export async function getHospital({ hospitalId }: { hospitalId: string }) {
  const response = await api.get(`/hospital/${hospitalId}`);
  return response.data;
}

// =================================
// API ENDPOINTS FOR HOSPITAL DEPARTMENTS
// =================================

export async function createDepartment({
  hospitalId,
  ...data
}: {
  hospitalId: string;
  departmentName: string;
  departmentEmail: string;
  hodEmail: string;
  description: string;
}) {
  const response = await api.post(`/hospital/${hospitalId}/department`, data);
  return response.data;
}

export async function getDepartments({ hospitalId }: { hospitalId: string }) {
  const response = await api.get(`/hospital/${hospitalId}/department`);
  return response.data;
}

export async function getDepartment({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get(
    `/hospital/${hospitalId}/department/${departmentId}`
  );
  return response.data;
}

export async function updateDepartment({
  hospitalId,
  departmentId,
  ...data
}: {
  hospitalId: string;
  departmentId: string;
  departmentName?: string;
  departmentEmail?: string;
  hodEmail?: string;
  description?: string;
}) {
  const response = await api.patch(
    `/hospital/${hospitalId}/department/${departmentId}`,
    data
  );
  return response.data;
}

export async function deleteDepartment({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.delete(
    `/hospital/${hospitalId}/department/${departmentId}`
  );
  return response.data;
}
