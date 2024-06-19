import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { phoneNumberSchema } from "@/lib/utils";
export const Route = createLazyFileRoute("/admin/_adminauth/patient-records/")({
  component: PatientRecords,
});

function PatientRecords() {
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="space-y-1">
        <h1 className="font-bold text-3xl text-center">Patient Records</h1>
        <p className="text-center">
          Enter unique Patient ID to admit patient or record patient visit
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="mx-auto max-w-md w-full  relative mt-8">
          <Label
            htmlFor="patient-search"
            className="w-10 grid place-items-center absolute left-0 top-0 bottom-0"
          >
            <span className="sr-only">patient id</span>
            <SearchNormal1 color="#292D32" size={24} />
          </Label>
          <Input
            id="patient-search"
            className="pl-10 py-4 bg-white"
            placeholder="Enter unique patient ID"
          />
        </div>
        <PatientCard />
        <p className="text-center">Or</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Register Patient</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[580px]">
            <RegisterPatientForm />
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

function RegisterPatientForm() {
  const userRegistrationForm = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });
  const registerUser = (data: RegisterUserSchema) => {
    console.log(data);
  };
  return (
    <>
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
          onSubmit={userRegistrationForm.handleSubmit(registerUser)}
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
        </form>
      </Form>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
}

function PatientCard() {
  return (
    <div className="grid grid-cols-3 bg-white rounded-xl max-w-lg w-full px-6 py-4">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="https://api.dicebear.com/9.x/micah/svg"
          alt="avatar"
        />
        <div className="grid gap-1">
          <p className="font-semibold text-center">Daniel Alao</p>
          <p className="text-gray-9 text-xs text-center">ID 000 455</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 col-span-2 border-l border-l-gray-6 pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">info</p>
          <p className="text-xs text-gray-9">
            <span className="font-semibold">Date of birth: </span>
            09/23/1990
          </p>
          <p className="text-xs text-gray-9">
            <span className="text-xs font-semibold">Admission Status: </span>
            In consultation
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Continue to Records</Button>
          <Button>Admit</Button>
        </div>
      </div>
    </div>
  );
}
