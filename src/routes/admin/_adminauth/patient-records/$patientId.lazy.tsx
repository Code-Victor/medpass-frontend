import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Back } from "iconsax-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientInfoCard } from "@/components/inc";
import { authRouter, patientRouter } from "@/api/routers";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createLazyFileRoute(
  "/admin/_adminauth/patient-records/$patientId"
)({
  component: PatientDetails,
});

function PatientDetails() {
  const navigate = Route.useNavigate();
  const { patientId } = Route.useParams();
  const { data: user } = authRouter.me.useQuery();
  const { data: patient } = patientRouter.get.useQuery({
    variables: {
      patientId,
    },
  });
  console.log();
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
          <h1 className="font-semibold text-2xl">Patients Details</h1>
          <div className="flex gap-2">
            <Button variant="outline">Record Patient Visit</Button>
            {user?.user.role === "doctor" && <Button>Admit Patient</Button>}
          </div>
        </div>
        <div className="mt-4">
          {patient ? (
            <PatientInfoCard {...patient} />
          ) : (
            <Skeleton className="w-full h-36" />
          )}
        </div>
        <PatientRecords id={patientId} />
      </section>
    </main>
  );
}

function PatientRecords({ id }: { id: string }) {
  console.log(id)
  return (
    <div className="bg-white rounded-xl mt-6 p-4">
      <Tabs defaultValue="all-records">
        <TabsList>
          <TabsTrigger value="all-records">All records</TabsTrigger>
          <TabsTrigger value="current-record">Current Hospital</TabsTrigger>
        </TabsList>
        <TabsContent value="all-records">
          <div className="grid gap-4">
            <RecordItem />
            <RecordItem />
            <RecordItem />
          </div>
        </TabsContent>
        <TabsContent value="current-record">
          <div className="grid gap-4">
            <RecordItem />
            <RecordItem />
            <RecordItem />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecordItem() {
  return (
    <div className="flex justify-between items-center">
      <div className="grid gap-1">
        <h2 className="font-semibold">Record 202416FAQ</h2>
        <p className="text-gray-10 text-sm">Ref by: Dr Shygami</p>
        <Button variant="ghost" size="sm">
          View More
        </Button>
      </div>
      <p className="text-gray-10">January 29th, 2025</p>
    </div>
  );
}
