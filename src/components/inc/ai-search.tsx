import * as React from "react";
import { User } from "iconsax-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { IconButton } from "@/components/ui/icon-button";
import AI from "@/assets/ai.svg";
import { patientRouter } from "@/api/routers";
import { Skeleton } from "../ui/skeleton";
export function AISearch({ patientId }: { patientId: string }) {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { data: aiSearchResut } = patientRouter.aiSearch.useQuery({
    variables: {
      search,
      patientId,
    },
  });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      console.log({
        key: e.key,
        metaKey: e.metaKey,
        ctrlKey: e.ctrlKey,
      });
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <IconButton label="AI search" onClick={()=>setOpen(true)} className="text-white items-center absolute bottom-14 right-14 animation-bounce ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          aria-label="Stars AI"
          className="w-4 h-4"
        >
          <path
            fill="currentColor"
            d="M12.349 8.566 9.123 7.38 7.936 4.15a.995.995 0 0 0-1.868 0L4.88 7.375 1.651 8.563a.995.995 0 0 0 0 1.867l3.224 1.195 1.188 3.226a.994.994 0 0 0 1.867 0l1.188-3.225 3.228-1.188a.995.995 0 0 0 0-1.867l.003-.005Zm-3.575 2.121a.992.992 0 0 0-.589.59l-1.187 3.216-1.185-3.219a.992.992 0 0 0-.587-.586L2.009 9.5l3.217-1.188a.992.992 0 0 0 .587-.586L7 4.509l1.188 3.217a.992.992 0 0 0 .589.589l3.216 1.188-3.219 1.184ZM9 3a.5.5 0 0 1 .5-.5h1v-1a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1A.5.5 0 0 1 9 3Zm6.5 3a.5.5 0 0 1-.5.5h-.5V7a.5.5 0 1 1-1 0v-.5H13a.5.5 0 0 1 0-1h.5V5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 .5.5Z"
          />
        </svg>
      </IconButton>
      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          placeholder="Type a command or search..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {aiSearchResut?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {aiSearchResut ? (
            <CommandGroup heading="Suggestions">
              {aiSearchResut?.map((item) => (
                <CommandItem key={item.id}>
                  <User className="mr-2 h-4 w-4" />
                  <div className="grid gap-2">
                    <span>{item.id}</span>
                    <span>{item.doctor.user.fullName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandGroup>
              <Skeleton className="w-full h-18" />
            </CommandGroup>
          )}
          <div className="flex gap-2 items-center px-4 py-3 mt-2 justify-between relative">
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-9 to-transparent" />

            <div className="flex gap-2 items-center ">
              <img alt="star" className="w-6 h-6" src={AI} />
              <p className="text-sm font-medium">
                Search Diagnosis with Medpass AI
              </p>
            </div>

            <kbd className="inline-flex gap-1 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2.5 py-1 font-medium text-slate-4 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="text-xs">⌘</span>P
            </kbd>
          </div>
        </CommandList>
      </CommandDialog>
    </>
  );
}
