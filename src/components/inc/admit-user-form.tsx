import { patientRouter } from "@/api/routers";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { splitByNewline } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const admitUserSchema = z.object({
  complaints: z.string({ required_error: "Complaints are required" }),

  symptoms: z.string({ required_error: "Symptoms are required" }),

  tests: z.string({ required_error: "Tests are required" }),

  diagnosis: z.string({ required_error: "Diagnosis is required" }),
});
type AdmitUserSchema = z.infer<typeof admitUserSchema>;
const treatmentSchema = z.object({
  name: z.string({ required_error: "Treatment name required" }),
  dosage: z.string({ required_error: "Dosage is required" }),
  measurement: z.string({ required_error: "Measurement is required" }),
});
type TreatmentSchema = z.infer<typeof treatmentSchema>;
export function AdmitUserForm({
  close,
  patientId,
}: {
  patientId: string;
  close: () => void;
}) {
  const [index, setIndex] = React.useState<0 | 1>(0);
  const form = useForm<AdmitUserSchema>({
    resolver: zodResolver(admitUserSchema),
  });
  const treatmentForm = useForm<TreatmentSchema>({
    resolver: zodResolver(treatmentSchema),
  });
  const { mutate: admitPatient, isPending: isAdmittingPatient } =
    patientRouter.admit.useMutation({
      onError() {
        toast.error("An error occured while admitting patient");
      },
      onSuccess() {
        close();
        toast.success("Patient admitted successfully");
      },
    });

  function onTreatmentFormSubmit(data: TreatmentSchema) {
    const info = form.getValues();
    admitPatient({
      patientId,
      complaints: splitByNewline(info.complaints),
      symptoms: splitByNewline(info.symptoms),
      tests: splitByNewline(info.tests),
      diagnosis: splitByNewline(info.diagnosis),
      treatment: data,
    });
  }
  if (index === 1) {
    return (
      <React.Fragment key="treatment-form">
        <DialogHeader>
          <DialogTitle>Outline Treatment</DialogTitle>
          <DialogDescription>
            Please provide detailed information about the prescribed treatment
            plan. All fields in the form are relevant unless stated otherwise.
          </DialogDescription>
        </DialogHeader>
        <Form {...treatmentForm}>
          <form
            className="grid gap-4 py-4"
            onSubmit={treatmentForm.handleSubmit(onTreatmentFormSubmit)}
          >
            <FormField
              control={treatmentForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={treatmentForm.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={treatmentForm.control}
                name="measurement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement</FormLabel>

                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="milligrams" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
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
              <Button loading={isAdmittingPatient} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </React.Fragment>
    );
  }
  const onSubmit = async (data: AdmitUserSchema) => {
    console.log(data);
    setIndex(1);
  };

  return (
    <React.Fragment>
      <DialogHeader>
        <DialogTitle>Fill Medical Report</DialogTitle>
        <DialogDescription>
          Please complete the following form to admit a new patient. Ensure all
          fields are filled accurately to facilitate proper care and
          record-keeping.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="grid gap-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="complaints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complaints</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnosis</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptoms</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Test</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button loading={isAdmittingPatient} type="submit">
              Proceed
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </React.Fragment>
  );
}
