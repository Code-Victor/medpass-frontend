import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Back, SearchNormal1 } from "iconsax-react";

export const Route = createLazyFileRoute(
  "/admin/_adminauth/department/$departmentName"
)({
  component: Department,
});

function Department() {
  const { departmentName } = Route.useParams();
  const navigate = Route.useNavigate();
  return (
    <main className="max-w-5xl mx-auto px-4">
      <Button
        variant="ghost"
        className="text-gray-9 hover:text-gray-11  gap-2"
        onClick={() => {
          navigate({
            // @ts-expect-error unexpected behaviour
            to: "../",
          });
        }}
      >
        <Back />
        Back
      </Button>
      <section>
        <div className="grid gap-4">
          <h1 className="font-semibold text-2xl capitalize">
            {departmentName}
          </h1>
          <div className="grid gap-4 grid-cols-3">
            <div className="col-span-2">
              <MedicalReports />
            </div>
            <DoctorPane />
          </div>
        </div>
      </section>
    </main>
  );
}

function DoctorPane() {
  return (
    <div className="bg-white rounded-xl flex flex-col overflow-clip divide-y divide-gray-6">
      <h2 className="font-semibold text-xl px-6 py-4">Doctors</h2>
      <div className="flex-1 divide-y">
        <DoctorItem />
        <DoctorItem />
        <DoctorItem />
      </div>
      <Button className="bg-[#D5E1FF] hover:bg-[#D5E1FF]/90 w-full" size="lg" variant="secondary">View all</Button>
    </div>
  );
}
function DoctorItem() {
  return (
    <div className="flex gap-2 items-center px-6 py-3">
      <img
        className="w-16 h-16 rounded-full"
        src="https://api.dicebear.com/9.x/micah/svg"
        alt="avatar"
      />
      <div className="grid gap-1">
        <p className="font-semibold">Daniel Alao</p>
        <p className="text-gray-9 text-xs">Aiyesorogbewalai@gmail.com</p>
      </div>
    </div>
  );
}
const placeholderData = [
  {
    reference: "Victor Hamzat",
    id: "HOSP-001",
  },
  {
    reference: "Victor Hamzat",
    id: "HOSP-001",
  },
  {
    reference: "Victor Hamzat",
    id: "HOSP-001",
  },
  {
    reference: "Victor Hamzat",
    id: "HOSP-001",
  },
  {
    reference: "Victor Hamzat",
    id: "HOSP-001",
  },
];

function MedicalReports() {
  return (
    <div className="bg-white rounded-xl grid gap-4">
      <div className="p-4 grid gap-2">
        <h2 className="font-semibold text-2xl md:text-3xl">Medical Reports</h2>
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
              placeholder="Search Report ID"
            />
          </div>
        </div>
      </div>
      <table className="w-full border-gray-11 overflow-hidden divide-y divide-gray-6">
        <thead>
          <tr className="text-blue-11 bg-blue-4 px-5 py-2">
            <th className="text-left px-5 py-4">No</th>
            <th className="text-left">Record Id</th>
            <th className="text-left">Reference</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-6">
          {placeholderData.map((patient, index) => (
            <tr key={`${patient.id}-${index}`}>
              <td className="px-5 py-4">{index + 1}</td>
              <td>{patient.id}</td>
              <td>{patient.reference}</td>
              <td>
                <Button variant="ghost">Action</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
