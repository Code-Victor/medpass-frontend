import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

const signupSearchSchema = z.object({
  step: z.enum(["create-account", "confirm-otp"]).catch("create-account"),
  email: z.string().optional(),
});
z;
export const Route = createFileRoute("/admin/signup")({
  validateSearch: (search) => signupSearchSchema.parse(search),
  component: lazyRouteComponent(() => import("@/pages/admin/signup")),
});
