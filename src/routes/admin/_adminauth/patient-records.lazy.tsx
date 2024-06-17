import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_adminauth/patient-records')({
  component: () => <div>Hello /admin/_adminauth/patient-records!</div>
})