import React from "react";
import { authRouter, departmentRouter, patientRouter } from "@/api/routers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { createLazyFileRoute } from "@tanstack/react-router";
import { People, SearchNormal1 } from "iconsax-react";
// For authentication: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
export const Route = createLazyFileRoute("/admin/_adminauth/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: user } = authRouter.me.useQuery();
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">
          Welcome back, {user?.user.fullName}!
        </h1>
        <p className="text-gray-10">
          Manage your hospital and remember to wash your hands
        </p>
      </div>
      <DashInsight />
      <PatientsTable />
    </main>
  );
}

function DashInsight() {
  const { data: user } = authRouter.me.useQuery();
  const { data, isLoading } = departmentRouter.getDashboardInfo.useQuery({
    variables: {
      hospitalId: user?.hospital ?? "",
      departmentId: user?.department ?? "",
    },
    enabled: !!user?.hospital && !!user?.department,
  });
  console.log({ data });
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6 mt-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-6 mt-4">
      <DashCard title="Doctor's Count" metric={data?.recordCount ?? 0} />
      <DashCard title="Record Count" metric={data?.recordCount ?? 0} />
      <DashCard title="Admission Count" metric={data?.admissionCount ?? 0} />
    </div>
  );
}

interface DashCardProps {
  title: string;
  metric: number;
}
function DashCard({ title, metric }: DashCardProps) {
  return (
    <div className="bg-white rounded-lg p-2 md:p-4 grid gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 md:h-10 md:w-10 grid place-items-center bg-[#D5E1FF] rounded-full">
          <People className="w-4 h-4 md:w-6 md:h-6" />
        </div>
        <h2 className="text-sm md:text-base font-medium">{title}</h2>
      </div>
      <p className="text-3xl md:text-4xl font-semibold">
        {metric.toLocaleString()}
      </p>
    </div>
  );
}

function PatientsTable() {
  const [search, setSearch] = React.useState("");
  const { data: user } = authRouter.me.useQuery();
  const { data: patients, isLoading } =
    patientRouter.getAdmittedPatients.useQuery({
      variables: {
        hospitalId: user?.hospital ?? "",
        departmentId: user?.department ?? "",
      },
      enabled: !!user?.hospital && !!user?.department,
    });
  const patientData = React.useMemo(
    () =>
      patients?.data.filter((d) =>
        d.user.fullName.toLowerCase().includes(search.toLowerCase())
      ) ?? [],
    [patients, search]
  );
  return (
    <div className="bg-white p-6 rounded-xl grid gap-4 mt-4">
      <h2 className="font-semibold text-2xl md:text-3xl">Admitted Patients</h2>
      <div className="flex justify-between">
        <div className="relative">
          <Label
            htmlFor="patient-search"
            className="w-10 grid place-items-center absolute left-0 top-0 bottom-0"
          >
            <span className="sr-only">patient id</span>
            <SearchNormal1 color="#292D32" size={20} />
          </Label>
          <Input
            id="patient-search"
            className="pl-10 py-4 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Admitted Patients"
          />
        </div>
        <Button>Admit a Patient</Button>
      </div>
      <table className="w-full border-gray-11 rounded-2xl overflow-hidden divide-y divide-gray-6">
        <thead>
          <tr className="text-blue-11 bg-blue-4 px-5 py-4">
            <th className="text-left px-5 py-4">No</th>
            <th className="text-left">Patient Name</th>
            <th className="text-left">Patient ID</th>
            <th className="text-left">Email</th>
            <th className="text-left">Admission Date</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-6">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                <Skeleton className="h-10" />
              </td>
            </tr>
          ) : (
            patientData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {search
                    ? `No admitted patients for this search query: "${search}"`
                    : "No admitted patients"}
                </td>
              </tr>
            )
          )}
          {patientData.map((patient, index) => (
            <tr key={`${patient.id}-${index}`}>
              <td className="px-5 py-4">{index + 1}</td>
              <td>{patient.user.fullName}</td>
              <td>{patient.patientId}</td>
              <td>{patient.user.email}</td>
              <td>{new Date(patient.createdAt).toDateString()}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
