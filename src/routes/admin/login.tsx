import { createFileRoute } from '@tanstack/react-router'
import Login from '@/pages/admin/login'
import {z} from 'zod'

export const Route = createFileRoute("/admin/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: Login,
});