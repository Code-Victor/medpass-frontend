import { Patient } from "@/api/types";
import { cn } from "@/lib/utils";

export interface PatientInfoCardProps extends Patient {
  size?: "lg" | "sm";
}

export function PatientInfoCard({ size = "lg" }: PatientInfoCardProps) {
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
          <p className="font-semibold text-center">Daniel Alao</p>
          <p className="text-gray-9 text-xs text-center">ID 000 455</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l border-l-gray-6 pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">info</p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Date of birth: </span>
            09/23/1990
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Marital Status: </span>
            Single
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Admission Status: </span>
            In consultation
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2  pl-4">
        <div className="grid gap-1 flex-1">
          <p className="text-sm font-semibold">Bio-data</p>
          <p className="text-xs text-gray-10">
            <span className="font-semibold">Genotype: </span>
            09/23/1990
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Blood Group: </span>
            In consultation
          </p>
          <p className="text-xs text-gray-10">
            <span className="text-xs font-semibold">Gender: </span>
            Male
          </p>
        </div>
      </div>
      {size === "lg" && (
        <div className="flex flex-col gap-2 pl-4">
          <div className="grid gap-1 flex-1">
            <p className="text-sm font-semibold">Contact info</p>
            <p className="text-xs text-gray-10">(234) 801-234-5678</p>
            <p className="text-xs text-gray-10">
              No 7, Comma way, Port Harcourt
            </p>
            <p className="text-xs text-gray-10">patientemail@email.com</p>
          </div>
        </div>
      )}
    </div>
  );
}
