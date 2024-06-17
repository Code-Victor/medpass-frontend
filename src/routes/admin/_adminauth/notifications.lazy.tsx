import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_adminauth/notifications')({
  component: () => <div>Hello /admin/_adminauth/notifications!</div>
})