export interface GetCurrentUserResponse {
  data: {
    hospital: string;
    department?: string;
    user: User;
  };
}

export interface VerifyOTPResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  email: string;
  fullName: string;
  role: "admin" | "doctor";
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface LoginResponse extends VerifyOTPResponse {}
export interface GetDepartmentsResponse {
  data: Department[];
}

export interface Department {
  hospital: string;
  departmentName: string;
  departmentEmail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
export interface GetDepartmentResponse {
  hospital: Hospital;
  departmentName: string;
  departmentEmail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface Hospital {
  email: string;
  name: string;
  address: string;
  website_url: string;
  cac_number: string;
  phone: string;
  kycVerified: boolean;
  created_by: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface GetDoctorsResponse {
  data: Doctor[];
}

export interface Doctor {
  _id: string;

  hospital: string;
  user: User;
  department: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetDepartmentRecords {
  data: HospitalRecord[];
}
export interface GetPatientResponse {
  data: Patient;
}
export interface SearchPatientResponse {
  data: {
    user: User;
    patientId: string;
    homeAddress: string;
    state: string;
    biodata: Biodata;
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }[];
}

export interface GetAddmittedPatientsResponse {
  data: Patient[];
}

export interface HospitalRecord {
  _id: string;
  patient: Patient;
  doctor: Doctor;
  hospital: Hospital;
  department: Department;
  date: Date;
  complaint: string[];
  record_id: string;
  doctorsReport: string[];
  prescription: string[];
  treatment: string[];
}

export interface Patient {
  user: User;
  patientId: string;
  homeAddress: string;
  state: string;
  biodata: Biodata;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Biodata {
  genotype: string;
  bloodGroup: string;
  gender: string;
  maritalStatus: string;
}
export interface GetRecordsResponse {
  data: IRecord[];
}

export interface IRecord{
    patient: string;
    doctor: Doctor;
    hospital: string;
    department: string;
    date: Date;
    complaint: string[];
    record_id: string;
    doctorsReport: string[];
    treatment: string[];
    prescription: string[];
    createdAt: Date;
    updatedAt: Date;
    id: string;
  }
