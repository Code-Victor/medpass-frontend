import { authRouter, patientRouter } from "@/api/routers";
import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { splitByNewline } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const recordVisitSchema = z.object({
  complaints: z.string({ required_error: "Complaints are required" }),

  doctorsReport: z.string({ required_error: "Symptoms are required" }),
});
type RecordVisitSchema = z.infer<typeof recordVisitSchema>;

export function RecordVisitForm({
  close,
  patientId,
}: {
  patientId: string;
  close: () => void;
}) {
  const form = useForm<RecordVisitSchema>({
    resolver: zodResolver(recordVisitSchema),
  });
  const queryClient= useQueryClient()
  const {data:user}=authRouter.me.useQuery()
  const { mutate: addRecord, isPending: isRecoringPatient } =
    patientRouter.addRecord.useMutation({
      onError() {
        toast.error("An error occured while recording patient visit");
      },
      onSuccess() {
        close();
        queryClient.invalidateQueries(patientRouter.getAllRecords.getOptions({
            patientId,
            hospitalId: user?.hospital??""
        }));
        toast.success("Patient visit recorded successfully");
      },
    });
  function onSubmit(d: RecordVisitSchema) {
    addRecord({
      date: new Date(),
      patientId,
      complaint: splitByNewline(d.complaints),
      doctorsReport: splitByNewline(d.doctorsReport),
    });
  }
  return (
    <React.Fragment key="treatment-form">
      <DialogHeader>
        <DialogTitle>Record Patient Visit</DialogTitle>
        <DialogDescription>
          Create new record of Patient’s visit
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
                <FormLabel>Patient complaints</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doctorsReport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosage Amount</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button loading={isRecoringPatient} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </React.Fragment>
  );
}
