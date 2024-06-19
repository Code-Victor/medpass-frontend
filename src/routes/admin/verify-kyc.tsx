import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/admin/verify-kyc")({
  validateSearch: z.object({
    role: z.enum(["admin", "doctor"]).catch("admin"),
  }),
  component: lazyRouteComponent(() => import("@/pages/admin/verifyKyc")),
});
