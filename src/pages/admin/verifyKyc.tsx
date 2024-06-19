import { DocumentText, DocumentUpload } from "iconsax-react";
import React from "react";
import {
  DropZone,
  FileTrigger,
  type FileDropItem,
  Text,
  Button as AriaButton,
} from "react-aria-components";
import { Button, buttonVariants } from "@/components/ui/button";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
const routeApi = getRouteApi("/admin/verify-kyc");
const VerifyKyc = () => {
  const [files, setFiles] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { role } = routeApi.useSearch();
  function addFile(file: string) {
    setFiles([...files, file]);
  }
  async function onSubmit() {
    setLoading(true);
    await sleep(7000);
    if (role === "admin") {
      if (files.length === 3) {
        toast.success("KYC documents uploaded successfully");
        navigate({
          to: "/admin",
        });
      } else {
        toast.error("Please upload all KYC documents");
      }
    }
    if (role === "doctor") {
      if (files.length === 1) {
        toast.success("KYC documents uploaded successfully");
        navigate({
          to: "/admin",
        });
      } else {
        toast.error("Please upload all KYC documents");
      }
    }
    setLoading(false);
  }
  return (
    <div className="bg-white min-h-screen grid place-items-center">
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl text-center">
            Upload KYC documents
          </h1>
          <p className="r text-[#5F606A]">
            KYC documents needed for verification
          </p>
        </div>

        {role === "admin" && (
          <div className="flex gap-9">
            <KYCDoc title="CAC document" {...{ addFile }} />
            <KYCDoc title="Operational permit" {...{ addFile }} />
            <KYCDoc title="Operational license" {...{ addFile }} />
          </div>
        )}
        {role === "doctor" && (
          <div className="flex gap-9">
            <KYCDoc title="Medical License" {...{ addFile }} />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button loading={loading} onClick={onSubmit}>
          Submit form
        </Button>
      </div>
    </div>
  );
};

function KYCDoc({
  title,
  addFile,
}: {
  title: string;
  addFile: (file: string) => void;
}) {
  const [files, setFiles] = React.useState<null | string>(null);
  return (
    <DropZone
      onDrop={(e) => {
        const files = e.items.filter(
          (file) => file.kind === "file"
        ) as FileDropItem[];
        const filenames = files.map((file) => file.name);
        setFiles(filenames.join(", "));
        addFile(filenames.join(", "));
      }}
      className="border-2 border-dashed border-[#B2B3BD] rounded-lg p-8 w-72 h-72 flex flex-col justify-between items-center text-center"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="border border-[#445BB8] rounded-xl p-2">
          <DocumentText size={48} variant="Bold" color="#445BB8" />
        </div>
        <p className="text-[#445BB8] font-semibold">{title}</p>
      </div>
      <Text slot="label" style={{ display: "block" }}>
        {files || "Drop files here"}
      </Text>
      <FileTrigger
        allowsMultiple
        onSelect={(e) => {
          if (!e) return;
          const files = Array.from(e);
          const filenames = files.map((file) => file.name);
          setFiles(filenames.join(", "));
          addFile(filenames.join(", "));
        }}
      >
        <AriaButton
          className={buttonVariants({
            variant: "outline",
            className: "gap-2",
          })}
        >
          <DocumentUpload />
          Select files
        </AriaButton>
      </FileTrigger>
    </DropZone>
  );
}
export default VerifyKyc;
