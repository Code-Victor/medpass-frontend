import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { departmentRouter } from "@/api/routers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";

const addDepartmentSchema = z.object({
  departmentName: z.string().min(1, "Department name is required"),
  departmentEmail: z.string().email("Invalid email address").optional(),
  hodName: z.string().min(1, "Head of department name is required"),
  hodEmail: z.string().email("Invalid email address"),
  descriptiion: z.string().min(1, "Description is required"),
});
type AddDepartmentSchema = z.infer<typeof addDepartmentSchema>;
export const Route = createLazyFileRoute("/admin/_adminauth/department/")({
  component: Department,
});

function Department() {
  const addDepartmentForm = useForm<AddDepartmentSchema>({
    resolver: zodResolver(addDepartmentSchema),
  });
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutate: createDepartment, isPending: isCreating } =
    departmentRouter.createDepartment.useMutation({
      onSuccess: () => {
        toast.success("Department created successfully");
        setOpen(false);
        queryClient.invalidateQueries(
          departmentRouter.getAllDepartments.getFetchOptions({
            hospitalId: "dkdkd",
          })
        );
      },
    });
  const onSubmit = (data: AddDepartmentSchema) => {
    createDepartment({ hospitalId: "dkdkd", ...data });
  };
  return (
    <main className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Departments</h1>
          <p className="text-gray-11">Manage departments here</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add departments</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[580px]">
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
              <DialogDescription>
                Add a department in your hospital and send an invite to the head
                of that department.
              </DialogDescription>
            </DialogHeader>
            <Form {...addDepartmentForm}>
              <form
                className="grid gap-4 py-4"
                onSubmit={addDepartmentForm.handleSubmit(onSubmit)}
              >
                <FormField
                  control={addDepartmentForm.control}
                  name="departmentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Name</FormLabel>
                      <FormControl>
                        <Input placeholder="dentistry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addDepartmentForm.control}
                  name="departmentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Email(Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@medpass.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addDepartmentForm.control}
                  name="descriptiion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addDepartmentForm.control}
                  name="hodName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HOD's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="john kent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addDepartmentForm.control}
                  name="hodEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HOD's Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@medpass.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <Button type="submit" loading={isCreating}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8">
        {/* if empty */}
        {false && <EmptyDepartmentList />}
        {/* if not empty */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
        </div>
      </div>
    </main>
  );
}
function EmptyDepartmentList() {
  return (
    <div className="flex px-6 py-8 shadow-md rounded-lg bg-white">
      <h2 className="text-gray-11 font-medium">No departments added</h2>
    </div>
  );
}

function DepartmentCard() {
  return (
    <div className="bg-white px-8 py-6 shadow-sm rounded-2xl flex items-center">
      <div className="flex-1 space-y-3">
        <h2 className="font-medim text-2xl text-black">Medics department</h2>
        <p className="text-sm text-gray-11">
          Led by <span className="font-semibold">Dr. Aiyesorogbe W. Talai</span>
        </p>
      </div>
      <Button variant="outline">Manage</Button>
    </div>
  );
}
