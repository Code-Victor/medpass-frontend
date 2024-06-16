import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

const signupSearchSchema = z.object({
  step: z
    .enum(["create-account", "confirm-otp", "update-info"])
    .catch("create-account"),
});
z;
export const Route = createFileRoute("/admin/signup")({
  validateSearch: (search) => signupSearchSchema.parse(search),
  component: lazyRouteComponent(() => import("@/pages/admin/signup")),
});
