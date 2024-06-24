import { Patient } from "@/api/types";
import { cn } from "@/lib/utils";

export interface PatientInfoCardProps extends Patient {
  size?: "lg" | "sm";
}

export function PatientInfoCard({
  size = "lg",
  ...patient
}: PatientInfoCardProps) {
  return (
    <div
      className={cn(
        "grid bg-white rounded-xl w-full px-6 py-4",
        size === "lg" ? "grid-cols-4" : "grid-cols-3"
      )}
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          className="w-16 h-16 rounded-full mx-auto"
          src="https://api.dicebear.com/9.x/micah/svg"
          alt="avatar"
        />
        <div className="grid gap-1">
          <p className="font-semibold text-center">{patient.user.fullName}</p>
          <p className="text-gray-9 text-xs text-center">{patient.patientId}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l border-l-gray-6 pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">Info</p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Email: </span>
            {patient.user.email}
          </p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Joined At: </span>
            {new Date(patient.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Marital Status: </span>
            {patient.biodata.maritalStatus}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2  pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">Bio-data</p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Genotype: </span>
            {patient.biodata.genotype}  
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Blood Group: </span>
            {patient.biodata.bloodGroup}
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Gender: </span>
            {patient.biodata.gender}
          </p>
        </div>
      </div>
      {size === "lg" && (
        <div className="flex flex-col gap-2 pl-4">
          <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">Contact info</p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Email: </span>
            {patient.user.email}
          </p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Home Address: </span>
            {patient.homeAddress}
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">State: </span>
            {patient.state}
          </p>
          
          </div>
        </div>
      )}
    </div>
  );
}
