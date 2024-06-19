import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Back, SearchNormal1 } from "iconsax-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authRouter, departmentRouter } from "@/api/routers";
import { toast } from "sonner";

export const Route = createLazyFileRoute(
  "/admin/_adminauth/department/$departmentId/doctor"
)({
  component: Doctor,
});

function Doctor() {
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
        <DoctorsTable />
      </section>
    </main>
  );
}


const doctorInvitationSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type DoctorInvitationSchema = z.infer<typeof doctorInvitationSchema>;
function DoctorsTable() {
  const [open, setOpen] = React.useState(false);
  const [search,setSearch] = React.useState("");
  const { mutate: inviteDoctor, isPending } =
    departmentRouter.inviteDoctor.useMutation({
      onSuccess() {
        toast.success("Invite sent successfully");
        setOpen(false);
      },
    });
  const { data: user } = authRouter.me.useQuery();
  const { departmentId } = Route.useParams();
  const { data: doctors } = departmentRouter.getDoctors.useQuery({
    variables: {
      departmentId,
      hospitalId: user?.hospital ?? "",
    },
  });
  const doctorInvitationForm = useForm<DoctorInvitationSchema>({
    resolver: zodResolver(doctorInvitationSchema),
  });

  function onSubmit(data: DoctorInvitationSchema) {
    inviteDoctor({
      ...data,
      departmentId,
      hospitalId: user?.hospital ?? "",
    });
  }
  return (
    <div className="bg-white rounded-xl grid gap-2 mt-4">
      <div className="px-4 pt-4 pb-2 grid gap-2">
        <h2 className="font-semibold text-lg md:text-xl">Doctors</h2>
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
              id="patient-search"
              className="pl-10 py-4 bg-white"
              placeholder="Search Report ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Invite Doctor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[580px]">
              <DialogHeader>
                <DialogTitle>Invite New Doctor</DialogTitle>
                <DialogDescription>
                  Send an invite to a doctor to join your department
                </DialogDescription>
              </DialogHeader>
              <Form {...doctorInvitationForm}>
                <form
                  className="grid gap-4 py-4"
                  onSubmit={doctorInvitationForm.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={doctorInvitationForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor's Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="hello@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" loading={isPending}>
                      Send Invite
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <table className="w-full border-gray-11 overflow-hidden divide-y divide-gray-6">
        <thead>
          <tr className="text-blue-11 bg-blue-4 px-5 py-2">
            <th className="text-left px-5 py-4">No</th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Joined at</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-6">
          {doctors?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No doctors found
              </td>
            </tr>
          )}
          {doctors?.filter((doctor)=>(
            doctor.user.fullName.toLowerCase().includes(search.toLowerCase())
          )).map((doctor, index) => (
            <tr key={`${doctor.user.id}-${index}`}>
              <td className="px-5 py-4">{index + 1}</td>
              <td>{doctor.user.fullName}</td>
              <td>{doctor.user.email}</td>
              <td>{new Date(doctor.user.email).toDateString()}</td>
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
