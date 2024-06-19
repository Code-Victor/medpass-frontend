import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";

z;
export const Route = createFileRoute("/admin/create-hospital")({
  component: lazyRouteComponent(() => import("@/pages/admin/createHospital")),
});
