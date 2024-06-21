import { authRouter, patientRouter } from "@/api/routers";
import { PatientInfoCard,AdmitUserForm } from "@/components/inc";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Back,
  ClipboardText,
  Clock,
  Health,
  Message,
  MessageText,
  Profile,
} from "iconsax-react";
import React from "react";

export const Route = createLazyFileRoute(
  "/admin/_adminauth/patient-records/records/$patientId"
)({
  component: Records,
});

function Records() {
  const [open, setOpen] = React.useState(false);
  const { data: user } = authRouter.me.useQuery();
  console.log({ user });
  const { patientId } = Route.useParams();
  const { data: patient } = patientRouter.get.useQuery({
    variables: {
      patientId,
    },
  });
  return (
    <main className="max-w-5xl mx-auto px-4 pb-6">
      <Button variant="ghost" className="text-gray-9 hover:text-gray-11  gap-2">
        <Back />
        Back
      </Button>
      <section>
        <div className="grid gap-4">
          <h1 className="font-semibold text-2xl">Patients Details</h1>
          <div className="flex gap-2">
            <Button variant="outline">Record Patient Visit</Button>
            {/* {user?.user.role === "doctor" && ( */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Admit Patient</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[580px]">
                <AdmitUserForm
                  patientId={patientId}
                  close={() => setOpen(false)}
                />
              </DialogContent>
            </Dialog>
            {/* )} */}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          <div className="col-span-3">
            {patient ? (
              <PatientInfoCard {...patient} size="sm" />
            ) : (
              <Skeleton className="w-full h-36" />
            )}
          </div>
          <ReferenceDetails />
        </div>
        {/* <PatientRecords /> */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <PatientComplaints />
          <MedicalReport />
          <Treatment />
          <Prescription />
        </div>
      </section>
    </main>
  );
}

function ReferenceDetails() {
  return (
    <div className="bg-white p-4 rounded-xl grid gap-1">
      <p className="text-sm font-semibold">Reference details</p>
      <div className="flex text-gray-10 gap-1">
        <Profile size={14} />
        <p className="text-xs">(234) 801-234-5678</p>
      </div>
      <div className="flex text-gray-10 gap-1">
        <Health size={14} />
        <p className="text-xs">(234) 801-234-5678</p>
      </div>
      <div className="flex text-gray-10 gap-1">
        <MessageText size={14} />
        <p className="text-xs">(234) 801-234-5678</p>
      </div>
      <div className="flex text-gray-10 gap-1">
        <Clock size={14} />
        <p className="text-xs">(234) 801-234-5678</p>
      </div>
    </div>
  );
}

function PatientComplaints() {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-[#D5E1FF] rounded-md grid place-items-center">
          <Message />
        </div>
        <div className="grid gap-1">
          <h2 className="font-semibold text-gray-12">Patient’s Complaints</h2>{" "}
          <p className="text-xs text-gray-9">Jun 18, 2024</p>
        </div>
      </div>
      <ul>
        {["1", "2", "3"].map((data) => {
          return (
            <li key={data} className="flex gap-2 mt-2 items-baseline">
              <div className="w-2 h-2 bg-[#6C6E79] rounded-full grid place-items-center" />
              <div className="flex-1">
                <h3 className="text-sm text-gray-12">
                  Patient’s Complaints Patient’s Complaints Patient’s Complaints
                  Patient’s Complaints Patient’s Complaints Patient’s Complaints
                </h3>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end mt-4">
        <Button variant="outline">View all</Button>
      </div>
    </div>
  );
}
function MedicalReport() {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-[#D5E1FF] rounded-md grid place-items-center">
          <ClipboardText />
        </div>
        <div className="grid gap-1">
          <h2 className="font-semibold text-gray-12">Medical report</h2>{" "}
          <p className="text-xs text-gray-9">Jun 18, 2024</p>
        </div>
      </div>
      <ul>
        {["1", "2", "3"].map((d) => {
          return (
            <li key={d} className="flex gap-2 mt-2 items-baseline">
              <div className="w-2 h-2 bg-[#6C6E79] rounded-full grid place-items-center" />
              <div className="flex-1">
                <h3 className="text-sm text-gray-12">
                  Patient’s Complaints Patient’s Complaints Patient’s Complaints
                  Patient’s Complaints Patient’s Complaints Patient’s Complaints
                </h3>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-end mt-4">
        <Button variant="outline">View all</Button>
      </div>
    </div>
  );
}
function Treatment() {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-xl p-4">
      <h2 className="font-semibold">Treatment</h2>
      <TreatmentItem />
      <TreatmentItem />
    </div>
  );
}

function TreatmentItem() {
  return (
    <div className="flex gap-2 items-center p-4 rounded-2xl border border-[#96B1FF]">
      <div className="w-10 h-10 bg-[#D5E1FF] rounded-full grid place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <path
            stroke="#121727"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M5.247 18.736 2 21.985m3.247-3.248 1.415 1.426c.439.442 1.15.442 1.59 0L20.277 8.398M5.248 18.736l-1.609-1.619a1.138 1.138 0 0 1 0-1.6L5.946 13.2m14.332-4.802-2.315-2.332m2.315 2.332.901.907M5.946 13.2l3.376-3.39M5.946 13.2 7.6 14.853M20.773 3.236l-2.81 2.83m2.81-2.83L19.545 2m1.228 1.236L22 4.472m-4.037 1.594-2.452-2.47m0 0-.918-.925m.918.925-2.813 2.825M11.012 11.5l-1.69-1.69m0 0 3.376-3.39m0 0 1.727 1.727"
          />
        </svg>
      </div>
      <div className="grid gap-1">
        <h2 className="font-semibold text-gray-12">Medical report</h2>{" "}
        <p className="text-xs text-gray-9">Jun 18, 2024</p>
      </div>
    </div>
  );
}

function Prescription() {
  return (
    <div className="bg-white flex flex-col gap-4 rounded-xl p-4">
      <h2 className="font-semibold">Treatment</h2>
      <PrescriptionItem />
      <PrescriptionItem />
    </div>
  );
}

function PrescriptionItem() {
  return <div></div>;
}

