import { authRouter, departmentRouter } from "@/api/routers";
import { User } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Back, SearchNormal1 } from "iconsax-react";
import React from "react";

export const Route = createLazyFileRoute(
  "/admin/_adminauth/department/$departmentId/"
)({
  component: Department,
});

function Department() {
  const { departmentId } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: user } = authRouter.me.useQuery();
  const hospitalId = user?.hospital;
  const { data: departmentDetails } = departmentRouter.getDepartment.useQuery({
    variables: {
      hospitalId: hospitalId!,
      departmentId,
    },
    enabled: !!hospitalId && !!departmentId,
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
          {departmentDetails ? (
            <h1 className="font-semibold text-2xl capitalize">
              {departmentDetails.departmentName}
            </h1>
          ) : (
            <Skeleton className="h-8 w-52 rounded-lg" />
          )}
          <div className="grid gap-4 grid-cols-3">
            <div className="col-span-2">
              <MedicalReports
                {...{
                  hospitalId: hospitalId!,
                  departmentId,
                }}
              />
            </div>
            <DoctorPane
              {...{
                hospitalId: hospitalId!,
                departmentId,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function DoctorPane({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const { data: doctors, isLoading } = departmentRouter.getDoctors.useQuery({
    variables: {
      hospitalId,
      departmentId,
    },
  });
  if (isLoading) {
    return <Skeleton className="rouned-xl"></Skeleton>;
  }
  return (
    <div className="bg-white rounded-xl flex flex-col overflow-clip divide-y divide-gray-6">
      <h2 className="font-semibold text-xl px-6 py-4">Doctors</h2>
      <div className="flex-1 divide-y">
        {doctors?.length === 0 && (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-9">No doctors available</p>
          </div>
        )}
        {doctors?.map((doc) => <DoctorItem {...doc.user} />)}
      </div>
      <Link
        to="/admin/department/$departmentId/doctor"
        params={{
          departmentId,
        }}
      >
        <Button
          className="bg-[#D5E1FF] hover:bg-[#D5E1FF]/90 w-full"
          size="lg"
          variant="secondary"
        >
          View all
        </Button>
      </Link>
    </div>
  );
}
function DoctorItem(props: User) {
  return (
    <div className="flex gap-2 items-center px-6 py-3">
      <img
        className="w-16 h-16 rounded-full"
        src={"https://api.dicebear.com/9.x/micah/svg?seed=" + props.fullName}
        alt="avatar"
      />
      <div className="grid gap-1">
        <p className="font-semibold">{props.fullName}</p>
        <p className="text-gray-9 text-xs">{props.email}</p>
      </div>
    </div>
  );
}

function MedicalReports({
  hospitalId,
  departmentId,
}: {
  hospitalId: string;
  departmentId: string;
}) {
  const [search, setSearch] = React.useState("");
  const { data: records } = departmentRouter.getRecords.useQuery({
    variables: {
      hospitalId,
      departmentId,
    },
  });
  return (
    <div className="bg-white rounded-xl grid gap-4">
      <div className="p-4 grid gap-2">
        <h2 className="font-semibold text-lg md:text-xl">Medical Reports</h2>
        <div className="flex justify-between">
          <div className="relative min-w-[320px]">
            <Label
              htmlFor="patient-search"
              className="w-10 grid place-items-center absolute left-0 top-0 bottom-0"
            >
              <span className="sr-only">patient id</span>
              <SearchNormal1 color="#292D32" size={20} />
            </Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          {records?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-9">
                No records available
              </td>
            </tr>
          )}
          {records?.map((record, index) => (
            <tr key={`${record._id}-${index}`}>
              <td className="px-5 py-4">{index + 1}</td>
              <td>{record._id}</td>
              <td>{record.doctor.user?.fullName}</td>
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
