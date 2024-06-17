import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/admin/_adminauth/settings')({
  component: () => <div>Hello /admin/_adminauth/settings!</div>
})