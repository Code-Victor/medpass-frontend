import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { SearchNormal1 } from "iconsax-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { phoneNumberSchema } from "@/lib/utils";
import React from "react";
import { patientRouter } from "@/api/routers";
import { toast } from "sonner";
export const Route = createLazyFileRoute("/admin/_adminauth/patient-records/")({
  component: PatientRecords,
});

function PatientRecords() {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { data } = patientRouter.search.useQuery({
    variables: {
      query: search,
    },
  });
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="space-y-1">
        <h1 className="font-bold text-3xl text-center">Patient Records</h1>
        <p className="text-center">
          Enter unique Patient ID to admit patient or record patient visit
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto max-w-lg w-full  relative mt-8">
          <Label
            htmlFor="patient-search"
            className="w-10 grid place-items-center absolute left-0 top-0 bottom-0"
          >
            <span className="sr-only">patient id</span>
            <SearchNormal1 color="#292D32" size={24} />
          </Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="patient-search"
            className="pl-10 py-4 bg-white"
            placeholder="Enter unique patient ID"
          />
        </div>
        {data?.data.map((d) => (
          <PatientCard
            name={d.user.fullName}
            patientId={d.patientId}
            id={d.id}
            gender={d.biodata.gender}
            bloodGroup={d.biodata.bloodGroup}
          />
        ))}
        <p className="text-center">Or</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Register Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[580px]">
            <RegisterPatientForm close={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

const registerUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  homeAddress: z.string().min(1, "Home address is required"),
  stateOfResidence: z.string().min(1, "State of residence is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: phoneNumberSchema,
});
type RegisterUserSchema = z.infer<typeof registerUserSchema>;

// Genotype
const GENOTYPES = ["AA", "AS", "AC", "SS", "SC", "CC"] as const;

// Blood Group
const BLOOD_GROUPS = ["A", "B", "AB", "O"] as const;

// Rhesus Factor
const RHESUS_FACTORS = ["+", "-"] as const;

// Gender
const GENDERS = ["Male", "Female", "Other"] as const;

// Marital Status
const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"] as const;

const completeRegistrationSchema = z.object({
  genotype: z.enum(GENOTYPES),
  bloodGroup: z.enum(BLOOD_GROUPS),
  rhesusFactor: z.enum(RHESUS_FACTORS),
  gender: z.enum(GENDERS),
  maritalStatus: z.enum(MARITAL_STATUSES),
});
type CompleteRegistrationSchema = z.infer<typeof completeRegistrationSchema>;
function RegisterPatientForm(props: { close: () => void }) {
  const [index, setIndex] = React.useState(0);
  const { mutate, isPending } = patientRouter.create.useMutation({
    onSuccess() {
      toast.success("Patient registration successful");
      props.close();
    },
  });
  const userRegistrationForm = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });
  const completeRegistrationForm = useForm<CompleteRegistrationSchema>({
    resolver: zodResolver(completeRegistrationSchema),
  });
  const onRegisterFormSubmit = (data: RegisterUserSchema) => {
    console.log(data);
    setIndex(1);
  };
  const onCompleteRegistration = (data: CompleteRegistrationSchema) => {
    const { stateOfResidence, ...registrationData } =
      userRegistrationForm.getValues();
    mutate({
      genotype: data.genotype,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      bloodGroup: data.bloodGroup + data.rhesusFactor,
      state: stateOfResidence,
      ...registrationData,
    });
  };
  if (index === 1) {
    return (
      <React.Fragment key="patient-registration">
        <DialogHeader>
          <DialogTitle>Complete Patient Registration</DialogTitle>
          <DialogDescription>
            Please provide the following details to complete the patient
            registration. Ensure all information is accurate and up-to-date.
          </DialogDescription>
        </DialogHeader>
        <Form {...completeRegistrationForm}>
          <form
            className="grid gap-4 py-4"
            onSubmit={completeRegistrationForm.handleSubmit(
              onCompleteRegistration
            )}
          >
            <FormField
              control={completeRegistrationForm.control}
              name="genotype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genotype</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genotype" />
                      </SelectTrigger>
                      <SelectContent>
                        {GENOTYPES.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={completeRegistrationForm.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {BLOOD_GROUPS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={completeRegistrationForm.control}
                name="rhesusFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rhesus factor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rhesus factor" />
                        </SelectTrigger>
                        <SelectContent>
                          {RHESUS_FACTORS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={completeRegistrationForm.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDERS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={completeRegistrationForm.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                        <SelectContent>
                          {MARITAL_STATUSES.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button loading={isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment key="register-new">
      <DialogHeader>
        <DialogTitle>Register New Patient</DialogTitle>
        <DialogDescription>
          Please fill in the details below to create a new patient profile and
          streamline their medical history
        </DialogDescription>
      </DialogHeader>
      <Form {...userRegistrationForm}>
        <form
          className="grid gap-4 py-4"
          onSubmit={userRegistrationForm.handleSubmit(onRegisterFormSubmit)}
        >
          <FormField
            control={userRegistrationForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={userRegistrationForm.control}
              name="homeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userRegistrationForm.control}
              name="stateOfResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Residence</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userRegistrationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={userRegistrationForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Proceed</Button>
          </DialogFooter>
        </form>
      </Form>
    </React.Fragment>
  );
}

function PatientCard({
  name,
  patientId,
  id,
  gender,
  bloodGroup,
}: {
  name: string;
  patientId: string;
  id: string;
  gender: string;
  bloodGroup: string;
}) {
  return (
    <div className="grid grid-cols-3 bg-white rounded-xl max-w-lg w-full px-6 py-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="https://api.dicebear.com/9.x/micah/svg"
          alt="avatar"
        />
        <div className="grid gap-1">
          <p className="font-semibold text-center capitalize">{name}</p>
          <p className="text-gray-9 text-xs text-center">{patientId}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-2 border-l border-l-gray-6 pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">info</p>
          <p className="text-xs text-gray-9">
            <span className="font-semibold">Gender: </span>
            {gender}
          </p>
          <p className="text-xs text-gray-9">
            <span className="text-xs font-semibold">Blood Group: </span>
            {bloodGroup}
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Continue to Records</Button>
          <Link
            to="/admin/patient-records/$patientId"
            params={{ patientId: id }}
          >
            <Button>Admit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
