import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_adminauth/profile')({
  component: () => <div>Hello /admin/_adminauth/profile!</div>
})