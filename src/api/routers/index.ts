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
  inviteSignup: router.mutation({
    mutationFn: api.inviteSignup,
  }),
});

export const patientRouter = router("patient", {
  create: router.mutation({
    mutationFn: api.createPatient,
  }),
  forwardRecord: router.mutation({
    mutationFn: api.forwardPatientRecord,
  }),
  getAllRecords: router.query({
    fetcher: api.getPatientRecords,
  }),
  addRecord: router.mutation({
    mutationFn: api.addPatientRecord,
  }),
  updateRecord: router.mutation({
    mutationFn: api.updatePatientRecord,
  }),
  search: router.query({
    fetcher: api.searchPatient,
  }),
  get: router.query({
    fetcher: api.getPatient,
  }),
  updateBioData: router.mutation({
    mutationFn: api.updatePatientBioData,
  }),
  admit: router.mutation({
    mutationFn: api.admitPatient,
  }),
  getAdmittedPatients: router.query({
    fetcher: api.getAddmittedPatients,
  }),
  aiSearch: router.query({
    fetcher: api.AISearch
  })
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
  getDoctors: router.query({
    fetcher: api.getDepartmentDoctors,
  }),
  inviteDoctor: router.mutation({
    mutationFn: api.inviteDoctor,
  }),
  getRecords: router.query({
    fetcher: api.getDepartmentRecords
  }),
  getDashboardInfo: router.query({
    fetcher: api.getDashboardInfo
  })
});
