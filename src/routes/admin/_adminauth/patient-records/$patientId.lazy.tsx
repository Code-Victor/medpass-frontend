import React from "react";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Back } from "iconsax-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PatientInfoCard,
  AdmitUserForm,
  RecordVisitForm,
} from "@/components/inc";
import { authRouter, patientRouter } from "@/api/routers";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IRecord } from "@/api/types";
import { AISearch } from "@/components/inc/ai-search";
export const Route = createLazyFileRoute(
  "/admin/_adminauth/patient-records/$patientId"
)({
  component: PatientDetails,
});

function PatientDetails() {
  const [open, setOpen] = React.useState(false);
  const [openVisit, setOpenVisit] = React.useState(false);
  const navigate = Route.useNavigate();
  const { patientId } = Route.useParams();
  const { data: user } = authRouter.me.useQuery();
  const { data: patient } = patientRouter.get.useQuery({
    variables: {
      patientId,
    },
  });
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
            {user?.user.role === "doctor" && (
              <>
                <Dialog open={openVisit} onOpenChange={setOpenVisit}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Record Patient Visit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[580px]">
                    <RecordVisitForm
                      patientId={patientId ?? ""}
                      close={() => setOpenVisit(false)}
                    />
                  </DialogContent>
                </Dialog>
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
              </>
            )}
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
      <AISearch {...{ patientId }} />
    </main>
  );
}

function PatientRecords({ id }: { id: string }) {
  const [currentTab, setCurrentTab] = React.useState("current-hospital");
  const { data: user } = authRouter.me.useQuery();
  const { data: records } = patientRouter.getAllRecords.useQuery({
    variables:
      currentTab === "current-hospital"
        ? {
            patientId: id,
            hospitalId: user?.hospital ?? "",
          }
        : {
            patientId: id,
          },
  });
  return (
    <div className="bg-white rounded-xl mt-6 p-4">
      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value)}>
        <TabsList>
          <TabsTrigger value="current-hospital">Current Hospital</TabsTrigger>
          <TabsTrigger value="all-records">All records</TabsTrigger>
        </TabsList>
        <TabsContent value="all-records">
          <div className="grid gap-4">
            {records?.data.length === 0 && (
              <p className="py-4 text-center">No records found</p>
            )}
            {records?.data.map((record, i) => (
              <RecordItem {...record} key={i} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="current-hospital">
          <div className="grid gap-4">
            {records?.data.length === 0 && (
              <p className="py-4 text-center">No records found</p>
            )}
            {records?.data.map((record, i) => (
              <RecordItem {...record} key={i} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
interface RecordItemProps extends IRecord {}
function RecordItem(props: RecordItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="grid gap-1">
        <h2 className=" max-w-[180px] overflow-hidden text-nowrap text-ellipsis">
          <span className="font-semibold">Record:</span> {props.id}
        </h2>
        <p className="text-gray-10 text-sm">
          <span className="font-medium">Ref by:</span>
          {props.doctor.user?.fullName}
        </p>
        <div className="">
          <Button variant="ghost" size="sm">
            View More
          </Button>
        </div>
      </div>
      <p className="text-gray-10">
        {new Date(props?.createdAt ?? new Date()).toDateString()}
      </p>
    </div>
  );
}
