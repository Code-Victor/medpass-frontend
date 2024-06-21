import axios from "axios";
import { useAuthStore } from "@/store";
import {
  GetCurrentUserResponse,
  LoginResponse,
  VerifyOTPResponse,
  GetDepartmentsResponse,
  GetDepartmentResponse,
  GetDoctorsResponse,
  GetDepartmentRecords,
  GetAddmittedPatientsResponse,
  GetPatientResponse,
  SearchPatientResponse,
  GetRecordsResponse,
  IRecord,
} from "./types";

//   "email": "victor.hamzat@kibo.school",
//   "password": "@Promise05"
const BASE_URL = "https://dandy-voyage-violent-letters-production.pipeops.app/";
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
  return response.data.data;
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
  const response = await api.post<VerifyOTPResponse>("/auth/otp/verify", data);
  return response.data;
}

export async function resendOTP(data: { email: string }) {
  const response = await api.post("/auth/otp/resend", data);
  return response.data;
}

export async function login(data: { email: string; password: string }) {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}
export async function inviteSignup({
  token,
  ...data
}: {
  fullName: string;
  password: string;
  token: string;
}) {
  const response = await api.post<LoginResponse>(
    "/auth/signup?token=" + token,
    data
  );
  return response.data;
}

// =================================
// API ENDPOINTS FOR PATIENTS
// =================================
export interface createPatientData {
  email: string;
  fullName: string;
  phoneNumber: string;
  state: string;
  homeAddress: string;
  gender: string;
  maritalStatus: string;
  genotype: string;
  bloodGroup: string;
}

export async function createPatient(data: createPatientData) {
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
  const response = await api.get<GetRecordsResponse>(
    `/patient/record/${data.patientId}?${params}`
  );
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

export async function searchPatient({ query }: { query: string }) {
  const response = await api.get<SearchPatientResponse>(
    `/patient/search?patientId=${query}`
  );
  return response.data;
}

export async function getPatient({ patientId }: { patientId: string }) {
  const response = await api.get<GetPatientResponse>(`/patient/${patientId}`);
  return response.data.data;
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
  cac_number: string;
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
  departmentEmail?: string;
  hodName: string;
  hodEmail: string;
  description: string;
}) {
  const response = await api.post(`/hospital/${hospitalId}/department`, data);
  return response.data;
}

export async function getDepartments({ hospitalId }: { hospitalId: string }) {
  const response = await api.get<GetDepartmentsResponse>(
    `/hospital/${hospitalId}/department`
  );
  return response.data;
}

export async function getDepartment({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get<GetDepartmentResponse>(
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

export async function getDepartmentDoctors({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get<GetDoctorsResponse>(
    `/hospital/${hospitalId}/department/doctor/${departmentId}/`
  );
  return response.data.data;
}

export async function inviteDoctor({
  hospitalId,
  ...data
}: {
  hospitalId: string;
  departmentId: string;
  email: string;
}) {
  const response = await api.post(
    `/hospital/${hospitalId}/department/doctor/`,
    data
  );
  return response.data;
}

export async function getDepartmentRecords({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get<GetDepartmentRecords>(
    `/hospital/${hospitalId}/department/records/${departmentId}`
  );
  return response.data.data;
}

export async function getDashboardInfo({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get<{
    data: {
      doctorCount: number;
      recordCount: number;
      admissionCount: number;
    };
  }>(`/hospital/${hospitalId}/department/dashboard/${departmentId}`);
  return response.data.data;
}

export async function getAddmittedPatients({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const response = await api.get<GetAddmittedPatientsResponse>(
    `hospital/admitted-patient/${hospitalId}?departmentId=` + departmentId
  );
  return response.data;
}

interface AdmitPatientData {
  patientId: string;
  complaints: string[];
  symptoms: string[];
  tests: string[];
  diagnosis: string[];
  treatment: { name: string; dosage: string; measurement: string };
}
export async function admitPatient({ patientId, ...data }: AdmitPatientData) {
  const response = await api.post<{ data: unknown }>(
    `/hospital/admit/${patientId}`,
    data
  );
  return response.data.data;
}

export async function AISearch({
  search,
  patientId,
}: {
  search: string;
  patientId: string;
}) {
  const response = await api.post<{ data: IRecord[] }>(
    `/patient/search/ai/${patientId}?search=${search}`
  );
  return response.data.data;
}
