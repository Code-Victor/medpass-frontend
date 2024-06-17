import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/_adminauth/department")({
  component: () => (
    <main className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Departments</h1>
          <p className="text-gray-11">Manage departments here</p>
        </div>
        <Button>Add departments</Button>
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
  ),
});

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
