import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLazyFileRoute } from "@tanstack/react-router";
import { People, SearchNormal1 } from "iconsax-react";
// For authentication: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
export const Route = createLazyFileRoute("/admin/_adminauth/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Welcome back, Victor!</h1>
        <p className="text-gray-10">
          Manage your hospital and remember to wash your hands
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        <DashCard title="Total Patients" metric={4560} rise={15} />
        <DashCard title="Admitted Patients" metric={3905} rise={15} />
        <DashCard title="Consulting Patients" metric={665} rise={15} />
      </div>
      <PatientsTable />
    </main>
  );
}

interface DashCardProps {
  title: string;
  metric: number;
  rise: number;
}
function DashCard({ title, metric, rise }: DashCardProps) {
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
      <p className="text-xs md:text-sm text-gray-11">
        <span className="text-grass-9">{`${rise}%`}</span> in the last 30 days{" "}
      </p>
    </div>
  );
}

const placeholderData = [
  {
    name: "Victor Hamzat",
    id: "HOSP-001",
    admissionDate: new Date(),
  },
  {
    name: "Victor Hamzat",
    id: "HOSP-001",
    admissionDate: new Date(),
  },
  {
    name: "Victor Hamzat",
    id: "HOSP-001",
    admissionDate: new Date(),
  },
  {
    name: "Victor Hamzat",
    id: "HOSP-001",
    admissionDate: new Date(),
  },
  {
    name: "Victor Hamzat",
    id: "HOSP-001",
    admissionDate: new Date(),
  },
];

function PatientsTable() {
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
            <th className="text-left">Admission Date</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-6">
          {placeholderData.map((patient, index) => (
            <tr key={`${patient.id}-${index}`} >
              <td className="px-5 py-4">{index + 1}</td>
              <td>{patient.name}</td>
              <td>{patient.id}</td>
              <td>{patient.admissionDate.toDateString()}</td>
              <td>{patient.admissionDate.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
