import { router } from "react-query-kit";
import * as api from "..";

export const authRouter = router("auth", {
  me: router.query({
    fetcher: api.getCurrentUser,
  }),
  adminRegister: router.mutation({
    mutationFn: api.adminRegister,
  }),
  regularRegister: router.mutation({
    mutationFn: api.regularRegister,
  }),
  verifyOTP: router.mutation({
    mutationFn: api.verifyOTP,
  }),
  resendOTP: router.mutation({
    mutationFn: api.resendOTP,
  }),
  login: router.mutation({
    mutationFn: api.login,
  }),
});

export const patientRouter = router("patient", {
  createPatient: router.mutation({
    mutationFn: api.createPatient,
  }),
  forwardPatientRecord: router.mutation({
    mutationFn: api.forwardPatientRecord,
  }),
  getAllPatientRecords: router.query({
    fetcher: api.getPatientRecords,
  }),
  getPatientRecord: router.query({
    fetcher: api.getPatientRecord,
  }),
  addPatientRecord: router.mutation({
    mutationFn: api.addPatientRecord,
  }),
  updatePatientRecord: router.mutation({
    mutationFn: api.updatePatientRecord,
  }),
  search: router.query({
    fetcher: api.searchPatient,
  }),
  getPatient: router.query({
    fetcher: api.getPatient,
  }),
  updatePatientBioData: router.mutation({
    mutationFn: api.updatePatientBioData,
  }),
});

export const notificationsRouter = router("notifications", {
  getAll: router.query({
    fetcher: api.getNotifications,
  }),

  get: router.query({
    fetcher: api.getNotification,
  }),
});

export const hospitalRouter = router("hospital", {
  createHospital: router.mutation({
    mutationFn: api.createHospital,
  }),
  getHospital: router.query({
    fetcher: api.getHospital,
  }),
  updateHospitalKYC: router.mutation({
    mutationFn: api.updateHospitalKYC,
  }),
});

export const departmentRouter = router("department", {
  createDepartment: router.mutation({
    mutationFn: api.createDepartment,
  }),
  getAllDepartments: router.query({
    fetcher: api.getDepartments,
  }),
  getDepartment: router.query({
    fetcher: api.getDepartment,
  }),
  updateDepartment: router.mutation({
    mutationFn: api.updateDepartment,
  }),
  deleteDepartment: router.mutation({
    mutationFn: api.deleteDepartment,
  }),
});
