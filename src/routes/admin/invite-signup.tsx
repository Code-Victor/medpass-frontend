import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from 'zod'

export const Route = createFileRoute("/admin/invite-signup")({
  validateSearch: z.object({
    token: z.string().min(1, "Token is required").catch(""),
  }),
  component: lazyRouteComponent(() => import("@/pages/admin/InviteSignup")),
});